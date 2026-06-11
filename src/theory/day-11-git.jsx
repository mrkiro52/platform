import { TheoryTable, TheoryCode } from './components/TheoryTable'

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
          Git — это система контроля версий, которая отслеживает изменения в коде. Позволяет сохранять историю, откатываться назад, работать в команде и создавать отдельные ветки для новых фич.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Платформы хостинга репозиториев</h2>
        <p className="theory-intro">Git локальный, но для совместной работы используются платформы:</p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>GitHub</strong> — самая популярная, PR, Issues</li>
          <li className="theory-list-item"><strong>GitLab</strong> — открытый код, полный CI/CD</li>
          <li className="theory-list-item"><strong>Bitbucket</strong> — от Atlassian</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Интерфейсы: CLI и GUI</h2>
        <p className="theory-intro"><strong>CLI (команды в терминале)</strong> — самый мощный способ.</p>
        <p className="theory-intro"><strong>GUI (визуальные приложения)</strong> — GitHub Desktop, GitKraken, VS Code.</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Основные команды</h2>
        <TheoryCode code={`git clone URL            # Клонировать репозиторий
git init                # Инициализировать новый
git status              # Текущий статус
git add .               # Добавить файлы в staging
git commit -m "msg"     # Создать коммит
git push                # Отправить на удалённый
git pull                # Скачать обновления
git checkout -b name    # Создать и перейти на ветку
git merge name          # Объединить ветку
git log --oneline       # История коммитов
git diff                # Что изменилось`} language="bash" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Git Workflow для Junior</h2>
        <ol className="theory-list">
          <li className="theory-list-item">git pull (скачать свежий код)</li>
          <li className="theory-list-item">git checkout -b feature/name (создать свою ветку)</li>
          <li className="theory-list-item">Пишешь код и коммитишь: git add . && git commit -m "msg"</li>
          <li className="theory-list-item">git push origin feature/name (отправляешь ветку)</li>
          <li className="theory-list-item">На GitHub создаёшь Pull Request</li>
          <li className="theory-list-item">Code Review от других разработчиков</li>
          <li className="theory-list-item">После одобрения PR мержится в main</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Pull Request (PR)</h2>
        <p className="theory-intro">
          PR — способ предложить свои изменения для рассмотрения перед включением в главный код.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item">Code Review — другие смотрят твой код</li>
          <li className="theory-list-item">Обсуждение улучшений и ошибок</li>
          <li className="theory-list-item">Merge в main после одобрения</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Git это не просто инструмент — это часть культуры разработки. Каждый коммит это история. Пиши понятные коммиты и станешь хорошим разработчиком!</p>
      </section>
    </div>
  )
}
