import { runPython } from './runner'

// Автопроверка задач курса. Тест задачи — один из трёх видов:
//   { input: '3\n5', output: '8' }          — запуск с вводом, сравниваем вывод
//   { call: 'add(2, 3)', expected: '5' }    — вызов функции студента, сравниваем результат
//   { code: 'assert ...', label: '...' }    — произвольная проверка на Python
//   { forbid: ['sorted', '.sort'] }         — в коде нельзя вызывать эти функции или методы
//                                             (проверяется по тексту, без запуска)
//   { forbidRe: '\\.pop\\(\\s*0\\s*\\)', message } — то же по регулярному выражению, со своим сообщением
// perf: true у теста call/code — тест на скорость: если решение не уложилось в лимит
// времени, тест не пройден с понятным сообщением, а проверка идёт дальше.
// Тесты выполняются по одному, каждый с чистого листа. options.prelude — служебный код
// задачи, который выполняется до кода студента (например, классы ListNode и TreeNode).

// input() без подсказки: текст подсказки иначе попал бы в вывод и сломал сравнение.
// Функция кладётся в пространство имён запуска, встроенный input не меняется
const PRELUDE = `def input(prompt=''):
    return __import__('builtins').input()
`

// Помощник для проверок: понятное сообщение, если результат не совпал
const HELPERS = `def __kiro_eq(label, got, expected):
    if got != expected:
        raise AssertionError(f"{label} → ожидалось {expected!r}, получено {got!r}")
`

// Вывод сравниваем без пробелов в конце строк и пустых строк в конце
export function normalizeOutput(text) {
  return String(text || '')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.replace(/\s+$/, ''))
    .join('\n')
    .replace(/\n+$/, '')
    .replace(/^\n+/, '')
}

// Проверка выполняется в try/finally: если служебный код задачи определил _kiro_teardown
// (например, разбор длинных связных списков — см. src/data/courses/algo/helpers.js),
// он вызывается после теста, даже если проверка не прошла
function epilogueFor(test) {
  const body = test.call
    ? `__kiro_eq(${JSON.stringify(test.call)}, ${test.call}, ${test.expected})`
    : test.code
  if (!body) return ''
  const indented = body.split('\n').map(line => `    ${line}`).join('\n')
  return `${HELPERS}try:\n${indented}\nfinally:\n    if '_kiro_teardown' in globals():\n        _kiro_teardown()\n`
}

// Последняя строка ошибки — «AssertionError: …» без служебного трейсбека
function lastLine(error) {
  const lines = String(error || '').trim().split('\n')
  return lines[lines.length - 1].replace(/^AssertionError:\s*/, '')
}

// Код без комментариев: запрет не должен срабатывать на слово в комментарии
function withoutComments(code) {
  return String(code).split('\n').map(line => line.replace(/#.*$/, '')).join('\n')
}

// Вызов функции name( или метода .name( — целым словом: merge_sorted( не считается вызовом sorted(
function forbiddenPattern(name) {
  const escaped = name.replace(/^\./, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return name.startsWith('.')
    ? new RegExp(`\\.${escaped}\\s*\\(`)
    : new RegExp(`(?<![\\w.])${escaped}\\s*\\(`)
}

export function testLabel(test, i) {
  if (test.label) return test.label
  if (test.call) return test.call
  return `Тест ${i + 1}`
}

// Проверить решение. onProgress(i) — начат i-й тест.
// Итог: { passed, total, results: [{ ok, label, detail, input, expected, got }], fatal? }
export async function checkSolution(code, tests, { onProgress = () => {}, prelude = '' } = {}) {
  const results = []
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i]
    onProgress(i)
    if (test.forbidRe) {
      const found = new RegExp(test.forbidRe).test(withoutComments(code))
      results.push(found ? { ok: false, label: testLabel(test, i), detail: test.message } : { ok: true, label: testLabel(test, i) })
      continue
    }
    if (test.forbid) {
      const used = test.forbid.filter(name => forbiddenPattern(name).test(withoutComments(code)))
      results.push(used.length
        ? { ok: false, label: testLabel(test, i), detail: `В этой задаче нельзя использовать: ${used.map(n => `${n}()`).join(', ')}` }
        : { ok: true, label: testLabel(test, i) })
      continue
    }
    let out = ''
    const result = await runPython(code, {
      stdin: test.input || '',
      prelude: prelude ? `${PRELUDE}\n${prelude}\n` : PRELUDE,
      epilogue: epilogueFor(test),
      onEvent: e => { if (e.type === 'output') out += e.chunks.filter(c => c.stream === 'stdout').map(c => c.text).join('') },
    })

    if (result.stopped && result.reason === 'timeout' && test.perf) {
      results.push({ ok: false, label: testLabel(test, i), detail: 'Решение работает слишком долго на большом входе. Нужен алгоритм с меньшей сложностью — подсказка в теории урока.' })
      continue
    }
    if (result.busy || result.loadFailed || result.stopped) {
      return { passed: results.filter(r => r.ok).length, total: tests.length, results, fatal: result.error }
    }

    const label = testLabel(test, i)
    if (!result.ok) {
      if (result.phase === 'check') {
        results.push({ ok: false, label, detail: lastLine(result.error) })
      } else {
        results.push({
          ok: false, label, input: test.input,
          detail: result.needsInput
            ? 'Программа ждёт больше данных через input(), чем есть в тесте'
            : `Ошибка при выполнении:\n${result.error}`,
        })
      }
      continue
    }

    if ('output' in test) {
      const got = normalizeOutput(out)
      const expected = normalizeOutput(test.output)
      results.push(got === expected
        ? { ok: true, label, input: test.input }
        : { ok: false, label, input: test.input, expected, got, detail: 'Вывод не совпадает' })
    } else {
      results.push({ ok: true, label })
    }
  }
  return { passed: results.filter(r => r.ok).length, total: tests.length, results }
}
