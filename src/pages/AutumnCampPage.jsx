import { useState } from 'react'

const OS_INSTALL = {
  vscode: [
    {
      os: 'Windows',
      steps: 'Скачай установщик с официального сайта и запусти — мастер поставит всё сам.',
      code: 'winget install -e --id Microsoft.VisualStudioCode',
    },
    {
      os: 'macOS',
      steps: 'Скачай .zip с сайта и перетащи VS Code в Applications, либо через Homebrew:',
      code: 'brew install --cask visual-studio-code',
    },
    {
      os: 'Linux',
      steps: 'Скачай .deb/.rpm с сайта, либо поставь через snap:',
      code: 'sudo snap install code --classic',
    },
  ],
  git: [
    {
      os: 'Windows',
      steps: 'Скачай Git for Windows — он же ставит Git Bash:',
      code: 'winget install --id Git.Git -e',
    },
    {
      os: 'macOS',
      steps: 'Через Homebrew, либо командой ниже macOS сам предложит поставить Command Line Tools:',
      code: 'brew install git',
    },
    {
      os: 'Linux',
      steps: 'Через пакетный менеджер дистрибутива:',
      code: 'sudo apt install git   # Debian/Ubuntu\nsudo dnf install git   # Fedora',
    },
  ],
  docker: [
    {
      os: 'Windows',
      steps: 'Поставь Docker Desktop (нужен включённый WSL2) с официального сайта docker.com.',
      code: '',
    },
    {
      os: 'macOS',
      steps: 'Docker Desktop с docker.com — выбери версию под свой чип (Intel или Apple Silicon).',
      code: '',
    },
    {
      os: 'Linux',
      steps: 'Docker Engine напрямую по официальной инструкции docs.docker.com/engine/install, либо Docker Desktop for Linux.',
      code: '',
    },
  ],
}

const VSCODE_EXTENSIONS = [
  'Python (Microsoft) — если будешь писать на Python',
  'ESLint + Prettier — Code formatter — для JS/TS',
  'GitLens — история и блейм прямо в редакторе',
  'Docker (Microsoft) — управление контейнерами из VS Code',
  'Live Server — быстрый предпросмотр HTML-страниц',
]

// Дни месяцев зафиксированы под 2026 год (осенний лагерь 2026)
const AUTUMN_MONTHS = [
  { label: 'Сентябрь', total: 30, start: new Date(2026, 8, 1) },
  { label: 'Октябрь',  total: 31, start: new Date(2026, 9, 1) },
  { label: 'Ноябрь',   total: 30, start: new Date(2026, 10, 1) },
]

// Групповые созвоны — каждую пятницу осени; дни считаются по дню недели,
// а не захардкожены, чтобы не разъехаться при правках дат месяцев выше.
function fridaysOf(month) {
  const days = []
  for (let d = 1; d <= month.total; d++) {
    const dt = new Date(month.start)
    dt.setDate(d)
    if (dt.getDay() === 5) days.push(d)
  }
  return days
}
const CALL_MONTHS = AUTUMN_MONTHS.map(m => ({ label: m.label, fridays: fridaysOf(m) }))

function InstallCard({ title, blocks }) {
  return (
    <div>
      <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 10px' }}>{title}</h4>
      <div className="install-grid">
        {blocks.map(b => (
          <div key={b.os} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent-lime)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {b.os}
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 8px' }}>{b.steps}</p>
            {b.code && (
              <pre style={{
                margin: 0, padding: '8px 10px', background: 'var(--bg-primary)', borderRadius: 8,
                fontFamily: 'var(--font-mono)', fontSize: 11.5, color: 'var(--text-primary)',
                overflowX: 'auto', whiteSpace: 'pre',
              }}>
                <code>{b.code}</code>
              </pre>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease', pointerEvents: 'none', flexShrink: 0 }}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

function AutumnProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {AUTUMN_MONTHS.map(m => {
        let done = 0
        const days = Array.from({ length: m.total }, (_, i) => {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          const isToday = d.getTime() === today.getTime()
          const isPast = d < today
          if (isToday || isPast) done++
          return { isToday, isPast }
        })
        const pct = Math.round((done / m.total) * 100)
        return (
          <div key={m.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ flexShrink: 0, width: 84 }}>
              <div style={{
                fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
                textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                {m.label}
              </div>
              <div style={{ fontFamily: 'var(--font-syne)', fontSize: 10.5, fontWeight: 700, color: '#FFB870', marginTop: 2 }}>
                {done}/{m.total} · {pct}%
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="autumn-days-grid">
                {days.map((d, i) => (
                  <div key={i} className={`autumn-day${d.isToday ? ' d-today' : d.isPast ? ' d-past' : ''}`} />
                ))}
              </div>
              <div className="autumn-bar-mobile">
                <div className="autumn-bar-fill" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function GroupCalls() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {CALL_MONTHS.map(m => (
        <div key={m.label}>
          <div style={{
            fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)',
            textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10,
          }}>
            {m.label}
          </div>
          <div className="calls-grid" style={{ '--calls-count': m.fridays.length }}>
            {m.fridays.map(day => (
              <div
                key={day}
                style={{
                  background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)', padding: '14px 12px', textAlign: 'center',
                }}
              >
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 20, fontWeight: 800, color: '#FFB870' }}>
                  {day}
                </div>
                <div style={{ fontSize: 10.5, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 8 }}>
                  {m.label.toLowerCase()}
                </div>
                <div style={{ fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Групповой созвон
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 4 }}>
                  Тема: будет скоро
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function AutumnCampPage() {
  const [open, setOpen] = useState(false)

  return (
    <section className="page active">
      <div className="autumn-hero">
        <div className="autumn-hero-left">
          <span className="autumn-hero-badge">🍂 Autumn Camp 2026</span>
          <span className="autumn-hero-title">Онбординг участника</span>
        </div>
        <button className="autumn-hero-toggle" onClick={() => setOpen(o => !o)}>
          {open ? 'Свернуть онбординг' : 'Раскрыть онбординг'}
          <ChevronIcon open={open} />
        </button>
      </div>

      <div className={`collapse-wrap${open ? ' open' : ''}`}>
        <div className="collapse-inner">
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Перед стартом лагеря
          </h2>

          <div className="widget" style={{ marginBottom: 16 }}>
            <div className="widget-header">
              <span className="widget-title">Заведи дневник лагеря</span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 10px' }}>
              Записывай, что прошёл, что понял, какие вопросы остались — это сильно помогает не растерять прогресс
              за месяц лагеря. Формат — любой, какой удобнее:
            </p>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>Папка с .docx-файлами — один файл на каждый день лагеря;</li>
              <li>Страница в Notion с разделом на каждый день;</li>
              <li>Обычная бумажная тетрадь;</li>
              <li>Любой другой удобный тебе способ — главное, чтобы ты его реально вёл.</li>
            </ul>
          </div>

          <div className="widget" style={{ marginBottom: 28 }}>
            <div className="widget-header">
              <span className="widget-title">Установи нужное ПО</span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 18px' }}>
              Понадобятся VS Code, Git и Docker. Инструкции под свою систему — ниже.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
              <InstallCard title="VS Code" blocks={OS_INSTALL.vscode} />
              <InstallCard title="Git" blocks={OS_INSTALL.git} />
              <InstallCard title="Docker" blocks={OS_INSTALL.docker} />
            </div>

            <h4 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: '20px 0 10px' }}>
              Плагины VS Code, которые пригодятся
            </h4>
            <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              {VSCODE_EXTENSIONS.map(ext => <li key={ext}>{ext}</li>)}
            </ul>
          </div>

          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
            Как будет устроено обучение
          </h2>

          <div className="widget" style={{ marginBottom: 16 }}>
            <div className="widget-header">
              <span className="widget-title">Материалы и задания</span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Прямо здесь, на платформе, ты будешь получать конспекты, видеолекции, ссылки на полезные внешние
              ресурсы и онлайн-тесты по темам. Вместе с материалами дня будут приходить и условия домашнего задания.
            </p>
          </div>

          <div className="widget" style={{ marginBottom: 28 }}>
            <div className="widget-header">
              <span className="widget-title">Как сдавать домашку</span>
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
              Готовое решение скидывай в личные сообщения Ханилю в Telegram —{' '}
              <a href="https://t.me/x_tap" target="_blank" rel="noopener" style={{ color: 'var(--accent-lime)', fontWeight: 600 }}>
                t.me/x_tap
              </a>
              . Формат любой: файлом с кодом, документом или просто фотографией решения из тетради.
            </p>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Прогресс лагеря
      </h2>
      <div className="widget" style={{ marginBottom: 28 }}>
        <AutumnProgress />
      </div>

      <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
        Групповые созвоны
      </h2>
      <div className="widget">
        <GroupCalls />
      </div>
    </section>
  )
}
