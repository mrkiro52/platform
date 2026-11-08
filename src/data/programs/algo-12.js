// Блок ноября «Алгособес», глава 12 — Бинарное дерево поиска (Binary Search Tree).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 12,
 "title": "Бинарное дерево поиска",
 "summary": "Бинарное дерево поиска: свойство BST, поиск, вставка и сложность O(h); симметричный обход даёт отсортированную последовательность; проверка корректности через допустимый диапазон; разбор задач Minimum Absolute Difference in BST, Kth Smallest Element in a BST и Validate Binary Search Tree.",
 "intro": "Бинарное дерево поиска (BST) — дерево, в котором для каждого узла все значения слева меньше, а справа больше. Из этого свойства следуют два главных приёма: поиск идёт по одной ветке, как бинарный поиск, а симметричный обход выдаёт значения по возрастанию. Почти любая задача на BST решается одним из этих двух приёмов.",
 "sections": [
  {
   "id": "bst",
   "num": "12.1",
   "title": "Свойство BST и что из него следует",
   "blocks": [
    {
     "t": "p",
     "text": "Для каждого узла: все значения в **левом поддереве** меньше значения узла, все в **правом** — больше. Важно: именно во всём поддереве, а не только у непосредственных детей."
    },
    {
     "t": "code",
     "text": "def search(node, target):\n    while node and node.val != target:\n        node = node.left if target < node.val else node.right   # отбрасываем половину\n    return node\n\ndef insert(node, val):\n    if not node:\n        return TreeNode(val)\n    if val < node.val:\n        node.left = insert(node.left, val)\n    else:\n        node.right = insert(node.right, val)\n    return node\n\nroot = None\nfor v in [5, 3, 8, 1, 4]:\n    root = insert(root, v)\nprint(tree_list(root), search(root, 4).val, search(root, 7))",
     "out": "[5, 3, 8, 1, 4] 4 None"
    },
    {
     "t": "table",
     "caption": "Свойства",
     "headers": [
      "Операция",
      "Сложность",
      "Комментарий"
     ],
     "rows": [
      [
       "поиск, вставка, удаление",
       "O(h)",
       "h = O(log n) в сбалансированном дереве, O(n) в вырожденном"
      ],
      [
       "симметричный обход",
       "O(n)",
       "выдаёт значения **по возрастанию**"
      ],
      [
       "минимум / максимум",
       "O(h)",
       "самый левый / самый правый узел"
      ]
     ]
    },
    {
     "t": "note",
     "text": "Вставка отсортированных чисел даёт «палку» высоты n — все операции становятся O(n). Поэтому в реальных системах используют самобалансирующиеся деревья (красно-чёрные, AVL), которые держат высоту O(log n). Их реализацию на собеседованиях почти не спрашивают, но знать о них стоит."
    }
   ],
   "terms": [
    [
     "BST",
     "Binary Search Tree, бинарное дерево поиска."
    ],
    [
     "вырожденное дерево",
     "дерево, у каждого узла которого не больше одного ребёнка; по сути связный список."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "p530",
   "num": "12.2",
   "title": "530. Minimum Absolute Difference in BST",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди минимальную разность между значениями любых двух узлов BST."
    },
    {
     "t": "p",
     "text": "**Пример.** `[4,2,6,1,3]` → `1`"
    },
    {
     "t": "p",
     "text": "**Идея.** Минимальная разность в отсортированной последовательности достигается на соседних элементах. Симметричный обход BST и есть отсортированная последовательность — сравниваем каждое значение с предыдущим."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:\n        best = float('inf')\n        prev = None\n\n        def inorder(node):\n            nonlocal best, prev\n            if not node:\n                return\n            inorder(node.left)\n            if prev is not None:\n                best = min(best, node.val - prev)\n            prev = node.val\n            inorder(node.right)\n\n        inorder(root)\n        return best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Не нужно сравнивать все пары — только соседей в отсортированном порядке.",
      "Храним только предыдущее значение — массив всех значений не нужен.",
      "`prev is not None` вместо `if prev`: значение 0 — валидное."
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
   "id": "p230",
   "num": "12.3",
   "title": "230. Kth Smallest Element in a BST",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди k-й по величине (с наименьшего, с 1) элемент в BST."
    },
    {
     "t": "p",
     "text": "**Пример.** `[5,3,6,2,4,null,null,1], k = 3` → `3`"
    },
    {
     "t": "p",
     "text": "**Идея.** Симметричный обход выдаёт значения по возрастанию — k-е выданное значение и есть ответ. Итеративный обход со стеком позволяет остановиться сразу, не обходя всё дерево."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        stack, node = [], root\n        while True:\n            while node:\n                stack.append(node)\n                node = node.left\n            node = stack.pop()\n            k -= 1\n            if k == 0:\n                return node.val\n            node = node.right"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Обходим только то, что нужно: O(h + k) вместо O(n).",
      "Продолжение на собеседовании: «дерево часто меняется, а k-й элемент спрашивают постоянно» — храним в каждом узле размер его поддерева; тогда поиск идёт по одной ветке за O(h)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(h + k).",
      "**Память:** O(h)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p98",
   "num": "12.4",
   "title": "98. Validate Binary Search Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Проверь, является ли бинарное дерево корректным BST (значения строго упорядочены)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[5,1,4,null,null,3,6]` → `false` (3 в правом поддереве 5)"
    },
    {
     "t": "p",
     "text": "**Идея.** Сравнивать узел только с детьми недостаточно: значение должно быть в диапазоне, заданном **всеми** предками. Передаём вниз границы: идём влево — верхняя граница становится значением узла, вправо — нижняя."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        def valid(node, low, high):\n            if not node:\n                return True\n            if not (low < node.val < high):\n                return False\n            return valid(node.left, low, node.val) and valid(node.right, node.val, high)\n        return valid(root, float('-inf'), float('inf'))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Контрпример для проверки «только с детьми»: `[5,4,6,null,null,3,7]` — у узла 6 дети 3 и 7 в порядке, но 3 меньше корня 5.",
      "Границы — информация «сверху вниз», как в Path Sum.",
      "Альтернатива: симметричный обход должен давать строго возрастающую последовательность — сравниваем с предыдущим значением."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(h)."
     ]
    },
    {
     "t": "note",
     "text": "**Где ошибаются.** Нестрогие сравнения `<=` пропустят дубликаты: в этой задаче BST без повторов."
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "12.5",
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
       "[530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/)",
       "Easy",
       "2",
       "симметричный обход: минимум разности соседних значений"
      ],
      [
       "[230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)",
       "Medium",
       "1",
       "симметричный обход до k-го узла"
      ],
      [
       "[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/)",
       "Medium",
       "1",
       "передаём вниз допустимый диапазон (low, high)"
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
       "[230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) · Medium",
       "[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) · Medium"
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
       "[530. Minimum Absolute Difference in BST](https://leetcode.com/problems/minimum-absolute-difference-in-bst/) · Easy"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Сформулируй свойство BST. Почему недостаточно сравнивать узел только с его детьми?",
   "Почему симметричный обход BST выдаёт значения по возрастанию?",
   "Какая сложность поиска в BST и когда она становится O(n)?",
   "Как найти k-й наименьший элемент, не обходя всё дерево?"
  ]
 }
}
