import { useParams, useNavigate } from 'react-router-dom'
import { homeworkOf } from '../data/math'
import { MATH_SESSIONS } from '../data/mathCourse'
import MathExpr, { MathCases } from '../components/MathExpr'
import MathBlocks, { MathText } from '../components/MathContent'

const LETTERS = ['а', 'б', 'в', 'г', 'д', 'е']

function Item({ item, index }) {
  return (
    <li className="math-hw-item">
      <span className="math-hw-num">{index + 1})</span>
      <div className="math-hw-body">
        {item.v && <span className="math-hw-text"><MathText>{item.v}</MathText></span>}
        {item.m && <MathExpr>{item.m}</MathExpr>}
        {item.cases && <MathCases lines={item.cases} />}
        {item.note && <span className="math-hw-note"><MathText>{item.note}</MathText></span>}
        {item.sub && (
          <ol className="math-hw-sub">
            {item.sub.map((line, i) => (
              <li key={i}><span className="math-hw-sub-letter">{LETTERS[i]})</span><span className="math-hw-sub-text"><MathText>{line}</MathText></span></li>
            ))}
          </ol>
        )}
      </div>
    </li>
  )
}

// «блок», «блока», «блоков»
function blocksWord(n) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'блок'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'блока'
  return 'блоков'
}

function tasksWord(n) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return 'задача'
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 'задачи'
  return 'задач'
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
          <span className="math-hw-count">
            {homework.parts.length} {blocksWord(homework.parts.length)} · {total} {tasksWord(total)}
          </span>
        </div>
        <p className="math-p" style={{ margin: 0 }}>{homework.howto}</p>
      </div>

      {homework.parts.map(part => (
        <div key={part.n} className={`widget math-hw-part${part.star ? ' is-star' : ''}`}>
          <h2 className="math-section-title">
            <span className="math-section-num">{part.n}</span>
            {part.title}
            {part.star && <span className="math-hw-optional">по желанию</span>}
          </h2>
          {part.hint && <p className="math-hw-hint"><MathText>{part.hint}</MathText></p>}
          {part.ref && (
            <div className="math-ref">
              <div className="math-ref-title">{part.ref.title}</div>
              <MathBlocks blocks={part.ref.blocks} />
            </div>
          )}
          {part.lead && <p className="math-hw-hint"><MathText>{part.lead}</MathText></p>}
          <ol className="math-hw-list">
            {part.items.map((item, i) => <Item key={i} item={item} index={i} />)}
          </ol>
        </div>
      ))}
    </section>
  )
}
