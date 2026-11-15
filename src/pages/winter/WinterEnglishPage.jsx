import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import WinterBlocks from '../../components/winter/WinterBlocks'
import { plural } from '../../components/winter/winterLocal'
import '../../winter.css'

// Английский: один большой конспект-лонгрид (src/data/winter/content/english.js).

export default function WinterEnglishPage({ user }) {
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    let alive = true
    import('../../data/winter/content/english').then(m => { if (alive) setLesson(m.default) })
    window.scrollTo(0, 0)
    return () => { alive = false }
  }, [])

  if (!user?.isWinterCamp2027) return null
  if (!lesson) return <section className="page active prg-page is-winter"><p className="prg-loading">Загружаем конспект…</p></section>

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="page active prg-page is-winter">
      <Link className="prg-back" to="/winter-camp">← Winter Camp</Link>
      <div className="prg-hero">
        <span className="prg-tag">Английский · единый конспект</span>
        <h1 className="prg-title">{lesson.title}</h1>
        <p className="prg-lead">{lesson.intro}</p>
        <div className="prg-hero-meta">
          <span className="prg-chip">{lesson.sections.length} {plural(lesson.sections.length, 'раздел', 'раздела', 'разделов')}</span>
          <span className="prg-chip">читать в своём темпе</span>
        </div>
      </div>

      <div className="prg-layout">
        <nav className="prg-toc" aria-label="Содержание">
          <div className="prg-toc-label">Содержание</div>
          {lesson.sections.map((s, i) => (
            <button key={s.id} type="button" className="prg-toc-item" onClick={() => jump(`prg-${s.id}`)}>
              <span className="prg-toc-num">{i + 1}</span>
              <span>{s.title}</span>
            </button>
          ))}
        </nav>
        <div className="prg-content">
          {lesson.sections.map((s, i) => (
            <section key={s.id} id={`prg-${s.id}`} className="prg-section">
              <div className="prg-section-head">
                <span className="prg-section-num">{i + 1}</span>
                <h2 className="prg-section-title">{s.title}</h2>
              </div>
              <WinterBlocks blocks={s.blocks} />
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
