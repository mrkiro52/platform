import { useState, useEffect } from 'react'
import { SCHEDULE, TYPE_COLORS, TYPE_LABELS, TYPE_BADGE, HW_LINKS } from '../data'
import { api } from '../api'
import { SkeletonScheduleDay, SkeletonCampProgress } from '../components/Skeleton'

const MONTH_TABS = [
  { value: 'june',   label: 'Июнь',   locked: false },
  { value: 'july',   label: 'Июль',   locked: false },
  { value: 'august', label: 'Август', locked: true  },
]

const JUNE_WEEKS = [
  { label:'Неделя 1 · 1–7 июня',   start:1,  end:7  },
  { label:'Неделя 2 · 8–14 июня',  start:8,  end:14 },
  { label:'Неделя 3 · 15–21 июня', start:15, end:21 },
  { label:'Неделя 4 · 22–28 июня', start:22, end:28 },
  { label:'Неделя 5 · 29–30 июня', start:29, end:99 },
]

const TRACK_COLORS = {
  'ML':               { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  text: '#4ade80' },
  'Аналитика':        { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
  'Frontend':         { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.3)',  text: '#facc15' },
  'Backend':          { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
  'Кибербезопасность':{ bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)',  text: '#f87171' },
}

function getDayDate(dayNum, month) {
  if (month === 'july') return new Date(2026, 6, dayNum)
  if (month === 'august') return new Date(2026, 7, dayNum)
  return new Date(2026, 5, dayNum)
}

function isAvailable(dayNum, month) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return getDayDate(dayNum, month) <= today
}

// Число сегодняшнего дня, если сегодня июль 2026, иначе null
function getTodayJulyDay() {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 6) return null
  return today.getDate()
}

function findTodayId(events) {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 5) return null
  const found = events.find(e => e.day === today.getDate() && e.month === 'june')
  return found ? found.id : null
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
        const pct = Math.round(done / m.total * 100)
        return (
          <div key={m.label} className="camp-month-bar">
            <div className="camp-month-head">
              <span className="camp-month-name">{m.label}</span>
              <span className="camp-month-pct">{done}/{m.total} · {pct}%</span>
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

// Карточка для июня (старый формат — один урок в день)
function JuneDayCard({ day, expanded, onToggle }) {
  const color = TYPE_COLORS[day.type] || '#8a8a9a'
  const badge = TYPE_BADGE[day.type]  || 'badge--gray'
  const label = TYPE_LABELS[day.type] || day.type
  const hwUrl = HW_LINKS[day.day]
  const available = isAvailable(day.day, 'june')

  return (
    <div className={`sched-day${expanded ? ' sched-day--open' : ''}`}>
      <div className="sched-day-header" onClick={onToggle}>
        <div className="sched-day-stripe" style={{ background: color }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">День {day.day}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{day.date}</span>
        </div>
        <div className="sched-day-title">{day.title}</div>
        <span className={`badge ${badge}`}>{label}</span>
        <span className="sched-chevron">{expanded ? '▴' : '▾'}</span>
      </div>

      {expanded && (
        <div className="sched-day-body">
          {(day.meeting_time || day.meeting_link) && (
            <div className="sched-section">
              <div className="sched-section-label">Встреча</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {day.meeting_time && (
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-lime)' }}>
                    🕐 {day.meeting_time}
                  </span>
                )}
                {day.meeting_link && (
                  available ? (
                    <a href={day.meeting_link} target="_blank" rel="noopener" className="hw-drive-btn">
                      🔗 Присоединиться →
                    </a>
                  ) : (
                    <span className="hw-drive-btn hw-drive-btn--locked">🔒 Доступ {day.date}</span>
                  )
                )}
              </div>
            </div>
          )}
          {day.theory?.length > 0 && (
            <div className="sched-section">
              <div className="sched-section-label">Теория</div>
              <ul className="sched-list">
                {day.theory.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {hwUrl && (
            <div className="sched-section">
              <div className="sched-section-label">Домашнее задание</div>
              {available
                ? <a href={hwUrl} className="hw-drive-btn" target="_blank" rel="noopener">Открыть папку с ДЗ →</a>
                : <span className="hw-drive-btn hw-drive-btn--locked">🔒 Откроется {day.date}</span>
              }
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Карточка занятия для июля (трек + время + описание)
function JulySessionCard({ session }) {
  const tracks = session.tracks || []

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-lime)', minWidth: 44 }}>
          {session.meeting_time}
        </span>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', flex: 1 }}>
          {session.title}
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tracks.map(t => {
            const c = TRACK_COLORS[t] || { bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.15)', text: 'var(--text-secondary)' }
            return (
              <span key={t} style={{
                background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 600,
              }}>{t}</span>
            )
          })}
        </div>
      </div>
      {session.description && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          {session.description}
        </p>
      )}
    </div>
  )
}

// Группировка занятий июля по дням
function JulyDayGroup({ dayNum, dateLabel, sessions, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className={`sched-day${open ? ' sched-day--open' : ''}`} style={{ marginBottom: 8 }}>
      <div className="sched-day-header" onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
        <div className="sched-day-stripe" style={{ background: '#a07aff' }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">День {dayNum}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{dateLabel}</span>
        </div>
        <div className="sched-day-title" style={{ flex: 1 }}>
          {sessions.length} {sessions.length === 1 ? 'занятие' : sessions.length < 5 ? 'занятия' : 'занятий'}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginRight: 8 }}>
          {[...new Set(sessions.flatMap(s => s.tracks || []))].map(t => {
            const c = TRACK_COLORS[t] || {}
            return (
              <span key={t} style={{
                background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700,
              }}>{t}</span>
            )
          })}
        </div>
        <span className="sched-chevron">{open ? '▴' : '▾'}</span>
      </div>
      {open && (
        <div className="sched-day-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sessions.sort((a, b) => (a.meeting_time || '').localeCompare(b.meeting_time || '')).map(s => (
            <JulySessionCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Schedule() {
  const [activeMonth, setActiveMonth] = useState('july')
  const [events, setEvents]           = useState(SCHEDULE)
  const [expandedId, setExpandedId]   = useState(() => findTodayId(SCHEDULE))
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    api.schedule().then(data => {
      setEvents(data)
      const id = findTodayId(data)
      if (id !== null) setExpandedId(id)
      const elapsed = Date.now() - startTime
      setTimeout(() => setLoading(false), Math.max(0, 500 - elapsed))
    }).catch(() => {
      setTimeout(() => setLoading(false), 500)
    })
  }, [])

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  const juneEvents = events.filter(e => e.month === 'june' || !e.month)
  const julyEvents = events.filter(e => e.month === 'july')

  // Группируем июль по дням
  const julyByDay = {}
  julyEvents.forEach(e => {
    if (!julyByDay[e.day]) julyByDay[e.day] = []
    julyByDay[e.day].push(e)
  })
  const julyDays = Object.keys(julyByDay).map(Number).sort((a, b) => a - b)
  const todayJulyDay = getTodayJulyDay()

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Расписание</h1>
        <p className="page-subtitle">Программа лагеря — теория, задания и ДЗ по каждому дню</p>
      </div>

      {loading ? <SkeletonCampProgress /> : <CampProgress />}

      {/* Вкладки месяцев */}
      <div style={{ display: 'flex', gap: 8, margin: '20px 0 24px' }}>
        {MONTH_TABS.map(tab => (
          <button
            key={tab.value}
            disabled={tab.locked || loading}
            onClick={() => !tab.locked && setActiveMonth(tab.value)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: activeMonth === tab.value
                ? '1px solid rgba(200,255,0,0.4)'
                : '1px solid var(--border-color)',
              background: activeMonth === tab.value
                ? 'rgba(200,255,0,0.08)'
                : 'var(--bg-secondary)',
              color: tab.locked
                ? 'var(--text-tertiary)'
                : activeMonth === tab.value
                  ? 'var(--accent-lime)'
                  : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: 14,
              cursor: tab.locked ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
              opacity: tab.locked ? 0.5 : 1,
            }}
          >
            {tab.locked && <span style={{ fontSize: 12 }}>🔒</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Июнь */}
      {activeMonth === 'june' && (
        loading ? (
          <div className="sched-week">
            {[1,2,3,4,5].map(i => <SkeletonScheduleDay key={i} />)}
          </div>
        ) : (
          JUNE_WEEKS.map(week => {
            const days = juneEvents.filter(d => d.day >= week.start && d.day <= week.end)
            if (!days.length) return null
            return (
              <div key={week.label} className="sched-week">
                <div className="schedule-date-label">{week.label}</div>
                {days.map((day, i) => (
                  <div key={day.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                    <JuneDayCard
                      day={day}
                      expanded={expandedId === day.id}
                      onToggle={() => toggle(day.id)}
                    />
                  </div>
                ))}
              </div>
            )
          })
        )
      )}

      {/* Июль */}
      {activeMonth === 'july' && (
        loading ? (
          <div className="sched-week">
            {[1,2].map(i => <SkeletonScheduleDay key={i} />)}
          </div>
        ) : julyDays.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', padding: '20px 0' }}>Расписание июля скоро появится</p>
        ) : (
          <div className="sched-week">
            <div className="schedule-date-label">Июль 2026</div>
            {julyDays.map(dayNum => (
              <JulyDayGroup
                key={dayNum}
                dayNum={dayNum}
                dateLabel={julyByDay[dayNum][0]?.date || `${dayNum} июля`}
                sessions={julyByDay[dayNum]}
                defaultOpen={dayNum === todayJulyDay}
              />
            ))}
          </div>
        )
      )}
    </section>
  )
}
