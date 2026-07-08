import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', blue: '#60a5fa', red: '#f87171', green: '#4ade80', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
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

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

export default function July8DjangoValidationTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Валидация и обработка ошибок на бэкенде Django</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">8 июля 2026</p>
        <p>
          Никогда нельзя доверять данным, пришедшим от клиента — даже если фронтенд их уже проверил. Пользователь
          может отправить запрос напрямую (curl, Postman) в обход всех фронтенд-проверок. Поэтому сервер обязан
          сам проверять всё, что получает — это называется <strong>валидацией</strong>, а неизбежно возникающие
          ошибки нужно уметь красиво и предсказуемо возвращать клиенту. Разберём оба процесса на примере Django и
          Django REST Framework.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужна валидация</h2>
        <P n={1}>
          <strong>Валидация</strong> — проверка, что входящие данные соответствуют ожиданиям: email — это
          действительно email, возраст — положительное число, обязательное поле не пустое. Без неё в базу могут
          попасть некорректные или опасные данные, а бизнес-логика — сломаться на неожиданном значении.
        </P>
        <P n={2}>
          Есть два уровня проверки: <strong>клиентская</strong> (на фронтенде, JS) — быстро подсказывает
          пользователю об ошибке, улучшает UX, но её легко обойти. И <strong>серверная</strong> (на бэкенде) —
          обязательна, потому что именно она защищает базу данных и бизнес-логику от некорректных или
          злонамеренных запросов, откуда бы они ни пришли.
        </P>
        <Fig caption="Клиентская валидация — для удобства пользователя (можно обойти). Серверная — обязательный барьер защиты данных">
          <svg viewBox="0 0 540 130" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="35" width="140" height="55" rx="8" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="90" y="58" fill={C.blue} fontSize="12" fontWeight="700" textAnchor="middle">Клиент (JS)</text>
            <text x="90" y="75" fill={C.sub} fontSize="10" textAnchor="middle">можно обойти</text>
            <line x1="160" y1="62" x2="220" y2="62" stroke={C.sub} strokeWidth="2" markerEnd="url(#dv)" />
            <rect x="220" y="35" width="140" height="55" rx="8" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="290" y="58" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Сеть</text>
            <text x="290" y="75" fill={C.sub} fontSize="10" textAnchor="middle">curl / Postman в обход</text>
            <line x1="360" y1="62" x2="420" y2="62" stroke={C.sub} strokeWidth="2" markerEnd="url(#dv)" />
            <rect x="420" y="35" width="110" height="55" rx="8" fill="rgba(200,255,0,0.08)" stroke={C.lime} />
            <text x="475" y="58" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">Сервер</text>
            <text x="475" y="75" fill={C.sub} fontSize="10" textAnchor="middle">обязательный барьер</text>
            <defs>
              <marker id="dv" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Валидация в Django Forms</h2>
        <P n={3}>
          В классических Django Forms валидацию одного поля описывают методом <code>clean_&lt;имя_поля&gt;</code>,
          а проверку, зависящую сразу от нескольких полей — методом <code>clean()</code> всей формы.
        </P>
        <TheoryCode language="python" code={`from django import forms

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
    print(form.errors)   # словарь ошибок по полям`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Встроенные валидаторы</h2>
        <P n={4}>
          Для типовых проверок не нужно писать код с нуля — Django поставляет готовые{' '}
          <strong>валидаторы</strong>: функции, которые принимают значение и бросают{' '}
          <code>ValidationError</code>, если оно некорректно. Их подключают к полю модели или формы через
          параметр <code>validators</code>.
        </P>
        <TheoryCode language="python" code={`from django.core.validators import MinLengthValidator, EmailValidator, RegexValidator
from django.db import models

class Profile(models.Model):
    email = models.EmailField()   # встроенная проверка формата email
    phone = models.CharField(
        max_length=12,
        validators=[RegexValidator(r'^\\+7\\d{10}$', 'Формат: +7XXXXXXXXXX')]
    )
    bio = models.TextField(validators=[MinLengthValidator(10)])`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Валидация в DRF-сериализаторах</h2>
        <P n={5}>
          В Django REST Framework (для API) валидация устроена похоже, но в сериализаторе: проверка одного поля —
          метод <code>validate_&lt;имя_поля&gt;</code>, проверка нескольких полей вместе — метод{' '}
          <code>validate(self, attrs)</code>.
        </P>
        <TheoryCode language="python" code={`from rest_framework import serializers

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
        return attrs`} />
        <TheoryExample title="is_valid() — точка входа">
          Как и в формах, проверка запускается вызовом <code>serializer.is_valid()</code>. При{' '}
          <code>raise_exception=True</code> DRF сам сформирует ответ 400 со списком ошибок — не нужно писать{' '}
          <code>if/else</code> вручную.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Кастомные валидаторы</h2>
        <P n={6}>
          Проверку, которая нужна на нескольких полях/сериализаторах, удобнее вынести в отдельную{' '}
          <strong>функцию-валидатор</strong> и переиспользовать.
        </P>
        <TheoryCode language="python" code={`def validate_no_bad_words(value):
    bad_words = ['спам', 'реклама']
    if any(word in value.lower() for word in bad_words):
        raise serializers.ValidationError('Текст содержит запрещённые слова')

class CommentSerializer(serializers.Serializer):
    text = serializers.CharField(validators=[validate_no_bad_words])`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. ValidationError — как это работает</h2>
        <P n={7}>
          Когда валидатор или метод <code>clean/validate</code> вызывает <code>raise ValidationError(...)</code>,
          выполнение прерывается, а сообщение об ошибке <strong>собирается</strong> в общий словарь ошибок формы
          или сериализатора (ключ — имя поля, значение — список сообщений). Это позволяет за один проход собрать
          сразу ВСЕ ошибки, а не останавливаться на первой.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Обработка ошибок во view</h2>
        <P n={8}>
          Кроме валидации входных данных, во вью нужно обрабатывать и другие сбои: объект не найден, нарушение
          прав, ошибка базы данных. Стандартный подход — <code>try/except</code> вокруг рискованного кода плюс
          готовые short-cut функции Django.
        </P>
        <TheoryCode language="python" code={`from django.shortcuts import get_object_or_404
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
    return Response(serializer.data, status=status.HTTP_201_CREATED)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Кастомный обработчик исключений DRF</h2>
        <P n={9}>
          Чтобы не дублировать <code>try/except</code> в каждом вью, DRF позволяет задать{' '}
          <strong>единый обработчик исключений</strong> на весь проект: он перехватывает любое непойманное
          исключение и превращает его в аккуратный JSON-ответ с нужным статус-кодом.
        </P>
        <TheoryCode language="python" code={`# exceptions.py
from rest_framework.views import exception_handler

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)   # стандартная обработка DRF
    if response is not None:
        response.data = {
            'error': True,
            'details': response.data,
        }
    return response

# settings.py
REST_FRAMEWORK = {
    'EXCEPTION_HANDLER': 'myapp.exceptions.custom_exception_handler',
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Единый формат ответа об ошибке</h2>
        <P n={10}>
          Хорошая практика — договориться об одинаковой структуре ошибок для всего API, чтобы фронтенд обрабатывал
          их единообразно, независимо от того, что именно пошло не так.
        </P>
        <TheoryTable
          headers={['Код', 'Ситуация']}
          rows={[
            ['400 Bad Request', 'данные не прошли валидацию'],
            ['401 Unauthorized', 'пользователь не аутентифицирован'],
            ['403 Forbidden', 'аутентифицирован, но нет прав'],
            ['404 Not Found', 'запрошенного объекта не существует'],
            ['409 Conflict', 'конфликт состояния (например, email уже занят)'],
            ['500 Internal Server Error', 'непредвиденная ошибка сервера'],
          ]}
        />
        <TheoryCode language="json" code={`{
  "error": true,
  "details": {
    "email": ["Введите корректный email."],
    "age": ["Некорректный возраст"]
  }
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Логирование ошибок</h2>
        <P n={11}>
          Ошибки, которые не показывают пользователю целиком (например, 500-е), обязательно нужно{' '}
          <strong>логировать</strong> — иначе разработчик никогда не узнает, что на проде что-то сломалось.
          Django использует стандартный модуль <code>logging</code> Python.
        </P>
        <TheoryCode language="python" code={`import logging
logger = logging.getLogger(__name__)

def risky_view(request):
    try:
        result = external_api_call()
    except ConnectionError as e:
        logger.error('Не удалось связаться с внешним API: %s', e)
        return Response({'error': 'Сервис временно недоступен'}, status=503)
    return Response(result)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. Ошибки на уровне базы данных</h2>
        <P n={12}>
          Некоторые ошибки видны только на уровне СУБД: нарушение уникальности, внешнего ключа. Их ловят через{' '}
          <code>IntegrityError</code> и превращают в понятный ответ, а не в «сырую» ошибку 500 с деталями схемы
          базы, которые лучше не показывать клиенту.
        </P>
        <TheoryCode language="python" code={`from django.db import IntegrityError

def create_user(request):
    try:
        User.objects.create(username=request.data['username'])
    except IntegrityError:
        return Response({'error': 'Пользователь с таким именем уже существует'}, status=409)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={13}>
          Серверная валидация обязательна независимо от проверок на фронтенде — она защищает данные и логику
          приложения. В Django её описывают через <code>clean()</code>/<code>clean_&lt;field&gt;</code> в формах
          или <code>validate()</code>/<code>validate_&lt;field&gt;</code> в DRF-сериализаторах, а типовые проверки
          берут из готовых валидаторов. Все ошибки валидации собираются в единый словарь через{' '}
          <code>ValidationError</code>. Остальные сбои (404, ошибки БД, непредвиденные исключения) ловят через{' '}
          <code>try/except</code>, <code>get_object_or_404</code> и общий <code>EXCEPTION_HANDLER</code>,
          возвращая клиенту предсказуемый JSON с правильным HTTP-кодом, а критичные ошибки — ещё и логируют.
        </P>
      </section>
    </div>
  )
}
