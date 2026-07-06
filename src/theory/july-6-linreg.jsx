import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', green: '#4ade80', blue: '#60a5fa', red: '#f87171', border: '#2a2a3a' }

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

// Формула по центру, «математическим» стилем
function Formula({ children, note }) {
  return (
    <div style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, color: 'var(--text-primary)',
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10,
        padding: '16px 28px', textAlign: 'center', maxWidth: '100%', overflowX: 'auto',
      }}>{children}</div>
      {note && <div style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center' }}>{note}</div>}
    </div>
  )
}

const It = ({ children }) => <span style={{ fontStyle: 'italic' }}>{children}</span>
const Sub = ({ children }) => <sub style={{ fontSize: '0.7em' }}>{children}</sub>
const Sup = ({ children }) => <sup style={{ fontSize: '0.7em' }}>{children}</sup>

export default function July6LinRegTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Линейная регрессия + практика</h1>
        <p className="theory-subtitle">Трек: Machine Learning</p>
        <p className="theory-date">6 июля 2026</p>
        <p>
          Сегодня разберём первую и самую важную модель машинного обучения — <strong>линейную регрессию</strong>.
          Она проста, но на ней держится половина всего ML: понимание весов, функции потерь, обучения и
          градиентного спуска пригодится в любой более сложной модели, вплоть до нейросетей. Пройдём весь путь:
          от того, что такое обучение с учителем, до двух способов найти веса модели — точной формулой и
          градиентным спуском — и сравним, когда какой выгоднее.
        </p>
      </section>

      {/* Обучение с учителем и без */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Обучение с учителем и без учителя</h2>
        <p>Все задачи машинного обучения грубо делятся на два больших типа по тому, есть ли «правильные ответы».</p>
        <Term name="Обучение с учителем (supervised)">
          у нас есть <strong>размеченные данные</strong>: для каждого объекта известен правильный ответ{' '}
          <It>y</It> (цена квартиры, класс письма «спам/не спам»). Модель учится по парам «объект → ответ»
          предсказывать <It>y</It> для новых объектов.
        </Term>
        <Term name="Обучение без учителя (unsupervised)">
          ответов <It>y</It> <strong>нет</strong> — есть только объекты. Модель сама ищет в них структуру:
          группирует похожие (кластеризация), снижает размерность, находит аномалии.
        </Term>
        <Fig caption="С учителем: у каждого объекта есть ответ y, модель учится его предсказывать. Без учителя: ответов нет, модель сама находит группы">
          <svg viewBox="0 0 560 200" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <text x="140" y="22" fill={C.green} fontSize="13" fontWeight="700" textAnchor="middle">С учителем</text>
            <line x1="40" y1="160" x2="260" y2="160" stroke={C.border} strokeWidth="1" />
            <line x1="40" y1="160" x2="40" y2="40" stroke={C.border} strokeWidth="1" />
            {[[70,140],[110,120],[150,105],[190,80],[230,60]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill={C.green} />
            ))}
            <line x1="55" y1="150" x2="245" y2="52" stroke={C.lime} strokeWidth="2" />
            <text x="150" y="185" fill={C.sub} fontSize="10" textAnchor="middle">x → предсказываем y</text>
            <text x="420" y="22" fill={C.blue} fontSize="13" fontWeight="700" textAnchor="middle">Без учителя</text>
            {[[340,70],[355,90],[330,100],[420,140],[440,120],[410,150]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill={i<3?C.blue:C.red} />
            ))}
            <ellipse cx="342" cy="87" rx="35" ry="30" fill="none" stroke={C.blue} strokeDasharray="4 3" />
            <ellipse cx="423" cy="137" rx="35" ry="28" fill="none" stroke={C.red} strokeDasharray="4 3" />
            <text x="410" y="185" fill={C.sub} fontSize="10" textAnchor="middle">сами находим группы</text>
          </svg>
        </Fig>
      </section>

      {/* Классификация и регрессия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. С учителем: классификация и регрессия</h2>
        <p>Задачи с учителем, в свою очередь, делятся на две по тому, <strong>какой ответ</strong> мы предсказываем.</p>
        <Term name="Классификация">
          ответ — <strong>категория</strong> из конечного набора: спам / не спам, кошка / собака / птица,
          «одобрить кредит» / «отказать». Предсказываем метку класса.
        </Term>
        <Term name="Регрессия">
          ответ — <strong>число</strong> на непрерывной шкале: цена квартиры, температура завтра, спрос на товар.
          Именно регрессией мы и займёмся.
        </Term>
        <Fig caption="Классификация ищет границу между классами. Регрессия ищет линию, приближающую числовые значения">
          <svg viewBox="0 0 560 210" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <text x="140" y="20" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Классификация</text>
            <line x1="40" y1="180" x2="260" y2="180" stroke={C.border} />
            <line x1="40" y1="180" x2="40" y2="40" stroke={C.border} />
            {[[70,150],[95,120],[120,155],[85,95]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="5" fill={C.blue} />))}
            {[[200,80],[220,110],[175,70],[230,60]].map(([x,y],i)=>(<rect key={i} x={x-4} y={y-4} width="8" height="8" fill={C.red} />))}
            <line x1="60" y1="60" x2="240" y2="170" stroke={C.lime} strokeWidth="2" strokeDasharray="6 3" />
            <text x="150" y="200" fill={C.sub} fontSize="10" textAnchor="middle">граница между классами</text>
            <text x="420" y="20" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Регрессия</text>
            <line x1="320" y1="180" x2="540" y2="180" stroke={C.border} />
            <line x1="320" y1="180" x2="320" y2="40" stroke={C.border} />
            {[[350,160],[380,140],[410,125],[440,95],[470,85],[500,60]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="5" fill={C.green} />))}
            <line x1="335" y1="168" x2="525" y2="58" stroke={C.lime} strokeWidth="2" />
            <text x="430" y="200" fill={C.sub} fontSize="10" textAnchor="middle">линия приближает числа</text>
          </svg>
        </Fig>
      </section>

      {/* Линейная функция */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Что такое линейная функция</h2>
        <p>
          <strong>Линейная функция</strong> одной переменной — это <It>y</It> = <It>k</It>·<It>x</It> + <It>b</It>:
          её график — прямая. Коэффициент <It>k</It> задаёт наклон (насколько <It>y</It> растёт при росте{' '}
          <It>x</It>), а <It>b</It> — сдвиг по вертикали (значение при <It>x</It> = 0). «Линейная» значит, что
          переменные входят только в первой степени и лишь складываются — без квадратов, произведений и т.п.
        </p>
        <Fig caption="Линейная функция y = kx + b: k — наклон прямой, b — точка пересечения с осью y">
          <svg viewBox="0 0 460 220" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="190" x2="430" y2="190" stroke={C.border} markerEnd="url(#lax)" />
            <line x1="40" y1="200" x2="40" y2="20" stroke={C.border} markerEnd="url(#lay)" />
            <text x="425" y="205" fill={C.sub} fontSize="12">x</text>
            <text x="24" y="30" fill={C.sub} fontSize="12">y</text>
            <line x1="60" y1="150" x2="410" y2="50" stroke={C.lime} strokeWidth="2.5" />
            <circle cx="40" cy="161" r="4" fill={C.red} />
            <text x="52" y="178" fill={C.red} fontSize="12">b (сдвиг)</text>
            <path d="M250 106 l40 0" stroke={C.green} strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M290 106 l0 -11" stroke={C.green} strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="300" y="95" fill={C.green} fontSize="11">k (наклон)</text>
            <defs>
              <marker id="lax" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
              <marker id="lay" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
            </defs>
          </svg>
        </Fig>
        <p>
          Когда признаков много (<It>x</It><Sub>1</Sub>, <It>x</It><Sub>2</Sub>, …, <It>x</It><Sub>d</Sub>),
          линейная функция обобщается: каждый признак умножается на свой вес, всё складывается, и добавляется
          свободный член <It>w</It><Sub>0</Sub>:
        </p>
        <Formula note="d признаков, у каждого свой вес wⱼ; w₀ — свободный член (bias, сдвиг)">
          <It>y</It> = <It>w</It><Sub>1</Sub><It>x</It><Sub>1</Sub> + <It>w</It><Sub>2</Sub><It>x</It><Sub>2</Sub> + … + <It>w</It><Sub>d</Sub><It>x</It><Sub>d</Sub> + <It>w</It><Sub>0</Sub>
        </Formula>
      </section>

      {/* One-hot */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. One-hot кодирование категориальных признаков</h2>
        <p>
          Линейная модель умеет умножать веса только на <strong>числа</strong>. Но часть признаков —{' '}
          <strong>категориальные</strong>: город, цвет, тип жилья. Просто занумеровать их (Москва=1, Казань=2,
          Сочи=3) нельзя: модель решит, что Сочи «в три раза больше» Москвы, хотя это бессмысленно.
        </p>
        <Term name="One-hot кодирование">
          каждую категорию превращаем в <strong>отдельный столбец-флаг</strong> из 0 и 1. Для объекта в нужном
          столбце стоит 1 («горячая» единица), в остальных — 0. Так порядок между категориями исчезает.
        </Term>
        <Fig caption="Один категориальный столбец «Город» превращается в несколько столбцов-флагов (0/1) — по одному на каждую категорию">
          <svg viewBox="0 0 560 170" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <text x="90" y="24" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Город</text>
            {['Москва','Казань','Сочи'].map((c,i)=>(
              <g key={i}>
                <rect x="40" y={36+i*34} width="100" height="28" rx="4" fill="var(--bg-tertiary)" stroke={C.border} />
                <text x="90" y={54+i*34} fill={C.sub} fontSize="11" textAnchor="middle">{c}</text>
              </g>
            ))}
            <line x1="150" y1="90" x2="210" y2="90" stroke={C.sub} strokeWidth="2" markerEnd="url(#oh)" />
            {['Москва','Казань','Сочи'].map((c,j)=>(
              <text key={j} x={260+j*90} y="24" fill={C.green} fontSize="11" fontWeight="700" textAnchor="middle">{'is_'+({'Москва':'msk','Казань':'kzn','Сочи':'sochi'})[c]}</text>
            ))}
            {[[1,0,0],[0,1,0],[0,0,1]].map((row,i)=>row.map((v,j)=>(
              <g key={`${i}-${j}`}>
                <rect x={225+j*90} y={36+i*34} width="70" height="28" rx="4"
                  fill={v?'rgba(74,222,128,0.18)':'var(--bg-tertiary)'} stroke={v?C.green:C.border} />
                <text x={260+j*90} y={54+i*34} fill={v?C.green:C.sub} fontSize="12" fontWeight={v?700:400} textAnchor="middle">{v}</text>
              </g>
            )))}
            <defs>
              <marker id="oh" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`import pandas as pd

df = pd.DataFrame({'city': ['Москва', 'Казань', 'Сочи']})
pd.get_dummies(df, columns=['city'])   # автоматически строит one-hot столбцы
#    city_Казань  city_Москва  city_Сочи
# 0            0            1          0
# 1            1            0          0
# 2            0            0          1`} />
      </section>

      {/* Feature engineering */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Feature engineering — коротко</h2>
        <Term name="Feature engineering (инженерия признаков)">
          создание и преобразование признаков, чтобы модели было легче найти зависимость. One-hot — частный
          случай. Сюда же: масштабирование чисел, извлечение «день недели» из даты, создание новых признаков
          (площадь = длина × ширина), логарифмирование, удаление бесполезных колонок.
        </Term>
        <p>
          <strong>Зачем нужен:</strong> линейная модель сама по себе видит только линейные связи. Хорошие признаки
          «подсказывают» ей закономерность — и часто грамотный feature engineering даёт больший прирост качества,
          чем замена модели на более сложную. Отсюда поговорка: <em>«данные и признаки важнее алгоритма»</em>.
        </p>
      </section>

      {/* Линейная регрессия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Что такое линейная регрессия</h2>
        <p>
          <strong>Линейная регрессия</strong> — модель, которая предсказывает число как линейную комбинацию
          признаков. Для объекта <It>x</It><Sub>i</Sub> (вектор из <It>d</It> признаков) предсказание записывают
          через <strong>скалярное произведение</strong> вектора весов <It>w</It> и вектора признаков плюс сдвиг:
        </p>
        <Formula note="⟨w, xᵢ⟩ = w₁xᵢ₁ + … + w_d x_id — скалярное произведение весов и признаков объекта">
          <It>ŷ</It><Sub>i</Sub> = ⟨<It>w</It>, <It>x</It><Sub>i</Sub>⟩ + <It>w</It><Sub>0</Sub>
        </Formula>
        <p>
          Отдельный <It>w</It><Sub>0</Sub> писать неудобно. Есть красивый трюк: <strong>добавим к каждому объекту
          фиктивный признак-столбец из единиц</strong>. Тогда за сдвиг будет отвечать вес при этой единице, и
          формула схлопывается в одно скалярное произведение — <It>w</It><Sub>0</Sub> просто становится нулевой
          компонентой вектора <It>w</It>:
        </p>
        <Formula note="добавили x_i0 = 1, теперь w₀ — обычный вес; отдельное слагаемое не нужно">
          <It>ŷ</It><Sub>i</Sub> = ⟨<It>w</It>, <It>x</It><Sub>i</Sub>⟩,&nbsp;&nbsp; где <It>x</It><Sub>i0</Sub> = 1
        </Formula>
        <Fig caption="Bias trick: слева к матрице объектов X дописывается столбец единиц. Тогда w₀ — обычный вес, и отдельное слагаемое не нужно">
          <svg viewBox="0 0 520 150" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            <text x="90" y="20" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">было: X</text>
            {[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]].map(([r,c],i)=>(
              <rect key={i} x={60+c*46} y={34+r*32} width="42" height="28" rx="3" fill="var(--bg-tertiary)" stroke={C.border} />
            ))}
            <text x="290" y="20" fill={C.green} fontSize="12" fontWeight="700" textAnchor="middle">стало: [1 | X]</text>
            {[0,1,2].map(r=>(
              <rect key={'o'+r} x={230} y={34+r*32} width="42" height="28" rx="3" fill="rgba(74,222,128,0.18)" stroke={C.green} />
            ))}
            {[0,1,2].map(r=>(<text key={'ot'+r} x={251} y={52+r*32} fill={C.green} fontSize="12" fontWeight="700" textAnchor="middle">1</text>))}
            {[[0,0],[0,1],[1,0],[1,1],[2,0],[2,1]].map(([r,c],i)=>(
              <rect key={'n'+i} x={278+c*46} y={34+r*32} width="42" height="28" rx="3" fill="var(--bg-tertiary)" stroke={C.border} />
            ))}
          </svg>
        </Fig>
      </section>

      {/* Функция потерь */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Цель обучения и функция потерь</h2>
        <p>
          У нас есть настоящие ответы <It>y</It><Sub>i</Sub> и предсказания модели <It>ŷ</It><Sub>i</Sub>. Наша{' '}
          <strong>цель</strong> — подобрать веса <It>w</It> так, чтобы функция <It>f</It> как можно точнее{' '}
          <strong>приближала предсказания к настоящим значениям</strong> <It>y</It>. Но «точнее» надо измерить
          числом — для этого вводят функцию потерь.
        </p>
        <Term name="Функция потерь (loss)">
          число, показывающее, насколько сильно предсказания модели расходятся с правильными ответами. Чем меньше
          — тем лучше модель. Обучение = поиск весов, минимизирующих функцию потерь.
        </Term>
        <p>
          Для регрессии берут <strong>квадратичную функцию потерь (MSE, среднеквадратичную ошибку)</strong>:
          усредняем квадраты отклонений. Квадрат нужен, чтобы (а) знак ошибки не важен и (б) большие промахи
          штрафовались сильнее:
        </p>
        <Formula note="MSE — среднее квадратов разностей между предсказанием ⟨w,xᵢ⟩ и настоящим ответом yᵢ">
          <It>Q</It>(<It>w</It>) = <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle', fontSize: '0.7em' }}><span>1</span><span style={{ borderTop: '1px solid currentColor' }}>N</span></span> ∑<Sub>i=1..N</Sub> (⟨<It>w</It>, <It>x</It><Sub>i</Sub>⟩ − <It>y</It><Sub>i</Sub>)<Sup>2</Sup> → min
        </Formula>
        <Fig caption="MSE как функция веса — парабола с единственным минимумом. Задача обучения: найти дно (оптимальные веса w*)">
          <svg viewBox="0 0 460 210" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="185" x2="430" y2="185" stroke={C.border} markerEnd="url(#qx)" />
            <line x1="40" y1="195" x2="40" y2="20" stroke={C.border} markerEnd="url(#qy)" />
            <text x="420" y="203" fill={C.sub} fontSize="12">w</text>
            <text x="16" y="30" fill={C.sub} fontSize="12">Q(w)</text>
            <path d="M70 40 Q235 340 400 40" fill="none" stroke={C.lime} strokeWidth="2.5" />
            <circle cx="235" cy="170" r="5" fill={C.red} />
            <line x1="235" y1="170" x2="235" y2="185" stroke={C.red} strokeDasharray="3 2" />
            <text x="235" y="200" fill={C.red} fontSize="11" textAnchor="middle">w*</text>
            <text x="270" y="168" fill={C.red} fontSize="11">минимум ошибки</text>
            <defs>
              <marker id="qx" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
              <marker id="qy" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Аналитическое решение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Точное решение: аналитическая формула</h2>
        <p>
          Для MSE минимум можно найти <strong>точно, одной формулой</strong> — не перебирая веса. Если собрать все
          объекты в матрицу <It>X</It> (строки — объекты, столбцы — признаки, включая столбец единиц), а ответы —
          в вектор <It>y</It>, то оптимальные веса даёт <strong>нормальное уравнение</strong>:
        </p>
        <Formula note="X — матрица объектов (N×D), y — вектор ответов, Xᵀ — транспонирование, ⁻¹ — обратная матрица">
          <It>w</It><sup style={{ fontSize: '0.7em' }}>*</sup> = (<It>X</It><Sup>T</Sup><It>X</It>)<Sup>−1</Sup> <It>X</It><Sup>T</Sup><It>y</It>
        </Formula>
        <TheoryCode language="python" code={`import numpy as np

# X — матрица объектов (со столбцом единиц), y — вектор ответов
# @ — матричное умножение, .T — транспонирование, np.linalg.inv — обратная матрица
w = np.linalg.inv(X.T @ X) @ X.T @ y

# предсказание для новых объектов
y_pred = X_new @ w`} />
        <TheoryExample title="Плюс и минус формулы">
          Плюс — точный ответ за один расчёт, без настройки параметров. Минус — внутри есть обращение матрицы{' '}
          <It>X</It><Sup>T</Sup><It>X</It> размера <It>D</It>×<It>D</It>. Это тяжело, когда признаков{' '}
          <It>D</It> очень много (см. сложность ниже).
        </TheoryExample>
      </section>

      {/* Градиентный спуск */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Градиентный спуск</h2>
        <p>
          Второй способ найти минимум — <strong>градиентный спуск</strong>: не считать всё сразу, а идти к дну
          параболы маленькими шагами. Градиент ∇<It>Q</It>(<It>w</It>) показывает направление наискорейшего{' '}
          <strong>роста</strong> функции потерь, поэтому мы шагаем в <strong>противоположную</strong> сторону:
        </p>
        <Formula note="η (эта) — темп обучения (learning rate); ∇Q(w) — градиент функции потерь по весам">
          <It>w</It><Sup>(t+1)</Sup> = <It>w</It><Sup>(t)</Sup> − <It>η</It> · ∇<It>Q</It>(<It>w</It><Sup>(t)</Sup>)
        </Formula>
        <Term name="Темп обучения η (learning rate)">
          размер шага. Слишком маленький — обучение идёт мучительно долго. Слишком большой — шаги «перепрыгивают»
          минимум, и процесс расходится. Это главный <strong>гиперпараметр</strong>, который подбирают.
        </Term>
        <Fig caption="Градиентный спуск: из случайной точки шагаем против градиента вниз по параболе, шаг за шагом приближаясь к минимуму w*">
          <svg viewBox="0 0 460 210" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="185" x2="430" y2="185" stroke={C.border} />
            <line x1="40" y1="195" x2="40" y2="20" stroke={C.border} />
            <text x="16" y="30" fill={C.sub} fontSize="12">Q(w)</text>
            <path d="M70 40 Q235 340 400 40" fill="none" stroke={C.lime} strokeWidth="2.5" />
            {[[95,110],[130,150],[175,172],[215,169]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill={i===3?C.red:C.green} />
            ))}
            {[[95,110,130,150],[130,150,175,172],[175,172,215,169]].map(([x1,y1,x2,y2],i)=>(
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={C.green} strokeWidth="1.5" markerEnd="url(#gd)" />
            ))}
            <circle cx="235" cy="170" r="5" fill={C.red} />
            <text x="245" y="165" fill={C.red} fontSize="11">w*</text>
            <text x="95" y="100" fill={C.green} fontSize="10" textAnchor="middle">старт</text>
            <defs>
              <marker id="gd" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.green} /></marker>
            </defs>
          </svg>
        </Fig>
        <p>
          <strong>В чём преимущество перед точной формулой?</strong> Сравним вычислительную сложность, где{' '}
          <It>N</It> — число объектов, <It>D</It> — число признаков, <It>S</It> — число шагов (итераций):
        </p>
        <TheoryTable
          headers={['Метод', 'Сложность', 'Когда выгоден']}
          rows={[
            ['Точная формула (XᵀX)⁻¹Xᵀy', 'O(D²·N + D³)', 'мало признаков D; данные влезают в память'],
            ['Градиентный спуск', 'O(N·D·S)', 'много признаков D и/или объектов N'],
          ]}
        />
        <p>
          У точной формулы есть слагаемое <It>D</It><Sup>3</Sup> (обращение матрицы <It>D</It>×<It>D</It>): при
          большом числе признаков оно взрывается — например, при <It>D</It> = 10000 это 10<Sup>12</Sup>{' '}
          операций. У градиентного спуска <It>D</It> входит только в <strong>первой степени</strong> —{' '}
          O(<It>N·D·S</It>) растёт куда медленнее. Поэтому на больших и «широких» данных (много признаков)
          градиентный спуск практичнее, а его вариант — <em>стохастический градиентный спуск (SGD)</em> — лежит в
          основе обучения почти всех современных моделей, включая нейросети.
        </p>
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          Обучение с учителем делится на <strong>классификацию</strong> (предсказываем класс) и{' '}
          <strong>регрессию</strong> (предсказываем число). <strong>Линейная регрессия</strong> моделирует ответ
          как ⟨<It>w</It>, <It>x</It><Sub>i</Sub>⟩ + <It>w</It><Sub>0</Sub> (а с трюком «столбец единиц» — просто
          ⟨<It>w</It>, <It>x</It><Sub>i</Sub>⟩). Категориальные признаки кодируют <strong>one-hot</strong>, а
          осмысленный <strong>feature engineering</strong> часто важнее выбора модели. Веса ищут, минимизируя{' '}
          <strong>квадратичную функцию потерь (MSE)</strong> — либо точной формулой{' '}
          <It>w</It> = (<It>X</It><Sup>T</Sup><It>X</It>)<Sup>−1</Sup><It>X</It><Sup>T</Sup><It>y</It>, либо{' '}
          <strong>градиентным спуском</strong> с темпом обучения <It>η</It>. Формула точна, но тяжела при большом{' '}
          <It>D</It> (O(<It>D</It><Sup>3</Sup>)); градиентный спуск (O(<It>N·D·S</It>)) выигрывает на больших
          данных и лежит в основе всего современного ML.
        </p>
      </section>
    </div>
  )
}
