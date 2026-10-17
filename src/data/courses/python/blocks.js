// Короткие конструкторы блоков теории для уроков курсов (рендер — LessonBlocks.jsx).
// В тексте работают **жирный** и `код`. Код примеров пишем через String.raw,
// чтобы \n внутри Python-строк оставался двумя символами, а не переводом строки.

export const p = v => ({ t: 'p', v })
export const h = v => ({ t: 'h', v })
export const list = (...v) => ({ t: 'list', v })
export const steps = (...v) => ({ t: 'steps', v })
// Пример кода, который можно запустить. out — что он напечатает
export const py = (v, out) => ({ t: 'py', v: v.replace(/^\n/, '').replace(/\n\s*$/, ''), out })
// Код не на Python (терминал, файлы) — показывается без кнопки запуска
export const shell = (v, label) => ({ t: 'shell', v: v.replace(/^\n/, '').replace(/\n\s*$/, ''), label })
export const note = v => ({ t: 'note', v })
export const tip = v => ({ t: 'tip', v })
export const warn = v => ({ t: 'warn', v })
export const table = (head, rows) => ({ t: 'table', head, rows })

// Шаблон кода задачи: отрезаем пустые строки по краям
export const starter = v => v.replace(/^\n/, '').replace(/\n\s*$/, '') + '\n'
