import { useState, useEffect } from 'react'
import WeekMaterials from './WeekMaterials'
import QuizRunner from './QuizRunner'
import SqlDataset from './SqlDataset'
import { WEEK4_TITLE, WEEK4_TOPICS, topicById } from '../data/week4'

const TOPIC_KEY = 'kiro_week4_topic'

function savedTopic() {
  try {
    const raw = localStorage.getItem(TOPIC_KEY)
    return WEEK4_TOPICS.some(t => t.id === raw) ? raw : WEEK4_TOPICS[0].id
  } catch {
    return WEEK4_TOPICS[0].id
  }
}

function TopicCard({ topic, active, onSelect }) {
  return (
    <button
      type="button"
      className={`w4-topic${active ? ' is-active' : ''}`}
      onClick={() => onSelect(topic.id)}
    >
      <span className="w4-topic-title">{topic.title}</span>
      <span className="w4-topic-subtitle">{topic.subtitle}</span>
      <span className="w4-topic-for">
        <span className="w4-topic-tag">{topic.audienceNote}</span>
        {topic.audience}
      </span>
    </button>
  )
}

// Домашнее задание по SQL: датасет и список задач. Сдаётся через общую
// форму «Сдать дз» — там запросы попадают на проверку в админку.
function SqlHomework({ homework }) {
  const { tasks } = homework

  return (
    <div className="w4-sql">
      <a
        href="/autumn-camp/upload-homework?week=4&chapter=week4-sql-homework"
        target="_blank"
        rel="noopener"
        className="w4-submit-link"
      >
        <span className="w4-submit-link-title">Страница сдачи домашнего задания →</span>
        <span className="w4-submit-link-text">
          Откроется форма с этими же десятью задачами: вставляешь запрос под каждой и сдаёшь.
          Неделя и глава уже выбраны.
        </span>
      </a>

      <SqlDataset />

      <div className="w4-tasks-title">Задачи — от простых к сложным</div>
      <div className="w4-tasks">
        {tasks.map((task, i) => (
          <div key={i} className="w4-task">
            <div className="w4-task-num">
              Задача {i + 1}
              <span className="w4-task-level">{i < 4 ? 'базовый' : i < 8 ? 'средний' : 'сложный'}</span>
            </div>
            <div className="w4-task-text">{task.text}</div>
            <details className="w4-task-hint">
              <summary>Подсказка</summary>
              <div>{task.hint}</div>
            </details>
          </div>
        ))}
      </div>

      <p className="w4-sql-submit">
        Готовые запросы сдавай через кнопку <b>«Сдать дз»</b> на странице Autumn Camp или по ссылке
        выше: выбери неделю 4 и главу «Домашнее задание по SQL», вставь по одному запросу на задачу.
        Проверяющий увидит их и пришлёт результат.
      </p>
    </div>
  )
}

export default function Week4Program() {
  const [topicId, setTopicId] = useState(savedTopic)
  const [tab, setTab] = useState('materials')

  useEffect(() => {
    try { localStorage.setItem(TOPIC_KEY, topicId) } catch { /* не критично */ }
  }, [topicId])

  const topic = topicById(topicId) || WEEK4_TOPICS[0]

  const selectTopic = (id) => {
    setTopicId(id)
    setTab('materials')
  }

  return (
    <>
      <div className="w4-topics">
        {WEEK4_TOPICS.map(t => (
          <TopicCard key={t.id} topic={t} active={t.id === topicId} onSelect={selectTopic} />
        ))}
      </div>

      <div className="w4-hw-row">
        {WEEK4_TOPICS.map(t => (
          <button
            key={t.id}
            type="button"
            className={`w4-hw${topicId === t.id && tab === 'homework' ? ' is-active' : ''}`}
            onClick={() => { setTopicId(t.id); setTab('homework') }}
          >
            <span className="w4-hw-label">Домашнее задание</span>
            <span className="w4-hw-topic">{t.title}</span>
            <span className="w4-hw-kind">
              {t.homework.kind === 'quiz' ? 'онлайн-тест, 10 вопросов' : '10 задач на запросы'}
            </span>
          </button>
        ))}
      </div>

      <div className="w4-switch">
        <button
          type="button"
          className={`calls-tab${tab === 'materials' ? ' is-active' : ''}`}
          onClick={() => setTab('materials')}
        >
          Материалы
        </button>
        <button
          type="button"
          className={`calls-tab${tab === 'homework' ? ' is-active' : ''}`}
          onClick={() => setTab('homework')}
        >
          Домашнее задание
        </button>
        <span className="w4-switch-topic">{topic.title}</span>
      </div>

      {tab === 'materials' ? (
        <WeekMaterials
          key={topic.id}
          chapters={topic.chapters}
          title={`${WEEK4_TITLE} — ${topic.title}`}
          storageKey={`kiro_week4_visited_${topic.id}`}
          weekNumber={4}
          submitFormat="platform"
        />
      ) : (
        <div className="widget">
          <div className="widget-header">
            <span className="widget-title">Домашнее задание — {topic.title}</span>
          </div>

          {topic.homework.kind === 'quiz' ? (
            <>
              <p className="w4-quiz-intro">
                Десять вопросов, один верный вариант из четырёх. Отправлять ничего не нужно —
                результат появится сразу после завершения, вместе с разбором каждой ошибки.
                Между вопросами можно ходить назад и менять ответы.
              </p>
              <QuizRunner quiz={topic.homework.quiz} />
            </>
          ) : (
            <SqlHomework homework={topic.homework} />
          )}
        </div>
      )}
    </>
  )
}
