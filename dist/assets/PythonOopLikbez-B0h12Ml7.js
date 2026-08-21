import{r as y,j as e}from"./index-BlnQ7002.js";import{S as f}from"./SelfCheck-sPhmhXCP.js";const r=({code:n,lang:c="python"})=>{const i="#",a=n.split(`
`);return e.jsxs("div",{className:"theory-code-block",children:[e.jsx("div",{className:"theory-code-label",children:c}),e.jsx("pre",{className:"theory-code",children:e.jsx("code",{children:a.map((_,o)=>{const p=_.indexOf(i);if(p===-1)return e.jsxs("span",{children:[_,o<a.length-1?`
`:""]},o);const x=_.slice(0,p),m=(x.match(/'/g)||[]).length,g=(x.match(/"/g)||[]).length;return m%2!==0||g%2!==0?e.jsxs("span",{children:[_,o<a.length-1?`
`:""]},o):e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--text-primary)"},children:x}),e.jsx("span",{style:{color:"#6b7280"},children:_.slice(p)}),o<a.length-1?`
`:""]},o)})})})]})},h=({children:n})=>e.jsxs("div",{style:{background:"rgba(32,190,255,0.05)",border:"1px solid rgba(32,190,255,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),n]}),j=({children:n})=>e.jsxs("div",{style:{background:"rgba(255,100,100,0.07)",border:"1px solid rgba(255,100,100,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"#f87171",fontWeight:700,marginRight:6},children:"⚠️"}),n]}),d=({id:n,children:c})=>e.jsx("h2",{id:n,style:{color:"var(--text-primary)",fontSize:"clamp(17px, 3vw, 21px)",fontWeight:700,margin:"44px 0 14px",paddingTop:8,borderBottom:"1px solid var(--border-color)",paddingBottom:10,scrollMarginTop:80},children:c}),t=({id:n,children:c})=>e.jsx("h3",{id:n,style:{color:"var(--text-primary)",fontSize:"clamp(13px, 2vw, 16px)",fontWeight:600,margin:"26px 0 10px",scrollMarginTop:80},children:c}),s=({children:n,style:c})=>e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...c},children:n}),b=({items:n})=>e.jsx("ul",{style:{paddingLeft:20,margin:"10px 0"},children:n.map((c,i)=>e.jsx("li",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,marginBottom:4},children:c},i))}),v=({headers:n=["Метод / приём","Что делает","Пример"],rows:c})=>e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:n.map((i,a)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:i},a))})}),e.jsx("tbody",{children:c.map(([i,a,_],o)=>e.jsxs("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:[e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",whiteSpace:"nowrap"},children:i}),e.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)"},children:a}),e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",fontSize:12,whiteSpace:"nowrap"},children:_})]},o))})]})}),u=({headers:n,rows:c})=>e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:n.map((i,a)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:a===0?"var(--text-secondary)":"var(--accent-lime)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:i},a))})}),e.jsx("tbody",{children:c.map((i,a)=>e.jsx("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:i.map((_,o)=>e.jsx("td",{style:{padding:"7px 14px",color:o===0?"var(--text-secondary)":"var(--text-primary)",fontWeight:o===0?600:400},children:_},o))},a))})]})}),k=({items:n})=>e.jsx("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"18px 22px",margin:"18px 0"},children:n.map((c,i)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderBottom:i<n.length-1?"1px solid var(--border-color)":"none"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontSize:14,marginTop:1},children:"☐"}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:13.5,lineHeight:1.7},children:c})]},i))}),P={easy:{bg:"rgba(34,197,94,0.1)",border:"rgba(34,197,94,0.3)",text:"#4ade80",label:"Лёгкая"},medium:{bg:"rgba(234,179,8,0.1)",border:"rgba(234,179,8,0.3)",text:"#facc15",label:"Средняя"},hard:{bg:"rgba(239,68,68,0.1)",border:"rgba(239,68,68,0.3)",text:"#f87171",label:"Сложная"}};function l({n,difficulty:c,title:i,children:a,solution:_}){const[o,p]=y.useState(!1),x=P[c];return e.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:10,padding:"18px 20px",margin:"14px 0",background:"var(--bg-secondary)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:10,marginBottom:10,flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--text-tertiary)",fontSize:13},children:["#",n]}),e.jsx("span",{style:{background:x.bg,border:`1px solid ${x.border}`,color:x.text,borderRadius:6,padding:"2px 10px",fontSize:11,fontWeight:700},children:x.label}),e.jsx("span",{style:{color:"var(--text-primary)",fontWeight:700,fontSize:14.5},children:i})]}),e.jsx("div",{style:{fontSize:13.5,lineHeight:1.75},children:a}),e.jsx("button",{onClick:()=>p(m=>!m),style:{marginTop:10,background:"transparent",border:"1px solid var(--border-color)",color:o?"var(--text-tertiary)":"var(--accent-lime)",borderRadius:6,padding:"6px 14px",fontSize:12.5,fontWeight:600,cursor:"pointer"},children:o?"Скрыть решение":"Показать решение →"}),o&&e.jsx("div",{style:{marginTop:12},children:_})]})}const S=[{id:"intro",label:"1. Что такое ООП и зачем оно нужно"},{id:"classes",label:"2. Классы и объекты — база"},{id:"init",label:"3. __init__ и атрибуты"},{id:"self",label:"4. self — что это на самом деле"},{id:"methods",label:"5. Методы: instance, class, static"},{id:"attrs",label:"6. Атрибуты класса vs экземпляра"},{id:"encapsulation",label:"7. Инкапсуляция: public / protected / private"},{id:"property",label:"8. @property — getter и setter"},{id:"inheritance",label:"9. Наследование"},{id:"super",label:"10. super() и как это работает"},{id:"mro",label:"11. Множественное наследование и MRO"},{id:"polymorphism",label:"12. Полиморфизм"},{id:"duck",label:"13. Duck typing"},{id:"abc",label:"14. Абстрактные классы (ABC)"},{id:"dunder",label:"15. Dunder-методы"},{id:"slots",label:"16. __slots__"},{id:"dataclass",label:"17. @dataclass"},{id:"metaclasses",label:"18. Метаклассы"},{id:"protocol",label:"19. Protocol и структурная типизация"},{id:"composition",label:"20. Композиция vs наследование"},{id:"solid",label:"21. Принципы SOLID"},{id:"patterns",label:"22. Базовые паттерны проектирования"},{id:"checklist",label:'Чек-лист "знаю ли я ООП"'},{id:"practice",label:"Задачи для тренировки (30 шт.)"}];function q({onBack:n}){y.useEffect(()=>{window.scrollTo(0,0)},[]);const c=i=>{const a=document.getElementById(i);a&&a.scrollIntoView({behavior:"smooth"})};return e.jsxs("div",{style:{maxWidth:"100%",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[e.jsx("button",{onClick:n,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28},children:"Назад к ликбезам"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("div",{style:{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,padding:"6px 14px",color:"#60a5fa",fontSize:12,fontWeight:700,letterSpacing:1},children:"PYTHON"}),e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12,display:"flex",alignItems:"center"},children:"С нуля → Senior-собеседование"})]}),e.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"ООП в Python — полный ликбез"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"Всё от классов и объектов до метаклассов, SOLID и паттернов проектирования. Каждая тема — с примером кода и объяснением, почему это работает именно так."}),e.jsx("div",{style:{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"},children:["Python 3.10+","22 главы","~90 мин","30 задач для практики"].map(i=>e.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:i},i))})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:44},children:[e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",gap:"6px 24px"},children:S.map(i=>e.jsx("button",{onClick:()=>c(i.id),style:{background:"none",border:"none",textAlign:"left",padding:"4px 0",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",transition:"color 0.15s"},onMouseEnter:a=>a.target.style.color="var(--accent-lime)",onMouseLeave:a=>a.target.style.color="var(--text-secondary)",children:i.label},i.id))})]}),e.jsx(d,{id:"intro",children:"1. Что такое ООП и зачем оно нужно"}),e.jsxs(s,{children:[e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Объектно-ориентированное программирование"})," — способ организовать код, при котором сущности реального мира моделируются в виде ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"объектов"}),". У объекта есть состояние (данные — например, у собаки кличка и возраст) и поведение (действия — собака может лаять, бегать, есть)."]}),e.jsx(s,{children:"До ООП код писали процедурно: набор функций, работающих с общими данными. Проблема — когда программа растёт, непонятно, какие функции работают с какими данными, всё перемешивается. ООП решает это, склеивая данные и функции в один «контейнер» — объект."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,margin:"20px 0"},children:[{label:"Инкапсуляция",desc:"прячем внутренности объекта, наружу торчит только интерфейс"},{label:"Наследование",desc:"новые классы переиспользуют код старых"},{label:"Полиморфизм",desc:"один вызов работает по-разному в зависимости от типа объекта"},{label:"Абстракция",desc:"работаем с интерфейсами, не думая о деталях реализации"}].map(i=>e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:14},children:[e.jsx("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--accent-lime)",fontSize:14,marginBottom:6},children:i.label}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:i.desc})]},i.label))}),e.jsx(f,{questions:[{q:"Какую проблему процедурного кода решает ООП?",a:"В процедурном коде функции и данные существуют отдельно — с ростом программы непонятно, какие функции работают с какими данными. ООП склеивает данные и поведение в единый объект."},{q:"Назови четыре кита ООП.",a:"Инкапсуляция, наследование, полиморфизм, абстракция."}]}),e.jsx(d,{id:"classes",children:"2. Классы и объекты — база"}),e.jsxs(s,{children:[e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Класс"})," — это чертёж. ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Объект (экземпляр)"})," — конкретная вещь, сделанная по чертежу. Класс «Автомобиль» описывает, что у машины есть 4 колеса, двигатель, цвет; твой конкретный красный BMW — объект этого класса."]}),e.jsx(r,{code:`class Dog:
    pass  # пока пустой класс

# создаём объект (экземпляр)
my_dog = Dog()
print(my_dog)         # <__main__.Dog object at 0x7f...>
print(type(my_dog))   # <class '__main__.Dog'>`}),e.jsxs(s,{children:[e.jsx("code",{children:"Dog()"})," — вызов класса как функции создаёт экземпляр. Это называется ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"инстанцирование"}),"."]}),e.jsxs(h,{children:["В Python всё является объектом — числа, строки, функции, даже сами классы. У каждого есть тип (класс), от которого он произошёл: ",e.jsx("code",{children:"type(42)"})," → ",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:'type("hello")'})," → ",e.jsx("code",{children:"str"}),"."]}),e.jsx(d,{id:"init",children:"3. __init__ и атрибуты"}),e.jsxs(s,{children:["Класс без данных бесполезен. Нужно уметь класть в объект состояние — для этого специальный метод ",e.jsx("code",{children:"__init__"}),", конструктор."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

my_dog = Dog("Рекс", 3)
print(my_dog.name)  # Рекс
print(my_dog.age)   # 3`}),e.jsxs(s,{children:["Что произошло: вызвали ",e.jsx("code",{children:'Dog("Рекс", 3)'})," → Python создал пустой объект → автоматически вызвал ",e.jsx("code",{children:"__init__"}),", передав в него объект как ",e.jsx("code",{children:"self"})," и аргументы → внутри записали атрибуты ",e.jsx("code",{children:"name"})," и ",e.jsx("code",{children:"age"}),"."]}),e.jsxs(s,{children:[e.jsx("code",{children:"__init__"})," называется ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"dunder-методом"})," (от double underscore — двойное подчёркивание). Таких методов много, познакомимся дальше."]}),e.jsxs(j,{children:[e.jsx("code",{children:"__init__"})," — это не конструктор в полном смысле, а инициализатор. Настоящий конструктор — ",e.jsx("code",{children:"__new__"}),", но он нужен в редких случаях."]}),e.jsx(d,{id:"self",children:"4. self — что это на самом деле"}),e.jsxs(s,{children:[e.jsx("code",{children:"self"})," — ссылка на текущий объект. Когда делаешь ",e.jsx("code",{children:"my_dog.bark()"}),", Python под капотом превращает это в ",e.jsx("code",{children:"Dog.bark(my_dog)"}),". Первый аргумент — сам объект."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} говорит: гав!")

rex = Dog("Рекс")
rex.bark()      # Рекс говорит: гав!
Dog.bark(rex)   # то же самое — Рекс говорит: гав!`}),e.jsxs(s,{children:["Слово ",e.jsx("code",{children:"self"})," — это договорённость, а не ключевое слово. Можно написать иначе, но так не принято — все Python-разработчики ожидают увидеть ",e.jsx("code",{children:"self"}),"."]}),e.jsx(f,{questions:[{q:"Что на самом деле означает my_dog.bark()?",a:"Python преобразует это в Dog.bark(my_dog) — первым аргументом метода передаётся сам объект, на который ссылается self."},{q:"Является ли self ключевым словом Python?",a:"Нет, это лишь общепринятая договорённость. Можно назвать первый параметр иначе, но так делать не принято — весь код сообщества ожидает self."}]}),e.jsx(d,{id:"methods",children:"5. Методы: instance, class, static"}),e.jsx(t,{id:"methods-instance",children:"5.1 Instance methods (обычные)"}),e.jsxs(s,{children:["Работают с конкретным экземпляром, первый аргумент — ",e.jsx("code",{children:"self"}),"."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):  # instance method
        print(f"{self.name}: гав!")`}),e.jsx(t,{id:"methods-class",children:"5.2 Class methods"}),e.jsxs(s,{children:["Работают с классом, а не с экземпляром. Первый аргумент — ",e.jsx("code",{children:"cls"}),". Часто используются как альтернативный конструктор."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def puppy(cls, name):
        # альтернативный конструктор: щенок, возраст всегда 0
        return cls(name, age=0)

rex = Dog.puppy("Рекс")
print(rex.age)  # 0`}),e.jsxs(s,{children:["Зачем ",e.jsx("code",{children:"cls"})," вместо ",e.jsx("code",{children:"Dog"}),"? Чтобы при наследовании метод создавал объект правильного класса — с ",e.jsx("code",{children:"Dog(name, 0)"})," метод ",e.jsx("code",{children:"Puppy.puppy(...)"})," вернул бы ",e.jsx("code",{children:"Dog"}),", а не ",e.jsx("code",{children:"Puppy"}),"."]}),e.jsx(t,{id:"methods-static",children:"5.3 Static methods"}),e.jsx(s,{children:"Не работают ни с экземпляром, ни с классом — просто функция, живущая внутри класса ради логической группировки."}),e.jsx(r,{code:`class Dog:
    @staticmethod
    def is_valid_age(age):
        return 0 <= age <= 30

print(Dog.is_valid_age(5))    # True
print(Dog.is_valid_age(500))  # False`}),e.jsx(u,{headers:["Тип метода","Когда использовать"],rows:[["instance method","работаешь с данными конкретного объекта (в 90% случаев)"],["classmethod","альтернативный конструктор или работа с классом в целом"],["staticmethod","утилитарная функция, логически относящаяся к классу"]]}),e.jsx(d,{id:"attrs",children:"6. Атрибуты класса vs атрибуты экземпляра"}),e.jsx(s,{children:"Одна из тем, где новички регулярно наступают на грабли."}),e.jsx(r,{code:`class Dog:
    species = "Canis familiaris"  # атрибут КЛАССА (общий для всех)

    def __init__(self, name):
        self.name = name          # атрибут ЭКЗЕМПЛЯРА (у каждого свой)

rex = Dog("Рекс")
buddy = Dog("Бадди")
print(rex.species)    # Canis familiaris
print(buddy.species)  # Canis familiaris
print(Dog.species)    # Canis familiaris`}),e.jsx(t,{id:"attrs-mutable",children:"Грабли: мутабельные атрибуты класса"}),e.jsx(r,{code:`class Dog:
    tricks = []  # ОПАСНО!

    def __init__(self, name):
        self.name = name

    def learn_trick(self, trick):
        self.tricks.append(trick)  # изменяем список КЛАССА

rex = Dog("Рекс")
buddy = Dog("Бадди")
rex.learn_trick("сидеть")
print(buddy.tricks)  # ['сидеть'] — Бадди тоже "знает" трюк!`}),e.jsx(s,{children:"Правильно так:"}),e.jsx(r,{code:`class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []  # у каждого свой список`}),e.jsxs(j,{children:["Мутабельные значения (list, dict, set) на уровне класса — почти всегда баг. Держи их в ",e.jsx("code",{children:"__init__"}),"."]}),e.jsx(f,{questions:[{q:"Почему список tricks = [] на уровне класса опасен?",a:"Такой список один на весь класс — все экземпляры делят одну и ту же ссылку. Изменение через один объект (append) видно у всех остальных объектов. Мутабельные значения нужно создавать в __init__, чтобы у каждого экземпляра была своя копия."}]}),e.jsx(d,{id:"encapsulation",children:"7. Инкапсуляция: public / protected / private"}),e.jsx(s,{children:"Инкапсуляция — идея прятать внутренности объекта, чтобы снаружи с ним работали только через понятный интерфейс. В Python нет «настоящих» private/protected как в Java — есть соглашения."}),e.jsx(r,{code:`class Account:
    def __init__(self, balance):
        self.balance = balance      # public — можно трогать снаружи
        self._internal = "secret"   # protected — "не трогай без нужды"
        self.__pin = "1234"         # private — name mangling`}),e.jsx(u,{headers:["Обозначение","Смысл"],rows:[["public (name)","обычный атрибут, доступен всем"],["_protected (_name)","договорённость «снаружи класса не трогать», Python не запрещает"],["__private (__name)","включает name mangling — переименовывается в _ClassName__name"]]}),e.jsx(r,{code:`acc = Account(100)
print(acc.balance)         # 100 — ок
print(acc._internal)       # secret — работает, но так не принято
# print(acc.__pin)         # AttributeError!
print(acc._Account__pin)   # 1234 — mangling обходится, но зачем?`}),e.jsxs(h,{children:["Практика: используй ",e.jsx("code",{children:"_name"})," для внутренних вещей класса. ",e.jsx("code",{children:"__name"})," — редко, только если реально боишься коллизий имён в наследниках."]}),e.jsx(d,{id:"property",children:"8. @property — getter и setter по-питоновски"}),e.jsxs(s,{children:["В Java пишут ",e.jsx("code",{children:"getName()"}),"/",e.jsx("code",{children:"setName()"}),". В Python это неидиоматично — вместо этого ",e.jsx("code",{children:"@property"}),"."]}),e.jsxs(s,{children:["Задача: чтобы ",e.jsx("code",{children:"balance"})," нельзя было поставить в минус. Плохо — сделать ",e.jsx("code",{children:"self.balance"})," публичным (любой напишет ",e.jsx("code",{children:"acc.balance = -1000"}),"). Хорошо — обернуть в property:"]}),e.jsx(r,{code:`class Account:
    def __init__(self, balance):
        self._balance = balance  # реальные данные

    @property
    def balance(self):
        # getter
        return self._balance

    @balance.setter
    def balance(self, value):
        # setter с валидацией
        if value < 0:
            raise ValueError("Баланс не может быть отрицательным")
        self._balance = value

acc = Account(100)
print(acc.balance)   # 100 — вызов property, а не прямой доступ
acc.balance = 200    # вызов setter
# acc.balance = -1   # ValueError!`}),e.jsx(s,{children:"Снаружи выглядит как обычный атрибут, а внутри — полный контроль. Это очень питонический приём."}),e.jsx(s,{children:"Ещё частый паттерн — computed property (значение вычисляется на лету):"}),e.jsx(r,{code:`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

r = Rectangle(3, 4)
print(r.area)  # 12 — обращаемся как к атрибуту, но это метод`}),e.jsx(f,{questions:[{q:"Зачем нужен @property вместо публичного атрибута?",a:'Он позволяет добавить логику (например, валидацию) при чтении или записи "поля", не меняя внешний интерфейс использования класса — снаружи это по-прежнему выглядит как обычный атрибут.'},{q:"Что такое computed property?",a:"Property, значение которого вычисляется на лету при каждом обращении (например, area у прямоугольника), а не хранится как отдельный атрибут."}]}),e.jsx(d,{id:"inheritance",children:"9. Наследование"}),e.jsx(s,{children:"Наследование — создание нового класса на основе существующего. Новый класс получает всё поведение родителя и может что-то добавить или переопределить."}),e.jsx(r,{code:`class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} ест")

class Dog(Animal):  # Dog наследуется от Animal
    def bark(self):
        print(f"{self.name}: гав!")

rex = Dog("Рекс")
rex.eat()   # Рекс ест  — унаследовано от Animal
rex.bark()  # Рекс: гав! — своё`}),e.jsx(t,{id:"inheritance-override",children:"Переопределение (override)"}),e.jsx(r,{code:`class Animal:
    def speak(self):
        print("Какой-то звук")

class Dog(Animal):
    def speak(self):  # override
        print("Гав!")

class Cat(Animal):
    def speak(self):
        print("Мяу!")

for a in [Dog(), Cat(), Animal()]:
    a.speak()
# Гав!
# Мяу!
# Какой-то звук`}),e.jsx(s,{children:"Это уже полиморфизм в действии — разберём его в разделе 12."}),e.jsx(d,{id:"super",children:"10. super() и как это работает"}),e.jsxs(s,{children:["Иногда в наследнике нужно дополнить, а не полностью заменить логику родителя. Для этого — ",e.jsx("code",{children:"super()"}),"."]}),e.jsx(r,{code:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # вызываем __init__ родителя
        self.breed = breed

rex = Dog("Рекс", "лабрадор")
print(rex.name, rex.breed)  # Рекс лабрадор`}),e.jsxs(s,{children:[e.jsx("code",{children:"super()"})," возвращает специальный прокси-объект, позволяющий вызывать методы родителя."]}),e.jsxs(j,{children:["Если переопределяешь ",e.jsx("code",{children:"__init__"})," в наследнике, почти всегда нужно вызывать ",e.jsx("code",{children:"super().__init__(...)"}),", чтобы родитель успел проинициализировать своё состояние."]}),e.jsx(d,{id:"mro",children:"11. Множественное наследование и MRO"}),e.jsx(s,{children:"Python разрешает наследоваться сразу от нескольких классов:"}),e.jsx(r,{code:`class Swimmer:
    def swim(self):
        print("Плыву")

class Runner:
    def run(self):
        print("Бегу")

class Triathlete(Swimmer, Runner):
    pass

t = Triathlete()
t.swim()
t.run()`}),e.jsxs(s,{children:["Проблема: а что если два родителя определяют один и тот же метод? Кого вызывать? Здесь работает ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"MRO — Method Resolution Order"}),", порядок поиска метода. Алгоритм называется C3 linearization."]}),e.jsx(r,{code:`class A:
    def hello(self): print("A")

class B(A):
    def hello(self): print("B")

class C(A):
    def hello(self): print("C")

class D(B, C):
    pass

D().hello()  # B
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)`}),e.jsx(s,{children:"Python идёт по MRO слева направо и берёт первое совпадение: D → B → C → A → object."}),e.jsxs(h,{children:[e.jsx("strong",{children:"Diamond problem"})," (ромбовидное наследование) решается именно за счёт MRO — класс A встретится в цепочке только один раз. ",e.jsx("code",{children:"object"})," — базовый класс всех классов в Python, даже если родитель не указан явно."]}),e.jsx(f,{questions:[{q:"Что такое MRO и зачем оно нужно?",a:"Method Resolution Order — порядок, в котором Python ищет метод при множественном наследовании (алгоритм C3-линеаризации). Он решает diamond problem, гарантируя, что общий предок встретится в цепочке поиска только один раз."},{q:"Как посмотреть MRO класса?",a:"Через атрибут ClassName.__mro__ или функцию ClassName.mro()."}]}),e.jsx(d,{id:"polymorphism",children:"12. Полиморфизм"}),e.jsx(s,{children:"Полиморфизм — способность разных объектов реагировать на один и тот же вызов по-разному."}),e.jsx(r,{code:`class Shape:
    def area(self):
        raise NotImplementedError

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r ** 2

class Square(Shape):
    def __init__(self, side):
        self.side = side
    def area(self):
        return self.side ** 2

shapes = [Circle(5), Square(3)]
for s in shapes:
    print(s.area())  # каждая фигура считает свою площадь по-своему`}),e.jsxs(s,{children:["Пишем один и тот же код (",e.jsx("code",{children:"s.area()"}),"), но результат зависит от типа объекта. Это позволяет добавлять новые фигуры (треугольник, эллипс…), не меняя цикл."]}),e.jsx(d,{id:"duck",children:"13. Duck typing"}),e.jsx(s,{children:"Питоновский подход к полиморфизму: «если оно ходит как утка и крякает как утка — это утка». В отличие от Java, Python не проверяет тип при вызове метода — он просто пытается вызвать метод."}),e.jsx(r,{code:`class Duck:
    def quack(self):
        print("Кря!")

class Person:
    def quack(self):
        print("Я тоже могу крякнуть!")

def make_it_quack(thing):
    thing.quack()  # не важно, какого типа thing

make_it_quack(Duck())    # Кря!
make_it_quack(Person())  # Я тоже могу крякнуть!`}),e.jsx(s,{children:"Плюс: невероятная гибкость. Минус: ошибки типов ловятся только в рантайме — отсюда важность type hints и mypy."}),e.jsx(d,{id:"abc",children:"14. Абстрактные классы (ABC)"}),e.jsxs(s,{children:["Иногда нужно сказать: «этот класс нельзя инстанцировать напрямую, а наследники обязаны реализовать такие-то методы». Для этого — модуль ",e.jsx("code",{children:"abc"}),"."]}),e.jsx(r,{code:`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

    @abstractmethod
    def perimeter(self):
        ...

class Circle(Shape):
    def __init__(self, r):
        self.r = r
    def area(self):
        return 3.14 * self.r ** 2
    def perimeter(self):
        return 2 * 3.14 * self.r

# Shape()  # TypeError: Can't instantiate abstract class
c = Circle(5)
print(c.area())`}),e.jsxs(s,{children:["Если наследник забудет реализовать ",e.jsx("code",{children:"area"})," — Python не даст создать его экземпляр. Это контракт. Абстрактные классы полезны, когда есть общая логика для вынесения в базовый класс, и когда нужно обязать наследников реализовать конкретный интерфейс."]}),e.jsx(f,{questions:[{q:"Чем полиморфизм отличается от duck typing?",a:"Полиморфизм обычно опирается на общую иерархию классов (наследование от одного родителя), а duck typing вообще не требует общего предка — важно только наличие нужного метода у объекта, тип не проверяется явно."},{q:"Что произойдёт при попытке создать объект абстрактного класса напрямую?",a:"Python выбросит TypeError: Can't instantiate abstract class — до тех пор, пока не реализованы все методы, помеченные @abstractmethod."}]}),e.jsx(d,{id:"dunder",children:"15. Dunder-методы (magic methods)"}),e.jsx(s,{children:"Методы с двумя подчёркиваниями с обеих сторон. Позволяют интегрировать класс с языком: сравнение, арифметика, длина, итерация, вывод и так далее."}),e.jsx(t,{id:"dunder-str",children:"15.1 Строковое представление: __str__, __repr__"}),e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"          # для людей — print()

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"  # для разработчиков — REPL, отладка

p = Point(1, 2)
print(p)         # (1, 2)          — вызывает __str__
print(repr(p))   # Point(x=1, y=2) — вызывает __repr__`}),e.jsxs(h,{children:[e.jsx("code",{children:"__repr__"})," обязателен, ",e.jsx("code",{children:"__str__"})," опционален. Если ",e.jsx("code",{children:"__str__"})," не определён, ",e.jsx("code",{children:"print"})," использует ",e.jsx("code",{children:"__repr__"}),"."]}),e.jsx(t,{id:"dunder-eq",children:"15.2 Сравнение: __eq__, __lt__, __gt__..."}),e.jsx(r,{code:`class Money:
    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount < other.amount

a, b, c = Money(100), Money(100), Money(200)
print(a == b)  # True
print(a < c)   # True`}),e.jsxs(s,{children:["Декоратор ",e.jsx("code",{children:"@functools.total_ordering"})," — определяешь ",e.jsx("code",{children:"__eq__"})," и ",e.jsx("code",{children:"__lt__"}),", остальные (",e.jsx("code",{children:"<="}),", ",e.jsx("code",{children:">"}),", ",e.jsx("code",{children:">="}),") достроятся сами."]}),e.jsx(t,{id:"dunder-hash",children:"15.3 Хеш: __hash__"}),e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))  # 2`}),e.jsxs(j,{children:["Если переопределяешь ",e.jsx("code",{children:"__eq__"}),", обычно нужно переопределить и ",e.jsx("code",{children:"__hash__"}),", иначе объект станет unhashable."]}),e.jsx(t,{id:"dunder-arith",children:"15.4 Арифметика: __add__, __sub__, __mul__..."}),e.jsx(r,{code:`class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, k):
        return Vector(self.x * k, self.y * k)

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v = Vector(1, 2) + Vector(3, 4)
print(v)      # Vector(4, 6)
print(v * 2)  # Vector(8, 12)`}),e.jsx(t,{id:"dunder-collection",children:"15.5 Длина, итерация, индексация"}),e.jsx(r,{code:`class Playlist:
    def __init__(self, songs):
        self._songs = songs

    def __len__(self):
        return len(self._songs)

    def __getitem__(self, i):
        return self._songs[i]

    def __iter__(self):
        return iter(self._songs)

    def __contains__(self, song):
        return song in self._songs

p = Playlist(["a", "b", "c"])
print(len(p))     # 3
print(p[1])       # b
for song in p:    # a b c
    print(song)
print("b" in p)   # True`}),e.jsx(s,{children:"Всего несколько dunder-методов — и класс ведёт себя как встроенная коллекция."}),e.jsx(t,{id:"dunder-call",children:"15.6 Вызов объекта как функции: __call__"}),e.jsx(r,{code:`class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
print(double(5))  # 10 — объект ведёт себя как функция`}),e.jsxs(s,{children:["Полезно для стейтфулных «функций» — счётчиков, кешей, ML-моделей (",e.jsx("code",{children:"model(input)"}),")."]}),e.jsx(t,{id:"dunder-context",children:"15.7 Контекст-менеджеры: __enter__ / __exit__"}),e.jsx(r,{code:`class Timer:
    def __enter__(self):
        import time
        self.start = time.monotonic()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"Заняло {time.monotonic() - self.start:.2f}s")

with Timer():
    sum(range(10_000_000))
# Заняло 0.15s`}),e.jsx(v,{headers:["Категория","Методы",""],rows:[["Создание/уничтожение","__new__, __init__, __del__",""],["Строковое","__str__, __repr__, __format__, __bytes__",""],["Сравнение","__eq__, __ne__, __lt__, __le__, __gt__, __ge__",""],["Хеш и bool","__hash__, __bool__",""],["Арифметика","__add__, __radd__, __iadd__ и аналоги",""],["Коллекции","__len__, __getitem__, __setitem__, __iter__, __contains__",""],["Вызов","__call__",""],["Атрибутный доступ","__getattr__, __setattr__, __delattr__",""],["Контекст-менеджер","__enter__, __exit__",""],["Async","__aiter__, __anext__, __aenter__, __aexit__",""]]}),e.jsx(f,{questions:[{q:"В чём разница между __str__ и __repr__?",a:'__str__ — читаемое представление "для людей", вызывается print() и str(). __repr__ — техническое представление "для разработчиков" (отладка, REPL, коллекции). __repr__ обязателен, __str__ опционален — если его нет, используется __repr__.'},{q:"Что нужно сделать, чтобы объект можно было положить в set?",a:"Реализовать __hash__ (и обычно вместе с ним __eq__, чтобы объекты с одинаковым содержимым считались равными и не дублировались в множестве)."}]}),e.jsx(d,{id:"slots",children:"16. __slots__"}),e.jsxs(s,{children:["По умолчанию Python хранит атрибуты объекта в словаре ",e.jsx("code",{children:"__dict__"})," — гибко, но занимает память и медленнее. ",e.jsx("code",{children:"__slots__"})," — способ сказать: «у объекта могут быть только эти атрибуты, никакого __dict__»."]}),e.jsx(r,{code:`class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
p.x = 10       # ок
# p.z = 20     # AttributeError`}),e.jsx(u,{headers:["Плюсы","Минусы"],rows:[["меньше памяти (актуально для миллионов объектов)","нельзя добавлять атрибуты на лету"],["чуть быстрее доступ к атрибутам","нюансы с наследованием (наследник тоже должен иметь __slots__)"],["защита от опечаток в именах атрибутов","несовместимо с __dict__ и некоторыми библиотеками"]]}),e.jsx(d,{id:"dataclass",children:"17. @dataclass"}),e.jsxs(s,{children:["Написание классов вроде Point — рутина: конструктор, ",e.jsx("code",{children:"__eq__"}),", ",e.jsx("code",{children:"__repr__"}),". ",e.jsx("code",{children:"@dataclass"})," (модуль ",e.jsx("code",{children:"dataclasses"}),") генерирует это автоматически."]}),e.jsx(r,{code:`from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1)         # Point(x=1, y=2)   — __repr__ сгенерирован
print(p1 == p2)   # True              — __eq__ сгенерирован`}),e.jsx(s,{children:"Опции:"}),e.jsx(r,{code:`@dataclass(frozen=True, slots=True, kw_only=True)
class Point:
    x: int
    y: int`}),e.jsx(b,{items:[e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"frozen=True"})," — объект неизменяемый (immutable), можно класть в set/dict ключом"]}),e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"slots=True"})," — сразу с __slots__ (Python 3.10+)"]}),e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"kw_only=True"})," — только именованные аргументы"]})]}),e.jsxs(s,{children:["Значения по умолчанию для мутабельных типов — только через ",e.jsx("code",{children:"field(default_factory=list)"}),":"]}),e.jsx(r,{code:`from dataclasses import dataclass, field

@dataclass
class Team:
    name: str
    members: list = field(default_factory=list)`}),e.jsxs(j,{children:["Дефолтом писать ",e.jsx("code",{children:"members: list = []"})," нельзя — Python не даст. Это те же грабли с мутабельным атрибутом класса, что и в разделе 6."]}),e.jsx(d,{id:"metaclasses",children:"18. Метаклассы"}),e.jsxs(s,{children:["Класс — это тоже объект. А если объект, то у него есть свой класс. Класс класса — это метакласс. По умолчанию все классы наследуются от метакласса ",e.jsx("code",{children:"type"}),"."]}),e.jsx(r,{code:`class Foo:
    pass

print(type(Foo))       # <class 'type'>
print(type(Foo()))     # <class '__main__.Foo'>

# можно создать класс "вручную"
Foo = type("Foo", (), {"x": 42})
print(Foo.x)  # 42`}),e.jsxs(s,{children:["Метаклассы используют, когда нужно контролировать, ",e.jsx("em",{children:"как создаются классы"}),", а не объекты: ORM (SQLAlchemy, Django ORM) строят SQL-таблицы по описанию класса, регистрация плагинов, валидация структуры класса при определении."]}),e.jsx(r,{code:`class Meta(type):
    def __new__(mcs, name, bases, dct):
        # валидируем: все методы должны быть в snake_case
        for attr in dct:
            if callable(dct[attr]) and not attr.islower():
                raise TypeError(f"Метод {attr} должен быть в snake_case")
        return super().__new__(mcs, name, bases, dct)

class MyClass(metaclass=Meta):
    def valid_method(self): pass
    # def BadMethod(self): pass  # TypeError при определении класса!`}),e.jsxs(h,{children:[e.jsx("strong",{children:"Правило Тима Питерса:"})," «Метаклассы — глубокая магия, которой 99% пользователей не должны интересоваться. Если ты думаешь, что они тебе нужны — они тебе не нужны». Обычно можно обойтись классовыми декораторами или ",e.jsx("code",{children:"__init_subclass__"}),"."]}),e.jsx(d,{id:"protocol",children:"19. Protocol и структурная типизация"}),e.jsx(s,{children:"С Python 3.8 появились протоколы — способ описать интерфейс, которому объект должен соответствовать структурно, а не через наследование. Это формализация duck typing."}),e.jsx(r,{code:`from typing import Protocol

class Quackable(Protocol):
    def quack(self) -> None: ...

class Duck:
    def quack(self) -> None:
        print("Кря!")

class Person:
    def quack(self) -> None:
        print("Я тоже могу!")

def make_it_quack(x: Quackable) -> None:
    x.quack()

make_it_quack(Duck())    # ок, у Duck есть quack()
make_it_quack(Person())  # ок, у Person тоже есть quack()`}),e.jsxs(s,{children:["Ни Duck, ни Person не наследуются от Quackable, но type checker (mypy) проверит, что у них есть метод ",e.jsx("code",{children:"quack()"})," с нужной сигнатурой. Это гораздо более питонично, чем ABC с ",e.jsx("code",{children:"@abstractmethod"}),", когда речь про интерфейсы."]}),e.jsx(d,{id:"composition",children:"20. Композиция vs наследование"}),e.jsx(s,{children:"Наследование — сильная связь: наследник «знает» о родителе и ломается вместе с ним. Python-мир последние годы двигается в сторону композиции."}),e.jsx(r,{code:`# Наследование (is-a)
class Car(Engine):  # Car IS AN Engine — звучит странно, потому что это неправда
    ...

# Композиция (has-a)
class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS AN Engine — вот это уже логично

    def start(self):
        self.engine.start()`}),e.jsx(s,{children:"Наследование = «является». Композиция = «имеет»."}),e.jsx(h,{children:"Используй наследование, только если между классами реально отношение «is-a» (Dog is an Animal). Иначе — композиция."}),e.jsx(f,{questions:[{q:"Когда стоит выбирать композицию вместо наследования?",a:"Когда между классами нет отношения «является» (is-a), а есть отношение «имеет» (has-a). Например, Car не является Engine, но имеет Engine внутри себя — это композиция, а не наследование."}]}),e.jsx(d,{id:"solid",children:"21. Принципы SOLID"}),e.jsx(s,{children:"Пять принципов проектирования от Роберта Мартина (Uncle Bob). На собеседованиях спрашивают часто."}),e.jsx(t,{id:"solid-s",children:"S — Single Responsibility Principle (SRP)"}),e.jsx(s,{children:"Один класс — одна ответственность."}),e.jsx(r,{code:`# плохо: класс знает и про юзера, и про базу, и про email
class User:
    def save_to_db(self): ...
    def send_welcome_email(self): ...

# хорошо: разделяем
class User: ...
class UserRepository:
    def save(self, user): ...
class EmailService:
    def send_welcome(self, user): ...`}),e.jsx(t,{id:"solid-o",children:"O — Open/Closed Principle (OCP)"}),e.jsx(s,{children:"Классы должны быть открыты для расширения, но закрыты для модификации. Хотим добавить новый тип оплаты — не переписываем существующий код, а добавляем новый класс."}),e.jsx(r,{code:`# плохо
class PaymentProcessor:
    def process(self, kind, amount):
        if kind == "card":
            ...
        elif kind == "crypto":
            ...
        # чтобы добавить PayPal — правим существующий метод

# хорошо
class Payment(ABC):
    @abstractmethod
    def process(self, amount): ...

class CardPayment(Payment): ...
class CryptoPayment(Payment): ...
class PayPalPayment(Payment): ...  # добавили без изменения других классов`}),e.jsx(t,{id:"solid-l",children:"L — Liskov Substitution Principle (LSP)"}),e.jsx(s,{children:"Наследник должен уметь заменить родителя без сломов. Классический пример-антипаттерн — квадрат-прямоугольник:"}),e.jsx(r,{code:`class Rectangle:
    def __init__(self, w, h):
        self.w, self.h = w, h

    def set_width(self, w):
        self.w = w

class Square(Rectangle):
    def set_width(self, w):
        self.w = w
        self.h = w  # Square нарушает контракт: у Rectangle set_width не трогал height`}),e.jsx(s,{children:"Функция, работающая с Rectangle, может сломаться, если ей передать Square. Это нарушение LSP."}),e.jsx(t,{id:"solid-i",children:"I — Interface Segregation Principle (ISP)"}),e.jsx(s,{children:"Лучше много маленьких интерфейсов, чем один толстый."}),e.jsx(r,{code:`# плохо
class Worker(ABC):
    @abstractmethod
    def work(self): ...
    @abstractmethod
    def eat(self): ...

class Robot(Worker):
    def work(self): ...
    def eat(self): ...  # роботу не нужно есть, но обязан реализовать

# хорошо
class Workable(Protocol):
    def work(self): ...

class Eatable(Protocol):
    def eat(self): ...`}),e.jsx(t,{id:"solid-d",children:"D — Dependency Inversion Principle (DIP)"}),e.jsx(s,{children:"Зависимости должны идти к абстракциям, а не к конкретным классам."}),e.jsx(r,{code:`# плохо
class UserService:
    def __init__(self):
        self.db = PostgresDatabase()  # жёстко привязались к Postgres

# хорошо
class UserService:
    def __init__(self, db: Database):  # интерфейс/протокол
        self.db = db`}),e.jsx(s,{children:"Так UserService можно тестировать с in-memory базой, менять Postgres на MySQL и так далее."}),e.jsx(f,{questions:[{q:"Сформулируй Single Responsibility Principle своими словами.",a:"У каждого класса должна быть ровно одна причина для изменения — то есть одна зона ответственности. Если класс одновременно сохраняет данные в БД и отправляет письма, у него уже две причины меняться, и его стоит разделить."},{q:"В чём суть Liskov Substitution Principle на примере Rectangle/Square?",a:"Наследник должен вести себя совместимо с контрактом родителя. Square, меняющий и width, и height при вызове set_width, нарушает ожидания кода, написанного для Rectangle, — это и есть нарушение LSP."},{q:"Что даёт Dependency Inversion Principle на практике?",a:"Класс зависит от абстракции (интерфейса/протокола), а не от конкретной реализации — это позволяет подменять реализацию (например, базу данных) при тестировании или смене технологии, не переписывая сам класс."}]}),e.jsx(d,{id:"patterns",children:"22. Базовые паттерны проектирования"}),e.jsx(s,{children:"Без глубокого погружения — только карта, чтобы понимать, что упоминают в разговоре."}),e.jsx(t,{id:"pattern-singleton",children:"22.1 Singleton"}),e.jsx(s,{children:"Гарантирует, что объект класса существует только в единственном экземпляре."}),e.jsx(r,{code:`class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`}),e.jsx(s,{children:"В Python чаще делают проще — через модуль: он импортируется один раз, все переменные в нём фактически синглтон."}),e.jsx(t,{id:"pattern-factory",children:"22.2 Factory"}),e.jsx(s,{children:"Класс/функция, задача которой — создавать объекты нужного типа."}),e.jsx(r,{code:`class ShapeFactory:
    @staticmethod
    def create(kind, **kwargs):
        if kind == "circle":
            return Circle(**kwargs)
        elif kind == "square":
            return Square(**kwargs)
        raise ValueError(f"Unknown shape: {kind}")`}),e.jsx(t,{id:"pattern-strategy",children:"22.3 Strategy"}),e.jsx(s,{children:"Инкапсулируем поведение в отдельный класс и передаём в основной класс через композицию."}),e.jsx(r,{code:`class SortStrategy(Protocol):
    def sort(self, data): ...

class QuickSort:
    def sort(self, data): ...

class MergeSort:
    def sort(self, data): ...

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy

    def run(self, data):
        return self.strategy.sort(data)`}),e.jsx(t,{id:"pattern-observer",children:"22.4 Observer"}),e.jsx(s,{children:"Объекты подписываются на события другого объекта."}),e.jsx(r,{code:`class Publisher:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, fn):
        self.subscribers.append(fn)

    def publish(self, event):
        for fn in self.subscribers:
            fn(event)`}),e.jsx(t,{id:"pattern-decorator",children:"22.5 Decorator (паттерн)"}),e.jsx(s,{children:"Не путать с декораторами Python. Паттерн — про оборачивание объекта другим объектом, чтобы добавить поведение."}),e.jsx(t,{id:"pattern-repository",children:"22.6 Repository"}),e.jsx(s,{children:"Разделяет доменную логику и хранилище."}),e.jsx(r,{code:`class UserRepository:
    def get_by_id(self, user_id) -> User: ...
    def save(self, user: User) -> None: ...`}),e.jsx(s,{children:"UserService работает с UserRepository, не зная, там Postgres, in-memory или mock."}),e.jsx(f,{questions:[{q:"Как реализовать Singleton в Python двумя разными способами?",a:"Через переопределение __new__ так, чтобы он возвращал один и тот же сохранённый экземпляр при повторных вызовах. Или проще — через модуль: он импортируется в Python единожды, поэтому все объявленные в нём переменные и объекты фактически ведут себя как синглтон."},{q:"В чём разница между паттерном Strategy и просто if/elif в коде?",a:"Strategy выносит каждый вариант поведения в отдельный класс с общим интерфейсом и передаёт нужную реализацию через композицию — это соответствует Open/Closed Principle: добавить новую стратегию можно новым классом, не трогая существующий код с условиями."}]}),e.jsx(d,{id:"checklist",children:"Мини-чеклист «знаю ли я ООП»"}),e.jsx(s,{children:"Пройдись глазами и убедись, что можешь объяснить своими словами:"}),e.jsx(k,{items:["Что делает __init__ и почему он не совсем конструктор","Что такое self и почему первый аргумент так называется","Разница между атрибутом класса и атрибутом экземпляра, где грабли","Как работает name mangling для __private","Зачем @property вместо публичного атрибута","Как работает super() и почему без него в наследнике часто плохо","Что такое MRO и как его посмотреть","В чём разница между duck typing, ABC и Protocol","Какие dunder-методы нужны, чтобы объект вёл себя как коллекция","Зачем __slots__ и когда это стоит применять","Что генерирует @dataclass","Что такое метакласс и почему он не нужен 99% времени","Разница между наследованием и композицией — когда что выбирать","Пять принципов SOLID своими словами с примером на каждый","Как реализовать Singleton, Factory, Strategy, Observer"]}),e.jsx(h,{children:"Если по каждому пункту можешь дать 30-секундный ответ с примером кода — по ООП ты закрыт на уровне senior-собеседования."}),e.jsx(d,{id:"practice",children:"Задачи для тренировки (30 шт.)"}),e.jsx(s,{children:"Классические задачи на ООП — часть встречается на реальных собеседованиях, часть похожа на задачи с тренажёров вроде LeetCode/CodeSignal, адаптированные под Python. Не подглядывай в решение сразу — сначала попробуй написать код сам, потом сверься."}),e.jsx(t,{id:"practice-easy",children:"Лёгкие (1–10)"}),e.jsx(l,{n:1,difficulty:"easy",title:"Person",solution:e.jsx(r,{code:`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Привет, меня зовут {self.name}, мне {self.age} лет"

p = Person("Аня", 20)
print(p.greet())  # Привет, меня зовут Аня, мне 20 лет`}),children:e.jsxs(s,{style:{margin:0},children:["Напиши класс ",e.jsx("code",{children:"Person"})," с атрибутами ",e.jsx("code",{children:"name"})," и ",e.jsx("code",{children:"age"})," и методом ",e.jsx("code",{children:"greet()"}),", возвращающим строку ",e.jsxs("code",{children:['"Привет, меня зовут ',"{name}",", мне ","{age}",' лет"']}),"."]})}),e.jsx(l,{n:2,difficulty:"easy",title:"Rectangle",solution:e.jsx(r,{code:`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(4, 5)
print(r.area())       # 20
print(r.perimeter())  # 18`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Rectangle"})," с ",e.jsx("code",{children:"width"}),"/",e.jsx("code",{children:"height"})," и методами ",e.jsx("code",{children:"area()"})," и ",e.jsx("code",{children:"perimeter()"}),"."]})}),e.jsx(l,{n:3,difficulty:"easy",title:"Counter",solution:e.jsx(r,{code:`class Counter:
    def __init__(self):
        self.count = 0

    def increment(self, step=1):
        self.count += step

    def reset(self):
        self.count = 0

c = Counter()
c.increment()
c.increment(5)
print(c.count)  # 6
c.reset()
print(c.count)  # 0`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Counter"})," со счётчиком ",e.jsx("code",{children:"count"}),", методами ",e.jsx("code",{children:"increment(step=1)"})," (по умолчанию +1, но можно указать шаг) и ",e.jsx("code",{children:"reset()"}),"."]})}),e.jsx(l,{n:4,difficulty:"easy",title:"BankAccount: базовые операции",solution:e.jsx(r,{code:`class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True

acc = BankAccount(100)
acc.deposit(50)
print(acc.withdraw(200))  # False — не хватает денег
print(acc.balance)        # 150`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"BankAccount"})," с ",e.jsx("code",{children:"balance"}),", методами ",e.jsx("code",{children:"deposit(amount)"})," и ",e.jsx("code",{children:"withdraw(amount)"}),". ",e.jsx("code",{children:"withdraw"})," возвращает ",e.jsx("code",{children:"False"}),", если средств не хватает, иначе снимает деньги и возвращает ",e.jsx("code",{children:"True"}),"."]})}),e.jsx(l,{n:5,difficulty:"easy",title:"Car с человекочитаемым выводом",solution:e.jsx(r,{code:`class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

print(Car("Toyota", "Corolla", 2022))  # 2022 Toyota Corolla`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Car"})," с ",e.jsx("code",{children:"make"}),"/",e.jsx("code",{children:"model"}),"/",e.jsx("code",{children:"year"}),". Реализуй ",e.jsx("code",{children:"__str__"})," так, чтобы ",e.jsx("code",{children:"print(car)"})," выводил ",e.jsx("code",{children:'"2022 Toyota Corolla"'}),"."]})}),e.jsx(l,{n:6,difficulty:"easy",title:"Circle",solution:e.jsx(r,{code:`import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def circumference(self):
        return 2 * math.pi * self.radius

c = Circle(3)
print(round(c.area(), 2))           # 28.27
print(round(c.circumference(), 2))  # 18.85`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Circle"})," с ",e.jsx("code",{children:"radius"}),", методами ",e.jsx("code",{children:"area()"})," и ",e.jsx("code",{children:"circumference()"}),"."]})}),e.jsx(l,{n:7,difficulty:"easy",title:"Student и средний балл",solution:e.jsx(r,{code:`class Student:
    def __init__(self, name):
        self.name = name
        self.grades = []

    def add_grade(self, grade):
        self.grades.append(grade)

    def average(self):
        return sum(self.grades) / len(self.grades) if self.grades else 0

s = Student("Игорь")
s.add_grade(4)
s.add_grade(5)
print(s.average())  # 4.5`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Student"})," с ",e.jsx("code",{children:"name"})," и списком ",e.jsx("code",{children:"grades"}),". Методы ",e.jsx("code",{children:"add_grade(grade)"})," и ",e.jsx("code",{children:"average()"})," (0, если оценок ещё нет — без деления на ноль)."]})}),e.jsx(l,{n:8,difficulty:"easy",title:"Stack на списке",solution:e.jsx(r,{code:`class Stack:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        return self._items.pop() if self._items else None

    def peek(self):
        return self._items[-1] if self._items else None

    def is_empty(self):
        return len(self._items) == 0

s = Stack()
s.push(1)
s.push(2)
print(s.pop())       # 2
print(s.peek())      # 1
print(s.is_empty())  # False`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Stack"})," (стек, LIFO) на основе списка: ",e.jsx("code",{children:"push"}),", ",e.jsx("code",{children:"pop"}),", ",e.jsx("code",{children:"peek"}),", ",e.jsx("code",{children:"is_empty"}),"."]})}),e.jsx(l,{n:9,difficulty:"easy",title:"Animal → Dog/Cat: базовое наследование",solution:e.jsx(r,{code:`class Animal:
    def __init__(self, name):
        self.name = name

    def speak(self):
        return "..."

class Dog(Animal):
    def speak(self):
        return f"{self.name} говорит: Гав!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} говорит: Мяу!"

for animal in [Dog("Рекс"), Cat("Барсик")]:
    print(animal.speak())
# Рекс говорит: Гав!
# Барсик говорит: Мяу!`}),children:e.jsxs(s,{style:{margin:0},children:["Базовый класс ",e.jsx("code",{children:"Animal"})," с ",e.jsx("code",{children:"name"})," и методом ",e.jsx("code",{children:"speak()"}),". Классы ",e.jsx("code",{children:"Dog"})," и ",e.jsx("code",{children:"Cat"})," наследуются и переопределяют ",e.jsx("code",{children:"speak()"})," по-своему."]})}),e.jsx(l,{n:10,difficulty:"easy",title:"Temperature через @property",solution:e.jsx(r,{code:`class Temperature:
    def __init__(self, celsius=0):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

t = Temperature(100)
print(t.fahrenheit)  # 212.0`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Temperature"})," хранит температуру в цельсиях. Сделай ",e.jsx("code",{children:"fahrenheit"})," вычисляемым свойством через ",e.jsx("code",{children:"@property"}),", а не отдельным методом."]})}),e.jsx(t,{id:"practice-medium",children:"Средние (11–20)"}),e.jsxs(l,{n:11,difficulty:"medium",title:"MRO: предскажи вывод",solution:e.jsxs(e.Fragment,{children:[e.jsx(r,{code:`D().hello()
# B
# C
# A`}),e.jsxs(s,{style:{margin:"10px 0 0"},children:["MRO для ",e.jsx("code",{children:"D(B, C)"})," строится по алгоритму C3-линеаризации: ",e.jsx("code",{children:"D → B → C → A → object"}),". Проверить можно через ",e.jsx("code",{children:"D.__mro__"}),". Каждый ",e.jsx("code",{children:"super().hello()"})," идёт к следующему классу именно в этом порядке, а не напрямую к родителю — поэтому ",e.jsx("code",{children:"B.hello"})," зовёт не ",e.jsx("code",{children:"A.hello"}),", а ",e.jsx("code",{children:"C.hello"}),"."]})]}),children:[e.jsx(s,{style:{margin:"0 0 10px"},children:"Что выведет этот код и почему? Объясни через MRO."}),e.jsx(r,{code:`class A:
    def hello(self):
        print("A")

class B(A):
    def hello(self):
        print("B")
        super().hello()

class C(A):
    def hello(self):
        print("C")
        super().hello()

class D(B, C):
    pass`})]}),e.jsx(l,{n:12,difficulty:"medium",title:"MathUtils с @staticmethod",solution:e.jsx(r,{code:`class MathUtils:
    @staticmethod
    def is_prime(n):
        if n < 2:
            return False
        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                return False
        return True

print(MathUtils.is_prime(17))  # True
print(MathUtils.is_prime(15))  # False`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"MathUtils"})," со статическим методом ",e.jsx("code",{children:"is_prime(n)"}),", не использующим ни ",e.jsx("code",{children:"self"}),", ни ",e.jsx("code",{children:"cls"})," — просто утилита, логически сгруппированная в классе."]})}),e.jsx(l,{n:13,difficulty:"medium",title:"Date.from_string — альтернативный конструктор",solution:e.jsx(r,{code:`class Date:
    def __init__(self, year, month, day):
        self.year, self.month, self.day = year, month, day

    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split("-"))
        return cls(year, month, day)

    def __repr__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

d = Date.from_string("2024-01-05")
print(d)  # 2024-01-05`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Date(year, month, day)"}),". Добавь альтернативный конструктор ",e.jsx("code",{children:'Date.from_string("2024-01-05")'})," через ",e.jsx("code",{children:"@classmethod"}),"."]})}),e.jsx(l,{n:14,difficulty:"medium",title:"Person.age с валидацией",solution:e.jsx(r,{code:`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age  # уходит через setter ниже

    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Возраст не может быть отрицательным")
        self._age = value

p = Person("Игорь", 25)
try:
    p.age = -5
except ValueError as e:
    print(e)  # Возраст не может быть отрицательным`}),children:e.jsxs(s,{style:{margin:0},children:["Сделай так, чтобы ",e.jsx("code",{children:"Person.age"})," нельзя было установить в отрицательное число — присваивание ",e.jsx("code",{children:"p.age = -5"})," должно бросать ",e.jsx("code",{children:"ValueError"}),". Используй ",e.jsx("code",{children:"@property"}),"/",e.jsx("code",{children:"@age.setter"}),"."]})}),e.jsx(l,{n:15,difficulty:"medium",title:"Vector: перегрузка операторов",solution:e.jsx(r,{code:`class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar):
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

v1, v2 = Vector(1, 2), Vector(3, 4)
print(v1 + v2)             # Vector(4, 6)
print(v1 * 3)               # Vector(3, 6)
print(v1 == Vector(1, 2))   # True`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Vector(x, y)"}),". Реализуй ",e.jsx("code",{children:"__add__"})," (сложение векторов), ",e.jsx("code",{children:"__mul__"})," (умножение на число) и ",e.jsx("code",{children:"__eq__"})," (сравнение по координатам)."]})}),e.jsx(l,{n:16,difficulty:"medium",title:"__str__ vs __repr__",solution:e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(1, 2)
print(p)     # (1, 2)              — вызывает __str__
print([p])   # [Point(x=1, y=2)]   — контейнеры всегда используют __repr__`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Point(x, y)"}),". Реализуй ",e.jsx("code",{children:"__str__"})," (короткий вывод для человека) и ",e.jsx("code",{children:"__repr__"})," (однозначный вывод для отладки) так, чтобы они отличались, и объясни, почему ",e.jsx("code",{children:"print([p])"})," покажет именно ",e.jsx("code",{children:"__repr__"}),", а не ",e.jsx("code",{children:"__str__"}),"."]})}),e.jsx(l,{n:17,difficulty:"medium",title:"Композиция: Car has-a Engine",solution:e.jsx(r,{code:`class Engine:
    def __init__(self, horsepower):
        self.horsepower = horsepower

    def start(self):
        return f"Двигатель на {self.horsepower} л.с. заведён"

class Car:
    def __init__(self, model, horsepower):
        self.model = model
        self.engine = Engine(horsepower)  # композиция, а не наследование

    def start(self):
        return f"{self.model}: {self.engine.start()}"

print(Car("Lada", 90).start())
# Lada: Двигатель на 90 л.с. заведён`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Engine(horsepower)"})," с методом ",e.jsx("code",{children:"start()"}),". Класс ",e.jsx("code",{children:"Car"})," должен ",e.jsx("em",{children:"иметь"})," двигатель (композиция), а не наследоваться от него — ",e.jsx("code",{children:"Car"})," не является видом двигателя."]})}),e.jsx(l,{n:18,difficulty:"medium",title:"Своё исключение для банка",solution:e.jsx(r,{code:`class InsufficientFundsError(Exception):
    pass

class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(
                f"Недостаточно средств: баланс {self.balance}, запрошено {amount}"
            )
        self.balance -= amount

acc = BankAccount(100)
try:
    acc.withdraw(150)
except InsufficientFundsError as e:
    print(e)`}),children:e.jsxs(s,{style:{margin:0},children:["Вместо ",e.jsx("code",{children:"return False"})," из задачи 4 — заведи собственный класс исключения ",e.jsx("code",{children:"InsufficientFundsError(Exception)"})," и бросай его из ",e.jsx("code",{children:"withdraw()"}),", если денег не хватает."]})}),e.jsx(l,{n:19,difficulty:"medium",title:"Абстрактный класс Shape",solution:e.jsx(r,{code:`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        ...

class Square(Shape):
    def __init__(self, side):
        self.side = side

    def area(self):
        return self.side ** 2

# Shape()  # TypeError: нельзя создать экземпляр абстрактного класса
print(Square(4).area())  # 16`}),children:e.jsxs(s,{style:{margin:0},children:["Сделай ",e.jsx("code",{children:"Shape"})," абстрактным классом через ",e.jsx("code",{children:"abc.ABC"})," с абстрактным методом ",e.jsx("code",{children:"area()"}),", чтобы ",e.jsx("code",{children:"Shape()"})," напрямую создать было нельзя, а ",e.jsx("code",{children:"Square(Shape)"})," обязан реализовать ",e.jsx("code",{children:"area()"}),"."]})}),e.jsx(l,{n:20,difficulty:"medium",title:"__eq__ и __hash__ для set",solution:e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))  # 2 — дубликат по значению схлопнулся`}),children:e.jsxs(s,{style:{margin:0},children:["Реализуй ",e.jsx("code",{children:"__eq__"})," и ",e.jsx("code",{children:"__hash__"})," для ",e.jsx("code",{children:"Point(x, y)"})," так, чтобы два «одинаковых» по координатам объекта считались одним элементом в ",e.jsx("code",{children:"set"}),". Подсказка: если переопределяешь ",e.jsx("code",{children:"__eq__"}),", Python сбрасывает ",e.jsx("code",{children:"__hash__"})," в ",e.jsx("code",{children:"None"})," — его надо задать явно."]})}),e.jsx(t,{id:"practice-hard",children:"Сложные (21–30)"}),e.jsx(l,{n:21,difficulty:"hard",title:"Итератор Fibonacci",solution:e.jsx(r,{code:`class Fibonacci:
    def __init__(self, limit):
        self.limit = limit

    def __iter__(self):
        self.a, self.b, self.count = 0, 1, 0
        return self

    def __next__(self):
        if self.count >= self.limit:
            raise StopIteration
        result = self.a
        self.a, self.b = self.b, self.a + self.b
        self.count += 1
        return result

print(list(Fibonacci(7)))  # [0, 1, 1, 2, 3, 5, 8]`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Fibonacci(limit)"}),", который сам является итератором: реализуй ",e.jsx("code",{children:"__iter__"})," и ",e.jsx("code",{children:"__next__"})," так, чтобы ",e.jsx("code",{children:"list(Fibonacci(7))"})," дал первые 7 чисел Фибоначчи."]})}),e.jsx(l,{n:22,difficulty:"hard",title:"Context manager: Timer",solution:e.jsx(r,{code:`import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Прошло {self.elapsed:.4f} сек")
        return False  # не подавляем исключения, если они были

with Timer():
    total = sum(range(10**6))`}),children:e.jsxs(s,{style:{margin:0},children:["Класс ",e.jsx("code",{children:"Timer"}),", который можно использовать через ",e.jsx("code",{children:"with Timer():"})," — замеряет время выполнения блока и печатает его при выходе. Реализуй ",e.jsx("code",{children:"__enter__"})," и ",e.jsx("code",{children:"__exit__"}),"."]})}),e.jsx(l,{n:23,difficulty:"hard",title:"Дескриптор PositiveNumber",solution:e.jsx(r,{code:`class PositiveNumber:
    def __set_name__(self, owner, name):
        self.name = "_" + name

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.name[1:]} должно быть положительным")
        setattr(obj, self.name, value)

class Product:
    price = PositiveNumber()
    quantity = PositiveNumber()

    def __init__(self, price, quantity):
        self.price = price
        self.quantity = quantity

p = Product(100, 5)
try:
    p.price = -10
except ValueError as e:
    print(e)  # price должно быть положительным`}),children:e.jsxs(s,{style:{margin:0},children:["Напиши дескриптор ",e.jsx("code",{children:"PositiveNumber"})," (с ",e.jsx("code",{children:"__get__"}),"/",e.jsx("code",{children:"__set__"}),"), который можно переиспользовать для нескольких полей — ",e.jsx("code",{children:"price"})," и ",e.jsx("code",{children:"quantity"})," в ",e.jsx("code",{children:"Product"})," — так, чтобы оба поля не давали присвоить неположительное значение, без копипасты property на каждое поле отдельно."]})}),e.jsx(l,{n:24,difficulty:"hard",title:"Паттерн Observer",solution:e.jsx(r,{code:`class Subject:
    def __init__(self):
        self._observers = []

    def subscribe(self, observer):
        self._observers.append(observer)

    def notify(self, event):
        for observer in self._observers:
            observer.update(event)

class EmailObserver:
    def update(self, event):
        print(f"Отправляю email: {event}")

class LogObserver:
    def update(self, event):
        print(f"[LOG] {event}")

subject = Subject()
subject.subscribe(EmailObserver())
subject.subscribe(LogObserver())
subject.notify("Заказ оформлен")
# Отправляю email: Заказ оформлен
# [LOG] Заказ оформлен`}),children:e.jsxs(s,{style:{margin:0},children:["Реализуй паттерн Observer: класс ",e.jsx("code",{children:"Subject"})," с ",e.jsx("code",{children:"subscribe(observer)"})," и ",e.jsx("code",{children:"notify(event)"}),", который оповещает всех подписчиков. Заведи два разных наблюдателя (например, ",e.jsx("code",{children:"EmailObserver"})," и ",e.jsx("code",{children:"LogObserver"}),") с общим интерфейсом ",e.jsx("code",{children:"update(event)"}),"."]})}),e.jsx(l,{n:25,difficulty:"hard",title:"Паттерн Factory",solution:e.jsx(r,{code:`class Circle:
    def area(self):
        return "площадь круга"

class Square:
    def area(self):
        return "площадь квадрата"

class ShapeFactory:
    _shapes = {"circle": Circle, "square": Square}

    @classmethod
    def create(cls, kind):
        if kind not in cls._shapes:
            raise ValueError(f"Неизвестная фигура: {kind}")
        return cls._shapes[kind]()

shape = ShapeFactory.create("circle")
print(shape.area())  # площадь круга`}),children:e.jsxs(s,{style:{margin:0},children:["Реализуй паттерн Factory: ",e.jsx("code",{children:'ShapeFactory.create("circle")'})," должен вернуть правильный подкласс фигуры по строковому имени, не заставляя вызывающий код знать про конкретные классы ",e.jsx("code",{children:"Circle"}),"/",e.jsx("code",{children:"Square"})," напрямую."]})}),e.jsx(l,{n:26,difficulty:"hard",title:"Паттерн Strategy",solution:e.jsx(r,{code:`class SortContext:
    def __init__(self, strategy):
        self.strategy = strategy

    def sort(self, data):
        return self.strategy(data)

ascending = lambda data: sorted(data)
descending = lambda data: sorted(data, reverse=True)

context = SortContext(ascending)
print(context.sort([3, 1, 2]))  # [1, 2, 3]

context.strategy = descending
print(context.sort([3, 1, 2]))  # [3, 2, 1]`}),children:e.jsxs(s,{style:{margin:0},children:["Реализуй паттерн Strategy: класс ",e.jsx("code",{children:"SortContext"}),", которому можно на лету подменить алгоритм сортировки (например, по возрастанию/убыванию), не переписывая сам класс — новую стратегию добавляем отдельной функцией, а не веткой ",e.jsx("code",{children:"if/elif"})," внутри ",e.jsx("code",{children:"sort()"}),"."]})}),e.jsx(l,{n:27,difficulty:"hard",title:"Миксины",solution:e.jsx(r,{code:`import json

class JsonMixin:
    def to_json(self):
        return json.dumps(self.__dict__)

class ComparableMixin:
    def __lt__(self, other):
        return self.value < other.value

class Item(JsonMixin, ComparableMixin):
    def __init__(self, name, value):
        self.name = name
        self.value = value

a, b = Item("A", 10), Item("B", 20)
print(a < b)         # True
print(a.to_json())   # {"name": "A", "value": 10}`}),children:e.jsxs(s,{style:{margin:0},children:["Заведи два независимых миксина — ",e.jsx("code",{children:"JsonMixin"})," (добавляет ",e.jsx("code",{children:"to_json()"}),") и ",e.jsx("code",{children:"ComparableMixin"})," (добавляет ",e.jsx("code",{children:"__lt__"})," по полю ",e.jsx("code",{children:"value"}),") — и собери класс ",e.jsx("code",{children:"Item"}),", наследуясь сразу от обоих."]})}),e.jsx(l,{n:28,difficulty:"hard",title:"__slots__: что ломается",solution:e.jsxs(e.Fragment,{children:[e.jsx(r,{code:`class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y

p = Point(1, 2)
p.x = 10       # работает — x объявлен в slots
# p.z = 3      # AttributeError: 'Point' object has no attribute 'z'`}),e.jsxs(s,{style:{margin:"10px 0 0"},children:[e.jsx("code",{children:"__slots__"})," убирает у экземпляра служебный ",e.jsx("code",{children:"__dict__"}),", заменяя его набором фиксированных «слотов» — это экономит память при создании миллионов объектов. Плата за это: нельзя добавить атрибут, не объявленный в ",e.jsx("code",{children:"__slots__"}),", множественное наследование от нескольких классов со своими ",e.jsx("code",{children:"__slots__"})," усложняется, а без явного ",e.jsx("code",{children:'"__weakref__"'})," в списке слотов на объект нельзя создать weak reference."]})]}),children:e.jsxs(s,{style:{margin:0},children:["Перепиши класс ",e.jsx("code",{children:"Point(x, y)"})," так, чтобы он использовал ",e.jsx("code",{children:"__slots__"})," вместо обычного ",e.jsx("code",{children:"__dict__"}),". Что теперь перестанет работать и почему это иногда оправданный компромисс?"]})}),e.jsx(l,{n:29,difficulty:"hard",title:"Метакласс, требующий метод",solution:e.jsx(r,{code:`class RequireRunMeta(type):
    def __new__(mcs, name, bases, namespace):
        if bases and "run" not in namespace:
            raise TypeError(f"Класс {name} должен реализовать метод run()")
        return super().__new__(mcs, name, bases, namespace)

class Task(metaclass=RequireRunMeta):
    def run(self):
        pass

class BadTask(Task):
    pass
# TypeError: класс BadTask должен реализовать метод run()`}),children:e.jsxs(s,{style:{margin:0},children:["Напиши метакласс ",e.jsx("code",{children:"RequireRunMeta"}),", который на этапе создания класса проверяет, что в нём объявлен метод ",e.jsx("code",{children:"run()"})," — и бросает ",e.jsx("code",{children:"TypeError"}),", если наследник забыл его реализовать. Это упрощённый самодельный аналог того, что даёт ",e.jsx("code",{children:"abc.ABC"}),"."]})}),e.jsxs(l,{n:30,difficulty:"hard",title:"Рефакторинг God Class по SOLID",solution:e.jsxs(e.Fragment,{children:[e.jsx(r,{code:`class OrderValidator:
    def validate(self, order):
        if not order.items:
            raise ValueError("Пустой заказ")

class PriceCalculator:
    def calculate(self, order):
        return sum(i.price * i.qty for i in order.items)

class OrderRepository:
    def save(self, order, total):
        print(f"Сохраняю заказ на сумму {total} в БД")

class EmailSender:
    def send(self, order, total):
        print(f"Письмо клиенту {order.customer_email}: заказ на {total} принят")

class OrderProcessor:
    def __init__(self):
        self.validator = OrderValidator()
        self.calculator = PriceCalculator()
        self.repository = OrderRepository()
        self.mailer = EmailSender()

    def process(self, order):
        self.validator.validate(order)
        total = self.calculator.calculate(order)
        self.repository.save(order, total)
        self.mailer.send(order, total)`}),e.jsxs(s,{style:{margin:"10px 0 0"},children:["Каждый класс отвечает ровно за одну вещь (Single Responsibility), а ",e.jsx("code",{children:"OrderProcessor"})," теперь просто оркестрирует их вызовы через композицию. Захочешь заменить email на SMS — меняешь только ",e.jsx("code",{children:"EmailSender"}),", не трогая валидацию, расчёт цены или сохранение (Open/Closed)."]})]}),children:[e.jsxs(s,{style:{margin:"0 0 10px"},children:["Класс ниже нарушает Single Responsibility Principle — делает сразу всё: валидирует заказ, считает цену, пишет в БД, шлёт письмо. Разбей его на несколько классов с одной ответственностью каждый, связав их композицией внутри ",e.jsx("code",{children:"OrderProcessor"}),"."]}),e.jsx(r,{code:`class OrderProcessor:
    def process(self, order):
        if not order.items:
            raise ValueError("Пустой заказ")
        total = sum(i.price * i.qty for i in order.items)
        print(f"Сохраняю заказ на сумму {total} в БД")
        print(f"Письмо клиенту {order.customer_email}: заказ на {total} принят")`})]})]})}export{q as default};
