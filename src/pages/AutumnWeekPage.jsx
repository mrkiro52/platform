import { useParams, useNavigate } from 'react-router-dom'
import { findAutumnWeek } from '../data/autumnWeeks'
import LevelTest from '../components/LevelTest'

export default function AutumnWeekPage({ user }) {
  const { week: slug } = useParams()
  const navigate = useNavigate()
  const week = findAutumnWeek(slug)

  if (!week) {
    return (
      <section className="page active">
        <div className="page-header"><h1 className="page-title">Неделя не найдена</h1></div>
        <button className="autumn-toggle-btn" onClick={() => navigate('/autumn-camp')}>
          К лагерю
        </button>
      </section>
    )
  }

  return (
    <section className="page active">
      <button
        onClick={() => navigate('/autumn-camp')}
        style={{
          background: 'transparent', border: 'none', color: '#FFB870', cursor: 'pointer',
          fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--font-syne)', padding: 0, marginBottom: 14,
        }}
      >
        ← Autumn Camp
      </button>

      <div className="page-header">
        <h1 className="page-title">Неделя {week.indexInMonth}</h1>
        <p className="page-subtitle">{week.rangeText}</p>
      </div>

      {week.number === 1 ? (
        <LevelTest participant={user?.nickname || user?.name} />
      ) : (
        <div className="widget">
          <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Материалы этой недели скоро появятся здесь — конспекты, видео, тесты и домашнее задание.
          </p>
        </div>
      )}
    </section>
  )
}
