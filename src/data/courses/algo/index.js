// Структура курса «Алгоритмы: leetcode и алгособесы»: 3 недели по 7 дней.
// Здесь только оглавление — содержимое уроков грузится лениво по неделям
// (week1.js, week2.js, week3.js). Названия должны совпадать с title в файлах недель.
// Задачи — код на Python с автопроверкой (src/lib/python/checker.js), после решения
// открывается разбор. tasks — число задач в уроке, если их не 5.
// video — ссылка на видеолекцию недели (одна на неделю, embed-URL для iframe); пусто — «появится скоро».

export const ALGO_WEEKS = [
  {
    week: 1,
    title: 'Фундамент и линейные структуры',
    video: '',
    lessons: [
      { id: 'a1', day: 1, title: 'Массивы и строки, два указателя', free: true },
      { id: 'a2', day: 2, title: 'Два указателя (продолжение) и префиксные суммы', free: true },
      { id: 'a3', day: 3, title: 'Скользящее окно', tasks: 4 },
      { id: 'a4', day: 4, title: 'Хеш-таблицы' },
      { id: 'a5', day: 5, title: 'Стек и монотонный стек', tasks: 4 },
      { id: 'a6', day: 6, title: 'Очередь и задачи на проектирование', tasks: 4 },
      { id: 'a7', day: 7, title: 'Повторение и мини-контест недели 1' },
    ],
  },
  {
    week: 2,
    title: 'Связные списки, поиск, сортировки, деревья',
    video: '',
    lessons: [
      { id: 'a8', day: 8, title: 'Односвязный список' },
      { id: 'a9', day: 9, title: 'Связные списки: быстрый и медленный указатели', tasks: 4 },
      { id: 'a10', day: 10, title: 'Двусвязный список и LRU-кеш', tasks: 2 },
      { id: 'a11', day: 11, title: 'Двоичный поиск' },
      { id: 'a12', day: 12, title: 'Двоичный поиск по ответу и сортировки', tasks: 4 },
      { id: 'a13', day: 13, title: 'Деревья: обходы в глубину и в ширину' },
      { id: 'a14', day: 14, title: 'Повторение и мини-контест недели 2', tasks: 4 },
    ],
  },
  {
    week: 3,
    title: 'Графы, деревья, greedy, heap, backtracking',
    video: '',
    lessons: [
      { id: 'a15', day: 15, title: 'DFS: графы и деревья' },
      { id: 'a16', day: 16, title: 'BFS: графы и деревья' },
      { id: 'a17', day: 17, title: 'Двоичные деревья поиска и рекурсия' },
      { id: 'a18', day: 18, title: 'Жадные алгоритмы' },
      { id: 'a19', day: 19, title: 'Куча и очередь с приоритетом' },
      { id: 'a20', day: 20, title: 'Рекурсия, перебор с возвратом и битовые операции' },
      { id: 'a21', day: 21, title: 'Финальный контест и ретроспектива', tasks: 4 },
    ],
  },
]

const WEEK_LOADERS = {
  1: () => import('./week1'),
  2: () => import('./week2'),
  3: () => import('./week3'),
}

export async function loadAlgoLesson(id) {
  const week = ALGO_WEEKS.find(w => w.lessons.some(l => l.id === id))
  if (!week) return null
  const lessons = (await WEEK_LOADERS[week.week]()).default
  return lessons.find(l => l.id === id) || null
}
