import { useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import PythonRunner from '../PythonRunner'
import { plotSvg } from '../../data/programs/plot'
import { AlertIcon, BulbIcon, InfoIcon, PlayIcon } from '../icons'

// Блоки теории урока курса (формат — src/data/courses/python/blocks.js).
// Inline-разметка: **жирный**, `код`, формула $…$ (LaTeX, рисует KaTeX), перевод строки \n.

export function Tex({ tex, display = false }) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, output: 'html' })
  return <span className={display ? 'ls-tex-display' : 'ls-tex'} dangerouslySetInnerHTML={{ __html: html }} />
}

// Формула идёт первой в альтернативе: звёздочки и обратные кавычки внутри LaTeX не считаются разметкой
const INLINE = /(\$[^$\n]+\$|\*\*[^*]+\*\*|`[^`]+`)/g

export function Inline({ text }) {
  const lines = String(text ?? '').split('\n')
  return lines.map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(INLINE).map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$') && part.length > 2) return <Tex key={i} tex={part.slice(1, -1)} />
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return <strong key={i}><Inline text={part.slice(2, -2)} /></strong>
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) return <code key={i} className="ls-code">{part.slice(1, -1)}</code>
        return part
      })}
    </span>
  ))
}

// Пример кода: показывается как текст с результатом, по кнопке превращается
// в редактор с запуском — так страница не держит десятки редакторов сразу
function PyExample({ code, out }) {
  const [live, setLive] = useState(false)
  const [value, setValue] = useState(code)

  if (live) {
    return (
      <div className="ls-py is-live">
        <PythonRunner value={value} onChange={setValue} minLines={Math.min(value.split('\n').length, 14)} />
        <div className="ls-py-actions">
          <button type="button" className="ls-link" onClick={() => setValue(code)}>Вернуть исходный код</button>
          <button type="button" className="ls-link" onClick={() => { setLive(false); setValue(code) }}>Свернуть</button>
        </div>
      </div>
    )
  }
  return (
    <div className="ls-py">
      <div className="ls-py-head">
        <span>Python</span>
        <button type="button" className="ls-py-run" onClick={() => setLive(true)}><PlayIcon size={12} />Запустить и изменить</button>
      </div>
      <pre className="ls-pre">{code}</pre>
      {out != null && (
        <div className="ls-out">
          <span className="ls-out-label">Результат</span>
          <pre>{out === '' ? '(ничего не выводит)' : out}</pre>
        </div>
      )}
    </div>
  )
}

export default function LessonBlocks({ blocks }) {
  return blocks.map((b, i) => {
    switch (b.t) {
      case 'p': return <p key={i} className="ls-p"><Inline text={b.v} /></p>
      case 'h': return <h4 key={i} className="ls-h">{b.v}</h4>
      case 'list': return <ul key={i} className="ls-list">{b.v.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ul>
      case 'steps': return <ol key={i} className="ls-steps">{b.v.map((x, j) => <li key={j}><Inline text={x} /></li>)}</ol>
      case 'py': return <PyExample key={i} code={b.v} out={b.out} />
      case 'shell':
        return (
          <div key={i} className="ls-py is-shell">
            <div className="ls-py-head"><span>{b.label || 'Терминал'}</span></div>
            <pre className="ls-pre">{b.v}</pre>
          </div>
        )
      case 'tex':
        return <div key={i} className="ls-formula"><Tex tex={b.v} display /></div>
      case 'plot':
        return (
          <figure key={i} className="prg-plot ls-plot">
            <div className="prg-plot-svg" dangerouslySetInnerHTML={{ __html: plotSvg(b) }} />
            {b.caption && <figcaption><Inline text={b.caption} /></figcaption>}
          </figure>
        )
      case 'note':
      case 'tip':
      case 'warn': {
        const label = { note: 'Важно', tip: 'Совет', warn: 'Осторожно' }[b.t]
        const Icon = { note: InfoIcon, tip: BulbIcon, warn: AlertIcon }[b.t]
        return (
          <div key={i} className={`ls-callout is-${b.t}`}>
            <span className="ls-callout-label"><Icon size={14} />{label}</span>
            <span><Inline text={b.v} /></span>
          </div>
        )
      }
      case 'table':
        return (
          <div key={i} className="ls-table-wrap">
            <table className="ls-table">
              <thead><tr>{b.head.map((c, j) => <th key={j}><Inline text={c} /></th>)}</tr></thead>
              <tbody>{b.rows.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k}><Inline text={c} /></td>)}</tr>)}</tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  })
}
