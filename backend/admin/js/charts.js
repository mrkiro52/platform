'use strict'
// Графики дашборда — простой SVG без сторонних библиотек.
// Линейный и столбчатый графики перерисовываются при изменении ширины
// контейнера и показывают подсказку со значениями при наведении.

const Charts = (() => {
  const draws = new WeakMap()
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const draw = draws.get(entry.target)
      const w = Math.round(entry.contentRect.width)
      if (draw && w && w !== entry.target._w) {
        entry.target._w = w
        draw(w)
      }
    }
  })

  // Рисуем сразу по текущей ширине — наблюдатель нужен только для
  // последующих изменений. В фоновой вкладке он молчит до её показа.
  function mount(el, draw) {
    draws.set(el, draw)
    el._w = el.clientWidth
    if (el._w) draw(el._w)
    observer.observe(el)
  }

  // «Красивый» потолок оси: 1, 2, 5 × 10^k
  function niceMax(v) {
    if (v <= 4) return 4
    const pow = 10 ** Math.floor(Math.log10(v))
    for (const m of [1, 2, 2.5, 5, 10]) if (m * pow >= v) return m * pow
    return 10 * pow
  }

  const short = (n) => n >= 10000 ? `${Math.round(n / 1000)}k` : n >= 1000 ? `${(n / 1000).toFixed(1).replace('.0', '')}k` : String(n)

  function tooltipHtml(title, rows) {
    return `<div class="tt-title">${title}</div>${rows.map(r =>
      `<div class="tt-row"><span><i class="dot" style="background:${r.color}"></i>${r.name}</span><b>${r.value}</b></div>`).join('')}`
  }

  // Общая часть: оси, сетка, подписи дат и подсказка
  function frame(el, { labels, height, max, xLabel, band }) {
    const W = el._w
    const pad = { l: 34, r: 8, t: 10, b: 24 }
    const plotW = Math.max(10, W - pad.l - pad.r)
    const plotH = height - pad.t - pad.b
    const n = labels.length
    const top = niceMax(max)
    const y = (v) => pad.t + plotH - (v / top) * plotH
    const x = band
      ? (i) => pad.l + (i + 0.5) * (plotW / n)
      : (i) => pad.l + (n === 1 ? plotW / 2 : (i * plotW) / (n - 1))

    let grid = ''
    for (let k = 0; k <= 4; k++) {
      const v = (top / 4) * k
      grid += `<line class="grid-line" x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}" ${k === 0 ? '' : 'stroke-dasharray="3 4"'}/>`
      grid += `<text class="axis-label" x="${pad.l - 8}" y="${y(v) + 3.5}" text-anchor="end">${short(Math.round(v))}</text>`
    }
    const step = Math.max(1, Math.ceil(n / Math.max(2, Math.floor(plotW / 70))))
    for (let i = 0; i < n; i += step) {
      grid += `<text class="axis-label" x="${x(i)}" y="${height - 6}" text-anchor="middle">${xLabel(labels[i])}</text>`
    }
    return { W, pad, plotW, plotH, n, x, y, grid }
  }

  function attachHover(el, svgEl, { n, x, pad, plotW, height, onIndex }) {
    const tip = el.querySelector('.chart-tooltip')
    const guide = svgEl.querySelector('.hover-guide')
    const move = (e) => {
      const rect = svgEl.getBoundingClientRect()
      const px = e.clientX - rect.left
      let i = Math.round(((px - pad.l) / plotW) * (n - 1))
      if (guide.dataset.band) i = Math.floor(((px - pad.l) / plotW) * n)
      i = Math.max(0, Math.min(n - 1, i))
      const gx = x(i)
      guide.setAttribute('x1', gx)
      guide.setAttribute('x2', gx)
      guide.style.opacity = 1
      tip.innerHTML = onIndex(i)
      tip.classList.add('show')
      const tw = tip.offsetWidth
      const left = gx + 14 + tw > rect.width ? gx - 14 - tw : gx + 14
      tip.style.left = `${Math.max(0, left)}px`
      tip.style.top = `${Math.max(0, e.clientY - rect.top - 30)}px`
      svgEl.querySelectorAll('[data-dot]').forEach(dot => { dot.style.opacity = dot.dataset.dot == i ? 1 : 0 })
    }
    const leave = () => {
      tip.classList.remove('show')
      guide.style.opacity = 0
      svgEl.querySelectorAll('[data-dot]').forEach(dot => { dot.style.opacity = 0 })
    }
    svgEl.addEventListener('pointermove', move)
    svgEl.addEventListener('pointerleave', leave)
  }

  // Линейный график: series = [{ name, color, values, area }]
  let uid = 0
  function line(el, { labels, series, height = 220, xLabel = (l) => l, tipTitle = (l) => l, format = fmt }) {
    el.classList.add('chart')
    if (!el.id) el.id = `chart-${++uid}`
    mount(el, () => {
      const max = Math.max(1, ...series.flatMap(s => s.values))
      const f = frame(el, { labels, height, max, xLabel })
      const base = f.y(0)
      let paths = ''
      series.forEach((s, si) => {
        const pts = s.values.map((v, i) => [f.x(i), f.y(v)])
        const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
        if (s.area) {
          paths += `<defs><linearGradient id="g-${el.id}-${si}" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${s.color}" stop-opacity=".22"/><stop offset="1" stop-color="${s.color}" stop-opacity="0"/></linearGradient></defs>`
          paths += `<path d="${d} L${pts[pts.length - 1][0]} ${base} L${pts[0][0]} ${base} Z" fill="url(#g-${el.id}-${si})"/>`
        }
        paths += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" ${s.dashed ? 'stroke-dasharray="4 4"' : ''}/>`
        pts.forEach((p, i) => { paths += `<circle data-dot="${i}" cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${s.color}" stroke="var(--bg2)" stroke-width="2" style="opacity:0"/>` })
      })
      el.innerHTML = `
        <svg width="${f.W}" height="${height}" viewBox="0 0 ${f.W} ${height}" role="img">
          ${f.grid}
          <line class="hover-guide" x1="0" x2="0" y1="${f.pad.t}" y2="${base}" stroke="var(--border-strong)" stroke-width="1" style="opacity:0"/>
          ${paths}
        </svg>
        <div class="chart-tooltip"></div>`
      attachHover(el, el.querySelector('svg'), {
        ...f, height,
        onIndex: (i) => tooltipHtml(tipTitle(labels[i]), series.map(s => ({ name: s.name, color: s.color, value: format(s.values[i]) }))),
      })
    })
  }

  // Столбцы, при нескольких рядах — стопкой
  function bars(el, { labels, series, height = 200, xLabel = (l) => l, tipTitle = (l) => l, format = fmt }) {
    el.classList.add('chart')
    mount(el, () => {
      const totals = labels.map((_, i) => series.reduce((s, r) => s + (r.values[i] || 0), 0))
      const max = Math.max(1, ...totals)
      const f = frame(el, { labels, height, max, xLabel, band: true })
      const bandW = f.plotW / f.n
      const bw = Math.max(2, Math.min(28, bandW * 0.62))
      let rects = ''
      labels.forEach((_, i) => {
        let acc = 0
        series.forEach((s, si) => {
          const v = s.values[i] || 0
          if (!v) return
          const y1 = f.y(acc + v)
          const h = f.y(acc) - y1
          const isTop = si === series.length - 1 || series.slice(si + 1).every(r => !(r.values[i] || 0))
          rects += `<rect x="${(f.x(i) - bw / 2).toFixed(1)}" y="${y1.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(1, h).toFixed(1)}" rx="${isTop ? 3 : 0}" fill="${s.color}"/>`
          acc += v
        })
      })
      el.innerHTML = `
        <svg width="${f.W}" height="${height}" viewBox="0 0 ${f.W} ${height}" role="img">
          ${f.grid}
          <line class="hover-guide" data-band="1" x1="0" x2="0" y1="${f.pad.t}" y2="${f.y(0)}" stroke="rgba(255,255,255,.06)" stroke-width="${bandW}" style="opacity:0"/>
          ${rects}
        </svg>
        <div class="chart-tooltip"></div>`
      attachHover(el, el.querySelector('svg'), {
        ...f, height,
        onIndex: (i) => tooltipHtml(tipTitle(labels[i]), series.map(s => ({ name: s.name, color: s.color, value: format(s.values[i] || 0) }))),
      })
    })
  }

  // Мини-график для карточек — без осей и подсказок
  function spark(values, { color = 'var(--lime)', width = 120, height = 28 } = {}) {
    if (!values.length || values.every(v => !v)) {
      return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true"><line x1="0" x2="${width}" y1="${height - 2}" y2="${height - 2}" stroke="var(--border)" stroke-width="1.5"/></svg>`
    }
    const max = Math.max(...values, 1)
    const pts = values.map((v, i) => [values.length === 1 ? width / 2 : (i * width) / (values.length - 1), height - 2 - (v / max) * (height - 4)])
    const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
    return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
      <path d="${d} L${width} ${height} L0 ${height} Z" fill="${color}" opacity=".12"/>
      <path d="${d}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>
    </svg>`
  }

  // Тепловая карта активности: matrix[7][24], неделя с понедельника
  function heatmap(matrix) {
    const max = Math.max(1, ...matrix.flat())
    const days = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
    let html = '<div class="heat"><span></span>'
    for (let h = 0; h < 24; h++) html += `<span class="heat-hour">${h % 3 === 0 ? h : ''}</span>`
    matrix.forEach((row, d) => {
      html += `<span class="heat-day">${days[d]}</span>`
      row.forEach((v, h) => {
        const a = v ? 0.12 + 0.88 * (v / max) : 0
        html += `<span class="heat-cell" style="${v ? `background:rgba(255,214,10,${a.toFixed(2)})` : ''}" title="${days[d]}, ${String(h).padStart(2, '0')}:00–${String(h + 1).padStart(2, '0')}:00 — ${fmt(v)} ${plural(v, 'просмотр', 'просмотра', 'просмотров')}"></span>`
      })
    })
    html += '</div><div class="heat-scale">меньше'
    for (const a of [0.12, 0.34, 0.56, 0.78, 1]) html += `<span style="background:rgba(255,214,10,${a})"></span>`
    return html + 'больше · время московское</div>'
  }

  // Горизонтальные полосы: [{ label, value, sub, color, title }]
  function hbars(items, { max = null, valueFmt = fmt } = {}) {
    const top = max || Math.max(1, ...items.map(i => i.value))
    return `<div class="hbars">${items.map(i => `
      <div class="hbar-row" ${i.title ? `title="${esc(i.title)}"` : ''}>
        <span class="hbar-label">${i.label}</span>
        <span class="hbar-track"><span class="hbar-fill" style="width:${Math.max(0.5, (i.value / top) * 100).toFixed(1)}%;${i.color ? `background:${i.color}` : ''}"></span></span>
        <span class="hbar-value">${valueFmt(i.value)}${i.sub ? `<small>${i.sub}</small>` : ''}</span>
      </div>`).join('')}</div>`
  }

  return { line, bars, spark, heatmap, hbars }
})()
