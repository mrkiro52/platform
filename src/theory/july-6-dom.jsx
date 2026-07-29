import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'
import VideoPlayer from '../components/VideoPlayer'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', yellow: '#facc15', blue: '#60a5fa', border: '#2a2a3a' }

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: '#12121e', border: '1px solid #2a2a3a',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 640 }}>{caption}</figcaption>}
    </figure>
  )
}

function Term({ name, children }) {
  return (
    <div style={{ margin: '12px 0', paddingLeft: 14, borderLeft: '2px solid var(--accent-lime)' }}>
      <span style={{ color: 'var(--accent-lime)', fontWeight: 700 }}>{name}</span>
      <span style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.75 }}> — {children}</span>
    </div>
  )
}

export default function July6DomTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">JavaScript: Взаимодействие с DOM деревом</h1>
        <p className="theory-subtitle">Трек: Frontend-разработка</p>
        <p className="theory-date">6 июля 2026</p>
        <p>
          HTML описывает страницу статично. Чтобы она <strong>ожила</strong> — реагировала на клики, меняла текст,
          добавляла и удаляла элементы — JavaScript обращается к <strong>DOM</strong>. Сегодня разберём главное,
          что делает фронтендер каждый день: как найти нужный элемент, изменить его содержимое, стили и атрибуты,
          создать и удалить узлы, и как повесить обработчики событий.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">🎥 Видео-лекция: Взаимодействие с DOM деревом</h2>
        <VideoPlayer src="https://s3.regru.cloud/kirocamp/javascriptDay7.mov" />
      </section>

      {/* Что такое DOM */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое DOM</h2>
        <Term name="DOM (Document Object Model)">
          представление HTML-страницы в виде <strong>дерева объектов</strong>. Браузер читает HTML и строит из него
          дерево: каждый тег становится <strong>узлом</strong> (node), вложенные теги — дочерними узлами.
          JavaScript видит это дерево через глобальный объект <code>document</code> и может его менять — а браузер
          мгновенно перерисовывает страницу.
        </Term>
        <Fig caption="HTML превращается в дерево DOM: document → html → body → внутри него заголовок и список с пунктами">
          <svg viewBox="0 0 520 210" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            {[
              {x:210,y:20,t:'document',c:C.lime},
              {x:210,y:65,t:'html',c:C.blue},
              {x:210,y:110,t:'body',c:C.blue},
              {x:110,y:160,t:'h1',c:C.yellow},
              {x:310,y:160,t:'ul',c:C.yellow},
            ].map((n,i)=>(
              <g key={i}>
                <rect x={n.x-40} y={n.y} width="80" height="28" rx="6" fill="var(--bg-tertiary)" stroke={n.c} />
                <text x={n.x} y={n.y+18} fill={n.c} fontSize="12" fontWeight="700" textAnchor="middle">{n.t}</text>
              </g>
            ))}
            <line x1="210" y1="48" x2="210" y2="65" stroke={C.sub} />
            <line x1="210" y1="93" x2="210" y2="110" stroke={C.sub} />
            <line x1="210" y1="138" x2="110" y2="160" stroke={C.sub} />
            <line x1="210" y1="138" x2="310" y2="160" stroke={C.sub} />
            <rect x="420" y="160" width="70" height="28" rx="6" fill="var(--bg-tertiary)" stroke={C.yellow} />
            <text x="455" y="178" fill={C.yellow} fontSize="12" fontWeight="700" textAnchor="middle">li × N</text>
            <line x1="350" y1="174" x2="420" y2="174" stroke={C.sub} />
          </svg>
        </Fig>
      </section>

      {/* Поиск элементов */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Поиск элементов</h2>
        <p>Чтобы что-то менять, элемент сначала надо <strong>найти</strong> в дереве. Основные способы:</p>
        <TheoryTable
          headers={['Метод', 'Что находит']}
          rows={[
            ['document.getElementById("id")', 'один элемент по атрибуту id'],
            ['document.querySelector(".css")', 'ПЕРВЫЙ элемент по CSS-селектору'],
            ['document.querySelectorAll(".css")', 'ВСЕ подходящие элементы (список)'],
            ['document.getElementsByClassName("c")', 'все элементы с классом (живая коллекция)'],
          ]}
        />
        <TheoryCode language="js" code={`// По id — вернёт один элемент
const title = document.getElementById('title')

// querySelector — любой CSS-селектор, первый совпавший
const btn = document.querySelector('.submit-btn')
const firstItem = document.querySelector('ul li')       // первый li внутри ul

// querySelectorAll — все совпавшие, можно перебрать в цикле
const items = document.querySelectorAll('.list-item')
items.forEach(item => console.log(item.textContent))`} />
        <TheoryExample title="querySelector — главный инструмент">
          На практике 90% времени используют <code>querySelector</code>/<code>querySelectorAll</code>: они принимают
          любой CSS-селектор (по тегу, классу, id, атрибуту), поэтому запомнить нужно в основном их.
        </TheoryExample>
      </section>

      {/* Изменение содержимого */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Изменение содержимого и атрибутов</h2>
        <p>Найденный элемент можно читать и менять через его свойства.</p>
        <TheoryCode language="js" code={`const el = document.querySelector('#box')

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
input.value = 'текст в поле'         // значение поля ввода`} />
        <Term name="textContent vs innerHTML">
          <code>textContent</code> вставляет строку как <strong>чистый текст</strong> — безопасно.{' '}
          <code>innerHTML</code> трактует строку как <strong>HTML</strong> и создаёт из неё элементы — мощно, но
          опасно для непроверенных данных (риск XSS-атаки). По умолчанию бери <code>textContent</code>.
        </Term>
      </section>

      {/* Стили и классы */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Изменение стилей и классов</h2>
        <p>
          Менять внешний вид напрямую через <code>style</code> можно, но правильнее — переключать{' '}
          <strong>CSS-классы</strong>: стиль остаётся в CSS, а JS лишь навешивает/снимает классы.
        </p>
        <TheoryCode language="js" code={`const el = document.querySelector('.card')

// Прямое изменение стиля (для точечных случаев)
el.style.color = 'red'
el.style.backgroundColor = '#222'   // camelCase вместо background-color

// Работа с классами — предпочтительный способ
el.classList.add('active')          // добавить класс
el.classList.remove('hidden')       // убрать класс
el.classList.toggle('open')         // есть → убрать, нет → добавить
el.classList.contains('active')     // true/false — есть ли класс`} />
        <TheoryExample title="Почему классы лучше">
          Логика «как выглядит .active» живёт в CSS, а JS только решает «когда включить». Код чище, а дизайнер
          может менять оформление, не трогая скрипты. <code>toggle</code> — идеален для «показать/скрыть».
        </TheoryExample>
      </section>

      {/* Создание и удаление */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Создание и удаление узлов</h2>
        <p>DOM можно не только менять, но и достраивать: создавать новые элементы и вставлять их в дерево.</p>
        <TheoryCode language="js" code={`// 1. Создать элемент
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
list.innerHTML = ''           // быстрый способ убрать всех детей`} />
        <Fig caption="createElement создаёт узел «в воздухе», appendChild вставляет его в дерево — только тогда он появляется на странице">
          <svg viewBox="0 0 520 150" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="30" y="55" width="130" height="40" rx="8" fill="var(--bg-tertiary)" stroke={C.yellow} strokeDasharray="4 3" />
            <text x="95" y="72" fill={C.yellow} fontSize="12" textAnchor="middle">createElement</text>
            <text x="95" y="88" fill={C.sub} fontSize="10" textAnchor="middle">узел "в воздухе"</text>
            <line x1="160" y1="75" x2="230" y2="75" stroke={C.sub} strokeWidth="2" markerEnd="url(#dm)" />
            <text x="195" y="66" fill={C.sub} fontSize="10" textAnchor="middle">appendChild</text>
            <rect x="250" y="30" width="240" height="90" rx="8" fill="rgba(32,190,255,0.05)" stroke={C.lime} />
            <text x="370" y="24" fill={C.lime} fontSize="11" fontWeight="700" textAnchor="middle">DOM-дерево (на странице)</text>
            {[0,1,2].map(i=>(<rect key={i} x="270" y={45+i*22} width="200" height="18" rx="3" fill="var(--bg-tertiary)" stroke={i===2?C.yellow:C.border} />))}
            <text x="370" y="112" fill={C.yellow} fontSize="10" textAnchor="middle">новый li — виден пользователю</text>
            <defs>
              <marker id="dm" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill={C.sub} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      {/* События */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. События — реакция на действия пользователя</h2>
        <Term name="Событие (event)">
          сигнал о том, что что-то произошло: клик, ввод текста, отправка формы, нажатие клавиши. Мы «подписываемся»
          на событие через <code>addEventListener</code> и передаём функцию-обработчик, которую браузер вызовет,
          когда событие случится.
        </Term>
        <TheoryCode language="js" code={`const btn = document.querySelector('#myButton')

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
})`} />
        <TheoryTable
          headers={['Событие', 'Когда срабатывает']}
          rows={[
            ['click', 'клик мышью по элементу'],
            ['input', 'при каждом изменении текста в поле'],
            ['submit', 'отправка формы'],
            ['keydown / keyup', 'нажатие / отпускание клавиши'],
            ['mouseenter / mouseleave', 'курсор вошёл / ушёл с элемента'],
          ]}
        />
      </section>

      {/* Пример */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Всё вместе: мини-список задач</h2>
        <p>Соберём кусочки в маленькое приложение: добавление пункта по кнопке и удаление по клику.</p>
        <TheoryCode language="html" code={`<input id="task" placeholder="Новая задача">
<button id="add">Добавить</button>
<ul id="list"></ul>`} />
        <TheoryCode language="js" code={`const input = document.querySelector('#task')
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
})`} />
      </section>

      {/* Итоги */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <p>
          <strong>DOM</strong> — это страница в виде дерева объектов, доступного через <code>document</code>.
          Элементы <strong>ищут</strong> через <code>querySelector</code>/<code>querySelectorAll</code>,{' '}
          <strong>меняют</strong> их содержимое (<code>textContent</code>/<code>innerHTML</code>), атрибуты и
          классы (<code>classList</code>). Новые узлы <strong>создают</strong> через <code>createElement</code> и
          вставляют <code>appendChild</code>, а лишние удаляют <code>remove()</code>. Реакцию на действия
          пользователя обеспечивают <strong>события</strong> через <code>addEventListener</code>. Этих операций
          достаточно, чтобы построить любой интерактивный интерфейс без единой библиотеки.
        </p>
      </section>
    </div>
  )
}
