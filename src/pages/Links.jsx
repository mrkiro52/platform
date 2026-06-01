import { useState, useEffect } from 'react'
import { api } from '../api'

const CHANNELS = [
  {
    href: 'https://t.me/kiro_team',
    icon: '📣',
    title: 'Канал KIRO Team',
    desc: 'Главный канал сообщества. Объявления, новости и важная информация о лагере.',
    tag: '→ Открыть в Telegram',
  },
  {
    href: 'https://t.me/kiro_team_manager',
    icon: '👨‍💼',
    title: 'Менеджер',
    desc: 'Вопросы по оплате, доступу и организационным моментам — пиши менеджеру.',
    tag: '→ Написать менеджеру',
  },
]

export default function Links({ onNavigate }) {
  const [usefulLinks, setUsefulLinks] = useState([])

  useEffect(() => {
    api.links().then(setUsefulLinks).catch(() => {})
  }, [])

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Полезные ссылки</h1>
        <p className="page-subtitle">Каналы, контакты и материалы для участников</p>
      </div>

      <div className="community-grid">
        {CHANNELS.map((c, i) => (
          <a key={i} className="community-card" href={c.href} target="_blank" rel="noopener">
            <div className="community-card-icon">{c.icon}</div>
            <div className="community-card-title">{c.title}</div>
            <div className="community-card-desc">{c.desc}</div>
            <div className="community-card-tag">{c.tag}</div>
          </a>
        ))}

        {usefulLinks.map(link => (
          <a
            key={link.id}
            className="community-card"
            href={link.url}
            target="_blank"
            rel="noopener"
          >
            <div className="community-card-icon">🔗</div>
            <div className="community-card-title">{link.title}</div>
            <div className="community-card-desc">{link.description}</div>
            <div className="community-card-tag">→ Открыть</div>
          </a>
        ))}

        <div
          className="community-card"
          style={{
            border: '2px dashed var(--border-color)',
            background: 'rgba(200,255,0,0.02)',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'default',
          }}
        >
          <div className="community-card-icon">🔗</div>
          <div className="community-card-title">Полезные материалы</div>
          <div className="community-card-desc">
            Здесь будут размещаться ссылки на статьи, видео, документацию и другие материалы по ходу лагеря.
          </div>
          <div
            style={{
              fontSize: 11,
              color: 'var(--text-tertiary)',
              marginTop: 'auto',
              paddingTop: 8,
              borderTop: '1px solid var(--border-color)',
            }}
          >
            Скоро добавим →
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 32,
          padding: '16px',
          background: 'rgba(200,255,0,0.05)',
          borderRadius: '8px',
          fontSize: 13,
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <strong>Где найти другие материалы:</strong>
        <ul style={{ marginTop: 8 }}>
          <li>
            Домашнее задание — в{' '}
            <button
              onClick={() => onNavigate('tasks')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-lime)',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                font: 'inherit',
              }}
            >
              Заданиях
            </button>
          </li>
          <li style={{ marginTop: 4 }}>
            Материалы по дням лагеря — в{' '}
            <button
              onClick={() => onNavigate('library')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-lime)',
                fontWeight: 700,
                cursor: 'pointer',
                textDecoration: 'underline',
                padding: 0,
                font: 'inherit',
              }}
            >
              Библиотеке знаний
            </button>
          </li>
        </ul>
      </div>
    </section>
  )
}
