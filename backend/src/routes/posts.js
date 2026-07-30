const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const SELECT_POST_BASE = `
  SELECT
    posts.id, posts.text, posts.created_at,
    users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar_url
  FROM posts
  JOIN users ON users.id = posts.user_id
`
const SELECT_FEED = `${SELECT_POST_BASE} ORDER BY posts.created_at DESC, posts.id DESC`
const SELECT_ONE = `${SELECT_POST_BASE} WHERE posts.id = ?`

function mapRow(row) {
  return {
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
    author: {
      id: row.user_id,
      name: row.user_name,
      avatarUrl: row.user_avatar_url || '',
    },
  }
}

// GET /api/posts — лента постов, новые сверху
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(SELECT_FEED).all()
  res.json(rows.map(mapRow))
})

// POST /api/posts — создать пост
router.post('/', verifyToken, (req, res) => {
  const text = (req.body.text || '').trim()
  if (!text) return res.status(400).json({ message: 'Текст поста не может быть пустым' })
  if (text.length > 2000) return res.status(400).json({ message: 'Слишком длинный пост (максимум 2000 символов)' })

  const r = db.prepare('INSERT INTO posts (user_id, text) VALUES (?, ?)').run(req.user.id, text)
  const row = db.prepare(SELECT_ONE).get(r.lastInsertRowid)
  res.status(201).json(mapRow(row))
})

// DELETE /api/posts/:id — автор может удалить свой пост
router.delete('/:id', verifyToken, (req, res) => {
  const post = db.prepare('SELECT user_id FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ message: 'Пост не найден' })
  if (post.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Можно удалять только свои посты' })
  }
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id)
  res.json({ message: 'Удалено' })
})

module.exports = router
