import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { WEEK5_SECTIONS, WEEK5_TITLE, WEEK5_INTRO, WEEK5_NEXT } from '../data/week5Summary'
import { WEEK1_CHAPTERS } from '../data/week1Materials'
import { chaptersForLevel } from '../data/week2Materials'
import { WEEK3_CHAPTERS } from '../data/week3Materials'
import { WEEK4_TOPICS } from '../data/week4'

const DONE_KEY = 'kiro_week5_done'

// Заголовки берём из самих материалов, а не дублируем: так список тем
// не может разойтись с тем, что реально лежит в главах.
const TITLES = (() => {
  const map = {}
  const put = list => list.forEach(ch => { map[ch.id] = ch.title })
  put(WEEK1_CHAPTERS)
  put(chaptersForLevel(3))
  put(WEEK3_CHAPTERS)
  WEEK4_TOPICS.forEach(t => put(t.chapters))
  return map
})()

function loadDone() {
  try {
    return new Set(JSON.parse(localStorage.getItem(DONE_KEY)) || [])
  } catch {
    return new Set()
  }
}

// Ссылка на конкретную главу внутри недели
function chapterHref(section, topic) {
  const params = new URLSearchParams()
  if (section.week === 2) {
    const levels = topic.levels || [3]
    // Глава есть на всех уровнях — не навязываем свой, откроется выбранный студентом
    if (!levels.includes(1)) params.set('level', String(levels[0]))
  }
  if (section.week === 4) params.set('topic', topic.topic || section.topic)
  params.set('ch', topic.ch)
  return `${section.base}?${params.toString()}`
}

function Ring({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <span className="w5-ring" style={{ '--pct': `${pct}%` }}>
      <span className="w5-ring-inner">{pct}<span className="w5-ring-sign">%</span></span>
    </span>
  )
}

function Section({ section, done, onToggle }) {
  const [open, setOpen] = useState(false)
  const total = section.topics.length
  const checked = section.topics.filter(t => done.has(t.ch)).length

  return (
    <div className={`w5-section${open ? ' is-open' : ''}`}>
      <button className="w5-head" onClick={() => setOpen(o => !o)}>
        <Ring done={checked} total={total} />
        <span className="w5-head-text">
          <span className="w5-head-title">{section.title}</span>
          <span className="w5-head-sub">{section.summary}</span>
        </span>
        <span className="w5-head-right">
          <span className="w5-count">{checked} / {total}</span>
          <span className="w5-chevron" aria-hidden="true">▾</span>
        </span>
      </button>

      <div className="w5-body">
        <div className="w5-body-inner">
          <ul className="w5-list">
            {section.topics.map((t, i) => {
              const isDone = done.has(t.ch)
              return (
                <li key={t.ch} className={`w5-item${isDone ? ' is-done' : ''}`}>
                  <button
                    className="w5-check"
                    onClick={() => onToggle(t.ch)}
                    aria-pressed={isDone}
                    title={isDone ? 'Снять отметку' : 'Отметить, что тема понятна'}
                  >
                    {isDone && <span className="w5-tick" aria-hidden="true">✓</span>}
                  </button>
                  <div className="w5-item-text">
                    <span className="w5-item-title">
                      <span className="w5-item-num">{String(i + 1).padStart(2, '0')}</span>
                      {TITLES[t.ch] || t.ch}
                    </span>
                    <span className="w5-item-must">{t.must}</span>
                  </div>
                  <Link className="w5-open" to={chapterHref(section, t)}>
                    Открыть
                  </Link>
                </li>
              )
            })}
          </ul>

          {section.extra?.length > 0 && (
            <div className="w5-extra">
              <span className="w5-extra-label">Ещё по теме</span>
              {section.extra.map(e => (
                <Link key={e.href} className="w5-extra-link" to={e.href}>{e.label}</Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Week5Summary() {
  const [done, setDone] = useState(loadDone)

  const toggle = id => {
    setDone(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      try {
        localStorage.setItem(DONE_KEY, JSON.stringify([...next]))
      } catch { /* приватный режим — отметки просто не сохранятся */ }
      return next
    })
  }

  const { total, checked } = useMemo(() => {
    const all = WEEK5_SECTIONS.flatMap(s => s.topics.map(t => t.ch))
    return { total: all.length, checked: all.filter(id => done.has(id)).length }
  }, [done])

  const left = total - checked

  return (
    <div>
      <div className="widget w5-intro">
        <div className="widget-header">
          <span className="widget-title">{WEEK5_TITLE}</span>
        </div>
        <p className="w5-intro-text">{WEEK5_INTRO}</p>

        <div className="w5-total">
          <div className="w5-total-bar">
            <div className="w5-total-fill" style={{ width: `${total ? (checked / total) * 100 : 0}%` }} />
          </div>
          <div className="w5-total-legend">
            <span><b>{checked}</b> из {total} тем отмечено</span>
            <span className="w5-total-left">{left > 0 ? `осталось ${left}` : 'всё закрыто'}</span>
          </div>
        </div>
      </div>

      <div className="w5-sections">
        {WEEK5_SECTIONS.map(s => (
          <Section key={s.id} section={s} done={done} onToggle={toggle} />
        ))}
      </div>

      <div className="widget w5-next">
        <div className="widget-header">
          <span className="widget-title">Куда двигаться дальше</span>
        </div>
        <div className="w5-next-list">
          {WEEK5_NEXT.map(n => (
            <Link key={n.href} className="w5-next-card" to={n.href}>
              <span className="w5-next-title">{n.label}</span>
              <span className="w5-next-note">{n.note}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
