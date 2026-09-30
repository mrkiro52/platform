import { useSyncExternalStore } from 'react'

// Мост к воркеру с Python. Воркер один на всю вкладку: Python весит ~12 МБ,
// грузить его на каждый редактор незачем. Поэтому и запуск в каждый момент
// один — пока он идёт, остальные кнопки «Запустить» и кнопки отправки ждут.

// Сколько даём коду поработать. Задачи курса выполняются за доли секунды —
// всё, что дольше, почти наверняка бесконечный цикл.
export const RUN_TIMEOUT_MS = 10_000

let worker = null
let nextId = 1
let current = null   // { id, onEvent, resolve, timer }

// ── Общее состояние: идёт ли запуск и кем он начат ──
let state = { running: false, owner: null, loaded: false }
const listeners = new Set()

function setState(patch) {
  state = { ...state, ...patch }
  listeners.forEach(fn => fn())
}

function subscribe(fn) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('./python.worker.js', import.meta.url), { type: 'module' })
    worker.onmessage = onMessage
    worker.onerror = () => finish({ ok: false, error: 'Python неожиданно остановился. Попробуй запустить ещё раз.' })
  }
  return worker
}

function onMessage(event) {
  const msg = event.data
  if (msg.type === 'ready') { setState({ loaded: true }); return }
  if (!current || msg.id !== current.id) return

  if (msg.type === 'stage') {
    if (msg.stage === 'running') {
      setState({ loaded: true })
      // Таймер считаем с начала выполнения, а не загрузки: первая загрузка
      // Python на медленном интернете может занять дольше десяти секунд
      current.timer = setTimeout(() => stopPython('timeout'), RUN_TIMEOUT_MS)
    }
    current.onEvent({ type: 'stage', stage: msg.stage })
  } else if (msg.type === 'output') {
    current.onEvent({ type: 'output', chunks: msg.chunks })
  } else if (msg.type === 'overflow') {
    stopPython('overflow')
  } else if (msg.type === 'done') {
    finish(msg)
  }
}

function finish(result) {
  if (!current) return
  const run = current
  current = null
  clearTimeout(run.timer)
  setState({ running: false, owner: null })
  run.resolve(result)
}

// Запустить код. onEvent получает стадии ('loading' / 'running') и куски
// вывода по мере появления. Промис разрешается итогом запуска.
export function runPython(code, { stdin = '', owner = null, onEvent = () => {} } = {}) {
  if (current) return Promise.resolve({ ok: false, busy: true, error: 'Уже идёт другой запуск' })

  return new Promise(resolve => {
    const id = nextId++
    current = { id, onEvent, resolve, timer: null }
    setState({ running: true, owner })
    getWorker().postMessage({ id, type: 'run', code, stdin })
  })
}

// Остановить текущий запуск. Прервать Python изнутри нельзя, поэтому воркер
// убивается целиком; следующий запуск поднимет новый (из кеша браузера — быстро).
export function stopPython(reason = 'stopped') {
  if (!current) return
  worker?.terminate()
  worker = null
  setState({ loaded: false })
  const messages = {
    stopped:  'Выполнение остановлено.',
    timeout:  `Выполнение остановлено: код работал дольше ${RUN_TIMEOUT_MS / 1000} секунд. Возможно, в нём бесконечный цикл.`,
    overflow: 'Выполнение остановлено: программа напечатала слишком много. Возможно, в ней бесконечный цикл с print.',
  }
  finish({ ok: false, stopped: true, reason, error: messages[reason] || messages.stopped })
}

// Заранее загрузить Python — например, когда человек начал писать код.
// К моменту нажатия «Запустить» он уже будет готов.
export function warmUpPython() {
  if (state.loaded || current) return
  getWorker().postMessage({ id: 0, type: 'warmup' })
}

// Состояние для React: { running, owner, loaded }
export function usePythonState() {
  return useSyncExternalStore(subscribe, () => state, () => state)
}
