import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', red: '#f87171', blue: '#60a5fa', green: '#4ade80', yellow: '#facc15', border: '#2a2a3a' }

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

// Карточка одной категории OWASP
function Risk({ code, title, children }) {
  return (
    <div style={{ margin: '16px 0', padding: '14px 16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', fontWeight: 700, fontSize: 12, padding: '3px 10px', borderRadius: 6, fontFamily: 'monospace' }}>{code}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 16 }}>{title}</span>
      </div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7 }}>{children}</div>
    </div>
  )
}

function Defend({ children }) {
  return (
    <div style={{ marginTop: 8, paddingLeft: 12, borderLeft: '2px solid #4ade80' }}>
      <span style={{ color: '#4ade80', fontWeight: 700, fontSize: 13 }}>Защита: </span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 13.5 }}>{children}</span>
    </div>
  )
}

export default function July9OwaspTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">OWASP Top 10: полный разбор</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">9 июля 2026</p>
        <p>
          Большинство взломов веб-приложений происходят не из-за экзотических атак, а из-за одних и тех же типовых
          ошибок. <strong>OWASP Top 10</strong> — это составленный сообществом OWASP список десяти самых
          критичных категорий уязвимостей веб-приложений, обновляемый раз в несколько лет (актуальная редакция —
          2021). Это отраслевой стандарт: с него начинают обучение безопасной разработке и по нему проверяют
          приложения. Разберём все десять категорий: что это, как эксплуатируется и как защищаться.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое OWASP и Top 10</h2>
        <P n={1}>
          <strong>OWASP (Open Worldwide Application Security Project)</strong> — некоммерческое сообщество,
          развивающее открытые проекты по безопасности приложений (инструменты, методики, гайды). Самый известный
          его продукт — <strong>Top 10</strong>.
        </P>
        <P n={2}>
          Важно понимать: Top 10 — это не список конкретных уязвимостей, а <strong>категории (классы) рисков</strong>,
          отсортированные по распространённости и опасности. Позиции обозначают как A01…A10 (A — Application).
          Список пересматривают на основе реальных данных о взломах, поэтому он отражает актуальную картину угроз.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Обзор десятки (OWASP Top 10 — 2021)</h2>
        <TheoryTable
          headers={['Код', 'Категория']}
          rows={[
            ['A01', 'Broken Access Control — нарушение контроля доступа'],
            ['A02', 'Cryptographic Failures — ошибки криптографии'],
            ['A03', 'Injection — инъекции (SQL, XSS и др.)'],
            ['A04', 'Insecure Design — небезопасный дизайн'],
            ['A05', 'Security Misconfiguration — ошибки конфигурации'],
            ['A06', 'Vulnerable & Outdated Components — уязвимые зависимости'],
            ['A07', 'Identification & Authentication Failures — ошибки аутентификации'],
            ['A08', 'Software & Data Integrity Failures — нарушение целостности'],
            ['A09', 'Logging & Monitoring Failures — ошибки логирования и мониторинга'],
            ['A10', 'SSRF — подделка серверных запросов'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. A01: Broken Access Control</h2>
        <Risk code="A01" title="Нарушение контроля доступа">
          Самая частая категория. Пользователь получает доступ к данным или действиям, которые ему не положены:
          обычный пользователь открывает админку, читает чужие заказы, меняет чужой профиль. Классика —{' '}
          <strong>IDOR</strong> (Insecure Direct Object Reference): подставив в URL{' '}
          <code>/orders/124</code> вместо своего <code>/orders/123</code>, пользователь видит чужой заказ, потому
          что сервер не проверил, что заказ принадлежит именно ему.
          <TheoryCode language="text" code={`GET /api/orders/123   -> мой заказ (ок)
GET /api/orders/124   -> ЧУЖОЙ заказ, а сервер его отдаёт (уязвимость!)`} />
          <Defend>
            проверять права на КАЖДЫЙ запрос на сервере (не полагаться на скрытие кнопок в UI); запрещать по
            умолчанию (deny by default); привязывать объекты к владельцу и проверять владельца.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. A02: Cryptographic Failures</h2>
        <Risk code="A02" title="Ошибки криптографии">
          Раньше называлась «Sensitive Data Exposure». Чувствительные данные (пароли, карты, персональные данные)
          недостаточно защищены: передаются или хранятся в открытом виде, используются слабые или устаревшие
          алгоритмы (MD5, SHA-1 для паролей), нет шифрования трафика (HTTP вместо HTTPS), захардкоженные ключи в
          коде.
          <Defend>
            всегда HTTPS (TLS); пароли — хэшировать медленными алгоритмами с солью (bcrypt, Argon2), а не MD5;
            шифровать чувствительные данные в базе; не хранить лишние данные; ключи — в переменных окружения, не в
            коде.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. A03: Injection</h2>
        <Risk code="A03" title="Инъекции">
          Приложение подставляет непроверенные данные пользователя прямо в запрос/команду, и злоумышленник
          «вклинивает» свой код. Самая известная — <strong>SQL-инъекция</strong>: ввод склеивается со строкой
          SQL-запроса. Сюда же относится <strong>XSS</strong> (внедрение JavaScript в страницу) и инъекции команд ОС.
          <TheoryCode language="python" code={`# ОПАСНО: ввод склеен со строкой запроса
query = "SELECT * FROM users WHERE name = '" + user_input + "'"
# при user_input = ' OR '1'='1  запрос вернёт ВСЕХ пользователей

# БЕЗОПАСНО: параметризованный запрос
cursor.execute("SELECT * FROM users WHERE name = %s", (user_input,))`} />
          <Defend>
            параметризованные запросы (prepared statements) вместо склейки строк; ORM (Django ORM делает это сам);
            экранирование вывода для защиты от XSS; валидация и санитизация ввода.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. A04: Insecure Design</h2>
        <Risk code="A04" title="Небезопасный дизайн">
          Новая категория 2021 года. Проблема не в ошибке кода, а в <strong>изначально небезопасной
          архитектуре</strong>: логику продумали без учёта угроз. Например, восстановление пароля через «секретный
          вопрос» (ответ легко угадать), отсутствие ограничения на число попыток входа, бизнес-логика, позволяющая
          обойти оплату. Такое не исправить патчем — нужно менять сам замысел.
          <Defend>
            моделирование угроз (threat modeling) на этапе проектирования; принцип «безопасность по умолчанию»;
            продумывать злоупотребления (abuse cases), а не только сценарии нормального использования; лимиты и
            ограничения в логике.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. A05: Security Misconfiguration</h2>
        <Risk code="A05" title="Ошибки конфигурации">
          Приложение или сервер настроены небезопасно: включён режим отладки на проде (выдаёт стектрейсы и данные),
          используются пароли по умолчанию (admin/admin), открыты лишние порты и сервисы, подробные сообщения об
          ошибках раскрывают внутреннее устройство, не отключены ненужные функции.
          <TheoryCode language="python" code={`# settings.py — типичная ошибка на проде
DEBUG = True   # ОПАСНО: показывает стектрейсы и переменные окружения всем!
# На проде должно быть DEBUG = False`} />
          <Defend>
            отключать debug на проде; менять пароли по умолчанию; минимальная конфигурация (только нужное);
            автоматизировать настройку (чтобы она была одинаковой и проверяемой); скрывать детали ошибок от
            пользователя.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. A06: Vulnerable and Outdated Components</h2>
        <Risk code="A06" title="Уязвимые и устаревшие компоненты">
          Современное приложение состоит на 80% из чужого кода — библиотек и зависимостей. Если в используемой
          версии библиотеки найдена уязвимость (CVE), а её не обновили — приложение уязвимо, даже если собственный
          код идеален. Классический пример — Log4Shell (2021) в библиотеке Log4j.
          <TheoryCode language="bash" code={`# проверка зависимостей на известные уязвимости
pip-audit          # для Python
npm audit          # для Node.js`} />
          <Defend>
            вести учёт зависимостей; регулярно обновлять; использовать сканеры уязвимостей (pip-audit, npm audit,
            Dependabot); убирать неиспользуемые зависимости; брать компоненты только из доверенных источников.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. A07: Identification and Authentication Failures</h2>
        <Risk code="A07" title="Ошибки аутентификации">
          Слабая проверка личности пользователя: разрешены простые пароли, нет защиты от перебора (brute-force),
          нет двухфакторной аутентификации, предсказуемые или незащищённые идентификаторы сессий, сессия не
          завершается при выходе. Всё это позволяет захватить чужой аккаунт.
          <Defend>
            требования к сложности паролей; ограничение попыток входа и капча; двухфакторная аутентификация (2FA);
            безопасные сессии (случайные токены, флаги HttpOnly/Secure у cookie); завершение сессии при выходе;
            хранить пароли только в виде хэша.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. A08: Software and Data Integrity Failures</h2>
        <Risk code="A08" title="Нарушение целостности ПО и данных">
          Приложение доверяет коду или данным из непроверенного источника без проверки целостности. Примеры:
          обновления скачиваются без проверки цифровой подписи (можно подменить), небезопасная десериализация
          (принимаем сериализованный объект от пользователя и восстанавливаем — можно выполнить чужой код),
          подключение скриптов со сторонних CDN без контроля. Сюда относят и атаки на цепочку поставок (supply
          chain).
          <Defend>
            проверять цифровые подписи обновлений и пакетов; не десериализовать непроверенные данные; использовать
            Subresource Integrity (SRI) для внешних скриптов; защищать CI/CD-пайплайн.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. A09: Security Logging and Monitoring Failures</h2>
        <Risk code="A09" title="Ошибки логирования и мониторинга">
          Атаки не логируются или логи никто не смотрит — из-за этого взлом обнаруживают спустя месяцы (в среднем
          — более 200 дней). Если нет журналирования входов, ошибок доступа и подозрительных действий, а также
          оповещений — команда не заметит атаку в процессе и не сможет расследовать инцидент после.
          <Defend>
            логировать значимые события безопасности (входы, отказы доступа, ошибки валидации); хранить логи
            централизованно и защищённо; настроить оповещения (алерты) на аномалии; иметь план реагирования на
            инциденты. Важно: НЕ логировать сами пароли и чувствительные данные.
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">12. A10: Server-Side Request Forgery (SSRF)</h2>
        <Risk code="A10" title="Подделка серверных запросов">
          Новая категория 2021 года. Приложение принимает от пользователя URL и делает по нему запрос со своей
          стороны (например, «загрузить картинку по ссылке»). Злоумышленник подсовывает внутренний адрес — и
          заставляет сервер обращаться к внутренним сервисам, недоступным снаружи: базам данных, метаданным
          облака (например, <code>http://169.254.169.254</code> в AWS, откуда можно украсть ключи доступа).
          <TheoryCode language="text" code={`Пользователь просит: загрузи http://example.com/pic.jpg  (норма)
Атакующий просит:    загрузи http://169.254.169.254/...   (внутренний адрес!)
-> сервер сам обращается внутрь сети и отдаёт секреты`} />
          <Defend>
            белый список разрешённых адресов/доменов; запрет обращений к внутренним IP-диапазонам; не отправлять
            «сырой» ответ обратно пользователю; сетевая сегментация (сервер не должен иметь доступ к тому, что ему
            не нужно).
          </Defend>
        </Risk>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">13. Как использовать Top 10 на практике</h2>
        <P n={3}>
          OWASP Top 10 — это <strong>чек-лист и общий язык</strong>. Разработчику он задаёт минимальный набор
          проверок для каждой фичи; при код-ревью — на что смотреть; пентестеру — с чего начинать проверку;
          команде — общую терминологию, чтобы «A03» понимали одинаково. Но это именно <strong>минимум</strong>, а
          не полный список угроз: покрыть Top 10 необходимо, но недостаточно для полной безопасности.
        </P>
        <TheoryExample title="Смежные проекты OWASP">
          Кроме Top 10 у OWASP есть: <strong>OWASP Cheat Sheets</strong> — краткие руководства по защите от каждой
          угрозы; <strong>OWASP ASVS</strong> — детальный стандарт требований к безопасности; <strong>OWASP
          ZAP</strong> — бесплатный сканер уязвимостей; <strong>OWASP WebGoat</strong> — учебное уязвимое
          приложение для тренировки. Начинать изучение атак безопаснее всего именно на таких «полигонах».
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={4}>
          OWASP Top 10 — отраслевой список десяти самых критичных категорий уязвимостей веб-приложений. Ядро
          проблем: неправильный <strong>контроль доступа (A01)</strong>, слабая <strong>криптография (A02)</strong>,{' '}
          <strong>инъекции (A03)</strong>, изначально <strong>небезопасный дизайн (A04)</strong>, ошибки{' '}
          <strong>конфигурации (A05)</strong>, <strong>устаревшие зависимости (A06)</strong>, слабая{' '}
          <strong>аутентификация (A07)</strong>, нарушение <strong>целостности (A08)</strong>, отсутствие{' '}
          <strong>логирования и мониторинга (A09)</strong> и <strong>SSRF (A10)</strong>. Общий принцип защиты
          повторяется во всех пунктах: не доверять вводу, проверять права на сервере, использовать проверенные
          алгоритмы и библиотеки, настраивать всё безопасно по умолчанию и вести журналы. Top 10 — обязательный
          минимум и общий язык для команды, но не исчерпывающий список угроз.
        </P>
      </section>
    </div>
  )
}
