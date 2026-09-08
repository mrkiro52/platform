import { useState, useEffect, useCallback } from 'react'
import { api } from '../api'

// Слоты часовые: 08:00–09:00 … 22:00–23:00
function pad(n) { return String(n).padStart(2, '0') }
function slotLabel(hour) { return `${pad(hour)}:00–${pad(hour + 1)}:00` }

const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WEEKDAYS = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

function humanDate(iso) {
  const d = new Date(iso + 'T00:00:00')
  return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${WEEKDAYS[d.getDay()]}`
}

function Spinner() {
  return <span className="call-spinner" aria-hidden="true" />
}

function Slot({ slot, pending, justDone, dimmed, onBook, onCancel }) {
  // Слот, по которому прямо сейчас идёт запрос: спиннер и подпись,
  // чтобы человек видел, что нажатие поймано и что-то происходит.
  if (pending) {
    return (
      <span className="call-slot-btn is-pending" aria-busy="true">
        <span className="call-slot-time">{slotLabel(slot.hour)}</span>
        <span className="call-slot-note">
          <Spinner />
          {pending === 'cancel' ? 'отменяем…' : 'бронируем…'}
        </span>
      </span>
    )
  }

  if (slot.mine) {
    return (
      <button
        type="button"
        className={`call-slot-btn is-mine${justDone ? ' is-just-done' : ''}${dimmed ? ' is-dimmed' : ''}`}
        disabled={dimmed}
        onClick={() => onCancel(slot.id)}
        title="Нажми, чтобы отменить свою запись"
      >
        <span className="call-slot-time">{slotLabel(slot.hour)}</span>
        <span className="call-slot-note">
          {justDone ? '✓ забронировано' : 'твоя запись — отменить'}
        </span>
      </button>
    )
  }

  if (slot.taken) {
    return (
      <span className="call-slot-btn is-taken" aria-disabled="true">
        <span className="call-slot-time">{slotLabel(slot.hour)}</span>
        <span className="call-slot-note">занято</span>
      </span>
    )
  }

  return (
    <button
      type="button"
      className={`call-slot-btn${dimmed ? ' is-dimmed' : ''}`}
      disabled={dimmed}
      onClick={() => onBook(slot.id)}
    >
      <span className="call-slot-time">{slotLabel(slot.hour)}</span>
      <span className="call-slot-note">свободно</span>
    </button>
  )
}

function Session({ session, onReplace }) {
  // pending — по какому слоту идёт запрос и какой именно ('book' | 'cancel').
  // success — подтверждение после удачного ответа, само гаснет через 6 секунд.
  const [pending, setPending] = useState(null)
  const [success, setSuccess] = useState(null)
  const [warning, setWarning] = useState('')

  const busy = pending !== null
  const mySlot = session.days.flatMap(d => d.slots.map(s => ({ ...s, date: d.date }))).find(s => s.mine)

  // Подтверждение не висит вечно — но и не исчезает раньше, чем его прочитают.
  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(null), 6000)
    return () => clearTimeout(timer)
  }, [success])

  const book = async (slotId) => {
    setPending({ id: slotId, kind: 'book' })
    setWarning('')
    setSuccess(null)
    try {
      const res = await api.bookSlot(slotId)
      if (res.session) {
        onReplace(res.session)
        const booked = res.session.days
          .flatMap(d => d.slots.map(x => ({ ...x, date: d.date })))
          .find(x => x.mine)
        setSuccess({
          id: slotId,
          text: booked
            ? `Готово, ты записан: ${humanDate(booked.date)}, ${slotLabel(booked.hour)}`
            : 'Готово, запись сохранена',
        })
      }
    } catch (err) {
      // 409 — слот успели занять, пока студент выбирал. Сервер отдаёт
      // свежий набор, поэтому сетка перерисовывается сразу с предупреждением.
      if (err.status === 409) {
        setWarning(err.message || 'Слот только что заняли. Выбери другое время.')
        try {
          const fresh = await api.openCalls()
          const updated = fresh.find(s => s.id === session.id)
          if (updated) onReplace(updated)
        } catch { /* обновим при следующем открытии страницы */ }
      } else {
        setWarning(err.message || 'Не получилось записаться, попробуй ещё раз')
      }
    } finally {
      setPending(null)
    }
  }

  const cancel = async (slotId) => {
    setPending({ id: slotId, kind: 'cancel' })
    setWarning('')
    setSuccess(null)
    try {
      const res = await api.cancelSlot(slotId)
      if (res.session) {
        onReplace(res.session)
        setSuccess({ id: null, text: 'Запись отменена — слот снова свободен' })
      }
    } catch (err) {
      setWarning(err.message || 'Не получилось отменить запись')
    } finally {
      setPending(null)
    }
  }

  const totalFree = session.days.flatMap(d => d.slots).filter(s => !s.taken).length

  return (
    <div className="call-session-card">
      <div className="call-session-top">
        <div>
          <div className="call-session-name">{session.title}</div>
          <div className="call-session-hint">
            {mySlot
              ? `Ты записан: ${humanDate(mySlot.date)}, ${slotLabel(mySlot.hour)}`
              : totalFree
                ? `Свободных слотов: ${totalFree}. Выбери один — можно поменять в любой момент.`
                : 'Свободных слотов не осталось'}
          </div>
        </div>
        {mySlot && <span className="badge badge--green">записан</span>}
      </div>

      {busy && (
        <div className="call-status is-busy" role="status">
          <Spinner />
          {pending.kind === 'cancel' ? 'Отменяем запись…' : 'Бронируем слот…'}
        </div>
      )}

      {success && !busy && (
        <div className="call-status is-success" role="status">
          <span className="call-status-check" aria-hidden="true">✓</span>
          {success.text}
        </div>
      )}

      {warning && <div className="call-warning">{warning}</div>}

      {session.days.length === 0 ? (
        <div className="call-empty-note">Дни ещё не назначены — загляни позже.</div>
      ) : (
        session.days.map(day => (
          <div key={day.date} className="call-day-block">
            <div className="call-day-title">{humanDate(day.date)}</div>
            <div className="call-slots">
              {day.slots.map(slot => (
                <Slot
                  key={slot.id}
                  slot={slot}
                  pending={pending && pending.id === slot.id ? pending.kind : null}
                  justDone={!!success && success.id !== null && slot.mine}
                  dimmed={busy && (!pending || pending.id !== slot.id)}
                  onBook={book}
                  onCancel={cancel}
                />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default function CallBooking() {
  const [sessions, setSessions] = useState(null)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setSessions(await api.openCalls())
    } catch (err) {
      setError(err.message || 'Не удалось загрузить записи')
      setSessions([])
    }
  }, [])

  useEffect(() => { load() }, [load])

  const replaceSession = (updated) => {
    setSessions(prev => (prev || []).map(s => (s.id === updated.id ? updated : s)))
  }

  if (sessions === null) {
    return <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>Загружаем…</p>
  }

  if (error) {
    return <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-tertiary)' }}>{error}</p>
  }

  if (!sessions.length) {
    return (
      <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        Сейчас нет открытых записей на созвон. Как только откроется ближайший — он появится здесь.
      </p>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {sessions.map(session => (
        <Session key={session.id} session={session} onReplace={replaceSession} />
      ))}
    </div>
  )
}
