import { useState, useMemo } from 'react'
import { AUTUMN_WEEK_MONTHS, shortRange } from '../data/autumnWeeks'
import { WEEK2_LEVELS } from '../data/week2Materials'
import { OPEN_WEEKS, hasLevels, chaptersOf, tasksOf, hwNumberOf } from '../data/homeworkCatalog'
import InlineMarkup from './InlineMarkup'

// Условия домашних заданий в три шага: неделя → номер ДЗ → его задачи.
// Раньше при выборе недели выводились сразу все её задания подряд (19 ДЗ
// по 5 задач) — это несколько экранов прокрутки. Теперь на экране только
// одно ДЗ, а весь блок сворачивается обратно к плиткам недель.

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function ChevronUp() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const weekNumberOf = (slug) => Number(String(slug).replace('week', ''))

// Плитка недели — та же, что в «Материалах по неделям», только с замком
// вместо стрелки у закрытых недель
function WeekButton({ week, active, onSelect }) {
  const unlocked = OPEN_WEEKS.includes(week.number)

  return (
    <button
      type="button"
      className={`wk${active ? ' is-active' : ''}${unlocked ? '' : ' is-locked'}`}
      disabled={!unlocked}
      onClick={() => unlocked && onSelect(week.slug)}
      title={unlocked ? undefined : 'Задания этой недели откроются позже'}
      aria-pressed={unlocked ? active : undefined}
      aria-label={`Неделя ${week.indexInMonth}, ${week.rangeText}${unlocked ? '' : ', откроется позже'}`}
    >
      <span className="wk-name"><span className="wk-word">Неделя </span>{week.indexInMonth}</span>
      <span className="wk-range">
        <span className="wk-range-full">{week.rangeText}</span>
        <span className="wk-range-short">{shortRange(week)}</span>
      </span>
      {!unlocked && <span className="wk-lock"><LockIcon /></span>}
    </button>
  )
}

export default function HomeworkPicker() {
  const [week, setWeek] = useState(null)       // 'week1' …
  const [level, setLevel] = useState(null)
  const [chapterId, setChapterId] = useState(null)
  // Свёрнут блок или нет — отдельно от выбора: при сворачивании содержимое
  // остаётся на месте и плавно уезжает, а при повторном раскрытии той же
  // недели человек видит то ДЗ, на котором остановился
  const [open, setOpen] = useState(false)

  const weekNum = week ? weekNumberOf(week) : null
  const needsLevel = weekNum !== null && hasLevels(weekNum)
  const chapters = useMemo(
    () => (weekNum === null || (needsLevel && !level) ? [] : chaptersOf(weekNum, level)),
    [weekNum, level, needsLevel]
  )
  const chapter = chapters.find(c => c.id === chapterId) || null
  const tasks = chapter ? tasksOf(chapter, weekNum, level) : []

  // Клик по открытой неделе сворачивает блок, по свёрнутой — раскрывает
  // с прежним выбором, по другой — начинает выбор заново
  const selectWeek = (slug) => {
    if (slug === week) { setOpen(o => !o); return }
    setWeek(slug)
    setLevel(null)       // уровень выбирается заново под каждую неделю
    setChapterId(null)
    setOpen(true)
  }
  const selectLevel = (id) => { setLevel(id); setChapterId(null) }
  const collapse = () => setOpen(false)

  const uploadHref = chapter
    ? `/autumn-camp/upload-homework?week=${weekNum}${needsLevel ? `&level=${level}` : ''}&chapter=${chapter.id}`
    : null

  return (
    <div className="hw-block">
      <div className="wk-grid">
        {AUTUMN_WEEK_MONTHS.map(month => (
          <div key={month.label} className="wk-month">
            <div className="wk-month-label">{month.label}</div>
            <div className="wk-list">
              {month.weeks.map(w => (
                <WeekButton key={w.slug} week={w} active={open && week === w.slug} onSelect={selectWeek} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {!open && <div className="hw-hint">Выбери неделю, затем номер домашнего задания — появятся его задачи.</div>}

      {/* Всё, что ниже плиток, раскрывается и сворачивается одним блоком.
          inert — свёрнутое не должно ловить фокус с клавиатуры. */}
      <div className={`collapse-wrap${open ? ' open' : ''}`}>
        <div className="collapse-inner" inert={open ? undefined : ''}>
          {week && (
            <div className="hw-detail">
              <div className="hw-detail-bar">
                <span className="hw-detail-week">Неделя {weekNum}</span>
                <button type="button" className="hw-collapse" onClick={collapse}>
                  <ChevronUp /> Свернуть
                </button>
              </div>

              {needsLevel && (
                <div className="hw-step">
                  <span className="hw-step-label">Уровень</span>
                  <div className="hw-levels">
                    {WEEK2_LEVELS.map((lvl, i) => (
                      <button
                        key={lvl.id}
                        type="button"
                        className={`hw-level${level === lvl.id ? ' is-active' : ''}`}
                        style={{ '--i': i }}
                        onClick={() => selectLevel(lvl.id)}
                        title={`Уровень ${lvl.id} — «${lvl.title}»`}
                        aria-pressed={level === lvl.id}
                      >
                        {lvl.id}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {chapters.length > 0 && (
                <div className="hw-step">
                  <span className="hw-step-label">Домашнее задание</span>
                  <div className="hw-numbers" role="radiogroup" aria-label="Номер домашнего задания">
                    {chapters.map(c => {
                      const num = hwNumberOf(c, weekNum, level)
                      const active = c.id === chapterId
                      return (
                        <button
                          key={c.id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          aria-label={`ДЗ ${num}: ${c.title}`}
                          title={c.title}
                          className={`hw-number${active ? ' is-active' : ''}`}
                          onClick={() => setChapterId(active ? null : c.id)}
                        >
                          {num}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {needsLevel && !level && <div className="hw-hint">Выбери уровень — от него зависит набор заданий.</div>}
              {chapters.length > 0 && !chapter && <div className="hw-hint">Выбери номер — покажем его задачи.</div>}

              {chapter && (
                <div className="hw-card" key={chapter.id}>
                  <div className="hw-card-head">
                    <div className="hw-card-titles">
                      <span className="hw-group-num">Домашнее задание {hwNumberOf(chapter, weekNum, level)}</span>
                      <span className="hw-card-chapter">{chapter.title}</span>
                    </div>
                    <a className="hw-card-submit" href={uploadHref} target="_blank" rel="noopener">
                      Сдать ↗
                    </a>
                  </div>

                  <div className="hw-tasks">
                    {tasks.map((task, i) => (
                      <div key={i} className="hw-task" style={{ '--i': i }}>
                        {tasks.length > 1 && <div className="hw-task-num">Задача {i + 1}</div>}
                        <div className="hw-task-text"><InlineMarkup text={task.text} /></div>
                        {task.hint && (
                          <details className="hwup-hint hw-task-hint">
                            <summary>Подсказка</summary>
                            <p><InlineMarkup text={task.hint} /></p>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
