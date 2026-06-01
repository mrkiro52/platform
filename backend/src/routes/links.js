const express = require('express')
const { requireAdmin } = require('../middleware/auth')
const db = require('../db')

const router = express.Router()

// GET /api/links — public, fetch all useful links
router.get('/', (req, res) => {
  try {
    const links = db.prepare('SELECT * FROM useful_links ORDER BY created_at DESC').all()
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// POST /api/links — admin only, create new link
router.post('/', requireAdmin, (req, res) => {
  try {
    const { title, description, url } = req.body
    if (!title || !url) return res.status(400).json({ message: 'Title and URL are required' })
    const r = db.prepare('INSERT INTO useful_links (title, description, url) VALUES (?, ?, ?)').run(title, description || '', url)
    res.json({ id: r.lastInsertRowid, title, description, url })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/links/:id — admin only, update link
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    const { title, description, url } = req.body
    if (!title || !url) return res.status(400).json({ message: 'Title and URL are required' })
    db.prepare('UPDATE useful_links SET title = ?, description = ?, url = ? WHERE id = ?').run(title, description || '', url, id)
    res.json({ id: parseInt(id), title, description, url })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// DELETE /api/links/:id — admin only, delete link
router.delete('/:id', requireAdmin, (req, res) => {
  try {
    const { id } = req.params
    db.prepare('DELETE FROM useful_links WHERE id = ?').run(id)
    res.json({ success: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
