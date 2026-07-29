import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 680, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
        borderRadius: 10, padding: '16px', display: 'flex', justifyContent: 'center', overflowX: 'auto',
      }}>{children}</div>
      {caption && <figcaption style={{ color: 'var(--text-tertiary)', fontSize: 12.5, textAlign: 'center', maxWidth: 680 }}>{caption}</figcaption>}
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

export default function July29FastApiBasicsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">FastAPI: основы за час</h1>
        <p className="theory-subtitle">Трек: Backend</p>
        <p className="theory-date">29 июля 2026</p>
        <p>
          FastAPI — один из самых популярных веб-фреймворков на Python для написания API. Сегодня — компактное
          занятие на самые базовые вещи: как устроено простое FastAPI-приложение, какие бывают эндпоинты, как
          валидировать данные через Pydantic, и как подключить к сервису простую встроенную файловую базу данных
          SQLite, чтобы данные не терялись при перезапуске.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Что такое FastAPI и зачем он нужен</h2>
        <Term name="FastAPI">
          современный веб-фреймворк для Python, построенный на Starlette (ASGI, асинхронный веб-сервер) и Pydantic
          (валидация данных). Используется для написания REST API — то, к чему обращается фронтенд или другое
          приложение по HTTP.
        </Term>
        <TheoryTable
          headers={['Почему выбирают FastAPI', 'Суть']}
          rows={[
            ['Асинхронность из коробки', 'построен на asyncio — эффективно обрабатывает много параллельных сетевых запросов'],
            ['Валидация данных', 'входящий JSON автоматически проверяется на соответствие схеме через Pydantic'],
            ['Автогенерация документации', 'Swagger UI и ReDoc собираются сами из кода, без ручного написания'],
            ['Подсказки типов Python', 'обычные type hints языка становятся одновременно и валидацией, и документацией'],
          ]}
        />
        <TheoryCode language="bash" code={`# установка
pip install fastapi uvicorn

# запуск сервера в режиме разработки (с автоперезагрузкой при изменении кода)
uvicorn main:app --reload`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Первое приложение</h2>
        <P n={1}>
          Минимальное FastAPI-приложение — это объект <code>FastAPI()</code> и несколько функций-обработчиков,
          помеченных декораторами вида <code>@app.get(...)</code>, <code>@app.post(...)</code>.
        </P>
        <TheoryCode language="python" code={`# main.py
from fastapi import FastAPI

app = FastAPI(title="Мой первый API")

@app.get("/")
def read_root():
    return {"message": "Привет, FastAPI!"}

@app.get("/ping")
def ping():
    return {"status": "ok"}`} />
        <P n={2}>
          После запуска <code>uvicorn main:app --reload</code> сервер поднимается на{' '}
          <code>http://127.0.0.1:8000</code>. А по адресу <code>/docs</code> сразу доступна интерактивная
          документация Swagger UI — можно прямо в браузере протестировать любой эндпоинт, ничего не настраивая
          отдельно.
        </P>
        <Fig caption="Клиент отправляет HTTP-запрос → FastAPI находит подходящий обработчик по пути и методу → возвращает JSON-ответ.">
          <svg viewBox="0 0 460 110" width="460" height="110" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="35" width="90" height="40" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" />
            <text x="65" y="59" fill="#f5f5fa" fontSize="10" textAnchor="middle">Клиент</text>
            <line x1="110" y1="47" x2="180" y2="47" stroke="#c8ff00" markerEnd="url(#fa1)" />
            <text x="145" y="40" fill="#94a3b8" fontSize="8" textAnchor="middle">GET /ping</text>
            <rect x="180" y="25" width="120" height="60" fill="rgba(200,255,0,0.12)" stroke="#c8ff00" />
            <text x="240" y="50" fill="#f5f5fa" fontSize="10" textAnchor="middle">FastAPI</text>
            <text x="240" y="64" fill="#94a3b8" fontSize="8" textAnchor="middle">роутинг + Pydantic</text>
            <line x1="300" y1="63" x2="370" y2="63" stroke="#94a3b8" markerEnd="url(#fa1)" />
            <text x="335" y="56" fill="#94a3b8" fontSize="8" textAnchor="middle">JSON</text>
            <rect x="370" y="35" width="80" height="40" fill="rgba(74,222,128,0.12)" stroke="#4ade80" />
            <text x="410" y="59" fill="#f5f5fa" fontSize="10" textAnchor="middle">Ответ</text>
            <defs><marker id="fa1" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#94a3b8" /></marker></defs>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Пути, параметры и HTTP-методы</h2>
        <P n={3}>
          FastAPI различает несколько способов передать данные в обработчик: часть пути (path parameter), параметры
          запроса в URL (query parameter) и тело запроса (request body).
        </P>
        <TheoryCode language="python" code={`from fastapi import FastAPI

app = FastAPI()

# path-параметр: значение из самого пути /items/5
@app.get("/items/{item_id}")
def get_item(item_id: int):
    return {"item_id": item_id}

# query-параметр: /items/?skip=0&limit=10
@app.get("/items/")
def list_items(skip: int = 0, limit: int = 10):
    return {"skip": skip, "limit": limit}`} />
        <TheoryTable
          headers={['HTTP-метод', 'Декоратор FastAPI', 'Обычно используют для']}
          rows={[
            ['GET', '@app.get(...)', 'получить данные, не изменяя их'],
            ['POST', '@app.post(...)', 'создать новую запись'],
            ['PUT', '@app.put(...)', 'полностью заменить существующую запись'],
            ['PATCH', '@app.patch(...)', 'частично обновить запись'],
            ['DELETE', '@app.delete(...)', 'удалить запись'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Валидация данных через Pydantic</h2>
        <Term name="Pydantic-модель">
          класс, описывающий структуру данных через обычные type hints Python. FastAPI автоматически проверяет
          входящий JSON на соответствие такой модели — если данные не подходят, клиенту сразу возвращается понятная
          ошибка валидации, без единой строчки ручной проверки в коде.
        </Term>
        <TheoryCode language="python" code={`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Note(BaseModel):
    title: str
    content: str
    done: bool = False   # значение по умолчанию — поле необязательное

@app.post("/notes")
def create_note(note: Note):
    # если клиент прислал не то — FastAPI сам вернёт 422 с описанием ошибки,
    # эта функция вызовется только с уже провалидированными данными
    return {"received": note}`} />
        <TheoryExample title="Проверка на практике">
          Если отправить запрос без поля <code>title</code> или с числом вместо строки в <code>content</code>,
          FastAPI автоматически вернёт HTTP-статус 422 с точным указанием, какое поле и почему не прошло проверку —
          писать это самому не нужно.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Подключаем встроенную файловую базу данных — SQLite</h2>
        <Term name="SQLite">
          лёгкая реляционная база данных, которая хранится в одном обычном файле на диске (например,{' '}
          <code>app.db</code>) и не требует отдельного сервера базы данных — идеально для учебных проектов и
          небольших сервисов.
        </Term>
        <P n={4}>
          Самый простой способ подключить SQLite к FastAPI — библиотека <code>sqlite3</code> из стандартной
          библиотеки Python (для больших проектов чаще берут ORM вроде SQLAlchemy, но для первого знакомства прямые
          SQL-запросы нагляднее и полностью достаточны).
        </P>
        <TheoryCode language="python" code={`# database.py
import sqlite3

DB_NAME = "app.db"

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row  # доступ к колонкам по имени, а не только по индексу
    return conn

def init_db():
    conn = get_connection()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            done BOOLEAN NOT NULL DEFAULT 0
        )
    """)
    conn.commit()
    conn.close()`} />
        <P n={5}>
          Файл базы данных <code>app.db</code> создастся автоматически при первом запуске — никакой отдельной
          установки сервера базы данных не требуется, это и есть смысл слова «встроенная» (embedded) в описании
          SQLite.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Собираем CRUD-эндпоинты поверх SQLite</h2>
        <P n={6}>
          CRUD — сокращение от Create, Read, Update, Delete — четыре базовые операции, которые почти всегда нужны
          для любой сущности в API. Соберём их для заметок (notes) из примера выше.
        </P>
        <TheoryCode language="python" code={`# main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from database import get_connection, init_db

app = FastAPI(title="Notes API")

class NoteIn(BaseModel):
    title: str
    content: str
    done: bool = False

class Note(NoteIn):
    id: int

@app.on_event("startup")
def on_startup():
    init_db()  # создаём таблицу при старте приложения, если её ещё нет

# CREATE — добавить заметку
@app.post("/notes", response_model=Note)
def create_note(note: NoteIn):
    conn = get_connection()
    cur = conn.execute(
        "INSERT INTO notes (title, content, done) VALUES (?, ?, ?)",
        (note.title, note.content, note.done),
    )
    conn.commit()
    new_id = cur.lastrowid
    conn.close()
    return {**note.dict(), "id": new_id}

# READ — список всех заметок
@app.get("/notes", response_model=list[Note])
def list_notes():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM notes").fetchall()
    conn.close()
    return [dict(row) for row in rows]

# READ — одна заметка по id
@app.get("/notes/{note_id}", response_model=Note)
def get_note(note_id: int):
    conn = get_connection()
    row = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
    conn.close()
    if row is None:
        raise HTTPException(status_code=404, detail="Заметка не найдена")
    return dict(row)

# UPDATE — обновить заметку
@app.put("/notes/{note_id}", response_model=Note)
def update_note(note_id: int, note: NoteIn):
    conn = get_connection()
    conn.execute(
        "UPDATE notes SET title = ?, content = ?, done = ? WHERE id = ?",
        (note.title, note.content, note.done, note_id),
    )
    conn.commit()
    conn.close()
    return {**note.dict(), "id": note_id}

# DELETE — удалить заметку
@app.delete("/notes/{note_id}")
def delete_note(note_id: int):
    conn = get_connection()
    conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return {"status": "deleted", "id": note_id}`} />
        <TheoryTable
          headers={['Операция', 'HTTP-метод и путь', 'SQL внутри']}
          rows={[
            ['Create', 'POST /notes', 'INSERT INTO notes ...'],
            ['Read (список)', 'GET /notes', 'SELECT * FROM notes'],
            ['Read (один)', 'GET /notes/{id}', 'SELECT * FROM notes WHERE id = ?'],
            ['Update', 'PUT /notes/{id}', 'UPDATE notes SET ... WHERE id = ?'],
            ['Delete', 'DELETE /notes/{id}', 'DELETE FROM notes WHERE id = ?'],
          ]}
        />
        <TheoryExample title="Про знак вопроса в SQL-запросах">
          Вместо того чтобы подставлять значения прямо в строку запроса, используются параметризованные запросы
          (символ <code>?</code>, значения передаются вторым аргументом). Это защищает от SQL-инъекций — той самой
          уязвимости, которую разбирали на занятии по кибербезопасности.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Проверяем API в браузере</h2>
        <P n={7}>
          После запуска <code>uvicorn main:app --reload</code> и открытия <code>http://127.0.0.1:8000/docs</code>{' '}
          появляется интерактивная страница Swagger UI со всеми пятью эндпоинтами — прямо там можно отправить
          POST-запрос на создание заметки, а затем GET-запрос, чтобы убедиться, что она сохранилась в файле{' '}
          <code>app.db</code>, и она никуда не денется даже после перезапуска сервера.
        </P>
        <TheoryCode language="bash" code={`# то же самое из терминала через curl
curl -X POST http://127.0.0.1:8000/notes \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Купить молоко", "content": "2 литра", "done": false}'

curl http://127.0.0.1:8000/notes`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={8}>
          <strong>FastAPI</strong> — асинхронный веб-фреймворк на Python с автоматической валидацией данных через{' '}
          <strong>Pydantic</strong>-модели и самогенерирующейся документацией (<code>/docs</code>). Приложение
          собирается из функций-обработчиков с декораторами HTTP-методов (<code>@app.get</code>,{' '}
          <code>@app.post</code> и т.д.), а данные передаются через path-параметры, query-параметры и тело запроса.{' '}
          <strong>SQLite</strong> — встроенная файловая база данных, которую не нужно отдельно устанавливать: она
          подключается стандартным модулем <code>sqlite3</code> и хранит данные в одном файле, переживающем
          перезапуск сервера. Вместе они дают полноценный минимальный CRUD-сервис за одно занятие.
        </P>
      </section>
    </div>
  )
}
