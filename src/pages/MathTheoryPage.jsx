import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { theoryOf } from '../data/math'
import { MATH_SESSIONS } from '../data/mathCourse'
import MathBlocks, { MathText } from '../components/MathContent'
import { MathCases } from '../components/MathExpr'

function Task({ task, index }) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`math-task${open ? ' is-open' : ''}`}>
      <div className="math-task-head">
        <span className="math-task-num">Задача {index + 1}</span>
      </div>
      <p className="math-p"><MathText>{task.statement}</MathText></p>
      {task.statementCases && <MathCases lines={task.statementCases} />}

      <button className="math-task-toggle" onClick={() => setOpen(o => !o)}>
        {open ? 'Скрыть решение' : 'Показать решение'}
      </button>

      <div className="math-task-solution">
        <div className="math-task-solution-inner">
          <span className="math-solution-label">Решение</span>
          <MathBlocks blocks={task.solution} />
        </div>
      </div>
    </div>
  )
}

export default function MathTheoryPage() {
  const { day } = useParams()
  const navigate = useNavigate()
  const dayNum = Number(String(day).replace('day', ''))
  const theory = theoryOf(dayNum)
  const session = MATH_SESSIONS[dayNum - 1]

  if (!theory) {
    return (
      <section className="page active">
        <button className="math-back" onClick={() => navigate('/autumn-camp/math')}>
          ← Мини-курс: математика
        </button>
        <div className="page-header"><h1 className="page-title">Конспект пока не готов</h1></div>
        <div className="widget">
          <p className="math-p">
            Материал этого занятия появится здесь после созвона{session ? ` (${session.topic})` : ''}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="page active">
      <button className="math-back" onClick={() => navigate('/autumn-camp/math')}>
        ← Мини-курс: математика
      </button>

      <div className="page-header">
        <h1 className="page-title">Конспект занятия {theory.day}</h1>
        <p className="page-subtitle">{theory.title}</p>
      </div>

      <div className="widget" style={{ marginBottom: 18 }}>
        <p className="math-p" style={{ marginTop: 0 }}>{theory.lead}</p>
        <div className="math-goals-label">К концу занятия ты должен уметь</div>
        <ul className="math-goals">
          {theory.goals.map((goal, i) => <li key={i}>{goal}</li>)}
        </ul>
      </div>

      {/* Оглавление: девять подтем по нарастанию сложности */}
      <div className="widget math-toc">
        <div className="widget-header"><span className="widget-title">Содержание</span></div>
        <ol className="math-toc-list">
          {theory.sections.map(s => (
            <li key={s.id}>
              <a href={`#${s.id}`}>{s.title}</a>
            </li>
          ))}
        </ol>
      </div>

      {theory.sections.map((section, i) => (
        <div key={section.id} id={section.id} className="widget math-section">
          <h2 className="math-section-title">
            <span className="math-section-num">{i + 1}</span>
            {section.title}
          </h2>

          <MathBlocks blocks={section.blocks} />

          {section.tasks.map((task, j) => <Task key={j} task={task} index={j} />)}
        </div>
      ))}

      <div className="widget math-outro">
        <div className="widget-header"><span className="widget-title">Итог занятия</span></div>
        <p className="math-p" style={{ margin: 0 }}>{theory.outro}</p>
      </div>
    </section>
  )
}
