import { useRef, useLayoutEffect, useCallback } from 'react'

const INDENT = '    '

// Вставка через execCommand сохраняет историю Ctrl+Z — setRangeText её
// сбрасывает. execCommand помечен устаревшим, но в textarea работает везде;
// на случай, если нет, — запасной путь.
function insertText(el, text) {
  el.focus()
  if (!document.execCommand('insertText', false, text)) {
    el.setRangeText(text, el.selectionStart, el.selectionEnd, 'end')
    el.dispatchEvent(new Event('input', { bubbles: true }))
  }
}

// Редактор кода на обычной textarea: номера строк, отступы по Tab, автоотступ
// после двоеточия, Ctrl/Cmd+Enter — запуск. Без внешних библиотек: для задач
// курса этого хватает, а страница не тянет лишние сотни килобайт.
export default function CodeEditor({
  value, onChange, onRun, readOnly = false, placeholder = '', minLines = 8, ariaLabel = 'Код',
  onFocus,
}) {
  const ref = useRef(null)
  // Esc, затем Tab — выход из редактора с клавиатуры. Иначе Tab навсегда
  // остаётся внутри поля и дальше по странице не пройти.
  const escapeTab = useRef(false)

  const lines = Math.max(value.split('\n').length, minLines)

  // Поле растёт под текст и по высоте, и по ширине: прокручивается рамка
  // целиком, поэтому номера строк не разъезжаются с кодом
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
    el.style.width = '100%'
    if (el.scrollWidth > el.clientWidth) el.style.width = `${el.scrollWidth + 16}px`
  }, [value, minLines])

  const onKeyDown = useCallback((e) => {
    const el = e.currentTarget
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      onRun?.()
      return
    }
    if (readOnly) return

    if (e.key === 'Escape') { escapeTab.current = true; return }
    if (e.key === 'Tab' && escapeTab.current) { escapeTab.current = false; return }
    escapeTab.current = false

    const { selectionStart: start, selectionEnd: end } = el
    const text = el.value

    if (e.key === 'Tab') {
      e.preventDefault()
      const lineStart = text.lastIndexOf('\n', start - 1) + 1
      const multiline = text.slice(start, end).includes('\n')

      if (!multiline && !e.shiftKey) {
        insertText(el, INDENT)
        return
      }
      // Несколько строк или Shift+Tab — сдвигаем строки целиком
      const block = text.slice(lineStart, end)
      const shifted = e.shiftKey
        ? block.split('\n').map(l => l.replace(/^( {1,4}|\t)/, '')).join('\n')
        : block.split('\n').map(l => INDENT + l).join('\n')
      el.setSelectionRange(lineStart, end)
      insertText(el, shifted)
      el.setSelectionRange(lineStart, lineStart + shifted.length)
      return
    }

    if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
      // Новая строка с тем же отступом, после двоеточия — на уровень глубже
      const lineStart = text.lastIndexOf('\n', start - 1) + 1
      const line = text.slice(lineStart, start)
      let indent = line.match(/^[ \t]*/)[0]
      if (/:\s*(#.*)?$/.test(line)) indent += INDENT
      e.preventDefault()
      insertText(el, `\n${indent}`)
      return
    }

    if (e.key === 'Backspace' && start === end) {
      // Backspace в отступе стирает сразу четыре пробела
      const lineStart = text.lastIndexOf('\n', start - 1) + 1
      const before = text.slice(lineStart, start)
      if (before.length && /^ +$/.test(before) && before.length % 4 === 0) {
        e.preventDefault()
        el.setSelectionRange(start - 4, start)
        insertText(el, '')
      }
    }
  }, [onRun, readOnly])

  return (
    <div className={`code-editor${readOnly ? ' is-readonly' : ''}`}>
      <div className="code-editor-scroll">
        <div className="code-editor-gutter" aria-hidden="true">
          {Array.from({ length: lines }, (_, i) => <span key={i}>{i + 1}</span>)}
        </div>
        <textarea
          ref={ref}
          className="code-editor-input"
          value={value}
          onChange={e => onChange?.(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          readOnly={readOnly}
          placeholder={placeholder}
          aria-label={ariaLabel}
          rows={minLines}
          wrap="off"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          autoComplete="off"
          data-gramm="false"
        />
      </div>
    </div>
  )
}
