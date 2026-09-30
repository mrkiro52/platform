import { useState, useEffect, useMemo, useCallback } from 'react'
import { api } from '../api'
import SolutionInput from './SolutionInput'
import InlineMarkup from './InlineMarkup'
import { hasLevels, tasksOf, hwNumberOf } from '../data/homeworkCatalog'

// Карточка задачи с полем решения и сдачей. Общая для страницы сдачи ДЗ и
// сплит-экрана в материалах недели — ведут себя одинаково: те же черновики,
// тот же переключатель «Текст / Код», та же блокировка на время запуска кода.

const STATUS_LABEL = {
  submitted: 'на проверке',
  approved:  'принято',
  rework:    'нужны правки',
}

export const SQL_CHAPTER = 'week4-sql-homework'
const LAST_KIND_KEY = 'kiro_hw_last_kind'

export function keyOf(chapterId, taskIndex) { return `${chapterId}:${taskIndex}` }

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

// Квадратики статусов задач главы — тот же язык, что в «Проверке ДЗ»
export function StatusSquares({ statuses }) {
  return (
    <span className="hwup-squares" aria-hidden="true">
      {statuses.map((st, i) => <span key={i} className={`hwup-sq is-${st}`} />)}
    </span>
  )
}

export function chapterStats(chapter, week, level, saved) {
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
export default function TaskCard({ task, index, chapter, week, level, saved, onSaved, pythonBusy }) {
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

      {task.hint && (
        <details className="hwup-hint">
          <summary>Подсказка</summary>
          <p><InlineMarkup text={task.hint} /></p>
        </details>
      )}

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


// Свои решения: загружаются один раз, после сдачи обновляются точечно
export function useMyHomework() {
  const [saved, setSaved] = useState({})
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    api.myHomework()
      .then(rows => {
        if (!alive) return
        const byKey = {}
        for (const row of rows) byKey[keyOf(row.chapterId, row.taskIndex)] = row
        setSaved(byKey)
      })
      .catch(err => { if (alive) setError(err.message || 'Не удалось загрузить твои решения') })
      .finally(() => { if (alive) setLoaded(true) })
    return () => { alive = false }
  }, [])

  const onSaved = useCallback((row) => {
    setSaved(prev => ({ ...prev, [keyOf(row.chapterId, row.taskIndex)]: row }))
  }, [])

  return { saved, loaded, error, onSaved }
}
