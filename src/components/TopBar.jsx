import { useLocation } from 'react-router-dom'

const PATH_TITLES = {
  '/dashboard': 'Дэшборд',
  '/schedule':  'Расписание',
  '/library':   'Библиотека знаний',
  '/links':     'Полезные ссылки',
  '/likebezy':  'Полные ликбезы',
  '/announcements': 'Объявления',
  '/wall':      'Стена',
  '/messages':  'Сообщения',
  '/notifications': 'Уведомления',
  '/profile':   'Профиль',
}

function getInitials(name) {
  return name.split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2)
}

function getTitle(pathname) {
  if (pathname.startsWith('/library/theory'))    return 'Теория'
  if (pathname.startsWith('/library/questions')) return 'Тренировка'
  if (pathname.startsWith('/library/homework'))  return 'Домашнее задание'
  if (pathname.startsWith('/library'))           return 'Библиотека знаний'
  if (pathname.startsWith('/likebezy'))          return 'Полные ликбезы'
  if (pathname.startsWith('/messages'))          return 'Сообщения'
  if (pathname.startsWith('/u/'))                return 'Профиль участника'
  return PATH_TITLES[pathname] || ''
}

export default function TopBar({ user, onMenuClick }) {
  const location = useLocation()
  const initials = user ? getInitials(user.name) : '??'
  const title = getTitle(location.pathname)

  return (
    <header className="top-bar">
      <button className="hamburger" onClick={onMenuClick}>
        <span /><span /><span />
      </button>
      <span className="top-bar-title">{title}</span>
      <div className="top-bar-avatar">{initials}</div>
    </header>
  )
}
