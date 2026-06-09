export default function Day19SqlTasks() {
  return {
    tasks: [
      {
        text: 'Что означает SQL?',
        answer: 'язык',
        hint: 'Structured Query Language - язык запросов',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда выбирает все данные?',
        answer: 'select',
        hint: 'SELECT * FROM table',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда фильтрует результаты?',
        answer: 'where',
        hint: 'WHERE условие',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда добавляет новую строку?',
        answer: 'insert',
        hint: 'INSERT INTO table VALUES...',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда обновляет данные?',
        answer: 'update',
        hint: 'UPDATE table SET...',
        difficulty: 'Средне',
      },
      {
        text: 'Какая команда удаляет строку?',
        answer: 'delete',
        hint: 'DELETE FROM table WHERE...',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое JOIN в SQL?',
        answer: 'таблиц',
        hint: 'Объединение нескольких таблиц',
        difficulty: 'Средне',
      },
    ],
  }
}
