// Курс «Python: с нуля и до профи», неделя 3 — продвинутые темы и инструменты.
// Формат уроков и тестов — как в week1.js. В проверках (code) доступна
// __kiro_eq(label, got, expected) и await — проверка выполняется асинхронно.

import { p, h, list, steps, py, shell, note, tip, warn, table, starter } from './blocks'

export default [
  // ═══════════════════════════════════════════════════════════════ 3.1
  {
    id: 'w3d1',
    week: 3,
    day: 1,
    title: 'Основы ООП: классы, объекты, методы',
    summary: 'Зачем нужно объектно-ориентированное программирование, класс и объект, конструктор __init__ и self, атрибуты и методы, атрибуты класса и экземпляра.',
    sections: [
      {
        id: 'why',
        title: 'Зачем нужны классы',
        blocks: [
          p('До сих пор данные и функции жили отдельно: словарь с информацией о студенте и функции, которые с ним работают. Когда программа растёт, такой код становится трудно поддерживать. **Объектно-ориентированное программирование (ООП)** объединяет данные и действия над ними в одно целое — **объект**.'),
          p('**Класс** — это чертёж, шаблон. **Объект** (экземпляр класса) — конкретная вещь, созданная по чертежу. Класс «Собака» описывает, что у любой собаки есть имя и возраст и что она умеет лаять. А Бобик и Шарик — два разных объекта этого класса со своими именами.'),
          table(['Понятие', 'Что это', 'Пример'], [
            ['класс', 'шаблон', '`Dog`'],
            ['объект, экземпляр', 'конкретная вещь по шаблону', '`rex = Dog("Рекс", 3)`'],
            ['атрибут', 'данные объекта', '`rex.name`, `rex.age`'],
            ['метод', 'функция объекта', '`rex.bark()`'],
          ]),
          p('Ты уже пользовался объектами: строка `"кот"` — объект класса `str`, а `.upper()` — его метод. Теперь научимся создавать свои классы.'),
        ],
      },
      {
        id: 'class',
        title: 'Класс и конструктор __init__',
        blocks: [
          p('Класс объявляется словом `class`. Имена классов пишут в стиле **CamelCase** — каждое слово с заглавной буквы: `Dog`, `BankAccount`.'),
          py(`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        return f"{self.name}: Гав!"

rex = Dog("Рекс", 3)
sharik = Dog("Шарик", 5)
print(rex.name, rex.age)
print(sharik.bark())`, 'Рекс 3\nШарик: Гав!'),
          list(
            '`__init__` — **конструктор**: специальный метод, который Python вызывает автоматически при создании объекта `Dog("Рекс", 3)`. В нём задают начальные атрибуты.',
            '`self` — ссылка на **сам объект**, для которого вызван метод. Это первый параметр каждого метода; при вызове его не передают — Python подставляет сам.',
            '`self.name = name` — создаём атрибут `name` у объекта и кладём в него значение параметра.',
          ),
          note('Записи `rex.bark()` и `Dog.bark(rex)` — одно и то же. Поэтому внутри метода `self` и указывает на `rex`.'),
        ],
      },
      {
        id: 'attrs',
        title: 'Атрибуты и методы',
        blocks: [
          p('Атрибуты объекта можно читать и менять через точку. Методы могут изменять атрибуты и возвращать значения.'),
          py(`class Counter:
    def __init__(self):
        self.value = 0

    def increment(self, step=1):
        self.value += step

    def reset(self):
        self.value = 0

c = Counter()
c.increment()
c.increment(5)
print(c.value)
c.reset()
print(c.value)`, '6\n0'),
          p('Каждый объект хранит **свои** атрибуты: два счётчика не мешают друг другу.'),
          py(`a = Counter()
b = Counter()
a.increment(10)
print(a.value, b.value)`, null),
          note('Этот пример продолжает предыдущий: в одном запуске должен быть объявлен класс `Counter`. Скопируй оба куска в один редактор — или просто посмотри на результат: `10 0`.'),
          h('Методы, которые используют другие методы'),
          py(`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def is_bigger_than(self, other):
        return self.area() > other.area()

a = Rectangle(3, 4)
b = Rectangle(2, 5)
print(a.area(), b.area())
print(a.is_bigger_than(b))`, '12 10\nTrue'),
        ],
      },
      {
        id: 'classattr',
        title: 'Атрибуты класса',
        blocks: [
          p('Атрибуты, созданные через `self.` в методах, принадлежат конкретному объекту — это **атрибуты экземпляра**. А атрибуты, объявленные прямо в теле класса, — **атрибуты класса**: они общие для всех объектов.'),
          py(`class Student:
    school = "KIRO"        # атрибут класса — общий
    count = 0

    def __init__(self, name):
        self.name = name   # атрибут экземпляра — свой у каждого
        Student.count += 1

a = Student("Аня")
b = Student("Борис")
print(a.school, b.school)
print(Student.count)`, 'KIRO KIRO\n2'),
          warn('Чтобы изменить атрибут класса, обращайся к нему через имя класса: `Student.count += 1`. Запись `self.count += 1` создаст у объекта собственный атрибут, а общий счётчик не изменится.'),
          tip('Хороший класс отвечает за одну понятную сущность. Если в классе десятки методов про всё подряд, его стоит разделить.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d1t1',
        title: 'Собака',
        text: 'Создай класс `Dog` с атрибутами `name` и `age` (задаются в конструкторе) и методом `bark()`, который возвращает строку `"<имя>: Гав!"`.',
        starter: starter(`
class Dog:
    pass
`),
        examples: [{ call: 'Dog("Рекс", 3).bark()', expected: '"Рекс: Гав!"' }],
        tests: [
          { call: 'Dog("Рекс", 3).bark()', expected: '"Рекс: Гав!"' },
          { call: 'Dog("Шарик", 5).age', expected: '5' },
          { call: 'Dog("Бобик", 1).name', expected: '"Бобик"' },
        ],
      },
      {
        id: 'w3d1t2',
        title: 'Прямоугольник',
        text: 'Создай класс `Rectangle(width, height)` с методами `area()` — площадь, `perimeter()` — периметр и `is_square()` — `True`, если стороны равны.',
        starter: starter(`
class Rectangle:
    pass
`),
        examples: [{ call: 'Rectangle(3, 4).area()', expected: '12' }],
        tests: [
          { call: 'Rectangle(3, 4).area()', expected: '12' },
          { call: 'Rectangle(3, 4).perimeter()', expected: '14' },
          { call: 'Rectangle(3, 4).is_square()', expected: 'False' },
          { call: 'Rectangle(5, 5).is_square()', expected: 'True' },
        ],
      },
      {
        id: 'w3d1t3',
        title: 'Банковский счёт',
        text: 'Создай класс `BankAccount(owner, balance=0)` с методами:\n`deposit(amount)` — пополнить счёт;\n`withdraw(amount)` — снять деньги и вернуть `True`; если денег не хватает — ничего не снимать и вернуть `False`;\n`get_balance()` — вернуть баланс.',
        starter: starter(`
class BankAccount:
    pass
`),
        examples: [{ call: 'BankAccount("Аня", 100).get_balance()', expected: '100' }],
        tests: [
          { call: 'BankAccount("Аня").get_balance()', expected: '0' },
          {
            label: 'Пополнение и снятие',
            code: `acc = BankAccount("Аня", 100)
acc.deposit(50)
__kiro_eq("баланс после deposit(50)", acc.get_balance(), 150)
__kiro_eq("withdraw(30)", acc.withdraw(30), True)
__kiro_eq("баланс после withdraw(30)", acc.get_balance(), 120)`,
          },
          {
            label: 'Снятие больше баланса',
            code: `acc = BankAccount("Борис", 10)
__kiro_eq("withdraw(100)", acc.withdraw(100), False)
__kiro_eq("баланс не изменился", acc.get_balance(), 10)`,
          },
        ],
      },
      {
        id: 'w3d1t4',
        title: 'Счётчик объектов',
        text: 'Создай класс `Ticket(owner)`. У класса должен быть атрибут класса `issued` — сколько билетов создано всего. Каждый новый билет увеличивает его на 1 и получает атрибут `number` — свой порядковый номер (первый билет — номер 1).',
        starter: starter(`
class Ticket:
    issued = 0
`),
        examples: [{ call: 'Ticket("Аня").number', expected: '1' }],
        tests: [
          {
            label: 'Нумерация билетов',
            code: `__kiro_eq("Ticket.issued до создания", Ticket.issued, 0)
a = Ticket("Аня")
b = Ticket("Борис")
c = Ticket("Вика")
__kiro_eq("номер первого билета", a.number, 1)
__kiro_eq("номер третьего билета", c.number, 3)
__kiro_eq("Ticket.issued", Ticket.issued, 3)
__kiro_eq("владелец второго", b.owner, "Борис")`,
          },
        ],
      },
      {
        id: 'w3d1t5',
        title: 'Студент и оценки',
        text: 'Создай класс `Student(name)` с методами `add_grade(grade)` — добавить оценку, и `average()` — средняя оценка, округлённая до 2 знаков (`round`). Если оценок нет, `average()` возвращает `0`. У каждого студента должен быть **свой** список оценок.',
        starter: starter(`
class Student:
    pass
`),
        examples: [{ call: 'Student("Аня").average()', expected: '0' }],
        tests: [
          { call: 'Student("Аня").average()', expected: '0' },
          {
            label: 'Средняя оценка',
            code: `s = Student("Аня")
for g in (5, 4, 4):
    s.add_grade(g)
__kiro_eq("average()", s.average(), 4.33)`,
          },
          {
            label: 'У каждого студента свои оценки',
            code: `a = Student("Аня")
b = Student("Борис")
a.add_grade(5)
__kiro_eq("average() у второго студента", b.average(), 0)`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.2
  {
    id: 'w3d2',
    week: 3,
    day: 2,
    title: 'ООП: наследование, инкапсуляция, __str__, __repr__, @property',
    summary: 'Наследование и super(), переопределение методов, isinstance, инкапсуляция: соглашение _ и __, «магические» методы __str__ и __repr__, свойства @property и сеттеры.',
    sections: [
      {
        id: 'inherit',
        title: 'Наследование',
        blocks: [
          p('**Наследование** позволяет создать новый класс на основе существующего. Дочерний класс получает все атрибуты и методы родителя и может добавить свои или изменить поведение. Так общий код пишется один раз.'),
          py(`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

    def introduce(self):
        return f"Я {self.name}. {self.speak()}"

class Cat(Animal):          # Cat наследует Animal
    def speak(self):        # переопределяем метод
        return "Мяу"

class Dog(Animal):
    def speak(self):
        return "Гав"

for pet in [Cat("Мурка"), Dog("Рекс")]:
    print(pet.introduce())`, 'Я Мурка. Мяу\nЯ Рекс. Гав'),
          p('Метод `introduce` написан один раз в `Animal`, но вызывает `speak()` конкретного объекта. Это **полиморфизм**: один и тот же вызов ведёт себя по-разному в зависимости от класса объекта.'),
          h('super() — вызвать метод родителя'),
          p('Если дочернему классу нужны дополнительные атрибуты, он переопределяет `__init__`, а родительский конструктор вызывает через `super()`:'),
          py(`class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)   # всё, что делает Employee
        self.team_size = team_size

m = Manager("Ольга", 200000, 5)
print(m.name, m.salary, m.team_size)`, 'Ольга 200000 5'),
          h('isinstance'),
          py(`m = Manager("Ольга", 200000, 5)
print(isinstance(m, Manager), isinstance(m, Employee))`, null),
          note('`isinstance(obj, Class)` проверяет, является ли объект экземпляром класса **или его наследника**. Для `m` обе проверки вернут `True`. Пример продолжает предыдущий — запусти их вместе.'),
        ],
      },
      {
        id: 'encapsulation',
        title: 'Инкапсуляция',
        blocks: [
          p('**Инкапсуляция** — идея о том, что объект сам управляет своими данными, а снаружи с ним работают через методы. Это защищает от некорректного состояния: баланс счёта не должен меняться произвольно, только через «пополнить» и «снять».'),
          p('В Python нет настоящих закрытых атрибутов, но есть соглашения:'),
          table(['Запись', 'Смысл'], [
            ['`self.balance`', 'публичный атрибут — можно пользоваться снаружи'],
            ['`self._balance`', '«внутренний»: снаружи технически доступен, но трогать не принято'],
            ['`self.__balance`', 'Python переименовывает его в `_ClassName__balance`, чтобы случайно не перезаписать'],
          ]),
          py(`class Account:
    def __init__(self, balance):
        self.__balance = balance

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Сумма должна быть положительной")
        self.__balance += amount

    def get_balance(self):
        return self.__balance

acc = Account(100)
acc.deposit(50)
print(acc.get_balance())
# print(acc.__balance)  — ошибка AttributeError`, '150'),
        ],
      },
      {
        id: 'dunder',
        title: '__str__ и __repr__',
        blocks: [
          p('Методы с двойными подчёркиваниями (dunder-методы, «магические» методы) Python вызывает сам в определённых ситуациях. `__init__` — при создании объекта. А два других очень полезных:'),
          list(
            '`__str__` — «красивое» представление для людей. Его вызывают `print(obj)` и `str(obj)`.',
            '`__repr__` — «техническое» представление для разработчиков: желательно такое, чтобы по нему можно было воссоздать объект. Его показывает консоль и он используется внутри списков.',
          ),
          py(`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

p = Point(1, 2)
print(p)            # __str__
print(repr(p))      # __repr__
print([p, Point(3, 4)])   # список показывает элементы через __repr__`, '(1, 2)\nPoint(x=1, y=2)\n[Point(x=1, y=2), Point(x=3, y=4)]'),
          p('Без этих методов объект печатается как `<__main__.Point object at 0x...>` — бесполезно для отладки. Если пишешь только один из двух, пиши `__repr__`: `print` использует его, когда `__str__` нет.'),
          tip('Есть и другие магические методы: `__len__` (для `len(obj)`), `__eq__` (для `==`), `__lt__` (для `<` и сортировки), `__add__` (для `+`). С ними свои объекты ведут себя как встроенные типы.'),
        ],
      },
      {
        id: 'property',
        title: '@property — свойства',
        blocks: [
          p('**Свойство** выглядит снаружи как обычный атрибут, но на самом деле при обращении вызывается метод. Это позволяет вычислять значение на лету или проверять присваиваемое значение. Метод помечается **декоратором** `@property` (про декораторы — в следующем уроке).'),
          py(`class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        return round(3.14159 * self.radius ** 2, 2)

c = Circle(2)
print(c.area)        # без скобок — как атрибут
c.radius = 10
print(c.area)        # пересчиталось`, '12.57\n314.16'),
          h('Сеттер — проверка при записи'),
          p('Чтобы свойство можно было присваивать, добавляют сеттер `@имя.setter`. Внутри него удобно проверять значение:'),
          py(`class Temperature:
    def __init__(self, celsius):
        self.celsius = celsius        # здесь сразу сработает сеттер

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, value):
        if value < -273.15:
            raise ValueError("Ниже абсолютного нуля")
        self._celsius = value

    @property
    def fahrenheit(self):
        return self._celsius * 9 / 5 + 32

t = Temperature(25)
print(t.fahrenheit)
t.celsius = 100
print(t.fahrenheit)`, '77.0\n212.0'),
          p('Свойство без сеттера доступно только для чтения: попытка присвоить вызовет ошибку `AttributeError`.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d2t1',
        title: 'Животные',
        text: 'Создай класс `Animal(name)` с методом `speak()`, который возвращает `"..."`, и методом `introduce()`, который возвращает `"Я <имя>. <speak()>"`. Создай наследников `Cat` и `Dog`, которые переопределяют `speak()`: `"Мяу"` и `"Гав"`.',
        starter: starter(`
class Animal:
    pass
`),
        examples: [{ call: 'Cat("Мурка").introduce()', expected: '"Я Мурка. Мяу"' }],
        tests: [
          { call: 'Cat("Мурка").introduce()', expected: '"Я Мурка. Мяу"' },
          { call: 'Dog("Рекс").introduce()', expected: '"Я Рекс. Гав"' },
          { call: 'Animal("Зверь").introduce()', expected: '"Я Зверь. ..."' },
          { call: 'isinstance(Cat("x"), Animal)', expected: 'True' },
        ],
      },
      {
        id: 'w3d2t2',
        title: 'Точка',
        text: 'Создай класс `Point(x, y)`: `str(point)` должен возвращать `"(x, y)"`, а `repr(point)` — `"Point(x=1, y=2)"`.',
        starter: starter(`
class Point:
    pass
`),
        examples: [{ call: 'str(Point(1, 2))', expected: '"(1, 2)"' }],
        tests: [
          { call: 'str(Point(1, 2))', expected: '"(1, 2)"' },
          { call: 'repr(Point(1, 2))', expected: '"Point(x=1, y=2)"' },
          { call: 'str([Point(0, -5)])', expected: '"[Point(x=0, y=-5)]"' },
        ],
      },
      {
        id: 'w3d2t3',
        title: 'Температура',
        text: 'Создай класс `Temperature(celsius)` со свойством `celsius` (с сеттером: при значении ниже `-273.15` вызывается `ValueError`) и свойством только для чтения `fahrenheit` = `celsius * 9 / 5 + 32`.',
        starter: starter(`
class Temperature:
    pass
`),
        examples: [{ call: 'Temperature(25).fahrenheit', expected: '77.0' }],
        tests: [
          { call: 'Temperature(25).fahrenheit', expected: '77.0' },
          {
            label: 'Изменение celsius пересчитывает fahrenheit',
            code: `t = Temperature(0)
t.celsius = 100
__kiro_eq("fahrenheit", t.fahrenheit, 212.0)`,
          },
          {
            label: 'Ниже абсолютного нуля — ValueError',
            code: `t = Temperature(0)
try:
    t.celsius = -300
except ValueError:
    pass
else:
    raise AssertionError("t.celsius = -300 должно вызвать ValueError")`,
          },
          {
            label: 'Конструктор тоже проверяет значение',
            code: `try:
    Temperature(-500)
except ValueError:
    pass
else:
    raise AssertionError("Temperature(-500) должно вызвать ValueError")`,
          },
        ],
      },
      {
        id: 'w3d2t4',
        title: 'Сотрудник и менеджер',
        text: 'Создай класс `Employee(name, salary)` с методом `annual()` — годовой доход (`salary * 12`). Создай наследника `Manager(name, salary, bonus)`, у которого `annual()` возвращает годовой доход сотрудника плюс `bonus`. В `Manager` используй `super()`.',
        starter: starter(`
class Employee:
    pass
`),
        examples: [{ call: 'Employee("Иван", 100).annual()', expected: '1200' }],
        tests: [
          { call: 'Employee("Иван", 100).annual()', expected: '1200' },
          { call: 'Manager("Ольга", 100, 500).annual()', expected: '1700' },
          { call: 'Manager("Ольга", 100, 500).name', expected: '"Ольга"' },
          {
            label: 'В Manager используется super()',
            code: `import inspect as __i
__src = "".join(__i.getsource(f) for f in vars(Manager).values() if __i.isfunction(f))
if "super(" not in __src:
    raise AssertionError("в Manager вызови конструктор или метод родителя через super()")`,
          },
          {
            label: 'Manager — наследник Employee',
            code: `__kiro_eq("issubclass(Manager, Employee)", issubclass(Manager, Employee), True)`,
          },
        ],
      },
      {
        id: 'w3d2t5',
        title: 'Счёт только для чтения',
        text: 'Создай класс `Wallet(balance=0)`. Баланс храни в «закрытом» атрибуте `__balance`. Свойство `balance` (только для чтения) возвращает баланс. Метод `deposit(amount)` пополняет баланс, а при `amount <= 0` вызывает `ValueError`.',
        starter: starter(`
class Wallet:
    pass
`),
        examples: [{ call: 'Wallet(50).balance', expected: '50' }],
        tests: [
          { call: 'Wallet(50).balance', expected: '50' },
          {
            label: 'deposit увеличивает баланс',
            code: `w = Wallet()
w.deposit(30)
w.deposit(20)
__kiro_eq("balance", w.balance, 50)`,
          },
          {
            label: 'deposit(0) вызывает ValueError',
            code: `try:
    Wallet().deposit(0)
except ValueError:
    pass
else:
    raise AssertionError("deposit(0) должен вызвать ValueError")`,
          },
          {
            label: 'balance нельзя присвоить',
            code: `w = Wallet(10)
try:
    w.balance = 1000
except AttributeError:
    pass
else:
    raise AssertionError("присваивание w.balance должно вызывать AttributeError")`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.3
  {
    id: 'w3d3',
    week: 3,
    day: 3,
    title: 'Генераторы, итераторы и декораторы',
    summary: 'Итерируемые объекты и итераторы, iter и next, свой итератор через __iter__ и __next__, генераторы и yield, генераторные выражения, функции как объекты, декораторы и functools.wraps.',
    sections: [
      {
        id: 'iterators',
        title: 'Итераторы',
        blocks: [
          p('Что на самом деле делает `for x in something`? Он просит у объекта **итератор** — штуку, которая умеет выдавать элементы по одному. Объекты, у которых можно получить итератор (строки, списки, словари, `range`), называются **итерируемыми**.'),
          py(`nums = [10, 20, 30]
it = iter(nums)      # получить итератор
print(next(it))      # следующий элемент
print(next(it))
print(next(it))
# next(it) ещё раз — StopIteration: элементы кончились`, '10\n20\n30'),
          p('Цикл `for` делает ровно это: вызывает `iter()`, затем `next()` раз за разом, пока не возникнет `StopIteration`, и тихо завершается.'),
          h('Свой итератор'),
          p('Чтобы объект можно было перебирать в `for`, у класса реализуют два метода: `__iter__` возвращает итератор (часто сам объект), `__next__` возвращает следующий элемент или вызывает `StopIteration`.'),
          py(`class Countdown:
    def __init__(self, start):
        self.current = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.current <= 0:
            raise StopIteration
        value = self.current
        self.current -= 1
        return value

for n in Countdown(3):
    print(n)`, '3\n2\n1'),
        ],
      },
      {
        id: 'generators',
        title: 'Генераторы и yield',
        blocks: [
          p('Писать класс с `__iter__` и `__next__` долго. **Генератор** — это функция, которая вместо `return` использует `yield`. Каждый `yield` отдаёт очередное значение и **ставит функцию на паузу**; при следующем запросе она продолжается с того же места.'),
          py(`def countdown(start):
    while start > 0:
        yield start
        start -= 1

for n in countdown(3):
    print(n)

gen = countdown(2)
print(next(gen), next(gen))`, '3\n2\n1\n2 1'),
          p('Главное преимущество генераторов — **ленивость**: значения вычисляются по одному, только когда нужны. Генератор может выдать миллиард чисел или даже бесконечную последовательность, не занимая память под весь список.'),
          py(`def naturals():
    n = 1
    while True:        # бесконечный генератор
        yield n
        n += 1

for n in naturals():
    if n > 5:
        break
    print(n, end=" ")`, '1 2 3 4 5 '),
          tip('Взять первые N элементов любого итератора удобно функцией `itertools.islice(gen, N)`.'),
          h('Генераторные выражения'),
          p('Если в list comprehension заменить квадратные скобки на круглые, получится **генераторное выражение** — ленивый вариант. Его удобно сразу передавать в функции вроде `sum`, `max`, `any`.'),
          py(`squares = (x * x for x in range(1_000_000))
print(sum(squares))     # не создаёт список из миллиона элементов`, '333332833333500000'),
        ],
      },
      {
        id: 'functions',
        title: 'Функции — тоже объекты',
        blocks: [
          p('Чтобы понять декораторы, нужно знать: в Python функцию можно положить в переменную, передать в другую функцию и вернуть из функции. Функция, объявленная внутри другой, видит её переменные — это называется **замыканием**.'),
          py(`def shout(text):
    return text.upper() + "!"

say = shout              # функция в переменной (без скобок!)
print(say("привет"))

def apply_twice(func, value):
    return func(func(value))

print(apply_twice(lambda x: x * 2, 5))

def make_multiplier(k):
    def multiply(x):
        return x * k     # k «запомнилось» из внешней функции
    return multiply

triple = make_multiplier(3)
print(triple(7))`, 'ПРИВЕТ!\n20\n21'),
        ],
      },
      {
        id: 'decorators',
        title: 'Декораторы',
        blocks: [
          p('**Декоратор** — это функция, которая принимает функцию и возвращает новую функцию с дополнительным поведением. Типичные применения: логирование, замер времени, проверка прав доступа, кэширование.'),
          py(`def log_calls(func):
    def wrapper(*args, **kwargs):
        print(f"Вызов {func.__name__} с {args}")
        result = func(*args, **kwargs)
        print(f"Результат: {result}")
        return result
    return wrapper

@log_calls
def add(a, b):
    return a + b

add(2, 3)`, 'Вызов add с (2, 3)\nРезультат: 5'),
          p('Запись `@log_calls` над функцией — это сокращение для `add = log_calls(add)`. Внутренняя функция `wrapper` принимает `*args, **kwargs`, чтобы подойти к функции с любыми аргументами, вызывает оригинал и добавляет своё поведение до и после.'),
          h('functools.wraps'),
          p('После декорирования у функции «теряются» имя и документация — они становятся от `wrapper`. Чтобы сохранить их, внутреннюю функцию оборачивают декоратором `@functools.wraps(func)`:'),
          py(`import functools

def uppercase(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@uppercase
def greet(name):
    """Приветствие."""
    return f"привет, {name}"

print(greet("аня"))
print(greet.__name__, greet.__doc__)`, 'ПРИВЕТ, АНЯ\ngreet Приветствие.'),
          note('Ты уже встречал встроенные декораторы: `@property` из прошлого урока. Есть и готовые полезные: `@functools.lru_cache` кэширует результаты функции, `@staticmethod` и `@classmethod` меняют поведение методов класса.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d3t1',
        title: 'Обратный отсчёт',
        text: 'Напиши генератор `countdown(n)`, который выдаёт числа от `n` до 1. Используй `yield`.',
        starter: starter(`
def countdown(n):
    pass
`),
        examples: [{ call: 'list(countdown(3))', expected: '[3, 2, 1]' }],
        tests: [
          { call: 'list(countdown(3))', expected: '[3, 2, 1]' },
          { call: 'list(countdown(0))', expected: '[]' },
          {
            label: 'countdown — генератор',
            code: `import inspect as __i
__kiro_eq("это генератор-функция", __i.isgeneratorfunction(countdown), True)`,
          },
        ],
      },
      {
        id: 'w3d3t2',
        title: 'Бесконечный Фибоначчи',
        text: 'Напиши бесконечный генератор `fib()`, который выдаёт числа Фибоначчи: 1, 1, 2, 3, 5, 8, …',
        starter: starter(`
def fib():
    pass
`),
        examples: [{ call: 'list(islice(fib(), 6))', expected: '[1, 1, 2, 3, 5, 8]' }],
        tests: [
          {
            label: 'Первые 10 чисел',
            code: `import itertools
__kiro_eq("первые 10", list(itertools.islice(fib(), 10)), [1, 1, 2, 3, 5, 8, 13, 21, 34, 55])`,
          },
          {
            label: '30-е число',
            code: `g = fib()
for _ in range(29):
    next(g)
__kiro_eq("30-е число", next(g), 832040)`,
          },
        ],
      },
      {
        id: 'w3d3t3',
        title: 'Итератор чётных чисел',
        text: 'Напиши класс-итератор `EvenNumbers(limit)` с методами `__iter__` и `__next__`, который выдаёт чётные числа от 0 до `limit` включительно.',
        starter: starter(`
class EvenNumbers:
    pass
`),
        examples: [{ call: 'list(EvenNumbers(6))', expected: '[0, 2, 4, 6]' }],
        tests: [
          { call: 'list(EvenNumbers(6))', expected: '[0, 2, 4, 6]' },
          { call: 'list(EvenNumbers(7))', expected: '[0, 2, 4, 6]' },
          { call: 'list(EvenNumbers(0))', expected: '[0]' },
          {
            label: 'Есть __next__',
            code: `it = iter(EvenNumbers(4))
__kiro_eq("next()", next(it), 0)
__kiro_eq("next() второй раз", next(it), 2)`,
          },
        ],
      },
      {
        id: 'w3d3t4',
        title: 'Декоратор uppercase',
        text: 'Напиши декоратор `uppercase`, который переводит в верхний регистр строку, возвращаемую функцией. Имя функции после декорирования должно сохраниться (`functools.wraps`).',
        starter: starter(`
import functools

def uppercase(func):
    pass
`),
        examples: [{ call: 'uppercase(lambda: "привет")()', expected: '"ПРИВЕТ"' }],
        tests: [
          { call: 'uppercase(lambda: "привет")()', expected: '"ПРИВЕТ"' },
          {
            label: 'Работает с аргументами и сохраняет имя',
            code: `@uppercase
def greet(name, punct="!"):
    return f"hello, {name}{punct}"
__kiro_eq("greet('anna')", greet("anna"), "HELLO, ANNA!")
__kiro_eq("greet('bob', punct='?')", greet("bob", punct="?"), "HELLO, BOB?")
__kiro_eq("greet.__name__", greet.__name__, "greet")`,
          },
        ],
      },
      {
        id: 'w3d3t5',
        title: 'Счётчик вызовов',
        text: 'Напиши декоратор `count_calls`, который считает, сколько раз вызвали функцию. Количество хранится в атрибуте `calls` у декорированной функции (изначально 0). Функция должна возвращать свой обычный результат.',
        starter: starter(`
def count_calls(func):
    pass
`),
        examples: [{ call: 'count_calls(lambda: 1).calls', expected: '0' }],
        tests: [
          {
            label: 'Подсчёт вызовов',
            code: `@count_calls
def square(x):
    return x * x
__kiro_eq("square.calls до вызовов", square.calls, 0)
__kiro_eq("square(3)", square(3), 9)
square(4)
square(5)
__kiro_eq("square.calls", square.calls, 3)`,
          },
          {
            label: 'У каждой функции свой счётчик',
            code: `@count_calls
def a():
    return "a"
@count_calls
def b():
    return "b"
a(); a(); b()
__kiro_eq("a.calls", a.calls, 2)
__kiro_eq("b.calls", b.calls, 1)`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.4
  {
    id: 'w3d4',
    week: 3,
    day: 4,
    title: 'Файлы, JSON, контекстные менеджеры и datetime',
    summary: 'Открытие файлов и режимы, чтение и запись, кодировка, оператор with, построчное чтение, модуль json, свои контекстные менеджеры, модуль datetime: даты, разница, форматирование и разбор.',
    sections: [
      {
        id: 'files',
        title: 'Чтение и запись файлов',
        blocks: [
          p('Программы хранят данные в файлах: настройки, отчёты, логи. Файл открывают функцией `open(путь, режим, encoding=...)`, которая возвращает объект файла.'),
          table(['Режим', 'Что делает'], [
            ['`"r"`', 'чтение (по умолчанию); если файла нет — ошибка'],
            ['`"w"`', 'запись: создаёт файл или **стирает** существующий'],
            ['`"a"`', 'дозапись в конец файла'],
            ['`"x"`', 'создать новый файл; если уже есть — ошибка'],
            ['`"b"`', 'добавка к режиму для двоичных файлов: `"rb"`, `"wb"`'],
          ]),
          h('Оператор with'),
          p('Открытый файл обязательно нужно закрыть, иначе данные могут не записаться. Надёжный способ — оператор `with`: он сам закроет файл, когда блок закончится, даже если внутри произошла ошибка.'),
          py(`with open("notes.txt", "w", encoding="utf-8") as f:
    f.write("Первая строка\\n")
    f.write("Вторая строка\\n")

with open("notes.txt", "r", encoding="utf-8") as f:
    content = f.read()
print(content)`, 'Первая строка\nВторая строка\n'),
          tip('Всегда указывай `encoding="utf-8"` для текстовых файлов — иначе на разных компьютерах кириллица может прочитаться как набор «кракозябр».'),
          note('На платформе файлы создаются во временной файловой системе браузера и исчезают после перезагрузки страницы. На своём компьютере файл появится рядом с программой.'),
          h('Способы чтения'),
          table(['Метод', 'Что возвращает'], [
            ['`f.read()`', 'весь файл одной строкой'],
            ['`f.readline()`', 'одну следующую строку'],
            ['`f.readlines()`', 'список всех строк (с `\\n` на концах)'],
            ['`for line in f:`', 'перебор по строкам — экономно для больших файлов'],
          ]),
          py(`with open("data.txt", "w", encoding="utf-8") as f:
    f.writelines(["яблоко\\n", "банан\\n", "вишня\\n"])

with open("data.txt", encoding="utf-8") as f:
    for i, line in enumerate(f, start=1):
        print(i, line.strip())`, '1 яблоко\n2 банан\n3 вишня'),
          p('При чтении по строкам у каждой строки остаётся символ перевода строки `\\n` — убирай его через `.strip()` или `.rstrip("\\n")`.'),
        ],
      },
      {
        id: 'json',
        title: 'JSON',
        blocks: [
          p('**JSON** — самый популярный текстовый формат обмена данными: в нём работают веб-API, конфигурации, хранилища. Он очень похож на словари и списки Python. Модуль `json` переводит данные Python в строку JSON и обратно.'),
          table(['Функция', 'Что делает'], [
            ['`json.dumps(obj)`', 'объект Python → строка JSON'],
            ['`json.loads(s)`', 'строка JSON → объект Python'],
            ['`json.dump(obj, f)`', 'записать объект в файл'],
            ['`json.load(f)`', 'прочитать объект из файла'],
          ]),
          py(`import json

user = {"name": "Аня", "age": 20, "skills": ["Python", "SQL"], "active": True}
text = json.dumps(user, ensure_ascii=False, indent=2)
print(text)

data = json.loads('{"x": 1, "y": [1, 2], "ok": false, "none": null}')
print(data["y"], data["ok"], data["none"])`, '{\n  "name": "Аня",\n  "age": 20,\n  "skills": [\n    "Python",\n    "SQL"\n  ],\n  "active": true\n}\n[1, 2] False None'),
          list(
            '`ensure_ascii=False` — сохранять кириллицу как есть, а не в виде `\\u0410`.',
            '`indent=2` — красивые отступы для чтения человеком.',
            'В JSON `true`, `false`, `null` — в Python они становятся `True`, `False`, `None`. Кортежи превращаются в списки, ключи словарей — всегда строки.',
          ),
          py(`import json

settings = {"theme": "dark", "font": 14}
with open("settings.json", "w", encoding="utf-8") as f:
    json.dump(settings, f, ensure_ascii=False)

with open("settings.json", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded["theme"])`, 'dark'),
        ],
      },
      {
        id: 'context',
        title: 'Контекстные менеджеры',
        blocks: [
          p('`with` работает не только с файлами. Любой объект с методами `__enter__` и `__exit__` — **контекстный менеджер**. `__enter__` вызывается при входе в блок (его результат попадает в переменную после `as`), `__exit__` — при выходе, в том числе при ошибке.'),
          py(`class Tag:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"<{self.name}>")
        return self

    def __exit__(self, exc_type, exc, tb):
        print(f"</{self.name}>")

with Tag("div"):
    with Tag("p"):
        print("Текст")`, '<div>\n<p>\nТекст\n</p>\n</div>'),
          p('Короткий способ написать свой менеджер — генератор с декоратором `@contextmanager`: код до `yield` выполняется при входе, после — при выходе.'),
          py(`from contextlib import contextmanager
import time

@contextmanager
def timer(label):
    start = time.perf_counter()
    yield
    print(f"{label}: {time.perf_counter() - start:.3f} с")

with timer("сумма"):
    total = sum(range(1_000_000))`, null),
        ],
      },
      {
        id: 'datetime',
        title: 'Модуль datetime',
        blocks: [
          p('Модуль `datetime` работает с датами и временем. Основные классы: `date` — дата, `datetime` — дата и время, `timedelta` — промежуток времени.'),
          py(`from datetime import date, datetime, timedelta

d = date(2026, 10, 17)
print(d, d.year, d.month, d.day)
print(d.weekday())                  # 0 — понедельник, 6 — воскресенье

deadline = d + timedelta(days=30)   # прибавить 30 дней
print(deadline)

delta = date(2026, 12, 31) - d      # разница дат — это timedelta
print(delta.days)`, '2026-10-17 2026 10 17\n5\n2026-11-16\n75'),
          h('Форматирование и разбор'),
          p('`strftime` превращает дату в строку по шаблону, `strptime` — разбирает строку в дату. Самые нужные коды формата:'),
          table(['Код', 'Значение', 'Пример'], [
            ['`%Y`', 'год', '2026'],
            ['`%m`', 'месяц двумя цифрами', '10'],
            ['`%d`', 'день двумя цифрами', '17'],
            ['`%H:%M`', 'часы и минуты', '14:30'],
          ]),
          py(`from datetime import datetime, date

dt = datetime(2026, 10, 17, 14, 30)
print(dt.strftime("%d.%m.%Y %H:%M"))

parsed = datetime.strptime("25.12.2026", "%d.%m.%Y")
print(parsed.date())
print(date.fromisoformat("2026-01-05"))`, '17.10.2026 14:30\n2026-12-25\n2026-01-05'),
          p('Текущие дата и время: `date.today()` и `datetime.now()`. Их значение меняется каждый день, поэтому в задачах с автопроверкой даты передаются явно.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d4t1',
        title: 'Строки в файл и обратно',
        text: 'Напиши две функции:\n`write_lines(path, lines)` — записывает список строк в файл, каждую с новой строки (кодировка utf-8);\n`read_lines(path)` — возвращает список строк файла без символов перевода строки.',
        starter: starter(`
def write_lines(path, lines):
    pass


def read_lines(path):
    pass
`),
        examples: [],
        tests: [
          {
            label: 'Запись и чтение',
            code: `write_lines("test1.txt", ["яблоко", "банан", "вишня"])
__kiro_eq("read_lines", read_lines("test1.txt"), ["яблоко", "банан", "вишня"])`,
          },
          {
            label: 'Повторная запись перезаписывает файл',
            code: `write_lines("test2.txt", ["1", "2", "3"])
write_lines("test2.txt", ["x"])
__kiro_eq("read_lines", read_lines("test2.txt"), ["x"])`,
          },
        ],
      },
      {
        id: 'w3d4t2',
        title: 'Слова в файле',
        text: 'Напиши функцию `count_words(path)`, которая возвращает количество слов в текстовом файле (слова разделены пробелами и переводами строк). Если файла нет, функция возвращает `0`.',
        starter: starter(`
def count_words(path):
    pass
`),
        examples: [{ call: 'count_words("нет_такого.txt")', expected: '0' }],
        tests: [
          {
            label: 'Подсчёт слов',
            code: `with open("text.txt", "w", encoding="utf-8") as f:
    f.write("Мама мыла раму\\nи пела песню\\n\\nконец")
__kiro_eq("count_words", count_words("text.txt"), 7)`,
          },
          { call: 'count_words("нет_такого_файла.txt")', expected: '0' },
        ],
      },
      {
        id: 'w3d4t3',
        title: 'Сохранение в JSON',
        text: 'Напиши функции `save_json(path, data)` — сохраняет данные в файл в формате JSON с кириллицей «как есть» (`ensure_ascii=False`), и `load_json(path)` — читает и возвращает данные.',
        starter: starter(`
import json

def save_json(path, data):
    pass


def load_json(path):
    pass
`),
        examples: [],
        tests: [
          {
            label: 'Сохранить и загрузить',
            code: `data = {"name": "Аня", "skills": ["Python", "SQL"], "age": 20}
save_json("user.json", data)
__kiro_eq("load_json", load_json("user.json"), data)`,
          },
          {
            label: 'Кириллица хранится как есть',
            code: `save_json("ru.json", {"город": "Москва"})
with open("ru.json", encoding="utf-8") as f:
    raw = f.read()
if "Москва" not in raw:
    raise AssertionError("в файле кириллица должна храниться как есть: укажи ensure_ascii=False")`,
          },
        ],
      },
      {
        id: 'w3d4t4',
        title: 'Дней между датами',
        text: 'Напиши функцию `days_between(d1, d2)`, которая принимает две даты строками в формате `ГГГГ-ММ-ДД` и возвращает количество дней между ними (всегда неотрицательное).',
        starter: starter(`
from datetime import date

def days_between(d1, d2):
    pass
`),
        examples: [{ call: 'days_between("2026-10-17", "2026-12-31")', expected: '75' }],
        tests: [
          { call: 'days_between("2026-10-17", "2026-12-31")', expected: '75' },
          { call: 'days_between("2026-12-31", "2026-10-17")', expected: '75' },
          { call: 'days_between("2024-02-28", "2024-03-01")', expected: '2' },
          { call: 'days_between("2026-01-01", "2026-01-01")', expected: '0' },
        ],
      },
      {
        id: 'w3d4t5',
        title: 'Контекстный менеджер Tag',
        text: 'Напиши класс-контекстный менеджер `Tag(name)`: при входе в блок `with` он печатает `<name>`, при выходе — `</name>`.',
        starter: starter(`
class Tag:
    pass
`),
        examples: [],
        tests: [
          {
            label: 'Вложенные теги',
            code: `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    with Tag("div"):
        with Tag("p"):
            print("Текст")
__kiro_eq("вывод", buf.getvalue().split(), ["<div>", "<p>", "Текст", "</p>", "</div>"])`,
          },
          {
            label: 'Закрывающий тег печатается и при ошибке',
            code: `import io, contextlib
buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    try:
        with Tag("a"):
            raise ValueError("сбой")
    except ValueError:
        pass
__kiro_eq("вывод", buf.getvalue().split(), ["<a>", "</a>"])`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.5
  {
    id: 'w3d5',
    week: 3,
    day: 5,
    title: 'Модули и пакеты, pip и venv, стандартная библиотека, аннотации типов',
    summary: 'Что такое модуль и пакет, способы import, свой модуль и if __name__ == "__main__", pip, виртуальные окружения venv, requirements.txt, модули os, sys, random, math, аннотации типов.',
    sections: [
      {
        id: 'modules',
        title: 'Модули и import',
        blocks: [
          p('**Модуль** — это просто файл `.py`. Всё, что в нём объявлено (функции, классы, переменные), можно использовать в другом файле через `import`. **Пакет** — папка с модулями. Так большая программа делится на части, а готовый код переиспользуется.'),
          table(['Запись', 'Как обращаться'], [
            ['`import math`', '`math.sqrt(16)`'],
            ['`import math as m`', '`m.sqrt(16)` — псевдоним'],
            ['`from math import sqrt, pi`', '`sqrt(16)`, `pi` — без имени модуля'],
            ['`from math import *`', 'импортировать всё — так делать не надо: непонятно, откуда что взялось'],
          ]),
          py(`import math
from random import randint as rnd

print(math.sqrt(16), math.pi)
print(1 <= rnd(1, 6) <= 6)`, '4.0 3.141592653589793\nTrue'),
          h('Свой модуль'),
          p('Создадим модуль в файле и импортируем его. Обычно для этого просто создают файл рядом с программой — здесь сделаем это кодом:'),
          py(`with open("geometry.py", "w", encoding="utf-8") as f:
    f.write("PI = 3.14159\\n\\ndef circle_area(r):\\n    return PI * r ** 2\\n")

import geometry
print(geometry.circle_area(2))`, '12.56636'),
          h('if __name__ == "__main__"'),
          p('Когда файл запускают напрямую, переменная `__name__` в нём равна `"__main__"`. Когда файл импортируют, `__name__` равна имени модуля. Поэтому код, который должен выполняться только при прямом запуске (например, демонстрация или тесты), прячут в условие:'),
          py(`def main():
    print("Запущено как программа")

if __name__ == "__main__":
    main()`, 'Запущено как программа'),
        ],
      },
      {
        id: 'pip',
        title: 'pip, venv и requirements.txt',
        blocks: [
          p('Помимо стандартной библиотеки, существуют сотни тысяч сторонних пакетов: `requests` для HTTP-запросов, `pandas` для данных, `fastapi` для веб-сервисов. Их устанавливают менеджером пакетов **pip** из каталога PyPI.'),
          shell(`pip install requests          # установить
pip install requests==2.32.3  # конкретную версию
pip list                      # что установлено
pip uninstall requests        # удалить`, 'Терминал'),
          h('Виртуальные окружения'),
          p('Разным проектам нужны разные версии пакетов. Если ставить всё в один общий Python, проекты начнут конфликтовать. **Виртуальное окружение** (venv) — изолированная копия Python для конкретного проекта со своими пакетами.'),
          steps(
            'Создать окружение в папке проекта: `python -m venv .venv`.',
            'Активировать: на macOS/Linux — `source .venv/bin/activate`, на Windows — `.venv\\Scripts\\activate`. В начале строки терминала появится `(.venv)`.',
            'Теперь `pip install` ставит пакеты только в это окружение.',
            'Выйти из окружения — `deactivate`.',
          ),
          h('requirements.txt'),
          p('Список зависимостей проекта хранят в файле `requirements.txt`, чтобы любой мог установить точно такие же версии:'),
          shell(`pip freeze > requirements.txt     # сохранить список установленных пакетов
pip install -r requirements.txt   # установить всё по списку`, 'Терминал'),
          shell(`# requirements.txt
requests==2.32.3
pandas==2.2.3
python-dotenv`, 'requirements.txt'),
          tip('Папку `.venv` не кладут в git — она большая и у каждого своя. В репозиторий кладут `requirements.txt`.'),
          note('На платформе нет терминала, поэтому pip и venv здесь не запустить — эти команды выполняй на своём компьютере. Стандартная библиотека в браузере доступна целиком.'),
        ],
      },
      {
        id: 'stdlib',
        title: 'Стандартная библиотека: os, sys, random, math',
        blocks: [
          p('Python поставляется «с батарейками» — большой стандартной библиотекой. Несколько модулей, которые нужны постоянно:'),
          h('math — математика'),
          py(`import math
print(math.sqrt(2), math.pi)
print(math.ceil(2.1), math.floor(2.9))   # округление вверх и вниз
print(math.hypot(3, 4))                   # гипотенуза
print(math.factorial(5), math.gcd(12, 18))`, '1.4142135623730951 3.141592653589793\n3 2\n5.0\n120 6'),
          h('random — случайные числа'),
          py(`import random
random.seed(42)          # фиксируем «зерно» — последовательность станет повторяемой
print(random.randint(1, 6))
print(random.choice(["камень", "ножницы", "бумага"]))
nums = [1, 2, 3, 4, 5]
random.shuffle(nums)
print(nums)
print(random.random())   # дробное от 0 до 1`, null),
          p('С одинаковым `seed` генератор выдаёт одну и ту же последовательность — это нужно для тестов и воспроизводимых экспериментов. Отдельный генератор со своим зерном создаётся так: `rng = random.Random(42)`, дальше `rng.randint(1, 6)`.'),
          h('os — операционная система и пути'),
          py(`import os
print(os.getcwd())                         # текущая папка
print(os.path.join("data", "2026", "report.csv"))
print(os.path.splitext("photo.jpg"))       # имя и расширение
print(os.path.exists("нет_такого.txt"))
print(os.listdir(".")[:3])                 # файлы в папке`, null),
          h('sys — интерпретатор'),
          py(`import sys
print(sys.version.split()[0])   # версия Python
print(sys.argv)                 # аргументы командной строки`, null),
          p('`sys.argv` — список аргументов, с которыми запустили программу: `python script.py input.txt` даст `["script.py", "input.txt"]`.'),
        ],
      },
      {
        id: 'typing',
        title: 'Аннотации типов',
        blocks: [
          p('В Python можно указать, каких типов ожидаются параметры и что функция возвращает. Это **аннотации типов** (type hints). Python их **не проверяет** при выполнении, но они делают код понятнее, а редактор кода и инструменты вроде `mypy` подсказывают ошибки ещё до запуска.'),
          py(`def greet(name: str, times: int = 1) -> str:
    return ", ".join([f"Привет, {name}"] * times)

def average(nums: list[float]) -> float:
    return sum(nums) / len(nums)

def find_user(users: dict[str, int], name: str) -> int | None:
    return users.get(name)

print(greet("Аня", 2))
print(average([4, 5]))
print(greet.__annotations__)`, "Привет, Аня, Привет, Аня\n4.5\n{'name': <class 'str'>, 'times': <class 'int'>, 'return': <class 'str'>}"),
          list(
            'параметр: `имя: тип`, возвращаемое значение: `-> тип`;',
            'коллекции: `list[int]`, `dict[str, float]`, `tuple[int, int]`, `set[str]`;',
            '`int | None` — «число или ничего» (в старом коде — `Optional[int]` из модуля `typing`);',
            'переменные тоже можно аннотировать: `count: int = 0`.',
          ),
          tip('Аннотации — стандарт в современных проектах и на собеседованиях. Привыкай писать их хотя бы для параметров и результатов функций.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d5t1',
        title: 'Площадь круга',
        text: 'Напиши функцию `circle_area(r: float) -> float`, которая возвращает площадь круга радиуса `r`, округлённую до 2 знаков. Используй `math.pi`.',
        starter: starter(`
import math

def circle_area(r: float) -> float:
    pass
`),
        examples: [{ call: 'circle_area(2)', expected: '12.57' }],
        tests: [
          { call: 'circle_area(2)', expected: '12.57' },
          { call: 'circle_area(0)', expected: '0.0' },
          { call: 'circle_area(10)', expected: '314.16' },
        ],
      },
      {
        id: 'w3d5t2',
        title: 'Гипотенуза',
        text: 'Напиши функцию `hypotenuse(a, b)`, которая возвращает длину гипотенузы прямоугольного треугольника с катетами `a` и `b`, округлённую до 3 знаков. Используй модуль `math`.',
        starter: starter(`
import math

def hypotenuse(a, b):
    pass
`),
        examples: [{ call: 'hypotenuse(3, 4)', expected: '5.0' }],
        tests: [
          { call: 'hypotenuse(3, 4)', expected: '5.0' },
          { call: 'hypotenuse(1, 1)', expected: '1.414' },
          { call: 'hypotenuse(5, 12)', expected: '13.0' },
        ],
      },
      {
        id: 'w3d5t3',
        title: 'Бросок кубиков',
        text: 'Напиши функцию `roll_dice(n, seed)`, которая возвращает список из `n` бросков игрального кубика (числа от 1 до 6). Используй отдельный генератор `random.Random(seed)` и его метод `randint` — так результат будет воспроизводимым.',
        starter: starter(`
import random

def roll_dice(n, seed):
    pass
`),
        examples: [{ call: 'len(roll_dice(5, 1))', expected: '5' }],
        tests: [
          {
            label: 'Результат совпадает с random.Random(seed)',
            code: `import random as __r
__g = __r.Random(42)
__kiro_eq("roll_dice(10, 42)", roll_dice(10, 42), [__g.randint(1, 6) for _ in range(10)])`,
          },
          {
            label: 'Одинаковый seed — одинаковые броски',
            code: `__kiro_eq("повтор с тем же seed", roll_dice(20, 7), roll_dice(20, 7))
if not all(1 <= x <= 6 for x in roll_dice(100, 3)):
    raise AssertionError("значения должны быть от 1 до 6")`,
          },
        ],
      },
      {
        id: 'w3d5t4',
        title: 'Пути к файлам',
        text: 'Напиши две функции с помощью модуля `os.path`:\n`build_path(*parts)` — собирает путь из частей (`os.path.join`);\n`file_ext(filename)` — возвращает расширение файла без точки, в нижнем регистре; если расширения нет — пустую строку.',
        starter: starter(`
import os

def build_path(*parts):
    pass


def file_ext(filename):
    pass
`),
        examples: [{ call: 'file_ext("Photo.JPG")', expected: '"jpg"' }],
        tests: [
          { call: 'build_path("data", "2026", "report.csv")', expected: 'os.path.join("data", "2026", "report.csv")' },
          { call: 'file_ext("Photo.JPG")', expected: '"jpg"' },
          { call: 'file_ext("archive.tar.gz")', expected: '"gz"' },
          { call: 'file_ext("README")', expected: '""' },
        ],
      },
      {
        id: 'w3d5t5',
        title: 'Разбор requirements.txt',
        text: 'Напиши функцию `parse_requirements(text: str) -> dict[str, str | None]` с аннотациями типов. Она получает содержимое `requirements.txt` и возвращает словарь «пакет → версия». Строки вида `name==1.2.3` дают версию, строки без `==` — `None`. Пустые строки и комментарии (начинаются с `#`) пропускаются, пробелы по краям убираются.',
        starter: starter(`
def parse_requirements(text):
    pass
`),
        examples: [{ call: 'parse_requirements("requests==2.32.3\\nflask")', expected: '{"requests": "2.32.3", "flask": None}' }],
        tests: [
          { call: 'parse_requirements("requests==2.32.3\\nflask")', expected: '{"requests": "2.32.3", "flask": None}' },
          { call: 'parse_requirements("# зависимости\\n\\n  pandas==2.2.3  \\n")', expected: '{"pandas": "2.2.3"}' },
          { call: 'parse_requirements("")', expected: '{}' },
          {
            label: 'Есть аннотации типов',
            code: `ann = parse_requirements.__annotations__
if "text" not in ann or "return" not in ann:
    raise AssertionError("добавь аннотации: параметр text и возвращаемое значение")`,
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.6
  {
    id: 'w3d6',
    week: 3,
    day: 6,
    title: 'Асинхронность: async/await и asyncio',
    summary: 'Синхронный и асинхронный код, когда асинхронность помогает, корутины async def и await, цикл событий, asyncio.run, asyncio.sleep, gather, create_task, wait_for и таймауты, очередь asyncio.Queue.',
    sections: [
      {
        id: 'why',
        title: 'Зачем нужна асинхронность',
        blocks: [
          p('Большую часть времени многие программы не считают, а **ждут**: ответа от сервера, данных из базы, чтения файла. Обычный (синхронный) код ждёт каждую операцию по очереди. Если нужно скачать 10 страниц по секунде каждая — уйдёт 10 секунд, хотя компьютер всё это время почти ничего не делал.'),
          p('**Асинхронный** код позволяет, пока одна операция ждёт, переключиться на другую. 10 запросов отправляются почти одновременно и все вместе ждут ответа — получается около одной секунды вместо десяти.'),
          note('Аналогия: повар ставит воду на плиту и, пока она закипает, режет овощи, а не стоит и смотрит на кастрюлю. Повар один (один поток выполнения), но он не простаивает.'),
          table(['Задача', 'Помогает ли async'], [
            ['много сетевых запросов, работа с БД, веб-серверы, боты', 'да — время уходит на ожидание'],
            ['тяжёлые вычисления (обработка изображений, математика)', 'нет — процессор и так занят; нужны процессы (multiprocessing)'],
          ]),
        ],
      },
      {
        id: 'coroutines',
        title: 'async def и await',
        blocks: [
          p('Асинхронная функция объявляется через `async def` и называется **корутиной**. Внутри неё можно «ждать» другие асинхронные операции через `await`. В момент `await` корутина уступает управление, и выполняются другие задачи.'),
          py(`import asyncio

async def make_tea():
    print("Ставлю чайник")
    await asyncio.sleep(1)      # ждём, не блокируя программу
    print("Чай готов")
    return "чай"

result = asyncio.run(make_tea())
print(result)`, 'Ставлю чайник\nЧай готов\nчай'),
          list(
            'Вызов `make_tea()` не выполняет функцию, а создаёт объект-корутину. Чтобы она выполнилась, её нужно «ждать» через `await` или запустить через `asyncio.run`.',
            '`asyncio.run(корутина)` — точка входа: создаёт **цикл событий** (event loop), выполняет корутину и закрывает цикл. Обычно в программе один такой вызов — для главной функции `main()`.',
            '`await` можно писать только внутри `async def`.',
            '`asyncio.sleep(1)` — асинхронная пауза. Обычный `time.sleep(1)` внутри корутины **заблокирует** весь цикл событий — так делать нельзя.',
          ),
          h('Цикл событий'),
          p('**Цикл событий** — диспетчер, который держит список задач. Он запускает задачу до ближайшего `await`, ставит её на ожидание и переходит к следующей готовой задаче. Когда ожидание закончилось (пришёл ответ, истёк таймер), задача снова попадает в очередь на выполнение.'),
        ],
      },
      {
        id: 'gather',
        title: 'Несколько задач одновременно: gather и create_task',
        blocks: [
          p('Сила асинхронности раскрывается, когда задач несколько. `asyncio.gather` запускает корутины **конкурентно** и ждёт, пока все закончатся. Результаты возвращаются списком в том же порядке, в каком передали корутины.'),
          py(`import asyncio
import time

async def download(name, seconds):
    await asyncio.sleep(seconds)   # имитация сетевого запроса
    return f"{name}: {seconds} с"

async def main():
    start = time.perf_counter()
    results = await asyncio.gather(
        download("страница 1", 1),
        download("страница 2", 1),
        download("страница 3", 1),
    )
    print(results)
    print(f"Всего: {time.perf_counter() - start:.1f} с")

asyncio.run(main())`, "['страница 1: 1 с', 'страница 2: 1 с', 'страница 3: 1 с']\nВсего: 1.0 с"),
          p('Три «запроса» по секунде выполнились примерно за одну секунду, а не за три.'),
          h('create_task'),
          p('`asyncio.create_task(корутина)` запускает корутину в фоне сразу и возвращает задачу. Её результат можно дождаться позже через `await task`. Это удобно, когда нужно начать задачу, сделать что-то ещё и только потом забрать результат.'),
          py(`import asyncio

async def slow_square(x):
    await asyncio.sleep(0.5)
    return x * x

async def main():
    task = asyncio.create_task(slow_square(7))   # уже выполняется
    print("Пока считается, делаем другое")
    result = await task
    print("Результат:", result)

asyncio.run(main())`, 'Пока считается, делаем другое\nРезультат: 49'),
        ],
      },
      {
        id: 'timeouts',
        title: 'Таймауты и очереди',
        blocks: [
          h('wait_for — ограничить время ожидания'),
          p('Сетевой запрос может зависнуть. `asyncio.wait_for(корутина, timeout)` ждёт не дольше `timeout` секунд, а иначе отменяет корутину и вызывает `TimeoutError`.'),
          py(`import asyncio

async def slow():
    await asyncio.sleep(5)
    return "готово"

async def main():
    try:
        result = await asyncio.wait_for(slow(), timeout=0.5)
    except TimeoutError:
        result = "слишком долго"
    print(result)

asyncio.run(main())`, 'слишком долго'),
          h('asyncio.Queue — производитель и потребитель'),
          p('Очередь передаёт данные между задачами: одни кладут элементы (`put`), другие забирают (`get`). Это основа многих асинхронных программ: веб-краулеров, обработчиков сообщений.'),
          py(`import asyncio

async def producer(queue):
    for i in range(1, 4):
        await queue.put(i)
    await queue.put(None)          # сигнал «больше ничего не будет»

async def consumer(queue):
    while True:
        item = await queue.get()
        if item is None:
            break
        print("обработан", item)

async def main():
    queue = asyncio.Queue()
    await asyncio.gather(producer(queue), consumer(queue))

asyncio.run(main())`, 'обработан 1\nобработан 2\nобработан 3'),
          note('На платформе код выполняется в браузере, и `asyncio.run` здесь работает. В обычных Jupyter-ноутбуках цикл событий уже запущен, поэтому там вместо `asyncio.run(main())` пишут просто `await main()`.'),
          tip('Для настоящих асинхронных HTTP-запросов используют библиотеки `aiohttp` или `httpx` — их ставят через pip. Принципы те же: `async def`, `await`, `gather`.'),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d6t1',
        title: 'Асинхронное приветствие',
        text: 'Напиши корутину `greet(name)`, которая ждёт `asyncio.sleep(0.1)` и возвращает строку `"Привет, <name>"`.',
        starter: starter(`
import asyncio

async def greet(name):
    pass
`),
        examples: [{ call: 'await greet("Аня")', expected: '"Привет, Аня"' }],
        tests: [
          { call: 'await greet("Аня")', expected: '"Привет, Аня"' },
          {
            label: 'greet — корутина',
            code: `import inspect as __i
__kiro_eq("async def", __i.iscoroutinefunction(greet), True)`,
          },
        ],
      },
      {
        id: 'w3d6t2',
        title: 'Скачать всё сразу',
        text: 'Дана корутина `fake_fetch(url)`, которая «скачивает» страницу. Напиши корутину `fetch_all(urls)`, которая запускает `fake_fetch` для всех адресов **одновременно** через `asyncio.gather` и возвращает список результатов в том же порядке.',
        starter: starter(`
import asyncio

async def fake_fetch(url):
    await asyncio.sleep(0.3)
    return len(url)


async def fetch_all(urls):
    pass
`),
        examples: [{ call: 'await fetch_all(["a.ru", "kiro.ru"])', expected: '[4, 7]' }],
        tests: [
          { call: 'await fetch_all(["a.ru", "kiro.ru"])', expected: '[4, 7]' },
          { call: 'await fetch_all([])', expected: '[]' },
          {
            label: 'Запросы выполняются одновременно',
            code: `import time as __t
__s = __t.perf_counter()
await fetch_all(["a"] * 5)
__d = __t.perf_counter() - __s
if __d > 0.9:
    raise AssertionError(f"5 запросов заняли {__d:.1f} с — похоже, они выполняются по очереди. Используй asyncio.gather")`,
          },
        ],
      },
      {
        id: 'w3d6t3',
        title: 'Таймаут',
        text: 'Напиши корутину `run_with_timeout(coro, timeout)`, которая возвращает результат корутины `coro`, если она успела за `timeout` секунд, и строку `"timeout"`, если не успела. Используй `asyncio.wait_for`.',
        starter: starter(`
import asyncio

async def run_with_timeout(coro, timeout):
    pass
`),
        examples: [{ call: 'await run_with_timeout(asyncio.sleep(0.1, result=5), 1)', expected: '5' }],
        tests: [
          { call: 'await run_with_timeout(asyncio.sleep(0.1, result=5), 1)', expected: '5' },
          { call: 'await run_with_timeout(asyncio.sleep(2, result=5), 0.2)', expected: '"timeout"' },
        ],
      },
      {
        id: 'w3d6t4',
        title: 'Обработка через очередь',
        text: 'Напиши корутину `process(items)`. Она создаёт `asyncio.Queue`, кладёт в неё все элементы `items`, а задача-обработчик забирает их по одному и складывает удвоенные значения в список. Верни список результатов в исходном порядке.',
        starter: starter(`
import asyncio

async def process(items):
    pass
`),
        examples: [{ call: 'await process([1, 2, 3])', expected: '[2, 4, 6]' }],
        tests: [
          { call: 'await process([1, 2, 3])', expected: '[2, 4, 6]' },
          { call: 'await process([])', expected: '[]' },
          { call: 'await process(["a", "b"])', expected: '["aa", "bb"]' },
          {
            label: 'В решении есть очередь',
            code: `import inspect as __i
if "Queue" not in __i.getsource(process):
    raise AssertionError("в этой задаче нужно использовать asyncio.Queue")`,
          },
        ],
      },
      {
        id: 'w3d6t5',
        title: 'Параллельное ожидание',
        text: 'Напиши корутину `wait_all(delays)`, которая для каждой задержки из списка ждёт `asyncio.sleep(delay)` **одновременно со всеми остальными** и возвращает общее время выполнения в секундах, округлённое до 1 знака (`time.perf_counter`). Для `[0.3, 0.5, 0.2]` должно получиться около `0.5`, а не `1.0`.',
        starter: starter(`
import asyncio
import time

async def wait_all(delays):
    pass
`),
        examples: [{ call: 'await wait_all([0.3, 0.5, 0.2])', expected: '0.5' }],
        tests: [
          { call: 'await wait_all([0.3, 0.5, 0.2])', expected: '0.5' },
          { call: 'await wait_all([0.2, 0.2, 0.2, 0.2])', expected: '0.2' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════ 3.7
  {
    id: 'w3d7',
    week: 3,
    day: 7,
    title: 'Шпаргалка недели 3 и комплексные задачи',
    summary: 'Вся теория недели в сжатом виде: ООП, генераторы, итераторы, декораторы, файлы и JSON, контекстные менеджеры, datetime, модули и окружения, аннотации, асинхронность — и пять задач на все темы сразу.',
    sections: [
      {
        id: 'oop',
        title: 'ООП',
        blocks: [
          py(`class Animal:
    kind = "животное"                 # атрибут класса

    def __init__(self, name: str):
        self.name = name              # атрибут экземпляра
        self._age = 0                 # «внутренний» атрибут

    @property
    def age(self) -> int:             # свойство: читается как атрибут
        return self._age

    def speak(self) -> str:
        return "..."

    def __repr__(self) -> str:
        return f"{type(self).__name__}({self.name!r})"

class Cat(Animal):                    # наследование
    def __init__(self, name: str, indoor: bool = True):
        super().__init__(name)        # конструктор родителя
        self.indoor = indoor

    def speak(self) -> str:           # переопределение
        return "Мяу"

print([Cat("Мурка"), Animal("Зверь")])
print(Cat("Мурка").speak(), isinstance(Cat("x"), Animal))`, "[Cat('Мурка'), Animal('Зверь')]\nМяу True"),
          table(['Магический метод', 'Когда вызывается'], [
            ['`__init__`', 'создание объекта'],
            ['`__str__` / `__repr__`', '`print(obj)` / `repr(obj)`, вывод в списках'],
            ['`__len__`, `__eq__`, `__lt__`', '`len(obj)`, `==`, `<` и сортировка'],
            ['`__iter__`, `__next__`', 'перебор в `for`'],
            ['`__enter__`, `__exit__`', 'блок `with`'],
          ]),
        ],
      },
      {
        id: 'functional',
        title: 'Генераторы и декораторы',
        blocks: [
          py(`import functools

def evens(limit):                 # генератор: yield вместо return
    for n in range(0, limit + 1, 2):
        yield n

def logged(func):                 # декоратор
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        result = func(*args, **kwargs)
        print(f"{func.__name__}{args} = {result}")
        return result
    return wrapper

@logged
def total(*nums):
    return sum(nums)

total(*evens(6))
print(sum(x * x for x in range(4)))   # генераторное выражение`, 'total(0, 2, 4, 6) = 12\n14'),
        ],
      },
      {
        id: 'io',
        title: 'Файлы, JSON, datetime',
        blocks: [
          py(`import json
from datetime import date, timedelta

with open("note.txt", "w", encoding="utf-8") as f:   # w — перезапись, a — дозапись
    f.write("строка 1\\nстрока 2\\n")
with open("note.txt", encoding="utf-8") as f:
    lines = [line.strip() for line in f]
print(lines)

text = json.dumps({"город": "Казань"}, ensure_ascii=False)
print(text, json.loads(text)["город"])

d = date.fromisoformat("2026-10-17")
print(d + timedelta(days=14), (date(2026, 12, 31) - d).days, d.strftime("%d.%m.%Y"))`, "['строка 1', 'строка 2']\n{\"город\": \"Казань\"} Казань\n2026-10-31 75 17.10.2026"),
        ],
      },
      {
        id: 'modules',
        title: 'Модули и окружение',
        blocks: [
          table(['Что', 'Как'], [
            ['импорт', '`import math`, `from os import path`, `import numpy as np`'],
            ['прямой запуск файла', '`if __name__ == "__main__":`'],
            ['виртуальное окружение', '`python -m venv .venv` → `source .venv/bin/activate`'],
            ['пакеты', '`pip install x`, `pip freeze > requirements.txt`, `pip install -r requirements.txt`'],
            ['полезные модули', '`math`, `random` (`seed`, `Random`), `os.path`, `sys.argv`, `datetime`, `json`'],
            ['аннотации', '`def f(x: int, names: list[str]) -> dict[str, int] | None:`'],
          ]),
        ],
      },
      {
        id: 'async',
        title: 'Асинхронность',
        blocks: [
          py(`import asyncio

async def job(name, delay):
    await asyncio.sleep(delay)          # не time.sleep!
    return name

async def main():
    results = await asyncio.gather(job("a", 0.2), job("b", 0.1))   # одновременно
    print(results)
    try:
        await asyncio.wait_for(job("c", 2), timeout=0.1)
    except TimeoutError:
        print("таймаут")

asyncio.run(main())`, "['a', 'b']\nтаймаут"),
          list(
            'async помогает, когда программа ждёт (сеть, БД), и не помогает для тяжёлых вычислений.',
            '`asyncio.create_task` — запустить в фоне; `asyncio.Queue` — передавать данные между задачами; `asyncio.Semaphore` — ограничить число одновременных задач.',
          ),
        ],
      },
    ],
    tasks: [
      {
        id: 'w3d7t1',
        title: 'Библиотека',
        text: 'Создай класс `Book(title, author, year)` с `__repr__` вида `Book(\'Мастер и Маргарита\', 1967)` и класс `Library` с методами:\n`add(book)` — добавить книгу;\n`find_by_author(author)` — список названий книг автора в порядке добавления;\n`oldest()` — самая старая книга (объект `Book`) или `None`, если книг нет.\n`len(library)` должен возвращать количество книг.',
        starter: starter(`
class Book:
    pass


class Library:
    pass
`),
        examples: [{ call: 'repr(Book("Мастер и Маргарита", "Булгаков", 1967))', expected: '"Book(\'Мастер и Маргарита\', 1967)"' }],
        tests: [
          { call: 'repr(Book("Мастер и Маргарита", "Булгаков", 1967))', expected: '"Book(\'Мастер и Маргарита\', 1967)"' },
          { call: 'Library().oldest()', expected: 'None' },
          {
            label: 'Работа библиотеки',
            code: `lib = Library()
lib.add(Book("Мастер и Маргарита", "Булгаков", 1967))
lib.add(Book("Собачье сердце", "Булгаков", 1925))
lib.add(Book("Мы", "Замятин", 1924))
__kiro_eq("len(lib)", len(lib), 3)
__kiro_eq("find_by_author('Булгаков')", lib.find_by_author("Булгаков"), ["Мастер и Маргарита", "Собачье сердце"])
__kiro_eq("find_by_author('Пушкин')", lib.find_by_author("Пушкин"), [])
__kiro_eq("oldest().title", lib.oldest().title, "Мы")`,
          },
        ],
      },
      {
        id: 'w3d7t2',
        title: 'Поток чисел',
        text: 'Напиши генератор `parse_numbers(lines)`, который перебирает строки и выдаёт из них целые числа, пропуская строки, которые нельзя превратить в число (пробелы по краям допустимы). И генератор `running_average(numbers)`, который выдаёт среднее всех чисел, полученных к текущему моменту, округлённое до 2 знаков.',
        starter: starter(`
def parse_numbers(lines):
    pass


def running_average(numbers):
    pass
`),
        examples: [{ call: 'list(parse_numbers(["1", "x", " 3 "]))', expected: '[1, 3]' }],
        tests: [
          { call: 'list(parse_numbers(["1", "x", " 3 ", "4.5", "-2"]))', expected: '[1, 3, -2]' },
          { call: 'list(running_average([2, 4, 9]))', expected: '[2.0, 3.0, 5.0]' },
          { call: 'list(running_average(parse_numbers(["10", "ошибка", "20"])))', expected: '[10.0, 15.0]' },
          {
            label: 'Это генераторы',
            code: `import inspect as __i
__kiro_eq("parse_numbers — генератор", __i.isgeneratorfunction(parse_numbers), True)
__kiro_eq("running_average — генератор", __i.isgeneratorfunction(running_average), True)`,
          },
        ],
      },
      {
        id: 'w3d7t3',
        title: 'Декоратор с повторами',
        text: 'Напиши декоратор с параметром `retry(times)`: декорированная функция при исключении вызывается повторно, всего не более `times` раз. Если все попытки неудачные — пробрасывается исключение последней попытки. Если попытка удалась — возвращается результат.',
        starter: starter(`
import functools

def retry(times):
    pass
`),
        examples: [{ call: 'retry(3)(lambda: 5)()', expected: '5' }],
        tests: [
          { call: 'retry(3)(lambda: 5)()', expected: '5' },
          {
            label: 'Успех с третьей попытки',
            code: `calls = {"n": 0}
@retry(3)
def flaky():
    calls["n"] += 1
    if calls["n"] < 3:
        raise ConnectionError("сеть недоступна")
    return "ок"
__kiro_eq("flaky()", flaky(), "ок")
__kiro_eq("количество попыток", calls["n"], 3)`,
          },
          {
            label: 'Все попытки неудачные',
            code: `calls = {"n": 0}
@retry(2)
def broken():
    calls["n"] += 1
    raise ValueError(f"попытка {calls['n']}")
try:
    broken()
except ValueError as e:
    __kiro_eq("текст последней ошибки", str(e), "попытка 2")
else:
    raise AssertionError("ожидалось исключение ValueError")
__kiro_eq("количество попыток", calls["n"], 2)`,
          },
        ],
      },
      {
        id: 'w3d7t4',
        title: 'Просроченные задачи',
        text: 'Напиши функцию `overdue(json_text, today)`. `json_text` — строка JSON со списком задач вида `{"title": "...", "due": "ГГГГ-ММ-ДД", "done": false}`, `today` — дата строкой `ГГГГ-ММ-ДД`. Верни список названий невыполненных задач, у которых срок раньше `today`, отсортированный по сроку (самые старые первыми).',
        starter: starter(`
import json
from datetime import date

def overdue(json_text, today):
    pass
`),
        examples: [{ call: 'overdue("[]", "2026-10-17")', expected: '[]' }],
        tests: [
          { call: 'overdue("[]", "2026-10-17")', expected: '[]' },
          {
            label: 'Отбор и сортировка',
            code: `tasks = '''[
  {"title": "Отчёт", "due": "2026-10-10", "done": false},
  {"title": "Звонок", "due": "2026-10-01", "done": false},
  {"title": "Оплата", "due": "2026-10-05", "done": true},
  {"title": "Встреча", "due": "2026-10-17", "done": false},
  {"title": "Презентация", "due": "2026-11-01", "done": false}
]'''
__kiro_eq("overdue", overdue(tasks, "2026-10-17"), ["Звонок", "Отчёт"])`,
          },
        ],
      },
      {
        id: 'w3d7t5',
        title: 'Загрузка с ограничением',
        text: 'Напиши корутину `download_all(urls, fetch, limit)`. `fetch` — корутина, которая принимает адрес и возвращает результат. Скачай все адреса конкурентно, но так, чтобы **одновременно** выполнялось не больше `limit` запросов (используй `asyncio.Semaphore`). Верни результаты в порядке `urls`.',
        starter: starter(`
import asyncio

async def download_all(urls, fetch, limit):
    pass
`),
        examples: [],
        tests: [
          {
            label: 'Результаты в исходном порядке',
            code: `import asyncio
async def fake(url):
    await asyncio.sleep(0.05 * (len(url) % 3))
    return url.upper()
__kiro_eq("download_all", await download_all(["a", "bb", "ccc", "d"], fake, 2), ["A", "BB", "CCC", "D"])`,
          },
          {
            label: 'Не больше limit запросов одновременно',
            code: `import asyncio
state = {"now": 0, "peak": 0}
async def tracked(url):
    state["now"] += 1
    state["peak"] = max(state["peak"], state["now"])
    await asyncio.sleep(0.05)
    state["now"] -= 1
    return url
await download_all([str(i) for i in range(10)], tracked, 3)
__kiro_eq("максимум одновременных запросов", state["peak"], 3)`,
          },
        ],
      },
    ],
  },
]
