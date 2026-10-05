const express = require('express')
const crypto = require('crypto')
const fs = require('fs')
const os = require('os')
const db = require('../db')

// Проверка здоровья для бота-монитора и внешнего сторожа.
// GET /api/health — публичная: жив ли процесс и отвечает ли база.
// GET /api/health/details — с заголовком x-health-key: память, диск, нагрузка.

const router = express.Router()

function dbOk() {
  try {
    return db.prepare('SELECT 1 AS ok').get().ok === 1
  } catch {
    return false
  }
}

router.get('/', (req, res) => {
  const ok = dbOk()
  res.status(ok ? 200 : 503).json({ status: ok ? 'ok' : 'error', db: ok ? 'ok' : 'error', time: new Date().toISOString() })
})

function keyMatches(given) {
  const expected = process.env.HEALTH_KEY || ''
  if (!expected || typeof given !== 'string') return false
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && crypto.timingSafeEqual(a, b)
}

// Доступная память из /proc/meminfo: MemAvailable учитывает кэш, который
// ядро отдаст при нужде, поэтому честнее, чем os.freemem()
function memory() {
  const total = os.totalmem()
  let available = os.freemem()
  try {
    const m = /MemAvailable:\s+(\d+)/.exec(fs.readFileSync('/proc/meminfo', 'utf8'))
    if (m) available = Number(m[1]) * 1024
  } catch { /* не Linux */ }
  return { totalMb: Math.round(total / 1048576), usedPct: Math.round((1 - available / total) * 100) }
}

function disk() {
  try {
    const s = fs.statfsSync('/')
    const total = s.blocks * s.bsize
    const free = s.bavail * s.bsize
    return { totalGb: +(total / 1073741824).toFixed(1), usedPct: Math.round((1 - free / total) * 100) }
  } catch {
    return null
  }
}

router.get('/details', (req, res) => {
  if (!keyMatches(req.get('x-health-key'))) return res.status(404).json({ message: 'Not found' })
  res.json({
    status: dbOk() ? 'ok' : 'error',
    memory: memory(),
    disk: disk(),
    load: os.loadavg().map(n => +n.toFixed(2)),
    cpus: os.cpus().length,
    serverUptimeH: +(os.uptime() / 3600).toFixed(1),
    backendUptimeH: +(process.uptime() / 3600).toFixed(1),
  })
})

module.exports = router
