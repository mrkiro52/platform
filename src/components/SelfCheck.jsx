import { useState } from 'react'

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
      <p style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 14, marginBottom: 12 }}>
        ❓ {q.q}
      </p>
      <div style={{ position: 'relative' }}>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 13,
          lineHeight: 1.6,
          filter: revealed ? 'none' : 'blur(6px)',
          userSelect: revealed ? 'auto' : 'none',
          transition: 'filter 0.25s',
          margin: 0,
          padding: '8px 12px',
          background: revealed ? 'rgba(200,255,0,0.05)' : 'rgba(0,0,0,0.2)',
          borderRadius: 6,
          border: revealed ? '1px solid rgba(200,255,0,0.15)' : '1px solid transparent',
        }}>
          {q.a}
        </p>
      </div>
      <button
        onClick={() => setRevealed(r => !r)}
        style={{
          marginTop: 10,
          background: 'transparent',
          border: '1px solid var(--border-color)',
          borderRadius: 6,
          color: revealed ? 'var(--text-tertiary)' : 'var(--accent-lime)',
          fontSize: 12,
          fontWeight: 600,
          padding: '5px 14px',
          cursor: 'pointer',
          transition: 'border-color 0.15s, color 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent-lime)'}
        onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
      >
        {revealed ? 'Скрыть ↑' : 'Показать ответ →'}
      </button>
    </div>
  )
}

export default function SelfCheck({ questions }) {
  return (
    <div style={{
      margin: '24px 0 8px',
      padding: '20px',
      background: 'rgba(200,255,0,0.03)',
      border: '1px solid rgba(200,255,0,0.1)',
      borderRadius: 12,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: 1,
        textTransform: 'uppercase', color: 'var(--accent-lime)',
        marginBottom: 14, opacity: 0.8,
      }}>
        Самопроверка
      </div>
      {questions.map((q, i) => (
        <QuestionItem key={i} q={q} />
      ))}
    </div>
  )
}
