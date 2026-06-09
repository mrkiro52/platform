export default function Day2BasicsTasks() {
  return {
    tasks: [
      {
        text: 'Какой тип данных у значения 42?',
        type: 'choice',
        answer: 'int',
        options: ['int', 'float', 'str', 'bool'],
        hint: 'Целые числа без точки называются...',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: 10 + 5 * 2?',
        type: 'input',
        answer: '20',
        hint: 'Помни про приоритет операций (сначала умножение)',
        difficulty: 'Легко',
      },
      {
        text: 'True или False: 5 > 3?',
        type: 'choice',
        answer: 'true',
        options: ['true', 'false'],
        hint: 'Сравни числа: 5 больше чем 3?',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: 10 > 5 and 3 > 4?',
        type: 'choice',
        answer: 'false',
        options: ['true', 'false'],
        hint: 'Обе части должны быть истинными для and',
        difficulty: 'Средне',
      },
      {
        text: 'Переменная x = 5. Какой результат x += 3?',
        type: 'input',
        answer: '8',
        hint: 'x += 3 это то же самое что x = x + 3',
        difficulty: 'Средне',
      },
      {
        text: 'Какой тип данных у "hello"?',
        type: 'choice',
        answer: 'str',
        options: ['int', 'float', 'str', 'bool'],
        hint: 'Текст в кавычках это строка или...',
        difficulty: 'Легко',
      },
      {
        text: 'True или False: "5" == 5?',
        type: 'choice',
        answer: 'false',
        options: ['true', 'false'],
        hint: 'Строка "5" и число 5 это разные типы',
        difficulty: 'Сложно',
      },
    ],
  }
}
