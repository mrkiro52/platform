import{j as e}from"./index-Cb5sh8pD.js";import{b as s,T as n,a as r}from"./TheoryTable-CAJX0pr7.js";function h(){return e.jsxs("div",{className:"theory-container",children:[e.jsxs("section",{className:"theory-section",children:[e.jsx("h1",{className:"theory-title",children:"Python vs Go для бэкенда"}),e.jsx("p",{className:"theory-subtitle",children:"Трек: Backend-разработка"}),e.jsx("p",{className:"theory-date",children:"1 июля 2026"}),e.jsx("p",{children:"На бэкенд-треке два основных языка на выбор — Python и Go. Оба отлично подходят для серверной разработки, но у каждого своя философия. Разберём отличия, чтобы осознанно выбрать стек, и посмотрим на популярные фреймворки каждого."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"1. Кратко о языках"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Python"})," (1991) — высокоуровневый язык с простым читаемым синтаксисом. Интерпретируемый, с динамической типизацией. Огромная экосистема, особенно в data science, ML и веб-разработке. Приоритет — скорость разработки."]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Go / Golang"})," (2009, Google) — компилируемый язык со статической типизацией. Создавался для высоконагруженных систем и микросервисов. Приоритет — производительность, простота и параллелизм из коробки."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"2. Сравнение по ключевым параметрам"}),e.jsx(s,{headers:["Параметр","Python","Go"],rows:[["Типизация","Динамическая","Статическая"],["Исполнение","Интерпретируемый","Компилируемый в бинарник"],["Скорость работы","Медленнее","Быстрее (близко к C)"],["Скорость разработки","Очень высокая","Высокая"],["Параллелизм","GIL, asyncio, потоки","Горутины и каналы (нативно)"],["Синтаксис","Лаконичный, гибкий","Простой, строгий"],["Экосистема","Огромная (ML, data, web)","Растущая (cloud, DevOps)"],["Где силён","ML, скрипты, API, аналитика","Микросервисы, высокие нагрузки"]]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"3. Один и тот же код на двух языках"}),e.jsx("h3",{className:"theory-heading-3",children:"Python"}),e.jsx(n,{language:"python",code:`def greet(name):
    return f"Привет, {name}!"

print(greet("Аня"))

# HTTP-сервер (Flask)
from flask import Flask
app = Flask(__name__)

@app.route("/")
def home():
    return "Hello, World!"`}),e.jsx("h3",{className:"theory-heading-3",children:"Go"}),e.jsx(n,{language:"go",code:`package main

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
}`}),e.jsx(r,{title:"Главное отличие в ощущении",children:"В Python код короче и пишется быстрее, но ошибки типов всплывают только во время запуска. В Go больше строк и явности, зато компилятор ловит ошибки заранее, а готовый бинарник работает очень быстро и не требует установленного окружения."})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"4. Параллелизм"}),e.jsx("p",{children:"Ключевое преимущество Go — горутины: лёгкие «потоки», которых можно запустить тысячи. Это делает Go идеальным для серверов, обрабатывающих множество запросов одновременно."}),e.jsx(n,{language:"go",code:`// Go: запуск конкурентной задачи — просто ключевое слово go
go doWork()   // выполнится параллельно

ch := make(chan int)   // канал для обмена данными между горутинами`}),e.jsxs("p",{children:["В Python исторически мешает GIL (Global Interpreter Lock), но для сетевых задач хорошо работает асинхронность через ",e.jsx("code",{children:"async/await"})," и ",e.jsx("code",{children:"asyncio"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"5. Популярные фреймворки Python"}),e.jsx(s,{headers:["Фреймворк","Тип","Особенности"],rows:[["Django","Full-stack","Всё из коробки: ORM, админка, авторизация. Для больших проектов"],["Flask","Микрофреймворк","Минималистичный, гибкий. Собираешь стек сам"],["FastAPI","Async API","Современный, быстрый, авто-документация OpenAPI, type hints"]]}),e.jsxs(r,{title:"Что выбрать на Python",children:["Для REST API сегодня чаще всего берут ",e.jsx("strong",{children:"FastAPI"})," — быстрый и удобный. Для крупного продукта с админкой — ",e.jsx("strong",{children:"Django"}),". Для маленьких сервисов и обучения — ",e.jsx("strong",{children:"Flask"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"6. Популярные фреймворки Go"}),e.jsx(s,{headers:["Фреймворк","Тип","Особенности"],rows:[["net/http","Стандартная библиотека","Встроен в Go, без зависимостей. Часто хватает его"],["Gin","Веб-фреймворк","Самый популярный, быстрый, удобный роутинг и middleware"],["Echo","Веб-фреймворк","Минималистичный, производительный, хорошая документация"],["Fiber","Веб-фреймворк","Вдохновлён Express.js, очень быстрый"]]}),e.jsxs(r,{title:"Что выбрать на Go",children:["Для многих сервисов достаточно стандартного ",e.jsx("strong",{children:"net/http"}),". Когда нужен удобный роутинг и middleware — берут ",e.jsx("strong",{children:"Gin"})," (де-факто стандарт) или",e.jsx("strong",{children:" Echo"}),"."]})]}),e.jsxs("section",{className:"theory-section",children:[e.jsx("h2",{className:"theory-heading-2",children:"7. Как выбрать"}),e.jsxs("ul",{className:"theory-list",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Бери Python"}),", если хочешь быстрее войти в разработку, интересны данные/ML, нужна максимальная гибкость и огромная экосистема библиотек."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Бери Go"}),", если тянет к высоконагруженным системам, микросервисам, DevOps/cloud, и нравится строгость и скорость."]}),e.jsx("li",{children:"Оба языка востребованы на рынке. Начни с того, что откликается — фундамент бэкенда (HTTP, БД, API) одинаковый."})]}),e.jsx("p",{children:"Домашнее задание сегодня — подготовить инструменты: установить выбранный язык и его фреймворк, чтобы на следующем занятии сразу писать код."})]})]})}export{h as default};
