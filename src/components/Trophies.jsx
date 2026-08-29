import trophySummer2026 from '../assets/trophy-summer-camp-2026.webp'

// Реестр трофеев: каждый — картинка + условие получения по полю профиля.
// Чтобы добавить трофей осеннего лагеря, когда появится арт, достаточно
// дописать сюда ещё один объект с check: p => p.isAutumnCamp2026.
const TROPHY_DEFS = [
  {
    key: 'summer2026',
    title: 'KIRO SUMMER CAMP 2026',
    subtitle: 'Участник летнего лагеря 2026',
    image: trophySummer2026,
    check: p => p?.isSummerCamp2026,
  },
]

export default function Trophies({ profile }) {
  const earned = TROPHY_DEFS.filter(t => t.check(profile))

  if (earned.length === 0) {
    return (
      <div style={{
        textAlign: 'center', padding: '40px 20px', color: 'var(--text-tertiary)',
        fontSize: 13.5, background: 'var(--bg-tertiary)', borderRadius: 12,
      }}>
        Пока нет трофеев
      </div>
    )
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 16 }}>
      {earned.map(t => (
        <div
          key={t.key}
          style={{
            background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
            borderRadius: 12, padding: 14, textAlign: 'center',
          }}
        >
          <img
            src={t.image}
            alt={t.title}
            style={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'contain', display: 'block', marginBottom: 10 }}
          />
          <div style={{ fontFamily: 'var(--font-syne)', fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
            {t.title}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
            {t.subtitle}
          </div>
        </div>
      ))}
    </div>
  )
}
