import trophySummer2026 from '../assets/trophy-summer-camp-2026.webp'
import trophyAutumn2026 from '../assets/trophy-autumn-camp-2026.webp'

// Замок с осеннего трофея снимается 30 ноября 2026, 23:59:59 (конец месяца лагеря)
const AUTUMN_2026_UNLOCK_AT = new Date(2026, 10, 30, 23, 59, 59)

// Реестр трофеев: каждый — картинка + условие получения по полю профиля.
// unlockAt (опционально) — до этой даты трофей показывается серым с замком,
// хотя уже засчитан пользователю.
const TROPHY_DEFS = [
  {
    key: 'summer2026',
    title: 'KIRO SUMMER CAMP 2026',
    subtitle: 'Участник летнего лагеря 2026',
    image: trophySummer2026,
    check: p => p?.isSummerCamp2026,
  },
  {
    key: 'autumn2026',
    title: 'KIRO AUTUMN CAMP 2026',
    subtitle: 'Участник осеннего лагеря 2026',
    image: trophyAutumn2026,
    check: p => p?.isAutumnCamp2026,
    unlockAt: AUTUMN_2026_UNLOCK_AT,
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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
      {earned.map(t => {
        const locked = t.unlockAt && Date.now() < t.unlockAt.getTime()
        return (
          <div
            key={t.key}
            style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
              borderRadius: 12, padding: 14, textAlign: 'center',
            }}
          >
            <div style={{ position: 'relative', marginBottom: 10 }}>
              <img
                src={t.image}
                alt={t.title}
                style={{
                  width: '100%', aspectRatio: '2 / 3', objectFit: 'contain', display: 'block',
                  filter: locked ? 'grayscale(1) brightness(0.55)' : 'none',
                }}
              />
              {locked && (
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32,
                }}>
                  🔒
                </div>
              )}
            </div>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>
              {t.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>
              {t.subtitle}
            </div>
            {locked && (
              <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', marginTop: 6 }}>
                Выдается 30.11.2026
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
