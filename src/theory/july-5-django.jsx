import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 640 }}>{caption}</figcaption>}
    </figure>
  )
}

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

export default function July5DjangoTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">REST API: создание на Python</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">5 июля 2026</p>
        <p>
          Фронтенд рисует интерфейс, но откуда он берёт данные — список товаров, профиль пользователя, заказы?
          Их отдаёт <strong>бэкенд</strong> через <strong>API</strong>. Сегодня разберём, что такое{' '}
          <strong>REST API</strong>, по каким правилам он устроен, и напишем настоящее{' '}
          <strong>CRUD-приложение</strong> на Python с помощью фреймворка <strong>Django</strong> и{' '}
          <strong>Django REST Framework (DRF)</strong>. К концу занятия у тебя будет работающий сервер, который
          умеет создавать, читать, обновлять и удалять записи по HTTP.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Видео-лекция: REST API на Django</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/day5Backend.mov" />
      </section>

      {/* Что такое REST API */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое API и REST</h2>
        <Term name="API (Application Programming Interface)">
          «интерфейс», через который одна программа общается с другой. Веб-API — это набор URL-адресов на сервере,
          обратившись к которым по HTTP, клиент (браузер, мобильное приложение) получает или изменяет данные.
        </Term>
        <Term name="REST (Representational State Transfer)">
          набор соглашений, как проектировать веб-API. Главная идея: всё — это <strong>ресурсы</strong>{' '}
          (пользователи, товары, заказы), у каждого есть свой URL, а действия над ними выражаются{' '}
          <strong>HTTP-методами</strong>.
        </Term>
        <p>
          Ключевой принцип REST — соответствие между <strong>HTTP-методом</strong> и операцией{' '}
          <strong>CRUD</strong> (Create, Read, Update, Delete):
        </p>
        <TheoryTable
          headers={['HTTP-метод', 'CRUD', 'Пример URL', 'Что делает']}
          rows={[
            ['GET', 'Read', '/api/books/', 'получить список всех книг'],
            ['GET', 'Read', '/api/books/5/', 'получить одну книгу с id=5'],
            ['POST', 'Create', '/api/books/', 'создать новую книгу'],
            ['PUT / PATCH', 'Update', '/api/books/5/', 'изменить книгу с id=5'],
            ['DELETE', 'Delete', '/api/books/5/', 'удалить книгу с id=5'],
          ]}
        />
        <Fig caption="REST: один ресурс (books) — один базовый URL, а конкретное действие определяет HTTP-метод. Сервер отвечает данными в формате JSON">
          <svg viewBox="0 0 600 220" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="80" width="150" height="60" rx="10" fill="rgba(96,165,250,0.10)" stroke="#60a5fa" />
            <text x="95" y="106" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Клиент</text>
            <text x="95" y="125" fill={C.sub} fontSize="10" textAnchor="middle">браузер / app</text>
            <rect x="430" y="80" width="150" height="60" rx="10" fill="rgba(32,190,255,0.08)" stroke={C.lime} />
            <text x="505" y="106" fill={C.lime} fontSize="13" fontWeight="700" textAnchor="middle">Сервер</text>
            <text x="505" y="125" fill={C.sub} fontSize="10" textAnchor="middle">Django + DRF</text>
            <line x1="170" y1="95" x2="430" y2="95" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#da1)" />
            <text x="300" y="86" fill="#60a5fa" fontSize="11" textAnchor="middle">GET /api/books/</text>
            <line x1="430" y1="128" x2="170" y2="128" stroke={C.lime} strokeWidth="2" markerEnd="url(#da2)" />
            <text x="300" y="148" fill={C.lime} fontSize="11" textAnchor="middle">JSON: [ ... ]</text>
            <rect x="250" y="175" width="100" height="34" rx="6" fill="#17171f" stroke={C.border} />
            <text x="300" y="197" fill={C.sub} fontSize="11" textAnchor="middle">База данных</text>
            <line x1="505" y1="140" x2="340" y2="178" stroke={C.sub} strokeWidth="1.5" strokeDasharray="3 2" />
            <defs>
              <marker id="da1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#60a5fa" /></marker>
              <marker id="da2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Django и DRF */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Django и Django REST Framework</h2>
        <Term name="Django">
          мощный веб-фреймворк на Python «с батарейками в комплекте»: ORM для работы с БД, миграции, админка,
          маршрутизация. Позволяет быстро строить надёжные бэкенды.
        </Term>
        <Term name="Django REST Framework (DRF)">
          надстройка над Django специально для создания REST API: сериализаторы (превращают объекты в JSON),
          вьюсеты и роутеры (готовые CRUD-эндпоинты), удобный веб-интерфейс для тестирования API прямо в браузере.
        </Term>
        <TheoryCode language="bash" code={`# 1. Устанавливаем сам Django и надстройку DRF одной командой
pip install django djangorestframework

# 2. Создаём проект. "config" — имя папки с настройками, точка в конце = "прямо здесь"
django-admin startproject config .

# 3. Внутри проекта создаём приложение "library" — модуль с нашей логикой (модели, вьюхи)
python manage.py startapp library`} />
        <p>Подключаем DRF и наше приложение в настройках проекта:</p>
        <TheoryCode language="python" code={`# config/settings.py — главный файл настроек проекта

# INSTALLED_APPS — список всех приложений, которые Django должен "видеть".
# Пока приложение не в этом списке, Django его игнорирует.
INSTALLED_APPS = [
    # ... стандартные приложения Django (admin, auth, ...) ...
    'rest_framework',   # регистрируем DRF, чтобы стали доступны сериализаторы, вьюсеты и т.д.
    'library',          # регистрируем НАШЕ приложение, иначе его модели не попадут в БД
]`} />
      </section>

      {/* Model */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Модель — таблица в базе данных</h2>
        <p>
          <strong>Модель</strong> — это Python-класс, который Django превращает в таблицу БД. Каждое поле класса
          становится колонкой. Опишем ресурс «книга».
        </p>
        <TheoryCode language="python" code={`# library/models.py
from django.db import models   # импортируем инструменты Django для описания полей

# Класс-модель наследуется от models.Model — так Django понимает, что это таблица.
# Имя класса Book станет именем таблицы (library_book), а каждое поле — колонкой.
class Book(models.Model):
    title = models.CharField(max_length=200)      # текстовая колонка до 200 символов (название)
    author = models.CharField(max_length=100)     # текстовая колонка до 100 символов (автор)
    year = models.IntegerField()                  # целочисленная колонка (год издания)
    is_read = models.BooleanField(default=False)  # логическая колонка True/False; по умолчанию False
    # id-колонку Django добавит сам — как первичный ключ (PRIMARY KEY), автоувеличение

    def __str__(self):        # как объект показывать текстом (в админке, в консоли)
        return self.title     # вернём название книги вместо "Book object (1)"`} />
        <p>
          После описания модели нужно применить <strong>миграции</strong> — Django сам создаст таблицу в БД по
          нашему классу:
        </p>
        <TheoryCode language="bash" code={`# makemigrations: Django смотрит на модели и создаёт файл-инструкцию,
# ЧТО нужно изменить в базе (например "создать таблицу book с такими колонками")
python manage.py makemigrations

# migrate: Django выполняет эти инструкции и реально меняет базу данных
python manage.py migrate`} />
      </section>

      {/* Serializer */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Сериализатор — мост между объектом и JSON</h2>
        <Term name="Сериализация">
          превращение Python-объекта (записи из БД) в JSON, чтобы отправить его клиенту. Обратный процесс
          (JSON → объект при создании записи) называется десериализацией. Сериализатор делает и то, и другое, а
          заодно проверяет корректность входящих данных.
        </Term>
        <TheoryCode language="python" code={`# library/serializers.py
from rest_framework import serializers   # инструменты сериализации из DRF
from .models import Book                 # импортируем нашу модель (точка = "из текущего приложения")

# ModelSerializer сам строит поля по модели — не надо описывать каждое вручную
class BookSerializer(serializers.ModelSerializer):
    class Meta:                  # вложенный класс Meta — "настройки" сериализатора
        model = Book             # какую модель обслуживаем
        fields = '__all__'       # какие поля включить в JSON: '__all__' = все поля модели
        # вместо '__all__' можно перечислить явно: ['id', 'title', 'author', 'year', 'is_read']`} />
        <TheoryExample title="Почему ModelSerializer">
          Он автоматически строит поля по модели и умеет создавать/обновлять записи. Нам не нужно вручную
          описывать каждое поле — DRF берёт их из модели <code>Book</code>.
        </TheoryExample>
      </section>

      {/* ViewSet */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. ViewSet — вся логика CRUD в одном классе</h2>
        <p>
          <strong>ViewSet</strong> — это класс, который объединяет обработку всех CRUD-операций для ресурса. С{' '}
          <code>ModelViewSet</code> достаточно указать, <strong>какие</strong> записи брать (queryset) и{' '}
          <strong>каким</strong> сериализатором их оформлять — а все пять эндпоинтов (список, деталь, создание,
          изменение, удаление) DRF сгенерирует сам.
        </p>
        <TheoryCode language="python" code={`# library/views.py
from rest_framework import viewsets            # базовые классы вьюсетов из DRF
from .models import Book                        # наша модель
from .serializers import BookSerializer         # наш сериализатор

# Наследуемся от ModelViewSet — он уже содержит готовую логику всех CRUD-операций.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()        # с какими записями работаем: Book.objects.all() = все книги из БД
    serializer_class = BookSerializer    # каким сериализатором превращать их в JSON и обратно

# Больше ничего писать не нужно: этот класс уже умеет
# GET (список и деталь), POST (создать), PUT/PATCH (обновить), DELETE (удалить).`} />
      </section>

      {/* Router / URLs */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Роутер — привязка URL к ViewSet</h2>
        <p>
          Осталось связать ViewSet с адресами. <strong>Router</strong> автоматически создаёт все нужные URL для
          нашего ресурса.
        </p>
        <TheoryCode language="python" code={`# config/urls.py — карта адресов всего проекта
from django.urls import path, include          # path — один маршрут, include — подключить набор маршрутов
from rest_framework.routers import DefaultRouter
from library.views import BookViewSet          # импортируем наш вьюсет

router = DefaultRouter()                        # создаём роутер
router.register(r'books', BookViewSet)          # регистрируем ресурс: префикс "books" → BookViewSet.
                                                # Роутер сам построит все URL для CRUD по этому вьюсету.

urlpatterns = [
    path('api/', include(router.urls)),         # все адреса роутера доступны под префиксом /api/
]                                               # итог: /api/books/, /api/books/1/ и т.д.`} />
        <p>Роутер сам сгенерировал полный набор эндпоинтов:</p>
        <TheoryTable
          headers={['Метод + URL', 'Действие']}
          rows={[
            ['GET /api/books/', 'список всех книг'],
            ['POST /api/books/', 'создать книгу'],
            ['GET /api/books/1/', 'получить книгу с id=1'],
            ['PUT /api/books/1/', 'полностью обновить книгу'],
            ['PATCH /api/books/1/', 'частично обновить книгу'],
            ['DELETE /api/books/1/', 'удалить книгу'],
          ]}
        />
      </section>

      {/* Запуск и проверка */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Запуск и проверка API</h2>
        <TheoryCode language="bash" code={`# runserver запускает встроенный сервер разработки Django
python manage.py runserver
# После запуска сервер слушает http://127.0.0.1:8000/ (127.0.0.1 = твой же компьютер, localhost)`} />
        <p>
          Открой <code>http://127.0.0.1:8000/api/books/</code> в браузере — DRF покажет удобный веб-интерфейс, где
          можно создавать записи прямо через форму. Или проверь через <code>curl</code> из терминала:
        </p>
        <TheoryCode language="bash" code={`# Создать книгу (POST). curl — консольная утилита для HTTP-запросов.
curl -X POST http://127.0.0.1:8000/api/books/ \\   # -X POST — метод запроса, URL — адрес ресурса
  -H "Content-Type: application/json" \\            # -H — заголовок: сообщаем серверу, что шлём JSON
  -d '{"title": "1984", "author": "Оруэлл", "year": 1949}'  # -d — тело запроса (данные новой книги)

# Получить список всех книг (GET — метод по умолчанию, -X можно не писать)
curl http://127.0.0.1:8000/api/books/

# Обновить книгу с id=1 (PATCH — частичное обновление, меняем только одно поле)
curl -X PATCH http://127.0.0.1:8000/api/books/1/ \\
  -H "Content-Type: application/json" \\
  -d '{"is_read": true}'                           # отмечаем книгу прочитанной

# Удалить книгу с id=1 (DELETE)
curl -X DELETE http://127.0.0.1:8000/api/books/1/`} />
        <p>Ответ сервера на GET-запрос списка будет в формате JSON:</p>
        <TheoryCode language="json" code={`[
  {
    "id": 1,
    "title": "1984",
    "author": "Оруэлл",
    "year": 1949,
    "is_read": true
  }
]`} />
      </section>

      {/* Коды ответов */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Статус-коды ответов</h2>
        <p>
          Правильный REST API возвращает не только данные, но и <strong>HTTP-код</strong>, по которому клиент
          понимает результат. DRF проставляет их автоматически:
        </p>
        <TheoryTable
          headers={['Код', 'Значение', 'Когда']}
          rows={[
            ['200 OK', 'успех', 'успешный GET, PUT, PATCH'],
            ['201 Created', 'создано', 'успешный POST'],
            ['204 No Content', 'удалено', 'успешный DELETE'],
            ['400 Bad Request', 'ошибка данных', 'невалидные поля в запросе'],
            ['404 Not Found', 'не найдено', 'записи с таким id нет'],
          ]}
        />
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          <strong>REST API</strong> — способ отдавать данные по HTTP: ресурс имеет URL, а действие определяется
          методом (GET/POST/PUT/DELETE = чтение/создание/обновление/удаление, то есть CRUD). На{' '}
          <strong>Django + DRF</strong> полноценный CRUD-бэкенд собирается из четырёх кирпичиков:{' '}
          <strong>модель</strong> (таблица в БД) → <strong>сериализатор</strong> (объект ↔ JSON) →{' '}
          <strong>ViewSet</strong> (логика CRUD) → <strong>роутер</strong> (URL-адреса). Пара десятков строк — и
          у тебя работающий API, готовый отдавать данные фронтенду.
        </p>
      </section>
    </div>
  )
}
