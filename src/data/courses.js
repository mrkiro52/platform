// Мини-курсы платформы: описание, цены, структура и доступ.
// Содержимое уроков — в src/data/courses/<курс>/: python, math, algo.
// Раздел временно виден только пользователю с логином из COURSES_PREVIEW_USERS
// (проверка на фронтенде: это витрина в разработке, а не защита данных).

import { PYTHON_WEEKS, loadPythonLesson } from './courses/python'
import { MATH_WEEKS, loadMathLesson } from './courses/math'
import { ALGO_WEEKS, loadAlgoLesson } from './courses/algo'

// Логины — в нижнем регистре: сравнение идёт без учёта регистра (militaryzCl → militaryzcl)
export const COURSES_PREVIEW_USERS = ['khani', 'militaryzcl', 'lostce']

// Полный доступ к курсам (как после покупки). Пока оплаты нет — выдаётся вручную.
// Проверка на фронтенде: когда появится оплата, доступ нужно хранить и проверять на сервере
const ALL_COURSES = ['python', 'math-ml', 'algorithms']
const FULL_ACCESS = {
  khani: ALL_COURSES,
  militaryzcl: ALL_COURSES,
  lostce: ALL_COURSES,
}

function nick(user) {
  return String(user?.nickname || '').toLowerCase()
}

export function canSeeCourses(user) {
  return COURSES_PREVIEW_USERS.includes(nick(user))
}

export function hasFullAccess(user, slug) {
  return (FULL_ACCESS[nick(user)] || []).includes(slug)
}

export function canOpenLesson(user, course, lesson) {
  return !!lesson?.free || hasFullAccess(user, course.slug)
}

// Прогресс по задачам и черновики решений — в браузере, у каждого пользователя свои
const progressKey = user => `kiro-course-progress:${nick(user)}`

export function loadProgress(user) {
  try { return JSON.parse(localStorage.getItem(progressKey(user))) || {} } catch { return {} }
}

export function markSolved(user, taskId) {
  const progress = loadProgress(user)
  progress[taskId] = true
  try { localStorage.setItem(progressKey(user), JSON.stringify(progress)) } catch { /* без сохранения */ }
  return progress
}

const draftKey = (user, taskId) => `kiro-course-code:${nick(user)}:${taskId}`

export function loadDraft(user, taskId) {
  try { return localStorage.getItem(draftKey(user, taskId)) } catch { return null }
}

export function saveDraft(user, taskId, code) {
  try { localStorage.setItem(draftKey(user, taskId), code) } catch { /* без сохранения */ }
}

// Цена зависит от числа курсов в покупке
export const COURSE_PRICE = 4990
export const BUNDLE_PRICES = { 1: 4990, 2: 7990, 3: 9990 }

export function priceFor(count) {
  return BUNDLE_PRICES[count] || 0
}

// Выгода относительно покупки курсов по отдельности
export function savingFor(count) {
  return count * COURSE_PRICE - priceFor(count)
}

export function rub(n) {
  return `${n.toLocaleString('ru-RU').replace(/ /g, ' ')} ₽`
}

// Урок курса: видео + теория + задачи. free — открыт без оплаты.
export const COURSES = [
  {
    slug: 'python',
    short: 'Python',
    title: 'Python: с нуля и до профи',
    tagline: 'Выжимка без лишней теории — до уровня Junior Python-разработчика',
    duration: '3 недели',
    accent: '#58A6FF',
    icon: 'Py',
    audience: [
      'Новичок без опыта в программировании, который хочет начать, но не знает, с чего.',
      'Те, кто хочет повторить Python и зафиксировать знания.',
    ],
    outcome: 'Самостоятельно писать простые программы: работать с данными, функциями, файлами и запросами к API.',
    format: [
      'Код пишется и запускается прямо на платформе, в браузере. Ничего устанавливать не нужно — главный барьер новичка снят в первый же день.',
      'Каждый урок — видео, теория и 5 задач для решения.',
      'В конце — финальный проект.',
    ],
    lesson: ['Видеоурок', 'Теория', '5 задач'],
    free: 'Видеоурок первого урока, теория и 5 задач к нему',
    finalProject: true,
    weeks: PYTHON_WEEKS,
    loadLesson: loadPythonLesson,
    modules: [],
  },
  {
    slug: 'math-ml',
    short: 'Математика',
    title: 'Математика: вся для Junior ML',
    tagline: 'Сначала ML-пример, потом формула — математика без страха',
    duration: '3 недели',
    accent: '#BC8CFF',
    icon: 'Σ',
    audience: [
      'Тот, кто хочет в ML, но боится формул. Нужна только школьная математика.',
      'Желательно знать основы Python: примеры в теории написаны на numpy, поэтому курс удобно проходить после курса по Python.',
    ],
    outcome: 'Понимать, что происходит внутри моделей: как работают векторы и матрицы, как модель «учится» через градиентный спуск, зачем нужны вероятности и статистика.',
    format: [
      'Каждая тема сначала объясняется на ML-примере, и только потом идёт формула.',
      'К каждому уроку — 5 задач: решаешь, вписываешь ответ, и платформа сразу его проверяет. После верного ответа открывается разбор решения.',
      'Примеры на numpy запускаются прямо в браузере. Все данные синтетические и небольшие — например, цены квартир, — чтобы курс не превращался в курс по работе с датасетами.',
      'В конце — итоговый экзамен по всем темам.',
    ],
    lesson: ['Видеоурок', 'Теория', '5 задач с проверкой ответа'],
    free: 'Видеоурок первого урока, теория и 5 задач к нему',
    finalProject: false,
    weeks: MATH_WEEKS,
    loadLesson: loadMathLesson,
    dayWord: 'день',
    taskLead: 'Реши задачу на бумаге или в numpy, впиши ответ и нажми «Проверить ответ». Дробные ответы можно вводить через запятую или точку, а также дробью вида 7/2. После верного ответа откроется разбор решения.',
    modules: [],
  },
  {
    slug: 'algorithms',
    short: 'Алгоритмы',
    title: 'Алгоритмы: leetcode и алгособесы',
    tagline: 'Только паттерны и задачи, которые реально спрашивают на собеседованиях',
    duration: '3 недели',
    accent: '#3FB950',
    icon: '{ }',
    audience: [
      'Тот, кто готовится к техническим собеседованиям.',
      'Желательно знать Python: решения пишутся и проверяются на нём.',
    ],
    outcome: 'Узнавать типовые паттерны и решать стандартные задачи, которые спрашивают на собеседованиях: два указателя, скользящее окно, хеш-таблицы, стек, связные списки, двоичный поиск, деревья, графы, жадные алгоритмы, кучу и перебор с возвратом.',
    format: [
      'Паттерны, а не заучивание задач: в каждом уроке учишься узнавать тип задачи и применять нужный приём.',
      '95 задач с LeetCode с автопроверкой прямо на платформе: код запускается в браузере и проходит скрытые тесты, в том числе на скорость.',
      'После каждой решённой задачи открывается текстовый разбор с эталонным решением, сложностью и типичными ошибками.',
      'Каждую неделю — мини-контест с таймером, в конце курса — финальный контест и план повторения.',
    ],
    lesson: ['Видео о паттерне', 'Теория', 'Задачи с разборами'],
    free: 'Видеоурок первого урока, теория и 5 задач к нему',
    finalProject: false,
    weeks: ALGO_WEEKS,
    loadLesson: loadAlgoLesson,
    dayWord: 'день',
    taskLead: 'Напиши решение в редакторе и нажми «Проверить решение»: код пройдёт скрытые тесты, в том числе на большие входные данные — медленное решение не уложится по времени. После решения откроется разбор, а после двух неудачных проверок его можно открыть самому.',
    modules: [],
  },
]

export function courseBySlug(slug) {
  return COURSES.find(c => c.slug === slug) || null
}

export const MANAGER_URL = 'https://t.me/kiro_team_manager'
