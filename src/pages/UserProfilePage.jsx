import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Avatar, Btn, UserRow, formatDate } from '../components/social'
import { PostCard, usePostActions } from '../components/PostFeed'
import Trophies from '../components/Trophies'

const TABS = [
  { key: 'posts',     label: 'Посты' },
  { key: 'followers', label: 'Подписчики' },
  { key: 'following', label: 'Подписки' },
]

function Stat({ value, label, onClick, active }) {
  return (
    <div onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{
        fontSize: 20, fontWeight: 700,
        color: active ? 'var(--accent-lime)' : 'var(--text-primary)',
      }}>{value}</div>
      <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>{label}</div>
    </div>
  )
}

export default function UserProfilePage({ user, avatarUrl }) {
  const { id } = useParams()
  const navigate = useNavigate()

  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [tab, setTab] = useState('posts')
  const [posts, setPosts] = useState([])
  const [people, setPeople] = useState([])
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    setLoading(true)
    setNotFound(false)
    setTab('posts')
    api.userProfile(id)
      .then(p => { setProfile(p); setLoading(false) })
      .catch(() => { setNotFound(true); setLoading(false) })
  }, [id])

  const reload = useCallback(() => {
    api.posts({ userId: id }).then(setPosts).catch(() => {})
  }, [id])

  useEffect(() => {
    if (tab === 'posts') reload()
    if (tab === 'followers') api.followers(id).then(setPeople).catch(() => setPeople([]))
    if (tab === 'following') api.following(id).then(setPeople).catch(() => setPeople([]))
  }, [tab, id, reload])

  const { handleReact, handleComment, handleDelete, handleDeleteComment } =
    usePostActions(setPosts, reload)

  const toggleFollow = async () => {
    if (busy) return
    setBusy(true)
    // оптимистично: сразу перерисовываем кнопку и счётчик
    setProfile(p => ({
      ...p,
      isFollowing: !p.isFollowing,
      stats: { ...p.stats, followers: p.stats.followers + (p.isFollowing ? -1 : 1) },
    }))
    try {
      const r = await api.toggleFollow(id)
      setProfile(p => ({ ...p, isFollowing: r.isFollowing, stats: { ...p.stats, followers: r.followers } }))
    } catch {
      api.userProfile(id).then(setProfile).catch(() => {})
    } finally {
      setBusy(false)
    }
  }

  if (loading) {
    return <section className="page active"><p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p></section>
  }
  if (notFound || !profile) {
    return (
      <section className="page active">
        <div className="page-header"><h1 className="page-title">Профиль не найден</h1></div>
        <Btn variant="ghost" onClick={() => navigate('/wall')}>К стене</Btn>
      </section>
    )
  }

  return (
    <section className="page active">
      <div className="profile-info-trophies" style={{ marginBottom: 20 }}>
      {/* Шапка профиля */}
      <div style={{
        border: '1px solid var(--border-color)', borderRadius: 12, background: 'var(--bg-secondary)',
        padding: 20,
      }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Avatar name={profile.name} avatarUrl={profile.avatarUrl} size={84} />
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
                {profile.name}
              </h1>
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>
              Участник лагеря
            </div>
            {profile.position && (
              <div style={{ fontSize: 12.5, color: 'var(--text-tertiary)', marginTop: 2 }}>
                {profile.position}
              </div>
            )}
            {profile.bio && (
              <p style={{
                margin: '10px 0 0', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6,
                whiteSpace: 'pre-wrap', overflowWrap: 'break-word',
              }}>
                {profile.bio}
              </p>
            )}
            <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)', marginTop: 10 }}>
              На платформе с {formatDate(profile.createdAt).split(',')[0]}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
            {profile.isMe ? (
              <Btn variant="ghost" onClick={() => navigate('/profile')}>Редактировать</Btn>
            ) : (
              <>
                <Btn
                  variant={profile.isFollowing ? 'active' : 'primary'}
                  onClick={toggleFollow}
                  disabled={busy}
                >
                  {profile.isFollowing ? 'Вы подписаны' : 'Подписаться'}
                </Btn>
                <Btn variant="ghost" onClick={() => navigate(`/messages/${profile.id}`)}>Написать</Btn>
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 34, marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-color)' }}>
          <Stat value={profile.stats.posts} label="Постов" onClick={() => setTab('posts')} active={tab === 'posts'} />
          <Stat value={profile.stats.followers} label="Подписчиков" onClick={() => setTab('followers')} active={tab === 'followers'} />
          <Stat value={profile.stats.following} label="Подписок" onClick={() => setTab('following')} active={tab === 'following'} />
        </div>
      </div>

      <div className="profile-details">
        <div className="profile-section-h">Трофеи</div>
        <Trophies profile={profile} />
      </div>
      </div>

      {/* Вкладки */}
      <div style={{ display: 'flex', marginBottom: 18, borderBottom: '1px solid var(--border-color)' }}>
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              padding: '10px 20px', fontSize: 13.5, fontWeight: 600, borderRadius: 12, outline: 'none',
              border: 'none', borderBottom: `2px solid ${tab === t.key ? 'var(--accent-lime)' : 'transparent'}`,
              background: 'transparent', cursor: 'pointer', marginBottom: -1,
              color: tab === t.key ? 'var(--accent-lime)' : 'var(--text-secondary)',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'posts' ? (
        posts.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>
            {profile.isMe ? 'Ты пока ничего не публиковал.' : 'Пользователь пока ничего не публиковал.'}
          </p>
        ) : (
          <div className="posts-grid">
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
        )
      ) : people.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>
          {tab === 'followers' ? 'Пока нет подписчиков.' : 'Пока ни на кого не подписан.'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {people.map(p => (
            <UserRow key={p.id} user={p} onOpenChat={uid => navigate(`/messages/${uid}`)} />
          ))}
        </div>
      )}
    </section>
  )
}
