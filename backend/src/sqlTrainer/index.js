// Мост к процессу SQL-тренажёра: очередь запросов, таймаут, перезапуск.
// Запросы выполняются по одному — база маленькая, каждый занимает
// миллисекунды, а очередь не даёт одному человеку завалить сервер.

const path = require('path')
const { fork } = require('child_process')

const DB_FILE = path.join(__dirname, '..', '..', 'data', 'sql-trainer.db')
const RUNNER = path.join(__dirname, 'runner.js')
const fs = require('fs')

const TIMEOUT_MS = 3000
const MAX_QUEUE = 25
// Сторож памяти: процесс тренажёра, раздувшийся больше этого, убивается.
// Работает на Linux (читает /proc), локально на macOS просто молчит.
// На сервере всего 1 ГБ памяти без swap, поэтому потолок низкий.
const MAX_RSS_KB = 160 * 1024

function rssKb(pid) {
  try {
    const m = /VmRSS:\s+(\d+)/.exec(fs.readFileSync(`/proc/${pid}/status`, 'utf8'))
    return m ? Number(m[1]) : 0
  } catch { return 0 }
}

let child = null
let ready = null       // промис готовности процесса (база создана и открыта)
let current = null     // { msg, resolve, timer }
const queue = []
let nextId = 1

function spawn() {
  child = fork(RUNNER, [DB_FILE], {
    execArgv: ['--max-old-space-size=160'],
    stdio: ['ignore', 'inherit', 'inherit', 'ipc'],
  })
  const proc = child
  ready = new Promise((resolve) => {
    proc.on('message', function onReady(msg) {
      if (msg && msg.type === 'ready') { proc.off('message', onReady); resolve() }
    })
  })
  proc.on('message', (msg) => {
    if (!current || !msg || msg.id !== current.msg.id) return
    finish(msg)
  })
  proc.on('exit', () => {
    if (child === proc) child = null
    // Процесс упал посреди запроса (например, кончилась память)
    if (current && current.proc === proc) finish({ ok: false, error: 'Запрос не выполнился — скорее всего, он строит слишком большой результат. Упрости его' })
  })
}

function finish(result) {
  const job = current
  current = null
  clearTimeout(job.timer)
  clearInterval(job.watch)
  job.resolve(result)
  pump()
}

async function pump() {
  if (current || !queue.length) return
  current = queue.shift()
  if (!child) spawn()
  const proc = child
  await ready
  if (!current || proc !== child) return
  current.proc = proc
  current.timer = setTimeout(() => {
    // Прервать запрос изнутри SQLite отсюда нельзя — убиваем процесс целиком,
    // следующий запрос поднимет новый
    if (child === proc) child = null
    proc.kill('SIGKILL')
    if (current) finish({ ok: false, error: `Запрос выполнялся дольше ${TIMEOUT_MS / 1000} секунд и был остановлен. Скорее всего, он перемножает большие таблицы.` })
  }, TIMEOUT_MS)
  current.watch = setInterval(() => {
    if (rssKb(proc.pid) <= MAX_RSS_KB) return
    if (child === proc) child = null
    proc.kill('SIGKILL')
    if (current) finish({ ok: false, error: 'Запросу не хватило памяти — он строит слишком большой результат' })
  }, 50)
  proc.send(current.msg)
}

function request(msg) {
  if (queue.length >= MAX_QUEUE) return Promise.resolve({ ok: false, busy: true, error: 'Тренажёр сейчас загружен — попробуй через несколько секунд' })
  return new Promise((resolve) => {
    queue.push({ msg: { ...msg, id: nextId++ }, resolve, timer: null })
    pump()
  })
}

let schemaCache = null
async function getSchema() {
  if (!schemaCache) {
    const res = await request({ type: 'schema' })
    if (res.schema) schemaCache = res.schema
    else throw new Error(res.error || 'Не удалось прочитать схему базы')
  }
  return schemaCache
}

const run = (sql, taskId) => request({ type: 'run', sql, taskId })

module.exports = { run, getSchema }
