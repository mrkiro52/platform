// Блок ноября «Алгособес», глава 24 — Многомерное динамическое программирование (Multidimensional DP).
// Теория паттерна и разбор всех задач темы из подборки LeetCode Top Interview 150.
// Файл собран скриптом: каждое решение на Python проверено тестами перед публикацией.
// Файл без импортов: его грузит и админка.

export default {
 "num": 24,
 "title": "Многомерное динамическое программирование",
 "summary": "Двумерное динамическое программирование: таблица по двум индексам — клетка сетки, два префикса строк, отрезок строки, день и число сделок; порядок заполнения и экономия памяти до одной строки; машина состояний для задач про акции; разбор 9 задач от Triangle до Best Time to Buy and Sell Stock IV.",
 "intro": "Когда состояние задачи описывается двумя числами — позиция в сетке, длины двух префиксов, начало и конец подстроки, — таблица ДП становится двумерной. Рецепт тот же, что в главе 23: состояние, переход, база, порядок, ответ. Новое только одно: нужно продумать порядок заполнения таблицы и часто — как обойтись одной строкой вместо всей таблицы.",
 "sections": [
  {
   "id": "grid",
   "num": "24.1",
   "title": "Таблица по двум индексам",
   "blocks": [
    {
     "t": "table",
     "caption": "Типичные двумерные состояния",
     "headers": [
      "Состояние dp[i][j]",
      "Задачи"
     ],
     "rows": [
      [
       "лучший путь до клетки (i, j)",
       "Minimum Path Sum, Unique Paths, Triangle, Maximal Square"
      ],
      [
       "ответ для префиксов s[:i] и t[:j]",
       "Edit Distance, Interleaving String, Longest Common Subsequence"
      ],
      [
       "ответ для подстроки s[i..j]",
       "Longest Palindromic Substring"
      ],
      [
       "день i и состояние (число сделок, держим ли акцию)",
       "Best Time to Buy and Sell Stock III и IV"
      ]
     ]
    },
    {
     "t": "p",
     "text": "**Порядок заполнения:** если переход смотрит на клетки сверху и слева, таблицу заполняем по строкам слева направо. Для подстрок `s[i..j]` переход смотрит на более короткие подстроки — заполняем по возрастанию длины или с i = n − 1 вниз."
    },
    {
     "t": "p",
     "text": "**Экономия памяти:** если строка таблицы зависит только от предыдущей, храним одну строку и обновляем её на месте. Так сетка m × n требует O(n) памяти вместо O(m·n)."
    },
    {
     "t": "h3",
     "text": "Пример: наибольшая общая подпоследовательность"
    },
    {
     "t": "p",
     "text": "Классика двумерного ДП, которой нет в подборке, но которую часто спрашивают. `dp[i][j]` — длина LCS префиксов `a[:i]` и `b[:j]`. Если последние символы равны, они входят в LCS; иначе отбрасываем последний символ одной из строк."
    },
    {
     "t": "code",
     "text": "def lcs(a, b):\n    dp = [[0] * (len(b) + 1) for _ in range(len(a) + 1)]\n    for i in range(1, len(a) + 1):\n        for j in range(1, len(b) + 1):\n            if a[i - 1] == b[j - 1]:\n                dp[i][j] = dp[i - 1][j - 1] + 1\n            else:\n                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[-1][-1]\n\nprint(lcs(\"abcde\", \"ace\"), lcs(\"abc\", \"def\"))",
     "out": "3 0"
    }
   ],
   "terms": [],
   "divider": "Теория"
  },
  {
   "id": "p120",
   "num": "24.2",
   "title": "120. Triangle",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [120. Triangle](https://leetcode.com/problems/triangle/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Треугольник чисел. Идём сверху вниз, с каждого шага — в соседний элемент нижней строки (индекс j или j + 1). Найди минимальную сумму пути."
    },
    {
     "t": "p",
     "text": "**Пример.** `[[2],[3,4],[6,5,7],[4,1,8,3]]` → `11` (2 + 3 + 5 + 1)"
    },
    {
     "t": "p",
     "text": "**Идея.** Удобнее считать снизу вверх: `dp[j]` — минимальная сумма пути от элемента (i, j) до низа. Для нижней строки это сами значения. Для строки выше — значение плюс меньший из двух нижних соседей. Ответ — `dp[0]` после верхней строки. Одной строки dp хватает."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def minimumTotal(self, triangle: List[List[int]]) -> int:\n        dp = triangle[-1][:]\n        for i in range(len(triangle) - 2, -1, -1):\n            for j in range(i + 1):\n                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])\n        return dp[0]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Снизу вверх нет краевых случаев: у каждого элемента ровно два нижних соседа.",
      "Обновление `dp[j]` слева направо безопасно: `dp[j + 1]` ещё хранит значение нижней строки.",
      "Сверху вниз тоже можно, но тогда ответ — минимум последней строки, а у краёв по одному родителю."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n²), n — число строк.",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": [],
   "divider": "Задачи подборки"
  },
  {
   "id": "p64",
   "num": "24.3",
   "title": "64. Minimum Path Sum",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 1 · золотой минимум · [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Сетка неотрицательных чисел. Путь из левого верхнего угла в правый нижний, шаги только вправо и вниз. Найди минимальную сумму пути."
    },
    {
     "t": "p",
     "text": "**Пример.** `[[1,3,1],[1,5,1],[4,2,1]]` → `7` (1 → 3 → 1 → 1 → 1)"
    },
    {
     "t": "p",
     "text": "**Идея.** В клетку можно прийти только сверху или слева, значит, лучший путь до неё — её значение плюс меньший из лучших путей до верхней и левой клеток. Первая строка и первый столбец — без выбора."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def minPathSum(self, grid: List[List[int]]) -> int:\n        m, n = len(grid), len(grid[0])\n        dp = [float('inf')] * n\n        dp[0] = 0\n        for i in range(m):\n            for j in range(n):\n                left = dp[j - 1] if j > 0 else float('inf')\n                dp[j] = grid[i][j] + min(dp[j], left)   # dp[j] сейчас — значение сверху\n        return dp[-1]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Одна строка `dp`: до обновления `dp[j]` хранит ответ для клетки сверху, `dp[j − 1]` — уже обновлённый ответ для клетки слева.",
      "Старт `dp = [0, inf, inf, …]` делает первую клетку равной `grid[0][0]`, а первую строку — префиксными суммами."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p63",
   "num": "24.4",
   "title": "63. Unique Paths II",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Робот идёт из левого верхнего угла в правый нижний только вправо и вниз. Клетки с 1 — препятствия. Сколько существует путей?"
    },
    {
     "t": "p",
     "text": "**Пример.** `[[0,0,0],[0,1,0],[0,0,0]]` → `2`"
    },
    {
     "t": "p",
     "text": "**Идея.** Число путей в клетку = пути в клетку сверху + пути в клетку слева. В клетку-препятствие путей 0. База — один путь в стартовую клетку (если она не препятствие)."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:\n        n = len(obstacleGrid[0])\n        dp = [0] * n\n        dp[0] = 1\n        for row in obstacleGrid:\n            for j in range(n):\n                if row[j] == 1:\n                    dp[j] = 0                  # через препятствие путей нет\n                elif j > 0:\n                    dp[j] += dp[j - 1]         # сверху (старое dp[j]) + слева\n        return dp[-1]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Та же одна строка, что в Minimum Path Sum, только вместо минимума — сумма.",
      "Если препятствие в стартовой клетке, на первой же итерации `dp[0]` станет 0, и ответ будет 0.",
      "Без препятствий ответ — сочетание C(m + n − 2, m − 1): выбираем, на каких из m + n − 2 шагов идём вниз."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p5",
   "num": "24.5",
   "title": "5. Longest Palindromic Substring",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди самую длинную подстроку-палиндром."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"babad\"` → `\"bab\"` или `\"aba\"`"
    },
    {
     "t": "p",
     "text": "**Идея.** ДП по подстрокам (`dp[i][j]` — палиндром ли `s[i..j]`) работает за O(n²) времени и памяти. Проще и экономнее — **расширение от центра**: у каждого палиндрома есть центр — символ (нечётная длина) или промежуток между символами (чётная). Для каждого из 2n − 1 центров расширяемся, пока символы по краям совпадают."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        def expand(l, r):                    # самый длинный палиндром с центром l..r\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                l, r = l - 1, r + 1\n            return l + 1, r                  # границы среза s[l+1:r]\n\n        best = (0, 1)\n        for c in range(len(s)):\n            for l, r in (expand(c, c), expand(c, c + 1)):   # нечётный и чётный центр\n                if r - l > best[1] - best[0]:\n                    best = (l, r)\n        return s[best[0]:best[1]]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Связь с ДП: `s[i..j]` — палиндром, если `s[i] == s[j]` и `s[i+1..j−1]` — палиндром. Расширение от центра проходит ровно по этой цепочке, но не хранит таблицу.",
      "Оба типа центров обязательны: без чётных потеряем `\"abba\"`.",
      "Алгоритм Манакера решает задачу за O(n), но на собеседованиях его почти не спрашивают."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n²).",
      "**Память:** O(1)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p97",
   "num": "24.6",
   "title": "97. Interleaving String",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [97. Interleaving String](https://leetcode.com/problems/interleaving-string/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Можно ли получить строку `s3`, чередуя символы `s1` и `s2` с сохранением их внутреннего порядка?"
    },
    {
     "t": "p",
     "text": "**Пример.** `s1 = \"aabcc\", s2 = \"dbbca\", s3 = \"aadbbcbcac\"` → `true`"
    },
    {
     "t": "p",
     "text": "**Идея.** Состояние — сколько символов взято из каждой строки: i из `s1` и j из `s2`, тогда собран префикс `s3[:i+j]`. Последний символ этого префикса пришёл либо из `s1` (если `s1[i−1] == s3[i+j−1]` и `dp[i−1][j]`), либо из `s2`."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def isInterleave(self, s1: str, s2: str, s3: str) -> bool:\n        m, n = len(s1), len(s2)\n        if m + n != len(s3):\n            return False\n        dp = [False] * (n + 1)             # одна строка таблицы по j\n        for i in range(m + 1):\n            for j in range(n + 1):\n                if i == 0 and j == 0:\n                    dp[j] = True\n                    continue\n                from_s1 = i > 0 and dp[j] and s1[i - 1] == s3[i + j - 1]       # dp[j] — строка i − 1\n                from_s2 = j > 0 and dp[j - 1] and s2[j - 1] == s3[i + j - 1]\n                dp[j] = from_s1 or from_s2\n        return dp[n]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Проверка длин — сразу отсекает очевидные `false`.",
      "Жадно брать символ «откуда совпадает» нельзя: при совпадении с обеими строками неизвестно, какой выбор правильный, — поэтому и нужно ДП.",
      "Одна строка `dp` хранит строку таблицы для текущего i; до обновления `dp[j]` — значение для `i − 1`."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p72",
   "num": "24.7",
   "title": "72. Edit Distance",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [72. Edit Distance](https://leetcode.com/problems/edit-distance/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Найди минимальное число операций (вставить, удалить, заменить символ), превращающих `word1` в `word2` — расстояние Левенштейна."
    },
    {
     "t": "p",
     "text": "**Пример.** `\"horse\" → \"ros\"` → `3`"
    },
    {
     "t": "p",
     "text": "**Идея.** `dp[i][j]` — расстояние между `word1[:i]` и `word2[:j]`. Если последние символы равны — `dp[i−1][j−1]`. Иначе 1 + минимум из трёх операций: заменить последний символ (`dp[i−1][j−1]`), удалить его из word1 (`dp[i−1][j]`), вставить последний символ word2 (`dp[i][j−1]`). База: превратить префикс в пустую строку — i удалений."
    },
    {
     "t": "table",
     "caption": "Таблица для horse → ros (строки — префиксы horse, столбцы — префиксы ros)",
     "headers": [
      "",
      "∅",
      "r",
      "o",
      "s"
     ],
     "rows": [
      [
       "∅",
       "0",
       "1",
       "2",
       "3"
      ],
      [
       "h",
       "1",
       "1",
       "2",
       "3"
      ],
      [
       "o",
       "2",
       "2",
       "1",
       "2"
      ],
      [
       "r",
       "3",
       "2",
       "2",
       "2"
      ],
      [
       "s",
       "4",
       "3",
       "3",
       "2"
      ],
      [
       "e",
       "5",
       "4",
       "4",
       "3"
      ]
     ]
    },
    {
     "t": "code",
     "text": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        m, n = len(word1), len(word2)\n        dp = list(range(n + 1))                 # строка i = 0: j вставок\n        for i in range(1, m + 1):\n            diag, dp[0] = dp[0], i              # diag — dp[i-1][j-1]\n            for j in range(1, n + 1):\n                up = dp[j]                      # dp[i-1][j]\n                if word1[i - 1] == word2[j - 1]:\n                    dp[j] = diag\n                else:\n                    dp[j] = 1 + min(diag, up, dp[j - 1])   # замена, удаление, вставка\n                diag = up\n        return dp[n]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Таблицу (m + 1) × (n + 1) с базой в нулевой строке и столбце удобно сначала нарисовать — как в иллюстрации.",
      "При сжатии до одной строки нужно отдельно хранить «диагональ» `dp[i−1][j−1]`: она затирается на предыдущем шаге.",
      "Восстановить сами операции можно по полной таблице, идя из правого нижнего угла назад."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p221",
   "num": "24.8",
   "title": "221. Maximal Square",
   "blocks": [
    {
     "t": "p",
     "text": "**Medium** · уровень 2 · уверенный · [221. Maximal Square](https://leetcode.com/problems/maximal-square/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Матрица из `\"0\"` и `\"1\"`. Найди площадь наибольшего квадрата из единиц."
    },
    {
     "t": "p",
     "text": "**Пример.** `[[\"1\",\"0\",\"1\",\"0\",\"0\"],[\"1\",\"0\",\"1\",\"1\",\"1\"],[\"1\",\"1\",\"1\",\"1\",\"1\"],[\"1\",\"0\",\"0\",\"1\",\"0\"]]` → `4`"
    },
    {
     "t": "p",
     "text": "**Идея.** `dp[i][j]` — сторона наибольшего квадрата из единиц с **правым нижним углом** в (i, j). Квадрат стороны k с углом в (i, j) существует, если такие квадраты стороны k − 1 есть с углами сверху, слева и по диагонали. Поэтому `dp[i][j] = 1 + min(трёх соседей)` для клетки с единицей."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maximalSquare(self, matrix: List[List[str]]) -> int:\n        n = len(matrix[0])\n        dp = [0] * (n + 1)                 # dp[j + 1] — клетка (i, j); dp[0] — заглушка\n        best = 0\n        for row in matrix:\n            diag = 0                       # dp[i-1][j-1]\n            for j in range(n):\n                up = dp[j + 1]\n                if row[j] == '1':\n                    dp[j + 1] = 1 + min(up, dp[j], diag)\n                    best = max(best, dp[j + 1])\n                else:\n                    dp[j + 1] = 0\n                diag = up\n        return best * best"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Минимум из трёх соседей: самый маленький из них ограничивает квадрат — нельзя расшириться дальше, чем позволяет худшее направление.",
      "Ответ — площадь, то есть квадрат стороны.",
      "Сдвиг индексов на 1 (`dp[j + 1]`) убирает проверки на первый столбец."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(m·n).",
      "**Память:** O(n)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "p123",
   "num": "24.9",
   "title": "123. Best Time to Buy and Sell Stock III",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Цены акции по дням. Можно совершить не больше **двух** сделок (купить и продать), держать одновременно не больше одной акции. Найди максимальную прибыль."
    },
    {
     "t": "p",
     "text": "**Пример.** `[3,3,5,0,0,3,1,4]` → `6` (0 → 3 и 1 → 4)"
    },
    {
     "t": "p",
     "text": "**Идея.** Опишем четыре состояния после очередного дня: лучший баланс, если сделали первую покупку (`buy1`), первую продажу (`sell1`), вторую покупку (`buy2`), вторую продажу (`sell2`). Каждый день каждое состояние либо остаётся, либо получается из предыдущего действием сегодня."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        buy1 = buy2 = float('-inf')\n        sell1 = sell2 = 0\n        for p in prices:\n            buy1 = max(buy1, -p)              # купили первую акцию\n            sell1 = max(sell1, buy1 + p)      # продали первую\n            buy2 = max(buy2, sell1 - p)       # купили вторую на прибыль от первой\n            sell2 = max(sell2, buy2 + p)      # продали вторую\n        return sell2"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Состояния — шаги «конечного автомата» сделок, переходы — купить или продать сегодня.",
      "Порядок обновления в одном дне допускает покупку и продажу в тот же день — это даёт нулевую сделку и не ломает ответ.",
      "`sell2 ≥ sell1`: если выгодна одна сделка, вторая может быть нулевой."
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
   "id": "p188",
   "num": "24.10",
   "title": "188. Best Time to Buy and Sell Stock IV",
   "blocks": [
    {
     "t": "p",
     "text": "**Hard** · уровень 3 · всё · [188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)"
    },
    {
     "t": "p",
     "text": "**Условие.** Как предыдущая задача, но сделок не больше k."
    },
    {
     "t": "p",
     "text": "**Пример.** `k = 2, [3,2,6,5,0,3]` → `7`"
    },
    {
     "t": "p",
     "text": "**Идея.** Обобщаем четыре переменные до массивов `buy[t]` и `sell[t]` для t = 1…k: `buy[t] = max(buy[t], sell[t−1] − p)`, `sell[t] = max(sell[t], buy[t] + p)`. Если k ≥ n / 2, ограничение на число сделок не мешает — это задача 122, где берём все подъёмы цены."
    },
    {
     "t": "code",
     "text": "class Solution:\n    def maxProfit(self, k: int, prices: List[int]) -> int:\n        if k >= len(prices) // 2:                           # сделок хватает на все подъёмы\n            return sum(max(0, b - a) for a, b in zip(prices, prices[1:]))\n        buy = [float('-inf')] * (k + 1)\n        sell = [0] * (k + 1)\n        for p in prices:\n            for t in range(1, k + 1):\n                buy[t] = max(buy[t], sell[t - 1] - p)\n                sell[t] = max(sell[t], buy[t] + p)\n        return sell[k]"
    },
    {
     "t": "p",
     "text": "**Разбор решения**"
    },
    {
     "t": "ol",
     "items": [
      "Состояние ДП — (день, номер сделки, держим ли акцию); день убран, потому что переход смотрит только на предыдущий день.",
      "Проверка `k >= n // 2` защищает от огромных k: без неё решение было бы O(n·k) при k до 10⁹.",
      "Все задачи серии (121, 122, 123, 188, с комиссией и с «заморозкой») решаются этой же машиной состояний — полезно знать как один приём."
     ]
    },
    {
     "t": "ul",
     "items": [
      "**Время:** O(n·k).",
      "**Память:** O(k)."
     ]
    }
   ],
   "terms": []
  },
  {
   "id": "summary",
   "num": "24.11",
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
       "[120. Triangle](https://leetcode.com/problems/triangle/)",
       "Medium",
       "2",
       "снизу вверх: dp[j] = triangle[i][j] + min(dp[j], dp[j + 1])"
      ],
      [
       "[64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/)",
       "Medium",
       "1",
       "dp[i][j] = grid[i][j] + min(сверху, слева)"
      ],
      [
       "[63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/)",
       "Medium",
       "2",
       "число путей = сверху + слева; препятствие — 0"
      ],
      [
       "[5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/)",
       "Medium",
       "2",
       "расширение от центра (2n − 1 центров)"
      ],
      [
       "[97. Interleaving String](https://leetcode.com/problems/interleaving-string/)",
       "Medium",
       "2",
       "dp[i][j] — можно ли собрать s3[:i+j] из s1[:i] и s2[:j]"
      ],
      [
       "[72. Edit Distance](https://leetcode.com/problems/edit-distance/)",
       "Medium",
       "2",
       "dp[i][j] — расстояние между префиксами; вставка, удаление, замена"
      ],
      [
       "[221. Maximal Square](https://leetcode.com/problems/maximal-square/)",
       "Medium",
       "2",
       "dp[i][j] = 1 + min(сверху, слева, по диагонали)"
      ],
      [
       "[123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/)",
       "Hard",
       "3",
       "машина состояний: buy1, sell1, buy2, sell2"
      ],
      [
       "[188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/)",
       "Hard",
       "3",
       "та же машина состояний для k сделок: buy[t], sell[t]"
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
       "[64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) · Medium"
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
       "[120. Triangle](https://leetcode.com/problems/triangle/) · Medium",
       "[63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/) · Medium",
       "[5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) · Medium",
       "[97. Interleaving String](https://leetcode.com/problems/interleaving-string/) · Medium",
       "[72. Edit Distance](https://leetcode.com/problems/edit-distance/) · Medium",
       "[221. Maximal Square](https://leetcode.com/problems/maximal-square/) · Medium"
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
       "[123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) · Hard",
       "[188. Best Time to Buy and Sell Stock IV](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/) · Hard"
      ]
     }
    ]
   }
  ],
  "selfCheckTitle": "Проверь себя",
  "selfCheckIntro": "Ответь вслух, как на собеседовании:",
  "selfCheck": [
   "Как выбрать порядок заполнения двумерной таблицы ДП?",
   "Как сократить память в Minimum Path Sum до одной строки и почему это корректно?",
   "Объясни переходы в Edit Distance: что означают три варианта?",
   "Почему в Maximal Square берётся минимум из трёх соседей?",
   "Как устроена машина состояний для задач про акции и как она обобщается на k сделок?"
  ]
 }
}
