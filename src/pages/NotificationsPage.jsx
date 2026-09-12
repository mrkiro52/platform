import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Avatar, timeAgo } from '../components/social'

const TEXT = {
  follow:   'подписался(-ась) на тебя',
  reaction: 'отреагировал(а) на твой пост',
  comment:  'прокомментировал(а) твой пост',
  message:  'написал(а) тебе сообщение',
  hw_approved: 'проверили твоё домашнее задание',
  hw_rework:   'вернули домашнее задание с правками',
}

// Проверку домашки делает команда лагеря, а не другой участник, — у таких
// уведомлений нет автора, поэтому подписываем их платформой.
const SYSTEM_TYPES = ['hw_approved', 'hw_rework']

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
    if (n.link) navigate(n.link)
    else if (n.type === 'message' && n.actor) navigate(`/messages/${n.actor.id}`)
    else if (n.type === 'follow' && n.actor) navigate(`/u/${n.actor.id}`)
    else navigate('/wall')
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Уведомления</h1>
        <p className="page-subtitle">Проверка домашних заданий, реакции, комментарии, подписки и сообщения</p>
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
                border: '1px solid var(--border-color)', borderRadius: 12,
                background: n.readAt ? 'var(--bg-secondary)' : 'rgba(255,214,10,0.06)',
              }}
            >
              {SYSTEM_TYPES.includes(n.type) ? (
                <span style={{
                  width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: n.type === 'hw_approved' ? 'rgba(63,185,80,0.15)' : 'rgba(255,214,10,0.14)',
                  border: `1px solid ${n.type === 'hw_approved' ? 'rgba(63,185,80,0.45)' : 'rgba(255,214,10,0.4)'}`,
                  fontSize: 16,
                }}>
                  {n.type === 'hw_approved' ? '✓' : '✎'}
                </span>
              ) : (
                <Avatar name={n.actor?.name} avatarUrl={n.actor?.avatarUrl} size={38}
                  userId={n.actor?.id} clickable />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, color: 'var(--text-primary)' }}>
                  <span style={{ fontWeight: 600 }}>
                    {SYSTEM_TYPES.includes(n.type) ? 'KIRO TEAM' : (n.actor?.name || 'Кто-то')}
                  </span>
                  {' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{TEXT[n.type] || 'обновление'}</span>
                </div>
                {n.preview && (
                  <div style={{
                    fontSize: 12, color: 'var(--text-tertiary)', marginTop: 2, lineHeight: 1.5,
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
