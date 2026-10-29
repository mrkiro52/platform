import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
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

function VacancyList() {
  const navigate = useNavigate()
  const [list, setList] = useState(null)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let alive = true
    api.vacancies().then(l => { if (alive) setList(l || []) }).catch(e => { if (alive) setError(e.message || 'Не удалось загрузить вакансии') })
    return () => { alive = false }
  }, [])

  const shown = (list || []).filter(v => filter === 'all' || catsOf(v).includes(filter))
  const present = new Set((list || []).flatMap(catsOf))

  return (
    <section className="page active prg-page vac-page">
      <Link className="prg-back" to="/autumn-camp">← Осенний лагерь</Link>
      <div className="vac-hero">
        <span className="prg-tag">Autumn Camp 2026</span>
        <h1 className="prg-title">Вакансии и контакты</h1>
        <p className="prg-lead">Стажировки и junior-позиции от компаний-партнёров и выпускников лагеря. Открой вакансию, чтобы прочитать описание целиком и написать по контакту.</p>
      </div>

      {list && list.length > 0 && (
        <div className="vac-filters" role="tablist" aria-label="Категории">
          <button type="button" className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>Все · {list.length}</button>
          {Object.entries(VACANCY_CATEGORIES).filter(([key]) => present.has(key)).map(([key, c]) => (
            <button key={key} type="button" className={filter === key ? 'is-active' : ''} onClick={() => setFilter(key)}>{c.label}</button>
          ))}
        </div>
      )}

      {error && <div className="prg-empty">{error}</div>}
      {!list && !error && <p className="prg-loading">Загружаем вакансии…</p>}
      {list && !list.length && <div className="prg-empty">Вакансий пока нет — загляни позже.</div>}

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
