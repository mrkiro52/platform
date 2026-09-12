const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена авторизации' })
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Токен недействителен или истёк' })
  }
}

// Область доступа админского токена. Полный админ может всё; проверяющий
// домашних заданий — только раздел с домашками. У токенов, выданных до
// появления областей, поля scope нет — такие считаем полными.
function scopeOf(user) {
  return user.scope || 'full'
}

function requireAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin' || scopeOf(req.user) !== 'full') {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }
    next()
  })
}

// Доступ к проверке домашних заданий: полный админ или проверяющий
function requireHomeworkReview(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin' || !['full', 'homework'].includes(scopeOf(req.user))) {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }
    next()
  })
}

module.exports = { verifyToken, requireAdmin, requireHomeworkReview, scopeOf }
