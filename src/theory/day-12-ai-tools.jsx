import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day12AiToolsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 12</h1>
        <p className="theory-subtitle">ИИ-инструменты разработчика</p>
        <p className="theory-date">12 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как работают LLM?</h2>
        <p className="theory-intro">
          LLM (Large Language Model) — большая языковая модель. Это нейросеть, обученная на миллиардах слов из интернета. Предсказывает следующее слово на основе контекста.
        </p>

        <TheoryExample title="Упрощённо">
          <p>Ты: "Привет, как"</p>
          <p>Модель: Какое слово логично идёт после "как"? Вероятности: дела (60%), ты (20%), раньше (10%)</p>
          <p>Модель: Выбираю "дела" → "Привет, как дела"</p>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Основные параметры</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Токены</strong> — куски слов (примерно 1 токен = 4 символа)</li>
            <li className="theory-list-item"><strong>Контекстное окно</strong> — сколько слов модель может "помнить" (Claude: 200k токенов)</li>
            <li className="theory-list-item"><strong>Температура</strong> — 0 = детерминированно, 1 = случайно, 0.7 = баланс</li>
            <li className="theory-list-item"><strong>Max tokens</strong> — максимальная длина ответа</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Популярные LLM</h2>
        <TheoryTable
          headers={['Модель', 'Компания', 'Сильные стороны', 'Когда использовать']}
          rows={[
            ['Claude 3.5 Sonnet', 'Anthropic', 'Программирование, логика, длинный контекст', 'Разработка, анализ кода'],
            ['ChatGPT-4', 'OpenAI', 'Общее назначение, интерпретация', 'Универсальное использование'],
            ['Gemini Pro', 'Google', 'Мультимодальность, быстрота', 'Изображения, видео'],
            ['DeepSeek', 'DeepSeek', 'Быстрая, эффективная', 'Когда нужна скорость'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Промпт-инжиниринг</h2>
        <p className="theory-intro">
          Искусство писать правильные запросы к ИИ. Хороший промпт = хороший ответ.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Техника: Chain of Thought</h3>
          <p className="theory-intro">Попроси модель думать пошагово:</p>
          <TheoryExample title="Плохой промпт">
            <p>"Напиши код для сортировки массива"</p>
          </TheoryExample>
          <TheoryExample title="Хороший промпт">
            <p>"Напиши алгоритм быстрой сортировки. Сначала объясни как он работает шаг за шагом, потом напиши код на Python"</p>
          </TheoryExample>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Техника: Few-shot learning</h3>
          <p className="theory-intro">Покажи примеры перед основным вопросом:</p>
          <TheoryCode code={`Вот примеры переводов переменных в snake_case:
userName → user_name
getUserId → get_user_id
firstName → first_name

Теперь переведи эти переменные:
myAwesomeVariable → ?
isActive → ?
totalCount → ?`} />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Техника: Ролевой запрос</h3>
          <TheoryExample title="Пример">
            <p>"Представь себя опытным разработчиком Python. Напиши код функции, которая проверяет валидность email адреса"</p>
          </TheoryExample>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GitHub Copilot</h2>
        <p className="theory-intro">
          Расширение в IDE, которое автодополняет код во время печати. Обучено на миллионах реальных проектов на GitHub.
        </p>

        <ul className="theory-list">
          <li className="theory-list-item">Работает в VS Code, JetBrains IDE, Neovim</li>
          <li className="theory-list-item">Пишет функции, тесты, комментарии</li>
          <li className="theory-list-item">Учится из контекста (название функции, комментарии)</li>
          <li className="theory-list-item">Платно ($10/месяц или бесплатно для студентов)</li>
        </ul>

        <TheoryExample title="Как использовать">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Напиши название функции и комментарий</li>
            <li>Copilot предложит реализацию</li>
            <li>Tab чтобы принять, Esc чтобы отклонить</li>
          </ol>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Claude Code</h2>
        <p className="theory-intro">
          IDE расширение для Claude. Позволяет Claude читать и редактировать код напрямую.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item">Автоматизирует рутинные задачи (рефакторинг, исправление ошибок)</li>
          <li className="theory-list-item">Работает с контекстом проекта</li>
          <li className="theory-list-item">Очень полезен для больших рефакторингов</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ограничения ИИ</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Галлюцинации</strong> — модель выдумывает ложную информацию с уверенностью</li>
          <li className="theory-list-item"><strong>Старые данные</strong> — обучена до определённой даты, о новом не знает</li>
          <li className="theory-list-item"><strong>Может ошибаться</strong> — сложный код может быть неправильным</li>
          <li className="theory-list-item"><strong>Контекст</strong> — может забыть начало длинного текста</li>
          <li className="theory-list-item"><strong>Детали</strong> — не всегда точна в точных вычислениях</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Этика использования ИИ</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Всегда проверяй код перед использованием</li>
          <li className="theory-list-item">Не копируй чужой код без проверки лицензии</li>
          <li className="theory-list-item">Раскрывай использование ИИ где нужно</li>
          <li className="theory-list-item">Не полагайся полностью на ИИ — они помощник, не замена</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">ИИ — мощный инструмент, используй его мудро! 🤖</p>
      </section>
    </div>
  )
}
