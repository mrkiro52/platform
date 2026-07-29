import { useState } from 'react'

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
)

const EyeOffIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
)

function QuestionItem({ q }) {
  const [revealed, setRevealed] = useState(false)

  return (
    <div style={{
      background: 'var(--bg-tertiary)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: '16px 20px',
      marginBottom: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 14, margin: 0, flex: 1 }}>
          {q.q}
        </p>
        <button
          onClick={() => setRevealed(r => !r)}
          title={revealed ? 'Скрыть ответ' : 'Показать ответ'}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-color)',
            borderRadius: 6,
            color: revealed ? 'var(--text-tertiary)' : 'var(--accent-lime)',
            padding: '5px 8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            transition: 'border-color 0.15s, color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-lime)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          {revealed ? <EyeOffIcon /> : <EyeIcon />}
        </button>
      </div>
      <p style={{
        color: 'var(--text-secondary)',
        fontSize: 13,
        lineHeight: 1.6,
        filter: revealed ? 'none' : 'blur(6px)',
        userSelect: revealed ? 'auto' : 'none',
        transition: 'filter 0.25s',
        margin: 0,
        padding: '8px 12px',
        background: revealed ? 'rgba(32,190,255,0.05)' : 'rgba(0,0,0,0.2)',
        borderRadius: 6,
        border: revealed ? '1px solid rgba(32,190,255,0.15)' : '1px solid transparent',
      }}>
        {q.a}
      </p>
    </div>
  )
}

export default function SelfCheck({ questions }) {
  return (
    <div style={{
      margin: '24px 0 8px',
      padding: '20px',
      background: 'rgba(32,190,255,0.03)',
      border: '1px solid rgba(32,190,255,0.1)',
      borderRadius: 12,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 1,
        textTransform: 'uppercase', color: 'var(--accent-lime)',
        marginBottom: 14, opacity: 0.8,
      }}>
        Самопроверка (с ответами)
      </div>
      {questions.map((q, i) => (
        <QuestionItem key={i} q={q} />
      ))}
    </div>
  )
}
