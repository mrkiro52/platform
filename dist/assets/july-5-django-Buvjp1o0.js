import{j as e}from"./index-DxlzaqgG.js";import{b as a,T as s,a as n}from"./TheoryTable-DWu2OTnI.js";import{V as l}from"./VideoPlayer-BNK2m25i.js";const r={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#20beff",border:"#2a2a3a"};function d({children:t,caption:i}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:t}),i&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:i})]})}function o({name:t,children:i}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:t}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",i]})]})}function j(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"REST API: создание на Python"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Backend-разработка"}),e.jsx("p",{className:"theory-date",children:"5 июля 2026"}),e.jsxs("p",{children:["Фронтенд рисует интерфейс, но откуда он берёт данные — список товаров, профиль пользователя, заказы? Их отдаёт ",e.jsx("strong",{children:"бэкенд"})," через ",e.jsx("strong",{children:"API"}),". Сегодня разберём, что такое"," ",e.jsx("strong",{children:"REST API"}),", по каким правилам он устроен, и напишем настоящее"," ",e.jsx("strong",{children:"CRUD-приложение"})," на Python с помощью фреймворка ",e.jsx("strong",{children:"Django"})," и"," ",e.jsx("strong",{children:"Django REST Framework (DRF)"}),". К концу занятия у тебя будет работающий сервер, который умеет создавать, читать, обновлять и удалять записи по HTTP."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Видео-лекция: REST API на Django"}),e.jsx(l,{src:"https://s3.regru.cloud/kirocamp/day5Backend.mov"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Что такое API и REST"}),e.jsx(o,{name:"API (Application Programming Interface)",children:"«интерфейс», через который одна программа общается с другой. Веб-API — это набор URL-адресов на сервере, обратившись к которым по HTTP, клиент (браузер, мобильное приложение) получает или изменяет данные."}),e.jsxs(o,{name:"REST (Representational State Transfer)",children:["набор соглашений, как проектировать веб-API. Главная идея: всё — это ",e.jsx("strong",{children:"ресурсы"})," ","(пользователи, товары, заказы), у каждого есть свой URL, а действия над ними выражаются"," ",e.jsx("strong",{children:"HTTP-методами"}),"."]}),e.jsxs("p",{children:["Ключевой принцип REST — соответствие между ",e.jsx("strong",{children:"HTTP-методом"})," и операцией"," ",e.jsx("strong",{children:"CRUD"})," (Create, Read, Update, Delete):"]}),e.jsx(a,{headers:["HTTP-метод","CRUD","Пример URL","Что делает"],rows:[["GET","Read","/api/books/","получить список всех книг"],["GET","Read","/api/books/5/","получить одну книгу с id=5"],["POST","Create","/api/books/","создать новую книгу"],["PUT / PATCH","Update","/api/books/5/","изменить книгу с id=5"],["DELETE","Delete","/api/books/5/","удалить книгу с id=5"]]}),e.jsx(d,{caption:"REST: один ресурс (books) — один базовый URL, а конкретное действие определяет HTTP-метод. Сервер отвечает данными в формате JSON",children:e.jsxs("svg",{viewBox:"0 0 600 220",width:"100%",style:{maxWidth:600},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"20",y:"80",width:"150",height:"60",rx:"10",fill:"rgba(96,165,250,0.10)",stroke:"#60a5fa"}),e.jsx("text",{x:"95",y:"106",fill:r.text,fontSize:"13",fontWeight:"700",textAnchor:"middle",children:"Клиент"}),e.jsx("text",{x:"95",y:"125",fill:r.sub,fontSize:"10",textAnchor:"middle",children:"браузер / app"}),e.jsx("rect",{x:"430",y:"80",width:"150",height:"60",rx:"10",fill:"rgba(32,190,255,0.08)",stroke:r.lime}),e.jsx("text",{x:"505",y:"106",fill:r.lime,fontSize:"13",fontWeight:"700",textAnchor:"middle",children:"Сервер"}),e.jsx("text",{x:"505",y:"125",fill:r.sub,fontSize:"10",textAnchor:"middle",children:"Django + DRF"}),e.jsx("line",{x1:"170",y1:"95",x2:"430",y2:"95",stroke:"#60a5fa",strokeWidth:"2",markerEnd:"url(#da1)"}),e.jsx("text",{x:"300",y:"86",fill:"#60a5fa",fontSize:"11",textAnchor:"middle",children:"GET /api/books/"}),e.jsx("line",{x1:"430",y1:"128",x2:"170",y2:"128",stroke:r.lime,strokeWidth:"2",markerEnd:"url(#da2)"}),e.jsx("text",{x:"300",y:"148",fill:r.lime,fontSize:"11",textAnchor:"middle",children:"JSON: [ ... ]"}),e.jsx("rect",{x:"250",y:"175",width:"100",height:"34",rx:"6",fill:"#17171f",stroke:r.border}),e.jsx("text",{x:"300",y:"197",fill:r.sub,fontSize:"11",textAnchor:"middle",children:"База данных"}),e.jsx("line",{x1:"505",y1:"140",x2:"340",y2:"178",stroke:r.sub,strokeWidth:"1.5",strokeDasharray:"3 2"}),e.jsxs("defs",{children:[e.jsx("marker",{id:"da1",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:"#60a5fa"})}),e.jsx("marker",{id:"da2",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:r.lime})})]})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Django и Django REST Framework"}),e.jsx(o,{name:"Django",children:"мощный веб-фреймворк на Python «с батарейками в комплекте»: ORM для работы с БД, миграции, админка, маршрутизация. Позволяет быстро строить надёжные бэкенды."}),e.jsx(o,{name:"Django REST Framework (DRF)",children:"надстройка над Django специально для создания REST API: сериализаторы (превращают объекты в JSON), вьюсеты и роутеры (готовые CRUD-эндпоинты), удобный веб-интерфейс для тестирования API прямо в браузере."}),e.jsx(s,{language:"bash",code:`# 1. Устанавливаем сам Django и надстройку DRF одной командой
pip install django djangorestframework

# 2. Создаём проект. "config" — имя папки с настройками, точка в конце = "прямо здесь"
django-admin startproject config .

# 3. Внутри проекта создаём приложение "library" — модуль с нашей логикой (модели, вьюхи)
python manage.py startapp library`}),e.jsx("p",{children:"Подключаем DRF и наше приложение в настройках проекта:"}),e.jsx(s,{language:"python",code:`# config/settings.py — главный файл настроек проекта

# INSTALLED_APPS — список всех приложений, которые Django должен "видеть".
# Пока приложение не в этом списке, Django его игнорирует.
INSTALLED_APPS = [
    # ... стандартные приложения Django (admin, auth, ...) ...
    'rest_framework',   # регистрируем DRF, чтобы стали доступны сериализаторы, вьюсеты и т.д.
    'library',          # регистрируем НАШЕ приложение, иначе его модели не попадут в БД
]`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Модель — таблица в базе данных"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Модель"})," — это Python-класс, который Django превращает в таблицу БД. Каждое поле класса становится колонкой. Опишем ресурс «книга»."]}),e.jsx(s,{language:"python",code:`# library/models.py
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
        return self.title     # вернём название книги вместо "Book object (1)"`}),e.jsxs("p",{children:["После описания модели нужно применить ",e.jsx("strong",{children:"миграции"})," — Django сам создаст таблицу в БД по нашему классу:"]}),e.jsx(s,{language:"bash",code:`# makemigrations: Django смотрит на модели и создаёт файл-инструкцию,
# ЧТО нужно изменить в базе (например "создать таблицу book с такими колонками")
python manage.py makemigrations

# migrate: Django выполняет эти инструкции и реально меняет базу данных
python manage.py migrate`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Сериализатор — мост между объектом и JSON"}),e.jsx(o,{name:"Сериализация",children:"превращение Python-объекта (записи из БД) в JSON, чтобы отправить его клиенту. Обратный процесс (JSON → объект при создании записи) называется десериализацией. Сериализатор делает и то, и другое, а заодно проверяет корректность входящих данных."}),e.jsx(s,{language:"python",code:`# library/serializers.py
from rest_framework import serializers   # инструменты сериализации из DRF
from .models import Book                 # импортируем нашу модель (точка = "из текущего приложения")

# ModelSerializer сам строит поля по модели — не надо описывать каждое вручную
class BookSerializer(serializers.ModelSerializer):
    class Meta:                  # вложенный класс Meta — "настройки" сериализатора
        model = Book             # какую модель обслуживаем
        fields = '__all__'       # какие поля включить в JSON: '__all__' = все поля модели
        # вместо '__all__' можно перечислить явно: ['id', 'title', 'author', 'year', 'is_read']`}),e.jsxs(n,{title:"Почему ModelSerializer",children:["Он автоматически строит поля по модели и умеет создавать/обновлять записи. Нам не нужно вручную описывать каждое поле — DRF берёт их из модели ",e.jsx("code",{children:"Book"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. ViewSet — вся логика CRUD в одном классе"}),e.jsxs("p",{children:[e.jsx("strong",{children:"ViewSet"})," — это класс, который объединяет обработку всех CRUD-операций для ресурса. С"," ",e.jsx("code",{children:"ModelViewSet"})," достаточно указать, ",e.jsx("strong",{children:"какие"})," записи брать (queryset) и"," ",e.jsx("strong",{children:"каким"})," сериализатором их оформлять — а все пять эндпоинтов (список, деталь, создание, изменение, удаление) DRF сгенерирует сам."]}),e.jsx(s,{language:"python",code:`# library/views.py
from rest_framework import viewsets            # базовые классы вьюсетов из DRF
from .models import Book                        # наша модель
from .serializers import BookSerializer         # наш сериализатор

# Наследуемся от ModelViewSet — он уже содержит готовую логику всех CRUD-операций.
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()        # с какими записями работаем: Book.objects.all() = все книги из БД
    serializer_class = BookSerializer    # каким сериализатором превращать их в JSON и обратно

# Больше ничего писать не нужно: этот класс уже умеет
# GET (список и деталь), POST (создать), PUT/PATCH (обновить), DELETE (удалить).`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Роутер — привязка URL к ViewSet"}),e.jsxs("p",{children:["Осталось связать ViewSet с адресами. ",e.jsx("strong",{children:"Router"})," автоматически создаёт все нужные URL для нашего ресурса."]}),e.jsx(s,{language:"python",code:`# config/urls.py — карта адресов всего проекта
from django.urls import path, include          # path — один маршрут, include — подключить набор маршрутов
from rest_framework.routers import DefaultRouter
from library.views import BookViewSet          # импортируем наш вьюсет

router = DefaultRouter()                        # создаём роутер
router.register(r'books', BookViewSet)          # регистрируем ресурс: префикс "books" → BookViewSet.
                                                # Роутер сам построит все URL для CRUD по этому вьюсету.

urlpatterns = [
    path('api/', include(router.urls)),         # все адреса роутера доступны под префиксом /api/
]                                               # итог: /api/books/, /api/books/1/ и т.д.`}),e.jsx("p",{children:"Роутер сам сгенерировал полный набор эндпоинтов:"}),e.jsx(a,{headers:["Метод + URL","Действие"],rows:[["GET /api/books/","список всех книг"],["POST /api/books/","создать книгу"],["GET /api/books/1/","получить книгу с id=1"],["PUT /api/books/1/","полностью обновить книгу"],["PATCH /api/books/1/","частично обновить книгу"],["DELETE /api/books/1/","удалить книгу"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Запуск и проверка API"}),e.jsx(s,{language:"bash",code:`# runserver запускает встроенный сервер разработки Django
python manage.py runserver
# После запуска сервер слушает http://127.0.0.1:8000/ (127.0.0.1 = твой же компьютер, localhost)`}),e.jsxs("p",{children:["Открой ",e.jsx("code",{children:"http://127.0.0.1:8000/api/books/"})," в браузере — DRF покажет удобный веб-интерфейс, где можно создавать записи прямо через форму. Или проверь через ",e.jsx("code",{children:"curl"})," из терминала:"]}),e.jsx(s,{language:"bash",code:`# Создать книгу (POST). curl — консольная утилита для HTTP-запросов.
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
curl -X DELETE http://127.0.0.1:8000/api/books/1/`}),e.jsx("p",{children:"Ответ сервера на GET-запрос списка будет в формате JSON:"}),e.jsx(s,{language:"json",code:`[
  {
    "id": 1,
    "title": "1984",
    "author": "Оруэлл",
    "year": 1949,
    "is_read": true
  }
]`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Статус-коды ответов"}),e.jsxs("p",{children:["Правильный REST API возвращает не только данные, но и ",e.jsx("strong",{children:"HTTP-код"}),", по которому клиент понимает результат. DRF проставляет их автоматически:"]}),e.jsx(a,{headers:["Код","Значение","Когда"],rows:[["200 OK","успех","успешный GET, PUT, PATCH"],["201 Created","создано","успешный POST"],["204 No Content","удалено","успешный DELETE"],["400 Bad Request","ошибка данных","невалидные поля в запросе"],["404 Not Found","не найдено","записи с таким id нет"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs("p",{children:[e.jsx("strong",{children:"REST API"})," — способ отдавать данные по HTTP: ресурс имеет URL, а действие определяется методом (GET/POST/PUT/DELETE = чтение/создание/обновление/удаление, то есть CRUD). На"," ",e.jsx("strong",{children:"Django + DRF"})," полноценный CRUD-бэкенд собирается из четырёх кирпичиков:"," ",e.jsx("strong",{children:"модель"})," (таблица в БД) → ",e.jsx("strong",{children:"сериализатор"})," (объект ↔ JSON) →"," ",e.jsx("strong",{children:"ViewSet"})," (логика CRUD) → ",e.jsx("strong",{children:"роутер"})," (URL-адреса). Пара десятков строк — и у тебя работающий API, готовый отдавать данные фронтенду."]})]})]})}export{j as default};
