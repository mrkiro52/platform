import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'
import VideoPlayer from '../components/VideoPlayer'

// Ссылки на видео для каждого дня. Пустая строка = нет видео.
const VIDEO_URLS = {
  1: '',
  2: '',
  3: '',
  4: 'https://s3.regru.cloud/kirocamp/day4.mp4',
  5: '',
  6: '',
  7: 'https://s3.regru.cloud/kirocamp/day7.mp4',
  8: '',
  9: '',
  10: '',
  11: '',
  12: '',
  13: '',
  14: '',
  15: '',
  16: '',
  17: '',
  18: '',
  19: '',
  20: '',
  21: '',
  22: '',
  23: '',
  24: '',
  25: '',
  26: '',
  27: '',
  28: '',
  29: '',
  30: '',
}
import Day1IntroTheory from '../theory/day-1-intro'
import Day2BasicsTheory from '../theory/day-2-basics'
import Day3LoopsTheory from '../theory/day-3-loops'
import Day4AlgorithmsTheory from '../theory/day-4-algorithms'
import Day5LogicTheory from '../theory/day-5-logic'
import Day6GraphsTheory from '../theory/day-6-graphs'
import Day7StructuresTheory from '../theory/day-7-structures'
import Day8StacksQueuesTheory from '../theory/day-8-stacks-queues'
import Day9HashtablesTheory from '../theory/day-9-hashtables'
import Day10TreesTheory from '../theory/day-10-trees'
import Day11GitTheory from '../theory/day-11-git'
import Day12AiToolsTheory from '../theory/day-12-ai-tools'
import Day13ProjectTheory from '../theory/day-13-project'
import Day15TimeManagementTheory from '../theory/day-15-timemanagement'
import Day16LanguagesTheory from '../theory/day-16-languages'
import Day17TrendsTheory from '../theory/day-17-trends'
import Day18TestingTheory from '../theory/day-18-testing'
import Day19SqlTheory from '../theory/day-19-sql'
import Day20ApiTheory from '../theory/day-20-api'
import Day22SortingTheory from '../theory/day-22-sorting'
import Day24PatternsTheory from '../theory/day-24-patterns'
import Day25SecurityTheory from '../theory/day-25-security'
import Day26SoftSkillsTheory from '../theory/day-26-softs-kills'
import Day27LearningTheory from '../theory/day-27-learning'
import Day21Insider2Theory from '../theory/day-21-insider2'
import Day29ResumeTheory from '../theory/day-29-resume'
import July1PythonTheory from '../theory/july-1-python'
import July1HtmlTheory from '../theory/july-1-html'
import July1BackendTheory from '../theory/july-1-backend'
import July1SecurityTheory from '../theory/july-1-security'
import July2OsTheory from '../theory/july-2-os'
import July2CombinatoricsTheory from '../theory/july-2-combinatorics'
import July2MlIntroTheory from '../theory/july-2-ml-intro'
import July2BackendArchTheory from '../theory/july-2-backend-arch'
import July3LeetcodeTheory from '../theory/july-3-leetcode'

// Маппинг дней на компоненты с теорией
const THEORY_COMPONENTS = {
  1: Day1IntroTheory,
  2: Day2BasicsTheory,
  3: Day3LoopsTheory,
  4: Day4AlgorithmsTheory,
  5: Day5LogicTheory,
  6: Day6GraphsTheory,
  7: Day7StructuresTheory,
  8: Day8StacksQueuesTheory,
  9: Day9HashtablesTheory,
  10: Day10TreesTheory,
  11: Day11GitTheory,
  12: Day12AiToolsTheory,
  13: Day13ProjectTheory,
  15: Day15TimeManagementTheory,
  16: Day16LanguagesTheory,
  17: Day17TrendsTheory,
  18: Day18TestingTheory,
  19: Day19SqlTheory,
  20: Day20ApiTheory,
  22: Day22SortingTheory,
  25: Day21Insider2Theory,
  23: Day24PatternsTheory,
  24: Day25SecurityTheory,
  26: Day26SoftSkillsTheory,
  27: Day27LearningTheory,
  29: Day29ResumeTheory,
  // Июль — специализация (треки)
  101: July1HtmlTheory,     // Frontend
  102: July1BackendTheory,  // Backend
  103: July1PythonTheory,   // ML / Аналитика
  104: July1SecurityTheory, // Кибербезопасность
  105: July2OsTheory,             // Кибербезопасность, 2 июля
  106: July2CombinatoricsTheory,  // Аналитика, 2 июля
  107: July2MlIntroTheory,        // ML, 2 июля
  108: July2BackendArchTheory,    // Backend, 2 июля
  109: July3LeetcodeTheory,       // Все треки, 3 июля
}

// Заголовки для июльских треков (синтетические id)
export const JULY_TRACK_LABELS = {
  101: '1 июля · Frontend — Основы HTML',
  102: '1 июля · Backend — Python vs Go',
  103: '1 июля · ML/Аналитика — Основы Python',
  104: '1 июля · Кибербезопасность — Основы ИБ',
  105: '2 июля · Кибербезопасность — Операционные системы',
  106: '2 июля · Аналитика — Комбинаторика и теория вероятностей',
  107: '2 июля · ML — Введение в машинное обучение',
  108: '2 июля · Backend — Архитектура веб-приложения',
  109: '3 июля · Все треки — Нарешиваем LeetCode',
}

const THEORY_TITLES = {
  1: 'Вводное занятие: старт лагеря',
  // Можно переопределить названия или взять из расписания
}

function getDayLabel(dayNum) {
  if (JULY_TRACK_LABELS[dayNum]) return JULY_TRACK_LABELS[dayNum]
  const schedule = SCHEDULE.find(e => e.day === dayNum)
  return schedule ? schedule.title : `День ${dayNum}`
}

export default function TheoryPage({ selectedDay, onBack }) {
  const [TheoryComponent, setTheoryComponent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Имитируем загрузку
    const timer = setTimeout(() => {
      if (THEORY_COMPONENTS[selectedDay]) {
        setTheoryComponent(() => THEORY_COMPONENTS[selectedDay])
      }
      setLoading(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [selectedDay])

  if (loading) {
    return (
      <section className="page active">
        <div className="page-header">
          <p style={{ color: 'var(--text-secondary)' }}>Загрузка...</p>
        </div>
      </section>
    )
  }

  if (!TheoryComponent) {
    return (
      <section className="page active">
        <div className="page-header">
          <p style={{ color: 'var(--text-tertiary)' }}>Материалы для этого дня еще готовятся...</p>
        </div>
        <button className="btn-back" onClick={onBack}>
          ← Вернуться в Библиотеку
        </button>
      </section>
    )
  }

  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          📚 Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {JULY_TRACK_LABELS[selectedDay] ? getDayLabel(selectedDay) : `День ${selectedDay} · ${getDayLabel(selectedDay)}`}
        </span>
      </div>

      <TheoryComponent videoUrl={VIDEO_URLS[selectedDay] || null} />

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
