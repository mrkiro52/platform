import { Fragment, useEffect, useMemo, useState } from 'react'
import { api } from '../../api'
import { useNavigate } from 'react-router-dom'
import {
  WINTER, WINTER_MONTHS, WINTER_WEEKS, WINTER_BREAK, EVENT_TYPES,
  campProgress, monthProgress, currentWinterWeek, winterEvents, personalCallEvents, upcomingEvents,
  isoOf, dateOf, humanDate, shortDate, rangeLabel,
} from '../../data/winter/schedule'
import {
  WINTER_CONTACT, isCountable, taskKey, winterDirectionOf, winterProgram, winterTasks,
} from '../../data/winter'
import { summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { loadVisited, plural } from '../../components/winter/winterLocal'
import WinterTracks from '../../components/winter/WinterTracks'
import '../../winter.css'

// Главная страница зимнего лагеря (основная программа). Место на странице — по важности:
// 1) узкая шапка с прогрессом и плашки треков (математика и английский — отдельные страницы);
// 2) календарь событий (вместе с личными созвонами с ментором), итоги домашек и вакансии;
// 3) программа: три месяца по четыре недели, главы выбранного этапа сеткой.
// Занятия по математике сюда не попадают: у математики своя страница и своё расписание.

const MONTH_NAMES = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MAIN_TYPES = Object.fromEntries(Object.entries(EVENT_TYPES).filter(([k]) => k !== 'math'))
const BY_DIRECTION = new Set(['base', 'core', 'final'])
const COLLAPSED = 8

function Snowflake({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" />
      <path d="m9.5 3.5 2.5 2.5 2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.5 9.5 6 12l-2.5 2.5M20.5 9.5 18 12l2.5 2.5" />
    </svg>
  )
}

// ── Даты этапов ──────────────────────────────────────────────────────────────

function stageDates(stage) {
  const weeks = stage.weeks.map(n => WINTER_WEEKS.find(w => w.n === n))
  return { start: weeks[0].start, end: weeks[weeks.length - 1].end }
}

function weeksLabel(weeks) {
  return weeks.length > 1 ? `Недели ${weeks[0]}–${weeks[weeks.length - 1]}` : `Неделя ${weeks[0]}`
}

function stageState(stage, todayIso) {
  const { start, end } = stageDates(stage)
  return todayIso > end ? 'past' : todayIso < start ? 'future' : 'current'
}

// Этап «на сейчас»: идущий; в каникулы и до старта — ближайший следующий; после лагеря — последний
function focusStage(stages, todayIso) {
  return stages.find(s => stageState(s, todayIso) === 'current')
    || stages.find(s => stageState(s, todayIso) === 'future')
    || stages[stages.length - 1]
}

function stageTitle(stage, direction) {
  return `${stage.title}${direction && BY_DIRECTION.has(stage.key) ? ` · ${direction.short}` : ''}`
}

// ── Прогресс по блоку и главам ───────────────────────────────────────────────

function moduleStats(mod, homework, visited) {
  const lessons = mod.chapters.filter(c => !c.taskOnly)
  const required = mod.chapters.filter(c => isCountable(c) && !c.optional)
  const sum = summarize(required.map(c => ({ key: taskKey(mod, c) })), homework.byKey)
  const read = lessons.filter(c => visited.has(taskKey(mod, c))).length
  const status = c => homework.byKey[taskKey(mod, c)]?.status
  const unread = lessons.filter(c => !visited.has(taskKey(mod, c)))
  const nextLesson = unread[0] || null
  const nextTask = required.find(c => ['rework', 'failed'].includes(status(c)))
    || required.find(c => !status(c)) || null
  return { lessons, sum, read, nextLesson, nextTask, after: unread.slice(1, 4) }
}

function chapterState(mod, ch, homework, visited) {
  const st = homework.byKey[taskKey(mod, ch)]?.status
  if (st === 'approved') return { cls: 'is-approved', text: 'принято' }
  if (st === 'submitted') return { cls: 'is-submitted', text: 'на проверке' }
  if (st === 'rework' || st === 'failed') return { cls: 'is-rework', text: st === 'failed' ? 'тест не пройден' : 'нужны правки' }
  if (visited.has(taskKey(mod, ch))) return { cls: 'is-read', text: 'прочитано' }
  return { cls: '', text: ch.optional ? 'по желанию' : '' }
}

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

function TopBar({ direction, progress, week, now }) {
  let status
  if (progress.phase === 'before') status = <>До старта <b>{progress.daysTo} {plural(progress.daysTo, 'день', 'дня', 'дней')}</b> · материалы уже открыты</>
  else if (progress.phase === 'after') status = <>Лагерь завершён · материалы остаются открытыми</>
  else if (week?.isBreak) status = <>Каникулы · <b>{rangeLabel(WINTER_BREAK.start, WINTER_BREAK.end)}</b></>
  else status = <>Идёт <b>неделя {week?.n ?? '—'}</b> из 12 · день {progress.day} из {progress.total}</>

  return (
    <header className="wc-top">
      <div className="wc-top-main">
        <span className="wc-top-flake"><Snowflake size={20} /></span>
        <div className="wc-top-text">
          <h1 className="wc-top-title">Winter Camp <span>{WINTER.season}</span></h1>
          <p className="wc-top-status">{status}</p>
          <div className="wc-top-chips">
            {direction
              ? <span className="wc-chip is-accent">{direction.name}</span>
              : <a className="wc-chip is-warn" href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">Направление не выбрано → {WINTER_CONTACT.handle}</a>}
            <span className="wc-chip">{humanDate(WINTER.start)} — {humanDate(WINTER.end)}</span>
          </div>
        </div>
      </div>

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
    </header>
  )
}

// ── Программа: три месяца по четыре недели ───────────────────────────────────

function ChapterCard({ mod, ch, index, homework, visited }) {
  const navigate = useNavigate()
  const url = `/winter-camp/m/${mod.key}/${ch.ref}`
  const st = chapterState(mod, ch, homework, visited)
  const hasTask = !!ch.task || ch.taskOnly
  return (
    <div className={`wc-ch ${st.cls}${ch.optional ? ' is-optional' : ''}`}>
      <button type="button" className="wc-ch-main" onClick={() => navigate(ch.taskOnly ? `${url}/task` : url)}>
        <span className="wc-ch-top">
          <span className="wc-ch-num">{ch.label || String(index).padStart(2, '0')}</span>
          {st.text && <span className="wc-ch-state">{st.text}</span>}
        </span>
        <span className="wc-ch-title">{ch.title}</span>
      </button>
      <div className="wc-ch-actions">
        {!ch.taskOnly ? (
          <button type="button" className="wc-ch-btn" onClick={() => navigate(url)}>Теория</button>
        ) : (
          <button type="button" className="wc-ch-btn is-disabled" disabled>Теория</button>
        )}
        {hasTask ? (
          <button type="button" className="wc-ch-btn is-task" onClick={() => navigate(`${url}/task`)}>
            {ch.task?.kind === 'auto' ? 'Тест' : 'Задание'}
          </button>
        ) : (
          <button type="button" className="wc-ch-btn is-disabled" disabled>Задание</button>
        )}
      </div>
    </div>
  )
}

function ModuleChapters({ mod, homework, visited }) {
  const navigate = useNavigate()
  const [all, setAll] = useState(false)
  const st = moduleStats(mod, homework, visited)
  const number = new Map(mod.chapters.map((c, i) => [c.ref, i + 1]))
  const long = mod.chapters.length > COLLAPSED + 4
  const card = ch => <ChapterCard key={ch.ref} mod={mod} ch={ch} index={number.get(ch.ref)} homework={homework} visited={visited} />

  // В свёрнутом виде — восемь глав, начиная с первой незакрытой (по рядам из четырёх)
  let shown = mod.chapters
  if (long && !all) {
    const first = mod.chapters.findIndex(c => !chapterState(mod, c, homework, visited).cls)
    const from = Math.max(0, Math.min(first < 0 ? 0 : first - (first % 4), mod.chapters.length - COLLAPSED))
    shown = mod.chapters.slice(from, from + COLLAPSED)
  }

  return (
    <div className="wc-dm">
      <div className="wc-dm-head">
        <div className="wc-dm-info">
          <h4 className="wc-dm-name">{mod.name}</h4>
          <p className="wc-dm-lead">{mod.lead}</p>
        </div>
        <div className="wc-dm-side">
          <span className="wc-dm-stat">
            {st.lessons.length} {plural(st.lessons.length, 'глава', 'главы', 'глав')}
            {st.sum.total > 0 ? ` · принято ${st.sum.approved} из ${st.sum.total}` : ''}
          </span>
          {st.sum.total > 0 && <StackedBar sum={st.sum} thin />}
          <button type="button" className="wc-link" onClick={() => navigate(`/winter-camp/m/${mod.key}`)}>Обзор блока →</button>
        </div>
      </div>

      {all && mod.groups ? mod.groups.map(g => {
        const list = mod.chapters.filter(c => c.level === g.level)
        if (!list.length) return null
        return (
          <Fragment key={g.level}>
            <div className="wc-dm-group">{g.title}</div>
            <div className="wc-chs">{list.map(card)}</div>
          </Fragment>
        )
      }) : <div className="wc-chs">{shown.map(card)}</div>}

      {long && (
        <button type="button" className="wc-more" onClick={() => setAll(v => !v)} aria-expanded={all}>
          {all ? 'Свернуть' : `Показать все ${mod.chapters.length} ${plural(mod.chapters.length, 'главу', 'главы', 'глав')}`}
        </button>
      )}
    </div>
  )
}

function Program({ program, stages, selected, onSelect, homework, visited, now, direction }) {
  const todayIso = isoOf(now)
  const stage = stages.find(s => s.key === selected) || stages[0]
  const { start, end } = stageDates(stage)
  const stageOfWeek = n => stages.find(s => s.weeks.includes(n))
  const pick = key => {
    onSelect(key)
    requestAnimationFrame(() => document.getElementById('wc-stage-detail')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }))
  }

  return (
    <section className="wc-section" aria-labelledby="wc-program-title">
      <div className="wc-section-head">
        <h2 id="wc-program-title" className="wc-section-title">Программа</h2>
        <p className="wc-section-sub">12 недель · недели 1–2 общие для всех, 3–10 — твоё направление, 11–12 — карьера</p>
      </div>

      <div className="wc-plan">
        {program.map(m => {
          const month = WINTER_MONTHS.find(x => x.n === m.month)
          const weeks = WINTER_WEEKS.filter(w => w.month === m.month)
          const mp = monthProgress(month, now)
          return (
            <div key={month.key} className={`wc-plan-month is-${mp.state}`}>
              <div className="wc-plan-head">
                <span className="wc-kicker">Месяц {month.n} · {rangeLabel(month.start, month.end)}</span>
                <h3 className="wc-plan-title">{month.label} <em>{month.theme}</em></h3>
              </div>
              <div className="wc-plan-weeks">
                {weeks.map(w => {
                  const ws = todayIso > w.end ? 'past' : todayIso < w.start ? 'future' : 'current'
                  const s = stageOfWeek(w.n)
                  return (
                    <button
                      key={w.n}
                      type="button"
                      className={`wc-wk is-${ws}${s?.key === stage.key ? ' is-selected' : ''}`}
                      onClick={() => s && pick(s.key)}
                      title={`${rangeLabel(w.start, w.end)} · ${w.focus}`}
                    >
                      <span className="wc-wk-n">{w.n}</span>
                      <span className="wc-wk-d">{rangeLabel(w.start, w.end)}</span>
                    </button>
                  )
                })}
              </div>
              <div className="wc-plan-stages">
                {m.stages.map(s => {
                  const ss = stageState(s, todayIso)
                  const sum = summarize(s.modules.flatMap(mod => mod.chapters.filter(c => isCountable(c) && !c.optional).map(c => ({ key: taskKey(mod, c) }))), homework.byKey)
                  return (
                    <button
                      key={s.key}
                      type="button"
                      style={{ flexGrow: s.weeks.length }}
                      className={`wc-plan-stage is-${ss}${s.key === stage.key ? ' is-selected' : ''}`}
                      onClick={() => pick(s.key)}
                      aria-pressed={s.key === stage.key}
                    >
                      <span className="wc-plan-when">{weeksLabel(s.weeks)}{ss === 'current' ? ' · сейчас' : ''}</span>
                      <span className="wc-plan-name">{stageTitle(s, direction)}</span>
                      <span className="wc-plan-mods">
                        {s.needsDirection ? 'после выбора направления' : s.modules.map(mod => mod.name).join(' · ')}
                      </span>
                      {s.about.length > 0 && (
                        <ul className="wc-plan-about">
                          {s.about.map(line => <li key={line}>{line}</li>)}
                        </ul>
                      )}
                      {sum.total > 0 && (
                        <span className="wc-plan-progress">
                          <StackedBar sum={sum} thin />
                          <span>{sum.approved}/{sum.total}</span>
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
              {month.n === 1 && <div className="wc-plan-break">Каникулы · {rangeLabel(WINTER_BREAK.start, WINTER_BREAK.end)}</div>}
            </div>
          )
        })}
      </div>

      <div id="wc-stage-detail" className="wc-detail">
        <div className="wc-detail-head">
          <span className="wc-kicker">{weeksLabel(stage.weeks)} · {rangeLabel(start, end)}</span>
          <h3 className="wc-detail-title">{stageTitle(stage, direction)}</h3>
        </div>
        {stage.needsDirection ? (
          <div className="wc-stage-empty">
            Этот этап зависит от направления. Оно ещё не выбрано — напиши в Telegram{' '}
            <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>, и программа появится здесь.
          </div>
        ) : stage.modules.map(mod => <ModuleChapters key={mod.key} mod={mod} homework={homework} visited={visited} />)}
      </div>
    </section>
  )
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
    <section id="calendar" className="wc-card wc-cal" aria-labelledby="wc-cal-title">
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

  // Якорь #calendar из дэшборда
  useEffect(() => {
    if (window.location.hash === '#calendar') {
      requestAnimationFrame(() => document.getElementById('calendar')?.scrollIntoView({ block: 'start' }))
    }
  }, [])

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
  const visited = useMemo(() => loadVisited(user), [user?.id])
  const todayIso = isoOf(now)
  const current = focusStage(stages, todayIso)
  const [selected, setSelected] = useState(null)

  if (!isWinter) return <Closed />

  return (
    <section className="page active wc-page">
      <TopBar direction={direction} progress={campProgress(now)} week={currentWinterWeek(now)} now={now} />
      <WinterTracks active="main" direction={direction} />
      <div className="wc-row">
        <Calendar events={events} now={now} />
        <div className="wc-col">
          <HomeworkProgress tasks={tasks} homework={homework} />
          <VacanciesLink />
        </div>
      </div>
      <Program
        program={program} stages={stages} selected={selected || current.key} onSelect={setSelected}
        homework={homework} visited={visited} now={now} direction={direction}
      />
    </section>
  )
}
