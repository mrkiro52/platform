export default function Day11GitTasks() {
  return {
    tasks: [
      {
        text: 'Какая команда инициализирует новый репозиторий?',
        answer: 'git init',
        hint: 'Эта команда создаёт папку .git',
        difficulty: 'Легко',
      },
      {
        text: 'Как добавить файл в staging area?',
        answer: 'git add',
        hint: 'git add [filename] или git add .',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда сохраняет изменения?',
        answer: 'git commit',
        hint: 'git commit -m "сообщение"',
        difficulty: 'Легко',
      },
      {
        text: 'Как назвать копию репозитория на другом сервере?',
        answer: 'remote',
        hint: 'Удалённый репозиторий это...',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда загружает изменения на сервер?',
        answer: 'git push',
        hint: 'Отправить (push) изменения на origin',
        difficulty: 'Средне',
      },
      {
        text: 'Какая команда скачивает изменения с сервера?',
        answer: 'git pull',
        hint: 'Получить (pull) последние изменения',
        difficulty: 'Средне',
      },
      {
        text: 'Как создать новую ветку?',
        answer: 'git branch',
        hint: 'git branch [branch-name]',
        difficulty: 'Средне',
      },
    ],
  }
}
