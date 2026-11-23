import { Fragment, useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  WINTER_CONTACT, findWinterChapter, findWinterModule, isCountable, taskKey, winterDirectionOf, winterProgram,
} from '../../data/winter'
import ProgramBlocks, { ProgramContext, Rich } from '../../components/program/ProgramBlocks'
import WinterBlocks, { MiniQuiz, SelfCheck } from '../../components/winter/WinterBlocks'
import WinterTask from '../../components/winter/WinterTask'
import WinterAutoTest from '../../components/winter/WinterAutoTest'
import SqlDataset from '../../components/SqlDataset'
import { HW_LABEL, summarize, useWinterHomework } from '../../components/winter/useWinterHomework'
import { plural } from '../../components/winter/winterLocal'
import WinterChapterCard from '../../components/winter/WinterChapterCard'
import { chapterStep, chapterUrl, winterRoute } from '../../data/winter/route'
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

function Overview({ mod, homework, route }) {
  const navigate = useNavigate()
  const tasks = mod.chapters.filter(c => isCountable(c) && !c.optional).map(c => ({ key: taskKey(mod, c) }))
  const sum = summarize(tasks, homework.byKey)
  const lessons = mod.chapters.filter(c => !c.taskOnly)
  const number = new Map(route.filter(entry => entry.mod === mod).map(entry => [entry.ch.ref, entry.number]))
  const row = ch => (
    <WinterChapterCard key={ch.ref} entry={{ mod, ch, number: number.get(ch.ref) ?? mod.chapters.indexOf(ch) + 1 }} homework={homework.byKey[taskKey(mod, ch)]} />
  )

  return (
    <section className="page active prg-page is-winter wc-module-overview">
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
          <div className="wc-chs">{mod.chapters.filter(c => c.level === g.level).map(row)}</div>
        </Fragment>
      )) : (
        <>
          <h2 className="prg-list-title">Главы блока</h2>
          <div className="wc-chs">{mod.chapters.map(row)}</div>
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

function ChapterNavigation({ entry, next, homework, taskPage = false }) {
  if (!entry) return <Link className="prg-back" to="/winter-camp">К основной программе →</Link>
  const needsResult = entry.ch.taskOnly || isCountable(entry.ch)
  const step = needsResult ? chapterStep(entry, homework.byKey) : null
  const status = needsResult ? homework.byKey[entry.key]?.status : null
  const canContinue = !needsResult || (!homework.loading && !homework.error && !step)
  let hint
  if (needsResult && homework.loading) hint = 'Проверяем статус задания…'
  else if (needsResult && homework.error) hint = 'Статус задания недоступен. Вернись к программе, чтобы обновить прогресс.'
  else if (status === 'submitted') hint = 'Работа на проверке. Можно продолжать обучение.'
  else if (step) hint = entry.ch.optional
    ? 'Эта глава по желанию. Можешь выполнить задание или продолжить программу.'
    : 'Выполни этот шаг, чтобы перейти к следующей главе.'

  return (
    <nav className="wc-chapter-nav" aria-label="Следующий шаг">
      {hint && <p className="prg-p">{hint}</p>}
      {step && !taskPage && !homework.loading && !homework.error && (
        <Link className="prg-task-cta-btn" to={step.url}>{step.label} →</Link>
      )}
      {(canContinue || entry.ch.optional) && (
        <Link className="prg-task-cta-btn" to={next && !next.needsDirection ? chapterUrl(next) : '/winter-camp'}>
          {next?.needsDirection ? 'К выбору направления →' : next ? `Глава ${next.number}. ${next.ch.title} →` : 'К основной программе →'}
        </Link>
      )}
      <Link className="prg-back" to={base(entry.mod)}>К списку глав</Link>
    </nav>
  )
}

function Lesson({ mod, meta, homework, entry, next }) {
  const navigate = useNavigate()
  const lesson = useLesson(meta)
  const id = taskKey(mod, meta)
  const hw = homework.byKey[id]
  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!lesson) return <section className="page active prg-page is-winter"><p className="prg-loading">Загружаем главу…</p></section>

  const jump = (target) => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const taskUrl = `${base(mod)}/${meta.ref}/task`
  const sections = lesson.sections

  return (
    <section className="page active prg-page is-winter">
      <BackLink to={base(mod)}>{mod.name}</BackLink>
      <div className="prg-hero">
        <span className="prg-tag">{entry ? `Глава ${entry.number} · ${mod.short}` : meta.label || mod.short}</span>
        <h1 className="prg-title">{meta.title || lesson.title}</h1>
        {(lesson.intro || lesson.summary) && <p className="prg-lead">{lesson.intro || lesson.summary}</p>}
        <div className="prg-hero-meta">
          <span className="prg-chip">{sections.length} {plural(sections.length, 'раздел', 'раздела', 'разделов')}</span>
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

          {meta.task && !isCountable(meta) && (
            <section className="prg-section prg-task-cta">
              <div>
                <h2 className="prg-section-title">{meta.task.kind === 'auto' ? 'Тест к главе' : 'Задание к главе'}</h2>
                <p className="prg-p">{CTA_TEXT[meta.task.kind]}</p>
              </div>
              <button type="button" className="prg-task-cta-btn" onClick={() => navigate(taskUrl)}>
                {hw ? 'Открыть работу →' : 'Перейти к заданию →'}
              </button>
            </section>
          )}

          <ChapterNavigation entry={entry} next={next} homework={homework} />
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

function Task({ mod, meta, user, homework, entry, next }) {
  const lesson = useLesson(meta)
  const [data, setData] = useState(null)
  const key = taskKey(mod, meta)
  const kind = meta.task?.kind
  const title = meta.task?.title || meta.title

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
        <span className="prg-tag">{entry ? `Глава ${entry.number} · ` : ''}{mod.short} · {kind === 'auto' ? 'тест' : 'задание'}</span>
        <h1 className="prg-title">{meta.task?.title || (meta.taskOnly ? meta.title : kind === 'auto' ? 'Тест к главе' : 'Задание к главе')}</h1>
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
      {!waiting && <ChapterNavigation entry={entry} next={next} homework={homework} taskPage />}
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

  const route = winterRoute(winterProgram(direction?.key).flatMap(month => month.stages))
  const meta = chapter ? findWinterChapter(mod, chapter) : null
  if (chapter && !meta) return <Navigate to={base(mod)} replace />
  if (task && meta && !meta.task && !meta.taskOnly) return <Navigate to={`${base(mod)}/${meta.ref}`} replace />
  const position = meta ? route.findIndex(entry => entry.key === taskKey(mod, meta)) : -1
  const entry = route[position]
  const next = entry && route.slice(position + 1).find(item => item.needsDirection || !item.ch.optional)
  if (meta && (task || meta.taskOnly)) return <Task key={meta.ref} mod={mod} meta={meta} user={user} homework={homework} entry={entry} next={next} />
  if (meta) return <Lesson key={meta.ref} mod={mod} meta={meta} homework={homework} entry={entry} next={next} />
  return <Overview mod={mod} homework={homework} route={route} />
}
