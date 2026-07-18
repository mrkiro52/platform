import { useEffect, useState } from 'react'
import { SCHEDULE } from '../data'
import { api } from '../api'

const HOMEWORK_CONTENT = {
  1: {
    title: 'Дневник лагеря и инструменты',
    tasks: [
      {
        num: 1,
        title: 'Завести дневник лагеря',
        description: `Вы можете выбрать любой удобный для вас формат:
• На бумаге в тетради
• В Google Таблице
• В Notion
• В любом другом удобном вам формате

В дневнике вы сможете:
• Дублировать ссылки на материалы дня
• Добавлять ссылки на домашние задания
• Сохранять решения домашних заданий
• Писать свои мысли и заметки

Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после`
      },
      {
        num: 2,
        title: 'Скачать Visual Studio Code',
        description: `Это текстовый редактор для написания кода, который мы будем использовать на занятиях.

Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!

Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀`
      }
    ]
  },
  2: {
    title: 'Типы данных, арифметика и условия',
    tasks: [
      { num: 1, title: 'Сумма двух чисел', description: 'Считайте два целых числа с клавиатуры и выведите их сумму.' },
      { num: 2, title: 'Площадь прямоугольника', description: 'Считайте ширину и высоту прямоугольника (целые числа). Выведите его площадь.' },
      { num: 3, title: 'Часы и минуты', description: 'Дано количество минут (целое число). Выведите, сколько это полных часов и остаток минут.' },
      { num: 4, title: 'Четность числа', description: 'Считайте целое число. Выведите «Чётное», если число делится на 2, иначе — «Нечётное».' },
      { num: 5, title: 'Знак числа', description: 'Считайте вещественное число. Определите его знак: выведите «Положительное», «Отрицательное» или «Ноль».' },
      { num: 6, title: 'Наибольшее из трёх', description: 'Считайте три целых числа. Выведите наибольшее из них. Не используйте встроенную функцию max().' },
      { num: 7, title: 'Деление с обработкой', description: 'Считайте два числа a и b. Если b равно нулю — выведите «Деление на ноль невозможно», иначе выведите результат деления a на b с двумя знаками после запятой.' },
      { num: 8, title: 'Високосный год', description: 'Считайте год. Год является високосным, если делится на 4, но не делится на 100, или делится на 400. Выведите «Високосный» или «Обычный».' },
      { num: 9, title: 'Калькулятор', description: 'Считайте два числа и символ операции (+, -, *, /). Выполните соответствующую операцию и выведите результат. Обработайте деление на ноль и неизвестную операцию.' },
      { num: 10, title: 'Оценка по баллам', description: 'Считайте балл от 0 до 100. Выведите оценку: 90–100 → «A», 80–89 → «B», 70–79 → «C», 60–69 → «D», 0–59 → «F». Если балл вне диапазона — выведите «Ошибка».' },
      { num: 11, title: 'Проверка диапазона', description: 'Считайте три числа: a, b и x. Определите, попадает ли x в закрытый отрезок [a, b]. Выведите «Внутри» или «Снаружи». Гарантируется, что a ≤ b.' },
      { num: 12, title: 'Расчет абонентской платы', description: 'Абонент платит 300 руб/мес за 100 минут. Каждая дополнительная минута стоит 3 руб. Считайте количество минут, выведите итоговую стоимость.' },
      { num: 13, title: 'Количество цифр', description: 'Считайте положительное целое число. Выведите, сколько в нём цифр: однозначное (1–9), двузначное (10–99), трёхзначное (100–999) или «больше трех знаков».' },
      { num: 14, title: 'Расчет ИМТ', description: 'Считайте рост (м) и вес (кг). Вычислите ИМТ = вес / рост². Выведите значение с 1 знаком и категорию: < 18.5 — «Недостаток веса», 18.5–24.9 — «Норма», 25–29.9 — «Избыточный вес», ≥ 30 — «Ожирение».' },
      { num: 15, title: 'Проверка треугольника', description: 'Считайте три стороны треугольника. Сначала проверьте, можно ли из них построить треугольник (сумма двух сторон > третьей). Если нет — выведите «Не треугольник». Иначе — «Равносторонний», «Равнобедренный» или «Разносторонний».' },
      { num: 16, title: 'Квадратное уравнение', description: 'Считайте коэффициенты a, b, c квадратного уравнения ax² + bx + c = 0. Если a == 0, уравнение линейное — обработайте отдельно. Иначе найдите дискриминант. Выведите корни (2 корня / 1 корень / нет корней).' },
      { num: 17, title: 'Проверка даты', description: 'Считайте день, месяц и год. Проверьте корректность даты: месяц 1–12, день 1–(кол-во дней в месяце), учитывая високосный год для февраля. Выведите «Корректная» или «Некорректная».' },
      { num: 18, title: 'Перевод в другую систему', description: 'Считайте неотрицательное целое число и основание системы счисления (2, 8 или 16). Выведите число в этой системе. Не используйте встроенные bin(), oct(), hex().' },
      { num: 19, title: 'Выдача сдачи', description: 'Покупатель дает купюру номиналом 50, 100, 200, 500 или 1000 руб. за товар стоимостью price (целое, < номинала). Посчитайте сдачу и выразите её минимальным количеством купюр/монет: 100, 50, 10, 5, 2, 1 руб.' },
      { num: 20, title: 'Цифровой корень', description: 'Цифровой корень числа — сумма его цифр, применяемая повторно до получения однозначного числа. Считайте натуральное число и выведите его цифровой корень, не используя рекурсию и циклы — только арифметику и условные операторы.' },
      { num: 21, title: 'Кубическое уравнение', description: 'С клавиатуры вводятся числа a, b, c и d. Нужно вывести корни уравнения третьей степени ax³ + bx² + cx + d = 0. Учитывайте в решении, что a, b, c и d могут быть и нулем.' }
    ]
  },
  3: {
    title: 'Циклы и функции',
    tasks: [
      { num: 1, title: 'Сумма в диапазоне', description: 'Напишите функцию, которая вычисляет сумму всех чисел от start до end включительно, используя цикл. Не используйте встроенную функцию sum().' },
      { num: 2, title: 'Палиндром', description: 'Проверьте, является ли число палиндромом (читается одинаково в обе стороны). Используйте цикл, а не преобразование в строку.' },
      { num: 3, title: 'Количество делителей', description: 'Найдите количество делителей числа n (не считая самого числа). Например, делители 12: 1, 2, 3, 4, 6.' },
      { num: 4, title: 'Степень двойки', description: 'Напишите функцию, которая проверяет, является ли число степенью двойки (2⁰=1, 2¹=2, 2²=4, и т.д.). Без циклов и встроенных функций вроде log.' },
      { num: 5, title: 'НОД (алгоритм Евклида)', description: 'Найдите НОД двух чисел без встроенной функции. Используйте рекурсию или алгоритм Евклида.' },
      { num: 6, title: 'Факториал', description: 'Напишите функцию для вычисления факториала n. Обработайте граничные случаи (0! = 1). Используйте рекурсию.' },
      { num: 7, title: 'Второй максимум', description: 'Найдите второе по величине число в списке. Гарантируется, что в списке минимум 2 различных элемента.' },
      { num: 8, title: 'Пересечение массивов', description: 'Найдите все элементы, которые есть в обоих массивах (пересечение). Результат должен содержать уникальные элементы.' }
    ]
  },
  4: {
    title: 'Big O анализ сложности',
    tasks: [
      {
        num: 1,
        title: 'Сумма элементов массива',
        description: `def sum_array(arr):
    total = 0
    for num in arr:
        total += num
    return total
# Определите Big O`
      },
      {
        num: 2,
        title: 'Проверка всех пар',
        description: `def has_pair_sum(arr, target):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                return True
    return False
# Определите Big O`
      },
      {
        num: 3,
        title: 'Быстрое возведение в степень',
        description: `def power(x, n):
    if n == 0: return 1
    if n % 2 == 0:
        half = power(x, n // 2)
        return half * half
    else:
        return x * power(x, n - 1)
# Определите Big O`
      },
      {
        num: 4,
        title: 'Максимум в матрице',
        description: `def find_max_matrix(matrix):
    max_val = matrix[0][0]
    for row in matrix:
        for val in row:
            if val > max_val:
                max_val = val
    return max_val
# Определите Big O`
      },
      {
        num: 5,
        title: 'Сортировка выбором',
        description: `def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i + 1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
# Определите Big O`
      },
      {
        num: 6,
        title: 'Поиск дубликата',
        description: `def has_duplicate_naive(arr):
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] == arr[j]:
                return True
    return False
# Определите Big O (есть способ O(n)!)`
      },
      {
        num: 7,
        title: 'Фибоначчи рекурсивно',
        description: `def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
# Это ОЧЕНЬ медленно!
# Определите Big O`
      },
      {
        num: 8,
        title: 'Фибоначчи с запоминанием (динамическое программирование)',
        description: `def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
# Это намного быстрее
# Определите Big O`
      }
    ]
  },
  6: {
    title: 'Дискретная математика: графы и алгоритмы',
    tasks: [
      {
        num: 1,
        title: 'Граф как словарь (Adjacency List)',
        description: `Реализуй граф используя словарь (самый популярный способ):

# Неориентированный граф
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Ориентированный граф
directed = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': []
}

Напиши функции:
def add_edge(graph, u, v):
    # Добавь ребро между u и v
    pass

def remove_edge(graph, u, v):
    # Удали ребро
    pass

def get_neighbors(graph, node):
    # Верни всех соседей узла
    pass

Плюсы: быстро, простой доступ, экономит память на разреженных графах
Минусы: медленный поиск ребра`
      },
      {
        num: 2,
        title: 'Граф как матрица смежности (Adjacency Matrix)',
        description: `Реализуй граф используя 2D массив:

# Матрица смежности для 4 узлов
#     0 1 2 3
# 0 [[0,1,1,0],
# 1  [1,0,0,1],
# 2  [1,0,0,1],
# 3  [0,1,1,0]]

class Graph:
    def __init__(self, num_nodes):
        self.num_nodes = num_nodes
        self.matrix = [[0] * num_nodes for _ in range(num_nodes)]

    def add_edge(self, u, v):
        # Добавь ребро между u и v
        self.matrix[u][v] = 1
        self.matrix[v][u] = 1  # для неориентированного

    def remove_edge(self, u, v):
        # Удали ребро
        pass

    def has_edge(self, u, v):
        # Проверь есть ли ребро
        pass

Плюсы: быстрый поиск ребра O(1), удобно для плотных графов
Минусы: требует O(n²) памяти даже для пустого графа`
      },
      {
        num: 3,
        title: 'Обход в ширину (BFS - Breadth-First Search)',
        description: `Обойди граф уровень за уровнем (как волны в воде):

def bfs(graph, start):
    # Верни список посещённых узлов в порядке BFS
    from collections import deque

    visited = set()
    queue = deque([start])
    result = []

    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            # Добавь всех соседей в очередь
            pass

    return result

Пример:
graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': [],
    'F': []
}
bfs(graph, 'A') → ['A', 'B', 'C', 'D', 'E', 'F']

Сложность: O(V + E) где V - вершины, E - рёбра
Используется для: поиск кратчайшего пути, уровневый обход`
      },
      {
        num: 4,
        title: 'Обход в глубину (DFS - Depth-First Search)',
        description: `Обойди граф глубоко в каждую ветку:

# Итеративный способ со стеком
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    result = []

    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            result.append(node)
            # Добавь соседей в стек
            pass

    return result

# Рекурсивный способ
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()

    visited.add(node)
    result = [node]

    for neighbor in graph[node]:
        if neighbor not in visited:
            # Рекурсивный вызов
            pass

    return result

Пример:
dfs_iterative(graph, 'A') → ['A', 'C', 'F', 'B', 'E', 'D']

Сложность: O(V + E)
Используется для: поиск связных компонент, топологическая сортировка, обнаружение цикла`
      },
      {
        num: 5,
        title: 'Поиск кратчайшего пути (Shortest Path)',
        description: `Найди кратчайший путь между двумя узлами:

def shortest_path(graph, start, end):
    # Используй BFS чтобы найти кратчайший путь
    # Верни список узлов от start до end
    from collections import deque

    visited = {start}
    queue = deque([(start, [start])])

    while queue:
        node, path = queue.popleft()
        if node == end:
            return path

        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                # Добавь в очередь новый путь
                pass

    return None  # Пути нет

Пример:
graph = {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['D'],
    'D': ['E'],
    'E': []
}
shortest_path(graph, 'A', 'E') → ['A', 'B', 'D', 'E'] или ['A', 'C', 'D', 'E']

Сложность: O(V + E)
Почему BFS? Потому что обходит по уровням и найдёт кратчайший путь первым`
      },
      {
        num: 6,
        title: 'Обнаружение цикла в графе',
        description: `Определи, есть ли цикл в графе:

def has_cycle(graph):
    # Для ориентированного графа используй DFS с раскраской
    # Белый (0) - не посещён
    # Серый (1) - сейчас посещаем
    # Чёрный (2) - полностью обработан

    color = {node: 0 for node in graph}

    def dfs(node):
        if color[node] == 1:  # Нашли серый - цикл!
            return True
        if color[node] == 2:  # Уже полностью обработан
            return False

        color[node] = 1  # Становится серым
        for neighbor in graph.get(node, []):
            if dfs(neighbor):
                return True
        color[node] = 2  # Становится чёрным
        return False

    for node in graph:
        if color[node] == 0:
            if dfs(node):
                return True
    return False

Примеры:
Граф БЕЗ цикла: A→B→C (это дерево)
Граф С циклом: A→B→C→A`
      },
      {
        num: 7,
        title: 'Поиск связных компонент',
        description: `Найди все отдельные компоненты в графе:

def find_components(graph):
    # Верни список списков, где каждый внутренний - компонента
    visited = set()
    components = []

    def dfs(node, component):
        visited.add(node)
        component.append(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor, component)

    for node in graph:
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)

    return components

Пример:
graph = {
    'A': ['B'],
    'B': ['A'],
    'C': ['D'],
    'D': ['C'],
    'E': []
}
find_components(graph) → [['A','B'], ['C','D'], ['E']]

Используется для: проверка связности, социальные сети (группы друзей)`
      },
      {
        num: 8,
        title: 'Топологическая сортировка (для DAG)',
        description: `Отсортируй узлы так чтобы для каждого ребра u→v узел u был раньше v:

def topological_sort(graph):
    # Работает только для ориентированного графа БЕЗ циклов (DAG)
    visited = set()
    stack = []

    def dfs(node):
        visited.add(node)
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)  # Добавляем ПОСЛЕ рекурсии

    for node in graph:
        if node not in visited:
            dfs(node)

    return stack[::-1]  # Переворачиваем

Пример (зависимости между курсами):
graph = {
    'Основы': ['Python', 'Git'],
    'Python': ['Django'],
    'Git': [],
    'Django': []
}
topological_sort(graph) → ['Основы', 'Python', 'Django', 'Git']

Используется для: расписание задач, зависимости пакетов, порядок выполнения работ`
      },
      {
        num: 9,
        title: 'Проверка двудольности графа (Bipartite)',
        description: `Определи, можно ли раскрасить узлы в 2 цвета так чтобы соседи имели разные цвета:

def is_bipartite(graph):
    # Используй BFS с раскраской в 2 цвета
    from collections import deque

    color = {}

    for start in graph:
        if start in color:
            continue

        queue = deque([start])
        color[start] = 0

        while queue:
            node = queue.popleft()
            for neighbor in graph.get(node, []):
                if neighbor not in color:
                    color[neighbor] = 1 - color[node]
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False  # Сосед имеет тот же цвет = не двудольный

    return True

Примеры:
Двудольный: A-B-C (можно раскрасить: красный-синий-красный)
НЕ двудольный: A-B, B-C, C-A (треугольник, нельзя раскрасить в 2 цвета)

Используется для: проверка шахматной доски, паросочетания, проверка графика`
      },
      {
        num: 10,
        title: 'Проверка эйлерова пути/цикла',
        description: `Определи, можно ли пройти по графу посетив каждое ребро ровно один раз:

def has_euler_path(graph, num_vertices):
    # Условия существования эйлерова пути:
    # 1. Граф должен быть связный
    # 2. Все вершины должны иметь чётную степень (цикл)
    #    ИЛИ ровно 2 вершины нечётной степени (путь)

    # Посчитай степень каждой вершины
    degree = {}
    for node in graph:
        degree[node] = len(graph.get(node, []))

    odd_degree_count = sum(1 for d in degree.values() if d % 2 == 1)

    if odd_degree_count == 0:
        return "Эйлеров ЦИКЛ"  # Можно начать с любой
    elif odd_degree_count == 2:
        return "Эйлеров ПУТЬ"   # Начни с нечётной степени
    else:
        return "Пути нет"

Пример (мост Кёнигсберга):
Есть 4 острова, соединённые 7 мостами.
Вопрос: можно ли пройти по каждому мосту ровно один раз?
Ответ: НЕТ, потому что более 2 вершин имеют нечётную степень

Используется для: маршруты почтальона, уборка улиц, печать схем без повтора`
      }
    ]
  },
  7: {
    title: 'Структуры данных: динамические массивы и связные списки',
    tasks: [
      {
        num: 1,
        title: 'Реализация динамического массива (DynamicArray)',
        description: `Реализуй простой динамический массив с методами:

class DynamicArray:
    def __init__(self, capacity=10):
        self.arr = [None] * capacity
        self.size = 0
        self.capacity = capacity

    def append(self, value):
        # Добавь элемент в конец
        # Если массив полный - увеличь его вдвое
        pass

    def insert(self, index, value):
        # Вставь элемент на позицию index
        # Сдвинь остальные элементы вправо
        pass

    def remove(self, index):
        # Удали элемент на позиции index
        # Сдвинь остальные влево
        pass

    def get(self, index):
        # Верни элемент по индексу
        pass

Тест:
arr = DynamicArray()
arr.append(1)
arr.append(2)
arr.insert(0, 0)  # [0, 1, 2]
arr.remove(1)     # [0, 2]`
      },
      {
        num: 2,
        title: 'Реализация односвязного списка (LinkedList)',
        description: `Реализуй односвязный список с нодами:

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        # Добавь элемент в конец списка
        pass

    def insert_at_head(self, data):
        # Вставь в начало
        pass

    def remove(self, data):
        # Удали первый элемент с значением data
        pass

    def search(self, data):
        # Найди элемент, верни True/False
        pass

    def display(self):
        # Выведи все элементы: 1 -> 2 -> 3 -> None
        pass

Тест:
ll = LinkedList()
ll.append(1)
ll.append(2)
ll.insert_at_head(0)
ll.display()  # 0 -> 1 -> 2 -> None`
      },
      {
        num: 3,
        title: 'Реализация двусвязного списка (DoublyLinkedList)',
        description: `Реализуй двусвязный список (может ходить туда-сюда):

class DNode:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

class DoublyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        # Добавь в конец, обновляя prev
        pass

    def insert_at_head(self, data):
        # Вставь в начало
        pass

    def remove(self, data):
        # Удали элемент
        # Обнови both prev и next
        pass

    def reverse_display(self):
        # Выведи список в обратном порядке
        # Начиная с конца
        pass

Почему двусвязный нужен?
- Быстрое удаление если есть ссылка на ноду
- Движение в обе стороны
- Итератор на обратный проход`
      },
      {
        num: 4,
        title: 'Реверс односвязного списка',
        description: `Реализуй функцию разворота связного списка:

def reverse_linked_list(head):
    # Входной параметр: head линкованного списка
    # Выходной параметр: head развернутого списка
    # Не используй доп. структуры данных!
    pass

Пример:
Было: 1 -> 2 -> 3 -> None
Стало: 3 -> 2 -> 1 -> None

Алгоритм (3 указателя):
prev = None
current = head
while current:
    next = current.next
    current.next = prev
    prev = current
    current = next`
      },
      {
        num: 5,
        title: 'Поиск середины списка',
        description: `Найди элемент в середине односвязного списка:

def find_middle(head):
    # Верни ноду которая находится в середине
    # Если два элемента в конце - верни второй
    pass

Пример:
1 -> 2 -> 3 -> 4 -> 5 -> None
Ответ: Node(3)

Подсказка: используй two pointers технику!
(она же Алгоритм Заяц-Черепаха / Метод быстрого и медленного указателей)
- slow указатель: шагает на 1
- fast указатель: шагает на 2
Когда fast достигнет конца - slow будет в середине`
      },
      {
        num: 6,
        title: 'Обнаружение цикла в списке',
        description: `Определи, есть ли цикл в связном списке:

def has_cycle(head):
    # Верни True если есть цикл, False иначе
    pass

Пример с циклом:
1 -> 2 -> 3 -> 4
          ^    |
          |____|  (4 указывает на 3)

Алгоритм: Floyd's Cycle Detection (следует погуглить)
- slow: шагает на 1
- fast: шагает на 2
- Если fast поймает slow = есть цикл
- Если fast достигнет None = нет цикла`
      },
      {
        num: 7,
        title: 'Слияние двух отсортированных списков',
        description: `Слей два отсортированных связных списка в один:

def merge_sorted_lists(head1, head2):
    # head1: 1 -> 3 -> 5 -> None
    # head2: 2 -> 4 -> 6 -> None
    # Результат: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> None
    pass

Алгоритм:
- Два указателя: current1 и current2
- Сравниваешь элементы
- Меньший добавляешь в результат
- Сдвигаешь тот указатель
- В конце добавляешь остаток

Сложность: O(n + m), где n и m - длины списков`
      },
      {
        num: 8,
        title: 'Удаление N-го элемента с конца',
        description: `Удали N-й элемент считая с конца (без пересчета длины!):

def remove_nth_from_end(head, n):
    # Удали N-й элемент с конца
    # Верни новый head
    pass

Пример:
1 -> 2 -> 3 -> 4 -> 5, n=2
Результат: 1 -> 2 -> 3 -> 5

Подсказка: two pointers с gap!
- first указатель на n позиций впереди
- second и first идут вместе
- Когда first достигнет конца - second перед элементом к удалению`
      },
      {
        num: 9,
        title: 'Проверка палиндрома в списке',
        description: `Проверь, является ли связный список палиндромом:

def is_palindrome(head):
    # Верни True если список читается одинаково в обе стороны
    pass

Пример:
1 -> 2 -> 3 -> 2 -> 1 -> None  ✅ True
1 -> 2 -> 3 -> None             ❌ False

Алгоритм (без разворота всего списка):
1. Найди середину (two pointers)
2. Разверни вторую половину
3. Сравни первую половину со второй в обратном порядке

Сложность: O(n) время, O(1) память`
      },
      {
        num: 10,
        title: 'Сортировка списка (Merge Sort)',
        description: `Отсортируй связный список используя merge sort:

def sort_linked_list(head):
    # Верни отсортированный head
    # Используй divide & conquer
    pass

Алгоритм:
1. Раздели список пополам (find_middle)
2. Рекурсивно отсортируй обе половины
3. Слей две половины (merge_sorted_lists)

Пример:
4 -> 2 -> 1 -> 3 -> None
Результат: 1 -> 2 -> 3 -> 4 -> None

Сложность: O(n log n) - как обычный merge sort
Преимущество: работает с памятью O(log n) для рекурсии (не O(n))`
      }
    ]
  },
  5: {
    title: 'Булева алгебра и множества',
    tasks: [
      {
        num: 1,
        title: 'Упростить выражение',
        description: `Упростить выражение, используя законы де Моргана:
¬(A ∧ B) ∨ (A ∨ B)`
      },
      {
        num: 2,
        title: 'Упростить выражение',
        description: `Упростить:
¬(A ∨ B) ∧ (A ∨ B)`
      },
      {
        num: 3,
        title: 'Таблица истинности',
        description: `Построить таблицу истинности для выражения:
(A ∧ B) ∨ ¬C`
      },
      {
        num: 4,
        title: 'Операции над множествами',
        description: `Заданы множества A = {2, 4, 6, 8}, B = {4, 8, 12, 16}. Найти:
a) A ∪ B
b) A ∩ B
c) A \\ B`
      },
      {
        num: 5,
        title: 'Битовые операции',
        description: `Вычислить результат битовых операций для A = 6 (0110) и B = 5 (0101)
a) A AND B
b) A OR B
c) A XOR B`
      },
      {
        num: 6,
        title: 'Практическая задача',
        description: `В магазине товар покупают, если (цена низкая ИЛИ хороший рейтинг) И (наличие на складе).
Будет ли товар куплен, если цена высокая, рейтинг 4.8, товар есть?`
      }
    ]
  },
  8: {
    title: 'Стеки и очереди',
    tasks: [
      {
        num: 1,
        title: 'Реализация стека (LIFO)',
        description: `Реализуй стек с методами push, pop и peek.

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item):
        # Добавь элемент в стек
        pass

    def pop(self):
        # Удали и верни верхний элемент
        # Верни None если стек пуст
        pass

    def peek(self):
        # Посмотри верхний элемент без удаления
        pass

    def is_empty(self):
        pass

Тест:
stack = Stack()
stack.push(1)
stack.push(2)
stack.push(3)
print(stack.pop())  # 3
print(stack.peek()) # 2`
      },
      {
        num: 2,
        title: 'Реализация очереди (FIFO)',
        description: `Реализуй очередь с методами enqueue, dequeue и peek.

class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item):
        # Добавь элемент в конец очереди
        pass

    def dequeue(self):
        # Удали и верни первый элемент
        # Верни None если очередь пуста
        pass

    def peek(self):
        # Посмотри первый элемент без удаления
        pass

    def is_empty(self):
        pass

Тест:
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
print(queue.dequeue())  # 1
print(queue.peek())     # 2`
      },
      {
        num: 3,
        title: 'Проверка правильной скобочной последовательности',
        description: `Реализуй функцию, которая проверяет, правильно ли расставлены круглые скобки.

def is_valid_parentheses(s):
    # Возврати True если скобки правильные, False иначе
    # Используй стек!
    pass

Примеры:
"()" → True
"(())" → True
"())" → False
"(((" → False
"(()())" → True`
      },
      {
        num: 4,
        title: 'Проверка скобок трех типов: (), {}, []',
        description: `Расширь предыдущую функцию - проверяй скобки трех типов одновременно.

def is_valid_brackets(s):
    # Проверь (), {}, [] одновременно
    # Они должны быть правильно вложены
    pass

Примеры:
"()[]{}" → True
"({[]})" → True
"({[}))" → False (неправильный порядок)
"{[}]" → False (перекрываются)`
      },
      {
        num: 5,
        title: 'Найти минимальное количество удалений',
        description: `Найди минимальное количество символов, которые нужно удалить, чтобы получить правильную скобочную последовательность.

def min_deletions(s):
    # Верни минимальное число удалений
    pass

Примеры:
"())" → 1 (удали последнюю )
"(((" → 3 (удали все)
"(())" → 0 (уже правильная)
"))(" → 3 (удали все)`
      },
      {
        num: 6,
        title: 'Проверка корректности кода (вложенные скобки)',
        description: `Напиши функцию, которая проверяет, что в коде все скобки правильно открыты и закрыты.
Учитывай также, что строки в кавычках не считаются.

def is_valid_code(code):
    # Проверь баланс (), {}, [] в коде
    # Игнорируй строки в кавычках: "..." или '...'
    pass

Примеры:
'print("hello")' → True
'if x > 0: { print("ok") }' → True
'arr = [1, 2, 3' → False
'string = "test ) bracket"' → True (скобка в строке не считается)`
      },
      {
        num: 7,
        title: 'Реверс строки используя стек',
        description: `Реализуй функцию, которая разворачивает строку, используя стек.

def reverse_string(s):
    # Используй стек для разворота
    # Верни развернутую строку
    pass

Примеры:
"hello" → "olleh"
"12345" → "54321"
"a" → "a"`
      }
    ]
  },
  9: {
    title: 'Хэш таблицы',
    tasks: [
      {
        num: 0,
        title: 'ВАЖНО: Выбор хэш функции',
        description: `⚠️ ТЕОРИЯ: Изучи разные хэш функции в Python перед выполнением задач:

1️⃣ Встроенная hash() функция:
   hash("key") % table_size
   ✓ Встроенная в Python
   ✗ Разная в разных сеансах (для безопасности)

2️⃣ Сумма ASCII кодов:
   def hash_sum(key, size):
       return sum(ord(c) for c in key) % size
   ✓ Простая
   ✗ Плохое распределение для похожих строк

3️⃣ Полиномиальный хэш (популярный):
   def hash_poly(key, size, base=31):
       h = 0
       for c in key:
           h = (h * base + ord(c)) % size
       return h
   ✓ Хорошее распределение
   ✓ Быстрый

4️⃣ Хэш с простым числом:
   def hash_prime(key, size, prime=101):
       h = 0
       for c in key:
           h = (h * prime + ord(c)) % size
       return h
   ✓ Еще лучше для таблиц

Рекомендуем использовать функции 3 или 4 в задачах ниже!`
      },
      {
        num: 1,
        title: 'Реализация хэш таблицы (добавление и поиск)',
        description: `Реализуй простую хэш таблицу с методами добавления и поиска элементов.

class HashTable:
    def __init__(self, size=10):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        # Используй одну из хэш функций выше
        return hash(key) % self.size

    def insert(self, key, value):
        # Добавь пару (key, value) в таблицу
        pass

    def search(self, key):
        # Найди значение по ключу
        # Верни значение или None
        pass

Тест:
ht = HashTable(5)
ht.insert("name", "Alice")
ht.insert("age", 25)
print(ht.search("name"))  # Alice
print(ht.search("city"))  # None`
      },
      {
        num: 2,
        title: 'Удаление из хэш таблицы',
        description: `Добавь метод удаления элемента из хэш таблицы.

class HashTable:
    # ... предыдущие методы ...

    def delete(self, key):
        # Удали пару (key, value) из таблицы
        # Верни True если удалил, False если ключ не найден
        pass

Тест:
ht.insert("city", "Paris")
print(ht.delete("city"))  # True
print(ht.search("city"))  # None
print(ht.delete("city"))  # False`
      },
      {
        num: 3,
        title: 'Разрешение колизий методом Chaining',
        description: `Реализуй хэш таблицу с разрешением колизий через chaining (цепочки).
Вместо одного значения в ячейке храни список пар (key, value).

class HashTableChaining:
    def __init__(self, size=5):
        self.size = size
        self.table = [[] for _ in range(size)]  # Список цепочек

    def hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        # Добавь (key, value) в цепочку на позиции hash(key)
        pass

    def search(self, key):
        # Найди значение по ключу в цепочке
        pass

Тест с колизией:
ht = HashTableChaining(3)
ht.insert("dog", 1)
ht.insert("cat", 2)
ht.insert("rat", 3)  # Возможна колизия! Но все равно найдутся
print(ht.search("dog"))  # 1
print(ht.search("cat"))  # 2`
      },
      {
        num: 4,
        title: 'Разрешение колизий методом Linear Probing',
        description: `Реализуй хэш таблицу с разрешением колизий через linear probing.
Если ячейка занята, переходи к следующей: hash(key), hash(key)+1, hash(key)+2...

class HashTableLinearProbing:
    def __init__(self, size=5):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        return hash(key) % self.size

    def insert(self, key, value):
        # Найди первую свободную ячейку начиная с hash(key)
        # Добавь (key, value) туда
        pass

    def search(self, key):
        # Найди значение, проверяя ячейки начиная с hash(key)
        pass

Тест:
ht = HashTableLinearProbing(5)
ht.insert("a", 1)
ht.insert("b", 2)
print(ht.search("a"))  # 1
print(ht.search("b"))  # 2`
      },
      {
        num: 5,
        title: 'Разрешение колизий методом Double Hashing',
        description: `Реализуй хэш таблицу с разрешением колизий через double hashing.
Используй две хэш функции: hash1(key) и hash2(key).
При колизии переходи: hash1 + hash2, hash1 + 2*hash2, hash1 + 3*hash2...

def hash1(key, size):
    return hash(key) % size

def hash2(key, size):
    return 1 + (hash(key) % (size - 1))

class HashTableDoubleHash:
    def __init__(self, size=5):
        self.size = size
        self.table = [None] * size

    def insert(self, key, value):
        # Используй обе хэш функции для разрешения колизий
        pass

    def search(self, key):
        # Найди значение используя double hashing
        pass

Тест:
ht = HashTableDoubleHash(7)
ht.insert("x", 10)
ht.insert("y", 20)
print(ht.search("x"))  # 10`
      }
    ]
  },
  10: {
    title: 'Структуры данных: деревья',
    tasks: [
      {
        num: 1,
        title: 'Высота бинарного дерева',
        description: `Реализуй функцию, которая вычисляет высоту бинарного дерева поиска (максимальный путь от корня до листа).

class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

def tree_height(node):
    # Возврати высоту дерева
    pass

# Пример: дерево [5, 3, 7, 2, 4]
#       5
#      / \\
#     3   7
#    / \\
#   2   4
# Ответ: 2`
      },
      {
        num: 2,
        title: 'Удаление элемента из BST',
        description: `Реализуй функцию удаления элемента из бинарного дерева поиска. Учти три случая:
- Узел без детей (просто удали)
- Узел с одним ребенком (замени на ребенка)
- Узел с двумя детьми (найди минимум в правом поддереве)

def delete_node(root, val):
    # Удали узел с значением val
    # Верни новый корень дерева
    pass

Тест: удалить 3 из дерева [5, 3, 7, 2, 4, 6, 8]`
      },
      {
        num: 3,
        title: 'Проверка валидности BST',
        description: `Реализуй функцию, которая проверяет, является ли дерево валидным бинарным деревом поиска.
Помни: для каждого узла все значения слева должны быть < узла, а справа > узла.

def is_valid_bst(node, min_val=float('-inf'), max_val=float('inf')):
    # Проверь, что дерево - валидное BST
    pass

Тест 1: [5, 3, 7, 2, 4] → True (валидное)
Тест 2: [5, 3, 7, 2, 8] → False (8 > 5 но справа)`
      },
      {
        num: 4,
        title: 'Поиск пути в дереве',
        description: `Реализуй функцию, которая находит путь от корня до конкретного значения в дереве.

def find_path(node, target):
    # Верни список значений от корня до target
    # Или пустой список, если не найдено
    pass

Пример дерева:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

find_path(root, 4) → [5, 3, 4]
find_path(root, 7) → [5, 7]
find_path(root, 10) → []`
      },
      {
        num: 5,
        title: 'Сумма всех путей',
        description: `Реализуй функцию, которая находит сумму всех значений во всех путях от корня до листьев.

def path_sum(node):
    # Верни сумму значений всех путей
    pass

Пример:
#       5
#      / \\
#     3   7
#    /
#   2

Пути: [5,3,2] → сумма 10
       [5,7] → сумма 12
Ответ: 10 + 12 = 22`
      },
      {
        num: 6,
        title: 'Самый большой путь в дереве (Diameter)',
        description: `Реализуй функцию, которая находит длину самого длинного пути между любыми двумя узлами дерева (может не проходить через корень).

def tree_diameter(node):
    # Верни длину самого длинного пути
    pass

Пример:
#       1
#      / \\
#     2   3
#    /
#   4
#  /
# 5

Самый длинный путь: 5→4→2→1→3 (длина 4)
Ответ: 4`
      },
      {
        num: 7,
        title: 'Уровневый обход дерева (BFS)',
        description: `Реализуй функцию обхода дерева по уровням (breadth-first search).

from collections import deque

def level_order(root):
    # Верни список списков, где каждый список - уровень дерева
    pass

Пример:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

Ответ: [[5], [3, 7], [2, 4]]`
      },
      {
        num: 8,
        title: 'Удаление поддерева',
        description: `Реализуй функцию, которая удаляет все узлы, значение которых меньше заданного значения.

def delete_subtree(node, min_val):
    # Удали все узлы < min_val вместе с их потомками
    # Верни новый корень дерева
    pass

Пример:
#       5
#      / \\
#     3   7
#    / \\
#   2   4

delete_subtree(root, 4) удаляет узлы 3, 2
Результат:
#       5
#        \\
#         7`
      }
    ]
  },
  13: {
    title: 'Практический проект',
    tasks: []
  },
  12: {
    title: 'ИИ-инструменты разработчика',
    tasks: [
      {
        num: 1,
        title: 'Установка ИИ помощника для VS Code',
        description: `Выбери один из вариантов и установи бесплатно:

Вариант 1: GitHub Copilot
• Перейди в VS Code → Extensions
• Найди "GitHub Copilot" (от GitHub)
• Нажми Install
• Авторизуйся через GitHub
• Готово! Начни печатать код

Вариант 2: Claude Code (для Claude)
• Установи Claude Code CLI или расширение
• Авторизуйся аккаунтом Claude
• Используй в командной строке или IDE

Если хочешь платную подписку - напиши:
• t.me/kiro_team_manager или
• t.me/x_tap
Объясни что нужна помощь с покупкой, поможем!`
      },
      {
        num: 2,
        title: 'Первый промпт: простая функция',
        description: `Напиши в Copilot / Claude Code промпт:

"Напиши функцию на Python, которая проверяет, простое ли число.
Входной параметр: целое число n
Выходной параметр: True если простое, False иначе
Используй эффективный алгоритм O(√n)"

Что ты должен был получить:
✅ Функция с проверкой делимости
✅ Оптимизация через √n
✅ Комментарии в коде

Протестируй результат:
is_prime(7) → True
is_prime(10) → False`
      },
      {
        num: 3,
        title: 'Второй промпт: создание файла и папки',
        description: `Если используешь Claude Code - дай промпт:

"Создай структуру проекта для калькулятора:
• Папка: calculator/
  • Файл: calculator.py (основная логика)
  • Файл: tests.py (тесты)
  • Файл: README.md (описание)

В calculator.py реализуй:
• add(a, b)
• subtract(a, b)
• multiply(a, b)
• divide(a, b) с проверкой на 0

В tests.py напиши примеры использования каждой функции"

Claude Code сам создаст папку и файлы с кодом!`
      },
      {
        num: 4,
        title: 'Третий промпт: анализ и улучшение кода',
        description: `Найди в своём проекте любой файл с кодом и дай ИИ:

"Вот мой код:
[скопируй весь код]

Что можно улучшить?
Напиши версию с:
• Лучшей организацией
• Типизацией (type hints)
• Docstrings для функций
• Обработкой ошибок

Объясни каждое изменение"

ИИ покажет как писать профессиональный код!`
      },
      {
        num: 5,
        title: 'Четвёртый промпт: написание тестов',
        description: `Дай ИИ одну из своих функций:

"Напиши unit tests для этой функции:
[скопируй функцию]

Использование pytest. Покрой:
• Нормальные случаи
• Edge cases (граничные значения)
• Ошибки (exception handling)

Минимум 5 тестов"

Результат: готовые тесты, которые можно запустить!`
      },
      {
        num: 6,
        title: 'Пятый промпт: объяснение чужого кода',
        description: `Возьми любой код (из интернета, учебника, проекта):

"Объясни этот код пошагово, как я дошкольник:
[скопируй весь код]

Что он делает?
Какие переменные и функции?
Как работает логика?
Нарисуй ASCII диаграмму если нужна"

ИИ объяснит даже сложный код!`
      },
      {
        num: 7,
        title: 'Практический результат',
        description: `К концу этого дня ты должен:

✅ Установить Copilot или Claude Code
✅ Дать ИИ минимум 3-5 промптов
✅ Получить:
   • Готовые функции
   • Созданные файлы и папки
   • Улучшенный и отрефакторенный код
   • Написанные тесты
   • Понимание как работает чужой код

Это базовые навыки работы с ИИ!
Используй его как помощника, не как замену.`
      }
    ]
  },
  11: {
    title: 'Git и версионирование',
    tasks: [
      {
        num: 1,
        title: 'Создать аккаунт на GitHub',
        description: `Если у тебя еще нет аккаунта на GitHub, создай его на сайте https://github.com
Подтверди email и настрой профиль`
      },
      {
        num: 2,
        title: 'Создать проект в VS Code',
        description: `Создай новую папку на своем компьютере для проекта
Открой ее в VS Code
Инициализируй Git репозиторий: git init`
      },
      {
        num: 3,
        title: 'Создать файл с решением',
        description: `Выбери любую задачу из Days 2-10 (из задач для тренировки)
Напиши решение этой задачи в файл solution.py (или solution.js)
Сохрани файл в своем проекте`
      },
      {
        num: 4,
        title: 'Первый коммит и пуш',
        description: `Добавь файл в Git: git add solution.py
Сделай коммит: git commit -m "Add solution"
Создай репозиторий на GitHub
Свяжи локальный репозиторий с GitHub: git remote add origin <ссылка>
Запуши код: git push -u origin main`
      },
      {
        num: 5,
        title: 'Внести изменения и запушить снова',
        description: `Отредактируй свое решение (добавь комментарии, улучши код)
Добавь изменения: git add solution.py
Сделай новый коммит: git commit -m "Improve solution"
Запуши изменения: git push`
      },
      {
        num: 6,
        title: 'Посмотреть историю в GitHub',
        description: `Открой свой репозиторий на GitHub
Посмотри в разделе "Commits" всю историю своих коммитов
Проверь, что видны оба коммита с правильными сообщениями и датами`
      },
      {
        num: 7,
        title: 'Пройти интерактивную игру',
        description: `Это дополнительное задание для углубленного изучения Git

Пройди игру Learn Git Branching:
https://learngitbranching.js.org/?locale=ru_RU

Игра поможет тебе разобраться с ветками (branches), мержами и другими продвинутыми операциями Git`
      }
    ]
  },
  15: {
    title: 'Тайм- и таск-менеджмент',
    tasks: []
  },
  16: {
    title: 'Языки программирования и фреймворки',
    tasks: []
  },
  17: {
    title: 'SQL — часть 1: основы и SELECT',
    tasks: [
      {
        num: 1,
        title: 'Подготовка',
        description: `Открой онлайн-песочницу для SQL (регистрация не нужна):
• https://sqliteonline.com — рекомендуем
• или https://www.db-fiddle.com

Создай таблицу users и наполни её данными:

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name TEXT,
    age INTEGER,
    city TEXT
);

INSERT INTO users (id, name, age, city) VALUES
(1, 'Анна', 25, 'Москва'),
(2, 'Борис', 31, 'Казань'),
(3, 'Вера', 19, 'Москва'),
(4, 'Глеб', 42, 'Сочи'),
(5, 'Дина', 28, 'Казань');`
      },
      {
        num: 2,
        title: 'Простой SELECT',
        description: `Напиши запросы:
1) Выбрать все колонки всех пользователей
2) Выбрать только имена (name) и города (city)
3) Выбрать имена пользователей с псевдонимом колонки "Имя" (используй AS)`
      },
      {
        num: 3,
        title: 'Фильтрация WHERE',
        description: `Напиши запросы:
1) Все пользователи старше 25 лет
2) Все пользователи из Москвы
3) Все пользователи из Казани старше 30 лет (используй AND)
4) Пользователи младше 20 ИЛИ старше 40 (используй OR)`
      },
      {
        num: 4,
        title: 'Операторы LIKE, IN, BETWEEN',
        description: `Напиши запросы:
1) Пользователи, чьё имя начинается на букву "В" (LIKE 'В%')
2) Пользователи из городов 'Москва' или 'Сочи' (используй IN)
3) Пользователи в возрасте от 20 до 30 лет включительно (используй BETWEEN)`
      },
      {
        num: 5,
        title: 'Сортировка ORDER BY и LIMIT',
        description: `Напиши запросы:
1) Все пользователи, отсортированные по возрасту по возрастанию
2) Все пользователи, отсортированные по возрасту по убыванию (DESC)
3) Топ-3 самых старших пользователя (ORDER BY + LIMIT)
4) Уникальные города (используй DISTINCT)`
      }
    ]
  },
  18: {
    title: 'SQL — часть 2: агрегации и изменение данных',
    tasks: [
      {
        num: 1,
        title: 'Агрегатные функции',
        description: `Используй таблицу users из части 1. Напиши запросы:
1) Сколько всего пользователей? (COUNT)
2) Средний возраст всех пользователей (AVG)
3) Возраст самого старшего и самого младшего (MAX и MIN)
4) Сумма всех возрастов (SUM)`
      },
      {
        num: 2,
        title: 'Группировка GROUP BY',
        description: `Напиши запросы:
1) Сколько пользователей в каждом городе?
   SELECT city, COUNT(*) FROM users GROUP BY city;
2) Средний возраст пользователей по каждому городу
3) Максимальный возраст в каждом городе`
      },
      {
        num: 3,
        title: 'Фильтрация групп HAVING',
        description: `Напиши запросы:
1) Города, в которых больше 1 пользователя (GROUP BY + HAVING COUNT(*) > 1)
2) Города со средним возрастом больше 25

Важно: WHERE фильтрует строки ДО группировки, HAVING — группы ПОСЛЕ.`
      },
      {
        num: 4,
        title: 'INSERT — добавление данных',
        description: `1) Добавь нового пользователя: id=6, name='Егор', age=35, city='Москва'
2) Добавь сразу двух пользователей одним запросом
3) Проверь результат через SELECT *`
      },
      {
        num: 5,
        title: 'UPDATE и DELETE',
        description: `1) Измени город пользователя с id=1 на 'Санкт-Петербург' (UPDATE ... SET ... WHERE)
2) Увеличь возраст всех пользователей из Казани на 1 год
3) Удали пользователя с id=6 (DELETE ... WHERE)

⚠️ ВАЖНО: всегда пиши WHERE в UPDATE и DELETE! Без него изменятся ВСЕ строки.`
      }
    ]
  },
  19: {
    title: 'SQL — часть 3: JOIN, NULL, CASE WHEN, подзапросы',
    tasks: [
      {
        num: 1,
        title: 'Подготовка: связанные таблицы',
        description: `Используй таблицу users из части 1. Создай вторую таблицу orders:

CREATE TABLE orders (
    id INTEGER PRIMARY KEY,
    user_id INTEGER,
    product TEXT,
    price INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (id, user_id, product, price) VALUES
(1, 1, 'Книга', 500),
(2, 1, 'Наушники', 3000),
(3, 2, 'Мышка', 1200),
(4, 3, 'Клавиатура', 2500),
(5, 5, 'Монитор', 15000);

Обрати внимание: у Глеба (id=4) заказов нет — он понадобится для LEFT JOIN.`
      },
      {
        num: 2,
        title: 'INNER JOIN и псевдонимы',
        description: `Напиши запросы (используй псевдонимы AS u и AS o):
1) Покажи имя пользователя, товар и цену для всех заказов
   SELECT u.name, o.product, o.price
   FROM users AS u
   JOIN orders AS o ON u.id = o.user_id;
2) Покажи только заказы пользователей из Москвы (добавь WHERE)
3) Покажи общую сумму заказов каждого пользователя (JOIN + GROUP BY + SUM)`
      },
      {
        num: 3,
        title: 'LEFT JOIN и поиск «пустых»',
        description: `Напиши запросы:
1) Покажи ВСЕХ пользователей и их заказы — даже тех, у кого заказов нет
   (LEFT JOIN, у Глеба product будет NULL)
2) Найди пользователей, которые НЕ сделали ни одного заказа
   (LEFT JOIN + WHERE o.id IS NULL)
3) Для каждого пользователя покажи количество заказов (включая 0 у Глеба)
   Подсказка: используй COUNT(o.id) — COUNT(*) посчитает NULL как 1`
      },
      {
        num: 4,
        title: 'NULL — работа с отсутствующими значениями',
        description: `Добавь пользователя без города:
INSERT INTO users (id, name, age, city) VALUES (6, 'Егор', 22, NULL);

Теперь напиши запросы:
1) Найди всех пользователей, у которых НЕ указан город (IS NULL)
2) Выведи всех пользователей, заменив NULL в city на текст "Не указан"
   Используй COALESCE(city, 'Не указан') AS city
3) Подумай: почему WHERE city = NULL не работает? Запиши ответ в комментарии.`
      },
      {
        num: 5,
        title: 'CASE WHEN — категории',
        description: `Напиши запрос, который для каждого пользователя выводит колонку age_group:
• Меньше 20 → 'юный'
• 20–29 → 'молодой'
• 30–39 → 'взрослый'
• 40 и старше → 'опытный'

Используй CASE WHEN ... THEN ... WHEN ... THEN ... ELSE ... END AS age_group

Дополнительно: посчитай, сколько пользователей в каждой категории
(оберни запрос в подзапрос или используй GROUP BY age_group)`
      },
      {
        num: 6,
        title: 'Подзапросы (Subqueries)',
        description: `Напиши запросы с подзапросами:
1) Найди пользователей, возраст которых выше среднего по всей таблице
   WHERE age > (SELECT AVG(age) FROM users)

2) Найди пользователей, которые делали заказы (через IN):
   WHERE id IN (SELECT DISTINCT user_id FROM orders)

3) Найди пользователей, которые НЕ делали заказов (через NOT IN)

4) Сложное: найди пользователя с самой большой суммой заказов
   Подсказка: сначала посчитай суммы через подзапрос, потом найди MAX`
      },
      {
        num: 7,
        title: 'Проектирование схемы — интернет-магазин',
        description: `Спроектируй схему БД для интернет-магазина. Создай таблицы:

1. customers — покупатели (id, name, email, city)
2. products — товары (id, name, price, category, stock)
3. orders — заказы (id, customer_id, created_at)
4. order_items — позиции заказа (id, order_id, product_id, quantity, price)

Для каждой таблицы:
• Напиши CREATE TABLE с правильными типами и ограничениями
• Укажи PRIMARY KEY и FOREIGN KEY
• Добавь NOT NULL там, где поле обязательно

После создания вставь тестовые данные и напиши запрос:
"Общая выручка по каждой категории товаров за все заказы"`
      }
    ]
  },

  22: {
    title: 'Алгоритмы сортировок и поиск',
    tasks: [
      {
        num: 1,
        title: 'Сортировка пузырьком',
        description: `Реализуй функцию bubble_sort(arr), которая сортирует список целых чисел по возрастанию методом пузырька.

Алгоритм: проходим по массиву и сравниваем соседние элементы — если левый больше правого, меняем их местами. После каждого прохода самый большой элемент «всплывает» в конец. Повторяем, пока массив не будет отсортирован.

Добавь оптимизацию: если за очередной проход не было ни одного обмена — массив уже отсортирован, выходим досрочно.

Тесты:
bubble_sort([5, 3, 8, 1, 2])  → [1, 2, 3, 5, 8]
bubble_sort([1, 2, 3])        → [1, 2, 3]   # уже отсортирован
bubble_sort([9, 7, 5, 3, 1])  → [1, 3, 5, 7, 9]
bubble_sort([4])              → [4]
bubble_sort([])               → []

Подсчитай количество сравнений и обменов для массива [5, 3, 8, 1, 2] и выведи их в консоль.`
      },
      {
        num: 2,
        title: 'Сортировка слиянием',
        description: `Реализуй функцию merge_sort(arr), которая сортирует список целых чисел методом слияния (divide & conquer).

Алгоритм состоит из двух частей:
1. Рекурсивно делим массив пополам, пока не получим подмассивы длиной 1.
2. Сливаем два отсортированных подмассива в один — функция merge(left, right).

При слиянии: сравниваем первые элементы двух подмассивов, берём меньший, повторяем. Оставшиеся элементы дописываем в конец.

Тесты:
merge_sort([5, 3, 8, 1, 2])     → [1, 2, 3, 5, 8]
merge_sort([38, 27, 43, 3])     → [3, 27, 38, 43]
merge_sort([1])                 → [1]
merge_sort([2, 1])              → [1, 2]
merge_sort([])                  → []

Дополнительно: выведи дерево разбиений для массива [38, 27, 43, 3] — на каждом шаге печатай, на что делится массив.`
      },
      {
        num: 3,
        title: 'Быстрая сортировка',
        description: `Реализуй функцию quick_sort(arr), которая сортирует список целых чисел методом быстрой сортировки (divide & conquer).

Алгоритм:
1. Выбери опорный элемент (pivot) — возьми средний элемент массива (arr[len//2]).
2. Раздели массив на три части: left (элементы < pivot), middle (элементы == pivot), right (элементы > pivot).
3. Рекурсивно отсортируй left и right, соедини: quick_sort(left) + middle + quick_sort(right).

Тесты:
quick_sort([3, 6, 8, 10, 1, 2, 1])  → [1, 1, 2, 3, 6, 8, 10]
quick_sort([5, 3, 8, 1, 2])         → [1, 2, 3, 5, 8]
quick_sort([1, 2, 3])               → [1, 2, 3]
quick_sort([3, 3, 3])               → [3, 3, 3]
quick_sort([])                      → []

Дополнительно: сравни время работы bubble_sort, merge_sort и quick_sort на случайном массиве из 10 000 элементов. Используй модуль time или timeit.`
      }
    ]
  },

  23: {
    title: 'Паттерны алгоритмических задач',
    tasks: [
      {
        num: 1,
        title: 'Two Pointers — поиск пары с суммой',
        description: `Дан отсортированный массив nums и число target. Найди два числа, сумма которых равна target. Верни их индексы.

Пример:
Вход: nums = [1, 3, 5, 7, 9, 11], target = 12
Выход: [1, 3]  # nums[1] + nums[3] = 3 + 9 = 12

Требования:
• Использовать паттерн Two Pointers (левый и правый)
• Сложность O(n) — без вложенных циклов

Дополнительно: что будет, если в массиве нет такой пары? Обработай этот случай.`
      },
      {
        num: 2,
        title: 'Fast & Slow Pointers — обнаружение цикла',
        description: `Реализуй функцию has_cycle(head), которая определяет, есть ли цикл в связном списке.

Связный список можно смоделировать так:
class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

# Создай список 1→2→3→4→2 (цикл)
n1, n2, n3, n4 = Node(1), Node(2), Node(3), Node(4)
n1.next = n2; n2.next = n3; n3.next = n4; n4.next = n2  # цикл!

Алгоритм: slow делает 1 шаг, fast делает 2 шага. Если встретились — цикл есть.

Проверь:
• has_cycle(n1) → True
• Создай список без цикла и убедись, что результат False`
      },
      {
        num: 3,
        title: 'Fast & Slow Pointers — середина списка',
        description: `Реализуй функцию find_middle(head), которая возвращает средний узел связного списка. Если узлов чётное количество — верни второй из двух средних.

Примеры:
• [1,2,3,4,5] → узел со значением 3
• [1,2,3,4]   → узел со значением 3

Алгоритм: slow делает 1 шаг, fast делает 2. Когда fast достигает конца — slow на середине.

Проверь на обоих примерах и выведи значение найденного узла.`
      },
      {
        num: 4,
        title: 'Sliding Window — максимальная сумма подмассива',
        description: `Напиши функцию max_sum_window(nums, k), которая находит максимальную сумму подмассива длины ровно k.

Примеры:
Вход: nums = [2, 1, 5, 1, 3, 2], k = 3 → Выход: 9  # [5,1,3]
Вход: nums = [1, 4, 2, 9, 7, 3], k = 2 → Выход: 16 # [9,7]

Требования:
• Использовать паттерн скользящего окна
• Сложность O(n) — не пересчитывай сумму заново для каждой позиции

Дополнительно: также верни начальный индекс подмассива с максимальной суммой.`
      },
      {
        num: 5,
        title: 'Бинарный поиск — поиск в отсортированном массиве',
        description: `Реализуй бинарный поиск без использования встроенных функций.

Функция binary_search(arr, target) должна вернуть индекс target, или -1 если не найден.

Тесты:
• binary_search([1, 3, 5, 7, 9, 11, 13], 7)  → 3
• binary_search([1, 3, 5, 7, 9, 11, 13], 6)  → -1
• binary_search([1, 3, 5, 7, 9, 11, 13], 1)  → 0
• binary_search([1, 3, 5, 7, 9, 11, 13], 13) → 6

Добавь счётчик итераций и выводи его — убедись, что для массива из 1000 элементов поиск занимает не более 10 итераций.`
      },
      {
        num: 6,
        title: 'Динамическое программирование — числа Фибоначчи',
        description: `Реализуй три версии вычисления n-го числа Фибоначчи и сравни их:

1. Наивная рекурсия (без DP):
def fib_naive(n): ...

2. Top-down с мемоизацией:
def fib_memo(n, memo={}): ...

3. Bottom-up (таблица):
def fib_dp(n): ...

Проверь все три для n = 10 (ответ: 55) и n = 30.
Для n = 35 посчитай время выполнения каждой версии:

import time
start = time.time()
fib_naive(35)
print(f"Наивная: {time.time()-start:.3f}с")

Запиши в дневник: во сколько раз DP быстрее наивного подхода?`
      },
      {
        num: 7,
        title: 'Динамическое программирование — подъём по лестнице',
        description: `Задача «Climbing Stairs» (LeetCode #70).

Ты поднимаешься на лестницу из n ступенек. За один раз можно сделать 1 или 2 шага. Сколько различных способов подняться?

Реализуй функцию climb_stairs(n) через DP (bottom-up):

Примеры:
• climb_stairs(2) → 2  # [1+1] или [2]
• climb_stairs(3) → 3  # [1+1+1], [1+2], [2+1]
• climb_stairs(4) → 5
• climb_stairs(5) → 8

Подсказка: dp[i] = dp[i-1] + dp[i-2] — это те же числа Фибоначчи!

Дополнительно: измени задачу — теперь можно делать 1, 2 или 3 шага. Посчитай для n=5.`
      },
      {
        num: 8,
        title: 'Динамическое программирование — размен монет',
        description: `Задача «Coin Change» (LeetCode #322).

Дан набор номиналов монет coins и сумма amount. Найди минимальное количество монет, которыми можно набрать эту сумму. Каждую монету можно использовать сколько угодно раз. Если набрать сумму невозможно — вернуть -1.

Примеры:
• coin_change([1, 3, 4], 7)   → 2  # 3 + 4
• coin_change([1, 5, 6, 9], 11) → 2  # 5 + 6
• coin_change([2], 3)          → -1

Алгоритм (bottom-up DP):
dp[0] = 0
dp[i] = min(dp[i - coin] + 1) для каждой монеты

Реализуй функцию и проверь все три теста. Выведи не только количество монет, но и какие именно монеты использованы.`
      },
    ]
  },
  20: {
    title: 'Сети и REST API — практика с реальным API',
    tasks: [
      {
        num: 1,
        title: 'Знакомство с JSONPlaceholder',
        description: `JSONPlaceholder — бесплатный фейковый REST API для тренировки. Не требует регистрации.

Базовый URL: https://jsonplaceholder.typicode.com

Доступные ресурсы:
• /posts       — 100 публикаций
• /users       — 10 пользователей
• /comments    — 500 комментариев
• /todos       — 200 задач
• /albums      — 100 альбомов
• /photos      — 5000 фото

Сделай следующие GET-запросы прямо в браузере (просто открой ссылку):
1) Получи список всех пользователей: /users
2) Получи конкретного пользователя с id=3: /users/3
3) Получи все посты первого пользователя: /posts?userId=1

Что увидишь? Запиши в дневнике: структуру ответа (поля объекта, типы данных).`
      },
      {
        num: 2,
        title: 'GET-запросы через curl',
        description: `Открой терминал и выполни GET-запросы через curl:

# Получить одного пользователя
curl https://jsonplaceholder.typicode.com/users/1

# Получить все задачи (todos) конкретного пользователя
curl "https://jsonplaceholder.typicode.com/todos?userId=1"

# Красивый вывод JSON (если установлен jq):
curl https://jsonplaceholder.typicode.com/users/1 | python3 -m json.tool

Задание:
1) Найди пользователя с id=5 — как его зовут и из какого он города?
2) Сколько задач у пользователя с id=2? Сколько из них выполнено (completed: true)?`
      },
      {
        num: 3,
        title: 'POST-запрос с телом',
        description: `JSONPlaceholder принимает POST-запросы и возвращает "созданный" объект (данные не сохраняются, но API имитирует ответ).

Сделай POST-запрос для создания нового поста:

curl -X POST https://jsonplaceholder.typicode.com/posts \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Мой первый API-запрос",
    "body": "Это тело поста, созданного через REST API",
    "userId": 1
  }'

Что проверить в ответе:
• Какой статус-код вернул сервер?
• Какой id присвоил сервер новому посту?
• Как выглядит полный объект в ответе?

Дополнительно — попробуй также:
curl -X PUT https://jsonplaceholder.typicode.com/posts/1 \\
  -H "Content-Type: application/json" \\
  -d '{"id": 1, "title": "Обновлённый заголовок", "body": "Новое тело", "userId": 1}'`
      },
      {
        num: 4,
        title: 'Для тех, кто хочет углубиться: основные сетевые протоколы',
        description: `⚡ Это задание для тех, кто хочет понять, как работают сети глубже. Особенно важно для направлений: DevOps, Backend, Network Engineering, Cloud.

Изучи самостоятельно следующие протоколы:

TCP/IP — фундамент интернета
• Что такое трёхстороннее рукопожатие (SYN → SYN-ACK → ACK)?
• Почему TCP надёжен, а UDP — нет?
• Как данные делятся на пакеты и собираются обратно?

HTTPS/TLS — безопасность
• Как работает SSL/TLS-рукопожатие?
• Что такое сертификат и зачем он нужен?
• Симметричное vs асимметричное шифрование

FTP / SFTP — передача файлов
• Чем FTP отличается от SFTP?
• В каких случаях используют FTP сегодня?

SSH — защищённый доступ к серверам
• Как работает аутентификация по ключам?
• Чем SSH отличается от обычного пароля?

WebSocket — постоянное соединение
• Чем WebSocket отличается от HTTP?
• Когда нужен WebSocket (чат, трейдинг, игры)?

Для каких направлений IT это критически важно:
• DevOps / SRE — понимание сети на уровне пакетов обязательно
• Backend-разработка — TCP/IP, HTTPS, WebSocket нужны каждый день
• Кибербезопасность — без знания протоколов невозможно
• Network Engineering — это основная специальность
• Cloud / Инфраструктура — настройка load balancer, VPN, firewall

Формат ответа: напиши краткое описание каждого протокола своими словами (3-5 предложений).`
      }
    ]
  },

  // ─────────── Июль · 1 июля · Треки ───────────

  // 103 — ML / Аналитика: вспоминаем основы Python
  103: {
    title: 'Основы Python — вспоминаем (ML / Аналитика)',
    tasks: [
      { num: 1, title: 'Чётное или нечётное', description: 'Считайте целое число. Выведите «Чётное», если оно делится на 2 без остатка, иначе «Нечётное».' },
      { num: 2, title: 'Максимум из трёх', description: 'Считайте три числа. Выведите наибольшее из них. Не используйте функцию max().' },
      { num: 3, title: 'Сумма цифр числа', description: 'Считайте натуральное число. Посчитайте и выведите сумму его цифр (например, 12345 → 15). Используйте цикл while.' },
      { num: 4, title: 'Разворот строки', description: 'Считайте строку и выведите её в обратном порядке (например, "привет" → "тевирп"). Можно через срез или цикл.' },
      { num: 5, title: 'Подсчёт гласных', description: 'Считайте строку. Посчитайте, сколько в ней гласных букв (а, е, ё, и, о, у, ы, э, ю, я). Регистр не важен.' },
      { num: 6, title: 'Факториал', description: 'Считайте натуральное число n. Вычислите его факториал (n! = 1·2·3·...·n) с помощью цикла. Например, 5! = 120.' },
      { num: 7, title: 'Числа Фибоначчи', description: 'Считайте число n и выведите первые n чисел Фибоначчи (0, 1, 1, 2, 3, 5, 8, ...). Каждое следующее — сумма двух предыдущих.' },
      { num: 8, title: 'Сумма чётных в списке', description: 'Дан список чисел. С помощью цикла (или list comprehension) посчитайте сумму только чётных элементов.' },
      { num: 9, title: 'Уникальные элементы', description: 'Дан список с повторами. Выведите список уникальных значений (подсказка: используйте set). Например, [1,2,2,3,3,3] → [1,2,3].' },
      { num: 10, title: 'Подсчёт слов', description: 'Считайте строку-предложение. Посчитайте количество слов в ней (слова разделены пробелами). Подсказка: метод split().' },
    ],
  },

  // 101 — Frontend: вёрстка страницы
  101: {
    title: 'Основы HTML — вёрстка страницы (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Свёрстать резюме «О себе»',
        description: `Свёрстай одну HTML-страницу — простое резюме о себе. Требование: вся вёрстка должна быть семантичной и валидной (проверь на validator.w3.org).

Что должно быть на странице:

1) Правильный каркас документа: <!DOCTYPE html>, <html lang="ru">, <head> с <meta charset="UTF-8"> и <title>, <body>.

2) Семантические теги: используй <header>, <main>, <section>, <footer> по смыслу (не только <div>).

3) Заголовки по иерархии: один <h1> (твоё имя), подзаголовки <h2> для разделов.

4) Абзац <p> с кратким рассказом о себе.

5) Список навыков через <ul> и <li> (например: HTML, CSS, Python...).

6) Таблица <table> с двумя колонками: в первой — технология, во второй — уровень владения от 1 до 10. Используй <thead>, <tbody>, <th>, <td>. Заполни своими реальными технологиями и оценками.

7) Форма заявки (пока никуда не отправляет): поля «Имя» (type="text"), «Телефон» (type="tel"), «Почта» (type="email") и кнопка «Отправить» (<button type="submit">). У каждого поля — связанный <label> (атрибут for = id поля).

Хорошо сверстали, значит:
• Страница проходит валидатор W3C без ошибок.
• У всех изображений (если есть) заполнен alt.
• Теги вложены корректно, каждый парный тег закрыт.
• Использованы семантические теги, а не сплошные <div>.

Проверьте это сами.

Прислать можно github или просто сам html файл.`
      },
    ],
  },

  // 102 — Backend: подготовка инструментов
  102: {
    title: 'Подготовка инструментов (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Установить Python и фреймворк',
        description: `Если выбрал Python — подготовь окружение:

1) Установи Python 3.12+ с python.org (при установке на Windows отметь галочку «Add Python to PATH»).

2) Проверь установку в терминале:
   python --version
   pip --version

3) Создай виртуальное окружение для проекта:
   python -m venv venv
   Активируй его:
   • Windows:  venv\\Scripts\\activate
   • macOS/Linux:  source venv/bin/activate

4) Установи фреймворк (на выбор, рекомендуем FastAPI):
   pip install fastapi uvicorn
   (или Flask:  pip install flask
    или Django: pip install django)

5) Проверь, что фреймворк установился:
   pip show fastapi`
      },
      {
        num: 2,
        title: 'Установить Go и фреймворк',
        description: `Если выбрал Go — подготовь окружение:

1) Установи Go с go.dev/dl (последнюю стабильную версию).

2) Проверь установку в терминале:
   go version

3) Инициализируй модуль в папке проекта:
   go mod init myapp

4) Установи фреймворк (рекомендуем Gin):
   go get github.com/gin-gonic/gin
   (или Echo:  go get github.com/labstack/echo/v4)

5) Проверь, что зависимость добавилась — открой файл go.mod, там должна появиться строчка с фреймворком.`
      },
    ],
  },

  // 104 — Кибербезопасность: изучить направления
  104: {
    title: 'Направления в кибербезопасности (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Изучить направления и выбрать интересные',
        description: `Прочитай подробнее про основные направления кибербезопасности (материал есть в конспекте, плюс поищи статьи и видео):

• Application Security (AppSec)
• Web / Network Security
• Penetration Testing (Red Team)
• Blue Team / SOC (мониторинг и реагирование)
• Криптография
• Forensics (форензика, расследование инцидентов)
• GRC (governance, risk, compliance)
• Cloud Security
• DevSecOps

Также прочитай:
• OWASP Top 10 — топ-10 самых распространённых веб-уязвимостей.
• Основы работы сети: HTTP/HTTPS, DNS, IP, TCP и другие базовые протоколы.

Делать ничего не нужно — просто прочитать.`
      },
    ],
  },

  // ─────────── Июль · 2 июля · Треки ───────────

  // 105 — Кибербезопасность: установить виртуальную машину с Linux
  105: {
    title: 'Установить виртуальную машину с Linux (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Установить виртуальную машину с Linux',
        description: `Установи виртуальную машину с дистрибутивом Linux — это понадобится для дальнейших занятий по кибербезопасности.

1) Установи программу для виртуализации (на выбор):
   • VirtualBox (бесплатно, virtualbox.org)
   • VMware Workstation Player (бесплатно для домашнего использования)
   • UTM (для Mac на Apple Silicon, бесплатно)

2) Скачай образ дистрибутива Linux (на выбор, рекомендуем для начала):
   • Ubuntu Desktop (самый простой и популярный)
   • Kali Linux (если интересна практическая безопасность — уже содержит инструменты пентеста)
   • Debian

3) Создай новую виртуальную машину: выдели минимум 2 ГБ оперативной памяти и 20 ГБ диска.

4) Установи систему с загрузочного образа (следуй мастеру установки дистрибутива).

5) Убедись, что система запускается и ты можешь открыть терминал.`
      },
    ],
  },

  // 106 — Аналитика: 10 задач на комбинаторику и теорию вероятностей
  106: {
    title: 'Комбинаторика и теория вероятностей (Аналитика)',
    tasks: [
      { num: 1, title: 'Расстановка книг', description: 'Сколькими способами можно расставить 4 разные книги на полке в ряд?' },
      { num: 2, title: 'Староста и заместитель', description: 'В группе 8 человек. Сколькими способами можно выбрать старосту и его заместителя (это две разные роли)?' },
      { num: 3, title: 'Команда в кино', description: 'Сколькими способами можно выбрать 3 человек из 8 для похода в кино, если порядок выбора не важен?' },
      { num: 4, title: 'Бросок кубика', description: 'Кубик бросают один раз. Найдите вероятность того, что выпадет число больше 4.' },
      { num: 5, title: 'Шары в коробке', description: 'В коробке 5 красных и 3 синих шара. Наугад достают один шар. Найдите вероятность, что шар синий.' },
      { num: 6, title: 'Карточки с номерами', description: 'Есть 10 карточек, пронумерованных от 1 до 10. Наугад выбирают одну. Найдите вероятность того, что номер делится на 3.' },
      { num: 7, title: 'Трёхзначные числа', description: 'Сколько трёхзначных чисел можно составить из цифр 1, 2, 3, 4, 5, если цифры не повторяются?' },
      { num: 8, title: 'Пьедестал почёта', description: 'В соревновании участвуют 6 спортсменов. Сколькими способами могут распределиться золото, серебро и бронза?' },
      { num: 9, title: 'Два броска монеты', description: 'Монету бросают дважды. Найдите вероятность того, что оба раза выпадет орёл.' },
      { num: 10, title: 'Смешанная команда', description: 'В группе 5 мальчиков и 4 девочки. Сколькими способами можно выбрать команду из 3 человек, если в команде должно быть ровно 2 мальчика и 1 девочка?' },
    ],
  },

  // 107 — ML: 10 задач по материалам теории
  107: {
    title: 'Введение в машинное обучение (ML)',
    tasks: [
      { num: 1, title: 'Тройка T, E, P', description: 'Для задачи «предсказать, будет ли завтра дождь» опиши по определению Митчелла: что здесь T (задача), E (опыт) и P (мера качества)?' },
      { num: 2, title: 'Объект и признаки', description: 'Для задачи «прогноз цены квартиры» приведи пример объекта и минимум 5 признаков, которые можно использовать для его описания.' },
      { num: 3, title: 'Классификация или регрессия?', description: 'Дана выборка (x₁,y₁)...(x₅,y₅), где y — цена дома в рублях. К какому типу задачи это относится: классификация или регрессия? Обоснуй ответ.' },
      { num: 4, title: 'Диагноз по точности', description: 'Модель показывает 99% точности на обучающей выборке и 60% на тестовой. Как называется это явление и в чём его причина?' },
      { num: 5, title: 'Задача без учителя', description: 'Приведи свой пример задачи обучения без учителя из повседневной жизни (не из конспекта) и объясни, почему для неё не нужна разметка данных.' },
      { num: 6, title: 'Параметр vs гиперпараметр', description: 'Объясни своими словами разницу между параметром и гиперпараметром модели. Приведи по одному примеру каждого.' },
      { num: 7, title: 'Признаки клиента банка', description: 'Составь пример признакового описания объекта «клиент банка» — минимум 4 признака с указанием их типа (числовой, категориальный, бинарный и т.д.).' },
      { num: 8, title: 'Классифицируй задачи', description: 'Определи тип задачи (классификация / регрессия / кластеризация / снижение размерности) для каждой из: а) определение возраста человека по фото; б) группировка похожих товаров в интернет-магазине; в) фильтрация спама; г) сжатие изображения с потерей несущественных деталей.' },
      { num: 9, title: 'Эмпирический риск', description: 'Опиши своими словами, что такое эмпирический риск Q(a) и зачем модель его минимизирует в процессе обучения.' },
      { num: 10, title: 'Обучение с подкреплением', description: 'Придумай пример задачи, где уместно обучение с подкреплением, и объясни, что в твоём примере является «вознаграждением» для агента.' },
    ],
  },

  // 108 — Backend: спроектировать архитектуру приложения
  108: {
    title: 'Спроектировать архитектуру бэкенда (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Спроектировать бэкенд для To-Do приложения',
        description: `Возьми простое приложение — список задач (To-Do list), в котором пользователь может регистрироваться, создавать, отмечать выполненными и удалять задачи. Спроектируй архитектуру его бэкенда, опираясь на сегодняшний конспект.

1) Слои — распиши, что конкретно будет находиться в каждом слое для этого приложения:
   • Слой представления (какие эндпоинты нужны)
   • Слой бизнес-логики (какие правила и проверки нужны, например «нельзя создать задачу без названия»)
   • Слой доступа к данным (какие таблицы/коллекции понадобятся)

2) Архитектурный подход — выбери монолит или микросервисы для такого приложения и обоснуй выбор в 2-3 предложениях.

3) API — выбери стиль API (REST, GraphQL и т.д.) и опиши 4-5 эндпоинтов с методами (например: POST /tasks — создать задачу).

4) База данных — выбери реляционную или нереляционную БД и обоснуй выбор. Опиши структуру основной таблицы/коллекции задач (поля и их типы).

5) Путь запроса — опиши по шагам (как в конспекте), что происходит от клика пользователя «Создать задачу» на клиенте до сохранения задачи в базе данных и возврата ответа.

6) Безопасность — какие два-три средства защиты из конспекта ты бы применил в этом приложении и почему?`
      },
    ],
  },

  // 109 — Все треки: 2 задачи с CodeRun для самостоятельного решения
  109: {
    title: 'Задачи с CodeRun (Все треки)',
    tasks: [
      {
        num: 1,
        title: 'Интересное путешествие',
        description: `Не секрет, что некоторые программисты очень любят путешествовать. Хорошо всем известный программист Петя тоже очень любит путешествовать, посещать музеи и осматривать достопримечательности других городов.

Для перемещений из города в город он предпочитает использовать машину. При этом он заправляется только на станциях в городах, но не на станциях по пути. Поэтому он очень аккуратно выбирает маршруты, чтобы машина не заглохла в дороге. А ещё Петя очень важный член команды, поэтому он не может себе позволить путешествовать слишком долго. Он решил написать программу, которая поможет ему с выбором очередного путешествия. Но так как сейчас у него слишком много других задач, он попросил вас помочь ему.

Расстояние между двумя городами считается как сумма модулей разности по каждой из координат. Дороги есть между всеми парами городов.

Формат ввода:
В первой строке входных данных записано количество городов n (2 ≤ n ≤ 1000).
В следующих n строках даны два целых числа — координаты каждого города, не превосходящие по модулю миллиарда. Все города пронумерованы числами от 1 до n в порядке записи во входных данных.
В следующей строке записано целое положительное число k — максимальное расстояние между городами, которое Петя может преодолеть без дозаправки машины. Число k не больше двух миллиардов.
В последней строке записаны два различных числа: номер города, откуда едет Петя, и номер города, куда он едет.

Формат вывода:
Если существуют пути, удовлетворяющие описанным выше условиям, выведите минимальное количество дорог, которое нужно проехать, чтобы попасть из начальной точки маршрута в конечную. Если пути не существует, выведите -1.

Задача на CodeRun: https://coderun.yandex.ru/selections/yandex-interview/problems/interesting-journey`
      },
      {
        num: 2,
        title: 'Удаление дубликатов',
        description: `Дан упорядоченный по неубыванию массив целых чисел. Требуется удалить из него все повторяющиеся элементы, оставив только по одному экземпляру каждого значения.

Формат ввода:
Первая строка входного файла содержит единственное число n (0 ≤ n ≤ 1 000 000).
На следующих n строках расположены числа aᵢ (|aᵢ| ≤ 2147483647) — элементы массива, по одному на строку. Числа отсортированы по неубыванию.

Формат вывода:
Выведите элементы массива после удаления повторений в том же порядке, разделяя их пробелами.

Примечание: ожидается алгоритм, использующий O(1) дополнительной памяти и не требующий считывания всего входного массива в память.

Задача на CodeRun: https://coderun.yandex.ru/selections/yandex-interview/problems/removing-duplicates`
      },
    ],
  },

  // 110 — Frontend: стилизовать резюме из ДЗ 1 июля с помощью CSS
  110: {
    title: 'Стилизовать резюме с помощью CSS (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Добавить CSS-стили к резюме и сделать адаптивную вёрстку',
        description: `Возьми HTML-резюме, которое сверстал(а) в домашнем задании 1 июля, и добавь ему CSS-стили — сделай страницу красивой и адаптивной.

1) Подключение — вынеси стили в отдельный файл styles.css и подключи через <link rel="stylesheet">.

2) Общий вид — задай шрифт (font-family), цвета фона и текста, отступы (padding/margin) для основных блоков (header, section, footer). Используй box-sizing: border-box глобально.

3) Расположение — оформи список навыков и/или блок с контактами через Flexbox (например, в ряд с gap между элементами). При желании — раздели страницу на смысловые колонки через Grid.

4) Таблица — сделай таблицу с уровнем владения технологиями аккуратной: границы, чередующийся фон строк (можно через :nth-child(even)), выравнивание текста.

5) Форма — стилизуй поля ввода и кнопку отправки: отступы, границы, скругления (border-radius), цвет кнопки, состояние при наведении (:hover).

6) Адаптивность — добавь медиа-запросы (@media) минимум под 3 размера экрана:
   • десктоп (по умолчанию, широкий макет);
   • планшет (например, ≤ 768px — колонки становятся уже или превращаются в одну);
   • мобильный (например, ≤ 480px — всё в один столбец, крупные кнопки, читаемый текст).

Проверь результат, изменяя ширину окна браузера (или через DevTools → Toggle device toolbar) — макет не должен ломаться и должен оставаться удобным на любом размере экрана.`
      },
    ],
  },

  // 111 — Кибербезопасность: практика с сетевыми утилитами
  111: {
    title: 'Практика с сетевыми утилитами (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Исследовать сетевой путь и заголовки запроса',
        description: `1) Открой терминал и выполни команду traceroute google.com (на Windows — tracert google.com). Посмотри, через сколько промежуточных узлов (хопов) проходит твой запрос до сервера Google. Выпиши количество хопов и время отклика (ping) до последнего узла.

2) Выполни команду ping ya.ru (или любой другой сайт) — обрати внимание на время отклика (ms) и есть ли потери пакетов.

3) Открой любой сайт в браузере, зайди в DevTools (F12) → вкладка Network, обнови страницу. Выбери любой запрос и посмотри:
   • какой протокол используется (http или https);
   • какой статус-код вернул сервер (200, 304, 404 и т.д.);
   • заголовки запроса (Request Headers) — найди заголовок Host и User-Agent.

4) Напиши краткий вывод (5-7 предложений): что такое traceroute, зачем он нужен специалисту по безопасности, и чем отличается запрос по HTTP от HTTPS в том, что ты увидел в DevTools.`
      },
    ],
  },

  // 112 — Аналитика/ML: практика с NumPy
  112: {
    title: 'Практика с NumPy (Аналитика/ML)',
    tasks: [
      {
        num: 1,
        title: 'Задачи на массивы NumPy',
        description: `Напиши код на Python с использованием NumPy для каждого пункта:

1) Создай массив из чисел от 1 до 20 (используй np.arange) и выведи только чётные числа из него (булева индексация).

2) Создай массив 5x5 из случайных чисел от 0 до 100 (np.random.randint). Найди и выведи: максимум, минимум, среднее значение и сумму всех элементов.

3) Для этого же массива посчитай сумму по каждой строке и сумму по каждому столбцу отдельно (используй параметр axis).

4) Создай два одномерных массива по 5 элементов и выполни поэлементно: сложение, вычитание, умножение и деление. Выведи результат каждой операции.

5) Создай матрицу 3x3 и вектор из 3 чисел. Прибавь вектор к каждой строке матрицы, используя broadcasting (без циклов).

6) Создай массив из 12 чисел и преобразуй его форму (reshape) сначала в матрицу 3x4, а затем в 4x3. Выведи обе версии.

7) Напиши функцию, которая принимает массив чисел и возвращает только те элементы, которые больше среднего значения массива.`
      },
    ],
  },

  // 113 — Backend: SQL-запросы и ORM
  113: {
    title: 'SQL-запросы и ORM (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Спроектировать схему и написать запросы',
        description: `1) Спроектируй две связанные таблицы для интернет-магазина: products (id, name, price, category) и orders (id, product_id, quantity, order_date). Опиши структуру каждой таблицы (поля и типы) текстом или в виде SQL CREATE TABLE.

2) Напиши SQL-запрос, который выбирает название товара и количество из заказов, объединяя обе таблицы через JOIN.

3) Напиши SQL-запрос, который считает суммарную выручку (price * quantity) по каждой категории товаров, используя GROUP BY, и сортирует результат по убыванию выручки.

4) Напиши SQL-запрос с использованием WHERE и HAVING: выбери категории, суммарная выручка которых больше 10000.

5) Перепиши запрос из пункта 2 в виде кода на Django ORM (или любой другой ORM на твой выбор) — покажи, как аналогичный результат можно получить через объекты и методы вместо чистого SQL.

6) Напиши 2-3 предложения: в каком случае ты бы предпочёл писать чистый SQL вместо использования ORM?`
      },
    ],
  },

  // 114 — Frontend: переписать резюме с CSS на препроцессор
  114: {
    title: 'Переписать стили резюме на препроцессор (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Переписать styles.css на SCSS (или LESS)',
        description: `Возьми файл styles.css, который ты написал(а) в домашнем задании 2 июля (стили для резюме), и перепиши его на SCSS или LESS — на выбор.

1) Переменные — вынеси повторяющиеся значения (основной цвет акцента, цвет текста, базовый отступ, ширину контейнера) в переменные ($variable в SCSS или @variable в LESS) и используй их вместо повторяющихся значений по всему файлу.

2) Вложенность — перепиши селекторы с вложенностью там, где это уместно (например, стили для .card и элементов внутри неё через вложенные правила, используя & для псевдоклассов вроде &:hover).

3) Миксин — вынеси хотя бы один повторяющийся набор свойств в миксин (например, для центрирования через Flexbox) и подключи его в 2+ местах через @include (SCSS) или добавление класса-миксина (LESS).

4) Медиа-запросы — вложи медиа-запросы адаптивности прямо внутрь соответствующих селекторов (это одна из типичных возможностей препроцессоров), а не выноси все правила в конец файла.

5) Скомпилируй итоговый файл в обычный CSS — можно через встроенный компилятор редактора (например, расширение Live Sass Compiler в VS Code) или онлайн-компилятор (sass-lang.com/playground для SCSS, lesscss.org для LESS) — и убедись, что страница выглядит так же, как и раньше на обычном CSS.

Пришли оба файла: исходный .scss/.less и скомпилированный из него .css.`
      },
    ],
  },

  // 115 — Frontend: практика с асинхронным JavaScript
  115: {
    title: 'Асинхронный JavaScript на практике (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Event Loop, промисы и async/await',
        description: `Выполняй в консоли браузера (F12 → Console) или в любом онлайн-песочнице (например codepen.io).

1) Порядок выполнения. Не запуская код, предскажи на бумаге, что выведет:
   console.log('A')
   setTimeout(() => console.log('B'), 0)
   Promise.resolve().then(() => console.log('C'))
   console.log('D')
   Затем запусти и проверь себя. Напиши в комментарии, почему порядок именно такой (подсказка: микрозадачи vs макрозадачи).

2) Свой промис. Напиши функцию wait(ms), которая возвращает промис, разрешающийся через ms миллисекунд (используй setTimeout внутри new Promise). Проверь: wait(1000).then(() => console.log('прошла секунда')).

3) Цепочка. Используя wait из п.2, выведи в консоль "1", через секунду "2", ещё через секунду "3" — через цепочку .then (без вложенности).

4) async/await. Перепиши п.3 через async-функцию с await — код должен читаться сверху вниз.

5) fetch. Сделай запрос к публичному API https://jsonplaceholder.typicode.com/users/1 через async/await, оберни в try/catch, выведи имя пользователя (user.name) в консоль. Специально сломай URL и убедись, что catch срабатывает.

6) Promise.all. Загрузи ОДНОВРЕМЕННО пользователей с id 1, 2 и 3 (три fetch) через Promise.all и выведи массив их имён.`
      },
    ],
  },

  // 116 — Backend: простой CRUD API на Django
  116: {
    title: 'CRUD REST API на Django (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Собрать свой REST API',
        description: `Сделай простое CRUD-приложение на Django + Django REST Framework. Ресурс выбери сам — например, "задачи" (Task), "заметки" (Note) или "фильмы" (Movie).

1) Создай проект и приложение, установи и подключи rest_framework в INSTALLED_APPS (pip install django djangorestframework).

2) Опиши модель ресурса минимум с 3-4 полями разных типов (например, для Task: title — CharField, description — TextField, is_done — BooleanField, created_at — DateTimeField). Применяй миграции: makemigrations + migrate.

3) Напиши сериализатор на базе ModelSerializer для своей модели.

4) Напиши ViewSet на базе ModelViewSet (queryset + serializer_class).

5) Зарегистрируй ViewSet в роутере и подключи router.urls по префиксу /api/.

6) Запусти сервер (runserver) и проверь ВСЕ операции CRUD:
   • POST — создай 2-3 записи;
   • GET списка — убедись, что записи вернулись в JSON;
   • GET одной записи по id;
   • PATCH — измени одно поле у записи;
   • DELETE — удали запись.
   Проверять можно через веб-интерфейс DRF в браузере или через curl.

7) В комментарии/файле напиши, какие статус-коды вернул сервер на POST, на DELETE и на GET несуществующего id.`
      },
    ],
  },

  // 117 — Аналитика/ML: NumPy p.2 + Pandas
  117: {
    title: 'NumPy и первые шаги в Pandas (Аналитика/ML)',
    tasks: [
      {
        num: 1,
        title: 'Продвинутый NumPy',
        description: `Напиши код на Python (NumPy):

1) Создай массив из 10 случайных целых чисел от 0 до 50. С помощью np.where замени все чётные числа на 0, а нечётные оставь как есть. Выведи результат.

2) Создай массив, содержащий np.nan среди чисел (например [4, np.nan, 7, np.nan, 10]). Посчитай сумму и среднее, игнорируя пропуски (np.nansum, np.nanmean), и отдельно выведи массив без пропусков (через маску np.isnan).

3) Есть два массива: names = ['Аня','Боб','Вера','Гена'] и scores = [70, 95, 82, 60]. Используя np.argsort, выведи имена, отсортированные по убыванию баллов.

4) Продемонстрируй разницу view и copy: сделай срез массива, измени его, покажи, что оригинал изменился; затем повтори с .copy() и покажи, что оригинал НЕ изменился.`
      },
      {
        num: 2,
        title: 'Основы Pandas',
        description: `Напиши код на Python (pandas):

1) Создай DataFrame из словаря минимум с 4 строками и колонками: name, age, city, salary.

2) Выведи: первые 3 строки (head), общую информацию (info), статистику по числовым колонкам (describe).

3) Отбери и выведи: только колонку salary; строки, где age > 25; строки, где city равен конкретному значению.

4) Добавь новую колонку salary_k = salary / 1000 и колонку is_adult = age >= 18.

5) С помощью groupby посчитай среднюю зарплату по каждому городу.

6) Отсортируй таблицу по зарплате по убыванию (sort_values) и выведи результат.`
      },
    ],
  },

  // 118 — Кибербезопасность: первые шаги в ассемблере
  118: {
    title: 'Первые шаги в ассемблере (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Разобрать и написать ассемблерный код',
        description: `Задание можно выполнить без установки чего-либо — через онлайн-компилятор (например, godbolt.org или любой online NASM compiler / эмулятор x86-64). Кто хочет — ставит NASM локально.

1) Теория своими словами (2-4 предложения на каждый пункт): зачем нужны низкоуровневые языки; какие отделы/роли кибербезопасности работают с ассемблером и почему; что такое регистр процессора.

2) Разбор кода. Возьми программу «Hello, World» из конспекта и построчно опиши в комментариях, что делает каждая инструкция (что кладётся в rax, rdi, rsi, rdx и зачем нужен syscall).

3) Напиши/собери код, который складывает числа от 1 до 10 в цикле (по образцу из конспекта, но до 10, а не до 5). Убедись, что в итоге в rax получается 55. Опиши, как здесь работает cmp и условный переход.

4) Мини-исследование (по желанию): найди в интернете, что такое дизассемблер Ghidra, и напиши 2-3 предложения — для чего его используют аналитики вредоносного ПО.`
      },
    ],
  },

  // 119 — Frontend: сервис, взаимодействующий с DOM
  119: {
    title: 'Фронтенд-сервис с DOM (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Собрать интерактивное приложение на чистом JS + DOM',
        description: `Сделай небольшой одностраничный сервис на чистом HTML + CSS + JavaScript (без React и библиотек), который активно работает с DOM. Выбери ОДНУ идею (или придумай свою, близкую к реальным задачам):

Вариант А — «Список задач (To-Do)»: поле ввода + кнопка «Добавить»; новые задачи появляются в списке; клик по задаче отмечает её выполненной (зачёркивание через toggle класса); у каждой задачи кнопка «Удалить».

Вариант Б — «Фильтр/поиск по списку»: есть список карточек (товары/сотрудники/фильмы — хардкодом в JS-массиве); поле поиска фильтрует карточки в реальном времени по событию input; показывается счётчик «найдено N».

Вариант В — «Корзина товаров»: список товаров с кнопкой «В корзину»; блок корзины показывает добавленные позиции и общую сумму, пересчёт при добавлении/удалении.

Обязательные требования (что проверяем по теме занятия):
1) Найти элементы через querySelector / querySelectorAll.
2) Обрабатывать события через addEventListener (минимум click и/или input; для формы — submit с preventDefault).
3) Создавать новые элементы через createElement и вставлять их (appendChild).
4) Менять содержимое (textContent) и переключать классы (classList.add/remove/toggle) для визуальных состояний.
5) Удалять элементы (remove()).

Оформи минимально аккуратным CSS. Пришли index.html, style.css и script.js (или один файл).`
      },
    ],
  },

  // 120 — Backend: авторизация пользователей
  120: {
    title: 'Авторизация пользователей (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Реализовать вход по логину и паролю с проверкой в БД',
        description: `Сделай простой бэкенд с авторизацией. Можно на Django (рекомендуется, есть встроенная система) или на любом знакомом фреймворке.

1) Создай хранилище пользователей в базе данных. Пользователей можно вносить ВРУЧНУЮ (через админку Django, createsuperuser/create_user, или прямыми вставками в БД). Пароли должны храниться в виде хеша, а не открытым текстом (в Django create_user делает это сам).

2) Сделай страницу/эндпоинт входа: форма с полями «логин» и «пароль» отправляет данные на сервер.

3) На сервере проверь наличие пользователя и совпадение пароля (в Django — функция authenticate).

4) Верни ответ от сервера:
   • при верных данных — успех (например, JSON {"status": "ok"} и/или редирект в личный кабинет), создай сессию (login());
   • при неверных — ответ об ошибке со статусом 401.

5) Сделай хотя бы одну защищённую страницу/эндпоинт, доступную ТОЛЬКО авторизованным (в Django — декоратор @login_required или проверка request.user.is_authenticated). Неавторизованному верни 401/403 или редирект на вход.

6) Проверь оба сценария: вход с правильным паролем (пускает) и с неправильным (отказ). Кратко опиши, чем в твоём коде отличается аутентификация от авторизации.`
      },
    ],
  },

  // 121 — Аналитика: задачи по математической статистике
  121: {
    title: 'Задачи по математической статистике (Аналитика)',
    tasks: [
      {
        num: 1,
        title: 'Решить классические задачи по статистике',
        description: `Реши задачи по теории занятия. Можно считать руками и/или проверять кодом на Python (numpy, scipy). По каждой задаче покажи ход решения.

Дан набор данных (зарплаты в тыс. руб.): [42, 38, 55, 40, 39, 120, 44, 41, 37, 43].

1) Посчитай среднее и медиану. Объясни, почему они различаются и какая мера честнее описывает «типичную» зарплату здесь.

2) Посчитай дисперсию и стандартное отклонение (σ). Что показывает σ?

3) Найди минимум, максимум, размах и квартили (25%, 50%, 75%).

4) Убери выброс (120) и пересчитай среднее и σ. Как изменились значения? Сделай вывод о чувствительности среднего к выбросам.

5) По правилу 68–95–99.7: если рост людей распределён нормально со средним 175 см и σ = 7 см — какая примерно доля людей имеет рост от 168 до 182 см? А от 161 до 189 см?

6) Стандартная ошибка среднего: по выборке из 100 значений σ = 20. Чему равна стандартная ошибка среднего? Во сколько раз она уменьшится, если собрать 400 значений?

7) (по желанию) Есть две группы среднего чека A = [100, 120, 95, 110, 105] и B = [130, 125, 140, 120, 135]. С помощью scipy.stats.ttest_ind посчитай p-value и сделай вывод: значима ли разница при пороге 0.05?`
      },
    ],
  },

  // 122 — ML: линейная регрессия двумя способами
  122: {
    title: 'Линейная регрессия своими руками (Machine Learning)',
    tasks: [
      {
        num: 1,
        title: 'Реализовать линейную регрессию аналитически и градиентным спуском',
        description: `Реализуй линейную регрессию на Python (numpy), БЕЗ готового LinearRegression из sklearn (им можно только сверить результат).

Подготовка данных:
• Сгенерируй синтетические данные: X — например 200 объектов с 1-3 признаками; истинная зависимость y = X @ w_true + шум (добавь np.random.normal). Не забудь добавить к X столбец из единиц (bias trick), чтобы учесть свободный член w0.
• Раздели данные на train и test.

1) Аналитическое решение. Реализуй формулу w = (Xᵀ X)⁻¹ Xᵀ y через numpy (np.linalg.inv, .T, @). Получи веса и предсказания.

2) Градиентный спуск. Реализуй обучение шагами: на каждой итерации считай градиент MSE по весам и обновляй w = w − η · grad. Сам выпиши формулу градиента для MSE.

3) Гиперпараметры. Поиграй с параметрами градиентного спуска: темп обучения η (например 0.001, 0.01, 0.1) и число итераций. Посмотри, при каких значениях спуск сходится, а при каких «разлетается» или сходится слишком медленно. Полезно строить график значения функции потерь по итерациям (matplotlib).

4) Метрики качества. Посчитай на test-выборке MSE и R² (коэффициент детерминации) для обоих методов.

5) Сравнение. Сравни, какой метод справился лучше и почему; сошёлся ли градиентный спуск к тем же весам, что дала аналитическая формула. Сделай вывод: когда какой способ предпочтительнее (вспомни сложности O(D²N + D³) против O(N·D·S)).`
      },
    ],
  },

  // 123 — Кибербезопасность: WinAPI/C++ и простые задачи на C++
  123: {
    title: 'Программы на WinAPI и тренировка C++ (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Пара простых программ на WinAPI + C++',
        description: `Понадобится компилятор C++ под Windows (MSVC/Visual Studio или MinGW g++). Если Windows нет — можно собрать под Wine или описать код с объяснением.

1) MessageBox: программа, которая показывает окно с приветствием через функцию MessageBox (по образцу из конспекта). Поэкспериментируй с типами кнопок/иконок (MB_OKCANCEL, MB_ICONWARNING) и по коду возврата определи, какую кнопку нажал пользователь.

2) Работа с файлом: программа, которая через WinAPI (CreateFile → WriteFile → CloseHandle) создаёт текстовый файл и записывает в него строку. Обязательно проверь дескриптор на INVALID_HANDLE_VALUE и закрой его в конце.

В комментариях опиши, какие функции WinAPI вызываются и что делает каждая.`
      },
      {
        num: 2,
        title: 'Простые задачи на C++ (уровень easy)',
        description: `Реши на чистом C++ — тренировка синтаксиса (циклы, массивы), без сложных структур данных:

1) Сумма и максимум: дан массив целых чисел — выведи их сумму, среднее и максимальный элемент (одним проходом цикла).

2) Разворот массива: разверни массив «на месте» (поменяй элементы местами с двух концов) и выведи результат.

3) Подсчёт: посчитай, сколько в массиве чётных и сколько нечётных чисел.

4) Бинарный поиск: реализуй бинарный поиск заданного числа в отсортированном массиве — верни индекс или -1, если числа нет. Объясни в комментарии, почему он работает за O(log n).

5) (по желанию) Проверка палиндрома: дана строка — определи, читается ли она одинаково слева направо и справа налево.`
      },
    ],
  },

  // 125 — Frontend: перевод небольшого JS-проекта на TypeScript
  125: {
    title: 'Практика с TypeScript (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Типизировать небольшое приложение',
        description: `Возьми любой свой небольшой JS-скрипт (например, To-Do из домашки 6 июля) или напиши новый с нуля — и перепиши/напиши его на TypeScript (.ts/.tsx).

1) Опиши через interface (или type) форму основных данных приложения — например, Task { id: number; title: string; done: boolean }.

2) Типизируй минимум 3 функции: параметры и (там где нужно) возвращаемое значение. Хотя бы одна функция должна иметь необязательный параметр (?) или значение по умолчанию.

3) Используй хотя бы один union-тип (например, статус задачи: 'active' | 'done' | 'archived').

4) Реализуй хотя бы одну дженерик-функцию — например, универсальную функцию поиска элемента в массиве по условию: function findItem<T>(arr: T[], predicate: (item: T) => boolean): T | undefined.

5) Собери проект компилятором (npx tsc) и убедись, что ошибок типов нет. Специально попробуй передать в одну из функций значение неправильного типа — убедись, что TypeScript ругается — и опиши в комментарии, какую ошибку он показал.`
      },
    ],
  },

  // 126 — Backend: валидация и обработка ошибок в Django
  126: {
    title: 'Валидация и обработка ошибок (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Добавить валидацию и аккуратную обработку ошибок в API',
        description: `Возьми любое своё Django/DRF-приложение (например, из домашки про REST API или авторизацию) и добавь в него валидацию и обработку ошибок.

1) Добавь хотя бы 2 кастомных проверки полей: через validate_<field> в сериализаторе (DRF) или clean_<field> в форме. Например: возраст не может быть отрицательным, название не может состоять только из пробелов.

2) Добавь хотя бы одну проверку, зависящую от нескольких полей сразу (метод validate() / clean()).

3) Убедись, что при отправке некорректных данных API возвращает статус 400 и понятный JSON с описанием ошибок по каждому полю.

4) Обработай случай "объект не найден" через get_object_or_404 (или аналог) — убедись, что возвращается 404.

5) Обработай хотя бы одну ошибку целостности БД (например, дублирующееся уникальное поле) через try/except IntegrityError и верни понятное сообщение с кодом 409.

6) (по желанию) Настрой логирование: добавь logger.error(...) в одном из except-блоков и убедись, что сообщение появляется в консоли/логах при возникновении ошибки.`
      },
    ],
  },

  // 127 — Аналитика: продуктовые метрики
  127: {
    title: 'Расчёт продуктовых метрик (Аналитика)',
    tasks: [
      {
        num: 1,
        title: 'Посчитать метрики по условным данным о пользователях',
        description: `Данные для расчёта (считай вручную или на Python):

За месяц в приложении было зарегистрировано 500 новых пользователей.
Ежедневно в приложение заходит в среднем 1200 уникальных пользователей (DAU), а за месяц — 4000 уникальных пользователей (MAU).
Из 500 новых пользователей через 7 дней вернулись 150, а через 30 дней — 90.
За месяц ушли (перестали пользоваться) 200 из 4000 пользователей, которые были активны на начало месяца.
Из тех, кто открыл каталог товаров (10 000 человек), 2500 добавили товар в корзину, а 800 оформили заказ.
Средний доход с одного пользователя за всё время — 3000 руб. Стоимость привлечения одного нового пользователя — 900 руб.

1) Посчитай Stickiness (DAU/MAU) и объясни своими словами, что означает получившееся число.

2) Посчитай Day-7 Retention и Day-30 Retention для когорты из 500 новых пользователей.

3) Посчитай Churn Rate за месяц.

4) Посчитай Conversion Rate из "открыли каталог" в "добавили в корзину", и отдельно — из "открыли каталог" в "оформили заказ".

5) Посчитай соотношение LTV/CAC. Сделай вывод: здоровая ли это бизнес-модель (вспомни ориентир 3:1)?

6) Предложи (2-3 предложения) свою гипотезу North Star Metric для этого приложения и обоснуй выбор.`
      },
    ],
  },

  // 128 — ML: градиентный спуск своими руками
  128: {
    title: 'Градиентный спуск на простом примере (Machine Learning)',
    tasks: [
      {
        num: 1,
        title: 'Найти минимум функции градиентным спуском',
        description: `Реализуй градиентный спуск на Python (numpy) для поиска минимума простой функции одной переменной — без готовых библиотек оптимизации.

1) Возьми функцию f(x) = (x - 3)**2 + 5 (её минимум легко проверить вручную — он в точке x=3). Выпиши на бумаге/в комментарии её производную f'(x).

2) Реализуй цикл градиентного спуска: начни с произвольного x (например, x=10), на каждом шаге обновляй x = x - lr * f'(x), сохраняй историю значений x и f(x).

3) Запусти спуск с несколькими значениями темпа обучения lr (например: 0.01, 0.1, 0.5, 0.9, 1.1) и посмотри на результат и число шагов до сходимости. Построй график (matplotlib) изменения f(x) по итерациям для 2-3 разных lr на одном графике.

4) Опиши в комментариях: при каком lr спуск сходится быстро и стабильно, при каком — медленно, а при каком — расходится (значения f(x) растут). Соотнеси с материалом занятия.

5) (по желанию) Повтори то же самое для функции двух переменных, например f(x, y) = x**2 + y**2 + x*y — вычисли частные производные по x и по y, реализуй спуск по вектору весов (x, y) и выведи финальную точку минимума.`
      },
    ],
  },

  // 129 — Кибербезопасность: практика с криптографией
  129: {
    title: 'Практика с криптографией (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Хэш-функции и цели защиты информации на практике',
        description: `1) Теория своими словами (2-3 предложения на каждый пункт): в чём разница между конфиденциальностью, целостностью, подлинностью и неотказуемостью; почему MAC не даёт неотказуемости, а цифровая подпись — даёт.

2) Классификация: приведи по 2 примера алгоритмов для каждой пары классификации — симметричный/асимметричный, блочный/поточный (можно найти в интернете, если не было в конспекте).

3) Хэширование на практике (Python, модуль hashlib):
   • посчитай SHA-256 от своей произвольной строки;
   • измени в строке всего один символ и посчитай хэш снова — убедись, что результат полностью другой (лавинный эффект), приложи оба хэша;
   • посчитай хэш одного и того же файла дважды — убедись, что результат детерминирован (совпадает).

4) Целостность файла: посчитай SHA-256 любого небольшого текстового файла у себя на компьютере, затем измени в файле один символ и посчитай хэш заново — сравни результаты и опиши, как на основе этого можно проверять, что файл не был изменён при скачивании.

5) (по желанию) Найди в открытых источниках, что такое коллизия MD5, и своими словами (3-4 предложения) объясни, почему использование MD5 для проверки подлинности файлов сегодня считается небезопасным.`
      },
    ],
  },

  // 136 — Frontend/Backend: классические задачи на ООП
  136: {
    title: 'Классические задачи на ООП (Frontend/Backend)',
    tasks: [
      {
        num: 1,
        title: 'Реализовать классическую иерархию классов',
        description: `Реализуй на любом языке (JavaScript, Python — на твой выбор, можно на обоих для практики):

1) Класс Animal с полем name и методом speak(), который выводит "название издаёт звук". Создай наследников Dog, Cat, Cow — каждый переопределяет speak() под свой звук. Собери массив/список из нескольких разных животных и вызови speak() у каждого в цикле (демонстрация полиморфизма).

2) Класс BankAccount с приватным полем balance, методами deposit(amount), withdraw(amount) (не позволяет уйти в минус — если суммы не хватает, выводит ошибку без изменения баланса) и getBalance(). Баланс должен быть недоступен для изменения напрямую снаружи класса.

3) Абстрактный класс Shape с абстрактным методом area(). Реализуй наследников Circle, Rectangle, Triangle, каждый — свою формулу площади. Посчитай и выведи суммарную площадь списка фигур разных типов.

4) Класс Employee с полями name, salary и методом raise_salary(percent), увеличивающим зарплату на процент. Создай класс Manager, наследующий Employee, с дополнительным полем team (список подчинённых) и методом team_size().

5) (по желанию) Класс Stack (стек) с методами push, pop, peek, is_empty — реализация классической структуры данных через ООП, без использования встроенных стековых методов языка напрямую (только через список/массив внутри класса).`
      },
    ],
  },

  // 137 — Аналитика: простое домашнее задание на A/B-тестирование
  137: {
    title: 'Практика A/B-тестирования (Аналитика)',
    tasks: [
      {
        num: 1,
        title: 'Проверить результаты A/B-теста',
        description: `Дано: интернет-магазин тестировал новую кнопку оформления заказа.

Группа A (старая кнопка): 2400 посетителей, 216 совершили покупку.
Группа B (новая кнопка): 2450 посетителей, 260 совершили покупку.

1) Посчитай конверсию (Conversion Rate) в каждой группе вручную (доля купивших от всех посетителей группы).

2) На сколько процентных пунктов и на сколько процентов относительно группы A выросла конверсия в группе B?

3) На Python (scipy.stats или statsmodels.stats.proportion.proportions_ztest) проверь, является ли разница статистически значимой при пороге alpha = 0.05. Выведи z-статистику и p-value.

4) Сформулируй нулевую и альтернативную гипотезы для этого теста своими словами.

5) Сделай вывод: стоит ли выкатывать новую кнопку на всех пользователей? Обоснуй ответ, опираясь на p-value.

6) (по желанию) Придумай свою гипотезу для A/B-теста на любом сервисе, которым ты пользуешься (не обязательно реализовывать код — просто опиши: что меняем, какую метрику измеряем, какой ожидаешь эффект и почему).`
      },
    ],
  },

  // 138 — ML: расчёт метрик вручную и на Python
  138: {
    title: 'Расчёт метрик классификации и регрессии (Machine Learning)',
    tasks: [
      {
        num: 1,
        title: 'Метрики классификации — вручную и кодом',
        description: `Дана матрица ошибок бинарного классификатора: TP=45, FP=15, TN=120, FN=20.

1) Посчитай вручную (на бумаге/в комментарии): Accuracy, Precision, Recall (TPR), FPR, Error Rate. Покажи формулу и подстановку для каждой метрики.

2) Проверь свои расчёты на Python: воссоздай списки y_true и y_pred (например, через реальные 0/1-массивы, которые в сумме дают такую же матрицу ошибок) и посчитай те же метрики через sklearn.metrics (accuracy_score, precision_score, recall_score) — сверь с ручным расчётом.

3) Объясни своими словами (2-3 предложения): в какой ситуации (пример из жизни) для этой матрицы ошибок высокий Recall важнее высокого Precision, и наоборот.`
      },
      {
        num: 2,
        title: 'Метрики регрессии — вручную и кодом',
        description: `Дано 5 пар (истинное значение, предсказание модели): (10, 12), (15, 14), (20, 25), (8, 9), (30, 28).

1) Посчитай вручную MAE и MSE по этим пяти парам (распиши все промежуточные вычисления).

2) Посчитай RMSE (через MSE) и объясни, в каких единицах измерения получился результат.

3) На Python с помощью NumPy реализуй вычисление MSE, RMSE, MAE и R² без готовых функций sklearn (вручную по формулам через np.mean), а затем сверь результат с sklearn.metrics.mean_squared_error/mean_absolute_error/r2_score.

4) Посчитай MAPE для тех же данных. Объясни, почему MAPE может быть проблемной метрикой, если среди истинных значений встречаются числа, близкие к нулю.`
      },
    ],
  },

  // 139 — Кибербезопасность: схема видеонаблюдения станции метро + веб-модель
  139: {
    title: 'Проектирование системы видеонаблюдения (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Схема видеонаблюдения станции метро',
        description: `Возьми любую станцию метро (реальную или условную схему) и спроектируй для неё систему видеонаблюдения.

1) Нарисуй (от руки, в любом графическом редакторе или диаграммном инструменте типа draw.io/Figma) упрощённую схему станции: входы/выходы, турникеты, эскалаторы, платформа, служебные помещения.

2) Расставь на схеме камеры для покрытия всех ключевых зон (входы, турникеты, платформа, выходы на улицу).

3) Для КАЖДОЙ камеры опиши в отдельном списке/таблице:
   • цель установки (что именно она контролирует и зачем);
   • требуемый уровень задачи (мониторинг / детектирование / распознавание / идентификация);
   • тип камеры (купольная, цилиндрическая, PTZ, панорамная, термальная) и почему выбран именно этот тип;
   • угол обзора (примерно, в градусах) и направление на схеме;
   • примерную дальность эффективного действия;
   • высоту установки.

4) Отметь на схеме зоны перекрытия обзора между соседними камерами — убедись, что не осталось слепых зон в ключевых точках (турникеты, эскалаторы).

5) Кратко опиши (3-5 предложений), какие риски есть у твоей схемы (слепые зоны, засветка от освещения станции и т.п.) и как их можно снизить.`
      },
      {
        num: 2,
        title: 'Модель веб-приложения для проектирования видеонаблюдения',
        description: `Построй (можно на бумаге/в виде схемы, а не обязательно рабочий код) модель веб-приложения, которое позволяло бы визуально проектировать системы видеонаблюдения — то есть повторить то, что ты делал руками в задаче 1, но как интерактивный инструмент.

1) Опиши основные сущности приложения (например: Object — объект/план, Camera — камера с полями position, angle, range, type, purpose, Zone — зона интереса) и их связи — как в проектировании модели базы данных.

2) Опиши ключевую функциональность: загрузка/отрисовка плана объекта (изображение или сетка), добавление камеры кликом на план, редактирование параметров камеры (угол, дальность, тип, высота) через форму, визуализация сектора обзора камеры (треугольник/сектор поверх плана) в зависимости от угла и дальности.

3) Предложи, как визуально показать на плане зоны перекрытия и слепые зоны (например, разными цветами закраски).

4) (по желанию, если есть время и хочется практики) Реализуй простейшую версию на HTML/CSS/JS: план — просто прямоугольная область, камера — точка с кликабельным добавлением, сектор обзора — SVG или canvas треугольник, поворачиваемый и масштабируемый по введённым в форму углу и дальности.`
      },
    ],
  },

  // 140 — ML: обобщающая способность, отложенная выборка, кросс-валидация
  140: {
    title: 'Отложенная выборка и кросс-валидация (Machine Learning)',
    tasks: [
      {
        num: 1,
        title: 'Разбить данные и сравнить train/test',
        description: `Возьми любой небольшой учебный датасет (например, встроенный load_diabetes или load_iris из sklearn, либо свой из прошлых занятий).

1) С помощью train_test_split раздели данные на обучающую и тестовую выборки в пропорции 80/20, зафиксировав random_state=42.

2) Обучи любую простую модель (например, LinearRegression или DecisionTree) на обучающей выборке.

3) Посчитай качество (accuracy для классификации или R²/MSE для регрессии) ОТДЕЛЬНО на train и на test.

4) Сравни две цифры и своими словами (2-3 предложения) сделай вывод: есть ли признаки переобучения (ошибка на train сильно меньше, чем на test)?`
      },
      {
        num: 2,
        title: 'Кросс-валидация',
        description: `Продолжи работу с тем же датасетом и моделью.

1) С помощью cross_val_score и KFold(n_splits=5, shuffle=True, random_state=42) проведи 5-fold кросс-валидацию.

2) Выведи все 5 оценок, их среднее (.mean()) и разброс (.std()).

3) Сравни среднюю оценку кросс-валидации с той, что получилась на одном hold-out в задаче 1. Насколько они близки?

4) Ответь своими словами: почему средняя оценка по кросс-валидации считается более надёжной, чем оценка по одному разбиению?

5) (по желанию) Поменяй n_splits на 3 и на 10 — посмотри, как меняются среднее и разброс оценок.`
      },
    ],
  },

  // 141 — Аналитика: линейная алгебра, векторы
  141: {
    title: 'Операции с векторами (Аналитика)',
    tasks: [
      {
        num: 1,
        title: 'Векторы вручную',
        description: `Даны два вектора: a = (2, 3, 6) и b = (1, 0, 4).

1) Посчитай вручную (на бумаге / в комментарии) сумму a + b и разность a − b.

2) Посчитай 3 · a.

3) Посчитай длину (норму) вектора a: |a| = √(a₁² + a₂² + a₃²).

4) Посчитай скалярное произведение a · b (сумма произведений соответствующих компонент).

5) Ответь: перпендикулярны ли эти векторы? Обоснуй ответ через значение скалярного произведения.`
      },
      {
        num: 2,
        title: 'Векторы на Python (NumPy)',
        description: `Повтори все вычисления из задачи 1, но уже с помощью NumPy.

1) Создай a и b как np.array и посчитай a + b, a - b, 3 * a.

2) Посчитай длину каждого вектора через np.linalg.norm.

3) Посчитай скалярное произведение через a @ b и сверь с ручным расчётом из задачи 1.

4) Посчитай косинусную близость между a и b по формуле (a @ b) / (norm(a) * norm(b)). Сделай вывод: насколько эти векторы «похожи» по направлению (значение ближе к 1 = похожи).

5) (по желанию) Придумай пример из аналитики, где строку таблицы удобно представить как вектор (например, пользователь = (возраст, число покупок, средний чек)), и опиши, что покажет косинусная близость двух таких векторов.`
      },
    ],
  },

  // 142 — Frontend: SSG и SSR
  142: {
    title: 'SSG, SSR и Next.js (Frontend)',
    tasks: [
      {
        num: 1,
        title: 'Сравнить подходы к рендерингу',
        description: `Задание в основном теоретическое — цель закрепить, когда что применять.

1) Своими словами кратко опиши разницу между CSR, SSG и SSR (по 1-2 предложения на каждый).

2) Составь небольшую таблицу (можно в текстовом виде): для каждого из трёх подходов укажи скорость первой отрисовки, качество SEO и актуальность данных.

3) Для каждого из следующих сайтов выбери наиболее подходящий подход (CSR / SSG / SSR) и объясни почему:
   • личный блог с редкими статьями;
   • лента новостей с ежеминутным обновлением;
   • админ-панель за логином, где SEO не нужно;
   • страница товара интернет-магазина с актуальной ценой.

4) Объясни своими словами, что такое гидратация (hydration) и зачем она нужна.`
      },
      {
        num: 2,
        title: 'Мини-практика с Next.js (по желанию)',
        description: `Если хочется практики (не обязательно):

1) Создай проект Next.js (npx create-next-app) с App Router.

2) Сделай серверный компонент-страницу, который загружает данные с любого открытого API (например, https://jsonplaceholder.typicode.com/posts) через fetch на сервере и выводит список заголовков.

3) Добавь отдельный клиентский компонент с директивой 'use client' — простой счётчик с кнопкой (useState).

4) Открой исходный код страницы в браузере (View Source) и убедись, что список постов уже присутствует в HTML (то есть отрендерился на сервере), а не подгружается позже.`
      },
    ],
  },

  // 143 — Backend: микросервисы
  143: {
    title: 'Микросервисы: основы (Backend)',
    tasks: [
      {
        num: 1,
        title: 'Спроектировать разбиение на сервисы',
        description: `Возьми любое знакомое приложение (интернет-магазин, доставка еды, соцсеть — на выбор).

1) Раздели его на 4-6 микросервисов по бизнес-областям. Для каждого укажи название и за что он отвечает (например: Users — регистрация и профили, Orders — заказы, Payments — оплата, Notifications — уведомления).

2) Для каждого сервиса укажи, какие данные он хранит в своей БД.

3) Опиши минимум два сценария, где одному сервису нужно обратиться к другому. Для каждого укажи, каким способом лучше общаться — СИНХРОННО (REST/gRPC) или АСИНХРОННО (очередь сообщений) — и почему.

4) Нарисуй (от руки или в draw.io) схему: клиент → API Gateway → сервисы, у каждого сервиса своя БД.`
      },
      {
        num: 2,
        title: 'Мини-сервис на FastAPI (по желанию)',
        description: `Если хочется практики (не обязательно):

1) Напиши простейший сервис на FastAPI с одним-двумя эндпоинтами (например, сервис Users с GET /users и POST /users, хранящий данные в списке в памяти).

2) Напиши второй сервис (например, Orders), который при создании заказа делает HTTP-запрос к первому сервису (через httpx или requests), чтобы проверить, существует ли пользователь.

3) Запусти оба сервиса на разных портах и проверь, что второй успешно обращается к первому.

4) (по желанию) Опиши, какие параметры пришлось бы поменять, чтобы завернуть каждый сервис в Docker-контейнер.`
      },
    ],
  },

  // 144 — Кибербезопасность: социальная инженерия и фишинг
  144: {
    title: 'Распознавание фишинга и защита (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Разбор поддельных адресов',
        description: `Задание на внимательность к доменам.

1) Для каждой пары «настоящий сайт → подозрительный адрес» определи, поддельный ли адрес, и если да — какой приём использован (опечатка / приписка слова / чужой домен в конце / похожий символ):
   • sberbank.ru → sbrebank.ru
   • vk.com → login-vk.com
   • apple.com → apple.com.secure-check.net
   • gosuslugi.ru → gosuslugi.ru (с кириллической буквой внутри)
   • steampowered.com → steampowered.com

2) Для каждого поддельного адреса объясни, на что именно нужно смотреть, чтобы его распознать.

3) Придумай 3 своих примера поддельных доменов для любого известного бренда, используя разные приёмы маскировки.`
      },
      {
        num: 2,
        title: 'Анализ фишингового письма и чек-лист защиты',
        description: `1) Опиши (можно придумать) пример фишингового письма «от банка»: какой у него будет заголовок, на что оно давит (срочность / страх), какой поддельный адрес отправителя и куда ведёт ссылка.

2) Перечисли минимум 5 признаков, по которым можно распознать, что это письмо фишинговое.

3) Составь личный чек-лист «что проверить, прежде чем вводить пароль на сайте» (минимум 4 пункта).

4) Объясни своими словами, почему двухфакторная аутентификация (2FA) и менеджер паролей защищают от фишинга даже в случае, если пароль всё-таки украли / ввели на поддельном сайте.

5) (по желанию) Кратко опиши, что делают технологии SPF, DKIM и DMARC и почему их настройка — обязанность компании, а не пользователя.`
      },
    ],
  },

  // 145 — Аналитика: очистка данных
  145: {
    title: 'Очистка данных (Аналитика)',
    tasks: [
      {
        num: 1,
        title: 'Найти проблемы в «грязной» таблице',
        description: `Дан небольшой набор данных о клиентах (создай его сам в Excel или как pandas DataFrame — 10-15 строк с намеренными ошибками):

столбцы: name, city, age, price (сумма покупки), phone.
Намеренно добавь: пустые ячейки, дубликат строки, лишние пробелы (" Москва "), разный регистр ("москва"/"Москва"/"МСК"), число как текст ("1 200 ₽"), явный выброс (age = 200), запись телефона в разных форматах.

1) Осмотри данные: в pandas выведи df.shape, df.info(), df.isna().sum() и df['city'].value_counts(); в Excel — глазами и через автофильтр.

2) Выпиши списком ВСЕ проблемы, которые нашёл, и укажи для каждой её тип (пропуск / дубликат / пробелы / неверный тип / несогласованный формат / выброс).`
      },
      {
        num: 2,
        title: 'Очистить данные',
        description: `Приведи ту же таблицу в порядок (в Python/pandas и/или в Excel — на выбор, можно частично там и там):

1) Обработай пропуски: числовые (age) заполни медианой, категориальные (city) — значением "неизвестно" (или обоснуй удаление строк).

2) Удали дубликаты (df.drop_duplicates()).

3) Убери лишние пробелы (str.strip / СЖПРОБЕЛЫ) и приведи city к единому регистру и единому написанию (например, "МСК" → "москва").

4) Преобразуй price из текста в число (убери пробелы, "₽", замени запятую на точку, pd.to_numeric) — и посчитай сумму по столбцу, чтобы убедиться, что теперь это число.

5) Найди и обработай выброс в age (например, оставь только 0 ≤ age ≤ 120).

6) Приведи phone к единому виду (только цифры / формат +7XXXXXXXXXX).

7) Выведи очищенную таблицу и кратко (2-3 предложения) опиши, что изменилось и почему теперь по этим данным можно считать метрики.`
      },
    ],
  },

  // 146 — Frontend/Backend: Docker
  146: {
    title: 'Docker: основы (Frontend/Backend)',
    tasks: [
      {
        num: 1,
        title: 'Запустить готовый образ и разобраться в командах',
        description: `Практика с готовыми образами (Docker Desktop должен быть установлен).

1) Скачай и запусти готовый образ веб-сервера: docker run -d -p 8080:80 --name web nginx. Открой в браузере http://localhost:8080 — убедись, что видишь страницу nginx.

2) Выполни и опиши своими словами, что показывает каждая команда: docker ps, docker images, docker logs web.

3) Зайди внутрь контейнера: docker exec -it web sh (внутри выполни ls, затем exit).

4) Останови и удали контейнер: docker stop web, затем docker rm web. Проверь через docker ps -a, что его больше нет.

5) Ответь своими словами: что делает флаг -p 8080:80 и почему без него сайт не открылся бы в браузере?`
      },
      {
        num: 2,
        title: 'Написать свой Dockerfile',
        description: `Возьми любое простое приложение (например, свой фронтенд на React/Vite или мини-сервер на Node/Python).

1) Напиши для него Dockerfile: выбери базовый образ (node:20-alpine или python:3.12-slim), задай WORKDIR, скопируй зависимости, установи их, скопируй код, укажи EXPOSE и CMD.

2) Собери образ: docker build -t myapp . и убедись, что он появился в docker images.

3) Запусти контейнер с пробросом порта и проверь приложение в браузере.

4) Добавь рядом файл .dockerignore и объясни в комментарии, зачем в него добавляют node_modules и .git.

5) (по желанию) Опиши в 3-5 предложениях, как выглядел бы docker-compose.yml, если бы к твоему приложению нужно было добавить базу данных PostgreSQL.`
      },
    ],
  },

  // 147 — Кибербезопасность: ЭДО и нормативная база
  147: {
    title: 'Электронный документооборот и нормативная база (Кибербезопасность)',
    tasks: [
      {
        num: 1,
        title: 'Разобраться в видах электронной подписи',
        description: `Задание на понимание нормативной базы (по материалам конспекта, актуально на 2026 год).

1) Составь сравнительную таблицу трёх видов ЭП (ПЭП, НЭП, КЭП): для каждого укажи, подтверждает ли автора, ловит ли изменение документа, нужны ли сертифицированные СКЗИ и где применяется.

2) Для каждой из ситуаций выбери подходящий вид подписи и обоснуй:
   • вход в личный кабинет банка по СМС-коду;
   • подписание внутреннего документа между двумя сотрудниками по соглашению;
   • сдача отчётности в налоговую и участие в госзакупках.

3) Ответь своими словами: почему КЭП по закону равнозначна собственноручной подписи, а ПЭП — только по соглашению сторон?`
      },
      {
        num: 2,
        title: 'ЭП, МЧД и защита данных',
        description: `1) Опиши своими словами (по шагам), как технически происходит подписание документа и как получатель проверяет, что документ не меняли. Используй понятия «хеш», «закрытый ключ», «открытый ключ».

2) Объясни, что такое машиночитаемая доверенность (МЧД) и зачем сотруднику при подписании документов от имени организации теперь нужны И личная КЭП, И МЧД.

3) Кратко (по 1-2 предложения) опиши, о чём каждый из законов: 63-ФЗ, 152-ФЗ, 149-ФЗ.

4) Приведи пример: электронный документ содержит персональные данные клиента. Какие меры (минимум 3) стоит применить для их защиты с точки зрения 152-ФЗ?

5) (по желанию) Найди в открытых источниках, какой сервис/приложение позволяет физлицу оформить и использовать КЭП, и кратко опиши, как это работает.`
      },
    ],
  },

  // 148 — Аналитика/ML: распределения
  148: {
    title: 'Качаем статистику: распределения (Аналитика/ML)',
    tasks: [
      {
        num: 1,
        title: 'Расчёты вручную по небольшому набору данных',
        description: `Дан небольшой набор данных — результаты 8 тестов (баллы из 100): 72, 85, 90, 68, 77, 95, 81, 74.

1) Построй вариационный ряд (отсортируй значения по возрастанию).

2) Посчитай вручную (распиши все шаги на бумаге или в комментарии): среднее, дисперсию и стандартное отклонение.

3) Найди медиану и моду этого набора данных (если моды нет — укажи это явно).

4) Посчитай интервал среднее ± 1 стандартное отклонение и определи, сколько из 8 значений в него попадает. Сравни с ожидаемыми ~68% по правилу трёх отклонений (учти, что выборка маленькая, поэтому точного совпадения не будет).

5) Найди Q1, Q2 (медиану) и Q3 для этого набора данных.`
      },
      {
        num: 2,
        title: 'Те же расчёты на Python',
        description: `Реши задачу 1 с помощью кода на Python (numpy, scipy).

1) Создай массив numpy с теми же 8 значениями и выведи отсортированный вариационный ряд (np.sort).

2) Посчитай через numpy: среднее (np.mean), дисперсию (np.var), стандартное отклонение (np.std) — сверь с ручными расчётами из задачи 1.

3) Посчитай медиану (np.median) и моду (через scipy.stats.mode).

4) Посчитай Q1, Q2, Q3 через np.percentile и сравни с ручными расчётами.

5) Сгенерируй с помощью np.random.normal выборку из 1000 значений с loc = среднее твоих данных и scale = стандартное отклонение твоих данных. Построй гистограмму (matplotlib) и визуально сравни форму со стандартной колоколообразной кривой.`
      },
      {
        num: 3,
        title: 'Проверка на нормальность и логнормальное распределение',
        description: `1) Используя тест Шапиро-Уилка (scipy.stats.shapiro) на своих 8 значениях из задачи 1, получи p-value. Ответь: есть ли основания считать этот набор данных нормально распределённым (порог 0.05)? Учти, что при таком маленьком размере выборки вывод будет не очень надёжным — это нормально, важно понять сам механизм проверки.

2) Сгенерируй выборку из 1000 значений через np.random.lognormal(mean=0, sigma=0.5, size=1000). Посчитай для неё среднее и медиану — какое из них больше и почему (свяжи с скошенностью распределения)?

3) Возьми натуральный логарифм от этой логнормальной выборки (np.log) и снова посчитай среднее и стандартное отклонение — сверь их с исходными параметрами mean=0, sigma=0.5, которые ты задавал при генерации.

4) Прогони тест Шапиро-Уилка на логарифмированной выборке из задачи 3 — подтверждает ли p-value, что после логарифмирования распределение стало ближе к нормальному?`
      },
    ],
  },

  // 152 — Аналитика/ML: kNN
  152: {
    title: 'Алгоритм k ближайших соседей (Аналитика/ML)',
    tasks: [
      {
        num: 1,
        title: 'Предсказание вручную',
        description: `Дан небольшой набор данных о квартирах с двумя признаками (площадь в м², этаж) и ценой (в тыс. руб.):

(40, 2, 3200), (55, 5, 4100), (60, 3, 4300), (48, 1, 3500), (70, 4, 5200), (65, 2, 4800).

Новая квартира: площадь 58 м², этаж 3, цена неизвестна.

1) Посчитай вручную евклидово расстояние от новой квартиры до каждой из 6 квартир в датасете (по признакам площадь и этаж, без учёта цены).

2) Определи k=3 ближайших соседа по посчитанным расстояниям.

3) Предскажи цену новой квартиры, усреднив цены этих трёх ближайших соседей.

4) Повтори предсказание для k=5 — как изменился ответ и почему?`
      },
      {
        num: 2,
        title: 'kNN на Python (sklearn)',
        description: `Реши задачу 1 с помощью кода на Python.

1) Собери те же данные в массивы numpy: X (площадь, этаж) и y (цена). Добавь ещё 4-5 придуманных квартир для разнообразия выборки.

2) Обучи KNeighborsRegressor с n_neighbors=3 на этих данных и сделай predict для новой квартиры (58, 3). Сверь результат с ручным расчётом из задачи 1.

3) Попробуй несколько значений n_neighbors (например, 1, 3, 5) и посмотри, как меняется предсказание.

4) Прогони кросс-валидацию (KFold + cross_validate, scoring='neg_mean_squared_error') на своих данных и выведи среднюю ошибку.`
      },
      {
        num: 3,
        title: 'Масштабирование и его влияние',
        description: `1) Возьми свои данные из задачи 2 и создай "испорченную" версию: переведи площадь из м² в см² (умножь на 10000), оставь этаж и цену как есть.

2) Обучи KNeighborsRegressor на неотмасштабированных "испорченных" данных и сделай предсказание для той же новой квартиры — сравни с результатом из задачи 2. Объясни своими словами, почему предсказание изменилось (или почти не изменилось), несмотря на то, что реальные данные о квартире не поменялись.

3) Примени StandardScaler к "испорченным" данным (через Pipeline или вручную через fit_transform) и заново обучи модель. Стало ли предсказание ближе к исходному результату без "порчи" масштаба?

4) Сделай вывод (2-3 предложения): почему масштабирование признаков — обязательный шаг перед использованием kNN.`
      },
    ],
  },
}

const JULY_TRACK_LABELS = {
  101: '1 июля · Frontend — Основы HTML',
  102: '1 июля · Backend — Python vs Go',
  103: '1 июля · ML/Аналитика — Основы Python',
  104: '1 июля · Кибербезопасность — Основы ИБ',
  105: '2 июля · Кибербезопасность — Операционные системы',
  106: '2 июля · Аналитика — Комбинаторика и теория вероятностей',
  107: '2 июля · ML — Введение в машинное обучение',
  108: '2 июля · Backend — Архитектура веб-приложения',
  109: '3 июля · Все треки — Нарешиваем LeetCode',
  110: '2 июля · Frontend — Основы CSS',
  111: '4 июля · Кибербезопасность — Компьютерные сети: основы',
  112: '4 июля · Аналитика/ML — Библиотека NumPy',
  113: '4 июля · Backend — Базы данных: SQL и ORM',
  114: '4 июля · Frontend — Препроцессоры LESS/SASS/SCSS',
  115: '5 июля · Frontend — Продвинутый JavaScript',
  116: '5 июля · Backend — REST API: создание на Python',
  117: '5 июля · Аналитика/ML — NumPy p.2 и Pandas',
  118: '5 июля · Кибербезопасность — Ассемблер и кое-что до',
  119: '6 июля · Frontend — JavaScript: Взаимодействие с DOM',
  120: '6 июля · Backend — Аутентификация и авторизация',
  121: '6 июля · Аналитика — Математическая статистика',
  122: '6 июля · ML — Линейная регрессия + практика',
  123: '6 июля · Кибербезопасность — Основы WinAPI и C++',
  125: '8 июля · Frontend — TypeScript',
  126: '8 июля · Backend — Валидация и обработка ошибок',
  127: '8 июля · Аналитика — Продуктовые метрики',
  128: '8 июля · ML — Градиентный спуск',
  129: '8 июля · Кибербезопасность — Криптография',
  136: '13 июля · Frontend/Backend — ООП: основы',
  137: '13 июля · Аналитика — A/B-тестирование',
  138: '13 июля · ML — Метрики классификации и регрессии',
  139: '13 июля · Кибербезопасность — Технологии видеонаблюдения',
  140: '14 июля · ML — Обобщающая способность: отложенная выборка и кросс-валидация',
  141: '15 июля · Аналитика/ML — Линейная алгебра: векторы',
  142: '14 июля · Frontend — SSG и SSR: серверный рендеринг и Next.js',
  143: '14 июля · Backend — Микросервисы: основы',
  144: '14 июля · Кибербезопасность — Социальная инженерия и фишинг',
  145: '14 июля · Аналитика — Очистка данных',
  146: '15 июля · Frontend/Backend — Docker: основы',
  147: '15 июля · Кибербезопасность — Электронный документооборот и нормативная база РФ',
  148: '16 июля · Аналитика/ML — Качаем статистику: распределения',
  152: '18 июля · Аналитика/ML — Алгоритм k-Nearest Neighbors (kNN)',
}

export default function HomeworkPage({ selectedDay, onBack }) {
  const [schedule, setSchedule] = useState(SCHEDULE)

  useEffect(() => {
    api.schedule().then(setSchedule).catch(() => {})
  }, [])

  const currentDay = selectedDay || 1
  const homework = HOMEWORK_CONTENT[currentDay] || { title: 'Домашние задания', tasks: [] }

  function getDayLabel(dayNum) {
    if (JULY_TRACK_LABELS[dayNum]) return JULY_TRACK_LABELS[dayNum]
    // Ищем в schedule (может быть с API или дефолт)
    const schedule_item = schedule.find(e => e.day === dayNum)
    if (schedule_item && schedule_item.title) {
      return schedule_item.title
    }
    // Резервный вариант из HOMEWORK_CONTENT
    const homework_title = HOMEWORK_CONTENT[dayNum]?.title
    return homework_title || `День ${dayNum}`
  }

  return (
    <section className="page active">
      <div className="theory-breadcrumbs">
        <button className="breadcrumb-link" onClick={onBack}>
          📚 Библиотека знаний
        </button>
        <span className="breadcrumb-sep">/</span>
        <span className="breadcrumb-current">
          {JULY_TRACK_LABELS[currentDay] ? getDayLabel(currentDay) : `День ${currentDay} · ${getDayLabel(currentDay)}`}
        </span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

      <div style={{ marginTop: '24px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>{homework.title}</h2>

        {homework.tasks.length === 0 ? (
          <p style={{ color: 'var(--text-tertiary)' }}>Домашние задания еще не добавлены</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {homework.tasks.map((task, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  backgroundColor: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px'
                }}
              >
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
                  Задача {task.num}: {task.title}
                </h3>
                <p style={{ margin: 0, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      <div className="theory-footer">
        <button className="btn-back" onClick={onBack}>
          Вернуться в Библиотеку знаний
        </button>
      </div>
    </section>
  )
}
