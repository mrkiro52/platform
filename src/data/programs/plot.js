// Векторные графики для конспектов: описание графика → строка SVG.
// Без зависимостей — модуль грузит и платформа (ProgramBlocks), и админка (blob-импорт).
//
// Блок главы: { t: 'plot', caption, height?, x: { min, max, label, ticks?, step? }, y: { … },
//   series: [ … ], legend? }
// Серии:
//   { type: 'line', points: [[x, y], …], color, width?, dash?, label? }
//   { type: 'area', points, color, opacity? }            — заливка от кривой до нуля
//   { type: 'bars', points, barWidth?, color, label? }    — столбцы (barWidth в единицах x)
//   { type: 'scatter', points, color, r?, hollow? }        — hollow: кружок с обводкой (вершины графа)
//   { type: 'vline', x, color?, dash?, label? }           — вертикальная линия с подписью сверху
//   { type: 'hline', y, color?, dash? }
//   { type: 'text', x, y, text, color?, anchor?, dy?, size? } — dy: сдвиг вниз в пикселях, size: кегль
//   { type: 'box', y, stats: [min, q1, median, q3, max], outliers?, color, height? } — горизонтальный ящик с усами
//   { type: 'interval', y, from, to, point?, color }      — горизонтальный отрезок (доверительный интервал)
//   { type: 'arrow', from: [x, y], to: [x, y], color, label?, dx?, dy? } — вектор со стрелкой и подписью у конца
// Параметры графика: equal: true — одинаковый масштаб по осям (высота считается сама, нужна для векторов),
// axes: false — без сетки, осей и подписей (схемы графов: вершины — scatter, рёбра — line, имена — text).
// Цвет — имя из палитры ниже или любой CSS-цвет.

export const PLOT_COLORS = {
  orange: '#FF8C42',
  blue: '#58A6FF',
  green: '#3FB950',
  red: '#F85149',
  yellow: '#E3B341',
  purple: '#BC8CFF',
  gray: '#8B949E',
}

const W = 640
const PAD = { left: 56, right: 18, top: 22, bottom: 46 }

function color(c) { return PLOT_COLORS[c] || c || PLOT_COLORS.orange }

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// «Красивый» шаг сетки: 1, 2 или 5 × 10^k
function niceStep(span, count = 6) {
  const raw = span / count
  const pow = 10 ** Math.floor(Math.log10(raw))
  const f = raw / pow
  return (f < 1.5 ? 1 : f < 3 ? 2 : f < 7 ? 5 : 10) * pow
}

function ticksOf(axis) {
  if (axis.ticks) return axis.ticks
  const step = axis.step || niceStep(axis.max - axis.min)
  const out = []
  for (let v = Math.ceil(axis.min / step - 1e-9) * step; v <= axis.max + step * 1e-9; v += step) out.push(+v.toFixed(10))
  return out
}

// Числа по-русски: десятичная запятая, тонкий пробел между разрядами
export function fmtNum(v) {
  if (Math.abs(v) >= 10000) return Math.round(v).toLocaleString('ru-RU').replace(/ /g, ' ')
  const s = Number.isInteger(v) ? String(v) : String(+v.toFixed(4))
  return s.replace('.', ',').replace('-', '−')
}

export function plotSvg(spec) {
  const x = spec.x, y = spec.y
  const iw = W - PAD.left - PAD.right
  const H = spec.equal ? Math.round(PAD.top + PAD.bottom + iw * (y.max - y.min) / (x.max - x.min)) : (spec.height || 280)
  const ih = H - PAD.top - PAD.bottom
  const sx = v => PAD.left + ((v - x.min) / (x.max - x.min)) * iw
  const sy = v => PAD.top + ih - ((v - y.min) / (y.max - y.min)) * ih
  const fx = x.format || fmtNum
  const fy = y.format || fmtNum
  const parts = []

  // Сетка и подписи осей
  const axes = spec.axes !== false
  // При равном масштабе шаг сетки по y такой же, как по x — иначе клетки не квадратные
  const yAxis = spec.equal && !y.step && !y.ticks ? { ...y, step: x.step || niceStep(x.max - x.min) } : y
  const xt = axes ? ticksOf(x) : [], yt = axes && !y.hideTicks ? ticksOf(yAxis) : []
  parts.push('<g class="plot-grid">')
  for (const v of yt) parts.push(`<line x1="${PAD.left}" x2="${PAD.left + iw}" y1="${sy(v)}" y2="${sy(v)}"/>`)
  for (const v of xt) parts.push(`<line x1="${sx(v)}" x2="${sx(v)}" y1="${PAD.top}" y2="${PAD.top + ih}"/>`)
  parts.push('</g>')
  // Оси проходят через ноль, если он виден на графике (для векторов), иначе — по краю
  const ax0 = spec.equal && x.min < 0 && x.max > 0 ? sx(0) : PAD.left
  const ay0 = spec.equal && y.min < 0 && y.max > 0 ? sy(0) : PAD.top + ih
  parts.push('<g class="plot-axis">')
  if (axes) parts.push(`<line x1="${PAD.left}" x2="${PAD.left + iw}" y1="${ay0}" y2="${ay0}"/>`)
  if (axes && !y.hideAxis) parts.push(`<line x1="${ax0}" x2="${ax0}" y1="${PAD.top}" y2="${PAD.top + ih}"/>`)
  parts.push('</g><g class="plot-ticks">')
  for (const v of xt) parts.push(`<text x="${sx(v)}" y="${PAD.top + ih + 16}" text-anchor="middle">${esc(fx(v))}</text>`)
  for (const v of yt) parts.push(`<text x="${PAD.left - 7}" y="${sy(v) + 4}" text-anchor="end">${esc(fy(v))}</text>`)
  parts.push('</g>')
  if (x.label) parts.push(`<text class="plot-label" x="${PAD.left + iw / 2}" y="${H - 8}" text-anchor="middle">${esc(x.label)}</text>`)
  if (y.label) parts.push(`<text class="plot-label" transform="translate(13 ${PAD.top + ih / 2}) rotate(-90)" text-anchor="middle">${esc(y.label)}</text>`)

  const path = pts => pts.map(([a, b], i) => `${i ? 'L' : 'M'}${sx(a).toFixed(1)} ${sy(b).toFixed(1)}`).join('')
  const legend = []

  for (const s of spec.series) {
    const c = color(s.color)
    switch (s.type) {
      case 'area': {
        const pts = s.points
        const base = Math.max(y.min, 0)
        parts.push(`<path d="${path(pts)}L${sx(pts[pts.length - 1][0]).toFixed(1)} ${sy(base)}L${sx(pts[0][0]).toFixed(1)} ${sy(base)}Z" fill="${c}" fill-opacity="${s.opacity ?? 0.22}" stroke="none"/>`)
        break
      }
      case 'line':
        parts.push(`<path d="${path(s.points)}" fill="none" stroke="${c}" stroke-width="${s.width || 2.2}"${s.dash ? ` stroke-dasharray="${s.dash === true ? '6 5' : s.dash}"` : ''} stroke-linejoin="round" stroke-linecap="round"/>`)
        break
      case 'bars': {
        const bw = Math.max(2, (s.barWidth ?? 0.7) * (iw / (x.max - x.min)))
        const base = Math.max(y.min, 0)
        for (const [a, b] of s.points) {
          const top = Math.min(sy(b), sy(base)), h = Math.abs(sy(base) - sy(b))
          parts.push(`<rect x="${(sx(a) - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2" fill="${c}" fill-opacity="${s.opacity ?? 0.85}"/>`)
        }
        break
      }
      case 'scatter':
        for (const [a, b] of s.points) {
          parts.push(s.hollow
            ? `<circle cx="${sx(a).toFixed(1)}" cy="${sy(b).toFixed(1)}" r="${s.r || 4}" fill="var(--bg-tertiary, #16161a)" stroke="${c}" stroke-width="2"/>`
            : `<circle cx="${sx(a).toFixed(1)}" cy="${sy(b).toFixed(1)}" r="${s.r || 4}" fill="${c}" fill-opacity="0.85"/>`)
        }
        break
      case 'vline':
        parts.push(`<line x1="${sx(s.x)}" x2="${sx(s.x)}" y1="${PAD.top}" y2="${PAD.top + ih}" stroke="${c}" stroke-width="1.6"${s.dash === false ? '' : ' stroke-dasharray="5 4"'}/>`)
        if (s.label) parts.push(`<text class="plot-note" x="${sx(s.x) + (s.anchor === 'end' ? -5 : 5)}" y="${PAD.top + 12 + (s.dy || 0)}" text-anchor="${s.anchor || 'start'}" fill="${c}">${esc(s.label)}</text>`)
        break
      case 'hline':
        parts.push(`<line x1="${PAD.left}" x2="${PAD.left + iw}" y1="${sy(s.y)}" y2="${sy(s.y)}" stroke="${c}" stroke-width="1.4"${s.dash === false ? '' : ' stroke-dasharray="5 4"'}/>`)
        break
      case 'text':
        parts.push(`<text class="plot-note" x="${sx(s.x)}" y="${sy(s.y) + (s.dy || 0)}" text-anchor="${s.anchor || 'middle'}" fill="${s.color ? c : 'currentColor'}"${s.size ? ` style="font-size:${s.size}px;font-weight:700"` : ''}>${esc(s.text)}</text>`)
        break
      case 'box': {
        const [mn, q1, med, q3, mx] = s.stats
        const cy = sy(s.y), hh = (s.height || 30) / 2
        parts.push(`<g stroke="${c}" stroke-width="1.8" fill="none">`)
        parts.push(`<line x1="${sx(mn)}" x2="${sx(q1)}" y1="${cy}" y2="${cy}"/><line x1="${sx(q3)}" x2="${sx(mx)}" y1="${cy}" y2="${cy}"/>`)
        parts.push(`<line x1="${sx(mn)}" x2="${sx(mn)}" y1="${cy - hh / 2}" y2="${cy + hh / 2}"/><line x1="${sx(mx)}" x2="${sx(mx)}" y1="${cy - hh / 2}" y2="${cy + hh / 2}"/>`)
        parts.push(`<rect x="${sx(q1)}" y="${cy - hh}" width="${sx(q3) - sx(q1)}" height="${hh * 2}" rx="3" fill="${c}" fill-opacity="0.18"/>`)
        parts.push(`<line x1="${sx(med)}" x2="${sx(med)}" y1="${cy - hh}" y2="${cy + hh}" stroke-width="2.6"/>`)
        parts.push('</g>')
        for (const o of s.outliers || []) parts.push(`<circle cx="${sx(o)}" cy="${cy}" r="4.5" fill="none" stroke="${PLOT_COLORS.red}" stroke-width="2"/>`)
        break
      }
      case 'arrow': {
        const [x1, y1] = s.from || [0, 0], [x2, y2] = s.to
        const X1 = sx(x1), Y1 = sy(y1), X2 = sx(x2), Y2 = sy(y2)
        const a = Math.atan2(Y2 - Y1, X2 - X1), k = 11
        const head = [[X2, Y2], [X2 - k * Math.cos(a - 0.4), Y2 - k * Math.sin(a - 0.4)], [X2 - k * Math.cos(a + 0.4), Y2 - k * Math.sin(a + 0.4)]]
        parts.push(`<line x1="${X1.toFixed(1)}" y1="${Y1.toFixed(1)}" x2="${(X2 - 7 * Math.cos(a)).toFixed(1)}" y2="${(Y2 - 7 * Math.sin(a)).toFixed(1)}" stroke="${c}" stroke-width="${s.width || 2.4}"${s.dash ? ` stroke-dasharray="${s.dash === true ? '6 5' : s.dash}"` : ''} stroke-linecap="round"/>`)
        parts.push(`<polygon points="${head.map(([u, v]) => `${u.toFixed(1)},${v.toFixed(1)}`).join(' ')}" fill="${c}"/>`)
        if (s.label) parts.push(`<text class="plot-note" x="${(X2 + (s.dx ?? 8)).toFixed(1)}" y="${(Y2 + (s.dy ?? -8)).toFixed(1)}" fill="${c}">${esc(s.label)}</text>`)
        break
      }
      case 'interval': {
        const cy = sy(s.y)
        parts.push(`<g stroke="${c}" stroke-width="2"><line x1="${sx(s.from)}" x2="${sx(s.to)}" y1="${cy}" y2="${cy}"/><line x1="${sx(s.from)}" x2="${sx(s.from)}" y1="${cy - 4}" y2="${cy + 4}"/><line x1="${sx(s.to)}" x2="${sx(s.to)}" y1="${cy - 4}" y2="${cy + 4}"/></g>`)
        if (s.point !== undefined) parts.push(`<circle cx="${sx(s.point)}" cy="${cy}" r="3.2" fill="${c}"/>`)
        break
      }
      default:
        break
    }
    if (s.label && s.type !== 'vline' && s.type !== 'arrow') legend.push([c, s.label, s.dash])
  }

  // Легенда — в правом верхнем углу области графика
  if (legend.length && spec.legend !== false) {
    const lx = spec.legendLeft ? PAD.left + 10 : PAD.left + iw - 10
    const anchor = spec.legendLeft ? 'start' : 'end'
    legend.forEach(([c, label, dash], i) => {
      const ly = PAD.top + 10 + i * 18
      const lineX = spec.legendLeft ? lx : lx - 26
      parts.push(`<line x1="${lineX}" x2="${lineX + 20}" y1="${ly - 4}" y2="${ly - 4}" stroke="${c}" stroke-width="3"${dash ? ' stroke-dasharray="5 4"' : ''}/>`)
      parts.push(`<text class="plot-legend" x="${spec.legendLeft ? lx + 26 : lx - 32}" y="${ly}" text-anchor="${anchor}">${esc(label)}</text>`)
    })
  }

  return `<svg class="plot-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(spec.caption || 'график')}" xmlns="http://www.w3.org/2000/svg">${parts.join('')}</svg>`
}
