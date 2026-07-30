import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Дэшборд' },
  { path: '/schedule',  label: 'Расписание' },
  { path: '/library',   label: 'Библиотека знаний' },
  { path: '/trainings', label: 'Тренировки' },
  { path: '/wall',      label: 'Стена' },
  { path: '/links',     label: 'Полезные ссылки' },
  { path: '/likebezy',  label: 'Полные ликбезы' },
  { path: '/antireels', label: 'AntiReels' },
  { path: '/profile',   label: 'Профиль' },
]

export default function Sidebar({ user, avatarUrl, onLogout, onClose }) {
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
          >
            {item.label}
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
