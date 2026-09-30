// Разметка внутри текста задания: **жирный** и `код`. Условия задач пишутся
// с ней, и без обработки студент видит обратные кавычки вместо кода.
export default function InlineMarkup({ text }) {
  return String(text).split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={i} className="md-strong">{part.slice(2, -2)}</strong>
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={i} className="md-code">{part.slice(1, -1)}</code>
    }
    return part
  })
}
