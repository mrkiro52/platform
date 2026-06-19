export default function Day17TrendsTasks() {
  return {
    tasks: [
      {
        text: 'Какая SQL-команда используется для выборки данных из таблицы?',
        type: 'choice',
        answer: 'SELECT',
        options: ['SELECT', 'GET', 'FETCH', 'FIND'],
        hint: 'SELECT * FROM users — выбрать все строки',
        difficulty: 'Легко',
      },
      {
        text: 'Какое ключевое слово фильтрует строки по условию в SQL?',
        type: 'choice',
        answer: 'WHERE',
        options: ['WHERE', 'FILTER', 'HAVING', 'WHEN'],
        hint: 'SELECT * FROM users WHERE age > 18',
        difficulty: 'Легко',
      },
      {
        text: 'Какой оператор SQL проверяет вхождение значения в список?',
        type: 'choice',
        answer: 'IN',
        options: ['IN', 'HAS', 'CONTAINS', 'EXISTS'],
        hint: "WHERE city IN ('Москва', 'Сочи')",
        difficulty: 'Средне',
      },
      {
        text: "Что выберет запрос: SELECT DISTINCT city FROM users?",
        type: 'choice',
        answer: 'Уникальные города без повторений',
        options: ['Уникальные города без повторений', 'Все города включая дубли', 'Только первый город', 'Количество городов'],
        hint: 'DISTINCT убирает дубликаты из результата',
        difficulty: 'Средне',
      },
      {
        text: 'Что означает символ % в операторе LIKE?',
        type: 'choice',
        answer: 'Любое количество любых символов',
        options: ['Любое количество любых символов', 'Ровно один любой символ', 'Только цифры', 'Конец строки'],
        hint: "LIKE 'А%' — имена начинающиеся на А (любое продолжение)",
        difficulty: 'Средне',
      },
      {
        text: 'Какое ключевое слово ограничивает число строк в результате запроса?',
        type: 'choice',
        answer: 'LIMIT',
        options: ['LIMIT', 'TOP', 'MAX', 'ROWCOUNT'],
        hint: 'ORDER BY age DESC LIMIT 3 — топ-3 самых старших',
        difficulty: 'Легко',
      },
      {
        text: 'Что означает ASC в ORDER BY age ASC?',
        type: 'choice',
        answer: 'Сортировка по возрастанию (от меньшего к большему)',
        options: ['Сортировка по возрастанию (от меньшего к большему)', 'Сортировка по убыванию', 'Ascending count — подсчёт', 'Это значение по умолчанию, ASC можно не писать'],
        hint: 'ASC = ascending. По умолчанию ORDER BY сортирует именно так.',
        difficulty: 'Средне',
      },
    ],
  }
}
