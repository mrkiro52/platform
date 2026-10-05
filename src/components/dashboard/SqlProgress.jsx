import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'

// SQL-тренажёр: прогресс, если человек уже решал, иначе — приглашение.

// «WHERE: фильтрация строк» → «WHERE»: в кнопке хватает названия темы
const shortTitle = (title) => title.split(':')[0]

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

export default function SqlProgress({ user }) {
  const navigate = useNavigate()
  const [data, setData] = useState(null)

  useEffect(() => {
    let alive = true
    api.sqlTrainer()
      .then(d => { if (alive) setData(d) })
      .catch(() => { if (alive) setData({ failed: true }) })
    return () => { alive = false }
  }, [])

  const open = () => navigate('/trainings/sql')

  if (!data) {
    return <div className="widget dsh-sql"><div className="dsh-skeleton" style={{ height: 120 }} /></div>
  }

  const categories = data.categories || []
  const solvedSet = new Set(data.solved || [])
  const total = categories.reduce((n, c) => n + c.tasks.length, 0) || 90
  const solved = categories.reduce((n, c) => n + c.tasks.filter(t => solvedSet.has(t.id)).length, 0)

  if (data.failed || solved === 0) {
    return (
      <div className="widget dsh-sql is-promo">
        <div className="dsh-sql-promo">
          <div className="dsh-sql-badge">SQL</div>
          <div className="dsh-sql-promo-body">
            <div className="dsh-sql-title">SQL-тренажёр</div>
            <p className="dsh-sql-text">
              {total} задач на настоящей базе маркетплейса: 4 000 клиентов, 15 000 заказов, пропуски и грязные данные как в жизни.
              От SELECT до оконных функций — запрос проверяется сразу.
            </p>
          </div>
        </div>
        <button type="button" className="dsh-btn-primary" onClick={open}>Начать решать</button>
      </div>
    )
  }

  const pct = Math.round((solved / total) * 100)
  const left = total - solved
  const nextTopic = categories.find(c => c.tasks.some(t => !solvedSet.has(t.id)))
  const place = (data.leaderboard || []).findIndex(l => l.id === user?.id) + 1

  return (
    <div className="widget dsh-sql">
      <div className="widget-header">
        <span className="widget-title">SQL-тренажёр</span>
        {place > 0 && <span className="dsh-place">{place} место в топе</span>}
      </div>

      <div className="dsh-sql-summary">
        <div className="dsh-sql-big">{solved}<span>/{total}</span></div>
        <div className="dsh-sql-summary-text">
          <div className="dsh-progress"><div style={{ width: `${pct}%` }} /></div>
          <div className="dsh-muted-sm">
            {left > 0
              ? `Решено ${pct}%. Осталось ${left} ${plural(left, 'задача', 'задачи', 'задач')}`
              : 'Все задачи решены — тренажёр пройден целиком!'}
          </div>
        </div>
      </div>

      <button type="button" className="dsh-btn-primary" onClick={open}>
        {left > 0 ? `Продолжить${nextTopic ? ` · ${shortTitle(nextTopic.title)}` : ''}` : 'Открыть тренажёр'}
      </button>
    </div>
  )
}
