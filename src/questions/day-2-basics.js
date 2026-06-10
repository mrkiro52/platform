export default function Day2BasicsTasks() {
  return {
    tasks: [
      {
        id: 1,
        type: 'choice',
        difficulty: 'easy',
        text: 'Что выведет: print(int("42"))?',
        options: ['42', '"42"', 'Ошибка', 'None'],
        answer: '42',
        hint: 'int() преобразует строку в целое число'
      },
      {
        id: 2,
        type: 'choice',
        difficulty: 'easy',
        text: 'Что выведет: print(7 / 2)?',
        options: ['3', '3.5', '3.0', '2'],
        answer: '3.5',
        hint: 'Оператор / всегда возвращает float'
      },
      {
        id: 3,
        type: 'choice',
        difficulty: 'easy',
        text: 'Что выведет: print(7 // 2)?',
        options: ['3.5', '3', '4', 'Ошибка'],
        answer: '3',
        hint: '// — целочисленное деление (floor division)'
      },
      {
        id: 4,
        type: 'choice',
        difficulty: 'easy',
        text: 'Что выведет: print(7 % 3)?',
        options: ['2', '1', '4', '0'],
        answer: '1',
        hint: '% возвращает остаток от деления: 7 = 3*2 + 1'
      },
      {
        id: 5,
        type: 'choice',
        difficulty: 'medium',
        text: 'Какой приоритет операций верный?',
        options: [
          '+ - > * / > **',
          '** > * / // % > + -',
          '* > + > **',
          '** > + > *'
        ],
        answer: '** > * / // % > + -',
        hint: 'Возведение в степень выполняется первым'
      },
      {
        id: 6,
        type: 'choice',
        difficulty: 'easy',
        text: 'Какие из этих значений считаются "ложными"?',
        options: ['Только False', '0, "", None, [], False', 'Только 0', 'True и 1'],
        answer: '0, "", None, [], False',
        hint: 'Ложные значения: False, 0, пустая строка, None, пустые коллекции'
      },
      {
        id: 7,
        type: 'choice',
        difficulty: 'easy',
        text: 'Чем отличается is от ==?',
        options: [
          'Нет разницы',
          '== сравнивает значения, is сравнивает идентичность объектов',
          'is быстрее чем ==',
          'is работает только с числами'
        ],
        answer: '== сравнивает значения, is сравнивает идентичность объектов',
        hint: 'Для None правильно писать: x is None, а не x == None'
      },
      {
        id: 8,
        type: 'choice',
        difficulty: 'medium',
        text: 'Что выведет: print(True + True + False)?',
        options: ['TrueTrueFalse', '2', '1', 'Ошибка'],
        answer: '2',
        hint: 'True это 1, False это 0. Значит 1 + 1 + 0 = 2'
      },
      {
        id: 9,
        type: 'choice',
        difficulty: 'easy',
        text: 'Какой тип возвращает: print(type(1/1))?',
        options: ['int', 'float', 'str', 'bool'],
        answer: 'float',
        hint: 'Оператор / ВСЕГДА возвращает float, даже 4/2 вернет 2.0'
      },
      {
        id: 10,
        type: 'choice',
        difficulty: 'medium',
        text: 'Что выведет: print(-7 // 2)?',
        options: ['-3', '-4', '-3.5', 'Ошибка'],
        answer: '-4',
        hint: 'Floor division округляет вниз: -3.5 округляется в -4'
      },
      {
        id: 11,
        type: 'choice',
        difficulty: 'medium',
        text: 'Как правильно сравнить переменную с None?',
        options: [
          'x == None',
          'x is None',
          'Оба варианта одинаковы',
          'None == x'
        ],
        answer: 'x is None',
        hint: 'is проверяет идентичность объекта. Правильный способ: x is None'
      },
      {
        id: 12,
        type: 'choice',
        difficulty: 'medium',
        text: 'Как найти последнюю цифру числа 12345?',
        options: ['12345 / 10', '12345 // 10', '12345 % 10', '12345 - 10'],
        answer: '12345 % 10',
        hint: 'Остаток от деления на 10 дает последнюю цифру'
      }
    ]
  }
}
