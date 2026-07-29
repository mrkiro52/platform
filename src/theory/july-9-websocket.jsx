import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

const C = { text: 'var(--text-primary)', sub: 'var(--text-secondary)', lime: '#20beff', blue: '#60a5fa', green: '#4ade80', red: '#f87171', yellow: '#facc15', border: '#2a2a3a' }

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

function P({ n, children }) {
  return (
    <div style={{ display: 'flex', gap: 12, margin: '14px 0', alignItems: 'flex-start' }}>
      <span style={{
        flexShrink: 0, width: 26, height: 26, borderRadius: '50%', border: '1.5px solid var(--accent-lime)',
        color: 'var(--accent-lime)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginTop: 2,
      }}>{n}</span>
      <p style={{ margin: 0, flex: 1 }}>{children}</p>
    </div>
  )
}

function Step({ n, title, children }) {
  return (
    <div style={{ margin: '16px 0 16px 14px', paddingLeft: 16, borderLeft: '2px dashed var(--border-color)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <span style={{
          background: 'rgba(32,190,255,0.12)', color: 'var(--accent-lime)', fontSize: 11, fontWeight: 700,
          padding: '3px 10px', borderRadius: 999, flexShrink: 0,
        }}>Шаг {n}</span>
        <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: 14 }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

export default function July9WebSocketTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">WebSocket и real-time</h1>
        <p className="theory-subtitle">Треки: Backend и Frontend</p>
        <p className="theory-date">9 июля 2026</p>
        <p>
          Чаты, уведомления, онлайн-игры, торговые терминалы, совместное редактирование документов — всё это
          требует, чтобы данные приходили пользователю <strong>мгновенно</strong>, без перезагрузки страницы.
          Обычный HTTP для этого плохо приспособлен. Сегодня разберём, почему, что такое{' '}
          <strong>WebSocket</strong>, чем он отличается от HTTP, и как построить real-time соединение — с
          примерами на стороне сервера (Python) и клиента (JavaScript).
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Проблема обычного HTTP</h2>
        <P n={1}>
          HTTP работает по модели <strong>запрос → ответ</strong>: клиент спрашивает — сервер отвечает и
          соединение закрывается. Инициатором всегда выступает <strong>клиент</strong>. Сервер не может сам, по
          своей инициативе, «толкнуть» данные клиенту, когда произошло событие (пришло новое сообщение в чат).
        </P>
        <P n={2}>
          Раньше это обходили костылями. <strong>Polling</strong> — клиент каждые N секунд спрашивает «есть
          что-нибудь новое?». Большинство запросов возвращают «нет» — впустую тратятся ресурсы и есть задержка.{' '}
          <strong>Long polling</strong> — сервер держит запрос открытым, пока не появятся данные. Лучше, но всё
          равно неэффективно и сложно. Нужен способ, где сервер сам шлёт данные, как только они появились.
        </P>
        <Fig caption="Polling: клиент постоянно спрашивает «есть новое?», большинство ответов пустые. WebSocket: одно постоянное соединение, сервер шлёт данные сам">
          <svg viewBox="0 0 540 180" width="100%" style={{ maxWidth: 540 }} xmlns="http://www.w3.org/2000/svg">
            <text x="135" y="16" fill={C.red} fontSize="12" fontWeight="700" textAnchor="middle">Polling (HTTP)</text>
            <text x="60" y="40" fill={C.sub} fontSize="10">клиент</text>
            <text x="215" y="40" fill={C.sub} fontSize="10">сервер</text>
            {[55,80,105,130].map((y,i)=>(
              <g key={i}>
                <line x1="70" y1={y} x2="210" y2={y} stroke={C.sub} strokeWidth="1.2" markerEnd="url(#w1)" />
                <text x="140" y={y-3} fill={C.sub} fontSize="8" textAnchor="middle">есть?</text>
                <line x1="210" y1={y+10} x2="70" y2={y+10} stroke={C.red} strokeWidth="1" markerEnd="url(#w2)" />
              </g>
            ))}
            <text x="140" y="165" fill={C.sub} fontSize="9" textAnchor="middle">много пустых ответов</text>

            <text x="410" y="16" fill={C.green} fontSize="12" fontWeight="700" textAnchor="middle">WebSocket</text>
            <text x="335" y="40" fill={C.sub} fontSize="10">клиент</text>
            <text x="490" y="40" fill={C.sub} fontSize="10">сервер</text>
            <line x1="345" y1="55" x2="485" y2="55" stroke={C.green} strokeWidth="2" />
            <text x="415" y="50" fill={C.green} fontSize="8" textAnchor="middle">одно соединение</text>
            {[80,110,140].map((y,i)=>(
              <line key={i} x1="485" y1={y} x2="345" y2={y} stroke={C.green} strokeWidth="1.4" markerEnd="url(#w3)" />
            ))}
            <text x="415" y="165" fill={C.sub} fontSize="9" textAnchor="middle">сервер шлёт сам, сразу</text>
            <defs>
              <marker id="w1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.sub} /></marker>
              <marker id="w2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.red} /></marker>
              <marker id="w3" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.green} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Что такое WebSocket</h2>
        <Term name="WebSocket">
          протокол постоянного <strong>двунаправленного</strong> соединения между клиентом и сервером поверх
          одного TCP-подключения. После установки и клиент, и сервер могут отправлять сообщения друг другу в
          любой момент, пока соединение открыто.
        </Term>
        <P n={3}>
          Ключевые отличия от HTTP: соединение <strong>постоянное</strong> (не закрывается после каждого
          сообщения), <strong>двунаправленное</strong> (full-duplex — обе стороны шлют данные независимо), с{' '}
          <strong>низкими накладными расходами</strong> (не нужно каждый раз пересылать HTTP-заголовки). Адрес
          использует схему <code>ws://</code> (или <code>wss://</code> — защищённый, поверх TLS), а не{' '}
          <code>http://</code>.
        </P>
        <TheoryTable
          headers={['', 'HTTP', 'WebSocket']}
          rows={[
            ['Модель', 'запрос → ответ', 'постоянное соединение'],
            ['Инициатор', 'только клиент', 'и клиент, и сервер'],
            ['Направление', 'по одному запросу', 'двунаправленное (full-duplex)'],
            ['Соединение', 'закрывается после ответа', 'держится открытым'],
            ['Схема', 'http:// / https://', 'ws:// / wss://'],
            ['Для чего', 'обычные страницы, REST API', 'real-time: чаты, игры, биржа'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Как устанавливается соединение (handshake)</h2>
        <P n={4}>
          WebSocket-соединение начинается как <strong>обычный HTTP-запрос</strong> со специальным заголовком{' '}
          <code>Upgrade: websocket</code>. Если сервер поддерживает протокол, он отвечает кодом{' '}
          <strong>101 Switching Protocols</strong> — и то же самое TCP-соединение «переключается» с HTTP на
          WebSocket. Дальше по нему в обе стороны идут уже не HTTP-запросы, а лёгкие WebSocket-сообщения (фреймы),
          пока одна из сторон не закроет соединение.
        </P>
        <Fig caption="Рукопожатие: клиент просит Upgrade, сервер отвечает 101 Switching Protocols — и соединение переходит из HTTP в постоянный WebSocket-режим">
          <svg viewBox="0 0 520 150" width="100%" style={{ maxWidth: 520 }} xmlns="http://www.w3.org/2000/svg">
            <text x="70" y="30" fill={C.sub} fontSize="11" textAnchor="middle">Клиент</text>
            <text x="450" y="30" fill={C.sub} fontSize="11" textAnchor="middle">Сервер</text>
            <line x1="70" y1="40" x2="70" y2="140" stroke={C.border} />
            <line x1="450" y1="40" x2="450" y2="140" stroke={C.border} />
            <line x1="70" y1="55" x2="450" y2="55" stroke={C.blue} strokeWidth="1.6" markerEnd="url(#ws1)" />
            <text x="260" y="50" fill={C.blue} fontSize="10" textAnchor="middle">GET ... Upgrade: websocket</text>
            <line x1="450" y1="80" x2="70" y2="80" stroke={C.lime} strokeWidth="1.6" markerEnd="url(#ws2)" />
            <text x="260" y="75" fill={C.lime} fontSize="10" textAnchor="middle">101 Switching Protocols</text>
            <line x1="70" y1="110" x2="450" y2="110" stroke={C.green} strokeWidth="2" markerEnd="url(#ws3)" />
            <line x1="450" y1="125" x2="70" y2="125" stroke={C.green} strokeWidth="2" markerEnd="url(#ws4)" />
            <text x="260" y="140" fill={C.green} fontSize="10" textAnchor="middle">обмен сообщениями в обе стороны</text>
            <defs>
              <marker id="ws1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.blue} /></marker>
              <marker id="ws2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.lime} /></marker>
              <marker id="ws3" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.green} /></marker>
              <marker id="ws4" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.green} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Клиент на JavaScript</h2>
        <P n={5}>
          В браузере WebSocket встроен — отдельная библиотека не нужна. Работа строится на объекте{' '}
          <code>WebSocket</code> и четырёх событиях. Соберём клиент по шагам.
        </P>
        <Step n={1} title="Открываем соединение">
          <p>Создаём объект WebSocket с адресом сервера — соединение начинает устанавливаться сразу.</p>
          <TheoryCode language="js" code={`const socket = new WebSocket('ws://localhost:8000/ws/chat/')`} />
        </Step>
        <Step n={2} title="Подписываемся на события">
          <p>
            У сокета четыре ключевых события: <code>open</code> (соединение установлено), <code>message</code>{' '}
            (пришло сообщение от сервера), <code>close</code> (соединение закрыто), <code>error</code> (ошибка).
          </p>
          <TheoryCode language="js" code={`socket.onopen = () => console.log('Соединение открыто')

socket.onmessage = (event) => {
  console.log('Пришло:', event.data)   // данные от сервера — в event.data
}

socket.onclose = () => console.log('Соединение закрыто')
socket.onerror = (e) => console.log('Ошибка:', e)`} />
        </Step>
        <Step n={3} title="Отправляем сообщение серверу">
          <p>Метод <code>send()</code> шлёт данные серверу в любой момент, пока соединение открыто.</p>
          <TheoryCode language="js" code={`socket.send('Привет, сервер!')

// обычно шлют JSON
socket.send(JSON.stringify({ type: 'message', text: 'Привет' }))`} />
        </Step>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Сервер на Python</h2>
        <P n={6}>
          На стороне сервера обычный Django/Flask не подходит — они заточены под модель запрос-ответ. Для
          WebSocket в экосистеме Django используют <strong>Django Channels</strong>, во Flask — Flask-SocketIO, а
          для чистого асинхронного Python есть простая библиотека <code>websockets</code>. Покажем минимальный
          эхо-сервер на ней (принимает сообщение и отправляет обратно).
        </P>
        <TheoryCode language="python" code={`# pip install websockets
import asyncio
import websockets

async def handler(websocket):
    async for message in websocket:      # ждём сообщения от клиента
        print('Получено:', message)
        await websocket.send(f'Эхо: {message}')   # шлём ответ обратно

async def main():
    async with websockets.serve(handler, 'localhost', 8000):
        await asyncio.Future()   # держим сервер запущенным

asyncio.run(main())`} />
        <P n={7}>
          В настоящем Django-проекте берут <strong>Django Channels</strong>: он добавляет поддержку WebSocket
          через классы-consumer. Consumer — аналог view, но для постоянного соединения: у него есть методы{' '}
          <code>connect</code>, <code>receive</code>, <code>disconnect</code>.
        </P>
        <TheoryCode language="python" code={`# Django Channels — consumer (упрощённо)
from channels.generic.websocket import AsyncWebsocketConsumer
import json

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()                 # принять соединение

    async def receive(self, text_data):     # пришло сообщение от клиента
        data = json.loads(text_data)
        await self.send(text_data=json.dumps({'text': data['text']}))

    async def disconnect(self, code):
        pass                                # клиент отключился`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Комнаты и вещание (broadcast)</h2>
        <P n={8}>
          В чате сообщение одного пользователя должно прийти <strong>всем</strong> участникам комнаты, а не только
          отправителю. Для этого сервер группирует соединения в «комнаты» (channel groups) и рассылает сообщение
          всей группе. Это называется <strong>broadcast</strong> — ключевой приём для чатов, уведомлений,
          совместного редактирования.
        </P>
        <Fig caption="Broadcast: сообщение от одного клиента сервер рассылает всем участникам комнаты через группу соединений">
          <svg viewBox="0 0 480 170" width="100%" style={{ maxWidth: 480 }} xmlns="http://www.w3.org/2000/svg">
            <rect x="200" y="65" width="80" height="40" rx="8" fill="rgba(32,190,255,0.08)" stroke={C.lime} />
            <text x="240" y="90" fill={C.lime} fontSize="11" fontWeight="700" textAnchor="middle">Сервер</text>
            <rect x="30" y="20" width="90" height="34" rx="6" fill="var(--bg-tertiary)" stroke={C.green} />
            <text x="75" y="42" fill={C.green} fontSize="10" textAnchor="middle">Аня (шлёт)</text>
            <line x1="120" y1="40" x2="205" y2="72" stroke={C.green} strokeWidth="1.6" markerEnd="url(#b1)" />
            {[[30,110,'Боб'],[360,30,'Вера'],[360,110,'Гена']].map(([x,y,n],i)=>(
              <g key={i}>
                <rect x={x} y={y} width="90" height="34" rx="6" fill="var(--bg-tertiary)" stroke={C.blue} />
                <text x={x+45} y={y+22} fill={C.blue} fontSize="10" textAnchor="middle">{n}</text>
                <line x1={x < 240 ? x+90 : x} y1={y+17} x2={x < 240 ? 200 : 280} y2="85" stroke={C.blue} strokeWidth="1.4" markerStart="url(#b2)" />
              </g>
            ))}
            <defs>
              <marker id="b1" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 Z" fill={C.green} /></marker>
              <marker id="b2" markerWidth="7" markerHeight="7" refX="2" refY="2.5" orient="auto"><path d="M5,0 L0,2.5 L5,5 Z" fill={C.blue} /></marker>
            </defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Когда использовать, а когда нет</h2>
        <P n={9}>
          WebSocket — не замена HTTP, а инструмент под конкретную задачу. Его берут, когда нужны{' '}
          <strong>обновления в реальном времени с двусторонним обменом</strong>. Для обычных запросов данных
          (загрузить страницу, отправить форму) HTTP/REST проще и правильнее.
        </P>
        <TheoryTable
          headers={['Подходит для WebSocket', 'Лучше обычный HTTP/REST']}
          rows={[
            ['чаты и мессенджеры', 'загрузка страницы, статьи'],
            ['онлайн-игры', 'отправка формы, регистрация'],
            ['биржевые котировки, дашборды', 'разовый запрос данных'],
            ['уведомления в реальном времени', 'CRUD-операции с базой'],
            ['совместное редактирование', 'скачивание файлов'],
          ]}
        />
        <TheoryExample title="Промежуточный вариант — SSE">
          Если данные нужно слать только в одну сторону (сервер → клиент), например лента уведомлений, есть более
          простая технология <strong>Server-Sent Events (SSE)</strong>. Она работает поверх обычного HTTP и
          проще WebSocket, но односторонняя. WebSocket нужен именно когда важен обмен в ОБЕ стороны.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={10}>
          Обычный HTTP работает по модели «запрос-ответ» и не позволяет серверу самому слать данные клиенту —
          из-за этого для real-time приходилось использовать polling. <strong>WebSocket</strong> — протокол
          постоянного двунаправленного соединения (ws:// / wss://), которое устанавливается через HTTP-handshake с
          ответом <strong>101 Switching Protocols</strong>. В браузере используют встроенный объект{' '}
          <code>WebSocket</code> с событиями open/message/close/error и методом <code>send()</code>; на сервере в
          Python — библиотеку <code>websockets</code> или <strong>Django Channels</strong> с consumer-классами.
          Рассылка всем участникам комнаты называется <strong>broadcast</strong>. WebSocket берут для чатов, игр,
          котировок и уведомлений, а для обычных запросов остаётся HTTP/REST.
        </P>
      </section>
    </div>
  )
}
