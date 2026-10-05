import { useNavigate } from 'react-router-dom'
import { recentPages } from '../../lib/recent'

// «Продолжить»: последние открытые материалы. Пока ничего не открывали —
// подсказываем, с чего начать.

const STARTERS = [
  { path: '/likebezy', kind: 'Ликбезы', title: 'Python, SQL, Pandas, NumPy, ML' },
  { path: '/trainings', kind: 'Тренировки', title: 'SQL, Python, сложность алгоритмов' },
  { path: '/library', kind: 'Библиотека', title: 'Теория и вопросы по дням' },
]

export default function ContinueStrip() {
  const navigate = useNavigate()
  const recent = recentPages().slice(0, 4)
  const items = recent.length ? recent : STARTERS

  return (
    <div className="dsh-continue">
      <div className="dsh-section-label">{recent.length ? 'Продолжить с того места' : 'С чего начать'}</div>
      <div className="dsh-continue-row">
        {items.map(item => (
          <button key={item.path} type="button" className="dsh-continue-card" onClick={() => navigate(item.path)}>
            <span className="dsh-continue-kind">{item.kind}</span>
            <span className="dsh-continue-title">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
