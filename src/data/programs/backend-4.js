// Индивидуальная программа «Backend-разработка», глава 4 — архитектура приложений.
// SOLID, DRY, KISS, YAGNI, паттерны (Singleton, Factory, Strategy, Adapter, Repository, DI),
// слоистая и чистая архитектура, монолит и микросервисы, API Gateway, межсервисное
// взаимодействие, конфигурация и 12-factor app. Примеры — на Python и FastAPI.
// Задание — вопросы backend-4-quiz.js, сдаются на платформе.

export default {
  num: 4,
  title: 'Архитектура приложений',
  summary: 'Принципы SOLID, DRY, KISS, YAGNI с примерами, паттерны Singleton, Factory, Strategy, Adapter, Repository и Dependency Injection, слоистая архитектура контроллер → сервис → репозиторий на FastAPI, чистая и гексагональная архитектура, монолит и микросервисы, API Gateway, синхронное и асинхронное взаимодействие сервисов, конфигурация через переменные окружения и 12-factor app.',
  intro: 'Код, который работает, — это половина дела. Вторая половина — код, который через год можно читать, менять и тестировать, не боясь всё сломать. Архитектура — это то, как программа разделена на части и как эти части зависят друг от друга. На собеседовании junior backend-разработчика обязательно спросят про SOLID, попросят назвать пару паттернов с примерами, объяснить, зачем делить код на слои и чем монолит отличается от микросервисов. В этой главе — всё это на примерах FastAPI.',
  sections: [
    {
      id: 'principles',
      num: '4.1',
      divider: 'Принципы',
      title: 'Принципы SOLID, DRY, KISS, YAGNI',
      blocks: [
        { t: 'p', text: '**SOLID** — пять принципов объектно-ориентированного проектирования, сформулированных Робертом Мартином. Их цель — код, который легко расширять и менять: новое поведение добавляется новым кодом, а не правкой старого во множестве мест.' },
        { t: 'h3', text: '4.1.1. S — Single Responsibility, принцип единственной ответственности' },
        { t: 'p', text: '**У модуля, класса или функции должна быть одна причина для изменения.** Если класс и считает скидку, и сохраняет заказ в базу, и отправляет письмо, то его придётся менять и когда поменяются правила скидок, и когда поменяется база, и когда поменяется шаблон письма. Каждое изменение рискует сломать остальное.' },
        { t: 'code', text: `# Плохо: одна функция делает всё
def checkout(order, db, smtp):
    total = sum(i.price * i.qty for i in order.items)
    if total > 5000:
        total *= 0.9
    db.execute("INSERT INTO orders ...", total)
    smtp.send(order.email, f"Заказ на {total} ₽")


# Хорошо: у каждой части одна ответственность
class PriceCalculator:
    def total(self, items) -> float:
        total = sum(i.price * i.qty for i in items)
        return total * 0.9 if total > 5000 else total


class OrderRepository:
    def __init__(self, db):
        self.db = db

    def save(self, order, total: float) -> None:
        self.db.execute("INSERT INTO orders ...", total)


class OrderNotifier:
    def __init__(self, smtp):
        self.smtp = smtp

    def order_placed(self, email: str, total: float) -> None:
        self.smtp.send(email, f"Заказ на {total} ₽")` },
        { t: 'h3', text: '4.1.2. O — Open/Closed, принцип открытости/закрытости' },
        { t: 'p', text: '**Код открыт для расширения, но закрыт для изменения.** Новое поведение добавляется новым классом, а не новой веткой `if` в старой функции. Типичный признак нарушения — длинный `if/elif` по типу объекта, который растёт с каждой новой фичей.' },
        { t: 'code', text: `from typing import Protocol


# Плохо: каждый новый способ доставки — правка этой функции
def delivery_cost(kind: str, weight: float) -> float:
    if kind == "courier":
        return 300 + 20 * weight
    elif kind == "pickup":
        return 0
    elif kind == "post":
        return 200 + 50 * weight
    raise ValueError(kind)


# Хорошо: новый способ доставки — новый класс, старый код не трогаем
class Delivery(Protocol):
    def cost(self, weight: float) -> float: ...


class Courier:
    def cost(self, weight: float) -> float:
        return 300 + 20 * weight


class Pickup:
    def cost(self, weight: float) -> float:
        return 0` },
        { t: 'h3', text: '4.1.3. L — Liskov Substitution, принцип подстановки Барбары Лисков' },
        { t: 'p', text: '**Объект подкласса должен работать везде, где ожидается базовый класс, не ломая программу.** Наследник не должен ужесточать требования к входным данным, ослаблять гарантии результата или кидать неожиданные исключения.' },
        { t: 'code', text: `class Storage:
    def save(self, name: str, data: bytes) -> None:
        ...


class ReadOnlyStorage(Storage):
    def save(self, name: str, data: bytes) -> None:
        raise PermissionError("только чтение")   # нарушение LSP:
        # код, который получил Storage, ожидает, что save() работает


# Правильно: не наследовать «только для чтения» от «чтения и записи»,
# а выделить два интерфейса — ReadableStorage и WritableStorage` },
        { t: 'p', text: 'Классический пример нарушения — «квадрат наследует прямоугольник»: у прямоугольника можно независимо менять ширину и высоту, а у квадрата — нет, и код, работающий с прямоугольником, на квадрате даст неверный результат.' },
        { t: 'h3', text: '4.1.4. I — Interface Segregation, принцип разделения интерфейсов' },
        { t: 'p', text: '**Клиенты не должны зависеть от методов, которыми не пользуются.** Лучше несколько маленьких интерфейсов, чем один огромный. Если сервису отчётов нужно только читать заказы, ему не нужно зависеть от интерфейса с методами `delete` и `refund`.' },
        { t: 'code', text: `from typing import Protocol


class OrderReader(Protocol):
    def get(self, order_id: int): ...
    def list_by_user(self, user_id: int): ...


class OrderWriter(Protocol):
    def add(self, order) -> None: ...
    def delete(self, order_id: int) -> None: ...


class ReportService:
    def __init__(self, orders: OrderReader):   # зависит только от чтения
        self.orders = orders` },
        { t: 'h3', text: '4.1.5. D — Dependency Inversion, принцип инверсии зависимостей' },
        { t: 'p', text: '**Модули верхнего уровня (бизнес-логика) не должны зависеть от модулей нижнего уровня (база, почта, HTTP-клиенты). Оба зависят от абстракций.** Сервис заказов зависит не от `PostgresOrderRepository`, а от интерфейса «репозиторий заказов»; конкретную реализацию ему передают снаружи. Так бизнес-логику можно протестировать с фейковым репозиторием и сменить базу, не трогая сервис.' },
        { t: 'code', text: `from typing import Protocol


class OrderRepository(Protocol):          # абстракция принадлежит бизнес-логике
    def add(self, order) -> None: ...


class OrderService:
    def __init__(self, repo: OrderRepository):   # зависим от абстракции
        self.repo = repo

    def place(self, order) -> None:
        self.repo.add(order)


class InMemoryOrderRepository:            # реализация для тестов
    def __init__(self):
        self.items = []

    def add(self, order) -> None:
        self.items.append(order)


service = OrderService(InMemoryOrderRepository())   # зависимость передали снаружи` },
        { t: 'note', text: 'Не путать: **Dependency Inversion** — принцип (зависеть от абстракций), **Dependency Injection** — приём (передавать зависимости снаружи, а не создавать внутри, раздел 4.2.6), **Inversion of Control** — общая идея (не мой код вызывает фреймворк, а фреймворк вызывает мой код и сам подставляет зависимости).' },
        { t: 'h3', text: '4.1.6. DRY, KISS, YAGNI' },
        { t: 'table', caption: 'Таблица 1. Ещё три принципа', headers: ['Принцип', 'Смысл', 'Как нарушают', 'Осторожно'], rows: [
          ['**DRY** — Don’t Repeat Yourself, «не повторяйся»', 'каждое знание о системе должно быть в одном месте', 'одна и та же формула скидки скопирована в три сервиса и правится в двух из трёх', 'не объединять код, который похож случайно: две функции совпадают сегодня, но меняются по разным причинам. Неудачная абстракция хуже дублирования'],
          ['**KISS** — Keep It Simple, Stupid, «делай проще»', 'самое простое решение, которое работает', 'фабрика фабрик и пять уровней наследования для CRUD из трёх таблиц', 'простое ≠ примитивное: обработку ошибок и тесты не упрощают'],
          ['**YAGNI** — You Aren’t Gonna Need It, «тебе это не понадобится»', 'не писать код «на будущее», пока он не нужен', 'поддержка пяти баз данных «вдруг переедем», когда есть только PostgreSQL', 'это не запрет думать о расширяемости: оставить точку расширения — да, реализовать то, что не просили, — нет'],
        ] },
        { t: 'note', text: 'На собеседовании хорошо не только назвать принципы, но и сказать, что они **не абсолютны**: слепое следование SOLID даёт переусложнённый код с десятком интерфейсов там, где хватило бы функции. Это и есть баланс с KISS и YAGNI.' },
      ],
      terms: [
        ['SOLID', 'пять принципов объектно-ориентированного проектирования.'],
        ['абстракция', 'интерфейс, описывающий что делает компонент, без деталей как.'],
        ['DRY', 'не повторяй одно и то же знание в нескольких местах.'],
        ['YAGNI', 'не реализуй то, что пока не нужно.'],
      ],
    },
    {
      id: 'patterns',
      num: '4.2',
      title: 'Паттерны проектирования',
      blocks: [
        { t: 'p', text: '**Паттерн проектирования** — типовое решение часто встречающейся задачи проектирования. Классический каталог — книга «Банды четырёх» (Gang of Four, 1994) с 23 паттернами в трёх группах: **порождающие** (как создавать объекты), **структурные** (как объединять объекты) и **поведенческие** (как объекты взаимодействуют). В Python многие паттерны записываются проще, чем в Java, — функции и модули тоже объекты.' },
        { t: 'h3', text: '4.2.1. Singleton — одиночка (порождающий)' },
        { t: 'p', text: '**Гарантирует, что у класса только один экземпляр, и даёт к нему глобальный доступ.** Применяют для объектов, которые дорого создавать и которые должны быть общими: пул соединений с базой, настройки, клиент HTTP.' },
        { t: 'code', text: `from functools import lru_cache


# Классическая реализация через __new__
class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance


assert Config() is Config()


# В Python проще: модуль импортируется один раз — объект в модуле уже одиночка.
# А в FastAPI обычно используют кешированную функцию:
@lru_cache
def get_settings():
    return {"db_url": "postgresql://..."}   # создаётся один раз при первом вызове` },
        { t: 'note', text: 'Singleton часто называют **антипаттерном**: это глобальное состояние, которое сложно подменить в тестах и которое скрывает зависимости — по сигнатуре класса не видно, что он лезет в глобальный объект. Лучше создавать объект один раз и передавать его через Dependency Injection.' },
        { t: 'h3', text: '4.2.2. Factory — фабрика (порождающий)' },
        { t: 'p', text: '**Создание объектов выносится в отдельную функцию или класс**, чтобы вызывающий код не знал, какой конкретный класс создаётся. Удобно, когда тип объекта выбирается по настройке или данным.' },
        { t: 'code', text: `from typing import Protocol


class Notifier(Protocol):
    def send(self, to: str, text: str) -> None: ...


class EmailNotifier:
    def send(self, to: str, text: str) -> None:
        print(f"email {to}: {text}")


class SmsNotifier:
    def send(self, to: str, text: str) -> None:
        print(f"sms {to}: {text}")


def notifier_factory(channel: str) -> Notifier:
    notifiers = {"email": EmailNotifier, "sms": SmsNotifier}
    try:
        return notifiers[channel]()
    except KeyError:
        raise ValueError(f"неизвестный канал: {channel}") from None


notifier_factory("sms").send("+79990000000", "Ваш код: 1234")` },
        { t: 'p', text: 'Варианты: **Factory Method** — подклассы решают, какой объект создать; **Abstract Factory** — фабрика целого семейства связанных объектов (например, все компоненты для тестового окружения или для продакшна).' },
        { t: 'h3', text: '4.2.3. Strategy — стратегия (поведенческий)' },
        { t: 'p', text: '**Семейство взаимозаменяемых алгоритмов: каждый в своём классе, и нужный подставляется во время работы.** Классический пример — разные способы расчёта скидки, доставки, оплаты. Это прямое применение принципа открытости/закрытости.' },
        { t: 'code', text: `from typing import Protocol


class DiscountStrategy(Protocol):
    def apply(self, total: float) -> float: ...


class NoDiscount:
    def apply(self, total: float) -> float:
        return total


class PercentDiscount:
    def __init__(self, percent: float):
        self.percent = percent

    def apply(self, total: float) -> float:
        return total * (1 - self.percent / 100)


class Cart:
    def __init__(self, discount: DiscountStrategy):
        self.discount = discount        # стратегию можно поменять, Cart не меняется

    def total(self, prices: list[float]) -> float:
        return round(self.discount.apply(sum(prices)), 2)


print(Cart(PercentDiscount(10)).total([1000, 500]))   # 1350.0` },
        { t: 'note', text: 'В Python стратегией может быть просто функция: `Cart(discount=lambda total: total * 0.9)`. Класс нужен, когда у стратегии есть состояние или несколько методов.' },
        { t: 'h3', text: '4.2.4. Adapter — адаптер (структурный)' },
        { t: 'p', text: '**Приводит интерфейс одного класса к интерфейсу, который ожидает наш код.** Типичный случай — внешний SDK платёжной системы со своими названиями методов и форматами. Мы оборачиваем его в адаптер с нашим интерфейсом — и бизнес-логика не знает о конкретном провайдере. Сменить провайдера = написать новый адаптер.' },
        { t: 'code', text: `from typing import Protocol


class PaymentGateway(Protocol):               # интерфейс, который нужен нашему коду
    def charge(self, amount_rub: int, card_token: str) -> str: ...


class ExternalPayClient:                      # чужой SDK — изменить его нельзя
    def create_payment(self, amount_kopecks: int, source: dict) -> dict:
        return {"payment_id": "pay_123", "status": "succeeded"}


class ExternalPayAdapter:
    def __init__(self, client: ExternalPayClient):
        self.client = client

    def charge(self, amount_rub: int, card_token: str) -> str:
        result = self.client.create_payment(
            amount_kopecks=amount_rub * 100,          # переводим единицы
            source={"type": "card", "token": card_token},
        )
        return result["payment_id"]


gateway: PaymentGateway = ExternalPayAdapter(ExternalPayClient())
print(gateway.charge(1500, "tok_abc"))   # pay_123` },
        { t: 'h3', text: '4.2.5. Repository — репозиторий' },
        { t: 'p', text: '**Прячет работу с хранилищем за интерфейсом коллекции объектов**: `get`, `add`, `list`. Бизнес-логика не пишет SQL и не знает, что данные лежат в PostgreSQL, — она работает с репозиторием. Плюсы: бизнес-логика не зависит от базы, запросы к одной сущности собраны в одном месте, в тестах репозиторий легко подменить на версию в памяти.' },
        { t: 'code', text: `from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    name: Mapped[str]


class UserRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get(self, user_id: int) -> User | None:
        return await self.session.get(User, user_id)

    async def get_by_email(self, email: str) -> User | None:
        return await self.session.scalar(select(User).where(User.email == email))

    async def add(self, user: User) -> User:
        self.session.add(user)
        await self.session.flush()        # получаем id, коммит — на уровне сервиса
        return user` },
        { t: 'note', text: 'Рядом с репозиторием часто упоминают **Unit of Work** — объект, который объединяет изменения нескольких репозиториев в одну транзакцию и коммитит их вместе. В SQLAlchemy роль Unit of Work играет `Session`.' },
        { t: 'h3', text: '4.2.6. Dependency Injection — внедрение зависимостей' },
        { t: 'p', text: '**Объект не создаёт свои зависимости сам, а получает их снаружи** — через конструктор или параметры. Так зависимости видны в сигнатуре, их легко подменить в тестах, а сборка всего приложения происходит в одном месте.' },
        { t: 'p', text: 'В FastAPI внедрение зависимостей встроено: `Depends` объявляет, что нужно обработчику, и FastAPI сам создаёт зависимости, передаёт их и закрывает ресурсы после ответа. Зависимости могут зависеть от других зависимостей — получается дерево.' },
        { t: 'code', text: `from collections.abc import AsyncIterator
from typing import Annotated

from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

engine = create_async_engine("sqlite+aiosqlite:///./app.db")
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
app = FastAPI()


async def get_session() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:   # открыть на время запроса
        yield session                       # после ответа сессия закроется сама


def get_user_repo(session: Annotated[AsyncSession, Depends(get_session)]) -> UserRepository:
    return UserRepository(session)


UserRepo = Annotated[UserRepository, Depends(get_user_repo)]


@app.get("/users/{user_id}")
async def read_user(user_id: int, repo: UserRepo):
    user = await repo.get(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return {"id": user.id, "email": user.email, "name": user.name}` },
        { t: 'p', text: 'Главный плюс видно в тестах: `app.dependency_overrides[get_user_repo] = lambda: FakeUserRepository()` — и весь API работает с фейковым репозиторием без базы (подробно в главе 6).' },
        { t: 'h3', text: '4.2.7. Ещё паттерны, которые стоит знать по названию' },
        { t: 'table', caption: 'Таблица 2. Другие частые паттерны', headers: ['Паттерн', 'Суть', 'Пример в бэкенде'], rows: [
          ['Builder (строитель)', 'пошаговая сборка сложного объекта', 'построитель SQL-запроса `select(...).where(...).order_by(...)`'],
          ['Facade (фасад)', 'простой интерфейс к сложной подсистеме', 'сервис «оформить заказ», скрывающий склад, оплату и доставку'],
          ['Decorator (декоратор)', 'добавить поведение, не меняя объект', 'декоратор кеширования или логирования функции'],
          ['Observer (наблюдатель)', 'подписчики реагируют на события объекта', 'обработчики событий, вебхуки, сигналы Django'],
          ['Chain of Responsibility (цепочка обязанностей)', 'запрос проходит через цепочку обработчиков', 'middleware в FastAPI'],
          ['Proxy (заместитель)', 'объект-заместитель контролирует доступ к другому', 'ленивая загрузка, кеширующий клиент'],
        ] },
      ],
      terms: [
        ['паттерн проектирования', 'типовое решение повторяющейся задачи проектирования.'],
        ['Singleton', 'класс с единственным экземпляром.'],
        ['Strategy', 'взаимозаменяемые алгоритмы за общим интерфейсом.'],
        ['Adapter', 'обёртка, приводящая чужой интерфейс к нужному.'],
        ['Repository', 'абстракция хранилища в виде коллекции объектов.'],
        ['Dependency Injection', 'передача зависимостей объекту снаружи.'],
      ],
    },
    {
      id: 'layers',
      num: '4.3',
      divider: 'Архитектура',
      title: 'Слоистая архитектура и чистая архитектура',
      blocks: [
        { t: 'h3', text: '4.3.1. Три слоя' },
        { t: 'p', text: 'Самая распространённая структура бэкенда — деление на слои, где каждый слой отвечает за своё и обращается только к слою ниже:' },
        { t: 'table', caption: 'Таблица 3. Слои приложения', headers: ['Слой', 'Отвечает за', 'Не должен'], rows: [
          ['**контроллер** (в FastAPI — роутер, эндпоинты)', 'HTTP: разобрать запрос, провалидировать данные (Pydantic), вызвать сервис, вернуть ответ и статус-код', 'содержать бизнес-правила и SQL'],
          ['**сервис** (use case, бизнес-логика)', 'правила предметной области: «нельзя отменить отправленный заказ», транзакции, оркестрация репозиториев и внешних API', 'знать про HTTP-запросы и статус-коды'],
          ['**репозиторий** (доступ к данным)', 'запросы к базе: сохранить, найти, обновить', 'принимать бизнес-решения'],
        ] },
        { t: 'flow', steps: ['HTTP-запрос', 'роутер: валидация, статус-коды', 'сервис: бизнес-правила', 'репозиторий: SQL', 'база данных'] },
        { t: 'p', text: 'Зачем так делить: бизнес-логику можно переиспользовать из HTTP, из фоновой задачи и из CLI; тестировать сервис без HTTP и без базы; поменять базу, не трогая правила; каждому файлу легко найти место.' },
        { t: 'h3', text: '4.3.2. Пример на FastAPI' },
        { t: 'code', text: `from typing import Annotated

from fastapi import APIRouter, Depends, FastAPI, HTTPException
from pydantic import BaseModel, EmailStr


# ── schemas.py: что приходит и уходит по HTTP (DTO) ──
class UserCreate(BaseModel):
    email: EmailStr
    name: str


class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str


# ── repositories.py: доступ к данным (здесь — в памяти) ──
class UserRepository:
    def __init__(self):
        self.rows: dict[int, dict] = {}

    def get_by_email(self, email: str) -> dict | None:
        return next((u for u in self.rows.values() if u["email"] == email), None)

    def add(self, email: str, name: str) -> dict:
        user = {"id": len(self.rows) + 1, "email": email, "name": name}
        self.rows[user["id"]] = user
        return user


# ── services.py: бизнес-правила, ничего не знают про HTTP ──
class EmailAlreadyUsed(Exception):
    pass


class UserService:
    def __init__(self, repo: UserRepository):
        self.repo = repo

    def register(self, data: UserCreate) -> dict:
        if self.repo.get_by_email(data.email):
            raise EmailAlreadyUsed(data.email)
        return self.repo.add(data.email, data.name.strip())


# ── dependencies.py: сборка зависимостей ──
_repo = UserRepository()


def get_user_service() -> UserService:
    return UserService(_repo)


# ── routers/users.py: HTTP-слой ──
router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserOut, status_code=201)
def register(data: UserCreate, service: Annotated[UserService, Depends(get_user_service)]):
    try:
        return service.register(data)
    except EmailAlreadyUsed:
        raise HTTPException(status_code=409, detail="Email уже зарегистрирован")


app = FastAPI()
app.include_router(router)` },
        { t: 'p', text: 'Сервис сообщает о проблеме **своим исключением** (`EmailAlreadyUsed`), а роутер переводит его в HTTP-ответ 409. Так бизнес-слой не зависит от HTTP. Для повторяющихся преобразований используют глобальные обработчики `@app.exception_handler(EmailAlreadyUsed)`.' },
        { t: 'h3', text: '4.3.3. Типичная структура проекта' },
        { t: 'code', lang: 'text', text: `app/
├── main.py              # создание FastAPI, подключение роутеров
├── config.py            # настройки (раздел 4.5)
├── api/
│   ├── dependencies.py  # Depends: сессия, текущий пользователь, сервисы
│   └── routers/         # users.py, orders.py — HTTP-слой
├── schemas/             # Pydantic-модели запросов и ответов
├── services/            # бизнес-логика
├── repositories/        # доступ к данным
├── models/              # модели SQLAlchemy
└── tests/` },
        { t: 'note', text: 'Альтернатива — группировать по фичам, а не по слоям: папка `orders/` с `router.py`, `service.py`, `repository.py`, `schemas.py` внутри. В больших проектах так удобнее: всё про заказы лежит рядом.' },
        { t: 'h3', text: '4.3.4. Чистая архитектура — обзор' },
        { t: 'p', text: '**Clean Architecture** (Роберт Мартин) развивает идею слоёв. Приложение рисуют концентрическими кругами:' },
        { t: 'ul', items: [
          '**сущности** (entities) — в центре: бизнес-объекты и правила, которые не зависят ни от чего (заказ, правила его статусов);',
          '**сценарии использования** (use cases) — операции приложения: «оформить заказ», «отменить заказ»;',
          '**адаптеры интерфейсов** — контроллеры, репозитории, преобразование данных;',
          '**фреймворки и драйверы** — снаружи: FastAPI, SQLAlchemy, PostgreSQL, Kafka.',
        ] },
        { t: 'p', text: 'Главное **правило зависимостей**: зависимости в коде направлены **только внутрь**. Бизнес-логика в центре не импортирует FastAPI и SQLAlchemy. Если сценарию нужно сохранить заказ, он объявляет интерфейс репозитория, а реализация на SQLAlchemy во внешнем круге этот интерфейс реализует — это инверсия зависимостей из SOLID.' },
        { t: 'p', text: '**Гексагональная архитектура** (порты и адаптеры) — та же идея другими словами: ядро приложения общается с внешним миром через **порты** (интерфейсы), а **адаптеры** их реализуют: HTTP-адаптер, адаптер PostgreSQL, адаптер Kafka. Ядро можно запустить и протестировать без единого внешнего адаптера.' },
        { t: 'note', text: 'Чистая архитектура добавляет много слоёв и интерфейсов. Для простого CRUD-сервиса это переусложнение (вспоминаем KISS и YAGNI). Она окупается в больших проектах со сложной бизнес-логикой и долгой жизнью.' },
      ],
      terms: [
        ['слоистая архитектура', 'деление приложения на слои с зависимостями только вниз.'],
        ['DTO', 'data transfer object — объект для передачи данных между слоями или по сети.'],
        ['use case', 'сценарий использования — одна операция приложения.'],
        ['правило зависимостей', 'в чистой архитектуре зависимости направлены только к центру.'],
        ['порт и адаптер', 'интерфейс ядра и его реализация для конкретной технологии.'],
      ],
    },
    {
      id: 'micro',
      num: '4.4',
      title: 'Монолит и микросервисы',
      blocks: [
        { t: 'p', text: '**Монолит** — всё приложение — один развёртываемый блок с одной кодовой базой и обычно одной базой данных. **Микросервисы** — приложение разбито на небольшие независимые сервисы, каждый со своей кодовой базой, своей базой данных и своим развёртыванием, общающиеся по сети.' },
        { t: 'table', caption: 'Таблица 4. Монолит и микросервисы', headers: ['', 'Монолит', 'Микросервисы'], rows: [
          ['разработка в начале', 'быстро и просто', 'медленно: инфраструктура, контракты'],
          ['развёртывание', 'всё целиком; одна ошибка — откатываем всё', 'каждый сервис отдельно, независимые релизы'],
          ['масштабирование', 'только целиком', 'по частям: масштабируем только нагруженный сервис'],
          ['надёжность', 'ошибка может уронить всё приложение', 'отказ одного сервиса изолирован — если правильно спроектировано'],
          ['транзакции', 'обычные транзакции базы', 'распределённые: саги, outbox, eventual consistency'],
          ['вызовы между частями', 'вызов функции — быстро и надёжно', 'сетевой вызов — задержки, таймауты, отказы'],
          ['технологии', 'один стек', 'у каждого сервиса может быть свой'],
          ['команды', 'одна кодовая база мешает при росте команды', 'команда владеет своими сервисами'],
          ['эксплуатация', 'проще: один сервис, одни логи', 'сложно: мониторинг, трассировка, сеть, оркестрация (Kubernetes)'],
          ['отладка', 'один стек вызовов', 'запрос проходит через много сервисов — нужна распределённая трассировка'],
        ] },
        { t: 'note', text: 'Частая ошибка — начинать стартап с микросервисов. Пока непонятны границы предметной области, сервисы нарезаются неправильно, и получается **распределённый монолит**: сервисы не могут выкатываться независимо, но платят всю цену сети. Разумный путь — **модульный монолит**: один развёртываемый сервис, но с чётко разделёнными модулями, которые общаются через интерфейсы. Когда модуль действительно нужно масштабировать или отдать отдельной команде — его выделяют в сервис.' },
        { t: 'h3', text: '4.4.1. API Gateway' },
        { t: 'p', text: '**API Gateway** — единая точка входа для клиентов перед множеством сервисов. Клиент знает один адрес, а шлюз сам решает, куда отправить запрос.' },
        { t: 'ul', items: [
          '**маршрутизация**: `/api/orders/*` → сервис заказов, `/api/users/*` → сервис пользователей;',
          '**сквозные задачи** в одном месте: аутентификация (проверка токена), ограничение частоты запросов, CORS, логирование, TLS;',
          '**агрегация**: собрать ответ из нескольких сервисов в один запрос для клиента;',
          'примеры: Nginx, Kong, Traefik, Envoy, облачные API Gateway.',
        ] },
        { t: 'p', text: '**BFF** (Backend for Frontend) — отдельный шлюз под конкретного клиента: свой для мобильного приложения, свой для веба. Каждый отдаёт данные в удобном именно этому клиенту виде.' },
        { t: 'h3', text: '4.4.2. Как сервисы общаются' },
        { t: 'table', caption: 'Таблица 5. Межсервисное взаимодействие', headers: ['Способ', 'Как', 'Когда'], rows: [
          ['синхронный REST / HTTP', 'сервис вызывает API другого и ждёт ответа', 'нужен ответ сейчас: проверить остаток, получить профиль'],
          ['синхронный gRPC', 'вызов удалённой функции поверх HTTP/2 с Protobuf', 'внутренние высоконагруженные вызовы, строгий контракт'],
          ['асинхронные события', 'сервис публикует событие в Kafka / RabbitMQ, другие подписываются', 'уведомить многих, не ждать, развязать сервисы (глава 3)'],
        ] },
        { t: 'p', text: 'Синхронные вызовы создают **временную связанность**: если сервис B недоступен, сервис A тоже не может ответить, а цепочка A → B → C → D складывает задержки и вероятности отказа. Поэтому при синхронных вызовах обязательны **таймауты**, **повторы** для идемпотентных операций и **circuit breaker** — «предохранитель», который перестаёт вызывать отказавший сервис на время и сразу возвращает ошибку или запасной ответ.' },
        { t: 'code', text: `import httpx
from fastapi import FastAPI, HTTPException

app = FastAPI()
client = httpx.AsyncClient(base_url="http://inventory:8000", timeout=2.0)   # таймаут обязателен


@app.get("/products/{product_id}/availability")
async def availability(product_id: int):
    try:
        r = await client.get(f"/stock/{product_id}")
        r.raise_for_status()
    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Склад не ответил вовремя")
    except httpx.HTTPError:
        raise HTTPException(status_code=502, detail="Склад недоступен")
    return {"product_id": product_id, "in_stock": r.json()["quantity"] > 0}` },
        { t: 'h3', text: '4.4.3. Данные в микросервисах' },
        { t: 'ul', items: [
          '**база данных на сервис** (database per service): сервис владеет своими данными, другие получают их только через его API или события. Общая база на всех сервисов связывает их через схему — это распределённый монолит;',
          'транзакции между сервисами невозможны — используют **сагу**: цепочку локальных транзакций с компенсирующими действиями («отменить резерв», «вернуть деньги») и outbox для надёжной публикации событий;',
          'нужна **наблюдаемость**: централизованные логи, метрики, распределённая трассировка с `trace_id`, который передаётся через все сервисы;',
          'обнаружение сервисов (service discovery) — сервисы находят друг друга по именам: DNS в Kubernetes, Consul.',
        ] },
      ],
      terms: [
        ['монолит', 'приложение, развёртываемое как единое целое.'],
        ['микросервис', 'небольшой независимо развёртываемый сервис со своими данными.'],
        ['модульный монолит', 'монолит с чётко разделёнными внутренними модулями.'],
        ['API Gateway', 'единая точка входа перед множеством сервисов.'],
        ['circuit breaker', 'предохранитель, временно отключающий вызовы отказавшего сервиса.'],
        ['сага', 'распределённая операция из локальных транзакций с компенсациями.'],
      ],
    },
    {
      id: 'config',
      num: '4.5',
      title: 'Конфигурация: переменные окружения и 12-factor app',
      blocks: [
        { t: 'p', text: 'Одно и то же приложение работает в разных окружениях: у разработчика на ноутбуке, на тестовом стенде, в продакшне. Отличаются адрес базы, ключи внешних сервисов, уровень логов. **Конфигурация** — всё, что меняется между окружениями. Её нельзя хардкодить в коде: иначе для каждого окружения нужна своя версия кода, а секреты попадают в git.' },
        { t: 'h3', text: '4.5.1. Переменные окружения' },
        { t: 'p', text: '**Переменные окружения** — пары «имя = значение», которые операционная система передаёт процессу при запуске. Их понимает любой язык и любая платформа: Docker, Kubernetes, CI, облака.' },
        { t: 'code', lang: 'bash', text: `export DATABASE_URL="postgresql+asyncpg://app:secret@localhost:5432/shop"
export DEBUG=false
uvicorn app.main:app` },
        { t: 'p', text: 'В FastAPI настройки удобно читать через **pydantic-settings**: класс описывает все параметры с типами и значениями по умолчанию, значения берутся из переменных окружения или файла `.env`, а при неверном типе или отсутствии обязательной переменной приложение упадёт **сразу при старте** — а не в 3 часа ночи при первом запросе.' },
        { t: 'code', text: `from functools import lru_cache
from typing import Annotated

from fastapi import Depends, FastAPI
from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    database_url: str                      # обязательная: без неё приложение не стартует
    jwt_secret: SecretStr                  # не печатается в логах целиком
    debug: bool = False                    # "false", "0", "true" превращаются в bool
    allowed_origins: list[str] = []        # JSON-список: '["https://kiro.ru"]'
    redis_url: str = "redis://localhost:6379/0"


@lru_cache                                 # читаем окружение один раз
def get_settings() -> Settings:
    return Settings()


app = FastAPI()


@app.get("/health")
def health(settings: Annotated[Settings, Depends(get_settings)]):
    return {"debug": settings.debug}` },
        { t: 'code', lang: 'bash', text: `# .env — только для локальной разработки, в .gitignore
DATABASE_URL=postgresql+asyncpg://app:secret@localhost:5432/shop
JWT_SECRET=local-dev-secret
DEBUG=true` },
        { t: 'note', text: 'Файл `.env` с секретами **никогда не коммитят** — он в `.gitignore`. В репозиторий кладут `.env.example` с именами переменных и безопасными примерами значений. В продакшне секреты передают через секрет-хранилища: Kubernetes Secrets, HashiCorp Vault, облачные Secret Manager (подробно в главе 5).' },
        { t: 'h3', text: '4.5.2. The Twelve-Factor App' },
        { t: 'p', text: '**12-factor app** — методология построения сервисов, которые легко развёртывать в облаке и масштабировать. Сформулирована разработчиками Heroku. На собеседовании достаточно знать главные факторы и уметь объяснить смысл.' },
        { t: 'table', caption: 'Таблица 6. Двенадцать факторов', headers: ['Фактор', 'Суть'], rows: [
          ['1. Кодовая база', 'одна кодовая база в git — много развёртываний (dev, stage, prod)'],
          ['2. Зависимости', 'явно объявлены и изолированы: `requirements.txt` / `pyproject.toml`, виртуальное окружение; ничего не надеемся найти «в системе»'],
          ['3. Конфигурация', 'хранится в переменных окружения, а не в коде'],
          ['4. Сторонние службы', 'база, кеш, брокер, почта — подключаемые ресурсы, адрес которых задаётся конфигурацией; заменить локальную базу на облачную — без правки кода'],
          ['5. Сборка, релиз, выполнение', 'три отдельные стадии: сборка образа → релиз (образ + конфигурация) → запуск; в работающем коде ничего не меняют'],
          ['6. Процессы', 'приложение — процессы **без состояния** (stateless): сессии, файлы, кеш — во внешних хранилищах (Redis, S3, база), а не в памяти и на диске процесса'],
          ['7. Привязка портов', 'сервис сам слушает порт (`uvicorn --port 8000`) и не зависит от внешнего веб-сервера'],
          ['8. Параллелизм', 'масштабирование — запуском большего числа процессов, а не наращиванием одного'],
          ['9. Утилизируемость', 'быстрый старт и корректное завершение по SIGTERM: доработать текущие запросы, закрыть соединения'],
          ['10. Паритет окружений', 'dev, stage и prod максимально похожи: те же версии базы и сервисов (Docker помогает)'],
          ['11. Логи', 'пишутся в stdout как поток событий; собирает и хранит их окружение, а не приложение'],
          ['12. Административные процессы', 'миграции и разовые скрипты запускаются как отдельные процессы в том же окружении и с тем же кодом'],
        ] },
        { t: 'p', text: 'Чаще всего спрашивают факторы **3** (конфигурация в окружении), **6** (stateless-процессы — без этого нельзя масштабировать, поставив несколько экземпляров за балансировщиком), **9** (graceful shutdown) и **11** (логи в stdout).' },
      ],
      terms: [
        ['переменная окружения', 'пара имя — значение, передаваемая процессу при запуске.'],
        ['pydantic-settings', 'библиотека для типизированных настроек из окружения и .env.'],
        ['stateless', 'процесс не хранит состояние между запросами.'],
        ['graceful shutdown', 'корректное завершение: доработать запросы и закрыть ресурсы.'],
      ],
    },
  ],
}
