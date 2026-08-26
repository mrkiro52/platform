import { useEffect, useState } from 'react'

/* ═══════════════════════════ Shared UI ═══════════════════════════ */

const P = ({ children, style }) => (
  <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8, margin: '10px 0', ...style }}>{children}</p>
)

const B = ({ children }) => <strong style={{ color: 'var(--text-primary)' }}>{children}</strong>

const C = ({ children }) => (
  <code style={{ background: 'var(--bg-tertiary)', color: 'var(--accent-lime)', padding: '1px 6px', borderRadius: 3, fontSize: '0.9em', fontFamily: 'monospace' }}>{children}</code>
)

const Ul = ({ items }) => (
  <ul style={{ paddingLeft: 20, margin: '10px 0' }}>
    {items.map((item, i) => <li key={i} style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75, marginBottom: 6 }}>{item}</li>)}
  </ul>
)

const Code = ({ code, lang = 'sql' }) => {
  const lines = code.split('\n')
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">{lang}</div>
      <pre className="theory-code"><code>
        {lines.map((line, i) => {
          const idx = line.indexOf('--')
          const hashIdx = line.indexOf('#')
          const cut = idx !== -1 ? idx : hashIdx
          if (cut === -1) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          const before = line.slice(0, cut)
          const sq = (before.match(/'/g) || []).length
          if (sq % 2 !== 0) return <span key={i}>{line}{i < lines.length - 1 ? '\n' : ''}</span>
          return (
            <span key={i}>
              <span style={{ color: 'var(--text-primary)' }}>{before}</span>
              <span style={{ color: '#6b7280' }}>{line.slice(cut)}</span>
              {i < lines.length - 1 ? '\n' : ''}
            </span>
          )
        })}
      </code></pre>
    </div>
  )
}

const Note = ({ children }) => (
  <div style={{ background: 'rgba(32,190,255,0.05)', border: '1px solid rgba(32,190,255,0.18)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    {children}
  </div>
)

const Warn = ({ children }) => (
  <div style={{ background: 'rgba(255,100,100,0.07)', border: '1px solid rgba(255,100,100,0.25)', borderRadius: 8, padding: '12px 16px', margin: '14px 0', color: 'var(--text-secondary)', fontSize: 13.5, lineHeight: 1.7 }}>
    {children}
  </div>
)

const Table = ({ headers, rows }) => (
  <div style={{ overflowX: 'auto', margin: '14px 0' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 'max-content' }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{ textAlign: 'left', padding: '8px 14px', background: 'var(--bg-secondary)', color: 'var(--text-secondary)', borderBottom: '2px solid var(--border-color)', whiteSpace: 'nowrap', fontWeight: 700 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)', color: j === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', verticalAlign: 'top' }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

const SectionTitle = ({ id, kicker, children }) => (
  <div id={id} style={{ margin: '56px 0 18px', scrollMarginTop: 80 }}>
    {kicker && <div style={{ color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{kicker}</div>}
    <h2 style={{ color: 'var(--text-primary)', fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 800, fontFamily: 'var(--font-syne)', margin: 0, paddingBottom: 12, borderBottom: '2px solid var(--accent-lime)' }}>{children}</h2>
  </div>
)

/* ─── Вопрос с раскрываемым ответом ─── */
const LEVEL_STYLE = {
  base:   { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  text: '#4ade80', label: 'База' },
  middle: { bg: 'rgba(234,179,8,0.1)',  border: 'rgba(234,179,8,0.3)',  text: '#facc15', label: 'Middle' },
  senior: { bg: 'rgba(239,68,68,0.1)',  border: 'rgba(239,68,68,0.3)',  text: '#f87171', label: 'Senior' },
}

function Q({ n, level = 'base', question, children }) {
  const [open, setOpen] = useState(false)
  const s = LEVEL_STYLE[level]
  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: 10, margin: '10px 0', background: open ? 'var(--bg-secondary)' : 'transparent', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ width: '100%', background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 18px', textAlign: 'left', display: 'flex', gap: 12, alignItems: 'flex-start' }}
      >
        <span style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--text-tertiary)', fontSize: 13, flexShrink: 0, marginTop: 2, minWidth: 26 }}>{String(n).padStart(2, '0')}</span>
        <span style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text, borderRadius: 5, padding: '1px 8px', fontSize: 10.5, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{s.label}</span>
        <span style={{ color: 'var(--text-primary)', fontSize: 'clamp(13.5px, 2.2vw, 15px)', fontWeight: 600, lineHeight: 1.5, flex: 1 }}>{question}</span>
        <span style={{ color: open ? 'var(--accent-lime)' : 'var(--text-tertiary)', fontSize: 18, flexShrink: 0, lineHeight: 1, marginTop: 2, transition: 'transform 0.2s', display: 'inline-block', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>⌄</span>
      </button>
      {open && (
        <div style={{ borderTop: '1px solid var(--border-color)', padding: '4px 20px 18px 20px' }}>
          {children}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════ TOC ═══════════════════════════ */

const TOC = [
  { id: 'sql',    label: 'Раздел 1 — Базы данных и SQL (32 вопроса)' },
  { id: 'queues', label: 'Раздел 2 — Очереди: Kafka и RabbitMQ (14 вопросов)' },
  { id: 'docker', label: 'Раздел 3 — Docker (10 вопросов)' },
]

/* ═══════════════════════════ Main ═══════════════════════════ */

export default function BackendInterviewLikbez({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const scrollTo = (id) => { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <div style={{ maxWidth: '100%', padding: 'clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)' }}>
      <button onClick={onBack} style={{ background: 'none', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer', marginBottom: 28 }}>
        Назад к ликбезам
      </button>

      {/* Hero */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, padding: 'clamp(20px, 4vw, 36px)', marginBottom: 32 }}>
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ background: 'rgba(251,146,60,0.1)', border: '1px solid rgba(251,146,60,0.3)', borderRadius: 8, padding: '6px 14px', color: '#fb923c', fontSize: 12, fontWeight: 700, letterSpacing: 1 }}>BACKEND</div>
          <div style={{ color: 'var(--text-tertiary)', fontSize: 12, display: 'flex', alignItems: 'center' }}>Junior → Senior-собеседование</div>
        </div>
        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: 'clamp(24px, 5vw, 38px)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2, marginBottom: 12 }}>
          Бэкенд на собеседовании: БД, очереди, Docker
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 15, lineHeight: 1.7, maxWidth: 760 }}>
          Сборник реальных вопросов с собеседований на backend-разработчика — от Senior Backend разработчика
          Яндекса. 56 вопросов с развёрнутыми ответами: PostgreSQL, транзакции и индексы, Kafka и RabbitMQ,
          Docker. Нажми на вопрос, чтобы раскрыть ответ.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {['56 вопросов', '3 раздела', 'PostgreSQL · Kafka · RabbitMQ · Docker', '~70 мин'].map(t => (
            <span key={t} style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: 6, padding: '4px 10px', fontSize: 12, color: 'var(--text-tertiary)' }}>{t}</span>
          ))}
        </div>
      </div>

      <Note>
        <B>Как пользоваться.</B> Сначала попробуй ответить на вопрос вслух своими словами — как на реальном
        собеседовании, — и только потом раскрывай ответ. Устный ответ на 30–60 секунд ценится выше, чем
        пересказ учебника: интервьюер проверяет, понимаешь ли ты, <B>зачем</B> нужен механизм и когда он ломается.
      </Note>

      {/* TOC */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 10, padding: 'clamp(16px, 3vw, 24px)', marginBottom: 24 }}>
        <div style={{ color: 'var(--text-tertiary)', fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>Содержание</div>
        <div style={{ display: 'grid', gap: 8 }}>
          {TOC.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '6px 0', color: 'var(--text-secondary)', fontSize: 14, cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-lime)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
            >{item.label}</button>
          ))}
        </div>
      </div>

      {/* ═══════════ РАЗДЕЛ 1: SQL ═══════════ */}
      <SectionTitle id="sql" kicker="Раздел 1">Базы данных и SQL</SectionTitle>

      <Q n={1} question="Что такое СУБД? Какие бывают типы?">
        <P>
          СУБД (система управления базами данных) — это прослойка между приложением и данными на диске.
          Сама по себе «база данных» — это просто данные; СУБД — программа, которая даёт язык запросов,
          контролирует доступ, следит за целостностью и разруливает конкурентную работу многих клиентов.
        </P>
        <P><B>Что именно берёт на себя СУБД</B> (это хороший ответ на follow-up «а зачем она вообще нужна, пишите в файлы»):</P>
        <Ul items={[
          <>Конкурентный доступ: сотни клиентов пишут одновременно и не портят данные друг другу.</>,
          <>Durability: после подтверждения транзакции данные переживут выключение питания.</>,
          <>Целостность: ограничения, типы, внешние ключи не дадут записать мусор.</>,
          <>Декларативный язык запросов и оптимизатор, который сам выбирает, как выполнить запрос.</>,
        ]} />
        <P><B>Основные типы:</B></P>
        <Table
          headers={['Тип', 'Примеры', 'Модель данных', 'Когда выбирают']}
          rows={[
            ['Реляционные', 'PostgreSQL, MySQL, Oracle', 'Таблицы, связи, SQL', 'Транзакции, сложные связи, деньги, заказы — дефолтный выбор'],
            ['Документные', 'MongoDB', 'JSON-подобные документы', 'Схема часто меняется, данные читаются целым документом'],
            ['Key-value', 'Redis', 'Ключ → значение', 'Кэш, сессии, счётчики, rate-limit — очень быстрый доступ по ключу'],
            ['Колоночные', 'ClickHouse', 'Данные по колонкам', 'Аналитика: агрегации по миллиардам строк'],
            ['Графовые', 'Neo4j', 'Вершины и рёбра', 'Соцсвязи, рекомендации, поиск путей по связям'],
            ['Time-series', 'TimescaleDB, InfluxDB', 'Метрики по времени', 'Мониторинг, IoT, телеметрия'],
          ]}
        />
        <P>
          Типичная архитектура одного продукта совмещает несколько: заказы интернет-магазина — в PostgreSQL,
          аналитику событий — в ClickHouse, сессии и кэш — в Redis. Это нормально и называется polyglot persistence.
        </P>
      </Q>

      <Q n={2} question="Что такое транзакция?">
        <P>
          Транзакция — группа операций, которая выполняется как единое целое: либо фиксируются все изменения
          (<C>COMMIT</C>), либо не применяется ни одно (<C>ROLLBACK</C>). Промежуточного состояния для внешнего
          наблюдателя не существует.
        </P>
        <Code code={`BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;`} />
        <P>
          Классический пример — перевод денег. Если сервер упадёт между двумя <C>UPDATE</C>, без транзакции
          деньги списались бы с одного счёта и не пришли на другой. С транзакцией при сбое до <C>COMMIT</C>
          база откатит всё обратно.
        </P>
        <Note>
          Частый follow-up: <B>«а если приложение упало сразу после COMMIT, но до ответа клиенту?»</B> Данные
          в базе уже зафиксированы, но клиент об этом не знает и может повторить запрос. Поэтому в реальных
          системах поверх транзакций делают идемпотентность — например, ключ идемпотентности на операцию.
        </Note>
      </Q>

      <Q n={3} question="ACID">
        <P>ACID — четыре свойства надёжной транзакции:</P>
        <Ul items={[
          <><B>Atomicity (атомарность)</B> — всё или ничего. Транзакция либо применяется целиком, либо откатывается целиком.</>,
          <><B>Consistency (согласованность)</B> — транзакция переводит базу из одного корректного состояния в другое: не нарушаются constraints, внешние ключи, триггеры и бизнес-инварианты.</>,
          <><B>Isolation (изолированность)</B> — параллельные транзакции не влияют друг на друга некорректно. Насколько строго — задаёт уровень изоляции.</>,
          <><B>Durability (долговечность)</B> — после <C>COMMIT</C> данные переживут сбой, потому что запись уже попала в журнал (WAL) на диске.</>,
        ]} />
        <Warn>
          <B>Где чаще всего заваливают.</B> Consistency в ACID — это <B>не</B> та Consistency, что в CAP-теореме.
          В ACID речь о соблюдении правил целостности внутри одной базы; в CAP — о том, видят ли все узлы
          распределённой системы одинаковые данные. Если на собеседовании смешать эти два понятия, это сразу заметят.
        </Warn>
        <P>
          Второй частый уточняющий вопрос: <B>за счёт чего обеспечивается Durability?</B> За счёт
          write-ahead log: PostgreSQL сначала пишет изменения в WAL и делает <C>fsync</C>, и только потом
          применяет их к страницам данных. После сбоя база проигрывает WAL и восстанавливает состояние.
        </P>
      </Q>

      <Q n={4} level="senior" question="Уровни изоляции транзакций">
        <P>Стандарт SQL задаёт четыре уровня — от самого слабого к самому строгому:</P>
        <Ul items={[
          <><C>Read Uncommitted</C> — по стандарту допускает dirty reads. В PostgreSQL этого уровня фактически нет: он ведёт себя как <C>Read Committed</C>.</>,
          <><C>Read Committed</C> — запрос видит только закоммиченные данные. Важный нюанс: снимок берётся на <B>каждый запрос</B>, поэтому два одинаковых <C>SELECT</C> внутри одной транзакции могут вернуть разное. Это дефолт в PostgreSQL.</>,
          <><C>Repeatable Read</C> — снимок берётся один раз на <B>всю транзакцию</B>, повторное чтение даёт тот же результат. В PostgreSQL этот уровень заодно защищает и от фантомов.</>,
          <><C>Serializable</C> — результат эквивалентен какому-то последовательному выполнению транзакций. Самый строгий; возможны ошибки сериализации, которые приложение должно ловить и повторять.</>,
        ]} />
        <Table
          headers={['Уровень', 'Dirty read', 'Non-repeatable read', 'Phantom read', 'Write skew']}
          rows={[
            ['Read Uncommitted', 'возможен (по стандарту)', 'возможен', 'возможен', 'возможен'],
            ['Read Committed', 'нет', 'возможен', 'возможен', 'возможен'],
            ['Repeatable Read', 'нет', 'нет', 'нет (в PostgreSQL)', 'возможен'],
            ['Serializable', 'нет', 'нет', 'нет', 'нет'],
          ]}
        />
        <Code code={`BEGIN ISOLATION LEVEL SERIALIZABLE;
-- операции
COMMIT;`} />
        <Warn>
          При <C>SERIALIZABLE</C> обязательно нужен retry-цикл в приложении: PostgreSQL может отклонить
          транзакцию с ошибкой сериализации (SQLSTATE <C>40001</C>), и это <B>нормальная</B> ситуация, а не баг.
          Транзакцию просто нужно выполнить заново.
        </Warn>
      </Q>

      <Q n={5} level="senior" question="Transaction problems: какие бывают проблемы конкуренции?">
        <P>Типовые аномалии, ради которых и придумали уровни изоляции:</P>
        <Ul items={[
          <><B>Dirty read</B> — транзакция читает изменения другой, ещё не закоммиченной транзакции. Если та откатится, прочитанные данные никогда не существовали.</>,
          <><B>Non-repeatable read</B> — строка изменилась между двумя чтениями внутри одной транзакции: первый <C>SELECT</C> вернул баланс 100, второй уже 50.</>,
          <><B>Phantom read</B> — при повторе того же запроса изменился <B>набор</B> строк: между двумя <C>SELECT ... WHERE status = 'new'</C> кто-то вставил новую подходящую строку.</>,
          <><B>Lost update</B> — две транзакции прочитали одно значение, посчитали новое и записали; второе перетёрло первое, и одно изменение потерялось.</>,
          <><B>Write skew</B> — самая коварная. Две транзакции по отдельности принимают корректное решение, но вместе нарушают бизнес-инвариант.</>,
        ]} />
        <P>
          <B>Пример write skew.</B> Правило: хотя бы один врач должен быть на дежурстве. Два врача одновременно
          проверяют «сейчас на дежурстве двое, значит я могу уйти», оба видят корректную картину и оба уходят.
          По отдельности каждая транзакция валидна, вместе — дежурных не осталось. Спасает <C>SERIALIZABLE</C>
          или явная блокировка.
        </P>
        <P>
          <B>Как чинить lost update</B> без повышения изоляции: не читать-и-писать, а изменять атомарно
          (<C>UPDATE ... SET balance = balance - 100</C>), либо блокировать строку через <C>SELECT ... FOR UPDATE</C>,
          либо использовать оптимистичную блокировку с колонкой <C>version</C>.
        </P>
      </Q>

      <Q n={6} question="Что такое transaction race / race condition?">
        <P>
          Это ситуация, когда результат зависит от того, в каком порядке успели выполниться конкурентные
          операции. Классика: два запроса одновременно проверили, что товар есть в наличии, и оба списали
          последнюю единицу — в итоге остаток ушёл в минус или продали то, чего нет.
        </P>
        <P><B>Почему возникает.</B> Между «проверил» и «записал» есть окно, в котором состояние успевает измениться. Любая логика вида check-then-act в конкурентной среде потенциально гонка.</P>
        <P><B>Способы решения</B> — от простого к строгому:</P>
        <Ul items={[
          <><B>Атомарный UPDATE с условием</B> — проверка и изменение в одной операции. Самый дешёвый способ.</>,
          <><B>Блокировка строки</B> — <C>SELECT ... FOR UPDATE</C>: другие транзакции ждут, пока текущая не завершится.</>,
          <><B>Уникальное ограничение</B> — база физически не даст создать дубликат, ловим ошибку и обрабатываем.</>,
          <><B>SERIALIZABLE + retry</B> — база сама обнаружит конфликт и попросит повторить.</>,
        ]} />
        <Code code={`UPDATE products
SET stock = stock - 1
WHERE id = 10 AND stock > 0;
-- Проверяем, что обновилась ровно одна строка:
-- если 0 строк — товар кончился, значит заказ отклоняем`} />
        <Note>
          Ключевая мысль для устного ответа: <B>проверку и изменение нужно делать в одной атомарной операции</B>.
          Условие <C>AND stock {'>'} 0</C> внутри <C>UPDATE</C> и делает эту операцию неделимой — база сама
          гарантирует, что две транзакции не пройдут проверку одновременно.
        </Note>
      </Q>

      <Q n={7} question="Что делает GROUP BY?">
        <P>
          Группирует строки с одинаковыми значениями указанных полей в одну и позволяет применить к каждой
          группе агрегатные функции: <C>COUNT</C>, <C>SUM</C>, <C>AVG</C>, <C>MIN</C>, <C>MAX</C>.
        </P>
        <Code code={`SELECT status, COUNT(*) AS orders_count, SUM(total) AS revenue
FROM orders
GROUP BY status;`} />
        <P>
          На выходе — по одной строке на каждое уникальное значение <C>status</C>. Правило, которое любят
          спрашивать: в <C>SELECT</C> можно указывать только поля из <C>GROUP BY</C> либо агрегатные функции.
          Иначе база не знает, какое из множества значений внутри группы показать, и вернёт ошибку.
        </P>
      </Q>

      <Q n={8} question="HAVING и WHERE в SQL">
        <P>
          <C>WHERE</C> фильтрует отдельные строки <B>до</B> группировки. <C>HAVING</C> фильтрует уже
          сформированные группы <B>после</B> <C>GROUP BY</C> и потому умеет работать с агрегатами.
        </P>
        <Code code={`SELECT customer_id, SUM(total) AS spent
FROM orders
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY customer_id
HAVING SUM(total) > 1000;`} />
        <P>
          Здесь <C>WHERE</C> отсекает старые заказы ещё до группировки, а <C>HAVING</C> оставляет только
          клиентов, потративших больше 1000. Написать <C>WHERE SUM(total) {'>'} 1000</C> нельзя — на момент
          выполнения <C>WHERE</C> групп ещё не существует.
        </P>
        <Note>
          Полезно назвать порядок выполнения запроса: <C>FROM</C> → <C>WHERE</C> → <C>GROUP BY</C> →
          <C>HAVING</C> → <C>SELECT</C> → <C>ORDER BY</C> → <C>LIMIT</C>. Из него сразу видно, почему алиас
          из <C>SELECT</C> нельзя использовать в <C>WHERE</C>, но можно в <C>ORDER BY</C>.
        </Note>
        <P>
          С точки зрения производительности: фильтровать лучше в <C>WHERE</C>, потому что так до группировки
          доедет меньше строк. В <C>HAVING</C> выносим только то, что физически невозможно проверить раньше.
        </P>
      </Q>

      <Q n={9} question="Что такое подзапрос?">
        <P>
          Подзапрос — <C>SELECT</C> внутри другого SQL-запроса. Он может вернуть одно значение, набор значений
          (для <C>IN</C>) или целую таблицу (в <C>FROM</C>).
        </P>
        <Code code={`SELECT *
FROM orders
WHERE customer_id IN (
  SELECT id FROM customers WHERE is_vip = true
);`} />
        <P><B>Виды подзапросов:</B></P>
        <Ul items={[
          <><B>Скалярный</B> — возвращает одно значение, можно использовать прямо в <C>SELECT</C>.</>,
          <><B>В списке (IN)</B> — как в примере выше.</>,
          <><B>В FROM (derived table)</B> — подзапрос как временная таблица.</>,
          <><B>Коррелированный</B> — ссылается на колонки внешнего запроса и выполняется для каждой его строки. Именно он чаще всего становится причиной тормозов.</>,
        ]} />
        <Warn>
          Коррелированный подзапрос выполняется <B>для каждой строки</B> внешнего запроса — на большой таблице
          это легко превращается в тысячи вызовов. Часто такой запрос переписывается в <C>JOIN</C> и работает
          на порядок быстрее. Ещё нюанс: <C>NOT IN</C> с подзапросом, где может встретиться <C>NULL</C>,
          вернёт пустой результат — безопаснее <C>NOT EXISTS</C>.
        </Warn>
      </Q>

      <Q n={10} question="Что такое CTE? Какой оператор используется?">
        <P>
          CTE (Common Table Expression) — именованный временный результат внутри одного SQL-выражения.
          Начинается с <C>WITH</C>; для рекурсивного запроса — <C>WITH RECURSIVE</C>.
        </P>
        <Code code={`WITH paid_orders AS (
  SELECT * FROM orders WHERE status = 'paid'
)
SELECT customer_id, COUNT(*)
FROM paid_orders
GROUP BY customer_id;`} />
        <P>
          Главная ценность — читаемость: сложный запрос разбивается на понятные именованные шаги вместо
          вложенных друг в друга подзапросов. Второе применение — рекурсия: обход деревьев и иерархий
          (категории, комментарии, оргструктура), что обычным <C>SELECT</C> не сделать.
        </P>
        <Code code={`WITH RECURSIVE subordinates AS (
  SELECT id, name, manager_id FROM employees WHERE id = 1
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  JOIN subordinates s ON e.manager_id = s.id
)
SELECT * FROM subordinates;`} />
        <Note>
          Хороший senior-нюанс: до PostgreSQL 12 CTE всегда были <B>оптимизационным барьером</B> —
          материализовались отдельно, и планировщик не мог протолкнуть в них условия. С версии 12 обычные CTE
          могут инлайниться; принудительное поведение задаётся через <C>MATERIALIZED</C> / <C>NOT MATERIALIZED</C>.
        </Note>
      </Q>

      <Q n={11} question="Как получить текущую дату и время в SQL?">
        <P>В PostgreSQL: <C>CURRENT_DATE</C>, <C>CURRENT_TIME</C>, <C>CURRENT_TIMESTAMP</C>, <C>NOW()</C>.</P>
        <Code code={`SELECT CURRENT_DATE, NOW();`} />
        <P>
          Нюанс, который отличает знающего человека: <C>NOW()</C> и <C>CURRENT_TIMESTAMP</C> возвращают время
          <B> начала транзакции</B>, а не момент вызова. Внутри одной длинной транзакции они дадут одинаковое
          значение. Если нужно реальное текущее время — <C>clock_timestamp()</C>.
        </P>
        <P>
          Для хранения меток времени почти всегда правильный тип — <C>timestamptz</C> (с таймзоной), а не
          <C> timestamp</C>: он хранит момент времени однозначно и корректно переводится в часовой пояс клиента.
        </P>
      </Q>

      <Q n={12} question="Разница между DELETE и TRUNCATE">
        <Table
          headers={['', 'DELETE', 'TRUNCATE']}
          rows={[
            ['Что делает', 'Удаляет строки по условию', 'Очищает таблицу целиком'],
            ['WHERE', 'Поддерживает', 'Не поддерживает'],
            ['Скорость', 'Медленно: построчно', 'Очень быстро: освобождает файлы данных'],
            ['Триггеры', 'Срабатывают delete-триггеры', 'Не срабатывают построчные триггеры'],
            ['Блокировка', 'Построчные блокировки', 'Более строгая блокировка таблицы'],
            ['Sequence', 'Не трогает', 'Можно сбросить через RESTART IDENTITY'],
            ['Откат', 'Откатывается', 'В PostgreSQL тоже транзакционен и откатывается'],
          ]}
        />
        <Code code={`DELETE FROM sessions WHERE expires_at < NOW();
TRUNCATE TABLE staging_events RESTART IDENTITY;`} />
        <Note>
          Частый подвох: во многих СУБД (например, MySQL/InnoDB, Oracle) <C>TRUNCATE</C> — DDL и делает
          неявный commit, откатить нельзя. <B>В PostgreSQL</B> <C>TRUNCATE</C> транзакционен: внутри
          <C> BEGIN ... ROLLBACK</C> данные вернутся. Стоит упомянуть эту разницу — это плюс к ответу.
        </Note>
        <P>
          Ещё <C>DELETE</C> оставляет dead tuples, которые потом убирает <C>VACUUM</C>, поэтому размер файла
          на диске сразу не уменьшится. <C>TRUNCATE</C> освобождает место немедленно.
        </P>
      </Q>

      <Q n={13} question="Разница между INNER JOIN и OUTER JOIN">
        <P>
          <C>INNER JOIN</C> оставляет только строки, у которых нашлось совпадение с обеих сторон.
          <C> LEFT OUTER JOIN</C> сохраняет все строки левой таблицы; там, где справа совпадения нет, поля
          правой таблицы будут <C>NULL</C>. <C>RIGHT</C> и <C>FULL OUTER JOIN</C> — аналогично для правой
          или обеих сторон.
        </P>
        <Code code={`SELECT c.id, c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;`} />
        <P>
          Здесь мы получим всех клиентов, включая тех, кто ещё ничего не заказал — у них <C>order_id</C>
          будет <C>NULL</C>. С <C>INNER JOIN</C> такие клиенты просто исчезли бы из результата.
        </P>
        <Warn>
          Классическая ошибка: написать <C>LEFT JOIN</C> и добавить условие по правой таблице в <C>WHERE</C> —
          например, <C>WHERE o.status = 'paid'</C>. Это отсеет строки с <C>NULL</C> и превратит запрос
          в обычный <C>INNER JOIN</C>. Если условие должно применяться только к присоединяемой таблице,
          его место — в <C>ON</C>, а не в <C>WHERE</C>.
        </Warn>
        <P>
          Полезно знать и про <C>CROSS JOIN</C> (декартово произведение — каждая с каждой) и
          <C> LATERAL JOIN</C> (подзапрос справа может ссылаться на колонки слева, удобно для «топ-3 заказа
          каждого клиента»).
        </P>
      </Q>

      <Q n={14} question="Что такое constraint?">
        <P>
          Constraint — правило целостности данных, которое проверяет сама СУБД. Его главное преимущество перед
          проверкой в коде приложения: обойти его невозможно. Даже если кто-то зайдёт руками через psql или
          в приложении окажется баг, база не примет некорректные данные.
        </P>
        <Ul items={[
          <><C>NOT NULL</C> — значение обязательно.</>,
          <><C>CHECK</C> — произвольное условие на значения строки.</>,
          <><C>UNIQUE</C> — значения не повторяются.</>,
          <><C>PRIMARY KEY</C> — уникальный идентификатор строки (<C>UNIQUE</C> + <C>NOT NULL</C>).</>,
          <><C>FOREIGN KEY</C> — ссылочная целостность между таблицами.</>,
          <><C>EXCLUDE</C> — специфичный для PostgreSQL: запрещает «пересекающиеся» значения, например бронирования на пересекающиеся интервалы времени.</>,
        ]} />
        <Code code={`price numeric CHECK (price >= 0)`} />
        <Note>
          Хороший тезис для собеседования: <B>ограничения — это последняя линия обороны данных</B>. Валидация
          в приложении нужна для понятных сообщений пользователю, но именно constraint гарантирует, что в
          таблице никогда не окажется отрицательной цены — независимо от того, сколько сервисов туда пишут.
        </Note>
      </Q>

      <Q n={15} question="Что такое UNIQUE?">
        <P>
          Ограничение уникальности запрещает повторяющиеся значения в колонке или повторяющиеся
          <B> комбинации</B> значений в наборе колонок.
        </P>
        <Code code={`ALTER TABLE users ADD CONSTRAINT users_email_key UNIQUE (email);

-- составной: пара (user_id, product_id) уникальна,
-- то есть один пользователь не оценит товар дважды
ALTER TABLE reviews ADD CONSTRAINT reviews_uniq UNIQUE (user_id, product_id);`} />
        <P>
          Важный нюанс, который любят спрашивать: в PostgreSQL <B>несколько <C>NULL</C> в уникальной колонке
          допустимы</B>, потому что <C>NULL</C> не равен <C>NULL</C> — они не считаются дубликатами.
          Начиная с PostgreSQL 15 это поведение можно изменить через <C>UNIQUE NULLS NOT DISTINCT</C>.
        </P>
        <P>
          Технически <C>UNIQUE</C> реализуется через уникальный индекс, поэтому он заодно ускоряет поиск
          по этой колонке. Для «уникальности только среди активных записей» используют частичный уникальный
          индекс: <C>CREATE UNIQUE INDEX ... WHERE deleted_at IS NULL</C>.
        </P>
      </Q>

      <Q n={16} question="Отличия PRIMARY KEY и FOREIGN KEY">
        <P>
          <C>PRIMARY KEY</C> однозначно идентифицирует строку внутри своей таблицы: он уникален и не может
          быть <C>NULL</C>. На таблицу приходится ровно один PK, но он может быть составным — из нескольких колонок.
        </P>
        <P>
          <C>FOREIGN KEY</C> задаёт ссылочную целостность между таблицами: значение в дочерней таблице должно
          существовать в родительской либо быть <C>NULL</C>, если это разрешено. Внешних ключей в таблице
          может быть сколько угодно.
        </P>
        <Table
          headers={['', 'PRIMARY KEY', 'FOREIGN KEY']}
          rows={[
            ['Назначение', 'Идентифицирует строку', 'Связывает с другой таблицей'],
            ['Уникальность', 'Обязательна', 'Не требуется (много заказов у одного клиента)'],
            ['NULL', 'Запрещён', 'Разрешён, если колонка nullable'],
            ['Сколько в таблице', 'Один', 'Сколько угодно'],
            ['Индекс', 'Создаётся автоматически', 'НЕ создаётся автоматически'],
          ]}
        />
        <Warn>
          Сильный ответ — упомянуть, что <B>PostgreSQL не создаёт индекс на колонку внешнего ключа автоматически</B>.
          Из-за этого <C>JOIN</C> по FK и особенно каскадное удаление родительской строки могут приводить
          к full scan дочерней таблицы. Индекс на FK почти всегда нужно добавлять руками.
        </Warn>
        <P>
          Стоит знать и про поведение при удалении родителя: <C>ON DELETE RESTRICT</C> (по умолчанию — запретить),
          <C> CASCADE</C> (удалить детей), <C>SET NULL</C>.
        </P>
      </Q>

      <Q n={17} question="Что такое внешний ключ? Можно ли сослаться не на PK?">
        <P>
          Внешний ключ связывает таблицы и не даёт создать «сиротскую» ссылку — запись, указывающую
          на несуществующего родителя.
        </P>
        <P>
          <B>Да, ссылаться можно не только на PK.</B> Требование одно: целевой столбец или набор столбцов
          должен иметь гарантированную уникальность — <C>PRIMARY KEY</C>, <C>UNIQUE</C> constraint или
          уникальный индекс. Типы и порядок столбцов должны быть совместимы.
        </P>
        <Code code={`CREATE TABLE users (
  id bigint PRIMARY KEY,
  email text UNIQUE
);
CREATE TABLE invitations (
  invited_email text REFERENCES users(email)
);`} />
        <P>
          Логика простая: база должна уметь по значению внешнего ключа найти <B>ровно одну</B> родительскую
          строку. Без уникальности это невозможно, поэтому PostgreSQL просто не даст создать такой FK.
        </P>
        <Note>
          На практике ссылаться на бизнес-поле вроде email — не лучшая идея: email меняется, и придётся
          обновлять его во всех дочерних таблицах (или полагаться на <C>ON UPDATE CASCADE</C>). Поэтому
          обычно ссылаются на суррогатный неизменяемый <C>id</C>. Но знать, что технически это возможно, полезно.
        </Note>
      </Q>

      <Q n={18} question="Какой тип обычно делают PK?">
        <P>
          Чаще всего <C>bigint</C> с <C>GENERATED ... AS IDENTITY</C> (современный стандартный синтаксис) или
          <C> bigserial</C> (более старый). Причины: он компактный (8 байт), хорошо индексируется, а новые
          значения идут подряд — вставки попадают в конец B-tree, что даёт хорошую локальность.
        </P>
        <Code code={`id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY`} />
        <P><B>Когда выбирают UUID:</B></P>
        <Ul items={[
          <>Идентификатор генерируется распределённо — несколькими сервисами или на клиенте, без обращения к базе.</>,
          <>Нельзя раскрывать последовательность ID: по <C>/orders/1000</C> конкурент поймёт, сколько у вас заказов.</>,
          <>Данные создаются до записи в БД, и ID нужен заранее (например, для связи объектов в памяти).</>,
          <>Нужно сливать данные из нескольких баз без конфликтов ключей.</>,
        ]} />
        <P>
          Почему <C>bigint</C>, а не <C>int</C>: 4-байтный <C>int</C> заканчивается на ~2,1 млрд значений.
          Миграция переполнившегося PK на действующем проекте — крайне болезненная операция, поэтому
          <C> bigint</C> берут сразу, экономия 4 байт того не стоит.
        </P>
      </Q>

      <Q n={19} level="senior" question="Почему UUID может быть медленнее, чем serial?">
        <P>Две независимые причины — размер и случайность.</P>
        <P>
          <B>Размер.</B> UUID занимает 16 байт против 8 у <C>bigint</C>. Это увеличивает и саму таблицу,
          и каждый индекс, где участвует ключ. Индекс большего размера хуже помещается в кэш (shared_buffers),
          а значит чаще приходится читать с диска.
        </P>
        <P>
          <B>Случайность — главная проблема.</B> Классический UUIDv4 полностью случаен, поэтому каждая новая
          вставка попадает в произвольное место B-tree. Последствия:
        </P>
        <Ul items={[
          <><B>Page splits</B> — страницы приходится расщеплять, индекс фрагментируется и распухает.</>,
          <><B>Плохая локальность</B> — при последовательных ID «горячий» конец индекса лежит в кэше; при случайных нужно трогать много разных страниц.</>,
          <><B>Больше WAL</B> — расщепления страниц пишутся в журнал, растёт объём репликации.</>,
        ]} />
        <Note>
          Это <B>не запрет на UUID</B>, и такой вывод в ответе будет ошибкой. Проблема решается упорядоченными
          идентификаторами: <B>UUIDv7</B> (в начале — временная метка) или ULID. Они сохраняют
          распределённую генерацию и уникальность, но вставки снова идут «в конец», как у <C>bigserial</C>.
        </Note>
      </Q>

      <Q n={20} question="Что такое индекс?">
        <P>
          Индекс — отдельная структура данных, которая хранит значения колонки в упорядоченном виде вместе
          со ссылками на строки таблицы. Он ускоряет поиск, соединения, сортировку и иногда агрегации.
        </P>
        <P>
          Цена — место на диске, дополнительная работа при <C>INSERT</C>/<C>UPDATE</C>/<C>DELETE</C>
          и обслуживание.
        </P>
        <Note>
          <B>Аналогия:</B> индекс в БД — алфавитный указатель в конце книги. Без него, чтобы найти упоминание
          слова, придётся пролистать всю книгу (full scan). С указателем — открыл нужную букву и сразу получил
          номера страниц. Но указатель занимает место и его приходится обновлять при каждом изменении книги.
        </Note>
        <P>
          Ключевая мысль: <B>индекс — это компромисс</B>. Он всегда ускоряет чтение и всегда замедляет запись.
          Правильный индекс на большой таблице может изменить время запроса с секунд до миллисекунд, а лишний —
          просто занимать место и тормозить вставки.
        </P>
      </Q>

      <Q n={21} question="Накладные расходы индексации">
        <P>Каждый индекс:</P>
        <Ul items={[
          <>занимает место на диске и вытесняет полезные данные из кэша;</>,
          <>замедляет <C>INSERT</C>, <C>UPDATE</C> и <C>DELETE</C>, потому что менять нужно и таблицу, и все индексы на ней;</>,
          <>увеличивает объём WAL и, как следствие, репликационный трафик;</>,
          <>требует обслуживания: <C>VACUUM</C>, иногда <C>REINDEX</C> при разрастании.</>,
        ]} />
        <P>
          Поэтому не стоит индексировать каждую колонку «на всякий случай»: индекс создают под конкретные
          реальные запросы, которые действительно есть в нагрузке.
        </P>
        <Note>
          Отдельный плюс к ответу — упомянуть <B>HOT-обновления</B> (Heap-Only Tuple). Если <C>UPDATE</C> не
          затрагивает ни одну проиндексированную колонку и на странице есть место, PostgreSQL может обновить
          строку, не трогая индексы вообще — это заметно дешевле. Лишние индексы ломают эту оптимизацию.
        </Note>
        <P>
          Найти неиспользуемые индексы можно через системное представление <C>pg_stat_user_indexes</C>: у
          мёртвых индексов <C>idx_scan</C> будет близок к нулю.
        </P>
      </Q>

      <Q n={22} question="Какие бывают индексы?">
        <P>В PostgreSQL основные типы:</P>
        <Table
          headers={['Тип', 'Для чего', 'Типичный кейс']}
          rows={[
            ['B-tree', 'Равенство, диапазоны, сортировка', 'Индекс по id, дате, статусу — 90% случаев'],
            ['Hash', 'Только равенство (=)', 'Редко: B-tree обычно универсальнее'],
            ['GIN', 'Много значений в одном поле', 'Массивы, jsonb, полнотекстовый поиск'],
            ['GiST', 'Геометрия, диапазоны, «похожесть»', 'Геоданные (PostGIS), пересечение интервалов'],
            ['BRIN', 'Огромные таблицы с корреляцией', 'Логи по времени: очень маленький индекс'],
            ['SP-GiST', 'Несбалансированные структуры', 'Точки, префиксные деревья'],
          ]}
        />
        <Code code={`CREATE INDEX orders_created_at_idx ON orders (created_at);
CREATE INDEX events_payload_gin_idx ON events USING gin (payload);`} />
        <P>Отдельно стоит знать про «модификаторы» обычного индекса — их часто спрашивают как продолжение:</P>
        <Ul items={[
          <><B>Частичный (partial)</B> — <C>CREATE INDEX ... WHERE status = 'active'</C>. Индексируется только часть строк, индекс получается маленьким.</>,
          <><B>По выражению</B> — <C>CREATE INDEX ... ON users (lower(email))</C>. Нужен, если запрос ищет по <C>lower(email)</C>: обычный индекс по <C>email</C> тут не поможет.</>,
          <><B>Покрывающий (covering)</B> — <C>INCLUDE (...)</C>. Добавляет в индекс колонки, которых нет в условии, чтобы получить index-only scan и вообще не обращаться к таблице.</>,
          <><B>Уникальный</B> — заодно обеспечивает ограничение уникальности.</>,
        ]} />
        <Note>
          На проде индексы создают через <C>CREATE INDEX CONCURRENTLY</C>: обычный <C>CREATE INDEX</C> берёт
          блокировку и не даёт писать в таблицу всё время построения. Это очень практичный нюанс, его ценят.
        </Note>
      </Q>

      <Q n={23} level="middle" question="B-tree index: как устроен и где используется?">
        <P>
          B-tree — сбалансированное дерево. Внутренние страницы хранят границы диапазонов и ссылки на
          дочерние страницы, листовые — отсортированные ключи и ссылки на физическое расположение строк
          (TID). Все листья находятся на одной глубине — отсюда «сбалансированное».
        </P>
        <P>
          Высота дерева очень небольшая: даже для миллиардов строк это обычно 3–4 уровня, потому что в одну
          страницу помещаются сотни ключей. Поэтому поиск — это несколько чтений страниц вместо просмотра
          всей таблицы, то есть <C>O(log n)</C>.
        </P>
        <P>
          Листья дополнительно связаны в двусвязный список, поэтому диапазонный запрос читает подряд идущие
          листовые страницы — это делает B-tree эффективным для <C>BETWEEN</C> и <C>ORDER BY</C>.
        </P>
        <P>
          <B>Используется для:</B> <C>=</C>, <C>{'<'}</C>, <C>{'>'}</C>, <C>BETWEEN</C>, <C>IN</C>,
          <C> IS NULL</C>, префиксных условий вида <C>LIKE 'abc%'</C> и <C>ORDER BY</C> при подходящем
          порядке индекса.
        </P>
        <Code code={`CREATE INDEX orders_customer_created_idx
ON orders (customer_id, created_at DESC);`} />
        <P>
          Такой индекс закрывает частый запрос «последние заказы клиента»: находит нужного клиента и сразу
          читает его заказы уже в нужном порядке — сортировка не потребуется.
        </P>
      </Q>

      <Q n={24} level="middle" question="B-tree vs Hash indexes">
        <Table
          headers={['', 'B-tree', 'Hash']}
          rows={[
            ['Равенство (=)', 'Да', 'Да'],
            ['Диапазоны (<, >, BETWEEN)', 'Да', 'Нет'],
            ['ORDER BY без сортировки', 'Да', 'Нет'],
            ['Префикс LIKE «abc%»', 'Да', 'Нет'],
            ['Составной индекс', 'Да', 'Нет'],
            ['Размер', 'Больше', 'Может быть меньше на длинных ключах'],
          ]}
        />
        <P>
          B-tree — индекс по умолчанию и подходит почти везде. Hash-индекс ориентирован строго на равенство
          и не помогает ни для диапазонов, ни для сортировки, ни в составном виде.
        </P>
        <P>
          Практический вывод: в подавляющем большинстве случаев берут B-tree. Hash имеет смысл только в узком
          сценарии точного поиска по длинному ключу — и только после измерений через <C>EXPLAIN ANALYZE</C>,
          подтверждающих выигрыш.
        </P>
        <Note>
          Исторический нюанс: до PostgreSQL 10 hash-индексы не писались в WAL, то есть не переживали сбой
          и не реплицировались — поэтому их не рекомендовали в принципе. С версии 10 они полноценны, но
          репутация и ограниченность применения остались.
        </Note>
      </Q>

      <Q n={25} level="middle" question="Что такое составной индекс?">
        <P>
          Это индекс по нескольким полям, где <B>порядок колонок принципиален</B>. Для B-tree работает правило
          левого префикса: индекс можно использовать, если запрос фильтрует по первой колонке, по первым двум
          и так далее — но не по одной только второй.
        </P>
        <Code code={`CREATE INDEX idx_orders_tenant_created
ON orders (tenant_id, created_at DESC);`} />
        <Table
          headers={['Запрос', 'Индекс используется?']}
          rows={[
            ['WHERE tenant_id = 5', 'Да — левый префикс'],
            ['WHERE tenant_id = 5 AND created_at >= ...', 'Да — идеальный случай'],
            ['WHERE tenant_id = 5 ORDER BY created_at DESC', 'Да, и сортировка бесплатна'],
            ['WHERE created_at >= ...', 'Обычно нет — нет первой колонки'],
          ]}
        />
        <P>
          <B>Правило выбора порядка колонок:</B> сначала те, что участвуют в условиях на равенство, затем
          колонка для диапазона или сортировки. Если поставить наоборот, индекс будет работать заметно хуже.
        </P>
        <Note>
          Один составной индекс <C>(a, b)</C> обычно лучше двух отдельных по <C>a</C> и по <C>b</C>: он
          закрывает и запрос по <C>a</C>, и комбинированный. PostgreSQL умеет объединять два отдельных индекса
          через BitmapAnd, но это дороже, чем один правильно построенный составной.
        </Note>
      </Q>

      <Q n={26} level="middle" question="Что такое селективность индекса?">
        <P>
          Селективность показывает, насколько сильно условие сокращает число строк. Чем меньше доля строк
          проходит фильтр, тем условие селективнее и тем вероятнее выгоден индекс.
        </P>
        <P>
          <B>Пример высокой селективности:</B> поиск пользователя по уникальному email — из миллиона строк
          вернётся одна. Индекс даёт огромный выигрыш.
        </P>
        <P>
          <B>Пример низкой:</B> <C>WHERE is_active = true</C>, если активны 95% пользователей. Обычный индекс
          тут скорее всего не будет использован — планировщик решит, что проще прочитать таблицу целиком,
          и будет прав: переходы по индексу к почти каждой строке дороже последовательного чтения.
        </P>
        <Note>
          Это объясняет частый вопрос «почему мой индекс не используется». Часто ответ — низкая селективность
          условия или устаревшая статистика. Планировщик опирается на статистику из <C>ANALYZE</C>; если она
          неактуальна, оценки будут неверными.
        </Note>
        <P>
          Для колонок с низкой селективностью, но редким «интересным» значением (скажем, 0,1% строк со статусом
          <C> failed</C>) правильное решение — <B>частичный индекс</B>: <C>CREATE INDEX ... WHERE status = 'failed'</C>.
          Он крошечный и очень эффективный.
        </P>
      </Q>

      <Q n={27} level="senior" question="Медленный запрос: что делать?">
        <P>Главный принцип ответа — <B>действовать по измерениям, а не по догадкам</B>. Пошагово:</P>
        <Ul items={[
          <><B>Получить план:</B> <C>EXPLAIN (ANALYZE, BUFFERS)</C> — это первое, что нужно сделать.</>,
          <><B>Найти дорогой узел:</B> Seq Scan по большой таблице, Nested Loop с большим числом итераций, внешняя сортировка на диске, большое расхождение между estimated и actual rows.</>,
          <><B>Проверить причины:</B> подходящий индекс отсутствует; условие написано так, что индекс неприменим (функция над колонкой, несовпадение типов); статистика устарела.</>,
          <><B>Уменьшить объём данных:</B> убрать <C>SELECT *</C>, добавить фильтры, сделать нормальную keyset-пагинацию вместо большого <C>OFFSET</C>.</>,
          <><B>Исправить и измерить снова:</B> создать индекс, выполнить <C>ANALYZE</C>, перепроверить план.</>,
        ]} />
        <Warn>
          Расхождение оценки и реальности — самый важный сигнал в плане. Если планировщик ждал 10 строк,
          а пришло 100 000, он выбрал неправильную стратегию соединения. Лечится обновлением статистики,
          увеличением <C>STATISTICS</C> на колонке или расширенной статистикой для скоррелированных колонок.
        </Warn>
        <P>
          Отдельно стоит упомянуть <C>pg_stat_statements</C> — расширение, показывающее самые дорогие запросы
          в целом по базе. Оптимизировать нужно то, что реально жрёт ресурсы, а не то, что первым попалось.
        </P>
        <P>И финальная мысль: не добавляйте индекс наугад — он может не использоваться вовсе и при этом замедлить запись.</P>
      </Q>

      <Q n={28} level="senior" question="EXPLAIN и EXPLAIN ANALYZE">
        <P>
          <C>EXPLAIN</C> показывает план, который оптимизатор <B>намеревается</B> выполнить, вместе с оценками
          стоимости и числа строк. Запрос при этом не выполняется.
        </P>
        <P>
          <C>EXPLAIN ANALYZE</C> реально выполняет запрос и показывает <B>фактическое</B> время и количество
          строк на каждом узле. <C>BUFFERS</C> добавляет статистику чтений: сколько страниц взято из кэша
          (shared hit) и сколько прочитано с диска (read).
        </P>
        <Code code={`EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders
WHERE customer_id = 42
ORDER BY created_at DESC
LIMIT 20;`} />
        <P><B>На что смотреть в выводе:</B></P>
        <Ul items={[
          <><C>rows</C> estimated против actual — сильное расхождение означает проблему со статистикой.</>,
          <><C>actual time</C> — где именно уходит время (учитывайте, что оно на одну итерацию, умножайте на <C>loops</C>).</>,
          <>Тип узла: Seq Scan, Index Scan, Index Only Scan, Bitmap Heap Scan.</>,
          <>Способ соединения: Nested Loop, Hash Join, Merge Join.</>,
          <><C>Sort Method</C>: <C>quicksort ... Memory</C> — хорошо; <C>external merge Disk</C> — не хватило <C>work_mem</C>.</>,
        ]} />
        <Warn>
          Важно и почти всегда идёт как follow-up: <C>EXPLAIN ANALYZE</C> <B>реально выполняет</B> запрос,
          включая изменяющий. Чтобы безопасно посмотреть план <C>UPDATE</C> или <C>DELETE</C>, оборачивайте
          в транзакцию: <C>BEGIN; EXPLAIN ANALYZE UPDATE ...; ROLLBACK;</C>
        </Warn>
      </Q>

      <Q n={29} level="senior" question="MVCC">
        <P>
          MVCC (Multi-Version Concurrency Control) — механизм, при котором вместо блокировок база хранит
          несколько версий одной строки. Благодаря этому <B>читатели не блокируют писателей, а писатели не
          блокируют читателей</B>.
        </P>
        <P>
          При изменении строки PostgreSQL не перезаписывает её на месте, а создаёт новую версию. У каждой
          версии есть служебные поля <C>xmin</C> (какая транзакция создала) и <C>xmax</C> (какая удалила).
          Транзакция видит только те версии, которые были закоммичены на момент её снимка.
        </P>
        <P>
          Именно так реализуются уровни изоляции: <C>Read Committed</C> берёт новый снимок на каждый запрос,
          <C> Repeatable Read</C> — один снимок на всю транзакцию.
        </P>
        <P><B>Плата за MVCC:</B></P>
        <Ul items={[
          <>Старые версии строк (dead tuples) накапливаются и требуют очистки через <C>VACUUM</C>.</>,
          <>Таблица физически растёт даже при постоянном числе логических строк (table bloat).</>,
          <><C>COUNT(*)</C> не может быть мгновенным: нужно проверить видимость каждой строки для текущей транзакции.</>,
          <>Долгая открытая транзакция удерживает старые версии и мешает <C>VACUUM</C> их убрать.</>,
        ]} />
      </Q>

      <Q n={30} level="senior" question="Dead tuple и VACUUM">
        <P>
          Dead tuple — устаревшая версия строки после <C>UPDATE</C> или <C>DELETE</C>, которая больше не видна
          ни одной активной транзакции. Физически она всё ещё занимает место в файле данных.
        </P>
        <P><C>VACUUM</C> решает три задачи:</P>
        <Ul items={[
          <><B>Освобождает место</B> — помечает занятое dead tuples пространство как доступное для повторного использования (файл при этом не уменьшается).</>,
          <><B>Обновляет статистику и visibility map</B> — это включает index-only scan, когда можно ответить прямо из индекса.</>,
          <><B>Предотвращает transaction ID wraparound</B> — счётчик транзакций 32-битный и может переполниться; без vacuum база в какой-то момент аварийно остановится, чтобы не потерять данные.</>,
        ]} />
        <Table
          headers={['Команда', 'Что делает', 'Блокировка']}
          rows={[
            ['VACUUM', 'Помечает место для переиспользования', 'Не мешает чтению и записи'],
            ['VACUUM FULL', 'Physически перестраивает таблицу, возвращает место ОС', 'ACCESS EXCLUSIVE — таблица недоступна'],
            ['ANALYZE', 'Обновляет статистику для планировщика', 'Не мешает'],
          ]}
        />
        <Warn>
          <C>VACUUM FULL</C> нельзя запускать на проде без окна обслуживания: он берёт эксклюзивную блокировку
          и полностью останавливает работу с таблицей. Для устранения bloat онлайн используют
          <C> pg_repack</C>.
        </Warn>
        <P>
          Autovacuum по умолчанию включён и критически важен. Главная причина его «поломки» — долгие открытые
          транзакции: пока транзакция жива, старые версии могут ей понадобиться, и vacuum не имеет права их
          удалить. Отсюда практическое правило: не держать транзакции открытыми долго.
        </P>
      </Q>

      <Q n={31} question="Почему иногда лучше char, чем varchar?">
        <P>
          Короткий честный ответ: <B>в PostgreSQL — почти никогда</B>. <C>char(n)</C> дополняет значения
          пробелами до фиксированной длины, из-за чего появляются сюрпризы при сравнении и конкатенации,
          а выигрыша в производительности нет — все три типа (<C>char</C>, <C>varchar</C>, <C>text</C>)
          хранятся одинаково.
        </P>
        <P>
          Единственный оправданный случай — действительно фиксированный формат, где дополнение пробелами
          невозможно: код страны из двух символов, валюта по ISO, буквенный код региона. И то в основном
          как способ задокументировать намерение.
        </P>
        <Code code={`country_code char(2) CHECK (country_code ~ '^[A-Z]{2}$')`} />
        <P>
          Для произвольной строки используют <C>text</C> или <C>varchar(n)</C>. <C>varchar(n)</C> берут тогда,
          когда ограничение длины — это <B>бизнес-правило</B> (например, логин не длиннее 32 символов),
          а не попытка сэкономить место.
        </P>
        <Note>
          Сильный аргумент: в PostgreSQL <C>varchar(n)</C> не быстрее <C>text</C> — это тот же тип с проверкой
          длины. Зато изменение лимита <C>varchar(50)</C> → <C>varchar(100)</C> требует ALTER таблицы, а
          <C> text</C> + <C>CHECK</C>-ограничение менять проще и гибче.
        </Note>
      </Q>

      <Q n={32} level="senior" question="Шардирование и репликация: в чём разница?">
        <P>
          <B>Репликация</B> — копирование <B>одних и тех же</B> данных на несколько узлов. Цели:
          отказоустойчивость (упал primary — переключились на реплику) и масштабирование <B>чтения</B>
          (read-запросы уходят на реплики).
        </P>
        <P>
          <B>Шардирование</B> — горизонтальное разделение данных: разные части живут на разных узлах. Цели:
          масштабирование <B>объёма</B> данных и <B>записи</B>, которые репликация не решает.
        </P>
        <Table
          headers={['', 'Репликация', 'Шардирование']}
          rows={[
            ['Данные на узлах', 'Одинаковые (копии)', 'Разные части'],
            ['Масштабирует', 'Чтение', 'Запись и объём'],
            ['Отказоустойчивость', 'Да, это основная цель', 'Нет — нужна ещё и репликация каждого шарда'],
            ['Сложность', 'Умеренная, есть из коробки', 'Высокая: роутинг, ре-шардинг, кросс-шард запросы'],
          ]}
        />
        <P>
          <B>Пример:</B> реплика содержит все заказы целиком. При шардинге заказы клиентов с id 1–1 000 000
          лежат на shard A, остальные — на shard B, и ни один узел не хранит всё.
        </P>
        <P>
          Стоит упомянуть, что репликация бывает синхронной (<C>COMMIT</C> ждёт подтверждения реплики — нет
          потери данных, но выше задержка) и асинхронной (быстрее, но при падении primary можно потерять
          последние транзакции). Плюс типичная проблема реплик — <B>replication lag</B>: сразу после записи
          чтение с реплики может вернуть старые данные.
        </P>
        <Warn>
          Главная сложность шардирования — выбор ключа шардирования. Неудачный ключ приводит к «горячим»
          шардам и к запросам, которым нужны данные сразу с нескольких узлов (кросс-шард <C>JOIN</C>),
          а это очень дорого. Поэтому шардирование — крайняя мера: сначала индексы, кэш, реплики
          и партиционирование внутри одной базы.
        </Warn>
      </Q>

      {/* ═══════════ РАЗДЕЛ 2: ОЧЕРЕДИ ═══════════ */}
      <SectionTitle id="queues" kicker="Раздел 2">Очереди: Kafka и RabbitMQ</SectionTitle>

      <Q n={33} question="Что проще сделать в Kafka: прочитать или записать?">
        <P>
          Обычно <B>записать</B>. Producer просто последовательно дописывает записи в конец партиции — это
          append-only операция, максимально дружелюбная к диску: последовательная запись на порядки быстрее
          случайной, даже на SSD.
        </P>
        <P>
          Чтение тоже эффективно (Kafka использует zero-copy и отдаёт данные почти напрямую из page cache),
          но <B>операционно сложнее</B>, потому что consumer должен управлять состоянием:
        </P>
        <Ul items={[
          <>Хранить и коммитить <C>offset</C> — до или после обработки, и от этого зависят гарантии доставки.</>,
          <>Состоять в consumer group и переживать ребалансировки.</>,
          <>Обрабатывать дубликаты, потому что at-least-once — норма.</>,
          <>Успевать за потоком, иначе растёт consumer lag.</>,
        ]} />
        <P>
          Поэтому короткий ответ на собеседовании: «запись — просто append в лог, а вся сложность Kafka
          сосредоточена на стороне consumer: offsets, группы, ребалансировки, повторы».
        </P>
      </Q>

      <Q n={34} question="Как работают consumer groups в Kafka? Соотношение партиций и консьюмеров">
        <P>
          Consumer group — набор consumer'ов, которые совместно читают топик и делят между собой партиции.
          Ключевое правило: <B>внутри одной группы каждая партиция назначена ровно одному consumer</B>.
          Это и обеспечивает и параллелизм, и сохранение порядка внутри партиции.
        </P>
        <P>
          Отсюда следует, что <B>максимальный полезный параллелизм равен числу партиций</B>:
        </P>
        <Table
          headers={['Партиций', 'Consumer\'ов', 'Что происходит']}
          rows={[
            ['6', '3', 'Каждый читает по 2 партиции — сбалансировано'],
            ['6', '6', 'Каждый читает по 1 — максимальный параллелизм'],
            ['6', '8', 'Два consumer простаивают — партиций на всех не хватило'],
            ['6', '1', 'Один consumer тянет все 6 партиций'],
          ]}
        />
        <P>
          При падении, добавлении или зависании consumer'а происходит <B>ребалансировка</B> — партиции
          перераспределяются. Во время неё обработка приостанавливается (stop-the-world в классическом
          протоколе), поэтому частые ребалансировки — известная боль.
        </P>
        <Note>
          Практический вывод: число партиций закладывают с запасом на будущий рост, потому что увеличить
          его можно, а <B>уменьшить — нет</B>. Плюс увеличение партиций ломает привязку «ключ → партиция»
          для новых сообщений, что может нарушить порядок по сущности.
        </Note>
        <P>
          Разные группы читают топик <B>независимо</B> и каждая со своим offset — поэтому одно и то же событие
          может обработать и биллинг, и аналитика, и нотификации, не мешая друг другу.
        </P>
      </Q>

      <Q n={35} question="Для чего ключ в сообщении Kafka?">
        <P>
          Ключ определяет, в какую партицию попадёт сообщение: по умолчанию партиция выбирается как
          хэш от ключа по модулю числа партиций. Одинаковый ключ при стабильной схеме партиционирования
          всегда попадает в одну и ту же партицию.
        </P>
        <P><B>Зачем это нужно:</B></P>
        <Ul items={[
          <><B>Порядок по сущности.</B> Все события <C>order_id = 123</C> идут в одну партицию, а значит будут обработаны строго в порядке отправки: created → paid → shipped.</>,
          <><B>Compacted topics.</B> При <C>cleanup.policy=compact</C> Kafka хранит последнее значение для каждого ключа — получается что-то вроде снапшота текущего состояния.</>,
          <><B>Локальность обработки.</B> Consumer, обрабатывающий одну партицию, может кэшировать состояние по своим ключам.</>,
        ]} />
        <Warn>
          Обратная сторона — <B>перекос партиций (data skew)</B>. Если ключом взять что-то с очень неравномерным
          распределением (например, <C>country = RU</C> для 90% трафика), одна партиция получит основную
          нагрузку, а её consumer станет узким местом, пока остальные простаивают.
        </Warn>
        <P>
          Если ключ не указан (<C>null</C>), сообщения распределяются по партициям равномерно
          (round-robin / sticky partitioning) — это даёт лучшую балансировку, но <B>никаких гарантий порядка</B>.
        </P>
      </Q>

      <Q n={36} question="Можно ли записать в определённую партицию Kafka?">
        <P>
          Да. Producer может явно указать номер партиции при отправке записи, и тогда partitioner не
          используется вовсе.
        </P>
        <P>
          Но на практике так делают редко. Обычно указывают <B>ключ</B> и доверяют partitioner: так проще
          равномерно распределять поток и при этом сохранять порядок по ключу, не завязываясь на конкретные
          номера партиций.
        </P>
        <Warn>
          Опасность жёсткой привязки к номеру партиции: если число партиций изменится, ваша логика
          «пишем в партицию 3» может перестать соответствовать распределению остальных данных. Плюс вы
          сами берёте на себя ответственность за балансировку — легко получить перекос.
        </Warn>
        <P>
          Разумные случаи для явного указания: собственная кастомная схема партиционирования, которую нельзя
          выразить через ключ, или отладка и тестирование.
        </P>
      </Q>

      <Q n={37} question="Структура сообщения Kafka">
        <P>На уровне приложения запись (record) содержит:</P>
        <Table
          headers={['Поле', 'Назначение']}
          rows={[
            ['topic', 'Куда пишем'],
            ['partition', 'Назначается partitioner\'ом по ключу либо задаётся явно'],
            ['key', 'Определяет партицию; может быть null'],
            ['value', 'Полезная нагрузка (payload) — обычно JSON, Avro или Protobuf'],
            ['headers', 'Метаданные: trace_id, тип события, версия схемы'],
            ['timestamp', 'Время создания или время записи брокером'],
            ['offset', 'Присваивается брокером после записи — порядковый номер в партиции'],
          ]}
        />
        <P>
          Партиция — это упорядоченный неизменяемый лог. Записи в него только дописываются, изменить или
          удалить конкретную запись нельзя (только целиком по политике retention или compaction).
        </P>
        <Note>
          Важная деталь: <B>offset уникален только внутри своей партиции</B>. Offset 42 в партиции 0 и
          offset 42 в партиции 1 — совершенно разные сообщения. Поэтому позиция consumer'а описывается
          тройкой (topic, partition, offset).
        </Note>
        <P>
          Практический совет: <C>headers</C> удобны для сквозной трассировки (<C>trace_id</C>) и версионирования
          схемы — это позволяет не ломать <C>value</C> и не смешивать технические метаданные с бизнес-данными.
        </P>
      </Q>

      <Q n={38} question="Гарантируется ли последовательность событий в Kafka?">
        <P>
          Порядок гарантируется <B>только внутри одной партиции</B>. Глобального порядка между партициями
          топика не существует — партиции пишутся и читаются независимо и параллельно.
        </P>
        <P>
          Поэтому, чтобы события одной сущности обрабатывались по порядку, их нужно отправлять с
          <B> стабильным ключом сущности</B>: <C>order_id</C>, <C>user_id</C>, <C>account_id</C>. Тогда все
          они окажутся в одной партиции и consumer прочитает их в правильной последовательности.
        </P>
        <Code lang="text" code={`Партиция 0: order_1.created -> order_1.paid -> order_1.shipped   (порядок гарантирован)
Партиция 1: order_2.created -> order_2.paid                      (порядок гарантирован)

Между партицией 0 и 1 порядок НЕ определён:
order_2.created может быть обработан раньше order_1.created`} />
        <Warn>
          Порядок можно потерять и внутри партиции, если consumer обрабатывает сообщения <B>параллельно</B>
          в несколько потоков. Порядок гарантирован при последовательной обработке; при параллельной нужно
          распределять по воркерам так, чтобы один ключ всегда попадал к одному воркеру.
        </Warn>
        <P>
          Ещё нюанс для senior-уровня: при retry на стороне producer'а без <C>enable.idempotence=true</C>
          и с <C>max.in.flight.requests.per.connection {'>'} 1</C> порядок записи тоже может нарушиться.
          Идемпотентный producer решает эту проблему.
        </P>
      </Q>

      <Q n={39} level="senior" question="Kafka vs RabbitMQ: основные отличия">
        <Table
          headers={['Критерий', 'Kafka', 'RabbitMQ']}
          rows={[
            ['Модель', 'Распределённый журнал событий (log)', 'Брокер сообщений с маршрутизацией'],
            ['Потребление', 'Consumer сам читает по offset, возможен replay', 'Сообщение выдаётся из очереди и подтверждается (ack)'],
            ['Хранение', 'По retention/compaction, независимо от чтения', 'Обычно до подтверждения или по TTL/политике'],
            ['Маршрутизация', 'Базовая: topic + partitions + key', 'Гибкая: exchanges, routing keys, bindings'],
            ['Порядок', 'Внутри партиции', 'Внутри очереди (при одном consumer)'],
            ['Пропускная способность', 'Очень высокая, сотни тысяч msg/s', 'Ниже, но низкая задержка'],
            ['Типовые задачи', 'События, аналитика, streaming, интеграции', 'Команды, фоновые задачи, RPC, сложная маршрутизация'],
          ]}
        />
        <P>
          Известная формулировка <B>«тупой брокер, умный клиент»</B> про Kafka означает: broker в основном
          просто хранит append-only лог и почти ничего не знает о потребителях, а consumer сам управляет
          offset'ом и решает, что и когда читать. В RabbitMQ наоборот — «умный брокер»: он активно
          маршрутизирует сообщения по exchange и binding'ам, хранит состояние очередей, отслеживает
          подтверждения и сам решает, кому доставить сообщение.
        </P>
        <Note>
          Самое практичное отличие для устного ответа: <B>в Kafka сообщение не исчезает после чтения</B>.
          Его можно перечитать заново, подключить новую группу и проиграть всю историю с начала. В RabbitMQ
          после ack сообщение удаляется навсегда.
        </Note>
      </Q>

      <Q n={40} level="senior" question="Почему Kafka не совсем полноценная очередь?">
        <P>
          Kafka может выполнять роль очереди через consumer group — партиции распределяются между
          consumer'ами, и каждое сообщение обрабатывается одним из них. Но по своей природе Kafka — это
          <B> распределённый лог</B>, а не очередь, и отличия принципиальны:
        </P>
        <Ul items={[
          <><B>Сообщение не удаляется после обработки.</B> Оно живёт по политике retention (например, 7 дней) независимо от того, прочитал его кто-то или нет.</>,
          <><B>Его можно перечитать</B> — тем же consumer'ом после сброса offset или новой группой с начала топика.</>,
          <><B>Нет выборочного ack.</B> Offset — это позиция в логе, а не подтверждение конкретного сообщения. Нельзя подтвердить сообщение 5 и оставить 4 необработанным: коммит offset 5 неявно означает, что всё до него обработано.</>,
          <><B>Параллелизм ограничен числом партиций</B>, а не числом consumer'ов. В классической очереди можно просто добавить воркеров.</>,
          <><B>Нет приоритетов и отложенной доставки</B> из коробки, в отличие от RabbitMQ.</>,
        ]} />
        <P>
          Особенно неудобен сценарий «одно сообщение упало, остальные обрабатываем дальше»: в Kafka
          застрявшее сообщение блокирует продвижение offset'а в своей партиции (head-of-line blocking).
          Поэтому и придумали retry-топики и DLQ.
        </P>
        <P>
          Вывод: Kafka особенно хороша как <B>шина событий</B> и источник истины, который можно проиграть
          заново, а не как классическая task queue.
        </P>
      </Q>

      <Q n={41} level="senior" question="Можно ли сделать RabbitMQ таким же быстрым, как Kafka?">
        <P>
          В отдельных узких сценариях можно сильно приблизиться — настройками, батчингом, отключением
          персистентности, увеличением prefetch. Но архитектуры оптимизированы под разное, поэтому в общем
          случае — нет.
        </P>
        <P><B>Почему Kafka выигрывает на больших потоках:</B></P>
        <Ul items={[
          <>Последовательная запись в лог вместо управления состоянием каждого сообщения.</>,
          <>Отсутствие построчного учёта: брокер не хранит статус «доставлено/подтверждено» для каждого сообщения.</>,
          <>Zero-copy при отдаче данных consumer'ам и опора на page cache ОС.</>,
          <>Батчинг и сжатие на стороне producer'а по умолчанию.</>,
          <>Горизонтальное масштабирование партициями.</>,
        ]} />
        <P><B>Где RabbitMQ лучше:</B> низкая задержка на одиночном сообщении, гибкая маршрутизация, приоритеты, отложенные сообщения, удобные ack/nack/retry/DLQ из коробки.</P>
        <Note>
          Правильная позиция в ответе: сравнивать нужно <B>на конкретной нагрузке и конкретных требованиях</B> —
          к подтверждениям, персистентности, маршрутизации и задержке. «Kafka быстрее» без контекста
          некорректно: если нужно доставить одно сообщение с минимальной задержкой и сложной маршрутизацией,
          RabbitMQ может оказаться и быстрее, и уместнее.
        </Note>
      </Q>

      <Q n={42} level="senior" question="Когда использовать RabbitMQ, а когда Kafka?">
        <P><B>RabbitMQ — когда у вас «задачи» (команды):</B></P>
        <Ul items={[
          <>Отправить email или push-уведомление.</>,
          <>Запустить обработку загруженного файла, сгенерировать отчёт или превью.</>,
          <>Маршрутизировать команды по гибким правилам (routing key, topic exchange).</>,
          <>Нужны быстрые ack/retry/DLQ, приоритеты, отложенная доставка.</>,
          <>Важно: задача выполняется один раз и исчезает; перечитывать её не нужно.</>,
        ]} />
        <P><B>Kafka — когда у вас «события» (факты):</B></P>
        <Ul items={[
          <>Доменные события: <C>OrderCreated</C>, <C>UserRegistered</C>, <C>PaymentProcessed</C>.</>,
          <>Несколько независимых потребителей одного события: биллинг, аналитика, поиск, нотификации.</>,
          <>Потоковая обработка и агрегации, аудит, event sourcing.</>,
          <>Нужна возможность <B>переиграть историю</B>: добавили новый сервис — он читает топик с начала.</>,
          <>Очень большой поток данных и аналитические пайплайны.</>,
        ]} />
        <Note>
          Простое эвристическое правило для ответа: <B>«сделай это» — RabbitMQ; «это произошло» — Kafka</B>.
          Команда адресована конкретному исполнителю и одноразова; событие — это факт, который может
          заинтересовать сколько угодно подписчиков, в том числе будущих.
        </Note>
        <P>
          В крупных системах их часто используют вместе: Kafka как шина доменных событий между сервисами,
          RabbitMQ — как очередь фоновых задач внутри отдельного сервиса.
        </P>
      </Q>

      <Q n={43} question="Гарантии доставки: at-most-once, at-least-once, exactly-once">
        <Table
          headers={['Гарантия', 'Дубликаты', 'Потери', 'Когда применять']}
          rows={[
            ['At-most-once', 'Нет', 'Возможны', 'Метрики, логи, телеметрия — потерять не страшно'],
            ['At-least-once', 'Возможны', 'Нет', 'Дефолт для большинства бизнес-задач'],
            ['Exactly-once', 'Нет', 'Нет', 'Финансовые операции; сложно и дорого'],
          ]}
        />
        <P>
          Разница определяется <B>моментом подтверждения</B>. Если закоммитить offset (или отправить ack)
          <B> до</B> обработки — получаем at-most-once: упали в процессе, сообщение уже считается обработанным
          и потеряно. Если <B>после</B> обработки — at-least-once: упали после обработки, но до коммита,
          и сообщение придёт повторно.
        </P>
        <P>
          Kafka по умолчанию даёт <B>at-least-once</B> при коммите offset после обработки. Exactly-once
          в рамках Kafka существует (транзакции producer'а, <C>enable.idempotence</C>,
          <C> isolation.level=read_committed</C>), но работает только для схемы Kafka → Kafka.
        </P>
        <Warn>
          <B>Сквозной exactly-once практически недостижим</B>, если у обработки есть внешние побочные эффекты.
          Если вы отправили email и упали до коммита offset — письмо уже ушло, откатить его нельзя.
          Поэтому на практике делают at-least-once + <B>идемпотентную обработку</B>: это стандартный
          и ожидаемый ответ на собеседовании.
        </Warn>
        <P>
          <B>Как добиться идемпотентности:</B> уникальный <C>message_id</C> в сообщении и таблица
          обработанных id с уникальным индексом; либо <C>UPSERT</C> вместо <C>INSERT</C>; либо операции,
          естественно идемпотентные по природе (<C>SET status = 'paid'</C> вместо <C>balance = balance - X</C>).
        </P>
      </Q>

      <Q n={44} level="senior" question="Что такое DLQ? Как сделать в RabbitMQ и Kafka?">
        <P>
          DLQ (dead-letter queue / dead-letter topic) — отдельное место, куда складывают сообщения, которые
          не удалось обработать после ограниченного числа попыток. Смысл: <B>не блокировать обработку
          остального потока</B> одним «ядовитым» сообщением и не терять его молча.
        </P>
        <P><B>Что кладут в DLQ вместе с сообщением:</B> исходный payload, причину ошибки, stack trace, число попыток, время последней ошибки, исходные topic/partition/offset. Дальше — алерт и ручной или автоматический replay после починки.</P>
        <P><B>RabbitMQ</B> — поддержка из коробки. На очереди настраивается dead-letter exchange:</P>
        <Code lang="text" code={`x-dead-letter-exchange: dlx
x-dead-letter-routing-key: orders.failed`} />
        <P>Сообщение попадёт в DLX автоматически при: <C>reject</C>/<C>nack</C> с <C>requeue=false</C>, истечении TTL, переполнении очереди или превышении delivery limit.</P>
        <P><B>Kafka</B> — готового механизма нет, реализуется вручную. Создают топик вида <C>orders.DLQ</C>; consumer после исчерпания retry публикует туда исходное сообщение с error-метаданными и <B>коммитит исходный offset</B>, чтобы двигаться дальше.</P>
        <Code lang="text" code={`orders            -> основной топик
orders.retry.5s   -> повтор через 5 секунд
orders.retry.1m   -> повтор через минуту
orders.DLQ        -> окончательно не обработанные`} />
        <Note>
          Схема с промежуточными retry-топиками нужна потому, что в Kafka нельзя «отложить» отдельное
          сообщение, не заблокировав партицию. Сообщение перекладывают в топик с задержкой, а исходный offset
          сразу коммитят — так основной поток продолжает идти.
        </Note>
        <Warn>
          DLQ без мониторинга бесполезен. Обязательно нужен алерт на появление сообщений в DLQ — иначе
          проблемные события просто тихо копятся, и о потере данных узнают от пользователей.
        </Warn>
      </Q>

      <Q n={45} question="Почему очередь, а не HTTP/gRPC?">
        <P>
          HTTP и gRPC — синхронный запрос-ответ: вызывающий сервис ждёт, пока другой будет доступен и ответит.
          Очередь разрывает эту связь во времени.
        </P>
        <Table
          headers={['', 'HTTP / gRPC', 'Очередь']}
          rows={[
            ['Связь', 'Синхронная, оба сервиса должны быть живы', 'Асинхронная, получатель может быть недоступен'],
            ['Пики нагрузки', 'Передаются напрямую, сервис может лечь', 'Сглаживаются: очередь копит, воркеры разбирают'],
            ['Ответ клиенту', 'Немедленный результат', 'Только факт приёма задачи'],
            ['Повторы', 'Нужно реализовывать самому', 'Retry и DLQ из коробки'],
            ['Связанность', 'Отправитель знает получателя', 'Отправитель не знает, кто и когда обработает'],
          ]}
        />
        <P><B>Очередь выбирают, когда:</B> работа долгая (обработка видео, генерация отчёта), результат не нужен клиенту прямо сейчас, нужно пережить недоступность получателя, нужно сгладить пики или разослать событие нескольким подписчикам.</P>
        <P><B>HTTP/gRPC выбирают, когда:</B> клиенту нужен немедленный результат (проверить логин, получить корзину), операция короткая, нужен синхронный ответ для принятия решения.</P>
        <Note>
          Хороший практический пример: при оформлении заказа синхронно (HTTP) проверяют оплату — клиент
          должен сразу увидеть результат. А отправку письма, обновление аналитики и пересчёт рекомендаций
          кидают в очередь: клиенту незачем ждать, пока всё это выполнится.
        </Note>
      </Q>

      <Q n={46} question="Можно ли реализовать очередь на БД?">
        <P>
          Да, и для умеренной нагрузки это вполне рабочее решение. Делают таблицу <C>jobs</C> со статусом,
          числом попыток и временем следующего запуска, а worker атомарно забирает задачу через
          <C> FOR UPDATE SKIP LOCKED</C>.
        </P>
        <Code code={`WITH next_job AS (
  SELECT id
  FROM jobs
  WHERE status = 'new' AND run_at <= NOW()
  ORDER BY run_at, id
  FOR UPDATE SKIP LOCKED
  LIMIT 1
)
UPDATE jobs
SET status = 'processing', locked_at = NOW(), attempts = attempts + 1
WHERE id IN (SELECT id FROM next_job)
RETURNING *;`} />
        <P>
          Ключевая конструкция здесь — <C>SKIP LOCKED</C>: она заставляет транзакцию <B>пропускать</B> уже
          заблокированные другими воркерами строки вместо ожидания. Без неё все воркеры выстроились бы
          в очередь за одной и той же первой задачей, и параллелизма не было бы.
        </P>
        <P><B>Плюсы:</B></P>
        <Ul items={[
          <>Не нужна дополнительная инфраструктура — одним компонентом меньше.</>,
          <>Задачу можно поставить в <B>той же транзакции</B>, что и бизнес-изменение. Это решает проблему «записали заказ, но не отправили событие» без паттерна transactional outbox.</>,
          <>Полная видимость: состояние задач можно посмотреть обычным <C>SELECT</C>.</>,
        ]} />
        <P><B>Минусы:</B></P>
        <Ul items={[
          <>Конкуренция за таблицу и лишняя нагрузка на основную БД.</>,
          <>Постоянные <C>UPDATE</C> генерируют dead tuples, таблица распухает и требует агрессивного autovacuum.</>,
          <>Polling: воркеры регулярно опрашивают таблицу вместо push-модели (частично лечится <C>LISTEN/NOTIFY</C>).</>,
          <>Retry, DLQ, приоритеты, метрики и мониторинг придётся писать самому.</>,
          <>Плохо масштабируется на действительно больших потоках.</>,
        ]} />
        <Note>
          Разумная позиция: для небольших фоновых задач очередь на БД — прагматичный выбор, который экономит
          целый компонент инфраструктуры. Отдельный брокер вводят, когда упираются в нагрузку или начинают
          нуждаться в его возможностях (маршрутизация, отложенная доставка, несколько независимых подписчиков).
        </Note>
      </Q>

      {/* ═══════════ РАЗДЕЛ 3: DOCKER ═══════════ */}
      <SectionTitle id="docker" kicker="Раздел 3">Docker</SectionTitle>

      <Q n={47} question="Что такое Docker?">
        <P>
          Docker — платформа для упаковки и запуска приложений в контейнерах. Контейнер изолирует процессы,
          файловую систему и сеть приложения, но <B>использует ядро хостовой ОС</B>, а не запускает своё.
          Поэтому он легче виртуальной машины и стартует за доли секунды.
        </P>
        <P>Технически изоляция строится на возможностях ядра Linux:</P>
        <Ul items={[
          <><B>namespaces</B> — изоляция того, что процесс <B>видит</B>: свои PID, сеть, точки монтирования, hostname.</>,
          <><B>cgroups</B> — ограничение того, что процесс <B>потребляет</B>: CPU, память, I/O.</>,
          <><B>union filesystem</B> (OverlayFS) — слоистая файловая система, за счёт которой образы переиспользуют общие слои.</>,
        ]} />
        <Table
          headers={['', 'Контейнер', 'Виртуальная машина']}
          rows={[
            ['Ядро ОС', 'Общее с хостом', 'Своё в каждой ВМ'],
            ['Запуск', 'Доли секунды', 'Десятки секунд'],
            ['Размер', 'Мегабайты', 'Гигабайты'],
            ['Изоляция', 'На уровне процессов', 'Полная, на уровне железа'],
          ]}
        />
        <P>
          Главная ценность для разработки — <B>воспроизводимость</B>: образ содержит приложение вместе со
          всеми зависимостями и версиями, поэтому одинаково работает на ноутбуке, в CI и на проде. Это и есть
          решение проблемы «у меня локально работает».
        </P>
      </Q>

      <Q n={48} question="Чем image отличается от container?">
        <P>
          <B>Image</B> — неизменяемый шаблон: набор слоёв файловой системы плюс метаданные запуска (какую
          команду выполнять, какие переменные окружения, какой рабочий каталог).
        </P>
        <P>
          <B>Container</B> — запущенный (или созданный) экземпляр образа. Поверх read-only слоёв образа
          добавляется тонкий <B>writable layer</B>, куда попадают все изменения файлов во время работы.
          У контейнера также своя сеть, свои процессы и своё состояние.
        </P>
        <Note>
          <B>Аналогия:</B> image — чертёж автомобиля, container — конкретный собранный автомобиль. Из одного
          чертежа можно собрать сколько угодно машин, и каждая будет ездить по-своему и пачкаться отдельно.
        </Note>
        <Warn>
          Критично важное следствие: <B>writable layer живёт ровно столько, сколько контейнер</B>. Удалили
          контейнер — все записанные внутрь данные исчезли. Поэтому базы данных, загруженные файлы и любое
          состояние монтируют через <C>volume</C>, а не оставляют внутри контейнера.
        </Warn>
        <Code lang="bash" code={`docker images          # список образов
docker ps              # запущенные контейнеры
docker ps -a           # все, включая остановленные
docker run nginx       # создать контейнер из образа и запустить`} />
      </Q>

      <Q n={49} question="Что такое Dockerfile?">
        <P>
          Dockerfile — декларативный рецепт сборки образа: текстовый файл с инструкциями, которые Docker
          выполняет по порядку, формируя слои.
        </P>
        <Code lang="dockerfile" code={`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]`} />
        <Table
          headers={['Инструкция', 'Что делает']}
          rows={[
            ['FROM', 'Базовый образ, с которого начинаем'],
            ['WORKDIR', 'Рабочий каталог для последующих команд'],
            ['COPY', 'Копирует файлы из build context в образ'],
            ['RUN', 'Выполняет команду при сборке, результат становится слоем'],
            ['ENV', 'Переменные окружения'],
            ['EXPOSE', 'Документирует порт (не публикует его — это делает -p)'],
            ['CMD', 'Команда по умолчанию, легко переопределяется при запуске'],
            ['ENTRYPOINT', 'Основной исполняемый файл, переопределить сложнее'],
          ]}
        />
        <P>
          <B>CMD vs ENTRYPOINT</B> — почти обязательный follow-up. <C>CMD</C> задаёт команду по умолчанию,
          и всё, что вы напишете после имени образа в <C>docker run</C>, её заменит. <C>ENTRYPOINT</C> задаёт
          сам исполняемый файл, а аргументы из <C>docker run</C> к нему добавляются. Частая рабочая связка —
          <C> ENTRYPOINT</C> с бинарём и <C>CMD</C> с аргументами по умолчанию.
        </P>
        <Warn>
          Не кладите секреты в Dockerfile через <C>ENV</C> или <C>ARG</C>: они остаются в слоях образа,
          и любой, кто получит образ, сможет их извлечь через <C>docker history</C>. Секреты передают
          в рантайме через переменные окружения или secret-менеджер.
        </Warn>
      </Q>

      <Q n={50} question="Что такое слои Docker image и зачем порядок инструкций?">
        <P>
          Каждая инструкция Dockerfile обычно создаёт отдельный слой — неизменяемый набор изменений файловой
          системы. Docker кэширует слои: при пересборке он переиспользует те, что не изменились.
        </P>
        <P>
          <B>Ключевое правило:</B> если слой изменился, все последующие слои пересобираются заново, даже если
          их инструкции не менялись. Отсюда и вытекает правильный порядок — от <B>редко меняющегося
          к часто меняющемуся</B>.
        </P>
        <Code lang="dockerfile" code={`# ПРАВИЛЬНО: зависимости отдельно от кода
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

# НЕПРАВИЛЬНО: любая правка в коде инвалидирует установку зависимостей
COPY . .
RUN pip install --no-cache-dir -r requirements.txt`} />
        <P>
          В правильном варианте <C>requirements.txt</C> меняется редко, поэтому слой с установкой зависимостей
          берётся из кэша, и пересборка после правки кода занимает секунды вместо минут. В неправильном —
          каждая правка любого файла заставляет заново скачивать и ставить все пакеты.
        </P>
        <Note>
          Ещё один эффект слоёв: <B>удаление файла в следующем слое не уменьшает образ</B>. Если в одном
          <C> RUN</C> скачали архив, а в другом удалили — он всё равно остался в предыдущем слое и весит.
          Поэтому скачивание и очистку объединяют в одну инструкцию <C>RUN</C> через <C>&&</C>.
        </Note>
      </Q>

      <Q n={51} question="Что такое .dockerignore?">
        <P>
          Файл, который исключает ненужное из <B>build context</B> — того набора файлов, который Docker CLI
          отправляет демону перед сборкой.
        </P>
        <Code lang="text" code={`.git
node_modules
.env
*.log
__pycache__
dist`} />
        <P><B>Три причины его использовать:</B></P>
        <Ul items={[
          <><B>Скорость.</B> Без него в контекст попадает вся папка, включая <C>.git</C> и <C>node_modules</C> — это могут быть сотни мегабайт, которые копируются при каждой сборке.</>,
          <><B>Размер образа.</B> Инструкция <C>COPY . .</C> затащит внутрь всё лишнее.</>,
          <><B>Безопасность.</B> Самое важное: без <C>.dockerignore</C> файл <C>.env</C> с паролями и ключами легко уедет прямо в образ, который потом попадёт в реестр.</>,
        ]} />
        <Warn>
          Это ровно тот случай, когда забытая строчка приводит к утечке секретов: <C>COPY . .</C> вместе
          с <C>.env</C> в контексте — и учётные данные оказываются в образе навсегда, даже если позже
          удалить файл следующей инструкцией.
        </Warn>
      </Q>

      <Q n={52} level="senior" question="Что такое Docker network?">
        <P>
          Docker network — виртуальная сеть, в которой живут контейнеры. Главная практическая ценность:
          в пользовательской bridge-сети работает <B>встроенный DNS</B>, и контейнеры обращаются друг
          к другу <B>по имени сервиса</B>, а не по IP (который меняется при пересоздании).
        </P>
        <Table
          headers={['Драйвер', 'Что делает', 'Когда использовать']}
          rows={[
            ['bridge', 'Изолированная сеть на одном хосте (по умолчанию)', 'Обычная локальная разработка'],
            ['host', 'Контейнер использует сеть хоста напрямую', 'Когда критична производительность сети'],
            ['none', 'Сети нет вообще', 'Полностью изолированные задачи'],
            ['overlay', 'Сеть между несколькими хостами', 'Swarm / кластерные сценарии'],
          ]}
        />
        <P>
          В Docker Compose сеть создаётся автоматически, и приложение подключается к базе просто по имени
          сервиса: строка подключения выглядит как <C>postgresql://user:pass@db:5432/mydb</C>, где
          <C> db</C> — имя сервиса из compose-файла.
        </P>
        <Note>
          Важный нюанс про безопасность: <B>не нужно публиковать порт базы наружу</B> через <C>ports</C>,
          если она нужна только приложению. Контейнеры в одной сети видят друг друга и без публикации.
          Публикация <C>5432:5432</C> открывает вашу БД всему, что может достучаться до хоста.
        </Note>
        <P>
          И ещё частый вопрос: чтобы из контейнера обратиться к сервису на самом хосте, используют
          специальное имя <C>host.docker.internal</C>.
        </P>
      </Q>

      <Q n={53} question="Что такое Docker Compose?">
        <P>
          Docker Compose описывает и запускает несколько связанных сервисов одним YAML-файлом: приложение,
          PostgreSQL, Kafka, RabbitMQ, вместе с сетями и volume'ами. Вместо десятка длинных
          <C> docker run</C> — одна команда <C>docker compose up</C>.
        </P>
        <Code lang="yaml" code={`services:
  app:
    build: .
    ports: ["8080:8080"]
    depends_on: [db]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: devpass
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes:
  pgdata:`} />
        <P>
          Compose автоматически создаёт общую сеть, поэтому <C>app</C> обращается к базе по имени
          <C> db</C>. Именованный volume <C>pgdata</C> сохраняет данные PostgreSQL между перезапусками
          и пересозданиями контейнера.
        </P>
        <Warn>
          Классический подвох на собеседовании: <C>depends_on</C> ждёт только <B>запуска</B> контейнера,
          а не готовности сервиса принимать соединения. PostgreSQL стартует несколько секунд, и приложение
          успеет получить ошибку подключения. Решения: <C>depends_on</C> с <C>condition: service_healthy</C>
          плюс healthcheck, или (правильнее) retry-логика подключения в самом приложении.
        </Warn>
        <P>
          Основные команды: <C>docker compose up -d</C> (запустить в фоне), <C>docker compose logs -f app</C>
          (смотреть логи), <C>docker compose down</C> (остановить и удалить), <C>docker compose down -v</C>
          (вместе с volume'ами — удалит и данные БД).
        </P>
      </Q>

      <Q n={54} question="Что такое multi-stage build?">
        <P>
          Сборка в нескольких стадиях: в первой компилируем приложение со всеми инструментами сборки,
          во вторую копируем <B>только готовый артефакт</B>. Всё, что нужно было для сборки — компилятор,
          заголовочные файлы, dev-зависимости — в финальный образ не попадает.
        </P>
        <Code lang="dockerfile" code={`FROM golang:1.23 AS build
WORKDIR /src
COPY . .
RUN go build -o app .

FROM gcr.io/distroless/base-debian12
COPY --from=build /src/app /app
ENTRYPOINT ["/app"]`} />
        <P><B>Что это даёт:</B></P>
        <Ul items={[
          <><B>Размер.</B> Образ с Go-компилятором — около 800 МБ; итоговый с одним бинарником — десятки мегабайт. Это ускоряет push, pull и деплой.</>,
          <><B>Безопасность.</B> Меньше пакетов — меньше поверхность атаки и меньше CVE в сканере уязвимостей. В distroless-образе нет даже shell, поэтому выполнить произвольную команду при взломе сильно сложнее.</>,
          <><B>Чистота.</B> Исходники и секреты, использованные на этапе сборки, не утекают в финальный образ.</>,
        ]} />
        <P>
          Тот же приём отлично работает для Node.js (собрали фронтенд — отдали статику через nginx) и для
          Java (собрали jar в образе с Maven — запускаем в образе с одним JRE).
        </P>
        <Note>
          Полезная деталь: можно собрать образ до конкретной стадии — <C>docker build --target build .</C>.
          Это удобно, когда нужен образ с тестовым окружением для CI.
        </Note>
      </Q>

      <Q n={55} question="Как отладить контейнер, который не запускается?">
        <P>Порядок действий — от простого к сложному:</P>
        <Code lang="bash" code={`docker ps -a                              # найти контейнер и посмотреть exit code
docker logs <container>                   # что написало приложение перед падением
docker inspect <container>                # переменные, монтирования, команда запуска
docker run --rm -it --entrypoint sh <image>   # зайти внутрь в обход ENTRYPOINT`} />
        <P><B>На что смотреть в первую очередь:</B></P>
        <Table
          headers={['Симптом', 'Вероятная причина']}
          rows={[
            ['Exit code 0', 'Основной процесс просто завершился — контейнеру нечего делать'],
            ['Exit code 1', 'Ошибка приложения — смотреть логи'],
            ['Exit code 125', 'Ошибка самого Docker (неверные аргументы запуска)'],
            ['Exit code 126/127', 'Команда не исполняема / не найдена — часто опечатка в CMD'],
            ['Exit code 137', 'Убит по OOM или SIGKILL — не хватило памяти'],
            ['Мгновенный рестарт по кругу', 'Падает на старте, а стоит restart policy'],
          ]}
        />
        <P>
          Ключевой приём — <C>--entrypoint sh</C>: он позволяет зайти в образ и осмотреться, даже если
          штатная команда падает. Внутри проверяют, на месте ли файлы, что в переменных окружения, есть ли
          права на смонтированные каталоги.
        </P>
        <Warn>
          В минимальных образах (<C>distroless</C>, <C>scratch</C>) shell отсутствует, и зайти внутрь не
          получится. Для таких случаев используют <C>docker debug</C> или временно собирают образ на базе
          <C> alpine</C>, чтобы воспроизвести проблему.
        </Warn>
        <P>
          Также стоит проверить: exit code, переменные окружения, проброшенные порты, права на volume,
          команду запуска и healthcheck.
        </P>
      </Q>

      <Q n={56} question="Что такое healthcheck?">
        <P>
          Healthcheck — периодическая проверка того, что контейнер действительно <B>готов обслуживать
          запросы</B>, а не просто «процесс запущен». Процесс может быть жив, но приложение при этом
          не отвечает: не подключилось к базе, зависло, ушло в бесконечный GC.
        </P>
        <Code lang="dockerfile" code={`HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \\
  CMD wget -qO- http://localhost:8080/health || exit 1`} />
        <Table
          headers={['Параметр', 'Назначение']}
          rows={[
            ['--interval', 'Как часто проверять'],
            ['--timeout', 'Сколько ждать ответа'],
            ['--start-period', 'Стартовая фора: неудачи в это время не считаются'],
            ['--retries', 'Сколько неудач подряд до статуса unhealthy'],
          ]}
        />
        <P>
          Статус контейнера становится <C>healthy</C> или <C>unhealthy</C>, и его используют оркестраторы
          и зависимые сервисы: Compose — для <C>depends_on: condition: service_healthy</C>, Kubernetes —
          через свои liveness/readiness пробы, балансировщик — чтобы не слать трафик на неготовый инстанс.
        </P>
        <Warn>
          Сам по себе healthcheck <B>не заменяет retry в приложении</B>. Он лишь сообщает статус наружу;
          если ваш сервис при старте не может подключиться к БД, healthcheck это покажет, но переподключаться
          должен код приложения.
        </Warn>
        <Note>
          Хорошая практика — разделять <B>liveness</B> («процесс жив, перезапускать не надо») и
          <B> readiness</B> («готов принимать трафик»). Проверка не должна быть тяжёлой: если в
          <C> /health</C> ходить в базу и три внешних сервиса, при их замедлении вы сами уроните свой
          контейнер по таймауту.
        </Note>
      </Q>

      {/* Финал */}
      <div style={{ marginTop: 60, padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 12, textAlign: 'center' }}>
        <P style={{ fontSize: 14, margin: 0 }}>
          Все новости, разборы и объявления — в канале{' '}
          <a href="https://t.me/kiro_team" target="_blank" rel="noopener noreferrer" style={{ color: '#1668c4', textDecoration: 'underline', textUnderlineOffset: 2, fontWeight: 600 }}>
            t.me/kiro_team
          </a>.
        </P>
      </div>
    </div>
  )
}
