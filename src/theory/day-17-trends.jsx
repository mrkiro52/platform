import { TheoryExample, TheoryCode, DbTable } from './components/TheoryTable'

export default function Day17TrendsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 17</h1>
        <p className="theory-subtitle">SQL — часть 1: основы</p>
        <p className="theory-date">17 июня 2026</p>
      </section>

      {/* ─────────── SQL ЧАСТЬ 1 ─────────── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">📊 SQL — часть 1: что такое база данных</h2>
        <p className="theory-intro">
          База данных (БД) — это место, где приложение надёжно хранит данные. Реляционная БД хранит данные в таблицах — как электронные таблицы Excel, со строками и столбцами.
        </p>

        <p className="theory-text" style={{ marginBottom: '4px' }}>Вот таблица <strong>users</strong> — каждая строка это один пользователь, каждый столбец — одно свойство:</p>
        <DbTable
          name="users"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['1', 'Анна', '25', 'Москва'],
            ['2', 'Борис', '31', 'Казань'],
            ['3', 'Вера', '19', 'Москва'],
            ['4', 'Глеб', '42', 'Сочи'],
          ]}
          caption="id — уникальный номер строки (первичный ключ)"
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">SELECT — выборка данных</h2>
        <p className="theory-intro">
          SELECT — главная команда SQL. Она говорит: «выбери эти колонки из этой таблицы». <code>*</code> означает «все колонки».
        </p>

        <TheoryCode language="sql" code={`SELECT name, age FROM users;`} />
        <p className="theory-text">Берём только колонки name и age из таблицы users:</p>
        <DbTable
          name="users"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['1', 'Анна', '25', 'Москва'],
            ['2', 'Борис', '31', 'Казань'],
            ['3', 'Вера', '19', 'Москва'],
          ]}
          highlightCols={[1, 2]}
          caption="Подсвеченные колонки — это результат запроса"
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">WHERE — фильтрация строк</h2>
        <p className="theory-intro">
          WHERE оставляет только те строки, которые подходят под условие. Остальные отбрасываются.
        </p>

        <TheoryCode language="sql" code={`SELECT * FROM users WHERE age > 25;`} />
        <p className="theory-text">Останутся только пользователи старше 25 лет:</p>
        <DbTable
          name="users"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['1', 'Анна', '25', 'Москва'],
            ['2', 'Борис', '31', 'Казань'],
            ['3', 'Вера', '19', 'Москва'],
            ['4', 'Глеб', '42', 'Сочи'],
          ]}
          highlightRows={[1, 3]}
          caption="Подсвечены строки, прошедшие условие age > 25 (Борис и Глеб)"
        />

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операторы в WHERE</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Сравнение:</strong> = , &gt; , &lt; , &gt;= , &lt;= , != </li>
            <li className="theory-list-item"><strong>AND / OR:</strong> <code>WHERE age &gt; 20 AND city = 'Москва'</code></li>
            <li className="theory-list-item"><strong>IN:</strong> <code>WHERE city IN ('Москва', 'Сочи')</code></li>
            <li className="theory-list-item"><strong>BETWEEN:</strong> <code>WHERE age BETWEEN 20 AND 30</code></li>
            <li className="theory-list-item"><strong>LIKE:</strong> <code>WHERE name LIKE 'А%'</code> — имена на букву «А»</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">ORDER BY — сортировка</h2>
        <p className="theory-intro">
          ORDER BY сортирует результат. ASC — по возрастанию (по умолчанию), DESC — по убыванию.
        </p>
        <TheoryCode language="sql" code={`SELECT * FROM users ORDER BY age DESC;`} />
        <p className="theory-text">Те же данные, но отсортированы от самого старшего к младшему:</p>
        <DbTable
          name="результат"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['4', 'Глеб', '42', 'Сочи'],
            ['2', 'Борис', '31', 'Казань'],
            ['1', 'Анна', '25', 'Москва'],
            ['3', 'Вера', '19', 'Москва'],
          ]}
          highlightCols={[2]}
          caption="Строки переставлены по убыванию возраста"
        />
        <ul className="theory-list" style={{ marginTop: '12px' }}>
          <li className="theory-list-item"><strong>LIMIT</strong> — ограничить число строк: <code>ORDER BY age DESC LIMIT 3</code> (топ-3 старших)</li>
          <li className="theory-list-item"><strong>DISTINCT</strong> — только уникальные значения: <code>SELECT DISTINCT city FROM users</code></li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Будущее IT — за теми, кто постоянно учится. А SELECT, WHERE и ORDER BY — твой первый шаг в SQL! 📈</p>
      </section>
    </div>
  )
}
