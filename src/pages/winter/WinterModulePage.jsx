import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  WINTER_CONTACT, findWinterChapter, findWinterModule, isCountable, taskKey, winterDirectionOf,
} from '../../data/winter'
import ProgramBlocks, { ProgramContext, Rich } from '../../components/program/ProgramBlocks'
import WinterBlocks, { MiniQuiz, SelfCheck } from '../../components/winter/WinterBlocks'
import WinterTask from '../../components/winter/WinterTask'
import WinterAutoTest from '../../components/winter/WinterAutoTest'
import SqlDataset from '../../components/SqlDataset'
import { HW_LABEL, summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { loadVisited, markVisited, plural } from '../../components/winter/winterLocal'
import { track } from '../../lib/analytics'
import '../../winter.css'

// Блок программы зимнего лагеря:
// /winter-camp/m/:module — обзор блока и список глав,
// /winter-camp/m/:module/:chapter — конспект главы,
// /winter-camp/m/:module/:chapter/task — задание к главе.

const base = mod => `/winter-camp/m/${mod.key}`

const DIFFICULTY = { easy: 'лёгкая', medium: 'средняя', hard: 'сложная' }
const DIFF_DOTS = { easy: 1, medium: 2, hard: 3 }

function Difficulty({ level }) {
  if (!DIFFICULTY[level]) return null
  return (
    <span className={`wm-diff is-${level}`} title={`Сложность: ${DIFFICULTY[level]}`}>
      <span className="wm-diff-dots" aria-hidden="true">
        {[1, 2, 3].map(i => <i key={i} className={i <= DIFF_DOTS[level] ? 'is-on' : ''} />)}
      </span>
      {DIFFICULTY[level]}
    </span>
  )
}

function BackLink({ to, children }) {
  return <Link className="prg-back" to={to}>← {children}</Link>
}

function Closed({ title, text }) {
  return (
    <section className="page active prg-page is-winter">
      <BackLink to="/winter-camp">Winter Camp</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">Winter Camp</span>
        <h1 className="prg-title">{title}</h1>
        {text && <p className="prg-lead">{text}</p>}
        <p className="prg-contact">
          Вопросы по доступу и направлению — в Telegram{' '}
          <a href={WINTER_CONTACT.url} target="_blank" rel="noopener noreferrer">{WINTER_CONTACT.text}</a>
        </p>
      </div>
    </section>
  )
}

// Подпись задания главы: статус сданной работы или то, как оно сдаётся
function taskMeta(ch, hw) {
  const t = ch.task
  if (!t) return 'проверь себя по вопросам в конспекте'
  if (hw && t.kind === 'auto') return `${hw.status === 'approved' ? 'пройден' : 'не пройден'} · ${hw.score} из ${hw.total}`
  if (hw) return `сдано · ${HW_LABEL[hw.status] || hw.status}`
  if (t.kind === 'quiz') {
    if (t.unit === 'tasks') return `${t.count} ${plural(t.count, 'задача', 'задачи', 'задач')} · сдаётся на проверку`
    return 'вопросы · сдаётся на проверку'
  }
  if (t.kind === 'auto') return `тест · ${t.count} вопросов · автопроверка`
  if (t.kind === 'notebook') return t.url ? 'практика в ноутбуке' : 'ноутбук скоро появится'
  return 'самостоятельная практика'
}

function taskState(ch, hw) {
  if (!hw) return ''
  if (hw.status === 'failed') return ' is-rework'
  return ` is-${hw.status}`
}

function ChapterRow({ mod, ch, index, hw, visited }) {
  const navigate = useNavigate()
  const lessonUrl = `${base(mod)}/${ch.ref}`
  return (
    <div className={`wm-row${ch.optional ? ' is-optional' : ''}${hw?.status === 'approved' ? ' is-done' : ''}`}>
      <span className="wm-row-num">{ch.label || String(index).padStart(2, '0')}</span>
      <div className="wm-row-main">
        <div className="wm-row-title">
          {ch.title}
          {ch.optional && <span className="wm-row-opt">по желанию</span>}
        </div>
        <div className="wm-row-meta">
          <Difficulty level={ch.difficulty} />
          {ch.hint && <span className="wm-row-hint">{ch.hint}</span>}
        </div>
      </div>
      <div className="wm-row-links">
        {!ch.taskOnly && (
          <button type="button" className={`prg-chapter-link${visited ? ' is-visited' : ''}`} onClick={() => navigate(lessonUrl)}>
            <span className="prg-chapter-link-name">Конспект{visited && <span className="wm-check" aria-label="прочитан">✓</span>}</span>
            <span className="prg-chapter-link-meta">{visited ? 'прочитан' : ch.sections ? `${ch.sections} ${plural(ch.sections, 'раздел', 'раздела', 'разделов')}` : 'теория по теме'}</span>
            <span className="prg-chapter-link-go">→</span>
          </button>
        )}
        {(ch.task || ch.taskOnly) && (
          <button type="button" className={`prg-chapter-link is-task${taskState(ch, hw)}`} onClick={() => navigate(`${lessonUrl}/task`)}>
            <span className="prg-chapter-link-name">{ch.task?.kind === 'auto' ? 'Тест' : ch.taskOnly ? 'Задачи' : 'Задание'}</span>
            <span className="prg-chapter-link-meta">{taskMeta(ch, hw)}</span>
            <span className="prg-chapter-link-go">→</span>
          </button>
        )}
        {ch.video && (
          <a className="prg-chapter-link is-video" href={ch.video} target="_blank" rel="noopener noreferrer">
            <span className="prg-chapter-link-name">{ch.videoLabel || 'Запись встречи'}</span>
            <span className="prg-chapter-link-meta">{/t\.me\//.test(ch.video) ? 'запись в Telegram' : 'видео на YouTube'}</span>
            <span className="prg-chapter-link-go">↗</span>
          </a>
        )}
      </div>
    </div>
  )
}

function Overview({ mod, user, homework }) {
  const navigate = useNavigate()
  const visited = useMemo(() => loadVisited(user), [user?.id])
  const tasks = mod.chapters.filter(c => isCountable(c) && !c.optional).map(c => ({ key: taskKey(mod, c) }))
  const sum = summarize(tasks, homework.byKey)
  const lessons = mod.chapters.filter(c => !c.taskOnly)
  const number = new Map(mod.chapters.map((c, i) => [c.ref, i + 1]))
  const row = ch => (
    <ChapterRow key={ch.ref} mod={mod} ch={ch} index={number.get(ch.ref)} hw={homework.byKey[taskKey(mod, ch)]} visited={visited.has(taskKey(mod, ch))} />
  )

  return (
    <section className="page active prg-page is-winter">
      <BackLink to="/winter-camp">Winter Camp</BackLink>
      <div className="prg-hero wm-hero">
        <span className="prg-tag">{mod.tag}</span>
        <h1 className="prg-title">{mod.name}</h1>
        <p className="prg-lead">{mod.lead}</p>
        <div className="prg-hero-meta">
          <span className="prg-chip">{lessons.length} {plural(lessons.length, 'глава', 'главы', 'глав')}</span>
          {sum.total > 0 && <span className="prg-chip">{sum.total} {plural(sum.total, 'задание', 'задания', 'заданий')} на платформе</span>}
          {sum.total > 0 && <span className={`prg-chip${sum.approved === sum.total ? ' wm-chip-done' : ''}`}>принято {sum.approved} из {sum.total}</span>}
          {sum.rework > 0 && <span className="prg-chip wm-chip-alert">нужны правки: {sum.rework}</span>}
        </div>
        {sum.total > 0 && (
          <div className="wm-progress" role="progressbar" aria-valuemin={0} aria-valuemax={sum.total} aria-valuenow={sum.approved} aria-label="Принятые задания блока">
            <span className="is-approved" style={{ width: `${(sum.approved / sum.total) * 100}%` }} />
            <span className="is-submitted" style={{ width: `${(sum.submitted / sum.total) * 100}%` }} />
            <span className="is-rework" style={{ width: `${(sum.rework / sum.total) * 100}%` }} />
          </div>
        )}
        {mod.express?.length > 0 && (
          <div className="prg-express">
            <span className="prg-express-label">Мало времени? Начни с короткой версии:</span>
            <div className="prg-express-row">
              {mod.express.map(ch => (
                <button key={ch.ref} type="button" className="prg-express-btn" onClick={() => navigate(`${base(mod)}/${ch.ref}`)}>
                  <span className="prg-express-name">{ch.label}</span>
                  <span className="prg-express-meta">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {homework.error && <div className="pq-alert" role="alert">{homework.error}</div>}

      {mod.groups ? mod.groups.map(g => (
        <Fragment key={g.level}>
          <h2 className="prg-list-title wm-group-title">{g.title}</h2>
          <p className="wm-group-note">{g.note}</p>
          <div className="wm-list">{mod.chapters.filter(c => c.level === g.level).map(row)}</div>
        </Fragment>
      )) : (
        <>
          <h2 className="prg-list-title">Главы блока</h2>
          <div className="wm-list">{mod.chapters.map(row)}</div>
        </>
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

// Задание для самостоятельной работы из главы программы (ноутбуки, практика)
function Assignment({ a, title = 'Задание для самостоятельной работы' }) {
  return (
    <section id="prg-assignment" className="prg-section prg-assignment">
      <div className="prg-section-head">
        <span className="prg-section-num">Практика</span>
        <h2 className="prg-section-title">{title}</h2>
      </div>
      {(a.time || a.format) && (
        <div className="prg-assign-meta">
          {a.time && <div><span>Время выполнения</span><b>{a.time}</b></div>}
          {a.format && <div><span>Формат</span><b>{a.format}</b></div>}
        </div>
      )}
      {a.situation?.length > 0 && (
        <div className="prg-situation">
          <div className="prg-situation-label">Исходная ситуация</div>
          {a.situation.map((p, i) => <p key={i}><Rich text={p} /></p>)}
        </div>
      )}
      <div className="prg-parts">
        {(a.parts || []).map(part => (
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
            <div className="prg-part-head"><h3>{a.selfCheckTitle || 'Вопросы для самопроверки'}</h3></div>
            {a.selfCheckIntro && <p className="prg-p">{a.selfCheckIntro}</p>}
            <ol className="prg-ol">{a.selfCheck.map((q, i) => <li key={i}>{q}</li>)}</ol>
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
  quiz: 'Ответы и решения отправляются на проверку прямо на платформе: проверяющий примет работу или вернёт её с комментарием.',
  auto: 'Тест с вариантами ответа: результат виден сразу и идёт в зачёт.',
  notebook: 'Практика по теме главы — в ноутбуке.',
  self: 'Самостоятельная практика по материалам главы — сдавать её не нужно.',
}

function useLesson(meta) {
  const [lesson, setLesson] = useState(null)
  useEffect(() => {
    let alive = true
    setLesson(null)
    if (meta && !meta.taskOnly) meta.load().then(l => { if (alive) setLesson(l) })
    return () => { alive = false }
  }, [meta])
  return lesson
}

function Lesson({ mod, meta, user, homework }) {
  const navigate = useNavigate()
  const lesson = useLesson(meta)
  const id = taskKey(mod, meta)
  const lessons = mod.chapters.filter(c => !c.taskOnly)
  const pos = lessons.findIndex(c => c.ref === meta.ref)
  const prev = pos > 0 ? lessons[pos - 1] : null
  const next = pos >= 0 && pos < lessons.length - 1 ? lessons[pos + 1] : null
  const hw = homework.byKey[id]
  const [read, setRead] = useState(() => loadVisited(user).has(id))

  useEffect(() => {
    window.scrollTo(0, 0)
    setRead(loadVisited(user).has(id))
    track('material_open', { camp: 'winter', module: mod.key, chapter: meta.ref, title: String(meta.title || '').slice(0, 80) })
  }, [id])

  // Конспект считается прочитанным, когда студент долистал до 80 % страницы
  useEffect(() => {
    if (!lesson || read) return
    const check = () => {
      const doc = document.documentElement
      const scrollable = doc.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      if (window.scrollY / scrollable >= 0.8) {
        markVisited(user, id)
        setRead(true)
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [lesson, read, id])

  if (!lesson) return <section className="page active prg-page is-winter"><p className="prg-loading">Загружаем главу…</p></section>

  const jump = (target) => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const taskUrl = `${base(mod)}/${meta.ref}/task`
  const sections = lesson.sections

  return (
    <section className="page active prg-page is-winter">
      <BackLink to={base(mod)}>{mod.name}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">{meta.label || (pos >= 0 ? `Глава ${pos + 1} из ${lessons.length}` : mod.short)}</span>
        <h1 className="prg-title">{meta.title || lesson.title}</h1>
        {(lesson.intro || lesson.summary) && <p className="prg-lead">{lesson.intro || lesson.summary}</p>}
        <div className="prg-hero-meta">
          <span className="prg-chip">{sections.length} {plural(sections.length, 'раздел', 'раздела', 'разделов')}</span>
          {read && <span className="prg-chip wm-chip-done">✓ прочитано</span>}
          <Difficulty level={meta.difficulty} />
          {meta.task && (
            <button type="button" className="prg-chip is-link" onClick={() => navigate(taskUrl)}>
              {meta.task.kind === 'auto' ? 'Тест' : 'Задание'}{hw ? ` · ${HW_LABEL[hw.status] || hw.status}` : ''} →
            </button>
          )}
          {meta.video && <a className="prg-chip is-link" href={meta.video} target="_blank" rel="noopener noreferrer">▶ {meta.videoLabel || 'Запись встречи'}</a>}
        </div>
      </div>

      <div className="prg-layout">
        <nav className="prg-toc" aria-label="Содержание главы">
          <div className="prg-toc-label">Содержание</div>
          {sections.map((s, i) => (
            <Fragment key={s.id}>
              {s.divider && <div className="prg-toc-divider">{s.divider}</div>}
              <button type="button" className="prg-toc-item" onClick={() => jump(`prg-${s.id}`)}>
                <span className="prg-toc-num">{i + 1}</span>
                <span>{s.title}</span>
              </button>
            </Fragment>
          ))}
          {lesson.selfCheck?.length > 0 && (
            <button type="button" className="prg-toc-item" onClick={() => jump('prg-selfcheck')}>
              <span className="prg-toc-num">?</span>
              <span>Проверь себя</span>
            </button>
          )}
          {meta.task && (
            <button type="button" className="prg-toc-item is-task" onClick={() => navigate(taskUrl)}>
              <span className="prg-toc-num">✓</span>
              <span>{meta.task.kind === 'auto' ? 'Тест к главе' : 'Задание к главе'}</span>
            </button>
          )}
        </nav>

        <div className="prg-content">
          <ProgramContext.Provider value={meta.files || null}>
            {sections.map((s, i) => (
              <Fragment key={s.id}>
                {s.divider && <div className="prg-divider">{s.divider}</div>}
                <section id={`prg-${s.id}`} className="prg-section">
                  <div className="prg-section-head">
                    <span className="prg-section-num">{i + 1}</span>
                    <h2 className="prg-section-title">{s.title}</h2>
                  </div>
                  <WinterBlocks blocks={s.blocks} />
                  <Terms terms={s.terms} />
                </section>
              </Fragment>
            ))}
          </ProgramContext.Provider>

          <SelfCheck items={lesson.selfCheck} />
          <MiniQuiz quiz={lesson.miniQuiz} />

          {meta.task && (
            <section className="prg-section prg-task-cta">
              <div>
                <div className="prg-task-cta-kicker">Конспект прочитан?</div>
                <h2 className="prg-section-title">{meta.task.kind === 'auto' ? 'Тест к главе' : 'Задание к главе'}</h2>
                <p className="prg-p">{CTA_TEXT[meta.task.kind]}</p>
              </div>
              <button type="button" className="prg-task-cta-btn" onClick={() => navigate(taskUrl)}>
                {hw ? 'Открыть работу →' : 'Перейти к заданию →'}
              </button>
            </section>
          )}

          <div className="wl-nav">
            {prev
              ? <button type="button" className="wl-nav-btn" onClick={() => navigate(`${base(mod)}/${prev.ref}`)}><span>← Предыдущая глава</span><b>{prev.title}</b></button>
              : <span />}
            {next
              ? <button type="button" className="wl-nav-btn is-next" onClick={() => navigate(`${base(mod)}/${next.ref}`)}><span>Следующая глава →</span><b>{next.title}</b></button>
              : <button type="button" className="wl-nav-btn is-next" onClick={() => navigate(base(mod))}><span>Это последняя глава</span><b>К списку глав блока →</b></button>}
          </div>
        </div>
      </div>
    </section>
  )
}

const KIND_CHIP = {
  quiz: 'Сдаётся на проверку на платформе',
  auto: 'Автопроверка · результат сразу',
  notebook: 'Практика в ноутбуке',
  self: 'Сдавать на платформе не нужно',
}

function NotebookPanel({ task }) {
  return (
    <div className="prg-submit wt-notebook">
      <div className="prg-submit-label">Ноутбук с заданием</div>
      {task.url ? (
        <p>
          Практика к этой главе выполняется в ноутбуке:{' '}
          <a href={task.url} target="_blank" rel="noopener noreferrer">открыть ноутбук ↗</a>.
          Сделай копию к себе и выполняй задания по порядку.
        </p>
      ) : (
        <p>Ноутбук с практикой к этой главе скоро появится — ссылка будет на этом месте. Пока проверь себя по вопросам в конце конспекта.</p>
      )}
    </div>
  )
}

function Task({ mod, meta, user, homework }) {
  const lesson = useLesson(meta)
  const [data, setData] = useState(null)
  const key = taskKey(mod, meta)
  const kind = meta.task?.kind
  const title = meta.title

  useEffect(() => {
    let alive = true
    setData(null)
    if (meta.task?.load) meta.task.load().then(d => { if (alive) setData(d) })
    window.scrollTo(0, 0)
    return () => { alive = false }
  }, [meta])

  const needsData = Boolean(meta.task?.load)
  const waiting = (needsData && !data) || (!meta.taskOnly && !lesson) || homework.loading
  const server = homework.byKey[key] || null
  const count = data?.questions?.length

  return (
    <section className="page active prg-page is-winter">
      <BackLink to={meta.taskOnly ? base(mod) : `${base(mod)}/${meta.ref}`}>{meta.taskOnly ? mod.name : `Конспект: ${meta.title}`}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">{mod.short} · {kind === 'auto' ? 'тест' : 'задание'}</span>
        <h1 className="prg-title">{meta.taskOnly ? meta.title : kind === 'auto' ? 'Тест к главе' : 'Задание к главе'}</h1>
        <p className="prg-lead">{kind === 'quiz' && data?.intro ? data.intro : meta.taskOnly ? mod.lead : `${meta.title}. ${CTA_TEXT[kind] || 'У этой главы нет отдельного задания.'}`}</p>
        <div className="prg-hero-meta">
          {kind && <span className="prg-chip">{KIND_CHIP[kind]}</span>}
          {kind === 'quiz' && count > 0 && <span className="prg-chip">{count} {plural(count, ...(data.unit || ['вопрос', 'вопроса', 'вопросов']))}</span>}
        </div>
      </div>

      {homework.error && <div className="pq-alert" role="alert">{homework.error}</div>}

      <ProgramContext.Provider value={meta.files || null}>
        <div className="prg-task-body">
          {waiting ? (
            <div className="prg-section"><p className="prg-loading">Загружаем задание…</p></div>
          ) : (
            <>
              {kind === 'quiz' && meta.task.dataset && (
                <section className="prg-section">
                  <div className="prg-section-head">
                    <span className="prg-section-num">Данные</span>
                    <h2 className="prg-section-title">Датасет интернет-магазина</h2>
                  </div>
                  <SqlDataset />
                  <p className="prg-small">Хочешь больше практики с автопроверкой — открой <Link className="prg-link" to="/trainings/sql">SQL-тренажёр</Link>: там запросы выполняются на настоящей базе.</p>
                </section>
              )}
              {kind === 'quiz' && <WinterTask quiz={data} taskKey={key} title={title} user={user} server={server} onSaved={homework.upsert} />}
              {kind === 'auto' && <WinterAutoTest test={data} taskKey={key} title={title} server={server} onSaved={homework.upsert} />}
              {/* Ссылка на ноутбук; «скоро появится» — только если у главы нет своего задания с файлами */}
              {kind === 'notebook' && (meta.task.url || !lesson?.assignment) && <NotebookPanel task={meta.task} />}
              {lesson?.assignment && (kind === 'notebook' || kind === 'self' || meta.practice) && (
                <Assignment a={lesson.assignment} title={meta.practice ? 'Практика в ноутбуке — по желанию' : undefined} />
              )}
              {kind === 'self' && !lesson?.assignment && <div className="prg-empty">Отдельного задания у этой главы нет — решай задачи из конспекта.</div>}
              {!kind && <div className="prg-empty">У этой главы нет задания — проверь себя по вопросам в конце конспекта.</div>}
            </>
          )}
        </div>
      </ProgramContext.Provider>
    </section>
  )
}

export default function WinterModulePage({ user, task = false }) {
  const { module: moduleKey, chapter } = useParams()
  const direction = winterDirectionOf(user)
  const homework = useWinterHomework(!!user?.isWinterCamp2027)

  if (!user?.isWinterCamp2027) return <Closed title="Раздел доступен участникам зимнего лагеря" />
  const mod = findWinterModule(moduleKey, direction?.key)
  if (!mod) return <Closed title="Такого блока нет" text="Возможно, ссылка устарела — открой программу лагеря и выбери блок оттуда." />
  if (mod.foreign) return <Closed title="Этот блок — из программы другого направления" text={direction ? `Твоё направление — ${direction.name}. Блоки своей программы открываются со страницы лагеря.` : 'Твоё направление ещё не выбрано.'} />

  const meta = chapter ? findWinterChapter(mod, chapter) : null
  if (chapter && !meta) return <Navigate to={base(mod)} replace />
  if (meta && (task || meta.taskOnly)) return <Task mod={mod} meta={meta} user={user} homework={homework} />
  if (meta) return <Lesson mod={mod} meta={meta} user={user} homework={homework} />
  return <Overview mod={mod} user={user} homework={homework} />
}
