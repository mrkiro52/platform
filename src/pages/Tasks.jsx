import { useState } from 'react'
import { HW_LINKS } from '../data'

const MONTHS_RU = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']

function getDayDate(dayNum) {
  if (dayNum <= 30) return new Date(2026, 5, dayNum)
  return new Date(2026, 6, dayNum - 30)
}

function isAvailable(dayNum) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return getDayDate(dayNum) <= today
}

function toDateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

function getStatuses() {
  try { return JSON.parse(localStorage.getItem('kiro_hw_status') || '{}') } catch { return {} }
}

const HW_TASKS = Array.from({ length: 31 }, (_, i) => {
  const dayNum = i + 1
  const d = getDayDate(dayNum)
  const week = dayNum <= 7 ? 1 : dayNum <= 14 ? 2 : dayNum <= 21 ? 3 : dayNum <= 28 ? 4 : 5
  const dateLabel = `${String(d.getDate()).padStart(2,'0')} ${MONTHS_RU[d.getMonth()]} ${d.getFullYear()}`
  return { id: dayNum, url: HW_LINKS[dayNum], week, dateLabel, dateKey: toDateKey(d) }
})

const FILTERS = [
  { value:'all',  label:'Все' },
  { value:'open', label:'Открытые' },
  { value:'done', label:'Выполненные' },
]

export default function Tasks() {
  const [statuses, setStatuses] = useState(getStatuses)
  const [filter, setFilter]     = useState('all')

  const toggle = (dateKey) => {
    setStatuses(prev => {
      const next = { ...prev, [dateKey]: prev[dateKey] === 'done' ? 'active' : 'done' }
      localStorage.setItem('kiro_hw_status', JSON.stringify(next))
      return next
    })
  }

  const filtered = HW_TASKS.filter(task => {
    if (filter === 'done') return statuses[task.dateKey] === 'done'
    if (filter === 'open') return statuses[task.dateKey] !== 'done'
    return true
  })

  const doneCount = HW_TASKS.filter(t => statuses[t.dateKey] === 'done').length

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Задания</h1>
        <p className="page-subtitle">Домашние задания по дням · Выполнено {doneCount}/{HW_TASKS.length}</p>
      </div>

      <div className="schedule-controls">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn${filter === f.value ? ' active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div>
        {filtered.length === 0 ? (
          <p style={{ color:'var(--text-tertiary)', padding:'20px 0' }}>Нет заданий</p>
        ) : filtered.map(task => {
          const done      = statuses[task.dateKey] === 'done'
          const available = isAvailable(task.id)
          return (
            <div key={task.id} className={`task-card${done ? ' task-card--done' : ''}`}>
              <div
                className={`task-checkbox${done ? ' checked' : ''}`}
                onClick={() => toggle(task.dateKey)}
              >
                {done ? '✓' : ''}
              </div>
              <div className="task-body">
                <div className="task-title">
                  Домашнее задание от {task.dateLabel}, Неделя {task.week}
                </div>
                <div className="task-meta">
                  {available
                    ? <a href={task.url} target="_blank" rel="noopener" className="hw-link-btn">Открыть папку с ДЗ →</a>
                    : <span className="hw-link-locked">🔒 Открывается {task.dateLabel}</span>
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
