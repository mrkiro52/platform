const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const { lessonOfTask } = require('../courses')

const course = 'python-trainer'
router.use(verifyToken, (req, res, next) => {
  const member = db.prepare('SELECT 1 FROM users WHERE id = ? AND (is_autumn_camp_2026 OR is_winter_camp_2027)').get(req.user.id ?? null)
  if (!member) return res.status(403).json({ message: 'Python-тренажёр доступен участникам осеннего и зимнего KIRO Camp' })
  next()
})

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT task_id, answer FROM course_progress WHERE course = ? AND user_id = ?').all(course, req.user.id)
  res.json(Object.fromEntries(rows.map(row => [row.task_id, row.answer])))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const answer = req.body?.answer
  if (!id.startsWith('trainer-') || !lessonOfTask('python', id.slice(8))) {
    return res.status(400).json({ message: 'Неизвестная задача тренажёра' })
  }
  if (typeof answer !== 'string' || answer.length > 20000) {
    return res.status(400).json({ message: 'Ответ должен содержать до 20 000 символов' })
  }
  db.prepare('INSERT INTO course_progress (course, user_id, task_id, answer) VALUES (?, ?, ?, ?) ON CONFLICT DO NOTHING').run(course, req.user.id, id, answer)
  const saved = db.prepare('SELECT answer FROM course_progress WHERE course = ? AND user_id = ? AND task_id = ?').get(course, req.user.id, id)
  res.json(saved)
})
module.exports = router
