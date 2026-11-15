// Зимний лагерь, направление «Backend-разработка»: Python глубоко.
// Разметка: **жирный**, _курсив_, `код`.

export default {
  title: 'Python глубоко: объекты, ООП, итераторы, память и GIL',
  intro: 'Синтаксис ты знаешь с первой недели. На собеседовании backend-разработчика спрашивают другое: как Python устроен внутри. Почему список «сам» изменился в другой функции, что такое MRO, чем генератор отличается от списка, когда срабатывает сборщик мусора и зачем нужен GIL. Эта глава собирает именно такие темы — с примерами, которые можно запустить, и с ответами в том виде, в каком их ждут.',
  sections: [
    {
      id: 'objects', title: 'Объекты, ссылки и изменяемость',
      blocks: [
        { t: 'p', text: 'В Python всё является объектом: число, строка, функция, класс, модуль. У объекта есть **идентичность** (`id()`, в CPython это адрес в памяти), **тип** и **значение**. Переменная — не коробка со значением, а **имя, привязанное к объекту**. Присваивание `b = a` не копирует объект, а создаёт второе имя для него же.' },
        { t: 'code', text: `a = [1, 2, 3]
b = a            # второе имя того же списка
b.append(4)
print(a)         # [1, 2, 3, 4] — список один
print(a is b)    # True

x = 10
y = x
y += 1           # int неизменяем: создан новый объект 11, имя y перепривязано
print(x, y)      # 10 11` },
        { t: 'table', caption: 'Изменяемые и неизменяемые типы', headers: ['Неизменяемые (immutable)', 'Изменяемые (mutable)'], rows: [
          ['`int`, `float`, `bool`, `complex`', '`list`'],
          ['`str`, `bytes`', '`dict`'],
          ['`tuple`, `frozenset`', '`set`, `bytearray`'],
          ['`None`', 'экземпляры большинства своих классов'],
        ] },
        { t: 'p', text: 'Что из этого следует на практике. Аргументы передаются **по ссылке на объект**: функция получает тот же объект, а не копию. Изменяемый аргумент она может изменить на месте — и это увидит вызывающий код. Ключом словаря и элементом множества может быть только **хешируемый** объект, то есть, как правило, неизменяемый: список ключом быть не может, кортеж — может (если внутри него нет изменяемых объектов).' },
        { t: 'code', text: `def add_item(items, item):
    items.append(item)        # меняет исходный список

def replace(items):
    items = [0]               # перепривязка локального имени — снаружи ничего не изменится

t = ([1, 2], 3)
t[0].append(99)               # кортеж неизменяем, но список внутри него — изменяем
print(t)                      # ([1, 2, 99], 3)` },
        { t: 'h3', text: 'Срезы и comprehensions' },
        { t: 'code', text: `s = [0, 1, 2, 3, 4, 5]
s[1:4]        # [1, 2, 3]   — правая граница не включается
s[::-1]       # разворот;  s[::2] — каждый второй
s[:]          # поверхностная копия списка

squares = [x * x for x in range(10) if x % 2 == 0]    # list comprehension
index = {user.id: user for user in users}             # dict comprehension
unique = {word.lower() for word in words}             # set comprehension
total = sum(x * x for x in range(10**6))              # генераторное выражение: не создаёт список в памяти` },
        { t: 'h3', text: 'Функции, области видимости и замыкания' },
        { t: 'p', text: 'Имя ищется по правилу **LEGB**: Local → Enclosing (объемлющая функция) → Global (модуль) → Built-in. Чтобы присвоить глобальной переменной изнутри функции, нужно `global`, переменной объемлющей функции — `nonlocal`.' },
        { t: 'code', text: `def f(a, b=2, *args, c, d=4, **kwargs):
    ...
# a, b — позиционные или именованные; *args — остальные позиционные (кортеж);
# c, d — только именованные; **kwargs — остальные именованные (словарь)

def make_counter():
    count = 0
    def inc():
        nonlocal count        # без nonlocal было бы UnboundLocalError
        count += 1
        return count
    return inc

counter = make_counter()
counter(); counter()          # 1, 2 — функция «помнит» переменную count` },
        { t: 'p', text: '**Замыкание** — функция вместе с переменными объемлющей области, которые она использует. Важно: замыкание запоминает _переменную_, а не её значение на момент создания. Отсюда классическая ловушка с лямбдами в цикле — она разобрана в последнем разделе.' },
      ],
    },
    {
      id: 'oop', title: 'ООП: наследование, MRO, property, dataclasses',
      blocks: [
        { t: 'code', text: `class Account:
    bank = 'KIRO Bank'                  # атрибут класса — общий для всех экземпляров

    def __init__(self, owner, balance=0):
        self.owner = owner              # атрибуты экземпляра
        self._balance = balance         # одно подчёркивание — «не трогай снаружи» (соглашение)

    @property
    def balance(self):                  # читается как атрибут: acc.balance
        return self._balance

    @balance.setter
    def balance(self, value):
        if value < 0:
            raise ValueError('баланс не может быть отрицательным')
        self._balance = value

    @classmethod
    def from_dict(cls, data):           # альтернативный конструктор: получает класс
        return cls(data['owner'], data.get('balance', 0))

    @staticmethod
    def is_valid_owner(name):           # обычная функция в пространстве имён класса
        return bool(name and name.strip())` },
        { t: 'table', caption: 'Три вида методов', headers: ['Вид', 'Первый аргумент', 'Когда нужен'], rows: [
          ['обычный метод', '`self` — экземпляр', 'работает с данными объекта'],
          ['`@classmethod`', '`cls` — класс', 'альтернативные конструкторы, работа с атрибутами класса; корректно работает в наследниках'],
          ['`@staticmethod`', 'нет', 'вспомогательная функция, логически относящаяся к классу'],
        ] },
        { t: 'p', text: '**Инкапсуляция** в Python держится на соглашениях. `_name` — внутренний атрибут; `__name` (два подчёркивания) включает _искажение имени_: атрибут превращается в `_ClassName__name`, чтобы наследник случайно его не перекрыл. Это не защита — доступ остаётся. Настоящий инструмент контроля — `@property`: атрибут сначала делают обычным, а когда понадобится проверка, превращают в свойство, не меняя код, который его использует.' },
        { t: 'h3', text: 'Наследование и MRO' },
        { t: 'p', text: 'При множественном наследовании Python должен решить, в каком порядке искать метод. Этот порядок — **MRO** (Method Resolution Order) — строится алгоритмом C3-линеаризации и лежит в `Класс.__mro__`. Правила: наследник раньше родителей, родители — в порядке перечисления, каждый класс встречается один раз.' },
        { t: 'code', text: `class A:
    def hello(self): print('A')
class B(A):
    def hello(self): print('B'); super().hello()
class C(A):
    def hello(self): print('C'); super().hello()
class D(B, C):
    def hello(self): print('D'); super().hello()

D().hello()         # D B C A
print(D.__mro__)    # D, B, C, A, object` },
        { t: 'p', text: 'Главное про `super()`: он вызывает не «родителя», а **следующий класс по MRO**. Поэтому в примере `B.hello` передаёт управление в `C`, хотя `C` не является родителем `B`. Так решается «ромбовидное» наследование: `A.hello` выполняется один раз.' },
        { t: 'h3', text: 'Абстрактные классы и dataclasses' },
        { t: 'code', text: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field

class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: bytes) -> None: ...

class S3Storage(Storage):
    def save(self, key, data): ...
# Storage() -> TypeError: нельзя создать экземпляр класса с нереализованным абстрактным методом

@dataclass(frozen=True, slots=True)
class Point:
    x: float
    y: float = 0.0
    tags: list[str] = field(default_factory=list)   # изменяемое значение по умолчанию — только так` },
        { t: 'p', text: '`@dataclass` сам генерирует `__init__`, `__repr__` и `__eq__`. `frozen=True` делает экземпляры неизменяемыми и хешируемыми, `slots=True` экономит память и запрещает случайные новые атрибуты. Для данных с валидацией на границе системы (тело запроса, конфигурация) берут Pydantic.' },
      ],
    },
    {
      id: 'dunder', title: 'Магические методы',
      blocks: [
        { t: 'p', text: 'Методы с двойными подчёркиваниями (dunder) — это способ встроить свой класс в язык: `len(obj)` вызывает `obj.__len__()`, `a + b` — `a.__add__(b)`, `with obj:` — `__enter__` и `__exit__`. Напрямую их вызывать не принято.' },
        { t: 'table', caption: 'Методы, о которых спрашивают', headers: ['Метод', 'Когда вызывается', 'Что помнить'], rows: [
          ['`__new__`', 'создание объекта — до `__init__`', 'статический по сути, возвращает новый экземпляр; нужен для синглтонов и наследования от неизменяемых типов'],
          ['`__init__`', 'инициализация уже созданного объекта', 'ничего не возвращает'],
          ['`__repr__`', '`repr(obj)`, отладчик, вывод в консоли', 'однозначное представление для разработчика; в идеале — код, которым объект можно создать'],
          ['`__str__`', '`str(obj)`, `print`', 'для пользователя; если не задан, используется `__repr__`'],
          ['`__eq__`', '`a == b`', 'по умолчанию сравнивает идентичность'],
          ['`__hash__`', '`hash(obj)`, ключ словаря, элемент множества', 'равные объекты обязаны иметь равные хеши'],
          ['`__iter__`, `__next__`', '`for`, `iter()`, `next()`', 'протокол итератора'],
          ['`__len__`, `__getitem__`, `__contains__`', '`len()`, `obj[key]`, `in`', 'поведение контейнера'],
          ['`__enter__`, `__exit__`', 'оператор `with`', 'протокол контекстного менеджера'],
          ['`__call__`', '`obj()`', 'делает экземпляр вызываемым'],
          ['`__getattr__`', 'обращение к несуществующему атрибуту', 'основа прокси и ленивой загрузки'],
        ] },
        { t: 'code', text: `class Money:
    def __init__(self, amount, currency):
        self.amount, self.currency = amount, currency

    def __repr__(self):
        return f'Money({self.amount!r}, {self.currency!r})'

    def __eq__(self, other):
        if not isinstance(other, Money):
            return NotImplemented
        return (self.amount, self.currency) == (other.amount, other.currency)

    def __hash__(self):
        return hash((self.amount, self.currency))` },
        { t: 'note', text: 'Правило, которое проверяют на собеседованиях: если определил `__eq__` и не определил `__hash__`, Python устанавливает `__hash__ = None` — объект перестаёт быть хешируемым и не может быть ключом словаря. А хеш нужно считать только по неизменяемым полям: если поле, участвующее в хеше, изменится, объект «потеряется» в словаре.' },
      ],
    },
    {
      id: 'iter', title: 'Итераторы, генераторы, декораторы, контекстные менеджеры',
      blocks: [
        { t: 'h3', text: 'Итерируемый объект и итератор' },
        { t: 'p', text: '**Итерируемый объект** (iterable) умеет отдать итератор: у него есть `__iter__`. **Итератор** помнит позицию и отдаёт следующий элемент методом `__next__`, а когда элементы кончились — бросает `StopIteration`. Список — итерируемый, но не итератор: по нему можно пройти много раз. Итератор одноразовый.' },
        { t: 'code', text: `nums = [1, 2, 3]
it = iter(nums)           # вызывает nums.__iter__()
next(it); next(it); next(it)
next(it)                  # StopIteration
# for x in nums: — это ровно iter() + next() в цикле с перехватом StopIteration` },
        { t: 'h3', text: 'Генераторы' },
        { t: 'p', text: 'Функция с `yield` — **генераторная**: при вызове она не выполняется, а возвращает объект-генератор. Код исполняется по шагам: до ближайшего `yield`, затем замирает с сохранением локальных переменных и продолжает со следующего `next()`. Генератор — это итератор, который не держит все значения в памяти.' },
        { t: 'code', text: `def read_lines(path):
    with open(path) as f:
        for line in f:
            yield line.rstrip()         # файл на 10 ГБ читается построчно

def chain(*iterables):
    for it in iterables:
        yield from it                   # делегирует вложенному итератору

import sys
sys.getsizeof([x for x in range(10**6)])    # ~8 МБ
sys.getsizeof(x for x in range(10**6))      # ~200 байт` },
        { t: 'p', text: '`yield from` не только короче цикла `for ... yield`: он прозрачно передаёт во вложенный генератор значения `send()` и исключения и возвращает его результат. На этом механизме были построены первые корутины, из которых вырос `async`/`await`.' },
        { t: 'h3', text: 'Декораторы' },
        { t: 'p', text: 'Декоратор — функция, которая принимает функцию и возвращает другую, обычно обёртку. Запись `@decorator` над функцией равносильна `func = decorator(func)`.' },
        { t: 'code', text: `import functools, time

def timed(func):
    @functools.wraps(func)                  # сохраняет имя и докстринг исходной функции
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return func(*args, **kwargs)
        finally:
            print(f'{func.__name__}: {time.perf_counter() - start:.3f} c')
    return wrapper

def retry(times=3, exceptions=(Exception,)):    # декоратор с параметрами — три уровня вложенности
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions:
                    if attempt == times:
                        raise
        return wrapper
    return decorator

@retry(times=5, exceptions=(ConnectionError,))
def fetch(url): ...` },
        { t: 'h3', text: 'Контекстные менеджеры' },
        { t: 'p', text: 'Оператор `with` гарантирует освобождение ресурса, даже если внутри блока возникло исключение: файл закроется, блокировка снимется, транзакция откатится.' },
        { t: 'code', text: `class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self                          # то, что попадёт в переменную после as
    def __exit__(self, exc_type, exc, tb):
        self.elapsed = time.perf_counter() - self.start
        return False                         # True — подавить исключение

from contextlib import contextmanager

@contextmanager
def transaction(conn):
    try:
        yield conn            # до yield — __enter__, после — __exit__
        conn.commit()
    except Exception:
        conn.rollback()
        raise` },
        { t: 'h3', text: 'Дескрипторы и метаклассы — на уровне понимания' },
        { t: 'ul', items: [
          '**Дескриптор** — объект с методами `__get__`, `__set__` или `__delete__`, который лежит в атрибуте класса и перехватывает доступ к нему. На дескрипторах работают `property`, методы (функция превращается в связанный метод), `classmethod`, `staticmethod`, поля ORM.',
          '**Метакласс** — класс, экземплярами которого являются классы. Обычный метакласс — `type`; свой позволяет вмешаться в создание класса: зарегистрировать его, проверить, добавить методы. Так устроены модели Django и SQLAlchemy, `ABC`, `Enum`.',
          'В прикладном коде свои метаклассы почти не пишут: их задачи обычно решают декоратор класса или `__init_subclass__`.',
        ] },
      ],
    },
    {
      id: 'internals', title: 'Как работает Python: байт-код, память, GIL',
      blocks: [
        { t: 'p', text: '**CPython** — эталонная реализация языка, написанная на C; когда говорят «Python», обычно имеют в виду её. Исходный код сначала компилируется в **байт-код** — инструкции для виртуальной машины, — а затем интерпретатор исполняет его в цикле. Скомпилированный байт-код модулей кешируется в `__pycache__/*.pyc`, чтобы не компилировать при каждом импорте.' },
        { t: 'code', text: `import dis
dis.dis(lambda a, b: a + b)
#   LOAD_FAST   a
#   LOAD_FAST   b
#   BINARY_OP   +
#   RETURN_VALUE` },
        { t: 'h3', text: 'Управление памятью' },
        { t: 'p', text: 'Основной механизм — **подсчёт ссылок**. У каждого объекта есть счётчик: сколько имён и контейнеров на него ссылаются. Счётчик упал до нуля — объект уничтожается немедленно. Это просто и предсказуемо, но не справляется с **циклическими ссылками**: два объекта ссылаются друг на друга, снаружи на них никто не ссылается, а счётчики не нулевые.' },
        { t: 'code', text: `import sys, gc

a = []
sys.getrefcount(a)        # 2: имя a и временная ссылка из аргумента функции

x, y = [], []
x.append(y); y.append(x)  # цикл
del x, y                  # счётчики не обнулились — подсчёт ссылок не поможет
gc.collect()              # сборщик мусора находит и удаляет недостижимые циклы` },
        { t: 'p', text: 'Для циклов есть **сборщик мусора** (модуль `gc`). Он отслеживает объекты-контейнеры и периодически ищет недостижимые группы. Сборщик **поколенческий**: новые объекты попадают в молодое поколение, которое проверяется часто; пережившие сборку переходят в старшие, проверяемые реже. Идея — большинство объектов живёт недолго. Чтобы не создавать циклов там, где нужна обратная ссылка (кеш, родитель в дереве), используют слабые ссылки — модуль `weakref`.' },
        { t: 'h3', text: 'GIL' },
        { t: 'p', text: '**GIL** (Global Interpreter Lock) — глобальная блокировка интерпретатора CPython: в каждый момент времени байт-код исполняет **только один поток**. Она появилась, чтобы сделать подсчёт ссылок потокобезопасным без блокировки на каждом объекте, и упростила написание расширений на C.' },
        { t: 'table', caption: 'Что из этого следует', headers: ['Тип задачи', 'Что происходит с потоками', 'Чем решать'], rows: [
          ['CPU-bound: вычисления, обработка изображений, парсинг', 'потоки не дают ускорения — они по очереди держат GIL', '`multiprocessing`, `ProcessPoolExecutor`; библиотеки на C (NumPy), которые отпускают GIL'],
          ['I/O-bound: сеть, диск, база данных', 'поток, ждущий ввода-вывода, отпускает GIL — остальные работают', '`threading`, `ThreadPoolExecutor` или `asyncio`'],
        ] },
        { t: 'ul', items: [
          'GIL не делает код потокобезопасным. Операция `counter += 1` — это несколько инструкций байт-кода, и переключение потоков между ними даёт состояние гонки. Общие данные всё равно защищают блокировками.',
          'GIL — особенность CPython, а не языка: в Jython и IronPython его нет.',
          'Начиная с Python 3.13 существует сборка без GIL — free-threaded (PEP 703). Она развивается и пока не является сборкой по умолчанию; на собеседовании достаточно знать, что такая работа идёт.',
        ] },
        { t: 'note', text: 'Короткий ответ на вопрос «что такое GIL»: мьютекс в CPython, из-за которого байт-код в один момент исполняет один поток. Для ввода-вывода потоки полезны, для вычислений — нет, там нужны процессы. Конкурентность и асинхронность подробно разбираются в следующей главе.' },
      ],
    },
    {
      id: 'typing', title: 'Типизация: аннотации, typing, mypy',
      blocks: [
        { t: 'p', text: 'Python остаётся динамически типизированным: аннотации типов интерпретатор **не проверяет**. Их читают статические анализаторы (mypy, pyright), IDE и библиотеки вроде Pydantic и FastAPI. В рабочих проектах аннотации обязательны: они ловят ошибки до запуска и служат документацией.' },
        { t: 'code', text: `from typing import Protocol, TypedDict, TypeVar, Generic, Callable, Literal

def find_user(user_id: int) -> User | None: ...          # Optional[User] в старом синтаксисе
def parse(value: str | bytes) -> dict[str, list[int]]: ...
Handler = Callable[[Request], Response]
Mode = Literal['r', 'w', 'a']

class UserDict(TypedDict):                # словарь с известными ключами
    id: int
    name: str

class SupportsClose(Protocol):            # структурная типизация: подходит любой класс с методом close
    def close(self) -> None: ...

T = TypeVar('T')
class Repository(Generic[T]):             # обобщённый класс
    def get(self, id: int) -> T | None: ...
    def add(self, item: T) -> None: ...` },
        { t: 'table', caption: 'Что нужно различать', headers: ['Инструмент', 'Зачем'], rows: [
          ['`X | None` (`Optional[X]`)', 'значение может отсутствовать — анализатор заставит обработать `None`'],
          ['`Union`, `|`', 'один из нескольких типов'],
          ['`Generic`, `TypeVar`', 'класс или функция, работающие с любым типом, но согласованно'],
          ['`Protocol`', '«утиная» типизация, проверяемая статически: важны методы, а не наследование'],
          ['`ABC`', 'номинальная типизация: нужно явно наследоваться'],
          ['`TypedDict`', 'типизированный словарь, например ответ внешнего API'],
          ['`Any`', 'отключает проверку — использовать как крайнюю меру'],
        ] },
        { t: 'p', text: 'Запуск проверки: `mypy src/` или `pyright`. Обычно она встроена в CI рядом с линтером `ruff` и тестами. Режим `mypy --strict` запрещает функции без аннотаций и неявный `Any`.' },
      ],
    },
    {
      id: 'exceptions', title: 'Исключения',
      blocks: [
        { t: 'code', text: `BaseException
 ├── SystemExit, KeyboardInterrupt, GeneratorExit      # их обычно не перехватывают
 └── Exception                                         # всё «обычное» наследуется отсюда
      ├── ArithmeticError → ZeroDivisionError
      ├── LookupError → IndexError, KeyError
      ├── OSError → FileNotFoundError, PermissionError, ConnectionError, TimeoutError
      ├── ValueError, TypeError, AttributeError
      └── RuntimeError → RecursionError, NotImplementedError` },
        { t: 'code', text: `class PaymentError(Exception):
    """Базовое исключение платёжного модуля."""

class InsufficientFunds(PaymentError):
    def __init__(self, balance, amount):
        super().__init__(f'не хватает {amount - balance}')
        self.balance, self.amount = balance, amount

try:
    charge(user, amount)
except InsufficientFunds as e:        # сначала конкретные исключения, потом общие
    notify(user, e)
except PaymentError:
    logger.exception('платёж не прошёл')     # лог со стек-трейсом
    raise                                    # пробросить дальше, не теряя трассировку
else:
    send_receipt(user)                # выполняется, если исключений не было
finally:
    release_lock()                    # выполняется всегда

raise ServiceError('оплата недоступна') from exc     # сохранить исходную причину` },
        { t: 'split', columns: [
          { tone: 'no', title: 'Плохо', items: ['`except:` без типа — ловит даже Ctrl+C и `SystemExit`.', '`except Exception: pass` — ошибка проглочена, искать её потом негде.', 'Перехват там, где с ошибкой нечего сделать.', 'Исключения как обычный способ управления потоком в горячем цикле.'] },
          { tone: 'yes', title: 'Хорошо', items: ['Ловить конкретный тип, который ожидаешь.', 'Ловить там, где можно осмысленно обработать: повторить, вернуть 404, откатить транзакцию.', 'Своя иерархия исключений для своего модуля.', 'Логировать через `logger.exception` и пробрасывать дальше.'] },
        ] },
        { t: 'p', text: 'В Python принят стиль **EAFP** — «проще попросить прощения, чем разрешения»: выполнить действие и обработать исключение, а не проверять заранее. `try: value = d[key]` вместо `if key in d` не только короче, но и не имеет гонки между проверкой и действием — это существенно при работе с файлами и сетью.' },
      ],
    },
    {
      id: 'stdlib', title: 'Стандартная библиотека, которую нужно знать',
      blocks: [
        { t: 'table', caption: 'Модули и их главные инструменты', headers: ['Модуль', 'Что брать', 'Зачем'], rows: [
          ['`collections`', '`defaultdict`, `Counter`, `deque`, `namedtuple`, `OrderedDict`', 'словарь со значением по умолчанию; подсчёт; очередь с O(1) с обоих концов'],
          ['`itertools`', '`chain`, `islice`, `groupby`, `product`, `permutations`, `combinations`, `batched`', 'ленивая работа с последовательностями'],
          ['`functools`', '`lru_cache`, `cache`, `partial`, `wraps`, `reduce`, `cached_property`', 'мемоизация, частичное применение'],
          ['`datetime`, `zoneinfo`', '`datetime`, `timedelta`, `timezone`, `ZoneInfo`', 'даты и часовые пояса'],
          ['`pathlib`', '`Path`', 'пути как объекты вместо склейки строк'],
          ['`logging`', 'логгеры, уровни, обработчики', 'журналирование вместо `print`'],
          ['`json`', '`dumps`, `loads`, `dump`, `load`', 'сериализация'],
          ['`re`', '`compile`, `search`, `match`, `findall`, `sub`', 'регулярные выражения'],
          ['`dataclasses`, `enum`', '`dataclass`, `Enum`', 'структуры данных и перечисления'],
          ['`secrets`, `hashlib`, `uuid`', 'токены, хеши, идентификаторы', 'безопасность'],
        ] },
        { t: 'code', text: `from collections import Counter, defaultdict, deque
from functools import lru_cache
from itertools import groupby
from pathlib import Path
from datetime import datetime, timezone
import logging, json

Counter('mississippi').most_common(2)          # [('i', 4), ('s', 4)]
groups = defaultdict(list)
for user in users:
    groups[user.city].append(user)             # не нужен if key not in dict
window = deque(maxlen=100)                     # хранит последние 100 элементов

@lru_cache(maxsize=1024)
def fib(n): return n if n < 2 else fib(n - 1) + fib(n - 2)

config = json.loads(Path('config.json').read_text(encoding='utf-8'))
now = datetime.now(timezone.utc)               # всегда «осведомлённое» время в UTC

logger = logging.getLogger(__name__)
logger.info('order %s created', order_id)      # подстановка ленивая — не f-строка` },
        { t: 'ul', items: [
          '`datetime.utcnow()` возвращает «наивное» время без часового пояса и объявлен устаревшим. Храни и передавай время в UTC с поясом, переводи в локальное только при показе.',
          '`groupby` группирует только **подряд идущие** элементы — данные нужно заранее отсортировать по тому же ключу.',
          'У `deque` вставка и удаление с обоих концов — O(1), у списка `pop(0)` и `insert(0, x)` — O(n).',
          'Регулярные выражения компилируй один раз (`re.compile`) и пиши «сырыми» строками: `r"\\d+"`.',
        ] },
      ],
    },
    {
      id: 'traps', title: 'Ловушки с собеседований',
      blocks: [
        { t: 'h3', text: 'Изменяемый аргумент по умолчанию' },
        { t: 'code', text: `def add(item, bucket=[]):         # список создаётся ОДИН раз — при определении функции
    bucket.append(item)
    return bucket

add(1)      # [1]
add(2)      # [1, 2]  — тот же список!

def add(item, bucket=None):       # правильно
    if bucket is None:
        bucket = []
    bucket.append(item)
    return bucket` },
        { t: 'h3', text: 'is и ==' },
        { t: 'p', text: '`==` сравнивает **значения** (вызывает `__eq__`), `is` — **идентичность**: один ли это объект. `is` используют только для синглтонов: `x is None`, `x is True`.' },
        { t: 'code', text: `a = [1, 2]; b = [1, 2]
a == b      # True
a is b      # False

x = 256; y = 256;  x is y      # True: CPython кеширует целые от -5 до 256
x = 257; y = 257;  x is y      # в интерактивной консоли False — полагаться на это нельзя` },
        { t: 'h3', text: 'Поверхностная и глубокая копия' },
        { t: 'code', text: `import copy
orig = [[1, 2], [3, 4]]
shallow = orig.copy()           # или orig[:], list(orig), copy.copy(orig)
deep = copy.deepcopy(orig)

shallow[0].append(99)
orig        # [[1, 2, 99], [3, 4]] — вложенные списки общие
deep        # [[1, 2], [3, 4]]     — полностью независимая копия

grid = [[0] * 3] * 3            # три ссылки на ОДНУ строку
grid[0][0] = 1                  # [[1, 0, 0], [1, 0, 0], [1, 0, 0]]
grid = [[0] * 3 for _ in range(3)]      # правильно` },
        { t: 'h3', text: 'Позднее связывание в замыканиях' },
        { t: 'code', text: `funcs = [lambda: i for i in range(3)]
[f() for f in funcs]            # [2, 2, 2] — все лямбды видят одну переменную i

funcs = [lambda i=i: i for i in range(3)]      # значение зафиксировано в аргументе по умолчанию
[f() for f in funcs]            # [0, 1, 2]` },
        { t: 'h3', text: 'Сложность операций' },
        { t: 'table', caption: 'Что стоит помнить наизусть', numeric: true, headers: ['Операция', 'list', 'dict / set', 'deque'], rows: [
          ['доступ по индексу или ключу', 'O(1)', 'O(1) в среднем', 'O(n) в середине'],
          ['поиск `x in`', 'O(n)', 'O(1) в среднем', 'O(n)'],
          ['добавление в конец', 'O(1) амортизированно', 'O(1) в среднем', 'O(1)'],
          ['вставка или удаление в начале', 'O(n)', '—', 'O(1)'],
          ['удаление по значению', 'O(n)', 'O(1) в среднем', 'O(n)'],
          ['сортировка', 'O(n log n), Timsort', '—', '—'],
        ] },
        { t: 'ul', items: [
          'Проверка `x in список` внутри цикла даёт O(n²). Преврати список в `set` — получишь O(n).',
          'Словарь с Python 3.7 гарантированно сохраняет порядок вставки.',
          'Строки неизменяемы: `s += x` в цикле создаёт новую строку каждый раз. Собирай части в список и склеивай `"".join(parts)`.',
          '`sort()` сортирует на месте и возвращает `None`; `sorted()` возвращает новый список. Сортировка устойчива.',
          'Нельзя менять список, по которому идёт цикл `for`: элементы будут пропущены. Итерируйся по копии или собирай новый список.',
        ] },
      ],
    },
  ],
}
