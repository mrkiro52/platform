const express = require('express')
const { verifyToken, requireAdmin } = require('../middleware/auth')
const db = require('../db')
const { notify } = require('../notify')
const conditions = require('../data/homework-conditions.json')

const router = express.Router()

const STATUSES = ['submitted', 'approved', 'rework']

// Условия задач живут во фронтенде — бэкенд хранит только решения и статусы,
// поэтому здесь проверяется форма данных, а не их содержательная корректность.
function requireAutumnCamp(req, res, next) {
  verifyToken(req, res, () => {
    const user = db.prepare('SELECT id, nickname, is_autumn_camp_2026 FROM users WHERE id = ?').get(req.user.id)
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' })
    if (!user.is_autumn_camp_2026) {
      return res.status(403).json({ message: 'Домашние задания доступны участникам осеннего лагеря' })
    }
    req.student = user
    next()
  })
}

function mapRow(row) {
  return {
    id: row.id,
    week: row.week,
    level: row.level,
    chapterId: row.chapter_id,
    hwNumber: row.hw_number,
    taskIndex: row.task_index,
    taskText: row.task_text || '',
    solution: row.solution,
    status: row.status,
    comment: row.comment || null,
    submittedAt: row.submitted_at || null,
    reviewedAt: row.reviewed_at || null,
  }
}

// ── Студент ─────────────────────────────────────────────────────────────────

// GET /api/homework/mine — все свои решения
router.get('/mine', requireAutumnCamp, (req, res) => {
  try {
    const rows = db.prepare(
      'SELECT * FROM homework_submissions WHERE user_id = ? ORDER BY week, hw_number, task_index'
    ).all(req.student.id)
    res.json(rows.map(mapRow))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/homework/task — сдать задачу или сохранить изменённое решение.
// Правки от проверяющего сбрасываются: студент прислал новую версию, значит
// прежний комментарий уже не про неё, и задача снова ждёт проверки.
router.put('/task', requireAutumnCamp, (req, res) => {
  try {
    const { week, level, chapterId, hwNumber, taskIndex, solution, taskText } = req.body

    if (!Number.isInteger(week) || week < 1 || week > 15) {
      return res.status(400).json({ message: 'Некорректный номер недели' })
    }
    if (typeof chapterId !== 'string' || !chapterId) {
      return res.status(400).json({ message: 'Не указана глава' })
    }
    if (!Number.isInteger(taskIndex) || taskIndex < 0 || taskIndex > 4) {
      return res.status(400).json({ message: 'Некорректный номер задачи' })
    }
    if (typeof solution !== 'string') {
      return res.status(400).json({ message: 'Решение должно быть текстом' })
    }
    if (!solution.trim()) {
      return res.status(400).json({ message: 'Решение пустое — вставь код и попробуй ещё раз' })
    }

    const now = new Date().toISOString()
    db.prepare(`
      INSERT INTO homework_submissions
        (user_id, week, level, chapter_id, hw_number, task_index, task_text, solution, status, comment, submitted_at, reviewed_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted', NULL, ?, NULL)
      ON CONFLICT(user_id, week, chapter_id, task_index) DO UPDATE SET
        solution     = excluded.solution,
        level        = excluded.level,
        hw_number    = excluded.hw_number,
        task_text    = CASE WHEN excluded.task_text != '' THEN excluded.task_text ELSE homework_submissions.task_text END,
        status       = 'submitted',
        comment      = NULL,
        submitted_at = excluded.submitted_at,
        reviewed_at  = NULL
    `).run(
      req.student.id, week, Number.isInteger(level) ? level : null,
      chapterId, Number.isInteger(hwNumber) ? hwNumber : 0, taskIndex,
      typeof taskText === 'string' ? taskText : '', solution, now
    )

    const row = db.prepare(
      'SELECT * FROM homework_submissions WHERE user_id = ? AND week = ? AND chapter_id = ? AND task_index = ?'
    ).get(req.student.id, week, chapterId, taskIndex)

    res.json(mapRow(row))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// ── Админ ───────────────────────────────────────────────────────────────────

// GET /api/homework/admin/students — участники лагеря со сводкой по статусам
router.get('/admin/students', requireAdmin, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT u.id, u.nickname, u.name,
             COUNT(h.id)                                            AS total,
             SUM(CASE WHEN h.status = 'submitted' THEN 1 ELSE 0 END) AS pending,
             SUM(CASE WHEN h.status = 'approved'  THEN 1 ELSE 0 END) AS approved,
             SUM(CASE WHEN h.status = 'rework'    THEN 1 ELSE 0 END) AS rework
        FROM users u
        LEFT JOIN homework_submissions h ON h.user_id = u.id
       WHERE u.is_autumn_camp_2026 = 1
       GROUP BY u.id
       ORDER BY pending DESC, u.nickname COLLATE NOCASE
    `).all()

    res.json(rows.map(r => ({
      id: r.id,
      nickname: r.nickname,
      name: r.name,
      total: r.total || 0,
      pending: r.pending || 0,
      approved: r.approved || 0,
      rework: r.rework || 0,
    })))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/homework/admin/students/:id — все решения одного студента
router.get('/admin/students/:id', requireAdmin, (req, res) => {
  try {
    const user = db.prepare('SELECT id, nickname, name FROM users WHERE id = ?').get(req.params.id)
    if (!user) return res.status(404).json({ message: 'Студент не найден' })

    const rows = db.prepare(
      'SELECT * FROM homework_submissions WHERE user_id = ? ORDER BY week, hw_number, task_index'
    ).all(user.id)

    res.json({ user, submissions: rows.map(mapRow) })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PATCH /api/homework/admin/submissions/:id — принять работу или вернуть с правками
router.patch('/admin/submissions/:id', requireAdmin, (req, res) => {
  try {
    const { status, comment } = req.body
    if (!STATUSES.includes(status)) {
      return res.status(400).json({ message: 'Неизвестный статус' })
    }
    if (status === 'rework' && !String(comment || '').trim()) {
      return res.status(400).json({ message: 'К правкам нужен комментарий — иначе непонятно, что исправлять' })
    }

    const row = db.prepare('SELECT * FROM homework_submissions WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Решение не найдено' })

    db.prepare('UPDATE homework_submissions SET status = ?, comment = ?, reviewed_at = ? WHERE id = ?')
      .run(status, status === 'rework' ? String(comment).trim() : null, new Date().toISOString(), row.id)

    // Студент должен узнать о проверке, не проверяя страницу вручную
    const chapter = conditions.chapterTitles[row.chapter_id] || 'без названия'
    const where = `Домашнее задание ${row.hw_number} недели ${row.week}, глава «${chapter}», задача ${row.task_index + 1}`
    notify({
      userId: row.user_id,
      type: status === 'approved' ? 'hw_approved' : 'hw_rework',
      preview: status === 'approved'
        ? `${where} — проверено и принято`
        : `${where} — есть правки, посмотри комментарий и сдай снова`,
      link: `/autumn-camp/homework/${row.week}/${row.chapter_id}/${row.task_index}`,
    })

    res.json(mapRow(db.prepare('SELECT * FROM homework_submissions WHERE id = ?').get(row.id)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
