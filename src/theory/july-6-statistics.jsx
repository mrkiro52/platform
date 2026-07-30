import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', green: '#4ade80', blue: '#60a5fa', red: '#f87171', border: '#2a2a3a' }

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

const It = ({ children }) => <span style={{ fontStyle: 'italic' }}>{children}</span>
const Sub = ({ children }) => <sub style={{ fontSize: '0.7em' }}>{children}</sub>
const Sup = ({ children }) => <sup style={{ fontSize: '0.7em' }}>{children}</sup>
const Frac = ({ a, b }) => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle', fontSize: '0.75em', textAlign: 'center' }}>
    <span style={{ padding: '0 4px' }}>{a}</span>
    <span style={{ borderTop: '1px solid currentColor', padding: '0 4px' }}>{b}</span>
  </span>
)

export default function July6StatisticsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Математическая статистика: основные понятия</h1>
        <p className="theory-subtitle">Трек: Аналитика данных</p>
        <p className="theory-date">6 июля 2026</p>
        <p>
          Статистика — это язык, на котором аналитик разговаривает с данными. Она отвечает на два вопроса:{' '}
          <strong>как коротко описать имеющиеся данные</strong> и <strong>как по маленькой выборке сделать вывод
          обо всей огромной совокупности</strong>. За час пройдём базу: от генеральной совокупности и выборки до
          доверительных интервалов и проверки гипотез — минимум, без которого не построить ни одного честного
          вывода из данных.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Видео-лекция: Математическая статистика</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/analyticsDay7.mov" />
      </section>

      {/* Совокупность и выборка */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Генеральная совокупность и выборка</h2>
        <Term name="Генеральная совокупность">
          все объекты, которые нас интересуют: все клиенты банка, все жители города, все возможные броски монеты.
          Обычно измерить её целиком невозможно или слишком дорого.
        </Term>
        <Term name="Выборка">
          часть совокупности, которую мы реально наблюдаем и измеряем. По ней делаем выводы обо всей совокупности.
          Главное требование — <strong>репрезентативность</strong>: выборка должна «похоже» отражать целое, иначе
          выводы будут смещены.
        </Term>
        <Fig caption="Мы не можем измерить всю генеральную совокупность, поэтому берём выборку и по ней оцениваем параметры целого">
          <svg viewBox="0 0 520 190" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            <circle cx="140" cy="95" r="80" fill="rgba(96,165,250,0.07)" stroke={C.blue} />
            <text x="140" y="30" fill={C.blue} fontSize="12" fontWeight="700" textAnchor="middle">Генеральная совокупность</text>
            {Array.from({length: 40}).map((_,i)=>{
              const a=i*0.61, r=15+((i*29)%60); const x=140+Math.cos(a)*r, y=95+Math.sin(a)*r
              const inSample=i%7===0
              return <circle key={i} cx={x} cy={y} r="3.5" fill={inSample?C.lime:'rgba(96,165,250,0.5)'} />
            })}
            <line x1="222" y1="95" x2="300" y2="95" stroke={C.sub} strokeWidth="2" markerEnd="url(#sa)" />
            <text x="261" y="86" fill={C.sub} fontSize="10" textAnchor="middle">берём</text>
            <rect x="310" y="55" width="180" height="80" rx="8" fill="rgba(32,190,255,0.06)" stroke={C.lime} />
            <text x="400" y="45" fill={C.lime} fontSize="12" fontWeight="700" textAnchor="middle">Выборка</text>
            {[0,1,2,3,4,5].map(i=>(<circle key={i} cx={335+ (i%3)*55} cy={80+Math.floor(i/3)*35} r="4" fill={C.lime} />))}
            <defs>
              <marker id="sa" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* Меры центра */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Описательные статистики: меры центра</h2>
        <p>Первое, что делают с числовыми данными — считают, где их «центр».</p>
        <Term name="Среднее (mean)">
          сумма всех значений, делённая на их количество. Чувствительно к выбросам: один миллиардер сильно поднимет
          «среднюю зарплату».
        </Term>
        <Formula note="x̄ — выборочное среднее; N — размер выборки">
          <It>x̄</It> = <Frac a="1" b="N" /> ∑<Sub>i=1..N</Sub> <It>x</It><Sub>i</Sub>
        </Formula>
        <Term name="Медиана (median)">
          значение «посередине», если отсортировать данные: половина меньше, половина больше. Устойчива к выбросам,
          поэтому «медианную зарплату» считают честнее среднего.
        </Term>
        <Term name="Мода (mode)">
          самое частое значение. Полезна для категорий («самый популярный товар»).
        </Term>
        <TheoryExample title="Среднее против медианы">
          Зарплаты: 30, 35, 40, 45, 500 (тыс). Среднее = 130, но оно обмануто выбросом 500. Медиана = 40 — куда
          правдивее отражает «типичную» зарплату. Всегда смотри на обе.
        </TheoryExample>
      </section>

      {/* Меры разброса */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Меры разброса</h2>
        <p>Центр не всё: важно, насколько данные «размазаны» вокруг него.</p>
        <Term name="Дисперсия (variance)">
          средний квадрат отклонения от среднего. Показывает разброс, но в «квадратных» единицах.
        </Term>
        <Formula note="σ² — дисперсия: усреднённый квадрат отклонения от среднего">
          <It>σ</It><Sup>2</Sup> = <Frac a="1" b="N" /> ∑<Sub>i=1..N</Sub> (<It>x</It><Sub>i</Sub> − <It>x̄</It>)<Sup>2</Sup>
        </Formula>
        <Term name="Стандартное отклонение (СКО, σ)">
          корень из дисперсии — тот же разброс, но в исходных единицах (рубли, см). Именно его обычно приводят
          рядом со средним: «100 ± 15».
        </Term>
        <Term name="Размах и квантили">
          размах = max − min. <strong>Квантиль</strong> уровня p — значение, ниже которого лежит доля p данных.
          Квартили (25%, 50%, 75%) делят данные на четыре части; медиана — это квантиль 50%.
        </Term>
        <Fig caption="Два набора с одинаковым средним, но разным разбросом: у оранжевого σ маленькое (данные кучно), у синего — большое">
          <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="140" x2="450" y2="140" stroke={C.border} />
            <line x1="240" y1="145" x2="240" y2="30" stroke={C.red} strokeDasharray="4 3" />
            <text x="240" y="24" fill={C.red} fontSize="11" textAnchor="middle">общее среднее</text>
            <path d="M170 140 Q240 20 310 140 Z" fill="rgba(74,222,128,0.15)" stroke={C.green} strokeWidth="2" />
            <path d="M60 140 Q240 70 420 140 Z" fill="rgba(96,165,250,0.10)" stroke={C.blue} strokeWidth="2" />
            <text x="330" y="110" fill={C.green} fontSize="11">малое σ</text>
            <text x="380" y="132" fill={C.blue} fontSize="11">большое σ</text>
          </svg>
        </Fig>
      </section>

      {/* Распределения */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Случайные величины и распределения</h2>
        <Term name="Случайная величина">
          величина, значение которой зависит от случая (результат броска кубика, рост случайного человека).
        </Term>
        <Term name="Распределение">
          закон, который говорит, какие значения случайная величина принимает и с какой вероятностью/частотой.
          Его рисуют гистограммой (для данных) или кривой плотности (для теории).
        </Term>
        <Term name="Нормальное распределение (Гаусса)">
          самая частая «колоколообразная» кривая, симметричная относительно среднего. Правило{' '}
          <strong>68–95–99.7</strong>: в интервал ±1σ попадает ~68% значений, ±2σ — ~95%, ±3σ — ~99.7%.
        </Term>
        <Fig caption="Нормальное распределение: колокол вокруг среднего μ. В ±1σ лежит 68% данных, в ±2σ — 95%">
          <svg viewBox="0 0 480 200" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="30" y1="165" x2="450" y2="165" stroke={C.border} />
            <path d="M40 165 C150 165 175 40 240 40 C305 40 330 165 440 165" fill="rgba(32,190,255,0.08)" stroke={C.lime} strokeWidth="2.5" />
            {[[190,'−1σ'],[290,'+1σ'],[140,'−2σ'],[340,'+2σ']].map(([x,l],i)=>(
              <g key={i}><line x1={x} y1="60" x2={x} y2="165" stroke={C.sub} strokeDasharray="3 3" /><text x={x} y="180" fill={C.sub} fontSize="10" textAnchor="middle">{l}</text></g>
            ))}
            <line x1="240" y1="40" x2="240" y2="165" stroke={C.red} strokeWidth="1.5" />
            <text x="240" y="180" fill={C.red} fontSize="11" textAnchor="middle">μ</text>
            <text x="240" y="120" fill={C.text} fontSize="12" textAnchor="middle">68%</text>
            <text x="240" y="150" fill={C.sub} fontSize="10" textAnchor="middle">±1σ</text>
          </svg>
        </Fig>
      </section>

      {/* ЦПТ и оценка */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Оценка параметров и ЦПТ</h2>
        <p>
          По выборке мы <strong>оцениваем</strong> неизвестные параметры совокупности: выборочное среднее{' '}
          <It>x̄</It> — оценка истинного среднего <It>μ</It>. Но оценка не точна — на другой выборке она была бы
          другой. Насколько она «гуляет», объясняет ключевая теорема:
        </p>
        <Term name="Центральная предельная теорема (ЦПТ)">
          среднее по выборке при росте <It>N</It> распределено примерно <strong>нормально</strong> вокруг
          истинного среднего — почти независимо от того, как распределены сами данные. Разброс этого среднего
          (стандартная ошибка) уменьшается как <It>σ</It>/√<It>N</It>: <strong>вчетверо больше данных → вдвое
          точнее оценка</strong>.
        </Term>
        <Formula note="стандартная ошибка среднего убывает как корень из размера выборки">
          SE = <Frac a={<It>σ</It>} b={<span>√<It>N</It></span>} />
        </Formula>
      </section>

      {/* Доверительные интервалы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Доверительные интервалы</h2>
        <Term name="Доверительный интервал (ДИ)">
          интервал вокруг оценки, который с заданной надёжностью (обычно 95%) «накрывает» истинный параметр. Вместо
          одного числа «среднее = 100» честнее сказать «среднее в пределах 100 ± 3 с надёжностью 95%».
        </Term>
        <Formula note="95%-й доверительный интервал для среднего (при известном σ): 1.96 — квантиль нормального распределения">
          <It>x̄</It> ± 1.96 · <Frac a={<It>σ</It>} b={<span>√<It>N</It></span>} />
        </Formula>
        <TheoryExample title="Как читать 95%">
          «95% надёжности» значит: если много раз повторять эксперимент и каждый раз строить такой интервал, то
          примерно в 95% случаев он накроет настоящее среднее. Чем больше выборка — тем уже интервал.
        </TheoryExample>
      </section>

      {/* Проверка гипотез */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Проверка гипотез</h2>
        <p>
          Часто нужно ответить да/нет: «новая версия сайта правда лучше?», «влияет ли реклама на продажи?». Для
          этого используют проверку статистических гипотез.
        </p>
        <Term name="Нулевая гипотеза H₀">
          «скучное» предположение: разницы/эффекта нет (новая версия не отличается от старой). Мы пытаемся её{' '}
          <strong>опровергнуть</strong>.
        </Term>
        <Term name="Альтернативная гипотеза H₁">
          то, что мы хотим показать: эффект есть.
        </Term>
        <Term name="p-value (p-значение)">
          вероятность увидеть наблюдаемые (или ещё более экстремальные) данные, <strong>если H₀ верна</strong>.
          Маленькое p — данные плохо согласуются с «эффекта нет». Порог обычно <strong>0.05</strong>: если{' '}
          p &lt; 0.05, H₀ отвергают («результат статистически значим»).
        </Term>
        <TheoryTable
          headers={['Результат', 'Вывод']}
          rows={[
            ['p < 0.05', 'отвергаем H₀ — эффект статистически значим'],
            ['p ≥ 0.05', 'нет оснований отвергнуть H₀ — эффект не доказан'],
          ]}
        />
        <TheoryExample title="Осторожно с p-value">
          «p ≥ 0.05» не значит «эффекта точно нет» — значит «данных не хватило, чтобы его доказать». И статистическая
          значимость не равна практической важности: на огромной выборке значимой становится даже ничтожная разница.
        </TheoryExample>
      </section>

      {/* Практика */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Всё это — в две строки на Python</h2>
        <TheoryCode language="python" code={`import numpy as np

data = np.array([30, 35, 40, 45, 50, 42, 38])

data.mean()          # среднее
np.median(data)      # медиана
data.std()           # стандартное отклонение (σ)
data.var()           # дисперсия
np.percentile(data, [25, 50, 75])   # квартили

# 95% доверительный интервал для среднего
se = data.std(ddof=1) / np.sqrt(len(data))   # стандартная ошибка
ci = (data.mean() - 1.96 * se, data.mean() + 1.96 * se)`} />
        <TheoryCode language="python" code={`from scipy import stats

# t-тест: отличается ли средний чек в двух группах A и B?
group_a = np.array([100, 120, 95, 110, 105])
group_b = np.array([130, 125, 140, 120, 135])
t_stat, p_value = stats.ttest_ind(group_a, group_b)
# если p_value < 0.05 — разница между группами статистически значима`} />
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          Мы работаем с <strong>выборкой</strong>, чтобы делать выводы о <strong>генеральной совокупности</strong>.
          Данные описывают <strong>мерами центра</strong> (среднее, медиана, мода) и{' '}
          <strong>мерами разброса</strong> (дисперсия, СКО, квантили). Случайные величины подчиняются{' '}
          <strong>распределениям</strong>, чаще всего нормальному (правило 68–95–99.7). По{' '}
          <strong>ЦПТ</strong> выборочное среднее нормально вокруг истинного, а его точность растёт как √<It>N</It>.{' '}
          <strong>Доверительный интервал</strong> честно показывает диапазон оценки, а{' '}
          <strong>проверка гипотез</strong> через <strong>p-value</strong> помогает решить, значим ли эффект.
          Это фундамент, на котором стоят A/B-тесты, аналитика и всё машинное обучение.
        </p>
      </section>
    </div>
  )
}
