const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const db = require('../db')

function makeToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' })
}

function userResponse(user) {
  return {
    id: user.id, email: user.email, name: user.name, nickname: user.nickname,
    track: user.track, plan: user.plan, tariff: user.tariff,
    points: user.points, streak: user.streak,
    completedTasks: user.completed_tasks, totalTasks: 15,
    currentWeek: user.current_week, startDate: '2026-06-01',
    // В SQLite booleans хранятся как 0/1 — наружу отдаём настоящие true/false
    isSummerCamp2026: !!user.is_summer_camp_2026,
    isAutumnCamp2026: !!user.is_autumn_camp_2026,
  }
}

// Простой in-memory rate-limit на регистрацию: не более 5 попыток за 15 минут
// с одного IP. Защищает от массового автосоздания аккаунтов без внешних
// зависимостей. Не переживает рестарт процесса — этого достаточно для
// небольшой платформы, не публичного high-traffic сервиса.
const REGISTER_WINDOW_MS = 15 * 60 * 1000
const REGISTER_MAX_ATTEMPTS = 5
const registerAttempts = new Map()

function registerRateLimit(req, res, next) {
  const ip = req.ip || req.connection?.remoteAddress || 'unknown'
  const now = Date.now()
  const attempts = (registerAttempts.get(ip) || []).filter(t => now - t < REGISTER_WINDOW_MS)
  if (attempts.length >= REGISTER_MAX_ATTEMPTS) {
    return res.status(429).json({ message: 'Слишком много попыток регистрации. Попробуйте позже.' })
  }
  attempts.push(now)
  registerAttempts.set(ip, attempts)
  next()
}

const NICKNAME_RE = /^[a-zA-Z0-9_.-]{3,32}$/

// POST /api/auth/login — user login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ message: 'Email и пароль обязательны' })

  const user = db.prepare('SELECT * FROM users WHERE email = ? OR name = ? OR nickname = ?').get(email, email, email)
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ message: 'Неверный email или пароль' })
  }

  const token = makeToken({ id: user.id, email: user.email, name: user.name, role: user.role })
  res.json({ token, user: userResponse(user) })
})

// POST /api/auth/register — self-service registration: логин + пароль (дважды)
router.post('/register', registerRateLimit, (req, res) => {
  const { nickname, password, passwordConfirm } = req.body

  if (!nickname || !password || !passwordConfirm) {
    return res.status(400).json({ message: 'Заполните логин и пароль' })
  }
  const trimmedNickname = String(nickname).trim()
  if (!NICKNAME_RE.test(trimmedNickname)) {
    return res.status(400).json({ message: 'Логин: 3–32 символа, латинские буквы, цифры, точка, дефис или подчёркивание' })
  }
  if (String(password).length < 8) {
    return res.status(400).json({ message: 'Пароль должен быть не короче 8 символов' })
  }
  if (String(password).length > 72) {
    return res.status(400).json({ message: 'Пароль слишком длинный' })
  }
  if (password !== passwordConfirm) {
    return res.status(400).json({ message: 'Пароли не совпадают' })
  }

  const existing = db.prepare('SELECT id FROM users WHERE LOWER(nickname) = LOWER(?)').get(trimmedNickname)
  if (existing) {
    return res.status(409).json({ message: 'Этот логин уже занят' })
  }

  const passwordHash = bcrypt.hashSync(password, 10)
  // email — обязательное уникальное поле в схеме; для самостоятельной регистрации
  // подставляем плейсхолдер на основе логина, пользователь может указать
  // настоящий email позже в профиле.
  const placeholderEmail = `${trimmedNickname.toLowerCase()}@kiro.local`

  let result
  try {
    result = db.prepare(`
      INSERT INTO users (nickname, name, email, password_hash, track, plan, tariff, points, streak, completed_tasks, current_week, role)
      VALUES (?, ?, ?, ?, 'Frontend', 'С ментором', 49900, 0, 0, 0, 1, 'user')
    `).run(trimmedNickname, trimmedNickname, placeholderEmail, passwordHash)
  } catch (err) {
    // Гонка запросов или совпадение по email — не раскрываем детали клиенту
    return res.status(409).json({ message: 'Этот логин уже занят' })
  }

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid)
  const token = makeToken({ id: user.id, email: user.email, name: user.name, role: user.role })
  res.status(201).json({ token, user: userResponse(user) })
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
