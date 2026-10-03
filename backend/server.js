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
app.use('/api/posts',         require('./src/routes/posts'))
app.use('/api/social',        require('./src/routes/social'))
app.use('/api/messages',      require('./src/routes/messages'))
app.use('/api/notifications', require('./src/routes/notifications'))
app.use('/api/calls',         require('./src/routes/calls'))
app.use('/api/homework',      require('./src/routes/homework'))
app.use('/api/analytics',     require('./src/routes/analytics'))
app.use('/api/admin-tasks',   require('./src/routes/adminTasks'))
app.use('/api/sql-trainer',   require('./src/routes/sqlTrainer'))

// ── Admin Panel ──────────────────────────────────────────────────────────────
app.use('/admin', express.static(path.join(__dirname, 'admin')))
// У каждого раздела админки свой адрес (/admin/users, /admin/homework/12…),
// поэтому любой путь, не совпавший с файлом, отдаёт ту же страницу —
// раздел выбирает уже скрипт по адресу
app.get(['/admin', '/admin/*'], (req, res) => res.sendFile(path.join(__dirname, 'admin', 'index.html')))

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
