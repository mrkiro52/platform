import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PROGRAM_CONTACT, PROGRAM_PERIOD, directionOf } from '../data/programs'
import ProgramBlocks, { Rich } from '../components/program/ProgramBlocks'

// Индивидуальная программа осеннего лагеря на октябрь:
// /autumn-camp/program — обзор программы и список глав,
// /autumn-camp/program/:chapter — глава: разделы теории и задание в конце.

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

function ContactNote() {
  return (
    <p className="prg-contact">
      Для смены направления и индивидуальной программы напиши в Telegram{' '}
      <a href={PROGRAM_CONTACT.url} target="_blank" rel="noopener noreferrer">{PROGRAM_CONTACT.text}</a>
    </p>
  )
}

function BackLink({ to, children }) {
  return <Link className="prg-back" to={to}>← {children}</Link>
}

function Pending({ title }) {
  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp">Осенний лагерь</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Индивидуальная программа · {PROGRAM_PERIOD}</span>
        <h1 className="prg-title">{title}</h1>
        <ContactNote />
      </div>
    </section>
  )
}

function StartPanel({ start }) {
  if (!start) return null
  return (
    <section id="prg-start" className="prg-section prg-start">
      <div className="prg-section-head">
        <span className="prg-section-num">Старт</span>
        <h2 className="prg-section-title">{start.title}</h2>
      </div>
      <ProgramBlocks blocks={start.blocks} />
    </section>
  )
}

function Overview({ dir }) {
  const navigate = useNavigate()
  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp">Осенний лагерь</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Индивидуальная программа · {PROGRAM_PERIOD}</span>
        <h1 className="prg-title">{dir.name}</h1>
        <p className="prg-lead">{dir.goal}. Программа состоит из глав: в каждой — теория по разделам{dir.practice ? `, ${dir.practice}` : ' и задание для самостоятельной работы в конце'}.</p>
        <ContactNote />
      </div>

      <StartPanel start={dir.start} />

      <h2 className="prg-list-title">Главы программы</h2>
      {dir.chapters.length === 0 ? (
        <div className="prg-empty">Первая глава программы скоро появится.</div>
      ) : (
        <div className="prg-chapters">
          {dir.chapters.map(ch => (
            <button key={ch.num} type="button" className="prg-chapter-card" onClick={() => navigate(`/autumn-camp/program/${ch.num}`)}>
              <span className="prg-chapter-num">Глава {ch.num}</span>
              <span className="prg-chapter-title">{ch.title}</span>
              <span className="prg-chapter-meta">{ch.sections} {plural(ch.sections, 'раздел', 'раздела', 'разделов')} · {dir.practice || 'задание в конце'}</span>
              <span className="prg-chapter-open">Открыть →</span>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

function Terms({ terms }) {
  if (!terms?.length) return null
  return (
    <details className="prg-terms">
      <summary>Сокращения в разделе <span>{terms.length}</span></summary>
      <dl>
        {terms.map(([abbr, def]) => (
          <div key={abbr} className="prg-term">
            <dt>{abbr}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

function Assignment({ a }) {
  return (
    <section id="prg-assignment" className="prg-section prg-assignment">
      <div className="prg-section-head">
        <span className="prg-section-num">Задание</span>
        <h2 className="prg-section-title">Задание для самостоятельной работы</h2>
      </div>
      <div className="prg-assign-meta">
        <div><span>Время выполнения</span><b>{a.time}</b></div>
        <div><span>Формат сдачи</span><b>{a.format}</b></div>
      </div>

      {a.situation.length > 0 && (
        <div className="prg-situation">
          <div className="prg-situation-label">Исходная ситуация</div>
          {a.situation.map((p, i) => <p key={i}><Rich text={p} /></p>)}
        </div>
      )}

      <div className="prg-parts">
        {a.parts.map(part => (
          <div key={part.title} className="prg-part">
            <div className="prg-part-head">
              <h3>{part.title}</h3>
              {part.minutes && <span className="prg-chip">{part.minutes} минут</span>}
            </div>
            <ProgramBlocks blocks={part.blocks} />
          </div>
        ))}

        {a.selfCheck?.length > 0 && (
          <div className="prg-part">
            <div className="prg-part-head">
              <h3>{a.selfCheckTitle || 'Вопросы для самопроверки'}</h3>
              {a.selfCheckMinutes && <span className="prg-chip">{a.selfCheckMinutes} минут</span>}
            </div>
            <p className="prg-p">{a.selfCheckIntro}</p>
            <ol className="prg-ol">
              {a.selfCheck.map((q, i) => <li key={i}>{q}</li>)}
            </ol>
          </div>
        )}
      </div>

      <div className="prg-criteria">
        <div className="prg-criteria-title">{a.criteriaTitle || 'Критерии оценки'}</div>
        <ul>{a.criteria.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>
    </section>
  )
}

function Chapter({ dir, chapterNum }) {
  const meta = dir.chapters.find(c => c.num === chapterNum)
  const [chapter, setChapter] = useState(null)

  useEffect(() => {
    let alive = true
    setChapter(null)
    meta?.load().then(m => { if (alive) setChapter(m.default) })
    window.scrollTo(0, 0)
    return () => { alive = false }
  }, [meta])

  if (!meta) return <Overview dir={dir} />
  if (!chapter) return <section className="page active prg-page"><p className="prg-loading">Загружаем главу…</p></section>

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp/program">{dir.name}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Глава {chapter.num}</span>
        <h1 className="prg-title">{chapter.title}</h1>
        <p className="prg-lead">{chapter.intro || chapter.summary}</p>
        <div className="prg-hero-meta">
          <span className="prg-chip">{chapter.sections.length} {plural(chapter.sections.length, 'раздел', 'раздела', 'разделов')}</span>
          {chapter.assignment && <span className="prg-chip">Задание: {chapter.assignment.time}</span>}
        </div>
      </div>

      <div className="prg-layout">
        <nav className="prg-toc" aria-label="Содержание главы">
          <div className="prg-toc-label">Содержание</div>
          {dir.start && (
            <button type="button" className="prg-toc-item is-start" onClick={() => jump('prg-start')}>
              <span className="prg-toc-num">→</span>
              <span>{dir.start.title}</span>
            </button>
          )}
          {chapter.sections.map(s => (
            <button key={s.id} type="button" className="prg-toc-item" onClick={() => jump(`prg-${s.id}`)}>
              <span className="prg-toc-num">{s.num}</span>
              <span>{s.title}</span>
            </button>
          ))}
          {chapter.assignment && (
            <button type="button" className="prg-toc-item is-task" onClick={() => jump('prg-assignment')}>
              <span className="prg-toc-num">✓</span>
              <span>Задание</span>
            </button>
          )}
        </nav>

        <div className="prg-content">
          <StartPanel start={dir.start} />
          {chapter.sections.map(s => (
            <section key={s.id} id={`prg-${s.id}`} className="prg-section">
              <div className="prg-section-head">
                <span className="prg-section-num">{s.num}</span>
                <h2 className="prg-section-title">{s.title}</h2>
              </div>
              <ProgramBlocks blocks={s.blocks} />
              <Terms terms={s.terms} />
            </section>
          ))}
          {chapter.assignment && <Assignment a={chapter.assignment} />}
        </div>
      </div>
    </section>
  )
}

export default function AutumnProgramPage({ user }) {
  const { chapter } = useParams()
  const dir = directionOf(user)

  if (!user?.isAutumnCamp2026) return <Pending title="Программа доступна участникам осеннего лагеря" />
  if (!dir) return <Pending title="Твоя индивидуальная программа ещё готовится" />
  if (chapter) return <Chapter dir={dir} chapterNum={Number(chapter)} />
  return <Overview dir={dir} />
}

