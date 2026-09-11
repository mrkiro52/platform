// Единый каталог домашних заданий осеннего лагеря.
// Условия задач живут во фронтенде (в материалах недель), а бэкенд хранит
// только решения и статусы — поэтому всё, что нужно для отображения задачи,
// собирается здесь по неделе, главе и номеру задачи.

import { WEEK1_CHAPTERS } from './week1Materials'
import { WEEK2_LEVELS, chaptersForLevel } from './week2Materials'

// Пока открыты только первые две недели
export const OPEN_WEEKS = [1, 2]

export const WEEK_TITLES = {
  1: 'Неделя 1 — введение в IT и основы Python',
  2: 'Неделя 2 — алгоритмы',
}

// Неделя 2 разбита на уровни, у каждого свой набор глав
export const WEEK_LEVELS = { 2: WEEK2_LEVELS }

export function hasLevels(week) {
  return Boolean(WEEK_LEVELS[week])
}

// Главы недели. Для недели 2 состав зависит от выбранного уровня.
export function chaptersOf(week, level) {
  if (week === 1) return WEEK1_CHAPTERS
  if (week === 2) return chaptersForLevel(level || 1)
  return []
}

// На первом уровне второй недели задания выполняются в тетради —
// у таких глав отдельный набор заданий.
function homeworkOf(chapter, week, level) {
  if (week === 2 && level === 1 && chapter.homeworkPaper) return chapter.homeworkPaper
  return chapter.homework
}

// Задачи одной главы в едином виде: у первых двух глав недели 1 задание
// одно и текстом, у остальных — по пять задач.
export function tasksOf(chapter, week, level) {
  const hw = homeworkOf(chapter, week, level)
  if (!hw) return []
  if (hw.kind === 'simple') return [{ text: hw.text, hint: null }]
  return hw.tasks
}

export function hwNumberOf(chapter, week, level) {
  const hw = homeworkOf(chapter, week, level)
  return hw ? hw.number : 0
}

// Список заданий недели — по одному на главу
export function assignmentsOf(week, level) {
  return chaptersOf(week, level).map(chapter => ({
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    hwNumber: hwNumberOf(chapter, week, level),
    tasks: tasksOf(chapter, week, level),
  }))
}

// Самый низкий уровень, в программу которого входит глава. Нужен, чтобы со
// страницы задачи открыть форму сдачи с уже выбранным уровнем.
export function levelOfChapter(week, chapterId) {
  if (!hasLevels(week)) return null
  for (const lvl of WEEK_LEVELS[week]) {
    if (chaptersOf(week, lvl.id).some(c => c.id === chapterId)) return lvl.id
  }
  return null
}

// Одна задача по адресу из ссылки. Уровень неизвестен, поэтому для недели 2
// ищем главу по всем уровням — состав третьего уровня включает остальные.
export function findTask(week, chapterId, taskIndex) {
  const weekNum = Number(week)
  const level = weekNum === 2 ? 3 : undefined
  const chapter = chaptersOf(weekNum, level).find(c => c.id === chapterId)
  if (!chapter) return null

  const tasks = tasksOf(chapter, weekNum, undefined)
  const task = tasks[Number(taskIndex)]
  if (!task) return null

  return {
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    hwNumber: hwNumberOf(chapter, weekNum, undefined),
    taskIndex: Number(taskIndex),
    total: tasks.length,
    text: task.text,
    hint: task.hint || null,
  }
}
