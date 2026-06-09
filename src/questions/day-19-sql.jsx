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
        type: 'choice',
        answer: 'select',
        options: ['select', 'from', 'where', 'insert'],
        hint: 'SELECT * FROM table',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда фильтрует результаты?',
        type: 'choice',
        answer: 'where',
        options: ['where', 'filter', 'select', 'group by'],
        hint: 'WHERE условие',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда добавляет новую строку?',
        type: 'choice',
        answer: 'insert',
        options: ['insert', 'add', 'update', 'select'],
        hint: 'INSERT INTO table VALUES...',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда обновляет данные?',
        type: 'choice',
        answer: 'update',
        options: ['update', 'insert', 'delete', 'select'],
        hint: 'UPDATE table SET...',
        difficulty: 'Средне',
      },
      {
        text: 'Какая команда удаляет строку?',
        type: 'choice',
        answer: 'delete',
        options: ['delete', 'remove', 'drop', 'truncate'],
        hint: 'DELETE FROM table WHERE...',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое JOIN в SQL?',
        type: 'choice',
        answer: 'таблиц',
        options: ['таблиц', 'строк', 'столбцов', 'базы данных'],
        hint: 'Объединение нескольких таблиц',
        difficulty: 'Средне',
      },
    ],
  }
}
