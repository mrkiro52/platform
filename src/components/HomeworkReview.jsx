import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { OPEN_WEEKS, WEEK_TITLES, hasLevels, assignmentsOf } from '../data/homeworkCatalog'

// Уровень второй недели студент выбирает в материалах — берём его же, чтобы
// список заданий совпадал с тем, что человек реально проходит.
function savedLevel() {
  try {
    const raw = Number(localStorage.getItem('kiro_week2_level'))
    return [1, 2, 3].includes(raw) ? raw : 1
  } catch {
    return 1
  }
}

// Галочка в кружке — раскрывает и сворачивает список заданий недели
function ChevronCircle({ open }) {
  return (
    <span className={`hwrev-chev${open ? ' is-open' : ''}`} aria-hidden="true">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

const LEGEND = [
  { cls: 'is-empty',     text: 'не сдано' },
  { cls: 'is-submitted', text: 'сдано, на проверке' },
  { cls: 'is-rework',    text: 'нужны правки' },
  { cls: 'is-approved',  text: 'принято' },
]

export default function HomeworkReview() {
  const navigate = useNavigate()
  const [byKey, setByKey] = useState(null)
  // Открыта всегда ровно одна неделя: клик по открытой её сворачивает,
  // клик по другой — переключает на неё.
  const [openWeek, setOpenWeek] = useState(OPEN_WEEKS[0])
  const level = savedLevel()

  useEffect(() => {
    api.myHomework()
      .then(rows => {
        const map = {}
        for (const row of rows) map[`${row.week}:${row.chapterId}:${row.taskIndex}`] = row
        setByKey(map)
      })
      .catch(() => setByKey({}))
  }, [])

  if (byKey === null) {
    return <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>Загружаем…</p>
  }

  return (
    <div className="hwrev">
      <div className="hwrev-legend">
        {LEGEND.map(item => (
          <span key={item.cls} className="hwrev-legend-item">
            <span className={`hwrev-sq ${item.cls}`} />
            {item.text}
          </span>
        ))}
      </div>

      {OPEN_WEEKS.map(week => {
        const items = assignmentsOf(week, hasLevels(week) ? level : undefined)
        const isOpen = openWeek === week
        return (
          <div key={week} className="hwrev-week">
            <button
              type="button"
              className="hwrev-week-head"
              onClick={() => setOpenWeek(prev => (prev === week ? null : week))}
              aria-expanded={isOpen}
            >
              <ChevronCircle open={isOpen} />
              <span className="hwrev-week-name">{WEEK_TITLES[week]}</span>
              {hasLevels(week) && <span className="hwrev-week-level">уровень {level}</span>}
            </button>

            <div className={`collapse-wrap${isOpen ? ' open' : ''}`}>
              <div className="collapse-inner">
            <div className="hwrev-rows">
              {items.map(item => (
                <div key={item.chapterId} className="hwrev-row">
                  <span className="hwrev-row-name">
                    <b>ДЗ {item.hwNumber}</b> {item.chapterTitle}
                  </span>
                  <span className="hwrev-squares">
                    {item.tasks.map((_, i) => {
                      const row = byKey[`${week}:${item.chapterId}:${i}`]
                      const state = row ? row.status : 'empty'
                      return (
                        <button
                          key={i}
                          type="button"
                          className={`hwrev-sq is-${state} is-clickable`}
                          title={`Задача ${i + 1}`}
                          onClick={() => navigate(`/autumn-camp/homework/${week}/${item.chapterId}/${i}`)}
                        >
                          {i + 1}
                        </button>
                      )
                    })}
                  </span>
                </div>
              ))}
            </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
