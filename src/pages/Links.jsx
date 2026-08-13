import { useState, useEffect } from 'react'
import { api } from '../api'
import { SkeletonCard } from '../components/Skeleton'

const CHANNELS = [
  {
    href: 'https://t.me/kiro_team',
    title: 'Канал KIRO Team',
    desc: 'Главный канал сообщества. Объявления, новости и важная информация о лагере.',
    tag: '→ Открыть в Telegram',
  },
  {
    href: 'https://t.me/kiro_team_manager',
    title: 'Менеджер',
    desc: 'Вопросы по оплате, доступу и организационным моментам — пиши менеджеру.',
    tag: '→ Написать менеджеру',
  },
]

const LEARNING_PLATFORMS = [
  {
    href: 'https://www.kaggle.com/learn',
    title: 'Kaggle Learn',
    desc: 'Бесплатные мини-курсы по Data Science, ML, Python и другим направлениям.',
    tag: '→ Открыть',
  },
  {
    href: 'https://www.hackthebox.com',
    title: 'HackTheBox',
    desc: 'Платформа для практики пентестинга и взлома систем. Реальные сценарии и вызовы.',
    tag: '→ Открыть',
  },
  {
    href: 'https://tryhackme.com',
    title: 'TryHackMe',
    desc: 'Интерактивные курсы и лабы по кибербезопасности. От новичка до профессионала.',
    tag: '→ Открыть',
  },
  {
    href: 'https://picoctf.org',
    title: 'picoCTF',
    desc: 'Популярный CTF для обучения: флаги, задачи, вызовы. Регистрация на play.picoctf.org',
    tag: '→ Открыть',
  },
  {
    href: 'https://ringzer0team.com',
    title: 'RingZer0 CTF',
    desc: 'CTF платформа с задачами по криптографии, веб-безопасности и системам.',
    tag: '→ Открыть',
  },
  {
    href: 'https://codeby.net',
    title: 'Codeby Games',
    desc: 'Кибербезопасность в игровом формате. Задачи, флаги и обучающие челленджи.',
    tag: '→ Открыть',
  },
  {
    href: 'https://training.hackerdom.ru',
    title: 'Hackerdom (RuCTF)',
    desc: 'Платформа организаторов Russian CTF с обучающими задачами и соревнованиями.',
    tag: '→ Открыть',
  },
]

const SECURITY_RESOURCES = [
  {
    href: 'https://deiteriy.com',
    title: 'Deiteriy Security',
    desc: 'Компания и сообщество специалистов по кибербезопасности. Полезные материалы и услуги.',
    tag: '→ Открыть',
  },
  {
    href: 'https://www.gns3.com',
    title: 'GNS3',
    desc: 'Симулятор сетевых топологий. Строй сети, практикуй маршрутизацию и безопасность.',
    tag: '→ Открыть',
  },
]

const ARTICLES_AND_GUIDES = [
  {
    href: 'https://t.me/Young_and_Yandex',
    title: 'Young&Yandex',
    desc: 'Телеграм канал о стажировках и карьере в Яндексе. Советы и новости.',
    tag: '→ Открыть в Telegram',
  },
  {
    href: 'https://habr.com/ru/articles/1055310/',
    title: 'HTTP QUERY метод',
    desc: 'Статья про новый метод запроса QUERY в HTTP стандарте и его применение.',
    tag: '→ Открыть на Habr',
  },
  {
    href: 'https://habr.com/ru/articles/867012/',
    title: 'Как писать коммиты',
    desc: 'Подробное руководство по написанию хороших git коммитов. Best practices.',
    tag: '→ Открыть на Habr',
  },
]

export default function Links({ onNavigate }) {
  const [usefulLinks, setUsefulLinks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    api.links().then(setUsefulLinks).catch(() => {}).then(() => {
      const elapsed = Date.now() - startTime
      setTimeout(() => setLoading(false), Math.max(0, 1000 - elapsed))
    })
  }, [])

  if (loading) {
    return (
      <section className="page active">
        <div className="page-header">
          <h1 className="page-title">Полезные ссылки</h1>
          <p className="page-subtitle">Каналы, контакты и материалы для участников</p>
        </div>
        <div className="community-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <SkeletonCard key={i} />)}
        </div>
      </section>
    )
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Полезные ссылки</h1>
        <p className="page-subtitle">Каналы, контакты и материалы для участников</p>
      </div>

      <div className="community-grid">
        {CHANNELS.map((c, i) => (
          <a key={i} className="community-card" href={c.href} target="_blank" rel="noopener">
            <div className="community-card-title">{c.title}</div>
            <div className="community-card-desc">{c.desc}</div>
            <div className="community-card-tag">{c.tag}</div>
          </a>
        ))}
      </div>

      <h3 style={{marginTop: 32, marginBottom: 16, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)'}}>Платформы для обучения</h3>
      <div className="community-grid">
        {LEARNING_PLATFORMS.map((c, i) => (
          <a key={i} className="community-card" href={c.href} target="_blank" rel="noopener">
            <div className="community-card-title">{c.title}</div>
            <div className="community-card-desc">{c.desc}</div>
            <div className="community-card-tag">{c.tag}</div>
          </a>
        ))}
      </div>

      <h3 style={{marginTop: 32, marginBottom: 16, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)'}}>Ресурсы по кибербезопасности</h3>
      <div className="community-grid">
        {SECURITY_RESOURCES.map((c, i) => (
          <a key={i} className="community-card" href={c.href} target="_blank" rel="noopener">
            <div className="community-card-title">{c.title}</div>
            <div className="community-card-desc">{c.desc}</div>
            <div className="community-card-tag">{c.tag}</div>
          </a>
        ))}
      </div>

      <h3 style={{marginTop: 32, marginBottom: 16, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)'}}>Статьи и гайды</h3>
      <div className="community-grid">
        {ARTICLES_AND_GUIDES.map((c, i) => (
          <a key={i} className="community-card" href={c.href} target="_blank" rel="noopener">
            <div className="community-card-title">{c.title}</div>
            <div className="community-card-desc">{c.desc}</div>
            <div className="community-card-tag">{c.tag}</div>
          </a>
        ))}
      </div>

      {usefulLinks.length > 0 && (
        <>
          <h3 style={{marginTop: 32, marginBottom: 16, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)'}}>Дополнительные материалы</h3>
          <div className="community-grid">
            {usefulLinks.map(link => (
              <a
                key={link.id}
                className="community-card"
                href={link.url}
                target="_blank"
                rel="noopener"
              >
                <div className="community-card-title">{link.title}</div>
                <div className="community-card-desc">{link.description}</div>
                <div className="community-card-tag">→ Открыть</div>
              </a>
            ))}
          </div>
        </>
      )}

      <div
        style={{
          marginTop: 32,
          padding: '16px',
          background: 'rgba(32,190,255,0.05)',
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
