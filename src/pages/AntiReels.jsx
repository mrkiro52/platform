import { useState, useEffect, useRef, useCallback } from 'react'
import { CARDS } from '../antireels/cards'
import { Card } from '../antireels/CardKit'

const SLIDE_MS = 380
const SWIPE_THRESHOLD = 45

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
  // slide: { dir: 'next'|'prev', fromIdx, toIdx, reset, active }
  const [slide, setSlide] = useState(null)
  const resetPickRef = useRef(null)
  const boxRef = useRef(null)
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const handler = e => setMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Полностью блокируем прокрутку страницы, пока открыта вкладка AntiReels —
  // листаться должен только блок с карточками, а не сайт целиком.
  useEffect(() => {
    document.body.classList.add('reels-lock')
    return () => document.body.classList.remove('reels-lock')
  }, [])

  // Держим следующую карточку уже сгенерированной ("на готове"), пока показываем текущую
  useEffect(() => {
    if (slide) return
    if (sequence.length < CARDS.length) {
      if (sequence.length === pos + 1) {
        setSequence(seq => (seq.length === pos + 1 ? [...seq, pickRandom(seq)] : seq))
      }
      resetPickRef.current = null
    } else if (pos === sequence.length - 1 && resetPickRef.current == null) {
      // весь контент показан — заранее готовим карточку для нового круга
      resetPickRef.current = pickRandom([])
    }
  }, [sequence, pos, slide])

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
    if (slide) return
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
  }, [slide, sequence, pos])

  const goPrev = useCallback(() => {
    if (slide || pos === 0) return
    setSlide({ dir: 'prev', fromIdx: sequence[pos], toIdx: sequence[pos - 1], reset: false, active: false })
  }, [slide, sequence, pos])

  const goNextRef = useRef(goNext)
  const goPrevRef = useRef(goPrev)
  goNextRef.current = goNext
  goPrevRef.current = goPrev

  // Колесо мыши (десктоп) с троттлингом
  const lastWheel = useRef(0)
  const onWheel = useCallback((e) => {
    const now = Date.now()
    if (now - lastWheel.current < SLIDE_MS + 120) return
    lastWheel.current = now
    if (e.deltaY > 10) goNext()
    else if (e.deltaY < -10) goPrev()
  }, [goNext, goPrev])

  // Свайп на мобильных — нативные слушатели с passive:false, чтобы полностью
  // перехватывать жест и не давать браузеру скроллить/оттягивать страницу.
  useEffect(() => {
    const box = boxRef.current
    if (!box) return

    let startY = null
    let tracking = false

    const onTouchStart = (e) => {
      startY = e.touches[0].clientY
      tracking = true
    }
    const onTouchMove = (e) => {
      if (!tracking) return
      // Полностью гасим нативный скролл/рубберфинг страницы во время свайпа
      e.preventDefault()
    }
    const onTouchEnd = (e) => {
      if (!tracking || startY == null) { tracking = false; return }
      const delta = e.changedTouches[0].clientY - startY
      if (Math.abs(delta) > SWIPE_THRESHOLD) {
        if (delta < 0) goNextRef.current()
        else goPrevRef.current()
      }
      startY = null
      tracking = false
    }

    box.addEventListener('touchstart', onTouchStart, { passive: true })
    box.addEventListener('touchmove', onTouchMove, { passive: false })
    box.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      box.removeEventListener('touchstart', onTouchStart)
      box.removeEventListener('touchmove', onTouchMove)
      box.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

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
          ref={boxRef}
          className="reels-box"
          onWheel={mobile ? undefined : onWheel}
        >
          {slide ? (
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
            <button className="reels-nav-btn" onClick={goPrev} disabled={!!slide || pos === 0} title="Вверх" aria-label="Вверх">▲</button>
            <button className="reels-nav-btn" onClick={goNext} disabled={!!slide} title="Вниз" aria-label="Вниз">▼</button>
          </div>
        )}
      </div>
    </section>
  )
}
