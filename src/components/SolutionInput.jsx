import { useRef, useLayoutEffect } from 'react'
import PythonRunner from './PythonRunner'

const KINDS = [
  { id: 'text', label: 'Текст' },
  { id: 'code', label: 'Код · Python' },
]

// Текстовое поле, которое растёт под содержимое — без внутренней прокрутки
function AutoTextarea({ value, onChange, placeholder, readOnly }) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight + 2}px`
  }, [value])
  return (
    <textarea
      ref={ref}
      className="solution-text"
      value={value}
      onChange={e => onChange?.(e.target.value)}
      placeholder={placeholder}
      readOnly={readOnly}
      rows={5}
    />
  )
}

// Поле решения с переключателем «Текст / Код». В режиме кода — редактор
// Python с запуском. Содержимое при переключении не теряется: это одна и та
// же строка, меняется только то, как её показывать и можно ли её запустить.
export default function SolutionInput({
  value, onChange, kind = 'text', onKindChange, readOnly = false,
  placeholder = 'Вставь своё решение сюда',
}) {
  return (
    <div className="solution-input">
      {!readOnly && (
        <div className="solution-kinds" role="tablist" aria-label="Вид решения">
          {KINDS.map(k => (
            <button
              key={k.id}
              type="button"
              role="tab"
              aria-selected={kind === k.id}
              className={`solution-kind${kind === k.id ? ' is-active' : ''}`}
              onClick={() => onKindChange?.(k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>
      )}

      {kind === 'code' ? (
        <PythonRunner
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          minLines={readOnly ? 1 : 8}
          placeholder={'# Напиши решение на Python\n# и нажми «Запустить», чтобы проверить вывод'}
        />
      ) : readOnly ? (
        <pre className="solution-text is-readonly">{value}</pre>
      ) : (
        <AutoTextarea value={value} onChange={onChange} placeholder={placeholder} />
      )}
    </div>
  )
}
