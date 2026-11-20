// Расписание зимнего лагеря 2026/27: даты лагеря, месяцы, недели и все события календаря.
// Это единственное место, где лежат даты. Поменять день созвона, тему или добавить запись —
// значит поправить одну строку здесь: страница лагеря, календарь и дэшборд читают этот файл.
// Время — московское. Даты — строками YYYY-MM-DD, чтобы не зависеть от часового пояса браузера.

export const WINTER = {
  title: 'Winter Camp',
  season: '2026/27',
  start: '2026-12-01',
  end: '2027-02-28',
}

// Три месяца по четыре недели. theme — короткое имя этапа, goal — что студент получает к концу месяца.
export const WINTER_MONTHS = [
  { n: 1, key: 'dec', label: 'Декабрь', genitive: 'декабря', start: '2026-12-01', end: '2026-12-31', theme: 'Фундамент', goal: 'Python, алгоритмы и структуры данных — для всех, затем введение в своё направление' },
  { n: 2, key: 'jan', label: 'Январь', genitive: 'января', start: '2027-01-01', end: '2027-01-31', theme: 'Направление', goal: 'Главный блок профессии: то, что спрашивают на собеседованиях по направлению' },
  { n: 3, key: 'feb', label: 'Февраль', genitive: 'февраля', start: '2027-02-01', end: '2027-02-28', theme: 'Карьера', goal: 'Две недели направления, затем резюме, самопрезентация, алгособес и поиск вакансий' },
]

// Двенадцать учебных недель: 1–4 декабрь, 5–8 январь, 9–12 февраль.
// stage — этап программы (src/data/winter/index.js), focus — что изучаем.
export const WINTER_WEEKS = [
  { n: 1, month: 1, start: '2026-12-01', end: '2026-12-06', focus: 'Основы программирования на Python', stage: 'python' },
  { n: 2, month: 1, start: '2026-12-07', end: '2026-12-13', focus: 'Алгоритмы и структуры данных', stage: 'algo' },
  { n: 3, month: 1, start: '2026-12-14', end: '2026-12-20', focus: 'Введение в направление', stage: 'base' },
  { n: 4, month: 1, start: '2026-12-21', end: '2026-12-27', focus: 'Введение в направление', stage: 'base' },
  { n: 5, month: 2, start: '2027-01-04', end: '2027-01-10', focus: 'Главный блок направления', stage: 'core' },
  { n: 6, month: 2, start: '2027-01-11', end: '2027-01-17', focus: 'Главный блок направления', stage: 'core' },
  { n: 7, month: 2, start: '2027-01-18', end: '2027-01-24', focus: 'Главный блок направления', stage: 'core' },
  { n: 8, month: 2, start: '2027-01-25', end: '2027-01-31', focus: 'Главный блок направления', stage: 'core' },
  { n: 9, month: 3, start: '2027-02-01', end: '2027-02-07', focus: 'Направление: углубление и вопросы с собеседований', stage: 'final' },
  { n: 10, month: 3, start: '2027-02-08', end: '2027-02-14', focus: 'Направление: углубление и вопросы с собеседований', stage: 'final' },
  { n: 11, month: 3, start: '2027-02-15', end: '2027-02-21', focus: 'Карьера: резюме, самопрезентация, алгособес', stage: 'career' },
  { n: 12, month: 3, start: '2027-02-22', end: '2027-02-28', focus: 'Карьера: профили, пет-проекты, вакансии', stage: 'career' },
]

// Новогодние каникулы между 4-й и 5-й неделями: повторение и долги по домашкам
export const WINTER_BREAK = { start: '2026-12-28', end: '2027-01-03', focus: 'Каникулы: повторение и долги по домашкам' }

// ── События ──────────────────────────────────────────────────────────────────
// time — начало по Москве ('20:00') или null, если время ещё не объявлено.
// video — запись: ссылка строкой, массив ссылок или { url, label }.

// Групповые созвоны: первая неделя — суббота и воскресенье, дальше по субботам.
// 2 января — новогодние каникулы, созвона нет.
export const GROUP_CALLS = [
  { date: '2026-12-05', topic: 'Python: изучаем основы (для новичков)' },
  { date: '2026-12-06', topic: 'Python: вопросы с собеседований (для опытных)' },
  { date: '2026-12-12', topic: 'Полный гайд по алгоритмам' },
  { date: '2026-12-19', topic: 'Полный гайд по структурам данных' },
  { date: '2026-12-26', topic: 'Полный гайд по базам данных и SQL' },
  { date: '2027-01-09', topic: 'Системный дизайн для всех' },
  { date: '2027-01-16', topic: 'Кибербезопасность: основы для всех' },
  { date: '2027-01-23', topic: 'Инженерия и процессы: тестирование, CI/CD, Docker и логи' },
  { date: '2027-01-30', topic: 'Работаем на пару с ИИ: как не превратиться в вайбкодера' },
  { date: '2027-02-06', topic: 'Как составить резюме и разбор резюме студентов' },
  { date: '2027-02-13', topic: 'Как рассказать о себе и отвечать на вопросы' },
  { date: '2027-02-20', topic: 'Как оформить свои соцсети и аккаунты' },
  { date: '2027-02-27', topic: 'Как оформить пет-проекты' },
]

// Мини-курс по математике: восемь занятий по понедельникам в 20:00 МСК.
// 4 января — каникулы. day — номер занятия: по нему подтягиваются конспект и домашнее
// задание из src/data/math (у восьмого занятия материалов нет — это повторение).
export const WINTER_MATH_TIME = '20:00'
export const WINTER_MATH = [
  { day: 1, date: '2026-12-07', topic: 'Арифметика, проценты и алгебраические уравнения' },
  { day: 2, date: '2026-12-14', topic: 'Математическая логика, функции и производные' },
  { day: 3, date: '2026-12-21', topic: 'Линейная алгебра: векторы, матрицы и определители' },
  { day: 4, date: '2026-12-28', topic: 'Основы теории вероятностей: события, условная вероятность, формула Байеса' },
  { day: 5, date: '2027-01-11', topic: 'Распределения, математическое ожидание и дисперсия' },
  { day: 6, date: '2027-01-18', topic: 'Описательная статистика и доверительные интервалы' },
  { day: 7, date: '2027-01-25', topic: 'Проверка гипотез' },
  { day: 8, date: '2027-02-01', topic: 'Повторение пройденного материала' },
]
// Записи занятий зимнего потока: номер занятия → ссылка. Пока пусто — появятся после созвонов.
export const WINTER_MATH_RECORDINGS = {}

// Второй месяц: созвоны с ментором направления — по средам, после каникул.
// У каждого направления свой ментор, поэтому событие показывается с названием направления.
export const MENTOR_CALLS = [
  { n: 1, date: '2027-01-13' },
  { n: 2, date: '2027-01-20' },
  { n: 3, date: '2027-01-27' },
]

// Третий месяц: нарешиваем LeetCode вместе — вторник и четверг.
export const LEETCODE_CALLS = [
  '2027-02-02', '2027-02-04', '2027-02-09', '2027-02-11',
  '2027-02-16', '2027-02-18', '2027-02-23', '2027-02-25',
].map((date, i) => ({ n: i + 1, date }))

// label — полное название, short — для списка событий, tag — короткая метка в ячейке календаря
export const EVENT_TYPES = {
  group: { label: 'Групповой созвон', short: 'Группа', tag: 'Созвон' },
  math: { label: 'Математика', short: 'Математика', tag: 'Матем.' },
  mentor: { label: 'Созвон с ментором', short: 'Ментор', tag: 'Ментор' },
  leetcode: { label: 'Нарешиваем LeetCode', short: 'LeetCode', tag: 'LeetCode' },
  // Личные созвоны ментор назначает в админке — приходят с бэкенда (personalCallEvents)
  personal: { label: 'Личный созвон с ментором', short: 'Личный созвон', tag: 'Ментор 1:1' },
}

function videosOf(video) {
  if (!video) return []
  return (Array.isArray(video) ? video : [video]).map((v, i, all) => (
    typeof v === 'string' ? { url: v, label: all.length > 1 ? `Запись — часть ${i + 1}` : 'Запись' } : v
  ))
}

// Все события лагеря одним отсортированным списком. directionName — для подписи созвонов с ментором.
// math: false — без занятий по математике (у математики своя страница и своё расписание).
export function winterEvents(directionName = null, { math = true } = {}) {
  const list = [
    ...GROUP_CALLS.map(c => ({
      id: `w-group-${c.date}`, type: 'group', date: c.date, time: c.time || null,
      title: 'Групповой созвон', note: c.topic, videos: videosOf(c.video), link: '/winter-camp#calendar',
    })),
    ...(math ? WINTER_MATH : []).map(s => ({
      id: `w-math-${s.date}`, type: 'math', date: s.date, time: WINTER_MATH_TIME,
      title: `Математика · занятие ${s.day}`, note: s.topic, videos: videosOf(WINTER_MATH_RECORDINGS[s.day]), link: '/winter-camp/math',
    })),
    ...MENTOR_CALLS.map(c => ({
      id: `w-mentor-${c.date}`, type: 'mentor', date: c.date, time: c.time || null,
      title: `Созвон с ментором направления ${c.n}`, note: directionName || 'по твоему направлению', videos: videosOf(c.video), link: '/winter-camp#calendar',
    })),
    ...LEETCODE_CALLS.map(c => ({
      id: `w-leetcode-${c.date}`, type: 'leetcode', date: c.date, time: c.time || null,
      title: `Нарешиваем LeetCode · встреча ${c.n}`, note: 'Решаем задачи алгособеса вместе', videos: videosOf(c.video), link: '/winter-camp/m/algosobes',
    })),
  ]
  return list.sort((a, b) => a.date.localeCompare(b.date) || (a.time || '').localeCompare(b.time || ''))
}

// Личные созвоны с ментором из /api/winter/calls/mine → события календаря
export function personalCallEvents(calls) {
  return (calls || []).map(c => ({
    id: `w-personal-${c.id}`, type: 'personal', date: c.date, time: c.time || null,
    title: `Созвон с ментором${c.mentor ? ` · ${c.mentor}` : ''}`,
    note: [c.topic, c.link].filter(Boolean).join(' · ') || 'Личный созвон один на один',
    videos: [], link: '/winter-camp#calendar',
  }))
}

// ── Даты ─────────────────────────────────────────────────────────────────────

const pad = n => String(n).padStart(2, '0')
export function isoOf(date) { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` }
export function dateOf(iso) { return new Date(`${iso}T00:00:00`) }
function daysBetween(a, b) { return Math.round((dateOf(b) - dateOf(a)) / 86400000) }

const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const WD_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const WD_FULL = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

export function humanDate(iso, { weekday = false } = {}) {
  const d = dateOf(iso)
  return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}${weekday ? `, ${WD_FULL[d.getDay()]}` : ''}`
}
export function shortDate(iso) {
  const d = dateOf(iso)
  return `${d.getDate()} ${MONTHS_GEN[d.getMonth()]}, ${WD_SHORT[d.getDay()]}`
}
// «1–6 декабря», «28 декабря – 3 января»
export function rangeLabel(start, end) {
  const a = dateOf(start), b = dateOf(end)
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${MONTHS_GEN[b.getMonth()]}`
  return `${a.getDate()} ${MONTHS_GEN[a.getMonth()]} – ${b.getDate()} ${MONTHS_GEN[b.getMonth()]}`
}

// Где мы сейчас: до старта, идёт (день N из total) или лагерь завершён.
export function campProgress(now = new Date()) {
  const today = isoOf(now)
  const total = daysBetween(WINTER.start, WINTER.end) + 1
  if (today < WINTER.start) return { phase: 'before', daysTo: daysBetween(today, WINTER.start), day: 0, total, pct: 0 }
  if (today > WINTER.end) return { phase: 'after', day: total, total, pct: 100 }
  const day = daysBetween(WINTER.start, today) + 1
  return { phase: 'running', day, total, pct: Math.round((day / total) * 100) }
}

// Доля прошедших дней месяца — для полосок прогресса
export function monthProgress(month, now = new Date()) {
  const today = isoOf(now)
  const total = daysBetween(month.start, month.end) + 1
  if (today < month.start) return { done: 0, total, pct: 0, state: 'future' }
  if (today > month.end) return { done: total, total, pct: 100, state: 'past' }
  const done = daysBetween(month.start, today) + 1
  return { done, total, pct: Math.round((done / total) * 100), state: 'current' }
}

// Текущая учебная неделя; в каникулы — { n: null, isBreak: true, ... }
export function currentWinterWeek(now = new Date()) {
  const today = isoOf(now)
  if (today >= WINTER_BREAK.start && today <= WINTER_BREAK.end) return { n: null, isBreak: true, ...WINTER_BREAK }
  return WINTER_WEEKS.find(w => today >= w.start && today <= w.end) || null
}

export function weekState(week, now = new Date()) {
  const today = isoOf(now)
  if (today > week.end) return 'past'
  if (today < week.start) return 'future'
  return 'current'
}

// Ещё не прошедшие события. Без времени событие актуально весь свой день,
// со временем — ещё полтора часа после начала.
export function upcomingEvents(events, now = new Date()) {
  const today = isoOf(now)
  return events.filter(e => {
    if (!e.time) return e.date >= today
    return new Date(`${e.date}T${e.time}:00+03:00`).getTime() + 90 * 60000 > now.getTime()
  })
}
