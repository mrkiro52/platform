import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AUTUMN_WEEK_MONTHS, currentAutumnWeek, shortRange } from '../data/autumnWeeks'
import CallBooking from '../components/CallBooking'
import HomeworkPicker from '../components/HomeworkPicker'
import HomeworkReview from '../components/HomeworkReview'
import { AUTUMN_MONTHS, CALL_MONTHS } from '../data/autumnCalls'
import { MATH_SESSIONS, nextMathSession, dayOf } from '../data/mathCourse'

// Даты созвонов мини-курса кружками. Ближайший выделен, прошедшие и будущие —
// приглушённые.
function MathDates() {
  const next = nextMathSession()

  return (
    <div className="math-dates">
      {MATH_SESSIONS.map(session => (
        <span
          key={session.date}
          className={`math-date${next && session.date === next.date ? ' is-next' : ''}`}
          title={session.topic}
        >
          {dayOf(session.date)}
        </span>
      ))}
    </div>
  )
}

// Прогресс лагеря: месяц и полоска. Чисел нет — только доля прошедших дней,
// её же читают скринридеры через role="progressbar".
function AutumnProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div className="camp-progress">
      {AUTUMN_MONTHS.map(m => {
        let done = 0
        for (let i = 0; i < m.total; i++) {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          if (d <= today) done++
        }
        const pct = Math.round((done / m.total) * 100)
        return (
          <div key={m.label} className="camp-progress-row">
            <span className="camp-progress-month">{m.label}</span>
            <div
              className="camp-progress-bar"
              role="progressbar"
              aria-label={`${m.label}: прошло ${done} из ${m.total} дней`}
              aria-valuemin={0}
              aria-valuemax={m.total}
              aria-valuenow={done}
            >
              <div className="camp-progress-fill" style={{ width: `${pct}%` }} />
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GroupCalls() {
  // Месяц выбирается табом — показываем созвоны только выбранного,
  // иначе в узкой колонке получается очень длинная лента.
  const [month, setMonth] = useState(CALL_MONTHS[0].label)

  return (
    <div>
      <div className="calls-tabs">
        {CALL_MONTHS.map(m => (
          <button
            key={m.label}
            type="button"
            className={`calls-tab${month === m.label ? ' is-active' : ''}`}
            onClick={() => setMonth(m.label)}
          >
            {m.label}
          </button>
        ))}
      </div>

      {CALL_MONTHS.filter(m => m.label === month).map(m => (
        <div key={m.label}>
          <div className="calls-grid">
            {m.calls.map(call => (
              <div key={call.day} className="call-card">
                <div className="call-card-date">
                  <span className="call-card-day">{call.day}</span>
                  <span className="call-card-month">{m.label.toLowerCase()}</span>
                </div>
                <div className="call-card-body">
                  <div className="call-card-title">Групповой созвон</div>
                  <div className="call-card-topic">Тема: {call.topic || 'будет скоро'}</div>
                  {(call.videos || []).map((video, i, all) => {
                    // Запись — либо просто ссылка, либо ссылка со своей подписью
                    const url = typeof video === 'string' ? video : video.url
                    const label = typeof video === 'string'
                      ? (all.length > 1 ? `Запись — часть ${i + 1}` : 'Запись созвона')
                      : video.label
                    return (
                      <a key={url} href={url} target="_blank" rel="noopener" className="call-card-video">
                        {label} →
                      </a>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function WeekMaterials({ onOpenWeek, currentSlug }) {
  return (
    <div className="wk-grid">
      {AUTUMN_WEEK_MONTHS.map(month => (
        <div key={month.label} className="wk-month">
          <div className="wk-month-label">{month.label}</div>
          <div className="wk-list">
            {month.weeks.map(w => {
              const isCurrent = w.slug === currentSlug
              return (
                <button
                  key={w.slug}
                  type="button"
                  className={`wk${isCurrent ? ' is-current' : ''}`}
                  onClick={() => onOpenWeek(w.slug)}
                  aria-label={`Неделя ${w.indexInMonth}, ${w.rangeText}${isCurrent ? ', идёт сейчас' : ''}`}
                >
                  <span className="wk-name"><span className="wk-word">Неделя </span>{w.indexInMonth}</span>
                  <span className="wk-range">
                    <span className="wk-range-full">{w.rangeText}</span>
                    <span className="wk-range-short">{shortRange(w)}</span>
                  </span>
                  {isCurrent && <span className="wk-now">Сейчас</span>}
                  <span className="wk-arrow" aria-hidden="true">→</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// Секция страницы: заголовок (с кнопкой справа, если есть) и карточка.
// slot задаёт место секции: на пк — в какой колонке, на планшете и телефоне —
// порядок в общей ленте.
function Block({ slot, title, action, children }) {
  return (
    <section className={`camp-block is-${slot}`}>
      <div className="camp-block-head">
        <h2 className="camp-block-title">{title}</h2>
        {action}
      </div>
      <div className="widget camp-card">{children}</div>
    </section>
  )
}

export default function AutumnCampPage() {
  const navigate = useNavigate()
  const currentSlug = currentAutumnWeek()?.slug || null

  return (
    <section className="page active camp-page">
      <div className="camp-heroes">
        <div className="autumn-hero is-dim">
          <div className="autumn-hero-left">
            <span className="autumn-hero-badge">🍂 Autumn Camp 2026</span>
            <span className="autumn-hero-title">Онбординг участника</span>
          </div>
          <button className="autumn-toggle-btn" onClick={() => navigate('/autumn-camp/onboarding-autumn-2026')}>
            Открыть
            <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
          </button>
        </div>

        <div className="autumn-hero">
          <div className="autumn-hero-left">
            <span className="autumn-hero-badge">🍂 Autumn Camp 2026</span>
            <span className="autumn-hero-title">Мини-курс: математика</span>
          </div>
          <div className="autumn-hero-right">
            <MathDates />
            <button className="autumn-toggle-btn" onClick={() => navigate('/autumn-camp/math')}>
              Открыть
              <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* На широком экране — две колонки: слева учёба (материалы, задания,
          проверка), справа календарь (прогресс, запись, созвоны). Уже —
          одна лента, порядок секций задаёт CSS. */}
      <div className="camp-layout">
        <div className="camp-main">
          <Block slot="materials" title="Материалы по неделям">
            <WeekMaterials onOpenWeek={slug => navigate(`/autumn-camp/${slug}`)} currentSlug={currentSlug} />
          </Block>

          <Block
            slot="homework"
            title="Домашние задания"
            action={(
              <a href="/autumn-camp/upload-homework" target="_blank" rel="noopener" className="hw-submit-btn">
                Сдать дз
              </a>
            )}
          >
            <HomeworkPicker />
          </Block>

          <Block slot="review" title="Проверка домашних заданий">
            <HomeworkReview />
          </Block>
        </div>

        <div className="camp-side">
          <Block slot="progress" title="Прогресс лагеря">
            <AutumnProgress />
          </Block>

          <Block slot="booking" title="Запись на созвон">
            <CallBooking />
          </Block>

          <Block slot="calls" title="Групповые созвоны">
            <GroupCalls />
          </Block>
        </div>
      </div>
    </section>
  )
}
