import { useState, useEffect, useRef, useCallback } from 'react'
import { CARDS } from '../antireels/cards'
import { Card } from '../antireels/CardKit'

const SLIDE_MS = 380

function pickRandom(excludeArr) {
  const ex = new Set(excludeArr)
  const avail = CARDS.map((_, i) => i).filter(i => !ex.has(i))
  const pool = avail.length ? avail : CARDS.map((_, i) => i)
  return pool[Math.floor(Math.random() * pool.length)]
}

function CardView({ idx }) {
  const card = CARDS[idx]
  return <Card track={card.track} title={card.title}>{card.body}</Card>
}

export default function AntiReels() {
  // sequence — упорядоченный список показанных/готовых карточек (он же «просмотренные»)
  const [sequence, setSequence] = useState(() => [pickRandom([])])
  const [pos, setPos] = useState(0)
  const [loading, setLoading] = useState(false)
  // slide: { dir: 'next'|'prev', fromIdx, toIdx, reset, active }
  const [slide, setSlide] = useState(null)
  const resetPickRef = useRef(null)
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Держим следующую карточку уже сгенерированной ("на готове"), пока показываем текущую
  useEffect(() => {
    if (loading || slide) return
    if (sequence.length < CARDS.length) {
      if (sequence.length === pos + 1) {
        setSequence(seq => (seq.length === pos + 1 ? [...seq, pickRandom(seq)] : seq))
      }
      resetPickRef.current = null
    } else if (pos === sequence.length - 1 && resetPickRef.current == null) {
      // весь контент показан — заранее готовим карточку для нового круга
      resetPickRef.current = pickRandom([])
    }
  }, [sequence, pos, loading, slide])

  // Активируем CSS-переход на следующем тике (иначе браузер схлопнёт transform в один кадр)
  useEffect(() => {
    if (!slide || slide.active) return
    const t = setTimeout(() => {
      setSlide(s => (s && !s.active) ? { ...s, active: true } : s)
    }, 20)
    return () => clearTimeout(t)
  }, [slide])

  // По завершении анимации — фиксируем новую позицию
  useEffect(() => {
    if (!slide || !slide.active) return
    const t = setTimeout(() => {
      if (slide.dir === 'next') {
        if (slide.reset) {
          setSequence([slide.toIdx])
          setPos(0)
          resetPickRef.current = null
        } else {
          setPos(p => p + 1)
        }
      } else {
        setPos(p => p - 1)
      }
      setSlide(null)
    }, SLIDE_MS)
    return () => clearTimeout(t)
  }, [slide])

  const goNext = useCallback(() => {
    if (loading || slide) return
    const fromIdx = sequence[pos]
    if (pos < sequence.length - 1) {
      setSlide({ dir: 'next', fromIdx, toIdx: sequence[pos + 1], reset: false, active: false })
      return
    }
    if (sequence.length >= CARDS.length) {
      const toIdx = resetPickRef.current ?? pickRandom([])
      setSlide({ dir: 'next', fromIdx, toIdx, reset: true, active: false })
      return
    }
    // на случай если буфер ещё не успел прогрузиться
    const toIdx = pickRandom(sequence)
    setSequence([...sequence, toIdx])
    setSlide({ dir: 'next', fromIdx, toIdx, reset: false, active: false })
  }, [loading, slide, sequence, pos])

  const goPrev = useCallback(() => {
    if (loading || slide) return
    if (pos === 0) {
      // первая карточка + листание назад → лоадер 1с и обнуление просмотренных
      setLoading(true)
      setTimeout(() => {
        const first = pickRandom([])
        setSequence([first])
        setPos(0)
        resetPickRef.current = null
        setLoading(false)
      }, 1000)
      return
    }
    setSlide({ dir: 'prev', fromIdx: sequence[pos], toIdx: sequence[pos - 1], reset: false, active: false })
  }, [loading, slide, sequence, pos])

  // Колесо мыши (десктоп) с троттлингом
  const lastWheel = useRef(0)
  const onWheel = useCallback((e) => {
    const now = Date.now()
    if (now - lastWheel.current < SLIDE_MS + 120) return
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

  return (
    <section className="page active reels-page">
      <div className="reels-stage">
        <div
          className="reels-box"
          onWheel={mobile ? undefined : onWheel}
          onTouchStart={mobile ? onTouchStart : undefined}
          onTouchEnd={mobile ? onTouchEnd : undefined}
        >
          {loading ? (
            <div className="reels-loader">
              <div className="reels-spinner" />
            </div>
          ) : slide ? (
            <>
              <div
                className="reels-slide-layer"
                style={{ transform: slide.active
                  ? (slide.dir === 'next' ? 'translateY(-100%)' : 'translateY(100%)')
                  : 'translateY(0)' }}
              >
                <CardView idx={slide.fromIdx} />
              </div>
              <div
                className="reels-slide-layer"
                style={{ transform: slide.active
                  ? 'translateY(0)'
                  : (slide.dir === 'next' ? 'translateY(100%)' : 'translateY(-100%)') }}
              >
                <CardView idx={slide.toIdx} />
              </div>
            </>
          ) : currentIdx != null ? (
            <div className="reels-card-still">
              <CardView idx={currentIdx} />
            </div>
          ) : null}
        </div>

        {!mobile && (
          <div className="reels-controls">
            <button className="reels-nav-btn" onClick={goPrev} disabled={loading || !!slide} title="Вверх" aria-label="Вверх">▲</button>
            <button className="reels-nav-btn" onClick={goNext} disabled={loading || !!slide} title="Вниз" aria-label="Вниз">▼</button>
          </div>
        )}
      </div>
    </section>
  )
}
