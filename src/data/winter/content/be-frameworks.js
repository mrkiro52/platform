// Зимний лагерь, направление «Backend-разработка»: веб-фреймворки.
// Разметка: **жирный**, _курсив_, `код`.

export default {
  title: 'Веб-фреймворки: FastAPI, Django, WSGI и ASGI',
  intro: 'Фреймворк берёт на себя рутину: разбор HTTP-запроса, маршрутизацию, валидацию, сериализацию ответа. Твоя задача — бизнес-логика. В российских вакансиях на Python-бэкенд чаще всего встречаются FastAPI и Django, поэтому глава устроена так: FastAPI — подробно, как основной инструмент; Django — обзорно, чтобы ты понимал его устройство и мог поддержать разговор; и отдельно — что стоит между фреймворком и интернетом.',
  sections: [
    {
      id: 'servers', title: 'Как запрос доходит до твоего кода: WSGI, ASGI, Uvicorn, Gunicorn',
      blocks: [
        { t: 'p', text: 'Фреймворк сам не слушает сеть. Между интернетом и функцией-обработчиком стоит несколько слоёв.' },
        { t: 'flow', steps: ['клиент', 'Nginx (reverse proxy, TLS)', 'сервер приложений: Gunicorn / Uvicorn', 'интерфейс WSGI или ASGI', 'фреймворк', 'твой обработчик'] },
        { t: 'p', text: '**WSGI** и **ASGI** — стандарты, описывающие, как сервер приложений вызывает Python-приложение. Благодаря им любой сервер работает с любым фреймворком.' },
        { t: 'table', caption: 'WSGI и ASGI', headers: ['', 'WSGI', 'ASGI'], rows: [
          ['Модель', 'синхронная: один запрос занимает воркер от начала до конца', 'асинхронная: один воркер ведёт тысячи соединений в событийном цикле'],
          ['Приложение — это', 'функция `app(environ, start_response)`', 'корутина `async app(scope, receive, send)`'],
          ['Протоколы', 'только HTTP «запрос — ответ»', 'HTTP, WebSocket, длинные соединения, события lifespan'],
          ['Серверы', 'Gunicorn, uWSGI', 'Uvicorn, Hypercorn, Granian'],
          ['Фреймворки', 'Flask, Django (классический режим)', 'FastAPI, Starlette, Litestar, Django (асинхронный режим)'],
        ] },
        { t: 'h3', text: 'Uvicorn и Gunicorn' },
        { t: 'ul', items: [
          '**Uvicorn** — ASGI-сервер: один процесс, один событийный цикл (на быстрой реализации uvloop).',
          '**Gunicorn** — менеджер процессов: запускает несколько воркеров, перезапускает упавшие, умеет плавную перезагрузку. Сам по себе он WSGI-сервер.',
          'Один процесс использует одно ядро (вспомни GIL), поэтому в продакшене запускают несколько воркеров: `uvicorn app.main:app --workers 4` или Gunicorn с воркерами Uvicorn.',
          'В Kubernetes чаще запускают один процесс Uvicorn на контейнер, а масштабируют числом контейнеров.',
          '**Nginx** перед приложением завершает TLS, отдаёт статику, буферизует медленных клиентов и ограничивает размер и частоту запросов.',
        ] },
        { t: 'code', text: `uvicorn app.main:app --reload                       # разработка: перезапуск при изменении кода
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
gunicorn app.main:app -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000` },
        { t: 'note', text: 'Вопрос с собеседования: «Чем WSGI отличается от ASGI?» Короткий ответ: WSGI синхронный и умеет только запрос — ответ; ASGI асинхронный, держит много одновременных соединений в одном потоке и поддерживает WebSocket. FastAPI — ASGI-фреймворк, поэтому ему нужен Uvicorn, а не чистый Gunicorn.' },
      ],
    },
    {
      id: 'fastapi', title: 'FastAPI: приложение, маршруты и параметры',
      blocks: [
        { t: 'p', text: 'FastAPI построен на двух библиотеках: **Starlette** (ASGI-инструментарий: маршрутизация, middleware, WebSocket) и **Pydantic** (валидация данных). Главная идея — ты описываешь типы в сигнатуре функции, а фреймворк по ним сам разбирает запрос, проверяет данные, формирует ответ и генерирует документацию OpenAPI.' },
        { t: 'code', text: `from fastapi import FastAPI, APIRouter, Query, Path, status

app = FastAPI(title='Shop API')
router = APIRouter(prefix='/orders', tags=['orders'])

@router.get('/{order_id}', response_model=OrderOut)
async def get_order(
    order_id: int = Path(gt=0),                 # параметр пути: /orders/42
    expand: bool = Query(default=False),        # параметр строки запроса: ?expand=true
):
    ...

@router.post('', response_model=OrderOut, status_code=status.HTTP_201_CREATED)
async def create_order(payload: OrderCreate):   # Pydantic-модель → тело запроса (JSON)
    ...

app.include_router(router, prefix='/api/v1')` },
        { t: 'table', caption: 'Откуда FastAPI берёт значение аргумента', headers: ['Как объявлен аргумент', 'Источник'], rows: [
          ['имя совпадает с `{параметром}` в пути', 'путь'],
          ['простой тип: `int`, `str`, `bool`', 'строка запроса'],
          ['Pydantic-модель', 'тело запроса в JSON'],
          ['`Header()`, `Cookie()`, `Form()`, `File()`', 'заголовок, cookie, форма, файл'],
          ['`Depends(...)`', 'результат зависимости'],
        ] },
        { t: 'ul', items: [
          '**Роутеры** (`APIRouter`) делят приложение на модули: `users`, `orders`, `payments` — каждый со своим префиксом и тегом.',
          '`response_model` задаёт схему ответа: лишние поля (например, хеш пароля) будут отфильтрованы, а документация получит точное описание.',
          'Неверные данные фреймворк отклоняет сам — ответом **422** с перечнем ошибок по полям. До твоего кода такой запрос не доходит.',
          'Документация доступна сразу: Swagger UI по адресу `/docs`, ReDoc — `/redoc`, схема — `/openapi.json`.',
        ] },
      ],
    },
    {
      id: 'pydantic', title: 'Pydantic v2: модели и валидация',
      blocks: [
        { t: 'p', text: 'Pydantic превращает сырые данные (JSON, словарь, строку из переменной окружения) в типизированный объект и гарантирует, что он корректен. Вторая версия написана на Rust и в разы быстрее первой; синтаксис местами отличается, поэтому в старом коде встретишь `.dict()` вместо `.model_dump()` и `@validator` вместо `@field_validator`.' },
        { t: 'code', text: `from pydantic import BaseModel, Field, EmailStr, ConfigDict, field_validator, model_validator
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=50)
    age: int = Field(ge=14, le=120)
    password: str = Field(min_length=8)
    password_repeat: str

    @field_validator('name')
    @classmethod
    def strip_name(cls, v: str) -> str:
        return v.strip()

    @model_validator(mode='after')                 # проверка, затрагивающая несколько полей
    def passwords_match(self):
        if self.password != self.password_repeat:
            raise ValueError('пароли не совпадают')
        return self

class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)    # позволяет строить модель из объекта ORM
    id: int
    email: EmailStr
    name: str
    created_at: datetime

user = UserCreate.model_validate(data)        # из словаря
user.model_dump(exclude={'password_repeat'})  # в словарь
user.model_dump_json()                        # в JSON
UserOut.model_validate(orm_user)              # из объекта SQLAlchemy` },
        { t: 'h3', text: 'Разные схемы для разных задач' },
        { t: 'p', text: 'Одна сущность — несколько моделей: `UserCreate` (что присылает клиент при регистрации), `UserUpdate` (все поля необязательные), `UserOut` (что отдаём наружу — без пароля), а модель таблицы в ORM живёт отдельно. Смешивать модель базы и схему API — частая ошибка: любое изменение таблицы тут же ломает контракт API, а внутренние поля утекают в ответ.' },
        { t: 'h3', text: 'Настройки приложения' },
        { t: 'code', text: `from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env')
    database_url: str
    redis_url: str = 'redis://localhost:6379/0'
    jwt_secret: str
    debug: bool = False

settings = Settings()     # читает переменные окружения, проверяет типы; нет обязательной — приложение не стартует` },
      ],
    },
    {
      id: 'di', title: 'Dependency injection и middleware',
      blocks: [
        { t: 'h3', text: 'Зависимости' },
        { t: 'p', text: '**Внедрение зависимостей** — обработчик не создаёт то, что ему нужно (сессию базы, текущего пользователя, клиент внешнего сервиса), а объявляет это в сигнатуре. FastAPI сам вызывает функцию-зависимость и подставляет результат. Зависимости могут зависеть друг от друга, образуя граф; в пределах одного запроса результат каждой кешируется.' },
        { t: 'code', text: `from typing import Annotated
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

async def get_session():
    async with SessionLocal() as session:
        yield session                    # код после yield выполнится после ответа — сессия закроется

oauth2 = OAuth2PasswordBearer(tokenUrl='/api/v1/auth/token')

async def get_current_user(
    token: Annotated[str, Depends(oauth2)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    user_id = decode_token(token)        # бросит 401, если токен неверный или истёк
    user = await session.get(User, user_id)
    if user is None:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return user

def require_role(role: str):             # зависимость с параметром — фабрика
    async def checker(user: Annotated[User, Depends(get_current_user)]):
        if user.role != role:
            raise HTTPException(status.HTTP_403_FORBIDDEN)
        return user
    return checker

SessionDep = Annotated[AsyncSession, Depends(get_session)]
CurrentUser = Annotated[User, Depends(get_current_user)]

@router.get('/me')
async def me(user: CurrentUser): ...

@router.delete('/{user_id}', dependencies=[Depends(require_role('admin'))])
async def delete_user(user_id: int, session: SessionDep): ...` },
        { t: 'p', text: 'Что это даёт: общий код (аутентификация, сессия, пагинация) написан один раз; обработчики остаются короткими; а в тестах зависимость подменяется одной строкой — `app.dependency_overrides[get_session] = fake_session`.' },
        { t: 'h3', text: 'Middleware' },
        { t: 'p', text: '**Middleware** — прослойка, через которую проходит _каждый_ запрос на пути к обработчику и каждый ответ на пути обратно. В ней делают то, что не зависит от конкретного маршрута: журналирование, идентификатор запроса, метрики, CORS, сжатие.' },
        { t: 'code', text: `import time, uuid
from fastapi.middleware.cors import CORSMiddleware

@app.middleware('http')
async def add_request_id(request, call_next):
    request_id = request.headers.get('X-Request-ID', str(uuid.uuid4()))
    started = time.perf_counter()
    response = await call_next(request)          # дальше по цепочке — к обработчику
    response.headers['X-Request-ID'] = request_id
    logger.info('%s %s -> %s за %.1f мс', request.method, request.url.path,
                response.status_code, (time.perf_counter() - started) * 1000)
    return response

app.add_middleware(CORSMiddleware, allow_origins=['https://shop.example.com'],
                   allow_methods=['*'], allow_headers=['*'], allow_credentials=True)` },
        { t: 'table', caption: 'Middleware или зависимость', headers: ['', 'Middleware', 'Зависимость'], rows: [
          ['Область действия', 'все запросы приложения', 'конкретные маршруты или роутеры'],
          ['Что знает', 'только запрос и ответ', 'разобранные параметры, может вернуть значение обработчику'],
          ['Типичные задачи', 'логи, метрики, CORS, request id', 'аутентификация, права, сессия базы, пагинация'],
        ] },
      ],
    },
    {
      id: 'async', title: 'Асинхронные эндпоинты, ошибки и фоновые задачи',
      blocks: [
        { t: 'h3', text: 'async def или def' },
        { t: 'p', text: 'FastAPI принимает оба варианта, но выполняет их по-разному. `async def` запускается прямо в событийном цикле. Обычный `def` отправляется в пул потоков, чтобы не блокировать цикл.' },
        { t: 'split', columns: [
          { tone: 'no', title: 'Так нельзя', items: ['В `async def` вызывать блокирующий код: `requests.get`, `time.sleep`, синхронный драйвер базы, тяжёлые вычисления.', 'Пока он выполняется, событийный цикл стоит — _все_ остальные запросы этого воркера ждут.'] },
          { tone: 'yes', title: 'Так правильно', items: ['В `async def` — только неблокирующие библиотеки с `await`: `httpx.AsyncClient`, `asyncpg`, асинхронный SQLAlchemy, `asyncio.sleep`.', 'Блокирующую библиотеку — в обычный `def` либо через `await asyncio.to_thread(func)`.', 'Тяжёлые вычисления — в отдельный процесс или в очередь задач.'] },
        ] },
        { t: 'h3', text: 'Обработка ошибок' },
        { t: 'code', text: `from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

raise HTTPException(status_code=404, detail='Заказ не найден')       # в обработчике

class DomainError(Exception):                    # ошибки бизнес-логики не знают про HTTP
    code = 'domain_error'; status = 400

class OutOfStock(DomainError):
    code = 'out_of_stock'; status = 409

@app.exception_handler(DomainError)              # одно место, где они превращаются в ответ
async def domain_error_handler(request: Request, exc: DomainError):
    return JSONResponse(status_code=exc.status, content={'error': {'code': exc.code, 'message': str(exc)}})` },
        { t: 'p', text: 'Единый формат ошибок — часть контракта API. Сервисный слой бросает свои исключения, а в HTTP-ответы их превращает один обработчик. Необработанное исключение даёт 500; его подробности идут в журнал, а не в тело ответа.' },
        { t: 'h3', text: 'Фоновые задачи и жизненный цикл' },
        { t: 'code', text: `from contextlib import asynccontextmanager
from fastapi import BackgroundTasks

@asynccontextmanager
async def lifespan(app):
    app.state.http = httpx.AsyncClient(timeout=5)     # при старте: пул соединений, клиенты
    yield
    await app.state.http.aclose()                     # при остановке

app = FastAPI(lifespan=lifespan)

@router.post('/signup', status_code=201)
async def signup(payload: UserCreate, tasks: BackgroundTasks, session: SessionDep):
    user = await create_user(session, payload)
    tasks.add_task(send_welcome_email, user.email)    # выполнится после отправки ответа
    return user` },
        { t: 'note', text: '`BackgroundTasks` выполняет задачу в том же процессе, сразу после ответа. Если процесс упадёт или перезапустится — задача потеряется, повторов нет. Поэтому так делают только то, что не страшно потерять. Всё важное — письма с чеками, обработка платежей, генерация отчётов — уходит в очередь задач: Celery, TaskIQ, ARQ. Про очереди — отдельная глава.' },
      ],
    },
    {
      id: 'testing', title: 'Тестирование приложения на FastAPI',
      blocks: [
        { t: 'p', text: 'Приложение можно вызывать без запуска сервера: тестовый клиент обращается к ASGI-приложению напрямую. Внешние зависимости — базу, чужие API — подменяют через `dependency_overrides`.' },
        { t: 'code', text: `import pytest
from httpx import ASGITransport, AsyncClient

@pytest.fixture
async def client(session):                       # session — фикстура с тестовой базой
    app.dependency_overrides[get_session] = lambda: session
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as c:
        yield c
    app.dependency_overrides.clear()

async def test_create_order(client, auth_headers):
    resp = await client.post('/api/v1/orders', json={'item_id': 1, 'qty': 2}, headers=auth_headers)
    assert resp.status_code == 201
    assert resp.json()['qty'] == 2

async def test_order_requires_auth(client):
    resp = await client.get('/api/v1/orders/1')
    assert resp.status_code == 401

@pytest.mark.parametrize('qty', [0, -1, 10**9])
async def test_invalid_qty(client, auth_headers, qty):
    resp = await client.post('/api/v1/orders', json={'item_id': 1, 'qty': qty}, headers=auth_headers)
    assert resp.status_code == 422` },
        { t: 'ul', items: [
          'Для синхронных тестов есть `fastapi.testclient.TestClient`; для асинхронных — `httpx.AsyncClient` и плагин `pytest-asyncio` или `anyio`.',
          'Проверяй не только успешный путь: 401 без токена, 403 с чужой ролью, 404 для чужого объекта, 422 для неверных данных.',
          'База в тестах — настоящая PostgreSQL (в контейнере, testcontainers), а не SQLite: иначе тесты не поймают разницу в типах и поведении.',
          'Каждый тест работает в транзакции, которая откатывается, — тесты не зависят друг от друга.',
        ] },
      ],
    },
    {
      id: 'django', title: 'Django: обзор',
      blocks: [
        { t: 'p', text: 'Django — фреймворк «с батарейками»: ORM, миграции, админка, аутентификация, формы, шаблоны — всё входит в поставку и согласовано между собой. Проект состоит из **приложений** (apps); архитектурный шаблон называют **MTV**: Model (данные), Template (представление), View (логика обработки запроса).' },
        { t: 'code', text: `# models.py
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, default='new', db_index=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

# Запросы ORM: QuerySet ленивый — SQL выполняется, только когда нужны данные
Order.objects.filter(status='paid', total__gte=1000).order_by('-created_at')[:10]
Order.objects.select_related('user')            # JOIN: для ForeignKey и OneToOne
User.objects.prefetch_related('orders')         # второй запрос + склейка в Python: для обратных связей и M2M
Order.objects.values('status').annotate(n=Count('id'), revenue=Sum('total'))

# python manage.py makemigrations   — создать файл миграции по изменениям моделей
# python manage.py migrate          — применить миграции к базе` },
        { t: 'h3', text: 'Что нужно знать' },
        { t: 'ul', items: [
          '**ORM** реализует шаблон Active Record: модель сама умеет сохраняться (`order.save()`). SQLAlchemy использует Data Mapper и Unit of Work — модель отделена от сессии.',
          '**Проблема N+1**: цикл по заказам с обращением к `order.user` делает по запросу на каждый заказ. Лечится `select_related` и `prefetch_related`.',
          '**Миграции** генерируются из моделей и хранятся в репозитории — схема базы версионируется вместе с кодом.',
          '**Админка** строится по моделям автоматически: `admin.site.register(Order)` даёт готовый интерфейс для внутренних пользователей.',
          '**Middleware**, **сигналы**, система аутентификации и прав — встроенные.',
          '**Django REST Framework (DRF)** — стандарт для API на Django: **сериализаторы** (валидация и преобразование, аналог Pydantic-схем), **ViewSet** и **роутеры** (CRUD в несколько строк), классы прав доступа, пагинация, фильтрация.',
          'Асинхронность в Django есть (асинхронные view, часть ORM), но экосистема в основном синхронная.',
        ] },
        { t: 'code', text: `# DRF: полноценный CRUD для заказов
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'status', 'total', 'created_at']
        read_only_fields = ['id', 'created_at']

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):                         # пользователь видит только свои заказы
        return Order.objects.filter(user=self.request.user)

router = DefaultRouter()
router.register('orders', OrderViewSet, basename='order')` },
      ],
    },
    {
      id: 'choice', title: 'Что выбрать и как устроить проект',
      blocks: [
        { t: 'table', caption: 'FastAPI, Django и Flask', headers: ['', 'FastAPI', 'Django', 'Flask'], rows: [
          ['Философия', 'быстрые API на типах', '«всё включено»', 'микрофреймворк: ядро и расширения'],
          ['Асинхронность', 'основной режим', 'частичная', 'нет (WSGI)'],
          ['ORM', 'нет своей: SQLAlchemy, Tortoise', 'встроенная', 'нет своей: SQLAlchemy'],
          ['Валидация', 'Pydantic', 'формы и сериализаторы DRF', 'расширения'],
          ['Админка', 'сторонние решения', 'из коробки', 'расширения'],
          ['Документация API', 'OpenAPI автоматически', 'через drf-spectacular', 'расширения'],
          ['Когда брать', 'микросервисы, высокая нагрузка на ввод-вывод, ML-сервисы', 'монолит с админкой, CRM, бэк-офис, быстрый старт продукта', 'небольшие сервисы и старые проекты'],
        ] },
        { t: 'h3', text: 'Структура проекта на FastAPI' },
        { t: 'code', text: `app/
├── main.py              # создание приложения, подключение роутеров, lifespan
├── core/                # config.py (Settings), security.py, logging.py
├── api/
│   ├── deps.py          # общие зависимости: сессия, текущий пользователь
│   └── v1/              # users.py, orders.py — роутеры: только HTTP
├── schemas/             # Pydantic-схемы запросов и ответов
├── services/            # бизнес-логика: не знает про HTTP
├── repositories/        # работа с базой: запросы к SQLAlchemy
├── models/              # ORM-модели
└── db/                  # engine, session, миграции Alembic
tests/` },
        { t: 'p', text: 'Слои: **роутер** принимает запрос и вызывает сервис; **сервис** содержит правила предметной области; **репозиторий** прячет запросы к базе. Обработчик в пять строк, который только вызывает сервис, — признак здоровой структуры. Обработчик на сто строк с SQL внутри — то, за что ругают на ревью. Подробнее слоистая архитектура разбирается в главе про архитектуру приложений.' },
        { t: 'h3', text: 'Чек-лист сервиса, который не стыдно показать' },
        { t: 'ol', items: [
          'Версия API в пути (`/api/v1`), единый формат ошибок, правильные коды ответов.',
          'Схемы запроса и ответа разделены; пароли и внутренние поля наружу не отдаются.',
          'Настройки — из переменных окружения, секретов в репозитории нет.',
          'Миграции Alembic, а не `create_all` при старте.',
          'Эндпоинт `/health`, структурированные логи с идентификатором запроса.',
          'Тесты на основные сценарии и на отказы; линтер и проверка типов в CI.',
          'Dockerfile и `docker compose up`, который поднимает сервис вместе с базой.',
        ] },
        { t: 'reading', label: 'Документация', items: [
          { title: 'FastAPI — официальное руководство (есть на русском)', url: 'https://fastapi.tiangolo.com/ru/tutorial/' },
          { title: 'Pydantic v2', url: 'https://docs.pydantic.dev/latest/' },
          { title: 'Django — учебник из официальной документации', url: 'https://docs.djangoproject.com/en/stable/intro/tutorial01/' },
          { title: 'Django REST Framework', url: 'https://www.django-rest-framework.org' },
          { title: 'Uvicorn — развёртывание', url: 'https://www.uvicorn.org/deployment/' },
        ] },
      ],
    },
  ],
}
