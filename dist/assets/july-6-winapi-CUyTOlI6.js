import{j as e}from"./index-Cb5sh8pD.js";import{b as d,a as l,T as r}from"./TheoryTable-CAJX0pr7.js";const i={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#20beff",blue:"#60a5fa",border:"#2a2a3a"};function c({children:t,caption:s}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:t}),s&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:s})]})}function n({name:t,children:s}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:t}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",s]})]})}function h(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Основы WinAPI и C++"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Кибербезопасность"}),e.jsx("p",{className:"theory-date",children:"6 июля 2026"}),e.jsxs("p",{children:["Windows — самая атакуемая ОС в мире, и почти всё вредоносное ПО под неё общается с системой через"," ",e.jsx("strong",{children:"WinAPI"}),". Понимать этот интерфейс обязан любой, кто анализирует малварь, пишет средства защиты или ищет уязвимости. Это короткое (получасовое) занятие даёт базу: что такое WinAPI, какие задачи он решает, каким инструментарием пользуются, и как выглядит простейший код на WinAPI и C++."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Что такое WinAPI"}),e.jsxs(n,{name:"WinAPI (Windows API)",children:["набор функций, которые операционная система Windows предоставляет программам. Через них приложение просит систему сделать то, что ",e.jsx("strong",{children:"сама программа делать не вправе"}),": создать окно, открыть файл, запустить процесс, выделить память, выйти в сеть. Это официальный «пульт управления» Windows."]}),e.jsx("p",{children:"Любая программа под Windows — от блокнота до вируса — в конечном счёте вызывает функции WinAPI. Прикладной код не обращается к железу напрямую: он просит об этом ОС через API, а та выполняет запрос в защищённом режиме ядра."}),e.jsx(c,{caption:"Прикладная программа не трогает железо напрямую — она вызывает функции WinAPI, а операционная система выполняет запрос",children:e.jsxs("svg",{viewBox:"0 0 500 170",width:"100%",style:{maxWidth:500},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"150",y:"15",width:"200",height:"34",rx:"8",fill:"rgba(96,165,250,0.10)",stroke:i.blue}),e.jsx("text",{x:"250",y:"37",fill:i.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"Программа (ваш .exe)"}),e.jsx("rect",{x:"150",y:"68",width:"200",height:"34",rx:"8",fill:"rgba(32,190,255,0.08)",stroke:i.lime}),e.jsx("text",{x:"250",y:"90",fill:i.lime,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"WinAPI (kernel32, user32...)"}),e.jsx("rect",{x:"150",y:"121",width:"200",height:"34",rx:"8",fill:"var(--bg-tertiary)",stroke:i.border}),e.jsx("text",{x:"250",y:"143",fill:i.sub,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"Ядро Windows → железо"}),e.jsx("line",{x1:"250",y1:"49",x2:"250",y2:"68",stroke:i.sub,strokeWidth:"2",markerEnd:"url(#wa)"}),e.jsx("line",{x1:"250",y1:"102",x2:"250",y2:"121",stroke:i.sub,strokeWidth:"2",markerEnd:"url(#wa)"}),e.jsx("defs",{children:e.jsx("marker",{id:"wa",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:i.sub})})})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Какие задачи решает WinAPI"}),e.jsx("p",{children:"Функции WinAPI сгруппированы по областям. Основные библиотеки (DLL) и за что они отвечают:"}),e.jsx(d,{headers:["Библиотека","За что отвечает"],rows:[["kernel32.dll","файлы, память, процессы и потоки — ядро системы"],["user32.dll","окна, кнопки, сообщения, ввод с мыши и клавиатуры"],["gdi32.dll","рисование графики и текста на экране"],["advapi32.dll","реестр, службы, права и безопасность"],["ws2_32.dll","сеть, сокеты (Winsock)"]]}),e.jsxs(l,{title:"Почему это важно для безопасности",children:["Аналитик малвари смотрит, какие функции WinAPI вызывает подозрительный файл. Вызовы"," ",e.jsx("code",{children:"CreateFile"})," + ",e.jsx("code",{children:"WriteFile"})," в системную папку, ",e.jsx("code",{children:"RegSetValue"})," в автозапуск,"," ",e.jsx("code",{children:"VirtualAllocEx"})," + ",e.jsx("code",{children:"WriteProcessMemory"})," в чужой процесс — это «отпечатки» вредоносного поведения. Список импортируемых API часто выдаёт вирус ещё до запуска."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Инструменты"}),e.jsxs(n,{name:"Компилятор C++",children:["MSVC (Visual Studio) или MinGW/g++ — превращают C++ код с вызовами WinAPI в .exe. Заголовок"," ",e.jsx("code",{children:"<windows.h>"})," подключает объявления всех функций WinAPI."]}),e.jsxs(n,{name:"Анализ и отладка",children:[e.jsx("strong",{children:"Dependency Walker / PE-bear"})," — смотрят, какие API импортирует программа;"," ",e.jsx("strong",{children:"x64dbg, WinDbg"})," — отладчики; ",e.jsx("strong",{children:"Process Monitor, API Monitor"})," — показывают вызовы WinAPI вживую во время работы программы."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Пример 1: окно с сообщением"}),e.jsxs("p",{children:["Классическое первое знакомство — вызов ",e.jsx("code",{children:"MessageBox"})," из user32. Одна функция WinAPI рисует готовое окно с текстом и кнопкой."]}),e.jsx(r,{language:"cpp",code:`#include <windows.h>   // объявления всех функций WinAPI

int main() {
    // MessageBox(владелец, текст, заголовок, тип кнопок)
    MessageBox(
        NULL,                       // нет родительского окна
        "Привет из WinAPI!",        // текст сообщения
        "Моя первая программа",     // заголовок окна
        MB_OK | MB_ICONINFORMATION  // кнопка OK + иконка "информация"
    );
    return 0;
}`}),e.jsx(r,{language:"bash",code:`# Компиляция (MinGW/g++): -luser32 подключает библиотеку user32
g++ hello.cpp -o hello.exe -luser32`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Пример 2: создание файла"}),e.jsxs("p",{children:["Работа с файлами через WinAPI — это ",e.jsx("code",{children:"CreateFile"})," (создать/открыть), ",e.jsx("code",{children:"WriteFile"})," ","(записать), ",e.jsx("code",{children:"CloseHandle"})," (закрыть). Обрати внимание на ",e.jsx("strong",{children:"дескриптор"})," ","(HANDLE) — «билет», по которому система узнаёт открытый ресурс."]}),e.jsx(r,{language:"cpp",code:`#include <windows.h>

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
}`}),e.jsxs(n,{name:"HANDLE (дескриптор)",children:["числовой «билет», которым Windows обозначает открытый ресурс (файл, окно, процесс). Почти все функции WinAPI, работающие с ресурсами, принимают и возвращают HANDLE, а по завершении его нужно закрыть (",e.jsx("code",{children:"CloseHandle"}),")."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Немного «чистого» C++"}),e.jsx("p",{children:"WinAPI пишут на C++, поэтому базовый синтаксис нужно чувствовать. Быстрое напоминание: цикл и работа с массивом."}),e.jsx(r,{language:"cpp",code:`#include <iostream>
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
}`}),e.jsx(l,{title:"Зачем безопаснику C++",children:"Системное ПО, драйверы и малварь пишут на C/C++. Именно ручное управление памятью в C++ порождает целый класс уязвимостей (переполнение буфера, use-after-free). Чтобы находить и понимать такие баги, нужно свободно читать и писать C++."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs("p",{children:[e.jsx("strong",{children:"WinAPI"})," — официальный интерфейс, через который программы просят Windows о действиях с файлами, памятью, окнами, процессами и сетью. Функции разложены по библиотекам (",e.jsx("code",{children:"kernel32"}),","," ",e.jsx("code",{children:"user32"})," и др.), а работа с ресурсами идёт через ",e.jsx("strong",{children:"дескрипторы (HANDLE)"}),". Программируют это на ",e.jsx("strong",{children:"C++"})," с заголовком ",e.jsx("code",{children:"<windows.h>"}),". Для безопасника WinAPI — ключ к анализу вредоносного ПО: по вызванным функциям видно, что программа делает с системой. Мы написали окно через ",e.jsx("code",{children:"MessageBox"}),", создали файл через"," ",e.jsx("code",{children:"CreateFile/WriteFile"})," и повторили базовый C++ — этого достаточно для старта."]})]})]})}export{h as default};
