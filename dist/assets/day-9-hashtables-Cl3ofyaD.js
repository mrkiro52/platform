import{j as e}from"./index-B8LYZed5.js";import{a as i,T as s,b as n}from"./TheoryTable-CjEIXgt-.js";function a(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 9"}),e.jsx("p",{className:"theory-subtitle",children:"Структуры данных: хэш-таблицы"}),e.jsx("p",{className:"theory-date",children:"9 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что такое хэш-таблица?"}),e.jsx("p",{className:"theory-intro",children:"Хэш-таблица (hash table) — это структура данных, которая использует хэш-функцию для превращения ключей в индексы массива. Позволяет очень быстро искать, добавлять и удалять элементы."}),e.jsxs(i,{title:"Аналогия",children:[e.jsx("p",{children:"Представь, что у тебя есть картотека:"}),e.jsxs("ul",{children:[e.jsx("li",{children:'Нужно найти запись по имени "Алиса"'}),e.jsx("li",{children:"Вместо того чтобы перелистывать все записи, применяешь хэш-функцию"}),e.jsx("li",{children:'Хэш("Алиса") = 7 → идёшь сразу на ящик 7 → находишь запись'})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Как работает хэш-таблица"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Хэш-функция"}),e.jsx("p",{className:"theory-intro",children:"Хэш-функция — это функция, которая преобразует ключ любого типа в целое число (индекс)."}),e.jsx(s,{code:`# Простая хэш-функция для строк
def simple_hash(key, table_size):
    hash_value = 0
    for char in key:
        hash_value += ord(char)  # Суммируем ASCII коды
    return hash_value % table_size

# Пример
table_size = 10
print(simple_hash("Alice", table_size))    # Индекс 0-9
print(simple_hash("Bob", table_size))      # Индекс 0-9
print(simple_hash("Charlie", table_size))  # Индекс 0-9

# Хорошая хэш-функция распределяет ключи равномерно`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Структура хэш-таблицы"}),e.jsx("p",{className:"theory-intro",children:"Упрощённо это выглядит так:"}),e.jsx(n,{headers:["Индекс","Содержимое","Ключи"],rows:[["0",'[("Alice", 90)]',"Alice"],["1","[]","пусто"],["2",'[("Bob", 85)]',"Bob"],["3","[]","пусто"],["4",'[("Charlie", 92)]',"Charlie"],["5","[]","пусто"],["...","...","..."]]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Коллизии"}),e.jsx("p",{className:"theory-intro",children:'Коллизия — когда две разные ключи дают один индекс. Например, "Alice" и "Bob" оба дают индекс 2. Нужно это решить.'}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Метод 1: Chaining (цепочка)"}),e.jsx("p",{className:"theory-intro",children:"Каждая ячейка содержит список (цепочку) элементов. Если коллизия — добавляем в список."}),e.jsx(s,{code:`# Хэш-таблица с chaining
class HashTableChaining:
    def __init__(self, size):
        self.size = size
        self.table = [[] for _ in range(size)]

    def hash(self, key):
        return sum(ord(c) for c in key) % self.size

    def add(self, key, value):
        index = self.hash(key)
        # Проверяем, есть ли уже такой ключ
        for i, (k, v) in enumerate(self.table[index]):
            if k == key:
                self.table[index][i] = (key, value)
                return
        # Добавляем в конец цепочки
        self.table[index].append((key, value))

    def get(self, key):
        index = self.hash(key)
        for k, v in self.table[index]:
            if k == key:
                return v
        return None

# Использование
ht = HashTableChaining(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
ht.add("Charlie", 92)

print(ht.get("Alice"))   # 90
print(ht.get("Bob"))     # 85`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Метод 2: Open Addressing"}),e.jsx("p",{className:"theory-intro",children:"Если ячейка занята, ищем следующую свободную ячейку. Например, линейный поиск: если индекс 2 занят, смотрим 3, потом 4, и т.д."}),e.jsx(s,{code:`class HashTableOpenAddressing:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash(self, key):
        return sum(ord(c) for c in key) % self.size

    def add(self, key, value):
        index = self.hash(key)
        while self.table[index] is not None:
            if self.table[index][0] == key:
                self.table[index] = (key, value)
                return
            index = (index + 1) % self.size
        self.table[index] = (key, value)

    def get(self, key):
        index = self.hash(key)
        while self.table[index] is not None:
            if self.table[index][0] == key:
                return self.table[index][1]
            index = (index + 1) % self.size
        return None

ht = HashTableOpenAddressing(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
print(ht.get("Alice"))  # 90`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Метод 3: Double Hashing (двойное хеширование)"}),e.jsx("p",{className:"theory-intro",children:"Используются две хэш-функции для более эффективного поиска следующей свободной ячейки. При коллизии вместо просто +1, применяем вторую функцию: hash1(key), hash1(key)+hash2(key), hash1(key)+2*hash2(key), и т.д."}),e.jsx("p",{className:"theory-intro",children:"Преимущества: лучше распределяет ключи, меньше кластеров (скопов занятых ячеек), лучше для кэша процессора."}),e.jsx(s,{code:`# Хэш-таблица с double hashing
class HashTableDoubleHashing:
    def __init__(self, size):
        self.size = size
        self.table = [None] * size

    def hash1(self, key):
        # Первая хеш-функция
        return sum(ord(c) for c in key) % self.size

    def hash2(self, key):
        # Вторая хеш-функция (обычно простое число)
        return 7 - (sum(ord(c) for c in key) % 7)

    def add(self, key, value):
        index = self.hash1(key)
        step = self.hash2(key)
        i = 0
        while self.table[index] is not None:
            if self.table[index][0] == key:
                self.table[index] = (key, value)
                return
            i += 1
            index = (self.hash1(key) + i * step) % self.size
        self.table[index] = (key, value)

    def get(self, key):
        index = self.hash1(key)
        step = self.hash2(key)
        i = 0
        while self.table[index] is not None:
            if self.table[index][0] == key:
                return self.table[index][1]
            i += 1
            index = (self.hash1(key) + i * step) % self.size
        return None

# Использование
ht = HashTableDoubleHashing(10)
ht.add("Alice", 90)
ht.add("Bob", 85)
ht.add("Charlie", 92)

print(ht.get("Alice"))   # 90
print(ht.get("Bob"))     # 85`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Сравнение методов разрешения коллизий"}),e.jsx(n,{headers:["Метод","Преимущества","Недостатки"],rows:[["Chaining","Простая реализация, удаление O(1)","Требует доп. память для списков"],["Linear Probing","Не требует доп. память","Кластеризация, заполнение таблицы"],["Double Hashing","Меньше кластеров, лучше распределение","Сложнее реализация, нужны две функции"]]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Big O для хэш-таблиц"}),e.jsx(n,{headers:["Операция","Лучший случай","Средний случай","Худший случай"],rows:[["Добавление","O(1)","O(1)","O(n)"],["Удаление","O(1)","O(1)","O(n)"],["Поиск","O(1)","O(1)","O(n)"]]}),e.jsx(i,{title:"Когда наступает худший случай?",children:e.jsx("p",{children:"Когда хэш-функция плохая и много коллизий. Хорошая хэш-функция дает O(1) в 99% случаев!"})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Словарь в Python"}),e.jsx("p",{className:"theory-intro",children:"Словарь (dict) в Python — это хэш-таблица! Он использует интерпретатор Python под капотом."}),e.jsx(s,{code:`# Словарь = хэш-таблица
student = {
    "name": "Алиса",
    "age": 17,
    "grade": "10A"
}

# Добавление - O(1)
student["city"] = "Москва"

# Поиск - O(1)
print(student["name"])  # Алиса

# Удаление - O(1)
del student["grade"]

# Проверка наличия ключа - O(1)
if "age" in student:
    print(student["age"])  # 17

# Итерация по ключам
for key in student:
    print(f"{key}: {student[key]}")

# Методы
print(student.keys())      # dict_keys(['name', 'age', 'city'])
print(student.values())    # dict_values(['Алиса', 17, 'Москва'])
print(student.items())     # dict_items([('name', 'Алиса'), ...])
print(student.get("age"))  # 17`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практические примеры"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Пример 1: Подсчёт частоты элементов"}),e.jsx(s,{code:`def count_frequency(arr):
    frequency = {}
    for num in arr:
        if num in frequency:
            frequency[num] += 1
        else:
            frequency[num] = 1
    return frequency

# Пример
nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
result = count_frequency(nums)
print(result)  # {1: 1, 2: 2, 3: 3, 4: 4}

# Или использовать defaultdict
from collections import defaultdict

frequency = defaultdict(int)
for num in nums:
    frequency[num] += 1

print(dict(frequency))  # {1: 1, 2: 2, 3: 3, 4: 4}`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Пример 2: Two Sum — найти две числа, которые дают сумму"}),e.jsx(s,{code:`def two_sum(arr, target):
    seen = {}
    for num in arr:
        complement = target - num
        if complement in seen:
            return [seen[complement], arr.index(num)]
        seen[num] = arr.index(num)
    return None

# Пример: найти пару, которая дает сумму 7
nums = [2, 7, 11, 15]
result = two_sum(nums, 9)
print(result)  # [0, 1] (2 + 7 = 9)

# Лучшая версия
def two_sum_v2(arr, target):
    seen = {}
    for i, num in enumerate(arr):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return None

print(two_sum_v2(nums, 9))  # [0, 1]`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Пример 3: Найти дубли в массиве"}),e.jsx(s,{code:`def has_duplicates(arr):
    seen = set()
    for num in arr:
        if num in seen:
            return True
        seen.add(num)
    return False

# Примеры
print(has_duplicates([1, 2, 3, 4]))      # False
print(has_duplicates([1, 2, 3, 2, 4]))   # True

# Или использовать длину
def has_duplicates_v2(arr):
    return len(arr) != len(set(arr))`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Когда использовать хэш-таблицу?"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Нужен быстрый поиск по ключу — используй словарь/хэш-таблицу"}),e.jsx("li",{className:"theory-list-item",children:"Подсчёт частоты элементов"}),e.jsx("li",{className:"theory-list-item",children:"Проверка, содержится ли элемент в наборе"}),e.jsx("li",{className:"theory-list-item",children:"Кэширование (запоминание результатов)"}),e.jsx("li",{className:"theory-list-item",children:"Группировка данных по ключам"})]}),e.jsx(i,{title:"На собеседовании",children:e.jsx("p",{children:"Если задача требует быстрого поиска — часто ответ это хэш-таблица или словарь. Подумай: можно ли использовать ключ для O(1) доступа?"})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги 6 дней"}),e.jsx("p",{className:"theory-intro",children:"Ты изучил основные структуры данных:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 4:"})," Алгоритмы и Big O"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 5:"})," Логика и множества"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 6:"})," Графы и поиск"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 7:"})," Массивы и связные списки"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 8:"})," Стеки и очереди"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"День 9:"})," Хэш-таблицы"]})]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Это основа для 99% задач на собеседованиях! Практикуйся на LeetCode, и ты будешь готов 🚀"})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Ты на правильном пути! Только вперед!"})})]})}export{a as default};
