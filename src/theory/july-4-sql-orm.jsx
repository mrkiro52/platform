import { TheoryTable, TheoryCode, TheoryExample, DbTable } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
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

export default function July4SqlOrmTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Базы данных: SQL и ORM</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          Почти любое приложение хранит данные — пользователей, товары, заказы, сообщения. Держать их в файлах
          неудобно и ненадёжно, поэтому используют <strong>базы данных</strong> — специальные системы для
          хранения, поиска и изменения структурированных данных. Разберём реляционную модель, язык SQL от
          простых запросов до JOIN и транзакций, а затем — ORM, слой, через который бэкенд обычно и работает с БД.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Видео-лекция: SQL и ORM</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/day4backend.mov" />
      </section>

      {/* Что такое БД и СУБД */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. База данных и СУБД</h2>
        <Term name="База данных (БД)">
          организованное хранилище данных, устроенное так, чтобы данные было удобно и быстро искать, добавлять,
          изменять и удалять.
        </Term>
        <Term name="СУБД (система управления БД)">
          программа, которая управляет базой данных: обрабатывает запросы, обеспечивает целостность, доступ и
          безопасность. Примеры: PostgreSQL, MySQL, SQLite (реляционные); MongoDB, Redis (нереляционные).
        </Term>
        <Term name="SQL (Structured Query Language)">
          язык запросов к реляционным БД. На нём описывают, что нужно сделать с данными (получить, добавить,
          изменить), а СУБД сама решает, как это выполнить эффективно.
        </Term>
      </section>

      {/* Реляционная модель */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Реляционная модель: таблицы, строки, ключи</h2>
        <p>
          Реляционная БД хранит данные в <strong>таблицах</strong> — как в Excel: строки (записи) и столбцы
          (поля с фиксированным типом). Таблицы связаны между собой через ключи.
        </p>
        <DbTable
          name="users"
          columns={['id (PK)', 'name', 'city']}
          rows={[['1', 'Аня', 'Москва'], ['2', 'Ваня', 'Казань']]}
          highlightCols={[0]}
          caption="Таблица users: каждая строка — пользователь, столбец id — первичный ключ (уникальный идентификатор)"
        />
        <Term name="Первичный ключ (PRIMARY KEY)">
          столбец (обычно <code>id</code>), однозначно идентифицирующий строку. Не повторяется и не бывает
          пустым. По нему СУБД мгновенно находит нужную запись.
        </Term>
        <Term name="Внешний ключ (FOREIGN KEY)">
          столбец, ссылающийся на первичный ключ другой таблицы. Так строятся <strong>связи</strong>: в таблице
          заказов поле <code>user_id</code> указывает, какому пользователю принадлежит заказ.
        </Term>
        <Term name="Нормализация">
          разбиение данных на связанные таблицы, чтобы не дублировать информацию. Город пользователя хранится
          один раз в users, а не переписывается в каждый его заказ — это экономит место и исключает
          противоречия (когда в одной строке «Москва», а в другой «москва»).
        </Term>
        <Fig caption="Связь один-ко-многим: одному пользователю (users) соответствует много заказов (orders); связь через внешний ключ user_id">
          <svg viewBox="0 0 560 170" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="40" width="180" height="90" rx="8" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <text x="120" y="60" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">users</text>
            <text x="45" y="85" fill={C.text} fontSize="11">id (PK)</text>
            <text x="45" y="105" fill={C.sub} fontSize="11">name, city</text>

            <rect x="350" y="30" width="190" height="110" rx="8" fill="rgba(32,190,255,0.08)" stroke={C.lime} />
            <text x="445" y="50" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">orders</text>
            <text x="365" y="75" fill={C.text} fontSize="11">id (PK)</text>
            <text x="365" y="95" fill={C.text} fontSize="11">user_id (FK)</text>
            <text x="365" y="115" fill={C.sub} fontSize="11">total, date</text>

            <line x1="210" y1="90" x2="350" y2="90" stroke={C.sub} strokeWidth="1.5" />
            <text x="280" y="82" fill={C.sub} fontSize="10" textAnchor="middle">1 → ∞</text>
          </svg>
        </Fig>
      </section>

      {/* CRUD */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. CRUD: четыре базовые операции</h2>
        <p>Всё, что делают с данными, сводится к четырём операциям: Create, Read, Update, Delete.</p>
        <TheoryCode language="sql" code={`-- CREATE: добавить строку
INSERT INTO users (name, city) VALUES ('Аня', 'Москва');

-- READ: получить данные
SELECT name, city FROM users WHERE city = 'Москва';

-- UPDATE: изменить данные
UPDATE users SET city = 'Казань' WHERE id = 1;

-- DELETE: удалить строку
DELETE FROM users WHERE id = 1;`} />
        <TheoryExample title="Всегда пиши WHERE в UPDATE и DELETE">
          <code>UPDATE users SET city = 'Москва';</code> без WHERE изменит <strong>все</strong> строки в таблице,
          а <code>DELETE FROM users;</code> удалит всех пользователей. Одна из самых частых и болезненных ошибок
          новичков на проде.
        </TheoryExample>
      </section>

      {/* SELECT */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. SELECT: фильтрация, сортировка, группировка</h2>
        <TheoryCode language="sql" code={`SELECT city, COUNT(*) AS total   -- что выбираем (COUNT — агрегат)
FROM users                       -- откуда
WHERE age >= 18                  -- фильтр строк ДО группировки
GROUP BY city                    -- группируем по городу
HAVING COUNT(*) > 10             -- фильтр уже сгруппированных данных
ORDER BY total DESC              -- сортировка результата
LIMIT 5;                         -- только первые 5 строк`} />
        <TheoryTable
          headers={['Ключевое слово', 'Что делает', 'Когда применяется']}
          rows={[
            ['WHERE', 'фильтрует отдельные строки', 'до группировки'],
            ['GROUP BY', 'объединяет строки с одинаковым значением', 'формирует группы'],
            ['HAVING', 'фильтрует группы', 'после группировки'],
            ['ORDER BY', 'сортирует результат', 'в самом конце'],
            ['LIMIT', 'ограничивает число строк', 'в самом конце'],
          ]}
        />
        <Term name="Агрегатные функции">
          вычисляют одно значение по группе строк: <code>COUNT</code> (количество), <code>SUM</code> (сумма),
          <code> AVG</code> (среднее), <code>MIN</code>/<code>MAX</code>. Обычно идут вместе с GROUP BY.
        </Term>
      </section>

      {/* JOIN */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. JOIN — соединение таблиц</h2>
        <p>
          Данные разложены по связанным таблицам, а получить их часто нужно вместе. <strong>JOIN</strong>
          соединяет строки из нескольких таблиц по условию (обычно внешний ключ = первичный ключ).
        </p>
        <TheoryCode language="sql" code={`SELECT users.name, orders.total
FROM users
JOIN orders ON orders.user_id = users.id;`} />
        <TheoryTable
          headers={['Тип JOIN', 'Что вернёт']}
          rows={[
            ['INNER JOIN', 'только строки с совпадением в обеих таблицах'],
            ['LEFT JOIN', 'все строки левой таблицы + совпадения справа (или NULL)'],
            ['RIGHT JOIN', 'все строки правой таблицы + совпадения слева'],
            ['FULL JOIN', 'все строки обеих таблиц'],
          ]}
        />
        <Fig caption="Виды JOIN на диаграммах: закрашена та область, которая попадёт в результат">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[
              { x: 70, label: 'INNER', both: true, left: false, right: false },
              { x: 250, label: 'LEFT', both: true, left: true, right: false },
              { x: 430, label: 'RIGHT', both: true, left: false, right: true },
            ].map((j, i) => (
              <g key={i}>
                <text x={j.x} y="20" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">{j.label}</text>
                <clipPath id={`cl${i}`}><circle cx={j.x-18} cy="70" r="34" /></clipPath>
                <circle cx={j.x-18} cy="70" r="34" fill={j.left ? 'rgba(32,190,255,0.25)' : 'none'} stroke={C.lime} />
                <circle cx={j.x+18} cy="70" r="34" fill={j.right ? 'rgba(129,140,248,0.3)' : 'none'} stroke="#818cf8" />
                {j.both && <circle cx={j.x+18} cy="70" r="34" fill="rgba(32,190,255,0.3)" stroke="none" clipPath={`url(#cl${i})`} />}
                <text x={j.x-30} y="120" fill={C.sub} fontSize="10" textAnchor="middle">A</text>
                <text x={j.x+30} y="120" fill={C.sub} fontSize="10" textAnchor="middle">B</text>
              </g>
            ))}
          </svg>
        </Fig>
      </section>

      {/* Индексы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Индексы</h2>
        <p>
          Без индекса поиск строки по условию требует проверить <strong>каждую</strong> строку таблицы
          (полное сканирование, O(n) — на миллионах строк это очень медленно).
        </p>
        <Term name="Индекс">
          дополнительная структура данных (обычно B-дерево), которая хранит значения выбранного столбца в
          отсортированном виде со ссылками на строки. Поиск по индексу — как поиск в оглавлении книги: O(log n)
          вместо O(n).
        </Term>
        <TheoryCode language="sql" code={`CREATE INDEX idx_users_email ON users(email);`} />
        <TheoryExample title="Цена индексов">
          Индексы ускоряют чтение (SELECT), но <strong>замедляют запись</strong> (INSERT/UPDATE/DELETE), потому
          что при каждом изменении данных нужно обновить и индекс. Поэтому их создают точечно — на полях, по
          которым реально часто ищут (email, внешние ключи), а не на всех подряд.
        </TheoryExample>
      </section>

      {/* Транзакции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Транзакции и ACID</h2>
        <Term name="Транзакция">
          группа операций, выполняемая как единое целое: либо применяются <strong>все</strong> изменения
          (COMMIT), либо <strong>ни одно</strong> (ROLLBACK). Классика — перевод денег: списание с одного счёта
          и зачисление на другой должны произойти оба или ни одно, иначе деньги «пропадут».
        </Term>
        <TheoryCode language="sql" code={`BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;   -- зафиксировать. Если между строк ошибка — ROLLBACK отменит обе`} />
        <TheoryTable
          headers={['ACID', 'Гарантия']}
          rows={[
            ['Atomicity (атомарность)', 'транзакция целиком или не выполняется вовсе'],
            ['Consistency (согласованность)', 'данные остаются корректными до и после'],
            ['Isolation (изолированность)', 'параллельные транзакции не мешают друг другу'],
            ['Durability (долговечность)', 'после COMMIT данные не потеряются даже при сбое питания'],
          ]}
        />
      </section>

      {/* ORM */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. ORM — работа с БД через объекты</h2>
        <Term name="ORM (Object-Relational Mapping)">
          библиотека, которая связывает таблицы БД с классами языка программирования: таблица → класс, строка →
          объект (экземпляр), столбец → атрибут. Ты пишешь код на Python/JS, а ORM сама генерирует SQL под
          капотом.
        </Term>
        <Fig caption="ORM отображает мир таблиц БД на мир объектов языка: строка таблицы становится объектом класса">
          <svg viewBox="0 0 560 130" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="200" height="80" rx="8" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <text x="130" y="50" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">Таблица users</text>
            <text x="45" y="72" fill={C.sub} fontSize="11">1 | Аня | Москва</text>
            <text x="45" y="92" fill={C.sub} fontSize="11">2 | Ваня | Казань</text>

            <line x1="230" y1="70" x2="330" y2="70" stroke={C.lime} strokeWidth="2" markerEnd="url(#o1)" />
            <text x="280" y="60" fill={C.lime} fontSize="10" textAnchor="middle">ORM</text>

            <rect x="330" y="30" width="200" height="80" rx="8" fill="rgba(32,190,255,0.08)" stroke={C.lime} />
            <text x="430" y="50" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">Объекты User</text>
            <text x="345" y="72" fill={C.sub} fontSize="11">user.name = "Аня"</text>
            <text x="345" y="92" fill={C.sub} fontSize="11">user.city = "Москва"</text>
            <defs><marker id="o1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker></defs>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`# Пример на Django ORM (Python)
class User(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

# Вместо SQL пишем код на Python:
User.objects.create(name="Аня", city="Москва")   # INSERT
User.objects.filter(city="Москва")                # SELECT ... WHERE city='Москва'
user = User.objects.get(id=1)                     # одна строка
user.city = "Казань"
user.save()                                        # UPDATE
user.delete()                                      # DELETE`} />
        <TheoryTable
          headers={['Плюсы ORM', 'Минусы ORM']}
          rows={[
            ['Меньше кода, быстрее разработка', 'Меньше контроля над точным SQL'],
            ['Защита от SQL-инъекций из коробки', 'Может генерировать неоптимальные запросы'],
            ['Легко сменить СУБД, не переписывая код', 'Проблема N+1 запросов при невнимательности'],
            ['Данные — как объекты языка', 'Нужно понимать, какой SQL генерируется под капотом'],
          ]}
        />
        <TheoryExample title="Популярные ORM">
          Python: Django ORM, SQLAlchemy. JavaScript/Node.js: Prisma, Sequelize, TypeORM. Java: Hibernate.
          Идея везде одна — писать бизнес-логику объектами, а не строками SQL.
        </TheoryExample>
      </section>

      {/* SQL-инъекции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Безопасность: SQL-инъекции</h2>
        <p>
          Если подставлять пользовательский ввод прямо в текст SQL-запроса, злоумышленник может «дописать» свой
          SQL и, например, обойти авторизацию или удалить таблицу.
        </p>
        <TheoryCode language="python" code={`# ОПАСНО: ввод склеивается со строкой запроса
query = "SELECT * FROM users WHERE name = '" + user_input + "'"
# Если user_input = "' OR '1'='1", условие станет всегда истинным!

# БЕЗОПАСНО: параметризованный запрос — ввод передаётся отдельно
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))`} />
        <TheoryExample title="ORM защищает автоматически">
          ORM по умолчанию использует параметризованные запросы, поэтому при работе через ORM классические
          SQL-инъекции практически исключены — ещё один аргумент в его пользу.
        </TheoryExample>
      </section>

      {/* SQL vs NoSQL */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. SQL vs NoSQL</h2>
        <TheoryTable
          headers={['', 'SQL (реляционные)', 'NoSQL']}
          rows={[
            ['Примеры', 'PostgreSQL, MySQL', 'MongoDB, Redis'],
            ['Схема', 'строгая, задана заранее', 'гибкая, меняется на лету'],
            ['Связи', 'через JOIN', 'обычно данные хранят вложенными'],
            ['Транзакции ACID', 'полная поддержка', 'частичная / модель BASE'],
            ['Когда выбрать', 'структурированные данные, важна целостность', 'большие объёмы, гибкая структура'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Выводы</h2>
        <ul className="theory-list">
          <li>Реляционная БД хранит данные в связанных таблицах; связи строятся через первичные и внешние ключи, нормализация убирает дублирование.</li>
          <li>SQL — язык CRUD: SELECT/INSERT/UPDATE/DELETE; в SELECT работают WHERE, GROUP BY, HAVING, ORDER BY и агрегаты.</li>
          <li>JOIN соединяет таблицы; INNER — только совпадения, LEFT — все строки левой таблицы.</li>
          <li>Индексы ускоряют чтение ценой более медленной записи — ставить точечно.</li>
          <li>Транзакции и ACID гарантируют целостность при сложных операциях (либо всё, либо ничего).</li>
          <li>ORM отображает таблицы на объекты, генерирует SQL под капотом, защищает от инъекций; важно понимать, что происходит внутри.</li>
          <li>Выбор SQL или NoSQL зависит от структуры данных и требований к целостности и масштабируемости.</li>
        </ul>
      </section>
    </div>
  )
}
