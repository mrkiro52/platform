const express = require('express')
const fs = require('fs')
const path = require('path')
const { requireAdmin } = require('../middleware/auth')

// Индивидуальные программы октября живут во фронтенде (src/data/programs).
// Админка читает их отсюда — только по админскому токену, чтобы материал
// не был доступен без входа.
const router = express.Router()
const DIR = path.join(__dirname, '..', '..', '..', 'src', 'data', 'programs')

router.get('/admin/files/:name', requireAdmin, (req, res) => {
  const { name } = req.params
  if (!/^[a-z]+(-\d+)?$/.test(name)) return res.status(400).json({ message: 'Некорректное имя файла' })
  fs.readFile(path.join(DIR, `${name}.js`), 'utf8', (err, source) => {
    if (err) return res.status(404).json({ message: 'Файл программы не найден' })
    res.json({ source })
  })
})

module.exports = router
