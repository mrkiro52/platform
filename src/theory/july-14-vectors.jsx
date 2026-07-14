import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

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

// Формула по центру, моноширинным шрифтом
function Formula({ children }) {
  return (
    <div style={{
      margin: '14px 0', padding: '12px 16px', background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)', borderRadius: 8, textAlign: 'center',
      fontFamily: 'ui-monospace, monospace', fontSize: 15, color: 'var(--text-primary)', overflowX: 'auto',
    }}>{children}</div>
  )
}

export default function July14VectorsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Линейная алгебра: векторы</h1>
        <p className="theory-subtitle">Трек: Аналитика</p>
        <p className="theory-date">14 июля 2026</p>
        <p>
          Векторы — базовый язык, на котором говорят данные. Любую строку таблицы, любого пользователя, любой
          товар в аналитике удобно представлять как вектор чисел. Разберём, что такое вектор с четырёх точек
          зрения, какие над ним есть операции, что такое скалярное произведение и его свойства, как всё это считать
          в Python, а также понятия линейной зависимости, базиса и размерности.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Определение вектора</h2>
        <Term name="Вектор">
          упорядоченный набор чисел (компонент). Запись <code>a = (3, 5, 2)</code> — это трёхмерный вектор с
          компонентами 3, 5 и 2. Порядок важен: <code>(3, 5)</code> и <code>(5, 3)</code> — разные векторы.
        </Term>
        <P n={1}>
          <strong>В геометрии</strong> вектор — это направленный отрезок: стрелка, у которой есть длина и
          направление. Вектор <code>(3, 2)</code> на плоскости — это стрелка из начала координат в точку (3, 2).
          Векторы можно переносить: важны только длина и направление, а не место, откуда стрелка нарисована.
        </P>
        <Fig caption="Вектор (3, 2) как стрелка из начала координат и его компоненты по осям.">
          <svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="170" x2="280" y2="170" stroke="#2a2a3a" />
            <line x1="30" y1="170" x2="30" y2="20" stroke="#2a2a3a" />
            <line x1="30" y1="170" x2="210" y2="70" stroke="#c8ff00" strokeWidth="2.5" markerEnd="url(#arrow)" />
            <line x1="30" y1="170" x2="210" y2="170" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4" />
            <line x1="210" y1="170" x2="210" y2="70" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="4" />
            <text x="115" y="115" fill="#c8ff00" fontSize="13">a = (3, 2)</text>
            <text x="120" y="188" fill="#60a5fa" fontSize="12">x = 3</text>
            <text x="215" y="125" fill="#60a5fa" fontSize="12">y = 2</text>
            <defs>
              <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L8,3 L0,6 Z" fill="#c8ff00" />
              </marker>
            </defs>
          </svg>
        </Fig>
        <P n={2}>
          <strong>В компьютерных науках</strong> вектор — это одномерный массив чисел (<code>list</code>,{' '}
          <code>numpy.array</code>). В аналитике одна строка датасета — вектор признаков объекта: пользователь =
          (возраст, число покупок, средний чек, дней с регистрации). Именно поэтому линейная алгебра — фундамент
          машинного обучения и анализа данных.
        </P>
        <P n={3}>
          <strong>В линейной алгебре</strong> вектор — это элемент <em>векторного пространства</em>: множества, где
          определены сложение векторов и умножение на число, причём результат снова остаётся вектором того же
          пространства. Это самый общий взгляд, объединяющий геометрию и массивы чисел.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Операции с векторами</h2>
        <Term name="Сложение">
          складываем покомпонентно: <code>(1, 2) + (3, 4) = (4, 6)</code>. Геометрически — «правило параллелограмма»
          или «стрелка к стрелке».
        </Term>
        <Term name="Умножение на число (скаляр)">
          каждую компоненту умножаем на число: <code>2 · (3, 4) = (6, 8)</code>. Геометрически вектор
          растягивается (или сжимается, если число по модулю меньше 1); при отрицательном числе меняет направление.
        </Term>
        <Term name="Длина (норма) вектора">
          «размер» вектора: <code>|a| = √(a₁² + a₂² + … + aₙ²)</code>. Для <code>(3, 4)</code> длина = √(9+16) = 5.
          Это обычная евклидова длина стрелки.
        </Term>
        <Formula>a + b = (a₁+b₁, a₂+b₂, …, aₙ+bₙ) &nbsp;&nbsp;|&nbsp;&nbsp; c · a = (c·a₁, c·a₂, …, c·aₙ)</Formula>
        <Fig caption="Сложение векторов по правилу треугольника: приставляем начало b к концу a.">
          <svg viewBox="0 0 320 200" width="320" height="200" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="180" x2="140" y2="120" stroke="#60a5fa" strokeWidth="2.5" markerEnd="url(#ar2)" />
            <line x1="140" y1="120" x2="200" y2="40" stroke="#4ade80" strokeWidth="2.5" markerEnd="url(#ar3)" />
            <line x1="20" y1="180" x2="200" y2="40" stroke="#c8ff00" strokeWidth="2.5" markerEnd="url(#ar4)" />
            <text x="65" y="140" fill="#60a5fa" fontSize="13">a</text>
            <text x="175" y="90" fill="#4ade80" fontSize="13">b</text>
            <text x="90" y="95" fill="#c8ff00" fontSize="13">a + b</text>
            <defs>
              <marker id="ar2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#60a5fa" /></marker>
              <marker id="ar3" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#4ade80" /></marker>
              <marker id="ar4" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6 Z" fill="#c8ff00" /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Стандартное скалярное произведение</h2>
        <Term name="Скалярное произведение (dot product)">
          операция над двумя векторами, дающая <em>число</em> (скаляр): перемножаем соответствующие компоненты и
          складываем результаты.
        </Term>
        <Formula>a · b = a₁·b₁ + a₂·b₂ + … + aₙ·bₙ</Formula>
        <P n={4}>
          Пример: <code>(1, 2, 3) · (4, 5, 6) = 1·4 + 2·5 + 3·6 = 4 + 10 + 18 = 32</code>. Есть и геометрический
          смысл: <code>a · b = |a| · |b| · cos(θ)</code>, где θ — угол между векторами. Отсюда важный факт: если
          скалярное произведение равно нулю, векторы <strong>перпендикулярны</strong> (ортогональны).
        </P>
        <TheoryExample title="Зачем аналитику скалярное произведение">
          Через него считают <strong>косинусную близость</strong> — насколько похожи два объекта (два пользователя,
          два товара, два текста). Чем ближе cos(θ) к 1, тем более «сонаправлены» векторы, тем объекты похожее. Это
          основа рекомендательных систем и поиска похожих документов.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Свойства скалярного произведения</h2>
        <TheoryTable
          headers={['Свойство', 'Формула', 'Смысл']}
          rows={[
            ['Коммутативность', 'a · b = b · a', 'порядок не важен'],
            ['Дистрибутивность', 'a · (b + c) = a·b + a·c', 'раскрывается как скобки'],
            ['Однородность', '(k·a) · b = k·(a·b)', 'число можно выносить'],
            ['Связь с длиной', 'a · a = |a|²', 'скалярный квадрат = квадрат длины'],
            ['Неотрицательность', 'a · a ≥ 0', 'ноль только у нулевого вектора'],
          ]}
        />
        <P n={5}>
          Особенно полезно последнее: <code>a · a = |a|²</code> связывает скалярное произведение с длиной, поэтому
          длину часто вычисляют как <code>√(a · a)</code>. А признак ортогональности <code>a · b = 0</code> —
          рабочий инструмент: например, в регрессии остатки модели ортогональны признакам.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Операции с векторами в Python (NumPy)</h2>
        <TheoryCode language="python" code={`import numpy as np

a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

a + b            # array([5, 7, 9])   — сложение
a - b            # array([-3,-3,-3])  — вычитание
3 * a            # array([3, 6, 9])   — умножение на скаляр

a @ b            # 32                 — скалярное произведение
np.dot(a, b)     # 32                 — то же самое

np.linalg.norm(a)          # 3.7416...  — длина (норма) вектора
np.linalg.norm(a - b)      # расстояние между a и b

# косинусная близость (насколько похожи векторы)
cos = (a @ b) / (np.linalg.norm(a) * np.linalg.norm(b))
print(cos)       # 0.9746...  — близко к 1 => похожи`} />
        <P n={6}>
          NumPy выполняет эти операции <strong>векторизованно</strong> — сразу над всем массивом, без циклов Python.
          Это в десятки раз быстрее ручного перебора и потому лежит в основе pandas, scikit-learn и почти всех
          инструментов аналитика.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Линейная зависимость</h2>
        <Term name="Линейная комбинация">
          сумма векторов, умноженных на числа: <code>k₁·a + k₂·b + k₃·c</code>. Например, <code>2·a − 3·b</code> —
          линейная комбинация a и b.
        </Term>
        <Term name="Линейно зависимые векторы">
          набор, в котором хотя бы один вектор можно выразить как линейную комбинацию остальных. Проще говоря — в
          наборе есть «лишний», не добавляющий новой информации.
        </Term>
        <Term name="Линейно независимые векторы">
          ни один вектор нельзя выразить через другие. Каждый несёт «своё» направление.
        </Term>
        <P n={7}>
          Пример: <code>(1, 0)</code>, <code>(2, 0)</code> — линейно зависимы, ведь второй = 2 × первый, оба лежат
          на одной прямой. А <code>(1, 0)</code> и <code>(0, 1)</code> — независимы: одну ось нельзя получить,
          растягивая другую. В аналитике линейно зависимые признаки (мультиколлинеарность) — проблема: они дублируют
          информацию и портят интерпретацию модели.
        </P>
        <Fig caption="Слева: два вектора на одной прямой — зависимы. Справа: разные направления — независимы.">
          <svg viewBox="0 0 460 170" width="460" height="170" xmlns="http://www.w3.org/2000/svg">
            <g>
              <line x1="30" y1="140" x2="180" y2="60" stroke="#f87171" strokeWidth="2.5" />
              <line x1="30" y1="140" x2="120" y2="92" stroke="#facc15" strokeWidth="2.5" />
              <text x="60" y="30" fill="#94a3b8" fontSize="12">зависимы (одна прямая)</text>
            </g>
            <g>
              <line x1="270" y1="140" x2="420" y2="140" stroke="#4ade80" strokeWidth="2.5" />
              <line x1="270" y1="140" x2="270" y2="40" stroke="#60a5fa" strokeWidth="2.5" />
              <text x="290" y="30" fill="#94a3b8" fontSize="12">независимы (разные оси)</text>
            </g>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Базис</h2>
        <Term name="Базис">
          набор линейно независимых векторов, через линейные комбинации которых можно выразить <em>любой</em> вектор
          пространства. Это «система координат» пространства.
        </Term>
        <P n={8}>
          Классический пример на плоскости — <strong>стандартный базис</strong> <code>e₁ = (1, 0)</code> и{' '}
          <code>e₂ = (0, 1)</code>. Любой вектор <code>(x, y)</code> раскладывается как <code>x·e₁ + y·e₂</code>.
          Базисов у одного пространства бесконечно много, но у всех одно и то же количество векторов — и это
          количество называется размерностью.
        </P>
        <TheoryExample title="Базис в анализе данных">
          Метод главных компонент (PCA) — это, по сути, поиск нового, более удобного базиса, в котором данные
          описываются меньшим числом «главных» направлений. Так снижают размерность, отбрасывая направления, где
          данные почти не меняются.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Размерность векторного пространства</h2>
        <Term name="Размерность">
          число векторов в любом базисе пространства. Плоскость двумерна (нужно 2 базисных вектора), обычное
          пространство трёхмерно, а датасет с 50 признаками живёт в 50-мерном пространстве.
        </Term>
        <P n={9}>
          Размерность — это «число степеней свободы»: сколько независимых чисел нужно, чтобы однозначно задать точку.
          В аналитике каждый признак добавляет измерение. Отсюда <strong>«проклятие размерности»</strong>: чем
          больше признаков, тем разреженнее данные и тем больше наблюдений требуется. Поэтому лишние (линейно
          зависимые) признаки стараются убирать, а размерность — снижать.
        </P>
        <TheoryTable
          headers={['Пространство', 'Пример базиса', 'Размерность']}
          rows={[
            ['Прямая', '(1)', '1'],
            ['Плоскость', '(1,0), (0,1)', '2'],
            ['Обычное пространство', '(1,0,0), (0,1,0), (0,0,1)', '3'],
            ['Датасет с n признаками', 'n независимых признаков', 'n'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={10}>
          <strong>Вектор</strong> — упорядоченный набор чисел; на него смотрят как на стрелку (геометрия), массив
          (программирование) или элемент векторного пространства (алгебра). Основные операции — сложение, умножение
          на число и <strong>скалярное произведение</strong> (даёт число, связано с углом и длиной). Его свойства
          (коммутативность, дистрибутивность, связь с длиной) делают его рабочим инструментом аналитика — от
          косинусной близости до регрессии. <strong>Линейная независимость</strong> означает отсутствие «лишних»
          векторов, <strong>базис</strong> — минимальный набор для описания всего пространства, а его размер —{' '}
          <strong>размерность</strong>. Всё это в Python считается парой строк на NumPy.
        </P>
      </section>
    </div>
  )
}
