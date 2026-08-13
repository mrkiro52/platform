import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import AuthCanvas from '../components/AuthCanvas'

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    document.body.className = 'login-page'

    // Баннер показываем только если сессия истекла сама по себе (не после
    // обычного ручного выхода — см. App.jsx handleLogout).
    if (localStorage.getItem('sessionExpired')) {
      setSessionExpired(true)
      localStorage.removeItem('sessionExpired')
    }

    return () => { document.body.className = '' }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) { setError('Введите email и пароль'); return }
    setError('')
    setLoading(true)
    try {
      const data = await api.login(email, password)
      onLogin({ token: data.token, ...data.user })
    } catch (err) {
      setError(err.message || 'Неверный email или пароль')
      setLoading(false)
    }
  }

  return (
    <>
      <AuthCanvas />
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-brand">
            <span className="login-brand-kiro">KIRO PLATFORM</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Логин</label>
              <input
                type="text"
                id="login-email"
                name="username"
                placeholder="Ваш логин"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Пароль</label>
              <div className="password-wrap">
                <input
                  type={showPass ? 'text' : 'password'}
                  id="login-password"
                  name="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="password-toggle"
                  tabIndex={-1}
                  onClick={() => setShowPass(v => !v)}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
            </div>
            {sessionExpired && (
              <div className="login-error" style={{ background: 'rgba(255, 153, 0, 0.1)', borderColor: '#ff9900' }}>
                Ваша сессия истекла. Пожалуйста, войдите снова.
              </div>
            )}
            {error && <div className="login-error">{error}</div>}
            <button
              type="submit"
              className="btn-primary btn-full"
              style={{ marginTop: 4 }}
              disabled={loading}
            >
              {loading ? 'Входим...' : 'Войти →'}
            </button>
          </form>

          <p className="login-note">
            Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
            <br/>
            По всем вопросам пишите{' '}
            <a href="https://t.me/kiro_team_manager" target="_blank" rel="noopener">@kiro_team_manager</a>
          </p>
        </div>
      </div>
    </>
  )
}
