import { useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

// SQLite CURRENT_TIMESTAMP отдаёт 'YYYY-MM-DD HH:MM:SS' в UTC
function parseDate(isoLike) {
  if (!isoLike) return null
  const d = new Date(String(isoLike).replace(' ', 'T') + 'Z')
  return isNaN(d.getTime()) ? null : d
}

export function formatDate(isoLike) {
  const d = parseDate(isoLike)
  if (!d) return isoLike || ''
  return d.toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

export function timeAgo(isoLike) {
  const d = parseDate(isoLike)
  if (!d) return ''
  const sec = Math.floor((Date.now() - d.getTime()) / 1000)
  if (sec < 60) return 'только что'
  if (sec < 3600) return `${Math.floor(sec / 60)} мин назад`
  if (sec < 86400) return `${Math.floor(sec / 3600)} ч назад`
  if (sec < 604800) return `${Math.floor(sec / 86400)} дн назад`
  return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
}

// Сжимает изображение перед загрузкой: масштабирует до maxDim по большей
// стороне и перекодирует в JPEG. GIF не трогаем — canvas убил бы анимацию.
export function compressImage(file, maxDim = 1600, quality = 0.82) {
  if (file.type === 'image/gif') return Promise.resolve(file)

  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      const scale = Math.min(1, maxDim / Math.max(img.width, img.height))
      const w = Math.round(img.width * scale)
      const h = Math.round(img.height * scale)
      const canvas = document.createElement('canvas')
      canvas.width = w
      canvas.height = h
      canvas.getContext('2d').drawImage(img, 0, 0, w, h)
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name, { type: 'image/jpeg' }) : file),
        'image/jpeg', quality,
      )
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(file) }
    img.src = url
  })
}

export function AutoTextarea({ value, onChange, placeholder, minHeight = 0, maxHeight = 220, style, onEnter, className }) {
  const ref = useRef(null)

  // Замеряем от нулевой высоты, а не от 'auto': во flex-контейнере 'auto'
  // может разрешиться в высоту родителя и поле «раздувается» на весь экран.
  // Плюс потолок maxHeight, чтобы длинный текст не ломал вёрстку страницы.
  const resize = (el) => {
    if (!el) return
    el.style.height = '0px'
    const next = Math.max(minHeight, Math.min(el.scrollHeight, maxHeight))
    el.style.height = `${next}px`
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  useLayoutEffect(() => { resize(ref.current) }, [value])

  // На первом монтировании layout ещё не устоялся и scrollHeight может вернуть
  // высоту растянутого контейнера. Перезамеряем в следующем кадре.
  useEffect(() => {
    const id = requestAnimationFrame(() => resize(ref.current))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <textarea
      ref={ref}
      className={className}
      value={value}
      onChange={e => { onChange(e.target.value); resize(e.target) }}
      onKeyDown={e => {
        if (onEnter && e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault()
          onEnter()
        }
      }}
      placeholder={placeholder}
      rows={1}
      style={{
        minHeight, height: minHeight || undefined,
        resize: 'none', overflowY: 'hidden', border: '1px solid var(--border-color)',
        borderRadius: 12, background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
        fontFamily: 'var(--font-inter)', outline: 'none',
        whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
        ...style,
      }}
    />
  )
}

export function Avatar({ name, avatarUrl, size = 40, userId, clickable = false }) {
  const navigate = useNavigate()
  const interactive = clickable && userId

  const common = {
    width: size, height: size, borderRadius: '50%', flexShrink: 0,
    cursor: interactive ? 'pointer' : 'default',
  }
  const onClick = interactive ? (e) => { e.stopPropagation(); navigate(`/u/${userId}`) } : undefined

  if (avatarUrl) {
    return <img src={avatarUrl} alt={name} onClick={onClick} style={{ ...common, objectFit: 'cover' }} />
  }
  return (
    <div onClick={onClick} style={{
      ...common,
      background: 'rgba(255,214,10,0.10)', border: '2px solid rgba(255,214,10,0.4)',
      color: 'var(--accent-lime)', fontWeight: 700, fontSize: size * 0.38,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {getInitials(name)}
    </div>
  )
}

export function UserName({ id, name, size = 13.5, bold = true }) {
  const navigate = useNavigate()
  return (
    <span
      onClick={(e) => { e.stopPropagation(); navigate(`/u/${id}`) }}
      style={{
        fontWeight: bold ? 600 : 500, fontSize: size, color: 'var(--text-primary)',
        cursor: 'pointer',
      }}
    >
      {name}
    </span>
  )
}

export function Btn({ children, onClick, variant = 'primary', disabled, style, className }) {
  const palette = {
    primary: { background: 'var(--accent-lime)', color: 'var(--on-accent)', border: 'none' },
    ghost: { background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)' },
    active: { background: 'rgba(255,214,10,0.12)', color: 'var(--accent-lime)', border: '1px solid var(--accent-lime)' },
  }[variant]

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        padding: '8px 18px', fontSize: 13, fontWeight: 600, borderRadius: 12, outline: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        ...palette, ...style,
      }}
    >
      {children}
    </button>
  )
}

export function UserRow({ user, onOpenChat }) {
  const navigate = useNavigate()
  return (
    <div
      onClick={() => navigate(`/u/${user.id}`)}
      style={{
        display: 'flex', gap: 12, alignItems: 'center', padding: 14, cursor: 'pointer',
        border: '1px solid var(--border-color)', borderRadius: 12, background: 'var(--bg-secondary)',
      }}
    >
      <Avatar name={user.name} avatarUrl={user.avatarUrl} size={44} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>{user.name}</div>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.track || 'Участник лагеря'}
        </div>
        <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 2 }}>
          Подписчиков: {user.stats?.followers ?? 0} · Постов: {user.stats?.posts ?? 0}
        </div>
      </div>
      {!user.isMe && onOpenChat && (
        <Btn variant="ghost" style={{ padding: '6px 14px', fontSize: 12 }}
          onClick={(e) => { e.stopPropagation(); onOpenChat(user.id) }}>
          Написать
        </Btn>
      )}
    </div>
  )
}
