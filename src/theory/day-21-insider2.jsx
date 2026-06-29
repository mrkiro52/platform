export default function Day21Insider2Theory() {
  return (
    <div className="theory-content">
      <h1 className="theory-title">Insider Show #2 — Гриша из Сбера / ВКонтакте</h1>

      <p className="theory-text">
        На втором Insider Show мы пообщались с Гришей — разработчиком с опытом работы в крупнейших российских IT-компаниях: Сбере и ВКонтакте. Обсудили карьерный путь в BigTech, реалии работы в больших командах и как джуну попасть на первую работу.
      </p>

      <div style={{
        margin: '32px 0',
        padding: '24px 28px',
        background: 'rgba(160, 122, 255, 0.07)',
        border: '1px solid rgba(160, 122, 255, 0.25)',
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', color: '#a07aff', opacity: 0.85 }}>
          Запись встречи
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, margin: 0, lineHeight: 1.6 }}>
          Полная запись разговора с Гришей доступна по ссылке ниже.
        </p>
        <a
          href="https://disk.yandex.ru/i/53cHjzvFbvmSbw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 4,
            padding: '10px 20px',
            background: 'rgba(160, 122, 255, 0.15)',
            border: '1px solid rgba(160, 122, 255, 0.4)',
            borderRadius: 8,
            color: '#c4a7ff',
            fontWeight: 600,
            fontSize: 14,
            textDecoration: 'none',
            width: 'fit-content',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(160, 122, 255, 0.25)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(160, 122, 255, 0.15)'}
        >
          🔗 Смотреть запись Insider Show #2
        </a>
      </div>
    </div>
  )
}
