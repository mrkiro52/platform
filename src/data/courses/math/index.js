// Структура курса «Математика: вся для Junior ML»: 3 недели по 7 дней.
// Здесь только оглавление — содержимое уроков грузится лениво по неделям
// (week1.js, week2.js, week3.js). Названия должны совпадать с title в файлах недель.
// Задачи — с вводом ответа (src/lib/answers.js), id задач — <id урока>t<номер>.
// tasks — число задач в уроке, если их не 5 (итоговый экзамен).
// video — ссылка на видеолекцию недели (одна на неделю, embed-URL для iframe); пусто — «появится скоро».

export const MATH_WEEKS = [
  {
    week: 1,
    title: 'Линейная алгебра и начала анализа',
    video: '',
    lessons: [
      { id: 'd1', day: 1, title: 'Векторы', free: true },
      { id: 'd2', day: 2, title: 'Ортогональность и проекция', free: true },
      { id: 'd3', day: 3, title: 'Матрицы: основы' },
      { id: 'd4', day: 4, title: 'Обратная матрица и определитель' },
      { id: 'd5', day: 5, title: 'Производная и правила дифференцирования' },
      { id: 'd6', day: 6, title: 'Частные производные и градиент' },
      { id: 'd7', day: 7, title: 'Повторение и практикум недели 1' },
    ],
  },
  {
    week: 2,
    title: 'Градиентный спуск и теория вероятностей',
    video: '',
    lessons: [
      { id: 'd8', day: 8, title: 'Градиентный спуск' },
      { id: 'd9', day: 9, title: 'Случайные величины' },
      { id: 'd10', day: 10, title: 'Числовые характеристики' },
      { id: 'd11', day: 11, title: 'Основные распределения' },
      { id: 'd12', day: 12, title: 'Условная вероятность и формула Байеса' },
      { id: 'd13', day: 13, title: 'Независимость' },
      { id: 'd14', day: 14, title: 'Повторение и практикум недели 2' },
    ],
  },
  {
    week: 3,
    title: 'Статистика, дискретная математика, итог',
    video: '',
    lessons: [
      { id: 'd15', day: 15, title: 'Выборочные статистики' },
      { id: 'd16', day: 16, title: 'Доверительные интервалы' },
      { id: 'd17', day: 17, title: 'Комбинаторика' },
      { id: 'd18', day: 18, title: 'Логика, множества, отношения' },
      { id: 'd19', day: 19, title: 'Основы теории графов' },
      { id: 'd20', day: 20, title: 'Интегративный практикум' },
      { id: 'd21', day: 21, title: 'Итоговый экзамен', tasks: 10 },
    ],
  },
]

const WEEK_LOADERS = {
  1: () => import('./week1'),
  2: () => import('./week2'),
  3: () => import('./week3'),
}

export async function loadMathLesson(id) {
  const week = MATH_WEEKS.find(w => w.lessons.some(l => l.id === id))
  if (!week) return null
  const lessons = (await WEEK_LOADERS[week.week]()).default
  return lessons.find(l => l.id === id) || null
}
