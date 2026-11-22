import { useId, useState } from 'react'
import InlineMarkup from '../../components/InlineMarkup'

export default function TaskHint({ text }) {
  const [open, setOpen] = useState(false)
  const id = useId()

  return (
    <>
      <button type="button" className="sqlt-hint-toggle" aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        {open ? 'Скрыть подсказку' : 'Подсказка'}
      </button>
      <p id={id} className="sqlt-hint" hidden={!open}>
        {open && <InlineMarkup text={text} />}
      </p>
    </>
  )
}
