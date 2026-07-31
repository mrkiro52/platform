import { useState, useEffect, useCallback } from 'react'
import { api } from '../api'
import { PostCard, PostComposer, usePostActions } from '../components/PostFeed'

const TABS = [
  { key: 'all',       label: 'Все' },
  { key: 'following', label: 'Подписки' },
]

export default function WallPage({ user, avatarUrl }) {
  const [tab, setTab] = useState('all')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(() => {
    api.posts(tab === 'following' ? { feed: 'following' } : {})
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [tab])

  useEffect(() => {
    setLoading(true)
    reload()
  }, [reload])

  const { handleReact, handleComment, handleDelete, handleDeleteComment } =
    usePostActions(setPosts, reload)

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Стена</h1>
        <p className="page-subtitle">Делись мыслями с остальными участниками лагеря</p>
      </div>

      <PostComposer
        user={user}
        avatarUrl={avatarUrl}
        onPublished={newPost => setPosts(prev => [newPost, ...prev])}
      />

      {/* Вкладки ленты */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 18, borderBottom: '1px solid var(--border-color)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 20px', fontSize: 13.5, fontWeight: 600, borderRadius: 0, outline: 'none',
              border: 'none', borderBottom: `2px solid ${tab === t.key ? 'var(--accent-lime)' : 'transparent'}`,
              background: 'transparent', cursor: 'pointer',
              color: tab === t.key ? 'var(--accent-lime)' : 'var(--text-secondary)',
              marginBottom: -1,
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : posts.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>
          {tab === 'following'
            ? 'Здесь появятся посты тех, на кого ты подпишешься. Загляни в «Участники».'
            : 'Постов пока нет — стань первым!'}
        </p>
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
              onDelete={handleDelete}
              onDeleteComment={handleDeleteComment}
            />
          ))}
        </div>
      )}
    </section>
  )
}
