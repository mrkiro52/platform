import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import AuthCanvas from '../components/AuthCanvas'

const NICKNAME_RE = /^[a-zA-Z0-9_.-]{3,32}$/

function PasswordField({ id, label, value, onChange, show, onToggleShow, autoComplete, placeholder }) {
  return (
    <div className="form-group">
      <label className="form-label" htmlFor={id}>{label}</label>
      <div className="password-wrap">
        <input
          type={show ? 'text' : 'password'}
          id={id}
          name={id}
          placeholder={placeholder || '••••••••'}
          autoComplete={autoComplete}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
        <button type="button" className="password-toggle" tabIndex={-1} onClick={onToggleShow}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function RegisterPage({ onLogin }) {
  const [nickname, setNickname]               = useState('')
  const [password, setPassword]               = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [showPass, setShowPass]               = useState(false)
  const [showPassConfirm, setShowPassConfirm] = useState(false)
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const passwordsMismatch = passwordConfirm.length > 0 && password !== passwordConfirm

  useEffect(() => {
    document.body.className = 'login-page'
    return () => { document.body.className = '' }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    const trimmed = nickname.trim()
    if (!NICKNAME_RE.test(trimmed)) {
      setError('Логин: 3–32 символа, латинские буквы, цифры, точка, дефис или подчёркивание')
      return
    }
    if (password.length < 8) {
      setError('Пароль должен быть не короче 8 символов')
      return
    }
    if (password !== passwordConfirm) {
      setError('Пароли не совпадают')
      return
    }

    setLoading(true)
    try {
      const data = await api.register(trimmed, password, passwordConfirm)
      onLogin({ token: data.token, ...data.user })
    } catch (err) {
      setError(err.message || 'Не удалось зарегистрироваться')
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
          <h1 className="login-title" style={{ textAlign: 'center' }}>Регистрация</h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label className="form-label" htmlFor="reg-nickname">Логин</label>
              <input
                type="text"
                id="reg-nickname"
                name="username"
                placeholder="Придумайте логин"
                autoComplete="username"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
              />
            </div>

            <PasswordField
              id="reg-password"
              label="Пароль"
              value={password}
              onChange={setPassword}
              show={showPass}
              onToggleShow={() => setShowPass(v => !v)}
              autoComplete="new-password"
              placeholder="Минимум 8 символов"
            />

            <PasswordField
              id="reg-password-confirm"
              label="Повторите пароль"
              value={passwordConfirm}
              onChange={setPasswordConfirm}
              show={showPassConfirm}
              onToggleShow={() => setShowPassConfirm(v => !v)}
              autoComplete="new-password"
            />
            {passwordsMismatch && (
              <p style={{ color: '#c62828', fontSize: 12, margin: '-10px 0 14px' }}>Пароли не совпадают</p>
            )}

            {error && <div className="login-error">{error}</div>}

            <button
              type="submit"
              className="btn-primary btn-full"
              style={{ marginTop: 4 }}
              disabled={loading}
            >
              {loading ? 'Создаём аккаунт...' : 'Зарегистрироваться →'}
            </button>
          </form>

          <p className="login-note">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
            <br/>
            По всем вопросам пишите{' '}
            <a href="https://t.me/kiro_team_manager" target="_blank" rel="noopener">@kiro_team_manager</a>
          </p>
        </div>
      </div>
    </>
  )
}
