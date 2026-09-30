import { useState, useId, useRef, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import { runPython, stopPython, warmUpPython, usePythonState } from '../lib/python/runner'

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)
const RUN_SHORTCUT = isMac ? '⌘ + Enter' : 'Ctrl + Enter'

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 4.5v15a1 1 0 0 0 1.52.85l12-7.5a1 1 0 0 0 0-1.7l-12-7.5A1 1 0 0 0 7 4.5z" fill="currentColor" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="5" y="5" width="14" height="14" rx="2.5" fill="currentColor" />
    </svg>
  )
}

function formatMs(ms) {
  if (ms < 1000) return `${Math.max(1, Math.round(ms))} мс`
  return `${(ms / 1000).toFixed(2).replace('.', ',')} с`
}

// Редактор Python с запуском прямо в браузере. Самостоятельный компонент:
// его можно поставить на любую страницу — сдача ДЗ, конспекты, тренажёры.
//
//   <PythonRunner value={code} onChange={setCode} />
//   <PythonRunner value={example} readOnly />          — пример, который можно запустить
//
// Пока идёт запуск, usePythonState().running === true — страница по нему
// блокирует свои кнопки (например, отправку решения).
export default function PythonRunner({
  value, onChange, readOnly = false, placeholder = '# Напиши код на Python', minLines = 8,
}) {
  const owner = useId()
  const { running, owner: runningOwner } = usePythonState()
  const mine = running && runningOwner === owner
  const othersRunning = running && !mine

  const [output, setOutput] = useState([])       // [{ stream, text }]
  const [status, setStatus] = useState(null)     // { kind, text }
  const [stdinOpen, setStdinOpen] = useState(false)
  const [stdin, setStdin] = useState('')
  const outRef = useRef(null)

  // Новый вывод — прокручиваем консоль вниз, как в терминале
  useEffect(() => {
    if (outRef.current) outRef.current.scrollTop = outRef.current.scrollHeight
  }, [output, status])

  const run = async () => {
    if (running) return
    if (!value.trim()) {
      setOutput([])
      setStatus({ kind: 'error', text: 'Сначала напиши код — запускать пока нечего.' })
      return
    }
    setOutput([])
    setStatus({ kind: 'running', text: 'Выполняется…' })

    const result = await runPython(value, {
      stdin,
      owner,
      onEvent: (event) => {
        if (event.type === 'stage') {
          setStatus(event.stage === 'loading'
            ? { kind: 'loading', text: 'Загружаем Python — это нужно только при первом запуске…' }
            : { kind: 'running', text: 'Выполняется…' })
        } else if (event.type === 'output') {
          setOutput(prev => {
            const next = [...prev]
            for (const chunk of event.chunks) {
              const last = next[next.length - 1]
              if (last && last.stream === chunk.stream) next[next.length - 1] = { ...last, text: last.text + chunk.text }
              else next.push(chunk)
            }
            return next
          })
        }
      },
    })

    if (result.busy) {
      setStatus({ kind: 'error', text: 'Сейчас выполняется другой код — дождись его окончания.' })
    } else if (result.ok) {
      setStatus({ kind: 'ok', text: `Выполнено за ${formatMs(result.ms)}${result.truncated ? ' · вывод обрезан' : ''}` })
    } else if (result.stopped || result.loadFailed) {
      setStatus({ kind: result.reason === 'stopped' ? 'stopped' : 'error', text: result.error })
    } else {
      setOutput(prev => [...prev, { stream: 'error', text: result.error }])
      if (result.needsInput) {
        setStdinOpen(true)
        setStatus({ kind: 'error', text: 'Программе не хватило данных для input() — впиши их в «Ввод данных», по одному значению на строку.' })
      } else {
        setStatus({ kind: 'error', text: 'Ошибка в коде — подробности выше' })
      }
    }
  }

  const clear = () => { setOutput([]); setStatus(null) }
  const hasConsole = output.length > 0 || status

  return (
    <div className="py-runner">
      <CodeEditor
        value={value}
        onChange={onChange}
        onRun={run}
        onFocus={warmUpPython}
        readOnly={readOnly}
        placeholder={placeholder}
        minLines={minLines}
        ariaLabel="Код на Python"
      />

      <div className="py-toolbar">
        {mine ? (
          <button type="button" className="py-btn py-btn-stop" onClick={() => stopPython('stopped')}>
            <StopIcon /> Остановить
          </button>
        ) : (
          <button
            type="button"
            className="py-btn py-btn-run"
            onClick={run}
            onPointerEnter={warmUpPython}
            disabled={othersRunning}
            title={othersRunning ? 'Сейчас выполняется другой код' : `Запустить (${RUN_SHORTCUT})`}
          >
            <PlayIcon /> Запустить
          </button>
        )}

        <button
          type="button"
          className={`py-btn py-btn-ghost${stdinOpen ? ' is-on' : ''}`}
          onClick={() => setStdinOpen(o => !o)}
          aria-expanded={stdinOpen}
        >
          Ввод данных{stdin.trim() ? ' ·' : ''}
        </button>

        {hasConsole && !mine && (
          <button type="button" className="py-btn py-btn-ghost" onClick={clear}>Очистить</button>
        )}

        <span className="py-note">
          Только Python<span className="py-shortcut"> · {RUN_SHORTCUT}</span>
        </span>
      </div>

      {stdinOpen && (
        <div className="py-stdin">
          <label className="py-stdin-label" htmlFor={`${owner}-stdin`}>
            Ввод для <code>input()</code> — каждая строка отдаётся одному вызову
          </label>
          <textarea
            id={`${owner}-stdin`}
            className="py-stdin-input"
            value={stdin}
            onChange={e => setStdin(e.target.value)}
            rows={3}
            placeholder={'Аня\n25'}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </div>
      )}

      {hasConsole && (
        <div className={`py-console${status ? ` is-${status.kind}` : ''}`}>
          <div className="py-console-head">
            <span className="py-console-title">Вывод</span>
            {status && (
              <span className="py-console-status" role="status">
                {(status.kind === 'loading' || status.kind === 'running') && <span className="py-spinner" aria-hidden="true" />}
                {status.kind === 'ok' && <span aria-hidden="true">✓</span>}
                {status.text}
              </span>
            )}
          </div>
          {output.length > 0 ? (
            <pre className="py-console-out" ref={outRef} aria-live="polite">
              {output.map((chunk, i) => (
                <span key={i} className={`py-out-${chunk.stream}`}>{chunk.text}</span>
              ))}
            </pre>
          ) : status?.kind === 'ok' ? (
            <div className="py-console-empty">Программа ничего не напечатала</div>
          ) : null}
        </div>
      )}

      {/* Сноска нужна там, где пишут код; под уже сданным решением она лишняя */}
      {!readOnly && (
        <div className="py-footnote">
          Код выполняется прямо в твоём браузере — запуск ничего никуда не отправляет.
        </div>
      )}
    </div>
  )
}
