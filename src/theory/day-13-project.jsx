import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function Day13ProjectTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 13</h1>
        <p className="theory-subtitle">Мини-проект: визуализация алгоритмов</p>
        <p className="theory-date">13 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Цель проекта</h2>
        <p className="theory-intro">
          Создать визуальную демонстрацию алгоритма. Вместо просто понимания кода, видишь как алгоритм работает шаг за шагом с анимацией.
        </p>

        <TheoryExample title="Примеры">
          <ul>
            <li>Визуализация сортировки: столбчатая диаграмма, элементы меняются местами, можешь видеть процесс</li>
            <li>Поиск в ширину (BFS): граф, подсвечиваются посещённые узлы, показывается очередь</li>
            <li>Стек операций: видишь как элементы добавляются и удаляются</li>
          </ul>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Требования проекта</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Обязательно (MVP)</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Выбрать один алгоритм (сортировка, поиск, BFS/DFS)</li>
            <li className="theory-list-item">Визуализировать данные (диаграмма, граф, таблица)</li>
            <li className="theory-list-item">Показать пошаговое выполнение</li>
            <li className="theory-list-item">Кнопки "Следующий шаг", "Сбросить", может "Автоматически"</li>
            <li className="theory-list-item">Код на GitHub с README</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Хорошо иметь (Nice-to-have)</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Изменяемый размер данных (slider)</li>
            <li className="theory-list-item">Разные алгоритмы на выбор</li>
            <li className="theory-list-item">Красивая анимация</li>
            <li className="theory-list-item">Отображение Big O сложности</li>
            <li className="theory-list-item">GIF запись работающей программы</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Технологический стек</h2>

        <TheoryTable
          headers={['Технология', 'Для чего', 'Альтернатива']}
          rows={[
            ['HTML', 'Структура страницы', '-'],
            ['CSS', 'Оформление', 'Tailwind, Bootstrap'],
            ['JavaScript', 'Логика алгоритма', 'TypeScript'],
            ['Canvas или SVG', 'Рисование графики', 'Three.js, Pixi.js'],
            ['React (опционально)', 'Управление состоянием', 'Vue, Svelte'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Примеры для разных алгоритмов</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Сортировка массива</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Показываешь столбчатую диаграмму</li>
            <li className="theory-list-item">На каждом шаге два столбца подсвечиваются (сравниваются)</li>
            <li className="theory-list-item">Если нужно поменять — анимация свапа</li>
            <li className="theory-list-item">Отсортированные элементы зелёные, остальные серые</li>
          </ul>
          <TheoryCode code={`// Bubble Sort с визуализацией
function bubbleSortStep(arr, step) {
  let operations = 0

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (operations === step) {
        return {
          array: arr,
          comparing: [j, j+1],  // Какие элементы сравниваются
          swapped: arr[j] > arr[j+1]
        }
      }
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
      }
      operations++
    }
  }
  return { array: arr, comparing: [], swapped: false }
}`} language="javascript" />
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">BFS на графе</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Рисуешь граф (узлы и рёбра)</li>
            <li className="theory-list-item">Показываешь очередь сбоку</li>
            <li className="theory-list-item">На каждом шаге: узел синий (текущий), посещённые зелёные, в очереди жёлтые</li>
            <li className="theory-list-item">Анимация движения от узла к узлу</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Поиск в массиве</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Подсвечиваешь какой элемент проверяешь</li>
            <li className="theory-list-item">Показываешь текущую позицию в поиске</li>
            <li className="theory-list-item">При нахождении - зелёный цвет</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">План разработки</h2>

        <TheoryExample title="День 1-2: Базовая структура">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Создай HTML с кнопками и контейнером для визуализации</li>
            <li>Напиши алгоритм без визуализации</li>
            <li>Добавь логику для пошагового выполнения</li>
          </ol>
        </TheoryExample>

        <TheoryExample title="День 3: Визуализация">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>Реализуй рисование (Canvas или SVG)</li>
            <li>Подключи визуализацию к алгоритму</li>
            <li>Добавь анимации переходов</li>
          </ol>
        </TheoryExample>

        <TheoryExample title="День 4: Полировка">
          <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
            <li>CSS для красивого оформления</li>
            <li>Тестирование разных случаев</li>
            <li>Загрузка на GitHub</li>
          </ol>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Полезные ресурсы</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>Canvas MDN</strong> — https://developer.mozilla.org/ru/docs/Web/API/Canvas_API</li>
          <li className="theory-list-item"><strong>requestAnimationFrame</strong> — для гладкой анимации</li>
          <li className="theory-list-item"><strong>Visualgo.net</strong> — примеры визуализаций для вдохновения</li>
          <li className="theory-list-item"><strong>p5.js</strong> — библиотека для графики (проще Canvas)</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Что сдавать</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Git репозиторий на GitHub</li>
          <li className="theory-list-item">README с описанием и скриншотами</li>
          <li className="theory-list-item">GIF запись работающего проекта (используй ScreenFlow или gifcap)</li>
          <li className="theory-list-item">Живая ссылка (GitHub Pages или Vercel)</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Твой первый полноценный проект! Гордись собой! 🌟</p>
      </section>
    </div>
  )
}
