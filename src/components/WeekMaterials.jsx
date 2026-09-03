import { useState, useEffect } from 'react'
import { WEEK1_CHAPTERS, WEEK1_TITLE } from '../data/week1Materials'
import MultiPartVideo, { PYTHON_BASICS_PARTS } from './MultiPartVideo'

const VIDEO_SETS = {
  'python-basics': PYTHON_BASICS_PARTS,
}

const VISITED_KEY = 'kiro_week1_visited'

function loadVisited() {
  try {
    return new Set(JSON.parse(localStorage.getItem(VISITED_KEY)) || [])
  } catch {
    return new Set()
  }
}

// Инлайн-разметка внутри текста: **жирный** и `код`
function renderInline(text) {
  const parts = String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--text-primary)' }}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.92em', color: '#FFB870',
          background: 'rgba(255,140,66,0.10)', padding: '1px 5px', borderRadius: 4,
        }}>
          {part.slice(1, -1)}
        </code>
      )
    }
    return part
  })
}

function Block({ block }) {
  const { t, v } = block

  if (t === 'h') {
    return (
      <h3 style={{
        fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)',
        margin: '26px 0 10px',
      }}>
        {v}
      </h3>
    )
  }

  if (t === 'p') {
    return (
      <p style={{ margin: '0 0 12px', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
        {renderInline(v)}
      </p>
    )
  }

  if (t === 'ul' || t === 'ol') {
    const List = t === 'ul' ? 'ul' : 'ol'
    return (
      <List style={{ margin: '0 0 14px', paddingLeft: 22, fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
        {v.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{renderInline(item)}</li>)}
      </List>
    )
  }

  if (t === 'code') {
    return (
      <pre style={{
        margin: '0 0 14px', padding: '12px 14px', background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)', borderRadius: 10,
        fontFamily: 'var(--font-mono)', fontSize: 12.5, lineHeight: 1.6,
        color: 'var(--text-primary)', overflowX: 'auto', whiteSpace: 'pre',
      }}>
        <code>{v}</code>
      </pre>
    )
  }

  if (t === 'note') {
    return (
      <div style={{
        margin: '0 0 14px', padding: '12px 14px', borderRadius: 10,
        background: 'rgba(255,140,66,0.08)', borderLeft: '3px solid rgba(255,140,66,0.6)',
        fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7,
      }}>
        {renderInline(v)}
      </div>
    )
  }

  if (t === 'video') {
    const parts = VIDEO_SETS[v]
    if (!parts) return null
    return (
      <div style={{ marginBottom: 14 }}>
        <MultiPartVideo parts={parts} />
      </div>
    )
  }

  if (t === 'link') {
    return (
      <a
        href={block.href}
        target="_blank"
        rel="noopener"
        style={{
          display: 'block', margin: '0 0 14px', padding: '14px 16px', borderRadius: 'var(--radius-md)',
          background: 'rgba(255,214,10,0.06)', border: '1px solid rgba(255,214,10,0.3)', textDecoration: 'none',
        }}
      >
        <div style={{ fontFamily: 'var(--font-syne)', fontSize: 13.5, fontWeight: 700, color: 'var(--accent-lime)', marginBottom: 4 }}>
          {block.title} →
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {block.text}
        </div>
      </a>
    )
  }

  if (t === 'cards') {
    return (
      <div className="material-cards">
        {v.map((card, i) => (
          <div key={i} style={{
            background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)', padding: 14,
          }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 13, fontWeight: 700, color: '#FFB870', marginBottom: 6 }}>
              {card.title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {renderInline(card.text)}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return null
}

function SelfCheckItem({ item, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-md)', overflow: 'hidden',
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          gap: 12, background: 'transparent', border: 'none', padding: '12px 14px',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5 }}>
          {index + 1}. {item.q}
        </span>
        <span style={{ fontSize: 11.5, color: '#FFB870', whiteSpace: 'nowrap', flexShrink: 0, fontWeight: 700 }}>
          {open ? 'скрыть' : 'ответ'}
        </span>
      </button>
      <div className={`collapse-wrap${open ? ' open' : ''}`}>
        <div className="collapse-inner">
          <p style={{
            margin: '0 14px 14px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7,
            paddingTop: 2, borderTop: '1px solid var(--border-color)',
          }}>
            <span style={{ display: 'block', paddingTop: 10 }}>{renderInline(item.a)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function Quiz({ quiz, chapterId }) {
  const [picked, setPicked] = useState(null)
  useEffect(() => { setPicked(null) }, [chapterId])

  const isCorrect = picked === quiz.correct

  return (
    <div style={{
      background: 'var(--bg-tertiary)', border: '1px solid rgba(255,140,66,0.35)',
      borderRadius: 'var(--radius-md)', padding: 16,
    }}>
      <div style={{
        fontFamily: 'var(--font-syne)', fontSize: 11, fontWeight: 700, color: '#FFB870',
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10,
      }}>
        Проверь себя
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: 14, whiteSpace: 'pre-wrap' }}>
        {quiz.question}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {quiz.options.map((option, i) => {
          const chosen = picked === i
          const showAsCorrect = picked !== null && i === quiz.correct
          const showAsWrong = chosen && i !== quiz.correct

          let border = '1px solid var(--border-color)'
          let background = 'var(--bg-primary)'
          if (showAsCorrect) {
            border = '1px solid var(--success)'
            background = 'var(--success-dim)'
          } else if (showAsWrong) {
            border = '1px solid var(--danger)'
            background = 'var(--danger-dim)'
          }

          return (
            <button
              key={i}
              onClick={() => setPicked(i)}
              disabled={picked !== null}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', textAlign: 'left',
                border, background, borderRadius: 10, padding: '10px 12px',
                fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.5,
                cursor: picked === null ? 'pointer' : 'default',
              }}
            >
              <span style={{
                flexShrink: 0, width: 22, height: 22, borderRadius: '50%',
                border: '1px solid var(--border-color)', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)',
              }}>
                {['А', 'Б', 'В', 'Г'][i]}
              </span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>

      {picked !== null && (
        <div style={{ marginTop: 14 }}>
          <div style={{
            fontSize: 13.5, fontWeight: 700, marginBottom: 6,
            color: isCorrect ? 'var(--success)' : 'var(--danger)',
          }}>
            {isCorrect ? 'Верно' : 'Неверно'}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {renderInline(quiz.explanation)}
          </div>
          <button
            onClick={() => setPicked(null)}
            style={{
              marginTop: 12, background: 'transparent', border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)', borderRadius: 10, padding: '7px 16px',
              fontSize: 12.5, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Ответить заново
          </button>
        </div>
      )}
    </div>
  )
}

export default function WeekMaterials() {
  const [active, setActive] = useState(0)
  const [visited, setVisited] = useState(loadVisited)

  const chapter = WEEK1_CHAPTERS[active]

  // Отмечаем главу посещённой при заходе на неё
  useEffect(() => {
    setVisited(prev => {
      if (prev.has(chapter.id)) return prev
      const next = new Set(prev)
      next.add(chapter.id)
      try {
        localStorage.setItem(VISITED_KEY, JSON.stringify([...next]))
      } catch { /* приватный режим — прогресс просто не сохранится */ }
      return next
    })
  }, [chapter.id])

  const go = index => {
    setActive(index)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      <h2 style={{ marginTop: 0, marginBottom: 14, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        {WEEK1_TITLE}
      </h2>

      {/* Пагинация */}
      <div className="material-pager">
        {WEEK1_CHAPTERS.map((ch, i) => {
          const isActive = i === active
          const isVisited = visited.has(ch.id)
          return (
            <button
              key={ch.id}
              onClick={() => go(i)}
              title={ch.title}
              className={`material-dot${isActive ? ' is-active' : isVisited ? ' is-visited' : ''}`}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      <div className="widget" style={{ marginBottom: 16 }}>
        <div style={{
          fontFamily: 'var(--font-syne)', fontSize: 11, fontWeight: 700, color: '#FFB870',
          textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6,
        }}>
          Глава {active + 1} из {WEEK1_CHAPTERS.length}
        </div>
        <h3 style={{ margin: '0 0 18px', fontFamily: 'var(--font-syne)', fontSize: 19, fontWeight: 700, color: 'var(--text-primary)' }}>
          {chapter.title}
        </h3>

        {chapter.blocks.map((block, i) => <Block key={i} block={block} />)}
      </div>

      <div className="widget" style={{ marginBottom: 16 }}>
        <div className="widget-header">
          <span className="widget-title">Вопросы по теме</span>
        </div>
        <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--text-tertiary)', lineHeight: 1.6 }}>
          Ответь на них сам, а потом открой ответ и сравни — так сразу видно, что усвоилось, а что стоит перечитать.
          По клику на вопрос показывается ответ, по клику ещё раз — скрывается обратно.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {chapter.selfCheck.map((item, i) => (
            <SelfCheckItem key={`${chapter.id}-${i}`} item={item} index={i} />
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        <Quiz quiz={chapter.quiz} chapterId={chapter.id} />
      </div>

      {/* Навигация по главам */}
      <div className="widget" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={() => go(active - 1)}
          disabled={active === 0}
          style={{
            background: 'transparent', border: '1px solid var(--border-color)',
            color: active === 0 ? 'var(--text-tertiary)' : 'var(--text-secondary)',
            borderRadius: 12, padding: '10px 20px', fontSize: 13.5, fontWeight: 700,
            cursor: active === 0 ? 'not-allowed' : 'pointer', opacity: active === 0 ? 0.5 : 1,
          }}
        >
          ← Назад
        </button>

        <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
          Пройдено {visited.size} из {WEEK1_CHAPTERS.length}
        </span>

        {active < WEEK1_CHAPTERS.length - 1 ? (
          <button
            onClick={() => go(active + 1)}
            style={{
              background: 'var(--accent-lime)', color: 'var(--on-accent)', border: 'none',
              borderRadius: 12, padding: '10px 22px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
            }}
          >
            {WEEK1_CHAPTERS[active + 1].short} →
          </button>
        ) : (
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--success)' }}>
            Это последняя глава
          </span>
        )}
      </div>
    </div>
  )
}
