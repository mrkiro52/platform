import { TheoryTable, TheoryCode } from './components/TheoryTable'
import SortVisualizer from './components/SortVisualizer'
import DivideSortViz from './components/DivideSortViz'
import VideoPlayer from '../components/VideoPlayer'

export default function Day22SortingTheory({ videoUrl }) {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 22</h1>
        <p className="theory-subtitle">Алгоритмы: сортировки и поиск</p>
        <p className="theory-date">22 июня 2026</p>
      </section>

      {videoUrl && <VideoPlayer src={videoUrl} />}

      {/* ─── Интерактив ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">🎮 Визуализация: запусти и посмотри</h2>
        <p>
          Лучший способ понять сортировку — увидеть её в действии. Выбери алгоритм, нажми
          «Запустить» и наблюдай, как меняются местами элементы. Жёлтым подсвечиваются сравниваемые
          элементы, красным — обмен, зелёным — уже вставшие на финальное место. Можно идти по шагам,
          менять скорость и пересоздавать массив.
        </p>
        <SortVisualizer />
      </section>

      {/* ─── Обзор ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Обзор сложностей</h2>
        <p>Краткая шпаргалка перед погружением в детали каждого алгоритма.</p>
        <TheoryTable
          headers={['Алгоритм', 'Лучшее', 'Среднее', 'Худшее', 'Память', 'Стабильный']}
          rows={[
            ['Bubble Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Да'],
            ['Selection Sort', 'O(n²)', 'O(n²)', 'O(n²)', 'O(1)', 'Нет'],
            ['Insertion Sort', 'O(n)', 'O(n²)', 'O(n²)', 'O(1)', 'Да'],
            ['Merge Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(n)', 'Да'],
            ['Quick Sort', 'O(n log n)', 'O(n log n)', 'O(n²)', 'O(log n)', 'Нет'],
            ['Heap Sort', 'O(n log n)', 'O(n log n)', 'O(n log n)', 'O(1)', 'Нет'],
            ['Counting Sort', 'O(n+k)', 'O(n+k)', 'O(n+k)', 'O(k)', 'Да'],
          ]}
        />
      </section>

      {/* ─── Bubble ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Bubble Sort — сортировка пузырьком</h2>
        <p>
          Алгоритм многократно проходит по массиву и сравнивает соседние элементы, меняя их местами,
          если они стоят неверно. После каждого прохода наибольший элемент «всплывает» в конец — как
          пузырёк воздуха в воде. Самый наглядный, но и самый медленный.
        </p>
        <ul className="theory-list">
          <li>Проходим по массиву слева направо, сравнивая каждую пару соседей.</li>
          <li>Если левый элемент больше правого — меняем их местами.</li>
          <li>После k-го прохода k наибольших элементов стоят на своих местах.</li>
          <li>Оптимизация: если за проход не было обменов — массив отсортирован, выходим досрочно.</li>
        </ul>
        <TheoryCode language="python" code={`def bubble_sort(arr: list) -> list:
    """Лучшее: O(n) | Среднее/Худшее: O(n²) | Память: O(1) | Стабильная"""
    n = len(arr)
    arr = arr[:]
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:        # ранний выход
            break
    return arr

print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
# → [11, 12, 22, 25, 34, 64, 90]`} />
        <p><strong>Когда использовать:</strong> только в учебных целях или на очень маленьких (&lt; 20) почти отсортированных наборах. В продакшене не применять.</p>
      </section>

      {/* ─── Selection ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Selection Sort — сортировка выбором</h2>
        <p>
          На каждом шаге ищем минимальный элемент в неотсортированной части и ставим его на нужное
          место. В отличие от пузырька, делает ровно n−1 обменов независимо от данных — это минимально
          возможное число записей.
        </p>
        <ul className="theory-list">
          <li>Делим массив на «отсортированную» (левую) и «неотсортированную» (правую) части.</li>
          <li>Находим индекс минимума в неотсортированной части.</li>
          <li>Меняем найденный минимум с первым элементом неотсортированной части.</li>
          <li>Граница сдвигается вправо. Повторяем n−1 раз.</li>
        </ul>
        <TheoryCode language="python" code={`def selection_sort(arr: list) -> list:
    """Всегда O(n²) | Память: O(1) | НЕ стабильная | ровно n-1 обменов"""
    arr = arr[:]
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

print(selection_sort([64, 25, 12, 22, 11]))
# → [11, 12, 22, 25, 64]`} />
        <p><strong>Когда использовать:</strong> когда запись в память дорогая (флеш-память с лимитом циклов записи) и нужно минимизировать число обменов.</p>
      </section>

      {/* ─── Insertion ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Insertion Sort — сортировка вставками</h2>
        <p>
          Берём очередной элемент и вставляем его на правильное место в уже отсортированную левую
          часть. Именно так большинство людей сортируют карты в руке. Является основой для Timsort —
          встроенной сортировки Python и Java.
        </p>
        <ul className="theory-list">
          <li>Первый элемент считается «отсортированным», начинаем со второго.</li>
          <li>Берём текущий элемент (key) и сравниваем с предыдущими.</li>
          <li>Сдвигаем все большие элементы вправо, пока не найдём место для key.</li>
          <li>Вставляем key на найденное место.</li>
        </ul>
        <TheoryCode language="python" code={`def insertion_sort(arr: list) -> list:
    """Лучшее: O(n) | Среднее/Худшее: O(n²) | Память: O(1) | Стабильная"""
    arr = arr[:]
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

print(insertion_sort([12, 11, 13, 5, 6]))
# → [5, 6, 11, 12, 13]`} />
        <p><strong>Когда использовать:</strong> маленькие массивы (&lt; 50), почти отсортированные или потоковые данные. Базовый случай в Timsort.</p>
      </section>

      {/* ─── Merge ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Merge Sort — сортировка слиянием</h2>
        <p>
          Классический «разделяй и властвуй»: рекурсивно делим массив пополам, пока не получим
          одноэлементные куски, затем сливаем их обратно в правильном порядке. Единственный алгоритм с
          гарантированным O(n log n) при любых входных данных.
        </p>
        <ul className="theory-list">
          <li>Базовый случай: массив из 0 или 1 элемента уже отсортирован.</li>
          <li>Делим массив пополам: left и right.</li>
          <li>Рекурсивно сортируем каждую половину.</li>
          <li>Сливаем две отсортированные половины, сравнивая элементы попарно.</li>
        </ul>
        <TheoryCode language="python" code={`def merge_sort(arr: list) -> list:
    """Всегда O(n log n) | Память: O(n) | Стабильная"""
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)

def _merge(left: list, right: list) -> list:
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:      # <= для стабильности
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# → [3, 9, 10, 27, 38, 43, 82]`} />
        <p><strong>Когда использовать:</strong> нужна гарантированная производительность и стабильность, сортировка связных списков, внешняя сортировка (данные не помещаются в ОЗУ), параллельные вычисления.</p>
        <p style={{ marginTop: '14px' }}>
          <strong>Посмотри вживую:</strong> сверху исходный массив делится пополам, ниже появляются
          подмассивы — и так до одиночных элементов. Затем снизу идёт слияние: соседние куски
          сравниваются поэлементно и собираются обратно в один отсортированный массив.
        </p>
        <DivideSortViz kind="merge" />
      </section>

      {/* ─── Quick ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Quick Sort — быстрая сортировка</h2>
        <p>
          Выбирает опорный элемент (pivot) и разделяет массив на два: меньше pivot и больше pivot.
          Рекурсивно сортирует обе части. Лучшая практическая скорость благодаря cache-friendliness и
          малым константам. Худший случай O(n²) при плохом выборе pivot — решается рандомизацией.
        </p>
        <ul className="theory-list">
          <li>Выбираем pivot (хорошая стратегия — случайный элемент или медиана трёх).</li>
          <li>Partition: слева все ≤ pivot, справа — все ≥ pivot.</li>
          <li>Рекурсивно сортируем левую и правую части.</li>
          <li>Базовый случай: подмассив из 0 или 1 элемента.</li>
        </ul>
        <TheoryCode language="python" code={`import random

def quick_sort(arr: list) -> list:
    """Среднее: O(n log n) | Худшее: O(n²) | Память: O(log n) | НЕ стабильная"""
    if len(arr) <= 1:
        return arr
    pivot = arr[random.randrange(len(arr))]   # случайный pivot
    less  = [x for x in arr if x <  pivot]
    equal = [x for x in arr if x == pivot]
    more  = [x for x in arr if x >  pivot]
    return quick_sort(less) + equal + quick_sort(more)

print(quick_sort([10, 7, 8, 9, 1, 5]))
# → [1, 5, 7, 8, 9, 10]`} />
        <p><strong>Когда использовать:</strong> общий случай, нужна высокая практическая скорость и не нужна стабильность. Лежит в основе std::sort в C++ и Arrays.sort для примитивов в Java.</p>
        <p style={{ marginTop: '14px' }}>
          <strong>Посмотри вживую:</strong> опорный элемент (pivot) подсвечен жёлтым. На каждом шаге
          массив разбивается на «меньше pivot» слева и «больше pivot» справа — и так рекурсивно вниз
          для каждого куска. Нижняя строка слева направо — уже отсортированный результат.
        </p>
        <DivideSortViz kind="quick" />
      </section>

      {/* ─── Heap ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Heap Sort — сортировка кучей</h2>
        <p>
          Использует структуру «двоичная куча» (binary heap). Сначала строим max-heap из массива,
          затем многократно извлекаем максимум в конец. Уникальное сочетание: гарантированный
          O(n log n) как у Merge Sort и O(1) памяти как у Quick Sort.
        </p>
        <ul className="theory-list">
          <li>Build Heap: превращаем массив в max-heap за O(n).</li>
          <li>Максимум (корень кучи) в arr[0]. Меняем его с последним элементом.</li>
          <li>Уменьшаем размер кучи на 1 и восстанавливаем свойство кучи (heapify вниз).</li>
          <li>Повторяем, пока в куче больше 1 элемента.</li>
        </ul>
        <TheoryCode language="python" code={`def heap_sort(arr: list) -> list:
    """Всегда O(n log n) | Память: O(1) | НЕ стабильная"""
    arr = arr[:]
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):   # строим max-heap
        _heapify(arr, n, i)
    for i in range(n - 1, 0, -1):         # извлекаем максимум
        arr[0], arr[i] = arr[i], arr[0]
        _heapify(arr, i, 0)
    return arr

def _heapify(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        _heapify(arr, n, largest)

print(heap_sort([12, 11, 13, 5, 6, 7]))
# → [5, 6, 7, 11, 12, 13]`} />
        <p><strong>Когда использовать:</strong> нужен гарантированный O(n log n) И нельзя использовать дополнительную память (embedded-системы). Основа поиска k наибольших элементов.</p>
      </section>

      {/* ─── Counting ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Counting Sort — сортировка подсчётом</h2>
        <p>
          Не сравнивает элементы между собой — это не comparison sort. Подсчитывает частоту каждого
          значения, строит накопленную сумму, затем раскладывает элементы по позициям. Работает только
          для целых чисел в известном диапазоне [0, k]. Поэтому достигает линейного времени.
        </p>
        <ul className="theory-list">
          <li>Создаём массив count размером k+1 и подсчитываем частоту каждого значения.</li>
          <li>Накапливаем суммы: count[i] += count[i-1].</li>
          <li>Проходим исходный массив справа налево, помещая каждый элемент на нужную позицию.</li>
        </ul>
        <TheoryCode language="python" code={`def counting_sort(arr: list) -> list:
    """Время: O(n + k) | Память: O(k) | k = max(arr) | Стабильная"""
    if not arr:
        return []
    k = max(arr)
    count = [0] * (k + 1)
    for x in arr:                 # подсчёт частот
        count[x] += 1
    for i in range(1, k + 1):     # накопленные суммы
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for x in reversed(arr):       # справа налево для стабильности
        count[x] -= 1
        output[count[x]] = x
    return output

print(counting_sort([4, 2, 2, 8, 3, 3, 1]))
# → [1, 2, 2, 3, 3, 4, 8]`} />
        <p><strong>Когда использовать:</strong> целые числа в небольшом диапазоне — оценки (0–100), возрасты, символы (0–255). Основа для Radix Sort.</p>
      </section>

      {/* ─── Вывод ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Важное замечание о Python</h2>
        <p>
          Встроенный <code>list.sort()</code> и функция <code>sorted()</code> используют
          {' '}<strong>Timsort</strong> — гибрид Merge Sort и Insertion Sort. Сложность O(n log n) в
          среднем и худшем, O(n) на уже отсортированных данных. В реальных проектах всегда используйте
          встроенную сортировку — она написана на C и значительно быстрее любой реализации на чистом
          Python. Алгоритмы выше нужно знать для собеседований и понимания того, что происходит «под капотом».
        </p>
      </section>
    </div>
  )
}
