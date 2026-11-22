import { useEffect, useState } from 'react'
import ProgramBlocks, { Rich } from '../program/ProgramBlocks'
import AlgoViz from '../AlgoViz'

// Блоки урока зимнего лагеря: всё, что умеет ProgramBlocks, плюс блоки недельных материалов
// (карточки, пошаговые схемы, ссылки), которые приходят из lessonFromWeek, и блоки курса
// по кибербезопасности: раскрывающийся разбор ответа (reveal).

function Special({ b }) {
  switch (b.t) {
    case 'cards':
      return (
        <div className="wl-cards">
          {b.items.map((card, i) => (
            <div key={i} className="wl-card">
              <div className="wl-card-title">{card.title}</div>
              <div className="wl-card-text"><Rich text={card.text} /></div>
            </div>
          ))}
        </div>
      )
    case 'viz':
      return <div className="wl-viz"><AlgoViz block={b.block} /></div>
    case 'reveal':
      return (
        <details className="wl-reveal">
          <summary>{b.title || 'Разбор и ответ'}</summary>
          <div className="wl-reveal-body"><WinterBlocks blocks={b.blocks} /></div>
        </details>
      )
    case 'linkcard':
      return (
        <a className="wl-linkcard" href={b.href} target="_blank" rel="noopener noreferrer">
          <span className="wl-linkcard-title">{b.title} →</span>
          <span className="wl-linkcard-text">{b.text}</span>
        </a>
      )
    default:
      return null
  }
}

const SPECIAL = new Set(['cards', 'viz', 'linkcard', 'reveal'])

export default function WinterBlocks({ blocks }) {
  // Подряд идущие обычные блоки отдаём ProgramBlocks пачкой
  const groups = []
  for (const b of blocks) {
    const last = groups[groups.length - 1]
    if (SPECIAL.has(b.t)) groups.push({ special: b })
    else if (last && last.plain) last.plain.push(b)
    else groups.push({ plain: [b] })
  }
  return groups.map((g, i) => (g.special ? <Special key={i} b={g.special} /> : <ProgramBlocks key={i} blocks={g.plain} />))
}

// Вопросы для самопроверки: ответ скрыт, пока не нажмёшь
export function SelfCheck({ items }) {
  const [open, setOpen] = useState(() => new Set())
  useEffect(() => { setOpen(new Set()) }, [items])
  if (!items?.length) return null
  const toggle = (i) => setOpen(prev => {
    const next = new Set(prev)
    if (next.has(i)) next.delete(i); else next.add(i)
    return next
  })
  return (
    <section id="prg-selfcheck" className="prg-section wl-selfcheck">
      <div className="prg-section-head">
        <span className="prg-section-num">?</span>
        <h2 className="prg-section-title">Проверь себя</h2>
      </div>
      <p className="prg-small">Сначала ответь сам — вслух или в уме, — потом открой ответ и сравни. Так сразу видно, что усвоилось, а что стоит перечитать.</p>
      <div className="wl-qa-list">
        {items.map((item, i) => (
          <div key={i} className={`wl-qa${open.has(i) ? ' is-open' : ''}`}>
            <button type="button" className="wl-qa-q" onClick={() => toggle(i)} aria-expanded={open.has(i)}>
              <span className="wl-qa-n">{i + 1}</span>
              <span className="wl-qa-text">{item.q}</span>
              <span className="wl-qa-toggle">{open.has(i) ? 'скрыть' : 'ответ'}</span>
            </button>
            {open.has(i) && <div className="wl-qa-a"><Rich text={item.a} /></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

// Один вопрос с вариантами в конце главы — быстрая проверка, никуда не отправляется
export function MiniQuiz({ quiz }) {
  const [picked, setPicked] = useState(null)
  useEffect(() => { setPicked(null) }, [quiz])
  if (!quiz) return null
  const right = picked === quiz.correct
  return (
    <section className="prg-section wl-mini">
      <div className="prg-section-head">
        <span className="prg-section-num">Тест</span>
        <h2 className="prg-section-title">Быстрый вопрос</h2>
      </div>
      <div className="wl-mini-q">{quiz.question}</div>
      <div className="wl-mini-options">
        {quiz.options.map((option, i) => {
          const cls = ['wl-mini-option']
          if (picked !== null && i === quiz.correct) cls.push('is-right')
          else if (picked === i) cls.push('is-wrong')
          return (
            <button key={i} type="button" className={cls.join(' ')} disabled={picked !== null} onClick={() => setPicked(i)}>
              <span className="wl-mini-letter">{'АБВГД'[i]}</span>
              <span>{option}</span>
            </button>
          )
        })}
      </div>
      {picked !== null && (
        <div className={`wl-mini-result${right ? ' is-right' : ' is-wrong'}`}>
          <b>{right ? 'Верно.' : 'Неверно.'}</b> <Rich text={quiz.explanation} />
          <button type="button" className="wl-mini-again" onClick={() => setPicked(null)}>Ответить заново</button>
        </div>
      )}
    </section>
  )
}
