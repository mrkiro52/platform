import { useState, useEffect, useRef, useCallback } from 'react'
import { CARDS } from '../antireels/cards'
import { Card } from '../antireels/CardKit'

function pickRandom(excludeArr) {
  const ex = new Set(excludeArr)
  const avail = CARDS.map((_, i) => i).filter(i => !ex.has(i))
  const pool = avail.length ? avail : CARDS.map((_, i) => i)
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function AntiReels() {
  // sequence — упорядоченный список показанных карточек (он же «просмотренные»)
  const [sequence, setSequence] = useState([])
  const [pos, setPos] = useState(0)
  const [loading, setLoading] = useState(false)
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  // При входе во вкладку — пустой массив просмотренных, показываем случайную карточку
  useEffect(() => {
    setSequence([pickRandom([])])
    setPos(0)
    setLoading(false)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const goNext = useCallback(() => {
    if (loading || !sequence.length) return
    if (pos < sequence.length - 1) { setPos(pos + 1); return }
    // мы в конце истории
    if (sequence.length >= CARDS.length) {
      // посмотрели весь контент → обнуляем просмотренные и начинаем заново
      setSequence([pickRandom([])]); setPos(0); return
    }
    const next = pickRandom(sequence)
    setSequence([...sequence, next]); setPos(pos + 1)
  }, [loading, sequence, pos])

  const goPrev = useCallback(() => {
    if (loading || !sequence.length) return
    if (pos > 0) { setPos(pos - 1); return }
    // первая карточка + листание вверх → лоадер 1с и обнуление просмотренных
    setLoading(true)
    setTimeout(() => {
      setSequence([pickRandom([])]); setPos(0); setLoading(false)
    }, 1000)
  }, [loading, sequence, pos])

  // Колесо мыши (десктоп) с троттлингом
  const lastWheel = useRef(0)
  const onWheel = useCallback((e) => {
    const now = Date.now()
    if (now - lastWheel.current < 500) return
    lastWheel.current = now
    if (e.deltaY > 10) goNext()
    else if (e.deltaY < -10) goPrev()
  }, [goNext, goPrev])

  // Свайп (мобильные)
  const touchStartY = useRef(null)
  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
  const onTouchEnd = (e) => {
    if (touchStartY.current == null) return
    const delta = e.changedTouches[0].clientY - touchStartY.current
    if (Math.abs(delta) > 45) {
      if (delta < 0) goNext()  // свайп вверх → следующая
      else goPrev()            // свайп вниз → предыдущая
    }
    touchStartY.current = null
  }

  // Стрелки клавиатуры
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); goNext() }
      else if (e.key === 'ArrowUp') { e.preventDefault(); goPrev() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const currentIdx = sequence[pos]
  const card = currentIdx != null ? CARDS[currentIdx] : null

  return (
    <section className="page active reels-page">
      <div className="reels-stage">
        <div
          className="reels-box"
          onWheel={mobile ? undefined : onWheel}
          onTouchStart={mobile ? onTouchStart : undefined}
          onTouchEnd={mobile ? onTouchEnd : undefined}
        >
          {loading || !card ? (
            <div className="reels-loader">
              <div className="reels-spinner" />
            </div>
          ) : (
            <div className="reels-card-anim" key={`${currentIdx}-${pos}`}>
              <Card track={card.track} title={card.title}>{card.body}</Card>
            </div>
          )}

          {/* Индикатор прогресса просмотра */}
          <div className="reels-progress">{sequence.length} / {CARDS.length}</div>
        </div>

        {!mobile && (
          <div className="reels-controls">
            <button className="reels-nav-btn" onClick={goPrev} title="Вверх" aria-label="Вверх">▲</button>
            <button className="reels-nav-btn" onClick={goNext} title="Вниз" aria-label="Вниз">▼</button>
          </div>
        )}
      </div>

      {!mobile && (
        <p className="reels-hint">Листай карточки кнопками, колесом мыши или стрелками ↑ ↓</p>
      )}
    </section>
  )
}
