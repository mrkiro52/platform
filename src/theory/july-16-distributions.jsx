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

// Кривая нормального распределения (для переиспользования в нескольких SVG)
function bellPath(cx, w, h, base) {
  // простая гауссова кривая, нарисованная вручную опорными точками
  return `M ${cx - w} ${base} C ${cx - w * 0.6} ${base}, ${cx - w * 0.5} ${base - h * 0.15}, ${cx - w * 0.35} ${base - h * 0.55}
          C ${cx - w * 0.18} ${base - h}, ${cx - w * 0.05} ${base - h}, ${cx} ${base - h}
          C ${cx + w * 0.05} ${base - h}, ${cx + w * 0.18} ${base - h}, ${cx + w * 0.35} ${base - h * 0.55}
          C ${cx + w * 0.5} ${base - h * 0.15}, ${cx + w * 0.6} ${base}, ${cx + w} ${base}`
}

export default function July16DistributionsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Качаем статистику: распределения</h1>
        <p className="theory-subtitle">Треки: Аналитика и Machine Learning</p>
        <p className="theory-date">16 июля 2026</p>
        <p>
          Прежде чем строить модели и делать выводы по данным, нужно понимать, как эти данные{' '}
          <strong>распределены</strong>. Сегодня разберём вариационный ряд, таблицу частот, виды распределений
          (нормальное, асимметричное, полимодальное, логнормальное), смысл площади под графиком распределения и
          ключевые параметры: среднее, дисперсию, стандартное отклонение, правило трёх отклонений, медиану, моду,
          перцентили и квартили. Всё — с иллюстрациями и кодом на Python.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Вариационный ряд</h2>
        <Term name="Вариационный ряд">
          все значения выборки, расположенные <strong>по возрастанию</strong> (отсортированные). Это самый первый
          шаг работы с данными — до вариационного ряда сложно увидеть закономерность в «сыром» наборе чисел.
        </Term>
        <P n={1}>
          Например, есть выборка возрастов: 23, 19, 31, 19, 25, 19, 31. Её вариационный ряд — это те же числа, но
          отсортированные: 19, 19, 19, 23, 25, 31, 31. Именно из отсортированного ряда удобно находить минимум,
          максимум, медиану и другие характеристики — на «сыром» неотсортированном наборе это сделать сложнее.
        </P>
        <TheoryCode language="python" code={`import numpy as np

ages = np.array([23, 19, 31, 19, 25, 19, 31])
variation_series = np.sort(ages)
print(variation_series)
# [19 19 19 23 25 31 31]`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Таблица частот и построение распределения</h2>
        <Term name="Таблица частот">
          таблица, показывающая, сколько раз (частота) встречается каждое значение или диапазон значений в выборке.
          Частоту можно указывать в штуках (абсолютная) или в долях от общего числа наблюдений (относительная).
        </Term>
        <P n={2}>
          Для нашей выборки возрастов таблица частот выглядит так: значение 19 встречается 3 раза, 23 — 1 раз, 25 —
          1 раз, 31 — 2 раза. Если разделить частоту каждого значения на общее число наблюдений (7), получим
          относительную частоту — фактически, оценку вероятности этого значения.
        </P>
        <TheoryTable
          headers={['Значение', 'Частота (шт.)', 'Относительная частота']}
          rows={[
            ['19', '3', '3/7 ≈ 0.43'],
            ['23', '1', '1/7 ≈ 0.14'],
            ['25', '1', '1/7 ≈ 0.14'],
            ['31', '2', '2/7 ≈ 0.29'],
          ]}
        />
        <P n={3}>
          <strong>Распределение</strong> — это именно то, как строится таблица частот: закон, по которому значения
          выборки «размазаны» по возможному диапазону. Если для больших выборок с непрерывными числами построить
          столбики относительных частот по интервалам (гистограмму) и сгладить их линией, получится{' '}
          <strong>кривая распределения</strong> — с неё и начинается вся дальнейшая статистика.
        </P>
        <Fig caption="От гистограммы частот к сглаженной кривой распределения.">
          <svg viewBox="0 0 460 170" width="460" height="170" xmlns="http://www.w3.org/2000/svg">
            {[18, 32, 55, 78, 92, 70, 48, 26, 12].map((h, i) => (
              <rect key={i} x={20 + i * 46} y={150 - h} width="36" height={h} fill="rgba(96,165,250,0.35)" stroke="#60a5fa" />
            ))}
            <path d={bellPath(230, 200, 110, 150)} fill="none" stroke="#c8ff00" strokeWidth="2.5" />
            <line x1="10" y1="150" x2="450" y2="150" stroke="#94a3b8" strokeWidth="1" />
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Виды распределений: нормальное, асимметричное, полимодальное</h2>
        <Term name="Нормальное распределение (Гауссово)">
          симметричная колоколообразная кривая: большинство значений сосредоточено около среднего, а чем дальше от
          среднего — тем реже встречаются значения. Самое частое распределение в природе и статистике (рост, вес,
          ошибки измерений).
        </Term>
        <Term name="Асимметричное распределение (скошенное)">
          кривая, у которой один «хвост» длиннее другого. Скошенное вправо (положительная асимметрия) — длинный
          хвост уходит в большие значения (типично для доходов). Скошенное влево (отрицательная асимметрия) —
          длинный хвост уходит в малые значения.
        </Term>
        <Term name="Полимодальное распределение">
          распределение с несколькими явными «пиками» (модами) вместо одного. Часто говорит о том, что в выборке
          смешаны данные из разных групп/процессов, которые стоит анализировать отдельно.
        </Term>
        <Fig caption="Три формы распределения: симметричное нормальное, асимметричное (скошенное вправо) и полимодальное с двумя пиками.">
          <svg viewBox="0 0 560 170" width="560" height="170" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d={bellPath(85, 70, 110, 150)} fill="rgba(200,255,0,0.15)" stroke="#c8ff00" strokeWidth="2.5" />
              <text x="85" y="165" fill="#94a3b8" fontSize="11" textAnchor="middle">нормальное</text>
            </g>
            <g>
              <path d="M 210 150 C 230 150, 245 140, 260 100 C 275 60, 290 40, 310 35 C 330 32, 360 45, 400 150 Z"
                fill="rgba(248,113,113,0.15)" stroke="#f87171" strokeWidth="2.5" />
              <text x="300" y="165" fill="#94a3b8" fontSize="11" textAnchor="middle">асимметричное (вправо)</text>
            </g>
            <g>
              <path d="M 420 150 C 435 150, 440 90, 460 90 C 475 90, 478 120, 490 120 C 502 120, 505 90, 520 90 C 540 90, 545 150, 555 150 Z"
                fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="2.5" />
              <text x="490" y="165" fill="#94a3b8" fontSize="11" textAnchor="middle">полимодальное</text>
            </g>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Логнормальное распределение</h2>
        <Term name="Логнормальное распределение">
          распределение случайной величины, логарифм которой имеет нормальное распределение. Само по себе оно
          несимметрично и скошено вправо — типично для величин, которые не бывают отрицательными (доходы, цены,
          время ожидания).
        </Term>
        <P n={4}>
          Связь с нормальным распределением такая: если взять нормально распределённую величину X и применить к ней{' '}
          <strong>экспоненту</strong> (то есть посчитать e в степени X), получится логнормально распределённая
          величина Y = e<sup>X</sup>. И обратно: если взять от логнормальной величины Y{' '}
          <strong>натуральный логарифм</strong> (ln Y), снова получится нормальное распределение X.
        </P>
        <Fig caption="Нормальное распределение → экспонента → логнормальное; логнормальное → логарифм → снова нормальное.">
          <svg viewBox="0 0 560 150" width="560" height="150" xmlns="http://www.w3.org/2000/svg">
            <path d={bellPath(90, 70, 90, 130)} fill="rgba(96,165,250,0.15)" stroke="#60a5fa" strokeWidth="2.5" />
            <text x="90" y="145" fill="#94a3b8" fontSize="11" textAnchor="middle">нормальное (X)</text>

            <text x="220" y="75" fill="#c8ff00" fontSize="13" textAnchor="middle">exp(X) →</text>
            <text x="220" y="92" fill="#94a3b8" fontSize="10" textAnchor="middle">← ln(Y)</text>

            <path d="M 330 130 C 345 130, 355 115, 365 90 C 375 65, 385 55, 400 53 C 415 52, 435 60, 480 130 Z"
              fill="rgba(74,222,128,0.15)" stroke="#4ade80" strokeWidth="2.5" />
            <text x="400" y="145" fill="#94a3b8" fontSize="11" textAnchor="middle">логнормальное (Y = eˣ)</text>
          </svg>
        </Fig>
        <P n={5}>
          Это очень полезный приём в анализе данных: если признак (например, доход или цена) распределён
          логнормально, к нему часто применяют логарифмирование, чтобы получить приближённо нормальное
          распределение — с ним удобнее работать статистически и визуально.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Площадь под графиком распределения</h2>
        <Term name="Площадь под кривой распределения">
          для любого распределения вероятностей полная площадь под графиком плотности всегда равна{' '}
          <strong>единице (1)</strong> — это отражает тот факт, что вероятность какого-либо исхода (то есть любого
          значения из всей области определения) равна 100%.
        </Term>
        <P n={6}>
          Площадь <strong>между двумя значениями</strong> на оси X — это доля наблюдений (или вероятность) того,
          что случайная величина попадёт именно в этот диапазон. Чем больше заштрихованная площадь между точками a
          и b, тем выше вероятность, что значение окажется между ними.
        </P>
        <Fig caption="Слева — вся площадь под кривой равна 1 (100%). Справа — заштрихованная часть между a и b — это вероятность попадания в интервал [a, b].">
          <svg viewBox="0 0 520 160" width="520" height="160" xmlns="http://www.w3.org/2000/svg">
            <path d={bellPath(120, 90, 100, 140)} fill="rgba(200,255,0,0.25)" stroke="#c8ff00" strokeWidth="2.5" />
            <text x="120" y="155" fill="#94a3b8" fontSize="11" textAnchor="middle">площадь = 1 (100%)</text>

            <path d={bellPath(390, 90, 100, 140)} fill="none" stroke="#c8ff00" strokeWidth="2.5" />
            <clipPath id="clip-ab"><rect x="360" y="30" width="60" height="120" /></clipPath>
            <path d={bellPath(390, 90, 100, 140)} fill="rgba(96,165,250,0.4)" clipPath="url(#clip-ab)" />
            <line x1="360" y1="40" x2="360" y2="140" stroke="#60a5fa" strokeDasharray="3" />
            <line x1="420" y1="40" x2="420" y2="140" stroke="#60a5fa" strokeDasharray="3" />
            <text x="360" y="153" fill="#60a5fa" fontSize="11" textAnchor="middle">a</text>
            <text x="420" y="153" fill="#60a5fa" fontSize="11" textAnchor="middle">b</text>
            <text x="390" y="20" fill="#94a3b8" fontSize="11" textAnchor="middle">P(a ≤ X ≤ b)</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Среднее, дисперсия, стандартное отклонение</h2>
        <Term name="Среднее (математическое ожидание)">
          сумма всех значений, делённая на их количество. Показывает «центр тяжести» распределения.
        </Term>
        <Term name="Дисперсия">
          средний квадрат отклонения значений от среднего. Показывает, насколько сильно данные разбросаны вокруг
          среднего. Считается в квадратных единицах исходной величины (неудобно интерпретировать напрямую).
        </Term>
        <Term name="Стандартное отклонение">
          корень из дисперсии. В отличие от дисперсии, измеряется в тех же единицах, что и исходные данные — поэтому
          именно его чаще используют для описания разброса на практике.
        </Term>
        <TheoryCode language="python" code={`import numpy as np

data = np.array([23, 19, 31, 19, 25, 19, 31])

mean = np.mean(data)          # среднее
variance = np.var(data)       # дисперсия
std = np.std(data)            # стандартное отклонение (корень из дисперсии)

print(mean, variance, std)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Правило трёх отклонений (правило «трёх сигм»)</h2>
        <Term name="Правило трёх отклонений (3σ)">
          для нормального распределения почти все значения укладываются в интервал среднее ± 3 стандартных
          отклонения. Внутри этого интервала лежит примерно 99.7% всех наблюдений.
        </Term>
        <TheoryTable
          headers={['Интервал', 'Доля значений внутри']}
          rows={[
            ['[среднее − 1σ; среднее + 1σ]', '≈ 68%'],
            ['[среднее − 2σ; среднее + 2σ]', '≈ 95%'],
            ['[среднее − 3σ; среднее + 3σ]', '≈ 99.7%'],
          ]}
        />
        <Fig caption="Интервалы среднее ± 1σ, ±2σ, ±3σ и доля наблюдений внутри каждого из них.">
          <svg viewBox="0 0 560 190" width="560" height="190" xmlns="http://www.w3.org/2000/svg">
            <path d={bellPath(280, 220, 120, 160)} fill="rgba(200,255,0,0.08)" stroke="#c8ff00" strokeWidth="2.5" />
            {/* 1 sigma */}
            <clipPath id="s1"><rect x="220" y="20" width="120" height="150" /></clipPath>
            <path d={bellPath(280, 220, 120, 160)} fill="rgba(74,222,128,0.35)" clipPath="url(#s1)" />
            {/* labels */}
            <line x1="160" y1="20" x2="160" y2="160" stroke="#60a5fa" strokeDasharray="3" />
            <line x1="400" y1="20" x2="400" y2="160" stroke="#60a5fa" strokeDasharray="3" />
            <line x1="220" y1="20" x2="220" y2="160" stroke="#4ade80" strokeDasharray="3" />
            <line x1="340" y1="20" x2="340" y2="160" stroke="#4ade80" strokeDasharray="3" />
            <line x1="100" y1="20" x2="100" y2="160" stroke="#f87171" strokeDasharray="3" />
            <line x1="460" y1="20" x2="460" y2="160" stroke="#f87171" strokeDasharray="3" />

            <text x="280" y="15" fill="#f5f5fa" fontSize="11" textAnchor="middle">среднее</text>
            <text x="220" y="180" fill="#4ade80" fontSize="10" textAnchor="middle">−1σ</text>
            <text x="340" y="180" fill="#4ade80" fontSize="10" textAnchor="middle">+1σ</text>
            <text x="160" y="180" fill="#60a5fa" fontSize="10" textAnchor="middle">−2σ</text>
            <text x="400" y="180" fill="#60a5fa" fontSize="10" textAnchor="middle">+2σ</text>
            <text x="100" y="180" fill="#f87171" fontSize="10" textAnchor="middle">−3σ</text>
            <text x="460" y="180" fill="#f87171" fontSize="10" textAnchor="middle">+3σ</text>
            <text x="280" y="95" fill="#4ade80" fontSize="11" textAnchor="middle">68%</text>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`mean = np.mean(data)
std = np.std(data)

lower_1s, upper_1s = mean - std, mean + std
lower_3s, upper_3s = mean - 3 * std, mean + 3 * std

print(f"68% значений в интервале: [{lower_1s:.2f}, {upper_1s:.2f}]")
print(f"99.7% значений в интервале: [{lower_3s:.2f}, {upper_3s:.2f}]")`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Медиана и мода</h2>
        <Term name="Медиана">
          значение, которое делит отсортированный вариационный ряд ровно пополам: 50% значений меньше медианы, 50%
          — больше. Устойчива к выбросам (в отличие от среднего).
        </Term>
        <Term name="Мода">
          самое часто встречающееся значение в выборке. У распределения может быть одна мода (унимодальное) или
          несколько (полимодальное, см. пункт 3).
        </Term>
        <P n={7}>
          В <strong>симметричном нормальном</strong> распределении среднее, медиана и мода совпадают — все три
          находятся в одной точке, в центре «колокола». В <strong>асимметричном</strong> распределении они
          расходятся: направление расхождения зависит от того, куда «тянется» длинный хвост.
        </P>
        <Fig caption="Симметричное: среднее = медиана = мода. Скошено вправо: мода < медиана < среднее. Скошено влево: среднее < медиана < мода.">
          <svg viewBox="0 0 560 190" width="560" height="190" xmlns="http://www.w3.org/2000/svg">
            {/* symmetric */}
            <path d={bellPath(90, 70, 100, 150)} fill="rgba(200,255,0,0.12)" stroke="#c8ff00" strokeWidth="2.5" />
            <line x1="90" y1="45" x2="90" y2="150" stroke="#f5f5fa" strokeDasharray="3" />
            <text x="90" y="165" fill="#f5f5fa" fontSize="10" textAnchor="middle">среднее=медиана=мода</text>

            {/* skewed right */}
            <path d="M 220 150 C 235 150, 248 140, 260 105 C 272 70, 285 50, 305 47 C 325 45, 350 60, 390 150 Z"
              fill="rgba(248,113,113,0.12)" stroke="#f87171" strokeWidth="2.5" />
            <line x1="290" y1="47" x2="290" y2="150" stroke="#4ade80" strokeDasharray="3" />
            <line x1="310" y1="47" x2="310" y2="150" stroke="#facc15" strokeDasharray="3" />
            <line x1="335" y1="47" x2="335" y2="150" stroke="#f87171" strokeDasharray="3" />
            <text x="290" y="165" fill="#4ade80" fontSize="9" textAnchor="middle">мода</text>
            <text x="310" y="177" fill="#facc15" fontSize="9" textAnchor="middle">медиана</text>
            <text x="335" y="165" fill="#f87171" fontSize="9" textAnchor="middle">среднее</text>
            <text x="305" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">скошено вправо</text>

            {/* skewed left */}
            <path d="M 420 150 C 440 60, 455 47, 475 45 C 495 47, 505 65, 517 105 C 528 140, 542 150, 555 150 Z"
              fill="rgba(96,165,250,0.12)" stroke="#60a5fa" strokeWidth="2.5" />
            <line x1="447" y1="45" x2="447" y2="150" stroke="#f87171" strokeDasharray="3" />
            <line x1="465" y1="45" x2="465" y2="150" stroke="#facc15" strokeDasharray="3" />
            <line x1="483" y1="45" x2="483" y2="150" stroke="#4ade80" strokeDasharray="3" />
            <text x="447" y="165" fill="#f87171" fontSize="9" textAnchor="middle">среднее</text>
            <text x="465" y="177" fill="#facc15" fontSize="9" textAnchor="middle">медиана</text>
            <text x="483" y="165" fill="#4ade80" fontSize="9" textAnchor="middle">мода</text>
            <text x="475" y="20" fill="#94a3b8" fontSize="10" textAnchor="middle">скошено влево</text>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`from scipy import stats

median = np.median(data)              # медиана
mode = stats.mode(data, keepdims=True).mode[0]   # мода

print(median, mode)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Перцентили и квартили</h2>
        <Term name="Перцентиль">
          значение, ниже которого лежит определённый процент наблюдений. Например, 90-й перцентиль — это значение,
          ниже которого находится 90% всех данных.
        </Term>
        <Term name="Квартили">
          три особых перцентиля, которые делят выборку на 4 равные части. Q1 (25-й перцентиль) — граница первой
          четверти, Q2 (50-й перцентиль) — это и есть медиана, Q3 (75-й перцентиль) — граница третьей четверти.
        </Term>
        <Fig caption="Квартили Q1, Q2 (медиана) и Q3 делят площадь под распределением на 4 равные по 25% части.">
          <svg viewBox="0 0 480 170" width="480" height="170" xmlns="http://www.w3.org/2000/svg">
            <path d={bellPath(240, 210, 110, 150)} fill="none" stroke="#c8ff00" strokeWidth="2.5" />
            {[
              { x1: 30, x2: 155, color: 'rgba(96,165,250,0.3)' },
              { x1: 155, x2: 240, color: 'rgba(74,222,128,0.3)' },
              { x1: 240, x2: 325, color: 'rgba(250,204,21,0.3)' },
              { x1: 325, x2: 450, color: 'rgba(248,113,113,0.3)' },
            ].map((seg, i) => (
              <clipPath id={`q${i}`} key={i}><rect x={seg.x1} y="20" width={seg.x2 - seg.x1} height="130" /></clipPath>
            ))}
            {[
              { x1: 30, x2: 155, color: 'rgba(96,165,250,0.3)', id: 0 },
              { x1: 155, x2: 240, color: 'rgba(74,222,128,0.3)', id: 1 },
              { x1: 240, x2: 325, color: 'rgba(250,204,21,0.3)', id: 2 },
              { x1: 325, x2: 450, color: 'rgba(248,113,113,0.3)', id: 3 },
            ].map((seg) => (
              <path key={seg.id} d={bellPath(240, 210, 110, 150)} fill={seg.color} clipPath={`url(#q${seg.id})`} />
            ))}
            <line x1="155" y1="20" x2="155" y2="150" stroke="#f5f5fa" strokeDasharray="3" />
            <line x1="240" y1="20" x2="240" y2="150" stroke="#f5f5fa" strokeDasharray="3" />
            <line x1="325" y1="20" x2="325" y2="150" stroke="#f5f5fa" strokeDasharray="3" />
            <text x="155" y="165" fill="#f5f5fa" fontSize="11" textAnchor="middle">Q1 (25%)</text>
            <text x="240" y="165" fill="#f5f5fa" fontSize="11" textAnchor="middle">Q2 = медиана (50%)</text>
            <text x="325" y="165" fill="#f5f5fa" fontSize="11" textAnchor="middle">Q3 (75%)</text>
            <text x="92" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">25%</text>
            <text x="197" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">25%</text>
            <text x="282" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">25%</text>
            <text x="387" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">25%</text>
          </svg>
        </Fig>
        <TheoryExample title="Межквартильный размах (IQR)">
          Разница Q3 − Q1 называется межквартильным размахом. Она уже встречалась в теме про очистку данных: значения
          за пределами Q1 − 1.5·IQR и Q3 + 1.5·IQR обычно считают выбросами.
        </TheoryExample>
        <TheoryCode language="python" code={`q1 = np.percentile(data, 25)
q2 = np.percentile(data, 50)   # совпадает с медианой
q3 = np.percentile(data, 75)
p90 = np.percentile(data, 90)  # произвольный перцентиль

print(f"Q1={q1}, медиана={q2}, Q3={q3}, 90-й перцентиль={p90}")`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Генерация распределений на Python</h2>
        <P n={8}>
          Библиотека NumPy позволяет генерировать выборки из типовых распределений — это удобно для тестирования
          гипотез, симуляций и учебных примеров.
        </P>
        <TheoryCode language="python" code={`import numpy as np

np.random.seed(42)

# генерация нормального распределения:
# loc — среднее, scale — стандартное отклонение, size — количество точек
normal_data = np.random.normal(loc=50, scale=10, size=10000)

print(np.mean(normal_data), np.std(normal_data))
# ≈ 50 и ≈ 10 — параметры генерации подтверждаются на выборке`} />
        <TheoryCode language="python" code={`# генерация логнормального распределения:
# mean/sigma — параметры нормального распределения ПОД логарифмом
lognormal_data = np.random.lognormal(mean=0, sigma=0.5, size=10000)

print(np.mean(lognormal_data), np.median(lognormal_data))
# среднее заметно больше медианы — признак скошенности вправо`} />
        <TheoryCode language="python" code={`# берём логарифм от логнормального распределения —
# получаем обратно нормальное распределение
restored_normal = np.log(lognormal_data)

print(np.mean(restored_normal), np.std(restored_normal))
# ≈ 0 и ≈ 0.5 — вернулись к исходным параметрам нормального распределения

# альтернативный способ сгенерировать то же самое через exp()
x_normal = np.random.normal(loc=0, scale=0.5, size=10000)
y_lognormal = np.exp(x_normal)   # экспонента превращает нормальное в логнормальное`} />
        <TheoryCode language="python" code={`from scipy import stats

data = np.random.normal(loc=50, scale=10, size=1000)

mean = np.mean(data)
median = np.median(data)
mode = stats.mode(data, keepdims=True).mode[0]
variance = np.var(data)
std = np.std(data)

print(f"среднее={mean:.2f}, медиана={median:.2f}, мода≈{mode:.2f}")
print(f"дисперсия={variance:.2f}, стандартное отклонение={std:.2f}")

# проверка на нормальность распределения (тест Шапиро-Уилка)
stat, p_value = stats.shapiro(data)
print(f"p-value={p_value:.4f}")
# если p-value > 0.05 — нет оснований отвергать нормальность распределения`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={9}>
          <strong>Вариационный ряд</strong> — отсортированные значения выборки, основа для построения{' '}
          <strong>таблицы частот</strong> и <strong>распределения</strong>. Распределения бывают{' '}
          <strong>нормальными</strong> (симметричные), <strong>асимметричными</strong> (скошены вправо или влево),{' '}
          <strong>полимодальными</strong> (несколько пиков) и <strong>логнормальными</strong> (логарифм даёт
          нормальное). Площадь под графиком плотности всегда равна <strong>1</strong>, а площадь между двумя
          значениями — это вероятность попадания в этот диапазон. Ключевые параметры: <strong>среднее</strong>,{' '}
          <strong>дисперсия</strong> и <strong>стандартное отклонение</strong> (с <strong>правилом трёх
          отклонений</strong>), <strong>медиана</strong>, <strong>мода</strong>, <strong>перцентили</strong> и{' '}
          <strong>квартили</strong>. В симметричном распределении среднее = медиана = мода, в асимметричном они
          расходятся — по этому признаку легко определить направление скошенности данных.
        </P>
      </section>
    </div>
  )
}
