import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { api } from '../api'

// Вакансии и контакты для участников лагеря:
// /autumn-camp/vacancies — карточки, /autumn-camp/vacancies/:id — вакансия целиком.
// Временно закрыто PIN-кодом, который проверяется только на фронтенде: страница
// ещё в работе и не должна попадаться участникам. Это не защита данных — API
// вакансий открыт любому вошедшему пользователю.

const PIN = '0239'
const PIN_KEY = 'kiro-vacancies-pin'

export const VACANCY_CATEGORIES = {
  fullstack: { label: 'Fullstack', color: '#BC8CFF' },
  backend: { label: 'Backend', color: '#58A6FF' },
  analytics: { label: 'Аналитика', color: '#3FB950' },
  ml: { label: 'ML / AI', color: '#FF8C42' },
  security: { label: 'Кибербезопасность', color: '#F85149' },
  other: { label: 'Другое', color: '#8B949E' },
}

function readPinOk() { try { return sessionStorage.getItem(PIN_KEY) === '1' } catch { return false } }
function savePinOk() { try { sessionStorage.setItem(PIN_KEY, '1') } catch { /* без сохранения */ } }

function PinGate({ onPass }) {
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const change = (e) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 4)
    setValue(v)
    setError(false)
    if (v.length === 4) {
      if (v === PIN) { savePinOk(); onPass() }
      else { setError(true); setTimeout(() => setValue(''), 350) }
    }
  }

  return (
    <section className="page active prg-page vac-page">
      <Link className="prg-back" to="/autumn-camp">← Осенний лагерь</Link>
      <div className="vac-pin">
        <div className="vac-pin-icon" aria-hidden="true">🔒</div>
        <h1 className="vac-pin-title">Раздел в разработке</h1>
        <p className="vac-pin-text">Введи код доступа из 4 цифр</p>
        <label className={`vac-pin-boxes${error ? ' is-error' : ''}`}>
          <input
            className="vac-pin-input"
            value={value}
            onChange={change}
            inputMode="numeric"
            autoComplete="off"
            autoFocus
            maxLength={4}
            aria-label="Код доступа"
          />
          {[0, 1, 2, 3].map(i => (
            <span key={i} className={`vac-pin-box${i === value.length ? ' is-active' : ''}`}>{value[i] ? '•' : ''}</span>
          ))}
        </label>
        <div className="vac-pin-error" role="alert">{error ? 'Неверный код' : ''}</div>
        <button type="button" className="vac-pin-back" onClick={() => navigate('/autumn-camp')}>Вернуться в лагерь</button>
      </div>
    </section>
  )
}

// Категорий у вакансии несколько — показываем плашку на каждую
const catsOf = v => (Array.isArray(v.categories) && v.categories.length ? v.categories : [v.category || 'other'])

function CategoryBadges({ vacancy }) {
  return (
    <span className="vac-badges">
      {catsOf(vacancy).map(key => {
        const c = VACANCY_CATEGORIES[key] || VACANCY_CATEGORIES.other
        return <span key={key} className="vac-badge" style={{ '--vac': c.color }}>{c.label}</span>
      })}
    </span>
  )
}

// Контакт — ссылкой, если это URL, Telegram-ник или почта
function Contact({ value }) {
  const v = String(value || '').trim()
  let href = null
  if (/^https?:\/\//i.test(v)) href = v
  else if (/^@[\w\d_]{3,}$/.test(v)) href = `https://t.me/${v.slice(1)}`
  else if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) href = `mailto:${v}`
  if (!href) return <span>{v}</span>
  return <a href={href} target="_blank" rel="noopener noreferrer">{v.replace(/^https?:\/\//i, '')}</a>
}

const PAGE_SIZE = 12

// Номера страниц с многоточиями: 1 … 4 5 [6] 7 8 … 20
function pageItems(page, pages) {
  const set = new Set([1, pages, page - 1, page, page + 1])
  const nums = [...set].filter(n => n >= 1 && n <= pages).sort((a, b) => a - b)
  const out = []
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('gap' + n)
    out.push(n)
  })
  return out
}

// Пагинация. Одно и то же состояние (page из адреса) рисуется и над списком, и под ним
function Pagination({ page, pages, onChange, className = '' }) {
  if (pages <= 1) return <div className={`vac-pager is-empty ${className}`} />
  return (
    <nav className={`vac-pager ${className}`} aria-label="Страницы">
      <button type="button" className="vac-pager-btn" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Предыдущая страница">←</button>
      {pageItems(page, pages).map(it => typeof it === 'number'
        ? <button key={it} type="button" className={`vac-pager-btn${it === page ? ' is-active' : ''}`} aria-current={it === page ? 'page' : undefined} onClick={() => onChange(it)}>{it}</button>
        : <span key={it} className="vac-pager-gap" aria-hidden="true">…</span>)}
      <button type="button" className="vac-pager-btn" disabled={page >= pages} onClick={() => onChange(page + 1)} aria-label="Следующая страница">→</button>
    </nav>
  )
}

function VacancyList() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  // Состояние — в адресе: ?page=2&category=backend,ml. Страницу и фильтр можно открыть ссылкой
  const page = Math.max(parseInt(params.get('page'), 10) || 1, 1)
  const selected = (params.get('category') || '').split(',').filter(c => VACANCY_CATEGORIES[c])
  const categoryParam = selected.join(',')

  useEffect(() => {
    let alive = true
    const query = { page, limit: PAGE_SIZE }
    if (categoryParam) query.category = categoryParam
    setError('')
    api.vacancies(query)
      .then(d => { if (alive) setData(d) })
      .catch(e => { if (alive) setError(e.message || 'Не удалось загрузить вакансии') })
    return () => { alive = false }
  }, [page, categoryParam])

  const update = (nextPage, nextSelected) => {
    const p = new URLSearchParams()
    if (nextPage > 1) p.set('page', String(nextPage))
    if (nextSelected.length) p.set('category', nextSelected.join(','))
    setParams(p)
  }
  const goPage = n => { update(n, selected); window.scrollTo({ top: 0, behavior: 'smooth' }) }
  // Смена категорий всегда возвращает на первую страницу
  const toggle = key => update(1, selected.includes(key) ? selected.filter(c => c !== key) : [...selected, key])

  const counts = data?.categories || {}
  const shown = data?.items || []
  const hasAny = data && (data.total > 0 || selected.length > 0 || Object.values(counts).some(n => n > 0))

  return (
    <section className="page active prg-page vac-page">
      <Link className="prg-back" to="/autumn-camp">← Осенний лагерь</Link>
      <div className="vac-hero">
        <span className="prg-tag">Autumn Camp 2026</span>
        <h1 className="prg-title">Вакансии и контакты</h1>
        <p className="prg-lead">Стажировки и junior-позиции от компаний-партнёров и выпускников лагеря. Открой вакансию, чтобы прочитать описание целиком и написать по контакту.</p>
      </div>

      {hasAny && (
        <div className="vac-toolbar">
          <div className="vac-filters" role="group" aria-label="Категории">
            <button type="button" className={!selected.length ? 'is-active' : ''} onClick={() => update(1, [])}>Все</button>
            {Object.entries(VACANCY_CATEGORIES).filter(([key]) => counts[key] > 0 || selected.includes(key)).map(([key, c]) => (
              <button key={key} type="button" className={selected.includes(key) ? 'is-active' : ''} aria-pressed={selected.includes(key)} onClick={() => toggle(key)}>{c.label}</button>
            ))}
          </div>
          <Pagination page={data.page} pages={data.pages} onChange={goPage} className="is-top" />
        </div>
      )}

      {error && <div className="prg-empty">{error}</div>}
      {!data && !error && <p className="prg-loading">Загружаем вакансии…</p>}
      {data && !hasAny && <div className="prg-empty">Вакансий пока нет — загляни позже.</div>}
      {data && hasAny && !shown.length && <div className="prg-empty">В выбранных категориях вакансий нет.</div>}

      <div className="vac-grid">
        {shown.map(v => (
          <button key={v.id} type="button" className="vac-card" onClick={() => navigate(`/autumn-camp/vacancies/${v.id}`)}>
            <CategoryBadges vacancy={v} />
            <span className="vac-card-title">{v.title}</span>
            <span className="vac-card-desc">{v.description}</span>
            <span className="vac-card-foot">
              <span className="vac-card-contact">{v.contact}</span>
              <span className="vac-card-go">Подробнее →</span>
            </span>
          </button>
        ))}
      </div>

      {data && data.pages > 1 && (
        <div className="vac-bottom">
          <Pagination page={data.page} pages={data.pages} onChange={goPage} className="is-bottom" />
        </div>
      )}
    </section>
  )
}

function VacancyItem({ id }) {
  const [v, setV] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    window.scrollTo(0, 0)
    api.vacancy(id).then(x => { if (alive) setV(x) }).catch(e => { if (alive) setError(e.message || 'Вакансия не найдена') })
    return () => { alive = false }
  }, [id])

  return (
    <section className="page active prg-page vac-page">
      <Link className="prg-back" to="/autumn-camp/vacancies">← Вакансии и контакты</Link>
      {error && <div className="prg-empty">{error}</div>}
      {!v && !error && <p className="prg-loading">Загружаем вакансию…</p>}
      {v && (
        <article className="vac-item">
          <CategoryBadges vacancy={v} />
          <h1 className="prg-title">{v.title}</h1>
          <div className="vac-item-desc">{v.description}</div>
          <div className="vac-item-contact">
            <span className="vac-item-contact-label">Контакт для связи</span>
            <Contact value={v.contact} />
          </div>
        </article>
      )}
    </section>
  )
}

export default function VacanciesPage() {
  const { id } = useParams()
  const [ok, setOk] = useState(readPinOk)
  if (!ok) return <PinGate onPass={() => setOk(true)} />
  return id ? <VacancyItem id={id} /> : <VacancyList />
}
