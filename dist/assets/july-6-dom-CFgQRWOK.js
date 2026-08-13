import{j as e}from"./index-CH9KCahv.js";import{b as i,T as l,a as c}from"./TheoryTable-DGB7NVGY.js";import{V as d}from"./VideoPlayer-C905NM0b.js";const t={sub:"var(--text-secondary)",lime:"#20beff",yellow:"#facc15",blue:"#60a5fa",border:"#2a2a3a"};function o({children:s,caption:n}){return e.jsxs("figure",{style:{margin:"18px 0",display:"flex",flexDirection:"column",alignItems:"center",gap:8},children:[e.jsx("div",{style:{width:"100%",maxWidth:640,background:"#12121e",border:"1px solid #2a2a3a",borderRadius:10,padding:"16px",display:"flex",justifyContent:"center",overflowX:"auto"},children:s}),n&&e.jsx("figcaption",{style:{color:"var(--text-tertiary)",fontSize:12.5,textAlign:"center",maxWidth:640},children:n})]})}function r({name:s,children:n}){return e.jsxs("div",{style:{margin:"12px 0",paddingLeft:14,borderLeft:"2px solid var(--accent-lime)"},children:[e.jsx("span",{style:{color:"var(--accent-lime)",fontWeight:700},children:s}),e.jsxs("span",{style:{color:"var(--text-secondary)",fontSize:14,lineHeight:1.75},children:[" — ",n]})]})}function m(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"JavaScript: Взаимодействие с DOM деревом"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Frontend-разработка"}),e.jsx("p",{className:"theory-date",children:"6 июля 2026"}),e.jsxs("p",{children:["HTML описывает страницу статично. Чтобы она ",e.jsx("strong",{children:"ожила"})," — реагировала на клики, меняла текст, добавляла и удаляла элементы — JavaScript обращается к ",e.jsx("strong",{children:"DOM"}),". Сегодня разберём главное, что делает фронтендер каждый день: как найти нужный элемент, изменить его содержимое, стили и атрибуты, создать и удалить узлы, и как повесить обработчики событий."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2 theory-heading-2--centered",children:"Видео-лекция: Взаимодействие с DOM деревом"}),e.jsx(d,{src:"https://s3.regru.cloud/kirocamp/javascriptDay7.mov"})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Что такое DOM"}),e.jsxs(r,{name:"DOM (Document Object Model)",children:["представление HTML-страницы в виде ",e.jsx("strong",{children:"дерева объектов"}),". Браузер читает HTML и строит из него дерево: каждый тег становится ",e.jsx("strong",{children:"узлом"})," (node), вложенные теги — дочерними узлами. JavaScript видит это дерево через глобальный объект ",e.jsx("code",{children:"document"})," и может его менять — а браузер мгновенно перерисовывает страницу."]}),e.jsx(o,{caption:"HTML превращается в дерево DOM: document → html → body → внутри него заголовок и список с пунктами",children:e.jsxs("svg",{viewBox:"0 0 520 210",width:"100%",style:{maxWidth:520},xmlns:"http://www.w3.org/2000/svg",children:[[{x:210,y:20,t:"document",c:t.lime},{x:210,y:65,t:"html",c:t.blue},{x:210,y:110,t:"body",c:t.blue},{x:110,y:160,t:"h1",c:t.yellow},{x:310,y:160,t:"ul",c:t.yellow}].map((s,n)=>e.jsxs("g",{children:[e.jsx("rect",{x:s.x-40,y:s.y,width:"80",height:"28",rx:"6",fill:"var(--bg-tertiary)",stroke:s.c}),e.jsx("text",{x:s.x,y:s.y+18,fill:s.c,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:s.t})]},n)),e.jsx("line",{x1:"210",y1:"48",x2:"210",y2:"65",stroke:t.sub}),e.jsx("line",{x1:"210",y1:"93",x2:"210",y2:"110",stroke:t.sub}),e.jsx("line",{x1:"210",y1:"138",x2:"110",y2:"160",stroke:t.sub}),e.jsx("line",{x1:"210",y1:"138",x2:"310",y2:"160",stroke:t.sub}),e.jsx("rect",{x:"420",y:"160",width:"70",height:"28",rx:"6",fill:"var(--bg-tertiary)",stroke:t.yellow}),e.jsx("text",{x:"455",y:"178",fill:t.yellow,fontSize:"12",fontWeight:"700",textAnchor:"middle",children:"li × N"}),e.jsx("line",{x1:"350",y1:"174",x2:"420",y2:"174",stroke:t.sub})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Поиск элементов"}),e.jsxs("p",{children:["Чтобы что-то менять, элемент сначала надо ",e.jsx("strong",{children:"найти"})," в дереве. Основные способы:"]}),e.jsx(i,{headers:["Метод","Что находит"],rows:[['document.getElementById("id")',"один элемент по атрибуту id"],['document.querySelector(".css")',"ПЕРВЫЙ элемент по CSS-селектору"],['document.querySelectorAll(".css")',"ВСЕ подходящие элементы (список)"],['document.getElementsByClassName("c")',"все элементы с классом (живая коллекция)"]]}),e.jsx(l,{language:"js",code:`// По id — вернёт один элемент
const title = document.getElementById('title')

// querySelector — любой CSS-селектор, первый совпавший
const btn = document.querySelector('.submit-btn')
const firstItem = document.querySelector('ul li')       // первый li внутри ul

// querySelectorAll — все совпавшие, можно перебрать в цикле
const items = document.querySelectorAll('.list-item')
items.forEach(item => console.log(item.textContent))`}),e.jsxs(c,{title:"querySelector — главный инструмент",children:["На практике 90% времени используют ",e.jsx("code",{children:"querySelector"}),"/",e.jsx("code",{children:"querySelectorAll"}),": они принимают любой CSS-селектор (по тегу, классу, id, атрибуту), поэтому запомнить нужно в основном их."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Изменение содержимого и атрибутов"}),e.jsx("p",{children:"Найденный элемент можно читать и менять через его свойства."}),e.jsx(l,{language:"js",code:`const el = document.querySelector('#box')

// Текст внутри элемента
el.textContent = 'Новый текст'      // безопасно: вставляет как обычный текст
el.innerHTML = '<b>Жирный</b>'      // вставляет HTML (осторожно с чужими данными — XSS!)

// Атрибуты
el.setAttribute('data-id', '42')    // задать атрибут
el.getAttribute('data-id')          // прочитать
el.removeAttribute('disabled')      // удалить

// Частые свойства напрямую
const link = document.querySelector('a')
link.href = 'https://example.com'
const input = document.querySelector('input')
input.value = 'текст в поле'         // значение поля ввода`}),e.jsxs(r,{name:"textContent vs innerHTML",children:[e.jsx("code",{children:"textContent"})," вставляет строку как ",e.jsx("strong",{children:"чистый текст"})," — безопасно."," ",e.jsx("code",{children:"innerHTML"})," трактует строку как ",e.jsx("strong",{children:"HTML"})," и создаёт из неё элементы — мощно, но опасно для непроверенных данных (риск XSS-атаки). По умолчанию бери ",e.jsx("code",{children:"textContent"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Изменение стилей и классов"}),e.jsxs("p",{children:["Менять внешний вид напрямую через ",e.jsx("code",{children:"style"})," можно, но правильнее — переключать"," ",e.jsx("strong",{children:"CSS-классы"}),": стиль остаётся в CSS, а JS лишь навешивает/снимает классы."]}),e.jsx(l,{language:"js",code:`const el = document.querySelector('.card')

// Прямое изменение стиля (для точечных случаев)
el.style.color = 'red'
el.style.backgroundColor = '#222'   // camelCase вместо background-color

// Работа с классами — предпочтительный способ
el.classList.add('active')          // добавить класс
el.classList.remove('hidden')       // убрать класс
el.classList.toggle('open')         // есть → убрать, нет → добавить
el.classList.contains('active')     // true/false — есть ли класс`}),e.jsxs(c,{title:"Почему классы лучше",children:["Логика «как выглядит .active» живёт в CSS, а JS только решает «когда включить». Код чище, а дизайнер может менять оформление, не трогая скрипты. ",e.jsx("code",{children:"toggle"})," — идеален для «показать/скрыть»."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Создание и удаление узлов"}),e.jsx("p",{children:"DOM можно не только менять, но и достраивать: создавать новые элементы и вставлять их в дерево."}),e.jsx(l,{language:"js",code:`// 1. Создать элемент
const li = document.createElement('li')
li.textContent = 'Новый пункт'
li.classList.add('list-item')

// 2. Вставить его в дерево
const list = document.querySelector('ul')
list.appendChild(li)          // добавить последним ребёнком
list.prepend(li)              // добавить первым

// 3. Удалить элемент
li.remove()                   // удалить сам себя

// Очистить содержимое контейнера
list.innerHTML = ''           // быстрый способ убрать всех детей`}),e.jsx(o,{caption:"createElement создаёт узел «в воздухе», appendChild вставляет его в дерево — только тогда он появляется на странице",children:e.jsxs("svg",{viewBox:"0 0 520 150",width:"100%",style:{maxWidth:520},xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{x:"30",y:"55",width:"130",height:"40",rx:"8",fill:"var(--bg-tertiary)",stroke:t.yellow,strokeDasharray:"4 3"}),e.jsx("text",{x:"95",y:"72",fill:t.yellow,fontSize:"12",textAnchor:"middle",children:"createElement"}),e.jsx("text",{x:"95",y:"88",fill:t.sub,fontSize:"10",textAnchor:"middle",children:'узел "в воздухе"'}),e.jsx("line",{x1:"160",y1:"75",x2:"230",y2:"75",stroke:t.sub,strokeWidth:"2",markerEnd:"url(#dm)"}),e.jsx("text",{x:"195",y:"66",fill:t.sub,fontSize:"10",textAnchor:"middle",children:"appendChild"}),e.jsx("rect",{x:"250",y:"30",width:"240",height:"90",rx:"8",fill:"rgba(32,190,255,0.05)",stroke:t.lime}),e.jsx("text",{x:"370",y:"24",fill:t.lime,fontSize:"11",fontWeight:"700",textAnchor:"middle",children:"DOM-дерево (на странице)"}),[0,1,2].map(s=>e.jsx("rect",{x:"270",y:45+s*22,width:"200",height:"18",rx:"3",fill:"var(--bg-tertiary)",stroke:s===2?t.yellow:t.border},s)),e.jsx("text",{x:"370",y:"112",fill:t.yellow,fontSize:"10",textAnchor:"middle",children:"новый li — виден пользователю"}),e.jsx("defs",{children:e.jsx("marker",{id:"dm",markerWidth:"8",markerHeight:"8",refX:"6",refY:"3",orient:"auto",children:e.jsx("path",{d:"M0,0 L6,3 L0,6 Z",fill:t.sub})})})]})})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. События — реакция на действия пользователя"}),e.jsxs(r,{name:"Событие (event)",children:["сигнал о том, что что-то произошло: клик, ввод текста, отправка формы, нажатие клавиши. Мы «подписываемся» на событие через ",e.jsx("code",{children:"addEventListener"})," и передаём функцию-обработчик, которую браузер вызовет, когда событие случится."]}),e.jsx(l,{language:"js",code:`const btn = document.querySelector('#myButton')

// Подписка: "когда по кнопке кликнут — выполни функцию"
btn.addEventListener('click', () => {
  console.log('Кнопка нажата!')
})

// Объект события даёт детали: какой элемент, координаты, клавиша...
const input = document.querySelector('input')
input.addEventListener('input', (event) => {
  console.log('Сейчас в поле:', event.target.value)   // event.target — сам элемент
})

// Форма: отменяем перезагрузку страницы и обрабатываем сами
const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
  event.preventDefault()          // отменить стандартную отправку
  console.log('Форма отправлена без перезагрузки')
})`}),e.jsx(i,{headers:["Событие","Когда срабатывает"],rows:[["click","клик мышью по элементу"],["input","при каждом изменении текста в поле"],["submit","отправка формы"],["keydown / keyup","нажатие / отпускание клавиши"],["mouseenter / mouseleave","курсор вошёл / ушёл с элемента"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Всё вместе: мини-список задач"}),e.jsx("p",{children:"Соберём кусочки в маленькое приложение: добавление пункта по кнопке и удаление по клику."}),e.jsx(l,{language:"html",code:`<input id="task" placeholder="Новая задача">
<button id="add">Добавить</button>
<ul id="list"></ul>`}),e.jsx(l,{language:"js",code:`const input = document.querySelector('#task')
const addBtn = document.querySelector('#add')
const list = document.querySelector('#list')

addBtn.addEventListener('click', () => {
  const text = input.value.trim()
  if (!text) return                 // не добавляем пустое

  const li = document.createElement('li')   // создаём пункт
  li.textContent = text
  li.addEventListener('click', () => li.remove())  // клик по пункту — удалить
  list.appendChild(li)              // добавляем в список

  input.value = ''                  // очищаем поле
})`})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"Итоги"}),e.jsxs("p",{children:[e.jsx("strong",{children:"DOM"})," — это страница в виде дерева объектов, доступного через ",e.jsx("code",{children:"document"}),". Элементы ",e.jsx("strong",{children:"ищут"})," через ",e.jsx("code",{children:"querySelector"}),"/",e.jsx("code",{children:"querySelectorAll"}),","," ",e.jsx("strong",{children:"меняют"})," их содержимое (",e.jsx("code",{children:"textContent"}),"/",e.jsx("code",{children:"innerHTML"}),"), атрибуты и классы (",e.jsx("code",{children:"classList"}),"). Новые узлы ",e.jsx("strong",{children:"создают"})," через ",e.jsx("code",{children:"createElement"})," и вставляют ",e.jsx("code",{children:"appendChild"}),", а лишние удаляют ",e.jsx("code",{children:"remove()"}),". Реакцию на действия пользователя обеспечивают ",e.jsx("strong",{children:"события"})," через ",e.jsx("code",{children:"addEventListener"}),". Этих операций достаточно, чтобы построить любой интерактивный интерфейс без единой библиотеки."]})]})]})}export{m as default};
