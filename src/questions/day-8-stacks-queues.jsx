export default function Day8StacksQueuesTasks() {
  return {
    tasks: [
      {
        text: 'LIFO расшифровывается как?',
        type: 'choice',
        answer: 'last in first out',
        options: ['last in first out', 'linear in first out', 'list in first out', 'load in first out'],
        hint: 'Последний вошедший первый вышедший это стек',
        difficulty: 'Легко',
      },
      {
        text: 'FIFO расшифровывается как?',
        type: 'choice',
        answer: 'first in first out',
        options: ['first in first out', 'final in first out', 'file in first out', 'field in first out'],
        hint: 'Первый вошедший первый вышедший это очередь',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется добавление элемента в стек?',
        type: 'choice',
        answer: 'push',
        options: ['push', 'pop', 'add', 'insert'],
        hint: 'push добавляет элемент на вершину',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется удаление элемента из стека?',
        type: 'choice',
        answer: 'pop',
        options: ['pop', 'push', 'remove', 'delete'],
        hint: 'pop удаляет элемент с вершины',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность операции push в стеке?',
        type: 'choice',
        answer: 'O(1)',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        hint: 'Добавление на вершину это константа',
        difficulty: 'Средне',
      },
      {
        text: 'Для чего часто используется стек?',
        type: 'choice',
        answer: 'скобки',
        options: ['скобки', 'сортировка', 'поиск', 'кэш'],
        hint: 'Проверка сбалансированности скобок или отмена действий',
        difficulty: 'Средне',
      },
      {
        text: 'Когда очередь пуста и мы пытаемся удалить элемент?',
        type: 'choice',
        answer: 'ошибка',
        options: ['ошибка', 'возвращает ноль', 'ничего не происходит', 'возвращает None'],
        hint: 'Это называется underflow - ошибка пустой очереди',
        difficulty: 'Средне',
      },
    ],
  }
}
