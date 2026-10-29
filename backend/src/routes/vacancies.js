const express = require('express')
const db = require('../db')
const { verifyToken, requireAdmin } = require('../middleware/auth')

const router = express.Router()

// Вакансии для участников лагеря. Читать может любой вошедший пользователь,
// добавлять, менять и удалять — только главный админ.
const VACANCY_CATEGORIES = ['fullstack', 'backend', 'analytics', 'ml', 'security', 'other']
const DEFAULT_LIMIT = 12
const MAX_LIMIT = 50
const LIMITS = { title: 200, description: 20000, contact: 300 }

function clean(body) {
  const title = String(body?.title || '').trim()
  const description = String(body?.description || '').trim()
  const contact = String(body?.contact || '').trim()
  // Категорий несколько: categories — массив ключей; одиночное category принимаем для совместимости
  const raw = Array.isArray(body?.categories) ? body.categories : body?.category ? [body.category] : []
  const categories = VACANCY_CATEGORIES.filter(c => raw.includes(c))
  if (!title) return { error: 'Укажи название вакансии' }
  if (!contact) return { error: 'Укажи контакт для связи' }
  if (!categories.length) return { error: 'Выбери хотя бы одну категорию' }
  if (raw.some(c => !VACANCY_CATEGORIES.includes(c))) return { error: 'Неизвестная категория' }
  for (const [key, max] of Object.entries(LIMITS)) {
    if ({ title, description, contact }[key].length > max) return { error: `Слишком длинное поле ${key}` }
  }
  return { value: { title, description, contact, categories } }
}

// В ответе категории — массив categories; category — первая из них (для старых клиентов)
function present(row) {
  let categories = []
  try { categories = JSON.parse(row.categories || '[]') } catch { /* старая запись без категорий */ }
  categories = VACANCY_CATEGORIES.filter(c => categories.includes(c))
  if (!categories.length) categories = [VACANCY_CATEGORIES.includes(row.category) ? row.category : 'other']
  return { ...row, categories, category: categories[0] }
}

// GET /api/vacancies — вакансии, свежие сверху.
// Без параметров — весь список массивом (им пользуется админка). С page и/или limit —
// постраничная выдача: { items, total, page, pages, limit, categories }.
//   page — номер страницы с 1; limit — вакансий на странице (по умолчанию 12, не больше 50);
//   category — одна или несколько категорий через запятую (category=backend,ml):
//   вакансия подходит, если в ней есть хотя бы одна из них (условие ИЛИ).
//   categories в ответе — сколько вакансий в каждой категории среди всех (без учёта фильтра),
//   по ним фронтенд рисует плашки.
router.get('/', verifyToken, (req, res) => {
  const paged = req.query.page !== undefined || req.query.limit !== undefined || req.query.category !== undefined
  if (!paged) {
    return res.json(db.prepare('SELECT * FROM vacancies ORDER BY created_at DESC, id DESC').all().map(present))
  }
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || DEFAULT_LIMIT, 1), MAX_LIMIT)
  const wanted = String(req.query.category || '').split(',').map(c => c.trim()).filter(c => VACANCY_CATEGORIES.includes(c))

  const counts = Object.fromEntries(VACANCY_CATEGORIES.map(c => [c, 0]))
  for (const row of db.prepare('SELECT * FROM vacancies').all().map(present)) {
    for (const c of row.categories) counts[c] += 1
  }

  const where = wanted.length ? 'WHERE ' + wanted.map(() => 'categories LIKE ?').join(' OR ') : ''
  const args = wanted.map(c => `%"${c}"%`)
  const total = db.prepare(`SELECT COUNT(*) AS n FROM vacancies ${where}`).get(...args).n
  const pages = Math.max(Math.ceil(total / limit), 1)
  const page = Math.min(Math.max(parseInt(req.query.page, 10) || 1, 1), pages)
  const items = db.prepare(`SELECT * FROM vacancies ${where} ORDER BY created_at DESC, id DESC LIMIT ? OFFSET ?`)
    .all(...args, limit, (page - 1) * limit).map(present)
  res.json({ items, total, page, pages, limit, categories: counts })
})

// GET /api/vacancies/:id — одна вакансия
router.get('/:id', verifyToken, (req, res) => {
  const row = db.prepare('SELECT * FROM vacancies WHERE id = ?').get(Number(req.params.id))
  if (!row) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json(present(row))
})

// POST /api/vacancies — создать
router.post('/', requireAdmin, (req, res) => {
  const { error, value } = clean(req.body)
  if (error) return res.status(400).json({ message: error })
  const r = db.prepare('INSERT INTO vacancies (title, description, category, categories, contact) VALUES (?, ?, ?, ?, ?)')
    .run(value.title, value.description, value.categories[0], JSON.stringify(value.categories), value.contact)
  res.status(201).json(present(db.prepare('SELECT * FROM vacancies WHERE id = ?').get(r.lastInsertRowid)))
})

// PUT /api/vacancies/:id — изменить
router.put('/:id', requireAdmin, (req, res) => {
  const { error, value } = clean(req.body)
  if (error) return res.status(400).json({ message: error })
  const r = db.prepare(`UPDATE vacancies SET title = ?, description = ?, category = ?, categories = ?, contact = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(value.title, value.description, value.categories[0], JSON.stringify(value.categories), value.contact, Number(req.params.id))
  if (!r.changes) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json(present(db.prepare('SELECT * FROM vacancies WHERE id = ?').get(Number(req.params.id))))
})

// DELETE /api/vacancies/:id — удалить
router.delete('/:id', requireAdmin, (req, res) => {
  const r = db.prepare('DELETE FROM vacancies WHERE id = ?').run(Number(req.params.id))
  if (!r.changes) return res.status(404).json({ message: 'Вакансия не найдена' })
  res.json({ ok: true })
})

module.exports = router
