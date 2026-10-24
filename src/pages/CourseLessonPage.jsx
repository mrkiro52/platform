import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LessonBlocks from '../components/course/LessonBlocks'
import TaskCard from '../components/course/TaskCard'
import AnswerTaskCard from '../components/course/AnswerTaskCard'
import { LockIcon, PencilIcon, PlayIcon } from '../components/icons'
import { canOpenLesson, loadProgress, markSolved, priceFor, rub, savingFor, COURSE_PRICE } from '../data/courses'

// Урок курса: видео (пока заглушка), теория по разделам и 5 задач с автопроверкой.
// Закрытый урок показывает предложение купить курс.

function lessonsOf(course) {
  return course.weeks.flatMap(w => w.lessons.map(l => ({ ...l, week: w.week })))
}

function VideoPlaceholder({ video }) {
  if (video) {
    return (
      <div className="ls-video">
        <iframe src={video} title="Видеоурок" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      </div>
    )
  }
  return (
    <div className="ls-video is-empty">
      <span className="ls-video-play" aria-hidden="true"><PlayIcon size={26} /></span>
      <span className="ls-video-title">Видеоурок появится скоро</span>
      <span className="ls-video-sub">Пока можно пройти теорию и решить задачи ниже</span>
    </div>
  )
}

function Paywall({ course, onBuy }) {
  return (
    <div className="ls-paywall">
      <span className="ls-paywall-icon" aria-hidden="true"><LockIcon size={28} /></span>
      <h2>Урок откроется после покупки</h2>
      <p>Бесплатно доступны первые два урока курса. Купи курс, чтобы открыть все уроки и задачи с автопроверкой{course.finalProject ? ' и финальный проект' : ''}.</p>
      <div className="ls-paywall-prices">
        <span>«{course.short}» — <b>{rub(COURSE_PRICE)}</b></span>
        <span>все 3 курса — <b>{rub(priceFor(3))}</b> <em>выгода {rub(savingFor(3))}</em></span>
      </div>
      <button type="button" className="btn-primary" onClick={() => onBuy(course.slug)}>Купить курс</button>
    </div>
  )
}

export default function CourseLessonPage({ course, lessonId, user, onBuy }) {
  const all = lessonsOf(course)
  const index = all.findIndex(l => l.id === lessonId)
  const meta = all[index]
  const open = canOpenLesson(user, course, meta)
  const [lesson, setLesson] = useState(null)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(() => loadProgress(user))

  useEffect(() => {
    window.scrollTo(0, 0)
    document.querySelector('.app-page')?.scrollTo?.(0, 0)
    setLesson(null)
    setError('')
    if (!open) return
    let alive = true
    course.loadLesson(lessonId)
      .then(l => { if (alive) l ? setLesson(l) : setError('Урок не найден') })
      .catch(() => { if (alive) setError('Не удалось загрузить урок') })
    return () => { alive = false }
  }, [course, lessonId, open])

  const prev = all[index - 1]
  const next = all[index + 1]
  const solvedHere = lesson ? lesson.tasks.filter(t => progress[t.id]).length : 0

  const solve = id => setProgress(markSolved(user, id))

  return (
    <section className="page active cs-page ls-page" style={{ '--c': course.accent }}>
      <Link className="prg-back" to={`/courses/${course.slug}`}>← {course.title}</Link>

      <header className="ls-hero">
        <span className="ls-kicker">Неделя {meta.week} · {course.dayWord || 'урок'} {meta.day}{meta.free ? ' · бесплатно' : ''}</span>
        <h1 className="ls-title">{meta.title}</h1>
        {lesson && <p className="ls-summary">{lesson.summary}</p>}
        {lesson && (
          <div className="ls-meta">
            <span>{lesson.sections.length} разделов теории</span>
            <span className={solvedHere === lesson.tasks.length ? 'is-done' : ''}>Задачи: {solvedHere} из {lesson.tasks.length}</span>
          </div>
        )}
      </header>

      {!open && <Paywall course={course} onBuy={onBuy} />}
      {open && error && <div className="prg-empty">{error}</div>}
      {open && !lesson && !error && <p className="prg-loading">Загружаем урок…</p>}

      {lesson && (
        <>
          <VideoPlaceholder video={lesson.video} />

          <nav className="ls-toc" aria-label="Содержание урока">
            {lesson.sections.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} onClick={e => { e.preventDefault(); document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }) }}>
                <span>{i + 1}</span>{s.title}
              </a>
            ))}
            <a href="#tasks" className="is-tasks" onClick={e => { e.preventDefault(); document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <span><PencilIcon size={12} /></span>Задачи
            </a>
          </nav>

          {lesson.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="ls-section">
              <h2 className="ls-section-title"><span>{i + 1}</span>{s.title}</h2>
              <LessonBlocks blocks={s.blocks} />
            </section>
          ))}

          <section id="tasks" className="ls-tasks">
            <h2 className="ls-tasks-title">Задачи</h2>
            <p className="ls-tasks-lead">{course.taskLead || 'Напиши решение в редакторе, запусти его, а затем нажми «Проверить решение» — код пройдёт автоматические тесты. Решение сохраняется в браузере.'}</p>
            {lesson.tasks.map((t, i) => t.answer !== undefined
              ? <AnswerTaskCard key={t.id} task={t} index={i} user={user} solved={!!progress[t.id]} onSolved={solve} />
              : <TaskCard key={t.id} task={t} index={i} user={user} solved={!!progress[t.id]} onSolved={solve} />
            )}
          </section>
        </>
      )}

      <nav className="ls-pager">
        {prev ? <Link to={`/courses/${course.slug}/${prev.id}`}>← {prev.title}</Link> : <span />}
        {next ? <Link to={`/courses/${course.slug}/${next.id}`} className="is-next">{next.title} →</Link> : <span />}
      </nav>
    </section>
  )
}
