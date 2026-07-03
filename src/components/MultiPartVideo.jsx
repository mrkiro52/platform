import { useState } from 'react'
import VideoPlayer from './VideoPlayer'

/**
 * Видео из нескольких частей. Под плеером — ряд кнопок (по числу частей),
 * контейнер шириной с видео, каждая кнопка — 25% ширины (при 4 частях).
 * Выбранная кнопка — сплошной зелёный фон, остальные — полупрозрачный зелёный.
 */
export default function MultiPartVideo({ parts = [] }) {
  const [active, setActive] = useState(0)
  if (!parts.length) return null

  return (
    <div style={{ marginBottom: 32 }}>
      {/* Плеер текущей части (key заставляет пересоздать плеер при смене части) */}
      <div style={{ marginBottom: 0 }}>
        <VideoPlayer key={active} src={parts[active]} />
      </div>

      {/* Ряд кнопок частей: контейнер шириной с видео, каждая кнопка 25% */}
      <div style={{
        display: 'flex',
        maxWidth: 800,
        margin: '-20px auto 0',
        borderRadius: 8,
        overflow: 'hidden',
        border: '1px solid rgba(200,255,0,0.25)',
      }}>
        {parts.map((_, i) => {
          const selected = i === active
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: '25%',
                padding: '11px 0',
                border: 'none',
                borderRight: i < parts.length - 1 ? '1px solid rgba(0,0,0,0.25)' : 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                background: selected ? 'var(--accent-lime)' : 'rgba(200,255,0,0.18)',
                color: selected ? '#0a0a14' : 'var(--accent-lime)',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(200,255,0,0.3)' }}
              onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(200,255,0,0.18)' }}
            >
              {i + 1}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Части видео «Основы Python» (4 части)
export const PYTHON_BASICS_PARTS = [
  'https://s3.regru.cloud/kirocamp/pybasic1.mov',
  'https://s3.regru.cloud/kirocamp/pybasic2.mov',
  'https://s3.regru.cloud/kirocamp/pybasic3.mov',
  'https://s3.regru.cloud/kirocamp/pybasic4.mov',
]
