export default function Day17TrendsTasks() {
  return {
    tasks: [
      {
        text: 'Какой главный тренд в IT 2026?',
        type: 'choice',
        answer: 'ai',
        options: ['ai', 'web3', 'blockchain', 'quantum'],
        hint: 'Искусственный интеллект доминирует во всём',
        difficulty: 'Легко',
      },
      {
        text: 'Что такое облачные вычисления?',
        type: 'choice',
        answer: 'сервер',
        options: ['сервер', 'сеть', 'память', 'процессор'],
        hint: 'Использование удалённых серверов вместо личного компьютера',
        difficulty: 'Легко',
      },
      {
        text: 'Какие облачные платформы существуют?',
        type: 'choice',
        answer: 'aws',
        options: ['aws', 'google cloud', 'azure', 'все варианты'],
        hint: 'AWS, Google Cloud, Azure - главные провайдеры',
        difficulty: 'Средне',
      },
      {
        text: 'Что такое edge computing?',
        type: 'choice',
        answer: 'граница',
        options: ['граница', 'облако', 'сеть', 'центр'],
        hint: 'Вычисления на граничных устройствах рядом с пользователем',
        difficulty: 'Средне',
      },
      {
        text: 'Какие языки программирования будут популярны в будущем?',
        type: 'choice',
        answer: 'rust',
        options: ['rust', 'go', 'python', 'все варианты'],
        hint: 'Rust, Go, Python остаются актуальными',
        difficulty: 'Средне',
      },
      {
        text: 'Что становится все более важным в разработке?',
        type: 'choice',
        answer: 'безопасность',
        options: ['безопасность', 'скорость', 'удобство', 'стоимость'],
        hint: 'Кибербезопасность и приватность данных',
        difficulty: 'Средне',
      },
    ],
  }
}
