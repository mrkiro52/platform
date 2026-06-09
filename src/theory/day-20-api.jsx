import { TheoryTable, TheoryCode } from './components/TheoryTable'

export default function Day20ApiTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 20</h1>
        <p className="theory-subtitle">Сети и REST API</p>
        <p className="theory-date">20 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как работает интернет</h2>
        <p className="theory-intro"><strong>DNS:</strong> google.com → IP адрес</p>
        <p className="theory-intro"><strong>HTTP:</strong> Запрос-ответ между клиентом и сервером</p>
        <p className="theory-intro"><strong>TCP/IP:</strong> Стандарты передачи данных</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">HTTP методы</h2>
        <TheoryTable
          headers={['Метод', 'Описание', 'Пример']}
          rows={[
            ['GET', 'Получить данные', 'Загрузить страницу'],
            ['POST', 'Создать данные', 'Отправить форму'],
            ['PUT', 'Обновить полностью', 'Заменить весь объект'],
            ['PATCH', 'Обновить частично', 'Изменить одно поле'],
            ['DELETE', 'Удалить данные', 'Удалить пост'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">REST API</h2>
        <p className="theory-intro">REST = Representational State Transfer. Стандарт для создания API.</p>
        <TheoryCode code={`// GET /users - получить всех пользователей
GET /users

// GET /users/123 - получить пользователя 123
GET /users/123

// POST /users - создать нового пользователя
POST /users
Body: {"name": "Иван", "age": 17}

// PUT /users/123 - обновить пользователя 123
PUT /users/123
Body: {"name": "Иван", "age": 18}

// DELETE /users/123 - удалить пользователя 123
DELETE /users/123`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">HTTP коды ответов</h2>
        <TheoryTable
          headers={['Код', 'Значение', 'Когда']}
          rows={[
            ['200', 'OK', 'Запрос успешен'],
            ['201', 'Created', 'Ресурс создан'],
            ['400', 'Bad Request', 'Неправильные данные'],
            ['401', 'Unauthorized', 'Нужна аутентификация'],
            ['403', 'Forbidden', 'Доступ запрещён'],
            ['404', 'Not Found', 'Ресурс не найден'],
            ['500', 'Server Error', 'Ошибка на сервере'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">JSON</h2>
        <p className="theory-intro">Формат обмена данными между сервером и клиентом.</p>
        <TheoryCode code={`{
  "users": [
    {
      "id": 1,
      "name": "Иван",
      "email": "ivan@example.com",
      "active": true
    },
    {
      "id": 2,
      "name": "Алиса",
      "email": "alice@example.com",
      "active": false
    }
  ]
}`} language="json" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Аутентификация</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>API Key:</strong> Простой ключ в заголовке</li>
          <li className="theory-list-item"><strong>Bearer Token (JWT):</strong> Токен с информацией о пользователе</li>
          <li className="theory-list-item"><strong>OAuth 2.0:</strong> Вход через Google/GitHub</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">cURL - тестирование API</h2>
        <TheoryCode code={`# GET запрос
curl https://api.example.com/users

# POST с данными
curl -X POST https://api.example.com/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Иван","age":17}'

# С токеном
curl https://api.example.com/users \\
  -H "Authorization: Bearer token123"`} language="bash" />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">API везде! Это основа веб-разработки! 🌐</p>
      </section>
    </div>
  )
}
