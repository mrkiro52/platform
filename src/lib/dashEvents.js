// События календаря на дэшборде: групповые созвоны и математика лагеря,
// личные созвоны.

import { CALL_MONTHS } from '../data/autumnCalls'
import { MATH_SESSIONS } from '../data/mathCourse'

export function pad(n) { return String(n).padStart(2, '0') }
export function isoOf(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Время лагеря — московское. Момент начала события как Date, чтобы считать
// «через сколько» правильно в любом часовом поясе. Без времени — начало дня.
export function startOf(event) {
  if (event.time) return new Date(`${event.date}T${event.time}:00+03:00`)
  return new Date(`${event.date}T00:00:00`)
}

function campEvents() {
  const group = CALL_MONTHS.flatMap(m => m.calls.map(c => ({
    id: `group-${m.monthIndex}-${c.day}`,
    type: 'group',
    date: `2026-${pad(m.monthIndex + 1)}-${pad(c.day)}`,
    time: c.time || null,
    title: 'Групповой созвон',
    note: c.topic || 'тема будет позже',
    link: '/autumn-camp',
  })))
  const math = MATH_SESSIONS.map((s, i) => ({
    id: `math-${s.date}`,
    type: 'math',
    date: s.date,
    time: '20:00',
    title: `Математика · занятие ${i + 1}`,
    note: s.topic,
    link: '/autumn-camp/math',
  }))
  return [...group, ...math]
}

function personalCallEvents(myCalls) {
  return myCalls.map(c => ({
    id: `call-${c.id}`,
    type: 'mine',
    date: c.date,
    time: `${pad(c.hour)}:00`,
    title: 'Личный созвон',
    note: c.sessionTitle || 'индивидуальная консультация',
    link: '/autumn-camp',
  }))
}

export function allEvents({ isCamp, myCalls }) {
  if (!isCamp) return []
  const list = [...campEvents(), ...personalCallEvents(myCalls)]
  return list.sort((a, b) =>
    a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''))
}

// Ещё не прошедшие события. Событие без времени считается актуальным весь свой день,
// со временем — ещё 1,5 часа после начала (созвон идёт).
export function upcoming(events, now = new Date()) {
  const todayIso = isoOf(now)
  return events.filter(e => {
    if (!e.time) return e.date >= todayIso
    return startOf(e).getTime() + 90 * 60000 > now.getTime()
  })
}

const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WD_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']

export function dayLabel(iso, now = new Date()) {
  const d = new Date(`${iso}T00:00:00`)
  const today = new Date(now); today.setHours(0, 0, 0, 0)
  const diff = Math.round((d - today) / 86400000)
  if (diff === 0) return 'Сегодня'
  if (diff === 1) return 'Завтра'
  return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}, ${WD_SHORT[d.getDay()]}`
}

// «через 2 ч 15 мин» — для сегодняшних, «завтра», «через 3 дня», «идёт сейчас»
export function countdown(event, now = new Date()) {
  const label = dayLabel(event.date, now)
  if (label === 'Завтра') return 'завтра'
  if (label !== 'Сегодня') {
    const today = new Date(now); today.setHours(0, 0, 0, 0)
    const days = Math.round((new Date(`${event.date}T00:00:00`) - today) / 86400000)
    return `через ${days} ${days < 5 ? 'дня' : 'дней'}`
  }
  if (!event.time) return 'сегодня'
  const ms = startOf(event).getTime() - now.getTime()
  if (ms <= 0) return 'идёт сейчас'
  const mins = Math.round(ms / 60000)
  if (mins < 60) return `через ${mins} мин`
  const hours = Math.floor(mins / 60)
  return `через ${hours} ч${mins % 60 ? ` ${mins % 60} мин` : ''}`
}
