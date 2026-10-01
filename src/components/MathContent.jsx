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

// График y = x² и касательная в точке (1; 1): рисунок к разделу о производной
function TangentFigure() {
  const X0 = 112, Y0 = 188, SX = 52, SY = 27        // начало координат и масштаб
  const px = x => X0 + x * SX
  const py = y => Y0 - y * SY
  const curve = []
  for (let x = -1.2; x <= 2.45; x += 0.05) curve.push(`${curve.length ? 'L' : 'M'}${px(x).toFixed(1)} ${py(x * x).toFixed(1)}`)

  return (
    <svg className="math-svg" viewBox="0 0 380 236" role="img" aria-label="График y = x² и касательная в точке (1; 1)">
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.55" fill="none">
        <path d={`M${px(-1.5)} ${Y0} H${px(3.1)}`} />
        <path d={`M${X0} ${py(-0.6)} V${py(6.2)}`} />
        {[-1, 1, 2, 3].map(t => <path key={t} d={`M${px(t)} ${Y0 - 3} V${Y0 + 3}`} />)}
        {[1, 2, 4, 6].map(t => <path key={t} d={`M${X0 - 3} ${py(t)} H${X0 + 3}`} />)}
      </g>
      <g fill="currentColor" opacity="0.7" fontSize="11" fontFamily="Georgia, serif">
        {[-1, 1, 2, 3].map(t => <text key={t} x={px(t)} y={Y0 + 16} textAnchor="middle">{t}</text>)}
        {[1, 2, 4, 6].map(t => <text key={t} x={X0 - 9} y={py(t) + 4} textAnchor="end">{t}</text>)}
        <text x={px(3.1) - 2} y={Y0 - 8} fontStyle="italic">x</text>
        <text x={X0 + 8} y={py(6.2) + 10} fontStyle="italic">y</text>
      </g>
      <path d={curve.join(' ')} fill="none" stroke="#FFB870" strokeWidth="2" />
      <path d={`M${px(-0.2)} ${py(-2.4)} L${px(2.6)} ${py(4.2)}`} fill="none" stroke="#7EE787" strokeWidth="1.6" strokeDasharray="5 4" />
      <circle cx={px(1)} cy={py(1)} r="3.6" fill="#FFD60A" />
      <g fontSize="12" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">
        <text x={px(1) + 9} y={py(1) + 14} fontStyle="normal">(1; 1)</text>
        <text x={px(-1.35)} y={py(1.9)}>y = x²</text>
        <text x={px(2.6) - 6} y={py(4.2) + 16} fill="#7EE787">y = 2x − 1</text>
      </g>
    </svg>
  )
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
    if (block.t === 'table') {
      return (
        <div key={i} className="math-table-wrap">
          <table className={`math-table${block.math ? '' : ' is-text'}`}>
            <thead>
              <tr>{block.head.map((h, j) => <th key={j}>{block.math ? <M>{h}</M> : <MathText>{h}</MathText>}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td key={c}>{block.math ? <M>{String(cell)}</M> : <MathText>{String(cell)}</MathText>}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    }
    if (block.t === 'figure') {
      return (
        <figure key={i} className="math-figure">
          {block.kind === 'tangent' && <TangentFigure />}
          {block.caption && <figcaption><MathText>{block.caption}</MathText></figcaption>}
        </figure>
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
