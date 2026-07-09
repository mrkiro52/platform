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

export default function July9MatplotlibTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Визуализация данных: Matplotlib</h1>
        <p className="theory-subtitle">Треки: Аналитика данных и Machine Learning</p>
        <p className="theory-date">9 июля 2026</p>
        <p>
          Цифры в таблице почти невозможно понять на глаз, а на графике закономерность видна мгновенно.{' '}
          <strong>Matplotlib</strong> — базовая и самая распространённая библиотека визуализации в Python, на
          которой построены почти все остальные (включая seaborn и графики pandas). Сегодня разберём, зачем нужна
          визуализация, как устроена фигура matplotlib, основные типы графиков и как их оформлять.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужна визуализация данных</h2>
        <P n={1}>
          Визуализация решает три задачи. <strong>Разведочный анализ (EDA)</strong> — быстро понять, как устроены
          данные: распределение, выбросы, связи между признаками. <strong>Проверка гипотез</strong> — увидеть,
          есть ли зависимость, которую потом подтвердят статистикой. <strong>Коммуникация</strong> — донести
          вывод до людей, которые не будут читать таблицы и код.
        </P>
        <TheoryExample title="Квартет Энскомба">
          Четыре набора данных могут иметь одинаковые среднее, дисперсию и коэффициент корреляции — но выглядеть
          на графике совершенно по-разному (линия, парабола, выброс). Это классический пример того, что одни
          числовые сводки обманчивы, а график сразу показывает правду.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Установка и импорт</h2>
        <P n={2}>
          Matplotlib ставится через pip. Рисованием занимается модуль <code>pyplot</code>, который по традиции
          импортируют как <code>plt</code>.
        </P>
        <TheoryCode language="bash" code={`pip install matplotlib`} />
        <TheoryCode language="python" code={`import matplotlib.pyplot as plt   # общепринятое сокращение
import numpy as np`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Первый график за две строки</h2>
        <P n={3}>
          Самый быстрый способ — «государственный» (pyplot) интерфейс: <code>plt.plot(...)</code> рисует, а{' '}
          <code>plt.show()</code> открывает окно с графиком. Matplotlib сам создаёт фигуру и оси под капотом.
        </P>
        <TheoryCode language="python" code={`x = [1, 2, 3, 4, 5]
y = [1, 4, 9, 16, 25]

plt.plot(x, y)     # построить линию по точкам (x, y)
plt.show()         # показать график`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Анатомия фигуры: Figure и Axes</h2>
        <P n={4}>
          Чтобы контролировать график, нужно понимать его устройство. <strong>Figure</strong> — весь холст
          (окно/картинка целиком). <strong>Axes</strong> — отдельная область с координатной сеткой, где рисуется
          график (на одной Figure их может быть несколько). Не путать с <strong>axis</strong> — это одна ось (X
          или Y) внутри Axes.
        </P>
        <Fig caption="Figure — весь холст. Внутри него один или несколько Axes (области рисования), у каждого — оси X и Y, заголовок, подписи">
          <svg viewBox="0 0 480 250" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="440" height="210" rx="8" fill="none" stroke={C.lime} strokeWidth="1.5" />
            <text x="30" y="15" fill={C.lime} fontSize="12" fontWeight="700">Figure (весь холст)</text>
            <rect x="70" y="55" width="360" height="150" rx="4" fill="rgba(96,165,250,0.05)" stroke={C.blue} />
            <text x="80" y="50" fill={C.blue} fontSize="11" fontWeight="700">Axes (область графика)</text>
            <line x1="100" y1="185" x2="410" y2="185" stroke={C.sub} strokeWidth="1.5" />
            <line x1="100" y1="185" x2="100" y2="70" stroke={C.sub} strokeWidth="1.5" />
            <text x="255" y="200" fill={C.sub} fontSize="10" textAnchor="middle">axis X</text>
            <text x="85" y="130" fill={C.sub} fontSize="10" textAnchor="middle" transform="rotate(-90 85 130)">axis Y</text>
            <path d="M110 175 L180 140 L250 150 L320 100 L400 85" fill="none" stroke={C.green} strokeWidth="2" />
          </svg>
        </Fig>
        <P n={5}>
          Профессиональный подход — <strong>объектно-ориентированный</strong>: явно создать Figure и Axes через{' '}
          <code>plt.subplots()</code> и рисовать методами объекта <code>ax</code>. Так код понятнее и легче
          управлять несколькими графиками.
        </P>
        <TheoryCode language="python" code={`fig, ax = plt.subplots()   # создаём фигуру и одну область осей
ax.plot(x, y)              # рисуем на конкретных осях ax
ax.set_title('Мой график')
plt.show()`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Линейный график (line plot)</h2>
        <P n={6}>
          Линейный график — для данных, где важен <strong>порядок</strong> или изменение во времени (динамика
          цены, температура по дням). Точки соединяются линией.
        </P>
        <TheoryCode language="python" code={`x = np.linspace(0, 10, 100)   # 100 точек от 0 до 10

fig, ax = plt.subplots()
ax.plot(x, np.sin(x), label='sin(x)')          # первая линия
ax.plot(x, np.cos(x), label='cos(x)', linestyle='--')  # вторая, пунктиром
ax.legend()      # показать легенду по label
plt.show()`} />
        <Fig caption="Линейный график: подходит для непрерывных данных и динамики во времени. Несколько линий различают цветом и стилем (сплошная, пунктир)">
          <svg viewBox="0 0 460 180" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="150" x2="440" y2="150" stroke={C.border} />
            <line x1="40" y1="150" x2="40" y2="20" stroke={C.border} />
            <path d="M40 85 Q100 20 160 85 Q220 150 280 85 Q340 20 400 85" fill="none" stroke={C.green} strokeWidth="2" />
            <path d="M40 30 Q100 95 160 30 Q220 -35 280 95" fill="none" stroke={C.blue} strokeWidth="2" strokeDasharray="5 4" />
            <text x="405" y="80" fill={C.green} fontSize="11">sin</text>
            <text x="285" y="110" fill={C.blue} fontSize="11">cos</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Диаграмма рассеяния (scatter plot)</h2>
        <P n={7}>
          Scatter — для оценки <strong>связи между двумя переменными</strong>: каждая точка это один объект с
          координатами (x, y). По облаку точек видно, есть ли зависимость (например, чем больше площадь квартиры,
          тем выше цена).
        </P>
        <TheoryCode language="python" code={`fig, ax = plt.subplots()
ax.scatter(area, price, alpha=0.6)   # alpha — прозрачность (видно скопления)
ax.set_xlabel('Площадь, м²')
ax.set_ylabel('Цена, млн ₽')
plt.show()`} />
        <Fig caption="Диаграмма рассеяния: восходящее облако точек говорит о положительной связи между переменными">
          <svg viewBox="0 0 460 180" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="150" x2="440" y2="150" stroke={C.border} />
            <line x1="40" y1="150" x2="40" y2="20" stroke={C.border} />
            {[[70,135],[100,120],[130,125],[160,105],[190,110],[220,90],[250,95],[280,70],[310,80],[340,55],[370,60],[400,40]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="4" fill={C.green} opacity="0.7" />
            ))}
            <line x1="55" y1="140" x2="415" y2="45" stroke={C.lime} strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Столбчатая диаграмма (bar chart)</h2>
        <P n={8}>
          Bar — для сравнения <strong>категорий</strong> между собой (продажи по городам, число студентов по
          трекам). Высота столбца = значение.
        </P>
        <TheoryCode language="python" code={`cities = ['Москва', 'Казань', 'Сочи']
sales = [120, 85, 60]

fig, ax = plt.subplots()
ax.bar(cities, sales, color='#4ade80')
ax.set_ylabel('Продажи')
plt.show()

# ax.barh(...) — горизонтальные столбцы (удобно для длинных подписей)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Гистограмма (histogram)</h2>
        <P n={9}>
          Гистограмма показывает <strong>распределение одной числовой переменной</strong>: диапазон значений
          делят на интервалы (bins) и считают, сколько наблюдений попало в каждый. Так видно форму распределения
          (нормальное, скошенное), где сосредоточена масса данных, есть ли выбросы. Не путать со столбчатой:
          bar сравнивает категории, hist показывает распределение чисел.
        </P>
        <TheoryCode language="python" code={`data = np.random.normal(170, 10, 1000)   # рост 1000 человек

fig, ax = plt.subplots()
ax.hist(data, bins=30, color='#60a5fa', edgecolor='black')
ax.set_xlabel('Рост, см')
ax.set_ylabel('Количество людей')
plt.show()`} />
        <Fig caption="Гистограмма нормально распределённых данных: «колокол» вокруг среднего. Число bins влияет на детализацию картины">
          <svg viewBox="0 0 460 180" width="100%" style={{ maxWidth: 460 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="150" x2="440" y2="150" stroke={C.border} />
            {[20,35,55,80,110,135,120,90,60,40,25,15].map((h,i)=>(
              <rect key={i} x={45+i*32} y={150-h} width="30" height={h} fill="rgba(96,165,250,0.5)" stroke={C.blue} />
            ))}
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Несколько графиков: subplots</h2>
        <P n={10}>
          Часто нужно показать несколько графиков рядом. <code>plt.subplots(rows, cols)</code> создаёт сетку осей;{' '}
          <code>ax</code> становится массивом, и к каждой ячейке обращаются по индексу.
        </P>
        <TheoryCode language="python" code={`fig, axes = plt.subplots(1, 2, figsize=(10, 4))   # 1 строка, 2 колонки

axes[0].plot(x, np.sin(x))
axes[0].set_title('Синус')

axes[1].hist(data, bins=20)
axes[1].set_title('Распределение')

plt.tight_layout()   # аккуратно расставить, чтобы подписи не наезжали
plt.show()`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Оформление графика</h2>
        <P n={11}>
          График без подписей бесполезен: читатель не поймёт, что на осях. Основные методы оформления вызывают на
          объекте <code>ax</code>.
        </P>
        <TheoryTable
          headers={['Метод', 'Что делает']}
          rows={[
            ['ax.set_title("...")', 'заголовок графика'],
            ['ax.set_xlabel / set_ylabel', 'подписи осей X и Y'],
            ['ax.legend()', 'легенда (по label у линий)'],
            ['ax.grid(True)', 'сетка на фоне'],
            ['ax.set_xlim / set_ylim', 'диапазон осей'],
            ['plt.savefig("plot.png")', 'сохранить график в файл'],
          ]}
        />
        <TheoryCode language="python" code={`fig, ax = plt.subplots(figsize=(8, 5))
ax.plot(x, y, color='#c8ff00', linewidth=2, marker='o')
ax.set_title('Зависимость Y от X')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.grid(True, alpha=0.3)
plt.savefig('plot.png', dpi=150)   # сохранить в файл вместо показа`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. Matplotlib, pandas и seaborn</h2>
        <P n={12}>
          На практике matplotlib редко используют «голым». У <strong>pandas</strong> есть встроенный метод{' '}
          <code>.plot()</code>, который под капотом вызывает matplotlib — можно строить график прямо из DataFrame.
          А <strong>seaborn</strong> — надстройка над matplotlib с красивыми стилями по умолчанию и готовыми
          статистическими графиками (тепловые карты, ящики с усами, распределения) в одну строку.
        </P>
        <TheoryCode language="python" code={`# График прямо из pandas
df['salary'].plot(kind='hist', bins=20)

# seaborn — красиво и коротко
import seaborn as sns
sns.scatterplot(data=df, x='area', y='price', hue='city')  # цвет по городу
sns.heatmap(df.corr(), annot=True)   # тепловая карта корреляций`} />
        <TheoryExample title="Что выбрать">
          Для быстрого разведочного анализа — <code>df.plot()</code> и seaborn. Когда нужен полный контроль над
          каждым элементом (научная статья, отчёт с точным оформлением) — чистый matplotlib. Но фундамент везде
          один, поэтому его и учат первым.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={13}>
          Визуализация нужна для разведочного анализа, проверки гипотез и коммуникации выводов. В matplotlib холст
          — это <strong>Figure</strong>, а области рисования — <strong>Axes</strong>; профессиональный способ —
          объектный интерфейс через <code>fig, ax = plt.subplots()</code>. Основные типы графиков:{' '}
          <strong>line</strong> (динамика во времени), <strong>scatter</strong> (связь двух переменных),{' '}
          <strong>bar</strong> (сравнение категорий), <strong>hist</strong> (распределение чисел). Несколько
          графиков размещают через <code>subplots(rows, cols)</code>, а оформляют методами{' '}
          <code>set_title/set_xlabel/legend/grid</code>. Поверх matplotlib работают pandas.plot() и seaborn — но
          фундамент везде один.
        </P>
      </section>
    </div>
  )
}
