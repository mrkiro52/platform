// Индивидуальная программа «Продуктовая аналитика», глава 2 — SQL.
// Конспект собран из ликбеза по SQL (/likebezy/sql) и материалов четвёртой недели
// осеннего лагеря (src/data/week4/sql.js). Примеры написаны на учебной базе
// SQL-тренажёра (backend/src/sqlTrainer) — задание к главе решается на ней же.

export default {
  num: 2,
  title: 'SQL для продуктового аналитика',
  summary: 'Базы данных, SELECT и фильтрация, агрегаты и GROUP BY, JOIN, подзапросы и CTE, NULL и CASE, оконные функции и типовые продуктовые запросы.',
  intro: 'SQL — главный рабочий инструмент продуктового аналитика. Метрики из первой главы — DAU, конверсия, retention, средний чек — в жизни считаются запросами к базе: дашборд показывает уже готовую цифру, а аналитик должен уметь получить её сам, проверить и разложить на части. На собеседовании SQL проверяют почти всегда, обычно задачей в реальном времени. В этой главе собран весь SQL, который нужен джуну: от первого SELECT до оконных функций и типовых продуктовых запросов. Все примеры написаны на учебной базе маркетплейса — на ней же работает SQL-тренажёр, который и есть задание к главе.',
  sections: [
    {
      id: 'db',
      num: '2.1',
      title: 'Базы данных и SQL',
      blocks: [
        { t: 'h3', text: '2.1.1. Что такое база данных' },
        { t: 'p', text: '**База данных** — организованное хранилище данных, которым управляет специальная программа — **СУБД** (система управления базами данных). Почти каждое приложение хранит данные в базе: пользователей, заказы, товары, события в приложении.' },
        { t: 'p', text: 'Чем база лучше файла Excel: с ней одновременно работают тысячи пользователей и программ, она гарантирует целостность данных через ограничения и связи, выдерживает миллиарды строк и позволяет делать сложные запросы на языке SQL.' },
        { t: 'p', text: '**SQL** (Structured Query Language) — язык запросов к реляционным базам данных. Его главная особенность: ты описываешь, **что** хочешь получить, а не как это искать. Как именно найти данные, решает сама база.' },
        { t: 'h3', text: '2.1.2. Реляционная модель: таблицы, ключи, связи' },
        { t: 'p', text: 'Реляционная база хранит данные в **таблицах**: строки — это записи (один заказ, один покупатель), столбцы — поля (сумма, дата, статус). Таблицы связаны между собой через ключи.' },
        { t: 'ul', items: [
          '**Первичный ключ** (primary key) — столбец, который однозначно определяет строку: значения не повторяются и не бывают пустыми. Обычно это id.',
          '**Внешний ключ** (foreign key) — столбец, который ссылается на первичный ключ другой таблицы. Например, orders.customer_id указывает на customers.id: так заказ «знает», чей он.',
        ] },
        { t: 'p', text: 'Данные раскладывают по разным таблицам, чтобы не дублировать их. Если бы адрес покупателя хранился в каждом его заказе, при переезде пришлось бы исправлять сотни строк. Вместо этого покупатель записан один раз, а заказы ссылаются на него по id. Платой за это становится необходимость соединять таблицы в запросах — этим занимается JOIN.' },
        { t: 'h3', text: '2.1.3. Группы команд SQL' },
        { t: 'table', caption: 'Таблица 1. Четыре группы команд', headers: ['Группа', 'Команды', 'Что делает'], rows: [
          ['DDL — Data Definition Language', 'CREATE, ALTER, DROP', 'создаёт и меняет структуру: таблицы, столбцы'],
          ['DML — Data Manipulation Language', 'INSERT, UPDATE, DELETE', 'добавляет, меняет и удаляет данные'],
          ['DQL — Data Query Language', 'SELECT', 'читает данные'],
          ['DCL — Data Control Language', 'GRANT, REVOKE', 'управляет правами доступа'],
        ] },
        { t: 'p', text: 'Продуктовый аналитик 95% времени пишет SELECT: читает данные и считает по ним метрики. Права на изменение данных в рабочих базах у аналитика обычно вообще нет, и это правильно. Остальные команды нужно понимать, чтобы читать схему таблиц и разговаривать с разработчиками на одном языке.' },
        { t: 'h3', text: '2.1.4. Типы данных и ограничения' },
        { t: 'p', text: 'При создании таблицы для каждого столбца задаётся тип и, при необходимости, ограничения:' },
        { t: 'code', text: `CREATE TABLE customers (
    id             INTEGER PRIMARY KEY,
    email          TEXT    NOT NULL UNIQUE,
    city           TEXT,
    loyalty_points INTEGER DEFAULT 0 CHECK (loyalty_points >= 0),
    registered_at  TEXT    NOT NULL
);

CREATE TABLE orders (
    id           INTEGER PRIMARY KEY,
    customer_id  INTEGER NOT NULL REFERENCES customers(id),
    status       TEXT    NOT NULL DEFAULT 'new',
    total_amount INTEGER NOT NULL,
    created_at   TEXT    NOT NULL
);` },
        { t: 'table', caption: 'Таблица 2. Основные типы данных', headers: ['Что хранит', 'PostgreSQL', 'SQLite', 'Пример'], rows: [
          ['целые числа', 'INTEGER, BIGINT', 'INTEGER', 'id, количество, сумма в рублях'],
          ['дробные числа', 'NUMERIC, DOUBLE PRECISION', 'REAL', 'рейтинг, цена с копейками'],
          ['текст', 'TEXT, VARCHAR(n)', 'TEXT', 'имя, статус, город'],
          ['логическое', 'BOOLEAN', 'INTEGER 0 и 1', 'флаг «подтверждён»'],
          ['дата и время', 'DATE, TIMESTAMP', 'TEXT вида 2026-09-15 12:30:00', 'дата регистрации, заказа'],
        ] },
        { t: 'table', caption: 'Таблица 3. Ограничения', headers: ['Ограничение', 'Что гарантирует'], rows: [
          ['PRIMARY KEY', 'значение уникально и не пусто — однозначный идентификатор строки'],
          ['NOT NULL', 'значение обязательно'],
          ['UNIQUE', 'значение не повторяется в столбце'],
          ['DEFAULT', 'значение по умолчанию, если при вставке его не указали'],
          ['CHECK', 'значение удовлетворяет условию, например сумма не отрицательная'],
          ['FOREIGN KEY / REFERENCES', 'значение есть в связанной таблице — нельзя создать заказ несуществующему покупателю'],
        ] },
        { t: 'note', text: 'Для аналитика ограничения — подсказка о данных. Если у столбца нет NOT NULL, в нём **могут быть пропуски**, и запрос должен это учитывать. Если у customer_id нет внешнего ключа, в заказах могут встретиться ссылки на несуществующих покупателей.' },
        { t: 'h3', text: '2.1.5. Изменение данных: INSERT, UPDATE, DELETE' },
        { t: 'code', text: `-- Добавить строку (столбцы лучше перечислять явно)
INSERT INTO customers (email, city, registered_at)
VALUES ('anna@mail.ru', 'Москва', '2026-09-01 10:00:00');

-- Изменить строки, подходящие под условие
UPDATE customers SET city = 'Казань' WHERE id = 15;

-- Удалить строки, подходящие под условие
DELETE FROM customers WHERE id = 15;` },
        { t: 'note', text: '**Всегда пиши WHERE в UPDATE и DELETE.** Без условия изменятся или удалятся все строки таблицы. Безопасный приём: сначала выполни SELECT с тем же WHERE и убедись, что выбираются нужные строки.' },
        { t: 'h3', text: '2.1.6. Какие бывают базы и где работает аналитик' },
        { t: 'p', text: 'Базы делят на два больших класса по назначению:' },
        { t: 'ul', items: [
          '**OLTP** (транзакционные) — обслуживают само приложение: быстро записывают и читают отдельные строки, когда пользователь оформляет заказ. Примеры: PostgreSQL, MySQL. Строки хранятся целиком, одна за другой.',
          '**OLAP** (аналитические) — созданы для тяжёлых запросов по миллиардам строк: суммы, группировки, отчёты. Примеры: ClickHouse, Greenplum, BigQuery, Vertica. Данные хранятся по столбцам, поэтому посчитать сумму одного столбца по всей таблице очень быстро.',
        ] },
        { t: 'p', text: 'Продуктовый аналитик почти всегда работает с **аналитическим хранилищем** (DWH): данные из рабочих баз приложения и события из мобильного приложения выгружаются туда регулярно — раз в час или раз в сутки. Поэтому вчерашние данные обычно уже есть, а за последние минуты — ещё нет.' },
        { t: 'table', caption: 'Таблица 4. Популярные СУБД', headers: ['СУБД', 'Тип', 'Где встречается'], rows: [
          ['PostgreSQL', 'реляционная, OLTP', 'основная база множества приложений, часто и для аналитики на небольших объёмах'],
          ['MySQL', 'реляционная, OLTP', 'веб-проекты и сайты'],
          ['SQLite', 'реляционная, встраиваемая', 'мобильные приложения, обучение; на ней работает наш тренажёр'],
          ['ClickHouse', 'колоночная, OLAP', 'продуктовая аналитика, события, логи; стандарт в российском бигтехе'],
          ['MongoDB', 'документная, NoSQL', 'каталоги и данные с гибкой структурой'],
          ['Redis', 'ключ-значение в памяти', 'кэш, сессии, очереди; аналитик с ним почти не работает'],
        ] },
        { t: 'p', text: 'Синтаксис SQL в разных СУБД совпадает на 90%: SELECT, WHERE, GROUP BY, JOIN и оконные функции работают везде одинаково. Различаются в основном функции для дат и строк — о них в разделе 2.6.' },
        { t: 'h3', text: '2.1.7. Учебная база: маркетплейс' },
        { t: 'p', text: 'Все примеры главы и все задачи тренажёра написаны на одной базе — упрощённой копии маркетплейса электроники и товаров для дома. В ней пять таблиц:' },
        { t: 'table', caption: 'Таблица 5. Таблицы учебной базы', headers: ['Таблица', 'Что хранит', 'Главные столбцы'], rows: [
          ['customers', 'покупатели', 'id, email, phone, first_name, city, gender, registered_at, last_login_at, is_verified, deleted_at'],
          ['categories', 'разделы каталога', 'id, parent_id (родительский раздел), name, is_active'],
          ['products', 'товары', 'id, sku, name, brand, category_id → categories, price, old_price, stock, rating, is_active'],
          ['orders', 'заказы', 'id, customer_id → customers, status, payment_method, promo_code, delivery_type, delivery_city, subtotal, discount_amount, delivery_price, total_amount, created_at, paid_at, delivered_at'],
          ['order_items', 'позиции заказов', 'id, order_id → orders, product_id → products, quantity, unit_price'],
        ] },
        { t: 'p', text: 'Статусы заказа: new, processing, paid, shipped, delivered, cancelled, returned. Даты хранятся текстом вида 2026-09-15 12:30:00 — такие строки можно сравнивать между собой как обычные даты. Во многих столбцах встречаются пропуски: у покупателя может не быть телефона и города, у товара — бренда и рейтинга.' },
        { t: 'flow', steps: ['customers', 'orders', 'order_items', 'products', 'categories'] },
      ],
      terms: [
        ['СУБД', 'система управления базами данных — программа, которая хранит данные и выполняет запросы.'],
        ['DWH', 'Data Warehouse, аналитическое хранилище данных.'],
        ['OLTP', 'Online Transaction Processing — базы для работы приложения: много коротких операций записи и чтения.'],
        ['OLAP', 'Online Analytical Processing — базы для аналитики: тяжёлые запросы с агрегатами по большим объёмам.'],
      ],
    },
    {
      id: 'select',
      num: '2.2',
      title: 'SELECT, WHERE, ORDER BY и LIMIT',
      blocks: [
        { t: 'h3', text: '2.2.1. SELECT и FROM: первый запрос' },
        { t: 'code', text: `-- Все строки и все столбцы таблицы
SELECT * FROM categories;

-- Только нужные столбцы
SELECT id, email, city FROM customers;` },
        { t: 'p', text: 'SELECT перечисляет столбцы, FROM указывает таблицу. Звёздочка означает «все столбцы».' },
        { t: 'note', text: 'В рабочих запросах SELECT * лучше не писать. По сети тянутся лишние данные, а в колоночных хранилищах вроде ClickHouse запрос читает каждый столбец отдельно и становится в разы медленнее и дороже. Перечисляй нужные столбцы явно.' },
        { t: 'p', text: '**Псевдонимы и вычисления.** В SELECT можно считать: арифметика и функции вычисляются для каждой строки, а AS даёт результату понятное имя. Исходная таблица при этом не меняется — SELECT только читает.' },
        { t: 'code', text: `SELECT
    id,
    total_amount - delivery_price  AS goods_amount,  -- сумма без доставки
    ROUND(total_amount * 0.9, 2)   AS with_discount,
    UPPER(status)                  AS status_upper
FROM orders;` },
        { t: 'p', text: '**DISTINCT** убирает повторы. Важно: он применяется ко всей строке результата, а не к первому столбцу.' },
        { t: 'code', text: `-- Какие бывают статусы заказов
SELECT DISTINCT status FROM orders;

-- Все встречающиеся пары «способ доставки + способ оплаты»
SELECT DISTINCT delivery_type, payment_method FROM orders;` },
        { t: 'p', text: 'Комментарии пишутся через два дефиса до конца строки или между /* и */. В рабочих запросах комментарий объясняет, зачем сделан шаг: «исключаем тестовые заказы», «берём только оплаченные».' },
        { t: 'h3', text: '2.2.2. WHERE: фильтрация строк' },
        { t: 'p', text: 'WHERE оставляет только строки, для которых условие истинно.' },
        { t: 'table', caption: 'Таблица 6. Что можно писать в условии', headers: ['Оператор', 'Смысл', 'Пример'], rows: [
          ['=  !=  <>', 'равно, не равно', "status = 'delivered'"],
          ['>  <  >=  <=', 'сравнение', 'price >= 5000'],
          ['AND  OR  NOT', 'логика', "status = 'cancelled' AND total_amount > 50000"],
          ['BETWEEN a AND b', 'диапазон, обе границы включаются', 'price BETWEEN 5000 AND 10000'],
          ['IN (…)', 'одно из списка', "status IN ('cancelled', 'returned')"],
          ['LIKE', 'шаблон строки', "name LIKE '%Pro%'"],
          ['IS NULL / IS NOT NULL', 'проверка на пустоту', 'phone IS NULL'],
        ] },
        { t: 'code', text: `-- Отменённые заказы дороже 50 000 рублей
SELECT id, customer_id, total_amount
FROM orders
WHERE status = 'cancelled' AND total_amount > 50000;

-- Заказы сентября 2026: даты-строки сравниваются как даты
SELECT id, created_at
FROM orders
WHERE created_at >= '2026-09-01' AND created_at < '2026-10-01';` },
        { t: 'p', text: 'Для периода надёжнее писать «больше или равно начала и строго меньше начала следующего периода», чем BETWEEN: BETWEEN \'2026-09-01\' AND \'2026-09-30\' потеряет заказы 30 сентября после полуночи, потому что строка 2026-09-30 15:00:00 больше, чем 2026-09-30.' },
        { t: 'p', text: '**LIKE** ищет по шаблону: % — любое количество любых символов, включая ноль; _ — ровно один символ. Сравнение строк чувствительно к регистру: Apple и apple — разные значения. В PostgreSQL для поиска без учёта регистра есть ILIKE.' },
        { t: 'code', text: `WHERE name LIKE 'Apple%'   -- начинается с Apple
WHERE name LIKE '%Pro%'    -- содержит Pro
WHERE email LIKE '%@gmail.com'` },
        { t: 'p', text: '**AND выполняется раньше OR.** Это частый источник ошибок:' },
        { t: 'code', text: `-- База прочитает это как: Москва ИЛИ (Казань И дороже 1000)
WHERE delivery_city = 'Москва' OR delivery_city = 'Казань' AND total_amount > 1000

-- Что обычно имелось в виду
WHERE (delivery_city = 'Москва' OR delivery_city = 'Казань') AND total_amount > 1000` },
        { t: 'note', text: 'Правило: как только в условии встретились и AND, и OR, ставь скобки явно.' },
        { t: 'h3', text: '2.2.3. NULL в условиях' },
        { t: 'p', text: '**NULL** — не ноль и не пустая строка, а «значение неизвестно». Главное следствие: **NULL не равен ничему, даже самому себе**. Сравнение с NULL даёт не TRUE и не FALSE, а снова NULL, и WHERE такую строку отбрасывает.' },
        { t: 'code', text: `-- Не работает: вернёт 0 строк всегда
WHERE phone = NULL

-- Правильно
WHERE phone IS NULL
WHERE phone IS NOT NULL` },
        { t: 'example', label: 'Ловушка неравенства', text: 'Запрос «все товары, кроме Samsung» — WHERE brand <> \'Samsung\' — потеряет товары без бренда: для них сравнение даёт NULL. Правильно: WHERE brand <> \'Samsung\' OR brand IS NULL. Эта задача есть в тренажёре.' },
        { t: 'h3', text: '2.2.4. ORDER BY, LIMIT и OFFSET' },
        { t: 'p', text: 'Без ORDER BY порядок строк **не определён**: база возвращает их так, как ей удобнее, и порядок может меняться между запусками.' },
        { t: 'code', text: `-- Пять самых крупных доставленных заказов
SELECT id, total_amount
FROM orders
WHERE status = 'delivered'
ORDER BY total_amount DESC, id   -- при равных суммах — по номеру
LIMIT 5;

-- Вторая «страница» по 10 строк
SELECT id, name, price FROM products
ORDER BY price DESC, id
LIMIT 10 OFFSET 10;` },
        { t: 'ul', items: [
          'ASC — по возрастанию (по умолчанию), DESC — по убыванию. Сортировать можно по нескольким столбцам: сначала по первому, при равенстве — по второму.',
          'В ORDER BY можно использовать псевдоним из SELECT — сортировка выполняется после SELECT.',
          'LIMIT без ORDER BY почти всегда ошибка: «первые 5 строк» без порядка означает «5 случайных строк».',
          'Добавляй в сортировку уникальный столбец (обычно id), чтобы при равных значениях порядок был однозначным — тренажёр проверяет именно такой порядок.',
          'NULL при сортировке в PostgreSQL по умолчанию оказывается в конце при ASC; управлять этим можно через NULLS FIRST и NULLS LAST. В SQLite NULL считается меньше любого значения и при ASC стоит в начале.',
        ] },
      ],
      terms: [],
    },
    {
      id: 'group',
      num: '2.3',
      title: 'Агрегаты, GROUP BY и HAVING',
      blocks: [
        { t: 'h3', text: '2.3.1. Агрегатные функции' },
        { t: 'p', text: 'Агрегатные функции схлопывают много строк в одно число.' },
        { t: 'table', caption: 'Таблица 7. Агрегатные функции', headers: ['Функция', 'Что считает', 'Как ведёт себя с NULL'], rows: [
          ['COUNT(*)', 'количество строк', 'считает все строки'],
          ['COUNT(col)', 'количество заполненных значений', 'пропускает NULL'],
          ['COUNT(DISTINCT col)', 'количество уникальных значений', 'пропускает NULL'],
          ['SUM(col)', 'сумма', 'пропускает NULL'],
          ['AVG(col)', 'среднее', 'пропускает NULL — делит на число заполненных'],
          ['MIN(col), MAX(col)', 'минимум и максимум', 'пропускают NULL'],
        ] },
        { t: 'code', text: `SELECT
    COUNT(*)                    AS orders,
    COUNT(promo_code)           AS with_promo,     -- заказы с промокодом
    COUNT(DISTINCT customer_id) AS buyers,         -- уникальные покупатели
    SUM(total_amount)           AS revenue,
    AVG(total_amount)           AS avg_check
FROM orders
WHERE status = 'delivered';` },
        { t: 'note', text: 'Разница между COUNT(*) и COUNT(col) — классический вопрос собеседования. Их разность равна количеству пропусков в столбце: SELECT COUNT(*) - COUNT(rating) FROM products — сколько товаров без оценки.' },
        { t: 'example', label: 'AVG и пропуски', text: 'У 10 товаров рейтинг заполнен у 6. AVG(rating) делит сумму на 6, а не на 10. Если товар без оценок нужно считать как оценку 0, пишут AVG(COALESCE(rating, 0)). Что правильно — зависит от вопроса: обычно пропуски не превращают в нули, но важно понимать, что именно ты посчитал.' },
        { t: 'h3', text: '2.3.2. GROUP BY: считать по группам' },
        { t: 'p', text: 'GROUP BY разбивает строки на группы по значению столбца, и агрегат считается отдельно для каждой группы. На выходе — по одной строке на группу.' },
        { t: 'code', text: `-- Сколько заказов в каждом статусе
SELECT status, COUNT(*) AS orders
FROM orders
GROUP BY status
ORDER BY orders DESC;

-- Средний чек по способам оплаты
SELECT payment_method, AVG(total_amount) AS avg_check
FROM orders
GROUP BY payment_method;` },
        { t: 'p', text: '**Главное правило:** каждый столбец в SELECT должен быть либо в GROUP BY, либо внутри агрегатной функции. Иначе база не знает, какое из значений группы показать. PostgreSQL на такой запрос выдаст ошибку, а SQLite молча вернёт значение из случайной строки группы — это ещё опаснее.' },
        { t: 'p', text: 'Группировать можно по нескольким столбцам — тогда группой считается уникальная комбинация значений:' },
        { t: 'code', text: `SELECT delivery_city, status, COUNT(*) AS orders
FROM orders
GROUP BY delivery_city, status
ORDER BY delivery_city, orders DESC;` },
        { t: 'h3', text: '2.3.3. HAVING: фильтр групп' },
        { t: 'p', text: 'WHERE фильтрует строки **до** группировки, HAVING — готовые группы **после** неё, по значениям агрегатов.' },
        { t: 'code', text: `-- Города, где доставленных заказов больше чем на 25 млн рублей
SELECT delivery_city, SUM(total_amount) AS revenue
FROM orders
WHERE status = 'delivered'           -- фильтр строк: только доставленные
GROUP BY delivery_city
HAVING SUM(total_amount) > 25000000  -- фильтр групп по агрегату
ORDER BY revenue DESC;` },
        { t: 'note', text: 'Если условие можно записать в WHERE, записывай туда, а не в HAVING: WHERE отсекает строки раньше, до тяжёлой группировки, и запрос работает быстрее.' },
        { t: 'h3', text: '2.3.4. Порядок выполнения запроса' },
        { t: 'p', text: 'Запрос пишется с SELECT, а выполняется с FROM. Из этого порядка выводятся почти все «странности» SQL.' },
        { t: 'table', caption: 'Таблица 8. Логический порядок выполнения', headers: ['Шаг', 'Часть запроса', 'Что делает'], rows: [
          ['1', 'FROM и JOIN', 'берёт и соединяет таблицы'],
          ['2', 'WHERE', 'фильтрует отдельные строки'],
          ['3', 'GROUP BY', 'схлопывает строки в группы'],
          ['4', 'HAVING', 'фильтрует группы по агрегатам'],
          ['5', 'SELECT', 'вычисляет выражения и оконные функции, назначает псевдонимы'],
          ['6', 'DISTINCT', 'убирает повторы'],
          ['7', 'ORDER BY', 'сортирует'],
          ['8', 'LIMIT / OFFSET', 'отрезает нужное количество строк'],
        ] },
        { t: 'ul', items: [
          '**В WHERE нельзя использовать агрегаты:** на шаге 2 групп ещё нет. WHERE COUNT(*) > 5 — ошибка, нужен HAVING.',
          '**В WHERE нельзя использовать псевдонимы из SELECT:** они появляются только на шаге 5. Выражение придётся повторить или обернуть запрос в подзапрос.',
          '**В ORDER BY псевдонимы можно:** сортировка идёт после SELECT.',
          '**В HAVING псевдонимы по стандарту нельзя** — HAVING выполняется до SELECT. PostgreSQL выдаст ошибку, а SQLite и MySQL такой запрос прощают. Надёжнее повторять выражение: HAVING COUNT(*) > 10.',
        ] },
      ],
      terms: [],
    },
    {
      id: 'join',
      num: '2.4',
      title: 'JOIN: соединение таблиц',
      blocks: [
        { t: 'h3', text: '2.4.1. Зачем соединять таблицы' },
        { t: 'p', text: 'В отчёте нужны вместе почта покупателя и сумма его заказа, а лежат они в разных таблицах. JOIN соединяет строки двух таблиц по условию в одну «широкую» строку.' },
        { t: 'code', text: `-- Кто вернул заказ: номер заказа и почта покупателя
SELECT o.id, c.email
FROM orders o
JOIN customers c ON c.id = o.customer_id
WHERE o.status = 'returned';` },
        { t: 'p', text: 'ON задаёт условие соединения: какая строка одной таблицы соответствует какой строке другой. Псевдонимы o и c сокращают запись и снимают неоднозначность, когда столбцы в таблицах называются одинаково (id есть в обеих).' },
        { t: 'h3', text: '2.4.2. Виды JOIN' },
        { t: 'table', caption: 'Таблица 9. Что попадает в результат', headers: ['Вид', 'Что берёт', 'Когда нужен'], rows: [
          ['INNER JOIN (просто JOIN)', 'только строки, для которых нашлась пара', 'заказы вместе с их покупателями'],
          ['LEFT JOIN', 'все строки левой таблицы + пары справа; где пары нет — NULL', 'все покупатели, даже без заказов'],
          ['RIGHT JOIN', 'то же зеркально', 'пишут редко: проще поменять таблицы местами'],
          ['FULL JOIN', 'все строки обеих таблиц', 'сверка двух списков'],
        ] },
        { t: 'example', label: 'Сколько строк вернёт', text: 'В customers 100 строк, в orders 250, у 20 покупателей заказов нет. INNER JOIN вернёт 250 строк — по строке на заказ. LEFT JOIN от покупателей вернёт 270: 250 строк с заказами плюс 20 строк с NULL вместо данных заказа.' },
        { t: 'h3', text: '2.4.3. Найти строки без пары' },
        { t: 'code', text: `-- Покупатели, которые не сделали ни одного заказа
SELECT c.id, c.email
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;` },
        { t: 'p', text: 'Приём, который стоит запомнить: LEFT JOIN плюс проверка на NULL по столбцу правой таблицы оставляет ровно те строки, для которых пары не нашлось. Так же ищут товары, которые ни разу не покупали, и разделы каталога без товаров.' },
        { t: 'h3', text: '2.4.4. JOIN вместе с агрегатами' },
        { t: 'code', text: `-- Сколько заказов у каждого покупателя из Сочи, включая тех, у кого их нет
SELECT
    c.id,
    c.first_name,
    COUNT(o.id)                     AS orders,
    COALESCE(SUM(o.total_amount), 0) AS spent
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE c.city = 'Сочи'
GROUP BY c.id, c.first_name;` },
        { t: 'p', text: 'Две важные детали. **COUNT(o.id), а не COUNT(*)**: звёздочка посчитала бы и строку с NULL, и у покупателя без заказов вышла бы единица вместо нуля. **COALESCE** заменяет NULL от SUM на ноль.' },
        { t: 'note', text: 'Условие на правую таблицу в WHERE превращает LEFT JOIN в INNER: строки с NULL не пройдут фильтр. Если нужно «все покупатели и только их доставленные заказы», условие ставят в ON: LEFT JOIN orders o ON o.customer_id = c.id AND o.status = \'delivered\'.' },
        { t: 'h3', text: '2.4.5. Несколько таблиц и соединение таблицы с собой' },
        { t: 'code', text: `-- Выручка по разделам каталога: позиции → заказы → товары → разделы
SELECT cat.name, SUM(oi.quantity * oi.unit_price) AS revenue
FROM order_items oi
JOIN orders o       ON o.id = oi.order_id
JOIN products p     ON p.id = oi.product_id
JOIN categories cat ON cat.id = p.category_id
WHERE o.status = 'delivered'
GROUP BY cat.name
ORDER BY revenue DESC;

-- Раздел и его родительский раздел: таблица соединяется сама с собой
SELECT c.name AS subcategory, parent.name AS parent
FROM categories c
JOIN categories parent ON parent.id = c.parent_id;` },
        { t: 'p', text: 'Каждая следующая таблица присоединяется к уже собранному результату. Соединение таблицы с самой собой (self join) нужно для иерархий: раздел и родитель, сотрудник и руководитель. Псевдонимы здесь обязательны — иначе не понять, какая из двух копий имеется в виду.' },
        { t: 'h3', text: '2.4.6. Ловушка: размножение строк' },
        { t: 'p', text: 'Если соединять по неуникальному ключу, строки размножаются: три заказа покупателя и две его записи в другой таблице дадут шесть строк, и все суммы окажутся завышены.' },
        { t: 'example', label: 'Типичная ошибка', text: 'Нужно посчитать выручку по заказам и заодно количество позиций. Запрос SUM(o.total_amount) после JOIN с order_items сложит сумму заказа столько раз, сколько в нём позиций. Правильно — считать сумму заказов и позиции в отдельных подзапросах и соединять уже агрегаты, либо брать сумму из позиций: SUM(oi.quantity * oi.unit_price).' },
        { t: 'note', text: 'Привычка, которая спасает от ошибок: после каждого JOIN проверяй количество строк. Если оно выросло неожиданно, почти всегда дело в неуникальном ключе соединения.' },
      ],
      terms: [],
    },
    {
      id: 'subquery',
      num: '2.5',
      title: 'Подзапросы и CTE',
      blocks: [
        { t: 'p', text: 'Иногда одного запроса мало: сначала нужно что-то посчитать, а потом использовать результат. Для этого есть подзапросы и CTE.' },
        { t: 'h3', text: '2.5.1. Подзапрос в WHERE' },
        { t: 'code', text: `-- Товары дороже средней цены: подзапрос возвращает одно число
SELECT id, name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Покупатели, у которых были возвраты: подзапрос возвращает список
SELECT id, email
FROM customers
WHERE id IN (SELECT customer_id FROM orders WHERE status = 'returned');` },
        { t: 'h3', text: '2.5.2. EXISTS и ловушка NOT IN' },
        { t: 'code', text: `-- Товары, которые хоть раз покупали партией от 5 штук
SELECT p.id, p.name
FROM products p
WHERE EXISTS (
    SELECT 1 FROM order_items oi
    WHERE oi.product_id = p.id AND oi.quantity >= 5
);` },
        { t: 'p', text: 'EXISTS проверяет только факт наличия хотя бы одной строки и останавливается на первой найденной. Такой подзапрос называют **коррелированным**: он ссылается на строку внешнего запроса (p.id) и выполняется для каждой из них.' },
        { t: 'note', text: '**NOT IN и NULL.** Если в списке подзапроса есть хотя бы один NULL, условие NOT IN не вернёт ни одной строки: «значение не равно неизвестному» — неизвестно. Например, WHERE id NOT IN (SELECT category_id FROM products) молча вернёт пусто, если у какого-то товара category_id пустой. NOT EXISTS ведёт себя предсказуемо, поэтому для «нет пары» используют его или LEFT JOIN с IS NULL.' },
        { t: 'h3', text: '2.5.3. Подзапрос в FROM и в SELECT' },
        { t: 'code', text: `-- Сколько в среднем тратит покупатель: сначала сумма по каждому, потом среднее
SELECT AVG(spent) AS avg_spent
FROM (
    SELECT customer_id, SUM(total_amount) AS spent
    FROM orders
    WHERE status = 'delivered'
    GROUP BY customer_id
) t;

-- Количество заказов прямо в строке покупателя (скалярный подзапрос)
SELECT c.id, c.first_name,
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS orders
FROM customers c
WHERE c.city = 'Томск';` },
        { t: 'p', text: 'Результат подзапроса в FROM ведёт себя как обычная таблица, и псевдоним для неё обязателен. Обрати внимание на первый пример: среднее по покупателям и среднее по заказам — разные метрики. «Средняя сумма покупок на покупателя» требует сначала свернуть заказы до покупателей.' },
        { t: 'h3', text: '2.5.4. CTE: читаемые шаги' },
        { t: 'p', text: '**CTE** (common table expression) выносит подзапрос наверх через WITH и даёт ему имя. Запрос читается сверху вниз как последовательность шагов.' },
        { t: 'code', text: `-- Покупатели, потратившие больше миллиона на доставленные заказы
WITH spent AS (
    SELECT customer_id, SUM(total_amount) AS total
    FROM orders
    WHERE status = 'delivered'
    GROUP BY customer_id
)
SELECT c.email, s.total
FROM spent s
JOIN customers c ON c.id = s.customer_id
WHERE s.total > 1000000
ORDER BY s.total DESC;` },
        { t: 'code', text: `-- Несколько CTE подряд: доля отменённых заказов
WITH total AS (
    SELECT COUNT(*) AS n FROM orders
),
cancelled AS (
    SELECT COUNT(*) AS n FROM orders WHERE status = 'cancelled'
)
SELECT ROUND(100.0 * cancelled.n / total.n, 2) AS cancel_pct
FROM total, cancelled;` },
        { t: 'p', text: 'Каждый следующий CTE может пользоваться предыдущими. Сложный запрос разбивается на понятные шаги, и каждый шаг можно запустить и проверить отдельно — это главная причина, по которой аналитики пишут почти всё через CTE.' },
        { t: 'note', text: 'Для собеседования: CTE и подзапрос в FROM решают одну задачу, но CTE читается лучше и позволяет использовать результат несколько раз. В современных PostgreSQL и ClickHouse разницы в скорости между ними обычно нет.' },
      ],
      terms: [
        ['CTE', 'Common Table Expression — именованный подзапрос, объявленный через WITH перед основным запросом.'],
      ],
    },
    {
      id: 'nullcase',
      num: '2.6',
      title: 'NULL, CASE и функции для строк и дат',
      blocks: [
        { t: 'h3', text: '2.6.1. Как NULL ведёт себя в выражениях' },
        { t: 'table', caption: 'Таблица 10. NULL в выражениях', headers: ['Выражение', 'Результат', 'Почему'], rows: [
          ['5 + NULL', 'NULL', 'неизвестное плюс что угодно — неизвестно'],
          ["'текст' || NULL", 'NULL', 'то же со строками'],
          ['NULL = NULL', 'NULL', 'не TRUE: сравнивать нужно через IS NULL'],
          ['SUM(col) по пустой выборке', 'NULL', 'не 0 — частая ловушка в отчётах'],
          ['COUNT(col) по пустой выборке', '0', 'COUNT — единственный агрегат, который возвращает 0'],
        ] },
        { t: 'p', text: '**COALESCE** возвращает первый непустой аргумент: COALESCE(city, \'Не указан\'), COALESCE(SUM(total_amount), 0). **NULLIF(a, b)** возвращает NULL, если a = b, — им защищаются от деления на ноль:' },
        { t: 'code', text: `-- Конверсия в доставку по городам; если заказов 0 — получим NULL, а не ошибку
SELECT delivery_city,
       100.0 * COUNT(CASE WHEN status = 'delivered' THEN 1 END)
             / NULLIF(COUNT(*), 0) AS delivered_pct
FROM orders
GROUP BY delivery_city;` },
        { t: 'h3', text: '2.6.2. CASE: условия внутри запроса' },
        { t: 'code', text: `SELECT id, price,
    CASE
        WHEN price < 1000  THEN 'дёшево'
        WHEN price < 10000 THEN 'средне'
        ELSE 'дорого'
    END AS price_segment
FROM products;

-- Короткая форма: сравнение одного значения
SELECT CASE gender WHEN 'm' THEN 'мужской' WHEN 'f' THEN 'женский' ELSE 'не указан' END AS gender,
       COUNT(*) AS customers
FROM customers
GROUP BY 1;` },
        { t: 'p', text: 'Условия проверяются сверху вниз, срабатывает первое подходящее. Без ELSE для непокрытых случаев вернётся NULL. GROUP BY 1 означает «группировать по первому столбцу SELECT» — удобно, когда там длинное выражение.' },
        { t: 'h3', text: '2.6.3. CASE внутри агрегата' },
        { t: 'p', text: 'Самый полезный приём продуктового аналитика: посчитать несколько срезов одним проходом по таблице.' },
        { t: 'code', text: `SELECT
    delivery_city,
    COUNT(*)                                             AS orders,
    COUNT(CASE WHEN status = 'delivered' THEN 1 END)     AS delivered,
    COUNT(CASE WHEN status = 'cancelled' THEN 1 END)     AS cancelled,
    SUM(CASE WHEN status = 'delivered' THEN total_amount ELSE 0 END) AS revenue,
    ROUND(100.0 * COUNT(promo_code) / COUNT(*), 2)       AS promo_share_pct
FROM orders
GROUP BY delivery_city;` },
        { t: 'p', text: 'CASE без ELSE возвращает NULL для неподходящих строк, а COUNT пропускает NULL — получается счётчик по условию. Тот же результат даёт SUM(CASE WHEN … THEN 1 ELSE 0 END).' },
        { t: 'note', text: '**Целочисленное деление.** В PostgreSQL и SQLite 7 / 10 даёт 0: целое делится на целое без остатка. Поэтому доли считают как 100.0 * a / b — дробное число в начале превращает всё выражение в дробное.' },
        { t: 'h3', text: '2.6.4. Строки' },
        { t: 'code', text: `UPPER(name), LOWER(email), LENGTH(name)
TRIM(city)                            -- убрать пробелы по краям
first_name || ' ' || last_name        -- склеить строки (PostgreSQL, SQLite)
CONCAT(first_name, ' ', last_name)    -- то же в PostgreSQL, MySQL, ClickHouse
SUBSTR(phone, 1, 3)                   -- первые три символа
REPLACE(phone, ' ', '')               -- убрать пробелы внутри` },
        { t: 'h3', text: '2.6.5. Даты' },
        { t: 'p', text: 'Функции для дат различаются между СУБД сильнее всего. На работе чаще встречаются PostgreSQL и ClickHouse, в тренажёре — SQLite:' },
        { t: 'table', caption: 'Таблица 11. Работа с датами', headers: ['Задача', 'PostgreSQL', 'ClickHouse', 'SQLite'], rows: [
          ['текущая дата', 'CURRENT_DATE', 'today()', "date('now')"],
          ['начало месяца', "DATE_TRUNC('month', created_at)", 'toStartOfMonth(created_at)', "strftime('%Y-%m-01', created_at)"],
          ['месяц как текст 2026-09', "TO_CHAR(created_at, 'YYYY-MM')", "formatDateTime(created_at, '%Y-%m')", "strftime('%Y-%m', created_at)"],
          ['дата без времени', 'created_at::date', 'toDate(created_at)', 'date(created_at)'],
          ['плюс 7 дней', "created_at + INTERVAL '7 days'", 'created_at + INTERVAL 7 DAY', "date(created_at, '+7 days')"],
          ['разница в днях', "delivered_at::date - created_at::date", 'dateDiff(\'day\', created_at, delivered_at)', 'julianday(delivered_at) - julianday(created_at)'],
        ] },
        { t: 'code', text: `-- Заказы и выручка по месяцам (SQLite)
SELECT strftime('%Y-%m', created_at) AS month,
       COUNT(*)                      AS orders,
       SUM(total_amount)             AS revenue
FROM orders
WHERE status = 'delivered'
GROUP BY month
ORDER BY month;

-- То же в PostgreSQL
SELECT DATE_TRUNC('month', created_at) AS month, COUNT(*), SUM(total_amount)
FROM orders
WHERE status = 'delivered'
GROUP BY month
ORDER BY month;` },
        { t: 'p', text: 'Приём один и тот же: дата обрезается до начала периода, все заказы одного месяца получают одинаковое значение, и по нему группируем. Так строятся все помесячные, понедельные и подневные отчёты.' },
        { t: 'note', text: 'Время в базе обычно хранится в UTC. Заказ, оформленный в Москве 1 октября в 01:30, в UTC записан 30 сентября в 22:30 и при расчёте по UTC попадёт в сентябрь. Для отчётов по дням и месяцам время переводят в часовой пояс бизнеса.' },
      ],
      terms: [],
    },
    {
      id: 'window',
      num: '2.7',
      title: 'Оконные функции',
      blocks: [
        { t: 'p', text: 'Оконные функции — то, что отличает уверенного джуна от новичка, и одна из самых частых тем SQL-задач на собеседовании. Они считают агрегат, **не схлопывая строки**.' },
        { t: 'h3', text: '2.7.1. Отличие от GROUP BY' },
        { t: 'p', text: 'GROUP BY превращает три заказа двух городов в две строки — по городу. Оконная функция SUM(…) OVER (PARTITION BY город) оставляет все три строки и добавляет к каждой сумму по её городу. Поэтому окна нужны везде, где одновременно нужны и отдельная строка, и итог по группе: доля, отклонение от среднего, место в рейтинге.' },
        { t: 'code', text: `SELECT
    id,
    category_id,
    price,
    AVG(price) OVER (PARTITION BY category_id)          AS category_avg,
    price - AVG(price) OVER (PARTITION BY category_id)  AS diff_from_avg
FROM products;` },
        { t: 'h3', text: '2.7.2. Синтаксис окна' },
        { t: 'code', text: `ФУНКЦИЯ() OVER (
    PARTITION BY столбец   -- на какие группы делим (необязательно)
    ORDER BY столбец       -- порядок внутри группы (для нумерации и LAG обязателен)
)` },
        { t: 'p', text: 'Без PARTITION BY окном становится вся выборка: SUM(total_amount) OVER () — сумма по всем строкам результата.' },
        { t: 'h3', text: '2.7.3. Нумерация и рейтинги' },
        { t: 'table', caption: 'Таблица 12. Три функции нумерации', headers: ['Цена', 'ROW_NUMBER()', 'RANK()', 'DENSE_RANK()'], rows: [
          ['100 000', '1', '1', '1'],
          ['90 000', '2', '2', '2'],
          ['90 000', '3', '2', '2'],
          ['80 000', '4', '4 — третье место пропущено', '3'],
        ] },
        { t: 'p', text: 'ROW_NUMBER всегда даёт уникальный номер. RANK даёт равным значениям одинаковое место и пропускает следующие номера, DENSE_RANK тоже уравнивает, но идёт без пропусков. NTILE(4) делит строки на четыре равные по размеру группы — квартили.' },
        { t: 'h3', text: '2.7.4. Топ-N в каждой группе' },
        { t: 'code', text: `-- Самый дорогой товар в каждом разделе каталога
WITH ranked AS (
    SELECT id, category_id, price,
           ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY price DESC, id) AS rn
    FROM products
)
SELECT id, category_id, price
FROM ranked
WHERE rn = 1;` },
        { t: 'p', text: 'Это самый частый практический сценарий окон: «взять N лучших в каждой группе» или «последнюю запись по каждому пользователю». Обычным GROUP BY такое не решается. Для последнего заказа покупателя — ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at DESC) и rn = 1.' },
        { t: 'note', text: 'Оконные функции вычисляются на шаге SELECT — после WHERE. Поэтому написать WHERE rn = 1 в том же запросе нельзя: номера ещё не существует. Нужно обернуть запрос в CTE или подзапрос и фильтровать снаружи.' },
        { t: 'h3', text: '2.7.5. Соседние строки: LAG и LEAD' },
        { t: 'code', text: `-- Сумма предыдущего заказа того же покупателя и разница с ним
SELECT id, created_at, total_amount,
       LAG(total_amount) OVER (ORDER BY created_at, id)                AS prev_amount,
       total_amount - LAG(total_amount) OVER (ORDER BY created_at, id) AS diff
FROM orders
WHERE customer_id = 2;` },
        { t: 'p', text: 'LAG берёт значение из предыдущей строки окна, LEAD — из следующей. Незаменимы для динамики «к прошлому месяцу», для расчёта времени между покупками и для поиска первого действия после события.' },
        { t: 'h3', text: '2.7.6. Накопительный итог и доля от целого' },
        { t: 'code', text: `-- Нарастающая сумма покупок клиента
SELECT id, created_at, total_amount,
       SUM(total_amount) OVER (ORDER BY created_at, id) AS running_total
FROM orders
WHERE customer_id = 1;

-- Доля каждого заказа в сумме всех заказов клиента
SELECT id, total_amount,
       ROUND(100.0 * total_amount / SUM(total_amount) OVER (), 2) AS share_pct
FROM orders
WHERE customer_id = 3;` },
        { t: 'p', text: 'Если в окне есть ORDER BY, агрегат считается нарастающим итогом: от первой строки до текущей. Это поведение по умолчанию, и оно часто удивляет: AVG(x) OVER (ORDER BY date) — это не среднее по всей таблице, а среднее «на сегодняшний день».' },
        { t: 'h3', text: '2.7.7. Топ-N с соединением и агрегатом' },
        { t: 'code', text: `-- Три самых продаваемых товара в каждом разделе по выручке
WITH rev AS (
    SELECT p.id, p.category_id, SUM(oi.quantity * oi.unit_price) AS revenue
    FROM order_items oi
    JOIN products p ON p.id = oi.product_id
    GROUP BY p.id, p.category_id
),
ranked AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY revenue DESC, id) AS rn
    FROM rev
)
SELECT id, category_id, revenue
FROM ranked
WHERE rn <= 3;` },
        { t: 'p', text: 'Шаблон, который решает большинство «сложных» задач: CTE с агрегатом → CTE с оконной функцией → фильтр по номеру. Сначала посчитали, потом пронумеровали, потом отобрали.' },
      ],
      terms: [],
    },
    {
      id: 'practice',
      num: '2.8',
      title: 'SQL в работе продуктового аналитика',
      blocks: [
        { t: 'h3', text: '2.8.1. Как подходить к задаче' },
        { t: 'ol', items: [
          '**Уточни метрику.** «Сколько у нас покупателей» — это зарегистрированные, сделавшие хотя бы один заказ или купившие за последний месяц? Какие заказы считать: оплаченные, доставленные, без возвратов? Ошибка в определении хуже ошибки в синтаксисе.',
          '**Пойми зерно таблицы** — что означает одна строка. В orders строка — заказ, в order_items — позиция заказа, в таблице событий — одно действие пользователя. Считая покупателей по order_items, без DISTINCT получишь число позиций.',
          '**Посмотри на данные** перед расчётом: SELECT … LIMIT 20, какие бывают значения в статусах, есть ли пропуски, тестовые записи, дубли.',
          '**Собери запрос шагами через CTE** и проверь промежуточный результат каждого шага.',
          '**Проверь ответ на здравый смысл:** сопоставь с известной цифрой из дашборда, посчитай другим способом, проверь крайние случаи.',
        ] },
        { t: 'h3', text: '2.8.2. Типовые продуктовые запросы' },
        { t: 'p', text: '**Выручка, заказы и средний чек по месяцам.** Средний чек — это выручка, делённая на число заказов, а не среднее из средних по дням.' },
        { t: 'code', text: `SELECT strftime('%Y-%m', created_at)              AS month,
       COUNT(*)                                     AS orders,
       SUM(total_amount)                            AS revenue,
       ROUND(1.0 * SUM(total_amount) / COUNT(*), 0) AS avg_check
FROM orders
WHERE status = 'delivered'
GROUP BY month
ORDER BY month;` },
        { t: 'p', text: '**Новые и повторные покупатели.** Первый заказ покупателя находят через MIN или ROW_NUMBER, а дальше каждый заказ помечают как первый или повторный:' },
        { t: 'code', text: `WITH numbered AS (
    SELECT id, customer_id, created_at,
           ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at, id) AS order_num
    FROM orders
    WHERE status = 'delivered'
)
SELECT strftime('%Y-%m', created_at)                    AS month,
       COUNT(CASE WHEN order_num = 1 THEN 1 END)        AS first_orders,
       COUNT(CASE WHEN order_num > 1 THEN 1 END)        AS repeat_orders
FROM numbered
GROUP BY month
ORDER BY month;` },
        { t: 'p', text: '**Когортный retention.** Когорта — покупатели, впервые купившие в одном месяце. Для каждой когорты считаем, какая доля вернулась за покупкой через 1, 2, 3 месяца:' },
        { t: 'code', text: `WITH first_month AS (                     -- месяц первой покупки каждого
    SELECT customer_id, MIN(strftime('%Y-%m', created_at)) AS cohort
    FROM orders
    WHERE status = 'delivered'
    GROUP BY customer_id
),
activity AS (                              -- в каких месяцах покупатель покупал
    SELECT DISTINCT customer_id, strftime('%Y-%m', created_at) AS month
    FROM orders
    WHERE status = 'delivered'
)
SELECT f.cohort,
       a.month,
       COUNT(DISTINCT a.customer_id) AS active_customers
FROM first_month f
JOIN activity a ON a.customer_id = f.customer_id
GROUP BY f.cohort, a.month
ORDER BY f.cohort, a.month;` },
        { t: 'p', text: 'Строка, где month совпадает с cohort, — размер когорты. Деление остальных строк на неё даёт retention по месяцам — ту самую когортную таблицу из главы 1. Номер месяца жизни когорты удобно посчитать разницей месяцев.' },
        { t: 'p', text: '**DAU и MAU по таблице событий.** В реальных продуктах активность берут из таблицы событий (events: user_id, event_name, event_time). Главное — считать **уникальных** пользователей:' },
        { t: 'code', text: `-- DAU: уникальные пользователи по дням
SELECT DATE(event_time) AS day, COUNT(DISTINCT user_id) AS dau
FROM events
GROUP BY day
ORDER BY day;

-- Stickiness: средний DAU за месяц, делённый на MAU
WITH daily AS (
    SELECT DATE(event_time) AS day, COUNT(DISTINCT user_id) AS dau
    FROM events
    WHERE event_time >= '2026-09-01' AND event_time < '2026-10-01'
    GROUP BY day
)
SELECT ROUND(AVG(dau) * 1.0 / (
           SELECT COUNT(DISTINCT user_id) FROM events
           WHERE event_time >= '2026-09-01' AND event_time < '2026-10-01'
       ), 3) AS stickiness
FROM daily;` },
        { t: 'p', text: '**Воронка.** Сколько уникальных пользователей дошло до каждого шага. Для строгой воронки дополнительно проверяют порядок шагов по времени.' },
        { t: 'code', text: `SELECT
    COUNT(DISTINCT CASE WHEN event_name = 'view_product' THEN user_id END) AS viewed,
    COUNT(DISTINCT CASE WHEN event_name = 'add_to_cart'  THEN user_id END) AS added,
    COUNT(DISTINCT CASE WHEN event_name = 'checkout'     THEN user_id END) AS checkout,
    COUNT(DISTINCT CASE WHEN event_name = 'purchase'     THEN user_id END) AS purchased
FROM events
WHERE event_time >= '2026-09-01' AND event_time < '2026-10-01';` },
        { t: 'h3', text: '2.8.3. Проверка результата и качество данных' },
        { t: 'ul', items: [
          '**Количество строк до и после JOIN.** Неожиданный рост — размножение строк по неуникальному ключу.',
          '**Дубли:** SELECT id, COUNT(*) FROM orders GROUP BY id HAVING COUNT(*) > 1 — должно вернуть пусто.',
          '**Пропуски:** COUNT(*) - COUNT(col) по ключевым столбцам.',
          '**Странные значения:** отрицательные суммы, даты из будущего, доставка раньше заказа (delivered_at < created_at), тестовые аккаунты.',
          '**Сверка с эталоном:** итог за месяц должен совпасть с цифрой из дашборда или финансового отчёта. Если не совпадает — разберись, откуда разница, прежде чем отдавать результат.',
          '**Деление и доли:** знаменатель не ноль, проценты в разумных пределах, сумма долей равна 100%.',
        ] },
        { t: 'h3', text: '2.8.4. Оформление запроса' },
        { t: 'ul', items: [
          'ключевые слова — заглавными, каждая часть запроса — с новой строки, выражения в SELECT — по одному на строку;',
          'шаги — через CTE с говорящими именами: first_orders, monthly_revenue, а не t1 и t2;',
          'у таблиц короткие, но понятные псевдонимы: o — orders, c — customers;',
          'комментарий объясняет решения: почему исключены возвраты, откуда взялся порог;',
          'никаких SELECT * в итоговом запросе.',
        ] },
        { t: 'h3', text: '2.8.5. Шпаргалка' },
        { t: 'table', caption: 'Таблица 13. Шпаргалка по SQL', headers: ['Задача', 'Как'], rows: [
          ['выбрать столбцы', 'SELECT a, b FROM t'],
          ['убрать повторы', 'SELECT DISTINCT a FROM t'],
          ['отфильтровать строки', 'WHERE a > 10 AND b IN (…)'],
          ['проверить пустоту', 'WHERE a IS NULL'],
          ['отсортировать и ограничить', 'ORDER BY a DESC, id LIMIT 10'],
          ['посчитать по группам', 'SELECT a, COUNT(*) FROM t GROUP BY a'],
          ['отфильтровать группы', 'HAVING COUNT(*) > 10'],
          ['соединить таблицы', 'JOIN t2 ON t2.id = t.t2_id'],
          ['найти строки без пары', 'LEFT JOIN … WHERE t2.id IS NULL'],
          ['посчитать по условию', 'COUNT(CASE WHEN … THEN 1 END)'],
          ['заменить пропуск', "COALESCE(a, 0)"],
          ['защититься от деления на ноль', 'a / NULLIF(b, 0)'],
          ['разбить на шаги', 'WITH step AS (…) SELECT … FROM step'],
          ['агрегат без схлопывания', 'SUM(a) OVER (PARTITION BY b)'],
          ['топ-N в группе', 'ROW_NUMBER() OVER (PARTITION BY g ORDER BY x DESC) и rn <= N'],
          ['предыдущее значение', 'LAG(a) OVER (ORDER BY date)'],
          ['нарастающий итог', 'SUM(a) OVER (ORDER BY date)'],
        ] },
      ],
      terms: [
        ['DAU / MAU', 'Daily / Monthly Active Users — уникальные активные пользователи за день и за месяц.'],
      ],
    },
  ],

  // Задание к главе — SQL-тренажёр на той же учебной базе
  assignment: {
    time: 'в своём темпе в течение месяца, в среднем 10–15 часов',
    format: 'SQL-тренажёр на платформе: каждый запрос проверяется автоматически',
    submit: 'trainer',
    situation: [
      'Задание к главе — решить все задачи SQL-тренажёра. Он работает на той же учебной базе маркетплейса, что разобрана в разделе 2.1.7: покупатели, разделы каталога, товары, заказы и их позиции. Всего 90 задач, по 10 на каждую тему главы, внутри темы — от простых к сложным.',
      'Тренажёр сравнивает результат твоего запроса с эталонным: важны набор строк, столбцов и, если задача этого требует, порядок. Решённые задачи отмечаются автоматически, а прогресс виден здесь и в тренажёре.',
    ],
    parts: [
      {
        title: 'Задачи тренажёра',
        blocks: [
          { t: 'trainer' },
          { t: 'p', text: 'Задание считается выполненным, когда решены все задачи во всех темах.' },
        ],
      },
      {
        title: 'Как решать',
        blocks: [
          { t: 'ol', items: [
            'Внимательно прочитай условие: какие столбцы и в каком порядке нужно вывести, нужна ли сортировка, какие строки считать.',
            'Посмотри схему таблиц прямо в тренажёре: названия столбцов и их описание, где бывают пропуски.',
            'Прежде чем считать, посмотри на данные: SELECT нужные столбцы LIMIT 20.',
            'Если в задаче сказано «упорядочь», добавь в сортировку уникальный столбец (обычно id), чтобы при равных значениях порядок был однозначным.',
            'Застрял — открой подсказку, а потом вернись к нужному разделу конспекта. Подсматривать готовые решения не стоит: на собеседовании их не будет.',
            'Решив задачу, проговори про себя, что делает каждая часть запроса. Если объяснить не получается — тема ещё не понята.',
          ] },
        ],
      },
      {
        title: 'Темы тренажёра и разделы конспекта',
        blocks: [
          { t: 'table', headers: ['Тема тренажёра', 'Раздел конспекта'], rows: [
            ['SELECT и FROM', '2.2.1'],
            ['WHERE', '2.2.2–2.2.3'],
            ['ORDER BY и LIMIT', '2.2.4'],
            ['Агрегаты и GROUP BY', '2.3.1–2.3.2'],
            ['HAVING и порядок выполнения', '2.3.3–2.3.4'],
            ['JOIN', '2.4'],
            ['Подзапросы и CTE', '2.5'],
            ['Оконные функции', '2.7'],
            ['NULL и CASE', '2.2.3 и 2.6'],
          ] },
        ],
      },
    ],
    criteria: [
      'решены все 90 задач тренажёра;',
      'каждый свой запрос ты можешь объяснить: что делает каждая его часть и почему результат правильный;',
      'для задач с оконными функциями и CTE ты понимаешь, почему их нельзя решить одним GROUP BY.',
    ],
  },
}
