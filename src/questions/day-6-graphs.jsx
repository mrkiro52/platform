export default function Day6GraphsTasks() {
  return {
    tasks: [
      {
        text: 'Из скольких основных частей состоит граф?',
        type: 'input',
        answer: '2',
        hint: 'Вершины (ноды) и рёбра (связи)',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется граф где рёбра имеют направление?',
        type: 'choice',
        answer: 'ориентированный',
        options: ['ориентированный', 'взвешенный', 'циклический', 'планарный'],
        hint: 'Граф с стрелочками это...',
        difficulty: 'Легко',
      },
      {
        text: 'BFS расшифровывается как?',
        type: 'choice',
        answer: 'breadth first search',
        options: ['breadth first search', 'binary first search', 'best first search', 'backward first search'],
        hint: 'Поиск в ширину это...',
        difficulty: 'Средне',
      },
      {
        text: 'DFS расшифровывается как?',
        type: 'choice',
        answer: 'depth first search',
        options: ['depth first search', 'direct first search', 'data first search', 'divide first search'],
        hint: 'Поиск в глубину это...',
        difficulty: 'Средне',
      },
      {
        text: 'Какую структуру данных использует BFS?',
        type: 'choice',
        answer: 'queue',
        options: ['queue', 'stack', 'heap', 'tree'],
        hint: 'Очередь (FIFO) используется в BFS',
        difficulty: 'Средне',
      },
      {
        text: 'Какую структуру данных использует DFS?',
        type: 'choice',
        answer: 'stack',
        options: ['stack', 'queue', 'heap', 'tree'],
        hint: 'Стек (LIFO) используется в DFS',
        difficulty: 'Средне',
      },
    ],
  }
}
