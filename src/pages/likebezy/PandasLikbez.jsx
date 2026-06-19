import { useEffect } from 'react'

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
    background: 'rgba(200,255,0,0.05)',
    border: '1px solid rgba(200,255,0,0.18)',
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
                background: highlightCols.includes(j) ? 'rgba(200,255,0,0.18)' : 'var(--bg-secondary)',
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
            <tr key={i} style={{ background: highlightRows.includes(i) ? 'rgba(200,255,0,0.08)' : 'transparent' }}>
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

const TOC = [
  { id: 'intro',        label: '1. Введение и установка' },
  { id: 'series',       label: '2. Series' },
  { id: 'dataframe',    label: '3. DataFrame' },
  { id: 'io',           label: '4. Чтение и запись данных' },
  { id: 'explore',      label: '5. Исследование данных' },
  { id: 'indexing',     label: '6. Индексация и выборка' },
  { id: 'filtering',    label: '7. Фильтрация' },
  { id: 'missing',      label: '8. Пропущенные значения' },
  { id: 'columns',      label: '9. Работа со столбцами' },
  { id: 'types',        label: '10. Типы данных' },
  { id: 'sorting',      label: '11. Сортировка' },
  { id: 'groupby',      label: '12. Группировка (groupby)' },
  { id: 'apply',        label: '13. apply / map' },
  { id: 'merge',        label: '14. Объединение данных' },
  { id: 'strings',      label: '15. Работа со строками' },
  { id: 'datetime',     label: '16. Даты и время' },
  { id: 'pivot',        label: '17. Pivot tables' },
  { id: 'window',       label: '18. Оконные функции' },
  { id: 'performance',  label: '19. Производительность' },
  { id: 'cheatsheet',   label: '20. Шпаргалка всех методов' },
]

export default function PandasLikbez({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>

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
        ← Назад к ликбезам
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
            background: 'rgba(200,255,0,0.1)', border: '1px solid rgba(200,255,0,0.25)',
            borderRadius: 8, padding: '6px 14px', color: 'var(--accent-lime)',
            fontSize: 12, fontWeight: 700, letterSpacing: 1,
          }}>PYTHON</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12 }}>Junior → Middle</div>
        </div>
        <h1 style={{
          fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)',
          fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12,
        }}>
          Pandas — полный ликбез
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
          Всё необходимое для работы с данными в Python: от создания Series и DataFrame до группировки,
          объединения, работы с датами и оптимизации производительности.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['pandas 2.x', 'Python 3.10+', '~45 мин'].map(tag => (
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
      <SectionTitle id="intro">1. Введение и установка</SectionTitle>
      <P>
        <strong style={{ color: 'var(--text-primary)' }}>Pandas</strong> — главная библиотека Python для работы с табличными
        и временными данными. Она предоставляет два ключевых объекта: <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>Series</code> (одномерный
        массив) и <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>DataFrame</code> (двумерная таблица).
      </P>
      <Code code={`pip install pandas          # базовая установка
pip install pandas openpyxl  # + поддержка Excel
pip install pandas pyarrow   # + Parquet / Arrow`} lang="bash" />
      <Code code={`import pandas as pd   # стандартное сокращение
import numpy as np    # часто используется вместе

print(pd.__version__)  # 2.x`} />

      {/* ─── 2. Series ─── */}
      <SectionTitle id="series">2. Series</SectionTitle>
      <P>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>Series</code> — это одномерный массив с
        метками (индексом). Думайте о нём как о столбце таблицы или о словаре, в котором ключи стали индексом.
      </P>
      <Code code={`# Создание из списка
s = pd.Series([10, 20, 30, 40])

# Создание с явным индексом
s = pd.Series(
    [10, 20, 30],
    index=['a', 'b', 'c'],
    name='score'
)

# Создание из словаря
s = pd.Series({'math': 90, 'english': 85, 'history': 78})

# Создание из скаляра (broadcast)
s = pd.Series(0, index=range(5))   # [0, 0, 0, 0, 0]`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '16px 0' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>s = pd.Series([10,20,30], index=['a','b','c'])</div>
          <DataTable
            headers={['index', 'values']}
            rows={[['a', 10], ['b', 20], ['c', 30]]}
          />
        </div>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8, padding: 16 }}>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10 }}>Ключевые атрибуты</div>
          {[
            ['s.values', 'array([10, 20, 30])'],
            ['s.index', "Index(['a','b','c'])"],
            ['s.dtype', 'int64'],
            ['s.name', "'score'"],
            ['s.shape', '(3,)'],
            ['len(s)', '3'],
          ].map(([attr, val]) => (
            <div key={attr} style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--border-color)', fontSize: 13 }}>
              <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>{attr}</code>
              <code style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontSize: 12 }}>{val}</code>
            </div>
          ))}
        </div>
      </div>

      <Code code={`# Доступ к элементам
s['a']        # по метке → 10
s[0]          # по позиции → 10 (устарело для строк-индексов)
s.iloc[0]     # по позиции → 10 (явный способ)
s.loc['a']    # по метке  → 10 (явный способ)

# Срезы
s['a':'b']    # 10, 20 (включая 'b')
s.iloc[0:2]   # 10, 20 (не включая 2)

# Арифметика (выравнивание по индексу)
s1 = pd.Series({'a': 1, 'b': 2})
s2 = pd.Series({'b': 10, 'c': 20})
s1 + s2  # a: NaN, b: 12, c: NaN`} />

      {/* ─── 3. DataFrame ─── */}
      <SectionTitle id="dataframe">3. DataFrame</SectionTitle>
      <P>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>DataFrame</code> — двумерная таблица.
        Каждый столбец — это <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>Series</code> с общим индексом.
      </P>
      <Code code={`# Из словаря списков
df = pd.DataFrame({
    'name':  ['Alice', 'Bob', 'Carol', 'Dave'],
    'age':   [24, 30, 22, 35],
    'score': [88.5, 92.0, 75.5, 95.0],
    'city':  ['Moscow', 'SPb', 'Moscow', 'Kazan'],
})

# Из списка словарей
df = pd.DataFrame([
    {'name': 'Alice', 'age': 24},
    {'name': 'Bob',   'age': 30},
])

# Из numpy-массива
import numpy as np
df = pd.DataFrame(
    np.arange(12).reshape(4, 3),
    columns=['A', 'B', 'C']
)

# Задать индекс при создании
df = pd.DataFrame(data, index=['r1', 'r2', 'r3'])`} />

      <DataTable
        caption="Пример: df с 4 строками"
        headers={['', 'name', 'age', 'score', 'city']}
        rows={[
          [0, 'Alice', 24, 88.5, 'Moscow'],
          [1, 'Bob',   30, 92.0, 'SPb'],
          [2, 'Carol', 22, 75.5, 'Moscow'],
          [3, 'Dave',  35, 95.0, 'Kazan'],
        ]}
      />

      <SubTitle>Атрибуты DataFrame</SubTitle>
      <MethodTable rows={[
        ['df.shape',   'Размер: (строки, столбцы)',   '(4, 4)'],
        ['df.columns', 'Список столбцов',              "Index(['name','age',…])"],
        ['df.index',   'Строковый индекс',             'RangeIndex(0, 4)'],
        ['df.dtypes',  'Типы каждого столбца',         'name: object, age: int64…'],
        ['df.values',  'numpy-массив всех данных',     'array([[…], …])'],
        ['df.size',    'Общее число элементов',        '16'],
        ['df.ndim',    'Размерность (всегда 2)',        '2'],
        ['df.T',       'Транспонировать',               '—'],
      ]} />

      {/* ─── 4. IO ─── */}
      <SectionTitle id="io">4. Чтение и запись данных</SectionTitle>

      <SubTitle>Чтение</SubTitle>
      <Code code={`# CSV
df = pd.read_csv('data.csv')
df = pd.read_csv(
    'data.csv',
    sep=';',             # разделитель
    encoding='utf-8',
    index_col='id',      # столбец → индекс
    usecols=['a', 'b'],  # только эти столбцы
    nrows=1000,          # первые N строк
    skiprows=[1, 2],     # пропустить строки
    na_values=['N/A', '?'],  # что считать NaN
    parse_dates=['date'],    # распарсить даты
    dtype={'age': int},      # явные типы
)

# Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# JSON
df = pd.read_json('data.json')

# Parquet (быстро и компактно)
df = pd.read_parquet('data.parquet')

# SQL
import sqlite3
conn = sqlite3.connect('db.sqlite')
df = pd.read_sql('SELECT * FROM users', conn)

# Clipboard (удобно для отладки)
df = pd.read_clipboard()`} />

      <SubTitle>Запись</SubTitle>
      <Code code={`df.to_csv('out.csv', index=False)        # без индекса
df.to_csv('out.csv', sep=';', encoding='utf-8')

df.to_excel('out.xlsx', index=False, sheet_name='Data')

df.to_json('out.json', orient='records', force_ascii=False)

df.to_parquet('out.parquet', index=False)

df.to_sql('table_name', conn, if_exists='replace', index=False)`} />

      {/* ─── 5. Исследование ─── */}
      <SectionTitle id="explore">5. Исследование данных</SectionTitle>
      <P>Первое, что делается при получении нового датасета — быстрое знакомство с его содержимым и структурой.</P>
      <Code code={`df.head(5)      # первые 5 строк (по умолчанию)
df.tail(5)      # последние 5 строк
df.sample(5)    # 5 случайных строк
df.sample(frac=0.1)  # 10% случайных строк

df.shape        # (строки, столбцы) → (1000, 8)
df.info()       # типы, null-значения, память
df.describe()   # статистика числовых столбцов
df.describe(include='all')  # включая строковые
df.describe(include=[object])  # только строки

df.dtypes       # dtype каждого столбца
df.columns      # названия столбцов
df.index        # информация об индексе

df['city'].value_counts()           # частоты значений
df['city'].value_counts(normalize=True)  # в долях
df['city'].nunique()                # кол-во уникальных
df['city'].unique()                 # массив уникальных

df.isnull().sum()        # число NaN по столбцам
df.isnull().sum() / len(df)  # доля NaN

df.memory_usage(deep=True)  # память в байтах`} />

      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 8, padding: 16, margin: '16px 0', fontSize: 13,
      }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, marginBottom: 10 }}>
          ВЫВОД df.describe() для числовых столбцов
        </div>
        <DataTable
          headers={['', 'age', 'score']}
          rows={[
            ['count', '4.000', '4.000'],
            ['mean',  '27.750', '87.750'],
            ['std',   '5.852', '8.139'],
            ['min',   '22.000', '75.500'],
            ['25%',   '23.500', '85.375'],
            ['50%',   '27.000', '90.250'],
            ['75%',   '31.250', '92.625'],
            ['max',   '35.000', '95.000'],
          ]}
        />
      </div>

      {/* ─── 6. Индексация ─── */}
      <SectionTitle id="indexing">6. Индексация и выборка</SectionTitle>
      <P>Самая важная тема в pandas. Нужно чётко понимать разницу между <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>loc</code> и <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>iloc</code>.</P>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, margin: '16px 0' }}>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(200,255,0,0.2)', borderRadius: 8, padding: 16 }}>
          <div style={{ color: 'var(--accent-lime)', fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>df.loc[ ]</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>Выборка по <strong>меткам</strong> (именам строк и столбцов). Конечный индекс <strong>включается</strong>.</p>
          <Code code={`df.loc[0]          # строка 0
df.loc[0, 'name']  # конкретная ячейка
df.loc[0:2, 'age':'score']  # срез
df.loc[[0,2], ['name','city']]`} />
        </div>
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid rgba(255,170,0,0.2)', borderRadius: 8, padding: 16 }}>
          <div style={{ color: '#ffaa00', fontFamily: 'monospace', fontWeight: 700, marginBottom: 8 }}>df.iloc[ ]</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 8 }}>Выборка по <strong>позиции</strong> (числовым индексам). Конечный индекс <strong>НЕ включается</strong>.</p>
          <Code code={`df.iloc[0]         # строка 0
df.iloc[0, 1]      # строка 0, столбец 1
df.iloc[0:3, 1:3]  # срез строк и столбцов
df.iloc[[0,2], [0,2]]`} />
        </div>
      </div>

      <Code code={`# Выбор столбцов
df['name']          # Series одного столбца
df[['name', 'age']] # DataFrame нескольких столбцов
df.name             # атрибутный доступ (не рекомендуется)

# Выбор строк по условию (boolean indexing)
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Установка индекса
df2 = df.set_index('name')   # столбец name → индекс
df2.reset_index()             # индекс обратно в столбец

# Переиндексация
df.reindex([3, 1, 0, 2])    # изменить порядок строк
df.reindex(columns=['age', 'name', 'score', 'city'])`} />

      <Warning>
        Не используйте цепочки индексации <code style={{ fontFamily: 'monospace' }}>df['col'][0] = val</code> — это ведёт к SettingWithCopyWarning.
        Всегда используйте <code style={{ fontFamily: 'monospace' }}>df.loc[0, 'col'] = val</code>.
      </Warning>

      {/* ─── 7. Фильтрация ─── */}
      <SectionTitle id="filtering">7. Фильтрация</SectionTitle>
      <Code code={`# Простые условия
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Несколько условий (& | ~ — НЕ and/or/not!)
df[(df['age'] > 25) & (df['score'] >= 90)]
df[(df['city'] == 'Moscow') | (df['city'] == 'SPb')]
df[~(df['city'] == 'Moscow')]  # инверсия

# query() — более читаемый синтаксис
df.query('age > 25')
df.query('city == "Moscow" and score >= 85')
df.query('age in [24, 30]')
df.query('score > @threshold')  # переменные через @

# isin() — проверка вхождения в список
df[df['city'].isin(['Moscow', 'SPb'])]
df[~df['city'].isin(['Kazan'])]   # исключить

# between() — диапазон включительно
df[df['age'].between(22, 30)]

# str.contains() — поиск по строке
df[df['name'].str.contains('Al')]
df[df['name'].str.startswith('A')]

# where() — заменяет не подходящие на NaN
df['score'].where(df['score'] >= 80)`} />

      <DataTable
        caption={'df.query(\'city == "Moscow"\') — выбранные строки'}
        headers={['', 'name', 'age', 'score', 'city']}
        rows={[
          [0, 'Alice', 24, 88.5, 'Moscow'],
          [2, 'Carol', 22, 75.5, 'Moscow'],
        ]}
        highlightRows={[0, 1]}
      />

      {/* ─── 8. Пропущенные значения ─── */}
      <SectionTitle id="missing">8. Пропущенные значения (NaN)</SectionTitle>
      <P>В реальных данных пропуски встречаются почти всегда. Pandas использует <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>NaN</code> (Not a Number) из NumPy для числовых столбцов и <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>None</code> / <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>pd.NA</code> для остальных.</P>
      <Code code={`# Обнаружение
df.isnull()             # True где NaN
df.notnull()            # True где НЕ NaN
df.isna().sum()         # кол-во NaN по столбцам
df.isna().sum().sum()   # всего NaN в DataFrame

# Удаление строк/столбцов с NaN
df.dropna()                        # строки с любым NaN
df.dropna(how='all')               # только если ВСЕ NaN
df.dropna(subset=['age', 'score']) # NaN в конкретных столбцах
df.dropna(thresh=3)                # оставить если ≥ 3 non-NaN

# Заполнение
df.fillna(0)                       # заполнить нулём
df.fillna({'age': 0, 'city': 'Unknown'})  # по столбцам
df['score'].fillna(df['score'].mean())     # средним

# Заполнение методами распространения
df.fillna(method='ffill')  # forward fill (предыдущим)
df.fillna(method='bfill')  # backward fill (следующим)
df['score'].interpolate()  # линейная интерполяция

# Замена конкретных значений
df.replace(-1, np.nan)
df.replace({'city': {'Msk': 'Moscow', 'Spb': 'SPb'}})`} />

      <Note>
        <code style={{ fontFamily: 'monospace' }}>dropna()</code> и <code style={{ fontFamily: 'monospace' }}>fillna()</code> по умолчанию возвращают новый DataFrame. Передайте <code style={{ fontFamily: 'monospace' }}>inplace=True</code>, чтобы изменить текущий — но лучше присваивайте результат: <code style={{ fontFamily: 'monospace' }}>df = df.fillna(0)</code>.
      </Note>

      {/* ─── 9. Работа со столбцами ─── */}
      <SectionTitle id="columns">9. Работа со столбцами</SectionTitle>
      <Code code={`# Добавить новый столбец
df['bonus'] = df['score'] * 0.1
df['full_info'] = df['name'] + ', ' + df['city']
df['is_senior'] = df['age'] > 30

# Вставить столбец на конкретную позицию
df.insert(2, 'rank', [4, 3, 1, 2])  # pos, name, values

# Удалить столбцы
df.drop('bonus', axis=1)            # один столбец
df.drop(['bonus', 'rank'], axis=1)  # несколько
del df['bonus']                     # in-place удаление

# Переименовать
df.rename(columns={'name': 'full_name', 'age': 'years'})
df.columns = ['a', 'b', 'c', 'd']  # переименовать все

# Переупорядочить столбцы
df = df[['name', 'score', 'age', 'city']]

# Скопировать столбец
df['score_copy'] = df['score'].copy()

# assign() — цепочки преобразований
df = (df
    .assign(bonus=df['score'] * 0.1)
    .assign(grade=lambda x: x['score'].apply(
        lambda s: 'A' if s >= 90 else 'B'
    ))
)`} />

      {/* ─── 10. Типы данных ─── */}
      <SectionTitle id="types">10. Типы данных</SectionTitle>
      <P>Правильные типы данных экономят память и ускоряют операции.</P>
      <Code code={`# Просмотр типов
df.dtypes

# Приведение типов
df['age'] = df['age'].astype(int)
df['score'] = df['score'].astype(float)
df['name'] = df['name'].astype(str)

# object → category (экономит память при малом числе уникальных значений)
df['city'] = df['city'].astype('category')
df['city'].cat.categories     # список категорий
df['city'].cat.codes          # числовые коды

# Числа в строки и обратно
pd.to_numeric(df['age'], errors='coerce')  # нечисловые → NaN
pd.to_datetime(df['date'], format='%Y-%m-%d')

# Проверка типа
df['age'].dtype          # dtype('int64')
pd.api.types.is_numeric_dtype(df['age'])     # True
pd.api.types.is_string_dtype(df['name'])     # True`} />

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 8, margin: '16px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {['dtype pandas', 'Описание', 'Память / эл-т', 'Когда использовать'].map(h => (
                <th key={h} style={{ padding: '8px 14px', textAlign: 'left', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', fontWeight: 700 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ['int8 / int16 / int32 / int64', 'Целые числа разного размера', '1–8 байт', 'Счётчики, коды, возраст'],
              ['float32 / float64', 'Числа с плавающей точкой', '4–8 байт', 'Цены, проценты'],
              ['bool', 'Логическое значение', '1 байт', 'Флаги, маски'],
              ['object', 'Python-объект (строки)', '~50+ байт', 'Текст (сменить на string/category)'],
              ['string', 'Строки (pd.StringDtype)', '< object', 'Текст с явным NA'],
              ['category', 'Перечисление', 'Очень мало', 'Повторяющиеся строки'],
              ['datetime64[ns]', 'Дата и время', '8 байт', 'Временные ряды'],
            ].map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--accent-lime)', borderBottom: '1px solid var(--border-color)' }}>{row[0]}</td>
                <td style={{ padding: '7px 14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row[1]}</td>
                <td style={{ padding: '7px 14px', fontFamily: 'monospace', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row[2]}</td>
                <td style={{ padding: '7px 14px', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── 11. Сортировка ─── */}
      <SectionTitle id="sorting">11. Сортировка</SectionTitle>
      <Code code={`# Сортировка по значениям столбца
df.sort_values('age')                     # по возрастанию
df.sort_values('age', ascending=False)   # по убыванию

# По нескольким столбцам
df.sort_values(['city', 'score'], ascending=[True, False])

# NaN в конце или начале
df.sort_values('score', na_position='last')   # по умолчанию
df.sort_values('score', na_position='first')

# Сортировка по индексу
df.sort_index()               # по строковому индексу
df.sort_index(ascending=False)

# Топ N значений
df.nlargest(3, 'score')      # 3 строки с наибольшим score
df.nsmallest(2, 'age')       # 2 строки с наименьшим age

# rank() — ранжирование
df['rank'] = df['score'].rank(ascending=False, method='min')`} />

      <DataTable
        caption="df.sort_values('score', ascending=False)"
        headers={['', 'name', 'age', 'score', 'city']}
        rows={[
          [3, 'Dave',  35, 95.0, 'Kazan'],
          [1, 'Bob',   30, 92.0, 'SPb'],
          [0, 'Alice', 24, 88.5, 'Moscow'],
          [2, 'Carol', 22, 75.5, 'Moscow'],
        ]}
        highlightCols={[3]}
      />

      {/* ─── 12. GroupBy ─── */}
      <SectionTitle id="groupby">12. Группировка (groupby)</SectionTitle>
      <P>
        <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>groupby()</code> работает по принципу
        «разбей → примени → собери» (split → apply → combine). Это самая мощная операция в pandas для агрегации.
      </P>
      <Code code={`# Базовая группировка
g = df.groupby('city')

# Одна агрегация
df.groupby('city')['score'].mean()
df.groupby('city')['score'].sum()
df.groupby('city')['age'].max()

# Несколько агрегаций сразу — agg()
df.groupby('city').agg({
    'score': ['mean', 'std', 'count'],
    'age':   ['min', 'max'],
})

# Переименование после agg
df.groupby('city').agg(
    avg_score=('score', 'mean'),
    total=('score', 'count'),
    max_age=('age', 'max'),
)

# Группировка по нескольким столбцам
df.groupby(['city', 'is_senior'])['score'].mean()

# transform() — применить функцию, сохранив индекс
df['city_avg'] = df.groupby('city')['score'].transform('mean')

# filter() — оставить только группы, прошедшие фильтр
df.groupby('city').filter(lambda x: x['score'].mean() > 85)`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, margin: '16px 0' }}>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>df.groupby('city')['score'].mean()</div>
          <DataTable
            headers={['city', 'score']}
            rows={[
              ['Kazan',  95.0],
              ['Moscow', 82.0],
              ['SPb',    92.0],
            ]}
          />
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>После transform — city_avg в каждой строке</div>
          <DataTable
            headers={['name', 'city', 'score', 'city_avg']}
            rows={[
              ['Alice', 'Moscow', 88.5, 82.0],
              ['Bob',   'SPb',    92.0, 92.0],
              ['Carol', 'Moscow', 75.5, 82.0],
              ['Dave',  'Kazan',  95.0, 95.0],
            ]}
            highlightCols={[3]}
          />
        </div>
      </div>

      <SubTitle>Стандартные агрегирующие функции</SubTitle>
      <MethodTable rows={[
        ['mean()',    'Среднее значение',        "g['score'].mean()"],
        ['sum()',     'Сумма',                   "g['score'].sum()"],
        ['count()',   'Количество не-NaN',        "g['score'].count()"],
        ['size()',    'Размер группы (с NaN)',    'g.size()'],
        ['min()',     'Минимум',                  "g['age'].min()"],
        ['max()',     'Максимум',                 "g['age'].max()"],
        ['std()',     'Стандартное отклонение',  "g['score'].std()"],
        ['var()',     'Дисперсия',               "g['score'].var()"],
        ['median()',  'Медиана',                  "g['score'].median()"],
        ['first()',   'Первое значение',           "g['name'].first()"],
        ['last()',    'Последнее значение',        "g['name'].last()"],
        ['nunique()', 'Число уникальных',          "g['city'].nunique()"],
      ]} />

      {/* ─── 13. Apply / Map ─── */}
      <SectionTitle id="apply">13. apply / map / applymap</SectionTitle>
      <Code code={`# map() — для Series (поэлементно)
df['name'].map(str.upper)
df['score'].map(lambda x: 'A' if x >= 90 else 'B')
df['city'].map({'Moscow': 'Мск', 'SPb': 'СПб'})  # через словарь

# apply() для Series — как map, но мощнее
df['score'].apply(lambda x: round(x))

# apply() для DataFrame по строкам (axis=1)
df.apply(lambda row: row['name'] + '_' + row['city'], axis=1)

# apply() для DataFrame по столбцам (axis=0, по умолчанию)
df[['age', 'score']].apply(lambda col: col - col.mean())

# applymap() / map() (pandas 2.1+) — для каждой ячейки DataFrame
df[['age', 'score']].map(lambda x: round(x, 1))

# Практические примеры
df['grade'] = df['score'].apply(
    lambda s: 'A' if s >= 90 else ('B' if s >= 80 else 'C')
)

# Векторизованные операции быстрее apply()
# Плохо:
df['score'].apply(lambda x: x * 2)
# Лучше:
df['score'] * 2`} />

      <Warning>
        <code style={{ fontFamily: 'monospace' }}>apply()</code> — это Python-цикл. Если есть векторизованный аналог (арифметика, <code style={{ fontFamily: 'monospace' }}>str.</code>, <code style={{ fontFamily: 'monospace' }}>dt.</code>, numpy-функции), используйте его — он в 10–100 раз быстрее.
      </Warning>

      {/* ─── 14. Объединение ─── */}
      <SectionTitle id="merge">14. Объединение данных</SectionTitle>

      <SubTitle>pd.concat() — склеить по оси</SubTitle>
      <Code code={`# Вертикально (добавить строки)
df_all = pd.concat([df1, df2], ignore_index=True)
df_all = pd.concat([df1, df2], ignore_index=True, sort=False)

# Горизонтально (добавить столбцы)
df_wide = pd.concat([df1, df2], axis=1)

# Несколько датафреймов
pd.concat([df1, df2, df3], ignore_index=True)`} />

      <SubTitle>pd.merge() — JOIN по ключу</SubTitle>
      <Code code={`# INNER JOIN (пересечение)
result = pd.merge(df_left, df_right, on='id')

# LEFT JOIN
result = pd.merge(df_left, df_right, on='id', how='left')

# RIGHT JOIN
result = pd.merge(df_left, df_right, on='id', how='right')

# OUTER JOIN (объединение)
result = pd.merge(df_left, df_right, on='id', how='outer')

# Ключи называются по-разному
pd.merge(df1, df2, left_on='user_id', right_on='id')

# По нескольким ключам
pd.merge(df1, df2, on=['city', 'date'])

# Указатели на совпадающие столбцы (не ключи)
pd.merge(df1, df2, on='id', suffixes=('_left', '_right'))`} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, margin: '16px 0' }}>
        {[
          { label: 'LEFT', color: 'rgba(200,255,0,0.15)', desc: 'Все строки левого + совпадения правого' },
          { label: 'INNER', color: 'rgba(100,200,255,0.12)', desc: 'Только строки с совпадением в обоих' },
          { label: 'RIGHT', color: 'rgba(255,100,100,0.12)', desc: 'Все строки правого + совпадения левого' },
          { label: 'OUTER', color: 'rgba(200,100,255,0.12)', desc: 'Все строки обоих, NaN где нет совпадения' },
        ].map(({ label, color, desc }) => (
          <div key={label} style={{ background: color, border: '1px solid var(--border-color)', borderRadius: 8, padding: 14, textAlign: 'center' }}>
            <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>how='{label.toLowerCase()}'</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{desc}</div>
          </div>
        ))}
      </div>

      <SubTitle>df.join() — объединить по индексу</SubTitle>
      <Code code={`# join по умолчанию использует индексы
df1.join(df2, how='left')
df1.join(df2, on='city')  # из df1 использовать столбец city`} />

      {/* ─── 15. Строки ─── */}
      <SectionTitle id="strings">15. Работа со строками (str accessor)</SectionTitle>
      <P>Все строковые операции доступны через атрибут <code style={{ fontFamily: 'monospace', color: 'var(--accent-lime)' }}>.str</code> — они векторизованы и корректно обрабатывают NaN.</P>
      <Code code={`s = df['name']

s.str.upper()            # ALICE, BOB, …
s.str.lower()            # alice, bob, …
s.str.title()            # Alice, Bob, …
s.str.strip()            # убрать пробелы по краям
s.str.lstrip('A')        # убрать символ слева
s.str.replace('o', '0')  # замена
s.str.replace(r'\d', '', regex=True)  # regex

s.str.len()              # длина строки
s.str.contains('li')     # bool Series
s.str.startswith('A')    # bool Series
s.str.endswith('e')      # bool Series
s.str.count('l')         # кол-во вхождений

s.str.split(',')         # разбить → списки
s.str.split(',', expand=True)  # → DataFrame
s.str.join(', ')         # склеить элементы списков
s.str.get(0)             # первый элемент (если список)

s.str[0]                 # первый символ каждой строки
s.str[1:3]               # срез символов

s.str.extract(r'(\w+)_(\d+)')  # regex группы → DataFrame
s.str.findall(r'\d+')           # все совпадения → списки

s.str.pad(10, fillchar='*')     # дополнить до длины
s.str.zfill(5)                  # дополнить нулями слева`} />

      {/* ─── 16. Даты ─── */}
      <SectionTitle id="datetime">16. Даты и время</SectionTitle>
      <Code code={`# Создание дат
dates = pd.to_datetime(['2024-01-15', '2024-03-22'])
df['date'] = pd.to_datetime(df['date_str'], format='%d.%m.%Y')

# Генерация дат
pd.date_range('2024-01-01', periods=12, freq='M')  # 12 месяцев
pd.date_range('2024-01-01', '2024-12-31', freq='D')  # каждый день
pd.date_range('2024-01-01', periods=5, freq='B')   # рабочие дни`} />

      <Code code={`# Атрибуты через .dt accessor
df['date'].dt.year
df['date'].dt.month
df['date'].dt.day
df['date'].dt.hour
df['date'].dt.minute
df['date'].dt.second
df['date'].dt.dayofweek    # 0=Пн, 6=Вс
df['date'].dt.day_name()   # 'Monday', …
df['date'].dt.month_name() # 'January', …
df['date'].dt.quarter      # 1–4
df['date'].dt.is_month_end # bool
df['date'].dt.weekday      # alias для dayofweek

# Арифметика с датами
df['date'] + pd.Timedelta(days=7)
(df['end_date'] - df['start_date']).dt.days

# Временные ряды — resample()
# Нужен DatetimeIndex
df = df.set_index('date')
df['revenue'].resample('M').sum()    # по месяцам
df['revenue'].resample('Q').mean()   # по кварталам
df['revenue'].resample('D').ffill()  # заполнить по дням

# Сдвиг
df['score'].shift(1)   # сдвиг на 1 вперёд (предыдущее значение)
df['score'].shift(-1)  # сдвиг на 1 назад (следующее значение)
df['score'].diff()     # разница с предыдущей строкой`} />

      {/* ─── 17. Pivot ─── */}
      <SectionTitle id="pivot">17. Pivot tables</SectionTitle>
      <Code code={`# pivot_table — сводная таблица
pt = df.pivot_table(
    values='score',
    index='city',
    columns='grade',     # если есть столбец 'grade'
    aggfunc='mean',      # 'sum', 'count', np.mean и т.д.
    fill_value=0,        # вместо NaN
    margins=True,        # добавить итоги (All)
)

# pivot — без агрегации (уникальные комбинации)
df.pivot(index='name', columns='subject', values='score')

# crosstab — частоты / кросстаб
pd.crosstab(df['city'], df['grade'])
pd.crosstab(df['city'], df['grade'], normalize='index')  # доли

# stack / unstack — трансформация индексов
df.stack()    # столбцы → уровень индекса
df.unstack()  # уровень индекса → столбцы

# melt — wide → long
df_long = df.melt(
    id_vars=['name', 'city'],
    value_vars=['score', 'age'],
    var_name='metric',
    value_name='value',
)`} />

      <DataTable
        caption="Пример pivot_table: средний score по city × grade"
        headers={['city', 'A', 'B', 'C', 'All']}
        rows={[
          ['Kazan',  95.0, '—', '—',  95.0],
          ['Moscow', '—',  88.5, 75.5, 82.0],
          ['SPb',    92.0, '—', '—',  92.0],
          ['All',    93.5, 88.5, 75.5, 87.75],
        ]}
        highlightRows={[3]}
      />

      {/* ─── 18. Оконные функции ─── */}
      <SectionTitle id="window">18. Оконные функции</SectionTitle>
      <Code code={`# rolling() — скользящее окно
df['score'].rolling(window=3).mean()   # скользящее среднее
df['score'].rolling(window=3).sum()
df['score'].rolling(window=3).std()
df['score'].rolling(window=3, min_periods=1).mean()  # неполные окна

# expanding() — расширяющееся окно (нарастающий итог)
df['score'].expanding().mean()
df['score'].expanding().sum()
df['score'].expanding().max()

# ewm() — экспоненциальное скользящее среднее
df['score'].ewm(span=3).mean()

# Пример: скользящее среднее продаж за 7 дней
df = df.set_index('date')
df['revenue_7d'] = df['revenue'].rolling('7D').mean()

# cumsum, cumprod, cummax, cummin
df['score'].cumsum()   # нарастающая сумма
df['score'].cummax()   # нарастающий максимум`} />

      <DataTable
        caption="rolling(window=3).mean() — скользящее среднее"
        headers={['день', 'score', 'rolling_mean_3']}
        rows={[
          [1, 80, 'NaN'],
          [2, 85, 'NaN'],
          [3, 90, '85.0'],
          [4, 70, '81.7'],
          [5, 95, '85.0'],
        ]}
        highlightCols={[2]}
      />

      {/* ─── 19. Производительность ─── */}
      <SectionTitle id="performance">19. Производительность</SectionTitle>

      <Ul items={[
        'Используйте vectorized-операции вместо циклов и apply()',
        'Задавайте типы данных явно: int32 вместо int64, category вместо object',
        'Читайте только нужные столбцы: usecols=[…] в read_csv()',
        'Используйте Parquet или Feather вместо CSV для больших файлов',
        'query() и eval() компилируются в нативный код и работают быстрее',
        'При работе с большими данными рассмотрите Polars или Dask',
      ]} />

      <Code code={`# eval() — быстрые арифметические операции
df.eval('profit = revenue - cost')
df.eval('profit = revenue - cost', inplace=True)

# Сравнение производительности
# Медленно (Python-цикл):
result = [x * 2 for x in df['score']]

# Быстро (векторизация):
result = df['score'] * 2

# Быстро (apply только когда нет вектора):
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')

# Ещё быстрее:
df['grade'] = 'B'
df.loc[df['score'] >= 90, 'grade'] = 'A'

# Оценка памяти
df.memory_usage(deep=True).sum() / 1024**2  # МБ

# Оптимизация типов
def optimize_dtypes(df):
    for col in df.select_dtypes('object').columns:
        if df[col].nunique() / len(df) < 0.5:
            df[col] = df[col].astype('category')
    for col in df.select_dtypes('int64').columns:
        df[col] = pd.to_numeric(df[col], downcast='integer')
    return df`} />

      {/* ─── 20. Шпаргалка ─── */}
      <SectionTitle id="cheatsheet">20. Шпаргалка всех методов</SectionTitle>

      <SubTitle>Создание</SubTitle>
      <MethodTable rows={[
        ['pd.Series(data)',         'Создать Series',                    'pd.Series([1,2,3])'],
        ['pd.DataFrame(data)',      'Создать DataFrame',                 'pd.DataFrame({…})'],
        ['pd.read_csv(path)',       'Прочитать CSV',                     "pd.read_csv('f.csv')"],
        ['pd.read_excel(path)',     'Прочитать Excel',                   "pd.read_excel('f.xlsx')"],
        ['pd.read_parquet(path)',   'Прочитать Parquet',                 "pd.read_parquet('f.pq')"],
        ['pd.date_range(…)',        'Диапазон дат',                      "pd.date_range('2024', periods=5)"],
        ['pd.concat([df1,df2])',    'Склеить DataFrameы',                'pd.concat([df1,df2])'],
        ['pd.merge(df1,df2,on=…)', 'Объединить по ключу',               "pd.merge(a,b,on='id')"],
      ]} />

      <SubTitle>Просмотр</SubTitle>
      <MethodTable rows={[
        ['df.head(n)',      'Первые n строк',          'df.head(10)'],
        ['df.tail(n)',      'Последние n строк',        'df.tail(5)'],
        ['df.sample(n)',    'Случайные n строк',        'df.sample(3)'],
        ['df.info()',       'Типы и null-значения',     'df.info()'],
        ['df.describe()',   'Статистика столбцов',      'df.describe()'],
        ['df.shape',        'Размер (строки, столбцы)', 'df.shape'],
        ['df.dtypes',       'Типы данных столбцов',     'df.dtypes'],
        ['df.value_counts()','Частоты значений',         "df['city'].value_counts()"],
      ]} />

      <SubTitle>Выборка и фильтрация</SubTitle>
      <MethodTable rows={[
        ['df.loc[…]',       'Выборка по меткам',            "df.loc[0, 'name']"],
        ['df.iloc[…]',      'Выборка по позиции',           'df.iloc[0, 1]'],
        ['df.query(expr)',  'Фильтр через строку',          "df.query('age > 25')"],
        ['df.isin(vals)',   'Проверка вхождения',            "df['city'].isin(['Msk'])"],
        ['df.between(a,b)', 'Проверка диапазона',           "df['age'].between(20,30)"],
        ['df.duplicated()', 'Найти дубликаты',              'df.duplicated()'],
        ['df.drop_duplicates()', 'Удалить дубликаты',       'df.drop_duplicates()'],
      ]} />

      <SubTitle>Преобразование</SubTitle>
      <MethodTable rows={[
        ['df.sort_values(by)',    'Сортировать по столбцу',  "df.sort_values('age')"],
        ['df.rename(columns=…)', 'Переименовать столбцы',   "df.rename(columns={'a':'b'})"],
        ['df.drop(cols, axis=1)','Удалить столбцы',          "df.drop('col', axis=1)"],
        ['df.astype(dtype)',     'Привести тип',             "df['age'].astype(int)"],
        ['df.apply(func)',       'Применить функцию',        'df.apply(lambda r: …, axis=1)'],
        ['df.map(func)',         'Поэлементно для Series',   "s.map(str.upper)"],
        ['df.assign(**cols)',    'Добавить столбцы',         'df.assign(bonus=df.score*0.1)'],
        ['df.pipe(func)',        'Цепочка функций',          'df.pipe(clean).pipe(transform)'],
      ]} />

      <SubTitle>Пропущенные значения</SubTitle>
      <MethodTable rows={[
        ['df.isna() / isnull()', 'Маска пропущенных',       'df.isna().sum()'],
        ['df.dropna()',          'Удалить строки с NaN',     "df.dropna(subset=['age'])"],
        ['df.fillna(val)',       'Заполнить NaN',            'df.fillna(0)'],
        ['df.interpolate()',     'Линейная интерполяция',    "df['x'].interpolate()"],
        ['df.replace(old,new)',  'Заменить значения',        'df.replace(-1, np.nan)'],
      ]} />

      <SubTitle>Агрегация</SubTitle>
      <MethodTable rows={[
        ['df.groupby(col)',      'Группировка',              "df.groupby('city')"],
        ['g.agg({col: funcs})', 'Несколько агрегаций',      "g.agg({'score': 'mean'})"],
        ['g.transform(func)',   'Сохранить форму df',        "g['score'].transform('mean')"],
        ['df.pivot_table(…)',   'Сводная таблица',           "df.pivot_table(values='s',…)"],
        ['df.melt(…)',          'Wide → Long',               "df.melt(id_vars=['name'])"],
        ['df.crosstab(…)',      'Таблица частот',            'pd.crosstab(df.a, df.b)'],
      ]} />

      {/* Финальный блок */}
      <div style={{
        background: 'var(--bg-secondary)', border: '1px solid rgba(200,255,0,0.15)',
        borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', margin: '40px 0 20px',
        textAlign: 'center',
      }}>
        <div style={{ color: 'var(--accent-lime)', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
          Официальная документация
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: 13, marginBottom: 12 }}>
          pandas.pydata.org — User Guide, API Reference и примеры от разработчиков
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'pandas.pydata.org/docs/',
            'pandas.pydata.org/cheat_sheet.pdf',
          ].map(url => (
            <code key={url} style={{
              fontFamily: 'monospace', fontSize: 12,
              background: 'var(--bg-tertiary)', padding: '4px 10px',
              borderRadius: 4, color: 'var(--text-secondary)',
            }}>{url}</code>
          ))}
        </div>
      </div>

    </div>
  )
}
