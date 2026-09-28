import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { findAutumnWeek } from '../data/autumnWeeks'
import LevelTest from '../components/LevelTest'
import WeekMaterials from '../components/WeekMaterials'
import { WEEK1_CHAPTERS, WEEK1_TITLE } from '../data/week1Materials'
import Week2Program from '../components/Week2Program'
import { WEEK3_CHAPTERS, WEEK3_TITLE, WEEK3_INTRO } from '../data/week3Materials'
import Week4Program from '../components/Week4Program'
import Week5Summary from '../components/Week5Summary'

export default function AutumnWeekPage({ user }) {
  const { week: slug } = useParams()
  const navigate = useNavigate()
  const week = findAutumnWeek(slug)

  // Переход со сводки 5-й недели: ?ch=<глава>, плюс ?level= и ?topic=
  const [params] = useSearchParams()
  const initialChapterId = params.get('ch')
  const initialLevel = Number(params.get('level')) || null
  const initialTopic = params.get('topic')

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
        <>
          <LevelTest participant={user?.nickname || user?.name} />
          <div style={{ marginTop: 28 }}>
            <WeekMaterials
              chapters={WEEK1_CHAPTERS}
              title={WEEK1_TITLE}
              storageKey="kiro_week1_visited"
              weekNumber={1}
              initialChapterId={initialChapterId}
            />
          </div>
        </>
      ) : week.number === 2 ? (
        <Week2Program initialLevel={initialLevel} initialChapterId={initialChapterId} />
      ) : week.number === 4 ? (
        <Week4Program initialTopic={initialTopic} initialChapterId={initialChapterId} />
      ) : week.number === 3 ? (
        <>
          <div className="widget" style={{ marginBottom: 16, border: '1px solid rgba(255,140,66,0.3)' }}>
            <div className="widget-header">
              <span className="widget-title">{WEEK3_INTRO.title}</span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              {WEEK3_INTRO.text}
            </p>
          </div>
          <WeekMaterials
            chapters={WEEK3_CHAPTERS}
            title={WEEK3_TITLE}
            storageKey="kiro_week3_visited"
            weekNumber={3}
            submitFormat="platform"
            initialChapterId={initialChapterId}
          />
        </>
      ) : week.number === 5 ? (
        <Week5Summary />
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
