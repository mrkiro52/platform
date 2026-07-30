import { useState, useEffect, useRef } from 'react'
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

const REACTIONS = [
  { type: 'heart',      emoji: '❤️' },
  { type: 'mind_blown', emoji: '🤯' },
  { type: 'clap',       emoji: '👏' },
  { type: 'party',      emoji: '🥳' },
  { type: 'cry',        emoji: '😢' },
]

function AutoTextarea({ value, onChange, placeholder, minHeight, style }) {
  const ref = useRef(null)

  const resize = (el) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  useEffect(() => { resize(ref.current) }, [value])

  return (
    <textarea
      ref={ref}
      value={value}
      onChange={e => { onChange(e.target.value); resize(e.target) }}
      placeholder={placeholder}
      rows={1}
      style={{
        minHeight, resize: 'none', overflow: 'hidden', border: '1px solid var(--border-color)',
        borderRadius: 0, background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
        fontFamily: 'var(--font-inter)', outline: 'none',
        whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
        ...style,
      }}
    />
  )
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

function CommentComposer({ user, avatarUrl, onSubmit }) {
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)

  const submit = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    try {
      await onSubmit(trimmed)
      setText('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 10 }}>
      <Avatar name={user?.name} avatarUrl={avatarUrl} size={28} />
      <div style={{ flex: 1, display: 'flex', gap: 8, alignItems: 'flex-start' }}>
        <AutoTextarea
          value={text}
          onChange={setText}
          placeholder="Написать комментарий..."
          minHeight={36}
          style={{ flex: 1, padding: '8px 10px', fontSize: 13 }}
        />
        <button
          onClick={submit}
          disabled={!text.trim() || sending}
          style={{
            padding: '0 16px', height: 36, fontSize: 12.5, fontWeight: 600, border: 'none', borderRadius: 0,
            background: 'var(--accent-lime)', color: '#fff', outline: 'none', flexShrink: 0,
            cursor: !text.trim() || sending ? 'not-allowed' : 'pointer',
            opacity: !text.trim() || sending ? 0.5 : 1,
          }}
        >
          Комментировать
        </button>
      </div>
    </div>
  )
}

function PostCard({ post, user, avatarUrl, onReact, onComment }) {
  const [visibleCount, setVisibleCount] = useState(3)

  const comments = post.comments || []
  const shown = comments.slice(-visibleCount)
  const hasMore = comments.length > visibleCount

  return (
    <div style={{
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
        margin: '0 0 12px', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
        whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
      }}>
        {post.text}
      </p>

      {/* Реакции */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
        {REACTIONS.map(r => {
          const count = post.reactions?.[r.type] || 0
          const active = post.myReaction === r.type
          return (
            <button
              key={r.type}
              onClick={() => onReact(post.id, r.type)}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                width: 62, flexShrink: 0,
                border: `1px solid ${active ? 'var(--accent-lime)' : 'var(--border-color)'}`,
                borderRadius: 0,
                background: active ? 'rgba(32,190,255,0.12)' : 'var(--bg-tertiary)',
                color: active ? 'var(--accent-lime)' : 'var(--text-secondary)',
                padding: '5px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', outline: 'none',
              }}
            >
              <span>{r.emoji}</span>
              <span>{count}</span>
            </button>
          )
        })}
      </div>
      <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginBottom: 12 }}>
        Комментарии: {comments.length}
      </div>

      {/* Комментарии */}
      {shown.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {hasMore && (
            <button
              onClick={() => setVisibleCount(c => c + 3)}
              style={{
                alignSelf: 'flex-start', border: '1px solid var(--border-color)', borderRadius: 0,
                background: 'transparent', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600,
                padding: '5px 12px', cursor: 'pointer', outline: 'none',
              }}
            >
              Показать следующие
            </button>
          )}
          {shown.map(c => (
            <div key={c.id} style={{ display: 'flex', gap: 8 }}>
              <Avatar name={c.author.name} avatarUrl={c.author.avatarUrl} size={28} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span style={{ fontWeight: 600, fontSize: 12.5, color: 'var(--text-primary)' }}>{c.author.name}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(c.createdAt)}</span>
                </div>
                <p style={{
                  margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
                  whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
                }}>
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <CommentComposer user={user} avatarUrl={avatarUrl} onSubmit={text => onComment(post.id, text)} />
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

  const handleReact = async (postId, reaction) => {
    // оптимистичное обновление
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p
      const wasActive = p.myReaction === reaction
      const reactions = { ...p.reactions }
      if (p.myReaction) reactions[p.myReaction] = Math.max(0, (reactions[p.myReaction] || 0) - 1)
      if (!wasActive) reactions[reaction] = (reactions[reaction] || 0) + 1
      return { ...p, reactions, myReaction: wasActive ? null : reaction }
    }))
    try {
      const result = await api.reactToPost(postId, reaction)
      setPosts(prev => prev.map(p => p.id === postId ? { ...p, reactions: result.reactions, myReaction: result.myReaction } : p))
    } catch {
      // откатываемся, перезагрузив ленту
      api.posts().then(setPosts).catch(() => {})
    }
  }

  const handleComment = async (postId, text) => {
    const newComment = await api.addComment(postId, text)
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, comments: [...(p.comments || []), newComment] } : p))
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Стена</h1>
        <p className="page-subtitle">Делись мыслями с остальными участниками лагеря</p>
      </div>

      {/* Форма публикации */}
      <div style={{
        display: 'flex', gap: 12, marginBottom: 24, alignItems: 'flex-start',
        border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
        padding: 16,
      }}>
        <Avatar name={user?.name} avatarUrl={avatarUrl} />
        <div style={{ flex: 1, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <AutoTextarea
            value={text}
            onChange={setText}
            placeholder="Поделиться мыслями..."
            minHeight={44}
            style={{ flex: 1, padding: '10px 12px', fontSize: 14 }}
          />
          <button
            onClick={handlePublish}
            disabled={!text.trim() || publishing}
            style={{
              padding: '0 22px', height: 44, fontSize: 13.5, fontWeight: 600, border: 'none', borderRadius: 0,
              background: 'var(--accent-lime)', color: '#fff', outline: 'none', flexShrink: 0,
              cursor: !text.trim() || publishing ? 'not-allowed' : 'pointer',
              opacity: !text.trim() || publishing ? 0.5 : 1,
            }}
          >
            {publishing ? 'Публикуем...' : 'Опубликовать'}
          </button>
        </div>
      </div>
      {error && <div style={{ color: '#ff3333', fontSize: 12, marginTop: -16, marginBottom: 16 }}>{error}</div>}

      {/* Лента постов */}
      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>Постов пока нет — стань первым!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              avatarUrl={avatarUrl}
              onReact={handleReact}
              onComment={handleComment}
            />
          ))}
        </div>
      )}
    </section>
  )
}
