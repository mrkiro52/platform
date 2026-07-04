import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July2CssTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы CSS</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">2 июля 2026</p>
        <p>
          CSS (Cascading Style Sheets) — язык, который отвечает за <strong>внешний вид</strong> HTML-страницы:
          цвета, отступы, шрифты, расположение блоков. HTML описывает структуру («что это»), а CSS — как это
          должно выглядеть.
        </p>
      </section>

      {/* Подключение и синтаксис */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Как подключить CSS и синтаксис правил</h2>
        <TheoryCode language="html" code={`<!-- Внешний файл стилей — основной способ -->
<link rel="stylesheet" href="styles.css">

<!-- Внутри страницы -->
<style>
  p { color: red; }
</style>

<!-- Прямо на элементе (использовать редко) -->
<p style="color: red;">Текст</p>`} />
        <p>Правило CSS состоит из <strong>селектора</strong> и блока объявлений в фигурных скобках:</p>
        <TheoryCode language="css" code={`селектор {
  свойство: значение;
  свойство: значение;
}

/* пример */
p {
  color: navy;
  font-size: 16px;
}`} />
      </section>

      {/* Селекторы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Селекторы</h2>
        <TheoryTable
          headers={['Селектор', 'Что выбирает', 'Пример']}
          rows={[
            ['тег', 'все элементы такого тега', 'p { }'],
            ['.класс', 'элементы с этим классом', '.card { }'],
            ['#id', 'элемент с этим id (один)', '#header { }'],
            ['*', 'вообще все элементы', '* { }'],
            ['A B', 'B внутри A (любой уровень)', 'nav a { }'],
            ['A > B', 'B — прямой потомок A', 'ul > li { }'],
            ['A, B', 'и A, и B', 'h1, h2 { }'],
            [':hover', 'псевдокласс — состояние (наведение)', 'a:hover { }'],
          ]}
        />
        <TheoryExample title="Специфичность (что победит при конфликте)">
          Если несколько правил задают одно и то же свойство одному элементу, побеждает более
          «специфичный» селектор: <code>id</code> сильнее <code>класса</code>, класс сильнее <code>тега</code>.
          При равной специфичности побеждает правило, объявленное <strong>позже</strong> в файле.
        </TheoryExample>
      </section>

      {/* Box model */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Блочная модель (Box Model)</h2>
        <p>Каждый элемент на странице — прямоугольник, состоящий из четырёх слоёв (изнутри наружу):</p>
        <ul className="theory-list">
          <li><strong>content</strong> — сам контент (текст, картинка);</li>
          <li><strong>padding</strong> — внутренний отступ между контентом и границей;</li>
          <li><strong>border</strong> — рамка;</li>
          <li><strong>margin</strong> — внешний отступ до соседних элементов.</li>
        </ul>
        <TheoryCode language="css" code={`.box {
  width: 200px;
  padding: 16px;
  border: 2px solid black;
  margin: 20px;
}`} />
        <TheoryExample title="box-sizing: border-box">
          По умолчанию <code>width</code> задаёт ширину только content, и padding/border добавляются
          сверху — итоговый блок получается шире. <code>box-sizing: border-box</code> заставляет
          padding и border «вписываться» в заданную ширину — с этим работать намного удобнее и предсказуемее.
          Часто ставят глобально: <code>* {'{'} box-sizing: border-box; {'}'}</code>
        </TheoryExample>
      </section>

      {/* Цвета, единицы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Цвета и единицы измерения</h2>
        <TheoryTable
          headers={['Формат / единица', 'Пример', 'Когда использовать']}
          rows={[
            ['именованный цвет', 'red, navy, transparent', 'быстрые прототипы'],
            ['HEX', '#ff0000, #f00', 'самый частый способ'],
            ['RGB / RGBA', 'rgb(255,0,0), rgba(255,0,0,0.5)', 'нужна прозрачность (alpha)'],
            ['px', '16px', 'абсолютный размер в пикселях'],
            ['%', '50%', 'относительно родителя'],
            ['em', '1.5em', 'относительно font-size родителя'],
            ['rem', '1.5rem', 'относительно font-size корня (html) — стабильнее em'],
            ['vw / vh', '100vw, 50vh', 'относительно ширины/высоты окна браузера'],
          ]}
        />
      </section>

      {/* Текст и шрифты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Текст и шрифты</h2>
        <TheoryCode language="css" code={`p {
  font-family: "Segoe UI", Arial, sans-serif; /* через запятую — запасные варианты */
  font-size: 16px;
  font-weight: 700;      /* жирность: 400 обычный, 700 жирный */
  line-height: 1.6;      /* межстрочный интервал */
  text-align: center;    /* left, right, center, justify */
  text-decoration: none; /* убрать подчёркивание у ссылок */
  color: #222;
}`} />
      </section>

      {/* Display */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Display: block, inline, inline-block</h2>
        <TheoryTable
          headers={['Значение', 'Занимает всю ширину?', 'Работают width/height?', 'Пример тегов']}
          rows={[
            ['block', 'да, с новой строки', 'да', 'div, p, h1, ul'],
            ['inline', 'нет, только по содержимому', 'нет', 'span, a, strong'],
            ['inline-block', 'нет', 'да', 'img, button'],
          ]}
        />
      </section>

      {/* Flexbox */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Flexbox — гибкое расположение блоков</h2>
        <p>
          Flexbox — способ выстроить дочерние элементы в ряд или колонку с гибким распределением
          пространства между ними. Свойства задаются <strong>на родителе</strong>.
        </p>
        <TheoryCode language="css" code={`.container {
  display: flex;
  flex-direction: row;        /* row (по умолч.) или column */
  justify-content: space-between; /* выравнивание по главной оси */
  align-items: center;        /* выравнивание по поперечной оси */
  gap: 16px;                  /* расстояние между элементами */
  flex-wrap: wrap;            /* перенос на новую строку, если не влезает */
}`} />
        <TheoryTable
          headers={['justify-content', 'Что делает']}
          rows={[
            ['flex-start', 'прижать к началу (по умолчанию)'],
            ['center', 'по центру'],
            ['space-between', 'равномерно, крайние — у краёв'],
            ['space-around', 'равномерно, с отступами по краям'],
          ]}
        />
      </section>

      {/* Grid */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Grid — двумерная сетка</h2>
        <p>Grid удобен, когда нужно расположить элементы одновременно по строкам и колонкам.</p>
        <TheoryCode language="css" code={`.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 колонки, средняя вдвое шире */
  grid-template-rows: auto 1fr auto;
  gap: 12px;
}`} />
        <TheoryExample title="Flexbox или Grid?">
          Flexbox — для одномерного расположения (в ряд ИЛИ в колонку): навигация, кнопки, карточки в ряд.
          Grid — для двумерного (строки И колонки одновременно): макет всей страницы, галереи, таблицы карточек.
        </TheoryExample>
      </section>

      {/* Позиционирование */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Position</h2>
        <TheoryTable
          headers={['Значение', 'Поведение']}
          rows={[
            ['static', 'обычный поток документа (по умолчанию)'],
            ['relative', 'смещается относительно своего обычного места; освобождает место как раньше'],
            ['absolute', 'вынимается из потока, позиционируется относительно ближайшего relative-родителя'],
            ['fixed', 'привязан к окну браузера, не двигается при скролле'],
            ['sticky', '«прилипает» при скролле, пока не выйдет из области родителя'],
          ]}
        />
        <TheoryCode language="css" code={`.parent { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`} />
      </section>

      {/* Адаптивность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Адаптивная вёрстка: media query</h2>
        <p>
          Медиа-запросы позволяют применять разные стили в зависимости от ширины экрана — так сайт одинаково
          хорошо выглядит на компьютере, планшете и телефоне.
        </p>
        <TheoryCode language="css" code={`/* Стили по умолчанию — для десктопа */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

/* Планшет: ширина экрана ≤ 768px */
@media (max-width: 768px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Телефон: ширина экрана ≤ 480px */
@media (max-width: 480px) {
  .container {
    grid-template-columns: 1fr;
  }
}`} />
        <TheoryExample title="Mobile-first vs Desktop-first">
          Можно писать базовые стили под мобильные и «расширять» их через <code>min-width</code> для больших
          экранов (mobile-first) — так часто делают в реальных проектах. Но проще для старта писать под десктоп
          и «сужать» через <code>max-width</code> (desktop-first) — это то, что показано выше.
        </TheoryExample>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Выводы</h2>
        <ul className="theory-list">
          <li>CSS = селектор + свойства; побеждает более специфичный селектор или тот, что объявлен позже.</li>
          <li>Каждый элемент — блок из content/padding/border/margin; <code>box-sizing: border-box</code> упрощает расчёт размеров.</li>
          <li>rem и % — более гибкие единицы, чем px, для адаптивных макетов.</li>
          <li>Flexbox — для расположения в ряд/колонку, Grid — для двумерных сеток.</li>
          <li>position: relative/absolute/fixed/sticky — управление позицией вне обычного потока.</li>
          <li>Media queries (@media) — основа адаптивности под разные размеры экрана.</li>
        </ul>
      </section>
    </div>
  )
}
