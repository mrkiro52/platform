// Блок ноября «Алгособес», глава 16 — Перебор с возвратом (backtracking) (Backtracking).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 16,
 "title": "Перебор с возвратом (backtracking)",
 "summary": "Перебор с возвратом: дерево решений, шаблон «выбрать — рекурсия — отменить»; сочетания, перестановки и подмножества; отсечение заведомо плохих веток; повторное использование элементов; разбор задач Letter Combinations, Combinations, Permutations, Combination Sum, Generate Parentheses, Word Search и N-Queens II.",
 "intro": "Backtracking — это аккуратный полный перебор: строим ответ по шагу, и если очередной шаг привёл в тупик, откатываемся и пробуем другой вариант. Задачи узнаются по словам «все варианты», «все комбинации», «все перестановки», «расставить так, чтобы». Сложность почти всегда экспоненциальная — это нормально, ведь ответов экспоненциально много. Задача — не перебирать лишнего.",
 "sections": [
  {
   "id": "template",
   "num": "16.1",
   "title": "Шаблон перебора с возвратом",
   "blocks": [
    {
     "t": "p",
     "text": "Перебор удобно представлять **деревом решений**: в корне — пустой ответ, каждое ребро — один выбор, листья — готовые ответы. Backtracking обходит это дерево в глубину. Текущий путь хранится в одном списке: перед спуском делаем выбор (`append`), после возврата — отменяем (`pop`)."
    },
    {
     "t": "code",
     "text": "def subsets(nums):\n    res, path = [], []\n\n    def backtrack(start):\n        res.append(path[:])            # каждый узел дерева — подмножество (копия!)\n        for i in range(start, len(nums)):\n            path.append(nums[i])       # выбрать\n            backtrack(i + 1)           # рекурсия: дальше только правее i\n            path.pop()                 # отменить\n\n    backtrack(0)\n    return res\n\nprint(subsets([1, 2, 3]))",
     "out": "[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]"
    },
    {
     "t": "note",
     "text": "В ответ кладём **копию** `path[:]`: сам список `path` продолжит меняться, и без копии все ответы в итоге окажутся пустыми."
    },
    {
     "t": "table",
     "caption": "Три базовые задачи",
     "headers": [
      "Что перебираем",
      "Как ограничиваем выбор",
      "Число ответов"
     ],
     "rows": [
      [
       "подмножества",
       "следующий элемент правее предыдущего (`start = i + 1`)",
       "2ⁿ"
      ],
      [
       "сочетания по k",
       "то же + останавливаемся при `len(path) == k`",
       "C(n, k)"
      ],
      [
       "перестановки",
       "любой ещё не использованный элемент (`used`)",
       "n!"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Отсечение"
    },
    {
     "t": "p",
     "text": "Главная оптимизация — не заходить в ветки, где ответа точно нет: сумма уже превысила цель, закрывающих скобок больше открывающих, клетка уже занята ферзём. Хорошее отсечение превращает перебор миллиардов вариантов в тысячи."
    }
   ],
   "terms": [
    [
     "дерево решений",
     "дерево, где каждый путь от корня — последовательность выборов, а листья — кандидаты в ответ."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "p17",
   "num": "16.2",
   "title": "17. Letter Combinations of a Phone Number",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Строка цифр 2–9. Верни все комбинации букв, которые можно набрать на телефонной клавиатуре."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"23\"` → `[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Дерево решений: глубина — номер цифры, на каждом уровне выбираем одну из её букв. Когда длина пути равна числу цифр — комбинация готова."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def letterCombinations(self, digits: str) -> List[str]:\n        if not digits:\n            return []\n        keys = {'2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl',\n                '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz'}\n        res, path = [], []\n\n        def backtrack(i):\n            if i == len(digits):\n                res.append(''.join(path))\n                return\n            for ch in keys[digits[i]]:\n                path.append(ch)\n                backtrack(i + 1)\n                path.pop()\n\n        backtrack(0)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Пустая строка — пустой ответ, а не `[\"\"]`: это частая ловушка.",
      "Ответов до 4ⁿ (цифры 7 и 9 — по 4 буквы), каждый длины n.",
      "Итеративный вариант: начинаем с `[\"\"]` и для каждой цифры дописываем к каждой строке каждую букву."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(4ⁿ · n).",
      "**Память:** O(n) на рекурсию."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p77",
   "num": "16.3",
   "title": "77. Combinations",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [77. Combinations](https://leetcode.com/problems/combinations/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Верни все сочетания из k чисел от 1 до n."
    },
    {
     "t": "p",
     "text": "**Пример.** `n = 4, k = 2` → `[[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Как подмножества, но сохраняем только пути длины k. Отсечение: если чисел справа не хватит, чтобы добрать до k, дальше идти бессмысленно."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def combine(self, n: int, k: int) -> List[List[int]]:\n        res, path = [], []\n\n        def backtrack(start):\n            if len(path) == k:\n                res.append(path[:])\n                return\n            need = k - len(path)\n            for i in range(start, n - need + 2):    # чисел от i до n должно хватить\n                path.append(i)\n                backtrack(i + 1)\n                path.pop()\n\n        backtrack(1)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Числа в сочетании идут по возрастанию (`start = i + 1`) — так каждое сочетание получается ровно один раз.",
      "Верхняя граница `n − need + 1` включительно: если начать позже, оставшихся чисел меньше, чем `need`.",
      "Без отсечения решение тоже верное, но тратит время на тупиковые ветки."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(C(n, k) · k).",
      "**Память:** O(k)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p46",
   "num": "16.4",
   "title": "46. Permutations",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [46. Permutations](https://leetcode.com/problems/permutations/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Верни все перестановки массива различных чисел."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,2,3]` → 6 перестановок"
    },
    {
     "t": "p",
     "text": "**Идея.** На каждой позиции можно поставить любой ещё не использованный элемент. Отмечаем использованные в массиве `used` и снимаем отметку при возврате."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        res, path = [], []\n        used = [False] * len(nums)\n\n        def backtrack():\n            if len(path) == len(nums):\n                res.append(path[:])\n                return\n            for i, x in enumerate(nums):\n                if not used[i]:\n                    used[i] = True\n                    path.append(x)\n                    backtrack()\n                    path.pop()\n                    used[i] = False\n\n        backtrack()\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Отличие от сочетаний: порядок важен, поэтому каждый раз перебираем все элементы, а не только правее последнего.",
      "`used` — O(1) проверка вместо `x in path` за O(n).",
      "Вариант без `used`: обмен `nums[start]` с каждым `nums[i]`, i ≥ start, рекурсия и обратный обмен.",
      "Если в массиве есть повторы (Permutations II), сортируем и пропускаем `nums[i] == nums[i−1]`, когда `nums[i−1]` не использован."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n! · n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p39",
   "num": "16.5",
   "title": "39. Combination Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [39. Combination Sum](https://leetcode.com/problems/combination-sum/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Различные положительные числа `candidates` и `target`. Найди все уникальные комбинации чисел с суммой `target`; одно число можно брать сколько угодно раз."
    },
    {
     "t": "p",
     "text": "**Пример.** `[2,3,6,7], target = 7` → `[[2,2,3],[7]]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Как сочетания, но после выбора `candidates[i]` следующий вызов начинается с того же i — число можно взять ещё раз. Сортировка позволяет обрывать цикл, как только число больше остатка."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        candidates.sort()\n        res, path = [], []\n\n        def backtrack(start, rest):\n            if rest == 0:\n                res.append(path[:])\n                return\n            for i in range(start, len(candidates)):\n                x = candidates[i]\n                if x > rest:                 # дальше числа только больше\n                    break\n                path.append(x)\n                backtrack(i, rest - x)       # i, а не i + 1: можно повторить\n                path.pop()\n\n        backtrack(0, target)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Начало цикла `start` делает числа в комбинации неубывающими — так `[2,2,3]` и `[3,2,2]` не считаются разными.",
      "Передаём остаток суммы вниз; ноль — комбинация найдена.",
      "`break` по отсортированному массиву отсекает целую ветку, а не один элемент.",
      "Combination Sum II (каждое число один раз, есть повторы): `backtrack(i + 1, …)` и пропуск одинаковых соседей."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(N^(T/m + 1)), T — target, m — минимальное число.",
      "**Память:** O(T/m)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p22",
   "num": "16.6",
   "title": "22. Generate Parentheses",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сгенерируй все правильные скобочные последовательности из n пар скобок."
    },
    {
     "t": "p",
     "text": "**Пример.** `n = 3` → `[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Строим строку посимвольно. Открывающую можно добавить, пока их меньше n. Закрывающую — только если закрывающих меньше, чем открывающих (иначе префикс уже неправильный). Это отсечение гарантирует, что каждая собранная строка правильная."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def generateParenthesis(self, n: int) -> List[str]:\n        res, path = [], []\n\n        def backtrack(opened, closed):\n            if len(path) == 2 * n:\n                res.append(''.join(path))\n                return\n            if opened < n:\n                path.append('(')\n                backtrack(opened + 1, closed)\n                path.pop()\n            if closed < opened:\n                path.append(')')\n                backtrack(opened, closed + 1)\n                path.pop()\n\n        backtrack(0, 0)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Перебрать все 2^(2n) строк и проверять каждую — расточительно. Отсечение отбрасывает неправильный префикс сразу.",
      "Число ответов — n-е число Каталана, примерно 4ⁿ / (n^1,5 · √π)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(4ⁿ / √n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p79",
   "num": "16.7",
   "title": "79. Word Search",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [79. Word Search](https://leetcode.com/problems/word-search/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Есть ли в сетке букв слово, составленное из соседних по горизонтали и вертикали клеток (каждая клетка — не больше раза)?"
    },
    {
     "t": "p",
     "text": "**Пример.** `[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]]`, `\"ABCCED\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Из каждой клетки, совпадающей с первой буквой, запускаем DFS: на шаге i ищем букву `word[i]` среди соседей. Клетку текущего пути временно помечаем, чтобы не использовать дважды, и восстанавливаем при возврате."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def exist(self, board: List[List[str]], word: str) -> bool:\n        m, n = len(board), len(board[0])\n\n        def dfs(r, c, i):\n            if i == len(word):\n                return True\n            if not (0 <= r < m and 0 <= c < n) or board[r][c] != word[i]:\n                return False\n            board[r][c] = '#'                        # заняли клетку\n            found = (dfs(r + 1, c, i + 1) or dfs(r - 1, c, i + 1) or\n                     dfs(r, c + 1, i + 1) or dfs(r, c - 1, i + 1))\n            board[r][c] = word[i]                    # освободили\n            return found\n\n        return any(dfs(r, c, 0) for r in range(m) for c in range(n))"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Пометка `#` не совпадает ни с одной буквой — повторно в клетку не зайдём.",
      "Восстановление буквы при возврате обязательно: иначе другие пути не смогут использовать эту клетку.",
      "Оптимизации: если в сетке букв меньше, чем нужно слову, — сразу `false`; если первая буква слова встречается в сетке чаще последней, ищем развёрнутое слово.",
      "Для многих слов сразу — Trie (Word Search II, глава 15)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n·3^L), L — длина слова.",
      "**Память:** O(L)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p52",
   "num": "16.8",
   "title": "52. N-Queens II",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [52. N-Queens II](https://leetcode.com/problems/n-queens-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сколькими способами можно расставить n ферзей на доске n × n, чтобы никакие два не били друг друга?"
    },
    {
     "t": "p",
     "text": "**Пример.** `n = 4` → `2`"
    },
    {
     "t": "p",
     "text": "**Идея.** В каждой строке ровно один ферзь — ставим по строке за шаг и перебираем столбец. Ферзь бьёт по столбцу и двум диагоналям. Диагональ «↘» задаётся `r − c`, «↙» — `r + c`. Храним занятые столбцы и диагонали в множествах — проверка за O(1)."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def totalNQueens(self, n: int) -> int:\n        cols, diag1, diag2 = set(), set(), set()\n\n        def place(r):\n            if r == n:\n                return 1\n            count = 0\n            for c in range(n):\n                if c in cols or r - c in diag1 or r + c in diag2:\n                    continue                     # клетка под боем\n                cols.add(c); diag1.add(r - c); diag2.add(r + c)\n                count += place(r + 1)\n                cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)\n            return count\n\n        return place(0)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Перебор «по строкам» сразу исключает двух ферзей в одной строке.",
      "На одной диагонали ↘ разность `r − c` постоянна, на диагонали ↙ — сумма `r + c`.",
      "Функция возвращает число расстановок, поэтому сам путь хранить не нужно. Для N-Queens I (вывести доски) — добавляем список столбцов."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n!) в худшем случае, с отсечением — намного меньше.",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "16.9",
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
       "[17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/)",
       "Medium",
       "2",
       "на каждой позиции перебираем буквы цифры"
      ],
      [
       "[77. Combinations](https://leetcode.com/problems/combinations/)",
       "Medium",
       "2",
       "сочетания: start = i + 1 и отсечение по оставшимся числам"
      ],
      [
       "[46. Permutations](https://leetcode.com/problems/permutations/)",
       "Medium",
       "1",
       "перестановки: любой неиспользованный элемент"
      ],
      [
       "[39. Combination Sum](https://leetcode.com/problems/combination-sum/)",
       "Medium",
       "1",
       "элемент можно брать повторно: рекурсия с тем же i; отсечение по сумме"
      ],
      [
       "[22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/)",
       "Medium",
       "1",
       "добавляем «(» пока есть, «)» — пока их меньше открытых"
      ],
      [
       "[79. Word Search](https://leetcode.com/problems/word-search/)",
       "Medium",
       "2",
       "DFS по сетке с пометкой клетки на время пути"
      ],
      [
       "[52. N-Queens II](https://leetcode.com/problems/n-queens-ii/)",
       "Hard",
       "3",
       "по строке за шаг; занятые столбцы и диагонали в множествах"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "5–7 часов",
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
       "[46. Permutations](https://leetcode.com/problems/permutations/) · Medium",
       "[39. Combination Sum](https://leetcode.com/problems/combination-sum/) · Medium",
       "[22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) · Medium"
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
       "[17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) · Medium",
       "[77. Combinations](https://leetcode.com/problems/combinations/) · Medium",
       "[79. Word Search](https://leetcode.com/problems/word-search/) · Medium"
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
       "[52. N-Queens II](https://leetcode.com/problems/n-queens-ii/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Опиши шаблон backtracking: выбрать, рекурсия, отменить. Зачем класть в ответ копию пути?",
   "Чем отличается перебор сочетаний от перебора перестановок?",
   "Как в Combination Sum разрешить повторное использование числа и при этом не получить одинаковые комбинации в разном порядке?",
   "Какое отсечение используется в Generate Parentheses и почему все собранные строки правильные?",
   "Как в N-Queens проверить диагонали за O(1)?"
  ]
 }
}
