const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

// GET /api/notifications/unread-count — объявлено до '/:id/read'
router.get('/unread-count', verifyToken, (req, res) => {
  const { c } = db.prepare(
    'SELECT COUNT(*) c FROM notifications WHERE user_id = ? AND read_at IS NULL'
  ).get(req.user.id)
  res.json({ count: c })
})

// GET /api/notifications — последние уведомления
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT
      n.id, n.type, n.post_id, n.preview, n.read_at, n.created_at,
      u.id AS actor_id, u.name AS actor_name, u.avatar_url AS actor_avatar
    FROM notifications n
    LEFT JOIN users u ON u.id = n.actor_id
    WHERE n.user_id = ?
    ORDER BY n.id DESC
    LIMIT 100
  `).all(req.user.id)

  res.json(rows.map(r => ({
    id: r.id,
    type: r.type,
    postId: r.post_id,
    preview: r.preview || '',
    readAt: r.read_at,
    createdAt: r.created_at,
    actor: r.actor_id
      ? { id: r.actor_id, name: r.actor_name, avatarUrl: r.actor_avatar || '' }
      : null,
  })))
})

// POST /api/notifications/read — пометить все прочитанными
router.post('/read', verifyToken, (req, res) => {
  db.prepare(
    'UPDATE notifications SET read_at = CURRENT_TIMESTAMP WHERE user_id = ? AND read_at IS NULL'
  ).run(req.user.id)
  res.json({ message: 'Отмечено прочитанным' })
})

module.exports = router
