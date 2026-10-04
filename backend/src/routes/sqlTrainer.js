const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const trainer = require('../sqlTrainer')
const { CATEGORIES, TASKS, COLUMN_DOCS } = require('../sqlTrainer/tasks')

const TASK_IDS = new Set(TASKS.map(t => t.id))

// Решённые задачи человека — только те, что ещё есть в тренажёре
function solvedOf(userId) {
  return db.prepare('SELECT task_id FROM sql_trainer_solved WHERE user_id = ?').all(userId)
    .map(r => r.task_id).filter(id => TASK_IDS.has(id))
}

// Топ-5 по числу решённых задач; при равенстве выше тот, кто решил раньше
function leaderboard() {
  return db.prepare(`
    SELECT u.id, u.nickname, u.name, u.avatar_url AS avatarUrl,
           COUNT(*) AS solved, MAX(s.solved_at) AS lastAt
      FROM sql_trainer_solved s
      JOIN users u ON u.id = s.user_id
     GROUP BY u.id
     ORDER BY solved DESC, lastAt ASC, u.id ASC
     LIMIT 5`).all().map(({ lastAt, ...r }) => r)
}

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
      solved: Number.isInteger(req.user.id) ? solvedOf(req.user.id) : [],
      leaderboard: leaderboard(),
      categories: CATEGORIES.map(c => ({
        id: c.id,
        title: c.title,
        tasks: c.tasks.map((t, i) => ({ id: `${c.id}-${i + 1}`, title: t.title, text: t.text, hint: t.hint, ordered: !!t.ordered })),
      })),
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
  const id = typeof taskId === 'string' && /^[a-z]+-\d+$/.test(taskId) ? taskId : null
  const result = await trainer.run(sql, id)
  if (result.ok && result.verdict && result.verdict.correct && id && TASK_IDS.has(id) && Number.isInteger(req.user.id)) {
    try {
      db.prepare('INSERT OR IGNORE INTO sql_trainer_solved (user_id, task_id, solved_at) VALUES (?, ?, ?)')
        .run(req.user.id, id, new Date().toISOString())
    } catch (e) {
      console.error('sql-trainer: прогресс не сохранился —', e.message)
    }
  }
  res.status(result.busy ? 503 : 200).json(result)
})

module.exports = router
