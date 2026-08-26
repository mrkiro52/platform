import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#FFD60A', border: '#2a2a3a' }

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

export default function July5AssemblyTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Ассемблер и кое-что до</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">5 июля 2026</p>
        <p>
          Мы привыкли писать на Python и JavaScript, где одна строка делает много. Но процессор не понимает ни
          слова из этих языков — он исполняет крошечные бинарные команды. <strong>Ассемблер</strong> — это
          человекочитаемая форма этих самых команд, «язык самого железа». Для специалиста по безопасности он
          критически важен: вредоносное ПО, эксплойты и прошивки живут именно на этом уровне. Сегодня разберём,{' '}
          <strong>зачем вообще нужны низкоуровневые языки</strong>, какие задачи они решают, какие отделы
          кибербезопасности с ними работают, и напишем первые реальные программы на ассемблере.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2 theory-heading-2--centered">Видео-лекция: Ассемблер и кое-что до</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/day5Cybersec.mov" />
      </section>

      {/* Уровни языков */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужны низкоуровневые языки</h2>
        <p>
          Языки делят на «высокоуровневые» (далеко от железа, близко к человеку) и «низкоуровневые» (близко к
          железу). Чем ниже уровень — тем больше контроля над машиной, но тем больше писать вручную.
        </p>
        <Fig caption="Лестница абстракции: от удобного для человека Python вниз, к машинному коду, который непосредственно исполняет процессор. Ассемблер — последняя ступень, ещё читаемая человеком">
          <svg viewBox="0 0 560 250" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[
              { t: 'Python / JavaScript', d: 'высокий уровень — близко к человеку', c: '#4ade80', y: 20 },
              { t: 'C / C++ / Rust', d: 'системный уровень — ручное управление памятью', c: '#60a5fa', y: 76 },
              { t: 'Ассемблер (NASM)', d: 'мнемоники машинных команд', c: '#FFD60A', y: 132 },
              { t: 'Машинный код 10110000', d: 'байты, которые исполняет процессор', c: '#f87171', y: 188 },
            ].map((r, i) => (
              <g key={i}>
                <rect x={40 + i * 12} y={r.y} width={480 - i * 24} height="44" rx="8" fill={`${r.c}1f`} stroke={r.c} />
                <text x="280" y={r.y + 20} fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">{r.t}</text>
                <text x="280" y={r.y + 37} fill={C.sub} fontSize="10.5" textAnchor="middle">{r.d}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <p>Причины, по которым низкоуровневые языки не исчезают:</p>
        <Term name="Максимальная производительность">
          критичные участки (ядра ОС, кодеки, криптография, драйверы) пишут близко к железу, чтобы выжать
          скорость, недостижимую в интерпретируемых языках.
        </Term>
        <Term name="Прямой доступ к железу">
          прошивки, микроконтроллеры, загрузчики ОС работают там, где нет никакой «обёртки» — только регистры,
          память и порты.
        </Term>
        <Term name="Понимание того, что реально происходит">
          для безопасности это главное. Когда у тебя есть только скомпилированная программа без исходников,
          единственный способ понять, что она делает, — читать её на ассемблере.
        </Term>
      </section>

      {/* Задачи ассемблера */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Какие задачи решает ассемблер в безопасности</h2>
        <p>
          В кибербезопасности ассемблер — не «язык для написания приложений», а <strong>язык анализа</strong>.
          Основные задачи:
        </p>
        <TheoryTable
          headers={['Задача', 'Суть']}
          rows={[
            ['Реверс-инжиниринг', 'разобрать программу без исходников, поняв её логику по ассемблерному коду'],
            ['Анализ вредоносного ПО', 'изучить, что делает вирус/троян: какие файлы, сеть, шифрование'],
            ['Поиск уязвимостей', 'найти ошибки работы с памятью (переполнение буфера) на уровне инструкций'],
            ['Разработка эксплойтов', 'написать «полезную нагрузку» (shellcode), эксплуатирующую уязвимость'],
            ['Обход защит', 'понять и снять обфускацию, антиотладку, упаковку'],
          ]}
        />
        <TheoryExample title="Почему нельзя обойтись Python">
          Атакующий не пришлёт тебе .py-файл вируса с комментариями. Ты получишь бинарник — набор байтов. Чтобы
          восстановить логику, аналитик «дизассемблирует» его (переводит машинный код обратно в ассемблер) и
          читает. Без понимания ассемблера анализ вредоносов и эксплойтов невозможен в принципе.
        </TheoryExample>
      </section>

      {/* Отделы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Кто этим занимается</h2>
        <p>Разные направления безопасности используют ассемблер в разной степени:</p>
        <TheoryTable
          headers={['Направление', 'Как использует ассемблер']}
          rows={[
            ['Reverse Engineer', 'основной инструмент: разбирает бинарники и прошивки'],
            ['Malware Analyst', 'читает дизассемблированный код вредоносов, пишет сигнатуры'],
            ['Exploit Developer', 'пишет shellcode и полезные нагрузки на ассемблере'],
            ['Vulnerability Researcher', 'ищет баги работы с памятью, изучая поведение на низком уровне'],
            ['Red Team / Pentest', 'адаптирует эксплойты, обходит антивирусы и защиты'],
            ['SOC / Blue Team', 'реже — при глубоком разборе инцидента и forensics'],
          ]}
        />
        <TheoryExample title="Инструменты профессионалов">
          На практике ассемблер читают не в блокноте, а в <strong>дизассемблерах и отладчиках</strong>: IDA Pro,
          Ghidra (бесплатный, от АНБ), x64dbg, radare2. Они переводят машинный код в ассемблер, строят графы
          переходов и помогают шаг за шагом проследить выполнение программы.
        </TheoryExample>
      </section>

      {/* Как устроен процессор */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Как процессор исполняет команды</h2>
        <p>
          Чтобы читать ассемблер, надо понимать модель процессора. Он работает с крошечными сверхбыстрыми ячейками
          памяти внутри себя — <strong>регистрами</strong> — и с оперативной памятью снаружи.
        </p>
        <Term name="Регистр">
          ячейка памяти прямо в процессоре. Их немного, но они самые быстрые. Почти любая операция сначала кладёт
          данные в регистры, а потом что-то с ними делает.
        </Term>
        <Term name="Оперативная память (RAM)">
          большое хранилище снаружи процессора, адресуемое по номерам байтов. Данные гоняются между RAM и
          регистрами.
        </Term>
        <Term name="Стек (stack)">
          особая область памяти, работающая по принципу LIFO (последним пришёл — первым ушёл). Хранит локальные
          переменные и адреса возврата функций. Именно через ошибки со стеком работает классическое переполнение
          буфера.
        </Term>
        <p>Основные регистры x86-64 (64-битная архитектура):</p>
        <TheoryTable
          headers={['Регистр', 'Традиционное назначение']}
          rows={[
            ['RAX', 'аккумулятор: результат операций, код системного вызова'],
            ['RBX, RCX, RDX', 'общего назначения: данные, счётчики, аргументы'],
            ['RSI, RDI', 'источник и приёмник при работе с данными; аргументы'],
            ['RSP', 'указатель вершины стека (Stack Pointer)'],
            ['RBP', 'указатель базы стекового кадра (Base Pointer)'],
            ['RIP', 'указатель на следующую исполняемую команду'],
          ]}
        />
        <Fig caption="Модель исполнения: процессор с регистрами тянет данные из RAM, обрабатывает в регистрах и кладёт обратно. RIP всегда указывает на следующую команду">
          <svg viewBox="0 0 580 200" width="100%" style={{ maxWidth: 580 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="30" width="230" height="140" rx="10" fill="rgba(255,214,10,0.05)" stroke={C.lime} />
            <text x="145" y="22" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">Процессор (CPU)</text>
            {['RAX','RBX','RCX','RDX','RSP','RIP'].map((r,i)=>(
              <g key={r}>
                <rect x={50 + (i%3)*70} y={50 + Math.floor(i/3)*48} width="60" height="34" rx="5" fill="#17171f" stroke={C.border} />
                <text x={80 + (i%3)*70} y={71 + Math.floor(i/3)*48} fill={C.text} fontSize="11" textAnchor="middle">{r}</text>
              </g>
            ))}
            <rect x="360" y="30" width="190" height="140" rx="10" fill="rgba(96,165,250,0.06)" stroke="#60a5fa" />
            <text x="455" y="22" fill="#60a5fa" fontSize="12" fontWeight="700" textAnchor="middle">RAM (память)</text>
            {[0,1,2,3].map(i=>(
              <rect key={i} x="380" y={48+i*28} width="150" height="20" rx="3" fill="#17171f" stroke={C.border} />
            ))}
            <text x="455" y="150" fill={C.sub} fontSize="10" textAnchor="middle">байты по адресам</text>
            <line x1="260" y1="90" x2="360" y2="90" stroke={C.sub} strokeWidth="2" markerEnd="url(#aa)" />
            <text x="310" y="82" fill={C.sub} fontSize="9" textAnchor="middle">load</text>
            <line x1="360" y1="120" x2="260" y2="120" stroke={C.sub} strokeWidth="2" markerEnd="url(#aa)" />
            <text x="310" y="135" fill={C.sub} fontSize="9" textAnchor="middle">store</text>
            <defs>
              <marker id="aa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Инструкции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Базовые инструкции</h2>
        <p>
          Программа на ассемблере — это список команд «мнемоника операнды». Одна команда делает одно простое
          действие. Вот минимальный набор, которого хватает для понимания большинства кода:
        </p>
        <TheoryTable
          headers={['Инструкция', 'Что делает', 'Пример']}
          rows={[
            ['mov', 'скопировать значение', 'mov rax, 5  (положить 5 в rax)'],
            ['add / sub', 'сложить / вычесть', 'add rax, rbx'],
            ['inc / dec', 'увеличить / уменьшить на 1', 'inc rcx'],
            ['cmp', 'сравнить два значения', 'cmp rax, 10'],
            ['jmp', 'безусловный переход', 'jmp loop'],
            ['je / jne / jg / jl', 'переход по условию (после cmp)', 'je equal'],
            ['call / ret', 'вызов функции / возврат', 'call func'],
            ['push / pop', 'положить / снять со стека', 'push rax'],
            ['syscall', 'обращение к ядру ОС', 'syscall'],
          ]}
        />
        <Term name="Мнемоника">
          человекочитаемое имя машинной команды. Например, <code>mov</code> вместо байта <code>0xB8</code>.
          Ассемблер (программа-транслятор) переводит мнемоники в машинный код один-в-один.
        </Term>
      </section>

      {/* Первый код */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Первая программа: «Hello, World» (Linux x86-64)</h2>
        <p>
          Разберём классику — вывод строки. Здесь нет функций стандартной библиотеки: мы напрямую просим ядро ОС
          через <code>syscall</code> записать байты в поток вывода. Синтаксис — NASM.
        </p>
        <TheoryCode language="asm" code={`section .data                     ; секция .data — здесь лежат заранее заданные данные
    msg db "Hello, World", 10     ; db = "define bytes": кладём в память строку и байт 10 (перевод строки)
    len equ $ - msg               ; equ = константа. $ — текущий адрес; ($ - msg) = длина строки в байтах

section .text                     ; секция .text — здесь лежит сам исполняемый код
    global _start                 ; делаем метку _start видимой снаружи — это точка входа программы

_start:                           ; отсюда начинается выполнение
    ; --- системный вызов write(fd=1, buf=msg, count=len): напечатать строку ---
    mov rax, 1        ; в rax кладём НОМЕР системного вызова: 1 = write (записать)
    mov rdi, 1        ; 1-й аргумент → rdi: fd=1 = стандартный вывод (экран/терминал)
    mov rsi, msg      ; 2-й аргумент → rsi: адрес, ОТКУДА брать байты (наша строка)
    mov rdx, len      ; 3-й аргумент → rdx: СКОЛЬКО байт вывести (длина строки)
    syscall           ; передаём управление ядру ОС — оно выполняет write и печатает строку

    ; --- системный вызов exit(0): корректно завершить программу ---
    mov rax, 60       ; номер системного вызова 60 = exit (выход)
    mov rdi, 0        ; 1-й аргумент → rdi: код возврата 0 = "успех, ошибок не было"
    syscall           ; снова зовём ядро — программа завершается`} />
        <p>Собрать и запустить (нужен ассемблер NASM и компоновщик ld):</p>
        <TheoryCode language="bash" code={`nasm -f elf64 hello.asm -o hello.o   # nasm переводит текст ассемблера в машинный код (объектный файл .o), формат elf64 = 64-битный Linux
ld hello.o -o hello                  # ld (компоновщик) собирает из объектного файла готовую исполняемую программу
./hello                              # запускаем программу → на экране появится Hello, World`} />
        <TheoryExample title="Что здесь происходит по шагам">
          Регистр <code>rax</code> задаёт, <strong>какой</strong> системный вызов нужен (1 = write), а{' '}
          <code>rdi/rsi/rdx</code> — его аргументы (куда, что, сколько). Инструкция <code>syscall</code> передаёт
          управление ядру, которое и печатает строку. Затем тем же способом вызываем <code>exit</code>. Так
          работает любая программа на самом низком уровне — даже <code>print()</code> в Python в итоге сводится к
          этому syscall.
        </TheoryExample>
      </section>

      {/* Второй пример: цикл */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Второй пример: сложение и цикл</h2>
        <p>
          Чтобы увидеть <code>cmp</code> и условные переходы в деле, сложим числа от 1 до 5. Это иллюстрирует, как
          в ассемблере устроены циклы — через сравнение и прыжки, ведь никаких <code>for</code> здесь нет.
        </p>
        <TheoryCode language="asm" code={`    mov rax, 0        ; rax будет накапливать сумму, стартуем с 0
    mov rcx, 1        ; rcx — счётчик i, начинаем с 1

loop_start:           ; метка начала цикла — сюда будем возвращаться
    add rax, rcx      ; тело цикла: прибавить текущий i к сумме (rax = rax + rcx)
    inc rcx           ; увеличить счётчик на 1 (i++)
    cmp rcx, 6        ; сравнить i с 6 (cmp мысленно вычитает и запоминает результат сравнения)
    jl loop_start     ; jl = "jump if less": если i < 6 — прыгнуть назад на loop_start и повторить
                      ; как только i станет = 6, условие ложно, прыжка нет — выходим из цикла

    ; после цикла в rax накопилось 1+2+3+4+5 = 15`} />
        <Fig caption="Цикл в ассемблере: тело выполняется, счётчик растёт, cmp сравнивает его с границей, а условный переход jl либо возвращает в начало, либо выпускает из цикла">
          <svg viewBox="0 0 560 180" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="70" width="120" height="40" rx="8" fill="rgba(255,214,10,0.10)" stroke={C.lime} />
            <text x="100" y="94" fill={C.text} fontSize="12" textAnchor="middle">add / inc</text>
            <rect x="220" y="70" width="120" height="40" rx="8" fill="rgba(96,165,250,0.10)" stroke="#60a5fa" />
            <text x="280" y="94" fill={C.text} fontSize="12" textAnchor="middle">cmp rcx, 6</text>
            <path d="M280 70 L280 30 L100 30 L100 68" fill="none" stroke={C.lime} strokeWidth="2" markerEnd="url(#al)" />
            <text x="190" y="22" fill={C.lime} fontSize="11" textAnchor="middle">jl — если i {'<'} 6</text>
            <line x1="160" y1="90" x2="220" y2="90" stroke={C.sub} strokeWidth="2" markerEnd="url(#al2)" />
            <rect x="410" y="70" width="120" height="40" rx="8" fill="rgba(248,113,113,0.10)" stroke="#f87171" />
            <text x="470" y="94" fill={C.text} fontSize="12" textAnchor="middle">выход</text>
            <line x1="340" y1="90" x2="410" y2="90" stroke={C.sub} strokeWidth="2" markerEnd="url(#al2)" />
            <text x="375" y="82" fill={C.sub} fontSize="9" textAnchor="middle">i ≥ 6</text>
            <defs>
              <marker id="al" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker>
              <marker id="al2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          Низкоуровневые языки существуют ради <strong>производительности, прямого доступа к железу и полного
          понимания происходящего</strong>. В безопасности ассемблер — это <strong>язык анализа</strong>:
          реверс-инжиниринг, разбор вредоносов, поиск уязвимостей и разработка эксплойтов. Им занимаются
          реверс-инженеры, malware-аналитики, exploit-разработчики и vulnerability-исследователи, вооружённые
          дизассемблерами вроде IDA и Ghidra. На уровне модели процессор работает с <strong>регистрами</strong>,{' '}
          <strong>памятью</strong> и <strong>стеком</strong>, а программа — это список простых команд{' '}
          (<code>mov</code>, <code>add</code>, <code>cmp</code>, <code>jmp</code>, <code>syscall</code>). Даже
          привычный <code>print()</code> в конце концов превращается в системный вызов, который мы сегодня написали
          руками.
        </p>
      </section>
    </div>
  )
}
