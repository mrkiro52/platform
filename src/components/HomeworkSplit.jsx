import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import TaskCard, { keyOf, StatusSquares, chapterStats, useMyHomework } from './HomeworkTaskCard'
import { usePythonState } from '../lib/python/runner'
import { chaptersOf, tasksOf, hwNumberOf, hasLevels, OPEN_WEEKS } from '../data/homeworkCatalog'

// Сплит-экран: слева материалы, справа задания текущей главы с полями
// «Текст / Код» и сдачей. Каждая половина прокручивается сама по себе.
//
// Панель рендерится порталом прямо в <main class="pages-wrap">, рядом с
// секцией страницы, а раскладку в две колонки включает класс на <body> —
// так же, как это уже делает AntiReels (reels-lock).

const OPEN_KEY = 'kiro_split_open'
const RATIO_KEY = 'kiro_split_ratio'
const RATIO_MIN = 30
const RATIO_MAX = 70
// Уже этой ширины окна двум колонкам тесно — там сплит не предлагается
export const SPLIT_MEDIA = '(min-width: 1100px)'

const clamp = (v) => Math.min(RATIO_MAX, Math.max(RATIO_MIN, v))

function readRatio() {
  try {
    const v = Number(localStorage.getItem(RATIO_KEY))
    return v ? clamp(v) : 50
  } catch { return 50 }
}

// Глава, задания которой можно сдать через платформу. У глав четвёртой
// недели своих заданий нет (там тесты по темам) — для них сплита нет.
export function submittableChapter(week, level, chapterId) {
  if (!OPEN_WEEKS.includes(week)) return null
  const lvl = hasLevels(week) ? (level || 1) : undefined
  const chapter = chaptersOf(week, lvl).find(c => c.id === chapterId)
  return chapter && tasksOf(chapter, week, lvl).length ? chapter : null
}

// Где прокручиваются материалы: в сплите — внутри своей секции, иначе — окно
export function materialsScroller(el) {
  const split = document.body.classList.contains('split-screen') && window.matchMedia(SPLIT_MEDIA).matches
  return (split && el?.closest('.page')) || window
}

// Открыт ли сплит. Запоминается на время вкладки: при переходе между
// главами и неделями или перезагрузке половина с заданиями остаётся.
// enabled = false — на странице нечего сдавать (неделя 4), сплит не включается.
export function useSplitScreen(enabled = true) {
  const [open, setOpen] = useState(() => {
    try { return sessionStorage.getItem(OPEN_KEY) === '1' } catch { return false }
  })

  const active = open && enabled

  useLayoutEffect(() => {
    document.body.classList.toggle('split-screen', active)
    return () => document.body.classList.remove('split-screen')
  }, [active])

  // Переключение сохраняет место чтения: блок, от которого открыли сплит,
  // остаётся на той же высоте экрана, хотя прокрутка переезжает из окна
  // в секцию и обратно
  const toggle = useCallback((anchor) => {
    const before = anchor ? anchor.getBoundingClientRect().top : null
    setOpen(prev => {
      const next = !prev
      try { sessionStorage.setItem(OPEN_KEY, next ? '1' : '0') } catch { /* приватный режим */ }
      return next
    })
    if (before === null) return
    requestAnimationFrame(() => {
      if (!anchor.isConnected) return
      const delta = anchor.getBoundingClientRect().top - before
      materialsScroller(anchor).scrollBy({ top: delta })
    })
  }, [])

  return [active, toggle]
}

function SplitIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M12 4v16" />
    </svg>
  )
}

export function SplitButton({ open, onClick }) {
  return (
    <button
      type="button"
      className={`split-toggle${open ? ' is-open' : ''}`}
      onClick={onClick}
      aria-pressed={open}
      title={open ? 'Вернуть обычный вид' : 'Материалы слева, задания справа — читай и решай одновременно'}
    >
      <SplitIcon />
      {open ? 'Закрыть сплит' : 'Сплит скрин'}
    </button>
  )
}

// Ручка между половинами: тянуть мышью, стрелками с клавиатуры,
// двойной клик — поровну
function SplitHandle({ ratio, setRatio, container }) {
  const onPointerDown = (e) => {
    if (e.button !== 0) return
    e.preventDefault()
    const handle = e.currentTarget
    handle.setPointerCapture(e.pointerId)
    document.body.classList.add('split-dragging')
    const rect = container.getBoundingClientRect()

    const move = (ev) => setRatio(clamp(((ev.clientX - rect.left) / rect.width) * 100))
    const up = () => {
      handle.removeEventListener('pointermove', move)
      handle.removeEventListener('pointerup', up)
      handle.removeEventListener('pointercancel', up)
      document.body.classList.remove('split-dragging')
    }
    handle.addEventListener('pointermove', move)
    handle.addEventListener('pointerup', up)
    handle.addEventListener('pointercancel', up)
  }

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 5
    if (e.key === 'ArrowLeft') { e.preventDefault(); setRatio(r => clamp(r - step)) }
    if (e.key === 'ArrowRight') { e.preventDefault(); setRatio(r => clamp(r + step)) }
    if (e.key === 'Home') { e.preventDefault(); setRatio(RATIO_MIN) }
    if (e.key === 'End') { e.preventDefault(); setRatio(RATIO_MAX) }
  }

  return (
    <div
      className="split-handle"
      role="separator"
      aria-orientation="vertical"
      aria-label="Ширина половин. Стрелки влево и вправо меняют ширину"
      aria-valuemin={RATIO_MIN}
      aria-valuemax={RATIO_MAX}
      aria-valuenow={Math.round(ratio)}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onKeyDown={onKeyDown}
      onDoubleClick={() => setRatio(50)}
      title="Потяни, чтобы изменить ширину. Двойной клик — поровну"
    >
      <span className="split-handle-grip" aria-hidden="true" />
    </div>
  )
}

export function HomeworkSplitPanel({ week, level, chapter, chapterNumber, onClose }) {
  // Контейнер ищем после монтирования: при загрузке страницы с уже открытым
  // сплитом всё дерево рендерится разом, и во время рендера <main> в DOM ещё нет
  const [target, setTarget] = useState(null)
  useLayoutEffect(() => { setTarget(document.querySelector('main.pages-wrap')) }, [])
  const { saved, loaded, error, onSaved } = useMyHomework()
  const { running: pythonBusy } = usePythonState()
  const [ratio, setRatio] = useState(readRatio)
  const paneRef = useRef(null)

  const lvl = hasLevels(week) ? (level || 1) : null
  const tasks = chapter ? tasksOf(chapter, week, lvl) : []
  const stats = chapter && loaded ? chapterStats(chapter, week, lvl, saved) : null

  // Ширина половин — через переменные на body, их читает сетка pages-wrap
  useEffect(() => {
    document.body.style.setProperty('--split-a', `${ratio}fr`)
    document.body.style.setProperty('--split-b', `${100 - ratio}fr`)
    try { localStorage.setItem(RATIO_KEY, String(Math.round(ratio))) } catch { /* приватный режим */ }
  }, [ratio])
  useEffect(() => () => {
    document.body.style.removeProperty('--split-a')
    document.body.style.removeProperty('--split-b')
  }, [])

  // Сменилась глава в материалах — задания новой главы с начала
  useEffect(() => { paneRef.current?.scrollTo({ top: 0 }) }, [chapter?.id])

  if (!target) return null

  const uploadHref = chapter
    ? `/autumn-camp/upload-homework?week=${week}${lvl ? `&level=${lvl}` : ''}&chapter=${chapter.id}`
    : '/autumn-camp/upload-homework'

  return createPortal(
    <>
      <SplitHandle ratio={ratio} setRatio={setRatio} container={target} />

      <section className="split-pane" ref={paneRef} aria-label="Домашнее задание">
        <header className="split-head">
          <div className="split-head-main">
            <div className="split-kicker">
              Сплит скрин · неделя {week}{chapterNumber ? ` · глава ${chapterNumber}` : ''}
            </div>
            <h2 className="split-title">
              {chapter ? `Домашнее задание ${hwNumberOf(chapter, week, lvl)}` : 'Домашнее задание'}
            </h2>
            {chapter && <div className="split-subtitle">{chapter.title}</div>}
          </div>

          <div className="split-head-side">
            <div className="split-actions">
              <a className="split-link" href={uploadHref} target="_blank" rel="noopener" title="Страница сдачи со всеми главами — в новой вкладке">
                Все задания ↗
              </a>
              <button type="button" className="split-close" onClick={onClose} aria-label="Закрыть сплит скрин" title="Закрыть сплит">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            {stats && (
              <div className="split-progress">
                <StatusSquares statuses={stats.statuses} />
                <span>сдано {stats.sent} из {stats.total}</span>
              </div>
            )}
          </div>
        </header>

        <div className="split-body">
          {!chapter ? (
            <div className="split-empty">
              <b>В этой главе нет домашнего задания.</b>
              <span>Листай материалы слева — как только откроешь главу с заданием, его задачи появятся здесь.</span>
            </div>
          ) : error ? (
            <div className="split-empty">{error}</div>
          ) : !loaded ? (
            <div className="split-empty">Загружаем твои решения…</div>
          ) : (
            <div className="hwup-tasks">
              {tasks.map((task, i) => (
                <TaskCard
                  key={`${chapter.id}:${i}`}
                  task={task}
                  index={i}
                  chapter={chapter}
                  week={week}
                  level={lvl}
                  saved={saved[keyOf(chapter.id, i)] || null}
                  onSaved={onSaved}
                  pythonBusy={pythonBusy}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>,
    target
  )
}
