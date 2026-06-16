import { TheoryTable, TheoryExample } from './components/TheoryTable'

export default function Day16LanguagesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 16</h1>
        <p className="theory-subtitle">Языки программирования и фреймворки в 2026 году</p>
        <p className="theory-date">16 июня 2026</p>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Технологический ландшафт в 2026 году продолжает меняться. Цель — не выучить всё, а понять, на что ориентироваться при построении карьеры. Ниже обзор по ключевым направлениям.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.1. Фронтенд</h2>
        <p className="theory-intro">
          Фронтенд — всё, что видит пользователь в браузере. Основа неизменна: HTML, CSS, JavaScript. Всё остальное — инструменты поверх них.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Базовые технологии</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>HTML5</strong> — структура страницы, семантическая разметка</li>
            <li className="theory-list-item"><strong>CSS3</strong> — стили, анимации, адаптивный дизайн. Flexbox и Grid — обязательны</li>
            <li className="theory-list-item"><strong>JavaScript (ES2024+)</strong> — логика, взаимодействие, работа с API</li>
            <li className="theory-list-item"><strong>TypeScript</strong> — типизированная надстройка над JS, де-факто стандарт в продакшене</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Фреймворки и библиотеки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>React</strong> — самая популярная библиотека (Meta). В 2026 — React 19 с серверными компонентами</li>
            <li className="theory-list-item"><strong>Next.js</strong> — фреймворк поверх React (Vercel): SSR, SSG, маршрутизация, API-роуты</li>
            <li className="theory-list-item"><strong>Vue.js</strong> — лёгкий вход, Vue 3 с Composition API</li>
            <li className="theory-list-item"><strong>Svelte / SvelteKit</strong> — компилируемый фреймворк без рантайм-оверхеда</li>
            <li className="theory-list-item"><strong>Astro</strong> — быстрые контентные сайты, Islands Architecture</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Дополнительные инструменты</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Tailwind CSS</strong> — утилитарный CSS-фреймворк</li>
            <li className="theory-list-item"><strong>Vite</strong> — быстрый сборщик, заменяет Webpack</li>
            <li className="theory-list-item"><strong>Figma</strong> — основной инструмент дизайна</li>
            <li className="theory-list-item"><strong>Storybook</strong> — разработка и документирование UI-компонентов</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.2. Бэкенд</h2>
        <p className="theory-intro">
          Бэкенд — серверная часть: обработка данных, бизнес-логика, базы данных, API. Выбор зависит от задачи, нагрузки и команды.
        </p>
        <TheoryTable
          headers={['Язык', 'Фреймворки', 'Особенности']}
          rows={[
            ['Python', 'FastAPI, Django, Flask', 'Простота, силён рядом с ML/аналитикой'],
            ['Node.js (JS)', 'Express, NestJS, Hono', 'JS на клиенте и сервере, real-time приложения'],
            ['Go', 'Gin, Echo, Fiber', 'Высоконагруженные системы, микросервисы'],
            ['Java / Kotlin', 'Spring Boot', 'Корпоративный бэкенд, энтерпрайз'],
            ['Rust', 'Actix Web, Axum', 'Производительность, безопасность памяти'],
          ]}
        />
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Базы данных</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>PostgreSQL</strong> — реляционная БД, стандарт большинства проектов</li>
            <li className="theory-list-item"><strong>MongoDB</strong> — документо-ориентированная NoSQL</li>
            <li className="theory-list-item"><strong>Redis</strong> — кэш и брокер сообщений в памяти</li>
            <li className="theory-list-item"><strong>ClickHouse</strong> — колоночная БД для аналитики</li>
            <li className="theory-list-item"><strong>ORM:</strong> Prisma, SQLAlchemy, GORM</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.3. Аналитика данных</h2>
        <p className="theory-intro">Аналитик собирает, обрабатывает, визуализирует и интерпретирует данные. Основной язык — Python, но SQL важен не меньше.</p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>pandas</strong> — работа с табличными данными</li>
          <li className="theory-list-item"><strong>NumPy</strong> — численные вычисления, матрицы</li>
          <li className="theory-list-item"><strong>Matplotlib, Seaborn, Plotly</strong> — визуализация</li>
          <li className="theory-list-item"><strong>Jupyter Notebook</strong> — интерактивная среда анализа</li>
          <li className="theory-list-item"><strong>SQL</strong> — обязательный инструмент любого аналитика</li>
          <li className="theory-list-item"><strong>BI:</strong> Tableau, Power BI, Grafana, Superset, Metabase</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.4. Machine Learning</h2>
        <p className="theory-intro">ML-инженер и Data Scientist работают на стыке математики, программирования и предметной области. Порог входа высокий, но спрос устойчив.</p>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Базовые библиотеки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>scikit-learn</strong> — классические ML-алгоритмы</li>
            <li className="theory-list-item"><strong>XGBoost, LightGBM, CatBoost</strong> — градиентный бустинг (лидер на табличных данных)</li>
          </ul>
        </div>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Deep Learning и LLM (тренд 2024-2026)</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>PyTorch</strong> — доминирующий фреймворк для исследований и продакшена</li>
            <li className="theory-list-item"><strong>TensorFlow / Keras</strong> — по-прежнему используется в энтерпрайзе</li>
            <li className="theory-list-item"><strong>LangChain, LlamaIndex</strong> — работа с LLM</li>
            <li className="theory-list-item"><strong>Hugging Face Transformers</strong> — стандарт для NLP</li>
            <li className="theory-list-item"><strong>Ollama</strong> — запуск локальных LLM</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.5. Кибербезопасность</h2>
        <p className="theory-intro">Специалист должен понимать, как работают системы, сети и приложения — и как их взломать, чтобы защитить.</p>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Языки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Python</strong> — скрипты, автоматизация, инструменты анализа</li>
            <li className="theory-list-item"><strong>Bash / Shell</strong> — работа в Linux</li>
            <li className="theory-list-item"><strong>C / C++</strong> — уязвимости низкого уровня, reverse engineering</li>
          </ul>
        </div>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Ключевые инструменты</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Kali Linux / Parrot OS</strong> — дистрибутивы для пентеста</li>
            <li className="theory-list-item"><strong>Nmap</strong> — сетевое сканирование, <strong>Burp Suite</strong> — анализ веб-приложений</li>
            <li className="theory-list-item"><strong>Wireshark</strong> — анализ трафика, <strong>Metasploit</strong> — тестирование на проникновение</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2.6. Универсальные инструменты разработчика</h2>
        <p className="theory-intro">Независимо от направления есть инструменты, которые нужны всем.</p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Git</strong> — система контроля версий (абсолютный стандарт). GitHub / GitLab / Bitbucket, CI/CD</li>
          <li className="theory-list-item"><strong>Командная строка и Linux</strong> — большинство серверов на Linux. SSH, bash-скрипты</li>
          <li className="theory-list-item"><strong>Docker</strong> — контейнеризация, решает «у меня работает, а на сервере нет». Kubernetes для оркестрации</li>
          <li className="theory-list-item"><strong>Облачные платформы</strong> — AWS, Google Cloud, Azure</li>
          <li className="theory-list-item"><strong>REST API и HTTP</strong> — методы, статус-коды, JSON. Postman для тестирования</li>
          <li className="theory-list-item"><strong>VS Code</strong> — самый популярный редактор. JetBrains IDE, Neovim</li>
          <li className="theory-list-item"><strong>AI-инструменты</strong> — GitHub Copilot, Cursor, Claude, ChatGPT</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Рынок труда 2026: что выбрать</h2>
        <TheoryTable
          headers={['Направление', 'Топ-стек', 'Спрос']}
          rows={[
            ['Фронтенд', 'TypeScript + React/Next.js, Tailwind + Vite', '⭐⭐⭐⭐⭐'],
            ['Бэкенд', 'Python (FastAPI/Django), Node.js (NestJS), Go', '⭐⭐⭐⭐⭐'],
            ['Аналитика', 'Python + SQL, dbt, BI-инструменты', '⭐⭐⭐⭐'],
            ['ML/AI', 'PyTorch + scikit-learn, LangChain, Hugging Face', '⭐⭐⭐⭐⭐'],
            ['Кибербезопасность', 'Python + Linux + Bash', '⭐⭐⭐⭐'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как выбрать первый язык</h2>
        <TheoryExample title="Хочешь веб (frontend)">
          <p>🎯 <strong>JavaScript / TypeScript</strong> — единственный выбор для браузера</p>
        </TheoryExample>
        <TheoryExample title="Хочешь веб (backend)">
          <p>🎯 <strong>Python</strong> (просто учиться) или <strong>JavaScript/Node.js</strong></p>
        </TheoryExample>
        <TheoryExample title="Хочешь аналитику или ML">
          <p>🎯 <strong>Python + SQL</strong> — обязательный минимум</p>
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Не пытайся выучить всё сразу. Выбери одно направление, освой базу, начни применять. Глубина важнее ширины! 🚀</p>
      </section>
    </div>
  )
}
