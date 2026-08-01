import{j as e}from"./index-COKtlNDI.js";import{T as s,b as i,a as r}from"./TheoryTable-Dymn9neR.js";function t(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Основы CSS"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Frontend-разработка"}),e.jsx("p",{className:"theory-date",children:"2 июля 2026"}),e.jsxs("p",{children:["CSS (Cascading Style Sheets) — язык, который отвечает за ",e.jsx("strong",{children:"внешний вид"})," HTML-страницы: цвета, отступы, шрифты, расположение блоков. HTML описывает структуру («что это»), а CSS — как это должно выглядеть."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Как подключить CSS и синтаксис правил"}),e.jsx(s,{language:"html",code:`<!-- Внешний файл стилей — основной способ -->
<link rel="stylesheet" href="styles.css">

<!-- Внутри страницы -->
<style>
  p { color: red; }
</style>

<!-- Прямо на элементе (использовать редко) -->
<p style="color: red;">Текст</p>`}),e.jsxs("p",{children:["Правило CSS состоит из ",e.jsx("strong",{children:"селектора"})," и блока объявлений в фигурных скобках:"]}),e.jsx(s,{language:"css",code:`селектор {
  свойство: значение;
  свойство: значение;
}

/* пример */
p {
  color: navy;
  font-size: 16px;
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Селекторы"}),e.jsx(i,{headers:["Селектор","Что выбирает","Пример"],rows:[["тег","все элементы такого тега","p { }"],[".класс","элементы с этим классом",".card { }"],["#id","элемент с этим id (один)","#header { }"],["*","вообще все элементы","* { }"],["A B","B внутри A (любой уровень)","nav a { }"],["A > B","B — прямой потомок A","ul > li { }"],["A, B","и A, и B","h1, h2 { }"],[":hover","псевдокласс — состояние (наведение)","a:hover { }"]]}),e.jsxs(r,{title:"Специфичность (что победит при конфликте)",children:["Если несколько правил задают одно и то же свойство одному элементу, побеждает более «специфичный» селектор: ",e.jsx("code",{children:"id"})," сильнее ",e.jsx("code",{children:"класса"}),", класс сильнее ",e.jsx("code",{children:"тега"}),". При равной специфичности побеждает правило, объявленное ",e.jsx("strong",{children:"позже"})," в файле."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Блочная модель (Box Model)"}),e.jsx("p",{children:"Каждый элемент на странице — прямоугольник, состоящий из четырёх слоёв (изнутри наружу):"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"content"})," — сам контент (текст, картинка);"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"padding"})," — внутренний отступ между контентом и границей;"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"border"})," — рамка;"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"margin"})," — внешний отступ до соседних элементов."]})]}),e.jsx(s,{language:"css",code:`.box {
  width: 200px;
  padding: 16px;
  border: 2px solid black;
  margin: 20px;
}`}),e.jsxs(r,{title:"box-sizing: border-box",children:["По умолчанию ",e.jsx("code",{children:"width"})," задаёт ширину только content, и padding/border добавляются сверху — итоговый блок получается шире. ",e.jsx("code",{children:"box-sizing: border-box"})," заставляет padding и border «вписываться» в заданную ширину — с этим работать намного удобнее и предсказуемее. Часто ставят глобально: ",e.jsxs("code",{children:["* ","{"," box-sizing: border-box; ","}"]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Цвета и единицы измерения"}),e.jsx(i,{headers:["Формат / единица","Пример","Когда использовать"],rows:[["именованный цвет","red, navy, transparent","быстрые прототипы"],["HEX","#ff0000, #f00","самый частый способ"],["RGB / RGBA","rgb(255,0,0), rgba(255,0,0,0.5)","нужна прозрачность (alpha)"],["px","16px","абсолютный размер в пикселях"],["%","50%","относительно родителя"],["em","1.5em","относительно font-size родителя"],["rem","1.5rem","относительно font-size корня (html) — стабильнее em"],["vw / vh","100vw, 50vh","относительно ширины/высоты окна браузера"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Текст и шрифты"}),e.jsx(s,{language:"css",code:`p {
  font-family: "Segoe UI", Arial, sans-serif; /* через запятую — запасные варианты */
  font-size: 16px;
  font-weight: 700;      /* жирность: 400 обычный, 700 жирный */
  line-height: 1.6;      /* межстрочный интервал */
  text-align: center;    /* left, right, center, justify */
  text-decoration: none; /* убрать подчёркивание у ссылок */
  color: #222;
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Display: block, inline, inline-block"}),e.jsx(i,{headers:["Значение","Занимает всю ширину?","Работают width/height?","Пример тегов"],rows:[["block","да, с новой строки","да","div, p, h1, ul"],["inline","нет, только по содержимому","нет","span, a, strong"],["inline-block","нет","да","img, button"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Flexbox — гибкое расположение блоков"}),e.jsxs("p",{children:["Flexbox — способ выстроить дочерние элементы в ряд или колонку с гибким распределением пространства между ними. Свойства задаются ",e.jsx("strong",{children:"на родителе"}),"."]}),e.jsx(s,{language:"css",code:`.container {
  display: flex;
  flex-direction: row;        /* row (по умолч.) или column */
  justify-content: space-between; /* выравнивание по главной оси */
  align-items: center;        /* выравнивание по поперечной оси */
  gap: 16px;                  /* расстояние между элементами */
  flex-wrap: wrap;            /* перенос на новую строку, если не влезает */
}`}),e.jsx(i,{headers:["justify-content","Что делает"],rows:[["flex-start","прижать к началу (по умолчанию)"],["center","по центру"],["space-between","равномерно, крайние — у краёв"],["space-around","равномерно, с отступами по краям"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Grid — двумерная сетка"}),e.jsx("p",{children:"Grid удобен, когда нужно расположить элементы одновременно по строкам и колонкам."}),e.jsx(s,{language:"css",code:`.container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* 3 колонки, средняя вдвое шире */
  grid-template-rows: auto 1fr auto;
  gap: 12px;
}`}),e.jsx(r,{title:"Flexbox или Grid?",children:"Flexbox — для одномерного расположения (в ряд ИЛИ в колонку): навигация, кнопки, карточки в ряд. Grid — для двумерного (строки И колонки одновременно): макет всей страницы, галереи, таблицы карточек."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Position"}),e.jsx(i,{headers:["Значение","Поведение"],rows:[["static","обычный поток документа (по умолчанию)"],["relative","смещается относительно своего обычного места; освобождает место как раньше"],["absolute","вынимается из потока, позиционируется относительно ближайшего relative-родителя"],["fixed","привязан к окну браузера, не двигается при скролле"],["sticky","«прилипает» при скролле, пока не выйдет из области родителя"]]}),e.jsx(s,{language:"css",code:`.parent { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Адаптивная вёрстка: media query"}),e.jsx("p",{children:"Медиа-запросы позволяют применять разные стили в зависимости от ширины экрана — так сайт одинаково хорошо выглядит на компьютере, планшете и телефоне."}),e.jsx(s,{language:"css",code:`/* Стили по умолчанию — для десктопа */
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
}`}),e.jsxs(r,{title:"Mobile-first vs Desktop-first",children:["Можно писать базовые стили под мобильные и «расширять» их через ",e.jsx("code",{children:"min-width"})," для больших экранов (mobile-first) — так часто делают в реальных проектах. Но проще для старта писать под десктоп и «сужать» через ",e.jsx("code",{children:"max-width"})," (desktop-first) — это то, что показано выше."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"11. Выводы"}),e.jsxs("ul",{className:"theory-list",children:[e.jsx("li",{children:"CSS = селектор + свойства; побеждает более специфичный селектор или тот, что объявлен позже."}),e.jsxs("li",{children:["Каждый элемент — блок из content/padding/border/margin; ",e.jsx("code",{children:"box-sizing: border-box"})," упрощает расчёт размеров."]}),e.jsx("li",{children:"rem и % — более гибкие единицы, чем px, для адаптивных макетов."}),e.jsx("li",{children:"Flexbox — для расположения в ряд/колонку, Grid — для двумерных сеток."}),e.jsx("li",{children:"position: relative/absolute/fixed/sticky — управление позицией вне обычного потока."}),e.jsx("li",{children:"Media queries (@media) — основа адаптивности под разные размеры экрана."})]})]})]})}export{t as default};
