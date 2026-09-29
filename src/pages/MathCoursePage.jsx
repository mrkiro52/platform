import { useNavigate, Link } from 'react-router-dom'
import {
  MATH_COURSE_TITLE, MATH_SESSIONS, MATH_TIME, MATH_TEACHER, MATH_CHAT, nextMathSession,
} from '../data/mathCourse'
import { materialsOf } from '../data/math'

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
  const day = index + 1
  const materials = materialsOf(day)

  return (
    <div className={`math-session${isNext ? ' is-next' : ''}`}>
      <div className="math-session-head">
        <span className="math-session-num">Созвон {day}</span>
        {isNext && <span className="badge badge--lime">ближайший</span>}
      </div>

      <div className="math-session-topic">{session.topic}</div>

      <div className="math-session-when">
        {humanDate(session.date)} · {MATH_TIME}
      </div>

      <div className="math-session-links">
        {materials?.theory
          ? <Link className="math-link" to={`/autumn-camp/math/day${day}/theory`}>Конспект</Link>
          : <Soon>Конспект</Soon>}

        {materials?.homework
          ? <Link className="math-link" to={`/autumn-camp/math/day${day}/homework`}>Домашнее задание</Link>
          : <Soon>Домашнее задание</Soon>}

        {materials?.recording
          ? (
            <a
              className="math-link is-external"
              href={materials.recording}
              target="_blank"
              rel="noreferrer"
            >
              Запись созвона
            </a>
          )
          : <Soon>Запись созвона</Soon>}
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

        <a className="math-chat" href={MATH_CHAT} target="_blank" rel="noreferrer">
          <span className="math-chat-icon" aria-hidden="true">↗</span>
          <span className="math-chat-text">
            <span className="math-chat-title">Беседа курса математики</span>
            <span className="math-chat-note">
              Записи созвонов лежат в этой беседе — ссылка на запись не откроется, если ты в ней не состоишь
            </span>
          </span>
        </a>
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
