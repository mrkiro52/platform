import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../api'
import SqlDataset from '../components/SqlDataset'
import SolutionInput from '../components/SolutionInput'
import InlineMarkup from '../components/InlineMarkup'
import { usePythonState } from '../lib/python/runner'
import { AUTUMN_WEEKS } from '../data/autumnWeeks'
import {
  OPEN_WEEKS, WEEK_TITLES, hasLevels, WEEK_LEVELS,
  chaptersOf, tasksOf, hwNumberOf,
} from '../data/homeworkCatalog'

const STATUS_LABEL = {
  submitted: 'на проверке',
  approved:  'принято',
  rework:    'нужны правки',
}

const SQL_CHAPTER = 'week4-sql-homework'
const LAST_KIND_KEY = 'kiro_hw_last_kind'

function keyOf(chapterId, taskIndex) { return `${chapterId}:${taskIndex}` }

// ── Черновики: несохранённое решение переживает смену главы и перезагрузку ──
function draftKey(week, chapterId, index) { return `kiro_hw_draft:${week}:${chapterId}:${index}` }

function readDraft(week, chapterId, index) {
  try { return JSON.parse(localStorage.getItem(draftKey(week, chapterId, index))) } catch { return null }
}
function writeDraft(week, chapterId, index, draft) {
  try { localStorage.setItem(draftKey(week, chapterId, index), JSON.stringify(draft)) } catch { /* приватный режим */ }
}
function dropDraft(week, chapterId, index) {
  try { localStorage.removeItem(draftKey(week, chapterId, index)) } catch { /* приватный режим */ }
}
function lastKind() {
  try { return localStorage.getItem(LAST_KIND_KEY) === 'code' ? 'code' : 'text' } catch { return 'text' }
}

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

// Квадратики статусов задач главы — тот же язык, что в «Проверке ДЗ»
function StatusSquares({ statuses }) {
  return (
    <span className="hwup-squares" aria-hidden="true">
      {statuses.map((st, i) => <span key={i} className={`hwup-sq is-${st}`} />)}
    </span>
  )
}

function chapterStats(chapter, week, level, saved) {
  const statuses = tasksOf(chapter, week, level).map((_, i) => saved[keyOf(chapter.id, i)]?.status || 'empty')
  const count = st => statuses.filter(s => s === st).length
  return {
    statuses,
    total: statuses.length,
    sent: statuses.filter(s => s !== 'empty').length,
    approved: count('approved'),
    rework: count('rework'),
    pending: count('submitted'),
  }
}

// ── Одна задача ─────────────────────────────────────────────────────────────
function TaskCard({ task, index, chapter, week, level, saved, onSaved, pythonBusy }) {
  const initialDraft = useMemo(() => readDraft(week, chapter.id, index), [week, chapter.id, index])
  const defaultKind = chapter.id === SQL_CHAPTER ? 'text' : lastKind()

  // Неотправленный черновик важнее сохранённой версии — открываем его сразу
  const [editing, setEditing] = useState(!saved || !!initialDraft)
  const [draft, setDraft] = useState(initialDraft?.text ?? saved?.solution ?? '')
  const [kind, setKind] = useState(initialDraft?.kind ?? saved?.solutionKind ?? defaultKind)
  const [restored, setRestored] = useState(!!initialDraft && !!saved)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [justSent, setJustSent] = useState(false)

  // Решение могло прийти с сервера позже, чем отрисовалась карточка
  useEffect(() => {
    if (saved && !editing) {
      setDraft(saved.solution)
      setKind(saved.solutionKind || 'text')
    }
  }, [saved, editing])

  useEffect(() => {
    if (!justSent) return
    const t = setTimeout(() => setJustSent(false), 3500)
    return () => clearTimeout(t)
  }, [justSent])

  const changeDraft = (text) => {
    setDraft(text)
    setError('')
    if (text.trim() && text !== saved?.solution) writeDraft(week, chapter.id, index, { text, kind })
    else dropDraft(week, chapter.id, index)
  }

  const changeKind = (next) => {
    setKind(next)
    try { localStorage.setItem(LAST_KIND_KEY, next) } catch { /* приватный режим */ }
    if (draft.trim() && draft !== saved?.solution) writeDraft(week, chapter.id, index, { text: draft, kind: next })
  }

  const save = async () => {
    if (pythonBusy || busy) return
    if (!draft.trim()) { setError('Вставь решение — пустое поле не отправляется'); return }
    setBusy(true)
    setError('')
    try {
      const row = await api.saveHomework({
        week,
        level: hasLevels(week) ? level : null,
        chapterId: chapter.id,
        hwNumber: hwNumberOf(chapter, week, level),
        taskIndex: index,
        taskText: task.text,   // условие едет вместе с решением — админке оно иначе недоступно
        solution: draft,
        solutionKind: kind,
      })
      dropDraft(week, chapter.id, index)
      onSaved(row)
      setEditing(false)
      setRestored(false)
      setJustSent(true)
    } catch (err) {
      setError(err.message || 'Не удалось отправить, попробуй ещё раз')
    } finally {
      setBusy(false)
    }
  }

  const cancel = () => {
    dropDraft(week, chapter.id, index)
    setDraft(saved.solution)
    setKind(saved.solutionKind || 'text')
    setEditing(false)
    setRestored(false)
    setError('')
  }

  const status = saved?.status
  const submitLabel = busy ? 'Отправляем…' : saved ? 'Отправить заново' : 'Сдать на проверку'

  return (
    <article className={`hwup-task${status ? ` is-${status}` : ''}`} id={`task-${index + 1}`}>
      <header className="hwup-task-head">
        <span className="hwup-task-num">Задача {index + 1}</span>
        {justSent ? (
          <span className="hwup-status is-sent" role="status">✓ отправлено на проверку</span>
        ) : status && (
          <span className={`hwup-status is-${status}`}>{STATUS_LABEL[status]}</span>
        )}
      </header>

      <p className="hwup-task-text"><InlineMarkup text={task.text} /></p>

      {status === 'rework' && saved.comment && (
        <div className="hwup-comment">
          <div className="hwup-comment-label">Правки от проверяющего</div>
          <div className="hwup-comment-text">{saved.comment}</div>
        </div>
      )}

      {editing ? (
        <>
          {restored && (
            <div className="hwup-restored">
              Восстановлен неотправленный черновик. «Отмена» вернёт отправленную версию.
            </div>
          )}
          <SolutionInput value={draft} onChange={changeDraft} kind={kind} onKindChange={changeKind} />
          {error && <div className="hwup-error" role="alert">{error}</div>}
          <div className="hwup-actions">
            <span className="hwup-actions-hint">
              {pythonBusy ? 'Идёт запуск кода — отправить можно будет после него' : 'Черновик сохраняется автоматически'}
            </span>
            {saved && (
              <button type="button" className="btn-ghost" disabled={busy} onClick={cancel}>Отмена</button>
            )}
            <button
              type="button"
              className="btn-primary hwup-btn"
              disabled={busy || pythonBusy}
              onClick={save}
            >
              {submitLabel}
            </button>
          </div>
        </>
      ) : (
        <>
          <SolutionInput value={saved.solution} kind={saved.solutionKind || 'text'} readOnly />
          <div className="hwup-actions">
            <button
              type="button"
              className={status === 'rework' ? 'btn-primary hwup-btn' : 'btn-ghost'}
              onClick={() => setEditing(true)}
            >
              {status === 'rework' ? 'Исправить решение' : 'Изменить решение'}
            </button>
          </div>
        </>
      )}
    </article>
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

export default function HomeworkUploadPage() {
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
  const [saved, setSaved] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState('')
  const tasksRef = useRef(null)

  const load = useCallback(async () => {
    try {
      const rows = await api.myHomework()
      const byKey = {}
      for (const row of rows) byKey[keyOf(row.chapterId, row.taskIndex)] = row
      setSaved(byKey)
    } catch (err) {
      setLoadError(err.message || 'Не удалось загрузить твои решения')
    } finally {
      setLoaded(true)
    }
  }, [])

  useEffect(() => { load() }, [load])

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

  const onSaved = (row) => {
    setSaved(prev => ({ ...prev, [keyOf(row.chapterId, row.taskIndex)]: row }))
  }

  return (
    <section className="page active hwup-page">
      <button className="hwup-back" onClick={() => navigate('/autumn-camp')}>← Autumn Camp</button>

      <div className="page-header">
        <h1 className="page-title">Сдать домашнее задание</h1>
        <p className="page-subtitle">Выбери неделю и главу — каждая задача сдаётся отдельно</p>
      </div>

      {loadError && <div className="widget hwup-alert" role="alert">{loadError}</div>}

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
