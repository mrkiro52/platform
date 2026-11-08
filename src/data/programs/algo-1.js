// Блок ноября «Алгособес», глава 1 — как нарешивать LeetCode: стратегия, уровни, план и правила.
// Собран скриптом: ссылки на задачи — из официальной подборки LeetCode Top Interview 150.
// Файл без импортов: его грузит и админка.

export default {
 "num": 1,
 "title": "С чего начать: как нарешивать LeetCode",
 "summary": "Почему решать по темам, а не по сложности; неделя 0: О-нотация, структуры данных Python и рекурсия; три уровня подборки Top Interview 150 и план под твоё время — мало, средне, много; топ-10 задач для старта; порядок по неделям; правило 25 минут, интервальное повторение и как решать задачу на собеседовании.",
 "intro": "Алгоритмическая секция есть почти на каждом собеседовании разработчика, а часто и аналитика данных и ML-инженера. Готовиться к ней можно бесконечно — эта глава о том, как готовиться эффективно: что изучить до первой задачи, сколько задач решать в зависимости от того, сколько у тебя времени, в каком порядке идти и как закреплять. Дальше в блоке — главы по каждой теме подборки LeetCode Top Interview 150 с теорией и разбором всех задач.",
 "sections": [
  {
   "id": "why-topics",
   "num": "1.1",
   "title": "Решаем по темам, а не по сложности",
   "blocks": [
    {
     "t": "p",
     "text": "Алгоритмическая секция на собеседовании проверяет не то, сколько задач ты решил, а **узнаёшь ли ты паттерн**: «это sliding window», «это BFS по графу», «здесь нужна хеш-таблица». Поэтому решать нужно **по темам (паттернам)**, а внутри темы двигаться от Easy к Medium."
    },
    {
     "t": "p",
     "text": "Если решать вперемешку по сложности, ты будешь хаотично прыгать между идеями, и ни одна не закрепится. Hard-задачи откладываются на самый конец или пропускаются: на большинстве собеседований уровня junior и middle они редкость."
    },
    {
     "t": "p",
     "text": "Основа блока — подборка [LeetCode Top Interview 150](https://leetcode.com/studyplan/top-interview-150/): 150 задач, которые чаще всего встречаются на собеседованиях, разбитые на 23 темы. Каждой теме посвящена своя глава — со 2-й по 24-ю. В каждой главе: теория паттерна, все задачи подборки по теме (от Easy к Hard) со ссылками, решение на Python и подробный разбор, шпаргалка «признак в условии → приём» и задание."
    },
    {
     "t": "note",
     "text": "Задачи на LeetCode решай на Python 3: решения в главах написаны на нём, а сам язык позволяет думать об алгоритме, а не о синтаксисе. Аккаунт на LeetCode бесплатный, для подборки Top Interview 150 подписка не нужна."
    }
   ],
   "terms": [
    [
     "паттерн",
     "типовой приём решения, который узнаётся по признакам в условии: два указателя, скользящее окно, BFS, динамика."
    ]
   ]
  },
  {
   "id": "week0",
   "num": "1.2",
   "title": "Неделя 0: база перед задачами",
   "blocks": [
    {
     "t": "p",
     "text": "Перед задачами нужно 2–3 дня на базу. Иначе ты будешь застревать на синтаксисе и не сможешь оценить своё решение, а не думать об идее."
    },
    {
     "t": "h3",
     "text": "О-нотация: как оценить время и память"
    },
    {
     "t": "p",
     "text": "O-нотация описывает, как растёт время (или память) решения с ростом входа n, без учёта констант. На собеседовании после каждого решения спросят его сложность — и чаще всего попросят улучшить."
    },
    {
     "t": "table",
     "caption": "Типичные сложности и что за ними стоит",
     "headers": [
      "Сложность",
      "Пример",
      "n = 10⁵ — успеет?"
     ],
     "rows": [
      [
       "O(1)",
       "доступ по индексу, операция со словарём",
       "да"
      ],
      [
       "O(log n)",
       "бинарный поиск, операция с кучей",
       "да"
      ],
      [
       "O(n)",
       "один проход по массиву",
       "да"
      ],
      [
       "O(n log n)",
       "сортировка",
       "да"
      ],
      [
       "O(n²)",
       "два вложенных цикла по массиву",
       "нет: 10¹⁰ операций"
      ],
      [
       "O(2ⁿ), O(n!)",
       "перебор всех подмножеств или перестановок",
       "только для n ≤ 20"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Полезная прикидка: Python выполняет порядка 10⁷ простых операций в секунду. По ограничениям в условии можно угадать ожидаемую сложность: n ≤ 20 — перебор, n ≤ 10³ — O(n²), n ≤ 10⁵–10⁶ — O(n) или O(n log n)."
    },
    {
     "t": "h3",
     "text": "Структуры данных в Python"
    },
    {
     "t": "code",
     "text": "from collections import Counter, defaultdict, deque\nimport heapq\n\n# dict — поиск, вставка и удаление по ключу за O(1) в среднем\nages = {'аня': 21, 'боря': 19}\nages['вова'] = 23\nprint('боря' in ages, ages.get('гриша', 0))\n\n# set — уникальные элементы и проверка «есть ли» за O(1)\nseen = set([3, 1, 3, 2])\nprint(seen, 2 in seen)\n\n# Counter — частоты элементов\nprint(Counter('abracadabra').most_common(2))\n\n# defaultdict — словарь со значением по умолчанию\ngroups = defaultdict(list)\nfor word in ['eat', 'tea', 'tan']:\n    groups[''.join(sorted(word))].append(word)\nprint(dict(groups))\n\n# deque — очередь: добавление и удаление с обоих концов за O(1)\nq = deque([1, 2])\nq.append(3)\nq.appendleft(0)\nprint(q.popleft(), q.pop(), list(q))\n\n# heapq — минимальная куча: минимум за O(1), вставка и извлечение за O(log n)\nh = []\nfor x in [5, 1, 8, 3]:\n    heapq.heappush(h, x)\nprint(heapq.heappop(h), heapq.nsmallest(2, h))",
     "out": "True 0\n{1, 2, 3} True\n[('a', 5), ('b', 2)]\n{'aet': ['eat', 'tea'], 'ant': ['tan']}\n0 3 [1, 2]\n1 [3, 5]"
    },
    {
     "t": "table",
     "caption": "Что выбрать",
     "headers": [
      "Нужно",
      "Структура",
      "Главные операции"
     ],
     "rows": [
      [
       "найти по ключу, посчитать",
       "`dict`, `Counter`, `defaultdict`",
       "O(1) в среднем"
      ],
      [
       "проверить «было ли»",
       "`set`",
       "O(1) в среднем"
      ],
      [
       "очередь, BFS",
       "`collections.deque`",
       "`append`, `popleft` — O(1)"
      ],
      [
       "стек",
       "обычный `list`",
       "`append`, `pop` — O(1)"
      ],
      [
       "минимум «на лету», top-k",
       "`heapq`",
       "push и pop — O(log n)"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Рекурсия"
    },
    {
     "t": "p",
     "text": "Рекурсивная функция вызывает саму себя на меньшей задаче. У неё всегда две части: **база** — когда остановиться, и **шаг** — как свести задачу к меньшей. Деревья, backtracking, «разделяй и властвуй» и динамика держатся на рекурсии."
    },
    {
     "t": "code",
     "text": "def factorial(n):\n    if n <= 1:          # база рекурсии: где остановиться\n        return 1\n    return n * factorial(n - 1)   # шаг: сводим задачу к меньшей\n\ndef fib(n, memo={}):\n    if n <= 1:\n        return n\n    if n not in memo:\n        memo[n] = fib(n - 1) + fib(n - 2)   # без memo — O(2^n), с memo — O(n)\n    return memo[n]\n\nprint(factorial(5), fib(50))",
     "out": "120 12586269025"
    },
    {
     "t": "note",
     "text": "Глубина рекурсии в Python по умолчанию ограничена 1000 вызовами. Для глубоких деревьев и графов либо пиши итеративно со стеком, либо увеличивай лимит `sys.setrecursionlimit`."
    }
   ],
   "terms": [
    [
     "O-нотация",
     "оценка того, как растут время или память алгоритма с ростом входа, без учёта констант."
    ]
   ]
  },
  {
   "id": "levels",
   "num": "1.3",
   "title": "Сколько задач нужно: три уровня",
   "blocks": [
    {
     "t": "p",
     "text": "Не всем нужно 150 задач. Все задачи подборки разбиты на три уровня — в каждой главе у задачи стоит её уровень."
    },
    {
     "t": "table",
     "caption": "Уровни подборки",
     "headers": [
      "Уровень",
      "Задач",
      "Что даёт"
     ],
     "rows": [
      [
       "1 — золотой минимум",
       "57",
       "хватает на большинство собеседований уровня junior и middle; 6–8 недель"
      ],
      [
       "2 — уверенный",
       "+64",
       "остальные Medium из тех же тем: Rotate Array, Jump Game II, Gas Station, Spiral Matrix, Rotate Image, Course Schedule II, Trie, Word Search, Edit Distance и другие"
      ],
      [
       "3 — всё",
       "+29",
       "Hard и экзотика: Text Justification, Basic Calculator, IPO, Construct Quad Tree, Max Points on a Line, Stock III/IV, Median of Two Sorted Arrays, Word Search II. Битовые операции и математика — тоже здесь, кроме Single Number: её стоит знать"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Уровень 1 по темам"
    },
    {
     "t": "table",
     "caption": "57 задач золотого минимума",
     "headers": [
      "Тема",
      "Задачи"
     ],
     "rows": [
      [
       "Массивы",
       "[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/), [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/), [169. Majority Element](https://leetcode.com/problems/majority-element/), [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/), [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/), [55. Jump Game](https://leetcode.com/problems/jump-game/), [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/)"
      ],
      [
       "Хеш-таблица",
       "[1. Two Sum](https://leetcode.com/problems/two-sum/), [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/), [383. Ransom Note](https://leetcode.com/problems/ransom-note/), [219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/), [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/), [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)"
      ],
      [
       "Два указателя",
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/), [392. Is Subsequence](https://leetcode.com/problems/is-subsequence/), [167. Two Sum II - Input Array Is Sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/), [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/), [15. 3Sum](https://leetcode.com/problems/3sum/)"
      ],
      [
       "Скользящее окно",
       "[209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/), [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)"
      ],
      [
       "Стек",
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/), [155. Min Stack](https://leetcode.com/problems/min-stack/), [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/)"
      ],
      [
       "Бинарный поиск",
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/), [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/), [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)"
      ],
      [
       "Связные списки",
       "[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/), [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/), [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/), [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/), [146. LRU Cache](https://leetcode.com/problems/lru-cache/)"
      ],
      [
       "Интервалы",
       "[56. Merge Intervals](https://leetcode.com/problems/merge-intervals/), [57. Insert Interval](https://leetcode.com/problems/insert-interval/)"
      ],
      [
       "Деревья",
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/), [100. Same Tree](https://leetcode.com/problems/same-tree/), [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/), [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/), [112. Path Sum](https://leetcode.com/problems/path-sum/), [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/), [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/), [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/), [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/), [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)"
      ],
      [
       "Графы",
       "[200. Number of Islands](https://leetcode.com/problems/number-of-islands/), [133. Clone Graph](https://leetcode.com/problems/clone-graph/), [207. Course Schedule](https://leetcode.com/problems/course-schedule/)"
      ],
      [
       "Куча",
       "[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/)"
      ],
      [
       "Backtracking",
       "[46. Permutations](https://leetcode.com/problems/permutations/), [39. Combination Sum](https://leetcode.com/problems/combination-sum/), [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)"
      ],
      [
       "Kadane",
       "[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)"
      ],
      [
       "DP",
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/), [198. House Robber](https://leetcode.com/problems/house-robber/), [322. Coin Change](https://leetcode.com/problems/coin-change/), [139. Word Break](https://leetcode.com/problems/word-break/), [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/), [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)"
      ]
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "time",
   "num": "1.4",
   "title": "План под твоё время: мало, средне, много",
   "blocks": [
    {
     "t": "table",
     "caption": "Выбери свой режим",
     "headers": [
      "Сколько времени",
      "Что решать",
      "Темп"
     ],
     "rows": [
      [
       "**мало** — 2–3 недели до собеседования",
       "топ-10 для старта, затем экспресс-набор из 20 задач ниже — всего 30",
       "2 задачи в день, повторение каждой через 1 и 3 дня"
      ],
      [
       "**средне** — 1,5–2 месяца",
       "весь уровень 1 (57 задач) по плану из раздела 1.6",
       "1–2 задачи в день, неделя на 1–2 темы"
      ],
      [
       "**много** — 3 месяца и больше",
       "уровень 1, затем уровень 2 по тем же темам (121 задача), затем уровень 3 выборочно",
       "после уровня 1 — второй круг по темам с задачами уровня 2, Hard в конце"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Если времени мало: экспресс-набор"
    },
    {
     "t": "p",
     "text": "После топ-10 реши эти 20 задач: они закрывают самые частые на собеседованиях паттерны среднего уровня."
    },
    {
     "t": "ol",
     "items": [
      "[238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) · Medium · глава 2",
      "[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/) · Medium · глава 6",
      "[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) · Medium · глава 6",
      "[15. 3Sum](https://leetcode.com/problems/3sum/) · Medium · глава 3",
      "[11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/) · Medium · глава 3",
      "[3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium · глава 4",
      "[155. Min Stack](https://leetcode.com/problems/min-stack/) · Medium · глава 8",
      "[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) · Medium · глава 19",
      "[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) · Medium · глава 9",
      "[146. LRU Cache](https://leetcode.com/problems/lru-cache/) · Medium · глава 9",
      "[56. Merge Intervals](https://leetcode.com/problems/merge-intervals/) · Medium · глава 7",
      "[226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) · Easy · глава 10",
      "[98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) · Medium · глава 12",
      "[236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) · Medium · глава 10",
      "[200. Number of Islands](https://leetcode.com/problems/number-of-islands/) · Medium · глава 13",
      "[207. Course Schedule](https://leetcode.com/problems/course-schedule/) · Medium · глава 13",
      "[215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) · Medium · глава 20",
      "[46. Permutations](https://leetcode.com/problems/permutations/) · Medium · глава 16",
      "[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) · Medium · глава 18",
      "[322. Coin Change](https://leetcode.com/problems/coin-change/) · Medium · глава 23"
     ]
    },
    {
     "t": "p",
     "text": "Когда времени совсем мало, не решай новые задачи в последние 2–3 дня — перерешивай уже решённые и проговаривай их вслух."
    },
    {
     "t": "h3",
     "text": "Если времени средне"
    },
    {
     "t": "p",
     "text": "Иди по плану из раздела 1.6: каждая неделя — одна-две темы, внутри темы — от Easy к Medium, только задачи уровня 1. С 4–5-й недели добавь мок-собеседования раз в неделю."
    },
    {
     "t": "h3",
     "text": "Если времени много"
    },
    {
     "t": "p",
     "text": "Сначала тот же план на уровне 1 — это скелет. Потом второй круг по темам: задачи уровня 2 из тех же глав. Hard (уровень 3) — в самом конце и выборочно: Trapping Rain Water, Merge k Sorted Lists, Word Ladder и Median of Two Sorted Arrays спрашивают чаще остальных. Параллельно раз в неделю — мок-собеседования и повторение старых тем."
    }
   ],
   "terms": []
  },
  {
   "id": "top10",
   "num": "1.5",
   "title": "Топ-10 задач для старта",
   "blocks": [
    {
     "t": "p",
     "text": "Каждая задача закрывает отдельный базовый паттерн. После этой десятки у тебя есть «скелет», на который ложится всё остальное."
    },
    {
     "t": "table",
     "caption": "Начни с них",
     "headers": [
      "Задача",
      "Сложность",
      "Паттерн",
      "Разбор"
     ],
     "rows": [
      [
       "[1. Two Sum](https://leetcode.com/problems/two-sum/)",
       "Easy",
       "хеш-таблица",
       "глава 6"
      ],
      [
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)",
       "Easy",
       "подсчёт частот",
       "глава 6"
      ],
      [
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)",
       "Easy",
       "два указателя",
       "глава 3"
      ],
      [
       "[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)",
       "Easy",
       "один проход с минимумом",
       "глава 2"
      ],
      [
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)",
       "Easy",
       "стек",
       "глава 8"
      ],
      [
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)",
       "Easy",
       "бинарный поиск",
       "глава 19"
      ],
      [
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)",
       "Easy",
       "связный список",
       "глава 9"
      ],
      [
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)",
       "Easy",
       "рекурсия, DFS по дереву",
       "глава 10"
      ],
      [
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)",
       "Medium",
       "BFS через очередь",
       "глава 11"
      ],
      [
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)",
       "Easy",
       "первая динамика",
       "глава 23"
      ]
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "weeks",
   "num": "1.6",
   "title": "Порядок по неделям (уровень 1)",
   "blocks": [
    {
     "t": "table",
     "caption": "План на 8 недель",
     "headers": [
      "Неделя",
      "Темы",
      "Главы",
      "Задач уровня 1"
     ],
     "rows": [
      [
       "1",
       "Массивы и хеш-таблицы",
       "2, 6",
       "13"
      ],
      [
       "2",
       "Два указателя и скользящее окно",
       "3, 4",
       "7"
      ],
      [
       "3",
       "Стек и бинарный поиск",
       "8, 19",
       "6"
      ],
      [
       "4",
       "Связные списки и интервалы",
       "9, 7",
       "7"
      ],
      [
       "5",
       "Деревья: DFS, затем BFS, затем BST",
       "10, 11, 12",
       "10"
      ],
      [
       "6",
       "Графы и куча",
       "13, 20",
       "4"
      ],
      [
       "7",
       "Backtracking",
       "16",
       "3"
      ],
      [
       "8",
       "DP и повторение",
       "23, 24, 18",
       "7"
      ]
     ]
    },
    {
     "t": "p",
     "text": "Темы Матрицы, Trie, Разделяй и властвуй, Графы BFS, Битовые операции и Математика не входят в уровень 1: к ним переходи на втором круге."
    }
   ],
   "terms": []
  },
  {
   "id": "rules",
   "num": "1.7",
   "title": "Правила, которые работают",
   "blocks": [
    {
     "t": "ol",
     "items": [
      "**Правило 25 минут.** Если идеи нет за 25 минут, открой разбор, пойми его и напиши решение сам с нуля, не копируя.",
      "**Повторение через 1, 3 и 7 дней.** Задачу, решённую с подсказкой, нужно перерешать позже. Это даёт больше, чем 10 новых задач.",
      "**Проговаривай вслух.** Сначала словами опиши подход и сложность, потом пиши код. На собеседовании оценивают именно это.",
      "**Конспект паттернов.** Для каждой задачи — одна строка: «какой признак в условии → какой приём». В конце каждой главы есть такая шпаргалка — сверяйся с ней.",
      "**Мок-собеседования.** С 4–5-й недели раз в неделю в парах: один — интервьюер, другой решает задачу, которую не видел."
     ]
    },
    {
     "t": "h3",
     "text": "Как решать задачу на собеседовании"
    },
    {
     "t": "flow",
     "steps": [
      "Уточни условие и ограничения",
      "Разбери 1–2 примера руками",
      "Назови простое решение и его сложность",
      "Найди паттерн и улучши",
      "Напиши код, проговаривая",
      "Прогони пример и краевые случаи",
      "Назови итоговую сложность"
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Краевые случаи**, которые стоит проверить всегда: пустой вход, один элемент, все элементы одинаковые, отрицательные числа, очень большой вход.",
      "**Не молчи.** Если застрял, рассказывай, что пробуешь: интервьюер часто подсказывает, если видит ход мысли.",
      "**Простое решение — не провал.** Назвать перебор и честно его оценить лучше, чем молча искать идеальное решение."
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "1 неделя",
  "format": "решения на LeetCode и конспект паттернов",
  "situation": [
   "Подготовь фундамент: пройди неделю 0 и реши топ-10 задач для старта."
  ],
  "parts": [
   {
    "title": "Неделя 0",
    "time": "2–3 дня",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "Заведи аккаунт на LeetCode и открой подборку [Top Interview 150](https://leetcode.com/studyplan/top-interview-150/).",
       "Повтори О-нотацию и структуры `dict`, `set`, `deque`, `Counter`, `defaultdict`, `heapq` по разделу 1.2 — запусти примеры сам.",
       "Выбери режим из раздела 1.4 (мало, средне или много времени) и запиши свой план по неделям."
      ]
     }
    ]
   },
   {
    "title": "Топ-10",
    "time": "3–4 дня",
    "blocks": [
     {
      "t": "ol",
      "items": [
       "[1. Two Sum](https://leetcode.com/problems/two-sum/) — хеш-таблица",
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) — подсчёт частот",
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) — два указателя",
       "[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) — один проход с минимумом",
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) — стек",
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) — бинарный поиск",
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) — связный список",
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) — рекурсия, DFS по дереву",
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) — BFS через очередь",
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) — первая динамика"
      ]
     }
    ]
   },
   {
    "title": "Конспект и трекер",
    "blocks": [
     {
      "t": "p",
      "text": "Заведи таблицу: задача, дата, решил сам или с подсказкой, приём одной строкой, даты повторения (через 1, 3 и 7 дней). Заполняй её для каждой задачи блока."
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух:",
  "selfCheck": [
   "Какая сложность у поиска элемента в `list` и в `set` и почему?",
   "Как по ограничениям в условии (n ≤ 10⁵) понять, какая сложность решения нужна?",
   "Почему решать по темам эффективнее, чем по сложности?",
   "Какой режим подготовки ты выбрал и сколько задач решаешь в неделю?"
  ]
 }
}
