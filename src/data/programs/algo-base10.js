// Блок «Алгособес», экспресс-глава «Самые базовые 10»: паттерны, теория, примеры и разбор задач.
// Собрана скриптом: вывод примеров сверен с запуском, решения задач проверены тестами.
// Файл без импортов: его грузит и админка.

export default {
 "num": 0,
 "title": "10 задач — 10 базовых паттернов",
 "summary": "Экспресс-подготовка к алгоритмической секции: 10 паттернов с теорией, примерами на Python и разбором 10 классических задач LeetCode Top Interview 150.",
 "intro": "Минимальный набор для алгоритмического собеседования: десять паттернов и по одной самой классической задаче на каждый. Подойдёт, если до собеседования неделя или ты только начинаешь.",
 "sections": [
  {
   "id": "how",
   "num": "0",
   "title": "Как пользоваться этой главой",
   "blocks": [
    {
     "t": "p",
     "text": "Это экспресс-версия блока для тех, у кого нет времени на полный материал. Здесь 10 самых классических задач из LeetCode Top Interview 150 — **по одной на каждый базовый паттерн**. После них у тебя будет «скелет», на который ложится всё остальное."
    },
    {
     "t": "p",
     "text": "Для каждого паттерна: короткая теория, признаки в условии, пример на Python, затем задача — условие, идея, решение и разбор. Сначала попробуй решить задачу на LeetCode сам (25 минут), потом сверяйся с разбором."
    },
    {
     "t": "table",
     "caption": "Паттерны и задачи",
     "headers": [
      "Паттерн",
      "Задачи",
      "Подробнее"
     ],
     "rows": [
      [
       "Хеш-таблица: «видели ли уже»",
       "[1. Two Sum](https://leetcode.com/problems/two-sum/) · Easy",
       "глава 6"
      ],
      [
       "Подсчёт частот",
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) · Easy",
       "глава 6"
      ],
      [
       "Один проход с запоминанием лучшего",
       "[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy",
       "глава 2"
      ],
      [
       "Два указателя",
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) · Easy",
       "глава 3"
      ],
      [
       "Стек",
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) · Easy",
       "глава 8"
      ],
      [
       "Бинарный поиск",
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) · Easy",
       "глава 19"
      ],
      [
       "Связный список",
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy",
       "глава 9"
      ],
      [
       "Дерево: рекурсия (DFS)",
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Easy",
       "глава 10"
      ],
      [
       "Дерево и граф: обход в ширину (BFS)",
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Medium",
       "глава 11"
      ],
      [
       "Динамическое программирование",
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) · Easy",
       "глава 23"
      ]
     ]
    },
    {
     "t": "note",
     "text": "Когда захочешь больше — открой главу темы из колонки «Подробнее»: там полная теория и все задачи подборки по этому паттерну."
    }
   ],
   "terms": []
  },
  {
   "id": "hash",
   "num": "1",
   "title": "Хеш-таблица: «видели ли уже»",
   "blocks": [
    {
     "t": "p",
     "text": "Словарь `dict` и множество `set` находят элемент за O(1) в среднем. Как только в решении появляется «для каждого элемента поискать пару среди остальных» — это O(n²), и почти всегда его можно заменить одним проходом со словарём уже просмотренных элементов."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«найди пару с суммой / разностью»",
      "«встречался ли элемент раньше»",
      "«верни индексы»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "nums = [3, 8, 1, 3, 5]\nseen = set()\nfor x in nums:\n    if x in seen:            # O(1) вместо поиска по списку\n        print('повтор:', x)\n        break\n    seen.add(x)",
     "out": "повтор: 3"
    },
    {
     "t": "h3",
     "text": "Задача: 1. Two Sum"
    },
    {
     "t": "p",
     "text": "**Easy** · [1. Two Sum](https://leetcode.com/problems/two-sum/) · полный разбор темы — глава 6"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди индексы двух чисел массива с суммой `target`. Решение единственное, один элемент нельзя использовать дважды."
    },
    {
     "t": "p",
     "text": "**Пример.** `nums = [2,7,11,15], target = 9` → `[0,1]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Перебор пар — O(n²). Для каждого `x` нам нужно число `target − x`. Будем хранить уже пройденные числа в словаре «значение → индекс» и для текущего числа сразу проверять, было ли его дополнение."
    },
    {
     "t": "table",
     "caption": "nums = [2, 7, 11, 15], target = 9",
     "headers": [
      "i",
      "x",
      "ищем 9 − x",
      "словарь до шага",
      "результат"
     ],
     "rows": [
      [
       "0",
       "2",
       "7",
       "{}",
       "нет, кладём 2 → 0"
      ],
      [
       "1",
       "7",
       "2",
       "{2: 0}",
       "нашли: [0, 1]"
      ]
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        seen = {}                       # число -> индекс\n        for i, x in enumerate(nums):\n            if target - x in seen:\n                return [seen[target - x], i]\n            seen[x] = i\n        return []"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Проверяем дополнение **до** добавления текущего числа — так один элемент не используется дважды (важно для `[3, 3]` с `target = 6` и для `x = target / 2`).",
      "Один проход: если пара (i, j) существует, при посещении j число i уже лежит в словаре.",
      "Если массив отсортирован, лучше два указателя за O(1) памяти (глава 3, задача 167)."
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
   "id": "freq",
   "num": "2",
   "title": "Подсчёт частот",
   "blocks": [
    {
     "t": "p",
     "text": "Если важны не позиции, а «сколько раз встречается каждый элемент», считаем частоты в `Counter` или в словаре. Две строки — анаграммы, если у них одинаковые частоты букв."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«анаграмма»",
      "«можно ли составить из букв»",
      "«самый частый элемент»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nc = Counter('banana')\nprint(c)\nprint(c.most_common(1))\nprint(Counter('listen') == Counter('silent'))",
     "out": "Counter({'a': 3, 'n': 2, 'b': 1})\n[('a', 3)]\nTrue"
    },
    {
     "t": "h3",
     "text": "Задача: 242. Valid Anagram"
    },
    {
     "t": "p",
     "text": "**Easy** · [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) · полный разбор темы — глава 6"
    },
    {
     "t": "p",
     "text": "**Условие.** Проверь, является ли `t` анаграммой `s` — составлена из тех же букв в том же количестве."
    },
    {
     "t": "p",
     "text": "**Пример.** `s = \"anagram\", t = \"nagaram\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Анаграммы — строки с одинаковыми частотами букв. Сравниваем счётчики. Сортировка обеих строк тоже работает, но за O(n log n)."
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nclass Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        if len(s) != len(t):\n            return False\n        count = [0] * 26                 # только строчные латинские буквы\n        for a, b in zip(s, t):\n            count[ord(a) - ord('a')] += 1\n            count[ord(b) - ord('a')] -= 1\n        return all(c == 0 for c in count)"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Разные длины — сразу `False`.",
      "Один массив на 26 букв: символы `s` увеличивают счётчик, символы `t` уменьшают. Если строки анаграммы, всё обнулится.",
      "Короткий вариант: `Counter(s) == Counter(t)`. Для Unicode-строк массив на 26 не подходит — используй `Counter`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(1) — 26 счётчиков."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "onepass",
   "num": "3",
   "title": "Один проход с запоминанием лучшего",
   "blocks": [
    {
     "t": "p",
     "text": "Многие задачи на массивы решаются одним проходом слева направо, если хранить в переменной «лучшее до текущего момента»: минимум, максимум, кандидата. Так вместо перебора всех пар получается O(n)."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«максимальная разница, где меньший элемент раньше»",
      "«элемент, которого больше половины»",
      "нужна информация обо всём, что левее текущего элемента"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "nums = [4, 2, 7, 1, 9]\nsmallest = float('inf')\nfor x in nums:\n    smallest = min(smallest, x)   # минимум среди уже просмотренных\n    print(x, '->', smallest)",
     "out": "4 -> 4\n2 -> 2\n7 -> 2\n1 -> 1\n9 -> 1"
    },
    {
     "t": "h3",
     "text": "Задача: 121. Best Time to Buy and Sell Stock"
    },
    {
     "t": "p",
     "text": "**Easy** · [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · полный разбор темы — глава 2"
    },
    {
     "t": "p",
     "text": "**Условие.** `prices[i]` — цена акции в день i. Купи в один день и продай в один из следующих. Верни максимальную прибыль (0, если заработать нельзя)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[7,1,5,3,6,4]` → `5` (купить за 1, продать за 6)"
    },
    {
     "t": "p",
     "text": "**Идея.** Если продаём в день i, выгоднее всего было купить по **минимальной цене до дня i**. Значит, достаточно одного прохода: помним минимум цены слева и на каждом дне считаем прибыль «продать сегодня»."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        min_price = float('inf')\n        best = 0\n        for p in prices:\n            min_price = min(min_price, p)        # лучший день покупки до сегодня\n            best = max(best, p - min_price)      # продаём сегодня\n        return best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Перебор всех пар (покупка, продажа) — O(n²). Замечаем, что для фиксированного дня продажи нужен только минимум слева.",
      "Обновляем минимум **до** подсчёта прибыли: купить и продать в один день — прибыль 0, это допустимо и не портит ответ.",
      "Ответ не может быть отрицательным: `best` стартует с 0."
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
   "id": "twoptr",
   "num": "4",
   "title": "Два указателя",
   "blocks": [
    {
     "t": "p",
     "text": "Два индекса идут навстречу друг другу (с краёв к центру) или в одну сторону по двум последовательностям. На каждом шаге двигаем один из них и отбрасываем заведомо бесполезные варианты — получается O(n) вместо O(n²). Главный признак — отсортированный массив или проверка палиндрома."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«отсортированный массив» + «пара»",
      "«палиндром»",
      "«подпоследовательность»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "a = [1, 2, 3, 4, 5]\nl, r = 0, len(a) - 1\nwhile l < r:                 # разворот на месте навстречу\n    a[l], a[r] = a[r], a[l]\n    l, r = l + 1, r - 1\nprint(a)",
     "out": "[5, 4, 3, 2, 1]"
    },
    {
     "t": "h3",
     "text": "Задача: 125. Valid Palindrome"
    },
    {
     "t": "p",
     "text": "**Easy** · [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) · полный разбор темы — глава 3"
    },
    {
     "t": "p",
     "text": "**Условие.** Строка — палиндром, если после перевода в нижний регистр и удаления всех символов, кроме букв и цифр, она читается одинаково в обе стороны. Проверь это."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"A man, a plan, a canal: Panama\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Можно отфильтровать строку и сравнить с разворотом — O(n) памяти. Без лишней памяти: указатели с двух концов, каждый пропускает символы, которые не буквы и не цифры, а затем сравниваем символы в нижнем регистре."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        l, r = 0, len(s) - 1\n        while l < r:\n            while l < r and not s[l].isalnum():\n                l += 1\n            while l < r and not s[r].isalnum():\n                r -= 1\n            if s[l].lower() != s[r].lower():\n                return False\n            l, r = l + 1, r - 1\n        return True"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Внутренние циклы пропускают знаки препинания и пробелы, условие `l < r` не даёт указателям перескочить друг через друга.",
      "Сравниваем символы без учёта регистра; при несовпадении — сразу `False`.",
      "Пустая строка и строка без букв — палиндромы."
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
   "id": "stack",
   "num": "5",
   "title": "Стек",
   "blocks": [
    {
     "t": "p",
     "text": "Стек — «последним пришёл, первым ушёл». В Python это обычный список: `append` и `pop` за O(1). Нужен везде, где есть вложенность: скобки, отмена последнего действия, вычисление выражений."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«скобки», «вложенность»",
      "«последний открытый»",
      "«отменить последнее»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "stack = []\nfor ch in 'abc':\n    stack.append(ch)\nprint(stack.pop(), stack.pop(), stack)",
     "out": "c b ['a']"
    },
    {
     "t": "h3",
     "text": "Задача: 20. Valid Parentheses"
    },
    {
     "t": "p",
     "text": "**Easy** · [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) · полный разбор темы — глава 8"
    },
    {
     "t": "p",
     "text": "**Условие.** Строка из скобок `()[]{}`. Проверь, что каждая открывающая закрывается скобкой того же типа и в правильном порядке."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"([]{})\"` → `true`, `\"(]\"` → `false`"
    },
    {
     "t": "p",
     "text": "**Идея.** Последняя открытая скобка должна закрыться первой — это ровно стек. Открывающие кладём в стек; закрывающая должна совпасть с вершиной, иначе ответ `false`. В конце стек должен быть пуст."
    },
    {
     "t": "table",
     "caption": "s = \"([]{})\"",
     "headers": [
      "символ",
      "действие",
      "стек после"
     ],
     "rows": [
      [
       "(",
       "кладём",
       "("
      ],
      [
       "[",
       "кладём",
       "( ["
      ],
      [
       "]",
       "совпало с [",
       "("
      ],
      [
       "{",
       "кладём",
       "( {"
      ],
      [
       "}",
       "совпало с {",
       "("
      ],
      [
       ")",
       "совпало с (",
       "пусто → true"
      ]
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isValid(self, s: str) -> bool:\n        pairs = {')': '(', ']': '[', '}': '{'}\n        stack = []\n        for ch in s:\n            if ch in pairs:                       # закрывающая\n                if not stack or stack.pop() != pairs[ch]:\n                    return False\n            else:\n                stack.append(ch)\n        return not stack"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Словарь «закрывающая → открывающая» позволяет проверить пару одной операцией.",
      "Закрывающая при пустом стеке — ошибка: её нечем закрыть.",
      "В конце незакрытые открывающие означают `false`.",
      "Ранний выход: строка нечётной длины не может быть правильной."
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
   "id": "binsearch",
   "num": "6",
   "title": "Бинарный поиск",
   "blocks": [
    {
     "t": "p",
     "text": "В отсортированном массиве смотрим на середину и отбрасываем половину — O(log n). Надёжный шаблон: искать **первую позицию, где условие истинно**, на полуинтервале `[lo, hi)`. Тогда не бывает бесконечных циклов и ошибок на единицу."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«отсортированный массив» + «найди»",
      "«за O(log n)»",
      "«куда вставить», «первое / последнее вхождение»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "def first_true(lo, hi, ok):\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if ok(mid):\n            hi = mid\n        else:\n            lo = mid + 1\n    return lo\n\nnums = [1, 3, 5, 7, 9]\nprint(first_true(0, len(nums), lambda i: nums[i] >= 6))   # первый элемент >= 6",
     "out": "3"
    },
    {
     "t": "h3",
     "text": "Задача: 35. Search Insert Position"
    },
    {
     "t": "p",
     "text": "**Easy** · [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) · полный разбор темы — глава 19"
    },
    {
     "t": "p",
     "text": "**Условие.** Отсортированный массив различных чисел. Верни индекс `target`, а если его нет — позицию, куда его нужно вставить. За O(log n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,3,5,6], target = 5` → `2`; `target = 2` → `1`"
    },
    {
     "t": "p",
     "text": "**Идея.** И индекс найденного элемента, и позиция вставки — это первая позиция, где `nums[i] >= target`. Шаблон из теории без изменений."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        lo, hi = 0, len(nums)\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if nums[mid] >= target:\n                hi = mid\n            else:\n                lo = mid + 1\n        return lo"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Правая граница `len(nums)` (не `len − 1`): target может быть больше всех элементов, и тогда ответ — длина массива.",
      "В Python это ровно `bisect.bisect_left(nums, target)`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(log n).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "linked",
   "num": "7",
   "title": "Связный список",
   "blocks": [
    {
     "t": "p",
     "text": "Узел хранит значение и ссылку на следующий. Три приёма закрывают почти все задачи: **фиктивная голова** (узел-заглушка перед началом), **два указателя** разной скорости и **разворот** списка. Рисуй стрелки на бумаге — так видно, какую ссылку сохранить."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«связный список»",
      "«середина», «цикл», «n-й с конца»",
      "«слей», «разверни»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val, self.next = val, next\n\ndef reverse(head):\n    prev = None\n    while head:\n        head.next, prev, head = prev, head, head.next\n    return prev\n\nnode = reverse(ListNode(1, ListNode(2, ListNode(3))))\nwhile node:\n    print(node.val, end=' ')\n    node = node.next",
     "out": "3 2 1 "
    },
    {
     "t": "h3",
     "text": "Задача: 21. Merge Two Sorted Lists"
    },
    {
     "t": "p",
     "text": "**Easy** · [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) · полный разбор темы — глава 9"
    },
    {
     "t": "p",
     "text": "**Условие.** Слей два отсортированных списка в один отсортированный, переиспользуя узлы."
    },
    {
     "t": "p",
     "text": "**Пример.** `1→2→4` и `1→3→4` → `1→1→2→3→4→4`"
    },
    {
     "t": "p",
     "text": "**Идея.** Как в слиянии массивов: сравниваем текущие узлы двух списков и подвешиваем меньший к хвосту результата. Фиктивная голова избавляет от отдельного выбора первого узла."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        dummy = tail = ListNode()\n        while list1 and list2:\n            if list1.val <= list2.val:\n                tail.next, list1 = list1, list1.next\n            else:\n                tail.next, list2 = list2, list2.next\n            tail = tail.next\n        tail.next = list1 or list2        # остаток уже отсортирован\n        return dummy.next"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`tail` — последний узел результата, к нему подвешиваем меньший из двух текущих.",
      "Когда один список кончился, остаток второго подвешиваем целиком — копировать по узлу не нужно.",
      "Рекурсивный вариант короче, но тратит O(n + m) памяти на стек вызовов."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n + m).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "dfs",
   "num": "8",
   "title": "Дерево: рекурсия (DFS)",
   "blocks": [
    {
     "t": "p",
     "text": "Почти любая задача на дерево решается рекурсией: спроси ответ у левого и правого поддерева и собери из них ответ для текущего узла. Сначала сформулируй словами, что возвращает функция, затем базу (пустое дерево) и шаг."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«бинарное дерево»",
      "«глубина», «путь от корня до листа»",
      "«отрази», «сравни деревья»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "class TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val, self.left, self.right = val, left, right\n\ndef total(node):                     # сумма всех значений поддерева\n    if not node:\n        return 0                     # база\n    return node.val + total(node.left) + total(node.right)   # шаг\n\nprint(total(TreeNode(1, TreeNode(2), TreeNode(3, TreeNode(4)))))",
     "out": "10"
    },
    {
     "t": "h3",
     "text": "Задача: 104. Maximum Depth of Binary Tree"
    },
    {
     "t": "p",
     "text": "**Easy** · [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · полный разбор темы — глава 10"
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
   "terms": []
  },
  {
   "id": "bfs",
   "num": "9",
   "title": "Дерево и граф: обход в ширину (BFS)",
   "blocks": [
    {
     "t": "p",
     "text": "BFS идёт уровень за уровнем с помощью очереди `collections.deque`. Размер очереди в начале итерации — число узлов текущего уровня. Если в условии есть «уровень» или «кратчайшее число шагов» — нужен BFS."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«по уровням»",
      "«самый правый на уровне»",
      "«минимальное число шагов»"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "from collections import deque\n\nq = deque([1])\nq.append(2)\nq.append(3)\nprint(q.popleft(), list(q))      # popleft — O(1), у list.pop(0) — O(n)",
     "out": "1 [2, 3]"
    },
    {
     "t": "h3",
     "text": "Задача: 102. Binary Tree Level Order Traversal"
    },
    {
     "t": "p",
     "text": "**Medium** · [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) · полный разбор темы — глава 11"
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
   "id": "dp",
   "num": "10",
   "title": "Динамическое программирование",
   "blocks": [
    {
     "t": "p",
     "text": "Если задача складывается из таких же задач меньшего размера и они повторяются, запоминаем ответы на подзадачи. Рецепт: что значит `dp[i]` (состояние), как его выразить через меньшие (переход), база, порядок вычисления, где ответ."
    },
    {
     "t": "p",
     "text": "**Как узнать в условии:**"
    },
    {
     "t": "ul",
     "items": [
      "«сколькими способами»",
      "«минимальное / максимальное»",
      "решение для n зависит от решений для n − 1, n − 2"
     ]
    },
    {
     "t": "p",
     "text": "**Пример на Python**"
    },
    {
     "t": "code",
     "text": "def fib(n):\n    a, b = 0, 1                  # dp[0], dp[1]\n    for _ in range(n):\n        a, b = b, a + b          # dp[i] = dp[i-1] + dp[i-2]\n    return a\n\nprint([fib(i) for i in range(10)])",
     "out": "[0, 1, 1, 2, 3, 5, 8, 13, 21, 34]"
    },
    {
     "t": "h3",
     "text": "Задача: 70. Climbing Stairs"
    },
    {
     "t": "p",
     "text": "**Easy** · [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) · полный разбор темы — глава 23"
    },
    {
     "t": "p",
     "text": "**Условие.** Можно подниматься на 1 или 2 ступеньки. Сколькими способами можно подняться на n ступенек?"
    },
    {
     "t": "p",
     "text": "**Пример.** `3` → `3` (1+1+1, 1+2, 2+1)"
    },
    {
     "t": "p",
     "text": "**Идея.** Последний шаг на ступеньку n — либо с n − 1, либо с n − 2. Значит, способов `ways(n) = ways(n−1) + ways(n−2)` — это числа Фибоначчи."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        prev, cur = 1, 1          # способов добраться до ступенек 0 и 1\n        for _ in range(n - 1):\n            prev, cur = cur, prev + cur\n        return cur"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Состояние: `dp[i]` — число способов добраться до ступеньки i. База: `dp[0] = dp[1] = 1`.",
      "Переход: `dp[i] = dp[i−1] + dp[i−2]` — разбиваем способы по последнему шагу.",
      "Хранить весь массив не нужно — только два последних значения.",
      "Обобщение «шаги из множества steps»: `dp[i] = сумма dp[i − s]` по всем s."
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
   "id": "next",
   "num": "11",
   "title": "Шпаргалка и что дальше",
   "blocks": [
    {
     "t": "table",
     "caption": "Признак в условии → приём",
     "headers": [
      "Задача",
      "Паттерн",
      "Главный приём"
     ],
     "rows": [
      [
       "[1. Two Sum](https://leetcode.com/problems/two-sum/)",
       "Хеш-таблица: «видели ли уже»",
       "ищем дополнение среди уже виденных"
      ],
      [
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)",
       "Подсчёт частот",
       "сравнение частот"
      ],
      [
       "[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/)",
       "Один проход с запоминанием лучшего",
       "минимум слева и лучшая разница"
      ],
      [
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/)",
       "Два указателя",
       "указатели навстречу, пропуск не-букв"
      ],
      [
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/)",
       "Стек",
       "стек открывающих скобок"
      ],
      [
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)",
       "Бинарный поиск",
       "первая позиция с nums[i] >= target (bisect_left)"
      ],
      [
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)",
       "Связный список",
       "фиктивная голова + слияние двух отсортированных"
      ],
      [
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)",
       "Дерево: рекурсия (DFS)",
       "глубина = 1 + максимум глубин детей"
      ],
      [
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)",
       "Дерево и граф: обход в ширину (BFS)",
       "шаблон BFS: размер очереди = размер уровня"
      ],
      [
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)",
       "Динамическое программирование",
       "dp[i] = dp[i − 1] + dp[i − 2]"
      ]
     ]
    },
    {
     "t": "ul",
     "items": [
      "Перерешай каждую задачу через 1, 3 и 7 дней — без подсказок и вслух проговаривая подход и сложность.",
      "Следующий шаг — «Самые базовые 30»: ещё 10 паттернов и 20 задач.",
      "Если до собеседования осталась пара дней — не решай новое, а повторяй решённое."
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "1 неделя",
  "format": "решения на LeetCode",
  "situation": [
   "Реши все задачи главы на LeetCode сам. Если идеи нет за 25 минут — открой разбор, разберись и напиши решение заново с нуля. Через 1, 3 и 7 дней перерешай задачи, которые не получились сразу."
  ],
  "parts": [
   {
    "title": "Хеш-таблица: «видели ли уже»",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[1. Two Sum](https://leetcode.com/problems/two-sum/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Подсчёт частот",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Один проход с запоминанием лучшего",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Два указателя",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Стек",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Бинарный поиск",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Связный список",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Дерево: рекурсия (DFS)",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) · Easy"
      ]
     }
    ]
   },
   {
    "title": "Дерево и граф: обход в ширину (BFS)",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) · Medium"
      ]
     }
    ]
   },
   {
    "title": "Динамическое программирование",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) · Easy"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Для каждой задачи ответь вслух:",
  "selfCheck": [
   "По какому признаку в условии узнаётся паттерн?",
   "Какое простое решение и какая у него сложность?",
   "Как паттерн улучшает его и какая итоговая сложность по времени и памяти?"
  ]
 }
}
