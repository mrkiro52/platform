import { useState } from 'react'
import VideoPlayer from './VideoPlayer'

/**
 * Видео из нескольких частей. Под плеером — ряд кнопок (по числу частей),
 * контейнер шириной с видео, каждая кнопка занимает 1/N ширины.
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
        borderRadius: 12,
        overflow: 'hidden',
        border: '1px solid rgba(255,214,10,0.25)',
      }}>
        {parts.map((_, i) => {
          const selected = i === active
          return (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: `${100 / parts.length}%`,
                padding: '11px 0',
                border: 'none',
                borderRight: i < parts.length - 1 ? '1px solid rgba(0,0,0,0.25)' : 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                background: selected ? 'var(--accent-lime)' : 'rgba(255,214,10,0.18)',
                color: selected ? '#0a0a14' : 'var(--accent-lime)',
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,214,10,0.3)' }}
              onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'rgba(255,214,10,0.18)' }}
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

// Части видео «Нарешиваем LeetCode» (4 части)
export const LEETCODE_ONE_PARTS = [
  'https://s3.regru.cloud/kirocamp/leetcodeOne1.mov',
  'https://s3.regru.cloud/kirocamp/leetcodeOne2.mov',
  'https://s3.regru.cloud/kirocamp/leetcodeOne3.mov',
  'https://s3.regru.cloud/kirocamp/leetcodeOne4.mov',
]

// Части видео «NumPy p.2 и Pandas», 5 июля (5 частей)
export const JULY5_ML_ANALYTICS_PARTS = [
  'https://s3.regru.cloud/kirocamp/day5MLAp1.mov',
  'https://s3.regru.cloud/kirocamp/day5MLAp2.mov',
  'https://s3.regru.cloud/kirocamp/day5MLAp3.mov',
  'https://s3.regru.cloud/kirocamp/day5MLAp4.mov',
  'https://s3.regru.cloud/kirocamp/day5MLAp5.mov',
]

// Части видео «Продвинутый JavaScript», 5 июля (2 части)
export const JULY5_FRONTEND_PARTS = [
  'https://s3.regru.cloud/kirocamp/frpt1.mov',
  'https://s3.regru.cloud/kirocamp/frpt2.mov',
]

// Части видео «Вспоминаем структуры данных и алгоритмы», 7 июля, все треки (7 частей)
export const JULY7_ALGORITHMS_PARTS = [
  'https://s3.regru.cloud/kirocamp/allAlgo1.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo2.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo3.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo4.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo5.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo6.mov',
  'https://s3.regru.cloud/kirocamp/allAlgo7.mov',
]

// Части записи встречи Insider Show 3, 24 июля, все треки (5 частей)
export const JULY24_INSIDER_SHOW_3_PARTS = [
  'https://s3.regru.cloud/kirocamp/is1.mov',
  'https://s3.regru.cloud/kirocamp/is2.mov',
  'https://s3.regru.cloud/kirocamp/is3.mov',
  'https://s3.regru.cloud/kirocamp/is4.mov',
  'https://s3.regru.cloud/kirocamp/is5.mov',
]
