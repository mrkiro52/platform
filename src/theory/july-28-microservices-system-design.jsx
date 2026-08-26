import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 680, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
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

// Прямоугольный узел схемы
function Box({ x, y, w, h, label, sub, fill = 'rgba(255,214,10,0.1)', stroke = '#FFD60A' }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="5" fill={fill} stroke={stroke} strokeWidth="1.3" />
      <text x={x + w / 2} y={y + h / 2 + (sub ? -4 : 4)} fill="#f5f5fa" fontSize="10.5" textAnchor="middle" fontWeight="600">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 10} fill="#94a3b8" fontSize="8.5" textAnchor="middle">{sub}</text>}
    </g>
  )
}

export default function July28MicroservicesSystemDesignTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Микросервисная архитектура и проектирование систем</h1>
        <p className="theory-subtitle">Треки: Frontend и Backend</p>
        <p className="theory-date">28 июля 2026</p>
        <p>
          Конспект по system design: базы данных, брокеры сообщений, репликация, балансировка нагрузки и API
          Gateway — как это устроено и как эти части работают вместе. Инструменты: Kafka, Redis, PostgreSQL,
          ClickHouse, NoSQL, FastAPI, API Gateway, Load Balancer.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Монолит vs микросервисы</h2>
        <P n={1}>
          Прежде чем разбирать инструменты, нужно понять саму идею: почему большие системы вообще режут на
          отдельные сервисы, а не пишут одним куском.
        </P>
        <Term name="Монолит">
          приложение, где вся логика (пользователи, заказы, платежи, уведомления и т.д.) живёт в одном кодовом
          репозитории, собирается в один процесс и обычно работает с одной общей базой данных. Это самый простой
          способ начать проект.
        </Term>
        <Term name="Микросервисная архитектура">
          система разбита на набор небольших независимых сервисов. Каждый сервис отвечает за свою бизнес-область
          (например: «Пользователи», «Заказы», «Платежи»), имеет свою базу данных и разворачивается отдельно от
          остальных. Сервисы общаются между собой по сети — через HTTP/REST, gRPC или через брокер сообщений вроде
          Kafka.
        </Term>
        <Fig caption="Слева — один процесс и одна база. Справа — независимые сервисы со своими базами, связанные сетью.">
          <svg viewBox="0 0 620 260" width="620" height="260" xmlns="http://www.w3.org/2000/svg">
            <text x="150" y="18" fill="#f5f5fa" fontSize="12" textAnchor="middle" fontWeight="700">Монолит</text>
            <rect x="60" y="30" width="180" height="26" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="150" y="47" fill="#f5f5fa" fontSize="10" textAnchor="middle">Пользователи</text>
            <rect x="60" y="56" width="180" height="26" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="150" y="73" fill="#f5f5fa" fontSize="10" textAnchor="middle">Заказы</text>
            <rect x="60" y="82" width="180" height="26" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="150" y="99" fill="#f5f5fa" fontSize="10" textAnchor="middle">Платежи</text>
            <rect x="60" y="108" width="180" height="26" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="150" y="125" fill="#f5f5fa" fontSize="10" textAnchor="middle">Уведомления</text>
            <rect x="60" y="140" width="180" height="24" fill="rgba(255,214,10,0.15)" stroke="#FFD60A" />
            <text x="150" y="156" fill="#FFD60A" fontSize="10" textAnchor="middle">1 база данных</text>

            <line x1="300" y1="20" x2="300" y2="220" stroke="#2a2a3a" strokeDasharray="4" />

            <text x="470" y="18" fill="#f5f5fa" fontSize="12" textAnchor="middle" fontWeight="700">Микросервисы</text>
            <Box x={370} y={35} w={100} h={34} label="Сервис" sub="Пользователи" />
            <Box x={490} y={35} w={100} h={34} label="Сервис" sub="Заказы" />
            <Box x={370} y={110} w={100} h={34} label="Сервис" sub="Платежи" />
            <Box x={490} y={110} w={100} h={34} label="Сервис" sub="Уведомления" />
            <Box x={370} y={80} w={100} h={20} label="своя БД" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={490} y={80} w={100} h={20} label="своя БД" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={370} y={155} w={100} h={20} label="своя БД" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={490} y={155} w={100} h={20} label="своя БД" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <line x1="420" y1="69" x2="420" y2="80" stroke="#94a3b8" />
            <line x1="540" y1="69" x2="540" y2="80" stroke="#94a3b8" />
            <line x1="420" y1="144" x2="420" y2="155" stroke="#94a3b8" />
            <line x1="540" y1="144" x2="540" y2="155" stroke="#94a3b8" />
          </svg>
        </Fig>
        <TheoryTable
          headers={['Плюсы микросервисов', 'Минусы микросервисов']}
          rows={[
            ['Каждый сервис масштабируется отдельно (нагрузка на «Заказы» не требует масштабировать «Уведомления»)', 'Сложность инфраструктуры: сеть, мониторинг, трассировка запросов'],
            ['Команды работают независимо, разные технологии для разных задач', 'Данные размазаны по разным базам — нужна консистентность между сервисами'],
            ['Падение одного сервиса не обязательно кладёт всю систему', 'Сложнее тестировать систему целиком'],
            ['Быстрее и безопаснее деплоить отдельные части', 'Нужны Service Discovery, API Gateway, брокеры сообщений — то, что раньше не требовалось'],
          ]}
        />
        <TheoryExample title="Итог">
          Микросервисы — это не «всегда лучше». Это осознанный обмен простоты на гибкость и масштабируемость. Все
          инструменты дальше в этом конспекте (Kafka, Redis, балансировщики, реплики БД) существуют именно для
          того, чтобы решить проблемы, которые возникают при переходе к распределённой системе.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Как сервисы общаются друг с другом</h2>
        <P n={2}>
          Есть два принципиально разных способа связи между сервисами. Почти вся архитектура строится вокруг
          выбора между ними для каждой конкретной задачи.
        </P>
        <Term name="Синхронное взаимодействие (REST / gRPC)">
          сервис A напрямую обращается к сервису B по сети (обычно HTTP/REST или gRPC) и ждёт ответа, прежде чем
          продолжить работу. REST — запросы поверх HTTP в формате JSON, самый распространённый способ для внешних
          и внутренних API. gRPC — бинарный протокол поверх HTTP/2, быстрее REST, использует строгую схему
          (Protocol Buffers), обычно для внутренней коммуникации между сервисами.
        </Term>
        <Term name="Асинхронное взаимодействие (очереди сообщений)">
          сервис A не обращается к сервису B напрямую, а кладёт сообщение в брокер (например, Kafka или
          RabbitMQ). Сервис B читает сообщение, когда готов. Сервис A не ждёт ответа и продолжает работу сразу.
        </Term>
        <Fig caption="Синхронно — сервис ждёт ответа сразу. Асинхронно — сервисы не блокируют друг друга, брокер хранит сообщение между ними.">
          <svg viewBox="0 0 620 170" width="620" height="170" xmlns="http://www.w3.org/2000/svg">
            <text x="150" y="16" fill="#f5f5fa" fontSize="11" textAnchor="middle" fontWeight="700">Синхронно (REST/gRPC)</text>
            <Box x={60} y={60} w={100} h={40} label="Сервис A" />
            <Box x={220} y={60} w={100} h={40} label="Сервис B" />
            <line x1="160" y1="72" x2="220" y2="72" stroke="#FFD60A" markerEnd="url(#a1)" />
            <text x="190" y="66" fill="#94a3b8" fontSize="8" textAnchor="middle">запрос</text>
            <line x1="220" y1="88" x2="160" y2="88" stroke="#94a3b8" strokeDasharray="3" markerEnd="url(#a2)" />
            <text x="190" y="100" fill="#94a3b8" fontSize="8" textAnchor="middle">ответ (ждём)</text>

            <text x="470" y="16" fill="#f5f5fa" fontSize="11" textAnchor="middle" fontWeight="700">Асинхронно (брокер сообщений)</text>
            <Box x={380} y={95} w={90} h={34} label="Сервис A" />
            <Box x={550} y={20} w={60} h={30} label="Сервис C" />
            <Box x={470} y={60} w={100} h={40} label="Брокер" sub="(Kafka)" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <line x1="470" y1="112" x2="425" y2="112" stroke="#FFD60A" markerEnd="url(#a3)" />
            <text x="447" y="126" fill="#94a3b8" fontSize="7" textAnchor="middle">публикует</text>
            <line x1="550" y1="45" x2="520" y2="65" stroke="#94a3b8" strokeDasharray="3" markerEnd="url(#a5)" />
            <text x="555" y="55" fill="#94a3b8" fontSize="7">читает, когда готов</text>
            <defs>
              <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#FFD60A" /></marker>
              <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
              <marker id="a3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#FFD60A" /></marker>
              <marker id="a4" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#FFD60A" /></marker>
              <marker id="a5" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['', 'Синхронно (REST/gRPC)', 'Асинхронно (брокер сообщений)']}
          rows={[
            ['Задержка ответа', 'Нужен ответ сразу', 'Ответ не нужен немедленно'],
            ['Связанность', 'Сервисы знают друг о друге напрямую', 'Сервисы не знают друг о друге — только про брокер'],
            ['Отказоустойчивость', 'Если B упал — A получит ошибку', 'Если B упал — сообщение подождёт в очереди'],
            ['Типичный пример', '«Получить профиль пользователя»', '«Заказ оформлен» → уведомления, аналитика, склад'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. API Gateway</h2>
        <P n={3}>
          Когда у вас 20 микросервисов, клиент (браузер, мобильное приложение) не должен знать адреса всех
          двадцати и стучаться в каждый напрямую. Для этого ставится единая «входная дверь».
        </P>
        <Term name="API Gateway">
          сервис-посредник, через который проходят вообще все внешние запросы, прежде чем попасть к внутренним
          микросервисам. Клиент общается только с Gateway, а тот уже решает, какому сервису передать запрос.
        </Term>
        <Fig caption="Клиент видит только Gateway. Внутренние сервисы и их адреса от него скрыты.">
          <svg viewBox="0 0 560 140" width="560" height="140" xmlns="http://www.w3.org/2000/svg">
            <Box x={20} y={50} w={110} h={40} label="Клиент" sub="(веб/моб.)" />
            <Box x={220} y={40} w={130} h={60} label="API Gateway" sub="аутентификация, rate limiting, маршрутизация" fill="rgba(255,214,10,0.15)" />
            <line x1="130" y1="70" x2="220" y2="70" stroke="#FFD60A" markerEnd="url(#g1)" />
            <Box x={430} y={10} w={110} h={30} label="Сервис «Пользователи»" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <Box x={430} y={55} w={110} h={30} label="Сервис «Заказы»" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <Box x={430} y={100} w={110} h={30} label="Сервис «Платежи»" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <line x1="350" y1="55" x2="430" y2="25" stroke="#94a3b8" markerEnd="url(#g1)" />
            <line x1="350" y1="70" x2="430" y2="70" stroke="#94a3b8" markerEnd="url(#g1)" />
            <line x1="350" y1="85" x2="430" y2="115" stroke="#94a3b8" markerEnd="url(#g1)" />
            <defs><marker id="g1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Зачем нужен Gateway', '']}
          rows={[
            ['Единая точка входа', 'клиенту не нужно знать про 20 разных адресов сервисов'],
            ['Аутентификация и авторизация', 'проверка токена в одном месте, а не в каждом сервисе отдельно'],
            ['Rate limiting', 'ограничение числа запросов от одного клиента, защита от перегрузки'],
            ['Маршрутизация (routing)', 'Gateway решает, в какой сервис отправить запрос по URL, заголовку и т.д.'],
            ['Агрегация ответов', 'иногда Gateway сам собирает ответ из нескольких сервисов в один JSON для клиента'],
            ['Логирование и трассировка', 'удобно централизованно писать метрики по всем входящим запросам'],
          ]}
        />
        <TheoryExample title="Примеры инструментов">
          Kong, NGINX (как gateway), Amazon API Gateway, Traefik, Apigee, а также собственные gateway-сервисы,
          написанные, например, на FastAPI.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. FastAPI как инструмент сервиса</h2>
        <P n={4}>
          FastAPI — это не архитектурный элемент вроде Gateway или Kafka, а конкретный фреймворк на Python, на
          котором обычно пишут сами микросервисы (и нередко сам Gateway).
        </P>
        <Term name="FastAPI">
          современный веб-фреймворк для Python, построенный на Starlette (ASGI) и Pydantic. Его выбирают для
          микросервисов по нескольким причинам.
        </Term>
        <TheoryTable
          headers={['Причина', 'Суть']}
          rows={[
            ['Асинхронность из коробки', 'построен на asyncio, поэтому эффективно обрабатывает много одновременных сетевых запросов (I/O-bound нагрузка — как раз то, чем занимается типичный микросервис)'],
            ['Валидация данных через Pydantic', 'входящий JSON автоматически проверяется на соответствие схеме, ошибки валидации возвращаются клиенту сразу'],
            ['Автогенерация документации', 'Swagger UI и ReDoc собираются автоматически из кода, что критично, когда десятки сервисов должны понимать API друг друга'],
            ['Dependency Injection', 'встроенный механизм внедрения зависимостей (подключение к БД, текущий пользователь, проверка токена) через Depends()'],
          ]}
        />
        <TheoryCode language="python" code={`from fastapi import FastAPI, Depends
from pydantic import BaseModel

app = FastAPI()

class OrderIn(BaseModel):
    user_id: int
    amount: float

@app.post("/orders")
async def create_order(order: OrderIn):
    # Pydantic уже проверил, что user_id — int, а amount — float
    return {"status": "created", "order": order}`} />
        <TheoryExample title="Где именно FastAPI встраивается в схему">
          Каждый прямоугольник «Сервис» на диаграммах в этом конспекте — это, как правило, отдельный процесс
          FastAPI (или Django/Flask/Go-сервис), у которого есть свой роутер, своя бизнес-логика и своё
          подключение к базе данных или к Kafka.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Базы данных: SQL vs NoSQL</h2>
        <P n={5}>
          Прежде чем говорить про конкретные БД (PostgreSQL, ClickHouse, Redis и т.д.), нужно понимать общий
          водораздел, по которому все базы делятся на два лагеря.
        </P>
        <TheoryTable
          headers={['SQL (реляционные)', 'NoSQL (нереляционные)']}
          rows={[
            ['Данные хранятся в таблицах со строгой схемой (заранее заданные столбцы и типы)', 'Схема гибкая или вовсе отсутствует'],
            ['Таблицы связаны между собой через внешние ключи (foreign key)', 'Данные хранятся как документы, пары ключ-значение, колонки или графы'],
            ['Поддерживают транзакции ACID', 'Обычно жертвуют строгой консистентностью ради скорости и горизонтального масштабирования'],
            ['Язык запросов — SQL', 'У каждого вида NoSQL — свой язык/API запросов'],
            ['Примеры: PostgreSQL, MySQL, Oracle', 'Примеры: MongoDB, Redis, Cassandra, ClickHouse'],
          ]}
        />
        <Term name="ACID">
          набор гарантий классической реляционной БД для транзакций: Atomicity (транзакция выполняется целиком или
          не выполняется вовсе), Consistency (данные всегда в согласованном состоянии), Isolation (параллельные
          транзакции не мешают друг другу), Durability (после коммита данные не потеряются даже при сбое).
        </Term>
        <Term name="CAP-теорема">
          говорит, что распределённая система не может одновременно на 100% обеспечить все три свойства при
          сетевом сбое: Consistency (все узлы видят одинаковые данные), Availability (система всегда отвечает),
          Partition tolerance (работает при разрыве сети между узлами). На практике Р почти всегда обязателен
          (сеть рвётся), поэтому реальный выбор — между C и A.
        </Term>
        <TheoryTable
          headers={['Критерий', 'SQL', 'NoSQL']}
          rows={[
            ['Схема данных', 'Жёсткая, задана заранее', 'Гибкая или отсутствует'],
            ['Масштабирование', 'Обычно вертикальное (мощнее сервер)', 'Горизонтальное (больше серверов)'],
            ['Согласованность', 'Строгая (ACID)', 'Часто eventual consistency'],
            ['Связи между данными', 'JOIN, внешние ключи', 'Обычно денормализация, без JOIN'],
            ['Когда выбирать', 'Деньги, заказы, всё, где важна точность', 'Логи, кэш, огромный объём слабоструктурированных данных'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. PostgreSQL</h2>
        <P n={6}>
          Основная «рабочая лошадка» для данных, где важна точность: деньги, заказы, пользователи, всё, что
          требует транзакций и связей между сущностями.
        </P>
        <Term name="PostgreSQL">
          реляционная объектно-ориентированная СУБД с открытым исходным кодом. Данные хранятся в таблицах, между
          которыми задаются связи через внешние ключи.
        </Term>
        <TheoryTable
          headers={['Ключевые особенности', '']}
          rows={[
            ['Полная поддержка ACID', 'транзакции надёжны, подходит для денег и критичных бизнес-данных'],
            ['Богатый SQL', 'оконные функции, CTE (WITH), полнотекстовый поиск, JSON/JSONB-поля (гибридный подход: реляционная таблица + гибкое JSON-поле внутри неё)'],
            ['Индексы', 'B-tree (по умолчанию), GIN/GiST (для JSON, полнотекстового поиска, геоданных)'],
            ['MVCC', 'Multi-Version Concurrency Control — параллельные транзакции не блокируют друг друга на чтении, каждая видит свою версию данных'],
            ['Расширяемость', 'расширения вроде PostGIS (геоданные), pgvector (векторный поиск для ML/RAG-систем)'],
          ]}
        />
        <TheoryExample title="Когда использовать">
          Пользователи, заказы, платежи, любые данные со строгими связями и требованием «ничего не потерять и не
          посчитать дважды». Это база данных по умолчанию, если нет специальной причины взять что-то другое.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. NoSQL базы данных</h2>
        <P n={7}>
          NoSQL — это не один инструмент, а зонтичный термин для четырёх разных подходов к хранению данных. Важно
          знать не «NoSQL вообще», а какой именно вид NoSQL для какой задачи.
        </P>
        <TheoryTable
          headers={['Вид', 'Как хранятся данные', 'Примеры', 'Для чего']}
          rows={[
            ['Документная', 'JSON/BSON-документы, гибкая схема', 'MongoDB, CouchDB', 'Каталоги товаров, контент с изменяющейся структурой'],
            ['Key-Value', 'Пара «ключ → значение», максимально просто и быстро', 'Redis, DynamoDB', 'Кэш, сессии, счётчики'],
            ['Колоночная', 'Данные хранятся по столбцам, а не по строкам', 'Cassandra, ClickHouse, HBase', 'Аналитика, огромные объёмы, агрегации по колонкам'],
            ['Графовая', 'Узлы и связи между ними (граф)', 'Neo4j', 'Соцсети, рекомендации, связи «кто с кем связан»'],
          ]}
        />
        <Fig caption="Четыре разных модели данных — под четыре разных класса задач.">
          <svg viewBox="0 0 560 130" width="560" height="130" xmlns="http://www.w3.org/2000/svg">
            <text x="60" y="14" fill="#f5f5fa" fontSize="10" textAnchor="middle" fontWeight="700">Документная</text>
            <rect x="15" y="24" width="90" height="70" fill="rgba(255,214,10,0.08)" stroke="#FFD60A" />
            <text x="60" y="42" fill="#94a3b8" fontSize="7" textAnchor="middle">{'{ "id": 1,'}</text>
            <text x="60" y="52" fill="#94a3b8" fontSize="7" textAnchor="middle">{'"name": "A" }'}</text>
            <line x1="20" y1="60" x2="100" y2="60" stroke="#2a2a3a" />
            <text x="60" y="76" fill="#94a3b8" fontSize="7" textAnchor="middle">{'{ "id": 2,'}</text>
            <text x="60" y="86" fill="#94a3b8" fontSize="7" textAnchor="middle">{'"extra": true }'}</text>

            <text x="190" y="14" fill="#f5f5fa" fontSize="10" textAnchor="middle" fontWeight="700">Key-Value</text>
            <rect x="145" y="24" width="90" height="70" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" />
            <text x="190" y="45" fill="#94a3b8" fontSize="7" textAnchor="middle">user:42 → {'{...}'}</text>
            <text x="190" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">session:xyz → ...</text>

            <text x="320" y="14" fill="#f5f5fa" fontSize="10" textAnchor="middle" fontWeight="700">Колоночная</text>
            <rect x="280" y="24" width="90" height="70" fill="none" stroke="#4ade80" />
            <rect x="285" y="28" width="24" height="62" fill="rgba(74,222,128,0.15)" stroke="#4ade80" />
            <rect x="312" y="28" width="24" height="62" fill="rgba(74,222,128,0.3)" stroke="#4ade80" />
            <rect x="339" y="28" width="24" height="62" fill="rgba(74,222,128,0.15)" stroke="#4ade80" />

            <text x="460" y="14" fill="#f5f5fa" fontSize="10" textAnchor="middle" fontWeight="700">Графовая</text>
            <circle cx="450" cy="45" r="12" fill="rgba(248,113,113,0.15)" stroke="#f87171" />
            <text x="450" y="49" fill="#f5f5fa" fontSize="9" textAnchor="middle">A</text>
            <circle cx="500" cy="45" r="12" fill="rgba(248,113,113,0.15)" stroke="#f87171" />
            <text x="500" y="49" fill="#f5f5fa" fontSize="9" textAnchor="middle">B</text>
            <circle cx="475" cy="85" r="12" fill="rgba(248,113,113,0.15)" stroke="#f87171" />
            <text x="475" y="89" fill="#f5f5fa" fontSize="9" textAnchor="middle">C</text>
            <line x1="462" y1="45" x2="488" y2="45" stroke="#f87171" />
            <line x1="450" y1="57" x2="475" y2="73" stroke="#f87171" />
            <line x1="500" y1="57" x2="475" y2="73" stroke="#f87171" />
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. ClickHouse</h2>
        <P n={8}>
          ClickHouse — частный случай колоночной базы, заточенный конкретно под аналитику (OLAP), а не под
          операционную работу (OLTP). Разработана в Яндексе для быстрой аналитики на огромных объёмах данных:
          миллиарды строк, агрегации, отчёты в реальном времени.
        </P>
        <TheoryTable
          headers={['', 'OLTP (PostgreSQL)', 'OLAP (ClickHouse)']}
          rows={[
            ['Тип операций', 'Много мелких транзакций: вставить заказ, обновить статус', 'Редкие вставки большими пачками, тяжёлые запросы на чтение'],
            ['Хранение', 'По строкам (row-oriented)', 'По колонкам (column-oriented)'],
            ['Типичный запрос', '«Найти заказ №4521»', '«Средний чек по регионам за последний год»'],
            ['Обновление отдельной строки', 'Быстро и естественно', 'Медленно, не для этого создано'],
          ]}
        />
        <P n={9}>
          Почему колоночное хранение быстрее для аналитики: если запрос читает всего 2 столбца из таблицы с 50
          столбцами, колоночная БД читает с диска только эти 2 столбца, а не всю строку целиком, как это делает
          строковая БД. На агрегациях (SUM, AVG, COUNT) по миллиардам строк разница — в десятки раз.
        </P>
        <TheoryExample title="Типичное место ClickHouse в системе">
          События из Kafka (клики, действия пользователей, логи) стримятся в ClickHouse, где строятся дашборды и
          отчёты — без нагрузки на «боевую» PostgreSQL, которая обслуживает реальных пользователей.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Redis</h2>
        <P n={10}>
          Redis хранит данные в оперативной памяти (RAM), а не на диске — отсюда его главное свойство: очень
          высокая скорость чтения и записи (обычно доли миллисекунды).
        </P>
        <Term name="Redis">
          (Remote Dictionary Server) — key-value база данных in-memory. Умеет опционально сохранять снапшоты на
          диск, но основная работа идёт в памяти.
        </Term>
        <TheoryTable
          headers={['Сценарий', 'Суть']}
          rows={[
            ['Кэш', 'результат тяжёлого запроса к PostgreSQL кладётся в Redis на N минут — следующие запросы читаются из памяти, а не пересчитываются заново'],
            ['Сессии', 'данные сессии пользователя хранятся в Redis, а не в памяти конкретного сервера приложения — так любой инстанс сервиса может обслужить любого пользователя'],
            ['Rate limiting', 'счётчик запросов от пользователя за окно времени (через INCR + EXPIRE) — основа для ограничения частоты запросов на Gateway'],
            ['Очереди и pub/sub', 'простые очереди задач (списки) и механизм publish/subscribe для лёгких уведомлений между сервисами — более простая альтернатива Kafka для несложных сценариев'],
          ]}
        />
        <P n={11}>
          В отличие от простого key-value, Redis поддерживает разные типы значений: строки, списки (List),
          множества (Set), отсортированные множества (Sorted Set — удобно для лидербордов и рейтингов), хеши
          (Hash — как мини-объект внутри ключа).
        </P>
        <TheoryExample title="Важно понимать">
          Redis — это не замена основной базе данных. Это ускоряющий слой поверх неё. Если Redis упадёт или
          перезапустится без сохранения на диск — данные в памяти теряются, поэтому «долгие» данные (заказы,
          деньги) в нём не хранят.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Kafka</h2>
        <P n={12}>
          Kafka — это не «база данных» и не «очередь сообщений» в узком смысле, а распределённый лог событий. Это
          ключевой инструмент для асинхронной связи между микросервисами, который мы упоминали в разделе 2.
        </P>
        <Term name="Apache Kafka">
          платформа для потоковой передачи событий (event streaming). Producer-сервисы пишут события,
          Consumer-сервисы их читают — независимо друг от друга и в своём темпе.
        </Term>
        <TheoryTable
          headers={['Понятие', 'Что это']}
          rows={[
            ['Producer', 'сервис, который публикует (пишет) сообщения в Kafka'],
            ['Consumer', 'сервис, который читает сообщения из Kafka'],
            ['Topic (топик)', 'именованный поток событий, например order.created. Аналог «таблицы» или «канала»'],
            ['Partition (партиция)', 'топик физически разбит на несколько партиций для параллельной записи и чтения. Порядок сообщений гарантирован только внутри одной партиции'],
            ['Broker', 'один сервер Kafka; кластер обычно состоит из нескольких брокеров'],
            ['Consumer Group', 'группа consumer\'ов, которые вместе читают топик; каждая партиция обрабатывается только одним consumer\'ом внутри группы одновременно — так достигается параллелизм без дублирования'],
            ['Offset', 'порядковый номер сообщения внутри партиции; consumer запоминает, до какого offset он дочитал'],
          ]}
        />
        <Fig caption="Producer'ы пишут в топик, разбитый на партиции. Разные consumer group читают топик независимо друг от друга.">
          <svg viewBox="0 0 620 210" width="620" height="210" xmlns="http://www.w3.org/2000/svg">
            <Box x={20} y={30} w={80} h={26} label="Producer A" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={20} y={65} w={80} h={26} label="Producer B" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={20} y={100} w={80} h={26} label="Producer C" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />

            <rect x={150} y={20} width={220} height={130} fill="rgba(255,214,10,0.05)" stroke="#FFD60A" strokeDasharray="3" />
            <text x={260} y={16} fill="#FFD60A" fontSize="9" textAnchor="middle">Topic: order.created</text>
            <rect x={160} y={35} width={200} height={26} fill="rgba(255,214,10,0.1)" stroke="#FFD60A" />
            <text x={260} y={52} fill="#f5f5fa" fontSize="8" textAnchor="middle">Partition 0</text>
            <rect x={160} y={72} width={200} height={26} fill="rgba(255,214,10,0.1)" stroke="#FFD60A" />
            <text x={260} y={89} fill="#f5f5fa" fontSize="8" textAnchor="middle">Partition 1</text>
            <rect x={160} y={109} width={200} height={26} fill="rgba(255,214,10,0.1)" stroke="#FFD60A" />
            <text x={260} y={126} fill="#f5f5fa" fontSize="8" textAnchor="middle">Partition 2</text>

            <line x1="100" y1="43" x2="150" y2="48" stroke="#94a3b8" markerEnd="url(#k1)" />
            <line x1="100" y1="78" x2="150" y2="85" stroke="#94a3b8" markerEnd="url(#k1)" />
            <line x1="100" y1="113" x2="150" y2="122" stroke="#94a3b8" markerEnd="url(#k1)" />

            <rect x={420} y={10} width={180} height={90} fill="none" stroke="#4ade80" strokeDasharray="3" />
            <text x={510} y="6" fill="#4ade80" fontSize="8" textAnchor="middle">Consumer Group «analytics»</text>
            <Box x={440} y={22} w={140} h={20} label="Consumer 1" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={440} y={46} w={140} h={20} label="Consumer 2" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={440} y={70} w={140} h={20} label="Consumer 3" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />

            <rect x={420} y={115} width={180} height={40} fill="none" stroke="#f87171" strokeDasharray="3" />
            <text x={510} y="112" fill="#f87171" fontSize="8" textAnchor="middle">Consumer Group «notify»</text>
            <Box x={440} y={127} w={140} h={20} label="Consumer 1 (читает все партиции)" fill="rgba(248,113,113,0.1)" stroke="#f87171" />

            <line x1="370" y1="60" x2="420" y2="55" stroke="#94a3b8" markerEnd="url(#k1)" />
            <line x1="370" y1="90" x2="420" y2="135" stroke="#94a3b8" markerEnd="url(#k1)" />
            <defs><marker id="k1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Почему Kafka, а не просто HTTP-вызов', '']}
          rows={[
            ['Слабая связанность', 'сервис-производитель события не знает и не должен знать, кто и сколько подписчиков читает его событие'],
            ['Устойчивость к сбоям', 'если consumer временно упал, сообщения не теряются, он дочитает их после перезапуска с того же offset'],
            ['Один раз произошло — много кто узнал', 'событие «заказ создан» может одновременно обрабатывать сервис уведомлений, аналитика и склад, без дублирования кода на стороне producer\'a'],
            ['Высокая пропускная способность', 'Kafka спроектирована под миллионы сообщений в секунду за счёт последовательной записи на диск и партиционирования'],
          ]}
        />
        <TheoryExample title="Частый паттерн: Kafka + ClickHouse">
          Сервис публикует событие в Kafka → отдельный consumer читает поток и пишет данные в ClickHouse → на этих
          данных строятся аналитические дашборды в реальном времени, не трогая «боевую» PostgreSQL.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. Репликация: Master-Slave и Master-Master</h2>
        <P n={13}>
          Одна база данных на одном сервере — это единая точка отказа (single point of failure) и предел по
          нагрузке на чтение. Репликация — способ иметь несколько копий данных на разных серверах.
        </P>
        <Term name="Репликация">
          процесс копирования данных с одного сервера базы данных (master) на один или несколько других
          (slave/replica), чтобы данные оставались синхронизированными.
        </Term>

        <h3 style={{ color: 'var(--accent-lime)', fontSize: 15, margin: '18px 0 6px' }}>Master-Slave (Master-Replica)</h3>
        <P n={14}>
          Один сервер — master — принимает все записи (INSERT/UPDATE/DELETE). Изменения асинхронно или синхронно
          передаются на один или несколько серверов-slave, которые обычно доступны только на чтение (SELECT).
        </P>
        <Fig caption="Один источник истины (master) для записи, несколько реплик для распределения нагрузки на чтение.">
          <svg viewBox="0 0 460 140" width="460" height="140" xmlns="http://www.w3.org/2000/svg">
            <Box x={180} y={15} w={100} h={36} label="MASTER" sub="запись и чтение" fill="rgba(248,113,113,0.12)" stroke="#f87171" />
            <Box x={40} y={95} w={100} h={34} label="SLAVE 1" sub="только чтение" />
            <Box x={180} y={95} w={100} h={34} label="SLAVE 2" sub="только чтение" />
            <Box x={320} y={95} w={100} h={34} label="SLAVE 3" sub="только чтение" />
            <line x1="220" y1="51" x2="90" y2="95" stroke="#94a3b8" markerEnd="url(#m1)" />
            <line x1="230" y1="51" x2="230" y2="95" stroke="#94a3b8" markerEnd="url(#m1)" />
            <line x1="250" y1="51" x2="370" y2="95" stroke="#94a3b8" markerEnd="url(#m1)" />
            <text x="230" y="75" fill="#94a3b8" fontSize="7" textAnchor="middle">репликация изменений</text>
            <defs><marker id="m1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Зачем нужно', 'Ограничения']}
          rows={[
            ['Масштабирование чтения — SELECT-запросы распределяются по нескольким репликам', 'Все записи всё равно идут через один master — это узкое место (bottleneck) на запись'],
            ['Отказоустойчивость — если master упал, одна из реплик может быть повышена (promote) до нового master', 'Реплика может немного отставать (replication lag) — это asynchronous replication, чтение может вернуть слегка устаревшие данные'],
            ['Бэкапы и аналитика — тяжёлые отчёты можно гонять на реплике, не нагружая боевой master', 'Failover (переключение на новую master) обычно не мгновенный и требует настройки'],
          ]}
        />

        <h3 style={{ color: 'var(--accent-lime)', fontSize: 15, margin: '18px 0 6px' }}>Master-Master (Multi-Master)</h3>
        <P n={15}>
          В этой схеме несколько серверов одновременно являются master — каждый может принимать запись, и
          изменения реплицируются между всеми узлами в обе стороны.
        </P>
        <Fig caption="Оба узла принимают запись и реплицируют изменения друг другу двусторонне.">
          <svg viewBox="0 0 340 90" width="340" height="90" xmlns="http://www.w3.org/2000/svg">
            <Box x={20} y={25} w={110} h={40} label="MASTER A" sub="запись и чтение" fill="rgba(248,113,113,0.12)" stroke="#f87171" />
            <Box x={210} y={25} w={110} h={40} label="MASTER B" sub="запись и чтение" fill="rgba(248,113,113,0.12)" stroke="#f87171" />
            <line x1="130" y1="38" x2="210" y2="38" stroke="#FFD60A" markerEnd="url(#mm1)" />
            <line x1="210" y1="52" x2="130" y2="52" stroke="#FFD60A" markerEnd="url(#mm1)" />
            <text x="170" y="20" fill="#94a3b8" fontSize="7" textAnchor="middle">реплицирует изменения →</text>
            <defs><marker id="mm1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#FFD60A" /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Зачем нужно', 'Главная проблема — конфликты']}
          rows={[
            ['Масштабирование записи — запись можно направлять на ближайший/наименее загруженный узел', 'Если одну и ту же строку одновременно изменили на A и на B — возникает конфликт, который нужно как-то разрешать (last-write-wins, векторные часы, ручная логика)'],
            ['Георасределённость — например, один master в Европе, другой в Азии, для низкой задержки локальных пользователей', 'Сложнее в эксплуатации, чем master-slave'],
            ['Нет единой точки отказа на запись', 'На практике используется реже, чаще выбирают master-slave + шардирование'],
          ]}
        />
        <TheoryExample title="Как выбрать">
          Master-Slave — стандартный выбор по умолчанию, когда нагрузка в основном на чтение (типичный
          веб-сервис). Master-Master — когда нужна запись одновременно из нескольких регионов и вы готовы
          разбираться с конфликтами.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">12. Load Balancer и алгоритмы балансировки</h2>
        <P n={16}>
          Когда один сервис запущен в нескольких экземплярах (инстансах) для отказоустойчивости и масштабирования,
          нужен механизм, который решает, какому именно инстансу отдать очередной запрос.
        </P>
        <Term name="Load Balancer (балансировщик нагрузки)">
          компонент, который принимает входящий трафик и распределяет его между несколькими одинаковыми серверами
          (инстансами сервиса).
        </Term>
        <Fig caption="Один вход, распределение по нескольким одинаковым инстансам сервиса.">
          <svg viewBox="0 0 400 110" width="400" height="110" xmlns="http://www.w3.org/2000/svg">
            <Box x={10} y={40} w={80} h={30} label="Клиенты" />
            <Box x={150} y={35} w={100} h={40} label="Load Balancer" fill="rgba(255,214,10,0.15)" />
            <Box x={310} y={5} w={80} h={26} label="Инстанс 1" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={310} y={42} w={80} h={26} label="Инстанс 2" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={310} y={79} w={80} h={26} label="Инстанс 3" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <line x1="90" y1="55" x2="150" y2="55" stroke="#94a3b8" markerEnd="url(#lb1)" />
            <line x1="250" y1="48" x2="310" y2="18" stroke="#94a3b8" markerEnd="url(#lb1)" />
            <line x1="250" y1="55" x2="310" y2="55" stroke="#94a3b8" markerEnd="url(#lb1)" />
            <line x1="250" y1="62" x2="310" y2="92" stroke="#94a3b8" markerEnd="url(#lb1)" />
            <defs><marker id="lb1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Зачем нужен', '']}
          rows={[
            ['Масштабирование', 'нагрузка делится между несколькими серверами вместо одного'],
            ['Отказоустойчивость', 'если один инстанс упал, балансировщик перестаёт отправлять на него трафик (health check) и направляет запросы на оставшиеся живые'],
            ['Zero-downtime деплой', 'можно обновлять инстансы по одному, не прерывая обслуживание'],
          ]}
        />
        <TheoryTable
          headers={['', 'L4 (транспортный уровень)', 'L7 (уровень приложения)']}
          rows={[
            ['Что видит', 'IP-адрес и порт, TCP/UDP-пакеты', 'Содержимое HTTP-запроса: URL, заголовки, cookies'],
            ['Скорость', 'Быстрее, меньше накладных расходов', 'Чуть медленнее из-за разбора содержимого'],
            ['Возможности', 'Простое распределение соединений', 'Маршрутизация по пути URL, A/B-тесты, sticky sessions по cookie'],
            ['Примеры', 'AWS NLB, LVS', 'NGINX, HAProxy (L7-режим), AWS ALB'],
          ]}
        />
        <h3 style={{ color: 'var(--accent-lime)', fontSize: 15, margin: '18px 0 6px' }}>Алгоритмы балансировки</h3>
        <P n={17}>
          <strong>1. Round Robin</strong> — запросы раздаются серверам по очереди, циклически: 1 → 2 → 3 → 1 → 2 →
          3… Weighted Round Robin — та же идея, но сервера с большей мощностью получают пропорционально больше
          запросов (например, сервер с весом 3 получает в 3 раза больше запросов, чем сервер с весом 1).
        </P>
        <Fig caption="Round Robin: запросы 1, 2, 3 раздаются серверам по кругу.">
          <svg viewBox="0 0 300 100" width="300" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="50" r="20" fill="rgba(255,214,10,0.15)" stroke="#FFD60A" />
            <text x="30" y="54" fill="#FFD60A" fontSize="10" textAnchor="middle" fontWeight="700">LB</text>
            <Box x={110} y={15} w={80} h={26} label="Server 1" />
            <Box x={110} y={60} w={80} h={26} label="Server 2" />
            <Box x={230} y={38} w={60} h={26} label="Server 3" />
            <line x1="48" y1="42" x2="110" y2="28" stroke="#94a3b8" markerEnd="url(#rr1)" />
            <text x="70" y="30" fill="#94a3b8" fontSize="8">1</text>
            <line x1="48" y1="55" x2="110" y2="70" stroke="#94a3b8" markerEnd="url(#rr1)" />
            <text x="70" y="68" fill="#94a3b8" fontSize="8">2</text>
            <line x1="190" y1="24" x2="230" y2="45" stroke="#94a3b8" markerEnd="url(#rr1)" />
            <text x="205" y="30" fill="#94a3b8" fontSize="8">3</text>
            <defs><marker id="rr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <P n={18}>
          <strong>2. Least Connections</strong> — запрос отправляется на сервер с наименьшим числом активных
          соединений прямо сейчас. Полезно, когда запросы сильно различаются по времени обработки — round robin в
          этом случае может перегрузить сервер, который ещё не освободился от предыдущих долгих запросов.
        </P>
        <P n={19}>
          <strong>3. IP Hash (Hash-based)</strong> — балансировщик вычисляет хеш от IP-адреса клиента (или другого
          ключа — например, ID пользователя) и по этому хешу всегда направляет клиента на один и тот же сервер.
          Это даёт sticky sessions — полезно, если сервер хранит какое-то состояние в памяти между запросами
          одного пользователя.
        </P>
        <Fig caption="IP Hash: один и тот же IP всегда попадает на один и тот же сервер.">
          <svg viewBox="0 0 320 100" width="320" height="100" xmlns="http://www.w3.org/2000/svg">
            <text x="30" y="20" fill="#94a3b8" fontSize="9">Клиент 10.0.0.5</text>
            <text x="30" y="80" fill="#94a3b8" fontSize="9">Клиент 10.0.0.9</text>
            <circle cx="150" cy="50" r="20" fill="rgba(255,214,10,0.15)" stroke="#FFD60A" />
            <text x="150" y="54" fill="#FFD60A" fontSize="9" textAnchor="middle" fontWeight="700">Hash</text>
            <Box x={230} y={15} w={80} h={26} label="Server 1" />
            <Box x={230} y={60} w={80} h={26} label="Server 2" />
            <line x1="60" y1="18" x2="130" y2="45" stroke="#94a3b8" markerEnd="url(#ih1)" />
            <line x1="60" y1="78" x2="130" y2="55" stroke="#94a3b8" markerEnd="url(#ih1)" />
            <line x1="170" y1="45" x2="230" y2="28" stroke="#94a3b8" markerEnd="url(#ih1)" />
            <line x1="170" y1="55" x2="230" y2="73" stroke="#94a3b8" markerEnd="url(#ih1)" />
            <text x="150" y="94" fill="#94a3b8" fontSize="7" textAnchor="middle">один и тот же IP всегда попадает на один и тот же сервер</text>
            <defs><marker id="ih1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <P n={20}>
          <strong>4. Другие алгоритмы:</strong> Random — сервер выбирается случайно; при большом числе запросов
          статистически близко к равномерному распределению, как у round robin, но проще в реализации. Least
          Response Time — учитывает не только число соединений, но и то, как быстро сервер отвечал на последние
          запросы; выбирается самый «быстрый» сейчас сервер. Consistent Hashing — продвинутая версия IP hash: при
          добавлении/удалении сервера перераспределяется лишь малая часть ключей, а не все сразу (используется,
          например, в шардировании кэшей и в Kafka-подобных системах).
        </P>
        <TheoryTable
          headers={['Алгоритм', 'Учитывает', 'Когда использовать']}
          rows={[
            ['Round Robin', 'Ничего, просто очередь', 'Однородные серверы, похожие по времени запроса'],
            ['Weighted Round Robin', 'Заданный вес сервера', 'Серверы разной мощности'],
            ['Least Connections', 'Текущую нагрузку сервера', 'Запросы разной длительности'],
            ['IP Hash / Consistent Hashing', 'Ключ клиента (IP, ID)', 'Нужна sticky-сессия или локальный кэш на сервере'],
            ['Least Response Time', 'Скорость ответа сервера', 'Серверы с непредсказуемой производительностью'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">13. Итоговая схема: собираем систему целиком</h2>
        <P n={21}>
          Ниже — как все инструменты из этого конспекта обычно соединяются в одну работающую систему. Читайте
          схему слева направо: путь запроса от клиента до данных и обратно.
        </P>
        <Fig caption="Клиент → Load Balancer → API Gateway → микросервисы (FastAPI) со своими базами PostgreSQL (master + replica) и общим Redis-кэшем. Асинхронные события летят через Kafka в сервис уведомлений и в ClickHouse для аналитики.">
          <svg viewBox="0 0 760 340" width="760" height="340" xmlns="http://www.w3.org/2000/svg">
            <Box x={10} y={150} w={80} h={36} label="Клиент" />
            <Box x={120} y={150} w={90} h={36} label="Load Balancer" fill="rgba(255,214,10,0.12)" />
            <Box x={240} y={140} w={90} h={56} label="API Gateway" sub="auth · rate limit" fill="rgba(255,214,10,0.12)" />

            <Box x={370} y={40} w={110} h={40} label="Сервис «Users»" sub="FastAPI" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={370} y={160} w={110} h={40} label="Сервис «Orders»" sub="FastAPI" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <Box x={370} y={260} w={110} h={40} label="Сервис «Payments»" sub="FastAPI" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />

            <Box x={370} y={110} w={110} h={30} label="Redis" sub="кэш / сессии" fill="rgba(248,113,113,0.1)" stroke="#f87171" />

            <Box x={540} y={30} w={100} h={26} label="PostgreSQL master" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={540} y={60} w={100} h={26} label="replica (чтение)" fill="rgba(74,222,128,0.06)" stroke="#4ade80" />
            <Box x={540} y={150} w={100} h={26} label="PostgreSQL master" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={540} y={180} w={100} h={26} label="replica (чтение)" fill="rgba(74,222,128,0.06)" stroke="#4ade80" />
            <Box x={540} y={260} w={100} h={26} label="PostgreSQL master" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <Box x={540} y={290} w={100} h={26} label="replica (чтение)" fill="rgba(74,222,128,0.06)" stroke="#4ade80" />

            <Box x={330} y={210} w={200} h={26} label="Kafka: topic order.created" sub="партиции распределены по брокерам" fill="rgba(255,214,10,0.08)" />
            <Box x={220} y={205} w={80} h={30} label="Consumer:" sub="уведомления" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" />
            <Box x={620} y={205} w={90} h={30} label="Consumer →" sub="ClickHouse" fill="rgba(167,139,250,0.1)" stroke="#a78bfa" />
            <Box x={630} y={245} w={100} h={26} label="Дашборды / отчёты" fill="rgba(96,165,250,0.08)" stroke="#60a5fa" />

            <line x1="90" y1="168" x2="120" y2="168" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="210" y1="168" x2="240" y2="168" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="330" y1="155" x2="370" y2="70" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="330" y1="168" x2="370" y2="178" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="330" y1="180" x2="370" y2="275" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="480" y1="60" x2="540" y2="45" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="480" y1="180" x2="540" y2="165" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="480" y1="280" x2="540" y2="275" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="425" y1="200" x2="425" y2="210" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="330" y1="220" x2="300" y2="220" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="530" y1="220" x2="620" y2="220" stroke="#94a3b8" markerEnd="url(#f1)" />
            <line x1="665" y1="235" x2="670" y2="245" stroke="#94a3b8" markerEnd="url(#f1)" />
            <defs><marker id="f1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
        <h3 style={{ color: 'var(--accent-lime)', fontSize: 15, margin: '18px 0 8px' }}>Как читать эту схему по шагам</h3>
        <TheoryTable
          headers={['Шаг', 'Что происходит']}
          rows={[
            ['1', 'Клиент отправляет HTTP-запрос — он попадает на Load Balancer, который выбирает один из инстансов API Gateway (по одному из алгоритмов из раздела 12)'],
            ['2', 'API Gateway проверяет токен, применяет rate limiting и маршрутизирует запрос в нужный микросервис по URL'],
            ['3', 'Микросервис (например, «Orders») сначала пробует достать данные из Redis — если есть кэш, база данных не трогается'],
            ['4', 'Если кэша нет — идёт запрос к PostgreSQL: запись всегда в master, чтение можно распределить на replica'],
            ['5', 'После успешной операции сервис публикует событие в Kafka — например, «заказ создан»'],
            ['6', 'Независимо друг от друга это событие читают: сервис уведомлений (отправить email/push) и consumer, который льёт данные в ClickHouse для аналитики'],
            ['7', 'Ни один из этих шагов не блокирует остальные — в этом весь смысл асинхронной части архитектуры'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">14. Шпаргалка: что выбрать</h2>
        <TheoryTable
          headers={['Инструмент', 'Категория', 'Главная задача']}
          rows={[
            ['FastAPI', 'Web-фреймворк', 'Писать сам микросервис: асинхронный API, валидация через Pydantic'],
            ['API Gateway', 'Точка входа', 'Единый вход, аутентификация, rate limiting, маршрутизация'],
            ['Load Balancer', 'Распределение трафика', 'Раскидать запросы между инстансами одного сервиса'],
            ['PostgreSQL', 'SQL / реляционная БД', 'Точные данные с транзакциями: деньги, заказы, пользователи'],
            ['NoSQL (MongoDB)', 'Документная БД', 'Гибкая схема, быстро меняющаяся структура данных'],
            ['Redis', 'Key-Value / in-memory', 'Кэш, сессии, rate limiting, лёгкие очереди'],
            ['ClickHouse', 'Колоночная OLAP БД', 'Аналитика и агрегации на огромных объёмах данных'],
            ['Kafka', 'Event streaming', 'Асинхронная связь между сервисами через события'],
            ['Master-Slave', 'Репликация БД', 'Масштабирование чтения, отказоустойчивость'],
            ['Master-Master', 'Репликация БД', 'Запись из нескольких регионов одновременно'],
            ['Round Robin', 'Алгоритм LB', 'Равномерно раскидать запросы по очереди'],
            ['Least Connections', 'Алгоритм LB', 'Учесть текущую нагрузку сервера'],
            ['IP Hash', 'Алгоритм LB', 'Один клиент — всегда один и тот же сервер (sticky session)'],
          ]}
        />
        <TheoryExample title="Проверь себя">
          Сможете ли вы за 30 секунд объяснить: (1) чем master-slave отличается от master-master; (2) почему
          ClickHouse быстрее для аналитики, чем PostgreSQL; (3) когда выбрать IP hash, а не round robin; (4) зачем
          нужен API Gateway, если сервисы и так умеют принимать HTTP-запросы напрямую. Если на все четыре вопроса
          есть чёткий ответ своими словами — теория усвоена.
        </TheoryExample>
        <P n={22}>
          Конспект подготовлен как база для подготовки к техническому собеседованию по backend/system design. Для
          более глубокой практики рекомендуется дополнительно порешать задачи на проектирование конкретных систем
          (например, «спроектируйте Instagram» или «спроектируйте систему бронирования»), используя эти
          инструменты как строительные блоки.
        </P>
      </section>
    </div>
  )
}
