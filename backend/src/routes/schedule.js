const router = require('express').Router()
const db = require('../db')
const { requireAdmin } = require('../middleware/auth')

// GET /api/schedule — public
router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM schedule ORDER BY day_num').all()
  res.json(rows.map(r => ({
    id: r.id,
    day: r.day_num,
    date: r.date_label,
    type: r.type,
    title: r.title,
    theory: JSON.parse(r.theory || '[]'),
    tasks: JSON.parse(r.tasks || '[]'),
    hw: r.hw || '',
    month: r.month,
    meeting_link: r.meeting_link || '',
    meeting_time: r.meeting_time || '',
  })))
})

// POST /api/schedule (admin)
router.post('/', requireAdmin, (req, res) => {
  const { day, date, type, title, theory, tasks, hw, month, meeting_link, meeting_time } = req.body
  if (!day || !title) return res.status(400).json({ message: 'day и title обязательны' })
  const r = db.prepare(`
    INSERT INTO schedule (day_num, date_label, type, title, theory, tasks, hw, month, meeting_link, meeting_time)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(day, date || '', type || 'lecture', title,
    JSON.stringify(Array.isArray(theory) ? theory : []),
    JSON.stringify(Array.isArray(tasks)  ? tasks  : []),
    hw || '', month || 'june', meeting_link || '', meeting_time || '')
  res.status(201).json({ id: r.lastInsertRowid, message: 'Добавлено' })
})

// PUT /api/schedule/:id (admin)
router.put('/:id', requireAdmin, (req, res) => {
  const { day, date, type, title, theory, tasks, hw, month, meeting_link, meeting_time } = req.body
  const r = db.prepare(`
    UPDATE schedule SET day_num=?, date_label=?, type=?, title=?, theory=?, tasks=?, hw=?, month=?, meeting_link=?, meeting_time=?
    WHERE id=?
  `).run(day, date || '', type || 'lecture', title,
    JSON.stringify(Array.isArray(theory) ? theory : []),
    JSON.stringify(Array.isArray(tasks)  ? tasks  : []),
    hw || '', month || 'june', meeting_link || '', meeting_time || '', req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

// DELETE /api/schedule/:id (admin)
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM schedule WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

module.exports = router
