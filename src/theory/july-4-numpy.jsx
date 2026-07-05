import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

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

export default function July4NumpyTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Библиотека NumPy</h1>
        <p className="theory-subtitle">Треки: Аналитика данных и Machine Learning</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          <strong>NumPy</strong> (Numerical Python) — фундаментальная библиотека для численных вычислений в
          Python. Практически весь стек анализа данных и машинного обучения — pandas, scikit-learn, TensorFlow,
          matplotlib — построен поверх NumPy. Главное, что она даёт: тип данных <code>ndarray</code>
          (N-мерный массив) и <strong>векторизованные</strong> операции над ним, которые работают в десятки и
          сотни раз быстрее обычных циклов Python. Сегодня разберём NumPy от «зачем он нужен» до линейной алгебры.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">🎥 Видео-лекция: NumPy</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/day4numpy.mov" />
      </section>

      {/* Установка и импорт */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Установка и импорт</h2>
        <TheoryCode language="bash" code={`pip install numpy`} />
        <TheoryCode language="python" code={`import numpy as np   # общепринятое сокращение, пиши всегда так`} />
      </section>

      {/* Зачем NumPy */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Зачем NumPy, если есть списки</h2>
        <p>
          Обычный список Python универсален, но для вычислений медленный. Причины: элементы могут быть разных
          типов, каждый — отдельный объект в памяти, а операции выполняются поэлементно через интерпретатор.
          Массив NumPy хранит данные <strong>одного типа</strong> подряд в памяти (как в языке C) и обрабатывает
          их скомпилированным кодом сразу целиком.
        </p>
        <TheoryCode language="python" code={`# Список Python — сложение поэлементно нужно писать циклом
a = [1, 2, 3]
b = [4, 5, 6]
c = [a[i] + b[i] for i in range(len(a))]   # [5, 7, 9]

# NumPy — та же операция без цикла и в разы быстрее
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = a + b                                    # array([5, 7, 9])`} />
        <Fig caption="Список хранит ссылки на разбросанные по памяти объекты; ndarray — непрерывный блок чисел одного типа, что и даёт скорость">
          <svg viewBox="0 0 600 150" width="100%" style={{ maxWidth: 600 }} xmlns="http://www.w3.org/2000/svg">
            <text x="150" y="20" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Список Python</text>
            {[0,1,2].map(i=>(
              <g key={i}>
                <rect x={60+i*70} y="35" width="50" height="26" rx="4" fill="#242b3a" stroke={C.border} />
                <text x={85+i*70} y="52" fill={C.sub} fontSize="10" textAnchor="middle">ссылка</text>
                <line x1={85+i*70} y1="61" x2={85+i*70} y2="88" stroke={C.sub} strokeWidth="1" strokeDasharray="3 2" />
                <rect x={60+i*70} y="90" width="50" height="26" rx="4" fill="rgba(129,140,248,0.15)" stroke="#818cf8" />
                <text x={85+i*70} y="107" fill={C.text} fontSize="11" textAnchor="middle">{i+1}</text>
              </g>
            ))}
            <text x="450" y="20" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">ndarray</text>
            {[0,1,2,3].map(i=>(
              <g key={i}>
                <rect x={350+i*55} y="60" width="53" height="30" rx="0" fill="rgba(200,255,0,0.12)" stroke={C.lime} />
                <text x={376+i*55} y="80" fill={C.text} fontSize="12" textAnchor="middle">{i+1}</text>
              </g>
            ))}
            <text x="450" y="115" fill={C.sub} fontSize="10" textAnchor="middle">непрерывный блок памяти, один тип</text>
          </svg>
        </Fig>
        <TheoryExample title="Насколько быстрее">
          На массиве из миллиона чисел сложение через NumPy выполняется в 50-100 раз быстрее, чем цикл по списку.
          Плюс код короче и читается как математическая формула. Именно поэтому весь ML построен на NumPy.
        </TheoryExample>
      </section>

      {/* Создание массивов */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Создание массивов</h2>
        <TheoryCode language="python" code={`np.array([1, 2, 3])          # из списка: array([1, 2, 3])
np.array([[1, 2], [3, 4]])   # двумерный (матрица 2x2)

np.zeros(5)                  # [0. 0. 0. 0. 0.]  — нули
np.ones((2, 3))              # матрица 2x3 из единиц
np.full((2, 2), 7)           # матрица 2x2, заполненная числом 7
np.eye(3)                    # единичная матрица 3x3 (1 на диагонали)

np.arange(0, 10, 2)          # [0 2 4 6 8]  — как range(), но массив
np.linspace(0, 1, 5)         # [0. 0.25 0.5 0.75 1.] — 5 точек от 0 до 1

np.random.rand(3)            # 3 случайных float от 0 до 1
np.random.randint(0, 10, 5)  # 5 случайных int от 0 до 9`} />
        <TheoryTable
          headers={['Функция', 'Когда пригодится']}
          rows={[
            ['np.zeros / np.ones', 'заготовка массива нужной формы под заполнение'],
            ['np.arange', 'последовательность чисел с шагом'],
            ['np.linspace', 'равномерная сетка точек (для графиков, интегралов)'],
            ['np.random.*', 'генерация данных для экспериментов и инициализации весов'],
          ]}
        />
      </section>

      {/* Форма */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Форма, оси и типы данных</h2>
        <Term name="Ось (axis) и размерность (ndim)">
          массив может быть одномерным (вектор), двумерным (матрица) или N-мерным (тензор). Каждое измерение —
          это ось. У матрицы ось 0 идёт по строкам (вниз), ось 1 — по столбцам (вправо).
        </Term>
        <TheoryCode language="python" code={`a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape   # (2, 3) — 2 строки, 3 столбца
a.ndim    # 2 — два измерения (матрица)
a.size    # 6 — всего элементов
a.dtype   # int64 — тип ВСЕХ элементов (в ndarray он один!)

a.reshape(3, 2)  # переформатировать в 3 строки, 2 столбца (данные те же)
a.reshape(-1)    # "вытянуть" в одномерный; -1 = "посчитай сам"`} />
        <Fig caption="Оси матрицы: axis=0 направлена вниз (по строкам), axis=1 — вправо (по столбцам). Это ключ к параметру axis в агрегациях">
          <svg viewBox="0 0 520 200" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            {[[1,2,3],[4,5,6]].map((row,r)=>row.map((v,c)=>(
              <g key={`${r}-${c}`}>
                <rect x={140+c*70} y={40+r*55} width="60" height="48" rx="5" fill="rgba(200,255,0,0.1)" stroke={C.border} />
                <text x={170+c*70} y={69+r*55} fill={C.text} fontSize="15" textAnchor="middle">{v}</text>
              </g>
            )))}
            <line x1="110" y1="40" x2="110" y2="150" stroke={C.lime} strokeWidth="2" markerEnd="url(#n1)" />
            <text x="95" y="100" fill={C.lime} fontSize="12" textAnchor="middle" transform="rotate(-90 95 100)">axis=0 (строки)</text>
            <line x1="140" y1="25" x2="370" y2="25" stroke="#818cf8" strokeWidth="2" markerEnd="url(#n2)" />
            <text x="255" y="18" fill="#818cf8" fontSize="12" textAnchor="middle">axis=1 (столбцы)</text>
            <defs>
              <marker id="n1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker>
              <marker id="n2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#818cf8" /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryExample title="dtype важен для памяти и скорости">
          Все элементы ndarray — одного типа (int64, float64, bool…). Можно явно задать более компактный тип
          (<code>np.array([1,2,3], dtype=np.int8)</code>) — это экономит память на больших датасетах. При
          смешивании типов NumPy приведёт всё к общему (int + float → float).
        </TheoryExample>
      </section>

      {/* Индексация и срезы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Индексация и срезы</h2>
        <TheoryCode language="python" code={`a = np.array([10, 20, 30, 40, 50])
a[0]        # 10 — первый
a[-1]       # 50 — последний
a[1:4]      # [20 30 40] — срез [start:stop]
a[::2]      # [10 30 50] — с шагом 2

m = np.array([[1, 2, 3], [4, 5, 6]])
m[0, 1]     # 2 — строка 0, столбец 1
m[:, 0]     # [1 4] — весь столбец 0
m[1, :]     # [4 5 6] — вся строка 1
m[0:2, 1:3] # подматрица`} />
        <Term name="Булева (масочная) индексация">
          самый мощный приём NumPy. Сравнение массива с числом даёт массив True/False той же формы (маску), а
          затем этой маской отбирают нужные элементы — без единого цикла.
        </Term>
        <TheoryCode language="python" code={`a = np.array([2, 8, 3, 9, 5])
a > 5           # [False  True False  True False] — маска
a[a > 5]        # [8 9] — отбор по маске
a[a > 5] = 0    # можно и присваивать: [2 0 3 0 5]

# несколько условий: & (и), | (или), скобки обязательны
a[(a > 2) & (a < 9)]   # [8 3 5]`} />
        <Fig caption="Булева индексация: условие создаёт маску True/False, по которой выбираются только подходящие элементы">
          <svg viewBox="0 0 560 150" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[2,8,3,9,5].map((v,i)=>(
              <g key={i}>
                <rect x={40+i*70} y="20" width="55" height="30" rx="4" fill="rgba(200,255,0,0.1)" stroke={C.border} />
                <text x={67+i*70} y="40" fill={C.text} fontSize="13" textAnchor="middle">{v}</text>
                <rect x={40+i*70} y="60" width="55" height="26" rx="4" fill={v>5?'rgba(74,222,128,0.2)':'#242b3a'} stroke={v>5?C.green:C.border} />
                <text x={67+i*70} y="78" fill={v>5?C.green:C.sub} fontSize="10" textAnchor="middle">{v>5?'True':'False'}</text>
                {v>5 && <rect x={40+i*70} y="100" width="55" height="30" rx="4" fill="rgba(74,222,128,0.2)" stroke={C.green} />}
                {v>5 && <text x={67+i*70} y="120" fill={C.text} fontSize="13" textAnchor="middle">{v}</text>}
              </g>
            ))}
            <text x="20" y="40" fill={C.sub} fontSize="10" textAnchor="end">a</text>
            <text x="20" y="76" fill={C.sub} fontSize="10" textAnchor="end">a&gt;5</text>
            <text x="20" y="118" fill={C.sub} fontSize="10" textAnchor="end">a[a&gt;5]</text>
          </svg>
        </Fig>
      </section>

      {/* Векторизация и broadcasting */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Векторизованные операции и broadcasting</h2>
        <TheoryCode language="python" code={`a = np.array([1, 2, 3])
a + 10      # [11 12 13]  — операция с числом применяется ко всем
a * 2       # [2 4 6]
a ** 2      # [1 4 9]
np.sqrt(a)  # корень из каждого элемента

b = np.array([4, 5, 6])
a + b       # [5 7 9]   — поэлементно
a * b       # [4 10 18] — поэлементно (НЕ матричное умножение!)`} />
        <Term name="Broadcasting (транслирование)">
          механизм, позволяющий выполнять операции над массивами <strong>разной</strong> формы: меньший массив
          автоматически «растягивается» до формы большего, если их размеры совместимы. Никакого физического
          копирования данных при этом не происходит — только логическое.
        </Term>
        <Fig caption="Broadcasting: вектор-строка прибавляется к каждой строке матрицы, как будто он «размножился» по вертикали">
          <svg viewBox="0 0 560 170" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[[1,2,3],[4,5,6]].map((row,r)=>row.map((v,c)=>(
              <g key={`m${r}-${c}`}>
                <rect x={30+c*45} y={40+r*45} width="40" height="38" rx="4" fill="rgba(200,255,0,0.1)" stroke={C.border} />
                <text x={50+c*45} y={64+r*45} fill={C.text} fontSize="13" textAnchor="middle">{v}</text>
              </g>
            )))}
            <text x="95" y="88" fill={C.text} fontSize="20" textAnchor="middle">+</text>
            {[10,20,30].map((v,c)=>(
              <g key={`v${c}`}>
                <rect x={120+c*45} y="62" width="40" height="38" rx="4" fill="rgba(129,140,248,0.2)" stroke="#818cf8" />
                <text x={140+c*45} y="86" fill={C.text} fontSize="13" textAnchor="middle">{v}</text>
              </g>
            ))}
            <text x="290" y="88" fill={C.text} fontSize="20" textAnchor="middle">=</text>
            {[[11,22,33],[14,25,36]].map((row,r)=>row.map((v,c)=>(
              <g key={`res${r}-${c}`}>
                <rect x={320+c*52} y={40+r*45} width="47" height="38" rx="4" fill="rgba(74,222,128,0.15)" stroke={C.green} />
                <text x={343+c*52} y={64+r*45} fill={C.text} fontSize="12" textAnchor="middle">{v}</text>
              </g>
            )))}
            <text x="280" y="150" fill={C.sub} fontSize="11" textAnchor="middle">форма (2,3) + форма (3,) → (3,) растянулась на обе строки</text>
          </svg>
        </Fig>
      </section>

      {/* Агрегации */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Агрегирующие функции и параметр axis</h2>
        <TheoryCode language="python" code={`a = np.array([[1, 2, 3], [4, 5, 6]])

a.sum()        # 21 — сумма всех
a.mean()       # 3.5 — среднее
a.max(), a.min()   # 6, 1
a.std()        # стандартное отклонение
a.argmax()     # индекс максимума

a.sum(axis=0)  # [5 7 9]  — сумма ПО столбцам (схлопнули строки)
a.sum(axis=1)  # [6 15]   — сумма ПО строкам (схлопнули столбцы)`} />
        <TheoryExample title="Как не путать axis">
          Правило: <code>axis</code> — это ось, которая <strong>исчезает</strong>. <code>axis=0</code> убирает
          строки → остаётся результат по столбцам. <code>axis=1</code> убирает столбцы → результат по строкам.
          На реальных данных (строки = объекты, столбцы = признаки) <code>axis=0</code> считает статистику по
          каждому признаку.
        </TheoryExample>
      </section>

      {/* Линейная алгебра */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Линейная алгебра</h2>
        <p>Линейная алгебра — язык машинного обучения (данные = матрицы, модель = операции над ними).</p>
        <TheoryCode language="python" code={`A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

A @ B          # матричное умножение (или np.dot(A, B))
A * B          # ВНИМАНИЕ: это поэлементное, а не матричное!
A.T            # транспонирование: строки <-> столбцы
np.linalg.inv(A)   # обратная матрица
np.linalg.det(A)   # определитель

v = np.array([1, 2, 3])
np.dot(v, v)   # скалярное произведение: 1+4+9 = 14`} />
        <TheoryExample title="Где это в ML">
          Предсказание линейной модели — это буквально матричное умножение признаков на веса: ŷ = X @ w + b.
          Поэтому NumPy и линейная алгебра — обязательная база перед scikit-learn и нейросетями.
        </TheoryExample>
      </section>

      {/* Полезные приёмы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Полезные приёмы для аналитики</h2>
        <TheoryCode language="python" code={`a = np.array([3, 1, 2, 5, 4])
np.sort(a)          # [1 2 3 4 5]
np.unique([1,1,2,3])# [1 2 3] — уникальные значения
np.where(a > 3, 1, 0)   # [0 0 0 1 1] — условная замена: где >3 → 1, иначе 0
np.concatenate([a, a])  # склеить массивы
np.clip(a, 2, 4)    # ограничить значения диапазоном [2, 4]

m = np.array([[1, 2], [3, 4]])
m.flatten()         # [1 2 3 4] — вытянуть в вектор
np.isnan(np.array([1, np.nan]))  # поиск пропусков (NaN)`} />
      </section>

      {/* NumPy и pandas */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. NumPy и pandas</h2>
        <TheoryTable
          headers={['', 'NumPy', 'pandas']}
          rows={[
            ['Структура', 'ndarray — однородный массив чисел', 'DataFrame — таблица с именованными колонками'],
            ['Типы данных', 'один тип на весь массив', 'разные типы в разных колонках'],
            ['Когда', 'чистые вычисления, основа ML', 'реальные табличные данные, очистка, анализ'],
            ['Связь', '—', 'построен поверх NumPy, внутри — ndarray'],
          ]}
        />
        <p>
          На практике данные загружают в <code>pandas.DataFrame</code>, чистят и анализируют, а потом извлекают
          числовой массив (<code>df.values</code> или <code>df.to_numpy()</code>) для подачи в модель ML —
          то есть возвращаются к NumPy.
        </p>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Выводы</h2>
        <ul className="theory-list">
          <li>NumPy хранит данные в однородных массивах ndarray подряд в памяти и считает векторизованно — без циклов Python и в разы быстрее.</li>
          <li>Форму задают shape/ndim/dtype; reshape меняет форму, не трогая данные; axis 0 — строки, axis 1 — столбцы.</li>
          <li>Срезы и булева индексация (<code>a[a &gt; x]</code>) — главный способ выбирать и менять данные по условию.</li>
          <li>Векторизованные операции применяются ко всему массиву сразу; broadcasting комбинирует массивы разной формы.</li>
          <li>Агрегации (sum, mean, std) с параметром axis сворачивают данные по строкам или столбцам — считают статистику по признакам.</li>
          <li>Линейная алгебра (@, .T, inv) — математическая основа ML; NumPy — фундамент pandas, scikit-learn и всего стека данных.</li>
        </ul>
      </section>
    </div>
  )
}
