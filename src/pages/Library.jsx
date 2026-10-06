import { useMemo, useState } from 'react'
import { AUDIENCES, SECTIONS } from '../data/libraryCatalog'

// Библиотека знаний: разделы в порядке изучения, внутри — порядок чтения.
// Фильтр по направлению показывает маршрут: общая база + материалы направления.
// Поиск — по подстроке в названии, без учёта регистра и разницы «е/ё».

const OPENED_KEY = 'kiro_library_opened'
const AUDIENCE_KEY = 'kiro_library_audience'

const AUDIENCE_LABEL = Object.fromEntries(AUDIENCES.map(a => [a.key, a.label]))
const TOTAL = SECTIONS.reduce((n, s) => n + s.items.length, 0)

const FILTERS = [
  { key: 'everything', label: 'Все материалы' },
  ...AUDIENCES,
]

function readOpened() {
  try {
    const list = JSON.parse(localStorage.getItem(OPENED_KEY))
    return new Set(Array.isArray(list) ? list : [])
  } catch {
    return new Set()
  }
}

function readAudience() {
  try {
    const v = localStorage.getItem(AUDIENCE_KEY)
    return FILTERS.some(f => f.key === v) ? v : 'everything'
  } catch {
    return 'everything'
  }
}

const normalize = (s) => s.toLowerCase().replace(/ё/g, 'е')

// Подходит ли материал под выбранное направление. Маршрут направления —
// это его материалы плюс общая база «для всех»; «Для всех» и «Карьера» — только свои.
function fits(item, filter) {
  if (filter === 'everything') return true
  if (filter === 'all' || filter === 'career') return item.for.includes(filter)
  return item.for.includes(filter) || item.for.includes('all')
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

function AudienceChips({ list }) {
  return (
    <span className="lib-chips">
      {list.map(a => <span key={a} className={`lib-chip is-${a}`}>{AUDIENCE_LABEL[a]}</span>)}
    </span>
  )
}

function LessonRow({ item, num, opened, query, sectionTitle, onOpen }) {
  return (
    <button type="button" className={`lib-row${opened ? ' is-opened' : ''}`} onClick={() => onOpen(item)}>
      <span className="lib-row-num">{opened ? '✓' : num}</span>
      <span className="lib-row-body">
        {sectionTitle && <span className="lib-row-section">{sectionTitle}</span>}
        <span className="lib-row-title"><Highlight text={item.title} query={query} /></span>
      </span>
      <AudienceChips list={item.for} />
    </button>
  )
}

export default function Library({ onOpenTheory }) {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState(readAudience)
  const [opened, setOpened] = useState(readOpened)

  const chooseFilter = (key) => {
    setFilter(key)
    try { localStorage.setItem(AUDIENCE_KEY, key) } catch { /* приватный режим */ }
  }

  const open = (item) => {
    const next = new Set(opened)
    next.add(item.id)
    setOpened(next)
    try { localStorage.setItem(OPENED_KEY, JSON.stringify([...next])) } catch { /* приватный режим */ }
    onOpenTheory({ day: item.id })
  }

  // Разделы маршрута: только подходящие материалы, пустые разделы скрыты
  const sections = useMemo(() => SECTIONS
    .map(s => ({ ...s, items: s.items.filter(i => fits(i, filter)) }))
    .filter(s => s.items.length > 0), [filter])

  const q = query.trim()
  const results = useMemo(() => {
    if (!q) return null
    const needle = normalize(q)
    return sections.flatMap(s => s.items
      .filter(i => normalize(i.title).includes(needle))
      .map(i => ({ item: i, section: s.title })))
  }, [q, sections])

  const routeItems = sections.flatMap(s => s.items)
  const routeOpened = routeItems.filter(i => opened.has(i.id)).length
  const nextItem = routeItems.find(i => !opened.has(i.id))
  const nextSection = nextItem && sections.find(s => s.items.includes(nextItem))
  const filterLabel = FILTERS.find(f => f.key === filter)?.label

  const jump = (key) => document.getElementById(`lib-${key}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="page active lib">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
        <p className="page-subtitle">
          {TOTAL} конспектов в {SECTIONS.length} разделах. Разделы идут в порядке изучения, внутри — в порядке чтения: начинай сверху.
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

        <div className="lib-filters" role="group" aria-label="Направление">
          {FILTERS.map(f => (
            <button
              key={f.key}
              type="button"
              className={`lib-filter${filter === f.key ? ' is-active' : ''}`}
              aria-pressed={filter === f.key}
              onClick={() => chooseFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {results ? (
        <div className="lib-results">
          <div className="lib-results-head">
            {results.length
              ? `Найдено: ${results.length}${filter !== 'everything' ? ` · направление «${filterLabel}»` : ''}`
              : `По запросу «${q}» ничего не найдено${filter !== 'everything' ? ` в направлении «${filterLabel}». Попробуй «Все материалы»` : ''}.`}
          </div>
          <div className="lib-list">
            {results.map(({ item, section }) => (
              <LessonRow
                key={item.id}
                item={item}
                num="·"
                opened={opened.has(item.id)}
                query={q}
                sectionTitle={section}
                onOpen={open}
              />
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="lib-route">
            <div className="lib-route-text">
              <div className="lib-route-title">
                {filter === 'everything' ? 'Весь маршрут' : `Маршрут: ${filterLabel}`}
              </div>
              <div className="lib-route-sub">
                {filter === 'everything' && 'Все материалы платформы. Выбери направление, чтобы оставить только нужное.'}
                {filter === 'all' && 'Общая база, которая нужна в любой профессии в IT.'}
                {filter === 'career' && 'Резюме, собеседования, soft skills и как учиться.'}
                {!['everything', 'all', 'career'].includes(filter) && 'Общая база и материалы направления в порядке изучения.'}
              </div>
              <div className="lib-progress" aria-label={`Открыто ${routeOpened} из ${routeItems.length}`}>
                <i style={{ width: `${routeItems.length ? (routeOpened / routeItems.length) * 100 : 0}%` }} />
              </div>
              <div className="lib-route-count">Открыто {routeOpened} из {routeItems.length}</div>
            </div>
            {nextItem && (
              <button type="button" className="lib-next" onClick={() => open(nextItem)}>
                <span className="lib-next-label">{routeOpened ? 'Читать дальше' : 'Начать с первого'}</span>
                <span className="lib-next-title">{nextItem.title}</span>
                <span className="lib-next-section">{nextSection.title}</span>
              </button>
            )}
          </div>

          <div className="lib-layout">
            <nav className="lib-toc" aria-label="Разделы">
              {sections.map((s, i) => {
                const done = s.items.filter(it => opened.has(it.id)).length
                return (
                  <button key={s.key} type="button" className="lib-toc-item" onClick={() => jump(s.key)}>
                    <span className="lib-toc-num">{i + 1}</span>
                    <span className="lib-toc-title">{s.title}</span>
                    <span className="lib-toc-count">{done}/{s.items.length}</span>
                  </button>
                )
              })}
            </nav>

            <div className="lib-sections">
              {sections.map((s, i) => {
                const done = s.items.filter(it => opened.has(it.id)).length
                return (
                  <section key={s.key} id={`lib-${s.key}`} className="lib-section">
                    <div className="lib-section-head">
                      <span className="lib-section-step">Шаг {i + 1}</span>
                      <h2 className="lib-section-title">{s.title}</h2>
                      <span className="lib-section-count">{done}/{s.items.length}</span>
                    </div>
                    <p className="lib-section-about">{s.about}</p>
                    <div className="lib-list">
                      {s.items.map((item, n) => (
                        <LessonRow key={item.id} item={item} num={n + 1} opened={opened.has(item.id)} onOpen={open} />
                      ))}
                    </div>
                  </section>
                )
              })}
            </div>
          </div>
        </>
      )}
    </section>
  )
}
