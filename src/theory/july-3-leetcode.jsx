const LinkCard = ({ href, title, desc, accent }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'block',
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 12,
      padding: 'clamp(16px, 3vw, 24px)',
      textDecoration: 'none',
      transition: 'border-color 0.15s, transform 0.15s',
      marginBottom: 16,
    }}
    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'translateY(0)' }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
      <div>
        <div style={{ color: accent, fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{title}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6 }}>{desc}</div>
      </div>
      <span style={{ color: accent, fontSize: 20, flexShrink: 0 }}>→</span>
    </div>
  </a>
)

export default function July3LeetcodeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Нарешиваем LeetCode</h1>
        <p className="theory-subtitle">Все треки</p>
        <p className="theory-date">3 июля 2026</p>
        <p>
          Сегодня практикуем алгоритмическую секцию технических собеседований — ту самую, которую спрашивают
          в БигТехе. Будем разбирать классические задачи вместе на созвоне в 20:00.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что нужно сделать перед занятием</h2>
        <p className="theory-text" style={{ marginBottom: 20 }}>
          Заведи аккаунты на двух платформах — они понадобятся нам сегодня и в дальнейшем для тренировки
          алгоритмических задач:
        </p>

        <LinkCard
          href="https://leetcode.com"
          title="LeetCode"
          desc="Главная международная площадка с задачами уровня технических собеседований в BigTech. Зарегистрируйся и будь готов(а) решать вместе с нами."
          accent="var(--accent-lime)"
        />

        <LinkCard
          href="https://coderun.yandex.ru/selections/algorithm-training-september-2025"
          title="Yandex CodeRun — Алгоритмический тренинг"
          desc="Платформа Яндекса для тренировки алгоритмов. Тоже потребуется зарегистрироваться заранее."
          accent="#60a5fa"
        />

        <p className="theory-text" style={{ marginTop: 20 }}>
          Больше материалов по этому занятию скоро появится здесь.
        </p>
      </section>
    </div>
  )
}
