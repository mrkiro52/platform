import { useEffect, useMemo, useRef, useState } from 'react'
import { SECTIONS } from '../data/libraryCatalog'

// Библиотека знаний: разделы в порядке изучения, внутри — конспекты в порядке
// чтения. Слева поиск по подстроке в названии (без учёта регистра и «е/ё»),
// справа выбор категорий: можно отметить несколько и сохранить.

const CATEGORIES_KEY = 'kiro_library_categories'
const TOTAL = SECTIONS.reduce((n, s) => n + s.items.length, 0)

const normalize = (s) => s.toLowerCase().replace(/ё/g, 'е')

function readCategories() {
  try {
    const list = JSON.parse(localStorage.getItem(CATEGORIES_KEY))
    return Array.isArray(list) ? list.filter(k => SECTIONS.some(s => s.key === k)) : []
  } catch {
    return []
  }
}

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

function LessonCard({ item, num, query, sectionTitle, onOpen }) {
  return (
    <button type="button" className="lib-card" onClick={() => onOpen(item)}>
      <span className="lib-card-top">
        <span className="lib-card-num">{num}</span>
        {sectionTitle && <span className="lib-card-section">{sectionTitle}</span>}
      </span>
      <span className="lib-card-title"><Highlight text={item.title} query={query} /></span>
      <span className="lib-card-open">Читать →</span>
    </button>
  )
}

function CategoryPicker({ selected, onSave }) {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState(selected)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggleOpen = () => {
    if (!open) setDraft(selected)
    setOpen(o => !o)
  }
  const toggle = (key) => setDraft(d => (d.includes(key) ? d.filter(k => k !== key) : [...d, key]))
  const save = () => { onSave(draft); setOpen(false) }

  return (
    <div className="lib-picker" ref={ref}>
      <button
        type="button"
        className={`lib-picker-btn${selected.length ? ' is-active' : ''}`}
        onClick={toggleOpen}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 5h18M6 12h12M10 19h4" />
        </svg>
        {selected.length ? `Категории: ${selected.length}` : 'Выбрать категории'}
      </button>

      {open && (
        <div className="lib-picker-panel" role="dialog" aria-label="Выбор категорий">
          <div className="lib-picker-head">
            <span className="lib-picker-title">Категории</span>
            <button type="button" className="lib-picker-link" onClick={() => setDraft(draft.length === SECTIONS.length ? [] : SECTIONS.map(s => s.key))}>
              {draft.length === SECTIONS.length ? 'Снять все' : 'Выбрать все'}
            </button>
          </div>
          <div className="lib-picker-list">
            {SECTIONS.map(s => {
              const on = draft.includes(s.key)
              return (
                <label key={s.key} className={`lib-picker-item${on ? ' is-on' : ''}`}>
                  <input id={`lib-cat-${s.key}`} type="checkbox" checked={on} onChange={() => toggle(s.key)} />
                  <span className="lib-picker-check" aria-hidden="true">
                    {on && (
                      <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 3.5L4 6.5L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    )}
                  </span>
                  <span className="lib-picker-name">{s.title}</span>
                  <span className="lib-picker-count">{s.items.length}</span>
                </label>
              )
            })}
          </div>
          <div className="lib-picker-foot">
            <button type="button" className="lib-picker-cancel" onClick={() => setOpen(false)}>Отмена</button>
            <button type="button" className="lib-picker-save" onClick={save}>Сохранить</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Library({ onOpenTheory }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(readCategories)

  const saveCategories = (keys) => {
    // Порядок категорий — как в каталоге, а не как их отмечали
    const ordered = SECTIONS.map(s => s.key).filter(k => keys.includes(k))
    setSelected(ordered)
    try { localStorage.setItem(CATEGORIES_KEY, JSON.stringify(ordered)) } catch { /* приватный режим */ }
  }

  const open = (item) => onOpenTheory({ day: item.id })

  const sections = useMemo(
    () => (selected.length ? SECTIONS.filter(s => selected.includes(s.key)) : SECTIONS),
    [selected],
  )

  const q = query.trim()
  const results = useMemo(() => {
    if (!q) return null
    const needle = normalize(q)
    return sections.flatMap(s => s.items
      .map((item, i) => ({ item, num: i + 1, section: s.title }))
      .filter(r => normalize(r.item.title).includes(needle)))
  }, [q, sections])

  return (
    <section className="page active lib">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
        <p className="page-subtitle">
          {TOTAL} конспектов в {SECTIONS.length} категориях. Категории идут в порядке изучения, внутри — в порядке чтения.
        </p>
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
        <CategoryPicker selected={selected} onSave={saveCategories} />
      </div>

      {selected.length > 0 && (
        <div className="lib-selected">
          {sections.map(s => (
            <button key={s.key} type="button" className="lib-selected-chip" onClick={() => saveCategories(selected.filter(k => k !== s.key))} aria-label={`Убрать категорию ${s.title}`}>
              {s.title} <span aria-hidden="true">×</span>
            </button>
          ))}
          <button type="button" className="lib-picker-link" onClick={() => saveCategories([])}>Показать все</button>
        </div>
      )}

      {results ? (
        <div>
          <div className="lib-results-head">
            {results.length
              ? `Найдено: ${results.length}`
              : `По запросу «${q}» ничего не найдено${selected.length ? ' в выбранных категориях' : ''}.`}
          </div>
          <div className="lib-grid">
            {results.map(r => (
              <LessonCard key={r.item.id} item={r.item} num={r.num} query={q} sectionTitle={r.section} onOpen={open} />
            ))}
          </div>
        </div>
      ) : (
        <div className="lib-sections">
          {sections.map(s => (
            <section key={s.key} className="lib-section">
              <h2 className="lib-section-title">{s.title}</h2>
              <p className="lib-section-about">{s.about}</p>
              <div className="lib-grid">
                {s.items.map((item, n) => (
                  <LessonCard key={item.id} item={item} num={n + 1} onOpen={open} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
