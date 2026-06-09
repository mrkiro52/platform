export default function Day25SecurityTasks() {
  return {
    tasks: [
      {
        text: 'Что такое SQL инъекция?',
        answer: 'атака',
        hint: 'Атака через введение вредоносного SQL кода',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое XSS?',
        answer: 'скрипт',
        hint: 'Cross-Site Scripting - вставка вредоносного скрипта',
        difficulty: 'Средне',
      },
      {
        text: 'Как защитить от SQL инъекций?',
        answer: 'параметры',
        hint: 'Параметризованные запросы или prepared statements',
        difficulty: 'Средне',
      },
      {
        text: 'Как защитить от XSS?',
        answer: 'экранировать',
        hint: 'Экранировать (escape) HTML символы',
        difficulty: 'Средне',
      },
      {
        text: 'Какой алгоритм использовать для хеша паролей?',
        answer: 'bcrypt',
        hint: 'bcrypt, argon2 - специальные алгоритмы для паролей',
        difficulty: 'Средне',
      },
      {
        text: 'Всегда ли нужен HTTPS?',
        answer: 'да',
        hint: 'Шифрование обязательно в production',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое OWASP Top 10?',
        answer: 'уязвимости',
        hint: 'Список 10 самых опасных уязвимостей',
        difficulty: 'Средне',
      },
    ],
  }
}
