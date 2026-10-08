import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SqlDataset from '../components/SqlDataset'
import TaskCard, { keyOf, StatusSquares, chapterStats, useMyHomework, SQL_CHAPTER } from '../components/HomeworkTaskCard'
import { usePythonState } from '../lib/python/runner'
import { AUTUMN_WEEKS } from '../data/autumnWeeks'
import { PROGRAM_CONTACT, directionOf, taskKind } from '../data/programs'
import { api } from '../api'
import {
  OPEN_WEEKS, WEEK_TITLES, hasLevels, WEEK_LEVELS,
  chaptersOf, tasksOf, hwNumberOf,
} from '../data/homeworkCatalog'

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function Chevron({ open }) {
  return (
    <svg className={`hwup-chev${open ? ' is-open' : ''}`} width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Список глав: на пк — колонка слева, на телефоне — раскрывающийся список ──
function ChapterList({ chapters, week, level, saved, activeId, onPick }) {
  return (
    <ul className="hwup-chapters">
      {chapters.map(c => {
        const stats = chapterStats(c, week, level, saved)
        const active = c.id === activeId
        return (
          <li key={c.id}>
            <button
              type="button"
              className={`hwup-chapter${active ? ' is-active' : ''}${stats.rework ? ' has-rework' : ''}`}
              onClick={() => onPick(c.id)}
              aria-current={active ? 'true' : undefined}
            >
              <span className="hwup-chapter-num">ДЗ {hwNumberOf(c, week, level)}</span>
              <span className="hwup-chapter-title">{c.short || c.title}</span>
              <StatusSquares statuses={stats.statuses} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

const PROGRAM_HW_STATUS = { submitted: 'на проверке', approved: 'принято', rework: 'нужны правки' }

// ── Второй месяц: задания к главам индивидуальной программы ──
// Сдаются на платформе только задания из вопросов (backend, ИБ); у остальных
// направлений задание выполняется самостоятельно — показываем, где его найти.
function OctoberHomework({ user }) {
  const navigate = useNavigate()
  const dir = directionOf(user)
  const quizChapters = dir ? dir.chapters.filter(c => c.quiz) : []
  const [list, setList] = useState([])

  useEffect(() => {
    if (!quizChapters.length) return
    let alive = true
    api.programHomework().then(l => { if (alive) setList(l || []) }).catch(() => {})
    return () => { alive = false }
  }, [quizChapters.length])

  if (!user?.isAutumnCamp2026) return null

  return (
    <div className="widget hwup-month">
      <div className="hwup-month-kicker">Второй месяц · октябрь</div>
      <h2 className="hwup-month-title">Задания по индивидуальной программе</h2>
      {!dir && <p className="hwup-month-text">Индивидуальная программа ещё готовится — задания появятся вместе с ней.</p>}
      {dir && !quizChapters.length && (
        <>
          <p className="hwup-month-text">
            {dir.submit === 'file'
              ? <>Задания к главам на платформе не сдаются: оформи выполненное задание в одном файле и отправь его в личные сообщения в Telegram — <a href={PROGRAM_CONTACT.url} target="_blank" rel="noopener noreferrer">{PROGRAM_CONTACT.text}</a>.</>
              : <>В программе «{dir.name}» задание к главе выполняется самостоятельно — сдавать его на платформе не нужно.</>}
          </p>
          {dir.chapters.map(ch => {
            const kind = taskKind(dir, ch)
            return (
              <button key={ch.num} type="button" className="hwup-month-row" onClick={() => navigate(`/autumn-camp/program/${ch.num}/task`)}>
                <span className="hwup-month-num">Глава {ch.num}</span>
                <span className="hwup-month-name">{ch.title}</span>
                <span className="hwup-month-status">{kind === 'trainer' ? 'SQL-тренажёр' : kind === 'file' ? 'файлом в Telegram' : kind === 'soon' ? 'скоро появится' : 'самостоятельно'}</span>
                <span className="hwup-month-go">Открыть →</span>
              </button>
            )
          })}
        </>
      )}
      {quizChapters.map((ch, i) => {
        const hw = list.find(h => h.direction === dir.key && h.chapter === ch.num)
        return (
          <button key={ch.num} type="button" className="hwup-month-row" onClick={() => navigate(`/autumn-camp/program/${ch.num}/task`)}>
            <span className="hwup-month-num">ДЗ {i + 1}</span>
            <span className="hwup-month-name">{dir.name}, глава {ch.num} — {ch.title}</span>
            <span className={`hwup-month-status${hw ? ` is-${hw.status}` : ''}`}>{hw ? PROGRAM_HW_STATUS[hw.status] : 'не сдано'}</span>
            <span className="hwup-month-go">Открыть →</span>
          </button>
        )
      })}
    </div>
  )
}

export default function HomeworkUploadPage({ user }) {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const { running: pythonBusy } = usePythonState()

  // Выбор хранится в адресе: перезагрузка и ссылка со страницы задачи
  // открывают ровно ту же главу
  const initialWeek = OPEN_WEEKS.includes(Number(params.get('week'))) ? Number(params.get('week')) : null
  const initialLevel = Number(params.get('level')) || null
  const initialChapter = params.get('chapter') || null

  const [week, setWeek] = useState(initialWeek)
  const [level, setLevel] = useState(initialLevel)
  const [chapterId, setChapterId] = useState(initialChapter)
  const [listOpen, setListOpen] = useState(!initialChapter)
  const { saved, loaded, error: loadError, onSaved } = useMyHomework()
  const tasksRef = useRef(null)

  useEffect(() => {
    const next = {}
    if (week) next.week = String(week)
    if (level) next.level = String(level)
    if (chapterId) next.chapter = chapterId
    setParams(next, { replace: true })
  }, [week, level, chapterId, setParams])

  const needsLevel = week !== null && hasLevels(week)
  const chapters = useMemo(
    () => (week === null || (needsLevel && !level) ? [] : chaptersOf(week, level)),
    [week, level, needsLevel]
  )
  const chapter = chapters.find(c => c.id === chapterId) || null
  const tasks = chapter ? tasksOf(chapter, week, level) : []
  const stats = chapter ? chapterStats(chapter, week, level, saved) : null

  const openWeeks = AUTUMN_WEEKS.filter(w => OPEN_WEEKS.includes(w.number))
  const lockedCount = AUTUMN_WEEKS.length - openWeeks.length

  const pickWeek = (value) => { setWeek(value); setLevel(null); setChapterId(null); setListOpen(true) }
  const pickLevel = (value) => { setLevel(value); setChapterId(null); setListOpen(true) }
  const pickChapter = (id) => {
    setChapterId(id)
    setListOpen(false)
    // Если задачи ушли выше экрана (выбрали главу, прокрутив список), —
    // возвращаемся к их началу
    requestAnimationFrame(() => {
      const top = tasksRef.current?.getBoundingClientRect().top
      if (top !== undefined && top < 0) tasksRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <section className="page active hwup-page">
      <button className="hwup-back" onClick={() => navigate('/autumn-camp')}>← Autumn Camp</button>

      <div className="page-header">
        <h1 className="page-title">Сдать домашнее задание</h1>
        <p className="page-subtitle">Выбери неделю и главу — каждая задача сдаётся отдельно</p>
      </div>

      {loadError && <div className="widget hwup-alert" role="alert">{loadError}</div>}

      <OctoberHomework user={user} />

      <div className="hwup-month-kicker hwup-month-sep">Первый месяц · недели 1–4</div>

      {/* ── Шаг 1: неделя и уровень ── */}
      <div className="widget hwup-picker">
        <div className="hwup-step">
          <span className="hwup-step-label">Неделя</span>
          <div className="hwup-weeks" role="radiogroup" aria-label="Неделя">
            {openWeeks.map(w => (
              <button
                key={w.slug}
                type="button"
                role="radio"
                aria-checked={week === w.number}
                className={`hwup-week${week === w.number ? ' is-active' : ''}`}
                onClick={() => pickWeek(w.number)}
              >
                <span className="hwup-week-name">Неделя {w.number}</span>
                <span className="hwup-week-range">{w.rangeText}</span>
              </button>
            ))}
          </div>
          {lockedCount > 0 && (
            <span className="hwup-locked"><LockIcon /> Следующие недели откроются по расписанию</span>
          )}
        </div>

        {needsLevel && (
          <div className="hwup-step">
            <span className="hwup-step-label">Уровень</span>
            <div className="hwup-levels" role="radiogroup" aria-label="Уровень">
              {WEEK_LEVELS[week].map(lvl => (
                <button
                  key={lvl.id}
                  type="button"
                  role="radio"
                  aria-checked={level === lvl.id}
                  className={`hwup-level${level === lvl.id ? ' is-active' : ''}`}
                  onClick={() => pickLevel(lvl.id)}
                >
                  <span className="hwup-level-num">{lvl.id}</span>
                  <span className="hwup-level-title">{lvl.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {week === null && (
        <div className="widget hwup-empty">Выбери неделю — появятся её главы и задачи.</div>
      )}
      {needsLevel && !level && (
        <div className="widget hwup-empty">Выбери уровень — задания второй недели зависят от него.</div>
      )}

      {/* ── Шаг 2 и 3: глава и её задачи ── */}
      {chapters.length > 0 && (
        <div className={`hwup-layout${chapter ? ' has-chapter' : ''}`}>
          <aside className="hwup-side">
            <div className="widget hwup-side-card">
              {/* На телефоне список сворачивается в одну строку с текущей главой */}
              <button
                type="button"
                className="hwup-side-toggle"
                onClick={() => setListOpen(o => !o)}
                aria-expanded={listOpen}
              >
                <span className="hwup-side-toggle-text">
                  <span className="hwup-step-label">Глава</span>
                  <span className="hwup-side-current">
                    {chapter ? `ДЗ ${hwNumberOf(chapter, week, level)} · ${chapter.short || chapter.title}` : 'Выбери главу'}
                  </span>
                </span>
                <Chevron open={listOpen} />
              </button>
              <div className="hwup-side-title">Главы · {chapters.length}</div>
              <div className={`hwup-side-list${listOpen ? ' is-open' : ''}`}>
                <ChapterList
                  chapters={chapters}
                  week={week}
                  level={level}
                  saved={saved}
                  activeId={chapterId}
                  onPick={pickChapter}
                />
              </div>
            </div>
          </aside>

          <div className="hwup-main" ref={tasksRef}>
            {chapter ? (
              <div className="widget hwup-chapter-card">
                <div className="hwup-chapter-head">
                  <div>
                    <div className="hwup-chapter-kicker">{WEEK_TITLES[week]}</div>
                    <h2 className="hwup-chapter-name">
                      Домашнее задание {hwNumberOf(chapter, week, level)} — {chapter.title}
                    </h2>
                  </div>
                  {loaded && (
                    <div className="hwup-progress" aria-label={`Сдано ${stats.sent} из ${stats.total}`}>
                      <StatusSquares statuses={stats.statuses} />
                      <span className="hwup-progress-text">
                        сдано {stats.sent} из {stats.total}
                        {stats.rework > 0 && <b className="is-rework"> · правки: {stats.rework}</b>}
                      </span>
                    </div>
                  )}
                </div>

                {/* Задачи по SQL решаются по конкретному датасету — дублируем его
                    здесь, чтобы не держать открытой вторую вкладку с материалами. */}
                {chapter.id === SQL_CHAPTER && (
                  <div className="hwup-dataset">
                    <div className="w4-tasks-title" style={{ marginTop: 0 }}>Датасет, по которому решаются задачи</div>
                    <SqlDataset />
                  </div>
                )}

                {!loaded ? (
                  <div className="hwup-empty-inline">Загружаем твои решения…</div>
                ) : (
                  <div className="hwup-tasks">
                    {tasks.map((task, i) => (
                      <TaskCard
                        key={`${chapter.id}:${i}`}
                        task={task}
                        index={i}
                        chapter={chapter}
                        week={week}
                        level={level}
                        saved={saved[keyOf(chapter.id, i)] || null}
                        onSaved={onSaved}
                        pythonBusy={pythonBusy}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="widget hwup-empty hwup-empty-main">
                Выбери главу — здесь появятся её задачи. Квадратики рядом с главой показывают, что уже сдано.
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
