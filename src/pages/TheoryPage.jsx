import { useEffect, useState, lazy, Suspense } from 'react'
import { SCHEDULE } from '../data'
import { api } from '../api'
import { QUESTIONS_COMPONENTS, QuestionsInline } from './QuestionsPage'
import { HomeworkInline } from './HomeworkPage'

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
const Day1IntroTheory = lazy(() => import('../theory/day-1-intro'))
const Day2BasicsTheory = lazy(() => import('../theory/day-2-basics'))
const Day3LoopsTheory = lazy(() => import('../theory/day-3-loops'))
const Day4AlgorithmsTheory = lazy(() => import('../theory/day-4-algorithms'))
const Day5LogicTheory = lazy(() => import('../theory/day-5-logic'))
const Day6GraphsTheory = lazy(() => import('../theory/day-6-graphs'))
const Day7StructuresTheory = lazy(() => import('../theory/day-7-structures'))
const Day8StacksQueuesTheory = lazy(() => import('../theory/day-8-stacks-queues'))
const Day9HashtablesTheory = lazy(() => import('../theory/day-9-hashtables'))
const Day10TreesTheory = lazy(() => import('../theory/day-10-trees'))
const Day11GitTheory = lazy(() => import('../theory/day-11-git'))
const Day12AiToolsTheory = lazy(() => import('../theory/day-12-ai-tools'))
const Day13ProjectTheory = lazy(() => import('../theory/day-13-project'))
const Day15TimeManagementTheory = lazy(() => import('../theory/day-15-timemanagement'))
const Day16LanguagesTheory = lazy(() => import('../theory/day-16-languages'))
const Day17TrendsTheory = lazy(() => import('../theory/day-17-trends'))
const Day18TestingTheory = lazy(() => import('../theory/day-18-testing'))
const Day19SqlTheory = lazy(() => import('../theory/day-19-sql'))
const Day20ApiTheory = lazy(() => import('../theory/day-20-api'))
const Day22SortingTheory = lazy(() => import('../theory/day-22-sorting'))
const Day24PatternsTheory = lazy(() => import('../theory/day-24-patterns'))
const Day25SecurityTheory = lazy(() => import('../theory/day-25-security'))
const Day26SoftSkillsTheory = lazy(() => import('../theory/day-26-softs-kills'))
const Day27LearningTheory = lazy(() => import('../theory/day-27-learning'))
const Day21Insider2Theory = lazy(() => import('../theory/day-21-insider2'))
const Day29ResumeTheory = lazy(() => import('../theory/day-29-resume'))
const July1PythonTheory = lazy(() => import('../theory/july-1-python'))
const July1HtmlTheory = lazy(() => import('../theory/july-1-html'))
const July1BackendTheory = lazy(() => import('../theory/july-1-backend'))
const July1SecurityTheory = lazy(() => import('../theory/july-1-security'))
const July2OsTheory = lazy(() => import('../theory/july-2-os'))
const July2CombinatoricsTheory = lazy(() => import('../theory/july-2-combinatorics'))
const July2MlIntroTheory = lazy(() => import('../theory/july-2-ml-intro'))
const July2BackendArchTheory = lazy(() => import('../theory/july-2-backend-arch'))
const July3LeetcodeTheory = lazy(() => import('../theory/july-3-leetcode'))
const July2CssTheory = lazy(() => import('../theory/july-2-css'))
const July4NetworksTheory = lazy(() => import('../theory/july-4-networks'))
const July4NumpyTheory = lazy(() => import('../theory/july-4-numpy'))
const July4SqlOrmTheory = lazy(() => import('../theory/july-4-sql-orm'))
const July4PreprocessorsTheory = lazy(() => import('../theory/july-4-preprocessors'))
const July5JavaScriptTheory = lazy(() => import('../theory/july-5-javascript'))
const July5DjangoTheory = lazy(() => import('../theory/july-5-django'))
const July5PandasTheory = lazy(() => import('../theory/july-5-pandas'))
const July5AssemblyTheory = lazy(() => import('../theory/july-5-assembly'))
const July6DomTheory = lazy(() => import('../theory/july-6-dom'))
const July6AuthTheory = lazy(() => import('../theory/july-6-auth'))
const July6StatisticsTheory = lazy(() => import('../theory/july-6-statistics'))
const July6LinRegTheory = lazy(() => import('../theory/july-6-linreg'))
const July6WinApiTheory = lazy(() => import('../theory/july-6-winapi'))
const July7AlgorithmsTheory = lazy(() => import('../theory/july-7-algorithms'))
const July8TypeScriptTheory = lazy(() => import('../theory/july-8-typescript'))
const July8DjangoValidationTheory = lazy(() => import('../theory/july-8-django-validation'))
const July8MetricsTheory = lazy(() => import('../theory/july-8-metrics'))
const July8GradientDescentTheory = lazy(() => import('../theory/july-8-gradient-descent'))
const July8CryptoTheory = lazy(() => import('../theory/july-8-crypto'))
const July9MatplotlibTheory = lazy(() => import('../theory/july-9-matplotlib'))
const July9WebSocketTheory = lazy(() => import('../theory/july-9-websocket'))
const July9OwaspTheory = lazy(() => import('../theory/july-9-owasp'))
const July1112PetProjectTheory = lazy(() => import('../theory/july-11-12-petproject'))
const July13OopTheory = lazy(() => import('../theory/july-13-oop'))
const July13AbTestingTheory = lazy(() => import('../theory/july-13-ab-testing'))
const July13MetricsTheory = lazy(() => import('../theory/july-13-metrics'))
const July13CctvTheory = lazy(() => import('../theory/july-13-cctv'))
const July14GeneralizationTheory = lazy(() => import('../theory/july-14-generalization'))
const July14VectorsTheory = lazy(() => import('../theory/july-14-vectors'))
const July14SsrSsgTheory = lazy(() => import('../theory/july-14-ssr-ssg'))
const July14MicroservicesTheory = lazy(() => import('../theory/july-14-microservices'))
const July14PhishingTheory = lazy(() => import('../theory/july-14-phishing'))
const July14DataCleaningTheory = lazy(() => import('../theory/july-14-data-cleaning'))
const July15DockerTheory = lazy(() => import('../theory/july-15-docker'))
const July15DocumentsTheory = lazy(() => import('../theory/july-15-documents'))
const July16DistributionsTheory = lazy(() => import('../theory/july-16-distributions'))
const July16DatabasesTheory = lazy(() => import('../theory/july-16-databases'))
const July16SecurityDevicesTheory = lazy(() => import('../theory/july-16-security-devices'))
const July17LeetcodeTheory = lazy(() => import('../theory/july-17-leetcode'))
const July18KnnTheory = lazy(() => import('../theory/july-18-knn'))
const July18OptimizationTheory = lazy(() => import('../theory/july-18-optimization'))
const July18CtfTheory = lazy(() => import('../theory/july-18-ctf'))
const July20MlInterviewTheory = lazy(() => import('../theory/july-20-ml-interview'))
const July21AnalyticsInterviewTheory = lazy(() => import('../theory/july-21-analytics-interview'))
const July22FullstackInterviewTheory = lazy(() => import('../theory/july-22-fullstack-interview'))
const July23SecurityInterviewTheory = lazy(() => import('../theory/july-23-security-interview'))
const July24InsiderShow3Theory = lazy(() => import('../theory/july-24-insider-show-3'))
const July28MicroservicesSystemDesignTheory = lazy(() => import('../theory/july-28-microservices-system-design'))
const July29DecisionTreesTheory = lazy(() => import('../theory/july-29-decision-trees'))
const July29FastApiBasicsTheory = lazy(() => import('../theory/july-29-fastapi-basics'))
const July29NetworkSecurityTheory = lazy(() => import('../theory/july-29-network-security'))
const July30NeuralNetworksLlmTheory = lazy(() => import('../theory/july-30-neural-networks-llm'))
const July30OptimizationTheory = lazy(() => import('../theory/july-30-frontend-backend-optimization'))
const July30CryptoBasicsTheory = lazy(() => import('../theory/july-30-crypto-basics'))
const July31LeetcodeTheory = lazy(() => import('../theory/july-31-leetcode'))
const August1ResumeFlagsTheory = lazy(() => import('../theory/august-1-resume-flags'))

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
  154: July18CtfTheory,                // Кибербезопасность, 18 июля — CTF основные принципы
  155: July20MlInterviewTheory,        // ML, 20 июля — вопросы с собеседования
  156: July21AnalyticsInterviewTheory, // Аналитика, 21 июля — вопросы с собеседования
  157: July22FullstackInterviewTheory, // Frontend/Backend, 22 июля — вопросы с собеседования
  158: July23SecurityInterviewTheory,  // Кибербезопасность, 23 июля — вопросы с собеседования
  159: July24InsiderShow3Theory,       // Все треки, 24 июля — Insider Show 3
  // 160, 161: 26-27 июля (пет-проекты и портфолио) — материалы не добавляются намеренно
  162: July28MicroservicesSystemDesignTheory, // Frontend/Backend, 28 июля — микросервисная архитектура и system design
  163: July29DecisionTreesTheory,       // Аналитика/ML, 29 июля — решающие деревья
  164: July29FastApiBasicsTheory,       // Backend, 29 июля — FastAPI основы
  165: July29NetworkSecurityTheory,     // Кибербезопасность, 29 июля — сетевая безопасность
  166: July30NeuralNetworksLlmTheory,    // Аналитика/ML, 30 июля — нейронные сети и LLM
  167: July30OptimizationTheory,         // Frontend/Backend, 30 июля — оптимизация фронтенда и бэкенда
  168: July30CryptoBasicsTheory,         // Кибербезопасность, 30 июля — основы криптографии
  169: July31LeetcodeTheory,             // Все треки, 31 июля — разбор LeetCode
  // Август — карьера (без деления на треки)
  170: August1ResumeFlagsTheory,          // 1 августа — Резюме: шаблон, ред- и грин-флаги
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
  154: '18 июля · Кибербезопасность — CTF: основные принципы',
  155: '20 июля · ML — Вопросы с собеседования: Python и основы',
  156: '21 июля · Аналитика — Вопросы с собеседования',
  157: '22 июля · Frontend/Backend — Вопросы с собеседования: Фуллстак разработка',
  158: '23 июля · Кибербезопасность — Вопросы с собеседования',
  159: '24 июля · Все треки — Insider Show 3',
  160: '26 июля · Все треки — Пет-проект и портфолио',
  161: '27 июля · Все треки — Пет-проект и портфолио',
  162: '28 июля · Frontend/Backend — Микросервисная архитектура и проектирование систем',
  163: '29 июля · Аналитика/ML — Решающие деревья',
  164: '29 июля · Backend — FastAPI: основы',
  165: '29 июля · Кибербезопасность — Основы сетевой безопасности',
  166: '30 июля · Аналитика/ML — Нейронные сети и LLM',
  167: '30 июля · Frontend/Backend — Методы оптимизации фронтенда и бэкенда',
  168: '30 июля · Кибербезопасность — Основы криптографии',
  169: '31 июля · Все треки — Нарешиваем LeetCode',
  170: '1 августа · Резюме: шаблон, ред- и грин-флаги',
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
  const [homeworkContent, setHomeworkContent] = useState(null)
  const [recordingMats, setRecordingMats] = useState([])

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

  useEffect(() => {
    import('../data/homeworkContent').then(mod => setHomeworkContent(mod.default))
  }, [])

  // Запись встречи хранится как материал дня в Библиотеке (только для июньских дней —
  // у июля/августа своей записи пока нет, secция просто не покажется).
  useEffect(() => {
    let cancelled = false
    api.library().then(weeks => {
      if (cancelled) return
      const day = weeks.flatMap(w => w.days).find(d => d.num === selectedDay)
      setRecordingMats(day?.mats || [])
    }).catch(() => setRecordingMats([]))
    return () => { cancelled = true }
  }, [selectedDay])

  const hasQuestions = !!QUESTIONS_COMPONENTS[selectedDay]
  const hasHomework = (homeworkContent?.[selectedDay]?.tasks?.length || 0) > 0

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
          Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {JULY_TRACK_LABELS[selectedDay] ? getDayLabel(selectedDay) : `День ${selectedDay} · ${getDayLabel(selectedDay)}`}
        </span>
      </div>

      {(recordingMats.length > 0 || hasQuestions || hasHomework) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '4px 0 20px' }}>
          {recordingMats.map(m => (
            <a
              key={m.id}
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 14.5 }}
            >
              {m.title} →
            </a>
          ))}
          {hasQuestions && (
            <a href="#theory-test-section" style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 14.5 }}>
              Перейти к тесту по теме →
            </a>
          )}
          {hasHomework && (
            <a href="#theory-homework-section" style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 14.5 }}>
              Перейти к заданиям по теме →
            </a>
          )}
        </div>
      )}

      <Suspense fallback={<p style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>Загрузка...</p>}>
        <TheoryComponent videoUrl={VIDEO_URLS[selectedDay] || null} />
      </Suspense>

      {hasQuestions && (
        <div id="theory-test-section" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border-color)' }}>
          <QuestionsInline selectedDay={selectedDay} />
        </div>
      )}

      {hasHomework && (
        <div id="theory-homework-section" style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border-color)' }}>
          <HomeworkInline selectedDay={selectedDay} />
        </div>
      )}

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
