import { useState, useEffect, useRef } from 'react'
import { LIBRARY, HW_LINKS } from '../data'
import { api } from '../api'
import { SkeletonNewsCard, SkeletonCampProgress, SkeletonEventCard } from '../components/Skeleton'

const RU_MONTHS  = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
const RU_WEEKDAY = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']

const JUNE_CHECKLIST = [
  { title: 'Основы программирования',        desc: 'переменные, циклы, if-else, функции' },
  { title: 'Оценка алгоритмов по Big O',     desc: 'O(1), O(n), O(log n) — время и память' },
  { title: 'Дискретная математика',           desc: 'множества, графы, теория вероятностей' },
  { title: 'Массивы и связные списки',        desc: 'операции, сложность, отличия' },
  { title: 'Стек и очередь',                 desc: 'LIFO, FIFO, применение' },
  { title: 'Хеш-таблицы',                    desc: 'хеш-функция, коллизии, поиск за O(1)' },
  { title: 'Деревья',                         desc: 'BST, обходы, высота, балансировка' },
  { title: 'Работа с Git',                    desc: 'commit, branch, merge, pull request' },
  { title: 'ИИ-инструменты',                  desc: 'Claude Code, Copilot, промпт-инжиниринг' },
  { title: 'Мини-проект',                     desc: 'визуализация алгоритма, публичный репозиторий' },
  { title: 'Тайм и таск-менеджмент',          desc: 'Pomodoro, Notion, приоритеты' },
  { title: 'Базы данных и SQL',               desc: 'SELECT, JOIN, индексы, нормализация' },
  { title: 'Алгоритмы сортировок',            desc: 'bubble, merge, quick — сложность и идеи' },
  { title: 'Паттерны задач',                  desc: 'two pointers, sliding window, DP, BFS/DFS' },
  { title: 'Soft skills',                     desc: 'коммуникация, фидбек, STAR-метод' },
  { title: 'Набросок резюме',                 desc: 'стек, проекты, опыт, формат' },
]

function JuneChecklist({ user }) {
  const storageKey = 'kiro_june_checklist'
  const [checked, setChecked] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey)) || {} } catch { return {} }
  })

  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] }
    setChecked(next)
    localStorage.setItem(storageKey, JSON.stringify(next))
  }

  const download = () => {
    const nickname = user?.nickname || user?.name || 'Участник'
    const doneCount = JUNE_CHECKLIST.filter((_, i) => checked[i]).length
    const GREEN = '#20beff'
    const BG = '#111111'
    const CARD = '#1a1a1a'
    const WHITE = '#ffffff'
    const GRAY = '#888888'
    const cols = 2
    const rows = Math.ceil(JUNE_CHECKLIST.length / cols)
    const colW = 480
    const rowH = 56
    const padX = 40
    const padY = 40
    const headerH = 80
    const footerH = 50
    const totalW = colW * cols + padX * 2
    const totalH = headerH + rows * rowH + padY + footerH
    const canvas = document.createElement('canvas')
    canvas.width = totalW
    canvas.height = totalH
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, totalW, totalH)

    // card bg
    ctx.fillStyle = CARD
    ctx.beginPath()
    ctx.roundRect(padX - 16, padY - 16, totalW - (padX - 16) * 2, totalH - (padY - 16) * 2, 16)
    ctx.fill()

    // header
    ctx.fillStyle = GREEN
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif'
    ctx.fillText('KIRO', padX, padY + 18)
    ctx.fillStyle = WHITE
    ctx.font = '22px system-ui, -apple-system, sans-serif'
    ctx.fillText('  Чек-лист за июнь', padX + 52, padY + 18)
    ctx.fillStyle = GRAY
    ctx.font = '14px system-ui, -apple-system, sans-serif'
    ctx.fillText(`${nickname}  ·  Выполнено: ${doneCount} из ${JUNE_CHECKLIST.length}`, padX, padY + 44)

    // divider
    ctx.fillStyle = '#333'
    ctx.fillRect(padX, padY + 56, totalW - padX * 2, 1)

    // items
    JUNE_CHECKLIST.forEach(({ title, desc }, i) => {
      const col = i % cols
      const row = Math.floor(i / cols)
      const x = padX + col * colW
      const y = headerH + padY + row * rowH
      const isChecked = !!checked[i]
      const boxSize = 18

      if (isChecked) {
        ctx.fillStyle = GREEN
        ctx.beginPath()
        ctx.roundRect(x, y + 4, boxSize, boxSize, 4)
        ctx.fill()
        ctx.strokeStyle = BG
        ctx.lineWidth = 2.5
        ctx.beginPath()
        ctx.moveTo(x + 4, y + 13)
        ctx.lineTo(x + 8, y + 17)
        ctx.lineTo(x + 14, y + 9)
        ctx.stroke()
      } else {
        ctx.strokeStyle = WHITE
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(x, y + 4, boxSize, boxSize, 4)
        ctx.stroke()
      }

      // title
      ctx.fillStyle = isChecked ? GRAY : WHITE
      ctx.font = `bold 14px system-ui, -apple-system, sans-serif`
      ctx.fillText(title, x + boxSize + 10, y + 16)
      if (isChecked) {
        const tw = ctx.measureText(title).width
        ctx.fillStyle = GRAY
        ctx.fillRect(x + boxSize + 10, y + 10, tw, 1)
      }

      // desc
      ctx.fillStyle = GRAY
      ctx.font = `12px system-ui, -apple-system, sans-serif`
      ctx.fillText(desc, x + boxSize + 10, y + 33)
    })

    // footer
    ctx.fillStyle = GRAY
    ctx.font = '12px system-ui, -apple-system, sans-serif'
    ctx.fillText('kiroplatform.ru  ·  IT Summer Camp \'26', padX, totalH - padY + 10)

    const link = document.createElement('a')
    link.href = canvas.toDataURL('image/png')
    link.download = `kiro-checklist-june-${nickname}.png`
    link.click()
  }

  const doneCount = JUNE_CHECKLIST.filter((_, i) => checked[i]).length

  const cbStyle = (isChecked) => ({
    width: 18,
    height: 18,
    borderRadius: 0,
    border: isChecked ? '2px solid #20beff' : '2px solid var(--border-color)',
    background: isChecked ? '#20beff' : 'transparent',
    flexShrink: 0,
    marginTop: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.15s',
  })

  return (
    <div className="widget" style={{ marginBottom: 20 }}>
      <div className="widget-header">
        <span className="widget-title">Чек-лист за июнь</span>
        <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{doneCount}/{JUNE_CHECKLIST.length}</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 20px', marginBottom: 16 }}>
        {JUNE_CHECKLIST.map(({ title, desc }, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 9, cursor: 'pointer', userSelect: 'none' }}
          >
            <div style={{ ...cbStyle(!!checked[i]), marginTop: 3 }}>
              {checked[i] && (
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                  <path d="M1 3.5L4 6.5L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3, color: checked[i] ? 'var(--text-tertiary)' : 'var(--text-primary)', textDecoration: checked[i] ? 'line-through' : 'none' }}>{title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: 1.3, marginTop: 1 }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={download}
        style={{ fontSize: 13, padding: '8px 20px', borderRadius: 0, border: 'none', background: 'var(--accent-ink)', color: '#fff', cursor: 'pointer', fontWeight: 700 }}
      >
        Скачать чек-лист
      </button>
    </div>
  )
}

function CampProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const months = [
    { label:'Июнь',   total:30, start: new Date(2026, 5, 1) },
    { label:'Июль',   total:31, start: new Date(2026, 6, 1) },
    { label:'Август', total:31, start: new Date(2026, 7, 1) },
  ]
  return (
    <div className="camp-progress">
      {months.map(m => {
        let done = 0
        const segs = Array.from({ length: m.total }, (_, i) => {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          const isToday = d.getTime() === today.getTime()
          const isPast  = d < today
          if (isToday || isPast) done++
          return { isToday, isPast }
        })
        return (
          <div key={m.label} className="camp-month-bar">
            <div className="camp-month-head">
              <span className="camp-month-name">{m.label}</span>
              <span className="camp-month-pct">{done}/{m.total} · {Math.round(done/m.total*100)}%</span>
            </div>
            <div className="camp-segs">
              {segs.map((s, i) => (
                <div key={i} className={`camp-seg${s.isToday ? ' s-today' : s.isPast ? ' s-past' : ''}`} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function fmt(s) {
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

export default function Dashboard({ user, onOpenDay, onNavigate }) {
  const [announcements, setAnnouncements] = useState([])
  const [library, setLibrary]   = useState(LIBRARY)
  const [notes, setNotes]       = useState(() => localStorage.getItem('kiro_notes') || '')
  const [loading, setLoading]   = useState(true)

  const [timerH, setTimerH] = useState(0)
  const [timerM, setTimerM] = useState(25)
  const [timerS, setTimerS] = useState(0)
  const [timerLeft, setTimerLeft]   = useState(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500 // минимум 0.5 сек показываем скелетоны

    Promise.all([
      api.announcements().then(setAnnouncements).catch(() => {}),
      api.library().then(setLibrary).catch(() => {}),
    ]).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerLeft(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); setTimerRunning(false); return 0 }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [timerRunning])

  const totalSecs = timerH * 3600 + timerM * 60 + timerS
  const startTimer = () => { if (timerLeft === null) setTimerLeft(totalSecs); setTimerRunning(true) }
  const pauseTimer = () => setTimerRunning(false)
  const resetTimer = () => { setTimerRunning(false); setTimerLeft(null) }

  const handleNotes = (e) => {
    setNotes(e.target.value)
    localStorage.setItem('kiro_notes', e.target.value)
  }

  const today    = new Date()
  const isJune26 = today.getFullYear() === 2026 && today.getMonth() === 5
  const todayDay = isJune26 ? today.getDate() : null
  const todayHwUrl  = todayDay ? HW_LINKS[todayDay] : null
  const allLibDays  = library.flatMap(wk => wk.days)
  const todayLibDay = todayDay ? allLibDays.find(d => (d.num ?? d.id) === todayDay) : null
  const dateLabel   = `${RU_WEEKDAY[today.getDay()]}, ${today.getDate()} ${RU_MONTHS[today.getMonth()]} ${today.getFullYear()}`

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Дэшборд</h1>
        <p className="page-subtitle" style={{ textTransform:'capitalize' }}>{dateLabel}</p>
      </div>

      {loading ? <SkeletonCampProgress /> : <CampProgress />}

      <div className="dash-grid">
        {/* LEFT */}
        <div className="dash-col">
          <JuneChecklist user={user} />

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Таймер</span>
            </div>
            {timerLeft !== null ? (
              <div className={`timer-display${timerLeft === 0 ? ' timer-done' : ''}`}>
                {timerLeft === 0 ? 'Время вышло!' : fmt(timerLeft)}
              </div>
            ) : (
              <div className="timer-setup">
                <input type="number" min="0" max="23" value={timerH}
                  onChange={e => setTimerH(Math.max(0, Math.min(23, +e.target.value||0)))} />
                <span>ч</span>
                <input type="number" min="0" max="59" value={timerM}
                  onChange={e => setTimerM(Math.max(0, Math.min(59, +e.target.value||0)))} />
                <span>мин</span>
                <input type="number" min="0" max="59" value={timerS}
                  onChange={e => setTimerS(Math.max(0, Math.min(59, +e.target.value||0)))} />
                <span>сек</span>
              </div>
            )}
            <div className="timer-btns">
              {timerLeft === null
                ? <button className="timer-btn-start" onClick={startTimer} disabled={totalSecs === 0}>Старт</button>
                : timerRunning
                  ? <button className="timer-btn-pause" onClick={pauseTimer}>Пауза</button>
                  : timerLeft > 0
                    ? <button className="timer-btn-start" onClick={startTimer}>Продолжить</button>
                    : null
              }
              {timerLeft !== null && (
                <button className="timer-btn-reset" onClick={resetTimer}>Сбросить</button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-col">
          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Новости и обновления</span>
            </div>
            {loading
              ? [1, 2].map(i => <SkeletonNewsCard key={i} />)
              : announcements.length === 0
              ? <p style={{ color:'var(--text-tertiary)', fontSize:13, padding:'4px 0' }}>Объявлений пока нет</p>
              : announcements.slice(0, 3).map((n, i) => (
                <div key={n.id} className="news-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="news-card-head">
                    <span className="news-card-title">{n.icon || '📢'} {n.title}</span>
                    <span className="news-card-date">{n.published_at}</span>
                  </div>
                  <div className="news-card-text">{n.text}</div>
                </div>
              ))
            }
            {!loading && announcements.length > 3 && (
              <div className="dash-nav-link" style={{ marginTop: 10 }} onClick={() => onNavigate('announcements')}>
                Показать еще →
              </div>
            )}
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Заметки</span>
              <button
                onClick={() => { setNotes(''); localStorage.removeItem('kiro_notes') }}
                style={{ fontSize:12, color:'var(--text-tertiary)', background:'none', border:'none', cursor:'pointer' }}
              >
                Очистить
              </button>
            </div>
            <textarea
              className="notes-area"
              value={notes}
              onChange={handleNotes}
              placeholder="Пиши здесь что угодно — сохраняется автоматически"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
