// Мини-курсы: какие курсы куплены у пользователя. Хранятся в users.courses
// JSON-массивом слагов; доступ выдаёт админ галочками после оплаты.
const COURSE_SLUGS = ['python', 'math-ml', 'algorithms']

function parseCourses(raw) {
  try {
    const list = JSON.parse(raw || '[]')
    return Array.isArray(list) ? COURSE_SLUGS.filter(s => list.includes(s)) : []
  } catch {
    return []
  }
}

module.exports = { COURSE_SLUGS, parseCourses }
