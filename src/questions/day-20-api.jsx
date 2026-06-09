export default function Day20ApiTasks() {
  return {
    tasks: [
      {
        text: 'Что означает API?',
        type: 'choice',
        answer: 'интерфейс',
        options: ['интерфейс', 'программа', 'протокол', 'сервер'],
        hint: 'Application Programming Interface',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое REST API?',
        type: 'choice',
        answer: 'http',
        options: ['http', 'tcp', 'udp', 'websocket'],
        hint: 'API основанный на HTTP методах',
        difficulty: 'Легко',
      },
      {
        text: 'Сколько основных HTTP методов?',
        type: 'input',
        answer: '4',
        hint: 'GET, POST, PUT, DELETE',
        difficulty: 'Легко',
      },
      {
        text: 'Какой HTTP метод используется для получения данных?',
        type: 'choice',
        answer: 'get',
        options: ['get', 'post', 'put', 'delete'],
        hint: 'GET запрос для получения информации',
        difficulty: 'Легко',
      },
      {
        text: 'Какой HTTP метод для создания данных?',
        type: 'choice',
        answer: 'post',
        options: ['post', 'get', 'put', 'delete'],
        hint: 'POST для отправки новых данных',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое JSON?',
        type: 'choice',
        answer: 'формат',
        options: ['формат', 'язык', 'протокол', 'сервер'],
        hint: 'JavaScript Object Notation - формат данных',
        difficulty: 'Легко',
      },
      {
        text: 'Какой статус код для успешного запроса?',
        type: 'input',
        answer: '200',
        hint: '200 OK означает успех, 404 Not Found, 500 Server Error',
        difficulty: 'Средне',
      },
    ],
  }
}
