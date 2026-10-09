import { DAY1_THEORY } from './day1Theory'
import { DAY1_HOMEWORK } from './day1Homework'
import { DAY2_THEORY } from './day2Theory'
import { DAY2_HOMEWORK } from './day2Homework'
import { DAY3_THEORY } from './day3Theory'
import { DAY3_HOMEWORK } from './day3Homework'

// Материалы занятий: конспект, домашнее задание и запись.
// Для дня без материалов записи здесь просто нет — карточка покажет «скоро».
export const MATH_MATERIALS = {
  1: {
    theory: DAY1_THEORY,
    homework: DAY1_HOMEWORK,
    recording: 'https://t.me/c/3964673023/3',
  },
  2: {
    theory: DAY2_THEORY,
    homework: DAY2_HOMEWORK,
    recording: 'https://t.me/c/3964673023/13',
  },
  3: {
    theory: DAY3_THEORY,
    homework: DAY3_HOMEWORK,
    recording: 'https://t.me/c/3964673023/18',
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
