import { useState, useEffect } from 'react'
import { SCHEDULE, LIBRARY } from '../data'
import { api } from '../api'
import { SkeletonLibraryDay } from '../components/Skeleton'

const TABS = [
  { value:'june',   label:'Июнь — Фундамент',    locked: false },
  { value:'july',   label:'Июль — Специализация', locked: true  },
  { value:'august', label:'Август — Карьера',      locked: true  },
]

const WEEKS = [
  { label:'Неделя 1 · 1–7 июня',   start:1,  end:7  },
  { label:'Неделя 2 · 8–14 июня',  start:8,  end:14 },
  { label:'Неделя 3 · 15–21 июня', start:15, end:21 },
  { label:'Неделя 4 · 22–28 июня', start:22, end:28 },
  { label:'Неделя 5 · 29–30 июня', start:29, end:99 },
]

const WD_SHORT = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ']
const MON_CAPS = ['ЯНВАРЯ','ФЕВРАЛЯ','МАРТА','АПРЕЛЯ','МАЯ','ИЮНЯ','ИЮЛЯ','АВГУСТА','СЕНТЯБРЯ','ОКТЯБРЯ','НОЯБРЯ','ДЕКАБРЯ']

function dayDateLabel(dayNum) {
  const d = new Date(2026, 5, dayNum)
  return `${WD_SHORT[d.getDay()]}, ${dayNum} ${MON_CAPS[d.getMonth()]}`
}

function isAvailable(dayNum) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDate = new Date(2026, 5, dayNum)
  return dayDate <= today
}

function shouldShowButtons(dayNum) {
  const today = new Date()
  const currentDay = today.getDate()
  return dayNum >= 2 && dayNum <= currentDay
}

function buildJuneDays(scheduleData, libraryData) {
  // Library API provides titles (admin-editable) + materials
  const libByDay = {}
  libraryData.forEach(wk => {
    wk.days.forEach(d => {
      const n = d.num ?? d.id
      libByDay[n] = { title: d.title, mats: d.mats || [], id: d.id }
    })
  })
  // Schedule provides fallback titles and guarantees all 30 days are present
  const schedByDay = {}
  scheduleData.filter(e => e.day >= 1 && e.day <= 30).forEach(e => {
    schedByDay[e.day] = e.title
  })
  return Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1
    const lib = libByDay[dayNum]
    return {
      id: lib?.id ?? dayNum,
      day: dayNum,
      title: lib?.title || schedByDay[dayNum] || `День ${dayNum}`,
      mats: lib?.mats || [],
    }
  })
}

function DayCard({ day, onOpen, onOpenTheory, onOpenQuestions }) {
  const locked = !isAvailable(day.day)
  const showButtons = shouldShowButtons(day.day)
  const color  = locked ? 'rgba(255,255,255,0.08)' : '#c8ff00'
  const hasMats = day.mats?.length > 0

  return (
    <div
      className={`sched-day${!locked && hasMats ? ' sched-day--open' : ''}`}
      style={locked ? { opacity: 0.4 } : hasMats ? { cursor:'pointer', borderColor:'rgba(200,255,0,0.1)' } : { cursor:'default' }}
      onClick={!locked && hasMats ? () => onOpen(day) : undefined}
    >
      <div className="sched-day-header" style={{ pointerEvents:'none' }}>
        <div className="sched-day-stripe" style={{ background: color }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">{String(day.day).padStart(2,'0')}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{dayDateLabel(day.day)}</span>
        </div>
        <div className="sched-day-title">{day.title}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
          {showButtons && (
            <>
              <button
                className="theory-file-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenTheory(day)
                }}
                title="Открыть теорию"
              >
                📚
              </button>
              <button
                className="theory-file-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenQuestions(day)
                }}
                title="Открыть задачи"
              >
                📝
              </button>
            </>
          )}
          {!locked && hasMats && (
            <button
              className="theory-file-btn"
              onClick={(e) => {
                e.stopPropagation()
                onOpen(day)
              }}
              title="Открыть материалы"
            >
              🔗
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Library({ onOpenDay, onOpenTheory, onOpenQuestions }) {
  const [activeMonth, setActiveMonth] = useState('june')
  const [library, setLibrary]         = useState(LIBRARY)
  const [schedule, setSchedule]       = useState(SCHEDULE)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500

    Promise.all([
      api.library().then(setLibrary).catch(() => {}),
      api.schedule().then(setSchedule).catch(() => {}),
    ]).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  const juneDays = buildJuneDays(schedule, library)

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
        <p className="page-subtitle">Материалы лагеря по дням — нажми на день чтобы открыть</p>
      </div>

      <div className="library-tabs">
        {TABS.map(tab => (
          <button
            key={tab.value}
            className={`lib-tab${activeMonth === tab.value ? ' active' : ''}${tab.locked ? ' lib-tab--locked' : ''}`}
            onClick={tab.locked ? undefined : () => setActiveMonth(tab.value)}
            disabled={tab.locked}
          >
            {tab.label}{tab.locked ? ' 🔒' : ''}
          </button>
        ))}
      </div>

      {activeMonth === 'june' ? (
        loading ? (
          <div className="sched-week">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonLibraryDay key={i} />
            ))}
          </div>
        ) : (
          WEEKS.map(week => {
            const days = juneDays.filter(d => d.day >= week.start && d.day <= week.end)
            if (!days.length) return null
            return (
              <div key={week.label} className="sched-week">
                <div className="schedule-date-label">{week.label}</div>
                {days.map((day, i) => (
                  <div key={day.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                    <DayCard day={day} onOpen={onOpenDay} onOpenTheory={onOpenTheory} onOpenQuestions={onOpenQuestions} />
                  </div>
                ))}
              </div>
            )
          })
        )
      ) : (
        <p style={{ color:'var(--text-tertiary)', padding:'20px 0' }}>Материалы появятся позже</p>
      )}
    </section>
  )
}
