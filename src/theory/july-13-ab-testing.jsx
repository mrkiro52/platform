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

export default function July13AbTestingTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">A/B-тестирование для аналитика</h1>
        <p className="theory-subtitle">Трек: Аналитика данных</p>
        <p className="theory-date">13 июля 2026</p>
        <p>
          A/B-тест — главный инструмент, которым продуктовые команды проверяют, действительно ли изменение
          (новый дизайн кнопки, другой алгоритм рекомендаций, новая цена) улучшает метрики, а не просто совпало с
          улучшением по времени. Сегодня разберём весь процесс от постановки гипотезы до интерпретации результата
          — и типичные ошибки, которые делают выводы теста бесполезными.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужен A/B-тест</h2>
        <P n={1}>
          Если просто выкатить изменение всем и посмотреть, выросла ли метрика — нельзя понять, повлияло ли
          именно изменение, или метрика выросла бы и без него (сезонность, маркетинговая кампания, случайные
          колебания). A/B-тест решает эту проблему <strong>сравнением одновременно</strong>: часть пользователей
          видит старую версию (контроль), часть — новую (эксперимент), в одно и то же время, в одинаковых внешних
          условиях. Разница между группами — это и есть эффект изменения.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Контрольная и экспериментальная группа</h2>
        <Term name="Группа A (контроль, control)">
          пользователи, которые видят текущую, уже работающую версию продукта — точка отсчёта, с которой сравнивают.
        </Term>
        <Term name="Группа B (эксперимент, treatment)">
          пользователи, которые видят новую версию — то, что мы хотим проверить.
        </Term>
        <P n={2}>
          Ключевое условие — <strong>случайное распределение</strong> пользователей по группам (рандомизация):
          если в группу B случайно попадут более активные пользователи, разница в метриках будет объясняться не
          изменением, а составом группы. Обычно разбиение делают по хешу user_id, чтобы один и тот же пользователь
          стабильно попадал в одну и ту же группу при повторных заходах.
        </P>
        <Fig caption="Пользователи случайно делятся на две группы: контроль видит старую версию, эксперимент — новую. Сравнивают метрику между группами за один и тот же период">
          <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="20" width="120" height="34" rx="6" fill="var(--bg-tertiary)" stroke={C.border} />
            <text x="80" y="42" fill={C.text} fontSize="11" textAnchor="middle">Все пользователи</text>
            <line x1="140" y1="45" x2="200" y2="45" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#ab1)" />
            <text x="170" y="38" fill={C.sub} fontSize="9" textAnchor="middle">рандомизация</text>
            <rect x="200" y="70" width="130" height="40" rx="6" fill="rgba(96,165,250,0.10)" stroke={C.blue} />
            <text x="265" y="95" fill={C.blue} fontSize="11" fontWeight="700" textAnchor="middle">A — контроль (50%)</text>
            <rect x="200" y="120" width="130" height="40" rx="6" fill="rgba(200,255,0,0.10)" stroke={C.lime} />
            <text x="265" y="145" fill={C.lime} fontSize="11" fontWeight="700" textAnchor="middle">B — эксперимент (50%)</text>
            <line x1="140" y1="45" x2="200" y2="90" stroke={C.sub} strokeWidth="1" strokeDasharray="3 2" />
            <line x1="140" y1="45" x2="200" y2="140" stroke={C.sub} strokeWidth="1" strokeDasharray="3 2" />
            <line x1="330" y1="90" x2="400" y2="90" stroke={C.blue} strokeWidth="1.4" markerEnd="url(#ab2)" />
            <line x1="330" y1="140" x2="400" y2="140" stroke={C.lime} strokeWidth="1.4" markerEnd="url(#ab3)" />
            <text x="440" y="118" fill={C.sub} fontSize="10" textAnchor="middle">сравнить</text>
            <defs>
              <marker id="ab1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.sub} /></marker>
              <marker id="ab2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.blue} /></marker>
              <marker id="ab3" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.lime} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Постановка гипотезы</h2>
        <P n={3}>
          Тест начинается не с кода, а с формулировки <strong>гипотезы</strong> по структуре: «если мы сделаем X,
          то метрика Y изменится, потому что Z». Например: «если укоротить форму регистрации до 3 полей вместо 6,
          конверсия в регистрацию вырастет, потому что меньше пользователей бросают заполнение на середине».
        </P>
        <P n={4}>
          Отдельно фиксируют <strong>нулевую гипотезу H₀</strong> (изменения нет — метрики в группах A и B равны)
          и <strong>альтернативную H₁</strong> (эффект есть). Цель теста — набрать достаточно данных, чтобы либо
          отвергнуть H₀ с уверенностью, либо честно признать, что данных недостаточно её отвергнуть.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Выбор метрики</h2>
        <Term name="Основная (целевая) метрика">
          одна главная метрика, по которой судят об успехе теста — определяется ДО запуска, а не выбирается
          задним числом среди тех, что «случайно выросли».
        </Term>
        <Term name="Вспомогательные метрики (guardrail metrics)">
          метрики, которые не должны ухудшиться из-за изменения, даже если основная метрика выросла — например,
          если сократили форму регистрации, важно проверить, что не выросла доля мошеннических аккаунтов.
        </Term>
        <TheoryExample title="Почему нельзя смотреть много метрик и выбирать удобную">
          Если проверять 20 метрик одновременно, велик шанс, что хотя бы одна «случайно» покажет значимый рост —
          это не значит, что эффект реальный. Основную метрику фиксируют заранее, чтобы не поддаться соблазну
          задним числом объявить успехом случайное совпадение.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Расчёт размера выборки</h2>
        <P n={5}>
          Перед запуском теста считают, <strong>сколько пользователей нужно</strong> в каждой группе, чтобы
          обнаружить ожидаемый эффект с достаточной уверенностью. Слишком маленькая выборка не даст значимого
          результата, даже если эффект реально есть; слишком большая — лишние недели ожидания.
        </P>
        <P n={6}>
          На нужный размер выборки влияют три параметра: <strong>базовая конверсия</strong> (текущее значение
          метрики), <strong>минимальный обнаруживаемый эффект (MDE)</strong> — наименьшая разница, которую
          хотим уметь заметить, и <strong>уровень значимости/мощности</strong> теста (обычно 5% и 80%). Чем
          меньше эффект хотим поймать — тем больше нужно данных.
        </P>
        <TheoryCode language="python" code={`from statsmodels.stats.power import NormalIndPower
from statsmodels.stats.proportion import proportion_effectsize

# Хотим поймать рост конверсии с 10% до 12%
effect_size = proportion_effectsize(0.12, 0.10)
analysis = NormalIndPower()
n = analysis.solve_power(effect_size, alpha=0.05, power=0.8)
print(f'Нужно объектов на группу: {n:.0f}')`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Проведение теста</h2>
        <P n={7}>
          Тест должен идти достаточно долго, чтобы захватить естественные колебания — минимум одну-две полные
          недели (чтобы усреднить будни/выходные), и не должен останавливаться досрочно, как только результат
          «показался» значимым: случайные колебания на середине теста часто выглядят как эффект, но исчезают к
          концу. Останавливать тест раньше срока из-за «уже видно результат» — частая ошибка, искажающая выводы.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Проверка статистической значимости</h2>
        <P n={8}>
          По завершении теста сравнивают метрики групп статистическим критерием: для конверсий (доли) —{' '}
          <strong>z-тест для пропорций</strong> или хи-квадрат, для непрерывных величин (средний чек, время на
          сайте) — <strong>t-тест</strong>. Результат — <strong>p-value</strong>: вероятность увидеть такую или
          более сильную разницу между группами, если на самом деле эффекта нет (H₀ верна).
        </P>
        <Formula note="стандартный порог значимости — если p ниже, отвергаем H₀ и считаем эффект реальным">
          p &lt; α (обычно α = 0.05)
        </Formula>
        <TheoryCode language="python" code={`from scipy import stats
import numpy as np

# Конверсии по группам (1 = купил, 0 = не купил)
group_a = np.array([1]*120 + [0]*880)   # 1000 пользователей, конверсия 12%
group_b = np.array([1]*145 + [0]*855)   # 1000 пользователей, конверсия 14.5%

from statsmodels.stats.proportion import proportions_ztest
count = [group_a.sum(), group_b.sum()]
nobs = [len(group_a), len(group_b)]
z_stat, p_value = proportions_ztest(count, nobs)
print(f'p-value = {p_value:.4f}')   # если < 0.05 — разница статистически значима`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Доверительный интервал эффекта</h2>
        <P n={9}>
          Кроме p-value полезно посчитать <strong>доверительный интервал</strong> разницы между группами — он
          показывает не только «есть эффект или нет», но и диапазон его вероятного размера. Например: «конверсия
          выросла на 2.5 п.п., 95% ДИ [0.8; 4.2]» — гораздо информативнее голого «p &lt; 0.05», особенно для
          принятия бизнес-решения, стоит ли изменение усилий на внедрение.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">9. Типичные ошибки при A/B-тестировании</h2>
        <TheoryTable
          headers={['Ошибка', 'В чём проблема']}
          rows={[
            ['Досрочная остановка теста', 'случайные колебания в начале теста принимают за устойчивый эффект'],
            ['Подглядывание за результатами (peeking)', 'чем чаще смотришь на p-value по ходу теста, тем выше риск поймать случайный всплеск'],
            ['Проверка десятков метрик без поправки', 'при 20 метриках и alpha=0.05 в среднем ~1 «значимой» окажется случайно'],
            ['Слишком короткий тест', 'не захватывает недельную цикличность поведения (будни/выходные)'],
            ['Пересечение аудиторий нескольких тестов', 'пользователь одновременно в двух экспериментах — эффекты смешиваются'],
            ['Значимый, но незначимый по величине эффект', 'p<0.05 при приросте 0.01% может быть статистически «реальным», но бесполезным для бизнеса'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">10. Интерпретация и решение</h2>
        <P n={10}>
          Итог теста — не просто «значимо / не значимо», а решение: выкатывать изменение на всех пользователей,
          отклонить, или тестировать дальше. Учитывают одновременно статистическую значимость (p-value),
          практическую значимость (стоит ли эффект таких усилий на внедрение) и состояние guardrail-метрик —
          даже при значимом росте основной метрики решение может быть отрицательным, если просела другая важная
          метрика.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={11}>
          A/B-тест сравнивает контрольную и экспериментальную группы <strong>одновременно</strong> при случайном
          разбиении пользователей — это единственный надёжный способ отличить эффект изменения от случайных
          колебаний. Процесс: сформулировать гипотезу и целевую метрику → рассчитать нужный размер выборки →
          провести тест нужное время без досрочной остановки → проверить статистическую значимость (p-value,
          t-тест/z-тест) и посчитать доверительный интервал эффекта → принять решение с учётом guardrail-метрик.
          Главные ловушки — подглядывание за результатами, досрочная остановка и проверка слишком многих метрик
          без поправки.
        </P>
      </section>
    </div>
  )
}
