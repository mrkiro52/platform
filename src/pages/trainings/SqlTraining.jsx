import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../api'
import CodeEditor from '../../components/CodeEditor'
import InlineMarkup from '../../components/InlineMarkup'

// SQL-тренажёр: настоящие запросы к настоящей базе маркетплейса на сервере.
// Сначала выбор тем и порядка задач, потом решение. Решённые задачи
// сохраняет сервер (при верной проверке), черновики живут в странице.

export function plural(n, one, few, many) {
  const m100 = n % 100
  if (m100 >= 11 && m100 <= 14) return many
  const m10 = n % 10
  if (m10 === 1) return one
  if (m10 >= 2 && m10 <= 4) return few
  return many
}

function Cell({ value }) {
  if (value === null) return <td className="sqlt-null">NULL</td>
  if (typeof value === 'number') return <td className="sqlt-num">{value}</td>
  return <td>{String(value)}</td>
}

export function ResultTable({ result, full = false }) {
  if (!result.columns.length) return null
  return (
    <div className={`sqlt-result${full ? ' is-full' : ''}`}>
      <div className="sqlt-table-wrap sqlt-scroll">
        <table className="sqlt-table">
          <thead>
            <tr>{result.columns.map((c, i) => <th key={i} title={result.titles ? result.titles[i] : undefined}>{c}</th>)}</tr>
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

function shuffle(list) {
  const a = [...list]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function SchemaPanel({ schema }) {
  const [open, setOpen] = useState(() => new Set(['orders']))
  const toggle = (name) => setOpen(prev => {
    const next = new Set(prev)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    return next
  })
  return (
    <aside className="sqlt-schema sqlt-scroll">
      <div className="sqlt-schema-title">Схема базы</div>
      <div className="sqlt-schema-sub">Маркетплейс KIRO Market · нажми на таблицу, чтобы увидеть её столбцы</div>
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
              <a className="sqlt-preview" href={`/trainings/sql/${t.table}`} target="_blank" rel="noopener">
                Посмотреть данные ↗
              </a>
            </div>
          )}
        </div>
      ))}
    </aside>
  )
}

// Мой id — чтобы отметить себя в таблице лидеров
function myId() {
  try { return JSON.parse(localStorage.getItem('kiro_user'))?.id ?? null } catch { return null }
}

function Leaderboard({ list }) {
  const me = myId()
  return (
    <div className="sqlt-leaders">
      <div className="sqlt-leaders-head">
        <span className="sqlt-leaders-title">Лидеры тренажёра</span>
        <span className="sqlt-leaders-sub">топ-5 по решённым задачам</span>
      </div>
      {!list.length ? (
        <div className="sqlt-leaders-empty">Пока никто не решил ни одной задачи — стань первым</div>
      ) : (
        <ol className="sqlt-leaders-list">
          {list.map((u, i) => {
            const label = u.nickname || u.name || '?'
            return (
              <li key={u.id} className={`sqlt-leader${u.id === me ? ' is-me' : ''}`}>
                <span className={`sqlt-place is-${i + 1}`}>{i + 1}</span>
                {u.avatarUrl
                  ? <img className="sqlt-ava" src={u.avatarUrl} alt="" loading="lazy" />
                  : <span className="sqlt-ava">{(u.name || label).trim()[0]?.toUpperCase() || '?'}</span>}
                <span className="sqlt-leader-name">
                  {label}
                  {u.id === me && <small> · это ты</small>}
                </span>
                <span className="sqlt-leader-score">{u.solved} {plural(u.solved, 'задача', 'задачи', 'задач')}</span>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}

// ── Экран выбора тем ──
function Setup({ categories, picked, setPicked, mode, setMode, onStart, solved, leaderboard }) {
  const all = picked === 'all'
  const total = categories.reduce((n, c) => n + c.tasks.length, 0)
  const count = all ? total : categories.filter(c => picked.has(c.id)).reduce((n, c) => n + c.tasks.length, 0)

  const toggle = (id) => {
    // Из режима «все» клик по теме оставляет только её
    if (all) { setPicked(new Set([id])); return }
    const next = new Set(picked)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    // Выбраны все темы по одной — это то же, что «решать все»
    setPicked(next.size === categories.length ? 'all' : next)
  }

  return (
    <div className="sqlt-setup">
      <div className="sqlt-step">
        <div className="sqlt-step-title"><span>1</span>Какие темы тренируем</div>
        <div className="sqlt-step-sub">Можно выбрать сколько угодно тем</div>
        <button type="button" className={`sqlt-all${all ? ' is-on' : ''}`} onClick={() => setPicked('all')} aria-pressed={all}>
          Решать все <small>{total} задач</small>
        </button>
        <div className="sqlt-cats">
          {categories.map((c, i) => {
            const on = !all && picked.has(c.id)
            const done = c.tasks.filter(t => solved.has(t.id)).length
            return (
              <button key={c.id} type="button" className={`sqlt-cat${on ? ' is-on' : ''}`} onClick={() => toggle(c.id)} aria-pressed={on}>
                <span className="sqlt-cat-num">{i + 1}</span>
                <span className="sqlt-cat-title">{c.title}</span>
                <span className="sqlt-cat-count">{done ? `${done}/` : ''}{c.tasks.length}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="sqlt-step">
        <div className="sqlt-step-title"><span>2</span>Порядок задач</div>
        <div className="sqlt-seg">
          <button type="button" className={mode === 'order' ? 'is-on' : ''} onClick={() => setMode('order')}>По порядку</button>
          <button type="button" className={mode === 'shuffle' ? 'is-on' : ''} onClick={() => setMode('shuffle')}>Перемешать</button>
        </div>
      </div>

      <button type="button" className="sqlt-start" disabled={!count} onClick={onStart}>
        {count ? `Начать — ${count} ${plural(count, 'задача', 'задачи', 'задач')}` : 'Выбери хотя бы одну тему'}
      </button>

      <Leaderboard list={leaderboard} />
    </div>
  )
}

export default function SqlTraining({ onBack }) {
  const [data, setData] = useState(null)        // { categories, schema }
  const [loadError, setLoadError] = useState('')
  const [phase, setPhase] = useState('setup')    // setup | solve
  const [picked, setPicked] = useState('all')    // 'all' или Set id тем
  const [mode, setMode] = useState('order')
  const [queue, setQueue] = useState([])         // задачи текущей сессии
  const [index, setIndex] = useState(0)
  const [drafts, setDrafts] = useState({})
  const [solved, setSolved] = useState(() => new Set())
  const [outcome, setOutcome] = useState(null)
  const [running, setRunning] = useState(false)
  const [hintOpen, setHintOpen] = useState(false)
  const resultRef = useRef(null)

  // Задания, схема, мой прогресс и таблица лидеров. Перезапрашиваем при
  // возврате к выбору тем — чтобы лидерборд был свежим.
  const load = () => api.sqlTrainer()
    .then(d => {
      setData(d)
      setSolved(prev => new Set([...prev, ...(d.solved || [])]))
    })
    .catch(e => setLoadError(e.message || 'Не удалось загрузить тренажёр'))

  useEffect(() => { load() }, [])

  const categories = data ? data.categories : []
  const titleOf = useMemo(() => Object.fromEntries(categories.map(c => [c.id, c.title])), [categories])

  const start = () => {
    const tasks = categories
      .filter(c => picked === 'all' || picked.has(c.id))
      .flatMap(c => c.tasks.map(t => ({ ...t, category: c.id })))
    setQueue(mode === 'shuffle' ? shuffle(tasks) : tasks)
    setIndex(0)
    setOutcome(null)
    setHintOpen(false)
    setPhase('solve')
    window.scrollTo({ top: 0 })
  }

  const task = queue[index]
  const sql = task ? (drafts[task.id] ?? '') : ''

  const pickTask = (i) => {
    setIndex(i)
    setOutcome(null)
    setHintOpen(false)
  }

  // check = true — сверить с правильным ответом, иначе просто выполнить
  const execute = async (check) => {
    if (running || !sql.trim()) return
    setRunning(true)
    try {
      const res = await api.sqlRun(sql, check ? task.id : null)
      setOutcome({ taskId: task.id, checked: check, result: res.ok ? res : null, error: res.ok ? '' : res.error, verdict: res.ok ? res.verdict : null })
      if (res.ok && res.verdict && res.verdict.correct) setSolved(prev => new Set(prev).add(task.id))
    } catch (e) {
      setOutcome({ taskId: task.id, checked: check, result: null, error: e.message || 'Не удалось выполнить запрос', verdict: null })
    } finally {
      setRunning(false)
      requestAnimationFrame(() => resultRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' }))
    }
  }

  const head = (
    <>
      <button className="sqlt-back" onClick={phase === 'solve' ? () => { setPhase('setup'); load() } : onBack}>
        {phase === 'solve' ? '← Выбор тем' : '← Тренировки'}
      </button>
      <div className="page-header">
        <h1 className="page-title">SQL-тренажёр</h1>
        <p className="page-subtitle">
          Настоящая база маркетплейса: 5 таблиц, около 50 тысяч строк, пропуски и разнобой — как в работе.
          Пиши SQL — запрос выполняется на сервере, а ответ сверяется с правильным.{' '}
          <b className="sqlt-lead">Чтобы посмотреть содержимое любой таблицы, открой «Схему базы», выбери таблицу и нажми «Посмотреть данные» — она откроется в новой вкладке.</b>
        </p>
      </div>
    </>
  )

  if (loadError) {
    return <section className="page active">{head}<div className="sqlt-error">{loadError}</div></section>
  }
  if (!data) {
    return <section className="page active">{head}<p style={{ color: 'var(--text-secondary)' }}>Готовим базу данных…</p></section>
  }

  if (phase === 'setup') {
    return (
      <section className="page active sqlt">
        {head}
        <div className="sqlt-layout">
          <Setup categories={categories} picked={picked} setPicked={setPicked} mode={mode} setMode={setMode} onStart={start} solved={solved} leaderboard={data.leaderboard || []} />
          <SchemaPanel schema={data.schema} />
        </div>
      </section>
    )
  }

  const shown = outcome && outcome.taskId === task.id ? outcome : null
  const doneInQueue = queue.filter(t => solved.has(t.id)).length

  return (
    <section className="page active sqlt">
      {head}

      <div className="sqlt-progress">
        <div className="sqlt-dots sqlt-scroll" role="tablist" aria-label="Задачи">
          {queue.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              className={`sqlt-dot${i === index ? ' is-active' : ''}${solved.has(t.id) ? ' is-solved' : ''}`}
              onClick={() => pickTask(i)}
              title={`${titleOf[t.category]} · ${t.title}${solved.has(t.id) ? ' — решено' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <span className="sqlt-score">Решено {doneInQueue} из {queue.length}</span>
      </div>

      {doneInQueue === queue.length && (
        <div className="sqlt-banner is-ok">Все задачи этой подборки решены. Можно вернуться к выбору тем и взять новые.</div>
      )}

      <div className="sqlt-layout">
        <div className="sqlt-main">
          <div className="sqlt-task">
            <div className="sqlt-task-top">
              <span className="sqlt-task-num">Задача {index + 1} из {queue.length}</span>
              <span className="sqlt-task-cat">{titleOf[task.category]}</span>
              {solved.has(task.id) && <span className="sqlt-solved">решено</span>}
            </div>
            <h2 className="sqlt-task-title">{task.title}</h2>
            <p className="sqlt-task-text"><InlineMarkup text={task.text} /></p>
            {task.ordered && <p className="sqlt-ordered">В этой задаче проверяется и порядок строк.</p>}
            <button type="button" className="sqlt-hint-toggle" onClick={() => setHintOpen(o => !o)}>
              {hintOpen ? 'Скрыть подсказку' : 'Подсказка'}
            </button>
            {hintOpen && <p className="sqlt-hint"><InlineMarkup text={task.hint} /></p>}
          </div>

          <CodeEditor
            value={sql}
            onChange={(v) => setDrafts(prev => ({ ...prev, [task.id]: v }))}
            onRun={() => execute(false)}
            minLines={6}
            placeholder={'SELECT ...\nFROM ...\nWHERE ...'}
            ariaLabel="SQL-запрос"
          />

          <div className="sqlt-actions">
            <button type="button" className="sqlt-exec" onClick={() => execute(false)} disabled={running || !sql.trim()}>
              {running ? 'Выполняется…' : '▶ Выполнить'}
            </button>
            <button type="button" className="sqlt-run" onClick={() => execute(true)} disabled={running || !sql.trim()}>
              Проверить
            </button>
            <span className="sqlt-kbd">Ctrl + Enter — выполнить</span>
            {sql && <button type="button" className="sqlt-clear" onClick={() => setDrafts(prev => ({ ...prev, [task.id]: '' }))}>Очистить</button>}
          </div>

          <div ref={resultRef}>
            {shown && shown.checked && shown.verdict && (
              shown.verdict.correct ? (
                <div className="sqlt-banner is-ok">
                  <b>Верно! Задача зачтена.</b>
                  {index < queue.length - 1 && <button type="button" className="sqlt-next" onClick={() => pickTask(index + 1)}>Следующая задача →</button>}
                </div>
              ) : (
                <div className="sqlt-banner is-bad">
                  <b>Неправильно.</b> {shown.verdict.reason}
                </div>
              )
            )}
            {shown && !shown.checked && shown.result && (
              <div className="sqlt-banner">Запрос выполнен без проверки. Когда результат устроит — нажми «Проверить».</div>
            )}
            {shown && shown.error && <div className="sqlt-error">{shown.error}</div>}
            {shown && shown.result && <ResultTable result={shown.result} />}
          </div>
        </div>

        <SchemaPanel schema={data.schema} />
      </div>
    </section>
  )
}
