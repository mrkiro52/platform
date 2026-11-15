// Приведение материалов разных форматов к одному виду урока зимнего лагеря.
// Урок: { title, intro, sections: [{ id, title, blocks, terms?, divider? }], selfCheck?, miniQuiz?, assignment? }
// Блоки — в формате ProgramBlocks (t: p / ul / ol / code / note / table …) плюс несколько
// блоков недельных материалов, которые рисует WinterBlocks: cards, viz, video, mp4, linkcard.

// Глава недельного формата (week1Materials и т. п.): блоки { t, v }, подзаголовок 'h' начинает раздел
export function lessonFromWeek(ch) {
  const sections = []
  let cur = null
  const open = (title) => { cur = { id: `s${sections.length + 1}`, title, blocks: [] }; sections.push(cur) }
  for (const b of ch.blocks) {
    if (b.t === 'h') { open(b.v); continue }
    if (!cur) open('Главное')
    if (b.t === 'p') cur.blocks.push({ t: 'p', text: b.v })
    else if (b.t === 'ul') cur.blocks.push({ t: 'ul', items: b.v })
    else if (b.t === 'ol') cur.blocks.push({ t: 'ol', items: b.v })
    else if (b.t === 'code') cur.blocks.push({ t: 'code', text: b.v })
    else if (b.t === 'note') cur.blocks.push({ t: 'note', text: b.v })
    else if (b.t === 'cards') cur.blocks.push({ t: 'cards', items: b.v })
    else if (b.t === 'viz') cur.blocks.push({ t: 'viz', block: b })
    // Видеозаписи осеннего потока (b.t === 'video' и 'mp4') в зимний лагерь не переносим
    else if (b.t === 'link') cur.blocks.push({ t: 'linkcard', href: b.href, title: b.title, text: b.text })
  }
  return {
    title: ch.title,
    intro: null,
    sections,
    selfCheck: ch.selfCheck || [],
    miniQuiz: ch.quiz || null,
  }
}

// Задачу на код удобнее писать в редакторе с запуском, рассуждение — в обычном поле.
// Студент может переключить вид ответа сам; это только вид по умолчанию.
// (\b в JavaScript не видит границы русских слов, поэтому границы заданы явно)
const CODE_HINT = /(^|[.!?]\s+)(напиши|реализуй|создай|допиши|перепиши|доработай|исправь|запрограммируй|сделай)(?![а-яё])|функци|программ|(?<![а-яё])класс(?![а-яё])|скрипт|(?<![а-яё])код(?![а-яё])/i
export function guessKind(text) {
  return CODE_HINT.test(String(text)) ? 'code' : 'text'
}

// Задания осенних недель, которые просили скриншот или работу на бумаге. В зимнем лагере ответ
// сдаётся только текстом или кодом — формулировки заменены. Ключ — «<id главы>:<номер задачи>».
const TEXT_FIX = {
  'it-world:0': 'Установи VS Code и Python по инструкции из этой главы. Создай файл `hello.py` с единственной строкой `print("Привет, лагерь!")` и запусти его в терминале. В ответ вставь текстом: команду, которой запускал файл, и всё, что вывел терминал. Если что-то не получилось — опиши ошибку и что ты пробовал.',
  'python-list:4': 'Объясни, почему стратегия увеличения массива в два раза лучше, чем увеличение на одну ячейку. Посчитай, сколько раз произойдёт переезд при добавлении 1000 элементов в обоих случаях, и запиши ход расчёта в ответе — текстом или кодом, который это считает.',
}

// Домашнее задание главы недельного формата → задание из задач, которое сдаётся на проверку
// code: true — все задачи главы на код (недели Python и алгоритмов), иначе вид угадывается по условию
export function quizFromWeekHomework(ch, { code = false } = {}) {
  const hw = ch.homework
  if (!hw) return null
  const list = hw.kind === 'simple' ? [{ text: hw.text, hint: null }] : hw.tasks
  return {
    intro: list.length > 1
      ? 'Реши задачи по теме главы. Код можно запускать прямо здесь, в редакторе: сначала добейся, чтобы он работал, потом отправляй. Проверяющий посмотрит каждое решение и примет работу или вернёт её с комментарием.'
      : 'Практическое задание по теме главы: выполни его и коротко опиши результат. Проверяющий примет работу или вернёт её с комментарием.',
    unit: ['задача', 'задачи', 'задач'],
    questions: list.map((t, i) => ({
      id: `t${i + 1}`,
      topic: list.length > 1 ? `Задача ${i + 1} · ${i < 3 ? 'базовый уровень' : 'средний уровень'}` : 'Практическое задание',
      text: TEXT_FIX[`${ch.id}:${i}`] || t.text,
      hint: t.hint || null,
      kind: hw.kind === 'simple' ? 'text' : code ? 'code' : guessKind(t.text),
    })),
  }
}

// Задание из вопросов главы индивидуальной программы (src/data/programs/*-quiz.js).
// Варианты вопросов зимнему лагерю не нужны — берём полный набор.
export function quizFromProgram(quiz) {
  return {
    intro: quiz.intro,
    unit: ['вопрос', 'вопроса', 'вопросов'],
    questions: quiz.questions.map(q => ({ id: q.id, topic: q.topic, text: q.text, hint: q.hint || null, kind: q.kind || 'text' })),
  }
}

// Онлайн-тест с вариантами ответа (src/data/week4/quizzes.js) — проверяется автоматически
export function autoFromQuiz(quiz) {
  return { title: quiz.title, questions: quiz.questions }
}
