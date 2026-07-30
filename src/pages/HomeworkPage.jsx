import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'
import { api } from '../api'

const JULY_TRACK_LABELS = {
  101: '1 июля · Frontend — Основы HTML',
  102: '1 июля · Backend — Python vs Go',
  103: '1 июля · ML/Аналитика — Основы Python',
  104: '1 июля · Кибербезопасность — Основы ИБ',
  105: '2 июля · Кибербезопасность — Операционные системы',
  106: '2 июля · Аналитика — Комбинаторика и теория вероятностей',
  107: '2 июля · ML — Введение в машинное обучение',
  108: '2 июля · Backend — Архитектура веб-приложения',
  109: '3 июля · Все треки — Нарешиваем LeetCode',
  110: '2 июля · Frontend — Основы CSS',
  111: '4 июля · Кибербезопасность — Компьютерные сети: основы',
  112: '4 июля · Аналитика/ML — Библиотека NumPy',
  113: '4 июля · Backend — Базы данных: SQL и ORM',
  114: '4 июля · Frontend — Препроцессоры LESS/SASS/SCSS',
  115: '5 июля · Frontend — Продвинутый JavaScript',
  116: '5 июля · Backend — REST API: создание на Python',
  117: '5 июля · Аналитика/ML — NumPy p.2 и Pandas',
  118: '5 июля · Кибербезопасность — Ассемблер и кое-что до',
  119: '6 июля · Frontend — JavaScript: Взаимодействие с DOM',
  120: '6 июля · Backend — Аутентификация и авторизация',
  121: '6 июля · Аналитика — Математическая статистика',
  122: '6 июля · ML — Линейная регрессия + практика',
  123: '6 июля · Кибербезопасность — Основы WinAPI и C++',
  125: '8 июля · Frontend — TypeScript',
  126: '8 июля · Backend — Валидация и обработка ошибок',
  127: '8 июля · Аналитика — Продуктовые метрики',
  128: '8 июля · ML — Градиентный спуск',
  129: '8 июля · Кибербезопасность — Криптография',
  136: '13 июля · Frontend/Backend — ООП: основы',
  137: '13 июля · Аналитика — A/B-тестирование',
  138: '13 июля · ML — Метрики классификации и регрессии',
  139: '13 июля · Кибербезопасность — Технологии видеонаблюдения',
  140: '14 июля · ML — Обобщающая способность: отложенная выборка и кросс-валидация',
  141: '15 июля · Аналитика/ML — Линейная алгебра: векторы',
  142: '14 июля · Frontend — SSG и SSR: серверный рендеринг и Next.js',
  143: '14 июля · Backend — Микросервисы: основы',
  144: '14 июля · Кибербезопасность — Социальная инженерия и фишинг',
  145: '14 июля · Аналитика — Очистка данных',
  146: '15 июля · Frontend/Backend — Docker: основы',
  147: '15 июля · Кибербезопасность — Электронный документооборот и нормативная база РФ',
  148: '16 июля · Аналитика/ML — Качаем статистику: распределения',
  152: '18 июля · Аналитика/ML — Алгоритм k-Nearest Neighbors (kNN)',
  153: '18 июля · Frontend/Backend — Оптимизация фронтенда и бэкенда',
  163: '29 июля · Аналитика/ML — Решающие деревья',
  164: '29 июля · Backend — FastAPI: основы',
  165: '29 июля · Кибербезопасность — Основы сетевой безопасности',
}

export default function HomeworkPage({ selectedDay, onBack }) {
  const [schedule, setSchedule] = useState(SCHEDULE)
  const [homeworkContent, setHomeworkContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.schedule().then(setSchedule).catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    import('../data/homeworkContent').then(mod => {
      if (!cancelled) {
        setHomeworkContent(mod.default)
        setLoading(false)
      }
    })
    return () => { cancelled = true }
  }, [])

  const currentDay = selectedDay || 1
  const homework = (homeworkContent && homeworkContent[currentDay]) || { title: 'Домашние задания', tasks: [] }

  function getDayLabel(dayNum) {
    if (JULY_TRACK_LABELS[dayNum]) return JULY_TRACK_LABELS[dayNum]
    // Ищем в schedule (может быть с API или дефолт)
    const schedule_item = schedule.find(e => e.day === dayNum)
    if (schedule_item && schedule_item.title) {
      return schedule_item.title
    }
    // Резервный вариант из homeworkContent
    const homework_title = homeworkContent?.[dayNum]?.title
    return homework_title || `День ${dayNum}`
  }

  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {JULY_TRACK_LABELS[currentDay] ? getDayLabel(currentDay) : `День ${currentDay} · ${getDayLabel(currentDay)}`}
        </span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ marginTop: '24px' }}>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Загрузка...</p>
        ) : (
          <>
            <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{homework.title}</h2>

            {homework.tasks.length === 0 ? (
              <p style={{ color: 'var(--text-tertiary)' }}>Домашние задания еще не добавлены</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {homework.tasks.map((task, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 0,
                    }}
                  >
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                      Задача {task.num}: {task.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {task.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      </div>

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
