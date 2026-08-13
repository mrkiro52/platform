import{r as u,j as r}from"./index-B8LYZed5.js";const T=["O(1)","O(n)","O(n log n)","O(n^2)","O(n^3)","O(n!)","O(2^n)"],N=[{id:"array-access",title:"Доступ к элементу массива по индексу",code:`def get_element(arr, index):
    return arr[index]`,answer:"O(1)"},{id:"hash-lookup",title:"Поиск элемента в множестве (set)",code:`def contains(s: set, x):
    return x in s`,answer:"O(1)"},{id:"linear-search",title:"Линейный поиск элемента в массиве",code:`def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1`,answer:"O(n)"},{id:"array-sum",title:"Сумма всех элементов массива",code:`def total(arr):
    result = 0
    for x in arr:
        result += x
    return result`,answer:"O(n)"},{id:"find-max",title:"Поиск максимума в массиве",code:`def find_max(arr):
    best = arr[0]
    for x in arr[1:]:
        if x > best:
            best = x
    return best`,answer:"O(n)"},{id:"binary-search",title:"Бинарный поиск в отсортированном массиве",code:`def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,answer:"O(n)"},{id:"merge-sort",title:"Сортировка слиянием (Merge Sort)",code:`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,answer:"O(n log n)"},{id:"quicksort",title:"Быстрая сортировка (Quicksort), средний случай",code:`def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + mid + quicksort(right)`,answer:"O(n log n)"},{id:"heapify-sort",title:"Сортировка кучей (Heap Sort)",code:`import heapq

def heap_sort(arr):
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]`,answer:"O(n log n)"},{id:"bubble-sort",title:"Пузырьковая сортировка (Bubble Sort)",code:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,answer:"O(n^2)"},{id:"pairs-sum",title:"Поиск всех пар с заданной суммой (два вложенных цикла)",code:`def find_pairs(arr, target):
    pairs = []
    for i in range(len(arr)):
        for j in range(i + 1, len(arr)):
            if arr[i] + arr[j] == target:
                pairs.append((i, j))
    return pairs`,answer:"O(n^2)"},{id:"insertion-sort",title:"Сортировка вставками (Insertion Sort)",code:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,answer:"O(n^2)"},{id:"matrix-multiply",title:"Перемножение двух матриц n × n (наивное)",code:`def matmul(a, b, n):
    c = [[0] * n for _ in range(n)]
    for i in range(n):
        for j in range(n):
            for k in range(n):
                c[i][j] += a[i][k] * b[k][j]
    return c`,answer:"O(n^3)"},{id:"triple-loop-triplets",title:"Поиск всех троек элементов с заданной суммой",code:`def find_triplets(arr, target):
    n = len(arr)
    result = []
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if arr[i] + arr[j] + arr[k] == target:
                    result.append((i, j, k))
    return result`,answer:"O(n^3)"},{id:"permutations",title:"Генерация всех перестановок массива",code:`from itertools import permutations

def all_permutations(arr):
    return list(permutations(arr))`,answer:"O(n!)"},{id:"traveling-salesman-brute",title:"Задача коммивояжёра, перебор всех маршрутов",code:`from itertools import permutations

def tsp_brute_force(cities, dist):
    best = float('inf')
    for route in permutations(cities[1:]):
        route = [cities[0]] + list(route)
        cost = sum(dist[route[i]][route[i+1]] for i in range(len(route) - 1))
        best = min(best, cost)
    return best`,answer:"O(n!)"},{id:"power-set",title:"Генерация всех подмножеств множества (булеан)",code:`def power_set(arr):
    result = [[]]
    for x in arr:
        result += [subset + [x] for subset in result]
    return result`,answer:"O(2^n)"},{id:"fibonacci-naive",title:"Наивный рекурсивный расчёт чисел Фибоначчи",code:`def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)`,answer:"O(2^n)"},{id:"subset-sum-brute",title:"Проверка, есть ли подмножество с заданной суммой (полный перебор)",code:`def subset_sum_exists(arr, target):
    n = len(arr)
    for mask in range(2 ** n):
        total = 0
        for i in range(n):
            if mask & (1 << i):
                total += arr[i]
        if total == target:
            return True
    return False`,answer:"O(2^n)"},{id:"binary-to-decimal",title:"Перевод двоичной строки фиксированной длины в число",code:`def binary_to_int(bits: str) -> int:
    return int(bits, 2)`,answer:"O(1)"}];function z(f){const o=[...f];for(let a=o.length-1;a>0;a--){const t=Math.floor(Math.random()*(a+1));[o[a],o[t]]=[o[t],o[a]]}return o}const W=[5,10],R={padding:"12px 8px",fontSize:14,fontWeight:700,fontFamily:"ui-monospace, monospace",border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-secondary)",color:"var(--text-primary)",cursor:"pointer",outline:"none",transition:"border-color 0.15s, background 0.15s, color 0.15s"};function M({onBack:f}){const[o,a]=u.useState("select"),[t,v]=u.useState([]),[i,m]=u.useState(0),[x,b]=u.useState([]),[h,p]=u.useState(null),[l,g]=u.useState(!1),w=e=>{const n=z(N).slice(0,e);v(n),m(0),b([]),p(null),g(!1),a("question")},O=e=>{if(l)return;const n=t[i],j=e===n.answer;p(e),g(!0),b(s=>[...s,{correct:j}])},k=()=>{if(i+1>=t.length){a("finished");return}m(e=>e+1),p(null),g(!1)},S=()=>{a("select"),v([]),b([]),m(0),p(null),g(!1)},c=t.length,y=x.filter(e=>e.correct).length,_=x.filter(e=>!e.correct).length,C=c-x.length;return r.jsxs("section",{className:"page active",children:[r.jsxs("div",{className:"theory-breadcrumbs",children:[r.jsx("button",{className:"breadcrumb-link",onClick:f,children:"Тренировки"}),r.jsx("span",{className:"breadcrumb-sep",children:"/"}),r.jsx("span",{className:"breadcrumb-current",children:"Сложность алгоритмов"})]}),r.jsxs("div",{className:"page-header",children:[r.jsx("h1",{className:"page-title",children:"Сложность алгоритмов"}),r.jsx("p",{className:"page-subtitle",children:"Смотри на код и угадывай его временную сложность"})]}),o==="select"&&r.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-secondary)",padding:"clamp(20px, 4vw, 40px)",width:"100%"},children:[r.jsx("h2",{style:{fontSize:16,fontWeight:700,color:"var(--text-primary)",marginBottom:16},children:"Сколько задач хочешь пройти?"}),r.jsx("div",{style:{display:"flex",gap:12},children:W.map(e=>r.jsx("button",{onClick:()=>w(e),style:{flex:1,padding:"18px 0",fontSize:20,fontWeight:700,border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-tertiary)",color:"var(--text-primary)",cursor:"pointer",outline:"none",transition:"border-color 0.15s, color 0.15s"},onMouseEnter:n=>{n.currentTarget.style.borderColor="var(--accent-lime)",n.currentTarget.style.color="var(--accent-lime)"},onMouseLeave:n=>{n.currentTarget.style.borderColor="var(--border-color)",n.currentTarget.style.color="var(--text-primary)"},children:e},e))})]}),o==="question"&&t[i]&&r.jsxs("div",{children:[r.jsxs("div",{style:{display:"flex",flexWrap:"wrap",gap:16,marginBottom:20,border:"1px solid var(--border-color)",borderRadius:0,padding:"12px 16px",background:"var(--bg-tertiary)",fontSize:13},children:[r.jsxs("span",{style:{color:"var(--text-primary)",fontWeight:700},children:["Всего: ",c]}),r.jsxs("span",{style:{color:"var(--accent-lime)"},children:["Правильно: ",y]}),r.jsxs("span",{style:{color:"#ff3333"},children:["Неправильно: ",_]}),r.jsxs("span",{style:{color:"var(--text-tertiary)"},children:["Осталось: ",C]})]}),r.jsxs("div",{style:{color:"var(--text-tertiary)",fontSize:12,marginBottom:8},children:["Задача ",i+1," из ",c]}),r.jsx("h3",{style:{fontSize:15,fontWeight:600,color:"var(--text-primary)",marginBottom:12},children:t[i].title}),r.jsx("pre",{className:"theory-code-block",style:{padding:16,margin:"0 0 20px",overflowX:"auto",fontSize:13,lineHeight:1.6,fontFamily:"ui-monospace, monospace",color:"var(--text-primary)"},children:t[i].code}),r.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(90px, 1fr))",gap:8,marginBottom:20},children:T.map(e=>{const n=e===t[i].answer,j=e===h;let s={...R};return l&&(n?s={...s,borderColor:"var(--accent-lime)",background:"rgba(32,190,255,0.1)",color:"var(--accent-lime)"}:j?s={...s,borderColor:"#ff3333",background:"rgba(255,51,51,0.08)",color:"#ff3333"}:s={...s,opacity:.5}),r.jsx("button",{onClick:d=>{O(e),d.currentTarget.blur()},disabled:l,style:{...s,cursor:l?"default":"pointer"},onMouseEnter:d=>{l||(d.currentTarget.style.borderColor="var(--accent-lime)",d.currentTarget.style.color="var(--accent-lime)")},onMouseLeave:d=>{l||(d.currentTarget.style.borderColor="var(--border-color)",d.currentTarget.style.color="var(--text-primary)")},children:e},e)})},i),l&&r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[r.jsx("span",{style:{fontWeight:700,fontSize:14,color:h===t[i].answer?"var(--accent-lime)":"#ff3333"},children:h===t[i].answer?"Правильно!":`Неправильно. Верный ответ: ${t[i].answer}`}),r.jsx("button",{onClick:e=>{k(),e.currentTarget.blur()},style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"none",borderRadius:0,background:"var(--accent-lime)",color:"#fff",cursor:"pointer",outline:"none"},children:i+1>=c?"Завершить":"Следующая задача"})]})]}),o==="finished"&&(()=>{const e=c>0?Math.round(y/c*100):0,n=e>=90?"Отлично!":e>=50?"Хорошо!":"Нужно ещё потренироваться, и всё получится!";return r.jsxs("div",{style:{border:"1px solid var(--border-color)",borderRadius:0,background:"var(--bg-secondary)",padding:"clamp(24px, 5vw, 48px)",width:"100%",textAlign:"center"},children:[r.jsxs("div",{style:{fontSize:40,fontWeight:800,color:"var(--accent-lime)",marginBottom:8},children:[e,"%"]}),r.jsxs("div",{style:{fontSize:13,color:"var(--text-tertiary)",marginBottom:16},children:["Правильно ",y," из ",c]}),r.jsx("div",{style:{fontSize:18,fontWeight:700,color:"var(--text-primary)",marginBottom:24},children:n}),r.jsxs("div",{style:{display:"flex",gap:12,justifyContent:"center"},children:[r.jsx("button",{onClick:S,style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"none",borderRadius:0,background:"var(--accent-lime)",color:"#fff",cursor:"pointer"},children:"Пройти ещё раз"}),r.jsx("button",{onClick:f,style:{padding:"10px 24px",fontSize:14,fontWeight:600,border:"1px solid var(--border-color)",borderRadius:0,background:"transparent",color:"var(--text-secondary)",cursor:"pointer"},children:"К тренировкам"})]})]})})(),r.jsx("div",{className:"theory-footer",children:r.jsx("button",{className:"btn-back",onClick:f,children:"Вернуться к тренировкам"})})]})}export{M as default};
