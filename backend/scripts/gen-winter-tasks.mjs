// Снимок блоков и заданий зимнего лагеря для бэкенда: backend/src/data/winter-tasks.json.
// Бэкенду он нужен, чтобы проверять, что задание существует и относится к направлению студента,
// подписывать работы в админке и считать, сколько заданий в программе каждого направления.
// Живой источник — src/data/winter/index.js. После изменения состава блоков или глав пересобери:
//   node backend/scripts/gen-winter-tasks.mjs
import { register } from 'node:module'
import { writeFileSync } from 'node:fs'

// Данные фронтенда импортируют соседние файлы без расширения (так принято в Vite) —
// подсказываем Node, что это .js или index.js
register('data:text/javascript,' + encodeURIComponent(`
export async function resolve(specifier, context, next) {
  try { return await next(specifier, context) } catch (e) {
    if (e.code !== 'ERR_MODULE_NOT_FOUND' && e.code !== 'ERR_UNSUPPORTED_DIR_IMPORT') throw e
    for (const suffix of ['.js', '/index.js']) { try { return await next(specifier + suffix, context) } catch {} }
    throw e
  }
}`), import.meta.url)

const { WINTER_MODULES, WINTER_DIRECTIONS, winterTasks, isCountable, taskKey } = await import('../../src/data/winter/index.js')

const modules = {}
const tasks = {}
for (const mod of Object.values(WINTER_MODULES)) {
  modules[mod.key] = { name: mod.name, directions: mod.dirs || null }
  for (const ch of mod.chapters) {
    if (!isCountable(ch)) continue
    tasks[taskKey(mod, ch)] = { module: mod.key, title: ch.title, kind: ch.task.kind, required: !ch.optional }
  }
}

// Сколько обязательных заданий в программе каждого направления
const totals = {}
for (const dir of Object.keys(WINTER_DIRECTIONS)) totals[dir] = winterTasks(dir).filter(t => t.required).length

const out = {
  note: 'Снимок блоков и заданий зимнего лагеря. Живой источник — src/data/winter/index.js, пересобрать: node backend/scripts/gen-winter-tasks.mjs',
  modules,
  totals,
  tasks,
}
writeFileSync(new URL('../src/data/winter-tasks.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log('блоков:', Object.keys(modules).length, '| заданий:', Object.keys(tasks).length, '| по направлениям:', JSON.stringify(totals))
