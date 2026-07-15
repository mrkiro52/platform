import { TheoryTable, TheoryCode, TheoryExample } from './components/TheoryTable'

function Fig({ children, caption }) {
  return (
    <figure style={{ margin: '18px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <div style={{
        width: '100%', maxWidth: 640, background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
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

export default function July15DockerTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Docker: основы для разработчика</h1>
        <p className="theory-subtitle">Треки: Frontend и Backend</p>
        <p className="theory-date">15 июля 2026</p>
        <p>
          «У меня на компьютере работает, а на сервере нет» — классическая боль разработки. Docker решает её,
          упаковывая приложение вместе со всем его окружением в изолированный <strong>контейнер</strong>, который
          запускается одинаково где угодно. Сегодня разберём, что такое Docker, зачем он нужен фронтендеру и
          бэкендеру, из чего состоит и какие команды нужно знать для старта.
        </p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">1. Какую проблему решает Docker</h2>
        <P n={1}>
          Приложению для запуска нужно окружение: определённая версия Node.js или Python, библиотеки, переменные
          среды, системные пакеты. На разных машинах версии отличаются — отсюда ошибки, которые «воспроизводятся
          только у коллеги». Настраивать всё вручную на каждом компьютере и сервере долго и ненадёжно.
        </P>
        <Term name="Docker">
          платформа для упаковки приложения вместе с его окружением в контейнер — единый, изолированный и
          переносимый «пакет», который одинаково запускается на любой машине, где установлен Docker.
        </Term>
        <P n={2}>
          Итог: разработчик описывает окружение один раз, а дальше приложение запускается идентично на его ноутбуке,
          у коллеги, на тестовом и на боевом сервере. Это устраняет проблему «работает только у меня» и упрощает
          развёртывание.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">2. Контейнер и виртуальная машина</h2>
        <Term name="Контейнер">
          изолированный процесс с собственной файловой системой, зависимостями и настройками, но использующий ядро
          операционной системы хоста. Лёгкий и запускается за секунды.
        </Term>
        <P n={3}>
          В отличие от <strong>виртуальной машины</strong>, контейнер не тащит с собой целую гостевую ОС — он делит
          ядро с хостом. Поэтому контейнеры весят мегабайты (а не гигабайты), стартуют почти мгновенно и потребляют
          меньше ресурсов. На одной машине спокойно работают десятки контейнеров.
        </P>
        <Fig caption="ВМ виртуализирует «железо» и тащит гостевую ОС; контейнеры делят ядро хоста — легче и быстрее.">
          <svg viewBox="0 0 560 210" width="560" height="210" xmlns="http://www.w3.org/2000/svg">
            {/* VM */}
            <text x="140" y="16" fill="#94a3b8" fontSize="12" textAnchor="middle">Виртуальные машины</text>
            {[0, 1].map((i) => (
              <g key={i}>
                <rect x={20 + i * 130} y="26" width="115" height="70" fill="rgba(248,113,113,0.12)" stroke="#f87171" />
                <text x={77 + i * 130} y="44" fill="#f5f5fa" fontSize="10" textAnchor="middle">App + libs</text>
                <rect x={28 + i * 130} y="54" width="99" height="34" fill="rgba(248,113,113,0.18)" stroke="#f87171" />
                <text x={77 + i * 130} y="75" fill="#f5f5fa" fontSize="10" textAnchor="middle">Гостевая ОS</text>
              </g>
            ))}
            <rect x="20" y="100" width="245" height="22" fill="rgba(148,163,184,0.15)" stroke="#94a3b8" />
            <text x="142" y="115" fill="#94a3b8" fontSize="10" textAnchor="middle">Гипервизор</text>
            <rect x="20" y="126" width="245" height="22" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" />
            <text x="142" y="141" fill="#94a3b8" fontSize="10" textAnchor="middle">Хостовая ОС + железо</text>
            {/* Containers */}
            <text x="420" y="16" fill="#94a3b8" fontSize="12" textAnchor="middle">Контейнеры</text>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <rect x={300 + i * 78} y="40" width="68" height="48" fill="rgba(200,255,0,0.12)" stroke="#c8ff00" />
                <text x={334 + i * 78} y="60" fill="#f5f5fa" fontSize="9" textAnchor="middle">App</text>
                <text x={334 + i * 78} y="74" fill="#f5f5fa" fontSize="9" textAnchor="middle">+ libs</text>
              </g>
            ))}
            <rect x="300" y="92" width="234" height="22" fill="rgba(200,255,0,0.08)" stroke="#c8ff00" />
            <text x="417" y="107" fill="#c8ff00" fontSize="10" textAnchor="middle">Docker Engine</text>
            <rect x="300" y="118" width="234" height="30" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" />
            <text x="417" y="137" fill="#94a3b8" fontSize="10" textAnchor="middle">Хостовая ОС + железо</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">3. Три ключевых понятия: образ, контейнер, реестр</h2>
        <Term name="Образ (image)">
          неизменяемый шаблон с приложением и его окружением — как «слепок» или установочный диск. Из одного образа
          можно запустить сколько угодно контейнеров.
        </Term>
        <Term name="Контейнер (container)">
          запущенный экземпляр образа — живой, работающий процесс. Аналогия из ООП: образ — это класс, контейнер —
          объект, созданный по этому классу.
        </Term>
        <Term name="Реестр (registry)">
          хранилище образов. Публичный <strong>Docker Hub</strong> содержит готовые официальные образы (node,
          python, nginx, postgres), которые можно скачать одной командой.
        </Term>
        <Fig caption="Dockerfile собирается в образ, из образа запускаются контейнеры; образы хранятся в реестре.">
          <svg viewBox="0 0 560 110" width="560" height="110" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="40" width="110" height="34" rx="6" fill="rgba(96,165,250,0.15)" stroke="#60a5fa" />
            <text x="65" y="61" fill="#f5f5fa" fontSize="12" textAnchor="middle">Dockerfile</text>
            <text x="150" y="61" fill="#c8ff00" fontSize="18" textAnchor="middle">build →</text>
            <rect x="200" y="40" width="100" height="34" rx="6" fill="rgba(200,255,0,0.12)" stroke="#c8ff00" />
            <text x="250" y="61" fill="#f5f5fa" fontSize="12" textAnchor="middle">Образ</text>
            <text x="330" y="61" fill="#c8ff00" fontSize="18" textAnchor="middle">run →</text>
            <rect x="380" y="26" width="120" height="26" rx="6" fill="rgba(74,222,128,0.15)" stroke="#4ade80" />
            <text x="440" y="43" fill="#f5f5fa" fontSize="11" textAnchor="middle">Контейнер 1</text>
            <rect x="380" y="60" width="120" height="26" rx="6" fill="rgba(74,222,128,0.15)" stroke="#4ade80" />
            <text x="440" y="77" fill="#f5f5fa" fontSize="11" textAnchor="middle">Контейнер 2</text>
          </svg>
        </Fig>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">4. Dockerfile — рецепт образа</h2>
        <Term name="Dockerfile">
          текстовый файл с пошаговой инструкцией сборки образа: от какого базового образа отталкиваться, что
          скопировать, что установить и какой командой запускаться.
        </Term>
        <TheoryCode language="dockerfile" code={`# базовый образ с уже установленным Node.js
FROM node:20-alpine

# рабочая папка внутри контейнера
WORKDIR /app

# сначала копируем только манифесты зависимостей...
COPY package*.json ./
# ...и ставим их (этот слой закешируется и не пересобирается зря)
RUN npm install

# теперь копируем весь остальной код
COPY . .

# приложение слушает порт 3000
EXPOSE 3000

# команда запуска при старте контейнера
CMD ["npm", "start"]`} />
        <P n={4}>
          Каждая инструкция создаёт <strong>слой</strong> (layer). Docker кеширует слои: если код изменился, а{' '}
          <code>package.json</code> — нет, шаг с <code>npm install</code> не выполнится заново. Поэтому зависимости
          копируют и ставят <em>до</em> копирования всего кода — так сборка идёт быстрее.
        </P>
        <TheoryExample title=".dockerignore">
          Рядом с Dockerfile кладут файл <code>.dockerignore</code> (по смыслу как <code>.gitignore</code>), чтобы не
          копировать в образ лишнее: <code>node_modules</code>, <code>.git</code>, логи. Образ получается меньше и
          собирается быстрее.
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">5. Базовые команды Docker</h2>
        <TheoryTable
          headers={['Команда', 'Что делает']}
          rows={[
            ['docker build -t myapp .', 'собрать образ myapp из Dockerfile в текущей папке'],
            ['docker images', 'список локальных образов'],
            ['docker run myapp', 'запустить контейнер из образа'],
            ['docker ps', 'список запущенных контейнеров'],
            ['docker ps -a', 'все контейнеры, включая остановленные'],
            ['docker stop <id>', 'остановить контейнер'],
            ['docker rm <id>', 'удалить контейнер'],
            ['docker rmi <образ>', 'удалить образ'],
            ['docker logs <id>', 'посмотреть вывод (логи) контейнера'],
            ['docker exec -it <id> sh', 'зайти внутрь работающего контейнера'],
            ['docker pull nginx', 'скачать готовый образ из Docker Hub'],
          ]}
        />
        <TheoryCode language="bash" code={`# собрать образ и дать ему имя myapp
docker build -t myapp .

# запустить: -d в фоне, -p проброс порта хост:контейнер, --name имя
docker run -d -p 3000:3000 --name web myapp

# посмотреть, что запущено
docker ps

# почитать логи и зайти внутрь
docker logs web
docker exec -it web sh

# остановить и удалить
docker stop web && docker rm web`} />
        <P n={5}>
          Ключевой флаг для веба — <strong>проброс портов</strong> <code>-p 3000:3000</code>: контейнер изолирован,
          и чтобы открыть приложение в браузере на хосте, его порт нужно явно «прокинуть» наружу (слева — порт
          хоста, справа — порт внутри контейнера).
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">6. Тома и переменные окружения</h2>
        <Term name="Том (volume)">
          механизм постоянного хранения данных вне контейнера. Контейнеры «одноразовые» — при удалении их
          содержимое пропадает; том сохраняет данные (например, базу данных) между перезапусками.
        </Term>
        <Term name="Переменные окружения (env)">
          способ передать в контейнер настройки (адрес БД, секретные ключи, режим работы) без пересборки образа —
          через флаг <code>-e</code> или файл <code>.env</code>.
        </Term>
        <TheoryCode language="bash" code={`# том: папка ./data на хосте <-> /app/data в контейнере
docker run -v $(pwd)/data:/app/data myapp

# переменная окружения
docker run -e NODE_ENV=production -e API_URL=http://api:8000 myapp`} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">7. Docker Compose — несколько контейнеров сразу</h2>
        <Term name="Docker Compose">
          инструмент для описания и запуска сразу нескольких связанных контейнеров одним файлом{' '}
          <code>docker-compose.yml</code> и одной командой. Идеален для связки «фронтенд + бэкенд + база данных».
        </Term>
        <TheoryCode language="yaml" code={`services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgres://db:5432/app

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`} />
        <P n={6}>
          Запуск всей связки — <code>docker compose up</code>, остановка — <code>docker compose down</code>. Compose
          сам создаёт общую сеть, и контейнеры видят друг друга по имени сервиса (бэкенд обращается к базе по хосту{' '}
          <code>db</code>). Для локальной разработки фронтенд+бэкенд это самый удобный способ поднять весь проект
          одной командой.
        </P>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">8. Зачем Docker фронтендеру и бэкендеру</h2>
        <TheoryTable
          headers={['Роль', 'Польза от Docker']}
          rows={[
            ['Frontend', 'одинаковая версия Node у всей команды; сборка и превью без установки на хост'],
            ['Backend', 'БД, кеш, очереди поднимаются одной командой; деплой предсказуем'],
            ['Оба', 'весь проект «фронт+бэк+БД» стартует через docker compose up'],
            ['Команда', 'новый разработчик запускает проект за минуты, а не за день настройки'],
          ]}
        />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Итоги</h2>
        <P n={7}>
          <strong>Docker</strong> упаковывает приложение с окружением в <strong>контейнер</strong>, который
          одинаково запускается везде, решая проблему «работает только у меня». Контейнеры легче виртуальных машин,
          потому что делят ядро хоста. Ключевые понятия: <strong>образ</strong> (шаблон), <strong>контейнер</strong>{' '}
          (запущенный экземпляр), <strong>реестр</strong> (Docker Hub). Образ собирают по <strong>Dockerfile</strong>,
          управляют командами <code>build</code>, <code>run</code>, <code>ps</code>, <code>stop</code>,{' '}
          <code>logs</code>, <code>exec</code>. <strong>Тома</strong> хранят данные, <strong>env</strong> передаёт
          настройки, а <strong>Docker Compose</strong> поднимает всю связку «фронт + бэк + БД» одной командой.
        </P>
      </section>
    </div>
  )
}
