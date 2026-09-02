import { useState, useEffect } from 'react'
import { LEVEL_TEST_SECTIONS, LEVEL_TEST_TITLE, LEVEL_TEST_INTRO, LEVEL_TEST_TOTAL } from '../data/levelTest'

const STORAGE_KEY = 'kiro_level_test_answers'

function loadAnswers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function buildHtml(answers, participant) {
  const date = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  const answered = Object.values(answers).filter(a => a && a.trim()).length

  const sections = LEVEL_TEST_SECTIONS.map(section => {
    const questions = section.questions.map((q, i) => {
      const answer = (answers[q.id] || '').trim()
      return `
      <div class="q">
        <div class="q-text">${i + 1}. ${escapeHtml(q.text)}</div>
        ${q.code ? `<pre class="q-code">${escapeHtml(q.code)}</pre>` : ''}
        ${answer
          ? `<div class="a">${escapeHtml(answer)}</div>`
          : '<div class="a empty">— без ответа</div>'}
      </div>`
    }).join('')
    return `<section><h2>${escapeHtml(section.title)}</h2>${questions}</section>`
  }).join('')

  return `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8">
<title>${escapeHtml(LEVEL_TEST_TITLE)} — ${escapeHtml(participant)}</title>
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 820px;
         margin: 0 auto; padding: 40px 24px; color: #1b1b1f; line-height: 1.6; }
  header { border-bottom: 2px solid #1b1b1f; padding-bottom: 16px; margin-bottom: 28px; }
  h1 { font-size: 24px; margin: 0 0 8px; }
  .meta { font-size: 14px; color: #5c5c66; }
  h2 { font-size: 18px; margin: 32px 0 12px; padding-bottom: 6px; border-bottom: 1px solid #d8d8de; }
  .q { margin-bottom: 22px; }
  .q-text { font-weight: 600; margin-bottom: 6px; }
  .q-code { background: #f4f4f6; border: 1px solid #e0e0e6; border-radius: 6px; padding: 10px 12px;
            font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 13px; overflow-x: auto; margin: 8px 0; }
  .a { white-space: pre-wrap; background: #f9f9fb; border-left: 3px solid #7a7a86; padding: 10px 14px; border-radius: 0 6px 6px 0; }
  .a.empty { color: #9a9aa4; font-style: italic; border-left-color: #d8d8de; }
  @media print { body { padding: 0; } }
</style>
</head>
<body>
  <header>
    <h1>${escapeHtml(LEVEL_TEST_TITLE)}</h1>
    <div class="meta">
      Участник: <strong>${escapeHtml(participant)}</strong><br>
      Дата: ${escapeHtml(date)}<br>
      Отвечено: ${answered} из ${LEVEL_TEST_TOTAL}
    </div>
  </header>
  ${sections}
</body>
</html>`
}

export default function LevelTest({ participant }) {
  const [answers, setAnswers] = useState(loadAnswers)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers))
    } catch { /* приватный режим или переполнено — ответы просто не сохранятся */ }
  }, [answers])

  const answeredCount = Object.values(answers).filter(a => a && a.trim()).length

  const handleChange = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }))

  const handleFinish = () => {
    const html = buildHtml(answers, participant || 'Участник')
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `kiro-level-test-${participant || 'uchastnik'}.html`
    a.click()
    URL.revokeObjectURL(url)
    setFinished(true)
  }

  let questionNumber = 0

  return (
    <div>
      <div className="widget" style={{ marginBottom: 20 }}>
        <div className="widget-header">
          <span className="widget-title">{LEVEL_TEST_TITLE}</span>
          <span style={{ fontFamily: 'var(--font-syne)', fontSize: 12, fontWeight: 700, color: '#FFB870' }}>
            {answeredCount} / {LEVEL_TEST_TOTAL}
          </span>
        </div>
        <p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          {LEVEL_TEST_INTRO}
        </p>
      </div>

      {LEVEL_TEST_SECTIONS.map(section => (
        <div key={section.id} className="widget" style={{ marginBottom: 16 }}>
          <div className="widget-header">
            <span className="widget-title">{section.title}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {section.questions.map(q => {
              questionNumber += 1
              return (
                <div key={q.id}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: 8 }}>
                    {questionNumber}. {q.text}
                  </div>
                  {q.code && (
                    <pre style={{
                      margin: '0 0 8px', padding: '10px 12px', background: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)', borderRadius: 8,
                      fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)',
                      overflowX: 'auto', whiteSpace: 'pre',
                    }}>
                      <code>{q.code}</code>
                    </pre>
                  )}
                  <textarea
                    value={answers[q.id] || ''}
                    onChange={e => handleChange(q.id, e.target.value)}
                    placeholder="Твой ответ"
                    rows={3}
                    style={{
                      width: '100%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                      borderRadius: 10, padding: '10px 12px', fontSize: 13, color: 'var(--text-primary)',
                      fontFamily: 'var(--font-inter)', lineHeight: 1.6, outline: 'none', resize: 'vertical',
                    }}
                  />
                </div>
              )
            })}
          </div>
        </div>
      ))}

      <div className="widget" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <button
          onClick={handleFinish}
          style={{
            background: 'var(--accent-lime)', color: 'var(--on-accent)', border: 'none', borderRadius: 12,
            padding: '11px 26px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
          }}
        >
          Завершить и скачать
        </button>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          {finished
            ? 'Файл скачан — отправь его Ханилю в Telegram.'
            : `Отвечено ${answeredCount} из ${LEVEL_TEST_TOTAL}. Скачается HTML-файл с вопросами и твоими ответами.`}
        </span>
      </div>
    </div>
  )
}
