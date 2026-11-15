import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../api'
import { Rich } from '../program/ProgramBlocks'
import PythonRunner from '../PythonRunner'
import { usePythonState } from '../../lib/python/runner'

// Задание главы зимнего лагеря: вопросы и задачи идут по одному. На вопрос отвечают текстом,
// задачу на код решают в редакторе с запуском прямо в браузере, SQL — в моноширинном поле.
// Черновик сохраняется в браузере на каждом шаге. По кнопке «Отправить» работа уходит
// в админку («Зимний лагерь → Проверка ДЗ») единым массивом «задание + ответ».

const STATUS = {
  submitted: { label: 'На проверке', text: 'Работа отправлена и ждёт проверки. Пока её не проверили, ответы можно поправить и отправить снова.' },
  approved: { label: 'Принято', text: 'Работа проверена и принята.' },
  rework: { label: 'Нужны правки', text: 'Проверяющий оставил комментарий. Поправь ответы и отправь работу снова.' },
}

function plural(n, [one, few, many]) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

function readDraft(key) {
  try {
    const d = JSON.parse(localStorage.getItem(key))
    if (d && typeof d === 'object') return { answers: d.answers || {}, kinds: d.kinds || {}, index: Number(d.index) || 0 }
  } catch { /* приватный режим или битые данные — начинаем с пустого */ }
  return { answers: {}, kinds: {}, index: 0 }
}

function writeDraft(key, draft) {
  try { localStorage.setItem(key, JSON.stringify(draft)) } catch { /* без хранилища черновик живёт до перезагрузки */ }
}

function dateLabel(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
}

function Hint({ text }) {
  const [open, setOpen] = useState(false)
  useEffect(() => { setOpen(false) }, [text])
  if (!text) return null
  return (
    <div className="wt-hint">
      <button type="button" className="wt-hint-btn" onClick={() => setOpen(o => !o)} aria-expanded={open}>
        {open ? 'Скрыть подсказку' : 'Подсказка'}
      </button>
      {open && <p className="wt-hint-text"><Rich text={text} /></p>}
    </div>
  )
}

export default function WinterTask({ quiz, taskKey, title, user, server, onSaved }) {
  const storageKey = `kiro_winter_task:${user?.id || 'anon'}:${taskKey}`
  const unit = quiz.unit || ['вопрос', 'вопроса', 'вопросов']
  const [draft, setDraft] = useState(() => readDraft(storageKey))
  const [mode, setMode] = useState(null) // answer | review | done
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [savedTick, setSavedTick] = useState(false)
  const areaRef = useRef(null)
  const topRef = useRef(null)
  const { running } = usePythonState()

  // Если на этом устройстве черновика нет, подставляем отправленные ответы —
  // чтобы правки не приходилось писать с нуля
  useEffect(() => {
    if (!server) return
    setDraft(d => {
      if (Object.keys(d.answers).length) return d
      const answers = {}, kinds = {}
      for (const a of server.answers || []) { answers[a.id] = a.answer; if (a.kind) kinds[a.id] = a.kind }
      return { answers, kinds, index: 0 }
    })
  }, [server?.id])

  // Отправленная работа открывается итогом, новая и работа с правками — первым заданием
  useEffect(() => {
    if (mode) return
    setMode(server && server.status !== 'rework' ? 'done' : 'answer')
  }, [server, mode])

  // Черновик пишем в браузер с небольшой задержкой — не на каждую букву
  useEffect(() => {
    const t = setTimeout(() => { writeDraft(storageKey, draft); setSavedTick(true) }, 400)
    setSavedTick(false)
    return () => clearTimeout(t)
  }, [draft, storageKey])

  const questions = quiz.questions
  const index = Math.min(draft.index, questions.length - 1)
  const question = questions[index]
  const kindOf = (q) => (q.kind === 'sql' ? 'sql' : (draft.kinds[q.id] || q.kind || 'text'))
  const filled = (q) => Boolean((draft.answers[q.id] || '').trim())
  const answered = useMemo(() => questions.filter(filled).length, [questions, draft.answers])
  const missing = questions.length - answered
  const locked = server?.status === 'approved'
  // Переключатель «текстом / кодом» нужен только там, где в задании есть задачи на код
  const hasCode = questions.some(q => q.kind === 'code')

  const scrollTop = () => requestAnimationFrame(() => {
    const top = topRef.current?.getBoundingClientRect().top
    if (top !== undefined && top < 0) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
  const goTo = (i) => {
    setDraft(d => ({ ...d, index: Math.max(0, Math.min(i, questions.length - 1)) }))
    setMode('answer')
    setConfirming(false)
    scrollTop()
  }
  const setAnswer = (text) => setDraft(d => ({ ...d, answers: { ...d.answers, [question.id]: text } }))
  const setKind = (kind) => setDraft(d => ({ ...d, kinds: { ...d.kinds, [question.id]: kind } }))
  const next = () => {
    if (index < questions.length - 1) goTo(index + 1)
    else { setMode('review'); scrollTop() }
  }

  // Поле растёт вместе с текстом, чтобы длинный ответ был виден целиком
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(el.scrollHeight, kindOf(question) === 'sql' ? 180 : 200)}px`
  }, [question?.id, draft.answers, draft.kinds, mode])

  const submit = async () => {
    setSending(true)
    setSendError('')
    try {
      const saved = await api.submitWinterHomework(taskKey, {
        title,
        answers: questions.map(q => ({ id: q.id, question: q.text, answer: draft.answers[q.id] || '', kind: kindOf(q) })),
      })
      onSaved(saved)
      setMode('done')
      setConfirming(false)
      scrollTop()
    } catch (e) {
      setSendError(e.message || 'Не получилось отправить — попробуй ещё раз')
    } finally {
      setSending(false)
    }
  }

  // Кнопка отправки стоит и в шапке проверки, и внизу списка: подтверждение раскрывается там, где нажали
  const sendControls = (place) => (confirming !== place ? (
    <button type="button" className="pq-btn" disabled={answered === 0 || Boolean(confirming)} onClick={() => setConfirming(place)}>Отправить на проверку</button>
  ) : (
    <span className="pq-confirm">
      <span>
        Отправить на проверку?
        {missing > 0 && ` Без ответа останется ${missing} ${plural(missing, unit)}.`}
      </span>
      <button type="button" className="pq-btn is-ghost" onClick={() => setConfirming(false)} disabled={sending}>Отмена</button>
      <button type="button" className="pq-btn" onClick={submit} disabled={sending}>{sending ? 'Отправляем…' : 'Да, отправить'}</button>
    </span>
  ))

  if (!mode) return <div className="prg-section"><p className="prg-loading">Загружаем задание…</p></div>

  const status = server ? STATUS[server.status] : null
  const kind = question ? kindOf(question) : 'text'

  return (
    <div className="pq wt" ref={topRef}>
      {server && status && (
        <div className={`pq-status is-${server.status}`}>
          <div className="pq-status-head">
            <span className="pq-status-badge">{status.label}</span>
            <span className="pq-status-date">отправлено {dateLabel(server.submittedAt)}</span>
          </div>
          <p>{status.text}</p>
          {server.status === 'rework' && server.comment && (
            <div className="pq-comment"><b>Комментарий проверяющего</b><span><Rich text={server.comment} /></span></div>
          )}
        </div>
      )}

      {/* ── Задания по одному ── */}
      {mode === 'answer' && question && (
        <section className="prg-section pq-card">
          <div className="pq-top">
            <span className="pq-counter">{unit[0][0].toUpperCase()}{unit[0].slice(1)} {index + 1} из {questions.length}</span>
            <span className="pq-answered">готово {answered} из {questions.length}</span>
          </div>
          <div className="pq-progress" aria-hidden="true"><span style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
          {questions.length > 1 && (
            <div className="pq-dots" role="list" aria-label="Задания">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  type="button"
                  role="listitem"
                  className={`pq-dot${i === index ? ' is-current' : ''}${filled(q) ? ' is-filled' : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`${i + 1}${filled(q) ? ', есть ответ' : ''}`}
                >{i + 1}</button>
              ))}
            </div>
          )}

          {question.topic && <div className="pq-topic">{question.topic}</div>}
          <h2 className="pq-question"><Rich text={question.text} /></h2>
          <Hint text={question.hint} />

          {hasCode && question.kind !== 'sql' && (
            <div className="wt-kind" role="group" aria-label="Вид ответа">
              <span>Ответ:</span>
              <button type="button" className={kind === 'text' ? 'is-active' : ''} aria-pressed={kind === 'text'} onClick={() => setKind('text')} disabled={locked}>текстом</button>
              <button type="button" className={kind === 'code' ? 'is-active' : ''} aria-pressed={kind === 'code'} onClick={() => setKind('code')} disabled={locked}>кодом на Python</button>
            </div>
          )}

          {kind === 'code' ? (
            <div className="wt-code">
              <PythonRunner
                key={question.id}
                value={draft.answers[question.id] || ''}
                onChange={setAnswer}
                readOnly={locked}
                minLines={12}
                placeholder="# Напиши решение и запусти его — кнопка «Запустить» под редактором"
              />
            </div>
          ) : (
            <textarea
              ref={areaRef}
              className={`pq-answer${kind === 'sql' ? ' wt-sql' : ''}`}
              value={draft.answers[question.id] || ''}
              onChange={e => setAnswer(e.target.value)}
              onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); next() } }}
              placeholder={kind === 'sql' ? 'SELECT …' : 'Распиши ответ своими словами: суть, пример и, где уместно, сравнение подходов'}
              aria-label={`Ответ ${index + 1}`}
              spellCheck={kind !== 'sql'}
              disabled={locked}
            />
          )}
          <div className="pq-meta">
            <span>{(draft.answers[question.id] || '').trim().length} символов</span>
            <span>{savedTick ? 'Черновик сохранён на этом устройстве' : 'Сохраняем…'}</span>
          </div>

          <div className="pq-nav">
            <button type="button" className="pq-btn is-ghost" onClick={() => goTo(index - 1)} disabled={index === 0 || running}>← Назад</button>
            <button type="button" className="pq-btn" onClick={next} disabled={running}>
              {index < questions.length - 1 ? 'Дальше →' : 'Проверить и отправить →'}
            </button>
          </div>
        </section>
      )}

      {/* ── Проверка перед отправкой ── */}
      {mode === 'review' && (
        <section className="prg-section">
          <div className="pq-review-head">
            <h2 className="prg-section-title">Проверь работу перед отправкой</h2>
            {sendControls('top')}
          </div>
          <p className="prg-p">
            {missing
              ? `Без ответа ${missing} ${plural(missing, unit)} — они отмечены ниже. Отправить можно и так, но лучше вернуться и ответить: нажми на строку.`
              : 'Ответы есть везде. Нажми на строку, если хочешь что-то поправить.'}
          </p>
          <ol className="pq-review">
            {questions.map((q, i) => (
              <li key={q.id}>
                <button type="button" className={`pq-review-item${filled(q) ? '' : ' is-empty'}`} onClick={() => goTo(i)}>
                  <span className="pq-review-num">{i + 1}</span>
                  <span className="pq-review-body">
                    <span className="pq-review-q">{q.text}</span>
                    <span className={`pq-review-a${kindOf(q) !== 'text' && filled(q) ? ' wt-mono' : ''}`}>{filled(q) ? draft.answers[q.id].trim() : 'Нет ответа'}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {sendError && <div className="pq-alert" role="alert">{sendError}</div>}
          <div className="pq-nav">
            <button type="button" className="pq-btn is-ghost" onClick={() => goTo(questions.length - 1)}>← К заданиям</button>
            {sendControls('bottom')}
          </div>
        </section>
      )}

      {/* ── Отправленная работа ── */}
      {mode === 'done' && server && (
        <section className="prg-section">
          <div className="prg-section-head">
            <span className="prg-section-num">Ответы</span>
            <h2 className="prg-section-title">Отправленная работа</h2>
          </div>
          <ol className="pq-sent">
            {server.answers.map((a, i) => (
              <li key={a.id}>
                <div className="pq-sent-q"><span>{i + 1}</span>{a.question}</div>
                {a.answer
                  ? (a.kind === 'code' || a.kind === 'sql'
                    ? <pre className="wt-sent-code"><code>{a.answer}</code></pre>
                    : <div className="pq-sent-a">{a.answer}</div>)
                  : <div className="pq-sent-a is-empty">Без ответа</div>}
              </li>
            ))}
          </ol>
          {server.status !== 'approved' && (
            <div className="pq-nav">
              <span />
              <button type="button" className="pq-btn" onClick={() => goTo(0)}>
                {server.status === 'rework' ? 'Исправить ответы →' : 'Изменить ответы →'}
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  )
}
