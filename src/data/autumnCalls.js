// Групповые созвоны осеннего лагеря 2026.
// Данные лежат здесь, а не в странице лагеря, потому что их читает ещё и
// календарь на дэшборде — держим единственный источник правды.

// Дни месяцев зафиксированы под 2026 год
export const AUTUMN_MONTHS = [
  { label: 'Сентябрь', total: 30, start: new Date(2026, 8, 1) },
  { label: 'Октябрь',  total: 31, start: new Date(2026, 9, 1) },
  { label: 'Ноябрь',   total: 30, start: new Date(2026, 10, 1) },
]

// videos — записи созвона. Их может быть несколько, если созвон разбит на части.
// Элемент — либо ссылка строкой (тогда подпись проставляется автоматически),
// либо { url, label } с собственной подписью.
const SEPTEMBER_CALLS = [
  { day: 5, topic: 'Python: изучаем основы (для новичков)' },
  { day: 6, topic: 'Python: вопросы с собеседований (для опытных)', videos: ['https://youtu.be/Ul4Q3xftxjE'] },
  {
    day: 12,
    topic: 'Полный гайд по алгоритмам',
    videos: [
      'https://youtu.be/wd4dYSLWyLo',
      'https://youtu.be/RqGcY_PVPiE',
      { url: 'https://youtu.be/_zH3bEamBuQ', label: 'Запись — Созвон 2' },
    ],
  },
  { day: 19, topic: 'Полный гайд по структурам данных', videos: ['https://youtu.be/Ed_Q444YrNk'] },
  { day: 26, topic: 'Полный гайд по базам данных и SQL', videos: ['https://youtu.be/aivBh533CBQ'] },
]

// Октябрь и ноябрь — по субботам. Тема у созвона пока одна: на остальные
// даты она ещё не объявлена (topic: null), карточка покажет дату без темы.
const OCTOBER_CALLS = [
  { day: 3, topic: 'Системный дизайн для всех' },
  { day: 10, topic: 'Кибербезопасность: основы для всех' },
  { day: 17, topic: null },
  { day: 24, topic: null },
  { day: 31, topic: null },
]
const NOVEMBER_CALLS = [7, 14, 21, 28].map(day => ({ day, topic: null }))

const CALLS_BY_MONTH = {
  'Сентябрь': SEPTEMBER_CALLS,
  'Октябрь': OCTOBER_CALLS,
  'Ноябрь': NOVEMBER_CALLS,
}

export const CALL_MONTHS = AUTUMN_MONTHS.map(m => ({
  label: m.label,
  monthIndex: m.start.getMonth(),
  calls: CALLS_BY_MONTH[m.label],
}))

// Есть ли групповой созвон в этот день. Возвращает { topic } или null.
export function groupCallOn(date) {
  if (date.getFullYear() !== 2026) return null
  const month = CALL_MONTHS.find(m => m.monthIndex === date.getMonth())
  if (!month) return null
  return month.calls.find(c => c.day === date.getDate()) || null
}
