import { useState, useCallback, useEffect } from 'react'
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
      const userData = JSON.parse(sessionStorage.getItem('kiro_user'))
      // Check if token is valid on initial load
      if (userData && isTokenValid(userData)) {
        return userData
      }
      // Clear invalid token
      sessionStorage.removeItem('kiro_user')
      // Mark that session expired
      if (userData) {
        sessionStorage.setItem('sessionExpired', 'true')
      }
      return null
    } catch {
      return null
    }
  })

  // Check token validity on mount, when tab becomes visible, and periodically
  useEffect(() => {
    if (!user) return

    const checkTokenValidity = () => {
      if (!isTokenValid(user)) {
        // Token expired, logout
        sessionStorage.removeItem('kiro_user')
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
  }, [user])

  const handleLogin = useCallback((userData) => {
    sessionStorage.setItem('kiro_user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('kiro_user')
    sessionStorage.setItem('sessionExpired', 'true')
    setUser(null)
  }, [])

  if (!user) return <LoginPage onLogin={handleLogin} />
  return <AppShell user={user} onLogout={handleLogout} />
}
