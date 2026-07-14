import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 640 }}>{caption}</figcaption>}
    </figure>
  )
}

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

export default function July14SsrSsgTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">SSG и SSR: серверный рендеринг и Next.js</h1>
        <p className="theory-subtitle">Трек: Frontend</p>
        <p className="theory-date">14 июля 2026</p>
        <p>
          Один и тот же React-сайт можно отдать браузеру по-разному: собрать HTML прямо в браузере (CSR), заранее на
          этапе сборки (SSG) или на сервере при каждом запросе (SSR). От выбора зависят скорость первой отрисовки,
          SEO и нагрузка на сервер. Разберём все три подхода, поймём, зачем нужен серверный рендеринг, и посмотрим,
          как это устроено в Next.js.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Проблема: как обычный React (CSR) отдаёт страницу</h2>
        <Term name="CSR (Client-Side Rendering)">
          классический подход SPA: сервер отдаёт почти пустой HTML и большой JS-бандл, а весь интерфейс собирается
          уже в браузере после загрузки и выполнения JavaScript.
        </Term>
        <P n={1}>
          Проблема CSR: пока не загрузился и не отработал JS, пользователь видит белый экран, а поисковый робот —
          пустой <code>&lt;div id="root"&gt;&lt;/div&gt;</code>. Это плохо для скорости первого показа (особенно на
          слабых телефонах) и для SEO. Серверный рендеринг решает обе проблемы, отдавая готовый HTML сразу.
        </P>
        <Fig caption="CSR: браузер получает пустой каркас и сам строит страницу из JS — до этого экран пустой.">
          <svg viewBox="0 0 560 120" width="560" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="45" width="90" height="34" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" />
            <text x="55" y="66" fill="#f5f5fa" fontSize="12" textAnchor="middle">Сервер</text>
            <line x1="100" y1="62" x2="200" y2="62" stroke="#94a3b8" markerEnd="url(#a)" />
            <text x="150" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">пустой HTML + JS</text>
            <rect x="200" y="45" width="110" height="34" fill="rgba(248,113,113,0.15)" stroke="#f87171" />
            <text x="255" y="66" fill="#f5f5fa" fontSize="11" textAnchor="middle">белый экран</text>
            <line x1="310" y1="62" x2="410" y2="62" stroke="#94a3b8" markerEnd="url(#a)" />
            <text x="360" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">JS отработал</text>
            <rect x="410" y="45" width="140" height="34" fill="rgba(74,222,128,0.2)" stroke="#4ade80" />
            <text x="480" y="66" fill="#f5f5fa" fontSize="11" textAnchor="middle">видно контент</text>
            <defs><marker id="a" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. SSG — генерация статики (Static Site Generation)</h2>
        <Term name="SSG (Static Site Generation)">
          HTML-страницы генерируются <strong>один раз на этапе сборки</strong> (build) и складываются как готовые
          файлы. При запросе сервер просто отдаёт готовый HTML — ничего вычислять не нужно.
        </Term>
        <P n={2}>
          SSG идеально подходит для контента, который меняется редко: блоги, документация, лендинги, маркетинговые
          страницы. Плюсы — максимальная скорость (файлы можно раздавать через CDN по всему миру), дешёвый хостинг и
          отличное SEO. Минус — при изменении данных нужна пересборка, поэтому для часто меняющегося контента SSG не
          годится.
        </P>
        <TheoryExample title="Где вы это видели">
          GitHub Pages, документация библиотек, статические лендинги — почти всё это SSG. Инструменты: Next.js
          (режим static export), Astro, Gatsby, Hugo, VitePress.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. SSR — серверный рендеринг (Server-Side Rendering)</h2>
        <Term name="SSR (Server-Side Rendering)">
          HTML генерируется на сервере <strong>при каждом запросе</strong> пользователя, уже с актуальными данными,
          и отдаётся браузеру готовым. Браузер сразу показывает контент, а затем «оживляет» его JavaScript-ом.
        </Term>
        <P n={3}>
          SSR нужен, когда контент часто меняется и должен быть свежим на момент запроса, а также зависит от
          пользователя: лента новостей, личный кабинет, страница товара с актуальной ценой и остатком. Пользователь
          и поисковик получают заполненный HTML сразу — быстрая первая отрисовка и хорошее SEO. Плата за это —
          нагрузка на сервер (он рендерит страницу на каждый запрос) и чуть более сложный деплой.
        </P>
        <Fig caption="SSR: сервер собирает готовый HTML с данными и отдаёт его — контент виден сразу.">
          <svg viewBox="0 0 560 120" width="560" height="120" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="45" width="150" height="34" fill="rgba(96,165,250,0.2)" stroke="#60a5fa" />
            <text x="85" y="60" fill="#f5f5fa" fontSize="11" textAnchor="middle">Сервер рендерит</text>
            <text x="85" y="73" fill="#f5f5fa" fontSize="11" textAnchor="middle">HTML + данные</text>
            <line x1="160" y1="62" x2="330" y2="62" stroke="#94a3b8" markerEnd="url(#b)" />
            <text x="245" y="52" fill="#94a3b8" fontSize="10" textAnchor="middle">готовый HTML</text>
            <rect x="330" y="45" width="220" height="34" fill="rgba(74,222,128,0.2)" stroke="#4ade80" />
            <text x="440" y="60" fill="#f5f5fa" fontSize="11" textAnchor="middle">контент виден сразу,</text>
            <text x="440" y="73" fill="#f5f5fa" fontSize="11" textAnchor="middle">затем гидратация JS</text>
            <defs><marker id="b" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <Term name="Гидратация (hydration)">
          процесс, при котором React в браузере «навешивает» интерактивность (обработчики событий, состояние) на уже
          пришедший с сервера статический HTML, превращая его в живое приложение.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Сравнение CSR, SSG и SSR</h2>
        <TheoryTable
          headers={['Критерий', 'CSR', 'SSG', 'SSR']}
          rows={[
            ['Когда строится HTML', 'в браузере', 'при сборке', 'на сервере при запросе'],
            ['Первая отрисовка', 'медленная', 'мгновенная', 'быстрая'],
            ['SEO', 'слабое', 'отличное', 'отличное'],
            ['Актуальность данных', 'всегда свежие', 'на момент сборки', 'свежие на запрос'],
            ['Нагрузка на сервер', 'минимальная', 'минимальная', 'высокая'],
            ['Лучше всего для', 'админки, дашборды', 'блоги, лендинги', 'ленты, каталоги, ЛК'],
          ]}
        />
        <P n={4}>
          На практике эти подходы <strong>смешивают</strong> в рамках одного сайта: главную и статьи — через SSG,
          страницу товара — через SSR, а личную панель — через CSR. Именно возможность комбинировать их постранично
          и сделала фреймворки вроде Next.js стандартом индустрии.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Next.js — фреймворк для серверного рендеринга</h2>
        <Term name="Next.js">
          фреймворк поверх React, который «из коробки» умеет CSR, SSG и SSR (а также промежуточный режим ISR —
          инкрементальную регенерацию статики), берёт на себя роутинг, сборку и оптимизацию.
        </Term>
        <P n={5}>
          Ключевая идея Next.js — <strong>роутинг на основе файлов</strong>: каждый файл в специальной папке
          автоматически становится маршрутом. В современном App Router компоненты по умолчанию —{' '}
          <strong>серверные</strong> (рендерятся на сервере, не тянут лишний JS в браузер), а интерактивные части
          явно помечают директивой <code>'use client'</code>.
        </P>
        <TheoryCode language="jsx" code={`// app/page.jsx — серверный компонент (по умолчанию).
// Данные загружаются на СЕРВЕРЕ, в браузер уходит готовый HTML.
async function getData() {
  const res = await fetch('https://api.example.com/posts', {
    cache: 'no-store',   // SSR: свежие данные на каждый запрос
    // cache: 'force-cache' — SSG-подобное поведение: закешировать
  })
  return res.json()
}

export default async function Page() {
  const posts = await getData()   // выполняется на сервере
  return (
    <ul>
      {posts.map(p => <li key={p.id}>{p.title}</li>)}
    </ul>
  )
}`} />
        <TheoryCode language="jsx" code={`'use client'   // этот компонент интерактивен — работает в браузере
import { useState } from 'react'

export default function Counter() {
  const [n, setN] = useState(0)
  return <button onClick={() => setN(n + 1)}>Кликов: {n}</button>
}`} />
        <P n={6}>
          Так в одном приложении сочетаются оба мира: серверные компоненты быстро отдают контент и данные без лишнего
          JS, а клиентские — обеспечивают интерактивность там, где она реально нужна. Это даёт быструю загрузку,
          хорошее SEO и удобную разработку одновременно.
        </P>
        <TheoryExample title="ISR — золотая середина">
          Incremental Static Regeneration — страница генерируется как статика (быстро, кешируется), но
          автоматически пересобирается раз в N секунд. Так получают скорость SSG и почти свежесть SSR — например,
          для каталога товаров, где цена может обновляться раз в минуту.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={7}>
          <strong>CSR</strong> строит страницу в браузере — гибко, но медленный старт и слабое SEO.{' '}
          <strong>SSG</strong> генерирует HTML заранее при сборке — идеально для редко меняющегося контента,
          максимально быстро. <strong>SSR</strong> рендерит HTML на сервере при каждом запросе — свежие данные,
          хорошее SEO, но нагрузка на сервер. После прихода HTML React проводит <strong>гидратацию</strong>,
          добавляя интерактивность. <strong>Next.js</strong> позволяет выбирать режим постранично и по умолчанию
          использует серверные компоненты, комбинируя скорость и интерактивность в одном приложении.
        </P>
      </section>
    </div>
  )
}
