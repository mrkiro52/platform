import { useEffect } from 'react'
import SelfCheck from '../../components/SelfCheck'

const Code = ({ code, lang = 'python' }) => {
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">{lang}</div>
      <pre className="theory-code">
        <code>
          {lines.map((line, i) => {
            const commentIdx = line.indexOf('#')
            if (commentIdx === -1) {
              return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            }
            // check if # is inside a string
            const beforeHash = line.slice(0, commentIdx)
            const singlesBefore = (beforeHash.match(/'/g) || []).length
            const doublesBefore = (beforeHash.match(/"/g) || []).length
            const inString = singlesBefore % 2 !== 0 || doublesBefore % 2 !== 0
            if (inString) {
              return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
            }
            return (
              <span key={i}>
                <span style={{ color: 'var(--text-primary)' }}>{line.slice(0, commentIdx)}</span>
                <span style={{ color: '#6b7280' }}>{line.slice(commentIdx)}</span>
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
  <div style={{
    background: 'rgba(255,214,10,0.05)',
    border: '1px solid rgba(255,214,10,0.18)',
    borderRadius: 8,
    padding: '12px 16px',
    margin: '14px 0',
    color: 'var(--text-secondary)',
    fontSize: 13,
    lineHeight: 1.7,
  }}>
    <span style={{ color: 'var(--accent-lime)', fontWeight: 700, marginRight: 6 }}>💡</span>
    {children}
  </div>
)

const Warning = ({ children }) => (
  <div style={{
    background: 'rgba(255,170,0,0.07)',
    border: '1px solid rgba(255,170,0,0.25)',
    borderRadius: 8,
    padding: '12px 16px',
    margin: '14px 0',
    color: 'var(--text-secondary)',
    fontSize: 13,
    lineHeight: 1.7,
  }}>
    <span style={{ color: '#ffaa00', fontWeight: 700, marginRight: 6 }}>⚠️</span>
    {children}
  </div>
)

const SectionTitle = ({ id, children }) => (
  <h2 id={id} style={{
    color: 'var(--text-primary)',
    fontSize: 'clamp(18px, 3vw, 22px)',
    fontWeight: 700,
    margin: '40px 0 14px',
    paddingTop: 8,
    borderBottom: '1px solid var(--border-color)',
    paddingBottom: 10,
    scrollMarginTop: 80,
  }}>{children}</h2>
)

const SubTitle = ({ id, children }) => (
  <h3 id={id} style={{
    color: 'var(--text-primary)',
    fontSize: 'clamp(14px, 2.5vw, 17px)',
    fontWeight: 600,
    margin: '28px 0 10px',
    scrollMarginTop: 80,
  }}>{children}</h3>
)

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>
    {children}
  </p>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => (
      <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, marginBottom: 4 }}>
        {item}
      </li>
    ))}
  </ul>
)

const DataTable = ({ caption, headers, rows, highlightCols = [], highlightRows = [] }) => (
  <div style={{ margin: '16px 0' }}>
    {caption && (
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6, fontStyle: 'italic' }}>
        {caption}
      </div>
    )}
    <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 'max-content' }}>
        <thead>
          <tr>
            {headers.map((h, j) => (
              <th key={j} style={{
                padding: '8px 14px',
                textAlign: 'left',
                background: highlightCols.includes(j) ? 'rgba(255,214,10,0.18)' : 'var(--bg-secondary)',
                color: highlightCols.includes(j) ? 'var(--accent-lime)' : 'var(--text-secondary)',
                borderBottom: '2px solid var(--border-color)',
                fontFamily: 'monospace',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: highlightRows.includes(i) ? 'rgba(255,214,10,0.08)' : 'transparent' }}>
              {row.map((cell, j) => (
                <td key={j} style={{
                  padding: '7px 14px',
                  borderBottom: '1px solid var(--border-color)',
                  color: (highlightCols.includes(j) || highlightRows.includes(i)) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: typeof cell === 'number' ? 'monospace' : 'inherit',
                  whiteSpace: 'nowrap',
                }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const MethodTable = ({ rows }) => (
  <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '16px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr>
          {['Метод / атрибут', 'Описание', 'Пример'].map((h, i) => (
            <th key={i} style={{
              padding: '8px 14px', textAlign: 'left',
              background: 'var(--bg-secondary)', color: 'var(--text-secondary)',
              borderBottom: '2px solid var(--border-color)', fontWeight: 700,
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([method, desc, example], i) => (
          <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--accent-lime)', whiteSpace: 'nowrap' }}>{method}</td>
            <td style={{ padding: '7px 14px', color: 'var(--text-secondary)' }}>{desc}</td>
            <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--text-secondary)', whiteSpace: 'nowrap', fontSize: 12 }}>{example}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const C = ({ children }) => (
  <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>{children}</code>
)

const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>

const TOC = [
  { id: 'intro',      label: '1. Зачем нужен NumPy' },
  { id: 'ndarray',    label: '2. Устройство ndarray' },
  { id: 'create',     label: '3. Создание массивов' },
  { id: 'dtypes',     label: '4. Типы данных' },
  { id: 'indexing',   label: '5. Индексация и срезы' },
  { id: 'views',      label: '6. Копии и представления' },
  { id: 'masks',      label: '7. Маски и fancy indexing' },
  { id: 'shape',      label: '8. Изменение формы' },
  { id: 'stack',      label: '9. Склейка и разбиение' },
  { id: 'ufunc',      label: '10. Векторизация и ufunc' },
  { id: 'broadcast',  label: '11. Broadcasting' },
  { id: 'axis',       label: '12. Агрегации и оси' },
  { id: 'stats',      label: '13. Математика и статистика' },
  { id: 'sort',       label: '14. Сортировка и поиск' },
  { id: 'linalg',     label: '15. Линейная алгебра' },
  { id: 'random',     label: '16. Случайные числа' },
  { id: 'nan',        label: '17. NaN и бесконечности' },
  { id: 'io',         label: '18. Сохранение и загрузка' },
  { id: 'performance',label: '19. Производительность и память' },
  { id: 'interview',  label: '20. Задачи с собеседований' },
  { id: 'cheatsheet', label: '21. Шпаргалка' },
]

export default function NumpyLikbez({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>

      {/* Back */}
      <button
        onClick={onBack}
        style={{
          background: 'none', border: '1px solid var(--border-color)',
          color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6,
          fontSize: 13, cursor: 'pointer', marginBottom: 28, display: 'inline-flex',
          alignItems: 'center', gap: 6,
        }}
      >
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 12,
        padding: 'clamp(20px, 4vw, 36px)',
        marginBottom: 32,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{
            background: 'rgba(255,214,10,0.1)', border: '1px solid rgba(255,214,10,0.25)',
            borderRadius: 8, padding: '6px 14px', color: 'var(--accent-lime)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1,
          }}>PYTHON</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>Junior → Middle</div>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)',
          fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12,
        }}>
          NumPy — полный ликбез
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          Фундамент всего анализа данных и ML в Python: как устроены массивы, почему они в сотни раз быстрее
          списков, что такое оси и broadcasting, линейная алгебра, случайные числа и типичные задачи с собеседований.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['numpy 2.x', 'Python 3.10+', '~50 мин'].map(tag => (
            <span key={tag} style={{
              background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
              borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      {/* TOC */}
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 40,
      }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
          Содержание
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '6px 24px' }}>
          {TOC.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none', border: 'none', textAlign: 'left', padding: '4px 0',
                color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* ─── 1. Введение ─── */}
      <SectionTitle id="intro">1. Зачем нужен NumPy</SectionTitle>
      <P>
        <B>NumPy</B> (Numerical Python) — библиотека для быстрых вычислений над массивами чисел. Её главный объект —
        <C> ndarray</C>, многомерный массив элементов одного типа. На NumPy построены Pandas, scikit-learn, SciPy, Matplotlib,
        а PyTorch и TensorFlow копируют его интерфейс почти один в один. Кто знает NumPy — тот быстро осваивает весь стек данных.
      </P>
      <Code code={`pip install numpy`} lang="bash" />
      <Code code={`import numpy as np      # стандартное сокращение

print(np.__version__)   # 2.x`} />

      <SubTitle>Почему не обычный список</SubTitle>
      <P>
        Список Python хранит <B>ссылки</B> на отдельные объекты, разбросанные по памяти, и каждая операция проходит через
        интерпретатор. Массив NumPy — это <B>сплошной блок памяти</B> с числами одного типа, а циклы по нему крутятся в
        скомпилированном C-коде. Отсюда разница в скорости в 10–100 раз и в памяти в 3–8 раз.
      </P>
      <Code code={`import time

n = 1_000_000
lst = list(range(n))
arr = np.arange(n)

start = time.time()
res = [x * 2 for x in lst]       # цикл в Python
print('list :', round(time.time() - start, 4))   # ~0.04 сек

start = time.time()
res = arr * 2                    # цикл в C
print('numpy:', round(time.time() - start, 4))   # ~0.001 сек`} />

      <DataTable
        caption="Список и массив NumPy"
        headers={['', 'list', 'np.ndarray']}
        rows={[
          ['Типы элементов', 'любые, вперемешку', 'один dtype на весь массив'],
          ['Хранение', 'ссылки на объекты', 'сплошной блок памяти'],
          ['a * 2', 'повторяет список дважды', 'умножает каждый элемент'],
          ['a + b', 'склеивает списки', 'складывает поэлементно'],
          ['Размер', 'меняется (append)', 'фиксирован при создании'],
          ['Измерения', 'вложенные списки', 'настоящие оси: shape=(2, 3, 4)'],
        ]}
        highlightCols={[2]}
      />

      <Warning>
        Частая ошибка новичка: <C>[1, 2] * 2</C> — это <C>[1, 2, 1, 2]</C>, а <C>np.array([1, 2]) * 2</C> — это <C>array([2, 4])</C>.
        Операторы у списков и массивов значат разное.
      </Warning>

      <SelfCheck questions={[
        { q: 'Почему операции NumPy быстрее циклов по списку?', a: 'Массив хранит числа одного типа сплошным блоком памяти, а цикл по элементам выполняется в скомпилированном C-коде без интерпретатора и без проверки типа каждого элемента. Список хранит ссылки на отдельные Python-объекты, и каждая операция идёт через интерпретатор.' },
        { q: 'Что вернёт np.array([1, 2]) + np.array([3, 4]) и [1, 2] + [3, 4]?', a: 'Массив сложится поэлементно: array([4, 6]). Списки склеятся: [1, 2, 3, 4].' },
        { q: 'Какие библиотеки построены на NumPy?', a: 'Pandas, scikit-learn, SciPy, Matplotlib, statsmodels и многие другие. PyTorch и TensorFlow не используют NumPy внутри, но копируют его интерфейс и легко конвертируют массивы туда и обратно.' },
      ]} />

      {/* ─── 2. ndarray ─── */}
      <SectionTitle id="ndarray">2. Устройство ndarray</SectionTitle>
      <P>
        У каждого массива есть набор атрибутов, которые описывают его форму и то, как он лежит в памяти. Их спрашивают на
        собеседованиях и постоянно используют при отладке: 80% ошибок в NumPy — это неправильная форма массива.
      </P>
      <Code code={`a = np.array([[1, 2, 3],
              [4, 5, 6]])

a.shape     # (2, 3)  — 2 строки, 3 столбца
a.ndim      # 2       — число осей (измерений)
a.size      # 6       — всего элементов
a.dtype     # int64   — тип элементов
a.itemsize  # 8       — байт на один элемент
a.nbytes    # 48      — байт на весь массив (size * itemsize)
a.strides   # (24, 8) — на сколько байт прыгнуть по каждой оси`} />

      <MethodTable rows={[
        ['a.shape',    'Форма: кортеж длин по каждой оси',              '(2, 3)'],
        ['a.ndim',     'Количество осей',                               '2'],
        ['a.size',     'Общее число элементов',                         '6'],
        ['a.dtype',    'Тип элементов',                                 'int64'],
        ['a.itemsize', 'Размер одного элемента в байтах',               '8'],
        ['a.nbytes',   'Размер данных в байтах',                        '48'],
        ['a.strides',  'Шаг в байтах при переходе по каждой оси',      '(24, 8)'],
        ['a.T',        'Транспонированный массив',                      'shape (3, 2)'],
      ]} />

      <SubTitle>Оси и измерения</SubTitle>
      <P>
        Ось (axis) — это направление в массиве. У вектора одна ось, у матрицы две: <C>axis=0</C> идёт <B>вниз по строкам</B>,
        <C> axis=1</C> — <B>вправо по столбцам</B>. У массива из картинок формы <C>(100, 64, 64, 3)</C> четыре оси:
        номер картинки, высота, ширина, канал цвета.
      </P>
      <DataTable
        caption="Типичные формы массивов в анализе данных и ML"
        headers={['Данные', 'Форма', 'ndim']}
        rows={[
          ['Одно число (скаляр)', '()', 0],
          ['Цены 30 дней', '(30,)', 1],
          ['Таблица: 1000 клиентов × 5 признаков', '(1000, 5)', 2],
          ['Цветная картинка 64×64', '(64, 64, 3)', 3],
          ['Батч из 32 картинок', '(32, 64, 64, 3)', 4],
        ]}
      />

      <Note>
        Форма <C>(3,)</C> и форма <C>(3, 1)</C> — разные вещи. Первая — одномерный вектор, вторая — матрица-столбец из трёх строк.
        Из-за этой разницы чаще всего и ломается broadcasting (глава 11).
      </Note>

      <SubTitle>strides: как массив лежит в памяти</SubTitle>
      <P>
        Матрица 2×3 из int64 физически — это 6 чисел подряд, 48 байт. <C>strides = (24, 8)</C> значит: чтобы перейти к
        следующей строке, прыгаем на 24 байта (3 элемента по 8), к следующему столбцу — на 8 байт. Транспонирование,
        срезы и reshape часто меняют только shape и strides, не трогая сами данные, поэтому работают мгновенно.
      </P>

      <SelfCheck questions={[
        { q: 'Чем отличаются shape, ndim и size?', a: 'shape — кортеж длин по каждой оси, например (2, 3). ndim — число осей, то есть len(shape), здесь 2. size — общее число элементов, произведение shape, здесь 6.' },
        { q: 'Чем массив формы (3,) отличается от (3, 1)?', a: '(3,) — одномерный вектор с одной осью. (3, 1) — двумерная матрица из 3 строк и 1 столбца. Они по-разному ведут себя при broadcasting: (3,) + (3, 1) даст матрицу 3×3.' },
        { q: 'Что такое strides и зачем они нужны?', a: 'strides — сколько байт нужно пропустить в памяти, чтобы перейти к следующему элементу по каждой оси. Благодаря им транспонирование и многие срезы создают новый взгляд на те же данные без копирования.' },
      ]} />

      {/* ─── 3. Создание ─── */}
      <SectionTitle id="create">3. Создание массивов</SectionTitle>
      <Code code={`# Из списка (вложенные списки → многомерный массив)
np.array([1, 2, 3])
np.array([[1, 2], [3, 4]])
np.array([1, 2, 3], dtype=np.float32)   # с явным типом

# Заполненные массивы
np.zeros((2, 3))          # нули, по умолчанию float64
np.ones((2, 3), dtype=int)
np.full((2, 2), 7)        # всё заполнено числом 7
np.empty((1000, 1000))    # без инициализации: быстро, но внутри мусор
np.eye(3)                 # единичная матрица 3×3

# По образцу другого массива: та же форма и dtype
np.zeros_like(a)
np.ones_like(a)

# Последовательности
np.arange(5)              # array([0, 1, 2, 3, 4])
np.arange(2, 10, 3)       # array([2, 5, 8]) — как range
np.arange(0, 1, 0.25)     # array([0.  , 0.25, 0.5 , 0.75])
np.linspace(0, 1, 5)      # array([0.  , 0.25, 0.5 , 0.75, 1.  ]) — 5 точек, конец включён

# По формуле от индексов
np.fromfunction(lambda i, j: i * j, (3, 3), dtype=int)
# array([[0, 0, 0],
#        [0, 1, 2],
#        [0, 2, 4]])

# Повторы
np.tile([1, 2], 2)        # array([1, 2, 1, 2])
np.repeat([1, 2], 2)      # array([1, 1, 2, 2])`} />

      <DataTable
        caption="arange или linspace"
        headers={['', 'np.arange(start, stop, step)', 'np.linspace(start, stop, num)']}
        rows={[
          ['Что задаём', 'шаг', 'количество точек'],
          ['Конец', 'не включается', 'включается'],
          ['Дробный шаг', 'опасно: ошибки округления', 'безопасно'],
          ['Когда брать', 'целые индексы', 'сетка для графиков и расчётов'],
        ]}
      />

      <Warning>
        <C>np.arange(0, 1, 0.1)</C> из-за ошибок округления float иногда даёт на элемент больше или меньше, чем ожидаешь.
        Для дробных сеток используйте <C>np.linspace</C>.
      </Warning>

      <SelfCheck questions={[
        { q: 'Чем np.arange отличается от np.linspace?', a: 'arange задаёт шаг и не включает конец, как range. linspace задаёт количество точек и по умолчанию включает конец. Для дробных значений надёжнее linspace: у arange с дробным шагом бывают сюрпризы из-за округления.' },
        { q: 'Когда использовать np.empty и чем он опасен?', a: 'np.empty только выделяет память и не заполняет её, поэтому быстрее zeros. Но внутри лежит случайный мусор из памяти — использовать можно, только если сразу перезапишете все элементы.' },
        { q: 'Как создать массив такой же формы, как у a, но из нулей?', a: 'np.zeros_like(a) — копирует форму и dtype массива a. Аналогично ones_like, full_like и empty_like.' },
      ]} />

      {/* ─── 4. Типы ─── */}
      <SectionTitle id="dtypes">4. Типы данных</SectionTitle>
      <P>
        Все элементы массива имеют один тип — <C>dtype</C>. От него зависят память, точность и скорость. Если при создании
        передать разные типы, NumPy приведёт всё к самому «широкому».
      </P>
      <Code code={`np.array([1, 2, 3]).dtype      # int64
np.array([1, 2, 3.5]).dtype    # float64 — одно дробное число сделало всё float
np.array([1, True]).dtype      # int64   — True стал 1
np.array([1, 'a']).dtype       # <U21    — всё стало строками!

a = np.array([1.7, -1.7])
a.astype(int)                  # array([ 1, -1]) — дробная часть отбрасывается, не округляется
a.astype(np.float32)           # смена типа всегда создаёт копию`} />

      <DataTable
        caption="Основные типы"
        headers={['dtype', 'Байт', 'Диапазон / точность', 'Где встречается']}
        rows={[
          ['bool', 1, 'True / False', 'маски'],
          ['int8 / uint8', 1, '−128…127 / 0…255', 'пиксели картинок'],
          ['int32', 4, '±2.1 млрд', 'индексы, экономия памяти'],
          ['int64', 8, '±9.2·10¹⁸', 'целые по умолчанию'],
          ['float32', 4, '~7 значащих цифр', 'нейросети, GPU'],
          ['float64', 8, '~15–16 значащих цифр', 'дробные по умолчанию'],
          ['<U10', 40, 'строка до 10 символов', 'текст (лучше хранить в Pandas)'],
          ['object', 8, 'ссылки на Python-объекты', 'теряется вся скорость'],
        ]}
      />

      <SubTitle>Переполнение</SubTitle>
      <P>
        Целые типы NumPy имеют фиксированный размер и при выходе за границу молча «заворачиваются», в отличие от
        целых Python, которые растут бесконечно.
      </P>
      <Code code={`x = np.array([200], dtype=np.uint8)
x + 100          # array([44], dtype=uint8) — 300 - 256 = 44, без ошибки!

np.int8(127) + np.int8(1)   # -128 и RuntimeWarning: overflow

# Решение — привести к широкому типу заранее
x.astype(np.int32) + 100    # array([300])`} />

      <SubTitle>Сравнение дробных чисел</SubTitle>
      <Code code={`0.1 + 0.2 == 0.3              # False — ошибка округления float
np.isclose(0.1 + 0.2, 0.3)    # True  — сравнение с допуском
np.allclose(a, b)             # True, если все элементы почти равны`} />

      <Warning>
        Складывая пиксели картинки в <C>uint8</C>, легко получить мусор из-за переполнения. Перед арифметикой картинки обычно
        переводят в <C>float32</C> и делят на 255.
      </Warning>

      <SelfCheck questions={[
        { q: 'Какой dtype будет у np.array([1, 2, 3.0])?', a: 'float64. Если в данных есть хоть одно дробное число, NumPy приводит весь массив к float. Если есть строка — весь массив станет строковым.' },
        { q: 'Что вернёт np.array([1.9, -1.9]).astype(int)?', a: 'array([ 1, -1]). astype(int) отбрасывает дробную часть в сторону нуля, а не округляет. Для округления сначала вызовите np.round.' },
        { q: 'Что произойдёт при 250 + 10 в массиве uint8?', a: 'Переполнение: результат «завернётся» и станет 4 (260 - 256). NumPy не выбросит ошибку, поэтому перед арифметикой стоит переводить данные в более широкий тип.' },
      ]} />

      {/* ─── 5. Индексация ─── */}
      <SectionTitle id="indexing">5. Индексация и срезы</SectionTitle>
      <P>
        Индексация в NumPy похожа на списки, но в многомерном массиве индексы по всем осям пишутся
        через запятую в одних скобках: <C>m[строка, столбец]</C>.
      </P>
      <Code code={`m = np.arange(12).reshape(3, 4)
# array([[ 0,  1,  2,  3],
#        [ 4,  5,  6,  7],
#        [ 8,  9, 10, 11]])

m[1, 2]        # 6        — элемент
m[-1, -1]      # 11       — последний элемент
m[1]           # array([4, 5, 6, 7])  — строка 1
m[:, 1]        # array([1, 5, 9])     — столбец 1
m[1:, ::2]     # строки с 1-й, столбцы через один
# array([[ 4,  6],
#        [ 8, 10]])
m[::-1]        # строки в обратном порядке
m[..., 0]      # ... = «все остальные оси», здесь то же, что m[:, 0]`} />

      <DataTable
        caption="m[1:, ::2] — выбранные элементы подсвечены"
        headers={['', 'col 0', 'col 1', 'col 2', 'col 3']}
        rows={[
          ['row 0', 0, 1, 2, 3],
          ['row 1', '[4]', 5, '[6]', 7],
          ['row 2', '[8]', 9, '[10]', 11],
        ]}
        highlightRows={[1, 2]}
      />

      <Note>
        <C>m[1][2]</C> тоже работает, но сначала создаёт промежуточный массив-строку и только потом берёт из неё элемент.
        <C> m[1, 2]</C> быстрее и единственно правильный вариант для срезов: <C>m[:, 1]</C> и <C>m[:][1]</C> — разные вещи
        (второе вернёт строку 1, а не столбец).
      </Note>

      <SubTitle>Присваивание через срез</SubTitle>
      <Code code={`m[0] = 0           # вся строка 0 стала нулями
m[:, -1] = [7, 7, 7]   # последний столбец
m[m > 8] = -1      # все элементы больше 8 (маски — в главе 7)`} />

      <SelfCheck questions={[
        { q: 'Как взять второй столбец матрицы m?', a: 'm[:, 1] — двоеточие означает «все строки», 1 — номер столбца. Результат одномерный, форма (n,). Чтобы оставить столбец двумерным, пишут m[:, 1:2] или m[:, [1]] — форма (n, 1).' },
        { q: 'Чем m[1, 2] отличается от m[1][2]?', a: 'Результат одинаковый, но m[1][2] сначала создаёт промежуточный массив m[1], а потом индексирует его. m[1, 2] — одно обращение, быстрее. А для срезов m[:, 1] и m[:][1] дают разный результат.' },
        { q: 'Что значит многоточие (...) в индексе?', a: 'Ellipsis заменяет столько двоеточий, сколько нужно, чтобы покрыть все оставшиеся оси. Для 4-мерного массива x[..., 0] — то же, что x[:, :, :, 0], например первый канал всех картинок.' },
      ]} />

      {/* ─── 6. View vs copy ─── */}
      <SectionTitle id="views">6. Копии и представления</SectionTitle>
      <P>
        Самая коварная тема NumPy и любимый вопрос на собеседованиях. <B>Обычный срез не копирует данные</B> — он создаёт
        представление (view): новый объект-массив, который смотрит в ту же память. Меняете view — меняется оригинал.
      </P>
      <Code code={`a = np.arange(10)
v = a[2:5]          # view, а не копия!
v[0] = 100
print(a)            # [  0   1 100   3   4   5   6   7   8   9] — оригинал изменился

v.base is a         # True — у view есть «родитель»

c = a[2:5].copy()   # явная копия
c[0] = -1           # a не меняется`} />

      <DataTable
        caption="Что создаёт view, а что копию"
        headers={['Операция', 'Результат']}
        rows={[
          ['a[2:5], a[::2], a[:, 1] — срезы', 'view'],
          ['a.T, a.transpose()', 'view'],
          ['a.reshape(...)', 'view, если возможно без перестановки данных'],
          ['a.ravel()', 'view, если возможно'],
          ['a[[0, 2]] — индекс списком', 'копия'],
          ['a[a > 0] — маска', 'копия'],
          ['a.flatten(), a.copy(), a.astype(...)', 'всегда копия'],
          ['a + 1, np.sqrt(a) — арифметика', 'новый массив'],
        ]}
      />

      <Code code={`# Проверка: делят ли два массива память
np.shares_memory(a, a[2:5])     # True
np.shares_memory(a, a[[2, 3]])  # False

# Типичный баг: функция «портит» входные данные
def normalize(x):
    x -= x.mean()       # in-place: меняет массив снаружи!
    return x

def normalize(x):
    return x - x.mean() # создаёт новый массив — безопасно`} />

      <Warning>
        Если взяли небольшой срез огромного массива и храните только его, весь большой массив останется в памяти — view держит
        ссылку на родителя. В таком случае делайте <C>.copy()</C>.
      </Warning>

      <SelfCheck questions={[
        { q: 'Что такое view в NumPy и чем он отличается от копии?', a: 'View — новый объект-массив, который ссылается на те же данные в памяти, но может иметь другую форму или шаги. Изменения через view видны в оригинале. Копия — независимый массив со своими данными.' },
        { q: 'Какие операции создают копию, а какие — view?', a: 'Срезы, транспонирование, reshape и ravel (где возможно) — view. Индексация списком индексов (fancy indexing), булевой маской, flatten, copy и astype — всегда копия.' },
        { q: 'Как проверить, делят ли два массива память?', a: 'np.shares_memory(a, b) или проверить атрибут base: у view он указывает на исходный массив, у самостоятельного массива base равен None.' },
      ]} />

      {/* ─── 7. Маски ─── */}
      <SectionTitle id="masks">7. Маски и fancy indexing</SectionTitle>
      <SubTitle>Булевы маски</SubTitle>
      <P>
        Сравнение массива с числом даёт массив из True/False — маску. Маской можно выбирать и изменять элементы. Это главный
        способ фильтрации в NumPy и Pandas.
      </P>
      <Code code={`x = np.array([3, -1, 8, 0, 5])

x > 2                    # array([ True, False,  True, False,  True])
x[x > 2]                 # array([3, 8, 5])

# Несколько условий: & (и), | (или), ~ (не) — и обязательно скобки
x[(x > 0) & (x < 6)]     # array([3, 5])
x[(x < 0) | (x > 5)]     # array([-1, 8])
x[~(x > 0)]              # array([-1, 0])

# Подсчёт по маске: True = 1
(x > 0).sum()            # 3 — сколько положительных
(x > 0).mean()           # 0.6 — доля положительных
(x > 0).any(), (x > 0).all()   # True, False`} />

      <Warning>
        Нельзя писать <C>x[x &gt; 0 and x &lt; 6]</C> — <C>and</C>/<C>or</C> не работают с массивами и дают ошибку
        «The truth value of an array is ambiguous». Используйте <C>&amp;</C>, <C>|</C> и скобки вокруг каждого условия.
      </Warning>

      <SubTitle>np.where — векторный if</SubTitle>
      <Code code={`np.where(x > 0, x, 0)          # array([3, 0, 8, 0, 5]) — отрицательные → 0
np.where(x > 0, 'плюс', 'не плюс')

np.where(x > 2)                # (array([0, 2, 4]),) — индексы, где True
np.nonzero(x > 2)              # то же самое

# Несколько условий — np.select
grade = np.select(
    [x >= 5, x >= 0],          # условия по порядку
    ['high', 'low'],           # значения
    default='negative',
)`} />

      <SubTitle>Fancy indexing — индексы списком</SubTitle>
      <Code code={`m = np.arange(12).reshape(3, 4)

m[[0, 2]]              # строки 0 и 2
m[:, [3, 0]]           # столбцы 3 и 0, в этом порядке
m[[0, 2], [1, 3]]      # array([ 1, 11]) — пары (0,1) и (2,3), не подматрица!
m[np.ix_([0, 2], [1, 3])]
# array([[ 1,  3],
#        [ 9, 11]])     — подматрица из строк 0,2 и столбцов 1,3`} />

      <SelfCheck questions={[
        { q: 'Как выбрать элементы массива больше 0 и меньше 10?', a: 'x[(x > 0) & (x < 10)]. Каждое условие обязательно в скобках, а вместо and используется &. Python-операторы and/or не работают поэлементно с массивами.' },
        { q: 'Что делает np.where с тремя и с одним аргументом?', a: 'np.where(cond, a, b) — векторный if: берёт элемент из a, где условие истинно, и из b — где ложно. np.where(cond) с одним аргументом возвращает индексы элементов, где условие истинно.' },
        { q: 'Что вернёт m[[0, 2], [1, 3]]?', a: 'Одномерный массив из двух элементов: m[0, 1] и m[2, 3]. Списки индексов по осям объединяются попарно. Чтобы получить подматрицу 2×2, используют m[np.ix_([0, 2], [1, 3])] или m[[0, 2]][:, [1, 3]].' },
      ]} />

      {/* ─── 8. Форма ─── */}
      <SectionTitle id="shape">8. Изменение формы</SectionTitle>
      <P>
        <C>reshape</C> раскладывает те же элементы по новой форме. Количество элементов должно совпадать: 12 элементов можно
        превратить в 3×4, 2×6 или 2×2×3, но не в 5×3. Одну из размерностей можно указать как <C>-1</C> — NumPy вычислит её сам.
      </P>
      <Code code={`a = np.arange(6)            # array([0, 1, 2, 3, 4, 5])

a.reshape(2, 3)
# array([[0, 1, 2],
#        [3, 4, 5]])

a.reshape(2, -1)            # -1 = «посчитай сам» → (2, 3)
a.reshape(-1, 1)            # столбец формы (6, 1) — так часто готовят признак для sklearn

m = a.reshape(2, 3)
m.T                         # транспонирование, форма (3, 2)
m.ravel()                   # обратно в 1D (view, если возможно)
m.flatten()                 # обратно в 1D, всегда копия`} />

      <SubTitle>Добавить или убрать ось</SubTitle>
      <Code code={`v = np.array([1, 2, 3])     # shape (3,)

v[:, np.newaxis]            # shape (3, 1) — столбец
v[np.newaxis, :]            # shape (1, 3) — строка
v[:, None]                  # None — то же, что np.newaxis
np.expand_dims(v, axis=0)   # shape (1, 3)

x = np.zeros((1, 3, 1))
x.squeeze()                 # shape (3,) — убрать все оси длины 1
x.squeeze(axis=0)           # shape (3, 1) — только указанную

# Перестановка осей (картинки: каналы в конце → каналы в начале)
img = np.zeros((64, 64, 3))
img.transpose(2, 0, 1).shape    # (3, 64, 64)
np.moveaxis(img, -1, 0).shape   # (3, 64, 64) — то же самое`} />

      <DataTable
        caption="reshape, ravel, flatten"
        headers={['Метод', 'Копирует данные', 'Когда использовать']}
        rows={[
          ['reshape', 'нет, если можно', 'смена формы'],
          ['ravel', 'нет, если можно', 'быстро вытянуть в 1D для чтения'],
          ['flatten', 'всегда', 'нужна независимая 1D-копия'],
          ['resize (метод)', 'меняет массив на месте', 'почти никогда'],
        ]}
      />

      <SelfCheck questions={[
        { q: 'Что значит -1 в reshape?', a: 'Это «вычисли эту размерность сам» по общему числу элементов. Например, массив из 12 элементов, reshape(3, -1) даст форму (3, 4). -1 можно указать только в одной позиции.' },
        { q: 'Чем ravel отличается от flatten?', a: 'Оба вытягивают массив в одномерный. ravel по возможности возвращает view без копирования, поэтому быстрее, но изменения через него попадут в оригинал. flatten всегда создаёт копию.' },
        { q: 'Как превратить вектор формы (n,) в столбец (n, 1)?', a: 'v.reshape(-1, 1), v[:, np.newaxis], v[:, None] или np.expand_dims(v, 1). Это нужно для broadcasting и для sklearn, который ждёт двумерную матрицу признаков.' },
      ]} />

      {/* ─── 9. Склейка ─── */}
      <SectionTitle id="stack">9. Склейка и разбиение</SectionTitle>
      <Code code={`p = np.array([[1, 2],
              [3, 4]])
q = np.array([[5, 6]])

np.concatenate([p, q])           # по оси 0 (вниз) → shape (3, 2)
np.concatenate([p, p], axis=1)   # по оси 1 (вправо) → shape (2, 4)

np.vstack([p, q])                # вертикально, как concatenate axis=0
np.hstack([p, p])                # горизонтально, как axis=1
np.column_stack([[1, 2], [3, 4]])   # векторы как столбцы → [[1, 3], [2, 4]]

# stack создаёт НОВУЮ ось
np.stack([p, p]).shape           # (2, 2, 2)
np.stack([p, p], axis=-1).shape  # (2, 2, 2), новая ось в конце

# Разбиение
np.split(np.arange(6), 3)        # [array([0, 1]), array([2, 3]), array([4, 5])]
np.array_split(np.arange(7), 3)  # части неравные: [0,1,2], [3,4], [5,6]
np.split(np.arange(10), [3, 7])  # по позициям: [0..2], [3..6], [7..9]`} />

      <DataTable
        caption="concatenate или stack"
        headers={['', 'concatenate', 'stack']}
        rows={[
          ['Число осей', 'не меняется', '+1 новая ось'],
          ['Формы входов', 'совпадают везде, кроме оси склейки', 'полностью одинаковые'],
          ['Пример', '2 таблицы по 100 строк → 200 строк', '10 картинок 64×64 → батч (10, 64, 64)'],
        ]}
      />

      <Warning>
        Не наращивайте массив в цикле через <C>np.append</C> или <C>np.concatenate</C>: каждый вызов копирует весь массив,
        и цикл становится квадратичным. Копите куски в обычный список и склейте один раз в конце, или заранее создайте
        массив нужного размера.
      </Warning>

      <SelfCheck questions={[
        { q: 'Чем np.concatenate отличается от np.stack?', a: 'concatenate склеивает массивы вдоль существующей оси, число измерений не меняется. stack добавляет новую ось и складывает массивы вдоль неё — например, из 10 векторов (5,) получается матрица (10, 5).' },
        { q: 'Почему np.append в цикле — плохая идея?', a: 'Массив NumPy имеет фиксированный размер, поэтому np.append каждый раз создаёт новый массив и копирует все данные. Цикл из n шагов становится O(n²). Правильно — собрать список и один раз вызвать np.array или np.concatenate.' },
        { q: 'Как разбить массив из 7 элементов на 3 части?', a: 'np.array_split(a, 3) — разрешает неравные части: [0,1,2], [3,4], [5,6]. np.split(a, 3) выдаст ошибку, потому что 7 не делится на 3 нацело.' },
      ]} />

      {/* ─── 10. Векторизация ─── */}
      <SectionTitle id="ufunc">10. Векторизация и ufunc</SectionTitle>
      <P>
        <B>Векторизация</B> — запись вычислений над целыми массивами вместо циклов по элементам. Арифметика и математические
        функции в NumPy работают поэлементно и называются <B>ufunc</B> (universal functions).
      </P>
      <Code code={`a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b       # array([5, 7, 9])
a * b       # array([ 4, 10, 18]) — поэлементно, это НЕ матричное умножение
a ** 2      # array([1, 4, 9])
b / a       # array([4. , 2.5, 2. ])
b // a      # целочисленное деление
b % a       # остаток
a > 1       # array([False,  True,  True])

np.sqrt(a), np.exp(a), np.log(a), np.abs(a)
np.sin(a), np.round(a / 3, 2), np.maximum(a, 2)   # maximum — поэлементный max`} />

      <SubTitle>Цикл и векторизация на одной задаче</SubTitle>
      <Code code={`prices = np.array([100, 250, 80, 400])
qty    = np.array([3, 1, 10, 2])

# Цикл — медленно и многословно
total = 0
for p, q in zip(prices, qty):
    total += p * q

# Векторно — быстро и в одну строку
total = (prices * qty).sum()      # 2150
total = prices @ qty              # 2150 — скалярное произведение`} />

      <SubTitle>Методы ufunc и параметр out</SubTitle>
      <Code code={`np.add.reduce([1, 2, 3, 4])       # 10 — то же, что sum
np.add.accumulate([1, 2, 3, 4])   # array([ 1,  3,  6, 10]) — как cumsum
np.multiply.outer([1, 2], [10, 20])
# array([[10, 20],
#        [20, 40]])

# Результат в готовый массив — без выделения новой памяти
out = np.empty(3)
np.multiply(a, 2, out=out)
a *= 2                            # in-place, тоже без нового массива`} />

      <Warning>
        <C>np.vectorize</C> не ускоряет код: внутри это тот же цикл Python, просто с удобным интерфейсом. Настоящая
        векторизация — переписать логику через арифметику, маски, <C>np.where</C> и встроенные функции.
      </Warning>

      <SelfCheck questions={[
        { q: 'Что такое векторизация?', a: 'Запись операции над всем массивом сразу (a * b, np.sqrt(a)) вместо Python-цикла по элементам. Цикл при этом выполняется внутри NumPy на C, что в десятки раз быстрее.' },
        { q: 'Что такое ufunc?', a: 'Universal function — функция NumPy, которая применяется поэлементно и поддерживает broadcasting, параметр out, а также методы reduce, accumulate и outer. Примеры: np.add, np.sqrt, np.exp, np.maximum.' },
        { q: 'Ускоряет ли np.vectorize код?', a: 'Нет. np.vectorize — удобная обёртка, которая вызывает Python-функцию для каждого элемента, по скорости это обычный цикл. Ускорение даёт только переписывание логики на встроенные операции NumPy.' },
      ]} />

      {/* ─── 11. Broadcasting ─── */}
      <SectionTitle id="broadcast">11. Broadcasting</SectionTitle>
      <P>
        <B>Broadcasting</B> (транслирование) — правило, по которому NumPy выполняет операции над массивами разной формы, не копируя
        данные. Когда вы пишете <C>a * 2</C>, число 2 «растягивается» до формы a. То же работает и для массивов.
      </P>

      <SubTitle>Правила</SubTitle>
      <Ul items={[
        <>Формы сравниваются <B>справа налево</B>, по последним осям.</>,
        <>Если у одного массива осей меньше, слева ему дописываются единицы: <C>(3,)</C> → <C>(1, 3)</C>.</>,
        <>Две размерности совместимы, если они <B>равны</B> или одна из них <B>равна 1</B>. Единица растягивается до размера другой.</>,
        <>Если размерности разные и ни одна не равна 1 — ошибка <C>operands could not be broadcast together</C>.</>,
      ]} />

      <DataTable
        caption="Примеры совместимости форм"
        headers={['A', 'B', 'Результат']}
        rows={[
          ['(3, 4)', '()  — число', '(3, 4)'],
          ['(3, 4)', '(4,)', '(3, 4) — строка прибавляется к каждой строке'],
          ['(3, 4)', '(3, 1)', '(3, 4) — столбец прибавляется к каждому столбцу'],
          ['(3, 1)', '(1, 4)', '(3, 4) — «таблица умножения»'],
          ['(3, 4)', '(3,)', 'ошибка: 4 ≠ 3'],
          ['(32, 64, 64, 3)', '(3,)', '(32, 64, 64, 3) — своё значение для каждого канала'],
        ]}
      />

      <Code code={`col = np.array([[1], [2], [3]])   # (3, 1)
row = np.array([10, 20])          # (2,)

col + row
# array([[11, 21],
#        [12, 22],
#        [13, 23]])               # (3, 2)

# Стандартизация признаков: из каждого столбца вычесть его среднее и поделить на std
X = np.array([[1., 2.],
              [3., 4.],
              [5., 6.]])          # (3, 2)
X_norm = (X - X.mean(axis=0)) / X.std(axis=0)   # mean и std имеют форму (2,)

# Нормировка строк: каждую строку поделить на её сумму
X / X.sum(axis=1, keepdims=True)  # keepdims оставляет форму (3, 1) — иначе была бы ошибка`} />

      <Note>
        Если broadcasting выдал ошибку или неожиданную форму, распечатайте <C>.shape</C> обоих операндов и пройдите правила
        справа налево. Чаще всего не хватает оси длины 1 — добавьте её через <C>[:, None]</C> или <C>keepdims=True</C>.
      </Note>

      <SelfCheck questions={[
        { q: 'Сформулируйте правила broadcasting.', a: 'Формы выравниваются по правому краю, недостающие оси слева считаются равными 1. По каждой оси размеры должны совпадать или один из них должен быть 1 — тогда он растягивается. Иначе возникает ошибка.' },
        { q: 'Какой формы будет результат (3, 1) + (4,)?', a: '(3, 4). (4,) превращается в (1, 4), затем ось длины 1 у каждого массива растягивается: 3 строки и 4 столбца.' },
        { q: 'Зачем нужен keepdims=True?', a: 'Он сохраняет агрегированную ось с длиной 1. Например, X.sum(axis=1) даёт форму (n,), а с keepdims — (n, 1), и результат можно корректно поделить на X формы (n, m) через broadcasting.' },
      ]} />

      {/* ─── 12. Оси ─── */}
      <SectionTitle id="axis">12. Агрегации и оси</SectionTitle>
      <P>
        Агрегирующие функции сворачивают массив в одно число или вдоль выбранной оси. Главное правило: <B>axis — это ось, которая
        исчезает</B>. <C>axis=0</C> схлопывает строки и даёт результат по каждому столбцу, <C>axis=1</C> схлопывает столбцы и даёт
        результат по каждой строке.
      </P>
      <Code code={`m = np.array([[1, 5, 2],
              [7, 3, 9]])         # (2, 3)

m.sum()            # 27            — по всему массиву
m.sum(axis=0)      # array([ 8,  8, 11]) — по столбцам, форма (3,)
m.sum(axis=1)      # array([ 8, 19])     — по строкам, форма (2,)
m.sum(axis=1, keepdims=True).shape   # (2, 1)

m.mean(), m.min(), m.max(), m.std(), m.prod()
m.argmax()         # 5 — индекс максимума в «вытянутом» массиве
m.argmax(axis=1)   # array([1, 2]) — индекс максимума в каждой строке
np.unravel_index(m.argmax(), m.shape)   # (1, 2) — индекс как строка и столбец

np.cumsum([1, 2, 3, 4])    # array([ 1,  3,  6, 10]) — накопленная сумма
np.cumprod([1, 2, 3, 4])   # array([ 1,  2,  6, 24])
np.diff([1, 4, 9, 16])     # array([3, 5, 7]) — разности соседних`} />

      <DataTable
        caption="m.sum(axis=…) для m = [[1, 5, 2], [7, 3, 9]]"
        headers={['', 'col 0', 'col 1', 'col 2', 'axis=1 →']}
        rows={[
          ['row 0', 1, 5, 2, 8],
          ['row 1', 7, 3, 9, 19],
          ['axis=0 ↓', 8, 8, 11, ''],
        ]}
        highlightRows={[2]}
        highlightCols={[4]}
      />

      <SelfCheck questions={[
        { q: 'Что вернёт m.sum(axis=0) для матрицы 2×3?', a: 'Массив из 3 элементов — суммы по каждому столбцу. axis=0 — ось строк, она «схлопывается», остаётся ось столбцов.' },
        { q: 'Как найти индекс максимального элемента в каждой строке?', a: 'm.argmax(axis=1). Без axis argmax вернёт индекс в вытянутом одномерном массиве; перевести его в пару (строка, столбец) можно через np.unravel_index(i, m.shape).' },
        { q: 'Чем np.cumsum отличается от np.sum?', a: 'sum возвращает одно итоговое значение (или по одному на ось), cumsum — массив накопленных сумм той же длины: [1, 2, 3] → [1, 3, 6].' },
      ]} />

      {/* ─── 13. Статистика ─── */}
      <SectionTitle id="stats">13. Математика и статистика</SectionTitle>
      <Code code={`x = np.array([3, 1, 2, 10])

np.mean(x)                 # 4.0
np.median(x)               # 2.5 — устойчива к выбросу 10
np.percentile(x, 90)       # 90-й перцентиль
np.quantile(x, [0.25, 0.75])   # квартили

np.var(x), np.std(x)       # дисперсия и стандартное отклонение (ddof=0)
np.std([1, 2, 3, 4])           # 1.118 — по генеральной совокупности
np.std([1, 2, 3, 4], ddof=1)   # 1.291 — по выборке, как в Pandas

np.corrcoef([1, 2, 3], [2, 4, 7])   # матрица корреляций, вне диагонали ≈ 0.993
np.cov(a, b)                        # матрица ковариаций

np.clip([-5, 3, 12], 0, 10)    # array([ 0,  3, 10]) — обрезать в диапазон
np.round(1.234, 2)             # 1.23
np.round(2.5), np.round(3.5)   # 2.0, 4.0 — банковское округление к чётному!
np.floor(2.7), np.ceil(2.1)    # 2.0, 3.0

np.unique([3, 1, 3, 2, 1], return_counts=True)
# (array([1, 2, 3]), array([2, 1, 2])) — значения и сколько раз встретились
np.bincount([0, 1, 1, 3])      # array([1, 2, 0, 1]) — частоты целых 0..max
np.histogram([1, 2, 2, 3, 3, 3], bins=3)   # частоты по корзинам и их границы`} />

      <Warning>
        <C>np.std</C> по умолчанию считает с <C>ddof=0</C> (делит на n), а Pandas <C>.std()</C> — с <C>ddof=1</C> (делит на n−1).
        Поэтому на одних и тех же данных они дают разный результат.
      </Warning>

      <SelfCheck questions={[
        { q: 'Почему np.std и pandas.Series.std дают разные значения?', a: 'NumPy по умолчанию использует ddof=0 — делит на n (стандартное отклонение генеральной совокупности). Pandas — ddof=1, делит на n−1 (несмещённая оценка по выборке). Чтобы совпало, передайте ddof явно.' },
        { q: 'Что вернёт np.round(2.5)?', a: '2.0. NumPy округляет «половинки» к ближайшему чётному числу (банковское округление), поэтому 2.5 → 2, а 3.5 → 4. Так же работает и встроенный round в Python 3.' },
        { q: 'Как посчитать, сколько раз встречается каждое значение?', a: 'np.unique(x, return_counts=True) возвращает уникальные значения и их количества. Для неотрицательных целых быстрее np.bincount(x) — массив частот для каждого числа от 0 до max.' },
      ]} />

      {/* ─── 14. Сортировка ─── */}
      <SectionTitle id="sort">14. Сортировка и поиск</SectionTitle>
      <Code code={`r = np.array([40, 10, 30, 20])

np.sort(r)             # array([10, 20, 30, 40]) — новый массив
r.sort()               # сортирует на месте, возвращает None
np.sort(r)[::-1]       # по убыванию

np.argsort(r)          # array([1, 3, 2, 0]) — индексы, которые отсортируют массив
r[np.argsort(r)]       # то же, что np.sort(r)
np.argsort(r)[::-1][:2]    # array([0, 2]) — индексы двух самых больших

# Сортировка одного массива по другому
names = np.array(['Аня', 'Боря', 'Вика', 'Гоша'])
names[np.argsort(r)]   # имена по возрастанию r

# Матрица: сортировка внутри строк или столбцов
m.sort(axis=1)

# Частичная сортировка — top-k за O(n) вместо O(n log n)
x = np.array([5, 1, 9, 3, 7])
idx = np.argpartition(x, -2)[-2:]      # индексы двух наибольших (без порядка)
idx[np.argsort(x[idx])[::-1]]          # array([2, 4]) — теперь по убыванию

# Поиск в отсортированном массиве (бинпоиск)
np.searchsorted([10, 20, 30, 40], 25)  # 2 — куда вставить, чтобы порядок сохранился

np.isin([1, 5, 7], [5, 7, 9])          # array([False,  True,  True])
np.intersect1d([1, 2, 3], [2, 3, 4])   # array([2, 3])
np.setdiff1d([1, 2, 3], [2])           # array([1, 3])`} />

      <SelfCheck questions={[
        { q: 'Чем np.sort отличается от np.argsort?', a: 'np.sort возвращает отсортированные значения. np.argsort — индексы, в порядке которых нужно взять элементы, чтобы получить сортировку. argsort нужен, когда надо отсортировать один массив по значениям другого.' },
        { q: 'Как быстро найти k наибольших элементов?', a: 'np.argpartition(x, -k)[-k:] находит индексы k наибольших за линейное время, но без порядка между ними. Если порядок нужен, досортировать эти k индексов через argsort. Полная сортировка — O(n log n), что медленнее на больших массивах.' },
        { q: 'Что делает np.searchsorted?', a: 'Бинарным поиском находит, на какую позицию нужно вставить значение в отсортированный массив, чтобы порядок не нарушился. Используется для разбиения по интервалам и быстрого поиска.' },
      ]} />

      {/* ─── 15. Линейная алгебра ─── */}
      <SectionTitle id="linalg">15. Линейная алгебра</SectionTitle>
      <P>
        Линейная алгебра — язык машинного обучения: признаки объектов — это матрица, веса модели — вектор, предсказание — их
        произведение. В NumPy для этого есть оператор <C>@</C> и модуль <C>np.linalg</C>.
      </P>
      <Code code={`A = np.array([[2., 1.],
              [1., 3.]])
b = np.array([3., 5.])

A @ A                  # матричное произведение
# array([[ 5.,  5.],
#        [ 5., 10.]])
A * A                  # поэлементное — совсем другое!
np.dot([1, 2, 3], [4, 5, 6])   # 32 — скалярное произведение векторов

A.T                    # транспонирование
np.linalg.det(A)       # 5.000000000000001 — определитель (с ошибкой округления)
np.linalg.inv(A)       # обратная матрица
# array([[ 0.6, -0.2],
#        [-0.2,  0.4]])
np.linalg.solve(A, b)  # array([0.8, 1.4]) — решение системы A·x = b
np.linalg.norm([3, 4]) # 5.0 — длина вектора (L2-норма)
np.linalg.norm(v, ord=1)       # L1-норма: сумма модулей

w, V = np.linalg.eig(A)        # собственные значения и векторы
U, S, Vt = np.linalg.svd(A)    # сингулярное разложение (основа PCA)
np.linalg.matrix_rank(A)       # ранг`} />

      <DataTable
        caption="Какое умножение когда"
        headers={['Запись', 'Что делает', 'Формы']}
        rows={[
          ['a * b', 'поэлементно', 'одинаковые или совместимые по broadcasting'],
          ['a @ b, np.matmul', 'матричное', '(n, k) @ (k, m) → (n, m)'],
          ['np.dot(a, b)', 'скалярное для векторов, матричное для матриц', 'как @ для 1D и 2D'],
          ['np.outer(a, b)', 'внешнее произведение', '(n,) и (m,) → (n, m)'],
          ['np.einsum', 'любое из перечисленного по формуле', 'см. главу 19'],
        ]}
      />

      <SubTitle>Линейная регрессия в три строки</SubTitle>
      <Code code={`x = np.array([1, 2, 3])
y = np.array([2, 4, 6.1])

X = np.c_[np.ones(len(x)), x]                  # столбец единиц для свободного члена
w = np.linalg.lstsq(X, y, rcond=None)[0]       # метод наименьших квадратов
print(w.round(3))                              # [-0.067  2.05 ] → y ≈ -0.067 + 2.05·x

# Через нормальное уравнение (так объясняют на собеседовании)
w = np.linalg.inv(X.T @ X) @ X.T @ y`} />

      <Warning>
        Для решения систем используйте <C>np.linalg.solve</C> или <C>lstsq</C>, а не <C>inv(A) @ b</C>: обратная матрица
        считается дольше и накапливает больше ошибок округления.
      </Warning>

      <SelfCheck questions={[
        { q: 'Чем A * B отличается от A @ B?', a: 'A * B — поэлементное произведение, формы должны совпадать или быть совместимы по broadcasting. A @ B — матричное: строки A умножаются на столбцы B, формы (n, k) и (k, m) дают (n, m).' },
        { q: 'Как решить систему линейных уравнений A·x = b?', a: 'np.linalg.solve(A, b). Это быстрее и точнее, чем np.linalg.inv(A) @ b. Если система переопределена (уравнений больше, чем неизвестных), используют np.linalg.lstsq — метод наименьших квадратов.' },
        { q: 'Где в ML используется SVD?', a: 'Сингулярное разложение лежит в основе PCA (снижение размерности), рекомендательных систем через матричные разложения, псевдообратной матрицы и сжатия данных.' },
      ]} />

      {/* ─── 16. Случайные числа ─── */}
      <SectionTitle id="random">16. Случайные числа</SectionTitle>
      <P>
        Современный способ — создать генератор <C>np.random.default_rng(seed)</C> и вызывать методы у него. Одинаковый seed
        даёт одинаковую последовательность, это нужно для воспроизводимых экспериментов.
      </P>
      <Code code={`rng = np.random.default_rng(42)     # генератор с зерном 42

rng.integers(0, 10, size=5)         # целые от 0 до 9: array([0, 7, 6, 4, 4])
rng.random(3)                       # равномерно в [0, 1)
rng.uniform(-1, 1, size=(2, 2))     # равномерно в [-1, 1)
rng.normal(loc=0, scale=1, size=1000)   # нормальное распределение
rng.choice(['a', 'b', 'c'], size=2, replace=False)   # выбор без повторов
rng.choice(3, size=10, p=[0.7, 0.2, 0.1])            # с заданными вероятностями
rng.permutation(10)                 # перемешанная копия 0..9
rng.shuffle(arr)                    # перемешать на месте

# Разбиение на train/test
idx = rng.permutation(len(X))
train_idx, test_idx = idx[:800], idx[800:]`} />

      <DataTable
        caption="Старый и новый интерфейс"
        headers={['Старый (legacy)', 'Новый (рекомендуется)']}
        rows={[
          ['np.random.seed(42)', 'rng = np.random.default_rng(42)'],
          ['np.random.rand(3)', 'rng.random(3)'],
          ['np.random.randint(0, 10, 5)', 'rng.integers(0, 10, 5)'],
          ['np.random.randn(3)', 'rng.standard_normal(3)'],
          ['np.random.choice(...)', 'rng.choice(...)'],
        ]}
      />

      <Note>
        Старый интерфейс с <C>np.random.seed</C> меняет одно глобальное состояние на всю программу: любая библиотека, которая
        тоже берёт случайные числа, сдвигает вашу последовательность. Отдельный генератор <C>rng</C> от этого защищён.
      </Note>

      <SelfCheck questions={[
        { q: 'Зачем фиксировать seed?', a: 'Чтобы случайные числа повторялись от запуска к запуску: одинаковое разбиение на train/test, одинаковая инициализация. Без этого результаты экспериментов нельзя воспроизвести и честно сравнить.' },
        { q: 'Чем np.random.default_rng лучше np.random.seed?', a: 'default_rng создаёт независимый генератор со своим состоянием и использует более качественный алгоритм PCG64. np.random.seed меняет глобальное состояние, на которое влияет любой другой код в программе.' },
        { q: 'Чем permutation отличается от shuffle?', a: 'rng.permutation(x) возвращает перемешанную копию (или перемешанный range, если передать число). rng.shuffle(x) перемешивает массив на месте и возвращает None.' },
      ]} />

      {/* ─── 17. NaN ─── */}
      <SectionTitle id="nan">17. NaN и бесконечности</SectionTitle>
      <P>
        <C>np.nan</C> (Not a Number) обозначает пропуск или неопределённый результат, <C>np.inf</C> — бесконечность. Оба — значения
        типа float, поэтому в целочисленном массиве NaN хранить нельзя.
      </P>
      <Code code={`d = np.array([1., np.nan, 3.])

d.mean()            # nan — один NaN «заражает» весь результат
np.nanmean(d)       # 2.0 — игнорирует NaN
np.nansum(d), np.nanmax(d), np.nanstd(d)

np.nan == np.nan    # False! NaN не равен даже самому себе
d == np.nan         # array([False, False, False]) — так искать нельзя
np.isnan(d)         # array([False,  True, False]) — правильно
np.isnan(d).sum()   # 1 — сколько пропусков

d[np.isnan(d)] = 0  # заменить пропуски
np.nan_to_num(d, nan=0.0, posinf=1e9)

1 / np.array([0.])          # array([inf]) + RuntimeWarning
np.log(np.array([0.]))      # array([-inf])
np.sqrt(np.array([-1.]))    # array([nan])
np.isfinite([1, np.inf, np.nan])   # array([ True, False, False])`} />

      <Warning>
        <C>np.array([1, 2, np.nan], dtype=int)</C> выдаст ошибку: NaN бывает только во float. Поэтому Pandas превращает
        целочисленный столбец с пропусками во float64.
      </Warning>

      <SelfCheck questions={[
        { q: 'Почему np.nan == np.nan возвращает False?', a: 'По стандарту IEEE 754 NaN не равен ничему, даже самому себе. Поэтому проверять пропуски нужно через np.isnan(x), а не через сравнение.' },
        { q: 'Как посчитать среднее массива с пропусками?', a: 'np.nanmean(x) — пропускает NaN. Обычный x.mean() вернёт nan. Аналогично есть nansum, nanmax, nanmin, nanstd, nanmedian.' },
        { q: 'Можно ли хранить NaN в массиве int64?', a: 'Нет, NaN — специальное значение float. Массив с NaN должен быть float, иначе при создании будет ошибка. Именно поэтому целые столбцы в Pandas с пропусками становятся float64.' },
      ]} />

      {/* ─── 18. Ввод-вывод ─── */}
      <SectionTitle id="io">18. Сохранение и загрузка</SectionTitle>
      <Code code={`# Бинарный формат NumPy — быстро, сохраняет dtype и форму
np.save('features.npy', X)
X = np.load('features.npy')

# Несколько массивов в одном файле
np.savez('data.npz', X=X, y=y)                # без сжатия
np.savez_compressed('data.npz', X=X, y=y)     # со сжатием
data = np.load('data.npz')
X, y = data['X'], data['y']

# Текстовые форматы
np.savetxt('out.csv', X, delimiter=',', fmt='%.3f')
X = np.loadtxt('out.csv', delimiter=',')
X = np.genfromtxt('raw.csv', delimiter=',', skip_header=1)   # пустые ячейки → nan

# Огромные файлы — без загрузки в память целиком
big = np.load('huge.npy', mmap_mode='r')     # читается с диска по мере обращения

# Конвертация
arr.tolist()                # обратно в список Python
df.to_numpy()               # из Pandas в NumPy`} />

      <Note>
        Таблицы с заголовками, разными типами столбцов и пропусками удобнее читать через <C>pd.read_csv</C>, а потом брать
        <C> df.to_numpy()</C>. NumPy-функции чтения хороши для однородных числовых данных.
      </Note>

      <SelfCheck questions={[
        { q: 'Чем формат .npy лучше CSV для массивов?', a: '.npy — бинарный: сохраняет точный dtype и форму, читается и пишется в разы быстрее, не теряет точность float при переводе в текст. CSV удобен только для обмена с людьми и другими программами.' },
        { q: 'Как сохранить несколько массивов в один файл?', a: 'np.savez("data.npz", X=X, y=y) или np.savez_compressed для сжатия. Загрузка: data = np.load("data.npz"), затем data["X"].' },
        { q: 'Что делает mmap_mode при загрузке?', a: 'Открывает .npy как отображение файла в память: данные не читаются целиком, а подгружаются с диска по мере обращения. Так можно работать с массивами больше оперативной памяти.' },
      ]} />

      {/* ─── 19. Производительность ─── */}
      <SectionTitle id="performance">19. Производительность и память</SectionTitle>
      <Ul items={[
        'Убирайте Python-циклы: арифметика, маски, np.where, агрегации с axis',
        'Не растите массив в цикле — выделите память заранее через np.empty или копите список',
        'Используйте in-place операции (a += 1, out=…), чтобы не создавать временные массивы',
        'Берите тип поменьше, если хватает точности: float32 вдвое легче float64',
        'Избегайте dtype=object — массив Python-объектов теряет всю скорость NumPy',
        'Помните про view: срез не копирует, а .copy() на огромном массиве стоит дорого',
        'Если векторизовать не получается, посмотрите на Numba — она компилирует цикл в машинный код',
      ]} />

      <Code code={`# Предвыделение памяти вместо append
result = np.empty(n)
for i in range(n):
    result[i] = f(i)

# Временные массивы: a * b + c создаёт промежуточный a * b
out = np.multiply(a, b)
out += c                  # переиспользуем память

# Память
np.zeros((1000, 1000)).nbytes / 1024**2                    # 7.63 МБ (float64)
np.zeros((1000, 1000), dtype=np.float32).nbytes / 1024**2  # 3.81 МБ

# Порядок хранения: C (по строкам, по умолчанию) и F (по столбцам)
a.flags['C_CONTIGUOUS']
np.ascontiguousarray(a.T)  # непрерывная копия — ускоряет работу с транспонированным массивом`} />

      <SubTitle>einsum — универсальная запись</SubTitle>
      <P>
        <C>np.einsum</C> описывает операцию через индексы, как в формулах: повторяющийся индекс суммируется. Им удобно
        записывать сложные произведения тензоров без промежуточных transpose и reshape.
      </P>
      <Code code={`np.einsum('ij,jk->ik', A, B)   # матричное произведение A @ B
np.einsum('ii', A)             # след матрицы (сумма диагонали)
np.einsum('ij->ji', A)         # транспонирование
np.einsum('i,i->', a, b)       # скалярное произведение
np.einsum('bij,bjk->bik', X, Y)   # батч матричных произведений`} />

      <SelfCheck questions={[
        { q: 'Какие основные способы ускорить код на NumPy?', a: 'Векторизовать вместо циклов; заранее выделять память; использовать in-place операции и параметр out; выбирать минимально достаточный dtype; не использовать object-массивы. Если цикл неизбежен — Numba или Cython.' },
        { q: 'Почему float32 иногда предпочтительнее float64?', a: 'Он занимает вдвое меньше памяти и быстрее обрабатывается, особенно на GPU. Точности в ~7 значащих цифр хватает для нейросетей и большинства признаков. Для финансовых и научных расчётов оставляют float64.' },
        { q: 'Что делает np.einsum("ij,jk->ik", A, B)?', a: 'Матричное произведение: индекс j повторяется во входах и отсутствует в выходе, поэтому по нему идёт суммирование. Результат такой же, как A @ B.' },
      ]} />

      {/* ─── 20. Задачи ─── */}
      <SectionTitle id="interview">20. Задачи с собеседований</SectionTitle>
      <P>
        Эти задачи регулярно дают на собеседованиях в ML и анализ данных: решить без циклов, только средствами NumPy.
        Попробуйте сначала сами, потом сверьтесь с решением.
      </P>

      <SubTitle>One-hot кодирование</SubTitle>
      <Code code={`labels = np.array([0, 2, 1, 2])
one_hot = np.eye(3)[labels]
# array([[1., 0., 0.],
#        [0., 0., 1.],
#        [0., 1., 0.],
#        [0., 0., 1.]])`} />

      <SubTitle>Численно устойчивый softmax</SubTitle>
      <Code code={`def softmax(z):
    e = np.exp(z - z.max(axis=-1, keepdims=True))   # вычитаем max, чтобы exp не переполнился
    return e / e.sum(axis=-1, keepdims=True)

softmax(np.array([1., 2., 3.])).round(3)   # array([0.09 , 0.245, 0.665])`} />

      <SubTitle>Скользящее среднее</SubTitle>
      <Code code={`x = np.array([1, 2, 3, 4, 5])
np.convolve(x, np.ones(3) / 3, mode='valid')   # array([2., 3., 4.])

# Через накопленную сумму — O(n) для любого окна
def moving_average(x, k):
    c = np.cumsum(np.insert(x, 0, 0))
    return (c[k:] - c[:-k]) / k`} />

      <SubTitle>Матрица попарных расстояний</SubTitle>
      <Code code={`P = np.array([[0, 0], [3, 4], [6, 8]])          # 3 точки на плоскости

diff = P[:, None, :] - P[None, :, :]            # (3, 1, 2) - (1, 3, 2) → (3, 3, 2)
D = np.sqrt((diff ** 2).sum(axis=-1))
# array([[ 0.,  5., 10.],
#        [ 5.,  0.,  5.],
#        [10.,  5.,  0.]])`} />

      <SubTitle>Сигмоида, нормализация, top-k</SubTitle>
      <Code code={`sigmoid = lambda z: 1 / (1 + np.exp(-z))

# Min-max нормализация каждого столбца в [0, 1]
X_mm = (X - X.min(axis=0)) / (X.max(axis=0) - X.min(axis=0))

# Нормировка строк до единичной длины (для косинусной близости)
X_unit = X / np.linalg.norm(X, axis=1, keepdims=True)
cos_sim = X_unit @ X_unit.T

# Индексы 3 наибольших значений по убыванию
top3 = np.argsort(x)[::-1][:3]

# Accuracy классификатора
accuracy = (y_pred == y_true).mean()`} />

      <SelfCheck questions={[
        { q: 'Зачем в softmax вычитают максимум?', a: 'exp от больших чисел переполняется до inf, и результат становится nan. Вычитание максимума не меняет ответ (множитель e^(-max) сокращается в числителе и знаменателе), но все показатели становятся ≤ 0, и exp не переполняется.' },
        { q: 'Как сделать one-hot кодирование без цикла?', a: 'np.eye(k)[labels] — берём строки единичной матрицы по номерам классов. Каждая строка единичной матрицы — это и есть one-hot вектор своего класса.' },
        { q: 'Как посчитать попарные расстояния между n точками без циклов?', a: 'Через broadcasting: P[:, None, :] - P[None, :, :] даёт массив разностей (n, n, d), затем возвести в квадрат, сложить по последней оси и взять корень. Для больших n экономнее формула ||a||² + ||b||² − 2a·b через матричное произведение.' },
      ]} />

      {/* ─── 21. Шпаргалка ─── */}
      <SectionTitle id="cheatsheet">21. Шпаргалка</SectionTitle>

      <SubTitle>Создание</SubTitle>
      <MethodTable rows={[
        ['np.array(list)',          'Массив из списка',                'np.array([1, 2, 3])'],
        ['np.zeros / ones / full',  'Заполненный массив',              'np.zeros((2, 3))'],
        ['np.empty(shape)',         'Без инициализации',               'np.empty(100)'],
        ['np.arange(a, b, step)',   'Последовательность с шагом',      'np.arange(0, 10, 2)'],
        ['np.linspace(a, b, n)',    'n точек от a до b',               'np.linspace(0, 1, 5)'],
        ['np.eye(n)',               'Единичная матрица',               'np.eye(3)'],
        ['np.zeros_like(a)',        'Такой же формы и типа',           'np.zeros_like(a)'],
        ['rng.random / normal',     'Случайные числа',                 'rng.normal(0, 1, 100)'],
      ]} />

      <SubTitle>Форма</SubTitle>
      <MethodTable rows={[
        ['a.shape / ndim / size',   'Форма, число осей, элементов',    'a.shape'],
        ['a.reshape(r, c)',         'Новая форма',                     'a.reshape(-1, 1)'],
        ['a.ravel() / flatten()',   'В одномерный',                    'a.ravel()'],
        ['a.T / transpose',         'Транспонирование',                'a.transpose(2, 0, 1)'],
        ['a[:, None]',              'Добавить ось',                    'np.expand_dims(a, 1)'],
        ['a.squeeze()',             'Убрать оси длины 1',              'a.squeeze()'],
        ['np.concatenate',          'Склеить по оси',                  'np.concatenate([a, b], axis=1)'],
        ['np.stack',                'Склеить по новой оси',            'np.stack([a, b])'],
      ]} />

      <SubTitle>Выборка</SubTitle>
      <MethodTable rows={[
        ['a[i, j]',                 'Элемент',                         'm[1, 2]'],
        ['a[:, j]',                 'Столбец',                         'm[:, 0]'],
        ['a[mask]',                 'По булевой маске',                'a[(a > 0) & (a < 9)]'],
        ['a[[i, k]]',               'По списку индексов',              'a[[0, 3]]'],
        ['np.where(c, x, y)',       'Векторный if',                    'np.where(a > 0, a, 0)'],
        ['np.select',               'Несколько условий',               'np.select([c1, c2], [v1, v2])'],
        ['a.copy()',                'Независимая копия',               'b = a[:5].copy()'],
      ]} />

      <SubTitle>Вычисления</SubTitle>
      <MethodTable rows={[
        ['sum / mean / std',        'Агрегации (axis, keepdims)',      'a.mean(axis=0)'],
        ['min / max / argmax',      'Экстремумы и их индексы',         'a.argmax(axis=1)'],
        ['cumsum / diff',           'Накопленная сумма, разности',     'np.cumsum(a)'],
        ['nanmean / nansum',        'Агрегации без NaN',               'np.nanmean(a)'],
        ['np.unique',               'Уникальные и частоты',            'np.unique(a, return_counts=True)'],
        ['np.sort / argsort',       'Сортировка и её индексы',         'np.argsort(a)[::-1]'],
        ['np.clip / round',         'Обрезка, округление',             'np.clip(a, 0, 1)'],
        ['np.percentile',           'Перцентиль',                      'np.percentile(a, 95)'],
      ]} />

      <SubTitle>Линейная алгебра</SubTitle>
      <MethodTable rows={[
        ['a @ b',                   'Матричное произведение',          'X @ w'],
        ['np.dot(a, b)',            'Скалярное произведение',          'np.dot(u, v)'],
        ['np.linalg.solve',         'Решить A·x = b',                  'np.linalg.solve(A, b)'],
        ['np.linalg.inv',           'Обратная матрица',                'np.linalg.inv(A)'],
        ['np.linalg.norm',          'Норма вектора',                   'np.linalg.norm(v)'],
        ['np.linalg.eig / svd',     'Разложения',                      'np.linalg.svd(A)'],
        ['np.linalg.lstsq',         'Наименьшие квадраты',             'np.linalg.lstsq(X, y)'],
      ]} />

      <SelfCheck questions={[
        { q: 'Какие атрибуты массива смотреть первым делом при ошибке?', a: 'a.shape и a.dtype. Большинство ошибок — неверная форма при broadcasting или матричном умножении и неожиданный тип (int вместо float, object вместо чисел).' },
        { q: 'Как одной строкой посчитать долю элементов больше 0?', a: '(a > 0).mean() — маска из True/False усредняется как 1 и 0. Количество — (a > 0).sum().' },
        { q: 'Как получить индексы трёх наибольших элементов по убыванию?', a: 'np.argsort(a)[::-1][:3]. Для очень больших массивов быстрее np.argpartition(a, -3)[-3:] с последующей сортировкой этих трёх индексов.' },
      ]} />

      {/* Финальный блок */}
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid rgba(255,214,10,0.15)',
        borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', margin: '40px 0 20px',
        textAlign: 'center',
      }}>
        <div style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
          Официальная документация
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
          numpy.org — руководство для начинающих, User Guide и полный справочник функций
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'numpy.org/doc/stable/user/absolute_beginners.html',
            'numpy.org/doc/stable/reference/',
          ].map(url => (
            <code key={url} style={{
              fontFamily: 'monospace', fontSize: 12,
              background: 'var(--bg-tertiary)', padding: '4px 10px',
              borderRadius: 4, color: 'var(--text-secondary)', wordBreak: 'break-all',
            }}>{url}</code>
          ))}
        </div>
      </div>

    </div>
  )
}
