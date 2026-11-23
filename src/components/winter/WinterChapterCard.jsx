import { Link } from 'react-router-dom'
import { chapterUrl } from '../../data/winter/route'
import { HW_LABEL } from './useWinterHomework'

export default function WinterChapterCard({ entry, homework }) {
  const { ch, number } = entry
  const hasTask = Boolean(ch.task || ch.taskOnly)
  const status = hasTask ? homework?.status : null
  const tone = status === 'failed' ? 'rework' : status
  const theory = chapterUrl(entry, false)
  const task = chapterUrl(entry, true)

  return (
    <article className={`wc-ch${tone ? ' is-' + tone : ''}${ch.optional ? ' is-optional' : ''}`}>
      <div className="wc-ch-main">
        <div className="wc-ch-top">
          <span className="wc-ch-num">{ch.label || String(number).padStart(2, '0')}</span>
          {(status || ch.optional) && <span className="wc-ch-state">{status ? HW_LABEL[status] : 'По желанию'}</span>}
        </div>
        <strong className="wc-ch-title">{ch.title}</strong>
        {ch.video && <a className="wc-link" href={ch.video} target="_blank" rel="noopener noreferrer">{ch.videoLabel || 'Запись встречи'}</a>}
      </div>
      <div className="wc-ch-actions">
        {ch.taskOnly ? <button type="button" className="wc-ch-btn" disabled>Теория</button>
          : <Link className="wc-ch-btn" to={theory} aria-label={`Теория: ${ch.title}`}>Теория</Link>}
        {hasTask && <Link className="wc-ch-btn is-task" to={task} aria-label={`Задание: ${ch.title}`}>Задание</Link>}
      </div>
    </article>
  )
}
