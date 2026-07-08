import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', green: '#4ade80', blue: '#60a5fa', red: '#f87171', indigo: '#818cf8', border: '#2a2a3a' }

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

function Formula({ children, note }) {
  return (
    <div style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 21, color: 'var(--text-primary)',
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10,
        padding: '14px 26px', textAlign: 'center', maxWidth: '100%', overflowX: 'auto',
      }}>{children}</div>
      {note && <div style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center' }}>{note}</div>}
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

function Step({ n, title, children }) {
  return (
    <div style={{ margin: '16px 0 16px 14px', paddingLeft: 16, borderLeft: '2px dashed var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          background: 'rgba(200,255,0,0.12)', color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700,
          padding: '3px 10px', borderRadius: 999, flexShrink: 0,
        }}>Шаг {n}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function FinalLabel({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '18px 0 8px' }}>
      <span style={{
        background: 'rgba(96,165,250,0.14)', color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700,
        padding: '3px 10px', borderRadius: 999,
      }}>✓ Собираем вместе</span>
      <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{children}</span>
    </div>
  )
}

const It = ({ children }) => <span style={{ fontStyle: 'italic' }}>{children}</span>
const Sub = ({ children }) => <sub style={{ fontSize: '0.7em' }}>{children}</sub>
const Sup = ({ children }) => <sup style={{ fontSize: '0.7em' }}>{children}</sup>

export default function July8GradientDescentTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Градиентный спуск</h1>
        <p className="theory-subtitle">Трек: Machine Learning</p>
        <p className="theory-date">8 июля 2026</p>
        <p>
          Градиентный спуск — главный алгоритм, которым обучается почти вся современная ML-модель, от линейной
          регрессии до огромных нейросетей. Сегодня — краткая, но полная сводка: сначала вспомним математику,
          которая для него нужна (производная, частная производная, градиент), а затем разберём сам алгоритм,
          его параметры и разновидности.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Функция одной переменной</h2>
        <P n={1}>
          <strong>Функция</strong> <It>f</It>(<It>x</It>) сопоставляет каждому числу <It>x</It> число{' '}
          <It>f</It>(<It>x</It>). В машинном обучении роль <It>x</It> обычно играют веса модели, а{' '}
          <It>f</It>(<It>x</It>) — функция потерь: чем она меньше, тем лучше модель. Задача обучения — найти{' '}
          <It>x</It>, при котором <It>f</It>(<It>x</It>) минимальна.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Производная</h2>
        <P n={2}>
          <strong>Производная</strong> <It>f</It>′(<It>x</It>) показывает, <strong>с какой скоростью
          меняется</strong> значение функции при малом изменении <It>x</It>. Геометрически это{' '}
          <strong>наклон касательной</strong> к графику функции в точке <It>x</It>.
        </P>
        <P n={3}>
          Знак производной говорит о поведении функции: если <It>f</It>′(<It>x</It>) &gt; 0 — функция{' '}
          <strong>растёт</strong> в этой точке; если <It>f</It>′(<It>x</It>) &lt; 0 — <strong>убывает</strong>;
          если <It>f</It>′(<It>x</It>) = 0 — точка «плоская» (кандидат в минимум, максимум или перегиб).
        </P>
        <Fig caption="Производная — наклон касательной. Справа от минимума производная положительна (функция растёт), слева — отрицательна (убывает), в самом минимуме — равна нулю">
          <svg viewBox="0 0 480 190" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="165" x2="450" y2="165" stroke={C.border} markerEnd="url(#dv1)" />
            <line x1="30" y1="175" x2="30" y2="20" stroke={C.border} markerEnd="url(#dv1)" />
            <path d="M60 40 Q240 320 420 40" fill="none" stroke={C.lime} strokeWidth="2.5" />
            <line x1="120" y1="60" x2="200" y2="140" stroke={C.red} strokeWidth="2" />
            <text x="115" y="52" fill={C.red} fontSize="10">f'&lt;0 (убывает)</text>
            <line x1="280" y1="140" x2="360" y2="60" stroke={C.green} strokeWidth="2" />
            <text x="300" y="52" fill={C.green} fontSize="10">f'&gt;0 (растёт)</text>
            <circle cx="240" cy="163" r="4" fill={C.blue} />
            <text x="240" y="180" fill={C.blue} fontSize="10" textAnchor="middle">f'=0 (минимум)</text>
            <defs>
              <marker id="dv1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Функция многих переменных</h2>
        <P n={4}>
          Реальные модели имеют не один вес, а много: <It>w</It><Sub>1</Sub>, <It>w</It><Sub>2</Sub>, …,{' '}
          <It>w</It><Sub>d</Sub>. Функция потерь тогда зависит от <strong>всех весов сразу</strong>:{' '}
          <It>Q</It>(<It>w</It><Sub>1</Sub>, …, <It>w</It><Sub>d</Sub>). Её график — уже не линия, а поверхность
          (при двух весах — что-то вроде рельефа местности с холмами и впадинами).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Частная производная</h2>
        <P n={5}>
          <strong>Частная производная</strong> по <It>w</It><Sub>i</Sub> (обозначается ∂<It>Q</It>/∂<It>w</It>
          <Sub>i</Sub>) — это обычная производная функции по одной переменной{' '}
          <It>w</It><Sub>i</Sub>, при этом <strong>все остальные веса считаются зафиксированными
          (постоянными)</strong>. Она показывает, как изменится <It>Q</It>, если чуть-чуть сдвинуть только{' '}
          <It>w</It><Sub>i</Sub>, не трогая остальные веса.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Градиент</h2>
        <P n={6}>
          <strong>Градиент</strong> ∇<It>Q</It>(<It>w</It>) — это <strong>вектор</strong>, составленный из всех
          частных производных функции по каждому весу. Он обобщает понятие производной на случай многих переменных.
        </P>
        <Formula note="вектор из d частных производных — по одной на каждый вес">
          ∇<It>Q</It>(<It>w</It>) = ( ∂<It>Q</It>/∂<It>w</It><Sub>1</Sub>, ∂<It>Q</It>/∂<It>w</It><Sub>2</Sub>, …, ∂<It>Q</It>/∂<It>w</It><Sub>d</Sub> )
        </Formula>
        <P n={7}>
          Ключевое свойство градиента: он указывает направление, в котором функция{' '}
          <strong>растёт быстрее всего</strong> (наискорейший рост). Поэтому, чтобы функцию{' '}
          <strong>уменьшить</strong>, нужно двигаться в направлении, <strong>противоположном</strong> градиенту —
          то есть по антиградиенту, −∇<It>Q</It>(<It>w</It>).
        </P>
        <Fig caption="На карте линий уровня (контурный график) градиент в точке всегда перпендикулярен линии уровня и направлен «в гору». Мы идём в обратную сторону — вниз, к минимуму">
          <svg viewBox="0 0 420 220" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
            {[80,60,40,20].map((r,i)=>(
              <ellipse key={i} cx="210" cy="110" rx={r*1.4} ry={r} fill="none" stroke={C.border} strokeWidth="1" />
            ))}
            <circle cx="210" cy="110" r="4" fill={C.red} />
            <text x="210" y="95" fill={C.red} fontSize="10" textAnchor="middle">минимум</text>
            <circle cx="320" cy="60" r="5" fill={C.blue} />
            <line x1="320" y1="60" x2="345" y2="35" stroke={C.green} strokeWidth="2" markerEnd="url(#gr1)" />
            <text x="360" y="30" fill={C.green} fontSize="10">∇Q (в гору)</text>
            <line x1="320" y1="60" x2="270" y2="90" stroke={C.lime} strokeWidth="2.5" markerEnd="url(#gr2)" />
            <text x="235" y="75" fill={C.lime} fontSize="10">−∇Q (спускаемся)</text>
            <defs>
              <marker id="gr1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.green} /></marker>
              <marker id="gr2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.lime} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Алгоритм градиентного спуска</h2>
        <P n={8}>
          Сам алгоритм — простое итеративное правило: посчитать градиент в текущей точке, сделать маленький шаг в
          сторону антиградиента, повторить. Разберём его сначала «руками» на простом примере, а затем оформим
          кодом.
        </P>
        <Formula note="η (эта) — темп обучения; повторяем, пока веса почти не перестанут меняться">
          <It>w</It><Sup>(t+1)</Sup> = <It>w</It><Sup>(t)</Sup> − <It>η</It> · ∇<It>Q</It>(<It>w</It><Sup>(t)</Sup>)
        </Formula>

        <Step n={1} title="Возьмём простую функцию и её производную">
          <p>
            Пусть <It>f</It>(<It>x</It>) = (<It>x</It> − 3)² — у неё минимум в точке <It>x</It> = 3 (это легко
            проверить и без спуска, но так удобно следить за прогрессом). Производная:{' '}
            <It>f</It>′(<It>x</It>) = 2(<It>x</It> − 3).
          </p>
        </Step>

        <Step n={2} title="Стартуем из произвольной точки и делаем первый шаг">
          <p>
            Начнём с <It>x</It><Sup>(0)</Sup> = 10 и возьмём темп обучения <It>η</It> = 0.1. Считаем градиент в
            этой точке и делаем шаг по формуле выше.
          </p>
          <TheoryCode language="text" code={`f'(10) = 2 * (10 - 3) = 14
x(1) = x(0) − η · f'(x(0)) = 10 − 0.1 · 14 = 10 − 1.4 = 8.6`} />
        </Step>

        <Step n={3} title="Повторяем ещё пару шагов">
          <p>Точка стала ближе к минимуму (3). Продолжаем ровно ту же процедуру от новой точки.</p>
          <TheoryCode language="text" code={`f'(8.6) = 2 * (8.6 - 3) = 11.2
x(2) = 8.6 − 0.1 · 11.2 = 7.48

f'(7.48) = 2 * (7.48 - 3) = 8.96
x(3) = 7.48 − 0.1 · 8.96 = 6.584`} />
          <p>
            Видно, что с каждым шагом <It>x</It> подходит к 3 всё ближе, а сам шаг (изменение <It>x</It>)
            становится всё меньше — потому что чем ближе к минимуму, тем меньше производная (это и есть замедление
            вблизи дна параболы).
          </p>
        </Step>

        <Step n={4} title="Автоматизируем то же самое в цикле">
          <p>
            То, что мы только что делали вручную — это ровно то, что делает алгоритм на каждой итерации. Осталось
            обернуть это в цикл на нужное число шагов.
          </p>
          <TheoryCode language="python" code={`w = np.zeros(d)          # начальные веса (например, нули)

for step in range(n_steps):
    grad = compute_gradient(w, X, y)   # градиент функции потерь в точке w
    w = w - lr * grad                  # шаг против градиента — та же формула, что считали руками

# w — итоговые (обученные) веса`} />
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Темп обучения (learning rate)</h2>
        <P n={9}>
          <It>η</It> задаёт размер шага. Слишком маленький — обучение сходится очень медленно, тратится много
          лишних итераций. Слишком большой — шаги «перепрыгивают» минимум и алгоритм расходится (ошибка растёт
          вместо того, чтобы падать). Это главный гиперпараметр, который подбирают под конкретную задачу.
        </P>
        <Fig caption="Маленький η — медленная, но верная сходимость. Большой η — шаги перепрыгивают минимум, ошибка может даже расти">
          <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <text x="120" y="16" fill={C.blue} fontSize="11" fontWeight="700" textAnchor="middle">маленький η</text>
            <path d="M40 30 Q120 150 200 30" fill="none" stroke={C.border} strokeWidth="2" />
            {[[55,45],[70,65],[85,85],[100,100],[115,108],[130,105],[145,95]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={C.blue} />))}
            <text x="340" y="16" fill={C.red} fontSize="11" fontWeight="700" textAnchor="middle">большой η</text>
            <path d="M260 30 Q340 150 420 30" fill="none" stroke={C.border} strokeWidth="2" />
            {[[275,45],[400,40],[280,50],[395,45],[290,55]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="3" fill={C.red} />))}
            <text x="340" y="165" fill={C.sub} fontSize="9" textAnchor="middle">скачет из стороны в сторону, может разойтись</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Критерий остановки</h2>
        <P n={10}>
          Спуск нельзя продолжать бесконечно. Останавливают алгоритм по одному из признаков: достигнуто
          заданное число итераций; функция потерь перестала заметно уменьшаться между шагами; норма (длина)
          градиента стала очень маленькой — значит, мы почти в точке минимума.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Виды градиентного спуска</h2>
        <P n={11}>
          Градиент можно считать по-разному в зависимости от того, сколько объектов обучающей выборки используют
          на каждом шаге.
        </P>
        <TheoryTable
          headers={['Вид', 'Данные на шаге', 'Плюсы / минусы']}
          rows={[
            ['Batch (полный)', 'весь датасет сразу', 'точный градиент, но медленный шаг на больших данных'],
            ['Stochastic (SGD)', 'один случайный объект', 'быстрые шаги, но «шумная», нестабильная траектория'],
            ['Mini-batch', 'небольшая случайная пачка (напр. 32-256)', 'баланс скорости и стабильности — стандарт на практике'],
          ]}
        />
        <TheoryExample title="Почему mini-batch — стандарт">
          Полный batch даёт самый гладкий спуск, но на миллионах примеров один шаг стоит очень дорого. SGD дешёвый,
          но траектория «дёргается». Mini-batch берёт лучшее от обоих: считается быстро и достаточно стабильно, к
          тому же хорошо ложится на параллельные вычисления GPU.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Локальные и глобальные минимумы</h2>
        <P n={12}>
          Если у функции потерь несколько «впадин», градиентный спуск может застрять в{' '}
          <strong>локальном минимуме</strong> — точке, которая лучше соседних, но хуже{' '}
          <strong>глобального минимума</strong> (самой глубокой впадины во всей функции). Для{' '}
          <strong>выпуклых</strong> функций (например, MSE в линейной регрессии) эта проблема не возникает — у них
          ровно один минимум, и он одновременно и локальный, и глобальный, так что градиентный спуск гарантированно
          его найдёт.
        </P>
        <Fig caption="У выпуклой функции (слева) один минимум — спуск всегда его найдёт. У невыпуклой (справа) есть локальные впадины, где спуск может застрять">
          <svg viewBox="0 0 480 150" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <text x="120" y="16" fill={C.lime} fontSize="11" fontWeight="700" textAnchor="middle">выпуклая</text>
            <path d="M40 40 Q120 140 200 40" fill="none" stroke={C.lime} strokeWidth="2.5" />
            <text x="360" y="16" fill={C.red} fontSize="11" fontWeight="700" textAnchor="middle">невыпуклая</text>
            <path d="M260 40 Q290 100 320 70 Q350 45 380 100 Q400 130 420 40" fill="none" stroke={C.red} strokeWidth="2.5" />
            <circle cx="320" cy="70" r="4" fill={C.blue} />
            <text x="320" y="60" fill={C.blue} fontSize="9" textAnchor="middle">локальный</text>
            <circle cx="380" cy="100" r="4" fill={C.text} />
            <text x="380" y="130" fill={C.text} fontSize="9" textAnchor="middle">глобальный</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. Улучшения (для общего кругозора)</h2>
        <P n={13}>
          Базовый градиентный спуск улучшают дополнительными приёмами: <strong>momentum</strong> («инерция»)
          сглаживает траекторию, учитывая направление предыдущих шагов, а адаптивные методы вроде{' '}
          <strong>Adam</strong> автоматически подстраивают темп обучения для каждого веса отдельно. Подробно эти
          методы не понадобятся сегодня — достаточно знать названия и общую идею: они делают спуск быстрее и
          устойчивее на сложных, невыпуклых функциях (таких как в нейросетях).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={14}>
          Производная показывает скорость и направление изменения функции одной переменной; частная производная —
          то же самое по одной из многих переменных при фиксированных остальных; градиент — вектор всех частных
          производных, указывающий направление наискорейшего роста. Двигаясь <strong>против</strong> градиента с
          шагом <It>η</It>, мы уменьшаем функцию потерь — это и есть градиентный спуск{' '}
          <It>w</It> := <It>w</It> − <It>η</It>∇<It>Q</It>(<It>w</It>). Размер выборки на шаге даёт варианты{' '}
          <strong>batch/SGD/mini-batch</strong>, а форма функции потерь определяет, найдём ли мы гарантированно
          глобальный минимум (выпуклые функции) или рискуем застрять в локальном (невыпуклые).
        </P>
      </section>
    </div>
  )
}
