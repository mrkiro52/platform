// Блок ноября «Алгособес», глава 15 — Префиксное дерево (Trie) (Trie).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 15,
 "title": "Префиксное дерево (Trie)",
 "summary": "Префиксное дерево (Trie): узел со словарём детей и флагом конца слова; вставка и поиск за O(L); поиск по префиксу; шаблоны с «.» через DFS по дереву; Trie + обход сетки с отсечением; разбор задач Implement Trie, Design Add and Search Words Data Structure и Word Search II.",
 "intro": "Префиксное дерево хранит набор строк так, что общие префиксы хранятся один раз. Оно отвечает на вопросы «есть ли слово», «есть ли слова с таким началом» за время, зависящее только от длины запроса, а не от числа слов. На этом построены автодополнение, проверка орфографии и поиск слов по сетке.",
 "sections": [
  {
   "id": "trie",
   "num": "15.1",
   "title": "Как устроено префиксное дерево",
   "blocks": [
    {
     "t": "p",
     "text": "Каждый узел соответствует префиксу. От узла идут рёбра, подписанные символами, к узлам более длинных префиксов. Флаг `end` отмечает, что префикс узла — целое слово из набора. Корень — пустой префикс."
    },
    {
     "t": "tree",
     "lines": [
      [
       0,
       "(корень)"
      ],
      [
       1,
       "c"
      ],
      [
       2,
       "a"
      ],
      [
       3,
       "t ✓ — «cat»"
      ],
      [
       4,
       "s ✓ — «cats»"
      ],
      [
       3,
       "r ✓ — «car»"
      ],
      [
       1,
       "d"
      ],
      [
       2,
       "o"
      ],
      [
       3,
       "g ✓ — «dog»"
      ]
     ]
    },
    {
     "t": "code",
     "text": "class TrieNode:\n    def __init__(self):\n        self.children = {}     # символ -> TrieNode\n        self.end = False       # здесь заканчивается слово\n\nroot = TrieNode()\nfor word in ['cat', 'car', 'cats', 'dog']:\n    node = root\n    for ch in word:\n        node = node.children.setdefault(ch, TrieNode())\n    node.end = True\n\nprint(sorted(root.children), sorted(root.children['c'].children['a'].children))",
     "out": "['c', 'd'] ['r', 't']"
    },
    {
     "t": "table",
     "caption": "Сравнение со множеством строк",
     "headers": [
      "Операция",
      "set строк",
      "Trie"
     ],
     "rows": [
      [
       "есть ли слово длины L",
       "O(L) на хеш",
       "O(L)"
      ],
      [
       "есть ли слова с префиксом",
       "O(N · L) — перебор",
       "O(L)"
      ],
      [
       "все слова с префиксом",
       "O(N · L)",
       "O(L + размер ответа)"
      ],
      [
       "шаблон с подстановочными символами",
       "перебор",
       "DFS по дереву с отсечением"
      ]
     ]
    }
   ],
   "terms": [
    [
     "Trie",
     "префиксное дерево; читается «трай», от re**trie**val."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "p208",
   "num": "15.2",
   "title": "208. Implement Trie (Prefix Tree)",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Реализуй префиксное дерево с операциями `insert(word)`, `search(word)` (есть ли слово целиком) и `startsWith(prefix)` (есть ли слово с таким префиксом)."
    },
    {
     "t": "p",
     "text": "**Идея.** Вставка: идём по символам, создавая отсутствующие узлы, в последнем ставим `end`. Поиск и проверка префикса — один и тот же спуск по символам; разница только в том, нужно ли проверять флаг `end` в конце."
    },
    {
     "t": "code",
     "text": "class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n\n    def insert(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            node = node.children.setdefault(ch, TrieNode())\n        node.end = True\n\n    def _walk(self, s):                      # узел префикса s или None\n        node = self.root\n        for ch in s:\n            node = node.children.get(ch)\n            if node is None:\n                return None\n        return node\n\n    def search(self, word: str) -> bool:\n        node = self._walk(word)\n        return node is not None and node.end\n\n    def startsWith(self, prefix: str) -> bool:\n        return self._walk(prefix) is not None"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`setdefault` создаёт ребёнка, только если его нет, и возвращает существующего или нового.",
      "Общий спуск `_walk` убирает дублирование кода между `search` и `startsWith`.",
      "Без флага `end` нельзя отличить слово «cat» от префикса слова «cats».",
      "Вместо словаря можно хранить массив из 26 детей — чуть быстрее, но больше памяти."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(L) на операцию.",
      "**Память:** O(суммарной длины слов)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p211",
   "num": "15.3",
   "title": "211. Design Add and Search Words Data Structure",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Структура слов с операциями `addWord(word)` и `search(pattern)`, где в шаблоне символ `.` означает любую букву."
    },
    {
     "t": "p",
     "text": "**Пример.** после `bad`, `dad`, `mad`: `search(\".ad\")` → `true`, `search(\"b..\")` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Добавление — как в обычном Trie. Поиск — DFS: обычный символ ведёт в одного ребёнка, точка — во всех детей по очереди. Префиксное дерево отсекает несуществующие ветки сразу."
    },
    {
     "t": "code",
     "text": "class WordDictionary:\n    def __init__(self):\n        self.root = {}                       # узел — словарь; ключ '$' — конец слова\n\n    def addWord(self, word: str) -> None:\n        node = self.root\n        for ch in word:\n            node = node.setdefault(ch, {})\n        node['$'] = True\n\n    def search(self, word: str) -> bool:\n        def dfs(node, i):\n            if i == len(word):\n                return '$' in node\n            ch = word[i]\n            if ch == '.':\n                return any(dfs(child, i + 1) for key, child in node.items() if key != '$')\n            return ch in node and dfs(node[ch], i + 1)\n        return dfs(self.root, 0)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Узел — просто словарь, конец слова отмечен специальным ключом `$` — компактная запись Trie для Python.",
      "`any` останавливается на первой успешной ветке.",
      "В худшем случае (шаблон из точек) DFS обходит всё дерево, но обычно отсечение делает поиск быстрым."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(L) без точек, до O(размера дерева) с точками.",
      "**Память:** O(суммарной длины слов)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p212",
   "num": "15.4",
   "title": "212. Word Search II",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [212. Word Search II](https://leetcode.com/problems/word-search-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Дана сетка букв и список слов. Найди все слова, которые можно составить из соседних по горизонтали и вертикали клеток (каждую клетку — не больше раза в слове)."
    },
    {
     "t": "p",
     "text": "**Идея.** Искать каждое слово отдельно (как в Word Search, глава 16) — слишком медленно. Строим Trie из всех слов и запускаем DFS из каждой клетки, спускаясь по дереву одновременно с движением по сетке. Если текущего префикса нет в Trie — ветку сразу обрываем. В узле конца слова храним само слово, чтобы сразу добавить его в ответ."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:\n        root = {}\n        for w in words:\n            node = root\n            for ch in w:\n                node = node.setdefault(ch, {})\n            node['$'] = w                          # в конце храним само слово\n        m, n = len(board), len(board[0])\n        found = []\n\n        def dfs(r, c, parent):\n            ch = board[r][c]\n            node = parent[ch]\n            if '$' in node:\n                found.append(node.pop('$'))        # нашли и убрали, чтобы не дублировать\n            board[r][c] = '#'                      # клетка занята в текущем пути\n            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):\n                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] in node:\n                    dfs(nr, nc, node)\n            board[r][c] = ch                       # возврат\n            if not node:                           # ветка исчерпана — отрезаем её\n                parent.pop(ch)\n\n        for r in range(m):\n            for c in range(n):\n                if board[r][c] in root:\n                    dfs(r, c, root)\n        return found"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Переход в соседа только если его буква есть среди детей текущего узла — так обрезаются все тупиковые пути.",
      "Найденное слово удаляем из Trie: оно не попадёт в ответ дважды.",
      "Удаление опустевших узлов (`parent.pop(ch)`) — важная оптимизация: уже найденные слова больше не тратят время поиска.",
      "Пометка `#` на время пути и восстановление после — стандартный backtracking по сетке."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n·4·3^(L−1)) в худшем случае, на практике намного меньше благодаря отсечению.",
      "**Память:** O(суммарной длины слов)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "15.5",
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
       "[208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/)",
       "Medium",
       "2",
       "узел = словарь детей + флаг конца слова"
      ],
      [
       "[211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)",
       "Medium",
       "2",
       "Trie + DFS: «.» перебирает всех детей"
      ],
      [
       "[212. Word Search II](https://leetcode.com/problems/word-search-ii/)",
       "Hard",
       "3",
       "Trie из слов + DFS по сетке, отсечение по префиксу"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "3–4 часа",
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
       "[208. Implement Trie (Prefix Tree)](https://leetcode.com/problems/implement-trie-prefix-tree/) · Medium",
       "[211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/) · Medium"
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
       "[212. Word Search II](https://leetcode.com/problems/word-search-ii/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Из чего состоит узел префиксного дерева и зачем нужен флаг конца слова?",
   "Какая сложность у вставки и поиска в Trie и от чего она не зависит?",
   "Как искать слова по шаблону с подстановочным символом?",
   "Почему в Word Search II выгоднее один Trie из всех слов, чем отдельный поиск каждого слова?"
  ]
 }
}
