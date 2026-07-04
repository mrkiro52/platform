import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July4NumpyTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Библиотека NumPy</h1>
        <p className="theory-subtitle">Треки: Аналитика и Machine Learning</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          <strong>NumPy</strong> (Numerical Python) — фундаментальная библиотека для численных вычислений в
          Python. На ней построены pandas, scikit-learn и почти вся экосистема анализа данных и ML. Главное,
          что даёт NumPy — быстрые массивы <code>ndarray</code> и векторизованные операции над ними.
        </p>
      </section>

      {/* Зачем NumPy */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужен NumPy, если есть обычные списки</h2>
        <p>
          Обычный список Python — универсален, но медленный для вычислений: элементы могут быть разных типов,
          и Python обрабатывает их по одному в цикле. Массив NumPy хранит данные <strong>одного типа</strong>
          компактно в памяти и умеет выполнять операции сразу над всем массивом за один вызов — это называется
          <strong> векторизацией</strong>.
        </p>
        <TheoryCode language="python" code={`# Список Python — сложение поэлементно нужно писать циклом
a = [1, 2, 3]
b = [4, 5, 6]
c = [a[i] + b[i] for i in range(len(a))]  # [5, 7, 9]

# NumPy — то же самое одной операцией, и намного быстрее
import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
c = a + b  # array([5, 7, 9])`} />
        <TheoryExample title="Почему это быстрее">
          NumPy написан на C и хранит массив как непрерывный блок памяти одного типа данных. Операции
          выполняются не через интерпретатор Python поэлементно, а скомпилированным кодом сразу над всем
          массивом — это на порядки быстрее для больших объёмов данных.
        </TheoryExample>
      </section>

      {/* Создание массивов */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Создание массивов</h2>
        <TheoryCode language="python" code={`import numpy as np

np.array([1, 2, 3])          # из списка: array([1, 2, 3])
np.array([[1, 2], [3, 4]])   # двумерный массив (матрица)

np.zeros(5)                  # [0. 0. 0. 0. 0.]
np.ones((2, 3))              # матрица 2x3 из единиц
np.arange(0, 10, 2)          # [0 2 4 6 8] — как range(), но массив
np.linspace(0, 1, 5)         # 5 чисел от 0 до 1 равномерно: [0. 0.25 0.5 0.75 1.]
np.random.rand(3)            # 3 случайных числа от 0 до 1`} />
      </section>

      {/* Атрибуты и форма */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Форма массива: shape, ndim, dtype</h2>
        <TheoryCode language="python" code={`a = np.array([[1, 2, 3], [4, 5, 6]])

a.shape   # (2, 3) — 2 строки, 3 столбца
a.ndim    # 2 — количество измерений (осей)
a.dtype   # int64 — тип элементов (все элементы одного типа!)
a.size    # 6 — общее количество элементов

a.reshape(3, 2)  # изменить форму на 3 строки, 2 столбца (данные те же)`} />
        <TheoryTable
          headers={['Термин', 'Значение']}
          rows={[
            ['shape', 'размеры по каждой оси, например (строки, столбцы)'],
            ['ndim', 'число измерений (осей): 1 — вектор, 2 — матрица, 3+ — тензор'],
            ['dtype', 'тип данных всех элементов (int64, float64 и т.д.)'],
          ]}
        />
      </section>

      {/* Индексация и срезы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Индексация и срезы</h2>
        <TheoryCode language="python" code={`a = np.array([10, 20, 30, 40, 50])
a[0]       # 10 — первый элемент
a[-1]      # 50 — последний
a[1:4]     # [20 30 40] — срез

m = np.array([[1, 2, 3], [4, 5, 6]])
m[0, 1]    # 2 — строка 0, столбец 1
m[:, 0]    # [1 4] — весь столбец 0
m[1, :]    # [4 5 6] — вся строка 1

# Булева индексация — выбрать элементы по условию
a[a > 25]  # [30 40 50]`} />
        <TheoryExample title="Булева индексация — рабочая лошадка аналитики">
          Конструкция вида <code>a[a &gt; 25]</code> — один из самых частых приёмов: сначала <code>a &gt; 25</code>
          создаёт массив True/False той же формы, затем этот массив используется как маска для отбора нужных
          элементов. Так фильтруют данные без единого цикла.
        </TheoryExample>
      </section>

      {/* Операции и broadcasting */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Векторизованные операции и broadcasting</h2>
        <TheoryCode language="python" code={`a = np.array([1, 2, 3])

a + 10      # [11 12 13] — прибавили ко всем сразу
a * 2       # [2 4 6]
a ** 2      # [1 4 9]

b = np.array([4, 5, 6])
a + b       # [5 7 9] — поэлементно
a * b       # [4 10 18] — поэлементно (не матричное умножение!)`} />
        <p>
          <strong>Broadcasting</strong> — механизм, который позволяет NumPy выполнять операции над массивами
          <strong> разной</strong> формы, автоматически «растягивая» меньший массив.
        </p>
        <TheoryCode language="python" code={`m = np.array([[1, 2, 3], [4, 5, 6]])  # форма (2, 3)
row = np.array([10, 20, 30])          # форма (3,)

m + row
# [[11 22 33]
#  [14 25 36]]
# row как бы "размножился" на каждую строку m`} />
      </section>

      {/* Агрегирующие функции */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Агрегирующие функции</h2>
        <TheoryCode language="python" code={`a = np.array([[1, 2, 3], [4, 5, 6]])

a.sum()        # 21 — сумма всех элементов
a.mean()       # 3.5 — среднее
a.max()        # 6, a.min() # 1
a.std()        # стандартное отклонение

a.sum(axis=0)  # [5 7 9]  — сумма по столбцам (схлопываем строки)
a.sum(axis=1)  # [6 15]   — сумма по строкам (схлопываем столбцы)`} />
        <TheoryExample title="Как запомнить axis">
          <code>axis=0</code> — двигаемся вдоль строк (вниз), результат — по одному числу на каждый
          <strong> столбец</strong>. <code>axis=1</code> — двигаемся вдоль столбцов (вправо), результат — по
          одному числу на каждую <strong>строку</strong>.
        </TheoryExample>
      </section>

      {/* Линейная алгебра */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Немного линейной алгебры</h2>
        <TheoryCode language="python" code={`A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

A @ B          # матричное умножение (или np.dot(A, B))
A.T            # транспонирование: строки становятся столбцами
np.linalg.inv(A)   # обратная матрица
np.linalg.det(A)   # определитель`} />
      </section>

      {/* Сравнение с pandas */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. NumPy и pandas</h2>
        <TheoryTable
          headers={['', 'NumPy', 'pandas']}
          rows={[
            ['Структура', 'ndarray — однородный массив чисел', 'DataFrame — таблица с именованными колонками разных типов'],
            ['Когда использовать', 'чистые числовые вычисления, основа для ML', 'работа с реальными "грязными" табличными данными'],
            ['Связь', '—', 'построен поверх NumPy, использует ndarray внутри'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Выводы</h2>
        <ul className="theory-list">
          <li>NumPy хранит данные в однородных массивах ndarray и выполняет операции над ними векторизованно — без явных циклов Python.</li>
          <li>Форма массива описывается через shape/ndim/dtype; reshape меняет форму, не трогая данные.</li>
          <li>Срезы и булева индексация (<code>a[a &gt; x]</code>) — основной способ выбирать и фильтровать данные.</li>
          <li>Broadcasting позволяет комбинировать массивы разной формы без ручного дублирования данных.</li>
          <li>Агрегирующие функции с параметром axis сворачивают данные по строкам или по столбцам.</li>
          <li>NumPy — фундамент, на котором построены pandas, scikit-learn и весь стек анализа данных в Python.</li>
        </ul>
      </section>
    </div>
  )
}
