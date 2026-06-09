import { TheoryCode } from './components/TheoryTable'

export default function Day26SoftSkillsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 26</h1>
        <p className="theory-subtitle">Soft skills: команда, фидбек, рост</p>
        <p className="theory-date">26 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Работа в команде</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Коммуникация:</strong> Ясно объясняй проблемы</li>
          <li className="theory-list-item"><strong>Слушание:</strong> Слушай мнение других</li>
          <li className="theory-list-item"><strong>Сотрудничество:</strong> Помогай коллегам</li>
          <li className="theory-list-item"><strong>Ответственность:</strong> Бери на себя задачи</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как давать фидбек (модель SBI)</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li><strong>Situation:</strong> Опиши ситуацию</li>
          <li><strong>Behavior:</strong> Что сделал человек</li>
          <li><strong>Impact:</strong> Какой был результат</li>
        </ol>

        <TheoryCode code={`// ❌ Плохо
"Твой код плохой"

// ✅ Хорошо
"На код-ревью я заметил, что функция calcPrice()
не обрабатывает null значения. Это привело к ошибке
на продакшене. Давай добавим валидацию в начале функции."`} language="text" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как просить о помощи</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Rubber duck debugging: объясни проблему игрушечной утке</li>
          <li className="theory-list-item">✅ Google → StackOverflow → коллеги → менеджер</li>
          <li className="theory-list-item">✅ Показывай что уже пробовал</li>
          <li className="theory-list-item">❌ Сразу не звони с вопросом</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Синдром самозванца</h2>
        <p className="theory-intro">
          Чувство что ты не достоин, что все лучше, что вот-вот все поймут что ты фрод.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Это нормально — даже опытные разработчики это чувствуют</li>
          <li className="theory-list-item">✅ Пиши код, получай фидбек, улучшайся</li>
          <li className="theory-list-item">✅ Помни о достижениях, а не только о ошибках</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Профессиональный рост</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Читай чужой код — лучше всего учиться</li>
          <li className="theory-list-item">Делись знаниями (статьи, переговоры, mentoring)</li>
          <li className="theory-list-item">Проси фидбек и совета</li>
          <li className="theory-list-item">Учись на ошибках (своих и чужих)</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Soft skills важны как hard skills! 🤝</p>
      </section>
    </div>
  )
}
