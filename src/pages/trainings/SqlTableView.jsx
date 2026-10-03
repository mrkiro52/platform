import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api } from '../../api'
import { ResultTable, plural } from './SqlTraining'

// Просмотр одной таблицы SQL-тренажёра на отдельной странице:
// /trainings/sql/customers. Открывается из «Схемы базы» в новой вкладке.

const ROWS = 100

export default function SqlTableView() {
  const { table } = useParams()
  const [meta, setMeta] = useState(null)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    setMeta(null)
    setResult(null)
    setError('')
    api.sqlTrainer()
      .then(async (data) => {
        const info = data.schema.find(t => t.table === table)
        if (!info) throw new Error(`Таблицы «${table}» в базе нет`)
        if (!alive) return
        setMeta(info)
        const res = await api.sqlRun(`SELECT * FROM ${info.table} LIMIT ${ROWS}`, null)
        if (!alive) return
        if (!res.ok) throw new Error(res.error)
        // Описание столбца — в подсказке при наведении на заголовок
        res.titles = res.columns.map(name => {
          const col = info.columns.find(c => c.name === name)
          return col ? `${col.type}${col.description ? ` — ${col.description}` : ''}` : ''
        })
        setResult(res)
      })
      .catch(e => { if (alive) setError(e.message || 'Не удалось открыть таблицу') })
    return () => { alive = false }
  }, [table])

  return (
    <section className="page active sqlt-view">
      <Link className="sqlt-back" to="/trainings/sql">← SQL-тренажёр</Link>
      <div className="sqlt-view-head">
        <div>
          <h1 className="page-title"><code className="sqlt-view-name">{table}</code></h1>
          {meta && (
            <p className="page-subtitle">
              {meta.description} · {meta.rows.toLocaleString('ru-RU')} {plural(meta.rows, 'строка', 'строки', 'строк')}, {meta.columns.length} {plural(meta.columns.length, 'столбец', 'столбца', 'столбцов')}.
              {' '}Здесь первые {ROWS} строк — наведи на заголовок столбца, чтобы увидеть его описание.
            </p>
          )}
        </div>
      </div>
      {error && <div className="sqlt-error">{error}</div>}
      {!error && !result && <p style={{ color: 'var(--text-secondary)' }}>Загружаем данные…</p>}
      {result && <ResultTable result={result} full />}
    </section>
  )
}
