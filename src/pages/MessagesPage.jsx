import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../api'
import { Avatar, AutoTextarea, Btn, timeAgo, formatDate } from '../components/social'

function ConversationList({ onUnreadChange }) {
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = () => api.conversations()
      .then(data => { setItems(data); setLoading(false); onUnreadChange?.() })
      .catch(() => setLoading(false))
    load()
    const t = setInterval(load, 15000)
    return () => clearInterval(t)
  }, [onUnreadChange])

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Сообщения</h1>
        <p className="page-subtitle">Личная переписка с участниками лагеря</p>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
      ) : items.length === 0 ? (
        <div>
          <p style={{ color: 'var(--text-tertiary)', fontSize: 13, marginBottom: 14 }}>
            Переписок пока нет. Найди собеседника в разделе «Участники».
          </p>
          <Btn variant="ghost" onClick={() => navigate('/people')}>К участникам</Btn>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {items.map(c => (
            <div
              key={c.partner.id}
              onClick={() => navigate(`/messages/${c.partner.id}`)}
              style={{
                display: 'flex', gap: 12, alignItems: 'center', padding: 14, cursor: 'pointer',
                border: '1px solid var(--border-color)', borderRadius: 0,
                background: c.unread > 0 ? 'rgba(32,190,255,0.06)' : 'var(--bg-secondary)',
              }}
            >
              <Avatar name={c.partner.name} avatarUrl={c.partner.avatarUrl} size={44} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)' }}>
                    {c.partner.name}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginLeft: 'auto', flexShrink: 0 }}>
                    {timeAgo(c.lastMessage.createdAt)}
                  </span>
                </div>
                <div style={{
                  fontSize: 12.5, color: c.unread > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 2,
                }}>
                  {c.lastMessage.isMine ? 'Вы: ' : ''}{c.lastMessage.text}
                </div>
              </div>
              {c.unread > 0 && (
                <span style={{
                  background: 'var(--accent-lime)', color: '#fff', fontSize: 11, fontWeight: 700,
                  padding: '2px 8px', borderRadius: 0, flexShrink: 0,
                }}>
                  {c.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

function Thread({ userId, user, onUnreadChange }) {
  const navigate = useNavigate()
  const [partner, setPartner] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef(null)

  const load = useCallback((initial = false) => {
    api.thread(userId)
      .then(data => {
        setPartner(data.partner)
        setMessages(data.messages)
        if (initial) setLoading(false)
        onUnreadChange?.()
      })
      .catch(() => { setError('Не удалось загрузить переписку'); setLoading(false) })
  }, [userId, onUnreadChange])

  useEffect(() => {
    setLoading(true)
    load(true)
    const t = setInterval(load, 10000)
    return () => clearInterval(t)
  }, [load])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'nearest' })
  }, [messages.length])

  const send = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    setError('')
    try {
      const msg = await api.sendMessage(userId, trimmed)
      setMessages(prev => [...prev, msg])
      setText('')
    } catch (e) {
      setError(e.message || 'Не удалось отправить сообщение')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return <section className="page active"><p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p></section>
  }

  return (
    <section className="page active">
      {/* Шапка переписки */}
      <div style={{
        display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, paddingBottom: 14,
        borderBottom: '1px solid var(--border-color)',
      }}>
        <button
          onClick={() => navigate('/messages')}
          style={{
            border: '1px solid var(--border-color)', borderRadius: 0, background: 'transparent',
            color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, padding: '6px 12px',
            cursor: 'pointer', outline: 'none', flexShrink: 0,
          }}
        >
          Назад
        </button>
        {partner && (
          <>
            <Avatar name={partner.name} avatarUrl={partner.avatarUrl} size={40}
              userId={partner.id} clickable />
            <div style={{ minWidth: 0 }}>
              <div
                onClick={() => navigate(`/u/${partner.id}`)}
                style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                {partner.name}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--text-tertiary)' }}>
                {partner.position || 'Участник лагеря'}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Сообщения */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16,
        maxHeight: '55vh', overflowY: 'auto', paddingRight: 4,
      }}>
        {messages.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', fontSize: 13 }}>
            Сообщений пока нет — напиши первым.
          </p>
        ) : messages.map(m => (
          <div key={m.id} style={{
            alignSelf: m.isMine ? 'flex-end' : 'flex-start',
            maxWidth: '72%',
            border: '1px solid var(--border-color)', borderRadius: 0,
            background: m.isMine ? 'rgba(32,190,255,0.10)' : 'var(--bg-secondary)',
            padding: '9px 12px',
          }}>
            <div style={{
              fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.5,
              whiteSpace: 'pre-wrap', overflowWrap: 'break-word', wordBreak: 'break-word',
            }}>
              {m.text}
            </div>
            <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 4, textAlign: 'right' }}>
              {formatDate(m.createdAt).split(', ')[1] || timeAgo(m.createdAt)}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Ввод */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <AutoTextarea
          value={text}
          onChange={setText}
          onEnter={send}
          placeholder="Написать сообщение... (Enter — отправить)"
          minHeight={44}
          style={{ flex: 1, padding: '10px 12px', fontSize: 14 }}
        />
        <Btn onClick={send} disabled={!text.trim() || sending}
          style={{ height: 44, padding: '0 22px', flexShrink: 0 }}>
          {sending ? '...' : 'Отправить'}
        </Btn>
      </div>
      {error && <div style={{ color: '#ff3333', fontSize: 12, marginTop: 8 }}>{error}</div>}
    </section>
  )
}

export default function MessagesPage({ user, onUnreadChange }) {
  const { userId } = useParams()
  return userId
    ? <Thread key={userId} userId={userId} user={user} onUnreadChange={onUnreadChange} />
    : <ConversationList onUnreadChange={onUnreadChange} />
}
