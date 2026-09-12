import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { findTask, WEEK_TITLES, levelOfChapter } from '../data/homeworkCatalog'

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
  const [busy, setBusy] = useState(false)
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

  const save = async () => {
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
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{task.text}</p>
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
            <button type="button" className="btn-ghost" onClick={() => { setDraft(row.solution); setEditing(true) }}>
              {row.status === 'rework' ? 'Исправить и сдать снова' : 'Изменить решение'}
            </button>
          )}
        </div>

        {row === undefined ? (
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>Загружаем…</p>
        ) : editing ? (
          <>
            <textarea
              className="hwup-input"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Вставь своё решение сюда"
              spellCheck={false}
            />
            {error && <div className="hwup-error">{error}</div>}
            <div className="hwup-actions">
              {row && (
                <button
                  type="button"
                  className="btn-ghost"
                  disabled={busy}
                  onClick={() => { setDraft(row.solution); setEditing(false); setError('') }}
                >
                  Отмена
                </button>
              )}
              <button type="button" className="btn-primary hwup-btn" disabled={busy} onClick={save}>
                {busy ? 'Сохраняем…' : row ? 'Сдать повторно' : 'Сдать задачу'}
              </button>
            </div>
          </>
        ) : row ? (
          <pre className="hwup-solution">{row.solution}</pre>
        ) : (
          <>
            <p style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
              Решение пока не сдано — вставь его прямо здесь.
            </p>
            <textarea
              className="hwup-input"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Вставь своё решение сюда"
              spellCheck={false}
            />
            {error && <div className="hwup-error">{error}</div>}
            <div className="hwup-actions">
              <button type="button" className="btn-primary hwup-btn" disabled={busy} onClick={save}>
                {busy ? 'Сохраняем…' : 'Сдать задачу'}
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
