export default function Day23SortingTasks() {
  return {
    tasks: [
      {
        text: 'Какая сложность bubble sort?',
        answer: 'O(n^2)',
        hint: 'Самый медленный алгоритм сортировки',
        difficulty: 'Средне',
      },
      {
        text: 'Какая сложность merge sort?',
        answer: 'O(n log n)',
        hint: 'Быстрый и стабильный алгоритм',
        difficulty: 'Средне',
      },
      {
        text: 'Какая сложность quick sort в среднем?',
        answer: 'O(n log n)',
        hint: 'Быстрая сортировка (в среднем случае)',
        difficulty: 'Средне',
      },
      {
        text: 'Какой алгоритм сортировки используется в Python?',
        answer: 'timsort',
        hint: 'Timsort - комбинация merge и insertion sort',
        difficulty: 'Сложно',
      },
      {
        text: 'Какая сложность бинарного поиска?',
        answer: 'O(log n)',
        hint: 'На каждом шаге половины массива исключаются',
        difficulty: 'Средне',
      },
      {
        text: 'Сколько операций для 1000 элементов при O(n log n)?',
        answer: '10000',
        hint: 'Примерно 1000 * log2(1000) ≈ 10000',
        difficulty: 'Сложно',
      },
    ],
  }
}
