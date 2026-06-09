export default function Day2BasicsTasks() {
  return {
    tasks: [
      {
        text: 'Какой тип данных у значения 42?',
        answer: 'int',
        hint: 'Целые числа без точки называются...',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: 10 + 5 * 2?',
        answer: '20',
        hint: 'Помни про приоритет операций (сначала умножение)',
        difficulty: 'Легко',
      },
      {
        text: 'True или False: 5 > 3?',
        answer: 'true',
        hint: 'Сравни числа: 5 больше чем 3?',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: 10 > 5 and 3 > 4?',
        answer: 'false',
        hint: 'Обе части должны быть истинными для and',
        difficulty: 'Средне',
      },
      {
        text: 'Переменная x = 5. Какой результат x += 3?',
        answer: '8',
        hint: 'x += 3 это то же самое что x = x + 3',
        difficulty: 'Средне',
      },
      {
        text: 'Какой тип данных у "hello"?',
        answer: 'str',
        hint: 'Текст в кавычках это строка или...',
        difficulty: 'Легко',
      },
      {
        text: 'True или False: "5" == 5?',
        answer: 'false',
        hint: 'Строка "5" и число 5 это разные типы',
        difficulty: 'Сложно',
      },
    ],
  }
}
