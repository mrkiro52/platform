const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const { notify } = require('../notify')

function mapMessage(row, currentUserId) {
  return {
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
    readAt: row.read_at,
    senderId: row.sender_id,
    isMine: row.sender_id === currentUserId,
  }
}

// GET /api/messages/unread-count — общее число непрочитанных
// Объявлено до '/:userId', иначе путь перехватится как id собеседника.
router.get('/unread-count', verifyToken, (req, res) => {
  const { c } = db.prepare(
    'SELECT COUNT(*) c FROM messages WHERE recipient_id = ? AND read_at IS NULL'
  ).get(req.user.id)
  res.json({ count: c })
})

// GET /api/messages — список диалогов с последним сообщением
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT
      m.id, m.text, m.created_at, m.read_at, m.sender_id,
      u.id AS partner_id, u.name AS partner_name, u.avatar_url AS partner_avatar,
      (
        SELECT COUNT(*) FROM messages
        WHERE sender_id = u.id AND recipient_id = ? AND read_at IS NULL
      ) AS unread
    FROM messages m
    JOIN users u
      ON u.id = CASE WHEN m.sender_id = ? THEN m.recipient_id ELSE m.sender_id END
    WHERE m.id IN (
      SELECT MAX(id) FROM messages
      WHERE sender_id = ? OR recipient_id = ?
      GROUP BY CASE WHEN sender_id = ? THEN recipient_id ELSE sender_id END
    )
    ORDER BY m.id DESC
  `).all(req.user.id, req.user.id, req.user.id, req.user.id, req.user.id)

  res.json(rows.map(r => ({
    partner: {
      id: r.partner_id,
      name: r.partner_name,
      avatarUrl: r.partner_avatar || '',
    },
    unread: r.unread,
    lastMessage: {
      id: r.id,
      text: r.text,
      createdAt: r.created_at,
      isMine: r.sender_id === req.user.id,
    },
  })))
})

// GET /api/messages/:userId — переписка с пользователем (входящие помечаются прочитанными)
router.get('/:userId', verifyToken, (req, res) => {
  const partner = db.prepare(
    'SELECT id, name, avatar_url FROM users WHERE id = ?'
  ).get(req.params.userId)
  if (!partner) return res.status(404).json({ message: 'Пользователь не найден' })

  const rows = db.prepare(`
    SELECT id, text, created_at, read_at, sender_id FROM messages
    WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)
    ORDER BY id ASC
  `).all(req.user.id, partner.id, partner.id, req.user.id)

  db.prepare(
    'UPDATE messages SET read_at = CURRENT_TIMESTAMP WHERE recipient_id = ? AND sender_id = ? AND read_at IS NULL'
  ).run(req.user.id, partner.id)

  res.json({
    partner: {
      id: partner.id,
      name: partner.name,
      avatarUrl: partner.avatar_url || '',
    },
    messages: rows.map(r => mapMessage(r, req.user.id)),
  })
})

// POST /api/messages/:userId — отправить сообщение
router.post('/:userId', verifyToken, (req, res) => {
  const text = (req.body.text || '').trim()
  if (!text) return res.status(400).json({ message: 'Сообщение не может быть пустым' })
  if (text.length > 4000) return res.status(400).json({ message: 'Слишком длинное сообщение (максимум 4000 символов)' })

  const recipientId = Number(req.params.userId)
  if (recipientId === req.user.id) {
    return res.status(400).json({ message: 'Нельзя написать самому себе' })
  }
  const partner = db.prepare('SELECT id FROM users WHERE id = ?').get(recipientId)
  if (!partner) return res.status(404).json({ message: 'Пользователь не найден' })

  const r = db.prepare(
    'INSERT INTO messages (sender_id, recipient_id, text) VALUES (?, ?, ?)'
  ).run(req.user.id, recipientId, text)

  notify({ userId: recipientId, actorId: req.user.id, type: 'message', preview: text })

  const row = db.prepare(
    'SELECT id, text, created_at, read_at, sender_id FROM messages WHERE id = ?'
  ).get(r.lastInsertRowid)
  res.status(201).json(mapMessage(row, req.user.id))
})

module.exports = router
