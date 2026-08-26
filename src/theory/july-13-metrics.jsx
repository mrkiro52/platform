import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#FFD60A', green: '#4ade80', blue: '#60a5fa', red: '#f87171', indigo: '#818cf8', border: '#2a2a3a' }

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

function Formula({ children, note }) {
  return (
    <div style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{
        fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 22, color: 'var(--text-primary)',
        background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10,
        padding: '14px 26px', textAlign: 'center', maxWidth: '100%', overflowX: 'auto',
      }}>{children}</div>
      {note && <div style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center' }}>{note}</div>}
    </div>
  )
}

const It = ({ children }) => <span style={{ fontStyle: 'italic' }}>{children}</span>
const Sub = ({ children }) => <sub style={{ fontSize: '0.7em' }}>{children}</sub>
const Frac = ({ a, b }) => (
  <span style={{ display: 'inline-flex', flexDirection: 'column', verticalAlign: 'middle', fontSize: '0.72em', textAlign: 'center' }}>
    <span style={{ padding: '0 4px' }}>{a}</span>
    <span style={{ borderTop: '1px solid currentColor', padding: '0 4px' }}>{b}</span>
  </span>
)

export default function July13MetricsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Метрики классификации и регрессии</h1>
        <p className="theory-subtitle">Трек: Machine Learning</p>
        <p className="theory-date">13 июля 2026</p>
        <p>
          Мало обучить модель — нужно уметь честно измерить, насколько хорошо она работает. Для этого существует
          набор стандартных метрик, свой для задач <strong>классификации</strong> и свой для{' '}
          <strong>регрессии</strong>. Сегодня разберём их все: что каждая метрика измеряет, как считается и когда
          вводит в заблуждение, если выбрать не ту.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Классификация и регрессия — коротко</h2>
        <P n={1}>
          <strong>Классификация</strong> — предсказание категории из конечного набора (спам/не спам, кошка/собака,
          одобрить/отказать кредит). <strong>Регрессия</strong> — предсказание числа на непрерывной шкале (цена
          квартиры, температура завтра). У этих двух типов задач принципиально разные метрики качества: нельзя
          посчитать «точность» для регрессии или MSE для классов.
        </P>
      </section>

      {/* ===== ЧАСТЬ 1: КЛАССИФИКАЦИЯ ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Часть 1. Метрики классификации</h2>
        <P n={2}>
          В основе почти всех метрик классификации лежит <strong>матрица ошибок (confusion matrix)</strong> —
          таблица, которая сравнивает предсказания модели с реальностью для бинарной задачи (два класса:
          «положительный» и «отрицательный»).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Матрица ошибок: TP, FP, TN, FN</h2>
        <Term name="TP (True Positive)">объект реально положительный, и модель верно сказала «положительный».</Term>
        <Term name="FP (False Positive)">объект реально отрицательный, но модель ошибочно сказала «положительный» (ложная тревога).</Term>
        <Term name="TN (True Negative)">объект реально отрицательный, и модель верно сказала «отрицательный».</Term>
        <Term name="FN (False Negative)">объект реально положительный, но модель ошибочно сказала «отрицательный» (пропуск).</Term>
        <Fig caption="Матрица ошибок: строки — реальный класс, столбцы — предсказание модели. Диагональ (TP, TN) — верные ответы, вне диагонали (FP, FN) — ошибки">
          <svg viewBox="0 0 420 200" width="100%" style={{ maxWidth: 420 }} xmlns="http://www.w3.org/2000/svg">
            <text x="240" y="16" fill={C.sub} fontSize="11" textAnchor="middle">Предсказано</text>
            <text x="180" y="34" fill={C.sub} fontSize="10" textAnchor="middle">Positive</text>
            <text x="300" y="34" fill={C.sub} fontSize="10" textAnchor="middle">Negative</text>
            <text x="30" y="110" fill={C.sub} fontSize="11" textAnchor="middle" transform="rotate(-90 30 110)">Реально</text>
            <text x="60" y="80" fill={C.sub} fontSize="10">Positive</text>
            <text x="60" y="160" fill={C.sub} fontSize="10">Negative</text>
            <rect x="120" y="46" width="120" height="60" fill="rgba(74,222,128,0.15)" stroke={C.green} />
            <text x="180" y="82" fill={C.green} fontSize="15" fontWeight="700" textAnchor="middle">TP</text>
            <rect x="240" y="46" width="120" height="60" fill="rgba(248,113,113,0.15)" stroke={C.red} />
            <text x="300" y="82" fill={C.red} fontSize="15" fontWeight="700" textAnchor="middle">FN</text>
            <rect x="120" y="106" width="120" height="60" fill="rgba(248,113,113,0.15)" stroke={C.red} />
            <text x="180" y="142" fill={C.red} fontSize="15" fontWeight="700" textAnchor="middle">FP</text>
            <rect x="240" y="106" width="120" height="60" fill="rgba(74,222,128,0.15)" stroke={C.green} />
            <text x="300" y="142" fill={C.green} fontSize="15" fontWeight="700" textAnchor="middle">TN</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Accuracy и Error Rate</h2>
        <Term name="Accuracy (доля верных ответов)">
          какая доля ВСЕХ предсказаний оказалась верной — самая простая и интуитивная метрика.
        </Term>
        <Formula note="сумма верных (TP+TN) на общее число объектов">
          Accuracy = <Frac a="TP + TN" b="TP + TN + FP + FN" />
        </Formula>
        <Term name="Error Rate (доля ошибок)">
          обратная величина: доля неверных предсказаний. Error Rate = 1 − Accuracy.
        </Term>
        <TheoryExample title="Ловушка Accuracy на несбалансированных данных">
          Если из 1000 писем спама всего 10, модель, которая ВСЕГДА говорит «не спам», получит Accuracy = 99% —
          формально отлично, а по сути бесполезна (не поймала ни одного спама). На несбалансированных данных
          Accuracy обманчива — нужны другие метрики.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. TPR и FPR</h2>
        <Term name="TPR (True Positive Rate) = Recall">
          какую долю РЕАЛЬНО положительных объектов модель нашла. Также называется полнотой (Recall).
        </Term>
        <Formula note="из всех реально положительных — скольких распознали">
          TPR = <Frac a="TP" b="TP + FN" />
        </Formula>
        <Term name="FPR (False Positive Rate)">
          какую долю РЕАЛЬНО отрицательных объектов модель ошибочно пометила как положительные (ложные тревоги).
        </Term>
        <Formula note="из всех реально отрицательных — сколько ложно посчитали положительными">
          FPR = <Frac a="FP" b="FP + TN" />
        </Formula>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Precision и Recall</h2>
        <Term name="Precision (точность)">
          из всех объектов, которые модель назвала положительными, какая доля действительно положительная. Отвечает
          на вопрос «насколько можно доверять положительному предсказанию модели».
        </Term>
        <Formula note="из всех, кого модель назвала положительными — сколько угадала верно">
          Precision = <Frac a="TP" b="TP + FP" />
        </Formula>
        <Term name="Recall (полнота)">
          то же самое, что TPR — из всех реально положительных объектов, какую долю модель нашла.
        </Term>
        <P n={3}>
          Precision и Recall почти всегда противоречат друг другу: если сделать модель «осторожнее» (реже говорить
          «положительно»), Precision растёт, а Recall падает — и наоборот. Какая метрика важнее, зависит от
          задачи: для спам-фильтра важнее Precision (не хочется терять важные письма как «спам»), а для
          диагностики болезни — Recall (пропустить больного опаснее, чем перестраховаться).
        </P>
        <TheoryTable
          headers={['Метрика', 'Что важнее не пропустить']}
          rows={[
            ['Высокий Precision', 'ложные срабатывания (не спутать здорового с больным)'],
            ['Высокий Recall', 'пропуски (не упустить ни одного реально больного/мошенника)'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. AUC-ROC</h2>
        <P n={4}>
          Модель обычно выдаёт не «да/нет», а вероятность класса, и порог (threshold), с которого решаем «да»,
          можно двигать. <strong>ROC-кривая</strong> показывает, как меняются TPR и FPR при разных порогах —
          строится в осях FPR (x) — TPR (y).
        </P>
        <Term name="AUC-ROC (Area Under Curve)">
          площадь под ROC-кривой, число от 0 до 1. AUC = 1 — идеальная модель, AUC = 0.5 — модель угадывает
          случайно (как подбрасывание монеты), AUC &lt; 0.5 — модель хуже случайного гадания. Удобна тем, что не
          зависит от выбранного порога — оценивает качество ранжирования в целом.
        </Term>
        <Fig caption="ROC-кривая: чем ближе к верхнему левому углу (высокий TPR при низком FPR), тем лучше модель. Диагональ — случайное гадание (AUC=0.5)">
          <svg viewBox="0 0 300 260" width="100%" style={{ maxWidth: 300 }} xmlns="http://www.w3.org/2000/svg">
            <line x1="40" y1="220" x2="270" y2="220" stroke={C.border} markerEnd="url(#rx)" />
            <line x1="40" y1="220" x2="40" y2="20" stroke={C.border} markerEnd="url(#ry)" />
            <text x="155" y="245" fill={C.sub} fontSize="11" textAnchor="middle">FPR</text>
            <text x="15" y="120" fill={C.sub} fontSize="11" textAnchor="middle" transform="rotate(-90 15 120)">TPR</text>
            <line x1="40" y1="220" x2="270" y2="20" stroke={C.sub} strokeDasharray="4 3" />
            <path d="M40 220 Q80 60 270 20" fill="none" stroke={C.lime} strokeWidth="2.5" />
            <text x="90" y="60" fill={C.lime} fontSize="10">хорошая модель</text>
            <text x="180" y="130" fill={C.sub} fontSize="10">случайное гадание</text>
            <defs>
              <marker id="rx" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
              <marker id="ry" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.border} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. PR-AUC</h2>
        <Term name="PR-AUC (Precision-Recall AUC)">
          площадь под кривой в осях Recall (x) — Precision (y), построенной так же перебором порогов. В отличие
          от ROC-AUC, <strong>чувствительна к несбалансированным классам</strong> — на данных с редким
          положительным классом (мошенничество, редкая болезнь) PR-AUC честнее показывает качество модели, чем
          ROC-AUC, которая на таких данных может выглядеть обманчиво хорошей.
        </Term>
      </section>

      {/* ===== ЧАСТЬ 2: РЕГРЕССИЯ ===== */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Часть 2. Метрики регрессии</h2>
        <P n={5}>
          В регрессии ответ — число, поэтому качество измеряют через <strong>величину ошибки</strong> — разницу
          между предсказанием <It>ŷ</It><Sub>i</Sub> и настоящим значением <It>y</It><Sub>i</Sub>.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. MSE и RMSE</h2>
        <Term name="MSE (Mean Squared Error)">
          среднее квадратов ошибок — та же функция потерь, что мы разбирали для линейной регрессии. Большие
          ошибки штрафуются сильнее (за счёт возведения в квадрат), но единица измерения — «квадрат» исходной
          величины, что неудобно интерпретировать.
        </Term>
        <Formula note="усредняем квадраты разностей предсказания и истинного значения">
          MSE = <Frac a="1" b="N" /> ∑ (<It>ŷ</It><Sub>i</Sub> − <It>y</It><Sub>i</Sub>)²
        </Formula>
        <Term name="RMSE (Root Mean Squared Error)">
          корень из MSE — возвращает ошибку в исходных единицах измерения (например, в рублях, а не в
          «рублях в квадрате»), поэтому интерпретировать проще, чем MSE.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. MAE</h2>
        <Term name="MAE (Mean Absolute Error)">
          средний модуль ошибки — в отличие от MSE не возводит ошибку в квадрат, поэтому меньше штрафует редкие
          большие промахи (выбросы) и легко интерпретируется: «в среднем модель ошибается на X единиц».
        </Term>
        <Formula>
          MAE = <Frac a="1" b="N" /> ∑ |<It>ŷ</It><Sub>i</Sub> − <It>y</It><Sub>i</Sub>|
        </Formula>
        <TheoryExample title="MSE/RMSE vs MAE">
          Если в данных есть редкие большие выбросы и их важно «сильно наказывать» — берут MSE/RMSE. Если
          важна устойчивость к выбросам и простая интерпретация «средней ошибки» — берут MAE.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. R² (коэффициент детерминации)</h2>
        <Term name="R² (R-squared)">
          показывает, какую долю разброса (дисперсии) целевой переменной объясняет модель, в сравнении с наивным
          предсказанием «всегда среднее значение». R² = 1 — модель объясняет весь разброс идеально, R² = 0 —
          модель не лучше константного среднего, R² может быть отрицательным — модель хуже, чем просто
          предсказывать среднее.
        </Term>
        <Formula note="1 минус доля необъяснённой ошибки от общего разброса данных">
          R² = 1 − <Frac a="∑ (yᵢ − ŷᵢ)²" b="∑ (yᵢ − ȳ)²" />
        </Formula>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">11. MAPE, SMAPE, WAPE</h2>
        <Term name="MAPE (Mean Absolute Percentage Error)">
          средняя ошибка в ПРОЦЕНТАХ от истинного значения — удобна, когда нужно сравнивать ошибку между
          величинами разного масштаба (ошибка в 100 руб. для товара за 200 руб. критична, а для квартиры —
          ничтожна). Минус: «взрывается», если истинное значение близко к нулю (деление почти на 0).
        </Term>
        <Formula>
          MAPE = <Frac a="100%" b="N" /> ∑ <Frac a="|yᵢ − ŷᵢ|" b="|yᵢ|" />
        </Formula>
        <Term name="SMAPE (Symmetric MAPE)">
          симметричная версия MAPE — делит не только на истинное значение, но на среднее истинного и предсказания,
          что немного смягчает проблему деления на маленькие числа и делает метрику симметричной к завышению и
          занижению прогноза.
        </Term>
        <Term name="WAPE (Weighted Absolute Percentage Error)">
          отношение суммы абсолютных ошибок к сумме истинных значений по всей выборке — в отличие от MAPE, не
          «взрывается» на отдельных маленьких значениях, потому что усредняет не по объектам, а по общей сумме.
          Часто используют в прогнозировании спроса/продаж.
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">12. RMSLE</h2>
        <Term name="RMSLE (Root Mean Squared Logarithmic Error)">
          RMSE, посчитанный не от самих значений, а от их логарифмов: RMSLE = √(mean((log(ŷᵢ+1) − log(yᵢ+1))²)).
          Смягчает влияние больших выбросов и штрафует <strong>заниженные</strong> прогнозы сильнее, чем
          завышенные — полезна, когда важнее не «недооценить» величину (например, прогноз спроса: недооценка
          спроса ведёт к дефициту товара, что дороже, чем перепроизводство).
        </Term>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">13. Как считать метрики на практике</h2>
        <TheoryCode language="python" code={`import numpy as np
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, roc_auc_score,
    mean_squared_error, mean_absolute_error, r2_score
)

# Классификация
y_true = [1, 0, 1, 1, 0, 1, 0, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1, 0]
print(accuracy_score(y_true, y_pred))
print(precision_score(y_true, y_pred))
print(recall_score(y_true, y_pred))

# Регрессия
y_true_reg = np.array([3.0, 5.0, 2.5, 7.0])
y_pred_reg = np.array([2.8, 5.2, 2.0, 6.5])
mse = mean_squared_error(y_true_reg, y_pred_reg)
rmse = mse ** 0.5
mae = mean_absolute_error(y_true_reg, y_pred_reg)
r2 = r2_score(y_true_reg, y_pred_reg)`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={6}>
          Для <strong>классификации</strong> база — матрица ошибок (TP/FP/TN/FN), из которой считают Accuracy,
          Precision, Recall (=TPR), FPR; для оценки качества ранжирования по всем порогам — AUC-ROC (или PR-AUC на
          несбалансированных данных). Для <strong>регрессии</strong> — MSE/RMSE (штрафуют большие ошибки сильнее),
          MAE (устойчива к выбросам), R² (доля объяснённого разброса), а также процентные метрики MAPE/SMAPE/WAPE
          для сравнения ошибок разного масштаба и RMSLE, когда занижение прогноза дороже завышения. Выбор метрики
          — это выбор того, какую именно ошибку модели вы готовы прощать, а какую нет.
        </P>
      </section>
    </div>
  )
}
