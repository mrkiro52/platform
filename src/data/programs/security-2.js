// Индивидуальная программа «Информационная безопасность», глава 2 — с чего начать.
// Бывший блок «С чего начать»: площадка PortSwigger, Burp Suite, первый блок практики
// (SQL-инъекции) и порядок работы на месяц. Задание — 18 лаб по SQL-инъекциям.

export default {
  num: 2,
  title: 'С чего начать: PortSwigger и первые лабы',
  summary: 'Аккаунт на PortSwigger Web Security Academy, установка Burp Suite Community Edition, теория и 18 лаб по SQL-инъекциям, порядок работы: теория, лабы, созвон в формате полусобеседования.',
  intro: 'Практика в этой программе идёт на PortSwigger Web Security Academy: бесплатная академия с теорией и лабораториями, где уязвимости можно безопасно эксплуатировать. Эта глава — организационная: что установить, с чего начать и как мы работаем в течение месяца. Дальше каждая глава даёт теорию в конспекте и список лаб на PortSwigger.',
  sections: [
    {
      id: 'start',
      num: '2.1',
      title: 'С чего начать',
      blocks: [
        { t: 'reading', label: 'Сайт и программа', items: [
          { title: 'PortSwigger Web Security Academy — заведи аккаунт, на нём делаем лабы', url: 'https://portswigger.net/web-security' },
          { title: 'Burp Suite Community Edition — скачай и установи', url: 'https://portswigger.net/burp/communitydownload' },
        ] },
        { t: 'note', text: '**Первый блок практики — 18 лаб по SQL-инъекциям.** Читай теорию PortSwigger по порядку: она сама подсказывает, в какой момент переходить к какой лабе.' },
        { t: 'reading', label: 'SQL-инъекции', items: [
          { title: 'Теория: SQL injection', url: 'https://portswigger.net/web-security/sql-injection' },
          { title: 'Все 18 лаб по SQL-инъекциям', url: 'https://portswigger.net/web-security/all-labs#sql-injection' },
        ] },
        { t: 'h4', text: 'Как мы работаем' },
        { t: 'ol', items: [
          'Изучаешь теорию из главы ниже — главное не прочитать, а понять.',
          'Параллельно проходишь лабы на PortSwigger.',
          'Через пару дней — общий созвон в формате полусобеседования: задаём вопросы по теории, поправляем и объясняем то, что осталось непонятным.',
          'После созвона — следующий пакет теории и лаб.',
        ] },
        { t: 'small', text: 'Вопросы по Burp Suite и лабам — Глеб, @kom1ssar4ik в Telegram.' },
      ],
      terms: [
        ['PortSwigger Web Security Academy', 'бесплатная учебная площадка по веб-безопасности с теорией и лабораторными работами.'],
        ['Burp Suite', 'инструмент для тестирования веб-приложений: перехватывает и изменяет запросы между браузером и сервером.'],
        ['лаба', 'учебное уязвимое приложение, в котором нужно найти и использовать уязвимость.'],
      ],
    },
  ],
  assignment: {
    time: 'в своём темпе, около 10–15 часов',
    format: 'лабы на PortSwigger, сдавать на платформе не нужно',
    situation: [
      'Задание к главе — пройти первый блок практики: все лабы по SQL-инъекциям. Читай теорию PortSwigger по порядку: она подсказывает, когда переходить к лабе. Что осталось непонятным, разберём на созвоне.',
    ],
    parts: [
      {
        title: 'Лабы по SQL-инъекциям',
        blocks: [
          { t: 'reading', label: 'Теория и лабы', items: [
            { title: 'Теория: SQL injection', url: 'https://portswigger.net/web-security/sql-injection' },
            { title: 'Все 18 лаб по SQL-инъекциям', url: 'https://portswigger.net/web-security/all-labs#sql-injection' },
          ] },
        ],
      },
    ],
  },
}
