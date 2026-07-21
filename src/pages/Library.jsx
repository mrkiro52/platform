import { useState, useEffect } from 'react'
import { SCHEDULE, LIBRARY } from '../data'
import { api } from '../api'
import { SkeletonLibraryDay } from '../components/Skeleton'

const TABS = [
  { value:'june',   label:'Июнь — Фундамент',    locked: false },
  { value:'july',   label:'Июль — Специализация', locked: false },
  { value:'august', label:'Август — Карьера',      locked: true  },
]

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
  { name: 'Все треки', id: 109, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: true },
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
  { name: 'Все треки', id: 124, lesson: 'Вспоминаем структуры данных и алгоритмы', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: false },
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
  { name: 'Все треки', id: 133, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY11 = [
  { name: 'Все треки', id: 134, lesson: 'Делаем пет-проект', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY12 = [
  { name: 'Все треки', id: 135, lesson: 'Делаем пет-проект', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: false },
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
  { name: 'Все треки', id: 151, lesson: 'Нарешиваем LeetCode', color: { bg:'rgba(200,255,0,0.12)', border:'rgba(200,255,0,0.3)', text:'#c8ff00' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY18 = [
  { name: 'Аналитика / ML', id: 152, lesson: 'Алгоритм k-Nearest Neighbors (kNN)', color: { bg:'rgba(99,102,241,0.12)', border:'rgba(99,102,241,0.3)', text:'#818cf8' } },
  { name: 'Frontend / Backend', id: 153, lesson: 'Оптимизация фронтенда и бэкенда', color: { bg:'rgba(234,179,8,0.12)', border:'rgba(234,179,8,0.3)', text:'#facc15' } },
  { name: 'Кибербезопасность', id: 154, lesson: 'CTF: основные принципы', color: { bg:'rgba(239,68,68,0.12)', border:'rgba(239,68,68,0.3)', text:'#f87171' }, showQuestions: false, showHomework: false },
]

const JULY_TRACKS_DAY20 = [
  { name: 'Machine Learning', id: 155, lesson: 'Вопросы с собеседования: Python и основы', color: { bg:'rgba(34,197,94,0.12)', border:'rgba(34,197,94,0.3)', text:'#4ade80' }, showQuestions: false, showHomework: false },
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
]

function JulyTrackRow({ track, onOpenTheory, onOpenQuestions, onOpenHomework }) {
  const c = track.color
  const target = { day: track.id }
  const showQuestions = track.showQuestions !== false
  const showHomework = track.showHomework !== false
  const btn = {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
    borderRadius: 8, padding: '6px 12px', fontSize: 12.5, fontWeight: 600,
    color: 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'border-color 0.15s, color 0.15s',
  }
  const hover = (e, on) => {
    e.currentTarget.style.borderColor = on ? 'rgba(200,255,0,0.4)' : 'var(--border-color)'
    e.currentTarget.style.color = on ? 'var(--accent-lime)' : 'var(--text-secondary)'
  }
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
      padding: '14px 16px', borderTop: '1px solid var(--border-color)',
    }}>
      <div style={{ minWidth: 190, flex: '1 1 190px' }}>
        <span style={{
          display: 'inline-block', background: c.bg, border: `1px solid ${c.border}`,
          color: c.text, borderRadius: 999, padding: '3px 12px', fontSize: 12, fontWeight: 700,
          marginBottom: 4,
        }}>{track.name}</span>
        <div style={{ color: 'var(--text-primary)', fontSize: 13.5, fontWeight: 500 }}>{track.lesson}</div>
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button style={btn} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} onClick={() => onOpenTheory(target)}>📚 Теория</button>
        {showQuestions && (
          <button style={btn} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} onClick={() => onOpenQuestions(target)}>✅ Онлайн тесты</button>
        )}
        {showHomework && (
          <button style={btn} onMouseEnter={e => hover(e, true)} onMouseLeave={e => hover(e, false)} onClick={() => onOpenHomework(target)}>📝 Домашние задания</button>
        )}
      </div>
    </div>
  )
}

// Число сегодняшнего дня, если сейчас июль 2026, иначе null
function getTodayJulyDay() {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 6) return null
  return today.getDate()
}

function JulyDayCard({ day, open, onToggle, onOpenTheory, onOpenQuestions, onOpenHomework }) {
  return (
    <div className={`sched-day${open ? ' sched-day--open' : ''}`} style={{ marginBottom: 8 }}>
      <div className="sched-day-header" onClick={onToggle} style={{ cursor: 'pointer' }}>
        <div className="sched-day-stripe" style={{ background: '#a07aff' }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">День {day.day}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{day.date}</span>
        </div>
        <div className="sched-day-title" style={{ flex: 1 }}>Специализация по трекам</div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginRight: 8 }}>
          {day.tracks.map(t => (
            <span key={t.id} style={{
              background: t.color.bg, border: `1px solid ${t.color.border}`, color: t.color.text,
              borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700,
            }}>{t.name}</span>
          ))}
        </div>
        <span className="sched-chevron">{open ? '▴' : '▾'}</span>
      </div>
      {open && (
        <div style={{ padding: '0 0 6px' }}>
          {day.tracks.map(track => (
            <JulyTrackRow
              key={track.id}
              track={track}
              onOpenTheory={onOpenTheory}
              onOpenQuestions={onOpenQuestions}
              onOpenHomework={onOpenHomework}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const WEEKS = [
  { label:'Неделя 1 · 1–7 июня',   start:1,  end:7  },
  { label:'Неделя 2 · 8–14 июня',  start:8,  end:14 },
  { label:'Неделя 3 · 15–21 июня', start:15, end:21 },
  { label:'Неделя 4 · 22–28 июня', start:22, end:28 },
  { label:'Неделя 5 · 29–30 июня', start:29, end:99 },
]

const WD_SHORT = ['ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ']
const MON_CAPS = ['ЯНВАРЯ','ФЕВРАЛЯ','МАРТА','АПРЕЛЯ','МАЯ','ИЮНЯ','ИЮЛЯ','АВГУСТА','СЕНТЯБРЯ','ОКТЯБРЯ','НОЯБРЯ','ДЕКАБРЯ']

function dayDateLabel(dayNum) {
  const d = new Date(2026, 5, dayNum)
  return `${WD_SHORT[d.getDay()]}, ${dayNum} ${MON_CAPS[d.getMonth()]}`
}

function isAvailable(dayNum) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDate = new Date(2026, 5, dayNum)
  return dayDate <= today
}

function shouldShowButtons(dayNum) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dayDate = new Date(2026, 5, dayNum)
  return dayNum >= 2 && dayDate <= today
}

function buildJuneDays(scheduleData, libraryData) {
  // Library API provides titles (admin-editable) + materials
  const libByDay = {}
  libraryData.forEach(wk => {
    wk.days.forEach(d => {
      const n = d.num ?? d.id
      libByDay[n] = { title: d.title, mats: d.mats || [], id: d.id }
    })
  })
  // Schedule provides fallback titles and guarantees all 30 days are present
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

const libBtnStyle = {
  display: 'inline-flex', alignItems: 'center', gap: 5,
  background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
  borderRadius: 8, padding: '6px 12px', fontSize: 12.5, fontWeight: 600,
  color: 'var(--text-secondary)', cursor: 'pointer', whiteSpace: 'nowrap',
  transition: 'border-color 0.15s, color 0.15s',
}
const libBtnHover = (e, on) => {
  e.currentTarget.style.borderColor = on ? 'rgba(200,255,0,0.4)' : 'var(--border-color)'
  e.currentTarget.style.color = on ? 'var(--accent-lime)' : 'var(--text-secondary)'
}

function LibButton({ emoji, text, onClick }) {
  return (
    <button
      style={libBtnStyle}
      onMouseEnter={e => libBtnHover(e, true)}
      onMouseLeave={e => libBtnHover(e, false)}
      onClick={(e) => { e.stopPropagation(); onClick() }}
    >
      <span>{emoji}</span>{text}
    </button>
  )
}

function DayCard({ day, onOpen, onOpenTheory, onOpenQuestions, onOpenHomework }) {
  const locked = !isAvailable(day.day)
  const showButtons = shouldShowButtons(day.day)
  const color  = locked ? 'rgba(255,255,255,0.08)' : '#c8ff00'
  const hasMats = day.mats?.length > 0

  return (
    <div
      className={`sched-day${!locked && hasMats ? ' sched-day--open' : ''}`}
      style={locked ? { opacity: 0.4 } : { cursor:'default' }}
    >
      <div className="sched-day-header" style={{ flexWrap: 'wrap', rowGap: 10 }}>
        <div className="sched-day-stripe" style={{ background: color }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">{String(day.day).padStart(2,'0')}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{dayDateLabel(day.day)}</span>
        </div>
        <div className="sched-day-title">{day.title}</div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap', flexShrink: 0 }}>
          {showButtons && (
            <>
              <LibButton emoji="📚" text="Теория" onClick={() => onOpenTheory(day)} />
              {day.day !== 13 && (
                <LibButton emoji="✅" text="Онлайн тесты" onClick={() => onOpenQuestions(day)} />
              )}
              <LibButton emoji="📝" text="Домашние задания" onClick={() => onOpenHomework(day)} />
            </>
          )}
          {!locked && hasMats && (
            <LibButton emoji="🎬" text="Видео-лекция" onClick={() => onOpen(day)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default function Library({ onOpenDay, onOpenTheory, onOpenQuestions, onOpenHomework }) {
  const [activeMonth, setActiveMonth] = useState('july')
  const [library, setLibrary]         = useState(LIBRARY)
  const [schedule, setSchedule]       = useState(SCHEDULE)
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    const minLoadTime = 500

    Promise.all([
      api.library().then(setLibrary).catch(() => {}),
      api.schedule().then(setSchedule).catch(() => {}),
    ]).then(() => {
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minLoadTime - elapsed)
      setTimeout(() => setLoading(false), remaining)
    })
  }, [])

  const juneDays = buildJuneDays(schedule, library)
  const [openJulyDay, setOpenJulyDay] = useState(() => getTodayJulyDay())

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Библиотека знаний</h1>
        <p className="page-subtitle">Материалы лагеря по дням — нажми на день чтобы открыть</p>
      </div>

      <div className="library-tabs">
        {TABS.map(tab => (
          <button
            key={tab.value}
            className={`lib-tab${activeMonth === tab.value ? ' active' : ''}${tab.locked ? ' lib-tab--locked' : ''}`}
            onClick={tab.locked ? undefined : () => setActiveMonth(tab.value)}
            disabled={tab.locked}
          >
            {tab.label}{tab.locked ? ' 🔒' : ''}
          </button>
        ))}
      </div>

      {activeMonth === 'june' && (
        loading ? (
          <div className="sched-week">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonLibraryDay key={i} />
            ))}
          </div>
        ) : (
          WEEKS.map(week => {
            const days = juneDays.filter(d => d.day >= week.start && d.day <= week.end)
            if (!days.length) return null
            return (
              <div key={week.label} className="sched-week">
                <div className="schedule-date-label">{week.label}</div>
                {days.map((day, i) => (
                  <div key={day.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                    <DayCard day={day} onOpen={onOpenDay} onOpenTheory={onOpenTheory} onOpenQuestions={onOpenQuestions} onOpenHomework={onOpenHomework} />
                  </div>
                ))}
              </div>
            )
          })
        )
      )}

      {activeMonth === 'july' && (
        <div className="sched-week">
          <div className="schedule-date-label">Июль 2026 · специализация</div>
          {JULY_DAYS.map(day => (
            <div key={day.day} className="fade-in">
              <JulyDayCard
                day={day}
                open={openJulyDay === day.day}
                onToggle={() => setOpenJulyDay(prev => prev === day.day ? null : day.day)}
                onOpenTheory={onOpenTheory}
                onOpenQuestions={onOpenQuestions}
                onOpenHomework={onOpenHomework}
              />
            </div>
          ))}
        </div>
      )}

      {activeMonth === 'august' && (
        <p style={{ color:'var(--text-tertiary)', padding:'20px 0' }}>Материалы появятся позже</p>
      )}
    </section>
  )
}
