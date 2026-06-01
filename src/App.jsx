import { useState, useCallback } from 'react'
import LoginPage from './pages/Login'
import AppShell from './AppShell'

export default function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem('kiro_user')) } catch { return null }
  })

  const handleLogin = useCallback((userData) => {
    sessionStorage.setItem('kiro_user', JSON.stringify(userData))
    setUser(userData)
  }, [])

  const handleLogout = useCallback(() => {
    sessionStorage.removeItem('kiro_user')
    setUser(null)
  }, [])

  if (!user) return <LoginPage onLogin={handleLogin} />
  return <AppShell user={user} onLogout={handleLogout} />
}
