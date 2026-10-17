// Структура курса «Python: с нуля и до профи»: недели и уроки.
// Здесь только оглавление — содержимое уроков грузится лениво по неделям
// (week1.js, week2.js, week3.js). Названия уроков должны совпадать с title в файлах недель.
// free — урок открыт без покупки (видео, теория и задачи первого урока).

export const PYTHON_WEEKS = [
  {
    week: 1,
    title: 'Основы языка',
    lessons: [
      { id: 'w1d1', day: 1, title: 'Введение: установка, переменные, типы данных и операторы', free: true },
      { id: 'w1d2', day: 2, title: 'Ввод и вывод, f-строки, форматирование' },
      { id: 'w1d3', day: 3, title: 'Условные операторы, сравнения, логические операторы' },
      { id: 'w1d4', day: 4, title: 'Цикл while' },
      { id: 'w1d5', day: 5, title: 'break и continue' },
      { id: 'w1d6', day: 6, title: 'Цикл for и range()' },
      { id: 'w1d7', day: 7, title: 'Вложенные циклы' },
    ],
  },
  {
    week: 2,
    title: 'Структуры данных и функции',
    lessons: [
      { id: 'w2d1', day: 1, title: 'Строки: индексы, срезы и методы' },
      { id: 'w2d2', day: 2, title: 'Списки и кортежи' },
      { id: 'w2d3', day: 3, title: 'Словари и множества' },
      { id: 'w2d4', day: 4, title: 'Функции' },
      { id: 'w2d5', day: 5, title: 'list comprehension, map, filter, zip' },
      { id: 'w2d6', day: 6, title: 'Обработка ошибок' },
      { id: 'w2d7', day: 7, title: 'Шпаргалка недели 2 и комплексные задачи' },
    ],
  },
  {
    week: 3,
    title: 'Продвинутые темы и инструменты',
    lessons: [
      { id: 'w3d1', day: 1, title: 'Основы ООП: классы, объекты, методы' },
      { id: 'w3d2', day: 2, title: 'ООП: наследование, инкапсуляция, __str__, __repr__, @property' },
      { id: 'w3d3', day: 3, title: 'Генераторы, итераторы и декораторы' },
      { id: 'w3d4', day: 4, title: 'Файлы, JSON, контекстные менеджеры и datetime' },
      { id: 'w3d5', day: 5, title: 'Модули и пакеты, pip и venv, стандартная библиотека, аннотации типов' },
      { id: 'w3d6', day: 6, title: 'Асинхронность: async/await и asyncio' },
      { id: 'w3d7', day: 7, title: 'Шпаргалка недели 3 и комплексные задачи' },
    ],
  },
]

const WEEK_LOADERS = {
  1: () => import('./week1'),
  2: () => import('./week2'),
  3: () => import('./week3'),
}

export async function loadPythonLesson(id) {
  const meta = PYTHON_WEEKS.flatMap(w => w.lessons).find(l => l.id === id)
  if (!meta) return null
  const week = Number(id.slice(1, id.indexOf('d')))
  const lessons = (await WEEK_LOADERS[week]()).default
  return lessons.find(l => l.id === id) || null
}
