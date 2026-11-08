// Блок ноября «Алгособес», глава 14 — Графы: BFS и кратчайший путь (Graph BFS).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 14,
 "title": "Графы: BFS и кратчайший путь",
 "summary": "BFS как поиск кратчайшего пути в невзвешенном графе; почему первый найденный путь — кратчайший; расстояния по уровням; неявные графы состояний и генерация соседей; двусторонний BFS; разбор задач Snakes and Ladders, Minimum Genetic Mutation и Word Ladder.",
 "intro": "Обход в ширину находит **кратчайший путь** в графе, где все рёбра одинаковой длины: число ходов, число замен, число шагов. Главная сложность задач главы — увидеть граф: вершины здесь — клетки игрового поля, генетические строки или слова, а рёбра нужно генерировать самому. Если в условии есть «минимальное число ходов / шагов / преобразований» — это почти наверняка BFS.",
 "sections": [
  {
   "id": "bfs",
   "num": "14.1",
   "title": "BFS и кратчайший путь",
   "blocks": [
    {
     "t": "p",
     "text": "BFS обходит вершины в порядке удаления от старта: сначала все на расстоянии 1, потом 2 и так далее. Поэтому в момент, когда вершина впервые попала в очередь, найдено кратчайшее расстояние до неё — более короткого пути не существует, иначе её нашли бы на предыдущем уровне."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\ndef shortest(graph, start, goal):\n    dist = {start: 0}\n    q = deque([start])\n    while q:\n        v = q.popleft()\n        if v == goal:\n            return dist[v]\n        for u in graph[v]:\n            if u not in dist:            # первый раз — кратчайшее расстояние\n                dist[u] = dist[v] + 1\n                q.append(u)\n    return -1\n\ng = {\"A\": [\"B\", \"C\"], \"B\": [\"D\"], \"C\": [\"D\"], \"D\": [\"E\"], \"E\": []}\nprint(shortest(g, \"A\", \"E\"))",
     "out": "3"
    },
    {
     "t": "ul",
     "items": [
      "Помечаем вершину посещённой **при добавлении** в очередь, а не при извлечении — иначе одна вершина попадёт в очередь много раз.",
      "Для взвешенных графов BFS не подходит — нужен алгоритм Дейкстры (куча, глава 20).",
      "**Неявный граф:** соседей не храним, а генерируем — например, все строки, отличающиеся одним символом."
     ]
    },
    {
     "t": "h3",
     "text": "Двусторонний BFS"
    },
    {
     "t": "p",
     "text": "Если известны и старт, и цель, можно запустить BFS с двух сторон и останавливаться при встрече. При ветвлении b и расстоянии d это b^(d/2) · 2 вершин вместо b^d — огромная экономия в задачах вроде Word Ladder."
    }
   ],
   "terms": [],
   "divider": "Теория"
  },
  {
   "id": "p909",
   "num": "14.2",
   "title": "909. Snakes and Ladders",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Доска n × n пронумерована «бустрофедоном» от 1 (левый нижний угол), строки чередуют направление. Из клетки можно пойти на 1–6 вперёд; если попал на начало змеи или лестницы, обязательно переходишь в её конец. Найди минимальное число бросков до клетки n², или −1."
    },
    {
     "t": "p",
     "text": "**Идея.** Вершины — номера клеток 1…n², из каждой 6 рёбер (броски кубика) с учётом змей и лестниц. Нужно минимальное число ходов — BFS. Главная сложность — перевод номера клетки в координаты доски."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def snakesAndLadders(self, board: List[List[int]]) -> int:\n        n = len(board)\n\n        def cell(num):                         # номер клетки -> (строка, столбец)\n            r, c = divmod(num - 1, n)\n            row = n - 1 - r                    # нумерация идёт снизу\n            col = c if r % 2 == 0 else n - 1 - c   # чётные снизу ряды — слева направо\n            return row, col\n\n        dist = {1: 0}\n        q = deque([1])\n        while q:\n            cur = q.popleft()\n            if cur == n * n:\n                return dist[cur]\n            for nxt in range(cur + 1, min(cur + 6, n * n) + 1):\n                r, c = cell(nxt)\n                if board[r][c] != -1:          # змея или лестница\n                    nxt = board[r][c]\n                if nxt not in dist:\n                    dist[nxt] = dist[cur] + 1\n                    q.append(nxt)\n        return -1"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`divmod(num − 1, n)` даёт ряд снизу и позицию в ряду; ряды с нечётным номером (снизу) идут справа налево.",
      "Переход по змее или лестнице — часть того же хода, он не добавляет бросок.",
      "Посещённость — по клетке назначения после перехода: если на клетку уже попадали, повторно её не кладём."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n²) — n² вершин по 6 рёбер.",
      "**Память:** O(n²)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p433",
   "num": "14.3",
   "title": "433. Minimum Genetic Mutation",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [433. Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Гены — строки из 8 символов `A`, `C`, `G`, `T`. Мутация меняет один символ, и результат должен быть в банке `bank`. Найди минимальное число мутаций от `startGene` до `endGene` или −1."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"AACCGGTT\" → \"AAACGGTA\"`, банк `[\"AACCGGTA\",\"AACCGCTA\",\"AAACGGTA\"]` → `2`"
    },
    {
     "t": "p",
     "text": "**Идея.** Вершины — гены из банка (плюс старт), ребро — отличие в одном символе. Минимум мутаций — BFS. Соседей генерируем: в каждой из 8 позиций пробуем 3 других символа и проверяем, есть ли результат в банке."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:\n        bank = set(bank)\n        if endGene not in bank:\n            return -1\n        q = deque([(startGene, 0)])\n        seen = {startGene}\n        while q:\n            gene, steps = q.popleft()\n            if gene == endGene:\n                return steps\n            for i in range(len(gene)):\n                for ch in 'ACGT':\n                    nxt = gene[:i] + ch + gene[i + 1:]\n                    if nxt in bank and nxt not in seen:\n                        seen.add(nxt)\n                        q.append((nxt, steps + 1))\n        return -1"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Банк в `set` — проверка соседа за O(1).",
      "Генерировать соседей заменами (8 · 4 = 32 варианта) быстрее, чем сравнивать ген со всеми строками банка.",
      "Если целевого гена нет в банке, ответ −1 сразу."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(B · L · 4), B — размер банка, L = 8.",
      "**Память:** O(B)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p127",
   "num": "14.4",
   "title": "127. Word Ladder",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [127. Word Ladder](https://leetcode.com/problems/word-ladder/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди длину кратчайшей цепочки слов от `beginWord` до `endWord`, где соседние слова отличаются одной буквой и все слова, кроме первого, есть в словаре. Длина считается в словах; если цепочки нет — 0."
    },
    {
     "t": "p",
     "text": "**Пример.** `hit → cog`, словарь `[\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]` → `5` (hit → hot → dot → dog → cog)"
    },
    {
     "t": "p",
     "text": "**Идея.** Та же схема, что в Minimum Genetic Mutation, но словарь большой (до 5000 слов), а алфавит — 26 букв. Генерируем соседей заменой каждой буквы на 25 других и проверяем по `set`; найденные слова удаляем из словаря — это заменяет `visited`. Для ускорения — двусторонний BFS: всегда расширяем меньший фронт."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:\n        words = set(wordList)\n        if endWord not in words:\n            return 0\n        front, back = {beginWord}, {endWord}\n        words.discard(beginWord)\n        length = 1\n        letters = 'abcdefghijklmnopqrstuvwxyz'\n        while front and back:\n            if len(front) > len(back):          # расширяем меньший фронт\n                front, back = back, front\n            nxt = set()\n            for word in front:\n                for i in range(len(word)):\n                    for ch in letters:\n                        cand = word[:i] + ch + word[i + 1:]\n                        if cand in back:          # фронты встретились\n                            return length + 1\n                        if cand in words:\n                            words.remove(cand)    # посещено\n                            nxt.add(cand)\n            front = nxt\n            length += 1\n        return 0"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`endWord` удаляется из `words` только как часть заднего фронта: мы проверяем встречу с `back` раньше, чем поиск по словарю.",
      "Удаление слова из словаря при посещении гарантирует, что оно не попадёт ни в один фронт дважды.",
      "Обычный односторонний BFS тоже проходит тесты; двусторонний быстрее в десятки раз на длинных цепочках.",
      "Альтернативная генерация соседей — словарь шаблонов `h*t → [hot, hit]`: соседи — слова с общим шаблоном."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(N · L · 26), N — число слов, L — длина слова.",
      "**Память:** O(N)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "14.5",
   "title": "Шпаргалка по главе",
   "divider": "Итоги",
   "blocks": [
    {
     "t": "table",
     "caption": "Все задачи главы: признак в условии → приём",
     "headers": [
      "Задача",
      "Сложность",
      "Уровень",
      "Главный приём"
     ],
     "rows": [
      [
       "[909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/)",
       "Medium",
       "2",
       "BFS по номерам клеток, ход кубика — 6 рёбер"
      ],
      [
       "[433. Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/)",
       "Medium",
       "2",
       "BFS по строкам банка, соседи — замена одного символа"
      ],
      [
       "[127. Word Ladder](https://leetcode.com/problems/word-ladder/)",
       "Hard",
       "3",
       "BFS по словам, соседи через шаблоны с «*» (или двусторонний BFS)"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "4–5 часов",
  "format": "решения на LeetCode",
  "situation": [
   "Реши задачи главы на LeetCode сам, не подглядывая в разбор, — двигайся от Easy к Medium. Если идеи нет за 25 минут, открой разбор, разберись и напиши решение заново с нуля. Задачи разбиты по уровням из главы 1: начни с уровня 1, остальные — если позволяет время."
  ],
  "parts": [
   {
    "title": "Уровень 2 — уверенный",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[909. Snakes and Ladders](https://leetcode.com/problems/snakes-and-ladders/) · Medium",
       "[433. Minimum Genetic Mutation](https://leetcode.com/problems/minimum-genetic-mutation/) · Medium"
      ]
     }
    ]
   },
   {
    "title": "Уровень 3 — всё (Hard и экзотика)",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[127. Word Ladder](https://leetcode.com/problems/word-ladder/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Почему BFS находит кратчайший путь в невзвешенном графе, а DFS — нет?",
   "Почему вершину помечают посещённой при добавлении в очередь, а не при извлечении?",
   "Как в задачах со строками генерировать соседей и почему это лучше, чем сравнивать со всем словарём?",
   "Как работает двусторонний BFS и почему он быстрее?"
  ]
 }
}
