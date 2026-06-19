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
  }
}

export default function HomeworkPage({ selectedDay, onBack }) {
  const [schedule, setSchedule] = useState(SCHEDULE)

  useEffect(() => {
    api.schedule().then(setSchedule).catch(() => {})
  }, [])

  const currentDay = selectedDay || 1
  const homework = HOMEWORK_CONTENT[currentDay] || { title: 'Домашние задания', tasks: [] }

  function getDayLabel(dayNum) {
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
          День {currentDay} · {getDayLabel(currentDay)}
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
