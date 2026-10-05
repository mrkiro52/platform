import { useEffect, useState } from 'react'

// Заметки и список дел. Оба хранятся в браузере; ключ заметок прежний,
// чтобы у пользователей не пропало то, что они уже написали.

const NOTES_KEY = 'kiro_notes'
const TODOS_KEY = 'kiro_dash_todos'
const TAB_KEY = 'kiro_dash_notes_tab'

function readTodos() {
  try {
    const list = JSON.parse(localStorage.getItem(TODOS_KEY))
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}
function safeGet(key, fallback) {
  try { return localStorage.getItem(key) ?? fallback } catch { return fallback }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value) } catch { /* приватный режим */ }
}

export default function NotesTasks() {
  const [tab, setTab] = useState(() => safeGet(TAB_KEY, 'tasks'))
  const [notes, setNotes] = useState(() => safeGet(NOTES_KEY, ''))
  const [saved, setSaved] = useState(true)
  const [todos, setTodos] = useState(readTodos)
  const [draft, setDraft] = useState('')

  useEffect(() => { safeSet(TAB_KEY, tab) }, [tab])
  useEffect(() => { safeSet(TODOS_KEY, JSON.stringify(todos)) }, [todos])

  // Сохраняем заметку через полсекунды после последнего нажатия
  useEffect(() => {
    if (saved) return
    const t = setTimeout(() => { safeSet(NOTES_KEY, notes); setSaved(true) }, 500)
    return () => clearTimeout(t)
  }, [notes, saved])

  const addTodo = (e) => {
    e.preventDefault()
    const text = draft.trim()
    if (!text) return
    setTodos(list => [...list, { id: Date.now(), text, done: false }])
    setDraft('')
  }
  const toggle = (id) => setTodos(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  const remove = (id) => setTodos(list => list.filter(t => t.id !== id))
  const clearDone = () => setTodos(list => list.filter(t => !t.done))

  const open = todos.filter(t => !t.done).length
  const done = todos.length - open

  return (
    <div className="widget dsh-notes">
      <div className="widget-header">
        <div className="dsh-tabs" role="tablist">
          <button type="button" role="tab" aria-selected={tab === 'tasks'} className={`dsh-tab${tab === 'tasks' ? ' is-active' : ''}`} onClick={() => setTab('tasks')}>
            Задачи{open > 0 && <span className="dsh-tab-count">{open}</span>}
          </button>
          <button type="button" role="tab" aria-selected={tab === 'notes'} className={`dsh-tab${tab === 'notes' ? ' is-active' : ''}`} onClick={() => setTab('notes')}>
            Заметки
          </button>
        </div>
        {tab === 'notes'
          ? <span className="dsh-muted-sm">{saved ? 'сохранено' : 'сохраняю…'}</span>
          : done > 0 && <button type="button" className="dsh-link-btn" onClick={clearDone}>Убрать выполненные</button>}
      </div>

      {tab === 'tasks' ? (
        <>
          <form className="dsh-todo-form" onSubmit={addTodo}>
            <input
              id="dsh-todo-input"
              className="dsh-input"
              value={draft}
              onChange={e => setDraft(e.target.value)}
              placeholder="Что сделать сегодня? Enter — добавить"
              maxLength={140}
            />
          </form>
          {todos.length === 0 ? (
            <p className="dsh-muted">Список пуст. Запиши 2–3 задачи на день, например «решить 5 задач SQL» или «досмотреть созвон».</p>
          ) : (
            <ul className="dsh-todos">
              {todos.map(t => (
                <li key={t.id} className={`dsh-todo${t.done ? ' is-done' : ''}`}>
                  <button type="button" className="dsh-check" onClick={() => toggle(t.id)} aria-pressed={t.done} aria-label={t.done ? 'Вернуть в работу' : 'Отметить выполненной'}>
                    {t.done && (
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" aria-hidden="true">
                        <path d="M1 3.5L4 6.5L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span className="dsh-todo-text">{t.text}</span>
                  <button type="button" className="dsh-ev-del" onClick={() => remove(t.id)} aria-label="Удалить задачу" title="Удалить">×</button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <textarea
          id="dsh-notes"
          className="notes-area dsh-notes-area"
          value={notes}
          onChange={e => { setNotes(e.target.value); setSaved(false) }}
          placeholder="Пиши здесь что угодно — сохраняется автоматически в этом браузере"
        />
      )}
    </div>
  )
}
