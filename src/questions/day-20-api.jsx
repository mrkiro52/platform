export default function Day20ApiTasks() {
  return {
    tasks: [
      {
        text: 'Что означает API?',
        answer: 'интерфейс',
        hint: 'Application Programming Interface',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое REST API?',
        answer: 'http',
        hint: 'API основанный на HTTP методах',
        difficulty: 'Легко',
      },
      {
        text: 'Сколько основных HTTP методов?',
        answer: '4',
        hint: 'GET, POST, PUT, DELETE',
        difficulty: 'Легко',
      },
      {
        text: 'Какой HTTP метод используется для получения данных?',
        answer: 'get',
        hint: 'GET запрос для получения информации',
        difficulty: 'Легко',
      },
      {
        text: 'Какой HTTP метод для создания данных?',
        answer: 'post',
        hint: 'POST для отправки новых данных',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое JSON?',
        answer: 'формат',
        hint: 'JavaScript Object Notation - формат данных',
        difficulty: 'Легко',
      },
      {
        text: 'Какой статус код для успешного запроса?',
        answer: '200',
        hint: '200 OK означает успех, 404 Not Found, 500 Server Error',
        difficulty: 'Средне',
      },
    ],
  }
}
