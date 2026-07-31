import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Avatar, timeAgo } from '../components/social'

const TEXT = {
  follow:   'подписался(-ась) на тебя',
  reaction: 'отреагировал(а) на твой пост',
  comment:  'прокомментировал(а) твой пост',
  message:  'написал(а) тебе сообщение',
}

export default function NotificationsPage({ onRead }) {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.notifications()
      .then(data => { setItems(data); setLoading(false) })
      .catch(() => setLoading(false))
    // открыли страницу — значит уведомления просмотрены
    api.readNotifications().then(() => onRead?.()).catch(() => {})
  }, [onRead])

  const openTarget = (n) => {
    if (n.type === 'message' && n.actor) navigate(`/messages/${n.actor.id}`)
    else if (n.type === 'follow' && n.actor) navigate(`/u/${n.actor.id}`)
    else navigate('/wall')
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Уведомления</h1>
        <p className="page-subtitle">Реакции, комментарии, подписки и сообщения</p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : items.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>Уведомлений пока нет.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(n => (
            <div
              key={n.id}
              onClick={() => openTarget(n)}
              style={{
                display: 'flex', gap: 12, alignItems: 'center', padding: 13, cursor: 'pointer',
                border: '1px solid var(--border-color)', borderRadius: 0,
                background: n.readAt ? 'var(--bg-secondary)' : 'rgba(32,190,255,0.06)',
              }}
            >
              <Avatar name={n.actor?.name} avatarUrl={n.actor?.avatarUrl} size={38}
                userId={n.actor?.id} clickable />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>{n.actor?.name || 'Кто-то'}</span>
                  {' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{TEXT[n.type] || 'обновление'}</span>
                </div>
                {n.preview && (
                  <div style={{
                    fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2,
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {n.preview}
                  </div>
                )}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-tertiary)', flexShrink: 0 }}>
                {timeAgo(n.createdAt)}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
