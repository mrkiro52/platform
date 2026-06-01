const router = require('express').Router()
const db = require('../db')
const { verifyToken, requireAdmin } = require('../middleware/auth')

// GET /api/tasks — list tasks with current user's status
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT t.id, t.title, t.description, t.week, t.difficulty as diff, t.deadline,
           COALESCE(ut.status, 'locked') as status
    FROM tasks t
    LEFT JOIN user_tasks ut ON ut.task_id = t.id AND ut.user_id = ?
    ORDER BY t.week, t.id
  `).all(req.user.id)
  res.json(rows)
})

// PATCH /api/tasks/:id/status — toggle task status (user)
router.patch('/:id/status', verifyToken, (req, res) => {
  const { status } = req.body
  if (!['done', 'active', 'locked'].includes(status)) {
    return res.status(400).json({ message: 'Статус должен быть done, active или locked' })
  }
  db.prepare(`
    INSERT INTO user_tasks (user_id, task_id, status) VALUES (?, ?, ?)
    ON CONFLICT(user_id, task_id) DO UPDATE SET status = excluded.status
  `).run(req.user.id, req.params.id, status)

  // Update completed_tasks count
  const done = db.prepare('SELECT COUNT(*) as c FROM user_tasks WHERE user_id=? AND status=?').get(req.user.id, 'done').c
  db.prepare('UPDATE users SET completed_tasks=? WHERE id=?').run(done, req.user.id)

  res.json({ message: 'Статус обновлён', status })
})

// GET /api/tasks/all (admin) — all tasks without user filter
router.get('/all', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM tasks ORDER BY week, id').all())
})

// POST /api/tasks (admin)
router.post('/', requireAdmin, (req, res) => {
  const { title, description, week, difficulty, deadline } = req.body
  if (!title) return res.status(400).json({ message: 'title обязателен' })
  const r = db.prepare(`
    INSERT INTO tasks (title, description, week, difficulty, deadline)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, description || '', week || 1, difficulty || 'medium', deadline || '')

  // Assign to all users as locked
  const users = db.prepare('SELECT id FROM users').all()
  const ins = db.prepare('INSERT OR IGNORE INTO user_tasks (user_id, task_id, status) VALUES (?, ?, ?)')
  users.forEach(u => ins.run(u.id, r.lastInsertRowid, 'locked'))

  res.status(201).json({ id: r.lastInsertRowid, message: 'Задание добавлено' })
})

// PUT /api/tasks/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const { title, description, week, difficulty, deadline } = req.body
  const r = db.prepare(`
    UPDATE tasks SET title=?, description=?, week=?, difficulty=?, deadline=? WHERE id=?
  `).run(title, description || '', week || 1, difficulty || 'medium', deadline || '', req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

// DELETE /api/tasks/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM tasks WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

// PATCH /api/tasks/:taskId/users/:userId/status (admin)
router.patch('/:taskId/users/:userId/status', requireAdmin, (req, res) => {
  const { status } = req.body
  db.prepare(`
    INSERT INTO user_tasks (user_id, task_id, status) VALUES (?, ?, ?)
    ON CONFLICT(user_id, task_id) DO UPDATE SET status = excluded.status
  `).run(req.params.userId, req.params.taskId, status)
  res.json({ message: 'Обновлено' })
})

module.exports = router
