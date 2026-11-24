const router = require('express').Router()
const db = require('../db')
const originalBank = require('../data/entrance')
const foundation = require('../data/entrance-foundation.json')

function questionsFor(userId, version) {
  if (version !== '2') return originalBank
  const base = Object.entries(foundation).flatMap(([topic, pool]) => {
    const count = topic.startsWith('Python') ? 2 : 1
    const offset = userId % pool.length
    return Array.from({ length: count }, (_, i) => pool[(offset + i) % pool.length])
  })
  return { ...originalBank, base }
}
const { verifyToken, requireAdmin } = require('../middleware/auth')

router.get('/results', requireAdmin, (req, res) => {
  const rows = db.prepare('SELECT u.nickname, r.track, r.responses, r.submitted_at FROM entrance_results r JOIN users u ON u.id = r.user_id ORDER BY r.submitted_at DESC').all()
  res.json(rows.map(row => ({ ...row, responses: JSON.parse(row.responses) })))
})

router.use(verifyToken, (req, res, next) => {
  if (!db.prepare('SELECT 1 FROM users WHERE id = ? AND entrance_access = 1').get(req.user.id ?? null)) {
    return res.status(403).json({ message: 'Для аккаунта пока не открыто тестирование.' })
  }
  next()
})
router.get('/', (req, res) => {
  const submitted = !!db.prepare('SELECT 1 FROM entrance_results WHERE user_id = ?').get(req.user.id)
  res.json(submitted ? { submitted } : { submitted, bank: questionsFor(req.user.id, req.query.version) })
})
router.post('/', (req, res) => {
  const { track, answers } = req.body || {}
  if (!['ml', 'backend', 'security'].includes(track) || !answers || typeof answers !== 'object' || Array.isArray(answers)) {
    return res.status(400).json({ message: 'Выбери направление тестирования.' })
  }
  const bank = questionsFor(req.user.id, req.body.version)
  const responses = []
  for (const [id, topic, question] of [...bank.base, ...bank[track]]) {
    const value = answers[id] ?? ''
    if (typeof value !== 'string' || value.length > 1500) return res.status(400).json({ message: 'Максимум 1500 символов на ответ.' })
    responses.push({ topic, question, answer: value.trim() || 'Не ответил' })
  }
  db.prepare('INSERT INTO entrance_results (user_id, track, responses) VALUES (?, ?, ?) ON CONFLICT(user_id) DO NOTHING').run(req.user.id, track, JSON.stringify(responses))
  res.json({ submitted: true })
})
module.exports = router
