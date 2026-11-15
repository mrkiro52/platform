// Мелочи зимнего лагеря, которые живут в браузере: отметки «конспект открыт».
// На сервер не уходят — это подсказка самому студенту, а не отчётность.

const key = user => `kiro_winter_visited:${user?.id || 'anon'}`

export function loadVisited(user) {
  try { return new Set(JSON.parse(localStorage.getItem(key(user))) || []) } catch { return new Set() }
}

export function markVisited(user, id) {
  try {
    const set = loadVisited(user)
    if (set.has(id)) return
    set.add(id)
    localStorage.setItem(key(user), JSON.stringify([...set]))
  } catch { /* приватный режим — отметка просто не сохранится */ }
}

export function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}
