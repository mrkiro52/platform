import { TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day13ProjectTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 13</h1>
        <p className="theory-subtitle">Практический проект: визуализация структур данных и алгоритмов</p>
        <p className="theory-date">13 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">📋 Дедлайны и правила</h2>
        <div style={{ backgroundColor: 'rgba(32,190,255,0.05)', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          <p style={{ margin: '0 0 12px 0', fontWeight: 600 }}>⏰ Когда можешь сдать:</p>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li>✅ Суббота, 13 июня в 21:00</li>
            <li>✅ Или в любой день в 21:00 в начале лекции</li>
          </ul>
          <p style={{ margin: '0 0 12px 0', fontWeight: 600 }}>🎤 Выступление:</p>
          <ul style={{ margin: '0 0 12px 0', paddingLeft: '20px' }}>
            <li>Время на выступление: 5 минут</li>
            <li>Показать что реализовал (демонстрация программы)</li>
            <li>Рассказать какое задание было</li>
            <li>Объяснить что получилось</li>
            <li>Рассказать какие трудности были</li>
          </ul>
          <p style={{ margin: '0', color: 'var(--text-secondary)', fontSize: '13px' }}>Дедлайна нет! Можешь сдать когда готово. Главное - показать свою работу и рассказать как её делал.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">🎯 Тебе мог попасться один из 10 вариантов</h2>
        <p className="theory-intro" style={{ marginBottom: '24px' }}>
          Получи вариант в лс в телеграме и реализуй его. Используй Python или другой язык программирования. Допускается использование AI (Copilot, Claude, ChatGPT) для помощи. Код загрузи в GitHub репозиторий.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Вариант 1 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 1: Поиск середины списка (slow/fast pointers)</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм поиска середины односвязного списка с помощью указателей slow и fast</li>
              <li>Программа должна пошагово показывать перемещение указателей по списку</li>
              <li>Графический вывод: консоль с анимацией или выводом каждого шага по нажатию Enter</li>
              <li>Необходимо реализовать создание списка и визуализацию позиций указателей</li>
            </ul>
          </div>

          {/* Вариант 2 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 2: Проверка скобочной последовательности</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм проверки правильности скобочной последовательности с использованием стека</li>
              <li>Визуально показывать содержимое стека после каждой операции push/pop</li>
              <li>Графический вывод: браузер (HTML/CSS/JS) или консоль</li>
              <li>Отображать текущий символ строки и текущее состояние стека на каждом шаге</li>
            </ul>
          </div>

          {/* Вариант 3 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 3: Обход графа в ширину (BFS)</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм обхода графа в ширину (BFS) с использованием очереди</li>
              <li>Пошагово показывать добавление и удаление вершин из очереди</li>
              <li>Графический вывод: браузер с визуализацией графа или библиотека графики</li>
              <li>На каждом шаге подсвечивать текущую вершину и содержимое очереди</li>
            </ul>
          </div>

          {/* Вариант 4 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 4: Обход графа в глубину (DFS)</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм обхода графа в глубину (DFS) со стеком или рекурсией</li>
              <li>Визуально показывать порядок посещения вершин графа</li>
              <li>Графический вывод: браузер или библиотека для графики</li>
              <li>На каждом этапе отображать текущую вершину и уже посещённые вершины</li>
            </ul>
          </div>

          {/* Вариант 5 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 5: Двусвязный список</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать двусвязный список с операциями вставки и удаления элементов</li>
              <li>Пошагово показывать изменение связей между узлами списка</li>
              <li>Графический вывод: консоль или библиотека графики</li>
              <li>Отображать указатели prev и next для каждого элемента списка</li>
            </ul>
          </div>

          {/* Вариант 6 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 6: Удаление дубликатов из списка</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм удаления дубликатов из односвязного списка</li>
              <li>Пошагово показывать обход списка и удаление повторяющихся элементов</li>
              <li>Графический вывод: консоль, браузер или библиотека графики</li>
              <li>На каждом шаге отображать текущий узел, проверяемое значение и итоговое состояние списка</li>
              <li>Можно реализовать управление шагами через кнопки вперед/назад или автоматический показ через таймер</li>
            </ul>
          </div>

          {/* Вариант 7 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 7: Хэш-таблица с разрешением коллизий</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать хэш-таблицу с разрешением коллизий методом цепочек или линейного пробирования</li>
              <li>Пошагово показывать процесс вставки, поиска и обработки коллизий</li>
              <li>Графический вывод: браузер или библиотека графики</li>
              <li>На каждом шаге отображать индекс хэш-таблицы и действия алгоритма</li>
            </ul>
          </div>

          {/* Вариант 8 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 8: Бинарное дерево поиска (BST)</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать бинарное дерево поиска (BST) с операциями вставки и поиска элементов</li>
              <li>Визуально показывать прохождение по дереву на каждом шаге алгоритма</li>
              <li>Графический вывод: библиотека графики или браузер</li>
              <li>Отображать текущий узел и направление перехода по дереву</li>
            </ul>
          </div>

          {/* Вариант 9 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 9: Разворот односвязного списка</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм разворота односвязного списка</li>
              <li>Пошагово показывать изменение ссылок между элементами списка</li>
              <li>Графический вывод: консоль с задержкой по времени или браузер</li>
              <li>На каждом шаге отображать текущий элемент, previous и next</li>
            </ul>
          </div>

          {/* Вариант 10 */}
          <div style={{ padding: '16px', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Вариант 10: Алгоритм Дейкстры (кратчайший путь)</h3>
            <ul style={{ margin: '0', paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              <li>Реализовать алгоритм поиска кратчайшего пути в графе (алгоритм Дейкстры)</li>
              <li>Пошагово показывать обновление расстояний до вершин и выбор текущей вершины</li>
              <li>Графический вывод: браузер или библиотека графики</li>
              <li>Отображать таблицу расстояний и подсветку текущих рёбер графа</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
