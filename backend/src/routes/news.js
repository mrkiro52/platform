const router = require('express').Router()
const db = require('../db')
const { requireAdmin } = require('../middleware/auth')

router.get('/', (req, res) => {
  res.json(db.prepare('SELECT * FROM news ORDER BY published_at DESC, id DESC').all())
})

router.post('/', requireAdmin, (req, res) => {
  const { title, text, published_at } = req.body
  if (!title || !text) return res.status(400).json({ message: 'title и text обязательны' })
  const r = db.prepare('INSERT INTO news (title, text, published_at) VALUES (?, ?, ?)').run(
    title, text, published_at || new Date().toISOString().slice(0, 10)
  )
  res.status(201).json({ id: r.lastInsertRowid, message: 'Новость добавлена' })
})

router.put('/:id', requireAdmin, (req, res) => {
  const { title, text, published_at } = req.body
  const r = db.prepare('UPDATE news SET title=?, text=?, published_at=? WHERE id=?').run(
    title, text, published_at, req.params.id
  )
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM news WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

module.exports = router
