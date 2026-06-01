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

export default function Links() {
  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Полезные ссылки</h1>
        <p className="page-subtitle">Каналы и контакты для участников</p>
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
      </div>
    </section>
  )
}
