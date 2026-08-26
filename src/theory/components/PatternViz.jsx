import { useState, useEffect, useRef } from 'react'

/* ── общие стили ── */
const C = {
  box: (bg = 'var(--bg-tertiary)', border = 'var(--border-color)', color = 'var(--text-primary)') => ({
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    minWidth: 36, height: 36, padding: '0 8px',
    background: bg, color,
    borderWidth: 1, borderStyle: 'solid', borderColor: border,
    borderRadius: 7, fontSize: 13, fontWeight: 700, fontFamily: 'monospace',
  }),
  wrap: {
    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: 12, padding: '18px 20px', margin: '14px 0',
  },
  row: { display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' },
  label: { fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'monospace' },
  caption: { fontSize: 12, color: 'var(--text-secondary)', marginTop: 10 },
}
const LIME = 'var(--accent-lime)'
const btnStyle = {
  background: LIME, color: '#0a0a14', borderWidth: 1, borderStyle: 'solid', borderColor: LIME,
  borderRadius: 7, padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
}
const secBtn = {
  background: 'var(--bg-tertiary)', color: 'var(--text-secondary)',
  borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-color)',
  borderRadius: 7, padding: '5px 12px', fontSize: 12, fontWeight: 600, cursor: 'pointer',
}

/* ─────────────────────────────────────────────
   1. PREFIX SUM
   ─────────────────────────────────────────── */
export function PrefixSumViz() {
  const nums = [1, 2, 3, 4, 5, 6]
  const prefix = nums.reduce((acc, v, i) => { acc.push((acc[i - 1] || 0) + v); return acc }, [])
  const [lo, setLo] = useState(1); const [hi, setHi] = useState(3)
  const sum = prefix[hi] - (lo > 0 ? prefix[lo - 1] : 0)
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 10 }}>
        {nums.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={C.label}>{i}</span>
            <div style={C.box(i >= lo && i <= hi ? 'rgba(255,214,10,0.18)' : 'var(--bg-tertiary)', i >= lo && i <= hi ? LIME : 'var(--border-color)', i >= lo && i <= hi ? LIME : 'var(--text-primary)')}>{v}</div>
          </div>
        ))}
        <span style={{ color: 'var(--text-tertiary)', fontSize: 18 }}>→</span>
        <div style={C.box('rgba(63,185,80,0.15)', '#3fb950', '#3fb950')}>{sum}</div>
      </div>
      <div style={{ ...C.row, marginBottom: 10 }}>
        <span style={{ ...C.label, marginRight: 4 }}>Prefix P:</span>
        {prefix.map((v, i) => (
          <div key={i} style={C.box(i === hi || (lo > 0 && i === lo - 1) ? 'rgba(248,81,73,0.15)' : 'var(--bg-tertiary)', i === hi || (lo > 0 && i === lo - 1) ? '#f85149' : 'var(--border-color)', i === hi || (lo > 0 && i === lo - 1) ? '#f85149' : 'var(--text-secondary)')}>{v}</div>
        ))}
      </div>
      <div style={{ ...C.row, gap: 14 }}>
        <label style={C.label}>i: <input type="range" min="0" max="5" value={lo} onChange={e => setLo(Math.min(+e.target.value, hi))} style={{ width: 80 }} /></label>
        <label style={C.label}>j: <input type="range" min="0" max="5" value={hi} onChange={e => setHi(Math.max(+e.target.value, lo))} style={{ width: 80 }} /></label>
        <span style={{ fontSize: 12, color: LIME, fontFamily: 'monospace' }}>sum[{lo}..{hi}] = P[{hi}]{lo > 0 ? ` − P[${lo - 1}]` : ''} = {sum}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   2. TWO POINTERS
   ─────────────────────────────────────────── */
export function TwoPointersViz() {
  const arr = [1, 2, 3, 4, 6]; const target = 6
  const [step, setStep] = useState(0)
  const steps = []
  let l = 0, r = arr.length - 1
  while (l < r) {
    const s = arr[l] + arr[r]
    steps.push({ l, r, s, status: s === target ? 'found' : s < target ? 'small' : 'big' })
    if (s === target) break
    else if (s < target) l++; else r--
  }
  const cur = steps[Math.min(step, steps.length - 1)]
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 14 }}>
        {arr.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ ...C.label, color: i === cur.l ? '#58a6ff' : i === cur.r ? '#f85149' : 'transparent' }}>
              {i === cur.l ? 'L' : i === cur.r ? 'R' : '.'}
            </span>
            <div style={C.box(
              cur.status === 'found' && (i === cur.l || i === cur.r) ? 'rgba(63,185,80,0.2)' :
              i === cur.l ? 'rgba(88,166,255,0.15)' : i === cur.r ? 'rgba(248,81,73,0.15)' : 'var(--bg-tertiary)',
              i === cur.l ? '#58a6ff' : i === cur.r ? '#f85149' : 'var(--border-color)',
              i === cur.l ? '#58a6ff' : i === cur.r ? '#f85149' : 'var(--text-primary)'
            )}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
        {cur.status === 'found' ? `✓ ${arr[cur.l]} + ${arr[cur.r]} = ${target} — нашли!` :
         cur.status === 'small' ? `${arr[cur.l]} + ${arr[cur.r]} = ${cur.s} < ${target} → двигаем L вправо` :
         `${arr[cur.l]} + ${arr[cur.r]} = ${cur.s} > ${target} → двигаем R влево`}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩ Сначала</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>›</button>
        <span style={C.label}>Шаг {Math.min(step, steps.length - 1) + 1} из {steps.length}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   3. SLIDING WINDOW
   ─────────────────────────────────────────── */
export function SlidingWindowViz() {
  const arr = [2, 1, 5, 1, 3, 2]; const k = 3
  const [winStart, setWinStart] = useState(0)
  const maxWin = arr.length - k
  const winSum = arr.slice(winStart, winStart + k).reduce((a, b) => a + b, 0)
  const allSums = Array.from({ length: maxWin + 1 }, (_, i) => arr.slice(i, i + k).reduce((a, b) => a + b, 0))
  const maxSum = Math.max(...allSums)
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 14 }}>
        {arr.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={C.label}>{i}</span>
            <div style={C.box(
              i >= winStart && i < winStart + k ? 'rgba(255,214,10,0.18)' : 'var(--bg-tertiary)',
              i >= winStart && i < winStart + k ? LIME : 'var(--border-color)',
              i >= winStart && i < winStart + k ? LIME : 'var(--text-primary)'
            )}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 10, fontFamily: 'monospace', fontSize: 12, color: 'var(--text-secondary)' }}>
        Окно [{winStart}..{winStart + k - 1}] → сумма = <span style={{ color: winSum === maxSum ? '#3fb950' : LIME, fontWeight: 700 }}>{winSum}</span>
        {winSum === maxSum ? '  ← максимум ✓' : ''}
      </div>
      <input type="range" min="0" max={maxWin} value={winStart} onChange={e => setWinStart(+e.target.value)} style={{ width: '100%', marginBottom: 8 }} />
      <div style={{ ...C.row, gap: 6 }}>
        {allSums.map((s, i) => (
          <div key={i} style={C.box(
            i === winStart ? 'rgba(255,214,10,0.18)' : s === maxSum ? 'rgba(63,185,80,0.12)' : 'var(--bg-primary)',
            i === winStart ? LIME : s === maxSum ? '#3fb950' : 'var(--border-color)',
            i === winStart ? LIME : s === maxSum ? '#3fb950' : 'var(--text-tertiary)'
          )}>{s}</div>
        ))}
        <span style={C.label}>суммы окон</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   4. FAST & SLOW POINTERS
   ─────────────────────────────────────────── */
export function FastSlowViz() {
  const nodes = [1, 3, 5, 2, 4]; const cycleBack = 2 // индекс куда зацикливается
  const [t, setT] = useState(0)
  const maxSteps = 8
  const getPos = (step) => {
    let s = 0, f = 0
    for (let i = 0; i < step; i++) {
      s = s + 1 >= nodes.length ? cycleBack : s + 1
      f = f + 1 >= nodes.length ? cycleBack : f + 1
      f = f + 1 >= nodes.length ? cycleBack : f + 1
    }
    return { s, f, meet: s === f }
  }
  const { s, f, meet } = getPos(t)
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 8 }}>
        {nodes.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ ...C.label, height: 14 }}>
              {i === s && i === f ? '⟳' : i === s ? '🐢' : i === f ? '🐇' : ''}
            </div>
            <div style={C.box(
              i === s && i === f ? 'rgba(210,153,34,0.3)' :
              i === s ? 'rgba(88,166,255,0.15)' : i === f ? 'rgba(248,81,73,0.15)' : 'var(--bg-tertiary)',
              i === s && i === f ? '#d29922' : i === s ? '#58a6ff' : i === f ? '#f85149' : 'var(--border-color)',
            )}>{v}</div>
            {i < nodes.length - 1 && <span style={{ ...C.label, position: 'absolute', marginLeft: 52 }}>→</span>}
          </div>
        ))}
        <span style={{ ...C.label, fontSize: 12 }}>↩ к [{cycleBack}]</span>
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
        {meet ? `🐢 и 🐇 встретились на узле ${s} → цикл есть!` : `🐢 на [${s}], 🐇 на [${f}]`}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setT(0)}>↩</button>
        <button style={secBtn} onClick={() => setT(t => Math.max(0, t - 1))}>‹</button>
        <button style={secBtn} onClick={() => setT(t => Math.min(maxSteps, t + 1))}>›</button>
        <span style={C.label}>Шаг {t}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   5. IN-PLACE REVERSAL
   ─────────────────────────────────────────── */
export function InPlaceReversalViz() {
  const orig = [1, 2, 3, 4, 5]; const m = 1, n = 3
  const [done, setDone] = useState(false)
  const arr = done ? [1, 4, 3, 2, 5] : orig
  return (
    <div style={C.wrap}>
      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
        {done ? 'После разворота [m=1..n=3]' : 'До разворота'}
      </div>
      <div style={{ ...C.row, marginBottom: 14 }}>
        {arr.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={C.label}>{i}</span>
            <div style={C.box(
              i >= m && i <= n ? (done ? 'rgba(63,185,80,0.15)' : 'rgba(255,214,10,0.15)') : 'var(--bg-tertiary)',
              i >= m && i <= n ? (done ? '#3fb950' : LIME) : 'var(--border-color)',
              i >= m && i <= n ? (done ? '#3fb950' : LIME) : 'var(--text-primary)'
            )}>{v}</div>
          </div>
        ))}
      </div>
      {done && (
        <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontFamily: 'monospace', marginBottom: 10 }}>
          prev → узлы [1→4→3→2] перевёрнуты → next
        </div>
      )}
      <button style={done ? secBtn : btnStyle} onClick={() => setDone(d => !d)}>
        {done ? '↩ Показать до' : '▶ Развернуть [1..3]'}
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   6. MONOTONIC STACK
   ─────────────────────────────────────────── */
export function MonotonicStackViz() {
  const arr = [2, 1, 2, 4, 3]
  const [step, setStep] = useState(0)
  const steps = []
  const stk = []; const res = Array(arr.length).fill(-1)
  for (let i = 0; i < arr.length; i++) {
    while (stk.length && arr[stk[stk.length - 1]] < arr[i]) {
      const idx = stk.pop(); res[idx] = arr[i]
      steps.push({ current: i, stack: [...stk], result: [...res], note: `${arr[idx]} < ${arr[i]} → следующий больший для [${idx}] = ${arr[i]}` })
    }
    stk.push(i)
    steps.push({ current: i, stack: [...stk], result: [...res], note: `Кладём [${i}]=${arr[i]} в стек` })
  }
  steps.push({ current: -1, stack: [], result: [...res], note: 'Готово — оставшиеся в стеке → -1' })
  const cur = steps[Math.min(step, steps.length - 1)]
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 8 }}>
        {arr.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={C.box(
              i === cur.current ? 'rgba(255,214,10,0.18)' : cur.stack.includes(i) ? 'rgba(88,166,255,0.12)' : 'var(--bg-tertiary)',
              i === cur.current ? LIME : cur.stack.includes(i) ? '#58a6ff' : 'var(--border-color)',
            )}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>
        Стек: [{cur.stack.map(i => arr[i]).join(', ')}]
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>
        Результат: [{cur.result.join(', ')}]
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace', minHeight: 20 }}>
        {cur.note}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>›</button>
        <span style={C.label}>Шаг {Math.min(step, steps.length - 1) + 1}/{steps.length}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   7. TOP K ELEMENTS (min-heap)
   ─────────────────────────────────────────── */
export function TopKViz() {
  const arr = [3, 2, 1, 5, 6, 4]; const k = 2
  const [step, setStep] = useState(0)
  const steps = []
  const heap = []
  const push = (v) => { heap.push(v); heap.sort((a, b) => a - b) }
  const pop = () => heap.shift()
  for (const v of arr) {
    push(v)
    if (heap.length > k) { const removed = pop(); steps.push({ heap: [...heap], note: `Добавили ${v}, убираем минимум ${removed}` }) }
    else steps.push({ heap: [...heap], note: `Добавили ${v} в кучу` })
  }
  steps.push({ heap: [...heap], note: `K-й наибольший = корень кучи = ${heap[0]}` })
  const cur = steps[Math.min(step, steps.length - 1)]
  return (
    <div style={C.wrap}>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 8 }}>
        Массив: [{arr.join(', ')}]  k={k}
      </div>
      <div style={{ ...C.row, marginBottom: 10 }}>
        <span style={{ ...C.label, marginRight: 4 }}>Min-heap (размер k):</span>
        {cur.heap.map((v, i) => (
          <div key={i} style={C.box(i === 0 ? 'rgba(248,81,73,0.15)' : 'rgba(255,214,10,0.1)', i === 0 ? '#f85149' : LIME, i === 0 ? '#f85149' : LIME)}>
            {v}
          </div>
        ))}
        {cur.heap.length === 0 && <span style={C.label}>пусто</span>}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>{cur.note}</div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>›</button>
        <span style={C.label}>Шаг {Math.min(step, steps.length - 1) + 1}/{steps.length}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   8. OVERLAPPING INTERVALS
   ─────────────────────────────────────────── */
export function OverlappingIntervalsViz() {
  const intervals = [[1,3],[2,6],[8,10],[15,18]]
  const [done, setDone] = useState(false)
  const merged = [[1,6],[8,10],[15,18]]
  const toShow = done ? merged : intervals
  const maxV = 19
  const colors = ['#58a6ff','#d29922','#3fb950','#f85149','#a371f7']
  return (
    <div style={C.wrap}>
      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
        {done ? 'После слияния:' : 'Исходные интервалы:'}
      </div>
      <div style={{ position: 'relative', height: toShow.length * 28 + 12, marginBottom: 14 }}>
        {toShow.map(([a, b], i) => (
          <div key={i} style={{
            position: 'absolute', top: i * 28 + 4,
            left: `${(a / maxV) * 100}%`, width: `${((b - a) / maxV) * 100}%`,
            height: 22, background: colors[i % colors.length] + '33',
            borderWidth: 2, borderStyle: 'solid', borderColor: colors[i % colors.length],
            borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: colors[i % colors.length], fontFamily: 'monospace', fontWeight: 700,
          }}>[{a},{b}]</div>
        ))}
      </div>
      <button style={done ? secBtn : btnStyle} onClick={() => setDone(d => !d)}>
        {done ? '↩ Показать до' : '▶ Слить интервалы'}
      </button>
    </div>
  )
}

/* ─────────────────────────────────────────────
   9. BINARY SEARCH
   ─────────────────────────────────────────── */
export function BinarySearchViz() {
  const arr = [4,5,6,7,0,1,2]; const target = 0
  const [step, setStep] = useState(0)
  const steps = []
  let lo = 0, hi = arr.length - 1
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    steps.push({ lo, hi, mid, found: arr[mid] === target })
    if (arr[mid] === target) break
    else if (arr[mid] >= arr[lo]) {
      if (target >= arr[lo] && target < arr[mid]) hi = mid - 1
      else lo = mid + 1
    } else {
      if (target > arr[mid] && target <= arr[hi]) lo = mid + 1
      else hi = mid - 1
    }
  }
  const cur = steps[Math.min(step, steps.length - 1)]
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 14 }}>
        {arr.map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={{ ...C.label, color: i === cur.mid ? LIME : 'transparent' }}>mid</span>
            <div style={C.box(
              cur.found && i === cur.mid ? 'rgba(63,185,80,0.2)' :
              i === cur.mid ? 'rgba(255,214,10,0.2)' :
              i >= cur.lo && i <= cur.hi ? 'rgba(88,166,255,0.08)' : 'var(--bg-primary)',
              cur.found && i === cur.mid ? '#3fb950' : i === cur.mid ? LIME : i >= cur.lo && i <= cur.hi ? '#58a6ff' : 'var(--border-color)',
            )}>{v}</div>
            <span style={{ ...C.label, color: i === cur.lo ? '#58a6ff' : i === cur.hi ? '#f85149' : 'transparent' }}>
              {i === cur.lo ? 'lo' : i === cur.hi ? 'hi' : '.'}
            </span>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
        {cur.found ? `✓ Нашли target=${target} на индексе ${cur.mid}` : `arr[mid=${cur.mid}]=${arr[cur.mid]} ≠ ${target}`}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>›</button>
        <span style={C.label}>Шаг {Math.min(step, steps.length - 1) + 1}/{steps.length}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   10. BINARY TREE TRAVERSAL
   ─────────────────────────────────────────── */
export function TreeTraversalViz() {
  const [mode, setMode] = useState('inorder')
  // дерево: [1, null, 2, 3] → узлы: root=1, right=2, right.left=3
  const orders = {
    preorder: [1,2,3,4,5,6,7],
    inorder: [4,2,5,1,6,3,7],
    postorder: [4,5,2,6,7,3,1],
  }
  const order = orders[mode]
  // простое бинарное дерево: 1 корень, 2 и 3 дети, 4 5 дети 2, 6 7 дети 3
  const nodes = [
    { id: 1, val: 1, x: 50, y: 8 },
    { id: 2, val: 2, x: 25, y: 35 },
    { id: 3, val: 3, x: 75, y: 35 },
    { id: 4, val: 4, x: 12, y: 65 },
    { id: 5, val: 5, x: 38, y: 65 },
    { id: 6, val: 6, x: 62, y: 65 },
    { id: 7, val: 7, x: 88, y: 65 },
  ]
  const edges = [[1,2],[1,3],[2,4],[2,5],[3,6],[3,7]]
  const [step, setStep] = useState(0)
  const visited = new Set(order.slice(0, step + 1))
  return (
    <div style={C.wrap}>
      <div style={{ ...C.row, marginBottom: 10 }}>
        {['preorder','inorder','postorder'].map(m => (
          <button key={m} style={mode===m ? {...secBtn, borderColor: LIME, color: LIME} : secBtn} onClick={() => { setMode(m); setStep(0) }}>
            {m === 'preorder' ? 'Pre' : m === 'inorder' ? 'In' : 'Post'}
          </button>
        ))}
        <span style={C.label}>{mode}: [{order.join(', ')}]</span>
      </div>
      <div style={{ position: 'relative', height: 120, marginBottom: 10 }}>
        <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {edges.map(([a, b]) => {
            const na = nodes.find(n => n.id === a), nb = nodes.find(n => n.id === b)
            return <line key={`${a}-${b}`} x1={`${na.x}%`} y1={`${na.y + 5}%`} x2={`${nb.x}%`} y2={`${nb.y + 5}%`} stroke="var(--border-color)" strokeWidth="1.5" />
          })}
        </svg>
        {nodes.map(n => {
          const ord = order.indexOf(n.val)
          const isActive = ord === step
          const isDone = visited.has(n.val)
          return (
            <div key={n.id} style={{
              position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)',
              ...C.box(
                isActive ? 'rgba(255,214,10,0.25)' : isDone ? 'rgba(63,185,80,0.15)' : 'var(--bg-tertiary)',
                isActive ? LIME : isDone ? '#3fb950' : 'var(--border-color)',
                isActive ? LIME : isDone ? '#3fb950' : 'var(--text-primary)'
              ),
              position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)',
              minWidth: 32, height: 32,
            }}>
              {n.val}
              {isDone && <span style={{ position: 'absolute', top: -10, right: -4, fontSize: 9, color: isDone ? '#3fb950' : 'transparent', fontFamily: 'monospace' }}>{order.indexOf(n.val)+1}</span>}
            </div>
          )
        })}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(order.length - 1, s + 1))}>›</button>
        <span style={{ fontSize: 12, color: LIME, fontFamily: 'monospace' }}>Посещаем: {order[step]}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   11. DFS
   ─────────────────────────────────────────── */
export function DFSViz() {
  const nodes = [
    { id: 1, x: 50, y: 8 },
    { id: 2, x: 25, y: 35 },
    { id: 3, x: 75, y: 35 },
    { id: 4, x: 12, y: 65 },
    { id: 5, x: 38, y: 65 },
  ]
  const edges = [[1,2],[1,3],[2,4],[2,5]]
  const paths = ['1→2→4','1→2→5','1→3']
  const dfsOrder = [1,2,4,5,3]
  const [step, setStep] = useState(0)
  const visited = new Set(dfsOrder.slice(0, step + 1))
  return (
    <div style={C.wrap}>
      <div style={{ position: 'relative', height: 110, marginBottom: 10 }}>
        <svg style={{ position: 'absolute', width: '100%', height: '100%' }}>
          {edges.map(([a,b]) => {
            const na = nodes.find(n=>n.id===a), nb = nodes.find(n=>n.id===b)
            const active = visited.has(a) && visited.has(b)
            return <line key={`${a}-${b}`} x1={`${na.x}%`} y1={`${na.y+5}%`} x2={`${nb.x}%`} y2={`${nb.y+5}%`} stroke={active ? LIME : 'var(--border-color)'} strokeWidth={active ? 2 : 1.5} />
          })}
        </svg>
        {nodes.map(n => (
          <div key={n.id} style={{
            position: 'absolute', left: `${n.x}%`, top: `${n.y}%`, transform: 'translate(-50%,-50%)',
            ...C.box(
              visited.has(n.id) ? dfsOrder.indexOf(n.id)===step ? 'rgba(255,214,10,0.25)' : 'rgba(63,185,80,0.15)' : 'var(--bg-tertiary)',
              visited.has(n.id) ? dfsOrder.indexOf(n.id)===step ? LIME : '#3fb950' : 'var(--border-color)',
            ),
            minWidth: 32, height: 32,
          }}>{n.id}</div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
        Пути: {paths.join(' | ')}
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(dfsOrder.length - 1, s + 1))}>›</button>
        <span style={C.label}>Узел {dfsOrder[step]}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   12. BFS
   ─────────────────────────────────────────── */
export function BFSViz() {
  const levels = [[3],[9,20],[15,7]]
  const levelColors = ['#f85149','#d29922','#3fb950']
  const [step, setStep] = useState(0)
  return (
    <div style={C.wrap}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        {levels.map((lvl, li) => (
          <div key={li} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {li > 0 && <span style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>↓</span>}
            <div style={{ ...C.row, justifyContent: 'center' }}>
              <span style={{ ...C.label, width: 50 }}>уровень {li}:</span>
              {lvl.map((v, vi) => (
                <div key={vi} style={C.box(
                  li <= step ? levelColors[li] + '22' : 'var(--bg-tertiary)',
                  li <= step ? levelColors[li] : 'var(--border-color)',
                  li <= step ? levelColors[li] : 'var(--text-primary)'
                )}>{v}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
        Очередь обходит уровень {step} → [{levels[Math.min(step, levels.length-1)].join(', ')}]
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(levels.length - 1, s + 1))}>Следующий уровень ›</button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   13. MATRIX TRAVERSAL (flood fill)
   ─────────────────────────────────────────── */
export function MatrixTraversalViz() {
  const orig = [[1,1,1],[1,1,0],[1,0,1]]
  const result = [[2,2,2],[2,2,0],[2,0,1]]
  const [done, setDone] = useState(false)
  const grid = done ? result : orig
  const colors = { 0: 'var(--bg-primary)', 1: 'rgba(88,166,255,0.2)', 2: 'rgba(255,214,10,0.2)' }
  const borders = { 0: 'var(--border-color)', 1: '#58a6ff', 2: LIME }
  const textColors = { 0: 'var(--text-tertiary)', 1: '#58a6ff', 2: LIME }
  return (
    <div style={C.wrap}>
      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-tertiary)' }}>
        {done ? 'После flood fill от (1,1) → цвет 2' : 'Исходная матрица, начинаем от (1,1)'}
      </div>
      <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(3, 40px)', gap: 4, marginBottom: 14 }}>
        {grid.flat().map((v, i) => (
          <div key={i} style={{ ...C.box(colors[v], borders[v], textColors[v]), minWidth: 40 }}>{v}</div>
        ))}
      </div>
      <div>
        <button style={done ? secBtn : btnStyle} onClick={() => setDone(d => !d)}>
          {done ? '↩ Сброс' : '▶ Flood Fill'}
        </button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   14. BACKTRACKING
   ─────────────────────────────────────────── */
export function BacktrackingViz() {
  const [step, setStep] = useState(0)
  // перестановки [1,2,3] — дерево решений
  const paths = [
    [1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]
  ]
  const cur = paths[Math.min(step, paths.length - 1)]
  return (
    <div style={C.wrap}>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10 }}>
        Генерируем перестановки [1,2,3]. Шаг = одна ветка рекурсии:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
        {[0,1,2].map(depth => (
          <div key={depth} style={{ ...C.row, paddingLeft: depth * 20 }}>
            <span style={C.label}>глубина {depth}:</span>
            <div style={C.box('rgba(255,214,10,0.18)', LIME, LIME)}>{cur[depth]}</div>
            <span style={{ ...C.label, color: 'var(--text-secondary)' }}>
              {depth === 0 ? `← выбор 1-го из [1,2,3]` : depth === 1 ? `← из оставшихся` : `← последний`}
            </span>
          </div>
        ))}
        <div style={{ paddingLeft: 60, fontSize: 12, color: '#3fb950', fontFamily: 'monospace' }}>
          → [{cur.join(', ')}] ✓
        </div>
      </div>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10 }}>
        Найдено {step + 1} из {paths.length} перестановок
      </div>
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹ Назад</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(paths.length - 1, s + 1))}>Следующая ›</button>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   15. DYNAMIC PROGRAMMING (Fibonacci)
   ─────────────────────────────────────────── */
export function DPViz() {
  const n = 8
  const [step, setStep] = useState(0)
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2]
  const built = dp.slice(0, step + 2)
  return (
    <div style={C.wrap}>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10 }}>
        dp[i] = dp[i-1] + dp[i-2], строим таблицу снизу вверх:
      </div>
      <div style={{ ...C.row, marginBottom: 10, flexWrap: 'wrap' }}>
        {dp.slice(0, n+1).map((v, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span style={C.label}>dp[{i}]</span>
            <div style={C.box(
              i <= step + 1 ? i === step + 1 ? 'rgba(255,214,10,0.25)' : 'rgba(63,185,80,0.12)' : 'var(--bg-primary)',
              i <= step + 1 ? i === step + 1 ? LIME : '#3fb950' : 'var(--border-color)',
              i <= step + 1 ? i === step + 1 ? LIME : '#3fb950' : 'var(--text-tertiary)'
            )}>{i <= step + 1 ? v : '?'}</div>
          </div>
        ))}
      </div>
      {step >= 1 && (
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontFamily: 'monospace' }}>
          dp[{step+1}] = dp[{step}] + dp[{step-1}] = {dp[step]} + {dp[step-1]} = {dp[step+1]}
        </div>
      )}
      <div style={C.row}>
        <button style={btnStyle} onClick={() => setStep(0)}>↩</button>
        <button style={secBtn} onClick={() => setStep(s => Math.max(0, s - 1))}>‹</button>
        <button style={secBtn} onClick={() => setStep(s => Math.min(n - 1, s + 1))}>›</button>
        <span style={C.label}>Вычислено до dp[{step+1}]</span>
      </div>
    </div>
  )
}
