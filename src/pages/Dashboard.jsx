import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import DashCalendar from '../components/dashboard/DashCalendar'
import FocusTimer from '../components/dashboard/FocusTimer'
import NotesTasks from '../components/dashboard/NotesTasks'
import SqlProgress from '../components/dashboard/SqlProgress'
import CampPanel from '../components/dashboard/CampPanel'
import DailyQuestion from '../components/dashboard/DailyQuestion'
import ContinueStrip from '../components/dashboard/ContinueStrip'
import { allEvents, upcoming, countdown, dayLabel, loadOwnEvents, saveOwnEvents } from '../lib/dashEvents'

const RU_MONTHS  = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
const RU_WEEKDAY = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']

function greeting(hour) {
  if (hour < 5) return 'Доброй ночи'
  if (hour < 12) return 'Доброе утро'
  if (hour < 18) return 'Добрый день'
  return 'Добрый вечер'
}

// Ближайшее событие недели — крупно над всем остальным
function NextEvent({ event, now }) {
  const navigate = useNavigate()
  if (!event) return null
  const when = countdown(event, now)
  const live = when === 'идёт сейчас'
  return (
    <button
      type="button"
      className={`dsh-next is-${event.type}${live ? ' is-live' : ''}`}
      onClick={() => event.link && navigate(event.link)}
      disabled={!event.link}
    >
      <span className="dsh-next-when">{live ? '● идёт сейчас' : when || dayLabel(event.date)}</span>
      <span className="dsh-next-main">
        <span className="dsh-next-title">{event.title}</span>
        {event.note && <span className="dsh-next-note">{event.note}</span>}
      </span>
      <span className="dsh-next-time">
        {dayLabel(event.date)}{event.time ? `, ${event.time}${event.type === 'own' ? '' : ' МСК'}` : ''}
      </span>
    </button>
  )
}

export default function Dashboard({ user }) {
  const isCamp = !!user?.isAutumnCamp2026
  const [myCalls, setMyCalls] = useState([])
  const [own, setOwn] = useState(loadOwnEvents)
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    if (!isCamp) return
    // Календарь не должен ломать дэшборд, если записей нет или ручка недоступна
    api.myCalls().then(setMyCalls).catch(() => setMyCalls([]))
  }, [isCamp])

  // Обратный отсчёт до ближайшего события обновляем раз в 30 секунд
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(t)
  }, [])

  const events = useMemo(() => allEvents({ isCamp, myCalls, own }), [isCamp, myCalls, own])
  const weekAhead = new Date(now.getTime() + 7 * 86400000)
  const next = upcoming(events, now).find(e => new Date(`${e.date}T00:00:00`) <= weekAhead)

  const addEvent = (event) => setOwn(list => {
    const nextList = [...list, event]
    saveOwnEvents(nextList)
    return nextList
  })
  const deleteEvent = (id) => setOwn(list => {
    const nextList = list.filter(e => e.id !== id)
    saveOwnEvents(nextList)
    return nextList
  })

  const name = user?.nickname || user?.name || ''
  const weekday = RU_WEEKDAY[now.getDay()]
  const dateLabel = `${weekday[0].toUpperCase()}${weekday.slice(1)}, ${now.getDate()} ${RU_MONTHS[now.getMonth()]}`

  return (
    <section className="page active dsh">
      <div className="dsh-head">
        <div>
          <h1 className="page-title">{greeting(now.getHours())}{name ? `, ${name}` : ''}</h1>
          <p className="page-subtitle dsh-date">{dateLabel}</p>
        </div>
      </div>

      <NextEvent event={next} now={now} />

      <ContinueStrip />

      <div className="dsh-grid">
        <div className="dsh-col dsh-col-main">
          <DashCalendar events={events} isCamp={isCamp} onAdd={addEvent} onDelete={deleteEvent} />
          {isCamp && <CampPanel />}
        </div>
        <div className="dsh-col dsh-col-side">
          <SqlProgress user={user} />
          <FocusTimer />
          <NotesTasks />
          <DailyQuestion />
        </div>
      </div>
    </section>
  )
}
