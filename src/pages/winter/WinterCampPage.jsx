import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  WINTER, WINTER_MONTHS, WINTER_WEEKS, WINTER_MATH, EVENT_TYPES,
  campProgress, monthProgress, currentWinterWeek, weekState, winterEvents, upcomingEvents,
  isoOf, dateOf, humanDate, shortDate, rangeLabel,
} from '../../data/winter/schedule'
import {
  WINTER_CONTACT, isCountable, taskKey, winterDirectionOf, winterProgram, winterTasks,
} from '../../data/winter'
import { summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { loadVisited, plural } from '../../components/winter/winterLocal'
import '../../winter.css'

// Главная страница зимнего лагеря: где мы сейчас, календарь событий, прогресс лагеря
// и домашних заданий, программа по месяцам, математика и английский.

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

// «через 3 дня», «завтра», «сегодня в 20:00»
function whenLabel(event, now) {
  const today = dateOf(isoOf(now))
  const days = Math.round((dateOf(event.date) - today) / 86400000)
  if (days === 0) return event.time ? `сегодня в ${event.time} МСК` : 'сегодня'
  if (days === 1) return event.time ? `завтра в ${event.time} МСК` : 'завтра'
  return `через ${days} ${plural(days, 'день', 'дня', 'дней')}`
}

// ── Шапка ────────────────────────────────────────────────────────────────────

function Hero({ user, direction, progress, week, next, resume, now }) {
  const navigate = useNavigate()
  let status
  if (progress.phase === 'before') {
    status = <>До старта <b>{progress.daysTo} {plural(progress.daysTo, 'день', 'дня', 'дней')}</b> · начинаем {humanDate(WINTER.start)}. Материалы уже открыты — можно начать раньше.</>
  } else if (progress.phase === 'after') {
    status = <>Лагерь завершён. Все материалы остаются открытыми — возвращайся к ним в любое время.</>
  } else {
    status = <>День <b>{progress.day}</b> из {progress.total}{week ? <> · неделя {week.n} · {week.focus.toLowerCase()}</> : null}</>
  }
  return (
    <header className="wc-hero">
      <div className="wc-hero-snow" aria-hidden="true">
        {Array.from({ length: 14 }, (_, i) => <i key={i} style={{ '--i': i }} />)}
      </div>
      <div className="wc-hero-main">
        <div className="wc-brand">
          <span className="wc-brand-flake"><Snowflake size={30} /></span>
          <h1 className="wc-brand-title">Winter Camp <span className="wc-brand-season">{WINTER.season}</span></h1>
        </div>
        <p className="wc-hero-status">{status}</p>
        <div className="wc-hero-chips">
          {direction
            ? <span className="wc-chip is-accent">{direction.name}</span>
            : <span className="wc-chip is-warn">Направление ещё не выбрано</span>}
          <span className="wc-chip">{humanDate(WINTER.start)} — {humanDate(WINTER.end)}</span>
          <span className="wc-chip">3 месяца · 13 недель</span>
        </div>
        {!direction && (
          <p className="wc-hero-note">
            Общие блоки уже открыты. Чтобы появилась программа по направлению, напиши в Telegram{' '}
            <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>
          </p>
        )}
      </div>

      <div className="wc-hero-side">
        {resume && (
          <button type="button" className="wc-resume" onClick={() => navigate(resume.url)}>
            <span className="wc-resume-kicker">{resume.kicker}</span>
            <span className="wc-resume-title">{resume.title}</span>
            <span className="wc-resume-sub">{resume.sub}</span>
            <span className="wc-resume-go">Продолжить →</span>
          </button>
        )}
        {next && (
          <a className={`wc-next is-${next.type}`} href="#calendar">
            <span className="wc-next-kicker">Ближайшее событие · {whenLabel(next, now)}</span>
            <span className="wc-next-title">{next.title}</span>
            <span className="wc-next-sub">{shortDate(next.date)}{next.time ? ` · ${next.time} МСК` : ''} · {next.note}</span>
          </a>
        )}
      </div>
    </header>
  )
}

// ── Прогресс лагеря ──────────────────────────────────────────────────────────

function CampProgress({ progress, now }) {
  const current = currentWinterWeek(now)
  return (
    <section className="wc-card wc-progress" aria-labelledby="wc-progress-title">
      <div className="wc-card-head">
        <h2 id="wc-progress-title" className="wc-card-title">Прогресс лагеря</h2>
        <span className="wc-card-value">{progress.pct}%</span>
      </div>
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
      <div className="wc-weeks" aria-label="Недели лагеря">
        {WINTER_WEEKS.map(w => {
          const st = weekState(w, now)
          return (
            <span key={w.n} className={`wc-week is-${st}`} title={`Неделя ${w.n} · ${rangeLabel(w.start, w.end)} · ${w.focus}`}>
              {w.n}
            </span>
          )
        })}
      </div>
      <p className="wc-card-foot">
        {current
          ? <>Сейчас неделя {current.n} · {rangeLabel(current.start, current.end)} · {current.focus}</>
          : progress.phase === 'before'
            ? <>Старт {humanDate(WINTER.start, { weekday: true })}. Первая неделя — основы программирования на Python</>
            : <>Все 13 недель пройдены</>}
      </p>
    </section>
  )
}

// ── Прогресс по домашним заданиям ────────────────────────────────────────────

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
  const bonus = tasks.filter(t => !t.required && homework.byKey[t.key]?.status === 'approved').length
  const rework = tasks.filter(t => ['rework', 'failed'].includes(homework.byKey[t.key]?.status))
  return (
    <section className="wc-card wc-hw" aria-labelledby="wc-hw-title">
      <div className="wc-card-head">
        <h2 id="wc-hw-title" className="wc-card-title">Домашние задания</h2>
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
      {rework.length > 0 ? (
        <button type="button" className="wc-alert" onClick={() => navigate(`/winter-camp/m/${rework[0].module.key}/${rework[0].chapter.ref}/task`)}>
          {rework.length === 1 ? 'Одна работа ждёт' : `${rework.length} ${plural(rework.length, 'работа ждёт', 'работы ждут', 'работ ждут')}`} правок — открыть «{rework[0].chapter.title}» →
        </button>
      ) : (
        <p className="wc-card-foot">
          {homework.error || (bonus > 0
            ? `Сверх программы принято заданий «по желанию»: ${bonus}`
            : 'В счёт идут задания, которые сдаются на платформе: задачи и вопросы на проверку и тесты с автопроверкой')}
        </p>
      )}
    </section>
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
    <div className={`wc-ev is-${event.type}${past ? ' is-past' : ''}`}>
      <div className="wc-ev-when">
        {showDate && <span className="wc-ev-date">{shortDate(event.date)}</span>}
        <span className="wc-ev-time">{event.time ? `${event.time} МСК` : 'время объявим в чате'}</span>
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
  // Открываем месяц лагеря: до старта — декабрь, после конца — февраль
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
  const list = selected ? (byDay[selected] || []) : monthEvents
  const week = iso => WINTER_WEEKS.find(w => iso >= w.start && iso <= w.end)

  return (
    <section id="calendar" className="wc-card wc-cal" aria-labelledby="wc-cal-title">
      <div className="wc-card-head wc-cal-head">
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
        <button type="button" className={filter === 'all' ? 'is-active' : ''} onClick={() => setFilter('all')}>Все события</button>
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
              const out = d.getMonth() !== view.m
              const cls = ['wc-cal-day']
              if (out) cls.push('is-out')
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
                  {dayEvents[0] && <span className={`wc-cal-label is-${dayEvents[0].type}`}>{EVENT_TYPES[dayEvents[0].type].short}</span>}
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
          {selected && week(selected) && (
            <p className="wc-cal-weeknote">Неделя {week(selected).n} · {week(selected).focus}</p>
          )}
          <div className="wc-cal-list">
            {list.length === 0 && <p className="wc-muted">{selected ? 'В этот день событий нет — время для материалов и домашек.' : 'В этом месяце событий такого типа нет.'}</p>}
            {list.map(e => <EventCard key={e.id} event={e} now={now} showDate={!selected} />)}
          </div>
        </div>
      </div>
    </section>
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
        <span>{lessons.length} {plural(lessons.length, 'глава', 'главы', 'глав')}{read > 0 ? ` · открыто ${read}` : ''}</span>
        {sum.total > 0
          ? <span>ДЗ: {sum.approved} из {sum.total}{sum.submitted ? ` · на проверке ${sum.submitted}` : ''}{sum.rework ? ` · правки ${sum.rework}` : ''}</span>
          : <span>без сдачи на платформе</span>}
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

  return (
    <section className="wc-program" aria-labelledby="wc-program-title">
      <div className="wc-section-head">
        <h2 id="wc-program-title" className="wc-section-title">Программа лагеря</h2>
        <div className="wc-tabs is-big" role="tablist" aria-label="Месяц программы">
          {WINTER_MONTHS.map(m => (
            <button key={m.key} type="button" role="tab" aria-selected={m.n === tab} className={m.n === tab ? 'is-active' : ''} onClick={() => setTab(m.n)}>
              <span className="wc-tab-kicker">Месяц {m.n}</span>
              <span className="wc-tab-name">{m.theme}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="wc-month-intro">
        <span className="wc-month-intro-dates">{month.label} · {rangeLabel(month.start, month.end)}</span>
        <span className="wc-month-intro-goal">{month.goal}</span>
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
                  <h3 className="wc-stage-title">{stage.title}{stage.modules.length === 0 || !direction ? '' : stage.key === 'base' || stage.key === 'core' || stage.key === 'deep' || stage.key === 'interview' ? ` · ${direction.short}` : ''}</h3>
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

// ── Математика, английский, вакансии ─────────────────────────────────────────

function Extras({ now }) {
  const navigate = useNavigate()
  const todayIso = isoOf(now)
  const nextMath = WINTER_MATH.find(s => s.date >= todayIso)
  return (
    <section className="wc-extras" aria-label="Дополнительные разделы">
      <button type="button" className="wc-extra is-math" onClick={() => navigate('/winter-camp/math')}>
        <span className="wc-extra-kicker">Мини-курс · 8 занятий</span>
        <span className="wc-extra-title">Математика</span>
        <span className="wc-extra-text">К каждому занятию — конспект, домашнее задание и запись встречи.</span>
        <span className="wc-extra-dots" aria-hidden="true">
          {WINTER_MATH.map(s => <i key={s.day} className={s.date < todayIso ? 'is-past' : nextMath && s.day === nextMath.day ? 'is-next' : ''}>{s.day}</i>)}
        </span>
        <span className="wc-extra-foot">{nextMath ? `Ближайшее: ${shortDate(nextMath.date)} · занятие ${nextMath.day}` : 'Курс завершён — конспекты и записи открыты'} →</span>
      </button>
      <button type="button" className="wc-extra is-english" onClick={() => navigate('/winter-camp/english')}>
        <span className="wc-extra-kicker">Лонгрид · читать в своём темпе</span>
        <span className="wc-extra-title">Английский</span>
        <span className="wc-extra-text">Единый конспект: английский для айтишника — документация, собеседования, переписка и план, как подтянуть язык.</span>
        <span className="wc-extra-foot">Открыть конспект →</span>
      </button>
      <button type="button" className="wc-extra is-vac" onClick={() => navigate('/winter-camp/vacancies')}>
        <span className="wc-extra-kicker">Для участников лагеря</span>
        <span className="wc-extra-title">Вакансии и контакты</span>
        <span className="wc-extra-text">Стажировки и junior-позиции с прямыми контактами — пополняются в течение лагеря.</span>
        <span className="wc-extra-foot">Смотреть вакансии →</span>
      </button>
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

  // Обратный отсчёт до событий обновляем раз в минуту
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60000)
    return () => clearInterval(t)
  }, [])

  // Якорь #calendar из дэшборда и плашки «ближайшее событие»
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

  const progress = campProgress(now)
  const week = currentWinterWeek(now)
  const next = upcomingEvents(events, now)[0] || null

  // «Продолжить»: первая глава текущего этапа, где задание ещё не принято;
  // до старта и после конца — по всей программе
  const todayIso = isoOf(now)
  const stages = program.flatMap(p => p.stages)
  const activeStage = stages.find(s => {
    const { start, end } = stageDates(s)
    return todayIso >= start && todayIso <= end && s.modules.length > 0
  })
  let resume = null
  for (const stage of activeStage ? [activeStage, ...stages] : stages) {
    for (const mod of stage.modules) {
      const ch = mod.chapters.find(c => !c.optional && isCountable(c) && homework.byKey[taskKey(mod, c)]?.status !== 'approved' && homework.byKey[taskKey(mod, c)]?.status !== 'submitted')
      if (ch) {
        const row = homework.byKey[taskKey(mod, ch)]
        resume = {
          kicker: row ? 'Нужны правки' : visited.has(taskKey(mod, ch)) ? 'Осталось сдать задание' : 'Следующая глава',
          title: ch.title,
          sub: mod.name,
          url: `/winter-camp/m/${mod.key}/${ch.ref}${row || ch.taskOnly || visited.has(taskKey(mod, ch)) ? '/task' : ''}`,
        }
        break
      }
    }
    if (resume) break
  }
  if (homework.loading) resume = null

  return (
    <section className="page active wc-page">
      <Hero user={user} direction={direction} progress={progress} week={week} next={next} resume={resume} now={now} />

      <div className="wc-row">
        <CampProgress progress={progress} now={now} />
        <HomeworkProgress tasks={tasks} homework={homework} />
      </div>

      <Calendar events={events} now={now} />

      <Program program={program} homework={homework} visited={visited} now={now} direction={direction} />

      <Extras now={now} />
    </section>
  )
}
