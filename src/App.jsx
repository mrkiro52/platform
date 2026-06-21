import { useState, useCallback, useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import LoginPage from './pages/Login'
import AppShell from './AppShell'

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

  const navigate = useNavigate()

  const handleLogin = useCallback((userData) => {
    localStorage.setItem('kiro_user', JSON.stringify(userData))
    setUser(userData)
    navigate('/dashboard')
  }, [navigate])

  const handleLogout = useCallback(() => {
    localStorage.removeItem('kiro_user')
    localStorage.setItem('sessionExpired', 'true')
    setUser(null)
    navigate('/login')
  }, [navigate])

  return (
    <Routes>
      <Route path="/login" element={
        user ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />
      } />
      <Route path="/*" element={
        user
          ? <AppShell user={user} onLogout={handleLogout} />
          : <Navigate to="/login" replace />
      } />
    </Routes>
  )
}
