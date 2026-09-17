// Мини-курс по математике осеннего лагеря 2026.
// Восемь созвонов по четвергам в 20:00 МСК.

export const MATH_COURSE_TITLE = 'Мини-курс: математика'

export const MATH_SESSIONS = [
  { date: '2026-09-24', topic: 'Арифметика, проценты и алгебраические уравнения' },
  { date: '2026-10-01', topic: 'Дискретная математика: математическая логика' },
  { date: '2026-10-08', topic: 'Функции, графики и производные' },
  { date: '2026-10-15', topic: 'Линейная алгебра: векторы и матрицы' },
  { date: '2026-10-22', topic: 'Основы теории вероятностей' },
  { date: '2026-10-29', topic: 'Описательная статистика и доверительные интервалы' },
  { date: '2026-11-05', topic: 'Проверка гипотез' },
  { date: '2026-11-12', topic: 'Повторение пройденного материала' },
]

export const MATH_TIME = '20:00 МСК'

// Ближайший созвон — первый, который ещё не прошёл. Если курс закончился,
// возвращаем null: подсвечивать в кружках больше нечего.
export function nextMathSession() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return MATH_SESSIONS.find(s => new Date(s.date + 'T00:00:00') >= today) || null
}

export function dayOf(iso) {
  return new Date(iso + 'T00:00:00').getDate()
}

export const MATH_TEACHER = {
  name: 'Ватутин Александр Дмитриевич',
  year: 1997,
  role: 'Преподаватель математики осеннего онлайн IT-лагеря KIRO Autumn Camp 2026',
  bio: [
    'Аспирант ИТМО, пишет диссертацию в области квантовой физики и передачи информации по оптоволоконным каналам. Занимается методами, которые защищают данные от взлома даже квантовыми суперкомпьютерами — на уровне фундаментальных законов физики. Убеждён, что будущее информационной безопасности за квантовыми коммуникациями, способными гарантированно фиксировать любую попытку компрометации данных.',
    'Уже больше 5 лет преподаёт высшую математику в ИТМО — одном из ведущих технических вузов страны. Ведёт математический анализ, линейную алгебру, теорию вероятностей и математическую статистику, причём как лектор и как практик одновременно.',
  ],
  papers: [
    'Vatutin A., Moskalenko M., Skryabin M., Svintsov M., Trifanov A.I. Computational psychometric approach for assessing mathematical problem-solving skills // Procedia Computer Science — 2021, Vol. 193, pp. 250–255.',
    'Vatutin A.D., Miroshnichenko G.P., Trifanov A.I. Master equation for correlators of normal-ordered field mode operators // Nanosystems: Physics, Chemistry, Mathematics — 2022, Vol. 13, No. 6, pp. 628–631.',
    'Vatutin A.D., Miroshnichenko G.P., Trifanov A.I. Hidden polarization in open quantum systems // Nanosystems: Physics, Chemistry, Mathematics — 2023, Vol. 14, No. 6, pp. 626–632.',
  ],
}
