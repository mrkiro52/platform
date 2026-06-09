export default function Day4AlgorithmsTasks() {
  return {
    tasks: [
      {
        text: 'Что такое Big O нотация?',
        type: 'choice',
        answer: 'сложность',
        options: ['сложность', 'память', 'скорость', 'алгоритм'],
        hint: 'Она описывает время выполнения алгоритма или...',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность поиска в неотсортированном списке?',
        type: 'choice',
        answer: 'O(n)',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        hint: 'В худшем случае нужно проверить все элементы',
        difficulty: 'Средне',
      },
      {
        text: 'O(n) или O(1) - что быстрее?',
        type: 'choice',
        answer: 'O(1)',
        options: ['O(1)', 'O(n)', 'одинаково', 'зависит от данных'],
        hint: 'O(1) константа, O(n) линейная - константа быстрее',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность бинарного поиска?',
        type: 'choice',
        answer: 'O(log n)',
        options: ['O(log n)', 'O(n)', 'O(1)', 'O(n log n)'],
        hint: 'Каждый раз делим список пополам',
        difficulty: 'Средне',
      },
      {
        text: 'Какой алгоритм рекомендован для сортировки больших данных?',
        type: 'choice',
        answer: 'merge sort',
        options: ['merge sort', 'bubble sort', 'insertion sort', 'selection sort'],
        hint: 'Это быстрый алгоритм разделяй и властвуй',
        difficulty: 'Сложно',
      },
      {
        text: 'O(n^2), O(n log n), O(n) - расставь в порядке возрастания скорости',
        type: 'choice',
        answer: 'O(n), O(n log n), O(n^2)',
        options: ['O(n), O(n log n), O(n^2)', 'O(n^2), O(n log n), O(n)', 'O(n log n), O(n), O(n^2)', 'O(n), O(n^2), O(n log n)'],
        hint: 'От самого быстрого к самому медленному',
        difficulty: 'Сложно',
      },
    ],
  }
}
