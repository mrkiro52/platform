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
  own:   'Моё событие',
}

// Сетка месяца с понедельника: 6 недель, чтобы высота не прыгала
function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const shift = (first.getDay() + 6) % 7
  const start = new Date(year, month, 1 - shift)
  return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
}

function EventRow({ event, onDelete, onOpen, showDate }) {
  return (
    <div className={`dsh-ev is-${event.type}`}>
      <span className={`dsh-ev-time${event.time ? '' : ' is-allday'}`}>{event.time || (event.type === 'own' ? 'весь день' : '—')}</span>
      <div className="dsh-ev-body">
        {showDate && <div className="dsh-ev-date">{dayLabel(event.date)}</div>}
        <div className="dsh-ev-title">
          {event.link
            ? <button type="button" className="dsh-ev-link" onClick={() => onOpen(event.link)}>{event.title}</button>
            : event.title}
        </div>
        {event.note && <div className="dsh-ev-note">{event.note}</div>}
      </div>
      {event.type === 'own' && (
        <button type="button" className="dsh-ev-del" onClick={() => onDelete(event.id)} aria-label="Удалить событие" title="Удалить">×</button>
      )}
    </div>
  )
}

export default function DashCalendar({ events, isCamp, onAdd, onDelete }) {
  const navigate = useNavigate()
  const today = new Date()
  const todayIso = isoOf(today)
  const [view, setView] = useState({ y: today.getFullYear(), m: today.getMonth() })
  const [selected, setSelected] = useState(todayIso)
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  const byDay = useMemo(() => {
    const map = {}
    for (const e of events) (map[e.date] ||= []).push(e)
    return map
  }, [events])

  const cells = monthGrid(view.y, view.m)
  const dayEvents = byDay[selected] || []
  const later = upcoming(events).filter(e => e.date > selected).slice(0, 4)
  const legend = isCamp ? Object.keys(TYPES) : ['own']

  const shiftMonth = (delta) => setView(v => {
    const d = new Date(v.y, v.m + delta, 1)
    return { y: d.getFullYear(), m: d.getMonth() }
  })
  const goToday = () => { setView({ y: today.getFullYear(), m: today.getMonth() }); setSelected(todayIso) }

  const submit = (e) => {
    e.preventDefault()
    const text = title.trim()
    if (!text) return
    onAdd({ id: `own-${Date.now()}`, date: selected, time: time || null, title: text })
    setTitle('')
    setTime('')
    setAdding(false)
  }

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
                  onClick={() => { setSelected(iso); setAdding(false) }}
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
          <div className="dsh-cal-legend">
            {legend.map(t => <span key={t}><i className={`dot-${t}`} />{TYPES[t]}</span>)}
          </div>
        </div>

        <div className="dsh-cal-side">
          <div className="dsh-cal-side-head">
            <span className="dsh-cal-side-title">{dayLabel(selected)}</span>
            {!adding && (
              <button type="button" className="dsh-add-btn" onClick={() => setAdding(true)}>+ Событие</button>
            )}
          </div>

          {adding && (
            <form className="dsh-add-form" onSubmit={submit}>
              <input
                id="dsh-event-title"
                className="dsh-input"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Например: дедлайн ДЗ, собеседование"
                maxLength={80}
                autoFocus
              />
              <div className="dsh-add-row">
                <input id="dsh-event-time" className="dsh-input dsh-input-time" type="time" value={time} onChange={e => setTime(e.target.value)} aria-label="Время, необязательно" />
                <button type="submit" className="dsh-btn-primary" disabled={!title.trim()}>Добавить</button>
                <button type="button" className="dsh-btn-ghost" onClick={() => setAdding(false)}>Отмена</button>
              </div>
            </form>
          )}

          {dayEvents.length === 0 && !adding && (
            <p className="dsh-muted">В этот день ничего нет. Добавь своё событие — оно сохранится в этом браузере.</p>
          )}
          {dayEvents.map(e => <EventRow key={e.id} event={e} onDelete={onDelete} onOpen={navigate} />)}

          {later.length > 0 && (
            <>
              <div className="dsh-cal-later">Дальше</div>
              {later.map(e => <EventRow key={e.id} event={e} onDelete={onDelete} onOpen={navigate} showDate />)}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
