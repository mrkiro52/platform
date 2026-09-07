// Простые иллюстрации для объяснения алгоритмов.
// Всё рисуется обычными блоками — без библиотек и без canvas,
// чтобы картинки нормально работали и на телефоне.

const TONE = {
  idle:   { bg: 'var(--bg-tertiary)', border: 'var(--border-color)',      color: 'var(--text-secondary)' },
  look:   { bg: 'rgba(255,214,10,0.16)',  border: 'rgba(255,214,10,0.65)',  color: '#FFD60A' },
  hit:    { bg: 'rgba(63,185,80,0.18)',   border: 'rgba(63,185,80,0.7)',    color: '#7EE787' },
  miss:   { bg: 'rgba(255,95,95,0.14)',   border: 'rgba(255,95,95,0.55)',   color: '#FF8B8B' },
  done:   { bg: 'rgba(255,255,255,0.03)', border: 'var(--border-color)',    color: 'var(--text-tertiary)' },
  window: { bg: 'rgba(255,140,66,0.16)',  border: 'rgba(255,140,66,0.65)',  color: '#FFB870' },
  off:    { bg: 'transparent',            border: 'transparent',            color: 'transparent' },
}

function toneOf(name) {
  return TONE[name] || TONE.idle
}

// ── Ряд ячеек: массив, строка, набор битов ────────────────────
function Cells({ cells = [], marks = {}, pointers = {}, indexes = false, width }) {
  return (
    <div className="viz-row">
      {cells.map((value, i) => {
        const tone = toneOf(marks[i])
        return (
          <div key={i} className="viz-cell-wrap">
            <div
              className="viz-cell"
              style={{
                background: tone.bg,
                borderColor: tone.border,
                color: marks[i] ? tone.color : 'var(--text-primary)',
                minWidth: width || undefined,
              }}
            >
              {value}
            </div>
            {indexes && <div className="viz-cell-index">{i}</div>}
            <div className="viz-cell-pointer">{pointers[i] || ''}</div>
          </div>
        )
      })}
    </div>
  )
}

// ── Шаги алгоритма: несколько состояний подряд с подписями ────
function StepsViz({ block }) {
  return (
    <div className="viz">
      {block.title && <div className="viz-title">{block.title}</div>}

      <div className="viz-steps">
        {block.frames.map((frame, i) => (
          <div key={i} className="viz-step">
            <div className="viz-step-head">
              <span className="viz-step-num">{frame.label || `Шаг ${i + 1}`}</span>
            </div>
            <Cells
              cells={frame.cells}
              marks={frame.marks || {}}
              pointers={frame.pointers || {}}
              indexes={block.indexes}
              width={block.cellWidth}
            />
            {frame.note && <div className="viz-step-note">{frame.note}</div>}
          </div>
        ))}
      </div>

      {block.legend && (
        <div className="viz-legend">
          {block.legend.map((item, i) => {
            const tone = toneOf(item.tone)
            return (
              <span key={i} className="viz-legend-item">
                <span className="viz-legend-dot" style={{ background: tone.bg, borderColor: tone.border }} />
                {item.text}
              </span>
            )
          })}
        </div>
      )}

      {block.caption && <div className="viz-caption">{block.caption}</div>}
    </div>
  )
}

// ── Столбики: сравнение роста и объёмов ───────────────────────
function BarsViz({ block }) {
  // Разница между O(1) и O(n²) настолько велика, что при честном масштабе
  // маленькие столбики превращаются в невидимую полоску. Корень сжимает
  // картинку так, что видно все три, а точные числа стоят подписями справа.
  const scale = block.scale === 'sqrt' ? Math.sqrt : (x => x)
  const max = Math.max(...block.items.map(item => scale(item.value)), 1)

  return (
    <div className="viz">
      {block.title && <div className="viz-title">{block.title}</div>}

      <div className="viz-bars">
        {block.items.map((item, i) => (
          <div key={i} className="viz-bar-row">
            <div className="viz-bar-label">{item.label}</div>
            <div className="viz-bar-track">
              <div
                className="viz-bar-fill"
                style={{
                  width: `${Math.max((scale(item.value) / max) * 100, 3)}%`,
                  background: item.color || 'rgba(255,140,66,0.55)',
                }}
              />
            </div>
            <div className="viz-bar-value">{item.text}</div>
          </div>
        ))}
      </div>

      {block.caption && <div className="viz-caption">{block.caption}</div>}
    </div>
  )
}

// ── Дерево: рекурсия, деление пополам, перебор вариантов ──────
function TreeViz({ block }) {
  return (
    <div className="viz">
      {block.title && <div className="viz-title">{block.title}</div>}

      <div className="viz-tree">
        {block.levels.map((level, li) => (
          <div key={li} className="viz-tree-level">
            {li > 0 && <div className="viz-tree-arrows" aria-hidden="true">↓</div>}
            <div className="viz-tree-nodes">
              {level.map((node, ni) => {
                const tone = toneOf(node.tone)
                return (
                  <div
                    key={ni}
                    className="viz-tree-node"
                    style={{ background: tone.bg, borderColor: tone.border, color: node.tone ? tone.color : 'var(--text-primary)' }}
                  >
                    {node.text}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {block.caption && <div className="viz-caption">{block.caption}</div>}
    </div>
  )
}

// ── Таблица: таблицы ДП, сравнение вариантов ──────────────────
function GridViz({ block }) {
  return (
    <div className="viz">
      {block.title && <div className="viz-title">{block.title}</div>}

      <div className="viz-grid-scroll">
        <table className="viz-grid">
          {block.head && (
            <thead>
              <tr>
                {block.head.map((cell, i) => <th key={i}>{cell}</th>)}
              </tr>
            </thead>
          )}
          <tbody>
            {block.rows.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => {
                  const mark = block.marks && block.marks[`${ri},${ci}`]
                  const tone = toneOf(mark)
                  return (
                    <td
                      key={ci}
                      style={mark ? { background: tone.bg, color: tone.color, fontWeight: 700 } : undefined}
                    >
                      {cell}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {block.caption && <div className="viz-caption">{block.caption}</div>}
    </div>
  )
}

// ── Цепочка: последовательность действий со стрелками ─────────
function FlowViz({ block }) {
  return (
    <div className="viz">
      {block.title && <div className="viz-title">{block.title}</div>}

      <div className="viz-flow">
        {block.nodes.map((node, i) => (
          <div key={i} className="viz-flow-item">
            <div
              className="viz-flow-node"
              style={{
                background: toneOf(node.tone).bg,
                borderColor: toneOf(node.tone).border,
              }}
            >
              <div className="viz-flow-title">{node.title}</div>
              {node.text && <div className="viz-flow-text">{node.text}</div>}
            </div>
            {i < block.nodes.length - 1 && <div className="viz-flow-arrow" aria-hidden="true">→</div>}
          </div>
        ))}
      </div>

      {block.caption && <div className="viz-caption">{block.caption}</div>}
    </div>
  )
}

export default function AlgoViz({ block }) {
  switch (block.kind) {
    case 'steps': return <StepsViz block={block} />
    case 'bars':  return <BarsViz block={block} />
    case 'tree':  return <TreeViz block={block} />
    case 'grid':  return <GridViz block={block} />
    case 'flow':  return <FlowViz block={block} />
    default:      return null
  }
}
