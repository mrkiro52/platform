// Аналитика поведения на платформе: визиты, просмотры разделов, активное
// время и ключевые действия (главы, квизы, запуски кода, видео…).
// Данные видит главный админ на дашборде админки.
//
// События копятся в памяти и уходят пачкой раз в 30 секунд и при уходе со
// вкладки. Аналитика никогда не мешает работе: ошибки сети молча
// откладываются до следующей пачки, а если бэкенд такие события не
// принимает, трекер просто выключается до перезагрузки страницы.
//
// Сохраняются только действия и разделы — без текстов решений, сообщений
// и прочего, что человек пишет.

const BASE = import.meta.env.VITE_API_URL || ''
const ENDPOINT = `${BASE}/api/analytics/events`

const FLUSH_MS = 30_000
const TICK_MS = 5_000
// Без касаний, кликов и прокрутки дольше этого время не засчитывается:
// вкладка открыта, но человек отошёл
const IDLE_MS = 90_000
// Перерыв, после которого начинается новый визит
const SESSION_GAP_MS = 30 * 60_000
const MAX_QUEUE = 300

let started = false
let disabled = false
let queue = []
let time = {}                // раздел → накопленные активные секунды
let currentPage = null
let currentPath = null
let lastActivity = Date.now()
let sessionId = null
let sessionLast = 0
let lastTouch = 0

function token() {
  try { return JSON.parse(localStorage.getItem('kiro_user'))?.token || null } catch { return null }
}

// Раздел платформы по адресу. Ключи совпадают с PAGE_LABELS в админке
// (backend/admin/js/pages/dashboard.js).
const PAGE_RULES = [
  [/^\/dashboard$/, 'dashboard'],
  [/^\/wall$/, 'wall'],
  [/^\/messages(\/|$)/, 'messages'],
  [/^\/library(\/|$)/, 'library'],
  [/^\/trainings(\/|$)/, 'trainings'],
  [/^\/links$/, 'links'],
  [/^\/likebezy(\/|$)/, 'likebezy'],
  [/^\/antireels$/, 'antireels'],
  [/^\/profile$/, 'profile'],
  [/^\/u\//, 'user-profile'],
  [/^\/notifications$/, 'notifications'],
  [/^\/announcements$/, 'announcements'],
  [/^\/autumn-camp$/, 'camp'],
  [/^\/autumn-camp\/onboarding/, 'camp-onboarding'],
  [/^\/autumn-camp\/math$/, 'math'],
  [/^\/autumn-camp\/math\/[^/]+\/theory$/, 'math-theory'],
  [/^\/autumn-camp\/math\/[^/]+\/homework$/, 'math-homework'],
  [/^\/autumn-camp\/upload-homework$/, 'homework-upload'],
  [/^\/autumn-camp\/homework\//, 'homework-task'],
  [/^\/autumn-camp\/week\d+$/, 'camp-week'],
]

export function pageOf(pathname) {
  for (const [re, key] of PAGE_RULES) if (re.test(pathname)) return key
  return 'other'
}

function deviceClass() {
  const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
  if (!coarse) return 'desktop'
  return Math.min(window.screen.width, window.screen.height) >= 600 ? 'tablet' : 'mobile'
}

function osFamily() {
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1)) return 'iOS'
  if (/Android/.test(ua)) return 'Android'
  if (/Windows/.test(ua)) return 'Windows'
  if (/Mac OS X|Macintosh/.test(ua)) return 'macOS'
  if (/Linux/.test(ua)) return 'Linux'
  return 'other'
}

function push(name, props, page, path) {
  if (disabled) return
  const pathname = path || window.location.pathname
  queue.push({
    name,
    page: page || pageOf(pathname),
    path: pathname,
    props: props || undefined,
    ts: Date.now(),
  })
  if (queue.length > MAX_QUEUE) queue.splice(0, queue.length - MAX_QUEUE)
  if (queue.length >= 25) flush()
}

// Продлевает визит; после долгого перерыва начинает новый
function touchSession(now = Date.now()) {
  if (!sessionId) {
    try {
      sessionId = sessionStorage.getItem('kiro_an_sid')
      sessionLast = Number(sessionStorage.getItem('kiro_an_last')) || 0
    } catch { /* приватный режим — визит живёт в памяти */ }
  }
  if (!sessionId || now - sessionLast > SESSION_GAP_MS) {
    sessionId = (window.crypto && crypto.randomUUID ? crypto.randomUUID() : `${now.toString(36)}${Math.random().toString(36).slice(2)}`).slice(0, 36)
    try { sessionStorage.setItem('kiro_an_sid', sessionId) } catch { /* без сохранения */ }
    push('session_start', { device: deviceClass(), os: osFamily() })
  }
  sessionLast = now
  try { sessionStorage.setItem('kiro_an_last', String(now)) } catch { /* без сохранения */ }
}

function markActivity() {
  const now = Date.now()
  lastActivity = now
  // Продлевать визит на каждое движение мыши незачем — раз в 10 секунд
  if (now - lastTouch > 10_000) {
    lastTouch = now
    touchSession(now)
  }
}

function videoPlaying() {
  for (const v of document.querySelectorAll('video')) if (!v.paused && !v.ended) return true
  return false
}

function tick() {
  if (document.visibilityState !== 'visible' || !currentPage) return
  const playing = videoPlaying()
  if (Date.now() - lastActivity > IDLE_MS && !playing) return
  if (playing) markActivity()
  time[currentPage] = (time[currentPage] || 0) + TICK_MS / 1000
}

function flush({ unloading = false } = {}) {
  if (disabled) return
  const t = token()
  if (!t) return
  const entries = Object.entries(time)
    .map(([page, seconds]) => ({ page, seconds: Math.round(seconds) }))
    .filter(e => e.seconds > 0)
  if (!queue.length && !entries.length) return
  const events = queue.splice(0, 100)
  time = {}

  fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
    body: JSON.stringify({ sessionId, events, time: entries }),
    // Запрос переживает закрытие вкладки
    keepalive: unloading,
  })
    .then(res => {
      // Бэкенд ещё без аналитики или сессия закончилась — не долбим его
      if (res.status === 404 || res.status === 401 || res.status === 403) disabled = true
    })
    .catch(() => {
      if (unloading) return
      // Нет сети — вернём в очередь и отправим со следующей пачкой
      queue = events.concat(queue).slice(-MAX_QUEUE)
      for (const e of entries) time[e.page] = (time[e.page] || 0) + e.seconds
    })
}

// Запускается один раз, когда человек вошёл в платформу
export function startAnalytics() {
  if (started) return
  started = true
  setInterval(tick, TICK_MS)
  setInterval(() => flush(), FLUSH_MS)
  for (const ev of ['pointerdown', 'keydown', 'scroll', 'wheel', 'touchstart']) {
    window.addEventListener(ev, markActivity, { passive: true, capture: true })
  }
  let lastMove = 0
  window.addEventListener('mousemove', () => {
    const now = Date.now()
    if (now - lastMove > 5_000) { lastMove = now; markActivity() }
  }, { passive: true })
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flush({ unloading: true })
    else markActivity()
  })
  window.addEventListener('pagehide', () => flush({ unloading: true }))
}

// Просмотр раздела — вызывается при каждой смене адреса
export function trackPage(pathname) {
  if (pathname === currentPath) return
  currentPath = pathname
  currentPage = pageOf(pathname)
  lastActivity = Date.now()
  touchSession()
  push('page_view', undefined, currentPage, pathname)
}

// Ключевое действие: track('code_run', { ok: true })
export function track(name, props) {
  touchSession()
  push(name, props)
}

// При выходе из аккаунта: отправить накопленное, пока токен ещё есть,
// и начать следующий визит с чистого листа
export function endAnalyticsSession() {
  flush({ unloading: true })
  queue = []
  time = {}
  sessionId = null
  sessionLast = 0
  currentPath = null
  currentPage = null
  try {
    sessionStorage.removeItem('kiro_an_sid')
    sessionStorage.removeItem('kiro_an_last')
  } catch { /* без сохранения */ }
}
