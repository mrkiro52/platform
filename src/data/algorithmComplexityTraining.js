// Пул задач для тренировки "Сложность алгоритмов".
// answer — строго одно из: O(1), O(n), O(n log n), O(n^2), O(n^3), O(n!), O(2^n)

export const COMPLEXITY_OPTIONS = ['O(1)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(n^3)', 'O(n!)', 'O(2^n)']

export const ALGORITHM_POOL = [
  {
    id: 'array-access',
    title: 'Доступ к элементу массива по индексу',
    code: `def get_element(arr, index):
    return arr[index]`,
    answer: 'O(1)',
  },
  {
    id: 'hash-lookup',
    title: 'Поиск элемента в множестве (set)',
    code: `def contains(s: set, x):
    return x in s`,
    answer: 'O(1)',
  },
  {
    id: 'linear-search',
    title: 'Линейный поиск элемента в массиве',
    code: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,
    answer: 'O(n)',
  },
  {
    id: 'array-sum',
    title: 'Сумма всех элементов массива',
    code: `def total(arr):
    result = 0
    for x in arr:
        result += x
    return result`,
    answer: 'O(n)',
  },
  {
    id: 'find-max',
    title: 'Поиск максимума в массиве',
    code: `def find_max(arr):
    best = arr[0]
    for x in arr[1:]:
        if x > best:
            best = x
    return best`,
    answer: 'O(n)',
  },
  {
    id: 'binary-search',
    title: 'Бинарный поиск в отсортированном массиве',
    code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    answer: 'O(n)',
  },
  {
    id: 'merge-sort',
    title: 'Сортировка слиянием (Merge Sort)',
    code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    answer: 'O(n log n)',
  },
  {
    id: 'quicksort',
    title: 'Быстрая сортировка (Quicksort), средний случай',
    code: `def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + mid + quicksort(right)`,
    answer: 'O(n log n)',
  },
  {
    id: 'heapify-sort',
    title: 'Сортировка кучей (Heap Sort)',
    code: `import heapq

def heap_sort(arr):
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]`,
    answer: 'O(n log n)',
  },
  {
    id: 'bubble-sort',
    title: 'Пузырьковая сортировка (Bubble Sort)',
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
    answer: 'O(n^2)',
  },
  {
    id: 'pairs-sum',
    title: 'Поиск всех пар с заданной суммой (два вложенных цикла)',
    code: `def find_pairs(arr, target):
    pairs = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                pairs.append((i, j))
    return pairs`,
    answer: 'O(n^2)',
  },
  {
    id: 'insertion-sort',
    title: 'Сортировка вставками (Insertion Sort)',
    code: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
    answer: 'O(n^2)',
  },
  {
    id: 'matrix-multiply',
    title: 'Перемножение двух матриц n × n (наивное)',
    code: `def matmul(a, b, n):
    c = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                c[i][j] += a[i][k] * b[k][j]
    return c`,
    answer: 'O(n^3)',
  },
  {
    id: 'triple-loop-triplets',
    title: 'Поиск всех троек элементов с заданной суммой',
    code: `def find_triplets(arr, target):
    n = len(arr)
    result = []
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if arr[i] + arr[j] + arr[k] == target:
                    result.append((i, j, k))
    return result`,
    answer: 'O(n^3)',
  },
  {
    id: 'permutations',
    title: 'Генерация всех перестановок массива',
    code: `from itertools import permutations

def all_permutations(arr):
    return list(permutations(arr))`,
    answer: 'O(n!)',
  },
  {
    id: 'traveling-salesman-brute',
    title: 'Задача коммивояжёра, перебор всех маршрутов',
    code: `from itertools import permutations

def tsp_brute_force(cities, dist):
    best = float('inf')
    for route in permutations(cities[1:]):
        route = [cities[0]] + list(route)
        cost = sum(dist[route[i]][route[i+1]] for i in range(len(route) - 1))
        best = min(best, cost)
    return best`,
    answer: 'O(n!)',
  },
  {
    id: 'power-set',
    title: 'Генерация всех подмножеств множества (булеан)',
    code: `def power_set(arr):
    result = [[]]
    for x in arr:
        result += [subset + [x] for subset in result]
    return result`,
    answer: 'O(2^n)',
  },
  {
    id: 'fibonacci-naive',
    title: 'Наивный рекурсивный расчёт чисел Фибоначчи',
    code: `def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,
    answer: 'O(2^n)',
  },
  {
    id: 'subset-sum-brute',
    title: 'Проверка, есть ли подмножество с заданной суммой (полный перебор)',
    code: `def subset_sum_exists(arr, target):
    n = len(arr)
    for mask in range(2 ** n):
        total = 0
        for i in range(n):
            if mask & (1 << i):
                total += arr[i]
        if total == target:
            return True
    return False`,
    answer: 'O(2^n)',
  },
  {
    id: 'binary-to-decimal',
    title: 'Перевод двоичной строки фиксированной длины в число',
    code: `def binary_to_int(bits: str) -> int:
    return int(bits, 2)`,
    answer: 'O(1)',
  },
]
