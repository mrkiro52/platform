import{j as e}from"./index-C36_DhLL.js";import{b as n,a as c,T as s}from"./TheoryTable-DNWzV45k.js";const r={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#20beff"};function l({children:a,caption:t}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:a}),t&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:t})]})}function i({name:a,children:t}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:a}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",t]})]})}function x(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Препроцессоры LESS / SASS / SCSS"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Frontend-разработка"}),e.jsx("p",{className:"theory-date",children:"4 июля 2026"}),e.jsxs("p",{children:["Когда проект растёт, обычного CSS начинает не хватать: значения цветов и отступов повторяются десятки раз, селекторы дублируются, одинаковые блоки стилей копируются из файла в файл. Всё это тяжело поддерживать. ",e.jsx("strong",{children:"Препроцессоры"})," — надстройка над CSS, которая добавляет переменные, вложенность, миксины, функции и модульность, а затем компилируется в обычный CSS, понятный браузеру. Разберём, зачем они нужны, и все ключевые возможности на примерах."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Что такое препроцессор и как он работает"}),e.jsxs(i,{name:"Препроцессор CSS",children:["язык, расширяющий возможности CSS. Ты пишешь код на нём (файлы .scss/.sass/.less), а специальная программа-",e.jsx("strong",{children:"компилятор"})," превращает его в обычный .css. Браузер видит только итоговый CSS — про препроцессор он ничего не знает."]}),e.jsx(l,{caption:"Пайплайн: исходный .scss компилируется в обычный .css, который уже подключается к странице",children:e.jsxs("svg",{viewBox:"0 0 560 110",width:"100%",style:{maxWidth:560},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"30",y:"35",width:"130",height:"44",rx:"8",fill:"rgba(32,190,255,0.1)",stroke:r.lime}),e.jsx("text",{x:"95",y:"55",fill:r.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"styles.scss"}),e.jsx("text",{x:"95",y:"71",fill:r.sub,fontSize:"10",textAnchor:"middle",children:"переменные, вложенность"}),e.jsx("line",{x1:"160",y1:"57",x2:"220",y2:"57",stroke:r.sub,strokeWidth:"1.5",markerEnd:"url(#p1)"}),e.jsx("rect",{x:"220",y:"35",width:"120",height:"44",rx:"8",fill:"rgba(129,140,248,0.12)",stroke:"#818cf8"}),e.jsx("text",{x:"280",y:"60",fill:r.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"компилятор"}),e.jsx("line",{x1:"340",y1:"57",x2:"400",y2:"57",stroke:r.sub,strokeWidth:"1.5",markerEnd:"url(#p1)"}),e.jsx("rect",{x:"400",y:"35",width:"130",height:"44",rx:"8",fill:"rgba(96,165,250,0.1)",stroke:"#60a5fa"}),e.jsx("text",{x:"465",y:"55",fill:r.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"styles.css"}),e.jsx("text",{x:"465",y:"71",fill:r.sub,fontSize:"10",textAnchor:"middle",children:"обычный CSS → браузер"}),e.jsx("defs",{children:e.jsx("marker",{id:"p1",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:r.sub})})})]})}),e.jsx("p",{children:"Компиляцию обычно делает сборщик проекта (Vite, Webpack) автоматически при сохранении, либо отдельное расширение редактора (например, Live Sass Compiler в VS Code), либо CLI-команда."}),e.jsx(n,{headers:["Препроцессор","Расширение","Особенность"],rows:[["Sass (старый синтаксис)",".sass","без фигурных скобок и «;», отступами как в Python"],["SCSS (новый синтаксис Sass)",".scss","скобки и «;» как в CSS — самый популярный сегодня"],["LESS",".less","похож на CSS, исторически из мира JavaScript"]]}),e.jsx(c,{title:"SCSS vs Sass — это одно и то же?",children:"Да, это два синтаксиса одного препроцессора Sass. SCSS — новее и совместим с обычным CSS (любой валидный CSS уже является валидным SCSS), поэтому именно его используют почти везде. В конспекте примеры в основном на SCSS, для LESS показаны отличия."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Переменные"}),e.jsx("p",{children:"Задаём значение один раз — переиспользуем везде. Поменять тему сайта — поправить одну строку."}),e.jsx(s,{language:"scss",code:`// SCSS — переменная начинается с $
$primary: #20beff;
$text-color: #222;
$space: 16px;
$radius: 8px;

.button {
  background: $primary;
  color: $text-color;
  padding: $space;
  border-radius: $radius;
}`}),e.jsx(s,{language:"less",code:`// LESS — переменная начинается с @
@primary: #20beff;
@space: 16px;

.button {
  background: @primary;
  padding: @space;
}`}),e.jsxs(c,{title:"Переменные препроцессора vs CSS-переменные (--var)",children:["В современном CSS тоже есть переменные: ",e.jsx("code",{children:"--primary: #20beff;"})," и",e.jsx("code",{children:" color: var(--primary);"}),". Разница принципиальная: CSS-переменные живут ",e.jsx("strong",{children:"в браузере"})," и могут меняться динамически (через JS, media query, :hover). Переменные препроцессора существуют ",e.jsx("strong",{children:"только при компиляции"})," — в готовом CSS их уже нет, они превратились в конкретные значения. Часто используют оба: препроцессор для организации кода, CSS-переменные для тем."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Вложенность селекторов"}),e.jsx("p",{children:"Можно писать селекторы так же, как вложена структура HTML — код становится компактнее и нагляднее."}),e.jsx(s,{language:"scss",code:`.card {
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
}`}),e.jsx("p",{children:"Скомпилируется в плоский CSS:"}),e.jsx(s,{language:"css",code:`.card { padding: 16px; border: 1px solid #ccc; }
.card .title { font-weight: 700; }
.card:hover { border-color: #20beff; }
.card.active { background: #f5f5f5; }
.card__footer { margin-top: 12px; }`}),e.jsxs(i,{name:"Символ &",children:["ссылка на родительский селектор. Без него вложенный селектор означает «потомок» (пробел:",e.jsx("code",{children:" .card .title"}),"). С ",e.jsx("code",{children:"&"})," можно строить псевдоклассы (",e.jsx("code",{children:"&:hover"}),"), составные классы (",e.jsx("code",{children:"&.active"}),") и БЭМ-модификаторы (",e.jsx("code",{children:"&__footer"}),")."]}),e.jsxs(c,{title:"Не увлекайся глубокой вложенностью",children:["Вкладывать больше 3 уровней — плохая практика: получаются длинные, «тяжёлые» и хрупкие селекторы вроде ",e.jsx("code",{children:".a .b .c .d span"}),". Держи вложенность неглубокой."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Миксины — переиспользуемые блоки стилей"}),e.jsxs(i,{name:"Миксин (mixin)",children:["именованный набор свойств (по сути «функция, возвращающая CSS»), который можно подключить в любом правиле через ",e.jsx("code",{children:"@include"}),". Избавляет от копирования одинаковых блоков по всему файлу. Миксин может принимать параметры."]}),e.jsx(s,{language:"scss",code:`// объявляем миксин с параметром и значением по умолчанию
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
}`}),e.jsx(s,{language:"less",code:`// LESS — миксин это класс, который "примешивается"
.flex-center() {
  display: flex;
  align-items: center;
  justify-content: center;
}
.header { .flex-center(); }`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Функции и математика"}),e.jsx("p",{children:"Препроцессор умеет считать прямо в значениях и имеет встроенные функции (особенно для цвета)."}),e.jsx(s,{language:"scss",code:`$base: 16px;

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
}`}),e.jsxs(i,{name:"Интерполяция #{ }",children:["вставка значения переменной внутрь строки, имени свойства или значения, где переменную нельзя написать напрямую (например, внутри ",e.jsx("code",{children:"calc()"})," или в имени класса)."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Условия и циклы (SCSS)"}),e.jsx("p",{children:"SCSS умеет даже логику — это удобно для генерации однотипных классов (например, отступов или сетки) без ручного копирования."}),e.jsx(s,{language:"scss",code:`// цикл: сгенерировать классы .mt-1 ... .mt-5 с разными отступами
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
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Разбиение на файлы: партиалы и @use"}),e.jsx("p",{children:"Большой проект разбивают на маленькие файлы по смыслу (переменные, кнопки, карточки отдельно) и собирают в один."}),e.jsxs(i,{name:"Партиал (partial)",children:["файл, имя которого начинается с подчёркивания (",e.jsx("code",{children:"_variables.scss"}),"). Он не компилируется в отдельный CSS, а предназначен для импорта в другие файлы."]}),e.jsx(s,{language:"scss",code:`// _variables.scss (партиал)
$primary: #20beff;

// styles.scss
@use 'variables';     // подключаем модуль

.button {
  background: variables.$primary;   // обращаемся через имя модуля
}`}),e.jsxs(c,{title:"@import vs @use",children:["Раньше подключали через ",e.jsx("code",{children:"@import"}),", но у него были проблемы: файл мог импортироваться несколько раз, а все переменные попадали в общую глобальную область. Современный Sass рекомендует",e.jsx("code",{children:" @use"})," — импортирует файл один раз и требует явно указывать модуль (",e.jsx("code",{children:"variables.$primary"}),"), что делает код понятнее."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Всё вместе: пример карточки"}),e.jsx(s,{language:"scss",code:`$primary: #20beff;
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
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. LESS vs SCSS — что выбрать"}),e.jsx(n,{headers:["Критерий","LESS","SCSS"],rows:[["Переменные","@variable","$variable"],["Миксины",".mixin()","@mixin / @include"],["Логика (условия, циклы)","ограниченная","полноценная (@if, @for, @each)"],["Экосистема сейчас","реже, был в Bootstrap 3","стандарт де-факто, огромное сообщество"]]}),e.jsxs("p",{children:["Для новых проектов чаще выбирают ",e.jsx("strong",{children:"SCSS"})," — он мощнее и популярнее. LESS полезно знать, потому что он встречается в старых проектах."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Выводы"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{children:"Препроцессор расширяет CSS переменными, вложенностью, миксинами, функциями и модулями, а затем компилируется в обычный CSS."}),e.jsx("li",{children:"SCSS ($переменная, скобки) — самый популярный; LESS (@переменная) встречается в старых проектах."}),e.jsx("li",{children:"Переменные убирают повторение значений; в отличие от CSS-переменных они существуют только при компиляции."}),e.jsx("li",{children:"Вложенность и символ & делают селекторы компактными (псевдоклассы, БЭМ), но злоупотреблять глубиной нельзя."}),e.jsx("li",{children:"Миксины переиспользуют блоки стилей, функции считают значения и работают с цветом."}),e.jsx("li",{children:"Проект разбивают на партиалы (файлы с «_») и собирают через @use; SCSS умеет даже условия и циклы для генерации классов."})]})]})]})}export{x as default};
