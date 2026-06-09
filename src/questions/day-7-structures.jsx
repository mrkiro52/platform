export default function Day7StructuresTasks() {
  return {
    tasks: [
      {
        text: 'Какой индекс первого элемента в массиве?',
        type: 'input',
        answer: '0',
        hint: 'Индексация начинается с нуля',
        difficulty: 'Легко',
      },
      {
        text: 'Как получить элемент массива arr по индексу 2?',
        type: 'choice',
        answer: 'arr[2]',
        options: ['arr[2]', 'arr.get(2)', 'arr(2)', 'arr-2'],
        hint: 'Используй квадратные скобки',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность доступа к элементу в массиве?',
        type: 'choice',
        answer: 'O(1)',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        hint: 'Прямой доступ по индексу это константа',
        difficulty: 'Средне',
      },
      {
        text: 'Какая сложность поиска в отсортированном массиве?',
        type: 'choice',
        answer: 'O(log n)',
        options: ['O(log n)', 'O(n)', 'O(1)', 'O(n^2)'],
        hint: 'Можно использовать бинарный поиск',
        difficulty: 'Средне',
      },
      {
        text: 'Какая сложность вставки элемента в начало массива?',
        type: 'choice',
        answer: 'O(n)',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n log n)'],
        hint: 'Нужно сдвинуть все элементы',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое связный список?',
        type: 'choice',
        answer: 'цепочка',
        options: ['цепочка', 'дерево', 'граф', 'таблица'],
        hint: 'Структура где каждый элемент указывает на следующий',
        difficulty: 'Средне',
      },
    ],
  }
}
