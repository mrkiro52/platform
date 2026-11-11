import { useEffect, useMemo, useState } from 'react'
import { api } from '../../api'

/* Ликбез «Рынок IT‑профессий». Открытая часть лежит здесь, закрытая (списки
   компаний и каналов, план на неделю) приходит с бэкенда только участникам
   лагеря — см. backend/src/routes/likbez.js. */

const ACCENT = '#FF6A00'
const ACCENT_HI = '#FF8C33'
const ACCENT_DIM = 'rgba(255,106,0,0.12)'
const ACCENT_LINE = 'rgba(255,106,0,0.35)'
const WINTER_FORM = 'https://forms.yandex.ru/u/6ae845b895add5074dae135b/'
const MONO = 'var(--font-mono)'

/* ═══════════════════════════ Shared UI ═══════════════════════════ */

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.8, margin: '10px 0', maxWidth: 780, ...style }}>{children}</p>
)
const B = ({ children }) => <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{children}</strong>

const Tag = ({ kind }) => (
  <span style={{
    display: 'inline-block', fontFamily: MONO, fontSize: 10, letterSpacing: 0.8, textTransform: 'uppercase',
    padding: '1px 6px', borderRadius: 4, marginRight: 8, verticalAlign: 'middle', whiteSpace: 'nowrap',
    color: kind === 'd' ? ACCENT_HI : 'var(--text-tertiary)',
    border: `1px solid ${kind === 'd' ? ACCENT : 'var(--border-color)'}`,
  }}>{kind === 'd' ? 'данные' : 'оценка'}</span>
)
const D = () => <Tag kind="d" />
const O = () => <Tag kind="o" />

const A = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: ACCENT_HI, textUnderlineOffset: 3 }}>{children}</a>
)

const SectionTitle = ({ id, kicker, question, children }) => (
  <div id={id} style={{ margin: '60px 0 18px', scrollMarginTop: 80 }}>
    <div style={{ color: ACCENT, fontFamily: MONO, fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>
    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, fontFamily: 'var(--font-syne)', margin: 0, lineHeight: 1.2 }}>{children}</h2>
    {question && <div style={{ color: 'var(--text-tertiary)', fontSize: 13, marginTop: 8 }}>{question}</div>}
    <div style={{ height: 2, background: ACCENT, marginTop: 14 }} />
  </div>
)

const SubTitle = ({ children }) => (
  <h3 style={{ color: 'var(--text-primary)', fontSize: 'clamp(16px, 2.6vw, 18px)', fontWeight: 700, margin: '30px 0 10px' }}>{children}</h3>
)

// Короткий ответ на вопрос главы
const Answer = ({ children }) => (
  <p style={{ color: 'var(--text-primary)', fontSize: 16.5, lineHeight: 1.6, borderLeft: `3px solid ${ACCENT}`, paddingLeft: 16, margin: '16px 0 20px', maxWidth: 760 }}>{children}</p>
)

const Note = ({ title, children }) => (
  <div style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_LINE}`, borderRadius: 10, padding: '14px 18px', margin: '18px 0', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
    {title && <div style={{ color: ACCENT_HI, fontFamily: MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{title}</div>}
    {children}
  </div>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.7, marginBottom: 6 }}>{item}</li>)}
  </ul>
)

// Список «название + подпись → пояснение»
const Rows = ({ items }) => (
  <div style={{ borderTop: '1px solid var(--border-color)', margin: '16px 0' }}>
    {items.map(([title, sub, body], i) => (
      <div key={i} className="itm-row">
        <div>
          <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 15.5, lineHeight: 1.35 }}>{title}</div>
          {sub && <div style={{ color: ACCENT_HI, fontFamily: MONO, fontSize: 12, marginTop: 5 }}>{sub}</div>}
        </div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 14.5, lineHeight: 1.7, minWidth: 0 }}>{body}</div>
      </div>
    ))}
  </div>
)

const Table = ({ headers, rows, caption, numeric = [] }) => (
  <div style={{ overflowX: 'auto', margin: '16px 0', border: '1px solid var(--border-color)', borderRadius: 10 }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 520 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ textAlign: numeric.includes(i) ? 'right' : 'left', padding: '10px 14px', background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-color)', whiteSpace: 'nowrap', fontFamily: MONO, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 500 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '10px 14px', borderBottom: i === rows.length - 1 ? 'none' : '1px solid var(--border-color)', color: j === 0 ? 'var(--text-primary)' : j === 1 && numeric.includes(1) ? ACCENT_HI : 'var(--text-secondary)', verticalAlign: 'top', textAlign: numeric.includes(j) ? 'right' : 'left', fontFamily: numeric.includes(j) ? MONO : 'inherit', fontVariantNumeric: 'tabular-nums' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {caption && <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border-color)', color: 'var(--text-tertiary)', fontSize: 12.5, lineHeight: 1.5 }}>{caption}</div>}
  </div>
)

const Figure = ({ title, caption, children }) => (
  <figure style={{ margin: 0, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(14px, 3vw, 22px)', minWidth: 0 }}>
    <div style={{ color: 'var(--text-primary)', fontSize: 15, fontWeight: 700, marginBottom: 16 }}>{title}</div>
    {children}
    {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, lineHeight: 1.5, marginTop: 14 }}>{caption}</figcaption>}
  </figure>
)

// Горизонтальные полосы. from/to в процентах шкалы: диапазон или значение от нуля
const Bars = ({ items }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr) auto', gap: '9px 12px', alignItems: 'center', fontSize: 13.5 }}>
    {items.map(([label, value, to, from = 0, grey]) => [
      <div key={label + 'l'} style={{ color: 'var(--text-secondary)', minWidth: 0, overflowWrap: 'anywhere' }}>{label}</div>,
      <div key={label + 'b'} style={{ height: 14, background: 'var(--bg-tertiary)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', marginLeft: `${from}%`, width: `${to - from}%`, background: grey ? '#5A5048' : ACCENT, borderRadius: 3 }} />
      </div>,
      <div key={label + 'v'} style={{ color: 'var(--text-primary)', fontFamily: MONO, fontSize: 13, textAlign: 'right' }}>{value}</div>,
    ])}
  </div>
)

const Kpis = ({ items }) => (
  <div className="itm-kpis">
    {items.map(([value, label, src]) => (
      <div key={label} style={{ background: 'var(--bg-secondary)', padding: 18, minWidth: 0 }}>
        <div style={{ color: ACCENT, fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(20px, 2.6vw, 28px)', whiteSpace: 'nowrap', lineHeight: 1.1 }}>{value}</div>
        <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.45, marginTop: 8 }}>{label}</div>
        {src && <div style={{ color: 'var(--text-tertiary)', fontFamily: MONO, fontSize: 11, marginTop: 6 }}>{src}</div>}
      </div>
    ))}
  </div>
)

const Cards = ({ items }) => (
  <div className="itm-cards">
    {items.map(([label, list]) => (
      <div key={label} style={{ background: 'var(--bg-primary)', padding: 18, minWidth: 0 }}>
        <div style={{ color: ACCENT, fontFamily: MONO, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
        <Ul items={list} />
      </div>
    ))}
  </div>
)

/* ═══════════════════════════ Закрытые блоки ═══════════════════════════ */

const btn = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, textAlign: 'center',
  borderRadius: 10, padding: '12px 18px', fontSize: 14, fontWeight: 700, fontFamily: 'inherit', lineHeight: 1.3,
}

const Lock = ({ title, inside }) => (
  <div style={{ border: `1px dashed ${ACCENT_LINE}`, background: ACCENT_DIM, borderRadius: 12, padding: 'clamp(18px, 4vw, 28px)', margin: '18px 0' }}>
    <div style={{ color: 'var(--text-primary)', fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title}</div>
    <Ul items={inside} />
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
      <button type="button" disabled style={{ ...btn, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
        Доступно только участникам лагеря KIRO IT CAMP
      </button>
      <a href={WINTER_FORM} target="_blank" rel="noopener noreferrer" style={{ ...btn, background: ACCENT, border: `1px solid ${ACCENT}`, color: '#08080A', textDecoration: 'none' }}>
        Оставь заявку на зимний поток
      </a>
    </div>
  </div>
)

// camp: undefined — не участник, 'loading', 'error' или загруженные данные
const Gate = ({ camp, title, inside, children }) => {
  if (!camp) return <Lock title={title} inside={inside} />
  if (camp === 'loading') return <P>Загружаем материалы для участников лагеря…</P>
  if (camp === 'error') return <Note>Не удалось загрузить закрытую часть. Обнови страницу. Если не помогло, напиши в поддержку лагеря.</Note>
  return children(camp)
}

const COMPANY_GROUPS = [
  ['small', 'Малые команды и стартапы', 'до 100 человек'],
  ['mid', 'Средние IT‑компании', '100–1000 человек'],
  ['large', 'Крупные, но не на слуху', 'от 1000 человек'],
  ['nonit', 'IT‑отделы вне IT', 'ритейл, транспорт, промышленность, финансы'],
]

function Companies({ data }) {
  const [group, setGroup] = useState('small')
  const [q, setQ] = useState('')
  const [onlyAcc, setOnlyAcc] = useState(false)
  const total = COMPANY_GROUPS.reduce((n, [k]) => n + data.companies[k].length, 0)
  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return data.companies[group].filter(c =>
      (!onlyAcc || c.accredited) &&
      (!needle || [c.name, c.about, c.city, ...(c.skills || [])].join(' ').toLowerCase().includes(needle)))
  }, [data, group, q, onlyAcc])

  return (
    <div style={{ margin: '18px 0' }}>
      <P>
        В списке <B>{total} компаний с открытыми вакансиями</B> на {data.updated.split('-').reverse().join('.')}. Источник: {data.source}.
        Убраны кадровые агентства и самые известные бренды, на которые откликаются все. Отметка «аккредитована» означает,
        что компания заявила о себе в реестре аккредитованных IT‑организаций Минцифры.
      </P>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '14px 0' }}>
        {COMPANY_GROUPS.map(([key, label, hint]) => (
          <button key={key} type="button" onClick={() => setGroup(key)} title={hint} style={{
            background: group === key ? ACCENT : 'var(--bg-secondary)', color: group === key ? '#08080A' : 'var(--text-secondary)',
            border: `1px solid ${group === key ? ACCENT : 'var(--border-color)'}`, borderRadius: 999, padding: '7px 14px',
            fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          }}>{label} · {data.companies[key].length}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center', marginBottom: 12 }}>
        <input id="itm-company-search" value={q} onChange={e => setQ(e.target.value)} placeholder="Поиск: Python, Казань, безопасность…" style={{
          flex: '1 1 240px', minWidth: 0, background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 8,
          padding: '9px 12px', color: 'var(--text-primary)', fontSize: 14, fontFamily: 'inherit',
        }} />
        <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--text-secondary)', fontSize: 13.5, cursor: 'pointer' }}>
          <input id="itm-company-acc" type="checkbox" checked={onlyAcc} onChange={e => setOnlyAcc(e.target.checked)} style={{ accentColor: ACCENT }} />
          только аккредитованные
        </label>
      </div>
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 10 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, minWidth: 720 }}>
          <thead>
            <tr>
              {['Компания и сайт', 'Чем занимается', 'Город', 'Размер', 'Вакансии'].map((h, i) => (
                <th key={h} style={{ textAlign: i === 4 ? 'right' : 'left', padding: '10px 12px', background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', borderBottom: '1px solid var(--border-color)', fontFamily: MONO, fontSize: 11, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 500, whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(c => (
              <tr key={c.habr}>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', minWidth: 170 }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{c.name}</div>
                  {c.site && <div style={{ marginTop: 3, overflowWrap: 'anywhere' }}><A href={c.site}>{c.site.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</A></div>}
                  {c.accredited && <div style={{ color: ACCENT_HI, fontFamily: MONO, fontSize: 10.5, marginTop: 4 }}>аккредитована</div>}
                </td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', verticalAlign: 'top', lineHeight: 1.5 }}>
                  {c.about}
                  {c.skills?.length > 0 && <div style={{ color: 'var(--text-tertiary)', fontSize: 12, marginTop: 4 }}>{c.skills.join(' · ')}</div>}
                </td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{c.city || 'удалённо'}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{c.size}</td>
                <td style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)', verticalAlign: 'top', textAlign: 'right', fontFamily: MONO, whiteSpace: 'nowrap' }}>
                  <A href={`${c.habr}/vacancies`}>{c.vacancies}</A>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr><td colSpan={5} style={{ padding: 18, color: 'var(--text-tertiary)' }}>Ничего не нашлось. Попробуй другое слово или сними фильтр.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <P style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
        Число в последнем столбце ведёт на вакансии компании. Прямого показателя «мало откликов» ни одна площадка не публикует:
        список собран по косвенным признакам — небольшой размер, регион, непрофильная отрасль, отсутствие в топах работодателей.
      </P>
    </div>
  )
}

function Channels({ data }) {
  const total = data.channels.reduce((n, c) => n + c.items.length, 0)
  return (
    <div style={{ margin: '18px 0' }}>
      <P>
        <B>{total} каналов</B> по {data.channels.length} направлениям. Каждый проверен {data.updated.split('-').reverse().join('.')}:
        канал существует, открыт и публиковал посты осенью 2026 года. Число справа показывает подписчиков.
      </P>
      <div className="itm-channels">
        {data.channels.map(cat => (
          <div key={cat.category} style={{ minWidth: 0 }}>
            <div style={{ color: ACCENT, fontFamily: MONO, fontSize: 11.5, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{cat.category}</div>
            <div style={{ borderTop: '1px solid var(--border-color)' }}>
              {cat.items.map(ch => (
                <div key={ch.handle} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '9px 0', borderBottom: '1px solid var(--border-color)', fontSize: 14 }}>
                  <div style={{ minWidth: 0 }}>
                    <A href={`https://t.me/${ch.handle}`}>@{ch.handle}</A>
                    <div style={{ color: 'var(--text-tertiary)', fontSize: 12.5, marginTop: 2, overflowWrap: 'anywhere' }}>{ch.title}</div>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontFamily: MONO, fontSize: 12.5, whiteSpace: 'nowrap' }}>{ch.subs}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Note title="Как пользоваться каналами">
        Подпишись на 10–15 каналов своего направления, а не на все. Включи уведомления и отвечай на пост в первый час: позже автору
        приходят сотни сообщений. Пиши сразу по контакту из вакансии, с резюме и двумя строками о том, почему подходишь. В каналах
        с платным размещением встречаются мошенники: не плати за «обучение перед трудоустройством» и не выполняй задания с переводом денег.
      </Note>
    </div>
  )
}

function Week({ data }) {
  const w = data.week
  return (
    <div>
      <Kpis items={w.quotas.map(([v, l]) => [v, l])} />
      <P style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>
        Квоты — рабочая методика, а не результат исследования. Конверсия зависит от стека и уровня. Смысл в том, чтобы воронка
        была шире, чем кажется нужным.
      </P>
      <div style={{ borderTop: '1px solid var(--border-color)', margin: '18px 0' }}>
        {w.days.map(day => (
          <div key={day.d} className="itm-day">
            <div>
              <div style={{ color: ACCENT, fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15 }}>{day.d}</div>
              <div style={{ color: 'var(--text-tertiary)', fontFamily: MONO, fontSize: 11, marginTop: 4 }}>{day.sub}</div>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>{day.title}</div>
              <Ul items={day.items} />
            </div>
          </div>
        ))}
      </div>
      <SubTitle>Шаблоны сообщений</SubTitle>
      {w.templates.map(([title, text]) => (
        <Note key={title} title={title}>{text}</Note>
      ))}
      <SubTitle>Чего не делать</SubTitle>
      <Ul items={w.mistakes} />
    </div>
  )
}

/* ═══════════════════════════ TOC ═══════════════════════════ */

const TOC = [
  { id: 'm1', label: 'Глава 1 — Что происходит с рынком' },
  { id: 'm2', label: 'Глава 2 — Какие профессии востребованы' },
  { id: 'm3', label: 'Глава 3 — Какие профессии теряют спрос' },
  { id: 'm4', label: 'Глава 4 — Навыки ML/AI: что нужно и за что платят' },
  { id: 'm5', label: 'Глава 5 — Новые профессии' },
  { id: 'm6', label: 'Глава 6 — Варианты для новичков' },
  { id: 'm7', label: 'Глава 7 — Компании, стартапы или работа на себя' },
  { id: 'm8', label: 'Глава 8 — Где искать работу в проектах и стартапах' },
  { id: 'm9', label: 'Глава 9 — Больше 21 тысячи IT‑компаний: где их искать' },
  { id: 'm10', label: 'Глава 10 — Списки компаний в тени', lock: true },
  { id: 'm11', label: 'Глава 11 — Telegram‑каналы с вакансиями', lock: true },
  { id: 'm12', label: 'Глава 12 — Как найти работу за неделю', lock: true },
  { id: 'm13', label: 'Источники и методика' },
]

const SOURCES = [
  ['Хабр Карьера. Зарплаты IT‑специалистов в первой половине 2026 года, 45 226 зарплат', 'https://habr.com/ru/specials/1060148/'],
  ['hh.ru в пересказе Hi‑Tech Mail: вакансии −35%, резюме +25%, апрель 2026', 'https://hi-tech.mail.ru/articles/150067-pochemu-vakansij-na-35-menshe-chem-v-2025-godu/'],
  ['Outlines Tech на Хабре. «Крутое пике», 6 ноября 2026', 'https://habr.com/ru/companies/outlines_tech/articles/1103868/'],
  ['hh.индекс за апрель 2026, обзор со ссылкой на hh.ru', 'https://bezpanikiit.ru/rynok-truda-aprel-2026'],
  ['Коммерсантъ со ссылкой на hh.ru: семь ИИ‑профессий и зарплаты, 29 января 2026', 'https://www.kommersant.ru/doc/8380362'],
  ['CNews: компании вдвое чаще ищут специалистов по ИИ, 28 января 2026', 'https://www.cnews.ru/news/top/2026-01-28_rossijskie_kompanii_stali'],
  ['Т—Ж. Можно ли войти в ИТ в 2026 году, 6 марта 2026', 'https://t-j.ru/voiti-v-it-2026/'],
  ['Инк. Конкуренция среди джунов выросла до 19 резюме на вакансию', 'https://incrussia.ru/news/v-it-tesno-na-vhode-konkurentsiya-sredi-dzhunov-vyrosla-do-19-rezyume-na-vakansiyu/'],
  ['Indeed Hiring Lab. AI and Job Postings, июль 2026', 'https://www.hiringlab.org/2026/07/08/ai-and-job-postings-from-destruction-to-creation/'],
  ['Indeed Hiring Lab. The Labor Market Is Tilting Toward Seniority, июль 2026', 'https://www.hiringlab.org/2026/07/23/the-labor-market-is-tilting-toward-seniority/'],
  ['PwC. 2026 Global AI Jobs Barometer', 'https://www.pwc.com/gx/en/news-room/press-releases/2026/pwc-2026-ai-jobs-barometer.html'],
  ['World Economic Forum. Future of Jobs Report 2025', 'https://www.weforum.org/publications/the-future-of-jobs-report-2025/'],
  ['Stanford AI Index 2026 в пересказе LeadDev', 'https://leaddev.com/hiring/young-devs-steepest-losses-exposed-roles-stanford-study-finds'],
  ['LinkedIn Jobs on the Rise 2026 в пересказе Dice', 'https://www.dice.com/career-advice/ai-related-jobs-top-linkedins-fastest-growing-roles-list-for-2026'],
  ['Forward Deployed Engineer: данные Indeed и Lightcast в обзоре KDnuggets', 'https://www.kdnuggets.com/forward-deployed-engineer-ais-hottest-new-career-or-consulting-with-a-better-title'],
  ['Навыки AI‑инженеров: разбор 390 вакансий', 'https://dev.to/ali_82f3409ed625e8ba8515b/ai-engineer-roadmap-2026-what-390-job-postings-actually-require-3jdo'],
  ['Реестр аккредитованных IT‑компаний: свыше 21 тыс. на июль 2026', 'https://techora.ru/news/chislo-novykh-it-kompaniy-v-rf-2026-07-19'],
  ['Хабр Карьера. Компании с открытыми вакансиями, выгрузка 12 ноября 2026', 'https://career.habr.com/companies?with_vacancies=1'],
]

/* ═══════════════════════════ Main ═══════════════════════════ */

export default function ItMarketLikbez({ user, onBack }) {
  const isCamp = !!user?.isAutumnCamp2026
  const [camp, setCamp] = useState(isCamp ? 'loading' : undefined)

  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => {
    if (!isCamp) { setCamp(undefined); return }
    let alive = true
    setCamp('loading')
    api.itMarketCamp()
      .then(data => { if (alive && data) setCamp(data) })
      .catch(err => { if (alive) setCamp(err.status === 403 ? undefined : 'error') })
    return () => { alive = false }
  }, [isCamp])

  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>
      <style>{`
        .itm-row { display: grid; grid-template-columns: minmax(0, 220px) minmax(0, 1fr); gap: 8px 28px; padding: 16px 0; border-bottom: 1px solid var(--border-color); }
        .itm-day { display: grid; grid-template-columns: 120px minmax(0, 1fr); gap: 8px 24px; padding: 18px 0; border-bottom: 1px solid var(--border-color); }
        .itm-kpis { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1px; background: var(--border-color); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; margin: 18px 0; }
        .itm-cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1px; background: var(--border-color); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; margin: 16px 0; }
        .itm-two { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin: 18px 0; }
        .itm-three { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1px; background: var(--border-color); border: 1px solid var(--border-color); border-radius: 10px; overflow: hidden; margin: 16px 0; }
        .itm-channels { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px 32px; margin: 18px 0; }
        @media (max-width: 860px) {
          .itm-row, .itm-day, .itm-cards, .itm-two, .itm-three, .itm-channels { grid-template-columns: minmax(0, 1fr); }
          .itm-kpis { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
      `}</style>

      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: ACCENT_DIM, border: `1px solid ${ACCENT_LINE}`, borderRadius: 8, padding: '6px 14px', color: ACCENT_HI, fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>КАРЬЕРА</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>Аналитический отчёт · ноябрь 2026</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.15, marginBottom: 14 }}>
          Рынок IT‑профессий: <span style={{ color: ACCENT }}>кого нанимают</span> и как туда попасть
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15.5, lineHeight: 1.7, maxWidth: 760 }}>
          Вакансий в российском IT стало примерно на треть меньше, резюме на 15–25% больше. При этом спрос не исчез, а сместился:
          в сторону опытных инженеров, инфраструктуры, безопасности и всего, что связано с внедрением ИИ в реальные продукты.
          Здесь цифры, списки ролей и навыков, компании, каналы поиска и план на одну неделю.
        </p>
        <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['12 глав', '18 источников', '99 компаний', '72 Telegram‑канала', 'план на 7 дней', '~40 мин'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      <Kpis items={[
        ['−33%', 'активных IT‑вакансий на hh.ru, сентябрь 2026 к сентябрю 2025', 'hh.ru'],
        ['22,6', 'резюме на одну IT‑вакансию в апреле. Нормой hh.ru считает 4–8', 'hh.индекс'],
        ['191K ₽', 'медианная зарплата в IT, первое полугодие 2026. Рост 4%, ниже инфляции', 'Хабр Карьера'],
        ['+62%', 'средняя надбавка к зарплате за навыки ИИ в мире', 'PwC 2026'],
      ]} />

      <P style={{ fontSize: 13 }}>
        <D /> цифра из исследования или статистики площадки. <O /> мнение практиков или вторичный источник.
      </P>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', margin: '24px 0' }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gap: 6 }}>
          {TOC.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit' }}
              onMouseEnter={e => e.currentTarget.style.color = ACCENT_HI}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {item.label}
              {item.lock && <span style={{ color: ACCENT_HI, fontFamily: MONO, fontSize: 10.5, marginLeft: 10, border: `1px solid ${ACCENT_LINE}`, borderRadius: 4, padding: '1px 6px' }}>{camp && camp !== 'error' ? 'для лагеря' : 'только для лагеря'}</span>}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════ ГЛАВА 1 ═══════════ */}
      <SectionTitle id="m1" kicker="Глава 1" question="Что происходит с рынком прямо сейчас">Рынок работодателя: вакансий меньше, отбор жёстче</SectionTitle>
      <Answer>
        За 2026 год российский IT‑рынок окончательно перешёл от рынка кандидата к рынку работодателя. Конкуренция на вакансию
        в три раза выше нормы, зарплаты растут медленнее инфляции, удалёнки становится меньше.
      </Answer>

      <div className="itm-two">
        <Figure title="IT на hh.ru: изменение за год" caption="Каждый месяц 2026 года сравнивается с тем же месяцем 2025‑го. Оранжевым вакансии, серым резюме. Данные hh.ru в пересказе Hi‑Tech Mail и блога Outlines Tech.">
          <Bars items={[
            ['Апрель, вакансии', '−35%', 70],
            ['Апрель, резюме', '+25%', 50, 0, true],
            ['Июнь, вакансии', '−31%', 62],
            ['Июнь, резюме', '+23%', 46, 0, true],
            ['Сентябрь, вакансии', '−33%', 66],
            ['Сентябрь, резюме', '+15%', 30, 0, true],
          ]} />
        </Figure>
        <Figure title="hh.индекс в IT: резюме на одну вакансию" caption="Шкала 0–25. Чем выше индекс, тем больше соискателей претендует на одну вакансию. Значения 2026 года приводят обзоры со ссылкой на hh.ru.">
          <Bars items={[
            ['Норма по hh.ru', '4–8', 32, 16, true],
            ['Февраль 2026', '19,6', 78.4],
            ['Апрель 2026', '22,6', 90.4],
          ]} />
        </Figure>
      </div>

      <Rows items={[
        ['Зарплаты почти стоят', '191 000 ₽ медиана', <><D />Хабр Карьера изучила 45 226 зарплат: медиана выросла на 4% за полгода при прогнозе инфляции ЦБ 4,5–5,5%. Москва <B>235 000 ₽</B>, Санкт‑Петербург <B>200 000 ₽</B>, регионы <B>160 000 ₽</B>. У разработчиков рост всего 1%. Быстрее всех росли поддержка (+10%), маркетинг (+9%) и продажи (+8%). Разрыв между Москвой и регионами увеличился: в регионах платят на 16% меньше среднего по рынку.</>],
        ['Регионы с ростом', 'Воронеж +12%, Казань +10%', <><D />Быстрее всего зарплаты росли в Воронеже, Казани и Омске (+9%). Снижение в Волгограде (−9%), Самаре (−7%) и Ростове‑на‑Дону (−5%). В Петербурге рост остановился.</>],
        ['Удалёнки меньше', '33% → 26% у аналитиков', <><D />Сравнение вакансий hh.ru за август 2025 и август 2026: доля предложений с удалённой работой у аналитиков упала с 33% до 26%, у системных администраторов и DevOps с 20% до 12%.</>],
        ['В мире картина похожая, но со знаком плюс', '+15% вакансий в разработке, США', <><D />По Indeed Hiring Lab число вакансий в разработке ПО в США выросло почти на 15% с февраля 2025 года, но остаётся на 27,5% ниже допандемийного уровня. <B>71% прироста дали senior‑позиции</B>, 37% дали вакансии со словом AI в названии. Доля вакансий начального уровня в разработке 4,5%, это минимум среди всех отраслей.</>],
        ['Молодые разработчики под ударом', 'около −20% занятости, 22–25 лет', <><O />Stanford AI Index 2026 в пересказе профильных изданий: занятость разработчиков 22–25 лет в США снизилась почти на 20% после распространения генеративного ИИ. Точка отсчёта в разных пересказах отличается.</>],
        ['Дефицит при избытке резюме', 'парадокс 2026 года', <><O />Откликов сотни, а закрыть позицию DevOps или специалиста по ИБ по‑прежнему трудно. Нанимающие менеджеры пишут прямо: тестировщика можно найти за день, инженера по инфраструктуре ищут неделями.</>],
        ['Отклики читает ИИ', 'новый фильтр на входе', <><D />hh.ru внедрил ИИ‑помощника, который разбирает отклики и оценивает кандидатов. Резюме без ключевых слов из вакансии до человека может не дойти.</>],
      ]} />

      <Note title="Что это значит для вас">
        Один канал откликов больше не работает: при 20 резюме на вакансию нужна широкая воронка и прямые контакты. Конкурировать
        придётся специализацией и доказательствами, а не числом пройденных курсов. Ищите там, где конкуренция ниже: небольшие
        компании, регионы, IT‑отделы непрофильных отраслей.
      </Note>

      {/* ═══════════ ГЛАВА 2 ═══════════ */}
      <SectionTitle id="m2" kicker="Глава 2" question="Какие профессии сейчас востребованы">Кого ищут и кому платят</SectionTitle>
      <Answer>
        Спрос держится там, где цена ошибки высока, а ИИ ускоряет работу, но не заменяет ответственность: ML и ИИ‑инженерия,
        инфраструктура, безопасность, данные, архитектура и бэкенд в финтехе.
      </Answer>

      <Rows items={[
        ['ML‑ и AI‑инженеры', '184–345 тыс. ₽ в вакансиях', <><D />По hh.ru компании в 2025 году искали сотрудников с ИИ‑функционалом в два раза чаще, чем в 2024‑м, SuperJob даёт рост в 1,9 раза. ML‑инженер остаётся самой высокооплачиваемой ИИ‑ролью, у AI‑инженера медиана предложений около 220 тыс. ₽. В LinkedIn Jobs on the Rise AI Engineer второй год подряд на первом месте в США.</>],
        ['DevOps, SRE, платформенные инженеры', 'кандидатов мало', <><O />Самый заметный дефицит по наблюдениям нанимающих менеджеров. Сильные инженеры ведут несколько проектов одновременно, ИИ помогает им с шаблонами инфраструктуры. Вторичные обзоры со ссылкой на hh.ru говорят, что нехватку DevOps ощущают 42% работодателей.</>],
        ['Информационная безопасность', '224 тыс. ₽ медиана в Москве', <><D />Входит в топ‑5 по зарплатам на Хабр Карьере: Москва 224, Петербург 151, регионы 130 тыс. ₽. <O />Эксперты SuperJob называют ИБ вместе с ИИ направлением, где опыт ценится выше всего. По вторичным данным hh.ru нехватку таких специалистов отмечают 52% компаний.</>],
        ['Data‑инженеры и Big Data', '№1 в прогнозе WEF', <><D />В отчёте WEF Future of Jobs 2025 специалисты по большим данным, финтех‑инженеры и специалисты по ИИ и ML возглавляют список самых быстрорастущих профессий до 2030 года. <O />«Эксель‑аналитика» уходит, работа с большими данными остаётся.</>],
        ['Архитекторы ПО', '497 тыс. ₽ медиана в Москве', <><D />Самая высокая зарплата среди разработчиков: Москва 497, Петербург 508, регионы 420 тыс. ₽. Когда код пишет ИИ, решения о том, что и как строить, дорожают.</>],
        ['Бэкенд: Java, Go, Kotlin, Python', '278 тыс. ₽ медиана в Москве', <><D />Go 325, Kotlin 320, Python 243 тыс. ₽ (+6% за полугодие). <O />В финтехе стабильный спрос на Java: банковские и платёжные системы исторически написаны на ней.</>],
        ['Мобильная разработка', '320 тыс. ₽ медиана в Москве', <><D />Вторая строчка по зарплатам среди разработчиков. Swift 326 тыс. ₽ (+7%), Objective‑C 400 тыс. ₽ (+13%): людей с нативным iOS‑опытом мало.</>],
        ['1С и корпоративные системы', '272 тыс. ₽ медиана в Москве', <><D />Программисты 1С в топ‑5 по зарплатам среди разработчиков. Порог входа ниже, компаний‑нанимателей тысячи. При этом зарплаты ERP‑программистов в целом упали на 22%, так что ниша неоднородна.</>],
      ]} />

      <SubTitle>Зарплаты по специализациям</SubTitle>
      <Table
        numeric={[1, 2, 3]}
        headers={['Специализация', 'Москва', 'Санкт‑Петербург', 'Регионы']}
        rows={[
          ['Архитектор ПО', '497', '508', '420'],
          ['Мобильный разработчик', '320', '299', '263'],
          ['Бэкенд‑разработчик', '278', '251', '220'],
          ['Программист 1С', '272', '198', '174'],
          ['Разработчик баз данных', '264', '261', '177'],
          ['Менеджмент в IT', '260', '200', '152'],
          ['Администрирование', '229', '200', '150'],
          ['Информационная безопасность', '224', '151', '130'],
          ['Аналитика', '220', '180', '160'],
        ]}
        caption="Медианные зарплаты на руки, тыс. ₽ в месяц, первое полугодие 2026. Фактические оклады из калькулятора Хабр Карьеры, а не цифры из вакансий."
      />

      <SubTitle>Зарплаты по языкам программирования</SubTitle>
      <Table
        numeric={[1, 2]}
        headers={['Язык', 'Медиана, тыс. ₽', 'За полгода']}
        rows={[
          ['Objective‑C', '400', '+13%'], ['Elixir', '348', '+4%'], ['Swift', '326', '+7%'], ['Go', '325', '+2%'],
          ['Kotlin', '320', '+5%'], ['C++', '254', '+6%'], ['Python', '243', '+6%'], ['JavaScript', 'нет в отчёте', '−2%'], ['Scala', 'нет в отчёте', '−7%'],
        ]}
        caption="Хабр Карьера, первое полугодие 2026. Для JavaScript и Scala в отчёте указана только динамика."
      />

      {/* ═══════════ ГЛАВА 3 ═══════════ */}
      <SectionTitle id="m3" kicker="Глава 3" question="Какие профессии перестают быть востребованы">Где спрос уходит</SectionTitle>
      <Answer>
        Исчезают не профессии целиком, а их рутинная часть. Хуже всего ролям, где результат легко проверить и легко сгенерировать:
        вёрстка, ручное тестирование, типовой фронтенд, шаблонная аналитика, координация задач.
      </Answer>

      <Rows items={[
        ['HTML‑вёрстка', '80 тыс. ₽, минимум среди разработчиков', <><D />Самая низкая медиана среди разработчиков на Хабр Карьере. Как отдельная профессия почти не существует: вёрстку закрывают фронтенд‑разработчик и ИИ‑инструменты.</>],
        ['Junior‑фронтенд без специализации', '21 резюме на вакансию', <><D />У начинающих фронтенд‑разработчиков около 21 резюме на вакансию, у начинающих аналитиков до 27. Зарплаты в JavaScript снизились на 2% за полугодие.</>],
        ['Ручное тестирование', 'кандидатов больше, чем задач', <><O />Нанимающие менеджеры называют QA самой лёгкой для закрытия позицией. Зарплаты тестировщиков при этом выросли на 5%: это рост у тех, кто автоматизирует и разбирается в продукте.</>],
        ['Проектные менеджеры и администраторы', 'рутину отдают ИИ‑агентам', <><O />По наблюдениям практиков, координационные роли компании пытаются заменить агентами в первую очередь. Зарплаты в менеджменте и администрировании за полугодие не изменились. Часть компаний после таких сокращений возвращает людей: команда теряет скорость.</>],
        ['Аналитики «по шаблону»', 'остаются те, кто знает бизнес', <><O />Первичные спецификации по записям встреч собирает ИИ за 20–30 минут вместо дня. Сохраняют позиции аналитики, которые общаются с заказчиком и могут проверить результат.</>],
        ['ERP, разработка баз данных, геймдев', '−22%, −13%, −8% к зарплате', <><D />Три специализации с самым заметным снижением зарплат за первое полугодие 2026 по Хабр Карьере. У системных инженеров −5%.</>],
        ['Графические дизайнеры', 'впервые в антирейтинге WEF', <><D />В Future of Jobs 2025 графические дизайнеры впервые попали в десятку самых быстро сокращающихся профессий. WEF связывает это с генеративным ИИ.</>],
        ['Промпт‑инженер как отдельная должность', '60–90 тыс. ₽', <><D />По hh.ru это одна из самых низкооплачиваемых ИИ‑ролей, вместе с нейрокреатором (30–100 тыс. ₽). Умение работать с моделями стало базовым навыком любой профессии, а не профессией.</>],
        ['Фриланс без ниши', '105 тыс. ₽, −13%', <><D />Доход фрилансеров на Хабр Карьере упал на 13% за полугодие. Доход ИП, наоборот, вырос на 32% до 216 тыс. ₽: выигрывают те, кто продаёт бизнесу результат, а не часы.</>],
      ]} />

      <Note title="Если вы уже в одной из этих ролей">
        Уходить из профессии не обязательно, нужно сдвинуться внутри неё. Верстальщику во фронтенд с продуктовой логикой,
        ручному тестировщику в автоматизацию и тестирование ИИ‑функций, менеджеру в роль с ответственностью за результат и деньги,
        аналитику в глубокое знание домена. Общий принцип: берите ту часть работы, где нужно принимать решения и отвечать за них.
      </Note>

      {/* ═══════════ ГЛАВА 4 ═══════════ */}
      <SectionTitle id="m4" kicker="Глава 4" question="Какие навыки ML/AI сейчас нужны и за что платят">Платят за ИИ в продакшене, а не за знание о нём</SectionTitle>
      <Answer>
        Самый дорогой профиль 2026 года: инженер, который доводит LLM‑систему до работающего сервиса. Он умеет измерять качество,
        строить агентов и поиск по данным, следить за стоимостью и надёжностью. Классический ML остаётся фундаментом, но в вакансиях
        его обгоняют оценка качества и агенты.
      </Answer>

      <div className="itm-two">
        <Figure title="Что требуют в вакансиях AI‑инженеров" caption="Доля вакансий с упоминанием навыка. Сведены два разбора англоязычных вакансий 2026 года (390 вакансий и выборка InterviewStack). Выборки небольшие, для Python взята середина диапазона 61–71%. Читайте как направление. Серым отмечены классические фреймворки.">
          <Bars items={[
            ['Python', '≈66%', 66], ['LLM', '63%', 63], ['Evals', '56%', 56], ['Облака', '55%', 55], ['Агенты', '50%', 50],
            ['Observability', '40%', 40], ['CI/CD', '33%', 33], ['PyTorch', '33%', 33, 0, true], ['RAG', '32%', 32], ['TensorFlow', '18%', 18, 0, true],
          ]} />
        </Figure>
        <Figure title="Сколько платят за ИИ‑роли в России" caption="Медианные предложения в вакансиях hh.ru, тыс. ₽ в месяц, январь 2026. Полоса показывает диапазон, число справа его верхнюю границу. Шкала 0–345.">
          <Bars items={[
            ['ML‑инженер', '345', 100, 53], ['AI‑инженер', '220', 64], ['ИИ‑фасилитатор', '170', 49, 29], ['Архитектор AI', '150', 43.5, 29],
            ['AI‑тренер', '104', 30], ['Нейрокреатор', '100', 29, 9, true], ['Промпт‑инженер', '90', 26, 17, true],
          ]} />
        </Figure>
      </div>

      <SubTitle>Стек по уровням: что учить и в каком порядке</SubTitle>
      <Cards items={[
        ['Уровень 1 · фундамент', ['Python и SQL на уровне ежедневной работы', 'Статистика, линейная алгебра, метрики моделей', 'Классический ML: бустинги, валидация, работа с признаками', 'Git, Docker, базовый Linux']],
        ['Уровень 2 · LLM‑приложения', ['RAG: чанкинг, эмбеддинги, векторный поиск, реранкинг', 'Агенты: вызов инструментов, оркестрация, память, протокол MCP', 'Управление контекстом и структурированный вывод', 'Работа с API моделей, кэширование, стоимость запроса']],
        ['Уровень 3 · за это доплачивают', ['Evals: наборы тестов, LLM‑судьи, регрессии качества', 'LLMOps: трассировка, мониторинг, CI/CD для моделей', 'Kubernetes, облака, очереди, отказоустойчивость', 'Безопасность: prompt injection, утечки данных, доступы агентов']],
        ['Уровень 4 · узкая экспертиза', ['Дообучение моделей: LoRA, дистилляция, подготовка датасетов', 'Оптимизация инференса и работа с GPU', 'Рекомендательные системы, поиск, компьютерное зрение, речь', 'Доменная экспертиза: финтех, медицина, промышленность']],
      ]} />

      <SubTitle>Три проекта, которые закрывают большинство требований</SubTitle>
      <Rows items={[
        ['RAG‑сервис по своим документам', 'уровень 2', 'Поиск по базе знаний с цитатами источников. Покажите метрики качества поиска и ответа до и после улучшений: так вы закрываете и RAG, и evals.'],
        ['Агент с инструментами', 'уровни 2–3', 'Агент, который решает реальную задачу через 3–5 инструментов: например, разбирает входящие заявки и заводит задачи. Добавьте трассировку шагов и ограничение прав.'],
        ['Сервис в продакшене', 'уровень 3', 'Любой из двух проектов, развёрнутый с Docker, CI/CD, мониторингом, подсчётом стоимости запроса и нагрузочным тестом. Именно это отличает инженера от автора ноутбука.'],
      ]} />

      <Rows items={[
        ['Надбавка за навыки ИИ', '62% в среднем по миру', <><D />PwC проанализировала более миллиарда объявлений в 27 странах. Надбавка выросла с 57% годом ранее и сильно зависит от отрасли: от 118% в потребительском секторе до 16% в госсекторе.</>],
        ['Агентные навыки', '0,06% → 0,23% вакансий за год', <><O />Доля вакансий с упоминанием agentic AI выросла почти вчетверо, это около 90 тысяч объявлений. Спрос на RAG по одному из разборов вырос на 337% за год.</>],
        ['Ориентир по миру', '$140–190 тыс. в год, США', <><O />Медиана базовой зарплаты в вакансиях AI‑инженеров с требованием GenAI около $140 тыс. (635 вакансий), по опросам разработчиков медиана AI/ML‑инженера $189 тыс.</>],
        ['По протоколу MCP статистики нет', 'оговорка', 'Его называют стандартом подключения агентов к инструментам и данным, но надёжных подсчётов по вакансиям нет. В стек он включён как часть агентной разработки.'],
      ]} />

      {/* ═══════════ ГЛАВА 5 ═══════════ */}
      <SectionTitle id="m5" kicker="Глава 5" question="Какие интересные профессии появились">Новые роли 2025–2026</SectionTitle>
      <Answer>
        Большинство новых профессий выросло из старых с добавлением ИИ. Самая быстрорастущая из них инженерная и клиентская
        одновременно: Forward Deployed Engineer.
      </Answer>

      <Rows items={[
        ['Forward Deployed Engineer', '643 → 5 330 вакансий за год', <><D />Инженер, который внедряет ИИ‑продукт прямо у заказчика: разбирается в его процессах, пишет интеграции, доводит до результата. По Indeed число вакансий выросло на 729% с апреля 2025 по апрель 2026. Медиана раскрытой базовой зарплаты около $193 тыс. в год. База роста маленькая, но направление однозначное. В России ближайший аналог: инженер внедрения, solution engineer.</>],
        ['AI Engineer', '№1 в LinkedIn два года подряд', <><D />Собирает продукты на готовых моделях: RAG, агенты, оценка качества. Отличается от ML‑инженера тем, что реже обучает модели и чаще строит системы вокруг них.</>],
        ['AI‑консультант и стратег', 'топ‑3 LinkedIn Jobs on the Rise', <><D />Менее техническая роль: помогает бизнесу выбрать, что автоматизировать и как посчитать эффект. Российский вариант по hh.ru называется ИИ‑фасилитатор: внедряет нейросети в процессы и обучает команды, 100–170 тыс. ₽.</>],
        ['AI‑тренер, разметчик с экспертизой', 'около 104 тыс. ₽', <><D />Учит модели правильным ответам и пишет эталонные тексты. Ценятся тренеры с профессией: юристы, врачи, программисты. В LinkedIn data annotator входит в тройку самых быстрорастущих ролей в США.</>],
        ['Архитектор AI‑решений', '100–150 тыс. ₽ в вакансиях hh.ru', <><D />Строит и развивает ИИ‑платформу компании. Вилка в вакансиях пока ниже, чем у ML‑инженеров: роль только формируется, требования в объявлениях размыты.</>],
        ['Инженер по оценке качества ИИ, агентный инженер', 'статистики пока нет', <><O />Отдельные названия должностей встречаются всё чаще, но надёжных подсчётов нет. Сами навыки уже массовые: evals есть в 56% вакансий AI‑инженеров, агенты в 50%.</>],
        ['ИИ‑саппорт и ИИ‑тестировщик', 'входные роли', <><O />Проверяют ответы моделей, собирают сценарии ошибок, ведут пользователей ИИ‑продуктов. Карьерные эксперты называют их реалистичной точкой входа для новичков.</>],
      ]} />
      <P style={{ fontSize: 13.5 }}>
        hh.ru отмечает, что многие ИИ‑профессии ещё формируются: функционал пересекается, требования уточняются. Смотрите на задачи
        в вакансии, а не на название должности.
      </P>

      {/* ═══════════ ГЛАВА 6 ═══════════ */}
      <SectionTitle id="m6" kicker="Глава 6" question="Какие варианты есть для новичков">Вход закрыт спереди, но открыт сбоку</SectionTitle>
      <Answer>
        Прямой путь «курсы → джун‑разработчик» в 2026 году почти не работает. Работают обходные: стажировки крупных компаний,
        соседние роли с внутренним переходом, ниши с дефицитом и вход через свою прежнюю профессию.
      </Answer>

      <Kpis items={[
        ['10–11%', 'IT‑вакансий доступны без опыта. По рынку в целом 37–38%', 'SuperJob, январь 2026'],
        ['≈50%', 'из них приходится на техподдержку и похожие роли', 'SuperJob'],
        ['8 → 19', 'резюме на junior‑вакансию, 2021 → 2025', 'Инк'],
        ['50–70K ₽', 'типичная стартовая зарплата по оценке экспертов', 'Т—Ж'],
      ]} />

      <Rows items={[
        ['Оплачиваемые стажировки бигтеха', 'самый надёжный путь', 'Крупные компании продолжают растить джунов: стажировка оплачивается, при переходе в штат дают полноценный оффер и ментора. Отбор жёсткий, иногда жёстче, чем на junior‑вакансию. Готовьтесь к алгоритмам и подавайтесь во все наборы сразу, а не в один.'],
        ['Соседняя роль и переход внутри', 'поддержка, ИИ‑саппорт, AI‑тренер', 'Половина вакансий без опыта находится в поддержке. Это не тупик, если компания продуктовая: через 6–12 месяцев вы знаете продукт лучше внешнего кандидата и переходите в QA, аналитику или разработку.'],
        ['Ниши с дефицитом', 'ИБ, DevOps, данные, 1С', 'Порог входа выше, зато конкуренция ниже. В ИБ реальная стартовая точка: аналитик SOC первой линии. В инфраструктуре: младший администратор или инженер поддержки. В 1С нанимают тысячи небольших интеграторов.'],
        ['Вход через свою профессию', 'домен + ИИ', 'Бухгалтер, юрист, врач, логист с навыками автоматизации и ИИ ценнее безликого джуна. Это путь в AI‑тренеры, аналитики, продакты и специалисты по внедрению. Два требования 2026 года по словам экспертов: умение работать с ИИ и междисциплинарность.'],
        ['Малые компании и стартапы', 'берут за готовность делать всё', 'В команде из пяти человек нет HR‑фильтра по годам опыта. Смотрят на проект, который можно открыть и потрогать. Списки таких компаний в главе 10.'],
        ['Диплом', 'важен, но не везде', 'Критичен в финтехе, госсекторе, ИБ и R&D. В остальных местах работодатели смотрят на доказательства: проекты, GitHub, контрибуции, рекомендации, тестовые задания.'],
      ]} />

      <Note title="Что должно быть у новичка до первого отклика">
        <B>Один доведённый до продакшена проект</B> с реальными пользователями или данными, а не пять учебных. <B>Понятная
        специализация</B> в заголовке резюме вместо «начинающий разработчик». <B>Уверенная работа с ИИ‑инструментами</B> и умение
        объяснить, что в коде написано вами и почему. <B>Понимание бизнеса</B>: на собеседовании говорите, как ваша работа помогает
        компании зарабатывать или экономить.
      </Note>

      {/* ═══════════ ГЛАВА 7 ═══════════ */}
      <SectionTitle id="m7" kicker="Глава 7" question="Куда идти работать: компании, стартапы, работа на себя">Три траектории и для кого каждая</SectionTitle>
      <Answer>
        Без опыта лучше идти туда, где учат: в крупную компанию или в сильную небольшую команду. С опытом от двух лет стартап даёт
        самый быстрый рост. Работа на себя окупается, когда у вас есть ниша и клиенты, а не просто свободные часы.
      </Answer>

      <div className="itm-three">
        {[
          ['Крупные компании', [
            ['Деньги', <><D />Лидеры рейтинга Хабр Карьеры: Райффайзен Банк <B>400 тыс. ₽</B>, Авито <B>389</B>, Иннотех <B>364</B>, далее RWB и VK.</>],
            ['Плюсы', 'Менторы, процессы, сильная строчка в резюме, стажировки, белая зарплата и льготы аккредитованных IT‑компаний.'],
            ['Минусы', 'Длинный найм в 3–6 этапов, узкая зона ответственности, возврат в офисы.'],
            ['Кому', 'Новичкам и тем, кому нужна глубина в одной области.'],
          ]],
          ['Стартапы и малые команды', [
            ['Деньги', 'Обычно ниже рынка на старте, иногда с долей или опционом. Разброс огромный, договаривайтесь письменно.'],
            ['Плюсы', 'Найм за дни, широкие задачи, прямой контакт с основателем, быстрый рост ответственности.'],
            ['Минусы', 'Риск закрытия и задержек, нет наставника, процессы придётся строить самому.'],
            ['Кому', 'Мидлам и самостоятельным джунам с готовым проектом.'],
          ]],
          ['Работа на себя', [
            ['Деньги', <><D />Фриланс <B>105 тыс. ₽</B> (−13% за полгода). ИП <B>216 тыс. ₽</B> (+32%). В LinkedIn основатели и независимые консультанты среди растущих ролей.</>],
            ['Плюсы', 'Свобода выбора проектов, несколько клиентов сразу, потолок дохода выше.'],
            ['Минусы', 'Продажи и документы на вас, доход неровный, новичку без портфолио почти не дают заказов.'],
            ['Кому', 'Специалистам с нишей: внедрение ИИ, автоматизация, DevOps на несколько проектов.'],
          ]],
        ].map(([title, rows]) => (
          <div key={title} style={{ background: 'var(--bg-primary)', padding: 20, minWidth: 0 }}>
            <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 15.5, marginBottom: 14 }}>{title}</div>
            {rows.map(([k, v]) => (
              <div key={k} style={{ marginBottom: 12 }}>
                <div style={{ color: 'var(--text-tertiary)', fontFamily: MONO, fontSize: 10.5, letterSpacing: 1, textTransform: 'uppercase' }}>{k}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, marginTop: 3 }}>{v}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <P>
        Разница между фрилансом и ИП в данных Хабр Карьеры показывает главное: зарабатывают те, кто оформил себя как подрядчика
        с понятной услугой и работает с бизнесом напрямую, а не через биржи.
      </P>

      <SubTitle>Как выбрать, если сомневаетесь</SubTitle>
      <Ul items={[
        <><B>Нет коммерческого опыта:</B> стажировка в крупной компании или небольшая команда с сильным техлидом. Важнее всего, чтобы рядом был человек, который смотрит ваш код.</>,
        <><B>Опыт 1–3 года и узкая зона задач:</B> стартап или средняя продуктовая компания, где вы получите целый участок и ответственность за него.</>,
        <><B>Опыт от трёх лет и своя ниша:</B> контракты и ИП. Начните с одного клиента параллельно с работой и уходите, когда доход от клиентов сравняется с зарплатой.</>,
        <><B>Нужна стабильность:</B> IT‑отделы банков, ритейла и промышленности. Там меньше хайпа и ниже конкуренция на вакансию.</>,
      ]} />

      {/* ═══════════ ГЛАВА 8 ═══════════ */}
      <SectionTitle id="m8" kicker="Глава 8" question="Где искать работу в проектах и стартапах">Каналы, где вакансия появляется раньше, чем на hh</SectionTitle>
      <Answer>
        Стартапы редко платят за размещение на больших площадках. Они пишут в Telegram, на профильные доски и в сообщества, а чаще
        всего нанимают по прямому сообщению основателю.
      </Answer>

      <Cards items={[
        ['Россия и СНГ', [
          <><B>Хабр Карьера</B>: продуктовые команды, зарплаты и отзывы о работодателях</>,
          <><B>getmatch</B>: вакансии с открытыми вилками</>,
          <><B>Startup Fellows</B>, startupfellows.ru/vacancies: доска вакансий только от стартапов</>,
          <><B>Telegram‑каналы</B>: для джунов это главный источник вакансий. Проверенный список в главе 11</>,
          <><B>vc.ru</B>: раздел вакансий и посты основателей о запусках</>,
          <><B>hh.ru</B> с фильтрами «аккредитованная IT‑компания» и размером компании</>,
        ]],
        ['Международные и удалённые', [
          <><B>Wellfound</B>: крупнейшая доска стартапов, отклик идёт напрямую основателям</>,
          <><B>Work at a Startup</B>: компании из портфеля Y Combinator</>,
          <><B>Hacker News «Who is hiring?»</B>: ежемесячный тред первого числа</>,
          <><B>LinkedIn</B>: поиск по фразам hiring и founding engineer, сообщения основателям</>,
          <><B>We Work Remotely, Remote OK</B>: удалённые позиции</>,
          <><B>Contra, Upwork, Toptal</B>: проектная работа и контракты</>,
        ]],
        ['Проекты без вакансий', [
          <><B>Хакатоны</B>: команды и компании‑организаторы нанимают участников прямо с мероприятий</>,
          <><B>Open source</B>: несколько принятых пул‑реквестов в продукт компании работают лучше резюме</>,
          <><B>Акселераторы и демо‑дни</B>: список выпускников это список команд, которым нужны руки</>,
          <><B>Product Hunt</B> и запуски в Telegram: пишите команде в неделю запуска</>,
        ]],
        ['Как писать стартапу', [
          <>Пишите <B>основателю или CTO</B>, а не на общий адрес</>,
          'Три предложения: кто вы, что конкретно улучшите в их продукте, ссылка на работающий проект',
          <>Приложите <B>маленький результат</B>: найденный баг, прототип фичи, разбор воронки</>,
          'Предложите оплачиваемое тестовое на 1–2 недели: стартапу так проще решиться',
        ]],
      ]} />

      <SubTitle>Как проверить стартап до того, как согласиться</SubTitle>
      <Ul items={[
        'Юрлицо и дата регистрации: есть ли компания вообще и сколько она живёт.',
        'Источник денег: выручка, инвестиции или личные средства основателя. Спросите прямо, на сколько месяцев хватит.',
        'Оформление: трудовой договор, ГПХ или самозанятость. График выплат зафиксируйте письменно.',
        'Кто будет вашим руководителем и кто смотрит код. Если никого, вы берёте всю техническую ответственность на себя.',
        'Отзывы бывших сотрудников и то, как основатель отвечает на неудобные вопросы.',
      ]} />

      {/* ═══════════ ГЛАВА 9 ═══════════ */}
      <SectionTitle id="m9" kicker="Глава 9" question="Где искать все компании кроме основных известных">В России больше 21 тысячи аккредитованных IT‑компаний</SectionTitle>
      <Answer>
        На десяток известных брендов приходят тысячи откликов. Остальные 21 тысяча компаний почти невидимы для соискателей,
        и конкуренция там в разы ниже. Находить их нужно не по вакансиям, а по реестрам, рейтингам и спискам участников.
      </Answer>

      <Kpis items={[
        ['21 000+', 'компаний в реестре аккредитованных IT‑организаций на июль 2026', 'Минцифры'],
        ['500+', 'новых компаний получили аккредитацию за первое полугодие 2026', 'Минцифры'],
        ['169', 'компаний с открытыми вакансиями на Хабр Карьере 12 ноября 2026', 'Хабр Карьера'],
        ['91', 'из них с отметкой об аккредитации. Остальные 20 тысяч ищут людей в других местах', 'Хабр Карьера'],
      ]} />

      <P>
        Последние две цифры объясняют, почему «вакансий нет». На самой профильной площадке страны представлено меньше одного
        процента аккредитованных компаний. Остальные нанимают через hh.ru, знакомых, Telegram и собственные сайты, а многие не
        публикуют вакансии вовсе, пока не придёт подходящий человек.
      </P>

      <SubTitle>Реестр аккредитованных IT‑компаний</SubTitle>
      <Rows items={[
        ['Что это', 'реестр Минцифры', 'Список организаций, которым государство подтвердило статус IT‑компании. Статус даёт налоговые льготы компании и отсрочку, льготную ипотеку и другие меры поддержки сотрудникам.'],
        ['Где смотреть', 'gosuslugi.ru/itorgs', 'На Госуслугах есть проверка по ИНН или названию. Сервис отвечает по одной компании: выгрузить весь список разом он не даёт. Поэтому реестр удобен для проверки найденной компании, а не для поиска новых.'],
        ['Как использовать', 'проверка перед откликом', 'Нашли компанию в рейтинге или канале, проверили ИНН в реестре. Аккредитация означает, что IT для компании основной вид деятельности и что она проходила проверку выручки и зарплат.'],
        ['Аккредитованные на hh.ru', 'фильтр в поиске', 'В расширенном поиске hh.ru есть фильтр «аккредитованная IT‑компания». Сочетайте его с небольшим регионом и сортировкой по дате: получите вакансии, до которых не дошла основная масса откликов.'],
      ]} />

      <SubTitle>Рейтинги и каталоги</SubTitle>
      <Table
        headers={['Источник', 'Что внутри', 'Кого искать']}
        rows={[
          ['Реестр российского ПО, reestr.digital.gov.ru', 'Тысячи программных продуктов с указанием правообладателя', 'Продуктовые компании по вашей отрасли. Каждый продукт это команда разработки'],
          ['CNews100, CNews Analytics', 'Крупнейшие IT‑компании по выручке, отдельные рейтинги по интеграции, ИБ, облакам', 'Интеграторы и вендоры со второго по пятый десяток: большие штаты, мало известности'],
          ['TAdviser100', 'Рейтинг IT‑компаний и база внедрений с названиями заказчиков', 'И подрядчиков, и заказчиков, у которых есть свои IT‑команды'],
          ['RAEX', 'Рейтинги разработчиков ПО и IT‑услуг', 'Средние компании с подтверждённой выручкой'],
          ['РУССОФТ', 'Ассоциация и каталог разработчиков‑экспортёров', 'Компании с зарубежными заказчиками и английским в работе'],
          ['Рейтинг Рунета, Tagline', 'Студии веб‑ и мобильной разработки, диджитал‑агентства', 'Заказную разработку: сотни студий по городам и технологиям'],
          ['Участники Сколково, Иннополис, технопарки', 'Списки резидентов с описанием проектов', 'Стартапы и R&D‑команды, в том числе в регионах'],
          ['Хабр Карьера, раздел «Компании»', 'Компании с вакансиями, отзывами и средней оценкой', 'Работодателей, которые нанимают прямо сейчас'],
          ['Dream Job', 'Отзывы сотрудников о работодателях', 'Проверку компании перед откликом'],
        ]}
      />

      <SubTitle>IT‑отделы вне IT и косвенные следы</SubTitle>
      <Cards items={[
        ['IT‑отделы вне IT', [
          <><B>Банки, страховые, ритейл, телеком</B>: свои большие команды разработки</>,
          <><B>Промышленность, логистика, энергетика</B>: цифровые «дочки» с меньшей конкуренцией на вакансию</>,
          <><B>Медицина, агро, образование</B>: растущий спрос на данные и ИИ</>,
        ]],
        ['Косвенные следы', [
          <><B>Спонсоры и докладчики конференций</B>: кто выступает, тот нанимает</>,
          <><B>Портфели фондов и акселераторов</B>, новости о раундах</>,
          <><B>Организации на GitHub</B> с активными репозиториями на вашем стеке</>,
          <><B>Кейсы интеграторов</B>: в них названы заказчики со своими командами</>,
        ]],
      ]} />

      <Note title="Приём: собственная база на 100 компаний">
        Выберите одну отрасль и один стек. Из реестра ПО и двух рейтингов соберите таблицу: <B>компания, продукт, сайт, страница
        карьеры, имя руководителя разработки, контакт</B>. У половины не будет открытых вакансий. Пишите им всё равно: найм
        в небольших компаниях часто начинается с хорошего входящего письма, а не с объявления.
      </Note>

      {/* ═══════════ ГЛАВА 10 ═══════════ */}
      <SectionTitle id="m10" kicker="Глава 10 · для участников лагеря" question="Списки IT‑компаний с вакансиями, которые остаются в тени">Компании в тени: кто нанимает прямо сейчас</SectionTitle>
      <Gate camp={camp} title="Список из 99 компаний с открытыми вакансиями" inside={[
        '34 малые команды и стартапа, 24 средние IT‑компании, 17 крупных, но не раскрученных, 24 IT‑отдела вне IT',
        'У каждой: сайт, город, размер, стек, отметка об аккредитации и ссылка на открытые вакансии',
        'Поиск по стеку и городу, фильтр по аккредитованным',
      ]}>
        {data => <Companies data={data} />}
      </Gate>

      {/* ═══════════ ГЛАВА 11 ═══════════ */}
      <SectionTitle id="m11" kicker="Глава 11 · для участников лагеря" question="Список телеграм‑каналов с вакансиями">Telegram‑каналы с вакансиями</SectionTitle>
      <Gate camp={camp} title="72 проверенных канала по 17 направлениям" inside={[
        'Python, Data Science и ML, аналитика, бэкенд по языкам, фронтенд, QA, DevOps, ИБ, продакты, дизайн, геймдев',
        'Отдельно каналы для джунов и стажёров, стартапов, удалёнки и релокации',
        'Каждый канал проверен в ноябре 2026: открыт, активен, указано число подписчиков',
      ]}>
        {data => <Channels data={data} />}
      </Gate>

      {/* ═══════════ ГЛАВА 12 ═══════════ */}
      <SectionTitle id="m12" kicker="Глава 12 · для участников лагеря" question="Как найти работу в IT за неделю при максимальных усилиях и наличии навыков">Семь дней, работа с 9 до 21</SectionTitle>
      <Answer>
        За неделю реально дойти до оффера в стартапе, небольшой компании, на аутсорсе или на контрактном проекте. В крупной компании
        цикл найма длится 3–6 недель, поэтому там цель недели: попасть на собеседования.
      </Answer>
      <Gate camp={camp} title="Пошаговый план на 7 дней" inside={[
        'Расписание по дням: что делать с вечера накануне до переговоров об оффере',
        'Квоты на неделю: отклики, личные сообщения, рекомендации, созвоны',
        'Четыре готовых шаблона сообщений и список ошибок, которые срывают поиск',
      ]}>
        {data => <Week data={data} />}
      </Gate>

      {/* ═══════════ ИСТОЧНИКИ ═══════════ */}
      <SectionTitle id="m13" kicker="Источники" question="Откуда цифры и насколько им можно верить">Источники и методика</SectionTitle>
      <P>
        Отчёт собран в ноябре 2026 года по открытым исследованиям и статистике площадок. Российские цифры hh.ru частично взяты
        из пересказов в СМИ и блогах, такие места помечены как «оценка» или оговорены. Зарплаты Хабр Карьеры это фактические
        оклады, зарплаты hh.ru это предложения в вакансиях: сравнивать их напрямую нельзя.
      </P>
      <P>
        Список компаний выгружен с Хабр Карьеры 12 ноября 2026 года. Сам реестр Минцифры на Госуслугах списком не выгружается,
        поэтому отметка об аккредитации взята с площадки: это заявление самой компании. Telegram‑каналы проверены по их публичным
        страницам в тот же день.
      </P>
      <ol style={{ paddingLeft: 22, margin: '14px 0', display: 'grid', gap: 8 }}>
        {SOURCES.map(([label, href]) => (
          <li key={href} style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.55, overflowWrap: 'anywhere' }}>
            {label}. <A href={href}>{href.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}</A>
          </li>
        ))}
      </ol>
    </div>
  )
}
