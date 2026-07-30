import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import MultiPartVideo, { PYTHON_BASICS_PARTS } from '../components/MultiPartVideo'

export default function Day3LoopsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 3</h1>
        <p className="theory-subtitle">Основы программирования: циклы, функции, коллекции</p>
        <p className="theory-date">3 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Видео-лекция: Основы Python (4 части)</h2>
        <MultiPartVideo parts={PYTHON_BASICS_PARTS} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Циклы</h2>
        <p className="theory-intro">
          Цикл — это способ повторить блок кода много раз. Вместо того чтобы писать одну и ту же команду 100 раз, можно использовать цикл.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Цикл for</h3>
          <p className="theory-intro">Используется, когда знаешь, сколько раз нужно повторить код:</p>
          <TheoryCode code={`# Выведи числа от 1 до 5
for i in range(1, 6):
    print(i)
# Выведет: 1 2 3 4 5

# Выведи "Привет" 3 раза
for num in range(3):
    print("Привет!")
# Выведет:
# Привет!
# Привет!
# Привет!`} language="python" />

          <TheoryExample title="Как работает range()">
            <ul>
              <li><strong>range</strong> использует Start Stop и Step</li>
              <li>По умолчанию start = 0, stop = последнему элементу, step = 1</li>
              <li><strong>range(5)</strong> — от 0 до 4 (не включает 5)</li>
              <li><strong>range(1, 6)</strong> — от 1 до 5</li>
              <li><strong>range(0, 10, 2)</strong> — от 0 до 10, шаг 2 (0, 2, 4, 6, 8)</li>
            </ul>
          </TheoryExample>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Цикл while</h3>
          <p className="theory-intro">Повторяет код, пока условие true:</p>
          <TheoryCode code={`count = 0
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
        print("Угадал!")`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">break и continue</h3>
          <p className="theory-intro">Управляют ходом цикла:</p>
          <TheoryTable
            headers={['Команда', 'Что делает', 'Пример']}
            rows={[
              ['break', 'Выходит из цикла сразу', 'if password_correct: break'],
              ['continue', 'Пропускает остаток итерации', 'if user.age < 18: continue'],
            ]}
          />

          <TheoryCode code={`# break - выход из цикла
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
# Выведет: 0 1 3 4`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Функции</h2>
        <p className="theory-intro">
          Функция — это блок кода, которому дали имя. Функция можно вызвать много раз, не переписывая код.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Структура функции</h3>
          <TheoryCode code={`# Объявление функции
def greet(name):
    print(f"Привет, {name}!")

# Вызов функции
greet("Алиса")  # Выведет: Привет, Алиса!
greet("Боб")    # Выведет: Привет, Боб!`} language="python" />

          <p className="theory-intro" style={{ marginTop: '16px' }}>Части функции:</p>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>def</strong> — ключевое слово для определения функции</li>
            <li className="theory-list-item"><strong>greet</strong> — имя функции</li>
            <li className="theory-list-item"><strong>(name)</strong> — параметры (входные данные)</li>
            <li className="theory-list-item"><strong>тело функции</strong> — код, который выполняется</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Возвращаемое значение (return)</h3>
          <p className="theory-intro">Функция может возвращать результат:</p>
          <TheoryCode code={`# Функция с return
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
print(calculate(10, 3, "-"))  # 7`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Параметры и аргументы</h3>
          <TheoryExample title="Разница">
            <ul>
              <li><strong>Параметры</strong> — переменные в скобках при объявлении функции</li>
              <li><strong>Аргументы</strong> — значения, которые передаёшь при вызове функции</li>
            </ul>
          </TheoryExample>

          <TheoryCode code={`# name, age — параметры
def profile(name, age):
    print(f"Имя: {name}, Возраст: {age}")

# "Алиса", 17 — аргументы
profile("Алиса", 17)`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Коллекции данных</h2>
        <p className="theory-intro">
          Коллекция — это контейнер, который хранит несколько значений вместе.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Список (list)</h3>
          <p className="theory-intro">Упорядоченная коллекция, которую можно менять:</p>
          <TheoryCode code={`# Создание списка
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
# Выведет: яблоко, апельсин, груша`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Кортеж (tuple)</h3>
          <p className="theory-intro">Как список, но не менять его нельзя:</p>
          <TheoryCode code={`# Создание кортежа (круглые скобки)
coords = (10, 20)
colors = ("red", "green", "blue")

# Доступ работает так же
print(coords[0])  # 10
print(colors[1])  # green

# Это НЕЛЬЗЯ менять!
coords[0] = 15  # ❌ Ошибка!

# Но можно создать новый:
coords = (15, 20)  # ✅ Это работает`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Словарь (dict)</h3>
          <p className="theory-intro">Хранит пары "ключ-значение":</p>
          <TheoryCode code={`# Создание словаря (фигурные скобки)
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
# city: Москва`} language="python" />
        </div>

        <TheoryTable
          headers={['Тип', 'Символы', 'Можно менять?', 'Дубли?', 'Когда использовать']}
          rows={[
            ['Список', '[ ]', 'Да', 'Да', 'Данные, которые меняются'],
            ['Кортеж', '( )', 'Нет', 'Да', 'Данные, которые не меняются'],
            ['Словарь', '{ }', 'Да', 'Нет (ключи)', 'Связанные данные (ключ-значение)'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Читаемость кода</h2>
        <p className="theory-intro">Код пишется один раз, но читается много раз. Сделай его понятным!</p>

        <TheoryExample title="Плохо vs Хорошо">
          <p><strong>Плохо:</strong></p>
          <p style={{ color: '#ff6b6b', fontSize: '13px', fontFamily: 'monospace' }}>x = 5; y = []; for i in range(x): y.append(i*2)</p>

          <p style={{ marginTop: '12px' }}><strong>Хорошо:</strong></p>
          <TheoryCode code={`numbers = []
limit = 5
for i in range(limit):
    doubled = i * 2
    numbers.append(doubled)`} language="python" />
        </TheoryExample>

        <p className="theory-intro" style={{ marginTop: '16px' }}>Правила:</p>
        <ul className="theory-list">
          <li className="theory-list-item">Используй понятные имена переменных (age вместо a)</li>
          <li className="theory-list-item">Добавляй пробелы: a + b вместо a+b</li>
          <li className="theory-list-item">Один блок кода = одна задача</li>
          <li className="theory-list-item">Комментарии только когда код неочевиден</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Ты уже почти профессионал!</p>
      </section>
    </div>
  )
}
