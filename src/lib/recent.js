// «Продолжить с места» на дэшборде: последние открытые материалы.
// Храним в браузере — это удобство одного устройства, а не данные аккаунта.

import { LIKEBEZY } from '../pages/LikebezyPage'
import { TRAININGS } from '../pages/TrainingsPage'
import { findAutumnWeek } from '../data/autumnWeeks'

const KEY = 'kiro_recent_pages'
const LIMIT = 6

// Путь → карточка. Сохраняем только страницы с материалами,
// служебные (дэшборд, профиль, сообщения) в «Продолжить» не нужны.
function describe(pathname) {
  let m
  if ((m = /^\/likebezy\/([^/]+)$/.exec(pathname))) {
    const item = LIKEBEZY.find(l => l.id === m[1])
    return item && { kind: 'Ликбез', title: item.title }
  }
  if ((m = /^\/trainings\/([^/]+)$/.exec(pathname))) {
    const item = TRAININGS.find(t => t.id === m[1])
    return item && { kind: 'Тренировка', title: item.title }
  }
  if ((m = /^\/autumn-camp\/(week\d+)$/.exec(pathname))) {
    const week = findAutumnWeek(m[1])
    return week && { kind: 'Осенний лагерь', title: `${week.monthLabel}, неделя ${week.indexInMonth}` }
  }
  if ((m = /^\/autumn-camp\/math\/day(\d+)\/(theory|homework)$/.exec(pathname))) {
    return { kind: 'Математика', title: `Занятие ${m[1]} · ${m[2] === 'theory' ? 'конспект' : 'домашка'}` }
  }
  if (pathname === '/autumn-camp/math') return { kind: 'Осенний лагерь', title: 'Мини-курс математики' }
  if ((m = /^\/library\/theory\/([^/]+)$/.exec(pathname))) {
    return { kind: 'Библиотека', title: `Теория · день ${m[1]}` }
  }
  if (pathname === '/antireels') return { kind: 'Инструмент', title: 'AntiReels' }
  return null
}

export function recentPages() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function rememberPage(pathname) {
  const info = describe(pathname)
  if (!info) return
  try {
    const list = recentPages().filter(p => p.path !== pathname)
    list.unshift({ path: pathname, ...info, at: Date.now() })
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, LIMIT)))
  } catch {
    // Хранилище недоступно (приватный режим) — просто не запоминаем
  }
}
