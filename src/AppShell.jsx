import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import DayModal from './components/DayModal'
import Dashboard from './pages/Dashboard'
import Schedule from './pages/Schedule'
import Library from './pages/Library'
import Links from './pages/Links'
import TheoryPage from './pages/TheoryPage'
import QuestionsPage from './pages/QuestionsPage'
import HomeworkPage from './pages/HomeworkPage'
import Announcements from './pages/Announcements'
import LikebezyPage from './pages/LikebezyPage'

const PAGES = {
  dashboard: Dashboard,
  schedule:  Schedule,
  library:   Library,
  links:     Links,
  theory:    TheoryPage,
  questions: QuestionsPage,
  homework:  HomeworkPage,
  announcements: Announcements,
  likebezy: LikebezyPage,
}

const VALID_PAGES = Object.keys(PAGES)

export default function AppShell({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dayModal, setDayModal]       = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)

  useEffect(() => {
    document.body.className = 'app-page'
    return () => { document.body.className = '' }
  }, [])

  const navigate = (page) => {
    if (VALID_PAGES.includes(page)) {
      setCurrentPage(page)
      setSidebarOpen(false)
    }
  }

  const openTheory = (day) => {
    setSelectedDay(day.day)
    setCurrentPage('theory')
  }

  const openQuestions = (day) => {
    setSelectedDay(day.day)
    setCurrentPage('questions')
  }

  const openHomework = (day) => {
    setSelectedDay(day.day)
    setCurrentPage('homework')
  }

  const backToLibrary = () => {
    setCurrentPage('library')
  }

  const backToDashboard = () => {
    setCurrentPage('dashboard')
  }

  const PageComponent = PAGES[currentPage] || Schedule

  return (
    <>
      <aside id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}`}>
        <Sidebar
          user={user}
          currentPage={currentPage}
          onNavigate={navigate}
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
          page={currentPage}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="pages-wrap">
          {currentPage === 'theory' ? (
            <TheoryPage
              selectedDay={selectedDay}
              onBack={backToLibrary}
            />
          ) : currentPage === 'questions' ? (
            <QuestionsPage
              selectedDay={selectedDay}
              onBack={backToLibrary}
            />
          ) : currentPage === 'homework' ? (
            <HomeworkPage
              selectedDay={selectedDay}
              onBack={backToLibrary}
            />
          ) : currentPage === 'announcements' ? (
            <Announcements
              onBack={backToDashboard}
            />
          ) : (
            <PageComponent
              user={user}
              onNavigate={navigate}
              onOpenDay={setDayModal}
              onOpenTheory={openTheory}
              onOpenQuestions={openQuestions}
              onOpenHomework={openHomework}
            />
          )}
        </main>
      </div>

      {dayModal && (
        <DayModal day={dayModal} onClose={() => setDayModal(null)} />
      )}
    </>
  )
}
