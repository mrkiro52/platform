import { useEffect, useRef, useState } from 'react'
import { isoOf } from '../../lib/dashEvents'

// Таймер фокуса по технике помодоро. Время окончания хранится в браузере,
// поэтому таймер продолжает идти, если уйти с дэшборда или перезагрузить страницу.

const PRESETS = [
  { id: 'focus25', label: 'Фокус 25', minutes: 25, focus: true },
  { id: 'break5',  label: 'Перерыв 5', minutes: 5,  focus: false },
  { id: 'focus50', label: 'Фокус 50', minutes: 50, focus: true },
  { id: 'custom',  label: 'Своё',      minutes: null, focus: true },
]
const STATE_KEY = 'kiro_focus_timer'
const STATS_KEY = 'kiro_focus_stats'

function read(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback } catch { return fallback }
}
function write(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* приватный режим */ }
}

function todayStats() {
  const s = read(STATS_KEY, null)
  const today = isoOf(new Date())
  return s && s.date === today ? s : { date: today, sessions: 0, minutes: 0 }
}

function mmss(sec) {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = sec % 60
  const two = (n) => String(n).padStart(2, '0')
  return h ? `${h}:${two(m)}:${two(s)}` : `${two(m)}:${two(s)}`
}

// Короткий сигнал без файлов: два тона через Web Audio
function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    ;[0, 0.35].forEach((at, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.frequency.value = i ? 880 : 660
      gain.gain.setValueAtTime(0.15, ctx.currentTime + at)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + at + 0.3)
      osc.connect(gain).connect(ctx.destination)
      osc.start(ctx.currentTime + at)
      osc.stop(ctx.currentTime + at + 0.3)
    })
  } catch { /* звук недоступен — не страшно */ }
}

export default function FocusTimer() {
  const saved = read(STATE_KEY, {})
  const [preset, setPreset] = useState(saved.preset || 'focus25')
  const [customMin, setCustomMin] = useState(saved.customMin || 40)
  const [endsAt, setEndsAt] = useState(saved.endsAt || null)
  const [left, setLeft] = useState(saved.left ?? null)
  const [now, setNow] = useState(Date.now())
  const [stats, setStats] = useState(todayStats)
  const [justFinished, setJustFinished] = useState(false)
  const titleRef = useRef(document.title)

  const current = PRESETS.find(p => p.id === preset) || PRESETS[0]
  const total = (current.minutes ?? customMin) * 60
  const remaining = endsAt ? Math.max(0, Math.ceil((endsAt - now) / 1000)) : (left ?? total)
  const running = !!endsAt
  const progress = total ? 1 - remaining / total : 0

  useEffect(() => {
    write(STATE_KEY, { preset, customMin, endsAt, left })
  }, [preset, customMin, endsAt, left])

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [running])

  // Время вышло — фиксируем сессию фокуса в статистике дня
  useEffect(() => {
    if (!running || remaining > 0) return
    const silent = Date.now() - endsAt > 5000 // закончился, пока дэшборд был закрыт
    setEndsAt(null)
    setLeft(0)
    setJustFinished(true)
    if (current.focus) {
      const next = todayStats()
      next.sessions += 1
      next.minutes += Math.round(total / 60)
      write(STATS_KEY, next)
      setStats(next)
    }
    if (!silent) beep()
  }, [running, remaining, endsAt, current.focus, total])

  // Оставшееся время во вкладке браузера, пока таймер идёт
  useEffect(() => {
    const original = titleRef.current
    if (running) document.title = `${mmss(remaining)} · ${current.focus ? 'фокус' : 'перерыв'}`
    else document.title = original
    return () => { document.title = original }
  }, [running, remaining, current.focus])

  const start = () => {
    setJustFinished(false)
    const from = left && left > 0 ? left : total
    setNow(Date.now())
    setEndsAt(Date.now() + from * 1000)
    setLeft(null)
  }
  const pause = () => { setLeft(remaining); setEndsAt(null) }
  const reset = () => { setEndsAt(null); setLeft(null); setJustFinished(false) }
  const choose = (id) => { setPreset(id); setEndsAt(null); setLeft(null); setJustFinished(false) }
  const startBreak = () => {
    setPreset('break5')
    setJustFinished(false)
    setLeft(null)
    setNow(Date.now())
    setEndsAt(Date.now() + 5 * 60 * 1000)
  }

  const R = 52
  const C = 2 * Math.PI * R

  return (
    <div className="widget dsh-timer">
      <div className="widget-header">
        <span className="widget-title">Таймер фокуса</span>
        <span className="dsh-timer-stats" title="Завершённые сессии фокуса за сегодня">
          сегодня: {stats.sessions} {stats.sessions === 1 ? 'сессия' : stats.sessions > 1 && stats.sessions < 5 ? 'сессии' : 'сессий'} · {stats.minutes} мин
        </span>
      </div>

      <div className="dsh-presets" role="tablist" aria-label="Режим таймера">
        {PRESETS.map(p => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={preset === p.id}
            className={`dsh-preset${preset === p.id ? ' is-active' : ''}`}
            onClick={() => choose(p.id)}
            disabled={running}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="dsh-timer-face">
        <svg viewBox="0 0 120 120" className="dsh-ring" aria-hidden="true">
          <circle cx="60" cy="60" r={R} className="dsh-ring-bg" />
          <circle
            cx="60" cy="60" r={R}
            className={`dsh-ring-fg${current.focus ? '' : ' is-break'}`}
            strokeDasharray={C}
            strokeDashoffset={C * (1 - progress)}
          />
        </svg>
        <div className="dsh-timer-center">
          <div className={`dsh-timer-time${remaining === 0 ? ' is-done' : ''}`}>{mmss(remaining)}</div>
          <div className="dsh-timer-mode">
            {justFinished
              ? (current.focus ? 'Готово! Сделай перерыв' : 'Перерыв окончен')
              : running ? (current.focus ? 'фокус' : 'перерыв') : left ? 'на паузе' : 'готов к старту'}
          </div>
        </div>
      </div>

      {preset === 'custom' && !running && left === null && (
        <label className="dsh-custom">
          <span>Минут:</span>
          <input
            id="dsh-custom-min"
            className="dsh-input"
            type="number"
            min="1"
            max="180"
            value={customMin}
            onChange={e => setCustomMin(Math.max(1, Math.min(180, +e.target.value || 1)))}
          />
        </label>
      )}

      <div className="dsh-timer-btns">
        {running
          ? <button type="button" className="dsh-btn-secondary" onClick={pause}>Пауза</button>
          : justFinished && current.focus
            ? <button type="button" className="dsh-btn-primary" onClick={startBreak}>Начать перерыв 5 мин</button>
            : <button type="button" className="dsh-btn-primary" onClick={start}>{left ? 'Продолжить' : 'Старт'}</button>}
        {(running || left !== null) && (
          <button type="button" className="dsh-btn-ghost" onClick={reset}>Сбросить</button>
        )}
      </div>
    </div>
  )
}
