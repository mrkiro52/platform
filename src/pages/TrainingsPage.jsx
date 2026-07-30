import { useNavigate, useParams } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const AlgorithmComplexityTraining = lazy(() => import('./trainings/AlgorithmComplexityTraining'))

const TRAININGS = [
  {
    id: 'algorithm-complexity',
    title: 'Сложность алгоритмов',
    subtitle: 'Смотри на код и угадывай его временную сложность — от O(1) до O(2^n)',
    tag: 'Алгоритмы',
    questions: 20,
    component: AlgorithmComplexityTraining,
  },
]

const cardStyle = {
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: 0,
  padding: 'clamp(16px, 3vw, 24px)',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
}

export default function TrainingsPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (id) {
    const item = TRAININGS.find(t => t.id === id)
    if (item) {
      const Component = item.component
      return (
        <Suspense fallback={<p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>Загрузка...</p>}>
          <Component onBack={() => navigate('/trainings')} />
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
        {TRAININGS.map(t => (
          <div
            key={t.id}
            style={cardStyle}
            onClick={() => navigate(`/trainings/${t.id}`)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(32,190,255,0.4)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)' }}
          >
            <span style={{
              display: 'inline-block', background: 'rgba(32,190,255,0.1)', border: '1px solid rgba(32,190,255,0.25)',
              color: 'var(--accent-lime)', borderRadius: 0, padding: '3px 10px', fontSize: 11, fontWeight: 700,
              marginBottom: 12,
            }}>{t.tag}</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>{t.title}</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>{t.subtitle}</p>
            <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.questions} задач в пуле</span>
          </div>
        ))}
      </div>
    </section>
  )
}
