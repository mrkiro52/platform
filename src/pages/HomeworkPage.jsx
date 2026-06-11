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
    title: 'Графы и обход',
    tasks: []
  },
  7: {
    title: 'Структуры данных: динамические массивы и связные списки',
    tasks: []
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
  12: {
    title: 'ИИ-инструменты разработчика',
    tasks: [
      {
        num: 1,
        title: 'Установка ИИ помощника для VS Code',
        description: `Выбери один из вариантов и установи бесплатно:

Вариант 1: GitHub Copilot (ВЫБЕРИ ЭТОТ)
• Перейди в VS Code → Extensions
• Найди "GitHub Copilot" (от GitHub)
• Нажми Install
• Авторизуйся через GitHub (бесплатно для студентов)
• Готово! Начни печатать код

Вариант 2: Claude Code (для Claude)
• Установи Claude Code CLI или расширение
• Авторизуйся аккаунтом Claude
• Используй в командной строке или IDE

Если хочешь платную подписку - напиши:
• t.me/kiro_team_manager или
• t.me/x_tap
Объясни что нужна помощь с покупкой, посоветуем!`
      },
      {
        num: 2,
        title: 'Первый промпт: простая функция',
        description: `Напиши в Copilot / Claude Code просьбу:

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
  }
}

export default function HomeworkPage({ selectedDay, onBack }) {
  const [schedule, setSchedule] = useState(SCHEDULE)

  useEffect(() => {
    api.schedule().then(setSchedule).catch(() => {})
  }, [])

  const currentDay = selectedDay || 1
  const dayInfo = schedule.find(d => d.day === currentDay)
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
