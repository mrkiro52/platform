import { useState } from 'react'
import { DAILY_QUESTIONS, questionIndexFor } from '../../data/dailyQuestions'

// Вопрос дня: один вопрос с собеседования, ответ скрыт до нажатия.

export default function DailyQuestion() {
  const [index, setIndex] = useState(questionIndexFor)
  const [open, setOpen] = useState(false)
  const item = DAILY_QUESTIONS[index]
  const isToday = index === questionIndexFor()

  const next = () => {
    setIndex(i => (i + 1) % DAILY_QUESTIONS.length)
    setOpen(false)
  }

  return (
    <div className="widget dsh-question">
      <div className="widget-header">
        <span className="widget-title">{isToday ? 'Вопрос дня' : 'Ещё вопрос'}</span>
        <span className="dsh-chip">{item.topic}</span>
      </div>
      <p className="dsh-question-q">{item.q}</p>
      {open
        ? <p className="dsh-question-a">{item.a}</p>
        : <p className="dsh-muted">Сначала ответь сам — вслух или в заметках, потом сверься.</p>}
      <div className="dsh-question-btns">
        {!open && <button type="button" className="dsh-btn-secondary" onClick={() => setOpen(true)}>Показать ответ</button>}
        <button type="button" className="dsh-btn-ghost" onClick={next}>Следующий вопрос</button>
      </div>
    </div>
  )
}
