import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July1HtmlTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Основы HTML</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">1 июля 2026</p>
        <p>
          HTML (HyperText Markup Language) — язык разметки, «скелет» любой веб-страницы. Он не
          программирует логику, а описывает структуру: что тут заголовок, что абзац, что картинка,
          что ссылка. Браузер читает HTML и рисует страницу.
        </p>
      </section>

      {/* Структура документа */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Структура HTML-документа</h2>
        <p>Любая страница начинается с одинакового каркаса:</p>
        <TheoryCode language="html" code={`<!DOCTYPE html>
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
</html>`} />
        <ul className="theory-list">
          <li><code>&lt;!DOCTYPE html&gt;</code> — говорит браузеру, что это HTML5.</li>
          <li><code>&lt;html lang="ru"&gt;</code> — корень страницы, указывает язык.</li>
          <li><code>&lt;head&gt;</code> — служебная информация: кодировка, заголовок вкладки, подключение стилей. Не отображается на странице.</li>
          <li><code>&lt;meta charset="UTF-8"&gt;</code> — кодировка, чтобы корректно отображалась кириллица.</li>
          <li><code>&lt;body&gt;</code> — всё видимое содержимое страницы.</li>
        </ul>
      </section>

      {/* Теги и атрибуты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Из чего состоит тег</h2>
        <TheoryCode language="html" code={`<a href="https://example.com" target="_blank">Ссылка</a>
 ↑   ↑                          ↑              ↑        ↑
тег  атрибут                 атрибут       содержимое  закрывающий тег`} />
        <p>
          Большинство тегов парные: открывающий <code>&lt;p&gt;</code> и закрывающий <code>&lt;/p&gt;</code>.
          Есть одиночные (self-closing), которым не нужен закрывающий: <code>&lt;br&gt;</code>,
          <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;hr&gt;</code>.
        </p>
      </section>

      {/* Текстовые теги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Текстовые теги</h2>
        <TheoryCode language="html" code={`<h1>Главный заголовок</h1>
<h2>Подзаголовок</h2>   <!-- заголовки от h1 до h6 -->
<p>Абзац текста.</p>
<strong>Важный текст (жирный)</strong>
<em>Акцент (курсив)</em>
<br>   <!-- перенос строки -->
<hr>   <!-- горизонтальная линия -->`} />
        <TheoryExample title="Один h1 на страницу">
          Заголовок <code>&lt;h1&gt;</code> должен быть один и отражать суть страницы — это важно
          для доступности и SEO. Остальные заголовки идут по иерархии: h2 внутри раздела, h3 внутри h2.
        </TheoryExample>
      </section>

      {/* Списки */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Списки</h2>
        <TheoryCode language="html" code={`<!-- Маркированный список -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Нумерованный список -->
<ol>
  <li>Первый шаг</li>
  <li>Второй шаг</li>
</ol>`} />
      </section>

      {/* Ссылки и картинки */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Ссылки и изображения</h2>
        <TheoryCode language="html" code={`<a href="https://google.com">Перейти в Google</a>
<a href="#section2">Ссылка на раздел на этой же странице</a>

<img src="photo.jpg" alt="Описание картинки для доступности">`} />
        <TheoryExample title="Атрибут alt обязателен">
          У каждой картинки должен быть <code>alt</code> — текстовое описание. Его читают
          скринридеры для незрячих пользователей, и он показывается, если картинка не загрузилась.
          Без <code>alt</code> вёрстка считается невалидной по стандартам доступности.
        </TheoryExample>
      </section>

      {/* Таблицы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Таблицы</h2>
        <TheoryCode language="html" code={`<table>
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
</table>`} />
        <ul className="theory-list">
          <li><code>&lt;tr&gt;</code> — строка таблицы (table row).</li>
          <li><code>&lt;th&gt;</code> — ячейка-заголовок (жирная, table header).</li>
          <li><code>&lt;td&gt;</code> — обычная ячейка (table data).</li>
        </ul>
      </section>

      {/* Формы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Формы</h2>
        <p>Формы собирают данные от пользователя — имя, почту, сообщения.</p>
        <TheoryCode language="html" code={`<form>
  <label for="name">Имя</label>
  <input type="text" id="name" name="name" placeholder="Введите имя">

  <label for="email">Почта</label>
  <input type="email" id="email" name="email" required>

  <label for="phone">Телефон</label>
  <input type="tel" id="phone" name="phone">

  <button type="submit">Отправить</button>
</form>`} />
        <TheoryTable
          headers={['type', 'Для чего']}
          rows={[
            ['text', 'Обычный текст'],
            ['email', 'Почта (с проверкой формата)'],
            ['tel', 'Телефон'],
            ['password', 'Пароль (скрытый ввод)'],
            ['number', 'Число'],
            ['checkbox', 'Флажок (да/нет)'],
            ['radio', 'Выбор одного из вариантов'],
            ['submit', 'Кнопка отправки'],
          ]}
        />
        <TheoryExample title="label связывается с input">
          Атрибут <code>for</code> у <code>&lt;label&gt;</code> должен совпадать с <code>id</code>
          поля. Тогда клик по подписи ставит фокус в поле — это удобство и требование доступности.
        </TheoryExample>
      </section>

      {/* Семантика */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. Семантические теги</h2>
        <p>
          Семантика — использование тегов по смыслу, а не просто <code>&lt;div&gt;</code> везде.
          Такие теги понятны браузеру, поисковикам и скринридерам.
        </p>
        <TheoryCode language="html" code={`<header>Шапка сайта: логотип, меню</header>
<nav>Навигация: ссылки на разделы</nav>
<main>
  <section>
    <h2>Раздел</h2>
    <article>Самостоятельный блок (статья, карточка)</article>
  </section>
</main>
<aside>Боковая колонка</aside>
<footer>Подвал: контакты, копирайт</footer>`} />
        <TheoryTable
          headers={['Семантично ✅', 'Несемантично ❌']}
          rows={[
            ['<nav>', '<div class="nav">'],
            ['<header>', '<div class="header">'],
            ['<button>', '<div onclick="...">'],
            ['<main>', '<div id="content">'],
          ]}
        />
      </section>

      {/* Валидность */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. Валидная вёрстка</h2>
        <p>Валидный HTML — это код, соответствующий стандартам W3C. Основные правила:</p>
        <ul className="theory-list">
          <li>Каждый парный тег закрыт: открыли <code>&lt;p&gt;</code> — закрыли <code>&lt;/p&gt;</code>.</li>
          <li>Теги вложены правильно, без пересечений: <code>&lt;p&gt;&lt;strong&gt;текст&lt;/strong&gt;&lt;/p&gt;</code>, а не наоборот.</li>
          <li>На странице ровно один <code>&lt;h1&gt;</code>, заголовки идут по иерархии.</li>
          <li>У картинок есть <code>alt</code>, у полей формы — связанные <code>&lt;label&gt;</code>.</li>
          <li>Атрибуты в кавычках, <code>id</code> уникальны в пределах страницы.</li>
          <li>Используются семантические теги вместо бесконечных <code>&lt;div&gt;</code>.</li>
        </ul>
        <TheoryExample title="Проверить себя">
          Свою вёрстку можно проверить на официальном валидаторе W3C — validator.w3.org.
          Он покажет все ошибки и предупреждения.
        </TheoryExample>
      </section>
    </div>
  )
}
