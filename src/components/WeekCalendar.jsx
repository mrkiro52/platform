import { useState, useEffect } from 'react'
import { api } from '../api'
import { groupCallOn } from '../data/autumnCalls'

const WD = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн',
                      'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']

function pad(n) { return String(n).padStart(2, '0') }
function isoOf(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

// Семь дней начиная с сегодняшнего
function nextSevenDays() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    return d
  })
}

export default function WeekCalendar() {
  const [myCalls, setMyCalls] = useState([])

  useEffect(() => {
    // Календарь не должен ломать дэшборд, если записей нет или ручка недоступна
    api.myCalls().then(setMyCalls).catch(() => setMyCalls([]))
  }, [])

  const days = nextSevenDays()
  const todayIso = isoOf(days[0])

  return (
    <div className="week-cal">
      {days.map(day => {
        const iso = isoOf(day)
        const group = groupCallOn(day)
        const mine = myCalls.find(c => c.date === iso)
        const isToday = iso === todayIso

        return (
          <div key={iso} className={`week-cal-day${isToday ? ' is-today' : ''}`}>
            <div className="week-cal-head">
              <span className="week-cal-wd">{isToday ? 'сегодня' : WD[day.getDay()]}</span>
              <span className="week-cal-date">{day.getDate()} {MONTHS_SHORT[day.getMonth()]}</span>
            </div>

            <div className="week-cal-events">
              {group && (
                <div className="week-cal-chip is-group" title={group.topic || 'Групповой созвон'}>
                  <span className="week-cal-chip-label">Групповой</span>
                  <span className="week-cal-chip-note">{group.topic || 'созвон лагеря'}</span>
                </div>
              )}

              {mine && (
                <div className="week-cal-chip is-mine" title={`Индивидуальный созвон, ${pad(mine.hour)}:00`}>
                  <span className="week-cal-chip-label">Личный</span>
                  <span className="week-cal-chip-note">{pad(mine.hour)}:00–{pad(mine.hour + 1)}:00</span>
                </div>
              )}

              {!group && !mine && <div className="week-cal-empty">—</div>}
            </div>
          </div>
        )
      })}
    </div>
  )
}
