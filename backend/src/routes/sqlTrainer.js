const router = require('express').Router()
const { verifyToken } = require('../middleware/auth')
const trainer = require('../sqlTrainer')
const { TASKS, COLUMN_DOCS } = require('../sqlTrainer/tasks')

// Не больше 30 запусков в минуту на человека — с запасом для обычной
// работы, но не даёт загрузить тренажёр скриптом
const WINDOW_MS = 60 * 1000
const MAX_RUNS = 30
const hits = new Map()

function rateLimit(req, res, next) {
  const key = req.user.id || req.user.username
  const now = Date.now()
  const recent = (hits.get(key) || []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_RUNS) return res.status(429).json({ message: 'Слишком много запросов подряд — подожди минуту' })
  recent.push(now)
  hits.set(key, recent)
  next()
}

// GET /api/sql-trainer — задания (без эталонных запросов) и схема базы
router.get('/', verifyToken, async (req, res) => {
  try {
    const schema = await trainer.getSchema()
    res.json({
      tasks: TASKS.map(({ id, title, text, hint }) => ({ id, title, text, hint })),
      schema: schema.map(t => ({
        ...t,
        description: (COLUMN_DOCS[t.table] || {})._ || '',
        columns: t.columns.map(c => ({ ...c, description: (COLUMN_DOCS[t.table] || {})[c.name] || '' })),
      })),
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// POST /api/sql-trainer/run — выполнить запрос и, если указано задание, проверить ответ
router.post('/run', verifyToken, rateLimit, async (req, res) => {
  const { sql, taskId } = req.body || {}
  if (typeof sql !== 'string' || !sql.trim()) return res.status(400).json({ message: 'Напиши запрос' })
  if (sql.length > 5000) return res.status(400).json({ message: 'Запрос слишком длинный' })
  const result = await trainer.run(sql, Number.isInteger(taskId) ? taskId : null)
  res.status(result.busy ? 503 : 200).json(result)
})

module.exports = router
