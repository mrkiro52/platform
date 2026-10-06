import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import MultiPartVideo, { PYTHON_BASICS_PARTS } from '../components/MultiPartVideo'

export default function Day3LoopsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы программирования: циклы, функции, коллекции</h1>
        <p>
          Циклы позволяют повторять действия, функции — переиспользовать код, а коллекции — хранить много значений сразу. Вместе с переменными и условиями это полный базовый набор, из которого строится любая программа.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2 theory-heading-2--centered">Видео-лекция: Основы Python (4 части)</h2>
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
coords[0] = 15  # ✗ Ошибка!

# Но можно создать новый:
coords = (15, 20)  # ✓ Это работает`} language="python" />
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

      <section className="theory-section">
        <h2 className="theory-heading-2">Цикл while, break и continue</h2>
        <p>
          <code>for</code> перебирает готовую последовательность, а <code>while</code> повторяет действия, пока
          условие истинно. Его используют, когда заранее неизвестно, сколько будет повторений.
        </p>
        <TheoryCode language="python" code={`# Спрашиваем, пока не введут корректное число
while True:
    text = input("Введите возраст: ")
    if text.isdigit():
        age = int(text)
        break            # выйти из цикла
    print("Нужно целое число")

# continue — пропустить остаток текущей итерации
for n in range(10):
    if n % 2 == 0:
        continue         # чётные пропускаем
    print(n)             # 1 3 5 7 9`} />
        <p className="theory-highlight">
          В <code>while</code> легко получить бесконечный цикл: убедись, что внутри цикла что-то меняется так,
          что условие когда-нибудь станет ложным, или есть <code>break</code>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">enumerate и zip</h2>
        <p>Две встроенные функции, которые избавляют от ручной работы с индексами:</p>
        <TheoryCode language="python" code={`names = ["Аня", "Борис", "Вера"]
scores = [90, 75, 88]

# Нужен и индекс, и значение
for i, name in enumerate(names, start=1):
    print(i, name)          # 1 Аня, 2 Борис, 3 Вера

# Идём по двум спискам параллельно
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# Собрать словарь из двух списков
result = dict(zip(names, scores))   # {'Аня': 90, 'Борис': 75, 'Вера': 88}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Аргументы функций подробнее</h2>
        <TheoryCode language="python" code={`# Значение по умолчанию
def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

greet("Аня")                    # Привет, Аня!
greet("Аня", greeting="Здравствуй")   # именованный аргумент

# Произвольное число аргументов
def total(*numbers):            # numbers — кортеж
    return sum(numbers)

total(1, 2, 3)                  # 6

def build_user(**fields):       # fields — словарь
    return fields

build_user(name="Аня", age=25)  # {'name': 'Аня', 'age': 25}`} />
        <p className="theory-highlight">
          Никогда не используй изменяемый объект как значение по умолчанию: <code>def add(item, items=[])</code>.
          Список создаётся один раз при определении функции и будет общим для всех вызовов. Правильно:
          <code> items=None</code>, а внутри <code>if items is None: items = []</code>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Область видимости</h2>
        <p>
          Переменная, созданная внутри функции, видна только внутри неё (локальная). Переменные снаружи функции
          (глобальные) можно читать, но для изменения нужно ключевое слово <code>global</code> — и его стоит
          избегать: функция, которая меняет внешние переменные, непредсказуема.
        </p>
        <TheoryCode language="python" code={`counter = 0

def bad_increment():
    global counter        # меняет внешнее состояние — так лучше не делать
    counter += 1

def good_increment(value):
    return value + 1      # получает данные и возвращает результат

counter = good_increment(counter)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Рекурсия</h2>
        <p>
          Рекурсивная функция вызывает саму себя для задачи меньшего размера. У неё обязательно есть
          <strong> базовый случай</strong> — условие, при котором она перестаёт вызывать себя.
        </p>
        <TheoryCode language="python" code={`def factorial(n):
    if n <= 1:            # базовый случай
        return 1
    return n * factorial(n - 1)

factorial(5)   # 5 * 4 * 3 * 2 * 1 = 120`} />
        <p>
          Каждый вызов занимает место в стеке вызовов. В Python глубина рекурсии по умолчанию ограничена
          примерно 1000 вызовами, поэтому для больших n лучше цикл. Рекурсия удобна для деревьев, графов и задач
          «разделяй и властвуй».
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Полезные методы словарей</h2>
        <TheoryTable
          headers={['Метод', 'Что делает', 'Пример']}
          rows={[
            ['d.get(k, default)', 'Значение по ключу или default, если ключа нет', "ages.get('Глеб', 0)"],
            ['d.items()', 'Пары (ключ, значение) для перебора', 'for k, v in d.items()'],
            ['d.keys(), d.values()', 'Только ключи или только значения', 'sum(d.values())'],
            ['d.setdefault(k, v)', 'Вернуть значение, а если ключа нет — сначала записать v', "groups.setdefault(city, []).append(name)"],
            ['d.pop(k)', 'Удалить ключ и вернуть значение', "d.pop('temp')"],
          ]}
        />
        <TheoryCode language="python" code={`# Подсчёт слов — классическая задача на словарь
text = "кот пёс кот рыба кот пёс"
counts = {}
for word in text.split():
    counts[word] = counts.get(word, 0) + 1
print(counts)   # {'кот': 3, 'пёс': 2, 'рыба': 1}`} />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Ты уже почти профессионал!</p>
      </section>
    </div>
  )
}
