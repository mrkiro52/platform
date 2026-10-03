import { useEffect, useRef, useState } from 'react'
import { api } from '../../api'
import CodeEditor from '../../components/CodeEditor'
import InlineMarkup from '../../components/InlineMarkup'

// SQL-тренажёр: настоящие запросы к настоящей базе маркетплейса на сервере.
// Прогресс и черновики живут только в состоянии страницы — после
// перезагрузки всё начинается заново.

function Cell({ value }) {
  if (value === null) return <td className="sqlt-null">NULL</td>
  if (typeof value === 'number') return <td className="sqlt-num">{value}</td>
  return <td>{String(value)}</td>
}

function ResultTable({ result }) {
  if (!result.columns.length) return null
  return (
    <div className="sqlt-result">
      <div className="sqlt-table-wrap">
        <table className="sqlt-table">
          <thead>
            <tr>{result.columns.map((c, i) => <th key={i}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {result.rows.map((row, i) => (
              <tr key={i}>{row.map((v, j) => <Cell key={j} value={v} />)}</tr>
            ))}
          </tbody>
        </table>
        {!result.rows.length && <div className="sqlt-empty">Запрос выполнился, но не вернул ни одной строки</div>}
      </div>
      <div className="sqlt-meta">
        <span>
          {result.truncated ? 'Больше 50 000 строк' : `${result.rowCount.toLocaleString('ru-RU')} ${plural(result.rowCount, 'строка', 'строки', 'строк')}`}
          {result.rowCount > result.rows.length && ` · показаны первые ${result.rows.length}`}
        </span>
        <span>{result.ms} мс</span>
      </div>
    </div>
  )
}

function plural(n, one, few, many) {
  const m100 = n % 100
  if (m100 >= 11 && m100 <= 14) return many
  const m10 = n % 10
  if (m10 === 1) return one
  if (m10 >= 2 && m10 <= 4) return few
  return many
}

function SchemaPanel({ schema, onPreview, busy }) {
  const [open, setOpen] = useState(() => new Set(['orders']))
  const toggle = (name) => setOpen(prev => {
    const next = new Set(prev)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    return next
  })
  return (
    <aside className="sqlt-schema">
      <div className="sqlt-schema-head">
        <div className="sqlt-schema-title">Схема базы</div>
        <div className="sqlt-schema-sub">Маркетплейс KIRO Market · нажми на таблицу, чтобы увидеть столбцы</div>
      </div>
      {schema.map(t => (
        <div key={t.table} className={`sqlt-tbl${open.has(t.table) ? ' is-open' : ''}`}>
          <button type="button" className="sqlt-tbl-head" onClick={() => toggle(t.table)} aria-expanded={open.has(t.table)}>
            <span className="sqlt-tbl-name">{t.table}</span>
            <span className="sqlt-tbl-rows">{t.rows.toLocaleString('ru-RU')} строк</span>
            <span className="sqlt-chev" aria-hidden="true">›</span>
          </button>
          {open.has(t.table) && (
            <div className="sqlt-tbl-body">
              {t.description && <div className="sqlt-tbl-desc">{t.description}</div>}
              <ul className="sqlt-cols">
                {t.columns.map(c => (
                  <li key={c.name}>
                    <div className="sqlt-col-line">
                      <code className="sqlt-col-name">{c.name}</code>
                      <span className="sqlt-col-type">{c.type}</span>
                      {c.pk && <span className="sqlt-col-flag">PK</span>}
                      {!c.notNull && !c.pk && <span className="sqlt-col-flag is-null">NULL</span>}
                    </div>
                    {c.description && <div className="sqlt-col-desc">{c.description}</div>}
                  </li>
                ))}
              </ul>
              <button type="button" className="sqlt-preview" disabled={busy} onClick={() => onPreview(t.table)}>
                Посмотреть данные — первые 20 строк
              </button>
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}

export default function SqlTraining({ onBack }) {
  const [data, setData] = useState(null)        // { tasks, schema }
  const [loadError, setLoadError] = useState('')
  const [index, setIndex] = useState(0)
  const [drafts, setDrafts] = useState({})       // id задания → текст запроса
  const [solved, setSolved] = useState(() => new Set())
  const [outcome, setOutcome] = useState(null)  // { taskId, result, verdict, error, preview }
  const [running, setRunning] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const resultRef = useRef(null)

  useEffect(() => {
    api.sqlTrainer()
      .then(setData)
      .catch(e => setLoadError(e.message || 'Не удалось загрузить тренажёр'))
  }, [])

  const tasks = data ? data.tasks : []
  const task = tasks[index]
  const sql = task ? (drafts[task.id] ?? '') : ''

  const pickTask = (i) => {
    setIndex(i)
    setOutcome(null)
    setHintOpen(false)
  }

  const execute = async (query, { preview = false } = {}) => {
    if (running || !query.trim()) return
    setRunning(true)
    try {
      const res = await api.sqlRun(query, preview ? null : task.id)
      setOutcome({ taskId: task.id, preview, result: res.ok ? res : null, error: res.ok ? '' : res.error, verdict: res.ok ? res.verdict : null })
      if (res.ok && res.verdict && res.verdict.correct) setSolved(prev => new Set(prev).add(task.id))
    } catch (e) {
      setOutcome({ taskId: task.id, preview, result: null, error: e.message || 'Не удалось выполнить запрос', verdict: null })
    } finally {
      setRunning(false)
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))
    }
  }

  const run = () => execute(sql)
  const preview = (table) => execute(`SELECT * FROM ${table} LIMIT 20`, { preview: true })

  if (loadError) {
    return (
      <section className="page active">
        <button className="sqlt-back" onClick={onBack}>← Тренировки</button>
        <div className="sqlt-error">{loadError}</div>
      </section>
    )
  }

  if (!data) {
    return (
      <section className="page active">
        <button className="sqlt-back" onClick={onBack}>← Тренировки</button>
        <p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>Готовим базу данных…</p>
      </section>
    )
  }

  const shown = outcome && outcome.taskId === task.id ? outcome : null
  const allDone = solved.size === tasks.length

  return (
    <section className="page active sqlt">
      <button className="sqlt-back" onClick={onBack}>← Тренировки</button>
      <div className="page-header">
        <h1 className="page-title">SQL-тренажёр</h1>
        <p className="page-subtitle">
          Настоящая база маркетплейса: 5 таблиц, около 50 тысяч строк, пропуски и разнобой — как в работе.
          Пиши SQL — запрос выполняется на сервере, а ответ сверяется с правильным.
        </p>
      </div>

      <div className="sqlt-progress">
        <div className="sqlt-dots" role="tablist" aria-label="Задачи">
          {tasks.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`sqlt-dot${i === index ? ' is-active' : ''}${solved.has(t.id) ? ' is-solved' : ''}`}
              onClick={() => pickTask(i)}
              title={`${t.title}${solved.has(t.id) ? ' — решено' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="sqlt-score">Решено {solved.size} из {tasks.length}</span>
      </div>

      {allDone && (
        <div className="sqlt-banner is-ok">Все 10 задач решены — основы SELECT и WHERE у тебя в руках. Попробуй решить их другими способами.</div>
      )}

      <div className="sqlt-layout">
        <div className="sqlt-main">
          <div className="sqlt-task">
            <div className="sqlt-task-top">
              <span className="sqlt-task-num">Задача {index + 1}</span>
              {solved.has(task.id) && <span className="sqlt-solved">решено</span>}
            </div>
            <h2 className="sqlt-task-title">{task.title}</h2>
            <p className="sqlt-task-text"><InlineMarkup text={task.text} /></p>
            <button type="button" className="sqlt-hint-toggle" onClick={() => setHintOpen(o => !o)}>
              {hintOpen ? 'Скрыть подсказку' : 'Подсказка'}
            </button>
            {hintOpen && <p className="sqlt-hint"><InlineMarkup text={task.hint} /></p>}
          </div>

          <CodeEditor
            value={sql}
            onChange={(v) => setDrafts(prev => ({ ...prev, [task.id]: v }))}
            onRun={run}
            minLines={6}
            placeholder={'SELECT ...\nFROM ...\nWHERE ...'}
            ariaLabel="SQL-запрос"
          />

          <div className="sqlt-actions">
            <button type="button" className="sqlt-run" onClick={run} disabled={running || !sql.trim()}>
              {running ? 'Выполняется…' : 'Выполнить и проверить'}
            </button>
            <span className="sqlt-kbd">Ctrl + Enter</span>
            {sql && <button type="button" className="sqlt-clear" onClick={() => setDrafts(prev => ({ ...prev, [task.id]: '' }))}>Очистить</button>}
          </div>

          <div ref={resultRef}>
            {shown && shown.verdict && (
              shown.verdict.correct ? (
                <div className="sqlt-banner is-ok">
                  <b>Верно! Задача зачтена.</b>
                  {index < tasks.length - 1 && <button type="button" className="sqlt-next" onClick={() => pickTask(index + 1)}>Следующая задача →</button>}
                </div>
              ) : (
                <div className="sqlt-banner is-bad">
                  <b>Неправильно.</b> {shown.verdict.reason}
                </div>
              )
            )}
            {shown && shown.preview && shown.result && (
              <div className="sqlt-banner">Просмотр данных — задача не проверялась</div>
            )}
            {shown && shown.error && <div className="sqlt-error">{shown.error}</div>}
            {shown && shown.result && <ResultTable result={shown.result} />}
          </div>
        </div>

        <SchemaPanel schema={data.schema} onPreview={preview} busy={running} />
      </div>
    </section>
  )
}
