import{j as e}from"./index-wPonemfz.js";import{T as r,a as o,b as c}from"./TheoryTable-DOYeN1vA.js";const i={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#20beff",blue:"#60a5fa",border:"#2a2a3a"};function h({children:t,caption:n}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:t}),n&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:n})]})}function s({n:t,children:n}){return e.jsxs("div",{style:{display:"flex",gap:12,margin:"14px 0",alignItems:"flex-start"},children:[e.jsx("span",{style:{flexShrink:0,width:26,height:26,borderRadius:"50%",border:"1.5px solid var(--accent-lime)",color:"var(--accent-lime)",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2},children:t}),e.jsx("p",{style:{margin:0,flex:1},children:n})]})}function a({n:t,title:n,children:d}){return e.jsxs("div",{style:{margin:"16px 0 16px 14px",paddingLeft:16,borderLeft:"2px dashed var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[e.jsxs("span",{style:{background:"rgba(32,190,255,0.12)",color:"var(--accent-lime)",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999,flexShrink:0},children:["Шаг ",t]}),e.jsx("span",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:14},children:n})]}),d]})}function l({children:t}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,margin:"18px 0 8px"},children:[e.jsx("span",{style:{background:"rgba(96,165,250,0.14)",color:"var(--accent-lime)",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999},children:"✓ Собираем вместе"}),e.jsx("span",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:14},children:t})]})}function m(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Валидация и обработка ошибок на бэкенде Django"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Backend-разработка"}),e.jsx("p",{className:"theory-date",children:"8 июля 2026"}),e.jsxs("p",{children:["Никогда нельзя доверять данным, пришедшим от клиента — даже если фронтенд их уже проверил. Пользователь может отправить запрос напрямую (curl, Postman) в обход всех фронтенд-проверок. Поэтому сервер обязан сам проверять всё, что получает — это называется ",e.jsx("strong",{children:"валидацией"}),", а неизбежно возникающие ошибки нужно уметь красиво и предсказуемо возвращать клиенту. Разберём оба процесса на примере Django и Django REST Framework."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Зачем нужна валидация"}),e.jsxs(s,{n:1,children:[e.jsx("strong",{children:"Валидация"})," — проверка, что входящие данные соответствуют ожиданиям: email — это действительно email, возраст — положительное число, обязательное поле не пустое. Без неё в базу могут попасть некорректные или опасные данные, а бизнес-логика — сломаться на неожиданном значении."]}),e.jsxs(s,{n:2,children:["Есть два уровня проверки: ",e.jsx("strong",{children:"клиентская"})," (на фронтенде, JS) — быстро подсказывает пользователю об ошибке, улучшает UX, но её легко обойти. И ",e.jsx("strong",{children:"серверная"})," (на бэкенде) — обязательна, потому что именно она защищает базу данных и бизнес-логику от некорректных или злонамеренных запросов, откуда бы они ни пришли."]}),e.jsx(h,{caption:"Клиентская валидация — для удобства пользователя (можно обойти). Серверная — обязательный барьер защиты данных",children:e.jsxs("svg",{viewBox:"0 0 540 130",width:"100%",style:{maxWidth:540},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"20",y:"35",width:"140",height:"55",rx:"8",fill:"rgba(96,165,250,0.10)",stroke:i.blue}),e.jsx("text",{x:"90",y:"58",fill:i.blue,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"Клиент (JS)"}),e.jsx("text",{x:"90",y:"75",fill:i.sub,fontSize:"10",textAnchor:"middle",children:"можно обойти"}),e.jsx("line",{x1:"160",y1:"62",x2:"220",y2:"62",stroke:i.sub,strokeWidth:"2",markerEnd:"url(#dv)"}),e.jsx("rect",{x:"220",y:"35",width:"140",height:"55",rx:"8",fill:"var(--bg-tertiary)",stroke:i.border}),e.jsx("text",{x:"290",y:"58",fill:i.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"Сеть"}),e.jsx("text",{x:"290",y:"75",fill:i.sub,fontSize:"10",textAnchor:"middle",children:"curl / Postman в обход"}),e.jsx("line",{x1:"360",y1:"62",x2:"420",y2:"62",stroke:i.sub,strokeWidth:"2",markerEnd:"url(#dv)"}),e.jsx("rect",{x:"420",y:"35",width:"110",height:"55",rx:"8",fill:"rgba(32,190,255,0.08)",stroke:i.lime}),e.jsx("text",{x:"475",y:"58",fill:i.lime,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"Сервер"}),e.jsx("text",{x:"475",y:"75",fill:i.sub,fontSize:"10",textAnchor:"middle",children:"обязательный барьер"}),e.jsx("defs",{children:e.jsx("marker",{id:"dv",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:i.sub})})})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Валидация в Django Forms"}),e.jsxs(s,{n:3,children:["В классических Django Forms валидацию одного поля описывают методом ",e.jsx("code",{children:"clean_<имя_поля>"}),", а проверку, зависящую сразу от нескольких полей — методом ",e.jsx("code",{children:"clean()"})," всей формы. Разберём форму регистрации по шагам — от простого списка полей до готовой проверки."]}),e.jsxs(a,{n:1,title:"Опишем поля формы — без всякой валидации",children:[e.jsx("p",{children:"Сначала просто перечисляем, какие данные форма ожидает получить, и их базовый тип. Django Form — обычный Python-класс, а поля — его атрибуты."}),e.jsx(r,{language:"python",code:`from django import forms

class SignupForm(forms.Form):
    username = forms.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)`}),e.jsxs("p",{children:["На этом этапе форма уже умеет проверять базовые вещи «из коробки»: что поля не пустые и что"," ",e.jsx("code",{children:"username"})," не длиннее 50 символов. Но своей бизнес-логики (например, «имя уже занято») в ней пока нет."]})]}),e.jsxs(a,{n:2,title:"Добавим проверку ОДНОГО поля — clean_username",children:[e.jsxs("p",{children:["Чтобы проверить конкретное поле, добавляем метод с именем ",e.jsx("code",{children:"clean_"})," + имя поля. Django вызовет его автоматически. Внутри мы читаем уже частично проверенное значение из"," ",e.jsx("code",{children:"self.cleaned_data"}),", проверяем своё условие и, если что-то не так,"," ",e.jsx("strong",{children:"бросаем"})," ",e.jsx("code",{children:"ValidationError"}),"."]}),e.jsx(r,{language:"python",code:`class SignupForm(forms.Form):
    username = forms.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username']          # берём уже прочитанное значение поля
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('Это имя уже занято')
        return username   # ВАЖНО: метод обязательно должен вернуть значение обратно`}),e.jsxs(o,{title:"Почему нужно return в конце",children:["Если забыть ",e.jsx("code",{children:"return username"}),", поле после валидации станет ",e.jsx("code",{children:"None"})," — Django ожидает, что ",e.jsx("code",{children:"clean_<field>"})," вернёт итоговое (возможно, изменённое, например обрезанное от пробелов) значение поля."]})]}),e.jsxs(a,{n:3,title:"Добавим проверку НЕСКОЛЬКИХ полей — clean()",children:[e.jsxs("p",{children:["Сравнение пароля и его подтверждения затрагивает сразу два поля — такое место не метод одного поля, а метод ",e.jsx("code",{children:"clean()"})," всей формы. Он вызывается уже после того, как отработали все отдельные"," ",e.jsx("code",{children:"clean_<field>"}),"."]}),e.jsx(r,{language:"python",code:`    def clean(self):
        cleaned = super().clean()   # сначала выполняем стандартную проверку родителя
        if cleaned.get('password') != cleaned.get('password_confirm'):
            raise forms.ValidationError('Пароли не совпадают')
        return cleaned   # и здесь тоже обязательно возвращаем данные`}),e.jsxs("p",{children:["Обрати внимание: используем ",e.jsx("code",{children:"cleaned.get(...)"}),", а не ",e.jsx("code",{children:"cleaned['...']"})," — если одно из полей не прошло свою собственную проверку раньше, его может не быть в"," ",e.jsx("code",{children:"cleaned"}),", и обращение по квадратным скобкам вызвало бы дополнительную ошибку"," ",e.jsx("code",{children:"KeyError"}),"."]})]}),e.jsxs(a,{n:4,title:"Используем готовую форму во view",children:[e.jsx("p",{children:"Форма готова — осталось передать в неё данные запроса и спросить, прошла ли она валидацию."}),e.jsx(r,{language:"python",code:`form = SignupForm(request.POST)
if form.is_valid():          # запускает ВСЕ clean_* и clean() методы
    # form.cleaned_data — словарь с уже проверенными и очищенными данными
    ...
else:
    print(form.errors)       # словарь ошибок: {'username': [...], '__all__': [...]}`})]}),e.jsx(l,{children:"Полная форма регистрации целиком"}),e.jsx(r,{language:"python",code:`from django import forms

class SignupForm(forms.Form):
    username = forms.CharField(max_length=50)
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)

    def clean_username(self):
        username = self.cleaned_data['username']
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError('Это имя уже занято')
        return username   # обязательно вернуть очищенное значение

    def clean(self):
        cleaned = super().clean()
        if cleaned.get('password') != cleaned.get('password_confirm'):
            raise forms.ValidationError('Пароли не совпадают')
        return cleaned

# Использование
form = SignupForm(request.POST)
if form.is_valid():
    # form.cleaned_data — проверенные данные
    ...
else:
    print(form.errors)   # словарь ошибок по полям`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Встроенные валидаторы"}),e.jsxs(s,{n:4,children:["Для типовых проверок не нужно писать код с нуля — Django поставляет готовые"," ",e.jsx("strong",{children:"валидаторы"}),": функции, которые принимают значение и бросают"," ",e.jsx("code",{children:"ValidationError"}),", если оно некорректно. Их подключают к полю модели или формы через параметр ",e.jsx("code",{children:"validators"}),"."]}),e.jsx(r,{language:"python",code:`from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator
from django.db import models

class Profile(models.Model):
    email = models.EmailField()   # встроенная проверка формата email
    phone = models.CharField(
        max_length=12,
        validators=[RegexValidator(r'^\\+7\\d{10}$', 'Формат: +7XXXXXXXXXX')]
    )
    bio = models.TextField(validators=[MinLengthValidator(10)])`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Валидация в DRF-сериализаторах"}),e.jsxs(s,{n:5,children:["В Django REST Framework (для API) валидация устроена похоже на формы, но в сериализаторе: проверка одного поля — метод ",e.jsx("code",{children:"validate_<имя_поля>"}),", проверка нескольких полей вместе — метод"," ",e.jsx("code",{children:"validate(self, attrs)"}),". Соберём сериализатор регистрации так же — от простого к сложному."]}),e.jsxs(a,{n:1,title:"Опишем поля сериализатора",children:[e.jsxs("p",{children:["Как и с формой, начинаем с перечисления полей и их типов. ",e.jsx("code",{children:"write_only=True"})," у пароля значит: поле принимается на вход, но никогда не попадёт в исходящий JSON-ответ."]}),e.jsx(r,{language:"python",code:`from rest_framework import serializers

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(write_only=True)
    age = serializers.IntegerField()`})]}),e.jsxs(a,{n:2,title:"Проверка одного поля — validate_username",children:[e.jsxs("p",{children:["Метод называется ",e.jsx("code",{children:"validate_"})," + имя поля. В отличие от Django Forms, здесь параметр приходит сразу аргументом ",e.jsx("code",{children:"value"}),", а не через ",e.jsx("code",{children:"self.cleaned_data"})," — читать ничего дополнительно не нужно."]}),e.jsx(r,{language:"python",code:`    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Это имя уже занято')
        return value   # тоже обязательно возвращаем значение обратно`})]}),e.jsxs(a,{n:3,title:"Ещё одна проверка одного поля — validate_age",children:[e.jsxs("p",{children:["Полей с собственной проверкой может быть сколько угодно — каждое просто получает свой метод"," ",e.jsx("code",{children:"validate_<field>"}),"."]}),e.jsx(r,{language:"python",code:`    def validate_age(self, value):
        if value < 0 or value > 120:
            raise serializers.ValidationError('Некорректный возраст')
        return value`})]}),e.jsxs(a,{n:4,title:"Проверка нескольких полей сразу — validate()",children:[e.jsxs("p",{children:["Когда правило затрагивает не одно поле, а их сочетание, используем общий метод"," ",e.jsx("code",{children:"validate(self, attrs)"}),". Он получает словарь ",e.jsx("code",{children:"attrs"})," уже со всеми прошедшими индивидуальную проверку полями и вызывается после всех"," ",e.jsx("code",{children:"validate_<field>"}),"."]}),e.jsx(r,{language:"python",code:`    def validate(self, attrs):
        if attrs['username'] == attrs['password']:
            raise serializers.ValidationError('Пароль не должен совпадать с логином')
        return attrs   # и здесь возвращаем данные — обычно без изменений`})]}),e.jsx(l,{children:"Полный сериализатор регистрации целиком"}),e.jsx(r,{language:"python",code:`from rest_framework import serializers

class SignupSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=50)
    password = serializers.CharField(write_only=True)
    age = serializers.IntegerField()

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Это имя уже занято')
        return value

    def validate_age(self, value):
        if value < 0 or value > 120:
            raise serializers.ValidationError('Некорректный возраст')
        return value

    def validate(self, attrs):
        # проверка, зависящая от нескольких полей сразу
        if attrs['username'] == attrs['password']:
            raise serializers.ValidationError('Пароль не должен совпадать с логином')
        return attrs`}),e.jsxs(o,{title:"is_valid() — точка входа",children:["Как и в формах, проверка запускается вызовом ",e.jsx("code",{children:"serializer.is_valid()"}),". При"," ",e.jsx("code",{children:"raise_exception=True"})," DRF сам сформирует ответ 400 со списком ошибок — не нужно писать"," ",e.jsx("code",{children:"if/else"})," вручную."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Кастомные валидаторы"}),e.jsxs(s,{n:6,children:["Проверку, которая нужна на нескольких полях/сериализаторах, удобнее вынести в отдельную"," ",e.jsx("strong",{children:"функцию-валидатор"})," и переиспользовать."]}),e.jsx(r,{language:"python",code:`def validate_no_bad_words(value):
    bad_words = ['спам', 'реклама']
    if any(word in value.lower() for word in bad_words):
        raise serializers.ValidationError('Текст содержит запрещённые слова')

class CommentSerializer(serializers.Serializer):
    text = serializers.CharField(validators=[validate_no_bad_words])`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. ValidationError — как это работает"}),e.jsxs(s,{n:7,children:["Когда валидатор или метод ",e.jsx("code",{children:"clean/validate"})," вызывает ",e.jsx("code",{children:"raise ValidationError(...)"}),", выполнение прерывается, а сообщение об ошибке ",e.jsx("strong",{children:"собирается"})," в общий словарь ошибок формы или сериализатора (ключ — имя поля, значение — список сообщений). Это позволяет за один проход собрать сразу ВСЕ ошибки, а не останавливаться на первой."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Обработка ошибок во view"}),e.jsx(s,{n:8,children:"Кроме валидации входных данных, во вью нужно обрабатывать и другие сбои: объект не найден, нарушение прав, ошибка базы данных. Разберём на двух типовых вью — «получить объект» и «создать объект»."}),e.jsxs(a,{n:1,title:"Объект не найден — get_object_or_404",children:[e.jsxs("p",{children:["Вместо того чтобы вручную писать ",e.jsx("code",{children:"try: Article.objects.get(pk=pk) except Article.DoesNotExist: ..."}),", используем готовый шорткат Django: он сам бросит ",e.jsx("code",{children:"Http404"}),", если записи нет, а Django/DRF автоматически поймает её и вернёт клиенту статус 404."]}),e.jsx(r,{language:"python",code:`from django.shortcuts import get_object_or_404
from rest_framework.response import Response

def get_article(request, pk):
    article = get_object_or_404(Article, pk=pk)   # если записи нет — сразу 404, дальше код не пойдёт
    return Response(ArticleSerializer(article).data)`})]}),e.jsxs(a,{n:2,title:"Создание объекта — сначала валидация, потом сохранение",children:[e.jsxs("p",{children:["Здесь мы применяем ровно то, что разобрали в предыдущих разделах: сериализатор проверяет данные"," ",e.jsx("code",{children:"is_valid()"}),", и только если проверка прошла — сохраняем."]}),e.jsx(r,{language:"python",code:`from rest_framework import status

def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)   # прервались с 400
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)             # успех — 201`})]}),e.jsx(l,{children:"Оба вью вместе"}),e.jsx(r,{language:"python",code:`from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status

def get_article(request, pk):
    # get_object_or_404 сам бросит Http404, если записи нет —
    # DRF/Django поймает это и вернёт 404 клиенту
    article = get_object_or_404(Article, pk=pk)
    return Response(ArticleSerializer(article).data)

def create_article(request):
    serializer = ArticleSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Кастомный обработчик исключений DRF"}),e.jsxs(s,{n:9,children:["Чтобы не дублировать ",e.jsx("code",{children:"try/except"})," в каждом вью, DRF позволяет задать"," ",e.jsx("strong",{children:"единый обработчик исключений"})," на весь проект: он перехватывает любое непойманное исключение и превращает его в аккуратный JSON-ответ с нужным статус-кодом. Настройка состоит из двух файлов."]}),e.jsxs(a,{n:1,title:"Пишем свою функцию-обработчик",children:[e.jsxs("p",{children:["Функция принимает исключение и контекст запроса, сначала отдаёт их ",e.jsx("strong",{children:"стандартному"})," ","обработчику DRF (он уже умеет превращать большинство исключений в ответ с нужным статусом), а затем лишь немного «переупаковывает» готовый ответ в наш собственный формат."]}),e.jsx(r,{language:"python",code:`# exceptions.py
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)   # сначала — стандартная обработка DRF
    if response is not None:                      # если DRF смог сформировать ответ...
        response.data = {                          # ...оборачиваем его в свой формат
            'error': True,
            'details': response.data,
        }
    return response`})]}),e.jsxs(a,{n:2,title:"Подключаем обработчик в настройках проекта",children:[e.jsx("p",{children:"Одной функции недостаточно — нужно указать Django REST Framework, что использовать нужно именно её, а не обработчик по умолчанию."}),e.jsx(r,{language:"python",code:`# settings.py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'myapp.exceptions.custom_exception_handler',
}`}),e.jsxs("p",{children:["После этого ",e.jsx("strong",{children:"любое"})," непойманное исключение в любом вью пройдёт через нашу функцию."]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Единый формат ответа об ошибке"}),e.jsx(s,{n:10,children:"Хорошая практика — договориться об одинаковой структуре ошибок для всего API, чтобы фронтенд обрабатывал их единообразно, независимо от того, что именно пошло не так."}),e.jsx(c,{headers:["Код","Ситуация"],rows:[["400 Bad Request","данные не прошли валидацию"],["401 Unauthorized","пользователь не аутентифицирован"],["403 Forbidden","аутентифицирован, но нет прав"],["404 Not Found","запрошенного объекта не существует"],["409 Conflict","конфликт состояния (например, email уже занят)"],["500 Internal Server Error","непредвиденная ошибка сервера"]]}),e.jsx(r,{language:"json",code:`{
  "error": true,
  "details": {
    "email": ["Введите корректный email."],
    "age": ["Некорректный возраст"]
  }
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Логирование ошибок"}),e.jsxs(s,{n:11,children:["Ошибки, которые не показывают пользователю целиком (например, 500-е), обязательно нужно"," ",e.jsx("strong",{children:"логировать"})," — иначе разработчик никогда не узнает, что на проде что-то сломалось. Django использует стандартный модуль ",e.jsx("code",{children:"logging"})," Python."]}),e.jsx(r,{language:"python",code:`import logging
logger = logging.getLogger(__name__)

def risky_view(request):
    try:
        result = external_api_call()
    except ConnectionError as e:
        logger.error('Не удалось связаться с внешним API: %s', e)
        return Response({'error': 'Сервис временно недоступен'}, status=503)
    return Response(result)`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"11. Ошибки на уровне базы данных"}),e.jsxs(s,{n:12,children:["Некоторые ошибки видны только на уровне СУБД: нарушение уникальности, внешнего ключа. Их ловят через"," ",e.jsx("code",{children:"IntegrityError"})," и превращают в понятный ответ, а не в «сырую» ошибку 500 с деталями схемы базы, которые лучше не показывать клиенту."]}),e.jsx(r,{language:"python",code:`from django.db import IntegrityError

def create_user(request):
    try:
        User.objects.create(username=request.data['username'])
    except IntegrityError:
        return Response({'error': 'Пользователь с таким именем уже существует'}, status=409)`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs(s,{n:13,children:["Серверная валидация обязательна независимо от проверок на фронтенде — она защищает данные и логику приложения. В Django её описывают через ",e.jsx("code",{children:"clean()"}),"/",e.jsx("code",{children:"clean_<field>"})," в формах или ",e.jsx("code",{children:"validate()"}),"/",e.jsx("code",{children:"validate_<field>"})," в DRF-сериализаторах, а типовые проверки берут из готовых валидаторов. Все ошибки валидации собираются в единый словарь через"," ",e.jsx("code",{children:"ValidationError"}),". Остальные сбои (404, ошибки БД, непредвиденные исключения) ловят через"," ",e.jsx("code",{children:"try/except"}),", ",e.jsx("code",{children:"get_object_or_404"})," и общий ",e.jsx("code",{children:"EXCEPTION_HANDLER"}),", возвращая клиенту предсказуемый JSON с правильным HTTP-кодом, а критичные ошибки — ещё и логируют."]})]})]})}export{m as default};
