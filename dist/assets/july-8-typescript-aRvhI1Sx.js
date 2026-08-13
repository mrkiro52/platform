import{j as e}from"./index-BzfS3ijj.js";import{T as n,b as d,a}from"./TheoryTable-D-yA9GWI.js";const i={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#20beff",border:"#2a2a3a"};function o({children:r,caption:c}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:r}),c&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:c})]})}function s({n:r,children:c}){return e.jsxs("div",{style:{display:"flex",gap:12,margin:"14px 0",alignItems:"flex-start"},children:[e.jsx("span",{style:{flexShrink:0,width:26,height:26,borderRadius:"50%",border:"1.5px solid var(--accent-lime)",color:"var(--accent-lime)",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2},children:r}),e.jsx("p",{style:{margin:0,flex:1},children:c})]})}function t({n:r,title:c,children:l}){return e.jsxs("div",{style:{margin:"16px 0 16px 14px",paddingLeft:16,borderLeft:"2px dashed var(--border-color)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,marginBottom:8},children:[e.jsxs("span",{style:{background:"rgba(32,190,255,0.12)",color:"var(--accent-lime)",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999,flexShrink:0},children:["Шаг ",r]}),e.jsx("span",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:14},children:c})]}),l]})}function h({children:r}){return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,margin:"18px 0 8px"},children:[e.jsx("span",{style:{background:"rgba(96,165,250,0.14)",color:"var(--accent-lime)",fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:999},children:"✓ Собираем вместе"}),e.jsx("span",{style:{color:"var(--text-primary)",fontWeight:600,fontSize:14},children:r})]})}function u(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"TypeScript"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Frontend-разработка"}),e.jsx("p",{className:"theory-date",children:"8 июля 2026"}),e.jsxs("p",{children:["TypeScript — надстройка над JavaScript, добавляющая ",e.jsx("strong",{children:"статическую типизацию"}),". Код на TypeScript компилируется (транспилируется) в обычный JavaScript, поэтому работает везде, где работает JS, но ошибки — опечатка в имени поля, передача строки вместо числа — ловятся ещё до запуска, прямо в редакторе. Разберём всё, что нужно знать для уверенного старта: от базовых типов до дженериков."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Зачем нужен TypeScript"}),e.jsxs(s,{n:1,children:["В обычном JavaScript тип переменной не проверяется заранее: ошибку «прибавили число к undefined» ты увидишь только когда код реально выполнится — возможно, уже у пользователя. TypeScript добавляет слой"," ",e.jsx("strong",{children:"статической проверки типов"}),": компилятор анализирует код и указывает на несоответствия типов ещё на этапе написания, до запуска программы."]}),e.jsx(o,{caption:"JS проверяет типы во время выполнения (ошибка всплывает в проде), TypeScript — во время компиляции (ошибка видна сразу в редакторе)",children:e.jsxs("svg",{viewBox:"0 0 520 150",width:"100%",style:{maxWidth:520},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("text",{x:"130",y:"20",fill:i.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"JavaScript"}),e.jsx("rect",{x:"30",y:"35",width:"200",height:"34",rx:"6",fill:"var(--bg-tertiary)",stroke:i.border}),e.jsx("text",{x:"130",y:"57",fill:i.sub,fontSize:"11",textAnchor:"middle",children:"пишешь код"}),e.jsx("line",{x1:"130",y1:"69",x2:"130",y2:"90",stroke:i.sub,markerEnd:"url(#tsA)"}),e.jsx("rect",{x:"30",y:"92",width:"200",height:"34",rx:"6",fill:"rgba(248,113,113,0.10)",stroke:"#f87171"}),e.jsx("text",{x:"130",y:"114",fill:"#f87171",fontSize:"11",textAnchor:"middle",children:"ошибка находится в проде 💥"}),e.jsx("text",{x:"390",y:"20",fill:i.lime,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"TypeScript"}),e.jsx("rect",{x:"290",y:"35",width:"200",height:"34",rx:"6",fill:"var(--bg-tertiary)",stroke:i.border}),e.jsx("text",{x:"390",y:"57",fill:i.sub,fontSize:"11",textAnchor:"middle",children:"пишешь код"}),e.jsx("line",{x1:"390",y1:"69",x2:"390",y2:"90",stroke:i.sub,markerEnd:"url(#tsA)"}),e.jsx("rect",{x:"290",y:"92",width:"200",height:"34",rx:"6",fill:"rgba(32,190,255,0.10)",stroke:i.lime}),e.jsx("text",{x:"390",y:"114",fill:i.lime,fontSize:"11",textAnchor:"middle",children:"ошибка найдена сразу ✓"}),e.jsx("defs",{children:e.jsx("marker",{id:"tsA",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:i.sub})})})]})}),e.jsx(n,{language:"bash",code:`npm install -D typescript   # ставим компилятор
npx tsc file.ts             # компилирует file.ts → file.js`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Базовые типы"}),e.jsxs(s,{n:2,children:["Основные (примитивные) типы почти совпадают с JS-типами, но их можно явно указать при объявлении переменной через двоеточие: ",e.jsx("code",{children:"имя: тип"}),"."]}),e.jsx(n,{language:"ts",code:`let age: number = 25
let name: string = "Аня"
let isActive: boolean = true
let list: number[] = [1, 2, 3]        // массив чисел
let tags: Array<string> = ["a", "b"]  // то же самое другим синтаксисом

let anything: any = 42        // any отключает проверку типов — избегай!
let value: unknown = fetchData()  // unknown — безопасная альтернатива any
let nothing: void = undefined  // void — функция ничего не возвращает
let never_: never              // never — значение никогда не наступит (напр. после throw)`}),e.jsx(d,{headers:["Тип","Когда использовать"],rows:[["any","отключает проверку типов — используй только как временный костыль"],["unknown","безопасная альтернатива any: перед использованием нужно сузить тип"],["void","функция ничего не возвращает"],["never","функция никогда не завершается нормально (throw, бесконечный цикл)"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Вывод типов (type inference)"}),e.jsxs(s,{n:3,children:["TypeScript умеет ",e.jsx("strong",{children:"сам определять тип"})," по присвоенному значению — писать тип вручную нужно не всегда. Явно указывать тип обязательно там, где значения при объявлении ещё нет (например, параметры функций)."]}),e.jsx(n,{language:"ts",code:`let count = 5          // TS сам понял: count: number
count = "текст"        // ❌ Ошибка: Type 'string' is not assignable to type 'number'

function double(x: number) {   // параметр — типизируем ОБЯЗАТЕЛЬНО
  return x * 2                 // а возврат TS выведет сам: number
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Объекты: interface и type"}),e.jsxs(s,{n:4,children:["Форму объекта описывают через ",e.jsx("code",{children:"interface"})," или ",e.jsx("code",{children:"type"}),". Оба способа похожи: перечисляют поля объекта и их типы, а TypeScript проверяет, что реальный объект им соответствует."]}),e.jsx(n,{language:"ts",code:`interface User {
  id: number
  name: string
  email: string
}

const user: User = { id: 1, name: 'Аня', email: 'anya@mail.com' }
// user.age = 30   ❌ Ошибка: поля 'age' нет в интерфейсе User

// type alias — альтернативный синтаксис
type Point = { x: number; y: number }`}),e.jsxs(s,{n:5,children:["Разница на практике невелика: ",e.jsx("code",{children:"interface"})," можно дополнять новыми полями в другом месте кода (declaration merging) и удобнее для описания объектов/классов; ",e.jsx("code",{children:"type"})," более гибок — им можно назвать union, intersection, примитив или кортеж. По умолчанию для объектов чаще берут"," ",e.jsx("code",{children:"interface"}),", а для всего остального — ",e.jsx("code",{children:"type"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Опциональные и readonly поля"}),e.jsxs(s,{n:6,children:["Знак ",e.jsx("code",{children:"?"})," после имени поля делает его необязательным, ",e.jsx("code",{children:"readonly"})," — запрещает менять поле после создания объекта."]}),e.jsx(n,{language:"ts",code:`interface User {
  id: number
  name: string
  age?: number          // необязательное поле — может отсутствовать
  readonly createdAt: string  // нельзя переприсвоить после создания
}

const u: User = { id: 1, name: 'Аня', createdAt: '2026-07-08' }  // без age — ок
u.createdAt = '2026-07-09'   // ❌ Ошибка: Cannot assign to 'createdAt' — readonly`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Типизация функций"}),e.jsxs(s,{n:7,children:["У функции типизируют каждый параметр и (обычно неявно, но можно и явно) возвращаемое значение. Параметры можно делать необязательными (",e.jsx("code",{children:"?"}),") или со значением по умолчанию."]}),e.jsx(n,{language:"ts",code:`function greet(name: string, excited?: boolean): string {
  return excited ? \`Привет, \${name}!!!\` : \`Привет, \${name}\`
}

function add(a: number, b: number = 0): number {   // b по умолчанию 0
  return a + b
}

// Стрелочная функция
const multiply = (a: number, b: number): number => a * b`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Union и intersection типы"}),e.jsxs(s,{n:8,children:[e.jsx("strong",{children:"Union"})," (",e.jsx("code",{children:"|"}),") — значение может быть ОДНИМ ИЗ нескольких типов."," ",e.jsx("strong",{children:"Intersection"})," (",e.jsx("code",{children:"&"}),") — тип объединяет ВСЕ поля сразу нескольких типов. Отдельный частный случай union — ",e.jsx("strong",{children:"литеральные типы"}),", где вместо целого типа указывают конкретные допустимые значения."]}),e.jsx(n,{language:"ts",code:`let id: string | number   // id может быть строкой ИЛИ числом
id = "abc"    // ок
id = 42       // тоже ок
id = true     // ❌ Ошибка

type Status = 'idle' | 'loading' | 'success' | 'error'   // литеральный union
let status: Status = 'loading'
status = 'done'   // ❌ Ошибка: 'done' не входит в допустимые значения

type Named = { name: string }
type Aged = { age: number }
type Person = Named & Aged     // объект должен иметь ОБА поля: name И age`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Сужение типов (type narrowing)"}),e.jsxs(s,{n:9,children:["Когда переменная имеет union-тип, перед использованием часто нужно узнать, какой из вариантов пришёл именно сейчас. Это называют ",e.jsx("strong",{children:"сужением типа"}),": внутри проверки (",e.jsx("code",{children:"if"}),") TypeScript сам «сужает» union до конкретного типа."]}),e.jsxs(t,{n:1,title:"Простое сужение через typeof",children:[e.jsxs("p",{children:["Внутри ветки ",e.jsx("code",{children:"if (typeof id === 'string')"})," TypeScript «запоминает», что дальше в этом блоке ",e.jsx("code",{children:"id"})," точно строка, и разрешает методы строк. В блоке ",e.jsx("code",{children:"else"})," он понимает, что раз это не строка — значит, число."]}),e.jsx(n,{language:"ts",code:`function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())   // здесь TS знает: id — string
  } else {
    console.log(id.toFixed(2))      // а здесь: id — number
  }
}`})]}),e.jsxs(t,{n:2,title:"Более сложный случай — объекты разной формы",children:[e.jsxs("p",{children:["Когда union состоит не из примитивов, а из объектов, ",e.jsx("code",{children:"typeof"})," уже не поможет (для обоих"," ",e.jsx("code",{children:"typeof"})," вернёт ",e.jsx("code",{children:'"object"'}),"). Заведём у каждого варианта общее поле-метку — например, ",e.jsx("code",{children:"kind"})," — со своим уникальным значением."]}),e.jsx(n,{language:"ts",code:`type Circle = { kind: 'circle'; radius: number }
type Square = { kind: 'square'; side: number }
type Shape = Circle | Square   // Shape — либо круг, либо квадрат`})]}),e.jsxs(t,{n:3,title:"Сужаем по полю-метке kind",children:[e.jsxs("p",{children:["Такую конструкцию называют ",e.jsx("strong",{children:"дискриминированным union"}),". Проверка"," ",e.jsx("code",{children:"shape.kind === 'circle'"})," сужает тип внутри своей ветки до ",e.jsx("code",{children:"Circle"})," — TS позволит обратиться к ",e.jsx("code",{children:"shape.radius"}),". В ветке после — автоматически до"," ",e.jsx("code",{children:"Square"}),", и станет доступно поле ",e.jsx("code",{children:"shape.side"}),"."]}),e.jsx(n,{language:"ts",code:`function area(shape: Shape): number {
  if (shape.kind === 'circle') return Math.PI * shape.radius ** 2   // shape: Circle
  return shape.side ** 2   // TS знает, что здесь shape — Square
}`})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Дженерики (generics)"}),e.jsxs(s,{n:10,children:[e.jsx("strong",{children:"Дженерик"})," — «тип-параметр»: функция или структура работает с типом, который указывают при её использовании, а не жёстко зашивают заранее. Это позволяет писать один код, переиспользуемый для разных типов, но с сохранением проверки типов."]}),e.jsxs(t,{n:1,title:"Проблема без дженерика",children:[e.jsxs("p",{children:["Допустим, нужна функция, которая просто возвращает переданное значение. Без дженериков пришлось бы писать отдельную функцию под каждый тип — или использовать ",e.jsx("code",{children:"any"}),", что отключает всю пользу типизации."]}),e.jsx(n,{language:"ts",code:`function identityNumber(value: number): number { return value }
function identityString(value: string): string { return value }
// ...и так под каждый новый тип — дублирование кода`})]}),e.jsxs(t,{n:2,title:"Вводим тип-параметр T",children:[e.jsxs("p",{children:[e.jsx("code",{children:"<T>"})," после имени функции объявляет «тип-переменную» — конкретный тип подставится при вызове. Теперь одна функция работает с любым типом, но связь между входом и выходом сохраняется: что дали на вход — то же самое вернётся, и TypeScript это проверит."]}),e.jsx(n,{language:"ts",code:`function identity<T>(value: T): T {
  return value
}`})]}),e.jsxs(t,{n:3,title:"Используем — TS сам выводит T",children:[e.jsxs("p",{children:[e.jsx("code",{children:"T"})," можно указать явно в угловых скобках, а можно позволить TypeScript вывести его самостоятельно по переданному аргументу — как с обычным выводом типов."]}),e.jsx(n,{language:"ts",code:`identity<number>(5)        // T = number, явно указали
identity<string>('привет')  // T = string, явно указали
identity(true)              // T = boolean — TS вывел сам по аргументу`})]}),e.jsxs(t,{n:4,title:"Дженерик у интерфейса — не только у функций",children:[e.jsx("p",{children:"Та же идея применима к интерфейсам: опишем «универсальный ответ API», который может содержать данные любого типа, но при использовании мы явно скажем, какого именно."}),e.jsx(n,{language:"ts",code:`interface ApiResponse<T> {
  data: T
  status: number
}
const res: ApiResponse<string[]> = { data: ['a', 'b'], status: 200 }
// TS проверит, что res.data — именно массив строк`})]}),e.jsxs(a,{title:"Где встречается на практике",children:["Дженерики повсюду во встроенных типах: ",e.jsx("code",{children:"Array<T>"}),", ",e.jsx("code",{children:"Promise<T>"}),". Когда пишешь ",e.jsx("code",{children:"fetch(...).then((data: User[]) => ...)"}),", ты фактически используешь дженерик"," ",e.jsx("code",{children:"Promise<User[]>"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Enum — перечисления"}),e.jsxs(s,{n:11,children:[e.jsx("code",{children:"enum"})," задаёт именованный набор допустимых констант — удобнее и безопаснее «магических строк», разбросанных по коду."]}),e.jsx(n,{language:"ts",code:`enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}

function checkAccess(role: Role) {
  if (role === Role.Admin) return 'полный доступ'
  return 'ограниченный доступ'
}
checkAccess(Role.Admin)`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"11. Классы в TypeScript"}),e.jsxs(s,{n:12,children:["Классы TypeScript расширяют классы JS модификаторами доступа: ",e.jsx("code",{children:"public"})," (по умолчанию, виден отовсюду), ",e.jsx("code",{children:"private"})," (только внутри класса), ",e.jsx("code",{children:"protected"})," (внутри класса и наследников). Класс может реализовывать интерфейс через ",e.jsx("code",{children:"implements"}),"."]}),e.jsxs(t,{n:1,title:"Опишем контракт через интерфейс",children:[e.jsxs("p",{children:["Сначала договоримся, ",e.jsx("strong",{children:"что"})," должен уметь делать класс — какие методы у него обязаны быть. Это и есть интерфейс: контракт без реализации."]}),e.jsx(n,{language:"ts",code:`interface Movable {
  move(dx: number, dy: number): void
}`})]}),e.jsxs(t,{n:2,title:"Заводим приватное состояние",children:[e.jsxs("p",{children:["Координаты робота — его внутренние данные, снаружи их менять напрямую не должны. Помечаем поля"," ",e.jsx("code",{children:"private"})," — доступ к ним есть только у методов самого класса."]}),e.jsx(n,{language:"ts",code:`class Robot {
  private x: number = 0
  private y: number = 0
}`})]}),e.jsxs(t,{n:3,title:"Добавляем публичное поле и конструктор",children:[e.jsxs("p",{children:["Имя робота, наоборот, должно быть видно снаружи — значит, ",e.jsx("code",{children:"public"})," (это модификатор по умолчанию, но полезно писать его явно для ясности). Конструктор задаёт значение при создании объекта."]}),e.jsx(n,{language:"ts",code:`class Robot {
  private x: number = 0
  private y: number = 0
  public name: string

  constructor(name: string) {
    this.name = name
  }
}`})]}),e.jsxs(t,{n:4,title:"Реализуем контракт Movable",children:[e.jsxs("p",{children:["Дописываем ",e.jsx("code",{children:"implements Movable"})," к объявлению класса и реализуем метод"," ",e.jsx("code",{children:"move"}),", обещанный интерфейсом. Если забыть его реализовать — TypeScript укажет на ошибку ещё до запуска."]}),e.jsx(n,{language:"ts",code:`class Robot implements Movable {
  // ...поля и конструктор как выше...

  move(dx: number, dy: number) {
    this.x += dx
    this.y += dy
  }
}`})]}),e.jsx(h,{children:"Класс Robot целиком"}),e.jsx(n,{language:"ts",code:`interface Movable {
  move(dx: number, dy: number): void
}

class Robot implements Movable {
  private x: number = 0
  private y: number = 0
  public name: string

  constructor(name: string) {
    this.name = name
  }

  move(dx: number, dy: number) {
    this.x += dx
    this.y += dy
  }
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"12. tsconfig.json и компиляция"}),e.jsxs(s,{n:13,children:["Настройки компилятора хранят в файле ",e.jsx("code",{children:"tsconfig.json"}),": какую версию JS собирать (",e.jsx("code",{children:"target"}),"), насколько строго проверять типы (",e.jsx("code",{children:"strict"}),"), куда класть результат. Опцию ",e.jsx("code",{children:"strict: true"})," стоит включать почти всегда — она включает более полный набор проверок (например, запрещает неявный ",e.jsx("code",{children:"any"}),")."]}),e.jsx(n,{language:"json",code:`{
  "compilerOptions": {
    "target": "ES2020",     // в какой JS компилировать
    "strict": true,          // включить строгие проверки типов
    "module": "ESNext",
    "jsx": "react-jsx",      // если используется React
    "outDir": "./dist"
  }
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"13. TypeScript и React (коротко)"}),e.jsxs(s,{n:14,children:["Файлы с JSX-разметкой на TypeScript получают расширение ",e.jsx("code",{children:".tsx"}),". Типизируют пропсы компонента через интерфейс и указывают тип состояния в дженерике ",e.jsx("code",{children:"useState<T>"}),"."]}),e.jsxs(t,{n:1,title:"Описываем пропсы компонента",children:[e.jsxs("p",{children:["Прежде чем писать сам компонент, описываем, какие пропсы он принимает и какого они типа — интерфейсом, как для обычного объекта. ",e.jsx("code",{children:"disabled?"})," — необязательный проп."]}),e.jsx(n,{language:"ts",code:`interface ButtonProps {
  label: string
  onClick: () => void   // функция без аргументов, ничего не возвращающая
  disabled?: boolean
}`})]}),e.jsxs(t,{n:2,title:"Используем интерфейс в самом компоненте",children:[e.jsxs("p",{children:["Указываем тип у деструктурированных пропсов функции-компонента — теперь при использовании"," ",e.jsx("code",{children:"<Button />"})," в другом месте TypeScript проверит, что переданы все обязательные пропсы нужных типов."]}),e.jsx(n,{language:"tsx",code:`function Button({ label, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}`})]}),e.jsxs(t,{n:3,title:"Типизируем состояние — useState<T>",children:[e.jsxs("p",{children:["У ",e.jsx("code",{children:"useState"})," тип значения обычно выводится из начального значения сам, но если начальное значение ",e.jsx("code",{children:"null"}),", а храниться позже будет что-то другое — тип указываем явно через дженерик."]}),e.jsx(n,{language:"tsx",code:`const [count, setCount] = useState<number>(0)               // тип очевиден и так
const [user, setUser] = useState<User | null>(null)  // изначально null, потом станет User`})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs(s,{n:15,children:["TypeScript добавляет к JavaScript статическую проверку типов, ловя ошибки до запуска кода. Базовый набор — примитивные типы, ",e.jsx("code",{children:"interface"}),"/",e.jsx("code",{children:"type"})," для формы объектов, опциональные и"," ",e.jsx("code",{children:"readonly"})," поля, типизация функций. Union и intersection типы вместе с сужением типов описывают более сложные сценарии, а дженерики позволяют писать переиспользуемый код без потери типобезопасности. ",e.jsx("code",{children:"enum"})," заменяет магические строки, классы получают модификаторы доступа, а настройки живут в ",e.jsx("code",{children:"tsconfig.json"}),". Этого набора достаточно, чтобы уверенно писать и читать типизированный код, включая React-компоненты на ",e.jsx("code",{children:".tsx"}),"."]})]})]})}export{u as default};
