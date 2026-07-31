const db = require('./db')

const TYPES = ['follow', 'reaction', 'comment', 'message']

// Создаёт уведомление. Себе уведомления не шлём.
// Ошибка здесь никогда не должна ронять основное действие (лайк, коммент и т.д.).
function notify({ userId, actorId, type, postId = null, preview = '' }) {
  try {
    if (!userId || !actorId || userId === actorId) return
    if (!TYPES.includes(type)) return
    db.prepare(`
      INSERT INTO notifications (user_id, actor_id, type, post_id, preview)
      VALUES (?, ?, ?, ?, ?)
    `).run(userId, actorId, type, postId, String(preview).slice(0, 140))
  } catch (err) {
    console.error('notify failed:', err.message)
  }
}

module.exports = { notify, TYPES }
