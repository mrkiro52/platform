import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July4PreprocessorsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Препроцессоры LESS / SASS / SCSS</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          Обычный CSS не умеет переменных (в старом виде), вложенности селекторов, функций и математики.
          <strong> Препроцессор</strong> — язык, который расширяет CSS этими возможностями, а затем
          компилируется в обычный CSS, который понимает браузер.
        </p>
      </section>

      {/* Зачем нужны */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Зачем нужны препроцессоры</h2>
        <ul className="theory-list">
          <li><strong>Переменные</strong> — один раз задать цвет/отступ и переиспользовать везде.</li>
          <li><strong>Вложенность</strong> — писать селекторы так же, как вложена структура HTML.</li>
          <li><strong>Миксины и функции</strong> — переиспользуемые блоки стилей и вычисления.</li>
          <li><strong>Разбиение на файлы</strong> — стили можно разложить по модулям и собрать в один CSS.</li>
        </ul>
        <TheoryTable
          headers={['Препроцессор', 'Расширение файла', 'Особенность']}
          rows={[
            ['LESS', '.less', 'ближе всего по синтаксису к обычному CSS, компилируется на JS'],
            ['Sass', '.sass', 'старый синтаксис без фигурных скобок и точек с запятой (на отступах)'],
            ['SCSS', '.scss', 'современный синтаксис Sass — фигурные скобки как в CSS, самый популярный'],
          ]}
        />
        <TheoryExample title="Компиляция">
          Браузер не понимает .scss/.less напрямую. Файл препроцессора компилируется (обычно сборщиком —
          Vite, Webpack, или отдельным CLI) в обычный .css, который уже подключается к странице.
        </TheoryExample>
      </section>

      {/* Переменные */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Переменные</h2>
        <TheoryCode language="scss" code={`// SCSS — переменная начинается с $
$primary-color: #c8ff00;
$padding-base: 16px;

.button {
  background: $primary-color;
  padding: $padding-base;
}`} />
        <TheoryCode language="less" code={`// LESS — переменная начинается с @
@primary-color: #c8ff00;
@padding-base: 16px;

.button {
  background: @primary-color;
  padding: @padding-base;
}`} />
        <TheoryExample title="А как же CSS-переменные?">
          В современном CSS тоже есть переменные: <code>--primary-color: #c8ff00;</code> и
          <code> color: var(--primary-color);</code>. Отличие: CSS-переменные живут в браузере и могут
          меняться в реальном времени (например, через JS или media query), а переменные препроцессора
          существуют только на этапе компиляции — в финальном CSS их уже нет, они превратились в конкретные значения.
        </TheoryExample>
      </section>

      {/* Вложенность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Вложенность селекторов</h2>
        <TheoryCode language="scss" code={`// SCSS
.card {
  padding: 16px;
  border: 1px solid #ccc;

  .title {          // соответствует .card .title
    font-weight: 700;
  }

  &:hover {         // & = сам .card; получится .card:hover
    border-color: #c8ff00;
  }

  &.active {        // .card.active
    background: #f5f5f5;
  }
}`} />
        <p>Скомпилируется в обычный CSS:</p>
        <TheoryCode language="css" code={`.card { padding: 16px; border: 1px solid #ccc; }
.card .title { font-weight: 700; }
.card:hover { border-color: #c8ff00; }
.card.active { background: #f5f5f5; }`} />
        <TheoryExample title="Символ &">
          <code>&amp;</code> — ссылка на родительский селектор. Без него вложенный селектор означал бы «потомок»
          (пробел), а с ним можно строить псевдоклассы (<code>&amp;:hover</code>) и составные классы
          (<code>&amp;.active</code>).
        </TheoryExample>
      </section>

      {/* Миксины */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Миксины — переиспользуемые блоки стилей</h2>
        <p>Миксин — это «функция», которая возвращает набор CSS-свойств, и её можно подключить в любом правиле.</p>
        <TheoryCode language="scss" code={`// SCSS
@mixin flex-center($direction: row) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: $direction;
}

.header {
  @include flex-center;
}

.sidebar {
  @include flex-center(column);
}`} />
        <TheoryCode language="less" code={`// LESS — миксин это просто класс, который "примешивается"
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  .flex-center();
}`} />
      </section>

      {/* Функции и математика */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Функции и математические операции</h2>
        <TheoryCode language="scss" code={`$base-size: 16px;

.title {
  font-size: $base-size * 1.5;      // 24px — препроцессор сам посчитает
}

.box {
  width: calc(100% - #{$base-size}); // #{} — вставка переменной внутрь строки/значения
}`} />
        <TheoryExample title="Готовые функции цвета">
          У препроцессоров есть встроенные функции для работы с цветом: <code>darken($color, 10%)</code>,
          <code> lighten($color, 10%)</code>, <code>rgba($color, 0.5)</code> — удобно делать оттенки одного
          базового цвета, не подбирая HEX вручную.
        </TheoryExample>
      </section>

      {/* Разбиение на файлы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Партиалы и @import / @use</h2>
        <p>
          Большой проект удобно разбить на несколько файлов (переменные отдельно, кнопки отдельно, карточки
          отдельно) и собрать их в один через импорт.
        </p>
        <TheoryCode language="scss" code={`// _variables.scss (файл с "_" в начале — партиал, не компилируется отдельно)
$primary-color: #c8ff00;

// styles.scss
@use 'variables';

.button {
  background: variables.$primary-color;
}`} />
        <TheoryExample title="@import vs @use">
          Раньше в Sass использовали <code>@import</code>, но у него были проблемы (повторный импорт одного
          файла, глобальная область видимости переменных). Современный Sass рекомендует <code>@use</code> —
          он импортирует файл один раз и требует явно указывать, из какого модуля переменная/миксин.
        </TheoryExample>
      </section>

      {/* Сравнение */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. LESS vs SCSS — что выбрать</h2>
        <TheoryTable
          headers={['Критерий', 'LESS', 'SCSS']}
          rows={[
            ['Переменные', '@variable', '$variable'],
            ['Компиляция', 'может прямо в браузере через less.js, но обычно тоже собирается заранее', 'только предварительная компиляция'],
            ['Возможности', 'базовый набор', 'больше функций, условия @if/@else, циклы @each/@for'],
            ['Популярность', 'использовался в Bootstrap 3', 'сейчас самый популярный препроцессор, используется в большинстве проектов'],
          ]}
        />
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Выводы</h2>
        <ul className="theory-list">
          <li>Препроцессор добавляет к CSS переменные, вложенность, миксины и функции, а затем компилируется в обычный CSS.</li>
          <li>SCSS ($переменная, фигурные скобки) — самый популярный сегодня; LESS (@переменная) тоже встречается в старых проектах.</li>
          <li>Символ & в SCSS ссылается на родительский селектор — удобно для псевдоклассов и составных классов.</li>
          <li>Миксины избавляют от копирования одинаковых блоков стилей по всему файлу.</li>
          <li>Большие проекты разбивают на партиалы (файлы с «_») и собирают через @use.</li>
        </ul>
      </section>
    </div>
  )
}
