import { useEffect } from 'react'
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DayModal from './components/DayModal'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Library from './pages/Library'
import Links from './pages/Links'
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

  useEffect(() => {
    // classList.add/remove (не className=) — чтобы не затирать классы,
    // которые добавляют дочерние страницы (например reels-lock у AntiReels)
    document.body.classList.add('app-page')
    return () => document.body.classList.remove('app-page')
  }, [])

  const openTheory    = (day) => navigate(`/library/theory/${day.day}`)
  const openQuestions = (day) => navigate(`/library/questions/${day.day}`)
  const openHomework  = (day) => navigate(`/library/homework/${day.day}`)

  return (
    <>
      <aside id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <Sidebar
          user={user}
          onLogout={onLogout}
          onClose={() => setSidebarOpen(false)}
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
