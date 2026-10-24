const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const { COURSE_SLUGS, parseCourses, lessonOfTask, canAccessLesson } = require('../courses')

// Прогресс по мини-курсам: решённые задачи и принятые решения. Хранится на
// сервере, чтобы был виден после перезагрузки и с любого устройства.
// Проверка решения идёт в браузере — сервер только запоминает результат,
// и только для уроков, открытых пользователю (купленный курс или бесплатный урок).

const MAX_ANSWER = 20000

// GET /api/courses/progress — { python: { w1d1t1: { answer, solvedAt } }, ... }
router.get('/progress', verifyToken, (req, res) => {
  const rows = db.prepare('SELECT course, task_id, answer, solved_at FROM course_progress WHERE user_id = ?').all(req.user.id)
  const out = Object.fromEntries(COURSE_SLUGS.map(c => [c, {}]))
  for (const r of rows) {
    if (out[r.course]) out[r.course][r.task_id] = { answer: r.answer, solvedAt: r.solved_at }
  }
  res.json(out)
})

// POST /api/courses/progress — { course, taskId, answer } — задача решена.
// Первое принятое решение не перезаписывается: после решения поле ответа закрыто
router.post('/progress', verifyToken, (req, res) => {
  const { course, taskId, answer } = req.body || {}
  if (!COURSE_SLUGS.includes(course)) return res.status(400).json({ message: 'Неизвестный курс' })
  const lessonId = lessonOfTask(course, taskId)
  if (!lessonId) return res.status(400).json({ message: 'Неизвестная задача' })
  if (answer != null && typeof answer !== 'string') return res.status(400).json({ message: 'Решение должно быть строкой' })
  if (answer != null && answer.length > MAX_ANSWER) return res.status(400).json({ message: 'Слишком длинное решение' })
  const user = db.prepare('SELECT courses FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
  if (!canAccessLesson(parseCourses(user.courses), course, lessonId)) {
    return res.status(403).json({ message: 'Урок откроется после покупки курса' })
  }
  db.prepare(`
    INSERT INTO course_progress (user_id, course, task_id, answer) VALUES (?, ?, ?, ?)
    ON CONFLICT (user_id, course, task_id) DO UPDATE SET answer = COALESCE(course_progress.answer, excluded.answer)
  `).run(req.user.id, course, taskId, answer ?? null)
  const row = db.prepare('SELECT answer, solved_at FROM course_progress WHERE user_id = ? AND course = ? AND task_id = ?').get(req.user.id, course, taskId)
  res.json({ course, taskId, answer: row.answer, solvedAt: row.solved_at })
})

module.exports = router
