export default function Day11GitTasks() {
  return {
    tasks: [
      {
        text: 'Какая команда инициализирует новый репозиторий?',
        type: 'choice',
        answer: 'git init',
        options: ['git init', 'git create', 'git start', 'git new'],
        hint: 'Эта команда создаёт папку .git',
        difficulty: 'Легко',
      },
      {
        text: 'Как добавить файл в staging area?',
        type: 'choice',
        answer: 'git add',
        options: ['git add', 'git stage', 'git push', 'git commit'],
        hint: 'git add [filename] или git add .',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда сохраняет изменения?',
        type: 'choice',
        answer: 'git commit',
        options: ['git commit', 'git save', 'git store', 'git push'],
        hint: 'git commit -m "сообщение"',
        difficulty: 'Легко',
      },
      {
        text: 'Как назвать копию репозитория на другом сервере?',
        type: 'choice',
        answer: 'remote',
        options: ['remote', 'origin', 'clone', 'server'],
        hint: 'Удалённый репозиторий это...',
        difficulty: 'Легко',
      },
      {
        text: 'Какая команда загружает изменения на сервер?',
        type: 'choice',
        answer: 'git push',
        options: ['git push', 'git pull', 'git send', 'git upload'],
        hint: 'Отправить (push) изменения на origin',
        difficulty: 'Средне',
      },
      {
        text: 'Какая команда скачивает изменения с сервера?',
        type: 'choice',
        answer: 'git pull',
        options: ['git pull', 'git push', 'git fetch', 'git download'],
        hint: 'Получить (pull) последние изменения',
        difficulty: 'Средне',
      },
      {
        text: 'Как создать новую ветку?',
        type: 'choice',
        answer: 'git branch',
        options: ['git branch', 'git create', 'git checkout', 'git new'],
        hint: 'git branch [branch-name]',
        difficulty: 'Средне',
      },
    ],
  }
}
