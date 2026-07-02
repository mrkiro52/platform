import { TheoryTable, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', green: '#4ade80', red: '#f87171', border: '#2a2a3a' }

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

function Step({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '10px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', background: 'rgba(200,255,0,0.15)',
        border: '1px solid var(--accent-lime)', color: 'var(--accent-lime)', fontWeight: 700, fontSize: 13,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{n}</span>
      <div style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.7, paddingTop: 2 }}>{children}</div>
    </div>
  )
}

export default function July2MlIntroTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Введение в машинное обучение</h1>
        <p className="theory-subtitle">Трек: Machine Learning</p>
        <p className="theory-date">2 июля 2026</p>
        <p>
          Машинное обучение (ML) — раздел искусственного интеллекта, где алгоритм <strong>сам находит
          закономерности в данных</strong> и применяет их к новым задачам, вместо того чтобы человек прописывал
          все правила вручную.
        </p>
      </section>

      {/* Классика vs ML */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Чем ML отличается от обычного программирования</h2>
        <Fig caption="Классика: человек пишет правила. ML: алгоритм выводит правила из данных и ответов">
          <svg viewBox="0 0 560 210" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <marker id="ar" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill={C.sub} />
              </marker>
            </defs>
            <text x="140" y="20" fill={C.text} fontSize="13" fontWeight="700" textAnchor="middle">Классическое программирование</text>
            {[['Правила',20],['Данные',20]].map(([t],i)=>(
              <g key={i}>
                <rect x={40+i*130} y="38" width="90" height="34" rx="6" fill="#242b3a" stroke={C.border} />
                <text x={85+i*130} y="60" fill={C.text} fontSize="12" textAnchor="middle">{t}</text>
              </g>
            ))}
            <rect x="105" y="95" width="90" height="34" rx="6" fill="rgba(200,255,0,0.1)" stroke={C.lime} />
            <text x="150" y="117" fill={C.text} fontSize="12" textAnchor="middle">Ответы</text>
            <line x1="85" y1="72" x2="140" y2="93" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#ar)" />
            <line x1="215" y1="72" x2="160" y2="93" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#ar)" />

            <text x="420" y="20" fill={C.lime} fontSize="13" fontWeight="700" textAnchor="middle">Машинное обучение</text>
            {[['Данные',20],['Ответы',20]].map(([t],i)=>(
              <g key={i}>
                <rect x={320+i*130} y="38" width="90" height="34" rx="6" fill="#242b3a" stroke={C.border} />
                <text x={365+i*130} y="60" fill={C.text} fontSize="12" textAnchor="middle">{t}</text>
              </g>
            ))}
            <rect x="385" y="95" width="90" height="34" rx="6" fill="rgba(200,255,0,0.1)" stroke={C.lime} />
            <text x="430" y="117" fill={C.text} fontSize="12" textAnchor="middle">Правила</text>
            <text x="430" y="150" fill={C.sub} fontSize="11" textAnchor="middle">(обученная модель)</text>
            <line x1="365" y1="72" x2="420" y2="93" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#ar)" />
            <line x1="495" y1="72" x2="440" y2="93" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#ar)" />
          </svg>
        </Fig>
        <p>
          В классике человек задаёт правила, программа применяет их к данным и выдаёт ответ. В ML мы подаём
          данные <strong>вместе с готовыми ответами</strong>, а алгоритм обучения выводит правила (модель) сам —
          и дальше она отвечает на новых данных.
        </p>
      </section>

      {/* Митчелл */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Формальное определение (Т. Митчелл)</h2>
        <p>
          Программа обучается на опыте <strong>E</strong> относительно класса задач <strong>T</strong> и меры
          качества <strong>P</strong>, если её качество на задачах T, измеренное мерой P, улучшается с
          накоплением опыта E.
        </p>
        <TheoryTable
          headers={['Компонент', 'Что это', 'Пример: фильтр спама']}
          rows={[
            ['T — задача', 'Что решаем', 'Определять, спам письмо или нет'],
            ['E — опыт', 'Данные для обучения', 'Тысячи писем с метками «спам / не спам»'],
            ['P — качество', 'Как измеряем успех', 'Доля правильно классифицированных писем'],
          ]}
        />
      </section>

      {/* Понятия */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Объекты, признаки, выборка</h2>
        <ul className="theory-list">
          <li><strong>Объект (пример, sample)</strong> — единица данных: одно письмо, один клиент, одна квартира.</li>
          <li><strong>Признак (feature)</strong> — измеримое свойство объекта. Объект описывается вектором признаков x = (x₁, x₂, …, x_d).</li>
          <li><strong>Типы признаков</strong>: числовые (возраст), категориальные (город), порядковые (уровень «низкий/средний/высокий»), бинарные (да/нет).</li>
          <li><strong>Целевая переменная y</strong> — то, что предсказываем (цена, класс).</li>
          <li><strong>Обучающая выборка</strong> — набор пар (xᵢ, yᵢ), на которых учится модель.</li>
        </ul>
        <Fig caption="Таблица данных: строки — объекты, столбцы — признаки, последний столбец — целевая переменная y">
          <svg viewBox="0 0 540 150" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            {['Площадь','Этаж','Комнаты','→ Цена (y)'].map((h,i)=>(
              <g key={i}>
                <rect x={20+i*128} y="15" width="126" height="32" fill={i===3?'rgba(200,255,0,0.12)':'#242b3a'} stroke={i===3?C.lime:C.border} />
                <text x={83+i*128} y="36" fill={i===3?C.lime:C.text} fontSize="12" fontWeight="700" textAnchor="middle">{h}</text>
              </g>
            ))}
            {[['45','3','2','6.2 млн'],['80','5','3','11.4 млн'],['30','1','1','4.1 млн']].map((row,r)=>(
              <g key={r}>
                {row.map((cell,i)=>(
                  <g key={i}>
                    <rect x={20+i*128} y={47+r*32} width="126" height="32" fill="none" stroke={C.border} />
                    <text x={83+i*128} y={68+r*32} fill={i===3?C.lime:C.sub} fontSize="12" textAnchor="middle">{cell}</text>
                  </g>
                ))}
              </g>
            ))}
          </svg>
        </Fig>
        <p>Наличие или отсутствие столбца ответов y и определяет главное деление: обучение с учителем или без.</p>
      </section>

      {/* Модель, ERM — выведение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Модель и обучение: выводим функционал качества</h2>
        <ul className="theory-list">
          <li><strong>Модель (гипотеза)</strong> — функция a: X → Y, которая по признакам x выдаёт предсказание ŷ. Выбирается из семейства функций, заданного параметрами θ.</li>
          <li><strong>Алгоритм обучения</strong> — процедура, подбирающая по обучающей выборке лучшие параметры θ*.</li>
          <li><strong>Параметры</strong> настраиваются автоматически (веса модели); <strong>гиперпараметры</strong> задаются заранее (сложность модели, скорость обучения).</li>
        </ul>
        <p><strong>Как измерить, насколько модель хороша? Выведем это по шагам:</strong></p>
        <Step n={1}>
          Для <strong>одного</strong> объекта ошибку между истинным ответом yᵢ и предсказанием a(xᵢ) измеряет
          <strong> функция потерь</strong> ℓ(yᵢ, a(xᵢ)). Например, квадрат разности (yᵢ − a(xᵢ))².
        </Step>
        <Step n={2}>
          Одного объекта мало — нужно оценить модель на <strong>всей</strong> обучающей выборке из n объектов.
          Складываем ошибки: ℓ(y₁, a(x₁)) + ℓ(y₂, a(x₂)) + … + ℓ(yₙ, a(xₙ)).
        </Step>
        <Step n={3}>
          Чтобы результат не зависел от размера выборки, берём <strong>среднее</strong> — делим сумму на n.
          Получаем <strong>эмпирический риск</strong>:
        </Step>
        <Formula>Q(a) = (1/n) · Σ ℓ(yᵢ, a(xᵢ))</Formula>
        <Step n={4}>
          <strong>Обучение</strong> — это поиск таких параметров модели, при которых Q(a) минимальна. Этот
          принцип называют <strong>минимизацией эмпирического риска (ERM)</strong>: находим модель, которая
          в среднем ошибается меньше всего на обучающих данных.
        </Step>
        <TheoryExample title="Коротко">
          Функция потерь оценивает ошибку на одном примере → эмпирический риск усредняет её по всей выборке →
          алгоритм обучения минимизирует этот риск, подбирая параметры. Это ядро почти любого метода ML.
        </TheoryExample>
      </section>

      {/* Недо/переобучение — график */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Недообучение и переобучение</h2>
        <p>
          Цель — не «зазубрить» обучающую выборку, а хорошо работать на <strong>новых</strong> данных. Это
          свойство называют <strong>обобщающей способностью</strong>. Есть две крайности:
        </p>
        <Fig caption="Недообучение — модель слишком проста (не улавливает форму). Переобучение — слишком сложна (повторяет шум). Оптимум — посередине">
          <svg viewBox="0 0 560 180" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {[
              { x: 10,  title: 'Недообучение', color: C.red },
              { x: 195, title: 'В самый раз', color: C.green },
              { x: 380, title: 'Переобучение', color: C.red },
            ].map((p, k) => {
              const pts = [[15,120],[35,90],[55,105],[75,70],[95,85],[115,55],[135,68],[155,40]]
              return (
                <g key={k}>
                  <text x={p.x + 85} y="16" fill={p.color} fontSize="12" fontWeight="700" textAnchor="middle">{p.title}</text>
                  <rect x={p.x} y="25" width="170" height="130" rx="6" fill="#1a1a24" stroke={C.border} />
                  {pts.map(([px,py],i)=>(
                    <circle key={i} cx={p.x + px*0.9 + 5} cy={py + 10} r="3" fill={C.sub} />
                  ))}
                  {k === 0 && <line x1={p.x+15} y1="120" x2={p.x+160} y2="55" stroke={p.color} strokeWidth="2" />}
                  {k === 1 && <path d={`M${p.x+15},128 Q${p.x+90},70 ${p.x+160},48`} fill="none" stroke={p.color} strokeWidth="2" />}
                  {k === 2 && <polyline points={pts.map(([px,py])=>`${p.x+px*0.9+5},${py+10}`).join(' ')} fill="none" stroke={p.color} strokeWidth="2" />}
                </g>
              )
            })}
          </svg>
        </Fig>
        <ul className="theory-list">
          <li><strong>Недообучение (underfitting)</strong> — модель слишком проста: большая ошибка и на обучении, и на новых данных.</li>
          <li><strong>Переобучение (overfitting)</strong> — модель слишком сложна и подстроилась под шум: ошибка на обучении почти ноль, а на новых данных велика.</li>
          <li><strong>Дилемма смещения–разброса</strong>: простые модели дают большое смещение (bias), сложные — большой разброс (variance). Нужен баланс.</li>
          <li><strong>Контроль</strong>: оценка на отложенных данных — валидация и кросс-валидация.</li>
        </ul>
      </section>

      {/* Парадигмы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Четыре парадигмы машинного обучения</h2>
        <p>Главный критерий — есть ли в данных «учитель», то есть правильные ответы (целевая переменная).</p>
        <ul className="theory-list">
          <li><strong>С учителем (supervised)</strong> — есть пары (xᵢ, yᵢ); учимся предсказывать y по x.</li>
          <li><strong>Без учителя (unsupervised)</strong> — только объекты xᵢ; ищем скрытую структуру.</li>
          <li><strong>Частичное (semi-supervised)</strong> — размечена лишь малая часть данных.</li>
          <li><strong>С подкреплением (reinforcement)</strong> — агент действует в среде и учится на вознаграждениях.</li>
        </ul>
      </section>

      {/* С учителем: классиф vs регрессия график */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Обучение с учителем: классификация и регрессия</h2>
        <p>Дана размеченная выборка. Задача делится на два типа по тому, каким бывает ответ y:</p>
        <Fig caption="Классификация — провести границу между классами (ответ — метка). Регрессия — провести линию тренда (ответ — число)">
          <svg viewBox="0 0 560 190" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            {/* классификация */}
            <text x="140" y="16" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Классификация</text>
            <rect x="20" y="25" width="240" height="150" rx="6" fill="#1a1a24" stroke={C.border} />
            {[[55,60],[80,50],[70,90],[100,75],[60,120]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill={C.green} />
            ))}
            {[[180,110],[210,130],[195,90],[220,150],[230,105]].map(([x,y],i)=>(
              <rect key={i} x={x-5} y={y-5} width="10" height="10" fill={C.red} />
            ))}
            <line x1="40" y1="165" x2="250" y2="45" stroke={C.lime} strokeWidth="2" strokeDasharray="5 4" />
            <text x="140" y="70" fill={C.lime} fontSize="10">граница</text>

            {/* регрессия */}
            <text x="420" y="16" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">Регрессия</text>
            <rect x="300" y="25" width="240" height="150" rx="6" fill="#1a1a24" stroke={C.border} />
            {[[330,150],[360,140],[390,120],[420,115],[450,95],[480,80],[510,65]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill="#818cf8" />
            ))}
            <line x1="325" y1="158" x2="515" y2="60" stroke={C.lime} strokeWidth="2" />
            <text x="470" y="120" fill={C.lime} fontSize="10">тренд</text>
          </svg>
        </Fig>
        <ul className="theory-list">
          <li><strong>Классификация</strong> — ответ дискретный, из конечного набора классов {'{'}c₁, …, cₖ{'}'}: «спам / не спам», «кошка / собака».</li>
          <li><strong>Регрессия</strong> — ответ непрерывный (число): цена квартиры, температура, спрос.</li>
        </ul>
        <p><strong>Схема:</strong> размеченные данные → алгоритм обучения → модель a(x) → прогноз ŷ для нового объекта.</p>
        <TheoryExample title="Примеры задач с учителем">
          Фильтрация спама, кредитный скоринг, медицинская диагностика, прогноз стоимости недвижимости.
        </TheoryExample>
      </section>

      {/* Без учителя */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Обучение без учителя</h2>
        <p>Дана неразмеченная выборка — только объекты xᵢ. Цель — найти скрытую структуру данных.</p>
        <Fig caption="Кластеризация: алгоритм сам группирует похожие объекты, хотя меток классов у него не было">
          <svg viewBox="0 0 560 170" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <text x="140" y="16" fill={C.sub} fontSize="12" textAnchor="middle">Было: просто точки</text>
            <rect x="20" y="25" width="230" height="135" rx="6" fill="#1a1a24" stroke={C.border} />
            {[[60,60],[80,50],[70,80],[180,60],[200,80],[190,50],[110,130],[130,120],[100,115]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5" fill={C.sub} />
            ))}
            <text x="420" y="16" fill={C.lime} fontSize="12" textAnchor="middle">Стало: 3 кластера</text>
            <rect x="310" y="25" width="230" height="135" rx="6" fill="#1a1a24" stroke={C.border} />
            {[[350,60],[370,50],[360,80]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={C.green} />)}
            {[[470,60],[490,80],[480,50]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#818cf8" />)}
            {[[400,130],[420,120],[390,115]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill={C.red} />)}
            <ellipse cx="362" cy="63" rx="30" ry="28" fill="none" stroke={C.green} strokeDasharray="4 3" />
            <ellipse cx="480" cy="63" rx="30" ry="28" fill="none" stroke="#818cf8" strokeDasharray="4 3" />
            <ellipse cx="403" cy="122" rx="30" ry="24" fill="none" stroke={C.red} strokeDasharray="4 3" />
          </svg>
        </Fig>
        <ul className="theory-list">
          <li><strong>Кластеризация</strong> — разбить объекты на группы: внутри похожи, между группами различны.</li>
          <li><strong>Снижение размерности</strong> — сжать данные, сохранив суть (для визуализации, ускорения).</li>
          <li><strong>Поиск ассоциаций</strong> — найти совместные зависимости («покупают вместе»).</li>
          <li><strong>Обнаружение аномалий</strong> — выделить объекты, резко отличающиеся от остальных.</li>
        </ul>
        <TheoryExample title="Примеры задач без учителя">
          Сегментация клиентов, группировка новостей по темам, выявление мошеннических операций.
        </TheoryExample>
      </section>

      {/* Сравнение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. С учителем vs без учителя</h2>
        <TheoryTable
          headers={['Критерий', 'С учителем', 'Без учителя']}
          rows={[
            ['Данные', 'Пары (xᵢ, yᵢ)', 'Только объекты xᵢ'],
            ['Цель', 'Восстановить y = a(x)', 'Найти скрытую структуру'],
            ['Эталон', 'Есть правильные ответы', 'Ответов нет'],
            ['Типы задач', 'Классификация, регрессия', 'Кластеризация, снижение размерности, аномалии'],
            ['Оценка качества', 'Прямая (сравнение с yᵢ)', 'Косвенная / экспертная'],
            ['Стоимость данных', 'Высокая (нужна разметка)', 'Ниже (разметка не нужна)'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Выводы</h2>
        <ul className="theory-list">
          <li>ML извлекает правила из данных, а не программирует их вручную; формально задаётся тройкой T–E–P.</li>
          <li>Ключевые понятия: объект и признаки, целевая переменная, обучающая выборка, модель, функция потерь.</li>
          <li>Обучение — минимизация эмпирического риска Q(a) (принцип ERM), выведенного из ошибки на отдельных примерах.</li>
          <li>Главная опасность — переобучение; борются с ним валидацией и контролем сложности модели.</li>
          <li>По наличию «учителя» задачи делятся на 4 парадигмы; с учителем — это классификация и регрессия.</li>
          <li>Без учителя решают кластеризацию, снижение размерности, поиск ассоциаций и аномалий.</li>
        </ul>
      </section>
    </div>
  )
}
