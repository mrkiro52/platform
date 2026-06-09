import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'
import Day2BasicsTasks from '../questions/day-2-basics'
import Day3LoopsTasks from '../questions/day-3-loops'
import Day4AlgorithmsTasks from '../questions/day-4-algorithms'
import Day5LogicTasks from '../questions/day-5-logic'
import Day6GraphsTasks from '../questions/day-6-graphs'
import Day7StructuresTasks from '../questions/day-7-structures'
import Day8StacksQueuesTasks from '../questions/day-8-stacks-queues'
import Day9HashtablesTasks from '../questions/day-9-hashtables'
import Day10TreesTasks from '../questions/day-10-trees'
import Day11GitTasks from '../questions/day-11-git'
import Day12AiToolsTasks from '../questions/day-12-ai-tools'
import Day13ProjectTasks from '../questions/day-13-project'
import Day15TimeManagementTasks from '../questions/day-15-timemanagement'
import Day16LanguagesTasks from '../questions/day-16-languages'
import Day17TrendsTasks from '../questions/day-17-trends'
import Day18TestingTasks from '../questions/day-18-testing'
import Day19SqlTasks from '../questions/day-19-sql'
import Day20ApiTasks from '../questions/day-20-api'
import Day23SortingTasks from '../questions/day-23-sorting'
import Day24PatternsTasks from '../questions/day-24-patterns'
import Day25SecurityTasks from '../questions/day-25-security'
import Day26SoftSkillsTasks from '../questions/day-26-softs-kills'
import Day27LearningTasks from '../questions/day-27-learning'
import Day29ResumeTasks from '../questions/day-29-resume'

const QUESTIONS_COMPONENTS = {
  2: Day2BasicsTasks,
  3: Day3LoopsTasks,
  4: Day4AlgorithmsTasks,
  5: Day5LogicTasks,
  6: Day6GraphsTasks,
  7: Day7StructuresTasks,
  8: Day8StacksQueuesTasks,
  9: Day9HashtablesTasks,
  10: Day10TreesTasks,
  11: Day11GitTasks,
  12: Day12AiToolsTasks,
  13: Day13ProjectTasks,
  15: Day15TimeManagementTasks,
  16: Day16LanguagesTasks,
  17: Day17TrendsTasks,
  18: Day18TestingTasks,
  19: Day19SqlTasks,
  20: Day20ApiTasks,
  23: Day23SortingTasks,
  24: Day24PatternsTasks,
  25: Day25SecurityTasks,
  26: Day26SoftSkillsTasks,
  27: Day27LearningTasks,
  29: Day29ResumeTasks,
}

function QuestionCard({ question, taskIndex, totalTasks, onAnswer, isSolved }) {
  const [inputValue, setInputValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [isChecking, setIsChecking] = useState(false)
  const isChoiceType = question.type === 'choice'

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

      if (isCorrect) {
        onAnswer(taskIndex, true)
      }
    }, 300)
  }

  const handleClear = () => {
    setInputValue('')
    setFeedback(null)
    setShowHint(false)
  }

  const feedbackStyle = {
    color: feedback?.correct ? '#00ff00' : '#ff3333',
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
            <label key={idx} className="question-option">
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
            className="question-input"
            onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
          />
        </div>
      )}

      <div className="question-actions">
        <div className="question-actions-left">
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn-hint"
            disabled={isChecking}
          >
            {showHint ? 'Скрыть подсказку' : 'Подсказка'}
          </button>
          <button
            onClick={handleClear}
            className="btn-clear"
            disabled={isChecking}
          >
            Очистить
          </button>
        </div>
        <button
          onClick={handleCheck}
          className={`btn-check ${isChecking ? 'checking' : ''}`}
          disabled={isChecking}
        >
          {isChecking ? '⟳' : 'Готово'}
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

function TaskIndicators({ totalTasks, solvedTasks, currentIndex, onSelectTask }) {
  return (
    <div className="task-indicators">
      {Array.from({ length: totalTasks }).map((_, i) => (
        <button
          key={i}
          className={`task-indicator ${solvedTasks.includes(i) ? 'solved' : ''} ${i === currentIndex ? 'active' : ''}`}
          title={`Задача ${i + 1}`}
          onClick={() => onSelectTask(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  )
}

export default function QuestionsPage({ selectedDay, onBack }) {
  const [questions, setQuestions] = useState([])
  const [solvedTasks, setSolvedTasks] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [switching, setSwitching] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const getQuestions = QUESTIONS_COMPONENTS[selectedDay]
      if (getQuestions) {
        const data = getQuestions()
        setQuestions(data.tasks || [])

        // Load solved tasks from localStorage
        const saved = localStorage.getItem('solvedTasks')
        const solvedData = saved ? JSON.parse(saved) : {}
        const dayKey = `day${selectedDay}`
        setSolvedTasks(solvedData[dayKey] || [])
      }
      setCurrentIndex(0)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedDay])

  const handleAnswerCorrect = (taskIndex) => {
    if (solvedTasks.includes(taskIndex)) return

    const newSolved = [...solvedTasks, taskIndex]
    setSolvedTasks(newSolved)

    // Save to localStorage
    const saved = localStorage.getItem('solvedTasks')
    const solvedData = saved ? JSON.parse(saved) : {}
    solvedData[`day${selectedDay}`] = newSolved
    localStorage.setItem('solvedTasks', JSON.stringify(solvedData))
  }

  const goToQuestion = (index) => {
    const newIndex = Math.max(0, Math.min(index, questions.length - 1))
    if (newIndex === currentIndex) return

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

  function getDayLabel(dayNum) {
    const schedule = SCHEDULE.find(e => e.day === dayNum)
    return schedule ? schedule.title : `День ${dayNum}`
  }

  if (loading) {
    return (
      <section className="page active">
        <div className="page-header">
          <p style={{ color: 'var(--text-secondary)' }}>Загрузка...</p>
        </div>
      </section>
    )
  }

  if (!questions.length) {
    return (
      <section className="page active">
        <div className="page-header">
          <p style={{ color: 'var(--text-tertiary)' }}>Задачи для этого дня еще готовятся...</p>
        </div>
        <button className="btn-back" onClick={onBack}>
          ← Вернуться в Библиотеку
        </button>
      </section>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          📚 Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          День {selectedDay} · {getDayLabel(selectedDay)}
        </span>
      </div>

      <div className="questions-container">
        <div className="questions-header">
          <h2 className="questions-title">Задачи для тренировки</h2>
          <TaskIndicators
            totalTasks={questions.length}
            solvedTasks={solvedTasks}
            currentIndex={currentIndex}
            onSelectTask={goToQuestion}
          />
        </div>

        <div className="single-question-view">
          <div className={`question-card-wrapper ${switching ? 'switching' : ''}`}>
            <QuestionCard
              question={currentQuestion}
              taskIndex={currentIndex}
              totalTasks={questions.length}
              onAnswer={handleAnswerCorrect}
              isSolved={solvedTasks.includes(currentIndex)}
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

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          ← Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
