import { useEffect, useState } from 'react'
import SelfCheck from '../../components/SelfCheck'

/* ─── Shared UI ─── */
const Code = ({ code, lang = 'python' }) => {
  const commentPrefix = '#'
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">{lang}</div>
      <pre className="theory-code">
        <code>
          {lines.map((line, i) => {
            const idx = line.indexOf(commentPrefix)
            if (idx === -1) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            const before = line.slice(0, idx)
            const sq = (before.match(/'/g) || []).length
            const dq = (before.match(/"/g) || []).length
            if (sq % 2 !== 0 || dq % 2 !== 0) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            return (
              <span key={i}>
                <span style={{ color: 'var(--text-primary)' }}>{before}</span>
                <span style={{ color: '#6b7280' }}>{line.slice(idx)}</span>
                {i < lines.length - 1 ? '\n' : ''}
              </span>
            )
          })}
        </code>
      </pre>
    </div>
  )
}

const Note = ({ children }) => (
  <div style={{ background: 'rgba(255,214,10,0.05)', border: '1px solid rgba(255,214,10,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>{children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.7 }}>
    <span style={{ color: '#f87171', fontWeight: 700, marginRight: 6 }}>⚠️</span>{children}
  </div>
)

const SectionTitle = ({ id, children }) => (
  <h2 id={id} style={{ color: 'var(--text-primary)', fontSize: 'clamp(17px, 3vw, 21px)', fontWeight: 700, margin: '44px 0 14px', paddingTop: 8, borderBottom: '1px solid var(--border-color)', paddingBottom: 10, scrollMarginTop: 80 }}>{children}</h2>
)

const SubTitle = ({ id, children }) => (
  <h3 id={id} style={{ color: 'var(--text-primary)', fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 600, margin: '26px 0 10px', scrollMarginTop: 80 }}>{children}</h3>
)

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>{item}</li>)}
  </ul>
)

/* ─── Method / reference table ─── */
const MT = ({ headers = ['Метод / приём', 'Что делает', 'Пример'], rows }) => (
  <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', fontWeight: 700 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map(([cmd, desc, ex], i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--accent-lime)', whiteSpace: 'nowrap' }}>{cmd}</td>
            <td style={{ padding: '7px 14px', color: 'var(--text-secondary)' }}>{desc}</td>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: 12, whiteSpace: 'nowrap' }}>{ex}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* ─── Comparison table ─── */
const CT = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>{headers.map((h, i) => (
          <th key={i} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--bg-secondary)', color: i === 0 ? 'var(--text-secondary)' : 'var(--accent-lime)', borderBottom: '2px solid var(--border-color)', fontWeight: 700 }}>{h}</th>
        ))}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '7px 14px', color: j === 0 ? 'var(--text-secondary)' : 'var(--text-primary)', fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

/* ─── Checklist box ─── */
const Checklist = ({ items }) => (
  <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: '18px 22px', margin: '18px 0' }}>
    {items.map((item, i) => (
      <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '7px 0', borderBottom: i < items.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
        <span style={{ color: 'var(--accent-lime)', fontSize: 14, marginTop: 1 }}>☐</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>{item}</span>
      </div>
    ))}
  </div>
)

/* ─── Задача с раскрываемым решением ─── */
const DIFF_STYLE = {
  easy:   { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  text: '#4ade80', label: 'Лёгкая' },
  medium: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  text: '#facc15', label: 'Средняя' },
  hard:   { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  text: '#f87171', label: 'Сложная' },
}

function TaskCard({ n, difficulty, title, children, solution }) {
  const [open, setOpen] = useState(false)
  const d = DIFF_STYLE[difficulty]
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 10, padding: '18px 20px', margin: '14px 0', background: 'var(--bg-secondary)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-tertiary)', fontSize: 13 }}>#{n}</span>
        <span style={{ background: d.bg, border: `1px solid ${d.border}`, color: d.text, borderRadius: 6, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{d.label}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14.5 }}>{title}</span>
      </div>
      <div style={{ fontSize: 13.5, lineHeight: 1.75 }}>{children}</div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ marginTop: 10, background: 'transparent', border: '1px solid var(--border-color)', color: open ? 'var(--text-tertiary)' : 'var(--accent-lime)', borderRadius: 6, padding: '6px 14px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer' }}
      >
        {open ? 'Скрыть решение' : 'Показать решение →'}
      </button>
      {open && <div style={{ marginTop: 12 }}>{solution}</div>}
    </div>
  )
}

/* ─── TOC ─── */
const TOC_ITEMS = [
  { id: 'intro',        label: '1. Что такое ООП и зачем оно нужно' },
  { id: 'classes',      label: '2. Классы и объекты — база' },
  { id: 'init',         label: '3. __init__ и атрибуты' },
  { id: 'self',         label: '4. self — что это на самом деле' },
  { id: 'methods',      label: '5. Методы: instance, class, static' },
  { id: 'attrs',        label: '6. Атрибуты класса vs экземпляра' },
  { id: 'encapsulation',label: '7. Инкапсуляция: public / protected / private' },
  { id: 'property',     label: '8. @property — getter и setter' },
  { id: 'inheritance',  label: '9. Наследование' },
  { id: 'super',        label: '10. super() и как это работает' },
  { id: 'mro',          label: '11. Множественное наследование и MRO' },
  { id: 'polymorphism', label: '12. Полиморфизм' },
  { id: 'duck',         label: '13. Duck typing' },
  { id: 'abc',          label: '14. Абстрактные классы (ABC)' },
  { id: 'dunder',       label: '15. Dunder-методы' },
  { id: 'slots',        label: '16. __slots__' },
  { id: 'dataclass',    label: '17. @dataclass' },
  { id: 'metaclasses',  label: '18. Метаклассы' },
  { id: 'protocol',     label: '19. Protocol и структурная типизация' },
  { id: 'composition',  label: '20. Композиция vs наследование' },
  { id: 'solid',        label: '21. Принципы SOLID' },
  { id: 'patterns',     label: '22. Базовые паттерны проектирования' },
  { id: 'checklist',    label: 'Чек-лист "знаю ли я ООП"' },
  { id: 'practice',     label: 'Задачи для тренировки (30 шт.)' },
]

/* ═══════════════════════════════════════════════════ */
export default function PythonOopLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>

      {/* Back */}
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '6px 14px', color: '#60a5fa', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>PYTHON</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>С нуля → Senior-собеседование</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          ООП в Python — полный ликбез
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          Всё от классов и объектов до метаклассов, SOLID и паттернов проектирования. Каждая тема — с примером
          кода и объяснением, почему это работает именно так.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['Python 3.10+', '22 главы', '~90 мин', '30 задач для практики'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 44 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px 24px' }}>
          {TOC_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '4px 0', color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >{item.label}</button>
          ))}
        </div>
      </div>

      {/* ─── 1. Введение ─── */}
      <SectionTitle id="intro">1. Что такое ООП и зачем оно нужно</SectionTitle>
      <P><strong style={{ color: 'var(--text-primary)' }}>Объектно-ориентированное программирование</strong> — способ организовать код, при котором сущности реального мира моделируются в виде <strong style={{ color: 'var(--text-primary)' }}>объектов</strong>. У объекта есть состояние (данные — например, у собаки кличка и возраст) и поведение (действия — собака может лаять, бегать, есть).</P>
      <P>До ООП код писали процедурно: набор функций, работающих с общими данными. Проблема — когда программа растёт, непонятно, какие функции работают с какими данными, всё перемешивается. ООП решает это, склеивая данные и функции в один «контейнер» — объект.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, margin: '20px 0' }}>
        {[
          { label: 'Инкапсуляция', desc: 'прячем внутренности объекта, наружу торчит только интерфейс' },
          { label: 'Наследование', desc: 'новые классы переиспользуют код старых' },
          { label: 'Полиморфизм', desc: 'один вызов работает по-разному в зависимости от типа объекта' },
          { label: 'Абстракция', desc: 'работаем с интерфейсами, не думая о деталях реализации' },
        ].map(g => (
          <div key={g.label} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 14 }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-lime)', fontSize: 14, marginBottom: 6 }}>{g.label}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{g.desc}</div>
          </div>
        ))}
      </div>

      <SelfCheck questions={[
        { q: 'Какую проблему процедурного кода решает ООП?', a: 'В процедурном коде функции и данные существуют отдельно — с ростом программы непонятно, какие функции работают с какими данными. ООП склеивает данные и поведение в единый объект.' },
        { q: 'Назови четыре кита ООП.', a: 'Инкапсуляция, наследование, полиморфизм, абстракция.' },
      ]} />

      {/* ─── 2. Классы и объекты ─── */}
      <SectionTitle id="classes">2. Классы и объекты — база</SectionTitle>
      <P><strong style={{ color: 'var(--text-primary)' }}>Класс</strong> — это чертёж. <strong style={{ color: 'var(--text-primary)' }}>Объект (экземпляр)</strong> — конкретная вещь, сделанная по чертежу. Класс «Автомобиль» описывает, что у машины есть 4 колеса, двигатель, цвет; твой конкретный красный BMW — объект этого класса.</P>

      <Code code={`class Dog:
    pass  # пока пустой класс

# создаём объект (экземпляр)
my_dog = Dog()
print(my_dog)         # <__main__.Dog object at 0x7f...>
print(type(my_dog))   # <class '__main__.Dog'>`} />
      <P><code>Dog()</code> — вызов класса как функции создаёт экземпляр. Это называется <strong style={{ color: 'var(--text-primary)' }}>инстанцирование</strong>.</P>

      <Note>В Python всё является объектом — числа, строки, функции, даже сами классы. У каждого есть тип (класс), от которого он произошёл: <code>type(42)</code> → <code>int</code>, <code>type("hello")</code> → <code>str</code>.</Note>

      {/* ─── 3. __init__ ─── */}
      <SectionTitle id="init">3. __init__ и атрибуты</SectionTitle>
      <P>Класс без данных бесполезен. Нужно уметь класть в объект состояние — для этого специальный метод <code>__init__</code>, конструктор.</P>

      <Code code={`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

my_dog = Dog("Рекс", 3)
print(my_dog.name)  # Рекс
print(my_dog.age)   # 3`} />
      <P>Что произошло: вызвали <code>Dog("Рекс", 3)</code> → Python создал пустой объект → автоматически вызвал <code>__init__</code>, передав в него объект как <code>self</code> и аргументы → внутри записали атрибуты <code>name</code> и <code>age</code>.</P>
      <P><code>__init__</code> называется <strong style={{ color: 'var(--text-primary)' }}>dunder-методом</strong> (от double underscore — двойное подчёркивание). Таких методов много, познакомимся дальше.</P>
      <Warn><code>__init__</code> — это не конструктор в полном смысле, а инициализатор. Настоящий конструктор — <code>__new__</code>, но он нужен в редких случаях.</Warn>

      {/* ─── 4. self ─── */}
      <SectionTitle id="self">4. self — что это на самом деле</SectionTitle>
      <P><code>self</code> — ссылка на текущий объект. Когда делаешь <code>my_dog.bark()</code>, Python под капотом превращает это в <code>Dog.bark(my_dog)</code>. Первый аргумент — сам объект.</P>

      <Code code={`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        print(f"{self.name} говорит: гав!")

rex = Dog("Рекс")
rex.bark()      # Рекс говорит: гав!
Dog.bark(rex)   # то же самое — Рекс говорит: гав!`} />
      <P>Слово <code>self</code> — это договорённость, а не ключевое слово. Можно написать иначе, но так не принято — все Python-разработчики ожидают увидеть <code>self</code>.</P>

      <SelfCheck questions={[
        { q: 'Что на самом деле означает my_dog.bark()?', a: 'Python преобразует это в Dog.bark(my_dog) — первым аргументом метода передаётся сам объект, на который ссылается self.' },
        { q: 'Является ли self ключевым словом Python?', a: 'Нет, это лишь общепринятая договорённость. Можно назвать первый параметр иначе, но так делать не принято — весь код сообщества ожидает self.' },
      ]} />

      {/* ─── 5. Методы ─── */}
      <SectionTitle id="methods">5. Методы: instance, class, static</SectionTitle>

      <SubTitle id="methods-instance">5.1 Instance methods (обычные)</SubTitle>
      <P>Работают с конкретным экземпляром, первый аргумент — <code>self</code>.</P>
      <Code code={`class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):  # instance method
        print(f"{self.name}: гав!")`} />

      <SubTitle id="methods-class">5.2 Class methods</SubTitle>
      <P>Работают с классом, а не с экземпляром. Первый аргумент — <code>cls</code>. Часто используются как альтернативный конструктор.</P>
      <Code code={`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def puppy(cls, name):
        # альтернативный конструктор: щенок, возраст всегда 0
        return cls(name, age=0)

rex = Dog.puppy("Рекс")
print(rex.age)  # 0`} />
      <P>Зачем <code>cls</code> вместо <code>Dog</code>? Чтобы при наследовании метод создавал объект правильного класса — с <code>Dog(name, 0)</code> метод <code>Puppy.puppy(...)</code> вернул бы <code>Dog</code>, а не <code>Puppy</code>.</P>

      <SubTitle id="methods-static">5.3 Static methods</SubTitle>
      <P>Не работают ни с экземпляром, ни с классом — просто функция, живущая внутри класса ради логической группировки.</P>
      <Code code={`class Dog:
    @staticmethod
    def is_valid_age(age):
        return 0 <= age <= 30

print(Dog.is_valid_age(5))    # True
print(Dog.is_valid_age(500))  # False`} />

      <CT headers={['Тип метода', 'Когда использовать']} rows={[
        ['instance method', 'работаешь с данными конкретного объекта (в 90% случаев)'],
        ['classmethod', 'альтернативный конструктор или работа с классом в целом'],
        ['staticmethod', 'утилитарная функция, логически относящаяся к классу'],
      ]} />

      {/* ─── 6. Атрибуты класса vs экземпляра ─── */}
      <SectionTitle id="attrs">6. Атрибуты класса vs атрибуты экземпляра</SectionTitle>
      <P>Одна из тем, где новички регулярно наступают на грабли.</P>
      <Code code={`class Dog:
    species = "Canis familiaris"  # атрибут КЛАССА (общий для всех)

    def __init__(self, name):
        self.name = name          # атрибут ЭКЗЕМПЛЯРА (у каждого свой)

rex = Dog("Рекс")
buddy = Dog("Бадди")
print(rex.species)    # Canis familiaris
print(buddy.species)  # Canis familiaris
print(Dog.species)    # Canis familiaris`} />

      <SubTitle id="attrs-mutable">Грабли: мутабельные атрибуты класса</SubTitle>
      <Code code={`class Dog:
    tricks = []  # ОПАСНО!

    def __init__(self, name):
        self.name = name

    def learn_trick(self, trick):
        self.tricks.append(trick)  # изменяем список КЛАССА

rex = Dog("Рекс")
buddy = Dog("Бадди")
rex.learn_trick("сидеть")
print(buddy.tricks)  # ['сидеть'] — Бадди тоже "знает" трюк!`} />
      <P>Правильно так:</P>
      <Code code={`class Dog:
    def __init__(self, name):
        self.name = name
        self.tricks = []  # у каждого свой список`} />
      <Warn>Мутабельные значения (list, dict, set) на уровне класса — почти всегда баг. Держи их в <code>__init__</code>.</Warn>

      <SelfCheck questions={[
        { q: 'Почему список tricks = [] на уровне класса опасен?', a: 'Такой список один на весь класс — все экземпляры делят одну и ту же ссылку. Изменение через один объект (append) видно у всех остальных объектов. Мутабельные значения нужно создавать в __init__, чтобы у каждого экземпляра была своя копия.' },
      ]} />

      {/* ─── 7. Инкапсуляция ─── */}
      <SectionTitle id="encapsulation">7. Инкапсуляция: public / protected / private</SectionTitle>
      <P>Инкапсуляция — идея прятать внутренности объекта, чтобы снаружи с ним работали только через понятный интерфейс. В Python нет «настоящих» private/protected как в Java — есть соглашения.</P>
      <Code code={`class Account:
    def __init__(self, balance):
        self.balance = balance      # public — можно трогать снаружи
        self._internal = "secret"   # protected — "не трогай без нужды"
        self.__pin = "1234"         # private — name mangling`} />

      <CT headers={['Обозначение', 'Смысл']} rows={[
        ['public (name)', 'обычный атрибут, доступен всем'],
        ['_protected (_name)', 'договорённость «снаружи класса не трогать», Python не запрещает'],
        ['__private (__name)', 'включает name mangling — переименовывается в _ClassName__name'],
      ]} />

      <Code code={`acc = Account(100)
print(acc.balance)         # 100 — ок
print(acc._internal)       # secret — работает, но так не принято
# print(acc.__pin)         # AttributeError!
print(acc._Account__pin)   # 1234 — mangling обходится, но зачем?`} />
      <Note>Практика: используй <code>_name</code> для внутренних вещей класса. <code>__name</code> — редко, только если реально боишься коллизий имён в наследниках.</Note>

      {/* ─── 8. property ─── */}
      <SectionTitle id="property">8. @property — getter и setter по-питоновски</SectionTitle>
      <P>В Java пишут <code>getName()</code>/<code>setName()</code>. В Python это неидиоматично — вместо этого <code>@property</code>.</P>
      <P>Задача: чтобы <code>balance</code> нельзя было поставить в минус. Плохо — сделать <code>self.balance</code> публичным (любой напишет <code>acc.balance = -1000</code>). Хорошо — обернуть в property:</P>
      <Code code={`class Account:
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
# acc.balance = -1   # ValueError!`} />
      <P>Снаружи выглядит как обычный атрибут, а внутри — полный контроль. Это очень питонический приём.</P>

      <P>Ещё частый паттерн — computed property (значение вычисляется на лету):</P>
      <Code code={`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    @property
    def area(self):
        return self.width * self.height

r = Rectangle(3, 4)
print(r.area)  # 12 — обращаемся как к атрибуту, но это метод`} />

      <SelfCheck questions={[
        { q: 'Зачем нужен @property вместо публичного атрибута?', a: 'Он позволяет добавить логику (например, валидацию) при чтении или записи "поля", не меняя внешний интерфейс использования класса — снаружи это по-прежнему выглядит как обычный атрибут.' },
        { q: 'Что такое computed property?', a: 'Property, значение которого вычисляется на лету при каждом обращении (например, area у прямоугольника), а не хранится как отдельный атрибут.' },
      ]} />

      {/* ─── 9. Наследование ─── */}
      <SectionTitle id="inheritance">9. Наследование</SectionTitle>
      <P>Наследование — создание нового класса на основе существующего. Новый класс получает всё поведение родителя и может что-то добавить или переопределить.</P>
      <Code code={`class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} ест")

class Dog(Animal):  # Dog наследуется от Animal
    def bark(self):
        print(f"{self.name}: гав!")

rex = Dog("Рекс")
rex.eat()   # Рекс ест  — унаследовано от Animal
rex.bark()  # Рекс: гав! — своё`} />

      <SubTitle id="inheritance-override">Переопределение (override)</SubTitle>
      <Code code={`class Animal:
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
# Какой-то звук`} />
      <P>Это уже полиморфизм в действии — разберём его в разделе 12.</P>

      {/* ─── 10. super ─── */}
      <SectionTitle id="super">10. super() и как это работает</SectionTitle>
      <P>Иногда в наследнике нужно дополнить, а не полностью заменить логику родителя. Для этого — <code>super()</code>.</P>
      <Code code={`class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # вызываем __init__ родителя
        self.breed = breed

rex = Dog("Рекс", "лабрадор")
print(rex.name, rex.breed)  # Рекс лабрадор`} />
      <P><code>super()</code> возвращает специальный прокси-объект, позволяющий вызывать методы родителя.</P>
      <Warn>Если переопределяешь <code>__init__</code> в наследнике, почти всегда нужно вызывать <code>super().__init__(...)</code>, чтобы родитель успел проинициализировать своё состояние.</Warn>

      {/* ─── 11. MRO ─── */}
      <SectionTitle id="mro">11. Множественное наследование и MRO</SectionTitle>
      <P>Python разрешает наследоваться сразу от нескольких классов:</P>
      <Code code={`class Swimmer:
    def swim(self):
        print("Плыву")

class Runner:
    def run(self):
        print("Бегу")

class Triathlete(Swimmer, Runner):
    pass

t = Triathlete()
t.swim()
t.run()`} />
      <P>Проблема: а что если два родителя определяют один и тот же метод? Кого вызывать? Здесь работает <strong style={{ color: 'var(--text-primary)' }}>MRO — Method Resolution Order</strong>, порядок поиска метода. Алгоритм называется C3 linearization.</P>
      <Code code={`class A:
    def hello(self): print("A")

class B(A):
    def hello(self): print("B")

class C(A):
    def hello(self): print("C")

class D(B, C):
    pass

D().hello()  # B
print(D.__mro__)
# (<class 'D'>, <class 'B'>, <class 'C'>, <class 'A'>, <class 'object'>)`} />
      <P>Python идёт по MRO слева направо и берёт первое совпадение: D → B → C → A → object.</P>
      <Note><strong>Diamond problem</strong> (ромбовидное наследование) решается именно за счёт MRO — класс A встретится в цепочке только один раз. <code>object</code> — базовый класс всех классов в Python, даже если родитель не указан явно.</Note>

      <SelfCheck questions={[
        { q: 'Что такое MRO и зачем оно нужно?', a: 'Method Resolution Order — порядок, в котором Python ищет метод при множественном наследовании (алгоритм C3-линеаризации). Он решает diamond problem, гарантируя, что общий предок встретится в цепочке поиска только один раз.' },
        { q: 'Как посмотреть MRO класса?', a: 'Через атрибут ClassName.__mro__ или функцию ClassName.mro().' },
      ]} />

      {/* ─── 12. Полиморфизм ─── */}
      <SectionTitle id="polymorphism">12. Полиморфизм</SectionTitle>
      <P>Полиморфизм — способность разных объектов реагировать на один и тот же вызов по-разному.</P>
      <Code code={`class Shape:
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
    print(s.area())  # каждая фигура считает свою площадь по-своему`} />
      <P>Пишем один и тот же код (<code>s.area()</code>), но результат зависит от типа объекта. Это позволяет добавлять новые фигуры (треугольник, эллипс…), не меняя цикл.</P>

      {/* ─── 13. Duck typing ─── */}
      <SectionTitle id="duck">13. Duck typing</SectionTitle>
      <P>Питоновский подход к полиморфизму: «если оно ходит как утка и крякает как утка — это утка». В отличие от Java, Python не проверяет тип при вызове метода — он просто пытается вызвать метод.</P>
      <Code code={`class Duck:
    def quack(self):
        print("Кря!")

class Person:
    def quack(self):
        print("Я тоже могу крякнуть!")

def make_it_quack(thing):
    thing.quack()  # не важно, какого типа thing

make_it_quack(Duck())    # Кря!
make_it_quack(Person())  # Я тоже могу крякнуть!`} />
      <P>Плюс: невероятная гибкость. Минус: ошибки типов ловятся только в рантайме — отсюда важность type hints и mypy.</P>

      {/* ─── 14. ABC ─── */}
      <SectionTitle id="abc">14. Абстрактные классы (ABC)</SectionTitle>
      <P>Иногда нужно сказать: «этот класс нельзя инстанцировать напрямую, а наследники обязаны реализовать такие-то методы». Для этого — модуль <code>abc</code>.</P>
      <Code code={`from abc import ABC, abstractmethod

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
print(c.area())`} />
      <P>Если наследник забудет реализовать <code>area</code> — Python не даст создать его экземпляр. Это контракт. Абстрактные классы полезны, когда есть общая логика для вынесения в базовый класс, и когда нужно обязать наследников реализовать конкретный интерфейс.</P>

      <SelfCheck questions={[
        { q: 'Чем полиморфизм отличается от duck typing?', a: 'Полиморфизм обычно опирается на общую иерархию классов (наследование от одного родителя), а duck typing вообще не требует общего предка — важно только наличие нужного метода у объекта, тип не проверяется явно.' },
        { q: 'Что произойдёт при попытке создать объект абстрактного класса напрямую?', a: 'Python выбросит TypeError: Can\'t instantiate abstract class — до тех пор, пока не реализованы все методы, помеченные @abstractmethod.' },
      ]} />

      {/* ─── 15. Dunder-методы ─── */}
      <SectionTitle id="dunder">15. Dunder-методы (magic methods)</SectionTitle>
      <P>Методы с двумя подчёркиваниями с обеих сторон. Позволяют интегрировать класс с языком: сравнение, арифметика, длина, итерация, вывод и так далее.</P>

      <SubTitle id="dunder-str">15.1 Строковое представление: __str__, __repr__</SubTitle>
      <Code code={`class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"({self.x}, {self.y})"          # для людей — print()

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"  # для разработчиков — REPL, отладка

p = Point(1, 2)
print(p)         # (1, 2)          — вызывает __str__
print(repr(p))   # Point(x=1, y=2) — вызывает __repr__`} />
      <Note><code>__repr__</code> обязателен, <code>__str__</code> опционален. Если <code>__str__</code> не определён, <code>print</code> использует <code>__repr__</code>.</Note>

      <SubTitle id="dunder-eq">15.2 Сравнение: __eq__, __lt__, __gt__...</SubTitle>
      <Code code={`class Money:
    def __init__(self, amount):
        self.amount = amount

    def __eq__(self, other):
        return self.amount == other.amount

    def __lt__(self, other):
        return self.amount < other.amount

a, b, c = Money(100), Money(100), Money(200)
print(a == b)  # True
print(a < c)   # True`} />
      <P>Декоратор <code>@functools.total_ordering</code> — определяешь <code>__eq__</code> и <code>__lt__</code>, остальные (<code>&lt;=</code>, <code>&gt;</code>, <code>&gt;=</code>) достроятся сами.</P>

      <SubTitle id="dunder-hash">15.3 Хеш: __hash__</SubTitle>
      <Code code={`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))  # 2`} />
      <Warn>Если переопределяешь <code>__eq__</code>, обычно нужно переопределить и <code>__hash__</code>, иначе объект станет unhashable.</Warn>

      <SubTitle id="dunder-arith">15.4 Арифметика: __add__, __sub__, __mul__...</SubTitle>
      <Code code={`class Vector:
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
print(v * 2)  # Vector(8, 12)`} />

      <SubTitle id="dunder-collection">15.5 Длина, итерация, индексация</SubTitle>
      <Code code={`class Playlist:
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
print("b" in p)   # True`} />
      <P>Всего несколько dunder-методов — и класс ведёт себя как встроенная коллекция.</P>

      <SubTitle id="dunder-call">15.6 Вызов объекта как функции: __call__</SubTitle>
      <Code code={`class Multiplier:
    def __init__(self, factor):
        self.factor = factor

    def __call__(self, x):
        return x * self.factor

double = Multiplier(2)
print(double(5))  # 10 — объект ведёт себя как функция`} />
      <P>Полезно для стейтфулных «функций» — счётчиков, кешей, ML-моделей (<code>model(input)</code>).</P>

      <SubTitle id="dunder-context">15.7 Контекст-менеджеры: __enter__ / __exit__</SubTitle>
      <Code code={`class Timer:
    def __enter__(self):
        import time
        self.start = time.monotonic()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"Заняло {time.monotonic() - self.start:.2f}s")

with Timer():
    sum(range(10_000_000))
# Заняло 0.15s`} />

      <MT headers={['Категория', 'Методы', '']} rows={[
        ['Создание/уничтожение', '__new__, __init__, __del__', ''],
        ['Строковое', '__str__, __repr__, __format__, __bytes__', ''],
        ['Сравнение', '__eq__, __ne__, __lt__, __le__, __gt__, __ge__', ''],
        ['Хеш и bool', '__hash__, __bool__', ''],
        ['Арифметика', '__add__, __radd__, __iadd__ и аналоги', ''],
        ['Коллекции', '__len__, __getitem__, __setitem__, __iter__, __contains__', ''],
        ['Вызов', '__call__', ''],
        ['Атрибутный доступ', '__getattr__, __setattr__, __delattr__', ''],
        ['Контекст-менеджер', '__enter__, __exit__', ''],
        ['Async', '__aiter__, __anext__, __aenter__, __aexit__', ''],
      ]} />

      <SelfCheck questions={[
        { q: 'В чём разница между __str__ и __repr__?', a: '__str__ — читаемое представление "для людей", вызывается print() и str(). __repr__ — техническое представление "для разработчиков" (отладка, REPL, коллекции). __repr__ обязателен, __str__ опционален — если его нет, используется __repr__.' },
        { q: 'Что нужно сделать, чтобы объект можно было положить в set?', a: 'Реализовать __hash__ (и обычно вместе с ним __eq__, чтобы объекты с одинаковым содержимым считались равными и не дублировались в множестве).' },
      ]} />

      {/* ─── 16. __slots__ ─── */}
      <SectionTitle id="slots">16. __slots__</SectionTitle>
      <P>По умолчанию Python хранит атрибуты объекта в словаре <code>__dict__</code> — гибко, но занимает память и медленнее. <code>__slots__</code> — способ сказать: «у объекта могут быть только эти атрибуты, никакого __dict__».</P>
      <Code code={`class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(1, 2)
p.x = 10       # ок
# p.z = 20     # AttributeError`} />
      <CT headers={['Плюсы', 'Минусы']} rows={[
        ['меньше памяти (актуально для миллионов объектов)', 'нельзя добавлять атрибуты на лету'],
        ['чуть быстрее доступ к атрибутам', 'нюансы с наследованием (наследник тоже должен иметь __slots__)'],
        ['защита от опечаток в именах атрибутов', 'несовместимо с __dict__ и некоторыми библиотеками'],
      ]} />

      {/* ─── 17. dataclass ─── */}
      <SectionTitle id="dataclass">17. @dataclass</SectionTitle>
      <P>Написание классов вроде Point — рутина: конструктор, <code>__eq__</code>, <code>__repr__</code>. <code>@dataclass</code> (модуль <code>dataclasses</code>) генерирует это автоматически.</P>
      <Code code={`from dataclasses import dataclass

@dataclass
class Point:
    x: int
    y: int

p1 = Point(1, 2)
p2 = Point(1, 2)
print(p1)         # Point(x=1, y=2)   — __repr__ сгенерирован
print(p1 == p2)   # True              — __eq__ сгенерирован`} />
      <P>Опции:</P>
      <Code code={`@dataclass(frozen=True, slots=True, kw_only=True)
class Point:
    x: int
    y: int`} />
      <Ul items={[
        <><code>frozen=True</code> — объект неизменяемый (immutable), можно класть в set/dict ключом</>,
        <><code>slots=True</code> — сразу с __slots__ (Python 3.10+)</>,
        <><code>kw_only=True</code> — только именованные аргументы</>,
      ]} />
      <P>Значения по умолчанию для мутабельных типов — только через <code>field(default_factory=list)</code>:</P>
      <Code code={`from dataclasses import dataclass, field

@dataclass
class Team:
    name: str
    members: list = field(default_factory=list)`} />
      <Warn>Дефолтом писать <code>members: list = []</code> нельзя — Python не даст. Это те же грабли с мутабельным атрибутом класса, что и в разделе 6.</Warn>

      {/* ─── 18. Метаклассы ─── */}
      <SectionTitle id="metaclasses">18. Метаклассы</SectionTitle>
      <P>Класс — это тоже объект. А если объект, то у него есть свой класс. Класс класса — это метакласс. По умолчанию все классы наследуются от метакласса <code>type</code>.</P>
      <Code code={`class Foo:
    pass

print(type(Foo))       # <class 'type'>
print(type(Foo()))     # <class '__main__.Foo'>

# можно создать класс "вручную"
Foo = type("Foo", (), {"x": 42})
print(Foo.x)  # 42`} />
      <P>Метаклассы используют, когда нужно контролировать, <em>как создаются классы</em>, а не объекты: ORM (SQLAlchemy, Django ORM) строят SQL-таблицы по описанию класса, регистрация плагинов, валидация структуры класса при определении.</P>
      <Code code={`class Meta(type):
    def __new__(mcs, name, bases, dct):
        # валидируем: все методы должны быть в snake_case
        for attr in dct:
            if callable(dct[attr]) and not attr.islower():
                raise TypeError(f"Метод {attr} должен быть в snake_case")
        return super().__new__(mcs, name, bases, dct)

class MyClass(metaclass=Meta):
    def valid_method(self): pass
    # def BadMethod(self): pass  # TypeError при определении класса!`} />
      <Note><strong>Правило Тима Питерса:</strong> «Метаклассы — глубокая магия, которой 99% пользователей не должны интересоваться. Если ты думаешь, что они тебе нужны — они тебе не нужны». Обычно можно обойтись классовыми декораторами или <code>__init_subclass__</code>.</Note>

      {/* ─── 19. Protocol ─── */}
      <SectionTitle id="protocol">19. Protocol и структурная типизация</SectionTitle>
      <P>С Python 3.8 появились протоколы — способ описать интерфейс, которому объект должен соответствовать структурно, а не через наследование. Это формализация duck typing.</P>
      <Code code={`from typing import Protocol

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
make_it_quack(Person())  # ок, у Person тоже есть quack()`} />
      <P>Ни Duck, ни Person не наследуются от Quackable, но type checker (mypy) проверит, что у них есть метод <code>quack()</code> с нужной сигнатурой. Это гораздо более питонично, чем ABC с <code>@abstractmethod</code>, когда речь про интерфейсы.</P>

      {/* ─── 20. Композиция vs наследование ─── */}
      <SectionTitle id="composition">20. Композиция vs наследование</SectionTitle>
      <P>Наследование — сильная связь: наследник «знает» о родителе и ломается вместе с ним. Python-мир последние годы двигается в сторону композиции.</P>
      <Code code={`# Наследование (is-a)
class Car(Engine):  # Car IS AN Engine — звучит странно, потому что это неправда
    ...

# Композиция (has-a)
class Car:
    def __init__(self):
        self.engine = Engine()  # Car HAS AN Engine — вот это уже логично

    def start(self):
        self.engine.start()`} />
      <P>Наследование = «является». Композиция = «имеет».</P>
      <Note>Используй наследование, только если между классами реально отношение «is-a» (Dog is an Animal). Иначе — композиция.</Note>

      <SelfCheck questions={[
        { q: 'Когда стоит выбирать композицию вместо наследования?', a: 'Когда между классами нет отношения «является» (is-a), а есть отношение «имеет» (has-a). Например, Car не является Engine, но имеет Engine внутри себя — это композиция, а не наследование.' },
      ]} />

      {/* ─── 21. SOLID ─── */}
      <SectionTitle id="solid">21. Принципы SOLID</SectionTitle>
      <P>Пять принципов проектирования от Роберта Мартина (Uncle Bob). На собеседованиях спрашивают часто.</P>

      <SubTitle id="solid-s">S — Single Responsibility Principle (SRP)</SubTitle>
      <P>Один класс — одна ответственность.</P>
      <Code code={`# плохо: класс знает и про юзера, и про базу, и про email
class User:
    def save_to_db(self): ...
    def send_welcome_email(self): ...

# хорошо: разделяем
class User: ...
class UserRepository:
    def save(self, user): ...
class EmailService:
    def send_welcome(self, user): ...`} />

      <SubTitle id="solid-o">O — Open/Closed Principle (OCP)</SubTitle>
      <P>Классы должны быть открыты для расширения, но закрыты для модификации. Хотим добавить новый тип оплаты — не переписываем существующий код, а добавляем новый класс.</P>
      <Code code={`# плохо
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
class PayPalPayment(Payment): ...  # добавили без изменения других классов`} />

      <SubTitle id="solid-l">L — Liskov Substitution Principle (LSP)</SubTitle>
      <P>Наследник должен уметь заменить родителя без сломов. Классический пример-антипаттерн — квадрат-прямоугольник:</P>
      <Code code={`class Rectangle:
    def __init__(self, w, h):
        self.w, self.h = w, h

    def set_width(self, w):
        self.w = w

class Square(Rectangle):
    def set_width(self, w):
        self.w = w
        self.h = w  # Square нарушает контракт: у Rectangle set_width не трогал height`} />
      <P>Функция, работающая с Rectangle, может сломаться, если ей передать Square. Это нарушение LSP.</P>

      <SubTitle id="solid-i">I — Interface Segregation Principle (ISP)</SubTitle>
      <P>Лучше много маленьких интерфейсов, чем один толстый.</P>
      <Code code={`# плохо
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
    def eat(self): ...`} />

      <SubTitle id="solid-d">D — Dependency Inversion Principle (DIP)</SubTitle>
      <P>Зависимости должны идти к абстракциям, а не к конкретным классам.</P>
      <Code code={`# плохо
class UserService:
    def __init__(self):
        self.db = PostgresDatabase()  # жёстко привязались к Postgres

# хорошо
class UserService:
    def __init__(self, db: Database):  # интерфейс/протокол
        self.db = db`} />
      <P>Так UserService можно тестировать с in-memory базой, менять Postgres на MySQL и так далее.</P>

      <SelfCheck questions={[
        { q: 'Сформулируй Single Responsibility Principle своими словами.', a: 'У каждого класса должна быть ровно одна причина для изменения — то есть одна зона ответственности. Если класс одновременно сохраняет данные в БД и отправляет письма, у него уже две причины меняться, и его стоит разделить.' },
        { q: 'В чём суть Liskov Substitution Principle на примере Rectangle/Square?', a: 'Наследник должен вести себя совместимо с контрактом родителя. Square, меняющий и width, и height при вызове set_width, нарушает ожидания кода, написанного для Rectangle, — это и есть нарушение LSP.' },
        { q: 'Что даёт Dependency Inversion Principle на практике?', a: 'Класс зависит от абстракции (интерфейса/протокола), а не от конкретной реализации — это позволяет подменять реализацию (например, базу данных) при тестировании или смене технологии, не переписывая сам класс.' },
      ]} />

      {/* ─── 22. Паттерны ─── */}
      <SectionTitle id="patterns">22. Базовые паттерны проектирования</SectionTitle>
      <P>Без глубокого погружения — только карта, чтобы понимать, что упоминают в разговоре.</P>

      <SubTitle id="pattern-singleton">22.1 Singleton</SubTitle>
      <P>Гарантирует, что объект класса существует только в единственном экземпляре.</P>
      <Code code={`class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance`} />
      <P>В Python чаще делают проще — через модуль: он импортируется один раз, все переменные в нём фактически синглтон.</P>

      <SubTitle id="pattern-factory">22.2 Factory</SubTitle>
      <P>Класс/функция, задача которой — создавать объекты нужного типа.</P>
      <Code code={`class ShapeFactory:
    @staticmethod
    def create(kind, **kwargs):
        if kind == "circle":
            return Circle(**kwargs)
        elif kind == "square":
            return Square(**kwargs)
        raise ValueError(f"Unknown shape: {kind}")`} />

      <SubTitle id="pattern-strategy">22.3 Strategy</SubTitle>
      <P>Инкапсулируем поведение в отдельный класс и передаём в основной класс через композицию.</P>
      <Code code={`class SortStrategy(Protocol):
    def sort(self, data): ...

class QuickSort:
    def sort(self, data): ...

class MergeSort:
    def sort(self, data): ...

class Sorter:
    def __init__(self, strategy: SortStrategy):
        self.strategy = strategy

    def run(self, data):
        return self.strategy.sort(data)`} />

      <SubTitle id="pattern-observer">22.4 Observer</SubTitle>
      <P>Объекты подписываются на события другого объекта.</P>
      <Code code={`class Publisher:
    def __init__(self):
        self.subscribers = []

    def subscribe(self, fn):
        self.subscribers.append(fn)

    def publish(self, event):
        for fn in self.subscribers:
            fn(event)`} />

      <SubTitle id="pattern-decorator">22.5 Decorator (паттерн)</SubTitle>
      <P>Не путать с декораторами Python. Паттерн — про оборачивание объекта другим объектом, чтобы добавить поведение.</P>

      <SubTitle id="pattern-repository">22.6 Repository</SubTitle>
      <P>Разделяет доменную логику и хранилище.</P>
      <Code code={`class UserRepository:
    def get_by_id(self, user_id) -> User: ...
    def save(self, user: User) -> None: ...`} />
      <P>UserService работает с UserRepository, не зная, там Postgres, in-memory или mock.</P>

      <SelfCheck questions={[
        { q: 'Как реализовать Singleton в Python двумя разными способами?', a: 'Через переопределение __new__ так, чтобы он возвращал один и тот же сохранённый экземпляр при повторных вызовах. Или проще — через модуль: он импортируется в Python единожды, поэтому все объявленные в нём переменные и объекты фактически ведут себя как синглтон.' },
        { q: 'В чём разница между паттерном Strategy и просто if/elif в коде?', a: 'Strategy выносит каждый вариант поведения в отдельный класс с общим интерфейсом и передаёт нужную реализацию через композицию — это соответствует Open/Closed Principle: добавить новую стратегию можно новым классом, не трогая существующий код с условиями.' },
      ]} />

      {/* ─── Чек-лист ─── */}
      <SectionTitle id="checklist">Мини-чеклист «знаю ли я ООП»</SectionTitle>
      <P>Пройдись глазами и убедись, что можешь объяснить своими словами:</P>
      <Checklist items={[
        'Что делает __init__ и почему он не совсем конструктор',
        'Что такое self и почему первый аргумент так называется',
        'Разница между атрибутом класса и атрибутом экземпляра, где грабли',
        'Как работает name mangling для __private',
        'Зачем @property вместо публичного атрибута',
        'Как работает super() и почему без него в наследнике часто плохо',
        'Что такое MRO и как его посмотреть',
        'В чём разница между duck typing, ABC и Protocol',
        'Какие dunder-методы нужны, чтобы объект вёл себя как коллекция',
        'Зачем __slots__ и когда это стоит применять',
        'Что генерирует @dataclass',
        'Что такое метакласс и почему он не нужен 99% времени',
        'Разница между наследованием и композицией — когда что выбирать',
        'Пять принципов SOLID своими словами с примером на каждый',
        'Как реализовать Singleton, Factory, Strategy, Observer',
      ]} />
      <Note>Если по каждому пункту можешь дать 30-секундный ответ с примером кода — по ООП ты закрыт на уровне senior-собеседования.</Note>

      {/* ─── Задачи для тренировки ─── */}
      <SectionTitle id="practice">Задачи для тренировки (30 шт.)</SectionTitle>
      <P>
        Классические задачи на ООП — часть встречается на реальных собеседованиях, часть похожа на задачи с
        тренажёров вроде LeetCode/CodeSignal, адаптированные под Python. Не подглядывай в решение сразу —
        сначала попробуй написать код сам, потом сверься.
      </P>

      <SubTitle id="practice-easy">Лёгкие (1–10)</SubTitle>

      <TaskCard n={1} difficulty="easy" title="Person"
        solution={<Code code={`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Привет, меня зовут {self.name}, мне {self.age} лет"

p = Person("Аня", 20)
print(p.greet())  # Привет, меня зовут Аня, мне 20 лет`} />}>
        <P style={{ margin: 0 }}>Напиши класс <code>Person</code> с атрибутами <code>name</code> и <code>age</code> и методом <code>greet()</code>, возвращающим строку <code>"Привет, меня зовут {'{name}'}, мне {'{age}'} лет"</code>.</P>
      </TaskCard>

      <TaskCard n={2} difficulty="easy" title="Rectangle"
        solution={<Code code={`class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def area(self):
        return self.width * self.height

    def perimeter(self):
        return 2 * (self.width + self.height)

r = Rectangle(4, 5)
print(r.area())       # 20
print(r.perimeter())  # 18`} />}>
        <P style={{ margin: 0 }}>Класс <code>Rectangle</code> с <code>width</code>/<code>height</code> и методами <code>area()</code> и <code>perimeter()</code>.</P>
      </TaskCard>

      <TaskCard n={3} difficulty="easy" title="Counter"
        solution={<Code code={`class Counter:
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
print(c.count)  # 0`} />}>
        <P style={{ margin: 0 }}>Класс <code>Counter</code> со счётчиком <code>count</code>, методами <code>increment(step=1)</code> (по умолчанию +1, но можно указать шаг) и <code>reset()</code>.</P>
      </TaskCard>

      <TaskCard n={4} difficulty="easy" title="BankAccount: базовые операции"
        solution={<Code code={`class BankAccount:
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
print(acc.balance)        # 150`} />}>
        <P style={{ margin: 0 }}>Класс <code>BankAccount</code> с <code>balance</code>, методами <code>deposit(amount)</code> и <code>withdraw(amount)</code>. <code>withdraw</code> возвращает <code>False</code>, если средств не хватает, иначе снимает деньги и возвращает <code>True</code>.</P>
      </TaskCard>

      <TaskCard n={5} difficulty="easy" title="Car с человекочитаемым выводом"
        solution={<Code code={`class Car:
    def __init__(self, make, model, year):
        self.make = make
        self.model = model
        self.year = year

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"

print(Car("Toyota", "Corolla", 2022))  # 2022 Toyota Corolla`} />}>
        <P style={{ margin: 0 }}>Класс <code>Car</code> с <code>make</code>/<code>model</code>/<code>year</code>. Реализуй <code>__str__</code> так, чтобы <code>print(car)</code> выводил <code>"2022 Toyota Corolla"</code>.</P>
      </TaskCard>

      <TaskCard n={6} difficulty="easy" title="Circle"
        solution={<Code code={`import math

class Circle:
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return math.pi * self.radius ** 2

    def circumference(self):
        return 2 * math.pi * self.radius

c = Circle(3)
print(round(c.area(), 2))           # 28.27
print(round(c.circumference(), 2))  # 18.85`} />}>
        <P style={{ margin: 0 }}>Класс <code>Circle</code> с <code>radius</code>, методами <code>area()</code> и <code>circumference()</code>.</P>
      </TaskCard>

      <TaskCard n={7} difficulty="easy" title="Student и средний балл"
        solution={<Code code={`class Student:
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
print(s.average())  # 4.5`} />}>
        <P style={{ margin: 0 }}>Класс <code>Student</code> с <code>name</code> и списком <code>grades</code>. Методы <code>add_grade(grade)</code> и <code>average()</code> (0, если оценок ещё нет — без деления на ноль).</P>
      </TaskCard>

      <TaskCard n={8} difficulty="easy" title="Stack на списке"
        solution={<Code code={`class Stack:
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
print(s.is_empty())  # False`} />}>
        <P style={{ margin: 0 }}>Класс <code>Stack</code> (стек, LIFO) на основе списка: <code>push</code>, <code>pop</code>, <code>peek</code>, <code>is_empty</code>.</P>
      </TaskCard>

      <TaskCard n={9} difficulty="easy" title="Animal → Dog/Cat: базовое наследование"
        solution={<Code code={`class Animal:
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
# Барсик говорит: Мяу!`} />}>
        <P style={{ margin: 0 }}>Базовый класс <code>Animal</code> с <code>name</code> и методом <code>speak()</code>. Классы <code>Dog</code> и <code>Cat</code> наследуются и переопределяют <code>speak()</code> по-своему.</P>
      </TaskCard>

      <TaskCard n={10} difficulty="easy" title="Temperature через @property"
        solution={<Code code={`class Temperature:
    def __init__(self, celsius=0):
        self.celsius = celsius

    @property
    def fahrenheit(self):
        return self.celsius * 9 / 5 + 32

t = Temperature(100)
print(t.fahrenheit)  # 212.0`} />}>
        <P style={{ margin: 0 }}>Класс <code>Temperature</code> хранит температуру в цельсиях. Сделай <code>fahrenheit</code> вычисляемым свойством через <code>@property</code>, а не отдельным методом.</P>
      </TaskCard>

      <SubTitle id="practice-medium">Средние (11–20)</SubTitle>

      <TaskCard n={11} difficulty="medium" title="MRO: предскажи вывод"
        solution={<>
          <Code code={`D().hello()
# B
# C
# A`} />
          <P style={{ margin: '10px 0 0' }}>MRO для <code>D(B, C)</code> строится по алгоритму C3-линеаризации: <code>D → B → C → A → object</code>. Проверить можно через <code>D.__mro__</code>. Каждый <code>super().hello()</code> идёт к следующему классу именно в этом порядке, а не напрямую к родителю — поэтому <code>B.hello</code> зовёт не <code>A.hello</code>, а <code>C.hello</code>.</P>
        </>}>
        <P style={{ margin: '0 0 10px' }}>Что выведет этот код и почему? Объясни через MRO.</P>
        <Code code={`class A:
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
    pass`} />
      </TaskCard>

      <TaskCard n={12} difficulty="medium" title="MathUtils с @staticmethod"
        solution={<Code code={`class MathUtils:
    @staticmethod
    def is_prime(n):
        if n < 2:
            return False
        for i in range(2, int(n ** 0.5) + 1):
            if n % i == 0:
                return False
        return True

print(MathUtils.is_prime(17))  # True
print(MathUtils.is_prime(15))  # False`} />}>
        <P style={{ margin: 0 }}>Класс <code>MathUtils</code> со статическим методом <code>is_prime(n)</code>, не использующим ни <code>self</code>, ни <code>cls</code> — просто утилита, логически сгруппированная в классе.</P>
      </TaskCard>

      <TaskCard n={13} difficulty="medium" title="Date.from_string — альтернативный конструктор"
        solution={<Code code={`class Date:
    def __init__(self, year, month, day):
        self.year, self.month, self.day = year, month, day

    @classmethod
    def from_string(cls, date_str):
        year, month, day = map(int, date_str.split("-"))
        return cls(year, month, day)

    def __repr__(self):
        return f"{self.year}-{self.month:02d}-{self.day:02d}"

d = Date.from_string("2024-01-05")
print(d)  # 2024-01-05`} />}>
        <P style={{ margin: 0 }}>Класс <code>Date(year, month, day)</code>. Добавь альтернативный конструктор <code>Date.from_string("2024-01-05")</code> через <code>@classmethod</code>.</P>
      </TaskCard>

      <TaskCard n={14} difficulty="medium" title="Person.age с валидацией"
        solution={<Code code={`class Person:
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
    print(e)  # Возраст не может быть отрицательным`} />}>
        <P style={{ margin: 0 }}>Сделай так, чтобы <code>Person.age</code> нельзя было установить в отрицательное число — присваивание <code>p.age = -5</code> должно бросать <code>ValueError</code>. Используй <code>@property</code>/<code>@age.setter</code>.</P>
      </TaskCard>

      <TaskCard n={15} difficulty="medium" title="Vector: перегрузка операторов"
        solution={<Code code={`class Vector:
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
print(v1 == Vector(1, 2))   # True`} />}>
        <P style={{ margin: 0 }}>Класс <code>Vector(x, y)</code>. Реализуй <code>__add__</code> (сложение векторов), <code>__mul__</code> (умножение на число) и <code>__eq__</code> (сравнение по координатам).</P>
      </TaskCard>

      <TaskCard n={16} difficulty="medium" title="__str__ vs __repr__"
        solution={<Code code={`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __repr__(self):
        return f"Point(x={self.x}, y={self.y})"

    def __str__(self):
        return f"({self.x}, {self.y})"

p = Point(1, 2)
print(p)     # (1, 2)              — вызывает __str__
print([p])   # [Point(x=1, y=2)]   — контейнеры всегда используют __repr__`} />}>
        <P style={{ margin: 0 }}>Класс <code>Point(x, y)</code>. Реализуй <code>__str__</code> (короткий вывод для человека) и <code>__repr__</code> (однозначный вывод для отладки) так, чтобы они отличались, и объясни, почему <code>print([p])</code> покажет именно <code>__repr__</code>, а не <code>__str__</code>.</P>
      </TaskCard>

      <TaskCard n={17} difficulty="medium" title="Композиция: Car has-a Engine"
        solution={<Code code={`class Engine:
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
# Lada: Двигатель на 90 л.с. заведён`} />}>
        <P style={{ margin: 0 }}>Класс <code>Engine(horsepower)</code> с методом <code>start()</code>. Класс <code>Car</code> должен <em>иметь</em> двигатель (композиция), а не наследоваться от него — <code>Car</code> не является видом двигателя.</P>
      </TaskCard>

      <TaskCard n={18} difficulty="medium" title="Своё исключение для банка"
        solution={<Code code={`class InsufficientFundsError(Exception):
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
    print(e)`} />}>
        <P style={{ margin: 0 }}>Вместо <code>return False</code> из задачи 4 — заведи собственный класс исключения <code>InsufficientFundsError(Exception)</code> и бросай его из <code>withdraw()</code>, если денег не хватает.</P>
      </TaskCard>

      <TaskCard n={19} difficulty="medium" title="Абстрактный класс Shape"
        solution={<Code code={`from abc import ABC, abstractmethod

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
print(Square(4).area())  # 16`} />}>
        <P style={{ margin: 0 }}>Сделай <code>Shape</code> абстрактным классом через <code>abc.ABC</code> с абстрактным методом <code>area()</code>, чтобы <code>Shape()</code> напрямую создать было нельзя, а <code>Square(Shape)</code> обязан реализовать <code>area()</code>.</P>
      </TaskCard>

      <TaskCard n={20} difficulty="medium" title="__eq__ и __hash__ для set"
        solution={<Code code={`class Point:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __eq__(self, other):
        return isinstance(other, Point) and (self.x, self.y) == (other.x, other.y)

    def __hash__(self):
        return hash((self.x, self.y))

points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))  # 2 — дубликат по значению схлопнулся`} />}>
        <P style={{ margin: 0 }}>Реализуй <code>__eq__</code> и <code>__hash__</code> для <code>Point(x, y)</code> так, чтобы два «одинаковых» по координатам объекта считались одним элементом в <code>set</code>. Подсказка: если переопределяешь <code>__eq__</code>, Python сбрасывает <code>__hash__</code> в <code>None</code> — его надо задать явно.</P>
      </TaskCard>

      <SubTitle id="practice-hard">Сложные (21–30)</SubTitle>

      <TaskCard n={21} difficulty="hard" title="Итератор Fibonacci"
        solution={<Code code={`class Fibonacci:
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

print(list(Fibonacci(7)))  # [0, 1, 1, 2, 3, 5, 8]`} />}>
        <P style={{ margin: 0 }}>Класс <code>Fibonacci(limit)</code>, который сам является итератором: реализуй <code>__iter__</code> и <code>__next__</code> так, чтобы <code>list(Fibonacci(7))</code> дал первые 7 чисел Фибоначчи.</P>
      </TaskCard>

      <TaskCard n={22} difficulty="hard" title="Context manager: Timer"
        solution={<Code code={`import time

class Timer:
    def __enter__(self):
        self.start = time.perf_counter()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.elapsed = time.perf_counter() - self.start
        print(f"Прошло {self.elapsed:.4f} сек")
        return False  # не подавляем исключения, если они были

with Timer():
    total = sum(range(10**6))`} />}>
        <P style={{ margin: 0 }}>Класс <code>Timer</code>, который можно использовать через <code>with Timer():</code> — замеряет время выполнения блока и печатает его при выходе. Реализуй <code>__enter__</code> и <code>__exit__</code>.</P>
      </TaskCard>

      <TaskCard n={23} difficulty="hard" title="Дескриптор PositiveNumber"
        solution={<Code code={`class PositiveNumber:
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
    print(e)  # price должно быть положительным`} />}>
        <P style={{ margin: 0 }}>Напиши дескриптор <code>PositiveNumber</code> (с <code>__get__</code>/<code>__set__</code>), который можно переиспользовать для нескольких полей — <code>price</code> и <code>quantity</code> в <code>Product</code> — так, чтобы оба поля не давали присвоить неположительное значение, без копипасты property на каждое поле отдельно.</P>
      </TaskCard>

      <TaskCard n={24} difficulty="hard" title="Паттерн Observer"
        solution={<Code code={`class Subject:
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
# [LOG] Заказ оформлен`} />}>
        <P style={{ margin: 0 }}>Реализуй паттерн Observer: класс <code>Subject</code> с <code>subscribe(observer)</code> и <code>notify(event)</code>, который оповещает всех подписчиков. Заведи два разных наблюдателя (например, <code>EmailObserver</code> и <code>LogObserver</code>) с общим интерфейсом <code>update(event)</code>.</P>
      </TaskCard>

      <TaskCard n={25} difficulty="hard" title="Паттерн Factory"
        solution={<Code code={`class Circle:
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
print(shape.area())  # площадь круга`} />}>
        <P style={{ margin: 0 }}>Реализуй паттерн Factory: <code>ShapeFactory.create("circle")</code> должен вернуть правильный подкласс фигуры по строковому имени, не заставляя вызывающий код знать про конкретные классы <code>Circle</code>/<code>Square</code> напрямую.</P>
      </TaskCard>

      <TaskCard n={26} difficulty="hard" title="Паттерн Strategy"
        solution={<Code code={`class SortContext:
    def __init__(self, strategy):
        self.strategy = strategy

    def sort(self, data):
        return self.strategy(data)

ascending = lambda data: sorted(data)
descending = lambda data: sorted(data, reverse=True)

context = SortContext(ascending)
print(context.sort([3, 1, 2]))  # [1, 2, 3]

context.strategy = descending
print(context.sort([3, 1, 2]))  # [3, 2, 1]`} />}>
        <P style={{ margin: 0 }}>Реализуй паттерн Strategy: класс <code>SortContext</code>, которому можно на лету подменить алгоритм сортировки (например, по возрастанию/убыванию), не переписывая сам класс — новую стратегию добавляем отдельной функцией, а не веткой <code>if/elif</code> внутри <code>sort()</code>.</P>
      </TaskCard>

      <TaskCard n={27} difficulty="hard" title="Миксины"
        solution={<Code code={`import json

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
print(a.to_json())   # {"name": "A", "value": 10}`} />}>
        <P style={{ margin: 0 }}>Заведи два независимых миксина — <code>JsonMixin</code> (добавляет <code>to_json()</code>) и <code>ComparableMixin</code> (добавляет <code>__lt__</code> по полю <code>value</code>) — и собери класс <code>Item</code>, наследуясь сразу от обоих.</P>
      </TaskCard>

      <TaskCard n={28} difficulty="hard" title="__slots__: что ломается"
        solution={<>
          <Code code={`class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x, self.y = x, y

p = Point(1, 2)
p.x = 10       # работает — x объявлен в slots
# p.z = 3      # AttributeError: 'Point' object has no attribute 'z'`} />
          <P style={{ margin: '10px 0 0' }}><code>__slots__</code> убирает у экземпляра служебный <code>__dict__</code>, заменяя его набором фиксированных «слотов» — это экономит память при создании миллионов объектов. Плата за это: нельзя добавить атрибут, не объявленный в <code>__slots__</code>, множественное наследование от нескольких классов со своими <code>__slots__</code> усложняется, а без явного <code>"__weakref__"</code> в списке слотов на объект нельзя создать weak reference.</P>
        </>}>
        <P style={{ margin: 0 }}>Перепиши класс <code>Point(x, y)</code> так, чтобы он использовал <code>__slots__</code> вместо обычного <code>__dict__</code>. Что теперь перестанет работать и почему это иногда оправданный компромисс?</P>
      </TaskCard>

      <TaskCard n={29} difficulty="hard" title="Метакласс, требующий метод"
        solution={<Code code={`class RequireRunMeta(type):
    def __new__(mcs, name, bases, namespace):
        if bases and "run" not in namespace:
            raise TypeError(f"Класс {name} должен реализовать метод run()")
        return super().__new__(mcs, name, bases, namespace)

class Task(metaclass=RequireRunMeta):
    def run(self):
        pass

class BadTask(Task):
    pass
# TypeError: класс BadTask должен реализовать метод run()`} />}>
        <P style={{ margin: 0 }}>Напиши метакласс <code>RequireRunMeta</code>, который на этапе создания класса проверяет, что в нём объявлен метод <code>run()</code> — и бросает <code>TypeError</code>, если наследник забыл его реализовать. Это упрощённый самодельный аналог того, что даёт <code>abc.ABC</code>.</P>
      </TaskCard>

      <TaskCard n={30} difficulty="hard" title="Рефакторинг God Class по SOLID"
        solution={<>
          <Code code={`class OrderValidator:
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
        self.mailer.send(order, total)`} />
          <P style={{ margin: '10px 0 0' }}>Каждый класс отвечает ровно за одну вещь (Single Responsibility), а <code>OrderProcessor</code> теперь просто оркестрирует их вызовы через композицию. Захочешь заменить email на SMS — меняешь только <code>EmailSender</code>, не трогая валидацию, расчёт цены или сохранение (Open/Closed).</P>
        </>}>
        <P style={{ margin: '0 0 10px' }}>Класс ниже нарушает Single Responsibility Principle — делает сразу всё: валидирует заказ, считает цену, пишет в БД, шлёт письмо. Разбей его на несколько классов с одной ответственностью каждый, связав их композицией внутри <code>OrderProcessor</code>.</P>
        <Code code={`class OrderProcessor:
    def process(self, order):
        if not order.items:
            raise ValueError("Пустой заказ")
        total = sum(i.price * i.qty for i in order.items)
        print(f"Сохраняю заказ на сумму {total} в БД")
        print(f"Письмо клиенту {order.customer_email}: заказ на {total} принят")`} />
      </TaskCard>

    </div>
  )
}
