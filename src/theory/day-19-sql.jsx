import { TheoryTable, TheoryCode, TheoryExample, DbTable } from './components/TheoryTable'

export default function Day19SqlTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 19</h1>
        <p className="theory-subtitle">Основы баз данных и SQL · часть 3</p>
        <p className="theory-date">19 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Связи между таблицами</h2>
        <p className="theory-intro">
          В реальных приложениях данные разбиты на несколько таблиц, связанных между собой. Это избавляет от дублирования. Возьмём пользователей и их заказы.
        </p>

        <DbTable
          name="users"
          columns={['id 🔑', 'name', 'city']}
          rows={[
            ['1', 'Анна', 'Москва'],
            ['2', 'Борис', 'Казань'],
            ['3', 'Вера', 'Москва'],
          ]}
          highlightCols={[0]}
          caption="id — первичный ключ (PRIMARY KEY), уникальный для каждого пользователя"
        />

        <DbTable
          name="orders"
          columns={['id 🔑', 'user_id 🔗', 'product', 'price']}
          rows={[
            ['1', '1', 'Книга', '500'],
            ['2', '1', 'Наушники', '3000'],
            ['3', '2', 'Мышка', '1200'],
            ['4', '5', 'Монитор', '15000'],
          ]}
          highlightCols={[1]}
          caption="user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"
        />

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Ключи</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Первичный ключ (PRIMARY KEY)</strong> 🔑 — уникальный идентификатор строки. Не повторяется.</li>
            <li className="theory-list-item"><strong>Внешний ключ (FOREIGN KEY)</strong> 🔗 — ссылка на первичный ключ другой таблицы. Связывает таблицы.</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">INNER JOIN — соединение таблиц</h2>
        <p className="theory-intro">
          JOIN соединяет строки двух таблиц по условию. INNER JOIN оставляет только те строки, для которых есть совпадение в обеих таблицах.
        </p>
        <TheoryCode language="sql" code={`SELECT users.name, orders.product, orders.price
FROM users
JOIN orders ON users.id = orders.user_id;`} />
        <p className="theory-text">Каждый заказ дополнился именем пользователя (соединение по id = user_id):</p>
        <DbTable
          name="результат"
          columns={['name', 'product', 'price']}
          rows={[
            ['Анна', 'Книга', '500'],
            ['Анна', 'Наушники', '3000'],
            ['Борис', 'Мышка', '1200'],
          ]}
          highlightRows={[0, 1, 2]}
          caption="Заказ с user_id=5 не попал — такого пользователя нет. Вера без заказов — тоже не попала."
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">LEFT JOIN — все строки слева</h2>
        <p className="theory-intro">
          LEFT JOIN берёт ВСЕ строки из левой таблицы, даже если справа нет совпадения. Где совпадения нет — будет NULL (пусто).
        </p>
        <TheoryCode language="sql" code={`SELECT users.name, orders.product
FROM users
LEFT JOIN orders ON users.id = orders.user_id;`} />
        <DbTable
          name="результат"
          columns={['name', 'product']}
          rows={[
            ['Анна', 'Книга'],
            ['Анна', 'Наушники'],
            ['Борис', 'Мышка'],
            ['Вера', 'NULL'],
          ]}
          highlightRows={[3]}
          caption="Вера попала в результат, хотя заказов у неё нет — product = NULL"
        />
        <TheoryTable
          headers={['Тип JOIN', 'Что возвращает']}
          rows={[
            ['INNER JOIN', 'Только строки с совпадением в обеих таблицах'],
            ['LEFT JOIN', 'Все строки из левой таблицы + совпадения справа'],
            ['RIGHT JOIN', 'Все строки из правой таблицы + совпадения слева'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">JOIN + GROUP BY вместе</h2>
        <p className="theory-intro">
          Самое мощное — соединить таблицы и тут же сгруппировать. Например: сколько потратил каждый пользователь.
        </p>
        <TheoryCode language="sql" code={`SELECT users.name, SUM(orders.price) AS total
FROM users
JOIN orders ON users.id = orders.user_id
GROUP BY users.name
ORDER BY total DESC;`} />
        <DbTable
          name="результат"
          columns={['name', 'total']}
          rows={[
            ['Анна', '3500'],
            ['Борис', '1200'],
          ]}
          highlightCols={[1]}
          caption="Анна: 500 + 3000 = 3500. Отсортировано по убыванию суммы."
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Нормализация</h2>
        <p className="theory-intro">
          Нормализация — это разбиение данных на таблицы так, чтобы избежать дублирования. Вместо того чтобы в каждом заказе хранить имя и город пользователя, мы храним только user_id и ссылаемся на таблицу users.
        </p>
        <TheoryExample title="Зачем это нужно">
          <p>Если Анна сменит город, мы поменяем его в ОДНОМ месте — в таблице users. Без нормализации пришлось бы менять город во всех её заказах.</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">SQL vs NoSQL</h2>
        <TheoryTable
          headers={['SQL (реляционные)', 'NoSQL']}
          rows={[
            ['Данные в таблицах со схемой', 'Гибкая структура (документы, ключ-значение)'],
            ['Строгие связи и целостность', 'Быстрое масштабирование'],
            ['Сложные запросы с JOIN', 'Простые быстрые запросы'],
            ['PostgreSQL, MySQL, SQLite', 'MongoDB, Redis'],
          ]}
        />
        <p className="theory-text" style={{ marginTop: '12px' }}>
          <strong>Когда что:</strong> SQL — когда данные структурированы и важны связи (банк, магазин). NoSQL — когда нужна гибкость и скорость (кэш, логи, ленты).
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итог трёх дней SQL</h2>
        <TheoryTable
          headers={['Часть', 'Что изучили']}
          rows={[
            ['Часть 1 (17 июня)', 'БД, таблицы, SELECT, WHERE, ORDER BY, LIMIT'],
            ['Часть 2 (18 июня)', 'COUNT/SUM/AVG, GROUP BY, HAVING, INSERT/UPDATE/DELETE'],
            ['Часть 3 (19 июня)', 'Ключи, INNER/LEFT JOIN, нормализация, SQL vs NoSQL'],
          ]}
        />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">SQL — один из самых востребованных навыков. Ты прошёл все основы за три дня. Теперь практикуйся на реальных запросах! 📊</p>
      </section>
    </div>
  )
}
