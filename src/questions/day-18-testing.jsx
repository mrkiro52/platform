export default function Day18TestingTasks() {
  return {
    tasks: [
      {
        text: 'Что такое unit тест?',
        type: 'choice',
        answer: 'функция',
        options: ['функция', 'модуль', 'приложение', 'система'],
        hint: 'Тест для одной функции или метода',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое integration тест?',
        type: 'choice',
        answer: 'компоненты',
        options: ['компоненты', 'функция', 'модуль', 'приложение'],
        hint: 'Тест для нескольких компонентов вместе',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое E2E тест?',
        type: 'choice',
        answer: 'пользователь',
        options: ['пользователь', 'функция', 'интеграция', 'модуль'],
        hint: 'End-to-End тест - тест всего приложения как пользователь',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое TDD?',
        type: 'choice',
        answer: 'тест',
        options: ['тест', 'метод', 'подход', 'техника'],
        hint: 'Test-Driven Development - тесты пишут до кода',
        difficulty: 'Средне',
      },
      {
        text: 'Какой паттерн используется в тестировании?',
        type: 'choice',
        answer: 'aaa',
        options: ['aaa', 'aab', 'abc', 'bbb'],
        hint: 'AAA паттерн: Arrange, Act, Assert',
        difficulty: 'Средне',
      },
      {
        text: 'Какой минимальный процент покрытия кода тестами?',
        type: 'input',
        answer: '50',
        hint: 'Минимум 50%, идеально 80-90%',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое mock в тестировании?',
        type: 'choice',
        answer: 'подделка',
        options: ['подделка', 'реальный объект', 'тест', 'функция'],
        hint: 'Подделка (имитация) реального объекта для тестов',
        difficulty: 'Сложно',
      },
    ],
  }
}
