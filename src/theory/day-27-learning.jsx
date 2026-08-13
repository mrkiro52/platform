import { TheoryExample } from './components/TheoryTable'

export default function Day27LearningTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Как учиться программированию</h1>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Активное vs Пассивное обучение</h2>
        <ul className="theory-list">
          <li className="theory-list-item">❌ Пассивное: Читать блоги, смотреть видео</li>
          <li className="theory-list-item">✅ Активное: Писать код, делать проекты, объяснять</li>
        </ul>
        <p className="theory-intro" style={{ marginTop: '12px' }}>
          Статистика: помнишь 10% прочитанного, 50% услышанного, 90% сделанного!
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Метод Фейнмана</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>Выбери концепцию</li>
          <li>Объясни её простыми словами (как ребёнку)</li>
          <li>Определи пробелы в понимании</li>
          <li>Упрости и переделай объяснение</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ресурсы для обучения</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Обучение:</strong> CS50, Roadmap.sh, Udemy</li>
          <li className="theory-list-item"><strong>Практика:</strong> LeetCode, Codeforces, HackerRank</li>
          <li className="theory-list-item"><strong>Проекты:</strong> GitHub, собственные идеи</li>
          <li className="theory-list-item"><strong>Сообщество:</strong> Reddit r/learnprogramming, Discord</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как учиться эффективно</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Уделяй 1-2 часа ежедневно, а не 8 часов в выходной</li>
          <li className="theory-list-item">✅ Проектное обучение: делай реальные проекты</li>
          <li className="theory-list-item">✅ Читай чужой код (GitHub, документация)</li>
          <li className="theory-list-item">✅ Объясняй другим (лучший способ учиться)</li>
          <li className="theory-list-item">❌ Не зубри синтаксис (Google это за тебя)</li>
          <li className="theory-list-item">❌ Не начинай со сложного</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Публичное портфолио</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>GitHub:</strong> README, примеры кода, проекты</li>
          <li className="theory-list-item"><strong>LinkedIn:</strong> Опыт, навыки, рекомендации</li>
          <li className="theory-list-item"><strong>Личный сайт:</strong> Portfolio с примерами работ</li>
          <li className="theory-list-item"><strong>Блог:</strong> Статьи о том что учишь</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как ставить цели (OKR)</h2>
        <TheoryExample title="Пример OKR">
          <p><strong>Objective:</strong> Научиться веб-разработке</p>
          <p><strong>Key Results:</strong></p>
          <ul style={{ marginTop: '8px' }}>
            <li>1. Завершить 5 проектов на React</li>
            <li>2. Сделать 30 задач на LeetCode (medium)</li>
            <li>3. Прочитать 2 книги по вебу</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Обучение — это путь, не пункт назначения! 📚</p>
      </section>
    </div>
  )
}
