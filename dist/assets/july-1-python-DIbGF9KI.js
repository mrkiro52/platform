import{j as e}from"./index-C36_DhLL.js";import{T as s,b as n,a}from"./TheoryTable-DNWzV45k.js";import{M as r,P as t}from"./MultiPartVideo-CDdnX9mV.js";import"./VideoPlayer-CurTdZtp.js";function c(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Основы Python"}),e.jsx("p",{className:"theory-subtitle",children:"Треки: Аналитика данных и Machine Learning"}),e.jsx("p",{className:"theory-date",children:"1 июля 2026"}),e.jsx("p",{children:"Перед стартом специализации вспоминаем фундамент Python — язык, на котором строится вся современная аналитика и ML. Здесь собрано всё базовое: типы данных, коллекции, условия, циклы, функции. В конце — анонс библиотек, с которыми будем работать дальше."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2 theory-heading-2--centered",children:"Видео-лекция: Основы Python (4 части)"}),e.jsx(r,{parts:t})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Переменные и типы данных"}),e.jsx("p",{children:"Переменная — это имя, связанное со значением. В Python не нужно объявлять тип заранее: интерпретатор сам определяет его по значению (динамическая типизация)."}),e.jsx(s,{language:"python",code:`x = 42            # int  — целое число
pi = 3.14         # float — вещественное
name = "Аня"      # str  — строка
is_active = True  # bool — True / False
nothing = None    # NoneType — «пустое» значение

print(type(x))    # <class 'int'>
print(type(pi))   # <class 'float'>`}),e.jsx(n,{headers:["Тип","Назначение","Пример"],rows:[["int","Целые числа","5, -17, 1000"],["float","Дробные числа","3.14, -0.5"],["str","Строки (текст)",'"привет"'],["bool","Логический тип","True, False"],["list","Изменяемый список","[1, 2, 3]"],["tuple","Неизменяемый кортеж","(1, 2)"],["dict","Словарь ключ→значение",'{"a": 1}'],["set","Множество (уникальные)","{1, 2, 3}"],["None","Отсутствие значения","None"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Операторы"}),e.jsx(s,{language:"python",code:`# Арифметика
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
not True         # False`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Строки"}),e.jsx("p",{children:"Строка — последовательность символов. Индексация с нуля, поддерживаются срезы."}),e.jsx(s,{language:"python",code:`s = "Python"
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
print(f"Мне {age} лет, через год {age + 1}")`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Коллекции"}),e.jsx("h3",{className:"theory-heading-3",children:"Список (list) — упорядоченный, изменяемый"}),e.jsx(s,{language:"python",code:`nums = [3, 1, 2]
nums.append(4)      # [3, 1, 2, 4]
nums.insert(0, 0)   # [0, 3, 1, 2, 4]
nums.remove(1)      # удалить первое вхождение значения 1
nums.pop()          # удалить и вернуть последний
nums.sort()         # отсортировать на месте
len(nums)           # длина
2 in nums           # True — проверка вхождения
nums[1:3]           # срез`}),e.jsx("h3",{className:"theory-heading-3",children:"Кортеж (tuple) — упорядоченный, неизменяемый"}),e.jsx(s,{language:"python",code:`point = (10, 20)
x, y = point        # распаковка: x=10, y=20
point[0]            # 10
# point[0] = 5      # ошибка! tuple изменять нельзя`}),e.jsx("h3",{className:"theory-heading-3",children:"Словарь (dict) — пары ключ→значение"}),e.jsx(s,{language:"python",code:`user = {"name": "Аня", "age": 25}
user["name"]            # 'Аня'
user["city"] = "Москва" # добавить ключ
user.get("phone", "—")  # безопасно, вернёт '—' если нет ключа
user.keys()             # ключи
user.values()           # значения
for key, value in user.items():
    print(key, value)`}),e.jsx("h3",{className:"theory-heading-3",children:"Множество (set) — уникальные элементы"}),e.jsx(s,{language:"python",code:`a = {1, 2, 3}
b = {2, 3, 4}
a | b   # {1,2,3,4}  объединение
a & b   # {2,3}      пересечение
a - b   # {1}        разность
set([1,1,2,2,3])  # {1,2,3} — убрать дубликаты`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Условия"}),e.jsx(s,{language:"python",code:`age = 18
if age < 18:
    print("Несовершеннолетний")
elif age == 18:
    print("Ровно 18")
else:
    print("Взрослый")

# Тернарный оператор
status = "можно" if age >= 18 else "нельзя"`}),e.jsxs(a,{title:"Важно про отступы",children:["В Python блоки кода задаются отступами (обычно 4 пробела), а не фигурными скобками. Неправильный отступ → ошибка ",e.jsx("code",{children:"IndentationError"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Циклы"}),e.jsx(s,{language:"python",code:`# for — перебор последовательности
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
    print(i)   # 1, 3`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Функции"}),e.jsx(s,{language:"python",code:`def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

greet("Аня")               # 'Привет, Аня!'
greet("Ваня", "Здравствуй") # 'Здравствуй, Ваня!'

# Несколько значений через кортеж
def min_max(nums):
    return min(nums), max(nums)

low, high = min_max([3, 7, 1])  # low=1, high=7

# Лямбда — короткая анонимная функция
square = lambda x: x ** 2
square(5)   # 25`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. List comprehension и полезные функции"}),e.jsx(s,{language:"python",code:`# Генератор списков — компактно вместо цикла
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
round(3.567, 1)  # 3.6`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Что дальше: библиотеки для аналитики и ML"}),e.jsxs("p",{children:["Дальше мы будем работать с классическим стеком Python для данных. Устанавливаются командой ",e.jsx("code",{children:"pip install"}),", импортируются в код через ",e.jsx("code",{children:"import"}),"."]}),e.jsx(n,{headers:["Библиотека","Для чего","Трек"],rows:[["NumPy","Быстрые массивы и вычисления, линейная алгебра","Аналитика · ML"],["pandas","Таблицы (DataFrame), обработка и очистка данных","Аналитика · ML"],["Matplotlib","Базовые графики и визуализация","Аналитика · ML"],["seaborn","Красивые статистические графики поверх Matplotlib","Аналитика"],["scikit-learn","Классические алгоритмы ML: регрессия, классификация, кластеризация","ML"]]}),e.jsx(a,{title:"Как это выглядит",children:e.jsx(s,{language:"python",code:`import numpy as np
import pandas as pd

arr = np.array([1, 2, 3])
arr.mean()        # 2.0

df = pd.DataFrame({"город": ["Мск", "Спб"], "население": [13, 5]})
df["население"].sum()   # 18`})}),e.jsx("p",{children:"Не переживай, если библиотеки пока незнакомы — их разберём подробно на следующих занятиях. Сегодня главное — уверенно владеть базовым синтаксисом."})]})]})}export{c as default};
