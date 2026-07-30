import { useState, useEffect } from 'react'
import { api } from '../api'

function getInitials(name) {
  return name.split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2)
}

const TARIFF_FEATURES = [
  '12 недель полной программы',
  'Еженедельный личный созвон с Ханилем',
  'Индивидуальный feedback по проектам',
  'Доступ ко всем материалам навсегда',
  '4 Insider Show с BigTech-специалистами',
  'Демо-день и возможность рефералки',
]

const fieldStyle = {
  width: '100%',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-color)',
  borderRadius: 0,
  padding: '10px 14px',
  fontSize: 14,
  color: 'var(--text-primary)',
  fontFamily: 'var(--font-inter)',
  outline: 'none',
}

export default function Profile({ user }) {
  const [bio, setBio] = useState('')
  const [position, setPosition] = useState('')
  const [birthday, setBirthday] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    api.profile().then(p => {
      setBio(p.bio || '')
      setPosition(p.position || '')
      setBirthday(p.birthday || '')
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (!user) return null
  const initials = getInitials(user.name || '')
  const tariffStr = `${user.plan || '—'} · ${(user.tariff || 0).toLocaleString('ru')} ₽`

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    try {
      await api.updateProfile({ bio, position, birthday })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {
      // no-op
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Профиль</h1>
        <p className="page-subtitle">Информация об аккаунте и настройки</p>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          {position && <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{position}</div>}
          <div className="profile-track-badge">
            <span>{user.track}</span>
          </div>
          <div className="profile-stats-mini">
            <div className="psm"><div className="psm-val">{user.points}</div><div className="psm-label">Очков</div></div>
            <div className="psm"><div className="psm-val">{user.streak}</div><div className="psm-label">Дней стрик</div></div>
            <div className="psm"><div className="psm-val">{user.completedTasks}</div><div className="psm-label">Заданий</div></div>
            <div className="psm"><div className="psm-val">1</div><div className="psm-label">Неделя</div></div>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-section-h">Информация об аккаунте</div>
          <div className="profile-field">
            <span className="pf-label">Имя</span>
            <span className="pf-value">{user.name}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Email</span>
            <span className="pf-value">{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Тариф</span>
            <span className="pf-value">{tariffStr}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Трек</span>
            <span className="pf-value">{user.track}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Старт лагеря</span>
            <span className="pf-value">1 июня 2026</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Финал</span>
            <span className="pf-value">31 августа 2026 · Демо-день</span>
          </div>

          <div className="profile-section-h" style={{ marginTop: 20 }}>Что входит в тариф</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {TARIFF_FEATURES.map((f, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontSize:13, color:'var(--text-secondary)' }}>
                <span style={{ color:'var(--accent-lime)', fontWeight:700, flexShrink:0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <div className="profile-section-h" style={{ marginTop: 20 }}>Личная информация</div>
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Должность</span>
                <input
                  style={fieldStyle}
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  placeholder="Например: Frontend-разработчик"
                />
              </div>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>О себе</span>
                <textarea
                  style={{ ...fieldStyle, minHeight: 90, resize: 'vertical' }}
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  placeholder="Пара строк о себе"
                />
              </div>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Дата рождения</span>
                <input
                  style={fieldStyle}
                  value={birthday}
                  onChange={e => setBirthday(e.target.value)}
                  placeholder="Например: 15 марта"
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    background: 'var(--accent-lime)', color: '#fff', border: 'none', borderRadius: 0,
                    padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer',
                    opacity: saving ? 0.6 : 1,
                  }}
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>
                {saved && <span style={{ color: 'var(--accent-lime)', fontSize: 13, fontWeight: 600 }}>Сохранено</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
