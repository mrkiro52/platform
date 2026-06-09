import { TheoryTable, TheoryCode } from './components/TheoryTable'

export default function Day19SqlTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 19</h1>
        <p className="theory-subtitle">Основы баз данных и SQL</p>
        <p className="theory-date">19 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Зачем БД?</h2>
        <p className="theory-intro">Приложение нужно где-то сохранять данные. БД делает это быстро и надёжно.</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">SQL команды</h2>
        <TheoryTable
          headers={['Операция', 'Команда', 'Пример']}
          rows={[
            ['Выбрать', 'SELECT', 'SELECT name, age FROM users'],
            ['Фильтр', 'WHERE', 'WHERE age > 18'],
            ['Добавить', 'INSERT', 'INSERT INTO users VALUES (...)'],
            ['Обновить', 'UPDATE', 'UPDATE users SET age=20 WHERE id=1'],
            ['Удалить', 'DELETE', 'DELETE FROM users WHERE id=1'],
            ['Сортировка', 'ORDER BY', 'ORDER BY age DESC'],
            ['Группировка', 'GROUP BY', 'GROUP BY age HAVING count > 5'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Примеры запросов</h2>
        <TheoryCode code={`-- Все пользователи
SELECT * FROM users;

-- Пользователи старше 18
SELECT * FROM users WHERE age > 18;

-- Количество пользователей по возрасту
SELECT age, COUNT(*) as count
FROM users
GROUP BY age;

-- Самые молодые первыми
SELECT * FROM users ORDER BY age ASC;

-- JOIN - данные из двух таблиц
SELECT users.name, orders.product
FROM users
JOIN orders ON users.id = orders.user_id;`} language="sql" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Реляционная модель</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Таблица:</strong> Электронная таблица (строки + столбцы)</li>
          <li className="theory-list-item"><strong>Первичный ключ (Primary Key):</strong> Уникальный ID строки</li>
          <li className="theory-list-item"><strong>Внешний ключ (Foreign Key):</strong> Ссылка на строку другой таблицы</li>
          <li className="theory-list-item"><strong>Нормализация:</strong> Минимизировать дубление данных</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">NoSQL vs SQL</h2>
        <TheoryTable
          headers={['SQL', 'NoSQL']}
          rows={[
            ['Структурированные данные', 'Гибкие данные'],
            ['ACID (надёжность)', 'Быстрота'],
            ['Сложные запросы', 'Простые запросы'],
            ['MySQL, PostgreSQL', 'MongoDB, Redis'],
          ]}
        />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">SQL везде! Выучи хорошо! 📊</p>
      </section>
    </div>
  )
}
