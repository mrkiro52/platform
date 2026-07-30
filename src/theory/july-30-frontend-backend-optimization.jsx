import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 680, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 0, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 680 }}>{caption}</figcaption>}
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

export default function July30OptimizationTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Методы оптимизации фронтенда и бэкенда</h1>
        <p className="theory-subtitle">Трек: Frontend / Backend</p>
        <p className="theory-date">30 июля 2026</p>
        <p>
          Оптимизация — это не одно действие, а набор приёмов разного уровня сложности. Сегодня пройдём путь от
          «включить одну настройку и получить прирост» до сложных архитектурных решений, которые применяют в
          высоконагруженных системах. Разберём отдельно фронтенд и бэкенд, от простого к сложному.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Как измерять, что оптимизировать</h2>
        <P n={1}>
          Прежде чем оптимизировать — нужно измерить. Оптимизация вслепую часто тратит время на то, что не влияет на
          реальную скорость восприятия пользователем.
        </P>
        <TheoryTable
          headers={['Метрика', 'Что означает', 'Где смотреть']}
          rows={[
            ['LCP (Largest Contentful Paint)', 'Когда отрисовался самый крупный видимый элемент', 'Lighthouse, Chrome DevTools, PageSpeed Insights'],
            ['INP (Interaction to Next Paint)', 'Насколько быстро страница отвечает на клик/ввод', 'Chrome DevTools, real user monitoring'],
            ['CLS (Cumulative Layout Shift)', 'Насколько сильно «прыгает» вёрстка при загрузке', 'Lighthouse, PageSpeed Insights'],
            ['TTFB (Time to First Byte)', 'Как быстро сервер отдал первый байт ответа', 'DevTools Network, серверные логи'],
            ['p95/p99 latency бэкенда', 'Время ответа API для 95%/99% запросов (не среднее — важны выбросы)', 'APM-системы (Datadog, New Relic), логи'],
          ]}
        />
        <TheoryExample title="Правило">
          Сначала профилируем и находим узкое место, потом чиним именно его. Оптимизация того, что не является
          проблемой — трата времени и источник лишней сложности в коде.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Оптимизация фронтенда — от простого к сложному</h2>

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 1 — базовые настройки сборки</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Минификация JS/CSS', 'Убирает пробелы, комментарии, укорачивает имена переменных — меньше байт для передачи'],
            ['Сжатие Gzip/Brotli на сервере', 'Текстовые файлы (JS/CSS/HTML) сжимаются в 3–5 раз при передаче'],
            ['Кэширование статики (Cache-Control, ETag)', 'Повторные визиты не перекачивают неизменившиеся файлы'],
            ['Оптимизация изображений (WebP/AVIF, сжатие)', 'Изображения обычно — самая тяжёлая часть страницы'],
          ]}
        />

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 2 — код-сплиттинг и ленивая загрузка</h3>
        <Term name="Code splitting">
          вместо одного огромного JS-файла со всем приложением сборщик (Vite/Webpack) режет код на чанки —
          пользователь скачивает только то, что нужно для текущей страницы.
        </Term>
        <TheoryCode language="jsx" code={`// Вместо статического импорта — динамический, компонент грузится только когда нужен
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<p>Загрузка...</p>}>
      <HeavyChart />
    </Suspense>
  )
}`} />
        <Term name="Lazy loading изображений и роутов">
          атрибут <code>loading="lazy"</code> у <code>&lt;img&gt;</code> откладывает загрузку картинок за пределами
          экрана; ленивая загрузка роутов (React.lazy для страниц) не даёт бандлу всего приложения грузиться сразу.
        </Term>

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 3 — оптимизация критического пути рендера</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Preload/prefetch критичных ресурсов', '<link rel="preload"> подсказывает браузеру скачать шрифт/скрипт заранее, до того как он понадобится по разбору HTML'],
            ['Critical CSS inline', 'Стили для первого экрана вставляются прямо в HTML — не нужно ждать отдельный CSS-файл для первой отрисовки'],
            ['Tree shaking', 'Сборщик выбрасывает неиспользуемый код библиотек из финального бандла'],
            ['Уменьшение количества сторонних скриптов', 'Каждый сторонний виджет/трекер — это блокировка потока и лишний сетевой запрос'],
          ]}
        />

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 4 — оптимизация рендеринга в рантайме</h3>
        <TheoryCode language="jsx" code={`// Мемоизация: компонент не перерисовывается, если пропсы не изменились
const ExpensiveRow = React.memo(function ExpensiveRow({ item }) {
  return <div>{item.name}</div>
})

// useMemo — не пересчитывать тяжёлое вычисление на каждый рендер
const sorted = useMemo(() => items.sort(compareFn), [items])

// useCallback — не создавать новую функцию-пропс на каждый рендер
const handleClick = useCallback(() => doSomething(id), [id])`} />
        <Term name="Виртуализация списков">
          если нужно отрисовать список из тысяч элементов (например, ленту заказов), в DOM рендерятся только видимые
          строки — остальные подгружаются при скролле (библиотеки react-window, react-virtualized).
        </Term>

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 5 — продвинутые и профессиональные приёмы</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['SSR / SSG (серверный/статический рендеринг)', 'HTML приходит уже отрисованным — быстрее первая отрисовка, лучше SEO (Next.js, Astro)'],
            ['Edge rendering / edge caching', 'Рендер и кэш ближе географически к пользователю (Vercel Edge, Cloudflare Workers)'],
            ['Service Worker + офлайн-кэш (PWA)', 'Повторные визиты грузятся из кэша браузера, приложение работает частично офлайн'],
            ['HTTP/2 и HTTP/3', 'Мультиплексирование запросов по одному соединению — меньше накладных расходов на TCP/TLS handshake'],
            ['Web Workers', 'Тяжёлые вычисления уводятся в отдельный поток, не блокируя основной UI-поток'],
            ['Islands architecture / partial hydration', 'Гидрируется (становится интерактивной) только та часть страницы, которая реально нуждается в JS'],
          ]}
        />
        <TheoryExample title="Практический вывод по фронтенду">
          80% пользы обычно даёт уровень 1–2 (сжатие, кэш, code splitting, картинки) — это должно быть сделано в
          любом проекте. Уровни 4–5 нужны, когда простые меры исчерпаны, а метрики всё ещё не устраивают.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Оптимизация бэкенда — от простого к сложному</h2>

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 1 — база данных: базовая гигиена</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Индексы на часто используемых полях', 'Поиск по индексу — O(log n), без индекса — полное сканирование таблицы O(n)'],
            ['SELECT только нужных колонок (не SELECT *)', 'Меньше данных передаётся из БД и по сети'],
            ['Пагинация (LIMIT/OFFSET или курсоры)', 'Не тянуть 100 000 строк, когда пользователю нужно 20'],
          ]}
        />
        <TheoryCode language="sql" code={`-- Без индекса: полное сканирование таблицы на каждый такой запрос
SELECT * FROM orders WHERE user_id = 4521;

-- С индексом поиск почти мгновенный даже на миллионах строк
CREATE INDEX idx_orders_user_id ON orders(user_id);`} />

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 2 — устранение N+1 запросов и кэширование</h3>
        <Term name="Проблема N+1">
          классическая ошибка ORM: чтобы вывести список из 50 постов с именами авторов, код делает 1 запрос на посты
          и затем ещё 50 отдельных запросов — по одному на автора каждого поста, вместо одного JOIN-запроса.
        </Term>
        <TheoryCode language="python" code={`# Плохо: N+1 — по отдельному запросу на автора каждого поста
posts = Post.objects.all()
for post in posts:
    print(post.author.name)  # каждый .author — новый SQL-запрос

# Хорошо: один JOIN-запрос вместо N+1
posts = Post.objects.select_related('author').all()
for post in posts:
    print(post.author.name)  # автор уже загружен вместе с постом`} />
        <Term name="Кэширование (Redis / in-memory)">
          результаты дорогих запросов или вычислений сохраняются в быстром хранилище (Redis, Memcached) с временем
          жизни (TTL) — повторный запрос отдаётся из кэша за миллисекунды вместо повторного похода в БД.
        </Term>

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 3 — конкурентность и неблокирующая работа</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Connection pooling к БД', 'Переиспользование открытых соединений вместо установки нового на каждый запрос'],
            ['Асинхронный I/O (async/await)', 'Пока сервер ждёт ответа от БД/внешнего API, поток может обрабатывать другие запросы'],
            ['Фоновые задачи и очереди (Celery, RabbitMQ, SQS)', 'Долгие операции (отправка email, генерация отчёта) выносятся из запроса пользователя в фон'],
          ]}
        />

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 4 — масштабирование</h3>
        <Fig caption="Горизонтальное масштабирование: балансировщик распределяет запросы между несколькими копиями сервера.">
          <svg viewBox="0 0 460 180" width="460" height="180" xmlns="http://www.w3.org/2000/svg">
            <rect x="180" y="15" width="100" height="35" fill="rgba(200,255,0,0.1)" stroke="#c8ff00" />
            <text x="230" y="37" fill="#f5f5fa" fontSize="10" textAnchor="middle">Load Balancer</text>
            {[0, 1, 2].map(i => (
              <g key={i}>
                <line x1={230} y1={50} x2={80 + i * 150} y2={100} stroke="#94a3b8" />
                <rect x={30 + i * 150} y="100" width="100" height="35" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
                <text x={80 + i * 150} y="122" fill="#f5f5fa" fontSize="9" textAnchor="middle">Сервер {i + 1}</text>
              </g>
            ))}
            <text x="230" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Каждый сервер — идентичная копия приложения, легко добавить ещё одну под нагрузкой</text>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Горизонтальное масштабирование + балансировка нагрузки', 'Несколько копий сервера вместо одной мощной машины — легче наращивать под нагрузку'],
            ['Read-реплики базы данных', 'Запросы на чтение уходят на реплики, снимая нагрузку с основной (write) базы'],
            ['Шардирование БД', 'Данные делятся на части по ключу (например, по region или user_id) и хранятся на разных серверах'],
            ['CDN для статики и кэша API-ответов', 'Контент отдаётся с сервера, географически ближайшего к пользователю'],
          ]}
        />

        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, marginTop: 20, marginBottom: 8 }}>Уровень 5 — профессиональный уровень</h3>
        <TheoryTable
          headers={['Приём', 'Эффект']}
          rows={[
            ['Профилирование (APM: Datadog, New Relic, py-spy)', 'Точно находит, какая функция/запрос съедает больше всего времени в реальном трафике'],
            ['Rate limiting и защита от перегрузки', 'Ограничение количества запросов от одного клиента, чтобы не «уронить» сервис'],
            ['Микросервисная декомпозиция при необходимости', 'Разделение монолита на независимо масштабируемые сервисы — оправдано только при реальной необходимости'],
            ['Circuit breaker для внешних зависимостей', 'Если внешний сервис/БД перестал отвечать, система быстро «отваливается» контролируемо вместо зависания всех запросов'],
            ['Батчинг и дедупликация запросов', 'Несколько похожих запросов за короткое время объединяются в один поход к БД/внешнему API'],
          ]}
        />
        <TheoryExample title="Практический вывод по бэкенду">
          Индексы, устранение N+1 и базовое кэширование решают 90% проблем производительности типичного проекта.
          Горизонтальное масштабирование, шардирование и микросервисы — это инструменты для систем с реальной
          высокой нагрузкой, а не то, с чего стоит начинать проект.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={2}>
          Оптимизация всегда начинается с измерения (Core Web Vitals для фронтенда, p95/p99 latency для бэкенда), а
          не с угадывания. На фронтенде путь от простого к сложному: сжатие и кэш → code splitting и ленивая загрузка
          → критический путь рендера → мемоизация и виртуализация → SSR/SSG, edge, Service Worker. На бэкенде:
          индексы и пагинация → устранение N+1 и кэш → асинхронность и очереди → горизонтальное масштабирование и
          реплики → профилирование, rate limiting и микросервисы. Базовые меры дают наибольший эффект за наименьшие
          усилия — сложные архитектурные решения нужны только когда простые исчерпаны, а нагрузка это подтверждает.
        </P>
      </section>
    </div>
  )
}
