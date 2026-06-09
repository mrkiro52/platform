export default function Day25SecurityTasks() {
  return {
    tasks: [
      {
        text: 'Что такое SQL инъекция?',
        type: 'choice',
        answer: 'атака',
        options: ['атака', 'запрос', 'команда', 'ошибка'],
        hint: 'Атака через введение вредоносного SQL кода',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое XSS?',
        type: 'choice',
        answer: 'скрипт',
        options: ['скрипт', 'запрос', 'команда', 'атака'],
        hint: 'Cross-Site Scripting - вставка вредоносного скрипта',
        difficulty: 'Средне',
      },
      {
        text: 'Как защитить от SQL инъекций?',
        type: 'choice',
        answer: 'параметры',
        options: ['параметры', 'фильтры', 'проверки', 'логирование'],
        hint: 'Параметризованные запросы или prepared statements',
        difficulty: 'Средне',
      },
      {
        text: 'Как защитить от XSS?',
        type: 'choice',
        answer: 'экранировать',
        options: ['экранировать', 'удалить', 'заменить', 'скрыть'],
        hint: 'Экранировать (escape) HTML символы',
        difficulty: 'Средне',
      },
      {
        text: 'Какой алгоритм использовать для хеша паролей?',
        type: 'choice',
        answer: 'bcrypt',
        options: ['bcrypt', 'md5', 'sha1', 'sha256'],
        hint: 'bcrypt, argon2 - специальные алгоритмы для паролей',
        difficulty: 'Средне',
      },
      {
        text: 'Всегда ли нужен HTTPS?',
        type: 'choice',
        answer: 'да',
        options: ['да', 'нет', 'иногда', 'только для данных'],
        hint: 'Шифрование обязательно в production',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое OWASP Top 10?',
        type: 'choice',
        answer: 'уязвимости',
        options: ['уязвимости', 'угрозы', 'риски', 'методы'],
        hint: 'Список 10 самых опасных уязвимостей',
        difficulty: 'Средне',
      },
    ],
  }
}
