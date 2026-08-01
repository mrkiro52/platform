import{r as h,j as e}from"./index-CrIcAvpG.js";import{S as s}from"./SelfCheck-C0XzQgFr.js";const d=({code:o,lang:n="python"})=>{const a=o.split(`
`);return e.jsxs("div",{className:"theory-code-block",children:[e.jsx("div",{className:"theory-code-label",children:n}),e.jsx("pre",{className:"theory-code",children:e.jsx("code",{children:a.map((r,i)=>{const m=r.indexOf("#");if(m===-1)return e.jsxs("span",{children:[r,i<a.length-1?`
`:""]},i);const c=r.slice(0,m),g=(c.match(/'/g)||[]).length,y=(c.match(/"/g)||[]).length;return g%2!==0||y%2!==0?e.jsxs("span",{children:[r,i<a.length-1?`
`:""]},i):e.jsxs("span",{children:[e.jsx("span",{style:{color:"var(--text-primary)"},children:r.slice(0,m)}),e.jsx("span",{style:{color:"#6b7280"},children:r.slice(m)}),i<a.length-1?`
`:""]},i)})})})]})},b=({children:o})=>e.jsxs("div",{style:{background:"rgba(32,190,255,0.05)",border:"1px solid rgba(32,190,255,0.18)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700,marginRight:6},children:"💡"}),o]}),u=({children:o})=>e.jsxs("div",{style:{background:"rgba(255,170,0,0.07)",border:"1px solid rgba(255,170,0,0.25)",borderRadius:8,padding:"12px 16px",margin:"14px 0",color:"var(--text-secondary)",fontSize:13,lineHeight:1.7},children:[e.jsx("span",{style:{color:"#ffaa00",fontWeight:700,marginRight:6},children:"⚠️"}),o]}),t=({id:o,children:n})=>e.jsx("h2",{id:o,style:{color:"var(--text-primary)",fontSize:"clamp(18px, 3vw, 22px)",fontWeight:700,margin:"40px 0 14px",paddingTop:8,borderBottom:"1px solid var(--border-color)",paddingBottom:10,scrollMarginTop:80},children:n}),l=({id:o,children:n})=>e.jsx("h3",{id:o,style:{color:"var(--text-primary)",fontSize:"clamp(14px, 2.5vw, 17px)",fontWeight:600,margin:"28px 0 10px",scrollMarginTop:80},children:n}),p=({children:o,style:n})=>e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,margin:"10px 0",...n},children:o}),v=({items:o})=>e.jsx("ul",{style:{paddingLeft:20,margin:"10px 0"},children:o.map((n,a)=>e.jsx("li",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.8,marginBottom:4},children:n},a))}),f=({caption:o,headers:n,rows:a,highlightCols:r=[],highlightRows:i=[]})=>e.jsxs("div",{style:{margin:"16px 0"},children:[o&&e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6,fontStyle:"italic"},children:o}),e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13,minWidth:"max-content"},children:[e.jsx("thead",{children:e.jsx("tr",{children:n.map((m,c)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:r.includes(c)?"rgba(32,190,255,0.18)":"var(--bg-secondary)",color:r.includes(c)?"var(--accent-lime)":"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontFamily:"monospace",fontWeight:700,whiteSpace:"nowrap"},children:m},c))})}),e.jsx("tbody",{children:a.map((m,c)=>e.jsx("tr",{style:{background:i.includes(c)?"rgba(32,190,255,0.08)":"transparent"},children:m.map((g,y)=>e.jsx("td",{style:{padding:"7px 14px",borderBottom:"1px solid var(--border-color)",color:r.includes(y)||i.includes(c)?"var(--text-primary)":"var(--text-secondary)",fontFamily:typeof g=="number"?"monospace":"inherit",whiteSpace:"nowrap"},children:g},y))},c))})]})})]}),x=({rows:o})=>e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"16px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:["Метод / атрибут","Описание","Пример"].map((n,a)=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:n},a))})}),e.jsx("tbody",{children:o.map(([n,a,r],i)=>e.jsxs("tr",{style:{borderBottom:"1px solid var(--border-color)"},children:[e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",whiteSpace:"nowrap"},children:n}),e.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)"},children:a}),e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",whiteSpace:"nowrap",fontSize:12},children:r})]},i))})]})}),j=[{id:"intro",label:"1. Введение и установка"},{id:"series",label:"2. Series"},{id:"dataframe",label:"3. DataFrame"},{id:"io",label:"4. Чтение и запись данных"},{id:"explore",label:"5. Исследование данных"},{id:"indexing",label:"6. Индексация и выборка"},{id:"filtering",label:"7. Фильтрация"},{id:"missing",label:"8. Пропущенные значения"},{id:"columns",label:"9. Работа со столбцами"},{id:"types",label:"10. Типы данных"},{id:"sorting",label:"11. Сортировка"},{id:"groupby",label:"12. Группировка (groupby)"},{id:"apply",label:"13. apply / map"},{id:"merge",label:"14. Объединение данных"},{id:"strings",label:"15. Работа со строками"},{id:"datetime",label:"16. Даты и время"},{id:"pivot",label:"17. Pivot tables"},{id:"window",label:"18. Оконные функции"},{id:"performance",label:"19. Производительность"},{id:"cheatsheet",label:"20. Шпаргалка всех методов"}];function S({onBack:o}){h.useEffect(()=>{window.scrollTo(0,0)},[]);const n=a=>{const r=document.getElementById(a);r&&r.scrollIntoView({behavior:"smooth"})};return e.jsxs("div",{style:{maxWidth:900,margin:"0 auto",padding:"clamp(16px, 4vw, 32px) clamp(12px, 3vw, 24px)"},children:[e.jsx("button",{onClick:o,style:{background:"none",border:"1px solid var(--border-color)",color:"var(--text-secondary)",padding:"6px 14px",borderRadius:6,fontSize:13,cursor:"pointer",marginBottom:28,display:"inline-flex",alignItems:"center",gap:6},children:"← Назад к ликбезам"}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"clamp(20px, 4vw, 36px)",marginBottom:32},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:14,marginBottom:16,flexWrap:"wrap"},children:[e.jsx("div",{style:{background:"rgba(32,190,255,0.1)",border:"1px solid rgba(32,190,255,0.25)",borderRadius:8,padding:"6px 14px",color:"var(--accent-lime)",fontSize:12,fontWeight:700,letterSpacing:1},children:"PYTHON"}),e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:12},children:"Junior → Middle"})]}),e.jsx("h1",{style:{fontFamily:"var(--font-syne)",fontSize:"clamp(24px, 5vw, 38px)",fontWeight:800,color:"var(--text-primary)",lineHeight:1.2,marginBottom:12},children:"Pandas — полный ликбез"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:15,lineHeight:1.7,maxWidth:640},children:"Всё необходимое для работы с данными в Python: от создания Series и DataFrame до группировки, объединения, работы с датами и оптимизации производительности."}),e.jsx("div",{style:{marginTop:20,display:"flex",gap:12,flexWrap:"wrap"},children:["pandas 2.x","Python 3.10+","~45 мин"].map(a=>e.jsx("span",{style:{background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:6,padding:"4px 10px",fontSize:12,color:"var(--text-tertiary)"},children:a},a))})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",marginBottom:40},children:[e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,textTransform:"uppercase",marginBottom:14},children:"Содержание"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(200px, 1fr))",gap:"6px 24px"},children:j.map(a=>e.jsx("button",{onClick:()=>n(a.id),style:{background:"none",border:"none",textAlign:"left",padding:"4px 0",color:"var(--text-secondary)",fontSize:13,cursor:"pointer",transition:"color 0.15s"},onMouseEnter:r=>r.target.style.color="var(--accent-lime)",onMouseLeave:r=>r.target.style.color="var(--text-secondary)",children:a.label},a.id))})]}),e.jsx(t,{id:"intro",children:"1. Введение и установка"}),e.jsxs(p,{children:[e.jsx("strong",{style:{color:"var(--text-primary)"},children:"Pandas"})," — главная библиотека Python для работы с табличными и временными данными. Она предоставляет два ключевых объекта: ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," (одномерный массив) и ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"DataFrame"})," (двумерная таблица)."]}),e.jsx(d,{code:`pip install pandas          # базовая установка
pip install pandas openpyxl  # + поддержка Excel
pip install pandas pyarrow   # + Parquet / Arrow`,lang:"bash"}),e.jsx(d,{code:`import pandas as pd   # стандартное сокращение
import numpy as np    # часто используется вместе

print(pd.__version__)  # 2.x`}),e.jsx(s,{questions:[{q:"Что такое Pandas и для чего он используется?",a:"Pandas — библиотека Python для работы с табличными и временными данными. Она даёт удобные структуры (Series и DataFrame) и инструменты для загрузки, очистки, анализа и преобразования данных. Основа анализа данных и ML-пайплайнов."},{q:"Какие два главных объекта предоставляет Pandas?",a:"Series — одномерный массив с индексом (как один столбец). DataFrame — двумерная таблица, набор Series с общим индексом (как лист Excel или таблица SQL)."},{q:"Как принято импортировать Pandas?",a:"import pandas as pd — стандартное сокращение, которое использует всё сообщество. Часто рядом импортируют numpy as np, так как они работают вместе."}]}),e.jsx(t,{id:"series",children:"2. Series"}),e.jsxs(p,{children:[e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," — это одномерный массив с метками (индексом). Думайте о нём как о столбце таблицы или о словаре, в котором ключи стали индексом."]}),e.jsx(d,{code:`# Создание из списка
s = pd.Series([10, 20, 30, 40])

# Создание с явным индексом
s = pd.Series(
    [10, 20, 30],
    index=['a', 'b', 'c'],
    name='score'
)

# Создание из словаря
s = pd.Series({'math': 90, 'english': 85, 'history': 78})

# Создание из скаляра (broadcast)
s = pd.Series(0, index=range(5))   # [0, 0, 0, 0, 0]`}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,margin:"16px 0"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"s = pd.Series([10,20,30], index=['a','b','c'])"}),e.jsx(f,{headers:["index","values"],rows:[["a",10],["b",20],["c",30]]})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:16},children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:10},children:"Ключевые атрибуты"}),[["s.values","array([10, 20, 30])"],["s.index","Index(['a','b','c'])"],["s.dtype","int64"],["s.name","'score'"],["s.shape","(3,)"],["len(s)","3"]].map(([a,r])=>e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",padding:"4px 0",borderBottom:"1px solid var(--border-color)",fontSize:13},children:[e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:a}),e.jsx("code",{style:{fontFamily:"monospace",color:"var(--text-secondary)",fontSize:12},children:r})]},a))]})]}),e.jsx(d,{code:`# Доступ к элементам
s['a']        # по метке → 10
s[0]          # по позиции → 10 (устарело для строк-индексов)
s.iloc[0]     # по позиции → 10 (явный способ)
s.loc['a']    # по метке  → 10 (явный способ)

# Срезы
s['a':'b']    # 10, 20 (включая 'b')
s.iloc[0:2]   # 10, 20 (не включая 2)

# Арифметика (выравнивание по индексу)
s1 = pd.Series({'a': 1, 'b': 2})
s2 = pd.Series({'b': 10, 'c': 20})
s1 + s2  # a: NaN, b: 12, c: NaN`}),e.jsx(s,{questions:[{q:"Что такое Series в Pandas?",a:"Одномерный массив с метками-индексом. Можно думать о нём как о столбце таблицы или о словаре, где ключи стали индексом, а значения — данными."},{q:"Чем .loc[] отличается от .iloc[]?",a:".loc[] обращается по метке индекса (s.loc['a']), .iloc[] — по числовой позиции (s.iloc[0]). При строковом индексе для доступа по позиции нужен именно .iloc[]."},{q:"Что происходит при сложении двух Series с разными индексами?",a:"Pandas выравнивает значения по индексу: совпадающие метки складываются, а для меток, которые есть только в одной серии, результат будет NaN."}]}),e.jsx(t,{id:"dataframe",children:"3. DataFrame"}),e.jsxs(p,{children:[e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"DataFrame"})," — двумерная таблица. Каждый столбец — это ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"Series"})," с общим индексом."]}),e.jsx(d,{code:`# Из словаря списков
df = pd.DataFrame({
    'name':  ['Alice', 'Bob', 'Carol', 'Dave'],
    'age':   [24, 30, 22, 35],
    'score': [88.5, 92.0, 75.5, 95.0],
    'city':  ['Moscow', 'SPb', 'Moscow', 'Kazan'],
})

# Из списка словарей
df = pd.DataFrame([
    {'name': 'Alice', 'age': 24},
    {'name': 'Bob',   'age': 30},
])

# Из numpy-массива
import numpy as np
df = pd.DataFrame(
    np.arange(12).reshape(4, 3),
    columns=['A', 'B', 'C']
)

# Задать индекс при создании
df = pd.DataFrame(data, index=['r1', 'r2', 'r3'])`}),e.jsx(f,{caption:"Пример: df с 4 строками",headers:["","name","age","score","city"],rows:[[0,"Alice",24,88.5,"Moscow"],[1,"Bob",30,92,"SPb"],[2,"Carol",22,75.5,"Moscow"],[3,"Dave",35,95,"Kazan"]]}),e.jsx(l,{children:"Атрибуты DataFrame"}),e.jsx(x,{rows:[["df.shape","Размер: (строки, столбцы)","(4, 4)"],["df.columns","Список столбцов","Index(['name','age',…])"],["df.index","Строковый индекс","RangeIndex(0, 4)"],["df.dtypes","Типы каждого столбца","name: object, age: int64…"],["df.values","numpy-массив всех данных","array([[…], …])"],["df.size","Общее число элементов","16"],["df.ndim","Размерность (всегда 2)","2"],["df.T","Транспонировать","—"]]}),e.jsx(s,{questions:[{q:"Что такое DataFrame?",a:"Двумерная таблица данных: строки с общим индексом и именованные столбцы. Каждый столбец — это Series. Аналог таблицы в Excel или базе данных."},{q:'Чем отличается df["col"] от df[["col"]]?',a:'df["col"] возвращает один столбец как Series. df[["col"]] с двойными скобками возвращает DataFrame (можно передать список из нескольких столбцов).'},{q:"Как из DataFrame получить только определённые столбцы?",a:'Передать список их имён: df[["name", "age"]]. Порядок в списке задаёт порядок столбцов в результате.'}]}),e.jsx(t,{id:"io",children:"4. Чтение и запись данных"}),e.jsx(l,{children:"Чтение"}),e.jsx(d,{code:`# CSV
df = pd.read_csv('data.csv')
df = pd.read_csv(
    'data.csv',
    sep=';',             # разделитель
    encoding='utf-8',
    index_col='id',      # столбец → индекс
    usecols=['a', 'b'],  # только эти столбцы
    nrows=1000,          # первые N строк
    skiprows=[1, 2],     # пропустить строки
    na_values=['N/A', '?'],  # что считать NaN
    parse_dates=['date'],    # распарсить даты
    dtype={'age': int},      # явные типы
)

# Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# JSON
df = pd.read_json('data.json')

# Parquet (быстро и компактно)
df = pd.read_parquet('data.parquet')

# SQL
import sqlite3
conn = sqlite3.connect('db.sqlite')
df = pd.read_sql('SELECT * FROM users', conn)

# Clipboard (удобно для отладки)
df = pd.read_clipboard()`}),e.jsx(l,{children:"Запись"}),e.jsx(d,{code:`df.to_csv('out.csv', index=False)        # без индекса
df.to_csv('out.csv', sep=';', encoding='utf-8')

df.to_excel('out.xlsx', index=False, sheet_name='Data')

df.to_json('out.json', orient='records', force_ascii=False)

df.to_parquet('out.parquet', index=False)

df.to_sql('table_name', conn, if_exists='replace', index=False)`}),e.jsx(s,{questions:[{q:"Каким методом прочитать CSV-файл в DataFrame?",a:'pd.read_csv("file.csv"). Для Excel — pd.read_excel(), для JSON — pd.read_json(), для SQL — pd.read_sql(). У read_csv много параметров: sep, encoding, usecols и др.'},{q:"Как сохранить DataFrame в CSV без столбца индекса?",a:'df.to_csv("file.csv", index=False). Параметр index=False убирает технический числовой индекс из файла, оставляя только данные.'},{q:'Что делать, если CSV использует другой разделитель, например ";"?',a:'Указать параметр sep: pd.read_csv("file.csv", sep=";"). Так часто оформляют файлы из европейского Excel, где запятая — десятичный знак.'}]}),e.jsx(t,{id:"explore",children:"5. Исследование данных"}),e.jsx(p,{children:"Первое, что делается при получении нового датасета — быстрое знакомство с его содержимым и структурой."}),e.jsx(d,{code:`df.head(5)      # первые 5 строк (по умолчанию)
df.tail(5)      # последние 5 строк
df.sample(5)    # 5 случайных строк
df.sample(frac=0.1)  # 10% случайных строк

df.shape        # (строки, столбцы) → (1000, 8)
df.info()       # типы, null-значения, память
df.describe()   # статистика числовых столбцов
df.describe(include='all')  # включая строковые
df.describe(include=[object])  # только строки

df.dtypes       # dtype каждого столбца
df.columns      # названия столбцов
df.index        # информация об индексе

df['city'].value_counts()           # частоты значений
df['city'].value_counts(normalize=True)  # в долях
df['city'].nunique()                # кол-во уникальных
df['city'].unique()                 # массив уникальных

df.isnull().sum()        # число NaN по столбцам
df.isnull().sum() / len(df)  # доля NaN

df.memory_usage(deep=True)  # память в байтах`}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:8,padding:16,margin:"16px 0",fontSize:13},children:[e.jsx("div",{style:{color:"var(--text-tertiary)",fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:10},children:"ВЫВОД df.describe() для числовых столбцов"}),e.jsx(f,{headers:["","age","score"],rows:[["count","4.000","4.000"],["mean","27.750","87.750"],["std","5.852","8.139"],["min","22.000","75.500"],["25%","23.500","85.375"],["50%","27.000","90.250"],["75%","31.250","92.625"],["max","35.000","95.000"]]})]}),e.jsx(s,{questions:[{q:"Какие методы используют при первом знакомстве с данными?",a:"df.head() — первые строки, df.info() — типы и пропуски, df.describe() — статистика числовых столбцов. Это стандартный первый шаг любого анализа."},{q:"Что показывает df.info()?",a:"Список столбцов, число непустых значений в каждом, типы данных (dtype) и объём занимаемой памяти. Помогает сразу увидеть пропуски и неверные типы."},{q:"Как быстро узнать число уникальных значений в столбце?",a:'df["col"].nunique() — количество уникальных значений, df["col"].value_counts() — частоту каждого значения. Полезно для категориальных признаков.'}]}),e.jsx(t,{id:"indexing",children:"6. Индексация и выборка"}),e.jsxs(p,{children:["Самая важная тема в pandas. Нужно чётко понимать разницу между ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"loc"})," и ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"iloc"}),"."]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))",gap:16,margin:"16px 0"},children:[e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(32,190,255,0.2)",borderRadius:8,padding:16},children:[e.jsx("div",{style:{color:"var(--accent-lime)",fontFamily:"monospace",fontWeight:700,marginBottom:8},children:"df.loc[ ]"}),e.jsxs("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:8},children:["Выборка по ",e.jsx("strong",{children:"меткам"})," (именам строк и столбцов). Конечный индекс ",e.jsx("strong",{children:"включается"}),"."]}),e.jsx(d,{code:`df.loc[0]          # строка 0
df.loc[0, 'name']  # конкретная ячейка
df.loc[0:2, 'age':'score']  # срез
df.loc[[0,2], ['name','city']]`})]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(255,170,0,0.2)",borderRadius:8,padding:16},children:[e.jsx("div",{style:{color:"#ffaa00",fontFamily:"monospace",fontWeight:700,marginBottom:8},children:"df.iloc[ ]"}),e.jsxs("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:8},children:["Выборка по ",e.jsx("strong",{children:"позиции"})," (числовым индексам). Конечный индекс ",e.jsx("strong",{children:"НЕ включается"}),"."]}),e.jsx(d,{code:`df.iloc[0]         # строка 0
df.iloc[0, 1]      # строка 0, столбец 1
df.iloc[0:3, 1:3]  # срез строк и столбцов
df.iloc[[0,2], [0,2]]`})]})]}),e.jsx(d,{code:`# Выбор столбцов
df['name']          # Series одного столбца
df[['name', 'age']] # DataFrame нескольких столбцов
df.name             # атрибутный доступ (не рекомендуется)

# Выбор строк по условию (boolean indexing)
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Установка индекса
df2 = df.set_index('name')   # столбец name → индекс
df2.reset_index()             # индекс обратно в столбец

# Переиндексация
df.reindex([3, 1, 0, 2])    # изменить порядок строк
df.reindex(columns=['age', 'name', 'score', 'city'])`}),e.jsxs(u,{children:["Не используйте цепочки индексации ",e.jsx("code",{style:{fontFamily:"monospace"},children:"df['col'][0] = val"})," — это ведёт к SettingWithCopyWarning. Всегда используйте ",e.jsx("code",{style:{fontFamily:"monospace"},children:"df.loc[0, 'col'] = val"}),"."]}),e.jsx(s,{questions:[{q:"Чем .loc[] отличается от .iloc[] в DataFrame?",a:'.loc[строка, столбец] обращается по меткам, .iloc[позиция, позиция] — по числовым индексам. Для фильтрации по условию используют .loc: df.loc[df["age"] > 18].'},{q:"Как выбрать конкретные строки и столбцы одновременно?",a:'df.loc[2:4, ["name", "age"]] — по меткам строк и именам столбцов, либо df.iloc[2:5, 0:2] — по числовым позициям. .loc включает правую границу, .iloc — нет.'},{q:"Почему рекомендуют использовать .loc/.iloc вместо цепочки []?",a:'Цепочка вида df[df.a>0]["b"] = 1 может менять копию, а не оригинал (SettingWithCopyWarning). .loc[] делает явную и безопасную выборку и присваивание.'}]}),e.jsx(t,{id:"filtering",children:"7. Фильтрация"}),e.jsx(d,{code:`# Простые условия
df[df['age'] > 25]
df[df['city'] == 'Moscow']

# Несколько условий (& | ~ — НЕ and/or/not!)
df[(df['age'] > 25) & (df['score'] >= 90)]
df[(df['city'] == 'Moscow') | (df['city'] == 'SPb')]
df[~(df['city'] == 'Moscow')]  # инверсия

# query() — более читаемый синтаксис
df.query('age > 25')
df.query('city == "Moscow" and score >= 85')
df.query('age in [24, 30]')
df.query('score > @threshold')  # переменные через @

# isin() — проверка вхождения в список
df[df['city'].isin(['Moscow', 'SPb'])]
df[~df['city'].isin(['Kazan'])]   # исключить

# between() — диапазон включительно
df[df['age'].between(22, 30)]

# str.contains() — поиск по строке
df[df['name'].str.contains('Al')]
df[df['name'].str.startswith('A')]

# where() — заменяет не подходящие на NaN
df['score'].where(df['score'] >= 80)`}),e.jsx(f,{caption:`df.query('city == "Moscow"') — выбранные строки`,headers:["","name","age","score","city"],rows:[[0,"Alice",24,88.5,"Moscow"],[2,"Carol",22,75.5,"Moscow"]],highlightRows:[0,1]}),e.jsx(s,{questions:[{q:"Как отфильтровать строки по условию age > 25?",a:'df[df["age"] > 25]. Внутри создаётся булева маска (True/False для каждой строки), и остаются только строки со значением True.'},{q:"Как объединить несколько условий фильтрации?",a:'Каждое условие в скобках, между ними & (и), | (или), ~ (не): df[(df["age"] > 25) & (df["city"] == "Москва")]. Обычные and/or здесь не работают.'},{q:"Что такое булева маска?",a:'Series из True/False той же длины, что и DataFrame. При передаче в df[mask] остаются строки, где True. Маску создаёт условие: df["age"] > 18.'}]}),e.jsx(t,{id:"missing",children:"8. Пропущенные значения (NaN)"}),e.jsxs(p,{children:["В реальных данных пропуски встречаются почти всегда. Pandas использует ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"NaN"})," (Not a Number) из NumPy для числовых столбцов и ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"None"})," / ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"pd.NA"})," для остальных."]}),e.jsx(d,{code:`# Обнаружение
df.isnull()             # True где NaN
df.notnull()            # True где НЕ NaN
df.isna().sum()         # кол-во NaN по столбцам
df.isna().sum().sum()   # всего NaN в DataFrame

# Удаление строк/столбцов с NaN
df.dropna()                        # строки с любым NaN
df.dropna(how='all')               # только если ВСЕ NaN
df.dropna(subset=['age', 'score']) # NaN в конкретных столбцах
df.dropna(thresh=3)                # оставить если ≥ 3 non-NaN

# Заполнение
df.fillna(0)                       # заполнить нулём
df.fillna({'age': 0, 'city': 'Unknown'})  # по столбцам
df['score'].fillna(df['score'].mean())     # средним

# Заполнение методами распространения
df.fillna(method='ffill')  # forward fill (предыдущим)
df.fillna(method='bfill')  # backward fill (следующим)
df['score'].interpolate()  # линейная интерполяция

# Замена конкретных значений
df.replace(-1, np.nan)
df.replace({'city': {'Msk': 'Moscow', 'Spb': 'SPb'}})`}),e.jsxs(b,{children:[e.jsx("code",{style:{fontFamily:"monospace"},children:"dropna()"})," и ",e.jsx("code",{style:{fontFamily:"monospace"},children:"fillna()"})," по умолчанию возвращают новый DataFrame. Передайте ",e.jsx("code",{style:{fontFamily:"monospace"},children:"inplace=True"}),", чтобы изменить текущий — но лучше присваивайте результат: ",e.jsx("code",{style:{fontFamily:"monospace"},children:"df = df.fillna(0)"}),"."]}),e.jsx(s,{questions:[{q:"Как обозначаются пропущенные значения в Pandas?",a:"Как NaN (Not a Number). Найти их помогают df.isnull() и df.notnull(), а df.isnull().sum() покажет число пропусков в каждом столбце."},{q:"Чем fillna() отличается от dropna()?",a:'fillna(value) заменяет NaN на значение (0, среднее, "неизвестно"), сохраняя строки. dropna() удаляет строки или столбцы с пропусками. fillna безопаснее — не теряет данные.'},{q:"Как заполнить пропуски средним значением столбца?",a:'df["col"].fillna(df["col"].mean()). Для категориальных данных чаще используют моду или строку-заглушку вместо среднего.'}]}),e.jsx(t,{id:"columns",children:"9. Работа со столбцами"}),e.jsx(d,{code:`# Добавить новый столбец
df['bonus'] = df['score'] * 0.1
df['full_info'] = df['name'] + ', ' + df['city']
df['is_senior'] = df['age'] > 30

# Вставить столбец на конкретную позицию
df.insert(2, 'rank', [4, 3, 1, 2])  # pos, name, values

# Удалить столбцы
df.drop('bonus', axis=1)            # один столбец
df.drop(['bonus', 'rank'], axis=1)  # несколько
del df['bonus']                     # in-place удаление

# Переименовать
df.rename(columns={'name': 'full_name', 'age': 'years'})
df.columns = ['a', 'b', 'c', 'd']  # переименовать все

# Переупорядочить столбцы
df = df[['name', 'score', 'age', 'city']]

# Скопировать столбец
df['score_copy'] = df['score'].copy()

# assign() — цепочки преобразований
df = (df
    .assign(bonus=df['score'] * 0.1)
    .assign(grade=lambda x: x['score'].apply(
        lambda s: 'A' if s >= 90 else 'B'
    ))
)`}),e.jsx(s,{questions:[{q:"Как создать новый столбец на основе существующих?",a:'Присвоить выражение: df["total"] = df["price"] * df["qty"]. Можно использовать арифметику над столбцами или apply для сложной логики.'},{q:"Как переименовать столбцы?",a:'df.rename(columns={"old": "new"}) переименует выбранные, а df.columns = [...] задаст все имена сразу. rename не меняет оригинал без inplace=True.'},{q:"Как удалить столбец из DataFrame?",a:'df.drop(columns=["col"]) или df.drop("col", axis=1). Чтобы изменить сам объект, добавляют inplace=True либо переприсваивают результат.'}]}),e.jsx(t,{id:"types",children:"10. Типы данных"}),e.jsx(p,{children:"Правильные типы данных экономят память и ускоряют операции."}),e.jsx(d,{code:`# Просмотр типов
df.dtypes

# Приведение типов
df['age'] = df['age'].astype(int)
df['score'] = df['score'].astype(float)
df['name'] = df['name'].astype(str)

# object → category (экономит память при малом числе уникальных значений)
df['city'] = df['city'].astype('category')
df['city'].cat.categories     # список категорий
df['city'].cat.codes          # числовые коды

# Числа в строки и обратно
pd.to_numeric(df['age'], errors='coerce')  # нечисловые → NaN
pd.to_datetime(df['date'], format='%Y-%m-%d')

# Проверка типа
df['age'].dtype          # dtype('int64')
pd.api.types.is_numeric_dtype(df['age'])     # True
pd.api.types.is_string_dtype(df['name'])     # True`}),e.jsx("div",{style:{overflowX:"auto",border:"1px solid var(--border-color)",borderRadius:8,margin:"16px 0"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:13},children:[e.jsx("thead",{children:e.jsx("tr",{children:["dtype pandas","Описание","Память / эл-т","Когда использовать"].map(a=>e.jsx("th",{style:{padding:"8px 14px",textAlign:"left",background:"var(--bg-secondary)",color:"var(--text-secondary)",borderBottom:"2px solid var(--border-color)",fontWeight:700},children:a},a))})}),e.jsx("tbody",{children:[["int8 / int16 / int32 / int64","Целые числа разного размера","1–8 байт","Счётчики, коды, возраст"],["float32 / float64","Числа с плавающей точкой","4–8 байт","Цены, проценты"],["bool","Логическое значение","1 байт","Флаги, маски"],["object","Python-объект (строки)","~50+ байт","Текст (сменить на string/category)"],["string","Строки (pd.StringDtype)","< object","Текст с явным NA"],["category","Перечисление","Очень мало","Повторяющиеся строки"],["datetime64[ns]","Дата и время","8 байт","Временные ряды"]].map((a,r)=>e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--accent-lime)",borderBottom:"1px solid var(--border-color)"},children:a[0]}),e.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:a[1]}),e.jsx("td",{style:{padding:"7px 14px",fontFamily:"monospace",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:a[2]}),e.jsx("td",{style:{padding:"7px 14px",color:"var(--text-secondary)",borderBottom:"1px solid var(--border-color)"},children:a[3]})]},r))})]})}),e.jsx(s,{questions:[{q:"Зачем приводить столбцы к правильным типам?",a:"Неверный тип замедляет работу и ломает операции: числа-строки нельзя суммировать, даты-строки нельзя сравнивать как даты. Правильные типы экономят память и ускоряют вычисления."},{q:"Как преобразовать столбец к числовому типу?",a:'pd.to_numeric(df["col"], errors="coerce"). Параметр errors="coerce" превращает непарсируемые значения в NaN вместо ошибки. Для общего приведения есть df["col"].astype(int).'},{q:"Что даёт тип category для строковых столбцов?",a:"Если строки часто повторяются (пол, город, статус), тип category хранит их как коды, экономя память и ускоряя группировку и сравнение."}]}),e.jsx(t,{id:"sorting",children:"11. Сортировка"}),e.jsx(d,{code:`# Сортировка по значениям столбца
df.sort_values('age')                     # по возрастанию
df.sort_values('age', ascending=False)   # по убыванию

# По нескольким столбцам
df.sort_values(['city', 'score'], ascending=[True, False])

# NaN в конце или начале
df.sort_values('score', na_position='last')   # по умолчанию
df.sort_values('score', na_position='first')

# Сортировка по индексу
df.sort_index()               # по строковому индексу
df.sort_index(ascending=False)

# Топ N значений
df.nlargest(3, 'score')      # 3 строки с наибольшим score
df.nsmallest(2, 'age')       # 2 строки с наименьшим age

# rank() — ранжирование
df['rank'] = df['score'].rank(ascending=False, method='min')`}),e.jsx(f,{caption:"df.sort_values('score', ascending=False)",headers:["","name","age","score","city"],rows:[[3,"Dave",35,95,"Kazan"],[1,"Bob",30,92,"SPb"],[0,"Alice",24,88.5,"Moscow"],[2,"Carol",22,75.5,"Moscow"]],highlightCols:[3]}),e.jsx(s,{questions:[{q:"Как отсортировать DataFrame по столбцу?",a:'df.sort_values("age") — по возрастанию, df.sort_values("age", ascending=False) — по убыванию. Можно сортировать по нескольким столбцам списком.'},{q:"Как сортировать по двум столбцам в разном порядке?",a:'df.sort_values(["city", "age"], ascending=[True, False]) — сначала по городу по возрастанию, внутри города по возрасту по убыванию.'},{q:"Чем sort_values отличается от sort_index?",a:"sort_values сортирует по значениям в столбцах, sort_index — по меткам индекса. Первый используют для упорядочивания данных, второй — для упорядочивания по индексу."}]}),e.jsx(t,{id:"groupby",children:"12. Группировка (groupby)"}),e.jsxs(p,{children:[e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:"groupby()"})," работает по принципу «разбей → примени → собери» (split → apply → combine). Это самая мощная операция в pandas для агрегации."]}),e.jsx(d,{code:`# Базовая группировка
g = df.groupby('city')

# Одна агрегация
df.groupby('city')['score'].mean()
df.groupby('city')['score'].sum()
df.groupby('city')['age'].max()

# Несколько агрегаций сразу — agg()
df.groupby('city').agg({
    'score': ['mean', 'std', 'count'],
    'age':   ['min', 'max'],
})

# Переименование после agg
df.groupby('city').agg(
    avg_score=('score', 'mean'),
    total=('score', 'count'),
    max_age=('age', 'max'),
)

# Группировка по нескольким столбцам
df.groupby(['city', 'is_senior'])['score'].mean()

# transform() — применить функцию, сохранив индекс
df['city_avg'] = df.groupby('city')['score'].transform('mean')

# filter() — оставить только группы, прошедшие фильтр
df.groupby('city').filter(lambda x: x['score'].mean() > 85)`}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:16,margin:"16px 0"},children:[e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"df.groupby('city')['score'].mean()"}),e.jsx(f,{headers:["city","score"],rows:[["Kazan",95],["Moscow",82],["SPb",92]]})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:6},children:"После transform — city_avg в каждой строке"}),e.jsx(f,{headers:["name","city","score","city_avg"],rows:[["Alice","Moscow",88.5,82],["Bob","SPb",92,92],["Carol","Moscow",75.5,82],["Dave","Kazan",95,95]],highlightCols:[3]})]})]}),e.jsx(l,{children:"Стандартные агрегирующие функции"}),e.jsx(x,{rows:[["mean()","Среднее значение","g['score'].mean()"],["sum()","Сумма","g['score'].sum()"],["count()","Количество не-NaN","g['score'].count()"],["size()","Размер группы (с NaN)","g.size()"],["min()","Минимум","g['age'].min()"],["max()","Максимум","g['age'].max()"],["std()","Стандартное отклонение","g['score'].std()"],["var()","Дисперсия","g['score'].var()"],["median()","Медиана","g['score'].median()"],["first()","Первое значение","g['name'].first()"],["last()","Последнее значение","g['name'].last()"],["nunique()","Число уникальных","g['city'].nunique()"]]}),e.jsx(s,{questions:[{q:'Что делает df.groupby("city")["salary"].mean()?',a:"Группирует строки по уникальным значениям city и для каждой группы считает среднюю зарплату. Результат — Series: город → среднее значение."},{q:"Как применить несколько агрегаций сразу?",a:'df.groupby("city")["salary"].agg(["mean", "max", "count"]) или именованные агрегации .agg(avg=("salary","mean"), total=("salary","sum")).'},{q:"Что такое принцип split-apply-combine?",a:"Логика groupby: данные разбиваются на группы (split), к каждой применяется функция (apply), результаты собираются в итоговую таблицу (combine)."}]}),e.jsx(t,{id:"apply",children:"13. apply / map / applymap"}),e.jsx(d,{code:`# map() — для Series (поэлементно)
df['name'].map(str.upper)
df['score'].map(lambda x: 'A' if x >= 90 else 'B')
df['city'].map({'Moscow': 'Мск', 'SPb': 'СПб'})  # через словарь

# apply() для Series — как map, но мощнее
df['score'].apply(lambda x: round(x))

# apply() для DataFrame по строкам (axis=1)
df.apply(lambda row: row['name'] + '_' + row['city'], axis=1)

# apply() для DataFrame по столбцам (axis=0, по умолчанию)
df[['age', 'score']].apply(lambda col: col - col.mean())

# applymap() / map() (pandas 2.1+) — для каждой ячейки DataFrame
df[['age', 'score']].map(lambda x: round(x, 1))

# Практические примеры
df['grade'] = df['score'].apply(
    lambda s: 'A' if s >= 90 else ('B' if s >= 80 else 'C')
)

# Векторизованные операции быстрее apply()
# Плохо:
df['score'].apply(lambda x: x * 2)
# Лучше:
df['score'] * 2`}),e.jsxs(u,{children:[e.jsx("code",{style:{fontFamily:"monospace"},children:"apply()"})," — это Python-цикл. Если есть векторизованный аналог (арифметика, ",e.jsx("code",{style:{fontFamily:"monospace"},children:"str."}),", ",e.jsx("code",{style:{fontFamily:"monospace"},children:"dt."}),", numpy-функции), используйте его — он в 10–100 раз быстрее."]}),e.jsx(s,{questions:[{q:"Когда использовать apply() вместо векторных операций?",a:"apply() медленнее, поэтому его берут только для сложной логики, которую нельзя выразить векторно (через +, *, str-методы). Где возможно — векторные операции быстрее."},{q:"Чем map() отличается от apply()?",a:"map() работает только с Series и подходит для простых поэлементных преобразований. apply() работает и с Series, и со строками/столбцами DataFrame (через axis)."},{q:"Что делает axis=1 в df.apply(func, axis=1)?",a:"Функция применяется к каждой строке целиком (а не к столбцу). Это позволяет вычислять значение на основе нескольких столбцов одной строки."}]}),e.jsx(t,{id:"merge",children:"14. Объединение данных"}),e.jsx(l,{children:"pd.concat() — склеить по оси"}),e.jsx(d,{code:`# Вертикально (добавить строки)
df_all = pd.concat([df1, df2], ignore_index=True)
df_all = pd.concat([df1, df2], ignore_index=True, sort=False)

# Горизонтально (добавить столбцы)
df_wide = pd.concat([df1, df2], axis=1)

# Несколько датафреймов
pd.concat([df1, df2, df3], ignore_index=True)`}),e.jsx(l,{children:"pd.merge() — JOIN по ключу"}),e.jsx(d,{code:`# INNER JOIN (пересечение)
result = pd.merge(df_left, df_right, on='id')

# LEFT JOIN
result = pd.merge(df_left, df_right, on='id', how='left')

# RIGHT JOIN
result = pd.merge(df_left, df_right, on='id', how='right')

# OUTER JOIN (объединение)
result = pd.merge(df_left, df_right, on='id', how='outer')

# Ключи называются по-разному
pd.merge(df1, df2, left_on='user_id', right_on='id')

# По нескольким ключам
pd.merge(df1, df2, on=['city', 'date'])

# Указатели на совпадающие столбцы (не ключи)
pd.merge(df1, df2, on='id', suffixes=('_left', '_right'))`}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(180px, 1fr))",gap:12,margin:"16px 0"},children:[{label:"LEFT",color:"rgba(32,190,255,0.15)",desc:"Все строки левого + совпадения правого"},{label:"INNER",color:"rgba(100,200,255,0.12)",desc:"Только строки с совпадением в обоих"},{label:"RIGHT",color:"rgba(255,100,100,0.12)",desc:"Все строки правого + совпадения левого"},{label:"OUTER",color:"rgba(200,100,255,0.12)",desc:"Все строки обоих, NaN где нет совпадения"}].map(({label:a,color:r,desc:i})=>e.jsxs("div",{style:{background:r,border:"1px solid var(--border-color)",borderRadius:8,padding:14,textAlign:"center"},children:[e.jsxs("div",{style:{fontFamily:"monospace",fontWeight:700,color:"var(--text-primary)",marginBottom:6},children:["how='",a.toLowerCase(),"'"]}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)"},children:i})]},a))}),e.jsx(l,{children:"df.join() — объединить по индексу"}),e.jsx(d,{code:`# join по умолчанию использует индексы
df1.join(df2, how='left')
df1.join(df2, on='city')  # из df1 использовать столбец city`}),e.jsx(s,{questions:[{q:"Чем merge() отличается от concat()?",a:"merge() соединяет таблицы по ключевому столбцу (как SQL JOIN). concat() просто склеивает таблицы по строкам или столбцам без сопоставления ключей."},{q:"Что делает параметр how в merge()?",a:'Задаёт тип соединения: "inner" (только совпадения), "left" (все из левой), "right" (все из правой), "outer" (все строки обеих таблиц). По умолчанию inner.'},{q:"Как объединить два DataFrame по вертикали (друг под другом)?",a:"pd.concat([df1, df2]) с axis=0 (по умолчанию). Столбцы сопоставляются по именам; ignore_index=True пересоберёт индекс заново."}]}),e.jsx(t,{id:"strings",children:"15. Работа со строками (str accessor)"}),e.jsxs(p,{children:["Все строковые операции доступны через атрибут ",e.jsx("code",{style:{fontFamily:"monospace",color:"var(--accent-lime)"},children:".str"})," — они векторизованы и корректно обрабатывают NaN."]}),e.jsx(d,{code:`s = df['name']

s.str.upper()            # ALICE, BOB, …
s.str.lower()            # alice, bob, …
s.str.title()            # Alice, Bob, …
s.str.strip()            # убрать пробелы по краям
s.str.lstrip('A')        # убрать символ слева
s.str.replace('o', '0')  # замена
s.str.replace(r'd', '', regex=True)  # regex

s.str.len()              # длина строки
s.str.contains('li')     # bool Series
s.str.startswith('A')    # bool Series
s.str.endswith('e')      # bool Series
s.str.count('l')         # кол-во вхождений

s.str.split(',')         # разбить → списки
s.str.split(',', expand=True)  # → DataFrame
s.str.join(', ')         # склеить элементы списков
s.str.get(0)             # первый элемент (если список)

s.str[0]                 # первый символ каждой строки
s.str[1:3]               # срез символов

s.str.extract(r'(w+)_(d+)')  # regex группы → DataFrame
s.str.findall(r'd+')           # все совпадения → списки

s.str.pad(10, fillchar='*')     # дополнить до длины
s.str.zfill(5)                  # дополнить нулями слева`}),e.jsx(s,{questions:[{q:"Как применить строковый метод ко всему столбцу?",a:'Через аксессор .str: df["name"].str.lower(), .str.strip(), .str.upper(). Он применяет операцию к каждому значению столбца сразу.'},{q:"Как проверить, содержит ли строка подстроку?",a:'df["city"].str.contains("Моск") возвращает булеву Series. Её используют для фильтрации: df[df["city"].str.contains("Моск")].'},{q:"Как разбить строку на части по разделителю?",a:'df["fio"].str.split(" ") вернёт списки, а с параметром expand=True — отдельные столбцы. Удобно для разбора ФИО, адресов и т.п.'}]}),e.jsx(t,{id:"datetime",children:"16. Даты и время"}),e.jsx(d,{code:`# Создание дат
dates = pd.to_datetime(['2024-01-15', '2024-03-22'])
df['date'] = pd.to_datetime(df['date_str'], format='%d.%m.%Y')

# Генерация дат
pd.date_range('2024-01-01', periods=12, freq='M')  # 12 месяцев
pd.date_range('2024-01-01', '2024-12-31', freq='D')  # каждый день
pd.date_range('2024-01-01', periods=5, freq='B')   # рабочие дни`}),e.jsx(d,{code:`# Атрибуты через .dt accessor
df['date'].dt.year
df['date'].dt.month
df['date'].dt.day
df['date'].dt.hour
df['date'].dt.minute
df['date'].dt.second
df['date'].dt.dayofweek    # 0=Пн, 6=Вс
df['date'].dt.day_name()   # 'Monday', …
df['date'].dt.month_name() # 'January', …
df['date'].dt.quarter      # 1–4
df['date'].dt.is_month_end # bool
df['date'].dt.weekday      # alias для dayofweek

# Арифметика с датами
df['date'] + pd.Timedelta(days=7)
(df['end_date'] - df['start_date']).dt.days

# Временные ряды — resample()
# Нужен DatetimeIndex
df = df.set_index('date')
df['revenue'].resample('M').sum()    # по месяцам
df['revenue'].resample('Q').mean()   # по кварталам
df['revenue'].resample('D').ffill()  # заполнить по дням

# Сдвиг
df['score'].shift(1)   # сдвиг на 1 вперёд (предыдущее значение)
df['score'].shift(-1)  # сдвиг на 1 назад (следующее значение)
df['score'].diff()     # разница с предыдущей строкой`}),e.jsx(s,{questions:[{q:"Как преобразовать столбец со строками-датами в тип datetime?",a:'pd.to_datetime(df["date"]). После этого становится доступен аксессор .dt для работы с компонентами даты и времени.'},{q:"Как выделить год, месяц и день из даты?",a:'Через аксессор .dt: df["date"].dt.year, .dt.month, .dt.day. Также доступны .dt.hour, .dt.dayofweek и другие компоненты.'},{q:"Зачем устанавливать дату как индекс DataFrame?",a:'С DatetimeIndex доступны срезы по датам (df["2024-01"]), ресемплинг (resample) и удобная работа с временными рядами — группировка по дням, месяцам, годам.'}]}),e.jsx(t,{id:"pivot",children:"17. Pivot tables"}),e.jsx(d,{code:`# pivot_table — сводная таблица
pt = df.pivot_table(
    values='score',
    index='city',
    columns='grade',     # если есть столбец 'grade'
    aggfunc='mean',      # 'sum', 'count', np.mean и т.д.
    fill_value=0,        # вместо NaN
    margins=True,        # добавить итоги (All)
)

# pivot — без агрегации (уникальные комбинации)
df.pivot(index='name', columns='subject', values='score')

# crosstab — частоты / кросстаб
pd.crosstab(df['city'], df['grade'])
pd.crosstab(df['city'], df['grade'], normalize='index')  # доли

# stack / unstack — трансформация индексов
df.stack()    # столбцы → уровень индекса
df.unstack()  # уровень индекса → столбцы

# melt — wide → long
df_long = df.melt(
    id_vars=['name', 'city'],
    value_vars=['score', 'age'],
    var_name='metric',
    value_name='value',
)`}),e.jsx(f,{caption:"Пример pivot_table: средний score по city × grade",headers:["city","A","B","C","All"],rows:[["Kazan",95,"—","—",95],["Moscow","—",88.5,75.5,82],["SPb",92,"—","—",92],["All",93.5,88.5,75.5,87.75]],highlightRows:[3]}),e.jsx(s,{questions:[{q:"Чем pivot_table() отличается от pivot()?",a:"pivot() просто переставляет данные и требует уникальных комбинаций. pivot_table() умеет агрегировать (sum, mean) и корректно обрабатывает дубликаты."},{q:"Что задают параметры index, columns и values в pivot_table?",a:"index — что станет строками, columns — что станет столбцами, values — какие значения агрегировать. aggfunc определяет функцию агрегации (по умолчанию mean)."},{q:"Что делает параметр margins=True?",a:'Добавляет строку и столбец "All" с итогами по всем группам — удобно для сводных отчётов с общими суммами или средними.'}]}),e.jsx(t,{id:"window",children:"18. Оконные функции"}),e.jsx(d,{code:`# rolling() — скользящее окно
df['score'].rolling(window=3).mean()   # скользящее среднее
df['score'].rolling(window=3).sum()
df['score'].rolling(window=3).std()
df['score'].rolling(window=3, min_periods=1).mean()  # неполные окна

# expanding() — расширяющееся окно (нарастающий итог)
df['score'].expanding().mean()
df['score'].expanding().sum()
df['score'].expanding().max()

# ewm() — экспоненциальное скользящее среднее
df['score'].ewm(span=3).mean()

# Пример: скользящее среднее продаж за 7 дней
df = df.set_index('date')
df['revenue_7d'] = df['revenue'].rolling('7D').mean()

# cumsum, cumprod, cummax, cummin
df['score'].cumsum()   # нарастающая сумма
df['score'].cummax()   # нарастающий максимум`}),e.jsx(f,{caption:"rolling(window=3).mean() — скользящее среднее",headers:["день","score","rolling_mean_3"],rows:[[1,80,"NaN"],[2,85,"NaN"],[3,90,"85.0"],[4,70,"81.7"],[5,95,"85.0"]],highlightCols:[2]}),e.jsx(s,{questions:[{q:"Что такое скользящее среднее и как его посчитать?",a:'Среднее за последние N значений. df["col"].rolling(window=7).mean() даёт скользящее среднее за 7 периодов — сглаживает колебания во временных рядах.'},{q:"Чем rolling() отличается от expanding()?",a:"rolling(N) использует фиксированное окно из N последних значений. expanding() использует окно от начала до текущей строки, которое растёт. expanding().mean() — накопленное среднее."},{q:"Что делает метод shift()?",a:'Сдвигает значения столбца вверх или вниз: df["col"].shift(1) даёт значение предыдущей строки. Используется для расчёта изменений и сравнения с прошлым периодом.'}]}),e.jsx(t,{id:"performance",children:"19. Производительность"}),e.jsx(v,{items:["Используйте vectorized-операции вместо циклов и apply()","Задавайте типы данных явно: int32 вместо int64, category вместо object","Читайте только нужные столбцы: usecols=[…] в read_csv()","Используйте Parquet или Feather вместо CSV для больших файлов","query() и eval() компилируются в нативный код и работают быстрее","При работе с большими данными рассмотрите Polars или Dask"]}),e.jsx(d,{code:`# eval() — быстрые арифметические операции
df.eval('profit = revenue - cost')
df.eval('profit = revenue - cost', inplace=True)

# Сравнение производительности
# Медленно (Python-цикл):
result = [x * 2 for x in df['score']]

# Быстро (векторизация):
result = df['score'] * 2

# Быстро (apply только когда нет вектора):
df['grade'] = df['score'].apply(lambda x: 'A' if x >= 90 else 'B')

# Ещё быстрее:
df['grade'] = 'B'
df.loc[df['score'] >= 90, 'grade'] = 'A'

# Оценка памяти
df.memory_usage(deep=True).sum() / 1024**2  # МБ

# Оптимизация типов
def optimize_dtypes(df):
    for col in df.select_dtypes('object').columns:
        if df[col].nunique() / len(df) < 0.5:
            df[col] = df[col].astype('category')
    for col in df.select_dtypes('int64').columns:
        df[col] = pd.to_numeric(df[col], downcast='integer')
    return df`}),e.jsx(s,{questions:[{q:"Почему стоит избегать iterrows() и циклов по строкам?",a:"iterrows() очень медленный — обходит строки в Python-цикле и теряет преимущества векторизации NumPy. Лучше использовать векторные операции, apply или np.where."},{q:"Как уменьшить расход памяти большого DataFrame?",a:'Приводить числовые столбцы к меньшим типам (int32, float32) через astype, а повторяющиеся строки — к category. df.info(memory_usage="deep") покажет реальный размер.'},{q:"Что быстрее: векторная операция или apply?",a:'Векторная операция (df["a"] + df["b"]) почти всегда быстрее, так как выполняется на уровне NumPy в C. apply работает поэлементно в Python и медленнее.'}]}),e.jsx(t,{id:"cheatsheet",children:"20. Шпаргалка всех методов"}),e.jsx(l,{children:"Создание"}),e.jsx(x,{rows:[["pd.Series(data)","Создать Series","pd.Series([1,2,3])"],["pd.DataFrame(data)","Создать DataFrame","pd.DataFrame({…})"],["pd.read_csv(path)","Прочитать CSV","pd.read_csv('f.csv')"],["pd.read_excel(path)","Прочитать Excel","pd.read_excel('f.xlsx')"],["pd.read_parquet(path)","Прочитать Parquet","pd.read_parquet('f.pq')"],["pd.date_range(…)","Диапазон дат","pd.date_range('2024', periods=5)"],["pd.concat([df1,df2])","Склеить DataFrameы","pd.concat([df1,df2])"],["pd.merge(df1,df2,on=…)","Объединить по ключу","pd.merge(a,b,on='id')"]]}),e.jsx(l,{children:"Просмотр"}),e.jsx(x,{rows:[["df.head(n)","Первые n строк","df.head(10)"],["df.tail(n)","Последние n строк","df.tail(5)"],["df.sample(n)","Случайные n строк","df.sample(3)"],["df.info()","Типы и null-значения","df.info()"],["df.describe()","Статистика столбцов","df.describe()"],["df.shape","Размер (строки, столбцы)","df.shape"],["df.dtypes","Типы данных столбцов","df.dtypes"],["df.value_counts()","Частоты значений","df['city'].value_counts()"]]}),e.jsx(l,{children:"Выборка и фильтрация"}),e.jsx(x,{rows:[["df.loc[…]","Выборка по меткам","df.loc[0, 'name']"],["df.iloc[…]","Выборка по позиции","df.iloc[0, 1]"],["df.query(expr)","Фильтр через строку","df.query('age > 25')"],["df.isin(vals)","Проверка вхождения","df['city'].isin(['Msk'])"],["df.between(a,b)","Проверка диапазона","df['age'].between(20,30)"],["df.duplicated()","Найти дубликаты","df.duplicated()"],["df.drop_duplicates()","Удалить дубликаты","df.drop_duplicates()"]]}),e.jsx(l,{children:"Преобразование"}),e.jsx(x,{rows:[["df.sort_values(by)","Сортировать по столбцу","df.sort_values('age')"],["df.rename(columns=…)","Переименовать столбцы","df.rename(columns={'a':'b'})"],["df.drop(cols, axis=1)","Удалить столбцы","df.drop('col', axis=1)"],["df.astype(dtype)","Привести тип","df['age'].astype(int)"],["df.apply(func)","Применить функцию","df.apply(lambda r: …, axis=1)"],["df.map(func)","Поэлементно для Series","s.map(str.upper)"],["df.assign(**cols)","Добавить столбцы","df.assign(bonus=df.score*0.1)"],["df.pipe(func)","Цепочка функций","df.pipe(clean).pipe(transform)"]]}),e.jsx(l,{children:"Пропущенные значения"}),e.jsx(x,{rows:[["df.isna() / isnull()","Маска пропущенных","df.isna().sum()"],["df.dropna()","Удалить строки с NaN","df.dropna(subset=['age'])"],["df.fillna(val)","Заполнить NaN","df.fillna(0)"],["df.interpolate()","Линейная интерполяция","df['x'].interpolate()"],["df.replace(old,new)","Заменить значения","df.replace(-1, np.nan)"]]}),e.jsx(l,{children:"Агрегация"}),e.jsx(x,{rows:[["df.groupby(col)","Группировка","df.groupby('city')"],["g.agg({col: funcs})","Несколько агрегаций","g.agg({'score': 'mean'})"],["g.transform(func)","Сохранить форму df","g['score'].transform('mean')"],["df.pivot_table(…)","Сводная таблица","df.pivot_table(values='s',…)"],["df.melt(…)","Wide → Long","df.melt(id_vars=['name'])"],["df.crosstab(…)","Таблица частот","pd.crosstab(df.a, df.b)"]]}),e.jsx(s,{questions:[{q:"Какие три метода всегда применяют при первом взгляде на данные?",a:"df.head() — первые строки, df.info() — типы и пропуски, df.describe() — статистика. Это базовый старт любого разведочного анализа (EDA)."},{q:"Какой метод покажет частоту значений в столбце?",a:'df["col"].value_counts() — частоту каждого уникального значения по убыванию. С normalize=True вернёт доли вместо абсолютных чисел.'},{q:"Чем фильтрация по маске отличается от .query()?",a:`Маска: df[df["age"] > 18]. query() позволяет писать условие строкой: df.query("age > 18 and city == 'Москва'"). query короче и читабельнее для сложных условий.`}]}),e.jsxs("div",{style:{background:"var(--bg-secondary)",border:"1px solid rgba(32,190,255,0.15)",borderRadius:10,padding:"clamp(16px, 3vw, 24px)",margin:"40px 0 20px",textAlign:"center"},children:[e.jsx("div",{style:{color:"var(--accent-lime)",fontWeight:700,fontSize:16,marginBottom:8},children:"Официальная документация"}),e.jsx("p",{style:{color:"var(--text-secondary)",fontSize:13,marginBottom:12},children:"pandas.pydata.org — User Guide, API Reference и примеры от разработчиков"}),e.jsx("div",{style:{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"},children:["pandas.pydata.org/docs/","pandas.pydata.org/cheat_sheet.pdf"].map(a=>e.jsx("code",{style:{fontFamily:"monospace",fontSize:12,background:"var(--bg-tertiary)",padding:"4px 10px",borderRadius:4,color:"var(--text-secondary)"},children:a},a))})]})]})}export{S as default};
