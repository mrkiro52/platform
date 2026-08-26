import{j as e}from"./index-BaMh8Rzz.js";import{T as s,a as i,b as l,D as c}from"./TheoryTable-BjvkImjA.js";import{M as d,b as o}from"./MultiPartVideo-NbcW1USZ.js";import"./VideoPlayer-CBiPQqUJ.js";const a={text:"var(--text-primary)",sub:"var(--text-secondary)",lime:"#FFD60A",border:"#2a2a3a"};function h({children:r,caption:n}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:r}),n&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:n})]})}function t({name:r,children:n}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:r}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",n]})]})}function j(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"NumPy p.2 и Pandas"}),e.jsx("p",{className:"theory-subtitle",children:"Треки: Аналитика данных и Machine Learning"}),e.jsx("p",{className:"theory-date",children:"5 июля 2026"}),e.jsxs("p",{children:["В прошлый раз мы разобрали основы NumPy: массивы, форму, индексацию, broadcasting и агрегации. Сегодня доизучим NumPy — ",e.jsx("strong",{children:"копии и представления, объединение массивов, сортировку, np.where, работу с пропусками"})," — а затем перейдём к главному инструменту аналитика: библиотеке"," ",e.jsx("strong",{children:"pandas"}),". Если NumPy — это про «числа в массивах», то pandas — про"," ",e.jsx("strong",{children:"реальные табличные данные"})," с колонками, названиями и пропусками, как в Excel, только программно и в тысячи раз мощнее."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2 theory-heading-2--centered",children:"Видео-лекция: NumPy p.2 и Pandas"}),e.jsx(d,{parts:o})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Часть 1. Доизучаем NumPy"}),e.jsxs("p",{style:{color:"var(--text-secondary)"},children:["Быстрое напоминание: ",e.jsx("code",{children:"import numpy as np"}),". Теперь темы, до которых мы не дошли."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Копии и представления (view vs copy)"}),e.jsxs("p",{children:["Важнейший нюанс NumPy: срез массива — это ",e.jsx("strong",{children:"не копия"}),", а «окно» (view) в тот же кусок памяти. Изменишь срез — изменится и исходный массив. Это сделано ради скорости, но новичков часто ловит."]}),e.jsx(s,{language:"python",code:`a = np.array([1, 2, 3, 4, 5])
part = a[1:4]        # берём срез (элементы с 1 по 3). Это НЕ копия, а view — окно в ту же память
part[0] = 99         # меняем первый элемент среза...
print(a)             # [ 1 99  3  4  5]  ← ...и меняется ИСХОДНЫЙ массив a! part и a делят одну память

# Чтобы получить НЕЗАВИСИМУЮ копию, явно вызываем .copy()
b = a[1:4].copy()    # теперь b — отдельный массив со своими данными
b[0] = 0             # меняем b...
print(a)             # ...а массив a не тронут — они больше не связаны`}),e.jsxs(i,{title:"Правило",children:["Если нужно менять фрагмент, не задев оригинал, — всегда делай ",e.jsx("code",{children:".copy()"}),". Если, наоборот, хочешь эффективно работать с частью большого массива — используй view (по умолчанию)."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. np.where — условный выбор"}),e.jsxs("p",{children:[e.jsx("code",{children:"np.where(условие, x, y)"})," — векторизованный аналог ",e.jsx("code",{children:"if/else"}),": для каждого элемента берёт значение из ",e.jsx("code",{children:"x"}),", если условие истинно, иначе из ",e.jsx("code",{children:"y"}),". Незаменим при подготовке данных."]}),e.jsx(s,{language:"python",code:`a = np.array([12, 5, 8, 20, 3])

# np.where(условие, x, y): для КАЖДОГО элемента проверяет условие a >= 10.
# Где True — берёт 'много', где False — берёт 'мало'. Всё сразу, без цикла.
np.where(a >= 10, 'много', 'мало')
# результат:  array(['много', 'мало', 'мало', 'много', 'мало'])
#             (12→много) (5→мало) (8→мало) (20→много) (3→мало)

# Частый приём в ML — функция ReLU: отрицательные заменить на 0, положительные оставить
x = np.array([-2, 3, -5, 7])
np.where(x < 0, 0, x)        # где x<0 → 0, иначе сам x  →  [0 3 0 7]

# Если передать ТОЛЬКО условие (без x и y) — вернёт ИНДЕКСЫ, где условие истинно
np.where(a >= 10)            # (array([0, 3]),) — элементы >= 10 стоят на позициях 0 и 3`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Объединение и разбиение массивов"}),e.jsx(s,{language:"python",code:`a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

np.concatenate([a, b])   # склеить в один массив подряд:        [1 2 3 4 5 6]
np.vstack([a, b])        # сложить "стопкой" сверху вниз (2 строки): [[1 2 3], [4 5 6]]
np.hstack([a, b])        # соединить в один ряд по горизонтали:  [1 2 3 4 5 6]

m = np.array([[1, 2, 3, 4]])
np.split(m[0], 2)        # разбить массив [1 2 3 4] на 2 равные части: [array([1,2]), array([3,4])]`}),e.jsx(l,{headers:["Функция","Что делает"],rows:[["np.concatenate","склеить массивы вдоль указанной оси"],["np.vstack","сложить «стопкой» — добавить строки"],["np.hstack","соединить в ряд — добавить столбцы/элементы"],["np.split","разбить массив на несколько частей"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Сортировка и уникальные значения"}),e.jsx(s,{language:"python",code:`a = np.array([30, 10, 20])

np.sort(a)         # вернёт новую отсортированную КОПИЮ: [10 20 30] (сам a не меняется)
np.argsort(a)      # вернёт ИНДЕКСЫ в порядке сортировки: [1 2 0]
                   # т.е. самый маленький (10) стоит на позиции 1, потом 20 на позиции 2, потом 30 на позиции 0

# Зачем нужны индексы? Чтобы отсортировать ОДИН массив в порядке ДРУГОГО:
names = np.array(['Аня', 'Боб', 'Вера'])
ages  = np.array([30, 10, 20])
order = np.argsort(ages)   # порядок сортировки по возрасту: [1, 2, 0]
names[order]       # применяем этот порядок к именам → ['Боб' 'Вера' 'Аня'] (от младшего к старшему)

# Уникальные значения и подсчёт повторений
vals = np.array([1, 2, 2, 3, 3, 3])
np.unique(vals)                       # только уникальные: [1 2 3]
np.unique(vals, return_counts=True)   # ещё и сколько раз каждое: ([1,2,3], [1,2,3]) → 1 встретилось 1 раз, 2 — дважды, 3 — трижды`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Пропущенные значения (NaN)"}),e.jsx(t,{name:"np.nan (Not a Number)",children:"специальное значение «нет данных». В реальных датасетах пропуски встречаются постоянно, и с ними надо уметь работать: обычные суммы/средние «ломаются» об NaN."}),e.jsx(s,{language:"python",code:`a = np.array([1, 2, np.nan, 4])   # третий элемент — пропуск (нет данных)

a.sum()          # nan — любая обычная операция с NaN даёт NaN, результат "испорчен"
a.mean()         # nan — то же самое со средним

np.nansum(a)     # 7.0    — специальная версия суммы, которая ПРОПУСКАЕТ NaN (1+2+4)
np.nanmean(a)    # 2.333  — среднее по трём заполненным значениям (7 / 3)

np.isnan(a)      # [False False True False] — маска: True там, где стоит пропуск
a[~np.isnan(a)]  # ~ инвертирует маску (True→False). Оставляем только НЕ-пропуски: [1. 2. 4.]`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Часть 2. Знакомство с Pandas"}),e.jsxs(t,{name:"pandas",children:["библиотека для работы с ",e.jsx("strong",{children:"табличными данными"}),", построенная поверх NumPy. Даёт две структуры: ",e.jsx("strong",{children:"Series"})," (одна колонка) и ",e.jsx("strong",{children:"DataFrame"})," (целая таблица с именованными колонками и индексом). Это главный инструмент любого аналитика данных."]}),e.jsx(s,{language:"bash",code:"pip install pandas   # ставим библиотеку (NumPy подтянется автоматически как зависимость)"}),e.jsx(s,{language:"python",code:"import pandas as pd   # импортируем; pd — общепринятое сокращение, пиши всегда так"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Series и DataFrame"}),e.jsxs(t,{name:"Series",children:["одномерный маркированный массив: значения + ",e.jsx("strong",{children:"индекс"})," (метки). Похож на колонку таблицы или на словарь, но с возможностями NumPy."]}),e.jsx(t,{name:"DataFrame",children:"двумерная таблица: набор Series-колонок с общим индексом строк. Именно с DataFrame аналитик проводит большую часть времени."}),e.jsx(s,{language:"python",code:`# Series — одна колонка со своими метками (index)
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])  # значения 10,20,30 с метками 'a','b','c'
s['b']        # обращаемся по метке, а не по номеру → 20

# DataFrame из словаря: каждый КЛЮЧ становится именем колонки, а СПИСОК — её значениями
df = pd.DataFrame({
    'name':  ['Аня', 'Боб', 'Вера', 'Гена'],       # колонка name (4 строки)
    'age':   [25, 30, 22, 40],                     # колонка age
    'city':  ['Москва', 'Казань', 'Москва', 'Сочи'],  # колонка city
    'salary':[80000, 95000, 70000, 120000],        # колонка salary
})   # индекс строк (0,1,2,3) pandas создаст автоматически
print(df)     # выведет таблицу целиком`}),e.jsx(c,{name:"df",columns:["","name","age","city","salary"],rows:[["0","Аня","25","Москва","80000"],["1","Боб","30","Казань","95000"],["2","Вера","22","Москва","70000"],["3","Гена","40","Сочи","120000"]],highlightCols:[0],caption:"DataFrame: слева — индекс строк (0,1,2,3), сверху — имена колонок. Каждая колонка — это Series"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Чтение данных и первый обзор"}),e.jsx("p",{children:"Обычно данные грузят из файла (CSV — самый частый формат), а потом сразу осматривают."}),e.jsx(s,{language:"python",code:`df = pd.read_csv('data.csv')    # прочитать CSV-файл с диска и превратить в DataFrame
# df.to_csv('out.csv')          # обратная операция — сохранить DataFrame в файл

df.head()        # показать первые 5 строк — быстро "осмотреться", что за данные
df.tail(3)       # показать последние 3 строки (в скобках — сколько строк)
df.shape         # размер таблицы кортежем: (кол-во строк, кол-во колонок)
df.columns       # список названий всех колонок
df.info()        # сводка: типы колонок и сколько НЕпустых значений в каждой (поиск пропусков)
df.describe()    # числовая статистика по каждой числовой колонке: mean, min, max, квартили...`}),e.jsx(i,{title:"describe() — быстрый портрет данных",children:"Одна команда выдаёт по каждой числовой колонке количество, среднее, стандартное отклонение, минимум, максимум и квартили. С неё почти всегда начинается анализ нового датасета."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Выбор колонок, строк и фильтрация"}),e.jsx(s,{language:"python",code:`# --- Выбор колонок ---
df['age']                    # одна колонка → возвращается Series
df[['name', 'salary']]       # СПИСОК колонок в двойных скобках → возвращается DataFrame из 2 колонок

# --- Выбор строк: loc (по метке) и iloc (по номеру позиции) ---
df.loc[0]                    # строка с меткой индекса 0
df.iloc[0]                   # первая строка по её позиции (для 0..N это часто одно и то же)
df.loc[0, 'name']            # конкретная ячейка: строка 0, колонка 'name' → 'Аня'
df.iloc[0:2]                 # срез строк по позиции: первые две (0 и 1)

# --- Фильтрация по условию (булева индексация, как в NumPy) ---
df[df['age'] > 25]                          # оставить строки, где возраст больше 25
df[df['city'] == 'Москва']                  # оставить только москвичей
df[(df['age'] > 25) & (df['salary'] > 90000)]  # два условия сразу: & = И, | = ИЛИ (каждое в своих скобках!)`}),e.jsxs(t,{name:"loc и iloc",children:[e.jsx("code",{children:"loc"})," обращается по ",e.jsx("strong",{children:"меткам"})," (имена индекса и колонок), ",e.jsx("code",{children:"iloc"})," — по"," ",e.jsx("strong",{children:"числовым позициям"}),". Это две главные точки доступа к данным в pandas."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Новые колонки и работа с пропусками"}),e.jsx(s,{language:"python",code:`# Новая колонка = результат операции над другой колонкой (применится сразу ко всем строкам)
df['salary_k'] = df['salary'] / 1000    # создаём колонку salary_k: зарплата в тысячах
df['is_senior'] = df['age'] >= 30       # создаём колонку True/False: возраст 30 и больше

# --- Пропуски (NaN) в реальных данных ---
df.isna().sum()              # isna() даёт таблицу True/False, .sum() считает True → сколько пропусков в каждой колонке
df.dropna()                  # вернуть таблицу БЕЗ строк, где есть хоть один пропуск
df.fillna(0)                 # заполнить все пропуски значением 0
df['age'].fillna(df['age'].mean())  # заполнить пропуски в колонке age её же средним значением`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Группировка и сортировка"}),e.jsxs("p",{children:[e.jsx("strong",{children:"groupby"})," — сердце аналитики: «разбей данные на группы и посчитай агрегат по каждой». Работает по принципу ",e.jsx("em",{children:"split → apply → combine"}),": разбить по значению колонки, применить функцию, собрать результат."]}),e.jsx(s,{language:"python",code:`# Читается так: сгруппируй по city, возьми колонку salary, посчитай среднее в каждой группе
df.groupby('city')['salary'].mean()
# city                 ← результат: индекс = города, значения = средняя зарплата
# Казань     95000
# Москва     75000     ← (80000 + 70000) / 2, т.к. в Москве две строки
# Сочи      120000

# .agg([...]) — сразу несколько агрегатов по каждой группе
df.groupby('city')['salary'].agg(['mean', 'count', 'max'])  # среднее, количество и максимум

# --- Сортировка ---
df.sort_values('salary', ascending=False)   # отсортировать строки по зарплате: ascending=False = по убыванию
df.sort_values(['city', 'age'])             # сначала по городу, а внутри города — по возрасту`}),e.jsx(h,{caption:"groupby: строки разбиваются на группы по значению колонки city, затем к каждой группе применяется агрегат (здесь — среднее по salary)",children:e.jsxs("svg",{viewBox:"0 0 600 200",width:"100%",style:{maxWidth:600},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("text",{x:"80",y:"24",fill:a.text,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"исходная таблица"}),["Москва","Казань","Москва","Сочи"].map((r,n)=>e.jsx("rect",{x:"30",y:36+n*30,width:"110",height:"24",rx:"4",fill:r==="Москва"?"rgba(255,214,10,0.12)":r==="Казань"?"rgba(96,165,250,0.12)":"rgba(248,113,113,0.12)",stroke:a.border},n)),["Москва","Казань","Москва","Сочи"].map((r,n)=>e.jsx("text",{x:"85",y:52+n*30,fill:a.sub,fontSize:"11",textAnchor:"middle",children:r},n)),e.jsx("line",{x1:"150",y1:"95",x2:"210",y2:"95",stroke:a.sub,strokeWidth:"2",markerEnd:"url(#pg)"}),e.jsx("text",{x:"180",y:"86",fill:a.sub,fontSize:"9",textAnchor:"middle",children:"group"}),e.jsx("rect",{x:"225",y:"30",width:"130",height:"46",rx:"6",fill:"rgba(255,214,10,0.10)",stroke:a.lime}),e.jsx("text",{x:"290",y:"49",fill:a.lime,fontSize:"11",textAnchor:"middle",children:"Москва"}),e.jsx("text",{x:"290",y:"66",fill:a.sub,fontSize:"10",textAnchor:"middle",children:"2 строки"}),e.jsx("rect",{x:"225",y:"84",width:"130",height:"34",rx:"6",fill:"rgba(96,165,250,0.10)",stroke:"#60a5fa"}),e.jsx("text",{x:"290",y:"105",fill:"#60a5fa",fontSize:"11",textAnchor:"middle",children:"Казань · 1"}),e.jsx("rect",{x:"225",y:"126",width:"130",height:"34",rx:"6",fill:"rgba(248,113,113,0.10)",stroke:"#f87171"}),e.jsx("text",{x:"290",y:"147",fill:"#f87171",fontSize:"11",textAnchor:"middle",children:"Сочи · 1"}),e.jsx("line",{x1:"360",y1:"95",x2:"420",y2:"95",stroke:a.sub,strokeWidth:"2",markerEnd:"url(#pg)"}),e.jsx("text",{x:"390",y:"86",fill:a.sub,fontSize:"9",textAnchor:"middle",children:"mean"}),e.jsx("rect",{x:"435",y:"55",width:"140",height:"80",rx:"6",fill:"#17171f",stroke:a.lime}),e.jsx("text",{x:"505",y:"78",fill:a.text,fontSize:"10",textAnchor:"middle",children:"Москва → 75000"}),e.jsx("text",{x:"505",y:"98",fill:a.text,fontSize:"10",textAnchor:"middle",children:"Казань → 95000"}),e.jsx("text",{x:"505",y:"118",fill:a.text,fontSize:"10",textAnchor:"middle",children:"Сочи → 120000"}),e.jsx("defs",{children:e.jsx("marker",{id:"pg",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:a.sub})})})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"11. Связка NumPy ↔ Pandas на практике"}),e.jsxs("p",{children:["Типичный путь аналитика: загрузить и почистить данные в ",e.jsx("strong",{children:"pandas"}),", а для обучения модели отдать чистый числовой массив в ",e.jsx("strong",{children:"NumPy"}),". Переход в обе стороны — одна команда."]}),e.jsx(s,{language:"python",code:`arr = df[['age', 'salary']].to_numpy()   # берём 2 числовые колонки и превращаем в ndarray — такой массив "съест" модель ML
back = pd.DataFrame(arr, columns=['age', 'salary'])  # обратно: из массива снова таблица, задав имена колонок

# Многие функции NumPy работают прямо по колонке pandas — конвертировать вручную не нужно
np.log(df['salary'])       # натуральный логарифм каждой зарплаты (частый приём, чтобы "сгладить" большие числа)`}),e.jsx(l,{headers:["","NumPy","pandas"],rows:[["Структура","ndarray — числа","DataFrame — таблица"],["Колонки","без имён, один тип","именованные, разные типы"],["Пропуски","вручную (np.nan)","встроенная поддержка (isna, fillna)"],["Когда","вычисления, ML","загрузка, чистка, анализ"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs("p",{children:["Мы дозакрыли NumPy: ",e.jsx("strong",{children:"view vs copy"})," (срез — это окно в память, для независимости нужен"," ",e.jsx("code",{children:".copy()"}),"), ",e.jsx("code",{children:"np.where"})," для условного выбора, объединение/сортировку массивов и работу с пропусками через ",e.jsx("code",{children:"np.nan*"}),". И освоили основы ",e.jsx("strong",{children:"pandas"}),":"," ",e.jsx("strong",{children:"Series"})," и ",e.jsx("strong",{children:"DataFrame"}),", чтение CSV, обзор через ",e.jsx("code",{children:"head/info/describe"}),", выбор данных через ",e.jsx("code",{children:"loc/iloc"})," и фильтры, создание колонок, обработку пропусков и"," ",e.jsx("strong",{children:"groupby"})," для агрегаций. Это базовый набор, с которым уже можно анализировать реальные датасеты и готовить данные для машинного обучения."]})]})]})}export{j as default};
