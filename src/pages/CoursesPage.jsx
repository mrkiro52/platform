import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  COURSES, COURSE_PRICE, MANAGER_URL, canSeeCourses, canOpenLesson, courseBySlug, hasFullAccess,
  loadProgress, priceFor, rub, savingFor,
} from '../data/courses'
import CourseLessonPage from './CourseLessonPage'

// Раздел «Курсы»: витрина трёх мини-курсов и покупка.
// /courses — карточки и комплекты, /courses/:slug — страница курса,
// /courses/:slug/:lessonId — урок (CourseLessonPage).
// Покупка ведёт к комплекту: после «Купить» предлагаем добавить курсы со скидкой,
// комплект из трёх выбран по умолчанию и подписан как самый выгодный.
// Онлайн-оплаты пока нет — заказ оформляется через менеджера.

const FULL3 = COURSE_PRICE * 3

function CampCredit({ amount, compact }) {
  return (
    <div className={`cs-credit${compact ? ' is-compact' : ''}`}>
      <span className="cs-credit-icon" aria-hidden="true">🎟</span>
      <div>
        <b>Деньги за курсы идут в зачёт Лагеря.</b>{' '}
        {amount
          ? <>Купишь на {rub(amount)} — участие в онлайн IT-лагере KIRO IT CAMP станет дешевле на {rub(amount)}.</>
          : <>Сколько потратишь на курсы — такой будет твоя скидка на участие в онлайн IT-лагере KIRO IT CAMP.</>}
      </div>
    </div>
  )
}

// Вариант комплекта: блок-переключатель. Не <button>, потому что внутри
// варианта «+ ещё один» есть свои кнопки выбора второго курса
function Option({ on, onSelect, className = '', children }) {
  return (
    <div
      role="radio"
      aria-checked={on}
      tabIndex={0}
      className={`cs-option ${className}${on ? ' is-on' : ''}`}
      onClick={onSelect}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect() } }}
    >
      {children}
    </div>
  )
}

function Modal({ title, onClose, children }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <div className="dt-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="dt-modal is-wide cs-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="dt-modal-head">
          <h2 className="dt-modal-title">{title}</h2>
          <button type="button" className="dt-modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

// Покупка: выбор комплекта → оформление. initial — курс, с которого начали,
// или 'all', если сразу нажали «Купить комплект»
function Checkout({ initial, onClose }) {
  const first = initial === 'all' ? COURSES[0] : courseBySlug(initial)
  const others = COURSES.filter(c => c.slug !== first.slug)
  const [option, setOption] = useState('three')
  const [second, setSecond] = useState(others[0].slug)
  const [step, setStep] = useState('pick')
  const [copied, setCopied] = useState(false)

  const picked = option === 'one' ? [first]
    : option === 'two' ? [first, courseBySlug(second)]
      : COURSES
  const count = picked.length
  const price = priceFor(count)
  const saving = savingFor(count)

  const orderText = `Здравствуйте! Хочу купить на KIRO PLATFORM: ${picked.map(c => `«${c.title}»`).join(', ')} — ${rub(price)}.`

  const copy = async () => {
    try { await navigator.clipboard.writeText(orderText) } catch { /* без буфера обмена */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (step === 'done') {
    return (
      <Modal title="Оформление заказа" onClose={onClose}>
        <div className="cs-checkout">
          <ul className="cs-summary">
            {picked.map(c => (
              <li key={c.slug}><span className="cs-dot" style={{ '--c': c.accent }} />{c.title}</li>
            ))}
          </ul>
          <div className="cs-total">
            <span>Итого</span>
            <span className="cs-total-price">
              {saving > 0 && <s>{rub(count * COURSE_PRICE)}</s>}
              <b>{rub(price)}</b>
            </span>
          </div>
          {saving > 0 && <div className="cs-total-save">Твоя выгода — {rub(saving)}</div>}
          <CampCredit amount={price} compact />
          <p className="cs-note">Онлайн-оплата скоро появится прямо на платформе. Сейчас заказ оформляет менеджер: напиши ему — он пришлёт ссылку на оплату и откроет доступ.</p>
          <div className="cs-actions">
            <button type="button" className="btn-ghost" onClick={copy}>{copied ? '✓ Текст заказа скопирован' : 'Скопировать текст заказа'}</button>
            <a className="btn-primary" href={MANAGER_URL} target="_blank" rel="noopener noreferrer">Написать менеджеру</a>
          </div>
        </div>
      </Modal>
    )
  }

  return (
    <Modal title={initial === 'all' ? 'Выбери комплект' : 'Добавь курсы — и сэкономь'} onClose={onClose}>
      <div className="cs-checkout">
        <div className="cs-options" role="radiogroup" aria-label="Комплект">
          <Option on={option === 'three'} onSelect={() => setOption('three')} className="is-best">
            <span className="cs-option-flag">Самый выгодный</span>
            <span className="cs-option-head">
              <span className="cs-radio" aria-hidden="true" />
              <span className="cs-option-title">Все 3 курса</span>
              <span className="cs-option-price"><s>{rub(FULL3)}</s><b>{rub(priceFor(3))}</b></span>
            </span>
            <span className="cs-option-sub">Python → Математика → Алгоритмы: полный путь до первого собеседования. Всего {rub(Math.round(priceFor(3) / 3))} за курс.</span>
            <span className="cs-save">Выгода {rub(savingFor(3))}</span>
          </Option>

          <Option on={option === 'two'} onSelect={() => setOption('two')}>
            <span className="cs-option-head">
              <span className="cs-radio" aria-hidden="true" />
              <span className="cs-option-title">«{first.short}» + ещё один</span>
              <span className="cs-option-price"><s>{rub(COURSE_PRICE * 2)}</s><b>{rub(priceFor(2))}</b></span>
            </span>
            <span className="cs-chips" onClick={e => e.stopPropagation()} onKeyDown={e => e.stopPropagation()}>
              {others.map(c => (
                <button
                  key={c.slug}
                  type="button"
                  aria-pressed={second === c.slug}
                  className={`cs-chip${second === c.slug ? ' is-on' : ''}`}
                  onClick={() => { setSecond(c.slug); setOption('two') }}
                >+ {c.short}</button>
              ))}
            </span>
            <span className="cs-save">Выгода {rub(savingFor(2))}</span>
          </Option>

          <Option on={option === 'one'} onSelect={() => setOption('one')} className="is-plain">
            <span className="cs-option-head">
              <span className="cs-radio" aria-hidden="true" />
              <span className="cs-option-title">Только «{first.short}»</span>
              <span className="cs-option-price"><b>{rub(COURSE_PRICE)}</b></span>
            </span>
          </Option>
        </div>

        {option === 'one' && (
          <div className="cs-nudge">Ещё {rub(priceFor(3) - COURSE_PRICE)} — и у тебя все три курса. Это на {rub(savingFor(3))} дешевле, чем покупать их по одному.</div>
        )}

        <CampCredit amount={price} compact />

        <button type="button" className="btn-primary cs-go" onClick={() => setStep('done')}>
          Продолжить — {rub(price)}
        </button>
      </div>
    </Modal>
  )
}

function Bundles({ onBuy }) {
  return (
    <section className="cs-bundles" aria-label="Комплекты">
      <div className="cs-bundle">
        <div className="cs-bundle-name">1 курс</div>
        <div className="cs-bundle-price">{rub(priceFor(1))}</div>
        <div className="cs-bundle-sub">любой на выбор</div>
      </div>
      <div className="cs-bundle">
        <div className="cs-bundle-name">2 курса</div>
        <div className="cs-bundle-price">{rub(priceFor(2))}</div>
        <div className="cs-bundle-sub"><s>{rub(COURSE_PRICE * 2)}</s> · выгода {rub(savingFor(2))}</div>
      </div>
      <div className="cs-bundle is-best">
        <span className="cs-bundle-flag">Выгоднее всего</span>
        <div className="cs-bundle-name">Все 3 курса</div>
        <div className="cs-bundle-price">{rub(priceFor(3))}</div>
        <div className="cs-bundle-sub"><s>{rub(FULL3)}</s> · выгода {rub(savingFor(3))}</div>
        <button type="button" className="btn-primary cs-bundle-btn" onClick={() => onBuy('all')}>Купить комплект</button>
      </div>
    </section>
  )
}

function CourseCard({ c, onBuy }) {
  const navigate = useNavigate()
  return (
    <article className="cs-card" style={{ '--c': c.accent }}>
      <div className="cs-card-top">
        <span className="cs-icon">{c.icon}</span>
        <span className="cs-free">Модуль 1 бесплатно</span>
      </div>
      <h2 className="cs-card-title">{c.title}</h2>
      <p className="cs-card-tagline">{c.tagline}</p>
      <ul className="cs-card-meta">
        {c.duration && <li>{c.duration}</li>}
        <li>{c.lesson.join(' · ')}</li>
        {c.finalProject && <li>Финальный проект</li>}
      </ul>
      <div className="cs-card-foot">
        <div className="cs-card-price">
          <b>{rub(COURSE_PRICE)}</b>
          <span>или от {rub(Math.round(priceFor(3) / 3))} в комплекте</span>
        </div>
        <div className="cs-card-actions">
          <button type="button" className="btn-primary" onClick={() => onBuy(c.slug)}>Купить</button>
          <button type="button" className="btn-ghost" onClick={() => navigate(`/courses/${c.slug}`)}>Попробовать бесплатно</button>
        </div>
      </div>
    </article>
  )
}

function CoursesList({ onBuy }) {
  return (
    <section className="page active cs-page">
      <div className="cs-hero">
        <span className="dt-tag">Мини-курсы KIRO</span>
        <h1 className="cs-title">Курсы</h1>
        <p className="cs-lead">Три коротких курса — выжимка того, что нужно для старта в IT. У каждого курса первый модуль открыт бесплатно: видеоурок, теория и задачи. Попробуй формат до покупки.</p>
        <CampCredit />
      </div>

      <Bundles onBuy={onBuy} />

      <div className="cs-grid">
        {COURSES.map(c => <CourseCard key={c.slug} c={c} onBuy={onBuy} />)}
      </div>
    </section>
  )
}

// Программа курса с уроками: доступные — ссылками, закрытые — с замком
function Program({ c, user }) {
  const progress = loadProgress(user)
  return c.weeks.map(w => (
    <div key={w.week} className="cs-week">
      <div className="cs-week-head">
        <span className="cs-module-num">Неделя {w.week}</span>
        <span className="cs-week-title">{w.title}</span>
      </div>
      <ol className="cs-lessons">
        {w.lessons.map(l => {
          const open = canOpenLesson(user, c, l)
          const solved = [1, 2, 3, 4, 5].filter(n => progress[`${l.id}t${n}`]).length
          const body = (
            <>
              <span className="cs-lesson-day">{l.day}</span>
              <span className="cs-lesson-title">{l.title}</span>
              <span className="cs-lesson-meta">
                {l.free && <span className="cs-lesson-free">Бесплатно</span>}
                {open
                  ? <span className={`cs-lesson-progress${solved === 5 ? ' is-done' : ''}`}>{solved}/5</span>
                  : <span className="cs-lesson-lock" aria-label="Откроется после покупки">🔒</span>}
              </span>
            </>
          )
          return (
            <li key={l.id}>
              {open
                ? <Link className="cs-lesson" to={`/courses/${c.slug}/${l.id}`}>{body}</Link>
                : <span className="cs-lesson is-locked">{body}</span>}
            </li>
          )
        })}
      </ol>
    </div>
  )).concat(c.finalProject ? [(
    <div key="final" className="cs-module is-locked">
      <div className="cs-module-head">
        <span className="cs-module-num">Финал</span>
        <span className="cs-module-badge is-lock">Скоро</span>
      </div>
      <div className="cs-module-title">Финальный проект</div>
    </div>
  )] : [])
}

function CourseDetail({ c, user, onBuy }) {
  const owned = hasFullAccess(user, c.slug)
  const firstLesson = c.weeks?.[0]?.lessons?.[0]
  useEffect(() => { window.scrollTo(0, 0) }, [c.slug])
  return (
    <section className="page active cs-page" style={{ '--c': c.accent }}>
      <Link className="prg-back" to="/courses">← Все курсы</Link>
      <div className={`cs-detail${owned ? ' is-owned' : ''}`}>
        <div className="cs-detail-main">
          <div className="cs-hero cs-hero--course">
            <span className="cs-icon cs-icon--lg">{c.icon}</span>
            <h1 className="cs-title">{c.title}</h1>
            <p className="cs-lead">{c.tagline}</p>
            <div className="cs-tags">
              {c.duration && <span>{c.duration}</span>}
              <span className="is-free">Модуль 1 бесплатно</span>
              {c.finalProject && <span>Финальный проект</span>}
            </div>
            {firstLesson
              ? <Link className="btn-primary cs-start" to={`/courses/${c.slug}/${firstLesson.id}`}>{owned ? 'Начать обучение' : 'Начать бесплатно'}</Link>
              : <a className="btn-primary cs-start" href="#free">Начать бесплатно</a>}
            {owned && <span className="cs-owned">✓ Курс открыт полностью</span>}
          </div>

          <div className="cs-block">
            <h2>Для кого</h2>
            <ul>{c.audience.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </div>
          <div className="cs-block">
            <h2>Чему научишься</h2>
            <p>{c.outcome}</p>
          </div>
          <div className="cs-block">
            <h2>Как устроен курс</h2>
            <ul>{c.format.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </div>

          <div className="cs-block" id="free">
            <h2>Программа</h2>
            {c.weeks ? <Program c={c} user={user} /> : (<>
            <div className="cs-module is-free">
              <div className="cs-module-head">
                <span className="cs-module-num">Модуль 1</span>
                <span className="cs-module-badge">Бесплатно</span>
              </div>
              <div className="cs-module-title">Тема модуля появится скоро</div>
              <div className="cs-lesson">
                {c.lesson.map(part => (
                  <div key={part} className="cs-lesson-part">
                    <span>{part}</span>
                    <small>скоро</small>
                  </div>
                ))}
              </div>
              <p className="cs-module-note">Открыто без оплаты: {c.free.toLowerCase()}.</p>
            </div>
            <div className="cs-module is-locked">
              <div className="cs-module-head">
                <span className="cs-module-num">Следующие модули</span>
                <span className="cs-module-badge is-lock">🔒 После покупки</span>
              </div>
              <div className="cs-module-title">Программа курса появится скоро</div>
            </div>
            {c.finalProject && (
              <div className="cs-module is-locked">
                <div className="cs-module-head">
                  <span className="cs-module-num">Финал</span>
                  <span className="cs-module-badge is-lock">🔒 После покупки</span>
                </div>
                <div className="cs-module-title">Финальный проект</div>
              </div>
            )}
            </>)}
          </div>
        </div>

        {!owned && <aside className="cs-buy">
          <div className="cs-buy-price">{rub(COURSE_PRICE)}</div>
          <div className="cs-buy-sub">за курс «{c.short}»</div>
          <button type="button" className="btn-primary cs-go" onClick={() => onBuy(c.slug)}>Купить курс</button>
          <div className="cs-buy-bundles">
            <div><span>2 курса</span><b>{rub(priceFor(2))}</b><em>−{rub(savingFor(2))}</em></div>
            <div className="is-best"><span>Все 3 курса</span><b>{rub(priceFor(3))}</b><em>−{rub(savingFor(3))}</em></div>
          </div>
          <button type="button" className="cs-buy-all" onClick={() => onBuy('all')}>Взять все 3 со скидкой {rub(savingFor(3))} →</button>
          <CampCredit compact />
        </aside>}
      </div>
    </section>
  )
}

export default function CoursesPage({ user }) {
  const { slug, lessonId } = useParams()
  const [buying, setBuying] = useState(null)

  if (!canSeeCourses(user)) return <Navigate to="/dashboard" replace />

  const course = slug ? courseBySlug(slug) : null
  if (slug && !course) return <Navigate to="/courses" replace />
  const lessonExists = lessonId && course?.weeks?.some(w => w.lessons.some(l => l.id === lessonId))
  if (lessonId && !lessonExists) return <Navigate to={`/courses/${slug}`} replace />

  return (
    <>
      {course && lessonId && course.weeks
        ? <CourseLessonPage course={course} lessonId={lessonId} user={user} onBuy={setBuying} />
        : course ? <CourseDetail c={course} user={user} onBuy={setBuying} /> : <CoursesList onBuy={setBuying} />}
      {buying && <Checkout key={buying} initial={buying} onClose={() => setBuying(null)} />}
    </>
  )
}
