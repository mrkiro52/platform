import { TheoryTable, TheoryCode, TheoryExample, DbTable } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', green: '#4ade80', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
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

export default function July5PandasTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">NumPy p.2 и Pandas</h1>
        <p className="theory-subtitle">Треки: Аналитика данных и Machine Learning</p>
        <p className="theory-date">5 июля 2026</p>
        <p>
          В прошлый раз мы разобрали основы NumPy: массивы, форму, индексацию, broadcasting и агрегации. Сегодня
          доизучим NumPy — <strong>копии и представления, объединение массивов, сортировку, np.where, работу с
          пропусками</strong> — а затем перейдём к главному инструменту аналитика: библиотеке{' '}
          <strong>pandas</strong>. Если NumPy — это про «числа в массивах», то pandas — про{' '}
          <strong>реальные табличные данные</strong> с колонками, названиями и пропусками, как в Excel, только
          программно и в тысячи раз мощнее.
        </p>
      </section>

      {/* ===== ЧАСТЬ 1: NumPy продолжение ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Часть 1. Доизучаем NumPy</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Быстрое напоминание: <code>import numpy as np</code>. Теперь темы, до которых мы не дошли.
        </p>
      </section>

      {/* Копии и представления */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Копии и представления (view vs copy)</h2>
        <p>
          Важнейший нюанс NumPy: срез массива — это <strong>не копия</strong>, а «окно» (view) в тот же кусок
          памяти. Изменишь срез — изменится и исходный массив. Это сделано ради скорости, но новичков часто ловит.
        </p>
        <TheoryCode language="python" code={`a = np.array([1, 2, 3, 4, 5])
part = a[1:4]        # view — то же хранилище
part[0] = 99
print(a)             # [ 1 99  3  4  5]  ← изменился ИСХОДНЫЙ массив!

# Чтобы получить независимую копию — .copy()
b = a[1:4].copy()
b[0] = 0
print(a)             # a не тронут`} />
        <TheoryExample title="Правило">
          Если нужно менять фрагмент, не задев оригинал, — всегда делай <code>.copy()</code>. Если, наоборот,
          хочешь эффективно работать с частью большого массива — используй view (по умолчанию).
        </TheoryExample>
      </section>

      {/* np.where */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. np.where — условный выбор</h2>
        <p>
          <code>np.where(условие, x, y)</code> — векторизованный аналог <code>if/else</code>: для каждого элемента
          берёт значение из <code>x</code>, если условие истинно, иначе из <code>y</code>. Незаменим при
          подготовке данных.
        </p>
        <TheoryCode language="python" code={`a = np.array([12, 5, 8, 20, 3])

# Заменить: >= 10 → "много", иначе → "мало"
np.where(a >= 10, 'много', 'мало')
# array(['много', 'мало', 'мало', 'много', 'мало'])

# Обнулить все отрицательные (частый приём в ML — функция ReLU)
x = np.array([-2, 3, -5, 7])
np.where(x < 0, 0, x)        # [0 3 0 7]

# Просто найти ИНДЕКСЫ подходящих элементов
np.where(a >= 10)            # (array([0, 3]),)`} />
      </section>

      {/* Объединение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Объединение и разбиение массивов</h2>
        <TheoryCode language="python" code={`a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.concatenate([a, b])   # [1 2 3 4 5 6]
np.vstack([a, b])        # вертикально (в строки):  [[1 2 3], [4 5 6]]
np.hstack([a, b])        # горизонтально:           [1 2 3 4 5 6]

m = np.array([[1, 2, 3, 4]])
np.split(m[0], 2)        # разбить пополам: [array([1,2]), array([3,4])]`} />
        <TheoryTable
          headers={['Функция', 'Что делает']}
          rows={[
            ['np.concatenate', 'склеить массивы вдоль указанной оси'],
            ['np.vstack', 'сложить «стопкой» — добавить строки'],
            ['np.hstack', 'соединить в ряд — добавить столбцы/элементы'],
            ['np.split', 'разбить массив на несколько частей'],
          ]}
        />
      </section>

      {/* Сортировка */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Сортировка и уникальные значения</h2>
        <TheoryCode language="python" code={`a = np.array([30, 10, 20])

np.sort(a)         # [10 20 30] — отсортированная КОПИЯ
np.argsort(a)      # [1 2 0] — ИНДЕКСЫ в порядке сортировки

# argsort — ключ к сортировке связанных данных
names = np.array(['Аня', 'Боб', 'Вера'])
ages  = np.array([30, 10, 20])
order = np.argsort(ages)
names[order]       # ['Боб' 'Вера' 'Аня'] — имена по возрасту

# Уникальные значения и их подсчёт
vals = np.array([1, 2, 2, 3, 3, 3])
np.unique(vals)                       # [1 2 3]
np.unique(vals, return_counts=True)   # ([1,2,3], [1,2,3]) — значения и сколько раз`} />
      </section>

      {/* NaN */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Пропущенные значения (NaN)</h2>
        <Term name="np.nan (Not a Number)">
          специальное значение «нет данных». В реальных датасетах пропуски встречаются постоянно, и с ними надо
          уметь работать: обычные суммы/средние «ломаются» об NaN.
        </Term>
        <TheoryCode language="python" code={`a = np.array([1, 2, np.nan, 4])

a.sum()          # nan  — обычная сумма «портится»
a.mean()         # nan

np.nansum(a)     # 7.0  — версии функций, игнорирующие NaN
np.nanmean(a)    # 2.333...

np.isnan(a)      # [False False True False] — маска пропусков
a[~np.isnan(a)]  # [1. 2. 4.] — оставить только заполненные`} />
      </section>

      {/* ===== ЧАСТЬ 2: Pandas ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Часть 2. Знакомство с Pandas</h2>
        <Term name="pandas">
          библиотека для работы с <strong>табличными данными</strong>, построенная поверх NumPy. Даёт две
          структуры: <strong>Series</strong> (одна колонка) и <strong>DataFrame</strong> (целая таблица с
          именованными колонками и индексом). Это главный инструмент любого аналитика данных.
        </Term>
        <TheoryCode language="bash" code={`pip install pandas`} />
        <TheoryCode language="python" code={`import pandas as pd   # общепринятое сокращение`} />
      </section>

      {/* Series и DataFrame */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Series и DataFrame</h2>
        <Term name="Series">
          одномерный маркированный массив: значения + <strong>индекс</strong> (метки). Похож на колонку таблицы
          или на словарь, но с возможностями NumPy.
        </Term>
        <Term name="DataFrame">
          двумерная таблица: набор Series-колонок с общим индексом строк. Именно с DataFrame аналитик проводит
          большую часть времени.
        </Term>
        <TheoryCode language="python" code={`# Series
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
s['b']        # 20

# DataFrame из словаря: ключ → имя колонки, список → значения
df = pd.DataFrame({
    'name':  ['Аня', 'Боб', 'Вера', 'Гена'],
    'age':   [25, 30, 22, 40],
    'city':  ['Москва', 'Казань', 'Москва', 'Сочи'],
    'salary':[80000, 95000, 70000, 120000],
})
print(df)`} />
        <DbTable
          name="df"
          columns={['', 'name', 'age', 'city', 'salary']}
          rows={[
            ['0', 'Аня', '25', 'Москва', '80000'],
            ['1', 'Боб', '30', 'Казань', '95000'],
            ['2', 'Вера', '22', 'Москва', '70000'],
            ['3', 'Гена', '40', 'Сочи', '120000'],
          ]}
          highlightCols={[0]}
          caption="DataFrame: слева — индекс строк (0,1,2,3), сверху — имена колонок. Каждая колонка — это Series"
        />
      </section>

      {/* Чтение и обзор */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Чтение данных и первый обзор</h2>
        <p>
          Обычно данные грузят из файла (CSV — самый частый формат), а потом сразу осматривают.
        </p>
        <TheoryCode language="python" code={`df = pd.read_csv('data.csv')    # загрузить таблицу из файла
# df.to_csv('out.csv')          # и сохранить обратно

df.head()        # первые 5 строк (осмотреться)
df.tail(3)       # последние 3 строки
df.shape         # (кол-во строк, кол-во колонок)
df.columns       # список названий колонок
df.info()        # типы колонок и сколько непустых значений
df.describe()    # статистика по числовым колонкам: mean, min, max...`} />
        <TheoryExample title="describe() — быстрый портрет данных">
          Одна команда выдаёт по каждой числовой колонке количество, среднее, стандартное отклонение, минимум,
          максимум и квартили. С неё почти всегда начинается анализ нового датасета.
        </TheoryExample>
      </section>

      {/* Выбор данных */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Выбор колонок, строк и фильтрация</h2>
        <TheoryCode language="python" code={`# Колонки
df['age']                    # одна колонка (Series)
df[['name', 'salary']]       # несколько колонок (DataFrame)

# Строки по МЕТКЕ (loc) и по НОМЕРУ (iloc)
df.loc[0]                    # строка с индексом 0
df.iloc[0]                   # первая строка по позиции
df.loc[0, 'name']            # значение в ячейке: 'Аня'
df.iloc[0:2]                 # первые две строки

# Фильтрация по условию (булева индексация, как в NumPy)
df[df['age'] > 25]                          # кто старше 25
df[df['city'] == 'Москва']                  # только москвичи
df[(df['age'] > 25) & (df['salary'] > 90000)]  # два условия: & и |`} />
        <Term name="loc и iloc">
          <code>loc</code> обращается по <strong>меткам</strong> (имена индекса и колонок), <code>iloc</code> — по{' '}
          <strong>числовым позициям</strong>. Это две главные точки доступа к данным в pandas.
        </Term>
      </section>

      {/* Новые колонки и пропуски */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Новые колонки и работа с пропусками</h2>
        <TheoryCode language="python" code={`# Создать колонку на основе других (векторизованно, без циклов)
df['salary_k'] = df['salary'] / 1000
df['is_senior'] = df['age'] >= 30

# Пропуски (NaN) в реальных данных
df.isna().sum()              # сколько пропусков в каждой колонке
df.dropna()                  # удалить строки с пропусками
df.fillna(0)                 # заполнить пропуски значением
df['age'].fillna(df['age'].mean())  # заполнить средним по колонке`} />
      </section>

      {/* Группировка и сортировка */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Группировка и сортировка</h2>
        <p>
          <strong>groupby</strong> — сердце аналитики: «разбей данные на группы и посчитай агрегат по каждой».
          Работает по принципу <em>split → apply → combine</em>: разбить по значению колонки, применить функцию,
          собрать результат.
        </p>
        <TheoryCode language="python" code={`# Средняя зарплата по каждому городу
df.groupby('city')['salary'].mean()
# city
# Казань     95000
# Москва     75000
# Сочи      120000

# Несколько агрегатов сразу
df.groupby('city')['salary'].agg(['mean', 'count', 'max'])

# Сортировка
df.sort_values('salary', ascending=False)   # по убыванию зарплаты
df.sort_values(['city', 'age'])             # по городу, затем по возрасту`} />
        <Fig caption="groupby: строки разбиваются на группы по значению колонки city, затем к каждой группе применяется агрегат (здесь — среднее по salary)">
          <svg viewBox="0 0 600 200" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            <text x="80" y="24" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">исходная таблица</text>
            {['Москва','Казань','Москва','Сочи'].map((c,i)=>(
              <rect key={i} x="30" y={36+i*30} width="110" height="24" rx="4"
                fill={c==='Москва'?'rgba(200,255,0,0.12)':c==='Казань'?'rgba(96,165,250,0.12)':'rgba(248,113,113,0.12)'} stroke={C.border} />
            ))}
            {['Москва','Казань','Москва','Сочи'].map((c,i)=>(
              <text key={i} x="85" y={52+i*30} fill={C.sub} fontSize="11" textAnchor="middle">{c}</text>
            ))}
            <line x1="150" y1="95" x2="210" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#pg)" />
            <text x="180" y="86" fill={C.sub} fontSize="9" textAnchor="middle">group</text>
            {/* groups */}
            <rect x="225" y="30" width="130" height="46" rx="6" fill="rgba(200,255,0,0.10)" stroke={C.lime} />
            <text x="290" y="49" fill={C.lime} fontSize="11" textAnchor="middle">Москва</text>
            <text x="290" y="66" fill={C.sub} fontSize="10" textAnchor="middle">2 строки</text>
            <rect x="225" y="84" width="130" height="34" rx="6" fill="rgba(96,165,250,0.10)" stroke="#60a5fa" />
            <text x="290" y="105" fill="#60a5fa" fontSize="11" textAnchor="middle">Казань · 1</text>
            <rect x="225" y="126" width="130" height="34" rx="6" fill="rgba(248,113,113,0.10)" stroke="#f87171" />
            <text x="290" y="147" fill="#f87171" fontSize="11" textAnchor="middle">Сочи · 1</text>
            <line x1="360" y1="95" x2="420" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#pg)" />
            <text x="390" y="86" fill={C.sub} fontSize="9" textAnchor="middle">mean</text>
            {/* result */}
            <rect x="435" y="55" width="140" height="80" rx="6" fill="#17171f" stroke={C.lime} />
            <text x="505" y="78" fill={C.text} fontSize="10" textAnchor="middle">Москва → 75000</text>
            <text x="505" y="98" fill={C.text} fontSize="10" textAnchor="middle">Казань → 95000</text>
            <text x="505" y="118" fill={C.text} fontSize="10" textAnchor="middle">Сочи → 120000</text>
            <defs>
              <marker id="pg" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* NumPy <-> Pandas */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Связка NumPy ↔ Pandas на практике</h2>
        <p>
          Типичный путь аналитика: загрузить и почистить данные в <strong>pandas</strong>, а для обучения модели
          отдать чистый числовой массив в <strong>NumPy</strong>. Переход в обе стороны — одна команда.
        </p>
        <TheoryCode language="python" code={`arr = df[['age', 'salary']].to_numpy()   # DataFrame → ndarray (для ML)
back = pd.DataFrame(arr, columns=['age', 'salary'])  # ndarray → DataFrame

# Многие NumPy-функции работают и на колонках pandas напрямую
np.log(df['salary'])       # логарифм зарплаты (частый приём в аналитике)`} />
        <TheoryTable
          headers={['', 'NumPy', 'pandas']}
          rows={[
            ['Структура', 'ndarray — числа', 'DataFrame — таблица'],
            ['Колонки', 'без имён, один тип', 'именованные, разные типы'],
            ['Пропуски', 'вручную (np.nan)', 'встроенная поддержка (isna, fillna)'],
            ['Когда', 'вычисления, ML', 'загрузка, чистка, анализ'],
          ]}
        />
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          Мы дозакрыли NumPy: <strong>view vs copy</strong> (срез — это окно в память, для независимости нужен{' '}
          <code>.copy()</code>), <code>np.where</code> для условного выбора, объединение/сортировку массивов и
          работу с пропусками через <code>np.nan*</code>. И освоили основы <strong>pandas</strong>:{' '}
          <strong>Series</strong> и <strong>DataFrame</strong>, чтение CSV, обзор через <code>head/info/describe</code>,
          выбор данных через <code>loc/iloc</code> и фильтры, создание колонок, обработку пропусков и{' '}
          <strong>groupby</strong> для агрегаций. Это базовый набор, с которым уже можно анализировать реальные
          датасеты и готовить данные для машинного обучения.
        </p>
      </section>
    </div>
  )
}
