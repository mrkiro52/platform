// Блок ноября «Алгособес», глава 19 — Бинарный поиск (Binary Search).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 19,
 "title": "Бинарный поиск",
 "summary": "Бинарный поиск: инвариант и границы, поиск первой позиции, где условие истинно; поиск по ответу; модуль bisect; поиск в повёрнутом массиве и в матрице; поиск пика; медиана двух массивов разбиением; разбор 7 задач от Search Insert Position до Median of Two Sorted Arrays.",
 "intro": "Бинарный поиск кажется простым, но в нём легко ошибиться на единицу и получить бесконечный цикл. Надёжный способ — писать всегда один шаблон: «найти первую позицию, где условие истинно». Он решает и поиск в отсортированном массиве, и задачи, где массива нет вовсе, — главное, чтобы условие было монотонным.",
 "sections": [
  {
   "id": "template",
   "num": "19.1",
   "title": "Один шаблон на все случаи",
   "blocks": [
    {
     "t": "p",
     "text": "Пусть есть условие `ok(i)`, которое ложно на начале диапазона и становится истинным начиная с какой-то позиции: `F F F T T T`. Ищем первую `T`. Отрезок `[lo, hi)` хранит кандидатов; на каждом шаге смотрим середину и отбрасываем половину."
    },
    {
     "t": "code",
     "text": "def first_true(lo, hi, ok):\n    \"\"\"Первое i из [lo, hi), для которого ok(i) истинно; hi, если таких нет.\"\"\"\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if ok(mid):\n            hi = mid          # mid подходит — ответ не правее mid\n        else:\n            lo = mid + 1      # mid не подходит — ответ правее\n    return lo\n\nnums = [1, 3, 5, 5, 7]\nprint(first_true(0, len(nums), lambda i: nums[i] >= 5))   # первый >= 5\nprint(first_true(0, len(nums), lambda i: nums[i] > 5))    # первый > 5\nprint(first_true(0, len(nums), lambda i: nums[i] >= 9))   # нет — длина массива",
     "out": "2\n4\n5"
    },
    {
     "t": "ul",
     "items": [
      "Цикл всегда заканчивается: отрезок `[lo, hi)` строго сужается, потому что `mid < hi` и `mid + 1 > lo`.",
      "Ответ — `lo` (он же `hi`) после цикла. Не нужно отдельно обрабатывать «не нашли».",
      "Чтобы применить шаблон, сформулируй задачу как «первая позиция, где …». Это главный навык темы."
     ]
    },
    {
     "t": "table",
     "caption": "Модуль bisect делает то же для отсортированного списка",
     "headers": [
      "Функция",
      "Что возвращает"
     ],
     "rows": [
      [
       "`bisect_left(a, x)`",
       "первую позицию с `a[i] >= x` — куда вставить x перед равными"
      ],
      [
       "`bisect_right(a, x)`",
       "первую позицию с `a[i] > x` — куда вставить x после равных"
      ],
      [
       "`bisect_right − bisect_left`",
       "сколько раз x встречается"
      ]
     ]
    },
    {
     "t": "h3",
     "text": "Поиск по ответу"
    },
    {
     "t": "p",
     "text": "Бинарный поиск работает не только по индексам массива, но и по значениям ответа: «минимальная скорость, при которой успеем», «минимальная вместимость, при которой довезём». Если проверка «ответ ≤ x подходит?» монотонна по x, ищем первое подходящее x тем же шаблоном. Пример из главы — Sqrt(x) (глава 22)."
    }
   ],
   "terms": [],
   "divider": "Теория"
  },
  {
   "id": "p35",
   "num": "19.2",
   "title": "35. Search Insert Position",
   "blocks": [
    {
     "t": "p",
     "text": "**Easy** · уровень 1 · золотой минимум · [35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)"
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
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p74",
   "num": "19.3",
   "title": "74. Search a 2D Matrix",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Строки матрицы отсортированы, и первый элемент каждой строки больше последнего элемента предыдущей. Есть ли в матрице `target`? За O(log(m·n))."
    },
    {
     "t": "p",
     "text": "**Идея.** Если выписать строки подряд, получится один отсортированный массив длины m·n. Делаем бинарный поиск по индексу k в этом «виртуальном» массиве, а элемент берём как `matrix[k // n][k % n]`."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        m, n = len(matrix), len(matrix[0])\n        lo, hi = 0, m * n\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if matrix[mid // n][mid % n] >= target:\n                hi = mid\n            else:\n                lo = mid + 1\n        return lo < m * n and matrix[lo // n][lo % n] == target"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Индекс k в виртуальном массиве ↔ строка `k // n`, столбец `k % n`.",
      "После поиска `lo` — первый элемент ≥ target; проверяем, что он существует и равен target.",
      "Для матрицы, где отсортированы строки и столбцы по отдельности (Search a 2D Matrix II), работает другой приём: старт в правом верхнем углу и шаг влево или вниз — O(m + n)."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(log(m·n)).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p162",
   "num": "19.4",
   "title": "162. Find Peak Element",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди индекс любого пика — элемента, строго большего соседей. За краями массива считаем −∞, соседние элементы различны. За O(log n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,2,1,3,5,6,4]` → `1` или `5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Если `nums[mid] < nums[mid + 1]`, мы на подъёме: справа обязательно есть пик (идём вверх, а в конце массива −∞ — где-то подъём закончится). Иначе пик в mid или левее. Это ровно «первая позиция, где `nums[i] > nums[i + 1]`»."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def findPeakElement(self, nums: List[int]) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if nums[mid] > nums[mid + 1]:      # спуск: пик в mid или левее\n                hi = mid\n            else:                              # подъём: пик правее\n                lo = mid + 1\n        return lo"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Массив не отсортирован, но бинарный поиск работает: условие «спуск начинается здесь» позволяет отбросить половину.",
      "`hi = len − 1`, чтобы `mid + 1` всегда был внутри массива (`mid < hi`).",
      "Найденная позиция — пик: слева от неё подъём (иначе ответ был бы левее), справа — спуск."
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
   "id": "p33",
   "num": "19.5",
   "title": "33. Search in Rotated Sorted Array",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди индекс `target` в повёрнутом отсортированном массиве различных чисел за O(log n) или верни −1."
    },
    {
     "t": "p",
     "text": "**Пример.** `[4,5,6,7,0,1,2], target = 0` → `4`"
    },
    {
     "t": "p",
     "text": "**Идея.** Разрежем отрезок серединой: хотя бы одна из половин отсортирована — та, у которой левый край ≤ правого. Для отсортированной половины легко проверить, лежит ли target в её диапазоне. Если да — ищем в ней, иначе — в другой половине."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo <= hi:\n            mid = (lo + hi) // 2\n            if nums[mid] == target:\n                return mid\n            if nums[lo] <= nums[mid]:                    # левая половина отсортирована\n                if nums[lo] <= target < nums[mid]:\n                    hi = mid - 1\n                else:\n                    lo = mid + 1\n            else:                                        # правая половина отсортирована\n                if nums[mid] < target <= nums[hi]:\n                    lo = mid + 1\n                else:\n                    hi = mid - 1\n        return -1"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Здесь удобнее вариант с закрытым отрезком `[lo, hi]` и проверкой `== target`: мы ищем конкретное значение, а не первую позицию.",
      "`nums[lo] <= nums[mid]` — нестрогое сравнение важно для отрезка из одного-двух элементов, где `lo == mid`.",
      "Альтернатива: найти точку поворота (Find Minimum, задача 153) и сделать обычный бинарный поиск в нужной части."
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
   "id": "p34",
   "num": "19.6",
   "title": "34. Find First and Last Position of Element in Sorted Array",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди первую и последнюю позицию `target` в отсортированном массиве (или `[-1, -1]`) за O(log n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[5,7,7,8,8,10], target = 8` → `[3,4]`"
    },
    {
     "t": "p",
     "text": "**Идея.** Первая позиция — первая с `nums[i] >= target`. Последняя — первая с `nums[i] > target`, минус 1. Два запуска одного шаблона."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def searchRange(self, nums: List[int], target: int) -> List[int]:\n        def first(ok):\n            lo, hi = 0, len(nums)\n            while lo < hi:\n                mid = (lo + hi) // 2\n                if ok(nums[mid]):\n                    hi = mid\n                else:\n                    lo = mid + 1\n            return lo\n\n        left = first(lambda x: x >= target)\n        if left == len(nums) or nums[left] != target:\n            return [-1, -1]\n        right = first(lambda x: x > target) - 1\n        return [left, right]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Это `bisect_left` и `bisect_right − 1`.",
      "Линейный обход от найденного элемента в стороны — O(n) в худшем случае (массив из одних target), так не подходит."
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
   "id": "p153",
   "num": "19.7",
   "title": "153. Find Minimum in Rotated Sorted Array",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Отсортированный массив различных чисел повернули несколько раз (`[3,4,5,1,2]`). Найди минимум за O(log n)."
    },
    {
     "t": "p",
     "text": "**Пример.** `[4,5,6,7,0,1,2]` → `0`"
    },
    {
     "t": "p",
     "text": "**Идея.** Повёрнутый массив — две отсортированные части, и все элементы первой больше всех элементов второй. Минимум — начало второй части. Элемент принадлежит второй части тогда и только тогда, когда он ≤ последнего элемента массива. Ищем первую такую позицию."
    },
    {
     "t": "array",
     "caption": "Условие nums[i] <= nums[−1] = 2: F F F F T T T — ищем первую T",
     "rows": [
      {
       "label": "nums",
       "cells": [
        4,
        5,
        6,
        7,
        0,
        1,
        2
       ],
       "hl": [
        4
       ],
       "dim": [
        0,
        1,
        2,
        3
       ]
      }
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        lo, hi = 0, len(nums) - 1\n        while lo < hi:\n            mid = (lo + hi) // 2\n            if nums[mid] <= nums[-1]:        # mid во второй (правой) части\n                hi = mid\n            else:\n                lo = mid + 1\n        return nums[lo]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Сравниваем с последним элементом, а не с первым: если массив не повёрнут, все элементы ≤ последнего, и ответ — индекс 0, что верно.",
      "Если в массиве есть повторы (задача 154), сравнение с краем перестаёт однозначно определять часть, и в худшем случае поиск вырождается в O(n)."
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
   "id": "p4",
   "num": "19.8",
   "title": "4. Median of Two Sorted Arrays",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди медиану двух отсортированных массивов за O(log(m + n))."
    },
    {
     "t": "p",
     "text": "**Пример.** `[1,3]` и `[2]` → `2.0`; `[1,2]` и `[3,4]` → `2.5`"
    },
    {
     "t": "p",
     "text": "**Идея.** Медиана делит объединение на левую и правую половины равного размера. Разрежем первый массив в позиции i, второй — в позиции `j = half − i`, где `half = (m + n + 1) // 2`. Разрез правильный, если всё слева не больше всего справа: `A[i−1] ≤ B[j]` и `B[j−1] ≤ A[i]`. Если `A[i−1] > B[j]` — i слишком велик, иначе мал. Ищем i бинарным поиском по меньшему массиву."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:\n        A, B = (nums1, nums2) if len(nums1) <= len(nums2) else (nums2, nums1)\n        m, n = len(A), len(B)\n        half = (m + n + 1) // 2\n        lo, hi = 0, m\n        inf = float('inf')\n        while True:\n            i = (lo + hi) // 2               # сколько элементов A слева от разреза\n            j = half - i                     # сколько элементов B слева\n            a_left = A[i - 1] if i > 0 else -inf\n            a_right = A[i] if i < m else inf\n            b_left = B[j - 1] if j > 0 else -inf\n            b_right = B[j] if j < n else inf\n            if a_left > b_right:             # взяли слишком много из A\n                hi = i - 1\n            elif b_left > a_right:           # взяли слишком мало из A\n                lo = i + 1\n            else:                            # разрез правильный\n                if (m + n) % 2:\n                    return float(max(a_left, b_left))\n                return (max(a_left, b_left) + min(a_right, b_right)) / 2"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Поиск ведём по меньшему массиву: тогда `j = half − i` всегда в допустимых границах второго массива.",
      "±∞ за краями массивов убирают отдельные проверки пустых половин.",
      "При нечётной длине медиана — максимум левой половины (`half` берём с округлением вверх). При чётной — среднее максимума слева и минимума справа.",
      "Простое решение — слить массивы за O(m + n) и взять середину. Его стоит назвать первым, а логарифмическое — как улучшение."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(log min(m, n)).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "19.9",
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
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/)",
       "Easy",
       "1",
       "первая позиция с nums[i] >= target (bisect_left)"
      ],
      [
       "[74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/)",
       "Medium",
       "2",
       "матрица как один отсортированный массив длины m·n"
      ],
      [
       "[162. Find Peak Element](https://leetcode.com/problems/find-peak-element/)",
       "Medium",
       "2",
       "идём в сторону подъёма: nums[mid] < nums[mid + 1] → пик правее"
      ],
      [
       "[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/)",
       "Medium",
       "1",
       "одна из половин всегда отсортирована — проверяем, лежит ли target в ней"
      ],
      [
       "[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/)",
       "Medium",
       "2",
       "два поиска: первая позиция ≥ target и первая > target"
      ],
      [
       "[153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)",
       "Medium",
       "1",
       "сравнение с последним элементом: первая позиция с nums[i] <= nums[-1]"
      ],
      [
       "[4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)",
       "Hard",
       "3",
       "бинарный поиск по разрезу меньшего массива"
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
       "[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/) · Easy",
       "[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) · Medium",
       "[153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) · Medium"
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
       "[74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) · Medium",
       "[162. Find Peak Element](https://leetcode.com/problems/find-peak-element/) · Medium",
       "[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/) · Medium"
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
       "[4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Напиши шаблон «первая позиция, где условие истинно». Почему цикл всегда заканчивается?",
   "Как найти первое и последнее вхождение числа за O(log n)?",
   "Почему в повёрнутом массиве одна из половин всегда отсортирована и как это помогает?",
   "Почему бинарный поиск работает в Find Peak Element, хотя массив не отсортирован?",
   "Что такое поиск по ответу? Приведи пример."
  ]
 }
}
