import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

export default function Day4AlgorithmsTheory({ videoUrl }) {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Алгоритмическое мышление и Big O</h1>
      </section>

      {videoUrl && <VideoPlayer src={videoUrl} />}

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое алгоритм?</h2>
        <p className="theory-intro">
          Алгоритм — это пошаговая инструкция для решения задачи. Как рецепт в кулинарии: нужно делать шаги в правильном порядке, чтобы получить результат.
        </p>

        <p className="theory-intro" style={{ marginTop: '12px' }}>Свойства алгоритма:</p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Конечность</strong> — алгоритм должен закончиться, не бежать вечно</li>
          <li className="theory-list-item"><strong>Определённость</strong> — каждый шаг должен быть ясным и однозначным</li>
          <li className="theory-list-item"><strong>Ввод</strong> — алгоритм принимает входные данные</li>
          <li className="theory-list-item"><strong>Вывод</strong> — алгоритм выдаёт результат</li>
          <li className="theory-list-item"><strong>Эффективность</strong> — алгоритм должен работать за разумное время</li>
        </ul>

        <TheoryExample title="Пример: Рецепт чая">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Налей воду в чайник</li>
            <li>Включи чайник</li>
            <li>Жди, пока вода закипит</li>
            <li>Налей горячую воду в кружку</li>
            <li>Положи пакетик чая</li>
            <li>Жди 3-5 минут</li>
            <li>Достань пакетик</li>
            <li>Добавь сахар (по желанию)</li>
            <li>Чай готов!</li>
          </ol>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Примеры алгоритмов</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Алгоритм: Найти максимум в списке</h3>
          <TheoryCode code={`def find_max(numbers):
    max_value = numbers[0]

    for num in numbers:
        if num > max_value:
            max_value = num

    return max_value

# Пример
scores = [45, 89, 23, 67, 92, 34]
print(find_max(scores))  # 92`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Алгоритм: Поиск элемента (Linear Search)</h3>
          <TheoryCode code={`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Найдено на позиции i
    return -1  # Не найдено

# Пример
fruits = ["яблоко", "банан", "апельсин"]
print(linear_search(fruits, "банан"))  # 1
print(linear_search(fruits, "груша"))  # -1`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Алгоритм: Сортировка (Bubble Sort)</h3>
          <TheoryCode code={`def bubble_sort(arr):
    n = len(arr)

    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                # Меняем местами
                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr

# Пример
nums = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(nums))
# [11, 12, 22, 25, 34, 64, 90]`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Нотация Big O (сложность алгоритма)</h2>
        <p className="theory-intro">
          Big O — это способ описать, как быстро растёт время выполнения алгоритма при увеличении входных данных.
        </p>

        <TheoryExample title="Аналогия">
          <p>Представь, что у тебя есть большая библиотека:</p>
          <ul>
            <li><strong>O(1)</strong> — ты помнишь, где конкретная книга, берёшь её сразу</li>
            <li><strong>O(n)</strong> — нужно проверить все полки, может на 100-й полке</li>
            <li><strong>O(n²)</strong> — нужно проверить все полки и все книги на каждой полке</li>
          </ul>
        </TheoryExample>

        <TheoryTable
          headers={['Нотация', 'Название', 'Что делает', 'Пример', 'Скорость']}
          rows={[
            ['O(1)', 'Постоянная', 'Одна операция, не зависит от размера', 'Доступ к элементу по индексу', 'Молния'],
            ['O(log n)', 'Логарифмическая', 'Каждый раз половина', 'Бинарный поиск', 'Очень быстро'],
            ['O(n)', 'Линейная', 'Проверить все элементы', 'Поиск в списке', 'Быстро'],
            ['O(n log n)', 'Линейно-логарифмическая', 'Разделяй и властвуй', 'Эффективная сортировка', 'Нормально'],
            ['O(n²)', 'Квадратичная', 'Вложенные циклы', 'Пузырьковая сортировка', 'Медленно'],
            ['O(n³)', 'Кубическая', 'Три вложенных цикла', 'Тройные циклы', 'Медленнее'],
            ['O(2ⁿ)', 'Экспоненциальная', 'Растёт очень быстро', 'Некоторые рекурсивные алгоритмы', 'Очень медленно'],
          ]}
        />

        <div className="theory-subsection" style={{ marginTop: '24px' }}>
          <h3 className="theory-heading-3">Как анализировать Big O</h3>
          <TheoryCode code={`# O(1) - одна операция
def get_first(arr):
    return arr[0]

# O(n) - один цикл
def sum_all(arr):
    total = 0
    for num in arr:
        total += num
    return total

# O(n²) - вложенные циклы
def print_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)

# O(log n) - каждый раз половина (бинарный поиск)
def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сравнение скоростей</h2>
        <p className="theory-intro">Как быстро работают разные алгоритмы с 1 млн элементов:</p>

        <TheoryTable
          headers={['Big O', 'Операций', 'Время', 'Использовать?']}
          rows={[
            ['O(1)', '1', '0.000001 сек', 'Идеально! ✅'],
            ['O(log n)', '20', '0.00002 сек', 'Очень хорошо ✅'],
            ['O(n)', '1,000,000', '0.001 сек', 'Хорошо ✅'],
            ['O(n log n)', '20,000,000', '0.02 сек', 'Приемлемо ✅'],
            ['O(n²)', '1,000,000,000,000', '16 минут', 'Плохо ❌'],
            ['O(2ⁿ)', 'Огромное число', 'Вечность ', 'Очень плохо ❌'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как выбрать хороший алгоритм</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Для маленьких данных — важнее простота кода</li>
          <li className="theory-list-item">Для больших данных — важнее скорость (Big O)</li>
          <li className="theory-list-item">Всегда проверь граничные случаи (пустой список, один элемент)</li>
          <li className="theory-list-item">O(n) лучше, чем O(n²), но O(1) ещё лучше!</li>
        </ul>

        <TheoryExample title="На собеседовании">
          <p>Когда спрашивают решить задачу, обязательно скажи:</p>
          <ul>
            <li>Какая Big O временная сложность?</li>
            <li>Какая Big O пространственная сложность (память)?</li>
            <li>Можно ли оптимизировать?</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Теперь ты знаешь, как писать быстрый код</p>
      </section>
    </div>
  )
}
