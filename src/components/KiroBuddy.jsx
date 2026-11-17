import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import './KiroBuddy.css'

// Пингвин KIRO — круглая плашка с инструментами (пока один: таймер).
// Только для компьютера. Стоит в сайдбаре над «Выйти», но её можно утащить
// в любое место экрана; позиция сохраняется. Зажал на 0.25 с — по кругу
// бежит жёлтое кольцо, через 0.75 с вокруг раскрывается меню инструментов.
// Повторное зажатие прячет инструменты.

const SIZE = 75
const HOLD_DELAY = 250
const CHARGE_TIME = 750
const DRAG_START = 6
const POS_KEY = 'kiro_buddy_pos'
const TIMER_KEY = 'kiro_buddy_timer'
const DESKTOP_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
const RING_R = 46
const RING_C = 2 * Math.PI * RING_R

const store = {
  get(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback } catch { return fallback }
  },
  set(key, value) {
    try { value === null ? localStorage.removeItem(key) : localStorage.setItem(key, JSON.stringify(value)) } catch { /* приватный режим */ }
  },
}

function useDesktop() {
  const [ok, setOk] = useState(() => typeof window !== 'undefined' && window.matchMedia(DESKTOP_QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const on = () => setOk(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return ok
}

// Ночью (с 20:00 до 08:00 по времени устройства, то есть там, где сейчас человек) Пингви спит,
// а когда его будят — открывают инструменты — зевает. Днём — обычная картинка.
const FACE_DAY = '/kiro-buddy.webp'
const FACE_SLEEP = '/kiro-buddy-sleep.webp'
const FACE_YAWN = '/kiro-buddy-yawn.webp'
const isNightNow = () => { const h = new Date().getHours(); return h >= 20 || h < 8 }

function useNight() {
  const [night, setNight] = useState(isNightNow)
  useEffect(() => {
    const tick = () => setNight(isNightNow())
    const id = setInterval(tick, 30000)
    document.addEventListener('visibilitychange', tick)
    return () => { clearInterval(id); document.removeEventListener('visibilitychange', tick) }
  }, [])
  // Заранее грузим ночные картинки, чтобы при смене не было пустого кадра
  useEffect(() => {
    if (night) [FACE_SLEEP, FACE_YAWN].forEach(src => { new Image().src = src })
  }, [night])
  return night
}

const clamp = (v, min, max) => Math.min(Math.max(v, min), Math.max(min, max))
const clampPos = ({ x, y }) => ({
  x: clamp(x, 4, window.innerWidth - SIZE - 4),
  y: clamp(y, 4, window.innerHeight - SIZE - 4),
})

// «Пип-пип-пип»: три коротких сигнала через Web Audio
function beep(ctx) {
  if (!ctx) return
  if (ctx.state === 'suspended') ctx.resume()
  const t0 = ctx.currentTime + 0.02
  for (let i = 0; i < 3; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 880
    const t = t0 + i * 0.32
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.35, t + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.18)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.2)
  }
}

const fmtClock = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

const roundsLabel = (n) => {
  const m10 = n % 10, m100 = n % 100
  const word = m10 === 1 && m100 !== 11 ? 'раунд' : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? 'раунда' : 'раундов'
  return `${n} ${word}`
}

// Фазы таймера: работа, отдых, работа… — после последнего раунда отдыха нет
function buildPhases({ work, rest, rounds }) {
  const list = []
  for (let r = 1; r <= rounds; r++) {
    list.push({ kind: 'work', round: r, ms: work * 60000 })
    if (rest > 0 && r < rounds) list.push({ kind: 'rest', round: r, ms: rest * 60000 })
  }
  return list
}

const TimerIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="10" x2="14" y1="2" y2="2" /><line x1="12" x2="15" y1="14" y2="11" /><circle cx="12" cy="14" r="8" />
  </svg>
)
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12" /></svg>
)

// ═══ Таймер ═══════════════════════════════════════════════════════════
function useIntervalTimer() {
  const [settings, setSettings] = useState(() => ({ work: 25, rest: 5, rounds: 4, ...store.get(TIMER_KEY, {}) }))
  const [run, setRun] = useState(null) // { phases, index, endAt, left, paused, done }
  const [now, setNow] = useState(Date.now())
  const audio = useRef(null)

  useEffect(() => { store.set(TIMER_KEY, settings) }, [settings])

  useEffect(() => {
    if (!run || run.paused || run.done) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [run])

  // Фаза закончилась — пищим и переходим к следующей
  useEffect(() => {
    if (!run || run.paused || run.done || now < run.endAt) return
    beep(audio.current)
    const next = run.index + 1
    if (next >= run.phases.length) setRun({ ...run, done: true, left: 0 })
    else setRun({ ...run, index: next, endAt: run.endAt + run.phases[next].ms })
  }, [now, run])

  const start = () => {
    try {
      audio.current = audio.current || new (window.AudioContext || window.webkitAudioContext)()
      audio.current.resume()
    } catch { audio.current = null }
    const phases = buildPhases(settings)
    const t = Date.now()
    setNow(t)
    setRun({ phases, index: 0, endAt: t + phases[0].ms, left: phases[0].ms, paused: false, done: false })
  }
  const pause = () => setRun(r => r && ({ ...r, paused: true, left: r.endAt - Date.now() }))
  const resume = () => setRun(r => {
    if (!r) return r
    const t = Date.now()
    setNow(t)
    return { ...r, paused: false, endAt: t + r.left }
  })
  const stop = () => setRun(null)

  const phase = run ? run.phases[Math.min(run.index, run.phases.length - 1)] : null
  const left = !run ? 0 : run.done ? 0 : run.paused ? run.left : Math.max(0, run.endAt - now)
  const active = !!run && !run.done
  return { settings, setSettings, run, phase, left, active, start, pause, resume, stop }
}

function NumberField({ label, value, min, max, onChange, suffix }) {
  return (
    <label className="kb-field">
      <span className="kb-field-label">{label}</span>
      <span className="kb-field-box">
        <button type="button" onClick={() => onChange(clamp(value - 1, min, max))} aria-label={`Меньше: ${label}`}>−</button>
        <input
          type="number" min={min} max={max} value={value}
          onChange={e => onChange(clamp(Math.round(Number(e.target.value) || 0), min, max))}
        />
        <button type="button" onClick={() => onChange(clamp(value + 1, min, max))} aria-label={`Больше: ${label}`}>+</button>
      </span>
      <span className="kb-field-suffix">{suffix}</span>
    </label>
  )
}

function TimerPanel({ timer, onClose }) {
  const { settings, setSettings, run, phase, left, start, pause, resume, stop } = timer
  const set = (key) => (v) => setSettings(s => ({ ...s, [key]: v }))
  const total = settings.work * settings.rounds + settings.rest * Math.max(0, settings.rounds - 1)
  const progress = run && phase ? 1 - left / phase.ms : 0

  return (
    <div className="kb-panel-inner">
      <div className="kb-panel-head">
        <span className="kb-panel-title"><TimerIcon size={16} />Таймер</span>
        <button type="button" className="kb-x" onClick={onClose} aria-label="Скрыть таймер" title="Скрыть"><CloseIcon /></button>
      </div>

      {!run && (
        <>
          <div className="kb-fields">
            <NumberField label="Работа" suffix="мин" value={settings.work} min={1} max={180} onChange={set('work')} />
            <NumberField label="Отдых" suffix="мин" value={settings.rest} min={0} max={60} onChange={set('rest')} />
            <NumberField label="Раунды" suffix="раз" value={settings.rounds} min={1} max={20} onChange={set('rounds')} />
          </div>
          <div className="kb-total">Всего {total} мин</div>
          <button type="button" className="kb-btn kb-btn-main" onClick={start}>Запустить</button>
        </>
      )}

      {run && !run.done && phase && (
        <div className={`kb-run is-${phase.kind}`}>
          <div className="kb-run-meta">
            <span className="kb-run-phase">{phase.kind === 'work' ? 'Работа' : 'Отдых'}</span>
            <span>Раунд {phase.round} из {run.phases.filter(p => p.kind === 'work').length}</span>
          </div>
          <div className="kb-run-clock">{fmtClock(left)}</div>
          <div className="kb-run-bar"><span style={{ width: `${(progress * 100).toFixed(2)}%` }} /></div>
          <div className="kb-run-btns">
            {run.paused
              ? <button type="button" className="kb-btn kb-btn-main" onClick={resume}>Продолжить</button>
              : <button type="button" className="kb-btn kb-btn-main" onClick={pause}>Пауза</button>}
            <button type="button" className="kb-btn" onClick={stop}>Стоп</button>
          </div>
        </div>
      )}

      {run && run.done && (
        <div className="kb-done">
          <div className="kb-done-title">Готово!</div>
          <div className="kb-done-sub">{roundsLabel(run.phases.filter(p => p.kind === 'work').length)} позади</div>
          <div className="kb-run-btns">
            <button type="button" className="kb-btn kb-btn-main" onClick={start}>Ещё раз</button>
            <button type="button" className="kb-btn" onClick={stop}>Настроить</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Элемент с анимацией появления и исчезновения: держим его в DOM, пока играет выход
function usePresence(open, ms = 260) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (open) {
      setMounted(true)
      // Небольшая пауза, чтобы элемент успел встать в DOM до перехода в видимое состояние
      const id = setTimeout(() => setShown(true), 20)
      return () => clearTimeout(id)
    }
    setShown(false)
    const id = setTimeout(() => setMounted(false), ms)
    return () => clearTimeout(id)
  }, [open, ms])
  return [mounted, shown]
}

// ═══ Плашка ════════════════════════════════════════════════════════════
const InfoIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
  </svg>
)

function InfoPanel({ onClose }) {
  return (
    <div className="kb-panel-inner">
      <div className="kb-panel-head">
        <span className="kb-panel-title"><InfoIcon size={16} />Инфо</span>
        <button type="button" className="kb-x" onClick={onClose} aria-label="Скрыть" title="Скрыть"><CloseIcon /></button>
      </div>
      <div className="kb-info">
        <img src="/kiro-buddy.webp" alt="" className="kb-info-ava" />
        <div className="kb-info-title">Привет! Я Пингви, приятно познакомиться!</div>
        <p className="kb-info-text">Я твой личный помощник, предоставляющий кучу полезных инструментов. Со временем мой арсенал будет только расширяться. Успехов в обучении. Все получится!</p>
      </div>
    </div>
  )
}

const TOOLS = [
  { key: 'timer', label: 'Таймер', Icon: TimerIcon },
  { key: 'info', label: 'Инфо', Icon: InfoIcon },
]

export default function KiroBuddy() {
  const desktop = useDesktop()
  const [pos, setPos] = useState(() => store.get(POS_KEY, null)) // null — стоит на своём месте в сайдбаре
  const [dock, setDock] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [charging, setCharging] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  // Открытый инструмент: одновременно показываем только один
  const [tool, setTool] = useState(null)
  const panelOpen = tool !== null
  const lastTool = useRef(null)
  if (tool) lastTool.current = tool
  const switchRef = useRef(null)
  const setPanelOpen = (open) => { clearTimeout(switchRef.current); setTool(open ? 'timer' : null) }
  // Клик по инструменту: тот же — свернуть; другой — сначала свернуть открытый, потом показать новый
  const pickTool = (key) => {
    clearTimeout(switchRef.current)
    if (tool === key) return setTool(null)
    if (tool) {
      setTool(null)
      switchRef.current = setTimeout(() => setTool(key), 200)
    } else setTool(key)
  }
  const [burst, setBurst] = useState(0)
  const gesture = useRef(null)
  const menuRef = useRef(false)
  menuRef.current = menuOpen
  const timer = useIntervalTimer()
  const night = useNight()
  const face = !night ? FACE_DAY : (menuOpen || panelOpen ? FACE_YAWN : FACE_SLEEP)

  const [menuMounted, menuShown] = usePresence(menuOpen, 320)
  const [panelMounted, panelShown] = usePresence(panelOpen, 240)

  // Место в сайдбаре над «Выйти»; если сайдбар свёрнут — левый нижний угол
  const measureDock = useCallback(() => {
    const slot = document.getElementById('kiro-buddy-slot')
    const r = slot ? slot.getBoundingClientRect() : null
    if (r && r.width >= SIZE - 1 && r.height >= SIZE - 1) setDock({ x: r.left + (r.width - SIZE) / 2, y: r.top + (r.height - SIZE) / 2 })
    else setDock({ x: 12, y: window.innerHeight - SIZE - 72 })
  }, [])

  useLayoutEffect(() => {
    document.body.classList.toggle('kiro-buddy-free', !!pos)
    return () => document.body.classList.remove('kiro-buddy-free')
  }, [pos])

  useEffect(() => {
    if (!desktop) return
    measureDock()
    const sidebar = document.getElementById('sidebar')
    const ro = sidebar && typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measureDock) : null
    if (ro) ro.observe(sidebar)
    const onResize = () => { measureDock(); setPos(p => (p ? clampPos(p) : p)) }
    window.addEventListener('resize', onResize)
    sidebar?.addEventListener('scroll', measureDock, { passive: true })
    sidebar?.addEventListener('transitionend', measureDock)
    // Сайдбар перерисовывается при переходах — на всякий случай меряем ещё раз
    const id = setInterval(measureDock, 1500)
    return () => {
      ro?.disconnect()
      window.removeEventListener('resize', onResize)
      sidebar?.removeEventListener('scroll', measureDock)
      sidebar?.removeEventListener('transitionend', measureDock)
      clearInterval(id)
    }
  }, [desktop, measureDock, pos])

  const place = pos || dock
  const clearTimers = () => {
    const g = gesture.current
    if (!g) return
    clearTimeout(g.hold)
    clearTimeout(g.charge)
  }

  const onPointerDown = (e) => {
    if (e.button !== 0 || !place) return
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    const g = { sx: e.clientX, sy: e.clientY, ox: e.clientX - place.x, oy: e.clientY - place.y, mode: 'pending' }
    g.hold = setTimeout(() => {
      g.mode = 'charging'
      setCharging(true)
      g.charge = setTimeout(() => {
        g.mode = 'done'
        setCharging(false)
        setBurst(b => b + 1)
        // Повторное зажатие прячет инструменты вместе с открытой панелью
        if (menuRef.current) setPanelOpen(false)
        setMenuOpen(!menuRef.current)
      }, CHARGE_TIME)
    }, HOLD_DELAY)
    gesture.current = g
  }

  const onPointerMove = (e) => {
    const g = gesture.current
    if (!g || g.mode === 'done') return
    const moved = Math.hypot(e.clientX - g.sx, e.clientY - g.sy)
    if (g.mode !== 'drag' && moved > DRAG_START) {
      clearTimers()
      setCharging(false)
      g.mode = 'drag'
      setDragging(true)
    }
    if (g.mode === 'drag') setPos(clampPos({ x: e.clientX - g.ox, y: e.clientY - g.oy }))
  }

  const onPointerUp = () => {
    const g = gesture.current
    if (!g) return
    clearTimers()
    setCharging(false)
    if (g.mode === 'drag') {
      setDragging(false)
      // Бросили рядом с местом в сайдбаре — встаёт обратно на место
      setPos(p => {
        const slot = document.getElementById('kiro-buddy-slot')?.getBoundingClientRect()
        const near = p && slot && slot.width > 0 && Math.hypot(p.x + SIZE / 2 - (slot.left + slot.width / 2), p.y + SIZE / 2 - (slot.top + slot.height / 2)) < 48
        const next = near ? null : p
        store.set(POS_KEY, next)
        return next
      })
    } else if (g.mode === 'pending' && timer.active && tool !== 'timer') {
      // Короткий клик, пока идёт таймер, — показать его
      setPanelOpen(true)
    }
    gesture.current = null
  }

  useEffect(() => () => { clearTimers(); clearTimeout(switchRef.current) }, [])

  if (!desktop || !place) return null

  const cx = place.x + SIZE / 2
  const cy = place.y + SIZE / 2
  // Меню раскрывается в сторону центра экрана
  const baseAngle = Math.atan2(window.innerHeight / 2 - cy, window.innerWidth / 2 - cx)
  const toolPos = (i) => {
    const spread = 0.75
    const a = baseAngle + (i - (TOOLS.length - 1) / 2) * spread
    return { x: Math.cos(a) * 72, y: Math.sin(a) * 72 }
  }

  // Панель таймера — рядом с плашкой, со стороны, где больше места
  const PANEL_W = 268
  const toRight = cx < window.innerWidth / 2
  const panelLeft = toRight ? place.x + SIZE + 64 : place.x - PANEL_W - 64
  // В нижней половине экрана панель растёт вверх от плашки, в верхней — вниз: так она не уходит за край
  const lower = cy > window.innerHeight / 2
  const panelY = lower
    ? { bottom: clamp(window.innerHeight - cy - 110, 8, window.innerHeight - 200) }
    : { top: clamp(cy - 110, 8, window.innerHeight - 200) }
  const showBadge = timer.active && tool !== 'timer'

  return createPortal(
    <div className="kb-root" aria-live="polite">
      <div
        className={`kb-buddy${dragging ? ' is-dragging' : ''}${charging ? ' is-charging' : ''}${menuOpen ? ' is-open' : ''}`}
        style={{ transform: `translate3d(${place.x}px, ${place.y}px, 0)` }}
      >
        {menuMounted && TOOLS.map((t, i) => {
          const p = toolPos(i)
          return (
            <button
              key={t.key}
              type="button"
              className={`kb-tool${menuShown ? ' is-shown' : ''}${t.key === tool ? ' is-active' : ''}`}
              style={{ '--tx': `${p.x}px`, '--ty': `${p.y}px`, transitionDelay: menuShown ? `${60 + i * 50}ms` : '0ms' }}
              onClick={() => pickTool(t.key)}
              title={t.label}
              aria-label={t.label}
            >
              <t.Icon />
            </button>
          )
        })}

        <svg className="kb-ring" viewBox="0 0 100 100" aria-hidden="true">
          <circle className="kb-ring-track" cx="50" cy="50" r={RING_R} />
          <circle className="kb-ring-fill" cx="50" cy="50" r={RING_R} style={{ strokeDasharray: RING_C, strokeDashoffset: charging ? 0 : RING_C }} />
        </svg>
        {burst > 0 && <span key={burst} className="kb-burst" aria-hidden="true" />}

        <button
          type="button"
          className="kb-face"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onContextMenu={e => e.preventDefault()}
          aria-label="KIRO: зажми, чтобы открыть инструменты; перетащи, чтобы переместить"
          title="Зажми — инструменты, тяни — переместить"
        >
          <img src={face} alt="" draggable="false" />
        </button>

        {showBadge && (
          <span className={`kb-badge is-${timer.phase?.kind || 'work'}${timer.run?.paused ? ' is-paused' : ''}`}>{fmtClock(timer.left)}</span>
        )}
      </div>

      {panelMounted && (
        <div
          className={`kb-panel${panelShown ? ' is-shown' : ''}${toRight ? ' from-left' : ' from-right'}`}
          style={{ left: clamp(panelLeft, 8, window.innerWidth - PANEL_W - 8), ...panelY, width: PANEL_W, maxHeight: window.innerHeight - 16, overflowY: 'auto' }}
        >
          {lastTool.current === 'info'
            ? <InfoPanel onClose={() => setPanelOpen(false)} />
            : <TimerPanel timer={timer} onClose={() => setPanelOpen(false)} />}
        </div>
      )}
    </div>,
    document.body,
  )
}
