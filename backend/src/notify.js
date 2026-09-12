const db = require('./db')

const TYPES = ['follow', 'reaction', 'comment', 'message', 'hw_approved', 'hw_rework']

// Уведомления от платформы, а не от другого пользователя: проверку домашки
// делает админ, у которого нет строки в users, поэтому actor остаётся пустым.
const SYSTEM_TYPES = ['hw_approved', 'hw_rework']

// Создаёт уведомление. Себе уведомления не шлём.
// Ошибка здесь никогда не должна ронять основное действие (лайк, коммент, проверку ДЗ).
function notify({ userId, actorId = null, type, postId = null, preview = '', link = null }) {
  try {
    const system = SYSTEM_TYPES.includes(type)
    if (!userId) return
    if (!system && (!actorId || userId === actorId)) return
    if (!TYPES.includes(type)) return
    db.prepare(`
      INSERT INTO notifications (user_id, actor_id, type, post_id, preview, link)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(userId, system ? null : actorId, type, postId, String(preview).slice(0, 240), link)
  } catch (err) {
    console.error('notify failed:', err.message)
  }
}

module.exports = { notify, TYPES, SYSTEM_TYPES }
