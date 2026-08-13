import { useState } from 'react'
import { TheoryTable } from './components/TheoryTable'

/* ── мини-UI ── */
const Viz = ({ children }) => (
  <div style={{
    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: 12, padding: '18px 20px', margin: '18px 0', overflowX: 'auto',
  }}>{children}</div>
)

const Card = ({ icon, title, children, color = 'var(--border-color)' }) => (
  <div style={{
    border: `1.5px solid ${color}`, borderRadius: 10, padding: '14px 16px',
    background: color + '08', flex: '1 1 200px', minWidth: 180,
  }}>
    {icon && <div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div>}
    {title && <div style={{ fontWeight: 700, fontSize: 13, color, marginBottom: 6 }}>{title}</div>}
    <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.7 }}>{children}</div>
  </div>
)

const Cards = ({ children }) => (
  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '14px 0' }}>{children}</div>
)

const Good = ({ children }) => (
  <div style={{
    background: 'rgba(63,185,80,0.07)', borderLeft: '3px solid #3fb950',
    borderRadius: '0 8px 8px 0', padding: '9px 14px', margin: '8px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}><strong style={{ color: '#3fb950' }}>✅ </strong>{children}</div>
)

const Warn = ({ children }) => (
  <div style={{
    background: 'rgba(210,153,34,0.08)', borderLeft: '3px solid #d29922',
    borderRadius: '0 8px 8px 0', padding: '9px 14px', margin: '8px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}><strong style={{ color: '#d29922' }}>💡 </strong>{children}</div>
)

const Quote = ({ text, author }) => (
  <div style={{
    borderLeft: '3px solid var(--accent-lime)', padding: '10px 16px', margin: '14px 0',
    background: 'rgba(32,190,255,0.04)', borderRadius: '0 8px 8px 0',
  }}>
    <div style={{ fontSize: 14, color: 'var(--text-primary)', fontStyle: 'italic', lineHeight: 1.6 }}>«{text}»</div>
    {author && <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 6 }}>— {author}</div>}
  </div>
)

const Step = ({ n, title, children, color = 'var(--accent-lime)' }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
    <div style={{
      minWidth: 28, height: 28, borderRadius: 8, background: color + '20',
      border: `1.5px solid ${color}`, display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 13, fontWeight: 900, color, flexShrink: 0,
    }}>{n}</div>
    <div>
      {title && <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>{title}</div>}
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{children}</div>
    </div>
  </div>
)

/* ══════════════════════════════════════════════
   ИЛЛЮСТРАЦИИ
══════════════════════════════════════════════ */

/* Стадии команды по Такману */
function TuckmanViz() {
  const [active, setActive] = useState(0)
  const stages = [
    {
      name: 'Forming', ru: 'Формирование', emoji: '👋',
      color: '#58a6ff',
      desc: 'Команда только собралась. Все вежливы, осторожны, присматриваются. Непонятно кто за что отвечает, процессы ещё не выстроены.',
      signs: ['Много вопросов, мало действий', 'Зависимость от лидера', 'Избегание конфликтов', 'Неясные роли'],
      tip: 'Нужно: чёткие цели, познакомиться по-человечески, определить правила работы',
    },
    {
      name: 'Storming', ru: 'Конфликт', emoji: '⚡',
      color: '#f85149',
      desc: 'Первые трения. Люди начинают проявлять настоящий характер, конкурировать за влияние, спорить о подходах. Это нормально и обязательно.',
      signs: ['Споры о процессах', 'Конкуренция за роли', 'Открытые конфликты', 'Снижение продуктивности'],
      tip: 'Нужно: не избегать конфликтов, а решать их конструктивно. Договориться о нормах.',
    },
    {
      name: 'Norming', ru: 'Нормализация', emoji: '🤝',
      color: '#d29922',
      desc: 'Команда нашла общий язык. Роли распределены, процессы понятны, люди доверяют друг другу. Появляются командные шутки и традиции.',
      signs: ['Роли и процессы ясны', 'Доверие растёт', 'Конфликты решаются быстро', 'Растёт продуктивность'],
      tip: 'Нужно: закрепить договорённости, культивировать психологическую безопасность.',
    },
    {
      name: 'Performing', ru: 'Работа', emoji: '🚀',
      color: '#3fb950',
      desc: 'Команда работает как единый организм. Высокая автономность, взаимоподдержка, фокус на результат. До сюда доходят не все команды.',
      signs: ['Высокая автономность', 'Взаимопомощь — норма', 'Быстрые решения', 'Фокус на результат'],
      tip: 'Нужно: поддерживать культуру, нанимать правильных людей, праздновать победы.',
    },
  ]
  const s = stages[active]
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        {stages.map((st, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
            borderRadius: 7, border: `1.5px solid ${i === active ? st.color : 'var(--border-color)'}`,
            background: i === active ? st.color + '18' : 'var(--bg-tertiary)',
            color: i === active ? st.color : 'var(--text-tertiary)',
          }}>{st.emoji} {st.name}</button>
        ))}
      </div>
      <div style={{ border: `1.5px solid ${s.color}`, borderRadius: 10, padding: '16px 18px', background: s.color + '07' }}>
        <div style={{ fontSize: 20, marginBottom: 6 }}>{s.emoji} <strong style={{ color: s.color }}>{s.name} — {s.ru}</strong></div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 12 }}>{s.desc}</p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
          {s.signs.map(sg => (
            <span key={sg} style={{
              fontSize: 11, padding: '3px 8px', borderRadius: 5,
              background: s.color + '15', color: s.color, border: `1px solid ${s.color}30`,
            }}>{sg}</span>
          ))}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', borderTop: `1px solid ${s.color}30`, paddingTop: 10 }}>
          <strong style={{ color: s.color }}>Лидеру/команде: </strong>{s.tip}
        </div>
      </div>
    </Viz>
  )
}

/* Коммуникация: синхронная vs асинхронная */
function CommViz() {
  const sync = [
    { icon: '🎤', name: 'Стендап', note: 'ежедневно, 15 мин, статус команды' },
    { icon: '📹', name: 'Видеозвонок', note: 'сложные вопросы, брейнсторм' },
    { icon: '💬', name: 'Живой чат', note: 'срочные вопросы, быстрые решения' },
    { icon: '🖥', name: 'Пейр-программинг', note: 'код-ревью вживую, онбординг' },
  ]
  const async = [
    { icon: '📝', name: 'Тикет / задача', note: 'детальное описание, статус, история' },
    { icon: '✉️', name: 'Email / мессенджер', note: 'не срочные вопросы, не ждёшь ответа немедленно' },
    { icon: '📄', name: 'Confluence / Notion', note: 'документация, решения, RFC' },
    { icon: '🔍', name: 'Code review', note: 'комментарии к PR, итерации' },
  ]
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff', marginBottom: 10 }}>⚡ Синхронная (здесь и сейчас)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {sync.map(s => (
              <div key={s.name} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 10px', borderRadius: 8, background: 'rgba(88,166,255,0.07)', border: '1px solid rgba(88,166,255,0.15)' }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#58a6ff' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#3fb950', marginBottom: 10 }}>🕐 Асинхронная (без срочности)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {async.map(s => (
              <div key={s.name} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 10px', borderRadius: 8, background: 'rgba(63,185,80,0.07)', border: '1px solid rgba(63,185,80,0.15)' }}>
                <span style={{ fontSize: 16 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#3fb950' }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{s.note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Viz>
  )
}

/* Модель фидбека SBI */
function FeedbackViz() {
  const [mode, setMode] = useState('bad')
  const bad = {
    label: '❌ Как НЕ надо',
    color: '#f85149',
    text: '"Ты опять всё сломал. Твой код — ужас. Ты вечно торопишься и не думаешь о последствиях."',
    problems: ['Оценивает личность, не поведение', 'Слово «вечно» — обобщение', 'Нет конкретики', 'Человек защищается, не слышит суть'],
  }
  const good = {
    label: '✅ Модель SBI',
    color: '#3fb950',
    blocks: [
      { letter: 'S', name: 'Situation', color: '#58a6ff', text: 'Вчера на code review для PR #142...' },
      { letter: 'B', name: 'Behavior', color: '#d29922', text: '...ты не покрыл тестами граничные случаи для null-значений...' },
      { letter: 'I', name: 'Impact', color: '#3fb950', text: '...это привело к баги в проде и 2 часам даунтайма. Давай разберём что пошло не так?' },
    ],
  }
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
        <button onClick={() => setMode('bad')} style={{ padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', borderRadius: 7, border: `1.5px solid ${mode === 'bad' ? '#f85149' : 'var(--border-color)'}`, background: mode === 'bad' ? 'rgba(248,81,73,0.12)' : 'var(--bg-tertiary)', color: mode === 'bad' ? '#f85149' : 'var(--text-tertiary)' }}>Плохой фидбек</button>
        <button onClick={() => setMode('good')} style={{ padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', borderRadius: 7, border: `1.5px solid ${mode === 'good' ? '#3fb950' : 'var(--border-color)'}`, background: mode === 'good' ? 'rgba(63,185,80,0.12)' : 'var(--bg-tertiary)', color: mode === 'good' ? '#3fb950' : 'var(--text-tertiary)' }}>Модель SBI</button>
      </div>
      {mode === 'bad' ? (
        <div style={{ border: '1.5px solid #f85149', borderRadius: 10, padding: '14px 16px', background: 'rgba(248,81,73,0.05)' }}>
          <div style={{ fontSize: 13, color: '#f85149', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.6 }}>{bad.text}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {bad.problems.map(p => <span key={p} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 5, background: 'rgba(248,81,73,0.12)', color: '#f85149', border: '1px solid rgba(248,81,73,0.2)' }}>✗ {p}</span>)}
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {good.blocks.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', borderRadius: 9, border: `1.5px solid ${b.color}30`, background: b.color + '08' }}>
              <div style={{ minWidth: 32, height: 32, borderRadius: 7, background: b.color + '20', border: `1.5px solid ${b.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: b.color, fontSize: 14 }}>{b.letter}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: b.color, marginBottom: 2 }}>{b.name}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{b.text}</div>
              </div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 4 }}>
            Конкретно, о поведении, с последствиями → человек слышит и меняется
          </div>
        </div>
      )}
    </Viz>
  )
}

/* STAR метод */
function STARViz() {
  const [active, setActive] = useState(null)
  const parts = [
    {
      letter: 'S', name: 'Situation', color: '#58a6ff',
      question: 'Какой был контекст?',
      bad: 'Я работал в стартапе.',
      good: 'В стартапе из 8 человек у нас не было CI/CD и деплой занимал 40 минут вручную — разработчики теряли по 2 часа в день.',
      tip: 'Дай достаточно контекста чтобы слушатель понял масштаб. 1-2 предложения.',
    },
    {
      letter: 'T', name: 'Task', color: '#d29922',
      question: 'Какая была твоя задача / цель?',
      bad: 'Мне нужно было что-то сделать с деплоем.',
      good: 'Мне поручили автоматизировать деплой так, чтобы он занимал меньше 5 минут и запускался автоматически при мердже в main.',
      tip: 'Именно твоя роль и ответственность, а не команды в целом.',
    },
    {
      letter: 'A', name: 'Action', color: '#a371f7',
      question: 'Что конкретно ты сделал?',
      bad: 'Я настроил GitHub Actions и всё заработало.',
      good: 'Я написал три pipeline: тесты, сборку Docker-образа и деплой на сервер. Изучил docker-compose, настроил кэширование слоёв, добавил уведомления в Slack при фейле.',
      tip: 'Самая важная часть. Говори «я», не «мы». Конкретные шаги и решения.',
    },
    {
      letter: 'R', name: 'Result', color: '#3fb950',
      question: 'Что получилось? Какой результат?',
      bad: 'Стало лучше, все были довольны.',
      good: 'Деплой сократился с 40 до 3 минут. Команда экономит 8 часов в неделю. Количество ошибок из-за ручного деплоя упало до нуля.',
      tip: 'Числа, конкретные улучшения, влияние на бизнес. Чем конкретнее — тем убедительнее.',
    },
  ]
  return (
    <Viz>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12, textAlign: 'center' }}>
        Нажми на букву чтобы увидеть как отвечать на каждом этапе
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        {parts.map((p, i) => (
          <button key={i} onClick={() => setActive(active === i ? null : i)} style={{
            padding: '8px 18px', fontSize: 18, fontWeight: 900, cursor: 'pointer',
            borderRadius: 9, border: `2px solid ${active === i ? p.color : 'var(--border-color)'}`,
            background: active === i ? p.color + '18' : 'var(--bg-tertiary)',
            color: active === i ? p.color : 'var(--text-tertiary)',
          }}>{p.letter}</button>
        ))}
      </div>
      {active !== null && (
        <div style={{ border: `1.5px solid ${parts[active].color}`, borderRadius: 10, padding: '14px 16px', background: parts[active].color + '06' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: parts[active].color, marginBottom: 4 }}>
            {parts[active].letter} — {parts[active].name}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 12 }}>
            Вопрос: <em>{parts[active].question}</em>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ padding: '8px 12px', borderRadius: 7, background: 'rgba(248,81,73,0.08)', border: '1px solid rgba(248,81,73,0.2)' }}>
              <div style={{ fontSize: 10, color: '#f85149', fontWeight: 700, marginBottom: 3 }}>❌ Слабый ответ</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{parts[active].bad}</div>
            </div>
            <div style={{ padding: '8px 12px', borderRadius: 7, background: 'rgba(63,185,80,0.08)', border: '1px solid rgba(63,185,80,0.2)' }}>
              <div style={{ fontSize: 10, color: '#3fb950', fontWeight: 700, marginBottom: 3 }}>✅ Сильный ответ</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', fontStyle: 'italic' }}>{parts[active].good}</div>
            </div>
            <div style={{ fontSize: 11, color: parts[active].color, borderTop: `1px dashed ${parts[active].color}30`, paddingTop: 8, marginTop: 2 }}>
              💡 {parts[active].tip}
            </div>
          </div>
        </div>
      )}
    </Viz>
  )
}

/* Fixed vs Growth mindset */
function MindsetViz() {
  const pairs = [
    { fixed: 'Я не умею это делать', growth: 'Я пока не умею — но научусь' },
    { fixed: 'Я облажался — я неудачник', growth: 'Я ошибся — что можно улучшить?' },
    { fixed: 'Критика — это атака на меня', growth: 'Критика — это информация для роста' },
    { fixed: 'Они талантливее — мне не догнать', growth: 'Они дальше на пути — что у них перенять?' },
    { fixed: 'Зачем стараться, если всё равно не получится', growth: 'Усилия — это то, как мозг становится лучше' },
    { fixed: 'Чужой успех — угроза', growth: 'Чужой успех — источник вдохновения' },
  ]
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 0, marginBottom: 8 }}>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#f85149', paddingBottom: 8, borderBottom: '2px solid #f85149' }}>Fixed mindset</div>
        <div style={{ width: 20 }} />
        <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 700, color: '#3fb950', paddingBottom: 8, borderBottom: '2px solid #3fb950' }}>Growth mindset</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 10 }}>
        {pairs.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
            <div style={{ flex: 1, padding: '7px 10px', borderRadius: 7, background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>{p.fixed}</div>
            <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-tertiary)', fontSize: 14 }}>→</div>
            <div style={{ flex: 1, padding: '7px 10px', borderRadius: 7, background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>{p.growth}</div>
          </div>
        ))}
      </div>
    </Viz>
  )
}

/* Публичное выступление — структура */
function SpeechViz() {
  const [active, setActive] = useState(0)
  const parts = [
    {
      n: 1, name: 'Крючок (Hook)', emoji: '🎣', time: '~30 сек',
      desc: 'Первые 30 секунд решают всё. Начни с неожиданного факта, вопроса к аудитории или короткой истории. Цель — захватить внимание.',
      ex: '«Знаете ли вы, что 70% IT-проектов проваливаются не из-за кода — а из-за коммуникации внутри команды?»',
    },
    {
      n: 2, name: 'Контекст', emoji: '🗺', time: '~1 мин',
      desc: 'Объясни зачем это важно и для кого. Слушатель должен понять почему ему стоит слушать дальше. Один-два тезиса.',
      ex: '«Сегодня разберём три техники, которые помогут вам доносить идеи чётче и получать лучший фидбек от коллег.»',
    },
    {
      n: 3, name: 'Основная часть', emoji: '📚', time: 'большая часть',
      desc: 'Максимум 3-5 ключевых мыслей. Каждую раскрывай по схеме: тезис → пример → вывод. Не пытайся вместить всё — лучше меньше, но запомнится.',
      ex: '1. Тезис: «Фидбек нужно делать конкретным» → 2. Пример: показать SBI → 3. Вывод: «Люди меняются когда понимают что именно»',
    },
    {
      n: 4, name: 'Призыв к действию', emoji: '🎯', time: '~30 сек',
      desc: 'Что ты хочешь чтобы люди сделали после? Конкретное действие: попробовать, задать вопрос, применить технику сегодня.',
      ex: '«Попробуй дать хотя бы один фидбек по модели SBI на этой неделе. Посмотри что изменится.»',
    },
    {
      n: 5, name: 'Финальный якорь', emoji: '⚓', time: '~20 сек',
      desc: 'Последнее запоминается лучше всего. Повтори главную мысль одним предложением или оставь финальный вопрос, который заставит думать.',
      ex: '«Помните: технические навыки открывают дверь, но soft skills определяют как далеко вы пройдёте.»',
    },
  ]
  const p = parts[active]
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginBottom: 16, flexWrap: 'wrap' }}>
        {parts.map((pt, i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding: '5px 10px', fontSize: 12, cursor: 'pointer', borderRadius: 7,
            border: `1.5px solid ${i === active ? 'var(--accent-lime)' : 'var(--border-color)'}`,
            background: i === active ? 'rgba(32,190,255,0.12)' : 'var(--bg-tertiary)',
            color: i === active ? 'var(--accent-lime)' : 'var(--text-tertiary)',
            fontWeight: i === active ? 700 : 400,
          }}>{pt.emoji} {pt.n}</button>
        ))}
      </div>
      <div style={{ border: '1.5px solid var(--accent-lime)', borderRadius: 10, padding: '14px 16px', background: 'rgba(32,190,255,0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent-lime)' }}>{p.emoji} {p.n}. {p.name}</span>
          <span style={{ fontSize: 11, color: 'var(--text-tertiary)', background: 'var(--bg-tertiary)', padding: '2px 8px', borderRadius: 5 }}>{p.time}</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 10 }}>{p.desc}</p>
        <div style={{ borderTop: '1px dashed rgba(32,190,255,0.2)', paddingTop: 10, fontSize: 12, color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
          Пример: {p.ex}
        </div>
      </div>
    </Viz>
  )
}

/* Инструменты роста */
function GrowthToolsViz() {
  const tools = [
    { icon: '📓', name: 'Brag Doc', color: '#a371f7', desc: 'Личный документ достижений. Каждую неделю записываешь что сделал: задачи, решения, влияние. Незаменим на performance review и при поиске работы.' },
    { icon: '🔁', name: '1-on-1', color: '#58a6ff', desc: 'Регулярная встреча с менеджером (обычно раз в 1-2 недели). Место для фидбека, обсуждения роста, карьерных целей. Готовь agenda заранее.' },
    { icon: '🗺', name: 'Карта навыков', color: '#d29922', desc: 'Таблица 3×3: что ты умеешь хорошо / средне / плохо. Помогает понять куда инвестировать время и о чём говорить на 1-on-1.' },
    { icon: '🪞', name: 'Ретроспектива', color: '#3fb950', desc: 'Командная встреча в конце спринта: Что шло хорошо? Что мешало? Что улучшить? Три вопроса, 30 минут — мощный инструмент непрерывного улучшения.' },
    { icon: '📚', name: 'RFC / ADR', color: 'var(--accent-lime)', desc: 'Request for Comments / Architecture Decision Record — письменное предложение изменений. Учит структурировать мышление и аргументировать решения.' },
    { icon: '🎙', name: 'Tech talks', color: '#f85149', desc: 'Внутренние доклады внутри команды о том что изучил. Лучший способ закрепить знания — объяснить другим. Публичная прокачка без стресса.' },
  ]
  return (
    <Viz>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {tools.map(t => (
          <div key={t.name} style={{ flex: '1 1 200px', minWidth: 190, padding: '12px 14px', borderRadius: 9, border: `1.5px solid ${t.color}30`, background: t.color + '07' }}>
            <div style={{ fontSize: 20, marginBottom: 5 }}>{t.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: t.color, marginBottom: 5 }}>{t.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.65 }}>{t.desc}</div>
          </div>
        ))}
      </div>
    </Viz>
  )
}

/* ══════════════════════════════════════════════
   ОСНОВНОЙ КОМПОНЕНТ
══════════════════════════════════════════════ */

export default function Day26SoftSkillsTheory() {
  return (
    <div className="theory-container">

      <section className="theory-section">
        <h1 className="theory-title">Soft skills: команда, фидбек, рост</h1>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Технические навыки открывают тебе дверь в IT. Soft skills определяют как далеко ты пройдёшь.
          Лучшие разработчики мира — не просто те, кто пишет чистый код. Это люди которые умеют
          объяснять, слушать, давать и получать обратную связь, расти сами и помогать расти другим.
        </p>
      </section>

      {/* 1. Почему soft skills = hard skills */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Почему soft skills — это hard skills</h2>
        <p>
          Слово «soft» создаёт иллюзию что это что-то второстепенное и само собой разумеющееся.
          На деле — коммуникация, умение давать фидбек, публичные выступления — это конкретные
          навыки которым нужно учиться так же осознанно, как алгоритмам и архитектуре.
        </p>
        <Quote
          text="70% IT-проектов проваливаются не из-за технических проблем, а из-за коммуникации и управления."
          author="Standish Group CHAOS Report"
        />
        <Cards>
          <Card icon="🧑‍💻" title="Junior" color="#58a6ff">
            Берут за технические навыки. Умеет писать код — этого достаточно для старта.
          </Card>
          <Card icon="🧑‍🔧" title="Middle" color="#d29922">
            Нужно уже уметь объяснять решения, давать code review, работать в команде без надзора.
          </Card>
          <Card icon="🧑‍🏫" title="Senior / Lead" color="#3fb950">
            Влияние через других людей. Умение убеждать, менторить, выступать, принимать решения с неполной информацией.
          </Card>
        </Cards>
        <Warn>Многие технически сильные разработчики застревают на Middle годами — именно из-за пробелов в коммуникации и умении преподносить себя и свои идеи.</Warn>
      </section>

      {/* 2. Команда */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Как работает команда: модель Такмана</h2>
        <p>
          Любая команда проходит через предсказуемые стадии развития.
          Психолог Брюс Такман описал их ещё в 1965 году — и его модель актуальна до сих пор.
          Понимание этих стадий помогает не паниковать когда в команде начинаются конфликты
          (это нормально) и знать что делать дальше.
        </p>
        <TuckmanViz />
        <Warn>Команда может откатиться на предыдущую стадию при появлении новых членов, смене лидера или резком изменении задач — и это тоже нормально.</Warn>
      </section>

      {/* 3. Психологическая безопасность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Психологическая безопасность</h2>
        <p>
          Google провёл исследование Project Aristotle — изучили 180 команд чтобы найти
          что делает команду эффективной. Главный фактор оказался неожиданным: не состав команды,
          не опыт людей, не процессы. А <strong>психологическая безопасность</strong>.
        </p>
        <Quote
          text="Психологическая безопасность — это когда люди не боятся говорить, задавать 'глупые' вопросы, предлагать необычные идеи или признавать ошибки."
          author="Amy Edmondson, Harvard Business School"
        />
        <p>
          В психологически небезопасной команде люди молчат о проблемах, боятся задавать вопросы,
          скрывают ошибки — и именно это приводит к провалам проектов.
        </p>
        <Cards>
          <Card icon="🙋" title="Задавай вопросы" color="#58a6ff">
            «Глупых» вопросов не существует. Если ты не понимаешь — скорее всего ещё кто-то тоже не понимает, но молчит.
          </Card>
          <Card icon="🐛" title="Признавай ошибки" color="#d29922">
            «Я облажался — вот что пошло не так и что я сделаю чтобы не повторилось» — это признак зрелости, не слабости.
          </Card>
          <Card icon="💡" title="Предлагай идеи" color="#a371f7">
            Даже если идея кажется странной — скажи. Инновации рождаются из смелости озвучить нестандартную мысль.
          </Card>
          <Card icon="🗣" title="Давай фидбек" color="#3fb950">
            Молчать о проблеме — значит позволять ей расти. Конструктивная критика = уважение к коллеге.
          </Card>
        </Cards>
      </section>

      {/* 4. Коммуникация */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Коммуникация в команде</h2>
        <p>
          IT-команды общаются по-разному в зависимости от срочности и сложности.
          Понимание когда использовать синхронную, а когда асинхронную коммуникацию — ключевой навык,
          особенно в распределённых командах и remote-работе.
        </p>
        <CommViz />
        <Good>Правило: чем сложнее и эмоциональнее тема — тем ближе к синхронному каналу. Конфликт, критику, увольнение — только вживую или по видео, никогда в текстовом чате.</Good>
        <Good>Письменная коммуникация — сначала думай, потом пиши. Один чёткий вопрос лучше, чем «эй, есть минута?»</Good>
        <p style={{ marginTop: 14 }}><strong>Как писать понятно:</strong></p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0' }}>
          {[
            { bad: 'Привет, у меня вопрос', good: 'Привет! Вопрос по архитектуре auth-сервиса: мы используем JWT или сессии? Смотрю PR #142 и не понимаю почему здесь sessions.', label: 'Конкретность' },
            { bad: 'Это не работает, помоги', good: 'Получаю 401 на GET /api/users. Токен в заголовке есть (скриншот). Пробовал переавторизоваться — та же ошибка.', label: 'Контекст и что уже пробовал' },
            { bad: 'Мне не нравится твоё решение', good: 'Вижу что здесь O(n²) из-за вложенного цикла. При 10к+ записей это может быть медленно. Что думаешь о HashMap подходе?', label: 'Аргументация, не оценка' },
          ].map(({ bad, good, label }) => (
            <div key={label} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 180, padding: '8px 12px', borderRadius: 7, background: 'rgba(248,81,73,0.06)', border: '1px solid rgba(248,81,73,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: 10, color: '#f85149', fontWeight: 700, marginBottom: 3 }}>❌</div>{bad}
              </div>
              <div style={{ flex: 1.5, minWidth: 200, padding: '8px 12px', borderRadius: 7, background: 'rgba(63,185,80,0.06)', border: '1px solid rgba(63,185,80,0.15)', fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ fontSize: 10, color: '#3fb950', fontWeight: 700, marginBottom: 3 }}>✅ {label}</div>{good}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Фидбек */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Как давать и получать фидбек</h2>
        <p>
          Фидбек — один из главных инструментов роста. Но плохо поданная критика закрывает человека,
          а не открывает. Модель <strong>SBI (Situation — Behavior — Impact)</strong> помогает
          давать конкретную, неличную и действенную обратную связь.
        </p>
        <FeedbackViz />
        <p style={{ marginTop: 14 }}><strong>Как получать фидбек:</strong></p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '10px 0' }}>
          <Step n="1" title="Слушай, не защищайся">
            Первый импульс — объяснить почему ты был прав. Подавляй его. Сначала просто услышь что говорят.
          </Step>
          <Step n="2" title="Уточняй">
            «Можешь привести конкретный пример?» «Что именно ты бы сделал иначе?» Конкретика помогает понять суть.
          </Step>
          <Step n="3" title="Скажи спасибо">
            Даже если фидбек был неудобным. Человек потратил энергию чтобы тебе помочь — это ценно.
          </Step>
          <Step n="4" title="Обдумай отдельно">
            Не нужно сразу соглашаться или не соглашаться. «Мне нужно подумать» — нормальный ответ.
          </Step>
        </div>
        <Warn>Регулярно проси фидбек сам, не жди когда дадут: «Что я мог бы сделать лучше в этом проекте?» — один вопрос раз в месяц меняет многое.</Warn>
      </section>

      {/* 6. Code review */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Code review как инструмент коммуникации</h2>
        <p>
          Code review — это не контроль качества. Это коммуникация.
          Цель: поделиться знаниями, поймать проблемы до прода и помочь коллеге стать лучше.
          Плохой ревью разрушает доверие в команде.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '14px 0' }}>
          {[
            { bad: '❌ Зачем ты написал это так??', good: '💬 Здесь можно использовать map() вместо цикла — будет короче. Что думаешь?', type: 'Вопрос вместо приговора' },
            { bad: '❌ Это неправильно.', good: '💬 Если передать null — упадёт здесь. Предлагаю добавить guard clause в начале функции.', type: 'Конкретная проблема + решение' },
            { bad: '❌ Стиль кода ужасный', good: '💬 Отлично реализованный алгоритм! Одно предложение по именованию: result лучше назвать filteredUsers — сразу понятно что внутри.', type: 'Сначала хорошее, потом улучшение' },
            { bad: '❌ (молчание на 5 дней)', good: '💬 Ревью займёт у меня до пятницы, не блокируйся — можешь начать следующую задачу.', type: 'Коммуникация о сроках' },
          ].map(({ bad, good, type }) => (
            <div key={type} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent-lime)', marginBottom: 6 }}>{type}</div>
              <div style={{ fontSize: 12, color: '#f85149', marginBottom: 4, fontFamily: 'monospace' }}>{bad}</div>
              <div style={{ fontSize: 12, color: '#3fb950', fontFamily: 'monospace' }}>{good}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Публичные выступления */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Публичные выступления и презентации</h2>
        <p>
          Страх публичных выступлений — один из самых распространённых. Но хорошая новость:
          это навык, а не врождённое качество. Структура помогает справиться и с тревогой,
          и с содержанием одновременно.
        </p>
        <SpeechViz />
        <p style={{ marginTop: 14 }}><strong>Техники для работы с волнением:</strong></p>
        <Cards>
          <Card icon="🌬" title="Дыхание" color="#58a6ff">
            4-7-8: вдох 4 сек, задержка 7, выдох 8. Снижает уровень кортизола за 2 минуты.
          </Card>
          <Card icon="🎯" title="Рефрейминг" color="#a371f7">
            «Я волнуюсь» → «Я воодушевлён». Физиологически одно и то же, но работает по-разному.
          </Card>
          <Card icon="🗣" title="Репетиция вслух" color="#3fb950">
            Прочитать про себя и сказать вслух — два разных опыта. Репетируй именно вслух, хотя бы один раз.
          </Card>
          <Card icon="👁" title="Взгляд" color="#d29922">
            Находи 2-3 дружелюбных лица в зале и переключайся между ними. Это создаёт ощущение разговора, а не монолога.
          </Card>
        </Cards>
        <Good>Пауза — это сила. Большинство начинающих спикеров боятся тишины и говорят «эм», «ну», «как бы». Пауза воспринимается как уверенность.</Good>
      </section>

      {/* 8. STAR */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. STAR: как рассказывать о своём опыте</h2>
        <p>
          STAR — универсальный фреймворк для рассказа об опыте: на собеседовании, в презентации,
          в разговоре с менеджером. Делает любую историю структурированной, конкретной и убедительной.
          Это метод используют Google, Amazon и большинство крупных компаний при интервью.
        </p>
        <STARViz />
        <Good>Готовь 5-7 STAR-историй заранее. Они должны покрывать: технический успех, провал и что ты из него вынес, конфликт в команде, инициативу которую ты взял сам, момент когда научил кого-то.</Good>
        <Warn>На собеседовании вопросы типа «Расскажи о ситуации когда...» — всегда STAR. Без структуры ответы превращаются в поток сознания.</Warn>
      </section>

      {/* 9. Growth mindset */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Growth Mindset — установка на рост</h2>
        <p>
          Психолог Кэрол Двек выделила два типа мышления. <strong>Fixed mindset</strong>:
          способности даны от природы, ошибки = провал, критика = атака.
          <strong> Growth mindset</strong>: способности развиваются, ошибки = данные для улучшения,
          критика = ценная информация. IT-среда меняется так быстро, что без growth mindset
          — выгораешь или устареваешь.
        </p>
        <MindsetViz />
        <Quote
          text="Не важно насколько ты умён сейчас. Важно как быстро ты учишься."
          author="Carol Dweck"
        />
      </section>

      {/* 10. Карьерный рост */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Инструменты карьерного роста</h2>
        <p>
          Рост не происходит сам по себе — его нужно строить осознанно.
          Вот конкретные инструменты которые используют сильные IT-специалисты:
        </p>
        <GrowthToolsViz />
        <p style={{ marginTop: 14 }}><strong>Принцип 70-20-10:</strong></p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', margin: '10px 0' }}>
          {[
            { pct: '70%', text: 'Учишься через практику — реальные задачи на работе', color: 'var(--accent-lime)' },
            { pct: '20%', text: 'Учишься от других — менторы, ревью, наблюдение', color: '#58a6ff' },
            { pct: '10%', text: 'Формальное обучение — курсы, книги, конференции', color: '#d29922' },
          ].map(({ pct, text, color }) => (
            <div key={pct} style={{ flex: 1, minWidth: 160, padding: '12px 14px', borderRadius: 9, border: `1.5px solid ${color}30`, background: color + '08', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color, marginBottom: 6 }}>{pct}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</div>
            </div>
          ))}
        </div>
        <Good>Один из самых быстрых способов вырасти — менторить кого-то менее опытного. Объясняя другим, ты сам начинаешь понимать глубже.</Good>
      </section>

      {/* 11. Конфликты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Конфликты в команде</h2>
        <p>
          Конфликт — не признак плохой команды. Это признак того, что люди достаточно
          доверяют друг другу чтобы не молчать. Важно как ты его разрешаешь.
        </p>
        <TheoryTable
          headers={['Подход', 'Когда работает', 'Когда не работает']}
          rows={[
            ['Избегание', 'Когда вопрос незначителен', 'Когда проблема накапливается — взрывается позже'],
            ['Уступка', 'Когда тебе важнее отношения чем позиция', 'Когда твои интересы систематически игнорируются'],
            ['Соперничество', 'В кризисе с чёткими ставками', 'В долгосрочных отношениях — разрушает доверие'],
            ['Компромисс', 'Когда нужно быстрое решение', 'Когда оба жертвуют слишком многим'],
            ['Сотрудничество', 'Когда есть время и обе стороны хотят найти лучшее решение', 'В острой фазе конфликта без охлаждения'],
          ]}
        />
        <Step n="1" title="Разделяй позиции и интересы">
          Позиция: «Я хочу использовать PostgreSQL». Интерес: «Мне важна надёжность и поддержка транзакций». Ищи решение для интереса — не для позиции.
        </Step>
        <Step n="2" title="Атакуй проблему, не человека">
          «Я думаю что это решение создаст проблемы с масштабированием» вместо «Ты предлагаешь ерунду».
        </Step>
        <Step n="3" title="Используй «я-высказывания»">
          «Я чувствую себя проигнорированным когда мои предложения не обсуждаются» вместо «Ты всегда меня игнорируешь».
        </Step>
        <Warn>Правило 24 часов: если что-то вывело из себя — подожди сутки перед ответом. Большинство острых сообщений которые ты так и не отправил — это мудрость.</Warn>
      </section>

      {/* 12. Итог */}
      <section className="theory-section">
        <h2 className="theory-heading-2">С чего начать прямо сейчас</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '14px 0' }}>
          {[
            { icon: '📓', action: 'Заведи Brag Doc', desc: 'Google Docs / Notion. Раз в неделю — одна запись о том что сделал и какой был результат.' },
            { icon: '🎯', action: 'Подготовь 3 STAR-истории', desc: 'Технический успех, ошибка и вывод, инициатива которую взял сам.' },
            { icon: '💬', action: 'Дай один SBI-фидбек', desc: 'Найди что-то конкретное за эту неделю. Ситуация → Поведение → Влияние.' },
            { icon: '🙋', action: 'Задай «глупый» вопрос', desc: 'То что кажется очевидным другим — скорее всего неочевидно и им тоже. Спроси.' },
            { icon: '📢', action: 'Расскажи о чём-то на следующем митинге', desc: 'Статья, паттерн, инструмент — 3 минуты. Первый шаг к публичным выступлениям.' },
          ].map(({ icon, action, desc }) => (
            <div key={action} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 9, border: '1.5px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-lime)', marginBottom: 3 }}>{action}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Технические навыки открывают дверь. Soft skills определяют как далеко ты пройдёшь.</p>
      </section>

    </div>
  )
}
