import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#FFD60A', yellow: '#facc15', blue: '#60a5fa', border: '#2a2a3a' }

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

// Нумерованный абзац — единица деления конспекта (для будущих слайдов)
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

function Step({ n, title, children }) {
  return (
    <div style={{ margin: '16px 0 16px 14px', paddingLeft: 16, borderLeft: '2px dashed var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          background: 'rgba(255,214,10,0.12)', color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700,
          padding: '3px 10px', borderRadius: 999, flexShrink: 0,
        }}>Шаг {n}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function FinalLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 8px' }}>
      <span style={{
        background: 'rgba(96,165,250,0.14)', color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700,
        padding: '3px 10px', borderRadius: 999,
      }}>✓ Собираем вместе</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{children}</span>
    </div>
  )
}

export default function July8TypeScriptTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">TypeScript</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">8 июля 2026</p>
        <p>
          TypeScript — надстройка над JavaScript, добавляющая <strong>статическую типизацию</strong>. Код на
          TypeScript компилируется (транспилируется) в обычный JavaScript, поэтому работает везде, где работает
          JS, но ошибки — опечатка в имени поля, передача строки вместо числа — ловятся ещё до запуска, прямо в
          редакторе. Разберём всё, что нужно знать для уверенного старта: от базовых типов до дженериков.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужен TypeScript</h2>
        <P n={1}>
          В обычном JavaScript тип переменной не проверяется заранее: ошибку «прибавили число к undefined» ты
          увидишь только когда код реально выполнится — возможно, уже у пользователя. TypeScript добавляет слой{' '}
          <strong>статической проверки типов</strong>: компилятор анализирует код и указывает на несоответствия
          типов ещё на этапе написания, до запуска программы.
        </P>
        <Fig caption="JS проверяет типы во время выполнения (ошибка всплывает в проде), TypeScript — во время компиляции (ошибка видна сразу в редакторе)">
          <svg viewBox="0 0 520 150" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            <text x="130" y="20" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">JavaScript</text>
            <rect x="30" y="35" width="200" height="34" rx="6" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="130" y="57" fill={C.sub} fontSize="11" textAnchor="middle">пишешь код</text>
            <line x1="130" y1="69" x2="130" y2="90" stroke={C.sub} markerEnd="url(#tsA)" />
            <rect x="30" y="92" width="200" height="34" rx="6" fill="rgba(248,113,113,0.10)" stroke="#f87171" />
            <text x="130" y="114" fill="#f87171" fontSize="11" textAnchor="middle">ошибка находится в проде 💥</text>
            <text x="390" y="20" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">TypeScript</text>
            <rect x="290" y="35" width="200" height="34" rx="6" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="390" y="57" fill={C.sub} fontSize="11" textAnchor="middle">пишешь код</text>
            <line x1="390" y1="69" x2="390" y2="90" stroke={C.sub} markerEnd="url(#tsA)" />
            <rect x="290" y="92" width="200" height="34" rx="6" fill="rgba(255,214,10,0.10)" stroke={C.lime} />
            <text x="390" y="114" fill={C.lime} fontSize="11" textAnchor="middle">ошибка найдена сразу ✓</text>
            <defs>
              <marker id="tsA" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryCode language="bash" code={`npm install -D typescript   # ставим компилятор
npx tsc file.ts             # компилирует file.ts → file.js`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Базовые типы</h2>
        <P n={2}>
          Основные (примитивные) типы почти совпадают с JS-типами, но их можно явно указать при объявлении
          переменной через двоеточие: <code>имя: тип</code>.
        </P>
        <TheoryCode language="ts" code={`let age: number = 25
let name: string = "Аня"
let isActive: boolean = true
let list: number[] = [1, 2, 3]        // массив чисел
let tags: Array<string> = ["a", "b"]  // то же самое другим синтаксисом

let anything: any = 42        // any отключает проверку типов — избегай!
let value: unknown = fetchData()  // unknown — безопасная альтернатива any
let nothing: void = undefined  // void — функция ничего не возвращает
let never_: never              // never — значение никогда не наступит (напр. после throw)`} />
        <TheoryTable
          headers={['Тип', 'Когда использовать']}
          rows={[
            ['any', 'отключает проверку типов — используй только как временный костыль'],
            ['unknown', 'безопасная альтернатива any: перед использованием нужно сузить тип'],
            ['void', 'функция ничего не возвращает'],
            ['never', 'функция никогда не завершается нормально (throw, бесконечный цикл)'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Вывод типов (type inference)</h2>
        <P n={3}>
          TypeScript умеет <strong>сам определять тип</strong> по присвоенному значению — писать тип вручную
          нужно не всегда. Явно указывать тип обязательно там, где значения при объявлении ещё нет (например,
          параметры функций).
        </P>
        <TheoryCode language="ts" code={`let count = 5          // TS сам понял: count: number
count = "текст"        // ❌ Ошибка: Type 'string' is not assignable to type 'number'

function double(x: number) {   // параметр — типизируем ОБЯЗАТЕЛЬНО
  return x * 2                 // а возврат TS выведет сам: number
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Объекты: interface и type</h2>
        <P n={4}>
          Форму объекта описывают через <code>interface</code> или <code>type</code>. Оба способа похожи:
          перечисляют поля объекта и их типы, а TypeScript проверяет, что реальный объект им соответствует.
        </P>
        <TheoryCode language="ts" code={`interface User {
  id: number
  name: string
  email: string
}

const user: User = { id: 1, name: 'Аня', email: 'anya@mail.com' }
// user.age = 30   ❌ Ошибка: поля 'age' нет в интерфейсе User

// type alias — альтернативный синтаксис
type Point = { x: number; y: number }`} />
        <P n={5}>
          Разница на практике невелика: <code>interface</code> можно дополнять новыми полями в другом месте кода
          (declaration merging) и удобнее для описания объектов/классов; <code>type</code> более гибок — им можно
          назвать union, intersection, примитив или кортеж. По умолчанию для объектов чаще берут{' '}
          <code>interface</code>, а для всего остального — <code>type</code>.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Опциональные и readonly поля</h2>
        <P n={6}>
          Знак <code>?</code> после имени поля делает его необязательным, <code>readonly</code> — запрещает
          менять поле после создания объекта.
        </P>
        <TheoryCode language="ts" code={`interface User {
  id: number
  name: string
  age?: number          // необязательное поле — может отсутствовать
  readonly createdAt: string  // нельзя переприсвоить после создания
}

const u: User = { id: 1, name: 'Аня', createdAt: '2026-07-08' }  // без age — ок
u.createdAt = '2026-07-09'   // ❌ Ошибка: Cannot assign to 'createdAt' — readonly`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Типизация функций</h2>
        <P n={7}>
          У функции типизируют каждый параметр и (обычно неявно, но можно и явно) возвращаемое значение.
          Параметры можно делать необязательными (<code>?</code>) или со значением по умолчанию.
        </P>
        <TheoryCode language="ts" code={`function greet(name: string, excited?: boolean): string {
  return excited ? \`Привет, \${name}!!!\` : \`Привет, \${name}\`
}

function add(a: number, b: number = 0): number {   // b по умолчанию 0
  return a + b
}

// Стрелочная функция
const multiply = (a: number, b: number): number => a * b`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Union и intersection типы</h2>
        <P n={8}>
          <strong>Union</strong> (<code>|</code>) — значение может быть ОДНИМ ИЗ нескольких типов.{' '}
          <strong>Intersection</strong> (<code>&amp;</code>) — тип объединяет ВСЕ поля сразу нескольких типов.
          Отдельный частный случай union — <strong>литеральные типы</strong>, где вместо целого типа указывают
          конкретные допустимые значения.
        </P>
        <TheoryCode language="ts" code={`let id: string | number   // id может быть строкой ИЛИ числом
id = "abc"    // ок
id = 42       // тоже ок
id = true     // ❌ Ошибка

type Status = 'idle' | 'loading' | 'success' | 'error'   // литеральный union
let status: Status = 'loading'
status = 'done'   // ❌ Ошибка: 'done' не входит в допустимые значения

type Named = { name: string }
type Aged = { age: number }
type Person = Named & Aged     // объект должен иметь ОБА поля: name И age`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Сужение типов (type narrowing)</h2>
        <P n={9}>
          Когда переменная имеет union-тип, перед использованием часто нужно узнать, какой из вариантов пришёл
          именно сейчас. Это называют <strong>сужением типа</strong>: внутри проверки (<code>if</code>)
          TypeScript сам «сужает» union до конкретного типа.
        </P>
        <Step n={1} title="Простое сужение через typeof">
          <p>
            Внутри ветки <code>if (typeof id === 'string')</code> TypeScript «запоминает», что дальше в этом
            блоке <code>id</code> точно строка, и разрешает методы строк. В блоке <code>else</code> он понимает,
            что раз это не строка — значит, число.
          </p>
          <TheoryCode language="ts" code={`function printId(id: string | number) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase())   // здесь TS знает: id — string
  } else {
    console.log(id.toFixed(2))      // а здесь: id — number
  }
}`} />
        </Step>

        <Step n={2} title="Более сложный случай — объекты разной формы">
          <p>
            Когда union состоит не из примитивов, а из объектов, <code>typeof</code> уже не поможет (для обоих{' '}
            <code>typeof</code> вернёт <code>"object"</code>). Заведём у каждого варианта общее поле-метку —
            например, <code>kind</code> — со своим уникальным значением.
          </p>
          <TheoryCode language="ts" code={`type Circle = { kind: 'circle'; radius: number }
type Square = { kind: 'square'; side: number }
type Shape = Circle | Square   // Shape — либо круг, либо квадрат`} />
        </Step>

        <Step n={3} title="Сужаем по полю-метке kind">
          <p>
            Такую конструкцию называют <strong>дискриминированным union</strong>. Проверка{' '}
            <code>shape.kind === 'circle'</code> сужает тип внутри своей ветки до <code>Circle</code> — TS
            позволит обратиться к <code>shape.radius</code>. В ветке после — автоматически до{' '}
            <code>Square</code>, и станет доступно поле <code>shape.side</code>.
          </p>
          <TheoryCode language="ts" code={`function area(shape: Shape): number {
  if (shape.kind === 'circle') return Math.PI * shape.radius ** 2   // shape: Circle
  return shape.side ** 2   // TS знает, что здесь shape — Square
}`} />
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Дженерики (generics)</h2>
        <P n={10}>
          <strong>Дженерик</strong> — «тип-параметр»: функция или структура работает с типом, который указывают
          при её использовании, а не жёстко зашивают заранее. Это позволяет писать один код, переиспользуемый для
          разных типов, но с сохранением проверки типов.
        </P>
        <Step n={1} title="Проблема без дженерика">
          <p>
            Допустим, нужна функция, которая просто возвращает переданное значение. Без дженериков пришлось бы
            писать отдельную функцию под каждый тип — или использовать <code>any</code>, что отключает всю
            пользу типизации.
          </p>
          <TheoryCode language="ts" code={`function identityNumber(value: number): number { return value }
function identityString(value: string): string { return value }
// ...и так под каждый новый тип — дублирование кода`} />
        </Step>

        <Step n={2} title="Вводим тип-параметр T">
          <p>
            <code>&lt;T&gt;</code> после имени функции объявляет «тип-переменную» — конкретный тип подставится
            при вызове. Теперь одна функция работает с любым типом, но связь между входом и выходом сохраняется:
            что дали на вход — то же самое вернётся, и TypeScript это проверит.
          </p>
          <TheoryCode language="ts" code={`function identity<T>(value: T): T {
  return value
}`} />
        </Step>

        <Step n={3} title="Используем — TS сам выводит T">
          <p>
            <code>T</code> можно указать явно в угловых скобках, а можно позволить TypeScript вывести его
            самостоятельно по переданному аргументу — как с обычным выводом типов.
          </p>
          <TheoryCode language="ts" code={`identity<number>(5)        // T = number, явно указали
identity<string>('привет')  // T = string, явно указали
identity(true)              // T = boolean — TS вывел сам по аргументу`} />
        </Step>

        <Step n={4} title="Дженерик у интерфейса — не только у функций">
          <p>
            Та же идея применима к интерфейсам: опишем «универсальный ответ API», который может содержать данные
            любого типа, но при использовании мы явно скажем, какого именно.
          </p>
          <TheoryCode language="ts" code={`interface ApiResponse<T> {
  data: T
  status: number
}
const res: ApiResponse<string[]> = { data: ['a', 'b'], status: 200 }
// TS проверит, что res.data — именно массив строк`} />
        </Step>
        <TheoryExample title="Где встречается на практике">
          Дженерики повсюду во встроенных типах: <code>Array&lt;T&gt;</code>, <code>Promise&lt;T&gt;</code>. Когда
          пишешь <code>fetch(...).then((data: User[]) =&gt; ...)</code>, ты фактически используешь дженерик{' '}
          <code>Promise&lt;User[]&gt;</code>.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Enum — перечисления</h2>
        <P n={11}>
          <code>enum</code> задаёт именованный набор допустимых констант — удобнее и безопаснее «магических
          строк», разбросанных по коду.
        </P>
        <TheoryCode language="ts" code={`enum Role {
  Admin = 'ADMIN',
  Editor = 'EDITOR',
  Viewer = 'VIEWER',
}

function checkAccess(role: Role) {
  if (role === Role.Admin) return 'полный доступ'
  return 'ограниченный доступ'
}
checkAccess(Role.Admin)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. Классы в TypeScript</h2>
        <P n={12}>
          Классы TypeScript расширяют классы JS модификаторами доступа: <code>public</code> (по умолчанию, виден
          отовсюду), <code>private</code> (только внутри класса), <code>protected</code> (внутри класса и
          наследников). Класс может реализовывать интерфейс через <code>implements</code>.
        </P>
        <Step n={1} title="Опишем контракт через интерфейс">
          <p>
            Сначала договоримся, <strong>что</strong> должен уметь делать класс — какие методы у него обязаны
            быть. Это и есть интерфейс: контракт без реализации.
          </p>
          <TheoryCode language="ts" code={`interface Movable {
  move(dx: number, dy: number): void
}`} />
        </Step>

        <Step n={2} title="Заводим приватное состояние">
          <p>
            Координаты робота — его внутренние данные, снаружи их менять напрямую не должны. Помечаем поля{' '}
            <code>private</code> — доступ к ним есть только у методов самого класса.
          </p>
          <TheoryCode language="ts" code={`class Robot {
  private x: number = 0
  private y: number = 0
}`} />
        </Step>

        <Step n={3} title="Добавляем публичное поле и конструктор">
          <p>
            Имя робота, наоборот, должно быть видно снаружи — значит, <code>public</code> (это модификатор по
            умолчанию, но полезно писать его явно для ясности). Конструктор задаёт значение при создании объекта.
          </p>
          <TheoryCode language="ts" code={`class Robot {
  private x: number = 0
  private y: number = 0
  public name: string

  constructor(name: string) {
    this.name = name
  }
}`} />
        </Step>

        <Step n={4} title="Реализуем контракт Movable">
          <p>
            Дописываем <code>implements Movable</code> к объявлению класса и реализуем метод{' '}
            <code>move</code>, обещанный интерфейсом. Если забыть его реализовать — TypeScript укажет на ошибку
            ещё до запуска.
          </p>
          <TheoryCode language="ts" code={`class Robot implements Movable {
  // ...поля и конструктор как выше...

  move(dx: number, dy: number) {
    this.x += dx
    this.y += dy
  }
}`} />
        </Step>

        <FinalLabel>Класс Robot целиком</FinalLabel>
        <TheoryCode language="ts" code={`interface Movable {
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
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">12. tsconfig.json и компиляция</h2>
        <P n={13}>
          Настройки компилятора хранят в файле <code>tsconfig.json</code>: какую версию JS собирать (
          <code>target</code>), насколько строго проверять типы (<code>strict</code>), куда класть результат.
          Опцию <code>strict: true</code> стоит включать почти всегда — она включает более полный набор проверок
          (например, запрещает неявный <code>any</code>).
        </P>
        <TheoryCode language="json" code={`{
  "compilerOptions": {
    "target": "ES2020",     // в какой JS компилировать
    "strict": true,          // включить строгие проверки типов
    "module": "ESNext",
    "jsx": "react-jsx",      // если используется React
    "outDir": "./dist"
  }
}`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">13. TypeScript и React (коротко)</h2>
        <P n={14}>
          Файлы с JSX-разметкой на TypeScript получают расширение <code>.tsx</code>. Типизируют пропсы компонента
          через интерфейс и указывают тип состояния в дженерике <code>useState&lt;T&gt;</code>.
        </P>
        <Step n={1} title="Описываем пропсы компонента">
          <p>
            Прежде чем писать сам компонент, описываем, какие пропсы он принимает и какого они типа —
            интерфейсом, как для обычного объекта. <code>disabled?</code> — необязательный проп.
          </p>
          <TheoryCode language="ts" code={`interface ButtonProps {
  label: string
  onClick: () => void   // функция без аргументов, ничего не возвращающая
  disabled?: boolean
}`} />
        </Step>

        <Step n={2} title="Используем интерфейс в самом компоненте">
          <p>
            Указываем тип у деструктурированных пропсов функции-компонента — теперь при использовании{' '}
            <code>&lt;Button /&gt;</code> в другом месте TypeScript проверит, что переданы все обязательные пропсы
            нужных типов.
          </p>
          <TheoryCode language="tsx" code={`function Button({ label, onClick, disabled }: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{label}</button>
}`} />
        </Step>

        <Step n={3} title="Типизируем состояние — useState<T>">
          <p>
            У <code>useState</code> тип значения обычно выводится из начального значения сам, но если начальное
            значение <code>null</code>, а храниться позже будет что-то другое — тип указываем явно через
            дженерик.
          </p>
          <TheoryCode language="tsx" code={`const [count, setCount] = useState<number>(0)               // тип очевиден и так
const [user, setUser] = useState<User | null>(null)  // изначально null, потом станет User`} />
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={15}>
          TypeScript добавляет к JavaScript статическую проверку типов, ловя ошибки до запуска кода. Базовый
          набор — примитивные типы, <code>interface</code>/<code>type</code> для формы объектов, опциональные и{' '}
          <code>readonly</code> поля, типизация функций. Union и intersection типы вместе с сужением типов
          описывают более сложные сценарии, а дженерики позволяют писать переиспользуемый код без потери
          типобезопасности. <code>enum</code> заменяет магические строки, классы получают модификаторы доступа, а
          настройки живут в <code>tsconfig.json</code>. Этого набора достаточно, чтобы уверенно писать и читать
          типизированный код, включая React-компоненты на <code>.tsx</code>.
        </P>
      </section>
    </div>
  )
}
