// Мини-рендерер формул. Понимает подмножество LaTeX, которого хватает курсу:
// \frac{}{}, \sqrt{}, степени и индексы (^ и _), плюс набор символов.
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
}

// Имена функций пишутся прямым шрифтом, а не курсивом переменных
const UPRIGHT = new Set(['ln', 'log', 'lim', 'max', 'min', 'sin', 'cos', 'exp'])

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
