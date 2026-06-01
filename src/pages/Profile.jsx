function getInitials(name) {
  return name.split(' ').map(p => p[0] || '').join('').toUpperCase().slice(0, 2)
}

const TARIFF_FEATURES = [
  '12 недель полной программы',
  'Еженедельный личный созвон с Ханилем',
  'Индивидуальный feedback по проектам',
  'Доступ ко всем материалам навсегда',
  '4 Insider Show с BigTech-специалистами',
  'Демо-день и возможность рефералки',
]

export default function Profile({ user }) {
  if (!user) return null
  const initials = getInitials(user.name)
  const tariffStr = `${user.plan} · ${user.tariff.toLocaleString('ru')} ₽`

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Профиль</h1>
        <p className="page-subtitle">Информация об аккаунте и настройки</p>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-name">{user.name}</div>
          <div className="profile-email">{user.email}</div>
          <div className="profile-track-badge">
            <span>🎨</span> <span>{user.track}</span>
          </div>
          <div className="profile-stats-mini">
            <div className="psm"><div className="psm-val">{user.points}</div><div className="psm-label">Очков</div></div>
            <div className="psm"><div className="psm-val">{user.streak}</div><div className="psm-label">Дней стрик</div></div>
            <div className="psm"><div className="psm-val">{user.completedTasks}</div><div className="psm-label">Заданий</div></div>
            <div className="psm"><div className="psm-val">1</div><div className="psm-label">Неделя</div></div>
          </div>
        </div>

        <div className="profile-details">
          <div className="profile-section-h">Информация об аккаунте</div>
          <div className="profile-field">
            <span className="pf-label">Имя</span>
            <span className="pf-value">{user.name}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Email</span>
            <span className="pf-value">{user.email}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Тариф</span>
            <span className="pf-value">{tariffStr}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Трек</span>
            <span className="pf-value">{user.track}</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Старт лагеря</span>
            <span className="pf-value">1 июня 2026</span>
          </div>
          <div className="profile-field">
            <span className="pf-label">Финал</span>
            <span className="pf-value">31 августа 2026 · Демо-день</span>
          </div>

          <div className="profile-section-h" style={{ marginTop: 20 }}>Что входит в тариф</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {TARIFF_FEATURES.map((f, i) => (
              <div key={i} style={{ display:'flex', gap:8, alignItems:'flex-start', fontSize:13, color:'var(--text-secondary)' }}>
                <span style={{ color:'var(--accent-lime)', fontWeight:700, flexShrink:0 }}>✓</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
