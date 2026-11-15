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
    video: src.video || null,
    videoLabel: src.videoLabel || null,
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
    video: src.video || null,
    videoLabel: src.videoLabel || null,
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
    chapters: WEEK1_CHAPTERS.map(ch => weekChapter(ch, {}, { code: true })),
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
    tag: 'Недели 3–4 · основы направления',
    lead: 'Репозитории, коммиты, ветки и pull request — повседневный минимум, без которого не обходится ни одна команда. В конце блока — тест с автопроверкой.',
    chapters: [...topicChapters('git'), topicTest('git', 'Тест по Git')],
  },
  sql: {
    key: 'sql',
    name: 'SQL',
    short: 'SQL',
    dirs: ['ml', 'backend'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'От первого SELECT до оконных функций — уровень уверенного джуна. В конце блока — десять задач на запросы по одному датасету: запросы уходят на проверку. Для дополнительной практики есть SQL-тренажёр с автопроверкой.',
    chapters: [
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
    dirs: ['backend'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'Образы, контейнеры, Dockerfile и docker compose — только нужные основы: как упаковать сервис и поднять его вместе с базой одной командой. В конце блока — тест с автопроверкой.',
    chapters: [...topicChapters('docker'), topicTest('docker', 'Тест по Docker')],
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
    short: 'NumPy и pandas',
    dirs: ['ml'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'Три библиотеки, с которых начинается любая работа с данными: массивы и векторные операции, таблицы и группировки, графики. Задание из вопросов сдаётся на проверку, а для практики есть ноутбук с датасетом.',
    chapters: [
      programChapter('ml', 1, { task: quizTask(() => import('./content/ml-base-quiz')), practice: true }),
    ],
  },
  'sec-base': {
    key: 'sec-base',
    name: 'Основы информационной безопасности',
    short: 'Основы ИБ',
    dirs: ['security'],
    tag: 'Недели 3–4 · основы направления',
    lead: 'Язык, на котором говорят безопасники: триада CIA, угрозы, уязвимости и риски, принципы защиты, модель нарушителя, CVE, CWE, CVSS, OWASP Top 10, NIST, MITRE ATT&CK и российская регуляторика — ФСТЭК, БДУ, 152-ФЗ.',
    chapters: [programChapter('security', 1)],
  },

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
  'sec-core': {
    key: 'sec-core',
    name: 'База специалиста по ИБ',
    short: 'База ИБ',
    dirs: ['security'],
    tag: 'Январь · главный блок направления',
    lead: 'База, которая нужна в любой профессии ИБ — от реверса до пентеста: криптография, Linux, Windows, сети и веб. К каждой главе — вопросы в формате собеседования: ответы уходят на проверку.',
    chapters: [
      newChapter('crypto', 'Криптография: основы без матана', 9, () => import('./content/sec-crypto'), () => import('./content/sec-crypto-quiz')),
      newChapter('linux', 'Linux: база администрирования', 11, () => import('./content/sec-linux'), () => import('./content/sec-linux-quiz')),
      newChapter('windows', 'Windows: та же база, другие инструменты', 8, () => import('./content/sec-windows'), () => import('./content/sec-windows-quiz')),
      programChapter('security', 4),
      newChapter('web', 'Веб: архитектура, сессии, токены и уязвимости', 11, () => import('./content/sec-web'), () => import('./content/sec-web-quiz')),
      programChapter('security', 3, { hint: 'Углублённый разбор трёх тем из главы про веб' }),
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
  'sec-deep': {
    key: 'sec-deep',
    name: 'Углубление: практика на полигонах',
    short: 'Углубление',
    dirs: ['security'],
    tag: 'Февраль · углубление в направление',
    lead: 'От теории к рукам: учебные полигоны, своя лаборатория в виртуалках, первые лабы PortSwigger и отчёт об уязвимости. И карта профессии — куда расти: SOC и blue team или пентест и red team.',
    chapters: [
      newChapter('practice', 'Практика: полигоны, лаборатория и отчёт об уязвимости', 7, () => import('./content/sec-practice'), () => import('./content/sec-practice-quiz')),
      programChapter('security', 2, { hint: 'С чего начать на PortSwigger Web Security Academy', task: { kind: 'self' } }),
    ],
  },
  career: {
    key: 'career',
    name: 'Карьера',
    short: 'Карьера',
    dirs: null,
    tag: 'Февраль · для всех',
    lead: 'Как упаковать себя и найти работу: резюме, рассказ о себе и ответы на вопросы, соцсети и аккаунты, пет-проекты, поиск компаний и вакансий. К каждой главе — практическое задание: его проверяют и дают обратную связь.',
    chapters: [
      blockChapter(NOVEMBER_BLOCKS.career.chapters[0], 'career-1', { task: quizTask(() => import('./content/career-1-quiz')) }),
      newChapter('career-2', 'Как рассказать о себе и отвечать на вопросы', 8, () => import('./content/career-2'), () => import('./content/career-2-quiz')),
      newChapter('career-3', 'Как оформить соцсети и аккаунты', 7, () => import('./content/career-3'), () => import('./content/career-3-quiz')),
      newChapter('career-4', 'Как оформить пет-проекты', 7, () => import('./content/career-4'), () => import('./content/career-4-quiz')),
      newChapter('career-5', 'Как искать компании и вакансии', 8, () => import('./content/career-5'), () => import('./content/career-5-quiz')),
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
    { key: 'python', weeks: [1], title: 'Основы программирования на Python', modules: ['py'] },
    { key: 'algo', weeks: [2], title: 'Алгоритмы и структуры данных', modules: ['algo', 'ds'] },
    { key: 'base', weeks: [3, 4], title: 'Основы направления', byDir: {
      ml: ['git', 'ml-base', 'sql'],
      backend: ['git', 'docker', 'db', 'sql', 'sysdesign'],
      security: ['git', 'sec-base'],
    } },
  ] },
  { month: 2, stages: [
    { key: 'core', weeks: [6, 7, 8, 9], title: 'Главный блок направления', byDir: {
      ml: ['ml-classic', 'ml-dl'],
      backend: ['be-core'],
      security: ['sec-core'],
    } },
  ] },
  { month: 3, stages: [
    { key: 'interview', weeks: [10], title: 'Вопросы с собеседований', byDir: {
      ml: ['interview-ml'], backend: ['interview-backend'], security: ['interview-security'],
    } },
    { key: 'deep', weeks: [10, 11, 12, 13], title: 'Углубление в направление', byDir: {
      ml: ['ml-deep'], backend: ['be-deep'], security: ['sec-deep'],
    } },
    { key: 'career', weeks: [10, 11, 12, 13], title: 'Карьера', modules: ['career'] },
    { key: 'algosobes', weeks: [10, 11, 12, 13], title: 'Алгособес', modules: ['algosobes'] },
  ] },
]

// Программа студента: месяцы → этапы → блоки. Без направления этапы по направлению пустые (needsDirection).
export function winterProgram(direction) {
  return PLAN.map(m => ({
    month: m.month,
    stages: m.stages.map(s => {
      const keys = s.modules || (direction && s.byDir[direction]) || []
      return { key: s.key, weeks: s.weeks, title: s.title, needsDirection: !s.modules && !direction, modules: keys.map(k => WINTER_MODULES[k]) }
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
