import{j as s}from"./index-C2GI-Uj_.js";import{D as i,T as e,b as r,a as c}from"./TheoryTable-DuCFRDXI.js";function t(){return s.jsxs("div",{className:"theory-container",children:[s.jsxs("section",{className:"theory-section",children:[s.jsx("h1",{className:"theory-title",children:"День 19"}),s.jsx("p",{className:"theory-subtitle",children:"Основы баз данных и SQL · часть 3"}),s.jsx("p",{className:"theory-date",children:"19 июня 2026"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Связи между таблицами и ключи"}),s.jsx("p",{className:"theory-intro",children:"В реальных приложениях данные разбиты на несколько таблиц, связанных между собой. Это избавляет от дублирования — принцип нормализации."}),s.jsx(i,{name:"users",columns:["id 🔑","name","age","city"],rows:[["1","Анна","25","Москва"],["2","Борис","31","Казань"],["3","Вера","19","Москва"],["4","Глеб","42","Сочи"],["5","Дина","28","Казань"]],highlightCols:[0],caption:"id — первичный ключ (PRIMARY KEY), уникальный для каждой строки, не NULL"}),s.jsx(i,{name:"orders",columns:["id 🔑","user_id 🔗","product","price"],rows:[["1","1","Книга","500"],["2","1","Наушники","3000"],["3","2","Мышка","1200"],["4","3","Клавиатура","2500"],["5","5","Монитор","15000"]],highlightCols:[1],caption:"user_id — внешний ключ (FOREIGN KEY), ссылается на users.id"}),s.jsxs("ul",{className:"theory-list",children:[s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"PRIMARY KEY 🔑"})," — уникальный идентификатор строки. Не повторяется, не бывает NULL."]}),s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"FOREIGN KEY 🔗"})," — ссылка на PRIMARY KEY другой таблицы. Гарантирует целостность данных."]}),s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"Типы связей:"})," один-к-одному (1:1), один-ко-многим (1:N), многие-ко-многим (N:M через промежуточную таблицу)."]})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"INNER JOIN — пересечение таблиц"}),s.jsxs("p",{className:"theory-intro",children:["JOIN соединяет строки двух таблиц по условию. INNER JOIN возвращает только строки, у которых есть совпадение в ",s.jsx("em",{children:"обеих"})," таблицах."]}),s.jsx(e,{language:"sql",code:`SELECT u.name, o.product, o.price
FROM users AS u
JOIN orders AS o ON u.id = o.user_id;`}),s.jsxs("p",{className:"theory-text",children:[s.jsx("code",{children:"AS u"})," и ",s.jsx("code",{children:"AS o"})," — псевдонимы таблиц. Делают запрос короче и читаемее."]}),s.jsx(i,{name:"результат INNER JOIN",columns:["name","product","price"],rows:[["Анна","Книга","500"],["Анна","Наушники","3000"],["Борис","Мышка","1200"],["Вера","Клавиатура","2500"],["Дина","Монитор","15000"]],highlightRows:[0,1,2,3,4],caption:"Глеб не попал — у него нет заказов. Строки с несуществующим user_id тоже отсеиваются."})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"LEFT JOIN — все строки из левой таблицы"}),s.jsxs("p",{className:"theory-intro",children:["LEFT JOIN берёт ",s.jsx("strong",{children:"все строки из левой таблицы"}),", даже если справа нет совпадения. Там где совпадения нет — будет NULL."]}),s.jsx(e,{language:"sql",code:`SELECT u.name, o.product
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id;`}),s.jsx(i,{name:"результат LEFT JOIN",columns:["name","product"],rows:[["Анна","Книга"],["Анна","Наушники"],["Борис","Мышка"],["Вера","Клавиатура"],["Глеб","NULL"],["Дина","Монитор"]],highlightRows:[4],caption:"Глеб попал в результат, хотя заказов нет — product = NULL"}),s.jsx(e,{language:"sql",code:`-- Найти пользователей БЕЗ заказов
SELECT u.name
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE o.id IS NULL;`}),s.jsxs("p",{className:"theory-text",children:["Фильтр ",s.jsx("code",{children:"WHERE o.id IS NULL"})," оставит только тех, у кого нет совпадений справа."]}),s.jsx(r,{headers:["Тип JOIN","Что возвращает","Когда использовать"],rows:[["INNER JOIN","Только строки с совпадением в обеих таблицах","Когда нужны только связанные данные"],["LEFT JOIN","Все строки слева + совпадения справа (NULL если нет)","Когда нужны все записи, даже без пары"],["RIGHT JOIN","Все строки справа + совпадения слева (NULL если нет)","Редко — обычно меняют порядок таблиц и пишут LEFT"],["FULL OUTER JOIN","Все строки из обеих таблиц","Когда нужно объединить всё (не в SQLite)"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"JOIN + GROUP BY — агрегация по связям"}),s.jsx("p",{className:"theory-intro",children:"Самая мощная комбинация: соединить таблицы и сразу посчитать статистику по группам."}),s.jsx(e,{language:"sql",code:`-- Сколько потратил каждый пользователь
SELECT u.name, COUNT(o.id) AS orders_count, SUM(o.price) AS total_spent
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name
ORDER BY total_spent DESC;`}),s.jsx(i,{name:"результат",columns:["name","orders_count","total_spent"],rows:[["Дина","1","15000"],["Анна","2","3500"],["Вера","1","2500"],["Борис","1","1200"],["Глеб","0","NULL"]],highlightCols:[1,2],caption:"LEFT JOIN + GROUP BY — показывает всех пользователей, включая без заказов"})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"NULL — отсутствие значения"}),s.jsx("p",{className:"theory-intro",children:"NULL — это не ноль и не пустая строка. Это «значение неизвестно или отсутствует». С NULL нужно работать через специальные операторы."}),s.jsx(r,{headers:["Оператор / функция","Что делает","Пример"],rows:[["IS NULL","Проверить, что значение NULL","WHERE city IS NULL"],["IS NOT NULL","Проверить, что значение не NULL","WHERE city IS NOT NULL"],["COALESCE(a, b, c)","Первое ненулевое значение из списка","COALESCE(phone, email, 'нет контакта')"],["IFNULL(a, b)","Если a = NULL — вернуть b (SQLite/MySQL)","IFNULL(price, 0)"],["NULLIF(a, b)","Если a = b — вернуть NULL, иначе a","NULLIF(score, 0)"]]}),s.jsx(e,{language:"sql",code:`-- Пользователи без указанного города
SELECT name FROM users WHERE city IS NULL;

-- Заменить NULL на текст "Не указан"
SELECT name, COALESCE(city, 'Не указан') AS city
FROM users;

-- Сумма с заменой NULL на 0
SELECT u.name, COALESCE(SUM(o.price), 0) AS total
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
GROUP BY u.id, u.name;`}),s.jsxs(c,{title:"Важно про NULL",children:[s.jsxs("p",{children:["NULL ≠ NULL. Сравнение ",s.jsx("code",{children:"WHERE city = NULL"})," никогда не сработает — используй ",s.jsx("code",{children:"IS NULL"}),"."]}),s.jsxs("p",{style:{marginTop:"8px"},children:["Агрегатные функции игнорируют NULL: ",s.jsx("code",{children:"AVG()"})," считает только ненулевые значения."]})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"CASE WHEN — условная логика в SQL"}),s.jsxs("p",{className:"theory-intro",children:["CASE WHEN — это аналог ",s.jsx("code",{children:"if/else"})," прямо внутри SQL-запроса. Позволяет создавать новые поля на основе условий."]}),s.jsx(e,{language:"sql",code:`SELECT name, age,
  CASE
    WHEN age < 18 THEN 'несовершеннолетний'
    WHEN age BETWEEN 18 AND 25 THEN 'молодой'
    WHEN age BETWEEN 26 AND 40 THEN 'взрослый'
    ELSE 'старший'
  END AS age_group
FROM users;`}),s.jsx(i,{name:"результат",columns:["name","age","age_group"],rows:[["Анна","25","молодой"],["Борис","31","взрослый"],["Вера","19","молодой"],["Глеб","42","старший"],["Дина","28","взрослый"]],highlightCols:[2],caption:"CASE WHEN вычисляет новый столбец age_group для каждой строки"}),s.jsx(e,{language:"sql",code:`-- CASE WHEN внутри COUNT для подсчёта по условию
SELECT
  COUNT(*) AS total_users,
  COUNT(CASE WHEN city = 'Москва' THEN 1 END) AS moscow_users,
  COUNT(CASE WHEN age >= 30 THEN 1 END) AS users_30_plus
FROM users;`})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Подзапросы (Subqueries)"}),s.jsx("p",{className:"theory-intro",children:"Подзапрос — это SELECT внутри другого SELECT, WHERE или FROM. Выполняется первым, его результат используется внешним запросом."}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"Подзапрос в WHERE"}),s.jsx(e,{language:"sql",code:`-- Найти пользователей старше среднего возраста
SELECT name, age
FROM users
WHERE age > (SELECT AVG(age) FROM users);`}),s.jsxs("p",{className:"theory-text",children:["Внутренний запрос ",s.jsx("code",{children:"SELECT AVG(age)"})," считается первым → возвращает число (29) → внешний запрос фильтрует строки с age > 29."]}),s.jsx(i,{name:"результат",columns:["name","age"],rows:[["Борис","31"],["Глеб","42"]],highlightRows:[0,1],caption:"AVG(age) = 29. Борис (31) и Глеб (42) старше среднего."})]}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"Подзапрос с IN"}),s.jsx(e,{language:"sql",code:`-- Пользователи, сделавшие хотя бы один заказ
SELECT name FROM users
WHERE id IN (SELECT DISTINCT user_id FROM orders);

-- Пользователи, НЕ сделавшие ни одного заказа
SELECT name FROM users
WHERE id NOT IN (SELECT DISTINCT user_id FROM orders);`})]}),s.jsxs("div",{className:"theory-subsection",children:[s.jsx("h3",{className:"theory-heading-3",children:"Подзапрос в FROM (derived table)"}),s.jsx(e,{language:"sql",code:`-- Средняя сумма заказа по городам через подзапрос
SELECT city, AVG(total) AS avg_total
FROM (
  SELECT u.city, SUM(o.price) AS total
  FROM users AS u
  JOIN orders AS o ON u.id = o.user_id
  GROUP BY u.id, u.city
) AS user_totals
GROUP BY city;`}),s.jsxs("p",{className:"theory-text",children:["Подзапрос в FROM создаёт временную таблицу ",s.jsx("code",{children:"user_totals"}),", по которой делается внешний запрос."]})]}),s.jsx(r,{headers:["Тип","Где пишется","Что возвращает","Пример"],rows:[["Скалярный","WHERE, SELECT","Одно значение","WHERE age > (SELECT AVG(age) FROM users)"],["Строчный","WHERE IN / NOT IN","Список значений","WHERE id IN (SELECT user_id FROM orders)"],["Табличный","FROM","Временная таблица","FROM (SELECT ...) AS sub"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"UNION — объединение результатов"}),s.jsx("p",{className:"theory-intro",children:"UNION объединяет результаты двух SELECT в один. Требует одинакового числа столбцов и совместимых типов."}),s.jsx(e,{language:"sql",code:`-- Все города из users + все города из другой таблицы
SELECT city, 'user' AS source FROM users
UNION
SELECT city, 'store' AS source FROM stores;

-- UNION ALL — включая дубликаты (быстрее)
SELECT city FROM users
UNION ALL
SELECT city FROM users;   -- дублирует строки

-- UNION — без дубликатов (делает DISTINCT автоматически)
SELECT city FROM users
UNION
SELECT city FROM users;`}),s.jsx(r,{headers:["","UNION","UNION ALL"],rows:[["Дубликаты","Удаляет (DISTINCT)","Оставляет все"],["Скорость","Медленнее (сортировка для DISTINCT)","Быстрее"],["Использование","Когда дубли не нужны","Когда дубли допустимы"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"CREATE TABLE и типы данных"}),s.jsx("p",{className:"theory-intro",children:"При создании таблицы каждый столбец получает тип данных. Тип определяет что можно хранить и сколько памяти занимает."}),s.jsx(e,{language:"sql",code:`CREATE TABLE products (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  name     TEXT NOT NULL,
  price    REAL DEFAULT 0,
  stock    INTEGER DEFAULT 0,
  category TEXT,
  created  TEXT DEFAULT (datetime('now'))  -- SQLite
);`}),s.jsx(r,{headers:["Тип (SQLite)","Аналог в других БД","Что хранит","Пример"],rows:[["INTEGER","INT, BIGINT","Целые числа","42, -5, 0"],["REAL","FLOAT, DOUBLE","Числа с точкой","3.14, -0.5"],["TEXT","VARCHAR, CHAR","Строки любой длины","'Анна', 'Москва'"],["BLOB","BINARY","Бинарные данные","файлы, изображения"],["NULL","—","Отсутствие значения","NULL"]]}),s.jsx(r,{headers:["Ограничение","Что делает","Пример"],rows:[["PRIMARY KEY","Уникальный идентификатор строки","id INTEGER PRIMARY KEY"],["NOT NULL","Запрещает NULL","name TEXT NOT NULL"],["UNIQUE","Значение не повторяется","email TEXT UNIQUE"],["DEFAULT","Значение по умолчанию","stock INTEGER DEFAULT 0"],["CHECK","Проверка условия","CHECK (price >= 0)"],["FOREIGN KEY","Ссылка на другую таблицу","FOREIGN KEY (user_id) REFERENCES users(id)"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Нормализация"}),s.jsx("p",{className:"theory-intro",children:"Нормализация — разбиение данных на таблицы так, чтобы избежать дублирования."}),s.jsxs(c,{title:"Без нормализации — плохо",children:[s.jsx("p",{children:"orders: id | user_name | user_city | product | price"}),s.jsx("p",{children:"Если Анна переезжает — нужно обновить city во ВСЕХ её заказах."})]}),s.jsxs(c,{title:"С нормализацией — хорошо",children:[s.jsx("p",{children:"users: id | name | city (Анна обновляется в ONE месте)"}),s.jsx("p",{children:"orders: id | user_id | product | price (ссылаемся на users.id)"})]}),s.jsxs("ul",{className:"theory-list",children:[s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"1НФ"})," — каждая ячейка хранит одно атомарное значение, нет повторяющихся групп"]}),s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"2НФ"})," — таблица в 1НФ, все неключевые поля зависят от всего первичного ключа"]}),s.jsxs("li",{className:"theory-list-item",children:[s.jsx("strong",{children:"3НФ"})," — таблица в 2НФ, нет транзитивных зависимостей (поле не зависит от другого неключевого)"]})]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"SQL vs NoSQL"}),s.jsx(r,{headers:["Критерий","SQL (реляционные)","NoSQL"],rows:[["Структура","Таблицы со схемой","Документы, ключ-значение, граф"],["Схема","Строгая (нужно определить заранее)","Гибкая (поля разные у каждой записи)"],["Связи","JOIN, FOREIGN KEY","Вложенные объекты или ссылки"],["Масштабирование","Вертикальное (мощнее сервер)","Горизонтальное (больше серверов)"],["Запросы","SQL — стандарт","Своё API у каждой БД"],["Примеры","PostgreSQL, MySQL, SQLite","MongoDB, Redis, Cassandra"],["Когда","Банк, магазин, CRM — строгие связи","Кэш, логи, соцсеть — гибкость и скорость"]]})]}),s.jsxs("section",{className:"theory-section",children:[s.jsx("h2",{className:"theory-heading-2",children:"Итог трёх дней SQL"}),s.jsx(r,{headers:["День","Тема","Что изучили"],rows:[["17","Основы","Таблицы, SELECT, WHERE, IN/BETWEEN/LIKE, ORDER BY, LIMIT, DISTINCT"],["18","Агрегация и изменение","COUNT/SUM/AVG/MAX/MIN, GROUP BY, HAVING, INSERT, UPDATE, DELETE"],["19","Связи и продвинутый SQL","Ключи, JOIN (INNER/LEFT), NULL, CASE WHEN, Подзапросы, UNION, CREATE TABLE, Нормализация"]]}),s.jsxs("div",{style:{marginTop:"20px"},children:[s.jsx("h3",{className:"theory-heading-3",children:"Полный порядок выполнения SELECT"}),s.jsx(e,{language:"sql",code:`SELECT   [DISTINCT] колонки     -- 6: выбрать колонки
FROM     таблица                  -- 1: из какой таблицы
JOIN     другая ON условие        -- 2: соединить
WHERE    условие_строк            -- 3: фильтр строк
GROUP BY колонка                  -- 4: сгруппировать
HAVING   условие_групп            -- 5: фильтр групп
ORDER BY колонка [ASC|DESC]       -- 7: сортировка
LIMIT    N OFFSET M;              -- 8: ограничение`}),s.jsxs("p",{className:"theory-text",style:{marginTop:"8px"},children:["Запомни: ",s.jsx("strong",{children:"SQL не выполняется сверху вниз"}),". Порядок выполнения: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT."]})]})]}),s.jsx("section",{className:"theory-section theory-section--closing",children:s.jsx("p",{className:"theory-closing-text",children:"SQL — один из самых востребованных навыков в IT. Ты прошёл все основы за три дня. Теперь практикуйся на реальных данных! 📊"})})]})}export{t as default};
