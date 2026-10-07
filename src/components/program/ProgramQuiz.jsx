import { useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../../api'
import { Rich } from './ProgramBlocks'

// Задание к главе из вопросов: вопросы идут по одному, ответы пишутся своими
// словами в большое поле. Черновик сохраняется в браузере на каждом шаге,
// поэтому можно закрыть вкладку и продолжить позже. По кнопке «Отправить»
// ответы уходят в админку единым массивом «вопрос + ответ».

const STATUS = {
  submitted: { label: 'На проверке', text: 'Ответы отправлены и ждут проверки. Пока работу не проверили, ответы можно поправить и отправить снова.' },
  approved: { label: 'Принято', text: 'Задание проверено и принято.' },
  rework: { label: 'Нужны правки', text: 'Проверяющий оставил комментарий. Поправь ответы и отправь задание снова.' },
}

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100
  if (m10 === 1 && m100 !== 11) return one
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few
  return many
}

function readDraft(key) {
  try {
    const d = JSON.parse(localStorage.getItem(key))
    if (d && typeof d === 'object') return { variant: d.variant || null, answers: d.answers || {}, index: Number(d.index) || 0 }
  } catch { /* приватный режим или битые данные — начинаем с пустого */ }
  return { variant: null, answers: {}, index: 0 }
}

function writeDraft(key, draft) {
  try { localStorage.setItem(key, JSON.stringify(draft)) } catch { /* без хранилища черновик живёт до перезагрузки */ }
}

function dateLabel(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleString('ru-RU', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
}

export default function ProgramQuiz({ quiz, direction, chapter, user }) {
  const storageKey = `kiro_prg_quiz:${user?.id || 'anon'}:${quiz.id}`
  const [draft, setDraft] = useState(() => readDraft(storageKey))
  const [server, setServer] = useState(undefined) // undefined — грузим, null — ещё не сдавали
  const [loadError, setLoadError] = useState('')
  const [mode, setMode] = useState(null)          // variant | answer | review | done
  const [confirming, setConfirming] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState('')
  const [savedTick, setSavedTick] = useState(false)
  const areaRef = useRef(null)
  const topRef = useRef(null)

  // Работа с сервера: если на этом устройстве черновика нет, подставляем
  // отправленные ответы, чтобы правки не приходилось писать с нуля
  useEffect(() => {
    let alive = true
    api.programHomework()
      .then(list => {
        if (!alive) return
        const mine = (list || []).find(h => h.direction === direction && h.chapter === chapter) || null
        setServer(mine)
        if (mine) {
          setDraft(d => {
            if (Object.keys(d.answers).length) return d.variant ? d : { ...d, variant: mine.variant }
            const answers = {}
            for (const a of mine.answers) answers[a.id] = a.answer
            return { variant: mine.variant, answers, index: 0 }
          })
        }
      })
      .catch(e => { if (alive) { setServer(null); setLoadError(e.message || 'Не удалось загрузить отправленные ответы') } })
    return () => { alive = false }
  }, [direction, chapter])

  // Режим по умолчанию — после загрузки: отправленная работа открывается
  // итогом, новая — выбором варианта или первым вопросом
  useEffect(() => {
    if (server === undefined || mode) return
    if (server && server.status !== 'rework') setMode('done')
    else if (quiz.variants && !draft.variant) setMode('variant')
    else setMode('answer')
  }, [server, mode, quiz.variants, draft.variant])

  // Черновик пишем в браузер с небольшой задержкой — не на каждую букву
  useEffect(() => {
    const t = setTimeout(() => { writeDraft(storageKey, draft); setSavedTick(true) }, 400)
    setSavedTick(false)
    return () => clearTimeout(t)
  }, [draft, storageKey])

  const questions = useMemo(
    () => (draft.variant === 'base' ? quiz.questions.filter(q => !q.python) : quiz.questions),
    [quiz.questions, draft.variant]
  )
  const index = Math.min(draft.index, questions.length - 1)
  const question = questions[index]
  const filled = (q) => Boolean((draft.answers[q.id] || '').trim())
  const answered = questions.filter(filled).length
  const missing = questions.length - answered
  const variant = quiz.variants?.find(v => v.id === draft.variant)

  const scrollTop = () => requestAnimationFrame(() => {
    const top = topRef.current?.getBoundingClientRect().top
    if (top !== undefined && top < 0) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
  const goTo = (i) => {
    setDraft(d => ({ ...d, index: Math.max(0, Math.min(i, questions.length - 1)) }))
    setMode('answer')
    setConfirming(false)
    scrollTop()
    requestAnimationFrame(() => areaRef.current?.focus({ preventScroll: true }))
  }
  const setAnswer = (text) => setDraft(d => ({ ...d, answers: { ...d.answers, [question.id]: text } }))
  const pickVariant = (id) => {
    setDraft(d => ({ ...d, variant: id, index: 0 }))
    setMode('answer')
    scrollTop()
  }
  const next = () => {
    if (index < questions.length - 1) goTo(index + 1)
    else { setMode('review'); scrollTop() }
  }

  // Поле растёт вместе с текстом, чтобы длинный ответ был виден целиком
  useEffect(() => {
    const el = areaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.max(el.scrollHeight, 220)}px`
  }, [question?.id, draft.answers, mode])

  const submit = async () => {
    setSending(true)
    setSendError('')
    try {
      const saved = await api.submitProgramHomework(direction, chapter, {
        variant: draft.variant || undefined,
        answers: questions.map(q => ({ id: q.id, question: q.text, answer: draft.answers[q.id].trim() })),
      })
      setServer(saved)
      setMode('done')
      setConfirming(false)
      scrollTop()
    } catch (e) {
      setSendError(e.message || 'Не получилось отправить — попробуй ещё раз')
    } finally {
      setSending(false)
    }
  }

  // Кнопка отправки стоит и в шапке проверки, и внизу списка: подтверждение
  // раскрывается там, где нажали
  const sendControls = (place) => (confirming !== place ? (
    <button type="button" className="pq-btn" disabled={missing > 0 || Boolean(confirming)} onClick={() => setConfirming(place)}>Отправить на проверку</button>
  ) : (
    <span className="pq-confirm">
      <span>Отправить {questions.length} {plural(questions.length, 'ответ', 'ответа', 'ответов')} на проверку?</span>
      <button type="button" className="pq-btn is-ghost" onClick={() => setConfirming(false)} disabled={sending}>Отмена</button>
      <button type="button" className="pq-btn" onClick={submit} disabled={sending}>{sending ? 'Отправляем…' : 'Да, отправить'}</button>
    </span>
  ))

  if (server === undefined || !mode) {
    return <div className="prg-section"><p className="prg-loading">Загружаем задание…</p></div>
  }

  const status = server ? STATUS[server.status] : null

  return (
    <div className="pq" ref={topRef}>
      {loadError && <div className="pq-alert" role="alert">{loadError}</div>}

      {server && (
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

      {/* ── Выбор варианта ── */}
      {mode === 'variant' && (
        <section className="prg-section">
          <div className="prg-section-head">
            <span className="prg-section-num">Шаг 1</span>
            <h2 className="prg-section-title">Выбери вариант вопросов</h2>
          </div>
          <p className="prg-p">Вариант можно поменять, пока задание не отправлено: уже написанные ответы сохранятся.</p>
          <div className="pq-variants">
            {quiz.variants.map(v => {
              const count = v.id === 'base' ? quiz.questions.filter(q => !q.python).length : quiz.questions.length
              return (
                <button key={v.id} type="button" className={`pq-variant${draft.variant === v.id ? ' is-active' : ''}`} onClick={() => pickVariant(v.id)}>
                  <span className="pq-variant-title">{v.title}</span>
                  <span className="pq-variant-count">{count} {plural(count, 'вопрос', 'вопроса', 'вопросов')}</span>
                  <span className="pq-variant-text">{v.text}</span>
                  <span className="pq-variant-go">Выбрать →</span>
                </button>
              )
            })}
          </div>
        </section>
      )}

      {/* ── Вопросы по одному ── */}
      {mode === 'answer' && question && (
        <section className="prg-section pq-card">
          <div className="pq-top">
            <span className="pq-counter">Вопрос {index + 1} из {questions.length}</span>
            {variant && (
              <button type="button" className="pq-variant-chip" onClick={() => setMode('variant')} title="Сменить вариант">
                {variant.title} · сменить
              </button>
            )}
          </div>
          <div className="pq-progress" aria-hidden="true"><span style={{ width: `${(answered / questions.length) * 100}%` }} /></div>
          <div className="pq-dots" role="list" aria-label="Вопросы">
            {questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                role="listitem"
                className={`pq-dot${i === index ? ' is-current' : ''}${filled(q) ? ' is-filled' : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Вопрос ${i + 1}${filled(q) ? ', есть ответ' : ''}`}
              >{i + 1}</button>
            ))}
          </div>

          <div className="pq-topic">{question.topic}</div>
          <h2 className="pq-question"><Rich text={question.text} /></h2>

          <textarea
            ref={areaRef}
            className="pq-answer"
            value={draft.answers[question.id] || ''}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={e => { if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') { e.preventDefault(); next() } }}
            placeholder="Распиши ответ своими словами: суть, пример и, где уместно, сравнение подходов"
            aria-label={`Ответ на вопрос ${index + 1}`}
            disabled={server?.status === 'approved'}
          />
          <div className="pq-meta">
            <span>{(draft.answers[question.id] || '').trim().length} символов</span>
            <span>{savedTick ? 'Черновик сохранён на этом устройстве' : 'Сохраняем…'}</span>
          </div>

          <div className="pq-nav">
            <button type="button" className="pq-btn is-ghost" onClick={() => goTo(index - 1)} disabled={index === 0}>← Назад</button>
            <span className="pq-answered">отвечено {answered} из {questions.length}</span>
            <button type="button" className="pq-btn" onClick={next}>
              {index < questions.length - 1 ? 'Дальше →' : 'Проверить и отправить →'}
            </button>
          </div>
        </section>
      )}

      {/* ── Проверка перед отправкой ── */}
      {mode === 'review' && (
        <section className="prg-section">
          <div className="pq-review-head">
            <h2 className="prg-section-title">Проверь ответы перед отправкой</h2>
            {sendControls('top')}
          </div>
          <p className="prg-p">
            {missing
              ? `Осталось ответить на ${missing} ${plural(missing, 'вопрос', 'вопроса', 'вопросов')} — они отмечены ниже. Нажми на вопрос, чтобы вернуться к нему.`
              : 'На все вопросы есть ответы. Нажми на вопрос, если хочешь что-то поправить.'}
          </p>
          <ol className="pq-review">
            {questions.map((q, i) => (
              <li key={q.id}>
                <button type="button" className={`pq-review-item${filled(q) ? '' : ' is-empty'}`} onClick={() => goTo(i)}>
                  <span className="pq-review-num">{i + 1}</span>
                  <span className="pq-review-body">
                    <span className="pq-review-q">{q.text}</span>
                    <span className="pq-review-a">{filled(q) ? draft.answers[q.id].trim() : 'Нет ответа'}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          {sendError && <div className="pq-alert" role="alert">{sendError}</div>}
          <div className="pq-nav">
            <button type="button" className="pq-btn is-ghost" onClick={() => goTo(questions.length - 1)}>← К вопросам</button>
            {sendControls('bottom')}
          </div>
        </section>
      )}

      {/* ── Отправленная работа ── */}
      {mode === 'done' && server && (
        <section className="prg-section">
          <div className="prg-section-head">
            <span className="prg-section-num">Ответы</span>
            <h2 className="prg-section-title">Отправленные ответы</h2>
          </div>
          {server.variant && quiz.variants && (
            <p className="prg-p">Вариант: <b>{quiz.variants.find(v => v.id === server.variant)?.title}</b></p>
          )}
          <ol className="pq-sent">
            {server.answers.map((a, i) => (
              <li key={a.id}>
                <div className="pq-sent-q"><span>{i + 1}</span>{a.question}</div>
                <div className="pq-sent-a">{a.answer}</div>
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
