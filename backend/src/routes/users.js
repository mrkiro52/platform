const router = require('express').Router()
const bcrypt = require('bcryptjs')
const db = require('../db')
const { requireAdmin } = require('../middleware/auth')

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
