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
      <div className="wall-tabs">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`wall-tab${tab === t.key ? ' active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[0, 1, 2].map(i => (
            <div key={i} className="skeleton-card">
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 14 }}>
                <div className="skeleton" style={{ width: 36, height: 36, borderRadius: '50%' }} />
                <div style={{ flex: 1 }}>
                  <div className="skeleton skeleton-text" style={{ width: '30%' }} />
                  <div className="skeleton skeleton-text" style={{ width: '18%' }} />
                </div>
              </div>
              <div className="skeleton skeleton-text" style={{ width: '90%' }} />
              <div className="skeleton skeleton-text" style={{ width: '60%' }} />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="wall-empty">
          <div className="wall-empty-icon">{tab === 'following' ? '👀' : '📝'}</div>
          <div className="wall-empty-title">
            {tab === 'following' ? 'Пока пусто' : 'Постов пока нет'}
          </div>
          <div className="wall-empty-sub">
            {tab === 'following'
              ? 'Здесь появятся посты тех, на кого ты подпишешься'
              : 'Стань первым, кто поделится мыслями'}
          </div>
        </div>
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
