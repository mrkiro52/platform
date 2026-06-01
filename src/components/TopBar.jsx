const PAGE_TITLES = {
  dashboard:'Дэшборд', schedule:'Расписание', library:'Библиотека знаний',
  tasks:'Задания', links:'Полезные ссылки'
}

function getInitials(name) {
  return name.split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2)
}

export default function TopBar({ user, page, onMenuClick }) {
  const initials = user ? getInitials(user.name) : '??'
  return (
    <header className="top-bar">
      <button className="hamburger" onClick={onMenuClick}>
        <span /><span /><span />
      </button>
      <span className="top-bar-title">{PAGE_TITLES[page] || page}</span>
      <div className="top-bar-avatar">{initials}</div>
    </header>
  )
}
