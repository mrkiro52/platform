import { useState } from 'react'
import PythonRunner from '../PythonRunner'
import { Inline } from './LessonBlocks'
import { checkSolution } from '../../lib/python/checker'
import { usePythonState } from '../../lib/python/runner'
import { loadDraft, saveDraft } from '../../data/courses'

// Задача урока: условие, примеры, редактор с запуском и автопроверка.
// Черновик решения сохраняется в браузере, решённая задача отмечается в прогрессе.

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

export default function TaskCard({ task, index, user, solved, onSolved }) {
  const [code, setCode] = useState(() => loadDraft(user, task.id) ?? task.starter ?? '')
  const [report, setReport] = useState(null)
  const [progress, setProgress] = useState(null)
  const { running } = usePythonState()

  const change = value => {
    setCode(value)
    saveDraft(user, task.id, value)
  }

  const check = async () => {
    if (running) return
    setReport(null)
    setProgress(0)
    const result = await checkSolution(code, task.tests, { onProgress: setProgress })
    setProgress(null)
    setReport(result)
    if (!result.fatal && result.passed === result.total) onSolved(task.id)
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
        {solved && <span className="tk-solved">✓ Решено</span>}
      </header>

      <div className="tk-text"><Inline text={task.text} /></div>

      {task.examples?.length > 0 && (
        <div className="tk-examples">
          <span className="tk-examples-title">{task.examples.length > 1 ? 'Примеры' : 'Пример'}</span>
          {task.examples.map((ex, i) => <Example key={i} ex={ex} />)}
        </div>
      )}

      <PythonRunner value={code} onChange={change} minLines={Math.max(6, code.split('\n').length + 1)} />

      <div className="tk-actions">
        <button type="button" className="btn-primary tk-check" onClick={check} disabled={running}>
          {checking ? `Проверяем… тест ${progress + 1} из ${task.tests.length}` : 'Проверить решение'}
        </button>
        <button type="button" className="tk-reset" onClick={reset} disabled={running}>Сбросить к шаблону</button>
      </div>

      {report && (
        <div className={`tk-report${allOk ? ' is-ok' : ' is-fail'}`} role="status">
          {report.fatal ? (
            <div className="tk-report-head">{report.fatal}</div>
          ) : (
            <>
              <div className="tk-report-head">
                {allOk ? '🎉 Все тесты пройдены — задача решена!' : `Пройдено тестов: ${report.passed} из ${report.total}`}
              </div>
              <ul className="tk-results">
                {report.results.map((r, i) => (
                  <li key={i} className={r.ok ? 'is-ok' : 'is-fail'}>
                    <span className="tk-mark" aria-hidden="true">{r.ok ? '✓' : '✗'}</span>
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
    </article>
  )
}
