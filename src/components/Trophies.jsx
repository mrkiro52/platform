import { useState } from 'react'
import trophySummer2026 from '../assets/trophy-summer-camp-2026.webp'
import trophyAutumn2026 from '../assets/trophy-autumn-camp-2026.webp'

// Замок с осеннего трофея снимается 30 ноября 2026, 23:59:59 (конец месяца лагеря)
const AUTUMN_2026_UNLOCK_AT = new Date(2026, 10, 30, 23, 59, 59)

const SHARE_CAPTION = 'Получил новый трофей от KIRO TEAM'

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

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
      <path d="M12 16V4" />
      <path d="M7 9l5-5 5 5" />
      <path d="M5 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    </svg>
  )
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

async function saveTrophyImage(trophy, displayName) {
  const img = await loadImage(trophy.image)

  const W = 900
  const imgH = Math.round(W / (img.naturalWidth / img.naturalHeight))
  const topH = 130
  const bottomH = 90
  const H = topH + imgH + bottomH

  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#08080A'
  ctx.fillRect(0, 0, W, H)

  try {
    await Promise.all([
      document.fonts.load('800 46px Unbounded'),
      document.fonts.load('700 24px Manrope'),
    ])
  } catch { /* если шрифты не подгрузились — рисуем системным фолбэком */ }

  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.font = '800 46px Unbounded, sans-serif'
  ctx.fillStyle = '#FFD60A'
  ctx.fillText(displayName, W / 2, topH / 2)

  ctx.drawImage(img, 0, topH, W, imgH)

  ctx.font = '700 24px Manrope, sans-serif'
  ctx.fillStyle = '#F6F6F4'
  ctx.fillText(SHARE_CAPTION, W / 2, topH + imgH + bottomH / 2)

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'))
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${trophy.key}-${displayName}.png`
  a.click()
  URL.revokeObjectURL(url)
}

function ShareModal({ trophy, displayName, onClose }) {
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await saveTrophyImage(trophy, displayName)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500, padding: 20,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)',
          padding: 24, maxWidth: 380, width: '100%', boxShadow: 'var(--shadow-hover)', textAlign: 'center',
        }}
      >
        <div style={{ fontFamily: 'var(--font-syne)', fontSize: 22, fontWeight: 800, color: 'var(--accent-lime)', marginBottom: 14 }}>
          {displayName}
        </div>
        <img
          src={trophy.image}
          alt={trophy.title}
          style={{ width: '100%', aspectRatio: '2 / 3', objectFit: 'contain', display: 'block' }}
        />
        <div style={{ fontFamily: 'var(--font-inter)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 14 }}>
          {SHARE_CAPTION}
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              flex: 1, background: 'var(--accent-lime)', color: 'var(--on-accent)', border: 'none', borderRadius: 12,
              padding: '10px 16px', fontSize: 13.5, fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              opacity: saving ? 0.6 : 1,
            }}
          >
            {saving ? 'Сохранение...' : 'Сохранить'}
          </button>
          <button
            onClick={onClose}
            style={{
              background: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-color)',
              borderRadius: 12, padding: '10px 16px', fontSize: 13.5, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Trophies({ profile }) {
  const [sharing, setSharing] = useState(null)
  const earned = TROPHY_DEFS.filter(t => t.check(profile))
  const displayName = profile?.displayName || profile?.nickname || profile?.name || 'Участник'

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
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 16 }}>
        {earned.map(t => {
          const locked = t.unlockAt && Date.now() < t.unlockAt.getTime()
          return (
            <div
              key={t.key}
              style={{
                position: 'relative', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                borderRadius: 12, padding: 14, textAlign: 'center',
              }}
            >
              {!locked && (
                <button
                  onClick={() => setSharing(t)}
                  title="Поделиться"
                  style={{
                    position: 'absolute', top: 8, right: 8, zIndex: 2, width: 28, height: 28, border: 'none',
                    background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', padding: 0, filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))',
                  }}
                >
                  <ShareIcon />
                </button>
              )}
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

      {sharing && (
        <ShareModal trophy={sharing} displayName={displayName} onClose={() => setSharing(null)} />
      )}
    </>
  )
}
