import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { isoOf, dayLabel, upcoming } from '../../lib/dashEvents'

const MONTHS = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

const TYPES = {
  group: 'Групповой созвон',
  math:  'Математика',
  mine:  'Личный созвон',
}

// Сетка месяца с понедельника: 6 недель, чтобы высота не прыгала
function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const shift = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - shift)
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
}

function EventRow({ event, onOpen, showDate }) {
  return (
    <div className={`dsh-ev is-${event.type}`}>
      <span className={`dsh-ev-time${event.time ? '' : ' is-allday'}`}>{event.time || '—'}</span>
      <div className="dsh-ev-body">
        {showDate && <div className="dsh-ev-date">{dayLabel(event.date)}</div>}
        <div className="dsh-ev-title">
          {event.link
            ? <button type="button" className="dsh-ev-link" onClick={() => onOpen(event.link)}>{event.title}</button>
            : event.title}
        </div>
        {event.note && <div className="dsh-ev-note">{event.note}</div>}
      </div>
    </div>
  )
}

export default function DashCalendar({ events, isCamp }) {
  const navigate = useNavigate()
  const today = new Date()
  const todayIso = isoOf(today)
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState(todayIso)

  const byDay = useMemo(() => {
    const map = {}
    for (const e of events) (map[e.date] ||= []).push(e)
    return map
  }, [events])

  const cells = monthGrid(view.y, view.m)
  const dayEvents = byDay[selected] || []
  const later = upcoming(events).filter(e => e.date > selected).slice(0, 4)

  const shiftMonth = (delta) => setView(v => {
    const d = new Date(v.y, v.m + delta, 1)
    return { y: d.getFullYear(), m: d.getMonth() }
  })
  const goToday = () => { setView({ y: today.getFullYear(), m: today.getMonth() }); setSelected(todayIso) }

  return (
    <div className="widget dsh-cal">
      <div className="widget-header">
        <span className="widget-title">Календарь</span>
        <div className="dsh-cal-nav">
          <button type="button" onClick={() => shiftMonth(-1)} aria-label="Предыдущий месяц">‹</button>
          <span className="dsh-cal-month">{MONTHS[view.m]} {view.y}</span>
          <button type="button" onClick={() => shiftMonth(1)} aria-label="Следующий месяц">›</button>
          <button type="button" className="dsh-cal-today" onClick={goToday}>Сегодня</button>
        </div>
      </div>

      <div className="dsh-cal-body">
        <div className="dsh-cal-grid-wrap">
          <div className="dsh-cal-grid">
            {WD.map(w => <div key={w} className="dsh-cal-wd">{w}</div>)}
            {cells.map(d => {
              const iso = isoOf(d)
              const list = byDay[iso] || []
              const types = [...new Set(list.map(e => e.type))]
              const cls = [
                'dsh-cal-day',
                d.getMonth() !== view.m && 'is-out',
                iso === todayIso && 'is-today',
                iso === selected && 'is-selected',
                list.length > 0 && 'has-events',
              ].filter(Boolean).join(' ')
              return (
                <button
                  key={iso}
                  type="button"
                  className={cls}
                  onClick={() => setSelected(iso)}
                  aria-label={`${d.getDate()} ${MONTHS[d.getMonth()].toLowerCase()}${list.length ? `, событий: ${list.length}` : ''}`}
                >
                  <span className="dsh-cal-num">{d.getDate()}</span>
                  <span className="dsh-cal-dots">
                    {types.slice(0, 3).map(t => <i key={t} className={`dot-${t}`} />)}
                  </span>
                </button>
              )
            })}
          </div>
          {isCamp && (
          <div className="dsh-cal-legend">
            {Object.keys(TYPES).map(t => <span key={t}><i className={`dot-${t}`} />{TYPES[t]}</span>)}
          </div>
          )}
        </div>

        <div className="dsh-cal-side">
          <div className="dsh-cal-side-head">
            <span className="dsh-cal-side-title">{dayLabel(selected)}</span>
          </div>

          {dayEvents.length === 0 && (
            <p className="dsh-muted">{isCamp ? 'В этот день событий нет.' : 'В этот день событий нет. Здесь появятся созвоны и занятия, когда ты станешь участником лагеря.'}</p>
          )}
          {dayEvents.map(e => <EventRow key={e.id} event={e} onOpen={navigate} />)}

          {later.length > 0 && (
            <>
              <div className="dsh-cal-later">Дальше</div>
              {later.map(e => <EventRow key={e.id} event={e} onOpen={navigate} showDate />)}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
