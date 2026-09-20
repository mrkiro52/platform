import { useState, useEffect } from 'react'

// Онлайн-тест: один вопрос на экране, можно ходить назад и менять ответ,
// в конце — результат и разбор каждой ошибки. Ничего никуда не отправляется.

function storageKey(quizId) { return `kiro_quiz_${quizId}` }

function loadResult(quizId) {
  try { return JSON.parse(localStorage.getItem(storageKey(quizId))) } catch { return null }
}

const LETTERS = ['А', 'Б', 'В', 'Г']

export default function QuizRunner({ quiz }) {
  const total = quiz.questions.length
  const [answers, setAnswers] = useState(() => Array(total).fill(null))
  const [current, setCurrent] = useState(0)
  const [finished, setFinished] = useState(false)
  const [lastResult, setLastResult] = useState(() => loadResult(quiz.id))

  // Прошлый результат показываем до старта, чтобы человек видел свой прогресс
  useEffect(() => { setLastResult(loadResult(quiz.id)) }, [quiz.id])

  const answered = answers.filter(a => a !== null).length
  const question = quiz.questions[current]

  const choose = (index) => {
    setAnswers(prev => {
      const next = [...prev]
      next[current] = index
      return next
    })
  }

  const finish = () => {
    const score = answers.reduce((sum, a, i) => sum + (a === quiz.questions[i].correct ? 1 : 0), 0)
    const result = { score, total, date: new Date().toISOString() }
    try { localStorage.setItem(storageKey(quiz.id), JSON.stringify(result)) } catch { /* не критично */ }
    setLastResult(result)
    setFinished(true)
  }

  const restart = () => {
    setAnswers(Array(total).fill(null))
    setCurrent(0)
    setFinished(false)
  }

  // ── Экран результата ──────────────────────────────────────────────
  if (finished) {
    const score = answers.reduce((sum, a, i) => sum + (a === quiz.questions[i].correct ? 1 : 0), 0)
    const wrong = quiz.questions
      .map((q, i) => ({ q, i, given: answers[i] }))
      .filter(x => x.given !== x.q.correct)

    return (
      <div className="quiz">
        <div className={`quiz-score${score === total ? ' is-perfect' : ''}`}>
          <div className="quiz-score-value">{score}/{total}</div>
          <div className="quiz-score-label">
            {score === total ? 'Всё верно — тема закрыта'
              : score >= total * 0.7 ? 'Хороший результат, разбери ошибки ниже'
              : 'Стоит перечитать главы и пройти ещё раз'}
          </div>
        </div>

        {wrong.length === 0 ? (
          <p className="quiz-hint">Ни одной ошибки — разбирать нечего.</p>
        ) : (
          <>
            <div className="quiz-report-title">Разбор ошибок — {wrong.length} из {total}</div>
            <div className="quiz-report">
              {wrong.map(({ q, i, given }) => (
                <div key={i} className="quiz-report-item">
                  <div className="quiz-report-num">Вопрос {i + 1}</div>
                  <div className="quiz-report-q">{q.q}</div>

                  <div className="quiz-report-answer is-wrong">
                    <span className="quiz-report-mark">✕</span>
                    <span>
                      <b>Твой ответ:</b> {given === null ? 'без ответа' : q.options[given]}
                    </span>
                  </div>
                  <div className="quiz-report-answer is-right">
                    <span className="quiz-report-mark">✓</span>
                    <span><b>Правильно:</b> {q.options[q.correct]}</span>
                  </div>

                  <div className="quiz-report-why">{q.explanation}</div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="quiz-actions">
          <button type="button" className="btn-ghost" onClick={restart}>Пройти заново</button>
        </div>
      </div>
    )
  }

  // ── Экран вопроса ─────────────────────────────────────────────────
  return (
    <div className="quiz">
      <div className="quiz-head">
        <span className="quiz-progress">Вопрос {current + 1} из {total}</span>
        <span className="quiz-answered">Отвечено: {answered} из {total}</span>
      </div>

      <div className="quiz-bar">
        <div className="quiz-bar-fill" style={{ width: `${((current + 1) / total) * 100}%` }} />
      </div>

      {lastResult && current === 0 && answered === 0 && (
        <div className="quiz-prev">Прошлый результат: {lastResult.score}/{lastResult.total}</div>
      )}

      <div className="quiz-question">{question.q}</div>

      <div className="quiz-options">
        {question.options.map((option, i) => (
          <button
            key={i}
            type="button"
            className={`quiz-option${answers[current] === i ? ' is-chosen' : ''}`}
            onClick={() => choose(i)}
          >
            <span className="quiz-option-letter">{LETTERS[i]}</span>
            <span className="quiz-option-text">{option}</span>
          </button>
        ))}
      </div>

      <div className="quiz-nav">
        <button
          type="button"
          className="btn-ghost"
          disabled={current === 0}
          onClick={() => setCurrent(c => c - 1)}
        >
          ← Назад
        </button>

        <div className="quiz-dots">
          {quiz.questions.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`quiz-dot${i === current ? ' is-current' : ''}${answers[i] !== null ? ' is-answered' : ''}`}
              onClick={() => setCurrent(i)}
              title={`Вопрос ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {current < total - 1 ? (
          <button type="button" className="btn-primary quiz-next" onClick={() => setCurrent(c => c + 1)}>
            Далее →
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary quiz-next"
            disabled={answered < total}
            onClick={finish}
            title={answered < total ? 'Ответь на все вопросы' : undefined}
          >
            Завершить
          </button>
        )}
      </div>

      {answered < total && current === total - 1 && (
        <p className="quiz-hint">
          Осталось без ответа: {total - answered}. Вернись к вопросам с серыми номерами.
        </p>
      )}
    </div>
  )
}
