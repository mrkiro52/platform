import { TheoryTable, TheoryCode, TheoryExample, DbTable } from './components/TheoryTable'

export default function Day19SqlTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы баз данных и SQL · часть 3</h1>
      </section>

      {/* ─── Ключи ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Связи между таблицами и ключи</h2>
        <p className="theory-intro">
          В реальных приложениях данные разбиты на несколько таблиц, связанных между собой.
          Это избавляет от дублирования — принцип нормализации.
        </p>

        <DbTable
          name="users"
          columns={['id 🔑', 'name', 'age', 'city']}
          rows={[
            ['1', 'Анна', '25', 'Москва'],
            ['2', 'Борис', '31', 'Казань'],
            ['3', 'Вера', '19', 'Москва'],
            ['4', 'Глеб', '42', 'Сочи'],
            ['5', 'Дина', '28', 'Казань'],
          ]}
          highlightCols={[0]}
          caption="id — первичный ключ (PRIMARY KEY), уникальный для каждой строки, не NULL"
        />

        <DbTable
          name="orders"
          columns={['id 🔑', 'user_id 🔗', 'product', 'price']}
          rows={[
            ['1', '1', 'Книга', '500'],
            ['2', '1', 'Наушники', '3000'],
            ['3', '2', 'Мышка', '1200'],
            ['4', '3', 'Клавиатура', '2500'],
            ['5', '5', 'Монитор', '15000'],
          ]}
          highlightCols={[1]}
          caption="user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"
        />

        <ul className="theory-list">
          <li className="theory-list-item"><strong>PRIMARY KEY 🔑</strong> — уникальный идентификатор строки. Не повторяется, не бывает NULL.</li>
          <li className="theory-list-item"><strong>FOREIGN KEY 🔗</strong> — ссылка на PRIMARY KEY другой таблицы. Гарантирует целостность данных.</li>
          <li className="theory-list-item"><strong>Типы связей:</strong> один-к-одному (1:1), один-ко-многим (1:N), многие-ко-многим (N:M через промежуточную таблицу).</li>
        </ul>
      </section>

      {/* ─── INNER JOIN ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">INNER JOIN — пересечение таблиц</h2>
        <p className="theory-intro">
          JOIN соединяет строки двух таблиц по условию. INNER JOIN возвращает только строки,
          у которых есть совпадение в <em>обеих</em> таблицах.
        </p>
        <TheoryCode language="sql" code={`SELECT u.name, o.product, o.price
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;`} />
        <p className="theory-text">
          <code>AS u</code> и <code>AS o</code> — псевдонимы таблиц. Делают запрос короче и читаемее.
        </p>
        <DbTable
          name="результат INNER JOIN"
          columns={['name', 'product', 'price']}
          rows={[
            ['Анна', 'Книга', '500'],
            ['Анна', 'Наушники', '3000'],
            ['Борис', 'Мышка', '1200'],
            ['Вера', 'Клавиатура', '2500'],
            ['Дина', 'Монитор', '15000'],
          ]}
          highlightRows={[0, 1, 2, 3, 4]}
          caption="Глеб не попал — у него нет заказов. Строки с несуществующим user_id тоже отсеиваются."
        />
      </section>

      {/* ─── LEFT JOIN ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">LEFT JOIN — все строки из левой таблицы</h2>
        <p className="theory-intro">
          LEFT JOIN берёт <strong>все строки из левой таблицы</strong>, даже если справа нет совпадения.
          Там где совпадения нет — будет NULL.
        </p>
        <TheoryCode language="sql" code={`SELECT u.name, o.product
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;`} />
        <DbTable
          name="результат LEFT JOIN"
          columns={['name', 'product']}
          rows={[
            ['Анна', 'Книга'],
            ['Анна', 'Наушники'],
            ['Борис', 'Мышка'],
            ['Вера', 'Клавиатура'],
            ['Глеб', 'NULL'],
            ['Дина', 'Монитор'],
          ]}
          highlightRows={[4]}
          caption="Глеб попал в результат, хотя заказов нет — product = NULL"
        />

        <TheoryCode language="sql" code={`-- Найти пользователей БЕЗ заказов
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE o.id IS NULL;`} />
        <p className="theory-text">Фильтр <code>WHERE o.id IS NULL</code> оставит только тех, у кого нет совпадений справа.</p>

        <TheoryTable
          headers={['Тип JOIN', 'Что возвращает', 'Когда использовать']}
          rows={[
            ['INNER JOIN', 'Только строки с совпадением в обеих таблицах', 'Когда нужны только связанные данные'],
            ['LEFT JOIN', 'Все строки слева + совпадения справа (NULL если нет)', 'Когда нужны все записи, даже без пары'],
            ['RIGHT JOIN', 'Все строки справа + совпадения слева (NULL если нет)', 'Редко — обычно меняют порядок таблиц и пишут LEFT'],
            ['FULL OUTER JOIN', 'Все строки из обеих таблиц', 'Когда нужно объединить всё (не в SQLite)'],
          ]}
        />
      </section>

      {/* ─── JOIN + GROUP BY ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">JOIN + GROUP BY — агрегация по связям</h2>
        <p className="theory-intro">
          Самая мощная комбинация: соединить таблицы и сразу посчитать статистику по группам.
        </p>
        <TheoryCode language="sql" code={`-- Сколько потратил каждый пользователь
SELECT u.name, COUNT(o.id) AS orders_count, SUM(o.price) AS total_spent
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;`} />
        <DbTable
          name="результат"
          columns={['name', 'orders_count', 'total_spent']}
          rows={[
            ['Дина', '1', '15000'],
            ['Анна', '2', '3500'],
            ['Вера', '1', '2500'],
            ['Борис', '1', '1200'],
            ['Глеб', '0', 'NULL'],
          ]}
          highlightCols={[1, 2]}
          caption="LEFT JOIN + GROUP BY — показывает всех пользователей, включая без заказов"
        />
      </section>

      {/* ─── NULL ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">NULL — отсутствие значения</h2>
        <p className="theory-intro">
          NULL — это не ноль и не пустая строка. Это «значение неизвестно или отсутствует».
          С NULL нужно работать через специальные операторы.
        </p>

        <TheoryTable
          headers={['Оператор / функция', 'Что делает', 'Пример']}
          rows={[
            ['IS NULL', 'Проверить, что значение NULL', "WHERE city IS NULL"],
            ['IS NOT NULL', 'Проверить, что значение не NULL', "WHERE city IS NOT NULL"],
            ['COALESCE(a, b, c)', 'Первое ненулевое значение из списка', "COALESCE(phone, email, 'нет контакта')"],
            ['IFNULL(a, b)', 'Если a = NULL — вернуть b (SQLite/MySQL)', "IFNULL(price, 0)"],
            ['NULLIF(a, b)', 'Если a = b — вернуть NULL, иначе a', "NULLIF(score, 0)"],
          ]}
        />

        <TheoryCode language="sql" code={`-- Пользователи без указанного города
SELECT name FROM users WHERE city IS NULL;

-- Заменить NULL на текст "Не указан"
SELECT name, COALESCE(city, 'Не указан') AS city
FROM users;

-- Сумма с заменой NULL на 0
SELECT u.name, COALESCE(SUM(o.price), 0) AS total
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name;`} />

        <TheoryExample title="Важно про NULL">
          <p>NULL ≠ NULL. Сравнение <code>WHERE city = NULL</code> никогда не сработает — используй <code>IS NULL</code>.</p>
          <p style={{ marginTop: '8px' }}>Агрегатные функции игнорируют NULL: <code>AVG()</code> считает только ненулевые значения.</p>
        </TheoryExample>
      </section>

      {/* ─── CASE WHEN ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">CASE WHEN — условная логика в SQL</h2>
        <p className="theory-intro">
          CASE WHEN — это аналог <code>if/else</code> прямо внутри SQL-запроса.
          Позволяет создавать новые поля на основе условий.
        </p>
        <TheoryCode language="sql" code={`SELECT name, age,
  CASE
    WHEN age < 18 THEN 'несовершеннолетний'
    WHEN age BETWEEN 18 AND 25 THEN 'молодой'
    WHEN age BETWEEN 26 AND 40 THEN 'взрослый'
    ELSE 'старший'
  END AS age_group
FROM users;`} />
        <DbTable
          name="результат"
          columns={['name', 'age', 'age_group']}
          rows={[
            ['Анна', '25', 'молодой'],
            ['Борис', '31', 'взрослый'],
            ['Вера', '19', 'молодой'],
            ['Глеб', '42', 'старший'],
            ['Дина', '28', 'взрослый'],
          ]}
          highlightCols={[2]}
          caption="CASE WHEN вычисляет новый столбец age_group для каждой строки"
        />
        <TheoryCode language="sql" code={`-- CASE WHEN внутри COUNT для подсчёта по условию
SELECT
  COUNT(*) AS total_users,
  COUNT(CASE WHEN city = 'Москва' THEN 1 END) AS moscow_users,
  COUNT(CASE WHEN age >= 30 THEN 1 END) AS users_30_plus
FROM users;`} />
      </section>

      {/* ─── Подзапросы ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Подзапросы (Subqueries)</h2>
        <p className="theory-intro">
          Подзапрос — это SELECT внутри другого SELECT, WHERE или FROM.
          Выполняется первым, его результат используется внешним запросом.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Подзапрос в WHERE</h3>
          <TheoryCode language="sql" code={`-- Найти пользователей старше среднего возраста
SELECT name, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);`} />
          <p className="theory-text">Внутренний запрос <code>SELECT AVG(age)</code> считается первым → возвращает число (29) → внешний запрос фильтрует строки с age &gt; 29.</p>
          <DbTable
            name="результат"
            columns={['name', 'age']}
            rows={[
              ['Борис', '31'],
              ['Глеб', '42'],
            ]}
            highlightRows={[0, 1]}
            caption="AVG(age) = 29. Борис (31) и Глеб (42) старше среднего."
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Подзапрос с IN</h3>
          <TheoryCode language="sql" code={`-- Пользователи, сделавшие хотя бы один заказ
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Пользователи, НЕ сделавшие ни одного заказа
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);`} />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Подзапрос в FROM (derived table)</h3>
          <TheoryCode language="sql" code={`-- Средняя сумма заказа по городам через подзапрос
SELECT city, AVG(total) AS avg_total
FROM (
  SELECT u.city, SUM(o.price) AS total
  FROM users AS u
  JOIN orders AS o ON u.id = o.user_id
  GROUP BY u.id, u.city
) AS user_totals
GROUP BY city;`} />
          <p className="theory-text">Подзапрос в FROM создаёт временную таблицу <code>user_totals</code>, по которой делается внешний запрос.</p>
        </div>

        <TheoryTable
          headers={['Тип', 'Где пишется', 'Что возвращает', 'Пример']}
          rows={[
            ['Скалярный', 'WHERE, SELECT', 'Одно значение', 'WHERE age > (SELECT AVG(age) FROM users)'],
            ['Строчный', 'WHERE IN / NOT IN', 'Список значений', 'WHERE id IN (SELECT user_id FROM orders)'],
            ['Табличный', 'FROM', 'Временная таблица', 'FROM (SELECT ...) AS sub'],
          ]}
        />
      </section>

      {/* ─── UNION ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">UNION — объединение результатов</h2>
        <p className="theory-intro">
          UNION объединяет результаты двух SELECT в один. Требует одинакового числа столбцов и совместимых типов.
        </p>
        <TheoryCode language="sql" code={`-- Все города из users + все города из другой таблицы
SELECT city, 'user' AS source FROM users
UNION
SELECT city, 'store' AS source FROM stores;

-- UNION ALL — включая дубликаты (быстрее)
SELECT city FROM users
UNION ALL
SELECT city FROM users;   -- дублирует строки

-- UNION — без дубликатов (делает DISTINCT автоматически)
SELECT city FROM users
UNION
SELECT city FROM users;`} />
        <TheoryTable
          headers={['', 'UNION', 'UNION ALL']}
          rows={[
            ['Дубликаты', 'Удаляет (DISTINCT)', 'Оставляет все'],
            ['Скорость', 'Медленнее (сортировка для DISTINCT)', 'Быстрее'],
            ['Использование', 'Когда дубли не нужны', 'Когда дубли допустимы'],
          ]}
        />
      </section>

      {/* ─── CREATE TABLE ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">CREATE TABLE и типы данных</h2>
        <p className="theory-intro">
          При создании таблицы каждый столбец получает тип данных. Тип определяет что можно хранить и сколько памяти занимает.
        </p>
        <TheoryCode language="sql" code={`CREATE TABLE products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT NOT NULL,
  price    REAL DEFAULT 0,
  stock    INTEGER DEFAULT 0,
  category TEXT,
  created  TEXT DEFAULT (datetime('now'))  -- SQLite
);`} />
        <TheoryTable
          headers={['Тип (SQLite)', 'Аналог в других БД', 'Что хранит', 'Пример']}
          rows={[
            ['INTEGER', 'INT, BIGINT', 'Целые числа', '42, -5, 0'],
            ['REAL', 'FLOAT, DOUBLE', 'Числа с точкой', '3.14, -0.5'],
            ['TEXT', 'VARCHAR, CHAR', 'Строки любой длины', "'Анна', 'Москва'"],
            ['BLOB', 'BINARY', 'Бинарные данные', 'файлы, изображения'],
            ['NULL', '—', 'Отсутствие значения', 'NULL'],
          ]}
        />
        <TheoryTable
          headers={['Ограничение', 'Что делает', 'Пример']}
          rows={[
            ['PRIMARY KEY', 'Уникальный идентификатор строки', 'id INTEGER PRIMARY KEY'],
            ['NOT NULL', 'Запрещает NULL', 'name TEXT NOT NULL'],
            ['UNIQUE', 'Значение не повторяется', 'email TEXT UNIQUE'],
            ['DEFAULT', 'Значение по умолчанию', 'stock INTEGER DEFAULT 0'],
            ['CHECK', 'Проверка условия', 'CHECK (price >= 0)'],
            ['FOREIGN KEY', 'Ссылка на другую таблицу', 'FOREIGN KEY (user_id) REFERENCES users(id)'],
          ]}
        />
      </section>

      {/* ─── Нормализация ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Нормализация</h2>
        <p className="theory-intro">
          Нормализация — разбиение данных на таблицы так, чтобы избежать дублирования.
        </p>
        <TheoryExample title="Без нормализации — плохо">
          <p>orders: id | user_name | user_city | product | price</p>
          <p>Если Анна переезжает — нужно обновить city во ВСЕХ её заказах.</p>
        </TheoryExample>
        <TheoryExample title="С нормализацией — хорошо">
          <p>users: id | name | city (Анна обновляется в ONE месте)</p>
          <p>orders: id | user_id | product | price (ссылаемся на users.id)</p>
        </TheoryExample>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>1НФ</strong> — каждая ячейка хранит одно атомарное значение, нет повторяющихся групп</li>
          <li className="theory-list-item"><strong>2НФ</strong> — таблица в 1НФ, все неключевые поля зависят от всего первичного ключа</li>
          <li className="theory-list-item"><strong>3НФ</strong> — таблица в 2НФ, нет транзитивных зависимостей (поле не зависит от другого неключевого)</li>
        </ul>
      </section>

      {/* ─── SQL vs NoSQL ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">SQL vs NoSQL</h2>
        <TheoryTable
          headers={['Критерий', 'SQL (реляционные)', 'NoSQL']}
          rows={[
            ['Структура', 'Таблицы со схемой', 'Документы, ключ-значение, граф'],
            ['Схема', 'Строгая (нужно определить заранее)', 'Гибкая (поля разные у каждой записи)'],
            ['Связи', 'JOIN, FOREIGN KEY', 'Вложенные объекты или ссылки'],
            ['Масштабирование', 'Вертикальное (мощнее сервер)', 'Горизонтальное (больше серверов)'],
            ['Запросы', 'SQL — стандарт', 'Своё API у каждой БД'],
            ['Примеры', 'PostgreSQL, MySQL, SQLite', 'MongoDB, Redis, Cassandra'],
            ['Когда', 'Банк, магазин, CRM — строгие связи', 'Кэш, логи, соцсеть — гибкость и скорость'],
          ]}
        />
      </section>

      {/* ─── Итог ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итог трёх дней SQL</h2>
        <TheoryTable
          headers={['День', 'Тема', 'Что изучили']}
          rows={[
            ['17', 'Основы', 'Таблицы, SELECT, WHERE, IN/BETWEEN/LIKE, ORDER BY, LIMIT, DISTINCT'],
            ['18', 'Агрегация и изменение', 'COUNT/SUM/AVG/MAX/MIN, GROUP BY, HAVING, INSERT, UPDATE, DELETE'],
            ['19', 'Связи и продвинутый SQL', 'Ключи, JOIN (INNER/LEFT), NULL, CASE WHEN, Подзапросы, UNION, CREATE TABLE, Нормализация'],
          ]}
        />

        <div style={{ marginTop: '20px' }}>
          <h3 className="theory-heading-3">Полный порядок выполнения SELECT</h3>
          <TheoryCode language="sql" code={`SELECT   [DISTINCT] колонки     -- 6: выбрать колонки
FROM     таблица                  -- 1: из какой таблицы
JOIN     другая ON условие        -- 2: соединить
WHERE    условие_строк            -- 3: фильтр строк
GROUP BY колонка                  -- 4: сгруппировать
HAVING   условие_групп            -- 5: фильтр групп
ORDER BY колонка [ASC|DESC]       -- 7: сортировка
LIMIT    N OFFSET M;              -- 8: ограничение`} />
          <p className="theory-text" style={{ marginTop: '8px' }}>
            Запомни: <strong>SQL не выполняется сверху вниз</strong>. Порядок выполнения: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.
          </p>
        </div>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">SQL — один из самых востребованных навыков в IT. Ты прошёл все основы за три дня. Теперь практикуйся на реальных данных! 📊</p>
      </section>
    </div>
  )
}
