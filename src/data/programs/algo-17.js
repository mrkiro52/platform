// Блок ноября «Алгособес», глава 17 — Разделяй и властвуй (Divide & Conquer).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 17,
 "title": "Разделяй и властвуй",
 "summary": "Разделяй и властвуй: разбить задачу на независимые части, решить рекурсивно, объединить; основная теорема на пальцах — O(n log n) для двух половин и линейного слияния; сортировка слиянием на массиве и на связном списке; разбор задач Convert Sorted Array to BST, Sort List, Construct Quad Tree и Merge k Sorted Lists.",
 "intro": "Приём «разделяй и властвуй» знаком по сортировке слиянием и бинарному поиску: задача делится на части того же вида, части решаются рекурсивно, а результаты объединяются. Главное на собеседовании — правильно оценить сложность такого решения и не забыть базу рекурсии.",
 "sections": [
  {
   "id": "dc",
   "num": "17.1",
   "title": "Схема и сложность",
   "blocks": [
    {
     "t": "ol",
     "items": [
      "**Разделить** задачу на подзадачи того же вида (обычно на две половины).",
      "**Решить** подзадачи рекурсивно; маленькие решаются напрямую — база.",
      "**Объединить** решения подзадач в ответ."
     ]
    },
    {
     "t": "p",
     "text": "Сложность удобно считать по дереву рекурсии. Сортировка слиянием: на каждом уровне суммарно сливается n элементов, уровней log n — итого O(n log n). Формально это рекуррентность `T(n) = 2T(n/2) + O(n)`."
    },
    {
     "t": "table",
     "caption": "Частые рекуррентности",
     "headers": [
      "Рекуррентность",
      "Пример",
      "Сложность"
     ],
     "rows": [
      [
       "T(n) = T(n/2) + O(1)",
       "бинарный поиск",
       "O(log n)"
      ],
      [
       "T(n) = 2T(n/2) + O(1)",
       "обход сбалансированного дерева",
       "O(n)"
      ],
      [
       "T(n) = 2T(n/2) + O(n)",
       "сортировка слиянием",
       "O(n log n)"
      ],
      [
       "T(n) = T(n − 1) + O(n)",
       "быстрая сортировка в худшем случае",
       "O(n²)"
      ]
     ]
    },
    {
     "t": "code",
     "text": "def merge_sort(a):\n    if len(a) <= 1:                         # база\n        return a\n    mid = len(a) // 2\n    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])   # разделить и решить\n    res, i, j = [], 0, 0\n    while i < len(left) and j < len(right):  # объединить: слияние за O(n)\n        if left[i] <= right[j]:\n            res.append(left[i]); i += 1\n        else:\n            res.append(right[j]); j += 1\n    return res + left[i:] + right[j:]\n\nprint(merge_sort([5, 2, 9, 1, 5, 6]))",
     "out": "[1, 2, 5, 5, 6, 9]"
    }
   ],
   "terms": [
    [
     "рекуррентность",
     "формула, выражающая время работы через время работы на меньших входах."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "p108",
   "num": "17.2",
   "title": "108. Convert Sorted Array to Binary Search Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Преврати отсортированный массив в сбалансированное по высоте BST."
    },
    {
     "t": "p",
     "text": "**Пример.** `[-10,-3,0,5,9]` → например `[0,-3,9,-10,null,5]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Чтобы дерево было сбалансированным, в корне должна стоять середина: слева и справа окажется поровну элементов. Левая половина массива — левое поддерево, правая — правое; рекурсивно делаем то же самое."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def sortedArrayToBST(self, nums: List[int]) -> Optional[TreeNode]:\n        def build(lo, hi):                    # nums[lo:hi]\n            if lo >= hi:\n                return None\n            mid = (lo + hi) // 2\n            return TreeNode(nums[mid], build(lo, mid), build(mid + 1, hi))\n        return build(0, len(nums))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Свойство BST выполняется автоматически: всё левее середины меньше, правее — больше.",
      "Размеры половин отличаются не больше чем на 1 — дерево сбалансировано.",
      "Передаём индексы, а не срезы: срезы копируют массив и дают O(n log n) по времени."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(log n) на рекурсию."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p148",
   "num": "17.3",
   "title": "148. Sort List",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [148. Sort List](https://leetcode.com/problems/sort-list/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Отсортируй связный список за O(n log n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `4→2→1→3` → `1→2→3→4`"
    },
    {
     "t": "p",
     "text": "**Идея.** Для списков лучше всего подходит сортировка слиянием: слияние двух отсортированных списков мы уже умеем (Merge Two Sorted Lists), а середину находим быстрым и медленным указателями. Разрезаем список пополам, сортируем половины рекурсивно, сливаем."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        if not head or not head.next:\n            return head\n        slow, fast = head, head.next          # slow остановится в конце первой половины\n        while fast and fast.next:\n            slow, fast = slow.next, fast.next.next\n        second = slow.next\n        slow.next = None                      # разрезали\n        left, right = self.sortList(head), self.sortList(second)\n        dummy = tail = ListNode()\n        while left and right:                 # слияние\n            if left.val <= right.val:\n                tail.next, left = left, left.next\n            else:\n                tail.next, right = right, right.next\n            tail = tail.next\n        tail.next = left or right\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`fast = head.next` при старте важен: для списка из двух узлов `slow` останется на первом, и список разрежется на 1 + 1. Иначе рекурсия на двух узлах не закончится.",
      "Быстрая сортировка для списков хуже: нет случайного доступа к опорному элементу, худший случай O(n²).",
      "Сортировка слиянием снизу вверх (сливать куски длины 1, 2, 4, …) даёт O(1) памяти — это и есть решение «follow-up» в условии."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n log n).",
      "**Память:** O(log n) на рекурсию."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p427",
   "num": "17.4",
   "title": "427. Construct Quad Tree",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 3 · всё · [427. Construct Quad Tree](https://leetcode.com/problems/construct-quad-tree/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Построй квадродерево для матрицы n × n из нулей и единиц (n — степень двойки). Если все значения квадрата одинаковы — это лист с этим значением, иначе узел с четырьмя детьми для четвертей."
    },
    {
     "t": "p",
     "text": "**Идея.** Классический «разделяй и властвуй»: рекурсивно строим деревья для четырёх четвертей. Если все четыре — листья с одинаковым значением, объединяем их в один лист. Так проверка однородности не требует отдельного прохода по квадрату."
    },
    {
     "t": "code",
     "text": "class Node:\n    def __init__(self, val, isLeaf, topLeft=None, topRight=None, bottomLeft=None, bottomRight=None):\n        self.val, self.isLeaf = val, isLeaf\n        self.topLeft, self.topRight = topLeft, topRight\n        self.bottomLeft, self.bottomRight = bottomLeft, bottomRight\n\nclass Solution:\n    def construct(self, grid: List[List[int]]) -> 'Node':\n        def build(r, c, size):\n            if size == 1:\n                return Node(grid[r][c] == 1, True)\n            h = size // 2\n            kids = [build(r, c, h), build(r, c + h, h), build(r + h, c, h), build(r + h, c + h, h)]\n            if all(k.isLeaf for k in kids) and len({k.val for k in kids}) == 1:\n                return Node(kids[0].val, True)           # четыре одинаковых листа — один лист\n            return Node(True, False, *kids)\n        return build(0, 0, len(grid))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "База — клетка 1 × 1, всегда лист.",
      "Объединение снизу вверх: однородный квадрат обнаруживается по четырём одинаковым листьям — без повторного сканирования.",
      "Каждая клетка участвует в одном листе нижнего уровня, а узлов всего O(n²) — итого O(n²).",
      "Значение `val` у внутренних узлов не важно по условию — ставим `True`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n²).",
      "**Память:** O(log n) на рекурсию."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p23",
   "num": "17.5",
   "title": "23. Merge k Sorted Lists",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Слей k отсортированных связных списков в один."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1→4→5, 1→3→4, 2→6]` → `1→1→2→3→4→4→5→6`"
    },
    {
     "t": "p",
     "text": "**Идея.** Последовательно сливать списки в один — O(k·N): ранние элементы перекладываются k раз. Разделяй и властвуй: сливаем списки попарно — 1 с 2, 3 с 4 и так далее, потом получившиеся пары. Уровней log k, на каждом суммарно N элементов — O(N log k). Тот же результат даёт куча из k текущих голов (глава 20)."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n        def merge(a, b):\n            dummy = tail = ListNode()\n            while a and b:\n                if a.val <= b.val:\n                    tail.next, a = a, a.next\n                else:\n                    tail.next, b = b, b.next\n                tail = tail.next\n            tail.next = a or b\n            return dummy.next\n\n        if not lists:\n            return None\n        step = 1\n        while step < len(lists):                 # сливаем пары на расстоянии step\n            for i in range(0, len(lists) - step, step * 2):\n                lists[i] = merge(lists[i], lists[i + step])\n            step *= 2\n        return lists[0]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "На каждом проходе число непустых «слотов» уменьшается вдвое, проходов — ⌈log₂ k⌉.",
      "Каждый узел за проход перемещается один раз, итого O(N log k), N — общее число узлов.",
      "Решение кучей: положить `(val, i, node)` для голов всех списков, вынимать минимум и класть следующий узел из того же списка. Индекс i в кортеже нужен, чтобы Python не сравнивал узлы при равных значениях."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(N log k).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "17.6",
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
       "[108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)",
       "Easy",
       "2",
       "корень — середина массива, половины — поддеревья"
      ],
      [
       "[148. Sort List](https://leetcode.com/problems/sort-list/)",
       "Medium",
       "2",
       "сортировка слиянием: середина быстрым и медленным указателями"
      ],
      [
       "[427. Construct Quad Tree](https://leetcode.com/problems/construct-quad-tree/)",
       "Medium",
       "3",
       "квадрант однородный — лист, иначе четыре ребёнка"
      ],
      [
       "[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)",
       "Hard",
       "3",
       "попарное слияние (разделяй и властвуй) или куча"
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
       "[108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) · Easy",
       "[148. Sort List](https://leetcode.com/problems/sort-list/) · Medium"
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
       "[427. Construct Quad Tree](https://leetcode.com/problems/construct-quad-tree/) · Medium",
       "[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Из каких трёх шагов состоит «разделяй и властвуй»?",
   "Почему сортировка слиянием работает за O(n log n)? Нарисуй дерево рекурсии.",
   "Почему для сортировки связного списка выбирают слияние, а не быструю сортировку?",
   "Почему попарное слияние k списков быстрее последовательного?"
  ]
 }
}
