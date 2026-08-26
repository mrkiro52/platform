import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

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

export default function July18CtfTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">CTF: основные принципы</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">18 июля 2026</p>
        <p>
          CTF (Capture The Flag, «захват флага») — формат соревнований по кибербезопасности, на которых участники
          ищут спрятанные в системах «флаги» — уникальные строки-доказательства того, что уязвимость найдена и
          использована. Материал даётся исключительно в образовательных целях — тренировки проходят на специально
          подготовленных учебных стендах (например, picoCTF, HackTheBox, TryHackMe), а не на чужих реальных
          системах без разрешения.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое CTF и зачем он нужен</h2>
        <Term name="CTF (Capture The Flag)">
          соревновательный формат, в котором участники решают практические задачи по безопасности — находят
          уязвимости, взламывают шифры, анализируют файлы — и в качестве доказательства решения предъявляют флаг,
          обычно строку вида <code>flag&#123;some_secret_text&#125;</code>.
        </Term>
        <P n={1}>
          CTF — это безопасная «песочница» для прокачки навыков реального пентестера: вместо того чтобы искать
          уязвимости на живых системах без разрешения (что незаконно), участники тренируются на специально
          сломанных учебных приложениях, где уязвимости расставлены намеренно.
        </P>
        <TheoryTable
          headers={['Формат CTF', 'Особенность']}
          rows={[
            ['Jeopardy-style', 'набор независимых задач по категориям (веб, крипто, реверс...), за каждую — баллы'],
            ['Attack-Defence', 'команды одновременно атакуют чужие сервисы и защищают свои'],
            ['Mixed', 'сочетание обоих форматов на одном соревновании'],
          ]}
        />
        <P n={2}>
          Сегодня фокусируемся на самом популярном для новичков формате — Jeopardy, и конкретно на категории{' '}
          <strong>веб-безопасность</strong>, потому что веб-приложения — самая частая и самая «богатая на подсказки»
          категория задач.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Основные категории задач CTF</h2>
        <TheoryTable
          headers={['Категория', 'Что нужно делать']}
          rows={[
            ['Web', 'искать уязвимости веб-приложения (SQLi, XSS, IDOR, обход авторизации)'],
            ['Crypto', 'взламывать или анализировать шифрование, слабые криптоалгоритмы'],
            ['Forensics', 'извлекать данные из файлов, дампов трафика, образов дисков'],
            ['Reverse Engineering', 'анализировать скомпилированные программы без исходного кода'],
            ['Pwn / Binary Exploitation', 'эксплуатировать уязвимости в работающих программах (переполнение буфера и т.п.)'],
            ['Misc / OSINT', 'разное: логические задачи, поиск информации в открытых источниках'],
            ['Steganography', 'поиск скрытых данных внутри картинок, аудио, других файлов'],
          ]}
        />
        <P n={3}>
          Веб-категория для новичков обычно самая доступная: почти все инструменты — это браузер и его DevTools,
          без необходимости писать эксплойты на C или разбирать ассемблер.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Где искать флаги в веб-приложении: обзор мест</h2>
        <P n={4}>
          Флаг в веб-задаче почти никогда не лежит «на видном месте» — организаторы прячут его в одном из типовых
          мест, и опытный участник методично проверяет их все по очереди, а не гадает наугад.
        </P>
        <Fig caption="Типовые места, где может быть спрятан флаг в веб-приложении.">
          <svg viewBox="0 0 560 230" width="560" height="230" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="15" width="220" height="45" rx="6" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="130" y="33" fill="#60a5fa" fontSize="11" textAnchor="middle" fontWeight="bold">HTML / JS-код страницы</text>
            <text x="130" y="49" fill="#94a3b8" fontSize="9" textAnchor="middle">комментарии, скрытые поля, исходники</text>

            <rect x="320" y="15" width="220" height="45" rx="6" fill="rgba(74,222,128,0.12)" stroke="#4ade80" />
            <text x="430" y="33" fill="#4ade80" fontSize="11" textAnchor="middle" fontWeight="bold">HTTP-заголовки и cookies</text>
            <text x="430" y="49" fill="#94a3b8" fontSize="9" textAnchor="middle">ответы сервера, куки сессии</text>

            <rect x="20" y="80" width="220" height="45" rx="6" fill="rgba(250,204,21,0.12)" stroke="#facc15" />
            <text x="130" y="98" fill="#facc15" fontSize="11" textAnchor="middle" fontWeight="bold">База данных / хранилища</text>
            <text x="130" y="114" fill="#94a3b8" fontSize="9" textAnchor="middle">через SQLi, файловые хранилища S3</text>

            <rect x="320" y="80" width="220" height="45" rx="6" fill="rgba(248,113,113,0.12)" stroke="#f87171" />
            <text x="430" y="98" fill="#f87171" fontSize="11" textAnchor="middle" fontWeight="bold">Скрытые файлы и пути</text>
            <text x="430" y="114" fill="#94a3b8" fontSize="9" textAnchor="middle">robots.txt, .git, бэкапы, admin-панели</text>

            <rect x="20" y="145" width="220" height="45" rx="6" fill="rgba(167,139,250,0.12)" stroke="#a78bfa" />
            <text x="130" y="163" fill="#a78bfa" fontSize="11" textAnchor="middle" fontWeight="bold">API-ответы</text>
            <text x="130" y="179" fill="#94a3b8" fontSize="9" textAnchor="middle">поля JSON, не отрисованные на странице</text>

            <rect x="320" y="145" width="220" height="45" rx="6" fill="rgba(255,214,10,0.12)" stroke="#FFD60A" />
            <text x="430" y="163" fill="#FFD60A" fontSize="11" textAnchor="middle" fontWeight="bold">Переменные окружения / конфиги</text>
            <text x="430" y="179" fill="#94a3b8" fontSize="9" textAnchor="middle">через LFI, SSRF, утечку .env</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Флаг в исходном коде страницы</h2>
        <Term name="Просмотр исходного кода (View Source / DevTools)">
          самая базовая и часто недооценённая техника: открыть «Просмотр кода страницы» или вкладку Elements в
          DevTools и внимательно прочитать весь HTML, включая комментарии.
        </Term>
        <P n={5}>
          Разработчики (и организаторы CTF) нередко оставляют в коде комментарии вроде{' '}
          <code>&lt;!-- TODO: убрать перед продакшеном --&gt;</code>, забытые отладочные <code>console.log</code>,
          скрытые через CSS (<code>display: none</code>) блоки с текстом, или флаг напрямую в{' '}
          <code>&lt;script&gt;</code>-коде, который выполняется, но не выводится на экран.
        </P>
        <TheoryCode language="html" code={`<!-- пример: флаг спрятан прямо в HTML-комментарии -->
<!-- DEBUG: flag{h1dd3n_1n_c0mm3nt} -->

<div style="display:none" id="secret">
  flag{css_display_none_trick}
</div>

<script>
  // флаг может быть жёстко "зашит" в JS, даже если не выводится на экран
  const debugFlag = "flag{hardcoded_in_js}";
</script>`} />
        <P n={6}>
          Также стоит смотреть на вкладку <strong>Sources</strong> в DevTools — там доступны все загруженные
          JS-файлы целиком, включая те, что не подключены напрямую к видимой странице, а загружаются динамически.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Флаг в сетевом трафике: заголовки, cookies, API</h2>
        <Term name="Вкладка Network в DevTools">
          показывает все HTTP-запросы, которые страница отправляет и получает, включая заголовки ответа,
          содержимое cookies и полные тела ответов сервера (в том числе JSON, который браузер не показывает
          напрямую).
        </Term>
        <P n={7}>
          Флаг может «прятаться» в нестандартном заголовке ответа сервера (например,{' '}
          <code>X-Flag: flag&#123;...&#125;</code>), в значении cookie, или в поле JSON-ответа API, которое
          фронтенд получает, но не отображает на странице — потому что интерфейс использует только часть полей
          ответа, а сервер присылает больше данных, чем показывается.
        </P>
        <TheoryCode language="bash" code={`# посмотреть заголовки ответа сервера через curl
curl -i https://ctf-target.example/api/profile

# пример вывода:
# HTTP/1.1 200 OK
# X-Debug-Flag: flag{header_leak_example}
# Set-Cookie: session=abc123; flag_hint=check_the_json_body

curl -s https://ctf-target.example/api/profile | jq
# {
#   "username": "guest",
#   "role": "user",
#   "internal_note": "flag{hidden_in_json_response}"
# }`} />
        <TheoryExample title="Почему это работает">
          Фронтенд-приложение обычно берёт из ответа сервера только те поля, которые нужны для отрисовки
          интерфейса, и просто игнорирует остальные. Но эти «лишние» поля физически приходят в браузер и видны
          через Network — поэтому смотреть нужно на «сырой» ответ сервера, а не на то, что отрисовано на экране.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Флаг в скрытых файлах и путях</h2>
        <P n={8}>
          Веб-серверы часто хранят служебные файлы, которые не защищены явным образом, но и не рассчитаны на
          публичный просмотр — их находят простым перебором известных путей.
        </P>
        <TheoryTable
          headers={['Путь / файл', 'Почему там может быть флаг']}
          rows={[
            ['/robots.txt', 'файл для поисковых роботов иногда неосознанно раскрывает секретные разделы сайта'],
            ['/.git/', 'если папку с git-репозиторием случайно оставили на сервере, можно скачать всю историю кода'],
            ['/.env', 'файлы с переменными окружения часто содержат пароли, ключи API и иногда сам флаг'],
            ['/admin, /backup, /old', 'забытые тестовые или административные страницы без явной защиты'],
            ['/api/v1/, /api/v2/', 'старые версии API могут не иметь тех же проверок безопасности, что новые'],
            ['/sitemap.xml', 'карта сайта может перечислять страницы, не видные из обычной навигации'],
          ]}
        />
        <TheoryCode language="bash" code={`# ручная проверка типовых путей
curl -s https://ctf-target.example/robots.txt
curl -s https://ctf-target.example/.git/config
curl -s https://ctf-target.example/.env

# автоматизированный перебор директорий инструментом gobuster
gobuster dir -u https://ctf-target.example -w wordlist.txt`} />
        <Term name="История git-репозитория">
          если <code>.git</code>-папка доступна на сервере, инструменты вроде <code>git-dumper</code> позволяют
          скачать весь репозиторий целиком, включая старые коммиты — а флаг мог быть удалён из текущей версии
          кода, но остаться в истории изменений.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Флаг в базе данных: через уязвимости</h2>
        <P n={9}>
          Если приложение уязвимо к <strong>SQL-инъекции (SQLi)</strong>, флаг часто хранится прямо в таблице базы
          данных — например, в таблице <code>flags</code> или в служебном поле таблицы <code>users</code> — и
          достаётся через специально сформированный запрос, который заставляет базу данных вернуть лишние данные.
        </P>
        <TheoryCode language="sql" code={`-- классический пример SQL-инъекции в поле логина:
-- вместо обычного имени пользователя подставляется конструкция,
-- которая "обманывает" запрос и возвращает данные из другой таблицы

' UNION SELECT flag FROM flags --

-- если исходный запрос сервера выглядел так:
-- SELECT * FROM users WHERE username = '<ввод пользователя>'
-- то после подстановки он превращается в:
-- SELECT * FROM users WHERE username = '' UNION SELECT flag FROM flags -- '`} />
        <P n={10}>
          Помимо SQL-баз, флаг может лежать в облачном объектном хранилище (например, незащищённом S3-бакете),
          доступном по прямой ссылке при правильно угаданном или найденном имени файла, или в кеше вроде Redis,
          если к нему случайно открыт доступ извне без пароля.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Флаг через уязвимости логики: IDOR и обход авторизации</h2>
        <Term name="IDOR (Insecure Direct Object Reference)">
          уязвимость, при которой приложение даёт доступ к чужим данным просто по изменению идентификатора в
          запросе — без проверки, действительно ли текущий пользователь имеет право видеть эти данные.
        </Term>
        <TheoryCode language="text" code={`Обычный запрос:  GET /api/documents/42   -> ваш собственный документ
Меняем ID:       GET /api/documents/43   -> документ другого пользователя!

Если сервер не проверяет владельца документа, а просто отдаёт
запись по её ID — флаг может лежать в документе с другим ID,
до которого можно "дотянуться" простым перебором чисел.`} />
        <P n={11}>
          Похожая идея — обход проверки прав через подмену параметров запроса: изменение поля{' '}
          <code>role: "user"</code> на <code>role: "admin"</code> в теле запроса, если сервер доверяет данным от
          клиента вместо того, чтобы проверять права на своей стороне.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Общий алгоритм прохождения веб-задачи CTF</h2>
        <TheoryTable
          headers={['Шаг', 'Что делать']}
          rows={[
            ['1. Разведка', 'открыть сайт, изучить видимый функционал, понять, что вообще делает приложение'],
            ['2. Просмотр исходников', 'View Source, вкладка Elements и Sources в DevTools — искать комментарии, скрытые блоки'],
            ['3. Анализ трафика', 'вкладка Network — смотреть заголовки, cookies, полные тела ответов API'],
            ['4. Перебор путей', 'проверить robots.txt, .git, .env, типовые скрытые директории'],
            ['5. Поиск форм ввода', 'проверить формы на SQLi, XSS и другие типовые веб-уязвимости'],
            ['6. Проверка логики доступа', 'попробовать IDOR — менять ID в запросах, менять параметры прав доступа'],
            ['7. Фиксация флага', 'как только флаг найден — сверить формат и отправить в систему проверки'],
          ]}
        />
        <TheoryExample title="Главный принцип CTF">
          Методичность важнее удачи. Опытные участники проходят по чек-листу мест и техник по порядку, а не
          мечутся хаотично — это и превращает поиск флага из угадывания в системную работу.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Базовый набор инструментов для веб-CTF</h2>
        <TheoryTable
          headers={['Инструмент', 'Для чего']}
          rows={[
            ['Браузерные DevTools', 'просмотр кода, сетевого трафика, консоли, хранилищ (localStorage, cookies)'],
            ['Burp Suite / OWASP ZAP', 'перехват и модификация HTTP-запросов "на лету"'],
            ['curl / Postman', 'ручная отправка произвольных HTTP-запросов с нужными заголовками'],
            ['gobuster / dirsearch / ffuf', 'перебор скрытых директорий и файлов на сервере'],
            ['git-dumper', 'скачивание доступной .git-папки целиком, включая историю коммитов'],
            ['CyberChef', 'онлайн-инструмент для декодирования/кодирования (Base64, hex, различные шифры)'],
          ]}
        />
        <P n={12}>
          На старте достаточно освоить DevTools браузера и curl — этого хватает для решения большой доли простых
          и средних веб-задач. Burp Suite и специализированные сканеры директорий подключают уже на задачах
          посложнее.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={13}>
          <strong>CTF</strong> — безопасный тренировочный формат для практики навыков кибербезопасности через
          поиск флагов на специально подготовленных учебных стендах. В веб-категории флаг обычно прячут в одном из
          типовых мест: <strong>исходном коде страницы</strong> (комментарии, скрытые блоки, JS), <strong>сетевом
          трафике</strong> (заголовки ответа, cookies, «лишние» поля JSON), <strong>скрытых файлах и путях</strong>{' '}
          (robots.txt, .git, .env, забытые админ-панели), <strong>базе данных</strong> (через SQL-инъекции) и через{' '}
          <strong>уязвимости логики доступа</strong> вроде IDOR. Побеждает не удача, а методичность: пройти по
          чек-листу мест и техник шаг за шагом, вооружившись базовым набором инструментов — DevTools браузера,
          curl, перебор директорий и декодеры вроде CyberChef.
        </P>
      </section>
    </div>
  )
}
