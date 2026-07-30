import { useState, useEffect } from 'react'
import { api } from '../api'

function getInitials(name) {
  return name.split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2)
}

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

const smallFieldStyle = { ...fieldStyle, width: 56, textAlign: 'center' }
const yearFieldStyle = { ...fieldStyle, width: 76, textAlign: 'center' }

function parseBirthday(str) {
  const m = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/.exec(str || '')
  if (!m) return { day: '', month: '', year: '' }
  return { day: m[1], month: m[2], year: m[3] }
}

function formatBirthday(day, month, year) {
  if (!day || !month || !year) return ''
  return `${String(day).padStart(2, '0')}.${String(month).padStart(2, '0')}.${year}`
}

function digitsOnly(value, maxLen) {
  return value.replace(/\D/g, '').slice(0, maxLen)
}

export default function Profile({ user, onAvatarChange }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [bio, setBio] = useState('')
  const [position, setPosition] = useState('')
  const [birthDay, setBirthDay] = useState('')
  const [birthMonth, setBirthMonth] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')
  const [avatarUploading, setAvatarUploading] = useState(false)
  const [avatarError, setAvatarError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)

  useEffect(() => {
    api.profile().then(p => {
      setName(p.name || '')
      setEmail(p.email || '')
      setNickname(p.nickname || '')
      setBio(p.bio || '')
      setPosition(p.position || '')
      setAvatarUrl(p.avatar_url || '')
      onAvatarChange?.(p.avatar_url || '')
      const parsed = parseBirthday(p.birthday)
      setBirthDay(parsed.day)
      setBirthMonth(parsed.month)
      setBirthYear(parsed.year)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (!user) return null
  const initials = getInitials(name || user.name || '')

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setAvatarError('')
    setAvatarUploading(true)
    try {
      const updated = await api.uploadAvatar(file)
      setAvatarUrl(updated.avatar_url || '')
      onAvatarChange?.(updated.avatar_url || '')
    } catch (err) {
      setAvatarError(err.message || 'Не удалось загрузить фото')
    } finally {
      setAvatarUploading(false)
    }
  }

  const requestSave = () => {
    setError('')
    setConfirmOpen(true)
  }

  const handleConfirmSave = async () => {
    setConfirmOpen(false)
    setSaving(true)
    setSaved(false)
    setError('')
    try {
      const birthday = formatBirthday(birthDay, birthMonth, birthYear)
      const payload = { name, email, nickname, bio, position, birthday }
      if (password) payload.password = password
      await api.updateProfile(payload)
      setPassword('')
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch (e) {
      setError(e.message || 'Не удалось сохранить изменения')
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
          <label style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Аватар"
                style={{
                  width: 72, height: 72, borderRadius: '50%', objectFit: 'cover',
                  border: '2px solid rgba(32,190,255,0.4)', display: 'block', margin: '0 auto 12px',
                }}
              />
            ) : (
              <div className="profile-avatar">{initials}</div>
            )}
            <div style={{
              position: 'absolute', bottom: 12, right: -4, width: 24, height: 24,
              background: 'var(--accent-lime)', border: '2px solid var(--bg-secondary)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12,
            }}>
              {avatarUploading ? '···' : '✎'}
            </div>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              onChange={handleAvatarChange}
              disabled={avatarUploading}
              style={{ display: 'none' }}
            />
          </label>
          <div className="profile-name">{name || user.name}</div>
          <div className="profile-email">{email || user.email}</div>
          {position && <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 2 }}>{position}</div>}
          {avatarError && <div style={{ fontSize: 12, color: '#ff3333', marginTop: 8 }}>{avatarError}</div>}
        </div>

        <div className="profile-details">
          <div className="profile-section-h">Личная информация</div>
          {loading ? (
            <p style={{ color: 'var(--text-secondary)', fontSize: 13 }}>Загрузка...</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Имя</span>
                <input style={fieldStyle} value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
              </div>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Почта</span>
                <input style={fieldStyle} value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" type="email" />
              </div>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Логин (для входа)</span>
                <input style={fieldStyle} value={nickname} onChange={e => setNickname(e.target.value)} placeholder="Логин" />
              </div>
              <div>
                <span className="pf-label" style={{ display: 'block', marginBottom: 6 }}>Новый пароль</span>
                <input
                  style={fieldStyle}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Оставь пустым, чтобы не менять"
                  type="password"
                  autoComplete="new-password"
                />
              </div>
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
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    style={smallFieldStyle}
                    value={birthDay}
                    onChange={e => setBirthDay(digitsOnly(e.target.value, 2))}
                    placeholder="ДД"
                    inputMode="numeric"
                  />
                  <span style={{ color: 'var(--text-tertiary)' }}>.</span>
                  <input
                    style={smallFieldStyle}
                    value={birthMonth}
                    onChange={e => setBirthMonth(digitsOnly(e.target.value, 2))}
                    placeholder="ММ"
                    inputMode="numeric"
                  />
                  <span style={{ color: 'var(--text-tertiary)' }}>.</span>
                  <input
                    style={yearFieldStyle}
                    value={birthYear}
                    onChange={e => setBirthYear(digitsOnly(e.target.value, 4))}
                    placeholder="ГГГГ"
                    inputMode="numeric"
                  />
                </div>
              </div>

              {error && <div style={{ color: '#ff3333', fontSize: 13 }}>{error}</div>}

              {confirmOpen ? (
                <div style={{
                  border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)',
                  padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10,
                }}>
                  <span style={{ fontSize: 13, color: 'var(--text-primary)' }}>Подтвердить изменение данных профиля?</span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={handleConfirmSave}
                      style={{
                        background: 'var(--accent-lime)', color: '#fff', border: 'none', borderRadius: 0,
                        padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Подтвердить
                    </button>
                    <button
                      onClick={() => setConfirmOpen(false)}
                      style={{
                        background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)',
                        borderRadius: 0, padding: '8px 20px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      Отменить
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={requestSave}
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
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
