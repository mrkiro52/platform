const express = require('express')
const { verifyToken } = require('../middleware/auth')
const db = require('../db')
const { SALES_PEOPLE, salesPersonOf } = require('../admins')

// Отдел продаж в админке: CRM с лидами, календарь встреч и статистика по дням. Раздел открыт
// четырём людям — Ханилю (главный админ), Денису, Саше и Эмилю; кто есть кто,
// решает salesPersonOf по учётной записи. У всех четверых одинаковые права на
// лиды и встречи, различается только то, какие вознаграждения они видят.
const router = express.Router()

const PEOPLE_KEYS = SALES_PEOPLE.map(p => p.key)
const STATUSES = ['new', 'dialog', 'call_scheduled', 'call_done', 'closed', 'lost']
const FORMATS = ['installment', 'full']
const DURATIONS = [15, 30, 45, 60]
const LIMITS = { contact: 200, description: 5000, title: 200 }
// Доли вознаграждений: Денис — от всей суммы продаж, менеджер — от суммы своих закрытых лидов,
// Ханиль — оставшиеся 70% минус выплаты менеджерам
const DENIS_SHARE = 0.3
const SELLER_SHARE = 0.1
const SELLERS = ['sasha', 'emil']

function requireSales(req, res, next) {
  verifyToken(req, res, () => {
    const person = salesPersonOf(req.user)
    if (!person) return res.status(403).json({ message: 'Раздел доступен только отделу продаж' })
    req.person = person
    next()
  })
}

const now = () => new Date().toISOString()

// Журнал смены статусов: по нему статистика считает движение лидов по дням
function logStatus(leadId, status, person, at = now()) {
  db.prepare('INSERT INTO sales_lead_status_log (lead_id, status, changed_by, changed_at) VALUES (?, ?, ?, ?)')
    .run(leadId, status, person, at)
}

// ── Лиды ─────────────────────────────────────────────────────────────────────

function mapLead(row) {
  return {
    id: row.id,
    contact: row.contact,
    description: row.description,
    status: row.status,
    createdBy: row.created_by,
    closedBy: row.closed_by || null,
    paymentFormat: row.payment_format || null,
    discount: !!row.discount,
    discountPercent: row.discount_percent || 0,
    amount: row.amount || 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// Проверка карточки лида. Закрытому в продажу лиду нужны продавец, формат оплаты и сумма —
// по ним считаются вознаграждения.
function cleanLead(body, person) {
  const contact = String(body?.contact || '').trim()
  const description = String(body?.description || '').trim()
  const status = STATUSES.includes(body?.status) ? body.status : 'new'
  const createdBy = PEOPLE_KEYS.includes(body?.createdBy) ? body.createdBy : person
  const closedBy = PEOPLE_KEYS.includes(body?.closedBy) ? body.closedBy : null
  const paymentFormat = FORMATS.includes(body?.paymentFormat) ? body.paymentFormat : null
  const discount = !!body?.discount
  const percent = discount ? Number(body?.discountPercent) : 0
  const amount = Math.round(Number(body?.amount) || 0)

  if (!contact) return { error: 'Укажи контакт лида: ник в Telegram или номер телефона' }
  if (contact.length > LIMITS.contact) return { error: 'Слишком длинный контакт' }
  if (description.length > LIMITS.description) return { error: 'Слишком длинное описание' }
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) return { error: 'Скидка — от 0 до 100 процентов' }
  if (amount < 0 || amount > 1e9) return { error: 'Некорректная сумма' }
  if (status === 'closed') {
    if (!closedBy) return { error: 'Укажи, кто закрыл лида в продажу' }
    if (!paymentFormat) return { error: 'Укажи формат оплаты: рассрочка или оплата разом' }
    if (amount <= 0) return { error: 'Укажи сумму, на которую закрыли лида' }
  }
  return { value: { contact, description, status, createdBy, closedBy, paymentFormat, discount, percent, amount } }
}

// Вознаграждения. Считаются только лиды, закрытые в продажу. Каждый видит своё;
// полную раскладку — только Ханиль.
function rewardsFor(person, leads) {
  const closed = leads.filter(l => l.status === 'closed' && l.amount > 0)
  const total = closed.reduce((sum, l) => sum + l.amount, 0)
  const sold = key => closed.filter(l => l.closed_by === key)
  const sellerReward = key => Math.round(sold(key).reduce((sum, l) => sum + l.amount, 0) * SELLER_SHARE)
  const denis = Math.round(total * DENIS_SHARE)
  const sellers = Object.fromEntries(SELLERS.map(key => [key, sellerReward(key)]))
  const khanil = total - denis - SELLERS.reduce((sum, key) => sum + sellers[key], 0)

  if (person === 'khanil') {
    return { view: 'all', total, closedCount: closed.length, denis, sasha: sellers.sasha, emil: sellers.emil, khanil }
  }
  if (person === 'denis') {
    return { view: 'denis', total, closedCount: closed.length, mine: denis }
  }
  return { view: 'seller', mine: sellers[person] }
}

// GET /api/sales/me — кто я в отделе продаж и состав отдела
router.get('/me', requireSales, (req, res) => {
  res.json({ person: req.person, people: SALES_PEOPLE })
})

// GET /api/sales/leads — все лиды и вознаграждения, которые положено видеть вошедшему
router.get('/leads', requireSales, (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM sales_leads ORDER BY created_at DESC, id DESC').all()
    res.json({
      me: req.person,
      people: SALES_PEOPLE,
      sellerShare: SELLER_SHARE,
      leads: rows.map(mapLead),
      rewards: rewardsFor(req.person, rows),
    })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// POST /api/sales/leads — внести лида; дата внесения ставится автоматически
router.post('/leads', requireSales, (req, res) => {
  try {
    const { value: v, error } = cleanLead(req.body, req.person)
    if (error) return res.status(400).json({ message: error })
    const stamp = now()
    const info = db.prepare(`
      INSERT INTO sales_leads (contact, description, status, created_by, closed_by, payment_format, discount, discount_percent, amount, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(v.contact, v.description, v.status, v.createdBy, v.closedBy, v.paymentFormat, v.discount ? 1 : 0, v.percent, v.amount, stamp, stamp)
    logStatus(info.lastInsertRowid, v.status, req.person, stamp)
    res.status(201).json(mapLead(db.prepare('SELECT * FROM sales_leads WHERE id = ?').get(info.lastInsertRowid)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/sales/leads/:id — изменить карточку лида
router.put('/leads/:id', requireSales, (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM sales_leads WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Лид не найден' })
    const { value: v, error } = cleanLead({ createdBy: row.created_by, ...req.body }, req.person)
    if (error) return res.status(400).json({ message: error })
    db.prepare(`
      UPDATE sales_leads SET contact = ?, description = ?, status = ?, created_by = ?, closed_by = ?, payment_format = ?,
        discount = ?, discount_percent = ?, amount = ?, updated_at = ? WHERE id = ?
    `).run(v.contact, v.description, v.status, v.createdBy, v.closedBy, v.paymentFormat, v.discount ? 1 : 0, v.percent, v.amount, now(), row.id)
    if (v.status !== row.status) logStatus(row.id, v.status, req.person)
    res.json(mapLead(db.prepare('SELECT * FROM sales_leads WHERE id = ?').get(row.id)))
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// DELETE /api/sales/leads/:id — удалить лида; его встречи остаются в календаре без привязки
router.delete('/leads/:id', requireSales, (req, res) => {
  try {
    const info = db.prepare('DELETE FROM sales_leads WHERE id = ?').run(req.params.id)
    if (!info.changes) return res.status(404).json({ message: 'Лид не найден' })
    db.prepare('UPDATE sales_events SET lead_id = NULL WHERE lead_id = ?').run(req.params.id)
    db.prepare('DELETE FROM sales_lead_status_log WHERE lead_id = ?').run(req.params.id)
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// ── Статистика ───────────────────────────────────────────────────────────────

const MSK = 3 * 3600 * 1000
const mskDay = (iso) => new Date(Date.parse(iso) + MSK).toISOString().slice(0, 10)
const PERIODS = [7, 14, 30, 90]

// GET /api/sales/stats?days=30 — сколько лидов внесли и сколько перешло в каждый статус
// по дням (дни московские). Только количества: денег в статистике нет.
router.get('/stats', requireSales, (req, res) => {
  try {
    const period = PERIODS.includes(Number(req.query.days)) ? Number(req.query.days) : 30
    const today = mskDay(now())
    const days = Array.from({ length: period }, (_, i) =>
      new Date(Date.parse(`${today}T00:00:00Z`) - (period - 1 - i) * 86400000).toISOString().slice(0, 10))
    const empty = () => Object.fromEntries(STATUSES.map(s => [s, 0]))
    const byDay = new Map(days.map(day => [day, { day, added: 0, statuses: empty() }]))

    const leads = db.prepare('SELECT status, created_at FROM sales_leads').all()
    const current = empty()
    for (const lead of leads) {
      if (lead.status in current) current[lead.status] += 1
      const row = byDay.get(mskDay(lead.created_at))
      if (row) row.added += 1
    }

    // Лид считается в статусе за день один раз, даже если его переводили туда-обратно
    const from = new Date(Date.parse(`${days[0]}T00:00:00Z`) - MSK).toISOString()
    const seen = new Set()
    for (const entry of db.prepare('SELECT lead_id, status, changed_at FROM sales_lead_status_log WHERE changed_at >= ?').all(from)) {
      const row = byDay.get(mskDay(entry.changed_at))
      const key = `${entry.lead_id}|${entry.status}|${row && row.day}`
      if (!row || !(entry.status in row.statuses) || seen.has(key)) continue
      seen.add(key)
      row.statuses[entry.status] += 1
    }

    res.json({ me: req.person, people: SALES_PEOPLE, period, today, days: [...byDay.values()], current, total: leads.length })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// ── Календарь ────────────────────────────────────────────────────────────────

function mapEvent(row) {
  let participants = []
  try { participants = JSON.parse(row.participants || '[]') } catch { /* пустой список */ }
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    participants: PEOPLE_KEYS.filter(k => participants.includes(k)),
    startsAt: row.starts_at,
    duration: row.duration,
    leadId: row.lead_id || null,
    createdBy: row.created_by,
  }
}

function cleanEvent(body) {
  const title = String(body?.title || '').trim()
  const description = String(body?.description || '').trim()
  const raw = Array.isArray(body?.participants) ? body.participants : []
  const participants = PEOPLE_KEYS.filter(k => raw.includes(k))
  const start = new Date(body?.startsAt)
  const duration = Number(body?.duration)
  const leadId = Number.isInteger(Number(body?.leadId)) && Number(body.leadId) > 0 ? Number(body.leadId) : null

  if (!title) return { error: 'Укажи название встречи' }
  if (title.length > LIMITS.title) return { error: 'Слишком длинное название' }
  if (description.length > LIMITS.description) return { error: 'Слишком длинное описание' }
  if (!participants.length) return { error: 'Выбери хотя бы одного участника' }
  if (Number.isNaN(start.getTime())) return { error: 'Укажи дату и время начала' }
  if (!DURATIONS.includes(duration)) return { error: 'Длительность — 15, 30, 45 или 60 минут' }
  return { value: { title, description, participants, startsAt: start.toISOString(), duration, leadId } }
}

// GET /api/sales/events?from=ISO&to=ISO — встречи, которые начинаются в промежутке
router.get('/events', requireSales, (req, res) => {
  try {
    const from = new Date(req.query.from), to = new Date(req.query.to)
    if (Number.isNaN(from.getTime()) || Number.isNaN(to.getTime())) {
      return res.status(400).json({ message: 'Укажи границы периода' })
    }
    const rows = db.prepare('SELECT * FROM sales_events WHERE starts_at >= ? AND starts_at < ? ORDER BY starts_at, id')
      .all(from.toISOString(), to.toISOString())
    res.json({ me: req.person, people: SALES_PEOPLE, events: rows.map(mapEvent) })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// POST /api/sales/events — завести встречу. Если она назначена по лиду, который ещё
// не дошёл до созвона, лид переходит в статус «назначен созвон».
router.post('/events', requireSales, (req, res) => {
  try {
    const { value: v, error } = cleanEvent(req.body)
    if (error) return res.status(400).json({ message: error })
    const lead = v.leadId ? db.prepare('SELECT * FROM sales_leads WHERE id = ?').get(v.leadId) : null
    const info = db.prepare(`
      INSERT INTO sales_events (title, description, participants, starts_at, duration, lead_id, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(v.title, v.description, JSON.stringify(v.participants), v.startsAt, v.duration, lead ? lead.id : null, req.person, now())
    let leadMoved = false
    if (lead && ['new', 'dialog'].includes(lead.status)) {
      db.prepare("UPDATE sales_leads SET status = 'call_scheduled', updated_at = ? WHERE id = ?").run(now(), lead.id)
      logStatus(lead.id, 'call_scheduled', req.person)
      leadMoved = true
    }
    res.status(201).json({ event: mapEvent(db.prepare('SELECT * FROM sales_events WHERE id = ?').get(info.lastInsertRowid)), leadMoved })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// PUT /api/sales/events/:id — изменить встречу
router.put('/events/:id', requireSales, (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM sales_events WHERE id = ?').get(req.params.id)
    if (!row) return res.status(404).json({ message: 'Встреча не найдена' })
    const { value: v, error } = cleanEvent({ ...req.body, leadId: row.lead_id })
    if (error) return res.status(400).json({ message: error })
    db.prepare('UPDATE sales_events SET title = ?, description = ?, participants = ?, starts_at = ?, duration = ? WHERE id = ?')
      .run(v.title, v.description, JSON.stringify(v.participants), v.startsAt, v.duration, row.id)
    res.json({ event: mapEvent(db.prepare('SELECT * FROM sales_events WHERE id = ?').get(row.id)) })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

// DELETE /api/sales/events/:id — удалить встречу
router.delete('/events/:id', requireSales, (req, res) => {
  try {
    const info = db.prepare('DELETE FROM sales_events WHERE id = ?').run(req.params.id)
    if (!info.changes) return res.status(404).json({ message: 'Встреча не найдена' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
})

module.exports = router
