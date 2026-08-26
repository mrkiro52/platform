import { useState } from 'react'

/* ─── UI helpers ─── */
const S = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)
const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>
const Lime = ({ children }) => <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{children}</span>
const Red = ({ children }) => <span style={{ color: '#f87171', fontWeight: 600 }}>{children}</span>

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => (
      <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 5 }}>{item}</li>
    ))}
  </ul>
)

const Card = ({ children, accent }) => (
  <div style={{
    background: 'var(--bg-secondary)',
    border: `1px solid ${accent ? 'rgba(255,214,10,0.3)' : 'var(--border-color)'}`,
    borderRadius: 10,
    padding: 'clamp(14px,3vw,20px)',
    margin: '14px 0',
  }}>{children}</div>
)

const Good = ({ children }) => (
  <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.25)', borderRadius: 8, padding: '12px 16px', margin: '10px 0', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
    <span style={{ color: '#4ade80', fontWeight: 700, marginRight: 6 }}>✅</span>{children}
  </div>
)
const Bad = ({ children }) => (
  <div style={{ background: 'rgba(248,113,113,0.07)', border: '1px solid rgba(248,113,113,0.25)', borderRadius: 8, padding: '12px 16px', margin: '10px 0', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
    <span style={{ color: '#f87171', fontWeight: 700, marginRight: 6 }}>❌</span>{children}
  </div>
)
const Note = ({ children }) => (
  <div style={{ background: 'rgba(255,214,10,0.05)', border: '1px solid rgba(255,214,10,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>{children}
  </div>
)

const SectionHead = ({ n, title, sub }) => (
  <div style={{ margin: '52px 0 20px' }}>
    <div style={{ color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>Раздел {n}</div>
    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(20px,4vw,27px)', fontWeight: 800, fontFamily: 'var(--font-syne)', margin: '0 0 6px', borderBottom: '2px solid var(--accent-lime)', paddingBottom: 10 }}>{title}</h2>
    {sub && <p style={{ color: 'var(--text-tertiary)', fontSize: 13, margin: '8px 0 0' }}>{sub}</p>}
  </div>
)

/* ─── Interactive: XYZ formula builder ─── */
function XYZBuilder() {
  const [x, setX] = useState('увеличил скорость загрузки страницы')
  const [y, setY] = useState('на 40%')
  const [z, setZ] = useState('внедрив ленивую загрузку изображений и code-splitting')
  const result = x && y && z ? `${x.charAt(0).toUpperCase() + x.slice(1)} ${y} ${z}.` : '...'

  return (
    <Card accent>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Конструктор фразы по формуле Google XYZ</div>
      <div style={{ display: 'grid', gap: 10, marginBottom: 16 }}>
        {[
          { label: 'X — Что сделал / чего достиг', val: x, set: setX, placeholder: 'увеличил скорость загрузки страницы' },
          { label: 'Y — На сколько / в каких цифрах', val: y, set: setY, placeholder: 'на 40%' },
          { label: 'Z — Как / каким способом', val: z, set: setZ, placeholder: 'внедрив lazy loading и code-splitting' },
        ].map(({ label, val, set, placeholder }) => (
          <div key={label}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>{label}</div>
            <input
              value={val}
              onChange={e => set(e.target.value)}
              placeholder={placeholder}
              style={{
                width: '100%', boxSizing: 'border-box',
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                borderRadius: 7, padding: '8px 12px', color: 'var(--text-primary)',
                fontSize: 13, outline: 'none',
              }}
            />
          </div>
        ))}
      </div>
      <div style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '14px 16px' }}>
        <div style={{ fontSize: 11, color: 'var(--accent-lime)', fontWeight: 700, marginBottom: 6 }}>Готовая фраза для резюме:</div>
        <div style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>"{result}"</div>
      </div>
    </Card>
  )
}

/* ─── Interactive: ATS scanner ─── */
function ATSChecker() {
  const keywords = [
    // Frontend
    'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Next.js', 'Nuxt', 'Svelte',
    'HTML', 'CSS', 'Sass', 'Tailwind', 'Webpack', 'Vite', 'Redux', 'Zustand',
    'Jest', 'Cypress', 'Figma', 'WebSocket',
    // Backend
    'Python', 'Node.js', 'Java', 'Go', 'Kotlin', 'C#', 'PHP', 'Ruby',
    'FastAPI', 'Django', 'Flask', 'Express', 'Spring', 'NestJS', 'Laravel',
    'REST API', 'GraphQL', 'gRPC', 'Kafka', 'RabbitMQ', 'Celery',
    'JWT', 'OAuth', 'OpenAPI', 'Swagger',
    // Базы данных
    'SQL', 'PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Redis', 'Elasticsearch',
    'ClickHouse', 'Cassandra', 'DynamoDB',
    // DevOps
    'Git', 'Docker', 'Kubernetes', 'CI/CD', 'Linux', 'Nginx', 'Ansible', 'Terraform',
    'GitHub Actions', 'GitLab CI', 'Jenkins', 'AWS', 'GCP', 'Azure',
    // ML / Data
    'TensorFlow', 'PyTorch', 'scikit-learn', 'pandas', 'NumPy', 'Jupyter',
    'Airflow', 'MLflow', 'Spark', 'dbt', 'Tableau', 'Power BI',
    // Аналитика
    'Excel', 'Google Sheets', 'Looker', 'Metabase', 'A/B testing', 'Matplotlib', 'Seaborn',
  ]
  const [text, setText] = useState('')
  const found = keywords.filter(k => text.toLowerCase().includes(k.toLowerCase()))
  const score = Math.round((found.length / keywords.length) * 100)

  return (
    <Card>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Симулятор ATS — как робот читает твоё резюме</div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Вставь сюда текст раздела «Навыки» или «Опыт» из своего резюме..."
        style={{
          width: '100%', boxSizing: 'border-box', minHeight: 100,
          background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
          borderRadius: 8, padding: '10px 12px', color: 'var(--text-primary)',
          fontSize: 13, lineHeight: 1.6, resize: 'vertical', outline: 'none',
        }}
      />
      <div style={{ marginTop: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <div style={{ flex: 1, height: 8, background: 'var(--bg-tertiary)', borderRadius: 4, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${score}%`, background: score >= 60 ? 'var(--accent-lime)' : score >= 30 ? '#fb923c' : '#f87171', borderRadius: 4, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: 15, color: score >= 60 ? 'var(--accent-lime)' : score >= 30 ? '#fb923c' : '#f87171', minWidth: 44 }}>{score}%</span>
        </div>
        {found.length > 0 && (
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
            {found.map(k => <span key={k} style={{ background: 'rgba(74,222,128,0.15)', border: '1px solid rgba(74,222,128,0.3)', color: '#4ade80', borderRadius: 5, padding: '2px 8px', fontSize: 12 }}>{k}</span>)}
          </div>
        )}
        {text.length === 0
          ? <S style={{ fontSize: 12 }}>Начни вводить текст — покажем какие ключевые слова нашёл ATS-робот.</S>
          : <S style={{ fontSize: 12, margin: 0 }}>Найдено {found.length} из {keywords.length} технологий в базе.</S>
        }
      </div>
    </Card>
  )
}

/* ─── Interactive: Photo check ─── */
function PhotoCheck() {
  return (
    <Card>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Какое фото ставить в резюме?</div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Подходит</div>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {[
            'Деловой или smart casual стиль одежды, нейтральный фон (белый, серый, светлый).',
            'Лицо хорошо освещено, занимает 60–70% кадра, смотришь в камеру.',
            'Профессиональная съёмка или качественное фото с хорошим смартфоном.',
          ].map((t, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 4 }}>{t}</li>)}
        </ul>
      </div>
      <div>
        <div style={{ color: '#f87171', fontWeight: 700, fontSize: 13, marginBottom: 6 }}>Не подходит</div>
        <ul style={{ paddingLeft: 20, margin: 0 }}>
          {[
            'Фото с вечеринок, праздников, с алкоголем или в неформальной обстановке.',
            'Пляжные и туристические снимки.',
            'Групповые фото — HR не должен угадывать, кто ты.',
            'Селфи с телефона, особенно в зеркало.',
            'Фото в тёмном месте, против света или сильно размытые.',
          ].map((t, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 4 }}>{t}</li>)}
        </ul>
      </div>
    </Card>
  )
}

/* ─── Interactive: Experience without experience ─── */
function NoExpBuilder() {
  const [tab, setTab] = useState(0)
  const tabs = [
    {
      label: '🎓 Учёба',
      items: [
        'Курсовой проект / диплом — опиши стек, что реализовал, какую проблему решал.',
        'Лабораторные по программированию — если реализовывал что-то интересное.',
        'Командные проекты в универе — роль, что конкретно делал ты.',
        'Хакатоны и олимпиады — призовые места, участие.',
        'Курсы (Stepik, Coursera, Yandex, HEX, KIRO) — с результатами и проектами.',
      ],
    },
    {
      label: '🛠️ Пет-проекты',
      items: [
        'Телеграм-бот (даже простой) — расскажи что делает, сколько пользователей, стек.',
        'Сайт/SPA на React или Vue — портфолио, интернет-магазин, резюме-сайт.',
        'CLI-утилита на Python — автоматизация, парсер, конвертер.',
        'Игра на pygame/Unity — расскажи механику, что было сложно.',
        'Вклад в open source — даже небольшой PR или фикс бага.',
        'Клон известного сервиса (Twitter, Trello) — учебный, но показывает понимание.',
      ],
    },
    {
      label: '💼 Внеучебное',
      items: [
        'Стажировка (даже неоплачиваемая, даже 1 месяц) — полноценная строчка в резюме.',
        'Фриланс — даже один заказ оформи как опыт с описанием задачи.',
        'Помогал другу/знакомому с сайтом/автоматизацией — оформи как проект.',
        'Тьютор/наставник по программированию — преподавание = soft skill.',
        'IT-волонтёрство — верстал сайт для НКО, делал бота для сообщества.',
      ],
    },
  ]
  return (
    <Card accent>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Что писать если нет коммерческого опыта?</div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {tabs.map((t, i) => (
          <button key={i} onClick={() => setTab(i)} style={{
            background: tab === i ? 'var(--accent-lime)' : 'var(--bg-tertiary)',
            color: tab === i ? '#0a0a14' : 'var(--text-secondary)',
            border: `1px solid ${tab === i ? 'var(--accent-lime)' : 'var(--border-color)'}`,
            borderRadius: 7, padding: '6px 14px', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          }}>{t.label}</button>
        ))}
      </div>
      <Ul items={tabs[tab].items} />
    </Card>
  )
}

/* ─── Interactive: ATS structure visualiser ─── */
function ATSStructure() {
  const [hover, setHover] = useState(null)
  const blocks = [
    { id: 'header', label: 'Имя + Контакты', weight: 'critical', tip: 'Имя полностью, телефон, email, город (без точного адреса), GitHub, LinkedIn. ATS выдёргивает эти данные автоматически — формат должен быть стандартным.' },
    { id: 'summary', label: 'Summary / О себе', weight: 'high', tip: '2–4 предложения. Кто ты + что умеешь + что ищешь. Не "коммуникабельный и ответственный", а "Junior Python-разработчик с опытом разработки Telegram-ботов и REST API на FastAPI".' },
    { id: 'skills', label: 'Навыки', weight: 'critical', tip: 'ATS сканирует именно этот блок. Пиши технологии так же, как в вакансии: "PostgreSQL", а не "Postgres". Раздели на категории: языки, фреймворки, БД, инструменты.' },
    { id: 'exp', label: 'Опыт / Проекты', weight: 'critical', tip: 'Каждый пункт по формуле XYZ (что сделал + на сколько + как). Обратный хронологический порядок (новые выше). Для джуна: пет-проекты и учебные проекты — полноценный опыт.' },
    { id: 'edu', label: 'Образование', weight: 'medium', tip: 'Название вуза / курса, специальность, годы (если учишься — напиши "2022–2026 (в процессе)"). GPA пиши только если 4.5+ по 5.0. Курсы — отдельным блоком или подпунктом.' },
    { id: 'extra', label: 'Доп. секции', weight: 'low', tip: 'Языки (English B2), сертификаты, публикации, хакатоны, волонтёрство. Не обязательно, но добавляет очков если есть что написать.' },
  ]
  const colors = { critical: '#4ade80', high: 'var(--accent-lime)', medium: '#fb923c', low: 'var(--text-tertiary)' }
  const labels = { critical: 'Критично для ATS', high: 'Важно', medium: 'Рекомендуется', low: 'Опционально' }

  return (
    <Card>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Структура резюме: кликни на блок чтобы узнать подробнее</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 14 }}>
        {Object.entries(colors).map(([k, c]) => (
          <span key={k} style={{ fontSize: 11, color: c, background: 'var(--bg-tertiary)', border: `1px solid ${c}`, borderRadius: 5, padding: '2px 8px' }}>{labels[k]}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gap: 6, maxWidth: 420 }}>
        {blocks.map(b => (
          <div
            key={b.id}
            onClick={() => setHover(hover === b.id ? null : b.id)}
            style={{
              background: hover === b.id ? 'var(--bg-tertiary)' : 'var(--bg-secondary)',
              border: `2px solid ${hover === b.id ? colors[b.weight] : 'var(--border-color)'}`,
              borderRadius: 8, padding: '10px 14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.15s',
            }}
          >
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>{b.label}</span>
            <span style={{ fontSize: 11, color: colors[b.weight], background: 'var(--bg-tertiary)', border: `1px solid ${colors[b.weight]}`, borderRadius: 4, padding: '2px 6px' }}>{labels[b.weight]}</span>
          </div>
        ))}
      </div>
      {hover && (
        <div style={{ marginTop: 14, background: 'var(--bg-tertiary)', borderRadius: 8, padding: '12px 14px', fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
          {blocks.find(b => b.id === hover)?.tip}
        </div>
      )}
    </Card>
  )
}

/* ─── Main ─── */
export default function Day29ResumeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Резюме IT-джуна: пишем первую версию</h1>
      </section>

      {/* ─── 1. Что такое ATS ─── */}
      <SectionHead n="01" title="Что такое ATS и почему это важно" sub="Applicant Tracking System — первый фильтр, который читает твоё резюме вместо человека" />

      <S><B>ATS (Applicant Tracking System)</B> — программа, которую используют большинство компаний с оформленным HR-процессом. Когда ты отправляешь резюме на hh.ru, LinkedIn или через сайт компании, первым его читает <Lime>не человек, а алгоритм</Lime>. Он парсит текст, ищет ключевые слова из описания вакансии и присваивает твоему резюме скоринговый балл.</S>
      <S>Если балл ниже порога — HR <B>никогда не увидит твоё резюме</B>, даже если ты идеальный кандидат. По данным Jobscan, более 75% резюме отсеиваются ещё на стадии ATS.</S>

      <ATSChecker />

      <SectionHead n="02" title="Структура резюме: что и куда" sub="Порядок блоков влияет на то, как ATS и HR воспринимают документ" />

      <ATSStructure />

      <S style={{ marginTop: 16 }}>Важное правило: <B>одна страница</B> для джуна без опыта или с минимальным опытом. Две страницы — только если есть реальный коммерческий опыт от 2 лет. Не растягивай резюме воздухом.</S>
      <Note>Формат файла: <B>PDF</B> — всегда. Word (.docx) только если явно просят. PDF сохраняет форматирование и не съезжает при открытии на другом компьютере. Название файла: <code style={{ background: 'var(--bg-tertiary)', borderRadius: 4, padding: '1px 6px', fontSize: 13 }}>Иванов_Иван_Junior_Python.pdf</code> — не "resume_final_v3.pdf".</Note>

      {/* ─── 3. Фото ─── */}
      <SectionHead n="03" title="Фото: что ставить и что нет" sub="Первое что видит HR — это твоё лицо. Оно должно работать на тебя" />

      <PhotoCheck />

      <S>Технические требования к фото:</S>
      <Ul items={[
        'Разрешение от 400×400 px, квадратное или прямоугольное (3:4).',
        'Лицо занимает 60–70% кадра — не слишком далеко, не слишком близко.',
        'Нейтральный или однотонный фон (белый, серый, светло-голубой).',
        'Хорошее освещение: не в темноте, не в пересвет, не сзади источника света.',
        'Деловой или smart casual стиль одежды, видна верхняя часть тела.',
      ]} />
      <Note>В некоторых странах (США, Великобритания) фото в резюме не принято вообще — чтобы избежать дискриминации. В России и СНГ — ставить фото нормально и даже ожидаемо.</Note>

      {/* ─── 4. Формула XYZ ─── */}
      <SectionHead n="04" title="Формула Google XYZ для описания опыта" sub="Accomplished [X] as measured by [Y], by doing [Z]" />

      <S>Google при составлении описаний вакансий и оценке кандидатов использует формулу <B>XYZ</B>. Суть проста: <Lime>что сделал</Lime> + <Lime>в каких цифрах это измерено</Lime> + <Lime>каким способом</Lime>.</S>

      <Card>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { letter: 'X', color: '#60a5fa', title: 'Accomplished', desc: 'Что сделал / достиг' },
            { letter: 'Y', color: 'var(--accent-lime)', title: 'Measured by', desc: 'Цифры, метрики, % рост' },
            { letter: 'Z', color: '#c084fc', title: 'By doing', desc: 'Как, каким методом' },
          ].map(b => (
            <div key={b.letter} style={{ background: 'var(--bg-tertiary)', borderRadius: 8, padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 28, color: b.color }}>{b.letter}</div>
              <div style={{ fontFamily: 'monospace', fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>{b.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </Card>

      <XYZBuilder />

      <S>Примеры трансформации:</S>
      <Bad>«Делал фичи для бэкенда» — нет конкретики, не понятно что именно, нет цифр</Bad>
      <Good>«Разработал модуль кэширования на Redis, сократив время ответа API с 800 до 120 мс (в 6× раз) для эндпоинтов каталога товаров»</Good>
      <Bad>«Работал с базами данных»</Bad>
      <Good>«Оптимизировал 5 SQL-запросов в PostgreSQL, добавив составные индексы — время выполнения сократилось с 2.3 с до 180 мс»</Good>
      <Bad>«Писал тесты»</Bad>
      <Good>«Покрыл unit-тестами (pytest) критические функции платёжного модуля, подняв test coverage с 34% до 81%»</Good>

      {/* ─── 5. Нет опыта ─── */}
      <SectionHead n="05" title="Нет коммерческого опыта — что писать?" sub="Отсутствие опыта — не приговор. У всех джунов его нет. Важно правильно упаковать то, что есть" />

      <S>Нет опыта работы — не проблема. Проблема — пустое резюме. Компании нанимают джунов именно за потенциал, а не за коммерческий стаж. Твоя задача показать, что ты <B>умеешь думать, учиться и что-то делаешь руками</B>.</S>

      <NoExpBuilder />

      <S style={{ marginTop: 16 }}>Как оформить пет-проект в резюме:</S>
      <Card>
        <div style={{ fontFamily: 'monospace', fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.8 }}>
          <div style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>Telegram-бот для отслеживания расходов</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, marginBottom: 8 }}>Пет-проект · Python, aiogram, SQLite · 2025</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>
            • Разработал Telegram-бот для учёта личных расходов с категоризацией и еженедельными отчётами.<br/>
            • Реализовал хранение данных в SQLite, FSM для диалогов, экспорт статистики в CSV.<br/>
            • Задеплоил на VPS (Ubuntu + systemd), бот работает стабильно &gt;3 месяцев.<br/>
            • 12 активных пользователей среди знакомых.<br/>
            <span style={{ color: 'var(--accent-lime)' }}>→ GitHub: github.com/username/expense-bot</span>
          </div>
        </div>
      </Card>

      {/* ─── 6. Summary / О себе ─── */}
      <SectionHead n="06" title="Summary: как написать о себе" sub="2–4 предложения, которые HR читает в первую очередь" />

      <S>Summary — это не "о себе" в смысле "я люблю путешествовать и читать книги". Это <B>профессиональный elevator pitch</B>: кто ты, что умеешь, чем полезен компании.</S>

      <Bad>«Коммуникабельный, ответственный, стрессоустойчивый. Быстро обучаюсь и работаю в команде. Ищу интересную работу в дружном коллективе.»</Bad>

      <Good>«Junior Python-разработчик с 8 месяцами практики в разработке REST API (FastAPI, PostgreSQL) и Telegram-ботов (aiogram). Реализовал 3 пет-проекта с деплоем в продакшн. Ищу позицию бэкенд-разработчика в команду с менторством.»</Good>

      <S>Шаблон summary для джуна без опыта:</S>
      <Card>
        <div style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <span style={{ color: 'var(--accent-lime)' }}>[Роль]</span> с <span style={{ color: 'var(--accent-lime)' }}>[N месяцев]</span> практики в <span style={{ color: 'var(--accent-lime)' }}>[стек/направление]</span>.<br/>
          Реализовал <span style={{ color: 'var(--accent-lime)' }}>[N проектов / что конкретно]</span>, включая <span style={{ color: 'var(--accent-lime)' }}>[самый сильный пример]</span>.<br/>
          Ищу позицию <span style={{ color: 'var(--accent-lime)' }}>[роль]</span> в компании <span style={{ color: 'var(--accent-lime)' }}>[с менторством / в продуктовой команде / с фокусом на X]</span>.
        </div>
      </Card>

      <S>Что точно <Red>не писать</Red> в summary:</S>
      <Ul items={[
        '"Коммуникабельный, ответственный, целеустремлённый" — это говорят все, это ничего не значит.',
        '"Ищу интересную работу" — слишком расплывчато, не говорит что ты ищешь.',
        '"Готов работать за небольшую зарплату" — обесцениваешь себя.',
        '"Ищу свою первую работу" — лучше сформулируй чем можешь быть полезен.',
      ]} />

      {/* ─── 7. Навыки ─── */}
      <SectionHead n="07" title="Раздел «Навыки»: что и как писать" sub="ATS читает именно этот блок — здесь важна точность формулировок" />

      <S>Пиши технологии <B>так же как написано в вакансии</B>. ATS ищет точные совпадения: "PostgreSQL" ≠ "Postgres" ≠ "psql". Если в вакансии написано "React.js" — пиши "React.js", а не просто "React".</S>

      <Card>
        <ul style={{ paddingLeft: 20, margin: 0, columns: 2, columnGap: 32 }}>
          {[
            { title: 'Языки', items: ['Python 3', 'JavaScript (ES6+)', 'TypeScript', 'SQL'] },
            { title: 'Фреймворки', items: ['FastAPI', 'React', 'Node.js', 'aiogram'] },
            { title: 'Базы данных', items: ['PostgreSQL', 'SQLite', 'Redis'] },
            { title: 'Инструменты', items: ['Git', 'Docker', 'Linux', 'VS Code'] },
          ].map(cat => (
            <li key={cat.title} style={{ listStyle: 'none', marginBottom: 14, breakInside: 'avoid' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 13, marginBottom: 4 }}>{cat.title}</div>
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {cat.items.map(i => (
                  <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.75 }}>{i}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Card>

      <S>Что <Red>не стоит</Red> писать в навыках:</S>
      <Ul items={[
        'Microsoft Office, Google Docs — это не IT-навык, это базовая грамотность.',
        '"Интернет" — очевидно.',
        'Навыки в которых ты знаешь только "привет мир" — не пиши, спросят на собесе и будет неловко.',
        'Длинный список из 30+ технологий без структуры — выглядит как копипаст, а не реальные знания.',
      ]} />

      {/* ─── 8. Достижения ─── */}
      <SectionHead n="08" title="Достижения: какие писать, какие нет" sub="Конкретные цифры всегда лучше общих слов" />

      <S>Достижение в резюме — это измеримый результат, который ты создал. Без цифр это просто обязанность.</S>

      <div style={{ display: 'grid', gap: 0 }}>
        <Bad>«Участвовал в разработке проекта»</Bad>
        <Good>«Разработал REST API для модуля авторизации (JWT + refresh tokens), обрабатывающий 500+ запросов/сек»</Good>
        <Bad>«Улучшил производительность»</Bad>
        <Good>«Снизил время загрузки главной страницы с 4.2 до 1.8 сек через оптимизацию запросов и CDN для статики»</Good>
        <Bad>«Писал документацию»</Bad>
        <Good>«Написал техническую документацию (Confluence) для 3 микросервисов, сократив время онбординга новых разработчиков»</Good>
      </div>

      <S>Если нет цифр — сформулируй достижение через <B>масштаб или сложность</B>:</S>
      <Ul items={[
        '"Разработал с нуля" — это сильнее, чем "работал над".',
        '"Самостоятельно" — показывает инициативу и самостоятельность.',
        '"В срок" или "раньше дедлайна" — если это было нетривиально.',
        '"Первым в команде внедрил X" — показывает проактивность.',
      ]} />

      {/* ─── 9. ATS-оптимизация ─── */}
      <SectionHead n="09" title="ATS-оптимизация: пройти роботов" sub="Как адаптировать резюме под конкретную вакансию" />

      <S>Одно резюме на все вакансии — плохая стратегия. ATS ищет ключевые слова <B>конкретной вакансии</B>. Алгоритм под каждую вакансию:</S>

      <div style={{ display: 'grid', gap: 10, margin: '14px 0' }}>
        {[
          { n: '01', title: 'Прочитай описание вакансии', desc: 'Выпиши все технологии, инструменты и требования. Это ключевые слова, которые ищет ATS.' },
          { n: '02', title: 'Сравни со своим резюме', desc: 'Отметь какие слова из вакансии есть у тебя, а каких нет. Добавь недостающие — если честно умеешь.' },
          { n: '03', title: 'Адаптируй Summary', desc: 'Перепиши первый абзац под эту позицию. Упомяни роль из вакансии и главные требования.' },
          { n: '04', title: 'Пересмотри порядок навыков', desc: 'Технологии, упомянутые в вакансии, поставь выше. ATS и HR видят первые строки первыми.' },
          { n: '05', title: 'Проверь форматирование', desc: 'Никаких таблиц, колонок, SVG, хедеров/футеров. ATS парсит линейный текст — сложная вёрстка ломает парсер.' },
        ].map(step => (
          <div key={step.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: '12px 14px' }}>
            <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 18, color: 'var(--accent-lime)', flexShrink: 0, minWidth: 28 }}>{step.n}</div>
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: 14, marginBottom: 3 }}>{step.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6 }}>{step.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <Note>ATS не читает PDF как текст, если файл создан сканом или как изображение. Всегда делай <B>текстовый PDF</B> (экспорт из Google Docs, Notion, LaTeX) — не скан.</Note>

      {/* ─── 10. Формат и инструменты ─── */}
      <SectionHead n="10" title="Формат, инструменты и чеклист" sub="Где создать резюме и как проверить перед отправкой" />

      <S>Лучшие инструменты для создания резюме:</S>
      <Ul items={[
        'Google Docs — бесплатно, просто, легко редактировать, хорошо парсится ATS.',
        'Notion — гибко и красиво, экспортируй в PDF без лишних блоков.',
        'LaTeX (Overleaf) — идеально для tech-позиций, выглядит профессионально, но требует базовых навыков.',
        'hh.ru конструктор — если подаёшь через HH, оптимален для их внутреннего ATS.',
        'Canva — красивые шаблоны, но сложная вёрстка часто ломает ATS-парсинг. Использовать с осторожностью.',
      ]} />

      <S style={{ marginTop: 20 }}>Чеклист перед отправкой:</S>

      <div style={{ display: 'grid', gap: 6, margin: '10px 0' }}>
        {[
          'Резюме — PDF, не Word (если не просят Word)',
          'Имя файла: Фамилия_Имя_Роль.pdf',
          'Нет орфографических ошибок (проверь в Grammarly / LanguageTool)',
          'Все ссылки работают: GitHub, LinkedIn, портфолио',
          'Email рабочий — не "pupkin007@mail.ru"',
          'Телефон актуальный',
          'Фото профессиональное (если добавляешь)',
          'Summary адаптировано под эту конкретную вакансию',
          'Ключевые слова из вакансии присутствуют',
          'Опыт описан по формуле XYZ с цифрами',
          'Нет таблиц и колонок (портят ATS-парсинг)',
          '1 страница для джуна (максимум 2)',
          'Хронология обратная (новое сверху)',
          'GitHub профиль заполнен: фото, bio, закреплены лучшие репозитории',
        ].map((item, i) => (
          <div key={i} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '8px 14px', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</div>
        ))}
      </div>

      <section className="theory-section theory-section--closing" style={{ marginTop: 48 }}>
        <p className="theory-closing-text">Лучший способ улучшить резюме — отправить его, получить отказ и узнать причину.</p>
      </section>
    </div>
  )
}
