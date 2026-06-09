import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day16LanguagesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 16</h1>
        <p className="theory-subtitle">Обзор языков и фреймворков</p>
        <p className="theory-date">16 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Карта языков программирования</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Системное программирование</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>C/C++:</strong> Скорость, контроль памяти, операционные системы</li>
            <li className="theory-list-item"><strong>Rust:</strong> C++ но безопаснее, растущий язык</li>
            <li className="theory-list-item"><strong>Go:</strong> Просто, быстро, параллелизм</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Веб-разработка</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>JavaScript/TypeScript:</strong> Везде (браузер + сервер)</li>
            <li className="theory-list-item"><strong>Python:</strong> Простой, много библиотек</li>
            <li className="theory-list-item"><strong>PHP:</strong> Исторически для веб, всё ещё популярен</li>
            <li className="theory-list-item"><strong>Java:</strong> Масштабируемые приложения</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Мобильная разработка</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Swift:</strong> iOS (Apple)</li>
            <li className="theory-list-item"><strong>Kotlin:</strong> Android (Google)</li>
            <li className="theory-list-item"><strong>React Native/Flutter:</strong> Cross-platform</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Data Science / ML</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Python:</strong> Король ML (NumPy, Pandas, TensorFlow)</li>
            <li className="theory-list-item"><strong>R:</strong> Статистика и визуализация</li>
            <li className="theory-list-item"><strong>Julia:</strong> Научные вычисления</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Популярные фреймворки</h2>

        <TheoryTable
          headers={['Язык', 'Фреймворк', 'Для', 'Когда использовать']}
          rows={[
            ['JavaScript', 'React, Vue, Angular', 'Frontend', 'Интерактивные веб-приложения'],
            ['Python', 'Django, FastAPI, Flask', 'Backend', 'REST API, веб-сервисы'],
            ['Java', 'Spring Boot', 'Backend', 'Масштабируемые приложения'],
            ['Go', 'Gin, Echo', 'Backend', 'Микросервисы, высокая нагрузка'],
            ['React Native', 'React Native', 'Мобильная', 'iOS + Android с одним кодом'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Выбор первого языка</h2>

        <TheoryExample title="Если хочешь веб (frontend)">
          <p>🎯 <strong>JavaScript</strong> — единственный выбор. Всё в браузере работает на JS</p>
        </TheoryExample>

        <TheoryExample title="Если хочешь веб (backend)">
          <p>🎯 <strong>Python</strong> (просто учиться) или <strong>JavaScript</strong> (если знаешь)</p>
        </TheoryExample>

        <TheoryExample title="Если хочешь мобильную разработку">
          <p>🎯 <strong>Swift</strong> (iOS) или <strong>Kotlin</strong> (Android)</p>
        </TheoryExample>

        <TheoryExample title="Если хочешь ML/Data Science">
          <p>🎯 <strong>Python</strong> — это твой язык</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Рынок труда 2026</h2>

        <TheoryTable
          headers={['Язык/Стек', 'Спрос', 'Зарплата', 'Сложность']}
          rows={[
            ['JavaScript/React', '⭐⭐⭐⭐⭐', 'Высокая', 'Средняя'],
            ['Python', '⭐⭐⭐⭐⭐', 'Очень высокая (ML)', 'Легкая'],
            ['Java', '⭐⭐⭐⭐', 'Очень высокая', 'Средняя'],
            ['Go', '⭐⭐⭐⭐', 'Высокая', 'Средняя'],
            ['Rust', '⭐⭐⭐', 'Очень высокая', 'Сложная'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Советы</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Выбери один язык и доведи до уровня</li>
          <li className="theory-list-item">Второй язык учить проще (концепции одинаковые)</li>
          <li className="theory-list-item">Язык менее важен чем алгоритмы и структуры данных</li>
          <li className="theory-list-item">На собеседовании спрашивают концепции, а не синтаксис</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Выбери путь и иди по нему с уверенностью! 🚀</p>
      </section>
    </div>
  )
}
