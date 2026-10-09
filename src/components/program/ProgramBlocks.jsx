// Отрисовка блоков главы индивидуальной программы.
// Разметка в тексте: **жирный**, _курсив_, перевод строки — \n, формула LaTeX — \( … \).
// Выключные формулы — блок tex: строки 'формула' или ['подпись слева', 'формула'].

import { createContext, useContext, useEffect, useState } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

// Направление и глава — нужны блоку files, чтобы скачать файл задания
export const ProgramContext = createContext(null)

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Прогресс в SQL-тренажёре: сколько задач решено в каждой теме
function TrainerProgress() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  useEffect(() => {
    let alive = true
    api.sqlTrainer().then(d => { if (alive) setData(d) }).catch(() => { if (alive) setData({ failed: true }) })
    return () => { alive = false }
  }, [])

  const categories = data?.categories || []
  const solved = new Set(data?.solved || [])
  const total = categories.reduce((n, c) => n + c.tasks.length, 0)
  const done = categories.reduce((n, c) => n + c.tasks.filter(t => solved.has(t.id)).length, 0)

  return (
    <div className="prg-trainer">
      <div className="prg-trainer-head">
        <div>
          <div className="prg-files-label">SQL-тренажёр</div>
          <div className="prg-trainer-count">
            {!data ? 'Загружаем прогресс…' : data.failed ? 'Не удалось загрузить прогресс' : `Решено ${done} из ${total}`}
          </div>
        </div>
        <button type="button" className="prg-task-cta-btn" onClick={() => navigate('/trainings/sql')}>Открыть тренажёр →</button>
      </div>
      {total > 0 && (
        <>
          <div className="pq-progress" aria-hidden="true"><span style={{ width: `${(done / total) * 100}%` }} /></div>
          <div className="prg-trainer-grid">
            {categories.map(c => {
              const n = c.tasks.filter(t => solved.has(t.id)).length
              return (
                <div key={c.id} className={`prg-trainer-cat${n === c.tasks.length ? ' is-done' : ''}`}>
                  <span className="prg-trainer-cat-title">{c.title.split(':')[0]}</span>
                  <span className="prg-trainer-cat-count">{n} / {c.tasks.length}</span>
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}

// Файлы к заданию (ноутбуки, датасеты) отдаются только по токену студента
function Files({ b }) {
  const ctx = useContext(ProgramContext)
  const [busy, setBusy] = useState(null)
  const [error, setError] = useState('')
  const get = async (name) => {
    if (!ctx || busy) return
    setBusy(name)
    setError('')
    try {
      await api.downloadProgramFile(ctx.direction, ctx.chapter, name)
    } catch (e) {
      setError(e.message || 'Не получилось скачать файл')
    } finally {
      setBusy(null)
    }
  }
  return (
    <div className="prg-files">
      {b.label && <div className="prg-files-label">{b.label}</div>}
      {b.items.map(it => (
        <button key={it.name} type="button" className="prg-file" onClick={() => get(it.name)} disabled={busy === it.name}>
          <span className="prg-file-icon"><DownloadIcon /></span>
          <span className="prg-file-text">
            <span className="prg-file-name">{it.name}</span>
            {it.title && <span className="prg-file-title">{it.title}</span>}
          </span>
          <span className="prg-file-action">{busy === it.name ? 'Скачиваем…' : 'Скачать'}</span>
        </button>
      ))}
      {error && <div className="prg-files-error" role="alert">{error}</div>}
    </div>
  )
}

// Курсив — только _слово_ на границе слов, чтобы не ломать created_at и __name__.
// Формула \( … \) стоит первой в альтернативе: подчёркивания внутри LaTeX курсивом не считаются.
const RICH = /(\\\(.+?\\\)|\*\*[^*]+\*\*|(?<![\p{L}\p{N}_])_[^_\n]+_(?![\p{L}\p{N}_]))/gu

export function Tex({ tex, display = false }) {
  const html = katex.renderToString(tex, { displayMode: display, throwOnError: false, strict: false, output: 'html' })
  return <span className={display ? 'prg-tex-display' : 'prg-tex'} dangerouslySetInnerHTML={{ __html: html }} />
}

export function Rich({ text }) {
  const lines = String(text).split('\n')
  return lines.map((line, li) => (
    <span key={li}>
      {li > 0 && <br />}
      {line.split(RICH).map((part, i) => {
        if (part.startsWith('\\(') && part.endsWith('\\)')) return <Tex key={i} tex={part.slice(2, -2)} />
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
            <li key={i}><span className="prg-letter">{LETTERS[(b.start || 0) + i]})</span><span><Rich text={it} /></span></li>
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
    case 'tex': {
      const rows = b.rows.map(r => (Array.isArray(r) ? r : ['', r]))
      const labeled = rows.some(([label]) => label)
      return (
        <div className={`prg-texblock${labeled ? ' is-labeled' : ''}`}>
          {rows.map(([label, tex], i) => (
            <div key={i} className="prg-texrow">
              {labeled && <span className="prg-texlabel"><Rich text={label} /></span>}
              <Tex tex={tex} display />
            </div>
          ))}
        </div>
      )
    }
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
    case 'files':
      return <Files b={b} />
    case 'trainer':
      return <TrainerProgress />
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
