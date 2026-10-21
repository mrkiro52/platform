// Индивидуальная программа «Backend-разработка», глава 6 — тестирование.
// Пирамида тестов, pytest (фикстуры, параметризация, моки unittest.mock, покрытие),
// тестирование API и базы данных (TestClient, dependency_overrides, тестовая БД, testcontainers),
// TDD. Примеры — на Python и FastAPI. Задание — вопросы backend-6-quiz.js.

export default {
  num: 6,
  title: 'Тестирование',
  summary: 'Зачем нужны автотесты, пирамида тестов: unit, интеграционные и e2e, тестовые двойники, pytest: assert, фикстуры и их области видимости, conftest.py, параметризация, моки unittest.mock: Mock, MagicMock, AsyncMock, patch, покрытие кода coverage, тестирование API FastAPI через TestClient и httpx, подмена зависимостей, тестовая база с откатом транзакций, testcontainers, TDD.',
  intro: 'Автотесты — это то, что позволяет менять код без страха: прогнал тесты за минуту — и знаешь, что ничего не сломал. В командах код без тестов обычно не проходит ревью, а на собеседовании junior-бэкендера спрашивают, чем unit-тест отличается от интеграционного, что такое фикстура и мок, как протестировать эндпоинт FastAPI и откуда в тестах берётся база данных. В этой главе — все эти темы с примерами на pytest и FastAPI.',
  sections: [
    {
      id: 'pyramid',
      num: '6.1',
      divider: 'Основы',
      title: 'Пирамида тестов: unit, интеграционные, e2e',
      blocks: [
        { t: 'p', text: '**Автотест** — код, который запускает твой код с заданными входными данными и проверяет результат. Тесты нужны, чтобы:' },
        { t: 'ul', items: [
          '**ловить регрессии** — когда новая правка ломает то, что раньше работало;',
          '**безопасно рефакторить** — переписал функцию, тесты зелёные, значит поведение не изменилось;',
          '**документировать поведение** — тест показывает, как функцию вызывать и что она возвращает в граничных случаях;',
          '**ускорять разработку** — проверить сценарий тестом быстрее, чем каждый раз вручную кликать в Swagger.',
        ] },
        { t: 'h3', text: '6.1.1. Уровни тестов' },
        { t: 'table', caption: 'Таблица 1. Три уровня', headers: ['Уровень', 'Что проверяет', 'Скорость', 'Пример'], rows: [
          ['**unit** (модульные)', 'одну функцию или класс в изоляции, без базы, сети и файлов; зависимости заменены заглушками', 'миллисекунды', 'расчёт скидки, валидация, сервис с фейковым репозиторием'],
          ['**интеграционные**', 'взаимодействие компонентов с реальной инфраструктурой: код + база, код + Redis, эндпоинт целиком', 'секунды', 'репозиторий сохраняет и читает пользователя из настоящего PostgreSQL; POST /users через TestClient'],
          ['**e2e** (end-to-end, сквозные)', 'весь сценарий через систему, как пользователь: фронтенд, бэкенд, база, очереди', 'минуты', 'регистрация → вход → оформление заказа в развёрнутом стенде'],
        ] },
        { t: 'h3', text: '6.1.2. Пирамида' },
        { t: 'p', text: '**Пирамида тестов** (Майк Кон) — рекомендация по пропорциям: в основании **много** быстрых unit-тестов, выше — **меньше** интеграционных, на вершине — **немного** e2e.' },
        { t: 'table', caption: 'Таблица 2. Пирамида сверху вниз', headers: ['Уровень', 'Сколько', 'Цена теста'], rows: [
          ['e2e', 'несколько ключевых сценариев', 'медленные, хрупкие, дорогие в поддержке'],
          ['интеграционные', 'десятки–сотни', 'секунды; реальная база, эндпоинты'],
          ['unit', 'сотни–тысячи', 'миллисекунды; стабильные и дешёвые'],
        ] },
        { t: 'ul', items: [
          'чем выше уровень — тем **больше уверенности**, что система работает целиком, но тем тесты **медленнее**, **хрупче** (падают из-за сети, таймингов, данных) и тем сложнее понять **причину** падения;',
          'unit-тест упал — сразу видно, какая функция сломалась; e2e упал — ищи, где в цепочке из десяти компонентов проблема;',
          '**антипаттерн «рожок мороженого»**: почти всё проверяется вручную и e2e-тестами, unit-тестов мало — тесты идут часами и постоянно «мигают»;',
          'для бэкенд-сервисов часто говорят о **«трофее»** или **«сотах»**: основной упор на интеграционные тесты API с реальной базой — они ловят больше реальных ошибок, чем unit-тесты с моками, а с контейнерами работают достаточно быстро.',
        ] },
        { t: 'h3', text: '6.1.3. Свойства хорошего теста' },
        { t: 'ul', items: [
          '**быстрый** и **независимый** — не зависит от порядка запуска и от других тестов, не оставляет мусор в базе;',
          '**детерминированный** — один и тот же результат при каждом запуске. «Мигающий» (flaky) тест хуже отсутствия теста: ему перестают верить;',
          '**проверяет поведение, а не реализацию** — после рефакторинга без изменения поведения тест не должен ломаться;',
          '**читаемый** — структура **Arrange–Act–Assert** (Given–When–Then): подготовка данных, действие, проверка;',
          'одна причина упасть — тест проверяет один сценарий, а имя говорит какой: `test_discount_not_applied_to_sale_items`.',
        ] },
        { t: 'h3', text: '6.1.4. Тестовые двойники' },
        { t: 'table', caption: 'Таблица 3. Чем подменяют зависимости', headers: ['Двойник', 'Что делает', 'Пример'], rows: [
          ['**dummy**', 'передаётся, но не используется — лишь бы сигнатура сошлась', '`None` вместо логгера'],
          ['**stub** (заглушка)', 'возвращает заранее заданные ответы', 'курс валют всегда 100'],
          ['**fake**', 'рабочая упрощённая реализация', 'репозиторий на словаре вместо базы, SQLite вместо PostgreSQL'],
          ['**mock**', 'заглушка, которая **запоминает вызовы**, — тест проверяет, что её вызвали с нужными аргументами', 'проверить, что письмо отправлено ровно один раз на нужный адрес'],
          ['**spy**', 'обёртка над настоящим объектом, записывающая вызовы', '`patch.object(obj, "m", wraps=obj.m)`'],
        ] },
        { t: 'p', text: 'В разговоре все двойники часто называют «моками». Разница важна в одном: stub отвечает на вопрос «что вернуть», mock — «как меня вызвали».' },
      ],
      terms: [
        ['unit-тест', 'тест одной функции или класса в изоляции.'],
        ['интеграционный тест', 'тест взаимодействия кода с реальной инфраструктурой.'],
        ['e2e', 'сквозной тест всего сценария через систему.'],
        ['пирамида тестов', 'много unit, меньше интеграционных, немного e2e.'],
        ['flaky-тест', 'тест, который то проходит, то падает без изменений в коде.'],
        ['AAA', 'Arrange–Act–Assert — структура теста.'],
        ['мок', 'двойник, который записывает свои вызовы для проверки.'],
      ],
    },
    {
      id: 'pytest',
      num: '6.2',
      title: 'pytest: фикстуры, параметризация, моки, покрытие',
      blocks: [
        { t: 'p', text: '**pytest** — стандартный фреймворк тестирования в Python. Тесты — обычные функции с именем `test_*` в файлах `test_*.py`, проверки — обычный `assert`: при падении pytest сам покажет, какие значения не совпали.' },
        { t: 'code', text: `# app/pricing.py
def apply_discount(price: float, percent: float) -> float:
    if not 0 <= percent <= 100:
        raise ValueError("percent must be between 0 and 100")
    return round(price * (1 - percent / 100), 2)


# tests/test_pricing.py
import pytest
# from app.pricing import apply_discount


def test_apply_discount():
    assert apply_discount(1000, 15) == 850


def test_apply_discount_rejects_negative_percent():
    with pytest.raises(ValueError, match="between 0 and 100"):   # ожидаем исключение
        apply_discount(1000, -5)


def test_float_result():
    assert 0.1 + 0.2 == pytest.approx(0.3)     # дробные числа сравнивают приблизительно` },
        { t: 'code', lang: 'bash', text: `pytest                       # найти и запустить все тесты
pytest tests/test_pricing.py -v    # один файл, подробный вывод
pytest -k discount           # только тесты, в имени которых есть discount
pytest -x                    # остановиться на первом падении
pytest --lf                  # перезапустить только упавшие в прошлый раз` },
        { t: 'h3', text: '6.2.1. Фикстуры' },
        { t: 'p', text: '**Фикстура** — функция с декоратором `@pytest.fixture`, которая готовит данные или ресурсы для теста. Тест получает фикстуру, просто указав её имя в параметрах — pytest сам вызовет её и передаст результат. Это внедрение зависимостей для тестов.' },
        { t: 'code', text: `import pytest


class Cart:
    def __init__(self):
        self.items: list[tuple[str, float]] = []

    def add(self, name: str, price: float) -> None:
        self.items.append((name, price))

    def total(self) -> float:
        return sum(price for _, price in self.items)


@pytest.fixture
def cart() -> Cart:
    return Cart()                    # каждый тест получает новую пустую корзину


@pytest.fixture
def cart_with_items(cart: Cart) -> Cart:      # фикстура может зависеть от другой
    cart.add("книга", 500)
    cart.add("ручка", 50)
    return cart


def test_empty_cart_total(cart):
    assert cart.total() == 0


def test_total(cart_with_items):
    assert cart_with_items.total() == 550` },
        { t: 'p', text: 'Фикстура с `yield` выполняет **подготовку до** теста и **очистку после** — даже если тест упал:' },
        { t: 'code', text: `import pytest


@pytest.fixture
def temp_file(tmp_path):               # tmp_path — встроенная фикстура pytest
    path = tmp_path / "data.txt"
    path.write_text("hello")
    yield path                         # здесь выполняется тест
    path.unlink(missing_ok=True)       # очистка (teardown)


def test_read(temp_file):
    assert temp_file.read_text() == "hello"` },
        { t: 'table', caption: 'Таблица 4. Область видимости фикстуры (scope)', headers: ['scope', 'Создаётся', 'Когда использовать'], rows: [
          ['`function` (по умолчанию)', 'заново для каждого теста', 'данные, которые тест может изменить'],
          ['`class`', 'один раз на класс тестов', 'редко'],
          ['`module`', 'один раз на файл', 'дорогой ресурс, общий для файла'],
          ['`session`', 'один раз на весь запуск', 'контейнер с базой, движок SQLAlchemy, приложение'],
        ] },
        { t: 'ul', items: [
          'общие фикстуры кладут в `conftest.py` — pytest подхватывает их автоматически для всех тестов в папке и подпапках, импортировать не нужно;',
          '`@pytest.fixture(autouse=True)` — фикстура применяется ко всем тестам без явного указания;',
          'полезные встроенные фикстуры: `tmp_path` (временная папка), `monkeypatch` (подменить атрибут, переменную окружения), `capsys` (перехват вывода), `caplog` (перехват логов).',
        ] },
        { t: 'h3', text: '6.2.2. Параметризация' },
        { t: 'p', text: '`@pytest.mark.parametrize` запускает один тест на нескольких наборах данных — вместо копирования теста. Каждый набор — отдельный тест в отчёте.' },
        { t: 'code', text: `import pytest


def is_valid_password(p: str) -> bool:
    return len(p) >= 8 and any(c.isdigit() for c in p) and any(c.isalpha() for c in p)


@pytest.mark.parametrize(
    ("password", "expected"),
    [
        ("abc12345", True),
        ("short1", False),          # меньше 8 символов
        ("onlyletters", False),     # нет цифр
        ("12345678", False),        # нет букв
        ("", False),
    ],
    ids=["ok", "too-short", "no-digits", "no-letters", "empty"],
)
def test_is_valid_password(password, expected):
    assert is_valid_password(password) is expected` },
        { t: 'p', text: 'Другие полезные метки: `@pytest.mark.skip` / `skipif(условие)` — пропустить, `@pytest.mark.xfail` — ожидаемо падающий тест, свои метки вроде `@pytest.mark.slow` — чтобы запускать `pytest -m "not slow"`.' },
        { t: 'h3', text: '6.2.3. Моки: unittest.mock' },
        { t: 'p', text: 'В unit-тестах внешние зависимости — платёжный шлюз, отправка писем, HTTP-запросы, текущее время — подменяют **моками**. Модуль `unittest.mock` входит в стандартную библиотеку.' },
        { t: 'code', text: `from unittest.mock import Mock

gateway = Mock()
gateway.charge.return_value = {"status": "ok", "id": "pay_1"}   # что вернуть

result = gateway.charge(amount=990, currency="RUB")
print(result["status"])

gateway.charge.assert_called_once_with(amount=990, currency="RUB")   # как вызвали
print(gateway.charge.call_count)

gateway.refund.side_effect = TimeoutError("gateway timeout")   # вызов бросит исключение
try:
    gateway.refund("pay_1")
except TimeoutError as e:
    print("ошибка:", e)`, out: `ok
1
ошибка: gateway timeout` },
        { t: 'ul', items: [
          '`Mock` — любой атрибут и вызов возвращают новый мок; `MagicMock` — то же плюс «магические» методы (`__len__`, `__iter__`, контекстный менеджер); `AsyncMock` — для `async`-функций: вызов возвращает корутину;',
          '`return_value` — что вернуть; `side_effect` — исключение, список значений по очереди или функция;',
          'проверки: `assert_called_once()`, `assert_called_with(...)`, `assert_not_called()`, `call_count`, `call_args`;',
          '`Mock(spec=PaymentGateway)` — мок разрешает только методы настоящего класса: опечатка в имени метода вызовет ошибку, а не тихо пройдёт.',
        ] },
        { t: 'p', text: '`patch` временно подменяет объект **там, где его используют**, и возвращает оригинал после теста. Пример: сервис заказа вызывает асинхронный платёжный клиент и отправку письма.' },
        { t: 'code', text: `# app/orders.py
async def charge(user_id: int, amount: int) -> str:     # реальный HTTP-вызов платёжки
    raise RuntimeError("в тестах не вызывается")


def send_email(user_id: int, text: str) -> None:        # реальная отправка письма
    raise RuntimeError("в тестах не вызывается")


async def checkout(user_id: int, amount: int) -> str:
    payment_id = await charge(user_id, amount)
    send_email(user_id, f"Оплачено {amount} ₽")
    return payment_id


# tests/test_orders.py
from unittest.mock import AsyncMock, patch

import pytest

from app.orders import checkout


@pytest.mark.asyncio                             # плагин pytest-asyncio
async def test_checkout_charges_and_sends_email():
    with patch("app.orders.charge", new_callable=AsyncMock, return_value="pay_1") as charge_mock, \\
         patch("app.orders.send_email") as email_mock:
        payment_id = await checkout(user_id=7, amount=990)

    assert payment_id == "pay_1"
    charge_mock.assert_awaited_once_with(7, 990)
    email_mock.assert_called_once_with(7, "Оплачено 990 ₽")` },
        { t: 'note', text: 'Патчить нужно **имя в модуле, где оно используется**, а не где определено. Если в `app/orders.py` написано `from app.mail import send_email`, то патчат `"app.orders.send_email"` — иначе модуль заказов продолжит вызывать настоящую функцию.' },
        { t: 'ul', items: [
          '`patch` работает как контекстный менеджер, декоратор `@patch("...")` и через фикстуру `monkeypatch.setattr(...)` в pytest;',
          '`patch.object(SomeClass, "method")` — подменить метод конкретного класса;',
          '**не злоупотребляй моками**: тест, где замокано всё, проверяет лишь то, что код вызывает моки в нужном порядке, — и ломается при любом рефакторинге. Мокают **границы системы** (сеть, внешние API, время, случайность), а свою логику и базу лучше проверять по-настоящему.',
        ] },
        { t: 'h3', text: '6.2.4. Покрытие кода' },
        { t: 'p', text: '**Покрытие** (coverage) — какая доля строк кода выполнилась во время тестов. Плагин `pytest-cov` (на основе `coverage.py`):' },
        { t: 'code', lang: 'bash', text: `pytest --cov=app --cov-report=term-missing   # процент и номера непокрытых строк
pytest --cov=app --cov-branch                 # покрытие ветвлений: проверены ли обе ветки if
pytest --cov=app --cov-fail-under=80          # упасть в CI, если покрытие ниже 80%` },
        { t: 'ul', items: [
          '**покрытие строк** (line) — выполнилась ли строка; **покрытие ветвлений** (branch) — прошли ли обе ветки каждого `if`. Второе строже;',
          'отчёт полезен, чтобы найти **непротестированный код** — например, ветку обработки ошибки, которую никто не проверял;',
          '**высокое покрытие не значит хорошие тесты**: тест без единого `assert` даёт 100% покрытия и ничего не проверяет. Покрытие показывает, что код **выполнялся**, но не что результат **проверен**;',
          'разумная цель для бизнес-логики — 70–90%; гнаться за 100% обычно дорого и бессмысленно. Качество тестов проверяют **мутационным тестированием** (mutmut): в код вносят мелкие ошибки и смотрят, упадут ли тесты.',
        ] },
      ],
      terms: [
        ['pytest', 'основной фреймворк тестирования в Python.'],
        ['фикстура', 'функция, которая готовит данные или ресурс для теста.'],
        ['conftest.py', 'файл с общими фикстурами для папки тестов.'],
        ['параметризация', 'запуск одного теста на нескольких наборах данных.'],
        ['patch', 'временная подмена объекта в модуле на время теста.'],
        ['AsyncMock', 'мок для асинхронных функций.'],
        ['покрытие', 'доля кода, выполненного во время тестов.'],
      ],
    },
    {
      id: 'api-db',
      num: '6.3',
      divider: 'Практика',
      title: 'Тестирование API и базы данных',
      blocks: [
        { t: 'h3', text: '6.3.1. TestClient' },
        { t: 'p', text: 'FastAPI предоставляет `TestClient` — он вызывает приложение напрямую, без запуска сервера и сети, но через весь стек: маршрутизацию, валидацию Pydantic, зависимости, обработчики ошибок. Это интеграционный тест эндпоинта.' },
        { t: 'code', text: `from fastapi import FastAPI, HTTPException
from fastapi.testclient import TestClient
from pydantic import BaseModel, EmailStr

app = FastAPI()
USERS: dict[int, dict] = {}


class UserIn(BaseModel):
    email: EmailStr
    name: str


@app.post("/users", status_code=201)
def create_user(data: UserIn):
    if any(u["email"] == data.email for u in USERS.values()):
        raise HTTPException(status_code=409, detail="Email уже занят")
    user = {"id": len(USERS) + 1, **data.model_dump()}
    USERS[user["id"]] = user
    return user


@app.get("/users/{user_id}")
def get_user(user_id: int):
    if user_id not in USERS:
        raise HTTPException(status_code=404, detail="Не найден")
    return USERS[user_id]


client = TestClient(app)


def test_create_and_get_user():
    r = client.post("/users", json={"email": "anna@example.com", "name": "Анна"})
    assert r.status_code == 201
    user_id = r.json()["id"]

    r = client.get(f"/users/{user_id}")
    assert r.status_code == 200
    assert r.json()["email"] == "anna@example.com"


def test_duplicate_email_returns_409():
    client.post("/users", json={"email": "bob@example.com", "name": "Боб"})
    r = client.post("/users", json={"email": "bob@example.com", "name": "Боб"})
    assert r.status_code == 409


def test_invalid_email_returns_422():
    r = client.post("/users", json={"email": "не-email", "name": "X"})
    assert r.status_code == 422          # валидация Pydantic


def test_unknown_user_returns_404():
    assert client.get("/users/999").status_code == 404` },
        { t: 'p', text: 'Что проверять в тестах API: **счастливый путь**, **коды ошибок** (400, 401, 403, 404, 409, 422), **граничные значения**, **права доступа** (чужой пользователь получает 403 или 404), формат ответа.' },
        { t: 'p', text: 'Для асинхронных тестов используют `httpx.AsyncClient` с `ASGITransport` — тогда в тесте можно `await`-ить и асинхронный код, и запросы:' },
        { t: 'code', text: `import pytest
from httpx import ASGITransport, AsyncClient


@pytest.mark.asyncio
async def test_get_unknown_user_async():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        r = await ac.get("/users/999")
    assert r.status_code == 404` },
        { t: 'h3', text: '6.3.2. Подмена зависимостей' },
        { t: 'p', text: 'Главный плюс `Depends` для тестов — `app.dependency_overrides`: любую зависимость можно заменить на время теста, не трогая код приложения. Так подставляют тестовую сессию базы, фейкового текущего пользователя, заглушку внешнего сервиса.' },
        { t: 'code', text: `from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.testclient import TestClient

app = FastAPI()


def get_current_user() -> dict:
    raise NotImplementedError("в проде — проверка JWT")


class PaymentClient:
    def balance(self, user_id: int) -> int:
        raise NotImplementedError("в проде — HTTP-запрос")


def get_payment_client() -> PaymentClient:
    return PaymentClient()


@app.get("/me/balance")
def my_balance(user: Annotated[dict, Depends(get_current_user)],
               payments: Annotated[PaymentClient, Depends(get_payment_client)]):
    return {"user_id": user["id"], "balance": payments.balance(user["id"])}


class FakePayments:
    def balance(self, user_id: int) -> int:
        return 1500


def test_my_balance():
    app.dependency_overrides[get_current_user] = lambda: {"id": 7, "role": "customer"}
    app.dependency_overrides[get_payment_client] = lambda: FakePayments()
    try:
        r = TestClient(app).get("/me/balance")
        assert r.json() == {"user_id": 7, "balance": 1500}
    finally:
        app.dependency_overrides.clear()     # не забыть очистить, иначе подмена протечёт в другие тесты` },
        { t: 'h3', text: '6.3.3. Тестовая база данных' },
        { t: 'p', text: 'Репозитории и эндпоинты, работающие с базой, проверяют на **настоящей базе**, а не на моках: моки не поймают ошибку в SQL, нарушение уникального индекса или неправильную транзакцию. Правила:' },
        { t: 'ul', items: [
          '**никогда не запускать тесты на рабочей базе** — только отдельная тестовая база;',
          'та же СУБД, что в продакшне: **SQLite вместо PostgreSQL** быстрее поднять, но поведение отличается (типы, `JSONB`, блокировки, `ON CONFLICT`) — тесты пройдут, а прод упадёт;',
          'схема создаётся миграциями (Alembic) или `metadata.create_all` перед тестами;',
          '**изоляция**: каждый тест начинается с чистого состояния. Самый быстрый способ — выполнять каждый тест **внутри транзакции и откатывать её** в конце; альтернатива — `TRUNCATE` всех таблиц после теста.',
        ] },
        { t: 'p', text: 'Фикстуры в `conftest.py`: движок на всю сессию, на каждый тест — соединение с открытой транзакцией, которая откатывается после теста, и клиент с подменённой зависимостью `get_session`.' },
        { t: 'code', text: `# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.db import Base, get_session        # get_session — зависимость из главы 4
from app.main import app

TEST_DB_URL = "postgresql+psycopg://test:test@localhost:5433/test"


@pytest.fixture(scope="session")
def engine():
    engine = create_engine(TEST_DB_URL)
    Base.metadata.create_all(engine)         # схема — один раз на запуск
    yield engine
    Base.metadata.drop_all(engine)
    engine.dispose()


@pytest.fixture
def db_session(engine):
    connection = engine.connect()
    transaction = connection.begin()          # внешняя транзакция на весь тест
    session = Session(bind=connection, join_transaction_mode="create_savepoint")
    yield session                             # commit() в коде станет SAVEPOINT
    session.close()
    transaction.rollback()                    # всё, что тест записал, исчезает
    connection.close()


@pytest.fixture
def client(db_session):
    app.dependency_overrides[get_session] = lambda: db_session
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


# tests/test_users_api.py
def test_create_user_persists(client, db_session):
    r = client.post("/users", json={"email": "anna@example.com", "name": "Анна"})
    assert r.status_code == 201
    # проверяем, что запись действительно в базе
    from app.models import User
    assert db_session.get(User, r.json()["id"]).email == "anna@example.com"` },
        { t: 'h3', text: '6.3.4. testcontainers' },
        { t: 'p', text: 'Откуда взять PostgreSQL для тестов? Можно держать его в docker-compose, но удобнее **testcontainers**: библиотека сама запускает Docker-контейнер с нужной базой перед тестами и удаляет его после. Каждый разработчик и CI получают одинаковое чистое окружение одной командой `pytest` — нужен только Docker.' },
        { t: 'code', text: `# tests/conftest.py
import pytest
from sqlalchemy import create_engine
from testcontainers.community.postgres import PostgresContainer

from app.db import Base


@pytest.fixture(scope="session")
def engine():
    with PostgresContainer("postgres:16-alpine", driver="psycopg") as pg:   # контейнер на весь запуск
        engine = create_engine(pg.get_connection_url())
        Base.metadata.create_all(engine)
        yield engine
        engine.dispose()
    # при выходе из with контейнер останавливается и удаляется` },
        { t: 'ul', items: [
          'контейнер поднимается **один раз на сессию** (`scope="session"`) — несколько секунд на старте, дальше тесты идут быстро за счёт отката транзакций;',
          'есть модули для Redis, Kafka, RabbitMQ, MongoDB, MinIO и других — так же тестируют работу с очередями из главы 3;',
          'в CI (GitHub Actions, GitLab CI) тесты с контейнерами работают, если раннеру доступен Docker; альтернатива — `services:` в описании пайплайна.',
        ] },
        { t: 'h3', text: '6.3.5. Тестовые данные' },
        { t: 'ul', items: [
          'объекты для тестов создают **фабриками**: функция-фикстура `make_user(**overrides)` или библиотеки **factory_boy**, **polyfactory** — данные по умолчанию плюс то, что важно для конкретного теста;',
          '**Faker** генерирует правдоподобные имена, адреса, email;',
          'внешние HTTP-сервисы в интеграционных тестах подменяют библиотеками **respx** (для httpx) или **responses** (для requests) — они перехватывают запросы и возвращают заданные ответы;',
          'время фиксируют библиотекой **freezegun** или `time-machine` — тесты не должны зависеть от того, когда их запустили.',
        ] },
      ],
      terms: [
        ['TestClient', 'клиент FastAPI для вызова приложения в тестах без сервера.'],
        ['dependency_overrides', 'подмена зависимостей FastAPI на время теста.'],
        ['тестовая БД', 'отдельная база только для тестов.'],
        ['откат транзакции', 'способ изоляции: всё, что записал тест, отменяется.'],
        ['testcontainers', 'библиотека для запуска Docker-контейнеров из тестов.'],
        ['фабрика данных', 'функция, создающая тестовые объекты с разумными значениями.'],
      ],
    },
    {
      id: 'tdd',
      num: '6.4',
      title: 'TDD — разработка через тестирование',
      blocks: [
        { t: 'p', text: '**TDD** (Test-Driven Development, Кент Бек) — подход, при котором тест пишут **до** кода. Работа идёт короткими циклами по несколько минут:' },
        { t: 'flow', steps: ['Red: тест падает', 'Green: минимальный код', 'Refactor: улучшить код', 'следующий тест'] },
        { t: 'ol', items: [
          '**Red** — написать маленький тест на ещё не существующее поведение; запустить и убедиться, что он падает (значит, тест действительно что-то проверяет);',
          '**Green** — написать минимальный код, чтобы тест прошёл, — даже некрасивый;',
          '**Refactor** — улучшить код и тесты, не меняя поведения; тесты остаются зелёными.',
        ] },
        { t: 'h4', text: 'Пример цикла: доставка бесплатна от 3000 ₽' },
        { t: 'p', text: '**Red.** Тест на функцию, которой ещё нет:' },
        { t: 'code', text: `def test_delivery_free_from_3000():
    assert delivery_price(3000) == 0


def test_delivery_costs_299_below_3000():
    assert delivery_price(2999) == 299` },
        { t: 'p', text: '**Green.** Минимальная реализация:' },
        { t: 'code', text: `def delivery_price(order_total: int) -> int:
    return 0 if order_total >= 3000 else 299` },
        { t: 'p', text: '**Refactor.** Выносим магические числа в константы `FREE_DELIVERY_FROM` и `DELIVERY_PRICE`, тесты по-прежнему зелёные. Следующий цикл — новый тест: «для отрицательной суммы — ValueError».' },
        { t: 'h3', text: '6.4.1. Плюсы и минусы' },
        { t: 'split', columns: [
          { title: 'Плюсы', tone: 'yes', items: [
            'код сразу покрыт тестами — «потом допишу тесты» не наступает',
            'тест — первый пользователь кода: неудобный интерфейс заметен сразу',
            'код получается слабо связанным — иначе его трудно тестировать',
            'маленькие шаги — меньше времени в отладчике',
            'тесты описывают требования',
          ] },
          { title: 'Минусы', tone: 'no', items: [
            'медленнее на старте, нужна привычка',
            'неудобен, когда требования неясны и идёт исследование (прототип)',
            'плохо подходит для UI и вёрстки',
            'тесты, привязанные к реализации, тормозят рефакторинг',
          ] },
        ] },
        { t: 'ul', items: [
          '**BDD** (Behavior-Driven Development) — развитие TDD: тесты описывают поведение языком бизнеса в формате Given–When–Then; инструменты — pytest-bdd, behave;',
          'на практике TDD часто применяют выборочно: для бизнес-логики с чёткими правилами (расчёт цены, статусы заказа) и **для исправления багов** — сначала пишут тест, воспроизводящий баг, видят, что он падает, затем чинят. Такой тест гарантирует, что баг не вернётся;',
          'на собеседовании важно не утверждать «всегда пишу по TDD», а объяснить цикл red–green–refactor и где этот подход полезен.',
        ] },
        { t: 'h3', text: '6.4.2. Тесты в CI' },
        { t: 'p', text: 'Тесты ценны, только если запускаются **автоматически**: в CI (GitHub Actions, GitLab CI) на каждый push и pull request прогоняются линтеры, unit- и интеграционные тесты, считается покрытие. Пока проверки красные, ветку нельзя влить в main. Быстрые тесты разработчик запускает локально перед коммитом, медленные e2e — например, раз в ночь или перед релизом.' },
      ],
      terms: [
        ['TDD', 'разработка, при которой тест пишут до кода.'],
        ['red–green–refactor', 'цикл TDD: падающий тест, минимальный код, улучшение.'],
        ['BDD', 'описание поведения в формате Given–When–Then.'],
        ['CI', 'автоматический запуск проверок на каждое изменение.'],
      ],
    },
  ],
}
