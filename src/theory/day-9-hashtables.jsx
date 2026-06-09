import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day9HashtablesTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 9</h1>
        <p className="theory-subtitle">Структуры данных: хэш-таблицы</p>
        <p className="theory-date">9 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое хэш-таблица?</h2>
        <p className="theory-intro">
          Хэш-таблица (hash table) — это структура данных, которая использует хэш-функцию для превращения ключей в индексы массива. Позволяет очень быстро искать, добавлять и удалять элементы.
        </p>

        <TheoryExample title="Аналогия">
          <p>Представь, что у тебя есть картотека:</p>
          <ul>
            <li>Нужно найти запись по имени "Алиса"</li>
            <li>Вместо того чтобы перелистывать все записи, применяешь хэш-функцию</li>
            <li>Хэш("Алиса") = 7 → идёшь сразу на ящик 7 → находишь запись</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как работает хэш-таблица</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Хэш-функция</h3>
          <p className="theory-intro">
            Хэш-функция — это функция, которая преобразует ключ любого типа в целое число (индекс).
          </p>

          <TheoryCode code={`# Простая хэш-функция для строк
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

# Хорошая хэш-функция распределяет ключи равномерно`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Структура хэш-таблицы</h3>
          <p className="theory-intro">Упрощённо это выглядит так:</p>
          <TheoryTable
            headers={['Индекс', 'Содержимое', 'Ключи']}
            rows={[
              ['0', '[("Alice", 90)]', 'Alice'],
              ['1', '[]', 'пусто'],
              ['2', '[("Bob", 85)]', 'Bob'],
              ['3', '[]', 'пусто'],
              ['4', '[("Charlie", 92)]', 'Charlie'],
              ['5', '[]', 'пусто'],
              ['...', '...', '...'],
            ]}
          />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Коллизии</h2>
        <p className="theory-intro">
          Коллизия — когда две разные ключи дают один индекс. Например, "Alice" и "Bob" оба дают индекс 2. Нужно это решить.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Метод 1: Chaining (цепочка)</h3>
          <p className="theory-intro">
            Каждая ячейка содержит список (цепочку) элементов. Если коллизия — добавляем в список.
          </p>

          <TheoryCode code={`# Хэш-таблица с chaining
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
print(ht.get("Bob"))     # 85`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Метод 2: Open Addressing</h3>
          <p className="theory-intro">
            Если ячейка занята, ищем следующую свободную ячейку. Например, линейный поиск: если индекс 2 занят, смотрим 3, потом 4, и т.д.
          </p>

          <TheoryCode code={`class HashTableOpenAddressing:
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
print(ht.get("Alice"))  # 90`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Big O для хэш-таблиц</h2>
        <TheoryTable
          headers={['Операция', 'Лучший случай', 'Средний случай', 'Худший случай']}
          rows={[
            ['Добавление', 'O(1)', 'O(1)', 'O(n)'],
            ['Удаление', 'O(1)', 'O(1)', 'O(n)'],
            ['Поиск', 'O(1)', 'O(1)', 'O(n)'],
          ]}
        />

        <TheoryExample title="Когда наступает худший случай?">
          <p>Когда хэш-функция плохая и много коллизий. Хорошая хэш-функция дает O(1) в 99% случаев!</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Словарь в Python</h2>
        <p className="theory-intro">
          Словарь (dict) в Python — это хэш-таблица! Он использует интерпретатор Python под капотом.
        </p>

        <TheoryCode code={`# Словарь = хэш-таблица
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
print(student.get("age"))  # 17`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практические примеры</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Пример 1: Подсчёт частоты элементов</h3>
          <TheoryCode code={`def count_frequency(arr):
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

print(dict(frequency))  # {1: 1, 2: 2, 3: 3, 4: 4}`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Пример 2: Two Sum — найти две числа, которые дают сумму</h3>
          <TheoryCode code={`def two_sum(arr, target):
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

print(two_sum_v2(nums, 9))  # [0, 1]`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Пример 3: Найти дубли в массиве</h3>
          <TheoryCode code={`def has_duplicates(arr):
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
    return len(arr) != len(set(arr))`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Когда использовать хэш-таблицу?</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Нужен быстрый поиск по ключу — используй словарь/хэш-таблицу</li>
          <li className="theory-list-item">Подсчёт частоты элементов</li>
          <li className="theory-list-item">Проверка, содержится ли элемент в наборе</li>
          <li className="theory-list-item">Кэширование (запоминание результатов)</li>
          <li className="theory-list-item">Группировка данных по ключам</li>
        </ul>

        <TheoryExample title="На собеседовании">
          <p>Если задача требует быстрого поиска — часто ответ это хэш-таблица или словарь. Подумай: можно ли использовать ключ для O(1) доступа?</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги 6 дней</h2>
        <p className="theory-intro">
          Ты изучил основные структуры данных:
        </p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>День 4:</strong> Алгоритмы и Big O</li>
          <li className="theory-list-item"><strong>День 5:</strong> Логика и множества</li>
          <li className="theory-list-item"><strong>День 6:</strong> Графы и поиск</li>
          <li className="theory-list-item"><strong>День 7:</strong> Массивы и связные списки</li>
          <li className="theory-list-item"><strong>День 8:</strong> Стеки и очереди</li>
          <li className="theory-list-item"><strong>День 9:</strong> Хэш-таблицы</li>
        </ul>

        <p className="theory-intro" style={{ marginTop: '16px' }}>
          Это основа для 99% задач на собеседованиях! Практикуйся на LeetCode, и ты будешь готов 🚀
        </p>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Половина лагеря пройдена! Ты уже на пути к профессиональному разработчику! 🏆</p>
      </section>
    </div>
  )
}
