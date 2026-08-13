import { useEffect, useState } from 'react'

/* ═══════════════════════════ Shared UI ═══════════════════════════ */

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>

const Lime = ({ children }) => <span style={{ color: 'var(--accent-lime)', fontWeight: 600 }}>{children}</span>

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 6 }}>{item}</li>)}
  </ul>
)

const Note = ({ children }) => (
  <div style={{ background: 'rgba(32,190,255,0.05)', border: '1px solid rgba(32,190,255,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>{children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    <span style={{ color: '#f87171', fontWeight: 700, marginRight: 6 }}>⚠️</span>{children}
  </div>
)

const Code = ({ code }) => {
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">python</div>
      <pre className="theory-code"><code>
        {lines.map((line, i) => {
          const idx = line.indexOf('#')
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
      </code></pre>
    </div>
  )
}

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, minWidth: 'max-content' }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ textAlign: 'left', padding: '8px 14px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', whiteSpace: 'nowrap', fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)', color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', fontFamily: j === 0 ? 'monospace' : 'inherit' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const SectionTitle = ({ id, kicker, children }) => (
  <div id={id} style={{ margin: '56px 0 18px', scrollMarginTop: 80 }}>
    {kicker && <div style={{ color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>}
    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, fontFamily: 'var(--font-syne)', margin: 0, paddingBottom: 12, borderBottom: '2px solid var(--accent-lime)' }}>{children}</h2>
  </div>
)

const SubTitle = ({ children }) => (
  <h3 style={{ color: 'var(--text-primary)', fontSize: 'clamp(16px, 2.6vw, 19px)', fontWeight: 700, margin: '28px 0 8px' }}>{children}</h3>
)

const QA = ({ n, q, children }) => {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ margin: '16px 0', border: '1px solid var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: open ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: 'none', cursor: 'pointer', padding: '14px 16px', textAlign: 'left', display: 'flex', gap: 10, alignItems: 'flex-start' }}
      >
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-lime)', fontSize: 14, flexShrink: 0, lineHeight: 1.5 }}>{n}.</span>
        <span style={{ color: 'var(--text-primary)', fontSize: 'clamp(14px, 2.2vw, 16px)', fontWeight: 600, lineHeight: 1.5, flex: 1, textAlign: 'left' }}>{q}</span>
        <span style={{ color: open ? 'var(--accent-lime)' : 'var(--text-tertiary)', fontSize: 18, flexShrink: 0, lineHeight: 1, marginTop: 2, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '16px 16px 16px 42px', background: 'var(--bg-secondary)' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════ TOC ═══════════════════════════ */

const TOC = [
  { id: 'ch1', label: 'Глава 1 — Переменные и типы данных', n: '' },
  { id: 'ch2', label: 'Глава 2 — Строки', n: '' },
  { id: 'ch3', label: 'Глава 3 — Операторы и условия', n: '' },
  { id: 'ch4', label: 'Глава 4 — Циклы', n: '' },
  { id: 'ch5', label: 'Глава 5 — Коллекции', n: '' },
  { id: 'ch6', label: 'Глава 6 — Функции', n: '' },
  { id: 'ch7', label: 'Глава 7 — Comprehensions и встроенные функции', n: '' },
  { id: 'ch8', label: 'Глава 8 — Обработка ошибок', n: '' },
  { id: 'ch9', label: 'Глава 9 — Модули, файлы и основы ООП', n: '' },
]

/* ═══════════════════════════ Main ═══════════════════════════ */

export default function PythonLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 8, padding: '6px 14px', color: '#60a5fa', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>PYTHON</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>С нуля → уверенная база</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          Все основы Python в одном ликбезе
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 660 }}>
          Полный конспект по базовому Python: переменные и типы данных, строки, условия, циклы, коллекции,
          функции, comprehensions, обработка ошибок и основы ООП. С примерами кода и вопросами для самопроверки
          после каждой главы. Всё, что нужно, чтобы уверенно писать код и не бояться собеседования.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['9 глав', 'примеры кода', 'самопроверка', '~60 мин'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 24 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {TOC.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', gap: 12 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            ><span>{item.label}</span><span style={{ color: 'var(--text-tertiary)', fontSize: 12, flexShrink: 0 }}>{item.n}</span></button>
          ))}
        </div>
      </div>

      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Chapter6 />
      <Chapter7 />
      <Chapter8 />
      <Chapter9 />

      <div style={{ marginTop: 60, padding: '24px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, textAlign: 'center' }}>
        <P style={{ fontSize: 14 }}>Это конец ликбеза по основам Python. Возвращайся к нему, когда что-то подзабыл — и практикуйся! 🐍</P>
        <button onClick={onBack} style={{ marginTop: 8, background: 'var(--accent-lime)', border: 'none', color: '#0a0a14', padding: '8px 20px', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>← Ко всем ликбезам</button>
      </div>
    </div>
  )
}

/* ═══════════════════════════ CHAPTER 1 ═══════════════════════════ */

function Chapter1() {
  return (
    <section>
      <SectionTitle id="ch1" kicker="Глава 1">Переменные и типы данных</SectionTitle>

      <P>
        <B>Переменная</B> — это имя, связанное со значением. В Python не нужно объявлять тип заранее: интерпретатор
        сам определяет его по значению (это называется <B>динамическая типизация</B>). Присваивание — знак <code>=</code>.
      </P>
      <Code code={`x = 42            # int  — целое число
pi = 3.14         # float — вещественное
name = "Аня"      # str  — строка
is_active = True  # bool — True / False
nothing = None    # NoneType — «пустое» значение

print(type(x))    # <class 'int'>`} />

      <SubTitle>Основные типы</SubTitle>
      <Table
        headers={['Тип', 'Назначение', 'Пример']}
        rows={[
          ['int', 'Целые числа', '5, -17, 1000'],
          ['float', 'Дробные числа', '3.14, -0.5'],
          ['str', 'Строки (текст)', '"привет"'],
          ['bool', 'Логический тип', 'True, False'],
          ['list', 'Изменяемый список', '[1, 2, 3]'],
          ['tuple', 'Неизменяемый кортеж', '(1, 2)'],
          ['dict', 'Словарь ключ→значение', '{"a": 1}'],
          ['set', 'Множество уникальных', '{1, 2, 3}'],
          ['None', 'Отсутствие значения', 'None'],
        ]}
      />

      <SubTitle>Преобразование типов</SubTitle>
      <P>Значения одного типа можно превращать в другой — это называется <B>приведение типов</B> (casting).</P>
      <Code code={`int("42")      # 42   строка → число
float("3.14")  # 3.14
str(100)       # "100"  число → строка
bool(0)        # False  (0, "", [], None → False)
bool(5)        # True

int("abc")     # ошибка ValueError!`} />

      <Note>
        Функция <Lime>input()</Lime> всегда возвращает <B>строку</B>. Чтобы получить число, оберни её в <code>int()</code>
        или <code>float()</code>: <code>age = int(input("Возраст: "))</code>.
      </Note>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Что такое динамическая типизация?">
        <P>Тип переменной определяется автоматически по присвоенному значению во время выполнения, а не задаётся заранее. Одна и та же переменная может в разные моменты хранить значения разных типов: <code>x = 5</code>, затем <code>x = "hi"</code> — валидно.</P>
      </QA>
      <QA n={2} q="Что вернёт bool([]) и почему?">
        <P><B>False</B>. Пустые коллекции (<code>[]</code>, <code>{'{}'}</code>, <code>""</code>), число <code>0</code> и <code>None</code> в логическом контексте считаются «ложными» (falsy). Всё остальное — «истинно» (truthy).</P>
      </QA>
      <QA n={3} q="В чём разница между None и 0?">
        <P><code>0</code> — это конкретное число типа <code>int</code>. <code>None</code> — специальное значение типа <code>NoneType</code>, означающее «ничего / значение отсутствует». Они не равны: <code>0 == None</code> → <code>False</code>.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 2 ═══════════════════════════ */

function Chapter2() {
  return (
    <section>
      <SectionTitle id="ch2" kicker="Глава 2">Строки</SectionTitle>

      <P>
        <B>Строка</B> (str) — последовательность символов. Индексация начинается с нуля, поддерживаются срезы.
        Строки <B>неизменяемы</B>: методы не меняют оригинал, а возвращают новую строку.
      </P>
      <Code code={`s = "Python"
len(s)      # 6   длина
s[0]        # 'P'  первый символ
s[-1]       # 'n'  последний символ
s[0:3]      # 'Pyt'  срез [start:stop]
s[::-1]     # 'nohtyP'  разворот`} />

      <SubTitle>Полезные методы</SubTitle>
      <Code code={`s.upper()            # 'PYTHON'
s.lower()            # 'python'
"  hi  ".strip()     # 'hi'   убрать пробелы по краям
s.replace("P", "J")  # 'Jython'
"a,b,c".split(",")   # ['a', 'b', 'c']
"-".join(["a", "b"]) # 'a-b'
s.startswith("Py")   # True
"cat".find("a")      # 1  индекс подстроки (-1 если нет)`} />

      <SubTitle>f-строки — форматирование</SubTitle>
      <P>Самый удобный способ вставлять значения в текст — f-строки (буква <code>f</code> перед кавычкой).</P>
      <Code code={`age = 25
name = "Аня"
print(f"Меня зовут {name}, мне {age} лет")
print(f"Через год будет {age + 1}")     # можно выражения
print(f"{3.14159:.2f}")                 # '3.14'  округление`} />

      <Warn>
        Строку нельзя изменить по индексу: <code>s[0] = "J"</code> вызовет ошибку. Нужно создать новую строку,
        например через <code>replace()</code> или срезы.
      </Warn>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Что выведет 'Python'[1:4]?">
        <P><code>'yth'</code>. Срез <code>[1:4]</code> берёт символы с индекса 1 по 3 включительно (правая граница не входит).</P>
      </QA>
      <QA n={2} q="Что значит «строки неизменяемы»?">
        <P>После создания строку нельзя изменить на месте. Любой метод (<code>upper</code>, <code>replace</code>…) возвращает <B>новую</B> строку, а исходная остаётся прежней. Поэтому результат нужно присваивать: <code>s = s.upper()</code>.</P>
      </QA>
      <QA n={3} q="Как развернуть строку задом наперёд?">
        <P>Срезом с шагом -1: <code>s[::-1]</code>. Например, <code>"abc"[::-1]</code> → <code>"cba"</code>.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 3 ═══════════════════════════ */

function Chapter3() {
  return (
    <section>
      <SectionTitle id="ch3" kicker="Глава 3">Операторы и условия</SectionTitle>

      <SubTitle>Арифметика</SubTitle>
      <Code code={`7 + 3    # 10   сложение
7 - 3    # 4    вычитание
7 * 3    # 21   умножение
7 / 3    # 2.333...  деление (всегда float)
7 // 3   # 2    целочисленное деление
7 % 3    # 1    остаток от деления
2 ** 10  # 1024  возведение в степень`} />

      <SubTitle>Сравнение и логика</SubTitle>
      <Code code={`5 > 3      # True
5 == 5     # True   равно
5 != 4     # True   не равно
5 >= 5     # True

True and False  # False   И
True or False   # True    ИЛИ
not True        # False   НЕ`} />

      <SubTitle>Условный оператор if / elif / else</SubTitle>
      <Code code={`age = 18
if age < 18:
    print("Несовершеннолетний")
elif age == 18:
    print("Ровно 18")
else:
    print("Взрослый")`} />

      <P>
        Блоки кода в Python задаются <B>отступами</B> (обычно 4 пробела), а не фигурными скобками.
        Есть краткая запись — <B>тернарный оператор</B>:
      </P>
      <Code code={`status = "можно" if age >= 18 else "нельзя"`} />

      <Warn>
        Неправильный отступ вызывает ошибку <code>IndentationError</code>. Не смешивай пробелы и табы — выбери что-то одно (обычно 4 пробела).
      </Warn>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Чем отличается / от //?">
        <P><code>/</code> — обычное деление, всегда возвращает <code>float</code> (<code>7 / 2 == 3.5</code>). <code>//</code> — целочисленное деление, отбрасывает дробную часть (<code>7 // 2 == 3</code>).</P>
      </QA>
      <QA n={2} q="Что выведет: x = 5; print('B' if x > 3 else 'C')?">
        <P><code>B</code>. Условие <code>x &gt; 3</code> истинно, поэтому тернарный оператор возвращает значение до <code>if</code>.</P>
      </QA>
      <QA n={3} q="Как задаются блоки кода в Python?">
        <P>Отступами (обычно 4 пробела). Всё, что с одинаковым отступом под <code>if</code>, <code>for</code>, <code>def</code> и т.п. — относится к этому блоку. Фигурные скобки, как в других языках, не используются.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 4 ═══════════════════════════ */

function Chapter4() {
  return (
    <section>
      <SectionTitle id="ch4" kicker="Глава 4">Циклы</SectionTitle>

      <SubTitle>Цикл for — перебор последовательности</SubTitle>
      <Code code={`for i in range(5):        # 0, 1, 2, 3, 4
    print(i)

for fruit in ["яблоко", "груша"]:
    print(fruit)

# range(start, stop, step)
for i in range(2, 11, 2):  # 2, 4, 6, 8, 10
    print(i)`} />

      <SubTitle>Цикл while — пока условие истинно</SubTitle>
      <Code code={`n = 5
while n > 0:
    print(n)
    n -= 1    # без этого — бесконечный цикл!`} />

      <SubTitle>break и continue</SubTitle>
      <Ul items={[
        <><Lime>break</Lime> — немедленно прерывает цикл целиком</>,
        <><Lime>continue</Lime> — пропускает текущую итерацию и переходит к следующей</>,
      ]} />
      <Code code={`for i in range(10):
    if i == 5:
        break        # выходим на i == 5
    if i % 2 == 0:
        continue     # пропускаем чётные
    print(i)         # выведет 1, 3`} />

      <Warn>
        В цикле <code>while</code> следи, чтобы условие когда-нибудь стало ложным (например, меняй счётчик).
        Иначе получишь <B>бесконечный цикл</B>, и программа зависнет.
      </Warn>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Что выведет for i in range(1, 6, 2)?">
        <P><code>1 3 5</code>. <code>range(start, stop, step)</code>: старт 1, стоп 6 (не включается), шаг 2.</P>
      </QA>
      <QA n={2} q="В чём разница между break и continue?">
        <P><code>break</code> полностью выходит из цикла. <code>continue</code> прекращает только текущую итерацию и переходит к следующей, не выходя из цикла.</P>
      </QA>
      <QA n={3} q="Когда выбирать while, а когда for?">
        <P><code>for</code> — когда известно, по чему итерировать (список, диапазон, строка). <code>while</code> — когда цикл должен работать, пока выполняется условие, а число итераций заранее неизвестно.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 5 ═══════════════════════════ */

function Chapter5() {
  return (
    <section>
      <SectionTitle id="ch5" kicker="Глава 5">Коллекции</SectionTitle>

      <SubTitle>Список (list) — упорядоченный, изменяемый</SubTitle>
      <Code code={`nums = [3, 1, 2]
nums.append(4)      # [3, 1, 2, 4]  добавить в конец
nums.insert(0, 0)   # [0, 3, 1, 2, 4]  вставить по индексу
nums.remove(1)      # удалить первое вхождение значения 1
nums.pop()          # удалить и вернуть последний
nums.sort()         # отсортировать на месте
2 in nums           # True   проверка вхождения
nums[1:3]           # срез, как у строк`} />

      <SubTitle>Кортеж (tuple) — упорядоченный, неизменяемый</SubTitle>
      <Code code={`point = (10, 20)
x, y = point        # распаковка: x=10, y=20
point[0]            # 10
# point[0] = 5      # ошибка! tuple менять нельзя`} />

      <SubTitle>Словарь (dict) — пары ключ → значение</SubTitle>
      <Code code={`user = {"name": "Аня", "age": 25}
user["name"]            # 'Аня'
user["city"] = "Москва" # добавить ключ
user.get("phone", "—")  # безопасно: '—' если ключа нет
for key, value in user.items():
    print(key, value)`} />

      <SubTitle>Множество (set) — уникальные элементы</SubTitle>
      <Code code={`a = {1, 2, 3}
b = {2, 3, 4}
a | b   # {1,2,3,4}  объединение
a & b   # {2,3}      пересечение
a - b   # {1}        разность
set([1,1,2,2,3])     # {1,2,3}  убрать дубликаты`} />

      <Table
        headers={['Коллекция', 'Порядок', 'Изменяемая', 'Дубликаты']}
        rows={[
          ['list', 'да', 'да', 'да'],
          ['tuple', 'да', 'нет', 'да'],
          ['dict', 'да*', 'да', 'ключи — нет'],
          ['set', 'нет', 'да', 'нет'],
        ]}
      />
      <P style={{ fontSize: 12.5, color: 'var(--text-tertiary)' }}>* начиная с Python 3.7 словарь сохраняет порядок вставки.</P>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Чем список отличается от кортежа?">
        <P>Список (<code>list</code>) изменяемый — можно добавлять, удалять, менять элементы. Кортеж (<code>tuple</code>) неизменяемый. Кортежи чуть быстрее и подходят, когда данные не должны меняться (например, координаты).</P>
      </QA>
      <QA n={2} q="Как безопасно получить значение из словаря, если ключа может не быть?">
        <P>Методом <code>get</code>: <code>d.get("key", default)</code>. Он вернёт значение по ключу или <code>default</code> (по умолчанию <code>None</code>), не вызывая <code>KeyError</code>, в отличие от <code>d["key"]</code>.</P>
      </QA>
      <QA n={3} q="Как быстро убрать дубликаты из списка?">
        <P>Превратить его в множество: <code>set(lst)</code>. При необходимости вернуть список — <code>list(set(lst))</code> (но порядок при этом может потеряться).</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 6 ═══════════════════════════ */

function Chapter6() {
  return (
    <section>
      <SectionTitle id="ch6" kicker="Глава 6">Функции</SectionTitle>

      <P>
        <B>Функция</B> — именованный блок кода, который можно вызывать много раз. Объявляется через <code>def</code>,
        возвращает результат через <code>return</code>.
      </P>
      <Code code={`def greet(name, greeting="Привет"):
    return f"{greeting}, {name}!"

greet("Аня")                # 'Привет, Аня!'
greet("Ваня", "Здравствуй") # 'Здравствуй, Ваня!'`} />

      <P><code>greeting="Привет"</code> — <B>параметр по умолчанию</B>: если аргумент не передан, используется это значение.</P>

      <SubTitle>Несколько возвращаемых значений</SubTitle>
      <Code code={`def min_max(nums):
    return min(nums), max(nums)   # вернётся кортеж

low, high = min_max([3, 7, 1])   # low=1, high=7`} />

      <SubTitle>*args и **kwargs</SubTitle>
      <P>Позволяют принимать произвольное число аргументов.</P>
      <Code code={`def total(*args):        # args — кортеж всех позиционных
    return sum(args)
total(1, 2, 3)           # 6

def info(**kwargs):      # kwargs — словарь именованных
    for k, v in kwargs.items():
        print(k, v)
info(name="Аня", age=25)`} />

      <SubTitle>Лямбда — короткая функция</SubTitle>
      <Code code={`square = lambda x: x ** 2
square(5)   # 25

# часто используется как аргумент, например в sorted:
sorted(["bbb", "a", "cc"], key=lambda s: len(s))
# ['a', 'cc', 'bbb']`} />

      <Note>
        <B>Область видимости:</B> переменные, созданные внутри функции, доступны только внутри неё (локальные).
        Функция может читать внешние переменные, но чтобы изменить глобальную — нужен <code>global</code>.
      </Note>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Что делает return? Что будет, если его нет?">
        <P><code>return</code> возвращает значение из функции и завершает её. Если <code>return</code> нет (или он без значения), функция возвращает <code>None</code>.</P>
      </QA>
      <QA n={2} q="Зачем нужны *args и **kwargs?">
        <P>Чтобы функция принимала произвольное количество аргументов. <code>*args</code> собирает лишние позиционные аргументы в кортеж, <code>**kwargs</code> — именованные в словарь.</P>
      </QA>
      <QA n={3} q="Что такое лямбда-функция?">
        <P>Короткая анонимная функция из одного выражения: <code>lambda x: x * 2</code>. Удобна как разовый аргумент, например в <code>sorted</code>, <code>map</code>, <code>filter</code>. Для сложной логики лучше обычная <code>def</code>.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 7 ═══════════════════════════ */

function Chapter7() {
  return (
    <section>
      <SectionTitle id="ch7" kicker="Глава 7">Comprehensions и встроенные функции</SectionTitle>

      <SubTitle>List comprehension</SubTitle>
      <P>Компактный способ создать список из другого итерируемого объекта — вместо цикла с <code>append</code>.</P>
      <Code code={`squares = [x**2 for x in range(5)]        # [0, 1, 4, 9, 16]
evens = [x for x in range(10) if x % 2 == 0]  # [0, 2, 4, 6, 8]

# аналог через обычный цикл:
squares = []
for x in range(5):
    squares.append(x**2)`} />

      <SubTitle>Dict и set comprehension</SubTitle>
      <Code code={`{x: x**2 for x in range(4)}   # {0:0, 1:1, 2:4, 3:9}
{x % 3 for x in range(10)}    # {0, 1, 2}  множество`} />

      <SubTitle>Полезные встроенные функции</SubTitle>
      <Code code={`len([1,2,3])            # 3
sum([1,2,3])            # 6
min([3,1,2]), max([3,1,2])   # 1, 3
sorted([3,1,2])         # [1, 2, 3]
abs(-5)                 # 5
round(3.567, 1)         # 3.6

list(enumerate(["a","b"]))   # [(0,'a'), (1,'b')]
list(zip([1,2], ["a","b"]))  # [(1,'a'), (2,'b')]`} />

      <SubTitle>map и filter</SubTitle>
      <Code code={`nums = [1, 2, 3, 4]
list(map(lambda x: x*2, nums))          # [2, 4, 6, 8]
list(filter(lambda x: x % 2 == 0, nums)) # [2, 4]

# то же через comprehension (обычно читаемее):
[x*2 for x in nums]
[x for x in nums if x % 2 == 0]`} />

      <SubTitle>enumerate и zip</SubTitle>
      <Code code={`for i, fruit in enumerate(["яблоко", "груша"]):
    print(i, fruit)     # 0 яблоко / 1 груша

names = ["Аня", "Ваня"]
ages = [25, 30]
for name, age in zip(names, ages):
    print(name, age)`} />

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Что вернёт [x*2 for x in [1,2,3]]?">
        <P><code>[2, 4, 6]</code>. List comprehension применяет <code>x*2</code> к каждому элементу списка.</P>
      </QA>
      <QA n={2} q="Зачем нужен enumerate?">
        <P>Чтобы в цикле получать сразу и индекс, и элемент: <code>for i, item in enumerate(lst)</code>. Это чище, чем вручную вести счётчик или обращаться по <code>lst[i]</code>.</P>
      </QA>
      <QA n={3} q="Что делает zip?">
        <P>«Склеивает» несколько последовательностей поэлементно в пары (кортежи). <code>zip([1,2],[3,4])</code> → <code>(1,3), (2,4)</code>. Останавливается по самой короткой из них.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 8 ═══════════════════════════ */

function Chapter8() {
  return (
    <section>
      <SectionTitle id="ch8" kicker="Глава 8">Обработка ошибок</SectionTitle>

      <P>
        Когда во время выполнения что-то идёт не так, Python «выбрасывает» <B>исключение</B> (exception) и программа
        падает. Чтобы это перехватить и обработать, используют <code>try / except</code>.
      </P>
      <Code code={`try:
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
    print("Этот блок выполнится всегда")`} />

      <Ul items={[
        <><Lime>try</Lime> — код, который может вызвать ошибку</>,
        <><Lime>except</Lime> — что делать при конкретной ошибке</>,
        <><Lime>else</Lime> — выполнится, если ошибок не было</>,
        <><Lime>finally</Lime> — выполнится в любом случае (даже при ошибке)</>,
      ]} />

      <SubTitle>Частые исключения</SubTitle>
      <Table
        headers={['Исключение', 'Когда возникает']}
        rows={[
          ['ValueError', 'неверное значение: int("abc")'],
          ['TypeError', 'операция над несовместимыми типами'],
          ['ZeroDivisionError', 'деление на ноль'],
          ['KeyError', 'нет ключа в словаре'],
          ['IndexError', 'индекс за границей списка'],
          ['FileNotFoundError', 'файл не найден'],
        ]}
      />

      <SubTitle>Своя ошибка через raise</SubTitle>
      <Code code={`def set_age(age):
    if age < 0:
        raise ValueError("Возраст не может быть отрицательным")
    return age`} />

      <Warn>
        Не пиши «голый» <code>except:</code> без указания типа — он ловит вообще всё, включая опечатки, и прячет реальные
        ошибки. Указывай конкретный класс исключения.
      </Warn>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Чем отличаются блоки else и finally в try?">
        <P><code>else</code> выполняется только если в <code>try</code> не было ошибок. <code>finally</code> выполняется <B>всегда</B> — и при успехе, и при ошибке (обычно для очистки: закрыть файл, соединение).</P>
      </QA>
      <QA n={2} q="Что делает raise?">
        <P>Принудительно выбрасывает исключение. Используется для проверки условий: если данные некорректны, функция сама «сигналит» об ошибке через <code>raise ValueError(...)</code>.</P>
      </QA>
      <QA n={3} q="Почему плохо писать except без типа?">
        <P>Такой блок перехватывает абсолютно все исключения, включая случайные баги и опечатки в коде. Это маскирует реальные проблемы и усложняет отладку. Нужно ловить конкретные типы.</P>
      </QA>
    </section>
  )
}

/* ═══════════════════════════ CHAPTER 9 ═══════════════════════════ */

function Chapter9() {
  return (
    <section>
      <SectionTitle id="ch9" kicker="Глава 9">Модули, файлы и основы ООП</SectionTitle>

      <SubTitle>Импорт модулей</SubTitle>
      <P>Модуль — это файл с кодом, который можно переиспользовать. Стандартная библиотека Python огромна.</P>
      <Code code={`import math
math.sqrt(16)        # 4.0
math.pi              # 3.14159...

from random import randint
randint(1, 6)        # случайное число 1..6

from datetime import date
date.today()         # текущая дата`} />

      <SubTitle>Работа с файлами</SubTitle>
      <P>Конструкция <code>with</code> автоматически закрывает файл, даже если возникла ошибка.</P>
      <Code code={`# запись
with open("file.txt", "w", encoding="utf-8") as f:
    f.write("Привет\\n")

# чтение
with open("file.txt", "r", encoding="utf-8") as f:
    text = f.read()          # весь файл строкой
    # или построчно:
    for line in f:
        print(line.strip())`} />
      <Table
        headers={['Режим', 'Значение']}
        rows={[
          ['"r"', 'чтение (по умолчанию)'],
          ['"w"', 'запись (перезаписывает файл)'],
          ['"a"', 'дозапись в конец'],
          ['"r+"', 'чтение и запись'],
        ]}
      />

      <SubTitle>Основы ООП: классы и объекты</SubTitle>
      <P>
        <B>Класс</B> — шаблон, описывающий данные (атрибуты) и поведение (методы). <B>Объект</B> — конкретный экземпляр класса.
        Метод <code>__init__</code> — конструктор, вызывается при создании объекта; <code>self</code> — сам объект.
      </P>
      <Code code={`class Dog:
    def __init__(self, name, age):
        self.name = name      # атрибуты
        self.age = age

    def bark(self):           # метод
        return f"{self.name} говорит: Гав!"

rex = Dog("Рекс", 3)          # создаём объект
print(rex.name)               # 'Рекс'
print(rex.bark())             # 'Рекс говорит: Гав!'`} />

      <Note>
        Три кита ООП: <B>инкапсуляция</B> (данные и методы вместе), <B>наследование</B> (класс-потомок берёт поведение
        родителя), <B>полиморфизм</B> (один и тот же метод по-разному работает у разных классов). Это уже следующий уровень —
        но <code>__init__</code>, <code>self</code> и методы стоит понимать с самого начала.
      </Note>

      <SubTitle>Вопросы для самопроверки</SubTitle>
      <QA n={1} q="Зачем использовать with при работе с файлами?">
        <P><code>with</code> — контекстный менеджер: он гарантированно закрывает файл после блока, даже если внутри произошла ошибка. Без него легко забыть <code>f.close()</code> и оставить файл открытым.</P>
      </QA>
      <QA n={2} q="Что такое self в методе класса?">
        <P>Это ссылка на сам объект, у которого вызван метод. Через <code>self</code> метод обращается к атрибутам и другим методам этого экземпляра. Python передаёт его автоматически при вызове <code>obj.method()</code>.</P>
      </QA>
      <QA n={3} q="Что делает метод __init__?">
        <P>Это конструктор — он вызывается автоматически при создании объекта (<code>Dog("Рекс", 3)</code>) и обычно задаёт начальные атрибуты через <code>self</code>.</P>
      </QA>
    </section>
  )
}
