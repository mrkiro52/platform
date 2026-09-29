import MathExpr, { M, MathCases } from './MathExpr'

// Инлайн-разметка внутри абзаца: **жирный** и $формула$
export function MathText({ children }) {
  const parts = String(children).split(/(\*\*[^*]+\*\*|\$[^$]+\$)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('$') && part.endsWith('$') && part.length > 2) {
      return <M key={i}>{part.slice(1, -1)}</M>
    }
    return part
  })
}

export default function MathBlocks({ blocks }) {
  return blocks.map((block, i) => {
    if (block.t === 'p') {
      return <p key={i} className="math-p"><MathText>{block.v}</MathText></p>
    }
    if (block.t === 'm') {
      return <MathExpr key={i}>{block.v}</MathExpr>
    }
    if (block.t === 'cases') {
      return <MathCases key={i} lines={block.v} />
    }
    if (block.t === 'list') {
      return (
        <ul key={i} className="math-list">
          {block.v.map((item, j) => <li key={j}><MathText>{item}</MathText></li>)}
        </ul>
      )
    }
    if (block.t === 'note') {
      return (
        <div key={i} className="math-note">
          <span className="math-note-label">На что обратить внимание</span>
          <p className="math-p"><MathText>{block.v}</MathText></p>
        </div>
      )
    }
    return null
  })
}
