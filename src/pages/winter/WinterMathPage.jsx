import { Link } from 'react-router-dom'
import { WINTER_MATH, WINTER_MATH_TIME, WINTER_MATH_RECORDINGS, humanDate, isoOf } from '../../data/winter/schedule'
import { materialsOf } from '../../data/math'
import WinterTracks from '../../components/winter/WinterTracks'
import { winterDirectionOf } from '../../data/winter'
import '../../winter.css'

// Мини-курс по математике зимнего лагеря: восемь занятий, у каждого — конспект,
// домашнее задание и запись встречи. Конспекты и задания открыты заранее, запись
// появляется после занятия (WINTER_MATH_RECORDINGS в расписании).

function Session({ session, isNext, isPast }) {
  const materials = materialsOf(session.day)
  const recording = WINTER_MATH_RECORDINGS[session.day]
  return (
    <div className={`wmath-session${isNext ? ' is-next' : ''}${isPast ? ' is-past' : ''}`}>
      <div className="wmath-session-head">
        <span className="wmath-session-num">Занятие {session.day}</span>
        {isNext && <span className="wc-mod-badge">ближайшее</span>}
        {isPast && <span className="wmath-session-done">прошло</span>}
      </div>
      <div className="wmath-session-topic">{session.topic}</div>
      <div className="wmath-session-when">{humanDate(session.date, { weekday: true })} · {WINTER_MATH_TIME} МСК</div>
      <div className="wmath-links">
        {materials?.theory
          ? <Link className="wmath-link" to={`/winter-camp/math/day${session.day}/theory`}><b>Конспект</b><span>теория и разобранные задачи</span></Link>
          : <span className="wmath-link is-off"><b>Конспект</b><span>{session.day === 8 ? 'повторяем по конспектам 1–7' : 'появится к занятию'}</span></span>}
        {materials?.homework
          ? <Link className="wmath-link" to={`/winter-camp/math/day${session.day}/homework`}><b>Домашнее задание</b><span>задачи с ответами для самопроверки</span></Link>
          : <span className="wmath-link is-off"><b>Домашнее задание</b><span>{session.day === 8 ? 'задачи на повторение — на занятии' : 'появится к занятию'}</span></span>}
        {recording
          ? <a className="wmath-link is-video" href={recording} target="_blank" rel="noopener noreferrer"><b>Запись встречи ↗</b><span>видео занятия</span></a>
          : <span className="wmath-link is-off"><b>Запись встречи</b><span>появится после занятия</span></span>}
      </div>
    </div>
  )
}

export default function WinterMathPage({ user }) {
  if (!user?.isWinterCamp2027) return null
  const today = isoOf(new Date())
  const next = WINTER_MATH.find(s => s.date >= today) || null
  const done = WINTER_MATH.filter(s => s.date < today).length

  return (
    <section className="page active prg-page is-winter">
      <WinterTracks active="math" direction={winterDirectionOf(user)} />
      <div className="prg-hero">
        <span className="prg-tag">Мини-курс · 8 занятий</span>
        <h1 className="prg-title">Математика</h1>
        <p className="prg-lead">
          Математика, которая нужна в айти и на собеседованиях: от процентов и уравнений до теории вероятностей,
          статистики и проверки гипотез. Занятия по понедельникам в {WINTER_MATH_TIME} МСК. Конспекты и домашние задания
          открыты заранее — можно готовиться к занятию и возвращаться к ним после.
        </p>
        <div className="prg-hero-meta">
          <span className="prg-chip">пройдено {done} из {WINTER_MATH.length}</span>
          {next && <span className="prg-chip">ближайшее: {humanDate(next.date, { weekday: true })}</span>}
        </div>
      </div>

      <h2 className="prg-list-title">Программа курса</h2>
      <div className="wmath-list">
        {WINTER_MATH.map(s => (
          <Session key={s.day} session={s} isNext={!!next && next.day === s.day} isPast={s.date < today} />
        ))}
      </div>
    </section>
  )
}
