// Блок ноября «Алгособес», глава 4 — Скользящее окно (Sliding Window).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 4,
 "title": "Скользящее окно",
 "summary": "Окно фиксированной и переменной длины; шаблон «расширяем справа, сжимаем слева»; инвариант окна и счётчики символов; разбор задач Minimum Size Subarray Sum, Longest Substring Without Repeating Characters, Substring with Concatenation of All Words и Minimum Window Substring.",
 "intro": "Скользящее окно — это два указателя в одном направлении, между которыми лежит отрезок массива или строки. Окно двигается вправо: правая граница добавляет элемент, левая — убирает. Каждый элемент входит в окно и выходит из него по одному разу, поэтому вместо O(n²) отрезков мы проверяем все интересные за O(n). Паттерн узнаётся по словам «подмассив» или «подстрока» + «самый длинный», «самый короткий», «содержит все».",
 "sections": [
  {
   "id": "template",
   "num": "4.1",
   "title": "Шаблон окна переменной длины",
   "blocks": [
    {
     "t": "p",
     "text": "Окно `[left, right]` хранит некоторое состояние: сумму, счётчик символов, множество. Правый указатель идёт по всем элементам и добавляет их в окно. Пока окно нарушает условие (или, наоборот, пока выполняет — в задачах на минимум), левый указатель убирает элементы. В нужный момент обновляем ответ."
    },
    {
     "t": "code",
     "text": "def longest_window(nums, ok):\n    \"\"\"Самое длинное окно, для которого ok(состояние) истинно.\"\"\"\n    left = 0\n    state = init()\n    best = 0\n    for right, x in enumerate(nums):\n        add(state, x)                    # расширяем окно справа\n        while not ok(state):             # сжимаем, пока окно плохое\n            remove(state, nums[left])\n            left += 1\n        best = max(best, right - left + 1)   # окно хорошее — обновляем ответ\n    return best"
    },
    {
     "t": "table",
     "caption": "Две разновидности",
     "headers": [
      "Ищем",
      "Когда сжимать",
      "Где обновлять ответ"
     ],
     "rows": [
      [
       "самое длинное хорошее окно",
       "пока окно **плохое**",
       "после сжатия"
      ],
      [
       "самое короткое хорошее окно",
       "пока окно **хорошее**",
       "внутри цикла сжатия, до удаления элемента"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Когда окно применимо"
    },
    {
     "t": "p",
     "text": "Окно работает, если свойство **монотонно**: расширение окна делает его «более плохим» (или «более хорошим»), а сжатие — наоборот. Пример: сумма положительных чисел растёт при расширении. Если в массиве есть отрицательные числа, сумма немонотонна, и окно ломается — тогда используют префиксные суммы с хеш-таблицей."
    },
    {
     "t": "note",
     "text": "Сложность O(n), несмотря на вложенный `while`: левый указатель за всё время сдвигается не больше n раз. Это амортизированный анализ — его стоит проговорить на собеседовании."
    }
   ],
   "terms": [
    [
     "амортизированный анализ",
     "оценка суммарной стоимости всех операций, а не худшей одиночной: вложенный цикл суммарно делает не больше n шагов."
    ]
   ],
   "divider": "Теория"
  },
  {
   "id": "p209",
   "num": "4.2",
   "title": "209. Minimum Size Subarray Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Массив положительных чисел и число `target`. Найди минимальную длину подмассива с суммой не меньше `target` (или 0)."
    },
    {
     "t": "p",
     "text": "**Пример.** `target = 7, nums = [2,3,1,2,4,3]` → `2` (`[4,3]`)"
    },
    {
     "t": "p",
     "text": "**Идея.** Все числа положительные — сумма окна монотонна. Расширяем окно справа, а как только сумма достигла `target`, сжимаем слева, пока условие держится, и на каждом шаге сжатия обновляем минимум длины."
    },
    {
     "t": "array",
     "caption": "target = 7",
     "rows": [
      {
       "label": "r = 3",
       "cells": [
        2,
        3,
        1,
        2,
        4,
        3
       ],
       "ptr": {
        "0": "L",
        "3": "R"
       },
       "hl": [
        0,
        1,
        2,
        3
       ],
       "note": "сумма 8 ≥ 7 → длина 4, сжимаем"
      },
      {
       "label": "r = 4",
       "cells": [
        2,
        3,
        1,
        2,
        4,
        3
       ],
       "ptr": {
        "1": "L",
        "4": "R"
       },
       "hl": [
        1,
        2,
        3,
        4
       ],
       "note": "сумма 10 → длина 4, сжимаем до [1,2,4] = 7 → длина 3"
      },
      {
       "label": "r = 5",
       "cells": [
        2,
        3,
        1,
        2,
        4,
        3
       ],
       "ptr": {
        "4": "L",
        "5": "R"
       },
       "hl": [
        4,
        5
       ],
       "note": "после сжатий [4,3] = 7 → длина 2"
      }
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def minSubArrayLen(self, target: int, nums: List[int]) -> int:\n        left = 0\n        total = 0\n        best = float('inf')\n        for right, x in enumerate(nums):\n            total += x\n            while total >= target:            # окно хорошее — пробуем укоротить\n                best = min(best, right - left + 1)\n                total -= nums[left]\n                left += 1\n        return 0 if best == float('inf') else best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Это окно «на минимум»: ответ обновляем, пока окно хорошее, и сразу пытаемся его укоротить.",
      "Каждый индекс один раз входит в окно и один раз выходит — O(n).",
      "Продолжение на собеседовании: решение за O(n log n) — префиксные суммы и бинарный поиск для каждого левого края."
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
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p3",
   "num": "4.3",
   "title": "3. Longest Substring Without Repeating Characters",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди длину самой длинной подстроки без повторяющихся символов."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"abcabcbb\"` → `3` (`\"abc\"`)"
    },
    {
     "t": "p",
     "text": "**Идея.** Окно — подстрока без повторов. Новый символ справа может создать повтор; тогда левая граница должна перепрыгнуть за предыдущее вхождение этого символа. Храним словарь «символ → последний индекс» — так сдвиг делается за O(1), без цикла."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        last = {}          # символ -> индекс последнего вхождения\n        left = 0\n        best = 0\n        for right, ch in enumerate(s):\n            if ch in last and last[ch] >= left:   # повтор внутри окна\n                left = last[ch] + 1\n            last[ch] = right\n            best = max(best, right - left + 1)\n        return best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Проверка `last[ch] >= left` важна: старое вхождение левее окна уже не мешает, и левая граница не должна двигаться назад.",
      "После сдвига окно снова без повторов — обновляем ответ.",
      "Вариант с `set` и циклом `while ch in window: убрать s[left]` тоже O(n) и проще объяснить."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n).",
      "**Память:** O(k), k — размер алфавита."
     ]
    },
    {
     "t": "note",
     "text": "**Где ошибаются.** Без проверки `>= left` строка \"abba\" даст 3 вместо 2: на второй `a` левый край прыгнет назад."
    }
   ],
   "terms": []
  },
  {
   "id": "p30",
   "num": "4.4",
   "title": "30. Substring with Concatenation of All Words",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Дана строка `s` и массив `words` одинаковой длины w. Найди все начальные индексы подстрок `s`, которые являются конкатенацией всех слов `words` в любом порядке (каждое слово ровно столько раз, сколько оно в списке)."
    },
    {
     "t": "p",
     "text": "**Пример.** `s = \"barfoothefoobarman\", words = [\"foo\",\"bar\"]` → `[0,9]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Раз все слова одной длины w, строку можно резать на слова. Но подходящая подстрока может начинаться с любого сдвига 0…w−1. Для каждого сдвига запускаем обычное скользящее окно, где шаг — целое слово, а состояние — счётчик слов в окне. Если слово не из списка — окно сбрасываем; если какое-то слово встречается слишком часто — сжимаем слева."
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nclass Solution:\n    def findSubstring(self, s: str, words: List[str]) -> List[int]:\n        w, k = len(words[0]), len(words)\n        need = Counter(words)\n        res = []\n        for offset in range(w):\n            left = offset\n            window = Counter()\n            count = 0                                  # слов в окне\n            for right in range(offset, len(s) - w + 1, w):\n                word = s[right:right + w]\n                if word not in need:                   # окно не может содержать это слово\n                    window.clear()\n                    count = 0\n                    left = right + w\n                    continue\n                window[word] += 1\n                count += 1\n                while window[word] > need[word]:       # лишнее слово — сжимаем слева\n                    window[s[left:left + w]] -= 1\n                    count -= 1\n                    left += w\n                if count == k:\n                    res.append(left)\n        return res"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Сдвиги 0…w−1 покрывают все возможные начала: любая позиция i имеет сдвиг `i % w`.",
      "Внутри одного сдвига окно двигается по словам: правая граница добавляет слово, левая убирает.",
      "Окно хорошее, когда в нём ровно k слов и ни одно не превышает нужное количество — тогда это ответ.",
      "Каждое слово каждого сдвига входит и выходит из окна один раз."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(w · n/w · w) = O(n · w) — n/w слов на сдвиг, w сдвигов, срез слова стоит w.",
      "**Память:** O(k·w) на счётчики."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p76",
   "num": "4.5",
   "title": "76. Minimum Window Substring",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди самую короткую подстроку `s`, которая содержит все символы `t` (с учётом повторов). Если нет — пустая строка."
    },
    {
     "t": "p",
     "text": "**Пример.** `s = \"ADOBECODEBANC\", t = \"ABC\"` → `\"BANC\"`"
    },
    {
     "t": "p",
     "text": "**Идея.** Классическое окно на минимум. Храним `need` — сколько каждого символа ещё не хватает, и `missing` — сколько символов `t` всего не хватает. Расширяем окно, пока `missing > 0`. Когда стало 0 — окно содержит всё, сжимаем слева, пока это сохраняется, и обновляем ответ."
    },
    {
     "t": "code",
     "text": "from collections import Counter\n\nclass Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        need = Counter(t)\n        missing = len(t)\n        left = 0\n        best = (float('inf'), 0, 0)\n        for right, ch in enumerate(s):\n            if need[ch] > 0:            # этот символ был нужен\n                missing -= 1\n            need[ch] -= 1               # лишние уходят в минус\n            while missing == 0:         # окно содержит всё — сжимаем\n                if right - left + 1 < best[0]:\n                    best = (right - left + 1, left, right + 1)\n                need[s[left]] += 1\n                if need[s[left]] > 0:   # убрали нужный символ\n                    missing += 1\n                left += 1\n        return s[best[1]:best[2]] if best[0] != float('inf') else ''"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "`need[ch]` может стать отрицательным — это «лишние» копии символа в окне, их можно отдать при сжатии.",
      "`missing` уменьшается только когда символ действительно был нужен — так проверка «окно содержит всё» стоит O(1).",
      "При сжатии возвращаем символ; если его счётчик стал положительным — окно сломалось, выходим из цикла сжатия.",
      "Ответ храним индексами, а не срезами, чтобы не копировать строку на каждом шаге."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(|s| + |t|).",
      "**Память:** O(k), k — размер алфавита."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "4.6",
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
       "[209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/)",
       "Medium",
       "1",
       "окно на минимум: сжимаем, пока сумма ≥ target"
      ],
      [
       "[3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/)",
       "Medium",
       "1",
       "окно на максимум + последняя позиция каждого символа"
      ],
      [
       "[30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/)",
       "Hard",
       "3",
       "w отдельных окон со сдвигом по словам"
      ],
      [
       "[76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/)",
       "Hard",
       "3",
       "окно на минимум со счётчиком недостающих символов"
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
    "title": "Уровень 1 — золотой минимум",
    "blocks": [
     {
      "t": "ul",
      "items": [
       "[209. Minimum Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) · Medium",
       "[3. Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) · Medium"
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
       "[30. Substring with Concatenation of All Words](https://leetcode.com/problems/substring-with-concatenation-of-all-words/) · Hard",
       "[76. Minimum Window Substring](https://leetcode.com/problems/minimum-window-substring/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Почему решение со скользящим окном — O(n), хотя внутри цикла есть ещё один `while`?",
   "Чем отличается окно на максимум от окна на минимум: когда сжимаем и где обновляем ответ?",
   "Почему окно не работает для суммы подмассива, если в массиве есть отрицательные числа?",
   "Зачем в Longest Substring Without Repeating Characters проверка `last[ch] >= left`?"
  ]
 }
}
