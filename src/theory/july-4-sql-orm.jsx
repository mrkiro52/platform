import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July4SqlOrmTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Базы данных: SQL и ORM</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          Почти любое веб-приложение хранит данные — пользователей, заказы, сообщения. <strong>База данных</strong>
          — это организованное хранилище таких данных, а <strong>SQL</strong> — язык, на котором с ними работают.
        </p>
      </section>

      {/* Реляционная модель */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Реляционная модель данных</h2>
        <p>
          Реляционная база данных хранит данные в <strong>таблицах</strong> — как в Excel: строки (записи) и
          столбцы (поля). Таблицы могут быть связаны между собой через ключи.
        </p>
        <ul className="theory-list">
          <li><strong>Первичный ключ (PRIMARY KEY)</strong> — уникальный идентификатор строки в таблице (обычно <code>id</code>).</li>
          <li><strong>Внешний ключ (FOREIGN KEY)</strong> — поле, ссылающееся на первичный ключ другой таблицы; так строятся связи между таблицами.</li>
          <li><strong>Нормализация</strong> — разбиение данных на связанные таблицы, чтобы избежать дублирования (например, город клиента не повторяется в каждом заказе, а хранится один раз и связывается по ключу).</li>
        </ul>
        <TheoryTable
          headers={['users', '']}
          rows={[
            ['id (PK)', '1'],
            ['name', '"Аня"'],
          ]}
        />
      </section>

      {/* CRUD и базовый синтаксис */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. SQL: CRUD-операции</h2>
        <p>Четыре базовые операции с данными — Create, Read, Update, Delete.</p>
        <TheoryCode language="sql" code={`-- Create: добавить строку
INSERT INTO users (name, age) VALUES ('Аня', 25);

-- Read: получить данные
SELECT name, age FROM users WHERE age > 18;

-- Update: изменить данные
UPDATE users SET age = 26 WHERE name = 'Аня';

-- Delete: удалить строку
DELETE FROM users WHERE id = 1;`} />
      </section>

      {/* SELECT подробнее */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. SELECT: фильтрация, сортировка, группировка</h2>
        <TheoryCode language="sql" code={`SELECT city, COUNT(*) AS total
FROM users
WHERE age >= 18          -- фильтрация строк
GROUP BY city             -- группировка по городу
HAVING COUNT(*) > 10      -- фильтрация уже сгруппированных данных
ORDER BY total DESC       -- сортировка по убыванию
LIMIT 5;                  -- только первые 5 строк`} />
        <TheoryTable
          headers={['Ключевое слово', 'Что делает']}
          rows={[
            ['WHERE', 'фильтрует строки ДО группировки'],
            ['GROUP BY', 'группирует строки с одинаковым значением поля'],
            ['HAVING', 'фильтрует уже сгруппированные результаты'],
            ['ORDER BY', 'сортирует итоговый результат'],
            ['LIMIT', 'ограничивает число возвращаемых строк'],
          ]}
        />
      </section>

      {/* JOIN */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. JOIN — соединение таблиц</h2>
        <p>JOIN позволяет получить данные сразу из нескольких связанных таблиц одним запросом.</p>
        <TheoryCode language="sql" code={`SELECT users.name, orders.total
FROM users
JOIN orders ON orders.user_id = users.id;`} />
        <TheoryTable
          headers={['Тип JOIN', 'Что вернёт']}
          rows={[
            ['INNER JOIN', 'только строки, у которых есть совпадение в обеих таблицах'],
            ['LEFT JOIN', 'все строки левой таблицы + совпадения справа (или NULL, если нет)'],
            ['RIGHT JOIN', 'все строки правой таблицы + совпадения слева'],
          ]}
        />
      </section>

      {/* Индексы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Индексы</h2>
        <p>
          Без индекса поиск строки по условию требует проверить <strong>каждую</strong> строку таблицы
          (полное сканирование, O(n)). <strong>Индекс</strong> — дополнительная структура (обычно
          B-дерево), которая позволяет находить нужные строки намного быстрее, почти как оглавление в книге.
        </p>
        <TheoryCode language="sql" code={`CREATE INDEX idx_users_email ON users(email);`} />
        <TheoryExample title="Цена индексов">
          Индексы ускоряют чтение (SELECT), но замедляют запись (INSERT/UPDATE/DELETE), потому что при каждом
          изменении данных нужно обновлять и индекс. Поэтому индексы создают только на полях, по которым
          реально часто ищут (email, внешние ключи), а не на всех подряд.
        </TheoryExample>
      </section>

      {/* Транзакции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Транзакции и ACID</h2>
        <p>
          <strong>Транзакция</strong> — группа операций, которая выполняется как единое целое: либо
          применяются <strong>все</strong> изменения, либо ни одно. Классический пример — перевод денег:
          списание с одного счёта и зачисление на другой должны произойти оба или ни одно.
        </p>
        <TheoryCode language="sql" code={`BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;  -- если что-то пошло не так — ROLLBACK отменит оба изменения`} />
        <TheoryTable
          headers={['ACID', 'Значение']}
          rows={[
            ['Atomicity (атомарность)', 'транзакция выполняется целиком или не выполняется вовсе'],
            ['Consistency (согласованность)', 'данные остаются в корректном состоянии до и после'],
            ['Isolation (изолированность)', 'параллельные транзакции не мешают друг другу'],
            ['Durability (долговечность)', 'после подтверждения (COMMIT) данные не потеряются даже при сбое'],
          ]}
        />
      </section>

      {/* ORM */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Что такое ORM</h2>
        <p>
          <strong>ORM</strong> (Object-Relational Mapping) — библиотека, которая позволяет работать с базой
          данных через обычные объекты и методы языка программирования, а не через «сырые» строки SQL.
          ORM сама генерирует SQL-запросы под капотом.
        </p>
        <TheoryCode language="python" code={`# Пример на Django ORM (Python)

class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

# Вместо SQL-запроса пишем код на Python:
User.objects.create(name="Аня", age=25)        # INSERT
User.objects.filter(age__gte=18)                # SELECT ... WHERE age >= 18
user = User.objects.get(id=1)
user.age = 26
user.save()                                     # UPDATE
user.delete()                                    # DELETE`} />
        <TheoryTable
          headers={['Плюсы ORM', 'Минусы ORM']}
          rows={[
            ['Меньше кода, быстрее разработка', 'Меньше контроля над точным SQL-запросом'],
            ['Защита от SQL-инъекций из коробки', 'Может генерировать неоптимальные запросы'],
            ['Не нужно менять код при смене СУБД', 'Сложные запросы иногда проще написать на чистом SQL'],
            ['Работа с данными как с объектами языка', 'Дополнительный слой абстракции — нужно понимать, что происходит под капотом'],
          ]}
        />
        <TheoryExample title="Популярные ORM">
          Python: Django ORM, SQLAlchemy. JavaScript/Node.js: Prisma, Sequelize, TypeORM. Java: Hibernate.
          Идея везде одна — таблица описывается как класс, строка — как объект (экземпляр) этого класса.
        </TheoryExample>
      </section>

      {/* SQL vs NoSQL */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. SQL vs NoSQL</h2>
        <TheoryTable
          headers={['', 'SQL (реляционные)', 'NoSQL']}
          rows={[
            ['Примеры', 'PostgreSQL, MySQL', 'MongoDB, Redis'],
            ['Схема данных', 'строгая, задана заранее', 'гибкая, может меняться на лету'],
            ['Связи между данными', 'через JOIN', 'обычно данные хранят вложенными, без JOIN'],
            ['Транзакции ACID', 'полная поддержка', 'частичная или иная модель (BASE)'],
            ['Когда выбрать', 'структурированные данные, важна целостность', 'большие объёмы, быстро меняющаяся структура'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Выводы</h2>
        <ul className="theory-list">
          <li>Реляционная БД хранит данные в связанных таблицах через первичные и внешние ключи.</li>
          <li>SQL — язык CRUD-операций: SELECT/INSERT/UPDATE/DELETE, с фильтрацией (WHERE), группировкой (GROUP BY) и соединением таблиц (JOIN).</li>
          <li>Индексы ускоряют чтение ценой более медленной записи — использовать только там, где реально нужно.</li>
          <li>Транзакции и принцип ACID гарантируют целостность данных при сложных операциях.</li>
          <li>ORM — слой абстракции над SQL: пишешь код на Python/JS вместо сырых SQL-запросов, но важно понимать, что генерируется под капотом.</li>
          <li>Выбор SQL или NoSQL зависит от структуры данных и требований к целостности/масштабируемости.</li>
        </ul>
      </section>
    </div>
  )
}
