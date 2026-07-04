const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const bcrypt = require('bcryptjs')

const DATA_DIR = path.join(__dirname, '..', 'data')
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })

const db = new Database(path.join(DATA_DIR, 'kiro.db'))
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ── Schema ──────────────────────────────────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    nickname        TEXT NOT NULL,
    name            TEXT NOT NULL,
    email           TEXT UNIQUE NOT NULL,
    password_hash   TEXT NOT NULL,
    track           TEXT DEFAULT 'Frontend',
    plan            TEXT DEFAULT 'С ментором',
    tariff          INTEGER DEFAULT 49900,
    points          INTEGER DEFAULT 0,
    streak          INTEGER DEFAULT 0,
    completed_tasks INTEGER DEFAULT 0,
    current_week    INTEGER DEFAULT 1,
    role            TEXT DEFAULT 'user',
    created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS schedule (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    day_num       INTEGER NOT NULL,
    date_label    TEXT NOT NULL,
    type          TEXT NOT NULL DEFAULT 'lecture',
    title         TEXT NOT NULL,
    theory        TEXT DEFAULT '[]',
    tasks         TEXT DEFAULT '[]',
    hw            TEXT DEFAULT '',
    month         TEXT DEFAULT 'june',
    meeting_link  TEXT DEFAULT '',
    meeting_time  TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS library_days (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    day_number  INTEGER NOT NULL,
    date_label  TEXT DEFAULT '',
    title       TEXT NOT NULL,
    month       TEXT DEFAULT 'june',
    week_name   TEXT DEFAULT '',
    status      TEXT DEFAULT 'locked'
  );

  CREATE TABLE IF NOT EXISTS library_materials (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    day_id        INTEGER NOT NULL,
    material_type TEXT DEFAULT 'link',
    title         TEXT NOT NULL,
    meta          TEXT DEFAULT '',
    url           TEXT DEFAULT '#',
    FOREIGN KEY (day_id) REFERENCES library_days(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT DEFAULT '',
    week        INTEGER DEFAULT 1,
    difficulty  TEXT DEFAULT 'medium',
    deadline    TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS user_tasks (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    task_id INTEGER NOT NULL,
    status  TEXT DEFAULT 'locked',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    UNIQUE(user_id, task_id)
  );

  CREATE TABLE IF NOT EXISTS announcements (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    text         TEXT NOT NULL,
    icon         TEXT DEFAULT '📢',
    published_at TEXT DEFAULT (date('now'))
  );

  CREATE TABLE IF NOT EXISTS news (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    title        TEXT NOT NULL,
    text         TEXT NOT NULL,
    published_at TEXT DEFAULT (date('now'))
  );

  CREATE TABLE IF NOT EXISTS useful_links (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT NOT NULL,
    description TEXT DEFAULT '',
    url         TEXT NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// ── Seed (runs once when DB is empty) ───────────────────────────────────────
function seed() {
  const alreadySeeded = db.prepare('SELECT COUNT(*) as c FROM schedule').get().c > 0
  if (alreadySeeded) return

  // Schedule — June program
  const insEvent = db.prepare(`
    INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_link, meeting_time)
    VALUES (@num, @date, @type, @title, @theory, @tasks, @hw, @month, @meeting_link, @meeting_time)
  `)
  const j = (a) => JSON.stringify(a)
  const events = [
    { num:1,  date:'пн, 1 июня',   type:'intro',   title:'Вводное занятие: старт лагеря',                               month:'june', theory:j(['Знакомство с форматом: как устроены занятия, созвоны и ДЗ','Обзор платформы: где находить материалы, задания и расписание','Инструменты для старта: установка редактора кода и необходимого ПО','Рекомендации по учёбе, работе с ментором и одногруппниками','Знакомство участников: первый круговой созвон']), tasks:j(['Установить редактор кода и инструменты по инструкции на платформе','Написать программу "Hello, World!" и запустить в терминале']), hw:'Установить все инструменты и написать в чат: "Готов(а) к старту!" — это твой первый ДЗ.' },
    { num:2,  date:'вт, 2 июня',   type:'lecture', title:'Основы программирования: переменные, типы, условия',           month:'june', theory:j(['Что такое программа: инструкции, данные, порядок выполнения','Переменные и типы данных: числа, строки, булевы значения, пустое значение','Арифметические, логические операторы и операторы сравнения','Условные операторы: if / elif / else — синтаксис и примеры','Ввод и вывод данных: как программа общается с пользователем']), tasks:j(['Написать калькулятор с 4 операциями (+, −, ×, ÷)','Задача: "Угадай число" — пользователь вводит, программа сравнивает']), hw:'3 задачи на условия из Codeforces уровня A. Ссылки на платформе.' },
    { num:3,  date:'ср, 3 июня',   type:'lecture', title:'Основы программирования: циклы, функции, коллекции',           month:'june', theory:j(['Циклы: повторение по счётчику и по условию — когда что','Прерывание и продолжение цикла','Функции: объявление, параметры, возвращаемое значение, область видимости','Работа с коллекциями: массивы/списки — добавление, удаление, срезы','Принципы читаемого кода: именование, отступы, минимум комментариев']), tasks:j(['FizzBuzz — классика программирования','Функция для проверки является ли число простым','Написать таблицу умножения через вложенные циклы']), hw:'Функция подсчёта суммы всех чётных чисел в массиве. Написать 2 варианта: через цикл и через встроенные инструменты языка.' },
    { num:4,  date:'чт, 4 июня',   type:'lecture', title:'Алгоритмическое мышление и Big O',                              month:'june', theory:j(['Что такое алгоритм: чёткость, конечность, результат','Нотация Big O: O(1), O(n), O(n²), O(log n), O(n log n)','Как анализировать время и память алгоритма','Примеры: линейный vs бинарный поиск, пузырьковая vs быстрая сортировка','Зачем это знать: каждое техническое собеседование спрашивает Big O']), tasks:j(['Определить сложность 5 данных алгоритмов','Написать два решения одной задачи с разной сложностью — сравнить']), hw:'Задача: найти пару элементов с заданной суммой — два решения разной сложности.' },
    { num:5,  date:'пт, 5 июня',   type:'lecture', title:'Дискретная математика: логика и множества',                    month:'june', theory:j(['Булева алгебра: AND, OR, NOT, XOR, импликация, эквивалентность','Таблицы истинности: как строить и читать','Теория множеств: объединение, пересечение, разность, подмножество','Применение в программировании: битовые операции, фильтрация данных, индексы']), tasks:j(['Построить таблицу истинности для формулы с 3 переменными','Single Number (LeetCode #136) — через XOR']), hw:'Number of 1 Bits (LeetCode #191) и Power of Two (LeetCode #231) — через битовые операции.' },
    { num:6,  date:'сб, 6 июня',   type:'lecture', title:'Дискретная математика: графы и алгоритмы',                     month:'june', theory:j(['Граф: вершины, рёбра, типы (орграф, взвешенный, цикличный)','Представление: матрица смежности, список смежности — плюсы и минусы','BFS (поиск в ширину): алгоритм на очереди, применение','DFS (поиск в глубину): рекурсия и стек, применение','Алгоритмы на графах, создание и обзор графа через код']), tasks:j(['Реализовать BFS и DFS','Number of Islands (LeetCode #200)']), hw:'Clone Graph (LeetCode #133).' },
    { num:7,  date:'вс, 7 июня',   type:'lecture', title:'Структуры данных: массивы и связанные списки',                 month:'june', theory:j(['Массивы: хранение в памяти, доступ за O(1), вставка и удаление','Динамические массивы: как массив растёт под капотом при добавлении','Связанный список: узлы и указатели, операции и их сложность','Двусвязный список: обход в обе стороны','Когда массив, когда связный список — таблица сравнения']), tasks:j(['Реализовать LinkedList с методами: add, remove, find, print','Задача: перевернуть связанный список in-place']), hw:'Reverse Linked List (LeetCode #206) — итеративно и рекурсивно.' },
    { num:8,  date:'пн, 8 июня',   type:'lecture', title:'Структуры данных: стек и очередь',                             month:'june', theory:j(['Стек (Stack): принцип LIFO, операции push/pop/peek — O(1)','Применение стека: история браузера, undo/redo, вычисление выражений','Очередь (Queue): принцип FIFO, enqueue/dequeue','Применение очереди: очередь задач, BFS-обходы, буфер','Deque (двусторонняя очередь): когда нужны операции с обоих концов']), tasks:j(['Реализовать стек через массив и через связный список','Задача: Valid Parentheses (LeetCode #20)']), hw:'Implement Queue using Stacks (LeetCode #232) — реализовать очередь из двух стеков.' },
    { num:9,  date:'вт, 9 июня',   type:'lecture', title:'Структуры данных: хэш-таблицы',                                month:'june', theory:j(['Идея хеширования: ключ → индекс за O(1)','Хеш-функции: что делает функцию хорошей','Коллизии: chaining и open addressing — как решается','Словари и хэш-мапы: встроенные реализации в разных языках','Применение: кэширование, поиск, дедупликация, частотный анализ']), tasks:j(['Two Sum (LeetCode #1) — решить с хэш-таблицей','Group Anagrams (LeetCode #49)']), hw:'Longest Substring Without Repeating Characters (LeetCode #3).' },
    { num:10, date:'ср, 10 июня',  type:'lecture', title:'Структуры данных: деревья',                                    month:'june', theory:j(['Дерево: узлы, рёбра, корень, листья, высота, уровни','Бинарное дерево поиска (BST): свойство, вставка, поиск, удаление','Обходы: in-order, pre-order, post-order — рекурсивно и итеративно','Сбалансированные деревья: AVL, Red-Black — зачем (обзор)','Применение деревьев: файловая система, индексы в БД, парсеры']), tasks:j(['Реализовать BST с insert, search, min/max','Maximum Depth of Binary Tree (LeetCode #104)']), hw:'Validate Binary Search Tree (LeetCode #98).' },
    { num:11, date:'чт, 11 июня',  type:'lecture', title:'Git: версионирование и командная работа',                      month:'june', theory:j(['Что такое система контроля версий и зачем она нужна','Основные команды: init, status, add, commit, log, diff','Ветки: branch, checkout, merge, rebase — отличия','Работа с GitHub: remote, push, pull, pull requests, fork','Git Flow: как команды работают с Git в реальных проектах']), tasks:j(['Создать репозиторий на GitHub, сделать 5 осмысленных коммитов','Создать ветку feature/experiment, сделать изменения, открыть PR']), hw:'Написать .gitignore для проекта, разрешить конфликт слияния (конфликт создаётся по инструкции).' },
    { num:12, date:'пт, 12 июня',  type:'lecture', title:'ИИ-инструменты разработчика',                                  month:'june', theory:j(['Как работают LLM: трансформеры, токены, температура — на пальцах','ChatGPT, Claude, DeepSeek: в чём разница, когда что использовать','Промпт-инжиниринг: chain-of-thought, few-shot, ролевые запросы','Claude Code и GitHub Copilot: AI при написании кода — demo','Ограничения ИИ: галлюцинации, устаревшие данные, этика использования']), tasks:j(['Решить алгоритмическую задачу с AI и без — сравнить подходы и скорость','Написать промпт для генерации документации и тестов к функции']), hw:'Использовать AI для дебага и рефакторинга своего кода из предыдущих ДЗ. Описать что улучшилось.' },
    { num:13, date:'сб, 13 июня',  type:'project', title:'Мини-проект: визуализация алгоритмов',                         month:'june', theory:j(['Цель дня: закрепить структуры данных через визуальную программу — видишь каждый шаг алгоритма в реальном времени','Инструменты: анимации шагов, отрисовка графов','BFS и DFS на графе: пошаговая анимация — какие вершины посещены, какие в очереди/стеке, текущий путь','Стек и очередь в действии: визуализация push/pop/enqueue/dequeue с подсвечиванием активного элемента','Сортировки: столбчатая диаграмма где каждый обмен элементов — отдельный кадр анимации']), tasks:j(['Реализовать пошаговую визуализацию BFS на графе из 8–10 вершин','Добавить визуализацию стека или очереди с цветовой индикацией операций','Расширить: добавить интерактивность — кнопки «Следующий шаг» и «Сбросить»']), hw:'Загрузить проект на GitHub с README и GIF-записью работающей визуализации.' },
    { num:14, date:'вс, 14 июня',  type:'insider', title:'Insider Show #1 🎙',                                            month:'june', theory:j(['Живая встреча с действующим сотрудником IT-компании (сюрприз!)','Карьерный путь гостя: как попал в IT, что было сложно','Как устроена работа в IT-компании изнутри: команды, процессы, культура','Что конкретно смотрят при найме джунов — реальные критерии','Советы по подготовке к первому техническому собеседованию']), tasks:j(['Q&A с гостем — задай вопросы напрямую в прямом эфире']), hw:'Записать 3 главных инсайта из встречи и переосмыслить личный план обучения с учётом услышанного.' },
    { num:15, date:'пн, 15 июня',  type:'lecture', title:'Тайм и таск-менеджмент',                                       month:'june', theory:j(['Техника Pomodoro: 25/5, почему работает и как адаптировать','GTD (Getting Things Done): сбор, обработка, планирование, обзор','Kanban: визуализация потока задач, WIP-лимиты, непрерывный поток','Scrum: спринты, ретроспективы, стенд-апы — как применять в учёбе','Инструменты: Notion, Google Sheets, Trello, Прочие']), tasks:j(['Составить личную систему задач в Notion или Obsidian','Декомпозировать итоговый проект лагеря на небольшие задачи']), hw:'Вести учёт задач в выбранной системе 1 неделю. На следующем созвоне — поделиться что получилось.' },
    { num:16, date:'вт, 16 июня',  type:'lecture', title:'Обзор языков и фреймворков',                                   month:'june', theory:j(['Карта языков программирования: Python, JavaScript/TypeScript, Go, Java, C++, Rust, Swift, Kotlin','Что за что: системное, веб, мобайл, ML, embedded — кто где применяется','Фреймворки: React, Vue (Frontend) / Django, FastAPI, Spring (Backend)','Рынок труда 2026: что чаще всего ищут в вакансиях Junior']), tasks:j(['Изучить 2 вакансии по каждому треку, выписать повторяющиеся требования']), hw:'Написать мини-сравнение (150 слов): чем языки программирования отличаются и как выбрать первый.' },
    { num:17, date:'ср, 17 июня',  type:'lecture', title:'IT-тренды и влияние ИИ, SQL ч1',                                month:'june', theory:j(['Топ-тренды 2026: Generative AI, Cloud Native, кибербезопасность, edge computing','Как ИИ меняет работу разработчика: что автоматизируется, что остаётся людям','Перспективы трека Frontend, Backend, ML/AI, DevOps, Аналитики на 3–5 лет','Новые профессии: AI Engineer, Prompt Engineer, MLOps — что это','Как строить карьеру в эпоху быстрых изменений']), tasks:j(['Найти 3 IT-тренда не из списка занятия, объяснить своими словами']), hw:'Написать (200–300 слов): зачем тебе IT и как выбранный трек вписывается в тренды.' },
    { num:18, date:'чт, 18 июня',  type:'lecture', title:'Тестирование, комментарии и документация, SQL ч2',              month:'june', theory:j(['Зачем тестировать код: стоимость бага в продакшне vs на этапе разработки','Типы тестов: unit, integration, e2e — что тестировать на каком уровне','Принципы написания тестов: AAA (Arrange, Act, Assert)','TDD (Test-Driven Development): красный → зелёный → рефакторинг','Когда и зачем писать комментарии: self-documenting code vs необходимый контекст','Документация функций и модулей: docstrings, JSDoc — структура и примеры','README как лицо проекта: что должно быть, чтобы другой разработчик сразу понял суть']), tasks:j(['Написать тесты для функций из предыдущих занятий','Добавить docstring/JSDoc-документацию к своим функциям — по шаблону']), hw:'Написать набор тестов + полноценный README к своему проекту с примерами, установкой и описанием.' },
    { num:19, date:'пт, 19 июня',  type:'lecture', title:'Основы баз данных и SQL ч3',                                    month:'june', theory:j(['Что такое база данных: зачем нужна, как приложение с ней работает','Реляционная модель: таблицы, первичные и внешние ключи, нормализация','SQL: SELECT, WHERE, ORDER BY, GROUP BY, HAVING — примеры','JOIN: INNER, LEFT, RIGHT — наглядно на реальных примерах','NoSQL vs SQL: MongoDB, Redis — когда что выбирать']), tasks:j(['Написать 5 SQL-запросов разной сложности в SQLiteOnline','Спроектировать схему БД для Twitter: таблицы, связи']), hw:'Написать SQL-запрос с 2 JOIN, GROUP BY и HAVING.' },
    { num:20, date:'сб, 20 июня',  type:'lecture', title:'Сети и REST API',                                              month:'june', theory:j(['Как работает интернет: DNS, IP, TCP/UDP — путь запроса','HTTP: методы (GET, POST, PUT, DELETE, PATCH), коды ответов, заголовки','REST API: принципы, ресурсы, CRUD, идемпотентность','Работа с API: отправка запросов, обработка JSON-ответов, ошибки','Аутентификация: API-ключи, Bearer-токены, OAuth 2.0 — обзор']), tasks:j(['Написать скрипт для получения данных с публичного API (OpenWeather или GitHub API)']), hw:'Добавить в скрипт обработку ошибок, rate-limiting и сохранение результата в JSON-файл.' },
    { num:21, date:'вс, 21 июня',  type:'org',     title:'Выбор трека и план на июль',                                   month:'june', theory:j(['Финальный разбор треков: Frontend, Backend, ML·AI, DevOps, Аналитика данных','Что конкретно ждёт в июле по каждому направлению','Личный созвон с ментором: обсуждение и закрепление выбора трека','Критерии выбора: интерес, рынок, твои сильные стороны']), tasks:j(['Написать ментору финальный выбор трека с обоснованием (3–5 предложений)']), hw:'Составить план на июль: 4 цели на каждую неделю + итоговая цель месяца.' },
    { num:22, date:'вс, 22 июня',  type:'lecture', title:'Алгоритмы: сортировки и поиск',                               month:'june', theory:j(['Пузырьковая сортировка: наглядно, O(n²), почему учат всех','Сортировка слиянием (Merge Sort): "разделяй и властвуй", O(n log n)','Быстрая сортировка (Quick Sort): pivot, рекурсия, худший/лучший случай','Встроенные сортировки в языках: как работают под капотом','Бинарный поиск: требования к массиву, алгоритм, O(log n)']), tasks:j(['Реализовать Merge Sort с нуля, объяснить каждый шаг','Binary Search (LeetCode #704)']), hw:'Search in Rotated Sorted Array (LeetCode #33).' },
    { num:23, date:'вт, 23 июня',  type:'lecture', title:'Паттерны алгоритмических задач',                              month:'june', theory:j(['Sliding Window: зачем и когда применять, шаблон решения','Two Pointers: задачи на отсортированных массивах и строках','Fast & Slow Pointers: обнаружение цикла в связном списке','Рекурсия: базовый случай, стек вызовов, мемоизация','Как решать задачи на собеседовании: think aloud, edge cases, тесты']), tasks:j(['Maximum Sum Subarray (алгоритм Кадане)','Linked List Cycle (LeetCode #141)']), hw:'Longest Substring Without Repeating Characters (LeetCode #3) — sliding window и brute force.' },
    { num:24, date:'ср, 24 июня',  type:'lecture', title:'Кибербезопасность для разработчика',                          month:'june', theory:j(['Зачем каждому разработчику знать основы security','OWASP Top 10: SQL-инъекции, XSS, broken auth, IDOR — разбор','Хеширование паролей: bcrypt, salt — почему не MD5 и не SHA1','HTTPS, TLS: как работает шифрование в двух словах','Безопасный код: валидация ввода, least privilege, secrets management']), tasks:j(['Найти SQL-инъекцию в примере кода и написать исправленную версию','Написать функцию безопасного хеширования пароля с солью']), hw:'Изучить OWASP Top 10 по 2 уязвимостям на выбор и написать краткое резюме.' },
    { num:25, date:'чт, 25 июня',  type:'insider', title:'Insider Show #2 🎙',                                            month:'june', theory:j(['Второй гость из IT-компании (сюрприз — другое направление!)','Карьерный путь: как гость нашёл своё направление в IT','Реалии работы: карьерный рост, зарплаты, удалёнка, релокация','Технические собеседования изнутри: что спрашивают, типичные ошибки','Открытый Q&A — задавай вопросы по своему треку']), tasks:j(['Q&A с гостем — сравни с инсайтами первого Insider Show']), hw:'Обновить личный план обучения с учётом двух Insider Show. Что изменил(а)?' },
    { num:26, date:'пт, 26 июня',  type:'lecture', title:'Soft skills: команда, фидбек, рост',                          month:'june', theory:j(['Как работают IT-команды: роли (PM, Dev, QA, Design), Agile-церемонии','Как давать конструктивный фидбек коллеге — модель SBI','Как просить о помощи: rubber duck debugging, когда звать ментора','Документирование кода: docstrings, README, комментарии — когда нужны','Синдром самозванца в IT: откуда берётся и как с ним работать']), tasks:j(['Провести код-ревью решения партнёра по 3 критериям: читаемость, корректность, эффективность']), hw:'Написать подробный README к своему CLI-проекту с примерами использования.' },
    { num:27, date:'сб, 27 июня',  type:'lecture', title:'Как учиться программированию',                                month:'june', theory:j(['Активное vs пассивное обучение: почему читать код ≠ уметь писать','Метод Фейнмана применительно к алгоритмам и концепциям','Ресурсы: LeetCode, CS50, roadmap.sh, GitHub, YouTube, документация','Публичное портфолио: GitHub-профиль, LinkedIn, личный сайт — что и зачем','Как ставить цели в программировании: OKR для разработчика']), tasks:j(['Оформить GitHub-профиль: README, закреплённые репозитории, описание','Заполнить LinkedIn: образование, навыки, пет-проекты']), hw:'Написать пост в чат лагеря: что ты уже умеешь, куда идёшь, чему научился за июнь.' },
    { num:28, date:'вс, 28 июня',  type:'project', title:'Командный проект: день работы',                               month:'june', theory:j(['Кейс в портфолио','Практический день: командная разработка в группе','Git collaboration: форки, ветки, PR, code review в команде','Декомпозиция задач и распределение ролей внутри команды','Demo в формате 5-7 минут: что сделали, что не успели, почему','Фидбек от ментора по архитектуре и процессу']), tasks:j(['Реализовать минимальный MVP командного проекта (тему согласуй с ментором)','Провести короткую демонстрацию для всех участников']), hw:'Написать post-mortem: что получилось хорошо, что улучшить, что сделать иначе.' },
    { num:29, date:'пн, 29 июня',  type:'lecture', title:'Резюме IT-джуна: пишем первую версию и начинаем откликаться', month:'june', theory:j(['Структура IT-резюме: что включать, что убирать','Как описывать учебные и пет-проекты без коммерческого опыта','Что рекрутер смотрит за первые 10 секунд: ATS, keywords, структура','Сопроводительное письмо: нужно ли и как написать сильное','LinkedIn: ключевые слова, About Me, нетворкинг','Первые отклики: как выбирать вакансии джуну и что писать в сопроводительном','Анализ фидбека от компаний: как читать отказы и итерационно улучшать резюме','Поиск первой работы через оффлайн']), tasks:j(['Написать первый черновик резюме по шаблону (шаблон на платформе)','Откликнуться на 3 вакансии — зафиксировать результат в таблице']), hw:'Отправить черновик резюме ментору. Следующие 2 месяца будем дорабатывать его итерационно — финальная версия с разбором ментора в августе.' },
    { num:30, date:'вт, 30 июня',  type:'org',     title:'Итоги июня: разбор, план на июль',                            month:'june', theory:j(['Групповой созвон: что освоили за месяц — структурированный итог','Анонс программы июля по каждому треку','Мотивационный блок: вспомнить зачем ты здесь, сверить с целями']), tasks:j(['Q&A по всем материалам июня — спрашивай всё что не понял']), hw:'Составить личный план на июль: 4 конкретные цели, метрики успеха, дедлайны по неделям.' },
  ]
  events.forEach(e => {
    const isMeeting = ['lecture', 'org', 'intro'].includes(e.type)
    e.meeting_time = isMeeting ? '21:00' : ''
    e.meeting_link = isMeeting ? `https://zoom.us/j/kiro2026${String(e.num).padStart(2, '0')}` : ''
    insEvent.run(e)
  })

  // Library days — mirrors schedule, 30 June days
  const insDay = db.prepare(`
    INSERT INTO library_days (day_number, date_label, title, month, week_name, status)
    VALUES (@num, @date, @title, @month, @week, @status)
  `)
  const juneTitles = [
    'Вводное занятие: старт лагеря',
    'Основы программирования: переменные, типы, условия',
    'Основы программирования: циклы, функции, коллекции',
    'Алгоритмическое мышление и Big O',
    'Дискретная математика: логика и множества',
    'Дискретная математика: графы и алгоритмы',
    'Структуры данных: массивы и связанные списки',
    'Структуры данных: стек и очередь',
    'Структуры данных: хэш-таблицы',
    'Структуры данных: деревья',
    'Git: версионирование и командная работа',
    'ИИ-инструменты разработчика',
    'Мини-проект: визуализация алгоритмов',
    'Insider Show #1 🎙',
    'Тайм и таск-менеджмент',
    'Обзор языков и фреймворков',
    'IT-тренды и влияние ИИ, SQL ч1',
    'Тестирование, комментарии и документация, SQL ч2',
    'Основы баз данных и SQL ч3',
    'Сети и REST API',
    'Выбор трека и план на июль',
    'Алгоритмы: сортировки и поиск',
    'Паттерны алгоритмических задач',
    'Кибербезопасность для разработчика',
    'Insider Show #2 🎙',
    'Soft skills: команда, фидбек, рост',
    'Как учиться программированию',
    'Командный проект: день работы',
    'Резюме IT-джуна: пишем первую версию и начинаем откликаться',
    'Итоги июня: разбор, план на июль',
  ]
  const weekOf = (n) => n <= 7 ? 'Неделя 1 · 1–7 июня' : n <= 14 ? 'Неделя 2 · 8–14 июня' : n <= 21 ? 'Неделя 3 · 15–21 июня' : n <= 28 ? 'Неделя 4 · 22–28 июня' : 'Неделя 5 · 29–30 июня'
  juneTitles.forEach((title, i) => {
    const num = i + 1
    insDay.run({ num, date: `${num} июня`, title, month: 'june', week: weekOf(num), status: 'locked' })
  })

  // Tasks
  const insTask = db.prepare(`
    INSERT INTO tasks (title, description, week, difficulty, deadline)
    VALUES (@title, @desc, @week, @diff, @deadline)
  `)
  const taskRows = [
    { title:'Написать функцию find_second_max(arr) без sort()',           desc:'',  week:1,  diff:'easy',   deadline:'2 июня' },
    { title:'Решить Two Sum на LeetCode #1',                              desc:'',  week:1,  diff:'easy',   deadline:'2 июня' },
    { title:'Реализовать MinStack с getMin() за O(1)',                   desc:'',  week:1,  diff:'medium', deadline:'3 июня' },
    { title:'Реализовать LRU Cache (LeetCode #146)',                      desc:'',  week:1,  diff:'medium', deadline:'4 июня' },
    { title:'Обход дерева: in-order итеративно, без рекурсии',           desc:'',  week:1,  diff:'medium', deadline:'5 июня' },
    { title:'Group Anagrams — LeetCode #49',                              desc:'',  week:1,  diff:'medium', deadline:'4 июня' },
    { title:'Valid Parentheses — LeetCode #20',                           desc:'',  week:1,  diff:'easy',   deadline:'3 июня' },
    { title:'Настроить Git-репозиторий, сделать первый коммит',          desc:'',  week:2,  diff:'easy',   deadline:'9 июня' },
    { title:'Создать Dockerfile для Python Flask-приложения',             desc:'',  week:2,  diff:'medium', deadline:'11 июня' },
    { title:'Bash-скрипт: автоматизация бэкапов с датой в имени файла', desc:'',  week:2,  diff:'hard',   deadline:'10 июня' },
    { title:'Проект недели #1: CLI-инструмент с Git',                    desc:'',  week:2,  diff:'hard',   deadline:'14 июня' },
    { title:'Написать конспект по своему треку (выбор + план)',           desc:'',  week:3,  diff:'easy',   deadline:'21 июня' },
    { title:'Составить резюме черновик',                                  desc:'В конце лагеря — финальная версия', week:12, diff:'medium', deadline:'31 авг' },
    { title:'Командный проект: питч идеи и MVP',                         desc:'',  week:6,  diff:'hard',   deadline:'Июль' },
    { title:'Итоговый проект: полноценный продукт в портфолио',          desc:'',  week:11, diff:'hard',   deadline:'31 авг' },
  ]
  taskRows.forEach(t => insTask.run(t))

  // Announcements
  const insAnn = db.prepare(`
    INSERT INTO announcements (title, text, icon, published_at) VALUES (@title, @text, @icon, @date)
  `)
  ;[
    { title:'Лагерь стартует 1 июня!', text:'Дорогие участники! До старта лагеря осталось совсем немного. В этот день в 19:00 пройдёт организационный созвон — не пропусти. Ссылка будет в расписании.', icon:'🏕️', date:'2026-05-20' },
    { title:'Платформа готова к работе', text:'Образовательная платформа готова. Здесь будут все материалы, расписание, задания и твой прогресс. Добавь страницу в закладки.', icon:'📚', date:'2026-05-18' },
    { title:'Первый Insider Show — 15 июня', text:'15 июня в 19:00 состоится первый Insider Show с Ильёй Новицким — RL-разработчик в Яндекс Поиске, ассистент курсов Advanced ML в ИТМО. Тема: как попасть в ML в BigTech.', icon:'🎙️', date:'2026-05-15' },
  ].forEach(a => insAnn.run(a))

  // News
  const insNews = db.prepare('INSERT INTO news (title, text, published_at) VALUES (?, ?, ?)')
  ;[
    { title:'Лагерь стартует 1 июня!', text:'Дорогие участники! Платформа готова, расписание загружено. Первый день — организационный созвон в 19:00. Добро пожаловать в KIRO IT Summer Camp 2026!', date:'2026-05-28' },
    { title:'Как пользоваться платформой', text:'В разделе «Расписание» — программа лагеря по дням, теория и ДЗ. В «Заданиях» — ссылки на папки с домашними работами. В «Библиотеке знаний» — материалы после проведения каждого занятия. Удачи!', date:'2026-05-27' },
  ].forEach(n => insNews.run(n.title, n.text, n.date))

  // Demo user
  const hash = bcrypt.hashSync('demo1234', 10)
  const userRes = db.prepare(`
    INSERT INTO users (nickname, name, email, password_hash, track, plan, tariff, points, streak, completed_tasks, current_week)
    VALUES ('demo', 'Demo User', 'demo@kiro.camp', ?, 'Frontend', 'С ментором', 49900, 840, 4, 5, 1)
  `).run(hash)

  // Assign all tasks to demo user
  const defaultStatuses = ['done','done','done','active','active','done','done','locked','locked','locked','locked','locked','locked','locked','locked']
  const allTasks = db.prepare('SELECT id FROM tasks ORDER BY id').all()
  const insUT = db.prepare('INSERT OR IGNORE INTO user_tasks (user_id, task_id, status) VALUES (?, ?, ?)')
  allTasks.forEach((t, i) => insUT.run(userRes.lastInsertRowid, t.id, defaultStatuses[i] || 'locked'))

  console.log('✅ Database seeded')
}

seed()

// ── Migrations ──────────────────────────────────────────────────────────────────
function migrate() {
  const schemaVersion = db.pragma('user_version', { simple: true })

  // Migration 1: Update meeting times from 20:00 to 21:00
  if (schemaVersion < 1) {
    try {
      db.prepare('UPDATE schedule SET meeting_time = ? WHERE meeting_time = ?').run('21:00', '20:00')
      db.pragma('user_version = 1')
      console.log('✅ Migration 1 completed: Updated meeting times to 21:00')
    } catch (err) {
      console.error('❌ Migration 1 failed:', err.message)
    }
  }

  // Migration 2: Append SQL part labels to days 17, 18, 19 titles
  if (schemaVersion < 2) {
    try {
      const titleUpdates = [
        [17, 'IT-тренды и влияние ИИ, SQL ч1'],
        [18, 'Тестирование, комментарии и документация, SQL ч2'],
        [19, 'Основы баз данных и SQL ч3'],
      ]
      const updSchedule = db.prepare('UPDATE schedule SET title = ? WHERE day_num = ?')
      const updLibrary = db.prepare('UPDATE library_days SET title = ? WHERE day_number = ?')
      titleUpdates.forEach(([num, title]) => {
        updSchedule.run(title, num)
        updLibrary.run(title, num)
      })
      db.pragma('user_version = 2')
      console.log('✅ Migration 2 completed: Updated day 17/18/19 titles with SQL labels')
    } catch (err) {
      console.error('❌ Migration 2 failed:', err.message)
    }
  }

  // Migration 3: add tracks/description columns + July 1 sessions
  if (schemaVersion < 3) {
    try {
      const cols = db.prepare("PRAGMA table_info(schedule)").all().map(c => c.name)
      if (!cols.includes('tracks'))      db.prepare("ALTER TABLE schedule ADD COLUMN tracks TEXT DEFAULT '[]'").run()
      if (!cols.includes('description')) db.prepare("ALTER TABLE schedule ADD COLUMN description TEXT DEFAULT ''").run()

      // Fix schedule: Insider Show #2 должен быть на day 25, не на 21
      const existing21 = db.prepare("SELECT type FROM schedule WHERE day_num=21 AND month='june'").get()
      if (existing21 && existing21.type === 'insider') {
        db.prepare("UPDATE schedule SET day_num=122 WHERE day_num=21 AND month='june' AND type='insider'").run()
        db.prepare("UPDATE schedule SET day_num=123 WHERE day_num=22 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=124 WHERE day_num=23 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=125 WHERE day_num=24 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=21  WHERE day_num=123 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=22  WHERE day_num=124 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=23  WHERE day_num=125 AND month='june'").run()
        db.prepare("UPDATE schedule SET day_num=25  WHERE day_num=122 AND month='june'").run()
      }

      // Add July 1 sessions if not present
      const julyCount = db.prepare("SELECT COUNT(*) as c FROM schedule WHERE month='july'").get().c
      if (julyCount === 0) {
        const ins = db.prepare(`INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_time, tracks, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
        ins.run(1,'ср, 1 июля','lecture','Основы Python','[]','[]','','july','20:00','["ML","Аналитика"]','Повторяем базовый синтаксис Python: типы данных, циклы, функции. Анонс библиотек для последующей работы: numpy, pandas, matplotlib, seaborn, scikit-learn — с ними будем работать на треках аналитики и машинного обучения.')
        ins.run(1,'ср, 1 июля','lecture','Основы HTML','[]','[]','','july','20:30','["Frontend"]','Структура HTML-документа, семантические теги, формы и таблицы. Пишем первую страницу с нуля.')
        ins.run(1,'ср, 1 июля','lecture','Обзор Python vs Go','[]','[]','','july','21:00','["Backend"]','Сравниваем два популярных бэкенд-языка: синтаксис, типизация, экосистема, производительность.')
        ins.run(1,'ср, 1 июля','lecture','Основы информационной безопасности','[]','[]','','july','21:30','["Кибербезопасность"]','CIA-триада, угрозы и атаки, модели нарушителя. Обзор направлений: AppSec, сети, криптография, реагирование на инциденты.')
      }

      db.pragma('user_version = 3')
      console.log('✅ Migration 3 completed: tracks/description columns + July sessions')
    } catch (err) {
      console.error('❌ Migration 3 failed:', err.message)
    }
  }

  // Migration 4: refine July 1 session titles/descriptions
  if (schemaVersion < 4) {
    try {
      db.prepare("UPDATE schedule SET title='Основы Python', description=? WHERE month='july' AND (title='Основы Python: вспоминаем' OR title='Основы Python')")
        .run('Повторяем базовый синтаксис Python: типы данных, циклы, функции. Анонс библиотек для последующей работы: numpy, pandas, matplotlib, seaborn, scikit-learn — с ними будем работать на треках аналитики и машинного обучения.')
      db.prepare("UPDATE schedule SET description=? WHERE month='july' AND title='Обзор Python vs Go'")
        .run('Сравниваем два популярных бэкенд-языка: синтаксис, типизация, экосистема, производительность.')
      db.pragma('user_version = 4')
      console.log('✅ Migration 4 completed: refined July session texts')
    } catch (err) {
      console.error('❌ Migration 4 failed:', err.message)
    }
  }

  // Migration 5: add July 2 sessions
  if (schemaVersion < 5) {
    try {
      const july2Count = db.prepare("SELECT COUNT(*) as c FROM schedule WHERE month='july' AND day_num=2").get().c
      if (july2Count === 0) {
        const ins = db.prepare(`INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_time, tracks, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
        ins.run(2,'чт, 2 июля','lecture','Операционные системы','[]','[]','','july','20:00','["Кибербезопасность"]','Основы устройства ОС: процессы, память, файловая система, права доступа — база для понимания атак и защиты.')
        ins.run(2,'чт, 2 июля','lecture','Комбинаторика и основы теории вероятностей','[]','[]','','july','20:30','["Аналитика"]','Считаем количество вариантов: перестановки, сочетания, размещения. Основы вероятности: события, вероятность события, независимость.')
        ins.run(2,'чт, 2 июля','lecture','Введение в ML','[]','[]','','july','21:00','["ML"]','Что такое машинное обучение, какие бывают типы задач, чем ML отличается от классического программирования.')
        ins.run(2,'чт, 2 июля','lecture','Архитектура веб-приложения','[]','[]','','july','21:30','["Backend"]','Из чего состоит веб-приложение: клиент, сервер, база данных. Как компоненты взаимодействуют друг с другом.')
      }
      db.pragma('user_version = 5')
      console.log('✅ Migration 5 completed: added July 2 sessions')
    } catch (err) {
      console.error('❌ Migration 5 failed:', err.message)
    }
  }

  // Migration 6: fix July 2 session times
  if (schemaVersion < 6) {
    try {
      const upd = db.prepare("UPDATE schedule SET meeting_time=? WHERE month='july' AND day_num=2 AND title=?")
      upd.run('20:00', 'Операционные системы')
      upd.run('20:30', 'Комбинаторика и основы теории вероятностей')
      upd.run('21:00', 'Введение в ML')
      upd.run('21:30', 'Архитектура веб-приложения')
      db.pragma('user_version = 6')
      console.log('✅ Migration 6 completed: fixed July 2 session times')
    } catch (err) {
      console.error('❌ Migration 6 failed:', err.message)
    }
  }

  // Migration 7: add July 3 session (LeetCode practice, all tracks)
  if (schemaVersion < 7) {
    try {
      const july3Count = db.prepare("SELECT COUNT(*) as c FROM schedule WHERE month='july' AND day_num=3").get().c
      if (july3Count === 0) {
        const ins = db.prepare(`INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_time, tracks, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
        ins.run(3,'пт, 3 июля','lecture','Нарешиваем LeetCode','[]','[]','','july','20:00','["Frontend","Backend","Аналитика","ML","Кибербезопасность"]','Будем решать классические задачи с алгоритмической секции собеседований в БигТех.')
      }
      db.pragma('user_version = 7')
      console.log('✅ Migration 7 completed: added July 3 LeetCode session')
    } catch (err) {
      console.error('❌ Migration 7 failed:', err.message)
    }
  }

  // Migration 8: add July 4 sessions
  if (schemaVersion < 8) {
    try {
      const july4Count = db.prepare("SELECT COUNT(*) as c FROM schedule WHERE month='july' AND day_num=4").get().c
      if (july4Count === 0) {
        const ins = db.prepare(`INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_time, tracks, description) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
        ins.run(4,'сб, 4 июля','lecture','Компьютерные сети: основы','[]','[]','','july','20:00','["Кибербезопасность"]','Как устроена передача данных в сети: модель OSI/TCP-IP, IP-адреса, порты, протоколы TCP/UDP, DNS, HTTP/HTTPS.')
        ins.run(4,'сб, 4 июля','lecture','Библиотека NumPy','[]','[]','','july','20:30','["Аналитика","ML"]','Основы работы с массивами NumPy: создание, индексация, векторизованные операции, broadcasting.')
        ins.run(4,'сб, 4 июля','lecture','Базы данных: SQL и ORM','[]','[]','','july','21:30','["Backend"]','Реляционные базы данных, язык SQL и ORM — как абстракция над SQL в коде приложения.')
      }
      db.pragma('user_version = 8')
      console.log('✅ Migration 8 completed: added July 4 sessions')
    } catch (err) {
      console.error('❌ Migration 8 failed:', err.message)
    }
  }
}

migrate()

module.exports = db
