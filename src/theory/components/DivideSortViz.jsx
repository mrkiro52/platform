import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

/* ─────────────────────────────────────────────────────────────
   Иллюстрации «разделяй и властвуй» на вёрстке.
   Элементы — квадратики с закруглением. Всё растёт вниз:
   сверху исходный массив, ниже появляются подмассивы и т.д.,
   затем (для merge) поток слияния обратно воедино.
   ───────────────────────────────────────────────────────────── */

const sortNums = (a) => [...a].sort((x, y) => x - y)

function randomArray(n = 6) {
  const pool = []
  while (pool.length < n) {
    const v = Math.floor(Math.random() * 90) + 5
    if (!pool.includes(v)) pool.push(v)
  }
  return pool
}

/* ── Построение кадров для Merge Sort ── */
function buildMerge(input) {
  // фаза деления: уровни сверху вниз до одиночных элементов
  const divide = [[input.slice()]]
  let level = divide[0]
  while (level.some((g) => g.length > 1)) {
    const next = []
    for (const g of level) {
      if (g.length > 1) {
        const m = Math.floor(g.length / 2)
        next.push(g.slice(0, m))
        next.push(g.slice(m))
      } else {
        next.push(g)
      }
    }
    level = next
    divide.push(level)
  }
  const D = divide.length - 1

  const toRow = (lvl, kind) => ({
    groups: lvl.map((g) => ({ values: g, kind })),
  })

  const snaps = []
  // показываем деление, добавляя строки вниз
  for (let i = 0; i <= D; i++) {
    snaps.push({
      rows: divide.slice(0, i + 1).map((lvl, idx) => ({
        key: 'd' + idx,
        ...toRow(lvl, 'split'),
      })),
      caption:
        i === 0
          ? 'Исходный массив'
          : i === D
          ? 'Дошли до одиночных элементов — каждый уже «отсортирован»'
          : 'Делим каждый кусок пополам',
    })
  }
  // фаза слияния: снизу вверх, но новые строки добавляем ВНИЗ.
  // отсортированная версия уровня деления = результат слияния на этой глубине
  const divideRows = divide.map((lvl, idx) => ({ key: 'd' + idx, ...toRow(lvl, 'split') }))
  const mergeRows = []
  for (let d = D - 1; d >= 0; d--) {
    mergeRows.push({
      key: 'm' + d,
      groups: divide[d].map((g) => ({ values: sortNums(g), kind: 'done' })),
    })
    snaps.push({
      rows: [...divideRows, ...mergeRows],
      caption:
        d === 0
          ? 'Готово — массив полностью отсортирован ✓'
          : 'Сливаем соседние подмассивы, сравнивая элементы по парам',
    })
  }
  return snaps
}

/* ── Построение кадров для Quick Sort ── */
function buildQuick(input) {
  // pivot — последний элемент группы; разбиваем на «меньше | pivot | больше»
  const level0 = [{ values: input.slice() }]
  const levels = [level0]
  let level = level0
  let guard = 0
  while (level.some((g) => g.values.length > 1) && guard++ < 30) {
    const next = []
    for (const g of level) {
      const vals = g.values
      if (vals.length <= 1) {
        next.push({ values: vals })
        continue
      }
      const pivot = vals[vals.length - 1]
      const less = vals.filter((x) => x < pivot)
      const equal = vals.filter((x) => x === pivot)
      const more = vals.filter((x) => x > pivot)
      // помечаем pivot в ТЕКУЩЕЙ группе (она уже в levels через ссылку)
      g.pivot = pivot
      if (less.length) next.push({ values: less })
      next.push({ values: equal, pivotGroup: true })
      if (more.length) next.push({ values: more })
    }
    level = next
    levels.push(level)
  }
  const L = levels.length - 1

  const toRow = (lvl, idx, markDone) => ({
    key: 'q' + idx,
    groups: lvl.map((g) => ({
      values: g.values,
      pivot: g.pivot,
      kind: markDone ? 'done' : g.pivotGroup ? 'pivotbox' : 'split',
    })),
  })

  const snaps = []
  for (let i = 0; i <= L; i++) {
    const last = i === L
    snaps.push({
      rows: levels.slice(0, i + 1).map((lvl, idx) => toRow(lvl, idx, last && idx === L)),
      caption:
        i === 0
          ? 'Исходный массив. Опорный (pivot) — последний элемент'
          : last
          ? 'Готово — читаем нижнюю строку слева направо ✓'
          : 'Меньше pivot — влево, больше — вправо. Повторяем для каждого куска',
    })
  }
  return snaps
}

/* ── Квадратик-элемент ── */
function Cell({ v, color }) {
  return (
    <div
      style={{
        minWidth: 30,
        height: 32,
        padding: '0 6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: color.bg,
        color: color.fg,
        borderRadius: 7,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: color.border,
        fontSize: 13,
        fontWeight: 700,
        fontFamily: 'monospace',
      }}
    >
      {v}
    </div>
  )
}

function Group({ g }) {
  const cellColor = (v, idx) => {
    if (g.kind === 'done') return { bg: 'rgba(63,185,80,0.18)', fg: '#3fb950', border: '#3fb950' }
    if (g.pivot != null && v === g.pivot && g.values.indexOf(g.pivot) === idx)
      return { bg: 'rgba(210,153,34,0.22)', fg: '#d29922', border: '#d29922' }
    return { bg: 'var(--bg-tertiary)', fg: 'var(--text-primary)', border: 'var(--border-color)' }
  }
  return (
    <div
      style={{
        display: 'flex',
        gap: 4,
        padding: 4,
        borderRadius: 9,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: g.kind === 'done' ? 'rgba(63,185,80,0.4)' : 'var(--border-color)',
        background: g.kind === 'done' ? 'rgba(63,185,80,0.05)' : 'transparent',
      }}
    >
      {g.values.map((v, i) => (
        <Cell key={i} v={v} color={cellColor(v, i)} />
      ))}
    </div>
  )
}

const STYLE_ID = 'divide-sort-viz-keyframes'

export default function DivideSortViz({ kind = 'merge' }) {
  const builder = kind === 'quick' ? buildQuick : buildMerge
  const [arr, setArr] = useState(() => randomArray(6))
  const snaps = useMemo(() => builder(arr), [arr, builder])
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(false)
  const timer = useRef(null)

  // вставляем keyframes один раз
  useEffect(() => {
    if (document.getElementById(STYLE_ID)) return
    const el = document.createElement('style')
    el.id = STYLE_ID
    el.textContent =
      '@keyframes dsvRowIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}'
    document.head.appendChild(el)
  }, [])

  useEffect(() => {
    setStep(0)
    setPlaying(false)
  }, [arr])

  useEffect(() => {
    if (!playing) return
    if (step >= snaps.length - 1) {
      setPlaying(false)
      return
    }
    timer.current = setTimeout(() => setStep((s) => s + 1), 850)
    return () => clearTimeout(timer.current)
  }, [playing, step, snaps])

  const atEnd = step >= snaps.length - 1
  const shuffle = useCallback(() => setArr(randomArray(6)), [])
  const snap = snaps[step] || snaps[0]

  const btn = (extra = {}) => ({
    background: 'var(--bg-tertiary)',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--border-color)',
    color: 'var(--text-secondary)',
    borderRadius: 8,
    padding: '7px 14px',
    fontSize: 13,
    fontWeight: 600,
    cursor: 'pointer',
    transition: '.15s',
    ...extra,
  })

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 14,
        padding: 'clamp(14px, 3vw, 22px)',
        margin: '20px 0',
      }}
    >
      {/* строки-уровни, растут вниз */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          minHeight: 120,
          padding: '8px 4px',
          background: 'var(--bg-primary)',
          borderRadius: 10,
          border: '1px solid var(--border-color)',
          overflowX: 'auto',
        }}
      >
        {snap.rows.map((row, ri) => (
          <div key={row.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {ri > 0 && <span style={{ color: 'var(--text-tertiary)', fontSize: 12, lineHeight: 1 }}>↓</span>}
            <div
              style={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: 12,
                justifyContent: 'center',
                animation: 'dsvRowIn .3s ease',
              }}
            >
              {row.groups.map((g, gi) => (
                <Group key={gi} g={g} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* статус */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--text-secondary)',
          margin: '12px 0',
          minHeight: 20,
        }}
      >
        {snap.caption}
      </div>

      {/* управление */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={() => {
            if (atEnd) {
              setStep(0)
              setPlaying(true)
            } else setPlaying((p) => !p)
          }}
          style={btn({ background: 'var(--accent-lime)', color: '#0a0a14', borderColor: 'var(--accent-lime)', minWidth: 110 })}
        >
          {playing ? '⏸ Пауза' : atEnd ? '↻ Заново' : '▶ Запустить'}
        </button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.max(0, s - 1)) }} style={btn()}>‹ Шаг</button>
        <button onClick={() => { setPlaying(false); setStep((s) => Math.min(snaps.length - 1, s + 1)) }} style={btn()}>Шаг ›</button>
        <button onClick={shuffle} style={btn()}>🎲 Новый массив</button>
      </div>

      {/* легенда */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 14, fontSize: 11, color: 'var(--text-tertiary)' }}>
        {(kind === 'quick'
          ? [['var(--bg-tertiary)', 'элемент'], ['#d29922', 'опорный (pivot)'], ['#3fb950', 'на месте']]
          : [['var(--bg-tertiary)', 'делим'], ['#3fb950', 'слито / отсортировано']]
        ).map(([c, l]) => (
          <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 11, height: 11, background: c, borderRadius: 3, display: 'inline-block', border: '1px solid var(--border-color)' }} />
            {l}
          </span>
        ))}
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center' }}>
        Шаг {step} из {snaps.length - 1}
      </div>
    </div>
  )
}
