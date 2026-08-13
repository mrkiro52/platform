import { TheoryCode } from './components/TheoryTable'
import {
  PrefixSumViz, TwoPointersViz, SlidingWindowViz, FastSlowViz,
  InPlaceReversalViz, MonotonicStackViz, TopKViz, OverlappingIntervalsViz,
  BinarySearchViz, TreeTraversalViz, DFSViz, BFSViz,
  MatrixTraversalViz, BacktrackingViz, DPViz,
} from './components/PatternViz'

export default function Day24PatternsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Паттерны алгоритмических задач</h1>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Большинство задач на собеседованиях сводятся к одному из 15 паттернов.
          Освой их — и новая задача станет лишь вариацией уже знакомого шаблона.
        </p>
      </section>

      {/* ─── 1. Prefix Sum ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Префиксные суммы (Prefix Sum)</h2>
        <p>
          Предварительно строим массив P, где P[i] — сумма от начала до i.
          После этого сумма любого подотрезка [i..j] считается за O(1): <code>P[j] − P[i−1]</code>.
          Без этого каждый запрос стоил бы O(n).
        </p>
        <p><strong>Когда использовать:</strong> множество запросов суммы на подмассиве, накопленные статистики.</p>
        <PrefixSumViz />
        <TheoryCode language="python" code={`def range_sum(nums, i, j):
    # строим префиксный массив за O(n)
    P = []
    total = 0
    for v in nums:
        total += v
        P.append(total)
    # запрос за O(1)
    return P[j] - (P[i - 1] if i > 0 else 0)

nums = [1, 2, 3, 4, 5, 6]
print(range_sum(nums, 1, 3))  # → 9  (2+3+4)`} />
        <p><strong>LeetCode:</strong> #303 Range Sum Query, #525 Contiguous Array, #560 Subarray Sum Equals K</p>
      </section>

      {/* ─── 2. Two Pointers ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Два указателя (Two Pointers)</h2>
        <p>
          Два индекса движутся навстречу друг другу (или в одном направлении).
          Вместо перебора всех пар O(n²) получаем O(n). Работает на <strong>отсортированных</strong> массивах.
        </p>
        <p><strong>Когда использовать:</strong> найти пару с заданной суммой, удалить дубликаты, сравнить строки.</p>
        <TwoPointersViz />
        <TheoryCode language="python" code={`def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1   # нужна большая сумма
        else:
            right -= 1  # нужна меньшая сумма
    return []

print(two_sum_sorted([1, 2, 3, 4, 6], 6))  # → [1, 3]`} />
        <p><strong>LeetCode:</strong> #167 Two Sum II, #15 3Sum, #11 Container With Most Water</p>
      </section>

      {/* ─── 3. Sliding Window ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Скользящее окно (Sliding Window)</h2>
        <p>
          «Окно» фиксированного или переменного размера скользит по массиву.
          Вместо пересчёта суммы с нуля: вычитаем уходящий элемент, прибавляем входящий.
          Снижает O(n·k) до O(n).
        </p>
        <p><strong>Когда использовать:</strong> подмассив/подстрока с заданным условием, максимум/минимум в окне.</p>
        <SlidingWindowViz />
        <TheoryCode language="python" code={`def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # скользим
        max_sum = max(max_sum, window_sum)
    return max_sum

print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # → 9`} />
        <p><strong>LeetCode:</strong> #643 Maximum Average Subarray, #3 Longest Substring Without Repeating, #76 Minimum Window Substring</p>
      </section>

      {/* ─── 4. Fast & Slow ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Быстрый и медленный указатели (Fast & Slow)</h2>
        <p>
          «Черепаха и заяц» — slow делает 1 шаг, fast делает 2.
          Если есть цикл, fast в итоге догонит slow. Если цикла нет — fast дойдёт до конца.
        </p>
        <p><strong>Когда использовать:</strong> обнаружение цикла, середина списка, счастливые числа.</p>
        <FastSlowViz />
        <TheoryCode language="python" code={`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True   # встретились → цикл есть
    return False

def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow остановится на середине`} />
        <p><strong>LeetCode:</strong> #141 Linked List Cycle, #202 Happy Number, #287 Find the Duplicate Number</p>
      </section>

      {/* ─── 5. In-place Reversal ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Разворот связного списка на месте</h2>
        <p>
          Меняем направление указателей без выделения дополнительной памяти.
          Три переменные: <code>prev</code>, <code>curr</code>, <code>next_node</code> — всё что нужно.
        </p>
        <p><strong>Когда использовать:</strong> развернуть весь список или его часть [m..n].</p>
        <InPlaceReversalViz />
        <TheoryCode language="python" code={`def reverse_between(head, m, n):
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    # доходим до позиции m
    for _ in range(m - 1):
        prev = prev.next
    curr = prev.next
    # разворачиваем n-m раз
    for _ in range(n - m):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
    return dummy.next`} />
        <p><strong>LeetCode:</strong> #206 Reverse Linked List, #92 Reverse Linked List II, #24 Swap Nodes in Pairs</p>
      </section>

      {/* ─── 6. Monotonic Stack ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Монотонный стек (Monotonic Stack)</h2>
        <p>
          Стек хранит элементы в строго возрастающем или убывающем порядке.
          При добавлении нового элемента выталкиваем из стека всех «побеждённых».
          Для каждого из них текущий элемент и есть «следующий больший».
        </p>
        <p><strong>Когда использовать:</strong> следующий/предыдущий больший или меньший элемент, гистограммы.</p>
        <MonotonicStackViz />
        <TheoryCode language="python" code={`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # хранит индексы

    for i, v in enumerate(nums):
        # пока стек не пуст и текущий > элемента на вершине
        while stack and nums[stack[-1]] < v:
            idx = stack.pop()
            result[idx] = v  # нашли следующий больший
        stack.append(i)

    return result

print(next_greater([2, 1, 2, 4, 3]))  # → [4, 2, 4, -1, -1]`} />
        <p><strong>LeetCode:</strong> #496 Next Greater Element I, #739 Daily Temperatures, #84 Largest Rectangle in Histogram</p>
      </section>

      {/* ─── 7. Top K ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Топ K элементов (Top K Elements)</h2>
        <p>
          Min-heap размером k хранит k наибольших элементов.
          Если новый элемент больше минимума кучи — заменяем. Корень кучи = k-й наибольший.
          Работает за O(n log k) против O(n log n) полной сортировки.
        </p>
        <p><strong>Когда использовать:</strong> k-й наибольший, топ-k частых, k ближайших точек.</p>
        <TopKViz />
        <TheoryCode language="python" code={`import heapq

def kth_largest(nums, k):
    # min-heap размером k
    heap = []
    for v in nums:
        heapq.heappush(heap, v)
        if len(heap) > k:
            heapq.heappop(heap)  # убираем минимум
    return heap[0]  # корень = k-й наибольший

print(kth_largest([3, 2, 1, 5, 6, 4], 2))  # → 5`} />
        <p><strong>LeetCode:</strong> #215 Kth Largest Element, #347 Top K Frequent Elements, #373 Find K Pairs with Smallest Sums</p>
      </section>

      {/* ─── 8. Overlapping Intervals ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Перекрывающиеся интервалы (Overlapping Intervals)</h2>
        <p>
          Сортируем по началу. Для каждого следующего интервала проверяем: перекрывается ли он
          с последним в результате? Если да — расширяем конец; если нет — добавляем новый.
        </p>
        <p><strong>Когда использовать:</strong> расписания, объединение диапазонов, свободные слоты.</p>
        <OverlappingIntervalsViz />
        <TheoryCode language="python" code={`def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:          # перекрытие
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged

print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]))
# → [[1,6],[8,10],[15,18]]`} />
        <p><strong>LeetCode:</strong> #56 Merge Intervals, #57 Insert Interval, #435 Non-Overlapping Intervals</p>
      </section>

      {/* ─── 9. Binary Search ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Модифицированный бинарный поиск</h2>
        <p>
          В повёрнутом отсортированном массиве одна из половин всегда отсортирована.
          Определяем какая — и проверяем, лежит ли target в ней. Если да — ищем там, иначе в другой.
        </p>
        <p><strong>Когда использовать:</strong> поиск в ротированных/частично отсортированных массивах, поиск границ.</p>
        <BinarySearchViz />
        <TheoryCode language="python" code={`def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        # левая половина отсортирована
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        # правая половина отсортирована
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

print(search_rotated([4,5,6,7,0,1,2], 0))  # → 4`} />
        <p><strong>LeetCode:</strong> #33 Search in Rotated Sorted Array, #153 Find Minimum in Rotated, #240 Search a 2D Matrix II</p>
      </section>

      {/* ─── 10. Tree Traversal ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Обход бинарного дерева</h2>
        <p>
          Три порядка: <strong>Pre</strong> (корень→лево→право), <strong>In</strong> (лево→корень→право),
          <strong>Post</strong> (лево→право→корень). InOrder BST даёт отсортированный порядок.
        </p>
        <p><strong>Когда использовать:</strong> практически в любой задаче на деревья.</p>
        <TreeTraversalViz />
        <TheoryCode language="python" code={`def inorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)       # лево
        result.append(node.val)  # корень
        dfs(node.right)      # право
    dfs(root)
    return result

def preorder(root):
    if not root: return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def postorder(root):
    if not root: return []
    return postorder(root.left) + postorder(root.right) + [root.val]`} />
        <p><strong>LeetCode:</strong> #257 Binary Tree Paths (Pre), #230 Kth Smallest in BST (In), #124 Max Path Sum (Post)</p>
      </section>

      {/* ─── 11. DFS ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Поиск в глубину (DFS)</h2>
        <p>
          Уходим как можно глубже по одной ветке, затем откатываемся и идём в следующую.
          Реализуется рекурсией (стек вызовов) или явным стеком.
          Позволяет найти все пути, проверить связность, обойти весь граф.
        </p>
        <p><strong>Когда использовать:</strong> все пути, связность графа, топологическая сортировка, комбинации.</p>
        <DFSViz />
        <TheoryCode language="python" code={`def all_paths(graph, start, end, path=None, visited=None):
    if path is None: path = []
    if visited is None: visited = set()
    path = path + [start]
    visited.add(start)
    if start == end:
        return [path]
    paths = []
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            new_paths = all_paths(graph, neighbor, end, path, visited.copy())
            paths.extend(new_paths)
    return paths

graph = {1: [2, 3], 2: [4, 5], 3: []}
print(all_paths(graph, 1, 4))  # → [[1, 2, 4]]`} />
        <p><strong>LeetCode:</strong> #133 Clone Graph, #113 Path Sum II, #210 Course Schedule II</p>
      </section>

      {/* ─── 12. BFS ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">12. Поиск в ширину (BFS)</h2>
        <p>
          Обходим граф/дерево уровень за уровнем, используя очередь.
          Гарантированно находит кратчайший путь в невзвешенном графе —
          потому что сначала рассматриваем все узлы на расстоянии 1, затем 2 и т.д.
        </p>
        <p><strong>Когда использовать:</strong> кратчайший путь, обход по уровням, заражение/распространение.</p>
        <BFSViz />
        <TheoryCode language="python" code={`from collections import deque

def bfs_level_order(root):
    if not root: return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):   # все узлы текущего уровня
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# root = [3,9,20,null,null,15,7]
# → [[3], [9, 20], [15, 7]]`} />
        <p><strong>LeetCode:</strong> #102 Level Order Traversal, #994 Rotting Oranges, #127 Word Ladder</p>
      </section>

      {/* ─── 13. Matrix ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">13. Обход матрицы (Matrix Traversal)</h2>
        <p>
          Двумерная сетка = граф, где соседи — клетки в 4 направлениях (или 8).
          DFS/BFS применяются напрямую. Flood Fill, поиск островов — всё один паттерн.
        </p>
        <p><strong>Когда использовать:</strong> острова, заливка, распространение по сетке, лабиринт.</p>
        <MatrixTraversalViz />
        <TheoryCode language="python" code={`def flood_fill(image, sr, sc, new_color):
    old_color = image[sr][sc]
    if old_color == new_color:
        return image
    rows, cols = len(image), len(image[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if image[r][c] != old_color:
            return
        image[r][c] = new_color
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    dfs(sr, sc)
    return image

# image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, new=2
# → [[2,2,2],[2,2,0],[2,0,1]]`} />
        <p><strong>LeetCode:</strong> #733 Flood Fill, #200 Number of Islands, #130 Surrounded Regions</p>
      </section>

      {/* ─── 14. Backtracking ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">14. Возврат (Backtracking)</h2>
        <p>
          Строим решение шаг за шагом. Если зашли в тупик — откатываемся (backtrack) на шаг назад
          и пробуем следующий вариант. По сути — DFS по дереву решений с отсечением.
        </p>
        <p><strong>Когда использовать:</strong> перестановки, комбинации, подмножества, судоку, N-Queens.</p>
        <BacktrackingViz />
        <TheoryCode language="python" code={`def permutations(nums):
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])  # нашли полное решение
            return
        for i, v in enumerate(remaining):
            current.append(v)
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()              # откат

    backtrack([], nums)
    return result

print(permutations([1,2,3]))
# → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`} />
        <p><strong>LeetCode:</strong> #46 Permutations, #78 Subsets, #51 N-Queens</p>
      </section>

      {/* ─── 15. DP ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">15. Динамическое программирование (DP)</h2>
        <p>
          Разбиваем задачу на подзадачи, решаем каждую один раз и сохраняем результат.
          Два подхода: <strong>top-down</strong> (мемоизация) и <strong>bottom-up</strong> (таблица снизу вверх).
          DP применяется когда есть перекрывающиеся подзадачи и оптимальная подструктура.
        </p>
        <p><strong>Подтипы:</strong> Фибоначчи, 0/1 Knapsack, LCS, LIS, Coin Change, Partition.</p>
        <DPViz />
        <TheoryCode language="python" code={`# Top-down (мемоизация)
def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Bottom-up (таблица)
def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Knapsack 0/1
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]`} />
        <p><strong>LeetCode:</strong> #70 Climbing Stairs, #198 House Robber, #322 Coin Change, #1143 LCS, #416 Partition Equal Subset Sum</p>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Паттерны повторяются. Выучи шаблон — побеждай на любой задаче! 🎯</p>
      </section>
    </div>
  )
}
