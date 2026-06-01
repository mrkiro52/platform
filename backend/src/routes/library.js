const router = require('express').Router()
const db = require('../db')
const { verifyToken, requireAdmin } = require('../middleware/auth')

// GET /api/library — grouped by month → week → days with materials
router.get('/', (req, res) => {
  const days = db.prepare('SELECT * FROM library_days ORDER BY day_number').all()
  const mats = db.prepare('SELECT * FROM library_materials ORDER BY id').all()

  const matsByDay = {}
  mats.forEach(m => {
    if (!matsByDay[m.day_id]) matsByDay[m.day_id] = []
    matsByDay[m.day_id].push({ id: m.id, type: m.material_type, title: m.title, meta: m.meta, url: m.url })
  })

  // Group: month → week_name → days
  const monthOrder = ['june', 'july', 'august']
  const grouped = {}
  days.forEach(d => {
    const m = d.month
    if (!grouped[m]) grouped[m] = {}
    const w = d.week_name
    if (!grouped[m][w]) grouped[m][w] = []
    grouped[m][w].push({
      id: d.id, num: d.day_number, date: d.date_label, title: d.title,
      status: d.status, mats: matsByDay[d.id] || []
    })
  })

  const result = []
  monthOrder.forEach(month => {
    if (!grouped[month]) return
    Object.entries(grouped[month]).forEach(([week, weekDays]) => {
      result.push({ month, week, days: weekDays })
    })
  })
  res.json(result)
})

// GET /api/library/days — flat list (admin)
router.get('/days', requireAdmin, (req, res) => {
  res.json(db.prepare('SELECT * FROM library_days ORDER BY day_number').all())
})

// POST /api/library/days (admin)
router.post('/days', requireAdmin, (req, res) => {
  const { day_number, date_label, title, month, week_name, status } = req.body
  if (!day_number || !title) return res.status(400).json({ message: 'day_number и title обязательны' })
  const r = db.prepare(`
    INSERT INTO library_days (day_number, date_label, title, month, week_name, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(day_number, date_label || '', title, month || 'june', week_name || '', status || 'locked')
  res.status(201).json({ id: r.lastInsertRowid, message: 'День добавлен' })
})

// PUT /api/library/days/:id (admin)
router.put('/days/:id', requireAdmin, (req, res) => {
  const { day_number, date_label, title, month, week_name, status } = req.body
  const r = db.prepare(`
    UPDATE library_days SET day_number=?, date_label=?, title=?, month=?, week_name=?, status=? WHERE id=?
  `).run(day_number, date_label || '', title, month || 'june', week_name || '', status || 'locked', req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

// DELETE /api/library/days/:id (admin) — cascades to materials
router.delete('/days/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM library_days WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

// GET /api/library/materials (admin)
router.get('/materials', requireAdmin, (req, res) => {
  const rows = db.prepare(`
    SELECT m.*, d.day_number, d.title as day_title
    FROM library_materials m
    JOIN library_days d ON d.id = m.day_id
    ORDER BY d.day_number, m.id
  `).all()
  res.json(rows)
})

// POST /api/library/materials (admin)
router.post('/materials', requireAdmin, (req, res) => {
  const { day_id, material_type, title, meta, url } = req.body
  if (!day_id || !title) return res.status(400).json({ message: 'day_id и title обязательны' })
  const r = db.prepare(`
    INSERT INTO library_materials (day_id, material_type, title, meta, url)
    VALUES (?, ?, ?, ?, ?)
  `).run(day_id, material_type || 'link', title, meta || '', url || '#')
  res.status(201).json({ id: r.lastInsertRowid, message: 'Материал добавлен' })
})

// PUT /api/library/materials/:id (admin)
router.put('/materials/:id', requireAdmin, (req, res) => {
  const { day_id, material_type, title, meta, url } = req.body
  const r = db.prepare(`
    UPDATE library_materials SET day_id=?, material_type=?, title=?, meta=?, url=? WHERE id=?
  `).run(day_id, material_type || 'link', title, meta || '', url || '#', req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Обновлено' })
})

// DELETE /api/library/materials/:id (admin)
router.delete('/materials/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM library_materials WHERE id = ?').run(req.params.id)
  if (r.changes === 0) return res.status(404).json({ message: 'Не найдено' })
  res.json({ message: 'Удалено' })
})

module.exports = router
