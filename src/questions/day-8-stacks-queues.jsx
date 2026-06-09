export default function Day8StacksQueuesTasks() {
  return {
    tasks: [
      {
        text: 'LIFO расшифровывается как?',
        answer: 'last in first out',
        hint: 'Последний вошедший первый вышедший это стек',
        difficulty: 'Легко',
      },
      {
        text: 'FIFO расшифровывается как?',
        answer: 'first in first out',
        hint: 'Первый вошедший первый вышедший это очередь',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется добавление элемента в стек?',
        answer: 'push',
        hint: 'push добавляет элемент на вершину',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется удаление элемента из стека?',
        answer: 'pop',
        hint: 'pop удаляет элемент с вершины',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность операции push в стеке?',
        answer: 'O(1)',
        hint: 'Добавление на вершину это константа',
        difficulty: 'Средне',
      },
      {
        text: 'Для чего часто используется стек?',
        answer: 'скобки',
        hint: 'Проверка сбалансированности скобок или отмена действий',
        difficulty: 'Средне',
      },
      {
        text: 'Когда очередь пуста и мы пытаемся удалить элемент?',
        answer: 'ошибка',
        hint: 'Это называется underflow - ошибка пустой очереди',
        difficulty: 'Средне',
      },
    ],
  }
}
