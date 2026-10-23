// Проверка ответа к задаче курса по математике: студент вводит только ответ.
// Типы ответа (task.kind; по умолчанию — по виду task.answer):
//   number — число: 3.5, 3,5, 7/2, -1/3, 1e-3, «50%» читается как 50
//   vector — несколько чисел по порядку: (1; 2; 3), 1 2 3, [1, 2, 3]
//   set    — несколько чисел в любом порядке
//   matrix — строки матрицы с новой строки (или через |), числа в строке — как в vector
//   choice — номер варианта из task.options
//   text   — слово или фраза: task.answer — строка или список допустимых строк
// Точность сравнения чисел — task.tol (по умолчанию почти точное совпадение).

export function kindOf(task) {
  if (task.kind) return task.kind
  if (task.options) return 'choice'
  if (Array.isArray(task.answer)) return Array.isArray(task.answer[0]) ? 'matrix' : 'vector'
  if (typeof task.answer === 'number') return 'number'
  return 'text'
}

// Одно число: десятичная запятая, дробь a/b, знак минуса любого вида, проценты
export function parseNumber(raw) {
  let s = String(raw ?? '').trim().replace(/\s+/g, '').replace(/[−–—]/g, '-').replace(/%$/, '').replace(',', '.')
  if (!s) return null
  const frac = /^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/.exec(s)
  if (frac) {
    const d = Number(frac[2])
    return d === 0 ? null : Number(frac[1]) / d
  }
  if (!/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(s)) return null
  return Number(s)
}

// Несколько чисел: разделитель «;», пробелы или «, » с пробелом. Запятая без пробела — десятичная,
// но «1,2,3» без пробелов читается как три числа (так пишут чаще, чем «1,2» в значении 1.2 внутри списка)
export function parseList(raw) {
  const s = String(raw ?? '').trim().replace(/^[([{]+|[)\]}]+$/g, '').trim()
  if (!s) return null
  let parts
  if (s.includes(';')) parts = s.split(';')
  else if (/,\s/.test(s) || /\s/.test(s)) parts = s.split(/\s*,\s+|\s+/)
  else if ((s.match(/,/g) || []).length > 1) parts = s.split(',')
  else parts = [s]
  const nums = parts.map(p => p.trim()).filter(Boolean).map(parseNumber)
  return nums.some(n => n === null) ? null : nums
}

function parseMatrix(raw) {
  const rows = String(raw ?? '').split(/\n|\|/).map(r => r.trim()).filter(Boolean)
  if (!rows.length) return null
  const out = rows.map(parseList)
  return out.some(r => r === null) ? null : out
}

const norm = s => String(s ?? '').trim().toLowerCase().replace(/ё/g, 'е').replace(/\s+/g, ' ').replace(/[.!]$/, '')

function close(a, b, tol) {
  const t = tol ?? Math.max(1e-9, Math.abs(b) * 1e-6)
  return Math.abs(a - b) <= t + 1e-12
}

// Возвращает { ok, message } — message объясняет, почему ответ не принят
export function checkAnswer(task, value) {
  const kind = kindOf(task)
  if (kind === 'choice') {
    if (value === null || value === undefined || value === '') return { ok: false, message: 'Выбери один из вариантов.' }
    return Number(value) === task.answer ? { ok: true } : { ok: false, message: 'Неверно — попробуй ещё раз.' }
  }
  if (kind === 'text') {
    if (!String(value ?? '').trim()) return { ok: false, message: 'Введи ответ.' }
    const ok = [].concat(task.answer).some(a => norm(a) === norm(value))
    return ok ? { ok: true } : { ok: false, message: 'Неверно — попробуй ещё раз.' }
  }
  if (kind === 'number') {
    const n = parseNumber(value)
    if (n === null) return { ok: false, message: 'Не получилось прочитать число. Пример записи: 3,5 или 7/2.' }
    return close(n, task.answer, task.tol) ? { ok: true } : { ok: false, message: 'Неверно — попробуй ещё раз.' }
  }
  if (kind === 'matrix') {
    const m = parseMatrix(value)
    if (!m) return { ok: false, message: 'Не получилось прочитать матрицу: каждая строка — с новой строки, числа через пробел.' }
    const want = task.answer
    if (m.length !== want.length || m.some((r, i) => r.length !== want[i].length)) {
      return { ok: false, message: `Нужна матрица ${want.length}×${want[0].length}, а введена ${m.length}×${m[0].length}.` }
    }
    const ok = m.every((r, i) => r.every((v, j) => close(v, want[i][j], task.tol)))
    return ok ? { ok: true } : { ok: false, message: 'Размер верный, но есть ошибка в элементах.' }
  }
  // vector и set
  const list = parseList(value)
  if (!list) return { ok: false, message: 'Не получилось прочитать числа. Пример записи: 1; 2; 3.' }
  const want = task.answer
  if (list.length !== want.length) return { ok: false, message: `Нужно ${want.length} ${plural(want.length)}, а введено ${list.length}.` }
  if (kind === 'set') {
    const a = [...list].sort((x, y) => x - y), b = [...want].sort((x, y) => x - y)
    return a.every((v, i) => close(v, b[i], task.tol)) ? { ok: true } : { ok: false, message: 'Неверно — попробуй ещё раз.' }
  }
  return list.every((v, i) => close(v, want[i], task.tol)) ? { ok: true } : { ok: false, message: 'Неверно — проверь каждое число и их порядок.' }
}

function plural(n) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'число'
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return 'числа'
  return 'чисел'
}

// Подсказка в поле ввода по типу ответа
export function placeholderOf(task) {
  if (task.placeholder) return task.placeholder
  const kind = kindOf(task)
  if (kind === 'vector' || kind === 'set') return `Числа через точку с запятой, например: ${Array.from({ length: task.answer.length }, (_, i) => i + 1).join('; ')}`
  if (kind === 'matrix') return 'Каждая строка матрицы — с новой строки, числа через пробел'
  if (kind === 'text') return 'Ответ словом'
  return 'Число, например: 2,5 или 5/2'
}
