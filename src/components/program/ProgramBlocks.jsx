// Отрисовка блоков главы индивидуальной программы.
// Разметка в тексте: **жирный**, _курсив_, перевод строки — \n.

export function Rich({ text }) {
  const lines = String(text).split('\n')
  return lines.map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*|_[^_]+_)/g).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={i}>{part.slice(2, -2)}</strong>
        if (part.startsWith('_') && part.endsWith('_') && part.length > 2) return <em key={i}>{part.slice(1, -1)}</em>
        return part
      })}
    </span>
  ))
}

const LETTERS = 'абвгдежзик'

function Block({ b }) {
  switch (b.t) {
    case 'h3':
      return <h3 className="prg-h3"><Rich text={b.text} /></h3>
    case 'h4':
      return <h4 className="prg-h4"><Rich text={b.text} /></h4>
    case 'p':
      return <p className="prg-p"><Rich text={b.text} /></p>
    case 'small':
      return <p className="prg-small"><Rich text={b.text} /></p>
    case 'ul':
      return <ul className="prg-ul">{b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}</ul>
    case 'ol':
      return (
        <ol className="prg-ol" start={b.start || 1} style={{ counterReset: `prg ${(b.start || 1) - 1}` }}>
          {b.items.map((it, i) => <li key={i}><Rich text={it} /></li>)}
        </ol>
      )
    case 'letters':
      return (
        <ul className="prg-letters">
          {b.items.map((it, i) => (
            <li key={i}><span className="prg-letter">{LETTERS[i]})</span><span><Rich text={it} /></span></li>
          ))}
        </ul>
      )
    case 'table':
      return (
        <figure className="prg-table">
          {b.caption && <figcaption>{b.caption}</figcaption>}
          <div className="prg-table-scroll">
            <table className={b.numeric ? 'is-numeric' : ''}>
              <thead><tr>{b.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
              <tbody>
                {b.rows.map((r, i) => (
                  <tr key={i}>{r.map((c, j) => <td key={j}><Rich text={c} /></td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>
        </figure>
      )
    case 'quote':
      return (
        <blockquote className="prg-quote">
          {b.paras.map((p, i) => <p key={i}><Rich text={p} /></p>)}
        </blockquote>
      )
    case 'formula':
      return (
        <div className="prg-formula">
          {b.lines.map(([op, text], i) => (
            <div key={i} className="prg-formula-row">
              <span className="prg-formula-op">{op}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      )
    case 'flow':
      return (
        <div className="prg-flow" role="list">
          {b.steps.map((s, i) => (
            <span key={i} className="prg-flow-item" role="listitem">
              <span className="prg-flow-step">{s}</span>
              {i < b.steps.length - 1 && <span className="prg-flow-arrow" aria-hidden="true">→</span>}
            </span>
          ))}
        </div>
      )
    case 'reading':
      return (
        <div className="prg-reading">
          <div className="prg-reading-label">{b.label}</div>
          {b.items.map((it, i) => (
            <a key={i} className="prg-reading-item" href={it.url} target="_blank" rel="noopener noreferrer">
              <span className="prg-reading-title">{it.title}</span>
              <span className="prg-reading-url">{it.url.replace(/^https?:\/\//, '')} ↗</span>
            </a>
          ))}
        </div>
      )
    case 'frac':
      return (
        <div className="prg-frac">
          <span className="prg-frac-label">{b.label} =</span>
          <span className="prg-frac-body">
            <span className="prg-frac-num">{b.num}</span>
            <span className="prg-frac-den">{b.den}</span>
          </span>
        </div>
      )
    case 'tree':
      return (
        <div className="prg-tree">
          {b.lines.map(([level, text], i) => (
            <div key={i} className={`prg-tree-row lvl-${level}`} style={{ paddingLeft: level * 22 }}>
              <Rich text={text} />
            </div>
          ))}
        </div>
      )
    case 'code':
      return <pre className="prg-code"><code>{b.text}</code></pre>
    case 'note':
      return <div className="prg-note"><Rich text={b.text} /></div>
    case 'example':
      return (
        <div className="prg-example">
          <span className="prg-example-label">{b.label || 'Пример задачи'}</span>
          <span><Rich text={b.text} /></span>
        </div>
      )
    case 'split':
      return (
        <div className="prg-split">
          {b.columns.map((c, i) => (
            <div key={i} className={`prg-split-col is-${c.tone}`}>
              <div className="prg-split-title">{c.title}</div>
              <ul>{c.items.map((it, j) => <li key={j}><Rich text={it} /></li>)}</ul>
            </div>
          ))}
        </div>
      )
    case 'compare':
      return (
        <div className="prg-compare">
          {b.items.map((c, i) => (
            <div key={i} className={`prg-compare-item is-${c.tone}`}>
              <div className="prg-compare-label">{c.label}</div>
              <div><Rich text={c.text} /></div>
            </div>
          ))}
        </div>
      )
    default:
      return null
  }
}

export default function ProgramBlocks({ blocks }) {
  return blocks.map((b, i) => <Block key={i} b={b} />)
}
