import { useState } from 'react'
import { ALGORITHM_POOL, COMPLEXITY_OPTIONS } from '../../data/algorithmComplexityTraining'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const COUNT_OPTIONS = [5, 10]

const optionBtnBase = {
  padding: '12px 8px',
  fontSize: 14,
  fontWeight: 700,
  fontFamily: 'ui-monospace, monospace',
  border: '1px solid var(--border-color)',
  borderRadius: 12,
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  cursor: 'pointer',
  outline: 'none',
  transition: 'border-color 0.15s, background 0.15s, color 0.15s',
}

export default function AlgorithmComplexityTraining({ onBack }) {
  const [phase, setPhase] = useState('select') // select | question | finished
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState([]) // { correct: bool } per answered question
  const [selectedOption, setSelectedOption] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  const startTraining = (count) => {
    const picked = shuffle(ALGORITHM_POOL).slice(0, count)
    setQuestions(picked)
    setCurrentIndex(0)
    setResults([])
    setSelectedOption(null)
    setIsAnswered(false)
    setPhase('question')
  }

  const handleAnswer = (option) => {
    if (isAnswered) return
    const current = questions[currentIndex]
    const correct = option === current.answer
    setSelectedOption(option)
    setIsAnswered(true)
    setResults(prev => [...prev, { correct }])
  }

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('finished')
      return
    }
    setCurrentIndex(i => i + 1)
    setSelectedOption(null)
    setIsAnswered(false)
  }

  const restart = () => {
    setPhase('select')
    setQuestions([])
    setResults([])
    setCurrentIndex(0)
    setSelectedOption(null)
    setIsAnswered(false)
  }

  const total = questions.length
  const correctCount = results.filter(r => r.correct).length
  const incorrectCount = results.filter(r => !r.correct).length
  const unansweredCount = total - results.length

  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          Тренировки
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">Сложность алгоритмов</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">Сложность алгоритмов</h1>
        <p className="page-subtitle">Смотри на код и угадывай его временную сложность</p>
      </div>

      {phase === 'select' && (
        <div style={{
          border: '1px solid var(--border-color)', borderRadius: 12, background: 'var(--bg-secondary)',
          padding: 'clamp(20px, 4vw, 40px)', width: '100%',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>
            Сколько задач хочешь пройти?
          </h2>
          <div style={{ display: 'flex', gap: 12 }}>
            {COUNT_OPTIONS.map(n => (
              <button
                key={n}
                onClick={() => startTraining(n)}
                style={{
                  flex: 1, padding: '18px 0', fontSize: 20, fontWeight: 700,
                  border: '1px solid var(--border-color)', borderRadius: 12,
                  background: 'var(--bg-tertiary)', color: 'var(--text-primary)',
                  cursor: 'pointer', outline: 'none', transition: 'border-color 0.15s, color 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-lime)'; e.currentTarget.style.color = 'var(--accent-lime)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)' }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === 'question' && questions[currentIndex] && (
        <div>
          {/* Статистика */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 20,
            border: '1px solid var(--border-color)', borderRadius: 12, padding: '12px 16px',
            background: 'var(--bg-tertiary)', fontSize: 13,
          }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Всего: {total}</span>
            <span style={{ color: 'var(--success)' }}>Правильно: {correctCount}</span>
            <span style={{ color: 'var(--danger)' }}>Неправильно: {incorrectCount}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>Осталось: {unansweredCount}</span>
          </div>

          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, marginBottom: 8 }}>
            Задача {currentIndex + 1} из {total}
          </div>

          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 12 }}>
            {questions[currentIndex].title}
          </h3>

          <pre className="theory-code-block" style={{
            padding: 16, margin: '0 0 20px', overflowX: 'auto', fontSize: 13, lineHeight: 1.6,
            fontFamily: 'ui-monospace, monospace', color: 'var(--text-primary)',
          }}>
            {questions[currentIndex].code}
          </pre>

          <div key={currentIndex} style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))', gap: 8, marginBottom: 20,
          }}>
            {COMPLEXITY_OPTIONS.map(opt => {
              const isCorrectOpt = opt === questions[currentIndex].answer
              const isSelected = opt === selectedOption
              let style = { ...optionBtnBase }
              if (isAnswered) {
                if (isCorrectOpt) {
                  style = { ...style, borderColor: 'var(--success)', background: 'var(--success-dim)', color: 'var(--success)' }
                } else if (isSelected) {
                  style = { ...style, borderColor: 'var(--danger)', background: 'rgba(255,51,51,0.08)', color: 'var(--danger)' }
                } else {
                  style = { ...style, opacity: 0.5 }
                }
              }
              return (
                <button
                  key={opt}
                  onClick={e => { handleAnswer(opt); e.currentTarget.blur() }}
                  disabled={isAnswered}
                  style={{ ...style, cursor: isAnswered ? 'default' : 'pointer' }}
                  onMouseEnter={e => { if (!isAnswered) { e.currentTarget.style.borderColor = 'var(--accent-lime)'; e.currentTarget.style.color = 'var(--accent-lime)' } }}
                  onMouseLeave={e => { if (!isAnswered) { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)' } }}
                >
                  {opt}
                </button>
              )
            })}
          </div>

          {isAnswered && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{
                fontWeight: 700, fontSize: 14,
                color: selectedOption === questions[currentIndex].answer ? 'var(--success)' : 'var(--danger)',
              }}>
                {selectedOption === questions[currentIndex].answer
                  ? 'Правильно!'
                  : `Неправильно. Верный ответ: ${questions[currentIndex].answer}`}
              </span>
              <button
                onClick={e => { goNext(); e.currentTarget.blur() }}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 12,
                  background: 'var(--accent-lime)', color: 'var(--on-accent)', cursor: 'pointer', outline: 'none',
                }}
              >
                {currentIndex + 1 >= total ? 'Завершить' : 'Следующая задача'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'finished' && (() => {
        const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0
        const message = pct >= 90
          ? 'Отлично!'
          : pct >= 50
            ? 'Хорошо!'
            : 'Нужно ещё потренироваться, и всё получится!'
        return (
          <div style={{
            border: '1px solid var(--border-color)', borderRadius: 12, background: 'var(--bg-secondary)',
            padding: 'clamp(24px, 5vw, 48px)', width: '100%', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, fontWeight: 800, color: 'var(--accent-lime)', marginBottom: 8 }}>{pct}%</div>
            <div style={{ fontSize: 13, color: 'var(--text-tertiary)', marginBottom: 16 }}>
              Правильно {correctCount} из {total}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>
              {message}
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button
                onClick={restart}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 12,
                  background: 'var(--accent-lime)', color: 'var(--on-accent)', cursor: 'pointer',
                }}
              >
                Пройти ещё раз
              </button>
              <button
                onClick={onBack}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: '1px solid var(--border-color)', borderRadius: 12,
                  background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer',
                }}
              >
                К тренировкам
              </button>
            </div>
          </div>
        )
      })()}

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться к тренировкам
        </button>
      </div>
    </section>
  )
}
