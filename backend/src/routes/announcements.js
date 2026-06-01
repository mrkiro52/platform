const router = require('express').Router()
const db = require('../db')
const { requireAdmin } = require('../middleware/auth')

// GET /api/announcements — public
router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM announcements ORDER BY published_at DESC').all())
})

// POST /api/announcements (admin)
router.post('/', requireAdmin, (req, res) => {
  const { title, text, icon, published_at } = req.body
  if (!title || !text) return res.status(400).json({ message: 'title и text обязательны' })
  const r = db.prepare(`
    INSERT INTO announcements (title, text, icon, published_at) VALUES (?, ?, ?, ?)
  `).run(title, text, icon || '📢', published_at || new Date().toISOString().slice(0, 10))
  res.status(201).json({ id: r.lastInsertRowid, message: 'Объявление добавлено' })
})

// PUT /api/announcements/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const { title, text, icon, published_at } = req.body
  const r = db.prepare(`
    UPDATE announcements SET title=?, text=?, icon=?, published_at=? WHERE id=?
  `).run(title, text, icon || '📢', published_at, req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

// DELETE /api/announcements/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM announcements WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

module.exports = router
