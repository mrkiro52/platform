import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', border: '#2a2a3a' }

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

export default function July5JavaScriptTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Продвинутый JavaScript</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">5 июля 2026</p>
        <p>
          JavaScript — язык, на котором «оживает» весь фронтенд. Но чтобы писать серьёзные приложения, недостаточно
          знать переменные и функции. Нужно понимать, <strong>как код на самом деле выполняется</strong>: почему
          JavaScript однопоточный, но при этом не «зависает», ожидая ответ сервера. Сегодня разберём три
          фундаментальные вещи, которые связаны в одну картину: <strong>Event Loop</strong> (цикл событий),{' '}
          <strong>Promises</strong> (промисы) и синтаксис <strong>async/await</strong>. Это самая частая тема на
          собеседованиях фронтендера — и главная причина «магии» асинхронного кода.
        </p>
      </section>

      {/* Синхронность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Синхронный код и одна нить исполнения</h2>
        <p>
          JavaScript — <strong>однопоточный</strong> (single-threaded) язык: в каждый момент времени выполняется
          ровно одна операция, строка за строкой, сверху вниз. Нет двух функций, работающих «параллельно» внутри
          самого JS. Такой код называют <strong>синхронным</strong> — каждая следующая строка ждёт, пока
          завершится предыдущая.
        </p>
        <TheoryCode language="js" code={`console.log('1')
console.log('2')
console.log('3')
// Вывод строго: 1, 2, 3`} />
        <Term name="Call Stack (стек вызовов)">
          структура, куда JS складывает вызовы функций. Вызвали функцию — она легла на стек; она завершилась —
          снялась со стека. Пока функция на стеке не закончилась, движок занят только ей.
        </Term>
        <TheoryExample title="В чём проблема">
          Если синхронная операция долгая (например, тяжёлый цикл или — гипотетически — ожидание ответа сервера
          «на месте»), она заблокирует стек. Страница перестанет реагировать на клики, анимации замрут. Именно
          поэтому долгие операции в JS делают <strong>асинхронными</strong> — чтобы не блокировать единственный поток.
        </TheoryExample>
      </section>

      {/* Асинхронность и окружение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Откуда берётся асинхронность</h2>
        <p>
          Сам движок JavaScript (например, V8 в Chrome) умеет только выполнять код и вести стек. Но он работает не
          в пустоте, а внутри <strong>среды выполнения</strong> — браузера или Node.js. Именно среда даёт
          «внешние» возможности: таймеры (<code>setTimeout</code>), сетевые запросы (<code>fetch</code>), события
          DOM (клики). Эти операции выполняются <strong>вне</strong> основного потока JS, а когда завершаются —
          их коллбэки становятся в очередь на исполнение.
        </p>
        <Term name="Web API / среда выполнения">
          набор возможностей, которые предоставляет браузер (таймеры, сеть, DOM). Пока таймер «тикает» или сервер
          отвечает, основной поток JS свободен и продолжает работу.
        </Term>
        <Term name="Callback (коллбэк)">
          функция, которую мы передаём «на потом» — чтобы её вызвали, когда асинхронная операция завершится.
        </Term>
        <TheoryCode language="js" code={`console.log('старт')

setTimeout(() => {
  console.log('таймер сработал')   // выполнится ПОЗЖЕ
}, 0)

console.log('конец')

// Вывод: старт, конец, таймер сработал
// Хотя задержка 0 мс — коллбэк ждёт, пока стек освободится!`} />
      </section>

      {/* Event Loop */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Event Loop — цикл событий</h2>
        <p>
          <strong>Event Loop</strong> — это механизм, который связывает всё воедино. Его работа проста и
          бесконечна: «Если стек вызовов пуст — возьми задачу из очереди и положи на стек». Так однопоточный JS
          создаёт иллюзию параллельности: долгие операции ждут в стороне, а их результаты обрабатываются, как
          только освобождается поток.
        </p>
        <p>Есть две очереди задач, и это критически важно:</p>
        <Term name="Macrotask Queue (очередь макрозадач)">
          сюда попадают коллбэки <code>setTimeout</code>, <code>setInterval</code>, событий DOM. Из неё Event Loop
          берёт по <strong>одной</strong> задаче за проход.
        </Term>
        <Term name="Microtask Queue (очередь микрозадач)">
          сюда попадают коллбэки промисов (<code>.then</code>, <code>await</code>). Она имеет{' '}
          <strong>приоритет</strong>: после каждой задачи Event Loop опустошает всю очередь микрозадач целиком,
          прежде чем взять следующую макрозадачу.
        </Term>
        <Fig caption="Event Loop: пока стек пуст, движок сначала опустошает все микрозадачи (промисы), затем берёт одну макрозадачу (таймер) — и цикл повторяется">
          <svg viewBox="0 0 620 300" width="100%" style={{ maxWidth: 620 }} xmlns="http://www.w3.org/2000/svg">
            {/* Call stack */}
            <rect x="30" y="40" width="150" height="180" rx="8" fill="rgba(200,255,0,0.06)" stroke={C.lime} />
            <text x="105" y="30" fill={C.lime} fontSize="13" fontWeight="700" textAnchor="middle">Call Stack</text>
            <text x="105" y="135" fill={C.sub} fontSize="11" textAnchor="middle">выполняется</text>
            <text x="105" y="152" fill={C.sub} fontSize="11" textAnchor="middle">одна функция</text>
            {/* Event loop circle */}
            <circle cx="310" cy="130" r="42" fill="none" stroke="#818cf8" strokeWidth="2" strokeDasharray="5 4" />
            <text x="310" y="126" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle">Event</text>
            <text x="310" y="142" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle">Loop</text>
            <path d="M310 84 A46 46 0 0 1 356 130" fill="none" stroke="#818cf8" strokeWidth="2" markerEnd="url(#jarr)" />
            {/* Microtask queue */}
            <rect x="440" y="40" width="150" height="70" rx="8" fill="rgba(129,140,248,0.08)" stroke="#818cf8" />
            <text x="515" y="30" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle">Microtasks</text>
            <text x="515" y="70" fill={C.text} fontSize="10" textAnchor="middle">.then / await</text>
            <text x="515" y="90" fill={C.sub} fontSize="9" textAnchor="middle">приоритет ★</text>
            {/* Macrotask queue */}
            <rect x="440" y="160" width="150" height="70" rx="8" fill="rgba(200,255,0,0.06)" stroke={C.border} />
            <text x="515" y="150" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Macrotasks</text>
            <text x="515" y="190" fill={C.text} fontSize="10" textAnchor="middle">setTimeout</text>
            <text x="515" y="210" fill={C.sub} fontSize="9" textAnchor="middle">по одной за проход</text>
            {/* arrows queues -> loop */}
            <line x1="440" y1="75" x2="352" y2="120" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#jarr)" />
            <line x1="440" y1="195" x2="352" y2="145" stroke={C.sub} strokeWidth="1.5" strokeDasharray="3 2" markerEnd="url(#jarr2)" />
            {/* loop -> stack */}
            <line x1="268" y1="130" x2="185" y2="130" stroke="#818cf8" strokeWidth="2" markerEnd="url(#jarr)" />
            <defs>
              <marker id="jarr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#818cf8" /></marker>
              <marker id="jarr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryCode language="js" code={`console.log('1 — синхронно')

setTimeout(() => console.log('2 — макрозадача (таймер)'), 0)

Promise.resolve().then(() => console.log('3 — микрозадача (промис)'))

console.log('4 — синхронно')

// Вывод: 1, 4, 3, 2
// Сначала весь синхронный код (1, 4),
// потом все микрозадачи (3),
// и только потом макрозадача (2)`} />
        <TheoryExample title="Почему такой порядок">
          Синхронные <code>console.log</code> (1 и 4) выполняются сразу на стеке. Когда стек опустел, Event Loop
          опустошает микрозадачи — печатает 3. И лишь затем берёт макрозадачу таймера — печатает 2. Понимание
          этого порядка отличает джуна от мидла.
        </TheoryExample>
      </section>

      {/* Callback hell */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Проблема коллбэков: «callback hell»</h2>
        <p>
          Раньше асинхронность оформляли только через коллбэки. Когда одна асинхронная операция зависит от
          результата другой, коллбэки вкладываются друг в друга — код разрастается «лесенкой» вправо, его тяжело
          читать и почти невозможно нормально обрабатывать ошибки.
        </p>
        <TheoryCode language="js" code={`// "Ад коллбэков" — так делать НЕ надо
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0], (details) => {
      console.log(details)
      // ...и так вглубь, обработка ошибок на каждом уровне
    })
  })
})`} />
        <p>Именно для решения этой проблемы в язык добавили <strong>промисы</strong>.</p>
      </section>

      {/* Promises */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Promises — промисы</h2>
        <Term name="Promise (промис)">
          объект, представляющий <strong>результат асинхронной операции, которого пока может не быть</strong>.
          Это «обещание»: «я не знаю результат прямо сейчас, но обязательно сообщу его позже — либо успех, либо
          ошибку».
        </Term>
        <p>Промис всегда находится в одном из трёх состояний:</p>
        <TheoryTable
          headers={['Состояние', 'Что означает']}
          rows={[
            ['pending (ожидание)', 'операция ещё выполняется, результата нет'],
            ['fulfilled (успех)', 'операция завершилась успешно, есть значение'],
            ['rejected (ошибка)', 'операция завершилась с ошибкой'],
          ]}
        />
        <Fig caption="Жизненный цикл промиса: из pending он переходит либо в fulfilled (→ .then), либо в rejected (→ .catch). Изменить состояние повторно нельзя">
          <svg viewBox="0 0 560 220" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="200" y="20" width="160" height="46" rx="8" fill="rgba(129,140,248,0.12)" stroke="#818cf8" />
            <text x="280" y="42" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">pending</text>
            <text x="280" y="58" fill={C.sub} fontSize="10" textAnchor="middle">ожидание</text>
            {/* fulfilled */}
            <rect x="40" y="140" width="180" height="52" rx="8" fill="rgba(200,255,0,0.10)" stroke={C.lime} />
            <text x="130" y="163" fill={C.lime} fontSize="13" fontWeight="700" textAnchor="middle">fulfilled</text>
            <text x="130" y="180" fill={C.sub} fontSize="10" textAnchor="middle">.then(value)</text>
            {/* rejected */}
            <rect x="340" y="140" width="180" height="52" rx="8" fill="rgba(248,113,113,0.10)" stroke="#f87171" />
            <text x="430" y="163" fill="#f87171" fontSize="13" fontWeight="700" textAnchor="middle">rejected</text>
            <text x="430" y="180" fill={C.sub} fontSize="10" textAnchor="middle">.catch(error)</text>
            <line x1="250" y1="66" x2="150" y2="138" stroke={C.lime} strokeWidth="2" markerEnd="url(#jp1)" />
            <text x="165" y="110" fill={C.lime} fontSize="10" textAnchor="middle">resolve()</text>
            <line x1="310" y1="66" x2="410" y2="138" stroke="#f87171" strokeWidth="2" markerEnd="url(#jp2)" />
            <text x="400" y="110" fill="#f87171" fontSize="10" textAnchor="middle">reject()</text>
            <defs>
              <marker id="jp1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker>
              <marker id="jp2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#f87171" /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryCode language="js" code={`// Создание промиса
const promise = new Promise((resolve, reject) => {
  // асинхронная работа...
  const ok = true
  if (ok) {
    resolve('данные получены')   // успех → fulfilled
  } else {
    reject(new Error('что-то пошло не так'))  // ошибка → rejected
  }
})

// Обработка результата
promise
  .then(value => console.log('Успех:', value))   // сработает при resolve
  .catch(error => console.log('Ошибка:', error)) // сработает при reject
  .finally(() => console.log('Готово в любом случае'))`} />
        <p>
          Главное преимущество — промисы можно <strong>соединять в цепочку</strong> (chaining). Каждый{' '}
          <code>.then</code> возвращает новый промис, поэтому «лесенка» коллбэков превращается в плоский,
          читаемый список шагов, а <strong>один</strong> <code>.catch</code> в конце ловит ошибку с любого шага.
        </p>
        <TheoryCode language="js" code={`getUser(1)
  .then(user => getOrders(user.id))
  .then(orders => getDetails(orders[0]))
  .then(details => console.log(details))
  .catch(error => console.log('Ошибка на любом шаге:', error))`} />
      </section>

      {/* Fetch + Promise.all */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. fetch и параллельные промисы</h2>
        <p>
          Самый частый источник промисов на практике — <code>fetch</code>, встроенная функция для сетевых
          запросов. Она возвращает промис с ответом сервера.
        </p>
        <TheoryCode language="js" code={`fetch('https://api.example.com/users/1')
  .then(response => response.json())   // .json() тоже возвращает промис
  .then(user => console.log(user.name))
  .catch(error => console.log('Сеть недоступна:', error))`} />
        <p>Когда нужно запустить несколько запросов <strong>одновременно</strong>, есть комбинаторы:</p>
        <TheoryTable
          headers={['Метод', 'Что делает']}
          rows={[
            ['Promise.all([...])', 'ждёт ВСЕ промисы; падает, если хоть один отклонён'],
            ['Promise.allSettled([...])', 'ждёт все и возвращает результат каждого (успех или ошибку)'],
            ['Promise.race([...])', 'возвращает результат первого завершившегося промиса'],
            ['Promise.any([...])', 'возвращает первый УСПЕШНЫЙ промис'],
          ]}
        />
        <TheoryCode language="js" code={`// Три запроса одновременно вместо последовательного ожидания
Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]).then(([user, posts, comments]) => {
  console.log(user, posts, comments)  // все три готовы
})`} />
      </section>

      {/* async/await */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. async / await — синтаксис поверх промисов</h2>
        <p>
          <strong>async/await</strong> — это «синтаксический сахар»: он работает поверх промисов, но позволяет
          писать асинхронный код так, будто он синхронный — сверху вниз, без цепочек <code>.then</code>. Читается
          гораздо естественнее.
        </p>
        <Term name="async">
          ключевое слово перед функцией. Такая функция <strong>всегда возвращает промис</strong>, даже если внутри
          вернуть обычное значение.
        </Term>
        <Term name="await">
          ставится перед промисом внутри async-функции и «ждёт» его результат — приостанавливает выполнение{' '}
          <strong>только этой функции</strong>, не блокируя основной поток (под капотом это микрозадача).
        </Term>
        <TheoryCode language="js" code={`// То же самое, что цепочка .then из раздела 5, но читается как обычный код
async function loadData() {
  try {
    const user = await getUser(1)
    const orders = await getOrders(user.id)
    const details = await getDetails(orders[0])
    console.log(details)
  } catch (error) {
    console.log('Ошибка:', error)   // ловит ошибку с любого await
  }
}

loadData()`} />
        <TheoryExample title="Ключевая связка">
          Обрабатывать ошибки в async/await принято обычным <code>try / catch</code> — тем же, что и для
          синхронного кода. Отклонённый промис (<code>reject</code>) внутри <code>await</code> «выбрасывает»
          исключение, которое ловит <code>catch</code>. Это и делает async/await таким удобным.
        </TheoryExample>
        <TheoryCode language="js" code={`// Настоящий пример с fetch
async function getUserName(id) {
  const response = await fetch(\`/api/users/\${id}\`)
  if (!response.ok) throw new Error('Пользователь не найден')
  const user = await response.json()
  return user.name
}

// Параллельно и внутри async — комбинируем с Promise.all
async function loadAll() {
  const [user, posts] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
  ])
  return { user, posts }
}`} />
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          JavaScript однопоточный, но не блокируется благодаря <strong>Event Loop</strong>: пока стек пуст, движок
          берёт задачи из очередей, причём микрозадачи (промисы) имеют приоритет над макрозадачами (таймеры).{' '}
          <strong>Promise</strong> — объект результата асинхронной операции с тремя состояниями (pending →
          fulfilled/rejected), который решает проблему «ада коллбэков» через цепочки <code>.then/.catch</code>.{' '}
          <strong>async/await</strong> — удобный синтаксис поверх промисов: пишем асинхронный код линейно, а
          ошибки ловим привычным <code>try/catch</code>. Это фундамент любого современного фронтенда — от запросов
          к API до анимаций и работы с данными.
        </p>
      </section>
    </div>
  )
}
