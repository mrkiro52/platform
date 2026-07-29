import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', border: '#2a2a3a' }

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

export default function July4PreprocessorsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Препроцессоры LESS / SASS / SCSS</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">4 июля 2026</p>
        <p>
          Когда проект растёт, обычного CSS начинает не хватать: значения цветов и отступов повторяются десятки
          раз, селекторы дублируются, одинаковые блоки стилей копируются из файла в файл. Всё это тяжело
          поддерживать. <strong>Препроцессоры</strong> — надстройка над CSS, которая добавляет переменные,
          вложенность, миксины, функции и модульность, а затем компилируется в обычный CSS, понятный браузеру.
          Разберём, зачем они нужны, и все ключевые возможности на примерах.
        </p>
      </section>

      {/* Что это и как работает */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое препроцессор и как он работает</h2>
        <Term name="Препроцессор CSS">
          язык, расширяющий возможности CSS. Ты пишешь код на нём (файлы .scss/.sass/.less), а специальная
          программа-<strong>компилятор</strong> превращает его в обычный .css. Браузер видит только итоговый CSS
          — про препроцессор он ничего не знает.
        </Term>
        <Fig caption="Пайплайн: исходный .scss компилируется в обычный .css, который уже подключается к странице">
          <svg viewBox="0 0 560 110" width="100%" style={{ maxWidth: 560 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="35" width="130" height="44" rx="8" fill="rgba(32,190,255,0.1)" stroke={C.lime} />
            <text x="95" y="55" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">styles.scss</text>
            <text x="95" y="71" fill={C.sub} fontSize="10" textAnchor="middle">переменные, вложенность</text>

            <line x1="160" y1="57" x2="220" y2="57" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#p1)" />
            <rect x="220" y="35" width="120" height="44" rx="8" fill="rgba(129,140,248,0.12)" stroke="#818cf8" />
            <text x="280" y="60" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">компилятор</text>

            <line x1="340" y1="57" x2="400" y2="57" stroke={C.sub} strokeWidth="1.5" markerEnd="url(#p1)" />
            <rect x="400" y="35" width="130" height="44" rx="8" fill="rgba(96,165,250,0.1)" stroke="#60a5fa" />
            <text x="465" y="55" fill={C.text} fontSize="12" fontWeight="700" textAnchor="middle">styles.css</text>
            <text x="465" y="71" fill={C.sub} fontSize="10" textAnchor="middle">обычный CSS → браузер</text>
            <defs><marker id="p1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker></defs>
          </svg>
        </Fig>
        <p>
          Компиляцию обычно делает сборщик проекта (Vite, Webpack) автоматически при сохранении, либо отдельное
          расширение редактора (например, Live Sass Compiler в VS Code), либо CLI-команда.
        </p>
        <TheoryTable
          headers={['Препроцессор', 'Расширение', 'Особенность']}
          rows={[
            ['Sass (старый синтаксис)', '.sass', 'без фигурных скобок и «;», отступами как в Python'],
            ['SCSS (новый синтаксис Sass)', '.scss', 'скобки и «;» как в CSS — самый популярный сегодня'],
            ['LESS', '.less', 'похож на CSS, исторически из мира JavaScript'],
          ]}
        />
        <TheoryExample title="SCSS vs Sass — это одно и то же?">
          Да, это два синтаксиса одного препроцессора Sass. SCSS — новее и совместим с обычным CSS (любой
          валидный CSS уже является валидным SCSS), поэтому именно его используют почти везде. В конспекте
          примеры в основном на SCSS, для LESS показаны отличия.
        </TheoryExample>
      </section>

      {/* Переменные */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Переменные</h2>
        <p>Задаём значение один раз — переиспользуем везде. Поменять тему сайта — поправить одну строку.</p>
        <TheoryCode language="scss" code={`// SCSS — переменная начинается с $
$primary: #20beff;
$text-color: #222;
$space: 16px;
$radius: 8px;

.button {
  background: $primary;
  color: $text-color;
  padding: $space;
  border-radius: $radius;
}`} />
        <TheoryCode language="less" code={`// LESS — переменная начинается с @
@primary: #20beff;
@space: 16px;

.button {
  background: @primary;
  padding: @space;
}`} />
        <TheoryExample title="Переменные препроцессора vs CSS-переменные (--var)">
          В современном CSS тоже есть переменные: <code>--primary: #20beff;</code> и
          <code> color: var(--primary);</code>. Разница принципиальная: CSS-переменные живут <strong>в
          браузере</strong> и могут меняться динамически (через JS, media query, :hover). Переменные
          препроцессора существуют <strong>только при компиляции</strong> — в готовом CSS их уже нет, они
          превратились в конкретные значения. Часто используют оба: препроцессор для организации кода, CSS-переменные для тем.
        </TheoryExample>
      </section>

      {/* Вложенность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Вложенность селекторов</h2>
        <p>Можно писать селекторы так же, как вложена структура HTML — код становится компактнее и нагляднее.</p>
        <TheoryCode language="scss" code={`.card {
  padding: 16px;
  border: 1px solid #ccc;

  .title {          // → .card .title
    font-weight: 700;
  }

  &:hover {         // & = сам .card → .card:hover
    border-color: #20beff;
  }

  &.active {        // → .card.active
    background: #f5f5f5;
  }

  &__footer {       // → .card__footer (удобно для БЭМ)
    margin-top: 12px;
  }
}`} />
        <p>Скомпилируется в плоский CSS:</p>
        <TheoryCode language="css" code={`.card { padding: 16px; border: 1px solid #ccc; }
.card .title { font-weight: 700; }
.card:hover { border-color: #20beff; }
.card.active { background: #f5f5f5; }
.card__footer { margin-top: 12px; }`} />
        <Term name="Символ &">
          ссылка на родительский селектор. Без него вложенный селектор означает «потомок» (пробел:
          <code> .card .title</code>). С <code>&</code> можно строить псевдоклассы (<code>&:hover</code>),
          составные классы (<code>&.active</code>) и БЭМ-модификаторы (<code>&__footer</code>).
        </Term>
        <TheoryExample title="Не увлекайся глубокой вложенностью">
          Вкладывать больше 3 уровней — плохая практика: получаются длинные, «тяжёлые» и хрупкие селекторы
          вроде <code>.a .b .c .d span</code>. Держи вложенность неглубокой.
        </TheoryExample>
      </section>

      {/* Миксины */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Миксины — переиспользуемые блоки стилей</h2>
        <Term name="Миксин (mixin)">
          именованный набор свойств (по сути «функция, возвращающая CSS»), который можно подключить в любом
          правиле через <code>@include</code>. Избавляет от копирования одинаковых блоков по всему файлу.
          Миксин может принимать параметры.
        </Term>
        <TheoryCode language="scss" code={`// объявляем миксин с параметром и значением по умолчанию
@mixin flex-center($direction: row) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: $direction;
}

.header {
  @include flex-center;          // используем
}
.sidebar {
  @include flex-center(column);  // с аргументом
}`} />
        <TheoryCode language="less" code={`// LESS — миксин это класс, который "примешивается"
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header { .flex-center(); }`} />
      </section>

      {/* Функции и математика */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Функции и математика</h2>
        <p>Препроцессор умеет считать прямо в значениях и имеет встроенные функции (особенно для цвета).</p>
        <TheoryCode language="scss" code={`$base: 16px;

.title {
  font-size: $base * 1.5;        // 24px — посчитается при компиляции
  margin-bottom: $base / 2;      // 8px
}

.box {
  width: calc(100% - #{$base});  // #{} — интерполяция: вставка переменной в строку
}

// встроенные функции цвета — оттенки из одного базового
.button {
  background: $primary;
  &:hover { background: darken($primary, 10%); }  // темнее на 10%
  border: 1px solid lighten($primary, 20%);       // светлее на 20%
}`} />
        <Term name="Интерполяция #{ }">
          вставка значения переменной внутрь строки, имени свойства или значения, где переменную нельзя
          написать напрямую (например, внутри <code>calc()</code> или в имени класса).
        </Term>
      </section>

      {/* Условия и циклы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Условия и циклы (SCSS)</h2>
        <p>
          SCSS умеет даже логику — это удобно для генерации однотипных классов (например, отступов или
          сетки) без ручного копирования.
        </p>
        <TheoryCode language="scss" code={`// цикл: сгенерировать классы .mt-1 ... .mt-5 с разными отступами
@for $i from 1 through 5 {
  .mt-#{$i} {
    margin-top: #{$i * 4}px;   // .mt-1 → 4px, .mt-2 → 8px, ...
  }
}

// условие
@mixin text($size) {
  font-size: $size;
  @if $size >= 24px {
    font-weight: 700;   // крупный текст делаем жирным
  } @else {
    font-weight: 400;
  }
}`} />
      </section>

      {/* Модульность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Разбиение на файлы: партиалы и @use</h2>
        <p>
          Большой проект разбивают на маленькие файлы по смыслу (переменные, кнопки, карточки отдельно) и
          собирают в один.
        </p>
        <Term name="Партиал (partial)">
          файл, имя которого начинается с подчёркивания (<code>_variables.scss</code>). Он не компилируется в
          отдельный CSS, а предназначен для импорта в другие файлы.
        </Term>
        <TheoryCode language="scss" code={`// _variables.scss (партиал)
$primary: #20beff;

// styles.scss
@use 'variables';     // подключаем модуль

.button {
  background: variables.$primary;   // обращаемся через имя модуля
}`} />
        <TheoryExample title="@import vs @use">
          Раньше подключали через <code>@import</code>, но у него были проблемы: файл мог импортироваться
          несколько раз, а все переменные попадали в общую глобальную область. Современный Sass рекомендует
          <code> @use</code> — импортирует файл один раз и требует явно указывать модуль
          (<code>variables.$primary</code>), что делает код понятнее.
        </TheoryExample>
      </section>

      {/* Полный пример */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Всё вместе: пример карточки</h2>
        <TheoryCode language="scss" code={`$primary: #20beff;
$radius: 10px;

@mixin card-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card {
  padding: 20px;
  border-radius: $radius;
  @include card-shadow;

  &:hover {
    border-color: $primary;
  }

  .title {
    font-size: 18px * 1;
    color: darken($primary, 40%);
  }

  // адаптивность можно вложить прямо сюда
  @media (max-width: 480px) {
    padding: 12px;
  }
}`} />
      </section>

      {/* LESS vs SCSS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. LESS vs SCSS — что выбрать</h2>
        <TheoryTable
          headers={['Критерий', 'LESS', 'SCSS']}
          rows={[
            ['Переменные', '@variable', '$variable'],
            ['Миксины', '.mixin()', '@mixin / @include'],
            ['Логика (условия, циклы)', 'ограниченная', 'полноценная (@if, @for, @each)'],
            ['Экосистема сейчас', 'реже, был в Bootstrap 3', 'стандарт де-факто, огромное сообщество'],
          ]}
        />
        <p>
          Для новых проектов чаще выбирают <strong>SCSS</strong> — он мощнее и популярнее. LESS полезно знать,
          потому что он встречается в старых проектах.
        </p>
      </section>

      {/* Выводы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Выводы</h2>
        <ul className="theory-list">
          <li>Препроцессор расширяет CSS переменными, вложенностью, миксинами, функциями и модулями, а затем компилируется в обычный CSS.</li>
          <li>SCSS ($переменная, скобки) — самый популярный; LESS (@переменная) встречается в старых проектах.</li>
          <li>Переменные убирают повторение значений; в отличие от CSS-переменных они существуют только при компиляции.</li>
          <li>Вложенность и символ & делают селекторы компактными (псевдоклассы, БЭМ), но злоупотреблять глубиной нельзя.</li>
          <li>Миксины переиспользуют блоки стилей, функции считают значения и работают с цветом.</li>
          <li>Проект разбивают на партиалы (файлы с «_») и собирают через @use; SCSS умеет даже условия и циклы для генерации классов.</li>
        </ul>
      </section>
    </div>
  )
}
