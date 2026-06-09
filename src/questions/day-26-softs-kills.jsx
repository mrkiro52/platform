export default function Day26SoftSkillsTasks() {
  return {
    tasks: [
      {
        text: 'Что такое синдром самозванца?',
        type: 'choice',
        answer: 'чувство',
        options: ['чувство', 'болезнь', 'ошибка', 'метод'],
        hint: 'Ощущение что ты не достоин своей позиции',
        difficulty: 'Легко',
      },
      {
        text: 'Как давать конструктивный фидбек?',
        type: 'choice',
        answer: 'sbi',
        options: ['sbi', 'abc', 'xyz', 'oop'],
        hint: 'Модель SBI: Situation, Behavior, Impact',
        difficulty: 'Средне',
      },
      {
        text: 'Что делать если не понимаешь задачу?',
        type: 'choice',
        answer: 'спросить',
        options: ['спросить', 'молчать', 'гадать', 'начать кодить'],
        hint: 'Спросить (лучше спросить чем молчать)',
        difficulty: 'Легко',
      },
      {
        text: 'Как правильно просить о помощи?',
        type: 'choice',
        answer: 'объясни',
        options: ['объясни', 'просто спроси', 'жди сам', 'возьми чужой код'],
        hint: 'Объясни что уже пробовал, показывай прогресс',
        difficulty: 'Средне',
      },
      {
        text: 'Почему важны soft skills?',
        type: 'choice',
        answer: 'общение',
        options: ['общение', 'деньги', 'известность', 'успех'],
        hint: 'Для работы в команде и карьерного роста',
        difficulty: 'Легко',
      },
      {
        text: 'Что важнее - hard или soft skills?',
        type: 'choice',
        answer: 'оба',
        options: ['оба', 'hard skills', 'soft skills', 'depend'],
        hint: 'Оба одинаково важны для успеха',
        difficulty: 'Средне',
      },
    ],
  }
}
