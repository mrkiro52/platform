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

export default function July4NetworksTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Компьютерные сети: основы</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          Компьютерная сеть — это группа устройств, соединённых между собой для обмена данными. Когда ты
          открываешь сайт, отправляешь сообщение или смотришь видео — под капотом миллионы бит бегут по проводам
          и радиоканалам через десятки промежуточных узлов. Для специалиста по безопасности сеть — главное поле
          боя: почти любая атака либо перехватывает трафик, либо эксплуатирует сетевую службу, а защита строится
          на понимании того, как этот трафик устроен. Разберём весь путь данных — от бита в проводе до
          зашифрованного HTTPS-запроса.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Видео-лекция: Компьютерные сети</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/day4cybersec.mov" />
      </section>

      {/* Базовые понятия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Базовые понятия</h2>
        <Term name="Узел (node) / хост (host)">
          любое устройство, подключённое к сети и имеющее сетевой адрес: компьютер, телефон, сервер, роутер,
          умная лампочка. «Хостом» обычно называют конечное устройство (не промежуточное оборудование).
        </Term>
        <Term name="Пакет (packet)">
          порция данных с адресами отправителя и получателя. Данные не передаются одним куском — они режутся на
          пакеты, каждый едет по сети самостоятельно, а на приёмнике они собираются обратно. Это надёжнее: при
          потере одного пакета не нужно пересылать всё.
        </Term>
        <Term name="Протокол">
          набор правил, по которым устройства «договариваются» об обмене данными. Как язык общения: если оба
          устройства говорят на HTTP — они поймут друг друга. Примеры: IP, TCP, HTTP, DNS.
        </Term>
        <Term name="Пропускная способность и задержка">
          пропускная способность (bandwidth) — сколько данных проходит за секунду (Мбит/с). Задержка (latency,
          ping) — время, за которое пакет доходит до цели и обратно (мс). Для видеозвонка важнее низкая
          задержка, для скачивания файла — высокая пропускная способность.
        </Term>
        <Term name="Типы сетей по масштабу">
          LAN (Local Area Network) — локальная сеть (дом, офис); WAN (Wide Area Network) — глобальная сеть,
          соединяющая LAN между собой; интернет — это огромная WAN, «сеть сетей».
        </Term>
      </section>

      {/* Модель OSI */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Модель OSI — 7 уровней</h2>
        <p>
          Чтобы не запутаться в сложности, работу сети разбили на <strong>уровни</strong>. Каждый уровень решает
          свою узкую задачу и «общается» только с соседними. Эталонная модель OSI (Open Systems Interconnection)
          описывает 7 уровней — снизу (физика) вверх (приложение).
        </p>
        <Fig caption="7 уровней OSI: данные идут вниз при отправке (каждый уровень добавляет свой заголовок) и вверх при приёме">
          <svg viewBox="0 0 600 320" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            {[
              { n: 7, name: 'Прикладной (Application)', ex: 'HTTP, DNS, FTP, SMTP', c: 'rgba(32,190,255,0.14)' },
              { n: 6, name: 'Представления (Presentation)', ex: 'шифрование, кодировки, форматы', c: 'rgba(32,190,255,0.10)' },
              { n: 5, name: 'Сеансовый (Session)', ex: 'установка/поддержка сессий', c: 'rgba(32,190,255,0.06)' },
              { n: 4, name: 'Транспортный (Transport)', ex: 'TCP, UDP, порты', c: 'rgba(96,165,250,0.14)' },
              { n: 3, name: 'Сетевой (Network)', ex: 'IP, маршрутизация, роутеры', c: 'rgba(129,140,248,0.14)' },
              { n: 2, name: 'Канальный (Data Link)', ex: 'MAC-адреса, Ethernet, коммутаторы', c: 'rgba(248,113,113,0.10)' },
              { n: 1, name: 'Физический (Physical)', ex: 'провода, радиосигнал, биты', c: 'rgba(248,113,113,0.14)' },
            ].map((r, i) => (
              <g key={i}>
                <rect x="30" y={10 + i*43} width="540" height="38" rx="6" fill={r.c} stroke={C.border} />
                <circle cx="52" cy={29 + i*43} r="12" fill="var(--bg-secondary)" stroke={C.lime} />
                <text x="52" y={33 + i*43} fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">{r.n}</text>
                <text x="75" y={26 + i*43} fill={C.text} fontSize="12.5" fontWeight="700">{r.name}</text>
                <text x="75" y={41 + i*43} fill={C.sub} fontSize="10.5">{r.ex}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <p>
          <strong>Как запомнить назначение:</strong> нижние уровни (1-3) отвечают за <em>доставку</em> «куда и
          как» отправить биты, верхние (5-7) — за <em>смысл</em> данных для приложения, а транспортный (4)
          связывает их, разбивая данные на сегменты и гарантируя доставку. На практике специалисту по
          безопасности чаще всего нужны уровни 2, 3, 4 и 7.
        </p>
      </section>

      {/* TCP/IP и инкапсуляция */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Модель TCP/IP и инкапсуляция</h2>
        <p>
          OSI — теоретическая модель. На практике интернет работает по более простой модели <strong>TCP/IP</strong>
          из 4 уровней, которая объединяет уровни OSI:
        </p>
        <TheoryTable
          headers={['Уровень TCP/IP', 'Объединяет уровни OSI', 'Что делает', 'Протоколы']}
          rows={[
            ['Прикладной', '5-7', 'формат данных для программ', 'HTTP, DNS, FTP, SMTP'],
            ['Транспортный', '4', 'доставка между приложениями', 'TCP, UDP'],
            ['Сетевой (интернет)', '3', 'маршрутизация между сетями', 'IP, ICMP'],
            ['Канальный', '1-2', 'передача по конкретной среде', 'Ethernet, Wi-Fi'],
          ]}
        />
        <Term name="Инкапсуляция">
          процесс «обёртывания» данных заголовками при движении вниз по уровням. Каждый уровень добавляет свой
          заголовок с адресами и служебной информацией — как матрёшка. На приёмнике заголовки снимаются в
          обратном порядке (декапсуляция).
        </Term>
        <Fig caption="Инкапсуляция: сообщение приложения последовательно оборачивается заголовками транспортного, сетевого и канального уровней">
          <svg viewBox="0 0 620 150" width="100%" style={{ maxWidth: 620 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="470" y="60" width="120" height="34" rx="5" fill="rgba(32,190,255,0.15)" stroke={C.lime} />
            <text x="530" y="81" fill={C.text} fontSize="11" textAnchor="middle">Данные (HTTP)</text>

            <rect x="330" y="55" width="60" height="44" rx="5" fill="rgba(96,165,250,0.18)" stroke="#60a5fa" />
            <text x="360" y="81" fill={C.text} fontSize="10" textAnchor="middle">TCP</text>
            <rect x="390" y="60" width="120" height="34" rx="4" fill="rgba(32,190,255,0.08)" stroke={C.border} />
            <text x="450" y="81" fill={C.sub} fontSize="9.5" textAnchor="middle">данные</text>

            <rect x="190" y="50" width="55" height="54" rx="5" fill="rgba(129,140,248,0.18)" stroke="#818cf8" />
            <text x="217" y="81" fill={C.text} fontSize="10" textAnchor="middle">IP</text>
            <rect x="245" y="55" width="80" height="44" rx="4" fill="rgba(96,165,250,0.08)" stroke={C.border} />
            <text x="285" y="81" fill={C.sub} fontSize="9" textAnchor="middle">TCP+данные</text>

            <rect x="30" y="45" width="55" height="64" rx="5" fill="rgba(248,113,113,0.18)" stroke="#f87171" />
            <text x="57" y="81" fill={C.text} fontSize="9.5" textAnchor="middle">Ethernet</text>
            <rect x="85" y="50" width="95" height="54" rx="4" fill="rgba(129,140,248,0.08)" stroke={C.border} />
            <text x="132" y="81" fill={C.sub} fontSize="9" textAnchor="middle">IP+TCP+данные</text>

            <text x="300" y="130" fill={C.sub} fontSize="11" textAnchor="middle">← каждый уровень добавляет свой заголовок при движении вниз</text>
          </svg>
        </Fig>
      </section>

      {/* IP-адреса */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. IP-адреса</h2>
        <p>
          <strong>IP-адрес</strong> — уникальный номер устройства в сети, аналог почтового адреса. По нему
          пакет находит нужный компьютер среди миллиардов.
        </p>
        <Term name="IPv4">
          адрес из 4 чисел (октетов) 0-255, разделённых точками: <code>192.168.1.10</code>. Каждый октет — это
          8 бит, всего 32 бита, поэтому адресов ≈ 4,3 млрд. Их уже не хватает на все устройства мира — отсюда
          NAT и переход на IPv6.
        </Term>
        <Fig caption="Структура IPv4-адреса: 4 октета по 8 бит; часть битов — адрес сети, часть — адрес хоста (определяется маской)">
          <svg viewBox="0 0 600 120" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            {['192','168','1','10'].map((o,i)=>(
              <g key={i}>
                <rect x={30+i*145} y="30" width="120" height="40" rx="6" fill={i<3?'rgba(129,140,248,0.15)':'rgba(32,190,255,0.15)'} stroke={i<3?'#818cf8':C.lime} />
                <text x={90+i*145} y="55" fill={C.text} fontSize="18" fontWeight="700" textAnchor="middle">{o}</text>
                <text x={90+i*145} y="88" fill={C.sub} fontSize="10" textAnchor="middle">8 бит</text>
                {i<3 && <text x={158+i*145} y="55" fill={C.sub} fontSize="18" textAnchor="middle">.</text>}
              </g>
            ))}
            <text x="250" y="108" fill="#818cf8" fontSize="11" textAnchor="middle">адрес сети</text>
            <text x="475" y="108" fill={C.lime} fontSize="11" textAnchor="middle">адрес хоста</text>
          </svg>
        </Fig>
        <Term name="Маска подсети и CIDR">
          маска (например <code>255.255.255.0</code>, или в записи CIDR <code>/24</code>) определяет, какая часть
          адреса — это номер сети, а какая — номер хоста внутри неё. <code>/24</code> значит «первые 24 бита —
          сеть», то есть в сети 192.168.1.0/24 можно разместить 254 хоста (192.168.1.1 – 192.168.1.254).
        </Term>
        <Term name="Публичный и приватный IP">
          публичный уникален во всём интернете и виден снаружи. Приватный используется внутри локальной сети и
          не маршрутизируется в интернете. Зарезервированные приватные диапазоны: <code>10.0.0.0/8</code>,
          <code> 172.16.0.0/12</code>, <code>192.168.0.0/16</code>.
        </Term>
        <Term name="NAT (Network Address Translation)">
          механизм в роутере, который подменяет приватные адреса устройств на один публичный при выходе в
          интернет и запоминает, кому вернуть ответ. Именно поэтому весь твой дом выходит в сеть через один
          публичный IP провайдера.
        </Term>
        <Term name="DHCP">
          протокол, который автоматически выдаёт устройствам IP-адрес, маску, шлюз и DNS при подключении к сети.
          Без него каждому устройству пришлось бы прописывать адрес вручную.
        </Term>
        <Term name="IPv6">
          новый формат из 128 бит (8 групп по 4 hex-цифры): <code>2001:0db8:85a3::8a2e:0370:7334</code>. Адресов
          практически бесконечно (≈3,4×10³⁸), NAT больше не нужен. Постепенно вытесняет IPv4.
        </Term>
      </section>

      {/* MAC vs IP */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. MAC-адрес и как он соотносится с IP</h2>
        <Term name="MAC-адрес">
          физический адрес сетевой карты, «вшитый» производителем: <code>00:1A:2B:3C:4D:5E</code>. Работает на
          канальном уровне внутри локальной сети. IP может меняться (при переезде в другую сеть), а MAC привязан
          к железу.
        </Term>
        <p>
          <strong>Разница простыми словами:</strong> IP-адрес говорит «в какую сеть и к какому хосту доставить
          пакет глобально», а MAC-адрес — «какой конкретной сетевой карте отдать кадр внутри локальной сети».
          Соответствие IP↔MAC внутри LAN устанавливает протокол <strong>ARP</strong>.
        </p>
        <TheoryExample title="ARP-spoofing">
          Раз ARP связывает IP с MAC без проверки подлинности, злоумышленник в той же локальной сети может
          соврать «этот IP теперь мой MAC» и начать перехватывать чужой трафик. Это база для MITM-атак внутри LAN.
        </TheoryExample>
      </section>

      {/* Порты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Порты и сокеты</h2>
        <p>
          Если IP-адрес — это адрес дома, то <strong>порт</strong> — номер квартиры: конкретная программа/служба
          на устройстве. Один сервер с одним IP обслуживает сайт, почту и SSH одновременно — каждый на своём порту.
        </p>
        <Term name="Сокет (socket)">
          пара «IP-адрес + порт», однозначно определяющая один конец сетевого соединения. Например
          <code> 142.250.1.100:443</code> — веб-служба Google. Соединение — это пара сокетов (клиент ↔ сервер).
        </Term>
        <TheoryTable
          headers={['Диапазон портов', 'Название', 'Назначение']}
          rows={[
            ['0 – 1023', 'well-known (системные)', 'стандартные службы: 80, 443, 22, 53'],
            ['1024 – 49151', 'registered', 'зарегистрированные приложения (например, 3306 — MySQL)'],
            ['49152 – 65535', 'dynamic / ephemeral', 'временные порты клиента для исходящих соединений'],
          ]}
        />
        <TheoryTable
          headers={['Порт', 'Служба', 'Протокол']}
          rows={[
            ['80', 'HTTP', 'TCP'],
            ['443', 'HTTPS', 'TCP'],
            ['22', 'SSH (удалённое управление)', 'TCP'],
            ['53', 'DNS', 'UDP/TCP'],
            ['25', 'SMTP (отправка почты)', 'TCP'],
            ['3306', 'MySQL', 'TCP'],
          ]}
        />
        <TheoryExample title="Сканирование портов в ИБ">
          Первый шаг атакующего — сканирование портов (например утилитой nmap): узнать, какие службы «слушают»
          на цели, чтобы найти уязвимую точку входа. Защита — закрывать неиспользуемые порты файрволом и держать
          службы обновлёнными.
        </TheoryExample>
      </section>

      {/* TCP vs UDP */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Транспортный уровень: TCP и UDP</h2>
        <TheoryTable
          headers={['Критерий', 'TCP', 'UDP']}
          rows={[
            ['Соединение', 'устанавливается заранее (handshake)', 'без установки'],
            ['Надёжность', 'гарантирует доставку и порядок', 'не гарантирует ничего'],
            ['Подтверждения', 'каждый пакет подтверждается (ACK)', 'нет'],
            ['Скорость', 'медленнее (накладные расходы)', 'быстрее, минимум служебных данных'],
            ['Применение', 'сайты, почта, файлы, БД', 'видеозвонки, игры, стриминг, DNS'],
          ]}
        />
        <Term name="TCP three-way handshake">
          «тройное рукопожатие» перед передачей данных: клиент шлёт <strong>SYN</strong> («хочу соединиться,
          мой номер последовательности X») → сервер отвечает <strong>SYN-ACK</strong> («согласен, мой номер Y,
          подтверждаю твой X») → клиент шлёт <strong>ACK</strong> («подтверждаю твой Y»). После этого канал
          установлен.
        </Term>
        <Fig caption="Three-way handshake: три пакета устанавливают надёжное TCP-соединение перед обменом данными">
          <svg viewBox="0 0 560 190" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <text x="90" y="24" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Клиент</text>
            <text x="470" y="24" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Сервер</text>
            <line x1="90" y1="34" x2="90" y2="180" stroke={C.border} strokeWidth="2" />
            <line x1="470" y1="34" x2="470" y2="180" stroke={C.border} strokeWidth="2" />
            <line x1="95" y1="55" x2="465" y2="80" stroke={C.lime} strokeWidth="2" markerEnd="url(#a1)" />
            <text x="280" y="60" fill={C.lime} fontSize="12" textAnchor="middle">1. SYN →</text>
            <line x1="465" y1="100" x2="95" y2="125" stroke="#60a5fa" strokeWidth="2" markerEnd="url(#a1)" />
            <text x="280" y="106" fill="#60a5fa" fontSize="12" textAnchor="middle">2. SYN-ACK ←</text>
            <line x1="95" y1="145" x2="465" y2="170" stroke={C.lime} strokeWidth="2" markerEnd="url(#a1)" />
            <text x="280" y="150" fill={C.lime} fontSize="12" textAnchor="middle">3. ACK →</text>
            <defs>
              <marker id="a1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
        <p>
          После установки TCP нумерует байты (sequence number) и требует подтверждения (ACK) на каждую порцию.
          Если ACK не пришёл — пакет пересылается. Так достигается <strong>гарантированная доставка в правильном
          порядке</strong>. UDP всего этого не делает: «выстрелил и забыл» — быстро, но без гарантий, что удобно
          для видео и игр, где опоздавший пакет уже не нужен.
        </p>
      </section>

      {/* DNS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. DNS — система доменных имён</h2>
        <p>
          Люди помнят имена (<code>google.com</code>), компьютеры — IP-адреса. <strong>DNS</strong> —
          «телефонная книга интернета», переводящая имя в IP. Это иерархическая распределённая система.
        </p>
        <Fig caption="Разрешение имени: запрос идёт по иерархии от корневых серверов к TLD и авторитативному серверу домена">
          <svg viewBox="0 0 600 170" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="65" width="110" height="42" rx="6" fill="rgba(32,190,255,0.12)" stroke={C.lime} />
            <text x="85" y="82" fill={C.text} fontSize="11" fontWeight="700" textAnchor="middle">Твой</text>
            <text x="85" y="97" fill={C.text} fontSize="11" fontWeight="700" textAnchor="middle">DNS-резолвер</text>
            {[
              { x: 200, t1: 'Корневой', t2: '(. root)' },
              { x: 350, t1: 'TLD-сервер', t2: '(.com)' },
              { x: 490, t1: 'Авторитативный', t2: '(google.com)' },
            ].map((s,i)=>(
              <g key={i}>
                <rect x={s.x} y="65" width="100" height="42" rx="6" fill="rgba(129,140,248,0.14)" stroke="#818cf8" />
                <text x={s.x+50} y="82" fill={C.text} fontSize="10.5" fontWeight="700" textAnchor="middle">{s.t1}</text>
                <text x={s.x+50} y="97" fill={C.sub} fontSize="10" textAnchor="middle">{s.t2}</text>
              </g>
            ))}
            <line x1="140" y1="86" x2="200" y2="86" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#d1)" />
            <line x1="300" y1="86" x2="350" y2="86" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#d1)" />
            <line x1="450" y1="86" x2="490" y2="86" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#d1)" />
            <text x="300" y="140" fill={C.sub} fontSize="11" textAnchor="middle">Ответ (IP-адрес) возвращается тем же путём обратно и кэшируется</text>
            <defs><marker id="d1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker></defs>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Тип записи', 'Что хранит']}
          rows={[
            ['A', 'IPv4-адрес домена'],
            ['AAAA', 'IPv6-адрес домена'],
            ['CNAME', 'псевдоним (ссылка на другое имя)'],
            ['MX', 'почтовый сервер домена'],
            ['NS', 'DNS-серверы, отвечающие за домен'],
          ]}
        />
        <TheoryExample title="DNS-атаки">
          Подмена ответа DNS (DNS spoofing / cache poisoning) уводит пользователя на поддельный сайт с настоящим
          именем в адресной строке — классика фишинга на сетевом уровне. Защита — DNSSEC (подпись записей) и
          проверка HTTPS-сертификата.
        </TheoryExample>
      </section>

      {/* HTTP */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. HTTP — протокол веба</h2>
        <p>
          <strong>HTTP</strong> (HyperText Transfer Protocol) — язык, на котором браузер (клиент) и веб-сервер
          обмениваются данными. Работает по схеме «запрос — ответ»: клиент спрашивает, сервер отвечает.
        </p>
        <TheoryCode language="http" code={`GET /index.html HTTP/1.1        <- строка запроса: метод, путь, версия
Host: example.com               <- заголовки (метаданные запроса)
User-Agent: Mozilla/5.0
Accept: text/html

(тело запроса — для POST/PUT)`} />
        <TheoryTable
          headers={['Метод', 'Действие']}
          rows={[
            ['GET', 'получить данные (не меняет состояние)'],
            ['POST', 'создать / отправить данные'],
            ['PUT', 'обновить ресурс целиком'],
            ['PATCH', 'частично обновить'],
            ['DELETE', 'удалить ресурс'],
          ]}
        />
        <TheoryTable
          headers={['Код ответа', 'Категория', 'Пример']}
          rows={[
            ['2xx', 'успех', '200 OK, 201 Created'],
            ['3xx', 'перенаправление', '301 Moved, 304 Not Modified'],
            ['4xx', 'ошибка клиента', '404 Not Found, 403 Forbidden'],
            ['5xx', 'ошибка сервера', '500 Internal Server Error'],
          ]}
        />
        <p>
          Важная особенность: HTTP <strong>без состояния (stateless)</strong> — сервер не помнит предыдущие
          запросы. Чтобы «узнавать» пользователя между запросами, используют cookie, сессии и токены.
        </p>
      </section>

      {/* HTTPS/TLS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. HTTPS и TLS — шифрование</h2>
        <p>
          Обычный HTTP передаёт всё <strong>открытым текстом</strong> — любой на пути (провайдер, владелец
          публичного Wi-Fi, злоумышленник в LAN) может прочитать пароли и данные карт. <strong>HTTPS</strong> —
          это HTTP поверх <strong>TLS</strong> (Transport Layer Security): весь трафик шифруется.
        </p>
        <Term name="TLS-handshake">
          перед обменом данными клиент и сервер договариваются о шифровании: сервер присылает
          <strong> сертификат</strong> с публичным ключом, стороны согласуют алгоритмы и вырабатывают общий
          секретный ключ сессии. Дальше все данные шифруются этим ключом.
        </Term>
        <Term name="Сертификат и центр сертификации (CA)">
          сертификат подтверждает, что публичный ключ действительно принадлежит этому домену. Его выдаёт
          доверенный центр сертификации (Certificate Authority). Браузер проверяет подпись CA — если она
          неверна или домен не совпадает, показывает предупреждение «Небезопасно».
        </Term>
        <TheoryTable
          headers={['', 'HTTP', 'HTTPS']}
          rows={[
            ['Порт', '80', '443'],
            ['Шифрование', 'нет (открытый текст)', 'да (TLS)'],
            ['Защита от перехвата', 'нет', 'да'],
            ['Индикатор в браузере', '«Небезопасно»', 'замок'],
          ]}
        />
      </section>

      {/* Сетевое оборудование */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Сетевое оборудование</h2>
        <Term name="Коммутатор (switch)">
          соединяет устройства внутри одной локальной сети и пересылает кадры по MAC-адресам. Работает на
          канальном уровне (2).
        </Term>
        <Term name="Маршрутизатор (router)">
          соединяет разные сети и выбирает путь для пакетов между ними по IP-адресам. Работает на сетевом
          уровне (3). Домашний роутер обычно совмещает switch, router, NAT, DHCP и Wi-Fi точку доступа.
        </Term>
        <Term name="Файрвол (firewall)">
          фильтрует трафик по правилам (адреса, порты, протоколы), пропуская разрешённое и блокируя остальное.
          Первая линия сетевой обороны.
        </Term>
      </section>

      {/* Угрозы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">12. Сетевые угрозы и защита</h2>
        <TheoryTable
          headers={['Угроза', 'Суть', 'Защита']}
          rows={[
            ['MITM', 'перехват/подмена трафика «посередине»', 'HTTPS, VPN, проверка сертификатов'],
            ['DDoS', 'перегрузка сервиса потоком запросов', 'фильтрация, CDN, rate limiting'],
            ['Сканирование портов', 'поиск открытых уязвимых служб', 'закрытие портов, файрвол'],
            ['ARP-spoofing', 'подмена IP↔MAC в локальной сети', 'статические ARP, сегментация'],
            ['DNS-spoofing', 'подмена ответа DNS', 'DNSSEC, проверка HTTPS'],
          ]}
        />
        <Term name="VPN (Virtual Private Network)">
          создаёт зашифрованный «туннель» между твоим устройством и сервером VPN. Весь трафик идёт внутри него,
          скрытый от провайдера и от злоумышленника в публичной сети (кафе, аэропорт).
        </Term>
      </section>

      {/* Инструменты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">13. Полезные утилиты</h2>
        <TheoryTable
          headers={['Команда', 'Что делает']}
          rows={[
            ['ping <хост>', 'проверяет доступность узла и измеряет задержку'],
            ['traceroute / tracert', 'показывает путь пакета через все промежуточные узлы (хопы)'],
            ['nslookup / dig', 'запрашивает у DNS IP по имени и наоборот'],
            ['netstat / ss', 'показывает открытые соединения и слушающие порты'],
            ['nmap', 'сканирует хост на открытые порты и службы'],
            ['curl', 'отправляет HTTP-запросы из терминала'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">14. Выводы</h2>
        <ul className="theory-list">
          <li>Данные передаются пакетами; работа сети разбита на уровни (OSI — 7, TCP/IP — 4), каждый решает свою задачу.</li>
          <li>Инкапсуляция оборачивает данные заголовками при движении вниз по уровням.</li>
          <li>IP-адрес определяет узел глобально, MAC — сетевую карту в LAN; маска и CIDR делят адрес на сеть и хост; NAT позволяет многим устройствам делить один публичный IP.</li>
          <li>Порт указывает конкретную службу; сокет = IP + порт. Сканирование портов — первый шаг атаки.</li>
          <li>TCP надёжен (handshake, подтверждения) — для веба и файлов; UDP быстр без гарантий — для видео и игр.</li>
          <li>DNS переводит имена в IP по иерархии серверов; HTTP — язык веба (запрос/ответ, методы, коды); HTTPS = HTTP + TLS-шифрование с проверкой сертификата.</li>
          <li>Понимание сетевых угроз (MITM, DDoS, спуфинг) и защит (HTTPS, VPN, файрвол) — фундамент сетевой безопасности.</li>
        </ul>
      </section>
    </div>
  )
}
