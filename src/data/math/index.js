import { DAY1_THEORY } from './day1Theory'
import { DAY1_HOMEWORK } from './day1Homework'
import { DAY2_THEORY } from './day2Theory'
import { DAY2_HOMEWORK } from './day2Homework'
import { DAY3_THEORY } from './day3Theory'
import { DAY3_HOMEWORK } from './day3Homework'
import { DAY4_THEORY } from './day4Theory'
import { DAY4_HOMEWORK } from './day4Homework'
import { DAY5_THEORY } from './day5Theory'
import { DAY5_HOMEWORK } from './day5Homework'
import { DAY6_THEORY } from './day6Theory'
import { DAY6_HOMEWORK } from './day6Homework'

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
  4: {
    theory: DAY4_THEORY,
    homework: DAY4_HOMEWORK,
    recording: 'https://t.me/c/3964673023/22',
  },
  5: {
    theory: DAY5_THEORY,
    homework: DAY5_HOMEWORK,
    recording: 'https://t.me/c/3964673023/24',
  },
  6: {
    theory: DAY6_THEORY,
    homework: DAY6_HOMEWORK,
    recording: 'https://t.me/c/3964673023/26',
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
