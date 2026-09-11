import { useState, useMemo, useRef, useEffect } from 'react'
import { AUTUMN_WEEK_MONTHS } from '../data/autumnWeeks'
import { WEEK1_CHAPTERS } from '../data/week1Materials'
import { WEEK2_LEVELS, chaptersForLevel } from '../data/week2Materials'

// Открыты только первые две недели — остальные под замком до своего времени
const UNLOCKED = new Set(['week1', 'week2'])

// Та же инлайн-разметка, что в материалах: **жирный** и `код`
function renderInline(text) {
  return String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.92em', color: '#FFB870',
          background: 'rgba(255,140,66,0.10)', padding: '1px 5px', borderRadius: 4,
        }}>
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

// Задания недели: для первой берём все главы, для второй — только те,
// что входят в выбранный уровень. На первом уровне задания в тетради.
function homeworkFor(weekSlug, level) {
  if (weekSlug === 'week1') {
    return WEEK1_CHAPTERS.map(ch => ({ chapter: ch.title, hw: ch.homework }))
  }
  if (weekSlug === 'week2' && level) {
    return chaptersForLevel(level).map(ch => ({
      chapter: ch.title,
      hw: level === 1 && ch.homeworkPaper ? ch.homeworkPaper : ch.homework,
    }))
  }
  return []
}

function WeekButton({ week, active, onSelect }) {
  const unlocked = UNLOCKED.has(week.slug)

  return (
    <button
      type="button"
      className={`hw-week${active ? ' is-active' : ''}${unlocked ? '' : ' is-locked'}`}
      disabled={!unlocked}
      onClick={() => unlocked && onSelect(week.slug)}
      title={unlocked ? undefined : 'Задания этой недели откроются позже'}
    >
      <span className="hw-week-name">Неделя {week.indexInMonth}</span>
      <span className="hw-week-range">{week.rangeText}</span>
      {!unlocked && <span className="hw-week-lock"><LockIcon /></span>}
    </button>
  )
}

export default function HomeworkPicker() {
  const [week, setWeek] = useState(null)
  const [level, setLevel] = useState(null)
  const pickerRef = useRef(null)
  const tasksRef = useRef(null)
  const [pickerHeight, setPickerHeight] = useState(null)

  const showLevels = week === 'week2'
  const items = useMemo(() => homeworkFor(week, level), [week, level])

  // Правая колонка ростом с левую: список недель задаёт высоту блока,
  // задания внутри прокручиваются. Следим за реальной высотой, а не за
  // константой — она меняется при смене ширины окна.
  useEffect(() => {
    const el = pickerRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => setPickerHeight(el.offsetHeight))
    observer.observe(el)
    setPickerHeight(el.offsetHeight)
    return () => observer.disconnect()
  }, [])

  // При смене недели или уровня список начинается сначала — иначе человек
  // остаётся в середине прошлого задания и не видит, что он сменился.
  useEffect(() => {
    if (tasksRef.current) tasksRef.current.scrollTop = 0
  }, [week, level])

  const selectWeek = (slug) => {
    setWeek(slug)
    setLevel(null)     // уровень выбирается заново под каждую неделю
  }

  // Сквозной счётчик задач — по нему считается задержка появления,
  // чтобы плашки проявлялись одна за другой, а не все разом.
  let taskIndex = -1

  return (
    <div className="hw-block">
      <div className={`hw-picker${showLevels ? ' is-narrow' : ''}`} ref={pickerRef}>
        {AUTUMN_WEEK_MONTHS.map(month => (
          <div key={month.label} className="hw-month">
            <div className="hw-month-label">{month.label}</div>
            <div className="hw-weeks">
              {month.weeks.map(w => (
                <WeekButton key={w.slug} week={w} active={week === w.slug} onSelect={selectWeek} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {showLevels && (
        <div className="hw-levels">
          <div className="hw-levels-label">Уровень</div>
          {WEEK2_LEVELS.map((lvl, i) => (
            <button
              key={lvl.id}
              type="button"
              className={`hw-level${level === lvl.id ? ' is-active' : ''}`}
              style={{ '--i': i }}
              onClick={() => setLevel(lvl.id)}
              title={`Уровень ${lvl.id} — «${lvl.title}»`}
            >
              {lvl.id}
            </button>
          ))}
        </div>
      )}

      <div
        className="hw-tasks"
        ref={tasksRef}
        key={`${week || 'none'}-${level || 0}`}
        style={pickerHeight ? { '--hw-height': `${pickerHeight}px` } : undefined}
      >
        {!week && (
          <div className="hw-hint">Выбери неделю слева — здесь появятся условия всех задач.</div>
        )}

        {items.map(({ chapter, hw }) => (
          <div key={hw.number} className="hw-group">
            <div className="hw-group-head">
              <span className="hw-group-num">Домашнее задание {hw.number}</span>
              <span className="hw-group-chapter">{chapter}</span>
            </div>

            {hw.kind === 'simple' ? (
              (() => { taskIndex += 1; return (
                <div className="hw-task" style={{ '--i': Math.min(taskIndex, 12) }}>
                  <div className="hw-task-text">{renderInline(hw.text)}</div>
                </div>
              ) })()
            ) : (
              hw.tasks.map((task, i) => {
                taskIndex += 1
                return (
                  <div key={i} className="hw-task" style={{ '--i': Math.min(taskIndex, 12) }}>
                    <div className="hw-task-num">Задача {i + 1}</div>
                    <div className="hw-task-text">{renderInline(task.text)}</div>
                  </div>
                )
              })
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
