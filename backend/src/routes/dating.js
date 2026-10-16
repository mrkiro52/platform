const express = require('express')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const db = require('../db')
const { verifyToken } = require('../middleware/auth')
const { uploadObject, deleteObject, keyFromUrl, s3Configured } = require('../s3')

const router = express.Router()

// Раздел «Знакомства». Анкета есть у каждого пользователя: пока строки в
// dating_profiles нет, она пустая и скрыта. Показать анкету можно, только
// заполнив все поля — фото, имя, описание и контакт.

const LIMITS = { name: 60, about: 600, contact: 300 }

// Фото храним в S3, как аватары. Без S3 (локальная разработка) — на диске
// в backend/data/uploads/dating и отдаём через GET /api/dating/photos/:name.
const LOCAL_DIR = path.join(__dirname, '..', '..', 'data', 'uploads', 'dating')
const LOCAL_PREFIX = '/api/dating/photos/'

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new Error('Подойдёт фото в формате JPEG, PNG или WebP'))
    }
    cb(null, true)
  },
})

function getProfile(userId) {
  return db.prepare('SELECT * FROM dating_profiles WHERE user_id = ?').get(userId) || null
}

function ensureRow(userId) {
  db.prepare('INSERT OR IGNORE INTO dating_profiles (user_id) VALUES (?)').run(userId)
}

const isComplete = p => !!(p && p.name && p.about && p.contact && p.photo_url)

function toJson(p) {
  return {
    userId: p.user_id,
    name: p.name,
    about: p.about,
    contact: p.contact,
    photoUrl: p.photo_url,
    visible: !!p.is_visible,
    publishedAt: p.published_at,
  }
}

// Контакт — ссылка: https://…, t.me/…, или @ник, который превращаем в t.me
function normalizeContact(raw) {
  let v = String(raw || '').trim()
  if (/^@[A-Za-z0-9_]{3,}$/.test(v)) v = `https://t.me/${v.slice(1)}`
  else if (/^(t\.me|vk\.com|wa\.me)\//i.test(v)) v = `https://${v}`
  return /^https?:\/\/[^\s]+\.[^\s]+$/i.test(v) ? v : null
}

async function removePhoto(url) {
  if (!url) return
  if (url.startsWith(LOCAL_PREFIX)) {
    fs.promises.unlink(path.join(LOCAL_DIR, path.basename(url))).catch(() => {})
    return
  }
  const key = keyFromUrl(url)
  if (key) deleteObject(key).catch(() => {})
}

// GET /api/dating — показанные анкеты (своя первой) и своя анкета
router.get('/', verifyToken, (req, res) => {
  const rows = db.prepare(`
    SELECT * FROM dating_profiles
     WHERE is_visible = 1
     ORDER BY (user_id = ?) DESC, published_at DESC
  `).all(req.user.id)
  const me = getProfile(req.user.id)
  res.json({
    me: me ? toJson(me) : { userId: req.user.id, name: '', about: '', contact: '', photoUrl: '', visible: false, publishedAt: null },
    profiles: rows.map(toJson),
  })
})

// POST /api/dating/me/photo — загрузить или заменить фото анкеты
router.post('/me/photo', verifyToken, (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.message })
    if (!req.file) return res.status(400).json({ message: 'Файл не найден' })
    try {
      const ext = req.file.mimetype === 'image/png' ? 'png' : req.file.mimetype === 'image/webp' ? 'webp' : 'jpg'
      const name = `${req.user.id}-${Date.now()}.${ext}`
      let url
      if (s3Configured) {
        url = await uploadObject(`dating/${name}`, req.file.buffer, req.file.mimetype)
      } else {
        await fs.promises.mkdir(LOCAL_DIR, { recursive: true })
        await fs.promises.writeFile(path.join(LOCAL_DIR, name), req.file.buffer)
        url = LOCAL_PREFIX + name
      }
      ensureRow(req.user.id)
      const prev = getProfile(req.user.id)
      db.prepare("UPDATE dating_profiles SET photo_url = ?, updated_at = datetime('now') WHERE user_id = ?").run(url, req.user.id)
      removePhoto(prev?.photo_url)
      res.json(toJson(getProfile(req.user.id)))
    } catch {
      res.status(500).json({ message: 'Не удалось загрузить фото' })
    }
  })
})

// GET /api/dating/photos/:name — локальные фото (только без S3)
router.get('/photos/:name', (req, res) => {
  const name = path.basename(req.params.name)
  if (!/^\d+-\d+\.(jpg|png|webp)$/.test(name)) return res.status(404).end()
  const file = path.join(LOCAL_DIR, name)
  if (!fs.existsSync(file)) return res.status(404).end()
  res.sendFile(file)
})

// PUT /api/dating/me — сохранить анкету; publish: true — сразу показать её
router.put('/me', verifyToken, (req, res) => {
  const name = String(req.body?.name || '').trim()
  const about = String(req.body?.about || '').trim()
  const contactRaw = String(req.body?.contact || '').trim()
  if (!name) return res.status(400).json({ message: 'Укажи имя' })
  if (!about) return res.status(400).json({ message: 'Расскажи, кого или что ты ищешь' })
  if (!contactRaw) return res.status(400).json({ message: 'Добавь ссылку для связи' })
  for (const [key, max] of Object.entries(LIMITS)) {
    if ({ name, about, contact: contactRaw }[key].length > max) {
      return res.status(400).json({ message: `Поле слишком длинное: не больше ${max} символов` })
    }
  }
  const contact = normalizeContact(contactRaw)
  if (!contact) return res.status(400).json({ message: 'Контакт должен быть ссылкой, например https://t.me/username' })

  ensureRow(req.user.id)
  if (!getProfile(req.user.id).photo_url) return res.status(400).json({ message: 'Добавь фото' })

  db.prepare("UPDATE dating_profiles SET name = ?, about = ?, contact = ?, updated_at = datetime('now') WHERE user_id = ?")
    .run(name, about, contact, req.user.id)
  if (req.body?.publish) {
    db.prepare("UPDATE dating_profiles SET is_visible = 1, published_at = datetime('now') WHERE user_id = ?").run(req.user.id)
  }
  res.json(toJson(getProfile(req.user.id)))
})

// POST /api/dating/me/visibility — показать или скрыть анкету
router.post('/me/visibility', verifyToken, (req, res) => {
  const visible = !!req.body?.visible
  const p = getProfile(req.user.id)
  if (visible && !isComplete(p)) return res.status(400).json({ message: 'Сначала заполни анкету' })
  if (!p) return res.json({ visible: false })
  if (visible) {
    db.prepare("UPDATE dating_profiles SET is_visible = 1, published_at = datetime('now') WHERE user_id = ?").run(req.user.id)
  } else {
    db.prepare('UPDATE dating_profiles SET is_visible = 0 WHERE user_id = ?').run(req.user.id)
  }
  res.json(toJson(getProfile(req.user.id)))
})

module.exports = router
