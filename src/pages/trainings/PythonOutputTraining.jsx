import { useState } from 'react'
import { PYTHON_OUTPUT_POOL } from '../../data/pythonOutputTraining'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function normalize(str) {
  return str
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .join('\n')
    .trim()
}

const COUNT_OPTIONS = [5, 10]

const fieldStyle = {
  width: '100%',
  minHeight: 110,
  background: 'var(--bg-tertiary)',
  border: '1px solid var(--border-color)',
  borderRadius: 0,
  padding: '12px 14px',
  fontSize: 14,
  fontFamily: 'ui-monospace, monospace',
  color: 'var(--text-primary)',
  outline: 'none',
  resize: 'vertical',
}

export default function PythonOutputTraining({ onBack }) {
  const [phase, setPhase] = useState('select') // select | question | finished
  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isAnswered, setIsAnswered] = useState(false)
  const [lastCorrect, setLastCorrect] = useState(false)

  const startTraining = (count) => {
    const picked = shuffle(PYTHON_OUTPUT_POOL).slice(0, count)
    setQuestions(picked)
    setCurrentIndex(0)
    setResults([])
    setInputValue('')
    setIsAnswered(false)
    setPhase('question')
  }

  const handleCheck = () => {
    if (isAnswered || !inputValue.trim()) return
    const current = questions[currentIndex]
    const correct = normalize(inputValue) === normalize(current.answer)
    setLastCorrect(correct)
    setIsAnswered(true)
    setResults(prev => [...prev, { correct }])
  }

  const goNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setPhase('finished')
      return
    }
    setCurrentIndex(i => i + 1)
    setInputValue('')
    setIsAnswered(false)
  }

  const restart = () => {
    setPhase('select')
    setQuestions([])
    setResults([])
    setCurrentIndex(0)
    setInputValue('')
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
        <span className="breadcrumb-current">Что выведет? (Python)</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">Что выведет? (Python)</h1>
        <p className="page-subtitle">Смотри на код и пиши, что именно он напечатает в консоль</p>
      </div>

      {phase === 'select' && (
        <div style={{
          border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
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
                  border: '1px solid var(--border-color)', borderRadius: 0,
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
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 20,
            border: '1px solid var(--border-color)', borderRadius: 0, padding: '12px 16px',
            background: 'var(--bg-tertiary)', fontSize: 13,
          }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>Всего: {total}</span>
            <span style={{ color: 'var(--accent-lime)' }}>Правильно: {correctCount}</span>
            <span style={{ color: '#ff3333' }}>Неправильно: {incorrectCount}</span>
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

          <div style={{ marginBottom: 16 }}>
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isAnswered}
              placeholder="Впиши сюда, что выведет этот код (каждая строка — с новой строки)"
              style={{ ...fieldStyle, opacity: isAnswered ? 0.7 : 1 }}
            />
          </div>

          {!isAnswered && (
            <button
              onClick={e => { handleCheck(); e.currentTarget.blur() }}
              disabled={!inputValue.trim()}
              style={{
                padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 0,
                background: 'var(--accent-lime)', color: '#fff', outline: 'none',
                cursor: inputValue.trim() ? 'pointer' : 'not-allowed', opacity: inputValue.trim() ? 1 : 0.5,
              }}
            >
              Проверить
            </button>
          )}

          {isAnswered && (
            <div>
              <div style={{
                marginBottom: 12, padding: '12px 14px', border: `1px solid ${lastCorrect ? 'var(--accent-lime)' : '#ff3333'}`,
                background: lastCorrect ? 'rgba(32,190,255,0.06)' : 'rgba(255,51,51,0.06)',
              }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: lastCorrect ? 'var(--accent-lime)' : '#ff3333', marginBottom: lastCorrect ? 0 : 8 }}>
                  {lastCorrect ? 'Правильно!' : 'Неправильно'}
                </div>
                {!lastCorrect && (
                  <div>
                    <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 4 }}>Правильный ответ:</div>
                    <pre style={{ margin: 0, fontFamily: 'ui-monospace, monospace', fontSize: 13, color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                      {questions[currentIndex].answer}
                    </pre>
                  </div>
                )}
              </div>
              <button
                onClick={e => { goNext(); e.currentTarget.blur() }}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 0,
                  background: 'var(--accent-lime)', color: '#fff', cursor: 'pointer', outline: 'none',
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
            border: '1px solid var(--border-color)', borderRadius: 0, background: 'var(--bg-secondary)',
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
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 0,
                  background: 'var(--accent-lime)', color: '#fff', cursor: 'pointer', outline: 'none',
                }}
              >
                Пройти ещё раз
              </button>
              <button
                onClick={onBack}
                style={{
                  padding: '10px 24px', fontSize: 14, fontWeight: 600, border: '1px solid var(--border-color)', borderRadius: 0,
                  background: 'transparent', color: 'var(--text-secondary)', cursor: 'pointer', outline: 'none',
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
