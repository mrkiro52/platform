export default function Day9HashtablesTasks() {
  return {
    tasks: [
      {
        text: 'Какая средняя сложность поиска в хеш-таблице?',
        answer: 'O(1)',
        hint: 'Прямой доступ по ключу это константа',
        difficulty: 'Легко',
      },
      {
        text: 'Что происходит когда два ключа дают один хеш?',
        answer: 'коллизия',
        hint: 'Это называется hash collision',
        difficulty: 'Средне',
      },
      {
        text: 'Как можно разрешить коллизию в хеш-таблице?',
        answer: 'цепочка',
        hint: 'Chaining - список списков, или открытая адресация',
        difficulty: 'Средне',
      },
      {
        text: 'В Python словарь это хеш-таблица?',
        answer: 'да',
        hint: 'dict в Python основан на хеш-таблице',
        difficulty: 'Легко',
      },
      {
        text: 'Как получить значение из словаря dict["key"]?',
        answer: 'значение',
        hint: 'Это вернёт значение по ключу "key"',
        difficulty: 'Легко',
      },
      {
        text: 'Какая сложность вставки элемента в хеш-таблицу?',
        answer: 'O(1)',
        hint: 'В среднем это константа',
        difficulty: 'Средне',
      },
    ],
  }
}
