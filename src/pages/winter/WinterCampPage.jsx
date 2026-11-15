import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  WINTER, WINTER_MONTHS, WINTER_WEEKS, WINTER_MATH, EVENT_TYPES,
  campProgress, monthProgress, currentWinterWeek, winterEvents, upcomingEvents,
  isoOf, dateOf, humanDate, shortDate, rangeLabel,
} from '../../data/winter/schedule'
import {
  WINTER_CONTACT, isCountable, taskKey, winterDirectionOf, winterProgram, winterTasks,
} from '../../data/winter'
import { summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { loadVisited, plural } from '../../components/winter/winterLocal'
import '../../winter.css'

// Главная страница зимнего лагеря. Порядок блоков — по важности для студента:
// 1) шапка: где мы сейчас и прогресс лагеря;
// 2) программа текущего месяца — основная работа, к ней ведёт всё остальное;
// 3) домашние задания и быстрые ссылки: математика, английский, вакансии;
// 4) календарь событий.

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function Snowflake({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      <path d="m9.5 3.5 2.5 2.5 2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.5 9.5 6 12l-2.5 2.5M20.5 9.5 18 12l2.5 2.5" />
    </svg>
  )
}

// ── Шапка с прогрессом лагеря ────────────────────────────────────────────────

function Hero({ direction, progress, week, now }) {
  let status
  if (progress.phase === 'before') {
    status = <>До старта <b>{progress.daysTo} {plural(progress.daysTo, 'день', 'дня', 'дней')}</b>. Материалы уже открыты — можно начать раньше.</>
  } else if (progress.phase === 'after') {
    status = <>Лагерь завершён. Все материалы остаются открытыми — возвращайся к ним в любое время.</>
  } else {
    status = <>Неделя {week?.n ?? '—'}{week ? <> · {week.focus.toLowerCase()}</> : null}</>
  }

  return (
    <header className="wc-hero">
      <div className="wc-hero-snow" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>

      <div className="wc-hero-main">
        <div className="wc-brand">
          <span className="wc-brand-flake"><Snowflake size={28} /></span>
          <h1 className="wc-brand-title">Winter Camp <span className="wc-brand-season">{WINTER.season}</span></h1>
        </div>
        <p className="wc-hero-status">{status}</p>
        <div className="wc-hero-chips">
          {direction
            ? <span className="wc-chip is-accent">{direction.name}</span>
            : <span className="wc-chip is-warn">Направление ещё не выбрано</span>}
          <span className="wc-chip">{humanDate(WINTER.start)} — {humanDate(WINTER.end)}</span>
        </div>
        {!direction && (
          <p className="wc-hero-note">
            Общие блоки уже открыты. Чтобы появилась программа по направлению, напиши в Telegram{' '}
            <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>
          </p>
        )}
      </div>

      <section className="wc-hero-progress" aria-labelledby="wc-progress-title">
        <div className="wc-hero-progress-head">
          <h2 id="wc-progress-title" className="wc-label">Прогресс лагеря</h2>
          <span className="wc-hero-progress-value">{progress.pct}%</span>
        </div>
        <p className="wc-hero-progress-sub">
          {progress.phase === 'running' ? `День ${progress.day} из ${progress.total}` : progress.phase === 'before' ? `Старт ${humanDate(WINTER.start)}` : 'Все 90 дней пройдены'}
        </p>
        <div className="wc-months">
          {WINTER_MONTHS.map(m => {
            const p = monthProgress(m, now)
            return (
              <div key={m.key} className={`wc-month is-${p.state}`}>
                <div className="wc-month-top">
                  <span className="wc-month-name">{m.label}</span>
                  <span className="wc-month-theme">{m.theme}</span>
                </div>
                <div className="wc-bar" role="progressbar" aria-label={`${m.label}: прошло ${p.done} из ${p.total} дней`} aria-valuemin={0} aria-valuemax={p.total} aria-valuenow={p.done}>
                  <span style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </header>
  )
}

// ── Программа ────────────────────────────────────────────────────────────────

function stageDates(stage) {
  const weeks = stage.weeks.map(n => WINTER_WEEKS.find(w => w.n === n))
  return { start: weeks[0].start, end: weeks[weeks.length - 1].end }
}

function stageLabel(stage) {
  const { start, end } = stageDates(stage)
  const w = stage.weeks
  return `${w.length > 1 ? `Недели ${w[0]}–${w[w.length - 1]}` : `Неделя ${w[0]}`} · ${rangeLabel(start, end)}`
}

function ModuleCard({ mod, homework, visited, state }) {
  const navigate = useNavigate()
  const lessons = mod.chapters.filter(c => !c.taskOnly)
  const required = mod.chapters.filter(c => isCountable(c) && !c.optional).map(c => ({ key: taskKey(mod, c) }))
  const sum = summarize(required, homework.byKey)
  const read = lessons.filter(c => visited.has(taskKey(mod, c))).length
  const done = sum.total > 0 && sum.approved === sum.total
  return (
    <button type="button" className={`wc-mod is-${state}${done ? ' is-done' : ''}`} onClick={() => navigate(`/winter-camp/m/${mod.key}`)}>
      <span className="wc-mod-top">
        <span className="wc-mod-name">{mod.name}</span>
        {done ? <span className="wc-mod-badge is-done">сдано</span> : state === 'current' ? <span className="wc-mod-badge">сейчас</span> : null}
      </span>
      <span className="wc-mod-lead">{mod.lead}</span>
      <span className="wc-mod-stats">
        <span className="wc-mod-stat"><b>{read}</b> из {lessons.length} {plural(lessons.length, 'главы', 'глав', 'глав')} прочитано</span>
        {sum.total > 0
          ? <span className="wc-mod-stat"><b>{sum.approved}</b> из {sum.total} заданий принято{sum.rework ? <em> · правки: {sum.rework}</em> : ''}</span>
          : <span className="wc-mod-stat">без сдачи на платформе</span>}
      </span>
      {sum.total > 0 && (
        <span className="wc-bar is-stacked is-thin" aria-hidden="true">
          <span className="is-approved" style={{ width: `${(sum.approved / sum.total) * 100}%` }} />
          <span className="is-submitted" style={{ width: `${(sum.submitted / sum.total) * 100}%` }} />
          <span className="is-rework" style={{ width: `${(sum.rework / sum.total) * 100}%` }} />
        </span>
      )}
      <span className="wc-mod-go">Открыть блок →</span>
    </button>
  )
}

function Program({ program, homework, visited, now, direction }) {
  const todayIso = isoOf(now)
  const currentMonth = WINTER_MONTHS.find(m => todayIso >= m.start && todayIso <= m.end)
  const [tab, setTab] = useState(() => (currentMonth ? currentMonth.n : todayIso > WINTER.end ? 3 : 1))
  const month = WINTER_MONTHS.find(m => m.n === tab)
  const plan = program.find(p => p.month === tab)
  const byDirection = new Set(['base', 'core', 'deep', 'interview'])

  return (
    <section className="wc-section" aria-labelledby="wc-program-title">
      <div className="wc-section-head">
        <div>
          <h2 id="wc-program-title" className="wc-section-title">Программа</h2>
          <p className="wc-section-sub">{month.label} · {rangeLabel(month.start, month.end)} — {month.goal.toLowerCase()}</p>
        </div>
        <div className="wc-tabs is-big" role="tablist" aria-label="Месяц программы">
          {WINTER_MONTHS.map(m => (
            <button key={m.key} type="button" role="tab" aria-selected={m.n === tab} className={m.n === tab ? 'is-active' : ''} onClick={() => setTab(m.n)}>
              <span className="wc-tab-kicker">Месяц {m.n}</span>
              <span className="wc-tab-name">{m.theme}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wc-stages">
        {plan.stages.map(stage => {
          const { start, end } = stageDates(stage)
          const state = todayIso > end ? 'past' : todayIso < start ? 'future' : 'current'
          return (
            <div key={stage.key} className={`wc-stage is-${state}`}>
              <div className="wc-stage-head">
                <span className="wc-stage-dot" aria-hidden="true" />
                <div>
                  <div className="wc-stage-when">{stageLabel(stage)}{state === 'current' ? ' · идёт сейчас' : ''}</div>
                  <h3 className="wc-stage-title">{stage.title}{direction && byDirection.has(stage.key) ? ` · ${direction.short}` : ''}</h3>
                </div>
              </div>
              {stage.needsDirection ? (
                <div className="wc-stage-empty">
                  Этот этап зависит от направления. Оно ещё не выбрано — напиши в Telegram{' '}
                  <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>, и программа появится здесь.
                </div>
              ) : (
                <div className="wc-mods">
                  {stage.modules.map(mod => <ModuleCard key={mod.key} mod={mod} homework={homework} visited={visited} state={state} />)}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ── Домашние задания и быстрые ссылки ────────────────────────────────────────

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
  const navigate = useNavigate()
  const required = tasks.filter(t => t.required)
  const sum = summarize(required, homework.byKey)
  const rework = tasks.filter(t => ['rework', 'failed'].includes(homework.byKey[t.key]?.status))
  return (
    <section className="wc-card wc-hw" aria-labelledby="wc-hw-title">
      <div className="wc-card-head">
        <h2 id="wc-hw-title" className="wc-card-title">Домашние задания</h2>
        <span className="wc-card-value">{homework.loading ? '…' : `${sum.pct}%`}</span>
      </div>
      {rework.length > 0 && (
        <button type="button" className="wc-alert" onClick={() => navigate(`/winter-camp/m/${rework[0].module.key}/${rework[0].chapter.ref}/task`)}>
          <b>{rework.length === 1 ? 'Одна работа ждёт правок' : `${rework.length} ${plural(rework.length, 'работа ждёт', 'работы ждут', 'работ ждут')} правок`}</b>
          <span>Открыть «{rework[0].chapter.title}» →</span>
        </button>
      )}
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
              <div className="wc-bar is-stacked" aria-hidden="true">
                {ms.total > 0 && <>
                  <span className="is-approved" style={{ width: `${(ms.approved / ms.total) * 100}%` }} />
                  <span className="is-submitted" style={{ width: `${(ms.submitted / ms.total) * 100}%` }} />
                  <span className="is-rework" style={{ width: `${(ms.rework / ms.total) * 100}%` }} />
                </>}
              </div>
              <span className="wc-hw-month-num">{ms.total ? `${ms.approved}/${ms.total}` : '—'}</span>
            </div>
          )
        })}
      </div>
      {homework.error && <p className="wc-card-foot">{homework.error}</p>}
    </section>
  )
}

function QuickLinks({ now }) {
  const navigate = useNavigate()
  const todayIso = isoOf(now)
  const nextMath = WINTER_MATH.find(s => s.date >= todayIso)
  const items = [
    {
      key: 'math', url: '/winter-camp/math', title: 'Математика', kicker: 'Мини-курс · 8 занятий',
      text: nextMath ? `Ближайшее: занятие ${nextMath.day}, ${shortDate(nextMath.date)}` : 'Курс завершён — конспекты открыты',
    },
    { key: 'english', url: '/winter-camp/english', title: 'Английский', kicker: 'Конспект-лонгрид', text: 'Документация, переписка, собеседование' },
    { key: 'vac', url: '/winter-camp/vacancies', title: 'Вакансии и контакты', kicker: 'Для участников', text: 'Стажировки и junior-позиции' },
  ]
  return (
    <nav className="wc-quick" aria-label="Разделы лагеря">
      {items.map(it => (
        <button key={it.key} type="button" className={`wc-quick-item is-${it.key}`} onClick={() => navigate(it.url)}>
          <span className="wc-quick-kicker">{it.kicker}</span>
          <span className="wc-quick-title">{it.title}</span>
          <span className="wc-quick-text">{it.text}</span>
          <span className="wc-quick-go" aria-hidden="true">→</span>
        </button>
      ))}
    </nav>
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
  const initial = todayIso < WINTER.start ? dateOf(WINTER.start) : todayIso > WINTER.end ? dateOf(WINTER.end) : now
  const [view, setView] = useState({ y: initial.getFullYear(), m: initial.getMonth() })
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const shown = useMemo(() => (filter === 'all' ? events : events.filter(e => e.type === filter)), [events, filter])
  const byDay = useMemo(() => {
    const map = {}
    for (const e of shown) (map[e.date] ||= []).push(e)
    return map
  }, [shown])

  const campMonths = WINTER_MONTHS.map(m => ({ y: dateOf(m.start).getFullYear(), m: dateOf(m.start).getMonth(), label: m.label }))
  const idx = campMonths.findIndex(c => c.y === view.y && c.m === view.m)
  const cells = monthGrid(view.y, view.m)
  const monthPrefix = `${view.y}-${String(view.m + 1).padStart(2, '0')}`
  const monthEvents = shown.filter(e => e.date.startsWith(monthPrefix))
  // По умолчанию справа — ближайшие события месяца, прошедшие уходят вниз списка
  const list = selected ? (byDay[selected] || []) : [...upcomingEvents(monthEvents, now), ...monthEvents.filter(e => !upcomingEvents([e], now).length)]
  const week = iso => WINTER_WEEKS.find(w => iso >= w.start && iso <= w.end)

  return (
    <section id="calendar" className="wc-section wc-cal" aria-labelledby="wc-cal-title">
      <div className="wc-section-head">
        <div>
          <h2 id="wc-cal-title" className="wc-section-title">Календарь событий</h2>
          <p className="wc-section-sub">Групповые созвоны, математика, встречи с ментором и разбор задач LeetCode</p>
        </div>
        <div className="wc-tabs" role="tablist" aria-label="Месяц">
          {campMonths.map((c, i) => (
            <button key={c.label} type="button" role="tab" aria-selected={i === idx} className={i === idx ? 'is-active' : ''} onClick={() => { setView({ y: c.y, m: c.m }); setSelected(null) }}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="wc-card">
        <div className="wc-filters" role="group" aria-label="Тип события">
          <button type="button" className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>Все</button>
          {Object.entries(EVENT_TYPES).map(([key, t]) => (
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
                    {dayEvents[0] && <span className={`wc-cal-label is-${dayEvents[0].type}`}>{EVENT_TYPES[dayEvents[0].type].tag}</span>}
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

  // Якорь #calendar из дэшборда
  useEffect(() => {
    if (window.location.hash === '#calendar') {
      requestAnimationFrame(() => document.getElementById('calendar')?.scrollIntoView({ block: 'start' }))
    }
  }, [])

  const program = useMemo(() => winterProgram(direction?.key), [direction?.key])
  const tasks = useMemo(() => winterTasks(direction?.key), [direction?.key])
  const events = useMemo(() => winterEvents(direction?.name), [direction?.name])
  const visited = useMemo(() => loadVisited(user), [user?.id])

  if (!isWinter) return <Closed />

  return (
    <section className="page active wc-page">
      <Hero direction={direction} progress={campProgress(now)} week={currentWinterWeek(now)} now={now} />
      <Program program={program} homework={homework} visited={visited} now={now} direction={direction} />
      <div className="wc-row">
        <HomeworkProgress tasks={tasks} homework={homework} />
        <QuickLinks now={now} />
      </div>
      <Calendar events={events} now={now} />
    </section>
  )
}
