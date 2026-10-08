import { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PROGRAM_CONTACT, PROGRAM_PERIOD, directionOf, taskKind } from '../data/programs'
import ProgramBlocks, { ProgramContext, Rich } from '../components/program/ProgramBlocks'
import ProgramQuiz from '../components/program/ProgramQuiz'
import { api } from '../api'

// Индивидуальная программа осеннего лагеря на октябрь:
// /autumn-camp/program — обзор программы и список глав,
// /autumn-camp/program/:chapter — конспект главы,
// /autumn-camp/program/:chapter/task — задание к главе. Задание из вопросов
// (quiz) сдаётся на платформе, остальные выполняются самостоятельно.

const HW_STATUS = { submitted: 'на проверке', approved: 'принято', rework: 'нужны правки' }

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

function ContactNote() {
  return (
    <p className="prg-contact">
      Для смены направления и индивидуальной программы напиши в Telegram{' '}
      <a href={PROGRAM_CONTACT.url} target="_blank" rel="noopener noreferrer">{PROGRAM_CONTACT.text}</a>
    </p>
  )
}

function BackLink({ to, children }) {
  return <Link className="prg-back" to={to}>← {children}</Link>
}

function Pending({ title }) {
  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp">Осенний лагерь</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Индивидуальная программа · {PROGRAM_PERIOD}</span>
        <h1 className="prg-title">{title}</h1>
        <ContactNote />
      </div>
    </section>
  )
}

function StartPanel({ start }) {
  if (!start) return null
  return (
    <section id="prg-start" className="prg-section prg-start">
      <div className="prg-section-head">
        <span className="prg-section-num">Старт</span>
        <h2 className="prg-section-title">{start.title}</h2>
      </div>
      <ProgramBlocks blocks={start.blocks} />
    </section>
  )
}

// Статусы сданных заданий — для карточек глав
function useProgramHomework(enabled) {
  const [list, setList] = useState([])
  useEffect(() => {
    if (!enabled) return
    let alive = true
    api.programHomework().then(l => { if (alive) setList(l || []) }).catch(() => {})
    return () => { alive = false }
  }, [enabled])
  return list
}

function taskLabel(dir, ch, hw) {
  const kind = taskKind(dir, ch)
  if (kind === 'quiz') return hw ? `сдано · ${HW_STATUS[hw.status] || hw.status}` : 'вопросы · сдаётся на платформе'
  if (kind === 'trainer') return ch.taskHint || 'задачи SQL-тренажёра'
  if (kind === 'file') return 'файлом в личные сообщения'
  if (kind === 'soon') return 'скоро появится'
  return 'выполняется самостоятельно'
}

// Как сдавать задание, которое не сдаётся на платформе
function SubmitPanel({ kind }) {
  if (kind === 'file') {
    return (
      <div className="prg-submit">
        <div className="prg-submit-label">Как сдать</div>
        <p>
          Оформи выполненное задание в одном файле — Google Docs, Word, PDF или таблица, если в задании есть расчёты —
          и отправь его в личные сообщения в Telegram:{' '}
          <a href={PROGRAM_CONTACT.url} target="_blank" rel="noopener noreferrer">{PROGRAM_CONTACT.text}</a>.
          В сообщении укажи свой ник на платформе и номер главы.
        </p>
      </div>
    )
  }
  if (kind === 'trainer') {
    return (
      <div className="prg-submit">
        <div className="prg-submit-label">Как сдать</div>
        <p>Отправлять ничего не нужно: тренажёр проверяет каждое решение автоматически, а прогресс сохраняется в твоём профиле.</p>
      </div>
    )
  }
  return null
}

function Overview({ dir }) {
  const navigate = useNavigate()
  const homework = useProgramHomework(dir.chapters.some(c => c.quiz))
  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp">Осенний лагерь</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Индивидуальная программа · {PROGRAM_PERIOD}</span>
        <h1 className="prg-title">{dir.name}</h1>
        <p className="prg-lead">{dir.goal}. Программа состоит из глав: у каждой есть конспект с теорией по разделам и задание к главе{dir.practice ? `, а ещё ${dir.practice}` : ''}.</p>
        <ContactNote />
      </div>

      <StartPanel start={dir.start} />

      <h2 className="prg-list-title">Главы программы</h2>
      {dir.chapters.length === 0 ? (
        <div className="prg-empty">Первая глава программы скоро появится.</div>
      ) : (
        <div className="prg-chapters">
          {dir.chapters.map(ch => {
            const hw = homework.find(h => h.direction === dir.key && h.chapter === ch.num)
            return (
              <div key={ch.num} className="prg-chapter-card">
                <span className="prg-chapter-num">Глава {ch.num}</span>
                <span className="prg-chapter-title">{ch.title}</span>
                <div className="prg-chapter-links">
                  <button type="button" className="prg-chapter-link" onClick={() => navigate(`/autumn-camp/program/${ch.num}`)}>
                    <span className="prg-chapter-link-name">Конспект</span>
                    <span className="prg-chapter-link-meta">{ch.sections} {plural(ch.sections, 'раздел', 'раздела', 'разделов')}</span>
                    <span className="prg-chapter-link-go">→</span>
                  </button>
                  <button type="button" className={`prg-chapter-link is-task${hw ? ` is-${hw.status}` : ''}`} onClick={() => navigate(`/autumn-camp/program/${ch.num}/task`)}>
                    <span className="prg-chapter-link-name">Задание к главе</span>
                    <span className="prg-chapter-link-meta">{taskLabel(dir, ch, hw)}</span>
                    <span className="prg-chapter-link-go">→</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}

function Terms({ terms }) {
  if (!terms?.length) return null
  return (
    <details className="prg-terms">
      <summary>Сокращения в разделе <span>{terms.length}</span></summary>
      <dl>
        {terms.map(([abbr, def]) => (
          <div key={abbr} className="prg-term">
            <dt>{abbr}</dt>
            <dd>{def}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

function Assignment({ a }) {
  return (
    <section id="prg-assignment" className="prg-section prg-assignment">
      <div className="prg-section-head">
        <span className="prg-section-num">Задание</span>
        <h2 className="prg-section-title">Задание для самостоятельной работы</h2>
      </div>
      <div className="prg-assign-meta">
        <div><span>Время выполнения</span><b>{a.time}</b></div>
        <div><span>Формат</span><b>{a.format}</b></div>
      </div>

      {a.situation.length > 0 && (
        <div className="prg-situation">
          <div className="prg-situation-label">Исходная ситуация</div>
          {a.situation.map((p, i) => <p key={i}><Rich text={p} /></p>)}
        </div>
      )}

      <div className="prg-parts">
        {a.parts.map(part => (
          <div key={part.title} className="prg-part">
            <div className="prg-part-head">
              <h3>{part.title}</h3>
              {part.minutes && <span className="prg-chip">{part.minutes} минут</span>}
              {part.time && <span className="prg-chip">{part.time}</span>}
            </div>
            <ProgramBlocks blocks={part.blocks} />
          </div>
        ))}

        {a.selfCheck?.length > 0 && (
          <div className="prg-part">
            <div className="prg-part-head">
              <h3>{a.selfCheckTitle || 'Вопросы для самопроверки'}</h3>
              {a.selfCheckMinutes && <span className="prg-chip">{a.selfCheckMinutes} минут</span>}
            </div>
            <p className="prg-p">{a.selfCheckIntro}</p>
            <ol className="prg-ol">
              {a.selfCheck.map((q, i) => <li key={i}>{q}</li>)}
            </ol>
          </div>
        )}
      </div>

      {a.criteria?.length > 0 && (
        <div className="prg-criteria">
          <div className="prg-criteria-title">{a.criteriaTitle || 'Критерии оценки'}</div>
          <ul>{a.criteria.map((c, i) => <li key={i}>{c}</li>)}</ul>
        </div>
      )}
    </section>
  )
}

const CTA_TEXT = {
  quiz: 'Вопросы по темам главы: ответь своими словами и отправь на проверку прямо на платформе.',
  trainer: 'Задачи SQL-тренажёра по всем темам главы: решения проверяются автоматически.',
  file: 'Самостоятельная работа по материалам главы: оформи её в одном файле и отправь в личные сообщения в Telegram.',
  self: 'Самостоятельная работа по материалам главы — сдавать её на платформе не нужно.',
  soon: 'Задание к этой главе скоро появится — а пока проверь себя по вопросам в конце конспекта.',
}

function TaskCta({ dir, meta }) {
  const navigate = useNavigate()
  return (
    <section className="prg-section prg-task-cta">
      <div>
        <div className="prg-task-cta-kicker">Конспект прочитан?</div>
        <h2 className="prg-section-title">Задание к главе {meta.num}</h2>
        <p className="prg-p">{CTA_TEXT[taskKind(dir, meta)]}</p>
      </div>
      <button type="button" className="prg-task-cta-btn" onClick={() => navigate(`/autumn-camp/program/${meta.num}/task`)}>Перейти к заданию →</button>
    </section>
  )
}

function Chapter({ dir, chapterNum }) {
  const navigate = useNavigate()
  const meta = dir.chapters.find(c => c.num === chapterNum)
  const [chapter, setChapter] = useState(null)

  useEffect(() => {
    let alive = true
    setChapter(null)
    meta?.load().then(m => { if (alive) setChapter(m.default) })
    window.scrollTo(0, 0)
    return () => { alive = false }
  }, [meta])

  if (!meta) return <Overview dir={dir} />
  if (!chapter) return <section className="page active prg-page"><p className="prg-loading">Загружаем главу…</p></section>

  const jump = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section className="page active prg-page">
      <BackLink to="/autumn-camp/program">{dir.name}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Глава {chapter.num}</span>
        <h1 className="prg-title">{chapter.title}</h1>
        <p className="prg-lead">{chapter.intro || chapter.summary}</p>
        <div className="prg-hero-meta">
          <span className="prg-chip">{chapter.sections.length} {plural(chapter.sections.length, 'раздел', 'раздела', 'разделов')}</span>
          <button type="button" className="prg-chip is-link" onClick={() => navigate(`/autumn-camp/program/${chapter.num}/task`)}>Задание к главе →</button>
        </div>
      </div>

      <div className="prg-layout">
        <nav className="prg-toc" aria-label="Содержание главы">
          <div className="prg-toc-label">Содержание</div>
          {dir.start && (
            <button type="button" className="prg-toc-item is-start" onClick={() => jump('prg-start')}>
              <span className="prg-toc-num">→</span>
              <span>{dir.start.title}</span>
            </button>
          )}
          {chapter.sections.map(s => (
            <Fragment key={s.id}>
              {s.divider && <div className="prg-toc-divider">{s.divider}</div>}
              <button type="button" className="prg-toc-item" onClick={() => jump(`prg-${s.id}`)}>
                <span className="prg-toc-num">{s.num}</span>
                <span>{s.title}</span>
              </button>
            </Fragment>
          ))}
          <button type="button" className="prg-toc-item is-task" onClick={() => navigate(`/autumn-camp/program/${chapter.num}/task`)}>
            <span className="prg-toc-num">✓</span>
            <span>Задание к главе</span>
          </button>
        </nav>

        <div className="prg-content">
          <StartPanel start={dir.start} />
          {chapter.sections.map(s => (
            <Fragment key={s.id}>
              {s.divider && <div className="prg-divider">{s.divider}</div>}
              <section id={`prg-${s.id}`} className="prg-section">
                <div className="prg-section-head">
                  <span className="prg-section-num">{s.num}</span>
                  <h2 className="prg-section-title">{s.title}</h2>
                </div>
                <ProgramBlocks blocks={s.blocks} />
                <Terms terms={s.terms} />
              </section>
            </Fragment>
          ))}
          <TaskCta dir={dir} meta={meta} />
        </div>
      </div>
    </section>
  )
}

function Task({ dir, chapterNum, user }) {
  const meta = dir.chapters.find(c => c.num === chapterNum)
  const [chapter, setChapter] = useState(null)
  const [quiz, setQuiz] = useState(null)

  useEffect(() => {
    let alive = true
    setChapter(null)
    setQuiz(null)
    if (meta) {
      Promise.all([meta.load(), meta.quiz ? meta.quiz() : Promise.resolve(null)])
        .then(([c, q]) => { if (alive) { setChapter(c.default); setQuiz(q?.default || null) } })
    }
    window.scrollTo(0, 0)
    return () => { alive = false }
  }, [meta])

  if (!meta) return <Overview dir={dir} />
  if (!chapter) return <section className="page active prg-page"><p className="prg-loading">Загружаем задание…</p></section>

  const count = quiz ? (quiz.variants ? `${quiz.questions.filter(q => !q.python).length} или ${quiz.questions.length}` : quiz.questions.length) : 0
  const kind = taskKind(dir, meta, chapter)
  const KIND_CHIP = { trainer: 'Проверяется в тренажёре', file: 'Сдаётся файлом в Telegram', self: 'Сдавать на платформе не нужно', soon: 'Задание скоро появится' }

  return (
    <section className="page active prg-page">
      <BackLink to={`/autumn-camp/program/${chapter.num}`}>Конспект главы {chapter.num}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Глава {chapter.num} · задание</span>
        <h1 className="prg-title">Задание к главе {chapter.num}</h1>
        <p className="prg-lead">{quiz ? quiz.intro : `${chapter.title}. Самостоятельная работа по материалам главы.`}</p>
        <div className="prg-hero-meta">
          {quiz
            ? <span className="prg-chip">{count} вопросов · сдаётся на платформе</span>
            : <span className="prg-chip">{KIND_CHIP[kind]}</span>}
          {!quiz && chapter.assignment?.time && <span className="prg-chip">{chapter.assignment.time}</span>}
        </div>
      </div>

      <ProgramContext.Provider value={{ direction: dir.key, chapter: chapter.num }}>
        <div className="prg-task-body">
          {quiz
            ? <ProgramQuiz quiz={quiz} direction={dir.key} chapter={chapter.num} user={user} />
            : chapter.assignment
              ? <>
                  <SubmitPanel kind={kind} />
                  <Assignment a={chapter.assignment} />
                  {kind === 'file' && <SubmitPanel kind={kind} />}
                </>
              : <div className="prg-empty">Задание к этой главе скоро появится.</div>}
        </div>
      </ProgramContext.Provider>
    </section>
  )
}

export default function AutumnProgramPage({ user, task = false }) {
  const { chapter } = useParams()
  const dir = directionOf(user)

  if (!user?.isAutumnCamp2026) return <Pending title="Программа доступна участникам осеннего лагеря" />
  if (!dir) return <Pending title="Твоя индивидуальная программа ещё готовится" />
  if (chapter && task) return <Task dir={dir} chapterNum={Number(chapter)} user={user} />
  if (chapter) return <Chapter dir={dir} chapterNum={Number(chapter)} />
  return <Overview dir={dir} />
}

