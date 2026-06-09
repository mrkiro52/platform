export default function Day9HashtablesTasks() {
  return {
    tasks: [
      {
        text: 'Какая средняя сложность поиска в хеш-таблице?',
        type: 'choice',
        answer: 'O(1)',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        hint: 'Прямой доступ по ключу это константа',
        difficulty: 'Легко',
      },
      {
        text: 'Что происходит когда два ключа дают один хеш?',
        type: 'choice',
        answer: 'коллизия',
        options: ['коллизия', 'ошибка', 'перезапись', 'игнорирование'],
        hint: 'Это называется hash collision',
        difficulty: 'Средне',
      },
      {
        text: 'Как можно разрешить коллизию в хеш-таблице?',
        type: 'choice',
        answer: 'цепочка',
        options: ['цепочка', 'удаление', 'переиндексация', 'игнорирование'],
        hint: 'Chaining - список списков, или открытая адресация',
        difficulty: 'Средне',
      },
      {
        text: 'В Python словарь это хеш-таблица?',
        type: 'choice',
        answer: 'да',
        options: ['да', 'нет', 'частично', 'зависит от версии'],
        hint: 'dict в Python основан на хеш-таблице',
        difficulty: 'Легко',
      },
      {
        text: 'Как получить значение из словаря dict["key"]?',
        type: 'choice',
        answer: 'значение',
        options: ['значение', 'ключ', 'пару ключ-значение', 'индекс'],
        hint: 'Это вернёт значение по ключу "key"',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность вставки элемента в хеш-таблицу?',
        type: 'choice',
        answer: 'O(1)',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
        hint: 'В среднем это константа',
        difficulty: 'Средне',
      },
    ],
  }
}
