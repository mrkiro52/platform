import { useNavigate } from 'react-router-dom'
import { recentPages } from '../../lib/recent'

// «Продолжить»: последние открытые материалы. Пока ничего не открывали,
// блока нет.

export default function ContinueStrip() {
  const navigate = useNavigate()
  const recent = recentPages().slice(0, 4)
  if (!recent.length) return null

  return (
    <div className="dsh-continue">
      <div className="dsh-section-label">Продолжить с того места</div>
      <div className="dsh-continue-row">
        {recent.map(item => (
          <button key={item.path} type="button" className="dsh-continue-card" onClick={() => navigate(item.path)}>
            <span className="dsh-continue-kind">{item.kind}</span>
            <span className="dsh-continue-title">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
