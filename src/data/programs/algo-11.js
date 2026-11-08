// Блок ноября «Алгособес», глава 11 — Бинарные деревья: обход в ширину (Binary Tree BFS).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 11,
 "title": "Бинарные деревья: обход в ширину",
 "summary": "Обход дерева в ширину (BFS) очередью; обработка по уровням через размер очереди; когда BFS удобнее DFS; разбор задач Average of Levels, Binary Tree Right Side View, Level Order Traversal и Zigzag Level Order Traversal.",
 "intro": "Обход в ширину идёт по дереву уровень за уровнем: сначала корень, потом все его дети, потом все внуки. Если в условии есть слово «уровень» — «по уровням», «самый правый на уровне», «минимальная глубина», — почти наверняка нужен BFS. Все задачи главы решаются одним шаблоном с небольшими изменениями.",
 "sections": [
  {
   "id": "bfs",
   "num": "11.1",
   "title": "Шаблон BFS по уровням",
   "blocks": [
    {
     "t": "p",
     "text": "BFS использует очередь: вынимаем узел слева, добавляем его детей справа. Чтобы знать, где кончается уровень, в начале каждой итерации запоминаем размер очереди — ровно столько узлов принадлежит текущему уровню."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\ndef levels(root):\n    if not root:\n        return []\n    res, q = [], deque([root])\n    while q:\n        level = []\n        for _ in range(len(q)):          # ровно узлы текущего уровня\n            node = q.popleft()\n            level.append(node.val)\n            if node.left:\n                q.append(node.left)\n            if node.right:\n                q.append(node.right)\n        res.append(level)\n    return res\n\nprint(levels(tree([3, 9, 20, None, None, 15, 7])))",
     "out": "[[3], [9, 20], [15, 7]]"
    },
    {
     "t": "note",
     "text": "`list.pop(0)` вместо `deque.popleft()` превращает BFS в O(n²): удаление из начала списка сдвигает все элементы. Для очереди всегда используй `collections.deque`."
    },
    {
     "t": "table",
     "caption": "BFS или DFS",
     "headers": [
      "Задача",
      "Удобнее",
      "Почему"
     ],
     "rows": [
      [
       "что-то «по уровням»",
       "BFS",
       "уровни получаются естественно"
      ],
      [
       "минимальная глубина, кратчайший путь",
       "BFS",
       "первый найденный лист — самый близкий"
      ],
      [
       "свойства путей от корня до листа",
       "DFS",
       "путь — это стек рекурсии"
      ],
      [
       "широкое неглубокое дерево",
       "DFS по памяти",
       "очередь BFS хранит целый уровень — до n/2 узлов"
      ]
     ]
    }
   ],
   "terms": [],
   "divider": "Теория"
  },
  {
   "id": "p637",
   "num": "11.2",
   "title": "637. Average of Levels in Binary Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [637. Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Верни массив средних значений узлов на каждом уровне дерева."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,9,20,null,null,15,7]` → `[3.0, 14.5, 11.0]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Шаблон BFS: на каждом уровне суммируем значения и делим на число узлов уровня (размер очереди в начале итерации)."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def averageOfLevels(self, root: Optional[TreeNode]) -> List[float]:\n        res, q = [], deque([root])\n        while q:\n            size, total = len(q), 0\n            for _ in range(size):\n                node = q.popleft()\n                total += node.val\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(total / size)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Размер уровня фиксируем до цикла — в процессе очередь пополняется детьми.",
      "Python 3 делит `/` в вещественных числах, отдельное приведение не нужно."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(w), w — максимальная ширина уровня."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p199",
   "num": "11.3",
   "title": "199. Binary Tree Right Side View",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Представь, что смотришь на дерево справа. Верни значения видимых узлов сверху вниз."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,2,3,null,5,null,4]` → `[1,3,4]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Справа виден последний узел каждого уровня. BFS по уровням и берём последний. Вариант DFS: обходим «корень, правое, левое» и добавляем узел, если его глубина равна текущей длине ответа — первый увиденный на этой глубине."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def rightSideView(self, root: Optional[TreeNode]) -> List[int]:\n        if not root:\n            return []\n        res, q = [], deque([root])\n        while q:\n            for i in range(len(q)):\n                node = q.popleft()\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(node.val)         # node — последний узел уровня\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "После внутреннего цикла переменная `node` указывает на последний обработанный узел уровня.",
      "Видимым может оказаться и левый узел, если справа на этом уровне никого нет: `[1,2,3,4]` → `[1,3,4]`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(w)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p102",
   "num": "11.4",
   "title": "102. Binary Tree Level Order Traversal",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Верни значения узлов по уровням: список списков, слева направо."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,9,20,null,null,15,7]` → `[[3],[9,20],[15,7]]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Ровно шаблон из теории."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        res, q = [], deque([root])\n        while q:\n            level = []\n            for _ in range(len(q)):\n                node = q.popleft()\n                level.append(node.val)\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(level)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Пустое дерево — пустой список, а не `[[]]`.",
      "DFS-вариант: передаём глубину и добавляем значение в `res[depth]`, создавая список при первом заходе на уровень."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(w)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p103",
   "num": "11.5",
   "title": "103. Binary Tree Zigzag Level Order Traversal",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Обход по уровням «зигзагом»: первый уровень слева направо, второй справа налево, и так далее."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,9,20,null,null,15,7]` → `[[3],[20,9],[15,7]]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Обходим как обычно, а нечётные уровни разворачиваем перед добавлением в ответ. Порядок добавления детей в очередь не меняем — иначе следующий уровень перепутается."
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nclass Solution:\n    def zigzagLevelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        if not root:\n            return []\n        res, q = [], deque([root])\n        left_to_right = True\n        while q:\n            level = deque()\n            for _ in range(len(q)):\n                node = q.popleft()\n                if left_to_right:\n                    level.append(node.val)\n                else:\n                    level.appendleft(node.val)   # справа налево\n                if node.left:\n                    q.append(node.left)\n                if node.right:\n                    q.append(node.right)\n            res.append(list(level))\n            left_to_right = not left_to_right\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`deque` для уровня позволяет класть значение в нужный конец за O(1), без разворота списка.",
      "Вариант проще: собрать уровень обычным списком и сделать `level.reverse()` на нечётных уровнях — тоже O(n) суммарно."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(w)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "11.6",
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
       "[637. Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/)",
       "Easy",
       "2",
       "BFS по уровням, среднее каждого уровня"
      ],
      [
       "[199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)",
       "Medium",
       "1",
       "последний узел каждого уровня"
      ],
      [
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)",
       "Medium",
       "1",
       "шаблон BFS: размер очереди = размер уровня"
      ],
      [
       "[103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)",
       "Medium",
       "2",
       "BFS по уровням, каждый второй уровень разворачиваем"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "2–3 часа",
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
       "[199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) · Medium",
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Medium"
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
       "[637. Average of Levels in Binary Tree](https://leetcode.com/problems/average-of-levels-in-binary-tree/) · Easy",
       "[103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) · Medium"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Как в BFS понять, где заканчивается уровень?",
   "Почему для очереди нужен `deque`, а не `list`?",
   "Когда BFS выгоднее DFS, а когда наоборот?",
   "Как решить Right Side View обходом в глубину?"
  ]
 }
}
