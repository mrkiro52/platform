// Блок ноября «Алгособес», глава 13 — Графы: DFS, union-find и топологическая сортировка (Graph General).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 13,
 "title": "Графы: DFS, union-find и топологическая сортировка",
 "summary": "Графы: вершины и рёбра, ориентированные и взвешенные; списки смежности; сетка как неявный граф; DFS с множеством посещённых; компоненты связности; топологическая сортировка (Кан и DFS) и поиск цикла; взвешенный граф отношений; разбор задач Number of Islands, Surrounded Regions, Clone Graph, Evaluate Division, Course Schedule и Course Schedule II.",
 "intro": "Граф — это объекты и связи между ними: города и дороги, пользователи и подписки, курсы и пререквизиты. На собеседовании граф редко дают в готовом виде — его нужно увидеть в условии: сетка клеток, зависимости задач, отношения между переменными. Дальше работает небольшой набор инструментов: обход в глубину (эта глава), обход в ширину (глава 14) и топологическая сортировка.",
 "sections": [
  {
   "id": "graph",
   "num": "13.1",
   "title": "Как представить граф",
   "blocks": [
    {
     "t": "p",
     "text": "Граф — множество **вершин** и **рёбер** между ними. Рёбра бывают направленные (подписка: A → B) и ненаправленные (дружба), с весами и без. Самое удобное представление на собеседовании — **список смежности**: словарь «вершина → список соседей»."
    },
    {
     "t": "code",
     "text": "from collections import defaultdict\n\nedges = [(0, 1), (0, 2), (1, 3)]\ngraph = defaultdict(list)\nfor a, b in edges:\n    graph[a].append(b)\n    graph[b].append(a)          # для ненаправленного графа — в обе стороны\nprint(dict(graph))",
     "out": "{0: [1, 2], 1: [0, 3], 2: [0], 3: [1]}"
    },
    {
     "t": "p",
     "text": "**Сетка** `grid[r][c]` — неявный граф: вершины — клетки, рёбра — к соседям по четырём направлениям. Строить список смежности не нужно, соседей перебираем на лету."
    },
    {
     "t": "table",
     "caption": "Что и когда",
     "headers": [
      "Задача",
      "Инструмент"
     ],
     "rows": [
      [
       "обойти всё связное, посчитать компоненты, найти «острова»",
       "DFS или BFS + посещённые"
      ],
      [
       "кратчайший путь в невзвешенном графе",
       "BFS (глава 14)"
      ],
      [
       "порядок с зависимостями, есть ли цикл в ориентированном графе",
       "топологическая сортировка"
      ],
      [
       "объединение групп «на лету», связаны ли две вершины",
       "система непересекающихся множеств (union-find)"
      ]
     ]
    }
   ],
   "terms": [
    [
     "список смежности",
     "представление графа как словаря «вершина → соседи»."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "dfs",
   "num": "13.2",
   "title": "DFS, посещённые вершины и компоненты",
   "blocks": [
    {
     "t": "p",
     "text": "Обход в глубину идёт от вершины к непосещённому соседу, пока может, затем возвращается. Главное отличие от деревьев: в графе есть циклы, поэтому нужно множество `visited` — иначе обход зациклится. Каждая вершина и каждое ребро обрабатываются один раз: O(V + E)."
    },
    {
     "t": "code",
     "text": "def count_components(n, graph):\n    visited = set()\n\n    def dfs(v):\n        visited.add(v)\n        for u in graph[v]:\n            if u not in visited:\n                dfs(u)\n\n    components = 0\n    for v in range(n):\n        if v not in visited:      # новая, ещё не затронутая компонента\n            dfs(v)\n            components += 1\n    return components\n\nprint(count_components(5, {0: [1], 1: [0], 2: [3], 3: [2], 4: []}))",
     "out": "3"
    },
    {
     "t": "h3",
     "text": "Топологическая сортировка"
    },
    {
     "t": "p",
     "text": "В ориентированном графе без циклов (DAG) вершины можно упорядочить так, что каждое ребро идёт слева направо: сначала пререквизиты, потом курсы. **Алгоритм Кана:** считаем входящие степени; вершины со степенью 0 кладём в очередь; вынимая вершину, уменьшаем степени её соседей и добавляем тех, у кого стало 0. Если в итоге обработаны не все вершины — в графе есть цикл."
    }
   ],
   "terms": [
    [
     "DAG",
     "Directed Acyclic Graph — ориентированный граф без циклов."
    ],
    [
     "входящая степень",
     "число рёбер, входящих в вершину."
    ]
   ]
  },
  {
   "id": "p200",
   "num": "13.3",
   "title": "200. Number of Islands",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [200. Number of Islands](https://leetcode.com/problems/number-of-islands/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сетка из `\"1\"` (суша) и `\"0\"` (вода). Посчитай острова — связные по 4 направлениям группы суши."
    },
    {
     "t": "p",
     "text": "**Пример.** `[[\"1\",\"1\",\"0\"],[\"1\",\"0\",\"0\"],[\"0\",\"0\",\"1\"]]` → `2`"
    },
    {
     "t": "p",
     "text": "**Идея.** Острова — компоненты связности. Проходим по клеткам; встретив сушу, увеличиваем счётчик и обходом в глубину «затапливаем» весь остров (помечаем клетки водой), чтобы не посчитать его снова."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        m, n = len(grid), len(grid[0])\n\n        def sink(r, c):\n            stack = [(r, c)]                       # итеративный DFS — без лимита рекурсии\n            grid[r][c] = '0'\n            while stack:\n                r, c = stack.pop()\n                for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n                    if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == '1':\n                        grid[nr][nc] = '0'         # помечаем при добавлении\n                        stack.append((nr, nc))\n\n        islands = 0\n        for r in range(m):\n            for c in range(n):\n                if grid[r][c] == '1':\n                    islands += 1\n                    sink(r, c)\n        return islands"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Посещённость храним прямо в сетке: суша превращается в воду. Если исходную сетку менять нельзя — отдельное множество `visited`.",
      "Клетку помечаем в момент добавления в стек, а не при извлечении — иначе одна клетка попадёт в стек несколько раз.",
      "Рекурсивный DFS короче, но сетка 300 × 300 из одной суши даёт глубину рекурсии 90 000 — Python упадёт без увеличения лимита."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(m·n) в худшем случае на стек."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p130",
   "num": "13.4",
   "title": "130. Surrounded Regions",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сетка из `\"X\"` и `\"O\"`. Захвати все области `\"O\"`, полностью окружённые `\"X\"` (заменить на `\"X\"`). Области, касающиеся границы, не захватываются."
    },
    {
     "t": "p",
     "text": "**Идея.** Искать окружённые области сложно, а неокружённые — легко: это ровно те `O`, до которых можно дойти от `O` на границе. Запускаем обход от граничных `O` и помечаем их временным символом. Потом все оставшиеся `O` захватываем, а помеченные возвращаем обратно в `O`."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def solve(self, board: List[List[str]]) -> None:\n        m, n = len(board), len(board[0])\n        stack = [(r, c) for r in range(m) for c in range(n)\n                 if (r in (0, m - 1) or c in (0, n - 1)) and board[r][c] == 'O']\n        while stack:                                   # помечаем всё, что связано с границей\n            r, c = stack.pop()\n            if 0 <= r < m and 0 <= c < n and board[r][c] == 'O':\n                board[r][c] = '#'\n                stack += [(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)]\n        for r in range(m):\n            for c in range(n):\n                if board[r][c] == 'O':\n                    board[r][c] = 'X'                  # окружённые\n                elif board[r][c] == '#':\n                    board[r][c] = 'O'                  # спасённые"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Приём «думать от обратного»: вместо проверки каждой области на окружённость — найти неокружённые одним обходом от границы.",
      "Проверка границ и символа происходит при извлечении из стека — так код короче; клетки, уже помеченные `#`, повторно не обрабатываются.",
      "Временный символ `#` нужен, чтобы отличить спасённые `O` от захватываемых."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(m·n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p133",
   "num": "13.5",
   "title": "133. Clone Graph",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [133. Clone Graph](https://leetcode.com/problems/clone-graph/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сделай глубокую копию связного неориентированного графа. Узел хранит значение и список соседей."
    },
    {
     "t": "p",
     "text": "**Идея.** Как в Copy List with Random Pointer: словарь `оригинал → копия` и обход. Создав копию узла, сразу кладём её в словарь — это и есть «посещённые», и защита от бесконечного цикла, ведь соседи ссылаются друг на друга."
    },
    {
     "t": "code",
     "text": "class Node:\n    def __init__(self, val=0, neighbors=None):\n        self.val = val\n        self.neighbors = neighbors if neighbors is not None else []\n\nclass Solution:\n    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:\n        if not node:\n            return None\n        copies = {node: Node(node.val)}\n        stack = [node]\n        while stack:\n            cur = stack.pop()\n            for nb in cur.neighbors:\n                if nb not in copies:               # первый раз видим — создаём копию\n                    copies[nb] = Node(nb.val)\n                    stack.append(nb)\n                copies[cur].neighbors.append(copies[nb])\n        return copies[node]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Копию создаём при первом обнаружении узла, а рёбра добавляем при обработке каждого узла — так каждое ребро копируется ровно один раз с каждой стороны.",
      "Словарь работает по идентичности объектов (узлы хешируются по `id`), поэтому одинаковые значения не мешают."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(V + E).",
      "**Память:** O(V)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p399",
   "num": "13.6",
   "title": "399. Evaluate Division",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [399. Evaluate Division](https://leetcode.com/problems/evaluate-division/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Даны уравнения `a / b = k`. Ответь на запросы `x / y` — значение или −1, если его нельзя вычислить."
    },
    {
     "t": "p",
     "text": "**Пример.** `a / b = 2, b / c = 3`, запрос `a / c` → `6.0`"
    },
    {
     "t": "p",
     "text": "**Идея.** Переменные — вершины, уравнение `a / b = k` — ребро a → b с весом k и ребро b → a с весом 1/k. Ответ на запрос `x / y` — произведение весов на любом пути от x к y: `a/c = (a/b) · (b/c)`. Ищем путь обходом в глубину."
    },
    {
     "t": "code",
     "text": "from collections import defaultdict\n\nclass Solution:\n    def calcEquation(self, equations: List[List[str]], values: List[float], queries: List[List[str]]) -> List[float]:\n        graph = defaultdict(dict)\n        for (a, b), k in zip(equations, values):\n            graph[a][b] = k\n            graph[b][a] = 1 / k\n\n        def dfs(x, y):\n            stack, seen = [(x, 1.0)], {x}\n            while stack:\n                node, prod = stack.pop()\n                if node == y:\n                    return prod\n                for nb, w in graph[node].items():\n                    if nb not in seen:\n                        seen.add(nb)\n                        stack.append((nb, prod * w))\n            return -1.0\n\n        return [dfs(x, y) if x in graph and y in graph else -1.0 for x, y in queries]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Неизвестная переменная — сразу −1, даже для запроса `x / x`.",
      "В стеке вместе с вершиной храним произведение весов пути до неё.",
      "Для большого числа запросов лучше взвешенный union-find: каждая вершина хранит отношение к корню своего множества, и запрос отвечается почти за O(1)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(Q · (V + E)).",
      "**Память:** O(V + E)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p207",
   "num": "13.7",
   "title": "207. Course Schedule",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [207. Course Schedule](https://leetcode.com/problems/course-schedule/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Есть `numCourses` курсов, пара `[a, b]` означает «чтобы пройти a, сначала пройди b». Можно ли пройти все курсы?"
    },
    {
     "t": "p",
     "text": "**Пример.** `2, [[1,0]]` → `true`, `2, [[1,0],[0,1]]` → `false`"
    },
    {
     "t": "p",
     "text": "**Идея.** Пройти все курсы нельзя ровно тогда, когда в графе зависимостей есть цикл. Алгоритм Кана: начинаем с курсов без пререквизитов, «проходим» их и убираем их рёбра; курсы, у которых пререквизиты закончились, добавляются в очередь. Если прошли все курсы — цикла нет."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:\n        graph = [[] for _ in range(numCourses)]\n        indegree = [0] * numCourses\n        for course, pre in prerequisites:\n            graph[pre].append(course)            # ребро pre -> course\n            indegree[course] += 1\n        q = deque(c for c in range(numCourses) if indegree[c] == 0)\n        done = 0\n        while q:\n            c = q.popleft()\n            done += 1\n            for nxt in graph[c]:\n                indegree[nxt] -= 1\n                if indegree[nxt] == 0:\n                    q.append(nxt)\n        return done == numCourses"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Направление ребра — от пререквизита к курсу: так вершины с нулевой входящей степенью — те, что можно проходить сразу.",
      "Вершины цикла никогда не получат нулевую степень — они так и останутся необработанными.",
      "Альтернатива — DFS с тремя цветами: белый (не посещён), серый (в текущем пути), чёрный (обработан). Ребро в серую вершину — цикл."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(V + E).",
      "**Память:** O(V + E)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p210",
   "num": "13.8",
   "title": "210. Course Schedule II",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Те же курсы и зависимости. Верни любой порядок прохождения всех курсов или пустой массив, если это невозможно."
    },
    {
     "t": "p",
     "text": "**Пример.** `4, [[1,0],[2,0],[3,1],[3,2]]` → `[0,1,2,3]` или `[0,2,1,3]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Порядок, в котором алгоритм Кана вынимает вершины из очереди, и есть топологическая сортировка: курс попадает в очередь только когда пройдены все его пререквизиты."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n        graph = [[] for _ in range(numCourses)]\n        indegree = [0] * numCourses\n        for course, pre in prerequisites:\n            graph[pre].append(course)\n            indegree[course] += 1\n        q = deque(c for c in range(numCourses) if indegree[c] == 0)\n        order = []\n        while q:\n            c = q.popleft()\n            order.append(c)\n            for nxt in graph[c]:\n                indegree[nxt] -= 1\n                if indegree[nxt] == 0:\n                    q.append(nxt)\n        return order if len(order) == numCourses else []"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Отличие от Course Schedule — одна строка: сохраняем вынутые вершины.",
      "Если порядок короче числа курсов, остались вершины в цикле — возвращаем пустой массив.",
      "DFS-вариант: добавлять вершину в список после обработки всех её потомков и в конце развернуть список."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(V + E).",
      "**Память:** O(V + E)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "13.9",
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
       "[200. Number of Islands](https://leetcode.com/problems/number-of-islands/)",
       "Medium",
       "1",
       "DFS из каждой непосещённой суши, затапливаем остров"
      ],
      [
       "[130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)",
       "Medium",
       "2",
       "от обратного: спасаем O, связанные с границей"
      ],
      [
       "[133. Clone Graph](https://leetcode.com/problems/clone-graph/)",
       "Medium",
       "1",
       "DFS + словарь «оригинал → копия»"
      ],
      [
       "[399. Evaluate Division](https://leetcode.com/problems/evaluate-division/)",
       "Medium",
       "2",
       "взвешенный граф отношений, DFS с произведением весов"
      ],
      [
       "[207. Course Schedule](https://leetcode.com/problems/course-schedule/)",
       "Medium",
       "1",
       "алгоритм Кана: есть ли цикл в графе зависимостей"
      ],
      [
       "[210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/)",
       "Medium",
       "2",
       "тот же Кан, но записываем порядок"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Бонус: система непересекающихся множеств (union-find)"
    },
    {
     "t": "p",
     "text": "Union-find хранит разбиение вершин на группы и умеет быстро объединять группы и проверять, в одной ли группе две вершины. С двумя оптимизациями — сжатием путей и объединением по размеру — операции работают почти за O(1). Им можно решить Number of Islands, Evaluate Division (во взвешенном варианте) и многие задачи на связность."
    },
    {
     "t": "code",
     "text": "class DSU:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.size = [1] * n\n\n    def find(self, x):\n        while self.parent[x] != x:\n            self.parent[x] = self.parent[self.parent[x]]   # сжатие пути\n            x = self.parent[x]\n        return x\n\n    def union(self, a, b):\n        a, b = self.find(a), self.find(b)\n        if a == b:\n            return False\n        if self.size[a] < self.size[b]:\n            a, b = b, a\n        self.parent[b] = a                                 # меньшее дерево — под большее\n        self.size[a] += self.size[b]\n        return True"
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "6–8 часов",
  "format": "решения на LeetCode",
  "situation": [
   "Реши задачи главы на LeetCode сам, не подглядывая в разбор, — двигайся от Easy к Medium. Если идеи нет за 25 минут, открой разбор, разберись и напиши решение заново с нуля. Задачи разбиты по уровням из главы 1: начни с уровня 1, остальные — если позволяет время."
  ],
  "parts": [
   {
    "title": "Уровень 1 — золотой минимум",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[200. Number of Islands](https://leetcode.com/problems/number-of-islands/) · Medium",
       "[133. Clone Graph](https://leetcode.com/problems/clone-graph/) · Medium",
       "[207. Course Schedule](https://leetcode.com/problems/course-schedule/) · Medium"
      ]
     }
    ]
   },
   {
    "title": "Уровень 2 — уверенный",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) · Medium",
       "[399. Evaluate Division](https://leetcode.com/problems/evaluate-division/) · Medium",
       "[210. Course Schedule II](https://leetcode.com/problems/course-schedule-ii/) · Medium"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Как представить граф в коде и почему список смежности удобнее матрицы для разреженных графов?",
   "Зачем в обходе графа множество посещённых и почему в дереве оно не нужно?",
   "Какая сложность у DFS и BFS по графу?",
   "Как алгоритм Кана находит цикл в ориентированном графе?",
   "Почему в Surrounded Regions выгоднее искать не окружённые области, а связанные с границей?"
  ]
 }
}
