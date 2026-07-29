import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', red: '#f87171', blue: '#60a5fa', border: '#2a2a3a' }

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

export default function July6WinApiTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы WinAPI и C++</h1>
        <p className="theory-subtitle">Трек: Кибербезопасность</p>
        <p className="theory-date">6 июля 2026</p>
        <p>
          Windows — самая атакуемая ОС в мире, и почти всё вредоносное ПО под неё общается с системой через{' '}
          <strong>WinAPI</strong>. Понимать этот интерфейс обязан любой, кто анализирует малварь, пишет средства
          защиты или ищет уязвимости. Это короткое (получасовое) занятие даёт базу: что такое WinAPI, какие
          задачи он решает, каким инструментарием пользуются, и как выглядит простейший код на WinAPI и C++.
        </p>
      </section>

      {/* Что такое WinAPI */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое WinAPI</h2>
        <Term name="WinAPI (Windows API)">
          набор функций, которые операционная система Windows предоставляет программам. Через них приложение просит
          систему сделать то, что <strong>сама программа делать не вправе</strong>: создать окно, открыть файл,
          запустить процесс, выделить память, выйти в сеть. Это официальный «пульт управления» Windows.
        </Term>
        <p>
          Любая программа под Windows — от блокнота до вируса — в конечном счёте вызывает функции WinAPI. Прикладной
          код не обращается к железу напрямую: он просит об этом ОС через API, а та выполняет запрос в защищённом
          режиме ядра.
        </p>
        <Fig caption="Прикладная программа не трогает железо напрямую — она вызывает функции WinAPI, а операционная система выполняет запрос">
          <svg viewBox="0 0 500 170" width="100%" style={{ maxWidth: 500 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="150" y="15" width="200" height="34" rx="8" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="250" y="37" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Программа (ваш .exe)</text>
            <rect x="150" y="68" width="200" height="34" rx="8" fill="rgba(32,190,255,0.08)" stroke={C.lime} />
            <text x="250" y="90" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">WinAPI (kernel32, user32...)</text>
            <rect x="150" y="121" width="200" height="34" rx="8" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="250" y="143" fill={C.sub} fontSize="12" fontWeight="700" textAnchor="middle">Ядро Windows → железо</text>
            <line x1="250" y1="49" x2="250" y2="68" stroke={C.sub} strokeWidth="2" markerEnd="url(#wa)" />
            <line x1="250" y1="102" x2="250" y2="121" stroke={C.sub} strokeWidth="2" markerEnd="url(#wa)" />
            <defs>
              <marker id="wa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Задачи */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Какие задачи решает WinAPI</h2>
        <p>Функции WinAPI сгруппированы по областям. Основные библиотеки (DLL) и за что они отвечают:</p>
        <TheoryTable
          headers={['Библиотека', 'За что отвечает']}
          rows={[
            ['kernel32.dll', 'файлы, память, процессы и потоки — ядро системы'],
            ['user32.dll', 'окна, кнопки, сообщения, ввод с мыши и клавиатуры'],
            ['gdi32.dll', 'рисование графики и текста на экране'],
            ['advapi32.dll', 'реестр, службы, права и безопасность'],
            ['ws2_32.dll', 'сеть, сокеты (Winsock)'],
          ]}
        />
        <TheoryExample title="Почему это важно для безопасности">
          Аналитик малвари смотрит, какие функции WinAPI вызывает подозрительный файл. Вызовы{' '}
          <code>CreateFile</code> + <code>WriteFile</code> в системную папку, <code>RegSetValue</code> в автозапуск,{' '}
          <code>VirtualAllocEx</code> + <code>WriteProcessMemory</code> в чужой процесс — это «отпечатки»
          вредоносного поведения. Список импортируемых API часто выдаёт вирус ещё до запуска.
        </TheoryExample>
      </section>

      {/* Инструменты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Инструменты</h2>
        <Term name="Компилятор C++">
          MSVC (Visual Studio) или MinGW/g++ — превращают C++ код с вызовами WinAPI в .exe. Заголовок{' '}
          <code>&lt;windows.h&gt;</code> подключает объявления всех функций WinAPI.
        </Term>
        <Term name="Анализ и отладка">
          <strong>Dependency Walker / PE-bear</strong> — смотрят, какие API импортирует программа;{' '}
          <strong>x64dbg, WinDbg</strong> — отладчики; <strong>Process Monitor, API Monitor</strong> — показывают
          вызовы WinAPI вживую во время работы программы.
        </Term>
      </section>

      {/* Пример 1 */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Пример 1: окно с сообщением</h2>
        <p>
          Классическое первое знакомство — вызов <code>MessageBox</code> из user32. Одна функция WinAPI рисует
          готовое окно с текстом и кнопкой.
        </p>
        <TheoryCode language="cpp" code={`#include <windows.h>   // объявления всех функций WinAPI

int main() {
    // MessageBox(владелец, текст, заголовок, тип кнопок)
    MessageBox(
        NULL,                       // нет родительского окна
        "Привет из WinAPI!",        // текст сообщения
        "Моя первая программа",     // заголовок окна
        MB_OK | MB_ICONINFORMATION  // кнопка OK + иконка "информация"
    );
    return 0;
}`} />
        <TheoryCode language="bash" code={`# Компиляция (MinGW/g++): -luser32 подключает библиотеку user32
g++ hello.cpp -o hello.exe -luser32`} />
      </section>

      {/* Пример 2 */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Пример 2: создание файла</h2>
        <p>
          Работа с файлами через WinAPI — это <code>CreateFile</code> (создать/открыть), <code>WriteFile</code>{' '}
          (записать), <code>CloseHandle</code> (закрыть). Обрати внимание на <strong>дескриптор</strong>{' '}
          (HANDLE) — «билет», по которому система узнаёт открытый ресурс.
        </p>
        <TheoryCode language="cpp" code={`#include <windows.h>

int main() {
    // Создаём (или перезаписываем) файл, получаем его дескриптор HANDLE
    HANDLE hFile = CreateFile(
        "test.txt",              // имя файла
        GENERIC_WRITE,           // хотим писать
        0,                       // не разделять доступ
        NULL,                    // атрибуты безопасности по умолчанию
        CREATE_ALWAYS,           // создать всегда (перезаписать, если есть)
        FILE_ATTRIBUTE_NORMAL,   // обычный файл
        NULL
    );

    if (hFile == INVALID_HANDLE_VALUE) {   // проверяем ошибку
        return 1;
    }

    const char* text = "Записано через WinAPI\\n";
    DWORD written;                          // сюда система запишет, сколько байт записала
    WriteFile(hFile, text, lstrlen(text), &written, NULL);

    CloseHandle(hFile);   // обязательно закрываем дескриптор — иначе утечка ресурса
    return 0;
}`} />
        <Term name="HANDLE (дескриптор)">
          числовой «билет», которым Windows обозначает открытый ресурс (файл, окно, процесс). Почти все функции
          WinAPI, работающие с ресурсами, принимают и возвращают HANDLE, а по завершении его нужно закрыть
          (<code>CloseHandle</code>).
        </Term>
      </section>

      {/* Мини C++ */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Немного «чистого» C++</h2>
        <p>
          WinAPI пишут на C++, поэтому базовый синтаксис нужно чувствовать. Быстрое напоминание: цикл и работа с
          массивом.
        </p>
        <TheoryCode language="cpp" code={`#include <iostream>
using namespace std;

int main() {
    int arr[5] = {3, 7, 1, 9, 4};   // массив из 5 чисел
    int sum = 0;
    int mx = arr[0];

    // цикл по индексам массива
    for (int i = 0; i < 5; i++) {
        sum += arr[i];               // накапливаем сумму
        if (arr[i] > mx) mx = arr[i]; // ищем максимум
    }

    cout << "Сумма: " << sum << endl;     // 24
    cout << "Максимум: " << mx << endl;   // 9
    return 0;
}`} />
        <TheoryExample title="Зачем безопаснику C++">
          Системное ПО, драйверы и малварь пишут на C/C++. Именно ручное управление памятью в C++ порождает целый
          класс уязвимостей (переполнение буфера, use-after-free). Чтобы находить и понимать такие баги, нужно
          свободно читать и писать C++.
        </TheoryExample>
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          <strong>WinAPI</strong> — официальный интерфейс, через который программы просят Windows о действиях с
          файлами, памятью, окнами, процессами и сетью. Функции разложены по библиотекам (<code>kernel32</code>,{' '}
          <code>user32</code> и др.), а работа с ресурсами идёт через <strong>дескрипторы (HANDLE)</strong>.
          Программируют это на <strong>C++</strong> с заголовком <code>&lt;windows.h&gt;</code>. Для
          безопасника WinAPI — ключ к анализу вредоносного ПО: по вызванным функциям видно, что программа делает с
          системой. Мы написали окно через <code>MessageBox</code>, создали файл через{' '}
          <code>CreateFile/WriteFile</code> и повторили базовый C++ — этого достаточно для старта.
        </p>
      </section>
    </div>
  )
}
