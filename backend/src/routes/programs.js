const express = require('express')
const fs = require('fs')
const path = require('path')
const { verifyToken, requireAdmin, requireHomeworkReview } = require('../middleware/auth')
const db = require('../db')
const { notify } = require('../notify')

// Индивидуальные программы октября. Тексты глав и вопросы живут во фронтенде
// (src/data/programs), бэкенд хранит только сданные работы, раздаёт файлы к
// заданиям и отдаёт исходники программ админке.
const router = express.Router()
const PROGRAMS_DIR = path.join(__dirname, '..', '..', '..', 'src', 'data', 'programs')
const FILES_DIR = path.join(__dirname, '..', '..', 'files', 'programs')

const DIRECTION_NAMES = {
  product: 'Продуктовая аналитика',
  system: 'Системная аналитика',
  business: 'Бизнес-аналитика',
  backend: 'Backend-разработка',
  security: 'Информационная безопасность',
  ml: 'Машинное обучение',
}
// Задания, которые сдаются на платформе: направление → главы
const SUBMITTABLE = { backend: [1], security: [1] }
const VARIANTS = { backend: ['base', 'python'] }
const MAX_ANSWERS = 200
const MAX_ANSWER_LENGTH = 20000

// Участник лагеря; направление нужно, чтобы не сдать чужую программу
function requireCampStudent(req, res, next) {
  verifyToken(req, res, () => {
    const user = db.prepare('SELECT id, nickname, is_autumn_camp_2026, autumn_direction FROM users WHERE id = ?').get(req.user.id)
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' })
    if (!user.is_autumn_camp_2026) return res.status(403).json({ message: 'Программа доступна участникам осеннего лагеря' })
    req.student = user
    next()
  })
}

function parseAnswers(raw) {
  try {
    const list = JSON.parse(raw || '[]')
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

function mapRow(row) {
  return {
    id: row.id,
    direction: row.direction,
    directionName: DIRECTION_NAMES[row.direction] || row.direction,
    chapter: row.chapter,
    variant: row.variant || null,
    answers: parseAnswers(row.answers),
    status: row.status,
    comment: row.comment || null,
    reviewer: row.reviewer || null,
    submittedAt: row.submitted_at || null,
    reviewedAt: row.reviewed_at || null,
  }
}

// ── Студент ─────────────────────────────────────────────────────────────────

// GET /api/programs/homework/mine — свои работы по программе
router.get('/homework/mine', requireCampStudent, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM program_homework WHERE user_id = ? ORDER BY direction, chapter').all(req.student.id)
    res.json(rows.map(mapRow))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/programs/homework/:direction/:chapter — сдать работу или прислать новую версию.
// Повторная отправка возвращает работу на проверку и снимает прежние правки;
// принятую работу переотправить нельзя.
router.put('/homework/:direction/:chapter', requireCampStudent, (req, res) => {
  try {
    const { direction } = req.params
    const chapter = Number(req.params.chapter)
    if (!(SUBMITTABLE[direction] || []).includes(chapter)) {
      return res.status(404).json({ message: 'Это задание не сдаётся на платформе' })
    }
    if (req.student.autumn_direction !== direction) {
      return res.status(403).json({ message: 'Это задание другой программы' })
    }

    const { variant, answers } = req.body
    const variants = VARIANTS[direction]
    if (variants && !variants.includes(variant)) {
      return res.status(400).json({ message: 'Выбери вариант вопросов' })
    }
    if (!Array.isArray(answers) || !answers.length || answers.length > MAX_ANSWERS) {
      return res.status(400).json({ message: 'Нет ответов' })
    }
    const clean = []
    for (const item of answers) {
      const id = String(item?.id || '').slice(0, 40)
      const question = String(item?.question || '').trim()
      const answer = String(item?.answer || '').trim()
      if (!id || !question) return res.status(400).json({ message: 'Некорректный вопрос в работе' })
      if (!answer) return res.status(400).json({ message: 'Ответь на все вопросы — пустых ответов быть не должно' })
      if (answer.length > MAX_ANSWER_LENGTH) return res.status(400).json({ message: 'Один из ответов слишком длинный' })
      clean.push({ id, question: question.slice(0, 2000), answer })
    }

    const existing = db.prepare('SELECT status FROM program_homework WHERE user_id = ? AND direction = ? AND chapter = ?')
      .get(req.student.id, direction, chapter)
    if (existing?.status === 'approved') {
      return res.status(409).json({ message: 'Работа уже принята — менять её не нужно' })
    }

    db.prepare(`
      INSERT INTO program_homework (user_id, direction, chapter, variant, answers, status, comment, reviewer, submitted_at, reviewed_at)
      VALUES (?, ?, ?, ?, ?, 'submitted', NULL, NULL, ?, NULL)
      ON CONFLICT(user_id, direction, chapter) DO UPDATE SET
        variant      = excluded.variant,
        answers      = excluded.answers,
        status       = 'submitted',
        comment      = NULL,
        reviewer     = NULL,
        submitted_at = excluded.submitted_at,
        reviewed_at  = NULL
    `).run(req.student.id, direction, chapter, variants ? variant : null, JSON.stringify(clean), new Date().toISOString())

    const row = db.prepare('SELECT * FROM program_homework WHERE user_id = ? AND direction = ? AND chapter = ?')
      .get(req.student.id, direction, chapter)
    res.json(mapRow(row))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/programs/files/:direction/:chapter/:name — файл к заданию главы
// (ноутбуки, датасеты). Только студентам этого направления и админам.
router.get('/files/:direction/:chapter/:name', verifyToken, (req, res) => {
  const { direction, chapter, name } = req.params
  if (!/^[a-z]+$/.test(direction) || !/^\d+$/.test(chapter) || !/^[\w.-]+$/.test(name) || name.startsWith('.')) {
    return res.status(400).json({ message: 'Некорректный путь' })
  }
  if (req.user.role !== 'admin') {
    const user = db.prepare('SELECT is_autumn_camp_2026, autumn_direction FROM users WHERE id = ?').get(req.user.id)
    if (!user?.is_autumn_camp_2026 || user.autumn_direction !== direction) {
      return res.status(403).json({ message: 'Файл доступен студентам этой программы' })
    }
  }
  const file = path.join(FILES_DIR, `${direction}-${chapter}`, name)
  if (!file.startsWith(FILES_DIR + path.sep) || !fs.existsSync(file)) {
    return res.status(404).json({ message: 'Файл не найден' })
  }
  res.download(file, name)
})

// ── Админ ───────────────────────────────────────────────────────────────────

// GET /api/programs/admin/files/:name — исходник программы для админки
router.get('/admin/files/:name', requireAdmin, (req, res) => {
  const { name } = req.params
  if (!/^[a-z]+(-\d+)?(-[a-z]+)?$/.test(name)) return res.status(400).json({ message: 'Некорректное имя файла' })
  fs.readFile(path.join(PROGRAMS_DIR, `${name}.js`), 'utf8', (err, source) => {
    if (err) return res.status(404).json({ message: 'Файл программы не найден' })
    res.json({ source })
  })
})

const ADMIN_SELECT = `
  SELECT h.*, u.nickname, u.name
    FROM program_homework h
    JOIN users u ON u.id = h.user_id`

function mapAdminRow(row) {
  return { ...mapRow(row), user: { id: row.user_id, nickname: row.nickname, name: row.name } }
}

// GET /api/programs/admin/homework — все работы второго месяца
router.get('/admin/homework', requireHomeworkReview, (req, res) => {
  try {
    const rows = db.prepare(`${ADMIN_SELECT} ORDER BY CASE h.status WHEN 'submitted' THEN 0 WHEN 'rework' THEN 1 ELSE 2 END, h.submitted_at DESC`).all()
    // В списке ответы не нужны — только их число
    res.json(rows.map(r => {
      const item = mapAdminRow(r)
      item.answersCount = item.answers.length
      delete item.answers
      return item
    }))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/programs/admin/homework/:id — работа целиком
router.get('/admin/homework/:id', requireHomeworkReview, (req, res) => {
  try {
    const row = db.prepare(`${ADMIN_SELECT} WHERE h.id = ?`).get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Работа не найдена' })
    res.json(mapAdminRow(row))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PATCH /api/programs/admin/homework/:id — принять или вернуть с правками
router.patch('/admin/homework/:id', requireHomeworkReview, (req, res) => {
  try {
    const { status, comment } = req.body
    if (!['approved', 'rework'].includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })
    if (status === 'rework' && !String(comment || '').trim()) {
      return res.status(400).json({ message: 'К правкам нужен комментарий — иначе непонятно, что исправлять' })
    }
    const row = db.prepare('SELECT * FROM program_homework WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Работа не найдена' })

    db.prepare('UPDATE program_homework SET status = ?, comment = ?, reviewer = ?, reviewed_at = ? WHERE id = ?')
      .run(status, status === 'rework' ? String(comment).trim() : null, req.user.username || null, new Date().toISOString(), row.id)

    const where = `Задание к главе ${row.chapter} программы «${DIRECTION_NAMES[row.direction] || row.direction}»`
    notify({
      userId: row.user_id,
      type: status === 'approved' ? 'hw_approved' : 'hw_rework',
      preview: status === 'approved'
        ? `${where} — проверено и принято`
        : `${where} — есть правки, посмотри комментарий и отправь снова`,
      link: `/autumn-camp/program/${row.chapter}/task`,
    })

    res.json(mapAdminRow(db.prepare(`${ADMIN_SELECT} WHERE h.id = ?`).get(row.id)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
