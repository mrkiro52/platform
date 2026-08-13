import{j as e}from"./index-CPS4-3oh.js";import{a as r,T as s,b as i}from"./TheoryTable-Dn24XUql.js";import{M as t,P as a}from"./MultiPartVideo-C2SI8Rfo.js";import"./VideoPlayer-DgFIlqsM.js";function o(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 2"}),e.jsx("p",{className:"theory-subtitle",children:"Основы программирования: переменные, типы, условия"}),e.jsx("p",{className:"theory-date",children:"2 июня 2026"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Видео-лекция: Основы Python (4 части)"}),e.jsx(t,{parts:a})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Что такое программа?"}),e.jsx("p",{className:"theory-text",children:"Программа — это набор инструкций, которые компьютер выполняет по порядку. Программист пишет код на специальном языке (например, Python, JavaScript), а компьютер этот код понимает и исполняет."}),e.jsx("p",{className:"theory-text",style:{marginTop:"12px"},children:"Каждая программа состоит из трёх основных частей:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Данные"})," — информация, с которой работает программа"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Инструкции"})," — команды, что делать с данными"]}),e.jsxs("li",{className:"theory-list-item",children:[e.jsx("strong",{children:"Порядок выполнения"})," — в каком порядке выполнять инструкции"]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Переменные"}),e.jsx("p",{className:"theory-intro",children:'Переменная — это "ящик" в памяти компьютера, где можно хранить данные. У каждого ящика есть имя (название переменной) и значение (то, что в нём хранится).'}),e.jsxs(r,{title:"Аналогия из реальной жизни",children:[e.jsx("p",{children:"Представь, что переменная — это коробка, на которой написано имя:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Коробка"})," = переменная"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Надпись на коробке"}),' = имя переменной (например, "возраст")']}),e.jsxs("li",{children:[e.jsx("strong",{children:"То, что внутри коробки"})," = значение (например, число 17)"]})]})]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"16px"},children:"Как объявить переменную:"}),e.jsx(s,{code:`// Python
name = "Иван"
age = 17
height = 180.5

// JavaScript
let name = "Иван"
let age = 17
let height = 180.5`}),e.jsx("p",{className:"theory-intro",children:"Правила для имён переменных:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{className:"theory-list-item",children:"Имя должно начинаться с буквы или подчёркивания (_)"}),e.jsx("li",{className:"theory-list-item",children:"В имени можно использовать буквы, цифры и подчёркивание"}),e.jsx("li",{className:"theory-list-item",children:"Имя не может содержать пробелы"}),e.jsx("li",{className:"theory-list-item",children:"Придумывай понятные имена (age лучше, чем x)"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Типы данных"}),e.jsx("p",{className:"theory-intro",children:"Тип данных — это категория информации. Например, число — это один тип, текст — другой."}),e.jsx(i,{headers:["Тип","Описание","Примеры","Для чего"],rows:[["int/число","Целое число (без запятой)","17, -5, 1000","Возраст, количество"],["float/число","Число с запятой","3.14, -0.5, 180.5","Высота, вес, вычисления"],["str/строка","Текст (в кавычках)",'"Иван", "Hello"',"Имена, сообщения"],["bool/логический","Истина или ложь","true, false","Проверки, условия"]]}),e.jsx("p",{className:"theory-intro",style:{marginTop:"20px"},children:"Как проверить тип данных:"}),e.jsx(s,{code:`// Python
name = "Иван"
age = 17
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>

// JavaScript
let name = "Иван"
let age = 17
console.log(typeof name)  // "string"
console.log(typeof age)   // "number"`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Операторы"}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Арифметические операторы"}),e.jsx("p",{className:"theory-intro",children:"Используются для математических операций:"}),e.jsx(i,{headers:["Оператор","Название","Пример","Результат"],rows:[["+","Сложение","5 + 3","8"],["-","Вычитание","10 - 4","6"],["*","Умножение","6 * 7","42"],["/","Деление","20 / 4","5"],["**","Возведение в степень","2 ** 3","8"],["%","Остаток от деления","17 % 5","2"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Операторы сравнения"}),e.jsx("p",{className:"theory-intro",children:"Используются для проверки, сравнивают два значения и возвращают true или false:"}),e.jsx(i,{headers:["Оператор","Название","Пример","Результат"],rows:[["==","Равно","5 == 5","true"],["!=","Не равно","5 != 3","true"],[">","Больше","10 > 5","true"],["<","Меньше","3 < 10","true"],[">=","Больше или равно","5 >= 5","true"],["<=","Меньше или равно","3 <= 10","true"]]})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Логические операторы"}),e.jsx("p",{className:"theory-intro",children:"Используются для объединения нескольких условий:"}),e.jsx(i,{headers:["Оператор","Название","Описание","Пример"],rows:[["and","И","true, если ОБА условия верны","age > 18 and age < 65"],["or","ИЛИ","true, если ХОТЬ ОДНО условие верно",'day == "Saturday" or day == "Sunday"'],["not","НЕ","Меняет true на false и наоборот","not is_raining"]]}),e.jsx(s,{code:`// Примеры логических операторов

// AND - оба условия должны быть true
age = 25
if age > 18 and age < 65:
    print("Трудоспособный возраст")  # Выведет это

// OR - хоть одно условие true
day = "Saturday"
if day == "Saturday" or day == "Sunday":
    print("Выходной!")  # Выведет это

// NOT - инвертирует значение
is_raining = False
if not is_raining:
    print("Можно гулять")  # Выведет это`,language:"python"})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Условные операторы: if, else, elif"}),e.jsx("p",{className:"theory-intro",children:'Условные операторы позволяют программе принимать решения: "если происходит то-то, то делай то-то, иначе делай это".'}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Структура if-else"}),e.jsx(s,{code:`// Python
age = 17

if age >= 18:
    print("Ты взрослый")
else:
    print("Ты ещё не совершеннолетний")

# Выведет: "Ты ещё не совершеннолетний"`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Структура if-elif-else"}),e.jsx("p",{className:"theory-intro",children:'elif (else if) — "иначе если":'}),e.jsx(s,{code:`score = 75

if score >= 90:
    print("Отличная оценка! (A)")
elif score >= 80:
    print("Хорошая оценка! (B)")
elif score >= 70:
    print("Удовлетворительно (C)")
else:
    print("Плохая оценка (F)")

# Выведет: "Удовлетворительно (C)"`,language:"python"})]}),e.jsxs(r,{title:"Чтение кода",children:[e.jsx("p",{children:"Когда программа встречает if, она проверяет условие:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Если условие ",e.jsx("strong",{children:"true"})," — выполняет код в блоке if"]}),e.jsxs("li",{children:["Если условие ",e.jsx("strong",{children:"false"})," — переходит к elif (если он есть)"]}),e.jsx("li",{children:"Если все elif false — выполняет код в блоке else"})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Ввод и вывод данных"}),e.jsx("p",{className:"theory-intro",children:"Вывод (output) — когда программа отправляет информацию пользователю. Ввод (input) — когда пользователь вводит информацию в программу."}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Вывод данных (print)"}),e.jsx(s,{code:`# Просто текст
print("Привет!")

# Переменные
name = "Алиса"
print("Меня зовут", name)  # Выведет: Меня зовут Алиса

# Несколько значений
age = 17
print("Мне", age, "лет")  # Выведет: Мне 17 лет`,language:"python"})]}),e.jsxs("div",{className:"theory-subsection",children:[e.jsx("h3",{className:"theory-heading-3",children:"Ввод данных (input)"}),e.jsx(s,{code:`# Простой ввод
name = input("Как тебя зовут? ")
print("Привет,", name)

# Ввод числа (важно: input всегда возвращает текст!)
age_text = input("Сколько тебе лет? ")
age = int(age_text)  # Превращаем текст в число
print("Тебе", age, "лет")`,language:"python"}),e.jsxs(r,{title:"Важно",children:[e.jsxs("p",{children:[e.jsx("strong",{children:"input()"})," всегда возвращает ",e.jsx("strong",{children:"текст (строку)"}),", даже если пользователь вводит число!"]}),e.jsxs("p",{children:["Если нужно число — используй ",e.jsx("strong",{children:"int()"})," или ",e.jsx("strong",{children:"float()"})]})]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Практический пример: калькулятор оценок"}),e.jsx(s,{code:`print("=== Калькулятор оценок ===")

# Ввод
name = input("Как тебя зовут? ")
score = int(input("Какая у тебя оценка? (0-100): "))

# Логика
if score >= 90:
    grade = "A (отлично)"
elif score >= 80:
    grade = "B (хорошо)"
elif score >= 70:
    grade = "C (удовлетворительно)"
elif score >= 60:
    grade = "D (слабо)"
else:
    grade = "F (очень плохо)"

# Вывод
print(f"{name}, твоя оценка: {grade}")`,language:"python"})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Теперь ты знаешь основы программирования!"})})]})}export{o as default};
