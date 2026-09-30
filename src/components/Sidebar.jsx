import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

const NAV_ITEMS = [
  { path: '/dashboard',     label: 'Дэшборд' },
  { path: '/wall',          label: 'Стена' },
  { path: '/messages',      label: 'Сообщения', badge: 'messages' },
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
      marginLeft: 'auto', background: 'var(--accent-lime)', color: 'var(--on-accent)',
      fontSize: 11, fontWeight: 700, padding: '1px 7px', borderRadius: 12, flexShrink: 0,
    }}>
      {count > 99 ? '99+' : count}
    </span>
  )
}

function BellIcon({ count, onClick }) {
  return (
    <button
      onClick={onClick}
      title="Уведомления"
      style={{
        position: 'relative', flexShrink: 0, width: 32, height: 32, border: 'none',
        background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none',
      }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
      {count > 0 && (
        <span style={{
          position: 'absolute', top: 2, right: 2, minWidth: 15, height: 15, padding: '0 3px',
          background: 'var(--accent-lime)', color: 'var(--on-accent)', fontSize: 9.5, fontWeight: 700,
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1.5px solid var(--bg-secondary)', lineHeight: 1,
        }}>
          {count > 9 ? '9+' : count}
        </span>
      )}
    </button>
  )
}

// Сворачивание работает только на компьютере: на телефоне сайдбар выезжает
// поверх страницы, и сохранённое «свёрнуто» там не должно прятать меню.
const DESKTOP = '(min-width: 769px)'
function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia(DESKTOP).matches)
  useEffect(() => {
    const mq = window.matchMedia(DESKTOP)
    const onChange = () => setDesktop(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return desktop
}

// Две галочки «‹‹». При свёрнутом сайдбаре та же иконка разворачивается
// на 180° и смотрит вправо — направление всегда показывает, что произойдёт.
function CollapseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 17l-5-5 5-5" />
      <path d="M18 17l-5-5 5-5" />
    </svg>
  )
}

export default function Sidebar({
  user, avatarUrl, onLogout, onClose, badges = {}, collapsed = false, onToggleCollapse,
}) {
  const [confirmLogout, setConfirmLogout] = useState(false)
  const isDesktop = useIsDesktop()
  const hidden = collapsed && isDesktop
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
    if (path === '/autumn-camp') return location.pathname.startsWith('/autumn-camp')
    return location.pathname === path
  }

  return (
    <>
      <div className="sidebar-header">
        <a className="sidebar-logo" href="#" tabIndex={hidden ? -1 : undefined} aria-hidden={hidden || undefined}>
          <span className="sidebar-logo-platform" style={{color: '#FFD60A', fontWeight: 600, fontSize: 15, textTransform: 'uppercase'}}>kiro platform</span>
        </a>
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
          title={collapsed ? 'Развернуть меню' : 'Свернуть меню'}
          aria-expanded={!collapsed}
          aria-controls="sidebar-body"
        >
          <CollapseIcon />
        </button>
        <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
      </div>

      {/* Всё, кроме шапки, при сворачивании прячется. inert убирает скрытые
          пункты из обхода с клавиатуры и от скринридеров. */}
      <div className="sidebar-body" id="sidebar-body" inert={hidden ? '' : undefined}>

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
        <div className="sidebar-user-name" style={{ flex: 1, minWidth: 0 }}>{user?.name || '—'}</div>
        <BellIcon count={badges.notifications} onClick={(e) => { e.stopPropagation(); handleNav('/notifications') }} />
      </div>

      <nav className="sidebar-nav">
        {user?.isAutumnCamp2026 && (
          <>
            <button
              className={`nav-item nav-item--autumn${isActive('/autumn-camp') ? ' active' : ''}`}
              onClick={() => handleNav('/autumn-camp')}
            >
              <span className="nav-icon">🍂</span>
              AUTUMN CAMP
            </button>
            <div className="nav-divider" />
          </>
        )}
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
      </div>
    </>
  )
}
