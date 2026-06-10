import { useState, useEffect } from 'react'
import { api } from '../api'
import { SkeletonNewsCard } from '../components/Skeleton'

export default function AnnouncementsPage({ onBack }) {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500

    api.announcements()
      .then(setAnnouncements)
      .catch(() => {})
      .finally(() => {
        const elapsed = Date.now() - startTime
        const remaining = Math.max(0, minLoadTime - elapsed)
        setTimeout(() => setLoading(false), remaining)
      })
  }, [])

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Новости и обновления</h1>
        <p className="page-subtitle">Все объявления</p>
      </div>

      <div className="widget">
        {loading
          ? [1, 2, 3].map(i => <SkeletonNewsCard key={i} />)
          : announcements.length === 0
          ? <p style={{ color:'var(--text-tertiary)', fontSize:13, padding:'4px 0' }}>Объявлений пока нет</p>
          : announcements.map((n, i) => (
            <div key={n.id} className="news-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <div className="news-card-head">
                <span className="news-card-title">{n.icon || '📢'} {n.title}</span>
                <span className="news-card-date">{n.published_at}</span>
              </div>
              <div className="news-card-text">{n.text}</div>
            </div>
          ))
        }
      </div>

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          ← Вернуться на дэшборд
        </button>
      </div>
    </section>
  )
}
