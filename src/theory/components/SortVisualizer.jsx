import { useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────
   Генераторы кадров. Каждый кадр:
   { arr: [...], active: [индексы сравнения], swap: [индексы обмена],
     sorted: [индексы на финальном месте], note: 'текст' }
   ───────────────────────────────────────────────────────────── */

function genBubble(input) {
  const arr = [...input], frames = [], n = arr.length
  const sorted = []
  for (let i = 0; i < n; i++) {
    let swapped = false
    for (let j = 0; j < n - i - 1; j++) {
      frames.push({ arr: [...arr], active: [j, j + 1], swap: [], sorted: [...sorted], note: `Сравниваем ${arr[j]} и ${arr[j + 1]}` })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true
        frames.push({ arr: [...arr], active: [], swap: [j, j + 1], sorted: [...sorted], note: `Меняем местами` })
      }
    }
    sorted.unshift(n - i - 1)
    if (!swapped) { for (let k = 0; k < n - i - 1; k++) sorted.push(k); break }
  }
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

function genSelection(input) {
  const arr = [...input], frames = [], n = arr.length
  const sorted = []
  for (let i = 0; i < n; i++) {
    let min = i
    frames.push({ arr: [...arr], active: [i], swap: [], sorted: [...sorted], note: `Ищем минимум с позиции ${i}` })
    for (let j = i + 1; j < n; j++) {
      frames.push({ arr: [...arr], active: [min, j], swap: [], sorted: [...sorted], note: `Сравниваем с ${arr[j]}` })
      if (arr[j] < arr[min]) min = j
    }
    if (min !== i) {
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
      frames.push({ arr: [...arr], active: [], swap: [i, min], sorted: [...sorted], note: `Ставим минимум на место` })
    }
    sorted.push(i)
  }
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

function genInsertion(input) {
  const arr = [...input], frames = [], n = arr.length
  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1
    frames.push({ arr: [...arr], active: [i], swap: [], sorted: [], note: `Вставляем ${key}` })
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]
      frames.push({ arr: [...arr], active: [], swap: [j, j + 1], sorted: [], note: `Сдвигаем ${arr[j]} вправо` })
      j--
    }
    arr[j + 1] = key
    frames.push({ arr: [...arr], active: [j + 1], swap: [], sorted: [], note: `${key} на месте` })
  }
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

function genQuick(input) {
  const arr = [...input], frames = [], sorted = []
  function partition(lo, hi) {
    const pivot = arr[hi]
    frames.push({ arr: [...arr], active: [hi], swap: [], sorted: [...sorted], note: `Опорный (pivot) = ${pivot}` })
    let i = lo - 1
    for (let j = lo; j < hi; j++) {
      frames.push({ arr: [...arr], active: [j, hi], swap: [], sorted: [...sorted], note: `Сравниваем ${arr[j]} с pivot ${pivot}` })
      if (arr[j] <= pivot) {
        i++
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          frames.push({ arr: [...arr], active: [], swap: [i, j], sorted: [...sorted], note: `Меньше pivot — двигаем влево` })
        }
      }
    }
    ;[arr[i + 1], arr[hi]] = [arr[hi], arr[i + 1]]
    frames.push({ arr: [...arr], active: [], swap: [i + 1, hi], sorted: [...sorted], note: `Ставим pivot на место` })
    return i + 1
  }
  function qs(lo, hi) {
    if (lo < hi) {
      const p = partition(lo, hi)
      sorted.push(p)
      qs(lo, p - 1)
      qs(p + 1, hi)
    } else if (lo === hi) {
      sorted.push(lo)
    }
  }
  qs(0, arr.length - 1)
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

function genMerge(input) {
  const arr = [...input], frames = []
  function ms(lo, hi) {
    if (hi - lo < 1) return
    const mid = Math.floor((lo + hi) / 2)
    ms(lo, mid)
    ms(mid + 1, hi)
    const left = arr.slice(lo, mid + 1), right = arr.slice(mid + 1, hi + 1)
    let i = 0, j = 0, k = lo
    while (i < left.length && j < right.length) {
      frames.push({ arr: [...arr], active: [lo + i, mid + 1 + j], swap: [], sorted: [], note: `Сливаем: ${left[i]} vs ${right[j]}` })
      if (left[i] <= right[j]) { arr[k] = left[i]; i++ }
      else { arr[k] = right[j]; j++ }
      frames.push({ arr: [...arr], active: [], swap: [k], sorted: [], note: `Записываем ${arr[k]}` })
      k++
    }
    while (i < left.length) { arr[k] = left[i]; frames.push({ arr: [...arr], active: [], swap: [k], sorted: [], note: `Записываем ${arr[k]}` }); i++; k++ }
    while (j < right.length) { arr[k] = right[j]; frames.push({ arr: [...arr], active: [], swap: [k], sorted: [], note: `Записываем ${arr[k]}` }); j++; k++ }
  }
  ms(0, arr.length - 1)
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

function genHeap(input) {
  const arr = [...input], frames = [], n = arr.length
  const sorted = []
  function heapify(size, i) {
    let largest = i
    const l = 2 * i + 1, r = 2 * i + 2
    if (l < size) {
      frames.push({ arr: [...arr], active: [largest, l], swap: [], sorted: [...sorted], note: `Сравниваем с левым потомком` })
      if (arr[l] > arr[largest]) largest = l
    }
    if (r < size) {
      frames.push({ arr: [...arr], active: [largest, r], swap: [], sorted: [...sorted], note: `Сравниваем с правым потомком` })
      if (arr[r] > arr[largest]) largest = r
    }
    if (largest !== i) {
      ;[arr[i], arr[largest]] = [arr[largest], arr[i]]
      frames.push({ arr: [...arr], active: [], swap: [i, largest], sorted: [...sorted], note: `Просеиваем вниз` })
      heapify(size, largest)
    }
  }
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) heapify(n, i)
  for (let i = n - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    frames.push({ arr: [...arr], active: [], swap: [0, i], sorted: [...sorted], note: `Максимум → в конец` })
    sorted.unshift(i)
    heapify(i, 0)
  }
  sorted.unshift(0)
  frames.push({ arr: [...arr], active: [], swap: [], sorted: arr.map((_, i) => i), note: 'Готово ✓' })
  return frames
}

const ALGOS = {
  bubble:    { name: 'Bubble',    gen: genBubble,    label: 'Пузырьком' },
  selection: { name: 'Selection', gen: genSelection, label: 'Выбором' },
  insertion: { name: 'Insertion', gen: genInsertion, label: 'Вставками' },
  merge:     { name: 'Merge',     gen: genMerge,     label: 'Слиянием' },
  quick:     { name: 'Quick',     gen: genQuick,     label: 'Быстрая' },
  heap:      { name: 'Heap',      gen: genHeap,      label: 'Кучей' },
}

const SPEEDS = [
  { label: '0.5×', ms: 600 },
  { label: '1×',   ms: 300 },
  { label: '2×',   ms: 130 },
  { label: '4×',   ms: 50  },
]

function randomArray(n = 16) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 8)
}

export default function SortVisualizer() {
  const [algo, setAlgo] = useState('bubble')
  const [baseArr, setBaseArr] = useState(() => randomArray())
  const [frames, setFrames] = useState([])
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speedIdx, setSpeedIdx] = useState(1)
  const timer = useRef(null)

  // пересоздать кадры при смене алгоритма или массива
  useEffect(() => {
    const f = ALGOS[algo].gen(baseArr)
    setFrames(f)
    setStep(0)
    setPlaying(false)
  }, [algo, baseArr])

  // авто-проигрывание
  useEffect(() => {
    if (!playing) return
    if (step >= frames.length - 1) { setPlaying(false); return }
    timer.current = setTimeout(() => setStep(s => s + 1), SPEEDS[speedIdx].ms)
    return () => clearTimeout(timer.current)
  }, [playing, step, frames, speedIdx])

  const reset = useCallback(() => { setStep(0); setPlaying(false) }, [])
  const shuffle = useCallback(() => { setBaseArr(randomArray()) }, [])

  const frame = frames[step] || { arr: baseArr, active: [], swap: [], sorted: [], note: '' }
  const maxVal = Math.max(...baseArr, 1)
  const atEnd = step >= frames.length - 1

  const barColor = (i) => {
    if (frame.sorted?.includes(i)) return '#3fb950'   // зелёный — на месте
    if (frame.swap?.includes(i))   return '#f85149'   // красный — обмен
    if (frame.active?.includes(i)) return '#d29922'   // жёлтый — сравнение
    return 'var(--accent-lime)'
  }

  const btn = (extra = {}) => ({
    background: 'var(--bg-tertiary)',
    borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-color)',
    color: 'var(--text-secondary)', borderRadius: 8, padding: '7px 14px',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: '.15s', ...extra,
  })

  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
      borderRadius: 14, padding: 'clamp(14px, 3vw, 22px)', margin: '20px 0',
    }}>
      {/* выбор алгоритма */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {Object.entries(ALGOS).map(([key, a]) => (
          <button
            key={key}
            onClick={() => setAlgo(key)}
            style={btn(algo === key ? {
              background: 'rgba(255,214,10,0.12)', borderColor: 'var(--accent-lime)', color: 'var(--accent-lime)',
            } : {})}
          >{a.label}</button>
        ))}
      </div>

      {/* столбики */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '2%',
        height: 220, padding: '0 4px', background: 'var(--bg-primary)',
        borderRadius: 10, border: '1px solid var(--border-color)', overflow: 'hidden',
      }}>
        {frame.arr.map((v, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
            <div style={{
              width: '100%', height: `${(v / maxVal) * 88}%`,
              background: barColor(i), borderRadius: '4px 4px 0 0',
              transition: 'height .12s ease, background .12s ease',
            }} />
            <span style={{ fontSize: 9, color: 'var(--text-tertiary)', marginTop: 3, fontFamily: 'monospace' }}>{v}</span>
          </div>
        ))}
      </div>

      {/* статус */}
      <div style={{
        textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)',
        margin: '12px 0', minHeight: 20, fontFamily: 'monospace',
      }}>{frame.note || ' '}</div>

      {/* управление */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => { if (atEnd) { setStep(0); setPlaying(true) } else setPlaying(p => !p) }}
          style={btn({ background: 'var(--accent-lime)', color: '#0a0a14', borderColor: 'var(--accent-lime)', minWidth: 96 })}
        >{playing ? '⏸ Пауза' : atEnd ? '↻ Заново' : '▶ Запустить'}</button>

        <button onClick={() => { setPlaying(false); setStep(s => Math.max(0, s - 1)) }} style={btn()}>‹ Шаг</button>
        <button onClick={() => { setPlaying(false); setStep(s => Math.min(frames.length - 1, s + 1)) }} style={btn()}>Шаг ›</button>
        <button onClick={reset} style={btn()}>⟲ Сброс</button>
        <button onClick={shuffle} style={btn()}>🎲 Новый массив</button>

        <div style={{ display: 'flex', gap: 4, marginLeft: 'auto' }}>
          {SPEEDS.map((s, i) => (
            <button key={s.label} onClick={() => setSpeedIdx(i)}
              style={btn(speedIdx === i ? { background: 'rgba(255,214,10,0.12)', borderColor: 'var(--accent-lime)', color: 'var(--accent-lime)', padding: '7px 10px' } : { padding: '7px 10px' })}
            >{s.label}</button>
          ))}
        </div>
      </div>

      {/* легенда */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 14, fontSize: 11, color: 'var(--text-tertiary)' }}>
        {[['var(--accent-lime)', 'обычный'], ['#d29922', 'сравнение'], ['#f85149', 'обмен'], ['#3fb950', 'на месте']].map(([c, l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, background: c, borderRadius: 3, display: 'inline-block' }} />{l}
          </span>
        ))}
      </div>

      {/* прогресс */}
      <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Шаг {step} из {frames.length - 1}
      </div>
    </div>
  )
}
