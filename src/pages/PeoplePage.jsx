import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { UserRow } from '../components/social'

export default function PeoplePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)

  // debounce — не дёргаем сервер на каждое нажатие клавиши
  useEffect(() => {
    const t = setTimeout(() => {
      api.people(query)
        .then(data => { setPeople(data); setLoading(false) })
        .catch(() => setLoading(false))
    }, query ? 250 : 0)
    return () => clearTimeout(t)
  }, [query])

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Участники</h1>
        <p className="page-subtitle">Найди одногруппников, подпишись и напиши им</p>
      </div>

      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Поиск по имени или должности..."
        style={{
          width: '100%', padding: '11px 14px', fontSize: 13.5, marginBottom: 18,
          border: '1px solid var(--border-color)', borderRadius: 0,
          background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
          fontFamily: 'var(--font-inter)', outline: 'none',
        }}
      />

      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : people.length === 0 ? (
        <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>Никого не нашлось.</p>
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
