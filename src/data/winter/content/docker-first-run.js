export default {
  intro: 'За один запуск соберём свой образ, поднимем веб-сервис через Docker Compose и посмотрим его логи. Для примера нужны Docker и команда `docker compose`.',
  sections: [
    {
      id: 'model', title: 'Образ, контейнер и Dockerfile',
      blocks: [
        { t: 'p', text: '**Образ** хранит файлы приложения и зависимости. **Контейнер** — запущенный экземпляр образа. **Dockerfile** описывает, как собрать образ. Один образ можно запустить в нескольких независимых контейнерах.' },
        { t: 'p', text: 'Создай пустую папку и положи в неё файл `index.html` со строкой `<h1>Docker работает</h1>`. Рядом создай `Dockerfile` со следующим содержимым.' },
        { t: 'code', text: 'FROM nginx:alpine\nCOPY index.html /usr/share/nginx/html/index.html' },
        { t: 'p', text: '`FROM` задаёт базовый образ. `COPY` добавляет в него нашу страницу. Команду запуска nginx наследуем из базового образа.' },
      ],
    },
    {
      id: 'compose', title: 'Запуск через Docker Compose',
      blocks: [
        { t: 'p', text: 'Создай в той же папке файл `compose.yaml`. Compose описывает сервисы, их сеть, порты и тома в одном файле.' },
        { t: 'code', text: 'services:\n  web:\n    build: .\n    ports:\n      - "127.0.0.1:8080:80"' },
        { t: 'code', text: 'docker compose up --build -d\ndocker compose ps\ndocker compose logs --tail=30 web' },
        { t: 'p', text: '`up` запускает сервисы, `--build` пересобирает образ, `-d` оставляет контейнер в фоне. Открой `http://127.0.0.1:8080` в браузере. Порт 8080 на компьютере ведёт на порт 80 контейнера.' },
      ],
    },
    {
      id: 'iterate', title: 'Обновление и остановка',
      blocks: [
        { t: 'p', text: 'Измени `index.html` и снова выполни `docker compose up --build -d`. Если порт занят, замени 8080 на свободный порт в `compose.yaml` и повтори запуск.' },
        { t: 'code', text: 'docker compose down' },
        { t: 'p', text: '`down` останавливает и удаляет контейнеры и сеть проекта. Для данных, которые должны переживать пересоздание контейнера, объявляют именованный том через `volumes`.' },
      ],
    },
  ],
}
