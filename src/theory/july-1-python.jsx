import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July1PythonTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы Python</h1>
        <p className="theory-subtitle">Треки: Аналитика данных и Machine Learning</p>
        <p className="theory-date">1 июля 2026</p>
        <p>
          Перед стартом специализации вспоминаем фундамент Python — язык, на котором строится
          вся современная аналитика и ML. Здесь собрано всё базовое: типы данных, коллекции,
          условия, циклы, функции. В конце — анонс библиотек, с которыми будем работать дальше.
        </p>
      </section>

      {/* Переменные и типы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Переменные и типы данных</h2>
        <p>
          Переменная — это имя, связанное со значением. В Python не нужно объявлять тип заранее:
          интерпретатор сам определяет его по значению (динамическая типизация).
        </p>
        <TheoryCode language="python" code={`x = 42            # int  — целое число
pi = 3.14         # float — вещественное
name = "Аня"      # str  — строка
is_active = True  # bool — True / False
nothing = None    # NoneType — «пустое» значение

print(type(x))    # <class 'int'>
print(type(pi))   # <class 'float'>`} />
        <TheoryTable
          headers={['Тип', 'Назначение', 'Пример']}
          rows={[
            ['int', 'Целые числа', '5, -17, 1000'],
            ['float', 'Дробные числа', '3.14, -0.5'],
            ['str', 'Строки (текст)', '"привет"'],
            ['bool', 'Логический тип', 'True, False'],
            ['list', 'Изменяемый список', '[1, 2, 3]'],
            ['tuple', 'Неизменяемый кортеж', '(1, 2)'],
            ['dict', 'Словарь ключ→значение', '{"a": 1}'],
            ['set', 'Множество (уникальные)', '{1, 2, 3}'],
            ['None', 'Отсутствие значения', 'None'],
          ]}
        />
      </section>

      {/* Операторы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Операторы</h2>
        <TheoryCode language="python" code={`# Арифметика
7 + 3    # 10  сложение
7 - 3    # 4   вычитание
7 * 3    # 21  умножение
7 / 3    # 2.333...  деление (всегда float)
7 // 3   # 2   целочисленное деление
7 % 3    # 1   остаток от деления
2 ** 10  # 1024  возведение в степень

# Сравнение → возвращают bool
5 > 3    # True
5 == 5   # True
5 != 4   # True

# Логические
True and False   # False
True or False    # True
not True         # False`} />
      </section>

      {/* Строки */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Строки</h2>
        <p>Строка — последовательность символов. Индексация с нуля, поддерживаются срезы.</p>
        <TheoryCode language="python" code={`s = "Python"
len(s)          # 6  длина
s[0]            # 'P'  первый символ
s[-1]           # 'n'  последний
s[0:3]          # 'Pyt'  срез [start:stop]
s.upper()       # 'PYTHON'
s.lower()       # 'python'
s.replace("P", "J")  # 'Jython'
"a,b,c".split(",")   # ['a', 'b', 'c']
"-".join(["a","b"])  # 'a-b'
s.startswith("Py")   # True
"  hi  ".strip()     # 'hi'  убрать пробелы по краям

# f-строки — удобная подстановка значений
age = 25
print(f"Мне {age} лет, через год {age + 1}")`} />
      </section>

      {/* Коллекции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Коллекции</h2>
        <h3 className="theory-heading-3">Список (list) — упорядоченный, изменяемый</h3>
        <TheoryCode language="python" code={`nums = [3, 1, 2]
nums.append(4)      # [3, 1, 2, 4]
nums.insert(0, 0)   # [0, 3, 1, 2, 4]
nums.remove(1)      # удалить первое вхождение значения 1
nums.pop()          # удалить и вернуть последний
nums.sort()         # отсортировать на месте
len(nums)           # длина
2 in nums           # True — проверка вхождения
nums[1:3]           # срез`} />
        <h3 className="theory-heading-3">Кортеж (tuple) — упорядоченный, неизменяемый</h3>
        <TheoryCode language="python" code={`point = (10, 20)
x, y = point        # распаковка: x=10, y=20
point[0]            # 10
# point[0] = 5      # ошибка! tuple изменять нельзя`} />
        <h3 className="theory-heading-3">Словарь (dict) — пары ключ→значение</h3>
        <TheoryCode language="python" code={`user = {"name": "Аня", "age": 25}
user["name"]            # 'Аня'
user["city"] = "Москва" # добавить ключ
user.get("phone", "—")  # безопасно, вернёт '—' если нет ключа
user.keys()             # ключи
user.values()           # значения
for key, value in user.items():
    print(key, value)`} />
        <h3 className="theory-heading-3">Множество (set) — уникальные элементы</h3>
        <TheoryCode language="python" code={`a = {1, 2, 3}
b = {2, 3, 4}
a | b   # {1,2,3,4}  объединение
a & b   # {2,3}      пересечение
a - b   # {1}        разность
set([1,1,2,2,3])  # {1,2,3} — убрать дубликаты`} />
      </section>

      {/* Условия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Условия</h2>
        <TheoryCode language="python" code={`age = 18
if age < 18:
    print("Несовершеннолетний")
elif age == 18:
    print("Ровно 18")
else:
    print("Взрослый")

# Тернарный оператор
status = "можно" if age >= 18 else "нельзя"`} />
        <TheoryExample title="Важно про отступы">
          В Python блоки кода задаются отступами (обычно 4 пробела), а не фигурными скобками.
          Неправильный отступ → ошибка <code>IndentationError</code>.
        </TheoryExample>
      </section>

      {/* Циклы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Циклы</h2>
        <TheoryCode language="python" code={`# for — перебор последовательности
for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for fruit in ["яблоко", "груша"]:
    print(fruit)

# range(start, stop, step)
for i in range(2, 11, 2):  # 2, 4, 6, 8, 10
    print(i)

# while — пока условие истинно
n = 5
while n > 0:
    print(n)
    n -= 1

# break — прервать цикл, continue — пропустить итерацию
for i in range(10):
    if i == 5:
        break
    if i % 2 == 0:
        continue
    print(i)   # 1, 3`} />
      </section>

      {/* Функции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Функции</h2>
        <TheoryCode language="python" code={`def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

greet("Аня")               # 'Привет, Аня!'
greet("Ваня", "Здравствуй") # 'Здравствуй, Ваня!'

# Несколько значений через кортеж
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([3, 7, 1])  # low=1, high=7

# Лямбда — короткая анонимная функция
square = lambda x: x ** 2
square(5)   # 25`} />
      </section>

      {/* Comprehensions и встроенные */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. List comprehension и полезные функции</h2>
        <TheoryCode language="python" code={`# Генератор списков — компактно вместо цикла
squares = [x**2 for x in range(5)]       # [0,1,4,9,16]
evens = [x for x in range(10) if x % 2 == 0]  # [0,2,4,6,8]

# Полезные встроенные функции
len([1,2,3])          # 3
sum([1,2,3])          # 6
min([3,1,2]), max([3,1,2])  # 1, 3
sorted([3,1,2])       # [1,2,3]
list(range(5))        # [0,1,2,3,4]
enumerate(["a","b"])  # (0,'a'), (1,'b')
zip([1,2], ["a","b"]) # (1,'a'), (2,'b')

# abs, round
abs(-5)      # 5
round(3.567, 1)  # 3.6`} />
      </section>

      {/* Библиотеки */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Что дальше: библиотеки для аналитики и ML</h2>
        <p>
          Дальше мы будем работать с классическим стеком Python для данных. Устанавливаются
          командой <code>pip install</code>, импортируются в код через <code>import</code>.
        </p>
        <TheoryTable
          headers={['Библиотека', 'Для чего', 'Трек']}
          rows={[
            ['NumPy', 'Быстрые массивы и вычисления, линейная алгебра', 'Аналитика · ML'],
            ['pandas', 'Таблицы (DataFrame), обработка и очистка данных', 'Аналитика · ML'],
            ['Matplotlib', 'Базовые графики и визуализация', 'Аналитика · ML'],
            ['seaborn', 'Красивые статистические графики поверх Matplotlib', 'Аналитика'],
            ['scikit-learn', 'Классические алгоритмы ML: регрессия, классификация, кластеризация', 'ML'],
          ]}
        />
        <TheoryExample title="Как это выглядит">
          <TheoryCode language="python" code={`import numpy as np
import pandas as pd

arr = np.array([1, 2, 3])
arr.mean()        # 2.0

df = pd.DataFrame({"город": ["Мск", "Спб"], "население": [13, 5]})
df["население"].sum()   # 18`} />
        </TheoryExample>
        <p>
          Не переживай, если библиотеки пока незнакомы — их разберём подробно на следующих
          занятиях. Сегодня главное — уверенно владеть базовым синтаксисом.
        </p>
      </section>
    </div>
  )
}
