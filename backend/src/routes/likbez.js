const express = require('express')
const path = require('path')
const { verifyToken } = require('../middleware/auth')
const db = require('../db')

// Закрытые части ликбезов. Сам ликбез лежит во фронтенде и открыт всем,
// а списки компаний, каналов и план поиска отдаём только участникам лагеря:
// в бандле их нет, поэтому обойти замок через исходники страницы нельзя.
const router = express.Router()

const IT_MARKET_CAMP = require(path.join(__dirname, '..', 'data', 'it-market-camp.json'))

function requireCamp(req, res, next) {
  verifyToken(req, res, () => {
    const user = db.prepare('SELECT id, is_autumn_camp_2026 FROM users WHERE id = ?').get(req.user.id)
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' })
    if (!user.is_autumn_camp_2026) {
      return res.status(403).json({ message: 'Доступно только участникам лагеря KIRO IT CAMP' })
    }
    next()
  })
}

router.get('/it-market/camp', requireCamp, (req, res) => {
  res.json(IT_MARKET_CAMP)
})

module.exports = router
