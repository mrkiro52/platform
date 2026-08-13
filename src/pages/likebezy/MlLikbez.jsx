import { useEffect, useState, Fragment } from 'react'

/* ═══════════════════════════ Shared UI ═══════════════════════════ */

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>

const Lime = ({ children }) => <span style={{ color: 'var(--accent-lime)', fontWeight: 600 }}>{children}</span>

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 6 }}>{item}</li>)}
  </ul>
)

const Note = ({ children }) => (
  <div style={{ background: 'rgba(32,190,255,0.05)', border: '1px solid rgba(32,190,255,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>{children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    <span style={{ color: '#f87171', fontWeight: 700, marginRight: 6 }}>⚠️</span>{children}
  </div>
)

const Formula = ({ children }) => (
  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '14px 18px', margin: '14px 0', textAlign: 'center', fontFamily: '"Cambria Math", Georgia, "Times New Roman", serif', fontSize: 17, color: 'var(--text-primary)', overflowX: 'auto', lineHeight: 1.7 }}>{children}</div>
)

const Code = ({ code }) => {
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">python</div>
      <pre className="theory-code"><code>
        {lines.map((line, i) => {
          const idx = line.indexOf('#')
          if (idx === -1) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          const before = line.slice(0, idx)
          const sq = (before.match(/'/g) || []).length
          const dq = (before.match(/"/g) || []).length
          if (sq % 2 !== 0 || dq % 2 !== 0) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          return (
            <span key={i}>
              <span style={{ color: 'var(--text-primary)' }}>{before}</span>
              <span style={{ color: '#6b7280' }}>{line.slice(idx)}</span>
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </code></pre>
    </div>
  )
}

const SectionTitle = ({ id, kicker, children }) => (
  <div id={id} style={{ margin: '56px 0 18px', scrollMarginTop: 80 }}>
    {kicker && <div style={{ color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>}
    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, fontFamily: 'var(--font-syne)', margin: 0, paddingBottom: 12, borderBottom: '2px solid var(--accent-lime)' }}>{children}</h2>
  </div>
)

const QA = ({ n, q, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ margin: '16px 0', border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: open ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: 'none', cursor: 'pointer', padding: '14px 16px', textAlign: 'left', display: 'flex', gap: 10, alignItems: 'flex-start' }}
      >
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-lime)', fontSize: 14, flexShrink: 0, lineHeight: 1.5 }}>{n}.</span>
        <span style={{ color: 'var(--text-primary)', fontSize: 'clamp(14px, 2.2vw, 16px)', fontWeight: 600, lineHeight: 1.5, flex: 1, textAlign: 'left' }}>{q}</span>
        <span style={{ color: open ? 'var(--accent-lime)' : 'var(--text-tertiary)', fontSize: 18, flexShrink: 0, lineHeight: 1, marginTop: 2, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '16px 16px 16px 42px', background: 'var(--bg-secondary)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

const VizBox = ({ title, children }) => (
  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(14px, 3vw, 22px)', margin: '18px 0' }}>
    {title && <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>}
    {children}
  </div>
)

const btn = (active) => ({
  background: active ? 'var(--accent-lime)' : 'var(--bg-tertiary)',
  color: active ? '#0a0a14' : 'var(--text-secondary)',
  border: '1px solid ' + (active ? 'var(--accent-lime)' : 'var(--border-color)'),
  borderRadius: 7, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s',
})

/* ═══════════════════════════ Interactive: Regression & residuals ═══════════════════════════ */

function RegressionViz() {
  const pts = [[1, 2.3], [2, 2.5], [3, 4.2], [4, 4.0], [5, 5.7], [6, 5.9], [7, 7.5], [8, 7.2]]
  const [w, setW] = useState(0.6)
  const [b, setB] = useState(1.8)
  const [mode, setMode] = useState('mse')

  const W = 380, H = 320, pad = 38
  const sx = (x) => pad + (x / 9) * (W - 2 * pad)
  const sy = (y) => H - pad - (y / 9) * (H - 2 * pad)
  const unit = (W - 2 * pad) / 9

  const resid = pts.map(([x, y]) => y - (w * x + b))
  const mse = resid.reduce((s, r) => s + r * r, 0) / pts.length
  const mae = resid.reduce((s, r) => s + Math.abs(r), 0) / pts.length

  return (
    <VizBox title="Регрессия: подбери прямую и посмотри на ошибку">
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
        <button style={btn(mode === 'mse')} onClick={() => setMode('mse')}>MSE — квадраты ошибок</button>
        <button style={btn(mode === 'mae')} onClick={() => setMode('mae')}>MAE — модули ошибок</button>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 400, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
          {/* axes */}
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
          <text x={W - pad} y={H - pad + 18} fill="var(--text-tertiary)" fontSize="11" textAnchor="end">x (признак)</text>
          <text x={pad - 6} y={pad - 8} fill="var(--text-tertiary)" fontSize="11">y</text>
          {/* error squares / lines */}
          {pts.map(([x, y], i) => {
            const pred = w * x + b
            const px = sx(x), py = sy(y), pp = sy(pred)
            const side = Math.abs(resid[i]) * unit
            if (mode === 'mse') {
              return (
                <rect key={i}
                  x={resid[i] >= 0 ? px : px - side}
                  y={Math.min(py, pp)}
                  width={side} height={Math.abs(py - pp)}
                  fill="rgba(248,113,113,0.18)" stroke="rgba(248,113,113,0.5)" strokeWidth="1" />
              )
            }
            return <line key={i} x1={px} y1={py} x2={px} y2={pp} stroke="#f87171" strokeWidth="2" strokeDasharray="3 2" />
          })}
          {/* regression line */}
          <line x1={sx(0)} y1={sy(b)} x2={sx(9)} y2={sy(w * 9 + b)} stroke="var(--accent-lime)" strokeWidth="2.5" />
          {/* points */}
          {pts.map(([x, y], i) => <circle key={i} cx={sx(x)} cy={sy(y)} r="4.5" fill="#60a5fa" stroke="#0a0a14" strokeWidth="1" />)}
        </svg>

        <div style={{ minWidth: 180, flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>наклон w = {w.toFixed(2)}</label>
          <input type="range" min="-0.2" max="1.6" step="0.05" value={w} onChange={e => setW(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-lime)' }} />
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-tertiary)', margin: '12px 0 4px' }}>сдвиг b = {b.toFixed(2)}</label>
          <input type="range" min="0" max="4" step="0.1" value={b} onChange={e => setB(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-lime)' }} />
          <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
            <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: 8, padding: '10px 12px', border: mode === 'mse' ? '1px solid var(--accent-lime)' : '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>MSE</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{mse.toFixed(2)}</div>
            </div>
            <div style={{ flex: 1, background: 'var(--bg-tertiary)', borderRadius: 8, padding: '10px 12px', border: mode === 'mae' ? '1px solid var(--accent-lime)' : '1px solid var(--border-color)' }}>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>MAE</div>
              <div style={{ fontSize: 19, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'monospace' }}>{mae.toFixed(2)}</div>
            </div>
          </div>
          <P style={{ fontSize: 12, marginTop: 12 }}>
            Синие точки — данные. Зелёная прямая — модель. Красным показана <B>ошибка</B> каждого объекта: в режиме MSE это <B>площадь квадрата</B> со стороной, равной ошибке (поэтому большие промахи штрафуются сильнее), в MAE — просто длина отрезка.
          </P>
        </div>
      </div>
    </VizBox>
  )
}

/* ═══════════════════════════ Interactive: Gradient descent stepper ═══════════════════════════ */

function GradientDescentViz() {
  const lr = 0.3
  const f = (w) => (w - 3) * (w - 3) + 1
  const g = (w) => 2 * (w - 3)
  const steps = []
  let cur = -2.5
  for (let i = 0; i < 9; i++) { steps.push(cur); cur = cur - lr * g(cur) }
  const [i, setI] = useState(0)

  const W = 420, H = 300, pad = 36
  const wMin = -3.5, wMax = 9.5
  const yMax = 43
  const sx = (w) => pad + ((w - wMin) / (wMax - wMin)) * (W - 2 * pad)
  const sy = (y) => H - pad - (y / yMax) * (H - 2 * pad)

  // parabola path
  let path = ''
  for (let k = 0; k <= 60; k++) {
    const wv = wMin + (k / 60) * (wMax - wMin)
    path += (k === 0 ? 'M' : 'L') + sx(wv).toFixed(1) + ' ' + sy(f(wv)).toFixed(1) + ' '
  }

  const w = steps[i]
  const grad = g(w)
  const next = w - lr * grad
  // tangent segment
  const dx = 1.4
  const t1 = [w - dx, f(w) - grad * dx]
  const t2 = [w + dx, f(w) + grad * dx]

  return (
    <VizBox title="Градиентный спуск по шагам">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 460, background: 'var(--bg-tertiary)', borderRadius: 8, display: 'block' }}>
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
        <line x1={sx(3)} y1={pad} x2={sx(3)} y2={H - pad} stroke="rgba(32,190,255,0.25)" strokeWidth="1" strokeDasharray="4 3" />
        <text x={sx(3)} y={H - pad + 16} fill="var(--accent-lime)" fontSize="10" textAnchor="middle">минимум w*=3</text>
        {/* loss curve */}
        <path d={path} fill="none" stroke="#60a5fa" strokeWidth="2.5" />
        <text x={W - pad - 4} y={pad + 6} fill="#60a5fa" fontSize="11" textAnchor="end">L(w)</text>
        {/* tangent */}
        <line x1={sx(t1[0])} y1={sy(t1[1])} x2={sx(t2[0])} y2={sy(t2[1])} stroke="#f87171" strokeWidth="2" />
        <text x={sx(t2[0])} y={sy(t2[1]) - 6} fill="#f87171" fontSize="10">касательная (наклон = градиент)</text>
        {/* current point */}
        <circle cx={sx(w)} cy={sy(f(w))} r="6" fill="var(--accent-lime)" stroke="#0a0a14" strokeWidth="1.5" />
        {/* arrow toward next w along x-axis */}
        <line x1={sx(w)} y1={H - pad} x2={sx(next)} y2={H - pad} stroke="var(--accent-lime)" strokeWidth="3" markerEnd="url(#gdArrow)" />
        <circle cx={sx(w)} cy={H - pad} r="3" fill="var(--text-tertiary)" />
        <defs>
          <marker id="gdArrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-lime)" />
          </marker>
        </defs>
      </svg>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '14px 0' }}>
        <button style={btn(false)} onClick={() => setI(Math.max(0, i - 1))} disabled={i === 0}>◀ Шаг назад</button>
        <button style={btn(false)} onClick={() => setI(Math.min(steps.length - 1, i + 1))} disabled={i === steps.length - 1}>Шаг вперёд ▶</button>
        <button style={btn(true)} onClick={() => setI(0)}>⟲ Сброс</button>
        <span style={{ marginLeft: 'auto', color: 'var(--text-tertiary)', fontSize: 13 }}>итерация {i} из {steps.length - 1}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: 10, fontFamily: 'monospace', fontSize: 13 }}>
        {[
          ['w (текущее)', w.toFixed(3)],
          ['L(w)', f(w).toFixed(3)],
          ['градиент ∂L/∂w', grad.toFixed(3)],
          ['шаг η = ' + lr, '→'],
          ['w − η·∂L/∂w', next.toFixed(3)],
        ].map(([k, v], idx) => (
          <div key={idx} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '8px 10px' }}>
            <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', fontFamily: 'sans-serif' }}>{k}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: idx === 4 ? 'var(--accent-lime)' : 'var(--text-primary)' }}>{v}</div>
          </div>
        ))}
      </div>
      <P style={{ fontSize: 12.5, marginTop: 12 }}>
        Градиент в точке — это наклон касательной. Он указывает направление <B>роста</B> функции, поэтому мы делаем шаг в <B>противоположную</B> сторону (−η·градиент). Чем ближе к минимуму, тем меньше градиент и тем короче шаг — спуск естественно замедляется.
      </P>
    </VizBox>
  )
}

/* ═══════════════════════════ Interactive: Confusion matrix ═══════════════════════════ */

function ConfusionMatrixViz() {
  const cells = [
    { v: 'TP', name: 'True Positive', d: 'предсказали «+», и это «+»', n: 45, good: true },
    { v: 'FP', name: 'False Positive', d: 'предсказали «+», а это «−» (ложная тревога)', n: 10, good: false },
    { v: 'FN', name: 'False Negative', d: 'предсказали «−», а это «+» (пропуск)', n: 5, good: false },
    { v: 'TN', name: 'True Negative', d: 'предсказали «−», и это «−»', n: 40, good: true },
  ]
  return (
    <VizBox title="Матрица ошибок (confusion matrix)">
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: 6, maxWidth: 460 }}>
        <div />
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>Факт: «+»</div>
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600 }}>Факт: «−»</div>
        {[0, 1].map(row => (
          <Fragment key={row}>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, writingMode: 'horizontal-tb' }}>
              {row === 0 ? 'Предсказ.: «+»' : 'Предсказ.: «−»'}
            </div>
            {[row === 0 ? cells[0] : cells[2], row === 0 ? cells[1] : cells[3]].map((c, j) => (
              <div key={row + '' + j} style={{
                background: c.good ? 'rgba(74,222,128,0.12)' : 'rgba(248,113,113,0.12)',
                border: '1px solid ' + (c.good ? 'rgba(74,222,128,0.4)' : 'rgba(248,113,113,0.4)'),
                borderRadius: 8, padding: '10px 12px',
              }}>
                <div style={{ fontWeight: 700, color: c.good ? '#4ade80' : '#f87171', fontFamily: 'monospace' }}>{c.v} = {c.n}</div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 3 }}>{c.d}</div>
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16, fontSize: 13 }}>
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '8px 12px' }}>
          <Lime>Precision</Lime> = TP/(TP+FP) = 45/55 ≈ <B>0.82</B>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '8px 12px' }}>
          <Lime>Recall</Lime> = TP/(TP+FN) = 45/50 = <B>0.90</B>
        </div>
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '8px 12px' }}>
          <Lime>Accuracy</Lime> = (TP+TN)/всё = 85/100 = <B>0.85</B>
        </div>
      </div>
    </VizBox>
  )
}

/* ═══════════════════════════ Interactive: ROC + threshold ═══════════════════════════ */

function RocViz() {
  // precomputed ROC operating points (fpr, tpr) from high threshold → low threshold
  const roc = [
    [0, 0], [0.0, 0.40], [0.06, 0.58], [0.12, 0.72], [0.22, 0.82], [0.36, 0.89], [0.55, 0.94], [0.78, 0.98], [1, 1],
  ]
  const [t, setT] = useState(4)
  const W = 300, H = 300, pad = 40
  const sx = (x) => pad + x * (W - 2 * pad)
  const sy = (y) => H - pad - y * (H - 2 * pad)
  const curve = roc.map(([x, y], i) => (i === 0 ? 'M' : 'L') + sx(x) + ' ' + sy(y)).join(' ')
  const area = curve + ` L ${sx(1)} ${sy(0)} Z`
  const [fpr, tpr] = roc[t]
  const pos = 50, neg = 50
  const TP = Math.round(tpr * pos), FN = pos - TP, FP = Math.round(fpr * neg), TN = neg - FP

  return (
    <VizBox title="ROC-кривая и порог классификатора">
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 300, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
          {/* AUC area */}
          <path d={area} fill="rgba(32,190,255,0.1)" />
          {/* diagonal random */}
          <line x1={sx(0)} y1={sy(0)} x2={sx(1)} y2={sy(1)} stroke="var(--text-tertiary)" strokeWidth="1.5" strokeDasharray="5 4" />
          <text x={sx(0.62)} y={sy(0.5)} fill="var(--text-tertiary)" fontSize="10" transform={`rotate(-32 ${sx(0.62)} ${sy(0.5)})`}>случайный (AUC=0.5)</text>
          {/* axes */}
          <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
          <text x={W - pad} y={H - pad + 16} fill="var(--text-tertiary)" fontSize="10" textAnchor="end">FPR →</text>
          <text x={pad - 6} y={pad - 6} fill="var(--text-tertiary)" fontSize="10">TPR ↑</text>
          {/* curve */}
          <path d={curve} fill="none" stroke="var(--accent-lime)" strokeWidth="2.5" />
          {/* operating point */}
          <circle cx={sx(fpr)} cy={sy(tpr)} r="6" fill="#60a5fa" stroke="#0a0a14" strokeWidth="1.5" />
          <text x={sx(0.5)} y={sy(0.16)} fill="var(--accent-lime)" fontSize="12" textAnchor="middle" fontWeight="700">AUC ≈ 0.90</text>
        </svg>

        <div style={{ minWidth: 180, flex: 1 }}>
          <label style={{ display: 'block', fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>
            Порог: {t <= 1 ? 'очень высокий (строгий)' : t >= 7 ? 'очень низкий (мягкий)' : 'средний'}
          </label>
          <input type="range" min="0" max={roc.length - 1} step="1" value={t} onChange={e => setT(+e.target.value)} style={{ width: '100%', accentColor: 'var(--accent-lime)' }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 14, fontFamily: 'monospace', fontSize: 13 }}>
            <div style={{ background: 'rgba(74,222,128,0.12)', borderRadius: 6, padding: '6px 8px', color: '#4ade80' }}>TP = {TP}</div>
            <div style={{ background: 'rgba(248,113,113,0.12)', borderRadius: 6, padding: '6px 8px', color: '#f87171' }}>FP = {FP}</div>
            <div style={{ background: 'rgba(248,113,113,0.12)', borderRadius: 6, padding: '6px 8px', color: '#f87171' }}>FN = {FN}</div>
            <div style={{ background: 'rgba(74,222,128,0.12)', borderRadius: 6, padding: '6px 8px', color: '#4ade80' }}>TN = {TN}</div>
          </div>
          <P style={{ fontSize: 12, marginTop: 10 }}>
            Снижая порог, мы ловим больше «+» (растёт TPR), но и больше ложных тревог (растёт FPR). Каждое положение порога — это <B>одна точка</B> на ROC-кривой.
          </P>
        </div>
      </div>
    </VizBox>
  )
}

/* ═══════════════════════════ Interactive: PR curve ═══════════════════════════ */

function PrViz() {
  const pr = [[0, 1], [0.2, 0.98], [0.4, 0.95], [0.6, 0.9], [0.75, 0.82], [0.85, 0.7], [0.93, 0.55], [1, 0.4]]
  const W = 300, H = 260, pad = 40
  const sx = (x) => pad + x * (W - 2 * pad)
  const sy = (y) => H - pad - y * (H - 2 * pad)
  const curve = pr.map(([x, y], i) => (i === 0 ? 'M' : 'L') + sx(x) + ' ' + sy(y)).join(' ')
  const area = curve + ` L ${sx(1)} ${sy(0)} L ${sx(0)} ${sy(0)} Z`
  return (
    <VizBox title="Precision-Recall кривая">
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxWidth: 300, background: 'var(--bg-tertiary)', borderRadius: 8, display: 'block' }}>
        <path d={area} fill="rgba(168,85,247,0.12)" />
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
        <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--border-color)" strokeWidth="1.5" />
        <text x={W - pad} y={H - pad + 16} fill="var(--text-tertiary)" fontSize="10" textAnchor="end">Recall →</text>
        <text x={pad - 6} y={pad - 6} fill="var(--text-tertiary)" fontSize="10">Precision ↑</text>
        <path d={curve} fill="none" stroke="#c084fc" strokeWidth="2.5" />
        <text x={sx(0.45)} y={sy(0.45)} fill="#c084fc" fontSize="12" textAnchor="middle" fontWeight="700">AP (площадь)</text>
      </svg>
      <P style={{ fontSize: 12.5, marginTop: 10 }}>
        В отличие от ROC, PR-кривая не учитывает TN, поэтому она <B>информативнее при сильном дисбалансе</B> классов (когда отрицательных объектов очень много). Площадь под ней — Average Precision (AP).
      </P>
    </VizBox>
  )
}

/* ═══════════════════════════ Interactive: Decision tree + regions ═══════════════════════════ */

function TreeViz() {
  return (
    <VizBox title="Решающее дерево и разбиение пространства">
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* tree */}
        <svg viewBox="0 0 260 230" style={{ width: '100%', maxWidth: 280, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
          <line x1="130" y1="38" x2="60" y2="100" stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1="130" y1="38" x2="200" y2="100" stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1="200" y1="118" x2="160" y2="180" stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1="200" y1="118" x2="240" y2="180" stroke="var(--border-color)" strokeWidth="1.5" />
          <text x="88" y="76" fill="var(--text-tertiary)" fontSize="9">да</text>
          <text x="170" y="76" fill="var(--text-tertiary)" fontSize="9">нет</text>
          {/* root */}
          <g>
            <rect x="86" y="20" width="88" height="34" rx="6" fill="var(--bg-secondary)" stroke="var(--accent-lime)" />
            <text x="130" y="40" fill="var(--text-primary)" fontSize="10" textAnchor="middle">x₁ &lt; 5 ?</text>
          </g>
          {/* leaf A */}
          <g>
            <rect x="22" y="100" width="76" height="32" rx="6" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" />
            <text x="60" y="120" fill="#60a5fa" fontSize="10" textAnchor="middle">класс A</text>
          </g>
          {/* node 2 */}
          <g>
            <rect x="158" y="100" width="84" height="34" rx="6" fill="var(--bg-secondary)" stroke="var(--accent-lime)" />
            <text x="200" y="120" fill="var(--text-primary)" fontSize="10" textAnchor="middle">x₂ &lt; 4 ?</text>
          </g>
          {/* leaves */}
          <g>
            <rect x="122" y="180" width="76" height="32" rx="6" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" />
            <text x="160" y="200" fill="#60a5fa" fontSize="10" textAnchor="middle">класс A</text>
          </g>
          <g>
            <rect x="206" y="180" width="76" height="32" rx="6" fill="rgba(248,113,113,0.15)" stroke="#f87171" />
            <text x="244" y="200" fill="#f87171" fontSize="10" textAnchor="middle">класс B</text>
          </g>
        </svg>
        {/* regions */}
        <svg viewBox="0 0 230 230" style={{ width: '100%', maxWidth: 240, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
          {/* x1<5 → A (left half) */}
          <rect x="30" y="20" width="80" height="180" fill="rgba(96,165,250,0.12)" />
          {/* x1>=5, x2<4 → A (bottom right) */}
          <rect x="110" y="110" width="90" height="90" fill="rgba(96,165,250,0.12)" />
          {/* x1>=5, x2>=4 → B (top right) */}
          <rect x="110" y="20" width="90" height="90" fill="rgba(248,113,113,0.12)" />
          <line x1="110" y1="20" x2="110" y2="200" stroke="var(--accent-lime)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="110" y1="110" x2="200" y2="110" stroke="var(--accent-lime)" strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="30" y1="200" x2="200" y2="200" stroke="var(--border-color)" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="30" y2="200" stroke="var(--border-color)" strokeWidth="1.5" />
          <text x="200" y="214" fill="var(--text-tertiary)" fontSize="10" textAnchor="end">x₁ →</text>
          <text x="20" y="20" fill="var(--text-tertiary)" fontSize="10">x₂</text>
          <text x="62" y="115" fill="#60a5fa" fontSize="11" textAnchor="middle">A</text>
          <text x="155" y="160" fill="#60a5fa" fontSize="11" textAnchor="middle">A</text>
          <text x="155" y="70" fill="#f87171" fontSize="11" textAnchor="middle">B</text>
        </svg>
      </div>
      <P style={{ fontSize: 12.5, marginTop: 10 }}>
        Каждая внутренняя вершина — вопрос вида «признак &lt; порог». Дерево разбивает пространство признаков на <B>прямоугольные области</B>, параллельные осям, и в каждой выдаёт свой ответ.
      </P>
    </VizBox>
  )
}

/* ═══════════════════════════ TOC ═══════════════════════════ */

const TOC = [
  { id: 'ch1', label: 'Глава 1 — Линейные модели', n: '22 вопроса' },
  { id: 'ch2', label: 'Глава 2 — Классификация', n: '10 вопросов' },
  { id: 'ch3', label: 'Глава 3 — Многоклассовая классификация', n: '18 вопросов' },
  { id: 'ch4', label: 'Глава 4 — Леса и бустинг', n: '14 вопросов' },
  { id: 'ch5', label: 'Глава 5 — Кластеризация', n: '3 вопроса' },
]

/* ═══════════════════════════ Main ═══════════════════════════ */

export default function MlLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '6px 14px', color: '#4ade80', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>MACHINE LEARNING</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>Стажёр / Junior</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          Вся теория для стажёра / джуниора по ML
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 660 }}>
          Подготовка к собеседованию на стажёра / джуниор-разработчика в машинном обучении: 67 вопросов с подробными
          ответами по линейным моделям, классификации, деревьям, лесам, бустингу и кластеризации. С интерактивными
          иллюстрациями регрессии, градиентного спуска и ROC-кривых.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['5 глав', '67 вопросов', 'формулы + визуализации', '~90 мин'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 24 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {TOC.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            ><span>{item.label}</span><span style={{ color: 'var(--text-tertiary)', fontSize: 12, flexShrink: 0 }}>{item.n}</span></button>
          ))}
        </div>
      </div>

      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />

      <div style={{ marginTop: 60, padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, textAlign: 'center' }}>
        <P style={{ fontSize: 14 }}>Это конец ликбеза. Возвращайся к нему перед собеседованием — и удачи! 🚀</P>
        <button onClick={onBack} style={{ marginTop: 8, background: 'var(--accent-lime)', border: 'none', color: '#0a0a14', padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>← Ко всем ликбезам</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════ CHAPTER 1 — Linear models ═══════════════════════════ */

function Chapter1() {
  return (
    <>
      <SectionTitle id="ch1" kicker="Глава 1">Линейные модели</SectionTitle>

      <QA n="1" q="Опишите задачу машинного обучения. Дайте определение объекту, целевой переменной, признакам, модели, функционалу ошибки.">
        <P><B>Машинное обучение</B> — построение алгоритма, который по примерам из прошлого учится делать предсказания на новых данных, без явного программирования правил.</P>
        <Ul items={[
          <><B>Объект</B> — единица, о которой мы делаем предсказание (клиент, дом, фото). Описывается вектором признаков x = (x₁, …, x_d).</>,
          <><B>Признаки (features)</B> — измеримые характеристики объекта: возраст, площадь, количество кликов. Числовые, категориальные, бинарные.</>,
          <><B>Целевая переменная (target)</B>, y — то, что предсказываем: цена дома (регрессия) или класс (классификация).</>,
          <><B>Обучающая выборка</B> — набор пар (xᵢ, yᵢ), i = 1…ℓ, на которых учимся.</>,
          <><B>Модель</B> a(x) — функция (из выбранного семейства), которая по x выдаёт предсказание ŷ. У линейной модели это a(x) = ⟨w, x⟩ + w₀.</>,
          <><B>Функционал ошибки (функция качества)</B> Q(a, X) — число, показывающее, насколько плохо модель работает на выборке. Обучение = поиск параметров, минимизирующих Q.</>,
        ]} />
        <P>Формально: дано пространство объектов X, ответов Y и неизвестная зависимость y: X → Y. По выборке нужно построить a: X → Y, приближающую y и хорошо <B>обобщающую</B> на новые объекты.</P>
      </QA>

      <QA n="2" q="Чем отличается функция потерь от функционала ошибки?">
        <P><B>Функция потерь</B> L(y, ŷ) измеряет ошибку на <B>одном</B> объекте — например, (y − ŷ)². <B>Функционал ошибки</B> Q — это агрегат по <B>всей выборке</B>, обычно среднее функций потерь:</P>
        <Formula>Q(a, X) = (1/ℓ) · Σᵢ L(yᵢ, a(xᵢ))</Formula>
        <P>То есть функция потерь — «кирпичик», а функционал — то, что реально минимизируется при обучении. Выбор функции потерь определяет, за какие ошибки модель штрафуется сильнее.</P>
      </QA>

      <QA n="3" q="Какие функции потерь используются при решении задачи регрессии?">
        <Ul items={[
          <><B>MSE / квадратичная</B>: L = (y − ŷ)². Гладкая, сильно штрафует большие ошибки, чувствительна к выбросам.</>,
          <><B>MAE / абсолютная</B>: L = |y − ŷ|. Устойчива к выбросам, но не дифференцируема в нуле.</>,
          <><B>Huber</B>: квадратичная около нуля, линейная на хвостах — компромисс MSE/MAE.</>,
          <><B>Log-cosh</B>: log(cosh(y − ŷ)) — гладкая версия Huber.</>,
          <><B>Quantile / pinball</B>: асимметричный штраф, для предсказания квантилей.</>,
        ]} />
      </QA>

      <QA n="4" q="Запишите формулу для линейной модели регрессии.">
        <Formula>a(x) = w₀ + w₁x₁ + w₂x₂ + … + w_d x_d = ⟨w, x⟩ + w₀</Formula>
        <P>Здесь w = (w₁,…,w_d) — веса признаков, w₀ — свободный член (сдвиг, bias). Часто к x добавляют константный признак x₀ = 1, тогда модель записывается компактно как a(x) = ⟨w, x⟩. Модель линейна по параметрам w — это и даёт ей название.</P>
        <RegressionViz />
      </QA>

      <QA n="5" q="Чем отличаются функционалы MSE и MAE? В каких случаях лучше использовать MSE, а в каких MAE?">
        <Formula>MSE = (1/ℓ)Σ(yᵢ − ŷᵢ)²  ·  MAE = (1/ℓ)Σ|yᵢ − ŷᵢ|</Formula>
        <Ul items={[
          <><B>MSE</B> возводит ошибку в квадрат → большие промахи штрафуются непропорционально сильно. Гладкая, есть аналитическое решение, оптимум — <B>среднее</B>. Минус: чувствительна к выбросам.</>,
          <><B>MAE</B> штрафует линейно, устойчива к выбросам, её оптимум — <B>медиана</B>. Минус: не дифференцируема в нуле, оптимизация сложнее.</>,
        ]} />
        <P><B>MSE</B> — когда выбросов мало и большие ошибки действительно критичны. <B>MAE</B> — когда в данных есть выбросы и нужна устойчивость. На иллюстрации выше переключите режим: в MSE квадраты резко растут при больших отклонениях.</P>
      </QA>

      <QA n="6" q="Чем отличается MAE от MAPE? Что более понятно заказчику продукта?">
        <Formula>MAPE = (100%/ℓ) · Σ |yᵢ − ŷᵢ| / |yᵢ|</Formula>
        <P><B>MAE</B> — абсолютная ошибка в единицах целевой переменной (рублях, штуках). <B>MAPE</B> — относительная, в <B>процентах</B> от факта. Заказчику обычно понятнее MAPE: «модель ошибается в среднем на 8%» нагляднее, чем «на 1240 рублей».</P>
        <Warn>MAPE взрывается при y, близких к нулю (деление на маленькое число), и асимметрична: перепрогноз и недопрогноз штрафуются по-разному. При нулевых значениях y неприменима.</Warn>
      </QA>

      <QA n="7" q="Что такое коэффициент детерминации? Как интерпретировать его значения?">
        <Formula>R² = 1 − (Σ(yᵢ − ŷᵢ)²) / (Σ(yᵢ − ȳ)²)</Formula>
        <P>R² показывает, какую <B>долю дисперсии</B> целевой переменной объясняет модель, сравнивая её с тривиальным baseline — предсказанием среднего ȳ.</P>
        <Ul items={[
          <><B>R² = 1</B> — идеальное предсказание.</>,
          <><B>R² = 0</B> — модель не лучше, чем «всегда предсказывать среднее».</>,
          <><B>R² &lt; 0</B> — модель хуже среднего (так бывает на тесте при переобучении).</>,
        ]} />
        <Note>R² безразмерен и не зависит от масштаба y, поэтому им удобно сравнивать модели. Но он растёт при добавлении любых признаков — для честного сравнения используют adjusted R².</Note>
      </QA>

      <QA n="8" q="Чем log-cosh лучше функции потерь Хубера? Опишите обе функции потерь.">
        <P><B>Huber</B> с порогом δ: квадратична при малых ошибках, линейна при больших — соединяет плюсы MSE и MAE:</P>
        <Formula>L_δ = ½(y−ŷ)², если |y−ŷ|≤δ ;  δ|y−ŷ| − ½δ², иначе</Formula>
        <P><B>Log-cosh</B>: L = log(cosh(y − ŷ)). Ведёт себя так же (≈ ½e² при малых e, ≈ |e| при больших), но <B>дважды непрерывно дифференцируема всюду</B> и не требует подбирать гиперпараметр δ. Это удобнее для методов второго порядка (нужен гессиан) и убирает «излом» в точке δ. Минус — чуть дороже считать.</P>
      </QA>

      <QA n="9" q="Что такое градиент? Какое его свойство используется при минимизации функций?">
        <P><B>Градиент</B> ∇f(w) — вектор частных производных функции по всем параметрам: ∇f = (∂f/∂w₁, …, ∂f/∂w_d). Ключевое свойство: градиент указывает направление <B>наискорейшего роста</B> функции, а его длина — скорость роста.</P>
        <P>Следствие, которое и используют: чтобы <B>уменьшить</B> функцию, надо идти в направлении <B>антиградиента</B> (−∇f). В точке минимума градиент равен нулю.</P>
      </QA>

      <QA n="10" q="Что такое градиентный спуск? Опишите процесс алгоритма.">
        <P><B>Градиентный спуск</B> — итеративный метод минимизации: многократно делаем маленькие шаги против градиента.</P>
        <Formula>w(t+1) = w(t) − η · ∇Q(w(t))</Formula>
        <Ul items={[
          'Инициализируем веса w₀ (нулями или случайно).',
          'Считаем градиент функционала ∇Q в текущей точке.',
          'Делаем шаг: w ← w − η·∇Q, где η — learning rate (длина шага).',
          'Повторяем, пока градиент не станет ≈ 0 или изменения весов/ошибки не станут пренебрежимо малы.',
        ]} />
        <P>Слишком большой η — расходимся/осциллируем; слишком маленький — сходимся очень долго. Нажимайте «Шаг вперёд», чтобы увидеть каждую итерацию:</P>
        <GradientDescentViz />
      </QA>

      <QA n="11" q="Почему не всегда можно использовать полный градиентный спуск? Какие способы оценивания градиента вы знаете? Почему в SGD важно менять длину шага? Какие стратегии изменения шага вы знаете?">
        <P><B>Полный (batch) градиентный спуск</B> считает градиент по <B>всей</B> выборке на каждом шаге. При миллионах объектов это слишком дорого по памяти и времени — один шаг требует прохода по всем данным.</P>
        <P><B>Способы оценивания градиента:</B></P>
        <Ul items={[
          <><B>Full-batch</B> — по всей выборке. Точный, но дорогой градиент.</>,
          <><B>Stochastic (SGD)</B> — по одному случайному объекту. Дёшево, но шумно.</>,
          <><B>Mini-batch</B> — по небольшой пачке (32–512). Золотая середина, стандарт на практике.</>,
        ]} />
        <P><B>Почему в SGD важно уменьшать шаг:</B> оценка градиента по одному объекту шумна. С большим фиксированным η около минимума веса «прыгают» вокруг и не сходятся. Уменьшая η по мере итераций, мы гасим шум и позволяем алгоритму осесть в минимуме (условия Роббинса–Монро: Ση_t = ∞, Ση_t² &lt; ∞).</P>
        <P><B>Стратегии изменения шага (learning rate schedule):</B></P>
        <Ul items={[
          'Степенное затухание: η_t = η₀ / (1 + λt) или η₀ / √t.',
          'Ступенчатое (step decay): уменьшать η в k раз каждые N эпох.',
          'Экспоненциальное: η_t = η₀ · e^(−λt).',
          'Cosine annealing, warmup (плавный разогон вначале).',
          'Адаптивные методы — Adam, RMSProp, Adagrad — подстраивают шаг для каждого параметра автоматически.',
        ]} />
      </QA>

      <QA n="12" q="Что такое переобучение? Как можно отследить переобучение модели?">
        <P><B>Переобучение (overfitting)</B> — модель слишком хорошо подстроилась под обучающую выборку, выучив её шум, и плохо обобщает на новые данные. Признак: низкая ошибка на train, высокая — на test.</P>
        <P><B>Как отследить:</B></P>
        <Ul items={[
          'Разделить данные на train/validation/test и сравнить ошибки: большой разрыв train↓ vs val↑ = переобучение.',
          'Построить кривые обучения (learning curves) по эпохам: train-loss падает, а val-loss начинает расти — момент переобучения.',
          'Кросс-валидация: большой разброс качества между фолдами.',
        ]} />
        <P><B>Борьба:</B> регуляризация, больше данных, упрощение модели, ранняя остановка (early stopping), dropout, отбор признаков.</P>
      </QA>

      <QA n="13" q="Что такое кросс-валидация? На что влияет количество блоков?">
        <P><B>K-fold кросс-валидация</B>: выборку делят на K равных частей (фолдов). K раз обучают модель на K−1 фолдах и проверяют на оставшемся; качество усредняют. Так каждый объект побывал и в обучении, и в проверке — оценка качества надёжнее, чем по одному разбиению.</P>
        <P><B>Число блоков K:</B></P>
        <Ul items={[
          <>Большое K (вплоть до leave-one-out, K=ℓ): обучающая часть больше → оценка <B>менее смещена</B>, но фолды сильно пересекаются → <B>больше дисперсия</B> и дороже считать.</>,
          <>Малое K (например, 3): дёшево и стабильно, но обучаемся на меньшей доле данных → оценка более <B>пессимистична/смещена</B>.</>,
          'На практике компромисс K = 5 или 10.',
        ]} />
      </QA>

      <QA n="14" q="Как построить итоговую модель после того, как по кросс-валидации подобраны оптимальные гиперпараметры?">
        <P>Кросс-валидация нужна только чтобы <B>выбрать гиперпараметры</B> (λ регуляризации, глубину, число соседей). Сами K моделей с фолдов — промежуточные. После выбора лучших гиперпараметров <B>обучают одну финальную модель на всей доступной обучающей выборке</B> (train + validation) с этими гиперпараметрами. Чем больше данных, тем лучше итоговая модель. Финальную оценку качества дают на отложенном test, который в подборе не участвовал.</P>
      </QA>

      <QA n="15" q="Что такое регуляризация? Для чего используется?">
        <P><B>Регуляризация</B> — добавление к функционалу штрафа за сложность модели (обычно за величину весов):</P>
        <Formula>Q_reg(w) = Q(w) + λ · R(w)</Formula>
        <P>Цель — <B>бороться с переобучением</B>: не дать весам стать слишком большими, упростить модель, повысить обобщающую способность и устойчивость (особенно при мультиколлинеарности). λ управляет силой штрафа: больше λ → проще модель, но риск недообучения.</P>
      </QA>

      <QA n="16" q="Опишите, как работают L1- и L2-регуляризаторы.">
        <Formula>L2 (Ridge): R = Σ wⱼ²    ·    L1 (Lasso): R = Σ |wⱼ|</Formula>
        <Ul items={[
          <><B>L2 (Ridge)</B> штрафует квадрат весов. Равномерно «сжимает» все веса к нулю, но <B>не обнуляет</B> их полностью. Гладкая, есть аналитическое решение, хорошо борется с мультиколлинеарностью.</>,
          <><B>L1 (Lasso)</B> штрафует модули весов. <B>Зануляет</B> часть весов → автоматический отбор признаков и разреженная модель. Не дифференцируема в нуле.</>,
          <><B>Elastic Net</B> — комбинация αL1 + (1−α)L2, берёт лучшее от обоих.</>,
        ]} />
      </QA>

      <QA n="17" q="Почему L1-регуляризация отбирает признаки?">
        <P>Геометрически: минимум ищется на пересечении линий уровня функционала с областью ограничения. У L1 область — <B>ромб</B> (квадрат, повёрнутый на 45°) с острыми вершинами <B>на осях координат</B>. Линии уровня ошибки касаются этой области чаще всего именно в вершине, где часть координат = 0. У L2 область — <B>круг</B> без углов, касание происходит в произвольной точке, и веса просто малы, но не нулевые.</P>
        <P>Аналитически: производная |w| постоянна (±1) даже у малых весов, поэтому L1 «дожимает» небольшие веса ровно до нуля; производная w² = 2w у L2 затухает у нуля и не дотягивает вес до нуля.</P>
      </QA>

      <QA n="18" q="Почему плохо накладывать регуляризацию на свободный коэффициент?">
        <P>Свободный член w₀ (bias) задаёт средний уровень предсказания и не связан с конкретным признаком. Штрафовать его — значит насильно тянуть предсказания к нулю и вносить смещение: модель не сможет корректно сместить уровень, даже если среднее y далеко от нуля. Кроме того, w₀ зависит от <B>выбора начала отсчёта</B> y (сдвинули таргет — изменился w₀), и штраф за него сделал бы модель зависимой от произвольного сдвига. Поэтому w₀ из регуляризации исключают.</P>
      </QA>

      <QA n="19" q="Где используется метод максимального правдоподобия?">
        <P><B>Метод максимального правдоподобия (MLE)</B> — способ оценки параметров: выбираем такие параметры, при которых наблюдаемые данные <B>наиболее вероятны</B>. Максимизируем правдоподобие L(θ) = Πᵢ p(yᵢ | xᵢ, θ), на практике — его логарифм.</P>
        <P>Через MLE выводятся многие функции потерь: предположение о <B>нормальном</B> шуме в регрессии даёт <B>MSE</B>; <B>модель Бернулли</B> в бинарной классификации даёт <B>логистическую функцию потерь (log-loss)</B>. MLE — фундамент логистической и линейной регрессии, наивного Байеса, GLM.</P>
      </QA>

      <QA n="20" q="Расскажите про метрики, которые штрафуют за перепрогноз сильнее, чем за недопрогноз и наоборот (pinball loss).">
        <P><B>Pinball / quantile loss</B> — <B>асимметричная</B> функция потерь для предсказания квантиля уровня τ ∈ (0,1):</P>
        <Formula>L_τ(y, ŷ) = τ·(y − ŷ), если y ≥ ŷ ;  (τ − 1)·(y − ŷ), если y &lt; ŷ</Formula>
        <Ul items={[
          <>τ = 0.5 → симметрично, это эквивалент MAE (предсказываем медиану).</>,
          <>τ &gt; 0.5 → сильнее штрафуется <B>недопрогноз</B> (ŷ &lt; y), модель завышает оценки. Полезно, когда дефицит дороже избытка (спрос на товар, запасы на складе).</>,
          <>τ &lt; 0.5 → сильнее штрафуется <B>перепрогноз</B>.</>,
        ]} />
        <P>Обучив модели на разных τ, получают <B>интервалы предсказания</B> (например τ=0.1 и τ=0.9 — 80% интервал).</P>
      </QA>

      <QA n="21" q="Расскажите про виды скейлинга. Зачем они нужны?">
        <P><B>Зачем:</B> признаки в разных масштабах (возраст 0–100 и доход 0–1 000 000) ломают методы, опирающиеся на расстояния (KNN, K-means, SVM) и на градиентный спуск (разные масштабы → вытянутые овраги функционала, медленная сходимость). Также масштаб важен для корректной регуляризации.</P>
        <Ul items={[
          <><B>Standardization (Z-score)</B>: x' = (x − μ)/σ. Среднее 0, дисперсия 1. Самый частый выбор.</>,
          <><B>Min-Max</B>: x' = (x − min)/(max − min) → диапазон [0,1]. Чувствителен к выбросам.</>,
          <><B>RobustScaler</B>: через медиану и IQR — устойчив к выбросам.</>,
          <><B>MaxAbs, нормализация вектора (L2)</B> — для разреженных данных.</>,
          <><B>Log / Box-Cox / Yeo-Johnson</B> — для скошенных распределений.</>,
        ]} />
        <Warn>Параметры скейлинга (μ, σ, min, max) считают <B>только на train</B> и применяют к test — иначе утечка данных (data leakage). Деревья и их ансамбли в скейлинге не нуждаются.</Warn>
      </QA>

      <QA n="22" q="Как записываются аналитические решения? Какие у них проблемы?">
        <P>Для линейной регрессии с MSE минимум находится в явном виде — <B>нормальное уравнение</B>:</P>
        <Formula>w = (XᵀX)⁻¹ Xᵀy</Formula>
        <P>Для Ridge: w = (XᵀX + λI)⁻¹Xᵀy.</P>
        <P><B>Проблемы:</B></P>
        <Ul items={[
          <>Нужно <B>обращать матрицу</B> XᵀX размера d×d — сложность ≈ O(d³). При большом числе признаков очень дорого.</>,
          <>Если признаки <B>линейно зависимы</B> (мультиколлинеарность), XᵀX вырождена/плохо обусловлена и необратима — решение неустойчиво (Ridge с λI это лечит).</>,
          'Требует держать всю матрицу в памяти — не годится для очень больших выборок.',
          'Существует только для MSE/гладких задач; для MAE, логистической регрессии, нейросетей аналитики нет — там только итеративная оптимизация (градиентный спуск).',
        ]} />
      </QA>
    </>
  )
}

/* ═══════════════════════════ CHAPTER 2 — Classification ═══════════════════════════ */

function Chapter2() {
  return (
    <>
      <SectionTitle id="ch2" kicker="Глава 2">Классификация</SectionTitle>

      <QA n="1" q="Запишите формулу для линейной модели классификации. Что такое отступ?">
        <P>Линейный классификатор считает линейную комбинацию признаков и берёт её знак:</P>
        <Formula>a(x) = sign(⟨w, x⟩ + w₀)</Formula>
        <P>Гиперплоскость ⟨w,x⟩ + w₀ = 0 разделяет классы. Для класса y ∈ &#123;−1, +1&#125; вводят <B>отступ (margin)</B>:</P>
        <Formula>M = y · (⟨w, x⟩ + w₀)</Formula>
        <Ul items={[
          <><B>M &gt; 0</B> — объект классифицирован <B>верно</B> (знаки совпали); чем больше M, тем увереннее и дальше от границы.</>,
          <><B>M &lt; 0</B> — <B>ошибка</B>.</>,
          <>|M| — «уверенность», расстояние до разделяющей гиперплоскости (с точностью до ‖w‖).</>,
        ]} />
      </QA>

      <QA n="2" q="Как обучаются линейные классификаторы и для чего нужны верхние оценки пороговой функции потерь?">
        <P>Идеально мы хотим минимизировать число ошибок — <B>пороговую (0/1) функцию потерь</B> [M &lt; 0]. Но она <B>кусочно-постоянна</B>: её градиент почти всюду нулевой, оптимизировать градиентным спуском нельзя, а точная минимизация — NP-трудна.</P>
        <P>Решение: заменить [M&lt;0] на <B>гладкую верхнюю оценку</B> (мажоранту) L(M) ≥ [M&lt;0]. Минимизируя оценку, мы минимизируем и число ошибок сверху. Разные оценки → разные методы:</P>
        <Ul items={[
          <><B>Logistic</B>: log(1 + e^(−M)) — логистическая регрессия.</>,
          <><B>Hinge</B>: max(0, 1 − M) — SVM.</>,
          <><B>Exponential</B>: e^(−M) — AdaBoost.</>,
        ]} />
        <P>Все они выпуклы и дифференцируемы (почти всюду), поэтому обучаются градиентными методами.</P>
      </QA>

      <QA n="3" q="Что такое точность, полнота и F-мера? Почему F-мера лучше арифметического среднего и минимума?">
        <ConfusionMatrixViz />
        <Ul items={[
          <><B>Precision (точность)</B> = TP/(TP+FP) — какая доля помеченных «+» действительно «+». «Насколько можно верить срабатываниям».</>,
          <><B>Recall (полнота)</B> = TP/(TP+FN) — какую долю всех «+» мы поймали. «Сколько не пропустили».</>,
        ]} />
        <P>Между ними <B>trade-off</B>. Чтобы свести в одно число, берут <B>F-меру</B> — гармоническое среднее:</P>
        <Formula>F₁ = 2 · (P · R) / (P + R)</Formula>
        <Ul items={[
          <>Лучше <B>арифметического среднего</B>: при P=1, R=0 среднее даёт 0.5 (выглядит прилично), а F₁ = 0 — честно показывает, что модель бесполезна. F наказывает за дисбаланс между P и R.</>,
          <>Лучше <B>минимума</B>: min — недифференцируем и грубо игнорирует одну из метрик; F₁ гладко учитывает обе и реагирует на изменение любой из них.</>,
        ]} />
        <P>F_β = (1+β²)·PR / (β²P + R) позволяет сместить акцент: β &gt; 1 — важнее recall, β &lt; 1 — важнее precision.</P>
      </QA>

      <QA n="4" q="Для чего нужен порог в линейном классификаторе? Из каких соображений он может выбираться?">
        <P>Модель выдаёт не сразу класс, а <B>оценку/вероятность</B> p(x) ∈ [0,1]. <B>Порог</B> t переводит её в класс: «+», если p(x) ≥ t. Меняя t, мы двигаемся по trade-off precision↔recall, не переобучая модель.</P>
        <P><B>Как выбирают порог:</B></P>
        <Ul items={[
          'Максимизируя нужную метрику на валидации (F₁, accuracy).',
          'Из бизнес-цены ошибок: если пропуск (FN) дороже ложной тревоги (FP) — снижаем порог, чтобы поднять recall (мед. диагностика, фрод).',
          'По ROC-кривой (точка ближе к левому верхнему углу / макс. Youden J = TPR − FPR) или по PR-кривой.',
          'Под ограничение: «не более X% ложных срабатываний».',
        ]} />
      </QA>

      <QA n="5" q="Что такое AUC-ROC? Опишите алгоритм построения ROC-кривой.">
        <P><B>ROC-кривая</B> показывает зависимость <B>TPR</B> (=recall, TP/(TP+FN)) от <B>FPR</B> (FP/(FP+TN)) при всех порогах. <B>AUC-ROC</B> — площадь под ней (0.5 — случайная модель, 1.0 — идеальная).</P>
        <P><B>Алгоритм построения:</B></P>
        <Ul items={[
          'Отсортировать объекты по убыванию оценки p(x).',
          'Начать в точке (0,0), порог = +∞ (никто не «+»).',
          'Двигать порог вниз, по очереди относя объекты к «+». Встретили истинный «+» → шаг вверх на 1/P (растёт TPR). Встретили истинный «−» → шаг вправо на 1/N (растёт FPR).',
          'Дойдя до (1,1), получаем ступенчатую кривую; AUC = площадь под ней.',
        ]} />
        <RocViz />
        <Note>Вероятностный смысл: AUC-ROC = вероятность, что случайный положительный объект получит оценку <B>выше</B>, чем случайный отрицательный. Метрика не зависит от порога и устойчива к умеренному дисбалансу.</Note>
      </QA>

      <QA n="6" q="Что такое AUC-PRC? Опишите алгоритм построения PR-кривой.">
        <P><B>PR-кривая</B> — зависимость <B>Precision</B> от <B>Recall</B> при всех порогах. AUC-PRC (или Average Precision) — площадь под ней.</P>
        <P><B>Построение:</B> сортируем объекты по убыванию оценки; постепенно снижаем порог, на каждом шаге пересчитываем precision = TP/(TP+FP) и recall = TP/(TP+FN) и ставим точку (recall, precision). Соединяем точки.</P>
        <PrViz />
        <P>В отличие от ROC, PR <B>не использует TN</B>, поэтому при <B>сильном дисбалансе</B> (отрицательных в сотни раз больше) она честнее показывает качество: ROC может выглядеть прекрасно, а precision на деле низкий. Базовый уровень PR = доля положительного класса (а не 0.5).</P>
      </QA>

      <QA n="7" q="Что означает «модель оценивает вероятность положительного класса»? Как внедрить это требование в обучение?">
        <P>Это значит, что выход модели p(x) можно трактовать как <B>P(y = +1 | x)</B>: среди объектов с p≈0.7 примерно 70% действительно положительные (модель <B>калибрована</B>). Тогда выход — не просто ранжирование, а настоящая вероятность.</P>
        <P><B>Как внедрить:</B></P>
        <Ul items={[
          <>Пропустить линейный выход через <B>сигмоиду</B> σ(z) = 1/(1+e^(−z)), чтобы получить число в [0,1].</>,
          <>Обучать на <B>log-loss</B> (кросс-энтропии) — она выводится из метода максимального правдоподобия для распределения Бернулли и поощряет именно вероятностные, калиброванные ответы. Это и есть логистическая регрессия.</>,
          <>При необходимости — <B>калибровка</B> постфактум: Platt scaling (сигмоида над выходом) или isotonic regression.</>,
        ]} />
      </QA>

      <QA n="8" q="Запишите функционал логистической регрессии. Как он связан с методом максимума правдоподобия?">
        <P>Вероятность положительного класса: p(x) = σ(⟨w,x⟩). Правдоподобие выборки (модель Бернулли):</P>
        <Formula>L(w) = Πᵢ p(xᵢ)^yᵢ · (1 − p(xᵢ))^(1−yᵢ)</Formula>
        <P>Максимизация L эквивалентна минимизации <B>отрицательного лог-правдоподобия</B> = log-loss:</P>
        <Formula>Q(w) = −Σᵢ [ yᵢ·log p(xᵢ) + (1−yᵢ)·log(1−p(xᵢ)) ]</Formula>
        <P>В терминах отступа M = y⟨w,x⟩ это компактно: Q = Σ log(1 + e^(−Mᵢ)). Таким образом логистическая регрессия — это <B>прямое применение MLE</B>: ищем веса, при которых наблюдаемые метки наиболее правдоподобны.</P>
      </QA>

      <QA n="9" q="Когда используется accuracy?">
        <Formula>Accuracy = (TP + TN) / (всего объектов)</Formula>
        <P><B>Accuracy</B> — доля верных ответов. Уместна, когда: <B>классы сбалансированы</B>, и <B>цена ошибок разных типов одинакова</B>, и нужна простая, интуитивно понятная метрика.</P>
        <Warn>При дисбалансе accuracy обманчива: если 99% объектов класса «−», модель «всегда −» даёт 99% accuracy, будучи бесполезной. Тогда смотрят на precision/recall/F₁, ROC-AUC, PR-AUC, balanced accuracy.</Warn>
      </QA>

      <QA n="10" q="Как бороться с дисбалансом классов?">
        <Ul items={[
          <><B>На уровне данных:</B> oversampling меньшего класса (в т.ч. <B>SMOTE</B> — синтез новых объектов), undersampling большего, их комбинации.</>,
          <><B>На уровне модели:</B> веса классов (class_weight='balanced') — сильнее штрафовать ошибки на редком классе; cost-sensitive learning.</>,
          <><B>На уровне порога:</B> подбирать порог по F₁/recall, а не брать 0.5.</>,
          <><B>На уровне метрик:</B> оценивать качество по PR-AUC, F₁, balanced accuracy, а не accuracy.</>,
          <><B>Сбор данных:</B> добрать примеры редкого класса, если возможно.</>,
          'Иногда — переформулировать как задачу детекции аномалий (one-class).',
        ]} />
      </QA>
    </>
  )
}

/* ═══════════════════════════ CHAPTER 3 — Multiclass & trees ═══════════════════════════ */

function Chapter3() {
  return (
    <>
      <SectionTitle id="ch3" kicker="Глава 3">Многоклассовая классификация</SectionTitle>

      <QA n="1" q="Как измеряется качество в задаче многоклассовой классификации?">
        <P>Базово — <B>accuracy</B> (доля верных) и <B>матрица ошибок K×K</B> (строки — факт, столбцы — предсказание; на диагонали верные ответы). Для каждого класса можно посчитать precision/recall/F₁, рассматривая его как «+», остальные как «−» (one-vs-rest). Затем эти по-классовые метрики <B>усредняют</B> (micro/macro/weighted). Также используют Cohen's kappa, log-loss (по вероятностям), multiclass ROC-AUC (OvR/OvO).</P>
      </QA>

      <QA n="2" q="Расскажите про микро- и макро-усреднение.">
        <Ul items={[
          <><B>Macro</B>: считаем метрику для каждого класса отдельно и берём <B>простое среднее</B>. Все классы равнозначны → <B>редкие классы влияют так же, как частые</B>. Хорошо, когда важны малые классы.</>,
          <><B>Micro</B>: суммируем TP, FP, FN <B>по всем классам</B>, потом считаем метрику. Доминируют <B>частые</B> классы. В многоклассовой задаче micro-F₁ = micro-precision = micro-recall = accuracy.</>,
          <><B>Weighted</B>: macro, но взвешенное по числу объектов каждого класса — компромисс.</>,
        ]} />
        <Note>Пример: класс A — 990 объектов, класс B — 10. Модель хорошо ловит A, плохо B. Micro-F₁ будет высоким (тянет A), macro-F₁ — низким (B весит наравне). Выбор зависит от того, важны ли редкие классы.</Note>
      </QA>

      <QA n="3" q="Что такое mean-target encoding?">
        <P><B>Mean-target encoding</B> — кодирование категориального признака <B>средним значением таргета</B> по этой категории. Например, для города «Москва» подставляем среднюю вероятность класса «+» (или среднюю цену) среди всех объектов из Москвы.</P>
        <P>Плюсы: компактно (один числовой столбец вместо сотен one-hot), хорошо работает с признаками высокой кардинальности (много уникальных значений), несёт прямой сигнал о связи категории с таргетом.</P>
      </QA>

      <QA n="4" q="Может ли mean-target encoding привести к переобучению? Как этого избежать?">
        <P><B>Да.</B> Если кодировать объект средним таргетом по категории, посчитанным с <B>учётом самого этого объекта</B>, происходит <B>утечка таргета (target leakage)</B>: признак «подсматривает» ответ, особенно у редких категорий (где в категории 1 объект — кодировка = его собственный y).</P>
        <P><B>Как избежать:</B></P>
        <Ul items={[
          <><B>Out-of-fold / K-fold encoding</B>: кодировку для объекта считают по <B>другим</B> фолдам, не содержащим его.</>,
          <><B>Smoothing (сглаживание)</B>: среднее по категории смешивают с глобальным средним, веся по размеру категории: (n·mean_cat + α·mean_global)/(n + α). Редкие категории тянутся к глобальному среднему.</>,
          <><B>Leave-one-out</B>: среднее по категории без текущего объекта.</>,
          <>Добавить <B>шум</B>; в CatBoost — ordered target statistics (по «прошлым» объектам в случайной перестановке).</>,
        ]} />
      </QA>

      <QA n="5" q="Как можно отбирать признаки для линейной модели?">
        <Ul items={[
          <><B>Встроенные (embedded)</B>: <B>L1-регуляризация (Lasso)</B> зануляет веса неинформативных признаков прямо при обучении.</>,
          <><B>Фильтры (filter)</B>: оценить каждый признак отдельно — корреляция с таргетом, взаимная информация, χ², ANOVA F-тест — и отобрать топ. Быстро, но игнорирует взаимодействия.</>,
          <><B>Обёртки (wrapper)</B>: перебор подмножеств по качеству модели — forward selection, backward elimination, <B>RFE</B> (рекурсивное исключение по величине весов). Точнее, но дорого.</>,
          <>Удаление мультиколлинеарных признаков (по VIF/корреляции), анализ величины стандартизованных весов и их значимости (p-value).</>,
        ]} />
      </QA>

      <QA n="6" q="Что такое решающее дерево?">
        <P><B>Решающее дерево</B> — модель в виде дерева вопросов. Во <B>внутренних вершинах</B> — условия-предикаты (обычно «признак &lt; порог»), <B>рёбра</B> — ответы да/нет, в <B>листьях</B> — предсказание (класс или число). Чтобы классифицировать объект, спускаемся от корня к листу, отвечая на вопросы. Дерево разбивает пространство признаков на прямоугольные области, параллельные осям.</P>
        <TreeViz />
      </QA>

      <QA n="7" q="Опишите жадный алгоритм обучения решающего дерева.">
        <P>Деревья строят <B>жадно, сверху вниз</B> (рекурсивно), потому что искать глобально оптимальное дерево — NP-трудно.</P>
        <Ul items={[
          'Для текущей вершины перебрать все признаки и все пороги разбиения.',
          'Для каждого варианта посчитать прирост качества — насколько падает «хаотичность» (impurity) после разбиения (information gain).',
          'Выбрать лучшее разбиение, разделить выборку на два потомка.',
          'Рекурсивно повторить для каждого потомка.',
          'Остановиться по критерию: достигнута max глубина / в вершине мало объектов / вершина чистая / прирост качества мал. Лист помечается мажоритарным классом (или средним для регрессии).',
        ]} />
        <P>Часто после построения дерево <B>подрезают (pruning)</B>, чтобы уменьшить переобучение.</P>
      </QA>

      <QA n="8" q="Почему бинарным деревом можно достичь нулевой ошибки на обучении без повторяющихся объектов?">
        <P>Если нет двух объектов с одинаковыми признаками, но разными метками (нет противоречий), дерево можно дробить до тех пор, пока в <B>каждом листе не останется по одному объекту</B> (или объекты одного класса). Тогда каждый обучающий объект попадает в «свой» чистый лист и классифицируется верно → ошибка на train = 0.</P>
        <Warn>Это и есть <B>переобучение</B>: глубокое дерево идеально на train, но плохо обобщает. Поэтому глубину/размер листа ограничивают.</Warn>
      </QA>

      <QA n="9" q="Что такое критерий хаотичности? Как он используется для выбора предиката?">
        <P><B>Критерий хаотичности (impurity)</B> H(R) измеряет «неоднородность» вершины — насколько перемешаны классы. H = 0, если все объекты одного класса (чисто), и максимален при равномерной смеси.</P>
        <P>При выборе разбиения максимизируют <B>information gain</B> — уменьшение хаотичности после деления на потомков L и R:</P>
        <Formula>Gain = H(R) − (|R_L|/|R|)·H(R_L) − (|R_R|/|R|)·H(R_R)</Formula>
        <P>Перебирают все (признак, порог) и берут разбиение с максимальным Gain — то, которое делает потомков максимально «чистыми».</P>
      </QA>

      <QA n="10" q="В чём отличия энтропийного критерия и критерия Джини?">
        <Formula>Энтропия: H = −Σₖ pₖ·log₂ pₖ    ·    Джини: H = 1 − Σₖ pₖ²</Formula>
        <Ul items={[
          'Оба измеряют неоднородность, оба = 0 на чистой вершине и максимальны при равных долях классов.',
          <><B>Джини</B> не требует логарифма → считается <B>быстрее</B> (дефолт в CART/sklearn).</>,
          <><B>Энтропия</B> чуть сильнее «штрафует» смешанные вершины и иногда даёт более сбалансированные деревья.</>,
          'На практике результаты почти не отличаются; выбор критерия влияет на качество слабо, в отличие от глубины и регуляризации.',
        ]} />
      </QA>

      <QA n="11" q="Как связаны линейные модели и решающие деревья?">
        <Ul items={[
          <><B>Граница решения:</B> у линейной модели — одна <B>наклонная гиперплоскость</B>; у дерева — <B>ступенчатая</B>, из прямоугольников, параллельных осям.</>,
          <><B>Линейные зависимости:</B> линейная модель ловит их одним коэффициентом; дереву нужно много ступенек, чтобы приблизить наклонную границу.</>,
          <><B>Нелинейности и взаимодействия:</B> дерево ловит их автоматически; линейной модели нужны ручные преобразования/полиномы.</>,
          <><B>Масштаб и категории:</B> деревья нечувствительны к масштабу и легко работают с категориями; линейным нужен скейлинг и кодирование.</>,
          'Обе можно комбинировать: например, листья дерева как признаки для линейной модели; линейная модель в листьях (model trees).',
        ]} />
      </QA>

      <QA n="12" q="Как посчитать хаотичность вершины в задаче классификации? А в задаче регрессии?">
        <P><B>Классификация:</B> через доли классов pₖ в вершине — энтропия −Σpₖlog pₖ или Джини 1−Σpₖ².</P>
        <P><B>Регрессия:</B> хаотичность — это <B>разброс таргета</B> в вершине. Берут <B>дисперсию / MSE</B> относительно среднего ŷ = mean(y) в вершине:</P>
        <Formula>H(R) = (1/|R|) · Σ (по i∈R) (yᵢ − ȳ_R)²</Formula>
        <P>Разбиение выбирают так, чтобы суммарная взвешенная дисперсия потомков была минимальна (потомки «однороднее» по значению y). Иногда вместо MSE используют MAE (тогда в листе — медиана).</P>
      </QA>

      <QA n="13" q="В чём заключается метод опорных векторов (SVM)?">
        <P><B>SVM</B> ищет разделяющую гиперплоскость с <B>максимальным зазором (margin)</B> — максимально удалённую от ближайших объектов обоих классов. Эти ближайшие объекты — <B>опорные векторы</B>, только они определяют границу.</P>
        <Ul items={[
          <><B>Hard margin</B> — для линейно разделимых данных. <B>Soft margin</B> (с параметром C) допускает ошибки, балансируя ширину зазора и нарушения.</>,
          <><B>Hinge loss</B> max(0, 1 − M) + L2-регуляризация — оптимизационная форма.</>,
          <><B>Kernel trick</B>: ядра (RBF, полиномиальное) неявно отображают данные в пространство большей размерности, где они линейно разделимы — так SVM строит нелинейные границы без явного вычисления координат.</>,
        ]} />
      </QA>

      <QA n="14" q="В чём заключается метод k-ближайших соседей (KNN)?">
        <P><B>KNN</B> — «ленивый» (lazy) метод: не строит модель заранее, а хранит обучающую выборку. Для нового объекта находит <B>k ближайших</B> по выбранной метрике (евклид, косинус, манхэттен) и:</P>
        <Ul items={[
          'классификация — относит к классу большинства среди k соседей (можно с весами по расстоянию);',
          'регрессия — усредняет y соседей.',
        ]} />
        <Ul items={[
          <>Малое k → чувствительность к шуму (переобучение); большое k → переусреднение (недообучение). k подбирают по валидации, часто нечётное.</>,
          <>Обязателен <B>скейлинг</B> признаков. Страдает от «проклятия размерности» и медленного предсказания на больших выборках (ускоряют KD-tree/Ball-tree).</>,
        ]} />
      </QA>

      <QA n="15" q="Нужно ли заниматься предобработкой данных в случае дерева?">
        <P>Деревьям нужно <B>меньше</B> предобработки:</P>
        <Ul items={[
          <><B>Скейлинг/нормализация не нужны</B> — дерево использует пороги по каждому признаку отдельно, монотонные преобразования границы не меняют.</>,
          <>Устойчивы к <B>выбросам</B> и к монотонным искажениям признаков.</>,
          <>Но полезно: обработка <B>пропусков</B> (зависит от реализации), кодирование <B>категорий</B> (для sklearn нужно, CatBoost/LightGBM умеют сами), отбор/создание признаков, борьба с дисбалансом.</>,
        ]} />
      </QA>

      <QA n="16" q="Как деревья работают с NaN?">
        <Ul items={[
          <><B>sklearn (классический CART)</B> сам по себе NaN <B>не поддерживает</B> — нужна импутация заранее (HistGradientBoosting — поддерживает).</>,
          <><B>Surrogate splits</B> (как в C4.5/rpart): для объекта с пропуском используют запасной признак, коррелирующий с основным.</>,
          <><B>Направление по умолчанию</B> (XGBoost, LightGBM, CatBoost): на каждом сплите алгоритм <B>выучивает</B>, в какую ветку (лево/право) отправлять объекты с пропуском, выбирая то направление, что даёт больший gain. Это часто работает лучше импутации, т.к. сам факт пропуска может нести сигнал.</>,
        ]} />
      </QA>

      <QA n="17" q="Как деревья работают с категориальными значениями?">
        <Ul items={[
          <><B>sklearn</B> требует числового входа → нужно <B>кодирование</B>: one-hot (для малой кардинальности), label/ordinal (осторожно — навязывает порядок), mean-target encoding (для высокой кардинальности).</>,
          <><B>LightGBM</B> умеет работать с категориями нативно: сортирует значения по статистике таргета и ищет оптимальное разбиение на два подмножества категорий.</>,
          <><B>CatBoost</B> специально заточен под категории — использует ordered target statistics и комбинации категориальных признаков, борясь с утечкой через упорядочивание.</>,
        ]} />
        <Note>One-hot для признака с тысячами уникальных значений раздувает размерность и делает сплиты слабыми — для high-cardinality лучше target encoding или нативная поддержка.</Note>
      </QA>

      <QA n="18" q="Как сделать многоклассовую классификацию через логрег?">
        <P>Логистическая регрессия бинарна, на K классов её обобщают:</P>
        <Ul items={[
          <><B>One-vs-Rest (OvR)</B>: обучаем K бинарных классификаторов «класс k против всех». Объект относим к классу с максимальной оценкой. Просто, K моделей.</>,
          <><B>One-vs-One (OvO)</B>: K(K−1)/2 классификаторов на каждую пару классов, голосование. Дороже по числу моделей, но каждая учится на меньшем наборе.</>,
          <><B>Softmax / мультиномиальная логрег</B>: прямое обобщение — для каждого класса свои веса, вероятности через softmax: P(y=k|x) = e^⟨w_k,x⟩ / Σⱼ e^⟨w_j,x⟩. Обучается на кросс-энтропии, даёт согласованные вероятности по всем классам сразу.</>,
        ]} />
      </QA>
    </>
  )
}

/* ═══════════════════════════ CHAPTER 4 — Forests & boosting ═══════════════════════════ */

function Chapter4() {
  return (
    <>
      <SectionTitle id="ch4" kicker="Глава 4">Леса и бустинг</SectionTitle>

      <Note>
        <B>Bias–variance.</B> Ошибка модели раскладывается на <B>смещение</B> (bias — систематическая ошибка от излишней простоты, недообучение) и <B>разброс</B> (variance — чувствительность к конкретной выборке, переобучение). Бэггинг снижает variance, бустинг — bias.
      </Note>

      <QA n="1" q="Приведите пример семейства алгоритмов с низким смещением и большим разбросом.">
        <P><B>Глубокие решающие деревья</B> (без ограничения глубины), а также KNN с малым k. Они очень гибкие → почти не имеют систематической ошибки (<B>низкий bias</B>), но сильно зависят от конкретной обучающей выборки: чуть изменили данные — дерево перестроилось (<B>высокий variance</B>, переобучение). Именно такие модели берут как базовые в <B>бэггинг/случайный лес</B>.</P>
      </QA>

      <QA n="2" q="Приведите пример семейства алгоритмов с большим смещением и низким разбросом.">
        <P><B>Линейная регрессия</B>, <B>неглубокие деревья (пни, decision stumps)</B>, KNN с большим k. Они «жёсткие», не могут описать сложную зависимость → <B>высокий bias</B> (недообучение), но устойчивы к изменению выборки → <B>низкий variance</B>. Простые модели (пни) берут как базовые в <B>бустинге</B>, который последовательно снижает их смещение.</P>
      </QA>

      <QA n="3" q="Что такое бэггинг? Как его смещение и разброс связаны с базовыми моделями?">
        <P><B>Бэггинг (Bootstrap Aggregating)</B>: обучаем много моделей на <B>бутстрэп-выборках</B> (случайные подвыборки с возвращением) и усредняем их ответы (голосование/среднее).</P>
        <Ul items={[
          <><B>Смещение</B> ансамбля ≈ смещению одной базовой модели (усреднение его не меняет). Поэтому базовые модели должны быть с <B>низким bias</B> (глубокие деревья).</>,
          <><B>Разброс</B> <B>снижается</B>: усреднение N моделей уменьшает дисперсию (в идеале независимых — в N раз; реально слабее из-за корреляции). Var → ρσ² + (1−ρ)σ²/N.</>,
        ]} />
        <P>Итог: бэггинг берёт переобучающиеся, но несмещённые модели и гасит их разброс усреднением.</P>
      </QA>

      <QA n="4" q="Что такое случайный лес? Чем он отличается от бэггинга над деревьями?">
        <P><B>Случайный лес</B> = бэггинг над деревьями + <B>дополнительная рандомизация признаков</B>: в каждой вершине разбиение ищется не по всем признакам, а по случайному подмножеству (обычно √d для классификации, d/3 для регрессии).</P>
        <P>Зачем: в обычном бэггинге деревья <B>скоррелированы</B> — все хватаются за один сильный признак и получаются похожими, что ограничивает снижение дисперсии. Случайный выбор признаков <B>декоррелирует</B> деревья → ансамбль разнообразнее → дисперсия падает сильнее. Это главное отличие.</P>
      </QA>

      <QA n="5" q="Перечислите основные плюсы решающего леса.">
        <Ul items={[
          'Высокое качество «из коробки», мало настройки гиперпараметров.',
          'Устойчив к переобучению (за счёт усреднения) — можно строить глубокие деревья.',
          'Не нужен скейлинг; работает с разными типами признаков, ловит нелинейности и взаимодействия.',
          'Устойчив к выбросам и шумовым признакам.',
          'Даёт feature importance и OOB-оценку качества (без отдельной валидации).',
          'Легко параллелится — деревья независимы.',
        ]} />
      </QA>

      <QA n="6" q="Назовите недостатки случайного леса.">
        <Ul items={[
          'Большая модель: сотни деревьев → много памяти, медленнее предсказание.',
          'Плохо экстраполирует (в регрессии не выходит за диапазон обучающих y).',
          'Менее интерпретируем, чем одно дерево («чёрный ящик»).',
          'Обычно проигрывает по точности хорошо настроенному градиентному бустингу.',
          'Не ловит линейные/гладкие зависимости так же эффективно, как линейные модели; смещён в сторону признаков высокой кардинальности в feature importance.',
        ]} />
      </QA>

      <QA n="7" q="Как работает алгоритм градиентного бустинга?">
        <P><B>Бустинг</B> строит модели <B>последовательно</B>, каждая новая исправляет ошибки предыдущих. Итоговое предсказание — сумма базовых моделей со своими весами:</P>
        <Formula>a(x) = Σₘ γₘ · bₘ(x)</Formula>
        <Ul items={[
          'Инициализируем простым предсказанием (например, средним y).',
          'На каждой итерации считаем антиградиент функции потерь по текущим предсказаниям — это «остатки», направление, куда надо двигаться.',
          'Обучаем новую базовую модель bₘ предсказывать эти остатки.',
          'Добавляем её в ансамбль с шагом (learning rate): a ← a + η·bₘ.',
          'Повторяем M раз.',
        ]} />
        <P>Название «градиентный»: мы делаем <B>градиентный спуск в пространстве функций</B> — каждое новое дерево это шаг против градиента функционала.</P>
      </QA>

      <QA n="8" q="Как обычно выглядят базовые модели в бустинге? Почему?">
        <P>Базовые модели — <B>неглубокие деревья</B> (обычно глубина 3–8, «слабые» учители). Почему:</P>
        <Ul items={[
          <>Бустинг снижает <B>смещение</B>, последовательно усложняя ансамбль, поэтому стартовать надо со <B>слабых моделей с низким variance</B> (высокий bias) — иначе ансамбль быстро переобучится.</>,
          <>Глубокие деревья как базовые → каждое само переобучается, сумма таких неустойчива.</>,
          <>Неглубокие деревья дёшевы и быстро обучаются, а их ограниченная глубина задаёт максимальный порядок учитываемых <B>взаимодействий</B> признаков (глубина 1 — без взаимодействий, 2 — попарные и т.д.).</>,
        ]} />
      </QA>

      <QA n="9" q="Что такое сдвиги в градиентном бустинге, зачем они нужны?">
        <P><B>Сдвиги (residuals / псевдо-остатки)</B> — это <B>антиградиент функции потерь</B> по текущим предсказаниям ансамбля, вычисленный на каждом объекте:</P>
        <Formula>rᵢ = − ∂L(yᵢ, a(xᵢ)) / ∂a(xᵢ)</Formula>
        <P>Они показывают, <B>в какую сторону и насколько</B> надо подвинуть предсказание каждого объекта, чтобы уменьшить ошибку. Новая базовая модель обучается предсказывать именно эти сдвиги. Для MSE сдвиг = обычный остаток (y − ŷ); для других потерь (log-loss, MAE) — соответствующий антиградиент. Так бустинг обобщается на любую дифференцируемую функцию потерь.</P>
      </QA>

      <QA n="10" q="Как обучается очередной базовый алгоритм в градиентном бустинге?">
        <Ul items={[
          'Берём текущий ансамбль a_{m−1}(x) и считаем на всех объектах псевдо-остатки rᵢ (антиградиент потерь).',
          'Обучаем новое дерево bₘ(x) на парах (xᵢ, rᵢ) — обычно по MSE, т.е. дерево приближает остатки.',
          'Подбираем оптимальные значения в листьях (для общей потери — отдельной одномерной оптимизацией / шагом Ньютона; в XGBoost — через градиенты и гессианы).',
          'Добавляем с шагом: a_m = a_{m−1} + η·bₘ. Малый η (0.01–0.1) + больше деревьев → лучше обобщение (шринкедж).',
        ]} />
      </QA>

      <QA n="11" q="Расскажите про виды бустинга (CatBoost, LightGBM, XGBoost), их особенности и различия.">
        <Ul items={[
          <><B>XGBoost</B>: использует градиенты <B>и гессианы</B> (2-й порядок) при построении деревьев, L1/L2-регуляризация, обработка пропусков (learned default direction). Рост деревьев <B>level-wise</B> (по уровням). Надёжный «дефолт».</>,
          <><B>LightGBM</B>: рост <B>leaf-wise</B> (растит лист с макс. приростом → глубже и точнее, но риск переобучения), гистограммное разбиение признаков (быстро), <B>GOSS</B> (фокус на объектах с большим градиентом) и <B>EFB</B> (склейка разреженных признаков). Самый <B>быстрый</B> на больших данных, нативно работает с категориями.</>,
          <><B>CatBoost</B>: заточен под <B>категориальные</B> признаки (ordered target statistics, комбинации), <B>ordered boosting</B> против target leakage, <B>симметричные (oblivious)</B> деревья — быстрый инференс. Отлично работает «из коробки» с минимальной настройкой.</>,
        ]} />
        <P>Общее: все — градиентный бустинг над деревьями; различия в скорости, работе с категориями и способе борьбы с переобучением.</P>
      </QA>

      <QA n="12" q="Почему дерево строится по MSE (идея, что связано с косинусным расстоянием)?">
        <P>Очередное дерево должно как можно лучше приблизить вектор антиградиента r. «Лучше всего двигаться против градиента» означает, что предсказания дерева b должны быть максимально <B>сонаправлены</B> с r — то есть максимизировать косинус угла ⟨b, r⟩/(‖b‖‖r‖).</P>
        <P>Минимизация <B>MSE</B> Σ(rᵢ − bᵢ)² = ‖r‖² − 2⟨b,r⟩ + ‖b‖² при фиксированной норме как раз <B>максимизирует скалярное произведение ⟨b, r⟩</B>, т.е. косинусную близость к антиградиенту. Поэтому базовое дерево подгоняют под остатки по MSE — это эквивалентно поиску шага, наиболее коллинеарного направлению наискорейшего спуска.</P>
      </QA>

      <QA n="13" q="Как работает OOB (out-of-bag)?">
        <P>В бэггинге каждое дерево обучается на бутстрэп-выборке, в которую попадает ≈63% объектов; оставшиеся ≈37% — <B>out-of-bag</B> для этого дерева. Для оценки качества каждый объект прогоняют <B>только через те деревья, где он был OOB</B>, и агрегируют их предсказания. Сравнив с истинными метками, получаем <B>OOB-оценку</B> качества.</P>
        <P>Плюс: это почти бесплатная оценка обобщающей способности <B>без отдельной валидации/кросс-валидации</B> — каждый объект послужил «тестовым» для части деревьев. Применимо к случайному лесу/бэггингу, но не к бустингу (там деревья зависимы).</P>
      </QA>

      <QA n="14" q="Как работает feature importance?">
        <Ul items={[
          <><B>Impurity-based (Gini importance, MDI)</B>: суммарное уменьшение хаотичности (Gini/MSE) по всем сплитам этого признака, взвешенное по числу объектов. Быстро, но <B>смещено</B> в сторону признаков с высокой кардинальностью и коррелированных признаков.</>,
          <><B>Permutation importance</B>: случайно <B>перемешиваем</B> значения признака и смотрим, насколько упало качество. Сильно упало → признак важен. Честнее, считается на валидации, но дороже.</>,
          <><B>SHAP-values</B>: вклад каждого признака в каждое конкретное предсказание на основе теории игр (значения Шепли). Самый аккуратный и согласованный метод, даёт и глобальную, и локальную важность.</>,
        ]} />
        <Warn>Коррелированные признаки «делят» важность между собой и могут выглядеть менее значимыми, чем есть. Permutation и SHAP надёжнее impurity-based.</Warn>
      </QA>
    </>
  )
}

/* ═══════════════════════════ CHAPTER 5 — Clustering ═══════════════════════════ */

function Chapter5() {
  return (
    <>
      <SectionTitle id="ch5" kicker="Глава 5">Кластеризация</SectionTitle>

      <QA n="1" q="Опишите задачу кластеризации. Приведите примеры.">
        <P><B>Кластеризация</B> — задача <B>обучения без учителя (unsupervised)</B>: разбить объекты на группы (кластеры) так, чтобы внутри группы объекты были <B>похожи</B>, а между группами — <B>различны</B>. Меток классов нет — структуру ищем сами.</P>
        <P><B>Примеры:</B></P>
        <Ul items={[
          'Сегментация клиентов (по поведению/покупкам) для маркетинга.',
          'Группировка похожих документов/новостей, тем (topic discovery).',
          'Сжатие изображений (кластеризация цветов), квантизация.',
          'Поиск аномалий (объекты вне кластеров).',
          'Биоинформатика (группы генов), рекомендации.',
        ]} />
        <P>Отличие от классификации: там есть готовые метки (supervised), здесь — нет.</P>
      </QA>

      <QA n="2" q="Метрики качества кластеризации.">
        <P><B>Внутренние</B> (без истинных меток, по геометрии):</P>
        <Ul items={[
          <><B>Silhouette (силуэт)</B> ∈ [−1,1]: насколько объект ближе к своему кластеру, чем к соседнему. Ближе к 1 — хорошо.</>,
          <><B>Inertia / WCSS</B>: сумма квадратов расстояний до центров (для метода локтя при выборе k).</>,
          <><B>Davies–Bouldin</B> (меньше — лучше), <B>Calinski–Harabasz</B> (больше — лучше) — отношение межкластерного разброса к внутрикластерному.</>,
        ]} />
        <P><B>Внешние</B> (если есть истинная разметка для проверки):</P>
        <Ul items={[
          <><B>Adjusted Rand Index (ARI)</B>, <B>Adjusted Mutual Information (AMI)</B> — согласованность с истинным разбиением, скорректированы на случайность.</>,
          <><B>Homogeneity / Completeness / V-measure</B>.</>,
        ]} />
      </QA>

      <QA n="3" q="Расскажите про алгоритмы кластеризации, которые вы знаете (k-means, DBSCAN…).">
        <Ul items={[
          <><B>K-means</B>: задаём число кластеров k, итеративно: (1) относим объекты к ближайшему центру, (2) пересчитываем центры как средние. Быстрый и простой, но требует задать k, находит только <B>выпуклые/сферические</B> кластеры примерно равного размера, чувствителен к инициализации (k-means++) и выбросам.</>,
          <><B>DBSCAN</B>: плотностный. Кластеры = плотные области, соединённые через ε-окрестности (параметры eps и min_samples). <B>Сам определяет число кластеров</B>, находит <B>произвольную форму</B>, помечает <B>выбросы</B> как шум. Минус: плохо при разной плотности кластеров, чувствителен к eps.</>,
          <><B>Иерархическая (agglomerative)</B>: снизу вверх объединяет ближайшие кластеры, строит <B>дендрограмму</B>; число кластеров выбирают, «разрезав» её. Не нужно задавать k заранее, но дорого O(n²–n³).</>,
          <><B>Gaussian Mixture (GMM)</B>: вероятностная модель — смесь гауссиан, обучается EM-алгоритмом, даёт <B>мягкое</B> отнесение (вероятности) и эллиптические кластеры.</>,
          <><B>Mean-Shift, Spectral, OPTICS</B> — для сложных форм/структур.</>,
        ]} />
        <Note>Выбор: знаете k и кластеры компактные → K-means; произвольная форма и шум → DBSCAN; нужна иерархия/дендрограмма → agglomerative; нужны вероятности → GMM. Перед кластеризацией почти всегда нужен <B>скейлинг</B> признаков.</Note>
      </QA>
    </>
  )
}
