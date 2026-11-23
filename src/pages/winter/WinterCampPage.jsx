import { useEffect, useMemo, useState } from 'react'
import { api } from '../../api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  WINTER, WINTER_MONTHS, WINTER_WEEKS, EVENT_TYPES,
  campProgress, monthProgress, winterEvents, personalCallEvents, upcomingEvents,
  isoOf, dateOf, humanDate, shortDate,
} from '../../data/winter/schedule'
import {
  WINTER_CONTACT, winterDirectionOf, winterProgram, winterTasks,
} from '../../data/winter'
import { summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { plural } from '../../components/winter/winterLocal'
import { chapterUrl, winterRoute } from '../../data/winter/route'
import WinterChapterCard from '../../components/winter/WinterChapterCard'
import { ChevronRightIcon } from '../../components/icons'
import '../../winter.css'

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MAIN_TYPES = Object.fromEntries(Object.entries(EVENT_TYPES).filter(([k]) => k !== 'math'))
const BY_DIRECTION = new Set(['base', 'core', 'final'])

function Snowflake({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      <path d="m9.5 3.5 2.5 2.5 2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.5 9.5 6 12l-2.5 2.5M20.5 9.5 18 12l2.5 2.5" />
    </svg>
  )
}

function stageTitle(stage, direction) {
  return `${stage.title}${direction && BY_DIRECTION.has(stage.key) ? ` · ${direction.short}` : ''}`
}

// ── Прогресс по блоку и главам ───────────────────────────────────────────────

function StackedBar({ sum, thin = false }) {
  return (
    <span className={`wc-bar is-stacked${thin ? ' is-thin' : ''}`} aria-hidden="true">
      {sum.total > 0 && <>
        <span className="is-approved" style={{ width: `${(sum.approved / sum.total) * 100}%` }} />
        <span className="is-submitted" style={{ width: `${(sum.submitted / sum.total) * 100}%` }} />
        <span className="is-rework" style={{ width: `${(sum.rework / sum.total) * 100}%` }} />
      </>}
    </span>
  )
}

// ── Шапка: лагерь, направление, прогресс по месяцам ──────────────────────────

function TopBar({ direction }) {
  return (
    <header className="wc-top">
      <div className="wc-top-main">
        <span className="wc-top-flake"><Snowflake size={20} /></span>
        <div className="wc-top-text">
          <h1 className="wc-top-title">Winter Camp <span>{WINTER.season}</span></h1>
          <div className="wc-top-chips">
            {direction
              ? <span className="wc-chip is-accent">Направление · {direction.name}</span>
              : <a className="wc-chip is-warn" href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">Направление не выбрано → {WINTER_CONTACT.handle}</a>}
          </div>
        </div>
      </div>

    </header>
  )
}

// ── Программа: три месяца по четыре недели ───────────────────────────────────

function TimingProgress({ progress, now }) {
  return (
    <div className="wc-top-progress" aria-label={`Прогресс лагеря: ${progress.pct}%`}>
        <div className="wc-top-progress-head">
          <span className="wc-top-pct">{progress.pct}%</span>
          <span className="wc-top-sub">{progress.phase === 'before' ? `старт ${humanDate(WINTER.start)}` : progress.phase === 'after' ? 'все 90 дней' : `день ${progress.day} из ${progress.total}`}</span>
        </div>
        <div className="wc-top-months">
          {WINTER_MONTHS.map(m => {
            const p = monthProgress(m, now)
            return (
              <div key={m.key} className={`wc-top-month is-${p.state}`}>
                <span className="wc-bar is-thin" role="progressbar" aria-label={`${m.label}: прошло ${p.done} из ${p.total} дней`} aria-valuemin={0} aria-valuemax={p.total} aria-valuenow={p.done}>
                  <span style={{ width: `${p.pct}%` }} />
                </span>
                <span className="wc-top-month-name">{m.label} <em>{m.theme}</em></span>
              </div>
            )
          })}
        </div>
      </div>
  )
}

function ModuleCards({ mod, entries, homework }) {
  const cards = list => <div className="wc-chs">{list.map(entry => (
    <WinterChapterCard key={entry.key} entry={entry} homework={homework.byKey[entry.key]} />
  ))}</div>

  return (
    <section className="wc-dm">
      <div className="wc-dm-info">
        <h4 className="wc-dm-name">{mod.name}</h4>
        <p className="wc-dm-lead">{mod.lead}</p>
      </div>
      {mod.express?.length > 0 && <div className="prg-express-row">
        {mod.express.map(ch => <Link key={ch.ref} className="wc-more" to={chapterUrl({ mod, ch })}>{ch.label || ch.title}</Link>)}
      </div>}
      {mod.groups ? mod.groups.map(group => (
        <section key={group.level}>
          <h5 className="wc-dm-group">{group.title}</h5>
          {cards(entries.filter(entry => entry.ch.level === group.level))}
        </section>
      )) : cards(entries)}
    </section>
  )
}

function Program({ program, route, active, onSelect, homework, direction }) {
  return (
    <section className="wc-section" aria-labelledby="wc-program-title">
      <h2 id="wc-program-title" className="wc-section-title">Основная программа</h2>
      <nav className="wc-plan wc-month-picker" aria-label="Месяцы программы">
        {program.map(({ month }) => {
          const { key, label, theme } = WINTER_MONTHS.find(item => item.n === month)
          return (
            <button key={key} type="button" className="wc-plan-month" aria-pressed={month === active.month}
              aria-controls="wc-month-content" onClick={() => onSelect(month)}>
              <span className="wc-plan-title">{label}</span>
              <span className="wc-month-theme">{theme}</span>
            </button>
          )
        })}
      </nav>
      <div className="wc-detail" id="wc-month-content">
        {active.stages.map(stage => (
          <section key={stage.key} className="wc-detail">
            <h3 className="wc-detail-title">{stageTitle(stage, direction)}</h3>
            {stage.needsDirection ? (
              <p className="wc-stage-empty">Чтобы открыть главы этого этапа, выбери направление через <a href={WINTER_CONTACT.url}>{WINTER_CONTACT.handle}</a>.</p>
            ) : stage.modules.map(mod => (
              <ModuleCards key={mod.key} mod={mod} entries={route.filter(entry => entry.stage === stage && entry.mod === mod)} homework={homework} />
            ))}
          </section>
        ))}
      </div>
    </section>
  )
}

const PANELS = { calendar: 'Календарь событий', homework: 'Учебный процесс', timing: 'Прогресс лагеря' }
const PANEL_ORDER_KEY = 'kiro_winter_panel_order'

function loadPanelOrder() {
  const defaults = Object.keys(PANELS)
  try {
    const stored = JSON.parse(localStorage.getItem(PANEL_ORDER_KEY))
    if (Array.isArray(stored)) return [...new Set([...stored.filter(id => Object.hasOwn(PANELS, id)), ...defaults])]
  } catch { /* Хранилище недоступно или порядок повреждён */ }
  return defaults
}

// ── Итоги домашних заданий ───────────────────────────────────────────────────

function Donut({ sum }) {
  const r = 34, c = 2 * Math.PI * r
  const part = n => (sum.total ? (n / sum.total) * c : 0)
  const a = part(sum.approved), s = part(sum.submitted), w = part(sum.rework)
  return (
    <svg className="wc-donut" viewBox="0 0 84 84" role="img" aria-label={`Принято ${sum.approved} из ${sum.total} заданий`}>
      <circle cx="42" cy="42" r={r} className="wc-donut-track" />
      <circle cx="42" cy="42" r={r} className="wc-donut-seg is-approved" strokeDasharray={`${a} ${c - a}`} strokeDashoffset={0} />
      <circle cx="42" cy="42" r={r} className="wc-donut-seg is-submitted" strokeDasharray={`${s} ${c - s}`} strokeDashoffset={-a} />
      <circle cx="42" cy="42" r={r} className="wc-donut-seg is-rework" strokeDasharray={`${w} ${c - w}`} strokeDashoffset={-(a + s)} />
      <text x="42" y="40" className="wc-donut-num">{sum.approved}</text>
      <text x="42" y="54" className="wc-donut-sub">из {sum.total}</text>
    </svg>
  )
}

function HomeworkProgress({ tasks, homework }) {
  const required = tasks.filter(t => t.required)
  const sum = summarize(required, homework.byKey)
  return (
    <section className="wc-card wc-hw" aria-labelledby="wc-hw-title">
      <div className="wc-card-head">
        <h2 id="wc-hw-title" className="wc-card-title">Итоги домашних заданий</h2>
        <span className="wc-card-value">{homework.loading ? '…' : `${sum.pct}%`}</span>
      </div>
      <div className="wc-hw-body">
        <Donut sum={sum} />
        <ul className="wc-legend">
          <li className="is-approved"><i />принято<b>{sum.approved}</b></li>
          <li className="is-submitted"><i />на проверке<b>{sum.submitted}</b></li>
          <li className="is-rework"><i />нужны правки<b>{sum.rework}</b></li>
          <li className="is-todo"><i />не сдано<b>{sum.todo}</b></li>
        </ul>
      </div>
      <div className="wc-hw-months">
        {WINTER_MONTHS.map(m => {
          const ms = summarize(required.filter(t => t.month === m.n), homework.byKey)
          return (
            <div key={m.key} className="wc-hw-month">
              <span className="wc-hw-month-name">{m.label}</span>
              <StackedBar sum={ms} />
              <span className="wc-hw-month-num">{ms.total ? `${ms.approved}/${ms.total}` : '—'}</span>
            </div>
          )
        })}
      </div>
      {homework.error && <p className="wc-card-foot">{homework.error}</p>}
    </section>
  )
}

function VacanciesLink() {
  const navigate = useNavigate()
  return (
    <button type="button" className="wc-vac" onClick={() => navigate('/winter-camp/vacancies')}>
      <span className="wc-vac-title">Вакансии и контакты</span>
      <span className="wc-vac-text">стажировки и junior-позиции для участников</span>
      <span className="wc-vac-go" aria-hidden="true">→</span>
    </button>
  )
}

// ── Календарь событий ────────────────────────────────────────────────────────

function monthGrid(year, month) {
  const first = new Date(year, month, 1)
  const shift = (first.getDay() + 6) % 7
  return Array.from({ length: 42 }, (_, i) => new Date(year, month, 1 - shift + i))
}

function EventCard({ event, now, showDate = false }) {
  const past = upcomingEvents([event], now).length === 0
  return (
    <div className={`wc-ev${past ? ' is-past' : ''}`}>
      <div className="wc-ev-top">
        <span className={`wc-ev-type is-${event.type}`}><i />{EVENT_TYPES[event.type].short}</span>
        <span className="wc-ev-when">
          {showDate && <b>{shortDate(event.date)}</b>}
          {event.time ? `${event.time} МСК` : 'время объявим в чате'}
        </span>
      </div>
      <div className="wc-ev-title">{event.title}</div>
      <div className="wc-ev-note">{event.note}</div>
      {event.videos.map(v => (
        <a key={v.url} className="wc-ev-video" href={v.url} target="_blank" rel="noopener noreferrer">▶ {v.label}</a>
      ))}
      {past && event.videos.length === 0 && <span className="wc-ev-soon">запись появится здесь</span>}
    </div>
  )
}

function Calendar({ events, now }) {
  const todayIso = isoOf(now)
  // Месяцы лагеря и, если ментор назначил созвон раньше старта или после финиша, — их месяцы тоже
  const campMonths = useMemo(() => {
    const list = WINTER_MONTHS.map(m => ({ y: dateOf(m.start).getFullYear(), m: dateOf(m.start).getMonth(), label: m.label }))
    for (const e of events) {
      const d = dateOf(e.date)
      if (!list.some(c => c.y === d.getFullYear() && c.m === d.getMonth())) {
        list.push({ y: d.getFullYear(), m: d.getMonth(), label: MONTH_NAMES[d.getMonth()] })
      }
    }
    return list.sort((a, b) => a.y - b.y || a.m - b.m)
  }, [events])
  const thisMonth = campMonths.some(c => c.y === now.getFullYear() && c.m === now.getMonth())
  const initial = thisMonth ? now : todayIso < WINTER.start ? dateOf(WINTER.start) : todayIso > WINTER.end ? dateOf(WINTER.end) : now
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() })
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const shown = useMemo(() => (filter === 'all' ? events : events.filter(e => e.type === filter)), [events, filter])
  const byDay = useMemo(() => {
    const map = {}
    for (const e of shown) (map[e.date] ||= []).push(e)
    return map
  }, [shown])

  const idx = campMonths.findIndex(c => c.y === view.y && c.m === view.m)
  const cells = monthGrid(view.y, view.m)
  const monthPrefix = `${view.y}-${String(view.m + 1).padStart(2, '0')}`
  const monthEvents = shown.filter(e => e.date.startsWith(monthPrefix))
  const list = selected ? (byDay[selected] || []) : [...upcomingEvents(monthEvents, now), ...monthEvents.filter(e => !upcomingEvents([e], now).length)]
  const week = iso => WINTER_WEEKS.find(w => iso >= w.start && iso <= w.end)

  return (
    <section className="wc-card wc-cal" aria-labelledby="wc-cal-title">
      <div className="wc-card-head">
        <h2 id="wc-cal-title" className="wc-card-title">Календарь событий</h2>
        <div className="wc-tabs" role="tablist" aria-label="Месяц">
          {campMonths.map((c, i) => (
            <button key={c.label} type="button" role="tab" aria-selected={i === idx} className={i === idx ? 'is-active' : ''} onClick={() => { setView({ y: c.y, m: c.m }); setSelected(null) }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="wc-filters" role="group" aria-label="Тип события">
        <button type="button" className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>Все</button>
        {Object.entries(MAIN_TYPES).map(([key, t]) => (
          <button key={key} type="button" className={`is-${key}${filter === key ? ' is-active' : ''}`} onClick={() => setFilter(filter === key ? 'all' : key)}>
            <i />{t.label}
          </button>
        ))}
      </div>

      <div className="wc-cal-body">
        <div className="wc-cal-gridwrap">
          <div className="wc-cal-month">{MONTH_NAMES[view.m]} {view.y}</div>
          <div className="wc-cal-grid">
            {WD.map(w => <div key={w} className="wc-cal-wd">{w}</div>)}
            {cells.map(d => {
              const iso = isoOf(d)
              const dayEvents = byDay[iso] || []
              const cls = ['wc-cal-day']
              if (d.getMonth() !== view.m) cls.push('is-out')
              if (iso === todayIso) cls.push('is-today')
              if (iso === selected) cls.push('is-selected')
              if (dayEvents.length) cls.push('has-events')
              if (iso < WINTER.start || iso > WINTER.end) cls.push('is-off')
              return (
                <button
                  key={iso}
                  type="button"
                  className={cls.join(' ')}
                  onClick={() => setSelected(iso === selected ? null : iso)}
                  aria-pressed={iso === selected}
                  aria-label={`${humanDate(iso)}${dayEvents.length ? `: ${dayEvents.map(e => e.title).join(', ')}` : ''}`}
                >
                  <span className="wc-cal-num">{d.getDate()}</span>
                  <span className="wc-cal-marks">
                    {dayEvents.slice(0, 3).map(e => <i key={e.id} className={`is-${e.type}`} title={e.title} />)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="wc-cal-side">
          <div className="wc-cal-side-head">
            <span className="wc-cal-side-title">
              {selected ? humanDate(selected, { weekday: true }) : `${MONTH_NAMES[view.m]}: ${monthEvents.length} ${plural(monthEvents.length, 'событие', 'события', 'событий')}`}
            </span>
            {selected && <button type="button" className="wc-cal-reset" onClick={() => setSelected(null)}>весь месяц</button>}
          </div>
          {selected && week(selected) && <p className="wc-cal-weeknote">Неделя {week(selected).n} · {week(selected).focus}</p>}
          <div className="wc-cal-list">
            {list.length === 0 && <p className="wc-muted">{selected ? 'В этот день событий нет — время для материалов и домашек.' : 'В этом месяце событий такого типа нет.'}</p>}
            {list.map(e => <EventCard key={e.id} event={e} now={now} showDate={!selected} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function Closed() {
  return (
    <section className="page active wc-page">
      <div className="wc-card">
        <h1 className="wc-section-title">Winter Camp</h1>
        <p className="wc-muted">Раздел доступен участникам зимнего лагеря. Чтобы попасть в лагерь, напиши в Telegram{' '}
          <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>.
        </p>
      </div>
    </section>
  )
}

export default function WinterCampPage({ user }) {
  const isWinter = !!user?.isWinterCamp2027
  const [now, setNow] = useState(() => new Date())
  const homework = useWinterHomework(isWinter)
  const direction = winterDirectionOf(user)

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])

  const { hash } = useLocation()
  const [calendarOpen, setCalendarOpen] = useState(hash === '#calendar')
  useEffect(() => {
    if (!isWinter || hash !== '#calendar') return
    setCalendarOpen(true)
    const frame = requestAnimationFrame(() => document.getElementById('calendar')?.scrollIntoView({ block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [hash, isWinter])

  const program = useMemo(() => winterProgram(direction?.key), [direction?.key])
  const stages = useMemo(() => program.flatMap(m => m.stages), [program])
  const tasks = useMemo(() => winterTasks(direction?.key), [direction?.key])
  const [calls, setCalls] = useState([])
  useEffect(() => {
    if (!isWinter) return
    api.winterCalls().then(list => setCalls(list || [])).catch(() => setCalls([]))
  }, [isWinter])
  const events = useMemo(() => [...winterEvents(direction?.name, { math: false }), ...personalCallEvents(calls)]
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || '')), [direction?.name, calls])
  const route = useMemo(() => winterRoute(stages), [stages])
  const [selected, setSelected] = useState(null)
  const today = isoOf(now)
  const currentMonth = WINTER_MONTHS.find(month => today <= month.end) || WINTER_MONTHS[WINTER_MONTHS.length - 1]
  const active = program.find(month => month.month === (selected ?? currentMonth.n))
  const [panelOrder, setPanelOrder] = useState(loadPanelOrder)

  function movePanel(index, offset) {
    const target = index + offset
    if (target < 0 || target >= panelOrder.length) return
    const next = [...panelOrder]
    next[index] = panelOrder[target]
    next[target] = panelOrder[index]
    setPanelOrder(next)
    try { localStorage.setItem(PANEL_ORDER_KEY, JSON.stringify(next)) } catch { /* Порядок сохранён на время сеанса */ }
  }

  if (!isWinter) return <Closed />

  return (
    <section className="page active wc-page">
      <TopBar direction={direction} />
      <div className="wc-learning-layout">
        <Program program={program} route={route} active={active} onSelect={setSelected} homework={homework} direction={direction} />
        <aside className="wc-learning-aside" aria-label="Дополнения к программе">
          <section className="wc-card">
            <h2 className="wc-card-title">Дополнительные курсы</h2>
            <p className="wc-muted">Можно проходить параллельно.</p>
            <nav className="wc-aside-links" aria-label="Дополнительные курсы">
              <Link className="wc-link" to="/winter-camp/math">Математика</Link>
              <Link className="wc-link" to="/winter-camp/english">Английский</Link>
            </nav>
          </section>
          {panelOrder.map((id, index) => (
            <div key={id} className="wc-panel-item">
              <details id={id} className="wc-aside-panel"
                {...(id === 'calendar' ? { open: calendarOpen, onToggle: event => setCalendarOpen(event.currentTarget.open) } : {})}>
                <summary>{PANELS[id]}</summary>
                {id === 'calendar' && <Calendar events={events} now={now} />}
                {id === 'homework' && <HomeworkProgress tasks={tasks} homework={homework} />}
                {id === 'timing' && <TimingProgress progress={campProgress(now)} now={now} />}
              </details>
              <div className="wc-panel-move">
                <button type="button" disabled={index === 0} aria-label={`Переместить выше: ${PANELS[id]}`} onClick={() => movePanel(index, -1)}>
                  <ChevronRightIcon className="is-up" size={17} />
                </button>
                <button type="button" disabled={index === panelOrder.length - 1} aria-label={`Переместить ниже: ${PANELS[id]}`} onClick={() => movePanel(index, 1)}>
                  <ChevronRightIcon className="is-down" size={17} />
                </button>
              </div>
            </div>
          ))}
          <VacanciesLink />
        </aside>
      </div>
    </section>
  )
}
