export default function Day3LoopsTasks() {
  return {
    tasks: [
      {
        text: 'Сколько раз выполнится цикл for i in range(5)?',
        answer: '5',
        hint: 'range(5) это 0, 1, 2, 3, 4 - всего 5 значений',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат: range(2, 5)?',
        answer: '2, 3, 4',
        hint: 'От 2 (включая) до 5 (не включая)',
        difficulty: 'Легко',
      },
      {
        text: 'Какой результат sum([1, 2, 3])?',
        answer: '6',
        hint: '1 + 2 + 3 = ?',
        difficulty: 'Легко',
      },
      {
        text: 'Как называется цикл который продолжается пока условие истинно?',
        answer: 'while',
        hint: 'while... условие',
        difficulty: 'Легко',
      },
      {
        text: 'Что делает break в цикле?',
        answer: 'выходит',
        hint: 'Прерывает выполнение цикла и...',
        difficulty: 'Средне',
      },
      {
        text: 'Какой результат: list(range(1, 10, 2))?',
        answer: '[1, 3, 5, 7, 9]',
        hint: 'range(начало, конец, шаг) - шаг 2 значит пропускаем каждый второй',
        difficulty: 'Средне',
      },
      {
        text: 'Как получить длину списка [1, 2, 3, 4, 5]?',
        answer: 'len',
        hint: 'Функция len() возвращает...',
        difficulty: 'Легко',
      },
    ],
  }
}
