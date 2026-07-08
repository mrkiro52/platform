import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#c8ff00', blue: '#60a5fa', green: '#4ade80', red: '#f87171', indigo: '#818cf8', border: '#2a2a3a' }

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
        fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, color: 'var(--text-primary)',
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10,
        padding: '14px 24px', textAlign: 'center', maxWidth: '100%', overflowX: 'auto',
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

export default function July8MetricsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Продуктовые метрики</h1>
        <p className="theory-subtitle">Трек: Аналитика данных</p>
        <p className="theory-date">8 июля 2026</p>
        <p>
          Продукт нельзя улучшать вслепую — нужно точно знать, что делают пользователи и насколько хорошо продукт
          решает их задачу. Сегодня разберём <strong>способы измерения поведения пользователей</strong> — как
          вообще узнать, что происходит в приложении — и главные <strong>продуктовые метрики</strong>, которыми
          эти данные превращают в понятные числа для принятия решений.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем измерять поведение пользователей</h2>
        <P n={1}>
          Без данных решения принимаются «на глаз»: кажется, что новая кнопка удобнее, но так ли это на самом
          деле — без измерений не узнать. <strong>Data-driven подход</strong> заменяет мнения фактами: любое
          изменение продукта проверяется по тому, как оно повлияло на измеримые показатели поведения и метрики.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Способы измерения поведения</h2>
        <P n={2}>
          <strong>Event tracking (событийная аналитика)</strong> — базовый способ: каждое значимое действие
          пользователя (клик по кнопке, открытие экрана, покупка) отправляется как «событие» с параметрами в
          систему аналитики (Google Analytics 4, Amplitude, Mixpanel, Яндекс.Метрика). Так собирают детальную
          историю действий каждого пользователя.
        </P>
        <P n={3}>
          <strong>Session recording и heatmaps</strong> — запись сессий пользователя (как видео его действий на
          экране) и тепловые карты кликов/скроллов показывают, где пользователи «застревают», какие элементы
          игнорируют, где кликают мимо кнопок.
        </P>
        <P n={4}>
          <strong>Опросы и интервью (qualitative research)</strong> — количественные данные (события) показывают{' '}
          <em>что</em> делают пользователи, но не отвечают на <em>почему</em>. Опросы, юзабилити-тесты и интервью
          закрывают этот пробел, добавляя контекст к цифрам.
        </P>
        <Fig caption="Событие содержит имя действия и набор параметров — по ним потом строятся все метрики и воронки">
          <svg viewBox="0 0 480 130" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="20" width="200" height="90" rx="8" fill="rgba(200,255,0,0.06)" stroke={C.lime} />
            <text x="130" y="14" fill={C.lime} fontSize="11" fontWeight="700" textAnchor="middle">событие</text>
            <text x="50" y="45" fill={C.text} fontSize="11" fontFamily="monospace">name: "add_to_cart"</text>
            <text x="50" y="65" fill={C.sub} fontSize="11" fontFamily="monospace">product_id: 42</text>
            <text x="50" y="85" fill={C.sub} fontSize="11" fontFamily="monospace">price: 1200</text>
            <text x="50" y="105" fill={C.sub} fontSize="11" fontFamily="monospace">user_id: "u_991"</text>
            <line x1="240" y1="65" x2="300" y2="65" stroke={C.sub} strokeWidth="2" markerEnd="url(#ev)" />
            <text x="390" y="45" fill={C.blue} fontSize="10" textAnchor="middle">воронки</text>
            <text x="390" y="65" fill={C.indigo} fontSize="10" textAnchor="middle">когорты</text>
            <text x="390" y="85" fill={C.green} fontSize="10" textAnchor="middle">DAU/MAU и др.</text>
            <defs>
              <marker id="ev" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Воронки (funnels)</h2>
        <P n={5}>
          <strong>Воронка</strong> — последовательность шагов, которые пользователь проходит к цели (например:
          открыл каталог → добавил в корзину → оформил заказ → оплатил). Аналитик считает, сколько пользователей
          доходит до каждого шага, и находит <strong>drop-off</strong> — шаг, на котором теряется больше всего
          людей. Именно туда чаще всего стоит вкладывать усилия по улучшению.
        </P>
        <Fig caption="Классическая воронка интернет-магазина: на каждом шаге часть пользователей уходит — самый большой обрыв (drop-off) требует внимания в первую очередь">
          <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            {[
              {w:400,l:'Открыли каталог',v:'10 000',y:15},
              {w:280,l:'Добавили в корзину',v:'3 200',y:55},
              {w:170,l:'Оформили заказ',v:'1 400',y:95},
              {w:130,l:'Оплатили',v:'1 050',y:135},
            ].map((s,i)=>(
              <g key={i}>
                <rect x={(480-s.w)/2} y={s.y} width={s.w} height="30" rx="4" fill={i===1?'rgba(248,113,113,0.15)':'rgba(200,255,0,0.10)'} stroke={i===1?C.red:C.lime} />
                <text x="240" y={s.y+20} fill={C.text} fontSize="11" textAnchor="middle">{s.l} — {s.v}</text>
              </g>
            ))}
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Когортный анализ</h2>
        <P n={6}>
          <strong>Когорта</strong> — группа пользователей, объединённых общим признаком, чаще всего датой первого
          визита («пришли на этой неделе»). <strong>Когортный анализ</strong> сравнивает поведение разных когорт
          во времени — например, удержание пользователей, пришедших в июне, против пришедших в июле — и показывает,
          улучшается продукт от месяца к месяцу или нет, в отличие от «средней температуры по больнице».
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. A/B-тестирование как способ измерения</h2>
        <P n={7}>
          Чтобы понять, действительно ли изменение (новый дизайн кнопки, другой текст) улучшает поведение, а не
          просто совпало с ним по времени, используют <strong>A/B-тест</strong>: часть пользователей видит старую
          версию, часть — новую, а разницу в метриках между группами проверяют на статистическую значимость (p-value
          — см. занятие по статистике). Так отличают реальный эффект от случайных колебаний.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Что такое продуктовая метрика</h2>
        <P n={8}>
          <strong>Продуктовая метрика</strong> — число, которое отражает, насколько хорошо продукт выполняет свою
          задачу и приносит пользу пользователям (в отличие от бизнес-метрик вроде выручки, которые показывают
          финансовый результат). Хорошая метрика измерима, понятна команде и на неё можно влиять конкретными
          действиями.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. DAU / WAU / MAU и Stickiness</h2>
        <Term name="DAU / WAU / MAU">
          число уникальных активных пользователей за день (Daily), неделю (Weekly) или месяц (Monthly Active
          Users) — базовые метрики «размера» аудитории продукта.
        </Term>
        <P n={9}>
          Отношение <strong>DAU/MAU</strong> называют <strong>stickiness</strong> («липкость») — оно показывает,
          какая доля месячной аудитории пользуется продуктом ежедневно. Чем выше — тем сильнее продукт встроен в
          повседневную жизнь пользователя.
        </P>
        <Formula note="Stickiness = 0.5 значит: типичный месячный пользователь заходит примерно 15 дней из 30">
          Stickiness = DAU / MAU
        </Formula>

        <Step n={1} title="Возьмём реальные цифры">
          <p>Пусть в приложении DAU = 1200 (заходят ежедневно), а MAU = 4000 (пользовались хотя бы раз за месяц).</p>
        </Step>
        <Step n={2} title="Подставим в формулу">
          <TheoryCode language="text" code={`Stickiness = DAU / MAU = 1200 / 4000 = 0.3`} />
        </Step>
        <Step n={3} title="Переведём число в понятный вывод">
          <p>
            0.3 значит, что типичный пользователь за месяц заходит примерно в 30% дней, то есть около 9 дней из
            30. Много это или мало — зависит от типа продукта: для мессенджера это низкий показатель, а для
            сервиса «раз в неделю» (например, заказ продуктов) — вполне нормальный.
          </p>
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Retention (удержание)</h2>
        <P n={10}>
          <strong>Retention Rate</strong> — доля пользователей, вернувшихся в продукт спустя N дней после первого
          визита. <strong>Day-N Retention</strong> смотрит на конкретный день N (например, Day-7 — вернулся ли
          пользователь ровно на 7-й день), <strong>Rolling Retention</strong> — вернулся ли хоть раз после дня N.
          Retention — одна из важнейших метрик: она напрямую показывает, нужен ли продукт людям после первого
          знакомства.
        </P>
        <Fig caption="Кривая удержания: резкое падение в первые дни — норма, но важно, чтобы кривая выходила на плато, а не падала до нуля">
          <svg viewBox="0 0 480 160" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="140" x2="450" y2="140" stroke={C.border} />
            <line x1="40" y1="140" x2="40" y2="20" stroke={C.border} />
            <text x="20" y="30" fill={C.sub} fontSize="10">%</text>
            <text x="440" y="155" fill={C.sub} fontSize="10">день</text>
            <path d="M50 30 C100 90 150 110 200 118 C280 128 350 130 440 132" fill="none" stroke={C.lime} strokeWidth="2.5" />
            <text x="240" y="145" fill={C.sub} fontSize="9" textAnchor="middle">выход на плато — хороший продукт</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Churn Rate (отток)</h2>
        <P n={11}>
          <strong>Churn Rate</strong> — доля пользователей (или подписчиков), переставших пользоваться продуктом
          за период. Это «обратная сторона» retention: чем выше отток, тем быстрее продукт теряет аудиторию,
          которую приходится восполнять новым привлечением.
        </P>
        <Formula note="если из 1000 пользователей за месяц ушло 50 — churn rate = 5%">
          Churn Rate = (ушедшие за период / было на начало периода) × 100%
        </Formula>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Conversion Rate (конверсия)</h2>
        <P n={12}>
          <strong>Conversion Rate</strong> — доля пользователей, совершивших целевое действие (покупку, регистрацию,
          подписку), от общего числа увидевших возможность это сделать. Считается на любом шаге воронки, а не
          только в самом конце.
        </P>
        <Formula note="конверсия из посетителей каталога в покупателей">
          Conversion Rate = (число совершивших действие / число всех пользователей) × 100%
        </Formula>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. LTV и CAC</h2>
        <Term name="LTV (Lifetime Value)">
          суммарная прибыль, которую в среднем приносит один пользователь за всё время использования продукта.
        </Term>
        <Term name="CAC (Customer Acquisition Cost)">
          сколько в среднем стоит привлечение одного нового пользователя (реклама, маркетинг, поделённые на число
          привлечённых).
        </Term>
        <P n={13}>
          Соотношение <strong>LTV/CAC</strong> — ключевой показатель здоровья бизнес-модели: если пользователь
          приносит меньше денег, чем стоит его привлечение (LTV/CAC &lt; 1), продукт нежизнеспособен в текущем
          виде. Обычно ориентируются на соотношение 3:1 и выше. Посчитаем на примере.
        </P>

        <Step n={1} title="Считаем LTV">
          <p>
            Пусть пользователь в среднем платит 500 руб. в месяц и остаётся с продуктом в среднем 6 месяцев
            (это можно оценить через Retention/Churn, разобранные выше).
          </p>
          <TheoryCode language="text" code={`LTV = средний платёж в месяц × среднее число месяцев с продуктом
LTV = 500 × 6 = 3000 руб.`} />
        </Step>
        <Step n={2} title="Считаем CAC">
          <p>За месяц на рекламу потратили 90 000 руб. и привлекли 100 новых платящих пользователей.</p>
          <TheoryCode language="text" code={`CAC = расходы на привлечение / число привлечённых пользователей
CAC = 90 000 / 100 = 900 руб.`} />
        </Step>
        <Step n={3} title="Считаем соотношение и делаем вывод">
          <TheoryCode language="text" code={`LTV / CAC = 3000 / 900 ≈ 3.3`} />
          <p>
            Соотношение выше ориентира 3:1 — на каждый рубль, потраченный на привлечение, продукт в среднем
            зарабатывает около 3.3 рублей за жизненный цикл пользователя. Модель выглядит здоровой.
          </p>
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">12. Фреймворк AARRR (Pirate Metrics)</h2>
        <P n={14}>
          <strong>AARRR</strong> — популярная структура для организации продуктовых метрик по стадиям
          «жизненного пути» пользователя: она помогает не забыть ни один этап при анализе продукта.
        </P>
        <TheoryTable
          headers={['Буква', 'Стадия', 'Вопрос']}
          rows={[
            ['A', 'Acquisition (привлечение)', 'как пользователи узнают о продукте?'],
            ['A', 'Activation (активация)', 'испытывают ли они первую пользу («ага-момент»)?'],
            ['R', 'Retention (удержание)', 'возвращаются ли они снова?'],
            ['R', 'Referral (реферальность)', 'рекомендуют ли продукт другим?'],
            ['R', 'Revenue (доход)', 'платят ли они и сколько?'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">13. North Star Metric</h2>
        <P n={15}>
          <strong>North Star Metric</strong> («путеводная звезда») — одна главная метрика, которая точнее всего
          отражает ценность, получаемую пользователями, и при этом ведёт к росту бизнеса. Она объединяет всю
          команду вокруг общей цели вместо того, чтобы каждый отдел оптимизировал свою узкую метрику в отрыве от
          остальных.
        </P>
        <TheoryExample title="Примеры North Star Metric">
          Spotify — «время прослушивания»; Airbnb — «количество забронированных ночей»; мессенджер — «число
          отправленных сообщений между активными пользователями». Метрика выбрана так, что рост именно её означает
          реальную пользу для людей, а не просто накрутку показателей.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={16}>
          Поведение пользователей измеряют событийной аналитикой, записями сессий, опросами, а причинно-следственные
          связи проверяют A/B-тестами. Из этих данных считают продуктовые метрики: размер аудитории (
          <strong>DAU/WAU/MAU</strong>, stickiness), удержание (<strong>Retention</strong>, обратная метрика —{' '}
          <strong>Churn</strong>), эффективность воронки (<strong>Conversion Rate</strong>) и экономику
          пользователя (<strong>LTV</strong> против <strong>CAC</strong>). Фреймворк{' '}
          <strong>AARRR</strong> структурирует метрики по стадиям пути пользователя, а{' '}
          <strong>North Star Metric</strong> объединяет команду вокруг одной главной цели.
        </P>
      </section>
    </div>
  )
}
