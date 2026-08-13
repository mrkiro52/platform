import{j as e}from"./index-C36_DhLL.js";import{b as t,T as i,a}from"./TheoryTable-DNWzV45k.js";import{V as d}from"./VideoPlayer-CurTdZtp.js";function c({children:n,caption:s}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:n}),s&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:s})]})}function o({name:n,children:s}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:n}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",s]})]})}function r({n,children:s}){return e.jsxs("div",{style:{display:"flex",gap:12,margin:"14px 0",alignItems:"flex-start"},children:[e.jsx("span",{style:{flexShrink:0,width:26,height:26,borderRadius:"50%",border:"1.5px solid var(--accent-lime)",color:"var(--accent-lime)",fontSize:12,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",marginTop:2},children:n}),e.jsx("p",{style:{margin:0,flex:1},children:s})]})}function m({videoUrl:n}){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Все виды баз данных: сходства и отличия"}),e.jsx("p",{className:"theory-subtitle",children:"Треки: Frontend и Backend"}),e.jsx("p",{className:"theory-date",children:"16 июля 2026"}),e.jsx("p",{children:"«База данных» — не одна технология, а целое семейство очень разных инструментов, каждый из которых хорош для своей задачи. Сегодня разберём реляционные, документные, ключ-значение, колоночные, графовые и полнотекстовые базы данных: чем они похожи, чем отличаются, на конкретных командах — как их запускать, настраивать и с ними работать, и в каком случае какую выбрать."})]}),n&&e.jsx(d,{src:n}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Что вообще такое база данных и зачем их так много"}),e.jsx(o,{name:"База данных (БД)",children:"организованное хранилище данных, которое позволяет надёжно сохранять информацию, быстро её находить, изменять и удалять, а также гарантирует, что данные не потеряются и не испортятся при сбоях."}),e.jsx(r,{n:1,children:"Все базы данных решают одну общую задачу — хранить и находить данные. Но данные бывают очень разными: строгие таблицы с чёткими связями (заказы и клиенты), гибкие «документы» произвольной структуры (профиль пользователя с разными полями), огромные потоки коротких пар ключ-значение (сессии, кеш), связи между сущностями (кто на кого подписан), полнотекстовый поиск (найти похожие статьи). Под каждый тип данных удобнее своя модель хранения — отсюда и разнообразие СУБД (систем управления базами данных)."}),e.jsx(r,{n:2,children:"Общее для всех баз данных: они хранят данные на диске (персистентно, то есть не теряют их при перезагрузке), предоставляют язык или API для запросов, поддерживают индексы для быстрого поиска и какой-то механизм резервного копирования. Дальше начинаются различия — в том, как именно организованы данные внутри."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Реляционные базы данных (SQL)"}),e.jsxs(o,{name:"Реляционная БД",children:["данные хранятся в виде ",e.jsx("strong",{children:"таблиц"})," со строго заданными столбцами (схемой). Таблицы связаны между собой через внешние ключи — например, таблица «Заказы» ссылается на таблицу «Клиенты»."]}),e.jsx(r,{n:3,children:"Сильные стороны: строгая структура данных (схема не даёт сохранить «кривые» данные), мощный язык запросов SQL, поддержка транзакций (ACID — данные либо применяются целиком, либо не применяются вовсе, что критично для денег и заказов), удобные связи между сущностями через JOIN."}),e.jsx(c,{caption:"Таблицы связаны через внешний ключ: у заказа есть user_id, ссылающийся на строку в таблице users.",children:e.jsxs("svg",{viewBox:"0 0 480 160",width:"480",height:"160",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"20",y:"20",width:"180",height:"90",fill:"rgba(96,165,250,0.12)",stroke:"#60a5fa"}),e.jsx("text",{x:"110",y:"38",fill:"#60a5fa",fontSize:"12",textAnchor:"middle",fontWeight:"bold",children:"users"}),e.jsx("text",{x:"30",y:"58",fill:"#f5f5fa",fontSize:"10",children:"id (PK)"}),e.jsx("text",{x:"30",y:"74",fill:"#f5f5fa",fontSize:"10",children:"name"}),e.jsx("text",{x:"30",y:"90",fill:"#f5f5fa",fontSize:"10",children:"email"}),e.jsx("rect",{x:"280",y:"20",width:"180",height:"110",fill:"rgba(32,190,255,0.1)",stroke:"#20beff"}),e.jsx("text",{x:"370",y:"38",fill:"#20beff",fontSize:"12",textAnchor:"middle",fontWeight:"bold",children:"orders"}),e.jsx("text",{x:"290",y:"58",fill:"#f5f5fa",fontSize:"10",children:"id (PK)"}),e.jsx("text",{x:"290",y:"74",fill:"#f5f5fa",fontSize:"10",children:"user_id (FK)"}),e.jsx("text",{x:"290",y:"90",fill:"#f5f5fa",fontSize:"10",children:"total"}),e.jsx("text",{x:"290",y:"106",fill:"#f5f5fa",fontSize:"10",children:"status"}),e.jsx("line",{x1:"200",y1:"65",x2:"280",y2:"72",stroke:"#20beff",strokeWidth:"1.5",markerEnd:"url(#dbarrow)"}),e.jsx("defs",{children:e.jsx("marker",{id:"dbarrow",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:"#20beff"})})}),e.jsx("text",{x:"240",y:"60",fill:"#94a3b8",fontSize:"9",textAnchor:"middle",children:"внешний ключ"})]})}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["PostgreSQL","самая функциональная open-source СУБД, поддержка JSON, геоданных"],["MySQL / MariaDB","быстрая и простая, самая распространённая в вебе"],["SQLite","встраиваемая, без отдельного сервера — файл на диске"],["Microsoft SQL Server / Oracle","корпоративные решения с расширенным тулингом"]]}),e.jsx(i,{language:"sql",code:`-- создать таблицы со связью через внешний ключ
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  total NUMERIC(10,2),
  status TEXT DEFAULT 'new'
);

-- вставить данные
INSERT INTO users (name, email) VALUES ('Иван', 'ivan@mail.ru');
INSERT INTO orders (user_id, total) VALUES (1, 1500.00);

-- запрос с JOIN — получить заказы конкретного пользователя
SELECT orders.id, orders.total, orders.status
FROM orders
JOIN users ON users.id = orders.user_id
WHERE users.email = 'ivan@mail.ru';`}),e.jsx(i,{language:"bash",code:`# запуск PostgreSQL локально через Docker
docker run -d --name pg -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres:16

# подключение через psql
psql -h localhost -U postgres -d postgres`}),e.jsx(a,{title:"Когда выбирать реляционную БД",children:"Когда данные структурированы и важна целостность связей: интернет-магазины, банковские операции, учёт заказов, любые системы, где критично, чтобы деньги/заказы не «потерялись» при сбое."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Документные базы данных (NoSQL)"}),e.jsx(o,{name:"Документная БД",children:"данные хранятся в виде JSON-подобных документов без жёсткой единой схемы. Разные документы в одной коллекции могут иметь разный набор полей."}),e.jsx(r,{n:4,children:"Сильные стороны: гибкость структуры (не нужно заранее описывать все поля), удобно хранить вложенные данные без множества JOIN (весь профиль пользователя — один документ), горизонтальное масштабирование «из коробки» у многих реализаций."}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["MongoDB","самая популярная документная БД, собственный язык запросов"],["Firebase Firestore","документная БД в облаке с realtime-синхронизацией, популярна для мобильных/веб-приложений"],["CouchDB","документная БД с упором на репликацию и офлайн-синхронизацию"]]}),e.jsx(i,{language:"javascript",code:`// MongoDB: документ пользователя — гибкая структура, вложенные объекты
db.users.insertOne({
  name: "Иван",
  email: "ivan@mail.ru",
  tags: ["vip", "wholesale"],       // массив — не нужна отдельная таблица
  address: { city: "Москва", zip: "101000" }  // вложенный объект
})

// найти документы
db.users.find({ tags: "vip" })

// обновить поле
db.users.updateOne({ email: "ivan@mail.ru" }, { $set: { city: "СПб" } })`}),e.jsx(r,{n:4.5,children:"Как это выглядит «изнутри»: под капотом каждый документ MongoDB — это просто структура, очень похожая на обычный JSON (технически BSON — бинарная версия JSON с доп. типами вроде даты). Вот как реально выглядит сохранённый документ пользователя:"}),e.jsx(i,{language:"json",code:`{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Иван",
  "email": "ivan@mail.ru",
  "tags": ["vip", "wholesale"],
  "address": {
    "city": "Москва",
    "zip": "101000"
  },
  "createdAt": "2026-07-16T10:00:00Z"
}`}),e.jsx(i,{language:"bash",code:`# запуск MongoDB локально через Docker
docker run -d --name mongo -p 27017:27017 mongo:7

# подключение через mongosh
mongosh mongodb://localhost:27017`}),e.jsx(a,{title:"Когда выбирать документную БД",children:"Когда структура данных часто меняется или объекты сильно вложенные и разнородные: профили пользователей, каталоги товаров с разными наборами характеристик, контент-менеджмент, логи событий."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Ключ-значение (Key-Value)"}),e.jsx(o,{name:"Key-Value БД",children:"самая простая модель: данные хранятся как пары «ключ → значение», как гигантский словарь/hash-map. Обычно живут в оперативной памяти — отсюда экстремальная скорость."}),e.jsx(r,{n:5,children:"Сильные стороны: максимальная скорость чтения и записи (обращение по ключу — O(1)), простота, часто поддерживают TTL (время жизни записи) — удобно для кеша и сессий, которые должны сами «протухать»."}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["Redis","самая популярная, кроме простых значений хранит списки, множества, счётчики"],["Memcached","чистый кеш в памяти, проще Redis, без персистентности на диск"],["Amazon DynamoDB","управляемая облачная key-value/документная БД с автомасштабированием"]]}),e.jsx(i,{language:"bash",code:`# запуск Redis локально через Docker
docker run -d --name redis -p 6379:6379 redis:7

# подключение через redis-cli
redis-cli

# базовые команды
SET session:abc123 "user_id=42"      # сохранить значение по ключу
GET session:abc123                    # прочитать значение
EXPIRE session:abc123 3600            # запись "протухнет" через час (TTL)
DEL session:abc123                    # удалить ключ
INCR page_views                       # атомарно увеличить счётчик на 1`}),e.jsx(a,{title:"Когда выбирать key-value",children:"Кеширование результатов тяжёлых запросов, хранение пользовательских сессий, счётчики (лайки, просмотры), очереди задач, rate-limiting (ограничение частоты запросов к API)."}),e.jsxs(r,{n:5.5,children:["На первый взгляд кажется, что key-value и документная БД — это одно и то же: ведь значение в Redis тоже можно записать как JSON-строку. Но разница принципиальная — в том, ",e.jsx("strong",{children:"что БД «понимает» про содержимое"})," значения."]}),e.jsx(t,{headers:["Критерий","Key-Value (Redis)","Документная (MongoDB)"],rows:[["Что хранится под ключом","непрозрачный «блок» — строка, число, список (БД не заглядывает внутрь)","структурированный документ (JSON/BSON) — БД видит и понимает поля"],["Поиск по содержимому","нет — можно найти только по самому ключу","да — можно искать и фильтровать по любому вложенному полю"],["Индексы по полям","не поддерживаются (индекс есть только на сам ключ)","поддерживаются — можно создать индекс по email, city и т.д."],["Типичный доступ",'"дай мне значение по ключу session:abc123"','"найди всех пользователей с tags: vip и city: Москва"'],["Аналогия","камера хранения: получил номер ячейки — забрал всё содержимое целиком","картотека: можно искать карточки по любому указанному в них полю"]]}),e.jsx(i,{language:"javascript",code:`// Redis: значение — просто JSON-СТРОКА, база данных её не читает,
// только хранит и отдаёт целиком по ключу
SET user:1 '{"name":"Иван","city":"Москва","tags":["vip"]}'
GET user:1
// вернёт всю строку целиком — Redis не может найти всех "city":"Москва"

// MongoDB: то же самое, но как настоящий документ —
// база данных ЗНАЕТ про поле city и может искать/фильтровать по нему
db.users.insertOne({ name: "Иван", city: "Москва", tags: ["vip"] })
db.users.find({ city: "Москва" })   // находит всех пользователей из Москвы`}),e.jsx(a,{title:"Итог: в чём разница простыми словами",children:"Redis хранит значение как «чёрный ящик» — быстро отдаёт его целиком по ключу, но не умеет искать внутри него. MongoDB хранит значение как «прозрачный» документ — знает его структуру и может искать, фильтровать и индексировать по любому полю внутри. Поэтому Redis — это кеш и быстрый доступ по ключу, а MongoDB — полноценная база данных с гибкими запросами."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Колоночные базы данных (Column-Family)"}),e.jsxs(o,{name:"Колоночная БД",children:["в отличие от реляционной БД, где данные физически хранятся построчно, колоночная БД хранит данные"," ",e.jsx("strong",{children:"по столбцам"}),". Это ускоряет аналитические запросы, которые читают один-два столбца из миллионов строк, не читая всю строку целиком."]}),e.jsx(r,{n:6,children:"Сильные стороны: очень быстрые агрегатные запросы (сумма, среднее по столбцу) на огромных объёмах данных, хорошее сжатие (однотипные данные в столбце сжимаются эффективнее), рассчитаны на запись огромных потоков данных (метрики, логи, IoT-датчики)."}),e.jsx(c,{caption:"Строковое хранение читает всю строку целиком; колоночное читает только нужный столбец — быстрее для аналитики.",children:e.jsxs("svg",{viewBox:"0 0 480 150",width:"480",height:"150",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("text",{x:"115",y:"16",fill:"#94a3b8",fontSize:"11",textAnchor:"middle",children:"построчное хранение"}),[0,1,2].map(s=>e.jsx("rect",{x:"30",y:30+s*30,width:"170",height:"24",fill:"rgba(96,165,250,0.2)",stroke:"#60a5fa"},s)),e.jsx("text",{x:"115",y:"130",fill:"#94a3b8",fontSize:"9",textAnchor:"middle",children:"читаем строку целиком"}),e.jsx("text",{x:"360",y:"16",fill:"#94a3b8",fontSize:"11",textAnchor:"middle",children:"колоночное хранение"}),[0,1,2].map(s=>e.jsx("rect",{x:280+s*60,y:"30",width:"52",height:"72",fill:s===1?"rgba(32,190,255,0.25)":"rgba(74,222,128,0.15)",stroke:s===1?"#20beff":"#4ade80"},s)),e.jsx("text",{x:"360",y:"130",fill:"#94a3b8",fontSize:"9",textAnchor:"middle",children:"читаем только нужный столбец"})]})}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["ClickHouse","сверхбыстрая аналитика, популярна в СНГ, SQL-подобный синтаксис"],["Apache Cassandra","колоночная БД с упором на отказоустойчивость и много-датацентровую репликацию"],["Amazon Redshift","управляемое облачное хранилище для аналитики (data warehouse)"]]}),e.jsx(i,{language:"sql",code:`-- ClickHouse: создание таблицы событий и агрегатный запрос
CREATE TABLE events (
  event_time DateTime,
  user_id UInt32,
  event_type String
) ENGINE = MergeTree()
ORDER BY event_time;

-- быстрый подсчёт по столбцу event_type на миллионах строк
SELECT event_type, count(*)
FROM events
GROUP BY event_type;`}),e.jsx(a,{title:"Когда выбирать колоночную БД",children:"Аналитика больших данных, дашборды с агрегациями, хранение метрик и логов, data warehouse — везде, где читают немного столбцов из огромного числа строк."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Графовые базы данных"}),e.jsx(o,{name:"Графовая БД",children:"данные хранятся как узлы (сущности) и рёбра (связи между ними) — сама структура базы данных «заточена» под быстрый обход связей, а не под таблицы."}),e.jsx(r,{n:7,children:"Сильные стороны: молниеносный обход глубоких связей («друзья друзей друзей») — в реляционной БД это потребовало бы много вложенных JOIN и было бы медленным; естественное моделирование сетей и связей."}),e.jsx(c,{caption:"Граф: узлы — сущности (пользователи), рёбра — связи между ними (подписки, дружба).",children:e.jsxs("svg",{viewBox:"0 0 400 150",width:"400",height:"150",xmlns:"http://www.w3.org/2000/svg",children:[[[80,40],[220,30],[320,80],[150,120],[60,110]].map((s,l)=>e.jsx("circle",{cx:s[0],cy:s[1],r:"18",fill:"rgba(32,190,255,0.15)",stroke:"#20beff",strokeWidth:"2"},l)),[[80,40,220,30],[220,30,320,80],[80,40,150,120],[150,120,60,110],[80,40,60,110]].map((s,l)=>e.jsx("line",{x1:s[0],y1:s[1],x2:s[2],y2:s[3],stroke:"#60a5fa",strokeWidth:"1.5"},l))]})}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["Neo4j","самая известная графовая БД, язык запросов Cypher"],["Amazon Neptune","управляемая облачная графовая БД"]]}),e.jsx(i,{language:"cypher",code:`// Neo4j (язык Cypher): создать пользователей и связь "подписан на"
CREATE (a:User {name: 'Иван'})
CREATE (b:User {name: 'Мария'})
CREATE (a)-[:FOLLOWS]->(b)

// найти всех, на кого подписан Иван
MATCH (a:User {name: 'Иван'})-[:FOLLOWS]->(friend)
RETURN friend.name

// найти друзей друзей (глубина 2)
MATCH (a:User {name: 'Иван'})-[:FOLLOWS*2]->(fof)
RETURN DISTINCT fof.name`}),e.jsx(a,{title:"Когда выбирать графовую БД",children:"Социальные сети (кто с кем связан), рекомендательные системы («людям, похожим на вас, понравилось»), обнаружение мошенничества (поиск подозрительных цепочек транзакций), графы знаний."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Полнотекстовые поисковые системы"}),e.jsx(o,{name:"Поисковый движок (search engine)",children:"формально не всегда классическая «база данных», но выполняет ту же роль — хранит документы и специализируется на быстром полнотекстовом поиске с релевантностью, опечатками, фильтрами и подсветкой."}),e.jsx(r,{n:8,children:"Сильные стороны: полнотекстовый поиск с учётом релевантности (какой документ «более подходящий»), устойчивость к опечаткам (fuzzy search), быстрая фильтрация и агрегация по большому числу документов."}),e.jsx(t,{headers:["СУБД","Особенность"],rows:[["Elasticsearch","самый популярный поисковый движок, JSON-документы, REST API"],["OpenSearch","открытый форк Elasticsearch"],["Meilisearch","легковесный, быстрый поиск «из коробки» для небольших/средних проектов"]]}),e.jsx(i,{language:"bash",code:`# Elasticsearch: добавить документ через REST API
curl -X POST "localhost:9200/products/_doc" -H "Content-Type: application/json" -d '{
  "name": "Смартфон Galaxy",
  "description": "Мощный смартфон с большим экраном"
}'

# полнотекстовый поиск по названию
curl -X GET "localhost:9200/products/_search" -H "Content-Type: application/json" -d '{
  "query": { "match": { "name": "смартфон" } }
}'`}),e.jsx(a,{title:"Когда выбирать поисковый движок",children:"Поиск по каталогу товаров, поиск по статьям/документации, автодополнение в поисковой строке — везде, где нужен «умный» текстовый поиск, а не точное совпадение по полю."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Сходства и различия — сводная таблица"}),e.jsx(t,{headers:["Тип БД","Модель данных","Сильная сторона","Пример"],rows:[["Реляционная (SQL)","таблицы со схемой и связями","целостность данных, транзакции, JOIN","PostgreSQL"],["Документная","JSON-документы без жёсткой схемы","гибкость структуры","MongoDB"],["Key-Value","пары ключ → значение","экстремальная скорость","Redis"],["Колоночная","данные по столбцам","быстрая аналитика на больших данных","ClickHouse"],["Графовая","узлы и рёбра","быстрый обход связей","Neo4j"],["Поисковая","индексированные документы","полнотекстовый поиск с релевантностью","Elasticsearch"]]}),e.jsxs(r,{n:9,children:["Общее у всех — задача «хранить и находить данные» и наличие индексов для ускорения поиска. Различия — в том, ",e.jsx("em",{children:"как именно"})," организованы данные внутри, и какие операции над ними оптимизированы. Именно поэтому один проект часто использует сразу несколько СУБД: PostgreSQL как основную БД, Redis как кеш и хранилище сессий, Elasticsearch для поиска по каталогу — каждая на своём месте."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Как подключаться из кода (Frontend/Backend)"}),e.jsxs(r,{n:10,children:["Фронтенд напрямую с базой данных, как правило, ",e.jsx("strong",{children:"не работает"})," — это небезопасно (пароли и структура БД оказались бы в браузере). Вместо этого фронтенд обращается к бэкенду по HTTP/REST или GraphQL, а уже бэкенд обращается к базе данных."]}),e.jsx(i,{language:"python",code:`# Backend (Python, PostgreSQL через psycopg2 / SQLAlchemy)
import psycopg2

conn = psycopg2.connect(
    host="localhost", dbname="shop", user="postgres", password="pass"
)
cur = conn.cursor()
cur.execute("SELECT id, name FROM users WHERE email = %s", ("ivan@mail.ru",))
row = cur.fetchone()
conn.close()`}),e.jsx(i,{language:"javascript",code:`// Backend (Node.js, MongoDB через официальный драйвер)
import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")
await client.connect()
const db = client.db("shop")
const user = await db.collection("users").findOne({ email: "ivan@mail.ru" })`}),e.jsx(i,{language:"javascript",code:`// Frontend: обращается не к БД напрямую, а к API бэкенда
const res = await fetch("/api/users/me")
const user = await res.json()`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs(r,{n:11,children:["Все базы данных решают общую задачу — хранить и быстро находить данные, но делают это по-разному."," ",e.jsx("strong",{children:"Реляционные"})," (PostgreSQL, MySQL) — строгие таблицы и связи, транзакции, идеальны для структурированных данных с высокими требованиями к целостности. ",e.jsx("strong",{children:"Документные"})," (MongoDB) — гибкая JSON-структура для разнородных и вложенных данных. ",e.jsx("strong",{children:"Key-Value"})," (Redis) — максимальная скорость для кеша, сессий, счётчиков. ",e.jsx("strong",{children:"Колоночные"})," (ClickHouse) — быстрая аналитика на огромных объёмах. ",e.jsx("strong",{children:"Графовые"})," (Neo4j) — быстрый обход сложных связей."," ",e.jsx("strong",{children:"Поисковые движки"})," (Elasticsearch) — полнотекстовый поиск с релевантностью. В реальных проектах эти базы данных комбинируют, выбирая подходящую под конкретную задачу, а не пытаясь решить всё одной СУБД."]})]})]})}export{m as default};
