export default function Day5LogicTasks() {
  return {
    tasks: [
      {
        text: 'True and False = ?',
        answer: 'false',
        hint: 'and требует чтобы обе части были истинными',
        difficulty: 'Легко',
      },
      {
        text: 'True or False = ?',
        answer: 'true',
        hint: 'or требует чтобы хотя бы одна часть была истинной',
        difficulty: 'Легко',
      },
      {
        text: 'not True = ?',
        answer: 'false',
        hint: 'not инвертирует значение',
        difficulty: 'Легко',
      },
      {
        text: 'not False = ?',
        answer: 'true',
        hint: 'Противоположность False это...',
        difficulty: 'Легко',
      },
      {
        text: 'True and True or False = ?',
        answer: 'true',
        hint: 'Сначала and (True and True = True), потом or (True or False = True)',
        difficulty: 'Средне',
      },
      {
        text: 'Какой результат: 5 & 3 в бинарной системе?',
        answer: '1',
        hint: '5 = 101, 3 = 011, & это побитовое AND',
        difficulty: 'Сложно',
      },
      {
        text: 'Какой результат: 5 | 3 в бинарной системе?',
        answer: '7',
        hint: '5 = 101, 3 = 011, | это побитовое OR = 111 = 7',
        difficulty: 'Сложно',
      },
    ],
  }
}
