import { TheoryTable, TheoryCode, TheoryExample, DbTable } from './components/TheoryTable'

export default function Day18TestingTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Тестирование, комментарии и документация · SQL часть 2</h1>
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

      {/* ─────────── SQL ЧАСТЬ 2 ─────────── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">📊 SQL — часть 2: агрегатные функции</h2>
        <p className="theory-intro">
          Агрегатные функции считают что-то по целой группе строк и возвращают одно число. Используем ту же таблицу <strong>users</strong> из части 1.
        </p>
        <DbTable
          name="users"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['1', 'Анна', '25', 'Москва'],
            ['2', 'Борис', '31', 'Казань'],
            ['3', 'Вера', '19', 'Москва'],
            ['4', 'Глеб', '42', 'Сочи'],
            ['5', 'Дина', '28', 'Казань'],
          ]}
        />
        <TheoryTable
          headers={['Функция', 'Что делает', 'Пример', 'Результат']}
          rows={[
            ['COUNT(*)', 'Считает строки', 'SELECT COUNT(*) FROM users', '5'],
            ['AVG(age)', 'Среднее значение', 'SELECT AVG(age) FROM users', '29'],
            ['MAX(age)', 'Максимум', 'SELECT MAX(age) FROM users', '42'],
            ['MIN(age)', 'Минимум', 'SELECT MIN(age) FROM users', '19'],
            ['SUM(age)', 'Сумма', 'SELECT SUM(age) FROM users', '145'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GROUP BY — группировка</h2>
        <p className="theory-intro">
          GROUP BY собирает строки в группы по одинаковому значению, и агрегатная функция считается для каждой группы отдельно.
        </p>
        <TheoryCode language="sql" code={`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city;`} />
        <p className="theory-text">Строки сгруппировались по городу, и для каждого посчиталось количество:</p>
        <DbTable
          name="результат"
          columns={['city', 'count']}
          rows={[
            ['Москва', '2'],
            ['Казань', '2'],
            ['Сочи', '1'],
          ]}
          highlightCols={[1]}
          caption="Анна+Вера → Москва (2), Борис+Дина → Казань (2), Глеб → Сочи (1)"
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">HAVING — фильтр групп</h2>
        <p className="theory-intro">
          HAVING фильтрует уже сгруппированные данные. Запомни разницу: <strong>WHERE</strong> фильтрует строки ДО группировки, <strong>HAVING</strong> — группы ПОСЛЕ.
        </p>
        <TheoryCode language="sql" code={`SELECT city, COUNT(*) AS count
FROM users
GROUP BY city
HAVING COUNT(*) > 1;`} />
        <p className="theory-text">Остались только города, где больше одного пользователя:</p>
        <DbTable
          name="результат"
          columns={['city', 'count']}
          rows={[
            ['Москва', '2'],
            ['Казань', '2'],
          ]}
          highlightRows={[0, 1]}
          caption="Сочи отброшен — там только 1 пользователь"
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">INSERT — добавление данных</h2>
        <TheoryCode language="sql" code={`INSERT INTO users (id, name, age, city)
VALUES (6, 'Егор', 35, 'Москва');`} />
        <p className="theory-text">В таблице появилась новая строка:</p>
        <DbTable
          name="users"
          columns={['id', 'name', 'age', 'city']}
          rows={[
            ['...', '...', '...', '...'],
            ['5', 'Дина', '28', 'Казань'],
            ['6', 'Егор', '35', 'Москва'],
          ]}
          highlightRows={[2]}
          caption="Новая строка добавлена в конец таблицы"
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">UPDATE и DELETE</h2>
        <p className="theory-intro">
          UPDATE меняет существующие строки, DELETE удаляет их. Условие WHERE определяет, какие именно строки затронуты.
        </p>
        <TheoryCode language="sql" code={`-- Изменить город пользователя с id=1
UPDATE users SET city = 'Сочи' WHERE id = 1;

-- Удалить пользователя с id=6
DELETE FROM users WHERE id = 6;`} />
        <TheoryExample title="⚠️ Главное правило безопасности">
          <p>ВСЕГДА пиши WHERE в UPDATE и DELETE! Без условия команда изменит или удалит <strong>ВСЕ</strong> строки таблицы.</p>
          <p style={{ marginTop: '8px', color: '#ff5f5f' }}>DELETE FROM users; — удалит вообще всех пользователей!</p>
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Качество &gt; количество кода. А GROUP BY и агрегаты превращают тысячи строк в осмысленные цифры! 🎯</p>
      </section>
    </div>
  )
}
