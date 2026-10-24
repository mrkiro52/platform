import { useEffect, useState } from 'react'
import PythonRunner from '../PythonRunner'
import LessonBlocks, { Inline } from './LessonBlocks'
import { checkSolution } from '../../lib/python/checker'
import { usePythonState } from '../../lib/python/runner'
import { loadDraft, saveDraft } from '../../data/courses'
import { CheckIcon, ClockIcon, CrossIcon, EyeIcon, LinkIcon } from '../icons'

// Задача урока: условие, примеры, редактор с запуском и автопроверка.
// Черновик решения сохраняется в браузере. Принятое решение сохраняется в аккаунте
// (savedAnswer): после решения редактор показывает его и закрыт для правок.
// Необязательные поля задачи (курс по алгоритмам):
//   source: { name: 'LeetCode 344', url } — ссылка на оригинал задачи
//   prelude — служебный код до решения студента (ListNode, TreeNode и т. п.)
//   timer — минут на задачу в мини-контесте: таймер с обратным отсчётом
//   solution — разбор: { text, code, complexity, mistakes } или массив блоков теории.
//     Открывается после решения, а после двух неудачных проверок — по кнопке

const SHOW_SOLUTION_AFTER = 2

// Таймер мини-контеста. Время старта хранится в браузере — переживает перезагрузку страницы
function ContestTimer({ id, minutes }) {
  const key = `kiro-course-timer:${id}`
  const [started, setStarted] = useState(() => { try { return Number(localStorage.getItem(key)) || null } catch { return null } })
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    if (!started) return
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [started])
  const start = () => { const t = Date.now(); setStarted(t); setNow(t); try { localStorage.setItem(key, String(t)) } catch { /* без сохранения */ } }
  const reset = () => { setStarted(null); try { localStorage.removeItem(key) } catch { /* без сохранения */ } }
  const left = started ? Math.max(0, minutes * 60 - Math.floor((now - started) / 1000)) : minutes * 60
  const mm = String(Math.floor(left / 60)).padStart(2, '0'), ss = String(left % 60).padStart(2, '0')
  return (
    <div className={`tk-timer${started ? ' is-on' : ''}${started && left === 0 ? ' is-over' : ''}`}>
      <ClockIcon size={16} />
      <span className="tk-timer-time">{mm}:{ss}</span>
      <span className="tk-timer-note">{!started ? `${minutes} минут на задачу` : left === 0 ? 'Время вышло — допиши решение и разбери, что заняло больше всего времени' : 'идёт время'}</span>
      {started
        ? <button type="button" className="tk-reset" onClick={reset}>Сбросить</button>
        : <button type="button" className="tk-timer-start" onClick={start}>Запустить таймер</button>}
    </div>
  )
}

function Solution({ solution }) {
  if (Array.isArray(solution)) return <LessonBlocks blocks={solution} />
  return (
    <>
      {solution.text && <p className="ls-p"><Inline text={solution.text} /></p>}
      {solution.code && <LessonBlocks blocks={[{ t: 'py', v: solution.code.replace(/^\n/, '').replace(/\n\s*$/, '') }]} />}
      {solution.complexity && <p className="ls-p"><strong>Сложность:</strong> <Inline text={solution.complexity} /></p>}
      {solution.mistakes?.length > 0 && (
        <>
          <h4 className="ls-h">Типичные ошибки</h4>
          <ul className="ls-list">{solution.mistakes.map((m, i) => <li key={i}><Inline text={m} /></li>)}</ul>
        </>
      )}
    </>
  )
}

function Example({ ex }) {
  if ('call' in ex) {
    return (
      <div className="tk-example is-call">
        <code>{ex.call}</code>
        <span aria-hidden="true">→</span>
        <code>{ex.expected}</code>
      </div>
    )
  }
  return (
    <div className="tk-example">
      <div>
        <span className="tk-example-label">Ввод</span>
        <pre>{ex.input || '(нет ввода)'}</pre>
      </div>
      <div>
        <span className="tk-example-label">Вывод</span>
        <pre>{ex.output}</pre>
      </div>
    </div>
  )
}

export default function TaskCard({ task, index, user, solved, savedAnswer, onSolved }) {
  const [code, setCode] = useState(() => loadDraft(user, task.id) ?? task.starter ?? '')
  const [report, setReport] = useState(null)
  const [progress, setProgress] = useState(null)
  const [fails, setFails] = useState(0)
  const [showSolution, setShowSolution] = useState(false)
  const { running } = usePythonState()

  // После решения — принятый код; у старых записей без решения — последний черновик
  const shown = solved ? (savedAnswer ?? code) : code

  const change = value => {
    if (solved) return
    setCode(value)
    saveDraft(user, task.id, value)
  }

  const check = async () => {
    if (running || solved) return
    setReport(null)
    setProgress(0)
    const result = await checkSolution(code, task.tests, { onProgress: setProgress, prelude: task.prelude })
    setProgress(null)
    setReport(result)
    if (!result.fatal && result.passed === result.total) onSolved(task.id, code)
    else if (!result.fatal) setFails(f => f + 1)
  }

  const reset = () => {
    change(task.starter || '')
    setReport(null)
  }

  const allOk = report && !report.fatal && report.passed === report.total
  const checking = progress !== null

  return (
    <article className={`tk-card${solved ? ' is-solved' : ''}`} id={task.id}>
      <header className="tk-head">
        <span className="tk-num">Задача {index + 1}</span>
        <h3 className="tk-title">{task.title}</h3>
        {task.source && (
          <a className="tk-source" href={task.source.url} target="_blank" rel="noopener noreferrer"><LinkIcon size={13} />{task.source.name}</a>
        )}
        {solved && <span className="tk-solved"><CheckIcon size={13} />Решено</span>}
      </header>

      {task.timer && <ContestTimer id={task.id} minutes={task.timer} />}

      <div className="tk-text"><Inline text={task.text} /></div>

      {task.examples?.length > 0 && (
        <div className="tk-examples">
          <span className="tk-examples-title">{task.examples.length > 1 ? 'Примеры' : 'Пример'}</span>
          {task.examples.map((ex, i) => <Example key={i} ex={ex} />)}
        </div>
      )}

      <PythonRunner value={shown} onChange={change} readOnly={solved} minLines={Math.max(6, shown.split('\n').length + 1)} />

      <div className="tk-actions">
        {solved ? (
          <span className="tk-locked"><CheckIcon size={15} />Решение принято и сохранено — его можно запустить, но не изменить</span>
        ) : (
          <>
            <button type="button" className="btn-primary tk-check" onClick={check} disabled={running}>
              {checking ? `Проверяем… тест ${progress + 1} из ${task.tests.length}` : 'Проверить решение'}
            </button>
            <button type="button" className="tk-reset" onClick={reset} disabled={running}>Сбросить к шаблону</button>
          </>
        )}
        {task.solution && !solved && !showSolution && fails >= SHOW_SOLUTION_AFTER && (
          <button type="button" className="tk-reset ak-show" onClick={() => setShowSolution(true)}><EyeIcon size={15} />Показать разбор</button>
        )}
      </div>

      {report && (
        <div className={`tk-report${allOk ? ' is-ok' : ' is-fail'}`} role="status">
          {report.fatal ? (
            <div className="tk-report-head">{report.fatal}</div>
          ) : (
            <>
              <div className="tk-report-head">
                {allOk && <CheckIcon size={17} />}
                {allOk ? 'Все тесты пройдены — задача решена!' : `Пройдено тестов: ${report.passed} из ${report.total}`}
              </div>
              <ul className="tk-results">
                {report.results.map((r, i) => (
                  <li key={i} className={r.ok ? 'is-ok' : 'is-fail'}>
                    <span className="tk-mark" aria-hidden="true">{r.ok ? <CheckIcon size={15} /> : <CrossIcon size={15} />}</span>
                    <div className="tk-result-body">
                      <span className="tk-result-label">{r.label}</span>
                      {!r.ok && (
                        <div className="tk-result-detail">
                          {r.input != null && r.input !== '' && <div><b>Ввод:</b><pre>{r.input}</pre></div>}
                          {r.expected != null && <div><b>Ожидалось:</b><pre>{r.expected || '(пусто)'}</pre></div>}
                          {r.got != null && <div><b>Получено:</b><pre>{r.got || '(пусто)'}</pre></div>}
                          {r.detail && r.expected == null && <pre>{r.detail}</pre>}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}

      {task.solution && (solved || showSolution) && (
        <div className="ak-solution tk-solution">
          <span className="ak-solution-label">Разбор</span>
          <Solution solution={task.solution} />
        </div>
      )}
    </article>
  )
}
