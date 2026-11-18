import { useNavigate } from 'react-router-dom'
import { WINTER_MATH, isoOf, shortDate } from '../../data/winter/schedule'

// Три параллельных трека лагеря: основная программа, математика и английский.
// Плашки стоят наверху каждой из трёх страниц — так между ними можно переключаться,
// а их материалы и расписание не смешиваются.

export default function WinterTracks({ active, direction = null }) {
  const navigate = useNavigate()
  const today = isoOf(new Date())
  const nextMath = WINTER_MATH.find(s => s.date >= today)
  const items = [
    {
      key: 'main', url: '/winter-camp', title: 'Основная программа',
      text: direction ? direction.name : 'общие блоки и направление',
    },
    {
      key: 'math', url: '/winter-camp/math', title: 'Математика',
      text: nextMath ? `занятие ${nextMath.day} · ${shortDate(nextMath.date)}` : 'курс завершён · конспекты открыты',
    },
    { key: 'english', url: '/winter-camp/english', title: 'Английский', text: 'конспект-лонгрид · в своём темпе' },
  ]
  return (
    <nav className="wc-tracks" aria-label="Треки лагеря">
      {items.map(it => (
        <button
          key={it.key}
          type="button"
          className={`wc-track is-${it.key}${active === it.key ? ' is-active' : ''}`}
          aria-current={active === it.key ? 'page' : undefined}
          onClick={() => active !== it.key && navigate(it.url)}
        >
          <span className="wc-track-dot" aria-hidden="true" />
          <span className="wc-track-body">
            <span className="wc-track-title">
              {it.title}
              {it.key !== 'main' && <span className="wc-track-kicker">параллельный курс</span>}
            </span>
            <span className="wc-track-text">{it.text}</span>
          </span>
          {active !== it.key && <span className="wc-track-go" aria-hidden="true">→</span>}
        </button>
      ))}
    </nav>
  )
}
