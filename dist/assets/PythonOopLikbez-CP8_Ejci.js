import{r as y,j as e}from"./index-CH9KCahv.js";import{S as c}from"./SelfCheck-D1qTmAaZ.js";const r=({code:n,lang:d="python"})=>{const l="#",a=n.split(`
`);return e.jsxs("div",{className:"theory-code-block",children:[e.jsx("div",{className:"theory-code-label",children:d}),e.jsx("pre",{className:"theory-code",children:e.jsx("code",{children:a.map((_,o)=>{const p=_.indexOf(l);if(p===-1)return e.jsxs("span",{children:[_,o<a.length-1?`
`:""]},o);const f=_.slice(0,p),m=(f.match(/'/g)||[]).length,g=(f.match(/"/g)||[]).length;return m%2!==0||g%2!==0?e.jsxs("span",{children:[_,o<a.length-1?`
`:""]},o):e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--text-primary)"},children:f}),e.jsx("span",{style:{color:"#6b7280"},children:_.slice(p)}),o<a.length-1?`
`:""]},o)})})})]})},x=({children:n})=>e.jsxs("div",{style:{background:"rgba(32,190,255,0.05)",border:"1px solid rgba(32,190,255,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),n]}),h=({children:n})=>e.jsxs("div",{style:{background:"rgba(255,100,100,0.07)",border:"1px solid rgba(255,100,100,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"#f87171",fontWeight:700,marginRight:6},children:"⚠️"}),n]}),t=({id:n,children:d})=>e.jsx("h2",{id:n,style:{color:"var(--text-primary)",fontSize:"clamp(17px, 3vw, 21px)",fontWeight:700,margin:"44px 0 14px",paddingTop:8,borderBottom:"1px solid var(--border-color)",paddingBottom:10,scrollMarginTop:80},children:d}),i=({id:n,children:d})=>e.jsx("h3",{id:n,style:{color:"var(--text-primary)",fontSize:"clamp(13px, 2vw, 16px)",fontWeight:600,margin:"26px 0 10px",scrollMarginTop:80},children:d}),s=({children:n,style:d})=>e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...d},children:n}),u=({items:n})=>e.jsx("ul",{style:{paddingLeft:20,margin:"10px 0"},children:n.map((d,l)=>e.jsx("li",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,marginBottom:4},children:d},l))}),b=({headers:n=["Метод / приём","Что делает","Пример"],rows:d})=>e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:n.map((l,a)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:l},a))})}),e.jsx("tbody",{children:d.map(([l,a,_],o)=>e.jsxs("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:[e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",whiteSpace:"nowrap"},children:l}),e.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)"},children:a}),e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",fontSize:12,whiteSpace:"nowrap"},children:_})]},o))})]})}),j=({headers:n,rows:d})=>e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"14px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:n.map((l,a)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:a===0?"var(--text-secondary)":"var(--accent-lime)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:l},a))})}),e.jsx("tbody",{children:d.map((l,a)=>e.jsx("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:l.map((_,o)=>e.jsx("td",{style:{padding:"7px 14px",color:o===0?"var(--text-secondary)":"var(--text-primary)",fontWeight:o===0?600:400},children:_},o))},a))})]})}),v=({items:n})=>e.jsx("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"18px 22px",margin:"18px 0"},children:n.map((d,l)=>e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-start",padding:"7px 0",borderBottom:l<n.length-1?"1px solid var(--border-color)":"none"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontSize:14,marginTop:1},children:"☐"}),e.jsx("span",{style:{color:"var(--text-secondary)",fontSize:13.5,lineHeight:1.7},children:d})]},l))}),k=[{id:"intro",label:"1. Что такое ООП и зачем оно нужно"},{id:"classes",label:"2. Классы и объекты — база"},{id:"init",label:"3. __init__ и атрибуты"},{id:"self",label:"4. self — что это на самом деле"},{id:"methods",label:"5. Методы: instance, class, static"},{id:"attrs",label:"6. Атрибуты класса vs экземпляра"},{id:"encapsulation",label:"7. Инкапсуляция: public / protected / private"},{id:"property",label:"8. @property — getter и setter"},{id:"inheritance",label:"9. Наследование"},{id:"super",label:"10. super() и как это работает"},{id:"mro",label:"11. Множественное наследование и MRO"},{id:"polymorphism",label:"12. Полиморфизм"},{id:"duck",label:"13. Duck typing"},{id:"abc",label:"14. Абстрактные классы (ABC)"},{id:"dunder",label:"15. Dunder-методы"},{id:"slots",label:"16. __slots__"},{id:"dataclass",label:"17. @dataclass"},{id:"metaclasses",label:"18. Метаклассы"},{id:"protocol",label:"19. Protocol и структурная типизация"},{id:"composition",label:"20. Композиция vs наследование"},{id:"solid",label:"21. Принципы SOLID"},{id:"patterns",label:"22. Базовые паттерны проектирования"},{id:"checklist",label:'Чек-лист "знаю ли я ООП"'}];function w({onBack:n}){y.useEffect(()=>{window.scrollTo(0,0)},[]);const d=l=>{const a=document.getElementById(l);a&&a.scrollIntoView({behavior:"smooth"})};return e.jsxs("div",{style:{maxWidth:"100%",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[e.jsx("button",{onClick:n,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28},children:"Назад к ликбезам"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("div",{style:{background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,padding:"6px 14px",color:"#60a5fa",fontSize:12,fontWeight:700,letterSpacing:1},children:"PYTHON"}),e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12,display:"flex",alignItems:"center"},children:"С нуля → Senior-собеседование"})]}),e.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"ООП в Python — полный ликбез"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"Всё от классов и объектов до метаклассов, SOLID и паттернов проектирования. Каждая тема — с примером кода и объяснением, почему это работает именно так."}),e.jsx("div",{style:{marginTop:20,display:"flex",gap:10,flexWrap:"wrap"},children:["Python 3.10+","22 главы","~90 мин"].map(l=>e.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:l},l))})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:44},children:[e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(220px, 1fr))",gap:"6px 24px"},children:k.map(l=>e.jsx("button",{onClick:()=>d(l.id),style:{background:"none",border:"none",textAlign:"left",padding:"4px 0",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",transition:"color 0.15s"},onMouseEnter:a=>a.target.style.color="var(--accent-lime)",onMouseLeave:a=>a.target.style.color="var(--text-secondary)",children:l.label},l.id))})]}),e.jsx(t,{id:"intro",children:"1. Что такое ООП и зачем оно нужно"}),e.jsxs(s,{children:[e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Объектно-ориентированное программирование"})," — способ организовать код, при котором сущности реального мира моделируются в виде ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"объектов"}),". У объекта есть состояние (данные — например, у собаки кличка и возраст) и поведение (действия — собака может лаять, бегать, есть)."]}),e.jsx(s,{children:"До ООП код писали процедурно: набор функций, работающих с общими данными. Проблема — когда программа растёт, непонятно, какие функции работают с какими данными, всё перемешивается. ООП решает это, склеивая данные и функции в один «контейнер» — объект."}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:12,margin:"20px 0"},children:[{label:"Инкапсуляция",desc:"прячем внутренности объекта, наружу торчит только интерфейс"},{label:"Наследование",desc:"новые классы переиспользуют код старых"},{label:"Полиморфизм",desc:"один вызов работает по-разному в зависимости от типа объекта"},{label:"Абстракция",desc:"работаем с интерфейсами, не думая о деталях реализации"}].map(l=>e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:14},children:[e.jsx("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--accent-lime)",fontSize:14,marginBottom:6},children:l.label}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:l.desc})]},l.label))}),e.jsx(c,{questions:[{q:"Какую проблему процедурного кода решает ООП?",a:"В процедурном коде функции и данные существуют отдельно — с ростом программы непонятно, какие функции работают с какими данными. ООП склеивает данные и поведение в единый объект."},{q:"Назови четыре кита ООП.",a:"Инкапсуляция, наследование, полиморфизм, абстракция."}]}),e.jsx(t,{id:"classes",children:"2. Классы и объекты — база"}),e.jsxs(s,{children:[e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Класс"})," — это чертёж. ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Объект (экземпляр)"})," — конкретная вещь, сделанная по чертежу. Класс «Автомобиль» описывает, что у машины есть 4 колеса, двигатель, цвет; твой конкретный красный BMW — объект этого класса."]}),e.jsx(r,{code:`class Dog:
    pass  # пока пустой класс

# создаём объект (экземпляр)
my_dog = Dog()
print(my_dog)         # <__main__.Dog object at 0x7f...>
print(type(my_dog))   # <class '__main__.Dog'>`}),e.jsxs(s,{children:[e.jsx("code",{children:"Dog()"})," — вызов класса как функции создаёт экземпляр. Это называется ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"инстанцирование"}),"."]}),e.jsxs(x,{children:["В Python всё является объектом — числа, строки, функции, даже сами классы. У каждого есть тип (класс), от которого он произошёл: ",e.jsx("code",{children:"type(42)"})," → ",e.jsx("code",{children:"int"}),", ",e.jsx("code",{children:'type("hello")'})," → ",e.jsx("code",{children:"str"}),"."]}),e.jsx(t,{id:"init",children:"3. __init__ и атрибуты"}),e.jsxs(s,{children:["Класс без данных бесполезен. Нужно уметь класть в объект состояние — для этого специальный метод ",e.jsx("code",{children:"__init__"}),", конструктор."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

my_dog = Dog("Рекс", 3)
print(my_dog.name)  # Рекс
print(my_dog.age)   # 3`}),e.jsxs(s,{children:["Что произошло: вызвали ",e.jsx("code",{children:'Dog("Рекс", 3)'})," → Python создал пустой объект → автоматически вызвал ",e.jsx("code",{children:"__init__"}),", передав в него объект как ",e.jsx("code",{children:"self"})," и аргументы → внутри записали атрибуты ",e.jsx("code",{children:"name"})," и ",e.jsx("code",{children:"age"}),"."]}),e.jsxs(s,{children:[e.jsx("code",{children:"__init__"})," называется ",e.jsx("strong",{style:{color:"var(--text-primary)"},children:"dunder-методом"})," (от double underscore — двойное подчёркивание). Таких методов много, познакомимся дальше."]}),e.jsxs(h,{children:[e.jsx("code",{children:"__init__"})," — это не конструктор в полном смысле, а инициализатор. Настоящий конструктор — ",e.jsx("code",{children:"__new__"}),", но он нужен в редких случаях."]}),e.jsx(t,{id:"self",children:"4. self — что это на самом деле"}),e.jsxs(s,{children:[e.jsx("code",{children:"self"})," — ссылка на текущий объект. Когда делаешь ",e.jsx("code",{children:"my_dog.bark()"}),", Python под капотом превращает это в ",e.jsx("code",{children:"Dog.bark(my_dog)"}),". Первый аргумент — сам объект."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} говорит: гав!")

rex = Dog("Рекс")
rex.bark()      # Рекс говорит: гав!
Dog.bark(rex)   # то же самое — Рекс говорит: гав!`}),e.jsxs(s,{children:["Слово ",e.jsx("code",{children:"self"})," — это договорённость, а не ключевое слово. Можно написать иначе, но так не принято — все Python-разработчики ожидают увидеть ",e.jsx("code",{children:"self"}),"."]}),e.jsx(c,{questions:[{q:"Что на самом деле означает my_dog.bark()?",a:"Python преобразует это в Dog.bark(my_dog) — первым аргументом метода передаётся сам объект, на который ссылается self."},{q:"Является ли self ключевым словом Python?",a:"Нет, это лишь общепринятая договорённость. Можно назвать первый параметр иначе, но так делать не принято — весь код сообщества ожидает self."}]}),e.jsx(t,{id:"methods",children:"5. Методы: instance, class, static"}),e.jsx(i,{id:"methods-instance",children:"5.1 Instance methods (обычные)"}),e.jsxs(s,{children:["Работают с конкретным экземпляром, первый аргумент — ",e.jsx("code",{children:"self"}),"."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):  # instance method
        print(f"{self.name}: гав!")`}),e.jsx(i,{id:"methods-class",children:"5.2 Class methods"}),e.jsxs(s,{children:["Работают с классом, а не с экземпляром. Первый аргумент — ",e.jsx("code",{children:"cls"}),". Часто используются как альтернативный конструктор."]}),e.jsx(r,{code:`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def puppy(cls, name):
        # альтернативный конструктор: щенок, возраст всегда 0
        return cls(name, age=0)

rex = Dog.puppy("Рекс")
print(rex.age)  # 0`}),e.jsxs(s,{children:["Зачем ",e.jsx("code",{children:"cls"})," вместо ",e.jsx("code",{children:"Dog"}),"? Чтобы при наследовании метод создавал объект правильного класса — с ",e.jsx("code",{children:"Dog(name, 0)"})," метод ",e.jsx("code",{children:"Puppy.puppy(...)"})," вернул бы ",e.jsx("code",{children:"Dog"}),", а не ",e.jsx("code",{children:"Puppy"}),"."]}),e.jsx(i,{id:"methods-static",children:"5.3 Static methods"}),e.jsx(s,{children:"Не работают ни с экземпляром, ни с классом — просто функция, живущая внутри класса ради логической группировки."}),e.jsx(r,{code:`class Dog:
    @staticmethod
    def is_valid_age(age):
        return 0 <= age <= 30

print(Dog.is_valid_age(5))    # True
print(Dog.is_valid_age(500))  # False`}),e.jsx(j,{headers:["Тип метода","Когда использовать"],rows:[["instance method","работаешь с данными конкретного объекта (в 90% случаев)"],["classmethod","альтернативный конструктор или работа с классом в целом"],["staticmethod","утилитарная функция, логически относящаяся к классу"]]}),e.jsx(t,{id:"attrs",children:"6. Атрибуты класса vs атрибуты экземпляра"}),e.jsx(s,{children:"Одна из тем, где новички регулярно наступают на грабли."}),e.jsx(r,{code:`class Dog:
    species = "Canis familiaris"  # атрибут КЛАССА (общий для всех)

    def __init__(self, name):
        self.name = name          # атрибут ЭКЗЕМПЛЯРА (у каждого свой)

rex = Dog("Рекс")
buddy = Dog("Бадди")
print(rex.species)    # Canis familiaris
print(buddy.species)  # Canis familiaris
print(Dog.species)    # Canis familiaris`}),e.jsx(i,{id:"attrs-mutable",children:"Грабли: мутабельные атрибуты класса"}),e.jsx(r,{code:`class Dog:
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
        self.tricks = []  # у каждого свой список`}),e.jsxs(h,{children:["Мутабельные значения (list, dict, set) на уровне класса — почти всегда баг. Держи их в ",e.jsx("code",{children:"__init__"}),"."]}),e.jsx(c,{questions:[{q:"Почему список tricks = [] на уровне класса опасен?",a:"Такой список один на весь класс — все экземпляры делят одну и ту же ссылку. Изменение через один объект (append) видно у всех остальных объектов. Мутабельные значения нужно создавать в __init__, чтобы у каждого экземпляра была своя копия."}]}),e.jsx(t,{id:"encapsulation",children:"7. Инкапсуляция: public / protected / private"}),e.jsx(s,{children:"Инкапсуляция — идея прятать внутренности объекта, чтобы снаружи с ним работали только через понятный интерфейс. В Python нет «настоящих» private/protected как в Java — есть соглашения."}),e.jsx(r,{code:`class Account:
    def __init__(self, balance):
        self.balance = balance      # public — можно трогать снаружи
        self._internal = "secret"   # protected — "не трогай без нужды"
        self.__pin = "1234"         # private — name mangling`}),e.jsx(j,{headers:["Обозначение","Смысл"],rows:[["public (name)","обычный атрибут, доступен всем"],["_protected (_name)","договорённость «снаружи класса не трогать», Python не запрещает"],["__private (__name)","включает name mangling — переименовывается в _ClassName__name"]]}),e.jsx(r,{code:`acc = Account(100)
print(acc.balance)         # 100 — ок
print(acc._internal)       # secret — работает, но так не принято
# print(acc.__pin)         # AttributeError!
print(acc._Account__pin)   # 1234 — mangling обходится, но зачем?`}),e.jsxs(x,{children:["Практика: используй ",e.jsx("code",{children:"_name"})," для внутренних вещей класса. ",e.jsx("code",{children:"__name"})," — редко, только если реально боишься коллизий имён в наследниках."]}),e.jsx(t,{id:"property",children:"8. @property — getter и setter по-питоновски"}),e.jsxs(s,{children:["В Java пишут ",e.jsx("code",{children:"getName()"}),"/",e.jsx("code",{children:"setName()"}),". В Python это неидиоматично — вместо этого ",e.jsx("code",{children:"@property"}),"."]}),e.jsxs(s,{children:["Задача: чтобы ",e.jsx("code",{children:"balance"})," нельзя было поставить в минус. Плохо — сделать ",e.jsx("code",{children:"self.balance"})," публичным (любой напишет ",e.jsx("code",{children:"acc.balance = -1000"}),"). Хорошо — обернуть в property:"]}),e.jsx(r,{code:`class Account:
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
print(r.area)  # 12 — обращаемся как к атрибуту, но это метод`}),e.jsx(c,{questions:[{q:"Зачем нужен @property вместо публичного атрибута?",a:'Он позволяет добавить логику (например, валидацию) при чтении или записи "поля", не меняя внешний интерфейс использования класса — снаружи это по-прежнему выглядит как обычный атрибут.'},{q:"Что такое computed property?",a:"Property, значение которого вычисляется на лету при каждом обращении (например, area у прямоугольника), а не хранится как отдельный атрибут."}]}),e.jsx(t,{id:"inheritance",children:"9. Наследование"}),e.jsx(s,{children:"Наследование — создание нового класса на основе существующего. Новый класс получает всё поведение родителя и может что-то добавить или переопределить."}),e.jsx(r,{code:`class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} ест")

class Dog(Animal):  # Dog наследуется от Animal
    def bark(self):
        print(f"{self.name}: гав!")

rex = Dog("Рекс")
rex.eat()   # Рекс ест  — унаследовано от Animal
rex.bark()  # Рекс: гав! — своё`}),e.jsx(i,{id:"inheritance-override",children:"Переопределение (override)"}),e.jsx(r,{code:`class Animal:
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
# Какой-то звук`}),e.jsx(s,{children:"Это уже полиморфизм в действии — разберём его в разделе 12."}),e.jsx(t,{id:"super",children:"10. super() и как это работает"}),e.jsxs(s,{children:["Иногда в наследнике нужно дополнить, а не полностью заменить логику родителя. Для этого — ",e.jsx("code",{children:"super()"}),"."]}),e.jsx(r,{code:`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # вызываем __init__ родителя
        self.breed = breed

rex = Dog("Рекс", "лабрадор")
print(rex.name, rex.breed)  # Рекс лабрадор`}),e.jsxs(s,{children:[e.jsx("code",{children:"super()"})," возвращает специальный прокси-объект, позволяющий вызывать методы родителя."]}),e.jsxs(h,{children:["Если переопределяешь ",e.jsx("code",{children:"__init__"})," в наследнике, почти всегда нужно вызывать ",e.jsx("code",{children:"super().__init__(...)"}),", чтобы родитель успел проинициализировать своё состояние."]}),e.jsx(t,{id:"mro",children:"11. Множественное наследование и MRO"}),e.jsx(s,{children:"Python разрешает наследоваться сразу от нескольких классов:"}),e.jsx(r,{code:`class Swimmer:
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
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)`}),e.jsx(s,{children:"Python идёт по MRO слева направо и берёт первое совпадение: D → B → C → A → object."}),e.jsxs(x,{children:[e.jsx("strong",{children:"Diamond problem"})," (ромбовидное наследование) решается именно за счёт MRO — класс A встретится в цепочке только один раз. ",e.jsx("code",{children:"object"})," — базовый класс всех классов в Python, даже если родитель не указан явно."]}),e.jsx(c,{questions:[{q:"Что такое MRO и зачем оно нужно?",a:"Method Resolution Order — порядок, в котором Python ищет метод при множественном наследовании (алгоритм C3-линеаризации). Он решает diamond problem, гарантируя, что общий предок встретится в цепочке поиска только один раз."},{q:"Как посмотреть MRO класса?",a:"Через атрибут ClassName.__mro__ или функцию ClassName.mro()."}]}),e.jsx(t,{id:"polymorphism",children:"12. Полиморфизм"}),e.jsx(s,{children:"Полиморфизм — способность разных объектов реагировать на один и тот же вызов по-разному."}),e.jsx(r,{code:`class Shape:
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
    print(s.area())  # каждая фигура считает свою площадь по-своему`}),e.jsxs(s,{children:["Пишем один и тот же код (",e.jsx("code",{children:"s.area()"}),"), но результат зависит от типа объекта. Это позволяет добавлять новые фигуры (треугольник, эллипс…), не меняя цикл."]}),e.jsx(t,{id:"duck",children:"13. Duck typing"}),e.jsx(s,{children:"Питоновский подход к полиморфизму: «если оно ходит как утка и крякает как утка — это утка». В отличие от Java, Python не проверяет тип при вызове метода — он просто пытается вызвать метод."}),e.jsx(r,{code:`class Duck:
    def quack(self):
        print("Кря!")

class Person:
    def quack(self):
        print("Я тоже могу крякнуть!")

def make_it_quack(thing):
    thing.quack()  # не важно, какого типа thing

make_it_quack(Duck())    # Кря!
make_it_quack(Person())  # Я тоже могу крякнуть!`}),e.jsx(s,{children:"Плюс: невероятная гибкость. Минус: ошибки типов ловятся только в рантайме — отсюда важность type hints и mypy."}),e.jsx(t,{id:"abc",children:"14. Абстрактные классы (ABC)"}),e.jsxs(s,{children:["Иногда нужно сказать: «этот класс нельзя инстанцировать напрямую, а наследники обязаны реализовать такие-то методы». Для этого — модуль ",e.jsx("code",{children:"abc"}),"."]}),e.jsx(r,{code:`from abc import ABC, abstractmethod

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
print(c.area())`}),e.jsxs(s,{children:["Если наследник забудет реализовать ",e.jsx("code",{children:"area"})," — Python не даст создать его экземпляр. Это контракт. Абстрактные классы полезны, когда есть общая логика для вынесения в базовый класс, и когда нужно обязать наследников реализовать конкретный интерфейс."]}),e.jsx(c,{questions:[{q:"Чем полиморфизм отличается от duck typing?",a:"Полиморфизм обычно опирается на общую иерархию классов (наследование от одного родителя), а duck typing вообще не требует общего предка — важно только наличие нужного метода у объекта, тип не проверяется явно."},{q:"Что произойдёт при попытке создать объект абстрактного класса напрямую?",a:"Python выбросит TypeError: Can't instantiate abstract class — до тех пор, пока не реализованы все методы, помеченные @abstractmethod."}]}),e.jsx(t,{id:"dunder",children:"15. Dunder-методы (magic methods)"}),e.jsx(s,{children:"Методы с двумя подчёркиваниями с обеих сторон. Позволяют интегрировать класс с языком: сравнение, арифметика, длина, итерация, вывод и так далее."}),e.jsx(i,{id:"dunder-str",children:"15.1 Строковое представление: __str__, __repr__"}),e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"          # для людей — print()

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"  # для разработчиков — REPL, отладка

p = Point(1, 2)
print(p)         # (1, 2)          — вызывает __str__
print(repr(p))   # Point(x=1, y=2) — вызывает __repr__`}),e.jsxs(x,{children:[e.jsx("code",{children:"__repr__"})," обязателен, ",e.jsx("code",{children:"__str__"})," опционален. Если ",e.jsx("code",{children:"__str__"})," не определён, ",e.jsx("code",{children:"print"})," использует ",e.jsx("code",{children:"__repr__"}),"."]}),e.jsx(i,{id:"dunder-eq",children:"15.2 Сравнение: __eq__, __lt__, __gt__..."}),e.jsx(r,{code:`class Money:
    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount < other.amount

a, b, c = Money(100), Money(100), Money(200)
print(a == b)  # True
print(a < c)   # True`}),e.jsxs(s,{children:["Декоратор ",e.jsx("code",{children:"@functools.total_ordering"})," — определяешь ",e.jsx("code",{children:"__eq__"})," и ",e.jsx("code",{children:"__lt__"}),", остальные (",e.jsx("code",{children:"<="}),", ",e.jsx("code",{children:">"}),", ",e.jsx("code",{children:">="}),") достроятся сами."]}),e.jsx(i,{id:"dunder-hash",children:"15.3 Хеш: __hash__"}),e.jsx(r,{code:`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))  # 2`}),e.jsxs(h,{children:["Если переопределяешь ",e.jsx("code",{children:"__eq__"}),", обычно нужно переопределить и ",e.jsx("code",{children:"__hash__"}),", иначе объект станет unhashable."]}),e.jsx(i,{id:"dunder-arith",children:"15.4 Арифметика: __add__, __sub__, __mul__..."}),e.jsx(r,{code:`class Vector:
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
print(v * 2)  # Vector(8, 12)`}),e.jsx(i,{id:"dunder-collection",children:"15.5 Длина, итерация, индексация"}),e.jsx(r,{code:`class Playlist:
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
print("b" in p)   # True`}),e.jsx(s,{children:"Всего несколько dunder-методов — и класс ведёт себя как встроенная коллекция."}),e.jsx(i,{id:"dunder-call",children:"15.6 Вызов объекта как функции: __call__"}),e.jsx(r,{code:`class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
print(double(5))  # 10 — объект ведёт себя как функция`}),e.jsxs(s,{children:["Полезно для стейтфулных «функций» — счётчиков, кешей, ML-моделей (",e.jsx("code",{children:"model(input)"}),")."]}),e.jsx(i,{id:"dunder-context",children:"15.7 Контекст-менеджеры: __enter__ / __exit__"}),e.jsx(r,{code:`class Timer:
    def __enter__(self):
        import time
        self.start = time.monotonic()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"Заняло {time.monotonic() - self.start:.2f}s")

with Timer():
    sum(range(10_000_000))
# Заняло 0.15s`}),e.jsx(b,{headers:["Категория","Методы",""],rows:[["Создание/уничтожение","__new__, __init__, __del__",""],["Строковое","__str__, __repr__, __format__, __bytes__",""],["Сравнение","__eq__, __ne__, __lt__, __le__, __gt__, __ge__",""],["Хеш и bool","__hash__, __bool__",""],["Арифметика","__add__, __radd__, __iadd__ и аналоги",""],["Коллекции","__len__, __getitem__, __setitem__, __iter__, __contains__",""],["Вызов","__call__",""],["Атрибутный доступ","__getattr__, __setattr__, __delattr__",""],["Контекст-менеджер","__enter__, __exit__",""],["Async","__aiter__, __anext__, __aenter__, __aexit__",""]]}),e.jsx(c,{questions:[{q:"В чём разница между __str__ и __repr__?",a:'__str__ — читаемое представление "для людей", вызывается print() и str(). __repr__ — техническое представление "для разработчиков" (отладка, REPL, коллекции). __repr__ обязателен, __str__ опционален — если его нет, используется __repr__.'},{q:"Что нужно сделать, чтобы объект можно было положить в set?",a:"Реализовать __hash__ (и обычно вместе с ним __eq__, чтобы объекты с одинаковым содержимым считались равными и не дублировались в множестве)."}]}),e.jsx(t,{id:"slots",children:"16. __slots__"}),e.jsxs(s,{children:["По умолчанию Python хранит атрибуты объекта в словаре ",e.jsx("code",{children:"__dict__"})," — гибко, но занимает память и медленнее. ",e.jsx("code",{children:"__slots__"})," — способ сказать: «у объекта могут быть только эти атрибуты, никакого __dict__»."]}),e.jsx(r,{code:`class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
p.x = 10       # ок
# p.z = 20     # AttributeError`}),e.jsx(j,{headers:["Плюсы","Минусы"],rows:[["меньше памяти (актуально для миллионов объектов)","нельзя добавлять атрибуты на лету"],["чуть быстрее доступ к атрибутам","нюансы с наследованием (наследник тоже должен иметь __slots__)"],["защита от опечаток в именах атрибутов","несовместимо с __dict__ и некоторыми библиотеками"]]}),e.jsx(t,{id:"dataclass",children:"17. @dataclass"}),e.jsxs(s,{children:["Написание классов вроде Point — рутина: конструктор, ",e.jsx("code",{children:"__eq__"}),", ",e.jsx("code",{children:"__repr__"}),". ",e.jsx("code",{children:"@dataclass"})," (модуль ",e.jsx("code",{children:"dataclasses"}),") генерирует это автоматически."]}),e.jsx(r,{code:`from dataclasses import dataclass

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
    y: int`}),e.jsx(u,{items:[e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"frozen=True"})," — объект неизменяемый (immutable), можно класть в set/dict ключом"]}),e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"slots=True"})," — сразу с __slots__ (Python 3.10+)"]}),e.jsxs(e.Fragment,{children:[e.jsx("code",{children:"kw_only=True"})," — только именованные аргументы"]})]}),e.jsxs(s,{children:["Значения по умолчанию для мутабельных типов — только через ",e.jsx("code",{children:"field(default_factory=list)"}),":"]}),e.jsx(r,{code:`from dataclasses import dataclass, field

@dataclass
class Team:
    name: str
    members: list = field(default_factory=list)`}),e.jsxs(h,{children:["Дефолтом писать ",e.jsx("code",{children:"members: list = []"})," нельзя — Python не даст. Это те же грабли с мутабельным атрибутом класса, что и в разделе 6."]}),e.jsx(t,{id:"metaclasses",children:"18. Метаклассы"}),e.jsxs(s,{children:["Класс — это тоже объект. А если объект, то у него есть свой класс. Класс класса — это метакласс. По умолчанию все классы наследуются от метакласса ",e.jsx("code",{children:"type"}),"."]}),e.jsx(r,{code:`class Foo:
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
    # def BadMethod(self): pass  # TypeError при определении класса!`}),e.jsxs(x,{children:[e.jsx("strong",{children:"Правило Тима Питерса:"})," «Метаклассы — глубокая магия, которой 99% пользователей не должны интересоваться. Если ты думаешь, что они тебе нужны — они тебе не нужны». Обычно можно обойтись классовыми декораторами или ",e.jsx("code",{children:"__init_subclass__"}),"."]}),e.jsx(t,{id:"protocol",children:"19. Protocol и структурная типизация"}),e.jsx(s,{children:"С Python 3.8 появились протоколы — способ описать интерфейс, которому объект должен соответствовать структурно, а не через наследование. Это формализация duck typing."}),e.jsx(r,{code:`from typing import Protocol

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
make_it_quack(Person())  # ок, у Person тоже есть quack()`}),e.jsxs(s,{children:["Ни Duck, ни Person не наследуются от Quackable, но type checker (mypy) проверит, что у них есть метод ",e.jsx("code",{children:"quack()"})," с нужной сигнатурой. Это гораздо более питонично, чем ABC с ",e.jsx("code",{children:"@abstractmethod"}),", когда речь про интерфейсы."]}),e.jsx(t,{id:"composition",children:"20. Композиция vs наследование"}),e.jsx(s,{children:"Наследование — сильная связь: наследник «знает» о родителе и ломается вместе с ним. Python-мир последние годы двигается в сторону композиции."}),e.jsx(r,{code:`# Наследование (is-a)
class Car(Engine):  # Car IS AN Engine — звучит странно, потому что это неправда
    ...

# Композиция (has-a)
class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS AN Engine — вот это уже логично

    def start(self):
        self.engine.start()`}),e.jsx(s,{children:"Наследование = «является». Композиция = «имеет»."}),e.jsx(x,{children:"Используй наследование, только если между классами реально отношение «is-a» (Dog is an Animal). Иначе — композиция."}),e.jsx(c,{questions:[{q:"Когда стоит выбирать композицию вместо наследования?",a:"Когда между классами нет отношения «является» (is-a), а есть отношение «имеет» (has-a). Например, Car не является Engine, но имеет Engine внутри себя — это композиция, а не наследование."}]}),e.jsx(t,{id:"solid",children:"21. Принципы SOLID"}),e.jsx(s,{children:"Пять принципов проектирования от Роберта Мартина (Uncle Bob). На собеседованиях спрашивают часто."}),e.jsx(i,{id:"solid-s",children:"S — Single Responsibility Principle (SRP)"}),e.jsx(s,{children:"Один класс — одна ответственность."}),e.jsx(r,{code:`# плохо: класс знает и про юзера, и про базу, и про email
class User:
    def save_to_db(self): ...
    def send_welcome_email(self): ...

# хорошо: разделяем
class User: ...
class UserRepository:
    def save(self, user): ...
class EmailService:
    def send_welcome(self, user): ...`}),e.jsx(i,{id:"solid-o",children:"O — Open/Closed Principle (OCP)"}),e.jsx(s,{children:"Классы должны быть открыты для расширения, но закрыты для модификации. Хотим добавить новый тип оплаты — не переписываем существующий код, а добавляем новый класс."}),e.jsx(r,{code:`# плохо
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
class PayPalPayment(Payment): ...  # добавили без изменения других классов`}),e.jsx(i,{id:"solid-l",children:"L — Liskov Substitution Principle (LSP)"}),e.jsx(s,{children:"Наследник должен уметь заменить родителя без сломов. Классический пример-антипаттерн — квадрат-прямоугольник:"}),e.jsx(r,{code:`class Rectangle:
    def __init__(self, w, h):
        self.w, self.h = w, h

    def set_width(self, w):
        self.w = w

class Square(Rectangle):
    def set_width(self, w):
        self.w = w
        self.h = w  # Square нарушает контракт: у Rectangle set_width не трогал height`}),e.jsx(s,{children:"Функция, работающая с Rectangle, может сломаться, если ей передать Square. Это нарушение LSP."}),e.jsx(i,{id:"solid-i",children:"I — Interface Segregation Principle (ISP)"}),e.jsx(s,{children:"Лучше много маленьких интерфейсов, чем один толстый."}),e.jsx(r,{code:`# плохо
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
    def eat(self): ...`}),e.jsx(i,{id:"solid-d",children:"D — Dependency Inversion Principle (DIP)"}),e.jsx(s,{children:"Зависимости должны идти к абстракциям, а не к конкретным классам."}),e.jsx(r,{code:`# плохо
class UserService:
    def __init__(self):
        self.db = PostgresDatabase()  # жёстко привязались к Postgres

# хорошо
class UserService:
    def __init__(self, db: Database):  # интерфейс/протокол
        self.db = db`}),e.jsx(s,{children:"Так UserService можно тестировать с in-memory базой, менять Postgres на MySQL и так далее."}),e.jsx(c,{questions:[{q:"Сформулируй Single Responsibility Principle своими словами.",a:"У каждого класса должна быть ровно одна причина для изменения — то есть одна зона ответственности. Если класс одновременно сохраняет данные в БД и отправляет письма, у него уже две причины меняться, и его стоит разделить."},{q:"В чём суть Liskov Substitution Principle на примере Rectangle/Square?",a:"Наследник должен вести себя совместимо с контрактом родителя. Square, меняющий и width, и height при вызове set_width, нарушает ожидания кода, написанного для Rectangle, — это и есть нарушение LSP."},{q:"Что даёт Dependency Inversion Principle на практике?",a:"Класс зависит от абстракции (интерфейса/протокола), а не от конкретной реализации — это позволяет подменять реализацию (например, базу данных) при тестировании или смене технологии, не переписывая сам класс."}]}),e.jsx(t,{id:"patterns",children:"22. Базовые паттерны проектирования"}),e.jsx(s,{children:"Без глубокого погружения — только карта, чтобы понимать, что упоминают в разговоре."}),e.jsx(i,{id:"pattern-singleton",children:"22.1 Singleton"}),e.jsx(s,{children:"Гарантирует, что объект класса существует только в единственном экземпляре."}),e.jsx(r,{code:`class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`}),e.jsx(s,{children:"В Python чаще делают проще — через модуль: он импортируется один раз, все переменные в нём фактически синглтон."}),e.jsx(i,{id:"pattern-factory",children:"22.2 Factory"}),e.jsx(s,{children:"Класс/функция, задача которой — создавать объекты нужного типа."}),e.jsx(r,{code:`class ShapeFactory:
    @staticmethod
    def create(kind, **kwargs):
        if kind == "circle":
            return Circle(**kwargs)
        elif kind == "square":
            return Square(**kwargs)
        raise ValueError(f"Unknown shape: {kind}")`}),e.jsx(i,{id:"pattern-strategy",children:"22.3 Strategy"}),e.jsx(s,{children:"Инкапсулируем поведение в отдельный класс и передаём в основной класс через композицию."}),e.jsx(r,{code:`class SortStrategy(Protocol):
    def sort(self, data): ...

class QuickSort:
    def sort(self, data): ...

class MergeSort:
    def sort(self, data): ...

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy

    def run(self, data):
        return self.strategy.sort(data)`}),e.jsx(i,{id:"pattern-observer",children:"22.4 Observer"}),e.jsx(s,{children:"Объекты подписываются на события другого объекта."}),e.jsx(r,{code:`class Publisher:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, fn):
        self.subscribers.append(fn)

    def publish(self, event):
        for fn in self.subscribers:
            fn(event)`}),e.jsx(i,{id:"pattern-decorator",children:"22.5 Decorator (паттерн)"}),e.jsx(s,{children:"Не путать с декораторами Python. Паттерн — про оборачивание объекта другим объектом, чтобы добавить поведение."}),e.jsx(i,{id:"pattern-repository",children:"22.6 Repository"}),e.jsx(s,{children:"Разделяет доменную логику и хранилище."}),e.jsx(r,{code:`class UserRepository:
    def get_by_id(self, user_id) -> User: ...
    def save(self, user: User) -> None: ...`}),e.jsx(s,{children:"UserService работает с UserRepository, не зная, там Postgres, in-memory или mock."}),e.jsx(c,{questions:[{q:"Как реализовать Singleton в Python двумя разными способами?",a:"Через переопределение __new__ так, чтобы он возвращал один и тот же сохранённый экземпляр при повторных вызовах. Или проще — через модуль: он импортируется в Python единожды, поэтому все объявленные в нём переменные и объекты фактически ведут себя как синглтон."},{q:"В чём разница между паттерном Strategy и просто if/elif в коде?",a:"Strategy выносит каждый вариант поведения в отдельный класс с общим интерфейсом и передаёт нужную реализацию через композицию — это соответствует Open/Closed Principle: добавить новую стратегию можно новым классом, не трогая существующий код с условиями."}]}),e.jsx(t,{id:"checklist",children:"Мини-чеклист «знаю ли я ООП»"}),e.jsx(s,{children:"Пройдись глазами и убедись, что можешь объяснить своими словами:"}),e.jsx(v,{items:["Что делает __init__ и почему он не совсем конструктор","Что такое self и почему первый аргумент так называется","Разница между атрибутом класса и атрибутом экземпляра, где грабли","Как работает name mangling для __private","Зачем @property вместо публичного атрибута","Как работает super() и почему без него в наследнике часто плохо","Что такое MRO и как его посмотреть","В чём разница между duck typing, ABC и Protocol","Какие dunder-методы нужны, чтобы объект вёл себя как коллекция","Зачем __slots__ и когда это стоит применять","Что генерирует @dataclass","Что такое метакласс и почему он не нужен 99% времени","Разница между наследованием и композицией — когда что выбирать","Пять принципов SOLID своими словами с примером на каждый","Как реализовать Singleton, Factory, Strategy, Observer"]}),e.jsx(x,{children:"Если по каждому пункту можешь дать 30-секундный ответ с примером кода — по ООП ты закрыт на уровне senior-собеседования."})]})}export{w as default};
