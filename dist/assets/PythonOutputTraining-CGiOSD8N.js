import{r as c,j as e}from"./index-wPonemfz.js";const W=[{id:"mutable-default-arg",title:"Изменяемый аргумент по умолчанию",code:`def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))
print(add_item(2))`,answer:`[1]
[1, 2]`},{id:"late-binding-closure",title:"Позднее связывание в замыканиях",code:`funcs = []
for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])`,answer:"[2, 2, 2]"},{id:"banker-rounding",title:"Округление round() до чётного",code:`print(round(0.5))
print(round(1.5))
print(round(2.5))`,answer:`0
2
2`},{id:"chained-comparison",title:"Цепочка сравнений",code:`x = 5
print(1 < x < 10)
print(10 < x < 1)`,answer:`True
False`},{id:"float-precision",title:"Точность чисел с плавающей запятой",code:`print(0.1 + 0.2 == 0.3)
print(0.1 + 0.2)`,answer:`False
0.30000000000000004`},{id:"string-multiplication",title:"Умножение строки",code:`print('ab' * 3)
print(3 * 'x')`,answer:`ababab
xxx`},{id:"list-vs-tuple-unpack",title:"Распаковка с звёздочкой",code:`first, *rest = [1, 2, 3, 4]
print(rest)

*init, last = [1, 2, 3, 4]
print(init)`,answer:`[2, 3, 4]
[1, 2, 3]`},{id:"dict-order",title:"Порядок ключей словаря",code:`d = {'b': 2, 'a': 1, 'c': 3}
print(list(d.keys()))`,answer:"['b', 'a', 'c']"},{id:"boolean-arithmetic",title:"Арифметика с булевыми значениями",code:`print(True + True)
print(True == 1)
print(False == 0)
print(True + False + True)`,answer:`2
True
True
2`},{id:"string-slicing-negative",title:"Срезы строк с отрицательными индексами",code:`s = 'Python'
print(s[-3:])
print(s[:-3])
print(s[::-1])`,answer:`hon
Pyt
nohtyP`},{id:"shallow-copy-nested",title:"Поверхностное копирование вложенных списков",code:`original = [[1, 2], [3, 4]]
copy = original.copy()
copy[0][0] = 99

print(original)`,answer:"[[99, 2], [3, 4]]"},{id:"empty-list-identity",title:"Идентичность пустых списков",code:`a = []
b = []
print(a is b)
print(a == b)`,answer:`False
True`},{id:"exception-else-finally",title:"Порядок else и finally в try",code:`try:
    x = 1
except ValueError:
    print('except')
else:
    print('else')
finally:
    print('finally')`,answer:`else
finally`},{id:"list-comprehension-scope",title:"Область видимости в списковом включении",code:`x = 10
squares = [x for x in range(3)]
print(squares)
print(x)`,answer:`[0, 1, 2]
10`},{id:"or-short-circuit",title:"Оператор or возвращает не только True/False",code:`print(0 or 'default')
print('' or None or 'fallback')
print(5 or 10)`,answer:`default
fallback
5`},{id:"sort-key-stability",title:"Устойчивость сортировки",code:`data = [('b', 2), ('a', 2), ('c', 1)]
data.sort(key=lambda x: x[1])
print(data)`,answer:"[('c', 1), ('b', 2), ('a', 2)]"},{id:"string-format-index",title:"Форматирование строк с повтором индекса",code:"print('{0} {1} {0}'.format('a', 'b'))",answer:"a b a"},{id:"nested-function-nonlocal",title:"nonlocal во вложенной функции",code:`def outer():
    count = 0
    def inner():
        nonlocal count
        count += 1
        return count
    print(inner())
    print(inner())

outer()`,answer:`1
2`},{id:"set-deduplication-order",title:"Множество и дублирующиеся значения",code:`nums = [3, 1, 2, 3, 1, 4]
print(len(set(nums)))
print(sorted(set(nums)))`,answer:`4
[1, 2, 3, 4]`},{id:"walrus-operator",title:"Оператор моржа :=",code:`values = [1, 2, 3, 4, 5]
result = [y := x * 2 for x in values if x > 2]
print(result)
print(y)`,answer:`[6, 8, 10]
10`}];function P(s){const r=[...s];for(let o=r.length-1;o>0;o--){const i=Math.floor(Math.random()*(o+1));[r[o],r[i]]=[r[i],r[o]]}return r}function v(s){return s.replace(/\r\n/g,`
`).split(`
`).map(r=>r.trim()).join(`
`).trim()}const R=[5,10],B={width:"100%",minHeight:110,background:"var(--bg-tertiary)",border:"1px solid var(--border-color)",borderRadius:0,padding:"12px 14px",fontSize:14,fontFamily:"ui-monospace, monospace",color:"var(--text-primary)",outline:"none",resize:"vertical"};function O({onBack:s}){const[r,o]=c.useState("select"),[i,y]=c.useState([]),[a,f]=c.useState(0),[g,h]=c.useState([]),[d,x]=c.useState(""),[u,m]=c.useState(!1),[p,j]=c.useState(!1),w=t=>{const n=P(W).slice(0,t);y(n),f(0),h([]),x(""),m(!1),o("question")},k=()=>{if(u||!d.trim())return;const t=i[a],n=v(d)===v(t.answer);j(n),m(!0),h(N=>[...N,{correct:n}])},S=()=>{if(a+1>=i.length){o("finished");return}f(t=>t+1),x(""),m(!1)},T=()=>{o("select"),y([]),h([]),f(0),x(""),m(!1)},l=i.length,b=g.filter(t=>t.correct).length,z=g.filter(t=>!t.correct).length,C=l-g.length;return e.jsxs("section",{className:"page active",children:[e.jsxs("div",{className:"theory-breadcrumbs",children:[e.jsx("button",{className:"breadcrumb-link",onClick:s,children:"Тренировки"}),e.jsx("span",{className:"breadcrumb-sep",children:"/"}),e.jsx("span",{className:"breadcrumb-current",children:"Что выведет? (Python)"})]}),e.jsxs("div",{className:"page-header",children:[e.jsx("h1",{className:"page-title",children:"Что выведет? (Python)"}),e.jsx("p",{className:"page-subtitle",children:"Смотри на код и пиши, что именно он напечатает в консоль"})]}),r==="select"&&e.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-secondary)",padding:"clamp(20px, 4vw, 40px)",width:"100%"},children:[e.jsx("h2",{style:{fontSize:16,fontWeight:700,color:"var(--text-primary)",marginBottom:16},children:"Сколько задач хочешь пройти?"}),e.jsx("div",{style:{display:"flex",gap:12},children:R.map(t=>e.jsx("button",{onClick:()=>w(t),style:{flex:1,padding:"18px 0",fontSize:20,fontWeight:700,border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-tertiary)",color:"var(--text-primary)",cursor:"pointer",outline:"none",transition:"border-color 0.15s, color 0.15s"},onMouseEnter:n=>{n.currentTarget.style.borderColor="var(--accent-lime)",n.currentTarget.style.color="var(--accent-lime)"},onMouseLeave:n=>{n.currentTarget.style.borderColor="var(--border-color)",n.currentTarget.style.color="var(--text-primary)"},children:t},t))})]}),r==="question"&&i[a]&&e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:16,marginBottom:20,border:"1px solid var(--border-color)",borderRadius:0,padding:"12px 16px",background:"var(--bg-tertiary)",fontSize:13},children:[e.jsxs("span",{style:{color:"var(--text-primary)",fontWeight:700},children:["Всего: ",l]}),e.jsxs("span",{style:{color:"var(--accent-lime)"},children:["Правильно: ",b]}),e.jsxs("span",{style:{color:"#ff3333"},children:["Неправильно: ",z]}),e.jsxs("span",{style:{color:"var(--text-tertiary)"},children:["Осталось: ",C]})]}),e.jsxs("div",{style:{color:"var(--text-tertiary)",fontSize:12,marginBottom:8},children:["Задача ",a+1," из ",l]}),e.jsx("h3",{style:{fontSize:15,fontWeight:600,color:"var(--text-primary)",marginBottom:12},children:i[a].title}),e.jsx("pre",{className:"theory-code-block",style:{padding:16,margin:"0 0 20px",overflowX:"auto",fontSize:13,lineHeight:1.6,fontFamily:"ui-monospace, monospace",color:"var(--text-primary)"},children:i[a].code}),e.jsx("div",{style:{marginBottom:16},children:e.jsx("textarea",{value:d,onChange:t=>x(t.target.value),disabled:u,placeholder:"Впиши сюда, что выведет этот код (каждая строка — с новой строки)",style:{...B,opacity:u?.7:1}})}),!u&&e.jsx("button",{onClick:t=>{k(),t.currentTarget.blur()},disabled:!d.trim(),style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"none",borderRadius:0,background:"var(--accent-lime)",color:"#fff",outline:"none",cursor:d.trim()?"pointer":"not-allowed",opacity:d.trim()?1:.5},children:"Проверить"}),u&&e.jsxs("div",{children:[e.jsxs("div",{style:{marginBottom:12,padding:"12px 14px",border:`1px solid ${p?"var(--accent-lime)":"#ff3333"}`,background:p?"rgba(32,190,255,0.06)":"rgba(255,51,51,0.06)"},children:[e.jsx("div",{style:{fontWeight:700,fontSize:14,color:p?"var(--accent-lime)":"#ff3333",marginBottom:p?0:8},children:p?"Правильно!":"Неправильно"}),!p&&e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:4},children:"Правильный ответ:"}),e.jsx("pre",{style:{margin:0,fontFamily:"ui-monospace, monospace",fontSize:13,color:"var(--text-primary)",whiteSpace:"pre-wrap"},children:i[a].answer})]})]}),e.jsx("button",{onClick:t=>{S(),t.currentTarget.blur()},style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"none",borderRadius:0,background:"var(--accent-lime)",color:"#fff",cursor:"pointer",outline:"none"},children:a+1>=l?"Завершить":"Следующая задача"})]})]}),r==="finished"&&(()=>{const t=l>0?Math.round(b/l*100):0,n=t>=90?"Отлично!":t>=50?"Хорошо!":"Нужно ещё потренироваться, и всё получится!";return e.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-secondary)",padding:"clamp(24px, 5vw, 48px)",width:"100%",textAlign:"center"},children:[e.jsxs("div",{style:{fontSize:40,fontWeight:800,color:"var(--accent-lime)",marginBottom:8},children:[t,"%"]}),e.jsxs("div",{style:{fontSize:13,color:"var(--text-tertiary)",marginBottom:16},children:["Правильно ",b," из ",l]}),e.jsx("div",{style:{fontSize:18,fontWeight:700,color:"var(--text-primary)",marginBottom:24},children:n}),e.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center"},children:[e.jsx("button",{onClick:T,style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"none",borderRadius:0,background:"var(--accent-lime)",color:"#fff",cursor:"pointer",outline:"none"},children:"Пройти ещё раз"}),e.jsx("button",{onClick:s,style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"1px solid var(--border-color)",borderRadius:0,background:"transparent",color:"var(--text-secondary)",cursor:"pointer",outline:"none"},children:"К тренировкам"})]})]})})(),e.jsx("div",{className:"theory-footer",children:e.jsx("button",{className:"btn-back",onClick:s,children:"Вернуться к тренировкам"})})]})}export{O as default};
