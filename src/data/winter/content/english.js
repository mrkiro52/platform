// Зимний лагерь: английский — единый конспект-лонгрид.
// Разметка: **жирный**, _курсив_, `код`.

export default {
  title: 'Английский для айтишника',
  intro: 'Английский в IT — не отдельный предмет, а рабочий инструмент: на нём написаны документация, сообщения об ошибках, ответы на Stack Overflow, названия переменных и почти все свежие статьи. Хорошая новость: говорить как носитель не нужно. Нужно уверенно читать техническую документацию, понятно писать короткие сообщения и уметь рассказать о себе и своём проекте. Этот конспект — карта того, что действительно требуется, с готовыми словарями и фразами. Читай его в своём темпе и возвращайся к нужным разделам.',
  sections: [
    {
      id: 'level', title: 'Какой английский нужен и зачем',
      blocks: [
        { t: 'p', text: 'Вопрос «какой у вас уровень английского» в IT означает не «сдавали ли вы экзамен», а «справитесь ли вы с рабочими задачами». Навыки нужны в разной степени, и осваивать их стоит именно в таком порядке.' },
        { t: 'table', caption: 'Четыре навыка: что нужно на старте', headers: ['Навык', 'Зачем', 'Что нужно джуну'], rows: [
          ['Чтение', 'документация, ошибки, статьи, чужой код и комментарии', 'обязательно: читать документацию без переводчика на каждой строке'],
          ['Письмо', 'сообщения коммитов, описания задач, комментарии в коде, переписка', 'короткие понятные сообщения по шаблонам'],
          ['Аудирование', 'видео, доклады, созвоны', 'понимать технические видео с субтитрами'],
          ['Говорение', 'собеседования, созвоны с иностранной командой', 'рассказ о себе и проекте; обязательно только для международных компаний'],
        ] },
        { t: 'table', caption: 'Уровни по шкале CEFR применительно к IT', headers: ['Уровень', 'Что умеешь', 'Чего хватает'], rows: [
          ['A2', 'читаешь простые тексты со словарём, знаешь базовую грамматику', 'учиться по русскоязычным материалам; документация — с трудом'],
          ['B1', 'читаешь документацию, пишешь простые сообщения, понимаешь видео с субтитрами', 'работа в российской компании — минимальный рабочий уровень'],
          ['B2', 'свободно читаешь, участвуешь в созвонах, проходишь собеседование на английском', 'международные команды и компании'],
          ['C1', 'ведёшь переговоры, пишешь статьи, выступаешь', 'руководящие роли в международной среде'],
        ] },
        { t: 'p', text: 'Реалистичная цель на время лагеря — дойти до уверенного чтения документации и научиться писать по шаблонам. Это уровень B1, и для первой работы в России его достаточно. Разговорный английский подтягивается позже и быстрее, когда есть словарь и привычка читать.' },
        { t: 'note', text: 'Технический английский проще общего: слов меньше, конструкции повторяются, много терминов уже знакомо по коду. Тысячи самых частых слов технических текстов хватает, чтобы понимать бо́льшую часть документации.' },
      ],
    },
    {
      id: 'reading', title: 'Как читать документацию',
      blocks: [
        { t: 'p', text: 'Главная ошибка — переводить текст целиком в переводчике. Так словарь не растёт, а перевод терминов часто искажает смысл: «pool» становится «бассейном», а «thread» — «ниткой». Читать нужно в оригинале, заглядывая в словарь за отдельными словами.' },
        { t: 'h3', text: 'Порядок чтения' },
        { t: 'ol', items: [
          '**Пробеги страницу глазами**: заголовки, примеры кода, выделенные блоки. Пойми структуру раньше, чем начнёшь читать.',
          '**Начни с примеров кода.** Код ты уже понимаешь, и он подсказывает смысл окружающего текста.',
          '**Читай абзац целиком**, не останавливаясь на каждом незнакомом слове. Если общий смысл ясен — иди дальше.',
          '**Выпиши слова**, которые встретились дважды и мешают понимать. Не больше пяти–семи за сеанс.',
          '**Переведи только то предложение**, которое не поддалось, — и сравни перевод со своим пониманием.',
        ] },
        { t: 'h3', text: 'Как устроена документация' },
        { t: 'table', caption: 'Типовые разделы и что в них искать', headers: ['Раздел', 'Перевод', 'Что внутри'], rows: [
          ['Getting Started, Quickstart', 'начало работы', 'установка и первый рабочий пример — начинай отсюда'],
          ['Installation, Setup', 'установка, настройка', 'команды установки и требования'],
          ['Tutorial, Guide', 'учебник, руководство', 'пошаговое объяснение с примерами'],
          ['How-to', 'как сделать', 'рецепты под конкретные задачи'],
          ['API Reference', 'справочник API', 'полный перечень функций, параметров и возвращаемых значений'],
          ['Concepts, Explanation', 'концепции', 'как это устроено и почему'],
          ['Configuration', 'конфигурация', 'все настройки и значения по умолчанию'],
          ['Troubleshooting, FAQ', 'устранение неполадок, частые вопросы', 'типовые ошибки и решения'],
          ['Changelog, Release Notes', 'журнал изменений', 'что изменилось в версиях'],
          ['Migration Guide', 'руководство по переходу', 'как обновиться со старой версии'],
          ['Deprecated', 'устаревшее', 'то, чем больше нельзя пользоваться'],
        ] },
        { t: 'h3', text: 'Конструкции, которые встречаются на каждой странице' },
        { t: 'table', caption: 'Фразы документации', headers: ['Фраза', 'Смысл'], rows: [
          ['By default, …', 'по умолчанию'],
          ['Note that … / Keep in mind that …', 'обратите внимание, что…'],
          ['Make sure (that) … / Ensure that …', 'убедитесь, что…'],
          ['In order to … / To …, you need to …', 'чтобы…, нужно…'],
          ['This allows you to … / This lets you …', 'это позволяет…'],
          ['It is recommended to … / We recommend …', 'рекомендуется…'],
          ['You should … / You must … / You may …', 'следует / обязательно / можно'],
          ['If you want to …, use …', 'если нужно…, используйте…'],
          ['Instead of …, use …', 'вместо… используйте…'],
          ['As of version 2.0, … / Since 2.0', 'начиная с версии 2.0'],
          ['is deprecated and will be removed in …', 'устарело и будет удалено в…'],
          ['is not supported / is no longer supported', 'не поддерживается / больше не поддерживается'],
          ['returns … if …, otherwise …', 'возвращает…, если…, иначе…'],
          ['raises / throws an exception', 'вызывает исключение'],
          ['under the hood', '«под капотом», во внутреннем устройстве'],
          ['out of the box', '«из коробки», без дополнительной настройки'],
          ['For more details, see …', 'подробнее — в разделе…'],
        ] },
        { t: 'h3', text: 'Как читать сообщения об ошибках' },
        { t: 'code', text: `TypeError: unsupported operand type(s) for +: 'int' and 'str'
→ неподдерживаемые типы операндов для «+»: число и строка

KeyError: 'user_id'                    → ключа нет в словаре
ModuleNotFoundError: No module named 'requests'      → модуль не найден (не установлен)
Permission denied                      → доступ запрещён
Connection refused                     → соединение отклонено (сервис не слушает порт)
Connection timed out                   → время ожидания соединения истекло
No such file or directory              → нет такого файла или каталога
Address already in use                 → адрес (порт) уже занят
relation "users" does not exist        → таблица «users» не существует
duplicate key value violates unique constraint       → повтор значения нарушает ограничение уникальности
fatal: not a git repository            → это не репозиторий Git
merge conflict in app/main.py          → конфликт слияния в файле` },
        { t: 'p', text: 'Сообщение об ошибке читается с конца стека вызовов: последняя строка называет тип и причину. Копируй её в поисковик **на английском и без своих путей и имён** — так находятся ответы, которых на русском нет.' },
      ],
    },
    {
      id: 'vocab', title: 'Словарь: общие термины',
      blocks: [
        { t: 'p', text: 'Слова сгруппированы по смыслу. Большинство ты уже видел в коде и интерфейсах — задача в том, чтобы узнавать их в тексте и правильно употреблять.' },
        { t: 'table', caption: 'Действия с кодом и данными', headers: ['Слово', 'Перевод', 'Пример'], rows: [
          ['to run, to execute', 'запускать, выполнять', 'Run the tests before pushing.'],
          ['to call, to invoke', 'вызывать', 'The function is called twice.'],
          ['to return', 'возвращать', 'The method returns a list of users.'],
          ['to pass', 'передавать; проходить', 'Pass the ID as an argument. / All tests passed.'],
          ['to assign', 'присваивать; назначать', 'Assign the result to a variable.'],
          ['to store, to save', 'хранить, сохранять', 'Passwords are stored as hashes.'],
          ['to retrieve, to fetch', 'получать, извлекать', 'Fetch the data from the API.'],
          ['to handle', 'обрабатывать', 'This handler handles POST requests.'],
          ['to raise, to throw', 'вызывать (исключение)', 'It raises a ValueError.'],
          ['to catch', 'перехватывать', 'Catch the exception and log it.'],
          ['to implement', 'реализовывать', 'Implement the interface.'],
          ['to deploy', 'развёртывать', 'We deploy twice a week.'],
          ['to build', 'собирать', 'The build failed.'],
          ['to debug', 'отлаживать', 'I spent an hour debugging it.'],
          ['to fix', 'исправлять', 'Fix the bug in the parser.'],
          ['to merge', 'сливать', 'Merge the branch into main.'],
          ['to revert, to roll back', 'откатывать', 'We had to roll back the release.'],
          ['to override', 'переопределять', 'Override the default settings.'],
          ['to validate', 'проверять корректность', 'Validate the input.'],
          ['to parse', 'разбирать', 'Parse the JSON response.'],
        ] },
        { t: 'table', caption: 'Существительные, которые нужны каждый день', headers: ['Слово', 'Перевод', 'Слово', 'Перевод'], rows: [
          ['variable', 'переменная', 'value', 'значение'],
          ['function, method', 'функция, метод', 'argument, parameter', 'аргумент, параметр'],
          ['loop', 'цикл', 'condition', 'условие'],
          ['array, list', 'массив, список', 'dictionary, map', 'словарь'],
          ['string', 'строка (тип)', 'row, line', 'строка таблицы; строка текста'],
          ['request, response', 'запрос, ответ', 'endpoint', 'конечная точка API'],
          ['issue, bug', 'задача, проблема; ошибка', 'feature', 'функциональность'],
          ['branch, commit', 'ветка, коммит', 'pull request', 'запрос на слияние'],
          ['environment', 'окружение', 'dependency', 'зависимость'],
          ['requirement', 'требование', 'constraint', 'ограничение'],
          ['performance', 'производительность', 'scalability', 'масштабируемость'],
          ['throughput', 'пропускная способность', 'latency', 'задержка'],
          ['bottleneck', 'узкое место', 'trade-off', 'компромисс'],
          ['workaround', 'обходное решение', 'edge case', 'граничный случай'],
          ['release', 'выпуск', 'outage, downtime', 'сбой, простой'],
        ] },
        { t: 'table', caption: 'Прилагательные и наречия из документации', headers: ['Слово', 'Перевод', 'Слово', 'Перевод'], rows: [
          ['available', 'доступный', 'required / optional', 'обязательный / необязательный'],
          ['default', 'по умолчанию', 'custom', 'пользовательский, свой'],
          ['valid / invalid', 'корректный / некорректный', 'empty', 'пустой'],
          ['nested', 'вложенный', 'built-in', 'встроенный'],
          ['mutable / immutable', 'изменяемый / неизменяемый', 'read-only', 'только для чтения'],
          ['deprecated', 'устаревший', 'legacy', 'унаследованный, старый'],
          ['reliable', 'надёжный', 'robust', 'устойчивый'],
          ['consistent', 'согласованный', 'concurrent', 'одновременный, конкурентный'],
          ['explicitly / implicitly', 'явно / неявно', 'respectively', 'соответственно'],
          ['currently', 'сейчас, в данный момент', 'eventually', 'в конечном счёте'],
        ] },
      ],
    },
    {
      id: 'vocab-roles', title: 'Словарь по направлениям',
      blocks: [
        { t: 'table', caption: 'Backend', headers: ['Слово', 'Перевод', 'Слово', 'Перевод'], rows: [
          ['database, table, column', 'база данных, таблица, столбец', 'primary / foreign key', 'первичный / внешний ключ'],
          ['query', 'запрос', 'index', 'индекс'],
          ['transaction', 'транзакция', 'lock, deadlock', 'блокировка, взаимная блокировка'],
          ['migration', 'миграция', 'schema', 'схема'],
          ['cache, cache invalidation', 'кеш, инвалидация кеша', 'queue', 'очередь'],
          ['message broker', 'брокер сообщений', 'consumer, producer', 'потребитель, отправитель'],
          ['thread, process', 'поток, процесс', 'race condition', 'состояние гонки'],
          ['authentication', 'аутентификация', 'authorization', 'авторизация'],
          ['load balancer', 'балансировщик нагрузки', 'rate limiting', 'ограничение частоты запросов'],
          ['replication, sharding', 'репликация, шардирование', 'idempotent', 'идемпотентный'],
        ] },
        { t: 'table', caption: 'Машинное обучение', headers: ['Слово', 'Перевод', 'Слово', 'Перевод'], rows: [
          ['dataset, sample', 'набор данных, объект выборки', 'feature', 'признак'],
          ['target, label', 'целевая переменная, метка', 'training / test set', 'обучающая / тестовая выборка'],
          ['to train, to fit', 'обучать', 'to predict, inference', 'предсказывать, применение модели'],
          ['overfitting, underfitting', 'переобучение, недообучение', 'bias, variance', 'смещение, разброс'],
          ['loss function', 'функция потерь', 'gradient descent', 'градиентный спуск'],
          ['weights', 'веса', 'learning rate', 'скорость обучения'],
          ['hyperparameter tuning', 'подбор гиперпараметров', 'cross-validation', 'кросс-валидация'],
          ['precision, recall', 'точность, полнота', 'accuracy', 'доля верных ответов'],
          ['outlier', 'выброс', 'missing values', 'пропуски'],
          ['data leakage', 'утечка данных', 'imbalanced classes', 'несбалансированные классы'],
          ['neural network, layer', 'нейросеть, слой', 'embedding', 'векторное представление'],
          ['fine-tuning', 'дообучение', 'benchmark, baseline', 'эталонный тест, базовое решение'],
        ] },
        { t: 'table', caption: 'Информационная безопасность', headers: ['Слово', 'Перевод', 'Слово', 'Перевод'], rows: [
          ['vulnerability', 'уязвимость', 'exploit', 'эксплойт; эксплуатировать'],
          ['threat', 'угроза', 'attack surface', 'поверхность атаки'],
          ['payload', 'полезная нагрузка', 'proof of concept (PoC)', 'подтверждение работоспособности'],
          ['privilege escalation', 'повышение привилегий', 'lateral movement', 'перемещение внутри сети'],
          ['persistence', 'закрепление в системе', 'breach, leak', 'взлом, утечка'],
          ['mitigation, remediation', 'снижение риска, устранение', 'patch', 'исправление'],
          ['disclosure', 'раскрытие информации', 'severity', 'критичность'],
          ['finding', 'находка (в отчёте)', 'scope', 'область работ'],
          ['penetration testing', 'тестирование на проникновение', 'incident response', 'реагирование на инцидент'],
          ['encryption, decryption', 'шифрование, расшифрование', 'hash, salt', 'хеш, соль'],
          ['malware', 'вредоносное ПО', 'phishing', 'фишинг'],
          ['firewall', 'межсетевой экран', 'hardening', 'укрепление системы'],
        ] },
      ],
    },
    {
      id: 'false-friends', title: 'Ложные друзья и слова, которые путают',
      blocks: [
        { t: 'p', text: '«Ложные друзья переводчика» похожи на русские слова, но значат другое. В технических текстах они искажают смысл чаще всего.' },
        { t: 'table', caption: 'Слово значит не то, чем кажется', headers: ['Слово', 'Кажется', 'На самом деле'], rows: [
          ['actual, actually', 'актуальный', 'фактический; на самом деле. «Актуальный» — current, up-to-date, relevant'],
          ['accurate', 'аккуратный', 'точный. «Аккуратный» — neat, careful'],
          ['eventually', 'эвентуально, возможно', 'в конечном счёте: eventual consistency — согласованность в конечном счёте'],
          ['control', 'контролировать (проверять)', 'управлять. «Проверять» — to check, to verify'],
          ['data', 'дата', 'данные. «Дата» — date'],
          ['list', 'лист', 'список. «Лист» — sheet, leaf'],
          ['resume', 'резюме', 'возобновлять. «Резюме» — CV, résumé; summary'],
          ['realize', 'реализовать', 'осознавать. «Реализовать» — to implement'],
          ['argument', 'аргумент в споре', 'в коде — аргумент функции; в речи — спор'],
          ['billion', 'биллион', 'миллиард'],
          ['decade', 'декада (10 дней)', 'десятилетие'],
          ['character', 'характер', 'символ. «Характер» — nature, personality'],
          ['figure', 'фигура', 'рисунок, схема; число'],
          ['pretend', 'претендовать', 'притворяться'],
        ] },
        { t: 'table', caption: 'Пары, которые путают', headers: ['Слова', 'Разница'], rows: [
          ['affect / effect', 'affect — влиять (глагол); effect — эффект, результат (существительное)'],
          ['argument / parameter', 'parameter — в объявлении функции; argument — значение при вызове'],
          ['authentication / authorization', 'кто ты / что тебе можно'],
          ['its / it\'s', 'its — «его, её» (принадлежность); it\'s — «it is»'],
          ['then / than', 'then — затем; than — чем (в сравнении)'],
          ['to lose / loose', 'lose — терять; loose — свободный, неплотный'],
          ['row / raw', 'row — строка таблицы; raw — сырой, необработанный'],
          ['principal / principle', 'principal — главный; субъект доступа; principle — принцип'],
          ['compliment / complement', 'комплимент / дополнение'],
          ['e.g. / i.e.', 'e.g. — например; i.e. — то есть'],
        ] },
        { t: 'h3', text: 'Типичные ошибки русскоязычных' },
        { t: 'split', columns: [
          { tone: 'no', title: 'Неправильно', items: ['I am agree.', 'It depends from the settings.', 'I have 2 years experience.', 'How it works?', 'I didn\'t knew.', 'We discussed about the task.', 'Informations, softwares, codes, feedbacks.', 'I very like Python.', 'According to me, …', 'I finished the university.'] },
          { tone: 'yes', title: 'Правильно', items: ['I agree.', 'It depends on the settings.', 'I have 2 years of experience.', 'How does it work?', 'I didn\'t know.', 'We discussed the task.', 'Information, software, code, feedback — без множественного числа.', 'I like Python very much. / I really like Python.', 'In my opinion, …', 'I graduated from university.'] },
        ] },
      ],
    },
    {
      id: 'grammar', title: 'Грамматика-минимум',
      blocks: [
        { t: 'p', text: 'Для чтения и рабочей переписки достаточно небольшого набора конструкций. Сложные времена в технических текстах почти не встречаются.' },
        { t: 'table', caption: 'Три времени, которых хватает', headers: ['Время', 'Когда', 'Пример'], rows: [
          ['Present Simple', 'как что-то работает всегда; факты', 'The function returns a list. The service listens on port 8000.'],
          ['Past Simple', 'что сделано, законченное действие с указанием когда', 'I fixed the bug yesterday. The test failed.'],
          ['Present Perfect', 'результат к настоящему моменту, время не указано', 'I have updated the docs. Have you tested it?'],
        ] },
        { t: 'p', text: 'Ещё два встречаются часто: **Present Continuous** — то, что происходит сейчас (I am working on the login page) и **Future Simple** — планы и обещания (I will fix it tomorrow).' },
        { t: 'h3', text: 'Пассивный залог' },
        { t: 'p', text: 'Документация написана пассивом, потому что важно действие, а не исполнитель. Формула: **to be + третья форма глагола**.' },
        { t: 'table', caption: 'Активный и пассивный залог', headers: ['Активный', 'Пассивный'], rows: [
          ['The server sends a response.', 'A response is sent by the server.'],
          ['We deprecated this method.', 'This method was deprecated.'],
          ['You can configure the timeout.', 'The timeout can be configured.'],
          ['They will remove it in 3.0.', 'It will be removed in 3.0.'],
        ] },
        { t: 'h3', text: 'Модальные глаголы в требованиях' },
        { t: 'p', text: 'В спецификациях и стандартах модальные глаголы имеют строгий смысл — он закреплён в документе RFC 2119, и на него опираются почти все технические стандарты.' },
        { t: 'table', caption: 'Уровни обязательности', headers: ['Слово', 'Смысл'], rows: [
          ['MUST, REQUIRED, SHALL', 'обязательно'],
          ['MUST NOT, SHALL NOT', 'запрещено'],
          ['SHOULD, RECOMMENDED', 'рекомендуется; отступать можно только по веской причине'],
          ['SHOULD NOT', 'не рекомендуется'],
          ['MAY, OPTIONAL', 'можно, на усмотрение'],
        ] },
        { t: 'p', text: 'В обычной речи: **can** — могу, умею; **could** — мог бы (вежливая просьба); **should** — следует; **have to / must** — должен; **might / may** — возможно. «Could you review my PR?» звучит вежливее, чем «Review my PR».' },
        { t: 'h3', text: 'Условные предложения' },
        { t: 'table', caption: 'Три типа, которые встречаются', headers: ['Тип', 'Схема', 'Пример'], rows: [
          ['Всегда верно', 'If + Present, Present', 'If the token is invalid, the server returns 401.'],
          ['Реальное будущее', 'If + Present, will', 'If you remove this line, the test will fail.'],
          ['Гипотетическое', 'If + Past, would', 'If we had more time, we would rewrite it.'],
        ] },
        { t: 'h3', text: 'Артикли — коротко' },
        { t: 'ul', items: [
          '**a / an** — один из многих, упоминается впервые: «Create a file».',
          '**the** — конкретный, уже известный: «Open the file» (тот самый).',
          'Без артикля — множественное число и неисчисляемое в общем смысле: «Tests are important», «Software is hard».',
          'Ошибки в артиклях не мешают пониманию. Не останавливайся из-за них — пиши.',
        ] },
      ],
    },
    {
      id: 'writing', title: 'Рабочая переписка: коммиты, задачи, ревью',
      blocks: [
        { t: 'h3', text: 'Сообщения коммитов' },
        { t: 'p', text: 'Пишутся в повелительном наклонении — как команда: «Add», а не «Added» и не «Adds». Удобная проверка: сообщение должно продолжать фразу «If applied, this commit will…».' },
        { t: 'code', text: `Add pagination to the orders endpoint
Fix race condition in the cache update
Remove unused imports
Update dependencies to the latest versions
Refactor user service to use the repository pattern
Rename get_data to fetch_orders for clarity
Handle empty response from the payment API
Improve error message for invalid tokens
Bump FastAPI from 0.110 to 0.115
Revert "Add retry logic to the HTTP client"` },
        { t: 'table', caption: 'Глаголы для коммитов', headers: ['Глагол', 'Когда'], rows: [
          ['Add', 'появилось новое: функция, файл, тест'],
          ['Fix', 'исправлена ошибка'],
          ['Remove, Delete', 'что-то убрано'],
          ['Update', 'обновлено существующее'],
          ['Refactor', 'структура изменена, поведение прежнее'],
          ['Rename, Move', 'переименовано, перемещено'],
          ['Improve, Optimize', 'улучшено, ускорено'],
          ['Handle', 'добавлена обработка случая'],
          ['Implement', 'реализована возможность'],
          ['Bump', 'поднята версия зависимости'],
        ] },
        { t: 'h3', text: 'Описание pull request' },
        { t: 'code', text: `## What
Add rate limiting to the public API (100 requests per minute per user).

## Why
Several clients were sending bursts of requests and slowing down the service.

## How
- Store counters in Redis with a 60-second TTL
- Return 429 with a Retry-After header when the limit is exceeded
- Limits are configurable via environment variables

## How to test
1. Run \`docker compose up\`
2. Send more than 100 requests within a minute
3. The 101st request should return 429

## Notes
The limit for admin users is not implemented yet — I will add it in a follow-up PR.` },
        { t: 'h3', text: 'Комментарии на код-ревью' },
        { t: 'table', caption: 'Фразы ревьюера и автора', headers: ['Ситуация', 'Фразы'], rows: [
          ['Мягкое замечание', 'Nit: … (мелочь) · Could we … ? · What do you think about … ? · Consider using …'],
          ['Вопрос', 'Why do we need this check? · Could you explain this part? · Is this intentional?'],
          ['Предложение', 'I would suggest … · It might be cleaner to … · How about extracting this into a function?'],
          ['Проблема', 'This will fail if the list is empty. · This looks like an N+1 query. · I think there is a race condition here.'],
          ['Одобрение', 'LGTM (looks good to me) · Nice catch! · Great work, thanks!'],
          ['Ответ автора', 'Good point, fixed. · Done. · You are right, I missed that. · I disagree, because … · Let me check.'],
          ['Просьба о ревью', 'Could you take a look when you have time? · This is ready for review. · PTAL (please take a look).'],
        ] },
        { t: 'h3', text: 'Сообщение об ошибке (issue)' },
        { t: 'code', text: `Title: Login fails with 500 when the email contains uppercase letters

Steps to reproduce:
1. Register with "User@Example.com"
2. Log out
3. Try to log in with the same email

Expected behavior: the user is logged in.
Actual behavior: the server returns 500 Internal Server Error.

Environment: v1.4.2, Chrome 131, macOS 15
Logs: KeyError: 'user@example.com' in auth/service.py, line 42` },
        { t: 'h3', text: 'Сообщения в рабочем чате' },
        { t: 'table', caption: 'Готовые фразы', headers: ['Что сказать', 'Как'], rows: [
          ['Сообщить о статусе', 'I am working on … · I have finished … · I am blocked by … · It is in review.'],
          ['Попросить помощи', 'Could you help me with … ? · I am stuck on … · Does anyone know how to … ?'],
          ['Уточнить', 'Just to clarify: do you mean … ? · Could you give me more details? · What is the deadline?'],
          ['Сообщить о проблеме', 'I found an issue with … · The build is failing because … · Heads-up: the staging server is down.'],
          ['Пообещать', 'I will look into it. · I will get back to you by tomorrow. · Let me check and come back.'],
          ['Извиниться и поблагодарить', 'Sorry for the late reply. · Thanks for the quick response! · Thanks for your help.'],
          ['Перенести', 'Could we reschedule? · I will not be able to join today. · I am out of office until Monday.'],
        ] },
        { t: 'table', caption: 'Сокращения из переписки', headers: ['Сокращение', 'Расшифровка', 'Смысл'], rows: [
          ['LGTM', 'looks good to me', 'одобряю'],
          ['PTAL', 'please take a look', 'посмотри, пожалуйста'],
          ['WIP', 'work in progress', 'в работе, не готово'],
          ['ASAP', 'as soon as possible', 'как можно скорее'],
          ['FYI', 'for your information', 'к сведению'],
          ['AFAIK', 'as far as I know', 'насколько я знаю'],
          ['IMO, IMHO', 'in my (humble) opinion', 'по моему мнению'],
          ['TBD', 'to be determined', 'будет определено позже'],
          ['ETA', 'estimated time of arrival', 'ожидаемый срок'],
          ['OOO', 'out of office', 'не на работе'],
          ['TL;DR', 'too long; didn\'t read', 'краткая суть'],
          ['N/A', 'not applicable', 'неприменимо'],
          ['RTFM', 'read the manual', 'прочти документацию'],
        ] },
      ],
    },
    {
      id: 'pronunciation', title: 'Произношение терминов и символы',
      blocks: [
        { t: 'p', text: 'Неправильное ударение в термине не катастрофа, но на собеседовании и созвоне уверенное произношение добавляет очков. В таблице — слова, в которых ошибаются чаще всего; транскрипция дана русскими буквами приблизительно, ударный слог выделен прописными.' },
        { t: 'table', caption: 'Как это читается', headers: ['Слово', 'Произношение', 'Частая ошибка'], rows: [
          ['cache', 'КЭШ', '«кэйч», «каше»'],
          ['queue', 'КЬЮ', '«куеуе», «квеве»'],
          ['query', 'КВИ-ри', '«кьюри»'],
          ['schema', 'СКИ-ма', '«шема»'],
          ['suite (test suite)', 'СВИТ', '«сьют» — это suit, костюм'],
          ['height / width', 'ХАЙТ / УИДТ', '«хейт»'],
          ['key / value', 'КИ / ВЭ-лью', '«кей»'],
          ['variable', 'ВЭ-ри-эбл', '«вариабл»'],
          ['integer', 'ИН-ти-джер', '«интегер»'],
          ['char', 'ЧАР (или КАР — от character)', '—'],
          ['null', 'НАЛ', '«нуль»'],
          ['boolean', 'БУ-ли-эн', '—'],
          ['async', 'ЭЙ-синк', '«асинк»'],
          ['hierarchy', 'ХАЙ-э-рар-ки', '«иерархи»'],
          ['algorithm', 'ЭЛ-го-ри-зэм', '—'],
          ['parameter', 'пэ-РЭ-ми-тэр', 'ударение на первый слог'],
          ['architecture', 'АР-ки-тек-чер', '«арчитекче»'],
          ['authentication', 'о-сэн-ти-КЭЙ-шн', '—'],
          ['Linux', 'ЛИ-нукс', '«лайнакс» встречается, но автор говорит «линукс»'],
          ['nginx', 'ЭН-джин-икс (engine x)', '«нгинкс»'],
          ['SQL', 'ЭС-КЬЮ-ЭЛ или СИ-квэл', '—'],
          ['GUI', 'ГУ-и', '—'],
          ['JSON', 'ДЖЕЙ-сон', '—'],
          ['YAML', 'ЯМЛ (рифмуется с camel)', '—'],
          ['regex', 'РЕ-гекс или РЕ-джекс', '—'],
          ['daemon', 'ДИ-мон', '«даемон»'],
          ['sudo', 'СУ-ду', '—'],
          ['Kubernetes', 'ку-бер-НЕ-тис', '—'],
          ['PostgreSQL', 'ПОСТ-грес-кью-эл', '—'],
          ['epoch', 'Э-пок или И-пок', '«эпоч»'],
        ] },
        { t: 'h3', text: 'Символы: как продиктовать код' },
        { t: 'table', caption: 'Названия символов', headers: ['Символ', 'Название', 'Символ', 'Название'], rows: [
          ['( )', 'parentheses, round brackets', '[ ]', 'square brackets'],
          ['{ }', 'curly braces, braces', '< >', 'angle brackets'],
          ['.', 'dot (в адресах), period', ',', 'comma'],
          [':', 'colon', ';', 'semicolon'],
          ['_', 'underscore', '-', 'hyphen, dash'],
          ['/', 'slash, forward slash', '\\', 'backslash'],
          ['#', 'hash, pound', '@', 'at'],
          ['*', 'asterisk, star', '&', 'ampersand'],
          ['|', 'pipe, vertical bar', '~', 'tilde'],
          ['\'', 'single quote, apostrophe', '"', 'double quote'],
          ['`', 'backtick', '^', 'caret'],
          ['=', 'equals sign', '==', 'double equals'],
          ['!', 'exclamation mark, bang', '?', 'question mark'],
          ['%', 'percent sign', '$', 'dollar sign'],
        ] },
        { t: 'p', text: 'Как читают: `user_name` — «user underscore name»; `app.py` — «app dot py»; `https://` — «h-t-t-p-s colon slash slash»; `a[0]` — «a sub zero» или «a at index zero»; `x += 1` — «x plus equals one»; `2.5` — «two point five»; `3.12` (версия) — «three point twelve».' },
      ],
    },
    {
      id: 'interview', title: 'Собеседование и рассказ о себе на английском',
      blocks: [
        { t: 'p', text: 'Даже в российских компаниях иногда просят рассказать о себе по-английски — это быстрая проверка уровня. Подготовленный рассказ на полторы минуты закрывает этот вопрос. Структура та же, что в главе «Как рассказать о себе»: настоящее → прошлое → будущее.' },
        { t: 'h3', text: 'Шаблон рассказа' },
        { t: 'code', text: `Hi, my name is Ivan. I am a junior backend developer, and I mostly work with Python.

Over the last six months I have built two projects. The first one is an expense tracker
with a Telegram bot. I designed the REST API with FastAPI, used PostgreSQL as the database,
and set up Docker so that the whole project starts with a single command. While working on it,
I learned how to find slow queries: I reduced the response time of one endpoint from 800 to 60
milliseconds by fixing an N+1 problem.

The second one was a team project at an IT camp, where I was responsible for authentication
and wrote tests for it.

Now I am looking for an internship where I can work with experienced developers and get
feedback through code review. I am especially interested in backend services under high load.` },
        { t: 'h3', text: 'Конструктор фраз' },
        { t: 'table', caption: 'Из чего собрать свой рассказ', headers: ['Что сказать', 'Фразы'], rows: [
          ['Кто ты', 'I am a junior … developer / ML engineer / security analyst. · I am a third-year student at … · I am currently studying … · I am switching careers from … to …'],
          ['Что умеешь', 'I mostly work with … · I am comfortable with … · I have experience with … · I am familiar with … (знаком, но не глубоко)'],
          ['Проекты', 'I built … · I developed … · I was responsible for … · I worked on … · The project is a … that helps users …'],
          ['Результат', 'I reduced … from … to … · I improved … by … percent · I covered … with tests · As a result, …'],
          ['Чему научился', 'While working on it, I learned how to … · The most challenging part was … · I solved it by …'],
          ['Чего хочешь', 'I am looking for … · I would like to grow as a … · I am interested in … because …'],
        ] },
        { t: 'h3', text: 'Частые вопросы' },
        { t: 'table', caption: 'Вопрос и начало ответа', headers: ['Вопрос', 'Как начать ответ'], rows: [
          ['Tell me about yourself.', 'Sure. I am a …'],
          ['Why do you want to work here?', 'I have been using your product for …, and I am interested in …'],
          ['What are your strengths?', 'I would say my main strength is … For example, …'],
          ['What are your weaknesses?', 'I sometimes … To deal with it, I …'],
          ['Tell me about a challenging project.', 'One of the most challenging tasks was … The problem was … I decided to … As a result, …'],
          ['Tell me about a time you made a mistake.', 'Once I … I realized that … Since then, I always …'],
          ['Where do you see yourself in three years?', 'I see myself as a confident developer who can …'],
          ['What are your salary expectations?', 'Based on my research, I am looking for something in the range of …'],
          ['Do you have any questions for us?', 'Yes. What does a typical day look like for an intern? · Will I have a mentor? · What is the tech stack?'],
        ] },
        { t: 'h3', text: 'Фразы-спасатели' },
        { t: 'table', caption: 'Когда не понял или не знаешь', headers: ['Ситуация', 'Что сказать'], rows: [
          ['Не расслышал', 'Sorry, could you repeat that, please? · Could you say that again a bit slower?'],
          ['Не понял вопрос', 'I am not sure I understood the question. Do you mean … ? · Could you rephrase that?'],
          ['Нужно подумать', 'That is a good question. Let me think for a moment. · Give me a second, please.'],
          ['Не знаешь ответа', 'I have not worked with that yet, but I would approach it like this: … · I am not sure, but my guess is …'],
          ['Забыл слово', 'I forgot the word — the thing that … · How do you call it when … ?'],
          ['Уточнить задачу', 'Just to make sure I understand: … · Can I assume that … ? · What should happen if the input is empty?'],
          ['Объяснить ход мысли', 'First, I would … Then … Finally … · The idea is to … · The time complexity is O of n.'],
        ] },
        { t: 'note', text: 'Говори медленнее, чем хочется, и короткими предложениями. Простая грамматика без ошибок производит лучшее впечатление, чем сложная с ошибками. Акцент не проблема — проблема, когда тебя не понимают или когда ты молчишь.' },
      ],
    },
    {
      id: 'meetings', title: 'Созвоны: фразы для встреч',
      blocks: [
        { t: 'table', caption: 'Ежедневная встреча (daily, stand-up)', headers: ['Что сказать', 'Как'], rows: [
          ['Что сделал', 'Yesterday I finished … · I worked on … · I fixed the bug with …'],
          ['Что делаешь', 'Today I am going to … · I am still working on … · I will start …'],
          ['Что мешает', 'I am blocked by … · I am waiting for … · I need help with … · No blockers.'],
        ] },
        { t: 'table', caption: 'На любой встрече', headers: ['Ситуация', 'Фразы'], rows: [
          ['Начало', 'Can you hear me? · Can you see my screen? · Let me share my screen. · Shall we start?'],
          ['Технические проблемы', 'You are on mute. · You are breaking up. · I lost you for a second. · My connection is unstable.'],
          ['Высказать мнение', 'I think … · In my opinion … · From my point of view … · It seems to me that …'],
          ['Согласиться', 'I agree. · That makes sense. · Good point. · Exactly.'],
          ['Возразить вежливо', 'I see your point, but … · I am not sure about that. · What if we … instead?'],
          ['Перебить', 'Sorry to interrupt, but … · Can I add something? · May I ask a question?'],
          ['Попросить пояснить', 'Could you elaborate on that? · What do you mean by … ? · Could you give an example?'],
          ['Подвести итог', 'So, to sum up: … · Let me recap. · The next steps are … · I will take this one.'],
          ['Закончить', 'I think that is all from my side. · Thanks, everyone. · Talk to you later.'],
        ] },
        { t: 'table', caption: 'Слова из рабочих процессов', headers: ['Слово', 'Смысл', 'Слово', 'Смысл'], rows: [
          ['sprint', 'короткий цикл работы команды', 'backlog', 'список задач на будущее'],
          ['stand-up, daily', 'ежедневная короткая встреча', 'retro (retrospective)', 'разбор прошедшего цикла'],
          ['estimate', 'оценка трудоёмкости', 'deadline', 'крайний срок'],
          ['to assign, assignee', 'назначить, исполнитель', 'stakeholder', 'заинтересованное лицо'],
          ['on-call', 'дежурство', 'post-mortem', 'разбор инцидента'],
          ['onboarding', 'ввод нового сотрудника', 'one-on-one (1:1)', 'личная встреча с руководителем'],
          ['to ship', 'выпустить в продакшен', 'follow-up', 'продолжение, следующий шаг'],
        ] },
      ],
    },
    {
      id: 'plan', title: 'Как учить: план и ресурсы',
      blocks: [
        { t: 'p', text: 'Английский не выучивается рывком за выходные. Работает только регулярность: 20–30 минут каждый день дают больше, чем три часа раз в неделю. И лучше всего он учится не отдельно, а внутри основной учёбы.' },
        { t: 'h3', text: 'Встрой английский в то, что уже делаешь' },
        { t: 'ul', items: [
          '**Переключи интерфейсы** на английский: операционную систему, редактор кода, GitHub, браузер.',
          '**Читай документацию в оригинале.** Сначала медленно, с пятью выписанными словами за сеанс.',
          '**Ищи ошибки на английском** — и читай ответы, а не только копируй код.',
          '**Пиши коммиты и README на английском.** Это ежедневная практика письма без дополнительных усилий.',
          '**Смотри технические видео** с английскими субтитрами, затем без них. Скорость можно снизить до 0,75.',
          '**Называй переменные и функции по-английски** осмысленно: это тоже словарь.',
          '**Формулируй вопросы ИИ-ассистенту по-английски** и проси исправить ошибки в твоём тексте с объяснением.',
        ] },
        { t: 'h3', text: 'Как запоминать слова' },
        { t: 'ul', items: [
          'Выписывай слово **с предложением**, в котором встретил его, а не отдельно с переводом.',
          'Используй **интервальные повторения**: карточки в Anki или аналогах. Десять новых карточек в день — это 300 слов в месяц.',
          'Учи слова **группами по теме**: всё про базы данных, всё про Git.',
          'Слово считается выученным, когда ты употребил его сам — в коммите, сообщении, рассказе о проекте.',
          'Не учи редкие слова. Если слово встретилось один раз за месяц — оно тебе не нужно.',
        ] },
        { t: 'h3', text: 'План на двенадцать недель' },
        { t: 'table', caption: 'По 20–30 минут в день', headers: ['Недели', 'Цель', 'Что делать'], rows: [
          ['1–2', 'привыкнуть к английскому вокруг', 'перевести интерфейсы; выучить словарь из разделов «общие термины» и своего направления; читать сообщения об ошибках без переводчика'],
          ['3–4', 'читать документацию', 'прочитать раздел Getting Started и Tutorial одной своей библиотеки целиком в оригинале; завести карточки'],
          ['5–6', 'писать по шаблонам', 'все коммиты — на английском в повелительном наклонении; написать README своего проекта и описание одного pull request'],
          ['7–8', 'понимать на слух', 'три технических видео в неделю с субтитрами; выписывать фразы докладчика'],
          ['9–10', 'говорить о себе', 'написать и отрепетировать рассказ о себе и о проекте; записать на диктофон, исправить, повторить'],
          ['11–12', 'пробное собеседование', 'ответить вслух на частые вопросы; провести созвон на английском с другим участником лагеря'],
        ] },
        { t: 'h3', text: 'Ресурсы' },
        { t: 'reading', label: 'Чем пользоваться', items: [
          { title: 'Cambridge Dictionary — словарь с произношением и примерами', url: 'https://dictionary.cambridge.org' },
          { title: 'YouGlish — как слово произносят в реальных видео', url: 'https://youglish.com' },
          { title: 'Anki — карточки с интервальными повторениями', url: 'https://apps.ankiweb.net' },
          { title: 'Google Technical Writing — бесплатный курс о ясных технических текстах', url: 'https://developers.google.com/tech-writing' },
          { title: 'MDN Web Docs — образцово написанная документация для чтения', url: 'https://developer.mozilla.org/en-US/' },
          { title: 'How to Write a Git Commit Message', url: 'https://cbea.ms/git-commit/' },
          { title: 'BBC Learning English — общий английский: грамматика и аудирование', url: 'https://www.bbc.co.uk/learningenglish' },
        ] },
        { t: 'note', text: 'Главный принцип: английский — не цель, а побочный результат работы. Каждый раз, когда ты читаешь документацию в оригинале, пишешь коммит или ищешь ошибку на английском, ты занимаешься английским. За три месяца лагеря таких случаев наберётся несколько сотен — этого достаточно, чтобы перестать его бояться.' },
      ],
    },
  ],
}
