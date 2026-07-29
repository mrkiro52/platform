import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

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

// Простая формула по центру, моноширинным шрифтом
function Formula({ children }) {
  return (
    <div style={{
      margin: '14px 0', padding: '12px 16px', background: 'var(--bg-secondary)',
      border: '1px solid var(--border-color)', borderRadius: 8, textAlign: 'center',
      fontFamily: 'ui-monospace, monospace', fontSize: 15, color: 'var(--text-primary)', overflowX: 'auto',
    }}>{children}</div>
  )
}

// Точка на условной координатной плоскости (для иллюстраций kNN)
function Dot({ x, y, r = 7, fill, stroke, label }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={fill} stroke={stroke || fill} strokeWidth="1.5" />
      {label && <text x={x} y={y - r - 5} fill="var(--text-tertiary)" fontSize="10" textAnchor="middle">{label}</text>}
    </g>
  )
}

export default function July18KnnTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Алгоритм k-Nearest Neighbors (kNN)</h1>
        <p className="theory-subtitle">Треки: Аналитика и Machine Learning</p>
        <p className="theory-date">18 июля 2026</p>
        <p>
          Есть модели, которые сначала «изучают» данные и выводят из них общую формулу, а есть модели, которые
          вообще не строят никакой формулы, а просто каждый раз подглядывают в тренировочные данные заново.
          Метод <strong>k ближайших соседей</strong> — как раз второй случай, и один из самых интуитивно понятных
          алгоритмов машинного обучения. Сегодня разберём его логику, реализацию в sklearn, способы измерения
          расстояний, перевзвешивание соседей и важность масштабирования признаков.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Идея метода: похожие объекты — похожие ответы</h2>
        <Term name="k-Nearest Neighbors (kNN, метод k ближайших соседей)">
          метрический алгоритм обучения с учителем, в основе которого лежит простое наблюдение: объекты,
          похожие друг на друга по признакам, обычно имеют похожие значения целевой переменной.
        </Term>
        <P n={1}>
          Отсюда и стратегия предсказания: чтобы узнать таргет нового объекта, не нужно ничего «вычислять» по
          формуле — достаточно найти его <strong>k ближайших соседей</strong> среди уже размеченных данных и
          посмотреть, какие у них таргеты. Для задачи регрессии (числовой таргет) ответ получают{' '}
          <strong>усреднением</strong> таргетов соседей, для задачи классификации — <strong>голосованием</strong>
          (какой класс встречается чаще среди соседей).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Регрессия методом kNN: пример с недвижимостью</h2>
        <P n={2}>
          Представим датасет квартир с двумя признаками — площадью в квадратных метрах и этажом — и вещественным
          таргетом, ценой. Есть новая квартира, для которой цену нужно предсказать. Находим k = 3 ближайших к ней
          квартиры по этим двум признакам и усредняем их цены — получившееся среднее и есть предсказание.
        </P>
        <Fig caption="Новый объект (звезда) и три ближайших соседа с известной ценой. Предсказание — среднее их таргетов.">
          <svg viewBox="0 0 420 220" width="420" height="220" xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="20" x2="40" y2="190" stroke="#94a3b8" strokeWidth="1" />
            <line x1="40" y1="190" x2="400" y2="190" stroke="#94a3b8" strokeWidth="1" />
            <text x="220" y="210" fill="#94a3b8" fontSize="11" textAnchor="middle">площадь, м²</text>
            <text x="16" y="105" fill="#94a3b8" fontSize="11" textAnchor="middle" transform="rotate(-90 16 105)">этаж</text>

            {/* фоновые объекты */}
            <Dot x={100} y={150} r={6} fill="rgba(96,165,250,0.5)" label="40" />
            <Dot x={300} y={60} r={6} fill="rgba(96,165,250,0.5)" label="90" />
            <Dot x={330} y={140} r={6} fill="rgba(96,165,250,0.5)" label="70" />
            {/* три ближайших соседа */}
            <Dot x={210} y={110} r={7} fill="rgba(74,222,128,0.7)" label="50" />
            <Dot x={230} y={90} r={7} fill="rgba(74,222,128,0.7)" label="55" />
            <Dot x={195} y={85} r={7} fill="rgba(74,222,128,0.7)" label="60" />
            {/* линии к соседям */}
            <line x1="220" y1="100" x2="210" y2="110" stroke="#20beff" strokeDasharray="3" />
            <line x1="220" y1="100" x2="230" y2="90" stroke="#20beff" strokeDasharray="3" />
            <line x1="220" y1="100" x2="195" y2="85" stroke="#20beff" strokeDasharray="3" />
            {/* новый объект */}
            <path d="M 220 92 l 3 6 l 7 1 l -5 5 l 1 7 l -6 -3 l -6 3 l 1 -7 l -5 -5 l 7 -1 z" fill="#20beff" />
            <text x="220" y="78" fill="#20beff" fontSize="11" textAnchor="middle" fontWeight="bold">новый объект</text>
          </svg>
        </Fig>
        <Formula>предсказание = (50 + 55 + 60) / 3 = 165 / 3 = 55</Formula>
        <P n={3}>
          Числа в примере условны, но суть неизменна: чем ближе объект к предсказываемому, тем больше у него шансов
          попасть в тройку k ближайших соседей и повлиять на итоговое предсказание.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Классификация методом kNN</h2>
        <P n={4}>
          Для задачи классификации логика та же, но вместо усреднения чисел используется{' '}
          <strong>голосование по классам</strong>: среди k ближайших соседей смотрят, какой класс встречается чаще
          всего, и присваивают его новому объекту. Если голоса разделились поровну (например, 2 на 2 при k = 4),
          обычно берут класс <strong>самого близкого</strong> из спорных соседей — это простое и надёжное
          правило-тайбрейкер.
        </P>
        <Fig caption="Голосование по классам: среди 3 ближайших соседей — 2 «круга» и 1 «треугольник», новый объект относят к классу «круг».">
          <svg viewBox="0 0 380 190" width="380" height="190" xmlns="http://www.w3.org/2000/svg">
            {/* фоновые объекты разных классов */}
            <circle cx="70" cy="140" r="7" fill="rgba(96,165,250,0.4)" />
            <polygon points="320,40 328,55 312,55" fill="rgba(248,113,113,0.4)" />
            <circle cx="300" cy="150" r="7" fill="rgba(96,165,250,0.4)" />
            {/* три ближайших соседа */}
            <circle cx="190" cy="100" r="8" fill="#60a5fa" stroke="#60a5fa" />
            <circle cx="215" cy="120" r="8" fill="#60a5fa" stroke="#60a5fa" />
            <polygon points="170,90 179,107 161,107" fill="#f87171" />
            {/* новый объект в центре */}
            <path d="M 195 105 l 3 6 l 7 1 l -5 5 l 1 7 l -6 -3 l -6 3 l 1 -7 l -5 -5 l 7 -1 z" fill="#20beff" />
            <line x1="196" y1="108" x2="190" y2="100" stroke="#20beff" strokeDasharray="2" />
            <line x1="196" y1="108" x2="215" y2="120" stroke="#20beff" strokeDasharray="2" />
            <line x1="196" y1="108" x2="170" y2="90" stroke="#20beff" strokeDasharray="2" />
            <text x="196" y="70" fill="#20beff" fontSize="11" textAnchor="middle" fontWeight="bold">новый объект</text>
            <text x="196" y="160" fill="#60a5fa" fontSize="11" textAnchor="middle">2 «круга» vs 1 «треугольник» → класс «круг»</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Общий алгоритм kNN по шагам</h2>
        <TheoryTable
          headers={['Шаг', 'Что происходит']}
          rows={[
            ['1', 'В алгоритм поступает новый объект x, для которого нужно сделать предсказание'],
            ['2', 'Считаются попарные расстояния между x и каждым объектом обучающей выборки'],
            ['3', 'Из всех объектов выбираются k ближайших по этому расстоянию'],
            ['4', 'Таргет формируется усреднением (регрессия) или голосованием (классификация) по этим k соседям'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. kNN против линейных моделей</h2>
        <P n={5}>
          Линейные модели — это <strong>параметрические</strong> алгоритмы: они один раз «обучаются», вычисляя
          набор коэффициентов β, и дальше используют этот же готовый набор для любых новых предсказаний. У этого
          подхода есть весомый плюс — коэффициенты можно интерпретировать: понять, насколько сильно и в какую
          сторону (положительно или отрицательно) каждый признак влияет на таргет. Кроме того, линейные модели
          умеют экстраполировать общий тренд — предсказывать таргет даже для объектов, непохожих на всё, что
          видела модель при обучении.
        </P>
        <P n={6}>
          kNN устроен ровно наоборот — это <strong>непараметрический</strong> и неинтерпретируемый алгоритм: он не
          строит никакой общей зависимости, а каждый раз заново смотрит на ближайших соседей конкретного объекта.
          Зато если зависимость между признаками и таргетом нелинейная и «рваная», kNN часто справляется лучше
          линейной модели (хотя и не всегда). Главная плата за эту гибкость — скорость: поскольку для каждого
          нового объекта kNN пересчитывает расстояния до <strong>всех</strong> объектов обучающей выборки, на
          больших датасетах метод работает заметно медленнее линейных моделей.
        </P>
        <TheoryTable
          headers={['Критерий', 'Линейные модели', 'kNN']}
          rows={[
            ['Тип модели', 'параметрическая (коэффициенты β)', 'непараметрическая (память о данных)'],
            ['Интерпретируемость', 'да — веса признаков понятны', 'нет — «чёрный ящик» соседей'],
            ['Экстраполяция', 'умеет предсказывать за пределами известных данных', 'плохо работает на непохожих объектах'],
            ['Нелинейные зависимости', 'плохо улавливает', 'часто справляется лучше'],
            ['Скорость на больших данных', 'быстрая', 'медленная (считает расстояния до всех объектов)'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. kNN в библиотеке scikit-learn</h2>
        <P n={7}>
          В sklearn регрессионная версия метода реализована в классе <code>KNeighborsRegressor</code>, а
          классификационная — в <code>KNeighborsClassifier</code>. Как и любую модель, качество kNN стоит
          проверять через кросс-валидацию, а не на одном разбиении данных.
        </P>
        <TheoryCode language="python" code={`from sklearn.neighbors import KNeighborsRegressor
from sklearn.model_selection import KFold, cross_validate

splitter = KFold(n_splits=5, shuffle=True, random_state=33)

knn = KNeighborsRegressor(n_neighbors=3)

knn_cv = cross_validate(
    knn, X, Y,
    cv=splitter, scoring='neg_mean_squared_error',
    return_train_score=True,
)`} />
        <TheoryExample title="Когда kNN выигрывает у линейной регрессии">
          Если объекты, которые нужно предсказать, действительно похожи на объекты из обучающей выборки, а
          зависимость между признаками и таргетом нелинейна — kNN на практике часто ощутимо обгоняет линейную
          регрессию по качеству. Но стоит подать на вход модели объект, непохожий на всё, что она видела, —
          качество kNN резко падает, ведь у него попросту нет «соседей» рядом.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Как измеряют расстояние между объектами</h2>
        <P n={8}>
          Ключевой параметр kNN — то, как именно считается «похожесть» объектов. Универсальная формула — это{' '}
          <strong>расстояние Минковского</strong>, которое умеет превращаться в несколько разных метрик в
          зависимости от параметра p:
        </P>
        <Formula>ρ(x, z) = ( Σⱼ |xⱼ − zⱼ|ᵖ )^(1/p)</Formula>
        <P n={9}>
          При p = 2 расстояние Минковского превращается в привычное <strong>евклидово расстояние</strong> —
          «расстояние по прямой»:
        </P>
        <Formula>ρ(x, z) = √( Σⱼ (xⱼ − zⱼ)² )</Formula>
        <P n={10}>
          А при p = 1 получается <strong>манхэттенское расстояние</strong> — сумма расстояний по каждой оси
          отдельно, как если бы двигаться можно было только по «клеткам города», а не по прямой.
        </P>
        <Fig caption="Евклидово расстояние — кратчайший путь по прямой; манхэттенское — сумма шагов по осям, «городские кварталы».">
          <svg viewBox="0 0 380 150" width="380" height="150" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="110" r="5" fill="#20beff" />
            <circle cx="150" cy="30" r="5" fill="#20beff" />
            <line x1="40" y1="110" x2="150" y2="30" stroke="#60a5fa" strokeWidth="2" />
            <text x="95" y="65" fill="#60a5fa" fontSize="10" textAnchor="middle">евклидово (p=2)</text>

            <circle cx="230" cy="110" r="5" fill="#20beff" />
            <circle cx="340" cy="30" r="5" fill="#20beff" />
            <path d="M 230 110 L 230 30 L 340 30" fill="none" stroke="#f87171" strokeWidth="2" />
            <text x="285" y="145" fill="#f87171" fontSize="10" textAnchor="middle">манхэттенское (p=1)</text>
          </svg>
        </Fig>
        <P n={11}>
          Параметр p напрямую управляет тем, что модель считает «похожестью». При <strong>p меньше 1</strong>, с
          ростом разницы между объектами по конкретному признаку, вклад этой разницы в общее расстояние{' '}
          <strong>уменьшается</strong> — крупные отличия по одному признаку не так сильно «портят» общую похожесть.
          При <strong>p больше 1</strong>, наоборот, с ростом разницы по признаку её вклад в расстояние{' '}
          <strong>увеличивается</strong> — большие отличия начинают резко доминировать над мелкими.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Перевзвешивание соседей</h2>
        <P n={12}>
          В базовой версии алгоритма все k соседей вносят в предсказание <strong>одинаковый</strong> вклад — не
          важно, находится сосед вплотную к объекту или на самой границе выбранной k-окрестности. Логичнее было бы
          учитывать, что чем ближе сосед, тем весомее должен быть его голос. Для этого каждому соседу присваивают
          вес w, и таргет считают уже не простым, а <strong>взвешенным</strong> средним:
        </P>
        <Formula>a(x) = ( Σᵢ wᵢ · yᵢ ) / ( Σᵢ wᵢ )</Formula>
        <P n={13}>
          Осталось решить, как именно вычислять эти веса w. Разберём три распространённых подхода.
        </P>
        <TheoryTable
          headers={['Подход', 'Формула', 'Идея']}
          rows={[
            ['Степенная схема', 'wᵢ = qⁱ', 'вес убывает геометрически с номером соседа по удалённости; q — параметр от 0 до 1'],
            ['Линейно-убывающая схема', 'wᵢ = (k + 1 − i) / k', 'вес убывает линейно от ближайшего соседа к самому дальнему'],
            ['Гауссовское ядро', 'см. ниже', 'вес зависит напрямую от расстояния до объекта через гауссову функцию'],
          ]}
        />
        <P n={14}>
          Гауссовское ядро — самый гибкий из трёх подходов, потому что явно учитывает фактическое расстояние между
          объектами, а не просто порядковый номер соседа:
        </P>
        <Formula>wᵢ = (1 / √(2π)) · e^(−z² / 2), где z = ρ(x, xᵢ) / h</Formula>
        <P n={15}>
          Здесь ρ(x, xᵢ) — расстояние между новым объектом и соседом (например, евклидово), а h —{' '}
          <strong>гиперпараметр ширины окна</strong>: чем он меньше, тем резче падает вес с расстоянием, чем
          больше — тем плавнее.
        </P>
        <TheoryCode language="python" code={`import numpy as np

def kernel(distances, h):
    const = 1 / np.sqrt(2 * np.pi)
    power = (-1 / 2) * (distances ** 2) / h ** 2
    return const * np.exp(power)`} />
        <TheoryCode language="python" code={`from sklearn.neighbors import KNeighborsRegressor

for h in [0.01, 1, 10, 100, 500]:
    weights = kernel(distances, h=h)
    knn = KNeighborsRegressor(n_neighbors=8, weights=weights)
    knn.fit(X_train, y_train)
    preds_test = knn.predict(X_test)`} />
        <Fig caption="Малый h даёт узкое, «нервное» ядро — модель переобучается на шум. Большой h сглаживает предсказание.">
          <svg viewBox="0 0 400 150" width="400" height="150" xmlns="http://www.w3.org/2000/svg">
            <line x1="20" y1="120" x2="380" y2="120" stroke="#94a3b8" />
            <path d="M 40 118 C 55 30, 65 118, 80 20 C 95 118, 105 40, 120 118 C 135 25, 150 118, 165 35 C 180 118, 190 118, 200 118"
              fill="none" stroke="#f87171" strokeWidth="2" />
            <text x="120" y="140" fill="#f87171" fontSize="10" textAnchor="middle">h = 0.01 — переобучение, «рваная» кривая</text>

            <path d="M 220 100 C 250 60, 290 60, 320 90 C 340 100, 360 100, 380 95"
              fill="none" stroke="#4ade80" strokeWidth="2.5" />
            <text x="300" y="140" fill="#4ade80" fontSize="10" textAnchor="middle">h = 500 — гладкая, сглаженная кривая</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Масштабирование признаков — обязательный шаг</h2>
        <P n={16}>
          Расстояние между объектами напрямую зависит от масштаба признаков. Если один признак измеряется в
          диапазоне от 0 до 1, а другой — от 0 до миллиона, то расстояние почти целиком будет определяться вторым
          признаком, а первый практически не повлияет на результат — просто из-за разницы единиц измерения, а не
          потому что он менее важен по смыслу. Поэтому перед запуском kNN признаки почти всегда нужно{' '}
          <strong>масштабировать</strong> — привести к сопоставимому диапазону.
        </P>
        <Term name="StandardScaler">
          класс из sklearn, приводящий каждый признак к среднему 0 и стандартному отклонению 1 — после такого
          преобразования все признаки становятся сравнимы по масштабу, и расстояние между объектами честно отражает
          их реальную непохожесть по всем признакам сразу.
        </Term>
        <TheoryCode language="python" code={`from sklearn.pipeline import Pipeline
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

X_train, X_test, Y_train, Y_test = train_test_split(
    X, Y, random_state=0, test_size=0.2
)

pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('KNN', KNeighborsClassifier(weights=kernel)),
])

pipe.fit(X_train, Y_train)`} />
        <TheoryExample title="Зачем нужен Pipeline">
          Pipeline объединяет масштабирование и саму модель в единый объект: масштабирование обучается только на
          train и одинаково применяется к train и test, что исключает утечку информации из тестовой выборки —
          частую ошибку при ручном масштабировании данных.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={17}>
          <strong>kNN</strong> — метрический алгоритм, предсказывающий таргет нового объекта по его{' '}
          <strong>k ближайшим соседям</strong>: усреднением для регрессии, голосованием для классификации. Общий
          алгоритм: получить объект → посчитать расстояния до всех объектов обучения → выбрать k ближайших →
          усреднить или проголосовать. В отличие от параметрических линейных моделей, kNN ничего не «учит»
          заранее, зато хорошо ловит нелинейные зависимости и плохо работает на непохожих объектах и больших
          датасетах. Расстояние обычно считают через <strong>метрику Минковского</strong> (евклидово при p=2,
          манхэттенское при p=1), а вклад соседей можно <strong>перевзвешивать</strong> — например, через
          гауссовское ядро с гиперпараметром ширины h. И обязательный финальный шаг — <strong>масштабирование
          признаков</strong> через StandardScaler, без него расстояние будет искажено разницей единиц измерения.
        </P>
      </section>
    </div>
  )
}
