const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

function makeToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

// POST /api/auth/login — user login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' })

  const user = db.prepare('SELECT * FROM users WHERE email = ? OR name = ?').get(email, email)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Неверный email или пароль' })
  }

  const token = makeToken({ id: user.id, email: user.email, name: user.name, role: user.role })
  res.json({
    token,
    user: {
      id: user.id, email: user.email, name: user.name, nickname: user.nickname,
      track: user.track, plan: user.plan, tariff: user.tariff,
      points: user.points, streak: user.streak,
      completedTasks: user.completed_tasks, totalTasks: 15,
      currentWeek: user.current_week, startDate: '2026-06-01',
    }
  })
})

// POST /api/auth/admin-login — admin login
router.post('/admin-login', (req, res) => {
  const { username, password } = req.body
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Неверный логин или пароль' })
  }
  const token = makeToken({ role: 'admin', username })
  res.json({ token })
})

module.exports = router
