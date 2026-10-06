import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../../api'
import { currentAutumnWeek } from '../../data/autumnWeeks'
import { nextMathSession, MATH_SESSIONS } from '../../data/mathCourse'
import { dayLabel } from '../../lib/dashEvents'
import { PROGRAM_PERIOD, directionOf } from '../../data/programs'

// Блок только для участников осеннего лагеря: текущая неделя,
// статус домашних заданий и быстрые действия.

export default function CampPanel({ user }) {
  const navigate = useNavigate()
  const [hw, setHw] = useState(null)

  useEffect(() => {
    let alive = true
    api.myHomework()
      .then(rows => { if (alive) setHw(rows) })
      .catch(() => { if (alive) setHw([]) })
    return () => { alive = false }
  }, [])

  const week = currentAutumnWeek()
  // В октябре вместо недель — индивидуальная программа по направлению
  const programMonth = week?.monthIdx === 9
  const dir = directionOf(user)
  const math = nextMathSession()
  const mathNumber = math ? MATH_SESSIONS.indexOf(math) + 1 : null

  const count = (status) => (hw || []).filter(r => r.status === status).length
  const rework = count('rework')
  const submitted = count('submitted')
  const approved = count('approved')

  return (
    <div className="widget dsh-camp">
      <div className="widget-header">
        <span className="widget-title">Осенний лагерь</span>
        <button type="button" className="widget-link dsh-link-btn" onClick={() => navigate('/autumn-camp')}>Открыть лагерь →</button>
      </div>

      <div className="dsh-camp-grid">
        {programMonth ? (
          <button
            type="button"
            className="dsh-camp-card is-week"
            onClick={() => navigate(dir ? '/autumn-camp/program' : '/autumn-camp')}
          >
            <span className="dsh-camp-label">Индивидуальная программа</span>
            <span className="dsh-camp-value">{dir ? dir.name : 'Ещё готовится'}</span>
            <span className="dsh-camp-sub">{PROGRAM_PERIOD}{dir ? ' · открыть →' : ''}</span>
          </button>
        ) : (
          <button
            type="button"
            className="dsh-camp-card is-week"
            onClick={() => navigate(week ? `/autumn-camp/${week.slug}` : '/autumn-camp')}
          >
            <span className="dsh-camp-label">Эта неделя</span>
            <span className="dsh-camp-value">{week ? `${week.monthLabel}, неделя ${week.indexInMonth}` : 'Лагерь на паузе'}</span>
            <span className="dsh-camp-sub">{week ? `${week.rangeText} · материалы →` : 'все материалы →'}</span>
          </button>
        )}

        <button
          type="button"
          className="dsh-camp-card"
          onClick={() => navigate('/autumn-camp/math')}
        >
          <span className="dsh-camp-label">Математика</span>
          <span className="dsh-camp-value">{math ? `Занятие ${mathNumber}` : 'Курс завершён'}</span>
          <span className="dsh-camp-sub">{math ? `${dayLabel(math.date)}, 20:00 МСК` : 'конспекты и записи →'}</span>
        </button>
      </div>

      <div className="dsh-hw">
        <div className="dsh-hw-head">
          <span className="dsh-camp-label">Домашние задания</span>
          {hw === null && <span className="dsh-muted-sm">загрузка…</span>}
        </div>
        {hw !== null && (
          hw.length === 0 ? (
            <p className="dsh-muted">Пока нет сданных задач. Начни с текущей недели — решение отправляется прямо на платформе.</p>
          ) : (
            <div className="dsh-hw-stats">
              <span className="dsh-hw-stat is-approved"><b>{approved}</b> принято</span>
              <span className="dsh-hw-stat is-submitted"><b>{submitted}</b> на проверке</span>
              <span className={`dsh-hw-stat is-rework${rework ? ' is-alert' : ''}`}><b>{rework}</b> нужны правки</span>
            </div>
          )
        )}
        {rework > 0 && (
          <button type="button" className="dsh-alert" onClick={() => navigate('/autumn-camp')}>
            {rework === 1 ? 'Одна задача ждёт' : `${rework} задачи ждут`} правок — посмотреть комментарии →
          </button>
        )}
      </div>

      <div className="dsh-camp-actions">
        <a href="/autumn-camp/upload-homework" target="_blank" rel="noopener" className="dsh-btn-primary">Сдать ДЗ</a>
        <button type="button" className="dsh-btn-secondary" onClick={() => navigate('/autumn-camp')}>Записаться на личный созвон</button>
      </div>
    </div>
  )
}
