export default function Day24PatternsTasks() {
  return {
    tasks: [
      {
        text: 'Что такое sliding window?',
        type: 'choice',
        answer: 'окно',
        options: ['окно', 'указатель', 'стек', 'очередь'],
        hint: 'Техника для работы с подмассивами и подстроками',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое two pointers?',
        type: 'choice',
        answer: 'указатель',
        options: ['указатель', 'окно', 'стек', 'дерево'],
        hint: 'Два указателя которые движутся в разных направлениях',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое fast and slow pointers?',
        type: 'choice',
        answer: 'черепаха',
        options: ['черепаха', 'заяц', 'прыжок', 'шаг'],
        hint: 'Один быстрый, один медленный - поиск цикла',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое рекурсия?',
        type: 'choice',
        answer: 'функция',
        options: ['функция', 'цикл', 'алгоритм', 'метод'],
        hint: 'Функция которая вызывает саму себя',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое мемоизация?',
        type: 'choice',
        answer: 'кэш',
        options: ['кэш', 'память', 'таблица', 'список'],
        hint: 'Сохранение результатов чтобы не пересчитывать',
        difficulty: 'Средне',
      },
      {
        text: 'Для чего нужна мемоизация?',
        type: 'choice',
        answer: 'скорость',
        options: ['скорость', 'память', 'простота', 'чистота'],
        hint: 'Для оптимизации рекурсивных алгоритмов',
        difficulty: 'Средне',
      },
    ],
  }
}
