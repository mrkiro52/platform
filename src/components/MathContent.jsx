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

// Векторы на координатной сетке: рисунки к занятию 3 (вектор по двум точкам, правило параллелограмма)
function arrowHead(x1, y1, x2, y2, size = 7) {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const p = (da) => `${(x2 - size * Math.cos(a + da)).toFixed(1)},${(y2 - size * Math.sin(a + da)).toFixed(1)}`
  return `${x2},${y2} ${p(0.42)} ${p(-0.42)}`
}

function VectorGrid({ kind }) {
  const X0 = 48, Y0 = 196, S = 34
  const px = x => X0 + x * S
  const py = y => Y0 - y * S
  const ticks = [1, 2, 3, 4, 5]
  const Arrow = ({ from, to, color, dash }) => (
    <g stroke={color} fill={color}>
      <path d={`M${px(from[0])} ${py(from[1])} L${px(to[0])} ${py(to[1])}`} strokeWidth="2" strokeDasharray={dash} fill="none" />
      <polygon points={arrowHead(px(from[0]), py(from[1]), px(to[0]), py(to[1]))} stroke="none" />
    </g>
  )
  return (
    <svg className="math-svg" viewBox="0 0 300 226" role="img"
      aria-label={kind === 'vector' ? 'Вектор AB = (3; 2) на координатной плоскости' : 'Правило параллелограмма: a + b = (4; 4)'}>
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.55" fill="none">
        <path d={`M${px(-0.4)} ${Y0} H${px(5.6)}`} />
        <path d={`M${X0} ${py(-0.4)} V${py(5.3)}`} />
        {ticks.map(t => <path key={`x${t}`} d={`M${px(t)} ${Y0 - 3} V${Y0 + 3}`} />)}
        {ticks.map(t => <path key={`y${t}`} d={`M${X0 - 3} ${py(t)} H${X0 + 3}`} />)}
      </g>
      <g fill="currentColor" opacity="0.7" fontSize="11" fontFamily="Georgia, serif">
        {ticks.map(t => <text key={`x${t}`} x={px(t)} y={Y0 + 16} textAnchor="middle">{t}</text>)}
        {ticks.map(t => <text key={`y${t}`} x={X0 - 9} y={py(t) + 4} textAnchor="end">{t}</text>)}
        <text x={px(5.6) - 2} y={Y0 - 8} fontStyle="italic">x</text>
        <text x={X0 + 8} y={py(5.3) + 10} fontStyle="italic">y</text>
      </g>
      {kind === 'vector' ? (
        <>
          <g stroke="currentColor" strokeDasharray="4 3" opacity="0.6" fill="none">
            <path d={`M${px(1)} ${py(2)} H${px(4)} V${py(4)}`} />
          </g>
          <Arrow from={[1, 2]} to={[4, 4]} color="#FFB870" />
          <g fontSize="12" fontFamily="Georgia, serif" fill="currentColor">
            <text x={px(1) - 6} y={py(2) - 8} textAnchor="end" fontStyle="italic">A(1; 2)</text>
            <text x={px(4) + 6} y={py(4) - 6} fontStyle="italic">B(4; 4)</text>
            <text x={px(2.5)} y={py(2) + 16} textAnchor="middle">3</text>
            <text x={px(4) + 8} y={py(3) + 4}>2</text>
          </g>
        </>
      ) : (
        <>
          <g stroke="currentColor" strokeDasharray="2 3" opacity="0.55" fill="none">
            <path d={`M${px(3)} ${py(1)} L${px(4)} ${py(4)} L${px(1)} ${py(3)}`} />
          </g>
          <Arrow from={[0, 0]} to={[3, 1]} color="#FFB870" />
          <Arrow from={[0, 0]} to={[1, 3]} color="#79C0FF" />
          <Arrow from={[0, 0]} to={[4, 4]} color="#7EE787" dash="6 4" />
          <g fontSize="12" fontFamily="Georgia, serif" fontStyle="italic">
            <text x={px(3) + 6} y={py(1) + 14} fill="#FFB870">a = (3; 1)</text>
            <text x={px(1) - 4} y={py(3) - 8} textAnchor="end" fill="#79C0FF">b = (1; 3)</text>
            <text x={px(4) + 6} y={py(4) - 4} fill="#7EE787">a + b = (4; 4)</text>
          </g>
        </>
      )}
    </svg>
  )
}

// Диаграмма Венна: события A и B в пространстве исходов Ω — рисунок к занятию 4
function VennFigure() {
  return (
    <svg className="math-svg" viewBox="0 0 300 200" role="img" aria-label="Диаграмма Венна: события A и B внутри Ω, пересечение A ∩ B">
      <rect x="20" y="12" width="260" height="176" rx="4" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      <circle cx="122" cy="100" r="58" fill="#FFB870" fillOpacity="0.16" stroke="#FFB870" strokeWidth="2" />
      <circle cx="178" cy="100" r="58" fill="#79C0FF" fillOpacity="0.16" stroke="#79C0FF" strokeWidth="2" />
      <g fontSize="14" fontFamily="Georgia, serif" fontStyle="italic" fill="currentColor">
        <text x="32" y="34">Ω</text>
        <text x="92" y="105" fill="#FFB870">A</text>
        <text x="200" y="105" fill="#79C0FF">B</text>
        <text x="150" y="178" textAnchor="middle" fontSize="12">A ∩ B</text>
      </g>
      <path d="M150 164 V108" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="150" cy="100" r="2.6" fill="currentColor" />
    </svg>
  )
}

// ── Рисунки к занятию 5: распределения ─────────────────────────────────────

const ORANGE = '#FFB870', BLUE = '#79C0FF', GREEN = '#7EE787'
const normalPdf = (x, mu, s) => Math.exp(-((x - mu) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI))

// Оси с подписанными засечками: px/py переводят значения в координаты рисунка
function Axes({ px, py, x0, x1, y1, xTicks = [], yTicks = [], xLabel, yLabel }) {
  return (
    <>
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.55" fill="none">
        <path d={`M${px(x0)} ${py(0)} H${px(x1)}`} />
        <path d={`M${px(x0)} ${py(0)} V${py(y1)}`} />
        {xTicks.map(([v]) => <path key={v} d={`M${px(v)} ${py(0) - 3} V${py(0) + 3}`} />)}
        {yTicks.map(([v]) => <path key={v} d={`M${px(x0) - 3} ${py(v)} H${px(x0) + 3}`} />)}
      </g>
      <g fill="currentColor" opacity="0.75" fontSize="11" fontFamily="Georgia, serif">
        {xTicks.map(([v, t]) => <text key={v} x={px(v)} y={py(0) + 16} textAnchor="middle">{t}</text>)}
        {yTicks.map(([v, t]) => <text key={v} x={px(x0) - 7} y={py(v) + 4} textAnchor="end">{t}</text>)}
        {xLabel && <text x={px(x1)} y={py(0) - 7} textAnchor="end" fontStyle="italic">{xLabel}</text>}
        {yLabel && <text x={px(x0) + 7} y={py(y1) + 10} fontStyle="italic">{yLabel}</text>}
      </g>
    </>
  )
}

function curvePath(f, from, to, px, py, step = 0.05) {
  const pts = []
  for (let x = from; x <= to + 1e-9; x += step) pts.push(`${pts.length ? 'L' : 'M'}${px(x).toFixed(1)} ${py(f(x)).toFixed(1)}`)
  return pts.join(' ')
}

// Биномиальное распределение n = 10, p = 0,5: столбик — вероятность каждого значения
function BinomialFigure() {
  const C = [1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1]
  const px = k => 52 + k * 24, py = v => 190 - v * 640
  return (
    <svg className="math-svg" viewBox="0 0 340 222" role="img" aria-label="Биномиальное распределение при n = 10, p = 0,5">
      <Axes px={px} py={py} x0={-0.8} x1={10.9} y1={0.27}
        xTicks={C.map((_, k) => [k, k])} yTicks={[[0.05, '0,05'], [0.1, '0,1'], [0.15, '0,15'], [0.2, '0,2'], [0.25, '0,25']]}
        xLabel="k" yLabel="P(X = k)" />
      {C.map((c, k) => (
        <rect key={k} x={px(k) - 8} y={py(c / 1024)} width="16" height={py(0) - py(c / 1024)}
          fill={ORANGE} fillOpacity="0.3" stroke={ORANGE} strokeWidth="1.4" />
      ))}
    </svg>
  )
}

// Равномерное распределение на [a; b]: вероятность попасть в участок [c; d] — площадь над ним
function UniformFigure() {
  const px = x => 40 + x * 26, py = v => 170 - v * 300
  const h = 0.3
  return (
    <svg className="math-svg" viewBox="0 0 340 200" role="img" aria-label="Плотность равномерного распределения на отрезке от a до b">
      <Axes px={px} py={py} x0={0} x1={11.3} y1={0.42}
        xTicks={[[1, 'a'], [4, 'c'], [7, 'd'], [10, 'b']]} yTicks={[[h, '1/(b−a)']]} xLabel="x" yLabel="f(x)" />
      <rect x={px(4)} y={py(h)} width={px(7) - px(4)} height={py(0) - py(h)} fill={ORANGE} fillOpacity="0.28" />
      <path d={`M${px(0)} ${py(0)} H${px(1)} V${py(h)} H${px(10)} V${py(0)} H${px(11)}`} fill="none" stroke={ORANGE} strokeWidth="2" />
      <g stroke="currentColor" strokeDasharray="3 3" opacity="0.5"><path d={`M${px(4)} ${py(0)} V${py(h)} M${px(7)} ${py(0)} V${py(h)}`} /></g>
      <text x={px(5.5)} y={py(h / 2) + 4} textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="currentColor">площадь</text>
    </svg>
  )
}

// Нормальное распределение: μ сдвигает «колокол», σ задаёт его ширину
function NormalParamsFigure() {
  const px = x => 40 + (x + 4) * 27, py = v => 182 - v * 360
  const curves = [
    { mu: 0, s: 1, color: ORANGE, label: 'μ = 0, σ = 1', lx: -2.7, ly: 0.33 },
    { mu: 0, s: 2, color: BLUE, label: 'μ = 0, σ = 2', lx: -3.2, ly: 0.14 },
    { mu: 3, s: 1, color: GREEN, label: 'μ = 3, σ = 1', lx: 4.4, ly: 0.36 },
  ]
  return (
    <svg className="math-svg" viewBox="0 0 340 214" role="img" aria-label="Три нормальных распределения с разными μ и σ">
      <Axes px={px} py={py} x0={-4} x1={7.7} y1={0.46}
        xTicks={[-4, -2, 0, 2, 4, 6].map(v => [v, String(v).replace('-', '−')])} yTicks={[[0.2, '0,2'], [0.4, '0,4']]} xLabel="x" yLabel="f(x)" />
      {curves.map(c => <path key={c.label} d={curvePath(x => normalPdf(x, c.mu, c.s), -4, 7.5, px, py)} fill="none" stroke={c.color} strokeWidth="2" />)}
      <g fontSize="11" fontFamily="Georgia, serif" fontStyle="italic">
        {curves.map(c => <text key={c.label} x={px(c.lx)} y={py(c.ly)} textAnchor="middle" fill={c.color}>{c.label}</text>)}
      </g>
    </svg>
  )
}

// Правило трёх сигм: доли значений в пределах μ ± σ, μ ± 2σ, μ ± 3σ
function ThreeSigmaFigure() {
  const px = x => 170 + x * 44, py = v => 168 - v * 330
  const f = x => normalPdf(x, 0, 1)
  const band = (k, opacity) => (
    <path d={`${curvePath(f, -k, k, px, py, 0.02)} L${px(k)} ${py(0)} L${px(-k)} ${py(0)} Z`} fill={ORANGE} fillOpacity={opacity} />
  )
  const arrow = (k, y, label) => (
    <g key={k}>
      <path d={`M${px(-k)} ${py(y)} H${px(k)}`} stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d={`M${px(-k)} ${py(y) - 4} V${py(y) + 4} M${px(k)} ${py(y) - 4} V${py(y) + 4}`} stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <text x={px(0)} y={py(y) - 4} textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="currentColor">{label}</text>
    </g>
  )
  return (
    <svg className="math-svg" viewBox="0 0 340 214" role="img" aria-label="Правило трёх сигм: 68%, 95% и 99,7% значений">
      {band(3, 0.12)}{band(2, 0.18)}{band(1, 0.28)}
      <path d={curvePath(f, -3.6, 3.6, px, py)} fill="none" stroke={ORANGE} strokeWidth="2" />
      <Axes px={px} py={py} x0={-3.7} x1={3.7} y1={0}
        xTicks={[[-3, 'μ−3σ'], [-2, 'μ−2σ'], [-1, 'μ−σ'], [0, 'μ'], [1, 'μ+σ'], [2, 'μ+2σ'], [3, 'μ+3σ']]} />
      {arrow(1, 0.13, '68%')}{arrow(2, 0.05, '95%')}{arrow(3, 0.47, '99,7%')}
    </svg>
  )
}

// Функция распределения: ступенчатая у дискретной величины, плавная у непрерывной
function CdfFigure() {
  const W = 150
  const panel = (dx, title, children) => (
    <g transform={`translate(${dx} 0)`}>
      <text x={W / 2 + 30} y="16" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="currentColor" opacity="0.8">{title}</text>
      {children}
    </g>
  )
  const dpx = x => 44 + x * 17, dpy = v => 176 - v * 140
  const steps = [[-0.5, 1, 0], [1, 3, 0.2], [3, 5, 0.7], [5, 6.4, 1]]
  const cpx = x => 50 + x * 22, cpy = v => 176 - v * 140
  return (
    <svg className="math-svg" viewBox="0 0 340 200" role="img" aria-label="Функция распределения дискретной и непрерывной величины">
      {panel(0, 'дискретная', (
        <>
          <Axes px={dpx} py={dpy} x0={-0.5} x1={6.5} y1={1.12}
            xTicks={[[1, '1'], [3, '3'], [5, '5']]} yTicks={[[0.2, '0,2'], [0.7, '0,7'], [1, '1']]} xLabel="x" />
          {steps.map(([a, b, v]) => <path key={a} d={`M${dpx(a)} ${dpy(v)} H${dpx(b)}`} stroke={ORANGE} strokeWidth="2" />)}
          {steps.slice(1).map(([a, , v], i) => (
            <g key={a}>
              <path d={`M${dpx(a)} ${dpy(steps[i][2])} V${dpy(v)}`} stroke={ORANGE} strokeWidth="1" strokeDasharray="3 3" />
              <circle cx={dpx(a)} cy={dpy(steps[i][2])} r="2.8" fill={ORANGE} />
              <circle cx={dpx(a)} cy={dpy(v)} r="2.8" fill="var(--bg-primary, #111)" stroke={ORANGE} strokeWidth="1.4" />
            </g>
          ))}
        </>
      ))}
      {panel(170, 'непрерывная', (
        <>
          <Axes px={cpx} py={cpy} x0={-0.5} x1={5} y1={1.12}
            xTicks={[[0, '0'], [2, '2'], [4, '4']]} yTicks={[[0.25, '0,25'], [1, '1']]} xLabel="x" />
          <path d={`M${cpx(-0.5)} ${cpy(0)} H${cpx(0)} ${curvePath(x => x * x / 16, 0, 4, cpx, cpy).replace('M', 'L')} H${cpx(4.9)}`}
            fill="none" stroke={BLUE} strokeWidth="2" />
        </>
      ))}
    </svg>
  )
}

// ── Рисунки к занятию 6: статистика ────────────────────────────────────────

// Скошенное распределение (гамма, k = 3): мода 2, медиана ≈ 2,67, среднее 3 — среднее сдвинуто в хвост
function SkewedFigure() {
  const px = x => 40 + x * 33, py = v => 170 - v * 330
  const f = x => (x * x * Math.exp(-x)) / 2
  const marks = [[2, 'мода', 20], [2.674, 'медиана', 6], [3, 'среднее', 20]]
  return (
    <svg className="math-svg" viewBox="0 0 340 200" role="img" aria-label="Скошенное распределение: мода, медиана и среднее">
      <path d={`${curvePath(f, 0, 9.4, px, py, 0.05)} L${px(9.4)} ${py(0)} L${px(0)} ${py(0)} Z`} fill={ORANGE} fillOpacity="0.16" />
      <path d={curvePath(f, 0, 9.4, px, py, 0.05)} fill="none" stroke={ORANGE} strokeWidth="2" />
      <Axes px={px} py={py} x0={0} x1={10} y1={0.3} xLabel="значение" />
      {marks.map(([x, label, dy], i) => (
        <g key={label}>
          <path d={`M${px(x)} ${py(0)} V${py(f(x))}`} stroke={[BLUE, GREEN, ORANGE][i]} strokeWidth="1.6" strokeDasharray="4 3" />
          <path d={`M${px(x)} ${py(f(x))} V${22 + (i === 1 ? 0 : 0)}`} stroke="currentColor" strokeWidth="0.8" opacity="0.35" />
          <text x={px(x) + (i === 0 ? -4 : i === 1 ? 4 : 14)} y={18 + (i === 1 ? 14 : 0)} textAnchor={i === 0 ? 'end' : 'start'}
            fontSize="11" fontFamily="Georgia, serif" fill={[BLUE, GREEN, ORANGE][i]}>{label}</text>
        </g>
      ))}
    </svg>
  )
}

// Диаграмма размаха: min, Q1, медиана, Q3, max и выброс; над коробкой отмечен IQR
function BoxplotFigure() {
  const px = v => 24 + v * 8.6
  const y0 = 96, h = 40
  const ticks = [[2, 'min'], [5, 'Q₁'], [9, 'Me'], [15, 'Q₃'], [20, 'max'], [32, 'выброс']]
  return (
    <svg className="math-svg" viewBox="0 0 340 180" role="img" aria-label="Диаграмма размаха с межквартильным размахом и выбросом">
      <g stroke="currentColor" strokeWidth="1.4" fill="none">
        <path d={`M${px(2)} ${y0 + h / 2} H${px(5)} M${px(15)} ${y0 + h / 2} H${px(20)}`} />
        <path d={`M${px(2)} ${y0 + 10} V${y0 + h - 10} M${px(20)} ${y0 + 10} V${y0 + h - 10}`} />
        <rect x={px(5)} y={y0} width={px(15) - px(5)} height={h} fill={ORANGE} fillOpacity="0.18" stroke={ORANGE} />
        <path d={`M${px(9)} ${y0} V${y0 + h}`} stroke={ORANGE} strokeWidth="2.6" />
      </g>
      <circle cx={px(32)} cy={y0 + h / 2} r="3.6" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1" fill="none" opacity="0.7">
        <path d={`M${px(5)} ${y0 - 18} H${px(15)} M${px(5)} ${y0 - 22} V${y0 - 14} M${px(15)} ${y0 - 22} V${y0 - 14}`} />
      </g>
      <text x={px(10)} y={y0 - 26} textAnchor="middle" fontSize="12" fontFamily="Georgia, serif" fill="currentColor">IQR</text>
      <path d={`M${px(0)} ${y0 + h + 22} H${px(37)}`} stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
      {ticks.map(([v, t]) => (
        <g key={t}>
          <path d={`M${px(v)} ${y0 + h + 19} V${y0 + h + 25}`} stroke="currentColor" strokeWidth="1.2" opacity="0.55" />
          <text x={px(v)} y={y0 + h + 40} textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="currentColor" opacity="0.8">{t}</text>
        </g>
      ))}
    </svg>
  )
}

// Четырнадцать доверительных интервалов вокруг истинного μ: один из них не накрывает его
function CiCoverageFigure() {
  const centers = [-0.3, 0.4, -0.5, 0.6, -0.8, 0.1, 1.4, 0.5, -0.6, 0.2, -0.1, 0.7, -0.9, 0.3]
  const half = 1
  const px = v => 170 + v * 52, y = i => 36 + i * 16
  return (
    <svg className="math-svg" viewBox="0 0 340 268" role="img" aria-label="Четырнадцать доверительных интервалов, один из них не накрывает истинное значение">
      <path d={`M${px(0)} 22 V${y(13) + 12}`} stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.7" />
      <text x={px(0)} y="14" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="currentColor">истинное μ</text>
      {centers.map((c, i) => {
        const miss = Math.abs(c) > half
        const col = miss ? '#F85149' : BLUE
        return (
          <g key={i} stroke={col} strokeWidth="1.8" fill="none">
            <path d={`M${px(c - half)} ${y(i)} H${px(c + half)} M${px(c - half)} ${y(i) - 4} V${y(i) + 4} M${px(c + half)} ${y(i) - 4} V${y(i) + 4}`} />
            <circle cx={px(c)} cy={y(i)} r="2.2" fill={col} stroke="none" />
          </g>
        )
      })}
      <text x={px(1.4 + half) + 8} y={y(6) + 4} fontSize="11" fontFamily="Georgia, serif" fill="#F85149">← не накрыл μ</text>
    </svg>
  )
}

const FIGURES = {
  binomial: BinomialFigure, uniform: UniformFigure, 'normal-params': NormalParamsFigure,
  'three-sigma': ThreeSigmaFigure, cdf: CdfFigure,
  skewed: SkewedFigure, boxplot: BoxplotFigure, 'ci-coverage': CiCoverageFigure,
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
      const Figure = FIGURES[block.kind]
      return (
        <figure key={i} className="math-figure">
          {block.kind === 'tangent' && <TangentFigure />}
          {(block.kind === 'vector' || block.kind === 'parallelogram') && <VectorGrid kind={block.kind} />}
          {block.kind === 'venn' && <VennFigure />}
          {Figure && <Figure />}
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
