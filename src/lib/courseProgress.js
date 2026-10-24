import { useEffect, useSyncExternalStore } from 'react'
import { api } from '../api'
import { COURSES, loadDraft, nick as nickOf } from '../data/courses'

// Прогресс по задачам мини-курсов: { [taskId]: { answer } }, answer — принятое
// решение (ответ или код) или null у старых записей без решения.
// Источник правды — сервер (/api/courses/progress): прогресс виден после
// перезагрузки и с другого устройства. В localStorage — кэш, чтобы страница
// сразу показывала решённое, и запас на случай, если сохранение не дошло:
// при следующей загрузке такие задачи досылаются на сервер.

const EMPTY = {}
const storageKey = nick => `kiro-course-progress:${nick}`
const listeners = new Set()
const fetched = new Set()
let current = { nick: null, data: EMPTY }

function readLocal(nick) {
  try {
    const raw = JSON.parse(localStorage.getItem(storageKey(nick))) || {}
    // Раньше хранили { taskId: true } — приводим к новому виду
    return Object.fromEntries(Object.entries(raw).map(([id, v]) => [id, v && typeof v === 'object' ? v : { answer: null }]))
  } catch { return {} }
}

function commit(data) {
  current = { nick: current.nick, data }
  try { localStorage.setItem(storageKey(current.nick), JSON.stringify(data)) } catch { /* без кэша */ }
  listeners.forEach(l => l())
}

function select(nick) {
  if (current.nick !== nick) current = { nick, data: nick ? readLocal(nick) : EMPTY }
}

// Курс задачи по id урока: w1d1t3 → python, d4t2 → math-ml, a7t1 → algorithms
const lessonCourse = new Map(COURSES.flatMap(c => (c.weeks || []).flatMap(w => w.lessons.map(l => [l.id, c.slug]))))
export function courseOfTask(taskId) {
  return lessonCourse.get(String(taskId).replace(/t\d+$/, '')) || null
}

async function sync(user) {
  const nick = nickOf(user)
  if (!nick || fetched.has(nick)) return
  fetched.add(nick)
  try {
    const server = await api.courseProgress()
    if (current.nick !== nick) return
    const merged = {}
    for (const tasks of Object.values(server || {})) {
      for (const [id, v] of Object.entries(tasks)) merged[id] = { answer: v.answer ?? null }
    }
    const localOnly = Object.entries(current.data).filter(([id]) => !merged[id])
    for (const [id, v] of localOnly) merged[id] = v
    commit(merged)
    for (const [id, v] of localOnly) {
      const course = courseOfTask(id)
      if (course) api.saveCourseProgress(course, id, v.answer ?? loadDraft(user, id)).catch(() => {})
    }
  } catch {
    fetched.delete(nick)
  }
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCourseProgress(user) {
  const nick = nickOf(user)
  select(nick)
  const data = useSyncExternalStore(subscribe, () => (current.nick === nick ? current.data : EMPTY))
  useEffect(() => { sync(user) }, [nick]) // eslint-disable-line react-hooks/exhaustive-deps
  return data
}

// Задача решена: сразу отмечаем в браузере и сохраняем на сервере.
// Первое принятое решение не меняется
export function markSolved(user, course, taskId, answer) {
  select(nickOf(user))
  if (current.data[taskId]) return
  commit({ ...current.data, [taskId]: { answer: answer ?? null } })
  api.saveCourseProgress(course, taskId, answer ?? null).catch(() => {})
}

// Сколько задач урока решено. Число задач — из оглавления курса (tasks, по умолчанию 5)
export function lessonTaskIds(lesson) {
  return Array.from({ length: lesson.tasks || 5 }, (_, n) => `${lesson.id}t${n + 1}`)
}

export function lessonSolved(progress, lesson) {
  return lessonTaskIds(lesson).filter(id => progress[id]).length
}

export function courseStats(progress, course) {
  const lessons = (course.weeks || []).flatMap(w => w.lessons)
  const total = lessons.reduce((n, l) => n + (l.tasks || 5), 0)
  const solved = lessons.reduce((n, l) => n + lessonSolved(progress, l), 0)
  return { solved, total }
}
