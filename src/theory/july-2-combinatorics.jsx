import { TheoryTable, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', border: '#2a2a3a' }

function Formula({ children }) {
  return (
    <div style={{
      background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 8,
      padding: '14px 18px', margin: '14px 0', textAlign: 'center',
      fontFamily: '"Cambria Math", Georgia, "Times New Roman", serif', fontSize: 18,
      color: 'var(--text-primary)', overflowX: 'auto', lineHeight: 1.7,
    }}>{children}</div>
  )
}

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 620, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center' }}>{caption}</figcaption>}
    </figure>
  )
}

/* Разбор решения примера */
function Solve({ task, children }) {
  return (
    <div style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 10, padding: '14px 16px', margin: '14px 0' }}>
      <div style={{ color: '#818cf8', fontWeight: 700, fontSize: 13.5, marginBottom: 8 }}>📝 Задача. {task}</div>
      <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Решение</div>
      <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>{children}</div>
    </div>
  )
}

export default function July2CombinatoricsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Комбинаторика и основы теории вероятностей</h1>
        <p className="theory-subtitle">Трек: Аналитика</p>
        <p className="theory-date">2 июля 2026</p>
        <p>
          Комбинаторика — раздел математики, который отвечает на вопрос «сколькими способами?». Сколькими
          способами рассадить гостей, составить пароль, выбрать команду. Эти подсчёты — фундамент теории
          вероятностей: чтобы найти вероятность события, почти всегда нужно посчитать число благоприятных и
          общее число исходов.
        </p>
      </section>

      {/* Правила */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Два базовых правила подсчёта</h2>

        <h3 className="theory-heading-3">Правило суммы (выбор «или»)</h3>
        <p>
          Если объект A можно выбрать m способами, а объект B — n способами, и эти способы <strong>не
          пересекаются</strong>, то выбрать «A <strong>или</strong> B» можно <strong>m + n</strong> способами.
          Ключевое слово — «или», варианты взаимоисключающие.
        </p>
        <Solve task="В вазе 3 яблока и 4 груши. Сколькими способами взять один фрукт?">
          <strong>1.</strong> Определяем тип задачи. Мы берём <strong>один</strong> фрукт — либо яблоко, либо
          грушу. Эти варианты взаимоисключающие (нельзя взять одновременно и яблоко, и грушу за один выбор) →
          работает <strong>правило суммы</strong>.<br />
          <strong>2.</strong> Считаем варианты по каждой группе: яблоко можно взять 3 способами (яблоки разные),
          грушу — 4 способами.<br />
          <strong>3.</strong> Складываем: 3 + 4 = <strong>7</strong>.<br />
          <strong>Ответ:</strong> взять один фрукт можно <strong>7</strong> способами.
        </Solve>

        <h3 className="theory-heading-3">Правило произведения (выбор «и»)</h3>
        <p>
          Если сначала объект A выбирается m способами, а затем объект B — n способами, то пару (A <strong>и</strong> B)
          можно выбрать <strong>m × n</strong> способами. Ключевое слово — «и», выбор последовательный.
        </p>
        <Fig caption="Правило произведения: 3 варианта футболки × 2 варианта штанов = 6 разных нарядов">
          <svg viewBox="0 0 520 200" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            {['A','B','C'].map((t,i)=>(
              <g key={i}>
                <circle cx="70" cy={40+i*60} r="18" fill="rgba(129,140,248,0.2)" stroke="#818cf8" />
                <text x="70" y={45+i*60} fill={C.text} fontSize="13" textAnchor="middle">{t}</text>
              </g>
            ))}
            {['1','2'].map((t,i)=>(
              <g key={i}>
                <circle cx="440" cy={70+i*60} r="18" fill="rgba(200,255,0,0.15)" stroke={C.lime} />
                <text x="440" y={75+i*60} fill={C.text} fontSize="13" textAnchor="middle">{t}</text>
              </g>
            ))}
            {[40,100,160].map((y1)=> [70,130].map((y2,j)=>(
              <line key={`${y1}-${j}`} x1="88" y1={y1} x2="422" y2={y2} stroke={C.border} strokeWidth="1" />
            )))}
            <text x="255" y="185" fill={C.sub} fontSize="12" textAnchor="middle">3 × 2 = 6 комбинаций</text>
          </svg>
        </Fig>
        <Solve task="Пароль состоит из буквы (26 вариантов) и цифры (10 вариантов). Сколько таких паролей?">
          <strong>1.</strong> Пароль содержит букву <strong>и</strong> цифру одновременно — выбор
          последовательный (сначала букву, потом цифру) → работает <strong>правило произведения</strong>.<br />
          <strong>2.</strong> Букву можно выбрать 26 способами. Для <em>каждой</em> из 26 букв цифру можно
          выбрать 10 способами.<br />
          <strong>3.</strong> Перемножаем: 26 × 10 = <strong>260</strong>.<br />
          <strong>Ответ:</strong> существует <strong>260</strong> различных паролей.
        </Solve>
      </section>

      {/* Перестановки */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Перестановки — «расставить все по порядку»</h2>
        <p>
          Перестановка — это упорядоченное расположение <strong>всех</strong> n различных объектов. Меняем только
          порядок, участвуют все элементы.
        </p>
        <Formula>Pₙ = n! = 1 × 2 × 3 × ... × n</Formula>
        <p>
          <strong>Откуда формула.</strong> На первое место можно поставить любой из n объектов. На второе — любой
          из оставшихся (n − 1). На третье — (n − 2), и так до последнего места, где остаётся 1 объект. По правилу
          произведения перемножаем: n × (n−1) × (n−2) × ... × 1 = n!.
        </p>
        <Fig caption="Перестановки 3 букв A, B, C: 3! = 6 вариантов — меняется только порядок">
          <svg viewBox="0 0 540 90" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            {['ABC','ACB','BAC','BCA','CAB','CBA'].map((w,i)=>(
              <g key={i}>
                <rect x={10+i*88} y="25" width="76" height="40" rx="6" fill="rgba(129,140,248,0.12)" stroke="#818cf8" />
                <text x={48+i*88} y="50" fill={C.text} fontSize="15" fontWeight="700" textAnchor="middle" letterSpacing="2">{w}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <Solve task="Сколькими способами 5 человек могут встать в очередь?">
          <strong>1.</strong> В очереди участвуют <strong>все</strong> 5 человек, и порядок важен (первый,
          второй…) → это <strong>перестановки</strong>.<br />
          <strong>2.</strong> Применяем формулу Pₙ = n! при n = 5: P₅ = 5!.<br />
          <strong>3.</strong> Считаем факториал: 5! = 1 × 2 × 3 × 4 × 5 = <strong>120</strong>.<br />
          <strong>Проверка логики:</strong> на 1-е место — 5 вариантов, на 2-е — 4, …, на 5-е — 1;
          5 × 4 × 3 × 2 × 1 = 120. ✓<br />
          <strong>Ответ:</strong> <strong>120</strong> способов.
        </Solve>
        <Solve task="Сколько «слов» можно составить, переставляя буквы слова «КОТ»?">
          <strong>1.</strong> В слове «КОТ» 3 <strong>различные</strong> буквы, используем все, порядок важен
          → перестановки.<br />
          <strong>2.</strong> P₃ = 3! = 1 × 2 × 3 = <strong>6</strong>.<br />
          <strong>3.</strong> Выпишем для наглядности: КОТ, КТО, ОКТ, ОТК, ТКО, ТОК — ровно 6 вариантов. ✓<br />
          <strong>Ответ:</strong> <strong>6</strong> «слов».
        </Solve>
        <p style={{ marginTop: 14 }}>
          <strong>Перестановки с повторениями.</strong> Если среди n объектов есть одинаковые группами размера
          n₁, n₂, …, nₖ, число различных перестановок уменьшается:
        </p>
        <Formula>n! / (n₁! × n₂! × ... × nₖ!)</Formula>
        <Solve task="Сколько различных перестановок букв слова «МАМА»?">
          <strong>1.</strong> Всего 4 буквы, но есть повторы: «М» встречается 2 раза и «А» — 2 раза. Если бы
          все буквы были разными, было бы 4! = 24 перестановки. Но перестановки одинаковых букв между собой не
          дают нового слова, поэтому лишние варианты нужно убрать → формула перестановок <strong>с
          повторениями</strong>.<br />
          <strong>2.</strong> Делим на факториалы размеров групп: 4! / (2! × 2!).<br />
          <strong>3.</strong> Считаем: 24 / (2 × 2) = 24 / 4 = <strong>6</strong>.<br />
          <strong>Ответ:</strong> <strong>6</strong> различных слов (МАМА, ММАА, МААМ, АМАМ, АММА, ААММ).
        </Solve>
      </section>

      {/* Размещения */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Размещения — «выбрать k и расставить по порядку»</h2>
        <p>
          Размещение — упорядоченный выбор k объектов из n различных. Берём <strong>не все</strong>, а k штук, и
          порядок <strong>важен</strong>.
        </p>
        <Formula>Aₙᵏ = n! / (n − k)!</Formula>
        <p>
          <strong>Откуда формула.</strong> На первое место — n вариантов, на второе — (n−1), … на k-е место —
          (n−k+1). Перемножаем k множителей: n × (n−1) × … × (n−k+1). Это как раз n! / (n−k)! — «отрезаем»
          хвост факториала.
        </p>
        <Fig caption="Размещения A₃² — выбрать 2 буквы из {A,B,C} с учётом порядка: 6 вариантов (AB ≠ BA)">
          <svg viewBox="0 0 540 90" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            {['AB','BA','AC','CA','BC','CB'].map((w,i)=>(
              <g key={i}>
                <rect x={10+i*88} y="25" width="76" height="40" rx="6" fill="rgba(129,140,248,0.12)" stroke="#818cf8" />
                <text x={48+i*88} y="50" fill={C.text} fontSize="15" fontWeight="700" textAnchor="middle" letterSpacing="2">{w}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <Solve task="В забеге 10 участников. Сколькими способами могут распределиться золото, серебро и бронза?">
          <strong>1.</strong> Выбираем 3 призёров из 10, и порядок важен: золото ≠ серебро ≠ бронза (одному и
          тому же человеку на золоте и на бронзе — разные исходы) → <strong>размещения</strong>.<br />
          <strong>2.</strong> Формула Aₙᵏ = n! / (n − k)! при n = 10, k = 3: A₁₀³ = 10! / (10 − 3)! = 10! / 7!.<br />
          <strong>3.</strong> Сокращаем факториалы — остаются 3 множителя: 10 × 9 × 8 = <strong>720</strong>.<br />
          <strong>Проверка логики:</strong> золото — 10 вариантов, серебро — 9 (один уже занят), бронза — 8.
          10 × 9 × 8 = 720. ✓<br />
          <strong>Ответ:</strong> <strong>720</strong> способов.
        </Solve>
        <Solve task="Сколько двузначных чисел без повторов можно составить из цифр 1, 2, 3, 4?">
          <strong>1.</strong> Берём 2 цифры из 4, порядок важен (число 12 ≠ 21), цифры не повторяются →
          <strong>размещения</strong>.<br />
          <strong>2.</strong> A₄² = 4! / (4 − 2)! = 4! / 2! = (4 × 3 × 2 × 1) / (2 × 1) = 4 × 3.<br />
          <strong>3.</strong> Считаем: 4 × 3 = <strong>12</strong>.<br />
          <strong>Ответ:</strong> <strong>12</strong> чисел (12, 13, 14, 21, 23, 24, 31, 32, 34, 41, 42, 43).
        </Solve>
        <p style={{ marginTop: 14 }}>
          <strong>Размещения с повторениями.</strong> Если объект можно брать повторно (например, цифры в пароле),
          на каждое из k мест — все n вариантов: <strong>nᵏ</strong>.
        </p>
        <Solve task="Сколько PIN-кодов из 4 цифр существует (цифры могут повторяться)?">
          <strong>1.</strong> PIN — упорядоченная последовательность из 4 позиций, цифры можно повторять
          (например, «1111» — валидный PIN) → размещения <strong>с повторениями</strong>: nᵏ.<br />
          <strong>2.</strong> На каждую из k = 4 позиций — n = 10 вариантов (0–9) независимо от остальных
          позиций.<br />
          <strong>3.</strong> Считаем: 10⁴ = 10 × 10 × 10 × 10 = <strong>10 000</strong>.<br />
          <strong>Ответ:</strong> <strong>10 000</strong> PIN-кодов (все числа от 0000 до 9999).
        </Solve>
      </section>

      {/* Сочетания */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Сочетания — «выбрать k, порядок не важен»</h2>
        <p>
          Сочетание — неупорядоченный выбор k объектов из n. Берём k штук, но порядок <strong>не важен</strong>:
          группа {'{'}A, B{'}'} — то же самое, что {'{'}B, A{'}'}.
        </p>
        <Formula>Cₙᵏ = n! / (k! × (n − k)!)</Formula>
        <p>
          <strong>Откуда формула.</strong> Возьмём размещения Aₙᵏ (там порядок учтён). Каждую группу из k
          элементов мы посчитали k! раз — по числу её перестановок. Чтобы порядок «не считался», делим на k!:
          Cₙᵏ = Aₙᵏ / k! = n! / (k!(n−k)!).
        </p>
        <Fig caption="Сочетания C₃² — выбрать 2 из {A,B,C} без порядка: всего 3 группы (AB, AC, BC). Вдвое меньше, чем размещений">
          <svg viewBox="0 0 400 90" width="100%" style={{ maxWidth: 400 }} xmlns="http://www.w3.org/2000/svg">
            {['AB','AC','BC'].map((w,i)=>(
              <g key={i}>
                <rect x={20+i*125} y="25" width="100" height="40" rx="6" fill="rgba(200,255,0,0.12)" stroke={C.lime} />
                <text x={70+i*125} y="50" fill={C.text} fontSize="15" fontWeight="700" textAnchor="middle" letterSpacing="2">{w}</text>
              </g>
            ))}
          </svg>
        </Fig>
        <Solve task="Из 10 сотрудников нужно выбрать 3 в команду. Сколькими способами?">
          <strong>1.</strong> Выбираем 3 из 10, но команда — это просто набор людей: неважно, кого назвали
          первым, кого вторым → <strong>сочетания</strong>.<br />
          <strong>2.</strong> C₁₀³ = 10! / (3! × (10−3)!) = 10! / (3! × 7!).<br />
          <strong>3.</strong> Раскрываем через размещение: числитель — 10 × 9 × 8 (как в размещении), делим
          на 3! = 3 × 2 × 1 = 6, чтобы убрать повторный счёт одинаковых команд в разном порядке.<br />
          <strong>4.</strong> Считаем: (10 × 9 × 8) / 6 = 720 / 6 = <strong>120</strong>.<br />
          <strong>Ответ:</strong> <strong>120</strong> команд.
        </Solve>
        <Solve task="Сколькими способами можно выбрать 2 карты из колоды в 36 карт?">
          <strong>1.</strong> Берём 2 карты «в руку» — порядок, в котором их взяли, не важен →
          <strong>сочетания</strong>.<br />
          <strong>2.</strong> C₃₆² = 36! / (2! × 34!) = (36 × 35) / (2 × 1).<br />
          <strong>3.</strong> Считаем: (36 × 35) / 2 = 1260 / 2 = <strong>630</strong>.<br />
          <strong>Ответ:</strong> <strong>630</strong> способов.
        </Solve>
        <TheoryExample title="Как отличить размещения от сочетаний">
          Спроси себя: «важен ли порядок?». Призовые места, пароли, очередь — порядок важен, это <strong>размещения</strong>.
          Команда, букет, набор карт — порядок не важен, это <strong>сочетания</strong>. Числа Cₙᵏ — это ещё и
          коэффициенты треугольника Паскаля и разложения (a + b)ⁿ.
        </TheoryExample>

        <h3 className="theory-heading-3">Сводка: что выбрать</h3>
        <TheoryTable
          headers={['Ситуация', 'Все объекты?', 'Порядок важен?', 'Формула']}
          rows={[
            ['Перестановки', 'Да, все n', 'Да', 'n!'],
            ['Размещения', 'Нет, k из n', 'Да', 'n! / (n−k)!'],
            ['Сочетания', 'Нет, k из n', 'Нет', 'n! / (k!(n−k)!)'],
          ]}
        />
      </section>

      {/* Вероятность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Основные понятия теории вероятностей</h2>
        <ul className="theory-list">
          <li><strong>Испытание (опыт)</strong> — действие со случайным исходом (бросок кубика).</li>
          <li><strong>Элементарный исход</strong> — простейший результат (выпало «3»).</li>
          <li><strong>Пространство исходов Ω</strong> — все возможные исходы (для кубика: {'{'}1,2,3,4,5,6{'}'}).</li>
          <li><strong>Событие</strong> — набор исходов, подмножество Ω (событие «чётное» = {'{'}2,4,6{'}'}).</li>
        </ul>
      </section>

      {/* Классическая вероятность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Классическое определение вероятности</h2>
        <Formula>P(A) = m / n</Formula>
        <p>
          где <strong>m</strong> — число благоприятных исходов (когда событие A произошло), <strong>n</strong> —
          общее число всех равновозможных исходов. Формула работает <strong>только</strong>, когда все исходы
          равновозможны (честный кубик, честная монета).
        </p>
        <p><strong>Свойства:</strong> 0 ≤ P(A) ≤ 1; P(Ω) = 1 (достоверное событие — всегда); P(∅) = 0 (невозможное).</p>
        <Solve task="Какова вероятность вытащить туза из колоды в 36 карт?">
          <strong>1.</strong> Все карты равновозможны (колода честная, тянем вслепую) → применима классическая
          формула P(A) = m/n.<br />
          <strong>2.</strong> n — общее число исходов: всего карт в колоде n = 36.<br />
          <strong>3.</strong> m — благоприятные исходы: тузов в колоде 4 масти, m = 4.<br />
          <strong>4.</strong> Считаем: P = 4/36 = 1/9 ≈ <strong>0,111</strong> (то есть примерно 11,1%).<br />
          <strong>Ответ:</strong> P ≈ <strong>0,111</strong>.
        </Solve>
        <Solve task="Бросают кубик. Вероятность выпадения чётного числа?">
          <strong>1.</strong> Кубик честный, все 6 граней равновозможны → классическая вероятность.<br />
          <strong>2.</strong> Общее число исходов n = 6 (грани 1–6).<br />
          <strong>3.</strong> Благоприятные исходы — чётные грани: {'{'}2, 4, 6{'}'}, значит m = 3.<br />
          <strong>4.</strong> Считаем: P = m/n = 3/6 = <strong>0,5</strong>.<br />
          <strong>Ответ:</strong> P = <strong>0,5</strong> (50%).
        </Solve>
        <Solve task="В урне 5 белых и 3 чёрных шара. Вероятность вытащить наугад 2 белых?">
          <strong>1.</strong> Достаём 2 шара сразу — порядок, в котором они оказались в руке, не важен, поэтому
          и общее число исходов, и число благоприятных считаем через <strong>сочетания</strong>.<br />
          <strong>2.</strong> n — все способы выбрать любые 2 шара из всех 8 (5 белых + 3 чёрных):
          n = C₈² = (8 × 7) / 2 = <strong>28</strong>.<br />
          <strong>3.</strong> m — способы выбрать 2 белых именно из 5 белых (чёрные не участвуют):
          m = C₅² = (5 × 4) / 2 = <strong>10</strong>.<br />
          <strong>4.</strong> Применяем формулу: P = m/n = 10/28 = 5/14 ≈ <strong>0,357</strong> (≈ 35,7%).<br />
          <strong>Ответ:</strong> P = 5/14 ≈ <strong>0,357</strong>. Здесь классическая вероятность и
          комбинаторика (сочетания) работают вместе.
        </Solve>
      </section>

      {/* Алгебра событий */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Операции над событиями</h2>
        <Fig caption="Диаграммы Венна: сумма (хотя бы одно), произведение (оба), противоположное (не A)">
          <svg viewBox="0 0 540 150" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            {/* A ∪ B */}
            <text x="90" y="18" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">A ∪ B</text>
            <circle cx="75" cy="80" r="38" fill="rgba(200,255,0,0.18)" stroke={C.lime} />
            <circle cx="115" cy="80" r="38" fill="rgba(200,255,0,0.18)" stroke={C.lime} />
            <text x="60" y="85" fill={C.text} fontSize="13">A</text>
            <text x="128" y="85" fill={C.text} fontSize="13">B</text>
            {/* A ∩ B */}
            <text x="270" y="18" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">A ∩ B</text>
            <clipPath id="clipA"><circle cx="255" cy="80" r="38" /></clipPath>
            <circle cx="255" cy="80" r="38" fill="none" stroke="#818cf8" />
            <circle cx="295" cy="80" r="38" fill="none" stroke="#818cf8" />
            <circle cx="295" cy="80" r="38" fill="rgba(129,140,248,0.35)" stroke="none" clipPath="url(#clipA)" />
            <text x="240" y="85" fill={C.text} fontSize="13">A</text>
            <text x="308" y="85" fill={C.text} fontSize="13">B</text>
            {/* not A */}
            <text x="450" y="18" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Ā (не A)</text>
            <rect x="400" y="45" width="100" height="70" fill="rgba(248,113,113,0.18)" stroke="#f87171" rx="4" />
            <circle cx="450" cy="80" r="26" fill="var(--bg-secondary)" stroke="#f87171" />
            <text x="450" y="85" fill={C.text} fontSize="13" textAnchor="middle">A</text>
          </svg>
        </Fig>
        <ul className="theory-list">
          <li><strong>Сумма A ∪ B</strong> — произошло хотя бы одно из событий.</li>
          <li><strong>Произведение A ∩ B</strong> — произошли оба события одновременно.</li>
          <li><strong>Противоположное Ā</strong> — событие A не произошло. Важно: P(Ā) = 1 − P(A).</li>
          <li><strong>Несовместные</strong> события не могут случиться вместе: A ∩ B = ∅.</li>
          <li><strong>Независимые</strong> — наступление одного не меняет вероятность другого.</li>
        </ul>
        <Solve task="Вероятность сдать экзамен 0,8. Какова вероятность НЕ сдать?">
          <strong>1.</strong> «Не сдать» — это событие Ā, противоположное событию A = «сдать».<br />
          <strong>2.</strong> Применяем свойство противоположных событий: P(Ā) = 1 − P(A).<br />
          <strong>3.</strong> Подставляем: P(Ā) = 1 − 0,8 = <strong>0,2</strong>.<br />
          <strong>Ответ:</strong> вероятность не сдать экзамен — <strong>0,2</strong> (20%).
        </Solve>
      </section>

      {/* Условная и Байес */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Условная вероятность и формула Байеса</h2>
        <p>Условная вероятность — вероятность A при условии, что событие B уже произошло:</p>
        <Formula>P(A|B) = P(A ∩ B) / P(B)</Formula>
        <p>Из неё следует теорема умножения вероятностей:</p>
        <Formula>P(A ∩ B) = P(A) × P(B|A) = P(B) × P(A|B)</Formula>
        <p>События <strong>независимы</strong>, если P(A ∩ B) = P(A) × P(B) (тогда P(A|B) = P(A)).</p>
        <Solve task="Два раза бросают монету. Вероятность, что оба раза орёл?">
          <strong>1.</strong> Обозначим A = «орёл в первом броске», B = «орёл во втором броске». Результат
          первого броска никак не влияет на второй → события <strong>независимы</strong>.<br />
          <strong>2.</strong> Для независимых событий P(A ∩ B) = P(A) × P(B).<br />
          <strong>3.</strong> P(A) = 0,5 (орёл или решка равновозможны), P(B) = 0,5.<br />
          <strong>4.</strong> Считаем: P(A ∩ B) = 0,5 × 0,5 = <strong>0,25</strong>.<br />
          <strong>Ответ:</strong> вероятность двух орлов подряд — <strong>0,25</strong> (25%).
        </Solve>
        <p style={{ marginTop: 14 }}>Формула полной вероятности (Hᵢ — полная группа гипотез):</p>
        <Formula>P(A) = Σ P(Hᵢ) × P(A|Hᵢ)</Formula>
        <p>Формула Байеса — пересчёт вероятности гипотезы после того, как событие A наступило:</p>
        <Formula>P(Hᵢ|A) = P(Hᵢ) × P(A|Hᵢ) / P(A)</Formula>
        <Solve task="Тест на болезнь: болеет 1% людей. Тест верен в 99% случаев. Человек получил положительный результат — какова вероятность, что он действительно болен?">
          Гипотезы: H₁ = болен (0,01), H₂ = здоров (0,99). A = тест положительный.
          P(A|H₁) = 0,99; P(A|H₂) = 0,01 (ложная тревога).
          Полная вероятность: P(A) = 0,01×0,99 + 0,99×0,01 = 0,0198.
          По Байесу: P(H₁|A) = (0,01 × 0,99) / 0,0198 = 0,0099 / 0,0198 = <strong>0,5</strong>.
          Неожиданно всего 50% — потому что здоровых людей намного больше, и даже редкие ложные срабатывания дают
          много «положительных». Это классический пример важности формулы Байеса в аналитике.
        </Solve>
      </section>

      {/* Случайные величины */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Случайные величины</h2>
        <ul className="theory-list">
          <li><strong>Дискретная</strong> — принимает отдельные значения (число очков на кубике), задаётся законом распределения.</li>
          <li><strong>Непрерывная</strong> — любые значения из интервала (рост человека), описывается плотностью вероятности.</li>
          <li><strong>Математическое ожидание M(X)</strong> — «среднее» значение с учётом вероятностей: M(X) = Σ xᵢ · pᵢ.</li>
        </ul>
        <p>Дисперсия — мера разброса значений вокруг среднего:</p>
        <Formula>D(X) = M[(X − M(X))²]</Formula>
        <Solve task="Найдите мат. ожидание числа очков при броске честного кубика.">
          <strong>1.</strong> Случайная величина X — число очков, X ∈ {'{'}1,2,3,4,5,6{'}'}, каждое значение
          равновозможно, значит вероятность каждого pᵢ = 1/6.<br />
          <strong>2.</strong> Применяем формулу M(X) = Σ xᵢ · pᵢ = 1·(1/6) + 2·(1/6) + 3·(1/6) + 4·(1/6) + 5·(1/6) + 6·(1/6).<br />
          <strong>3.</strong> Выносим общий множитель 1/6: M(X) = (1+2+3+4+5+6) × (1/6) = 21 × (1/6) = 21/6.<br />
          <strong>4.</strong> Сокращаем: 21/6 = <strong>3,5</strong>.<br />
          <strong>Ответ:</strong> M(X) = <strong>3,5</strong>. Заметь, что 3,5 — не реальное значение грани
          кубика (граней 3,5 не бывает), это именно «среднее по всем броскам в долгосрочной перспективе».
        </Solve>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Выводы</h2>
        <ul className="theory-list">
          <li>Правила суммы («или») и произведения («и») — основа всех комбинаторных подсчётов.</li>
          <li>Перестановки (все n, порядок важен), размещения (k из n, порядок важен), сочетания (k из n, порядок не важен) — три ключевые формулы.</li>
          <li>Классическая вероятность P = m/n работает только при равновозможных исходах; числитель и знаменатель часто считают через комбинаторику.</li>
          <li>Алгебра событий и правило P(Ā) = 1 − P(A) упрощают вычисления.</li>
          <li>Условная вероятность и формула Байеса пересчитывают вероятности при новой информации — фундамент байесовской аналитики.</li>
          <li>Математическое ожидание и дисперсия превращают вероятностную модель в конкретные числовые показатели для анализа данных.</li>
        </ul>
      </section>
    </div>
  )
}
