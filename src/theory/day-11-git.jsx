import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day11GitTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 11</h1>
        <p className="theory-subtitle">Git: версионирование и командная работа</p>
        <p className="theory-date">11 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое Git?</h2>
        <p className="theory-intro">
          Git — это система контроля версий, которая отслеживает изменения в коде. Позволяет откатываться на старые версии, работать в команде и сливать код разных разработчиков.
        </p>

        <TheoryExample title="Без Git">
          <ul>
            <li>Сохраняешь файлы как: code.py, code_v2.py, code_final.py, code_FINAL.py 😱</li>
            <li>Не знаешь, кто изменил что и когда</li>
            <li>Невозможно откатиться на старую версию</li>
            <li>Команде сложно работать вместе</li>
          </ul>
        </TheoryExample>

        <TheoryExample title="С Git">
          <ul>
            <li>Один файл code.py, всё сохраняется в истории</li>
            <li>Видишь каждое изменение с комментарием (commit)</li>
            <li>Легко откатиться на любую версию</li>
            <li>Множество разработчиков могут работать одновременно</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Основные команды Git</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Первичная настройка</h3>
          <TheoryCode code={`# Скажи Git кто ты
git config --global user.name "Иван"
git config --global user.email "ivan@example.com"

# Создай новый репозиторий
git init

# Или клонируй существующий
git clone https://github.com/user/repo.git`} language="bash" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Основной рабочий цикл</h3>
          <TheoryCode code={`# 1. Посмотри что изменилось
git status

# 2. Добавь файлы в staging area
git add file.py
git add .  # Добавить ВСЕ изменения

# 3. Создай commit (сохраниение)
git commit -m "Исправлена ошибка в функции add()"

# 4. Загрузи на сервер (GitHub)
git push

# 5. Получи изменения с сервера
git pull`} language="bash" />
        </div>

        <TheoryTable
          headers={['Команда', 'Что делает', 'Пример']}
          rows={[
            ['status', 'Показать что изменилось', 'git status'],
            ['add', 'Добавить файл в staging', 'git add main.py'],
            ['commit', 'Сохранить изменения', 'git commit -m "текст"'],
            ['push', 'Загрузить на сервер', 'git push'],
            ['pull', 'Скачать с сервера', 'git pull'],
            ['log', 'История коммитов', 'git log'],
            ['checkout', 'Переключиться на версию', 'git checkout main'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ветки (Branches)</h2>
        <p className="theory-intro">
          Ветка — это независимая линия разработки. Основная ветка main, но можно создавать новые для новых фич.
        </p>

        <TheoryCode code={`# Посмотри все ветки
git branch

# Создай новую ветку
git branch feature/new-login

# Переключись на ветку
git checkout feature/new-login

# Или одной командой
git checkout -b feature/new-login

# Сделай изменения, коммиты...
git add .
git commit -m "Добавлена форма входа"

# Вернись на main
git checkout main

# Слей ветку обратно в main
git merge feature/new-login

# Удали ветку
git branch -d feature/new-login`} language="bash" />

        <TheoryExample title="Рабочий процесс">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Создаёшь ветку для новой фичи (feature/login)</li>
            <li>Разрабатываешь в этой ветке</li>
            <li>Создаёшь pull request на GitHub</li>
            <li>Команда смотрит код (code review)</li>
            <li>Одобряют и мержат в main</li>
          </ol>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Конфликты слияния</h2>
        <p className="theory-intro">
          Когда две ветки меняют одну и ту же строку — конфликт. Git просит вручную выбрать какой код оставить.
        </p>

        <TheoryCode code={`# Попытка слить ветку
git merge feature/login

# Конфликт! Git покажет:
<<<<<<< HEAD
print("Добро пожаловать!")  # Текущая ветка (main)
=======
print("Привет!")  # Ветка feature/login
>>>>>>> feature/login

# Отредактируй вручную - оставь нужный вариант:
print("Добро пожаловать!")

# Добавь файл и коммитни
git add .
git commit -m "Разрешил конфликт слияния"`} language="bash" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GitHub и Remote</h2>
        <p className="theory-intro">
          GitHub — хостинг для Git репозиториев. "remote" — версия вашего кода на сервере.
        </p>

        <TheoryCode code={`# Посмотри где хранится remote код
git remote -v

# Добавь remote (обычно GitHub делает автоматом)
git remote add origin https://github.com/user/repo.git

# Загрузи все коммиты на GitHub
git push origin main

# Скачай изменения с GitHub
git pull origin main

# Первый раз push новой ветки
git push -u origin feature/login`} language="bash" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Git Flow — стандартный рабочий процесс</h2>

        <TheoryTable
          headers={['Ветка', 'Для чего', 'Кем используется']}
          rows={[
            ['main (master)', 'Рабочий код в production', 'Все'],
            ['develop', 'Разработка, нестабильный', 'Разработчики'],
            ['feature/*', 'Новая фича', 'Один разработчик'],
            ['hotfix/*', 'Критичная ошибка в production', 'Для срочного фикса'],
            ['release/*', 'Подготовка к релизу', 'Перед выпуском'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Хорошие привычки</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Коммитьте часто, маленькими порциями (не сразу всё)</li>
          <li className="theory-list-item">Пишите понятные сообщения коммитов (не "fix" и не "asdf")</li>
          <li className="theory-list-item">Не коммитьте .env файлы, пароли, временные файлы</li>
          <li className="theory-list-item">Перед push убедись что код работает</li>
          <li className="theory-list-item">Создавай ветки для каждой фичи</li>
        </ul>

        <TheoryExample title="Хороший коммит">
          <p>git commit -m "Добавлена функция авторизации через email"</p>
        </TheoryExample>

        <TheoryExample title="Плохой коммит">
          <p>git commit -m "fix" или git commit -m "asdf"</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Откат изменений</h2>
        <TheoryCode code={`# Отмени последний коммит (но сохрани изменения)
git reset --soft HEAD~1

# Отмени последний коммит и изменения
git reset --hard HEAD~1

# Отмени конкретный коммит
git revert <commit-hash>

# Вернись на старую версию (на чтение)
git checkout <commit-hash>`} language="bash" />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Git — суперсила разработчика! Без него - никуда! 🚀</p>
      </section>
    </div>
  )
}
