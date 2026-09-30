// Воркер, в котором живёт Python (Pyodide — CPython, собранный в WebAssembly).
// Код студента выполняется у него в браузере, а не на нашем сервере: так его
// нельзя использовать против сервера, и запуски не нагружают бэкенд.
//
// Отдельный поток нужен по двум причинам: бесконечный цикл не подвешивает
// страницу, а зависший запуск можно прервать, просто убив воркер.
//
// Воркер модульный: Pyodide 314 в классических воркерах не запускается
// и грузится только через import.

const PYODIDE_VERSION = '314.0.7'
const INDEX_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`

// Сколько символов вывода пересылаем странице. Дальше — обрезаем: цикл с
// print на миллион строк иначе съест память вкладки.
const OUTPUT_LIMIT = 100_000
// Вывод копится и уходит на страницу пачками, а не на каждый print
const FLUSH_EVERY_MS = 60

let pyodideReady = null
let loaded = false

function loadRuntime() {
  if (!pyodideReady) {
    pyodideReady = (async () => {
      const { loadPyodide } = await import(/* @vite-ignore */ `${INDEX_URL}pyodide.mjs`)
      const py = await loadPyodide({ indexURL: INDEX_URL })
      loaded = true
      return py
    })()
    // Не смогли загрузить (нет сети, CDN недоступен) — следующий запуск пробует заново
    pyodideReady.catch(() => { pyodideReady = null })
  }
  return pyodideReady
}

// Трейсбек без внутренних кадров Pyodide: студенту нужны только строки его кода
function cleanTraceback(message) {
  const lines = String(message).split('\n')
  const first = lines.findIndex(line => line.includes('File "main.py"'))
  if (first === -1) return message
  const own = lines.slice(first)
  // Ошибки разбора Python печатает без строки «Traceback…» — повторяем это
  const parseError = own.some(line => /^(SyntaxError|IndentationError|TabError)\b/.test(line))
  return (parseError ? own : ['Traceback (most recent call last):', ...own]).join('\n')
}

self.onmessage = async (event) => {
  const { id, type, code, stdin } = event.data
  const post = (msg) => self.postMessage({ id, ...msg })

  if (type === 'warmup') {
    loadRuntime().then(() => post({ type: 'ready' }), () => {})
    return
  }
  if (type !== 'run') return

  let py
  try {
    // «Загружаем» показываем и тогда, когда загрузка уже начата прогревом,
    // но ещё не закончилась
    if (!loaded) post({ type: 'stage', stage: 'loading' })
    py = await loadRuntime()
  } catch {
    post({
      type: 'done', ok: false, loadFailed: true,
      error: 'Не удалось загрузить Python. Проверь интернет и попробуй ещё раз.',
    })
    return
  }

  // ── Вывод ──
  let sent = 0
  let truncated = false
  let buffer = []
  let lastFlush = performance.now()

  const flush = () => {
    if (!buffer.length) return
    post({ type: 'output', chunks: buffer })
    buffer = []
    lastFlush = performance.now()
  }

  const pushOutput = (stream, text) => {
    if (truncated || !text) return
    if (sent + text.length > OUTPUT_LIMIT) {
      text = text.slice(0, OUTPUT_LIMIT - sent)
      truncated = true
    }
    sent += text.length
    const last = buffer[buffer.length - 1]
    if (last && last.stream === stream) last.text += text
    else buffer.push({ stream, text })
    if (truncated) {
      flush()
      // Дальше выводить некуда — просим страницу остановить запуск
      post({ type: 'overflow' })
    } else if (performance.now() - lastFlush > FLUSH_EVERY_MS) {
      flush()
    }
  }

  // write получает байты UTF-8: декодер со stream: true не рвёт кириллицу
  // на границе двух пачек
  const makeWriter = (stream) => {
    const decoder = new TextDecoder()
    return {
      isatty: false,
      write(bytes) {
        pushOutput(stream, decoder.decode(bytes, { stream: true }))
        return bytes.length
      },
    }
  }
  py.setStdout(makeWriter('stdout'))
  py.setStderr(makeWriter('stderr'))

  // ── Ввод: каждая строка поля «Ввод» — один вызов input() ──
  const lines = String(stdin || '').replace(/\r\n/g, '\n').split('\n')
  if (lines.length && lines[lines.length - 1] === '') lines.pop()
  let nextLine = 0
  py.setStdin({ stdin: () => (nextLine < lines.length ? `${lines[nextLine++]}\n` : null) })

  // Каждый запуск — с чистого листа: переменные прошлого запуска не видны.
  // __name__ = "__main__", чтобы работал привычный if __name__ == "__main__":
  const globals = py.globals.get('dict')()
  globals.set('__name__', '__main__')

  post({ type: 'stage', stage: 'running' })
  const started = performance.now()
  try {
    await py.runPythonAsync(code, { globals, filename: 'main.py' })
    flush()
    post({ type: 'done', ok: true, ms: performance.now() - started, truncated })
  } catch (err) {
    flush()
    const text = cleanTraceback(err && err.message ? err.message : String(err))
    post({
      type: 'done', ok: false, ms: performance.now() - started, truncated,
      error: text,
      needsInput: /EOFError/.test(text),
    })
  } finally {
    globals.destroy()
  }
}
