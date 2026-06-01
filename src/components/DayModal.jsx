import { useEffect } from 'react'

export default function DayModal({ day, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!day) return null

  return (
    <div className="modal-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <div className="modal-header">
          <div>
            <div className="modal-day-num">День {day.num ?? day.id} · {day.date}</div>
            <div className="modal-day-title">{day.title}</div>
          </div>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {(!day.mats?.length) ? (
            <p style={{ color:'var(--text-tertiary)' }}>Материалы появятся скоро.</p>
          ) : (
            <div className="mat-links">
              {day.mats.map((m, i) => (
                <a key={i} href={m.url} className="mat-link" target="_blank" rel="noopener">
                  <span className="mat-link-title">{m.title}</span>
                  <span className="mat-link-arrow">→</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
