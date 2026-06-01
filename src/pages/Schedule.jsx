import { useState, useEffect } from 'react'
import { SCHEDULE, TYPE_COLORS, TYPE_LABELS, TYPE_BADGE, HW_LINKS } from '../data'
import { api } from '../api'
import { SkeletonScheduleDay, SkeletonCampProgress } from '../components/Skeleton'

const FILTERS = [
  { value:'all',     label:'Все' },
  { value:'lecture', label:'Лекции' },
  { value:'project', label:'Проекты' },
  { value:'insider', label:'Insider Show' },
  { value:'org',     label:'Орг' },
]

const WEEKS = [
  { label:'Неделя 1 · 1–7 июня',   start:1,  end:7  },
  { label:'Неделя 2 · 8–14 июня',  start:8,  end:14 },
  { label:'Неделя 3 · 15–21 июня', start:15, end:21 },
  { label:'Неделя 4 · 22–28 июня', start:22, end:28 },
  { label:'Неделя 5 · 29–30 июня', start:29, end:99 },
]

function getDayDate(dayNum) {
  if (dayNum <= 30) return new Date(2026, 5, dayNum)
  return new Date(2026, 6, dayNum - 30)
}

function isAvailable(dayNum) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return getDayDate(dayNum) <= today
}

function findTodayId(events) {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 5) return null
  const found = events.find(e => e.day === today.getDate())
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

function DayCard({ day, expanded, onToggle }) {
  const color = TYPE_COLORS[day.type] || '#8a8a9a'
  const badge = TYPE_BADGE[day.type]  || 'badge--gray'
  const label = TYPE_LABELS[day.type] || day.type
  const hwUrl = HW_LINKS[day.day]
  const available = isAvailable(day.day)

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

export default function Schedule() {
  const [filter, setFilter]         = useState('all')
  const [events, setEvents]         = useState(SCHEDULE)
  const [expandedId, setExpandedId] = useState(() => findTodayId(SCHEDULE))
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500

    api.schedule().then(data => {
      setEvents(data)
      const id = findTodayId(data)
      if (id !== null) setExpandedId(id)

      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    }).catch(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter)
  const toggle   = (id) => setExpandedId(prev => prev === id ? null : id)

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Расписание</h1>
        <p className="page-subtitle">Программа лагеря — теория, задания и ДЗ по каждому дню</p>
      </div>

      {loading ? <SkeletonCampProgress /> : <CampProgress />}

      <div className="schedule-controls">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' active' : ''}`}
            onClick={() => { setFilter(f.value); setExpandedId(null) }}
            disabled={loading}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="sched-week">
          {[1, 2, 3, 4, 5].map(i => (
            <SkeletonScheduleDay key={i} />
          ))}
        </div>
      ) : (
        WEEKS.map(week => {
          const days = filtered.filter(d => d.day >= week.start && d.day <= week.end)
          if (!days.length) return null
          return (
            <div key={week.label} className="sched-week">
              <div className="schedule-date-label">{week.label}</div>
              {days.map((day, i) => (
                <div key={day.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                  <DayCard
                    day={day}
                    expanded={expandedId === day.id}
                    onToggle={() => toggle(day.id)}
                  />
                </div>
              ))}
            </div>
          )
        })
      )}

      {!loading && !filtered.length && (
        <p style={{ color:'var(--text-tertiary)', padding:'20px 0' }}>Нет занятий для этого фильтра</p>
      )}
    </section>
  )
}
