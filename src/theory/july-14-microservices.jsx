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

export default function July14MicroservicesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Микросервисы: основы</h1>
        <p className="theory-subtitle">Трек: Backend</p>
        <p className="theory-date">14 июля 2026</p>
        <p>
          Когда приложение растёт, единый большой сервер становится трудно развивать: любая правка требует
          пересборки всего, команды мешают друг другу, а под нагрузкой приходится масштабировать всё целиком.
          Микросервисная архитектура предлагает разбить систему на много маленьких независимых сервисов. Разберём,
          зачем это нужно, как их строить, как они общаются и какими инструментами и языками пользуются.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Монолит и его пределы</h2>
        <Term name="Монолит (monolith)">
          архитектура, где всё приложение — единая программа с общей кодовой базой и одной базой данных:
          пользователи, заказы, оплата, уведомления живут в одном процессе и деплоятся вместе.
        </Term>
        <P n={1}>
          Монолит отлично подходит для старта: проще писать, запускать и отлаживать. Но с ростом проекта появляются
          проблемы: код становится огромным и связанным, релиз всего приложения нужен даже ради мелкой правки,
          команды блокируют друг друга, а нагруженный модуль нельзя масштабировать отдельно — только всё сразу. Одна
          ошибка способна уронить всю систему.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Что такое микросервисы</h2>
        <Term name="Микросервисы (microservices)">
          подход, при котором приложение разбивается на набор небольших самостоятельных сервисов. Каждый отвечает за
          одну бизнес-область, имеет свою кодовую базу, свою базу данных и деплоится независимо от остальных.
        </Term>
        <P n={2}>
          Например, интернет-магазин разбивают на сервисы: <em>Пользователи</em>, <em>Каталог</em>, <em>Корзина</em>,{' '}
          <em>Заказы</em>, <em>Оплата</em>, <em>Уведомления</em>. Каждый — отдельное приложение, которое можно
          писать, разворачивать и масштабировать независимо. Общаются они между собой по сети через чёткие
          интерфейсы (API).
        </P>
        <Fig caption="Монолит — единый блок; микросервисы — независимые сервисы, каждый со своей БД, за общим шлюзом.">
          <svg viewBox="0 0 560 210" width="560" height="210" xmlns="http://www.w3.org/2000/svg">
            {/* монолит */}
            <rect x="20" y="60" width="110" height="110" rx="8" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" />
            <text x="75" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">Монолит</text>
            <text x="75" y="110" fill="#f5f5fa" fontSize="11" textAnchor="middle">Users</text>
            <text x="75" y="128" fill="#f5f5fa" fontSize="11" textAnchor="middle">Orders</text>
            <text x="75" y="146" fill="#f5f5fa" fontSize="11" textAnchor="middle">Payments</text>
            {/* стрелка */}
            <text x="180" y="120" fill="#c8ff00" fontSize="22">→</text>
            {/* шлюз */}
            <rect x="230" y="20" width="300" height="26" rx="6" fill="rgba(200,255,0,0.12)" stroke="#c8ff00" />
            <text x="380" y="38" fill="#c8ff00" fontSize="12" textAnchor="middle">API Gateway</text>
            {['Users', 'Orders', 'Payments'].map((s, i) => (
              <g key={s}>
                <line x1="380" y1="46" x2={280 + i * 100} y2="80" stroke="#2a2a3a" />
                <rect x={240 + i * 100} y="80" width="80" height="40" rx="6" fill="rgba(74,222,128,0.15)" stroke="#4ade80" />
                <text x={280 + i * 100} y="104" fill="#f5f5fa" fontSize="11" textAnchor="middle">{s}</text>
                <ellipse cx={280 + i * 100} cy="160" rx="26" ry="12" fill="rgba(129,140,248,0.15)" stroke="#818cf8" />
                <text x={280 + i * 100} y="164" fill="#f5f5fa" fontSize="9" textAnchor="middle">DB</text>
                <line x1={280 + i * 100} y1="120" x2={280 + i * 100} y2="148" stroke="#2a2a3a" />
              </g>
            ))}
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Зачем нужны микросервисы</h2>
        <TheoryTable
          headers={['Преимущество', 'Что это даёт']}
          rows={[
            ['Независимый деплой', 'обновляем один сервис, не трогая остальные'],
            ['Масштабирование по частям', 'добавляем копии только нагруженному сервису'],
            ['Автономность команд', 'разные команды владеют разными сервисами'],
            ['Свобода технологий', 'каждый сервис можно писать на своём языке/стеке'],
            ['Изоляция отказов', 'падение одного сервиса не роняет всю систему'],
          ]}
        />
        <P n={3}>
          Но за гибкость платят сложностью: появляется сеть между сервисами (задержки, сбои связи), тяжелее
          отлаживать и тестировать, нужны распределённые транзакции и мониторинг. Поэтому микросервисы оправданы для
          крупных нагруженных систем и больших команд, а маленькому проекту чаще лучше начать с монолита.
        </P>
        <TheoryExample title="Правило здравого смысла">
          Не начинайте новый проект сразу с микросервисов. Разумный путь — вырастить хорошо структурированный
          монолит и выделять из него сервисы тогда, когда конкретный модуль реально мешает: его нужно масштабировать
          или релизить отдельно.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Как сервисы общаются между собой</h2>
        <Term name="Синхронное общение (REST / gRPC)">
          сервис напрямую вызывает другой и ждёт ответа. REST по HTTP — просто и универсально; gRPC — быстрее и
          строже по контракту (Protobuf), удобен для внутренних вызовов.
        </Term>
        <Term name="Асинхронное общение (очереди сообщений)">
          сервис публикует событие в брокер (Kafka, RabbitMQ), а другие сервисы его читают, когда готовы. Отправитель
          не ждёт ответа — это устойчивее к сбоям и хорошо разгружает систему.
        </Term>
        <P n={4}>
          Пример: при оформлении заказа сервис <em>Orders</em> синхронно (REST/gRPC) спрашивает <em>Payments</em>,
          прошла ли оплата, а затем <strong>асинхронно</strong> публикует событие <code>order_created</code> —
          сервис <em>Notifications</em> подхватит его и отправит письмо, не задерживая оформление. Так сочетают оба
          подхода: синхронный там, где нужен немедленный ответ, асинхронный — для «фоновых» действий.
        </P>
        <TheoryCode language="python" code={`# Синхронный вызов другого сервиса по REST (FastAPI + httpx)
import httpx
from fastapi import FastAPI

app = FastAPI()

@app.post("/orders")
async def create_order(user_id: int, amount: float):
    async with httpx.AsyncClient() as client:
        # спрашиваем сервис оплат
        resp = await client.post(
            "http://payments-service/charge",
            json={"user_id": user_id, "amount": amount},
        )
    if resp.json()["status"] != "ok":
        return {"error": "payment failed"}
    # ...сохраняем заказ, публикуем событие order_created в очередь
    return {"status": "created"}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Ключевые компоненты микросервисной системы</h2>
        <Term name="API Gateway (шлюз)">
          единая точка входа для клиентов. Принимает запросы снаружи и направляет их нужному сервису, попутно
          отвечая за аутентификацию, ограничение частоты запросов и логирование.
        </Term>
        <Term name="Service Discovery">
          механизм, через который сервисы находят друг друга по имени, а не по жёстко прописанному адресу (адреса
          меняются при масштабировании). В Kubernetes это встроено через DNS сервисов.
        </Term>
        <Term name="База данных на сервис">
          у каждого сервиса своя БД, и он единственный, кто с ней работает напрямую. Другие получают данные только
          через API этого сервиса — это сохраняет независимость.
        </Term>
        <Term name="Централизованные логи и мониторинг">
          поскольку сервисов много, логи собирают в одно место, а запросы отслеживают сквозь сервисы (трейсинг),
          чтобы понимать, где произошёл сбой.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Инструменты, языки и фреймворки</h2>
        <P n={5}>
          Микросервисы почти всегда упаковывают в <strong>контейнеры</strong> (Docker) — так сервис со всеми
          зависимостями запускается одинаково где угодно. Множеством контейнеров управляет{' '}
          <strong>оркестратор</strong> (Kubernetes): он запускает нужное число копий, перезапускает упавшие,
          распределяет нагрузку.
        </P>
        <TheoryTable
          headers={['Категория', 'Инструменты / технологии']}
          rows={[
            ['Контейнеры', 'Docker'],
            ['Оркестрация', 'Kubernetes, Docker Compose (для локальной разработки)'],
            ['Синхронная связь', 'REST (HTTP/JSON), gRPC (Protobuf)'],
            ['Асинхронная связь', 'Apache Kafka, RabbitMQ'],
            ['API Gateway', 'Nginx, Kong, Traefik'],
            ['Мониторинг / логи', 'Prometheus + Grafana, ELK (Elasticsearch, Logstash, Kibana)'],
          ]}
        />
        <P n={6}>
          Языки и фреймворки выбирают под задачу — в этом и смысл: <strong>Python</strong> (FastAPI, Flask) для
          быстрого API и ML-сервисов; <strong>Go</strong> — для высоконагруженных сервисов (лёгкий, быстрый);{' '}
          <strong>Java / Kotlin</strong> (Spring Boot) в корпоративной разработке; <strong>Node.js</strong>{' '}
          (NestJS, Express) там, где команда сильна в JS. Один сервис может быть на Python, другой на Go — они всё
          равно общаются по общему протоколу (REST/gRPC).
        </P>
        <TheoryExample title="Мини-стек для старта">
          Учебная микросервисная система: несколько сервисов на <strong>FastAPI</strong>, каждый в своём{' '}
          <strong>Docker</strong>-контейнере, связка через <strong>docker-compose</strong>, синхронные вызовы по
          REST, отдельная <strong>PostgreSQL</strong> на сервис и <strong>Nginx</strong> как шлюз. Этого достаточно,
          чтобы прочувствовать архитектуру, не поднимая Kubernetes.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={7}>
          <strong>Микросервисы</strong> разбивают приложение на маленькие независимые сервисы — каждый со своей
          бизнес-областью, кодовой базой и БД. Это даёт независимый деплой, масштабирование по частям, автономность
          команд и изоляцию отказов, но добавляет сложность распределённой системы. Сервисы общаются{' '}
          <strong>синхронно</strong> (REST/gRPC) и <strong>асинхронно</strong> (Kafka/RabbitMQ), стоят за{' '}
          <strong>API Gateway</strong>, упаковываются в <strong>Docker</strong> и управляются{' '}
          <strong>Kubernetes</strong>. Языки выбирают под задачу. Начинать почти всегда стоит с монолита и переходить
          к микросервисам, когда система и команда реально этого требуют.
        </P>
      </section>
    </div>
  )
}
