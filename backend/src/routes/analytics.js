const router = require('express').Router()
const { verifyToken, requireAdmin } = require('../middleware/auth')
const analytics = require('../analytics')

// Фронтенд шлёт пачку раз в полминуты плюс при сворачивании вкладки.
// Двенадцати в минуту хватает с запасом, больше — уже не обычный браузер.
const WINDOW_MS = 60 * 1000
const MAX_BATCHES = 12
const hits = new Map()

function rateLimit(req, res, next) {
  const now = Date.now()
  const recent = (hits.get(req.user.id) || []).filter(t => now - t < WINDOW_MS)
  if (recent.length >= MAX_BATCHES) return res.status(429).end()
  recent.push(now)
  hits.set(req.user.id, recent)
  next()
}

// POST /api/analytics/events — пачка событий от фронтенда платформы.
// Отвечает 204 при любом исходе: аналитика не должна мешать работе.
router.post('/events', verifyToken, (req, res, next) => {
  // Токен админки — не участник, его действия не считаем
  if (!Number.isInteger(req.user.id)) return res.status(204).end()
  next()
}, rateLimit, (req, res) => {
  try {
    analytics.ingest(req.user.id, req.body || {})
  } catch (e) {
    console.error('analytics: пачка не записалась —', e.message)
  }
  res.status(204).end()
})

// GET /api/analytics/admin/overview?days=7|30|90 — сводка для дашборда
router.get('/admin/overview', requireAdmin, (req, res) => {
  const period = [7, 30, 90].includes(Number(req.query.days)) ? Number(req.query.days) : 30
  try {
    res.json(analytics.overview(period))
  } catch (e) {
    console.error('analytics: сводка не собралась —', e)
    res.status(500).json({ message: 'Не удалось собрать аналитику' })
  }
})

module.exports = router
