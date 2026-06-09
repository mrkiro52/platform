export default function Day3LoopsTasks() {
  return {
    tasks: [
      {
        text: 'Сколько раз выполнится цикл for i in range(5)?',
        type: 'input',
        answer: '5',
        hint: 'range(5) это 0, 1, 2, 3, 4 - всего 5 значений',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: range(2, 5)?',
        type: 'choice',
        answer: '2, 3, 4',
        options: ['2, 3, 4', '2, 3, 4, 5', '1, 2, 3, 4', '0, 1, 2'],
        hint: 'От 2 (включая) до 5 (не включая)',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат sum([1, 2, 3])?',
        type: 'input',
        answer: '6',
        hint: '1 + 2 + 3 = ?',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется цикл который продолжается пока условие истинно?',
        type: 'choice',
        answer: 'while',
        options: ['while', 'for', 'do', 'repeat'],
        hint: 'while... условие',
        difficulty: 'Легко',
      },
      {
        text: 'Что делает break в цикле?',
        type: 'choice',
        answer: 'выходит',
        options: ['выходит', 'пропускает', 'продолжает', 'перезапускает'],
        hint: 'Прерывает выполнение цикла и...',
        difficulty: 'Средне',
      },
      {
        text: 'Какой результат: list(range(1, 10, 2))?',
        type: 'choice',
        answer: '[1, 3, 5, 7, 9]',
        options: ['[1, 3, 5, 7, 9]', '[1, 2, 3, 4, 5]', '[2, 4, 6, 8]', '[0, 2, 4, 6, 8]'],
        hint: 'range(начало, конец, шаг) - шаг 2 значит пропускаем каждый второй',
        difficulty: 'Средне',
      },
      {
        text: 'Как получить длину списка [1, 2, 3, 4, 5]?',
        type: 'choice',
        answer: 'len',
        options: ['len', 'size', 'length', 'count'],
        hint: 'Функция len() возвращает...',
        difficulty: 'Легко',
      },
    ],
  }
}
