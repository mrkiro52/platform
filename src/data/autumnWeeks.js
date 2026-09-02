// Недели осеннего лагеря 2026. Границы заданы явно (не равными интервалами) —
// они должны совпадать с реальным расписанием, а не просто делить месяц на 5.
const MONTHS = [
  { label: 'Сентябрь', genitive: 'сентября', monthIdx: 8, weeks: [
    { start: 1, end: 6 }, { start: 7, end: 13 }, { start: 14, end: 20 }, { start: 21, end: 27 }, { start: 28, end: 30 },
  ] },
  { label: 'Октябрь', genitive: 'октября', monthIdx: 9, weeks: [
    { start: 1, end: 4 }, { start: 5, end: 11 }, { start: 12, end: 18 }, { start: 19, end: 25 }, { start: 26, end: 31 },
  ] },
  { label: 'Ноябрь', genitive: 'ноября', monthIdx: 10, weeks: [
    { start: 1, end: 1 }, { start: 2, end: 8 }, { start: 9, end: 15 }, { start: 16, end: 22 }, { start: 23, end: 29 },
  ] },
]

function rangeText(week, genitive) {
  return week.start === week.end
    ? `${week.start} ${genitive}`
    : `${week.start}–${week.end} ${genitive}`
}

// Плоский список всех недель с глобальной нумерацией: week1 … week15.
// Номер внутри месяца (indexInMonth) остаётся 1..5 — он идёт в заголовки.
let counter = 0
export const AUTUMN_WEEKS = MONTHS.flatMap(month =>
  month.weeks.map((week, i) => {
    counter += 1
    return {
      slug: `week${counter}`,
      number: counter,
      indexInMonth: i + 1,
      monthLabel: month.label,
      monthIdx: month.monthIdx,
      start: week.start,
      end: week.end,
      rangeText: rangeText(week, month.genitive),
    }
  })
)

export const AUTUMN_WEEK_MONTHS = MONTHS.map(month => ({
  label: month.label,
  weeks: AUTUMN_WEEKS.filter(w => w.monthIdx === month.monthIdx),
}))

export function findAutumnWeek(slug) {
  return AUTUMN_WEEKS.find(w => w.slug === slug) || null
}

// Неделя, в которую попадает сегодняшний день (или null вне лагеря)
export function currentAutumnWeek() {
  const today = new Date()
  if (today.getFullYear() !== 2026) return null
  const day = today.getDate()
  return AUTUMN_WEEKS.find(w =>
    w.monthIdx === today.getMonth() && day >= w.start && day <= w.end
  ) || null
}
