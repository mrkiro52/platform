import { useNavigate, useParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const AlgorithmComplexityTraining = lazy(() => import('./trainings/AlgorithmComplexityTraining'))
const PythonOutputTraining = lazy(() => import('./trainings/PythonOutputTraining'))
const SqlTraining = lazy(() => import('./trainings/SqlTraining'))
const PythonTraining = lazy(() => import('./trainings/PythonTraining'))

const TRAININGS = [
  {
    id: 'algorithm-complexity',
    title: 'Сложность алгоритмов',
    subtitle: 'Смотри на код и угадывай его временную сложность',
    tag: 'Общее',
    questions: 20,
    component: AlgorithmComplexityTraining,
  },
  {
    id: 'python-output',
    title: 'Что выведет? (Python)',
    subtitle: 'Неочевидные примеры на Python — впиши, что именно выведет код',
    tag: 'Общее',
    questions: 20,
    component: PythonOutputTraining,
  },
  {
    id: 'python',
    title: 'Python-тренажёр',
    subtitle: '105 задач с автопроверкой, от первой программы до асинхронности',
    tag: 'kirocamp only',
    component: PythonTraining,
  },
  {
    id: 'sql',
    title: 'SQL-тренажёр',
    subtitle: 'Пиши настоящие SQL-запросы к живой базе маркетплейса — 90 задач в 9 темах, от SELECT до оконных функций',
    tag: 'kirocamp only',
    questions: 90,
    component: SqlTraining,
  },
]

const cardStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: 12,
  padding: 'clamp(16px, 3vw, 24px)',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
}

export default function TrainingsPage({ user }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const canOpenPython = Boolean(user?.isAutumnCamp2026 || user?.isWinterCamp2027)

  if (id) {
    const item = TRAININGS.find(t => t.id === id)
    if (item && (id !== 'python' || canOpenPython)) {
      const Component = item.component
      return (
        <Suspense fallback={<p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>Загрузка...</p>}>
          <Component key={user?.id} user={user} onBack={() => navigate('/trainings')} />
        </Suspense>
      )
    }
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Тренировки</h1>
        <p className="page-subtitle">Прокачивай конкретные навыки короткими сессиями с мгновенной проверкой</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
        {TRAININGS.map(t => {
          const isPython = t.id === 'python'
          const locked = isPython && !canOpenPython
          const Card = isPython ? 'button' : 'div'
          const Title = isPython ? 'span' : 'h2'
          const Description = isPython ? 'span' : 'p'
          return (
            <Card
              {...(isPython ? { type: 'button', disabled: locked, className: 'trainer-choice' } : {})}
              key={t.id}
              style={cardStyle}
              onClick={() => navigate(`/trainings/${t.id}`)}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,214,10,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
            >
              <span style={{
                alignSelf: 'flex-start', background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.25)',
                color: 'var(--accent-lime)', borderRadius: 12, padding: '3px 10px', fontSize: 11, fontWeight: 700,
                marginBottom: 12,
              }}>{t.tag}</span>
              <Title style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{t.title}</Title>
              <Description style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{t.subtitle}</Description>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
