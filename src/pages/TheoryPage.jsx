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
  148: 'https://s3.regru.cloud/kirocamp/day16ml.mov',
  149: 'https://s3.regru.cloud/kirocamp/day16full.mov',
  150: 'https://s3.regru.cloud/kirocamp/day16sec.mov',
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
import July2CssTheory from '../theory/july-2-css'
import July4NetworksTheory from '../theory/july-4-networks'
import July4NumpyTheory from '../theory/july-4-numpy'
import July4SqlOrmTheory from '../theory/july-4-sql-orm'
import July4PreprocessorsTheory from '../theory/july-4-preprocessors'
import July5JavaScriptTheory from '../theory/july-5-javascript'
import July5DjangoTheory from '../theory/july-5-django'
import July5PandasTheory from '../theory/july-5-pandas'
import July5AssemblyTheory from '../theory/july-5-assembly'
import July6DomTheory from '../theory/july-6-dom'
import July6AuthTheory from '../theory/july-6-auth'
import July6StatisticsTheory from '../theory/july-6-statistics'
import July6LinRegTheory from '../theory/july-6-linreg'
import July6WinApiTheory from '../theory/july-6-winapi'
import July7AlgorithmsTheory from '../theory/july-7-algorithms'
import July8TypeScriptTheory from '../theory/july-8-typescript'
import July8DjangoValidationTheory from '../theory/july-8-django-validation'
import July8MetricsTheory from '../theory/july-8-metrics'
import July8GradientDescentTheory from '../theory/july-8-gradient-descent'
import July8CryptoTheory from '../theory/july-8-crypto'
import July9MatplotlibTheory from '../theory/july-9-matplotlib'
import July9WebSocketTheory from '../theory/july-9-websocket'
import July9OwaspTheory from '../theory/july-9-owasp'
import July1112PetProjectTheory from '../theory/july-11-12-petproject'
import July13OopTheory from '../theory/july-13-oop'
import July13AbTestingTheory from '../theory/july-13-ab-testing'
import July13MetricsTheory from '../theory/july-13-metrics'
import July13CctvTheory from '../theory/july-13-cctv'
import July14GeneralizationTheory from '../theory/july-14-generalization'
import July14VectorsTheory from '../theory/july-14-vectors'
import July14SsrSsgTheory from '../theory/july-14-ssr-ssg'
import July14MicroservicesTheory from '../theory/july-14-microservices'
import July14PhishingTheory from '../theory/july-14-phishing'
import July14DataCleaningTheory from '../theory/july-14-data-cleaning'
import July15DockerTheory from '../theory/july-15-docker'
import July15DocumentsTheory from '../theory/july-15-documents'
import July16DistributionsTheory from '../theory/july-16-distributions'
import July16DatabasesTheory from '../theory/july-16-databases'
import July16SecurityDevicesTheory from '../theory/july-16-security-devices'
import July17LeetcodeTheory from '../theory/july-17-leetcode'
import July18KnnTheory from '../theory/july-18-knn'
import July18OptimizationTheory from '../theory/july-18-optimization'

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
  110: July2CssTheory,            // Frontend, 2 июля
  111: July4NetworksTheory,       // Кибербезопасность, 4 июля
  112: July4NumpyTheory,          // Аналитика/ML, 4 июля
  113: July4SqlOrmTheory,         // Backend, 4 июля
  114: July4PreprocessorsTheory,  // Frontend, 4 июля
  115: July5JavaScriptTheory,     // Frontend, 5 июля
  116: July5DjangoTheory,         // Backend, 5 июля
  117: July5PandasTheory,         // Аналитика/ML, 5 июля
  118: July5AssemblyTheory,       // Кибербезопасность, 5 июля
  119: July6DomTheory,            // Frontend, 6 июля
  120: July6AuthTheory,           // Backend, 6 июля
  121: July6StatisticsTheory,     // Аналитика, 6 июля
  122: July6LinRegTheory,         // ML, 6 июля
  123: July6WinApiTheory,         // Кибербезопасность, 6 июля
  124: July7AlgorithmsTheory,     // Все треки, 7 июля
  125: July8TypeScriptTheory,       // Frontend, 8 июля
  126: July8DjangoValidationTheory, // Backend, 8 июля
  127: July8MetricsTheory,          // Аналитика, 8 июля
  128: July8GradientDescentTheory,  // ML, 8 июля
  129: July8CryptoTheory,           // Кибербезопасность, 8 июля
  130: July9MatplotlibTheory,        // Аналитика/ML, 9 июля
  131: July9WebSocketTheory,         // Backend/Frontend, 9 июля
  132: July9OwaspTheory,             // Кибербезопасность, 9 июля
  // 133: 10 июля (LeetCode) — материалы не добавляются намеренно
  134: July1112PetProjectTheory,      // Все треки, 11 июля
  135: July1112PetProjectTheory,      // Все треки, 12 июля
  136: July13OopTheory,               // Frontend/Backend, 13 июля
  137: July13AbTestingTheory,         // Аналитика, 13 июля
  138: July13MetricsTheory,           // ML, 13 июля
  139: July13CctvTheory,              // Кибербезопасность, 13 июля
  140: July14GeneralizationTheory,     // ML, 14 июля
  141: July14VectorsTheory,            // Аналитика, 14 июля
  142: July14SsrSsgTheory,             // Frontend, 14 июля
  143: July14MicroservicesTheory,      // Backend, 14 июля
  144: July14PhishingTheory,           // Кибербезопасность, 14 июля
  145: July14DataCleaningTheory,       // Аналитика, 14 июля — очистка данных
  146: July15DockerTheory,             // Frontend/Backend, 15 июля — Docker
  147: July15DocumentsTheory,          // Кибербезопасность, 15 июля — ЭДО и нормативка
  148: July16DistributionsTheory,      // Аналитика/ML, 16 июля — распределения
  149: July16DatabasesTheory,          // Frontend/Backend, 16 июля — виды баз данных
  150: July16SecurityDevicesTheory,    // Кибербезопасность, 16 июля — технические средства охраны
  151: July17LeetcodeTheory,          // Все треки, 17 июля — разбор LeetCode
  152: July18KnnTheory,                // Аналитика/ML, 18 июля — kNN
  153: July18OptimizationTheory,       // Frontend/Backend, 18 июля — оптимизация
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
  110: '2 июля · Frontend — Основы CSS',
  111: '4 июля · Кибербезопасность — Компьютерные сети: основы',
  112: '4 июля · Аналитика/ML — Библиотека NumPy',
  113: '4 июля · Backend — Базы данных: SQL и ORM',
  114: '4 июля · Frontend — Препроцессоры LESS/SASS/SCSS',
  115: '5 июля · Frontend — Продвинутый JavaScript',
  116: '5 июля · Backend — REST API: создание на Python',
  117: '5 июля · Аналитика/ML — NumPy p.2 и Pandas',
  118: '5 июля · Кибербезопасность — Ассемблер и кое-что до',
  119: '6 июля · Frontend — JavaScript: Взаимодействие с DOM',
  120: '6 июля · Backend — Аутентификация и авторизация',
  121: '6 июля · Аналитика — Математическая статистика',
  122: '6 июля · ML — Линейная регрессия + практика',
  123: '6 июля · Кибербезопасность — Основы WinAPI и C++',
  124: '7 июля · Все треки — Вспоминаем структуры данных и алгоритмы',
  125: '8 июля · Frontend — TypeScript',
  126: '8 июля · Backend — Валидация и обработка ошибок',
  127: '8 июля · Аналитика — Продуктовые метрики',
  128: '8 июля · ML — Градиентный спуск',
  129: '8 июля · Кибербезопасность — Криптография',
  130: '9 июля · Аналитика/ML — Визуализация данных: Matplotlib',
  131: '9 июля · Backend/Frontend — WebSocket и real-time',
  132: '9 июля · Кибербезопасность — OWASP Top 10',
  133: '10 июля · Все треки — Нарешиваем LeetCode',
  134: '11 июля · Все треки — Делаем пет-проект',
  135: '12 июля · Все треки — Делаем пет-проект',
  136: '13 июля · Frontend/Backend — ООП: основы',
  137: '13 июля · Аналитика — A/B-тестирование',
  138: '13 июля · ML — Метрики классификации и регрессии',
  139: '13 июля · Кибербезопасность — Технологии видеонаблюдения',
  140: '14 июля · ML — Обобщающая способность: отложенная выборка и кросс-валидация',
  141: '15 июля · Аналитика/ML — Линейная алгебра: векторы',
  142: '14 июля · Frontend — SSG и SSR: серверный рендеринг и Next.js',
  143: '14 июля · Backend — Микросервисы: основы',
  144: '14 июля · Кибербезопасность — Социальная инженерия и фишинг',
  145: '14 июля · Аналитика — Очистка данных',
  146: '15 июля · Frontend/Backend — Docker: основы',
  147: '15 июля · Кибербезопасность — Электронный документооборот и нормативная база РФ',
  148: '16 июля · Аналитика/ML — Качаем статистику: распределения',
  149: '16 июля · Frontend/Backend — Все виды баз данных: сходства и отличия',
  150: '16 июля · Кибербезопасность — Технические средства охраны',
  151: '17 июля · Все треки — Нарешиваем LeetCode',
  152: '18 июля · Аналитика/ML — Алгоритм k-Nearest Neighbors (kNN)',
  153: '18 июля · Frontend/Backend — Оптимизация фронтенда и бэкенда',
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
