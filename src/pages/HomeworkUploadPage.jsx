import { useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../api'
import { AUTUMN_WEEK_MONTHS } from '../data/autumnWeeks'
import {
  OPEN_WEEKS, WEEK_TITLES, hasLevels, WEEK_LEVELS,
  chaptersOf, tasksOf, hwNumberOf,
} from '../data/homeworkCatalog'

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

const STATUS_LABEL = {
  submitted: 'на проверке',
  approved:  'принято',
  rework:    'нужны правки',
}

function keyOf(chapterId, taskIndex) { return `${chapterId}:${taskIndex}` }

// Одна задача: условие, решение и кнопки сдачи. Пока решения нет — текстовое
// поле, после сдачи — сохранённый код и кнопка «Изменить решение».
function TaskCard({ task, index, chapter, week, level, saved, onSaved }) {
  const [editing, setEditing] = useState(!saved)
  const [draft, setDraft] = useState(saved ? saved.solution : '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  // Решение могло прийти с сервера позже, чем отрисовалась карточка
  useEffect(() => {
    if (saved && !editing) setDraft(saved.solution)
  }, [saved, editing])

  const save = async () => {
    if (!draft.trim()) { setError('Вставь решение — пустое поле не сохраняется'); return }
    setBusy(true)
    setError('')
    try {
      const row = await api.saveHomework({
        week,
        level: hasLevels(week) ? level : null,
        chapterId: chapter.id,
        hwNumber: hwNumberOf(chapter, week, level),
        taskIndex: index,
        solution: draft,
      })
      onSaved(row)
      setEditing(false)
    } catch (err) {
      setError(err.message || 'Не удалось сохранить, попробуй ещё раз')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="hwup-task">
      <div className="hwup-task-head">
        <span className="hwup-task-num">Задача {index + 1}</span>
        {saved && (
          <span className={`hwup-status is-${saved.status}`}>{STATUS_LABEL[saved.status]}</span>
        )}
      </div>

      <p className="hwup-task-text">{task.text}</p>

      {saved && saved.status === 'rework' && saved.comment && (
        <div className="hwup-comment">
          <div className="hwup-comment-label">Правки от проверяющего</div>
          <div className="hwup-comment-text">{saved.comment}</div>
        </div>
      )}

      {editing ? (
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
            {saved && (
              <button
                type="button"
                className="btn-ghost"
                disabled={busy}
                onClick={() => { setDraft(saved.solution); setEditing(false); setError('') }}
              >
                Отмена
              </button>
            )}
            <button type="button" className="btn-primary hwup-btn" disabled={busy} onClick={save}>
              {busy ? 'Сохраняем…' : saved ? 'Сохранить изменения' : 'Сдать задачу'}
            </button>
          </div>
        </>
      ) : (
        <>
          <pre className="hwup-solution">{saved.solution}</pre>
          <div className="hwup-actions">
            <button type="button" className="btn-ghost" onClick={() => setEditing(true)}>
              Изменить решение
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function HomeworkUploadPage() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  // Со страницы задачи сюда приходят с уже известными неделей, уровнем и
  // главой — подставляем их сразу, чтобы не выбирать то же самое вручную.
  const initialWeek = OPEN_WEEKS.includes(Number(params.get('week'))) ? Number(params.get('week')) : null
  const initialLevel = Number(params.get('level')) || null
  const initialChapter = params.get('chapter') || null

  const [week, setWeek] = useState(initialWeek)
  const [level, setLevel] = useState(initialLevel)
  const [chapterId, setChapterId] = useState(initialChapter)
  const [saved, setSaved] = useState({})
  const [loadError, setLoadError] = useState('')

  const load = useCallback(async () => {
    try {
      const rows = await api.myHomework()
      const byKey = {}
      for (const row of rows) byKey[keyOf(row.chapterId, row.taskIndex)] = row
      setSaved(byKey)
    } catch (err) {
      setLoadError(err.message || 'Не удалось загрузить твои решения')
    }
  }, [])

  useEffect(() => { load() }, [load])

  const needsLevel = week !== null && hasLevels(week)
  const chapters = useMemo(
    () => (week === null || (needsLevel && !level) ? [] : chaptersOf(week, level)),
    [week, level, needsLevel]
  )
  const chapter = chapters.find(c => c.id === chapterId) || null
  const tasks = chapter ? tasksOf(chapter, week, level) : []

  const pickWeek = (value) => { setWeek(value); setLevel(null); setChapterId(null) }
  const pickLevel = (value) => { setLevel(value); setChapterId(null) }

  const onSaved = (row) => {
    setSaved(prev => ({ ...prev, [keyOf(row.chapterId, row.taskIndex)]: row }))
  }

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
        <h1 className="page-title">Сдать домашнее задание</h1>
        <p className="page-subtitle">Выбери неделю и главу, вставь решение каждой задачи и сдай</p>
      </div>

      {loadError && <div className="widget" style={{ marginBottom: 18 }}>{loadError}</div>}

      <div className="widget" style={{ marginBottom: 18 }}>
        <div className="widget-header"><span className="widget-title">Неделя</span></div>
        <div className="hwup-chips">
          {AUTUMN_WEEK_MONTHS.flatMap(month =>
            month.weeks.map(w => {
              const num = Number(w.slug.replace('week', ''))
              const open = OPEN_WEEKS.includes(num)
              return (
                <button
                  key={w.slug}
                  type="button"
                  className={`hwup-chip${week === num ? ' is-active' : ''}${open ? '' : ' is-locked'}`}
                  disabled={!open}
                  onClick={() => open && pickWeek(num)}
                  title={open ? undefined : 'Задания этой недели откроются позже'}
                >
                  {month.label.toLowerCase()} · неделя {w.indexInMonth}
                  {!open && <LockIcon />}
                </button>
              )
            })
          )}
        </div>
      </div>

      {needsLevel && (
        <div className="widget" style={{ marginBottom: 18 }}>
          <div className="widget-header"><span className="widget-title">Уровень</span></div>
          <div className="hwup-chips">
            {WEEK_LEVELS[week].map(lvl => (
              <button
                key={lvl.id}
                type="button"
                className={`hwup-chip${level === lvl.id ? ' is-active' : ''}`}
                onClick={() => pickLevel(lvl.id)}
              >
                Уровень {lvl.id} — «{lvl.title}»
              </button>
            ))}
          </div>
        </div>
      )}

      {chapters.length > 0 && (
        <div className="widget" style={{ marginBottom: 18 }}>
          <div className="widget-header"><span className="widget-title">Глава</span></div>
          <div className="hwup-chips">
            {chapters.map(c => (
              <button
                key={c.id}
                type="button"
                className={`hwup-chip${chapterId === c.id ? ' is-active' : ''}`}
                onClick={() => setChapterId(c.id)}
              >
                ДЗ {hwNumberOf(c, week, level)} · {c.short || c.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {chapter && (
        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">
              Домашнее задание {hwNumberOf(chapter, week, level)} — {chapter.title}
            </span>
          </div>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
            {WEEK_TITLES[week]}. Каждая задача сдаётся отдельно — можно сдать одну и вернуться к остальным позже.
          </p>

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
              />
            ))}
          </div>
        </div>
      )}

      {week !== null && !chapter && (
        <div className="widget">
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>
            {needsLevel && !level ? 'Выбери уровень, а затем главу.' : 'Выбери главу — ниже появятся её задачи.'}
          </p>
        </div>
      )}
    </section>
  )
}
