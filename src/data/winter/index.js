// Программа зимнего лагеря 2026/27.
// Лагерь идёт три месяца: «Фундамент» (Python, алгоритмы, структуры данных, основы направления),
// «Направление» (главный блок профессии) и «Оффер» (собеседования, карьера, алгособес).
// Программа собрана из блоков (module). Блок — список глав; у главы есть конспект и задание.
// Часть глав переиспользует материалы осеннего лагеря (недели сентября и программы октября),
// новые главы лежат в src/data/winter/content.
//
// Направление студента хранится в users.winter_direction: ml / backend / security.
// Ключ задания на сервере — «<ключ блока>:<ref главы>», поэтому ключи блоков и ref глав менять нельзя:
// по ним лежат сданные работы. После изменений состава глав пересобери снимок для бэкенда:
//   node backend/scripts/gen-winter-tasks.mjs
//
// Как сдаётся задание (task.kind):
//   quiz     — вопросы и задачи, ответы уходят на проверку в админку («Зимний лагерь → Проверка ДЗ»);
//   auto     — тест с вариантами ответа, проверяется сразу, результат сохраняется;
//   notebook — практика в ноутбуке: ссылка на ноутбук (task.url) появится позже;
//   self     — самостоятельная практика, сдавать не нужно.

import { WEEK1_CHAPTERS } from '../week1Materials'
import { WEEK2_CHAPTERS } from '../week2Materials'
import { WEEK3_CHAPTERS } from '../week3Materials'
import { WEEK4_TOPICS, SQL_TASKS } from '../week4'
import { DIRECTIONS as PROGRAMS, NOVEMBER_BLOCKS, combineTrack } from '../programs'
import { lessonFromWeek, quizFromWeekHomework, quizFromProgram, autoFromQuiz } from './adapters'
import { SEC_COURSE } from './sec'

export const WINTER_CONTACT = { handle: '@x_tap', url: 'https://t.me/x_tap', text: 't.me/x_tap' }

export const WINTER_DIRECTIONS = {
  ml: { key: 'ml', name: 'Машинное обучение', short: 'ML', dative: 'машинному обучению', goal: 'Путь к офферу intern / junior ML-инженера' },
  backend: { key: 'backend', name: 'Backend-разработка', short: 'Backend', dative: 'backend-разработке', goal: 'Путь к офферу intern / junior Python backend-разработчика' },
  security: { key: 'security', name: 'Информационная безопасность', short: 'ИБ', dative: 'информационной безопасности', goal: 'Путь к офферу intern / junior специалиста по информационной безопасности' },
}

export function winterDirectionOf(user) {
  return (user?.isWinterCamp2027 && WINTER_DIRECTIONS[user.winterDirection]) || null
}

// ── Сборка глав ──────────────────────────────────────────────────────────────

// Глава недельного формата: конспект, вопросы для самопроверки и задачи на проверку
function weekChapter(ch, extra = {}, hwOptions = {}) {
  const hw = ch.homework
  return {
    ref: ch.id,
    title: ch.title,
    difficulty: ch.difficulty || null,
    sections: ch.blocks.filter(b => b.t === 'h').length || 1,
    load: async () => lessonFromWeek(ch),
    task: hw ? { kind: 'quiz', count: hw.kind === 'simple' ? 1 : hw.tasks.length, unit: 'tasks', load: async () => quizFromWeekHomework(ch, hwOptions) } : null,
    ...extra,
  }
}

// Глава индивидуальной программы осеннего лагеря (src/data/programs)
function programChapter(dirKey, num, extra = {}) {
  const src = PROGRAMS[dirKey].chapters.find(c => c.num === num)
  return {
    ref: `${dirKey}-${num}`,
    title: src.title,
    sections: src.sections,
    // Записи осенних встреч не прикрепляем — записи зимних добавляются в поле video по ходу лагеря
    video: null,
    // Файлы к заданию главы лежат на сервере под исходным направлением и номером
    files: { direction: dirKey, chapter: num },
    load: () => src.load().then(m => m.default),
    task: src.quiz ? { kind: 'quiz', load: () => src.quiz().then(m => quizFromProgram(m.default)) } : null,
    ...extra,
  }
}

// Глава блока ноября (углубление, карьера, алгособес)
function blockChapter(src, ref, extra = {}) {
  return {
    ref,
    title: src.title,
    sections: src.sections,
    // Записи осенних встреч не прикрепляем — записи зимних добавляются в поле video по ходу лагеря
    video: null,
    load: () => src.load().then(m => m.default),
    task: src.quiz ? { kind: 'quiz', load: () => src.quiz().then(m => quizFromProgram(m.default)) } : null,
    ...extra,
  }
}

// Новая глава зимнего лагеря: конспект и (если есть) задание из вопросов
function newChapter(ref, title, sections, load, quiz = null, extra = {}) {
  return {
    ref,
    title,
    sections,
    load: () => load().then(m => m.default),
    task: quiz ? { kind: 'quiz', load: () => quiz().then(m => quizFromProgram(m.default)) } : null,
    ...extra,
  }
}

const quizTask = (load) => ({ kind: 'quiz', load: () => load().then(m => quizFromProgram(m.default)) })
// Практика в ноутбуке. url — ссылка на ноутбук: пока её нет, на странице задания написано «скоро появится»
const notebook = (url = null) => ({ kind: 'notebook', url })

function topic(id) { return WEEK4_TOPICS.find(t => t.id === id) }
function topicChapters(id) { return topic(id).chapters.map(ch => weekChapter(ch)) }
function topicTest(id, title) {
  const quiz = topic(id).homework.quiz
  return { ref: 'test', title, taskOnly: true, task: { kind: 'auto', count: quiz.questions.length, load: async () => autoFromQuiz(quiz) } }
}

const deepMl = n => NOVEMBER_BLOCKS.deep.byDirection.ml.find(c => c.num === n)

function mlLibraryChapter(ref, title, sectionIds, extra = {}) {
  const source = PROGRAMS.ml.chapters.find(chapter => chapter.num === 1)
  return {
    ref,
    title,
    sections: sectionIds.length,
    task: null,
    load: async () => {
      const { default: lesson } = await source.load()
      return {
        ...lesson,
        title,
        intro: null,
        sections: lesson.sections.filter(section => sectionIds.includes(section.id)),
        assignment: extra.practice ? lesson.assignment : null,
      }
    },
    ...extra,
  }
}

// Глава курса по кибербезопасности (src/data/winter/sec — генерируется scripts/import-sec-course.py).
// Guided Case и кейсы — практика на стенде: вопросы уходят на проверку, тесты с одним верным
// вариантом проверяются сразу. Практика без вопросов — самостоятельная, сдавать не нужно.
function secChapter(c) {
  const task = c.kind === 'quiz' ? { kind: 'quiz', count: c.count, load: () => c.load().then(m => quizFromProgram(m.task)) }
    : c.kind === 'auto' ? { kind: 'auto', count: c.count, load: () => c.load().then(m => autoFromQuiz(m.task)) }
    : c.practice ? { kind: 'self' } : null
  return {
    ref: c.ref,
    title: c.title,
    level: c.level,
    sections: c.sections || null,
    ...(c.taskOnly ? { taskOnly: true } : { load: () => c.load().then(m => m.default) }),
    task,
  }
}

function secModule(key, meta) {
  const src = SEC_COURSE[key]
  const chapters = src.chapters.map(secChapter)
  const groups = src.groups.map(g => {
    const list = chapters.filter(c => c.level === g.level)
    const practice = src.chapters.filter(c => c.level === g.level && c.practice).length
    return { ...g, note: `${list.length} ${plural(list.length, 'тема', 'темы', 'тем')}${practice ? ` · практик на стенде: ${practice}` : ''}` }
  })
  return { key, dirs: ['security'], ...meta, groups, chapters }
}

function plural(n, one, few, many) {
  const a = n % 10, b = n % 100
  if (a === 1 && b !== 11) return one
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return few
  return many
}

// ── Блоки программы ──────────────────────────────────────────────────────────
// dirs — каким направлениям блок входит в программу (null — всем)

const ALGO_LEVEL = ch => (ch.levels.includes(1) ? 1 : ch.levels.includes(2) ? 2 : 3)

export const WINTER_MODULES = {
  py: {
    key: 'py',
    name: 'Основы программирования на Python',
    short: 'Python',
    dirs: null,
    tag: 'Неделя 1 · для всех',
    lead: 'С нуля до уверенной базы: переменные, условия, циклы, структуры данных, функции, ООП, декораторы и асинхронность. В каждой главе — конспект, вопросы для самопроверки и задачи: код пишется и запускается прямо на платформе, а решение уходит на проверку.',
    chapters: WEEK1_CHAPTERS.map((ch, index) => weekChapter(ch, {
      title: index >= 2 && index < 19 ? `python: ${ch.title}` : ch.title,
    }, { code: true })),
  },
  algo: {
    key: 'algo',
    name: 'Алгоритмы',
    short: 'Алгоритмы',
    dirs: null,
    tag: 'Неделя 2 · для всех',
    lead: 'Как оценивать скорость кода и какие приёмы решают типовые задачи. Главы разбиты на три уровня: базу проходят все, средний и продвинутый — по силам и желанию. Задачи сдаются на проверку.',
    groups: [
      { title: 'База — проходят все', note: 'Big O на пальцах, поиск, первая сортировка, рекурсия, два указателя и строки.', level: 1 },
      { title: 'Средний уровень', note: 'Если база даётся легко: логарифмы, бинарный поиск, быстрые сортировки, скользящее окно, жадные алгоритмы.', level: 2 },
      { title: 'Продвинутый уровень', note: 'Для тех, кто целится в алгоритмические собеседования: ДП, перебор с возвратом, битовые операции.', level: 3 },
    ],
    chapters: WEEK2_CHAPTERS.map(ch => weekChapter(ch, { level: ALGO_LEVEL(ch), optional: ALGO_LEVEL(ch) > 1 }, { code: true })),
  },
  ds: {
    key: 'ds',
    name: 'Структуры данных',
    short: 'Структуры данных',
    dirs: null,
    tag: 'Неделя 2 · для всех',
    lead: 'Массив, список, связные списки, стек, очередь, хеш-таблица, графы и деревья: как они устроены внутри, сколько стоит каждая операция и когда какую структуру выбирать.',
    chapters: WEEK3_CHAPTERS.map(ch => weekChapter(ch)),
  },
  git: {
    key: 'git',
    name: 'Git',
    short: 'Git',
    dirs: null,
    tag: 'Декабрь · для всех',
    lead: 'Репозитории, коммиты, ветки и pull request — повседневный минимум, без которого не обходится ни одна команда. В конце блока — тест с автопроверкой.',
    chapters: [...topicChapters('git'), topicTest('git', 'Тест по Git')],
  },
  sql: {
    key: 'sql',
    name: 'SQL',
    short: 'SQL',
    dirs: null,
    tag: 'Декабрь · для всех',
    lead: 'От первого SELECT до оконных функций — уровень уверенного джуна. В конце блока — десять задач на запросы по одному датасету: запросы уходят на проверку. Для дополнительной практики есть SQL-тренажёр с автопроверкой.',
    chapters: [
      newChapter('database-basics', 'Базы данных: что это и чем отличаются', 3, () => import('./content/sql-databases')),
      ...topicChapters('sql'),
      {
        ref: 'tasks', title: 'Задачи на запросы', taskOnly: true,
        task: {
          kind: 'quiz', count: SQL_TASKS.length, unit: 'tasks', dataset: true,
          load: async () => ({
            intro: 'Десять задач по одному датасету интернет-магазина — от простых к сложным. Напиши по одному запросу на задачу. Структура таблиц и первые строки показаны ниже.',
            unit: ['задача', 'задачи', 'задач'],
            questions: SQL_TASKS.map((t, i) => ({
              id: `q${i + 1}`,
              topic: `Задача ${i + 1} · ${i < 4 ? 'базовый уровень' : i < 8 ? 'средний уровень' : 'сложный уровень'}`,
              text: t.text, hint: t.hint || null, kind: 'sql',
            })),
          }),
        },
      },
    ],
  },
  docker: {
    key: 'docker',
    name: 'Docker',
    short: 'Docker',
    dirs: null,
    tag: 'Декабрь · для всех',
    lead: 'Образы, контейнеры, Dockerfile и docker compose — только нужные основы: как упаковать сервис и поднять его вместе с базой одной командой. В конце блока — тест с автопроверкой.',
    chapters: [
      newChapter('first-run', 'Docker: первый запуск и Docker Compose', 3, () => import('./content/docker-first-run')),
      ...topicChapters('docker'),
      topicTest('docker', 'Тест по Docker'),
    ],
  },
  db: {
    key: 'db',
    name: 'Базы данных',
    short: 'Базы данных',
    dirs: ['backend'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'Что такое база данных и СУБД, какие они бывают, как приложение с ними работает, как проектировать таблицы, зачем транзакции и индексы. В конце блока — тест с автопроверкой.',
    chapters: [...topicChapters('databases'), topicTest('databases', 'Тест по базам данных')],
  },
  sysdesign: {
    key: 'sysdesign',
    name: 'Основы системного дизайна',
    short: 'Системный дизайн',
    dirs: ['backend'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'Из каких кубиков собирают большие сервисы: балансировщик, кеш и Redis, очереди и Kafka, репликация и шардирование. Обзор на уровне «понимаю, что это и зачем» — глубже эти темы разбираются во втором месяце.',
    chapters: [
      newChapter('basics', 'Основы системного дизайна: кеш, очереди, репликация, шардирование', 8, () => import('./content/sysdesign'), () => import('./content/sysdesign-quiz')),
    ],
  },
  'ml-base': {
    key: 'ml-base',
    name: 'NumPy, pandas и Matplotlib',
    short: 'Библиотеки Python',
    dirs: ['ml'],
    tag: 'Январь · введение в ML',
    lead: 'Три библиотеки, с которых начинается любая работа с данными: массивы и векторные операции, таблицы и группировки, графики. Задание из вопросов сдаётся на проверку, а для практики есть ноутбук с датасетом.',
    chapters: [
      mlLibraryChapter('numpy', 'NumPy', ['numpy-basics', 'numpy-advanced']),
      mlLibraryChapter('pandas', 'pandas', ['pandas-basics', 'pandas-transform']),
      // Общая работа остаётся по прежнему адресу, чтобы сохранить сданные ответы.
      mlLibraryChapter('ml-1', 'Matplotlib', ['matplotlib', 'clean-code'], {
        task: { ...quizTask(() => import('./content/ml-base-quiz')), title: 'Практика по NumPy, pandas и Matplotlib' },
        practice: true,
        files: { direction: 'ml', chapter: 1 },
      }),
    ],
  },

  // ── Курс по кибербезопасности: Linux, сети, Windows и веб ──
  'sec-linux': secModule('sec-linux', {
    name: 'UNIX-системы и их безопасность',
    short: 'Linux',
    tag: 'Недели 3–4 · основы направления',
    lead: 'Начинаем с подготовки стенда — VirtualBox, учебные виртуальные машины и сертификаты. Дальше Linux от устройства Debian и загрузки системы до пользователей, прав, процессов, служб, журналирования, PAM, SELinux и харденинга. В Guided Case — практика на виртуальной машине с вопросами: ответы уходят на проверку, разбор открывается после своей попытки.',
  }),
  'sec-net': secModule('sec-net', {
    name: 'Сети и сетевая безопасность',
    short: 'Сети',
    tag: 'Январь · главный блок направления',
    lead: 'Основы сетей — модели OSI и TCP/IP, протоколы и Wireshark, — затем настройка сети на MikroTik: адресация, маршрутизация, DNS, VLAN, NAT, VPN и прокси. В третьей части — межсетевой экран OPNsense и защитные практики: как обнаруживать и предотвращать типовые атаки на сеть.',
  }),
  'sec-win': secModule('sec-win', {
    name: 'Windows-системы и их безопасность',
    short: 'Windows',
    tag: 'Январь · главный блок направления',
    lead: 'Как устроена Windows: службы, драйверы, пользователи и права, реестр, сетевой стек и удалённое управление, локальные политики и журналирование с Sysmon. Во второй части — доменная инфраструктура: Active Directory, Kerberos и NTLM, AD CS и групповые политики. Практика — Guided Case на стенде.',
  }),
  'sec-webapp': secModule('sec-webapp', {
    name: 'Безопасность веб-приложений',
    short: 'Веб',
    tag: 'Февраль · недели 10–11',
    lead: 'Как устроены веб-приложения: HTTP и HTTPS, сессии, cookies и JWT, механизмы защиты браузера. Затем классификация уязвимостей, OWASP Top 10 и методология тестирования, разбор XSS, SQL-инъекций, IDOR, XXE, SSTI и других — с кейсами по защите от каждой. В конце — безопасная разработка, SAST, DefectDojo и WAF.',
  }),

  // ── Второй месяц: главный блок направления ──
  'ml-classic': {
    key: 'ml-classic',
    name: 'Классическое машинное обучение',
    short: 'Классический ML',
    dirs: ['ml'],
    tag: 'Январь · главный блок направления',
    lead: 'Всё, что спрашивают про классический ML на собеседованиях: базовые понятия, линейные модели, kNN, SVM, наивный Байес, деревья, ансамбли, обучение без учителя, метрики и работа с данными. Практика — в ноутбуках: ссылки на них появятся в заданиях глав.',
    chapters: [
      programChapter('ml', 2, { task: notebook() }),
      programChapter('ml', 3, { task: notebook() }),
      programChapter('ml', 4, { task: notebook() }),
      programChapter('ml', 5, { task: notebook() }),
      programChapter('ml', 8, { task: notebook() }),
      programChapter('ml', 7, { task: notebook() }),
      programChapter('ml', 10, { task: notebook() }),
      newChapter('bayes', 'Байесовские методы: наивный Байес', 7, () => import('./content/ml-bayes'), null, { task: notebook() }),
      programChapter('ml', 9, { task: notebook() }),
      programChapter('ml', 11, { task: notebook() }),
      programChapter('ml', 12, { task: notebook() }),
      newChapter('metrics', 'Метрики качества: регрессия, классификация, ранжирование', 9, () => import('./content/ml-metrics'), null, { task: notebook() }),
      newChapter('data', 'Работа с данными: EDA, признаки, дисбаланс и утечки', 9, () => import('./content/ml-data'), null, { task: notebook() }),
      programChapter('ml', 6, { task: null, optional: true, hint: 'Короткая сводка по первым темам — для повторения перед собеседованием' }),
    ],
  },
  'ml-dl': {
    key: 'ml-dl',
    name: 'Основы Deep Learning и NLP',
    short: 'Основы DL и NLP',
    dirs: ['ml'],
    tag: 'Последняя неделя января',
    lead: 'Мост к третьему месяцу: что такое глубокое обучение, как устроена и обучается нейросеть, как нейросети работают с текстом. Задание первой главы сдаётся на проверку.',
    chapters: [
      blockChapter(deepMl(1), 'deep-ml-1'),
      blockChapter(deepMl(2), 'deep-ml-2', { task: quizTask(() => import('./content/ml-nn-quiz')) }),
      blockChapter(deepMl(4), 'deep-ml-4', { task: quizTask(() => import('./content/ml-nlp-quiz')) }),
    ],
  },
  'be-core': {
    key: 'be-core',
    name: 'Backend-разработка на Python',
    short: 'Backend на Python',
    dirs: ['backend'],
    tag: 'Январь · главный блок направления',
    lead: 'Главный блок профессии: Python вглубь, конкурентность и асинхронность, сети и веб, проектирование API, FastAPI и Django, базы данных, очереди, архитектура, безопасность и тестирование. К каждой главе — вопросы в формате собеседования: ответы уходят на проверку.',
    chapters: [
      newChapter('python', 'Python глубоко: объекты, ООП, итераторы, память и GIL', 9, () => import('./content/be-python'), () => import('./content/be-python-quiz')),
      programChapter('backend', 1),
      newChapter('frameworks', 'Веб-фреймворки: FastAPI, Django, WSGI и ASGI', 8, () => import('./content/be-frameworks'), () => import('./content/be-frameworks-quiz')),
      programChapter('backend', 2),
      programChapter('backend', 3),
      programChapter('backend', 4),
      programChapter('backend', 5),
      programChapter('backend', 6),
    ],
  },

  // ── Третий месяц: оффер ──
  'interview-ml': {
    key: 'interview-ml',
    name: 'Вопросы с собеседований: ML',
    short: 'Вопросы с собеседований',
    dirs: ['ml'],
    tag: 'Февраль · intern / junior',
    lead: 'Вопросы, которые реально задают на позиции intern и junior ML-инженера, с короткой сутью ответа. В задании — пробное собеседование: отвечаешь письменно, проверяющий даёт обратную связь.',
    chapters: [newChapter('questions', 'Вопросы с собеседований на ML-инженера', 8, () => import('./content/interview-ml'), () => import('./content/interview-ml-quiz'))],
  },
  'interview-backend': {
    key: 'interview-backend',
    name: 'Вопросы с собеседований: Backend',
    short: 'Вопросы с собеседований',
    dirs: ['backend'],
    tag: 'Февраль · intern / junior',
    lead: 'Вопросы, которые реально задают на позиции intern и junior Python backend-разработчика, с короткой сутью ответа. В задании — пробное собеседование: отвечаешь письменно, проверяющий даёт обратную связь.',
    chapters: [newChapter('questions', 'Вопросы с собеседований на backend-разработчика', 8, () => import('./content/interview-backend'), () => import('./content/interview-backend-quiz'))],
  },
  'interview-security': {
    key: 'interview-security',
    name: 'Вопросы с собеседований: ИБ',
    short: 'Вопросы с собеседований',
    dirs: ['security'],
    tag: 'Февраль · intern / junior',
    lead: 'Вопросы, которые реально задают на стажировки и junior-позиции в ИБ — SOC, AppSec и пентест, — с короткой сутью ответа. В задании — пробное собеседование: отвечаешь письменно, проверяющий даёт обратную связь.',
    chapters: [newChapter('questions', 'Вопросы с собеседований на специалиста по ИБ', 8, () => import('./content/interview-security'), () => import('./content/interview-security-quiz'))],
  },
  'ml-deep': {
    key: 'ml-deep',
    name: 'Углубление: CV, трансформеры и LLM',
    short: 'Углубление',
    dirs: ['ml'],
    tag: 'Февраль · углубление в направление',
    lead: 'Продолжение блока про нейросети: свёрточные сети для изображений и трансформеры — архитектура, на которой построены BERT, GPT и современные LLM.',
    chapters: [
      blockChapter(deepMl(3), 'deep-ml-3', { task: quizTask(() => import('./content/ml-cnn-quiz')) }),
      blockChapter(deepMl(5), 'deep-ml-5', { task: quizTask(() => import('./content/ml-transformers-quiz')) }),
    ],
  },
  'be-deep': {
    key: 'be-deep',
    name: 'Углубление: Git в команде и второй язык',
    short: 'Углубление',
    dirs: ['backend'],
    tag: 'Февраль · углубление в направление',
    lead: 'Git на уровне командной работы — rebase, код-ревью, git flow. И по желанию второй язык: Go или Java под капотом вместе с темами, которые спрашивают у любого бэкендера.',
    chapters: [
      programChapter('backend', 7),
      ...PROGRAMS.backend.extra[0].tracks.map(track => ({
        ref: track.key,
        title: `${track.name}: язык под капотом и общие темы backend`,
        hint: track.about,
        optional: true,
        sections: null,
        load: () => Promise.all([PROGRAMS.backend.extra[0].load(), track.load()])
          .then(([base, t]) => combineTrack(base.default, { ...t.default, key: track.key, name: track.name })),
        task: null,
      })),
    ],
  },
  career: {
    key: 'career',
    name: 'Карьера',
    short: 'Карьера',
    dirs: null,
    tag: 'Февраль · для всех',
    lead: 'Как упаковать себя и найти работу: резюме, рассказ о себе и ответы на вопросы, соцсети и аккаунты, пет-проекты, поиск компаний и вакансий.',
    chapters: [
      blockChapter(NOVEMBER_BLOCKS.career.chapters[0], 'career-1'),
      newChapter('career-2', 'Как рассказать о себе и отвечать на вопросы', 8, () => import('./content/career-2')),
      newChapter('career-3', 'Как оформить соцсети и аккаунты', 7, () => import('./content/career-3')),
      newChapter('career-4', 'Как оформить пет-проекты', 7, () => import('./content/career-4')),
      newChapter('career-5', 'Как искать компании и вакансии', 8, () => import('./content/career-5')),
    ],
  },
  algosobes: {
    key: 'algosobes',
    name: 'Алгособес',
    short: 'Алгособес',
    dirs: null,
    tag: 'Февраль · для всех',
    lead: 'Подготовка к алгоритмической секции по подборке LeetCode Top Interview 150: стратегия нарешивания, затем по главе на каждую тему — теория паттерна и разбор задач. По вторникам и четвергам решаем задачи вместе на созвонах.',
    express: NOVEMBER_BLOCKS.algo.express.map(ch => blockChapter(ch, ch.key, { label: ch.label, task: { kind: 'self' } })),
    chapters: NOVEMBER_BLOCKS.algo.chapters.map(ch => blockChapter(ch, `algo-${ch.num}`, { task: { kind: 'self' } })),
  },
}

// ── Программа по месяцам ─────────────────────────────────────────────────────
// stage.weeks — номера недель лагеря (WINTER_WEEKS), stage.byDir — блоки по направлениям

const PLAN = [
  { month: 1, stages: [
    { key: 'python', weeks: [1], title: 'Основы программирования на Python', modules: ['py'], about: [
      'Переменные, типы, условия и циклы',
      'Строки, списки, словари, множества и функции',
      'ООП, декораторы, генераторы и асинхронность — на уровне «понимаю и пишу сам»',
      'Задачи запускаются прямо на платформе и уходят на проверку',
    ] },
    { key: 'algo', weeks: [2], title: 'Алгоритмы и структуры данных', modules: ['algo', 'ds'], about: [
      'Сложность алгоритмов и Big O, поиск, сортировки, рекурсия, два указателя',
      'Массивы, связные списки, стек, очередь, хеш-таблица, деревья и графы',
      'Средний и продвинутый уровни — по желанию: ДП, бэктрекинг, битовые операции',
    ] },
    { key: 'tools', weeks: [3, 4], title: 'Инструменты разработки', modules: ['git', 'sql', 'docker'] },
    { key: 'base', monthByDirection: { ml: 2 }, weeks: [3, 4], title: 'Введение в направление', byDir: {
      ml: ['ml-base'],
      backend: ['db', 'sysdesign'],
      security: ['sec-linux'],
    }, about: {
      ml: [
        'NumPy, pandas и Matplotlib — загрузка, чистка, группировки и графики на реальном датасете',
      ],
      backend: [
        'Базы данных: проектирование таблиц, транзакции и индексы',
        'Обзор System Design: балансировщик, кеш, Redis, очереди, Kafka, репликация и шардирование',
      ],
      security: [
        'Стенд: VirtualBox, учебные виртуальные машины и сертификаты',
        'Linux: файловая система, Bash, пакеты, пользователи и права, процессы и службы, сеть',
        'Защита Linux: журналирование и Wazuh, sudo, парольная политика, ACL, SELinux и AppArmor, харденинг',
        '23 практических кейса на виртуальной машине',
      ],
    } },
  ] },
  { month: 2, stages: [
    { key: 'core', weeks: [5, 6, 7, 8], title: 'Главный блок направления', byDir: {
      ml: ['ml-classic', 'ml-dl'],
      backend: ['be-core'],
      security: ['sec-net', 'sec-win'],
    }, about: {
      ml: [
        'Базовые понятия ML: обучение с учителем и без, выборки, переобучение, кросс-валидация',
        'Линейная и логистическая регрессия, градиентный спуск и регуляризация',
        'kNN, SVM, наивный Байес и решающие деревья',
        'Ансамбли: бэггинг, случайный лес, градиентный бустинг и стекинг',
        'Обучение без учителя: кластеризация, понижение размерности, поиск аномалий',
        'Метрики регрессии, классификации и ранжирования; EDA, признаки, дисбаланс классов и утечки',
        'Последняя неделя — основы Deep Learning и NLP: как устроена и обучается нейросеть, как нейросети работают с текстом',
        'Практика — ноутбуки к каждой главе',
      ],
      backend: [
        'Python глубоко: объектная модель, ООП, итераторы, память и GIL',
        'Конкурентность: threading, multiprocessing, asyncio',
        'Сети и веб: TCP, DNS, HTTP и TLS, прокси и Nginx',
        'Проектирование API: REST, ошибки и пагинация, OpenAPI, gRPC, GraphQL, webhooks',
        'FastAPI и Django, WSGI и ASGI',
        'PostgreSQL: индексы, EXPLAIN, транзакции и MVCC, SQLAlchemy и Alembic, Redis, MongoDB и ClickHouse',
        'Очереди: Kafka и RabbitMQ, Celery, гарантии доставки, retry, DLQ и outbox',
        'Архитектура (SOLID, чистая архитектура, микросервисы), безопасность и тестирование с pytest',
        'К каждой главе — вопросы в формате собеседования на проверку',
      ],
      security: [
        'Сети: модели OSI и TCP/IP, адресация и маски, ARP, DHCP, ICMP, TCP и UDP, разбор трафика в Wireshark',
        'MikroTik: статическая и динамическая маршрутизация, DNS, VLAN, NAT, OpenVPN и прокси',
        'OPNsense и защита сети: обнаружение атак, контроль исходящих соединений, поиск C2',
        'Windows: службы, драйверы, пользователи и группы, автозапуск, реестр, сетевой стек',
        'Локальные политики и расширенное журналирование с Sysmon',
        'Домен: Active Directory, Kerberos и NTLM, AD CS, групповые политики, аудит IIS',
        '36 практических кейсов на стенде',
      ],
    } },
  ] },
  { month: 3, stages: [
    { key: 'final', monthByDirection: { ml: 2 }, weeks: [9, 10], title: 'Направление: финальный блок', byDir: {
      ml: ['ml-deep', 'interview-ml'],
      backend: ['be-deep', 'interview-backend'],
      security: ['sec-webapp', 'interview-security'],
    }, about: {
      ml: [
        'Свёрточные сети для изображений',
        'Трансформеры — архитектура BERT, GPT и современных LLM',
        'Вопросы с собеседований на ML-инженера и пробное собеседование',
      ],
      backend: [
        'Git в команде: rebase, код-ревью, git flow',
        'По желанию — второй язык: Go или Java под капотом',
        'Вопросы с собеседований на backend-разработчика и пробное собеседование',
      ],
      security: [
        'Веб: HTTP и HTTPS, сессии, cookies и JWT, Burp Suite',
        'OWASP Top 10 и методология тестирования; XSS, SQL-инъекции, IDOR, LFI, XXE, SSTI и защита от каждой',
        'Безопасная разработка: SAST, DefectDojo и WAF',
        'Вопросы с собеседований в ИБ и пробное собеседование',
      ],
    } },
    { key: 'career', weeks: [11, 12], title: 'Карьера', modules: ['career', 'algosobes'], about: [
      'Резюме, рассказ о себе, соцсети и пет-проекты',
      'Поиск компаний и вакансий',
      'Алгособес по LeetCode Top Interview 150 и совместное нарешивание',
    ] },
  ] },
]

// Программа студента: месяцы → этапы → блоки. Без направления этапы по направлению пустые (needsDirection).
// Этап, которого нет у направления, не показываем;
// без выбранного направления не показываем этапы, которые есть не у всех направлений.
const DIRECTION_KEYS = Object.keys(WINTER_DIRECTIONS)
const stageFor = (s, direction) => s.modules || (direction ? !!s.byDir[direction] : DIRECTION_KEYS.every(d => s.byDir[d]))

export function winterProgram(direction) {
  const schedule = PLAN.flatMap(({ month, stages }) => stages.map(stage => ({
    ...stage, month: stage.monthByDirection?.[direction] ?? month,
  })))
  return PLAN.map(m => ({
    month: m.month,
    stages: schedule.filter(s => s.month === m.month && stageFor(s, direction)).map(s => {
      const keys = s.modules || (direction && s.byDir[direction]) || []
      const about = Array.isArray(s.about)
        ? s.about
        : (direction && s.about?.[direction]) || (!direction && s.about ? [
            'ML: базовые понятия, линейные модели, деревья, ансамбли, кластеризация, основы DL и NLP',
            'Backend: Python вглубь, конкурентность, сети, API, FastAPI, БД, очереди и архитектура',
            'ИБ: компьютерные сети, MikroTik, OPNsense, Windows, Sysmon, Active Directory',
          ] : [])
      return { key: s.key, weeks: s.weeks, title: s.title, about, needsDirection: !s.modules && !direction, modules: keys.map(k => WINTER_MODULES[k]) }
    }),
  }))
}

export function programModules(direction) {
  return winterProgram(direction).flatMap(m => m.stages.flatMap(s => s.modules))
}

// Блок по ключу, если он входит в программу студента
export function findWinterModule(key, direction) {
  const mod = WINTER_MODULES[key]
  if (!mod) return null
  if (mod.dirs && !mod.dirs.includes(direction)) return { ...mod, foreign: true }
  return mod
}

export function moduleChapters(mod) {
  return [...mod.chapters, ...(mod.express || [])]
}

export function findWinterChapter(mod, ref) {
  return moduleChapters(mod).find(c => c.ref === String(ref)) || null
}

export const taskKey = (mod, ch) => `${mod.key}:${ch.ref}`
// Задание, которое сдаётся на платформе и идёт в счёт прогресса
export const isCountable = ch => ch.task?.kind === 'quiz' || ch.task?.kind === 'auto'

// Все задания программы студента, которые сдаются на платформе.
// required: false — главы «по желанию», в обязательный счёт не идут.
export function winterTasks(direction) {
  return winterProgram(direction).flatMap(m => m.stages.flatMap(s => s.modules.flatMap(mod =>
    mod.chapters.filter(isCountable).map(ch => ({
      key: taskKey(mod, ch), month: m.month, stage: s.key, module: mod, chapter: ch, required: !ch.optional,
    })))))
}

// Месяц, к которому относится блок в программе направления
export function monthOfModule(key, direction) {
  const m = winterProgram(direction).find(mm => mm.stages.some(s => s.modules.some(mod => mod.key === key)))
  return m ? m.month : null
}
