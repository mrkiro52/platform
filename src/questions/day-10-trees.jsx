export default function Day10TreesTasks() {
  return {
    tasks: [
      {
        text: 'Из скольких детей состоит бинарное дерево?',
        type: 'input',
        answer: '2',
        hint: 'Левый и правый потомок',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется элемент в вершине дерева?',
        type: 'choice',
        answer: 'корень',
        options: ['корень', 'лист', 'узел', 'ребро'],
        hint: 'Root - верхний элемент дерева',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат поиска в сбалансированном BST?',
        type: 'choice',
        answer: 'O(log n)',
        options: ['O(log n)', 'O(n)', 'O(1)', 'O(n^2)'],
        hint: 'На каждом шаге исключаем половину элементов',
        difficulty: 'Средне',
      },
      {
        text: 'Какие виды обхода дерева существуют?',
        type: 'choice',
        answer: 'in-order',
        options: ['in-order', 'pre-order', 'post-order', 'level-order'],
        hint: 'In-order (левый, родитель, правый), pre-order, post-order',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое высота дерева?',
        type: 'choice',
        answer: 'путь',
        options: ['путь', 'глубина', 'ширина', 'размер'],
        hint: 'Максимальное расстояние от корня до листа',
        difficulty: 'Средне',
      },
      {
        text: 'В чём отличие между BST и обычным бинарным деревом?',
        type: 'choice',
        answer: 'порядок',
        options: ['порядок', 'размер', 'высота', 'глубина'],
        hint: 'BST имеет свойство упорядоченности: левый < родитель < правый',
        difficulty: 'Сложно',
      },
    ],
  }
}
