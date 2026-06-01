import { useState } from 'react'

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

const NAV_ITEMS = [
  { page:'dashboard', label:'Дэшборд' },
  { page:'schedule',  label:'Расписание' },
  { page:'library',   label:'Библиотека знаний' },
  { page:'tasks',     label:'Задания' },
  { page:'links',     label:'Полезные ссылки' },
]

export default function Sidebar({ user, currentPage, onNavigate, onLogout, onClose }) {
  const [confirmLogout, setConfirmLogout] = useState(false)
  const initials = getInitials(user?.name || '')

  return (
    <>
      <div className="sidebar-header">
        <a className="sidebar-logo" href="#">
          <span className="sidebar-logo-kiro">KIRO</span>
          <span className="sidebar-logo-platform">CAMP</span>
        </a>
        <button className="sidebar-close-btn" onClick={onClose}>&times;</button>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-avatar">{initials}</div>
        <div className="sidebar-user-name">{user?.name || '—'}</div>
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <button
            key={item.page}
            className={`nav-item${currentPage === item.page ? ' active' : ''}`}
            onClick={() => onNavigate(item.page)}
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
