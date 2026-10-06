import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day5LogicTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Дискретная математика: логика и множества</h1>
        <p>
          Логика и теория множеств — математическая основа программирования: условия в коде, запросы к базам данных, битовые флаги и операции над коллекциями опираются именно на них.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Булева алгебра</h2>
        <p className="theory-intro">
          Булева алгебра работает с двумя значениями: истина (True) и ложь (False). Это основа всей цифровой логики!
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Логические операции</h3>
          <TheoryTable
            headers={['Операция', 'Символ', 'Описание', 'Пример', 'Результат']}
            rows={[
              ['AND (И)', 'and, &', 'true, если ОБА значения true', 'True and False', 'False'],
              ['OR (ИЛИ)', 'or, |', 'true, если ХОТЬ ОДНО true', 'True or False', 'True'],
              ['NOT (НЕ)', 'not, !', 'Инвертирует значение', 'not True', 'False'],
              ['XOR (исключающее ИЛИ)', 'xor, ^', 'true, если значения разные', 'True xor True', 'False'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Таблицы истинности</h3>
          <p className="theory-intro">AND — оба должны быть true:</p>
          <TheoryTable
            headers={['A', 'B', 'A AND B']}
            rows={[
              ['true', 'true', 'true'],
              ['true', 'false', 'false'],
              ['false', 'true', 'false'],
              ['false', 'false', 'false'],
            ]}
          />

          <p className="theory-intro" style={{ marginTop: '16px' }}>OR — хоть одно true:</p>
          <TheoryTable
            headers={['A', 'B', 'A OR B']}
            rows={[
              ['true', 'true', 'true'],
              ['true', 'false', 'true'],
              ['false', 'true', 'true'],
              ['false', 'false', 'false'],
            ]}
          />

          <p className="theory-intro" style={{ marginTop: '16px' }}>NOT — инверсия:</p>
          <TheoryTable
            headers={['A', 'NOT A']}
            rows={[
              ['true', 'false'],
              ['false', 'true'],
            ]}
          />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Примеры в коде</h3>
          <TheoryCode code={`# AND - оба условия должны быть true
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
    print("Нужен зонтик")  # Выведет это`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Множества (Sets)</h2>
        <p className="theory-intro">
          Множество — это неупорядоченная коллекция уникальных элементов. В отличие от списка, каждый элемент может быть только один раз.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции с множествами</h3>
          <TheoryCode code={`# Создание множества
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
print(unique)  # {1, 2, 3}`} language="python" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Операции между множествами</h3>
          <TheoryCode code={`set_a = {1, 2, 3, 4}
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
print(sym_diff)  # {1, 2, 5, 6}`} language="python" />
        </div>

        <TheoryTable
          headers={['Операция', 'Символ', 'Что делает', 'Пример']}
          rows={[
            ['Объединение', '|', 'Все элементы из обоих', '{1,2} | {2,3} = {1,2,3}'],
            ['Пересечение', '&', 'Общие элементы', '{1,2} & {2,3} = {2}'],
            ['Разность', '-', 'Только из первого', '{1,2} - {2,3} = {1}'],
            ['Симметричная разность', '^', 'Уникальные для каждого', '{1,2} ^ {2,3} = {1,3}'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Теория множеств</h2>
        <p className="theory-intro">
          Множество описывает коллекцию элементов, которые имеют общее свойство.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Основные понятия</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Элемент</strong> — одно значение в множестве</li>
            <li className="theory-list-item"><strong>Пустое множество</strong> — множество без элементов ∅</li>
            <li className="theory-list-item"><strong>Подмножество</strong> — множество, все элементы которого содержатся в другом множестве</li>
            <li className="theory-list-item"><strong>Универсум</strong> — все возможные элементы</li>
          </ul>

          <TheoryCode code={`# Пустое множество
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
    print("numbers — надмножество evens")  # Выведет это`} language="python" />
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Битовые операции</h2>
        <p className="theory-intro">
          Компьютер работает с битами (0 и 1). Битовые операции работают прямо с нулями и единицами в памяти.
        </p>

        <TheoryTable
          headers={['Операция', 'Символ', 'Описание']}
          rows={[
            ['AND', '&', 'Побитовое И'],
            ['OR', '|', 'Побитовое ИЛИ'],
            ['XOR', '^', 'Побитовое исключающее ИЛИ'],
            ['NOT', '~', 'Побитовое НЕ'],
            ['Левый сдвиг', '<<', 'Сдвинуть влево на n позиций'],
            ['Правый сдвиг', '>>', 'Сдвинуть вправо на n позиций'],
          ]}
        />

        <TheoryCode code={`# Примеры битовых операций
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
print(5 >> 1)  # 2 (5 / 2)`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Практическое применение</h2>

        <TheoryExample title="Пример: Проверка флагов">
          <p>Часто используют биты как флаги (на/выкл):</p>
          <TheoryCode code={`# Флаги: читать(1), писать(2), исполнять(4)
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
user_rights = user_rights & ~WRITE`} language="python" />
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Законы де Моргана</h2>
        <p>
          Два правила, которые позволяют «пронести» отрицание внутрь скобок. Они постоянно нужны, чтобы
          упрощать условия в коде и делать их читаемыми.
        </p>
        <TheoryTable
          headers={['Закон', 'Словами']}
          rows={[
            ['not (A and B) == (not A) or (not B)', 'Неверно, что оба истинны → хотя бы одно ложно'],
            ['not (A or B) == (not A) and (not B)', 'Неверно, что хотя бы одно истинно → оба ложны'],
          ]}
        />
        <TheoryCode language="python" code={`# Было: трудно читать
if not (age >= 18 and has_passport):
    deny()

# Стало: то же самое по закону де Моргана
if age < 18 or not has_passport:
    deny()`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Ленивое вычисление условий</h2>
        <p>
          Python (как и большинство языков) вычисляет <code>and</code> и <code>or</code> слева направо и
          останавливается, как только результат известен. Это называется <strong>short-circuit evaluation</strong>.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item"><code>A and B</code>: если A ложно, B даже не вычисляется.</li>
          <li className="theory-list-item"><code>A or B</code>: если A истинно, B не вычисляется.</li>
        </ul>
        <TheoryCode language="python" code={`# Безопасно: деление не выполнится, если count == 0
if count != 0 and total / count > 10:
    print("Среднее больше 10")

# Проверка, что список не пустой, перед обращением к элементу
if items and items[0] == "start":
    run()

# Значение по умолчанию: если name пустое, возьмётся "Гость"
display = name or "Гость"`} />
        <p>
          Отсюда практическое правило: в условиях ставь первыми дешёвые и «защитные» проверки, а дорогие
          вычисления — после них.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Импликация: «если A, то B»</h2>
        <p>
          Импликация <code>A → B</code> ложна только в одном случае: когда A истинно, а B ложно. Во всех остальных
          случаях она истинна. Это часто путают: если A ложно, импликация истинна независимо от B.
        </p>
        <TheoryTable
          headers={['A', 'B', 'A → B']}
          rows={[
            ['True', 'True', 'True'],
            ['True', 'False', 'False'],
            ['False', 'True', 'True'],
            ['False', 'False', 'True'],
          ]}
        />
        <p>
          В коде импликация записывается как <code>(not A) or B</code>. Пример правила: «если пользователь —
          администратор, то у него включена двухфакторная защита»:
        </p>
        <TheoryCode language="python" code={`def rule_ok(user):
    return (not user.is_admin) or user.has_2fa`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Свойства операций над множествами</h2>
        <TheoryTable
          headers={['Операция', 'Python', 'Сложность']}
          rows={[
            ['Проверка принадлежности x ∈ A', 'x in a', 'O(1) в среднем'],
            ['Объединение A ∪ B', 'a | b', 'O(len(a) + len(b))'],
            ['Пересечение A ∩ B', 'a & b', 'O(min(len(a), len(b)))'],
            ['Разность A \\ B', 'a - b', 'O(len(a))'],
            ['Симметрическая разность', 'a ^ b', 'O(len(a) + len(b))'],
            ['Подмножество A ⊆ B', 'a <= b', 'O(len(a))'],
          ]}
        />
        <TheoryExample title="Задача: какие студенты сдали оба экзамена и кто сдал только один">
          <TheoryCode language="python" code={`math = {"Аня", "Борис", "Вера", "Глеб"}
physics = {"Борис", "Глеб", "Дина"}

both = math & physics          # {'Борис', 'Глеб'}
only_one = math ^ physics      # {'Аня', 'Вера', 'Дина'}
any_exam = math | physics      # все пятеро`} />
        </TheoryExample>
        <p>
          Те же операции есть в SQL: <code>UNION</code>, <code>INTERSECT</code>, <code>EXCEPT</code>. А
          <code> JOIN</code> по сути строит пересечение таблиц по ключу.
        </p>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Логика — основа всего в программировании!</p>
      </section>
    </div>
  )
}
