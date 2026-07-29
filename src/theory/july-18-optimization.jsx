import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
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

export default function July18OptimizationTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Оптимизация фронтенда и бэкенда веб-приложения</h1>
        <p className="theory-subtitle">Треки: Frontend и Backend</p>
        <p className="theory-date">18 июля 2026</p>
        <p>
          Медленное приложение теряет пользователей: даже задержка в одну секунду заметно снижает конверсию и
          вовлечённость. Сегодня разберём, как ускорять фронтенд на JavaScript/React, как ускорять бэкенд на
          Node.js, Python и Go, и какими инструментами измерять, насколько приложение уже оптимизировано, прежде
          чем что-либо чинить.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем вообще заниматься оптимизацией</h2>
        <P n={1}>
          Скорость — это не «приятный бонус», а измеримый бизнес-показатель. Google неоднократно публиковал
          данные о том, что рост времени загрузки страницы с 1 до 3 секунд повышает вероятность отказа
          пользователя более чем в два раза. Поисковые системы также используют скорость загрузки как один из
          факторов ранжирования — медленный сайт хуже виден в поиске.
        </P>
        <P n={2}>
          Оптимизацию делят на две большие области: <strong>фронтенд</strong> — то, что происходит в браузере
          пользователя (загрузка, рендеринг, отклик интерфейса), и <strong>бэкенд</strong> — то, что происходит на
          сервере (скорость обработки запроса, работа с базой данных, нагрузка). Разберём каждую по отдельности.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Оптимизация фронтенда: загрузка страницы</h2>
        <Term name="Code splitting (разделение кода)">
          вместо одного огромного JS-бандла приложение разбивают на несколько частей, которые подгружаются по
          требованию — например, отдельно для каждой страницы или тяжёлого компонента.
        </Term>
        <TheoryCode language="jsx" code={`// React: динамический импорт вместо статического
import { lazy, Suspense } from 'react'

// компонент подгрузится отдельным файлом только когда реально понадобится
const AdminPanel = lazy(() => import('./AdminPanel'))

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <AdminPanel />
    </Suspense>
  )
}`} />
        <Term name="Tree shaking">
          автоматическое удаление неиспользуемого кода из финального бандла на этапе сборки (Vite, Webpack). Чтобы
          он работал эффективно, библиотеки импортируют точечно, а не целиком.
        </Term>
        <TheoryCode language="javascript" code={`// плохо: тянет в бандл всю библиотеку lodash
import _ from 'lodash'

// хорошо: попадает в бандл только нужная функция
import debounce from 'lodash/debounce'`} />
        <Term name="Ленивая загрузка изображений (lazy loading)">
          изображения вне видимой области экрана не загружаются сразу, а подгружаются по мере прокрутки страницы к
          ним.
        </Term>
        <TheoryCode language="html" code={`<!-- браузер сам отложит загрузку картинки, пока она не рядом с экраном -->
<img src="photo.jpg" loading="lazy" alt="..." />`} />
        <P n={3}>
          Дополнительно к загрузке страницы относятся: <strong>сжатие изображений</strong> и перевод их в
          современные форматы (WebP, AVIF вместо JPEG/PNG), <strong>минификация</strong> CSS и JS (удаление
          пробелов, сокращение имён переменных — делает сборщик автоматически), и <strong>кеширование</strong>{' '}
          статических файлов через правильные HTTP-заголовки, чтобы браузер не скачивал одно и то же повторно.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Оптимизация фронтенда: рендеринг в React</h2>
        <P n={4}>
          Загрузка страницы — только полдела. Дальше важно, чтобы интерфейс не «тормозил» при взаимодействии:
          не пересчитывал заново то, что не изменилось, и не перерисовывал компоненты без необходимости.
        </P>
        <Term name="React.memo">
          оборачивает компонент так, что он не перерисовывается повторно, если его входные пропсы не изменились
          между рендерами.
        </Term>
        <Term name="useMemo и useCallback">
          useMemo кеширует результат «тяжёлого» вычисления между рендерами, useCallback — кеширует саму функцию,
          чтобы она не создавалась заново на каждый рендер и не «ломала» memo у дочерних компонентов.
        </Term>
        <TheoryCode language="jsx" code={`import { memo, useMemo, useCallback } from 'react'

// компонент не перерисуется, если props не изменились
const ProductCard = memo(function ProductCard({ product, onAdd }) {
  return <div onClick={() => onAdd(product.id)}>{product.name}</div>
})

function ProductList({ products, filter }) {
  // пересчитывается заново только если products или filter изменились
  const filtered = useMemo(
    () => products.filter(p => p.category === filter),
    [products, filter]
  )

  // одна и та же функция между рендерами — не «сломает» memo у ProductCard
  const handleAdd = useCallback((id) => addToCart(id), [])

  return filtered.map(p => <ProductCard key={p.id} product={p} onAdd={handleAdd} />)
}`} />
        <Term name="Виртуализация списков">
          при выводе очень длинных списков (тысячи строк) в DOM рендерят только видимые на экране элементы, а не
          весь список целиком. Библиотеки: react-window, react-virtualized.
        </Term>
        <TheoryTable
          headers={['Приём', 'Что решает']}
          rows={[
            ['React.memo', 'лишние перерисовки компонента при неизменных данных'],
            ['useMemo', 'повторные тяжёлые вычисления на каждый рендер'],
            ['useCallback', 'пересоздание функций, ломающее memo у детей'],
            ['Виртуализация списков', 'рендер тысяч DOM-узлов, когда видно только 10-20'],
            ['key при рендере списков', 'React неправильно сопоставляет старые/новые элементы списка'],
          ]}
        />
        <TheoryExample title="Частая ошибка">
          Оптимизация без замера — вред. useMemo и useCallback сами по себе имеют накладные расходы на сравнение
          зависимостей; оборачивать в них всё подряд без реальной тяжёлой работы внутри часто не ускоряет, а
          замедляет код. Сначала измеряют узкое место (например, через React DevTools Profiler), потом оптимизируют
          именно его.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Оптимизация фронтенда: сеть и рендеринг на сервере</h2>
        <P n={5}>
          Часть узких мест решается ещё до того, как код React вообще начинает выполняться. Здесь пригождаются
          подходы, которые уже разбирались на занятии про SSR и SSG: серверный рендеринг отдаёт браузеру готовый
          HTML вместо пустой страницы, а статическая генерация вообще избавляет от рендеринга на каждый запрос.
        </P>
        <TheoryTable
          headers={['Приём', 'Суть']}
          rows={[
            ['CDN (Content Delivery Network)', 'статические файлы раздаются с сервера физически ближе к пользователю'],
            ['HTTP/2 или HTTP/3', 'параллельная загрузка нескольких файлов по одному соединению, меньше задержек'],
            ['Preload / prefetch критичных ресурсов', 'браузер заранее начинает грузить шрифты, ключевые скрипты'],
            ['SSR / SSG (см. занятие 14 июля)', 'пользователь видит готовый контент, не дожидаясь загрузки всего JS'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Оптимизация бэкенда: общие принципы</h2>
        <P n={6}>
          На бэкенде «медленно» почти всегда означает одно из трёх: <strong>долгие запросы к базе данных</strong>,{' '}
          <strong>блокирующие операции</strong>, которые держат процесс занятым без необходимости, или{' '}
          <strong>отсутствие кеша</strong> там, где одни и те же данные пересчитываются заново на каждый запрос.
          Дальше — как эти проблемы решают на трёх популярных стеках.
        </P>
        <Term name="N+1 запрос">
          классическая ошибка: вместо одного запроса, который сразу забирает все нужные связанные данные, код
          делает N дополнительных отдельных запросов в цикле — по одному на каждую запись. Лечится через{' '}
          <code>JOIN</code> или явную предзагрузку связанных данных (eager loading).
        </Term>
        <TheoryCode language="python" code={`# плохо: N+1 запрос — на каждого пользователя отдельный запрос к БД
for user in User.objects.all():
    print(user.orders.count())  # отдельный SQL-запрос на каждой итерации

# хорошо: один запрос с предзагрузкой связанных данных (Django ORM)
for user in User.objects.prefetch_related('orders'):
    print(user.orders.count())  # данные уже загружены заранее`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Оптимизация бэкенда: Node.js</h2>
        <P n={7}>
          Node.js работает на одном потоке с событийным циклом (event loop), поэтому его главная опасность —{' '}
          <strong>заблокировать этот единственный поток</strong> тяжёлыми синхронными вычислениями: пока идёт
          такая операция, сервер не может обработать вообще ни одного другого запроса.
        </P>
        <TheoryCode language="javascript" code={`// плохо: синхронное чтение файла блокирует event loop
const data = fs.readFileSync('big-file.json')

// хорошо: асинхронная версия не блокирует обработку других запросов
const data = await fs.promises.readFile('big-file.json')`} />
        <TheoryTable
          headers={['Приём', 'Суть']}
          rows={[
            ['Асинхронные операции', 'всегда использовать async-версии I/O операций, не блокировать event loop'],
            ['Кластеризация (cluster / PM2)', 'запуск нескольких процессов Node.js — по числу ядер CPU'],
            ['Кеш в Redis', 'частые и «тяжёлые» ответы кешируют, не пересчитывая каждый раз'],
            ['Стриминг ответов', 'большие файлы/данные отдают потоком (stream), а не собирают целиком в памяти'],
            ['Worker threads', 'тяжёлые CPU-вычисления выносят в отдельный поток, не трогая основной event loop'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Оптимизация бэкенда: Python</h2>
        <P n={8}>
          У классического синхронного Python (например, обычный Flask/Django-хендлер) каждый запрос занимает
          отдельный поток или процесс на всё время своего выполнения, включая ожидание ответа от базы данных или
          внешнего API. Современный подход — <strong>асинхронные фреймворки</strong> (FastAPI на базе{' '}
          <code>asyncio</code>), где во время ожидания I/O процесс освобождается для обработки других запросов.
        </P>
        <TheoryCode language="python" code={`# синхронный вариант: процесс "простаивает" во время сетевого запроса
def get_user_data(user_id):
    response = requests.get(f"https://api.example.com/users/{user_id}")
    return response.json()

# асинхронный вариант: во время ожидания ответа сервер обрабатывает другие запросы
async def get_user_data(user_id):
    async with httpx.AsyncClient() as client:
        response = await client.get(f"https://api.example.com/users/{user_id}")
        return response.json()`} />
        <TheoryTable
          headers={['Приём', 'Суть']}
          rows={[
            ['FastAPI / asyncio', 'асинхронная обработка запросов вместо блокирующей'],
            ['select_related / prefetch_related (Django)', 'решение проблемы N+1 запросов к БД'],
            ['Индексы в базе данных', 'ускоряют выборки, за которые отвечают частые WHERE/ORDER BY'],
            ['Celery / фоновые задачи', 'тяжёлые операции (отправка писем, генерация отчётов) выносят из запроса в очередь'],
            ['Кеш через Redis / Memcached', 'повторяющиеся тяжёлые вычисления и запросы кешируются'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Оптимизация бэкенда: Go</h2>
        <P n={9}>
          Go изначально спроектирован для высокой производительности: компилируется в машинный код, и параллелизм
          в нём встроен на уровне языка через <strong>горутины</strong> — лёгкие потоки выполнения, которых можно
          запускать тысячи без ощутимых накладных расходов.
        </P>
        <TheoryCode language="go" code={`// каждый запрос уже обрабатывается в отдельной горутине автоматически,
// но горутины можно использовать и для параллельной работы внутри обработчика
func handler(w http.ResponseWriter, r *http.Request) {
    resultsCh := make(chan string, 2)

    go func() { resultsCh <- fetchFromServiceA() }()
    go func() { resultsCh <- fetchFromServiceB() }()

    a, b := <-resultsCh, <-resultsCh // ждём оба результата параллельно, а не по очереди
    fmt.Fprintf(w, "%s + %s", a, b)
}`} />
        <TheoryTable
          headers={['Приём', 'Суть']}
          rows={[
            ['Горутины и каналы', 'параллельные независимые операции выполняются одновременно, а не последовательно'],
            ['Пул соединений к БД (connection pool)', 'переиспользование соединений вместо создания нового на каждый запрос'],
            ['sync.Pool', 'переиспользование часто создаваемых объектов, снижение нагрузки на сборщик мусора'],
            ['pprof', 'встроенный профилировщик Go для поиска реальных узких мест в CPU и памяти'],
          ]}
        />
        <TheoryExample title="Общая мысль по всем трём стекам">
          Несмотря на разный синтаксис, идея одна: не заставлять процесс/поток бессмысленно простаивать в
          ожидании, кешировать то, что можно не считать заново, и не делать лишних запросов к базе данных. Разница
          между Node.js, Python и Go — в том, какими именно инструментами языка этого добиваются.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Инструменты проверки оптимизации</h2>
        <P n={10}>
          Оптимизировать «на глаз» — плохая идея: без замеров легко улучшить то, что и так было быстрым, и
          пропустить настоящую проблему. Есть несколько стандартных инструментов, которыми проверяют, насколько
          приложение оптимизировано.
        </P>
        <Term name="Google PageSpeed Insights">
          бесплатный онлайн-инструмент от Google, анализирующий страницу по реальным метрикам загрузки и
          интерактивности, отдельно для мобильных и десктопных условий, и дающий конкретные рекомендации
          (сжать картинки, убрать неиспользуемый JS и так далее).
        </Term>
        <Term name="Core Web Vitals">
          набор из трёх ключевых метрик Google, напрямую влияющих на ранжирование в поиске: LCP (Largest
          Contentful Paint — как быстро отрисовался основной контент), INP (Interaction to Next Paint — как быстро
          страница отвечает на действия пользователя) и CLS (Cumulative Layout Shift — насколько сильно «прыгает»
          вёрстка при загрузке).
        </Term>
        <TheoryTable
          headers={['Инструмент', 'Что измеряет']}
          rows={[
            ['Google PageSpeed Insights / Lighthouse', 'общая оценка фронтенда: производительность, доступность, SEO'],
            ['Chrome DevTools (Performance, Network)', 'детальный разбор загрузки и рендеринга конкретно в браузере'],
            ['WebPageTest', 'загрузка страницы из разных точек мира и на разных устройствах'],
            ['React DevTools Profiler', 'поиск лишних перерисовок и медленных React-компонентов'],
            ['Apache JMeter / k6', 'нагрузочное тестирование бэкенда — сколько запросов сервер держит одновременно'],
            ['py-spy / pprof / clinic.js', 'профилировщики для поиска узких мест в Python, Go и Node.js соответственно'],
          ]}
        />
        <TheoryExample title="Правильный порядок действий">
          Сначала измерить (PageSpeed Insights, DevTools, профилировщик) → найти самое узкое место → исправить
          именно его → измерить снова, чтобы убедиться в реальном эффекте. Оптимизация без «до» и «после» замера
          — это гадание, а не инженерная работа.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={11}>
          На <strong>фронтенде</strong> оптимизация делится на загрузку (code splitting, tree shaking, ленивая
          загрузка картинок, сжатие и кеширование) и рендеринг (React.memo, useMemo/useCallback, виртуализация
          списков), плюс сетевые приёмы вроде CDN и SSR/SSG. На <strong>бэкенде</strong> общий принцип один и тот же
          на любом стеке — не простаивать, кешировать, не плодить лишние запросы к БД, — но инструменты разные:
          асинхронность и кластеризация в <strong>Node.js</strong>, async/await и фоновые задачи в{' '}
          <strong>Python</strong>, горутины и пул соединений в <strong>Go</strong>. И главное правило для обеих
          сторон: любую оптимизацию предваряет <strong>замер</strong> — через Google PageSpeed Insights, Core Web
          Vitals, DevTools или профилировщики, — иначе непонятно, что чинить и помогло ли это на самом деле.
        </P>
      </section>
    </div>
  )
}
