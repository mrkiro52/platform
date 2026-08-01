import{j as e}from"./index-COKtlNDI.js";import{T as s,a as r,b as i}from"./TheoryTable-Dymn9neR.js";import{M as n,P as t}from"./MultiPartVideo-DQ-0q4WC.js";import"./VideoPlayer-D8BPvvi2.js";function h(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 3"}),e.jsx("p",{className:"theory-subtitle",children:"Основы программирования: циклы, функции, коллекции"}),e.jsx("p",{className:"theory-date",children:"3 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Видео-лекция: Основы Python (4 части)"}),e.jsx(n,{parts:t})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Циклы"}),e.jsx("p",{className:"theory-intro",children:"Цикл — это способ повторить блок кода много раз. Вместо того чтобы писать одну и ту же команду 100 раз, можно использовать цикл."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Цикл for"}),e.jsx("p",{className:"theory-intro",children:"Используется, когда знаешь, сколько раз нужно повторить код:"}),e.jsx(s,{code:`# Выведи числа от 1 до 5
for i in range(1, 6):
    print(i)
# Выведет: 1 2 3 4 5

# Выведи "Привет" 3 раза
for num in range(3):
    print("Привет!")
# Выведет:
# Привет!
# Привет!
# Привет!`,language:"python"}),e.jsx(r,{title:"Как работает range()",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"range"})," использует Start Stop и Step"]}),e.jsx("li",{children:"По умолчанию start = 0, stop = последнему элементу, step = 1"}),e.jsxs("li",{children:[e.jsx("strong",{children:"range(5)"})," — от 0 до 4 (не включает 5)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"range(1, 6)"})," — от 1 до 5"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"range(0, 10, 2)"})," — от 0 до 10, шаг 2 (0, 2, 4, 6, 8)"]})]})})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Цикл while"}),e.jsx("p",{className:"theory-intro",children:"Повторяет код, пока условие true:"}),e.jsx(s,{code:`count = 0
while count < 5:
    print(count)
    count = count + 1
# Выведет: 0 1 2 3 4

# Игра: угадай число
number = 42
guess = 0
while guess != number:
    guess = int(input("Угадай число (1-100): "))
    if guess < number:
        print("Число больше")
    elif guess > number:
        print("Число меньше")
    else:
        print("Угадал!")`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"break и continue"}),e.jsx("p",{className:"theory-intro",children:"Управляют ходом цикла:"}),e.jsx(i,{headers:["Команда","Что делает","Пример"],rows:[["break","Выходит из цикла сразу","if password_correct: break"],["continue","Пропускает остаток итерации","if user.age < 18: continue"]]}),e.jsx(s,{code:`# break - выход из цикла
for i in range(10):
    if i == 3:
        break  # Выходит, когда i = 3
    print(i)
# Выведет: 0 1 2

# continue - пропустить итерацию
for i in range(5):
    if i == 2:
        continue  # Пропускает 2
    print(i)
# Выведет: 0 1 3 4`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Функции"}),e.jsx("p",{className:"theory-intro",children:"Функция — это блок кода, которому дали имя. Функция можно вызвать много раз, не переписывая код."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Структура функции"}),e.jsx(s,{code:`# Объявление функции
def greet(name):
    print(f"Привет, {name}!")

# Вызов функции
greet("Алиса")  # Выведет: Привет, Алиса!
greet("Боб")    # Выведет: Привет, Боб!`,language:"python"}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Части функции:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"def"})," — ключевое слово для определения функции"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"greet"})," — имя функции"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"(name)"})," — параметры (входные данные)"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"тело функции"})," — код, который выполняется"]})]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Возвращаемое значение (return)"}),e.jsx("p",{className:"theory-intro",children:"Функция может возвращать результат:"}),e.jsx(s,{code:`# Функция с return
def add(a, b):
    result = a + b
    return result

# Используем результат
sum_value = add(5, 3)
print(sum_value)  # Выведет: 8

# Функция-калькулятор
def calculate(x, y, operation):
    if operation == "+":
        return x + y
    elif operation == "-":
        return x - y
    elif operation == "*":
        return x * y
    elif operation == "/":
        return x / y

print(calculate(10, 3, "+"))  # 13
print(calculate(10, 3, "-"))  # 7`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Параметры и аргументы"}),e.jsx(r,{title:"Разница",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Параметры"})," — переменные в скобках при объявлении функции"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Аргументы"})," — значения, которые передаёшь при вызове функции"]})]})}),e.jsx(s,{code:`# name, age — параметры
def profile(name, age):
    print(f"Имя: {name}, Возраст: {age}")

# "Алиса", 17 — аргументы
profile("Алиса", 17)`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Коллекции данных"}),e.jsx("p",{className:"theory-intro",children:"Коллекция — это контейнер, который хранит несколько значений вместе."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Список (list)"}),e.jsx("p",{className:"theory-intro",children:"Упорядоченная коллекция, которую можно менять:"}),e.jsx(s,{code:`# Создание списка
fruits = ["яблоко", "банан", "апельсин"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "текст", 3.14, True]

# Доступ к элементам (индекс начинается с 0!)
print(fruits[0])   # яблоко
print(fruits[1])   # банан
print(fruits[-1])  # апельсин (последний элемент)

# Добавление элемента
fruits.append("груша")  # [яблоко, банан, апельсин, груша]

# Удаление элемента
fruits.remove("банан")  # [яблоко, апельсин, груша]

# Длина списка
print(len(fruits))  # 3

# Цикл по списку
for fruit in fruits:
    print(fruit)
# Выведет: яблоко, апельсин, груша`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Кортеж (tuple)"}),e.jsx("p",{className:"theory-intro",children:"Как список, но не менять его нельзя:"}),e.jsx(s,{code:`# Создание кортежа (круглые скобки)
coords = (10, 20)
colors = ("red", "green", "blue")

# Доступ работает так же
print(coords[0])  # 10
print(colors[1])  # green

# Это НЕЛЬЗЯ менять!
coords[0] = 15  # ❌ Ошибка!

# Но можно создать новый:
coords = (15, 20)  # ✅ Это работает`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Словарь (dict)"}),e.jsx("p",{className:"theory-intro",children:'Хранит пары "ключ-значение":'}),e.jsx(s,{code:`# Создание словаря (фигурные скобки)
student = {
    "name": "Алиса",
    "age": 17,
    "grade": "10А",
    "gpa": 4.5
}

# Доступ по ключу
print(student["name"])  # Алиса
print(student["age"])   # 17

# Добавление новой пары
student["city"] = "Москва"

# Удаление
del student["grade"]

# Проверка наличия ключа
if "name" in student:
    print(student["name"])  # Алиса

# Цикл по словарю
for key, value in student.items():
    print(f"{key}: {value}")
# Выведет:
# name: Алиса
# age: 17
# city: Москва`,language:"python"})]}),e.jsx(i,{headers:["Тип","Символы","Можно менять?","Дубли?","Когда использовать"],rows:[["Список","[ ]","Да","Да","Данные, которые меняются"],["Кортеж","( )","Нет","Да","Данные, которые не меняются"],["Словарь","{ }","Да","Нет (ключи)","Связанные данные (ключ-значение)"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Читаемость кода"}),e.jsx("p",{className:"theory-intro",children:"Код пишется один раз, но читается много раз. Сделай его понятным!"}),e.jsxs(r,{title:"Плохо vs Хорошо",children:[e.jsx("p",{children:e.jsx("strong",{children:"Плохо:"})}),e.jsx("p",{style:{color:"#ff6b6b",fontSize:"13px",fontFamily:"monospace"},children:"x = 5; y = []; for i in range(x): y.append(i*2)"}),e.jsx("p",{style:{marginTop:"12px"},children:e.jsx("strong",{children:"Хорошо:"})}),e.jsx(s,{code:`numbers = []
limit = 5
for i in range(limit):
    doubled = i * 2
    numbers.append(doubled)`,language:"python"})]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Правила:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Используй понятные имена переменных (age вместо a)"}),e.jsx("li",{className:"theory-list-item",children:"Добавляй пробелы: a + b вместо a+b"}),e.jsx("li",{className:"theory-list-item",children:"Один блок кода = одна задача"}),e.jsx("li",{className:"theory-list-item",children:"Комментарии только когда код неочевиден"})]})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Ты уже почти профессионал!"})})]})}export{h as default};
