import { useState, useEffect } from 'react'
import WeekMaterials from './WeekMaterials'
import { WEEK2_TITLE, WEEK2_LEVELS, chaptersForLevel } from '../data/week2Materials'

const LEVEL_KEY = 'kiro_week2_level'

// 1 глава, 2 главы, 5 глав, 21 глава
function chapterWord(n) {
  const mod100 = n % 100
  if (mod100 >= 11 && mod100 <= 14) return 'глав'
  const mod10 = n % 10
  if (mod10 === 1) return 'глава'
  if (mod10 >= 2 && mod10 <= 4) return 'главы'
  return 'глав'
}

function loadLevel() {
  try {
    const raw = Number(localStorage.getItem(LEVEL_KEY))
    return WEEK2_LEVELS.some(l => l.id === raw) ? raw : null
  } catch {
    return null
  }
}

// Метка сложности программы уровня — те же кружки, что и у глав
const LEVEL_DOTS = {
  1: ['#3FB950', '#3a3a44', '#3a3a44'],
  2: ['#FFD60A', '#FFD60A', '#3a3a44'],
  3: ['#FF5F5F', '#FF5F5F', '#FF5F5F'],
}

function LevelCard({ level, active, onSelect }) {
  const chapters = chaptersForLevel(level.id)

  return (
    <button
      type="button"
      onClick={() => onSelect(level.id)}
      className={`week-level-card${active ? ' is-active' : ''}`}
    >
      <span className="week-level-top">
        <span className="week-level-num">Уровень {level.id}</span>
        <span style={{ display: 'inline-flex', gap: 3 }}>
          {LEVEL_DOTS[level.id].map((color, i) => (
            <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'block' }} />
          ))}
        </span>
      </span>

      <span className="week-level-title">«{level.title}»</span>
      <span className="week-level-subtitle">{level.subtitle}</span>

      <span className="week-level-goal">{level.goal}</span>
      <span className="week-level-detail">{level.detail}</span>

      <span className="week-level-count">{chapters.length} {chapterWord(chapters.length)}</span>
    </button>
  )
}

export default function Week2Program() {
  const [level, setLevel] = useState(() => loadLevel())

  useEffect(() => {
    try {
      if (level) localStorage.setItem(LEVEL_KEY, String(level))
    } catch {
      /* localStorage недоступен — не страшно */
    }
  }, [level])

  const chosen = WEEK2_LEVELS.find(l => l.id === level)

  if (!chosen) {
    return (
      <div className="widget">
        <div className="widget-header">
          <span className="widget-title">Выбери свой уровень</span>
        </div>
        <p style={{ margin: '0 0 18px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          Программа недели разбита на три уровня. Выбери тот, который ближе к твоей текущей подготовке —
          материалы подстроятся под него. Уровень можно поменять в любой момент, прогресс по главам не потеряется.
        </p>

        <div className="week-levels">
          {WEEK2_LEVELS.map(l => (
            <LevelCard key={l.id} level={l} active={false} onSelect={setLevel} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="widget" style={{ marginBottom: 16 }}>
        <div className="widget-header" style={{ flexWrap: 'wrap', gap: 10 }}>
          <span className="widget-title">Твой уровень</span>
          <button
            type="button"
            className="autumn-toggle-btn"
            onClick={() => setLevel(null)}
          >
            Сменить
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ display: 'inline-flex', gap: 3 }}>
            {LEVEL_DOTS[chosen.id].map((color, i) => (
              <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: color, display: 'block' }} />
            ))}
          </span>
          <span style={{ fontFamily: 'var(--font-syne)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>
            Уровень {chosen.id} — «{chosen.title}»
          </span>
          <span style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
            {chaptersForLevel(chosen.id).length} {chapterWord(chaptersForLevel(chosen.id).length)}
          </span>
        </div>

        <p style={{ margin: '10px 0 0', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {chosen.goal}
        </p>
      </div>

      <WeekMaterials
        chapters={chaptersForLevel(chosen.id)}
        title={WEEK2_TITLE}
        storageKey="kiro_week2_visited"
        weekNumber={2}
        submitFormat={chosen.id === 1 ? 'notebook' : 'zip'}
        showCode={chosen.id !== 1}
      />
    </>
  )
}
