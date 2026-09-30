import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { findTask, WEEK_TITLES, levelOfChapter, neighbourTasks } from '../data/homeworkCatalog'
import SolutionInput from '../components/SolutionInput'
import InlineMarkup from '../components/InlineMarkup'
import { usePythonState } from '../lib/python/runner'

function lastKind() {
  try { return localStorage.getItem('kiro_hw_last_kind') === 'code' ? 'code' : 'text' } catch { return 'text' }
}

const STATUS = {
  submitted: { label: 'Сдано, ждёт проверки', className: 'is-submitted' },
  approved:  { label: 'Принято',              className: 'is-approved' },
  rework:    { label: 'Нужны правки',         className: 'is-rework' },
}

export default function HomeworkTaskPage() {
  const { week, chapterId, taskIndex } = useParams()
  const navigate = useNavigate()
  const [row, setRow] = useState(undefined)   // undefined — ещё грузим
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')
  const [kind, setKind] = useState(lastKind)
  const [busy, setBusy] = useState(false)
  // Пока идёт запуск кода, отправка заблокирована — иначе можно отправить
  // решение, результат которого ещё не видел
  const { running: pythonBusy } = usePythonState()
  const [error, setError] = useState('')

  const task = findTask(week, chapterId, taskIndex)

  useEffect(() => {
    api.myHomework()
      .then(rows => {
        const found = rows.find(
          r => String(r.week) === String(week) && r.chapterId === chapterId && String(r.taskIndex) === String(taskIndex)
        )
        setRow(found || null)
      })
      .catch(() => setRow(null))
  }, [week, chapterId, taskIndex])

  if (!task) {
    return (
      <section className="page active">
        <div className="page-header"><h1 className="page-title">Задача не найдена</h1></div>
        <button className="autumn-toggle-btn" onClick={() => navigate('/autumn-camp')}>К лагерю</button>
      </section>
    )
  }

  const changeKind = (next) => {
    setKind(next)
    try { localStorage.setItem('kiro_hw_last_kind', next) } catch { /* приватный режим */ }
  }

  const startEditing = () => {
    setDraft(row.solution)
    setKind(row.solutionKind || 'text')
    setEditing(true)
  }

  const save = async () => {
    if (pythonBusy || busy) return
    if (!draft.trim()) { setError('Вставь решение — пустое поле не сохраняется'); return }
    setBusy(true)
    setError('')
    try {
      const saved = await api.saveHomework({
        week: Number(week),
        level: levelOfChapter(Number(week), chapterId),
        chapterId,
        hwNumber: task.hwNumber,
        taskIndex: Number(taskIndex),
        taskText: task.text,
        solution: draft,
        solutionKind: kind,
      })
      setRow(saved)
      setEditing(false)
    } catch (err) {
      setError(err.message || 'Не удалось сохранить, попробуй ещё раз')
    } finally {
      setBusy(false)
    }
  }

  const status = row ? STATUS[row.status] : null
  const { prev, next, position, total } = neighbourTasks(week, chapterId, taskIndex)


  return (
    <section className="page active">
      <button
        onClick={() => navigate('/autumn-camp')}
        style={{
          background: 'transparent', border: 'none', color: '#FFB870', cursor: 'pointer',
          fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--font-syne)', padding: 0, marginBottom: 14,
        }}
      >
        ← Autumn Camp
      </button>

      <div className="page-header">
        <h1 className="page-title">Задача {task.taskIndex + 1}</h1>
        <p className="page-subtitle">
          Домашнее задание {task.hwNumber} — {task.chapterTitle}. {WEEK_TITLES[Number(week)] || ''}
        </p>
      </div>

      <div className="widget" style={{ marginBottom: 18 }}>
        <div className="widget-header">
          <span className="widget-title">Условие</span>
          {status && <span className={`hwup-status ${status.className}`}>{status.label}</span>}
        </div>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}><InlineMarkup text={task.text} /></p>
        {task.hint && (
          <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            Подсказка: {task.hint}
          </p>
        )}
      </div>

      {row && row.status === 'rework' && row.comment && (
        <div className="widget" style={{ marginBottom: 18, border: '1px solid rgba(255,214,10,0.35)' }}>
          <div className="widget-header"><span className="widget-title">Правки</span></div>
          <div className="hwup-comment-text">{row.comment}</div>
        </div>
      )}

      <div className="widget">
        <div className="widget-header">
          <span className="widget-title">Твоё решение</span>
          {row && !editing && (
            <button type="button" className={row.status === 'rework' ? 'btn-primary hwup-btn' : 'btn-ghost'} onClick={startEditing}>
              {row.status === 'rework' ? 'Исправить и сдать снова' : 'Изменить решение'}
            </button>
          )}
        </div>

        {row === undefined ? (
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>Загружаем…</p>
        ) : editing ? (
          <>
            <SolutionInput value={draft} onChange={setDraft} kind={kind} onKindChange={changeKind} />
            {error && <div className="hwup-error" role="alert">{error}</div>}
            <div className="hwup-actions">
              {pythonBusy && <span className="hwup-actions-hint">Идёт запуск кода — отправить можно будет после него</span>}
              {row && (
                <button
                  type="button"
                  className="btn-ghost"
                  disabled={busy}
                  onClick={() => { setDraft(row.solution); setKind(row.solutionKind || 'text'); setEditing(false); setError('') }}
                >
                  Отмена
                </button>
              )}
              <button type="button" className="btn-primary hwup-btn" disabled={busy || pythonBusy} onClick={save}>
                {busy ? 'Отправляем…' : row ? 'Сдать повторно' : 'Сдать задачу'}
              </button>
            </div>
          </>
        ) : row ? (
          <SolutionInput value={row.solution} kind={row.solutionKind || 'text'} readOnly />
        ) : (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              Решение пока не сдано — вставь его прямо здесь.
            </p>
            <SolutionInput value={draft} onChange={setDraft} kind={kind} onKindChange={changeKind} />
            {error && <div className="hwup-error" role="alert">{error}</div>}
            <div className="hwup-actions">
              {pythonBusy && <span className="hwup-actions-hint">Идёт запуск кода — отправить можно будет после него</span>}
              <button type="button" className="btn-primary hwup-btn" disabled={busy || pythonBusy} onClick={save}>
                {busy ? 'Отправляем…' : 'Сдать задачу'}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="task-nav">
        {prev ? (
          <button type="button" className="task-nav-btn" onClick={() => navigate(prev.href)}>
            <span className="task-nav-dir">← Предыдущая задача</span>
            <span className="task-nav-name">{prev.chapterTitle} · задача {prev.taskIndex + 1}</span>
          </button>
        ) : <span />}

        {position && <span className="task-nav-counter">{position} из {total}</span>}

        {next ? (
          <button type="button" className="task-nav-btn is-next" onClick={() => navigate(next.href)}>
            <span className="task-nav-dir">Следующая задача →</span>
            <span className="task-nav-name">{next.chapterTitle} · задача {next.taskIndex + 1}</span>
          </button>
        ) : <span />}
      </div>
    </section>
  )
}
