import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day15TimeManagementTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 15</h1>
        <p className="theory-subtitle">Тайм и таск-менеджмент</p>
        <p className="theory-date">15 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Техника Pomodoro</h2>
        <p className="theory-intro">
          Простая техника управления временем: работаешь 25 минут, отдыхаешь 5 минут. Повторяешь, потом длинный перерыв.
        </p>

        <TheoryExample title="Цикл Pomodoro">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li><strong>25 мин:</strong> Работаешь (без отвлечений!)</li>
            <li><strong>5 мин:</strong> Отдыхаешь</li>
            <li><strong>25 мин:</strong> Работаешь</li>
            <li><strong>5 мин:</strong> Отдыхаешь</li>
            <li><strong>25 мин:</strong> Работаешь</li>
            <li><strong>5 мин:</strong> Отдыхаешь</li>
            <li><strong>25 мин:</strong> Работаешь</li>
            <li><strong>30 мин:</strong> Длинный перерыв, потом начинаешь заново</li>
          </ol>
        </TheoryExample>

        <ul className="theory-list">
          <li className="theory-list-item">✅ Помогает сосредоточиться</li>
          <li className="theory-list-item">✅ Защита от перегорания (регулярные паузы)</li>
          <li className="theory-list-item">✅ Можно адаптировать (20/10, 50/10)</li>
          <li className="theory-list-item">❌ Может не подходить для больших задач</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GTD (Getting Things Done)</h2>
        <p className="theory-intro">
          Методология управления задачами от David Allen. Главное: выгрузи свой мозг, чтобы он думал о стратегии, а не о том, что не забыть.
        </p>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">5 этапов GTD</h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li><strong>Capture:</strong> Запиши все задачи (inbox)</li>
            <li><strong>Clarify:</strong> Разберись в каждой задаче (actionable?)</li>
            <li><strong>Organize:</strong> Рассортируй по категориям (сроки, проекты)</li>
            <li><strong>Reflect:</strong> Регулярный обзор (еженедельно)</li>
            <li><strong>Engage:</strong> Выполняй задачи</li>
          </ol>
        </div>

        <TheoryTable
          headers={['Категория', 'Пример', 'Когда начинать']}
          rows={[
            ['Входящие', 'Новая идея, письмо', 'Разобраться позже'],
            ['Проекты', 'Написать курс', 'Сложная многошаговая задача'],
            ['Следующие действия', 'Купить молоко', 'В течение дня'],
            ['Ожидание', 'Ответ от друга', 'Зависит от других'],
            ['Когда-нибудь', 'Выучить испанский', 'Когда будет время'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Канбан для визуализации</h2>
        <p className="theory-intro">
          Доска с колонками: To Do → In Progress → Done. Видишь что делается в реальном времени.
        </p>

        <TheoryExample title="Пример Канбана">
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}><strong>To Do</strong></td>
              <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}><strong>In Progress</strong></td>
              <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-secondary)' }}><strong>Done</strong></td>
            </tr>
            <tr>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>
                <div style={{ background: 'var(--bg-secondary)', padding: '8px', borderRadius: '4px', marginBottom: '8px', fontSize: '12px' }}>📝 Написать функцию</div>
                <div style={{ background: 'var(--bg-secondary)', padding: '8px', borderRadius: '4px', fontSize: '12px' }}>🧪 Тесты</div>
              </td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>
                <div style={{ background: 'rgba(200,255,0,0.15)', padding: '8px', borderRadius: '4px', fontSize: '12px' }}>🔍 Код-ревью</div>
              </td>
              <td style={{ padding: '12px', verticalAlign: 'top' }}>
                <div style={{ background: 'rgba(100,200,100,0.15)', padding: '8px', borderRadius: '4px', fontSize: '12px' }}>✅ Задача 1</div>
              </td>
            </tr>
          </table>
        </TheoryExample>

        <ul className="theory-list">
          <li className="theory-list-item"><strong>WIP лимит:</strong> Максимум 3 задачи "In Progress" (чтобы не прерываться)</li>
          <li className="theory-list-item"><strong>Движение слева направо:</strong> Задача должна всегда двигаться вперёд</li>
          <li className="theory-list-item"><strong>Bottleneck:</strong> Если одна колонка полная — есть блокер</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Приоритизация: матрица Eisenhower</h2>
        <p className="theory-intro">
          Матрица 2x2: важность vs срочность. Помогает решить что делать первым.
        </p>

        <TheoryTable
          headers={['', 'Срочное', 'Не срочное']}
          rows={[
            ['Важное', 'Делай СЕЙЧАС (дедлайны, кризис)', 'Планируй (учёба, развитие)'],
            ['Не важное', 'Делегируй или откажись', 'Исключи (соцсети, лень)'],
          ]}
        />

        <TheoryExample title="Примеры">
          <ul>
            <li><strong>Важно + Срочно:</strong> Исправить баг в продакшене</li>
            <li><strong>Важно + Не срочно:</strong> Учиться новым технологиям</li>
            <li><strong>Не важно + Срочно:</strong> Срочное письмо, которое кто-то отправил</li>
            <li><strong>Не важно + Не срочно:</strong> Прокрастинация в соцсетях</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Инструменты для управления задачами</h2>
        <TheoryTable
          headers={['Инструмент', 'Для чего', 'Бесплатно?']}
          rows={[
            ['Notion', 'База знаний + GTD + Канбан', 'Да (базовый)'],
            ['Todoist', 'Список задач + GTD', 'Да (базовый)'],
            ['Trello', 'Канбан доска', 'Да (базовый)'],
            ['GitHub Issues', 'Для проектов (разработка)', 'Да'],
            ['Google Tasks', 'Простой список', 'Да'],
            ['Obsidian', 'Конспекты + PKM', 'Да'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Советы для разработчиков</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Не прерывайся! Переключение контекста стоит 15-20 минут</li>
          <li className="theory-list-item">Утро для сложного, вечер для простого (энергия выше)</li>
          <li className="theory-list-item">Закрывай tab с соцсетями и мессенджерами</li>
          <li className="theory-list-item">Отслеживай сколько времени тратишь на разные задачи</li>
          <li className="theory-list-item">Планируй неделю в понедельник, день в утро</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Время — самый ценный ресурс. Управляй им мудро! ⏰</p>
      </section>
    </div>
  )
}
