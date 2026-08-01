import{r as m,j as e}from"./index-COKtlNDI.js";const r=({children:d,style:t})=>e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...t},children:d}),o=({children:d})=>e.jsx("strong",{style:{color:"var(--text-primary)"},children:d}),j=({children:d})=>e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:600},children:d}),u=({items:d})=>e.jsx("ul",{style:{paddingLeft:20,margin:"10px 0"},children:d.map((t,c)=>e.jsx("li",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75,marginBottom:6},children:t},c))}),f=({children:d})=>e.jsxs("div",{style:{background:"rgba(32,190,255,0.05)",border:"1px solid rgba(32,190,255,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13.5,lineHeight:1.7},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),d]}),p=({children:d})=>e.jsxs("div",{style:{background:"rgba(255,100,100,0.07)",border:"1px solid rgba(255,100,100,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13.5,lineHeight:1.7},children:[e.jsx("span",{style:{color:"#f87171",fontWeight:700,marginRight:6},children:"⚠️"}),d]}),s=({code:d})=>{const t=d.split(`
`);return e.jsxs("div",{className:"theory-code-block",children:[e.jsx("div",{className:"theory-code-label",children:"python"}),e.jsx("pre",{className:"theory-code",children:e.jsx("code",{children:t.map((c,l)=>{const h=c.indexOf("#");if(h===-1)return e.jsxs("span",{children:[c,l<t.length-1?`
`:""]},l);const x=c.slice(0,h),y=(x.match(/'/g)||[]).length,b=(x.match(/"/g)||[]).length;return y%2!==0||b%2!==0?e.jsxs("span",{children:[c,l<t.length-1?`
`:""]},l):e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--text-primary)"},children:x}),e.jsx("span",{style:{color:"#6b7280"},children:c.slice(h)}),l<t.length-1?`
`:""]},l)})})})]})},g=({headers:d,rows:t})=>e.jsx("div",{style:{overflowX:"auto",margin:"14px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13.5,minWidth:"max-content"},children:[e.jsx("thead",{children:e.jsx("tr",{children:d.map((c,l)=>e.jsx("th",{style:{textAlign:"left",padding:"8px 14px",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",whiteSpace:"nowrap",fontWeight:700},children:c},l))})}),e.jsx("tbody",{children:t.map((c,l)=>e.jsx("tr",{children:c.map((h,x)=>e.jsx("td",{style:{padding:"8px 14px",borderBottom:"1px solid var(--border-color)",color:x===0?"var(--text-primary)":"var(--text-secondary)",fontFamily:x===0?"monospace":"inherit"},children:h},x))},l))})]})}),a=({id:d,kicker:t,children:c})=>e.jsxs("div",{id:d,style:{margin:"56px 0 18px",scrollMarginTop:80},children:[t&&e.jsx("div",{style:{color:"var(--accent-lime)",fontSize:12,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:6},children:t}),e.jsx("h2",{style:{color:"var(--text-primary)",fontSize:"clamp(20px, 4vw, 28px)",fontWeight:800,fontFamily:"var(--font-syne)",margin:0,paddingBottom:12,borderBottom:"2px solid var(--accent-lime)"},children:c})]}),n=({children:d})=>e.jsx("h3",{style:{color:"var(--text-primary)",fontSize:"clamp(16px, 2.6vw, 19px)",fontWeight:700,margin:"28px 0 8px"},children:d}),i=({n:d,q:t,children:c})=>{const[l,h]=m.useState(!1);return e.jsxs("div",{style:{margin:"16px 0",border:"1px solid var(--border-color)",borderRadius:10,overflow:"hidden"},children:[e.jsxs("button",{onClick:()=>h(x=>!x),style:{width:"100%",background:l?"var(--bg-secondary)":"var(--bg-tertiary)",border:"none",cursor:"pointer",padding:"14px 16px",textAlign:"left",display:"flex",gap:10,alignItems:"flex-start"},children:[e.jsxs("span",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--accent-lime)",fontSize:14,flexShrink:0,lineHeight:1.5},children:[d,"."]}),e.jsx("span",{style:{color:"var(--text-primary)",fontSize:"clamp(14px, 2.2vw, 16px)",fontWeight:600,lineHeight:1.5,flex:1,textAlign:"left"},children:t}),e.jsx("span",{style:{color:l?"var(--accent-lime)":"var(--text-tertiary)",fontSize:18,flexShrink:0,lineHeight:1,marginTop:2,transition:"transform 0.2s",display:"inline-block",transform:l?"rotate(180deg)":"rotate(0deg)"},children:"⌄"})]}),l&&e.jsx("div",{style:{borderTop:"1px solid var(--border-color)",padding:"16px 16px 16px 42px",background:"var(--bg-secondary)"},children:c})]})},v=[{id:"ch1",label:"Глава 1 — Переменные и типы данных",n:""},{id:"ch2",label:"Глава 2 — Строки",n:""},{id:"ch3",label:"Глава 3 — Операторы и условия",n:""},{id:"ch4",label:"Глава 4 — Циклы",n:""},{id:"ch5",label:"Глава 5 — Коллекции",n:""},{id:"ch6",label:"Глава 6 — Функции",n:""},{id:"ch7",label:"Глава 7 — Comprehensions и встроенные функции",n:""},{id:"ch8",label:"Глава 8 — Обработка ошибок",n:""},{id:"ch9",label:"Глава 9 — Модули, файлы и основы ООП",n:""}];function N({onBack:d}){m.useEffect(()=>{window.scrollTo(0,0)},[]);const t=c=>{const l=document.getElementById(c);l&&l.scrollIntoView({behavior:"smooth"})};return e.jsxs("div",{style:{maxWidth:920,margin:"0 auto",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[e.jsx("button",{onClick:d,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28},children:"← Назад к ликбезам"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("div",{style:{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,padding:"6px 14px",color:"#60a5fa",fontSize:12,fontWeight:700,letterSpacing:1},children:"PYTHON"}),e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12,display:"flex",alignItems:"center"},children:"С нуля → уверенная база"})]}),e.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"Все основы Python в одном ликбезе"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:660},children:"Полный конспект по базовому Python: переменные и типы данных, строки, условия, циклы, коллекции, функции, comprehensions, обработка ошибок и основы ООП. С примерами кода и вопросами для самопроверки после каждой главы. Всё, что нужно, чтобы уверенно писать код и не бояться собеседования."}),e.jsx("div",{style:{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"},children:["9 глав","примеры кода","самопроверка","~60 мин"].map(c=>e.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:c},c))})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:24},children:[e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),e.jsx("div",{style:{display:"grid",gap:8},children:v.map(c=>e.jsxs("button",{onClick:()=>t(c.id),style:{background:"none",border:"none",textAlign:"left",padding:"6px 0",color:"var(--text-secondary)",fontSize:14,cursor:"pointer",display:"flex",justifyContent:"space-between",gap:12},onMouseEnter:l=>l.currentTarget.style.color="var(--accent-lime)",onMouseLeave:l=>l.currentTarget.style.color="var(--text-secondary)",children:[e.jsx("span",{children:c.label}),e.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:12,flexShrink:0},children:c.n})]},c.id))})]}),e.jsx(k,{}),e.jsx(w,{}),e.jsx(q,{}),e.jsx(T,{}),e.jsx(S,{}),e.jsx(z,{}),e.jsx(F,{}),e.jsx(P,{}),e.jsx(C,{}),e.jsxs("div",{style:{marginTop:60,padding:"24px",background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,textAlign:"center"},children:[e.jsx(r,{style:{fontSize:14},children:"Это конец ликбеза по основам Python. Возвращайся к нему, когда что-то подзабыл — и практикуйся! 🐍"}),e.jsx("button",{onClick:d,style:{marginTop:8,background:"var(--accent-lime)",border:"none",color:"#0a0a14",padding:"8px 20px",borderRadius:8,fontSize:13,fontWeight:700,cursor:"pointer"},children:"← Ко всем ликбезам"})]})]})}function k(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch1",kicker:"Глава 1",children:"Переменные и типы данных"}),e.jsxs(r,{children:[e.jsx(o,{children:"Переменная"})," — это имя, связанное со значением. В Python не нужно объявлять тип заранее: интерпретатор сам определяет его по значению (это называется ",e.jsx(o,{children:"динамическая типизация"}),"). Присваивание — знак ",e.jsx("code",{children:"="}),"."]}),e.jsx(s,{code:`x = 42            # int  — целое число
pi = 3.14         # float — вещественное
name = "Аня"      # str  — строка
is_active = True  # bool — True / False
nothing = None    # NoneType — «пустое» значение

print(type(x))    # <class 'int'>`}),e.jsx(n,{children:"Основные типы"}),e.jsx(g,{headers:["Тип","Назначение","Пример"],rows:[["int","Целые числа","5, -17, 1000"],["float","Дробные числа","3.14, -0.5"],["str","Строки (текст)",'"привет"'],["bool","Логический тип","True, False"],["list","Изменяемый список","[1, 2, 3]"],["tuple","Неизменяемый кортеж","(1, 2)"],["dict","Словарь ключ→значение",'{"a": 1}'],["set","Множество уникальных","{1, 2, 3}"],["None","Отсутствие значения","None"]]}),e.jsx(n,{children:"Преобразование типов"}),e.jsxs(r,{children:["Значения одного типа можно превращать в другой — это называется ",e.jsx(o,{children:"приведение типов"})," (casting)."]}),e.jsx(s,{code:`int("42")      # 42   строка → число
float("3.14")  # 3.14
str(100)       # "100"  число → строка
bool(0)        # False  (0, "", [], None → False)
bool(5)        # True

int("abc")     # ошибка ValueError!`}),e.jsxs(f,{children:["Функция ",e.jsx(j,{children:"input()"})," всегда возвращает ",e.jsx(o,{children:"строку"}),". Чтобы получить число, оберни её в ",e.jsx("code",{children:"int()"}),"или ",e.jsx("code",{children:"float()"}),": ",e.jsx("code",{children:'age = int(input("Возраст: "))'}),"."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Что такое динамическая типизация?",children:e.jsxs(r,{children:["Тип переменной определяется автоматически по присвоенному значению во время выполнения, а не задаётся заранее. Одна и та же переменная может в разные моменты хранить значения разных типов: ",e.jsx("code",{children:"x = 5"}),", затем ",e.jsx("code",{children:'x = "hi"'})," — валидно."]})}),e.jsx(i,{n:2,q:"Что вернёт bool([]) и почему?",children:e.jsxs(r,{children:[e.jsx(o,{children:"False"}),". Пустые коллекции (",e.jsx("code",{children:"[]"}),", ",e.jsx("code",{children:"{}"}),", ",e.jsx("code",{children:'""'}),"), число ",e.jsx("code",{children:"0"})," и ",e.jsx("code",{children:"None"})," в логическом контексте считаются «ложными» (falsy). Всё остальное — «истинно» (truthy)."]})}),e.jsx(i,{n:3,q:"В чём разница между None и 0?",children:e.jsxs(r,{children:[e.jsx("code",{children:"0"})," — это конкретное число типа ",e.jsx("code",{children:"int"}),". ",e.jsx("code",{children:"None"})," — специальное значение типа ",e.jsx("code",{children:"NoneType"}),", означающее «ничего / значение отсутствует». Они не равны: ",e.jsx("code",{children:"0 == None"})," → ",e.jsx("code",{children:"False"}),"."]})})]})}function w(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch2",kicker:"Глава 2",children:"Строки"}),e.jsxs(r,{children:[e.jsx(o,{children:"Строка"})," (str) — последовательность символов. Индексация начинается с нуля, поддерживаются срезы. Строки ",e.jsx(o,{children:"неизменяемы"}),": методы не меняют оригинал, а возвращают новую строку."]}),e.jsx(s,{code:`s = "Python"
len(s)      # 6   длина
s[0]        # 'P'  первый символ
s[-1]       # 'n'  последний символ
s[0:3]      # 'Pyt'  срез [start:stop]
s[::-1]     # 'nohtyP'  разворот`}),e.jsx(n,{children:"Полезные методы"}),e.jsx(s,{code:`s.upper()            # 'PYTHON'
s.lower()            # 'python'
"  hi  ".strip()     # 'hi'   убрать пробелы по краям
s.replace("P", "J")  # 'Jython'
"a,b,c".split(",")   # ['a', 'b', 'c']
"-".join(["a", "b"]) # 'a-b'
s.startswith("Py")   # True
"cat".find("a")      # 1  индекс подстроки (-1 если нет)`}),e.jsx(n,{children:"f-строки — форматирование"}),e.jsxs(r,{children:["Самый удобный способ вставлять значения в текст — f-строки (буква ",e.jsx("code",{children:"f"})," перед кавычкой)."]}),e.jsx(s,{code:`age = 25
name = "Аня"
print(f"Меня зовут {name}, мне {age} лет")
print(f"Через год будет {age + 1}")     # можно выражения
print(f"{3.14159:.2f}")                 # '3.14'  округление`}),e.jsxs(p,{children:["Строку нельзя изменить по индексу: ",e.jsx("code",{children:'s[0] = "J"'})," вызовет ошибку. Нужно создать новую строку, например через ",e.jsx("code",{children:"replace()"})," или срезы."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Что выведет 'Python'[1:4]?",children:e.jsxs(r,{children:[e.jsx("code",{children:"'yth'"}),". Срез ",e.jsx("code",{children:"[1:4]"})," берёт символы с индекса 1 по 3 включительно (правая граница не входит)."]})}),e.jsx(i,{n:2,q:"Что значит «строки неизменяемы»?",children:e.jsxs(r,{children:["После создания строку нельзя изменить на месте. Любой метод (",e.jsx("code",{children:"upper"}),", ",e.jsx("code",{children:"replace"}),"…) возвращает ",e.jsx(o,{children:"новую"})," строку, а исходная остаётся прежней. Поэтому результат нужно присваивать: ",e.jsx("code",{children:"s = s.upper()"}),"."]})}),e.jsx(i,{n:3,q:"Как развернуть строку задом наперёд?",children:e.jsxs(r,{children:["Срезом с шагом -1: ",e.jsx("code",{children:"s[::-1]"}),". Например, ",e.jsx("code",{children:'"abc"[::-1]'})," → ",e.jsx("code",{children:'"cba"'}),"."]})})]})}function q(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch3",kicker:"Глава 3",children:"Операторы и условия"}),e.jsx(n,{children:"Арифметика"}),e.jsx(s,{code:`7 + 3    # 10   сложение
7 - 3    # 4    вычитание
7 * 3    # 21   умножение
7 / 3    # 2.333...  деление (всегда float)
7 // 3   # 2    целочисленное деление
7 % 3    # 1    остаток от деления
2 ** 10  # 1024  возведение в степень`}),e.jsx(n,{children:"Сравнение и логика"}),e.jsx(s,{code:`5 > 3      # True
5 == 5     # True   равно
5 != 4     # True   не равно
5 >= 5     # True

True and False  # False   И
True or False   # True    ИЛИ
not True        # False   НЕ`}),e.jsx(n,{children:"Условный оператор if / elif / else"}),e.jsx(s,{code:`age = 18
if age < 18:
    print("Несовершеннолетний")
elif age == 18:
    print("Ровно 18")
else:
    print("Взрослый")`}),e.jsxs(r,{children:["Блоки кода в Python задаются ",e.jsx(o,{children:"отступами"})," (обычно 4 пробела), а не фигурными скобками. Есть краткая запись — ",e.jsx(o,{children:"тернарный оператор"}),":"]}),e.jsx(s,{code:'status = "можно" if age >= 18 else "нельзя"'}),e.jsxs(p,{children:["Неправильный отступ вызывает ошибку ",e.jsx("code",{children:"IndentationError"}),". Не смешивай пробелы и табы — выбери что-то одно (обычно 4 пробела)."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Чем отличается / от //?",children:e.jsxs(r,{children:[e.jsx("code",{children:"/"})," — обычное деление, всегда возвращает ",e.jsx("code",{children:"float"})," (",e.jsx("code",{children:"7 / 2 == 3.5"}),"). ",e.jsx("code",{children:"//"})," — целочисленное деление, отбрасывает дробную часть (",e.jsx("code",{children:"7 // 2 == 3"}),")."]})}),e.jsx(i,{n:2,q:"Что выведет: x = 5; print('B' if x > 3 else 'C')?",children:e.jsxs(r,{children:[e.jsx("code",{children:"B"}),". Условие ",e.jsx("code",{children:"x > 3"})," истинно, поэтому тернарный оператор возвращает значение до ",e.jsx("code",{children:"if"}),"."]})}),e.jsx(i,{n:3,q:"Как задаются блоки кода в Python?",children:e.jsxs(r,{children:["Отступами (обычно 4 пробела). Всё, что с одинаковым отступом под ",e.jsx("code",{children:"if"}),", ",e.jsx("code",{children:"for"}),", ",e.jsx("code",{children:"def"})," и т.п. — относится к этому блоку. Фигурные скобки, как в других языках, не используются."]})})]})}function T(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch4",kicker:"Глава 4",children:"Циклы"}),e.jsx(n,{children:"Цикл for — перебор последовательности"}),e.jsx(s,{code:`for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for fruit in ["яблоко", "груша"]:
    print(fruit)

# range(start, stop, step)
for i in range(2, 11, 2):  # 2, 4, 6, 8, 10
    print(i)`}),e.jsx(n,{children:"Цикл while — пока условие истинно"}),e.jsx(s,{code:`n = 5
while n > 0:
    print(n)
    n -= 1    # без этого — бесконечный цикл!`}),e.jsx(n,{children:"break и continue"}),e.jsx(u,{items:[e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"break"})," — немедленно прерывает цикл целиком"]}),e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"continue"})," — пропускает текущую итерацию и переходит к следующей"]})]}),e.jsx(s,{code:`for i in range(10):
    if i == 5:
        break        # выходим на i == 5
    if i % 2 == 0:
        continue     # пропускаем чётные
    print(i)         # выведет 1, 3`}),e.jsxs(p,{children:["В цикле ",e.jsx("code",{children:"while"})," следи, чтобы условие когда-нибудь стало ложным (например, меняй счётчик). Иначе получишь ",e.jsx(o,{children:"бесконечный цикл"}),", и программа зависнет."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Что выведет for i in range(1, 6, 2)?",children:e.jsxs(r,{children:[e.jsx("code",{children:"1 3 5"}),". ",e.jsx("code",{children:"range(start, stop, step)"}),": старт 1, стоп 6 (не включается), шаг 2."]})}),e.jsx(i,{n:2,q:"В чём разница между break и continue?",children:e.jsxs(r,{children:[e.jsx("code",{children:"break"})," полностью выходит из цикла. ",e.jsx("code",{children:"continue"})," прекращает только текущую итерацию и переходит к следующей, не выходя из цикла."]})}),e.jsx(i,{n:3,q:"Когда выбирать while, а когда for?",children:e.jsxs(r,{children:[e.jsx("code",{children:"for"})," — когда известно, по чему итерировать (список, диапазон, строка). ",e.jsx("code",{children:"while"})," — когда цикл должен работать, пока выполняется условие, а число итераций заранее неизвестно."]})})]})}function S(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch5",kicker:"Глава 5",children:"Коллекции"}),e.jsx(n,{children:"Список (list) — упорядоченный, изменяемый"}),e.jsx(s,{code:`nums = [3, 1, 2]
nums.append(4)      # [3, 1, 2, 4]  добавить в конец
nums.insert(0, 0)   # [0, 3, 1, 2, 4]  вставить по индексу
nums.remove(1)      # удалить первое вхождение значения 1
nums.pop()          # удалить и вернуть последний
nums.sort()         # отсортировать на месте
2 in nums           # True   проверка вхождения
nums[1:3]           # срез, как у строк`}),e.jsx(n,{children:"Кортеж (tuple) — упорядоченный, неизменяемый"}),e.jsx(s,{code:`point = (10, 20)
x, y = point        # распаковка: x=10, y=20
point[0]            # 10
# point[0] = 5      # ошибка! tuple менять нельзя`}),e.jsx(n,{children:"Словарь (dict) — пары ключ → значение"}),e.jsx(s,{code:`user = {"name": "Аня", "age": 25}
user["name"]            # 'Аня'
user["city"] = "Москва" # добавить ключ
user.get("phone", "—")  # безопасно: '—' если ключа нет
for key, value in user.items():
    print(key, value)`}),e.jsx(n,{children:"Множество (set) — уникальные элементы"}),e.jsx(s,{code:`a = {1, 2, 3}
b = {2, 3, 4}
a | b   # {1,2,3,4}  объединение
a & b   # {2,3}      пересечение
a - b   # {1}        разность
set([1,1,2,2,3])     # {1,2,3}  убрать дубликаты`}),e.jsx(g,{headers:["Коллекция","Порядок","Изменяемая","Дубликаты"],rows:[["list","да","да","да"],["tuple","да","нет","да"],["dict","да*","да","ключи — нет"],["set","нет","да","нет"]]}),e.jsx(r,{style:{fontSize:12.5,color:"var(--text-tertiary)"},children:"* начиная с Python 3.7 словарь сохраняет порядок вставки."}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Чем список отличается от кортежа?",children:e.jsxs(r,{children:["Список (",e.jsx("code",{children:"list"}),") изменяемый — можно добавлять, удалять, менять элементы. Кортеж (",e.jsx("code",{children:"tuple"}),") неизменяемый. Кортежи чуть быстрее и подходят, когда данные не должны меняться (например, координаты)."]})}),e.jsx(i,{n:2,q:"Как безопасно получить значение из словаря, если ключа может не быть?",children:e.jsxs(r,{children:["Методом ",e.jsx("code",{children:"get"}),": ",e.jsx("code",{children:'d.get("key", default)'}),". Он вернёт значение по ключу или ",e.jsx("code",{children:"default"})," (по умолчанию ",e.jsx("code",{children:"None"}),"), не вызывая ",e.jsx("code",{children:"KeyError"}),", в отличие от ",e.jsx("code",{children:'d["key"]'}),"."]})}),e.jsx(i,{n:3,q:"Как быстро убрать дубликаты из списка?",children:e.jsxs(r,{children:["Превратить его в множество: ",e.jsx("code",{children:"set(lst)"}),". При необходимости вернуть список — ",e.jsx("code",{children:"list(set(lst))"})," (но порядок при этом может потеряться)."]})})]})}function z(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch6",kicker:"Глава 6",children:"Функции"}),e.jsxs(r,{children:[e.jsx(o,{children:"Функция"})," — именованный блок кода, который можно вызывать много раз. Объявляется через ",e.jsx("code",{children:"def"}),", возвращает результат через ",e.jsx("code",{children:"return"}),"."]}),e.jsx(s,{code:`def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

greet("Аня")                # 'Привет, Аня!'
greet("Ваня", "Здравствуй") # 'Здравствуй, Ваня!'`}),e.jsxs(r,{children:[e.jsx("code",{children:'greeting="Привет"'})," — ",e.jsx(o,{children:"параметр по умолчанию"}),": если аргумент не передан, используется это значение."]}),e.jsx(n,{children:"Несколько возвращаемых значений"}),e.jsx(s,{code:`def min_max(nums):
    return min(nums), max(nums)   # вернётся кортеж

low, high = min_max([3, 7, 1])   # low=1, high=7`}),e.jsx(n,{children:"*args и **kwargs"}),e.jsx(r,{children:"Позволяют принимать произвольное число аргументов."}),e.jsx(s,{code:`def total(*args):        # args — кортеж всех позиционных
    return sum(args)
total(1, 2, 3)           # 6

def info(**kwargs):      # kwargs — словарь именованных
    for k, v in kwargs.items():
        print(k, v)
info(name="Аня", age=25)`}),e.jsx(n,{children:"Лямбда — короткая функция"}),e.jsx(s,{code:`square = lambda x: x ** 2
square(5)   # 25

# часто используется как аргумент, например в sorted:
sorted(["bbb", "a", "cc"], key=lambda s: len(s))
# ['a', 'cc', 'bbb']`}),e.jsxs(f,{children:[e.jsx(o,{children:"Область видимости:"})," переменные, созданные внутри функции, доступны только внутри неё (локальные). Функция может читать внешние переменные, но чтобы изменить глобальную — нужен ",e.jsx("code",{children:"global"}),"."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Что делает return? Что будет, если его нет?",children:e.jsxs(r,{children:[e.jsx("code",{children:"return"})," возвращает значение из функции и завершает её. Если ",e.jsx("code",{children:"return"})," нет (или он без значения), функция возвращает ",e.jsx("code",{children:"None"}),"."]})}),e.jsx(i,{n:2,q:"Зачем нужны *args и **kwargs?",children:e.jsxs(r,{children:["Чтобы функция принимала произвольное количество аргументов. ",e.jsx("code",{children:"*args"})," собирает лишние позиционные аргументы в кортеж, ",e.jsx("code",{children:"**kwargs"})," — именованные в словарь."]})}),e.jsx(i,{n:3,q:"Что такое лямбда-функция?",children:e.jsxs(r,{children:["Короткая анонимная функция из одного выражения: ",e.jsx("code",{children:"lambda x: x * 2"}),". Удобна как разовый аргумент, например в ",e.jsx("code",{children:"sorted"}),", ",e.jsx("code",{children:"map"}),", ",e.jsx("code",{children:"filter"}),". Для сложной логики лучше обычная ",e.jsx("code",{children:"def"}),"."]})})]})}function F(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch7",kicker:"Глава 7",children:"Comprehensions и встроенные функции"}),e.jsx(n,{children:"List comprehension"}),e.jsxs(r,{children:["Компактный способ создать список из другого итерируемого объекта — вместо цикла с ",e.jsx("code",{children:"append"}),"."]}),e.jsx(s,{code:`squares = [x**2 for x in range(5)]        # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# аналог через обычный цикл:
squares = []
for x in range(5):
    squares.append(x**2)`}),e.jsx(n,{children:"Dict и set comprehension"}),e.jsx(s,{code:`{x: x**2 for x in range(4)}   # {0:0, 1:1, 2:4, 3:9}
{x % 3 for x in range(10)}    # {0, 1, 2}  множество`}),e.jsx(n,{children:"Полезные встроенные функции"}),e.jsx(s,{code:`len([1,2,3])            # 3
sum([1,2,3])            # 6
min([3,1,2]), max([3,1,2])   # 1, 3
sorted([3,1,2])         # [1, 2, 3]
abs(-5)                 # 5
round(3.567, 1)         # 3.6

list(enumerate(["a","b"]))   # [(0,'a'), (1,'b')]
list(zip([1,2], ["a","b"]))  # [(1,'a'), (2,'b')]`}),e.jsx(n,{children:"map и filter"}),e.jsx(s,{code:`nums = [1, 2, 3, 4]
list(map(lambda x: x*2, nums))          # [2, 4, 6, 8]
list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]

# то же через comprehension (обычно читаемее):
[x*2 for x in nums]
[x for x in nums if x % 2 == 0]`}),e.jsx(n,{children:"enumerate и zip"}),e.jsx(s,{code:`for i, fruit in enumerate(["яблоко", "груша"]):
    print(i, fruit)     # 0 яблоко / 1 груша

names = ["Аня", "Ваня"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(name, age)`}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Что вернёт [x*2 for x in [1,2,3]]?",children:e.jsxs(r,{children:[e.jsx("code",{children:"[2, 4, 6]"}),". List comprehension применяет ",e.jsx("code",{children:"x*2"})," к каждому элементу списка."]})}),e.jsx(i,{n:2,q:"Зачем нужен enumerate?",children:e.jsxs(r,{children:["Чтобы в цикле получать сразу и индекс, и элемент: ",e.jsx("code",{children:"for i, item in enumerate(lst)"}),". Это чище, чем вручную вести счётчик или обращаться по ",e.jsx("code",{children:"lst[i]"}),"."]})}),e.jsx(i,{n:3,q:"Что делает zip?",children:e.jsxs(r,{children:["«Склеивает» несколько последовательностей поэлементно в пары (кортежи). ",e.jsx("code",{children:"zip([1,2],[3,4])"})," → ",e.jsx("code",{children:"(1,3), (2,4)"}),". Останавливается по самой короткой из них."]})})]})}function P(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch8",kicker:"Глава 8",children:"Обработка ошибок"}),e.jsxs(r,{children:["Когда во время выполнения что-то идёт не так, Python «выбрасывает» ",e.jsx(o,{children:"исключение"})," (exception) и программа падает. Чтобы это перехватить и обработать, используют ",e.jsx("code",{children:"try / except"}),"."]}),e.jsx(s,{code:`try:
    x = int(input("Число: "))
    result = 10 / x
    print(result)
except ValueError:
    print("Это не число!")
except ZeroDivisionError:
    print("На ноль делить нельзя!")
else:
    print("Всё прошло без ошибок")
finally:
    print("Этот блок выполнится всегда")`}),e.jsx(u,{items:[e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"try"})," — код, который может вызвать ошибку"]}),e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"except"})," — что делать при конкретной ошибке"]}),e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"else"})," — выполнится, если ошибок не было"]}),e.jsxs(e.Fragment,{children:[e.jsx(j,{children:"finally"})," — выполнится в любом случае (даже при ошибке)"]})]}),e.jsx(n,{children:"Частые исключения"}),e.jsx(g,{headers:["Исключение","Когда возникает"],rows:[["ValueError",'неверное значение: int("abc")'],["TypeError","операция над несовместимыми типами"],["ZeroDivisionError","деление на ноль"],["KeyError","нет ключа в словаре"],["IndexError","индекс за границей списка"],["FileNotFoundError","файл не найден"]]}),e.jsx(n,{children:"Своя ошибка через raise"}),e.jsx(s,{code:`def set_age(age):
    if age < 0:
        raise ValueError("Возраст не может быть отрицательным")
    return age`}),e.jsxs(p,{children:["Не пиши «голый» ",e.jsx("code",{children:"except:"})," без указания типа — он ловит вообще всё, включая опечатки, и прячет реальные ошибки. Указывай конкретный класс исключения."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Чем отличаются блоки else и finally в try?",children:e.jsxs(r,{children:[e.jsx("code",{children:"else"})," выполняется только если в ",e.jsx("code",{children:"try"})," не было ошибок. ",e.jsx("code",{children:"finally"})," выполняется ",e.jsx(o,{children:"всегда"})," — и при успехе, и при ошибке (обычно для очистки: закрыть файл, соединение)."]})}),e.jsx(i,{n:2,q:"Что делает raise?",children:e.jsxs(r,{children:["Принудительно выбрасывает исключение. Используется для проверки условий: если данные некорректны, функция сама «сигналит» об ошибке через ",e.jsx("code",{children:"raise ValueError(...)"}),"."]})}),e.jsx(i,{n:3,q:"Почему плохо писать except без типа?",children:e.jsx(r,{children:"Такой блок перехватывает абсолютно все исключения, включая случайные баги и опечатки в коде. Это маскирует реальные проблемы и усложняет отладку. Нужно ловить конкретные типы."})})]})}function C(){return e.jsxs("section",{children:[e.jsx(a,{id:"ch9",kicker:"Глава 9",children:"Модули, файлы и основы ООП"}),e.jsx(n,{children:"Импорт модулей"}),e.jsx(r,{children:"Модуль — это файл с кодом, который можно переиспользовать. Стандартная библиотека Python огромна."}),e.jsx(s,{code:`import math
math.sqrt(16)        # 4.0
math.pi              # 3.14159...

from random import randint
randint(1, 6)        # случайное число 1..6

from datetime import date
date.today()         # текущая дата`}),e.jsx(n,{children:"Работа с файлами"}),e.jsxs(r,{children:["Конструкция ",e.jsx("code",{children:"with"})," автоматически закрывает файл, даже если возникла ошибка."]}),e.jsx(s,{code:`# запись
with open("file.txt", "w", encoding="utf-8") as f:
    f.write("Привет\\n")

# чтение
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()          # весь файл строкой
    # или построчно:
    for line in f:
        print(line.strip())`}),e.jsx(g,{headers:["Режим","Значение"],rows:[['"r"',"чтение (по умолчанию)"],['"w"',"запись (перезаписывает файл)"],['"a"',"дозапись в конец"],['"r+"',"чтение и запись"]]}),e.jsx(n,{children:"Основы ООП: классы и объекты"}),e.jsxs(r,{children:[e.jsx(o,{children:"Класс"})," — шаблон, описывающий данные (атрибуты) и поведение (методы). ",e.jsx(o,{children:"Объект"})," — конкретный экземпляр класса. Метод ",e.jsx("code",{children:"__init__"})," — конструктор, вызывается при создании объекта; ",e.jsx("code",{children:"self"})," — сам объект."]}),e.jsx(s,{code:`class Dog:
    def __init__(self, name, age):
        self.name = name      # атрибуты
        self.age = age

    def bark(self):           # метод
        return f"{self.name} говорит: Гав!"

rex = Dog("Рекс", 3)          # создаём объект
print(rex.name)               # 'Рекс'
print(rex.bark())             # 'Рекс говорит: Гав!'`}),e.jsxs(f,{children:["Три кита ООП: ",e.jsx(o,{children:"инкапсуляция"})," (данные и методы вместе), ",e.jsx(o,{children:"наследование"})," (класс-потомок берёт поведение родителя), ",e.jsx(o,{children:"полиморфизм"})," (один и тот же метод по-разному работает у разных классов). Это уже следующий уровень — но ",e.jsx("code",{children:"__init__"}),", ",e.jsx("code",{children:"self"})," и методы стоит понимать с самого начала."]}),e.jsx(n,{children:"Вопросы для самопроверки"}),e.jsx(i,{n:1,q:"Зачем использовать with при работе с файлами?",children:e.jsxs(r,{children:[e.jsx("code",{children:"with"})," — контекстный менеджер: он гарантированно закрывает файл после блока, даже если внутри произошла ошибка. Без него легко забыть ",e.jsx("code",{children:"f.close()"})," и оставить файл открытым."]})}),e.jsx(i,{n:2,q:"Что такое self в методе класса?",children:e.jsxs(r,{children:["Это ссылка на сам объект, у которого вызван метод. Через ",e.jsx("code",{children:"self"})," метод обращается к атрибутам и другим методам этого экземпляра. Python передаёт его автоматически при вызове ",e.jsx("code",{children:"obj.method()"}),"."]})}),e.jsx(i,{n:3,q:"Что делает метод __init__?",children:e.jsxs(r,{children:["Это конструктор — он вызывается автоматически при создании объекта (",e.jsx("code",{children:'Dog("Рекс", 3)'}),") и обычно задаёт начальные атрибуты через ",e.jsx("code",{children:"self"}),"."]})})]})}export{N as default};
