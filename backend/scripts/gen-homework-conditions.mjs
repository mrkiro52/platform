import { writeFileSync } from 'fs'
import { WEEK1_CHAPTERS } from '../../src/data/week1Materials.js'
import { WEEK2_CHAPTERS } from '../../src/data/week2Materials.js'
import { WEEK3_CHAPTERS } from '../../src/data/week3Materials.js'
import { SQL_TASKS } from '../../src/data/week4/sqlTasks.js'

const tasks = {}
const chapterTitles = {}

function addTasks(prefix, chapter, hw) {
  if (!hw) return
  const list = hw.kind === 'simple' ? [{ text: hw.text }] : hw.tasks
  list.forEach((t, i) => { tasks[`${prefix}:${chapter.id}:${i}`] = t.text })
}

for (const ch of WEEK1_CHAPTERS) {
  chapterTitles[ch.id] = ch.title
  addTasks('1', ch, ch.homework)
}

for (const ch of WEEK2_CHAPTERS) {
  chapterTitles[ch.id] = ch.title
  addTasks('2', ch, ch.homework)
  // На первом уровне второй недели задания в тетради — набор другой
  if (ch.homeworkPaper) addTasks('2p', ch, ch.homeworkPaper)
}

for (const ch of WEEK3_CHAPTERS) {
  chapterTitles[ch.id] = ch.title
  addTasks('3', ch, ch.homework)
}

// Неделя 4: через форму сдаётся только SQL-задание, остальное — онлайн-тесты
chapterTitles['week4-sql-homework'] = 'Домашнее задание по SQL'
SQL_TASKS.forEach((t, i) => { tasks[`4:week4-sql-homework:${i}`] = t.text })

const out = {
  note: 'Снимок условий домашних заданий. Нужен бэкенду: он чинит старые записи без условия и подставляет название главы в уведомления. Живой источник — src/data/week*Materials.js, пересобрать: node scripts/gen-homework-conditions.mjs',
  chapterTitles,
  tasks,
}

writeFileSync(new URL('../src/data/homework-conditions.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log('глав:', Object.keys(chapterTitles).length, '| условий:', Object.keys(tasks).length)
