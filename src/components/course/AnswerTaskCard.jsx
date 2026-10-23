import { useState } from 'react'
import LessonBlocks, { Inline } from './LessonBlocks'
import { checkAnswer, kindOf, placeholderOf } from '../../lib/answers'
import { loadDraft, saveDraft } from '../../data/courses'
import { BulbIcon, CheckIcon, CrossIcon, EyeIcon } from '../icons'

// Задача с вводом ответа (курс по математике): условие, поле для ответа, проверка
// прямо на странице. После верного ответа открывается разбор решения; после двух
// неверных попыток его можно открыть самому. Последний ввод сохраняется в браузере.

const SHOW_SOLUTION_AFTER = 2

export default function AnswerTaskCard({ task, index, user, solved, onSolved }) {
  const kind = kindOf(task)
  const [value, setValue] = useState(() => loadDraft(user, task.id) ?? '')
  const [result, setResult] = useState(null)
  const [fails, setFails] = useState(0)
  const [showSolution, setShowSolution] = useState(false)

  const change = v => {
    setValue(v)
    setResult(null)
    saveDraft(user, task.id, String(v))
  }

  const check = e => {
    e?.preventDefault()
    const r = checkAnswer(task, value)
    setResult(r)
    if (r.ok) onSolved(task.id)
    else setFails(f => f + 1)
  }

  const solutionOpen = showSolution || result?.ok || solved

  return (
    <article className={`tk-card ak-card${solved ? ' is-solved' : ''}`} id={task.id}>
      <header className="tk-head">
        <span className="tk-num">Задача {index + 1}</span>
        <h3 className="tk-title">{task.title}</h3>
        {solved && <span className="tk-solved"><CheckIcon size={13} />Решено</span>}
      </header>

      <div className="tk-text"><Inline text={task.text} /></div>
      {task.blocks && <div className="ak-blocks"><LessonBlocks blocks={task.blocks} /></div>}

      <form className="ak-form" onSubmit={check}>
        {kind === 'choice' ? (
          <div className="ak-options" role="radiogroup" aria-label="Варианты ответа">
            {task.options.map((opt, i) => (
              <label key={i} className={`ak-option${String(value) === String(i) ? ' is-on' : ''}`}>
                <input type="radio" name={task.id} value={i} checked={String(value) === String(i)} onChange={() => change(String(i))} />
                <span className="ak-option-mark" aria-hidden="true">{String.fromCharCode(1040 + i)}</span>
                <span><Inline text={opt} /></span>
              </label>
            ))}
          </div>
        ) : kind === 'matrix' ? (
          <textarea className="ak-input is-matrix" rows={task.answer.length + 1} value={value} placeholder={placeholderOf(task)}
            onChange={e => change(e.target.value)} spellCheck={false} aria-label="Ответ" />
        ) : (
          <div className="ak-line">
            {task.prefix && <span className="ak-affix"><Inline text={task.prefix} /></span>}
            <input className="ak-input" value={value} placeholder={placeholderOf(task)} onChange={e => change(e.target.value)}
              inputMode={kind === 'number' ? 'decimal' : undefined} autoComplete="off" spellCheck={false} aria-label="Ответ" />
            {task.unit && <span className="ak-affix">{task.unit}</span>}
          </div>
        )}
        <div className="tk-actions">
          <button type="submit" className="btn-primary tk-check">Проверить ответ</button>
          {!solutionOpen && fails >= SHOW_SOLUTION_AFTER && task.solution && (
            <button type="button" className="tk-reset ak-show" onClick={() => setShowSolution(true)}><EyeIcon size={15} />Показать решение</button>
          )}
        </div>
      </form>

      {result && (
        <div className={`tk-report ak-report${result.ok ? ' is-ok' : ' is-fail'}`} role="status">
          <div className="tk-report-head">
            {result.ok ? <CheckIcon size={17} /> : <CrossIcon size={17} />}
            {result.ok ? 'Верно — задача решена!' : result.message}
          </div>
          {!result.ok && task.hint && fails >= 1 && (
            <div className="ak-hint"><BulbIcon size={15} /><span><Inline text={task.hint} /></span></div>
          )}
        </div>
      )}

      {solutionOpen && task.solution && (
        <div className="ak-solution">
          <span className="ak-solution-label">Решение</span>
          {Array.isArray(task.solution) ? <LessonBlocks blocks={task.solution} /> : <p className="ls-p"><Inline text={task.solution} /></p>}
        </div>
      )}
    </article>
  )
}
