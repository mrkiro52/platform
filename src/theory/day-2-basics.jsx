import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day2BasicsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 2</h1>
        <p className="theory-subtitle">Основы программирования: переменные, типы, условия</p>
        <p className="theory-date">2 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое программа?</h2>
        <p className="theory-text">
          Программа — это набор инструкций, которые компьютер выполняет по порядку. Программист пишет код на специальном языке (например, Python, JavaScript), а компьютер этот код понимает и исполняет.
        </p>
        <p className="theory-text" style={{ marginTop: '12px' }}>
          Каждая программа состоит из трёх основных частей:
        </p>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Данные</strong> — информация, с которой работает программа</li>
          <li className="theory-list-item"><strong>Инструкции</strong> — команды, что делать с данными</li>
          <li className="theory-list-item"><strong>Порядок выполнения</strong> — в каком порядке выполнять инструкции</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Переменные</h2>
        <p className="theory-intro">
          Переменная — это "ящик" в памяти компьютера, где можно хранить данные. У каждого ящика есть имя (название переменной) и значение (то, что в нём хранится).
        </p>

        <TheoryExample title="Аналогия из реальной жизни">
          <p>Представь, что переменная — это коробка, на которой написано имя:</p>
          <ul>
            <li><strong>Коробка</strong> = переменная</li>
            <li><strong>Надпись на коробке</strong> = имя переменной (например, "возраст")</li>
            <li><strong>То, что внутри коробки</strong> = значение (например, число 17)</li>
          </ul>
        </TheoryExample>

        <p className="theory-intro" style={{ marginTop: '16px' }}>Как объявить переменную:</p>
        <TheoryCode code={`// Python
name = "Иван"
age = 17
height = 180.5

// JavaScript
let name = "Иван"
let age = 17
let height = 180.5`} />

        <p className="theory-intro">Правила для имён переменных:</p>
        <ul className="theory-list">
          <li className="theory-list-item">Имя должно начинаться с буквы или подчёркивания (_)</li>
          <li className="theory-list-item">В имени можно использовать буквы, цифры и подчёркивание</li>
          <li className="theory-list-item">Имя не может содержать пробелы</li>
          <li className="theory-list-item">Придумывай понятные имена (age лучше, чем x)</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Типы данных</h2>
        <p className="theory-intro">
          Тип данных — это категория информации. Например, число — это один тип, текст — другой.
        </p>

        <TheoryTable
          headers={['Тип', 'Описание', 'Примеры', 'Для чего']}
          rows={[
            ['int/число', 'Целое число (без запятой)', '17, -5, 1000', 'Возраст, количество'],
            ['float/число', 'Число с запятой', '3.14, -0.5, 180.5', 'Высота, вес, вычисления'],
            ['str/строка', 'Текст (в кавычках)', '"Иван", "Hello"', 'Имена, сообщения'],
            ['bool/логический', 'Истина или ложь', 'true, false', 'Проверки, условия'],
          ]}
        />

        <p className="theory-intro" style={{ marginTop: '20px' }}>Как проверить тип данных:</p>
        <TheoryCode code={`// Python
name = "Иван"
age = 17
print(type(name))  # <class 'str'>
print(type(age))   # <class 'int'>

// JavaScript
let name = "Иван"
let age = 17
console.log(typeof name)  // "string"
console.log(typeof age)   // "number"`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Операторы</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Арифметические операторы</h3>
          <p className="theory-intro">Используются для математических операций:</p>

          <TheoryTable
            headers={['Оператор', 'Название', 'Пример', 'Результат']}
            rows={[
              ['+', 'Сложение', '5 + 3', '8'],
              ['-', 'Вычитание', '10 - 4', '6'],
              ['*', 'Умножение', '6 * 7', '42'],
              ['/', 'Деление', '20 / 4', '5'],
              ['**', 'Возведение в степень', '2 ** 3', '8'],
              ['%', 'Остаток от деления', '17 % 5', '2'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операторы сравнения</h3>
          <p className="theory-intro">Используются для проверки, сравнивают два значения и возвращают true или false:</p>

          <TheoryTable
            headers={['Оператор', 'Название', 'Пример', 'Результат']}
            rows={[
              ['==', 'Равно', '5 == 5', 'true'],
              ['!=', 'Не равно', '5 != 3', 'true'],
              ['>', 'Больше', '10 > 5', 'true'],
              ['<', 'Меньше', '3 < 10', 'true'],
              ['>=', 'Больше или равно', '5 >= 5', 'true'],
              ['<=', 'Меньше или равно', '3 <= 10', 'true'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Логические операторы</h3>
          <p className="theory-intro">Используются для объединения нескольких условий:</p>

          <TheoryTable
            headers={['Оператор', 'Название', 'Описание', 'Пример']}
            rows={[
              ['and', 'И', 'true, если ОБА условия верны', 'age > 18 and age < 65'],
              ['or', 'ИЛИ', 'true, если ХОТЬ ОДНО условие верно', 'day == "Saturday" or day == "Sunday"'],
              ['not', 'НЕ', 'Меняет true на false и наоборот', 'not is_raining'],
            ]}
          />

          <TheoryCode code={`// Примеры логических операторов

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
    print("Можно гулять")  # Выведет это`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Условные операторы: if, else, elif</h2>
        <p className="theory-intro">
          Условные операторы позволяют программе принимать решения: "если происходит то-то, то делай то-то, иначе делай это".
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Структура if-else</h3>
          <TheoryCode code={`// Python
age = 17

if age >= 18:
    print("Ты взрослый")
else:
    print("Ты ещё не совершеннолетний")

# Выведет: "Ты ещё не совершеннолетний"`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Структура if-elif-else</h3>
          <p className="theory-intro">elif (else if) — "иначе если":</p>
          <TheoryCode code={`score = 75

if score >= 90:
    print("Отличная оценка! (A)")
elif score >= 80:
    print("Хорошая оценка! (B)")
elif score >= 70:
    print("Удовлетворительно (C)")
else:
    print("Плохая оценка (F)")

# Выведет: "Удовлетворительно (C)"`} language="python" />
        </div>

        <TheoryExample title="Чтение кода">
          <p>Когда программа встречает if, она проверяет условие:</p>
          <ul>
            <li>Если условие <strong>true</strong> — выполняет код в блоке if</li>
            <li>Если условие <strong>false</strong> — переходит к elif (если он есть)</li>
            <li>Если все elif false — выполняет код в блоке else</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ввод и вывод данных</h2>
        <p className="theory-intro">
          Вывод (output) — когда программа отправляет информацию пользователю. Ввод (input) — когда пользователь вводит информацию в программу.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Вывод данных (print)</h3>
          <TheoryCode code={`# Просто текст
print("Привет!")

# Переменные
name = "Алиса"
print("Меня зовут", name)  # Выведет: Меня зовут Алиса

# Несколько значений
age = 17
print("Мне", age, "лет")  # Выведет: Мне 17 лет`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Ввод данных (input)</h3>
          <TheoryCode code={`# Простой ввод
name = input("Как тебя зовут? ")
print("Привет,", name)

# Ввод числа (важно: input всегда возвращает текст!)
age_text = input("Сколько тебе лет? ")
age = int(age_text)  # Превращаем текст в число
print("Тебе", age, "лет")`} language="python" />

          <TheoryExample title="Важно">
            <p><strong>input()</strong> всегда возвращает <strong>текст (строку)</strong>, даже если пользователь вводит число!</p>
            <p>Если нужно число — используй <strong>int()</strong> или <strong>float()</strong></p>
          </TheoryExample>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практический пример: калькулятор оценок</h2>
        <TheoryCode code={`print("=== Калькулятор оценок ===")

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
print(f"{name}, твоя оценка: {grade}")`} language="python" />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Ты уже знаешь основы программирования! 🎉</p>
      </section>
    </div>
  )
}
