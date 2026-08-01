import { useState, useRef } from 'react'
import { api } from '../api'
import { Avatar, AutoTextarea, UserName, Btn, formatDate, compressImage } from './social'

function PaperclipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05l-9.19 9.19a5 5 0 0 1-7.07-7.07l9.19-9.19a3.5 3.5 0 0 1 4.95 4.95l-9.2 9.19a1.5 1.5 0 0 1-2.12-2.12l8.49-8.48" />
    </svg>
  )
}

function PaperPlaneIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" /><path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

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
    <div className="composer-row" style={{ marginTop: 12 }}>
      <div className="composer-avatar">
        <Avatar name={user?.name} avatarUrl={avatarUrl} size={36} />
      </div>
      <AutoTextarea
        className="composer-input"
        value={text}
        onChange={setText}
        onEnter={submit}
        placeholder="Написать комментарий..."
        minHeight={36}
        style={{ padding: '8px 10px', fontSize: 13 }}
      />
      <Btn onClick={submit} disabled={!text.trim() || sending}
        className="composer-submit"
        style={{ height: 36, padding: '0 16px', fontSize: 12.5, flexShrink: 0 }}>
        <span className="composer-submit-label">Комментировать</span>
        <span className="composer-submit-icon"><PaperPlaneIcon /></span>
      </Btn>
    </div>
  )
}

export function PostCard({ post, user, avatarUrl, onReact, onComment, onDelete, onDeleteComment }) {
  const [visibleCount, setVisibleCount] = useState(3)
  const [showComposer, setShowComposer] = useState(false)

  const comments = post.comments || []
  const shown = comments.slice(-visibleCount)
  const hasMore = comments.length > visibleCount
  const isAuthor = post.author.id === user?.id

  return (
    <div className="post-card">
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
        <Avatar name={post.author.name} avatarUrl={post.author.avatarUrl} size={36}
          userId={post.author.id} clickable />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <UserName id={post.author.id} name={post.author.name} />
            {post.author.rank !== undefined && (
              <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-lime)', background: 'rgba(32,190,255,0.1)', padding: '2px 8px', borderRadius: 3 }}>
                Ранг {post.author.rank}
              </span>
            )}
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>{formatDate(post.createdAt)}</div>
        </div>
        {isAuthor && onDelete && (
          <button className="icon-btn" onClick={() => onDelete(post.id)} title="Удалить пост">
            <TrashIcon />
          </button>
        )}
      </div>

      {post.imageUrl ? (
        <div className="post-media">
          {post.text && (
            <p className="post-media-text" style={{
              margin: 0, fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
              whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
            }}>
              {post.text}
            </p>
          )}
          <div className="post-media-image">
            <img src={post.imageUrl} alt="" />
          </div>
        </div>
      ) : post.text && (
        <p style={{
          margin: '0 0 12px', fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.6,
          whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
        }}>
          {post.text}
        </p>
      )}

      {/* Реакции */}
      <div className="reaction-row">
        {REACTIONS.map(r => {
          const count = post.reactions?.[r.type] || 0
          const active = post.myReaction === r.type
          return (
            <button
              key={r.type}
              onClick={() => onReact(post.id, r.type)}
              className={`reaction-pill${active ? ' active' : ''}`}
            >
              <span>{r.emoji}</span>
              <span>{count}</span>
            </button>
          )
        })}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        fontSize: 12.5, marginBottom: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-tertiary)' }}>
          <ChatIcon />
          <span>{comments.length === 0 ? 'Нет комментариев' : `Комментариев: ${comments.length}`}</span>
        </div>
        <button
          onClick={() => setShowComposer(!showComposer)}
          style={{
            background: 'transparent', border: 'none', color: 'var(--accent-lime)',
            fontSize: 12.5, fontWeight: 700, cursor: 'pointer', padding: 0,
          }}
        >
          Комментировать
        </button>
      </div>

      {shown.length > 0 && (
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {hasMore && (
            <button className="btn-ghost" style={{ alignSelf: 'flex-start', fontSize: 12 }}
              onClick={() => setVisibleCount(c => c + 3)}>
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
                        className="icon-btn"
                        style={{ width: 22, height: 22, marginLeft: 'auto' }}
                        onClick={() => onDeleteComment(post.id, c.id)}
                        title="Удалить комментарий"
                      >
                        <TrashIcon />
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

      {showComposer && <CommentComposer user={user} avatarUrl={avatarUrl} onSubmit={text => { onComment(post.id, text); setShowComposer(false) }} />}
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
      const compressed = await compressImage(file)
      const { imageUrl: url } = await api.uploadPostImage(compressed)
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
      <div className="wall-composer">
        <div className="composer-row">
          <div className="composer-avatar">
            <Avatar name={user?.name} avatarUrl={avatarUrl} />
          </div>
          <AutoTextarea
            className="composer-input"
            value={text}
            onChange={setText}
            placeholder="Поделиться мыслями..."
            minHeight={44}
            style={{ padding: '10px 12px', fontSize: 14 }}
          />
          <input ref={fileRef} type="file" accept="image/*" onChange={pickImage} style={{ display: 'none' }} />
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            title={imageUrl ? 'Заменить изображение' : 'Добавить изображение'}
            className="composer-attach"
            style={{
              width: 44, height: 44, flexShrink: 0, border: '1px solid var(--border-color)', borderRadius: 0,
              background: imageUrl ? 'rgba(32,190,255,0.10)' : 'transparent',
              color: imageUrl ? 'var(--accent-lime)' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: uploading ? 'wait' : 'pointer', outline: 'none',
            }}
          >
            {uploading ? '···' : <PaperclipIcon />}
          </button>
          <Btn onClick={publish} disabled={!canPublish}
            className="composer-submit"
            style={{ height: 44, padding: '0 22px', fontSize: 13.5, flexShrink: 0 }}>
            <span className="composer-submit-label">{publishing ? 'Публикуем...' : 'Опубликовать'}</span>
            <span className="composer-submit-icon"><PaperPlaneIcon /></span>
          </Btn>
        </div>

        {imageUrl && (
          <div style={{ marginTop: 12, position: 'relative', display: 'inline-block' }}>
            <img src={imageUrl} alt="" style={{
              maxHeight: 180, maxWidth: '100%', display: 'block', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
            }} />
            <button
              onClick={() => setImageUrl('')}
              style={{
                position: 'absolute', top: 6, right: 6, border: 'none', borderRadius: 'var(--radius-pill)',
                background: 'rgba(0,0,0,0.7)', color: '#fff', fontSize: 12, fontWeight: 600,
                padding: '4px 10px', cursor: 'pointer', outline: 'none',
              }}
            >
              Убрать
            </button>
          </div>
        )}
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
