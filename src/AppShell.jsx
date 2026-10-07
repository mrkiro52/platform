import { useCallback, useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import { api } from './api'
import { startAnalytics, trackPage } from './lib/analytics'
import Dashboard from './pages/Dashboard'
import Library from './pages/Library'
import Links from './pages/Links'
import Profile from './pages/Profile'
import TrainingsPage from './pages/TrainingsPage'
import WallPage from './pages/WallPage'
import UserProfilePage from './pages/UserProfilePage'
import MessagesPage from './pages/MessagesPage'
import NotificationsPage from './pages/NotificationsPage'
import TheoryPage from './pages/TheoryPage'
import QuestionsPage from './pages/QuestionsPage'
import HomeworkPage from './pages/HomeworkPage'
import Announcements from './pages/Announcements'
import LikebezyPage from './pages/LikebezyPage'
import AntiReels from './pages/AntiReels'
import AutumnCampPage from './pages/AutumnCampPage'
import AutumnOnboardingPage from './pages/AutumnOnboardingPage'
import MathCoursePage from './pages/MathCoursePage'
import MathTheoryPage from './pages/MathTheoryPage'
import MathHomeworkPage from './pages/MathHomeworkPage'
import HomeworkUploadPage from './pages/HomeworkUploadPage'
import HomeworkTaskPage from './pages/HomeworkTaskPage'
import AutumnWeekPage from './pages/AutumnWeekPage'
import AutumnProgramPage from './pages/AutumnProgramPage'

const SqlTableView = lazy(() => import('./pages/trainings/SqlTableView'))

function TheoryRoute() {
  const { day } = useParams()
  const navigate = useNavigate()
  return <TheoryPage selectedDay={Number(day)} onBack={() => navigate('/library')} />
}

function QuestionsRoute() {
  const { day } = useParams()
  const navigate = useNavigate()
  return <QuestionsPage selectedDay={Number(day)} onBack={() => navigate('/library')} />
}

function HomeworkRoute() {
  const { day } = useParams()
  const navigate = useNavigate()
  return <HomeworkPage selectedDay={Number(day)} onBack={() => navigate('/library')} />
}

function AnnouncementsRoute() {
  const navigate = useNavigate()
  return <Announcements onBack={() => navigate('/dashboard')} />
}

export default function AppShell({ user, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Свёрнутый сайдбар на компьютере — выбор запоминается между визитами
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem('kiro_sidebar_collapsed') === '1' } catch { return false }
  })
  const toggleCollapsed = useCallback(() => {
    setCollapsed(prev => {
      try { localStorage.setItem('kiro_sidebar_collapsed', prev ? '0' : '1') } catch { /* приватный режим */ }
      return !prev
    })
  }, [])
  const [avatarUrl, setAvatarUrl] = useState('')
  const [badges, setBadges] = useState({ messages: 0, notifications: 0 })

  // Счётчики непрочитанного для сайдбара. Обновляются периодически и точечно
  // после действий пользователя (открыл диалог, зашёл в уведомления).
  const refreshBadges = useCallback(() => {
    Promise.all([
      api.unreadMessages().catch(() => ({ count: 0 })),
      api.unreadNotifications().catch(() => ({ count: 0 })),
    ]).then(([m, n]) => setBadges({ messages: m.count || 0, notifications: n.count || 0 }))
  }, [])

  useEffect(() => {
    refreshBadges()
    const t = setInterval(refreshBadges, 30000)
    return () => clearInterval(t)
  }, [refreshBadges])

  useEffect(() => {
    // classList.add/remove (не className=) — чтобы не затирать классы,
    // которые добавляют дочерние страницы (например reels-lock у AntiReels)
    document.body.classList.add('app-page')
    return () => document.body.classList.remove('app-page')
  }, [])

  useEffect(() => {
    api.profile().then(p => setAvatarUrl(p.avatar_url || '')).catch(() => {})
  }, [])

  // Аналитика поведения: визиты, разделы, активное время
  useEffect(() => { startAnalytics() }, [])
  useEffect(() => { trackPage(location.pathname) }, [location.pathname])

  const openTheory = (day) => navigate(`/library/theory/${day.day}`)

  return (
    <>
      <aside id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}${collapsed ? ' is-collapsed' : ''}`}>
        <Sidebar
          user={user}
          avatarUrl={avatarUrl}
          onLogout={onLogout}
          onClose={() => setSidebarOpen(false)}
          badges={badges}
          collapsed={collapsed}
          onToggleCollapse={toggleCollapsed}
        />
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay active" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`app-content${collapsed ? ' is-sidebar-collapsed' : ''}`}>
        <TopBar
          user={user}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="pages-wrap">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={
              <Dashboard user={user} onNavigate={(p) => navigate(`/${p}`)} />
            } />
            <Route path="/library" element={
              <Library onOpenTheory={openTheory} />
            } />
            <Route path="/library/theory/:day"    element={<TheoryRoute />} />
            <Route path="/library/questions/:day" element={<QuestionsRoute />} />
            <Route path="/library/homework/:day"  element={<HomeworkRoute />} />
            <Route path="/links"      element={<Links />} />
            <Route path="/profile"    element={<Profile user={user} onAvatarChange={setAvatarUrl} />} />
            <Route path="/trainings"    element={<TrainingsPage />} />
            <Route path="/trainings/:id" element={<TrainingsPage />} />
            <Route path="/trainings/sql/:table" element={
              <Suspense fallback={<p style={{ color: 'var(--text-secondary)' }}>Загрузка...</p>}><SqlTableView /></Suspense>
            } />
            <Route path="/wall" element={<WallPage user={user} avatarUrl={avatarUrl} />} />
            <Route path="/u/:id" element={<UserProfilePage user={user} avatarUrl={avatarUrl} />} />
            <Route path="/messages" element={
              <MessagesPage user={user} onUnreadChange={refreshBadges} />
            } />
            <Route path="/messages/:userId" element={
              <MessagesPage user={user} onUnreadChange={refreshBadges} />
            } />
            <Route path="/notifications" element={<NotificationsPage onRead={refreshBadges} />} />
            <Route path="/likebezy"   element={<LikebezyPage />} />
            <Route path="/likebezy/:id" element={<LikebezyPage />} />
            <Route path="/antireels" element={<AntiReels />} />
            <Route path="/autumn-camp" element={<AutumnCampPage user={user} />} />
            <Route path="/autumn-camp/program" element={<AutumnProgramPage user={user} />} />
            <Route path="/autumn-camp/program/:chapter" element={<AutumnProgramPage user={user} />} />
            <Route path="/autumn-camp/program/:chapter/task" element={<AutumnProgramPage user={user} task />} />
            <Route path="/autumn-camp/onboarding-autumn-2026" element={<AutumnOnboardingPage />} />
            <Route path="/autumn-camp/math" element={<MathCoursePage />} />
            <Route path="/autumn-camp/math/:day/theory" element={<MathTheoryPage />} />
            <Route path="/autumn-camp/math/:day/homework" element={<MathHomeworkPage />} />
            <Route path="/autumn-camp/upload-homework" element={<HomeworkUploadPage user={user} />} />
            <Route path="/autumn-camp/homework/:week/:chapterId/:taskIndex" element={<HomeworkTaskPage />} />
            <Route path="/autumn-camp/:week" element={<AutumnWeekPage user={user} />} />
            <Route path="/announcements" element={<AnnouncementsRoute />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </>
  )
}
