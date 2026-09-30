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

const STATUS_TEXT = {
  empty: 'не сдано', submitted: 'на проверке', rework: 'нужны правки', approved: 'принято',
}

// Неделя таблицей: столбцы — домашние задания, строки — задачи. У ДЗ из
// одной задачи заполнена только первая строка, у SQL-задания — десять.
function WeekMatrix({ week, items, byKey, onOpen }) {
  const rows = Math.max(1, ...items.map(it => it.tasks.length))

  return (
    <div className="hwrev-matrix-scroll">
      <div className="hwrev-matrix" role="table" aria-label="Статусы задач по домашним заданиям" style={{ '--cols': items.length }}>
        <div className="hwrev-mrow" role="row">
          <span className="hwrev-corner" role="columnheader">ДЗ</span>
          {items.map(it => (
            <span key={it.chapterId} className="hwrev-col" role="columnheader" title={`ДЗ ${it.hwNumber}: ${it.chapterTitle}`}>
              {it.hwNumber}
            </span>
          ))}
        </div>

        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="hwrev-mrow" role="row">
            <span className="hwrev-rowhead" role="rowheader">задача {i + 1}</span>
            {items.map(it => {
              if (i >= it.tasks.length) return <span key={it.chapterId} className="hwrev-cell" role="cell" />
              const row = byKey[`${week}:${it.chapterId}:${i}`]
              const state = row ? row.status : 'empty'
              return (
                <span key={it.chapterId} className="hwrev-cell" role="cell">
                  <button
                    type="button"
                    className={`hwrev-sq is-${state} is-clickable`}
                    title={`ДЗ ${it.hwNumber}, задача ${i + 1} — ${STATUS_TEXT[state]}\n${it.chapterTitle}`}
                    aria-label={`ДЗ ${it.hwNumber}, задача ${i + 1}: ${STATUS_TEXT[state]}`}
                    onClick={() => onOpen(it.chapterId, i)}
                  />
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function HomeworkReview() {
  const navigate = useNavigate()
  const [byKey, setByKey] = useState(null)
  // Ни одна неделя не раскрыта по умолчанию — иначе первая всегда тянет
  // вниз весь список. Открыта может быть только одна: клик по открытой
  // сворачивает её, клик по другой — переключает.
  const [openWeek, setOpenWeek] = useState(null)
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
      <p className="hwrev-caption">
        По горизонтали — номера ДЗ, по вертикали — задачи. Нажми на квадрат, чтобы открыть задачу.
      </p>

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
              <div className="collapse-inner" inert={isOpen ? undefined : ''}>
                <WeekMatrix
                  week={week}
                  items={items}
                  byKey={byKey}
                  onOpen={(chapterId, i) => navigate(`/autumn-camp/homework/${week}/${chapterId}/${i}`)}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
