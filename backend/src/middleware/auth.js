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

function requireAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Недостаточно прав' })
    }
    next()
  })
}

module.exports = { verifyToken, requireAdmin }
