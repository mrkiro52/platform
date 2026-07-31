import { useCallback, useEffect, useState } from 'react'
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DayModal from './components/DayModal'
import { api } from './api'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
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
  const [dayModal, setDayModal] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
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

  const openTheory    = (day) => navigate(`/library/theory/${day.day}`)
  const openQuestions = (day) => navigate(`/library/questions/${day.day}`)
  const openHomework  = (day) => navigate(`/library/homework/${day.day}`)

  return (
    <>
      <aside id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <Sidebar
          user={user}
          avatarUrl={avatarUrl}
          onLogout={onLogout}
          onClose={() => setSidebarOpen(false)}
          badges={badges}
        />
      </aside>

      {sidebarOpen && (
        <div className="sidebar-overlay active" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="app-content">
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
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/library" element={
              <Library
                onOpenDay={setDayModal}
                onOpenTheory={openTheory}
                onOpenQuestions={openQuestions}
                onOpenHomework={openHomework}
              />
            } />
            <Route path="/library/theory/:day"    element={<TheoryRoute />} />
            <Route path="/library/questions/:day" element={<QuestionsRoute />} />
            <Route path="/library/homework/:day"  element={<HomeworkRoute />} />
            <Route path="/links"      element={<Links />} />
            <Route path="/profile"    element={<Profile user={user} onAvatarChange={setAvatarUrl} />} />
            <Route path="/trainings"    element={<TrainingsPage />} />
            <Route path="/trainings/:id" element={<TrainingsPage />} />
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
            <Route path="/announcements" element={<AnnouncementsRoute />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {dayModal && (
        <DayModal day={dayModal} onClose={() => setDayModal(null)} />
      )}
    </>
  )
}
