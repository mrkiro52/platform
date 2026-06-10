import { useState, useEffect, useRef } from 'react'
import { api } from '../api'

export default function LoginPage({ onLogin }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)
  const canvasRef = useRef(null)

  useEffect(() => {
    document.body.className = 'login-page'

    // Check if session expired
    if (sessionStorage.getItem('sessionExpired')) {
      setSessionExpired(true)
      sessionStorage.removeItem('sessionExpired')
    }

    return () => { document.body.className = '' }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const mkParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.08 + 0.03,
    })
    const init = () => {
      resize()
      particles = Array.from({ length: 60 }, mkParticle)
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,255,0,${p.o})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < -5) p.x = canvas.width + 5
        if (p.x > canvas.width + 5) p.x = -5
        if (p.y < -5) p.y = canvas.height + 5
        if (p.y > canvas.height + 5) p.y = -5
      })
      raf = requestAnimationFrame(draw)
    }
    init()
    draw()
    window.addEventListener('resize', init, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
    }
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
      <canvas id="login-canvas" ref={canvasRef} />
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-brand">
            <span className="login-brand-kiro">KIRO</span>
            <div className="login-brand-sep" />
            <span className="login-brand-platform">Platform</span>
          </div>
          <h1 className="login-title">IT Summer Camp '26</h1>
          <p className="login-subtitle">Войдите чтобы получить доступ к платформе</p>

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
                ⏰ Ваша сессия истекла. Пожалуйста, войдите снова.
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
            🔒 Доступ выдаётся менеджером после оплаты.<br/>
            Для получения доступа напишите{' '}
            <a href="https://t.me/kiro_team_manager" target="_blank" rel="noopener">@kiro_team_manager</a>
          </p>
        </div>
      </div>
    </>
  )
}
