// Групповые созвоны осеннего лагеря 2026.
// Данные лежат здесь, а не в странице лагеря, потому что их читает ещё и
// календарь на дэшборде — держим единственный источник правды.

// Дни месяцев зафиксированы под 2026 год
export const AUTUMN_MONTHS = [
  { label: 'Сентябрь', total: 30, start: new Date(2026, 8, 1) },
  { label: 'Октябрь',  total: 31, start: new Date(2026, 9, 1) },
  { label: 'Ноябрь',   total: 30, start: new Date(2026, 10, 1) },
]

// По умолчанию созвон — каждая пятница месяца. Дни считаются по дню недели,
// чтобы не разъехаться при правках дат выше. Для сентября даты и темы заданы
// явно — они сдвинуты на день позже пятницы.
function fridaysOf(month) {
  const days = []
  for (let d = 1; d <= month.total; d++) {
    const dt = new Date(month.start)
    dt.setDate(d)
    if (dt.getDay() === 5) days.push(d)
  }
  return days
}

const SEPTEMBER_CALLS = [
  { day: 5, topic: 'Python: изучаем основы (для новичков)' },
  { day: 6, topic: 'Python: вопросы с собеседований (для опытных)', video: 'https://youtu.be/Ul4Q3xftxjE' },
  { day: 12, topic: 'Полный гайд по алгоритмам' },
  { day: 19, topic: 'Полный гайд по структурам данных' },
  { day: 26, topic: 'Полный гайд по базам данных и SQL' },
]

export const CALL_MONTHS = AUTUMN_MONTHS.map(m => ({
  label: m.label,
  monthIndex: m.start.getMonth(),
  calls: m.label === 'Сентябрь'
    ? SEPTEMBER_CALLS
    : fridaysOf(m).map(day => ({ day, topic: null })),
}))

// Есть ли групповой созвон в этот день. Возвращает { topic } или null.
export function groupCallOn(date) {
  if (date.getFullYear() !== 2026) return null
  const month = CALL_MONTHS.find(m => m.monthIndex === date.getMonth())
  if (!month) return null
  return month.calls.find(c => c.day === date.getDate()) || null
}
