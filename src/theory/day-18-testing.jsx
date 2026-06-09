import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day18TestingTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 18</h1>
        <p className="theory-subtitle">Тестирование, комментарии и документация</p>
        <p className="theory-date">18 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Типы тестов</h2>
        <TheoryTable
          headers={['Тип', 'Что тестирует', 'Скорость', 'Пример']}
          rows={[
            ['Unit', 'Одна функция', 'Быстро', 'def test_add()'],
            ['Integration', 'Несколько компонентов', 'Медленнее', 'Фронтенд + API'],
            ['E2E', 'Весь поток пользователя', 'Очень медленно', 'Открыть браузер, кликнуть'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Паттерн AAA</h2>
        <p className="theory-intro">Arrange → Act → Assert. Структура каждого теста:</p>
        <TheoryCode code={`def test_user_creation():
    # Arrange (подготовка)
    user_data = {"name": "Иван", "age": 17}

    # Act (выполнение)
    user = User(**user_data)

    # Assert (проверка)
    assert user.name == "Иван"
    assert user.age == 17`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">TDD (Test-Driven Development)</h2>
        <p className="theory-intro">Красный → Зелёный → Рефакторинг</p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>Напиши тест (сейчас fails) 🔴</li>
          <li>Напиши код чтобы тест passed ✅</li>
          <li>Рефакторь код (тесты всё ещё работают)</li>
          <li>Повтори</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Документация</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">README</h3>
          <p className="theory-intro">Лицо проекта. Должно быть понятно за 30 секунд.</p>
          <ul className="theory-list">
            <li className="theory-list-item">Что это</li>
            <li className="theory-list-item">Как установить</li>
            <li className="theory-list-item">Как использовать</li>
            <li className="theory-list-item">Примеры</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Docstrings (Python)</h3>
          <TheoryCode code={`def calculate_average(numbers):
    """
    Вычисляет среднее арифметическое.

    Args:
        numbers (list): Список чисел

    Returns:
        float: Среднее значение

    Raises:
        ValueError: Если список пуст
    """
    if not numbers:
        raise ValueError("Список не может быть пустым")
    return sum(numbers) / len(numbers)`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">JSDoc (JavaScript)</h3>
          <TheoryCode code={`/**
 * Сортирует массив
 * @param {number[]} arr - Массив чисел
 * @returns {number[]} Отсортированный массив
 * @throws {Error} Если arr не массив
 */
function sortArray(arr) {
    return arr.sort((a, b) => a - b)
}`} language="javascript" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Комментарии</h2>
        <TheoryExample title="Плохо">
          <p>// Увеличиваем i на 1</p>
          <p>i++</p>
        </TheoryExample>

        <TheoryExample title="Хорошо">
          <p>// Пропускаем элементы до первого позитивного отзыва</p>
          <p>while (reviews[i].rating &lt; 4) i++</p>
        </TheoryExample>

        <p className="theory-intro" style={{ marginTop: '16px' }}>
          Правило: комментируй ЧТО и ПОЧЕМУ, а не ЧТО делает код (это очевидно из кода).
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Хорошие привычки</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Пиши код для людей, компилятор уже поймёт</li>
          <li className="theory-list-item">✅ Тесты это документация (показывают как использовать)</li>
          <li className="theory-list-item">✅ Код должен быть понятен без комментариев</li>
          <li className="theory-list-item">❌ Не комментируй очевидное</li>
          <li className="theory-list-item">❌ Не оставляй старый код в комментариях (это Git!)</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Качество &gt; Количество кода! 🎯</p>
      </section>
    </div>
  )
}
