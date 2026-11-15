import { useState } from 'react'
import { api } from '../../api'
import QuizRunner from '../QuizRunner'

// Тест с автопроверкой: варианты ответа, результат виден сразу и сохраняется на сервере.
// Засчитывается с 70% верных ответов; пройти можно сколько угодно раз — хранится лучший результат.
export default function WinterAutoTest({ test, taskKey, title, server, onSaved }) {
  const [error, setError] = useState('')
  const total = test.questions.length
  const need = Math.ceil(total * 0.7)

  const save = async ({ score }) => {
    setError('')
    try {
      onSaved(await api.submitWinterHomework(taskKey, { kind: 'auto', title, score, total }))
    } catch (e) {
      setError(e.message || 'Результат не сохранился — пройди тест ещё раз, когда появится связь')
    }
  }

  const passed = server?.status === 'approved'

  return (
    <div className="wt-auto">
      <div className={`pq-status${server ? (passed ? ' is-approved' : ' is-rework') : ''}`}>
        <div className="pq-status-head">
          <span className="pq-status-badge">{server ? (passed ? 'Тест пройден' : 'Пока не пройден') : 'Тест с автопроверкой'}</span>
          {server && <span className="pq-status-date">лучший результат: {server.score} из {server.total}</span>}
        </div>
        <p>
          {total} вопросов, один верный вариант из четырёх. Тест засчитывается, если верных ответов не меньше {need}.
          {' '}Отправлять ничего не нужно: результат сохранится сам, а после завершения откроется разбор ошибок.
          {' '}Проходить можно сколько угодно раз — в зачёт идёт лучший результат.
        </p>
      </div>
      {error && <div className="pq-alert" role="alert">{error}</div>}
      <section className="prg-section">
        <QuizRunner quiz={{ ...test, id: `winter-${taskKey}` }} onFinish={save} />
      </section>
    </div>
  )
}
