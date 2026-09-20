// Неделя 4: четыре темы, у каждой свои материалы и своё домашнее задание.

import { DB_CHAPTERS } from './databases'
import { SQL_CHAPTERS } from './sql'
import { DOCKER_CHAPTERS } from './docker'
import { GIT_CHAPTERS } from './git'
import { DB_QUIZ, DOCKER_QUIZ, GIT_QUIZ } from './quizzes'
import { SQL_DATASET, SQL_TASKS } from './sqlTasks'

export const WEEK4_TITLE = 'Базы данных, SQL, Docker и Git'

export const WEEK4_TOPICS = [
  {
    id: 'databases',
    title: 'Базы данных',
    subtitle: 'Что это, какие бывают и как с ними работать',
    icon: '🗄',
    audience: 'Бэкенд, ML, аналитики данных и системные аналитики, кибербезопасность',
    audienceNote: 'Обязательно',
    chapters: DB_CHAPTERS,
    homework: { kind: 'quiz', quiz: DB_QUIZ },
  },
  {
    id: 'sql',
    title: 'SQL',
    subtitle: 'От SELECT до оконных функций — уровень уверенного джуна',
    icon: '📊',
    audience: 'Аналитики любого профиля, бэкенд, ML, кибербезопасность',
    audienceNote: 'Обязательно',
    chapters: SQL_CHAPTERS,
    homework: { kind: 'sql', dataset: SQL_DATASET, tasks: SQL_TASKS },
  },
  {
    id: 'docker',
    title: 'Docker',
    subtitle: 'Образы, контейнеры, Dockerfile и compose — только нужные основы',
    icon: '🐳',
    audience: 'Всем, но после того как освоены основы своего направления',
    audienceNote: 'Когда есть опыт',
    chapters: DOCKER_CHAPTERS,
    homework: { kind: 'quiz', quiz: DOCKER_QUIZ },
  },
  {
    id: 'git',
    title: 'Git',
    subtitle: 'Репозитории, ветки, pull request — повседневный минимум',
    icon: '🌿',
    audience: 'Всем без исключения, с первого дня в профессии',
    audienceNote: 'Всем',
    chapters: GIT_CHAPTERS,
    homework: { kind: 'quiz', quiz: GIT_QUIZ },
  },
]

export function topicById(id) {
  return WEEK4_TOPICS.find(t => t.id === id) || null
}

// Плоский список всех глав недели — нужен каталогу домашних заданий
export const WEEK4_CHAPTERS = WEEK4_TOPICS.flatMap(t => t.chapters)

export { SQL_DATASET, SQL_TASKS }
