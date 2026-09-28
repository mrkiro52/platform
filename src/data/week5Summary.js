// Неделя 5 — сводка всего, что прошли за первые четыре недели.
// Каждый пункт ссылается на реальную главу по её id: ссылки собираются
// автоматически, поэтому разойтись с материалами они не могут.

export const WEEK5_TITLE = 'Что ты уже знаешь: сводка за четыре недели'

export const WEEK5_INTRO =
  'Это не новая тема, а карта пройденного. Здесь собраны все темы первых четырёх недель: ' +
  'что именно нужно знать по каждой и куда вернуться, если забылось. Отмечай галочкой то, ' +
  'в чём уверен, — отметки сохраняются и видно, что осталось. Если по теме есть сомнения, ' +
  'открывай главу по ссылке: она откроется сразу на нужном месте.'

export const WEEK5_SECTIONS = [
  {
    id: 'python',
    title: 'Основы программирования и Python',
    week: 1,
    base: '/autumn-camp/week1',
    summary: '19 глав первой недели. Это фундамент: без него не читается ни один следующий раздел.',
    extra: [
      { href: '/likebezy/python', label: 'Ликбез: Python с нуля' },
      { href: '/likebezy/python-oop', label: 'Ликбез: ООП в Python' },
    ],
    topics: [
      { ch: 'it-world', must: 'Как устроена индустрия, какие есть направления и чем они отличаются' },
      { ch: 'programming-intro', must: 'Что такое программа, интерпретатор и почему Python — интерпретируемый язык' },
      { ch: 'variables', must: 'Что переменная это имя, а не коробка; правила именования и snake_case' },
      { ch: 'types', must: 'int, float, str, bool; динамическая типизация; приведение типов и где оно ломается' },
      { ch: 'io', must: 'input() всегда возвращает строку; print с sep и end' },
      { ch: 'fstrings', must: 'f-строки, форматирование чисел и выравнивание' },
      { ch: 'conditions', must: 'if / elif / else, сравнения, цепочки условий, тернарный оператор' },
      { ch: 'logic', must: 'and, or, not; приоритет операторов; ленивое вычисление' },
      { ch: 'while', must: 'Условие выхода, бесконечные циклы и как их избежать' },
      { ch: 'for', must: 'Перебор коллекций; чем for отличается от while и когда что брать' },
      { ch: 'break-continue', must: 'Досрочный выход и пропуск итерации; конструкция for...else' },
      { ch: 'range', must: 'range(start, stop, step); почему stop не включается' },
      { ch: 'containers', must: 'list, tuple, dict, set: что изменяемо, что упорядочено, что быстро ищется' },
      { ch: 'functions', must: 'def, аргументы и значения по умолчанию, return, области видимости' },
      { ch: 'string-methods', must: 'split, join, strip, replace, find; неизменяемость строк' },
      { ch: 'comprehensions', must: 'Генераторы списков, map, filter, zip и когда они читаемее цикла' },
      { ch: 'oop', must: 'Класс и объект, __init__, self, атрибуты и методы, наследование' },
      { ch: 'decorators-generators', must: 'Декоратор как функция над функцией; yield и ленивые последовательности' },
      { ch: 'async', must: 'async/await, зачем нужна асинхронность и чем она не является многопоточностью' },
    ],
  },

  {
    id: 'algorithms',
    title: 'Алгоритмы',
    week: 2,
    base: '/autumn-camp/week2',
    level: 3,
    summary:
      '21 глава второй недели по программе третьего уровня. Первые шесть входят во все уровни, ' +
      'остальные добавляются на втором и третьем — если ты проходил первый или второй уровень, ' +
      'нижняя часть списка это то, что у тебя впереди.',
    extra: [
      { href: '/likebezy/avito-ml-test', label: 'Разбор теста Avito: алгоритмы и метрики на собеседовании' },
    ],
    topics: [
      { ch: 'big-o-basics', must: 'O(1), O(n), O(n²) на пальцах; почему секундомер не годится для оценки', levels: [1, 2, 3] },
      { ch: 'linear-search', must: 'Перебор по одному; худший случай и почему для неупорядоченных данных лучше нельзя', levels: [1, 2, 3] },
      { ch: 'bubble-sort', must: 'Как работает, почему O(n²) и зачем его вообще изучают', levels: [1, 2, 3] },
      { ch: 'recursion-basics', must: 'База и шаг; что будет без базы; когда рекурсия читаемее цикла', levels: [1, 2, 3] },
      { ch: 'two-pointers-basics', must: 'Приём на отсортированных данных; почему он превращает O(n²) в O(n)', levels: [1, 2, 3] },
      { ch: 'strings-palindrome', must: 'Палиндромы двумя указателями, анаграммы через сортировку и подсчёт', levels: [1, 2, 3] },
      { ch: 'big-o-advanced', must: 'O(log n), O(n log n), O(n!); почему логарифм считают почти бесплатным', levels: [2, 3] },
      { ch: 'binary-search', must: 'Реализация без ошибок на границах; требование отсортированности', levels: [2, 3] },
      { ch: 'quick-sort', must: 'Разделение по опорному; средний случай O(n log n) и худший O(n²)', levels: [2, 3] },
      { ch: 'merge-sort', must: 'Деление и слияние; гарантированное O(n log n) и стабильность', levels: [2, 3] },
      { ch: 'recursion-fibonacci', must: 'Дерево вызовов, повторные вычисления, мемоизация, стек вызовов', levels: [2, 3] },
      { ch: 'sliding-window', must: 'Окно фиксированной и переменной ширины; экономия на пересчёте', levels: [2, 3] },
      { ch: 'greedy', must: 'Локально лучший выбор; когда он даёт правильный ответ, а когда нет', levels: [2, 3] },
      { ch: 'primality', must: 'Почему достаточно проверить делители до корня', levels: [2, 3] },
      { ch: 'sort-comparison', must: 'Стабильность, память, что выбрать под массив и под связный список', levels: [3] },
      { ch: 'dynamic-programming', must: 'Перекрывающиеся подзадачи, мемоизация и табуляция, рюкзак 0/1', levels: [3] },
      { ch: 'divide-and-conquer', must: 'Чем отличается от ДП: повторяются подзадачи или нет', levels: [3] },
      { ch: 'backtracking', must: 'Перебор с откатом, отсечения, перестановки и комбинации', levels: [3] },
      { ch: 'bitwise', must: 'Проверка чётности через & 1, свойства XOR, поиск уникального элемента', levels: [3] },
      { ch: 'substring-search', must: 'Наивный поиск и его худший случай; что делает in в Python', levels: [3] },
      { ch: 'math-algorithms', must: 'Алгоритм Евклида для НОД, решето Эратосфена', levels: [3] },
    ],
  },

  {
    id: 'structures',
    title: 'Структуры данных',
    week: 3,
    base: '/autumn-camp/week3',
    summary:
      '9 глав третьей недели по возрастанию сложности. По каждой структуре нужно знать три вещи: ' +
      'как она устроена, что в ней быстро и что медленно, и зачем она вообще нужна.',
    topics: [
      { ch: 'array', must: 'Непрерывная память, доступ по индексу за O(1), дорогая вставка в середину' },
      { ch: 'python-list', must: 'Динамический массив, амортизированное O(1) у append, дорогой insert(0)' },
      { ch: 'singly-linked-list', must: 'Узлы и ссылки; дешёвая вставка, но нет доступа по индексу' },
      { ch: 'doubly-linked-list', must: 'Вторая ссылка: обход назад и удаление по ссылке за O(1)' },
      { ch: 'stack', must: 'LIFO, все операции O(1), скобки, стек вызовов, обход в глубину' },
      { ch: 'queue', must: 'FIFO, почему list.pop(0) — ошибка и зачем нужен deque' },
      { ch: 'hash-table', must: 'Хеш-функция, коллизии и цепочки, O(1) в среднем и O(n) в худшем' },
      { ch: 'graphs', must: 'Вершины и рёбра, список против матрицы смежности, зачем помнить посещённые' },
      { ch: 'trees', must: 'Дерево поиска, обходы в глубину и в ширину: DFS это стек, BFS это очередь' },
    ],
  },

  {
    id: 'databases',
    title: 'Базы данных',
    week: 4,
    base: '/autumn-camp/week4',
    topic: 'databases',
    summary: '8 глав четвёртой недели: от «что это вообще» до индексов и транзакций.',
    topics: [
      { ch: 'db-what', must: 'Чем база отличается от файла с данными' },
      { ch: 'db-dbms', must: 'База это данные, СУБД это программа; СУБД — отдельный сервис на порту' },
      { ch: 'db-types', must: 'Реляционные, документные, колоночные, ключ-значение и под какие задачи' },
      { ch: 'db-architecture', must: 'Фронтенд, бэкенд и база — три сервиса; почему браузер не ходит в базу' },
      { ch: 'db-work', must: 'Драйвер и ORM, пул соединений, SQL-инъекция и параметризованные запросы' },
      { ch: 'db-design', must: 'Первичные и внешние ключи, три вида связей, нормализация, типы и NUMERIC для денег' },
      { ch: 'db-transactions', must: 'Транзакция как «всё или ничего», ACID, зачем нужна изоляция' },
      { ch: 'db-indexes', must: 'Зачем индекс, чем за него платят, когда он не сработает, как читать EXPLAIN' },
    ],
  },

  {
    id: 'sql',
    title: 'SQL',
    week: 4,
    base: '/autumn-camp/week4',
    topic: 'sql',
    summary: '9 глав четвёртой недели — уровень, которого ждут от стажёра и джуна на собеседовании.',
    extra: [
      { href: '/likebezy/sql', label: 'Полный ликбез по SQL' },
      { href: '/likebezy/pandas', label: 'Ликбез: pandas — те же операции над данными в Python' },
    ],
    topics: [
      { ch: 'sql-select', must: 'SELECT, FROM, псевдонимы, DISTINCT по всей строке, почему не SELECT *' },
      { ch: 'sql-where', must: 'Операторы, BETWEEN и IN, LIKE, и главное — NULL проверяется через IS NULL' },
      { ch: 'sql-order-limit', must: 'Без ORDER BY порядок не определён; LIMIT, OFFSET и почему он медленный' },
      { ch: 'sql-aggregate', must: 'COUNT(*) против COUNT(col), SUM, AVG, GROUP BY и правило про колонки в SELECT' },
      { ch: 'sql-having', must: 'Логический порядок выполнения запроса; WHERE до группировки, HAVING после' },
      { ch: 'sql-joins', must: 'INNER и LEFT, поиск строк без пары через IS NULL, раздувание при неуникальном ключе' },
      { ch: 'sql-subqueries', must: 'Подзапросы в WHERE и FROM, EXISTS, CTE через WITH' },
      { ch: 'sql-window', must: 'OVER и PARTITION BY, ROW_NUMBER против RANK, «последняя запись в группе», LAG' },
      { ch: 'sql-null-case', must: 'CASE внутри агрегата, COALESCE, SUM по пустой выборке даёт NULL, DATE_TRUNC' },
    ],
  },

  {
    id: 'tools',
    title: 'Инструменты: Docker и Git',
    week: 4,
    base: '/autumn-camp/week4',
    topic: 'docker',
    summary:
      'Две темы четвёртой недели, без которых не обходится ни одна команда. Git нужен с первого дня, ' +
      'Docker — когда освоены основы своего направления.',
    extra: [
      { href: '/likebezy/backend-interview', label: 'Ликбез: бэкенд на собеседовании — там есть раздел по Docker' },
    ],
    topics: [
      { ch: 'docker-why', must: 'Какую проблему решает; чем контейнер отличается от виртуальной машины', topic: 'docker' },
      { ch: 'docker-image', must: 'Образ и контейнер, основные команды, проброс портов, эфемерность контейнера', topic: 'docker' },
      { ch: 'docker-dockerfile', must: 'FROM, COPY, RUN, CMD; слои и кеш; почему зависимости копируют первыми', topic: 'docker' },
      { ch: 'docker-volumes', must: 'Тома для данных, сеть по именам контейнеров, переменные окружения', topic: 'docker' },
      { ch: 'docker-compose', must: 'docker-compose.yml, команды up и down, depends_on и healthcheck', topic: 'docker' },
      { ch: 'git-what', must: 'Что такое коммит; чем Git отличается от GitHub', topic: 'git' },
      { ch: 'git-repo', must: 'Локальный и удалённый репозиторий, индекс, .gitignore и почему в него кладут .env', topic: 'git' },
      { ch: 'git-basics', must: 'status, diff, add, commit, push, pull, log; как писать сообщения коммитов', topic: 'git' },
      { ch: 'git-branches', must: 'Ветки, merge и его направление, конфликты и как их разрешать', topic: 'git' },
      { ch: 'git-pr', must: 'Pull request, ревью, почему PR делают небольшими', topic: 'git' },
    ],
  },
]

// Что почитать дальше, когда всё из списка выше закрыто
export const WEEK5_NEXT = [
  { href: '/likebezy/it-career-2026', label: 'Как попасть в айти в 2026', note: 'Рынок, направления, стажировки, резюме и первый оффер' },
  { href: '/likebezy/backend-interview', label: 'Бэкенд на собеседовании', note: '56 реальных вопросов: базы, очереди, Docker' },
  { href: '/likebezy/ml', label: 'Машинное обучение', note: 'Если тянет в ML: с чего начинать и что учить' },
  { href: '/likebezy/avito-ml-test', label: 'Отборочный тест Avito ML', note: 'Разбор 23 заданий — проверить себя на реальном отборе' },
]
