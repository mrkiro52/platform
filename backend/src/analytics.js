// Аналитика поведения на платформе: приём событий от фронтенда и сводка для
// дашборда админки.
//
// Откуда берутся данные:
//  • analytics_events / analytics_time — то, что видно только в браузере:
//    визиты, просмотры разделов, активное время, запуски кода, квизы, видео;
//  • рабочие таблицы (users, homework_*, posts, messages, call_slots) — то,
//    что платформа и так хранит: регистрации, сдачи ДЗ, проверки, посты,
//    сообщения, записи на созвоны. По ним история есть с первого дня.
//
// Все даты в базе в UTC, дни считаются по Москве.

const db = require('./db')

const MSK_MS = 3 * 60 * 60 * 1000
const DAY_MS = 24 * 60 * 60 * 1000

const utcStamp = (ms) => new Date(ms).toISOString().replace('T', ' ').slice(0, 19)
const mskDay = (ms) => new Date(ms + MSK_MS).toISOString().slice(0, 10)
const addDays = (day, n) => new Date(Date.parse(`${day}T00:00:00Z`) + n * DAY_MS).toISOString().slice(0, 10)

// События, которые принимаются от фронтенда. Остальное отбрасывается.
const CLIENT_EVENTS = new Set([
  'session_start', 'page_view', 'material_open', 'quiz_answer', 'code_run',
  'split_open', 'video_play', 'level_test_finish', 'math_solution_open',
])

const PAGE_RE = /^[a-z0-9-]{1,40}$/

// Параметры событий — только известные поля известных типов. Подделанный
// клиент может прислать что угодно, а дашборд показывает эти значения.
const int = (v, min, max) => (Number.isInteger(v) && v >= min && v <= max ? v : undefined)
const str = (v, max, re = null) => (typeof v === 'string' && v.length <= max && (!re || re.test(v)) ? v : undefined)
const bool = (v) => (typeof v === 'boolean' ? v : undefined)
const oneOf = (v, list) => (list.includes(v) ? v : undefined)
const ID_RE = /^[a-z0-9_-]+$/i

const PROPS = {
  session_start: (p) => ({
    device: oneOf(p.device, ['desktop', 'mobile', 'tablet']),
    os: oneOf(p.os, ['iOS', 'Android', 'Windows', 'macOS', 'Linux', 'other']),
  }),
  material_open: (p) => ({
    week: int(p.week, 1, 15),
    chapter: str(p.chapter, 60, ID_RE),
    n: int(p.n, 1, 60),
    title: typeof p.title === 'string' ? p.title.slice(0, 80) : undefined,
  }),
  quiz_answer: (p) => ({ chapter: str(p.chapter, 60, ID_RE), correct: bool(p.correct) }),
  code_run: (p) => ({
    ok: bool(p.ok),
    ms: int(p.ms, 0, 600000),
    reason: oneOf(p.reason, ['stopped', 'timeout', 'overflow', 'load', 'error']),
  }),
  video_play: (p) => ({ video: typeof p.video === 'string' ? p.video.slice(0, 80) : undefined }),
  math_solution_open: (p) => ({ day: str(p.day, 10, ID_RE) }),
  level_test_finish: (p) => ({ answered: int(p.answered, 0, 1000) }),
}

function cleanProps(name, raw) {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw) || !PROPS[name]) return null
  const clean = PROPS[name](raw)
  for (const k of Object.keys(clean)) if (clean[k] === undefined) delete clean[k]
  return Object.keys(clean).length ? JSON.stringify(clean) : null
}

// Фронтенд присылает время раз в полминуты, так что пять минут в одной пачке —
// с запасом на неудачную отправку.
const MAX_SECONDS_PER_BATCH = 300

// Запросы готовятся при первом обращении: если таблицы аналитики не
// создались, сломается только аналитика, а не весь бэкенд при старте.
const cache = {}
const stmt = (sql) => cache[sql] || (cache[sql] = db.prepare(sql))

const INSERT_EVENT = `
  INSERT INTO analytics_events (user_id, session_id, name, page, path, props, day, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

const ADD_TIME = `
  INSERT INTO analytics_time (user_id, day, page, seconds) VALUES (?, ?, ?, ?)
  ON CONFLICT(user_id, day, page) DO UPDATE SET seconds = MIN(seconds + excluded.seconds, 57600)`

// Событие с сервера (например вход). Никогда не бросает исключение: аналитика
// не должна ломать основное действие.
function recordEvent(userId, name, props = null) {
  try {
    const now = Date.now()
    stmt(INSERT_EVENT).run(userId, null, name, null, null, props ? JSON.stringify(props) : null, mskDay(now), utcStamp(now))
  } catch (e) {
    console.error(`analytics: событие ${name} не записалось — ${e.message}`)
  }
}

// Пачка от фронтенда: { sessionId, events: [{ name, page, path, props, ts }], time: [{ page, seconds }] }
function ingest(userId, body) {
  const now = Date.now()
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 40) : null
  const events = Array.isArray(body.events) ? body.events.slice(0, 100) : []
  const time = Array.isArray(body.time) ? body.time.slice(0, 50) : []

  const rows = []
  for (const e of events) {
    if (!e || !CLIENT_EVENTS.has(e.name)) continue
    // Время события — с устройства, чтобы пачка, отправленная позже, легла в
    // свой день. Сбитым часам не верим: дальше суток в прошлое или пяти
    // минут в будущее — берём время сервера.
    const ts = Number.isFinite(e.ts) && e.ts > now - DAY_MS && e.ts < now + 5 * 60 * 1000 ? e.ts : now
    const page = typeof e.page === 'string' && PAGE_RE.test(e.page) ? e.page : null
    const path = typeof e.path === 'string' && e.path.startsWith('/') ? e.path.slice(0, 200) : null
    rows.push([userId, sessionId, e.name, page, path, cleanProps(e.name, e.props), mskDay(ts), utcStamp(ts)])
  }

  const times = []
  let budget = MAX_SECONDS_PER_BATCH
  for (const t of time) {
    if (!t || typeof t.page !== 'string' || !PAGE_RE.test(t.page)) continue
    const seconds = Math.min(Math.floor(Number(t.seconds) || 0), budget)
    if (seconds <= 0) continue
    budget -= seconds
    times.push([userId, mskDay(now), t.page, seconds])
  }

  if (!rows.length && !times.length) return
  const insert = stmt(INSERT_EVENT)
  const add = stmt(ADD_TIME)
  db.transaction(() => {
    for (const r of rows) insert.run(...r)
    for (const t of times) add.run(...t)
  })()
}

// Последний день активности каждого пользователя (московская дата) — по
// аналитике и по тому, что он делал на платформе до неё: решения, посты,
// комментарии, сообщения.
function lastActiveDays() {
  const sources = [
    'SELECT user_id AS id, MAX(day) AS day FROM analytics_events GROUP BY user_id',
    "SELECT user_id AS id, MAX(date(submitted_at, '+3 hours')) AS day FROM homework_submissions WHERE submitted_at IS NOT NULL GROUP BY user_id",
    "SELECT user_id AS id, MAX(date(created_at, '+3 hours')) AS day FROM posts GROUP BY user_id",
    "SELECT user_id AS id, MAX(date(created_at, '+3 hours')) AS day FROM post_comments GROUP BY user_id",
    "SELECT sender_id AS id, MAX(date(created_at, '+3 hours')) AS day FROM messages GROUP BY sender_id",
  ]
  const last = new Map()
  for (const sql of sources) {
    let rows = []
    try { rows = stmt(sql).all() } catch { continue }
    for (const { id, day } of rows) {
      if (day && (!last.has(id) || last.get(id) < day)) last.set(id, day)
    }
  }
  return last
}

// Значения по дням, выровненные по списку дней периода
function seriesOf(rows, days, field = 'c') {
  const byDay = new Map(rows.map(r => [r.day, r[field] || 0]))
  return days.map(d => byDay.get(d) || 0)
}

function overview(period) {
  const now = Date.now()
  const today = mskDay(now)
  const from = addDays(today, -(period - 1))
  const prevFrom = addDays(from, -period)
  const prevTo = addDays(from, -1)
  const days = Array.from({ length: period }, (_, i) => addDays(from, i))

  const one = (sql, ...args) => stmt(sql).get(...args) || {}
  const all = (sql, ...args) => stmt(sql).all(...args)

  // ── Активность ──
  const distinctUsers = (a, b) =>
    one('SELECT COUNT(DISTINCT user_id) AS c FROM analytics_events WHERE day BETWEEN ? AND ?', a, b).c || 0

  const activity = all(`
    SELECT day,
           COUNT(DISTINCT user_id)          AS users,
           SUM(name = 'page_view')          AS views,
           SUM(name = 'session_start')      AS sessions
      FROM analytics_events
     WHERE day BETWEEN ? AND ?
     GROUP BY day`, from, today)

  const timeByDay = all(`
    SELECT day, SUM(seconds) AS seconds, COUNT(DISTINCT user_id) AS users
      FROM analytics_time
     WHERE day BETWEEN ? AND ?
     GROUP BY day`, from, today)

  // Среднее активное время на человека в день: сумма секунд / число «человеко-дней»
  const avgMinutes = (a, b) => {
    const r = one(`
      SELECT SUM(seconds) AS s, COUNT(DISTINCT user_id || ':' || day) AS pd
        FROM analytics_time WHERE day BETWEEN ? AND ?`, a, b)
    return r.pd ? Math.round((r.s / r.pd / 60) * 10) / 10 : 0
  }

  // ── Регистрации, ДЗ, проверки — из рабочих таблиц ──
  const regRows = all(`
    SELECT date(created_at, '+3 hours') AS day, COUNT(*) AS c
      FROM users WHERE date(created_at, '+3 hours') BETWEEN ? AND ?
     GROUP BY day`, from, today)
  const regCount = (a, b) =>
    one("SELECT COUNT(*) AS c FROM users WHERE date(created_at, '+3 hours') BETWEEN ? AND ?", a, b).c || 0

  const hwRows = all(`
    SELECT date(submitted_at, '+3 hours') AS day, COUNT(*) AS c
      FROM homework_submissions
     WHERE submitted_at IS NOT NULL AND date(submitted_at, '+3 hours') BETWEEN ? AND ?
     GROUP BY day`, from, today)
  const hwCount = (a, b) => one(`
    SELECT COUNT(*) AS c, COUNT(DISTINCT user_id) AS u FROM homework_submissions
     WHERE submitted_at IS NOT NULL AND date(submitted_at, '+3 hours') BETWEEN ? AND ?`, a, b)

  const reviewRows = all(`
    SELECT date(reviewed_at, '+3 hours') AS day,
           SUM(status = 'approved') AS approved,
           SUM(status = 'rework')   AS rework
      FROM homework_reviews
     WHERE date(reviewed_at, '+3 hours') BETWEEN ? AND ?
     GROUP BY day`, from, today)
  const reviewCount = (a, b) =>
    one("SELECT COUNT(*) AS c FROM homework_reviews WHERE date(reviewed_at, '+3 hours') BETWEEN ? AND ?", a, b).c || 0

  const pending = one(`
    SELECT COUNT(*) AS c, COUNT(DISTINCT user_id) AS u, MIN(datetime(submitted_at)) AS oldest
      FROM homework_submissions WHERE status = 'submitted'`)

  const totals = one(`
    SELECT COUNT(*) AS users, SUM(is_autumn_camp_2026 = 1) AS camp FROM users`)

  const hwCur = hwCount(from, today)
  const hwPrev = hwCount(prevFrom, prevTo)

  // ── Когда занимаются: день недели × час, по Москве ──
  const heat = Array.from({ length: 7 }, () => Array(24).fill(0))
  for (const r of all(`
    SELECT CAST(strftime('%w', created_at, '+3 hours') AS INTEGER) AS wd,
           CAST(strftime('%H', created_at, '+3 hours') AS INTEGER) AS h,
           COUNT(*) AS c
      FROM analytics_events
     WHERE day BETWEEN ? AND ? AND name = 'page_view'
     GROUP BY wd, h`, from, today)) {
    heat[(r.wd + 6) % 7][r.h] = r.c   // неделя с понедельника
  }

  // ── Разделы ──
  const minutesByPage = new Map(all(`
    SELECT page, SUM(seconds) AS s FROM analytics_time WHERE day BETWEEN ? AND ? GROUP BY page`, from, today)
    .map(r => [r.page, Math.round(r.s / 60)]))
  const pages = all(`
    SELECT page, COUNT(*) AS views, COUNT(DISTINCT user_id) AS users
      FROM analytics_events
     WHERE name = 'page_view' AND day BETWEEN ? AND ? AND page IS NOT NULL
     GROUP BY page ORDER BY views DESC`, from, today)
    .map(r => ({ ...r, minutes: minutesByPage.get(r.page) || 0 }))

  // ── Устройства ──
  const devices = all(`
    SELECT COALESCE(json_extract(props, '$.device'), 'unknown') AS device,
           COUNT(DISTINCT user_id) AS users, COUNT(*) AS sessions
      FROM analytics_events
     WHERE name = 'session_start' AND day BETWEEN ? AND ?
     GROUP BY device ORDER BY users DESC`, from, today)

  // ── Ключевые действия ──
  const eventDaily = all(`
    SELECT name, day, COUNT(*) AS c FROM analytics_events
     WHERE day BETWEEN ? AND ? AND name NOT IN ('page_view', 'session_start')
     GROUP BY name, day`, from, today)
  const eventTotals = (a, b) => new Map(all(`
    SELECT name, COUNT(*) AS c, COUNT(DISTINCT user_id) AS u FROM analytics_events
     WHERE day BETWEEN ? AND ? AND name NOT IN ('page_view', 'session_start')
     GROUP BY name`, a, b).map(r => [r.name, r]))
  const evCur = eventTotals(from, today)
  const evPrev = eventTotals(prevFrom, prevTo)

  const rates = one(`
    SELECT SUM(name = 'code_run' AND json_extract(props, '$.ok') = 1) AS codeOk,
           SUM(name = 'code_run')                                     AS codeAll,
           SUM(name = 'quiz_answer' AND json_extract(props, '$.correct') = 1) AS quizOk,
           SUM(name = 'quiz_answer')                                  AS quizAll
      FROM analytics_events WHERE day BETWEEN ? AND ? AND name IN ('code_run', 'quiz_answer')`, from, today)

  const actions = []
  for (const name of ['login', 'material_open', 'video_play', 'quiz_answer', 'code_run', 'split_open', 'math_solution_open', 'level_test_finish']) {
    const cur = evCur.get(name) || {}
    actions.push({
      key: name,
      count: cur.c || 0,
      users: cur.u || 0,
      prev: (evPrev.get(name) || {}).c || 0,
      series: seriesOf(eventDaily.filter(r => r.name === name), days),
    })
  }
  actions.find(a => a.key === 'code_run').rate = rates.codeAll ? Math.round((rates.codeOk / rates.codeAll) * 100) : null
  actions.find(a => a.key === 'quiz_answer').rate = rates.quizAll ? Math.round((rates.quizOk / rates.quizAll) * 100) : null

  // Действия, которые и так хранятся в рабочих таблицах
  const tableActions = [
    ['homework_submit', 'homework_submissions', 'submitted_at', 'user_id'],
    ['post_create', 'posts', 'created_at', 'user_id'],
    ['comment_create', 'post_comments', 'created_at', 'user_id'],
    ['post_react', 'post_reactions', 'created_at', 'user_id'],
    ['message_send', 'messages', 'created_at', 'sender_id'],
    ['call_book', 'call_slots', 'booked_at', 'booked_by'],
  ]
  for (const [key, table, col, userCol] of tableActions) {
    const totalsOf = (a, b) => one(`
      SELECT COUNT(*) AS c, COUNT(DISTINCT ${userCol}) AS u FROM ${table}
       WHERE ${col} IS NOT NULL AND date(${col}, '+3 hours') BETWEEN ? AND ?`, a, b)
    const cur = totalsOf(from, today)
    actions.push({
      key,
      count: cur.c || 0,
      users: cur.u || 0,
      prev: totalsOf(prevFrom, prevTo).c || 0,
      series: seriesOf(all(`
        SELECT date(${col}, '+3 hours') AS day, COUNT(*) AS c FROM ${table}
         WHERE ${col} IS NOT NULL AND date(${col}, '+3 hours') BETWEEN ? AND ?
         GROUP BY day`, from, today), days),
    })
  }

  // ── Участники лагеря: какая доля что делала за период ──
  const campDistinct = (sql, ...args) => one(sql, ...args).c || 0
  const camp = {
    total: totals.camp || 0,
    visited: campDistinct(`
      SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
        JOIN users u ON u.id = e.user_id AND u.is_autumn_camp_2026 = 1
       WHERE e.day BETWEEN ? AND ?`, from, today),
    materials: campDistinct(`
      SELECT COUNT(DISTINCT e.user_id) AS c FROM analytics_events e
        JOIN users u ON u.id = e.user_id AND u.is_autumn_camp_2026 = 1
       WHERE e.day BETWEEN ? AND ? AND e.name IN ('page_view', 'material_open')
         AND (e.page = 'camp-week' OR e.name = 'material_open')`, from, today),
    submitted: campDistinct(`
      SELECT COUNT(DISTINCT h.user_id) AS c FROM homework_submissions h
        JOIN users u ON u.id = h.user_id AND u.is_autumn_camp_2026 = 1
       WHERE h.submitted_at IS NOT NULL AND date(h.submitted_at, '+3 hours') BETWEEN ? AND ?`, from, today),
    approved: campDistinct(`
      SELECT COUNT(DISTINCT r.user_id) AS c FROM homework_reviews r
        JOIN users u ON u.id = r.user_id AND u.is_autumn_camp_2026 = 1
       WHERE r.status = 'approved' AND date(r.reviewed_at, '+3 hours') BETWEEN ? AND ?`, from, today),
  }

  // ── Недели лагеря за всё время: материалы и ДЗ ──
  const weeks = new Map()
  const weekOf = (n) => {
    if (!weeks.has(n)) weeks.set(n, { week: n, visitors: 0, students: 0, solutions: 0, approved: 0, pending: 0, chapters: [] })
    return weeks.get(n)
  }
  for (const r of all(`
    SELECT path, COUNT(DISTINCT user_id) AS users FROM analytics_events
     WHERE name = 'page_view' AND page = 'camp-week' GROUP BY path`)) {
    const m = /^\/autumn-camp\/week(\d+)/.exec(r.path || '')
    if (m) weekOf(Number(m[1])).visitors += r.users
  }
  for (const r of all(`
    SELECT week, COUNT(DISTINCT user_id) AS students, COUNT(*) AS solutions,
           SUM(status = 'approved') AS approved, SUM(status = 'submitted') AS pending
      FROM homework_submissions GROUP BY week`)) {
    Object.assign(weekOf(r.week), { students: r.students, solutions: r.solutions, approved: r.approved, pending: r.pending })
  }
  for (const r of all(`
    SELECT CAST(json_extract(props, '$.week') AS INTEGER) AS week,
           json_extract(props, '$.chapter') AS chapter,
           MIN(CAST(json_extract(props, '$.n') AS INTEGER)) AS n,
           MAX(json_extract(props, '$.title')) AS title,
           COUNT(DISTINCT user_id) AS users
      FROM analytics_events WHERE name = 'material_open'
     GROUP BY week, chapter`)) {
    if (!r.week || !r.chapter) continue
    weekOf(r.week).chapters.push({ id: r.chapter, n: r.n, title: r.title || r.chapter, users: r.users })
  }
  for (const w of weeks.values()) w.chapters.sort((a, b) => (a.n || 0) - (b.n || 0))

  // ── Самые активные за период ──
  const top = all(`
    SELECT u.id, u.nickname, u.name, u.is_autumn_camp_2026 AS camp,
           t.seconds, t.days,
           COALESCE(e.views, 0) AS views,
           COALESCE(h.c, 0)     AS solutions
      FROM (SELECT user_id, SUM(seconds) AS seconds, COUNT(DISTINCT day) AS days
              FROM analytics_time WHERE day BETWEEN ? AND ? GROUP BY user_id) t
      JOIN users u ON u.id = t.user_id
      LEFT JOIN (SELECT user_id, COUNT(*) AS views FROM analytics_events
                  WHERE name = 'page_view' AND day BETWEEN ? AND ? GROUP BY user_id) e ON e.user_id = u.id
      LEFT JOIN (SELECT user_id, COUNT(*) AS c FROM homework_submissions
                  WHERE submitted_at IS NOT NULL AND date(submitted_at, '+3 hours') BETWEEN ? AND ?
                  GROUP BY user_id) h ON h.user_id = u.id
     ORDER BY t.seconds DESC LIMIT 10`, from, today, from, today, from, today)
    .map(r => ({ ...r, camp: !!r.camp, minutes: Math.round(r.seconds / 60) }))

  // ── Участники лагеря, которые давно не заходили ──
  const last = lastActiveDays()
  const threshold = addDays(today, -7)
  const inactive = all(`
    SELECT id, nickname, name, date(created_at, '+3 hours') AS joined
      FROM users WHERE is_autumn_camp_2026 = 1`)
    .map(u => ({ ...u, lastDay: last.get(u.id) || null }))
    .filter(u => !u.lastDay || u.lastDay < threshold)
    .sort((a, b) => (a.lastDay || '').localeCompare(b.lastDay || '') || String(a.nickname).localeCompare(String(b.nickname)))

  // ── Новые пользователи ──
  const recentUsers = all(`
    SELECT id, nickname, name, is_autumn_camp_2026 AS camp, datetime(created_at) AS createdAt
      FROM users ORDER BY created_at DESC, id DESC LIMIT 8`)
    .map(u => ({ ...u, camp: !!u.camp }))

  const since = one('SELECT MIN(day) AS d FROM analytics_events').d || null

  return {
    period, from, to: today, prevFrom, prevTo, days, since,
    generatedAt: new Date(now).toISOString(),
    kpi: {
      activeToday: distinctUsers(today, today),
      activeWeek: distinctUsers(addDays(today, -6), today),
      activeMonth: distinctUsers(addDays(today, -29), today),
      active: { cur: distinctUsers(from, today), prev: distinctUsers(prevFrom, prevTo) },
      registrations: { cur: regCount(from, today), prev: regCount(prevFrom, prevTo) },
      avgMinutes: { cur: avgMinutes(from, today), prev: avgMinutes(prevFrom, prevTo) },
      solutions: { cur: hwCur.c || 0, prev: hwPrev.c || 0, students: hwCur.u || 0 },
      reviews: { cur: reviewCount(from, today), prev: reviewCount(prevFrom, prevTo) },
      pending: {
        count: pending.c || 0,
        students: pending.u || 0,
        oldestDays: pending.oldest ? Math.floor((now - Date.parse(`${pending.oldest.replace(' ', 'T')}Z`)) / DAY_MS) : null,
      },
      users: totals.users || 0,
      campUsers: totals.camp || 0,
    },
    series: {
      activeUsers: seriesOf(activity, days, 'users'),
      pageViews: seriesOf(activity, days, 'views'),
      sessions: seriesOf(activity, days, 'sessions'),
      activeMinutes: seriesOf(timeByDay, days, 'seconds').map(s => Math.round(s / 60)),
      registrations: seriesOf(regRows, days),
      solutions: seriesOf(hwRows, days),
      approved: seriesOf(reviewRows, days, 'approved'),
      rework: seriesOf(reviewRows, days, 'rework'),
    },
    heatmap: heat,
    pages,
    devices,
    actions,
    camp,
    weeks: [...weeks.values()].sort((a, b) => a.week - b.week),
    top,
    inactive,
    recentUsers,
  }
}

module.exports = { recordEvent, ingest, overview, lastActiveDays, mskDay }
