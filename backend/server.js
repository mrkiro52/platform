require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}))
app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth',          require('./src/routes/auth'))
app.use('/api/users',         require('./src/routes/users'))
app.use('/api/schedule',      require('./src/routes/schedule'))
app.use('/api/library',       require('./src/routes/library'))
app.use('/api/tasks',         require('./src/routes/tasks'))
app.use('/api/announcements', require('./src/routes/announcements'))
app.use('/api/news',          require('./src/routes/news'))
app.use('/api/links',         require('./src/routes/links'))

// ── Admin Panel ──────────────────────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')))
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')))

// ── Health check ────────────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date().toISOString() }))

// ── Error handler ───────────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 KIRO Backend запущен на http://localhost:${PORT}`)
  console.log(`🔧 Админ панель: http://localhost:${PORT}/admin`)
})
