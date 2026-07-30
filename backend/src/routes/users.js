const router = require('express').Router()
const bcrypt = require('bcryptjs')
const multer = require('multer')
const db = require('../db')
const { requireAdmin, verifyToken } = require('../middleware/auth')
const { uploadAvatar, deleteAvatar, keyFromUrl, s3Configured } = require('../s3')

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.mimetype)) {
      return cb(new Error('Разрешены только изображения JPEG, PNG, WebP или GIF'))
    }
    cb(null, true)
  },
})

// GET /api/users/me — current user's own profile
router.get('/me', verifyToken, (req, res) => {
  const user = db.prepare('SELECT id, name, nickname, email, track, plan, bio, position, birthday, avatar_url FROM users WHERE id = ?').get(req.user.id)
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
  res.json(user)
})

// POST /api/users/me/avatar — upload/replace profile picture (stored in S3)
router.post('/me/avatar', verifyToken, (req, res) => {
  if (!s3Configured) {
    return res.status(503).json({ message: 'Загрузка изображений временно недоступна — не настроено S3-хранилище' })
  }
  upload.single('avatar')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message })
    if (!req.file) return res.status(400).json({ message: 'Файл не найден' })

    try {
      const prev = db.prepare('SELECT avatar_url FROM users WHERE id = ?').get(req.user.id)
      const ext = (req.file.mimetype.split('/')[1] || 'jpg').replace('jpeg', 'jpg')
      const key = `avatars/${req.user.id}-${Date.now()}.${ext}`
      const url = await uploadAvatar(key, req.file.buffer, req.file.mimetype)

      db.prepare('UPDATE users SET avatar_url=? WHERE id=?').run(url, req.user.id)

      const oldKey = keyFromUrl(prev?.avatar_url)
      if (oldKey) deleteAvatar(oldKey).catch(() => {})

      const user = db.prepare('SELECT id, name, nickname, email, track, plan, bio, position, birthday, avatar_url FROM users WHERE id = ?').get(req.user.id)
      res.json(user)
    } catch (e) {
      res.status(500).json({ message: 'Не удалось загрузить изображение' })
    }
  })
})

// PUT /api/users/me — update own profile (name, email, login, password, bio, position, birthday)
router.put('/me', verifyToken, (req, res) => {
  const { name, email, nickname, password, bio, position, birthday } = req.body
  if (!name || !email || !nickname) {
    return res.status(400).json({ message: 'Имя, почта и логин обязательны' })
  }

  try {
    if (password) {
      db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(bcrypt.hashSync(password, 10), req.user.id)
    }
    db.prepare('UPDATE users SET name=?, email=?, nickname=?, bio=?, position=?, birthday=? WHERE id=?')
      .run(name, email, nickname, bio ?? '', position ?? '', birthday ?? '', req.user.id)
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ message: 'Такая почта уже используется другим пользователем' })
    throw e
  }

  const user = db.prepare('SELECT id, name, nickname, email, track, plan, bio, position, birthday, avatar_url FROM users WHERE id = ?').get(req.user.id)
  res.json(user)
})

// GET /api/users
router.get('/', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT id, name, points, streak, created_at FROM users ORDER BY created_at DESC').all())
})

// POST /api/users — create user (login + password)
router.post('/', requireAdmin, (req, res) => {
  const { login, password } = req.body
  if (!login || !password) return res.status(400).json({ message: 'login и password обязательны' })
  if (db.prepare('SELECT id FROM users WHERE name = ?').get(login)) {
    return res.status(409).json({ message: 'Пользователь с таким логином уже существует' })
  }
  const hash = bcrypt.hashSync(password, 10)
  try {
    const r = db.prepare(`
      INSERT INTO users (nickname, name, email, password_hash, track, plan, tariff)
      VALUES (?, ?, ?, ?, 'Frontend', 'С ментором', 49900)
    `).run(login, login, login, hash)
    const tasks = db.prepare('SELECT id FROM tasks').all()
    const ins = db.prepare('INSERT OR IGNORE INTO user_tasks (user_id, task_id, status) VALUES (?, ?, ?)')
    tasks.forEach(t => ins.run(r.lastInsertRowid, t.id, 'locked'))
    res.status(201).json({ id: r.lastInsertRowid, message: 'Пользователь создан' })
  } catch (e) {
    if (e.message.includes('UNIQUE')) return res.status(409).json({ message: 'Логин уже занят' })
    throw e
  }
})

// PUT /api/users/:id — update user
router.put('/:id', requireAdmin, (req, res) => {
  const { login, password } = req.body
  if (!login) return res.status(400).json({ message: 'login обязателен' })
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(req.params.id)
  if (!user) return res.status(404).json({ message: 'Пользователь не найден' })
  if (password) {
    db.prepare('UPDATE users SET password_hash=? WHERE id=?').run(bcrypt.hashSync(password, 10), req.params.id)
  }
  db.prepare('UPDATE users SET name=?, nickname=?, email=? WHERE id=?').run(login, login, login, req.params.id)
  res.json({ message: 'Обновлено' })
})

// DELETE /api/users/:id
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Пользователь не найден' })
  res.json({ message: 'Удалён' })
})

module.exports = router
