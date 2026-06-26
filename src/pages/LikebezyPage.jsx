import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PandasLikbez from './likebezy/PandasLikbez'
import SqlLikbez from './likebezy/SqlLikbez'
import MlLikbez from './likebezy/MlLikbez'

const LIKEBEZY = [
  {
    id: 'pandas',
    title: 'Pandas',
    subtitle: 'Работа с данными в Python',
    tag: 'Python',
    level: 'Junior → Middle',
    time: '~45 мин',
    chapters: 20,
    questions: 60,
    topics: ['Series & DataFrame', 'Фильтрация и индексация', 'GroupBy & Pivot', 'Merge & Concat', 'Работа с датами'],
    component: PandasLikbez,
  },
  {
    id: 'sql',
    title: 'SQL',
    subtitle: 'Полный курс по базам данных',
    tag: 'Database',
    level: 'Новичок → Middle',
    time: '~50 мин',
    chapters: 16,
    questions: 48,
    topics: ['SELECT & WHERE', 'GROUP BY & JOIN', 'NULL & CASE WHEN', 'Подзапросы', 'PostgreSQL vs MongoDB'],
    component: SqlLikbez,
  },
  {
    id: 'ml',
    title: 'Machine Learning',
    subtitle: 'Вся теория для собеседования на ML в БигТехе — мастхэв для стажёра/джуниора',
    tag: 'ML',
    level: 'Стажёр → Junior',
    time: '~90 мин',
    chapters: 5,
    questions: 67,
    topics: ['Линейные модели', 'Классификация', 'Деревья', 'Леса и бустинг', 'Кластеризация'],
    component: MlLikbez,
  },
]

const COMING = [
  { title: 'NumPy', tag: 'Python', desc: 'Массивы, линейная алгебра, векторизация' },
  { title: 'Git & GitHub', tag: 'DevOps', desc: 'Ветки, merge, rebase, PR, CI/CD' },
]

const TAG_COLORS = {
  'Python':     { bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)',  text: '#60a5fa' },
  'Database':   { bg: 'rgba(168,85,247,0.1)',  border: 'rgba(168,85,247,0.25)', text: '#c084fc' },
  'DevOps':     { bg: 'rgba(251,146,60,0.1)',  border: 'rgba(251,146,60,0.25)', text: '#fb923c' },
  'JavaScript': { bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.25)',  text: '#facc15' },
  'ML':         { bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.25)',  text: '#4ade80' },
}

export default function LikebezyPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  if (id) {
    const item = LIKEBEZY.find(l => l.id === id)
    if (item) {
      const Component = item.component
      return <Component onBack={() => navigate('/likebezy')} />
    }
  }

  const openLikbez = (itemId) => navigate(`/likebezy/${itemId}`)

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>

      {/* Hero */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{
          fontFamily: 'var(--font-syne)',
          fontSize: 'clamp(24px, 5vw, 36px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.2,
          marginBottom: 12,
        }}>
          Полные ликбезы
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          Структурированные конспекты по конкретным технологиям — всё необходимое от основ до уверенного
          применения в одном месте. Читай, разбирай примеры и сразу применяй на практике.
          После каждого раздела — вопросы для самопроверки с ответами.
        </p>
      </div>

      {/* Доступные ликбезы */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
          Доступно
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {LIKEBEZY.map(item => {
            const tagStyle = TAG_COLORS[item.tag] || TAG_COLORS['Python']
            return (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 12,
                  padding: 'clamp(16px, 3vw, 24px)',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s, transform 0.15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(200,255,0,0.4)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border-color)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
                onClick={() => openLikbez(item.id)}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                  <span style={{
                    background: tagStyle.bg, border: `1px solid ${tagStyle.border}`,
                    color: tagStyle.text, borderRadius: 6, padding: '3px 10px',
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  }}>{item.tag}</span>
                  <span style={{
                    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                    color: 'var(--text-tertiary)', borderRadius: 6, padding: '3px 10px',
                    fontSize: 11,
                  }}>{item.level}</span>
                </div>

                <h2 style={{
                  color: 'var(--text-primary)', fontSize: 'clamp(16px, 2.5vw, 20px)',
                  fontWeight: 700, marginBottom: 4,
                }}>{item.title}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 16 }}>{item.subtitle}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
                  {item.topics.map(t => (
                    <span key={t} style={{
                      background: 'var(--bg-tertiary)', borderRadius: 4, padding: '3px 8px',
                      fontSize: 11, color: 'var(--text-tertiary)', border: '1px solid var(--border-color)',
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16, color: 'var(--text-tertiary)', fontSize: 12 }}>
                  <span>~{item.chapters} глав</span>
                  <span>~{item.questions} вопросов для самопроверки</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{item.time}</span>
                  <span style={{
                    background: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.25)',
                    color: 'var(--accent-lime)', borderRadius: 6, padding: '5px 14px',
                    fontSize: 12, fontWeight: 600,
                  }}>Читать →</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Скоро */}
      <div>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 16 }}>
          Скоро
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 12 }}>
          {COMING.map(item => {
            const tagStyle = TAG_COLORS[item.tag] || TAG_COLORS['Python']
            return (
              <div
                key={item.title}
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 10,
                  padding: 16,
                  opacity: 0.6,
                }}
              >
                <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                  <span style={{
                    background: tagStyle.bg, border: `1px solid ${tagStyle.border}`,
                    color: tagStyle.text, borderRadius: 6, padding: '2px 8px',
                    fontSize: 10, fontWeight: 700,
                  }}>{item.tag}</span>
                </div>
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{item.title}</div>
                <div style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>{item.desc}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
