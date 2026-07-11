import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', blue: '#60a5fa', green: '#4ade80', red: '#f87171', yellow: '#facc15', indigo: '#818cf8', border: '#2a2a3a' }

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

// Карточка идеи пет-проекта
function Idea({ n, title, accent, essence, stack, features }) {
  return (
    <div style={{ margin: '16px 0', padding: '16px 18px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{
          flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: `${accent}22`,
          color: accent, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{n}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 17 }}>{title}</span>
      </div>
      <p style={{ margin: '0 0 10px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
        <strong style={{ color: accent }}>Суть: </strong>{essence}
      </p>
      <p style={{ margin: '0 0 10px', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
        <strong style={{ color: accent }}>Стек: </strong>{stack}
      </p>
      <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>
        <strong style={{ color: accent }}>Что реализовать: </strong>{features}
      </p>
    </div>
  )
}

export default function July1112PetProjectTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Делаем пет-проект</h1>
        <p className="theory-subtitle">Все треки</p>
        <p className="theory-date">11–12 июля 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Требования к оформлению репозитория</h2>
        <P n={1}>
          Даже простой проект производит совершенно разное впечатление в зависимости от оформления. Минимальный
          набор, который должен быть в любом репозитории:
        </P>
        <TheoryTable
          headers={['Что', 'Зачем']}
          rows={[
            ['README.md', 'единственное, что читают в первую очередь — описание, скриншоты, ссылка на демо'],
            ['.gitignore', 'чтобы в репозиторий не попали node_modules, __pycache__, .env, venv'],
            ['.env.example', 'шаблон переменных окружения без реальных секретов'],
            ['requirements.txt / package.json', 'зафиксированные зависимости — проект должен воспроизводиться'],
            ['Понятная структура папок', 'backend/frontend, src/, tests/ — а не всё вперемешку в корне'],
            ['Осмысленные коммиты', 'история коммитов — тоже часть впечатления, а не «fix», «fix2», «asdf»'],
          ]}
        />
        <TheoryExample title="Секреты никогда не коммитят">
          Пароли, API-ключи, секретные токены — только в <code>.env</code>, который лежит в{' '}
          <code>.gitignore</code>. Если случайно закоммитил секрет — считай его скомпрометированным: смени его,
          недостаточно просто удалить из следующего коммита (в истории git он останется).
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Где взять данные для ML и аналитики</h2>
        <P n={2}>
          Для проектов по машинному обучению и аналитике данные нужны сразу — до всякого кода. Есть три основных
          источника, и часто их комбинируют.
        </P>
        <Term name="Готовые датасеты (Kaggle и аналоги)">
          <a href="https://www.kaggle.com/datasets" target="_blank" rel="noopener noreferrer">kaggle.com/datasets</a>{' '}
          — крупнейшая площадка учебных и реальных датасетов на любую тему (недвижимость, зарплаты, отток
          клиентов, автомобили). Похожие площадки: <a href="https://archive.ics.uci.edu/" target="_blank" rel="noopener noreferrer">UCI Machine Learning Repository</a>,{' '}
          <a href="https://huggingface.co/datasets" target="_blank" rel="noopener noreferrer">Hugging Face Datasets</a>,{' '}
          встроенные учебные датасеты <code>sklearn.datasets</code> (California Housing, Diabetes) и{' '}
          <code>seaborn.load_dataset(...)</code>. Плюс — реальные данные с реальным шумом; минус — датасет может
          быть уже «причёсан» за тебя, поэтому для практики советуют брать «сырую» версию (raw), а не
          предобработанную.
        </Term>
        <Term name="Синтетические (сгенерированные) данные">
          данные, которые ты создаёшь сам по формуле или случайному распределению — полезны, когда нужен полный
          контроль над зависимостью (проверить, что модель действительно её находит) или готового датасета под
          тему просто нет.
        </Term>
        <TheoryCode language="python" code={`import numpy as np

# Линейная зависимость y = 3x + 5 с добавленным случайным шумом
np.random.seed(42)
x = np.random.uniform(0, 10, size=200)
noise = np.random.normal(0, 1.5, size=200)   # шум делает задачу "реалистичной"
y = 3 * x + 5 + noise

# sklearn умеет генерировать датасеты под задачу регрессии/классификации в одну строку
from sklearn.datasets import make_regression
X, y = make_regression(n_samples=300, n_features=3, noise=10, random_state=42)`} />
        <Term name="Синтетика через нейросеть/LLM">
          для табличных данных с осмысленным текстом (описания вакансий, отзывы, категории товаров) можно
          сгенерировать правдоподобные записи с помощью языковой модели (ChatGPT, Claude) — попросить сгенерировать
          N строк в формате CSV/JSON с заданной структурой и разумным разбросом значений. Хорошо подходит, если
          нужен именно текст, а не только числа, или готового датасета по узкой теме не существует.
        </Term>
        <TheoryExample title="Что выбрать для своего проекта">
          Для проектов по <strong>линейной регрессии</strong> (ML-трек) — быстрее и надёжнее сгенерировать
          синтетику самому: сразу знаешь настоящую зависимость и можешь проверить, что модель её нашла. Для{' '}
          <strong>аналитики</strong> (воронки, отток, рынок вакансий) — реалистичнее и интереснее взять готовый
          датасет с Kaggle: там уже есть настоящие аномалии и пропуски, с которыми приходится разбираться.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Структура README</h2>
        <P n={3}>
          README — это витрина проекта. Хороший README отвечает на четыре вопроса за 30 секунд чтения: что это,
          как выглядит, как запустить, на чём сделано.
        </P>
        <TheoryCode language="markdown" code={`# Название проекта

Одно-два предложения: что это и зачем.

![Скриншот или GIF с демо](docs/screenshot.png)

🔗 Демо: https://my-project.vercel.app

## Стек
- Backend: Django REST Framework, PostgreSQL
- Frontend: React, TypeScript
- Аутентификация: JWT

## Функциональность
- регистрация и вход по JWT
- CRUD для задач
- WebSocket-уведомления в реальном времени

## Запуск локально
\`\`\`bash
git clone https://github.com/username/project.git
cd project
pip install -r requirements.txt
cp .env.example .env      # заполнить своими значениями
python manage.py migrate
python manage.py runserver
\`\`\`

## Автор
Имя · [telegram](https://t.me/username) · [резюме](https://...)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Деплой: где размещать проект</h2>
        <P n={4}>
          Ссылка на живую версию в README сильно поднимает доверие к проекту — рекрутеру не нужно поднимать его
          локально, чтобы посмотреть. Способ деплоя зависит от того, что за проект.
        </P>
        <Term name="GitHub Pages">
          бесплатный хостинг для <strong>статики</strong> — подходит для чистого frontend без своего бэкенда
          (HTML/CSS/JS, React-сборка без сервера). Публикует содержимое ветки или папки <code>docs/</code>{' '}
          напрямую из репозитория.
        </Term>
        <Term name="Vercel / Netlify">
          тоже в первую очередь для frontend, но удобнее GitHub Pages: автоматический деплой при каждом push,
          свой домен, поддержка серверных функций (serverless) для лёгкого бэкенда.
        </Term>
        <Term name="Render / Railway">
          подходят, когда есть полноценный бэкенд (Django, FastAPI) и своя база данных — в отличие от GitHub
          Pages и Vercel, там поднимается настоящий сервер, а не только статика.
        </Term>
        <TheoryTable
          headers={['Тип проекта', 'Куда деплоить']}
          rows={[
            ['Чистый frontend (HTML/CSS/JS, React без бэкенда)', 'GitHub Pages, Vercel, Netlify'],
            ['Frontend + API (React + Django/FastAPI)', 'Frontend — Vercel; backend — Render/Railway'],
            ['ML-проект с ноутбуком', 'Google Colab / GitHub — ссылка на .ipynb с уже выполненными ячейками'],
            ['CLI-утилита (кибербезопасность)', 'деплой не нужен — важна инструкция запуска в README'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Команды для запуска — что должно быть готово</h2>
        <P n={5}>
          В README всегда должен быть блок «Как запустить» с точными командами — человек должен суметь запустить
          проект, скопировав их одну за другой, не думая.
        </P>
        <TheoryCode language="bash" code={`# Backend (Django)
python -m venv venv && source venv/bin/activate   # или venv\\Scripts\\activate на Windows
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver

# Frontend (React/Vite)
npm install
cp .env.example .env
npm run dev

# Через Docker (если есть docker-compose.yml) — самый надёжный вариант
docker compose up --build`} />
        <TheoryExample title="Docker — необязательно, но большой плюс">
          Если добавить <code>docker-compose.yml</code>, проект запускается одной командой на любой машине без
          «а у меня Python другой версии». Для джуниора это необязательно, но заметно выделяет проект среди
          остальных.
        </TheoryExample>
      </section>

      {/* ===== ВЕБ-РАЗРАБОТКА ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Идеи пет-проектов: Веб-разработка</h2>
        <P n={6}>
          Все пять идей закрывают одинаковый набор навыков — Django + ORM + база данных/SQL, регистрация и вход,
          JWT-аутентификация, валидация ошибок на бэкенде — а один проект дополнительно берёт WebSocket. Меняется
          только предметная область, чтобы можно было выбрать то, что интереснее.
        </P>
        <Idea n={1} title="Трекер задач с командными досками (Kanban)" accent={C.blue}
          essence="Доска задач в стиле Trello: колонки «To Do / In Progress / Done», задачи можно создавать, перетаскивать, назначать участникам доски."
          stack="Django REST Framework, PostgreSQL, JWT (djangorestframework-simplejwt), React или чистый JS на фронте"
          features="регистрация/вход по JWT; модели User–Board–Task с ORM-связями (ForeignKey, ManyToMany для участников); валидация — нельзя создать задачу в чужой доске, нельзя оставить пустой заголовок; SQL-запрос с JOIN/агрегацией для статистики по доске (сколько задач в каждом статусе)."
        />
        <Idea n={2} title="Блог-платформа с комментариями" accent={C.blue}
          essence="Многопользовательский блог: пишешь посты, читаешь чужие, комментируешь, подписываешься на авторов."
          stack="Django REST Framework, PostgreSQL/SQLite, JWT, любой фронтенд"
          features="регистрация/вход, JWT-защищённые эндпоинты для создания постов; ORM-связи Post–Comment–Author (один ко многим); валидация — комментарий не длиннее N символов, пост нельзя редактировать чужой; пагинация ленты постов через SQL LIMIT/OFFSET."
        />
        <Idea n={3} title="Сокращатель ссылок со статистикой" accent={C.blue}
          essence="Сервис вроде bit.ly: вставляешь длинную ссылку — получаешь короткую, а в личном кабинете видишь статистику переходов по каждой."
          stack="Django REST Framework, PostgreSQL, JWT"
          features="регистрация/вход по JWT — ссылки привязаны к владельцу; ORM-модель Link с полем счётчика переходов и таблица Click с датой/IP для истории; валидация — проверка, что вставленный URL действительно валиден; SQL-запрос топ-5 самых кликабельных ссылок пользователя (ORDER BY + LIMIT)."
        />
        <Idea n={4} title="Чат в реальном времени" accent={C.green}
          essence="Мессенджер с комнатами: пользователи заходят в общий чат или личные комнаты и обмениваются сообщениями мгновенно, без обновления страницы."
          stack="Django + Django Channels (WebSocket), PostgreSQL, JWT для аутентификации перед подключением к сокету"
          features="регистрация/вход по JWT; WebSocket-подключение с проверкой токена при рукопожатии; consumer-класс на комнату с broadcast всем участникам; ORM-хранение истории сообщений (Message с ForeignKey на Room и User); валидация — нельзя отправить пустое сообщение, лимит длины."
        />
        <Idea n={5} title="Бэкенд для интернет-магазина (каталог + корзина)" accent={C.blue}
          essence="API для простого магазина: каталог товаров с категориями, корзина, оформление заказа с проверкой остатков на складе."
          stack="Django REST Framework, PostgreSQL, JWT"
          features="регистрация/вход по JWT; ORM-модели Product–Category–Order–OrderItem со связями; валидация — нельзя заказать больше, чем есть на складе, нельзя оформить пустой заказ; транзакция при оформлении заказа (списание остатков атомарно); SQL-агрегация выручки по категориям."
        />
      </section>

      {/* ===== MACHINE LEARNING ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Идеи пет-проектов: Machine Learning</h2>
        <P n={7}>
          Все пять проектов закрепляют то, что мы разбирали на занятиях: <strong>линейную регрессию</strong>,
          реализованную двумя способами — <strong>аналитической формулой</strong> (w = (XᵀX)⁻¹Xᵀy) и{' '}
          <strong>градиентным спуском</strong> — с последующим сравнением по метрикам качества (MSE, R²) и
          скорости. Меняется только датасет и предметная область.
        </P>
        <Idea n={1} title="Предсказание цены квартиры" accent={C.green}
          essence="По параметрам квартиры (площадь, этаж, район, число комнат) предсказать её цену."
          stack="Python, NumPy, pandas, matplotlib, датасет с Kaggle или собранный самостоятельно"
          features="подготовка признаков (one-hot для района), обе реализации линейной регрессии — аналитическая формула и градиентный спуск; график сходимости функции потерь для нескольких значений learning rate; сравнение MSE и R² обеих моделей на тестовой выборке; вывод — какой метод оказался точнее/быстрее и почему."
        />
        <Idea n={2} title="Прогноз зарплаты по опыту и образованию" accent={C.green}
          essence="Предсказать зарплату специалиста по годам опыта, уровню образования и стеку технологий."
          stack="Python, NumPy, pandas, matplotlib"
          features="сбор/поиск датасета зарплат (например, опросы IT-сообществ); кодирование категориальных признаков (образование, специализация); обучение аналитической формулой и градиентным спуском с подбором нескольких learning rate; таблица сравнения метрик; интерпретация весов — какой признак сильнее всего влияет на зарплату."
        />
        <Idea n={3} title="Предсказание оценки за экзамен по часам подготовки" accent={C.green}
          essence="Учебный, но наглядный проект: по количеству часов подготовки и посещаемости предсказать итоговый балл студента."
          stack="Python, NumPy, matplotlib (можно без pandas — минимальный датасет)"
          features="сгенерировать синтетические данные с управляемым шумом; реализовать обе формулы линейной регрессии с нуля (без sklearn); визуализировать прямую регрессии поверх точек данных; поэкспериментировать с разными learning rate и числом итераций, показать на графике расхождение при слишком большом шаге."
        />
        <Idea n={4} title="Оценка расхода топлива автомобиля" accent={C.green}
          essence="По характеристикам автомобиля (вес, мощность двигателя, объём) предсказать расход топлива (mpg/л на 100км)."
          stack="Python, NumPy, pandas, matplotlib, классический датасет Auto MPG"
          features="разведочный анализ и отбор признаков; масштабирование признаков (важно для сходимости градиентного спуска); обучение обоими методами, сравнение по MSE/R²; график зависимости числа итераций градиентного спуска от требуемой точности при разных learning rate."
        />
        <Idea n={5} title="Прогноз количества посетителей сайта по дню недели и рекламному бюджету" accent={C.green}
          essence="По рекламному бюджету, дню недели и сезону предсказать трафик на сайт — псевдо-маркетинговая задача с несколькими признаками."
          stack="Python, NumPy, pandas, matplotlib"
          features="кодирование дня недели (one-hot), нормализация бюджета; линейная регрессия аналитической формулой и градиентным спуском; кросс-проверка на отложенной выборке; итоговый отчёт (markdown/ноутбук) с выводами о том, какой признак значимее всего и какой метод обучения предпочтительнее на этом объёме данных."
        />
      </section>

      {/* ===== АНАЛИТИКА ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Идеи пет-проектов: Аналитика данных</h2>
        <P n={8}>
          Цель — собрать данные (или взять готовый датасет), почистить их и превратить в понятные метрики,
          графики и выводы, используя всё, что разбирали: pandas, matplotlib, продуктовые метрики, статистику.
        </P>
        <Idea n={1} title="Анализ поведения пользователей интернет-магазина" accent={C.indigo}
          essence="На датасете событий (клики, добавления в корзину, покупки) построить воронку продаж, посчитать retention и найти, на каком шаге теряется больше всего пользователей."
          stack="Python, pandas, matplotlib/seaborn, Jupyter Notebook"
          features="построение воронки (funnel) по этапам; расчёт DAU/MAU, Retention Rate, Conversion Rate; когортный анализ по дате первого визита; итоговый дашборд из 4-5 графиков с текстовыми выводами."
        />
        <Idea n={2} title="Аналитика рынка вакансий" accent={C.indigo}
          essence="Собрать (спарсить или взять готовый) датасет вакансий и проанализировать зарплаты по городам, стекам технологий и опыту."
          stack="Python, pandas, requests/BeautifulSoup (если парсинг), matplotlib/seaborn"
          features="чистка и нормализация данных (разные форматы зарплат, пропуски); группировка по городу/стеку через groupby; графики распределения зарплат (гистограммы, box-plot); вывод топ самых востребованных навыков по частоте упоминания в вакансиях."
        />
        <Idea n={3} title="Анализ оттока подписчиков стримингового сервиса" accent={C.indigo}
          essence="На датасете пользователей подписочного сервиса посчитать Churn Rate, найти признаки, которые сильнее всего связаны с уходом пользователя."
          stack="Python, pandas, matplotlib/seaborn, датасет Telco Customer Churn (Kaggle) или аналог"
          features="расчёт общего и помесячного Churn Rate; сравнение групп «ушедшие» и «остались» по признакам (тип подписки, длительность использования); визуализация корреляций (тепловая карта); текстовые рекомендации, на что обратить внимание бизнесу."
        />
        <Idea n={4} title="Трекер и анализ личных финансов" accent={C.indigo}
          essence="Веду собственные расходы (CSV/таблица) — строю аналитику: куда уходят деньги, тренды по месяцам, прогноз следующего месяца."
          stack="Python, pandas, matplotlib, простой ввод данных (CSV или Google Sheets)"
          features="категоризация трат; помесячная динамика по категориям (линейные графики); статистика — среднее, медиана, выбросы (крупные разовые траты); простой прогноз бюджета на следующий месяц по линейному тренду."
        />
        <Idea n={5} title="A/B-тест: симуляция и анализ результатов" accent={C.indigo}
          essence="Смоделировать данные A/B-теста (например, две версии кнопки на сайте) и проверить, действительно ли отличие статистически значимо."
          stack="Python, pandas, scipy.stats, matplotlib"
          features="генерация синтетических данных для групп A и B с заданной конверсией; расчёт конверсии по группам; проверка статистической значимости (t-test/z-test, p-value); визуализация доверительных интервалов; итоговый вывод — стоит ли выкатывать изменение на всех пользователей."
        />
      </section>

      {/* ===== КИБЕРБЕЗОПАСНОСТЬ ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Идеи пет-проектов: Кибербезопасность</h2>
        <P n={9}>
          Все пять идей вокруг практической криптографии, шифрования и безопасности конфигураций/сетей — то, что
          можно показать как работающий инструмент, а не только теорию.
        </P>
        <Idea n={1} title="CLI-утилита для шифрования файлов" accent={C.red}
          essence="Консольная программа: шифрует и расшифровывает файлы симметричным алгоритмом (AES) по паролю пользователя."
          stack="Python, библиотека cryptography (Fernet/AES), argparse для CLI"
          features="генерация ключа из пароля (PBKDF2 с солью); шифрование/расшифровка файла любого типа; проверка целостности (что файл не повреждён после расшифровки); понятный CLI-интерфейс (encrypt/decrypt команды с флагами)."
        />
        <Idea n={2} title="Локальный менеджер паролей" accent={C.red}
          essence="Хранилище паролей, зашифрованное одним мастер-паролем — как встроенный в браузер менеджер, но свой и локальный."
          stack="Python, cryptography (Fernet), SQLite для хранения зашифрованных записей"
          features="мастер-пароль превращается в ключ шифрования (PBKDF2/Argon2), сам не хранится; все записи (сайт/логин/пароль) шифруются перед сохранением в БД; функция генерации случайных надёжных паролей; CLI или простой GUI для добавления/поиска записей."
        />
        <Idea n={3} title="Аудитор безопасности конфигурации сервера" accent={C.red}
          essence="Скрипт, который проверяет настройки Linux-сервера (SSH, firewall, права на файлы) на соответствие best practices и выдаёт отчёт."
          stack="Python, paramiko (для SSH-подключения) или локальный запуск на самой машине"
          features="проверка настроек SSH (запрещён ли вход под root, включена ли аутентификация по паролю вместо ключа); проверка открытых портов (через сравнение с ожидаемым списком); проверка прав доступа критичных файлов (chmod 777 и т.п.); итоговый отчёт с оценкой риска по каждому пункту (высокий/средний/низкий)."
        />
        <Idea n={4} title="Демонстрация протокола Диффи — Хеллмана и MITM-атаки" accent={C.red}
          essence="Учебный проект: реализовать обмен ключами по протоколу Диффи — Хеллмана между двумя сторонами, а затем показать, как атака «человек посередине» способна его скомпрометировать без аутентификации."
          stack="Python, модуль cryptography или собственная реализация модульной арифметики"
          features="реализация протокола между «Алисой» и «Бобом» с общим секретным ключом; отдельный скрипт-демонстрация MITM без проверки подлинности сторон; описание в README, как аутентификация (подпись) закрывает эту атаку; наглядная схема обмена в самом отчёте."
        />
        <Idea n={5} title="Сканер портов и анализатор сервисов" accent={C.red}
          essence="Свой упрощённый аналог nmap: сканирует диапазон портов на указанном хосте, определяет открытые и пытается опознать сервис по баннеру."
          stack="Python, модуль socket, threading/asyncio для скорости сканирования"
          features="многопоточное сканирование диапазона портов (чтобы не ждать по одному порту); определение открыт/закрыт по TCP-подключению; попытка получить баннер сервиса (banner grabbing) для определения ПО; сравнение найденных открытых портов со списком «опасных по умолчанию» и предупреждение."
        />
      </section>
    </div>
  )
}
