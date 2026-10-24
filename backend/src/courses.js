// Мини-курсы: какие курсы куплены у пользователя и какие задачи в них есть.
// Купленные курсы хранятся в users.courses JSON-массивом слагов; доступ выдаёт
// админ галочками после оплаты. Прогресс по задачам — в таблице course_progress.
const COURSE_SLUGS = ['python', 'math-ml', 'algorithms']

// Уроки курсов: id урока → число задач. Должно совпадать с src/data/courses/*
// на фронтенде: id задачи — `${id урока}t${номер}`, номера с 1.
const per = (ids, counts = {}) => Object.fromEntries(ids.map(id => [id, counts[id] || 5]))
const range = (prefix, n) => Array.from({ length: n }, (_, i) => `${prefix}${i + 1}`)

const COURSE_LESSONS = {
  python: per([1, 2, 3].flatMap(w => range(`w${w}d`, 7))),
  'math-ml': per(range('d', 21), { d21: 10 }),
  algorithms: per(range('a', 21), { a3: 4, a5: 4, a6: 4, a9: 4, a10: 2, a12: 4, a14: 4, a21: 4 }),
}

// Бесплатные уроки — открыты и без покупки курса
const FREE_LESSONS = {
  python: ['w1d1', 'w1d2'],
  'math-ml': ['d1', 'd2'],
  algorithms: ['a1', 'a2'],
}

function parseCourses(raw) {
  try {
    const list = JSON.parse(raw || '[]')
    return Array.isArray(list) ? COURSE_SLUGS.filter(s => list.includes(s)) : []
  } catch {
    return []
  }
}

// Урок задачи или null, если такой задачи в курсе нет
function lessonOfTask(course, taskId) {
  const m = /^([a-z]+\d+(?:d\d+)?)t(\d+)$/.exec(String(taskId || ''))
  const count = m && COURSE_LESSONS[course]?.[m[1]]
  return count && Number(m[2]) >= 1 && Number(m[2]) <= count ? m[1] : null
}

function canAccessLesson(courses, course, lessonId) {
  return courses.includes(course) || FREE_LESSONS[course]?.includes(lessonId)
}

module.exports = { COURSE_SLUGS, COURSE_LESSONS, FREE_LESSONS, parseCourses, lessonOfTask, canAccessLesson }
