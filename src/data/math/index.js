import { DAY1_THEORY } from './day1Theory'
import { DAY1_HOMEWORK } from './day1Homework'
import { DAY2_THEORY } from './day2Theory'
import { DAY2_HOMEWORK } from './day2Homework'

// Материалы занятий: конспект, домашнее задание и запись.
// Для дня без материалов записи здесь просто нет — карточка покажет «скоро».
export const MATH_MATERIALS = {
  1: {
    theory: DAY1_THEORY,
    homework: DAY1_HOMEWORK,
    recording: 'https://t.me/c/3964673023/3',
  },
  // Запись второго занятия пока не загружена — карточка покажет «скоро»
  2: {
    theory: DAY2_THEORY,
    homework: DAY2_HOMEWORK,
  },
}

export function materialsOf(day) {
  return MATH_MATERIALS[day] || null
}

export function theoryOf(day) {
  return MATH_MATERIALS[day]?.theory || null
}

export function homeworkOf(day) {
  return MATH_MATERIALS[day]?.homework || null
}
