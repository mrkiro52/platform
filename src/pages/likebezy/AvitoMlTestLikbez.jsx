import { useEffect, useState } from 'react'

/* ═══════════════════════════ Shared UI ═══════════════════════════ */

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>

const C = ({ children }) => (
  <code style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-lime)', padding: '1px 6px', borderRadius: 3, fontSize: '0.9em', fontFamily: 'monospace' }}>{children}</code>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 6 }}>{item}</li>)}
  </ul>
)

const Code = ({ code, lang = 'python' }) => (
  <div className="theory-code-block">
    <div className="theory-code-label">{lang}</div>
    <pre className="theory-code"><code>{code}</code></pre>
  </div>
)

const Note = ({ children }) => (
  <div style={{ background: 'rgba(255,214,10,0.05)', border: '1px solid rgba(255,214,10,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    {children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    {children}
  </div>
)

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 'max-content' }}>
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
              <td key={j} style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)', color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', verticalAlign: 'top' }}>{cell}</td>
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

/* ─── Варианты ответа: правильные подсвечены зелёным ─── */
const Opts = ({ items }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 7, margin: '12px 0 16px' }}>
    {items.map(([text, ok], i) => (
      <div
        key={i}
        style={{
          display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 8,
          background: ok ? 'rgba(34,197,94,0.08)' : 'var(--bg-tertiary)',
          border: `1px solid ${ok ? 'rgba(34,197,94,0.35)' : 'var(--border-color)'}`,
        }}
      >
        <span style={{ flexShrink: 0, fontSize: 13, fontWeight: 700, color: ok ? '#4ade80' : 'var(--text-tertiary)', minWidth: 14 }}>
          {ok ? '✓' : '·'}
        </span>
        <span style={{ fontSize: 13.5, lineHeight: 1.6, color: ok ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{text}</span>
      </div>
    ))}
  </div>
)

const KIND_STYLE = {
  one:   { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  text: '#4ade80', label: 'Один ответ' },
  multi: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  text: '#facc15', label: 'Несколько' },
  code:  { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  text: '#f87171', label: 'Кодинг' },
}

function Q({ n, kind = 'one', question, children }) {
  const [open, setOpen] = useState(false)
  const s = KIND_STYLE[kind]
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 10, margin: '10px 0', background: open ? 'var(--bg-secondary)' : 'transparent', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 18px', textAlign: 'left', display: 'flex', gap: 12, alignItems: 'flex-start' }}
      >
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-tertiary)', fontSize: 13, flexShrink: 0, marginTop: 2, minWidth: 26 }}>{String(n).padStart(2, '0')}</span>
        <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 5, padding: '1px 8px', fontSize: 10.5, fontWeight: 700, flexShrink: 0, marginTop: 2, whiteSpace: 'nowrap' }}>{s.label}</span>
        <span style={{ color: 'var(--text-primary)', fontSize: 'clamp(13.5px, 2.2vw, 15px)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>{question}</span>
        <span style={{ color: open ? 'var(--accent-lime)' : 'var(--text-tertiary)', fontSize: 18, flexShrink: 0, lineHeight: 1, marginTop: 2, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '4px 20px 18px 20px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════ TOC ═══════════════════════════ */

const TOC = [
  { id: 'python',  label: 'Раздел 1 — Python (вопросы 1–5)' },
  { id: 'pandas',  label: 'Раздел 2 — Pandas и данные (6–8)' },
  { id: 'sql',     label: 'Раздел 3 — SQL (9–12)' },
  { id: 'ml',      label: 'Раздел 4 — ML-теория (13–16)' },
  { id: 'metrics', label: 'Раздел 5 — Метрики, валидация, воспроизводимость (17–19)' },
  { id: 'tools',   label: 'Раздел 6 — Инструменты (20–21)' },
  { id: 'coding',  label: 'Раздел 7 — Задачи на код (22–23)' },
]

/* ═══════════════════════════ Main ═══════════════════════════ */

export default function AvitoMlTestLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 8, padding: '6px 14px', color: '#4ade80', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>ML · СТАЖИРОВКА</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>Отборочный тест · 23 задания</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          Отборочный тест Avito ML Bootcamp: разбор всех 23 заданий
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 760 }}>
          Полный разбор отборочного теста на стажировку по машинному обучению в Avito: 21 тестовый вопрос
          и 2 задачи на код. Для каждого вопроса — правильный ответ, объяснение, почему он верен,
          и разбор каждого неверного варианта: чем именно он плох и на какой путанице построен.
        </p>
      </div>

      {/* Как устроен тест */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(18px, 3vw, 28px)', marginBottom: 32 }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-syne)', marginBottom: 12 }}>Как устроен тест</h3>
        <P style={{ marginTop: 0 }}>
          23 задания, на каждое отдельный таймер — обычно <B>1 минута</B>, на задачи посложнее 1:30–3 минуты,
          на код — около 15 минут. Вернуться к предыдущему вопросу нельзя, поэтому угадывать дешевле,
          чем зависать: пустой ответ и неверный стоят одинаково.
        </P>
        <Table
          headers={['Тема', 'Заданий', 'Что проверяют']}
          rows={[
            ['Python', '5', 'Изменяемость, ссылки, сложности, генераторы, исключения'],
            ['Pandas', '3', 'groupby, merge, утечки при заполнении пропусков'],
            ['SQL', '4', 'Оконные функции, порядок выполнения, агрегаты'],
            ['ML-теория', '4', 'Масштабирование, регуляризация, утечки, чтение метрик'],
            ['Метрики и валидация', '3', 'Precision/recall, валидация временных рядов, воспроизводимость'],
            ['Инструменты', '2', 'CatBoost, git'],
            ['Код', '2', 'Метрики классификации и min-max нормализация'],
          ]}
        />
        <Note>
          Главная сквозная тема теста — <B>утечка данных (data leakage)</B>. Ей прямо посвящены вопросы
          8, 15 и 20, и косвенно — 18. Если вы поймёте только одну вещь из этого разбора, пусть это
          будет она: любое преобразование, которое «подсматривает» в валидацию или тест, делает вашу
          оценку качества враньём.
        </Note>
      </div>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(18px, 3vw, 28px)', marginBottom: 40 }}>
        <h3 style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-syne)', marginBottom: 14 }}>Содержание</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {TOC.map(t => (
            <button
              key={t.id}
              onClick={() => scrollTo(t.id)}
              style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer', textAlign: 'left', padding: '4px 0' }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ═══════════ РАЗДЕЛ 1 — PYTHON ═══════════ */}
      <SectionTitle id="python" kicker="Раздел 1">Python</SectionTitle>

      <Q n={1} question="Что верно про list.sort() и sorted()?">
        <Opts items={[
          ['list.sort() возвращает новый список', false],
          ['sorted() сортирует «на месте»', false],
          ['list.sort() меняет список и возвращает None', true],
          ['sorted() только для списков', false],
        ]} />
        <P>
          В Python есть железное соглашение: <B>методы, которые меняют объект на месте, возвращают None</B>.
          Так ведут себя <C>list.sort()</C>, <C>list.append()</C>, <C>list.reverse()</C>, <C>dict.update()</C>.
          Это сделано намеренно — чтобы нельзя было случайно написать цепочку и решить, что получил копию.
        </P>
        <Code code={`nums = [3, 1, 2]

result = nums.sort()      # сортирует сам список
print(nums)               # [1, 2, 3]
print(result)             # None  ← вот главная ловушка

new = sorted(nums)        # возвращает НОВЫЙ список
print(new)                # [1, 2, 3]
print(nums is new)        # False — это разные объекты`} />
        <P><B>Почему остальные варианты неверны:</B></P>
        <Ul items={[
          <>«list.sort() возвращает новый список» — ровно наоборот: он ничего не возвращает, а меняет исходный.</>,
          <>«sorted() сортирует на месте» — тоже наоборот: <C>sorted()</C> не трогает аргумент, а строит новый список.</>,
          <>«sorted() только для списков» — <C>sorted()</C> принимает <B>любой итерируемый объект</B>: кортеж, множество, строку, словарь, генератор. И всегда возвращает именно список.</>,
        ]} />
        <Code code={`print(sorted("bca"))              # ['a', 'b', 'c']
print(sorted({3, 1, 2}))          # [1, 2, 3]
print(sorted({"b": 1, "a": 2}))   # ['a', 'b'] — по ключам`} />
        <Warn>
          Самая частая ошибка новичка: <C>nums = nums.sort()</C>. После этой строки в переменной лежит
          <C>None</C>, и следующая же операция со списком падает с <C>TypeError</C>.
        </Warn>
      </Q>

      <Q n={2} question="Что выведет код: a = [1,2,3]; b = a; a = a + [4]; print(b)">
        <Code code={`a = [1, 2, 3]
b = a
a = a + [4]
print(b)`} />
        <Opts items={[
          ['[1, 2, 3, 4]', false],
          ['[1, 2, 3]', true],
          ['Ошибка', false],
          ['[4]', false],
        ]} />
        <P>
          Вопрос проверяет понимание разницы между <B>изменением объекта</B> и <B>переприсваиванием имени</B>.
          Разберём по шагам:
        </P>
        <Table
          headers={['Строка', 'Что происходит', 'Куда смотрит a', 'Куда смотрит b']}
          rows={[
            ['a = [1,2,3]', 'создан список в памяти', 'на [1,2,3]', '—'],
            ['b = a', 'имя b привязано к тому же объекту', 'на [1,2,3]', 'на тот же [1,2,3]'],
            ['a = a + [4]', 'создан НОВЫЙ список, имя a привязано к нему', 'на новый [1,2,3,4]', 'на старый [1,2,3]'],
          ]}
        />
        <P>
          Ключ в третьей строке. Оператор <C>+</C> для списков <B>не изменяет</B> левый операнд — он
          создаёт новый список. Затем присваивание переставляет имя <C>a</C> на этот новый объект.
          Имя <C>b</C> при этом никто не трогал, оно по-прежнему указывает на исходный список.
        </P>
        <Code code={`a = [1, 2, 3]
b = a
print(id(a) == id(b))     # True — одно и то же место в памяти

a = a + [4]
print(id(a) == id(b))     # False — a переехал на новый объект
print(b)                  # [1, 2, 3]`} />
        <Note>
          А вот если бы использовали <C>a += [4]</C> или <C>a.append(4)</C> — ответ был бы другим.
          Эти операции меняют <B>сам объект</B>, а не переставляют имя, поэтому <C>b</C> увидел бы
          изменение и вывелось бы <C>[1, 2, 3, 4]</C>. Для списков <C>+=</C> — это по сути
          <C> extend()</C>, а не <C>a = a + ...</C>.
        </Note>
        <Code code={`a = [1, 2, 3]
b = a
a += [4]                  # меняет объект на месте
print(b)                  # [1, 2, 3, 4]  ← другой ответ`} />
        <Warn>
          Именно из-за этой разницы возникают неожиданные баги при передаче списков в функции.
          Внутри функции <C>lst.append(x)</C> изменит список вызывающего кода, а
          <C> lst = lst + [x]</C> — нет.
        </Warn>
      </Q>

      <Q n={3} kind="multi" question="Выберите 2 верных утверждения про сложность операций (в среднем)">
        <Opts items={[
          ['Проверка x in list — O(n)', true],
          ['Проверка x in set — O(1)', true],
          ['Доступ к dict[key] — O(n)', false],
          ['Сортировка списка — O(n)', false],
        ]} />
        <P>
          Здесь проверяют, понимаете ли вы, <B>почему</B> у структур такая сложность, а не заучили ли таблицу.
        </P>
        <Table
          headers={['Операция', 'Сложность', 'Почему именно такая']}
          rows={[
            [<C>x in list</C>, 'O(n)', 'Список — массив без порядка по значению. Чтобы честно сказать «нет», надо сравнить со всеми элементами'],
            [<C>x in set</C>, 'O(1) в среднем', 'Множество — хеш-таблица: считает хеш элемента и сразу идёт в нужную ячейку, без перебора'],
            [<C>dict[key]</C>, 'O(1) в среднем', 'Словарь — та же хеш-таблица, ключ превращается в индекс вычислением'],
            [<C>list.sort()</C>, 'O(n log n)', 'Timsort. Быстрее n log n сравнениями сортировать в общем случае нельзя'],
          ]}
        />
        <P><B>Почему два других варианта неверны:</B></P>
        <Ul items={[
          <><C>dict[key]</C> — это <B>O(1)</B>, а не O(n). Весь смысл словаря в том, что позиция значения вычисляется из ключа, а не ищется перебором.</>,
          <>Сортировка — <B>O(n log n)</B>, а не O(n). За линейное время сортировать сравнениями невозможно: это доказанная нижняя граница. Линейные сортировки существуют (подсчётом, поразрядная), но требуют особых условий на данные и в <C>list.sort()</C> не используются.</>,
        ]} />
        <Code code={`import time

data = list(range(1_000_000))
data_set = set(data)

start = time.time()
999_999 in data          # перебор почти всего списка
print("list:", round(time.time() - start, 5), "сек")

start = time.time()
999_999 in data_set      # один расчёт хеша
print("set: ", round(time.time() - start, 7), "сек")`} />
        <Note>
          Практический вывод, который и проверяет Avito: если в коде есть проверка вхождения внутри
          цикла — почти всегда нужно заранее превратить список в <C>set</C>. Это превращает
          O(n²) в O(n) и на реальных данных даёт ускорение в тысячи раз.
        </Note>
        <Warn>
          Оговорка «в среднем» в вопросе не случайна. У <C>set</C> и <C>dict</C> худший случай —
          <B> O(n)</B>: если все ключи попадут в одну корзину хеш-таблицы, поиск выродится в перебор
          цепочки. На практике этого не происходит, но на собеседовании стоит проговорить.
        </Warn>
      </Q>

      <Q n={4} question="Что верно про генераторы в Python?">
        <Opts items={[
          ['Генератор вычисляет элементы лениво (по запросу)', true],
          ['Генератор сразу вычисляет все элементы и хранит их в памяти', false],
          ['Генератор быстрее списка в любом случае', false],
          ['Генератор нельзя итерировать', false],
        ]} />
        <P>
          Генератор — это объект, который <B>умеет выдавать следующий элемент по требованию</B>, а не
          хранит готовую последовательность. Он помнит, на каком месте остановился, и продолжает
          с него, когда у него снова попросят значение.
        </P>
        <Code code={`import sys

# Список: все элементы уже посчитаны и лежат в памяти
squares_list = [x ** 2 for x in range(1_000_000)]
print(sys.getsizeof(squares_list))    # около 8 000 000 байт

# Генератор: не посчитано ничего, хранится только состояние
squares_gen = (x ** 2 for x in range(1_000_000))
print(sys.getsizeof(squares_gen))     # около 200 байт`} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <>«Сразу вычисляет всё и хранит в памяти» — это описание <B>списка</B>, а не генератора. Ровно противоположное поведение.</>,
          <>«Быстрее списка в любом случае» — неверно. Генератор экономит <B>память</B>, а не время. Если нужно пройти последовательность несколько раз, генератор проиграет: он одноразовый, и придётся создавать его заново. Плюс у каждого <C>next()</C> есть накладные расходы на возобновление функции.</>,
          <>«Нельзя итерировать» — прямо наоборот, итерирование это единственный способ его использовать. Нельзя другое: обратиться по индексу, узнать <C>len()</C> и пройти повторно.</>,
        ]} />
        <Code code={`gen = (x for x in range(3))

print(list(gen))      # [0, 1, 2]
print(list(gen))      # [] — генератор исчерпан, второй раз пусто

# И так нельзя:
# gen[0]     -> TypeError: not subscriptable
# len(gen)   -> TypeError: has no len()`} />
        <Note>
          Для ML это практически важно: когда датасет не помещается в память, данные читают
          генератором построчно. Так же устроены <C>DataLoader</C> в PyTorch и чтение файла
          по строкам — <C>for line in open(path)</C> не грузит файл целиком.
        </Note>
      </Q>

      <Q n={5} question="Что выведет код с двумя except: Exception и ZeroDivisionError?">
        <Code code={`try:
    1 / 0
except Exception:
    print("E")
except ZeroDivisionError:
    print("Z")`} />
        <Opts items={[
          ['Z', false],
          ['E', true],
          ['Ничего не выведет', false],
          ['Ошибку синтаксиса', false],
        ]} />
        <P>
          Блоки <C>except</C> проверяются <B>строго сверху вниз</B>, и срабатывает <B>первый подходящий</B>.
          Подходящий — значит тип исключения совпадает с указанным или является его наследником.
        </P>
        <P>
          Иерархия исключений в Python такая:
        </P>
        <Code code={`BaseException
 └── Exception
      └── ArithmeticError
           └── ZeroDivisionError`} />
        <P>
          <C>ZeroDivisionError</C> — потомок <C>Exception</C>. Поэтому первый же блок
          <C> except Exception</C> его ловит, печатает <C>E</C>, и до второго блока управление
          просто не доходит. Второй <C>except</C> здесь <B>мёртвый код</B>: он не выполнится никогда,
          ни при каком исключении.
        </P>
        <P><B>Почему остальные варианты неверны:</B></P>
        <Ul items={[
          <>«Z» — так было бы, если бы блоки стояли в обратном порядке: сначала конкретный <C>ZeroDivisionError</C>, потом общий <C>Exception</C>.</>,
          <>«Ничего не выведет» — исключение возникло и было поймано, обработчик отработал.</>,
          <>«Ошибка синтаксиса» — код синтаксически корректен. Python <B>не запрещает</B> недостижимые except и даже не предупреждает о них.</>,
        ]} />
        <Code code={`# Правильный порядок: от частного к общему
try:
    1 / 0
except ZeroDivisionError:
    print("Z")            # ← сработает это
except Exception:
    print("E")`} />
        <Warn>
          Отсюда универсальное правило: <B>исключения перехватывают от конкретных к общим</B>.
          Общий <C>except Exception</C> всегда идёт последним, иначе он перехватит всё и сделает
          специализированные обработчики бессмысленными.
        </Warn>
      </Q>

      {/* ═══════════ РАЗДЕЛ 2 — PANDAS ═══════════ */}
      <SectionTitle id="pandas" kicker="Раздел 2">Pandas и работа с данными</SectionTitle>

      <Q n={6} kind="multi" question="Средний чек по пользователю: выберите 2 корректных варианта">
        <P style={{ marginTop: 0 }}>
          Есть DataFrame с колонками <C>user_id</C>, <C>price</C>. Каждая строка — отдельная покупка,
          <C> price</C> — сумма покупки, пропусков нет. Нужно посчитать средний чек
          (= сумма покупок / количество покупок).
        </P>
        <Opts items={[
          ['df.groupby("user_id")["price"].mean()', true],
          ['df.groupby("user_id")["price"].sum()', false],
          ['df.groupby("user_id")["price"].sum() / df.groupby("user_id")["price"].count()', true],
          ['df.groupby("user_id")["price"].count()', false],
        ]} />
        <P>
          Средний чек по определению — это <B>сумма, делённая на количество</B>. Оба верных варианта
          считают ровно это, просто первый делает то же самое одной операцией.
        </P>
        <Code code={`import pandas as pd

df = pd.DataFrame({
    "user_id": [1, 1, 1, 2, 2],
    "price":   [100, 200, 300, 50, 150],
})

print(df.groupby("user_id")["price"].mean())
# user_id
# 1    200.0    ← (100+200+300)/3
# 2    100.0    ← (50+150)/2

manual = (df.groupby("user_id")["price"].sum()
          / df.groupby("user_id")["price"].count())
print(manual)     # ровно те же числа`} />
        <P><B>Почему два других варианта неверны:</B></P>
        <Ul items={[
          <><C>.sum()</C> — это <B>общая выручка</B> с пользователя, а не средний чек. У пользователя 1 это 600, а средний чек 200.</>,
          <><C>.count()</C> — это <B>количество покупок</B>, тоже не средний чек. У пользователя 1 это 3.</>,
        ]} />
        <Note>
          В условии отдельно сказано, что <B>пропусков нет</B>, — и это важная подсказка. Если бы NaN
          были, <C>count()</C> считал бы только непустые значения, а <C>mean()</C> тоже игнорировал бы
          NaN, и два варианта по-прежнему совпали бы. А вот <C>len()</C> или <C>size()</C> считают все
          строки, включая пропуски, — и результат разошёлся бы.
        </Note>
        <Table
          headers={['Метод', 'Что считает', 'Учитывает NaN']}
          rows={[
            [<C>count()</C>, 'количество непустых значений', 'нет'],
            [<C>size()</C>, 'количество строк в группе', 'да'],
            [<C>mean()</C>, 'среднее по непустым', 'нет'],
          ]}
        />
      </Q>

      <Q n={7} question="Что произойдёт при merge двух датафреймов по ключу, который не уникален в обоих?">
        <Opts items={[
          ['Pandas удалит дубликаты автоматически', false],
          ['Получится «раздувание» строк (many-to-many)', true],
          ['Merge упадёт с ошибкой всегда', false],
          ['Получится только пересечение уникальных ключей', false],
        ]} />
        <P>
          При соединении по ключу pandas берёт <B>каждую</B> подходящую строку слева и сводит её с
          <B> каждой</B> подходящей строкой справа. Это декартово произведение внутри группы одинаковых
          ключей. Если ключ встречается 3 раза слева и 4 раза справа — на выходе будет 12 строк.
        </P>
        <Code code={`import pandas as pd

left  = pd.DataFrame({"id": [1, 1, 1], "a": ["x", "y", "z"]})
right = pd.DataFrame({"id": [1, 1],    "b": ["p", "q"]})

print(len(left), len(right))            # 3 2
print(len(left.merge(right, on="id")))  # 6  ← 3 × 2`} />
        <P><B>Почему остальные варианты неверны:</B></P>
        <Ul items={[
          <>«Удалит дубликаты автоматически» — pandas никогда не выбрасывает данные молча. Это была бы катастрофа: библиотека решала бы за вас, какие строки не нужны.</>,
          <>«Упадёт с ошибкой всегда» — не упадёт. Many-to-many merge абсолютно легален и иногда именно то, что нужно.</>,
          <>«Только пересечение уникальных ключей» — путаница с <C>how="inner"</C>. Inner действительно оставляет только общие ключи, но <B>каждый</B> из них по-прежнему размножается по всем совпадениям.</>,
        ]} />
        <Note>
          Это одна из самых дорогих ошибок в реальной работе: после неаккуратного merge количество
          строк растёт, а вместе с ним — все агрегаты. Выручка «выросла» втрое, конверсия поехала,
          и найти причину бывает непросто.
        </Note>
        <P><B>Как от этого защититься.</B> У <C>merge</C> есть параметр <C>validate</C>, который
          проверяет ожидаемую кратность и падает с понятной ошибкой, если реальность другая:</P>
        <Code code={`# «Слева ключ уникален, справа может повторяться»
df = left.merge(right, on="id", validate="one_to_many")
# ValueError: Merge keys are not unique in left dataset

# Варианты: "one_to_one", "one_to_many", "many_to_one", "many_to_many"

# И простая привычка — проверять размер до и после
before = len(left)
merged = left.merge(right, on="id", how="left")
print(before, len(merged))      # если выросло — ключ не уникален справа`} />
        <Warn>
          Привычка ставить <C>validate=</C> в каждый merge отличает аккуратного аналитика от
          неаккуратного. Это стоит одного аргумента и ловит ошибку сразу, а не через неделю
          в отчёте.
        </Warn>
      </Q>

      <Q n={8} question="Как правильно заполнить пропуски средним значением, чтобы не было утечки данных?">
        <Opts items={[
          ['Посчитать среднее на всём датасете и заполнить train/val/test', false],
          ['Посчитать среднее на train и применить к val/test', true],
          ['Заполнить val/test их собственным средним', false],
          ['Удалить все строки с NaN', false],
        ]} />
        <P>
          <B>Утечка данных</B> — это ситуация, когда при обучении модель получает информацию, которой
          в момент реального предсказания у неё не будет. Валидация и тест изображают «будущее»,
          которого модель ещё не видела. Любая статистика, посчитанная с их участием, это будущее
          приоткрывает.
        </P>
        <P>
          Правильный порядок всегда один: <B>fit только на train, transform — на всех</B>.
        </P>
        <Code code={`from sklearn.impute import SimpleImputer
from sklearn.model_selection import train_test_split

X_train, X_test = train_test_split(X, test_size=0.2, random_state=42)

imputer = SimpleImputer(strategy="mean")
X_train = imputer.fit_transform(X_train)   # fit ТОЛЬКО на train
X_test  = imputer.transform(X_test)        # на тесте только transform`} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <><B>Среднее по всему датасету</B> — классическая утечка. В среднее попадают значения из теста, модель обучается на данных, подсмотревших ответ. Метрика на тесте окажется завышенной, а в проде модель просядет.</>,
          <><B>Своё среднее для val/test</B> — хуже, чем кажется. Во-первых, в проде объекты приходят по одному, и «среднее по тесту» посчитать неоткуда. Во-вторых, train и test оказываются преобразованы по-разному, и модель на тесте видит другое распределение. Это не утечка, а просто некорректная схема.</>,
          <><B>Удалить все строки с NaN</B> — не ответ на вопрос: спрашивали про заполнение средним. Плюс это опасно само по себе: можно потерять большую часть выборки, а если пропуски не случайны (например, чаще у новых пользователей), удаление сместит данные. И в проде строку с пропуском не удалишь — предсказание всё равно нужно.</>,
        ]} />
        <Note>
          Это правило распространяется на <B>всё</B>, что «обучается» на данных: StandardScaler,
          MinMaxScaler, OneHotEncoder, target encoding, отбор признаков, PCA. Везде — fit на train,
          transform на остальных.
        </Note>
        <Warn>
          Отдельно про <B>кросс-валидацию</B>: там правило то же, но применять его руками неудобно —
          в каждом фолде свой train. Именно для этого существует <C>Pipeline</C>, о нём вопрос 15.
        </Warn>
      </Q>

      {/* ═══════════ РАЗДЕЛ 3 — SQL ═══════════ */}
      <SectionTitle id="sql" kicker="Раздел 3">SQL</SectionTitle>

      <Q n={9} kind="multi" question="Выберите 2 верных утверждения про оконные функции ROW_NUMBER() и RANK()">
        <Opts items={[
          ['RANK() никогда не даёт одинаковые значения при равенстве', false],
          ['ROW_NUMBER() всегда выдаёт уникальный номер строке внутри партиции', true],
          ['RANK() при равенстве даёт одинаковый ранг и может «пропускать» следующий номер', true],
          ['ROW_NUMBER() сортирует таблицу физически на диске', false],
        ]} />
        <P>
          Обе функции нумеруют строки внутри партиции, но по-разному обходятся с одинаковыми значениями.
          Проще всего увидеть на таблице:
        </P>
        <Table
          headers={['Очки', 'ROW_NUMBER()', 'RANK()', 'DENSE_RANK()']}
          rows={[
            ['100', '1', '1', '1'],
            ['90', '2', '2', '2'],
            ['90', '3', '2', '2'],
            ['90', '4', '2', '2'],
            ['80', '5', '5 ← пропуск 3 и 4', '3'],
          ]}
        />
        <Ul items={[
          <><B>ROW_NUMBER()</B> — просто счётчик: 1, 2, 3, 4, 5. Одинаковым значениям даёт разные номера, порядок между ними не определён.</>,
          <><B>RANK()</B> — спортивный ранг: равным даёт одинаковое место, а следующее место сдвигает на количество занявших. Трое на втором месте — следующий пятый.</>,
          <><B>DENSE_RANK()</B> — то же, но без пропусков: 1, 2, 2, 2, 3.</>,
        ]} />
        <Code code={`SELECT
    name,
    score,
    ROW_NUMBER() OVER (ORDER BY score DESC) AS rn,
    RANK()       OVER (ORDER BY score DESC) AS rnk,
    DENSE_RANK() OVER (ORDER BY score DESC) AS dense
FROM players;`} />
        <P><B>Почему остальные варианты неверны:</B></P>
        <Ul items={[
          <>«RANK() никогда не даёт одинаковые значения» — прямо наоборот, это его определяющее свойство. Без этого он ничем не отличался бы от ROW_NUMBER().</>,
          <>«ROW_NUMBER() сортирует таблицу физически на диске» — оконная функция <B>ничего не меняет в хранилище</B>. <C>ORDER BY</C> внутри <C>OVER()</C> задаёт лишь порядок нумерации для конкретного запроса. Физическим расположением данных занимаются индексы и кластеризация, а не оконные функции.</>,
        ]} />
        <Note>
          Практический выбор: нужен ровно один представитель группы — берите <B>ROW_NUMBER()</B>,
          он гарантирует уникальность. Нужно честное место в рейтинге — <B>RANK()</B> или
          <B> DENSE_RANK()</B>.
        </Note>
      </Q>

      <Q n={10} question="Нужно оставить по одному самому свежему событию на user_id (по event_time). Какой подход правильнее?">
        <Opts items={[
          ['SELECT DISTINCT user_id, event_time ...', false],
          ['GROUP BY user_id без выбора event_time', false],
          ['ORDER BY event_time DESC LIMIT 1', false],
          ['ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY event_time DESC) и фильтр rn=1', true],
        ]} />
        <P>
          Это продолжение предыдущего вопроса — классическая задача «взять последнюю запись в каждой
          группе». Оконная функция решает её точно и позволяет вытащить <B>все колонки</B> нужной строки,
          а не только агрегаты.
        </P>
        <Code code={`SELECT user_id, event_time, event_type, payload
FROM (
    SELECT
        *,
        ROW_NUMBER() OVER (
            PARTITION BY user_id            -- нумеруем внутри каждого пользователя
            ORDER BY event_time DESC         -- самое свежее получает номер 1
        ) AS rn
    FROM events
) t
WHERE rn = 1;`} />
        <P>
          <C>PARTITION BY</C> — это «сгруппировать для нумерации», <C>ORDER BY</C> внутри окна задаёт,
          кто получит первый номер. Фильтр <C>rn = 1</C> оставляет по одной строке на пользователя.
        </P>
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <><C>SELECT DISTINCT user_id, event_time</C> — уберёт лишь <B>полные дубликаты пары</B>. У пользователя с десятью разными временами останутся все десять строк.</>,
          <><C>GROUP BY user_id</C> без выбора event_time — вернёт по строке на пользователя, но <B>без информации о событии</B>. Задача же в том, чтобы получить само событие. Попытка дописать <C>MAX(event_time)</C> даёт время, но остальные колонки взять неоткуда — они не в группировке.</>,
          <><C>ORDER BY event_time DESC LIMIT 1</C> — вернёт <B>одну строку на всю таблицу</B>, самое свежее событие вообще, а не по одному на каждого пользователя.</>,
        ]} />
        <Note>
          В PostgreSQL есть более короткая альтернатива — <C>DISTINCT ON</C>:
          <C> SELECT DISTINCT ON (user_id) * FROM events ORDER BY user_id, event_time DESC</C>.
          Работает только в Postgres, тогда как вариант с ROW_NUMBER() переносится куда угодно.
        </Note>
      </Q>

      <Q n={11} question="Что верно про логический порядок выполнения частей SQL-запроса?">
        <Opts items={[
          ['FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY', true],
          ['SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY', false],
          ['FROM → SELECT → WHERE → GROUP BY → ORDER BY → HAVING', false],
          ['WHERE → FROM → SELECT → GROUP BY → HAVING → ORDER BY', false],
        ]} />
        <P>
          Запрос <B>пишется</B> начиная с SELECT, но <B>выполняется</B> в другом порядке. И знание
          этого порядка объясняет сразу несколько «странностей» SQL, на которых спотыкаются все.
        </P>
        <Table
          headers={['#', 'Шаг', 'Что делает']}
          rows={[
            ['1', 'FROM / JOIN', 'Берём таблицы и соединяем их — появляется исходный набор строк'],
            ['2', 'WHERE', 'Фильтруем отдельные строки до всякой группировки'],
            ['3', 'GROUP BY', 'Схлопываем строки в группы'],
            ['4', 'HAVING', 'Фильтруем уже группы, по агрегатам'],
            ['5', 'SELECT', 'Вычисляем выражения и назначаем псевдонимы'],
            ['6', 'ORDER BY', 'Сортируем готовый результат'],
            ['7', 'LIMIT', 'Отрезаем нужное количество строк'],
          ]}
        />
        <P><B>Что из этого следует практически:</B></P>
        <Ul items={[
          <><B>Почему в WHERE нельзя использовать алиас из SELECT.</B> WHERE выполняется на шаге 2, а алиас появляется только на шаге 5 — его ещё не существует.</>,
          <><B>Почему в WHERE нельзя писать агрегаты.</B> <C>WHERE COUNT(*) &gt; 5</C> не работает: на шаге 2 групп ещё нет, считать нечего. Для этого есть HAVING.</>,
          <><B>Почему в ORDER BY алиас использовать можно.</B> Сортировка идёт на шаге 6, после SELECT, — имя уже определено.</>,
        ]} />
        <Code code={`-- Не работает: алиас ещё не существует
SELECT price * 2 AS double_price
FROM products
WHERE double_price > 100;        -- ошибка

-- Работает: ORDER BY идёт после SELECT
SELECT price * 2 AS double_price
FROM products
ORDER BY double_price DESC;      -- всё в порядке

-- Фильтр по группам — только через HAVING
SELECT user_id, COUNT(*) AS cnt
FROM orders
GROUP BY user_id
HAVING COUNT(*) > 5;`} />
        <Note>
          Разница между WHERE и HAVING — самый частый вопрос по SQL на собеседовании, и ответ на него
          целиком выводится из этой таблицы: <B>WHERE фильтрует строки до группировки, HAVING — группы
          после</B>. Поэтому WHERE обычно дешевле: он отсекает данные раньше, до тяжёлой группировки.
        </Note>
      </Q>

      <Q n={12} question="Как посчитать количество уникальных пользователей, сделавших хотя бы один заказ?">
        <P style={{ marginTop: 0 }}>Таблица <C>orders(user_id, order_id)</C>.</P>
        <Opts items={[
          ['SELECT COUNT(DISTINCT user_id) FROM orders', true],
          ['SELECT COUNT(user_id) FROM orders', false],
          ['SELECT DISTINCT COUNT(user_id) FROM orders', false],
          ['SELECT user_id, COUNT(*) FROM orders', false],
        ]} />
        <P>
          В таблице заказов один пользователь встречается столько раз, сколько сделал заказов.
          <C> DISTINCT</C> внутри <C>COUNT</C> оставляет только уникальные значения, и получается
          количество людей, а не количество заказов. Условие «хотя бы один заказ» выполняется
          автоматически: кого нет в таблице заказов, тот и не попадёт в подсчёт.
        </P>
        <Code code={`-- orders:
-- user_id | order_id
--    1    |   101
--    1    |   102
--    2    |   103

SELECT COUNT(DISTINCT user_id) FROM orders;   -- 2  ← пользователей
SELECT COUNT(user_id) FROM orders;            -- 3  ← заказов`} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <><C>COUNT(user_id)</C> — считает все непустые значения колонки, то есть <B>количество заказов</B>. Пользователь с тремя заказами будет посчитан трижды.</>,
          <><C>SELECT DISTINCT COUNT(user_id)</C> — синтаксически валидно, но бессмысленно. <C>COUNT</C> уже вернул одно число, и <C>DISTINCT</C> применяется к результату из одной строки — он ничего не меняет. Типичная ловушка: <C>DISTINCT</C> стоит не в том месте.</>,
          <><C>SELECT user_id, COUNT(*) FROM orders</C> — во-первых, без <C>GROUP BY</C> это в большинстве СУБД просто ошибка. Во-вторых, даже с группировкой вернёт <B>строку на каждого пользователя</B>, а не одно число. Чтобы получить ответ, пришлось бы обернуть это ещё одним COUNT.</>,
        ]} />
        <Note>
          Полезно помнить разницу трёх форм: <C>COUNT(*)</C> — все строки, включая полностью пустые;
          <C> COUNT(col)</C> — строки, где колонка не NULL; <C>COUNT(DISTINCT col)</C> — уникальные
          непустые значения.
        </Note>
      </Q>

      {/* ═══════════ РАЗДЕЛ 4 — ML-ТЕОРИЯ ═══════════ */}
      <SectionTitle id="ml" kicker="Раздел 4">ML-теория</SectionTitle>

      <Q n={13} kind="multi" question="Какие 2 алгоритма наиболее чувствительны к масштабу признаков?">
        <Opts items={[
          ['Decision Tree', false],
          ['KNN', true],
          ['SVM (RBF/Linear)', true],
          ['CatBoost', false],
        ]} />
        <P>
          Правило простое и работает почти всегда: <B>если алгоритм считает расстояния или складывает
          взвешенные признаки — масштаб важен. Если он сравнивает признаки по порогам — нет.</B>
        </P>
        <P>
          <B>KNN</B> буквально измеряет евклидово расстояние между объектами. Возьмём два признака:
          возраст (20–70) и доход (20 000–500 000). Разница в доходе на 100 000 даст вклад в расстояние
          в миллиарды, разница в возрасте на 30 лет — 900. Возраст просто перестаёт существовать.
        </P>
        <Code code={`# Без масштабирования расстояние определяется только доходом
a = (25, 50_000)
b = (60, 51_000)

dist = ((25-60)**2 + (50_000-51_000)**2) ** 0.5
#      возраст: 1225      доход: 1 000 000
# 99.9% расстояния — это доход`} />
        <P>
          <B>SVM</B> ищет разделяющую гиперплоскость, максимизируя отступ, и регуляризует норму весов
          <C> ||w||</C>. Признак с большим разбросом требует маленького веса, с малым — большого,
          и регуляризация начинает штрафовать их несправедливо. В RBF-ядре ещё хуже: там внутри
          экспоненты то же самое евклидово расстояние.
        </P>
        <P><B>Почему деревья не чувствительны:</B></P>
        <Ul items={[
          <><B>Decision Tree</B> на каждом узле задаёт вопрос вида «признак &gt; порога?». Если умножить весь признак на 1000, дерево просто выберет порог в 1000 раз больше — <B>разбиение будет тем же самым</B>. Важен только порядок значений, а не их величина.</>,
          <><B>CatBoost</B> — градиентный бустинг над теми же деревьями, поэтому наследует это свойство. Масштабирование признаков для него бесполезно.</>,
        ]} />
        <Table
          headers={['Нужно масштабирование', 'Не нужно']}
          rows={[
            ['KNN, k-means', 'Decision Tree'],
            ['SVM (любое ядро)', 'Random Forest'],
            ['Линейная и логистическая регрессия с регуляризацией', 'CatBoost, XGBoost, LightGBM'],
            ['Нейросети', 'Наивный Байес'],
            ['PCA', ''],
          ]}
        />
        <Note>
          Отдельная тонкость про линейные модели: <B>без</B> регуляризации линейная регрессия к
          масштабу нечувствительна — коэффициенты просто подстроятся. Но как только появляется L1 или
          L2, штраф накладывается на величину весов, и масштаб начинает влиять напрямую. Это как раз
          связывает вопрос со следующим.
        </Note>
      </Q>

      <Q n={14} question="Какое утверждение про L1-регуляризацию наиболее верное?">
        <Opts items={[
          ['L1 обычно даёт более «гладкие» (малые, но ненулевые) веса, чем L2', false],
          ['L1 может занулять веса и давать эффект отбора признаков', true],
          ['L1 делает модель инвариантной к масштабу признаков (стандартизация не нужна)', false],
          ['При L1 коэффициенты всегда меньше по модулю, чем при L2 при том же alpha', false],
        ]} />
        <P>
          Регуляризация добавляет к функции потерь штраф за величину весов. Разница между L1 и L2 —
          в форме штрафа, и она даёт качественно разное поведение.
        </P>
        <Table
          headers={['', 'L1 (Lasso)', 'L2 (Ridge)']}
          rows={[
            ['Штраф', 'сумма модулей весов', 'сумма квадратов весов'],
            ['Результат', 'часть весов ровно 0', 'все веса малы, но не нули'],
            ['Эффект', 'отбор признаков', 'сглаживание, борьба с мультиколлинеарностью'],
            ['Решение', 'разреженное', 'плотное'],
          ]}
        />
        <P>
          <B>Почему L1 зануляет, а L2 нет.</B> Производная модуля постоянна и не уменьшается при
          приближении веса к нулю — штраф давит на вес с одинаковой силой, пока не дожмёт до нуля.
          У квадрата производная пропорциональна самому весу: чем он меньше, тем слабее давление,
          поэтому вес асимптотически приближается к нулю, но не достигает его.
        </P>
        <Code code={`from sklearn.linear_model import Lasso, Ridge
import numpy as np

lasso = Lasso(alpha=0.1).fit(X, y)
ridge = Ridge(alpha=0.1).fit(X, y)

print("Нулевых весов у Lasso:", np.sum(lasso.coef_ == 0))   # обычно много
print("Нулевых весов у Ridge:", np.sum(ridge.coef_ == 0))   # почти всегда 0`} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <>«L1 даёт более гладкие, малые но ненулевые веса» — это описание <B>L2</B>. Варианты перепутаны местами: именно L2 сжимает все веса, не обнуляя.</>,
          <>«L1 делает модель инвариантной к масштабу» — наоборот, при любой регуляризации <B>стандартизация обязательна</B>. Штраф накладывается на величину весов, а она зависит от масштаба признака: признак в других единицах получит другой вес и другой штраф. Без стандартизации L1 занулит не бесполезные признаки, а те, что измерены в крупных единицах.</>,
          <>«При L1 коэффициенты всегда меньше по модулю» — слово <B>всегда</B> делает утверждение ложным. L1 зануляет часть весов, но оставшимся <B>значимым</B> признакам может дать бóльшие коэффициенты, чем L2, который равномерно прижимает все. Сравнивать величины при одном alpha некорректно: у L1 и L2 разные шкалы штрафа.</>,
        ]} />
        <Note>
          Практический выбор: признаков много и есть подозрение, что большинство мусорные — <B>L1</B>,
          он сам отберёт нужные. Признаки коррелируют между собой и все скорее полезны — <B>L2</B>.
          Хочется и того и другого — <B>ElasticNet</B>, комбинация обоих штрафов.
        </Note>
      </Q>

      <Q n={15} kind="multi" question="Выберите 2 практики, которые помогают избежать утечки при препроцессинге">
        <Opts items={[
          ['Сделать StandardScaler.fit_transform() на всём датасете до сплита', false],
          ['Использовать Pipeline, где scaler обучается только на train в каждой CV-итерации', true],
          ['Кодировать категории средним таргета, посчитанным на всём датасете', false],
          ['Делать CV/валидацию через cross_val_score по Pipeline', true],
        ]} />
        <P>
          Продолжение вопроса 8, но про кросс-валидацию. Там правило «fit на train» применялось один
          раз, здесь фолдов много, и делать это руками неудобно и легко ошибиться. Именно для этого
          существует <C>Pipeline</C>.
        </P>
        <P>
          <B>Как Pipeline решает проблему.</B> Он оборачивает препроцессинг и модель в один объект.
          Когда <C>cross_val_score</C> разбивает данные на фолды, он вызывает <C>fit</C> у всего
          пайплайна — и scaler обучается заново <B>внутри каждого фолда, только на его train-части</B>.
          Валидационная часть фолда видит лишь <C>transform</C>.
        </P>
        <Code code={`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score

pipe = Pipeline([
    ("scaler", StandardScaler()),
    ("model",  LogisticRegression()),
])

# В каждом фолде scaler обучается заново, только на train этого фолда
scores = cross_val_score(pipe, X, y, cv=5, scoring="roc_auc")
print(scores.mean())`} />
        <P><B>Почему два других варианта — это утечка:</B></P>
        <Ul items={[
          <><C>StandardScaler.fit_transform()</C> <B>на всём датасете до сплита</B> — среднее и стандартное отклонение считаются с участием валидации и теста. Модель обучается на данных, нормированных по статистике, которую в проде знать неоткуда. Метрика получится оптимистичнее реальности.</>,
          <><B>Target encoding по всему датасету</B> — самая опасная форма утечки. В кодировку категории попадает значение таргета тех самых объектов, на которых мы потом измеряем качество. Модель фактически видит ответ, зашитый в признак. На валидации будет прекрасный результат, в проде — провал. Target encoding обязательно считают только по train, а лучше с внутренней кросс-валидацией (out-of-fold).</>,
        ]} />
        <Warn>
          Коварство утечки в том, что она <B>не ломает код</B> — всё отработает без ошибок и покажет
          хорошие цифры. Проблема обнаружится только в проде, когда модель окажется заметно хуже, чем
          обещала валидация. Поэтому Avito и спрашивает про это трижды за один тест.
        </Warn>
      </Q>

      <Q n={16} question="Обучили бинарный классификатор и получили ROC-AUC = 0.2. Что наиболее вероятно?">
        <Opts items={[
          ['Модель отличная, просто классы несбалансированы', false],
          ['Модель точно переобучилась (< 0.5 признак переобучения)', false],
          ['Метрика ROC-AUC не применима к бинарной классификации', false],
          ['Скорее всего перепутан знак скоринга/метки классов (модель хуже случайной)', true],
        ]} />
        <P>
          Чтобы ответить, нужно понимать шкалу ROC-AUC:
        </P>
        <Table
          headers={['Значение', 'Что означает']}
          rows={[
            ['1.0', 'Идеальное разделение классов'],
            ['0.7–0.9', 'Рабочая модель'],
            ['0.5', 'Случайное угадывание — модель бесполезна'],
            ['< 0.5', 'Модель систематически ошибается — она хуже монетки'],
            ['0.0', 'Идеально неправильное разделение'],
          ]}
        />
        <P>
          <B>Ключевая идея:</B> ROC-AUC равен вероятности того, что случайный положительный объект
          получит более высокий скор, чем случайный отрицательный. Значение 0.2 означает, что модель
          ставит положительным объектам <B>более низкий</B> скор в 80% случаев. Это не «плохая модель» —
          это модель, которая уверенно разделяет классы, но с перевёрнутым знаком.
        </P>
        <P>
          Модель, которая ничего не выучила, дала бы примерно 0.5. Получить устойчивые 0.2 случайно
          почти невозможно — значит, сигнал в данных есть, просто он применён наоборот. Практически
          всегда причина одна из двух:
        </P>
        <Ul items={[
          <>Перепутаны метки классов — где-то 0 и 1 поменялись местами.</>,
          <>В метрику передан не тот столбец вероятностей: <C>predict_proba(X)[:, 0]</C> вместо <C>[:, 1]</C>.</>,
        ]} />
        <Code code={`from sklearn.metrics import roc_auc_score

# Типичная ошибка: взяли вероятность НУЛЕВОГО класса
proba = model.predict_proba(X_test)
print(roc_auc_score(y_test, proba[:, 0]))   # 0.2
print(roc_auc_score(y_test, proba[:, 1]))   # 0.8  ← вот правильный столбец

# Свойство метрики: перевернув скор, получаем 1 - AUC
print(roc_auc_score(y_test, -proba[:, 1]))  # 0.2`} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <>«Модель отличная, просто дисбаланс» — <B>ROC-AUC устойчив к дисбалансу классов</B>, это его главное достоинство по сравнению с accuracy. Дисбаланс не опускает AUC ниже 0.5.</>,
          <>«Точно переобучилась» — переобучение даёт отличный результат на train и <B>около 0.5</B> на тесте, а не 0.2. Значение ниже 0.5 переобучением не объясняется.</>,
          <>«ROC-AUC не применима к бинарной классификации» — она для неё и создана, это её основной сценарий.</>,
        ]} />
        <Note>
          Быстрая проверка на практике: если AUC заметно ниже 0.5, инвертируйте скор и посмотрите,
          получится ли <C>1 − AUC</C>. Получилось — ищите перепутанный знак, а не переобучение.
        </Note>
      </Q>

      {/* ═══════════ РАЗДЕЛ 5 — МЕТРИКИ И ВАЛИДАЦИЯ ═══════════ */}
      <SectionTitle id="metrics" kicker="Раздел 5">Метрики, валидация, воспроизводимость</SectionTitle>

      <Q n={17} question="Precision = 80%, модель выдала 150 положительных прогнозов, всего положительных объектов 240. Найдите recall">
        <Opts items={[
          ['75%', false],
          ['62.5%', false],
          ['50%', true],
          ['24%', false],
        ]} />
        <P>Задача в два действия, главное — не перепутать знаменатели.</P>
        <Table
          headers={['Метрика', 'Формула', 'Словами']}
          rows={[
            ['Precision', 'TP / (TP + FP)', 'Из тех, кого назвали положительными, сколько угадали'],
            ['Recall', 'TP / (TP + FN)', 'Из всех реально положительных сколько нашли'],
          ]}
        />
        <P><B>Шаг 1. Находим TP.</B> «Модель выдала 150 положительных прогнозов» — это и есть
          <C> TP + FP = 150</C>. Precision = TP / 150 = 0.8, отсюда:</P>
        <Code lang="text" code={`TP = 0.8 × 150 = 120
FP = 150 − 120 = 30`} />
        <P><B>Шаг 2. Находим recall.</B> «Всего положительных объектов в выборке 240» — это
          <C> TP + FN = 240</C>, все реально положительные:</P>
        <Code lang="text" code={`recall = TP / (TP + FN) = 120 / 240 = 0.5 = 50%`} />
        <P><B>Откуда взялись остальные варианты — типичные ошибки:</B></P>
        <Ul items={[
          <><B>62.5%</B> = 150 / 240. Взяли все прогнозы вместо угаданных — забыли применить precision.</>,
          <><B>75%</B> = 180 / 240. Ошибка в первом шаге.</>,
          <><B>24%</B> — путаница в знаменателе, попытка делить на общее число объектов.</>,
        ]} />
        <Note>
          Чтобы не путаться: <B>знаменатель precision — это то, что сказала модель; знаменатель
          recall — это то, что есть в реальности</B>. Precision отвечает за ложные тревоги, recall —
          за пропуски.
        </Note>
      </Q>

      <Q n={18} kind="multi" question="Данные — временной ряд. Выберите 2 корректных подхода к валидации">
        <Opts items={[
          ['Случайный KFold (shuffle=True)', false],
          ['StratifiedKFold по таргету', false],
          ['TimeSeriesSplit expanding window', true],
          ['Train на прошлом, test на будущем (по дате)', true],
        ]} />
        <P>
          У временных рядов есть свойство, ломающее обычную кросс-валидацию: <B>порядок во времени
          имеет значение</B>. В проде модель всегда предсказывает будущее, зная только прошлое. Схема
          валидации обязана это повторять.
        </P>
        <P>
          <B>Почему случайное перемешивание — это утечка.</B> После shuffle в обучающую выборку
          попадают данные из будущего относительно тестовых. Модель фактически подглядывает вперёд:
          учится на понедельнике и среде, предсказывает вторник. В реальности среды ещё не существует.
          Метрика получится завышенной, и модель провалится в проде.
        </P>
        <Code code={`from sklearn.model_selection import TimeSeriesSplit

tscv = TimeSeriesSplit(n_splits=5)

for train_idx, test_idx in tscv.split(X):
    print(f"train: 0..{train_idx[-1]}   test: {test_idx[0]}..{test_idx[-1]}")

# train: 0..99      test: 100..199
# train: 0..199     test: 200..299    ← окно расширяется
# train: 0..299     test: 300..399
# Тест всегда строго ПОСЛЕ обучающей части`} />
        <P><B>Два верных подхода по сути одно и то же правило:</B></P>
        <Ul items={[
          <><B>TimeSeriesSplit expanding window</B> — обучающая часть растёт, тестовая всегда идёт следом. Даёт несколько оценок и показывает стабильность модели во времени.</>,
          <><B>Train на прошлом, test на будущем</B> — простое разделение по дате. Проще, но даёт одну оценку.</>,
        ]} />
        <P><B>Почему StratifiedKFold тоже не подходит:</B> он следит за балансом классов в фолдах,
          но точно так же <B>перемешивает данные во времени</B>. Сохранение пропорции таргета не
          отменяет утечки из будущего.</P>
        <Warn>
          Ещё одна тонкость, о которой часто забывают, — <B>gap между train и test</B>. Если признаки
          построены на скользящих окнах (например, среднее за 7 дней), последние наблюдения train
          физически пересекаются с началом test. Тогда между ними оставляют зазор, иначе утечка
          возвращается уже через признаки.
        </Warn>
      </Q>

      <Q n={19} kind="multi" question="Что важно зафиксировать, чтобы эксперимент можно было воспроизвести?">
        <Opts items={[
          ['commit hash и конфиг гиперпараметров', true],
          ['название модели и датасета', false],
          ['версию данных, схему сплита и random seed', true],
          ['ROC-AUC и матрицу ошибок', false],
        ]} />
        <P>
          Воспроизводимость означает: другой человек (или вы через полгода) запускает эксперимент
          и получает <B>те же самые числа</B>. Для этого нужно зафиксировать всё, что влияет на
          результат, — то есть <B>условия</B>, а не итоги.
        </P>
        <Table
          headers={['Что фиксируем', 'Зачем']}
          rows={[
            ['commit hash', 'Код меняется; без хеша непонятно, какая версия давала эти цифры'],
            ['Гиперпараметры', 'Другой learning_rate — другая модель'],
            ['Версия данных', 'Данные дозаливаются и чистятся; вчерашний датасет ≠ сегодняшний'],
            ['Схема сплита', 'Другое разбиение — другие числа даже на тех же данных'],
            ['random seed', 'Инициализация весов, перемешивание, сабсэмплинг — всё случайно'],
            ['Версии библиотек', 'Смена версии sklearn может изменить дефолты и результат'],
          ]}
        />
        <P><B>Почему два других варианта не подходят:</B></P>
        <Ul items={[
          <><B>«Название модели и датасета»</B> — слишком мало. «CatBoost на датасете объявлений» не позволяет повторить ничего: неизвестны ни гиперпараметры, ни версия данных, ни сплит. Это не фиксация, а подпись к результату.</>,
          <><B>«ROC-AUC и матрица ошибок»</B> — это <B>результат</B> эксперимента, а не его условия. Записать метрику полезно, но она не поможет получить её заново. Вопрос ровно про то, отличает ли кандидат условия от итогов.</>,
        ]} />
        <Code code={`import random, numpy as np

SEED = 42
random.seed(SEED)
np.random.seed(SEED)

# И везде, где библиотека это принимает
train_test_split(X, y, test_size=0.2, random_state=SEED)
CatBoostClassifier(random_seed=SEED)`} />
        <Note>
          В боевых проектах это автоматизируют: <B>MLflow</B>, <B>Weights &amp; Biases</B> или
          <B> DVC</B> сами сохраняют гиперпараметры, метрики, версию кода и артефакты модели.
          Ручное ведение таблички в блокноте разваливается уже на двадцатом эксперименте.
        </Note>
      </Q>

      {/* ═══════════ РАЗДЕЛ 6 — ИНСТРУМЕНТЫ ═══════════ */}
      <SectionTitle id="tools" kicker="Раздел 6">Инструменты</SectionTitle>

      <Q n={20} question="Что наиболее верно про CatBoost и категориальные признаки?">
        <Opts items={[
          ['CatBoost не умеет работать с категориальными, нужно всегда one-hot', false],
          ['CatBoost умеет обрабатывать категории, но всё равно важен корректный сплит, чтобы избежать утечек', true],
          ['CatBoost требует предварительно считать target-mean по всему датасету', false],
          ['CatBoost работает только для текстовых признаков', false],
        ]} />
        <P>
          Работа с категориями «из коробки» — главное отличие CatBoost от XGBoost и LightGBM, отсюда
          и название (Cat — от categorical). Достаточно передать список категориальных колонок:
        </P>
        <Code code={`from catboost import CatBoostClassifier

model = CatBoostClassifier(
    cat_features=["city", "category", "user_type"],   # и всё
    random_seed=42,
)
model.fit(X_train, y_train)`} />
        <P>
          Внутри применяется <B>ordered target statistics</B> — умная версия target encoding.
          Обычный target encoding берёт среднее таргета по категории, и это приводит к утечке:
          в кодировку объекта попадает его собственный таргет. CatBoost решает это, считая статистику
          для каждого объекта <B>только по объектам, идущим раньше него</B> в случайной перестановке.
          Объект никогда не участвует в собственной кодировке.
        </P>
        <P>
          <B>Но почему «всё равно важен корректный сплит».</B> CatBoost защищает от утечки <B>внутри
          обучения</B>. Он ничего не знает о том, как вы разбили данные, и не спасёт от:
        </P>
        <Ul items={[
          <>Случайного сплита временного ряда — вопрос 18.</>,
          <>Ручного target encoding, посчитанного вами до передачи в модель.</>,
          <>Признаков, содержащих информацию из будущего, — например, «итоговый статус заказа» в задаче предсказания этого статуса.</>,
          <>Дубликатов одного объекта, попавших и в train, и в test.</>,
        ]} />
        <P><B>Разбор неверных вариантов:</B></P>
        <Ul items={[
          <>«Не умеет, нужен one-hot» — неверно, это его ключевая возможность. Более того, one-hot на категории высокой кардинальности (города, айдишники) создаёт тысячи разреженных колонок и работает хуже.</>,
          <>«Требует считать target-mean по всему датасету» — ровно то, чего CatBoost <B>избегает</B> своим ordered-подходом. Такой ручной подсчёт был бы прямой утечкой.</>,
          <>«Только для текстовых признаков» — путаница между <C>cat_features</C> и <C>text_features</C>. Категория может быть и числом: айди города вполне себе категориальный признак, хотя записан цифрами.</>,
        ]} />
        <Note>
          Практическая деталь: категориальные колонки в CatBoost не должны содержать NaN — их заранее
          заполняют строкой вроде <C>"unknown"</C>. И тип колонки лучше приводить к строке, иначе
          числовые категории можно случайно передать как числовые признаки.
        </Note>
      </Q>

      <Q n={21} question="Как корректно получить изменения с удалённого репозитория и влить их в текущую ветку одной командой?">
        <Opts items={[
          ['git push', false],
          ['git fetch', false],
          ['git pull', true],
          ['git clone', false],
        ]} />
        <P>
          Ключевые слова в вопросе — <B>«и влить»</B> и <B>«одной командой»</B>. Именно они отсекают
          <C> git fetch</C>, который ближе всего по смыслу.
        </P>
        <Code lang="bash" code={`git pull  =  git fetch  +  git merge origin/<ветка>`} />
        <Table
          headers={['Команда', 'Что делает']}
          rows={[
            [<C>git fetch</C>, 'Скачивает изменения с сервера, но рабочую ветку НЕ трогает'],
            [<C>git pull</C>, 'Скачивает и сразу вливает в текущую ветку'],
            [<C>git push</C>, 'Отправляет ваши коммиты на сервер — противоположное направление'],
            [<C>git clone</C>, 'Копирует репозиторий целиком с нуля, разово'],
          ]}
        />
        <P><B>Почему остальные варианты неверны:</B></P>
        <Ul items={[
          <><C>git fetch</C> — половина ответа. Он действительно получает изменения, но оставляет их в <C>origin/main</C>, не трогая вашу ветку. Чтобы влить, нужна вторая команда — <C>git merge</C> или <C>git rebase</C>. Условие «одной командой» не выполнено.</>,
          <><C>git push</C> — отправляет изменения <B>на</B> сервер, а не забирает с него.</>,
          <><C>git clone</C> — для первого получения репозитория. Для обновления существующего не применяется.</>,
        ]} />
        <Note>
          Полезное уточнение для собеседования: <C>git fetch</C> считается <B>безопасной</B> командой —
          она ничего не меняет в рабочем дереве, можно спокойно посмотреть, что пришло, через
          <C> git log HEAD..origin/main</C>, и только потом решить, мержить или ребейзить.
          <C> git pull --rebase</C> вливает изменения, перенося ваши коммиты поверх чужих, — история
          получается линейной, без merge-коммитов.
        </Note>
      </Q>

      {/* ═══════════ РАЗДЕЛ 7 — КОДИНГ ═══════════ */}
      <SectionTitle id="coding" kicker="Раздел 7">Задачи на код</SectionTitle>

      <div style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 10, padding: '16px 20px', margin: '0 0 20px' }}>
        <P style={{ margin: 0, fontSize: 13.5 }}>
          Последние два задания — с редактором кода и автопроверкой на скрытых тестах.
          Времени заметно больше: около 15 минут на каждое. Решение читает данные из
          <B> stdin</B> и печатает в <B>stdout</B>, готовый шаблон с функциями ввода-вывода уже
          лежит в редакторе. Обе задачи элементарны алгоритмически — вся сложность в аккуратном
          форматировании вывода и разборе крайних случаев.
        </P>
      </div>

      <Q n={22} kind="code" question="Precision и Recall: базовые метрики классификации">
        <P style={{ marginTop: 0 }}><B>Условие.</B> Даны три неотрицательных целых числа TP, FP, FN.
          Гарантируется, что TP + FP &gt; 0 и TP + FN &gt; 0. Где:</P>
        <Ul items={[
          <><B>TP</B> — число объектов, предсказанных как positive и действительно positive;</>,
          <><B>FP</B> — число объектов, предсказанных как positive, но на самом деле negative;</>,
          <><B>FN</B> — число объектов, предсказанных как negative, но на самом деле positive.</>,
        ]} />
        <P>Требуется найти precision и recall.</P>
        <Table
          headers={['', 'Формат']}
          rows={[
            ['Ввод', 'Одна строка: TP FP FN (целые числа через пробел)'],
            ['Вывод', 'Два числа через пробел: precision recall, каждое с точностью 4 знака после запятой'],
            ['Пример ввода', '120 30 120'],
            ['Пример вывода', '0.8000 0.5000'],
          ]}
        />
        <P><B>Разбор.</B> Гарантии в условии сняты не случайно: они означают, что знаменатели
          никогда не равны нулю, и проверять деление на ноль не нужно. Вся задача — две формулы
          и правильное форматирование.</P>
        <Code code={`import sys


def main():
    tp, fp, fn = map(int, sys.stdin.readline().split())

    precision = tp / (tp + fp)
    recall = tp / (tp + fn)

    print(f"{precision:.4f} {recall:.4f}")


if __name__ == "__main__":
    main()`} />
        <P><B>Проверим на примере:</B></P>
        <Code lang="text" code={`TP = 120, FP = 30, FN = 120

precision = 120 / (120 + 30)  = 120 / 150 = 0.8
recall    = 120 / (120 + 120) = 120 / 240 = 0.5

вывод: 0.8000 0.5000`} />
        <P><B>На чём здесь заваливаются:</B></P>
        <Ul items={[
          <><B>Перепутанные знаменатели.</B> Самая частая ошибка. Запомните: у precision в знаменателе <B>всё, что модель назвала положительным</B> (TP + FP), у recall — <B>всё, что положительно на самом деле</B> (TP + FN).</>,
          <><B>Формат вывода.</B> Требуется ровно 4 знака после запятой. <C>print(0.8)</C> выведет <C>0.8</C> и тест не пройдёт — нужно <C>f"&#123;x:.4f&#125;"</C> или <C>round()</C> с последующим форматированием. Причём именно форматирование, а не округление: <C>round(0.8, 4)</C> всё равно напечатает <C>0.8</C>.</>,
          <><B>Разделитель.</B> Два числа <B>через пробел в одной строке</B>, а не на разных строках.</>,
        ]} />
        <Note>
          Обратите внимание: целочисленное деление здесь не нужно и вредно. В Python 3 оператор
          <C> /</C> всегда даёт float, так что <C>120 / 150</C> честно вернёт <C>0.8</C>, а не
          <C> 0</C>. Это отличие от Python 2 и от языков вроде C.
        </Note>
      </Q>

      <Q n={23} kind="code" question="Min-Max нормализация признака">
        <P style={{ marginTop: 0 }}><B>Условие.</B> Дана последовательность вещественных чисел —
          значения одного числового признака. Примените к ним min-max нормализацию так, чтобы
          минимальное значение стало 0, максимальное — 1, а остальные значения масштабировались
          линейно между ними. Если все числа одинаковые, выведите для каждого 0.5.</P>
        <Table
          headers={['', 'Формат']}
          rows={[
            ['Ввод', 'Одна строка: x1 x2 ... xn (n ≥ 2), вещественные числа через пробел'],
            ['Вывод', 'n чисел через пробел — нормализованные значения с точностью 4 знака после запятой'],
            ['Пример ввода', '10 20 30 40'],
            ['Пример вывода', '0.0000 0.3333 0.6667 1.0000'],
          ]}
        />
        <P><B>Формула.</B> Min-max нормализация — это линейное сжатие отрезка
          [min, max] в отрезок [0, 1]:</P>
        <Code lang="text" code={`x_норм = (x − min) / (max − min)`} />
        <P>Проверим, что она делает то, что обещано: если <C>x = min</C>, числитель ноль и результат 0;
          если <C>x = max</C>, числитель равен знаменателю и результат 1. Всё, что между, попадает
          строго внутрь отрезка.</P>
        <Code code={`import sys


def main():
    values = list(map(float, sys.stdin.readline().split()))

    lo, hi = min(values), max(values)

    if hi == lo:
        # Все числа одинаковые: деление на ноль, по условию выводим 0.5
        result = [0.5] * len(values)
    else:
        span = hi - lo
        result = [(x - lo) / span for x in values]

    print(" ".join(f"{v:.4f}" for v in result))


if __name__ == "__main__":
    main()`} />
        <P><B>Проверим на примере:</B></P>
        <Code lang="text" code={`Вход: 10 20 30 40
min = 10, max = 40, span = 30

(10 − 10) / 30 = 0.0000
(20 − 10) / 30 = 0.3333
(30 − 10) / 30 = 0.6667
(40 − 10) / 30 = 1.0000

вывод: 0.0000 0.3333 0.6667 1.0000`} />
        <P><B>Главная ловушка — случай max == min.</B> Именно ради него в условии отдельной строкой
          написано про 0.5, и именно на нём падает большинство решений: скрытый тест с одинаковыми
          числами почти наверняка есть.</P>
        <Code lang="text" code={`Вход: 5 5 5
span = 5 − 5 = 0
(5 − 5) / 0  ->  ZeroDivisionError

Правильный вывод: 0.5000 0.5000 0.5000`} />
        <P>
          Почему именно 0.5, а не 0 или 1? Потому что при одинаковых значениях ни одно из них не
          является ни минимальным, ни максимальным относительно остальных — все равноправны.
          Середина отрезка [0, 1] — единственный симметричный ответ. Так же поступает и
          <C> MinMaxScaler</C> из sklearn: при нулевой дисперсии он не падает, а возвращает константу.
        </P>
        <P><B>Остальные грабли:</B></P>
        <Ul items={[
          <><B>Читать через int вместо float.</B> В условии сказано «вещественные числа» — <C>int("1.5")</C> упадёт с ошибкой.</>,
          <><B>Считать min и max внутри цикла.</B> Работать будет, но это лишний проход на каждый элемент, O(n²) вместо O(n). На больших тестах может не уложиться в лимит.</>,
          <><B>Формат.</B> Снова 4 знака после запятой и пробел между числами в одной строке.</>,
        ]} />
        <Note>
          Смысловая справка, зачем это вообще нужно: min-max нормализация — один из способов привести
          признаки к сравнимому масштабу, о чём был вопрос 13. В отличие от стандартизации
          (вычесть среднее, поделить на стандартное отклонение) она гарантирует попадание строго в
          отрезок [0, 1], но гораздо чувствительнее к выбросам: один аномально большой элемент
          прижмёт все остальные к нулю.
        </Note>
      </Q>

      {/* Итоги */}
      <SectionTitle id="summary" kicker="Итог">Что повторить перед тестом</SectionTitle>

      <P>
        Тест не проверяет глубокие знания — он проверяет, нет ли дыр в базе. Почти каждый вопрос
        построен на типичной ошибке джуна. Вот сжатый список того, что нужно знать твёрдо:
      </P>
      <Table
        headers={['Тема', 'Что знать твёрдо']}
        rows={[
          ['Python', 'Методы, меняющие объект, возвращают None. Разница между изменением объекта и переприсваиванием имени. Сложности list / set / dict. Генераторы ленивы. except проверяются сверху вниз'],
          ['Pandas', 'groupby + агрегаты, раздувание строк при merge по неуникальному ключу, validate='],
          ['SQL', 'Логический порядок выполнения, ROW_NUMBER против RANK, ROW_NUMBER + PARTITION BY для «последней записи в группе», COUNT(DISTINCT)'],
          ['ML', 'Кто чувствителен к масштабу (расстояния и веса — да, деревья — нет). L1 зануляет, L2 сглаживает. ROC-AUC < 0.5 — перепутан знак'],
          ['Валидация', 'Fit только на train. Pipeline + cross_val_score. Временные ряды — только по времени'],
          ['Метрики', 'Precision = TP/(TP+FP), recall = TP/(TP+FN). Не путать знаменатели'],
        ]}
      />
      <Note>
        И сквозная тема, ради которой три отдельных вопроса: <B>утечка данных</B>. Любое
        преобразование, обученное с участием валидации или теста, завышает метрику и разваливается
        в проде. Правило одно и универсальное: <B>fit на train, transform на всех</B>.
      </Note>

      {/* Финал */}
      <div style={{ marginTop: 60, padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, textAlign: 'center' }}>
        <P style={{ fontSize: 14, margin: 0 }}>
          Все новости, разборы и объявления — в канале{' '}
          <a href="https://t.me/kiro_team" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)', textDecoration: 'underline', textUnderlineOffset: 2, fontWeight: 600 }}>
            t.me/kiro_team
          </a>.
        </P>
      </div>
    </div>
  )
}
