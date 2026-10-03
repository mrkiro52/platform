// Отдельный процесс, в котором выполняются запросы SQL-тренажёра.
// Он изолирован от основного сервера: тяжёлый запрос, который не уложился
// в таймаут или съел память, убивает только этот процесс — платформа
// продолжает работать, а следующий запрос поднимет процесс заново.

const crypto = require('crypto')
const Database = require('better-sqlite3')
const { ensureDatabase } = require('./generate')
const { TASKS } = require('./tasks')

const file = process.argv[2]
ensureDatabase(file)

const db = new Database(file, { readonly: true, fileMustExist: true })
db.pragma('query_only = ON')

// Лимиты памяти SQLite в этой сборке не работают (она собрана без учёта
// памяти), поэтому функции, которыми можно раздуть одно значение до
// гигабайта, заменены версиями с потолком. Остальное держит таймаут и
// сторож памяти процесса в index.js.
const MAX_VALUE = 1_000_000
const tooBig = () => { throw new Error('too big: одно значение больше 1 МБ') }
const asText = (v) => (Buffer.isBuffer(v) ? v.toString() : String(v))
db.function('randomblob', { deterministic: false }, (n) => {
  if (Number(n) > MAX_VALUE) tooBig()
  return crypto.randomBytes(Math.max(1, Math.floor(Number(n)) || 1))
})
db.function('zeroblob', (n) => {
  if (Number(n) > MAX_VALUE) tooBig()
  return Buffer.alloc(Math.max(0, Math.floor(Number(n)) || 0))
})
db.function('replace', (s, from, to) => {
  if (s === null || from === null || to === null) return null
  const text = asText(s)
  const pattern = asText(from)
  if (!pattern) return text
  const out = text.split(pattern).join(asText(to))
  if (out.length > MAX_VALUE) tooBig()
  return out
})
for (const name of ['printf', 'format']) {
  db.function(name, { varargs: true }, () => { throw new Error(`Функция ${name} в тренажёре отключена`) })
}
for (const name of ['group_concat', 'string_agg']) {
  db.aggregate(name, {
    varargs: true,
    start: () => ({ text: null }),
    step: (acc, value, sep) => {
      if (value === null || value === undefined) return acc
      const glue = sep === undefined ? ',' : sep === null ? '' : asText(sep)
      acc.text = acc.text === null ? asText(value) : acc.text + glue + asText(value)
      if (acc.text.length > MAX_VALUE) tooBig()
      return acc
    },
    result: (acc) => acc.text,
  })
}

// Строк собираем не больше этого — для проверки хватает с запасом
const ROW_CAP = 50000
// Показываем в ответе
const SHOW_ROWS = 200

function stripComments(sql) {
  return sql.replace(/--[^\n]*/g, ' ').replace(/\/\*[\s\S]*?\*\//g, ' ').trim()
}

function execute(sql) {
  const clean = stripComments(sql)
  if (!/^(select|with)\b/i.test(clean)) {
    throw new Error('Тренажёр выполняет только запросы на чтение — начни с SELECT')
  }
  if (/\brecursive\b/i.test(clean)) throw new Error('Рекурсивные запросы в тренажёре отключены')
  const stmt = db.prepare(sql)
  if (!stmt.reader) throw new Error('Тренажёр выполняет только запросы на чтение — начни с SELECT')
  stmt.raw(true)
  const columns = stmt.columns().map(c => c.name)
  const rows = []
  let truncated = false
  for (const row of stmt.iterate()) {
    if (rows.length >= ROW_CAP) { truncated = true; break }
    rows.push(row.map(v => (Buffer.isBuffer(v) ? '<BLOB>' : typeof v === 'bigint' ? Number(v) : v)))
  }
  return { columns, rows, truncated }
}

// ── Проверка ответа ──
const refCache = new Map()
function reference(task) {
  if (!refCache.has(task.id)) refCache.set(task.id, execute(task.sql))
  return refCache.get(task.id)
}

const keyOf = (v) => (typeof v === 'number' ? Math.round(v * 100) / 100 : v)
const same = (a, b) => (typeof a === 'number' && typeof b === 'number' ? Math.abs(a - b) <= 0.01 : a === b)
const rowKey = (row) => JSON.stringify(row.map(keyOf))

function verdict(task, result) {
  const ref = reference(task)
  if (result.truncated) return { correct: false, reason: 'В ответе слишком много строк — правильный результат намного меньше' }
  if (result.columns.length !== ref.columns.length) {
    return { correct: false, reason: `Ожидается столбцов: ${ref.columns.length}, а в твоём ответе: ${result.columns.length}` }
  }
  let rows = result.rows
  // Те же столбцы, но в другом порядке — переставляем по названиям
  const mine = result.columns.map(c => c.toLowerCase())
  const theirs = ref.columns.map(c => c.toLowerCase())
  if (mine.join('|') !== theirs.join('|') && new Set(mine).size === mine.length &&
      [...mine].sort().join('|') === [...theirs].sort().join('|')) {
    const order = theirs.map(n => mine.indexOf(n))
    rows = rows.map(r => order.map(i => r[i]))
  }
  if (rows.length !== ref.rows.length) {
    return { correct: false, reason: 'Количество строк не совпадает с правильным ответом' }
  }
  const equalRows = (a, b) => a.every((row, i) => row.every((v, j) => same(v, b[i][j])))
  const byKey = (x, y) => rowKey(x).localeCompare(rowKey(y))
  // Набор строк сравнивается без учёта порядка
  if (!equalRows([...rows].sort(byKey), [...ref.rows].sort(byKey))) {
    return { correct: false, reason: 'Строк столько же, но значения отличаются' }
  }
  // В задачах на сортировку важен и порядок
  if (task.ordered && !equalRows(rows, ref.rows)) {
    return { correct: false, reason: 'Строки верные, но порядок другой — проверь ORDER BY' }
  }
  return { correct: true }
}

// Сообщения SQLite на русском — самые частые
function humanError(message) {
  const m = String(message)
  let r
  if ((r = /no such table: (\S+)/.exec(m))) return `Нет такой таблицы: ${r[1]}`
  if ((r = /no such column: (\S+)/.exec(m))) return `Нет такого столбца: ${r[1]}`
  if ((r = /near "([^"]*)": syntax error/.exec(m))) return `Синтаксическая ошибка рядом с «${r[1]}»`
  if (/incomplete input/.test(m)) return 'Запрос оборван — проверь скобки и кавычки'
  if (/more than one statement/.test(m)) return 'Выполняется один запрос за раз — убери лишнюю точку с запятой и всё, что после неё'
  if ((r = /ambiguous column name: (\S+)/.exec(m))) return `Столбец ${r[1]} есть в нескольких таблицах — укажи таблицу: таблица.${r[1]}`
  if (/misuse of aggregate/.test(m)) return 'Агрегатная функция использована не там — например, в WHERE вместо SELECT'
  if (/too big|out of memory/i.test(m)) return 'Запросу не хватило памяти — он строит слишком большой результат'
  if (/interrupted/.test(m)) return 'Запрос прерван'
  return m
}

function schema() {
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'meta' ORDER BY rowid").all()
  return tables.map(({ name }) => ({
    table: name,
    rows: db.prepare(`SELECT COUNT(*) AS c FROM "${name}"`).get().c,
    columns: db.prepare(`PRAGMA table_info("${name}")`).all().map(c => ({ name: c.name, type: c.type, notNull: !!c.notnull, pk: !!c.pk })),
  }))
}

process.on('message', (msg) => {
  if (msg.type === 'schema') {
    process.send({ id: msg.id, schema: schema() })
    return
  }
  const started = process.hrtime.bigint()
  try {
    const result = execute(msg.sql)
    const ms = Number(process.hrtime.bigint() - started) / 1e6
    const task = TASKS.find(t => t.id === msg.taskId)
    process.send({
      id: msg.id,
      ok: true,
      columns: result.columns,
      rows: result.rows.slice(0, SHOW_ROWS),
      rowCount: result.rows.length,
      truncated: result.truncated,
      ms: Math.round(ms * 10) / 10,
      verdict: task ? verdict(task, result) : null,
    })
  } catch (e) {
    process.send({ id: msg.id, ok: false, error: humanError(e.message) })
  }
})

// Основной сервер перезапустился или упал — уходим вместе с ним
process.on('disconnect', () => process.exit(0))
process.send({ type: 'ready' })
