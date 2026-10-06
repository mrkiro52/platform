import { TheoryTable, TheoryCode } from './components/TheoryTable'

export default function Day11GitTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Git: версионирование и командная работа</h1>
        <p>
          Git — система контроля версий: она хранит всю историю изменений проекта, позволяет вернуться к любой версии и работать над кодом командой, не мешая друг другу. Без Git сегодня не обходится ни одна команда разработки — это первый инструмент, который спрашивают у junior-специалиста.
        </p>
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

      <section className="theory-section">
        <h2 className="theory-heading-2">Как Git хранит изменения: три зоны</h2>
        <p>
          Чтобы команды Git перестали казаться магией, достаточно понять, что у каждого файла есть три возможных
          состояния. Git не следит за файлами сам — ты явно говоришь ему, какие изменения сохранить.
        </p>
        <TheoryTable
          headers={['Зона', 'Что это', 'Как попасть']}
          rows={[
            ['Рабочая директория (working tree)', 'Файлы на диске, которые ты сейчас редактируешь', 'Просто изменить файл'],
            ['Индекс (staging area)', 'Черновик следующего коммита: что именно войдёт в снимок', 'git add <файл>'],
            ['Репозиторий (.git)', 'История коммитов — неизменяемые снимки проекта', 'git commit'],
          ]}
        />
        <p>
          <strong>Коммит</strong> — это снимок всего проекта в момент времени плюс автор, дата, сообщение и ссылка на
          предыдущий коммит. Каждый коммит получает уникальный хэш (например, <code>a1b2c3d</code>), по которому к
          нему можно вернуться. Коммиты связаны в цепочку — так получается история.
        </p>
        <TheoryCode language="bash" code={`git status              # что изменено, что в индексе
git diff                # изменения, которые ещё не добавлены в индекс
git diff --staged       # изменения, которые войдут в коммит
git add main.py         # добавить файл в индекс
git add -p              # добавить изменения по кусочкам (очень полезно)
git commit -m "Добавить валидацию email"
git log --oneline --graph   # история коммитов компактно, с ветками`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Первая настройка и новый проект</h2>
        <TheoryCode language="bash" code={`# один раз на компьютере
git config --global user.name "Иван Иванов"
git config --global user.email "ivan@example.com"
git config --global init.defaultBranch main

# новый проект
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:username/project.git
git push -u origin main

# или взять существующий
git clone git@github.com:username/project.git`} />
        <h3 className="theory-heading-3">Файл .gitignore</h3>
        <p>
          В репозиторий не должны попадать зависимости, артефакты сборки, локальные настройки и секреты. Их
          перечисляют в файле <code>.gitignore</code> в корне проекта:
        </p>
        <TheoryCode language="bash" code={`node_modules/
__pycache__/
.venv/
dist/
.env          # пароли и ключи API — никогда не коммить
.DS_Store
*.log`} />
        <p className="theory-highlight">
          Если секрет (пароль, токен, ключ) уже попал в коммит и был отправлен на GitHub, удаления файла
          недостаточно — он остался в истории. Секрет нужно сразу перевыпустить (сменить пароль, отозвать токен).
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ветки</h2>
        <p>
          Ветка — это просто подвижный указатель на коммит. Ветки позволяют работать над задачей изолированно:
          основная ветка <code>main</code> остаётся рабочей, а эксперименты живут отдельно.
        </p>
        <TheoryCode language="bash" code={`git branch                    # список веток
git switch -c feature/login   # создать ветку и перейти в неё
git switch main               # переключиться обратно
git branch -d feature/login   # удалить ветку после слияния`} />
        <h3 className="theory-heading-3">Merge и rebase</h3>
        <p>
          Когда задача готова, изменения из ветки нужно перенести в основную. Есть два способа:
        </p>
        <TheoryTable
          headers={['', 'git merge', 'git rebase']}
          rows={[
            ['Что делает', 'Создаёт коммит слияния, соединяющий две истории', 'Переносит твои коммиты поверх свежей основной ветки'],
            ['История', 'Сохраняется как была, с «развилками»', 'Линейная, как будто работа шла последовательно'],
            ['Риск', 'Минимальный', 'Переписывает коммиты: нельзя делать для веток, которые уже используют другие'],
            ['Когда', 'Слияние в main, общие ветки', 'Обновить свою ветку перед Pull Request'],
          ]}
        />
        <TheoryCode language="bash" code={`# обновить свою ветку свежим main
git switch feature/login
git fetch origin
git rebase origin/main      # или: git merge origin/main`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Конфликты слияния</h2>
        <p>
          Конфликт возникает, когда две ветки изменили одни и те же строки, и Git не может сам решить, какой
          вариант правильный. Это нормальная рабочая ситуация, а не ошибка. Git помечает спорное место в файле:
        </p>
        <TheoryCode language="python" code={`<<<<<<< HEAD
TIMEOUT = 30
=======
TIMEOUT = 60
>>>>>>> feature/slow-network`} />
        <ol className="theory-steps">
          <li>Открой файл и реши, какой вариант нужен (или объедини оба).</li>
          <li>Удали служебные строки <code>{'<<<<<<<'}</code>, <code>=======</code>, <code>{'>>>>>>>'}</code>.</li>
          <li>Проверь, что код запускается и тесты проходят.</li>
          <li><code>git add файл</code>, затем <code>git commit</code> (при merge) или <code>git rebase --continue</code> (при rebase).</li>
        </ol>
        <p>
          Чтобы конфликтов было меньше: делай небольшие ветки, чаще подтягивай свежий <code>main</code> и не
          форматируй весь файл в одной задаче с логическими изменениями.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как отменить изменения</h2>
        <TheoryTable
          headers={['Ситуация', 'Команда']}
          rows={[
            ['Отменить правки в файле до коммита', 'git restore file.py'],
            ['Убрать файл из индекса, оставив правки', 'git restore --staged file.py'],
            ['Исправить сообщение или содержимое последнего коммита', 'git commit --amend'],
            ['Отменить коммит, который уже отправлен на GitHub', 'git revert <хэш> — создаёт обратный коммит'],
            ['Откатить локальные коммиты (ещё не отправлены)', 'git reset --soft HEAD~1 — правки останутся'],
            ['Временно спрятать незаконченную работу', 'git stash, потом git stash pop'],
          ]}
        />
        <p className="theory-highlight">
          <code>git reset --hard</code> и <code>git push --force</code> безвозвратно стирают изменения. В общих
          ветках вместо них используй <code>git revert</code>, а если всё же нужен force-push в свою ветку —
          <code> git push --force-with-lease</code>: он не затрёт чужие коммиты.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Хорошие коммиты</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Один коммит — одно логическое изменение.</strong> Исправление бага и переименование переменных по всему проекту — это два коммита.</li>
          <li className="theory-list-item"><strong>Сообщение в повелительном наклонении</strong>, отвечает на вопрос «что сделает этот коммит»: «Добавить проверку пароля», а не «правки» или «fix».</li>
          <li className="theory-list-item"><strong>Не коммить сломанный код</strong> в общие ветки: перед коммитом запусти программу и тесты.</li>
          <li className="theory-list-item">Многие команды используют <strong>Conventional Commits</strong>: префикс типа изменения.</li>
        </ul>
        <TheoryCode language="bash" code={`feat: добавить экспорт отчёта в CSV
fix: исправить падение при пустом списке заказов
refactor: вынести валидацию в отдельный модуль
docs: описать запуск проекта в README
test: покрыть тестами расчёт скидки`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Code review: как проходить и как делать</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Маленькие PR</strong> (до 300–400 строк) ревьюят быстрее и внимательнее.</li>
          <li className="theory-list-item"><strong>Описание PR:</strong> что сделано, зачем, как проверить, скриншоты для UI-изменений.</li>
          <li className="theory-list-item"><strong>Сначала посмотри свой diff сам</strong> — половину замечаний найдёшь до ревьюера.</li>
          <li className="theory-list-item"><strong>Комментарии к коду, а не к человеку:</strong> «здесь может быть деление на ноль», а не «ты ошибся».</li>
          <li className="theory-list-item"><strong>Замечание — не приказ:</strong> если не согласен, аргументируй. Цель ревью — хороший код, а не победа в споре.</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Частые ошибки новичков</h2>
        <TheoryTable
          headers={['Ошибка', 'Как правильно']}
          rows={[
            ['Работать прямо в main', 'Каждая задача — в своей ветке'],
            ['git add . не глядя', 'Сначала git status и git diff, затем добавлять осознанно'],
            ['Коммитить .env, node_modules, venv', 'Настроить .gitignore в первом же коммите'],
            ['Один огромный коммит за неделю', 'Коммитить часто, небольшими логическими шагами'],
            ['Бояться конфликтов', 'Регулярно подтягивать main и решать конфликты сразу'],
          ]}
        />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Git это не просто инструмент — это часть культуры разработки. Каждый коммит это история. Пиши понятные коммиты и станешь хорошим разработчиком!</p>
      </section>
    </div>
  )
}
