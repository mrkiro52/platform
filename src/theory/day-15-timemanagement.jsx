import { TheoryTable, TheoryExample } from './components/TheoryTable'

export default function Day15TimeManagementTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 15</h1>
        <p className="theory-subtitle">Тайм- и таск-менеджмент</p>
        <p className="theory-date">15 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что такое таск-менеджмент и зачем он нужен</h2>
        <p className="theory-intro">
          Таск-менеджмент — это система организации и управления задачами, которая помогает человеку или команде достигать целей без потери фокуса. В мире, где количество задач постоянно растёт, умение управлять временем становится ключевым профессиональным навыком.
        </p>
        <div className="theory-subsection">
          <h3 className="theory-heading-3">Проблемы без системы управления задачами</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Задачи теряются или забываются</li>
            <li className="theory-list-item">Непонятно, что делать в первую очередь</li>
            <li className="theory-list-item">Ощущение постоянной перегруженности</li>
            <li className="theory-list-item">Сложно оценить реальный прогресс по проектам</li>
            <li className="theory-list-item">Прокрастинация и откладывание важных дел</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Метод GTD (Getting Things Done)</h2>
        <p className="theory-intro">
          GTD — система управления задачами Дэвида Аллена. Её суть: освободить голову от хранения задач и доверить их надёжной внешней системе. Мозг плохо хранит, но отлично обрабатывает.
        </p>

        {/* Иллюстрация: 5 шагов GTD как поток-схема */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '20px 0' }}>
          {[
            { n: '1', t: 'Сбор', en: 'Capture', d: 'Записывай всё во «входящий ящик» (Inbox). Не держи ничего в голове.' },
            { n: '2', t: 'Обработка', en: 'Clarify', d: 'Требует ли элемент действия? Если да — определи конкретный следующий шаг.' },
            { n: '3', t: 'Организация', en: 'Organize', d: 'Распредели по категориям: действия, проекты, ожидания, календарь.' },
            { n: '4', t: 'Обзор', en: 'Reflect', d: 'Еженедельно просматривай все списки и обновляй систему.' },
            { n: '5', t: 'Выполнение', en: 'Engage', d: 'Выбирай задачу по контексту, времени, энергии и приоритету.' },
          ].map((s, i) => (
            <div key={i} style={{ flex: '1 1 150px', minWidth: '150px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--accent-lime)', color: '#0a0a14', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>{s.n}</div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '14px' }}>{s.t}</div>
              <div style={{ fontSize: '11px', color: 'var(--accent-lime)', marginBottom: '6px' }}>{s.en}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{s.d}</div>
            </div>
          ))}
        </div>

        <TheoryExample title="Ключевое правило GTD (правило 2 минут)">
          <p>Если задача занимает менее 2 минут — сделай её немедленно, не откладывая в систему.</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Техники управления временем</h2>
        <p className="theory-intro">
          Универсального метода нет — разные подходы подходят разным людям. Попробуй каждый и найди свой.
        </p>

        {/* Иллюстрация Pomodoro: визуальная шкала цикла */}
        <div className="theory-subsection">
          <h3 className="theory-heading-3">🍅 Техника Pomodoro</h3>
          <p className="theory-text" style={{ marginBottom: '12px' }}>
            Работай 25 минут без прерываний (один «помидор»), затем 5 минут отдыха. После четырёх «помидоров» — длинный перерыв 15–30 минут.
          </p>
          <p className="theory-text" style={{ marginBottom: '12px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
            Используй таймер: <a href="https://www.forestapp.cc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Forest</a>, <a href="https://www.befocused.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Be Focused</a> или <a href="https://pomofocus.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Pomofocus.io</a>
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center', margin: '12px 0' }}>
            {[
              { l: '25 мин', w: 'работа' }, { l: '5', w: 'отдых' },
              { l: '25 мин', w: 'работа' }, { l: '5', w: 'отдых' },
              { l: '25 мин', w: 'работа' }, { l: '5', w: 'отдых' },
              { l: '25 мин', w: 'работа' }, { l: '15-30', w: 'длинный отдых' },
            ].map((b, i) => (
              <div key={i} style={{
                flex: b.w === 'работа' ? '1 1 70px' : '0 1 50px',
                minWidth: b.w === 'работа' ? '70px' : '44px',
                background: b.w === 'работа' ? 'rgba(200,255,0,0.15)' : (b.w === 'длинный отдых' ? 'rgba(110,181,255,0.18)' : 'var(--bg-secondary)'),
                border: '1px solid var(--border-color)',
                borderRadius: '6px', padding: '8px 6px', textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{b.l}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>{b.w}</div>
              </div>
            ))}
          </div>
          <p className="theory-text"><strong>Для кого:</strong> тем, кого легко отвлечь, и тем, кто работает без пауз. Хорошо для монотонных задач — кодирование, тексты, учёба.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🐸 Метод «Съешь лягушку»</h3>
          <p className="theory-text">«Лягушка» — самая неприятная задача дня. Выполняй её первой, пока энергия максимальна. Остаток дня ощущается легче. <strong>Для кого:</strong> тем, кто откладывает неприятное на конец дня.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🐘 Метод «Съешь слона по частям»</h3>
          <p className="theory-text">Большую задачу разбей на маленькие шаги. «Написать диплом» — это проект, а «написать введение (1500 слов)» — задача. <strong>Для кого:</strong> тем, кто чувствует паралич перед крупными проектами.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🗓 Метод «Временные блоки» (Time Blocking)</h3>
          <p className="theory-text">Заранее выделяй в календаре блоки под типы задач. Например: 9:00–11:00 — глубокая работа, 11:00–12:00 — встречи, после обеда — рутина. <strong>Для кого:</strong> тем, кто не чувствует контроля над днём.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">1️⃣3️⃣5️⃣ Метод «1-3-5»</h3>
          <p className="theory-text">Каждый день планируй: 1 большую задачу, 3 средних и 5 маленьких. Реалистичный план, который не позволяет перегрузить список.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Личный Канбан</h2>
        <p className="theory-intro">
          Визуальная доска с тремя колонками. Задачи перемещаются слева направо. Ключевое правило: ограничивай количество задач «В процессе» (обычно не более 3) — это борьба с многозадачностью.
        </p>

        {/* Иллюстрация: доска Канбан */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', margin: '20px 0' }}>
          {[
            { title: 'Нужно сделать', color: 'var(--text-tertiary)', cards: ['📝 Написать функцию', '🧪 Добавить тесты', '📚 Прочитать главу'] },
            { title: 'В процессе', color: 'var(--accent-lime)', limit: 'WIP ≤ 3', cards: ['🔍 Код-ревью PR', '🐛 Чинить баг'] },
            { title: 'Готово', color: '#64c864', cards: ['✅ Настроить Git', '✅ Залить проект'] },
          ].map((col, i) => (
            <div key={i} style={{ flex: '1 1 200px', minWidth: '180px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', paddingBottom: '8px', borderBottom: `2px solid ${col.color}` }}>
                <span style={{ fontWeight: 700, color: col.color, fontSize: '13px' }}>{col.title}</span>
                {col.limit && <span style={{ fontSize: '10px', color: 'var(--accent-lime)', border: '1px solid var(--accent-lime)', borderRadius: '4px', padding: '1px 5px' }}>{col.limit}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {col.cards.map((c, j) => (
                  <div key={j} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>{c}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Приоритизация: матрица Эйзенхауэра</h2>
        <p className="theory-intro">
          Делит все задачи на 4 квадранта по двум осям: важность и срочность.
        </p>

        {/* Иллюстрация: матрица Эйзенхауэра 2x2 */}
        <div style={{ margin: '20px 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '8px', alignItems: 'stretch' }}>
            <div></div>
            <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '12px', padding: '4px' }}>СРОЧНО</div>
            <div style={{ textAlign: 'center', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '12px', padding: '4px' }}>НЕ СРОЧНО</div>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '12px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', justifyContent: 'center' }}>ВАЖНО</div>
            <div style={{ background: 'rgba(255,95,95,0.15)', border: '1px solid rgba(255,95,95,0.4)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontWeight: 700, color: '#ff5f5f', fontSize: '13px', marginBottom: '4px' }}>Квадрант 1 · Делать</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Кризисы, дедлайны, аварии. Чинить баг в продакшене.</div>
            </div>
            <div style={{ background: 'rgba(110,181,255,0.15)', border: '1px solid rgba(110,181,255,0.4)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontWeight: 700, color: '#6eb5ff', fontSize: '13px', marginBottom: '4px' }}>Квадрант 2 · Планировать</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Развитие, обучение, здоровье. Самый ценный квадрант!</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '12px', writingMode: 'vertical-rl', transform: 'rotate(180deg)', justifyContent: 'center' }}>НЕ ВАЖНО</div>
            <div style={{ background: 'rgba(255,159,80,0.15)', border: '1px solid rgba(255,159,80,0.4)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontWeight: 700, color: '#ff9f50', fontSize: '13px', marginBottom: '4px' }}>Квадрант 3 · Делегировать</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Чужие просьбы, часть встреч. Иллюзия занятости.</div>
            </div>
            <div style={{ background: 'rgba(138,138,154,0.12)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '14px' }}>
              <div style={{ fontWeight: 700, color: 'var(--text-tertiary)', fontSize: '13px', marginBottom: '4px' }}>Квадрант 4 · Исключить</div>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Соцсети, лишние встречи. Сокращай до минимума.</div>
            </div>
          </div>
          <p className="theory-text" style={{ marginTop: '12px' }}>
            <strong>Главная мысль:</strong> большинство живёт в квадрантах 1 и 3. Перенеси фокус в квадрант 2 — и кризисов станет меньше.
          </p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Другие методы приоритизации</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Метод MoSCoW</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>Must Have</strong> — обязательно (без этого проект не работает)</li>
            <li className="theory-list-item"><strong>Should Have</strong> — важно, но не критично сейчас</li>
            <li className="theory-list-item"><strong>Could Have</strong> — хорошо бы при наличии времени</li>
            <li className="theory-list-item"><strong>Won't Have</strong> — не делаем сейчас, возможно потом</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Метод ABC</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><strong>A</strong> — серьёзные последствия за невыполнение (делай первыми)</li>
            <li className="theory-list-item"><strong>B</strong> — умеренные последствия</li>
            <li className="theory-list-item"><strong>C</strong> — без последствий</li>
          </ul>
          <p className="theory-text">Никогда не берись за B, если не сделаны все A.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Правило 80/20 (Принцип Парето)</h3>
          <p className="theory-text">20% усилий дают 80% результата. Найди те 20% задач, которые приносят наибольший вклад, и фокусируйся на них. Делать не меньше — делать умнее.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Инструменты и приложения</h2>
        <p className="theory-intro">
          Инструмент — это не система. Сначала выбери подход (GTD, канбан, Pomodoro), потом подбери инструмент под него.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🍅 Pomodoro-приложения</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://www.forestapp.cc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Forest</a> — вырастить виртуальный лес во время работы</li>
            <li className="theory-list-item"><a href="https://www.befocused.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Be Focused</a> — простой Pomodoro-таймер для всех устройств</li>
            <li className="theory-list-item"><a href="https://pomofocus.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Pomofocus.io</a> — веб-таймер Pomodoro (бесплатно)</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">📋 Таск-менеджеры и доски</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://trello.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Trello</a> — визуальные доски, канбан для личного и командного использования</li>
            <li className="theory-list-item"><a href="https://notion.so" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Notion</a> — всё в одном (задачи, заметки, БД, документы)</li>
            <li className="theory-list-item"><a href="https://www.atlassian.com/software/jira" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Jira</a> — Agile, спринты, баг-трекинг для IT-команд</li>
            <li className="theory-list-item"><a href="https://linear.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Linear</a> — быстрый трекер задач для стартапов</li>
            <li className="theory-list-item"><a href="https://todoist.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Todoist</a> — простой GTD-таск-менеджер</li>
            <li className="theory-list-item"><a href="https://www.ticktick.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>TickTick</a> — задачи + привычки + встроенный Pomodoro</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🧠 Управление знаниями и заметки</h3>
          <ul className="theory-list">
            <li className="theory-list-item"><a href="https://obsidian.md" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Obsidian</a> — система личных заметок на основе Markdown (локально на диске)</li>
            <li className="theory-list-item"><a href="https://google.com/tasks" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Google Tasks</a> — простой список задач, интегрирован с Google Calendar и Gmail</li>
            <li className="theory-list-item"><a href="https://calendar.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-lime)' }}>Google Calendar</a> — календарь для time blocking и планирования дней</li>
          </ul>
        </div>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Инструмент следует за системой, а не наоборот. Регулярный обзор — ключ к любой системе. Время — самый ценный ресурс! ⏰</p>
      </section>
    </div>
  )
}
