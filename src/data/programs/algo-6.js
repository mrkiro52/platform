// Блок ноября «Алгособес», глава 6 — Хеш-таблицы (Hashmap).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 6,
 "title": "Хеш-таблицы",
 "summary": "Как устроена хеш-таблица и почему поиск — O(1) в среднем; dict, set, Counter и defaultdict; приёмы: «видели ли уже», подсчёт частот, группировка по ключу, хранение индексов, двусторонние соответствия; разбор 9 задач от Two Sum до Longest Consecutive Sequence.",
 "intro": "Хеш-таблица — самая полезная структура на собеседовании: она превращает поиск «было ли такое значение» из O(n) в O(1). Если перебор в задаче — это «для каждого элемента поискать пару среди остальных», почти всегда помогает словарь. Паттерн узнаётся по словам «пара с суммой», «анаграмма», «встречается раньше», «частота», «сгруппировать».",
 "sections": [
  {
   "id": "how",
   "num": "6.1",
   "title": "Как устроена хеш-таблица",
   "blocks": [
    {
     "t": "p",
     "text": "Хеш-функция превращает ключ в число, по нему выбирается ячейка массива («корзина»). Поиск, вставка и удаление идут сразу в нужную ячейку — O(1) в среднем. Если ключи попадают в одну корзину (коллизия), таблица хранит их цепочкой или ищет соседнюю свободную ячейку. Когда таблица заполняется, она расширяется и перекладывает ключи — редкая операция за O(n), которая в среднем даёт O(1) на вставку."
    },
    {
     "t": "ul",
     "items": [
      "Ключ `dict` и элемент `set` должны быть **неизменяемыми** (хешируемыми): числа, строки, кортежи. Список ключом быть не может — используй `tuple(lst)`.",
      "Худший случай — O(n) на операцию, если все ключи попали в одну корзину. На собеседовании говорим «O(1) в среднем».",
      "Порядок ключей в `dict` с Python 3.7 сохраняется по порядку вставки."
     ]
    },
    {
     "t": "table",
     "caption": "Инструменты Python",
     "headers": [
      "Что",
      "Пример",
      "Зачем"
     ],
     "rows": [
      [
       "`set`",
       "`seen = set(); x in seen`",
       "видели ли элемент"
      ],
      [
       "`dict`",
       "`pos[val] = i`",
       "значение → индекс или любая информация"
      ],
      [
       "`Counter`",
       "`Counter(s)[\"a\"]`",
       "частоты; сравнение мультимножеств `Counter(a) == Counter(b)`"
      ],
      [
       "`defaultdict(list)`",
       "`groups[key].append(x)`",
       "группировка без проверки «есть ли ключ»"
      ]
     ]
    }
   ],
   "terms": [
    [
     "коллизия",
     "ситуация, когда разные ключи попали в одну ячейку хеш-таблицы."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "tricks",
   "num": "6.2",
   "title": "Приёмы",
   "blocks": [
    {
     "t": "table",
     "caption": "Признак → приём",
     "headers": [
      "Признак",
      "Приём",
      "Задачи"
     ],
     "rows": [
      [
       "найти пару с суммой, разностью",
       "идём по массиву и ищем «дополнение» среди уже виденных",
       "Two Sum"
      ],
      [
       "одинаковый набор символов",
       "сравнение частот",
       "Valid Anagram, Ransom Note"
      ],
      [
       "сгруппировать «эквивалентные» элементы",
       "ключ-представитель класса: отсортированная строка, частоты",
       "Group Anagrams"
      ],
      [
       "взаимно-однозначное соответствие",
       "два словаря: туда и обратно",
       "Isomorphic Strings, Word Pattern"
      ],
      [
       "расстояние до прошлого вхождения",
       "словарь «значение → последний индекс»",
       "Contains Duplicate II"
      ],
      [
       "последовательность значений без сортировки",
       "`set` и старт только с начала цепочки",
       "Longest Consecutive Sequence"
      ],
      [
       "обнаружить цикл в последовательности",
       "`set` посещённых или быстрый и медленный указатели",
       "Happy Number"
      ]
     ]
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nprint(Counter('listen') == Counter('silent'))\nprint(Counter('aab') - Counter('ab'))      # вычитание мультимножеств\nprint(tuple(sorted('eat')))                 # ключ-представитель анаграмм",
     "out": "True\nCounter({'a': 1})\n('a', 'e', 't')"
    }
   ],
   "terms": []
  },
  {
   "id": "p383",
   "num": "6.3",
   "title": "383. Ransom Note",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [383. Ransom Note](https://leetcode.com/problems/ransom-note/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Можно ли составить строку `ransomNote` из букв строки `magazine`, если каждую букву журнала можно использовать один раз?"
    },
    {
     "t": "p",
     "text": "**Пример.** `ransomNote = \"aa\", magazine = \"aab\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Считаем, сколько каждой буквы есть в журнале, и для каждой буквы записки уменьшаем счётчик. Если ушли в минус — букв не хватает."
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nclass Solution:\n    def canConstruct(self, ransomNote: str, magazine: str) -> bool:\n        have = Counter(magazine)\n        for ch in ransomNote:\n            if have[ch] == 0:\n                return False\n            have[ch] -= 1\n        return True"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`Counter` возвращает 0 для отсутствующих ключей, поэтому отдельная проверка «есть ли буква» не нужна.",
      "Коротко то же самое: `not (Counter(ransomNote) - Counter(magazine))` — вычитание мультимножеств оставляет только недостающие буквы."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n + m).",
      "**Память:** O(k), k — размер алфавита (26)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p205",
   "num": "6.4",
   "title": "205. Isomorphic Strings",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Строки `s` и `t` изоморфны, если символы `s` можно заменить так, чтобы получилась `t`: каждый символ заменяется всегда одним и тем же, и разные символы не переходят в один. Проверь изоморфность."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"egg\"` и `\"add\"` → `true`, `\"foo\"` и `\"bar\"` → `false`"
    },
    {
     "t": "p",
     "text": "**Идея.** Нужна биекция символов. Один словарь `s → t` проверит, что символ `s` всегда переходит в одно и то же. Второй `t → s` — что два разных символа `s` не переходят в один символ `t`."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isIsomorphic(self, s: str, t: str) -> bool:\n        s_to_t, t_to_s = {}, {}\n        for a, b in zip(s, t):\n            if s_to_t.get(a, b) != b or t_to_s.get(b, a) != a:\n                return False\n            s_to_t[a] = b\n            t_to_s[b] = a\n        return True"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`s_to_t.get(a, b) != b`: если для `a` уже есть пара, она должна быть `b`; если нет — проверка проходит.",
      "Без обратного словаря `\"badc\"` и `\"baba\"` ошибочно считались бы изоморфными: `a→a` и `c→a`.",
      "Однострочник: `len(set(s)) == len(set(t)) == len(set(zip(s, t)))`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(k)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p290",
   "num": "6.5",
   "title": "290. Word Pattern",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [290. Word Pattern](https://leetcode.com/problems/word-pattern/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Дан шаблон `pattern` и строка слов `s`. Проверь, что слова следуют шаблону: между буквами шаблона и словами есть взаимно-однозначное соответствие."
    },
    {
     "t": "p",
     "text": "**Пример.** `pattern = \"abba\", s = \"dog cat cat dog\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** То же, что Isomorphic Strings, только вместо символов `t` — слова. Плюс проверка длины: число слов должно совпадать с длиной шаблона."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def wordPattern(self, pattern: str, s: str) -> bool:\n        words = s.split()\n        if len(words) != len(pattern):\n            return False\n        p_to_w, w_to_p = {}, {}\n        for p, w in zip(pattern, words):\n            if p_to_w.get(p, w) != w or w_to_p.get(w, p) != p:\n                return False\n            p_to_w[p] = w\n            w_to_p[w] = p\n        return True"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`zip` обрезает по короткой последовательности, поэтому без проверки длины `\"aaa\"` и `\"dog dog dog dog\"` прошли бы проверку.",
      "Два словаря гарантируют, что и буква → слово, и слово → буква однозначны."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n + |s|).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p242",
   "num": "6.6",
   "title": "242. Valid Anagram",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)"
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
   "id": "p1",
   "num": "6.7",
   "title": "1. Two Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [1. Two Sum](https://leetcode.com/problems/two-sum/)"
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
   "id": "p202",
   "num": "6.8",
   "title": "202. Happy Number",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 2 · уверенный · [202. Happy Number](https://leetcode.com/problems/happy-number/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Число «счастливое», если, заменяя его суммой квадратов цифр, мы в итоге придём к 1. Иначе процесс зацикливается. Проверь число."
    },
    {
     "t": "p",
     "text": "**Пример.** `19` → `true`: 1² + 9² = 82 → 68 → 100 → 1"
    },
    {
     "t": "p",
     "text": "**Идея.** Последовательность либо приходит в 1, либо попадает в цикл. Запоминаем виденные числа в `set`: повтор — значит цикл. Вариант за O(1) памяти — алгоритм Флойда: медленный указатель делает один шаг, быстрый — два; если есть цикл, они встретятся."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isHappy(self, n: int) -> bool:\n        def step(x):\n            total = 0\n            while x:\n                x, d = divmod(x, 10)\n                total += d * d\n            return total\n\n        seen = set()\n        while n != 1 and n not in seen:\n            seen.add(n)\n            n = step(n)\n        return n == 1"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Почему бесконечного роста нет: у числа с d цифрами сумма квадратов цифр не больше 81·d — для больших чисел она резко меньше самого числа. Значит, последовательность ограничена и обязана либо прийти к 1, либо зациклиться.",
      "Цикл находим по повтору значения в `seen`.",
      "Флойд: `slow = step(slow)`, `fast = step(step(fast))` до встречи; счастливое, если встретились в 1. Тот же приём — в Linked List Cycle (глава 9)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(log n) на шаг, число шагов мало.",
      "**Память:** O(log n) с set, O(1) с Флойдом."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p219",
   "num": "6.9",
   "title": "219. Contains Duplicate II",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Есть ли в массиве два одинаковых элемента на расстоянии не больше k (|i − j| ≤ k)?"
    },
    {
     "t": "p",
     "text": "**Пример.** `nums = [1,2,3,1], k = 3` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Для каждого значения достаточно помнить его последний индекс: если текущее значение встречалось и расстояние до последнего вхождения ≤ k — ответ найден. Ближайшее прошлое вхождение — лучший кандидат."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def containsNearbyDuplicate(self, nums: List[int], k: int) -> bool:\n        last = {}\n        for i, x in enumerate(nums):\n            if x in last and i - last[x] <= k:\n                return True\n            last[x] = i\n        return False"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Обновляем `last[x] = i` всегда: более близкое вхождение лучше для будущих сравнений.",
      "Альтернатива — скользящее окно из `set` размера k: добавляем `nums[i]`, удаляем `nums[i − k − 1]`. Память O(k) вместо O(n)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(n) или O(k) с окном."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p49",
   "num": "6.10",
   "title": "49. Group Anagrams",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сгруппируй анаграммы из массива строк."
    },
    {
     "t": "p",
     "text": "**Пример.** `[\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]` → `[[\"eat\",\"tea\",\"ate\"],[\"tan\",\"nat\"],[\"bat\"]]`"
    },
    {
     "t": "p",
     "text": "**Идея.** У всех анаграмм один и тот же «представитель»: отсортированная строка (`\"aet\"` для eat, tea, ate). Используем его как ключ словаря и собираем группы через `defaultdict(list)`."
    },
    {
     "t": "code",
     "text": "from collections import defaultdict\n\nclass Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        groups = defaultdict(list)\n        for s in strs:\n            groups[''.join(sorted(s))].append(s)\n        return list(groups.values())"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Ключ должен быть хешируемым: строка `\"\".join(sorted(s))` или кортеж `tuple(sorted(s))`.",
      "Ключ за O(k) вместо O(k log k): кортеж из 26 частот букв `tuple(count)`.",
      "Порядок групп и слов в ответе не важен."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n · k log k), k — длина слова (или O(n·k) с частотами).",
      "**Память:** O(n·k)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p128",
   "num": "6.11",
   "title": "128. Longest Consecutive Sequence",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди длину самой длинной последовательности подряд идущих целых чисел в неотсортированном массиве. Нужно O(n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[100,4,200,1,3,2]` → `4` (1, 2, 3, 4)"
    },
    {
     "t": "p",
     "text": "**Идея.** Сортировка дала бы O(n log n). Кладём все числа в `set`. Цепочку начинаем считать **только с её начала** — числа x, для которого x − 1 нет в множестве. От него идём вверх, пока x + 1, x + 2, … есть в множестве."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        nums_set = set(nums)\n        best = 0\n        for x in nums_set:\n            if x - 1 not in nums_set:           # x — начало цепочки\n                length = 1\n                while x + length in nums_set:\n                    length += 1\n                best = max(best, length)\n        return best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Проверка «x − 1 нет» — ключ к O(n): внутренний `while` запускается только из начала цепочки, поэтому каждое число просматривается во `while` не больше одного раза за весь алгоритм.",
      "Идём по `nums_set`, а не по `nums`: при множестве повторов одинаковые начала не будут обрабатываться заново."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(n)."
     ]
    },
    {
     "t": "note",
     "text": "**Где ошибаются.** Без проверки начала цепочки решение становится O(n²) на массиве вида 1, 2, …, n."
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "6.12",
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
       "[383. Ransom Note](https://leetcode.com/problems/ransom-note/)",
       "Easy",
       "1",
       "частоты букв журнала"
      ],
      [
       "[205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/)",
       "Easy",
       "2",
       "два словаря: s→t и t→s"
      ],
      [
       "[290. Word Pattern](https://leetcode.com/problems/word-pattern/)",
       "Easy",
       "2",
       "биекция буква ↔ слово"
      ],
      [
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/)",
       "Easy",
       "1",
       "сравнение частот"
      ],
      [
       "[1. Two Sum](https://leetcode.com/problems/two-sum/)",
       "Easy",
       "1",
       "ищем дополнение среди уже виденных"
      ],
      [
       "[202. Happy Number](https://leetcode.com/problems/happy-number/)",
       "Easy",
       "2",
       "обнаружение цикла: set или быстрый и медленный"
      ],
      [
       "[219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/)",
       "Easy",
       "1",
       "словарь «значение → последний индекс»"
      ],
      [
       "[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/)",
       "Medium",
       "1",
       "ключ группы — отсортированная строка или частоты"
      ],
      [
       "[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/)",
       "Medium",
       "1",
       "set и начало цепочки: x − 1 нет в множестве"
      ]
     ]
    }
   ],
   "terms": []
  }
 ],
 "assignment": {
  "time": "5–6 часов",
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
       "[383. Ransom Note](https://leetcode.com/problems/ransom-note/) · Easy",
       "[242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) · Easy",
       "[1. Two Sum](https://leetcode.com/problems/two-sum/) · Easy",
       "[219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) · Easy",
       "[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/) · Medium",
       "[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) · Medium"
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
       "[205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) · Easy",
       "[290. Word Pattern](https://leetcode.com/problems/word-pattern/) · Easy",
       "[202. Happy Number](https://leetcode.com/problems/happy-number/) · Easy"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Почему поиск в хеш-таблице — O(1) в среднем, а не всегда?",
   "Почему в Two Sum проверяем дополнение до добавления текущего числа в словарь?",
   "Зачем в Isomorphic Strings два словаря, а не один?",
   "Какие ключи можно использовать для группировки анаграмм и чем они отличаются по сложности?",
   "Почему решение Longest Consecutive Sequence — O(n), хотя внутри есть цикл `while`?"
  ]
 }
}
