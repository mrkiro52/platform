const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const { notify } = require('../notify')

// Публичные поля профиля. Намеренно НЕ отдаём email и nickname —
// nickname используется как логин при входе, публиковать его нельзя.
const PUBLIC_FIELDS = `
  users.id, users.name, users.position, users.bio, users.track,
  users.avatar_url, users.created_at
`

function withCounts(user, currentUserId) {
  if (!user) return null
  const posts = db.prepare('SELECT COUNT(*) c FROM posts WHERE user_id = ?').get(user.id).c
  const followers = db.prepare('SELECT COUNT(*) c FROM follows WHERE following_id = ?').get(user.id).c
  const following = db.prepare('SELECT COUNT(*) c FROM follows WHERE follower_id = ?').get(user.id).c
  const isFollowing = Boolean(db.prepare(
    'SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?'
  ).get(currentUserId, user.id))

  return {
    id: user.id,
    name: user.name,
    position: user.position || '',
    bio: user.bio || '',
    track: user.track || '',
    avatarUrl: user.avatar_url || '',
    createdAt: user.created_at,
    stats: { posts, followers, following },
    isFollowing,
    isMe: user.id === currentUserId,
  }
}

// GET /api/social/people?q= — каталог участников с поиском
router.get('/people', verifyToken, (req, res) => {
  const q = (req.query.q || '').trim()
  const rows = q
    ? db.prepare(`
        SELECT ${PUBLIC_FIELDS} FROM users
        WHERE users.name LIKE ? OR users.position LIKE ?
        ORDER BY users.name COLLATE NOCASE
      `).all(`%${q}%`, `%${q}%`)
    : db.prepare(`SELECT ${PUBLIC_FIELDS} FROM users ORDER BY users.name COLLATE NOCASE`).all()

  res.json(rows.map(u => withCounts(u, req.user.id)))
})

// GET /api/social/users/:id — публичный профиль
router.get('/users/:id', verifyToken, (req, res) => {
  const user = db.prepare(`SELECT ${PUBLIC_FIELDS} FROM users WHERE users.id = ?`).get(req.params.id)
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
  res.json(withCounts(user, req.user.id))
})

// POST /api/social/users/:id/follow — подписаться / отписаться (переключатель)
router.post('/users/:id/follow', verifyToken, (req, res) => {
  const targetId = Number(req.params.id)
  if (targetId === req.user.id) {
    return res.status(400).json({ message: 'Нельзя подписаться на самого себя' })
  }
  const target = db.prepare('SELECT id, name FROM users WHERE id = ?').get(targetId)
  if (!target) return res.status(404).json({ message: 'Пользователь не найден' })

  const existing = db.prepare(
    'SELECT id FROM follows WHERE follower_id = ? AND following_id = ?'
  ).get(req.user.id, targetId)

  if (existing) {
    db.prepare('DELETE FROM follows WHERE id = ?').run(existing.id)
  } else {
    db.prepare('INSERT INTO follows (follower_id, following_id) VALUES (?, ?)').run(req.user.id, targetId)
    notify({ userId: targetId, actorId: req.user.id, type: 'follow' })
  }

  const followers = db.prepare('SELECT COUNT(*) c FROM follows WHERE following_id = ?').get(targetId).c
  res.json({ isFollowing: !existing, followers })
})

// GET /api/social/users/:id/followers — кто подписан на пользователя
router.get('/users/:id/followers', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT ${PUBLIC_FIELDS} FROM follows
    JOIN users ON users.id = follows.follower_id
    WHERE follows.following_id = ?
    ORDER BY follows.created_at DESC
  `).all(req.params.id)
  res.json(rows.map(u => withCounts(u, req.user.id)))
})

// GET /api/social/users/:id/following — на кого подписан пользователь
router.get('/users/:id/following', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT ${PUBLIC_FIELDS} FROM follows
    JOIN users ON users.id = follows.following_id
    WHERE follows.follower_id = ?
    ORDER BY follows.created_at DESC
  `).all(req.params.id)
  res.json(rows.map(u => withCounts(u, req.user.id)))
})

module.exports = router
