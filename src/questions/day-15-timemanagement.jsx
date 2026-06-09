export default function Day15TimeManagementTasks() {
  return {
    tasks: [
      {
        text: 'Сколько минут в одном помидоре (Pomodoro)?',
        type: 'input',
        answer: '25',
        hint: 'Стандартный временной интервал это 25 минут',
        difficulty: 'Легко',
      },
      {
        text: 'Какой перерыв после одного помидора?',
        type: 'input',
        answer: '5',
        hint: 'Короткий перерыв это 5 минут',
        difficulty: 'Легко',
      },
      {
        text: 'Какой перерыв после 4 помидоров?',
        type: 'input',
        answer: '15',
        hint: 'Длинный перерыв это 15-30 минут',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое GTD?',
        type: 'choice',
        answer: 'система',
        options: ['система', 'метод', 'техника', 'приложение'],
        hint: 'Getting Things Done - система управления задачами',
        difficulty: 'Средне',
      },
      {
        text: 'Как приоритизировать задачи матрицей Eisenhower?',
        type: 'input',
        answer: '2',
        hint: 'По двум осям: важность и срочность',
        difficulty: 'Средне',
      },
      {
        text: 'Какая доля времени должна идти на изучение новых навыков?',
        type: 'input',
        answer: '10',
        hint: 'Примерно 10-20% вашего времени на обучение',
        difficulty: 'Средне',
      },
    ],
  }
}
