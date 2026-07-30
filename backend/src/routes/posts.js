const router = require('express').Router()
const db = require('../db')
const { verifyToken } = require('../middleware/auth')

const REACTION_TYPES = ['heart', 'mind_blown', 'clap', 'party', 'cry']

const SELECT_POST_BASE = `
  SELECT
    posts.id, posts.text, posts.created_at,
    users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar_url
  FROM posts
  JOIN users ON users.id = posts.user_id
`
const SELECT_FEED = `${SELECT_POST_BASE} ORDER BY posts.created_at DESC, posts.id DESC`
const SELECT_ONE = `${SELECT_POST_BASE} WHERE posts.id = ?`

const SELECT_COMMENTS = `
  SELECT
    post_comments.id, post_comments.post_id, post_comments.text, post_comments.created_at,
    users.id AS user_id, users.name AS user_name, users.avatar_url AS user_avatar_url
  FROM post_comments
  JOIN users ON users.id = post_comments.user_id
  ORDER BY post_comments.created_at ASC, post_comments.id ASC
`

function emptyReactionCounts() {
  return REACTION_TYPES.reduce((acc, r) => ({ ...acc, [r]: 0 }), {})
}

function mapComment(row) {
  return {
    id: row.id,
    text: row.text,
    createdAt: row.created_at,
    author: { id: row.user_id, name: row.user_name, avatarUrl: row.user_avatar_url || '' },
  }
}

// Собирает реакции и комментарии для набора постов одним проходом (без N+1 на каждый пост)
function attachExtras(posts, currentUserId) {
  if (posts.length === 0) return posts
  const ids = posts.map(p => p.id)
  const placeholders = ids.map(() => '?').join(',')

  const reactionRows = db.prepare(
    `SELECT post_id, user_id, reaction FROM post_reactions WHERE post_id IN (${placeholders})`
  ).all(...ids)

  const commentRows = db.prepare(
    `${SELECT_COMMENTS.replace('ORDER BY', `WHERE post_comments.post_id IN (${placeholders}) ORDER BY`)}`
  ).all(...ids)

  const reactionsByPost = {}
  const myReactionByPost = {}
  reactionRows.forEach(r => {
    if (!reactionsByPost[r.post_id]) reactionsByPost[r.post_id] = emptyReactionCounts()
    reactionsByPost[r.post_id][r.reaction] = (reactionsByPost[r.post_id][r.reaction] || 0) + 1
    if (r.user_id === currentUserId) myReactionByPost[r.post_id] = r.reaction
  })

  const commentsByPost = {}
  commentRows.forEach(c => {
    if (!commentsByPost[c.post_id]) commentsByPost[c.post_id] = []
    commentsByPost[c.post_id].push(mapComment(c))
  })

  return posts.map(p => ({
    ...p,
    reactions: reactionsByPost[p.id] || emptyReactionCounts(),
    myReaction: myReactionByPost[p.id] || null,
    comments: commentsByPost[p.id] || [],
  }))
}

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

// GET /api/posts — лента постов, новые сверху, с реакциями и комментариями
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(SELECT_FEED).all().map(mapRow)
  res.json(attachExtras(rows, req.user.id))
})

// POST /api/posts — создать пост
router.post('/', verifyToken, (req, res) => {
  const text = (req.body.text || '').trim()
  if (!text) return res.status(400).json({ message: 'Текст поста не может быть пустым' })
  if (text.length > 2000) return res.status(400).json({ message: 'Слишком длинный пост (максимум 2000 символов)' })

  const r = db.prepare('INSERT INTO posts (user_id, text) VALUES (?, ?)').run(req.user.id, text)
  const row = mapRow(db.prepare(SELECT_ONE).get(r.lastInsertRowid))
  res.status(201).json({ ...row, reactions: emptyReactionCounts(), myReaction: null, comments: [] })
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

// PUT /api/posts/:id/reaction — поставить/сменить/снять реакцию (одна реакция на пользователя)
router.put('/:id/reaction', verifyToken, (req, res) => {
  const { reaction } = req.body
  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ message: 'Пост не найден' })
  if (!REACTION_TYPES.includes(reaction)) {
    return res.status(400).json({ message: 'Неизвестный тип реакции' })
  }

  const existing = db.prepare('SELECT reaction FROM post_reactions WHERE post_id = ? AND user_id = ?')
    .get(req.params.id, req.user.id)

  if (existing && existing.reaction === reaction) {
    // повторный клик по своей же реакции — снимаем её
    db.prepare('DELETE FROM post_reactions WHERE post_id = ? AND user_id = ?').run(req.params.id, req.user.id)
  } else {
    db.prepare(`
      INSERT INTO post_reactions (post_id, user_id, reaction) VALUES (?, ?, ?)
      ON CONFLICT(post_id, user_id) DO UPDATE SET reaction = excluded.reaction
    `).run(req.params.id, req.user.id, reaction)
  }

  const rows = db.prepare('SELECT user_id, reaction FROM post_reactions WHERE post_id = ?').all(req.params.id)
  const counts = emptyReactionCounts()
  let myReaction = null
  rows.forEach(r => {
    counts[r.reaction] = (counts[r.reaction] || 0) + 1
    if (r.user_id === req.user.id) myReaction = r.reaction
  })
  res.json({ reactions: counts, myReaction })
})

// GET /api/posts/:id/comments — все комментарии поста (пагинация — на фронтенде, объём небольшой)
router.get('/:id/comments', verifyToken, (req, res) => {
  const rows = db.prepare(`${SELECT_COMMENTS.replace('ORDER BY', 'WHERE post_comments.post_id = ? ORDER BY')}`)
    .all(req.params.id)
  res.json(rows.map(mapComment))
})

// POST /api/posts/:id/comments — добавить комментарий
router.post('/:id/comments', verifyToken, (req, res) => {
  const text = (req.body.text || '').trim()
  if (!text) return res.status(400).json({ message: 'Комментарий не может быть пустым' })
  if (text.length > 1000) return res.status(400).json({ message: 'Слишком длинный комментарий (максимум 1000 символов)' })

  const post = db.prepare('SELECT id FROM posts WHERE id = ?').get(req.params.id)
  if (!post) return res.status(404).json({ message: 'Пост не найден' })

  const r = db.prepare('INSERT INTO post_comments (post_id, user_id, text) VALUES (?, ?, ?)')
    .run(req.params.id, req.user.id, text)
  const row = db.prepare(`${SELECT_COMMENTS.replace('ORDER BY', 'WHERE post_comments.id = ? ORDER BY')}`).get(r.lastInsertRowid)
  res.status(201).json(mapComment(row))
})

module.exports = router
