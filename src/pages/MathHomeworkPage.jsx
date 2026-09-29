import { useParams, useNavigate } from 'react-router-dom'
import { homeworkOf } from '../data/math'
import { MATH_SESSIONS } from '../data/mathCourse'
import MathExpr, { MathCases } from '../components/MathExpr'
import { MathText } from '../components/MathContent'

function Item({ item, index }) {
  return (
    <li className="math-hw-item">
      <span className="math-hw-num">{index + 1})</span>
      <div className="math-hw-body">
        {item.v && <span className="math-hw-text"><MathText>{item.v}</MathText></span>}
        {item.m && <MathExpr>{item.m}</MathExpr>}
        {item.cases && <MathCases lines={item.cases} />}
      </div>
    </li>
  )
}

export default function MathHomeworkPage() {
  const { day } = useParams()
  const navigate = useNavigate()
  const dayNum = Number(String(day).replace('day', ''))
  const homework = homeworkOf(dayNum)
  const session = MATH_SESSIONS[dayNum - 1]

  if (!homework) {
    return (
      <section className="page active">
        <button className="math-back" onClick={() => navigate('/autumn-camp/math')}>
          ← Мини-курс: математика
        </button>
        <div className="page-header"><h1 className="page-title">Задание пока не готово</h1></div>
        <div className="widget">
          <p className="math-p">
            Домашнее задание этого занятия появится здесь после созвона{session ? ` (${session.topic})` : ''}.
          </p>
        </div>
      </section>
    )
  }

  const total = homework.parts.reduce((sum, part) => sum + part.items.length, 0)

  return (
    <section className="page active">
      <button className="math-back" onClick={() => navigate('/autumn-camp/math')}>
        ← Мини-курс: математика
      </button>

      <div className="page-header">
        <h1 className="page-title">{homework.title}</h1>
        <p className="page-subtitle">{homework.subtitle}</p>
      </div>

      <div className="widget" style={{ marginBottom: 18 }}>
        <div className="math-hw-meta">
          <span className="math-hw-count">{homework.parts.length} блока · {total} задач</span>
        </div>
        <p className="math-p" style={{ margin: 0 }}>{homework.howto}</p>
      </div>

      {homework.parts.map(part => (
        <div key={part.n} className="widget math-hw-part">
          <h2 className="math-section-title">
            <span className="math-section-num">{part.n}</span>
            {part.title}
          </h2>
          {part.hint && <p className="math-hw-hint">{part.hint}</p>}
          <ol className="math-hw-list">
            {part.items.map((item, i) => <Item key={i} item={item} index={i} />)}
          </ol>
        </div>
      ))}
    </section>
  )
}
