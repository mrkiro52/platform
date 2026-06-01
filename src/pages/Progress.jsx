const SKILLS = [
  { name:'Алгоритмы',       pct:35 },
  { name:'Структуры данных', pct:40 },
  { name:'Git / Linux',      pct:10 },
  { name:'Frontend',         pct:5 },
  { name:'Python',           pct:0 },
  { name:'Карьера / CV',     pct:0 },
]

const WEEKS = [
  { label:'Неделя 1', pct:60, done:true },
  { label:'Неделя 2', pct:0,  done:false },
  { label:'Неделя 3', pct:0,  done:false },
  { label:'Неделя 4', pct:0,  done:false },
  { label:'Неделя 5', pct:0,  done:false },
]

const ACHIEVEMENTS = [
  { icon:'🚀', name:'Первый вход',        locked:false },
  { icon:'🔥', name:'Стрик 3 дня',        locked:false },
  { icon:'📚', name:'Первый материал',     locked:false },
  { icon:'⚡', name:'Стрик 7 дней',        locked:true  },
  { icon:'🏅', name:'Неделя 1 завершена',  locked:true  },
  { icon:'💡', name:'10 задач решено',     locked:true  },
  { icon:'🤝', name:'Первый проект',       locked:true  },
  { icon:'🎯', name:'Трек выбран',         locked:true  },
]

export default function Progress() {
  return (
    <section className="page active">
      <div className="page-header">
        <h1 className="page-title">Прогресс</h1>
        <p className="page-subtitle">Твои достижения и прогресс по программе</p>
      </div>

      <div className="progress-grid">
        <div className="widget" style={{ gridColumn:'1/-1' }}>
          <div className="widget-title" style={{ marginBottom:16 }}>Общий прогресс лагеря</div>
          <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:10 }}>
            <div style={{ flex:1 }}>
              <div className="progress-bar" style={{ height:12 }}>
                <div className="progress-fill" style={{ width:'8%' }} />
              </div>
            </div>
            <div style={{ fontFamily:'var(--font-syne)', fontSize:20, fontWeight:800, color:'var(--accent-lime)', whiteSpace:'nowrap' }}>
              Неделя 1 / 12
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(12,1fr)', gap:4, marginTop:14 }}>
            <div style={{ height:28, borderRadius:4, background:'rgba(200,255,0,0.7)' }} title="Нед. 1 — в процессе" />
            {Array.from({ length: 11 }).map((_, i) => (
              <div key={i} style={{ height:28, borderRadius:4, background:'var(--border-color)' }} />
            ))}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:4 }}>
            <span style={{ fontSize:10, color:'var(--text-tertiary)' }}>Июнь</span>
            <span style={{ fontSize:10, color:'var(--text-tertiary)' }}>Июль</span>
            <span style={{ fontSize:10, color:'var(--text-tertiary)' }}>Август</span>
          </div>
        </div>

        <div className="widget">
          <div className="widget-section-title">Навыки</div>
          {SKILLS.map(s => (
            <div key={s.name} className="skill-row">
              <span className="skill-name">{s.name}</span>
              <div className="skill-bar">
                <div className="skill-fill" style={{ width:`${s.pct}%` }} />
              </div>
              <span className="skill-pct">{s.pct}%</span>
            </div>
          ))}
        </div>

        <div className="widget">
          <div className="widget-section-title">По неделям</div>
          <div className="week-progress-list">
            {WEEKS.map(w => (
              <div key={w.label} className="week-row">
                <span className="week-num">{w.label}</span>
                <div className="week-bar">
                  <div className="week-fill" style={{ width:`${w.pct}%` }} />
                </div>
                <span className="skill-pct">{w.done ? `${w.pct}%` : '—'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="widget" style={{ gridColumn:'1/-1' }}>
          <div className="widget-section-title">Достижения</div>
          <div className="achievement-grid">
            {ACHIEVEMENTS.map((a, i) => (
              <div key={i} className={`achievement${a.locked ? ' achievement--locked' : ''}`}>
                <div className="achievement-icon">{a.icon}</div>
                <div className="achievement-name">{a.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
