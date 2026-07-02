// Общие примитивы для карточек AntiReels.
// Каждая карточка — адаптивный div: трек-бейдж, заголовок, тезисы, при необходимости формула/иллюстрация.

export const TRACKS = {
  frontend: { label: 'Frontend',          accent: '#facc15', bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.35)' },
  backend:  { label: 'Backend',           accent: '#60a5fa', bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.35)' },
  analytics:{ label: 'Аналитика',         accent: '#818cf8', bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.35)' },
  ml:       { label: 'Machine Learning',  accent: '#4ade80', bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.35)' },
  security: { label: 'Кибербезопасность', accent: '#f87171', bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.35)' },
}

export function Card({ track, title, children }) {
  const t = TRACKS[track] || TRACKS.frontend
  return (
    <div style={{
      width: '100%', height: '100%', maxWidth: '100%', boxSizing: 'border-box',
      display: 'flex', flexDirection: 'column', minWidth: 0,
      padding: 'clamp(18px, 5vw, 34px)',
      overflowY: 'auto', overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
      background: `radial-gradient(120% 80% at 50% 0%, ${t.bg} 0%, transparent 60%), var(--bg-secondary)`,
    }}>
      <span style={{
        alignSelf: 'flex-start',
        background: t.bg, border: `1px solid ${t.border}`, color: t.accent,
        borderRadius: 999, padding: '4px 14px', fontSize: 12, fontWeight: 700,
        letterSpacing: 0.3, marginBottom: 16, flexShrink: 0,
      }}>{t.label}</span>

      <h2 style={{
        fontFamily: 'var(--font-inter)', fontWeight: 800,
        fontSize: 'clamp(19px, 5.5vw, 30px)', lineHeight: 1.2,
        color: 'var(--text-primary)', margin: '0 0 16px', flexShrink: 0,
        overflowWrap: 'anywhere', wordBreak: 'break-word',
      }}>{title}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minWidth: 0, maxWidth: '100%' }}>
        {children}
      </div>
    </div>
  )
}

export function P({ children }) {
  return (
    <p style={{
      color: 'var(--text-secondary)', fontSize: 'clamp(14px, 3.6vw, 16px)',
      lineHeight: 1.65, margin: 0, maxWidth: '100%',
      overflowWrap: 'anywhere', wordBreak: 'break-word',
    }}>{children}</p>
  )
}

export function B({ children }) {
  return <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>
}

export function Formula({ children }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.28)', border: '1px solid var(--border-color)',
      borderRadius: 10, padding: '14px 16px', textAlign: 'center',
      fontFamily: 'var(--font-mono, monospace)', fontSize: 'clamp(13px, 3.8vw, 17px)',
      color: 'var(--text-primary)', maxWidth: '100%', boxSizing: 'border-box',
      overflowX: 'auto', overflowWrap: 'anywhere', WebkitOverflowScrolling: 'touch',
    }}>{children}</div>
  )
}

export function Code({ children }) {
  return (
    <pre style={{
      background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)',
      borderRadius: 10, padding: '14px 16px', margin: 0,
      maxWidth: '100%', boxSizing: 'border-box',
      overflowX: 'auto', WebkitOverflowScrolling: 'touch',
      fontFamily: 'var(--font-mono, monospace)', fontSize: 'clamp(12px, 3.4vw, 14.5px)',
      lineHeight: 1.55, color: 'var(--text-primary)',
    }}><code>{children}</code></pre>
  )
}

export function Ul({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 7, maxWidth: '100%' }}>
      {items.map((it, i) => (
        <li key={i} style={{
          color: 'var(--text-secondary)', fontSize: 'clamp(14px, 3.6vw, 15.5px)', lineHeight: 1.55,
          overflowWrap: 'anywhere', wordBreak: 'break-word',
        }}>{it}</li>
      ))}
    </ul>
  )
}

// Обёртка для простой SVG-иллюстрации с подписью
export function Fig({ children, caption }) {
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, maxWidth: '100%' }}>
      <div className="antireels-fig-wrap" style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'hidden' }}>
        {children}
      </div>
      {caption && (
        <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', overflowWrap: 'anywhere' }}>{caption}</figcaption>
      )}
    </figure>
  )
}
