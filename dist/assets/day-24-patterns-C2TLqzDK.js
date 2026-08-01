import{r as y,j as e}from"./index-Q2r_RByx.js";import{T as j}from"./TheoryTable-DAHDqW7V.js";const o={box:(a="var(--bg-tertiary)",i="var(--border-color)",l="var(--text-primary)")=>({display:"flex",alignItems:"center",justifyContent:"center",minWidth:36,height:36,padding:"0 8px",background:a,color:l,borderWidth:1,borderStyle:"solid",borderColor:i,borderRadius:7,fontSize:13,fontWeight:700,fontFamily:"monospace"}),wrap:{background:"var(--bg-secondary)",border:"1px solid var(--border-color)",borderRadius:12,padding:"18px 20px",margin:"14px 0"},row:{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"},label:{fontSize:11,color:"var(--text-tertiary)",fontFamily:"monospace"},caption:{fontSize:12,color:"var(--text-secondary)",marginTop:10}},m="var(--accent-lime)",f={background:m,color:"#0a0a14",borderWidth:1,borderStyle:"solid",borderColor:m,borderRadius:7,padding:"5px 14px",fontSize:12,fontWeight:700,cursor:"pointer"},p={background:"var(--bg-tertiary)",color:"var(--text-secondary)",borderWidth:1,borderStyle:"solid",borderColor:"var(--border-color)",borderRadius:7,padding:"5px 12px",fontSize:12,fontWeight:600,cursor:"pointer"};function b(){const a=[1,2,3,4,5,6],i=a.reduce((t,s,r)=>(t.push((t[r-1]||0)+s),t),[]),[l,d]=y.useState(1),[n,c]=y.useState(3),h=i[n]-(l>0?i[l-1]:0);return e.jsxs("div",{style:o.wrap,children:[e.jsxs("div",{style:{...o.row,marginBottom:10},children:[a.map((t,s)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:o.label,children:s}),e.jsx("div",{style:o.box(s>=l&&s<=n?"rgba(32,190,255,0.18)":"var(--bg-tertiary)",s>=l&&s<=n?m:"var(--border-color)",s>=l&&s<=n?m:"var(--text-primary)"),children:t})]},s)),e.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:18},children:"→"}),e.jsx("div",{style:o.box("rgba(63,185,80,0.15)","#3fb950","#3fb950"),children:h})]}),e.jsxs("div",{style:{...o.row,marginBottom:10},children:[e.jsx("span",{style:{...o.label,marginRight:4},children:"Prefix P:"}),i.map((t,s)=>e.jsx("div",{style:o.box(s===n||l>0&&s===l-1?"rgba(248,81,73,0.15)":"var(--bg-tertiary)",s===n||l>0&&s===l-1?"#f85149":"var(--border-color)",s===n||l>0&&s===l-1?"#f85149":"var(--text-secondary)"),children:t},s))]}),e.jsxs("div",{style:{...o.row,gap:14},children:[e.jsxs("label",{style:o.label,children:["i: ",e.jsx("input",{type:"range",min:"0",max:"5",value:l,onChange:t=>d(Math.min(+t.target.value,n)),style:{width:80}})]}),e.jsxs("label",{style:o.label,children:["j: ",e.jsx("input",{type:"range",min:"0",max:"5",value:n,onChange:t=>c(Math.max(+t.target.value,l)),style:{width:80}})]}),e.jsxs("span",{style:{fontSize:12,color:m,fontFamily:"monospace"},children:["sum[",l,"..",n,"] = P[",n,"]",l>0?` − P[${l-1}]`:""," = ",h]})]})]})}function w(){const a=[1,2,3,4,6],i=6,[l,d]=y.useState(0),n=[];let c=0,h=a.length-1;for(;c<h;){const s=a[c]+a[h];if(n.push({l:c,r:h,s,status:s===i?"found":s<i?"small":"big"}),s===i)break;s<i?c++:h--}const t=n[Math.min(l,n.length-1)];return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{...o.row,marginBottom:14},children:a.map((s,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:{...o.label,color:r===t.l?"#58a6ff":r===t.r?"#f85149":"transparent"},children:r===t.l?"L":r===t.r?"R":"."}),e.jsx("div",{style:o.box(t.status==="found"&&(r===t.l||r===t.r)?"rgba(63,185,80,0.2)":r===t.l?"rgba(88,166,255,0.15)":r===t.r?"rgba(248,81,73,0.15)":"var(--bg-tertiary)",r===t.l?"#58a6ff":r===t.r?"#f85149":"var(--border-color)",r===t.l?"#58a6ff":r===t.r?"#f85149":"var(--text-primary)"),children:s})]},r))}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:t.status==="found"?`✓ ${a[t.l]} + ${a[t.r]} = ${i} — нашли!`:t.status==="small"?`${a[t.l]} + ${a[t.r]} = ${t.s} < ${i} → двигаем L вправо`:`${a[t.l]} + ${a[t.r]} = ${t.s} > ${i} → двигаем R влево`}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>d(0),children:"↩ Сначала"}),e.jsx("button",{style:p,onClick:()=>d(s=>Math.max(0,s-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>d(s=>Math.min(n.length-1,s+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Шаг ",Math.min(l,n.length-1)+1," из ",n.length]})]})]})}function S(){const a=[2,1,5,1,3,2],i=3,[l,d]=y.useState(0),n=a.length-i,c=a.slice(l,l+i).reduce((s,r)=>s+r,0),h=Array.from({length:n+1},(s,r)=>a.slice(r,r+i).reduce((x,g)=>x+g,0)),t=Math.max(...h);return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{...o.row,marginBottom:14},children:a.map((s,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:o.label,children:r}),e.jsx("div",{style:o.box(r>=l&&r<l+i?"rgba(32,190,255,0.18)":"var(--bg-tertiary)",r>=l&&r<l+i?m:"var(--border-color)",r>=l&&r<l+i?m:"var(--text-primary)"),children:s})]},r))}),e.jsxs("div",{style:{marginBottom:10,fontFamily:"monospace",fontSize:12,color:"var(--text-secondary)"},children:["Окно [",l,"..",l+i-1,"] → сумма = ",e.jsx("span",{style:{color:c===t?"#3fb950":m,fontWeight:700},children:c}),c===t?"  ← максимум ✓":""]}),e.jsx("input",{type:"range",min:"0",max:n,value:l,onChange:s=>d(+s.target.value),style:{width:"100%",marginBottom:8}}),e.jsxs("div",{style:{...o.row,gap:6},children:[h.map((s,r)=>e.jsx("div",{style:o.box(r===l?"rgba(32,190,255,0.18)":s===t?"rgba(63,185,80,0.12)":"var(--bg-primary)",r===l?m:s===t?"#3fb950":"var(--border-color)",r===l?m:s===t?"#3fb950":"var(--text-tertiary)"),children:s},r)),e.jsx("span",{style:o.label,children:"суммы окон"})]})]})}function k(){const a=[1,3,5,2,4],i=2,[l,d]=y.useState(0),n=8,c=r=>{let x=0,g=0;for(let u=0;u<r;u++)x=x+1>=a.length?i:x+1,g=g+1>=a.length?i:g+1,g=g+1>=a.length?i:g+1;return{s:x,f:g,meet:x===g}},{s:h,f:t,meet:s}=c(l);return e.jsxs("div",{style:o.wrap,children:[e.jsxs("div",{style:{...o.row,marginBottom:8},children:[a.map((r,x)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("div",{style:{...o.label,height:14},children:x===h&&x===t?"⟳":x===h?"🐢":x===t?"🐇":""}),e.jsx("div",{style:o.box(x===h&&x===t?"rgba(210,153,34,0.3)":x===h?"rgba(88,166,255,0.15)":x===t?"rgba(248,81,73,0.15)":"var(--bg-tertiary)",x===h&&x===t?"#d29922":x===h?"#58a6ff":x===t?"#f85149":"var(--border-color)"),children:r}),x<a.length-1&&e.jsx("span",{style:{...o.label,position:"absolute",marginLeft:52},children:"→"})]},x)),e.jsxs("span",{style:{...o.label,fontSize:12},children:["↩ к [",i,"]"]})]}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:s?`🐢 и 🐇 встретились на узле ${h} → цикл есть!`:`🐢 на [${h}], 🐇 на [${t}]`}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>d(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>d(r=>Math.max(0,r-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>d(r=>Math.min(n,r+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Шаг ",l]})]})]})}function C(){const a=[1,2,3,4,5],i=1,l=3,[d,n]=y.useState(!1),c=d?[1,4,3,2,5]:a;return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{marginBottom:8,fontSize:12,color:"var(--text-tertiary)"},children:d?"После разворота [m=1..n=3]":"До разворота"}),e.jsx("div",{style:{...o.row,marginBottom:14},children:c.map((h,t)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:o.label,children:t}),e.jsx("div",{style:o.box(t>=i&&t<=l?d?"rgba(63,185,80,0.15)":"rgba(32,190,255,0.15)":"var(--bg-tertiary)",t>=i&&t<=l?d?"#3fb950":m:"var(--border-color)",t>=i&&t<=l?d?"#3fb950":m:"var(--text-primary)"),children:h})]},t))}),d&&e.jsx("div",{style:{fontSize:11,color:"var(--text-tertiary)",fontFamily:"monospace",marginBottom:10},children:"prev → узлы [1→4→3→2] перевёрнуты → next"}),e.jsx("button",{style:d?p:f,onClick:()=>n(h=>!h),children:d?"↩ Показать до":"▶ Развернуть [1..3]"})]})}function _(){const a=[2,1,2,4,3],[i,l]=y.useState(0),d=[],n=[],c=Array(a.length).fill(-1);for(let t=0;t<a.length;t++){for(;n.length&&a[n[n.length-1]]<a[t];){const s=n.pop();c[s]=a[t],d.push({current:t,stack:[...n],result:[...c],note:`${a[s]} < ${a[t]} → следующий больший для [${s}] = ${a[t]}`})}n.push(t),d.push({current:t,stack:[...n],result:[...c],note:`Кладём [${t}]=${a[t]} в стек`})}d.push({current:-1,stack:[],result:[...c],note:"Готово — оставшиеся в стеке → -1"});const h=d[Math.min(i,d.length-1)];return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{...o.row,marginBottom:8},children:a.map((t,s)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:e.jsx("div",{style:o.box(s===h.current?"rgba(32,190,255,0.18)":h.stack.includes(s)?"rgba(88,166,255,0.12)":"var(--bg-tertiary)",s===h.current?m:h.stack.includes(s)?"#58a6ff":"var(--border-color)"),children:t})},s))}),e.jsxs("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginBottom:6},children:["Стек: [",h.stack.map(t=>a[t]).join(", "),"]"]}),e.jsxs("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginBottom:6},children:["Результат: [",h.result.join(", "),"]"]}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace",minHeight:20},children:h.note}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>l(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>l(t=>Math.max(0,t-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>l(t=>Math.min(d.length-1,t+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Шаг ",Math.min(i,d.length-1)+1,"/",d.length]})]})]})}function N(){const a=[3,2,1,5,6,4],i=2,[l,d]=y.useState(0),n=[],c=[],h=r=>{c.push(r),c.sort((x,g)=>x-g)},t=()=>c.shift();for(const r of a)if(h(r),c.length>i){const x=t();n.push({heap:[...c],note:`Добавили ${r}, убираем минимум ${x}`})}else n.push({heap:[...c],note:`Добавили ${r} в кучу`});n.push({heap:[...c],note:`K-й наибольший = корень кучи = ${c[0]}`});const s=n[Math.min(l,n.length-1)];return e.jsxs("div",{style:o.wrap,children:[e.jsxs("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginBottom:8},children:["Массив: [",a.join(", "),"]  k=",i]}),e.jsxs("div",{style:{...o.row,marginBottom:10},children:[e.jsx("span",{style:{...o.label,marginRight:4},children:"Min-heap (размер k):"}),s.heap.map((r,x)=>e.jsx("div",{style:o.box(x===0?"rgba(248,81,73,0.15)":"rgba(32,190,255,0.1)",x===0?"#f85149":m,x===0?"#f85149":m),children:r},x)),s.heap.length===0&&e.jsx("span",{style:o.label,children:"пусто"})]}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:s.note}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>d(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>d(r=>Math.max(0,r-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>d(r=>Math.min(n.length-1,r+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Шаг ",Math.min(l,n.length-1)+1,"/",n.length]})]})]})}function $(){const a=[[1,3],[2,6],[8,10],[15,18]],[i,l]=y.useState(!1),n=i?[[1,6],[8,10],[15,18]]:a,c=19,h=["#58a6ff","#d29922","#3fb950","#f85149","#a371f7"];return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{marginBottom:8,fontSize:12,color:"var(--text-tertiary)"},children:i?"После слияния:":"Исходные интервалы:"}),e.jsx("div",{style:{position:"relative",height:n.length*28+12,marginBottom:14},children:n.map(([t,s],r)=>e.jsxs("div",{style:{position:"absolute",top:r*28+4,left:`${t/c*100}%`,width:`${(s-t)/c*100}%`,height:22,background:h[r%h.length]+"33",borderWidth:2,borderStyle:"solid",borderColor:h[r%h.length],borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:h[r%h.length],fontFamily:"monospace",fontWeight:700},children:["[",t,",",s,"]"]},r))}),e.jsx("button",{style:i?p:f,onClick:()=>l(t=>!t),children:i?"↩ Показать до":"▶ Слить интервалы"})]})}function B(){const a=[4,5,6,7,0,1,2],i=0,[l,d]=y.useState(0),n=[];let c=0,h=a.length-1;for(;c<=h;){const s=Math.floor((c+h)/2);if(n.push({lo:c,hi:h,mid:s,found:a[s]===i}),a[s]===i)break;a[s]>=a[c]?i>=a[c]&&i<a[s]?h=s-1:c=s+1:i>a[s]&&i<=a[h]?c=s+1:h=s-1}const t=n[Math.min(l,n.length-1)];return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{...o.row,marginBottom:14},children:a.map((s,r)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsx("span",{style:{...o.label,color:r===t.mid?m:"transparent"},children:"mid"}),e.jsx("div",{style:o.box(t.found&&r===t.mid?"rgba(63,185,80,0.2)":r===t.mid?"rgba(32,190,255,0.2)":r>=t.lo&&r<=t.hi?"rgba(88,166,255,0.08)":"var(--bg-primary)",t.found&&r===t.mid?"#3fb950":r===t.mid?m:r>=t.lo&&r<=t.hi?"#58a6ff":"var(--border-color)"),children:s}),e.jsx("span",{style:{...o.label,color:r===t.lo?"#58a6ff":r===t.hi?"#f85149":"transparent"},children:r===t.lo?"lo":r===t.hi?"hi":"."})]},r))}),e.jsx("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:t.found?`✓ Нашли target=${i} на индексе ${t.mid}`:`arr[mid=${t.mid}]=${a[t.mid]} ≠ ${i}`}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>d(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>d(s=>Math.max(0,s-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>d(s=>Math.min(n.length-1,s+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Шаг ",Math.min(l,n.length-1)+1,"/",n.length]})]})]})}function M(){const[a,i]=y.useState("inorder"),d={preorder:[1,2,3,4,5,6,7],inorder:[4,2,5,1,6,3,7],postorder:[4,5,2,6,7,3,1]}[a],n=[{id:1,val:1,x:50,y:8},{id:2,val:2,x:25,y:35},{id:3,val:3,x:75,y:35},{id:4,val:4,x:12,y:65},{id:5,val:5,x:38,y:65},{id:6,val:6,x:62,y:65},{id:7,val:7,x:88,y:65}],c=[[1,2],[1,3],[2,4],[2,5],[3,6],[3,7]],[h,t]=y.useState(0),s=new Set(d.slice(0,h+1));return e.jsxs("div",{style:o.wrap,children:[e.jsxs("div",{style:{...o.row,marginBottom:10},children:[["preorder","inorder","postorder"].map(r=>e.jsx("button",{style:a===r?{...p,borderColor:m,color:m}:p,onClick:()=>{i(r),t(0)},children:r==="preorder"?"Pre":r==="inorder"?"In":"Post"},r)),e.jsxs("span",{style:o.label,children:[a,": [",d.join(", "),"]"]})]}),e.jsxs("div",{style:{position:"relative",height:120,marginBottom:10},children:[e.jsx("svg",{style:{position:"absolute",width:"100%",height:"100%"},children:c.map(([r,x])=>{const g=n.find(v=>v.id===r),u=n.find(v=>v.id===x);return e.jsx("line",{x1:`${g.x}%`,y1:`${g.y+5}%`,x2:`${u.x}%`,y2:`${u.y+5}%`,stroke:"var(--border-color)",strokeWidth:"1.5"},`${r}-${x}`)})}),n.map(r=>{const g=d.indexOf(r.val)===h,u=s.has(r.val);return e.jsxs("div",{style:{position:"absolute",left:`${r.x}%`,top:`${r.y}%`,transform:"translate(-50%,-50%)",...o.box(g?"rgba(32,190,255,0.25)":u?"rgba(63,185,80,0.15)":"var(--bg-tertiary)",g?m:u?"#3fb950":"var(--border-color)",g?m:u?"#3fb950":"var(--text-primary)"),position:"absolute",left:`${r.x}%`,top:`${r.y}%`,transform:"translate(-50%,-50%)",minWidth:32,height:32},children:[r.val,u&&e.jsx("span",{style:{position:"absolute",top:-10,right:-4,fontSize:9,color:u?"#3fb950":"transparent",fontFamily:"monospace"},children:d.indexOf(r.val)+1})]},r.id)})]}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>t(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>t(r=>Math.max(0,r-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>t(r=>Math.min(d.length-1,r+1)),children:"›"}),e.jsxs("span",{style:{fontSize:12,color:m,fontFamily:"monospace"},children:["Посещаем: ",d[h]]})]})]})}function z(){const a=[{id:1,x:50,y:8},{id:2,x:25,y:35},{id:3,x:75,y:35},{id:4,x:12,y:65},{id:5,x:38,y:65}],i=[[1,2],[1,3],[2,4],[2,5]],l=["1→2→4","1→2→5","1→3"],d=[1,2,4,5,3],[n,c]=y.useState(0),h=new Set(d.slice(0,n+1));return e.jsxs("div",{style:o.wrap,children:[e.jsxs("div",{style:{position:"relative",height:110,marginBottom:10},children:[e.jsx("svg",{style:{position:"absolute",width:"100%",height:"100%"},children:i.map(([t,s])=>{const r=a.find(u=>u.id===t),x=a.find(u=>u.id===s),g=h.has(t)&&h.has(s);return e.jsx("line",{x1:`${r.x}%`,y1:`${r.y+5}%`,x2:`${x.x}%`,y2:`${x.y+5}%`,stroke:g?m:"var(--border-color)",strokeWidth:g?2:1.5},`${t}-${s}`)})}),a.map(t=>e.jsx("div",{style:{position:"absolute",left:`${t.x}%`,top:`${t.y}%`,transform:"translate(-50%,-50%)",...o.box(h.has(t.id)?d.indexOf(t.id)===n?"rgba(32,190,255,0.25)":"rgba(63,185,80,0.15)":"var(--bg-tertiary)",h.has(t.id)?d.indexOf(t.id)===n?m:"#3fb950":"var(--border-color)"),minWidth:32,height:32},children:t.id},t.id))]}),e.jsxs("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:["Пути: ",l.join(" | ")]}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>c(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>c(t=>Math.max(0,t-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>c(t=>Math.min(d.length-1,t+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Узел ",d[n]]})]})]})}function I(){const a=[[3],[9,20],[15,7]],i=["#f85149","#d29922","#3fb950"],[l,d]=y.useState(0);return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:12,marginBottom:12},children:a.map((n,c)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:6},children:[c>0&&e.jsx("span",{style:{color:"var(--text-tertiary)",fontSize:12},children:"↓"}),e.jsxs("div",{style:{...o.row,justifyContent:"center"},children:[e.jsxs("span",{style:{...o.label,width:50},children:["уровень ",c,":"]}),n.map((h,t)=>e.jsx("div",{style:o.box(c<=l?i[c]+"22":"var(--bg-tertiary)",c<=l?i[c]:"var(--border-color)",c<=l?i[c]:"var(--text-primary)"),children:h},t))]})]},c))}),e.jsxs("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:["Очередь обходит уровень ",l," → [",a[Math.min(l,a.length-1)].join(", "),"]"]}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>d(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>d(n=>Math.min(a.length-1,n+1)),children:"Следующий уровень ›"})]})]})}function F(){const a=[[1,1,1],[1,1,0],[1,0,1]],i=[[2,2,2],[2,2,0],[2,0,1]],[l,d]=y.useState(!1),n=l?i:a,c={0:"var(--bg-primary)",1:"rgba(88,166,255,0.2)",2:"rgba(32,190,255,0.2)"},h={0:"var(--border-color)",1:"#58a6ff",2:m},t={0:"var(--text-tertiary)",1:"#58a6ff",2:m};return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{marginBottom:8,fontSize:12,color:"var(--text-tertiary)"},children:l?"После flood fill от (1,1) → цвет 2":"Исходная матрица, начинаем от (1,1)"}),e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(3, 40px)",gap:4,marginBottom:14},children:n.flat().map((s,r)=>e.jsx("div",{style:{...o.box(c[s],h[s],t[s]),minWidth:40},children:s},r))}),e.jsx("div",{children:e.jsx("button",{style:l?p:f,onClick:()=>d(s=>!s),children:l?"↩ Сброс":"▶ Flood Fill"})})]})}function L(){const[a,i]=y.useState(0),l=[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],d=l[Math.min(a,l.length-1)];return e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:10},children:"Генерируем перестановки [1,2,3]. Шаг = одна ветка рекурсии:"}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8,marginBottom:12},children:[[0,1,2].map(n=>e.jsxs("div",{style:{...o.row,paddingLeft:n*20},children:[e.jsxs("span",{style:o.label,children:["глубина ",n,":"]}),e.jsx("div",{style:o.box("rgba(32,190,255,0.18)",m,m),children:d[n]}),e.jsx("span",{style:{...o.label,color:"var(--text-secondary)"},children:n===0?"← выбор 1-го из [1,2,3]":n===1?"← из оставшихся":"← последний"})]},n)),e.jsxs("div",{style:{paddingLeft:60,fontSize:12,color:"#3fb950",fontFamily:"monospace"},children:["→ [",d.join(", "),"] ✓"]})]}),e.jsxs("div",{style:{fontSize:11,color:"var(--text-tertiary)",marginBottom:10},children:["Найдено ",a+1," из ",l.length," перестановок"]}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>i(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>i(n=>Math.max(0,n-1)),children:"‹ Назад"}),e.jsx("button",{style:p,onClick:()=>i(n=>Math.min(l.length-1,n+1)),children:"Следующая ›"})]})]})}function P(){const[i,l]=y.useState(0),d=[0,1];for(let n=2;n<=8;n++)d[n]=d[n-1]+d[n-2];return d.slice(0,i+2),e.jsxs("div",{style:o.wrap,children:[e.jsx("div",{style:{fontSize:12,color:"var(--text-tertiary)",marginBottom:10},children:"dp[i] = dp[i-1] + dp[i-2], строим таблицу снизу вверх:"}),e.jsx("div",{style:{...o.row,marginBottom:10,flexWrap:"wrap"},children:d.slice(0,9).map((n,c)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:4},children:[e.jsxs("span",{style:o.label,children:["dp[",c,"]"]}),e.jsx("div",{style:o.box(c<=i+1?c===i+1?"rgba(32,190,255,0.25)":"rgba(63,185,80,0.12)":"var(--bg-primary)",c<=i+1?c===i+1?m:"#3fb950":"var(--border-color)",c<=i+1?c===i+1?m:"#3fb950":"var(--text-tertiary)"),children:c<=i+1?n:"?"})]},c))}),i>=1&&e.jsxs("div",{style:{fontSize:12,color:"var(--text-secondary)",marginBottom:10,fontFamily:"monospace"},children:["dp[",i+1,"] = dp[",i,"] + dp[",i-1,"] = ",d[i]," + ",d[i-1]," = ",d[i+1]]}),e.jsxs("div",{style:o.row,children:[e.jsx("button",{style:f,onClick:()=>l(0),children:"↩"}),e.jsx("button",{style:p,onClick:()=>l(n=>Math.max(0,n-1)),children:"‹"}),e.jsx("button",{style:p,onClick:()=>l(n=>Math.min(7,n+1)),children:"›"}),e.jsxs("span",{style:o.label,children:["Вычислено до dp[",i+1,"]"]})]})]})}function T(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"День 23"}),e.jsx("p",{className:"theory-subtitle",children:"Паттерны алгоритмических задач"}),e.jsx("p",{className:"theory-date",children:"23 июня 2026"})]}),e.jsx("section",{className:"theory-section",children:e.jsx("p",{className:"theory-intro",children:"Большинство задач на собеседованиях сводятся к одному из 15 паттернов. Освой их — и новая задача станет лишь вариацией уже знакомого шаблона."})}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Префиксные суммы (Prefix Sum)"}),e.jsxs("p",{children:["Предварительно строим массив P, где P[i] — сумма от начала до i. После этого сумма любого подотрезка [i..j] считается за O(1): ",e.jsx("code",{children:"P[j] − P[i−1]"}),". Без этого каждый запрос стоил бы O(n)."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," множество запросов суммы на подмассиве, накопленные статистики."]}),e.jsx(b,{}),e.jsx(j,{language:"python",code:`def range_sum(nums, i, j):
    # строим префиксный массив за O(n)
    P = []
    total = 0
    for v in nums:
        total += v
        P.append(total)
    # запрос за O(1)
    return P[j] - (P[i - 1] if i > 0 else 0)

nums = [1, 2, 3, 4, 5, 6]
print(range_sum(nums, 1, 3))  # → 9  (2+3+4)`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #303 Range Sum Query, #525 Contiguous Array, #560 Subarray Sum Equals K"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Два указателя (Two Pointers)"}),e.jsxs("p",{children:["Два индекса движутся навстречу друг другу (или в одном направлении). Вместо перебора всех пар O(n²) получаем O(n). Работает на ",e.jsx("strong",{children:"отсортированных"})," массивах."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," найти пару с заданной суммой, удалить дубликаты, сравнить строки."]}),e.jsx(w,{}),e.jsx(j,{language:"python",code:`def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1
    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return [left, right]
        elif s < target:
            left += 1   # нужна большая сумма
        else:
            right -= 1  # нужна меньшая сумма
    return []

print(two_sum_sorted([1, 2, 3, 4, 6], 6))  # → [1, 3]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #167 Two Sum II, #15 3Sum, #11 Container With Most Water"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Скользящее окно (Sliding Window)"}),e.jsx("p",{children:"«Окно» фиксированного или переменного размера скользит по массиву. Вместо пересчёта суммы с нуля: вычитаем уходящий элемент, прибавляем входящий. Снижает O(n·k) до O(n)."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," подмассив/подстрока с заданным условием, максимум/минимум в окне."]}),e.jsx(S,{}),e.jsx(j,{language:"python",code:`def max_sum_subarray(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]  # скользим
        max_sum = max(max_sum, window_sum)
    return max_sum

print(max_sum_subarray([2, 1, 5, 1, 3, 2], 3))  # → 9`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #643 Maximum Average Subarray, #3 Longest Substring Without Repeating, #76 Minimum Window Substring"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Быстрый и медленный указатели (Fast & Slow)"}),e.jsx("p",{children:"«Черепаха и заяц» — slow делает 1 шаг, fast делает 2. Если есть цикл, fast в итоге догонит slow. Если цикла нет — fast дойдёт до конца."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," обнаружение цикла, середина списка, счастливые числа."]}),e.jsx(k,{}),e.jsx(j,{language:"python",code:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True   # встретились → цикл есть
    return False

def find_middle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow  # slow остановится на середине`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #141 Linked List Cycle, #202 Happy Number, #287 Find the Duplicate Number"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Разворот связного списка на месте"}),e.jsxs("p",{children:["Меняем направление указателей без выделения дополнительной памяти. Три переменные: ",e.jsx("code",{children:"prev"}),", ",e.jsx("code",{children:"curr"}),", ",e.jsx("code",{children:"next_node"})," — всё что нужно."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," развернуть весь список или его часть [m..n]."]}),e.jsx(C,{}),e.jsx(j,{language:"python",code:`def reverse_between(head, m, n):
    dummy = ListNode(0)
    dummy.next = head
    prev = dummy
    # доходим до позиции m
    for _ in range(m - 1):
        prev = prev.next
    curr = prev.next
    # разворачиваем n-m раз
    for _ in range(n - m):
        next_node = curr.next
        curr.next = next_node.next
        next_node.next = prev.next
        prev.next = next_node
    return dummy.next`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #206 Reverse Linked List, #92 Reverse Linked List II, #24 Swap Nodes in Pairs"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Монотонный стек (Monotonic Stack)"}),e.jsx("p",{children:"Стек хранит элементы в строго возрастающем или убывающем порядке. При добавлении нового элемента выталкиваем из стека всех «побеждённых». Для каждого из них текущий элемент и есть «следующий больший»."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," следующий/предыдущий больший или меньший элемент, гистограммы."]}),e.jsx(_,{}),e.jsx(j,{language:"python",code:`def next_greater(nums):
    result = [-1] * len(nums)
    stack = []  # хранит индексы

    for i, v in enumerate(nums):
        # пока стек не пуст и текущий > элемента на вершине
        while stack and nums[stack[-1]] < v:
            idx = stack.pop()
            result[idx] = v  # нашли следующий больший
        stack.append(i)

    return result

print(next_greater([2, 1, 2, 4, 3]))  # → [4, 2, 4, -1, -1]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #496 Next Greater Element I, #739 Daily Temperatures, #84 Largest Rectangle in Histogram"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Топ K элементов (Top K Elements)"}),e.jsx("p",{children:"Min-heap размером k хранит k наибольших элементов. Если новый элемент больше минимума кучи — заменяем. Корень кучи = k-й наибольший. Работает за O(n log k) против O(n log n) полной сортировки."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," k-й наибольший, топ-k частых, k ближайших точек."]}),e.jsx(N,{}),e.jsx(j,{language:"python",code:`import heapq

def kth_largest(nums, k):
    # min-heap размером k
    heap = []
    for v in nums:
        heapq.heappush(heap, v)
        if len(heap) > k:
            heapq.heappop(heap)  # убираем минимум
    return heap[0]  # корень = k-й наибольший

print(kth_largest([3, 2, 1, 5, 6, 4], 2))  # → 5`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #215 Kth Largest Element, #347 Top K Frequent Elements, #373 Find K Pairs with Smallest Sums"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"8. Перекрывающиеся интервалы (Overlapping Intervals)"}),e.jsx("p",{children:"Сортируем по началу. Для каждого следующего интервала проверяем: перекрывается ли он с последним в результате? Если да — расширяем конец; если нет — добавляем новый."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," расписания, объединение диапазонов, свободные слоты."]}),e.jsx($,{}),e.jsx(j,{language:"python",code:`def merge_intervals(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:          # перекрытие
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged

print(merge_intervals([[1,3],[2,6],[8,10],[15,18]]))
# → [[1,6],[8,10],[15,18]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #56 Merge Intervals, #57 Insert Interval, #435 Non-Overlapping Intervals"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"9. Модифицированный бинарный поиск"}),e.jsx("p",{children:"В повёрнутом отсортированном массиве одна из половин всегда отсортирована. Определяем какая — и проверяем, лежит ли target в ней. Если да — ищем там, иначе в другой."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," поиск в ротированных/частично отсортированных массивах, поиск границ."]}),e.jsx(B,{}),e.jsx(j,{language:"python",code:`def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        # левая половина отсортирована
        if nums[lo] <= nums[mid]:
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        # правая половина отсортирована
        else:
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1

print(search_rotated([4,5,6,7,0,1,2], 0))  # → 4`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #33 Search in Rotated Sorted Array, #153 Find Minimum in Rotated, #240 Search a 2D Matrix II"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"10. Обход бинарного дерева"}),e.jsxs("p",{children:["Три порядка: ",e.jsx("strong",{children:"Pre"})," (корень→лево→право), ",e.jsx("strong",{children:"In"})," (лево→корень→право),",e.jsx("strong",{children:"Post"})," (лево→право→корень). InOrder BST даёт отсортированный порядок."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," практически в любой задаче на деревья."]}),e.jsx(M,{}),e.jsx(j,{language:"python",code:`def inorder(root):
    result = []
    def dfs(node):
        if not node:
            return
        dfs(node.left)       # лево
        result.append(node.val)  # корень
        dfs(node.right)      # право
    dfs(root)
    return result

def preorder(root):
    if not root: return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def postorder(root):
    if not root: return []
    return postorder(root.left) + postorder(root.right) + [root.val]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #257 Binary Tree Paths (Pre), #230 Kth Smallest in BST (In), #124 Max Path Sum (Post)"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"11. Поиск в глубину (DFS)"}),e.jsx("p",{children:"Уходим как можно глубже по одной ветке, затем откатываемся и идём в следующую. Реализуется рекурсией (стек вызовов) или явным стеком. Позволяет найти все пути, проверить связность, обойти весь граф."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," все пути, связность графа, топологическая сортировка, комбинации."]}),e.jsx(z,{}),e.jsx(j,{language:"python",code:`def all_paths(graph, start, end, path=None, visited=None):
    if path is None: path = []
    if visited is None: visited = set()
    path = path + [start]
    visited.add(start)
    if start == end:
        return [path]
    paths = []
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            new_paths = all_paths(graph, neighbor, end, path, visited.copy())
            paths.extend(new_paths)
    return paths

graph = {1: [2, 3], 2: [4, 5], 3: []}
print(all_paths(graph, 1, 4))  # → [[1, 2, 4]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #133 Clone Graph, #113 Path Sum II, #210 Course Schedule II"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"12. Поиск в ширину (BFS)"}),e.jsx("p",{children:"Обходим граф/дерево уровень за уровнем, используя очередь. Гарантированно находит кратчайший путь в невзвешенном графе — потому что сначала рассматриваем все узлы на расстоянии 1, затем 2 и т.д."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," кратчайший путь, обход по уровням, заражение/распространение."]}),e.jsx(I,{}),e.jsx(j,{language:"python",code:`from collections import deque

def bfs_level_order(root):
    if not root: return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):   # все узлы текущего уровня
            node = queue.popleft()
            level.append(node.val)
            if node.left:  queue.append(node.left)
            if node.right: queue.append(node.right)
        result.append(level)
    return result

# root = [3,9,20,null,null,15,7]
# → [[3], [9, 20], [15, 7]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #102 Level Order Traversal, #994 Rotting Oranges, #127 Word Ladder"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"13. Обход матрицы (Matrix Traversal)"}),e.jsx("p",{children:"Двумерная сетка = граф, где соседи — клетки в 4 направлениях (или 8). DFS/BFS применяются напрямую. Flood Fill, поиск островов — всё один паттерн."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," острова, заливка, распространение по сетке, лабиринт."]}),e.jsx(F,{}),e.jsx(j,{language:"python",code:`def flood_fill(image, sr, sc, new_color):
    old_color = image[sr][sc]
    if old_color == new_color:
        return image
    rows, cols = len(image), len(image[0])

    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if image[r][c] != old_color:
            return
        image[r][c] = new_color
        dfs(r+1, c); dfs(r-1, c)
        dfs(r, c+1); dfs(r, c-1)

    dfs(sr, sc)
    return image

# image = [[1,1,1],[1,1,0],[1,0,1]], sr=1, sc=1, new=2
# → [[2,2,2],[2,2,0],[2,0,1]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #733 Flood Fill, #200 Number of Islands, #130 Surrounded Regions"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"14. Возврат (Backtracking)"}),e.jsx("p",{children:"Строим решение шаг за шагом. Если зашли в тупик — откатываемся (backtrack) на шаг назад и пробуем следующий вариант. По сути — DFS по дереву решений с отсечением."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Когда использовать:"})," перестановки, комбинации, подмножества, судоку, N-Queens."]}),e.jsx(L,{}),e.jsx(j,{language:"python",code:`def permutations(nums):
    result = []

    def backtrack(current, remaining):
        if not remaining:
            result.append(current[:])  # нашли полное решение
            return
        for i, v in enumerate(remaining):
            current.append(v)
            backtrack(current, remaining[:i] + remaining[i+1:])
            current.pop()              # откат

    backtrack([], nums)
    return result

print(permutations([1,2,3]))
# → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #46 Permutations, #78 Subsets, #51 N-Queens"]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"15. Динамическое программирование (DP)"}),e.jsxs("p",{children:["Разбиваем задачу на подзадачи, решаем каждую один раз и сохраняем результат. Два подхода: ",e.jsx("strong",{children:"top-down"})," (мемоизация) и ",e.jsx("strong",{children:"bottom-up"})," (таблица снизу вверх). DP применяется когда есть перекрывающиеся подзадачи и оптимальная подструктура."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Подтипы:"})," Фибоначчи, 0/1 Knapsack, LCS, LIS, Coin Change, Partition."]}),e.jsx(P,{}),e.jsx(j,{language:"python",code:`# Top-down (мемоизация)
def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Bottom-up (таблица)
def fib_dp(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Knapsack 0/1
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0]*(capacity+1) for _ in range(n+1)]
    for i in range(1, n+1):
        for w in range(capacity+1):
            dp[i][w] = dp[i-1][w]
            if weights[i-1] <= w:
                dp[i][w] = max(dp[i][w], dp[i-1][w-weights[i-1]] + values[i-1])
    return dp[n][capacity]`}),e.jsxs("p",{children:[e.jsx("strong",{children:"LeetCode:"})," #70 Climbing Stairs, #198 House Robber, #322 Coin Change, #1143 LCS, #416 Partition Equal Subset Sum"]})]}),e.jsx("section",{className:"theory-section theory-section--closing",children:e.jsx("p",{className:"theory-closing-text",children:"Паттерны повторяются. Выучи шаблон — побеждай на любой задаче! 🎯"})})]})}export{T as default};
