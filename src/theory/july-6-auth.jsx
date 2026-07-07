import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', blue: '#60a5fa', green: '#4ade80', red: '#f87171', border: '#2a2a3a' }

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

export default function July6AuthTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Аутентификация и авторизация</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">6 июля 2026</p>
        <p>
          Как только у приложения появляются пользователи, встаёт вопрос: «кто ты?» и «что тебе можно?». Это два
          разных процесса — <strong>аутентификация</strong> и <strong>авторизация</strong>. Их постоянно путают,
          хотя решают они разные задачи. Сегодня разберём, что это такое в общем, как устроена проверка пароля,
          зачем нужны сессии и токены, и как всё это делается на практике в <strong>Django</strong>.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">🎥 Видео-лекция: Аутентификация и авторизация</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/backendDay7.mov" />
      </section>

      {/* Два понятия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Аутентификация ≠ авторизация</h2>
        <Term name="Аутентификация (authentication)">
          проверка, <strong>кто ты</strong>. Пользователь доказывает, что он тот, за кого себя выдаёт — обычно
          логином и паролем (а ещё кодом из SMS, отпечатком, ключом). Ответ на вопрос: «ты действительно Аня?».
        </Term>
        <Term name="Авторизация (authorization)">
          проверка, <strong>что тебе разрешено</strong>. Уже известному пользователю решают, какие действия и
          данные ему доступны. Ответ на вопрос: «Аня, тебе можно удалять чужие статьи?».
        </Term>
        <Fig caption="Сначала аутентификация (кто ты — по логину и паролю), затем авторизация (что тебе можно — по твоей роли и правам)">
          <svg viewBox="0 0 540 160" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="55" width="150" height="60" rx="10" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="95" y="80" fill={C.blue} fontSize="13" fontWeight="700" textAnchor="middle">Аутентификация</text>
            <text x="95" y="99" fill={C.sub} fontSize="10" textAnchor="middle">кто ты? логин+пароль</text>
            <line x1="170" y1="85" x2="230" y2="85" stroke={C.sub} strokeWidth="2" markerEnd="url(#au)" />
            <rect x="230" y="55" width="150" height="60" rx="10" fill="rgba(74,222,128,0.10)" stroke={C.green} />
            <text x="305" y="80" fill={C.green} fontSize="13" fontWeight="700" textAnchor="middle">Авторизация</text>
            <text x="305" y="99" fill={C.sub} fontSize="10" textAnchor="middle">что тебе можно?</text>
            <line x1="380" y1="85" x2="440" y2="85" stroke={C.sub} strokeWidth="2" markerEnd="url(#au)" />
            <rect x="440" y="55" width="90" height="60" rx="10" fill="rgba(200,255,0,0.06)" stroke={C.lime} />
            <text x="485" y="82" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">доступ</text>
            <text x="485" y="99" fill={C.sub} fontSize="10" textAnchor="middle">к ресурсу</text>
            <defs>
              <marker id="au" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Как хранят пароли */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Как правильно хранить пароли</h2>
        <p>
          Базовое правило безопасности: пароли <strong>никогда не хранят в открытом виде</strong>. Если базу
          украдут, все пароли утекут. Вместо пароля хранят его <strong>хеш</strong>.
        </p>
        <Term name="Хеширование">
          одностороннее преобразование пароля в строку фиксированной длины. По хешу нельзя восстановить пароль, но
          можно проверить: хешируем введённый пароль и сравниваем с сохранённым хешем.
        </Term>
        <Term name="Соль (salt)">
          случайная добавка к паролю перед хешированием. Благодаря ей одинаковые пароли дают разные хеши, и
          заранее посчитанные таблицы взлома («радужные таблицы») бесполезны. Современные алгоритмы (bcrypt,
          Argon2, PBKDF2) добавляют соль автоматически.
        </Term>
        <Fig caption="При регистрации пароль хешируется и в базу попадает только хеш. При входе введённый пароль хешируется снова и сравнивается с сохранённым">
          <svg viewBox="0 0 540 150" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="55" width="120" height="40" rx="8" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="80" y="79" fill={C.text} fontSize="12" textAnchor="middle">"qwerty123"</text>
            <line x1="140" y1="75" x2="200" y2="75" stroke={C.sub} strokeWidth="2" markerEnd="url(#ha)" />
            <text x="170" y="66" fill={C.sub} fontSize="10" textAnchor="middle">hash+salt</text>
            <rect x="200" y="55" width="180" height="40" rx="8" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="290" y="79" fill={C.blue} fontSize="11" textAnchor="middle">$2b$12$Xk9...aQ</text>
            <line x1="380" y1="75" x2="440" y2="75" stroke={C.sub} strokeWidth="2" markerEnd="url(#ha)" />
            <rect x="440" y="55" width="90" height="40" rx="8" fill="rgba(74,222,128,0.08)" stroke={C.green} />
            <text x="485" y="79" fill={C.green} fontSize="12" textAnchor="middle">в базу</text>
            <text x="290" y="120" fill={C.red} fontSize="11" textAnchor="middle">← восстановить пароль из хеша нельзя</text>
            <defs>
              <marker id="ha" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Сессии и токены */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Как сервер «помнит» вошедшего: сессии и токены</h2>
        <p>
          HTTP <strong>не помнит</strong> предыдущие запросы (stateless). Значит, после успешного входа нужен
          способ узнавать пользователя в следующих запросах — иначе логин пришлось бы вводить на каждой странице.
          Два основных подхода:
        </p>
        <Term name="Сессии + cookie (session-based)">
          после входа сервер создаёт запись о сессии у себя и выдаёт браузеру <strong>cookie</strong> с её
          идентификатором. Браузер шлёт эту cookie с каждым запросом — сервер по ней узнаёт пользователя. Так по
          умолчанию работает Django.
        </Term>
        <Term name="Токены (token-based, JWT)">
          после входа сервер выдаёт подписанный <strong>токен</strong>, который клиент хранит и прикладывает к
          каждому запросу в заголовке <code>Authorization</code>. Сервер не хранит состояние — удобно для API и
          мобильных приложений.
        </Term>
        <Fig caption="Session-based: сервер хранит сессию и отдаёт cookie с её id. Token-based: сервер отдаёт подписанный токен, клиент хранит его сам">
          <svg viewBox="0 0 540 170" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="120" height="46" rx="8" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="90" y="52" fill={C.text} fontSize="12" textAnchor="middle">Браузер</text>
            <text x="90" y="68" fill={C.sub} fontSize="10" textAnchor="middle">хранит cookie/токен</text>
            <rect x="390" y="30" width="120" height="46" rx="8" fill="rgba(200,255,0,0.06)" stroke={C.lime} />
            <text x="450" y="52" fill={C.lime} fontSize="12" textAnchor="middle">Сервер</text>
            <line x1="150" y1="45" x2="390" y2="45" stroke={C.green} strokeWidth="2" markerEnd="url(#se)" />
            <text x="270" y="38" fill={C.green} fontSize="10" textAnchor="middle">1) логин + пароль</text>
            <line x1="390" y1="66" x2="150" y2="66" stroke={C.blue} strokeWidth="2" markerEnd="url(#se2)" />
            <text x="270" y="82" fill={C.blue} fontSize="10" textAnchor="middle">2) cookie сессии / токен</text>
            <line x1="150" y1="110" x2="390" y2="110" stroke={C.sub} strokeWidth="2" markerEnd="url(#se)" />
            <text x="270" y="103" fill={C.sub} fontSize="10" textAnchor="middle">3) каждый след. запрос + cookie/токен</text>
            <text x="270" y="130" fill={C.sub} fontSize="10" textAnchor="middle">→ сервер узнаёт пользователя, логин больше не нужен</text>
            <defs>
              <marker id="se" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.green} /></marker>
              <marker id="se2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.blue} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Django auth */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Аутентификация в Django</h2>
        <p>
          В Django система аутентификации встроена «из коробки»: есть модель <code>User</code>, безопасное
          хеширование паролей и готовые функции. Пароль хешируется автоматически.
        </p>
        <TheoryCode language="python" code={`from django.contrib.auth.models import User

# Создание пользователя — пароль хешируется автоматически (никогда не хранится открытым)
user = User.objects.create_user(username='anya', password='secret123')

# Проверить пароль вручную (обычно не нужно — есть authenticate)
user.check_password('secret123')   # True / False`} />
        <TheoryCode language="python" code={`# views.py — вход пользователя
from django.contrib.auth import authenticate, login, logout

def login_view(request):
    username = request.POST['username']
    password = request.POST['password']

    # authenticate: ищет пользователя и сверяет хеш пароля
    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)        # создаёт сессию, ставит cookie
        return JsonResponse({'status': 'ok', 'user': user.username})
    else:
        # неверный логин или пароль
        return JsonResponse({'status': 'error'}, status=401)  # 401 Unauthorized

def logout_view(request):
    logout(request)                 # удаляет сессию
    return JsonResponse({'status': 'logged out'})`} />
      </section>

      {/* Django authz */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Авторизация в Django</h2>
        <p>
          После входа Django знает пользователя в каждом запросе через <code>request.user</code>. Авторизацию —
          «что можно» — реализуют проверками и декораторами.
        </p>
        <TheoryCode language="python" code={`from django.contrib.auth.decorators import login_required

# Пускать только вошедших пользователей
@login_required
def profile(request):
    # сюда попадёт только аутентифицированный пользователь
    return JsonResponse({'user': request.user.username})

# Ручная проверка прав внутри вью
def delete_article(request, article_id):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'нужен вход'}, status=401)   # не аутентифицирован
    if not request.user.is_staff:
        return JsonResponse({'error': 'нет прав'}, status=403)     # аутентифицирован, но нет прав (403 Forbidden)
    # ... удаляем статью ...
    return JsonResponse({'status': 'deleted'})`} />
        <TheoryTable
          headers={['Свойство / инструмент', 'Что делает']}
          rows={[
            ['request.user', 'текущий пользователь запроса'],
            ['request.user.is_authenticated', 'вошёл ли пользователь (аутентификация)'],
            ['request.user.is_staff / is_superuser', 'роль/права (авторизация)'],
            ['@login_required', 'пускать во вью только вошедших'],
            ['user.has_perm("app.perm")', 'проверка конкретного права'],
          ]}
        />
        <TheoryExample title="Коды ответов важны">
          <strong>401 Unauthorized</strong> — «ты не представился» (нет аутентификации).{' '}
          <strong>403 Forbidden</strong> — «я знаю кто ты, но тебе нельзя» (нет авторизации). Разные коды для
          разных проблем — так и клиент, и разработчик сразу понимают причину отказа.
        </TheoryExample>
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          <strong>Аутентификация</strong> отвечает на «кто ты» (проверка логина и пароля),{' '}
          <strong>авторизация</strong> — на «что тебе можно» (проверка прав). Пароли всегда хранят как{' '}
          <strong>хеш с солью</strong>, а не открытым текстом. Чтобы HTTP «помнил» вошедшего, используют{' '}
          <strong>сессии с cookie</strong> (по умолчанию в Django) или <strong>токены</strong> (для API). В
          Django вход делают через <code>authenticate</code> + <code>login</code>, а права проверяют через{' '}
          <code>request.user</code>, <code>@login_required</code> и роли, возвращая <strong>401</strong> при
          отсутствии входа и <strong>403</strong> при нехватке прав.
        </p>
      </section>
    </div>
  )
}
