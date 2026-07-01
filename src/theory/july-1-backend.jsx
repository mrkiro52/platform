import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

export default function July1BackendTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Python vs Go для бэкенда</h1>
        <p className="theory-subtitle">Трек: Backend-разработка</p>
        <p className="theory-date">1 июля 2026</p>
        <p>
          На бэкенд-треке два основных языка на выбор — Python и Go. Оба отлично подходят для
          серверной разработки, но у каждого своя философия. Разберём отличия, чтобы осознанно
          выбрать стек, и посмотрим на популярные фреймворки каждого.
        </p>
      </section>

      {/* Обзор */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Кратко о языках</h2>
        <p>
          <strong>Python</strong> (1991) — высокоуровневый язык с простым читаемым синтаксисом.
          Интерпретируемый, с динамической типизацией. Огромная экосистема, особенно в data science,
          ML и веб-разработке. Приоритет — скорость разработки.
        </p>
        <p>
          <strong>Go / Golang</strong> (2009, Google) — компилируемый язык со статической типизацией.
          Создавался для высоконагруженных систем и микросервисов. Приоритет — производительность,
          простота и параллелизм из коробки.
        </p>
      </section>

      {/* Таблица сравнения */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. Сравнение по ключевым параметрам</h2>
        <TheoryTable
          headers={['Параметр', 'Python', 'Go']}
          rows={[
            ['Типизация', 'Динамическая', 'Статическая'],
            ['Исполнение', 'Интерпретируемый', 'Компилируемый в бинарник'],
            ['Скорость работы', 'Медленнее', 'Быстрее (близко к C)'],
            ['Скорость разработки', 'Очень высокая', 'Высокая'],
            ['Параллелизм', 'GIL, asyncio, потоки', 'Горутины и каналы (нативно)'],
            ['Синтаксис', 'Лаконичный, гибкий', 'Простой, строгий'],
            ['Экосистема', 'Огромная (ML, data, web)', 'Растущая (cloud, DevOps)'],
            ['Где силён', 'ML, скрипты, API, аналитика', 'Микросервисы, высокие нагрузки'],
          ]}
        />
      </section>

      {/* Синтаксис */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. Один и тот же код на двух языках</h2>
        <h3 className="theory-heading-3">Python</h3>
        <TheoryCode language="python" code={`def greet(name):
    return f"Привет, {name}!"

print(greet("Аня"))

# HTTP-сервер (Flask)
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"`} />
        <h3 className="theory-heading-3">Go</h3>
        <TheoryCode language="go" code={`package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Привет, %s!", name)
}

func main() {
    fmt.Println(greet("Аня"))
}

// HTTP-сервер (net/http)
import "net/http"

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprint(w, "Hello, World!")
}`} />
        <TheoryExample title="Главное отличие в ощущении">
          В Python код короче и пишется быстрее, но ошибки типов всплывают только во время запуска.
          В Go больше строк и явности, зато компилятор ловит ошибки заранее, а готовый бинарник
          работает очень быстро и не требует установленного окружения.
        </TheoryExample>
      </section>

      {/* Параллелизм */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. Параллелизм</h2>
        <p>
          Ключевое преимущество Go — горутины: лёгкие «потоки», которых можно запустить тысячи.
          Это делает Go идеальным для серверов, обрабатывающих множество запросов одновременно.
        </p>
        <TheoryCode language="go" code={`// Go: запуск конкурентной задачи — просто ключевое слово go
go doWork()   // выполнится параллельно

ch := make(chan int)   // канал для обмена данными между горутинами`} />
        <p>
          В Python исторически мешает GIL (Global Interpreter Lock), но для сетевых задач хорошо
          работает асинхронность через <code>async/await</code> и <code>asyncio</code>.
        </p>
      </section>

      {/* Фреймворки Python */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. Популярные фреймворки Python</h2>
        <TheoryTable
          headers={['Фреймворк', 'Тип', 'Особенности']}
          rows={[
            ['Django', 'Full-stack', 'Всё из коробки: ORM, админка, авторизация. Для больших проектов'],
            ['Flask', 'Микрофреймворк', 'Минималистичный, гибкий. Собираешь стек сам'],
            ['FastAPI', 'Async API', 'Современный, быстрый, авто-документация OpenAPI, type hints'],
          ]}
        />
        <TheoryExample title="Что выбрать на Python">
          Для REST API сегодня чаще всего берут <strong>FastAPI</strong> — быстрый и удобный.
          Для крупного продукта с админкой — <strong>Django</strong>. Для маленьких сервисов и
          обучения — <strong>Flask</strong>.
        </TheoryExample>
      </section>

      {/* Фреймворки Go */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Популярные фреймворки Go</h2>
        <TheoryTable
          headers={['Фреймворк', 'Тип', 'Особенности']}
          rows={[
            ['net/http', 'Стандартная библиотека', 'Встроен в Go, без зависимостей. Часто хватает его'],
            ['Gin', 'Веб-фреймворк', 'Самый популярный, быстрый, удобный роутинг и middleware'],
            ['Echo', 'Веб-фреймворк', 'Минималистичный, производительный, хорошая документация'],
            ['Fiber', 'Веб-фреймворк', 'Вдохновлён Express.js, очень быстрый'],
          ]}
        />
        <TheoryExample title="Что выбрать на Go">
          Для многих сервисов достаточно стандартного <strong>net/http</strong>. Когда нужен
          удобный роутинг и middleware — берут <strong>Gin</strong> (де-факто стандарт) или
          <strong> Echo</strong>.
        </TheoryExample>
      </section>

      {/* Вывод */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Как выбрать</h2>
        <ul className="theory-list">
          <li><strong>Бери Python</strong>, если хочешь быстрее войти в разработку, интересны данные/ML, нужна максимальная гибкость и огромная экосистема библиотек.</li>
          <li><strong>Бери Go</strong>, если тянет к высоконагруженным системам, микросервисам, DevOps/cloud, и нравится строгость и скорость.</li>
          <li>Оба языка востребованы на рынке. Начни с того, что откликается — фундамент бэкенда (HTTP, БД, API) одинаковый.</li>
        </ul>
        <p>
          Домашнее задание сегодня — подготовить инструменты: установить выбранный язык и его
          фреймворк, чтобы на следующем занятии сразу писать код.
        </p>
      </section>
    </div>
  )
}
