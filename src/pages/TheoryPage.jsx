import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'
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
import Day23SortingTheory from '../theory/day-23-sorting'
import Day24PatternsTheory from '../theory/day-24-patterns'
import Day25SecurityTheory from '../theory/day-25-security'
import Day26SoftSkillsTheory from '../theory/day-26-softs-kills'
import Day27LearningTheory from '../theory/day-27-learning'
import Day29ResumeTheory from '../theory/day-29-resume'

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
  23: Day23SortingTheory,
  24: Day24PatternsTheory,
  25: Day25SecurityTheory,
  26: Day26SoftSkillsTheory,
  27: Day27LearningTheory,
  29: Day29ResumeTheory,
}

const THEORY_TITLES = {
  1: 'Вводное занятие: старт лагеря',
  // Можно переопределить названия или взять из расписания
}

function getDayLabel(dayNum) {
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
          День {selectedDay} · {getDayLabel(selectedDay)}
        </span>
      </div>

      <TheoryComponent />

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
