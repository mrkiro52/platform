import { api } from '../../api'
import { useEffect, useId, useRef, useState } from 'react'
import { hints } from './pythonHints'
import TaskCard from '../../components/course/TaskCard'
import InlineMarkup from '../../components/InlineMarkup'
import { ChevronRightIcon } from '../../components/icons'
import TaskHint from './TaskHint'
import first from '../../data/courses/python/week1'
import second from '../../data/courses/python/week2'
import third from '../../data/courses/python/week3'

const lessons = [...first, ...second, ...third]
const topics = [
  ['Старт и ввод', 'print(x) выводит значение, input() возвращает строку. Преобразуй её через int() для вычислений. В f-строке выражение ставят в фигурные скобки: f"{price:.2f}".', 'w1d1 w1d2'],
  ['Условия и while', 'if / elif / else выбирает одну ветку. while повторяет блок, пока условие истинно. Обновляй счётчик внутри цикла: n -= 1.', 'w1d3 w1d4'],
  ['Перебор и циклы', 'for i in range(n) перебирает числа от 0 до n−1. continue пропускает итерацию, break завершает ближайший цикл. Во вложенном цикле используй отдельный счётчик.', 'w1d5 w1d6 w1d7'],
  ['Строки и списки', 's[a:b] берёт элементы до b исключительно. split() разбивает строку, sep.join(parts) собирает её. list.append(x) меняет список на месте, кортеж неизменяем.', 'w2d1 w2d2'],
  ['Словари и функции', 'counts[x] = counts.get(x, 0) + 1 считает частоту. set убирает повторы. def объявляет функцию, return возвращает значение вызывающему коду.', 'w2d3 w2d4'],
  ['Обработка данных', '[f(x) for x in data if ok(x)] фильтрует и преобразует. zip объединяет последовательности попарно. Лови ожидаемое исключение через except ValueError.', 'w2d5 w2d6 w2d7'],
  ['Классы и объекты', 'В __init__(self, value) сохрани self.value. Метод получает экземпляр через self. super() обращается к родительской реализации, @property открывает метод как атрибут.', 'w3d1 w3d2'],
  ['Итераторы и ресурсы', 'yield выдаёт очередной элемент и сохраняет состояние генератора. with open(path) as f закрывает файл при выходе. json.load(f) читает JSON, json.dump(obj, f) записывает.', 'w3d3 w3d4'],
  ['Модули и асинхронность', 'import подключает модуль. async def создаёт корутину, await ждёт её результат. asyncio.gather(*jobs) запускает независимые корутины совместно. Аннотации описывают ожидаемые типы.', 'w3d5 w3d6 w3d7'],
].map(([title, sheet, ids], i) => ({
  title, sheet, level: i < 7 ? 'Junior' : 'Middle+',
  tasks: ids.split(' ').flatMap(id => lessons.find(l => l.id === id).tasks.map((t, i) => ({ ...t, id: 'trainer-' + t.id, hint: hints[id][i] }))),
}))

const examples = [
  `name = input()
print(f"Привет, {name}!")`,
  `n = 3
while n > 0:
    print(n)
    n -= 1`,
  `for n in range(1, 6):
    if n % 2 == 0:
        print(n)`,
  `words = "кот и пёс".split()
print(" ".join(words[::-1]))`,
  `def frequencies(words):
    counts = {}
    for word in words:
        counts[word] = counts.get(word, 0) + 1
    return counts`,
  `values = ["3", "7", "нет"]
numbers = [int(x) for x in values if x.isdigit()]
print(sum(numbers))`,
  `class Counter:
    def __init__(self):
        self.value = 0
    def step(self):
        self.value += 1`,
  `def lines(path):
    with open(path) as file:
        for line in file:
            yield line.strip()`,
  `import asyncio

async def main():
    await asyncio.sleep(0)
    print("готово")

asyncio.run(main())`,
]

const levels = ['Junior', 'Middle+']
const totalTasks = topics.reduce((count, topic) => count + topic.tasks.length, 0)
const levelTasks = levels.map(level => topics.filter(topic => topic.level === level).flatMap(topic => topic.tasks))

function Disclosure({ label, meta, children }) {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const id = useId()

  function close() {
    setOpen(false)
    trigger.current.focus()
  }

  return (
    <div className={`sqlt-tbl python-disclosure${open ? ' is-open' : ''}`} onKeyDown={event => {
      if (open && event.key === 'Escape') {
        event.stopPropagation()
        close()
      }
    }}>
      <button type="button" ref={trigger} className="sqlt-tbl-head" aria-expanded={open}
        aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="sqlt-score">{label}</span>
        <span className="sqlt-tbl-rows">{meta}</span>
        <ChevronRightIcon className="sqlt-chev" size={16} />
      </button>
      <div id={id} className="sqlt-tbl-body" hidden={!open}>{open && children(close)}</div>
    </div>
  )
}

function ProgressBar({ label, count, total }) {
  return (
    <span className="sqlt-head-progress-bar" role="progressbar" aria-label={label}
      aria-valuenow={count} aria-valuemax={total}>
      <i style={{ width: `${count / total * 100}%` }} />
    </span>
  )
}

export default function PythonTraining({ user, onBack }) {
  const [solutions, setSolutions] = useState(null)
  const [loadError, setLoadError] = useState('')
  const [saveError, setSaveError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const [topicIndex, setTopic] = useState(0)
  const [index, setIndex] = useState(0)
  const topic = topics[topicIndex]
  const task = topic.tasks[index]

  useEffect(() => {
    let active = true
    api.pythonTrainer().then(rows => { if (active) setSolutions(rows) })
      .catch(error => { if (active) setLoadError(error.message) })
    return () => { active = false }
  }, [user.id, attempt])

  async function save(id, code) {
    try {
      const saved = await api.savePythonTask(id, code)
      setSolutions(prev => ({ ...prev, [id]: saved.answer }))
      setSaveError(prev => prev?.id === id ? null : prev)
    } catch (error) {
      setSaveError({ id, message: error.message + '. Повтори проверку, чтобы сохранить результат.' })
    }
  }

  const header = (
    <header className="page-header python-header">
      <button type="button" className="sqlt-back" onClick={onBack}>← Тренировки</button>
      <h1 className="page-title">Python-тренажёр</h1>
      <p className="page-subtitle">Начни с Junior, чтобы освоить основы Python, затем переходи к темам Middle+. Решения сохраняются в аккаунте отдельно от лагеря.</p>
    </header>
  )

  if (!solutions) return (
    <section className="page active sqlt">
      {header}
      <p className={loadError ? 'sqlt-error' : 'page-subtitle'} role="status">{loadError || 'Загружаем прогресс…'}</p>
      {loadError && <button type="button" className="sqlt-exec" onClick={() => {
        setLoadError('')
        setAttempt(attempt + 1)
      }}>Повторить</button>}
    </section>
  )

  const isSolved = item => Object.hasOwn(solutions, item.id)
  const countSolved = tasks => tasks.filter(isSolved).length
  const solvedTopics = topics.map(item => countSolved(item.tasks))
  const totalSolved = solvedTopics.reduce((total, count) => total + count, 0)
  const completeTopics = topics.filter((item, i) => solvedTopics[i] === item.tasks.length).length
  const nextTopic = topics.findIndex((item, i) => solvedTopics[i] < item.tasks.length)

  function selectTopic(nextIndex, taskIndex = 0) {
    setTopic(nextIndex)
    setIndex(taskIndex)
  }

  return (
    <section className="page active sqlt python-training">
      <div className="sqlt-layout python-layout">
        {header}
        <aside className="python-sidebar" aria-label="Прогресс и выбор задач">
          <div className="sqlt-head-progress">
            <span className="sqlt-head-progress-label">Твой прогресс</span>
            <span className="sqlt-head-progress-num">{totalSolved}<span>/{totalTasks}</span></span>
            <ProgressBar label="Решено задач" count={totalSolved} total={totalTasks} />
            <span className="sqlt-head-progress-sub">{totalSolved * 10} XP · Тем освоено {completeTopics} из {topics.length}</span>
            {levels.map((level, i) => {
              const total = levelTasks[i].length
              const count = countSolved(levelTasks[i])
              return (
                <div className="python-level" key={level}>
                  <span className="sqlt-score">{level}</span>
                  <span className="sqlt-head-progress-sub">{count} из {total} · осталось {total - count}</span>
                  <ProgressBar label={level} count={count} total={total} />
                </div>
              )
            })}
          </div>

          <div className="sqlt-task python-navigation">
            <h2 className="sqlt-schema-title">Темы и задачи</h2>
            <Disclosure label={topic.title} meta={topic.level}>
              {close => levels.map(level => (
                <div className="python-topic-group" key={level}>
                  <div className="sqlt-head-progress-label">{level}</div>
                  {topics.map((item, i) => item.level === level && (
                    <button key={item.title} type="button" className={`sqlt-cat${i === topicIndex ? ' is-on' : ''}`}
                      aria-pressed={i === topicIndex} onClick={() => {
                        if (i !== topicIndex) selectTopic(i)
                        close()
                      }}>
                      <span className="sqlt-cat-title">{item.title}</span>
                      <span className="sqlt-cat-count">{solvedTopics[i]}/{item.tasks.length}</span>
                    </button>
                  ))}
                </div>
              ))}
            </Disclosure>

            <span className="sqlt-score">Решено в теме {solvedTopics[topicIndex]} из {topic.tasks.length}</span>
            <div className="sqlt-dots" role="group" aria-label="Задачи темы">
              {topic.tasks.map((item, i) => (
                <button key={i} type="button" aria-pressed={i === index}
                  className={`sqlt-dot${i === index ? ' is-active' : ''}${isSolved(item) ? ' is-solved' : ''}`}
                  onClick={() => setIndex(i)} title={item.title}
                  aria-label={`Задача ${i + 1}. ${item.title}${isSolved(item) ? ' · решено' : ''}`}>
                  {i + 1}
                </button>
              ))}
            </div>

            {nextTopic >= 0 && (
              <button type="button" className="sqlt-exec" onClick={() => {
                selectTopic(nextTopic, topics[nextTopic].tasks.findIndex(item => !isSolved(item)))
              }}>К первой нерешённой задаче</button>
            )}
          </div>
        </aside>

        <div className="sqlt-main python-workspace">
          <Disclosure key={topic.title} label="Шпаргалка" meta={topic.title}>
            {() => (
              <div className="python-reference">
                <p className="sqlt-task-text"><InlineMarkup text={topic.sheet} /></p>
                <pre><code>{examples[topicIndex]}</code></pre>
              </div>
            )}
          </Disclosure>
          {saveError?.id === task.id && <p className="sqlt-error" role="alert">{saveError.message}</p>}
          <TaskCard key={task.id} task={task} index={index} user={user} solved={isSolved(task)}
            savedAnswer={solutions[task.id]} onSolved={save}>
            <TaskHint text={task.hint || topic.sheet} />
          </TaskCard>
        </div>
      </div>
    </section>
  )
}
