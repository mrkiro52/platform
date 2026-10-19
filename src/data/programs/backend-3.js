// Индивидуальная программа «Backend-разработка», глава 3 — очереди и асинхронная обработка.
// Зачем нужны брокеры, Kafka и RabbitMQ, гарантии доставки и идемпотентность, фоновые задачи
// (BackgroundTasks, Celery, TaskIQ), retry, dead letter queue, transactional outbox.
// Примеры кода — на Python и FastAPI. Задание — вопросы backend-3-quiz.js, сдаются на платформе.
// lang у блока code — язык примера, если это не Python (для проверки примеров).

export default {
  num: 3,
  title: 'Очереди и асинхронная обработка',
  summary: 'Зачем нужны очереди и брокеры сообщений, Kafka: топики, партиции, offset, consumer groups, RabbitMQ: exchange, очереди, подтверждения, гарантии доставки at-most-once, at-least-once, exactly-once, идемпотентные обработчики, фоновые задачи в FastAPI, Celery и TaskIQ, паттерны retry, dead letter queue, transactional outbox.',
  intro: 'Не всю работу нужно делать, пока пользователь ждёт ответа. Письмо можно отправить через секунду, отчёт — собрать за минуту, событие «заказ оплачен» — разослать пяти сервисам по очереди. Для этого в бэкенде есть очереди сообщений и фоновые задачи. На собеседованиях junior backend-разработчика эту тему спрашивают почти всегда: чем Kafka отличается от RabbitMQ, что такое партиция и consumer group, как не потерять и не обработать дважды сообщение, зачем нужен outbox. В этой главе — все эти темы с примерами на FastAPI.',
  sections: [
    {
      id: 'why',
      num: '3.1',
      title: 'Зачем нужны очереди и брокеры сообщений',
      blocks: [
        { t: 'h3', text: '3.1.1. Проблема синхронного кода' },
        { t: 'p', text: 'Представь обработчик «оформить заказ». После сохранения заказа нужно: отправить письмо покупателю, уведомить склад, начислить бонусы, передать данные в аналитику. Если всё это делать прямо в обработчике запроса:' },
        { t: 'ul', items: [
          '**пользователь ждёт** всё: письмо отправляется 2 секунды, аналитика отвечает ещё секунду — ответ API приходит через 4 секунды;',
          '**одна упавшая зависимость роняет всё**: почтовый сервис недоступен — и заказ не оформляется, хотя письмо было не главным;',
          '**пиковая нагрузка** в распродажу бьёт по всем сервисам сразу, и они падают;',
          '**сильная связанность**: сервис заказов должен знать про склад, почту, бонусы и аналитику и вызывать каждого.',
        ] },
        { t: 'h3', text: '3.1.2. Решение: брокер сообщений' },
        { t: 'p', text: '**Брокер сообщений** — отдельный сервис-посредник, который принимает сообщения от одних программ и доставляет другим. Сервис заказов только сохраняет заказ и кладёт в брокер сообщение «заказ создан» — это занимает миллисекунды. Остальные сервисы читают сообщение, когда готовы, каждый в своём темпе.' },
        { t: 'flow', steps: ['producer (сервис заказов)', 'брокер: очередь / топик', 'consumer: почта, склад, бонусы, аналитика'] },
        { t: 'table', caption: 'Таблица 1. Основные понятия', headers: ['Понятие', 'Что это'], rows: [
          ['**сообщение**', 'пакет данных: тело (обычно JSON), ключ, заголовки, метаданные'],
          ['**producer** (продюсер, издатель)', 'программа, которая отправляет сообщения'],
          ['**consumer** (консьюмер, потребитель)', 'программа, которая читает и обрабатывает сообщения'],
          ['**брокер**', 'сервис, который хранит сообщения и доставляет их: Kafka, RabbitMQ, Redis Streams, Amazon SQS'],
          ['**очередь**', 'сообщения обрабатываются по одному разу одним из потребителей'],
          ['**pub/sub** (публикация-подписка)', 'каждое сообщение получают все подписчики'],
        ] },
        { t: 'h3', text: '3.1.3. Что дают очереди' },
        { t: 'table', caption: 'Таблица 2. Зачем нужен брокер', headers: ['Задача', 'Как помогает очередь'], rows: [
          ['**асинхронная обработка**', 'долгую работу делаем после ответа пользователю: письма, отчёты, обработка видео'],
          ['**развязка сервисов** (decoupling)', 'отправитель не знает получателей; новый подписчик добавляется без изменения отправителя'],
          ['**сглаживание пиков**', 'очередь копит сообщения в пик, обработчики разбирают их в своём темпе — ничего не падает'],
          ['**надёжность**', 'если потребитель упал, сообщения ждут в брокере и обработаются после перезапуска'],
          ['**масштабирование**', 'добавили обработчиков — работа распределилась между ними'],
          ['**рассылка событий** (fan-out)', 'одно событие «заказ оплачен» получают склад, почта и аналитика'],
          ['**повторы**', 'неудачную обработку можно повторить позже'],
        ] },
        { t: 'h3', text: '3.1.4. Команды и события' },
        { t: 'ul', items: [
          '**команда** — просьба сделать что-то конкретное одному исполнителю: «отправь письмо», «сгенерируй отчёт». Имя в повелительном наклонении. Типичный носитель — очередь задач (RabbitMQ, Celery);',
          '**событие** — факт, который уже произошёл: «заказ оплачен», «пользователь зарегистрирован». Имя в прошедшем времени, отправитель не знает и не должен знать, кто его обработает. Типичный носитель — топик Kafka.',
        ] },
        { t: 'h3', text: '3.1.5. Когда брокер не нужен' },
        { t: 'p', text: 'Брокер — это ещё одна система, которую нужно развернуть, мониторить и понимать. Если клиенту нужен ответ **прямо сейчас** (проверить остаток, авторизовать платёж), если получатель один и связь простая, если нагрузка маленькая — достаточно обычного HTTP-вызова или фоновой задачи внутри приложения. Асинхронность всегда добавляет сложность: данные в разных сервисах какое-то время расходятся (eventual consistency), ошибки сложнее искать.' },
      ],
      terms: [
        ['брокер сообщений', 'сервис-посредник, который хранит и доставляет сообщения между программами.'],
        ['producer / consumer', 'отправитель и получатель сообщений.'],
        ['decoupling', 'развязка: сервисы не зависят напрямую друг от друга.'],
        ['eventual consistency', 'согласованность в конечном счёте: данные сойдутся, но не мгновенно.'],
      ],
    },
    {
      id: 'kafka',
      num: '3.2',
      divider: 'Брокеры',
      title: 'Kafka: топики, партиции, consumer groups, offset',
      blocks: [
        { t: 'p', text: '**Apache Kafka** — распределённый **журнал событий** (log). Главное отличие от классической очереди: сообщения **не удаляются** после прочтения, а хранятся заданное время (например, 7 дней). Каждый потребитель сам помнит, до какого места дочитал. Kafka выдерживает миллионы сообщений в секунду и стала стандартом для событий между сервисами и потоков данных.' },
        { t: 'h3', text: '3.2.1. Топики и партиции' },
        { t: 'ul', items: [
          '**топик** (topic) — именованный поток сообщений одного вида: `orders.created`, `payments.completed`;',
          '**партиция** (partition) — часть топика. Каждая партиция — упорядоченный журнал, куда сообщения только дописываются в конец. Топик делят на партиции, чтобы писать и читать параллельно на разных серверах;',
          '**offset** — порядковый номер сообщения внутри партиции: 0, 1, 2, … Пара (партиция, offset) однозначно указывает на сообщение;',
          '**брокер** — сервер Kafka; кластер состоит из нескольких брокеров, партиции распределены между ними;',
          '**реплики** — копии партиции на других брокерах: одна реплика лидер (через неё пишут и читают), остальные — последователи, на случай отказа сервера;',
          '**retention** — сколько хранить сообщения: по времени или по размеру.',
        ] },
        { t: 'h3', text: '3.2.2. Ключ сообщения и порядок' },
        { t: 'p', text: 'Kafka гарантирует порядок сообщений **только внутри одной партиции**. В какую партицию попадёт сообщение, определяет **ключ**: хеш ключа по модулю числа партиций. Сообщения с одинаковым ключом всегда попадают в одну партицию. Поэтому все события одного заказа отправляют с ключом `order_id` — и «создан → оплачен → отменён» обработаются в правильном порядке, а разные заказы — параллельно в разных партициях. Сообщения без ключа распределяются по партициям равномерно.' },
        { t: 'note', text: 'Если увеличить число партиций у топика, для части ключей поменяется партиция, и порядок событий одной сущности может нарушиться на время переходного периода. Число партиций выбирают с запасом заранее.' },
        { t: 'h3', text: '3.2.3. Consumer groups' },
        { t: 'p', text: '**Группа потребителей** (consumer group) — несколько экземпляров одного сервиса, которые вместе читают топик. Правила:' },
        { t: 'ul', items: [
          'каждая партиция внутри группы читается **ровно одним** экземпляром — так сообщение обрабатывается группой один раз;',
          'разные группы читают топик **независимо** и получают все сообщения — это и есть pub/sub: у склада своя группа, у почты своя;',
          'если экземпляров больше, чем партиций, лишние **простаивают**. Число партиций — потолок параллелизма группы;',
          'когда экземпляр падает или добавляется, Kafka перераспределяет партиции между оставшимися — **ребалансировка** (rebalance). Во время неё чтение группы ненадолго останавливается.',
        ] },
        { t: 'table', caption: 'Таблица 3. Топик из 3 партиций и две группы', headers: ['Группа', 'Экземпляры', 'Кто что читает'], rows: [
          ['`notifications`', '2', 'экземпляр 1 — партиции 0 и 1, экземпляр 2 — партиция 2'],
          ['`warehouse`', '3', 'по одной партиции на экземпляр'],
          ['`analytics`', '1', 'все три партиции'],
        ] },
        { t: 'h3', text: '3.2.4. Offset и коммит' },
        { t: 'p', text: 'Потребитель периодически сохраняет в Kafka **закоммиченный offset** — «группа обработала всё до сообщения 1042 в партиции 0». После перезапуска чтение продолжится с этого места. Можно перемотать offset назад и перечитать события, например чтобы восстановить данные после ошибки. **Lag** — сколько сообщений группа ещё не прочитала; главная метрика мониторинга потребителей.' },
        { t: 'ul', items: [
          '**автокоммит** (`enable_auto_commit=True`) — offset коммитится по таймеру, независимо от того, обработано ли сообщение. Просто, но при падении можно потерять или повторить сообщения;',
          '**ручной коммит** после успешной обработки — стандарт для важных данных: гарантия at-least-once (раздел 3.4).',
        ] },
        { t: 'h3', text: '3.2.5. Kafka в FastAPI' },
        { t: 'p', text: 'Для асинхронного Python используют библиотеку `aiokafka`. Продюсер создаётся один раз при старте приложения (в `lifespan`) и закрывается при остановке:' },
        { t: 'code', text: `import json
from contextlib import asynccontextmanager

from aiokafka import AIOKafkaProducer
from fastapi import FastAPI
from pydantic import BaseModel


class OrderIn(BaseModel):
    user_id: int
    total: int


@asynccontextmanager
async def lifespan(app: FastAPI):
    producer = AIOKafkaProducer(
        bootstrap_servers="localhost:9092",
        acks="all",                    # ждать подтверждения от всех реплик
        enable_idempotence=True,       # без дублей при повторной отправке
        value_serializer=lambda v: json.dumps(v).encode(),
    )
    await producer.start()
    app.state.producer = producer
    yield
    await producer.stop()


app = FastAPI(lifespan=lifespan)


@app.post("/orders", status_code=201)
async def create_order(order: OrderIn):
    order_id = 42  # здесь заказ сохраняется в базу
    await app.state.producer.send_and_wait(
        "orders.created",
        key=str(order_id).encode(),    # ключ — все события заказа в одной партиции
        value={"order_id": order_id, "user_id": order.user_id, "total": order.total},
    )
    return {"id": order_id}` },
        { t: 'p', text: 'Потребитель — отдельный процесс (воркер), который читает топик в цикле и коммитит offset вручную после обработки:' },
        { t: 'code', text: `import asyncio
import json

from aiokafka import AIOKafkaConsumer


async def handle(event: dict) -> None:
    print("отправляем письмо по заказу", event["order_id"])


async def main():
    consumer = AIOKafkaConsumer(
        "orders.created",
        bootstrap_servers="localhost:9092",
        group_id="notifications",          # группа потребителей
        enable_auto_commit=False,          # коммитим сами после обработки
        auto_offset_reset="earliest",      # новая группа начинает с начала топика
        value_deserializer=lambda b: json.loads(b),
    )
    await consumer.start()
    try:
        async for msg in consumer:
            await handle(msg.value)
            await consumer.commit()        # offset сохраняется только после успеха
    finally:
        await consumer.stop()


if __name__ == "__main__":
    asyncio.run(main())` },
        { t: 'note', text: '`acks="all"` — продюсер считает сообщение отправленным, только когда его записали все синхронные реплики; так сообщение не потеряется при падении лидера. `acks=1` — достаточно лидера (быстрее, но при его падении можно потерять последние сообщения), `acks=0` — не ждать подтверждения вообще.' },
      ],
      terms: [
        ['топик', 'именованный поток сообщений в Kafka.'],
        ['партиция', 'упорядоченная часть топика; единица параллелизма.'],
        ['offset', 'номер сообщения в партиции; позиция чтения группы.'],
        ['consumer group', 'группа экземпляров, которые вместе читают топик, деля партиции.'],
        ['rebalance', 'перераспределение партиций между потребителями группы.'],
        ['lag', 'отставание группы: сколько сообщений ещё не прочитано.'],
      ],
    },
    {
      id: 'rabbit',
      num: '3.3',
      title: 'RabbitMQ: exchange, очереди, подтверждения',
      blocks: [
        { t: 'p', text: '**RabbitMQ** — классический брокер очередей по протоколу **AMQP 0-9-1**. Сообщение доставляется потребителю и после подтверждения **удаляется** из очереди. Сильные стороны — гибкая маршрутизация, приоритеты, отложенная доставка, удобство для очередей задач.' },
        { t: 'h3', text: '3.3.1. Exchange, binding, очередь' },
        { t: 'p', text: 'Продюсер в RabbitMQ отправляет сообщение не в очередь, а в **exchange** (обменник) с **routing key** — меткой маршрутизации. Exchange по правилам — **bindings** (привязкам) — раскладывает копии сообщения по очередям. Потребители читают из очередей.' },
        { t: 'flow', steps: ['producer', 'exchange + routing key', 'binding', 'очередь', 'consumer'] },
        { t: 'table', caption: 'Таблица 4. Типы exchange', headers: ['Тип', 'Как маршрутизирует', 'Пример'], rows: [
          ['**direct**', 'в очереди, у которых ключ привязки совпадает с routing key', '`email` → очередь отправки писем'],
          ['**topic**', 'по шаблону: `*` — ровно одно слово, `#` — любое число слов', '`order.*.paid`, `order.#`'],
          ['**fanout**', 'во все привязанные очереди, ключ не важен', 'разослать событие всем сервисам'],
          ['**headers**', 'по заголовкам сообщения', 'редко используется'],
          ['default (без имени)', 'прямо в очередь с именем, равным routing key', 'простые очереди задач'],
        ] },
        { t: 'h3', text: '3.3.2. Подтверждения (acknowledgements)' },
        { t: 'p', text: 'RabbitMQ не удаляет сообщение, пока потребитель его не подтвердил. Это защищает от потери при падении обработчика.' },
        { t: 'ul', items: [
          '**ack** — «обработал успешно», сообщение удаляется из очереди;',
          '**nack / reject с requeue=True** — «не смог, верни в очередь», сообщение получит этот или другой потребитель;',
          '**nack / reject с requeue=False** — «выбрось», сообщение удаляется или уходит в dead letter exchange (раздел 3.6);',
          'если соединение с потребителем оборвалось до ack — RabbitMQ сам вернёт неподтверждённые сообщения в очередь;',
          '**auto-ack** — сообщение считается подтверждённым сразу при отправке потребителю. Быстро, но при падении обработчика сообщение теряется.',
        ] },
        { t: 'p', text: '**Prefetch** (`basic.qos`) — сколько неподтверждённых сообщений потребитель берёт одновременно. Маленькое значение (1–10) равномерно распределяет работу между обработчиками, большое увеличивает пропускную способность.' },
        { t: 'p', text: '**Publisher confirms** — подтверждения в обратную сторону: брокер сообщает продюсеру, что принял сообщение и записал его. Без них продюсер не знает, дошло ли сообщение.' },
        { t: 'h3', text: '3.3.3. Надёжность' },
        { t: 'ul', items: [
          '**durable-очередь** переживает перезапуск брокера;',
          '**persistent-сообщение** (`delivery_mode=2`) записывается на диск. Чтобы сообщение пережило перезапуск, нужны обе настройки;',
          '**quorum queues** — реплицированные очереди на нескольких узлах кластера, рекомендуемый тип для важных данных.',
        ] },
        { t: 'h3', text: '3.3.4. RabbitMQ в FastAPI' },
        { t: 'p', text: 'Асинхронный клиент — `aio-pika`. Публикация из обработчика FastAPI:' },
        { t: 'code', text: `import json
from contextlib import asynccontextmanager

import aio_pika
from fastapi import FastAPI


@asynccontextmanager
async def lifespan(app: FastAPI):
    connection = await aio_pika.connect_robust("amqp://guest:guest@localhost/")
    channel = await connection.channel(publisher_confirms=True)
    exchange = await channel.declare_exchange("orders", aio_pika.ExchangeType.TOPIC, durable=True)
    app.state.exchange = exchange
    yield
    await connection.close()


app = FastAPI(lifespan=lifespan)


@app.post("/orders/{order_id}/pay")
async def pay(order_id: int):
    message = aio_pika.Message(
        body=json.dumps({"order_id": order_id}).encode(),
        delivery_mode=aio_pika.DeliveryMode.PERSISTENT,   # сохранить на диск
        message_id=f"order-paid-{order_id}",              # для дедупликации у получателя
    )
    await app.state.exchange.publish(message, routing_key="order.paid")
    return {"status": "accepted"}` },
        { t: 'p', text: 'Потребитель с ручным подтверждением: контекстный менеджер `message.process()` отправит ack при успехе и reject при исключении.' },
        { t: 'code', text: `import asyncio
import json

import aio_pika


async def main():
    connection = await aio_pika.connect_robust("amqp://guest:guest@localhost/")
    channel = await connection.channel()
    await channel.set_qos(prefetch_count=10)

    exchange = await channel.declare_exchange("orders", aio_pika.ExchangeType.TOPIC, durable=True)
    queue = await channel.declare_queue("warehouse", durable=True)
    await queue.bind(exchange, routing_key="order.*")     # все события заказов

    async with queue.iterator() as messages:
        async for message in messages:
            async with message.process(requeue=False):     # ack после блока, reject при ошибке
                event = json.loads(message.body)
                print("резервируем товары заказа", event["order_id"])


if __name__ == "__main__":
    asyncio.run(main())` },
      ],
      terms: [
        ['exchange', 'обменник RabbitMQ: распределяет сообщения по очередям.'],
        ['routing key', 'метка сообщения, по которой exchange выбирает очереди.'],
        ['binding', 'правило связи exchange и очереди.'],
        ['ack / nack', 'подтверждение или отказ от обработки сообщения.'],
        ['prefetch', 'число неподтверждённых сообщений, которые потребитель берёт сразу.'],
      ],
    },
    {
      id: 'compare',
      num: '3.4',
      title: 'Kafka или RabbitMQ',
      blocks: [
        { t: 'table', caption: 'Таблица 5. Сравнение', headers: ['', 'Kafka', 'RabbitMQ'], rows: [
          ['модель', 'журнал: сообщения хранятся после чтения', 'очередь: сообщение удаляется после ack'],
          ['перечитать старые сообщения', 'да, перемоткой offset', 'нет'],
          ['кто помнит позицию', 'потребитель (offset)', 'брокер'],
          ['маршрутизация', 'простая: топик и ключ', 'гибкая: exchange, routing key, bindings'],
          ['порядок', 'внутри партиции', 'внутри очереди при одном потребителе'],
          ['масштабирование чтения', 'партициями', 'конкурирующими потребителями очереди'],
          ['пропускная способность', 'очень высокая — миллионы в секунду', 'высокая — десятки тысяч в секунду'],
          ['приоритеты, отложенная доставка, TTL', 'нет из коробки', 'есть'],
          ['типичное применение', 'события между многими сервисами, потоки данных, аналитика, логи', 'очереди задач и команд, сложная маршрутизация, RPC'],
        ] },
        { t: 'p', text: 'Короткий ответ на собеседовании: **Kafka — для потока событий**, которые нужно хранить, читать многим независимым потребителям и иногда перечитывать; **RabbitMQ — для очереди задач**, где каждое сообщение должно один раз обработать один из исполнителей, а маршрутизация может быть сложной.' },
        { t: 'note', text: 'Ещё варианты: **Redis** (списки и Redis Streams) — простые очереди, когда Redis уже есть в проекте; **Amazon SQS**, **Google Pub/Sub**, **Yandex Message Queue** — управляемые облачные очереди, которые не нужно администрировать; **NATS** — лёгкий и очень быстрый брокер.' },
      ],
      terms: [],
    },
    {
      id: 'delivery',
      num: '3.5',
      divider: 'Надёжность',
      title: 'Гарантии доставки и идемпотентные обработчики',
      blocks: [
        { t: 'h3', text: '3.5.1. Где теряются и дублируются сообщения' },
        { t: 'p', text: 'Сеть ненадёжна, процессы падают. Проблемы возникают на двух участках:' },
        { t: 'ul', items: [
          '**продюсер → брокер**: продюсер отправил сообщение, брокер записал, но подтверждение потерялось. Продюсер повторит отправку — и сообщение будет записано **дважды**;',
          '**брокер → потребитель**: потребитель обработал сообщение (списал деньги), но упал до того, как подтвердил его (ack или коммит offset). После перезапуска сообщение придёт **ещё раз**. Или наоборот: подтвердил до обработки и упал — сообщение **потеряно**.',
        ] },
        { t: 'h3', text: '3.5.2. Три гарантии' },
        { t: 'table', caption: 'Таблица 6. Семантика доставки', headers: ['Гарантия', 'Как получается', 'Что может случиться', 'Когда подходит'], rows: [
          ['**at-most-once** — не больше одного раза', 'подтверждаем до обработки, продюсер не повторяет отправку', 'сообщение может **потеряться**', 'метрики, логи, где потеря допустима'],
          ['**at-least-once** — хотя бы один раз', 'подтверждаем после обработки, продюсер повторяет при ошибке', 'сообщение может прийти **повторно**', 'почти все бизнес-сценарии — вместе с идемпотентным обработчиком'],
          ['**exactly-once** — ровно один раз', 'транзакции брокера: чтение, запись результата и коммит offset атомарно', 'работает только внутри брокера', 'потоковая обработка Kafka → Kafka'],
        ] },
        { t: 'p', text: 'Важный момент для собеседования: **честного exactly-once между брокером и внешним миром не бывает**. Kafka умеет exactly-once внутри себя — идемпотентный продюсер (без дублей при повторной отправке) и транзакции (прочитать из топика, записать в другой топик и закоммитить offset атомарно). Но если обработчик пишет в PostgreSQL, отправляет письмо или вызывает API, эти действия в транзакцию Kafka не входят.' },
        { t: 'note', text: '**Практический стандарт:** at-least-once + идемпотентный обработчик. Сообщения иногда приходят повторно, но повторная обработка ничего не ломает. Такой результат называют «effectively once» — эффективно ровно один раз.' },
        { t: 'h3', text: '3.5.3. Идемпотентность' },
        { t: 'p', text: 'Операция **идемпотентна**, если повторное выполнение даёт тот же результат, что и однократное. «Установить статус заказа = оплачен» идемпотентна: сколько раз ни выполни, статус один. «Начислить 100 бонусов» — нет: каждый повтор добавит ещё 100.' },
        { t: 'table', caption: 'Таблица 7. Как сделать обработчик идемпотентным', headers: ['Приём', 'Как работает'], rows: [
          ['**естественная идемпотентность**', 'писать абсолютные значения вместо приращений: `SET status = \'paid\'`, а не `balance = balance + 100`'],
          ['**таблица обработанных сообщений** (inbox)', 'сохранять id сообщения с уникальным ограничением **в той же транзакции**, что и результат; повтор упадёт на ограничении'],
          ['**upsert**', '`INSERT … ON CONFLICT DO NOTHING / DO UPDATE` по бизнес-ключу'],
          ['**проверка состояния**', 'перед действием проверить, не сделано ли оно уже: заказ уже оплачен — пропустить'],
          ['**ключ идемпотентности во внешнем API**', 'передавать платёжному шлюзу один и тот же ключ — он сам не проведёт платёж дважды'],
        ] },
        { t: 'p', text: 'Пример обработчика начисления бонусов с таблицей обработанных сообщений на SQLAlchemy 2.0. Запись id сообщения и начисление — в **одной транзакции**: либо обе, либо ни одной.' },
        { t: 'code', text: `from sqlalchemy import String, select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class ProcessedMessage(Base):
    __tablename__ = "processed_messages"
    message_id: Mapped[str] = mapped_column(String(100), primary_key=True)   # уникальный


class Wallet(Base):
    __tablename__ = "wallets"
    user_id: Mapped[int] = mapped_column(primary_key=True)
    bonus: Mapped[int] = mapped_column(default=0)


async def handle_bonus(session: AsyncSession, message_id: str, user_id: int, amount: int) -> bool:
    """Начисляет бонусы один раз на одно сообщение. Возвращает False для повтора."""
    try:
        async with session.begin():                      # одна транзакция на всё
            session.add(ProcessedMessage(message_id=message_id))
            await session.flush()                        # дубль упадёт здесь на PRIMARY KEY
            wallet = await session.scalar(
                select(Wallet).where(Wallet.user_id == user_id).with_for_update()
            )
            wallet.bonus += amount
        return True
    except IntegrityError:
        return False                                     # уже обработано — просто подтверждаем` },
        { t: 'note', text: 'Проверка «есть ли id в таблице» отдельным SELECT перед обработкой **не защищает** от двух одновременных обработчиков: оба увидят «нет» и оба начислят. Защиту даёт только уникальное ограничение в базе в одной транзакции с действием.' },
        { t: 'h3', text: '3.5.4. Идемпотентность HTTP API' },
        { t: 'p', text: 'Та же проблема у клиентов API: запрос «создать платёж» отправлен, ответ потерялся, клиент повторяет. Решение — заголовок **Idempotency-Key**: клиент генерирует UUID на операцию и повторяет запрос с тем же ключом; сервер сохраняет ключ с ответом и на повтор возвращает сохранённый ответ, не создавая платёж второй раз.' },
      ],
      terms: [
        ['at-least-once', 'гарантия доставки «хотя бы один раз» — возможны повторы.'],
        ['exactly-once', 'гарантия «ровно один раз» — достижима только внутри брокера.'],
        ['идемпотентность', 'повторное выполнение операции не меняет результат.'],
        ['inbox', 'таблица обработанных сообщений для защиты от повторов.'],
        ['Idempotency-Key', 'заголовок с ключом операции для безопасных повторов HTTP-запросов.'],
      ],
    },
    {
      id: 'tasks',
      num: '3.6',
      title: 'Фоновые задачи: BackgroundTasks, Celery, TaskIQ',
      blocks: [
        { t: 'p', text: '**Фоновая задача** — работа, которая выполняется вне цикла «запрос — ответ»: отправить письмо, сгенерировать PDF, обработать загруженное изображение, пересчитать рейтинг раз в час.' },
        { t: 'h3', text: '3.6.1. BackgroundTasks в FastAPI' },
        { t: 'p', text: 'Встроенный в FastAPI механизм: функция выполняется **в том же процессе** сразу после отправки ответа клиенту.' },
        { t: 'code', text: `from fastapi import BackgroundTasks, FastAPI

app = FastAPI()


def send_welcome_email(email: str) -> None:
    print(f"письмо отправлено на {email}")


@app.post("/users", status_code=201)
async def register(email: str, background_tasks: BackgroundTasks):
    # ... сохраняем пользователя
    background_tasks.add_task(send_welcome_email, email)   # выполнится после ответа
    return {"email": email}` },
        { t: 'p', text: 'Подходит для коротких некритичных задач. Ограничения: задача живёт в памяти процесса — если сервер перезапустится, она **потеряется**; нет повторов, расписания, мониторинга; тяжёлая задача отнимает ресурсы у обработки запросов. Для серьёзной работы нужна очередь задач.' },
        { t: 'h3', text: '3.6.2. Celery' },
        { t: 'p', text: '**Celery** — самая распространённая очередь задач в Python. Устройство:' },
        { t: 'ul', items: [
          '**приложение** вызывает задачу: `send_email.delay(...)` — в брокер уходит сообщение «выполни задачу с такими аргументами»;',
          '**брокер** — RabbitMQ или Redis — хранит очередь задач;',
          '**воркеры** — отдельные процессы `celery worker` — забирают задачи и выполняют;',
          '**result backend** (необязательно) — Redis или база, куда сохраняются результаты и статусы задач;',
          '**Celery Beat** — планировщик периодических задач («каждый день в 3:00»).',
        ] },
        { t: 'code', text: `# tasks.py
from celery import Celery

celery_app = Celery(
    "shop",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
)
celery_app.conf.task_acks_late = True          # подтверждать после выполнения, а не до


class TemporaryError(Exception):
    pass


@celery_app.task(bind=True, autoretry_for=(TemporaryError,), retry_backoff=True,
                 retry_kwargs={"max_retries": 5})
def send_email(self, to: str, subject: str) -> str:
    # обращение к почтовому сервису; при TemporaryError Celery повторит
    # задачу с растущей задержкой: 1, 2, 4, 8, 16 секунд
    return f"sent to {to}"


celery_app.conf.beat_schedule = {
    "daily-report": {"task": "tasks.build_report", "schedule": 24 * 60 * 60},
}` },
        { t: 'code', text: `# main.py — постановка задачи из FastAPI
from fastapi import FastAPI

from tasks import send_email

app = FastAPI()


@app.post("/orders/{order_id}/confirm")
def confirm(order_id: int):
    task = send_email.delay("user@example.com", f"Заказ {order_id} подтверждён")
    return {"task_id": task.id}          # статус можно проверить по id` },
        { t: 'code', lang: 'bash', text: `celery -A tasks worker --loglevel=info --concurrency=4
celery -A tasks beat --loglevel=info` },
        { t: 'note', text: 'Celery — синхронный: внутри задач `async/await` из коробки не работает. Для асинхронного стека с FastAPI это неудобно — либо пишут синхронные задачи, либо выбирают асинхронную очередь, например TaskIQ.' },
        { t: 'h3', text: '3.6.3. TaskIQ' },
        { t: 'p', text: '**TaskIQ** — современная асинхронная очередь задач: задачи — обычные `async def`, есть интеграция с FastAPI (зависимости `Depends` прямо в задачах), брокеры на Redis, RabbitMQ, NATS, Kafka, планировщик.' },
        { t: 'code', text: `# broker.py — пакеты taskiq и taskiq-redis
from taskiq_redis import ListQueueBroker, RedisAsyncResultBackend

broker = ListQueueBroker("redis://localhost:6379").with_result_backend(
    RedisAsyncResultBackend("redis://localhost:6379")
)


@broker.task(retry_on_error=True, max_retries=3)
async def generate_report(user_id: int) -> str:
    # асинхронная работа: запросы к базе, к внешним API
    return f"report-{user_id}.pdf"` },
        { t: 'code', text: `# main.py
from contextlib import asynccontextmanager

from fastapi import FastAPI

from broker import broker, generate_report


@asynccontextmanager
async def lifespan(app: FastAPI):
    await broker.startup()
    yield
    await broker.shutdown()


app = FastAPI(lifespan=lifespan)


@app.post("/reports")
async def request_report(user_id: int):
    task = await generate_report.kiq(user_id)      # kiq — поставить в очередь
    return {"task_id": task.task_id}` },
        { t: 'code', lang: 'bash', text: `taskiq worker broker:broker` },
        { t: 'h3', text: '3.6.4. Что выбрать' },
        { t: 'table', caption: 'Таблица 8. Инструменты фоновых задач', headers: ['Инструмент', 'Когда'], rows: [
          ['`BackgroundTasks`', 'короткая некритичная задача, потеря при перезапуске допустима'],
          ['Celery', 'синхронный код (Django и др.), зрелая экосистема, мониторинг Flower, сложные цепочки задач'],
          ['TaskIQ', 'асинхронный стек FastAPI, задачи на async/await'],
          ['arq, Dramatiq', 'лёгкие альтернативы: arq — асинхронная на Redis, Dramatiq — простая синхронная'],
          ['Kafka-потребитель', 'реакция на события между сервисами, а не очередь задач одного приложения'],
        ] },
        { t: 'note', text: 'Аргументы задачи сериализуются в сообщение, поэтому передают **идентификаторы**, а не объекты: `send_email.delay(user_id=7)`, а не весь объект пользователя. Пока задача ждёт в очереди, данные могут измениться — воркер прочитает актуальные из базы.' },
      ],
      terms: [
        ['фоновая задача', 'работа вне цикла запрос — ответ.'],
        ['воркер', 'процесс, который забирает задачи из очереди и выполняет их.'],
        ['result backend', 'хранилище результатов и статусов задач.'],
        ['Celery Beat', 'планировщик периодических задач Celery.'],
      ],
    },
    {
      id: 'patterns',
      num: '3.7',
      title: 'Паттерны: retry, dead letter queue, transactional outbox',
      blocks: [
        { t: 'h3', text: '3.7.1. Retry — повторы' },
        { t: 'p', text: 'Многие ошибки временные: сеть мигнула, сервис перезапускался, база была перегружена. Такие операции повторяют. Правила хороших повторов:' },
        { t: 'ul', items: [
          'повторять только **временные** ошибки: таймаут, обрыв соединения, HTTP 502/503/504/429. Ошибки валидации (400, 422) и «не найдено» (404) повторять бессмысленно — результат будет тем же;',
          'повторяемая операция должна быть **идемпотентной** (раздел 3.5);',
          '**ограничить число попыток** — 3–5;',
          '**экспоненциальная задержка** (exponential backoff): 1, 2, 4, 8 секунд — даём сервису восстановиться;',
          '**случайный разброс** (jitter) — чтобы тысячи клиентов после сбоя не повторили запрос в одну и ту же секунду и не уронили сервис снова;',
          'после последней попытки — понятный финал: dead letter queue, алерт, ошибка пользователю.',
        ] },
        { t: 'code', text: `import asyncio
import random


class TemporaryError(Exception):
    pass


async def with_retry(func, *args, attempts: int = 5, base_delay: float = 0.5):
    for attempt in range(1, attempts + 1):
        try:
            return await func(*args)
        except TemporaryError:
            if attempt == attempts:
                raise                                       # попытки кончились
            delay = base_delay * 2 ** (attempt - 1)         # 0.5, 1, 2, 4 …
            await asyncio.sleep(delay + random.uniform(0, delay))   # + jitter` },
        { t: 'note', text: 'Готовые библиотеки: `tenacity` (декоратор `@retry` с backoff и jitter), `backoff`. В очередях задач повторы встроены: `autoretry_for` в Celery, `retry_on_error` в TaskIQ.' },
        { t: 'h3', text: '3.7.2. Dead letter queue' },
        { t: 'p', text: 'Некоторые сообщения невозможно обработать никогда: битый JSON, неизвестный тип события, ссылка на удалённый заказ. Если возвращать такое сообщение в очередь, обработчик будет бесконечно на нём падать и тормозить всю очередь — это **poison message** («отравленное сообщение»).' },
        { t: 'p', text: '**Dead letter queue (DLQ)** — отдельная очередь для сообщений, которые не удалось обработать после всех попыток. Основной поток продолжает работать, а проблемные сообщения лежат в DLQ: на них ставят алерт, разбирают вручную и после исправления бага отправляют обратно.' },
        { t: 'ul', items: [
          '**RabbitMQ**: у очереди задают аргумент `x-dead-letter-exchange` — сообщения после reject без requeue, истечения TTL или переполнения очереди уходят в этот exchange, а оттуда в очередь DLQ. Можно ограничить число повторов (`x-delivery-limit` у quorum queues);',
          '**Kafka**: встроенной DLQ нет — обработчик сам отправляет неудачное сообщение в отдельный топик, например `orders.created.dlq`, с заголовками «причина ошибки» и «число попыток», и коммитит offset. Часто добавляют промежуточные retry-топики с задержкой.',
        ] },
        { t: 'code', text: `import aio_pika


async def declare_with_dlq(channel: aio_pika.abc.AbstractChannel):
    dlx = await channel.declare_exchange("orders.dlx", aio_pika.ExchangeType.FANOUT, durable=True)
    dlq = await channel.declare_queue("warehouse.dlq", durable=True)
    await dlq.bind(dlx)

    return await channel.declare_queue(
        "warehouse",
        durable=True,
        arguments={"x-dead-letter-exchange": "orders.dlx"},   # куда уходят отказы
    )` },
        { t: 'h3', text: '3.7.3. Transactional outbox' },
        { t: 'p', text: 'Самый частый вопрос этой темы на собеседованиях. Сервис должен **сохранить заказ в базу и опубликовать событие** в брокер. Это две разные системы, общей транзакции у них нет — **проблема двойной записи** (dual write):' },
        { t: 'ul', items: [
          'сохранили заказ, а брокер недоступен — событие **потеряно**, склад не узнает о заказе;',
          'отправили событие, а транзакция в базе откатилась — склад резервирует товар для **несуществующего** заказа;',
          'отправить событие внутри открытой транзакции до коммита тоже нельзя: коммит может не пройти уже после отправки.',
        ] },
        { t: 'p', text: '**Решение — outbox.** Событие записывается в специальную таблицу `outbox` **в той же транзакции**, что и заказ. Транзакция гарантирует: либо есть и заказ, и событие, либо ничего. Отдельный процесс — **relay** — читает новые записи из `outbox`, публикует их в брокер и помечает отправленными.' },
        { t: 'flow', steps: ['одна транзакция: INSERT заказа + INSERT в outbox', 'relay читает неотправленные записи', 'публикует в Kafka / RabbitMQ', 'помечает отправленными'] },
        { t: 'code', text: `import json
from datetime import datetime

from sqlalchemy import JSON, String, func, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    pass


class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int]
    total: Mapped[int]


class OutboxEvent(Base):
    __tablename__ = "outbox"
    id: Mapped[int] = mapped_column(primary_key=True)
    topic: Mapped[str] = mapped_column(String(100))
    key: Mapped[str] = mapped_column(String(100))
    payload: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
    sent_at: Mapped[datetime | None] = mapped_column(default=None)


async def create_order(session: AsyncSession, user_id: int, total: int) -> int:
    async with session.begin():                     # заказ и событие — атомарно
        order = Order(user_id=user_id, total=total)
        session.add(order)
        await session.flush()                       # получаем order.id
        session.add(OutboxEvent(
            topic="orders.created",
            key=str(order.id),
            payload={"order_id": order.id, "user_id": user_id, "total": total},
        ))
    return order.id


async def relay_once(session: AsyncSession, producer) -> int:
    """Публикует пачку неотправленных событий. Запускается в цикле отдельным процессом."""
    async with session.begin():
        events = (await session.scalars(
            select(OutboxEvent)
            .where(OutboxEvent.sent_at.is_(None))
            .order_by(OutboxEvent.id)
            .limit(100)
            .with_for_update(skip_locked=True)      # несколько relay не возьмут одно и то же
        )).all()
        for event in events:
            await producer.send_and_wait(event.topic, key=event.key.encode(),
                                         value=json.dumps(event.payload).encode())
            event.sent_at = func.now()
    return len(events)` },
        { t: 'ul', items: [
          'relay может упасть **после** публикации, но **до** отметки «отправлено» — тогда событие отправится повторно. Outbox даёт **at-least-once**, поэтому получатели должны быть идемпотентными;',
          'события одной сущности публикуются в порядке `id` — порядок сохраняется;',
          'вместо опроса таблицы можно читать журнал изменений базы (**CDC**, change data capture) — например, **Debezium** читает WAL PostgreSQL и сам публикует записи outbox в Kafka;',
          'отправленные записи периодически чистят, чтобы таблица не росла бесконечно.',
        ] },
        { t: 'p', text: 'Зеркальный паттерн на стороне получателя — **inbox**: таблица обработанных сообщений из раздела 3.5. Вместе outbox и inbox дают надёжный обмен событиями: ничего не теряется и ничего не обрабатывается дважды.' },
      ],
      terms: [
        ['exponential backoff', 'экспоненциально растущая пауза между повторами.'],
        ['jitter', 'случайный разброс задержки, чтобы повторы не совпадали по времени.'],
        ['poison message', 'сообщение, которое невозможно обработать.'],
        ['DLQ', 'dead letter queue — очередь для необработанных сообщений.'],
        ['outbox', 'таблица исходящих событий, записываемая в одной транзакции с данными.'],
        ['CDC', 'change data capture — чтение изменений из журнала базы данных.'],
      ],
    },
  ],
}
