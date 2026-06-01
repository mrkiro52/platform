import { LEADERS } from '../data'

function getInitials(name) {
  return name.split(' ').map(w => w[0] || '').join('').toUpperCase().slice(0, 2)
}

export default function Leaderboard() {
  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Рейтинг</h1>
        <p className="page-subtitle">Топ участников лагеря по очкам активности</p>
      </div>
      <div style={{ background:'var(--bg-secondary)', border:'1px solid var(--border-color)', borderRadius:10, padding:'14px 18px', marginBottom:20, fontSize:13, color:'var(--text-secondary)', lineHeight:1.6 }}>
        💡 Очки начисляются за выполнение заданий, посещение лекций, активность в чате и участие в проектах.
      </div>
      <div className="leaderboard-list">
        {LEADERS.map((l, i) => {
          const rank = i + 1
          const rankCls = rank === 1 ? 'leader-rank--gold' : rank === 2 ? 'leader-rank--silver' : rank === 3 ? 'leader-rank--bronze' : ''
          const initials = getInitials(l.name)
          return (
            <div key={i} className={`leader-row${l.me ? ' leader-row--me' : ''}`}>
              <div className={`leader-rank ${rankCls}`}>{rank}</div>
              <div className="leader-avatar">{initials}</div>
              <div className="leader-info">
                <div className="leader-name">
                  {l.name}
                  {l.me && <span style={{ fontSize:11, color:'var(--accent-lime)' }}> (ты)</span>}
                </div>
                <div className="leader-track">{l.track}</div>
              </div>
              <div style={{ textAlign:'right' }}>
                <div className="leader-pts">{l.pts}</div>
                <div className="leader-pts-label">очков</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
