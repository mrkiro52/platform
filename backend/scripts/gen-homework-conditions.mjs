import { writeFileSync } from 'fs'
import { WEEK1_CHAPTERS } from '../../src/data/week1Materials.js'
import { WEEK2_CHAPTERS } from '../../src/data/week2Materials.js'

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

const out = {
  note: 'Снимок условий домашних заданий. Нужен бэкенду: он чинит старые записи без условия и подставляет название главы в уведомления. Живой источник — src/data/week*Materials.js, пересобрать: node scripts/gen-homework-conditions.mjs',
  chapterTitles,
  tasks,
}

writeFileSync(new URL('../src/data/homework-conditions.json', import.meta.url), JSON.stringify(out, null, 2) + '\n')
console.log('глав:', Object.keys(chapterTitles).length, '| условий:', Object.keys(tasks).length)
