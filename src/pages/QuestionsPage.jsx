import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'











































































const JULY_TRACK_LABELS = {
  101: '1 июля · Frontend — Основы HTML',
  102: '1 июля · Backend — Python vs Go',
  103: '1 июля · ML/Аналитика — Основы Python',
  104: '1 июля · Кибербезопасность — Основы ИБ',
  105: '2 июля · Кибербезопасность — Операционные системы',
  106: '2 июля · Аналитика — Комбинаторика и теория вероятностей',
  107: '2 июля · ML — Введение в машинное обучение',
  108: '2 июля · Backend — Архитектура веб-приложения',
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
  130: '9 июля · Аналитика/ML — Визуализация данных: Matplotlib',
  131: '9 июля · Backend/Frontend — WebSocket и real-time',
  132: '9 июля · Кибербезопасность — OWASP Top 10',
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
  149: '16 июля · Frontend/Backend — Все виды баз данных: сходства и отличия',
  150: '16 июля · Кибербезопасность — Технические средства охраны',
  152: '18 июля · Аналитика/ML — Алгоритм k-Nearest Neighbors (kNN)',
  153: '18 июля · Frontend/Backend — Оптимизация фронтенда и бэкенда',
  163: '29 июля · Аналитика/ML — Решающие деревья',
  164: '29 июля · Backend — FastAPI: основы',
  165: '29 июля · Кибербезопасность — Основы сетевой безопасности',
}

export const QUESTIONS_COMPONENTS = {
  2: () => import('../questions/day-2-basics'),
  3: () => import('../questions/day-3-loops'),
  4: () => import('../questions/day-4-algorithms'),
  5: () => import('../questions/day-5-logic'),
  6: () => import('../questions/day-6-graphs'),
  7: () => import('../questions/day-7-structures'),
  8: () => import('../questions/day-8-stacks-queues'),
  9: () => import('../questions/day-9-hashtables'),
  10: () => import('../questions/day-10-trees'),
  11: () => import('../questions/day-11-git'),
  12: () => import('../questions/day-12-ai-tools'),
  13: () => import('../questions/day-13-project'),
  15: () => import('../questions/day-15-timemanagement'),
  16: () => import('../questions/day-16-languages'),
  17: () => import('../questions/day-17-trends'),
  18: () => import('../questions/day-18-testing'),
  19: () => import('../questions/day-19-sql'),
  20: () => import('../questions/day-20-api'),
  22: () => import('../questions/day-23-sorting'),
  23: () => import('../questions/day-24-patterns'),
  24: () => import('../questions/day-25-security'),
  26: () => import('../questions/day-26-softs-kills'),
  27: () => import('../questions/day-27-learning'),
  29: () => import('../questions/day-29-resume'),
  // Июль — специализация (треки)
  101: () => import('../questions/july-1-html'),     // Frontend
  102: () => import('../questions/july-1-backend'),  // Backend
  103: () => import('../questions/july-1-python'),   // ML / Аналитика
  104: () => import('../questions/july-1-security'), // Кибербезопасность
  105: () => import('../questions/july-2-os'),             // Кибербезопасность, 2 июля
  106: () => import('../questions/july-2-combinatorics'),  // Аналитика, 2 июля
  107: () => import('../questions/july-2-ml-intro'),        // ML, 2 июля
  108: () => import('../questions/july-2-backend-arch'),    // Backend, 2 июля
  110: () => import('../questions/july-2-css'),            // Frontend, 2 июля
  111: () => import('../questions/july-4-networks'),       // Кибербезопасность, 4 июля
  112: () => import('../questions/july-4-numpy'),          // Аналитика/ML, 4 июля
  113: () => import('../questions/july-4-sql-orm'),         // Backend, 4 июля
  114: () => import('../questions/july-4-preprocessors'),  // Frontend, 4 июля
  115: () => import('../questions/july-5-javascript'),     // Frontend, 5 июля
  116: () => import('../questions/july-5-django'),         // Backend, 5 июля
  117: () => import('../questions/july-5-pandas'),         // Аналитика/ML, 5 июля
  118: () => import('../questions/july-5-assembly'),       // Кибербезопасность, 5 июля
  119: () => import('../questions/july-6-dom'),            // Frontend, 6 июля
  120: () => import('../questions/july-6-auth'),           // Backend, 6 июля
  121: () => import('../questions/july-6-statistics'),     // Аналитика, 6 июля
  122: () => import('../questions/july-6-linreg'),         // ML, 6 июля
  123: () => import('../questions/july-6-winapi'),         // Кибербезопасность, 6 июля
  125: () => import('../questions/july-8-typescript'),        // Frontend, 8 июля
  126: () => import('../questions/july-8-django-validation'),  // Backend, 8 июля
  127: () => import('../questions/july-8-metrics'),           // Аналитика, 8 июля
  128: () => import('../questions/july-8-gradient-descent'),   // ML, 8 июля
  129: () => import('../questions/july-8-crypto'),            // Кибербезопасность, 8 июля
  130: () => import('../questions/july-9-matplotlib'),         // Аналитика/ML, 9 июля
  131: () => import('../questions/july-9-websocket'),          // Backend/Frontend, 9 июля
  132: () => import('../questions/july-9-owasp'),              // Кибербезопасность, 9 июля
  136: () => import('../questions/july-13-oop'),               // Frontend/Backend, 13 июля
  137: () => import('../questions/july-13-ab-testing'),         // Аналитика, 13 июля
  138: () => import('../questions/july-13-metrics'),           // ML, 13 июля
  139: () => import('../questions/july-13-cctv'),              // Кибербезопасность, 13 июля
  140: () => import('../questions/july-14-generalization'),     // ML, 14 июля
  141: () => import('../questions/july-14-vectors'),            // Аналитика, 14 июля
  142: () => import('../questions/july-14-ssr-ssg'),             // Frontend, 14 июля
  143: () => import('../questions/july-14-microservices'),      // Backend, 14 июля
  144: () => import('../questions/july-14-phishing'),           // Кибербезопасность, 14 июля
  145: () => import('../questions/july-14-data-cleaning'),       // Аналитика, 14 июля — очистка данных
  146: () => import('../questions/july-15-docker'),             // Frontend/Backend, 15 июля — Docker
  147: () => import('../questions/july-15-documents'),          // Кибербезопасность, 15 июля — ЭДО и нормативка
  148: () => import('../questions/july-16-distributions'),      // Аналитика/ML, 16 июля — распределения
  149: () => import('../questions/july-16-databases'),          // Frontend/Backend, 16 июля — виды баз данных
  150: () => import('../questions/july-16-security-devices'),    // Кибербезопасность, 16 июля — технические средства охраны
  152: () => import('../questions/july-18-knn'),                // Аналитика/ML, 18 июля — kNN
  153: () => import('../questions/july-18-optimization'),       // Frontend/Backend, 18 июля — оптимизация
  163: () => import('../questions/july-29-decision-trees'),       // Аналитика/ML, 29 июля — решающие деревья
  164: () => import('../questions/july-29-fastapi-basics'),       // Backend, 29 июля — FastAPI основы
  165: () => import('../questions/july-29-network-security'),     // Кибербезопасность, 29 июля — сетевая безопасность
}

function QuestionCard({ question, taskIndex, totalTasks, onAnswer, isSolved, savedAnswer }) {
  const [inputValue, setInputValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const isChoiceType = question.type === 'choice'

  // Load saved answer on mount
  useEffect(() => {
    if (savedAnswer && savedAnswer.answer) {
      setInputValue(savedAnswer.answer)
      if (savedAnswer.status) {
        setFeedback({
          correct: savedAnswer.status === 'correct',
          message: savedAnswer.status === 'correct' ? 'Правильно!' : 'Неправильно',
        })
      }
    } else {
      // Clear input if no saved answer
      setInputValue('')
      setFeedback(null)
    }
  }, [savedAnswer, taskIndex])

  const handleCheck = () => {
    if (!inputValue.trim()) {
      setFeedback({ correct: false, message: 'Выберите ответ' })
      return
    }

    setIsChecking(true)
    setTimeout(() => {
      const isCorrect = inputValue.trim().toLowerCase() === question.answer.toLowerCase()
      setFeedback({
        correct: isCorrect,
        message: isCorrect ? 'Правильно!' : 'Неправильно',
      })
      setIsChecking(false)

      onAnswer(taskIndex, isCorrect, inputValue.trim())
    }, 300)
  }

  const handleClear = () => {
    setInputValue('')
    setFeedback(null)
    setShowHint(false)
  }

  const isAnswered = savedAnswer && savedAnswer.status

  const feedbackStyle = {
    color: feedback?.correct ? '#20beff' : '#ff3333',
    fontSize: '13px',
    fontWeight: 600,
    marginTop: '8px',
    minHeight: '20px',
  }

  return (
    <div className="question-card">
      <div className="question-header">
        <span className="question-number">Задача {taskIndex + 1} из {totalTasks}</span>
        <span className="question-difficulty">{question.difficulty}</span>
      </div>

      <p className="question-text">{question.text}</p>

      {isChoiceType ? (
        <div className="question-options">
          {question.options.map((option, idx) => (
            <label key={idx} className={`question-option ${isAnswered && feedback?.correct && option === inputValue ? 'answered' : ''}`}>
              <input
                type="radio"
                name={`question-${taskIndex}`}
                value={option}
                checked={inputValue === option}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isChecking}
              />
              <span className="option-text">{option}</span>
            </label>
          ))}
        </div>
      ) : (
        <div className="question-input-group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Введите ваш ответ..."
            disabled={isChecking}
            className={`question-input ${isAnswered && feedback?.correct ? 'answered' : ''}`}
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
          />
        </div>
      )}

      <div className="question-actions">
        <div className="question-actions-left">
          <button
            onClick={handleCheck}
            className={`btn-check ${isChecking ? 'checking' : ''}`}
            disabled={isChecking || (isAnswered && feedback?.correct)}
          >
            {isChecking ? '⟳' : isAnswered && feedback?.correct ? '✓ Решено' : 'Проверить'}
          </button>
          <button
            onClick={handleClear}
            className="btn-clear"
            disabled={isChecking}
          >
            {isAnswered ? 'Переделать' : 'Очистить'}
          </button>
        </div>
        <button
          onClick={() => setShowHint(!showHint)}
          className="btn-hint"
          disabled={isChecking}
        >
          {showHint ? 'Скрыть подсказку' : 'Подсказка'}
        </button>
      </div>

      {showHint && (
        <div className="question-hint">
          <strong>Подсказка:</strong> {question.hint}
        </div>
      )}

      {feedback && (
        <div style={feedbackStyle}>
          {feedback.message}
        </div>
      )}
    </div>
  )
}

function TaskIndicators({ totalTasks, taskStatuses, currentIndex, onSelectTask }) {
  return (
    <div className="task-indicators">
      {Array.from({ length: totalTasks }).map((_, i) => {
        const status = taskStatuses[i]
        const isActive = i === currentIndex
        const className = `task-indicator ${status === 'correct' ? 'correct' : ''} ${status === 'incorrect' ? 'incorrect' : ''} ${isActive ? 'active' : ''}`

        return (
          <button
            key={i}
            className={className}
            title={`Задача ${i + 1}`}
            onClick={() => onSelectTask(i)}
          >
            {i + 1}
          </button>
        )
      })}
    </div>
  )
}

// Ядро тренажёра тестов — без брейдкрамбов и обёртки страницы, чтобы можно
// было встраивать прямо в конспект теории, а не только показывать отдельной страницей.
export function QuestionsInline({ selectedDay }) {
  const [questions, setQuestions] = useState([])
  const [taskStatuses, setTaskStatuses] = useState({}) // { 0: 'correct', 1: 'incorrect' }
  const [taskAnswers, setTaskAnswers] = useState({}) // { 0: { answer: 'int', status: 'correct' } }
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    const loadQuestions = QUESTIONS_COMPONENTS[selectedDay]
    if (!loadQuestions) {
      setQuestions([])
      setCurrentIndex(0)
      setLoading(false)
      return
    }

    loadQuestions().then(mod => {
      if (cancelled) return
      const data = mod.default()
      setQuestions(data.tasks || [])

      // Load task statuses from localStorage
      const saved = localStorage.getItem('taskStatuses')
      const statusData = saved ? JSON.parse(saved) : {}
      const dayKey = `day${selectedDay}`
      setTaskStatuses(statusData[dayKey] || {})

      // Load task answers from localStorage
      const answersSaved = localStorage.getItem('taskAnswers')
      const answersData = answersSaved ? JSON.parse(answersSaved) : {}
      setTaskAnswers(answersData[dayKey] || {})

      setCurrentIndex(0)
      setLoading(false)
    })

    return () => { cancelled = true }
  }, [selectedDay])

  const handleAnswerCorrect = (taskIndex, isCorrect, answer) => {
    const newStatuses = { ...taskStatuses, [taskIndex]: isCorrect ? 'correct' : 'incorrect' }
    setTaskStatuses(newStatuses)

    // Save to localStorage
    const saved = localStorage.getItem('taskStatuses')
    const statusData = saved ? JSON.parse(saved) : {}
    statusData[`day${selectedDay}`] = newStatuses
    localStorage.setItem('taskStatuses', JSON.stringify(statusData))

    // Save answers separately
    const answersSaved = localStorage.getItem('taskAnswers')
    const answersData = answersSaved ? JSON.parse(answersSaved) : {}
    if (!answersData[`day${selectedDay}`]) {
      answersData[`day${selectedDay}`] = {}
    }
    answersData[`day${selectedDay}`][taskIndex] = {
      answer: answer,
      status: isCorrect ? 'correct' : 'incorrect',
    }
    localStorage.setItem('taskAnswers', JSON.stringify(answersData))
  }

  const goToQuestion = (index) => {
    const newIndex = Math.max(0, Math.min(index, questions.length - 1))
    if (newIndex === currentIndex) return

    // Reload saved answer before switching
    const answersSaved = localStorage.getItem('taskAnswers')
    const answersData = answersSaved ? JSON.parse(answersSaved) : {}
    const dayKey = `day${selectedDay}`
    const updatedAnswers = answersData[dayKey] || {}
    setTaskAnswers(updatedAnswers)

    setSwitching(true)
    setTimeout(() => {
      setCurrentIndex(newIndex)
      setSwitching(false)
    }, 200)
  }

  const goPrevious = () => {
    goToQuestion(currentIndex - 1)
  }

  const goNext = () => {
    goToQuestion(currentIndex + 1)
  }

  if (loading) {
    return <p style={{ color: 'var(--text-secondary)' }}>Загрузка...</p>
  }

  if (!questions.length) {
    return <p style={{ color: 'var(--text-tertiary)' }}>Задач для этого дня нет или они еще готовятся...</p>
  }

  const currentQuestion = questions[currentIndex]

  return (
    <div className="questions-container">
      <div className="questions-header">
        <h2 className="questions-title">Задачи для тренировки</h2>
        <TaskIndicators
          totalTasks={questions.length}
          taskStatuses={taskStatuses}
          currentIndex={currentIndex}
          onSelectTask={goToQuestion}
        />
      </div>

      <div className="single-question-view">
        <div className={`question-card-wrapper ${switching ? 'switching' : ''}`}>
          <QuestionCard
            key={`${selectedDay}-${currentIndex}`}
            question={currentQuestion}
            taskIndex={currentIndex}
            totalTasks={questions.length}
            onAnswer={handleAnswerCorrect}
            isSolved={taskStatuses[currentIndex]}
            savedAnswer={taskAnswers[currentIndex]}
          />
        </div>

        <div className="question-navigation">
          <button
            className="nav-btn nav-prev"
            onClick={goPrevious}
            disabled={currentIndex === 0}
          >
            ← Предыдущая
          </button>
          <span className="nav-counter">{currentIndex + 1} из {questions.length}</span>
          <button
            className="nav-btn nav-next"
            onClick={goNext}
            disabled={currentIndex === questions.length - 1}
          >
            Следующая →
          </button>
        </div>
      </div>
    </div>
  )
}

function getDayLabel(dayNum) {
  if (JULY_TRACK_LABELS[dayNum]) return JULY_TRACK_LABELS[dayNum]
  const schedule = SCHEDULE.find(e => e.day === dayNum)
  return schedule ? schedule.title : `День ${dayNum}`
}

// Полноценная страница тестов (отдельный маршрут /library/questions/:day) —
// обёртка над QuestionsInline с брейдкрамбами и кнопкой назад.
export default function QuestionsPage({ selectedDay, onBack }) {
  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {JULY_TRACK_LABELS[selectedDay] ? getDayLabel(selectedDay) : `День ${selectedDay} · ${getDayLabel(selectedDay)}`}
        </span>
      </div>

      <QuestionsInline selectedDay={selectedDay} />

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
