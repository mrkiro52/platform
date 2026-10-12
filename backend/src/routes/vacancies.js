const express = require('express')
const db = require('../db')
const { verifyToken, requireAdmin } = require('../middleware/auth')

const router = express.Router()

// Вакансии для участников лагеря. Читать может любой вошедший пользователь,
// добавлять, менять и удалять — только главный админ.
const VACANCY_CATEGORIES = ['fullstack', 'backend', 'analytics', 'ml', 'security', 'other']
const LIMITS = { title: 200, description: 20000, contact: 300 }

function clean(body) {
  const title = String(body?.title || '').trim()
  const description = String(body?.description || '').trim()
  const contact = String(body?.contact || '').trim()
  const category = String(body?.category || '')
  if (!title) return { error: 'Укажи название вакансии' }
  if (!contact) return { error: 'Укажи контакт для связи' }
  if (!VACANCY_CATEGORIES.includes(category)) return { error: 'Неизвестная категория' }
  for (const [key, max] of Object.entries(LIMITS)) {
    if ({ title, description, contact }[key].length > max) return { error: `Слишком длинное поле ${key}` }
  }
  return { value: { title, description, contact, category } }
}

// GET /api/vacancies — все вакансии, свежие сверху
router.get('/', verifyToken, (req, res) => {
  res.json(db.prepare('SELECT * FROM vacancies ORDER BY created_at DESC, id DESC').all())
})

// GET /api/vacancies/:id — одна вакансия
router.get('/:id', verifyToken, (req, res) => {
  const row = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(Number(req.params.id))
  if (!row) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json(row)
})

// POST /api/vacancies — создать
router.post('/', requireAdmin, (req, res) => {
  const { error, value } = clean(req.body)
  if (error) return res.status(400).json({ message: error })
  const r = db.prepare('INSERT INTO vacancies (title, description, category, contact) VALUES (?, ?, ?, ?)')
    .run(value.title, value.description, value.category, value.contact)
  res.status(201).json(db.prepare('SELECT * FROM vacancies WHERE id = ?').get(r.lastInsertRowid))
})

// PUT /api/vacancies/:id — изменить
router.put('/:id', requireAdmin, (req, res) => {
  const { error, value } = clean(req.body)
  if (error) return res.status(400).json({ message: error })
  const r = db.prepare(`UPDATE vacancies SET title = ?, description = ?, category = ?, contact = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(value.title, value.description, value.category, value.contact, Number(req.params.id))
  if (!r.changes) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json(db.prepare('SELECT * FROM vacancies WHERE id = ?').get(Number(req.params.id)))
})

// DELETE /api/vacancies/:id — удалить
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM vacancies WHERE id = ?').run(Number(req.params.id))
  if (!r.changes) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json({ ok: true })
})

module.exports = router
