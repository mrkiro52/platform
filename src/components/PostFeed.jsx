import { useState, useRef } from 'react'
import { api } from '../api'
import { Avatar, AutoTextarea, UserName, Btn, formatDate } from './social'

const REACTIONS = [
  { type: 'heart',      emoji: '❤️' },
  { type: 'mind_blown', emoji: '🤯' },
  { type: 'clap',       emoji: '👏' },
  { type: 'party',      emoji: '🥳' },
  { type: 'cry',        emoji: '😢' },
]

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
        <Btn onClick={submit} disabled={!text.trim() || sending}
          style={{ height: 36, padding: '0 16px', fontSize: 12.5, flexShrink: 0 }}>
          Комментировать
        </Btn>
      </div>
    </div>
  )
}

export function PostCard({ post, user, avatarUrl, onReact, onComment, onDelete, onDeleteComment }) {
  const [visibleCount, setVisibleCount] = useState(3)

  const comments = post.comments || []
  const shown = comments.slice(-visibleCount)
  const hasMore = comments.length > visibleCount
  const isAuthor = post.author.id === user?.id

  return (
    <div style={{
      border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
      padding: 16,
    }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <Avatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={36}
          userId={post.author.id} clickable />
        <div style={{ flex: 1 }}>
          <UserName id={post.author.id} name={post.author.name} />
          <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>{formatDate(post.createdAt)}</div>
        </div>
        {isAuthor && onDelete && (
          <button
            onClick={() => onDelete(post.id)}
            title="Удалить пост"
            style={{
              border: 'none', background: 'transparent', color: 'var(--text-tertiary)',
              fontSize: 12, cursor: 'pointer', outline: 'none', padding: 4,
            }}
          >
            Удалить
          </button>
        )}
      </div>

      {post.text && (
        <p style={{
          margin: '0 0 12px', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
          whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
        }}>
          {post.text}
        </p>
      )}

      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt=""
          style={{
            width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 0,
            border: '1px solid var(--border-color)', marginBottom: 12, display: 'block',
          }}
        />
      )}

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
          {shown.map(c => {
            const canDelete = c.author.id === user?.id || isAuthor
            return (
              <div key={c.id} style={{ display: 'flex', gap: 8 }}>
                <Avatar name={c.author.name} avatarUrl={c.author.avatarUrl} size={28}
                  userId={c.author.id} clickable />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                    <UserName id={c.author.id} name={c.author.name} size={12.5} />
                    <span style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{formatDate(c.createdAt)}</span>
                    {canDelete && onDeleteComment && (
                      <button
                        onClick={() => onDeleteComment(post.id, c.id)}
                        style={{
                          marginLeft: 'auto', border: 'none', background: 'transparent',
                          color: 'var(--text-tertiary)', fontSize: 11, cursor: 'pointer', outline: 'none',
                        }}
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                  <p style={{
                    margin: 0, fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5,
                    whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
                  }}>
                    {c.text}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <CommentComposer user={user} avatarUrl={avatarUrl} onSubmit={text => onComment(post.id, text)} />
    </div>
  )
}

export function PostComposer({ user, avatarUrl, onPublished }) {
  const [text, setText] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const pickImage = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const { imageUrl: url } = await api.uploadPostImage(file)
      setImageUrl(url)
    } catch (err) {
      setError(err.message || 'Не удалось загрузить изображение')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  const publish = async () => {
    const trimmed = text.trim()
    if ((!trimmed && !imageUrl) || publishing) return
    setPublishing(true)
    setError('')
    try {
      const newPost = await api.createPost(trimmed, imageUrl)
      onPublished(newPost)
      setText('')
      setImageUrl('')
    } catch (e) {
      setError(e.message || 'Не удалось опубликовать пост')
    } finally {
      setPublishing(false)
    }
  }

  const canPublish = (text.trim() || imageUrl) && !publishing && !uploading

  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{
        display: 'flex', gap: 12, alignItems: 'flex-start',
        border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
        padding: 16,
      }}>
        <Avatar name={user?.name} avatarUrl={avatarUrl} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <AutoTextarea
              value={text}
              onChange={setText}
              placeholder="Поделиться мыслями..."
              minHeight={44}
              style={{ flex: 1, padding: '10px 12px', fontSize: 14 }}
            />
            <Btn onClick={publish} disabled={!canPublish}
              style={{ height: 44, padding: '0 22px', fontSize: 13.5, flexShrink: 0 }}>
              {publishing ? 'Публикуем...' : 'Опубликовать'}
            </Btn>
          </div>

          {imageUrl && (
            <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
              <img src={imageUrl} alt="" style={{
                maxHeight: 180, maxWidth: '100%', display: 'block', borderRadius: 0,
                border: '1px solid var(--border-color)',
              }} />
              <button
                onClick={() => setImageUrl('')}
                style={{
                  position: 'absolute', top: 6, right: 6, border: 'none', borderRadius: 0,
                  background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 12, fontWeight: 600,
                  padding: '4px 10px', cursor: 'pointer', outline: 'none',
                }}
              >
                Убрать
              </button>
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <input ref={fileRef} type="file" accept="image/*" onChange={pickImage} style={{ display: 'none' }} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              style={{
                border: '1px solid var(--border-color)', borderRadius: 0, background: 'transparent',
                color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, padding: '6px 14px',
                cursor: uploading ? 'wait' : 'pointer', outline: 'none',
              }}
            >
              {uploading ? 'Загрузка...' : imageUrl ? 'Заменить изображение' : 'Добавить изображение'}
            </button>
          </div>
        </div>
      </div>
      {error && <div style={{ color: '#ff3333', fontSize: 12, marginTop: 8 }}>{error}</div>}
    </div>
  )
}

// Общая логика ленты: реакции, комментарии, удаление — переиспользуется
// и на «Стене», и в профиле пользователя.
export function usePostActions(setPosts, reload) {
  const handleReact = async (postId, reaction) => {
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
      reload()
    }
  }

  const handleComment = async (postId, text) => {
    const newComment = await api.addComment(postId, text)
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, comments: [...(p.comments || []), newComment] }
      : p))
  }

  const handleDelete = async (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId))
    try { await api.deletePost(postId) } catch { reload() }
  }

  const handleDeleteComment = async (postId, commentId) => {
    setPosts(prev => prev.map(p => p.id === postId
      ? { ...p, comments: (p.comments || []).filter(c => c.id !== commentId) }
      : p))
    try { await api.deleteComment(postId, commentId) } catch { reload() }
  }

  return { handleReact, handleComment, handleDelete, handleDeleteComment }
}
