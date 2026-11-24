import { useState } from 'react'
import { LIBRARY_LESSONS } from '../data/libraryCatalog'

const normalize = (s) => s.toLowerCase().replace(/ё/g, 'е')

function Highlight({ text, query }) {
  if (!query) return text
  const i = normalize(text).indexOf(normalize(query))
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark className="lib-mark">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </>
  )
}

export default function Library({ onOpenTheory }) {
  const [query, setQuery] = useState('')
  const q = query.trim()
  const needle = normalize(q)
  const results = LIBRARY_LESSONS.filter(item => normalize(item.title).includes(needle))

  return (
    <section className="page active lib">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
      </div>

      <div className="lib-controls">
        <label className="lib-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
          </svg>
          <input
            id="lib-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Поиск по названию конспекта"
            aria-label="Поиск по названию конспекта"
            autoComplete="off"
          />
          {query && (
            <button type="button" className="lib-search-clear" onClick={() => setQuery('')} aria-label="Очистить поиск">×</button>
          )}
        </label>
      </div>

      {results.length ? (
        <div className="lib-grid">
          {results.map(item => (
            <button key={item.id} type="button" className="lib-card" onClick={() => onOpenTheory({ day: item.id })}>
              <span className="lib-card-title"><Highlight text={item.title} query={q} /></span>
              <span className="lib-card-open">Читать →</span>
            </button>
          ))}
        </div>
      ) : <p className="lib-results-head">По запросу «{q}» ничего не найдено.</p>}
    </section>
  )
}
