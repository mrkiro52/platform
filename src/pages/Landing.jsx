import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../landing.css'

const TG_MANAGER = 'https://t.me/kiro_team_manager'

/* ── Иконки (inline SVG, без внешних зависимостей) ──────────────── */
const Ico = {
  calendar: <><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
  chart: <><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>,
  chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
  code: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
  spark: <><path d="M12 2l1.9 5.8L20 9.7l-5 3.6L16.2 20 12 16.6 7.8 20 9 13.3l-5-3.6 6.1-1.9z" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></>,
  check: <polyline points="20 6 9 17 4 12" />,
}
function Icon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{Ico[name]}</svg>
  )
}

/* ── Счётчик, оживающий при попадании в вьюпорт ─────────────────── */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVal(to); return }

    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const dur = 1400
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur)
        setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))   // ease-out cubic
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.4 })

    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])

  return <div className="lp-stat-num" ref={ref}>{val}{suffix}</div>
}

/* ── Появление секций при скролле ───────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.lp-reveal')
    if (!items.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    items.forEach(i => io.observe(i))
    return () => io.disconnect()
  }, [])
}

const FEATURES = [
  { ico: 'calendar', t: 'Расписание', d: 'Программа по дням: тема занятия, время созвона и ссылка на встречу — всё в одном месте.' },
  { ico: 'book', t: 'Библиотека знаний', d: 'Конспект каждого занятия с разборами, схемами и примерами кода. Доступен навсегда.' },
  { ico: 'target', t: 'Тесты и домашки', d: 'После теории — проверка себя: тесты по материалу и практические задания с разбором.' },
  { ico: 'code', t: 'Тренажёры', d: '«Сложность алгоритмов» — угадай Big O по коду. «Что выведет?» — впиши вывод хитрого кода на Python.' },
  { ico: 'spark', t: 'Полные ликбезы', d: 'Отдельные мини-курсы: Python, ООП в Python, Pandas, SQL и Machine Learning для собеседований.' },
  { ico: 'users', t: 'Соцсеть лагеря', d: 'Своя лента, профили участников, подписки, реакции и комментарии — учишься не в одиночку.' },
  { ico: 'chat', t: 'Личные сообщения', d: 'Пиши однокурсникам напрямую, находи людей по нику, получай уведомления.' },
  { ico: 'chart', t: 'Прогресс', d: 'Дэшборд с твоей статистикой: пройденные задания, стрик и позиция в общем зачёте.' },
  { ico: 'shield', t: 'AntiReels', d: 'Лента коротких карточек по темам — полезный скролл вместо бесконечной ленты в соцсетях.' },
]

const MONTHS = [
  {
    n: 'Месяц 1', t: 'Июнь — Фундамент', s: '30 занятий: база, без которой дальше никак',
    topics: ['Программирование с нуля: типы, циклы, функции', 'Алгоритмическое мышление и Big O',
             'Структуры данных: списки, стек, очередь, хэш-таблицы, деревья', 'Git и командная работа',
             'Основы SQL, сети и REST API'],
  },
  {
    n: 'Месяц 2', t: 'Июль — Специализация', s: 'Выбираешь трек и уходишь вглубь',
    topics: ['Frontend: CSS, продвинутый JS, TypeScript, SSR и Next.js', 'Backend: архитектура, БД и ORM, микросервисы, FastAPI',
             'Аналитика и ML: NumPy, Pandas, статистика, нейросети и LLM', 'Кибербезопасность: сети, криптография, OWASP Top 10, CTF',
             'Пет-проекты, LeetCode и Insider Show с практиками'],
  },
  {
    n: 'Месяц 3', t: 'Август — Карьера', s: 'Готовим к реальному найму', accent: true,
    topics: ['Разбор резюме каждого студента лично', 'Подготовка к техническим и поведенческим собеседованиям',
             'Разбор алгоритмов с LeetCode под формат собесов', 'Созвоны с ребятами из BigTech',
             'Сбор портфолио и стратегия откликов'],
  },
]

const TRACKS = [
  { e: '🎨', t: 'Frontend', d: 'HTML, CSS, JavaScript, TypeScript, React, SSR и оптимизация интерфейсов.', c: '#facc15' },
  { e: '⚙️', t: 'Backend', d: 'Python, базы данных и ORM, REST API, аутентификация, микросервисы.', c: '#60a5fa' },
  { e: '📊', t: 'Аналитика / ML', d: 'NumPy, Pandas, статистика, метрики, классические модели и нейросети.', c: '#4ade80' },
  { e: '🛡', t: 'Кибербезопасность', d: 'Сети, операционные системы, криптография, OWASP, CTF-задачи.', c: '#f87171' },
]

const MARQUEE = ['Big O', 'Структуры данных', 'Git', 'SQL', 'REST API', 'Python', 'TypeScript', 'React',
                 'Pandas', 'NumPy', 'Machine Learning', 'LLM', 'Docker', 'OWASP Top 10', 'Криптография',
                 'LeetCode', 'Пет-проекты', 'Резюме', 'Собеседования']

export default function Landing() {
  const navigate = useNavigate()
  const [stuck, setStuck] = useState(false)
  useReveal()

  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toLogin = () => navigate('/login')

  return (
    <div className="lp">
      {/* ── Шапка ─────────────────────────────────────────────── */}
      <header className={`lp-nav${stuck ? ' is-stuck' : ''}`}>
        <div className="lp-container lp-nav-inner">
          <span className="lp-logo">KIRO PLATFORM</span>
          <nav className="lp-nav-links">
            <a className="lp-nav-link" href="#features">Платформа</a>
            <a className="lp-nav-link" href="#program">Программа</a>
            <a className="lp-nav-link" href="#tracks">Треки</a>
            <a className="lp-nav-link" href="#practice">Практика</a>
          </nav>
          <button className="lp-btn lp-btn--primary lp-btn--sm lp-nav-cta" onClick={toLogin}>
            Войти <span className="lp-btn-arrow">→</span>
          </button>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-grid-bg" />
        <div className="lp-orb lp-orb--1" />
        <div className="lp-orb lp-orb--2" />

        <div className="lp-container lp-hero-inner">
          <div>
            <span className="lp-hero-badge">
              <span className="lp-hero-dot" /> IT Summer Camp &apos;26 · 3 месяца обучения
            </span>
            <h1>Путь в IT — <em>от первой строчки кода</em> до оффера</h1>
            <p className="lp-hero-sub">
              Образовательная платформа KIRO: программа на три месяца, четыре трека на выбор,
              тренажёры, живые созвоны и подготовка к собеседованиям. Всё обучение — в одном месте.
            </p>
            <div className="lp-hero-cta">
              <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={toLogin}>
                Войти на платформу <span className="lp-btn-arrow">→</span>
              </button>
              <a className="lp-btn lp-btn--onDark lp-btn--lg" href={TG_MANAGER} target="_blank" rel="noopener">
                Получить доступ
              </a>
            </div>
            <p className="lp-hero-note">
              <b>Уже учишься?</b> Входи по логину от менеджера — весь прогресс на месте.
            </p>
          </div>

          {/* Иллюстрация платформы — чистая вёрстка, без картинок */}
          <div style={{ position: 'relative' }}>
            <div className="lp-mock">
              <div className="lp-mock-bar">
                <span className="lp-mock-dot" style={{ background: '#ff5f57' }} />
                <span className="lp-mock-dot" style={{ background: '#febc2e' }} />
                <span className="lp-mock-dot" style={{ background: '#28c840' }} />
                <span className="lp-mock-url">kirocamp.ru/dashboard</span>
              </div>
              <div className="lp-mock-body">
                <aside className="lp-mock-side">
                  <span className="lp-mock-navitem is-active" />
                  <span className="lp-mock-navitem" style={{ width: '80%' }} />
                  <span className="lp-mock-navitem" style={{ width: '65%' }} />
                  <span className="lp-mock-navitem" style={{ width: '85%' }} />
                  <span className="lp-mock-navitem" style={{ width: '70%' }} />
                  <span className="lp-mock-navitem" style={{ width: '55%' }} />
                </aside>
                <main className="lp-mock-main">
                  <div className="lp-mock-stats">
                    <div className="lp-mock-stat"><b>840</b><span>очков</span></div>
                    <div className="lp-mock-stat"><b>12</b><span>стрик</span></div>
                    <div className="lp-mock-stat"><b>49</b><span>занятий</span></div>
                  </div>
                  <div className="lp-mock-card">
                    <div className="lp-mock-line w60" />
                    <div className="lp-mock-progress">
                      <span style={{ width: '72%' }} />
                    </div>
                  </div>
                  <div className="lp-mock-card">
                    <div className="lp-mock-line w80" />
                    <div className="lp-mock-line w40" />
                  </div>
                </main>
              </div>
            </div>

            <span className="lp-float lp-float--a"><i>✅</i> Тест пройден</span>
            <span className="lp-float lp-float--b"><i>🔥</i> Стрик 12 дней</span>
            <span className="lp-float lp-float--c"><i>🎙</i> Insider Show</span>
          </div>
        </div>
      </section>

      {/* ── Бегущая строка тем ────────────────────────────────── */}
      <div className="lp-marquee" aria-hidden="true">
        <div className="lp-marquee-track">
          {[...MARQUEE, ...MARQUEE].map((m, i) => (
            <span className="lp-marquee-item" key={i}>{m}</span>
          ))}
        </div>
      </div>

      {/* ── Цифры ─────────────────────────────────────────────── */}
      <section className="lp-section lp-section--tight">
        <div className="lp-container">
          <div className="lp-stats">
            <div className="lp-stat lp-reveal"><Counter to={3} /><div className="lp-stat-label">месяца программы</div></div>
            <div className="lp-stat lp-reveal" data-d="1"><Counter to={49} suffix="+" /><div className="lp-stat-label">занятий с конспектами</div></div>
            <div className="lp-stat lp-reveal" data-d="2"><Counter to={4} /><div className="lp-stat-label">трека на выбор</div></div>
            <div className="lp-stat lp-reveal" data-d="3"><Counter to={5} /><div className="lp-stat-label">полных ликбеза</div></div>
          </div>
        </div>
      </section>

      {/* ── Возможности платформы ─────────────────────────────── */}
      <section className="lp-section" id="features">
        <div className="lp-container">
          <div className="lp-center lp-reveal">
            <span className="lp-eyebrow">Платформа</span>
            <h2 className="lp-h2">Всё обучение — в одном окне</h2>
            <p className="lp-lead">
              Не разрозненные чаты и папки на диске, а собранная система: теория, практика,
              прогресс и общение с одногруппниками.
            </p>
          </div>

          <div className="lp-features">
            {FEATURES.map((f, i) => (
              <article className="lp-feature lp-reveal" data-d={String(i % 4)} key={f.t}>
                <div className="lp-feature-ico"><Icon name={f.ico} /></div>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Программа ─────────────────────────────────────────── */}
      <section className="lp-section" id="program" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="lp-container">
          <div className="lp-center lp-reveal">
            <span className="lp-eyebrow">Программа</span>
            <h2 className="lp-h2">Три месяца — от нуля до собеседования</h2>
            <p className="lp-lead">
              Каждый месяц закрывает свою задачу. Присоединился позже — материалы
              прошлых месяцев открываются сразу.
            </p>
          </div>

          <div className="lp-months">
            {MONTHS.map((m, i) => (
              <article className={`lp-month lp-reveal${m.accent ? ' lp-month--accent' : ''}`} data-d={String(i)} key={m.t}>
                <div className="lp-month-num">{m.n}</div>
                <h3>{m.t}</h3>
                <p className="lp-month-sub">{m.s}</p>
                <div className="lp-month-topics">
                  {m.topics.map(t => <div className="lp-month-topic" key={t}>{t}</div>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Треки ─────────────────────────────────────────────── */}
      <section className="lp-section" id="tracks">
        <div className="lp-container">
          <div className="lp-center lp-reveal">
            <span className="lp-eyebrow">Направления</span>
            <h2 className="lp-h2">Выбираешь трек — и уходишь вглубь</h2>
            <p className="lp-lead">
              Первый месяц общий для всех. Дальше — своя программа под выбранное направление.
            </p>
          </div>

          <div className="lp-tracks">
            {TRACKS.map((t, i) => (
              <article className="lp-track lp-reveal" data-d={String(i)} key={t.t}>
                <span className="lp-track-emoji">{t.e}</span>
                <h3>{t.t}</h3>
                <p>{t.d}</p>
                <div className="lp-track-bar"><span style={{ width: '100%', background: t.c }} /></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Практика: тренажёры ───────────────────────────────── */}
      <section className="lp-section" id="practice" style={{ background: 'var(--bg-tertiary)' }}>
        <div className="lp-container lp-split">
          <div className="lp-reveal">
            <span className="lp-eyebrow">Практика</span>
            <h2 className="lp-h2">Тренажёры, а не только конспекты</h2>
            <p className="lp-lead">
              Читать про алгоритмы и уметь их разбирать — разные вещи. На платформе есть
              интерактивные тренировки, которые доводят навык до автоматизма.
            </p>
            <div className="lp-checklist">
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span><b>Сложность алгоритмов</b> — смотришь на код и определяешь его Big O</span>
              </div>
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span><b>Что выведет? (Python)</b> — вписываешь точный вывод неочевидного кода</span>
              </div>
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span><b>Тесты после каждой темы</b> — сразу видно, что не усвоилось</span>
              </div>
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span><b>Разбор задач с LeetCode</b> — под формат реальных собеседований</span>
              </div>
            </div>
          </div>

          <div className="lp-demo lp-reveal" data-d="1">
            <div className="lp-demo-head"><Icon name="code" size={15} /> Сложность алгоритмов</div>
            <pre className="lp-demo-code">
{`  `}<span className="c-key">def</span> <span className="c-fn">find_pair</span>(nums, target):{`
    `}seen = <span className="c-fn">set</span>(){`
    `}<span className="c-key">for</span> n <span className="c-key">in</span> nums:{`
        `}<span className="c-key">if</span> target - n <span className="c-key">in</span> seen:{`
            `}<span className="c-key">return</span> <span className="c-num">True</span>{`
        `}seen.<span className="c-fn">add</span>(n){`
    `}<span className="c-key">return</span> <span className="c-num">False</span><span className="lp-demo-caret" />
            </pre>
            <div className="lp-demo-opts">
              <span className="lp-demo-opt">O(1)</span>
              <span className="lp-demo-opt is-right">O(n)</span>
              <span className="lp-demo-opt">O(n²)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Соцсеть ───────────────────────────────────────────── */}
      <section className="lp-section">
        <div className="lp-container lp-split">
          <div className="lp-social-card lp-reveal">
            <div className="lp-post-head">
              <div className="lp-ava">АК</div>
              <div>
                <div className="lp-post-name">Анна К.</div>
                <div className="lp-post-time">2 часа назад</div>
              </div>
            </div>
            <p className="lp-post-text">
              Дожала пет-проект на React за выходные 🎉 Спасибо всем, кто помогал
              в комментариях — без вас бы застряла на роутинге.
            </p>
            <div className="lp-reactions">
              <span className="lp-reaction is-on">❤️ 12</span>
              <span className="lp-reaction">🤯 4</span>
              <span className="lp-reaction">👏 9</span>
              <span className="lp-reaction">🥳 3</span>
            </div>
          </div>

          <div className="lp-reveal" data-d="1">
            <span className="lp-eyebrow">Комьюнити</span>
            <h2 className="lp-h2">Учиться в одиночку — тяжело</h2>
            <p className="lp-lead">
              Внутри платформы своя соцсеть: общая стена, профили участников, подписки,
              реакции и комментарии. Плюс личные сообщения и уведомления, чтобы ничего не терялось.
            </p>
            <div className="lp-checklist">
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span>Делись прогрессом и получай обратную связь от группы</span>
              </div>
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span>Находи людей по нику и пиши напрямую</span>
              </div>
              <div className="lp-check">
                <span className="lp-check-ico"><Icon name="check" size={13} /></span>
                <span>Живые созвоны и Insider Show с ребятами из индустрии</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Финальный CTA ─────────────────────────────────────── */}
      <section className="lp-final">
        <div className="lp-orb lp-orb--1" style={{ top: '-180px', right: '10%' }} />
        <div className="lp-orb lp-orb--2" style={{ bottom: '-200px', left: '8%' }} />
        <div className="lp-container">
          <h2>Начни учиться сегодня</h2>
          <p>
            Три месяца программы, тренажёры, комьюнити и подготовка к собеседованиям —
            всё уже открыто внутри платформы.
          </p>
          <div className="lp-final-cta">
            <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={toLogin}>
              Войти на платформу <span className="lp-btn-arrow">→</span>
            </button>
            <a className="lp-btn lp-btn--onDark lp-btn--lg" href={TG_MANAGER} target="_blank" rel="noopener">
              Получить доступ
            </a>
          </div>
          <p className="lp-final-note">
            Доступ выдаётся менеджером после оплаты — напиши{' '}
            <a href={TG_MANAGER} target="_blank" rel="noopener">@kiro_team_manager</a>
          </p>
        </div>
      </section>

      {/* ── Подвал ────────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer-inner">
          <span>© 2026 KIRO IT Summer Camp</span>
          <span>
            <a href={TG_MANAGER} target="_blank" rel="noopener">@kiro_team_manager</a>
            {' · '}
            <a href="/login">Вход для студентов</a>
          </span>
        </div>
      </footer>
    </div>
  )
}
