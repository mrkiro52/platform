import { TheoryExample, TheoryCode, DbTable, TheoryTable } from './components/TheoryTable'

export default function Day17TrendsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">SQL — часть 1: основы</h1>
        <p>
          SQL — язык запросов к реляционным базам данных. Его используют бэкенд-разработчики, аналитики, data scientists и тестировщики. В первой части — как устроена таблица и как выбирать, фильтровать и сортировать данные.
        </p>
      </section>

      {/* ─────────── SQL ЧАСТЬ 1 ─────────── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">SQL — часть 1: что такое база данных</h2>
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

      <section className="theory-section">
        <h2 className="theory-heading-2">Условия в WHERE: операторы</h2>
        <TheoryTable
          headers={['Оператор', 'Пример', 'Что выбирает']}
          rows={[
            ['=, <>, <, >, <=, >=', "age >= 18", 'Сравнение значений'],
            ['AND, OR, NOT', "city = 'Москва' AND age < 30", 'Комбинация условий'],
            ['IN', "city IN ('Москва', 'Казань')", 'Значение из списка'],
            ['BETWEEN', 'age BETWEEN 18 AND 30', 'Диапазон включительно с обеих сторон'],
            ['LIKE', "name LIKE 'А%'", 'Шаблон: % — любые символы, _ — ровно один символ'],
            ['IS NULL / IS NOT NULL', 'phone IS NULL', 'Пустые (неизвестные) значения'],
          ]}
        />
        <TheoryCode language="sql" code={`-- Пользователи из Москвы или Казани от 18 до 30 лет,
-- у которых имя начинается на «А»
SELECT name, age, city
FROM users
WHERE city IN ('Москва', 'Казань')
  AND age BETWEEN 18 AND 30
  AND name LIKE 'А%';`} />
        <p>
          <strong>AND выполняется раньше OR</strong>, как умножение раньше сложения. Если смешиваешь их — ставь
          скобки: <code>WHERE (city = 'Москва' OR city = 'Сочи') AND age &gt; 25</code>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">NULL — отдельный случай</h2>
        <p>
          <code>NULL</code> означает «значение неизвестно», а не ноль и не пустую строку. Любое сравнение с NULL
          через <code>=</code> даёт не «истину» и не «ложь», а тоже неизвестность, поэтому такие строки в выборку
          не попадают.
        </p>
        <TheoryCode language="sql" code={`SELECT * FROM users WHERE phone = NULL;     -- ничего не найдёт!
SELECT * FROM users WHERE phone IS NULL;    -- правильно

-- Подставить значение вместо NULL при выводе
SELECT name, COALESCE(phone, 'не указан') AS phone FROM users;`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">DISTINCT, LIMIT и псевдонимы</h2>
        <TheoryCode language="sql" code={`-- Список городов без повторов
SELECT DISTINCT city FROM users;

-- Три самых старших пользователя
SELECT name, age FROM users
ORDER BY age DESC
LIMIT 3;

-- Пропустить первые 10 строк и взять следующие 10 (вторая страница)
SELECT name FROM users ORDER BY id LIMIT 10 OFFSET 10;

-- Псевдонимы (AS) для столбцов и вычисляемых значений
SELECT name AS имя, age + 1 AS возраст_через_год FROM users;`} />
        <p>
          <code>LIMIT</code> без <code>ORDER BY</code> возвращает произвольные строки — база не гарантирует
          порядок. Если важно, какие именно строки попадут в выборку, всегда сортируй.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">В каком порядке выполняется запрос</h2>
        <p>
          Пишем запрос в одном порядке, а база выполняет его в другом. Это объясняет многие ошибки, например
          почему в <code>WHERE</code> нельзя использовать псевдоним из <code>SELECT</code>.
        </p>
        <TheoryTable
          headers={['Шаг', 'Секция', 'Что происходит']}
          rows={[
            ['1', 'FROM', 'Берём таблицу'],
            ['2', 'WHERE', 'Отбрасываем строки, не подходящие под условие'],
            ['3', 'SELECT', 'Вычисляем нужные столбцы и псевдонимы'],
            ['4', 'DISTINCT', 'Убираем повторы'],
            ['5', 'ORDER BY', 'Сортируем (здесь псевдонимы уже доступны)'],
            ['6', 'LIMIT / OFFSET', 'Отрезаем нужное количество строк'],
          ]}
        />
        <TheoryExample title="Где потренироваться">
          Все запросы из этого конспекта можно выполнить в SQL-тренажёре платформы (раздел «Тренировки»):
          там настоящая база маркетплейса и задачи с автоматической проверкой ответа.
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Будущее IT — за теми, кто постоянно учится. А SELECT, WHERE и ORDER BY — твой первый шаг в SQL! </p>
      </section>
    </div>
  )
}
