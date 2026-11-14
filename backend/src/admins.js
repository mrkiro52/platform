// Аккаунты админки. Полный доступ и проверяющий домашних заданий, которому
// открыт только соответствующий раздел. Пароли живут в .env — в репозитории
// их нет. Проверяющий не настроен, пока переменные не заданы.
function adminAccounts() {
  const list = []
  if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    list.push({ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD, scope: 'full' })
  }
  if (process.env.REVIEWER_USERNAME && process.env.REVIEWER_PASSWORD) {
    list.push({ username: process.env.REVIEWER_USERNAME, password: process.env.REVIEWER_PASSWORD, scope: 'homework' })
  }
  // Помощники, которым открыт только раздел задач:
  // TASK_ADMINS=логин1:пароль1,логин2:пароль2 (в пароле не должно быть запятых)
  for (const pair of String(process.env.TASK_ADMINS || '').split(',')) {
    const i = pair.indexOf(':')
    const username = pair.slice(0, i).trim()
    const password = pair.slice(i + 1).trim()
    if (i > 0 && username && password) list.push({ username, password, scope: 'tasks' })
  }
  // Продюсеры: ставят задачи главному админу и принимают их результат.
  // PRODUCER_ADMINS=логин1:пароль1,логин2:пароль2
  for (const pair of String(process.env.PRODUCER_ADMINS || '').split(',')) {
    const i = pair.indexOf(':')
    const username = pair.slice(0, i).trim()
    const password = pair.slice(i + 1).trim()
    if (i > 0 && username && password) list.push({ username, password, scope: 'producer' })
  }
  // Менеджеры отдела продаж: им открыт только раздел «Отдел продаж».
  // SALES_ADMINS=логин1:пароль1,логин2:пароль2
  for (const pair of String(process.env.SALES_ADMINS || '').split(',')) {
    const i = pair.indexOf(':')
    const username = pair.slice(0, i).trim()
    const password = pair.slice(i + 1).trim()
    if (i > 0 && username && password) list.push({ username, password, scope: 'sales' })
  }
  return list
}

const ROLE_LABELS = { full: 'Главный админ', homework: 'Проверка ДЗ', tasks: 'Помощник', producer: 'Продюсер', sales: 'Отдел продаж' }

// ── Отдел продаж: кто есть кто ───────────────────────────────────────────────
// Четыре участника с фиксированными ролями в расчёте вознаграждений. Ханиль — главный админ.
// Саша и Эмиль — менеджеры (логины по умолчанию hasya и emildior, меняются переменными
// SALES_SASHA и SALES_EMIL). Денис — логин из SALES_DENIS, а если переменная не задана —
// учётная запись продюсера.
const SALES_PEOPLE = [
  { key: 'khanil', name: 'Ханиль' },
  { key: 'denis', name: 'Денис' },
  { key: 'sasha', name: 'Саша' },
  { key: 'emil', name: 'Эмиль' },
]

function salesPersonOf(user) {
  if (!user || user.role !== 'admin' || !user.username) return null
  const scope = user.scope || 'full'
  if (scope === 'full') return 'khanil'
  const denis = String(process.env.SALES_DENIS || '').trim()
  if (denis ? user.username === denis : scope === 'producer') return 'denis'
  if (scope === 'sales') {
    if (user.username === String(process.env.SALES_SASHA || 'hasya').trim()) return 'sasha'
    if (user.username === String(process.env.SALES_EMIL || 'emildior').trim()) return 'emil'
  }
  return null
}

// Список без паролей — его можно отдавать в админку
function publicAdmins() {
  return adminAccounts().map(a => ({ username: a.username, scope: a.scope, role: ROLE_LABELS[a.scope] || a.scope }))
}

module.exports = { adminAccounts, publicAdmins, SALES_PEOPLE, salesPersonOf }
