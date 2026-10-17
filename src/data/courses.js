// Мини-курсы платформы: описание, цены, структура и доступ.
// Содержимое уроков — в src/data/courses/<курс>/ (пока готов курс по Python).
// Раздел временно виден только пользователю с логином из COURSES_PREVIEW_USERS
// (проверка на фронтенде: это витрина в разработке, а не защита данных).

import { PYTHON_WEEKS, loadPythonLesson } from './courses/python'

export const COURSES_PREVIEW_USERS = ['khani']

// Полный доступ к курсам (как после покупки). Пока оплаты нет — выдаётся вручную.
// Проверка на фронтенде: когда появится оплата, доступ нужно хранить и проверять на сервере
const FULL_ACCESS = {
  khani: ['python', 'math-ml', 'algorithms'],
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
    duration: null,
    accent: '#BC8CFF',
    icon: 'Σ',
    audience: [
      'Тот, кто хочет в ML, но боится формул. Нужна только школьная математика.',
      'Желательно знать основы Python: задания выполняются в ноутбуках, поэтому курс удобно проходить после курса по Python.',
    ],
    outcome: 'Понимать, что происходит внутри моделей: как работают векторы и матрицы, как модель «учится» через градиентный спуск, зачем нужны вероятности и статистика.',
    format: [
      'Каждая тема сначала объясняется на ML-примере, и только потом идёт формула.',
      'Задачи выполняются в ноутбуках на numpy прямо на платформе.',
      'Все данные синтетические и небольшие — например, цены квартир, — чтобы курс не превращался в курс по работе с датасетами.',
    ],
    lesson: ['Видеоурок', 'Теория', 'Задачи в ноутбуке'],
    free: 'Видеоурок модуля 1, теория и 5 первых задач к нему',
    finalProject: false,
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
      'Желательно знать Python: решения разбираются на нём.',
    ],
    outcome: 'Узнавать типовые паттерны и решать стандартные задачи, которые спрашивают на собеседованиях.',
    format: [
      'Паттерны, а не заучивание задач: в каждом модуле учишься узнавать тип задачи и применять нужный приём.',
      'После каждой решённой задачи открывается текстовый разбор с эталонным решением и типичными ошибками.',
      'Видео объясняют паттерны, а разборы конкретных решений сделаны текстом и кодом.',
    ],
    lesson: ['Видео о паттерне', 'Теория', 'Задачи с разборами'],
    free: 'Видеоурок модуля 1, теория и 5 первых задач к нему',
    finalProject: false,
    modules: [],
  },
]

export function courseBySlug(slug) {
  return COURSES.find(c => c.slug === slug) || null
}

export const MANAGER_URL = 'https://t.me/kiro_team_manager'
