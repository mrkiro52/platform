const express = require('express')
const { verifyToken, requireHomeworkReview } = require('../middleware/auth')
const db = require('../db')
const { notify } = require('../notify')

// Зимний лагерь 2026/27. Тексты глав и задания живут во фронтенде (src/data/winter),
// бэкенд хранит сданные работы и отдаёт их админке. Список модулей и заданий —
// снимок из фронтенда: node backend/scripts/gen-winter-tasks.mjs
const router = express.Router()

let manifest = { modules: {}, tasks: {}, totals: {} }
try { manifest = require('../data/winter-tasks.json') } catch { /* снимка нет — принимаем только формат ключа */ }

const DIRECTION_NAMES = { ml: 'Машинное обучение', backend: 'Backend-разработка', security: 'Информационная безопасность' }
const KEY_RE = /^([a-z0-9-]{1,40}):([a-z0-9-]{1,60})$/
const MAX_ANSWERS = 200
const MAX_ANSWER_LENGTH = 20000
// Тест с автопроверкой засчитывается с 70% верных ответов
const AUTO_PASS = 0.7

function requireWinterStudent(req, res, next) {
  verifyToken(req, res, () => {
    const user = db.prepare('SELECT id, nickname, is_winter_camp_2027, winter_direction FROM users WHERE id = ?').get(req.user.id)
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' })
    if (!user.is_winter_camp_2027) return res.status(403).json({ message: 'Раздел доступен участникам зимнего лагеря' })
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

function splitKey(key) {
  const m = KEY_RE.exec(String(key))
  return m ? { module: m[1], chapter: m[2] } : null
}

function moduleName(module) {
  return manifest.modules[module]?.name || module
}

function taskTitle(row) {
  return row.title || manifest.tasks[row.task_key]?.title || row.task_key
}

function taskLink(key) {
  const parts = splitKey(key)
  return parts ? `/winter-camp/m/${parts.module}/${parts.chapter}/task` : '/winter-camp'
}

function mapRow(row) {
  const parts = splitKey(row.task_key) || { module: '', chapter: '' }
  return {
    id: row.id,
    key: row.task_key,
    module: parts.module,
    moduleName: moduleName(parts.module),
    chapter: parts.chapter,
    kind: row.kind,
    title: taskTitle(row),
    answers: parseAnswers(row.answers),
    score: row.score ?? null,
    total: row.total ?? null,
    status: row.status,
    comment: row.comment || null,
    reviewer: row.reviewer || null,
    submittedAt: row.submitted_at || null,
    reviewedAt: row.reviewed_at || null,
  }
}

// ── Студент ─────────────────────────────────────────────────────────────────

// GET /api/winter/homework/mine — свои работы
router.get('/homework/mine', requireWinterStudent, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM winter_homework WHERE user_id = ? ORDER BY task_key').all(req.student.id)
    res.json(rows.map(mapRow))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/winter/homework/:key — сдать работу или прислать новую версию.
// quiz — ответы на вопросы и задачи, уходят на проверку; повторная отправка возвращает
// работу на проверку и снимает прежние правки, принятую работу переотправить нельзя.
// auto — результат теста с автопроверкой: хранится лучший результат.
router.put('/homework/:key', requireWinterStudent, (req, res) => {
  try {
    const key = String(req.params.key)
    const parts = splitKey(key)
    if (!parts) return res.status(400).json({ message: 'Некорректный адрес задания' })
    const known = manifest.modules[parts.module]
    if (Object.keys(manifest.modules).length && !known) {
      return res.status(404).json({ message: 'Это задание не сдаётся на платформе' })
    }
    if (known?.directions && !known.directions.includes(req.student.winter_direction)) {
      return res.status(403).json({ message: 'Это задание другого направления' })
    }

    const title = String(req.body?.title || manifest.tasks[key]?.title || '').trim().slice(0, 300)
    const now = new Date().toISOString()
    const existing = db.prepare('SELECT * FROM winter_homework WHERE user_id = ? AND task_key = ?').get(req.student.id, key)

    if (req.body?.kind === 'auto') {
      const score = Number(req.body.score)
      const total = Number(req.body.total)
      if (!Number.isInteger(total) || total < 1 || total > 200 || !Number.isInteger(score) || score < 0 || score > total) {
        return res.status(400).json({ message: 'Некорректный результат теста' })
      }
      if (existing && existing.kind !== 'auto') return res.status(409).json({ message: 'Это задание сдаётся ответами, а не тестом' })
      // Худший результат лучший не затирает
      if (!existing || score > (existing.score ?? -1)) {
        const status = score / total >= AUTO_PASS ? 'approved' : 'failed'
        db.prepare(`
          INSERT INTO winter_homework (user_id, task_key, kind, title, answers, score, total, status, submitted_at, reviewed_at)
          VALUES (?, ?, 'auto', ?, '[]', ?, ?, ?, ?, ?)
          ON CONFLICT(user_id, task_key) DO UPDATE SET
            title = excluded.title, score = excluded.score, total = excluded.total,
            status = excluded.status, submitted_at = excluded.submitted_at, reviewed_at = excluded.reviewed_at
        `).run(req.student.id, key, title, score, total, status, now, now)
      }
      return res.json(mapRow(db.prepare('SELECT * FROM winter_homework WHERE user_id = ? AND task_key = ?').get(req.student.id, key)))
    }

    const { answers } = req.body || {}
    if (!Array.isArray(answers) || !answers.length || answers.length > MAX_ANSWERS) {
      return res.status(400).json({ message: 'Нет ответов' })
    }
    const clean = []
    for (const item of answers) {
      const id = String(item?.id || '').slice(0, 40)
      const question = String(item?.question || '').trim()
      // У кода значимы отступы — обрезаем только хвост
      const answer = String(item?.answer || '').replace(/\s+$/, '')
      const kind = ['code', 'sql'].includes(item?.kind) ? item.kind : 'text'
      if (!id || !question) return res.status(400).json({ message: 'Некорректный вопрос в работе' })
      if (answer.length > MAX_ANSWER_LENGTH) return res.status(400).json({ message: 'Один из ответов слишком длинный' })
      clean.push({ id, question: question.slice(0, 3000), answer, kind })
    }
    // Пустые ответы разрешены, но совсем пустую работу не принимаем
    if (!clean.some(a => a.answer.trim())) {
      return res.status(400).json({ message: 'Ответь хотя бы на один вопрос' })
    }
    if (existing?.kind === 'auto') return res.status(409).json({ message: 'Это задание — тест с автопроверкой' })
    if (existing?.status === 'approved') {
      return res.status(409).json({ message: 'Работа уже принята — менять её не нужно' })
    }

    db.prepare(`
      INSERT INTO winter_homework (user_id, task_key, kind, title, answers, status, comment, reviewer, submitted_at, reviewed_at)
      VALUES (?, ?, 'quiz', ?, ?, 'submitted', NULL, NULL, ?, NULL)
      ON CONFLICT(user_id, task_key) DO UPDATE SET
        title        = excluded.title,
        answers      = excluded.answers,
        status       = 'submitted',
        comment      = NULL,
        reviewer     = NULL,
        submitted_at = excluded.submitted_at,
        reviewed_at  = NULL
    `).run(req.student.id, key, title, JSON.stringify(clean), now)

    res.json(mapRow(db.prepare('SELECT * FROM winter_homework WHERE user_id = ? AND task_key = ?').get(req.student.id, key)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// ── Админ ───────────────────────────────────────────────────────────────────

const ADMIN_SELECT = `
  SELECT h.*, u.nickname, u.name, u.winter_direction
    FROM winter_homework h
    JOIN users u ON u.id = h.user_id`

function mapAdminRow(row) {
  return {
    ...mapRow(row),
    user: { id: row.user_id, nickname: row.nickname, name: row.name },
    direction: row.winter_direction || null,
    directionName: DIRECTION_NAMES[row.winter_direction] || 'Без направления',
  }
}

// GET /api/winter/admin/homework — работы на проверку (тесты с автопроверкой сюда не попадают)
router.get('/admin/homework', requireHomeworkReview, (req, res) => {
  try {
    const rows = db.prepare(`${ADMIN_SELECT} WHERE h.kind = 'quiz'
      ORDER BY CASE h.status WHEN 'submitted' THEN 0 WHEN 'rework' THEN 1 ELSE 2 END, h.submitted_at DESC`).all()
    // В списке ответы не нужны — только их число
    res.json(rows.map(r => {
      const item = mapAdminRow(r)
      item.answersCount = item.answers.length
      item.answeredCount = item.answers.filter(a => a.answer).length
      delete item.answers
      return item
    }))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/winter/admin/homework/:id — работа целиком
router.get('/admin/homework/:id', requireHomeworkReview, (req, res) => {
  try {
    const row = db.prepare(`${ADMIN_SELECT} WHERE h.id = ?`).get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Работа не найдена' })
    res.json(mapAdminRow(row))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PATCH /api/winter/admin/homework/:id — принять или вернуть с правками
router.patch('/admin/homework/:id', requireHomeworkReview, (req, res) => {
  try {
    const { status, comment } = req.body
    if (!['approved', 'rework'].includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })
    if (status === 'rework' && !String(comment || '').trim()) {
      return res.status(400).json({ message: 'К правкам нужен комментарий — иначе непонятно, что исправлять' })
    }
    const row = db.prepare('SELECT * FROM winter_homework WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Работа не найдена' })
    if (row.kind !== 'quiz') return res.status(400).json({ message: 'Тесты с автопроверкой не проверяются вручную' })

    db.prepare('UPDATE winter_homework SET status = ?, comment = ?, reviewer = ?, reviewed_at = ? WHERE id = ?')
      .run(status, status === 'rework' ? String(comment).trim() : null, req.user.username || null, new Date().toISOString(), row.id)

    const parts = splitKey(row.task_key) || { module: '' }
    const where = `Зимний лагерь · ${moduleName(parts.module)}: «${taskTitle(row)}»`
    notify({
      userId: row.user_id,
      type: status === 'approved' ? 'hw_approved' : 'hw_rework',
      preview: status === 'approved'
        ? `${where} — проверено и принято`
        : `${where} — есть правки, посмотри комментарий и отправь снова`,
      link: taskLink(row.task_key),
    })

    res.json(mapAdminRow(db.prepare(`${ADMIN_SELECT} WHERE h.id = ?`).get(row.id)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/winter/admin/students — студенты зимнего лагеря и их прогресс по домашним заданиям.
// total — сколько заданий в программе направления (по снимку заданий из фронтенда).
router.get('/admin/students', requireHomeworkReview, (req, res) => {
  try {
    // Обязательные задания программы направления — посчитаны при сборке снимка
    const totals = manifest.totals || {}
    const users = db.prepare(`
      SELECT id, nickname, name, winter_direction FROM users
       WHERE is_winter_camp_2027 = 1 ORDER BY nickname COLLATE NOCASE
    `).all()
    const works = db.prepare(`
      SELECT h.user_id, h.task_key, h.status, h.submitted_at
        FROM winter_homework h JOIN users u ON u.id = h.user_id
       WHERE u.is_winter_camp_2027 = 1
    `).all()
    const byUser = new Map(users.map(u => [u.id, { approved: 0, bonus: 0, pending: 0, rework: 0, lastAt: null }]))
    for (const w of works) {
      const s = byUser.get(w.user_id)
      // В счёт программы идут обязательные задания; принятые главы «по желанию» — отдельно
      const required = manifest.tasks[w.task_key]?.required !== false
      if (w.status === 'approved') s[required ? 'approved' : 'bonus'] += 1
      else if (w.status === 'submitted') s.pending += 1
      else if (w.status === 'rework' || w.status === 'failed') s.rework += 1
      if (w.submitted_at && (!s.lastAt || w.submitted_at > s.lastAt)) s.lastAt = w.submitted_at
    }
    const list = users.map(u => ({
      id: u.id,
      nickname: u.nickname,
      name: u.name,
      direction: u.winter_direction || null,
      directionName: DIRECTION_NAMES[u.winter_direction] || null,
      ...byUser.get(u.id),
      total: totals[u.winter_direction] || 0,
    }))
    // Сначала те, чьи работы ждут проверки
    list.sort((a, b) => b.pending - a.pending)
    res.json(list)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
