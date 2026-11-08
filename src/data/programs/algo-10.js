// Блок ноября «Алгособес», глава 10 — Бинарные деревья: обход в глубину (Binary Tree General).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 10,
 "title": "Бинарные деревья: обход в глубину",
 "summary": "Бинарное дерево и его обходы: прямой, симметричный, обратный; рекурсия «спроси детей и собери ответ»; передача состояния вниз и сбор ответа вверх; итеративный обход со стеком; восстановление дерева по обходам; разбор 14 задач от Maximum Depth до Binary Tree Maximum Path Sum.",
 "intro": "Деревья — самая частая тема алгоритмических собеседований после массивов и хеш-таблиц. Хорошая новость: почти все задачи решаются одной схемой — рекурсивной функцией, которая получает ответ от левого и правого поддерева и собирает из них ответ для текущего узла. Научись формулировать, что функция возвращает, — и большинство задач главы займут 5–10 строк.",
 "sections": [
  {
   "id": "tree",
   "num": "10.1",
   "title": "Дерево и рекурсия",
   "blocks": [
    {
     "t": "p",
     "text": "У узла бинарного дерева есть значение и до двух детей: `left` и `right`. Узел без детей — **лист**. **Глубина** узла — расстояние от корня, **высота** дерева — максимальная глубина листа."
    },
    {
     "t": "code",
     "text": "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\n#        1\n#       / \\\n#      2   3\n#     / \\\n#    4   5\nroot = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))\n\ndef preorder(node):   # узел, левое, правое\n    return [node.val] + preorder(node.left) + preorder(node.right) if node else []\n\ndef inorder(node):    # левое, узел, правое\n    return inorder(node.left) + [node.val] + inorder(node.right) if node else []\n\ndef postorder(node):  # левое, правое, узел\n    return postorder(node.left) + postorder(node.right) + [node.val] if node else []\n\nprint(preorder(root), inorder(root), postorder(root))",
     "out": "[1, 2, 4, 5, 3] [4, 2, 5, 1, 3] [4, 5, 2, 3, 1]"
    },
    {
     "t": "h3",
     "text": "Схема рекурсивного решения"
    },
    {
     "t": "ol",
     "items": [
      "**Сформулируй, что возвращает функция** для поддерева с корнем в узле: высоту, сумму, «есть ли путь», «сбалансировано ли».",
      "**База:** что вернуть для пустого дерева (`None`).",
      "**Шаг:** вызвать функцию для левого и правого поддерева и собрать ответ для узла."
     ]
    },
    {
     "t": "table",
     "caption": "Два направления информации",
     "headers": [
      "Направление",
      "Как",
      "Пример"
     ],
     "rows": [
      [
       "сверху вниз",
       "передаём состояние параметром: сумму пути, текущее число, допустимый диапазон",
       "Path Sum, Sum Root to Leaf Numbers, Validate BST"
      ],
      [
       "снизу вверх",
       "функция возвращает значение, родитель его использует",
       "Maximum Depth, Balanced Tree, Maximum Path Sum"
      ]
     ]
    },
    {
     "t": "note",
     "text": "Сложность обхода — O(n): каждый узел посещается один раз. Память — O(h) на стек рекурсии, где h — высота: O(log n) для сбалансированного дерева и O(n) для «вытянутого в линию»."
    }
   ],
   "terms": [
    [
     "лист",
     "узел без детей."
    ],
    [
     "высота дерева",
     "число узлов (или рёбер) на самом длинном пути от корня до листа."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "iterative",
   "num": "10.2",
   "title": "Обход без рекурсии",
   "blocks": [
    {
     "t": "p",
     "text": "Рекурсию всегда можно заменить явным стеком — это спрашивают на собеседованиях и это нужно при очень глубоких деревьях (лимит рекурсии в Python — 1000). Симметричный обход со стеком: идём влево до упора, складывая узлы в стек; снимаем узел, обрабатываем, переходим в его правое поддерево."
    },
    {
     "t": "code",
     "text": "def inorder_iter(root):\n    res, stack, node = [], [], root\n    while stack or node:\n        while node:              # спускаемся влево до упора\n            stack.append(node)\n            node = node.left\n        node = stack.pop()       # самый левый необработанный\n        res.append(node.val)\n        node = node.right        # дальше — его правое поддерево\n    return res\n\nprint(inorder_iter(TreeNode(2, TreeNode(1), TreeNode(3))))",
     "out": "[1, 2, 3]"
    },
    {
     "t": "p",
     "text": "Этот же приём лежит в основе Binary Search Tree Iterator: стек хранит «левую ветку» и выдаёт узлы по одному."
    }
   ],
   "terms": []
  },
  {
   "id": "p104",
   "num": "10.3",
   "title": "104. Maximum Depth of Binary Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди максимальную глубину бинарного дерева — число узлов на самом длинном пути от корня до листа."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,9,20,null,null,15,7]` → `3`"
    },
    {
     "t": "p",
     "text": "**Идея.** Классическая рекурсия снизу вверх: глубина пустого дерева — 0, иначе 1 + максимум глубин поддеревьев."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        return 1 + max(self.maxDepth(root.left), self.maxDepth(root.right))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Функция возвращает глубину поддерева. База — пустое поддерево глубины 0.",
      "Ответ для узла собирается из ответов детей.",
      "Итеративно: BFS по уровням и подсчёт числа уровней (глава 11)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p100",
   "num": "10.4",
   "title": "100. Same Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [100. Same Tree](https://leetcode.com/problems/same-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Проверь, одинаковы ли два дерева: одинаковая структура и значения."
    },
    {
     "t": "p",
     "text": "**Идея.** Два дерева равны, если оба пусты, или оба непусты, корни равны и попарно равны левые и правые поддеревья."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        if not p or not q:\n            return p is q                    # оба None — равны; один None — нет\n        return p.val == q.val and self.isSameTree(p.left, q.left) and self.isSameTree(p.right, q.right)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "База объединяет три случая: оба пусты (True), пусто только одно (False).",
      "`and` останавливает рекурсию на первом несовпадении."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(min(n, m)).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p226",
   "num": "10.5",
   "title": "226. Invert Binary Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Отрази дерево зеркально (поменяй местами левое и правое поддерево каждого узла)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[4,2,7,1,3,6,9]` → `[4,7,2,9,6,3,1]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Зеркало дерева — корень, у которого левым ребёнком стало зеркало правого поддерева, а правым — зеркало левого."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        if root:\n            root.left, root.right = self.invertTree(root.right), self.invertTree(root.left)\n        return root"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Множественное присваивание в Python сначала вычисляет правую часть целиком, поэтому обмен корректен.",
      "Порядок обхода не важен: можно менять детей до рекурсии, после или обходом в ширину."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p101",
   "num": "10.6",
   "title": "101. Symmetric Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Проверь, симметрично ли дерево относительно центра."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,2,2,3,4,4,3]` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Дерево симметрично, если его левое и правое поддеревья — зеркальные отражения друг друга. Два дерева зеркальны, если корни равны, левое первого зеркально правому второго, а правое первого — левому второго."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isSymmetric(self, root: Optional[TreeNode]) -> bool:\n        def mirror(a, b):\n            if not a or not b:\n                return a is b\n            return a.val == b.val and mirror(a.left, b.right) and mirror(a.right, b.left)\n        return mirror(root.left, root.right) if root else True"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Это Same Tree, но с перекрёстным сравнением детей: внешние с внешними, внутренние с внутренними.",
      "Итеративный вариант — очередь пар узлов, которые должны быть зеркальны."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p112",
   "num": "10.7",
   "title": "112. Path Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [112. Path Sum](https://leetcode.com/problems/path-sum/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Есть ли путь от корня до **листа** с суммой значений `targetSum`?"
    },
    {
     "t": "p",
     "text": "**Пример.** `[5,4,8,11,null,13,4,7,2,null,null,null,1], 22` → `true` (5 → 4 → 11 → 2)"
    },
    {
     "t": "p",
     "text": "**Идея.** Передаём вниз остаток суммы: в каждом узле вычитаем его значение. В листе проверяем, что остаток равен значению листа."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def hasPathSum(self, root: Optional[TreeNode], targetSum: int) -> bool:\n        if not root:\n            return False\n        if not root.left and not root.right:       # лист\n            return root.val == targetSum\n        rest = targetSum - root.val\n        return self.hasPathSum(root.left, rest) or self.hasPathSum(root.right, rest)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Это информация «сверху вниз»: остаток суммы — параметр.",
      "Проверка только в листе важна: путь должен заканчиваться в листе, а не в любом узле. Для `[1, 2]` и суммы 1 ответ `false` — узел 1 не лист.",
      "Пустое дерево не содержит путей — `false` даже при `targetSum = 0`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p105",
   "num": "10.8",
   "title": "105. Construct Binary Tree from Preorder and Inorder Traversal",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Восстанови дерево по прямому (preorder) и симметричному (inorder) обходам. Значения уникальны."
    },
    {
     "t": "p",
     "text": "**Пример.** `preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]` → `[3,9,20,null,null,15,7]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Первый элемент preorder — корень. В inorder корень делит массив: слева — узлы левого поддерева, справа — правого. Размер левой части говорит, сколько следующих элементов preorder относятся к левому поддереву. Рекурсивно строим оба поддерева. Индексы корней в inorder заранее кладём в словарь, чтобы искать за O(1)."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def buildTree(self, preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n        index = {v: i for i, v in enumerate(inorder)}\n        it = iter(preorder)                       # корни берём по порядку preorder\n\n        def build(lo, hi):                        # строим дерево из inorder[lo:hi]\n            if lo >= hi:\n                return None\n            val = next(it)\n            mid = index[val]\n            node = TreeNode(val)\n            node.left = build(lo, mid)            # сначала левое — так идёт preorder\n            node.right = build(mid + 1, hi)\n            return node\n\n        return build(0, len(inorder))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Preorder = корень, всё левое поддерево, всё правое. Поэтому, строя сначала левое поддерево, мы забираем из итератора ровно его элементы.",
      "Границы `[lo, hi)` в inorder задают, какие значения попадают в поддерево; пустой отрезок — `None`.",
      "Без словаря поиск корня в inorder — O(n), и в худшем случае всё решение O(n²)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p106",
   "num": "10.9",
   "title": "106. Construct Binary Tree from Inorder and Postorder Traversal",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Восстанови дерево по симметричному (inorder) и обратному (postorder) обходам."
    },
    {
     "t": "p",
     "text": "**Пример.** `inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]` → `[3,9,20,null,null,15,7]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Зеркально предыдущей задаче: postorder = левое, правое, корень. Если читать postorder **с конца**, получим корень, правое поддерево, левое. Поэтому берём корни с конца и строим сначала правое поддерево."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def buildTree(self, inorder: List[int], postorder: List[int]) -> Optional[TreeNode]:\n        index = {v: i for i, v in enumerate(inorder)}\n        stack = postorder[:]                      # pop() берёт корни с конца\n\n        def build(lo, hi):\n            if lo >= hi:\n                return None\n            val = stack.pop()\n            mid = index[val]\n            node = TreeNode(val)\n            node.right = build(mid + 1, hi)       # сначала правое!\n            node.left = build(lo, mid)\n            return node\n\n        return build(0, len(inorder))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Порядок рекурсивных вызовов должен совпадать с порядком, в котором мы читаем корни.",
      "Если построить сначала левое поддерево, оно заберёт корни правого — дерево получится неверным."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p117",
   "num": "10.10",
   "title": "117. Populating Next Right Pointers in Each Node II",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** У каждого узла есть указатель `next`. Заполни его ссылкой на соседа справа на том же уровне (или `None`). Дерево произвольное. В идеале — O(1) памяти."
    },
    {
     "t": "p",
     "text": "**Идея.** BFS по уровням с очередью решает задачу за O(n) памяти. Для O(1): уровень i уже связан через `next`, как связный список. Идём по нему и соединяем детей — это следующий уровень — через фиктивную голову `dummy` и хвост `tail`. Потом переходим на `dummy.next`."
    },
    {
     "t": "code",
     "text": "class Node:\n    def __init__(self, val=0, left=None, right=None, next=None):\n        self.val, self.left, self.right, self.next = val, left, right, next\n\nclass Solution:\n    def connect(self, root: 'Node') -> 'Node':\n        level = root\n        while level:\n            dummy = tail = Node()                # собираем следующий уровень как список\n            node = level\n            while node:                          # идём по текущему уровню через next\n                for child in (node.left, node.right):\n                    if child:\n                        tail.next = child\n                        tail = child\n                node = node.next\n            level = dummy.next                   # начало следующего уровня\n        return root"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Корень — уровень из одного узла, его `next` уже `None`.",
      "Проходя уровень по `next`, мы видим детей в порядке слева направо — подвешиваем их к хвосту нового списка.",
      "Фиктивная голова избавляет от поиска первого ребёнка уровня."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p114",
   "num": "10.11",
   "title": "114. Flatten Binary Tree to Linked List",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Разверни дерево в «связный список» на месте: порядок узлов — прямой обход (preorder), каждый узел ссылается вправо на следующий, `left = None`."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,2,5,3,4,null,6]` → `1→2→3→4→5→6`"
    },
    {
     "t": "p",
     "text": "**Идея.** Для текущего узла с левым поддеревом: в preorder после всего левого поддерева идёт правое. Находим самый правый узел левого поддерева (он последний в его preorder), подвешиваем к нему правое поддерево, переносим левое поддерево вправо, обнуляем `left` и идём дальше вправо. Это O(1) памяти (идея обхода Морриса)."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def flatten(self, root: Optional[TreeNode]) -> None:\n        node = root\n        while node:\n            if node.left:\n                tail = node.left\n                while tail.right:                # последний узел левого поддерева в preorder\n                    tail = tail.right\n                tail.right = node.right          # за ним идёт правое поддерево\n                node.right = node.left\n                node.left = None\n            node = node.right"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "После операции у узла нет левого ребёнка, а порядок preorder сохранён: узел → бывшее левое → бывшее правое.",
      "Дальше обрабатываем следующий узел справа — он мог получить своё левое поддерево, и операция повторится.",
      "Каждое ребро «правой ветки» проходится константное число раз — O(n).",
      "Рекурсивный вариант: обрабатывать узлы в обратном preorder (правое, левое, корень) и подвешивать к каждому предыдущий обработанный."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p129",
   "num": "10.12",
   "title": "129. Sum Root to Leaf Numbers",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Каждый путь от корня до листа образует число из цифр узлов. Найди сумму всех таких чисел."
    },
    {
     "t": "p",
     "text": "**Пример.** `[4,9,0,5,1]` → `1026` (495 + 491 + 40)"
    },
    {
     "t": "p",
     "text": "**Идея.** Передаём вниз текущее число: при переходе в ребёнка `num = num * 10 + val`. В листе число готово — возвращаем его. Ответ для узла — сумма ответов детей."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def sumNumbers(self, root: Optional[TreeNode]) -> int:\n        def dfs(node, num):\n            if not node:\n                return 0\n            num = num * 10 + node.val\n            if not node.left and not node.right:\n                return num\n            return dfs(node.left, num) + dfs(node.right, num)\n        return dfs(root, 0)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Сверху вниз идёт состояние (число по пути), снизу вверх — ответ (сумма).",
      "Для узла с одним ребёнком пустая сторона возвращает 0 и не портит сумму."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p173",
   "num": "10.13",
   "title": "173. Binary Search Tree Iterator",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Реализуй итератор по BST в порядке возрастания: `next()` возвращает следующее число, `hasNext()` — есть ли ещё. Обе операции — O(1) в среднем, память — O(h)."
    },
    {
     "t": "p",
     "text": "**Идея.** Это итеративный симметричный обход из теории, разрезанный на шаги. Стек хранит путь «влево до упора». `next()` снимает вершину — это минимум из оставшихся, и добавляет левую ветку её правого поддерева."
    },
    {
     "t": "code",
     "text": "class BSTIterator:\n    def __init__(self, root: Optional[TreeNode]):\n        self.stack = []\n        self._push_left(root)\n\n    def _push_left(self, node):\n        while node:\n            self.stack.append(node)\n            node = node.left\n\n    def next(self) -> int:\n        node = self.stack.pop()\n        self._push_left(node.right)\n        return node.val\n\n    def hasNext(self) -> bool:\n        return bool(self.stack)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "В стеке не больше h узлов — путь от корня вниз.",
      "Каждый узел попадает в стек и снимается с него ровно один раз за весь обход, поэтому n вызовов `next()` стоят O(n) суммарно — O(1) в среднем.",
      "Сохранить весь обход в список при создании — O(n) памяти, не подходит по условию."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(1) в среднем на next, O(h) в худшем.",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p222",
   "num": "10.14",
   "title": "222. Count Complete Tree Nodes",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [222. Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Посчитай узлы **полного** бинарного дерева (все уровни заполнены, кроме последнего, который заполнен слева) быстрее, чем за O(n)."
    },
    {
     "t": "p",
     "text": "**Идея.** Обычный обход даёт O(n). Используем структуру: если высота по самому левому пути равна высоте по самому правому, дерево идеальное, и узлов `2^h − 1`. Иначе считаем рекурсивно для детей: одно из поддеревьев всегда идеальное, поэтому глубина рекурсии — O(log n), а на каждом уровне — O(log n) работы на измерение высот."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def countNodes(self, root: Optional[TreeNode]) -> int:\n        if not root:\n            return 0\n        lh, node = 0, root\n        while node:                    # высота по левому краю\n            lh += 1\n            node = node.left\n        rh, node = 0, root\n        while node:                    # высота по правому краю\n            rh += 1\n            node = node.right\n        if lh == rh:                   # идеальное дерево\n            return (1 << lh) - 1\n        return 1 + self.countNodes(root.left) + self.countNodes(root.right)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "В полном дереве левый край — самый длинный путь, правый — самый короткий. Если они равны, все уровни заполнены.",
      "Если не равны, рекурсия идёт в оба поддерева, но одно из них идеальное и вернёт ответ за O(log n) без дальнейших вызовов.",
      "`1 << h` — это 2^h."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(log² n).",
      "**Память:** O(log n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p236",
   "num": "10.15",
   "title": "236. Lowest Common Ancestor of a Binary Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди наименьшего общего предка (LCA) двух узлов p и q в бинарном дереве (не BST). Узел считается предком самого себя."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1` → `3`"
    },
    {
     "t": "p",
     "text": "**Идея.** Функция возвращает: `p` или `q`, если нашла один из них в поддереве, LCA, если нашла оба, и `None`, если ничего. Если ответы пришли и из левого, и из правого поддерева, — p и q по разные стороны, текущий узел и есть LCA. Если только с одной стороны — передаём его вверх."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':\n        if not root or root is p or root is q:\n            return root\n        left = self.lowestCommonAncestor(root.left, p, q)\n        right = self.lowestCommonAncestor(root.right, p, q)\n        if left and right:              # p и q в разных поддеревьях\n            return root\n        return left or right"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Если текущий узел — p или q, возвращаем его сразу: даже если второй узел ниже, LCA — именно этот узел.",
      "Оба ответа непустые — узлы разошлись в этом узле.",
      "Один ответ непустой — это либо найденный узел, либо уже найденный LCA, передаём его вверх.",
      "Для BST есть решение проще: идём от корня, пока p и q по одну сторону (глава 12)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p124",
   "num": "10.16",
   "title": "124. Binary Tree Maximum Path Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Путь — последовательность соседних узлов, каждый встречается не больше раза; путь не обязан проходить через корень. Найди максимальную сумму значений пути (значения бывают отрицательными)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[-10,9,20,null,null,15,7]` → `42` (15 → 20 → 7)"
    },
    {
     "t": "p",
     "text": "**Идея.** Различаем две величины. **Возвращаемое значение** функции — лучшая сумма пути, который начинается в узле и идёт вниз в одну сторону (только такой путь можно продолжить родителю). **Ответ** — путь, у которого узел — «вершина»: левая ветка + узел + правая ветка. Отрицательные ветки не берём — заменяем нулём."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        best = float('-inf')\n\n        def gain(node):\n            nonlocal best\n            if not node:\n                return 0\n            left = max(gain(node.left), 0)       # отрицательную ветку не берём\n            right = max(gain(node.right), 0)\n            best = max(best, node.val + left + right)   # путь, изгибающийся в node\n            return node.val + max(left, right)          # путь, продолжаемый родителем\n        gain(root)\n        return best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Путь с «изгибом» в узле (через обе ветки) нельзя вернуть наверх: родитель не может продолжить путь, у которого две стороны.",
      "`max(..., 0)` — если ветка уменьшает сумму, выгоднее её не брать.",
      "`best` стартует с минус бесконечности: если все значения отрицательные, ответ — максимальное значение одного узла.",
      "Та же схема «возвращаем одно, обновляем глобальный ответ другим» решает Diameter of Binary Tree и Longest Univalue Path."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "10.17",
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
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)",
       "Easy",
       "1",
       "глубина = 1 + максимум глубин детей"
      ],
      [
       "[100. Same Tree](https://leetcode.com/problems/same-tree/)",
       "Easy",
       "1",
       "рекурсивное сравнение двух деревьев одновременно"
      ],
      [
       "[226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)",
       "Easy",
       "1",
       "поменять детей местами в каждом узле"
      ],
      [
       "[101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)",
       "Easy",
       "1",
       "сравниваем левое поддерево с зеркалом правого"
      ],
      [
       "[112. Path Sum](https://leetcode.com/problems/path-sum/)",
       "Easy",
       "1",
       "вычитаем значение по пути вниз, проверяем в листе"
      ],
      [
       "[105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)",
       "Medium",
       "2",
       "корень — первый в preorder, делит inorder на левое и правое"
      ],
      [
       "[106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/)",
       "Medium",
       "2",
       "корень — последний в postorder; строим сначала правое"
      ],
      [
       "[117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/)",
       "Medium",
       "2",
       "идём по уровню через уже проставленные next, строим следующий уровень"
      ],
      [
       "[114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/)",
       "Medium",
       "2",
       "правое поддерево подвешиваем к самому правому узлу левого"
      ],
      [
       "[129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/)",
       "Medium",
       "2",
       "передаём вниз число, собранное по пути"
      ],
      [
       "[173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/)",
       "Medium",
       "2",
       "стек «левой ветки» — ленивый симметричный обход"
      ],
      [
       "[222. Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/)",
       "Medium",
       "2",
       "сравнить высоты по левому и правому краю: идеальное поддерево = 2^h − 1"
      ],
      [
       "[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)",
       "Medium",
       "1",
       "вернуть найденный узел; где пришли с двух сторон — там LCA"
      ],
      [
       "[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)",
       "Hard",
       "3",
       "функция возвращает лучший путь вниз, ответ — путь через узел"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "8–10 часов",
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
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Easy",
       "[100. Same Tree](https://leetcode.com/problems/same-tree/) · Easy",
       "[226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) · Easy",
       "[101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) · Easy",
       "[112. Path Sum](https://leetcode.com/problems/path-sum/) · Easy",
       "[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) · Medium"
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
       "[105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) · Medium",
       "[106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) · Medium",
       "[117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/) · Medium",
       "[114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) · Medium",
       "[129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/) · Medium",
       "[173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/) · Medium",
       "[222. Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/) · Medium"
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
       "[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Назови три обхода дерева в глубину и порядок узлов в каждом.",
   "Как сформулировать рекурсивное решение задачи на дереве: что возвращает функция, база и шаг?",
   "Чем отличается передача информации сверху вниз от сбора снизу вверх — приведи по примеру.",
   "Почему в Binary Tree Maximum Path Sum функция возвращает одно, а ответ обновляется другим?",
   "Как восстановить дерево по preorder и inorder и зачем словарь индексов?",
   "Как найти LCA двух узлов в произвольном бинарном дереве?"
  ]
 }
}
