import{j as e}from"./index-C5dpE174.js";import{b as s,T as r,a as t}from"./TheoryTable-DI8K8O1-.js";function a(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 5"}),e.jsx("p",{className:"theory-subtitle",children:"Дискретная математика: логика и множества"}),e.jsx("p",{className:"theory-date",children:"5 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Булева алгебра"}),e.jsx("p",{className:"theory-intro",children:"Булева алгебра работает с двумя значениями: истина (True) и ложь (False). Это основа всей цифровой логики!"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Логические операции"}),e.jsx(s,{headers:["Операция","Символ","Описание","Пример","Результат"],rows:[["AND (И)","and, &","true, если ОБА значения true","True and False","False"],["OR (ИЛИ)","or, |","true, если ХОТЬ ОДНО true","True or False","True"],["NOT (НЕ)","not, !","Инвертирует значение","not True","False"],["XOR (исключающее ИЛИ)","xor, ^","true, если значения разные","True xor True","False"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Таблицы истинности"}),e.jsx("p",{className:"theory-intro",children:"AND — оба должны быть true:"}),e.jsx(s,{headers:["A","B","A AND B"],rows:[["true","true","true"],["true","false","false"],["false","true","false"],["false","false","false"]]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"OR — хоть одно true:"}),e.jsx(s,{headers:["A","B","A OR B"],rows:[["true","true","true"],["true","false","true"],["false","true","true"],["false","false","false"]]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"NOT — инверсия:"}),e.jsx(s,{headers:["A","NOT A"],rows:[["true","false"],["false","true"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Примеры в коде"}),e.jsx(r,{code:`# AND - оба условия должны быть true
age = 25
has_license = True

if age >= 18 and has_license:
    print("Можно водить машину")

# OR - хоть одно условие true
is_weekend = True
is_holiday = False

if is_weekend or is_holiday:
    print("Выходной!")  # Выведет это

# NOT - инверсия
is_raining = True

if not is_raining:
    print("Можно гулять")
else:
    print("Нужен зонтик")  # Выведет это`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Множества (Sets)"}),e.jsx("p",{className:"theory-intro",children:"Множество — это неупорядоченная коллекция уникальных элементов. В отличие от списка, каждый элемент может быть только один раз."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции с множествами"}),e.jsx(r,{code:`# Создание множества
colors = {"красный", "зелёный", "синий"}
numbers = {1, 2, 3, 4, 5}

# Добавление элемента
colors.add("жёлтый")

# Удаление элемента
colors.remove("красный")

# Проверка наличия элемента
if "зелёный" in colors:
    print("Зелёный есть!")

# Размер множества
print(len(colors))

# Преобразование из списка (удалит дубли!)
duplicates = [1, 2, 2, 3, 3, 3]
unique = set(duplicates)
print(unique)  # {1, 2, 3}`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операции между множествами"}),e.jsx(r,{code:`set_a = {1, 2, 3, 4}
set_b = {3, 4, 5, 6}

# Объединение (union) - все элементы из обоих
union = set_a | set_b
# или set_a.union(set_b)
print(union)  # {1, 2, 3, 4, 5, 6}

# Пересечение (intersection) - общие элементы
intersection = set_a & set_b
# или set_a.intersection(set_b)
print(intersection)  # {3, 4}

# Разность (difference) - элементы только из первого
difference = set_a - set_b
# или set_a.difference(set_b)
print(difference)  # {1, 2}

# Симметричная разность - уникальные для каждого
sym_diff = set_a ^ set_b
print(sym_diff)  # {1, 2, 5, 6}`,language:"python"})]}),e.jsx(s,{headers:["Операция","Символ","Что делает","Пример"],rows:[["Объединение","|","Все элементы из обоих","{1,2} | {2,3} = {1,2,3}"],["Пересечение","&","Общие элементы","{1,2} & {2,3} = {2}"],["Разность","-","Только из первого","{1,2} - {2,3} = {1}"],["Симметричная разность","^","Уникальные для каждого","{1,2} ^ {2,3} = {1,3}"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Теория множеств"}),e.jsx("p",{className:"theory-intro",children:"Множество описывает коллекцию элементов, которые имеют общее свойство."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Основные понятия"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Элемент"})," — одно значение в множестве"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Пустое множество"})," — множество без элементов ∅"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Подмножество"})," — множество, все элементы которого содержатся в другом множестве"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Универсум"})," — все возможные элементы"]})]}),e.jsx(r,{code:`# Пустое множество
empty = set()
# НЕ используй {} - это пустой словарь!

# Подмножество
numbers = {1, 2, 3, 4, 5}
evens = {2, 4}

# Проверка: evens — подмножество numbers?
if evens <= numbers:
    print("evens — подмножество numbers")  # Выведет это

# Проверка: numbers — надмножество evens?
if numbers >= evens:
    print("numbers — надмножество evens")  # Выведет это`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Битовые операции"}),e.jsx("p",{className:"theory-intro",children:"Компьютер работает с битами (0 и 1). Битовые операции работают прямо с нулями и единицами в памяти."}),e.jsx(s,{headers:["Операция","Символ","Описание"],rows:[["AND","&","Побитовое И"],["OR","|","Побитовое ИЛИ"],["XOR","^","Побитовое исключающее ИЛИ"],["NOT","~","Побитовое НЕ"],["Левый сдвиг","<<","Сдвинуть влево на n позиций"],["Правый сдвиг",">>","Сдвинуть вправо на n позиций"]]}),e.jsx(r,{code:`# Примеры битовых операций
a = 5     # В бинарном: 0101
b = 3     # В бинарном: 0011

# AND - 1 только если оба 1
print(a & b)  # 0001 = 1

# OR - 1 если хоть один 1
print(a | b)  # 0111 = 7

# XOR - 1 если разные
print(a ^ b)  # 0110 = 6

# Сдвиг влево (умножение на 2)
print(5 << 1)  # 10 (5 * 2)

# Сдвиг вправо (деление на 2)
print(5 >> 1)  # 2 (5 / 2)`,language:"python"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практическое применение"}),e.jsxs(t,{title:"Пример: Проверка флагов",children:[e.jsx("p",{children:"Часто используют биты как флаги (на/выкл):"}),e.jsx(r,{code:`# Флаги: читать(1), писать(2), исполнять(4)
READ = 1      # 0001
WRITE = 2     # 0010
EXECUTE = 4   # 0100

# Даём пользователю права читать и писать
user_rights = READ | WRITE  # 0011 = 3

# Проверяем, может ли пользователь писать?
if user_rights & WRITE:
    print("Можно писать!")

# Добавляем право исполнять
user_rights = user_rights | EXECUTE

# Снимаем право писать
user_rights = user_rights & ~WRITE`,language:"python"})]})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Логика — основа всего в программировании!"})})]})}export{a as default};
