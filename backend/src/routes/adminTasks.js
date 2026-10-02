// Задачи для админов: главный ставит задачи помощникам, помощники ведут их
// по статусам. Подтверждает выполнение только главный админ.
const router = require('express').Router()
const db = require('../db')
const { requireAnyAdmin, scopeOf } = require('../middleware/auth')
const { publicAdmins } = require('../admins')

const STATUSES = ['todo', 'in_progress', 'done', 'approved']
// Исполнитель сам ведёт задачу до «Выполнена», дальше решает главный админ
const ASSIGNEE_STATUSES = ['todo', 'in_progress', 'done']
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/

const isMain = (req) => scopeOf(req.user) === 'full'

function mapTask(t) {
  return {
    id: t.id,
    title: t.title,
    description: t.description,
    deadline: t.deadline,
    status: t.status,
    assignee: t.assignee,
    createdBy: t.created_by,
    createdAt: t.created_at,
    updatedAt: t.updated_at,
    doneAt: t.done_at,
    approvedAt: t.approved_at,
  }
}

// Проверка полей задачи. Возвращает { error } или { fields }.
function readFields(body) {
  const title = String(body.title || '').trim()
  const description = String(body.description || '').trim()
  const deadline = body.deadline ? String(body.deadline) : null
  const assignee = String(body.assignee || '')

  if (!title) return { error: 'Название задачи обязательно' }
  if (title.length > 200) return { error: 'Название длиннее 200 символов' }
  if (description.length > 5000) return { error: 'Описание длиннее 5000 символов' }
  if (deadline && (!DATE_RE.test(deadline) || Number.isNaN(Date.parse(`${deadline}T00:00:00Z`)))) {
    return { error: 'Дедлайн — дата в формате ГГГГ-ММ-ДД' }
  }
  if (!publicAdmins().some(a => a.username === assignee)) return { error: 'Такого админа нет' }
  return { fields: { title, description, deadline, assignee } }
}

// Отметки времени при смене статуса: когда выполнена и когда подтверждена
function statusStamps(prev, status, now) {
  const doneAt = status === 'done' || status === 'approved' ? (prev.done_at || now) : null
  const approvedAt = status === 'approved' ? (prev.approved_at || now) : null
  return { doneAt, approvedAt }
}

const findTask = (id) => db.prepare('SELECT * FROM admin_tasks WHERE id = ?').get(id)

// GET /api/admin-tasks/admins — команда. Главный видит всех, помощник — себя.
router.get('/admins', requireAnyAdmin, (req, res) => {
  const counts = db.prepare(`
    SELECT assignee, status, COUNT(*) AS c,
           SUM(deadline IS NOT NULL AND deadline < date('now', '+3 hours') AND status IN ('todo', 'in_progress')) AS overdue
      FROM admin_tasks GROUP BY assignee, status`).all()
  const admins = publicAdmins()
    .filter(a => isMain(req) || a.username === req.user.username)
    .map(a => {
      const stat = { todo: 0, in_progress: 0, done: 0, approved: 0, overdue: 0 }
      for (const r of counts.filter(r => r.assignee === a.username)) {
        stat[r.status] = r.c
        stat.overdue += r.overdue || 0
      }
      return { ...a, isMe: a.username === req.user.username, stats: stat }
    })
  res.json(admins)
})

// GET /api/admin-tasks — главный видит все задачи, помощник — свои
router.get('/', requireAnyAdmin, (req, res) => {
  const rows = isMain(req)
    ? db.prepare('SELECT * FROM admin_tasks ORDER BY id DESC').all()
    : db.prepare('SELECT * FROM admin_tasks WHERE assignee = ? ORDER BY id DESC').all(req.user.username)
  const me = publicAdmins().find(a => a.username === req.user.username)
  res.json({
    me: { username: req.user.username, scope: scopeOf(req.user), role: me ? me.role : '', isMain: isMain(req) },
    tasks: rows.map(mapTask),
  })
})

// POST /api/admin-tasks — новая задача (только главный)
router.post('/', requireAnyAdmin, (req, res) => {
  if (!isMain(req)) return res.status(403).json({ message: 'Ставить задачи может только главный админ' })
  const { error, fields } = readFields(req.body || {})
  if (error) return res.status(400).json({ message: error })

  const now = new Date().toISOString()
  const r = db.prepare(`
    INSERT INTO admin_tasks (title, description, deadline, status, assignee, created_by, created_at, updated_at)
    VALUES (?, ?, ?, 'todo', ?, ?, ?, ?)`)
    .run(fields.title, fields.description, fields.deadline, fields.assignee, req.user.username, now, now)
  res.status(201).json(mapTask(findTask(r.lastInsertRowid)))
})

// PUT /api/admin-tasks/:id — правка задачи (только главный)
router.put('/:id', requireAnyAdmin, (req, res) => {
  if (!isMain(req)) return res.status(403).json({ message: 'Править задачи может только главный админ' })
  const task = findTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Задача не найдена' })

  const { error, fields } = readFields(req.body || {})
  if (error) return res.status(400).json({ message: error })
  const status = STATUSES.includes(req.body.status) ? req.body.status : task.status

  const now = new Date().toISOString()
  const { doneAt, approvedAt } = statusStamps(task, status, now)
  db.prepare(`
    UPDATE admin_tasks
       SET title = ?, description = ?, deadline = ?, assignee = ?, status = ?,
           done_at = ?, approved_at = ?, updated_at = ?
     WHERE id = ?`)
    .run(fields.title, fields.description, fields.deadline, fields.assignee, status, doneAt, approvedAt, now, task.id)
  res.json(mapTask(findTask(task.id)))
})

// PATCH /api/admin-tasks/:id/status — смена статуса.
// Исполнитель двигает свою задачу между «Не начата», «В работе» и
// «Выполнена»; подтверждённую он уже не трогает. Главный — что угодно.
router.patch('/:id/status', requireAnyAdmin, (req, res) => {
  const task = findTask(req.params.id)
  if (!task) return res.status(404).json({ message: 'Задача не найдена' })
  const status = req.body && req.body.status
  if (!STATUSES.includes(status)) return res.status(400).json({ message: 'Неизвестный статус' })

  if (!isMain(req)) {
    if (task.assignee !== req.user.username) return res.status(403).json({ message: 'Это не твоя задача' })
    if (task.status === 'approved') return res.status(403).json({ message: 'Задача уже подтверждена — статус меняет только главный админ' })
    if (!ASSIGNEE_STATUSES.includes(status)) return res.status(403).json({ message: 'Подтверждает выполнение только главный админ' })
  }

  const now = new Date().toISOString()
  const { doneAt, approvedAt } = statusStamps(task, status, now)
  db.prepare('UPDATE admin_tasks SET status = ?, done_at = ?, approved_at = ?, updated_at = ? WHERE id = ?')
    .run(status, doneAt, approvedAt, now, task.id)
  res.json(mapTask(findTask(task.id)))
})

// DELETE /api/admin-tasks/:id — удалить задачу (только главный)
router.delete('/:id', requireAnyAdmin, (req, res) => {
  if (!isMain(req)) return res.status(403).json({ message: 'Удалять задачи может только главный админ' })
  const r = db.prepare('DELETE FROM admin_tasks WHERE id = ?').run(req.params.id)
  if (!r.changes) return res.status(404).json({ message: 'Задача не найдена' })
  res.json({ message: 'Удалено' })
})

module.exports = router
