import { TheoryCode } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

function Table({ headers, rows }) {
  return (
    <div style={{ overflowX: 'auto', margin: '16px 0' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
        <thead>
          <tr>
            {headers.map(h => (
              <th key={h} style={{
                background: 'var(--bg-tertiary)', color: 'var(--accent-lime)',
                padding: '8px 14px', textAlign: 'left', fontWeight: 700,
                border: '1px solid var(--border-color)', whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 0 ? 'var(--bg-secondary)' : 'transparent' }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '8px 14px', color: j === 0 ? 'var(--accent-lime)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-color)', fontWeight: j === 0 ? 600 : 400,
                  fontFamily: j === 0 ? 'monospace' : 'inherit',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Diagram({ children }) {
  return (
    <div style={{
      background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
      borderRadius: 8, padding: '16px 20px', margin: '16px 0',
      fontFamily: 'monospace', fontSize: 13,
      color: 'var(--text-secondary)', lineHeight: 2,
      whiteSpace: 'pre',
    }}>{children}</div>
  )
}

export default function Day20ApiTheory({ videoUrl }) {
  return (
    <div className="theory-container">

      <section className="theory-section">
        <h1 className="theory-title">Сети и REST API</h1>
      </section>

      {videoUrl && <VideoPlayer src={videoUrl} />}

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Как работают сети</h2>
        <p className="theory-intro">
          <strong>Компьютерная сеть</strong> — группа устройств, обменивающихся данными.
          Интернет — самая большая такая сеть, объединяющая миллиарды устройств.
        </p>
        <p className="theory-intro" style={{ marginTop: 12 }}>
          <strong>Аналогия:</strong> сеть — почтовая система. Чтобы письмо дошло,
          нужен адрес отправителя, получателя и согласованные правила. В сетях эту роль
          играют IP-адреса и протоколы.
        </p>

        <Table
          headers={['Понятие', 'Что это', 'Пример']}
          rows={[
            ['IP-адрес', 'Уникальный адрес устройства в сети', '192.168.1.10'],
            ['Домен', 'Человекочитаемое имя вместо IP', 'google.com'],
            ['DNS', 'Сервис перевода доменов в IP', 'google.com → 172.217.16.142'],
            ['Порт', 'Дверь для конкретного трафика', '80=HTTP, 443=HTTPS, 22=SSH'],
            ['Протокол', 'Набор правил обмена данными', 'HTTP, TCP/IP, FTP, SSH'],
          ]}
        />

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>Модель клиент-сервер</h3>
        <Diagram>{`Клиент  ──── запрос GET /users ────▶   Сервер
         ◀──── ответ 200 OK + JSON ────`}</Diagram>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Клиент</strong> — тот, кто запрашивает данные (браузер, мобильное приложение)</li>
          <li className="theory-list-item"><strong>Сервер</strong> — тот, кто хранит данные и обрабатывает запросы</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Протокол HTTP</h2>
        <p className="theory-intro">
          <strong>HTTP</strong> (HyperText Transfer Protocol) — протокол передачи данных в вебе.
          <strong> HTTPS</strong> = HTTP + шифрование TLS. Сегодня HTTPS — стандарт для всех серьёзных сайтов.
        </p>

        <h3 className="theory-heading-3" style={{ marginTop: 16 }}>Из чего состоит запрос</h3>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Метод</strong> — что мы хотим сделать (GET, POST…)</li>
          <li className="theory-list-item"><strong>URL</strong> — куда обращаемся</li>
          <li className="theory-list-item"><strong>Заголовки (headers)</strong> — метаданные: тип контента, авторизация</li>
          <li className="theory-list-item"><strong>Тело (body)</strong> — данные, которые передаём (не всегда нужно)</li>
        </ul>

        <TheoryCode lang="http" code={`POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json
Authorization: Bearer eyJhbGci...

{
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Что такое REST API</h2>

        <p className="theory-intro">
          <strong>API</strong> (Application Programming Interface) — интерфейс, через который одна программа
          обращается к функциям другой. Это контракт: что можно запросить и что вернётся.
        </p>
        <p className="theory-intro" style={{ marginTop: 12 }}>
          <strong>Аналогия:</strong> API — меню в ресторане. Выбираете блюдо из меню (запрос),
          кухня готовит и приносит (ответ). Вы не идёте готовить сами.
        </p>
        <p className="theory-intro" style={{ marginTop: 12 }}>
          <strong>REST</strong> (REpresentational State Transfer) — архитектурный стиль
          построения API, не протокол. API, следующий этим принципам, называют <strong>RESTful</strong>.
        </p>

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>Принципы REST</h3>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Клиент-сервер</strong> — разделены, развиваются независимо</li>
          <li className="theory-list-item"><strong>Stateless</strong> — каждый запрос содержит всё необходимое; сервер не помнит предыдущие запросы</li>
          <li className="theory-list-item"><strong>Ресурсы и URL</strong> — всё это ресурс с уникальным адресом: /users, /users/42</li>
          <li className="theory-list-item"><strong>Единообразный интерфейс</strong> — одни методы (GET/POST/PUT/DELETE) для всех ресурсов</li>
        </ul>

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>Пример: API библиотеки книг</h3>
        <Table
          headers={['Что делаем', 'Запрос']}
          rows={[
            ['Получить список книг', 'GET /books'],
            ['Получить книгу с id 5', 'GET /books/5'],
            ['Добавить новую книгу', 'POST /books'],
            ['Изменить книгу с id 5', 'PUT /books/5'],
            ['Удалить книгу с id 5', 'DELETE /books/5'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. HTTP-методы, статус-коды и JSON</h2>

        <h3 className="theory-heading-3">HTTP-методы (CRUD)</h3>
        <Table
          headers={['Метод', 'Действие', 'CRUD']}
          rows={[
            ['GET',    'Получить данные',           'Read'],
            ['POST',   'Создать новый ресурс',      'Create'],
            ['PUT',    'Полностью обновить ресурс', 'Update'],
            ['PATCH',  'Частично обновить ресурс',  'Update'],
            ['DELETE', 'Удалить ресурс',            'Delete'],
          ]}
        />

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>Коды ответов (status codes)</h3>
        <Table
          headers={['Диапазон', 'Значение', 'Примеры']}
          rows={[
            ['2xx', 'Успех',             '200 OK, 201 Created, 204 No Content'],
            ['3xx', 'Перенаправление',   '301 Moved Permanently'],
            ['4xx', 'Ошибка клиента',   '400 Bad Request, 401 Unauthorized, 404 Not Found'],
            ['5xx', 'Ошибка сервера',   '500 Internal Server Error'],
          ]}
        />
        <p className="theory-intro" style={{ marginTop: 12 }}>
          <strong>2xx</strong> — всё хорошо &nbsp;|&nbsp;
          <strong>4xx</strong> — ошибся клиент &nbsp;|&nbsp;
          <strong>5xx</strong> — сломалось на сервере
        </p>

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>JSON — формат данных REST API</h3>
        <p className="theory-intro">
          <strong>JSON</strong> (JavaScript Object Notation) — самый популярный формат передачи данных.
          Прост, читаем человеком, поддерживается всеми языками.
        </p>
        <TheoryCode lang="json" code={`// Ответ на GET /users/1
{
  "id": 1,
  "name": "Анна Петрова",
  "email": "anna@example.com",
  "isActive": true,
  "orders": [101, 205]
}`} />

        <h3 className="theory-heading-3" style={{ marginTop: 20 }}>Полный цикл запрос → ответ</h3>
        <TheoryCode lang="http" code={`// Запрос — создание пользователя
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}

// Ответ сервера
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 102,
  "name": "Иван Иванов",
  "email": "ivan@example.com"
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Практика в браузере</h2>
        <ul className="theory-list">
          <li className="theory-list-item">
            <strong>DevTools → Network</strong> — открой любой сайт, F12 → Network → перезагрузи.
            Увидишь все реальные HTTP-запросы.
          </li>
          <li className="theory-list-item">
            <strong>Публичный API прямо в браузере:</strong>{' '}
            <code>jsonplaceholder.typicode.com/posts/1</code> — откроет JSON-ответ
          </li>
          <li className="theory-list-item">
            <strong>curl в терминале:</strong>
          </li>
        </ul>
        <TheoryCode lang="bash" code={`curl https://jsonplaceholder.typicode.com/posts/1
# Ответ: { "userId": 1, "id": 1, "title": "...", "body": "..." }`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Краткое резюме</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Сеть</strong> — устройства, обменивающиеся данными по протоколам</li>
          <li className="theory-list-item"><strong>HTTP</strong> — протокол веба: запрос → ответ; HTTPS добавляет шифрование</li>
          <li className="theory-list-item"><strong>API</strong> — контракт, по которому одна программа обращается к другой</li>
          <li className="theory-list-item"><strong>REST</strong> — стиль API: ресурсы, URL, единообразные методы, stateless</li>
          <li className="theory-list-item"><strong>CRUD через HTTP:</strong> GET / POST / PUT+PATCH / DELETE</li>
          <li className="theory-list-item"><strong>JSON</strong> — основной формат данных</li>
          <li className="theory-list-item"><strong>Статус-коды:</strong> 2xx — успех, 4xx — ошибка клиента, 5xx — ошибка сервера</li>
        </ul>
      </section>

    </div>
  )
}
