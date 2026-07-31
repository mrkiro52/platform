import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

const NAV_ITEMS = [
  { path: '/dashboard',     label: 'Дэшборд' },
  { path: '/wall',          label: 'Стена' },
  { path: '/people',        label: 'Участники' },
  { path: '/messages',      label: 'Сообщения', badge: 'messages' },
  { path: '/notifications', label: 'Уведомления', badge: 'notifications' },
  { path: '/schedule',      label: 'Расписание' },
  { path: '/library',       label: 'Библиотека знаний' },
  { path: '/trainings',     label: 'Тренировки' },
  { path: '/links',         label: 'Полезные ссылки' },
  { path: '/likebezy',      label: 'Полные ликбезы' },
  { path: '/antireels',     label: 'AntiReels' },
  { path: '/profile',       label: 'Профиль' },
]

function Badge({ count }) {
  if (!count) return null
  return (
    <span style={{
      marginLeft: 'auto', background: 'var(--accent-lime)', color: '#fff',
      fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 0, flexShrink: 0,
    }}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

export default function Sidebar({ user, avatarUrl, onLogout, onClose, badges = {} }) {
  const [confirmLogout, setConfirmLogout] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const initials = getInitials(user?.name || '')

  const handleNav = (path) => {
    navigate(path)
    onClose()
  }

  const isActive = (path) => {
    if (path === '/library') return location.pathname.startsWith('/library')
    if (path === '/likebezy') return location.pathname.startsWith('/likebezy')
    if (path === '/trainings') return location.pathname.startsWith('/trainings')
    if (path === '/messages') return location.pathname.startsWith('/messages')
    if (path === '/people') return location.pathname.startsWith('/people') || location.pathname.startsWith('/u/')
    return location.pathname === path
  }

  return (
    <>
      <div className="sidebar-header">
        <a className="sidebar-logo" href="#">
          <span className="sidebar-logo-platform" style={{color: '#20beff', fontWeight: 600, fontSize: 15, textTransform: 'uppercase'}}>kiro platform</span>
        </a>
        <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
      </div>

      <div className="sidebar-user" style={{ cursor: 'pointer' }} onClick={() => handleNav('/profile')}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt="Аватар"
            className="sidebar-avatar"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div className="sidebar-avatar">{initials}</div>
        )}
        <div className="sidebar-user-name">{user?.name || '—'}</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.path}
            className={`nav-item${isActive(item.path) ? ' active' : ''}`}
            onClick={() => handleNav(item.path)}
            style={item.badge ? { display: 'flex', alignItems: 'center', gap: 8 } : undefined}
          >
            {item.label}
            {item.badge && <Badge count={badges[item.badge]} />}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        {confirmLogout ? (
          <div className="logout-confirm">
            <div className="logout-confirm-text">Выйти из аккаунта?</div>
            <div className="logout-confirm-btns">
              <button className="logout-btn-yes" onClick={onLogout}>Выйти</button>
              <button className="logout-btn-no" onClick={() => setConfirmLogout(false)}>Отменить</button>
            </div>
          </div>
        ) : (
          <button className="nav-item nav-item--logout" onClick={() => setConfirmLogout(true)}>
            Выйти
          </button>
        )}
      </div>
    </>
  )
}
