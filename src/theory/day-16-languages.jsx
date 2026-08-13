import { TheoryTable, TheoryExample } from './components/TheoryTable'

export default function Day16LanguagesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Языки программирования и фреймворки в 2026 году</h1>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Технологический ландшафт в 2026 году продолжает меняться. Цель — не выучить всё, а понять, на что ориентироваться при построении карьеры. Ниже обзор по ключевым направлениям. <br /><br />
          <span style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>💡 В материале конспект есть подчеркнутые слова — по клику на них вы перейдёте на соответствующую документацию или сайт</span>
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Фронтенд</h2>
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
            <li className="theory-list-item"><a href="https://react.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>React</strong></a> — самая популярная библиотека (Meta). В 2026 — React 19 с серверными компонентами</li>
            <li className="theory-list-item"><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Next.js</strong></a> — фреймворк поверх React (Vercel): SSR, SSG, маршрутизация, API-роуты</li>
            <li className="theory-list-item"><a href="https://vuejs.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Vue.js</strong></a> — лёгкий вход, Vue 3 с Composition API</li>
            <li className="theory-list-item"><a href="https://svelte.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Svelte / SvelteKit</strong></a> — компилируемый фреймворк без рантайм-оверхеда</li>
            <li className="theory-list-item"><a href="https://astro.build" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Astro</strong></a> — быстрые контентные сайты, Islands Architecture</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Дополнительные инструменты</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Tailwind CSS</strong></a> — утилитарный CSS-фреймворк</li>
            <li className="theory-list-item"><a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Vite</strong></a> — быстрый сборщик, заменяет Webpack</li>
            <li className="theory-list-item"><a href="https://figma.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Figma</strong></a> — основной инструмент дизайна</li>
            <li className="theory-list-item"><a href="https://storybook.js.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Storybook</strong></a> — разработка и документирование UI-компонентов</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Бэкенд</h2>
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
        <div className="theory-subsection" style={{ marginTop: '16px' }}>
          <p style={{ marginBottom: '12px', fontSize: '12px' }}>
            📚 Документации:
            <a href="https://www.python.org/doc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>Python</a>
            <span style={{ color: 'var(--text-tertiary)' }}> · </span>
            <a href="https://fastapi.tiangolo.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>FastAPI</a>
            <span style={{ color: 'var(--text-tertiary)' }}> · </span>
            <a href="https://www.djangoproject.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>Django</a>
            <span style={{ color: 'var(--text-tertiary)' }}> · </span>
            <a href="https://nodejs.org/en/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>Node.js</a>
            <span style={{ color: 'var(--text-tertiary)' }}> · </span>
            <a href="https://go.dev/doc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>Go</a>
            <span style={{ color: 'var(--text-tertiary)' }}> · </span>
            <a href="https://www.rust-lang.org/documentation.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', marginLeft: '8px' }}>Rust</a>
          </p>
        </div>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Базы данных</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://www.postgresql.org/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>PostgreSQL</strong></a> — реляционная БД, стандарт большинства проектов</li>
            <li className="theory-list-item"><a href="https://docs.mongodb.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>MongoDB</strong></a> — документо-ориентированная NoSQL</li>
            <li className="theory-list-item"><a href="https://redis.io/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Redis</strong></a> — кэш и брокер сообщений в памяти</li>
            <li className="theory-list-item"><a href="https://clickhouse.com/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>ClickHouse</strong></a> — колоночная БД для аналитики</li>
            <li className="theory-list-item"><strong>ORM:</strong> <a href="https://www.prisma.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Prisma</a>, <a href="https://docs.sqlalchemy.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>SQLAlchemy</a>, <a href="https://gorm.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>GORM</a></li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Аналитика данных</h2>
        <p className="theory-intro">Аналитик собирает, обрабатывает, визуализирует и интерпретирует данные. Основной язык — Python, но SQL важен не меньше.</p>
        <ul className="theory-list">
          <li className="theory-list-item"><a href="https://pandas.pydata.org/docs" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>pandas</strong></a> — работа с табличными данными</li>
          <li className="theory-list-item"><a href="https://numpy.org/doc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>NumPy</strong></a> — численные вычисления, матрицы</li>
          <li className="theory-list-item"><strong>Визуализация:</strong> <a href="https://matplotlib.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Matplotlib</a>, <a href="https://seaborn.pydata.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Seaborn</a>, <a href="https://plotly.com/python" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Plotly</a></li>
          <li className="theory-list-item"><a href="https://jupyter.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Jupyter Notebook</strong></a> — интерактивная среда анализа</li>
          <li className="theory-list-item"><strong>SQL</strong> — обязательный инструмент любого аналитика</li>
          <li className="theory-list-item"><strong>BI:</strong> <a href="https://www.tableau.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Tableau</a>, <a href="https://powerbi.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Power BI</a>, <a href="https://grafana.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Grafana</a>, <a href="https://superset.apache.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Superset</a>, <a href="https://www.metabase.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Metabase</a></li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Machine Learning</h2>
        <p className="theory-intro">ML-инженер и Data Scientist работают на стыке математики, программирования и предметной области. Порог входа высокий, но спрос устойчив.</p>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Базовые библиотеки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://scikit-learn.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>scikit-learn</strong></a> — классические ML-алгоритмы</li>
            <li className="theory-list-item"><strong>Градиентный бустинг:</strong> <a href="https://xgboost.readthedocs.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>XGBoost</a>, <a href="https://lightgbm.readthedocs.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>LightGBM</a>, <a href="https://catboost.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>CatBoost</a> (лидер на табличных данных)</li>
          </ul>
        </div>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Deep Learning и LLM (тренд 2024-2026)</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://pytorch.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>PyTorch</strong></a> — доминирующий фреймворк для исследований и продакшена</li>
            <li className="theory-list-item"><a href="https://tensorflow.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>TensorFlow / Keras</strong></a> — по-прежнему используется в энтерпрайзе</li>
            <li className="theory-list-item"><strong>LLM фреймворки:</strong> <a href="https://python.langchain.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>LangChain</a>, <a href="https://docs.llamaindex.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>LlamaIndex</a></li>
            <li className="theory-list-item"><a href="https://huggingface.co/docs/transformers" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Hugging Face Transformers</strong></a> — стандарт для NLP</li>
            <li className="theory-list-item"><a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Ollama</strong></a> — запуск локальных LLM</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Кибербезопасность</h2>
        <p className="theory-intro">Специалист должен понимать, как работают системы, сети и приложения — и как их взломать, чтобы защитить.</p>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Языки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://www.python.org/doc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Python</strong></a> — скрипты, автоматизация, инструменты анализа</li>
            <li className="theory-list-item"><a href="https://www.gnu.org/software/bash/manual" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Bash / Shell</strong></a> — работа в Linux</li>
            <li className="theory-list-item"><strong>C / C++</strong> — уязвимости низкого уровня, reverse engineering</li>
          </ul>
        </div>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Ключевые инструменты</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://www.kali.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Kali Linux</strong></a> / <a href="https://www.parrotsec.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Parrot OS</strong></a> — дистрибутивы для пентеста</li>
            <li className="theory-list-item"><a href="https://nmap.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Nmap</strong></a> — сетевое сканирование, <a href="https://portswigger.net/burp" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Burp Suite</strong></a> — анализ веб-приложений</li>
            <li className="theory-list-item"><a href="https://www.wireshark.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Wireshark</strong></a> — анализ трафика, <a href="https://www.metasploit.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Metasploit</strong></a> — тестирование на проникновение</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Универсальные инструменты разработчика</h2>
        <p className="theory-intro">Независимо от направления есть инструменты, которые нужны всем.</p>
        <ul className="theory-list">
          <li className="theory-list-item"><a href="https://git-scm.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Git</strong></a> — система контроля версий (абсолютный стандарт). <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>GitHub</a>, <a href="https://gitlab.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>GitLab</a>, <a href="https://bitbucket.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Bitbucket</a>, CI/CD</li>
          <li className="theory-list-item"><strong>Командная строка и Linux</strong> — большинство серверов на Linux. <a href="https://www.man7.org/linux/man-pages/man1/ssh.1.html" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>SSH</a>, bash-скрипты</li>
          <li className="theory-list-item"><a href="https://docker.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>Docker</strong></a> — контейнеризация, решает «у меня работает, а на сервере нет». <a href="https://kubernetes.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Kubernetes</a> для оркестрации</li>
          <li className="theory-list-item"><strong>Облачные платформы:</strong> <a href="https://aws.amazon.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>AWS</a>, <a href="https://cloud.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Google Cloud</a>, <a href="https://azure.microsoft.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Azure</a></li>
          <li className="theory-list-item"><strong>REST API и HTTP</strong> — методы, статус-коды, JSON. <a href="https://www.postman.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Postman</a> для тестирования</li>
          <li className="theory-list-item"><a href="https://code.visualstudio.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}><strong>VS Code</strong></a> — самый популярный редактор. <a href="https://www.jetbrains.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>JetBrains IDE</a>, <a href="https://neovim.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Neovim</a></li>
          <li className="theory-list-item"><strong>AI-инструменты:</strong> <a href="https://github.com/features/copilot" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>GitHub Copilot</a>, <a href="https://cursor.sh" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Cursor</a>, <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>Claude</a>, <a href="https://chatgpt.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline' }}>ChatGPT</a></li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Рынок труда 2026: что выбрать</h2>
        <TheoryTable
          headers={['Направление', 'Топ-стек']}
          rows={[
            ['Фронтенд', 'TypeScript + React/Next.js, Tailwind + Vite'],
            ['Бэкенд', 'Python (FastAPI/Django), Node.js (NestJS), Go'],
            ['Аналитика', 'Python + SQL, dbt, BI-инструменты'],
            ['ML/AI', 'PyTorch + scikit-learn, LangChain, Hugging Face'],
            ['Кибербезопасность', 'Python + Linux + Bash'],
          ]}
        />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Не пытайся выучить всё сразу. Выбери одно направление, освой базу, начни применять. Глубина важнее ширины! 🚀</p>
      </section>
    </div>
  )
}
