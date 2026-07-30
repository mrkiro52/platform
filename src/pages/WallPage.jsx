import { useState, useEffect } from 'react'
import { api } from '../api'

function getInitials(name) {
  return (name || '').split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2) || '?'
}

function formatDate(isoLike) {
  // SQLite CURRENT_TIMESTAMP отдаёт 'YYYY-MM-DD HH:MM:SS' в UTC
  const d = new Date(isoLike.replace(' ', 'T') + 'Z')
  if (isNaN(d.getTime())) return isoLike
  return d.toLocaleString('ru-RU', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })
}

function Avatar({ name, avatarUrl, size = 40 }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
      />
    )
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'rgba(32,190,255,0.10)', border: '2px solid rgba(32,190,255,0.4)',
      color: 'var(--accent-lime)', fontWeight: 700, fontSize: size * 0.38,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {getInitials(name)}
    </div>
  )
}

export default function WallPage({ user, avatarUrl }) {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.posts().then(data => {
      setPosts(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handlePublish = async () => {
    const trimmed = text.trim()
    if (!trimmed || publishing) return
    setPublishing(true)
    setError('')
    try {
      const newPost = await api.createPost(trimmed)
      setPosts(prev => [newPost, ...prev])
      setText('')
    } catch (e) {
      setError(e.message || 'Не удалось опубликовать пост')
    } finally {
      setPublishing(false)
    }
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Стена</h1>
        <p className="page-subtitle">Делись мыслями с остальными участниками лагеря</p>
      </div>

      {/* Форма публикации */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24,
        border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
        padding: 16,
      }}>
        <Avatar name={user?.name} avatarUrl={avatarUrl} />
        <div style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Поделиться мыслями..."
            style={{
              width: '100%', minHeight: 80, resize: 'vertical', border: '1px solid var(--border-color)',
              borderRadius: 0, background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
              padding: '10px 12px', fontSize: 14, fontFamily: 'var(--font-inter)', outline: 'none',
              whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
            }}
          />
          {error && <div style={{ color: '#ff3333', fontSize: 12, marginTop: 6 }}>{error}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <button
              onClick={handlePublish}
              disabled={!text.trim() || publishing}
              style={{
                padding: '9px 22px', fontSize: 13.5, fontWeight: 600, border: 'none', borderRadius: 0,
                background: 'var(--accent-lime)', color: '#fff', outline: 'none',
                cursor: !text.trim() || publishing ? 'not-allowed' : 'pointer',
                opacity: !text.trim() || publishing ? 0.5 : 1,
              }}
            >
              {publishing ? 'Публикуем...' : 'Опубликовать'}
            </button>
          </div>
        </div>
      </div>

      {/* Лента постов */}
      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>Постов пока нет — стань первым!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map(post => (
            <div key={post.id} style={{
              border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
              padding: 16,
            }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                <Avatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={36} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--text-primary)' }}>{post.author.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>{formatDate(post.createdAt)}</div>
                </div>
              </div>
              <p style={{
                margin: 0, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
                whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
              }}>
                {post.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
