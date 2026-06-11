import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day12AiToolsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 12</h1>
        <p className="theory-subtitle">ИИ-инструменты разработчика</p>
        <p className="theory-date">12 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как работают LLM?</h2>
        <p className="theory-intro">
          LLM (Large Language Model) — большая языковая модель. Это нейросеть, обученная на миллиардах слов из интернета. Модель предсказывает следующее слово на основе контекста, вычисляя вероятности для тысяч возможных вариантов.
        </p>

        <TheoryExample title="Упрощённо: как модель думает">
          <p><strong>Ты:</strong> "Напиши функцию, которая сортирует"</p>
          <p><strong>Модель внутренне:</strong></p>
          <p>• Анализирует контекст: "функция", "сортирует" → скорее всего массив</p>
          <p>• Проверяет статистику обучения: как обычно пишут сортировку</p>
          <p>• Вычисляет вероятности: Python (60%), JavaScript (30%), Java (10%)</p>
          <p>• Выбирает наиболее вероятный ответ</p>
        </TheoryExample>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Основные параметры LLM</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Токены</strong> — куски текста (примерно 1 токен = 4 символа). При работе с Claude API нужно знать: входные токены дешевле, выходные дороже</li>
            <li className="theory-list-item"><strong>Контекстное окно</strong> — сколько токенов модель может обработать одновременно. Claude 3.5 Sonnet: 200k входных, может вывести до 4k. Это целая книга!</li>
            <li className="theory-list-item"><strong>Температура</strong> — 0 = всегда выбирает самый вероятный ответ (логичный), 1 = выбирает случайно (творческий). Для кода используй 0-0.3, для идей 0.7-1</li>
            <li className="theory-list-item"><strong>Max tokens</strong> — максимальная длина ответа. Ограничивает стоимость</li>
            <li className="theory-list-item"><strong>Top-p</strong> — выбирает из верхних N% вероятных вариантов (альтернатива температуре)</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Модели Claude: какую использовать?</h2>
        <p className="theory-intro">
          Claude выпускает несколько версий модели. Каждая имеет разные характеристики, цену и скорость.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Claude 3.5 Sonnet (Рекомендуется 🚀)</h3>
          <ul className="theory-list">
            <li className="theory-list-item">🏆 Лучшее соотношение цена/производительность</li>
            <li className="theory-list-item">💪 Отличное для программирования (анализ кода, рефакторинг, исправление ошибок)</li>
            <li className="theory-list-item">⚡ Быстрая (2x быстрее чем Opus)</li>
            <li className="theory-list-item">📚 200k контекстное окно = целые проекты можно скармливать</li>
            <li className="theory-list-item">💰 Средняя цена</li>
            <li className="theory-list-item">✅ Лучше всего для ежедневной разработки</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Claude 3 Opus</h3>
          <ul className="theory-list">
            <li className="theory-list-item">🧠 Самая "умная" модель (чуть лучше в сложной логике)</li>
            <li className="theory-list-item">⏱️ Медленнее чем Sonnet</li>
            <li className="theory-list-item">💰 Дороже</li>
            <li className="theory-list-item">📚 200k контекст</li>
            <li className="theory-list-item">✅ Для очень сложных задач, когда нужна максимальная точность</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Claude 3 Haiku</h3>
          <ul className="theory-list">
            <li className="theory-list-item">⚡ Самая быстрая</li>
            <li className="theory-list-item">💰 Самая дешёвая (в 10x раз дешевле Sonnet)</li>
            <li className="theory-list-item">🧠 Менее умная, но достаточна для простых задач</li>
            <li className="theory-list-item">📚 100k контекст</li>
            <li className="theory-list-item">✅ Для быстрых ответов и прототипирования</li>
          </ul>
        </div>

        <TheoryExample title="Таблица сравнения">
          <TheoryTable
            headers={['Модель', 'Разум', 'Скорость', 'Цена', 'Контекст', 'Лучше всего для']}
            rows={[
              ['Claude 3.5 Sonnet', '⭐⭐⭐⭐', '⚡⚡⚡⚡⚡', '💰💰', '200k', 'Разработка (ВЫБЕРИ ЭТО)'],
              ['Claude 3 Opus', '⭐⭐⭐⭐⭐', '⚡⚡⚡', '💰💰💰💰', '200k', 'Очень сложные задачи'],
              ['Claude 3 Haiku', '⭐⭐⭐', '⚡⚡⚡⚡⚡', '💰', '100k', 'Быстрые ответы'],
            ]}
          />
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Искусство писать промпты (Prompt Engineering)</h2>
        <p className="theory-intro">
          Промпт — это твой запрос к ИИ. От качества промпта на 80% зависит качество ответа. Это настоящее искусство! Вот как писать хорошие промпты.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">❌ Плохой промпт vs ✅ Хороший промпт</h3>

          <TheoryExample title="Пример 1: Простая задача">
            <p><strong>❌ Плохо:</strong> "Напиши код"</p>
            <p><strong>✅ Хорошо:</strong> "Напиши функцию на Python, которая проверяет, является ли число простым. Входной параметр: целое число n. Выходной параметр: True если простое, False иначе. Используй эффективный алгоритм O(√n)"</p>
          </TheoryExample>

          <TheoryExample title="Пример 2: Анализ кода">
            <p><strong>❌ Плохо:</strong> "Почему это не работает?"</p>
            <p><strong>✅ Хорошо:</strong> "Вот мой код: [код]. Ошибка: TypeError: NoneType. Я ожидаю, что функция должна вернуть список. Объясни, в чём проблема, и покажи исправленный вариант"</p>
          </TheoryExample>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">📋 Структура хорошего промпта</h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8' }}>
            <li><strong>Контекст:</strong> Для чего это нужно? Кто будет использовать?</li>
            <li><strong>Задача:</strong> Что ровно нужно сделать? (Глагол: напиши, объясни, исправь)</li>
            <li><strong>Детали:</strong> Язык программирования? Формат? Требования?</li>
            <li><strong>Примеры:</strong> Показать примеры входа/выхода</li>
            <li><strong>Ограничения:</strong> Не использовать библиотеки? О(n) или меньше?</li>
            <li><strong>Формат ответа:</strong> Только код? С объяснением? С комментариями?</li>
          </ol>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🎯 Техника: Chain of Thought (думай пошагово)</h3>
          <p className="theory-intro">Явно попроси ИИ думать пошагово для сложных задач:</p>
          <TheoryCode code={`❌ Плохо:
"Реши задачу с массивом"

✅ Хорошо:
"Решение: тебе нужно найти два числа в массиве, которые в сумме дают target.
Сначала объясни алгоритм (что будет твой подход?), потом напиши код.
Покажи пример для массива [2, 7, 11, 15], target = 9"`} />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">📚 Техника: Few-shot Learning (показывай примеры)</h3>
          <p className="theory-intro">Приведи примеры ПЕРЕД основным вопросом:</p>
          <TheoryCode code={`Перевод названий переменных из camelCase в snake_case:

userName → user_name
getUserId → get_user_id
isActive → is_active

Теперь переведи эти (используй тот же паттерн):
myAwesomeVariable → ?
totalCount → ?
calculateHashValue → ?`} />
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Нейросеть видит примеры и легче понимает паттерн!</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🎭 Техника: Role-based prompting (задай роль)</h3>
          <TheoryCode code={`✅ Хороший промпт:
"Ты опытный разработчик Python с 10 лет опыта.
Напиши код для валидации email адреса.
Используй лучшие практики и обработку исключений.
Добавь типизацию (type hints)."`} />
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>Указание роли + опыта часто улучшает качество!</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Контекст: самое важное правило</h2>
        <p className="theory-intro">
          Чем больше контекста ты даешь ИИ, тем лучше ответ. Claude может "помнить" 200k токенов (целую книгу!), используй это!
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">1️⃣ Указывай файлы и папки для работы</h3>
          <TheoryCode code={`✅ Хорошо:
"Я использую инструмент Claude Code.
Давай вместе работать с проектом React.
Файлы находятся в src/components/

Основной файл: src/components/Button.jsx
Стили: src/styles/button.css

Сделай Button более доступным (accessibility)"

ИИ может читать файлы и редактировать их прямо!`} />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">2️⃣ Давай информацию о структуре проекта</h3>
          <TheoryCode code={`✅ Полезно сказать:
"У меня есть структура:
- src/
  - pages/
  - components/
  - utils/
  - styles/
- backend/
  - api.js
  - db.js

Я хочу добавить функцию аутентификации.
Какие файлы нужно изменить?"` } />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">3️⃣ Скармливай весь релевантный код</h3>
          <TheoryCode code={`✅ Вместо:
"Почему ошибка?"

Напиши:
"У меня есть функция:

\`\`\`python
def calculate_sum(arr):
    total = 0
    for num in arr
        total += num
    return total
\`\`\`

Ошибка: SyntaxError на строке 4. Помоги найти"` } />
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>ИИ видит точную проблему (пропущен двоеточие)!</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Инструкции в формате .md файла (Промпт как файл)</h2>
        <p className="theory-intro">
          Для больших проектов создай файл CLAUDE.md или INSTRUCTIONS.md, который опишет:
        </p>

        <TheoryCode code={`# Инструкции для ИИ помощника

## О проекте
- Это веб-приложение для планирования задач (React + Node.js)
- Используем ESLint для стиля кода
- Все компоненты должны быть функциональные (Hooks)

## Файловая структура
- src/components/  ← переиспользуемые компоненты
- src/pages/       ← страницы приложения
- src/utils/       ← вспомогательные функции
- backend/api.js   ← API endpoints

## Правила кода
✅ ДЕЛАЙ: Используй React Hooks, типизируй с PropTypes
❌ НЕ ДЕЛАЙ: Class components, глобальные переменные

## Примеры хороших компонентов
[Вставь примеры]

## Как запустить
npm install && npm start`} />

        <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
          Если такой файл есть в проекте, ИИ его найдет и будет следовать правилам!
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Технические указания для точных результатов</h2>
        <p className="theory-intro">
          Чем точнее указания, тем лучше результат.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Ограничения (помогают фокусироваться)</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Язык:</strong> "Только Python 3.9+, без numpy"</li>
            <li className="theory-list-item"><strong>Размер:</strong> "Функция не более 20 строк"</li>
            <li className="theory-list-item"><strong>Сложность:</strong> "O(n) временная сложность, максимум"</li>
            <li className="theory-list-item"><strong>Стиль:</strong> "В стиле Google, с docstrings"</li>
            <li className="theory-list-item"><strong>Зависимости:</strong> "Используй только встроенные модули"</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Формат ответа (скажи как именно ты хочешь ответ)</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Структура:</strong> "Дай сначала объяснение, потом код, потом примеры"</li>
            <li className="theory-list-item"><strong>Язык:</strong> "На русском / на английском"</li>
            <li className="theory-list-item"><strong>Детальность:</strong> "Краткий ответ / подробный с объяснением каждой строки"</li>
            <li className="theory-list-item"><strong>Комментарии:</strong> "Без комментариев / с комментариями на каждом шаге"</li>
          </ul>
        </div>

        <TheoryExample title="Полный пример хорошего промпта">
          <p><strong>Контекст:</strong> "Работаю над веб-приложением на React"</p>
          <p><strong>Задача:</strong> "Напиши компонент Button"</p>
          <p><strong>Требования:</strong></p>
          <p>• Функциональный компонент с Hooks</p>
          <p>• Props: text, onClick, disabled, variant (primary/secondary)</p>
          <p>• Использует CSS модули (не inline styles)</p>
          <p>• Должен быть доступен (accessibility)</p>
          <p><strong>Формат:</strong> "Код + пример использования + PropTypes"</p>
          <p><strong>Ограничение:</strong> "Не более 50 строк, чистый код без лишнего"</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GitHub Copilot</h2>
        <p className="theory-intro">
          Расширение в IDE, которое автодополняет код во время печати. Работает как автозаполнение на телефоне, но для кода.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Как это работает</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Смотрит на контекст: названия переменных, функций, импорты</li>
            <li className="theory-list-item">Предлагает код на основе миллионов примеров с GitHub</li>
            <li className="theory-list-item">Работает в VS Code, JetBrains IDE, Neovim</li>
            <li className="theory-list-item">Платно: $10/месяц (но бесплатно для студентов и open-source разработчиков)</li>
          </ul>
        </div>

        <TheoryExample title="Как писать, чтобы Copilot помог">
          <p><strong>❌ Плохо:</strong></p>
          <p>def f(a, b):</p>
          <p><strong>✅ Хорошо:</strong></p>
          <p>def validate_email_address(email: str) -> bool:</p>
          <p>    # проверяет что email содержит @</p>
          <p style={{ marginTop: '8px' }}>Copilot видит название + комментарий и предложит нужную функцию!</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Claude Code: IDE расширение</h2>
        <p className="theory-intro">
          Самое мощное: Claudeде может читать и редактировать файлы прямо в твоём проекте. Используй это максимально!
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Что он может делать</h3>
          <ul className="theory-list">
            <li className="theory-list-item">📖 <strong>Читать файлы:</strong> "Покажи мне файл Button.jsx"</li>
            <li className="theory-list-item">✏️ <strong>Редактировать файлы:</strong> Автоматически изменяет и сохраняет</li>
            <li className="theory-list-item">🔍 <strong>Поиск:</strong> "Найди все функции которые проверяют email"</li>
            <li className="theory-list-item">🔧 <strong>Рефакторинг:</strong> "Переведи этот компонент на Hooks"</li>
            <li className="theory-list-item">🐛 <strong>Исправление ошибок:</strong> Видит error и исправляет</li>
            <li className="theory-list-item">🧪 <strong>Написание тестов:</strong> Генерирует unit tests</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Как использовать эффективно</h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8' }}>
            <li>Скажи "Показать мне файл [путь]" чтобы ИИ прочитал файл</li>
            <li>После того как ИИ прочитал контекст, пиши запросы: "Рефакторь этот компонент"</li>
            <li>ИИ видит ошибки в терминале и может их исправлять автоматически</li>
            <li>Для больших задач - скажи ИИ про всю структуру папки</li>
          </ol>
        </div>

        <TheoryExample title="Практический пример">
          <p><strong>Ты:</strong> "У меня есть проект React в папке src/. Есть ошибка в консоли: 'Cannot read property of undefined'. Помоги найти и исправить"</p>
          <p><strong>Claude (через IDE):</strong> Откроет файлы, увидит проблему, исправит, сохранит</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ограничения и опасности ИИ</h2>
        <p className="theory-intro">
          ИИ — мощный инструмент, но не волшебство. Вот о чём надо помнить.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🚫 Галлюцинации</h3>
          <p className="theory-intro">Модель может выдумать с полной уверенностью.</p>
          <ul className="theory-list">
            <li className="theory-list-item">Факты которых нет ("Это функция была добавлена в Python 3.12")</li>
            <li className="theory-list-item">Несуществующие библиотеки ("Используй numpy_super.array()")</li>
            <li className="theory-list-item">Неправильный код, но написанный очень убедительно</li>
          </ul>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}><strong>Решение:</strong> ВСЕГДА проверяй код перед использованием. Гугли если сомневаешься.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">📅 Знания устаревают</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Claude обучена до определённой даты</li>
            <li className="theory-list-item">О новых версиях библиотек может не знать</li>
            <li className="theory-list-item">Новые API может не знать</li>
          </ul>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}><strong>Решение:</strong> Скажи ИИ "Это новая версия, вот доки" и скармливай свежую информацию.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🧮 Ошибки в точных вычислениях</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Может неправильно считать математику</li>
            <li className="theory-list-item">Путается в больших числах</li>
          </ul>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}><strong>Решение:</strong> Для математики и точных вычислений - проверь вручную или в Python.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🎭 Может ошибаться в сложной логике</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Сложные алгоритмы может напереть неправильно</li>
            <li className="theory-list-item">Может забыть edge case в коде</li>
          </ul>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}><strong>Решение:</strong> Попроси "покажи примеры, включая edge cases" и протестируй.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🧠 Контекст конечен (хоть 200k большой)</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Если скармливаешь ОЧЕНЬ много текста, может потеря качество</li>
            <li className="theory-list-item">Может забыть начало длинной беседы</li>
          </ul>
          <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}><strong>Решение:</strong> Разбей большие задачи на несколько промптов. Напомни контекст если забыл.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Этика использования ИИ</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ <strong>ВСЕГДА</strong> проверяй код перед использованием в production</li>
          <li className="theory-list-item">✅ Указывай что ты использовал ИИ (в коде, в документации, в резюме)</li>
          <li className="theory-list-item">✅ Проверяй лицензии и авторские права (не копируй чужой чужой лицензированный код)</li>
          <li className="theory-list-item">✅ ИИ — помощник, а не замена. Ты должен понимать что пишешь</li>
          <li className="theory-list-item">❌ Не полагайся полностью на ИИ для критических систем</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практические советы для разработчика</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">💡 ТОП-5 способов использовать ИИ каждый день</h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px', lineHeight: '1.8' }}>
            <li><strong>Рефакторинг кода:</strong> "Переделай этот код чтобы он был более читаемым"</li>
            <li><strong>Объяснение чужого кода:</strong> "Объясни что делает эта функция пошагово"</li>
            <li><strong>Написание тестов:</strong> "Напиши unit tests для этой функции"</li>
            <li><strong>Документация:</strong> "Напиши подробный комментарий (docstring) для этой функции"</li>
            <li><strong>Отладка:</strong> "Помоги найти баг. Вот ошибка и код" (скармливай error message)</li>
          </ol>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🎯 Когда НЕ использовать ИИ</h3>
          <ul className="theory-list">
            <li className="theory-list-item">❌ Для изучения основ (ты должен сам учиться, не копировать ответы)</li>
            <li className="theory-list-item">❌ Для хранения секретной информации (в бесплатных сервисах данные могут видеть)</li>
            <li className="theory-list-item">❌ Для очень специфичного знания про твой проект (ИИ может не знать деталей)</li>
          </ul>
        </div>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">ИИ — твой помощник разработчика. Используй его мудро, проверяй результаты, и он сэкономит тебе часы работы!</p>
      </section>
    </div>
  )
}
