import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { WINTER, WINTER_MATH, campProgress, currentWinterWeek, humanDate, isoOf, rangeLabel, shortDate } from '../../data/winter/schedule'
import { winterDirectionOf, winterTasks } from '../../data/winter'
import { summarize, useWinterHomework } from '../winter/useWinterHomework'

// Блок дэшборда для участников зимнего лагеря: где мы сейчас, математика
// и прогресс по домашним заданиям.

export default function WinterPanel({ user }) {
  const navigate = useNavigate()
  const homework = useWinterHomework(true)
  const direction = winterDirectionOf(user)
  const tasks = useMemo(() => winterTasks(direction?.key).filter(t => t.required), [direction?.key])
  const sum = summarize(tasks, homework.byKey)
  const now = new Date()
  const progress = campProgress(now)
  const week = currentWinterWeek(now)
  const math = WINTER_MATH.find(s => s.date >= isoOf(now))

  return (
    <div className="widget dsh-camp dsh-winter">
      <div className="widget-header">
        <span className="widget-title">❄ Зимний лагерь</span>
        <button type="button" className="widget-link dsh-link-btn" onClick={() => navigate('/winter-camp')}>Открыть лагерь →</button>
      </div>

      <div className="dsh-camp-grid">
        <button type="button" className="dsh-camp-card is-week" onClick={() => navigate('/winter-camp')}>
          <span className="dsh-camp-label">{progress.phase === 'before' ? 'До старта' : progress.phase === 'after' ? 'Лагерь завершён' : `День ${progress.day} из ${progress.total}`}</span>
          <span className="dsh-camp-value">
            {progress.phase === 'before' ? `${progress.daysTo} дн. · старт ${humanDate(WINTER.start)}` : week ? `Неделя ${week.n}` : 'Материалы открыты'}
          </span>
          <span className="dsh-camp-sub">
            {progress.phase === 'before' ? 'материалы уже открыты →' : week ? `${rangeLabel(week.start, week.end)} · ${week.focus}` : 'программа и конспекты →'}
          </span>
        </button>

        <button type="button" className="dsh-camp-card" onClick={() => navigate('/winter-camp/math')}>
          <span className="dsh-camp-label">Математика</span>
          <span className="dsh-camp-value">{math ? `Занятие ${math.day}` : 'Курс завершён'}</span>
          <span className="dsh-camp-sub">{math ? `${shortDate(math.date)}, 20:00 МСК` : 'конспекты и записи →'}</span>
        </button>
      </div>

      <div className="dsh-hw">
        <div className="dsh-hw-head">
          <span className="dsh-camp-label">Домашние задания{direction ? ` · ${direction.short}` : ''}</span>
          {homework.loading && <span className="dsh-muted-sm">загрузка…</span>}
        </div>
        {!homework.loading && (
          <>
            <div className="dsh-winter-bar" aria-hidden="true">
              {sum.total > 0 && <>
                <span className="is-approved" style={{ width: `${(sum.approved / sum.total) * 100}%` }} />
                <span className="is-submitted" style={{ width: `${(sum.submitted / sum.total) * 100}%` }} />
                <span className="is-rework" style={{ width: `${(sum.rework / sum.total) * 100}%` }} />
              </>}
            </div>
            <div className="dsh-hw-stats">
              <span className="dsh-hw-stat is-approved"><b>{sum.approved}</b> из {sum.total} принято</span>
              <span className="dsh-hw-stat is-submitted"><b>{sum.submitted}</b> на проверке</span>
              <span className={`dsh-hw-stat is-rework${sum.rework ? ' is-alert' : ''}`}><b>{sum.rework}</b> нужны правки</span>
            </div>
          </>
        )}
      </div>

      <div className="dsh-camp-actions">
        <button type="button" className="dsh-btn-primary" onClick={() => navigate('/winter-camp')}>Продолжить обучение</button>
        <button type="button" className="dsh-btn-secondary" onClick={() => navigate('/winter-camp#calendar')}>Календарь событий</button>
      </div>
    </div>
  )
}
