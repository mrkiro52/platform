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

export default function July14GeneralizationTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Обобщающая способность модели: отложенная выборка и кросс-валидация</h1>
        <p className="theory-subtitle">Трек: Machine Learning</p>
        <p className="theory-date">14 июля 2026</p>
        <p>
          Модель машинного обучения ценна не тем, как хорошо она запомнила обучающие примеры, а тем, насколько
          точно она предсказывает на <strong>новых, ранее не виденных данных</strong>. Сегодня разберём, что такое
          обобщающая способность, как её честно измерить с помощью отложенной выборки, что такое переобучение и как
          кросс-валидация делает оценку качества устойчивее.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Обобщающая способность модели</h2>
        <Term name="Обобщающая способность (generalization)">
          способность модели давать точные предсказания на данных, которых она не видела во время обучения. Это
          главная цель машинного обучения: нам не нужна модель, которая знает ответы только на обучающие примеры.
        </Term>
        <P n={1}>
          Представьте студента, который перед экзаменом заучил ответы к 20 конкретным задачам из методички. Если
          на экзамене будут ровно эти задачи — он получит пятёрку. Но если задачи хоть немного изменят — он
          растеряется. Хороший студент вместо зубрёжки <em>понимает принцип</em> и решает любые похожие задачи.
          Модель работает так же: нам важно, чтобы она уловила закономерность, а не запомнила частные ответы.
        </P>
        <P n={2}>
          Формально данные делят на два «мира»: те, на которых модель <strong>учится</strong> (обучающая выборка),
          и те, на которых мы <strong>проверяем</strong> её честность (тестовая выборка). Ошибка на обучающих
          данных называется <strong>ошибкой обучения</strong> (train error), а ошибка на новых данных —{' '}
          <strong>ошибкой обобщения</strong> (generalization / test error). Именно вторую мы хотим минимизировать.
        </P>
        <Fig caption="Три режима: недообучение (модель слишком простая), хороший баланс, переобучение (модель заучила шум).">
          <svg viewBox="0 0 600 200" width="600" height="200" xmlns="http://www.w3.org/2000/svg">
            {[0, 1, 2].map((k) => {
              const ox = 20 + k * 195
              const title = ['Недообучение', 'Баланс', 'Переобучение'][k]
              const pts = [40, 70, 55, 90, 75, 110, 95, 130]
              return (
                <g key={k}>
                  <rect x={ox} y="20" width="170" height="130" fill="none" stroke="#2a2a3a" />
                  <text x={ox + 85} y="15" fill="#f5f5fa" fontSize="12" textAnchor="middle">{title}</text>
                  {/* точки */}
                  {[[30, 120], [55, 105], [75, 90], [95, 100], [115, 70], [140, 60]].map((p, i) => (
                    <circle key={i} cx={ox + p[0]} cy={p[1]} r="3.5" fill="#60a5fa" />
                  ))}
                  {/* линия модели */}
                  {k === 0 && <line x1={ox + 25} y1="115" x2={ox + 145} y2="75" stroke="#FFD60A" strokeWidth="2" />}
                  {k === 1 && <path d={`M ${ox + 25} 118 Q ${ox + 85} 70 ${ox + 145} 62`} fill="none" stroke="#4ade80" strokeWidth="2" />}
                  {k === 2 && <path d={`M ${ox + 25} 122 L ${ox + 55} 100 L ${ox + 75} 95 L ${ox + 95} 100 L ${ox + 115} 65 L ${ox + 145} 60`} fill="none" stroke="#f87171" strokeWidth="2" />}
                </g>
              )
            })}
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Метод отложенной выборки (hold-out)</h2>
        <Term name="Отложенная выборка (hold-out)">
          простейший способ честно оценить модель: перед обучением случайно откладываем часть данных в сторону,
          обучаемся на остатке, а на отложенной части проверяем качество. Модель эту часть не видела — значит,
          оценка честная.
        </Term>
        <P n={3}>
          Типичное разбиение — <strong>70/30</strong> или <strong>80/20</strong>: большую часть отдаём на обучение,
          меньшую откладываем на тест. Часто выделяют и третью часть — <strong>валидационную</strong> — для
          подбора гиперпараметров, чтобы тестовая осталась абсолютно «чистой» и использовалась ровно один раз в
          самом конце.
        </P>
        <Fig caption="Разбиение датасета: train для обучения, validation для настройки, test для финальной честной оценки.">
          <svg viewBox="0 0 560 90" width="560" height="90" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="30" width="330" height="34" fill="rgba(74,222,128,0.25)" stroke="#4ade80" />
            <rect x="340" y="30" width="110" height="34" fill="rgba(96,165,250,0.25)" stroke="#60a5fa" />
            <rect x="450" y="30" width="100" height="34" fill="rgba(248,113,113,0.25)" stroke="#f87171" />
            <text x="175" y="52" fill="#f5f5fa" fontSize="13" textAnchor="middle">Train (60%)</text>
            <text x="395" y="52" fill="#f5f5fa" fontSize="12" textAnchor="middle">Valid (20%)</text>
            <text x="500" y="52" fill="#f5f5fa" fontSize="12" textAnchor="middle">Test (20%)</text>
            <text x="280" y="20" fill="#94a3b8" fontSize="11" textAnchor="middle">весь датасет (перемешан случайно)</text>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`from sklearn.model_selection import train_test_split

# X — признаки, y — целевая переменная
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,      # 20% откладываем на тест
    random_state=42,    # фиксируем случайность для воспроизводимости
    stratify=y          # сохраняем пропорции классов (для классификации)
)

model.fit(X_train, y_train)          # учимся только на train
score = model.score(X_test, y_test)  # проверяем на отложенных данных`} />
        <TheoryExample title="Важное правило">
          Тестовую выборку нельзя использовать при обучении или подборе параметров — иначе модель косвенно
          «подсмотрит» ответы, и оценка станет завышенной. Тест трогаем ровно один раз, в самом конце.
        </TheoryExample>
        <P n={4}>
          У hold-out есть слабое место: оценка зависит от того, <em>как именно</em> прошло случайное разбиение.
          Если в тест случайно попали «лёгкие» примеры — качество будет завышено, если «трудные» — занижено.
          Особенно это заметно на маленьких датасетах. Эту проблему решает кросс-валидация (пункт 4).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Переобучение (overfitting)</h2>
        <Term name="Переобучение (overfitting)">
          ситуация, когда модель слишком точно подстроилась под обучающие данные, включая их случайный шум, и
          из-за этого плохо работает на новых данных. Низкая ошибка на train, но высокая на test.
        </Term>
        <Term name="Недообучение (underfitting)">
          обратная ситуация: модель слишком проста, чтобы уловить закономерность, — плохо работает и на train, и на
          test. Например, прямая линия для явно нелинейной зависимости.
        </Term>
        <P n={5}>
          Диагностика проста: сравниваем ошибку на обучении и на тесте.{' '}
          <strong>Маленькая train-ошибка + большая test-ошибка = переобучение.</strong>{' '}
          Большая ошибка и там, и там = недообучение. Обе близки и малы = хорошая модель.
        </P>
        <TheoryTable
          headers={['Симптом', 'Train-ошибка', 'Test-ошибка', 'Диагноз']}
          rows={[
            ['Модель заучила шум', 'очень низкая', 'высокая', 'Переобучение'],
            ['Модель слишком проста', 'высокая', 'высокая', 'Недообучение'],
            ['Хороший баланс', 'низкая', 'низкая', 'Норма'],
          ]}
        />
        <P n={6}>
          Как борются с переобучением: берут больше данных, упрощают модель, применяют{' '}
          <strong>регуляризацию</strong> (штраф за сложность, L1/L2), используют <strong>dropout</strong> в
          нейросетях, останавливают обучение раньше (<strong>early stopping</strong>) и обязательно контролируют
          качество на отложенных данных, а не на обучающих.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Кросс-валидация (cross-validation)</h2>
        <Term name="K-fold кросс-валидация">
          данные делят на K равных частей (folds). Модель обучают K раз: каждый раз одна часть служит тестом, а
          остальные K−1 — обучением. Итоговое качество — среднее по всем K запускам.
        </Term>
        <P n={7}>
          Главное преимущество: <strong>каждый пример побывает и в обучении, и в тесте</strong>. Оценка перестаёт
          зависеть от «удачного» разбиения — мы усредняем по всем вариантам. Это особенно важно на небольших
          датасетах, где один hold-out даёт слишком шумную оценку.
        </P>
        <Fig caption="5-fold кросс-валидация: на каждой итерации своя часть (красная) — тест, остальные — обучение.">
          <svg viewBox="0 0 560 200" width="560" height="200" xmlns="http://www.w3.org/2000/svg">
            {[0, 1, 2, 3, 4].map((row) => (
              <g key={row}>
                <text x="10" y={35 + row * 34} fill="#94a3b8" fontSize="12">Fold {row + 1}</text>
                {[0, 1, 2, 3, 4].map((col) => {
                  const isTest = col === row
                  return (
                    <rect
                      key={col}
                      x={80 + col * 92}
                      y={20 + row * 34}
                      width="88"
                      height="26"
                      fill={isTest ? 'rgba(248,113,113,0.3)' : 'rgba(74,222,128,0.18)'}
                      stroke={isTest ? '#f87171' : '#4ade80'}
                    />
                  )
                })}
              </g>
            ))}
            <text x="290" y="195" fill="#94a3b8" fontSize="11" textAnchor="middle">
              зелёный — обучение, красный — проверка · итог = среднее 5 оценок
            </text>
          </svg>
        </Fig>
        <TheoryCode language="python" code={`from sklearn.model_selection import cross_val_score, KFold

kf = KFold(n_splits=5, shuffle=True, random_state=42)
scores = cross_val_score(model, X, y, cv=kf, scoring='accuracy')

print(scores)             # 5 оценок, по одной на каждый fold
print(scores.mean())      # средняя оценка — она устойчивее
print(scores.std())       # разброс: насколько оценка стабильна`} />
        <P n={8}>
          Разновидности: <strong>Stratified K-Fold</strong> сохраняет пропорции классов в каждом fold (важно для
          несбалансированной классификации); <strong>Leave-One-Out</strong> — крайний случай, где K равно числу
          примеров (каждый объект по очереди становится тестом), очень точно, но дорого по времени;{' '}
          <strong>TimeSeriesSplit</strong> — для временных рядов, где нельзя обучаться на «будущем» и проверять на
          «прошлом».
        </P>
        <TheoryExample title="Hold-out или кросс-валидация?">
          На больших датасетах (миллионы строк) обычно хватает простого hold-out — данных достаточно, чтобы одна
          отложенная часть дала надёжную оценку. На маленьких и средних данных лучше кросс-валидация: она
          использует данные эффективнее и даёт менее случайную оценку.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={9}>
          Цель обучения — <strong>обобщающая способность</strong>, то есть точность на новых данных, а не на
          обучающих. Чтобы честно её измерить, часть данных <strong>откладывают</strong> (hold-out) и не трогают
          при обучении. <strong>Переобучение</strong> — модель заучила шум (низкая train-ошибка, высокая
          test-ошибка); <strong>недообучение</strong> — модель слишком проста. <strong>Кросс-валидация</strong>{' '}
          усредняет оценку по нескольким разбиениям, делая её устойчивой и не зависящей от случайности одного
          сплита. Вместе эти инструменты позволяют доверять цифрам качества модели.
        </P>
      </section>
    </div>
  )
}
