import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 680, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 680 }}>{caption}</figcaption>}
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

export default function July29NetworkSecurityTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы сетевой безопасности</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">29 июля 2026</p>
        <p>
          Прежде чем защищать сеть, нужно понимать, как она вообще устроена и какие инструменты используют для её
          диагностики. Сегодня разберём модель OSI применительно к безопасности, основные сетевые угрозы, базовые
          инструменты диагностики (ping, traceroute, nmap, tcpdump/Wireshark) и ключевые команды, которые должен
          знать каждый специалист по ИБ. Материал даётся исключительно в образовательных и защитных целях — все
          инструменты применяются на собственной инфраструктуре или на специально разрешённых учебных стендах.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Модель OSI и где живут угрозы</h2>
        <P n={1}>
          Модель OSI описывает сеть как семь уровней — от физического кабеля до прикладных программ. Для
          безопасника важно не зазубрить все семь названий, а понимать, что на каждом уровне существуют свои
          типичные атаки и свои средства защиты.
        </P>
        <Fig caption="Модель OSI и типичная атака на каждом уровне — угрозы существуют на всех этажах сети, а не только в приложении.">
          <svg viewBox="0 0 460 260" width="460" height="260" xmlns="http://www.w3.org/2000/svg">
            {[
              ['7. Приложение', 'SQL-инъекция, XSS'],
              ['6. Представление', 'подмена сертификата TLS'],
              ['5. Сеанс', 'перехват сессии'],
              ['4. Транспорт (TCP/UDP)', 'SYN-флуд'],
              ['3. Сеть (IP)', 'IP-спуфинг, MITM'],
              ['2. Канальный (Ethernet)', 'ARP-спуфинг'],
              ['1. Физический', 'обрыв/прослушка кабеля'],
            ].map((row, i) => (
              <g key={i}>
                <rect x={20} y={10 + i * 34} width={220} height={28} fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
                <text x={130} y={28 + i * 34} fill="#f5f5fa" fontSize="10.5" textAnchor="middle">{row[0]}</text>
                <rect x={250} y={10 + i * 34} width={190} height={28} fill="rgba(248,113,113,0.1)" stroke="#f87171" />
                <text x={345} y={28 + i * 34} fill="#f5f5fa" fontSize="10" textAnchor="middle">{row[1]}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <TheoryExample title="Практический вывод">
          Защита сети — это не один инструмент, а комбинация мер на разных уровнях: шифрование канала (уровень 6),
          firewall и сегментация (уровни 3-4), защита от ARP-спуфинга внутри локальной сети (уровень 2) и
          безопасный код приложения (уровень 7).
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Основные сетевые угрозы</h2>
        <TheoryTable
          headers={['Угроза', 'Суть']}
          rows={[
            ['Sniffing (перехват трафика)', 'злоумышленник пассивно читает незашифрованный трафик, проходящий по сети'],
            ['ARP-спуфинг', 'подмена ARP-таблицы, чтобы трафик жертвы шёл через устройство атакующего в локальной сети'],
            ['IP-спуфинг', 'подмена исходного IP-адреса в пакетах, чтобы выдать себя за другого отправителя'],
            ['MITM (человек посередине)', 'атакующий встраивается между двумя сторонами общения и читает/подменяет трафик'],
            ['DNS-спуфинг', 'подмена ответа DNS-сервера, чтобы перенаправить жертву на поддельный сайт'],
            ['SYN-флуд', 'атака на TCP-соединение: множество недозавершённых запросов на подключение исчерпывают ресурсы сервера'],
            ['Сканирование портов', 'разведка — злоумышленник ищет открытые порты и запущенные на них сервисы для дальнейшей атаки'],
          ]}
        />
        <Term name="Sniffing и почему шифрование от него защищает">
          если трафик идёт в открытом виде (HTTP, незашифрованный FTP), любой, кто имеет доступ к сети между
          отправителем и получателем, может его прочитать. HTTPS, SSH и VPN шифруют содержимое — перехватчик видит
          только «шум», а не реальные данные.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Firewall и сегментация сети</h2>
        <Term name="Firewall (межсетевой экран)">
          система, которая проверяет проходящий сетевой трафик по заданным правилам и разрешает или блокирует
          соединения на основе адресов, портов и протоколов.
        </Term>
        <Term name="Сегментация сети">
          разделение сети на изолированные зоны (например, отдельная сеть для серверов, отдельная — для рабочих
          станций сотрудников, отдельная — для гостевого Wi-Fi), чтобы компрометация одного сегмента не давала
          автоматический доступ ко всем остальным.
        </Term>
        <Fig caption="Сегментация: гостевая сеть, рабочая сеть сотрудников и сеть серверов изолированы друг от друга через firewall.">
          <svg viewBox="0 0 460 170" width="460" height="170" xmlns="http://www.w3.org/2000/svg">
            <rect x="180" y="15" width="100" height="40" rx="6" fill="rgba(200,255,0,0.12)" stroke="#c8ff00" />
            <text x="230" y="39" fill="#f5f5fa" fontSize="11" textAnchor="middle">Firewall</text>

            <rect x="20" y="90" width="110" height="40" rx="6" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <text x="75" y="114" fill="#f5f5fa" fontSize="10" textAnchor="middle">Гостевой Wi-Fi</text>

            <rect x="175" y="90" width="110" height="40" rx="6" fill="rgba(74,222,128,0.1)" stroke="#4ade80" />
            <text x="230" y="114" fill="#f5f5fa" fontSize="10" textAnchor="middle">Сеть сотрудников</text>

            <rect x="330" y="90" width="110" height="40" rx="6" fill="rgba(248,113,113,0.1)" stroke="#f87171" />
            <text x="385" y="114" fill="#f5f5fa" fontSize="10" textAnchor="middle">Сеть серверов</text>

            <line x1="230" y1="55" x2="75" y2="90" stroke="#94a3b8" />
            <line x1="230" y1="55" x2="230" y2="90" stroke="#94a3b8" />
            <line x1="230" y1="55" x2="385" y2="90" stroke="#94a3b8" />
            <text x="230" y="150" fill="#94a3b8" fontSize="9" textAnchor="middle">Firewall контролирует, что можно между сегментами, а что нет</text>
          </svg>
        </Fig>
        <TheoryTable
          headers={['Тип firewall', 'Что проверяет']}
          rows={[
            ['Пакетный фильтр (L3/L4)', 'IP-адреса, порты, протокол — быстро, но без понимания содержимого'],
            ['Stateful firewall', 'дополнительно отслеживает состояние соединения (какие пакеты — ответ на уже разрешённое соединение)'],
            ['Firewall уровня приложения (L7 / WAF)', 'содержимое HTTP-запросов — может отличить легитимный запрос от SQL-инъекции'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Базовый инструмент диагностики: ping</h2>
        <Term name="ping">
          утилита, которая отправляет ICMP-пакеты на удалённый узел и измеряет, приходит ли ответ и сколько это
          занимает времени — простейший способ проверить, доступен ли узел в сети.
        </Term>
        <TheoryCode language="bash" code={`ping google.com

# типичный вывод:
# 64 bytes from 142.250.x.x: icmp_seq=1 ttl=115 time=12.4 ms
# 64 bytes from 142.250.x.x: icmp_seq=2 ttl=115 time=11.8 ms

# ограничить число пакетов (полезно, чтобы не гонять бесконечно)
ping -c 4 google.com`} />
        <P n={2}>
          Если ответы не приходят — узел недоступен, заблокирован firewall'ом, или проблема где-то по пути. Время
          ответа (<code>time=</code>) показывает задержку сети — резкий рост задержки может говорить о перегрузке
          канала или о том, что трафик пошёл окольным путём (например, при MITM-атаке).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. traceroute — маршрут пакета до цели</h2>
        <Term name="traceroute (tracert в Windows)">
          показывает все промежуточные узлы (маршрутизаторы), через которые проходит пакет на пути к цели, вместе с
          задержкой на каждом из них.
        </Term>
        <TheoryCode language="bash" code={`traceroute google.com     # Linux / macOS
tracert google.com        # Windows

# вывод — список узлов по пути:
#  1  192.168.1.1        1.2 ms
#  2  10.0.0.1            8.4 ms
#  3  203.0.113.5         14.1 ms
#  ...
#  9  142.250.x.x         22.7 ms   <- цель`} />
        <P n={3}>
          Полезно для диагностики: если задержка резко подскакивает на каком-то узле — проблема где-то там, а не у
          вас и не на конечном сервере. В контексте безопасности traceroute также помогает понять топологию сети и
          заметить неожиданные промежуточные узлы, которые могут быть признаком перехвата трафика.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. nmap — сканер портов и сетей</h2>
        <Term name="nmap (Network Mapper)">
          мощный инструмент для сканирования сети: находит активные узлы, открытые порты на них, запущенные на этих
          портах сервисы и версии программного обеспечения. Используется и атакующими для разведки, и защитниками —
          чтобы понять, что вообще видно снаружи об их собственной инфраструктуре.
        </Term>
        <TheoryCode language="bash" code={`# базовое сканирование хоста — какие порты открыты
nmap 192.168.1.10

# сканирование с определением версий сервисов на портах
nmap -sV 192.168.1.10

# сканирование всей подсети целиком
nmap 192.168.1.0/24

# быстрое сканирование самых популярных портов
nmap -F 192.168.1.10`} />
        <TheoryTable
          headers={['Состояние порта', 'Что значит']}
          rows={[
            ['open', 'на порту есть сервис, готовый принимать соединения'],
            ['closed', 'порт доступен, но на нём ничего не слушает'],
            ['filtered', 'firewall блокирует определить, открыт порт или нет'],
          ]}
        />
        <TheoryExample title="Легальность использования">
          Сканировать порты чужой инфраструктуры без явного разрешения владельца — противоправно в большинстве
          юрисдикций. nmap применяют на собственных серверах, в рамках официального пентеста с договором, или на
          учебных стендах (picoCTF, HackTheBox, TryHackMe).
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. tcpdump и Wireshark — анализ трафика</h2>
        <Term name="tcpdump">
          консольная утилита для перехвата и просмотра сетевых пакетов прямо в терминале — полезна на серверах без
          графического интерфейса.
        </Term>
        <Term name="Wireshark">
          графический анализатор трафика: показывает перехваченные пакеты в удобном виде, умеет разбирать
          содержимое множества протоколов (HTTP, DNS, TCP) и фильтровать нужные пакеты по условиям.
        </Term>
        <TheoryCode language="bash" code={`# перехватить трафик на интерфейсе eth0 и сохранить в файл
sudo tcpdump -i eth0 -w capture.pcap

# показать только трафик на 80 порт (HTTP) в реальном времени
sudo tcpdump -i eth0 port 80

# посмотреть трафик от/к конкретному IP
sudo tcpdump -i eth0 host 192.168.1.10`} />
        <P n={4}>
          Файл <code>capture.pcap</code>, сохранённый через tcpdump, можно затем открыть в Wireshark для удобного
          визуального анализа — с фильтрами вроде <code>http</code>, <code>dns</code> или{' '}
          <code>ip.addr == 192.168.1.10</code>, чтобы быстро найти нужные пакеты среди тысяч захваченных.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Основные сетевые команды операционной системы</h2>
        <TheoryTable
          headers={['Команда', 'Что показывает / делает']}
          rows={[
            ['ipconfig / ifconfig / ip a', 'сетевые интерфейсы устройства и их IP-адреса (Windows / macOS-Linux устаревшее / Linux современное)'],
            ['netstat -an / ss -tulnp', 'список активных сетевых соединений и слушающих портов на устройстве'],
            ['nslookup / dig', 'DNS-запрос: узнать IP-адрес по доменному имени и наоборот'],
            ['whois example.com', 'информация о регистрации домена: владелец, дата регистрации, DNS-серверы'],
            ['arp -a', 'таблица ARP — соответствие IP-адресов и MAC-адресов в локальной сети'],
            ['curl -I https://example.com', 'быстрый запрос HTTP-заголовков сайта без загрузки всей страницы'],
          ]}
        />
        <TheoryCode language="bash" code={`# посмотреть свой IP и сетевые интерфейсы
ip a                    # Linux
ipconfig                # Windows

# какие порты слушает эта машина прямо сейчас
ss -tulnp               # Linux (современный аналог netstat)
netstat -an             # универсально, есть почти везде

# узнать IP-адрес домена
nslookup example.com

# посмотреть, кому принадлежит домен
whois example.com

# быстро проверить заголовки ответа сайта (без скачивания страницы)
curl -I https://example.com`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Как эти инструменты работают вместе</h2>
        <P n={5}>
          На практике диагностика сетевого инцидента обычно идёт по цепочке: сначала <code>ping</code> — проверить,
          доступен ли узел вообще; затем <code>traceroute</code> — понять, где именно рвётся или задерживается
          маршрут; <code>nmap</code> — посмотреть, какие сервисы и порты видны снаружи (в том числе на своей же
          инфраструктуре — проверить, не открылось ли лишнее); и наконец <code>tcpdump</code>/Wireshark — если
          нужно разобраться в содержимом конкретного подозрительного трафика.
        </P>
        <TheoryTable
          headers={['Инструмент', 'Главный вопрос, на который отвечает']}
          rows={[
            ['ping', '«Узел вообще доступен?»'],
            ['traceroute', '«Каким маршрутом идёт трафик и где узкое место?»'],
            ['nmap', '«Какие порты и сервисы открыты на узле/в сети?»'],
            ['tcpdump / Wireshark', '«Что конкретно передаётся внутри этого трафика?»'],
            ['netstat / ss', '«Что слушает и с кем соединено это конкретное устройство прямо сейчас?»'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={6}>
          Сетевые угрозы существуют на всех уровнях модели <strong>OSI</strong> — от физического кабеля до
          прикладного протокола, поэтому защита строится комбинированно: шифрование, <strong>firewall</strong> и{' '}
          <strong>сегментация сети</strong>. Базовый набор инструментов диагностики: <strong>ping</strong>{' '}
          (доступность узла), <strong>traceroute</strong> (маршрут и задержки), <strong>nmap</strong> (какие порты
          и сервисы видны), <strong>tcpdump/Wireshark</strong> (содержимое трафика). Дополняют их системные команды
          — <code>ip a</code>/<code>ipconfig</code>, <code>ss</code>/<code>netstat</code>,{' '}
          <code>nslookup</code>/<code>dig</code>, <code>whois</code>, <code>arp -a</code>. Все инструменты
          двусторонние: ими одинаково пользуются и атакующие для разведки, и защитники для аудита собственной
          инфраструктуры — поэтому применять их можно только на своих системах или с явного разрешения владельца.
        </P>
      </section>
    </div>
  )
}
