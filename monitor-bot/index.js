// Бот-монитор KIRO Platform. Пишет только администратору:
// — раз в минуту проверяет сайт, API и базу; после двух провалов подряд
//   присылает «упала», после восстановления — «снова работает» и время простоя;
// — кнопка «Проверить» — отчёт прямо сейчас, «Статистика» — аптайм и падения;
// — предупреждает, когда память или диск сервера подходят к пределу.
// Без зависимостей: Node 20+ (встроенный fetch). Настройки — в .env рядом.

const fs = require('fs')
const path = require('path')

// ── Настройки ───────────────────────────────────────────────────────────────
function loadEnv(file) {
  try {
    for (const line of fs.readFileSync(file, 'utf8').split('\n')) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line)
      if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
    }
  } catch { /* .env может не быть, если переменные заданы снаружи */ }
}
loadEnv(path.join(__dirname, '.env'))

const TOKEN = process.env.TELEGRAM_TOKEN
const ADMIN_ID = Number(process.env.ADMIN_CHAT_ID)
const SITE_URL = process.env.SITE_URL || 'https://kiroplatform.ru'
const DETAILS_URL = process.env.DETAILS_URL || 'http://127.0.0.1:3001/api/health/details'
const HEALTH_KEY = process.env.HEALTH_KEY || ''
const CHECK_EVERY_MS = 60_000
const TIMEOUT_MS = 10_000
const FAILS_TO_ALERT = 2
const MEM_WARN = 90
const DISK_WARN = 85
const WARN_REPEAT_MS = 6 * 3600_000
const STATE_FILE = path.join(__dirname, 'state.json')

if (!TOKEN || !ADMIN_ID) {
  console.error('Нужны TELEGRAM_TOKEN и ADMIN_CHAT_ID в monitor-bot/.env')
  process.exit(1)
}

// ── Состояние: переживает перезапуск бота ───────────────────────────────────
const state = Object.assign({
  up: true,
  downSince: null,
  failStreak: 0,
  lastError: null,
  incidents: [],      // [{ start, end, reason }]
  checks: [],         // [{ t, ok }] за последние 7 дней
  lastWarn: {},       // { memory: ts, disk: ts }
}, readState())

function readState() {
  try { return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) } catch { return {} }
}
function saveState() {
  const weekAgo = Date.now() - 7 * 86400_000
  state.checks = state.checks.filter(c => c.t > weekAgo)
  state.incidents = state.incidents.slice(-50)
  try { fs.writeFileSync(STATE_FILE, JSON.stringify(state)) } catch (e) { console.error('state:', e.message) }
}

// ── Telegram ────────────────────────────────────────────────────────────────
const API = `https://api.telegram.org/bot${TOKEN}`
const KEYBOARD = {
  keyboard: [[{ text: '🔍 Проверить' }, { text: '📊 Статистика' }]],
  resize_keyboard: true,
  is_persistent: true,
}

async function tg(method, body) {
  const res = await fetch(`${API}/${method}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(method === 'getUpdates' ? 40_000 : 15_000),
  })
  const data = await res.json()
  if (!data.ok) throw new Error(`${method}: ${data.description}`)
  return data.result
}

async function send(text) {
  try {
    await tg('sendMessage', { chat_id: ADMIN_ID, text, parse_mode: 'HTML', reply_markup: KEYBOARD, disable_web_page_preview: true })
  } catch (e) {
    console.error('send:', e.message)
  }
}

// ── Проверки ────────────────────────────────────────────────────────────────
async function timed(url, opts = {}) {
  const started = Date.now()
  try {
    const res = await fetch(url, { ...opts, signal: AbortSignal.timeout(TIMEOUT_MS) })
    const text = await res.text()
    return { ok: res.ok, status: res.status, ms: Date.now() - started, text }
  } catch (e) {
    const reason = e.name === 'TimeoutError' ? `не ответил за ${TIMEOUT_MS / 1000} с` : e.cause?.code || e.message
    return { ok: false, status: 0, ms: Date.now() - started, error: reason }
  }
}

async function checkAll() {
  const [site, api] = await Promise.all([
    timed(SITE_URL + '/'),
    timed(SITE_URL + '/api/health'),
  ])
  let db = 'error'
  try { db = JSON.parse(api.text).db } catch { /* не JSON — бэкенд не ответил */ }

  let details = null
  if (HEALTH_KEY) {
    const d = await timed(DETAILS_URL, { headers: { 'x-health-key': HEALTH_KEY } })
    if (d.ok) try { details = JSON.parse(d.text) } catch { /* пусто */ }
  }

  const problems = []
  if (!site.ok) problems.push(`сайт: ${site.error || 'HTTP ' + site.status}`)
  if (!api.ok) problems.push(`API: ${api.error || 'HTTP ' + api.status}`)
  else if (db !== 'ok') problems.push('база данных не отвечает')

  return { ok: problems.length === 0, site, api, db, details, problems }
}

function fmtDuration(ms) {
  const m = Math.round(ms / 60000)
  if (m < 60) return `${m} мин`
  const h = Math.floor(m / 60)
  return `${h} ч ${m % 60} мин`
}

function fmtTime(ts) {
  return new Date(ts).toLocaleString('ru-RU', { timeZone: 'Europe/Moscow', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

function report(r) {
  const lines = [r.ok ? '✅ <b>Всё норм</b>' : '❌ <b>Не норм</b>']
  lines.push(`Сайт: ${r.site.ok ? `ок, ${r.site.ms} мс` : r.site.error || 'HTTP ' + r.site.status}`)
  lines.push(`API: ${r.api.ok ? `ок, ${r.api.ms} мс` : r.api.error || 'HTTP ' + r.api.status}`)
  lines.push(`База: ${r.db === 'ok' ? 'ок' : 'не отвечает'}`)
  if (r.details) {
    const d = r.details
    lines.push(`Память: ${d.memory.usedPct}% из ${d.memory.totalMb} МБ`)
    if (d.disk) lines.push(`Диск: ${d.disk.usedPct}% из ${d.disk.totalGb} ГБ`)
    lines.push(`Нагрузка: ${d.load[0]} (ядер: ${d.cpus})`)
    lines.push(`Сервер работает ${d.serverUptimeH} ч, бэкенд ${d.backendUptimeH} ч`)
  }
  return lines.join('\n')
}

function stats() {
  const now = Date.now()
  const share = (since) => {
    const list = state.checks.filter(c => c.t > since)
    if (!list.length) return '—'
    return (list.filter(c => c.ok).length / list.length * 100).toFixed(2) + '%'
  }
  const recent = state.incidents.slice(-5).reverse()
  const lines = [
    '📊 <b>Статистика</b>',
    `Доступность за сутки: ${share(now - 86400_000)}`,
    `Доступность за неделю: ${share(now - 7 * 86400_000)}`,
    `Сейчас: ${state.up ? '🟢 работает' : `🔴 лежит ${fmtDuration(now - state.downSince)}`}`,
  ]
  if (recent.length) {
    lines.push('', 'Последние падения:')
    for (const i of recent) {
      lines.push(`• ${fmtTime(i.start)} — ${i.end ? fmtDuration(i.end - i.start) : 'ещё не поднялась'} (${i.reason})`)
    }
  } else {
    lines.push('', 'Падений не было.')
  }
  return lines.join('\n')
}

// ── Цикл мониторинга ────────────────────────────────────────────────────────
async function monitor() {
  const r = await checkAll()
  state.checks.push({ t: Date.now(), ok: r.ok })

  if (r.ok) {
    if (!state.up) {
      const downtime = Date.now() - state.downSince
      const incident = state.incidents[state.incidents.length - 1]
      if (incident && !incident.end) incident.end = Date.now()
      state.up = true
      state.downSince = null
      await send(`🟢 <b>Платформа снова работает</b>\nПростой: ${fmtDuration(downtime)}\n\n${report(r)}`)
    }
    state.failStreak = 0
  } else {
    state.failStreak += 1
    if (state.failStreak === 1) state.firstFailAt = Date.now()
    if (state.up && state.failStreak >= FAILS_TO_ALERT) {
      state.up = false
      state.downSince = state.firstFailAt
      state.incidents.push({ start: state.downSince, end: null, reason: r.problems.join('; ') })
      await send(`🔴 <b>Платформа упала</b>\n${r.problems.map(p => '• ' + p).join('\n')}\n\nСообщу, когда поднимется.`)
    }
  }

  // Предупреждения до падения: память и диск
  if (r.details) {
    const warn = async (kind, pct, limit, text) => {
      if (pct < limit) return
      if (Date.now() - (state.lastWarn[kind] || 0) < WARN_REPEAT_MS) return
      state.lastWarn[kind] = Date.now()
      await send(text)
    }
    await warn('memory', r.details.memory.usedPct, MEM_WARN, `⚠️ <b>Память сервера занята на ${r.details.memory.usedPct}%</b>\nЕсли так продолжится, сервер может зависнуть. Проверь: <code>pm2 ls; free -m</code>`)
    if (r.details.disk) await warn('disk', r.details.disk.usedPct, DISK_WARN, `⚠️ <b>Диск заполнен на ${r.details.disk.usedPct}%</b>\nПочисти логи: <code>pm2 flush</code>`)
  }

  saveState()
}

// ── Команды ─────────────────────────────────────────────────────────────────
async function handle(msg) {
  if (msg.chat?.id !== ADMIN_ID) return // бот отвечает только администратору
  const text = (msg.text || '').trim()
  if (text === '/start' || text === '/help') {
    await send('Привет! Я слежу за kiroplatform.ru и напишу, если платформа упадёт или поднимется.\n\n🔍 Проверить — состояние прямо сейчас\n📊 Статистика — доступность и падения')
  } else if (text === '🔍 Проверить' || text === '/check') {
    await tg('sendChatAction', { chat_id: ADMIN_ID, action: 'typing' }).catch(() => {})
    await send(report(await checkAll()))
  } else if (text === '📊 Статистика' || text === '/stats') {
    await send(stats())
  }
}

async function poll() {
  let offset = 0
  for (;;) {
    try {
      const updates = await tg('getUpdates', { offset, timeout: 30, allowed_updates: ['message'] })
      for (const u of updates) {
        offset = u.update_id + 1
        if (u.message) await handle(u.message).catch(e => console.error('handle:', e.message))
      }
    } catch (e) {
      console.error('poll:', e.message)
      await new Promise(r => setTimeout(r, 5000))
    }
  }
}

async function main() {
  console.log('KIRO monitor запущен')
  await tg('setMyCommands', { commands: [
    { command: 'check', description: 'Проверить состояние' },
    { command: 'stats', description: 'Статистика' },
  ] }).catch(e => console.error('commands:', e.message))
  poll()
  const loop = () => monitor().catch(e => console.error('monitor:', e.message)).finally(() => setTimeout(loop, CHECK_EVERY_MS))
  loop()
}

main()
