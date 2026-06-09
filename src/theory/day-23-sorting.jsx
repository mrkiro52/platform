import { TheoryTable, TheoryCode } from './components/TheoryTable'

export default function Day23SortingTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 23</h1>
        <p className="theory-subtitle">Алгоритмы: сортировки и поиск</p>
        <p className="theory-date">23 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Алгоритмы сортировки</h2>
        <TheoryTable
          headers={['Алгоритм', 'Big O', 'Стабильный?', 'Когда использовать']}
          rows={[
            ['Bubble Sort', 'O(n²)', 'Да', 'Только для обучения'],
            ['Merge Sort', 'O(n log n)', 'Да', 'Нужна стабильность'],
            ['Quick Sort', 'O(n log n)', 'Нет', 'Обычно быстрее'],
            ['Heap Sort', 'O(n log n)', 'Нет', 'Гарантированно быстро'],
            ['Insertion Sort', 'O(n²)', 'Да', 'Маленькие массивы'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Merge Sort</h2>
        <TheoryCode code={`def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    return result + left[i:] + right[j:]`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Quick Sort</h2>
        <TheoryCode code={`def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[0]
    left = [x for x in arr[1:] if x < pivot]
    right = [x for x in arr[1:] if x >= pivot]

    return quick_sort(left) + [pivot] + quick_sort(right)`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Бинарный поиск</h2>
        <TheoryCode code={`def binary_search(arr, target):
    left, right = 0, len(arr) - 1

    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1  # Не найдено`} language="python" />
        <p className="theory-intro" style={{ marginTop: '16px' }}>⚠️ Работает только на отсортированном массиве!</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Алгоритм Кадане (Maximum Subarray)</h2>
        <TheoryCode code={`def max_subarray(arr):
    max_ending_here = arr[0]
    max_so_far = arr[0]

    for i in range(1, len(arr)):
        max_ending_here = max(arr[i], max_ending_here + arr[i])
        max_so_far = max(max_so_far, max_ending_here)

    return max_so_far

# Пример: [−2,1,−3,4,−1,2,1,−5,4] → 6 (подмассив [4,−1,2,1])`} language="python" />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Сортировка везде! Выучи хорошо! 📊</p>
      </section>
    </div>
  )
}
