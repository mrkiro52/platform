import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LessonBlocks from '../components/course/LessonBlocks'
import TaskCard from '../components/course/TaskCard'
import AnswerTaskCard from '../components/course/AnswerTaskCard'
import { LockIcon, PencilIcon, PlayIcon } from '../components/icons'
import { canOpenLesson, canOpenVideo, courseItems, priceFor, rub, savingFor, COURSE_PRICE } from '../data/courses'
import { lessonSolved, markSolved, useCourseProgress } from '../lib/courseProgress'

// Урок курса: теория по разделам и задачи с автопроверкой. Видеолекция —
// одна на неделю, на отдельной странице (CourseVideoPage, id вида v1).
// Сверху — кружки всех уроков курса с прогрессом. Закрытый урок показывает
// предложение купить курс.

function VideoPlaceholder({ video }) {
  if (video) {
    return (
      <div className="ls-video">
        <iframe src={video} title="Видеолекция" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      </div>
    )
  }
  return (
    <div className="ls-video is-empty">
      <span className="ls-video-play" aria-hidden="true"><PlayIcon size={26} /></span>
      <span className="ls-video-title">Видеолекция появится скоро</span>
      <span className="ls-video-sub">Пока можно перейти к урокам недели: теория и задачи уже открыты</span>
    </div>
  )
}

function Paywall({ course, onBuy, what = 'Урок' }) {
  return (
    <div className="ls-paywall">
      <span className="ls-paywall-icon" aria-hidden="true"><LockIcon size={28} /></span>
      <h2>{what} откроется после покупки</h2>
      <p>Бесплатно доступны видеолекция первой недели и первые два урока курса. Купи курс, чтобы открыть все уроки, видеолекции и задачи с автопроверкой{course.finalProject ? ' и финальный проект' : ''}.</p>
      <div className="ls-paywall-prices">
        <span>«{course.short}» — <b>{rub(COURSE_PRICE)}</b></span>
        <span>все 3 курса — <b>{rub(priceFor(3))}</b> <em>выгода {rub(savingFor(3))}</em></span>
      </div>
      <button type="button" className="btn-primary" onClick={() => onBuy(course.slug)}>Купить курс</button>
    </div>
  )
}

// Кружки уроков 1.1 … 3.7: зелёный — решены все задачи урока, жёлтый — хотя бы одна
function LessonDots({ course, user, progress, active }) {
  return (
    <nav className="ls-dots" aria-label="Уроки курса">
      {course.weeks.map(w => (
        <div key={w.week} className="ls-dots-week">
          {w.lessons.map((l, i) => {
            const total = l.tasks || 5
            const solved = lessonSolved(progress, l)
            const state = solved === total ? ' is-done' : solved > 0 ? ' is-started' : ''
            const locked = !canOpenLesson(user, course, l)
            return (
              <Link
                key={l.id}
                to={`/courses/${course.slug}/${l.id}`}
                className={`ls-dot${state}${l.id === active ? ' is-active' : ''}${locked ? ' is-locked' : ''}`}
                aria-current={l.id === active ? 'page' : undefined}
                title={`${w.week}.${i + 1} · ${l.title}${locked ? ' — после покупки' : ` — решено ${solved} из ${total}`}`}
              >{w.week}.{i + 1}</Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}

function Pager({ course, id }) {
  const items = courseItems(course)
  const index = items.findIndex(x => x.id === id)
  const prev = items[index - 1]
  const next = items[index + 1]
  return (
    <nav className="ls-pager">
      {prev ? <Link to={`/courses/${course.slug}/${prev.id}`}>← {prev.title}</Link> : <span />}
      {next ? <Link to={`/courses/${course.slug}/${next.id}`} className="is-next">{next.title} →</Link> : <span />}
    </nav>
  )
}

function scrollTop() {
  window.scrollTo(0, 0)
  document.querySelector('.app-page')?.scrollTo?.(0, 0)
}

// Видеолекция недели: одна на неделю, перед уроками недели
export function CourseVideoPage({ course, week, user, onBuy }) {
  const w = course.weeks.find(x => x.week === week)
  const open = canOpenVideo(user, course, week)
  const progress = useCourseProgress(user)
  useEffect(scrollTop, [course, week])

  return (
    <section className="page active cs-page ls-page" style={{ '--c': course.accent }}>
      <Link className="prg-back" to={`/courses/${course.slug}`}>← {course.title}</Link>
      <LessonDots course={course} user={user} progress={progress} />

      <header className="ls-hero">
        <span className="ls-kicker">Неделя {week} · видеолекция{week === 1 ? ' · бесплатно' : ''}</span>
        <h1 className="ls-title">Видеолекция недели {week}</h1>
        <p className="ls-summary">{w.title}</p>
      </header>

      {open ? <VideoPlaceholder video={w.video} /> : <Paywall course={course} onBuy={onBuy} what="Видеолекция" />}

      <Pager course={course} id={`v${week}`} />
    </section>
  )
}

export default function CourseLessonPage({ course, lessonId, user, onBuy }) {
  const meta = courseItems(course).find(l => l.id === lessonId)
  const open = canOpenLesson(user, course, meta)
  const [lesson, setLesson] = useState(null)
  const [error, setError] = useState('')
  const progress = useCourseProgress(user)

  useEffect(() => {
    scrollTop()
    setLesson(null)
    setError('')
    if (!open) return
    let alive = true
    course.loadLesson(lessonId)
      .then(l => { if (alive) l ? setLesson(l) : setError('Урок не найден') })
      .catch(() => { if (alive) setError('Не удалось загрузить урок') })
    return () => { alive = false }
  }, [course, lessonId, open])

  const solvedHere = lesson ? lesson.tasks.filter(t => progress[t.id]).length : 0

  const solve = (id, answer) => markSolved(user, course.slug, id, answer)

  return (
    <section className="page active cs-page ls-page" style={{ '--c': course.accent }}>
      <Link className="prg-back" to={`/courses/${course.slug}`}>← {course.title}</Link>
      <LessonDots course={course} user={user} progress={progress} active={lessonId} />

      <header className="ls-hero">
        <span className="ls-kicker">Неделя {meta.week} · урок {meta.week}.{meta.num}{meta.free ? ' · бесплатно' : ''}</span>
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
            <p className="ls-tasks-lead">{course.taskLead || 'Напиши решение в редакторе, запусти его, а затем нажми «Проверить решение» — код пройдёт автоматические тесты.'} Принятое решение сохраняется в твоём аккаунте — его будет видно и с другого устройства.</p>
            {lesson.tasks.map((t, i) => {
              const props = { task: t, index: i, user, solved: !!progress[t.id], savedAnswer: progress[t.id]?.answer ?? null, onSolved: solve }
              return t.answer !== undefined ? <AnswerTaskCard key={t.id} {...props} /> : <TaskCard key={t.id} {...props} />
            })}
          </section>
        </>
      )}

      <Pager course={course} id={lessonId} />
    </section>
  )
}
