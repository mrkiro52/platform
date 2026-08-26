import { useState, useEffect } from 'react'
import { SCHEDULE, LIBRARY } from '../data'
import { api } from '../api'
import { SkeletonLibraryDay } from '../components/Skeleton'

// Треки июля: направление → синтетический id дня с контентом (теория/тесты/ДЗ)
const JULY_TRACKS = [
  { name: 'Frontend',          id: 101, lesson: 'Основы HTML',                        color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Backend',           id: 102, lesson: 'Python vs Go',                       color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Аналитика / ML',    id: 103, lesson: 'Основы Python',                      color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Кибербезопасность', id: 104, lesson: 'Основы информационной безопасности', color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY2 = [
  { name: 'Кибербезопасность', id: 105, lesson: 'Операционные системы',                          color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
  { name: 'Аналитика',         id: 106, lesson: 'Комбинаторика и основы теории вероятностей',     color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Machine Learning',  id: 107, lesson: 'Введение в машинное обучение',                    color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Backend',           id: 108, lesson: 'Архитектура веб-приложения',                      color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Frontend',          id: 110, lesson: 'Основы CSS',                                      color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
]

const JULY_TRACKS_DAY3 = [
  { name: 'Все треки', id: 109, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: true },
]

const JULY_TRACKS_DAY4 = [
  { name: 'Кибербезопасность', id: 111, lesson: 'Компьютерные сети: основы',        color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
  { name: 'Аналитика / ML',    id: 112, lesson: 'Библиотека NumPy',                 color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Backend',           id: 113, lesson: 'Базы данных: SQL и ORM',           color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Frontend',          id: 114, lesson: 'Препроцессоры LESS/SASS/SCSS',     color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
]

const JULY_TRACKS_DAY5 = [
  { name: 'Frontend',           id: 115, lesson: 'Продвинутый JavaScript',       color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Backend',            id: 116, lesson: 'REST API: создание на Python', color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Аналитика / ML',     id: 117, lesson: 'NumPy p.2 и Pandas',          color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Кибербезопасность',  id: 118, lesson: 'Ассемблер и кое-что до',      color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY6 = [
  { name: 'Frontend',           id: 119, lesson: 'JavaScript: Взаимодействие с DOM деревом', color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Backend',            id: 120, lesson: 'Аутентификация и авторизация',            color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Аналитика',          id: 121, lesson: 'Математическая статистика: основные понятия', color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Machine Learning',   id: 122, lesson: 'Линейная регрессия + практика',           color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Кибербезопасность',  id: 123, lesson: 'Основы WinAPI и C++',                     color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY7 = [
  { name: 'Все треки', id: 124, lesson: 'Вспоминаем структуры данных и алгоритмы', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY8 = [
  { name: 'Frontend',           id: 125, lesson: 'TypeScript',                        color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Backend',            id: 126, lesson: 'Валидация и обработка ошибок',      color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Аналитика',          id: 127, lesson: 'Продуктовые метрики',               color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Machine Learning',   id: 128, lesson: 'Градиентный спуск',                 color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Кибербезопасность',  id: 129, lesson: 'Криптография',                      color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY9 = [
  { name: 'Аналитика / ML',     id: 130, lesson: 'Визуализация данных: Matplotlib', color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' }, showHomework: false },
  { name: 'Backend / Frontend', id: 131, lesson: 'WebSocket и real-time',           color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' }, showHomework: false },
  { name: 'Кибербезопасность',  id: 132, lesson: 'OWASP Top 10',                     color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' }, showHomework: false },
]

const JULY_TRACKS_DAY10 = [
  { name: 'Все треки', id: 133, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY11 = [
  { name: 'Все треки', id: 134, lesson: 'Делаем пет-проект', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY12 = [
  { name: 'Все треки', id: 135, lesson: 'Делаем пет-проект', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY13 = [
  { name: 'Frontend / Backend', id: 136, lesson: 'ООП: основы',                             color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Аналитика',          id: 137, lesson: 'A/B-тестирование',                        color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Machine Learning',   id: 138, lesson: 'Метрики классификации и регрессии',       color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Кибербезопасность',  id: 139, lesson: 'Технологии видеонаблюдения',              color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY14 = [
  { name: 'Machine Learning',   id: 140, lesson: 'Обобщающая способность: отложенная выборка и кросс-валидация', color: { bg:'rgba(34,197,94,0.12)',  border:'rgba(34,197,94,0.3)',  text:'#4ade80' } },
  { name: 'Аналитика',          id: 145, lesson: 'Очистка данных',                                                color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Frontend',           id: 142, lesson: 'SSG и SSR: серверный рендеринг и Next.js',                      color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Backend',            id: 143, lesson: 'Микросервисы: основы',                                          color: { bg:'rgba(59,130,246,0.12)', border:'rgba(59,130,246,0.3)', text:'#60a5fa' } },
  { name: 'Кибербезопасность',  id: 144, lesson: 'Социальная инженерия и фишинг',                                color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY15 = [
  { name: 'Frontend / Backend', id: 146, lesson: 'Docker: основы',                                                color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Аналитика / ML',     id: 141, lesson: 'Линейная алгебра: векторы',                                     color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Кибербезопасность',  id: 147, lesson: 'Электронный документооборот и нормативная база',                color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY16 = [
  { name: 'Аналитика / ML',     id: 148, lesson: 'Качаем статистику: распределения',                              color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Frontend / Backend', id: 149, lesson: 'Все виды баз данных: сходства и отличия',                      color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' }, showHomework: false },
  { name: 'Кибербезопасность',  id: 150, lesson: 'Технические средства охраны',                                  color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' }, showHomework: false },
]

const JULY_TRACKS_DAY17 = [
  { name: 'Все треки', id: 151, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY18 = [
  { name: 'Аналитика / ML', id: 152, lesson: 'Алгоритм k-Nearest Neighbors (kNN)', color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Frontend / Backend', id: 153, lesson: 'Оптимизация фронтенда и бэкенда', color: { bg:'rgba(234,179,8,0.12)', border:'rgba(234,179,8,0.3)', text:'#facc15' } },
  { name: 'Кибербезопасность', id: 154, lesson: 'CTF: основные принципы', color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)', text:'#f87171' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY20 = [
  { name: 'Machine Learning', id: 155, lesson: 'Вопросы с собеседования: Python и основы', color: { bg:'rgba(34,197,94,0.12)', border:'rgba(34,197,94,0.3)', text:'#4ade80' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY21 = [
  { name: 'Аналитика', id: 156, lesson: 'Вопросы с собеседования', color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY22 = [
  { name: 'Frontend / Backend', id: 157, lesson: 'Вопросы с собеседования: Фуллстак разработка', color: { bg:'rgba(234,179,8,0.12)', border:'rgba(234,179,8,0.3)', text:'#facc15' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY23 = [
  { name: 'Кибербезопасность', id: 158, lesson: 'Вопросы с собеседования', color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)', text:'#f87171' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY24 = [
  { name: 'Все треки', id: 159, lesson: 'Insider Show 3', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY26 = [
  { name: 'Все треки', id: 160, lesson: 'Пет-проект и портфолио', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY27 = [
  { name: 'Все треки', id: 161, lesson: 'Пет-проект и портфолио', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY28 = [
  { name: 'Frontend / Backend', id: 162, lesson: 'Микросервисная архитектура и проектирование систем', color: { bg:'rgba(234,179,8,0.12)', border:'rgba(234,179,8,0.3)', text:'#facc15' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY29 = [
  { name: 'Аналитика / ML',    id: 163, lesson: 'Решающие деревья',                       color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Backend',           id: 164, lesson: 'FastAPI: основы',                        color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' } },
  { name: 'Кибербезопасность', id: 165, lesson: 'Основы сетевой безопасности',            color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' } },
]

const JULY_TRACKS_DAY30 = [
  { name: 'Аналитика / ML',     id: 166, lesson: 'Нейронные сети и LLM',                   color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' }, showQuestions: false, showHomework: false },
  { name: 'Frontend / Backend', id: 167, lesson: 'Методы оптимизации фронтенда и бэкенда', color: { bg:'rgba(234,179,8,0.12)',  border:'rgba(234,179,8,0.3)',  text:'#facc15' }, showQuestions: false, showHomework: false },
  { name: 'Кибербезопасность',  id: 168, lesson: 'Основы криптографии',                    color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)',  text:'#f87171' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY31 = [
  { name: 'Все треки', id: 169, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const JULY_DAYS = [
  { day: 1, date: 'ср, 1 июля', tracks: JULY_TRACKS },
  { day: 2, date: 'чт, 2 июля', tracks: JULY_TRACKS_DAY2 },
  { day: 3, date: 'пт, 3 июля', tracks: JULY_TRACKS_DAY3 },
  { day: 4, date: 'сб, 4 июля', tracks: JULY_TRACKS_DAY4 },
  { day: 5, date: 'вс, 5 июля', tracks: JULY_TRACKS_DAY5 },
  { day: 6, date: 'пн, 6 июля', tracks: JULY_TRACKS_DAY6 },
  { day: 7, date: 'вт, 7 июля', tracks: JULY_TRACKS_DAY7 },
  { day: 8, date: 'ср, 8 июля', tracks: JULY_TRACKS_DAY8 },
  { day: 9, date: 'чт, 9 июля', tracks: JULY_TRACKS_DAY9 },
  { day: 10, date: 'пт, 10 июля', tracks: JULY_TRACKS_DAY10 },
  { day: 11, date: 'сб, 11 июля', tracks: JULY_TRACKS_DAY11 },
  { day: 12, date: 'вс, 12 июля', tracks: JULY_TRACKS_DAY12 },
  { day: 13, date: 'пн, 13 июля', tracks: JULY_TRACKS_DAY13 },
  { day: 14, date: 'вт, 14 июля', tracks: JULY_TRACKS_DAY14 },
  { day: 15, date: 'ср, 15 июля', tracks: JULY_TRACKS_DAY15 },
  { day: 16, date: 'чт, 16 июля', tracks: JULY_TRACKS_DAY16 },
  { day: 17, date: 'пт, 17 июля', tracks: JULY_TRACKS_DAY17 },
  { day: 18, date: 'сб, 18 июля', tracks: JULY_TRACKS_DAY18 },
  { day: 20, date: 'пн, 20 июля', tracks: JULY_TRACKS_DAY20 },
  { day: 21, date: 'вт, 21 июля', tracks: JULY_TRACKS_DAY21 },
  { day: 22, date: 'ср, 22 июля', tracks: JULY_TRACKS_DAY22 },
  { day: 23, date: 'чт, 23 июля', tracks: JULY_TRACKS_DAY23 },
  { day: 24, date: 'пт, 24 июля', tracks: JULY_TRACKS_DAY24 },
  { day: 26, date: 'вс, 26 июля', tracks: JULY_TRACKS_DAY26 },
  { day: 27, date: 'пн, 27 июля', tracks: JULY_TRACKS_DAY27 },
  { day: 28, date: 'вт, 28 июля', tracks: JULY_TRACKS_DAY28 },
  { day: 29, date: 'ср, 29 июля', tracks: JULY_TRACKS_DAY29 },
  { day: 30, date: 'чт, 30 июля', tracks: JULY_TRACKS_DAY30 },
  { day: 31, date: 'пт, 31 июля', tracks: JULY_TRACKS_DAY31 },
]

// Карьера. Занятия идут для всех треков сразу, поэтому name у трека пустой.
const AUGUST_TRACKS_DAY1 = [
  { name: '', id: 170, lesson: 'Резюме: шаблон, ред- и грин-флаги', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const AUGUST_TRACKS_DAY11 = [
  { name: '', id: 171, lesson: 'Самопрезентация на собеседовании', color: { bg:'rgba(255,214,10,0.12)', border:'rgba(255,214,10,0.3)', text:'#FFD60A' }, showQuestions: false, showHomework: false },
]

const AUGUST_DAYS = [
  { day: 1, date: 'сб, 1 августа', tracks: AUGUST_TRACKS_DAY1 },
  { day: 11, date: 'вт, 11 августа', tracks: AUGUST_TRACKS_DAY11 },
]

const WD_SHORT = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ']
const MON_CAPS = ['ЯНВАРЯ','ФЕВРАЛЯ','МАРТА','АПРЕЛЯ','МАЯ','ИЮНЯ','ИЮЛЯ','АВГУСТА','СЕНТЯБРЯ','ОКТЯБРЯ','НОЯБРЯ','ДЕКАБРЯ']

function dayDateLabel(dayNum) {
  const d = new Date(2026, 5, dayNum)
  return `${WD_SHORT[d.getDay()]}, ${dayNum} ${MON_CAPS[d.getMonth()]}`
}

function buildJuneDays(scheduleData, libraryData) {
  // Library API provides titles (admin-editable) + materials. Фильтруем по
  // месяцу — иначе day_number=1 из августа перезаписывает day_number=1 июня.
  const libByDay = {}
  libraryData.filter(wk => wk.month === 'june').forEach(wk => {
    wk.days.forEach(d => {
      const n = d.num ?? d.id
      libByDay[n] = { title: d.title, mats: d.mats || [], id: d.id }
    })
  })
  // Локальный резервный список (SCHEDULE) подстраховывает заголовки, если их ещё
  // нет в library API — саму страницу "Расписание" эти данные больше не питают.
  const schedByDay = {}
  scheduleData.filter(e => e.day >= 1 && e.day <= 30).forEach(e => {
    schedByDay[e.day] = e.title
  })
  return Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1
    const lib = libByDay[dayNum]
    return {
      id: lib?.id ?? dayNum,
      day: dayNum,
      title: lib?.title || schedByDay[dayNum] || `День ${dayNum}`,
      mats: lib?.mats || [],
    }
  })
}

// Категории материалов библиотеки — вместо деления по месяцам лагеря.
const CATEGORIES = [
  { key: 'foundations', label: 'Основы и алгоритмы' },
  { key: 'frontend',    label: 'Frontend' },
  { key: 'backend',     label: 'Backend' },
  { key: 'ml',          label: 'Аналитика и Machine Learning' },
  { key: 'security',    label: 'Кибербезопасность' },
  { key: 'practice',    label: 'Практика и проекты' },
  { key: 'career',      label: 'Карьера' },
]

// Трек-лейбл лекции → одна или несколько категорий библиотеки. Кросс-трековые
// занятия (LeetCode-грайнд, пет-проект, Insider Show) уходят в "Практика".
function categoriesForTrackName(name) {
  if (!name || name === 'Все треки') return ['practice']
  const cats = []
  if (name.includes('Frontend')) cats.push('frontend')
  if (name.includes('Backend')) cats.push('backend')
  if (name.includes('Аналитика') || name.includes('ML') || name.includes('Machine Learning')) cats.push('ml')
  if (name.includes('Кибербезопасность')) cats.push('security')
  return cats.length ? cats : ['practice']
}

function buildCategoryItems(juneDays) {
  const items = []

  juneDays.forEach(d => {
    if (d.day === 1) return // "Вводное занятие: старт лагеря" — больше не показываем в библиотеке
    // Навигация /library/theory/:day ждёт номер дня (1-30), а не id строки в БД.
    items.push({ id: d.day, date: dayDateLabel(d.day), title: d.title, categories: ['foundations'] })
  })

  JULY_DAYS.forEach(day => {
    day.tracks.forEach(track => {
      items.push({ id: track.id, date: day.date, title: track.lesson, categories: categoriesForTrackName(track.name) })
    })
  })

  AUGUST_DAYS.forEach(day => {
    day.tracks.forEach(track => {
      items.push({ id: track.id, date: day.date, title: track.lesson, categories: ['career'] })
    })
  })

  const byCategory = {}
  CATEGORIES.forEach(c => { byCategory[c.key] = [] })
  items.forEach(item => {
    item.categories.forEach(cat => {
      if (byCategory[cat]) byCategory[cat].push(item)
    })
  })
  return byCategory
}

function LessonRow({ item, onOpenTheory }) {
  return (
    <div
      className="sched-day sched-day--open"
      style={{ cursor: 'pointer', marginBottom: 8 }}
      onClick={() => onOpenTheory({ day: item.id })}
    >
      <div className="sched-day-header" style={{ flexWrap: 'wrap', rowGap: 10 }}>
        <div className="sched-day-title">{item.title}</div>
      </div>
    </div>
  )
}

export default function Library({ onOpenTheory }) {
  const [activeCategory, setActiveCategory] = useState('foundations')
  const [library, setLibrary]                = useState(LIBRARY)
  const [loading, setLoading]                = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500

    api.library().then(setLibrary).catch(() => {}).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  const juneDays = buildJuneDays(SCHEDULE, library)
  const categoryItems = buildCategoryItems(juneDays)
  const activeItems = categoryItems[activeCategory] || []

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
        <p className="page-subtitle">Материалы платформы по категориям — открывай тему и изучай в своём темпе</p>
      </div>

      <div className="library-tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`lib-tab${activeCategory === cat.key ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="sched-week">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <SkeletonLibraryDay key={i} />
          ))}
        </div>
      ) : (
        <div className="sched-week">
          {activeItems.length === 0 ? (
            <p style={{ color: 'var(--text-tertiary)', padding: '20px 0' }}>Материалы этой категории скоро появятся</p>
          ) : (
            activeItems.map((item, i) => (
              <div key={item.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                <LessonRow item={item} onOpenTheory={onOpenTheory} />
              </div>
            ))
          )}
        </div>
      )}
    </section>
  )
}
