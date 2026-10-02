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
  return list
}

const ROLE_LABELS = { full: 'Главный админ', homework: 'Проверка ДЗ' }

// Список без паролей — его можно отдавать в админку
function publicAdmins() {
  return adminAccounts().map(a => ({ username: a.username, scope: a.scope, role: ROLE_LABELS[a.scope] || a.scope }))
}

module.exports = { adminAccounts, publicAdmins }
