import{j as e}from"./index-CH9KCahv.js";import{T as s,a as l,b as i}from"./TheoryTable-DGB7NVGY.js";function t(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Основы HTML"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Frontend-разработка"}),e.jsx("p",{className:"theory-date",children:"1 июля 2026"}),e.jsx("p",{children:"HTML (HyperText Markup Language) — язык разметки, «скелет» любой веб-страницы. Он не программирует логику, а описывает структуру: что тут заголовок, что абзац, что картинка, что ссылка. Браузер читает HTML и рисует страницу."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Структура HTML-документа"}),e.jsx("p",{children:"Любая страница начинается с одинакового каркаса:"}),e.jsx(s,{language:"html",code:`<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая страница.</p>
  </body>
</html>`}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{children:[e.jsx("code",{children:"<!DOCTYPE html>"})," — говорит браузеру, что это HTML5."]}),e.jsxs("li",{children:[e.jsx("code",{children:'<html lang="ru">'})," — корень страницы, указывает язык."]}),e.jsxs("li",{children:[e.jsx("code",{children:"<head>"})," — служебная информация: кодировка, заголовок вкладки, подключение стилей. Не отображается на странице."]}),e.jsxs("li",{children:[e.jsx("code",{children:'<meta charset="UTF-8">'})," — кодировка, чтобы корректно отображалась кириллица."]}),e.jsxs("li",{children:[e.jsx("code",{children:"<body>"})," — всё видимое содержимое страницы."]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Из чего состоит тег"}),e.jsx(s,{language:"html",code:`<a href="https://example.com" target="_blank">Ссылка</a>
 ↑   ↑                          ↑              ↑        ↑
тег  атрибут                 атрибут       содержимое  закрывающий тег`}),e.jsxs("p",{children:["Большинство тегов парные: открывающий ",e.jsx("code",{children:"<p>"})," и закрывающий ",e.jsx("code",{children:"</p>"}),". Есть одиночные (self-closing), которым не нужен закрывающий: ",e.jsx("code",{children:"<br>"}),",",e.jsx("code",{children:"<img>"}),", ",e.jsx("code",{children:"<input>"}),", ",e.jsx("code",{children:"<hr>"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Текстовые теги"}),e.jsx(s,{language:"html",code:`<h1>Главный заголовок</h1>
<h2>Подзаголовок</h2>   <!-- заголовки от h1 до h6 -->
<p>Абзац текста.</p>
<strong>Важный текст (жирный)</strong>
<em>Акцент (курсив)</em>
<br>   <!-- перенос строки -->
<hr>   <!-- горизонтальная линия -->`}),e.jsxs(l,{title:"Один h1 на страницу",children:["Заголовок ",e.jsx("code",{children:"<h1>"})," должен быть один и отражать суть страницы — это важно для доступности и SEO. Остальные заголовки идут по иерархии: h2 внутри раздела, h3 внутри h2."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Списки"}),e.jsx(s,{language:"html",code:`<!-- Маркированный список -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Нумерованный список -->
<ol>
  <li>Первый шаг</li>
  <li>Второй шаг</li>
</ol>`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Ссылки и изображения"}),e.jsx(s,{language:"html",code:`<a href="https://google.com">Перейти в Google</a>
<a href="#section2">Ссылка на раздел на этой же странице</a>

<img src="photo.jpg" alt="Описание картинки для доступности">`}),e.jsxs(l,{title:"Атрибут alt обязателен",children:["У каждой картинки должен быть ",e.jsx("code",{children:"alt"})," — текстовое описание. Его читают скринридеры для незрячих пользователей, и он показывается, если картинка не загрузилась. Без ",e.jsx("code",{children:"alt"})," вёрстка считается невалидной по стандартам доступности."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Таблицы"}),e.jsx(s,{language:"html",code:`<table>
  <thead>
    <tr>
      <th>Технология</th>
      <th>Уровень</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>HTML</td>
      <td>8 / 10</td>
    </tr>
    <tr>
      <td>CSS</td>
      <td>6 / 10</td>
    </tr>
  </tbody>
</table>`}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{children:[e.jsx("code",{children:"<tr>"})," — строка таблицы (table row)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"<th>"})," — ячейка-заголовок (жирная, table header)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"<td>"})," — обычная ячейка (table data)."]})]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Формы"}),e.jsx("p",{children:"Формы собирают данные от пользователя — имя, почту, сообщения."}),e.jsx(s,{language:"html",code:`<form>
  <label for="name">Имя</label>
  <input type="text" id="name" name="name" placeholder="Введите имя">

  <label for="email">Почта</label>
  <input type="email" id="email" name="email" required>

  <label for="phone">Телефон</label>
  <input type="tel" id="phone" name="phone">

  <button type="submit">Отправить</button>
</form>`}),e.jsx(i,{headers:["type","Для чего"],rows:[["text","Обычный текст"],["email","Почта (с проверкой формата)"],["tel","Телефон"],["password","Пароль (скрытый ввод)"],["number","Число"],["checkbox","Флажок (да/нет)"],["radio","Выбор одного из вариантов"],["submit","Кнопка отправки"]]}),e.jsxs(l,{title:"label связывается с input",children:["Атрибут ",e.jsx("code",{children:"for"})," у ",e.jsx("code",{children:"<label>"})," должен совпадать с ",e.jsx("code",{children:"id"}),"поля. Тогда клик по подписи ставит фокус в поле — это удобство и требование доступности."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Семантические теги"}),e.jsxs("p",{children:["Семантика — использование тегов по смыслу, а не просто ",e.jsx("code",{children:"<div>"})," везде. Такие теги понятны браузеру, поисковикам и скринридерам."]}),e.jsx(s,{language:"html",code:`<header>Шапка сайта: логотип, меню</header>
<nav>Навигация: ссылки на разделы</nav>
<main>
  <section>
    <h2>Раздел</h2>
    <article>Самостоятельный блок (статья, карточка)</article>
  </section>
</main>
<aside>Боковая колонка</aside>
<footer>Подвал: контакты, копирайт</footer>`}),e.jsx(i,{headers:["Семантично ✅","Несемантично ❌"],rows:[["<nav>",'<div class="nav">'],["<header>",'<div class="header">'],["<button>",'<div onclick="...">'],["<main>",'<div id="content">']]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Валидная вёрстка"}),e.jsx("p",{children:"Валидный HTML — это код, соответствующий стандартам W3C. Основные правила:"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{children:["Каждый парный тег закрыт: открыли ",e.jsx("code",{children:"<p>"})," — закрыли ",e.jsx("code",{children:"</p>"}),"."]}),e.jsxs("li",{children:["Теги вложены правильно, без пересечений: ",e.jsx("code",{children:"<p><strong>текст</strong></p>"}),", а не наоборот."]}),e.jsxs("li",{children:["На странице ровно один ",e.jsx("code",{children:"<h1>"}),", заголовки идут по иерархии."]}),e.jsxs("li",{children:["У картинок есть ",e.jsx("code",{children:"alt"}),", у полей формы — связанные ",e.jsx("code",{children:"<label>"}),"."]}),e.jsxs("li",{children:["Атрибуты в кавычках, ",e.jsx("code",{children:"id"})," уникальны в пределах страницы."]}),e.jsxs("li",{children:["Используются семантические теги вместо бесконечных ",e.jsx("code",{children:"<div>"}),"."]})]}),e.jsx(l,{title:"Проверить себя",children:"Свою вёрстку можно проверить на официальном валидаторе W3C — validator.w3.org. Он покажет все ошибки и предупреждения."})]})]})}export{t as default};
