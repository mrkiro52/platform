import { DAY1_THEORY } from './day1Theory'
import { DAY1_HOMEWORK } from './day1Homework'
import { DAY2_THEORY } from './day2Theory'
import { DAY2_HOMEWORK } from './day2Homework'
import { DAY3_THEORY } from './day3Theory'
import { DAY3_HOMEWORK } from './day3Homework'
import { DAY4_THEORY } from './day4Theory'
import { DAY5_THEORY } from './day5Theory'

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
  // Домашнее задание к занятию 4 пока не выдано — карточка покажет «скоро»
  4: {
    theory: DAY4_THEORY,
    homework: null,
    recording: 'https://t.me/c/3964673023/22',
  },
  // Домашнее задание к занятию 5 пока не выдано — карточка покажет «скоро»
  5: {
    theory: DAY5_THEORY,
    homework: null,
    recording: 'https://t.me/c/3964673023/24',
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
