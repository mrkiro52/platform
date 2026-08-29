import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import Landing from './pages/Landing'
import AppShell from './AppShell'
import { api } from './api'

function isTokenValid(token) {
  if (!token) return false

  // Check if token has expiration date
  if (token.expiresAt) {
    const expirationTime = new Date(token.expiresAt).getTime()
    const currentTime = new Date().getTime()
    return currentTime < expirationTime
  }

  return true
}

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const userData = JSON.parse(localStorage.getItem('kiro_user'))
      // Check if token is valid on initial load
      if (userData && isTokenValid(userData)) {
        return userData
      }
      // Clear invalid token
      localStorage.removeItem('kiro_user')
      // Mark that session expired
      if (userData) {
        localStorage.setItem('sessionExpired', 'true')
      }
      return null
    } catch {
      return null
    }
  })

  // Check token validity on mount, when tab becomes visible, and periodically
  useEffect(() => {
    const checkTokenValidity = () => {
      try {
        const storedData = localStorage.getItem('kiro_user')
        if (!storedData) {
          if (user) {
            setUser(null)
          }
          return
        }

        const userData = JSON.parse(storedData)
        if (!isTokenValid(userData)) {
          // Token expired, logout
          localStorage.removeItem('kiro_user')
          localStorage.setItem('sessionExpired', 'true')
          setUser(null)
        }
      } catch (err) {
        localStorage.removeItem('kiro_user')
        setUser(null)
      }
    }

    // Check on mount
    checkTokenValidity()

    // Check when tab becomes visible (user returns to app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkTokenValidity()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Check every minute in background
    const interval = setInterval(checkTokenValidity, 60000)

    return () => {
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  // Флаги участия в лагерях (и прочие производные поля) кэшируются в
  // localStorage на момент входа. Если админ проставил их позже, у уже
  // залогиненного пользователя они останутся устаревшими до перезахода —
  // поэтому на каждой загрузке приложения подтягиваем их свежими с бэкенда.
  useEffect(() => {
    if (!user) return
    api.profile().then(p => {
      setUser(prev => {
        if (!prev) return prev
        const updated = {
          ...prev,
          isSummerCamp2026: !!p.isSummerCamp2026,
          isAutumnCamp2026: !!p.isAutumnCamp2026,
        }
        localStorage.setItem('kiro_user', JSON.stringify(updated))
        return updated
      })
    }).catch(() => {})
  }, [user?.id])

  const navigate = useNavigate()

  const handleLogin = useCallback((userData) => {
    localStorage.setItem('kiro_user', JSON.stringify(userData))
    setUser(userData)
    navigate('/dashboard')
  }, [navigate])

  const handleLogout = useCallback(() => {
    // Обычный выход пользователя — это не истечение сессии, флаг sessionExpired
    // здесь не ставим, иначе баннер "сессия истекла" будет всплывать просто так.
    localStorage.removeItem('kiro_user')
    setUser(null)
    navigate('/login')
  }, [navigate])

  return (
    <Routes>
      {/* Гостя на "/" встречает лендинг; залогиненного сразу уводим в дэшборд */}
      <Route path="/" element={
        user ? <Navigate to="/dashboard" replace /> : <Landing />
      } />
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/register" element={
        user ? <Navigate to="/dashboard" replace /> : <RegisterPage onLogin={handleLogin} />
      } />
      <Route path="/*" element={
        user
          ? <AppShell user={user} onLogout={handleLogout} />
          : <Navigate to="/login" replace />
      } />
    </Routes>
  )
}
