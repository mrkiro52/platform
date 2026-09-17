import { useNavigate } from 'react-router-dom'
import {
  MATH_COURSE_TITLE, MATH_SESSIONS, MATH_TIME, MATH_TEACHER, nextMathSession,
} from '../data/mathCourse'

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

function humanDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${WEEKDAYS[d.getDay()]}`
}

// Пока конспектов и заданий нет — показываем, что появится, а не пустое место
function Soon({ children }) {
  return (
    <span className="math-soon">
      {children}
      <span className="math-soon-tag">скоро</span>
    </span>
  )
}

function Session({ session, index, isNext }) {
  return (
    <div className={`math-session${isNext ? ' is-next' : ''}`}>
      <div className="math-session-head">
        <span className="math-session-num">Созвон {index + 1}</span>
        {isNext && <span className="badge badge--lime">ближайший</span>}
      </div>

      <div className="math-session-topic">{session.topic}</div>

      <div className="math-session-when">
        {humanDate(session.date)} · {MATH_TIME}
      </div>

      <div className="math-session-links">
        <Soon>Конспект</Soon>
        <Soon>Домашнее задание</Soon>
        <Soon>Запись созвона</Soon>
      </div>
    </div>
  )
}

export default function MathCoursePage() {
  const navigate = useNavigate()
  const next = nextMathSession()

  return (
    <section className="page active">
      <button
        onClick={() => navigate('/autumn-camp')}
        style={{
          background: 'transparent', border: 'none', color: '#FFB870', cursor: 'pointer',
          fontSize: 12.5, fontWeight: 700, fontFamily: 'var(--font-syne)', padding: 0, marginBottom: 14,
        }}
      >
        ← Autumn Camp
      </button>

      <div className="page-header">
        <h1 className="page-title">{MATH_COURSE_TITLE}</h1>
        <p className="page-subtitle">
          Восемь созвонов по четвергам, каждый в {MATH_TIME}. К каждому — конспект, домашнее задание и запись
        </p>
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Программа курса
      </h2>
      <div className="math-sessions">
        {MATH_SESSIONS.map((session, i) => (
          <Session
            key={session.date}
            session={session}
            index={i}
            isNext={!!next && next.date === session.date}
          />
        ))}
      </div>

      <h2 style={{ margin: '28px 0 16px', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Преподаватель
      </h2>
      <div className="widget">
        <div className="math-teacher-head">
          <div>
            <div className="math-teacher-name">{MATH_TEACHER.name} ({MATH_TEACHER.year})</div>
            <div className="math-teacher-role">{MATH_TEACHER.role}</div>
          </div>
        </div>

        {MATH_TEACHER.bio.map((paragraph, i) => (
          <p key={i} style={{ margin: '0 0 12px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {paragraph}
          </p>
        ))}

        <div className="math-papers-title">Научные статьи уровня Scopus Q3</div>
        <ul className="math-papers">
          {MATH_TEACHER.papers.map((paper, i) => <li key={i}>{paper}</li>)}
        </ul>
      </div>
    </section>
  )
}
