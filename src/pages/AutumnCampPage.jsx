import { useNavigate } from 'react-router-dom'
import { AUTUMN_WEEK_MONTHS, currentAutumnWeek } from '../data/autumnWeeks'
import CallBooking from '../components/CallBooking'
import HomeworkPicker from '../components/HomeworkPicker'
import { AUTUMN_MONTHS, CALL_MONTHS } from '../data/autumnCalls'

function AutumnProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {AUTUMN_MONTHS.map(m => {
        let done = 0
        const days = Array.from({ length: m.total }, (_, i) => {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          const isToday = d.getTime() === today.getTime()
          const isPast = d < today
          if (isToday || isPast) done++
          return { isToday, isPast }
        })
        const pct = Math.round((done / m.total) * 100)
        return (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flexShrink: 0, width: 84 }}>
              <div style={{
                fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {m.label}
              </div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 10.5, fontWeight: 700, color: '#FFB870', marginTop: 2 }}>
                {done}/{m.total} · {pct}%
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="autumn-days-grid">
                {days.map((d, i) => (
                  <div key={i} className={`autumn-day${d.isToday ? ' d-today' : d.isPast ? ' d-past' : ''}`} />
                ))}
              </div>
              <div className="autumn-bar-mobile">
                <div className="autumn-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GroupCalls() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {CALL_MONTHS.map(m => (
        <div key={m.label}>
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
          }}>
            {m.label}
          </div>
          <div className="calls-grid" style={{ '--calls-count': m.calls.length }}>
            {m.calls.map(call => (
              <div key={call.day} className="call-card">
                <div className="call-card-date">
                  <span className="call-card-day">{call.day}</span>
                  <span className="call-card-month">{m.label.toLowerCase()}</span>
                </div>
                <div className="call-card-body">
                  <div className="call-card-title">Групповой созвон</div>
                  <div className="call-card-topic">Тема: {call.topic || 'будет скоро'}</div>
                  {call.video && (
                    <a href={call.video} target="_blank" rel="noopener" className="call-card-video">
                      Запись созвона →
                    </a>
                  )}
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
    <div className="autumn-months-row">
      {AUTUMN_WEEK_MONTHS.map(month => (
        <div key={month.label}>
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
          }}>
            {month.label}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {month.weeks.map(w => {
              const isCurrent = w.slug === currentSlug
              return (
                <button
                  key={w.slug}
                  onClick={() => onOpenWeek(w.slug)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'var(--bg-tertiary)', padding: '12px 14px', cursor: 'pointer', textAlign: 'left',
                    borderRadius: 'var(--radius-md)',
                    border: isCurrent ? '1px solid rgba(255,140,66,0.55)' : '1px solid var(--border-color)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-syne)', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                      Неделя {w.indexInMonth}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{w.rangeText}</span>
                    {isCurrent && (
                      <span style={{
                        fontFamily: 'var(--font-syne)', fontSize: 10, fontWeight: 700, color: '#FFB870',
                        background: 'rgba(255,140,66,0.15)', border: '1px solid rgba(255,140,66,0.4)',
                        borderRadius: 'var(--radius-pill)', padding: '2px 8px', textTransform: 'uppercase',
                      }}>
                        Сейчас
                      </span>
                    )}
                  </span>
                  <span style={{ color: '#FFB870', fontSize: 16, lineHeight: 1, flexShrink: 0 }}>→</span>
                </button>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AutumnCampPage() {
  const navigate = useNavigate()
  const currentSlug = currentAutumnWeek()?.slug || null

  return (
    <section className="page active">
      <div className="autumn-hero">
        <div className="autumn-hero-left">
          <span className="autumn-hero-badge">🍂 Autumn Camp 2026</span>
          <span className="autumn-hero-title">Онбординг участника</span>
        </div>
        <button className="autumn-toggle-btn" onClick={() => navigate('/autumn-camp/onboarding-autumn-2026')}>
          Открыть
          <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
        </button>
      </div>

      <div className="autumn-half-row">
        <div>
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Прогресс лагеря
          </h2>
          <div className="widget">
            <AutumnProgress />
          </div>
        </div>

        <div>
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Групповые созвоны
          </h2>
          <div className="widget">
            <GroupCalls />
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Запись на созвон
      </h2>
      <div className="widget" style={{ marginBottom: 28 }}>
        <CallBooking />
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Домашние задания
      </h2>
      <div className="widget" style={{ marginBottom: 28 }}>
        <HomeworkPicker />
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Материалы по неделям
      </h2>
      <div className="widget">
        <WeekMaterials onOpenWeek={slug => navigate(`/autumn-camp/${slug}`)} currentSlug={currentSlug} />
      </div>
    </section>
  )
}
