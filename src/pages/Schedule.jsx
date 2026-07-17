import { useState, useEffect } from 'react'
import { SCHEDULE, TYPE_COLORS, TYPE_LABELS, TYPE_BADGE, HW_LINKS } from '../data'
import { api } from '../api'
import { SkeletonScheduleDay, SkeletonCampProgress } from '../components/Skeleton'

const MONTH_TABS = [
  { value: 'june',   label: 'Июнь',   locked: false },
  { value: 'july',   label: 'Июль',   locked: false },
  { value: 'august', label: 'Август', locked: true  },
]

const JUNE_WEEKS = [
  { label:'Неделя 1 · 1–7 июня',   start:1,  end:7  },
  { label:'Неделя 2 · 8–14 июня',  start:8,  end:14 },
  { label:'Неделя 3 · 15–21 июня', start:15, end:21 },
  { label:'Неделя 4 · 22–28 июня', start:22, end:28 },
  { label:'Неделя 5 · 29–30 июня', start:29, end:99 },
]

const TRACK_COLORS = {
  'ML':               { bg: 'rgba(34,197,94,0.12)',  border: 'rgba(34,197,94,0.3)',  text: '#4ade80' },
  'Аналитика':        { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#818cf8' },
  'Frontend':         { bg: 'rgba(234,179,8,0.12)',  border: 'rgba(234,179,8,0.3)',  text: '#facc15' },
  'Backend':          { bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#60a5fa' },
  'Кибербезопасность':{ bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)',  text: '#f87171' },
}

// Резервное расписание июля на фронтенде — чтобы занятия показывались даже если
// бэкенд ещё не подтянул миграции. Дубликаты с API схлопываются по day+time+title.
const JULY_SCHEDULE_FALLBACK = [
  { day:1, date:'ср, 1 июля', meeting_time:'20:00', title:'Основы Python', tracks:['ML','Аналитика'], description:'Повторяем базовый синтаксис Python: типы данных, циклы, функции. Анонс библиотек для последующей работы: numpy, pandas, matplotlib, seaborn, scikit-learn.' },
  { day:1, date:'ср, 1 июля', meeting_time:'20:30', title:'Основы HTML', tracks:['Frontend'], description:'Структура HTML-документа, семантические теги, формы и таблицы. Пишем первую страницу с нуля.' },
  { day:1, date:'ср, 1 июля', meeting_time:'21:00', title:'Обзор Python vs Go', tracks:['Backend'], description:'Сравниваем два популярных бэкенд-языка: синтаксис, типизация, экосистема, производительность.' },
  { day:1, date:'ср, 1 июля', meeting_time:'21:30', title:'Основы информационной безопасности', tracks:['Кибербезопасность'], description:'CIA-триада, угрозы и атаки, модели нарушителя. Обзор направлений: AppSec, сети, криптография, реагирование на инциденты.' },
  { day:2, date:'чт, 2 июля', meeting_time:'20:00', title:'Операционные системы', tracks:['Кибербезопасность'], description:'Как устроена ОС: процессы, память, файловая система, права доступа — база для понимания атак и защиты.' },
  { day:2, date:'чт, 2 июля', meeting_time:'20:30', title:'Комбинаторика и основы теории вероятностей', tracks:['Аналитика'], description:'Считаем количество вариантов: перестановки, сочетания, размещения. Основы вероятности: события, вероятность события, независимость.' },
  { day:2, date:'чт, 2 июля', meeting_time:'21:00', title:'Введение в ML', tracks:['ML'], description:'Что такое машинное обучение, какие бывают типы задач, чем ML отличается от классического программирования.' },
  { day:2, date:'чт, 2 июля', meeting_time:'21:30', title:'Архитектура веб-приложения', tracks:['Backend'], description:'Из чего состоит веб-приложение: клиент, сервер, база данных. Как компоненты взаимодействуют друг с другом.' },
  { day:3, date:'пт, 3 июля', meeting_time:'20:00', title:'Нарешиваем LeetCode', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Будем решать классические задачи с алгоритмической секции собеседований в БигТех.' },
  { day:4, date:'сб, 4 июля', meeting_time:'21:30', title:'Компьютерные сети: основы', tracks:['Кибербезопасность'], description:'Как устроена передача данных в сети: модель OSI/TCP-IP, IP-адреса, порты, протоколы TCP/UDP, DNS, HTTP/HTTPS.' },
  { day:4, date:'сб, 4 июля', meeting_time:'22:00', title:'Библиотека NumPy', tracks:['Аналитика','ML'], description:'Основы работы с массивами NumPy: создание, индексация, векторизованные операции, broadcasting.' },
  { day:4, date:'сб, 4 июля', meeting_time:'22:30', title:'Базы данных: SQL и ORM', tracks:['Backend'], description:'Реляционные базы данных, язык SQL и ORM — как абстракция над SQL в коде приложения.' },
  { day:5, date:'вс, 5 июля', meeting_time:'20:00', title:'Продвинутый JavaScript', tracks:['Frontend'], description:'Углублённые темы JavaScript для фронтенд-разработки.' },
  { day:5, date:'вс, 5 июля', meeting_time:'20:30', title:'REST API: создание на Python', tracks:['Backend'], description:'Создаём REST API на Python.' },
  { day:5, date:'вс, 5 июля', meeting_time:'21:00', title:'NumPy p.2 и Pandas', tracks:['Аналитика','ML'], description:'Продолжаем NumPy и знакомимся с библиотекой Pandas.' },
  { day:5, date:'вс, 5 июля', meeting_time:'22:00', title:'Ассемблер и кое-что до', tracks:['Кибербезопасность'], description:'Знакомство с ассемблером и низкоуровневыми основами.' },
  { day:6, date:'пн, 6 июля', meeting_time:'20:00', title:'JavaScript: Взаимодействие с DOM деревом', tracks:['Frontend'], description:'Основные способы взаимодействия с DOM через JavaScript: поиск элементов, изменение содержимого, события.' },
  { day:6, date:'пн, 6 июля', meeting_time:'20:30', title:'Аутентификация и авторизация', tracks:['Backend'], description:'Процессы аутентификации и авторизации на бэкенде, примеры реализации на Django.' },
  { day:6, date:'пн, 6 июля', meeting_time:'21:00', title:'Математическая статистика: основные понятия', tracks:['Аналитика'], description:'База математической статистики: выборка, описательные статистики, распределения, доверительные интервалы, проверка гипотез.' },
  { day:6, date:'пн, 6 июля', meeting_time:'21:30', title:'Линейная регрессия + практика', tracks:['ML'], description:'Обучение с учителем, линейная регрессия, функция потерь, аналитическое решение и градиентный спуск.' },
  { day:6, date:'пн, 6 июля', meeting_time:'22:00', title:'Основы WinAPI и C++', tracks:['Кибербезопасность'], description:'Что такое WinAPI, его задачи и инструменты, примеры реализации на WinAPI и C++.' },
  { day:7, date:'вт, 7 июля', meeting_time:'20:00', title:'Вспоминаем структуры данных и алгоритмы', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Повторяем ключевые структуры данных и алгоритмы для всех треков.' },
  { day:8, date:'ср, 8 июля', meeting_time:'20:00', title:'Продуктовые метрики', tracks:['Аналитика'], description:'Способы измерения поведения пользователей и продуктовые метрики.' },
  { day:8, date:'ср, 8 июля', meeting_time:'20:30', title:'Градиентный спуск', tracks:['ML'], description:'Краткая сводка математики до градиентного спуска и сам алгоритм.' },
  { day:8, date:'ср, 8 июля', meeting_time:'21:00', title:'Криптография', tracks:['Кибербезопасность'], description:'Цели криптографической защиты, криптосистемы, протоколы, хэш-функции.' },
  { day:8, date:'ср, 8 июля', meeting_time:'21:30', title:'Валидация и обработка ошибок', tracks:['Backend'], description:'Валидация и обработка ошибок на бэкенде Django.' },
  { day:8, date:'ср, 8 июля', meeting_time:'22:00', title:'TypeScript', tracks:['Frontend'], description:'Всё необходимое для старта: типы, интерфейсы, дженерики.' },
  { day:9, date:'чт, 9 июля', meeting_time:'21:00', title:'Визуализация данных: Matplotlib', tracks:['Аналитика','ML'], description:'Библиотека Matplotlib: анатомия фигуры, основные типы графиков, оформление, seaborn.' },
  { day:9, date:'чт, 9 июля', meeting_time:'21:30', title:'WebSocket и real-time', tracks:['Backend','Frontend'], description:'Real-time соединения через WebSocket: отличие от HTTP, handshake, клиент на JS и сервер на Python.' },
  { day:9, date:'чт, 9 июля', meeting_time:'22:00', title:'OWASP Top 10', tracks:['Кибербезопасность'], description:'Полный разбор десяти самых критичных категорий уязвимостей веб-приложений.' },
  { day:10, date:'пт, 10 июля', meeting_time:'20:00', title:'Нарешиваем LeetCode', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Практика алгоритмических задач для всех треков.' },
  { day:11, date:'сб, 11 июля', meeting_time:'20:00', title:'Делаем пет-проект', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Самостоятельная работа над пет-проектом для портфолио.' },
  { day:12, date:'вс, 12 июля', meeting_time:'20:00', title:'Делаем пет-проект', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Самостоятельная работа над пет-проектом для портфолио.' },
  { day:13, date:'пн, 13 июля', meeting_time:'20:00', title:'Метрики классификации и регрессии', tracks:['ML'], description:'Accuracy, Precision, Recall, AUC-ROC, MSE, RMSE, R2 и другие метрики качества моделей.' },
  { day:13, date:'пн, 13 июля', meeting_time:'20:30', title:'A/B-тестирование', tracks:['Аналитика'], description:'A/B-тестирование для аналитика: от гипотезы до интерпретации результата.' },
  { day:13, date:'пн, 13 июля', meeting_time:'21:00', title:'Технологии видеонаблюдения', tracks:['Кибербезопасность'], description:'Типы камер, углы обзора, дальность, настройка и расстановка систем видеонаблюдения.' },
  { day:13, date:'пн, 13 июля', meeting_time:'21:30', title:'ООП: основы', tracks:['Frontend','Backend'], description:'Основы объектно-ориентированного программирования на JavaScript и Python.' },
  { day:14, date:'вт, 14 июля', meeting_time:'20:00', title:'Обобщающая способность модели: отложенная выборка и кросс-валидация', tracks:['ML'], description:'Как честно оценить модель: hold-out, переобучение и K-fold кросс-валидация.' },
  { day:14, date:'вт, 14 июля', meeting_time:'20:30', title:'Очистка данных', tracks:['Аналитика'], description:'Полный обзор очистки данных: пропуски, дубликаты, trim, типы, форматы и выбросы в Excel и Python.' },
  { day:14, date:'вт, 14 июля', meeting_time:'21:00', title:'SSG и SSR: серверный рендеринг и Next.js', tracks:['Frontend'], description:'CSR, SSG и SSR: чем отличаются, зачем нужен серверный рендеринг и как он устроен в Next.js.' },
  { day:14, date:'вт, 14 июля', meeting_time:'21:30', title:'Микросервисы: основы', tracks:['Backend'], description:'Зачем нужны микросервисы, как их строить, как они общаются и какие инструменты использовать.' },
  { day:14, date:'вт, 14 июля', meeting_time:'22:00', title:'Социальная инженерия и фишинг', tracks:['Кибербезопасность'], description:'Приёмы социальной инженерии, устройство фишинговых атак и способы защиты от них.' },
  { day:15, date:'ср, 15 июля', meeting_time:'20:00', title:'Docker: основы', tracks:['Frontend','Backend'], description:'Что такое Docker и зачем он нужен: контейнеры, образы, Dockerfile, команды и Docker Compose.' },
  { day:15, date:'ср, 15 июля', meeting_time:'20:30', title:'Линейная алгебра: векторы', tracks:['Аналитика','ML'], description:'Векторы, операции, скалярное произведение, линейная зависимость, базис и размерность.' },
  { day:15, date:'ср, 15 июля', meeting_time:'21:00', title:'Электронный документооборот и нормативная база', tracks:['Кибербезопасность'], description:'ЭДО, виды электронной подписи, 63-ФЗ, МЧД и нормативная база РФ на 2026 год.' },
  { day:16, date:'чт, 16 июля', meeting_time:'21:00', title:'Качаем статистику: распределения', tracks:['Аналитика','ML'], description:'Вариационный ряд, таблица частот, виды распределений, площадь под кривой, среднее, дисперсия, перцентили и квартили.' },
  { day:16, date:'чт, 16 июля', meeting_time:'21:30', title:'Все виды баз данных: сходства и отличия', tracks:['Frontend','Backend'], description:'Реляционные, документные, key-value, колоночные, графовые БД и поисковые движки — сходства, отличия, команды.' },
  { day:16, date:'чт, 16 июля', meeting_time:'22:00', title:'Технические средства охраны', tracks:['Кибербезопасность'], description:'Датчик разбития стекла, PIR-датчик движения, датчик открытия двери: принципы работы, установка и комбинирование.' },
  { day:17, date:'пт, 17 июля', meeting_time:'20:00', title:'Нарешиваем LeetCode', tracks:['Frontend','Backend','Аналитика','ML','Кибербезопасность'], description:'Практика алгоритмических задач для всех треков.' },
].map((e, i) => ({ id: -1000 - i, month: 'july', type: 'lecture', theory: [], tasks: [], hw: '', meeting_link: '', ...e }))

// Объединяем события июля из API с резервными. Резервные данные считаются
// источником истины по day+title (могут содержать более свежее время/описание,
// чем ещё не задеплоенная БД на бэкенде), поэтому вытесняют совпадающие записи из API.
function mergeJuly(apiEvents) {
  const fallbackKeys = new Set(JULY_SCHEDULE_FALLBACK.map(e => `${e.day}|${e.title}`))
  const filteredApi = apiEvents.filter(e => !(e.month === 'july' && fallbackKeys.has(`${e.day}|${e.title}`)))
  const extra = JULY_SCHEDULE_FALLBACK
  return [...filteredApi, ...extra]
}

function getDayDate(dayNum, month) {
  if (month === 'july') return new Date(2026, 6, dayNum)
  if (month === 'august') return new Date(2026, 7, dayNum)
  return new Date(2026, 5, dayNum)
}

function isAvailable(dayNum, month) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return getDayDate(dayNum, month) <= today
}

// Число сегодняшнего дня, если сегодня июль 2026, иначе null
function getTodayJulyDay() {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 6) return null
  return today.getDate()
}

function findTodayId(events) {
  const today = new Date()
  if (today.getFullYear() !== 2026 || today.getMonth() !== 5) return null
  const found = events.find(e => e.day === today.getDate() && e.month === 'june')
  return found ? found.id : null
}

function CampProgress() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const months = [
    { label:'Июнь',   total:30, start: new Date(2026, 5, 1) },
    { label:'Июль',   total:31, start: new Date(2026, 6, 1) },
    { label:'Август', total:31, start: new Date(2026, 7, 1) },
  ]
  return (
    <div className="camp-progress">
      {months.map(m => {
        let done = 0
        const segs = Array.from({ length: m.total }, (_, i) => {
          const d = new Date(m.start)
          d.setDate(d.getDate() + i)
          const isToday = d.getTime() === today.getTime()
          const isPast  = d < today
          if (isToday || isPast) done++
          return { isToday, isPast }
        })
        const pct = Math.round(done / m.total * 100)
        return (
          <div key={m.label} className="camp-month-bar">
            <div className="camp-month-head">
              <span className="camp-month-name">{m.label}</span>
              <span className="camp-month-pct">{done}/{m.total} · {pct}%</span>
            </div>
            <div className="camp-segs">
              {segs.map((s, i) => (
                <div key={i} className={`camp-seg${s.isToday ? ' s-today' : s.isPast ? ' s-past' : ''}`} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Карточка для июня (старый формат — один урок в день)
function JuneDayCard({ day, expanded, onToggle }) {
  const color = TYPE_COLORS[day.type] || '#8a8a9a'
  const badge = TYPE_BADGE[day.type]  || 'badge--gray'
  const label = TYPE_LABELS[day.type] || day.type
  const hwUrl = HW_LINKS[day.day]
  const available = isAvailable(day.day, 'june')

  return (
    <div className={`sched-day${expanded ? ' sched-day--open' : ''}`}>
      <div className="sched-day-header" onClick={onToggle}>
        <div className="sched-day-stripe" style={{ background: color }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">День {day.day}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{day.date}</span>
        </div>
        <div className="sched-day-title">{day.title}</div>
        <span className={`badge ${badge}`}>{label}</span>
        <span className="sched-chevron">{expanded ? '▴' : '▾'}</span>
      </div>

      {expanded && (
        <div className="sched-day-body">
          {(day.meeting_time || day.meeting_link) && (
            <div className="sched-section">
              <div className="sched-section-label">Встреча</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {day.meeting_time && (
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--accent-lime)' }}>
                    🕐 {day.meeting_time}
                  </span>
                )}
                {day.meeting_link && (
                  available ? (
                    <a href={day.meeting_link} target="_blank" rel="noopener" className="hw-drive-btn">
                      🔗 Присоединиться →
                    </a>
                  ) : (
                    <span className="hw-drive-btn hw-drive-btn--locked">🔒 Доступ {day.date}</span>
                  )
                )}
              </div>
            </div>
          )}
          {day.theory?.length > 0 && (
            <div className="sched-section">
              <div className="sched-section-label">Теория</div>
              <ul className="sched-list">
                {day.theory.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          )}
          {hwUrl && (
            <div className="sched-section">
              <div className="sched-section-label">Домашнее задание</div>
              {available
                ? <a href={hwUrl} className="hw-drive-btn" target="_blank" rel="noopener">Открыть папку с ДЗ →</a>
                : <span className="hw-drive-btn hw-drive-btn--locked">🔒 Откроется {day.date}</span>
              }
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Карточка занятия для июля (трек + время + описание)
function JulySessionCard({ session }) {
  const tracks = session.tracks || []

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)',
      borderRadius: 10,
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-lime)', minWidth: 44 }}>
          {session.meeting_time}
        </span>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-primary)', flex: 1 }}>
          {session.title}
        </span>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {tracks.map(t => {
            const c = TRACK_COLORS[t] || { bg: 'rgba(255,255,255,0.07)', border: 'rgba(255,255,255,0.15)', text: 'var(--text-secondary)' }
            return (
              <span key={t} style={{
                background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                borderRadius: 999, padding: '3px 12px', fontSize: 11, fontWeight: 600,
              }}>{t}</span>
            )
          })}
        </div>
      </div>
      {session.description && (
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
          {session.description}
        </p>
      )}
    </div>
  )
}

// Группировка занятий июля по дням
function JulyDayGroup({ dayNum, dateLabel, sessions, open, onToggle }) {
  return (
    <div className={`sched-day${open ? ' sched-day--open' : ''}`} style={{ marginBottom: 8 }}>
      <div className="sched-day-header" onClick={onToggle} style={{ cursor: 'pointer' }}>
        <div className="sched-day-stripe" style={{ background: '#a07aff' }} />
        <div className="sched-day-meta">
          <span className="sched-day-num">День {dayNum}</span>
          <span className="sched-day-sep">·</span>
          <span className="sched-day-date">{dateLabel}</span>
        </div>
        <div className="sched-day-title" style={{ flex: 1 }}>
          {sessions.length} {sessions.length === 1 ? 'занятие' : sessions.length < 5 ? 'занятия' : 'занятий'}
        </div>
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginRight: 8 }}>
          {[...new Set(sessions.flatMap(s => s.tracks || []))].map(t => {
            const c = TRACK_COLORS[t] || {}
            return (
              <span key={t} style={{
                background: c.bg, border: `1px solid ${c.border}`, color: c.text,
                borderRadius: 999, padding: '3px 10px', fontSize: 10, fontWeight: 700,
              }}>{t}</span>
            )
          })}
        </div>
        <span className="sched-chevron">{open ? '▴' : '▾'}</span>
      </div>
      {open && (
        <div className="sched-day-body" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {sessions.sort((a, b) => (a.meeting_time || '').localeCompare(b.meeting_time || '')).map(s => (
            <JulySessionCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Schedule() {
  const [activeMonth, setActiveMonth] = useState('july')
  const [events, setEvents]           = useState(() => mergeJuly(SCHEDULE))
  const [expandedId, setExpandedId]   = useState(() => findTodayId(SCHEDULE))
  const [openJulyDay, setOpenJulyDay] = useState(() => getTodayJulyDay())
  const [loading, setLoading]         = useState(true)

  useEffect(() => {
    const startTime = Date.now()
    api.schedule().then(data => {
      setEvents(mergeJuly(data))
      const id = findTodayId(data)
      if (id !== null) setExpandedId(id)
      const elapsed = Date.now() - startTime
      setTimeout(() => setLoading(false), Math.max(0, 500 - elapsed))
    }).catch(() => {
      setTimeout(() => setLoading(false), 500)
    })
  }, [])

  const toggle = (id) => setExpandedId(prev => prev === id ? null : id)

  const juneEvents = events.filter(e => e.month === 'june' || !e.month)
  const julyEvents = events.filter(e => e.month === 'july')

  // Группируем июль по дням
  const julyByDay = {}
  julyEvents.forEach(e => {
    if (!julyByDay[e.day]) julyByDay[e.day] = []
    julyByDay[e.day].push(e)
  })
  const julyDays = Object.keys(julyByDay).map(Number).sort((a, b) => a - b)

  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Расписание</h1>
        <p className="page-subtitle">Программа лагеря — теория, задания и ДЗ по каждому дню</p>
      </div>

      {loading ? <SkeletonCampProgress /> : <CampProgress />}

      {/* Вкладки месяцев */}
      <div style={{ display: 'flex', gap: 8, margin: '20px 0 24px' }}>
        {MONTH_TABS.map(tab => (
          <button
            key={tab.value}
            disabled={tab.locked || loading}
            onClick={() => !tab.locked && setActiveMonth(tab.value)}
            style={{
              padding: '8px 20px',
              borderRadius: 8,
              border: activeMonth === tab.value
                ? '1px solid rgba(200,255,0,0.4)'
                : '1px solid var(--border-color)',
              background: activeMonth === tab.value
                ? 'rgba(200,255,0,0.08)'
                : 'var(--bg-secondary)',
              color: tab.locked
                ? 'var(--text-tertiary)'
                : activeMonth === tab.value
                  ? 'var(--accent-lime)'
                  : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: 14,
              cursor: tab.locked ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'all 0.15s',
              opacity: tab.locked ? 0.5 : 1,
            }}
          >
            {tab.locked && <span style={{ fontSize: 12 }}>🔒</span>}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Июнь */}
      {activeMonth === 'june' && (
        loading ? (
          <div className="sched-week">
            {[1,2,3,4,5].map(i => <SkeletonScheduleDay key={i} />)}
          </div>
        ) : (
          JUNE_WEEKS.map(week => {
            const days = juneEvents.filter(d => d.day >= week.start && d.day <= week.end)
            if (!days.length) return null
            return (
              <div key={week.label} className="sched-week">
                <div className="schedule-date-label">{week.label}</div>
                {days.map((day, i) => (
                  <div key={day.id} className="fade-in" style={{ animationDelay: `${i * 0.02}s` }}>
                    <JuneDayCard
                      day={day}
                      expanded={expandedId === day.id}
                      onToggle={() => toggle(day.id)}
                    />
                  </div>
                ))}
              </div>
            )
          })
        )
      )}

      {/* Июль */}
      {activeMonth === 'july' && (
        loading ? (
          <div className="sched-week">
            {[1,2].map(i => <SkeletonScheduleDay key={i} />)}
          </div>
        ) : julyDays.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)', padding: '20px 0' }}>Расписание июля скоро появится</p>
        ) : (
          <div className="sched-week">
            <div className="schedule-date-label">Июль 2026</div>
            {julyDays.map(dayNum => (
              <JulyDayGroup
                key={dayNum}
                dayNum={dayNum}
                dateLabel={julyByDay[dayNum][0]?.date || `${dayNum} июля`}
                sessions={julyByDay[dayNum]}
                open={openJulyDay === dayNum}
                onToggle={() => setOpenJulyDay(prev => prev === dayNum ? null : dayNum)}
              />
            ))}
          </div>
        )
      )}
    </section>
  )
}
