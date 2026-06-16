import { TheoryExample, TheoryCode, DbTable } from './components/TheoryTable'

export default function Day17TrendsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 17</h1>
        <p className="theory-subtitle">IT-тренды и влияние ИИ · SQL часть 1</p>
        <p className="theory-date">17 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Топ-тренды 2026</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🤖 Generative AI</h3>
          <p className="theory-intro">ИИ генерирует текст, код, изображения. Меняет разработку кардинально.</p>
          <ul className="theory-list">
            <li className="theory-list-item">AI-ассистенты (Copilot, Claude) в IDE</li>
            <li className="theory-list-item">Автоматизация рутинных задач</li>
            <li className="theory-list-item">Новые профессии (prompt engineers, AI researchers)</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">☁️ Cloud Native & Kubernetes</h3>
          <p className="theory-intro">Всё переходит в облако. Kubernetes уже стандарт.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🔐 Кибербезопасность</h3>
          <p className="theory-intro">С ростом данных — растёт спрос на security специалистов.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">⚡ Edge Computing</h3>
          <p className="theory-intro">Обработка данных близко к источнику (IoT, 5G).</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🌐 Web3 / Blockchain</h3>
          <p className="theory-intro">Децентрализованные приложения. Спорный тренд, но есть спрос.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как ИИ меняет разработку</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">❌ Что автоматизируется</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Простой boilerplate код</li>
            <li className="theory-list-item">Документация и комментарии</li>
            <li className="theory-list-item">Тесты</li>
            <li className="theory-list-item">Code review (частично)</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">✅ Что остаётся людям</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Архитектура и дизайн системы</li>
            <li className="theory-list-item">Критическое мышление</li>
            <li className="theory-list-item">Коммуникация с командой</li>
            <li className="theory-list-item">Понимание бизнес-требований</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Перспективы по направлениям</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Frontend</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐ (всегда нужны UI разработчики)</p>
          <p className="theory-text">Изменения: AI для дизайна и вёрстки, но качество — люди</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Backend</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (расти с облаком)</p>
          <p className="theory-text">Изменения: Serverless, микросервисы, AI-интеграция</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">ML/AI</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (явно растёт)</p>
          <p className="theory-text">Изменения: LLM становятся проще, растёт спрос на инженеров</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">DevOps</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (облако требует expertise)</p>
          <p className="theory-text">Изменения: Platform Engineering, eBPF, zero-trust security</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как не отстать</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Учись основам (алгоритмы, архитектура) — они не меняются</li>
          <li className="theory-list-item">Следи за трендами (HackerNews, Reddit r/programming)</li>
          <li className="theory-list-item">Экспериментируй с новыми технологиями</li>
          <li className="theory-list-item">Сфокусируйся на soft skills (communication, problem-solving)</li>
          <li className="theory-list-item">Используй ИИ как инструмент, а не замену себе</li>
        </ul>
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
