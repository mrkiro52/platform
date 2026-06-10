import { useState, useEffect, useRef } from 'react'
import { SCHEDULE, LIBRARY, HW_LINKS, TYPE_BADGE, TYPE_LABELS } from '../data'
import { api } from '../api'
import { SkeletonNewsCard, SkeletonCampProgress, SkeletonEventCard } from '../components/Skeleton'

const RU_MONTHS  = ['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря']
const RU_WEEKDAY = ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота']

function CampProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const months = [
    { label:'Июнь',   total:30, start: new Date(2026, 5, 1) },
    { label:'Июль',   total:31, start: new Date(2026, 6, 1) },
    { label:'Август', total:31, start: new Date(2026, 7, 1) },
  ]
  return (
    <div className="camp-progress">
      {months.map(m => {
        let done = 0
        const segs = Array.from({ length: m.total }, (_, i) => {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          const isToday = d.getTime() === today.getTime()
          const isPast  = d < today
          if (isToday || isPast) done++
          return { isToday, isPast }
        })
        return (
          <div key={m.label} className="camp-month-bar">
            <div className="camp-month-head">
              <span className="camp-month-name">{m.label}</span>
              <span className="camp-month-pct">{done}/{m.total} · {Math.round(done/m.total*100)}%</span>
            </div>
            <div className="camp-segs">
              {segs.map((s, i) => (
                <div key={i} className={`camp-seg${s.isToday ? ' s-today' : s.isPast ? ' s-past' : ''}`} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function fmt(s) {
  const h = Math.floor(s/3600), m = Math.floor((s%3600)/60), sec = s%60
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`
}

export default function Dashboard({ onOpenDay, onNavigate }) {
  const [announcements, setAnnouncements] = useState([])
  const [schedule, setSchedule] = useState(SCHEDULE)
  const [library, setLibrary]   = useState(LIBRARY)
  const [notes, setNotes]       = useState(() => localStorage.getItem('kiro_notes') || '')
  const [loading, setLoading]   = useState(true)

  const [timerH, setTimerH] = useState(0)
  const [timerM, setTimerM] = useState(25)
  const [timerS, setTimerS] = useState(0)
  const [timerLeft, setTimerLeft]   = useState(null)
  const [timerRunning, setTimerRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500 // минимум 0.5 сек показываем скелетоны

    Promise.all([
      api.announcements().then(setAnnouncements).catch(() => {}),
      api.schedule().then(setSchedule).catch(() => {}),
      api.library().then(setLibrary).catch(() => {}),
    ]).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        setTimerLeft(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); setTimerRunning(false); return 0 }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [timerRunning])

  const totalSecs = timerH * 3600 + timerM * 60 + timerS
  const startTimer = () => { if (timerLeft === null) setTimerLeft(totalSecs); setTimerRunning(true) }
  const pauseTimer = () => setTimerRunning(false)
  const resetTimer = () => { setTimerRunning(false); setTimerLeft(null) }

  const handleNotes = (e) => {
    setNotes(e.target.value)
    localStorage.setItem('kiro_notes', e.target.value)
  }

  const today    = new Date()
  const isJune26 = today.getFullYear() === 2026 && today.getMonth() === 5
  const todayDay = isJune26 ? today.getDate() : null
  const todayHwUrl  = todayDay ? HW_LINKS[todayDay] : null
  const allLibDays  = library.flatMap(wk => wk.days)
  const todayLibDay = todayDay ? allLibDays.find(d => (d.num ?? d.id) === todayDay) : null
  const upcoming    = schedule.filter(e => todayDay ? e.day >= todayDay : true).slice(0, 3)
  const dateLabel   = `${RU_WEEKDAY[today.getDay()]}, ${today.getDate()} ${RU_MONTHS[today.getMonth()]} ${today.getFullYear()}`

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Дэшборд</h1>
        <p className="page-subtitle" style={{ textTransform:'capitalize' }}>{dateLabel}</p>
      </div>

      {loading ? <SkeletonCampProgress /> : <CampProgress />}

      <div className="dash-grid">
        {/* LEFT */}
        <div className="dash-col">
          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Новости и обновления</span>
            </div>
            {loading
              ? [1, 2].map(i => <SkeletonNewsCard key={i} />)
              : announcements.length === 0
              ? <p style={{ color:'var(--text-tertiary)', fontSize:13, padding:'4px 0' }}>Объявлений пока нет</p>
              : announcements.slice(0, 3).map((n, i) => (
                <div key={n.id} className="news-card fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="news-card-head">
                    <span className="news-card-title">{n.icon || '📢'} {n.title}</span>
                    <span className="news-card-date">{n.published_at}</span>
                  </div>
                  <div className="news-card-text">{n.text}</div>
                </div>
              ))
            }
            {!loading && announcements.length > 3 && (
              <div className="dash-nav-link" style={{ marginTop: 10 }} onClick={() => onNavigate('announcements')}>
                Показать еще →
              </div>
            )}
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Заметки</span>
              <button
                onClick={() => { setNotes(''); localStorage.removeItem('kiro_notes') }}
                style={{ fontSize:12, color:'var(--text-tertiary)', background:'none', border:'none', cursor:'pointer' }}
              >
                Очистить
              </button>
            </div>
            <textarea
              className="notes-area"
              value={notes}
              onChange={handleNotes}
              placeholder="Пиши здесь что угодно — сохраняется автоматически"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="dash-col">
          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">{todayDay ? `Сегодня — День ${todayDay}` : 'Сегодня'}</span>
            </div>
            {!todayDay ? (
              <p style={{ color:'var(--text-tertiary)', fontSize:13 }}>Лагерь ещё не начался или завершился</p>
            ) : (
              <>
                {todayHwUrl && (
                  <a href={todayHwUrl} target="_blank" rel="noopener" className="today-block">
                    <div>
                      <div className="today-block-label">Домашнее задание</div>
                      <div className="today-block-link">Открыть папку с ДЗ →</div>
                    </div>
                  </a>
                )}
                {todayLibDay && (
                  <>
                    <div
                      className="today-block"
                      style={todayLibDay.mats?.length ? { cursor:'pointer' } : undefined}
                      onClick={todayLibDay.mats?.length ? () => onOpenDay(todayLibDay) : undefined}
                    >
                      <div>
                        <div className="today-block-label">Материалы дня</div>
                        <div className="today-block-text">{todayLibDay.title}{todayLibDay.mats?.length ? ' →' : ''}</div>
                      </div>
                    </div>
                    <div className="dash-nav-link" onClick={() => onNavigate('library')}>Все материалы →</div>
                  </>
                )}
              </>
            )}
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Ближайшие события</span>
            </div>
            {loading
              ? [1, 2, 3].map(i => <SkeletonEventCard key={i} />)
              : upcoming.length === 0
              ? <p style={{ color:'var(--text-tertiary)', fontSize:13 }}>Событий нет</p>
              : upcoming.map((e, i) => (
                <div key={i} className="event-mini fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className="event-mini-day">День {e.day}</div>
                  <div className="event-mini-title">{e.title}</div>
                  <span className={`badge ${TYPE_BADGE[e.type]||'badge--gray'}`} style={{ flexShrink:0 }}>
                    {TYPE_LABELS[e.type]||e.type}
                  </span>
                </div>
              ))
            }
            <div className="dash-nav-link" style={{ marginTop:10 }} onClick={() => onNavigate('schedule')}>Все события →</div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Таймер</span>
            </div>
            {timerLeft !== null ? (
              <div className={`timer-display${timerLeft === 0 ? ' timer-done' : ''}`}>
                {timerLeft === 0 ? 'Время вышло!' : fmt(timerLeft)}
              </div>
            ) : (
              <div className="timer-setup">
                <input type="number" min="0" max="23" value={timerH}
                  onChange={e => setTimerH(Math.max(0, Math.min(23, +e.target.value||0)))} />
                <span>ч</span>
                <input type="number" min="0" max="59" value={timerM}
                  onChange={e => setTimerM(Math.max(0, Math.min(59, +e.target.value||0)))} />
                <span>мин</span>
                <input type="number" min="0" max="59" value={timerS}
                  onChange={e => setTimerS(Math.max(0, Math.min(59, +e.target.value||0)))} />
                <span>сек</span>
              </div>
            )}
            <div className="timer-btns">
              {timerLeft === null
                ? <button className="timer-btn-start" onClick={startTimer} disabled={totalSecs === 0}>Старт</button>
                : timerRunning
                  ? <button className="timer-btn-pause" onClick={pauseTimer}>Пауза</button>
                  : timerLeft > 0
                    ? <button className="timer-btn-start" onClick={startTimer}>Продолжить</button>
                    : null
              }
              {timerLeft !== null && (
                <button className="timer-btn-reset" onClick={resetTimer}>Сбросить</button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
