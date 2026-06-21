import { useEffect } from 'react'
import SelfCheck from '../../components/SelfCheck'

/* ─── Shared UI ─── */
const Code = ({ code, lang = 'sql' }) => {
  const commentPrefix = lang === 'sql' ? '--' : '#'
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">{lang}</div>
      <pre className="theory-code">
        <code>
          {lines.map((line, i) => {
            const idx = line.indexOf(commentPrefix)
            if (idx === -1) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            const before = line.slice(0, idx)
            const sq = (before.match(/'/g) || []).length
            const dq = (before.match(/"/g) || []).length
            if (sq % 2 !== 0 || dq % 2 !== 0) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            return (
              <span key={i}>
                <span style={{ color: 'var(--text-primary)' }}>{before}</span>
                <span style={{ color: '#6b7280' }}>{line.slice(idx)}</span>
                {i < lines.length - 1 ? '\n' : ''}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

const Note = ({ children }) => (
  <div style={{ background: 'rgba(200,255,0,0.05)', border: '1px solid rgba(200,255,0,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>{children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>
    <span style={{ color: '#f87171', fontWeight: 700, marginRight: 6 }}>⚠️</span>{children}
  </div>
)

const SectionTitle = ({ id, children }) => (
  <h2 id={id} style={{ color: 'var(--text-primary)', fontSize: 'clamp(17px, 3vw, 21px)', fontWeight: 700, margin: '44px 0 14px', paddingTop: 8, borderBottom: '1px solid var(--border-color)', paddingBottom: 10, scrollMarginTop: 80 }}>{children}</h2>
)

const SubTitle = ({ id, children }) => (
  <h3 id={id} style={{ color: 'var(--text-primary)', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 600, margin: '26px 0 10px', scrollMarginTop: 80 }}>{children}</h3>
)

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>{item}</li>)}
  </ul>
)

/* ─── Data table with highlight ─── */
const T = ({ name, cols, rows, hRows = [], hCols = [], caption }) => (
  <div style={{ margin: '18px 0' }}>
    {name && (
      <div style={{ display: 'inline-block', background: 'var(--accent-lime)', color: '#0a0a14', fontWeight: 700, fontSize: 12, padding: '3px 12px', borderRadius: '6px 6px 0 0', fontFamily: 'monospace' }}>{name}</div>
    )}
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: name ? '0 8px 8px 8px' : 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 'max-content' }}>
        <thead>
          <tr>
            {cols.map((c, j) => (
              <th key={j} style={{ padding: '8px 14px', textAlign: 'left', whiteSpace: 'nowrap', background: hCols.includes(j) ? 'rgba(200,255,0,0.18)' : 'var(--bg-secondary)', color: hCols.includes(j) ? 'var(--accent-lime)' : 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', fontFamily: 'monospace', fontWeight: 700 }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: hRows.includes(i) ? 'rgba(200,255,0,0.09)' : 'transparent' }}>
              {row.map((cell, j) => (
                <td key={j} style={{ padding: '7px 14px', borderBottom: '1px solid var(--border-color)', color: (hCols.includes(j) || hRows.includes(i)) ? 'var(--text-primary)' : 'var(--text-secondary)', whiteSpace: 'nowrap', fontFamily: typeof cell === 'number' ? 'monospace' : 'inherit' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {caption && <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginTop: 6, fontStyle: 'italic' }}>{caption}</div>}
  </div>
)

/* ─── Result box ─── */
const Result = ({ label = 'Результат запроса', children }) => (
  <div style={{ margin: '6px 0 20px' }}>
    <div style={{ fontSize: 11, color: 'var(--text-tertiary)', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>{label}</div>
    {children}
  </div>
)

/* ─── Method table ─── */
const MT = ({ rows }) => (
  <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>{['Команда / оператор', 'Что делает', 'Пример'].map((h, i) => (
          <th key={i} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', fontWeight: 700 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map(([cmd, desc, ex], i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--accent-lime)', whiteSpace: 'nowrap' }}>{cmd}</td>
            <td style={{ padding: '7px 14px', color: 'var(--text-secondary)' }}>{desc}</td>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap' }}>{ex}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* ─── Comparison table ─── */
const CT = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--bg-secondary)', color: i === 0 ? 'var(--text-secondary)' : 'var(--accent-lime)', borderBottom: '2px solid var(--border-color)', fontWeight: 700 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '7px 14px', color: j === 0 ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* ─── TOC ─── */
const TOC_ITEMS = [
  { id: 'intro',      label: '1. Что такое БД и SQL' },
  { id: 'create',     label: '2. CREATE TABLE' },
  { id: 'insert',     label: '3. INSERT — добавление данных' },
  { id: 'select',     label: '4. SELECT — выборка' },
  { id: 'where',      label: '5. WHERE — фильтрация' },
  { id: 'orderby',    label: '6. ORDER BY, LIMIT, DISTINCT' },
  { id: 'aggregate',  label: '7. Агрегатные функции' },
  { id: 'groupby',    label: '8. GROUP BY и HAVING' },
  { id: 'update',     label: '9. UPDATE и DELETE' },
  { id: 'joins',      label: '10. JOIN — соединение таблиц' },
  { id: 'null',       label: '11. NULL и COALESCE' },
  { id: 'casewhen',   label: '12. CASE WHEN' },
  { id: 'subquery',   label: '13. Подзапросы' },
  { id: 'execorder',  label: '14. Порядок выполнения' },
  { id: 'databases',  label: '15. Виды баз данных' },
  { id: 'cheatsheet', label: '16. Шпаргалка' },
]

/* ─── Sample data (used throughout) ─── */
const USERS = {
  cols: ['id', 'name', 'age', 'city', 'email'],
  rows: [
    [1, 'Анна',   25, 'Москва',  'anna@mail.ru'],
    [2, 'Борис',  31, 'Казань',  'boris@ya.ru'],
    [3, 'Вера',   19, 'Москва',  'vera@gmail.com'],
    [4, 'Глеб',   42, 'Сочи',    'gleb@mail.ru'],
    [5, 'Дина',   28, 'Казань',  'dina@ya.ru'],
    [6, 'Егор',   35, 'Москва',  'egor@mail.ru'],
  ],
}

const ORDERS = {
  cols: ['id', 'user_id', 'product', 'price', 'status'],
  rows: [
    [1, 1, 'Книга',      500,   'done'],
    [2, 1, 'Наушники',   3000,  'done'],
    [3, 2, 'Мышка',      1200,  'pending'],
    [4, 3, 'Клавиатура', 2500,  'done'],
    [5, 5, 'Монитор',    15000, 'done'],
    [6, 6, 'Веб-камера', 4500,  'pending'],
  ],
}

/* ═══════════════════════════════════════════════════ */
export default function SqlLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>

      {/* Back */}
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        ← Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)', borderRadius: 8, padding: '6px 14px', color: '#c084fc', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>DATABASE</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>Junior → Middle</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          SQL — полный ликбез
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          От создания таблиц до подзапросов и оконных функций. С визуальными примерами данных,
          подсветкой результатов и разбором различий между популярными СУБД.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['SQL:2016', 'SQLite / PostgreSQL / MySQL', '~50 мин'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 44 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px 24px' }}>
          {TOC_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '4px 0', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{item.label}</button>
          ))}
        </div>
      </div>

      {/* ─── 1. Введение ─── */}
      <SectionTitle id="intro">1. Что такое БД и SQL</SectionTitle>
      <P><strong style={{ color: 'var(--text-primary)' }}>База данных (БД)</strong> — организованное хранилище данных, которым управляет специальная программа — СУБД (система управления базами данных). Почти каждое приложение хранит данные в БД: пользователи, заказы, посты, настройки.</P>
      <P><strong style={{ color: 'var(--text-primary)' }}>SQL (Structured Query Language)</strong> — язык запросов к реляционным базам данных. На нём описывают <em>что</em> нужно получить, а не <em>как</em> это найти.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '20px 0' }}>
        {[
          { label: 'DDL', name: 'Data Definition Language', cmds: 'CREATE, ALTER, DROP', desc: 'Создание и изменение структуры' },
          { label: 'DML', name: 'Data Manipulation Language', cmds: 'INSERT, UPDATE, DELETE', desc: 'Изменение данных' },
          { label: 'DQL', name: 'Data Query Language', cmds: 'SELECT', desc: 'Выборка данных' },
          { label: 'DCL', name: 'Data Control Language', cmds: 'GRANT, REVOKE', desc: 'Управление правами' },
        ].map(g => (
          <div key={g.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-lime)', fontSize: 15, marginBottom: 4 }}>{g.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>{g.name}</div>
            <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--text-primary)', marginBottom: 4 }}>{g.cmds}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{g.desc}</div>
          </div>
        ))}
      </div>

      <P>Реляционная БД хранит данные в <strong style={{ color: 'var(--text-primary)' }}>таблицах</strong> — строки и столбцы, как в Excel. Таблицы могут быть связаны между собой. Вот пример двух таблиц, которые мы будем использовать на протяжении всего ликбеза:</P>

      <T name="users" cols={USERS.cols} rows={USERS.rows} caption="Таблица пользователей — 6 записей, 5 полей" />
      <T name="orders" cols={ORDERS.cols} rows={ORDERS.rows} caption="Таблица заказов — 6 записей, каждый заказ привязан к пользователю через user_id" />

      <SelfCheck questions={[
        { q: 'Чем база данных отличается от обычного файла Excel?', a: 'БД рассчитана на одновременную работу многих пользователей, гарантирует целостность данных через ограничения и связи, и позволяет делать сложные запросы на языке SQL. Excel хорош для небольших таблиц, но не масштабируется и не обеспечивает надёжность транзакций.' },
        { q: 'Что такое SQL и для чего он нужен?', a: 'SQL (Structured Query Language) — язык запросов к реляционным базам данных. С его помощью создают таблицы, добавляют, изменяют, удаляют и выбирают данные. Это стандарт, понятный большинству СУБД: PostgreSQL, MySQL, SQLite, SQL Server.' },
        { q: 'Что такое реляционная модель данных?', a: 'Данные хранятся в таблицах (отношениях), состоящих из строк (записей) и столбцов (полей). Таблицы связаны между собой через ключи. Такая модель позволяет избегать дублирования и описывать связи между сущностями (пользователи ↔ заказы).' },
      ]} />

      {/* ─── 2. CREATE TABLE ─── */}
      <SectionTitle id="create">2. CREATE TABLE — создание таблиц</SectionTitle>
      <P>Прежде чем добавлять данные, нужно создать таблицу и описать её столбцы с типами.</P>

      <Code code={`CREATE TABLE users (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    TEXT    NOT NULL,
    age     INTEGER CHECK (age >= 0),
    city    TEXT    DEFAULT 'Не указан',
    email   TEXT    UNIQUE NOT NULL
);

CREATE TABLE orders (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id  INTEGER NOT NULL,
    product  TEXT    NOT NULL,
    price    INTEGER CHECK (price > 0),
    status   TEXT    DEFAULT 'pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);`} />

      <SubTitle>Типы данных</SubTitle>
      <CT
        headers={['Тип', 'SQLite', 'PostgreSQL', 'MySQL', 'Что хранит']}
        rows={[
          ['Целые числа',   'INTEGER',       'INTEGER / BIGINT',     'INT / BIGINT',       'id, возраст, количество'],
          ['Числа с точкой','REAL',           'FLOAT / NUMERIC',     'FLOAT / DECIMAL',    'цены, координаты'],
          ['Текст',         'TEXT',           'VARCHAR(n) / TEXT',   'VARCHAR(n) / TEXT',  'имена, описания'],
          ['Булево',        'INTEGER (0/1)',  'BOOLEAN',             'TINYINT(1)',          'флаги, статусы'],
          ['Дата и время',  'TEXT / INTEGER', 'TIMESTAMP / DATE',   'DATETIME',           'созданы, обновлены'],
          ['Бинарные',      'BLOB',           'BYTEA',               'BLOB',               'файлы, картинки'],
        ]}
      />

      <SubTitle>Ограничения (Constraints)</SubTitle>
      <MT rows={[
        ['PRIMARY KEY',  'Уникальный идентификатор строки, не NULL',        'id INTEGER PRIMARY KEY'],
        ['NOT NULL',     'Значение обязательно, не может быть NULL',        'name TEXT NOT NULL'],
        ['UNIQUE',       'Значение не повторяется в таблице',               'email TEXT UNIQUE'],
        ['DEFAULT',      'Значение по умолчанию если не указано',          "status TEXT DEFAULT 'pending'"],
        ['CHECK',        'Проверка условия при вставке/обновлении',        'CHECK (price > 0)'],
        ['FOREIGN KEY',  'Ссылка на первичный ключ другой таблицы',        'FOREIGN KEY (uid) REFERENCES users(id)'],
        ['AUTOINCREMENT','Автоматическое увеличение числа (SQLite/MySQL)', 'id INTEGER PRIMARY KEY AUTOINCREMENT'],
      ]} />

      <Code code={`-- Изменить таблицу после создания
ALTER TABLE users ADD COLUMN phone TEXT;       -- добавить столбец
ALTER TABLE users RENAME COLUMN phone TO tel;  -- переименовать (SQLite 3.25+)

-- Удалить таблицу полностью (осторожно!)
DROP TABLE IF EXISTS orders;

-- Удалить все данные, сохранив структуру
DELETE FROM users;   -- медленно, логируется
TRUNCATE TABLE users; -- быстро (не в SQLite)`} />

      <SelfCheck questions={[
        { q: 'Зачем при создании таблицы указывают типы данных?', a: 'Тип задаёт, какие значения можно хранить в столбце (INTEGER — числа, TEXT — строки, REAL — дробные, DATE — даты). Это экономит память, ускоряет запросы и защищает от ошибок — нельзя случайно записать текст туда, где ожидается число.' },
        { q: 'Что делает ограничение PRIMARY KEY?', a: 'Делает столбец уникальным идентификатором строки: значения не могут повторяться и не могут быть NULL. По первичному ключу СУБД быстро находит конкретную запись и связывает таблицы через внешние ключи.' },
        { q: 'Чем NOT NULL отличается от DEFAULT?', a: 'NOT NULL запрещает оставлять поле пустым — вставка без значения вызовет ошибку. DEFAULT задаёт значение по умолчанию, которое подставится автоматически, если значение не указано. Их часто используют вместе.' },
      ]} />

      {/* ─── 3. INSERT ─── */}
      <SectionTitle id="insert">3. INSERT — добавление данных</SectionTitle>
      <Code code={`-- Вставить одну строку
INSERT INTO users (name, age, city, email)
VALUES ('Анна', 25, 'Москва', 'anna@mail.ru');

-- Вставить несколько строк за один запрос (эффективнее)
INSERT INTO users (name, age, city, email) VALUES
('Борис',  31, 'Казань', 'boris@ya.ru'),
('Вера',   19, 'Москва', 'vera@gmail.com'),
('Глеб',   42, 'Сочи',   'gleb@mail.ru');

-- Вставить данные из другой таблицы
INSERT INTO users_archive (name, email)
SELECT name, email FROM users WHERE age > 40;`} />

      <T name="users" cols={USERS.cols} rows={USERS.rows} hRows={[0, 1, 2, 3]} caption="Первые 4 строки — только что вставленные данные" />

      <SelfCheck questions={[
        { q: 'Как добавить сразу несколько строк одним INSERT?', a: "Перечислить наборы значений через запятую: INSERT INTO users (name, age) VALUES ('Аня', 25), ('Боб', 30); Это быстрее и читабельнее, чем несколько отдельных INSERT." },
        { q: 'Обязательно ли перечислять имена столбцов в INSERT?', a: 'Не обязательно, если передаёшь значения для всех столбцов по порядку их объявления. Но указывать столбцы явно — хорошая практика: запрос не сломается при изменении структуры таблицы и его легче читать.' },
        { q: 'Что произойдёт при вставке дубля в столбец с PRIMARY KEY?', a: 'СУБД вернёт ошибку нарушения уникальности и строка не будет добавлена. Первичный ключ не допускает повторяющихся значений — это гарантия уникальности каждой записи.' },
      ]} />

      {/* ─── 4. SELECT ─── */}
      <SectionTitle id="select">4. SELECT — выборка данных</SectionTitle>
      <P>SELECT — самая используемая команда SQL. Описывает <em>что</em> и <em>из какой таблицы</em> выбрать.</P>

      <Code code={`SELECT * FROM users;                        -- все столбцы
SELECT name, age FROM users;               -- конкретные столбцы
SELECT name AS "Имя", age AS "Возраст"    -- псевдонимы колонок
FROM users;`} />

      <Result>
        <T cols={['name', 'age']} rows={[['Анна',25],['Борис',31],['Вера',19],['Глеб',42],['Дина',28],['Егор',35]]} hCols={[0,1]} />
      </Result>

      <Code code={`-- Вычисляемые колонки
SELECT
    name,
    age,
    age * 365 AS days_lived,          -- арифметика
    UPPER(name) AS name_upper,        -- функция строк
    ROUND(price * 1.2, 2) AS price_with_vat
FROM users;`} />

      <SelfCheck questions={[
        { q: 'Чем SELECT * отличается от перечисления столбцов?', a: 'SELECT * возвращает все столбцы — удобно для быстрой проверки, но в реальном коде лучше перечислять нужные столбцы: запрос быстрее, передаёт меньше данных и не ломается при изменении структуры таблицы.' },
        { q: 'Как задать псевдоним (алиас) для столбца?', a: 'Через ключевое слово AS: SELECT price * 12 AS annual_price. Алиас задаёт удобное имя для столбца в результате. Слово AS можно опустить: SELECT price * 12 annual_price.' },
        { q: 'Можно ли в SELECT использовать вычисления?', a: 'Да. Можно выполнять арифметику (price * 1.2), конкатенацию строк, вызывать функции (UPPER(name), ROUND(x)). Результат вычисления становится отдельным столбцом в выборке.' },
      ]} />

      {/* ─── 5. WHERE ─── */}
      <SectionTitle id="where">5. WHERE — фильтрация строк</SectionTitle>
      <P>WHERE отбирает только те строки, которые удовлетворяют условию. Остальные отбрасываются.</P>

      <Code code={`-- Сравнение
SELECT * FROM users WHERE age > 25;
SELECT * FROM users WHERE city = 'Москва';
SELECT * FROM users WHERE age != 19;

-- AND, OR, NOT
SELECT * FROM users WHERE age > 25 AND city = 'Казань';
SELECT * FROM users WHERE city = 'Москва' OR city = 'Сочи';
SELECT * FROM users WHERE NOT city = 'Казань';`} />

      <Result label="WHERE age > 25 AND city = 'Казань'">
        <T cols={USERS.cols} rows={USERS.rows} hRows={[1, 4]} caption="Борис (31, Казань) и Дина (28, Казань)" />
      </Result>

      <Code code={`-- IN — вхождение в список
SELECT * FROM users WHERE city IN ('Москва', 'Сочи');

-- NOT IN — исключение
SELECT * FROM users WHERE city NOT IN ('Казань');

-- BETWEEN — диапазон (включительно)
SELECT * FROM users WHERE age BETWEEN 25 AND 35;

-- LIKE — поиск по шаблону
SELECT * FROM users WHERE name LIKE 'А%';   -- начинается на А
SELECT * FROM users WHERE name LIKE '%а';   -- заканчивается на а
SELECT * FROM users WHERE email LIKE '%@ya.ru'; -- почта на ya.ru
SELECT * FROM users WHERE name LIKE 'Б_р_с'; -- _ — ровно 1 символ`} />

      <Result label="WHERE city IN ('Москва', 'Сочи')">
        <T cols={USERS.cols} rows={USERS.rows} hRows={[0, 2, 3, 5]} caption="Анна, Вера, Глеб, Егор — из Москвы или Сочи" />
      </Result>

      <Result label="WHERE age BETWEEN 25 AND 35">
        <T cols={USERS.cols} rows={USERS.rows} hRows={[0, 1, 4, 5]} caption="age >= 25 И age <= 35: Анна(25), Борис(31), Дина(28), Егор(35)" />
      </Result>

      <Note>LIKE чувствителен к регистру в большинстве СУБД. В PostgreSQL используй ILIKE для регистронезависимого поиска.</Note>

      <SelfCheck questions={[
        { q: 'Как отфильтровать строки по нескольким условиям одновременно?', a: "Через логические операторы AND и OR: WHERE age >= 18 AND city = 'Москва'. AND требует выполнения обоих условий, OR — хотя бы одного. Скобками управляют приоритетом." },
        { q: 'Чем оператор IN удобнее цепочки OR?', a: "IN короче и читабельнее: WHERE city IN ('Москва', 'Питер', 'Казань') заменяет три условия через OR. Аналогично NOT IN исключает перечисленные значения." },
        { q: 'Что делает оператор LIKE и подстановки % и _?', a: "LIKE ищет по шаблону строк. % заменяет любое количество символов ('А%' — всё, что начинается на А), _ заменяет ровно один символ. Используется для поиска по части текста." },
      ]} />

      {/* ─── 6. ORDER BY ─── */}
      <SectionTitle id="orderby">6. ORDER BY, LIMIT, DISTINCT</SectionTitle>

      <Code code={`-- Сортировка
SELECT * FROM users ORDER BY age ASC;    -- по возрастанию (по умолчанию)
SELECT * FROM users ORDER BY age DESC;   -- по убыванию

-- По нескольким полям
SELECT * FROM users ORDER BY city ASC, age DESC;  -- сначала город, потом возраст

-- Ограничение числа строк
SELECT * FROM users ORDER BY age DESC LIMIT 3;    -- топ-3 старших
SELECT * FROM users LIMIT 10 OFFSET 20;           -- страница 3 (по 10 записей)

-- Уникальные значения
SELECT DISTINCT city FROM users;         -- список уникальных городов
SELECT DISTINCT city, age FROM users;    -- уникальные пары`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, margin: '16px 0' }}>
        <Result label="ORDER BY age DESC LIMIT 3">
          <T cols={['name', 'age']} rows={[['Глеб',42],['Егор',35],['Борис',31]]} hCols={[1]} />
        </Result>
        <Result label="SELECT DISTINCT city FROM users">
          <T cols={['city']} rows={[['Москва'],['Казань'],['Сочи']]} hRows={[0,1,2]} />
        </Result>
      </div>

      <SelfCheck questions={[
        { q: 'Как отсортировать результат по убыванию?', a: 'Добавить DESC после столбца: ORDER BY price DESC. По умолчанию сортировка идёт по возрастанию (ASC). Можно сортировать по нескольким столбцам: ORDER BY city ASC, age DESC.' },
        { q: 'Для чего нужен LIMIT?', a: 'LIMIT ограничивает количество возвращаемых строк: ORDER BY price DESC LIMIT 5 даст 5 самых дорогих товаров. Вместе с OFFSET используется для постраничного вывода (пагинации).' },
        { q: 'Что делает DISTINCT?', a: 'Убирает дубликаты из результата, оставляя только уникальные значения: SELECT DISTINCT city FROM users вернёт список городов без повторов. Применяется ко всей комбинации выбранных столбцов.' },
      ]} />

      {/* ─── 7. Агрегатные функции ─── */}
      <SectionTitle id="aggregate">7. Агрегатные функции</SectionTitle>
      <P>Агрегатные функции считают что-то по набору строк и возвращают одно значение.</P>

      <MT rows={[
        ['COUNT(*)',    'Количество строк',                  'SELECT COUNT(*) FROM users'],
        ['COUNT(col)', 'Количество строк где col не NULL',  'SELECT COUNT(email) FROM users'],
        ['SUM(col)',   'Сумма значений',                    'SELECT SUM(price) FROM orders'],
        ['AVG(col)',   'Среднее значение',                  'SELECT AVG(age) FROM users'],
        ['MAX(col)',   'Максимум',                           'SELECT MAX(age) FROM users'],
        ['MIN(col)',   'Минимум',                            'SELECT MIN(price) FROM orders'],
      ]} />

      <Code code={`SELECT
    COUNT(*)        AS total_users,   -- 6
    AVG(age)        AS avg_age,       -- 30.0
    MAX(age)        AS max_age,       -- 42
    MIN(age)        AS min_age,       -- 19
    SUM(age)        AS sum_ages       -- 180
FROM users;`} />

      <Result>
        <T cols={['total_users', 'avg_age', 'max_age', 'min_age', 'sum_ages']} rows={[[6, 30.0, 42, 19, 180]]} hCols={[0,1,2,3,4]} />
      </Result>

      <SelfCheck questions={[
        { q: 'Какие основные агрегатные функции есть в SQL?', a: 'COUNT — количество строк, SUM — сумма, AVG — среднее, MIN — минимум, MAX — максимум. Они сворачивают множество строк в одно итоговое значение.' },
        { q: 'Чем COUNT(*) отличается от COUNT(column)?', a: 'COUNT(*) считает все строки, включая те, где есть NULL. COUNT(column) считает только строки, где этот столбец НЕ NULL. Для подсчёта заполненных значений используют второй вариант.' },
        { q: 'Игнорируют ли агрегатные функции значения NULL?', a: 'Да, все агрегаты кроме COUNT(*) пропускают NULL. Например, AVG считает среднее только по заполненным значениям, а не делит на общее число строк. Это важно учитывать при расчётах.' },
      ]} />

      {/* ─── 8. GROUP BY ─── */}
      <SectionTitle id="groupby">8. GROUP BY и HAVING</SectionTitle>
      <P>GROUP BY разбивает строки на группы по одинаковому значению, и агрегатная функция применяется к каждой группе отдельно.</P>

      <Code code={`-- Сколько пользователей в каждом городе
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
ORDER BY cnt DESC;`} />

      <Result>
        <T cols={['city', 'cnt']} rows={[['Москва',3],['Казань',2],['Сочи',1]]} hCols={[1]} caption="Москва: Анна+Вера+Егор, Казань: Борис+Дина, Сочи: Глеб" />
      </Result>

      <Code code={`-- Несколько агрегатов сразу
SELECT city,
    COUNT(*)    AS users,
    AVG(age)    AS avg_age,
    MAX(age)    AS max_age
FROM users
GROUP BY city;`} />

      <Result>
        <T cols={['city','users','avg_age','max_age']} rows={[['Казань',2,29.5,31],['Москва',3,26.3,35],['Сочи',1,42.0,42]]} hCols={[1,2,3]} />
      </Result>

      <SubTitle>HAVING — фильтрация групп</SubTitle>
      <P>WHERE фильтрует строки ДО группировки. HAVING фильтрует группы ПОСЛЕ GROUP BY.</P>

      <Code code={`-- Города с более чем 1 пользователем
SELECT city, COUNT(*) AS cnt
FROM users
GROUP BY city
HAVING COUNT(*) > 1;

-- Города со средним возрастом меньше 30
SELECT city, AVG(age) AS avg_age
FROM users
GROUP BY city
HAVING AVG(age) < 30;`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '16px 0' }}>
        <Result label="HAVING COUNT(*) > 1">
          <T cols={['city','cnt']} rows={[['Москва',3],['Казань',2]]} hRows={[0,1]} caption="Сочи(1) отфильтрован" />
        </Result>
        <Result label="HAVING AVG(age) < 30">
          <T cols={['city','avg_age']} rows={[['Казань',29.5],['Москва',26.3]]} hRows={[0,1]} caption="Сочи(42) отфильтрован" />
        </Result>
      </div>

      <Warn>Нельзя писать WHERE после GROUP BY — используй HAVING. Нельзя использовать алиас из SELECT в HAVING — только исходные выражения.</Warn>

      <SelfCheck questions={[
        { q: 'Для чего нужен GROUP BY?', a: 'Группирует строки с одинаковыми значениями в одну и позволяет применять агрегатные функции к каждой группе. Например, GROUP BY city + COUNT(*) даёт количество пользователей в каждом городе.' },
        { q: 'Чем HAVING отличается от WHERE?', a: 'WHERE фильтрует строки ДО группировки, HAVING — группы ПОСЛЕ группировки. HAVING умеет работать с агрегатами: HAVING COUNT(*) > 10. WHERE с агрегатами работать не может.' },
        { q: 'Какие столбцы можно выбирать вместе с GROUP BY?', a: 'Только те, по которым идёт группировка, и агрегатные функции. Выбирать необгруппированный столбец без агрегата нельзя — СУБД не знает, какое из множества значений группы показать.' },
      ]} />

      {/* ─── 9. UPDATE / DELETE ─── */}
      <SectionTitle id="update">9. UPDATE и DELETE</SectionTitle>

      <Code code={`-- Изменить город одного пользователя
UPDATE users
SET city = 'Санкт-Петербург'
WHERE id = 1;

-- Изменить несколько полей сразу
UPDATE users
SET city = 'Москва', age = age + 1
WHERE name = 'Дина';

-- Удалить конкретного пользователя
DELETE FROM users
WHERE id = 6;

-- Удалить пользователей старше 40
DELETE FROM users
WHERE age > 40;`} />

      <Warn>ВСЕГДА добавляй WHERE в UPDATE и DELETE. Без WHERE изменятся или удалятся ВСЕ строки. Проверяй сначала через SELECT с тем же WHERE.</Warn>

      <Code code={`-- Безопасный подход: сначала SELECT
SELECT * FROM users WHERE age > 40;  -- проверяем кто попадёт
-- Убедились? Тогда:
DELETE FROM users WHERE age > 40;`} />

      <SelfCheck questions={[
        { q: 'Почему UPDATE без WHERE опасен?', a: 'Без WHERE изменятся ВСЕ строки таблицы. Например, UPDATE users SET salary = 0 обнулит зарплату у всех. Всегда проверяй условие через SELECT перед выполнением UPDATE или DELETE.' },
        { q: 'Как безопасно удалить конкретные строки?', a: 'Сначала проверить выборку: SELECT * FROM users WHERE id = 5. Убедившись, что выбираются нужные строки, заменить SELECT * на DELETE: DELETE FROM users WHERE id = 5.' },
        { q: 'Чем DELETE отличается от TRUNCATE?', a: 'DELETE удаляет строки по условию WHERE и может откатываться в транзакции. TRUNCATE мгновенно очищает всю таблицу, работает быстрее, но без условий и обычно без возможности отката.' },
      ]} />

      {/* ─── 10. JOIN ─── */}
      <SectionTitle id="joins">10. JOIN — соединение таблиц</SectionTitle>
      <P>JOIN объединяет строки из двух таблиц по условию. Результат — одна «широкая» таблица.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, margin: '16px 0' }}>
        {[
          { type: 'INNER JOIN', color: 'rgba(100,200,255,0.12)', border: 'rgba(100,200,255,0.25)', desc: 'Только строки с совпадением в обеих таблицах' },
          { type: 'LEFT JOIN',  color: 'rgba(200,255,0,0.08)',   border: 'rgba(200,255,0,0.2)',   desc: 'Все строки слева + совпадения справа (NULL если нет)' },
          { type: 'RIGHT JOIN', color: 'rgba(255,170,0,0.08)',   border: 'rgba(255,170,0,0.2)',   desc: 'Все строки справа + совпадения слева (NULL если нет)' },
          { type: 'FULL OUTER', color: 'rgba(200,100,255,0.08)', border: 'rgba(200,100,255,0.2)', desc: 'Все строки из обеих таблиц (NULL где нет пары)' },
        ].map(j => (
          <div key={j.type} style={{ background: j.color, border: `1px solid ${j.border}`, borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)', fontSize: 13, marginBottom: 6 }}>{j.type}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{j.desc}</div>
          </div>
        ))}
      </div>

      <SubTitle>INNER JOIN</SubTitle>
      <Code code={`SELECT u.name, u.city, o.product, o.price
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;`} />

      <Result label="INNER JOIN — только пользователи у которых есть заказы">
        <T
          cols={['name', 'city', 'product', 'price']}
          rows={[
            ['Анна',  'Москва', 'Книга',      500],
            ['Анна',  'Москва', 'Наушники',   3000],
            ['Борис', 'Казань', 'Мышка',      1200],
            ['Вера',  'Москва', 'Клавиатура', 2500],
            ['Дина',  'Казань', 'Монитор',    15000],
            ['Егор',  'Москва', 'Веб-камера', 4500],
          ]}
          hRows={[0,1,2,3,4,5]}
          caption="Глеб(4) отсутствует — у него нет заказов"
        />
      </Result>

      <SubTitle>LEFT JOIN</SubTitle>
      <Code code={`SELECT u.name, u.city, o.product, o.price
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;`} />

      <Result label="LEFT JOIN — все пользователи, даже без заказов">
        <T
          cols={['name', 'city', 'product', 'price']}
          rows={[
            ['Анна',  'Москва', 'Книга',      500],
            ['Анна',  'Москва', 'Наушники',   3000],
            ['Борис', 'Казань', 'Мышка',      1200],
            ['Вера',  'Москва', 'Клавиатура', 2500],
            ['Глеб',  'Сочи',  'NULL',        'NULL'],
            ['Дина',  'Казань', 'Монитор',    15000],
            ['Егор',  'Москва', 'Веб-камера', 4500],
          ]}
          hRows={[4]}
          caption="Глеб попал в результат — product и price = NULL"
        />
      </Result>

      <SubTitle>LEFT JOIN — поиск «сирот»</SubTitle>
      <Code code={`-- Пользователи БЕЗ заказов
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE o.id IS NULL;`} />

      <Result>
        <T cols={['name']} rows={[['Глеб']]} hRows={[0]} caption="Только Глеб — у него нет ни одного заказа" />
      </Result>

      <SubTitle>JOIN + GROUP BY</SubTitle>
      <Code code={`-- Сколько заказов и сумма у каждого пользователя
SELECT
    u.name,
    COUNT(o.id)     AS orders_count,
    SUM(o.price)    AS total_spent,
    AVG(o.price)    AS avg_price
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;`} />

      <Result>
        <T
          cols={['name', 'orders_count', 'total_spent', 'avg_price']}
          rows={[
            ['Дина',  1, 15000, 15000],
            ['Егор',  1, 4500,  4500],
            ['Анна',  2, 3500,  1750],
            ['Вера',  1, 2500,  2500],
            ['Борис', 1, 1200,  1200],
            ['Глеб',  0, 'NULL','NULL'],
          ]}
          hCols={[1,2,3]}
        />
      </Result>

      <SubTitle>JOIN нескольких таблиц</SubTitle>
      <Code code={`-- Если бы была таблица categories
SELECT u.name, o.product, c.category_name
FROM users AS u
JOIN orders AS o ON u.id = o.user_id
JOIN categories AS c ON o.category_id = c.id
WHERE u.city = 'Москва';`} />

      <SelfCheck questions={[
        { q: 'Чем INNER JOIN отличается от LEFT JOIN?', a: 'INNER JOIN возвращает только строки, где есть совпадение в обеих таблицах. LEFT JOIN возвращает все строки левой таблицы плюс совпадения из правой; где совпадения нет — NULL.' },
        { q: 'Что указывают в условии ON при соединении?', a: 'Условие связи таблиц, обычно равенство ключей: ON orders.user_id = users.id. Оно определяет, какие строки одной таблицы соответствуют строкам другой.' },
        { q: 'Зачем используют псевдонимы таблиц в JOIN?', a: 'Чтобы сократить запись и устранить неоднозначность при одинаковых именах столбцов: FROM users u JOIN orders o ON o.user_id = u.id. Особенно важно при самосоединении таблицы с самой собой.' },
      ]} />

      {/* ─── 11. NULL ─── */}
      <SectionTitle id="null">11. NULL и COALESCE</SectionTitle>
      <P>NULL — не ноль и не пустая строка. Это «значение неизвестно или отсутствует». NULL требует особого обращения.</P>

      <Warn>NULL = NULL → FALSE. Сравнение через = не работает. Используй IS NULL и IS NOT NULL.</Warn>

      <Code code={`-- Проверка на NULL
SELECT * FROM users WHERE city IS NULL;
SELECT * FROM users WHERE city IS NOT NULL;

-- COALESCE — первое ненулевое значение
SELECT name, COALESCE(city, 'Не указан') AS city
FROM users;

-- COALESCE с несколькими аргументами
SELECT name, COALESCE(phone, email, 'Нет контакта') AS contact
FROM users;

-- IFNULL (MySQL / SQLite) — аналог COALESCE для двух аргументов
SELECT name, IFNULL(city, 'Не указан') AS city FROM users;

-- NULLIF — вернуть NULL если значения равны
SELECT NULLIF(score, 0) FROM results;  -- 0 превратится в NULL

-- NULL в агрегатах: COUNT(*) считает все строки,
-- COUNT(col) — только строки где col не NULL
SELECT COUNT(*), COUNT(city), COUNT(phone) FROM users;`} />

      <SelfCheck questions={[
        { q: 'Почему нельзя проверять NULL через = NULL?', a: 'NULL означает «значение неизвестно», поэтому NULL = NULL даёт не TRUE, а NULL. Для проверки используют IS NULL и IS NOT NULL. Это частая ошибка новичков.' },
        { q: 'Что делает функция COALESCE?', a: "Возвращает первое не-NULL значение из списка аргументов: COALESCE(phone, email, 'нет контакта'). Используется для подстановки значения по умолчанию вместо пустых полей." },
        { q: 'Как NULL влияет на арифметику и сравнения?', a: 'Любая операция с NULL даёт NULL: 100 + NULL = NULL. Сравнения с NULL дают неизвестность, поэтому такие строки не проходят фильтр WHERE. Это нужно учитывать в расчётах.' },
      ]} />

      {/* ─── 12. CASE WHEN ─── */}
      <SectionTitle id="casewhen">12. CASE WHEN — условная логика</SectionTitle>
      <P>CASE WHEN — аналог if/else прямо внутри SQL-запроса. Позволяет создавать вычисляемые поля на основе условий.</P>

      <Code code={`-- Категория возраста
SELECT name, age,
    CASE
        WHEN age < 18 THEN 'несовершеннолетний'
        WHEN age BETWEEN 18 AND 25 THEN 'молодой'
        WHEN age BETWEEN 26 AND 35 THEN 'взрослый'
        ELSE 'старший'
    END AS age_group
FROM users;`} />

      <Result>
        <T
          cols={['name', 'age', 'age_group']}
          rows={[
            ['Анна', 25, 'молодой'],
            ['Борис', 31, 'взрослый'],
            ['Вера', 19, 'молодой'],
            ['Глеб', 42, 'старший'],
            ['Дина', 28, 'взрослый'],
            ['Егор', 35, 'взрослый'],
          ]}
          hCols={[2]}
        />
      </Result>

      <Code code={`-- CASE WHEN в агрегации
SELECT
    COUNT(*) AS total,
    COUNT(CASE WHEN city = 'Москва' THEN 1 END)  AS moscow,
    COUNT(CASE WHEN age >= 30 THEN 1 END)         AS aged_30_plus
FROM users;

-- CASE WHEN в ORDER BY
SELECT name, status
FROM orders
ORDER BY
    CASE status
        WHEN 'done'    THEN 1
        WHEN 'pending' THEN 2
        ELSE 3
    END;`} />

      <SelfCheck questions={[
        { q: 'Для чего используют CASE WHEN?', a: "Для условной логики внутри запроса — аналог if/else. Возвращает разные значения в зависимости от условия: CASE WHEN age < 18 THEN 'юный' ELSE 'взрослый' END. Удобно для категоризации." },
        { q: 'Что произойдёт, если не указать ветку ELSE?', a: 'Если ни одно условие WHEN не выполнилось и ELSE отсутствует, CASE вернёт NULL. Поэтому ELSE добавляют, чтобы явно задать значение для всех остальных случаев.' },
        { q: 'Можно ли группировать по результату CASE WHEN?', a: 'Да. Можно создать категорию через CASE WHEN и сгруппировать по ней: GROUP BY по выражению CASE позволяет считать, например, сколько сотрудников в каждой зарплатной категории.' },
      ]} />

      {/* ─── 13. Подзапросы ─── */}
      <SectionTitle id="subquery">13. Подзапросы (Subqueries)</SectionTitle>
      <P>Подзапрос — SELECT внутри другого SELECT, WHERE или FROM. Выполняется первым, его результат используется внешним запросом.</P>

      <SubTitle>Подзапрос в WHERE</SubTitle>
      <Code code={`-- Пользователи старше среднего возраста
SELECT name, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);   -- подзапрос → 30.0`} />

      <Result label="WHERE age > AVG(age) = 30.0">
        <T cols={['name','age']} rows={[['Борис',31],['Глеб',42],['Егор',35]]} hRows={[0,1,2]} />
      </Result>

      <Code code={`-- Пользователи, у которых есть заказы (через IN)
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Пользователи БЕЗ заказов (через NOT IN)
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);`} />

      <SubTitle>Подзапрос в FROM (derived table)</SubTitle>
      <Code code={`-- Сначала считаем суммы, потом фильтруем по ним
SELECT name, total_spent
FROM (
    SELECT u.name, SUM(o.price) AS total_spent
    FROM users AS u
    JOIN orders AS o ON u.id = o.user_id
    GROUP BY u.id, u.name
) AS user_totals
WHERE total_spent > 2000
ORDER BY total_spent DESC;`} />

      <Result>
        <T cols={['name','total_spent']} rows={[['Дина',15000],['Егор',4500],['Анна',3500],['Вера',2500]]} hRows={[0,1,2,3]} />
      </Result>

      <SubTitle>Подзапрос в SELECT (скалярный)</SubTitle>
      <Code code={`-- Для каждого пользователя — отклонение от среднего возраста
SELECT
    name,
    age,
    age - (SELECT AVG(age) FROM users) AS diff_from_avg
FROM users;`} />

      <SelfCheck questions={[
        { q: 'Что такое подзапрос?', a: 'Это SELECT, вложенный внутрь другого запроса. Сначала выполняется внутренний запрос, его результат используется внешним. Применяется, когда нужно сначала что-то вычислить, а потом отфильтровать по этому значению.' },
        { q: 'Чем отличается подзапрос в WHERE от подзапроса в FROM?', a: 'В WHERE подзапрос фильтрует строки: WHERE id IN (SELECT ...). В FROM подзапрос создаёт временную таблицу, по которой строится дальнейший запрос. Второй вариант гибче для сложных вычислений.' },
        { q: 'Что делают операторы IN и EXISTS с подзапросами?', a: 'IN проверяет, входит ли значение в результат подзапроса. EXISTS проверяет, вернул ли подзапрос хотя бы одну строку. EXISTS часто эффективнее на больших объёмах данных.' },
      ]} />

      {/* ─── 14. Порядок выполнения ─── */}
      <SectionTitle id="execorder">14. Порядок выполнения SELECT</SectionTitle>
      <P>SQL не выполняется сверху вниз. Порядок выполнения отличается от порядка написания.</P>

      <Code code={`SELECT   city, COUNT(*) AS cnt   -- 6. выбор колонок
FROM     users                    -- 1. из какой таблицы
JOIN     orders ON ...            -- 2. соединение
WHERE    age > 18                 -- 3. фильтр строк
GROUP BY city                     -- 4. группировка
HAVING   COUNT(*) > 1             -- 5. фильтр групп
ORDER BY cnt DESC                 -- 7. сортировка
LIMIT    3;                       -- 8. ограничение`} />

      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16, margin: '16px 0' }}>
        <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>Реальный порядок выполнения</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[
            ['1', 'FROM'], ['2', 'JOIN'], ['3', 'WHERE'],
            ['4', 'GROUP BY'], ['5', 'HAVING'], ['6', 'SELECT'],
            ['7', 'ORDER BY'], ['8', 'LIMIT'],
          ].map(([num, cmd]) => (
            <div key={cmd} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: 'rgba(200,255,0,0.15)', color: 'var(--accent-lime)', borderRadius: 4, padding: '2px 7px', fontSize: 11, fontWeight: 700 }}>{num}</span>
              <span style={{ fontFamily: 'monospace', color: 'var(--text-primary)', fontSize: 13 }}>{cmd}</span>
              {num !== '8' && <span style={{ color: 'var(--text-tertiary)' }}>→</span>}
            </div>
          ))}
        </div>
        <P style={{ marginTop: 12, fontSize: 13 }}>
          Именно поэтому нельзя использовать алиас из SELECT в WHERE — WHERE выполняется раньше SELECT.
          А HAVING может использовать агрегаты — оно выполняется после GROUP BY.
        </P>
      </div>

      <SelfCheck questions={[
        { q: 'В каком порядке SQL выполняет части запроса?', a: 'FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. Сначала берутся и фильтруются данные, потом группируются, и только затем выбираются столбцы и сортируется результат.' },
        { q: 'Почему нельзя использовать алиас из SELECT в WHERE?', a: 'Потому что WHERE выполняется раньше SELECT — к моменту фильтрации алиасы ещё не созданы. Нужно либо повторить выражение в WHERE, либо обернуть запрос в подзапрос.' },
        { q: 'Почему ORDER BY может использовать алиасы из SELECT?', a: 'Потому что ORDER BY выполняется ПОСЛЕ SELECT, когда алиасы уже определены. Поэтому сортировать по вычисленному столбцу-алиасу можно, а фильтровать в WHERE по нему — нет.' },
      ]} />

      {/* ─── 15. Виды БД ─── */}
      <SectionTitle id="databases">15. Виды баз данных</SectionTitle>
      <P>Не существует одной «лучшей» базы данных — каждая оптимизирована под определённый тип задач.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '20px 0' }}>
        {[
          {
            name: 'PostgreSQL',
            type: 'Реляционная (SQL)',
            color: '#60a5fa',
            bg: 'rgba(59,130,246,0.08)',
            border: 'rgba(59,130,246,0.2)',
            tags: ['ACID', 'JSON/JSONB', 'Полнотекстовый поиск', 'Расширения'],
            desc: 'Самая мощная open-source реляционная СУБД. Стандарт для большинства backend-проектов.',
            use: 'Банки, e-commerce, SaaS, стартапы',
          },
          {
            name: 'MySQL / MariaDB',
            type: 'Реляционная (SQL)',
            color: '#60a5fa',
            bg: 'rgba(59,130,246,0.08)',
            border: 'rgba(59,130,246,0.2)',
            tags: ['ACID', 'Репликация', 'Хорошая документация', 'WordPress'],
            desc: 'Очень распространена в веб-разработке, простая в настройке.',
            use: 'Веб-сайты, CMS, LAMP-стек',
          },
          {
            name: 'SQLite',
            type: 'Реляционная (SQL)',
            color: '#60a5fa',
            bg: 'rgba(59,130,246,0.08)',
            border: 'rgba(59,130,246,0.2)',
            tags: ['Файловая БД', 'Без сервера', 'Встраиваемая'],
            desc: 'Вся БД — один файл. Не требует сервера. Идеальна для обучения и мобильных приложений.',
            use: 'Мобильные приложения, тесты, IoT',
          },
          {
            name: 'MongoDB',
            type: 'Документная (NoSQL)',
            color: '#4ade80',
            bg: 'rgba(74,222,128,0.08)',
            border: 'rgba(74,222,128,0.2)',
            tags: ['JSON-документы', 'Гибкая схема', 'Горизонтальное масштабирование'],
            desc: 'Хранит данные как JSON-документы. Нет жёсткой схемы — поля могут различаться в документах.',
            use: 'Каталоги товаров, контент, быстрые прототипы',
          },
          {
            name: 'Redis',
            type: 'Ключ-значение (NoSQL)',
            color: '#f87171',
            bg: 'rgba(248,113,113,0.08)',
            border: 'rgba(248,113,113,0.2)',
            tags: ['In-memory', 'Миллисекунды', 'TTL', 'Pub/Sub'],
            desc: 'Хранит данные в RAM. Сверхбыстрый. Используется как кэш или брокер сообщений.',
            use: 'Кэш, сессии, очереди, счётчики',
          },
          {
            name: 'ClickHouse',
            type: 'Колоночная (NoSQL)',
            color: '#fb923c',
            bg: 'rgba(251,146,60,0.08)',
            border: 'rgba(251,146,60,0.2)',
            tags: ['Колоночное хранение', 'OLAP', 'Петабайты', 'Аналитика'],
            desc: 'Колоночная СУБД от Яндекса. Агрегирует миллиарды строк за секунды.',
            use: 'Аналитика, логи, метрики, A/B тесты',
          },
        ].map(db => (
          <div key={db.name} style={{ background: db.bg, border: `1px solid ${db.border}`, borderRadius: 10, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-primary)' }}>{db.name}</div>
              <span style={{ fontSize: 10, color: db.color, background: `${db.bg}`, border: `1px solid ${db.border}`, borderRadius: 4, padding: '2px 7px', fontWeight: 700 }}>{db.type.split(' ')[0]}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}>{db.type}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 10 }}>
              {db.tags.map(t => <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 4, padding: '2px 6px', fontSize: 10, color: 'var(--text-tertiary)' }}>{t}</span>)}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, lineHeight: 1.6 }}>{db.desc}</div>
            <div style={{ fontSize: 12, color: db.color }}><strong>Когда:</strong> {db.use}</div>
          </div>
        ))}
      </div>

      <SubTitle>Сравнение синтаксиса по СУБД</SubTitle>
      <CT
        headers={['Задача', 'PostgreSQL', 'MySQL', 'SQLite']}
        rows={[
          ['Автоинкремент',    'SERIAL / GENERATED ALWAYS AS IDENTITY', 'AUTO_INCREMENT', 'AUTOINCREMENT'],
          ['Текущее время',    'NOW() / CURRENT_TIMESTAMP',             'NOW()',          "datetime('now')"],
          ['Строковое concat', "name || ' ' || city",                  "CONCAT(name,' ',city)", "name || ' ' || city"],
          ['Регистронезав.',   'ILIKE',                                 'LIKE (по умолчанию)', 'LIKE COLLATE NOCASE'],
          ['Ограничение строк','LIMIT n OFFSET m',                      'LIMIT n OFFSET m',    'LIMIT n OFFSET m'],
          ['JSON-поля',        'JSONB (нативно)',                        'JSON (с 5.7)',         'TEXT (без поддержки)'],
          ['Транзакции',       'BEGIN / COMMIT / ROLLBACK',             'START TRANSACTION',   'BEGIN / COMMIT'],
          ['Резервная копия',  'pg_dump',                               'mysqldump',            'cp file.db'],
        ]}
      />

      <SubTitle>Когда что выбирать</SubTitle>
      <CT
        headers={['Сценарий', 'Лучший выбор', 'Почему']}
        rows={[
          ['Веб-приложение с пользователями и заказами', 'PostgreSQL', 'ACID, сложные запросы, надёжность'],
          ['Блог или сайт на WordPress', 'MySQL', 'Отличная совместимость, простота'],
          ['Мобильное приложение / обучение', 'SQLite', 'Файловая БД, нет сервера'],
          ['Кэш и сессии пользователей', 'Redis', 'Миллисекунды, TTL'],
          ['Гибкий каталог с разными атрибутами', 'MongoDB', 'Разные поля у документов'],
          ['Аналитика логов и событий', 'ClickHouse', 'Миллиарды строк, быстрая агрегация'],
          ['Граф друзей в соцсети', 'Neo4j', 'Оптимизирован для обходов графа'],
        ]}
      />

      <SelfCheck questions={[
        { q: 'Чем реляционные БД отличаются от NoSQL?', a: 'Реляционные (PostgreSQL, MySQL) хранят данные в таблицах со строгой схемой и связями, поддерживают сложные JOIN и транзакции. NoSQL (MongoDB, Redis) — гибкая схема, документы или ключ-значение, лучше масштабируются горизонтально.' },
        { q: 'Когда выбрать PostgreSQL, а когда MongoDB?', a: 'PostgreSQL — для структурированных данных, сложных связей, транзакций (финансы, ERP). MongoDB — для гибких документов с меняющейся структурой, быстрого прототипирования и вложенных объектов.' },
        { q: 'Что такое принцип ACID?', a: 'Atomicity (всё или ничего), Consistency (данные всегда валидны), Isolation (транзакции не мешают друг другу), Durability (после подтверждения данные не потеряются). Гарантирует надёжность реляционных БД.' },
      ]} />

      {/* ─── 16. Шпаргалка ─── */}
      <SectionTitle id="cheatsheet">16. Шпаргалка всех команд</SectionTitle>

      <SubTitle>DDL — структура</SubTitle>
      <MT rows={[
        ['CREATE TABLE',   'Создать таблицу',                     'CREATE TABLE t (id INTEGER PRIMARY KEY)'],
        ['ALTER TABLE',    'Изменить структуру таблицы',          'ALTER TABLE t ADD COLUMN phone TEXT'],
        ['DROP TABLE',     'Удалить таблицу со всеми данными',    'DROP TABLE IF EXISTS t'],
        ['TRUNCATE',       'Удалить все строки (быстро)',          'TRUNCATE TABLE t'],
      ]} />

      <SubTitle>DML — данные</SubTitle>
      <MT rows={[
        ['INSERT INTO',    'Добавить строку(и)',                   "INSERT INTO t (a,b) VALUES (1,'x')"],
        ['UPDATE SET',     'Изменить строки',                     'UPDATE t SET a=2 WHERE id=1'],
        ['DELETE FROM',    'Удалить строки',                      'DELETE FROM t WHERE id=1'],
      ]} />

      <SubTitle>SELECT — выборка и фильтрация</SubTitle>
      <MT rows={[
        ['SELECT',         'Выбрать колонки',                     'SELECT name, age FROM users'],
        ['DISTINCT',       'Убрать дубликаты',                    'SELECT DISTINCT city FROM users'],
        ['WHERE',          'Фильтр строк',                        "WHERE city = 'Москва'"],
        ['AND / OR / NOT', 'Логические операторы',                'WHERE age > 20 AND city = …'],
        ['IN',             'Вхождение в список',                   "WHERE city IN ('Мск','СПб')"],
        ['BETWEEN',        'Диапазон включительно',               'WHERE age BETWEEN 20 AND 30'],
        ['LIKE',           'Поиск по шаблону',                    "WHERE name LIKE 'А%'"],
        ['IS NULL',        'Проверка на NULL',                    'WHERE phone IS NULL'],
        ['ORDER BY',       'Сортировка',                          'ORDER BY age DESC'],
        ['LIMIT / OFFSET', 'Ограничение + пагинация',             'LIMIT 10 OFFSET 20'],
      ]} />

      <SubTitle>Агрегация и группировка</SubTitle>
      <MT rows={[
        ['COUNT(*)',       'Количество строк',                    'SELECT COUNT(*) FROM users'],
        ['SUM / AVG',      'Сумма / среднее',                    'SELECT SUM(price), AVG(price)'],
        ['MAX / MIN',      'Максимум / минимум',                 'SELECT MAX(age), MIN(age)'],
        ['GROUP BY',       'Группировка',                        'GROUP BY city'],
        ['HAVING',         'Фильтр групп',                      'HAVING COUNT(*) > 1'],
      ]} />

      <SubTitle>JOIN и связи</SubTitle>
      <MT rows={[
        ['INNER JOIN',     'Только совпадения в обеих таблицах', 'JOIN b ON a.id = b.a_id'],
        ['LEFT JOIN',      'Все строки слева + совпадения',      'LEFT JOIN b ON a.id = b.a_id'],
        ['RIGHT JOIN',     'Все строки справа + совпадения',     'RIGHT JOIN b ON a.id = b.a_id'],
        ['FULL OUTER JOIN','Все строки из обеих таблиц',        'FULL OUTER JOIN b ON …'],
      ]} />

      <SubTitle>Прочее</SubTitle>
      <MT rows={[
        ['COALESCE',       'Первое ненулевое из списка',          "COALESCE(phone, 'Нет')"],
        ['CASE WHEN',      'Условная логика',                    'CASE WHEN age<18 THEN …END'],
        ['AS',             'Псевдоним колонки или таблицы',      'SELECT name AS "Имя"'],
        ['UNION',          'Объединить результаты (без дублей)',  'SELECT … UNION SELECT …'],
        ['UNION ALL',      'Объединить результаты (с дублями)',  'SELECT … UNION ALL SELECT …'],
        ['EXISTS',         'Проверить наличие строк подзапроса', 'WHERE EXISTS (SELECT 1 …)'],
      ]} />

      <SelfCheck questions={[
        { q: 'В каком порядке пишутся ключевые слова в SELECT-запросе?', a: 'SELECT … FROM … JOIN … ON … WHERE … GROUP BY … HAVING … ORDER BY … LIMIT. Нарушение этого порядка вызовет синтаксическую ошибку, даже если логика запроса верна.' },
        { q: 'Какие три типа JOIN встречаются чаще всего?', a: 'INNER JOIN (только совпадения), LEFT JOIN (все из левой таблицы + совпадения), и реже FULL OUTER JOIN (все строки обеих таблиц). RIGHT JOIN обычно заменяют LEFT JOIN, поменяв таблицы местами.' },
        { q: 'Какие операторы помогают работать с NULL и условиями?', a: 'IS NULL / IS NOT NULL для проверки пустых значений, COALESCE для подстановки значения по умолчанию, CASE WHEN для условной логики. Эти инструменты нужны почти в каждом реальном запросе.' },
      ]} />

      {/* Финал */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(168,85,247,0.2)', borderRadius: 10, padding: 'clamp(16px,3vw,24px)', margin: '44px 0 20px', textAlign: 'center' }}>
        <div style={{ color: '#c084fc', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Практика — лучший способ закрепить SQL</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 14 }}>
          Открой онлайн-песочницу и попробуй все запросы прямо сейчас
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['sqliteonline.com', 'sqlfiddle.com', 'leetcode.com/studyplan/top-sql-50'].map(url => (
            <code key={url} style={{ fontFamily: 'monospace', fontSize: 12, background: 'var(--bg-tertiary)', padding: '4px 10px', borderRadius: 4, color: 'var(--text-secondary)' }}>{url}</code>
          ))}
        </div>
      </div>

    </div>
  )
}
