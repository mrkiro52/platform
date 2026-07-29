import { TheoryTable, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 620, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center' }}>{caption}</figcaption>}
    </figure>
  )
}

export default function July2BackendArchTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Бэкенд-архитектура веб-приложения</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">2 июля 2026</p>
        <p>
          Бэкенд — серверная часть приложения, отвечающая за бизнес-логику, обработку данных, взаимодействие
          с базой данных и предоставление интерфейса для клиентских приложений. Клиент (браузер, мобильное
          приложение) отправляет запрос по сети → сервер обрабатывает его согласно бизнес-логике → сервер
          обращается к хранилищу данных → формирует и возвращает ответ клиенту.
        </p>
        <Fig caption="Модель клиент–сервер: клиент шлёт запрос, сервер обрабатывает его и обращается к базе данных, затем возвращает ответ">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="bk" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={C.lime} />
              </marker>
            </defs>
            {[
              { x: 20,  label: 'Клиент', sub: 'браузер / моб.' },
              { x: 220, label: 'Сервер (бэкенд)', sub: 'бизнес-логика' },
              { x: 430, label: 'База данных', sub: 'хранилище' },
            ].map((b, i) => (
              <g key={i}>
                <rect x={b.x} y="35" width="130" height="56" rx="8" fill="#242b3a" stroke={i===1?C.lime:C.border} />
                <text x={b.x + 65} y="60" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">{b.label}</text>
                <text x={b.x + 65} y="78" fill={C.sub} fontSize="11" textAnchor="middle">{b.sub}</text>
              </g>
            ))}
            <line x1="150" y1="52" x2="220" y2="52" stroke={C.lime} strokeWidth="2" markerEnd="url(#bk)" />
            <text x="185" y="46" fill={C.lime} fontSize="10" textAnchor="middle">запрос</text>
            <line x1="220" y1="74" x2="150" y2="74" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#bk)" />
            <text x="185" y="90" fill={C.sub} fontSize="10" textAnchor="middle">ответ</text>
            <line x1="350" y1="52" x2="430" y2="52" stroke={C.lime} strokeWidth="2" markerEnd="url(#bk)" />
            <text x="390" y="46" fill={C.lime} fontSize="10" textAnchor="middle">запрос</text>
            <line x1="430" y1="74" x2="350" y2="74" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#bk)" />
            <text x="390" y="90" fill={C.sub} fontSize="10" textAnchor="middle">данные</text>
          </svg>
        </Fig>
      </section>

      {/* Слои */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Слои бэкенд-архитектуры</h2>
        <Fig caption="Запрос проходит слои сверху вниз; каждый слой знает только о соседнем нижнем">
          <svg viewBox="0 0 560 220" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[
              { y: 12,  label: 'Слой представления (API)', sub: 'приём запросов, валидация, формирование ответа' },
              { y: 62,  label: 'Слой бизнес-логики (service)', sub: 'правила и сценарии приложения' },
              { y: 112, label: 'Слой доступа к данным (DAL)', sub: 'работа с БД и хранилищами' },
              { y: 162, label: 'Слой инфраструктуры', sub: 'логи, конфигурация, очереди, интеграции' },
            ].map((r, i) => (
              <g key={i}>
                <rect x="40" y={r.y} width="480" height="42" rx="7" fill={i===0?'rgba(96,165,250,0.12)':'#242b3a'} stroke={i===0?'#60a5fa':C.border} />
                <text x="55" y={r.y + 19} fill={C.text} fontSize="13" fontWeight="700">{r.label}</text>
                <text x="55" y={r.y + 35} fill={C.sub} fontSize="11">{r.sub}</text>
                {i < 3 && <text x="280" y={r.y + 52} fill={C.sub} fontSize="14" textAnchor="middle">↓</text>}
              </g>
            ))}
          </svg>
        </Fig>
        <ul className="theory-list">
          <li><strong>Слой представления (API layer)</strong> — принимает запросы от клиентов, валидирует данные, формирует ответы.</li>
          <li><strong>Слой бизнес-логики (service layer)</strong> — реализует основные правила и сценарии работы приложения.</li>
          <li><strong>Слой доступа к данным (data access layer)</strong> — инкапсулирует работу с базой данных и внешними хранилищами.</li>
          <li><strong>Слой инфраструктуры</strong> — логирование, конфигурация, очереди сообщений, интеграции с внешними сервисами.</li>
        </ul>
        <TheoryExample title="Принцип разделения слоёв">
          Каждый слой знает только о соседнем нижележащем слое — это упрощает тестирование и сопровождение.
        </TheoryExample>
      </section>

      {/* Компоненты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Ключевые компоненты серверной части</h2>
        <p><strong>Обработка запросов:</strong></p>
        <ul className="theory-list">
          <li><strong>Веб-сервер</strong> (Nginx, Apache) — приём HTTP-запросов, балансировка, отдача статики.</li>
          <li><strong>Сервер приложений</strong> — исполнение бизнес-логики (Node.js, Django, Spring).</li>
          <li><strong>Маршрутизатор (router)</strong> — сопоставление URL с обработчиками.</li>
          <li><strong>Middleware</strong> — промежуточная обработка: аутентификация, логирование.</li>
        </ul>
        <p><strong>Данные и интеграции:</strong></p>
        <ul className="theory-list">
          <li><strong>База данных</strong> — реляционная (PostgreSQL, MySQL) или нереляционная (MongoDB, Redis).</li>
          <li><strong>Кэш</strong> — временное хранение часто запрашиваемых данных для ускорения ответов.</li>
          <li><strong>Очередь сообщений</strong> — асинхронная обработка задач (RabbitMQ, Kafka).</li>
          <li><strong>Внешние API</strong> — интеграция с платёжными системами, почтовыми сервисами и др.</li>
        </ul>
      </section>

      {/* Жизненный цикл запроса */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Путь запроса от клиента до ответа</h2>
        <ul className="theory-list">
          <li><strong>1. Отправка запроса</strong> — клиент формирует HTTP-запрос (метод, заголовки, тело) и отправляет его на сервер.</li>
          <li><strong>2. Приём и маршрутизация</strong> — веб-сервер принимает запрос, маршрутизатор направляет его нужному обработчику.</li>
          <li><strong>3. Middleware-обработка</strong> — проверка аутентификации, валидация, логирование запроса.</li>
          <li><strong>4. Бизнес-логика</strong> — сервисный слой выполняет операцию, при необходимости обращается к данным.</li>
          <li><strong>5. Работа с данными</strong> — слой доступа к данным читает или записывает информацию в БД/кэш.</li>
          <li><strong>6. Формирование ответа</strong> — сервер собирает результат и возвращает клиенту в согласованном формате (JSON, HTML).</li>
        </ul>
        <Fig caption="Путь запроса: от клиента через веб-сервер, middleware и бизнес-логику к базе данных — и обратно с ответом">
          <svg viewBox="0 0 560 120" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="lc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={C.lime} />
              </marker>
            </defs>
            {['Клиент','Веб-сервер','Middleware','Бизнес-логика','БД'].map((t,i)=>(
              <g key={i}>
                <rect x={8+i*112} y="40" width="96" height="40" rx="7" fill="#242b3a" stroke={C.border} />
                <text x={56+i*112} y="64" fill={C.text} fontSize="11.5" fontWeight="600" textAnchor="middle">{t}</text>
                {i < 4 && <line x1={104+i*112} y1="60" x2={120+i*112} y2="60" stroke={C.lime} strokeWidth="2" markerEnd="url(#lc)" />}
              </g>
            ))}
            <text x="280" y="22" fill={C.sub} fontSize="11" textAnchor="middle">→ запрос идёт вправо, ответ возвращается тем же путём обратно ←</text>
          </svg>
        </Fig>
      </section>

      {/* Монолит vs микросервисы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Монолит и микросервисы</h2>
        <TheoryTable
          headers={['', 'Монолит', 'Микросервисы']}
          rows={[
            ['Структура', 'Единый развёртываемый модуль', 'Независимые сервисы по бизнес-доменам'],
            ['Разработка', 'Проще на старте проекта', 'Каждый сервис разворачивается и масштабируется отдельно'],
            ['Слабые места', 'Единая точка отказа, сложнее масштабировать части', 'Выше сложность эксплуатации: сеть, распределённые транзакции'],
            ['Когда подходит', 'Небольшие и средние проекты', 'Крупные системы с высокой нагрузкой'],
          ]}
        />
      </section>

      {/* API */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Стили взаимодействия API</h2>
        <TheoryTable
          headers={['Стиль', 'Суть']}
          rows={[
            ['REST', 'Взаимодействие через HTTP-методы (GET, POST, PUT, DELETE) и ресурсы, идентифицируемые URL'],
            ['GraphQL', 'Клиент сам описывает, какие данные ему нужны, единая точка входа для запросов'],
            ['gRPC', 'Бинарный протокол на основе HTTP/2, для высокопроизводительного взаимодействия между сервисами'],
            ['WebSocket', 'Двунаправленный канал связи для приложений реального времени (чаты, уведомления)'],
          ]}
        />
      </section>

      {/* Данные и кэш */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Хранение данных и кэширование</h2>
        <ul className="theory-list">
          <li><strong>Реляционные БД</strong> — структурированные данные, строгая схема, поддержка транзакций (ACID).</li>
          <li><strong>Нереляционные БД (NoSQL)</strong> — гибкая схема, горизонтальное масштабирование, подходят для больших объёмов слабоструктурированных данных.</li>
          <li><strong>Кэширование</strong> — хранение результатов частых запросов в памяти (Redis, Memcached) для снижения нагрузки на БД.</li>
          <li><strong>Индексация</strong> — ускорение поиска данных за счёт дополнительных структур в базе данных.</li>
        </ul>
      </section>

      {/* Масштабируемость и безопасность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Требования к промышленному бэкенду</h2>
        <ul className="theory-list">
          <li><strong>Горизонтальное масштабирование</strong> — добавление новых серверов и распределение нагрузки между ними (load balancing).</li>
          <li><strong>Вертикальное масштабирование</strong> — увеличение ресурсов одного сервера (CPU, память).</li>
          <li><strong>Аутентификация и авторизация</strong> — проверка личности пользователя (JWT, OAuth) и его прав доступа к ресурсам.</li>
          <li><strong>Защита данных</strong> — шифрование трафика (TLS), валидация входных данных, защита от SQL-инъекций и XSS.</li>
          <li><strong>Отказоустойчивость</strong> — резервирование компонентов, мониторинг и автоматическое восстановление после сбоев.</li>
        </ul>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Выводы</h2>
        <ul className="theory-list">
          <li>Бэкенд отвечает за бизнес-логику, обработку данных и взаимодействие с клиентом в модели клиент–сервер.</li>
          <li>Классическая архитектура строится по слоям: представление, бизнес-логика, доступ к данным и инфраструктура.</li>
          <li>Ключевые компоненты — веб-сервер, сервер приложений, база данных, кэш и очереди сообщений — вместе формируют полный цикл обработки запроса.</li>
          <li>Выбор между монолитной и микросервисной архитектурой зависит от масштаба системы и требований к независимому развёртыванию.</li>
          <li>Стиль API (REST, GraphQL, gRPC, WebSocket) определяется характером взаимодействия клиента и сервера.</li>
          <li>Промышленный бэкенд должен обеспечивать масштабируемость, отказоустойчивость и защиту данных на всех уровнях архитектуры.</li>
        </ul>
      </section>
    </div>
  )
}
