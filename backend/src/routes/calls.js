const express = require('express')
const { verifyToken, requireAdmin } = require('../middleware/auth')
const db = require('../db')

const router = express.Router()

// Слоты часовые: 08:00–09:00 … 22:00–23:00. Храним только час начала.
const FIRST_HOUR = 8
const LAST_HOUR = 22

const MONTH_NAMES = { 9: 'Сентябрь', 10: 'Октябрь', 11: 'Ноябрь' }

function isValidDate(value) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function isValidHour(value) {
  return Number.isInteger(value) && value >= FIRST_HOUR && value <= LAST_HOUR
}

// Слоты одного набора, сгруппированные по дням. viewerId !== null —
// значит собираем для студента: чужие ники не отдаём, только «занято».
function daysForSession(sessionId, { viewerId = null, withNicknames = false } = {}) {
  const rows = db.prepare(`
    SELECT s.id, s.date, s.hour, s.booked_by, s.booked_at, u.nickname
      FROM call_slots s
      LEFT JOIN users u ON u.id = s.booked_by
     WHERE s.session_id = ?
     ORDER BY s.date, s.hour
  `).all(sessionId)

  const byDate = new Map()
  for (const row of rows) {
    if (!byDate.has(row.date)) byDate.set(row.date, [])
    const slot = {
      id: row.id,
      hour: row.hour,
      taken: row.booked_by !== null,
      mine: viewerId !== null && row.booked_by === viewerId,
    }
    if (withNicknames) {
      slot.nickname = row.nickname || null
      slot.bookedAt = row.booked_at || null
    }
    byDate.get(row.date).push(slot)
  }

  return [...byDate.entries()].map(([date, slots]) => ({ date, slots }))
}

function sessionsWith(options) {
  return db.prepare('SELECT * FROM call_sessions ORDER BY month, idx').all().map(s => ({
    id: s.id,
    month: s.month,
    monthName: MONTH_NAMES[s.month] || String(s.month),
    idx: s.idx,
    title: s.title,
    isOpen: !!s.is_open,
    days: daysForSession(s.id, options),
  }))
}

// ── Админ ───────────────────────────────────────────────────────────────────

// GET /api/calls/admin/sessions — все 12 наборов со слотами и никами
router.get('/admin/sessions', requireAdmin, (req, res) => {
  try {
    res.json(sessionsWith({ withNicknames: true }))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PATCH /api/calls/admin/sessions/:id — открыть/закрыть набор, переименовать
router.patch('/admin/sessions/:id', requireAdmin, (req, res) => {
  try {
    const session = db.prepare('SELECT * FROM call_sessions WHERE id = ?').get(req.params.id)
    if (!session) return res.status(404).json({ message: 'Набор не найден' })

    const isOpen = typeof req.body.isOpen === 'boolean' ? (req.body.isOpen ? 1 : 0) : session.is_open
    const title = typeof req.body.title === 'string' && req.body.title.trim()
      ? req.body.title.trim()
      : session.title

    db.prepare('UPDATE call_sessions SET is_open = ?, title = ? WHERE id = ?').run(isOpen, title, session.id)
    res.json({ id: session.id, isOpen: !!isOpen, title })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/calls/admin/sessions/:id/slots — задать дни и слоты набора целиком.
// Забронированные слоты не удаляются молча: если админ убрал день, в котором
// кто-то уже записан, слот остаётся, а в ответе приходит список таких слотов.
router.put('/admin/sessions/:id/slots', requireAdmin, (req, res) => {
  try {
    const session = db.prepare('SELECT * FROM call_sessions WHERE id = ?').get(req.params.id)
    if (!session) return res.status(404).json({ message: 'Набор не найден' })

    const days = Array.isArray(req.body.days) ? req.body.days : []
    const wanted = new Set()

    for (const day of days) {
      if (!isValidDate(day && day.date)) {
        return res.status(400).json({ message: `Некорректная дата: ${day && day.date}` })
      }
      const hours = Array.isArray(day.hours) ? day.hours : []
      for (const hour of hours) {
        if (!isValidHour(hour)) {
          return res.status(400).json({ message: `Некорректный час: ${hour}` })
        }
        wanted.add(`${day.date}|${hour}`)
      }
    }

    const kept = []
    const apply = db.transaction(() => {
      const existing = db.prepare('SELECT id, date, hour, booked_by FROM call_slots WHERE session_id = ?').all(session.id)
      const remove = db.prepare('DELETE FROM call_slots WHERE id = ?')
      const add = db.prepare('INSERT OR IGNORE INTO call_slots (session_id, date, hour) VALUES (?, ?, ?)')

      for (const slot of existing) {
        const key = `${slot.date}|${slot.hour}`
        if (wanted.has(key)) {
          wanted.delete(key)          // уже есть — создавать не нужно
          continue
        }
        if (slot.booked_by !== null) {
          kept.push({ date: slot.date, hour: slot.hour })   // занят — не трогаем
          continue
        }
        remove.run(slot.id)
      }

      for (const key of wanted) {
        const [date, hour] = key.split('|')
        add.run(session.id, date, Number(hour))
      }
    })
    apply()

    res.json({ days: daysForSession(session.id, { withNicknames: true }), keptBooked: kept })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// GET /api/calls/admin/calendar — все выставленные слоты по дням, с никами
router.get('/admin/calendar', requireAdmin, (req, res) => {
  try {
    const rows = db.prepare(`
      SELECT s.id, s.date, s.hour, s.booked_at, u.nickname, u.name,
             c.title AS session_title, c.month, c.idx
        FROM call_slots s
        LEFT JOIN users u ON u.id = s.booked_by
        JOIN call_sessions c ON c.id = s.session_id
       ORDER BY s.date, s.hour
    `).all()

    const byDate = new Map()
    for (const row of rows) {
      if (!byDate.has(row.date)) byDate.set(row.date, [])
      byDate.get(row.date).push({
        id: row.id,
        hour: row.hour,
        nickname: row.nickname || null,
        name: row.name || null,
        bookedAt: row.booked_at || null,
        sessionTitle: row.session_title,
      })
    }

    res.json([...byDate.entries()].map(([date, slots]) => ({ date, slots })))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// DELETE /api/calls/admin/slots/:id/booking — снять чужую бронь
router.delete('/admin/slots/:id/booking', requireAdmin, (req, res) => {
  try {
    const info = db.prepare('UPDATE call_slots SET booked_by = NULL, booked_at = NULL WHERE id = ?').run(req.params.id)
    if (!info.changes) return res.status(404).json({ message: 'Слот не найден' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// ── Студенты ────────────────────────────────────────────────────────────────

// Записываться могут только участники осеннего лагеря. Флаг лежит в базе,
// а не в токене, поэтому читаем актуальное значение на каждый запрос.
function requireAutumnCamp(req, res, next) {
  verifyToken(req, res, () => {
    const user = db.prepare('SELECT id, nickname, is_autumn_camp_2026 FROM users WHERE id = ?').get(req.user.id)
    if (!user) return res.status(401).json({ message: 'Пользователь не найден' })
    if (!user.is_autumn_camp_2026) {
      return res.status(403).json({ message: 'Запись доступна участникам осеннего лагеря' })
    }
    req.student = user
    next()
  })
}

// GET /api/calls/open — открытые наборы со слотами
router.get('/open', requireAutumnCamp, (req, res) => {
  try {
    const open = sessionsWith({ viewerId: req.student.id })
      .filter(s => s.isOpen)
      .map(s => ({ ...s, mySlotId: s.days.flatMap(d => d.slots).find(x => x.mine)?.id || null }))
    res.json(open)
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// POST /api/calls/slots/:id/book — забронировать слот.
// Условие booked_by IS NULL прямо в UPDATE — если слот успели занять,
// пока студент выбирал, запрос ничего не изменит и вернётся 409 со
// свежим состоянием набора, чтобы фронт сразу перерисовал сетку.
router.post('/slots/:id/book', requireAutumnCamp, (req, res) => {
  try {
    const slot = db.prepare(`
      SELECT s.*, c.is_open
        FROM call_slots s
        JOIN call_sessions c ON c.id = s.session_id
       WHERE s.id = ?
    `).get(req.params.id)

    if (!slot) return res.status(404).json({ message: 'Слот не найден' })
    if (!slot.is_open) return res.status(409).json({ message: 'Запись на этот созвон закрыта' })

    const now = new Date().toISOString()
    let taken = false

    const book = db.transaction(() => {
      // Один слот на набор: прежняя бронь того же студента освобождается.
      db.prepare('UPDATE call_slots SET booked_by = NULL, booked_at = NULL WHERE session_id = ? AND booked_by = ?')
        .run(slot.session_id, req.student.id)

      const info = db.prepare('UPDATE call_slots SET booked_by = ?, booked_at = ? WHERE id = ? AND booked_by IS NULL')
        .run(req.student.id, now, slot.id)

      if (!info.changes) {
        taken = true
        throw new Error('SLOT_TAKEN')   // откатывает снятие прежней брони
      }
    })

    try {
      book()
    } catch (err) {
      if (taken) {
        return res.status(409).json({
          message: 'Пока ты выбирал, этот слот успели занять. Календарь обновлён — выбери другое время.',
          session: sessionsWith({ viewerId: req.student.id }).find(s => s.id === slot.session_id) || null,
        })
      }
      throw err
    }

    res.json({
      ok: true,
      session: sessionsWith({ viewerId: req.student.id }).find(s => s.id === slot.session_id) || null,
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// DELETE /api/calls/slots/:id/book — снять свою бронь
router.delete('/slots/:id/book', requireAutumnCamp, (req, res) => {
  try {
    const slot = db.prepare('SELECT * FROM call_slots WHERE id = ?').get(req.params.id)
    if (!slot) return res.status(404).json({ message: 'Слот не найден' })

    const info = db.prepare('UPDATE call_slots SET booked_by = NULL, booked_at = NULL WHERE id = ? AND booked_by = ?')
      .run(slot.id, req.student.id)
    if (!info.changes) return res.status(403).json({ message: 'Это не твоя бронь' })

    res.json({
      ok: true,
      session: sessionsWith({ viewerId: req.student.id }).find(s => s.id === slot.session_id) || null,
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
