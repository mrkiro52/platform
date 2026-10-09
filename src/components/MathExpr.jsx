// Мини-рендерер формул. Понимает подмножество LaTeX, которого хватает курсу:
// \frac{}{}, \sqrt{}, степени и индексы (^ и _), плюс набор символов.
// Для линейной алгебры: матрицы \begin{pmatrix}…\end{pmatrix} (а также bmatrix, vmatrix и
// расширенная матрица \begin{amatrix}{k} с чертой после k-го столбца), стрелки над векторами
// \vec{a} и \overrightarrow{AB}, подписанная стрелка \xrightarrow{…}.
// Полноценный KaTeX сюда тянуть незачем — это лишние 300 КБ ради девяти тем.

const SYMBOLS = {
  pm: '±', mp: '∓', cdot: '·', times: '×', div: ':',
  le: '≤', ge: '≥', ne: '≠', approx: '≈', equiv: '≡',
  Rightarrow: '⟹', Leftarrow: '⟸', rightarrow: '→', to: '→', iff: '⟺',
  in: '∈', notin: '∉', subset: '⊂', subseteq: '⊆', cup: '∪', cap: '∩',
  varnothing: '∅', infty: '∞', ldots: '…', dots: '…',
  Delta: 'Δ', alpha: 'α', beta: 'β', pi: 'π', varepsilon: 'ε', lambda: 'λ',
  N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ',
  percent: '%', quad: '\u2003', ',': '\u2009',
  ';': '\u2005',
  qquad: '\u2003\u2003',
  land: '∧', lor: '∨', neg: '¬', lnot: '¬',
  leftrightarrow: '↔', Leftrightarrow: '⟺',
  nabla: '∇', partial: '∂', eta: 'η', mu: 'μ', sigma: 'σ',
  neq: '≠', Longrightarrow: '⟹', mid: '∣', vdots: '⋮', cdots: '⋯', ddots: '⋱',
}

// Имена функций пишутся прямым шрифтом, а не курсивом переменных
const UPRIGHT = new Set(['ln', 'log', 'lim', 'max', 'min', 'sin', 'cos', 'exp', 'det'])

const MATRIX_ENVS = new Set(['pmatrix', 'bmatrix', 'vmatrix', 'amatrix'])

function parse(src) {
  let i = 0

  function seq(stop) {
    const out = []
    let buf = ''
    const flush = () => { if (buf) { out.push({ t: 'txt', v: buf }); buf = '' } }

    while (i < src.length) {
      const c = src[i]
      if (stop && c === stop) break

      if (c === '\\') {
        const m = /^\\([a-zA-Z]+|,|;)/.exec(src.slice(i))
        if (!m) { i += 1; buf += src[i] ?? ''; i += 1; continue }
        i += m[0].length
        const name = m[1]
        if (name === 'frac') { flush(); const a = group(); const b = group(); out.push({ t: 'frac', a, b }); continue }
        if (name === 'sqrt') { flush(); out.push({ t: 'sqrt', a: group() }); continue }
        if (name === 'text') { flush(); out.push({ t: 'text', a: group() }); continue }
        if (name === 'vec' || name === 'overrightarrow') { flush(); out.push({ t: 'vec', a: group() }); continue }
        if (name === 'xrightarrow') { flush(); out.push({ t: 'xarrow', a: group() }); continue }
        if (name === 'begin') { flush(); out.push(matrix()); continue }
        // \left( и \right) — только подсказка размера скобки, сама скобка идёт следом
        if (name === 'left' || name === 'right') continue
        if (UPRIGHT.has(name)) { flush(); out.push({ t: 'text', a: [{ t: 'txt', v: name }] }); continue }
        buf += SYMBOLS[name] ?? name
        continue
      }

      // Одиночные скобки в тексте — группировка вида 1{,}5, сами по себе не печатаются
      if (c === '{' || c === '}') { i += 1; continue }

      if (c === '^' || c === '_') {
        flush(); i += 1
        out.push({ t: c === '^' ? 'sup' : 'sub', a: arg() })
        continue
      }

      buf += c
      i += 1
    }

    flush()
    return out
  }

  // {…} целиком, либо один следующий символ
  function group() {
    if (src[i] === '{') { i += 1; const nodes = seq('}'); i += 1; return nodes }
    return arg()
  }

  // \begin{env}[{k}] строки через \\, ячейки через & \end{env}; вложенных матриц не бывает
  function matrix() {
    const env = rawGroup()
    if (!MATRIX_ENVS.has(env)) return { t: 'txt', v: '' }
    const bar = env === 'amatrix' ? Number(rawGroup()) : 0
    const end = src.indexOf(`\\end{${env}}`, i)
    const body = src.slice(i, end < 0 ? src.length : end)
    i = end < 0 ? src.length : end + `\\end{${env}}`.length
    const rows = body.split('\\\\').map(r => r.trim()).filter(Boolean)
      .map(r => r.split('&').map(cell => parse(cell.trim())))
    return { t: 'matrix', env, bar, rows }
  }

  function rawGroup() {
    if (src[i] !== '{') return ''
    const close = src.indexOf('}', i)
    const v = src.slice(i + 1, close)
    i = close + 1
    return v
  }

  function arg() {
    if (src[i] === '{') return group()
    const c = src[i]
    i += 1
    return [{ t: 'txt', v: c ?? '' }]
  }

  return seq(null)
}

function Nodes({ nodes }) {
  return nodes.map((n, i) => <Node key={i} n={n} />)
}

function Node({ n }) {
  switch (n.t) {
    case 'txt':
      return n.v
    case 'text':
      return <span className="mx-text"><Nodes nodes={n.a} /></span>
    case 'frac':
      return (
        <span className="mx-frac">
          <span className="mx-num"><Nodes nodes={n.a} /></span>
          <span className="mx-den"><Nodes nodes={n.b} /></span>
        </span>
      )
    case 'sqrt':
      return (
        <span className="mx-sqrt">
          <span className="mx-sqrt-sign">√</span>
          <span className="mx-sqrt-body"><Nodes nodes={n.a} /></span>
        </span>
      )
    case 'vec':
      return <span className="mx-vec"><Nodes nodes={n.a} /></span>
    case 'xarrow':
      return (
        <span className="mx-xarrow">
          <span className="mx-xarrow-label"><Nodes nodes={n.a} /></span>
          <span className="mx-xarrow-line" aria-hidden="true" />
        </span>
      )
    case 'matrix': {
      const cols = Math.max(...n.rows.map(r => r.length))
      return (
        <span className={`mx-mat is-${n.env}`}>
          <span className="mx-mat-grid" style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}>
            {n.rows.flatMap((row, r) => row.map((cell, c) => (
              <span key={`${r}-${c}`} className={`mx-mat-cell${n.bar && c === n.bar ? ' is-bar' : ''}`}><Nodes nodes={cell} /></span>
            )))}
          </span>
        </span>
      )
    }
    case 'sup':
      return <sup className="mx-sup"><Nodes nodes={n.a} /></sup>
    case 'sub':
      return <sub className="mx-sub"><Nodes nodes={n.a} /></sub>
    default:
      return null
  }
}

// Формула в строку текста
export function M({ children }) {
  return <span className="mx"><Nodes nodes={parse(String(children))} /></span>
}

// Формула отдельной строкой по центру
export default function MathExpr({ children }) {
  return (
    <div className="mx-display">
      <span className="mx"><Nodes nodes={parse(String(children))} /></span>
    </div>
  )
}

// Система уравнений или неравенств: фигурная скобка слева
export function MathCases({ lines }) {
  return (
    <div className="mx-display">
      <span className="mx mx-cases">
        <span className="mx-brace" aria-hidden="true" />
        <span className="mx-cases-lines">
          {lines.map((line, i) => (
            <span key={i} className="mx-cases-line"><Nodes nodes={parse(String(line))} /></span>
          ))}
        </span>
      </span>
    </div>
  )
}
