// Генератор базы для SQL-тренажёра: маркетплейс «KIRO Market».
// Данные похожи на боевые — пропуски (NULL), разнобой форматов, мягкое
// удаление, отменённые и возвращённые заказы. Генерация детерминированная
// (фиксированное зерно), поэтому эталонные ответы заданий всегда одинаковы.
// Размер подобран так, чтобы база была настоящей (~60 тыс. строк, ~6 МБ),
// но запросы к ней выполнялись за миллисекунды.

const fs = require('fs')
const Database = require('better-sqlite3')

// Версия данных: поменял генератор — увеличь, и база пересоздастся
const DATA_VERSION = 1

function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function generate(file) {
  const rnd = mulberry32(20261004)
  const int = (a, b) => a + Math.floor(rnd() * (b - a + 1))
  const chance = (p) => rnd() < p
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)]
  const weighted = (pairs) => {
    const total = pairs.reduce((s, [, w]) => s + w, 0)
    let r = rnd() * total
    for (const [v, w] of pairs) { if ((r -= w) <= 0) return v }
    return pairs[pairs.length - 1][0]
  }
  const pad = (n, w = 2) => String(n).padStart(w, '0')
  const T0 = Date.UTC(2021, 0, 1)
  const T1 = Date.UTC(2026, 8, 30)
  const stamp = (ms) => new Date(ms).toISOString().replace('T', ' ').slice(0, 19)
  const day = (ms) => new Date(ms).toISOString().slice(0, 10)
  const money = (v) => Math.round(v * 100) / 100

  const tmp = `${file}.tmp`
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp)
  const db = new Database(tmp)
  db.pragma('journal_mode = DELETE')
  // Позиции пишутся раньше своего заказа; связи генератор держит сам
  db.pragma('foreign_keys = OFF')
  db.exec('BEGIN')

  db.exec(`
    CREATE TABLE meta (key TEXT PRIMARY KEY, value TEXT);

    CREATE TABLE categories (
      id          INTEGER PRIMARY KEY,
      parent_id   INTEGER REFERENCES categories(id),
      name        TEXT    NOT NULL,
      slug        TEXT    NOT NULL UNIQUE,
      is_active   INTEGER NOT NULL DEFAULT 1,
      sort_order  INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL
    );

    CREATE TABLE customers (
      id                INTEGER PRIMARY KEY,
      email             TEXT    NOT NULL UNIQUE,
      phone             TEXT,
      first_name        TEXT    NOT NULL,
      last_name         TEXT,
      gender            TEXT,
      birth_date        TEXT,
      city              TEXT,
      registered_at     TEXT    NOT NULL,
      last_login_at     TEXT,
      is_verified       INTEGER NOT NULL DEFAULT 0,
      loyalty_points    INTEGER NOT NULL DEFAULT 0,
      marketing_consent INTEGER NOT NULL DEFAULT 0,
      deleted_at        TEXT
    );

    CREATE TABLE products (
      id             INTEGER PRIMARY KEY,
      sku            TEXT    NOT NULL UNIQUE,
      name           TEXT    NOT NULL,
      brand          TEXT,
      category_id    INTEGER NOT NULL REFERENCES categories(id),
      price          REAL    NOT NULL,
      old_price      REAL,
      stock          INTEGER NOT NULL DEFAULT 0,
      rating         REAL,
      reviews_count  INTEGER NOT NULL DEFAULT 0,
      weight_grams   INTEGER,
      is_active      INTEGER NOT NULL DEFAULT 1,
      created_at     TEXT    NOT NULL,
      updated_at     TEXT
    );

    CREATE TABLE orders (
      id               INTEGER PRIMARY KEY,
      customer_id      INTEGER NOT NULL REFERENCES customers(id),
      status           TEXT    NOT NULL,
      payment_method   TEXT,
      promo_code       TEXT,
      delivery_type    TEXT    NOT NULL,
      delivery_city    TEXT,
      items_count      INTEGER NOT NULL,
      subtotal         REAL    NOT NULL,
      discount_amount  REAL    NOT NULL DEFAULT 0,
      delivery_price   REAL    NOT NULL DEFAULT 0,
      total_amount     REAL    NOT NULL,
      comment          TEXT,
      created_at       TEXT    NOT NULL,
      paid_at          TEXT,
      delivered_at     TEXT
    );

    CREATE TABLE order_items (
      id          INTEGER PRIMARY KEY,
      order_id    INTEGER NOT NULL REFERENCES orders(id),
      product_id  INTEGER NOT NULL REFERENCES products(id),
      quantity    INTEGER NOT NULL,
      unit_price  REAL    NOT NULL
    );
  `)

  // ── Категории: 10 разделов и подкатегории ──
  // [название, slug, [подкатегория, slug, мин. цена, макс. цена, бренды, шаблоны названий]]
  const TREE = [
    ['Электроника', 'electronics', [
      ['Смартфоны', 'smartphones', 9990, 189990, ['Apple', 'Samsung', 'Xiaomi', 'HONOR', 'realme', 'Google'], ['@Apple:Смартфон Apple iPhone 15', '@Apple:Смартфон Apple iPhone 14', '@Samsung:Смартфон Samsung Galaxy S24', '@Samsung:Смартфон Samsung Galaxy A55', '@Xiaomi:Смартфон Xiaomi Redmi Note 13', '@Xiaomi:Смартфон Xiaomi 14T', '@HONOR:Смартфон HONOR 90', '@realme:Смартфон realme 12 Pro', '@Google:Смартфон Google Pixel 8']],
      ['Ноутбуки', 'laptops', 34990, 349990, ['Apple', 'ASUS', 'Lenovo', 'HUAWEI', 'MSI', 'Acer'], ['@Apple:Ноутбук Apple MacBook Air 13', '@ASUS:Ноутбук ASUS VivoBook 15', '@Lenovo:Ноутбук Lenovo IdeaPad Slim 5', '@HUAWEI:Ноутбук HUAWEI MateBook D16', '@MSI:Ноутбук MSI Katana 15', '@Acer:Ноутбук Acer Aspire 7']],
      ['Наушники', 'headphones', 990, 49990, ['Apple', 'Sony', 'JBL', 'Samsung', 'Marshall', null], ['@Apple:Наушники Apple AirPods Pro', '@Sony:Наушники Sony WH-1000XM5', '@JBL:Наушники JBL Tune 520BT', '@Samsung:Наушники Samsung Galaxy Buds FE', '@Marshall:Наушники Marshall Major IV', 'Беспроводные наушники {b}', 'Беспроводные наушники {b}']],
      ['Планшеты', 'tablets', 12990, 159990, ['Apple', 'Samsung', 'Xiaomi', 'HUAWEI'], ['@Apple:Планшет Apple iPad 10.9', '@Samsung:Планшет Samsung Galaxy Tab S9', '@Xiaomi:Планшет Xiaomi Pad 6', '@HUAWEI:Планшет HUAWEI MatePad 11']],
      ['Умные часы', 'smartwatches', 2490, 79990, ['Apple', 'Samsung', 'Amazfit', 'HUAWEI', 'Xiaomi'], ['@Apple:Умные часы Apple Watch Series 9', '@Samsung:Умные часы Samsung Galaxy Watch6', '@Amazfit:Умные часы Amazfit GTR 4', '@HUAWEI:Умные часы HUAWEI Watch GT 4', '@Xiaomi:Фитнес-браслет Xiaomi Smart Band 8']],
      ['Телевизоры', 'tv', 14990, 249990, ['Samsung', 'LG', 'Xiaomi', 'Haier', 'Sber'], ['Телевизор {b} 55" 4K', 'Телевизор {b} 43" Smart TV', 'Телевизор {b} 65" QLED', 'Телевизор {b} 32" HD']],
    ]],
    ['Бытовая техника', 'appliances', [
      ['Пылесосы', 'vacuums', 3990, 89990, ['Dyson', 'Xiaomi', 'Philips', 'Tefal', 'Kitfort'], ['Робот-пылесос {b}', '@Dyson:Пылесос Dyson V15 Detect', 'Вертикальный пылесос {b}', 'Пылесос {b} с контейнером']],
      ['Холодильники', 'fridges', 24990, 199990, ['Bosch', 'LG', 'Haier', 'ATLANT', 'Samsung'], ['Холодильник {b} No Frost', 'Холодильник {b} двухкамерный', 'Холодильник {b} Side-by-Side']],
      ['Кофемашины', 'coffee', 4990, 119990, ['DeLonghi', 'Philips', 'Krups', 'Nivona'], ['@DeLonghi:Кофемашина DeLonghi Magnifica S', '@Philips:Кофемашина Philips LatteGo 3200', 'Капельная кофеварка {b}', 'Кофемашина {b} автоматическая']],
      ['Мелкая техника', 'small-appliances', 790, 19990, ['Tefal', 'Redmond', 'Bosch', 'Polaris', null], ['Чайник {b} стеклянный', 'Блендер {b}', 'Мультиварка {b}', 'Тостер {b}', 'Утюг {b}']],
    ]],
    ['Одежда и обувь', 'fashion', [
      ['Кроссовки', 'sneakers', 2990, 24990, ['Nike', 'adidas', 'New Balance', 'PUMA', 'Reebok'], ['@Nike:Кроссовки Nike Air Max 90', '@adidas:Кроссовки adidas Ultraboost', '@New Balance:Кроссовки New Balance 574', '@PUMA:Кроссовки PUMA Suede', '@Reebok:Кроссовки Reebok Club C']],
      ['Куртки', 'jackets', 3990, 39990, ['The North Face', 'Columbia', 'Zara', 'Finn Flare', null], ['Куртка {b} пуховая', 'Ветровка {b}', 'Парка {b} зимняя']],
      ['Футболки', 'tshirts', 490, 4990, ['Uniqlo', 'Zara', 'H&M', 'Befree', null], ['Футболка {b} базовая', 'Футболка {b} оверсайз', 'Лонгслив {b}']],
    ]],
    ['Дом и сад', 'home', [
      ['Посуда', 'cookware', 290, 14990, ['Tefal', 'IKEA', 'Rondell', 'Luminarc', null], ['Сковорода {b} 28 см', 'Набор кастрюль {b}', 'Набор тарелок {b}', 'Кружка {b}']],
      ['Текстиль', 'textile', 390, 9990, ['IKEA', 'Togas', 'Cleanelly', null], ['Постельное бельё {b} евро', 'Плед {b}', 'Полотенце {b} махровое']],
      ['Инструменты', 'tools', 590, 29990, ['Bosch', 'Makita', 'DeWALT', 'Зубр'], ['Дрель-шуруповёрт {b}', 'Набор отвёрток {b}', 'Перфоратор {b}', 'Лобзик {b}']],
    ]],
    ['Красота и здоровье', 'beauty', [
      ['Уход за кожей', 'skincare', 190, 7990, ['La Roche-Posay', 'CeraVe', 'Bioderma', 'Natura Siberica', null], ['Крем {b} увлажняющий', 'Сыворотка {b}', 'Пенка для умывания {b}', 'Мицеллярная вода {b}']],
      ['Парфюмерия', 'perfume', 1490, 29990, ['Chanel', 'Dior', 'Zara', 'Lancôme'], ['Туалетная вода {b}', 'Парфюмерная вода {b}']],
      ['Витамины', 'vitamins', 190, 3990, ['Solgar', 'Эвалар', 'NOW Foods', null], ['Витамин D3 {b}', 'Омега-3 {b}', 'Магний B6 {b}']],
    ]],
    ['Спорт и отдых', 'sport', [
      ['Тренажёры', 'fitness', 990, 149990, ['Torneo', 'Oxygen', 'Kettler', null], ['Беговая дорожка {b}', 'Велотренажёр {b}', 'Гантели {b} 2×5 кг', 'Коврик для йоги {b}']],
      ['Велосипеды', 'bikes', 9990, 129990, ['Stels', 'Merida', 'Forward', 'Format'], ['Велосипед {b} горный', 'Велосипед {b} городской', 'Электровелосипед {b}']],
      ['Туризм', 'camping', 490, 49990, ['Tramp', 'Outventure', 'Nova Tour', null], ['Палатка {b} 3-местная', 'Рюкзак {b} 50 л', 'Спальный мешок {b}', 'Термос {b}']],
    ]],
    ['Детские товары', 'kids', [
      ['Игрушки', 'toys', 290, 19990, ['LEGO', 'Hasbro', 'Mattel', 'Мир деревянных игрушек', null], ['Конструктор {b} City', 'Настольная игра {b}', 'Кукла {b}', 'Пазл {b} 1000 деталей']],
      ['Подгузники', 'diapers', 790, 3990, ['Pampers', 'Huggies', 'Merries', 'YokoSun'], ['Подгузники {b} размер 3', 'Подгузники-трусики {b}']],
    ]],
    ['Продукты', 'grocery', [
      ['Кофе и чай', 'coffee-tea', 190, 3990, ['Lavazza', 'Jacobs', 'Greenfield', 'Ahmad Tea', null], ['Кофе {b} в зёрнах 1 кг', 'Кофе {b} молотый', 'Чай {b} чёрный 100 пак.']],
      ['Сладости', 'sweets', 59, 1990, ['Alpen Gold', 'Ritter Sport', 'Merci', 'Коркунов', null], ['Шоколад {b} молочный', 'Набор конфет {b}', 'Печенье {b}']],
    ]],
    ['Книги', 'books', [
      ['Программирование', 'programming-books', 590, 4990, ['Питер', 'БХВ', 'O\'Reilly', 'МИФ'], ['Изучаем Python', 'Грокаем алгоритмы', 'Чистый код', 'SQL для простых смертных', 'Высоконагруженные приложения']],
      ['Художественная литература', 'fiction', 290, 1990, ['АСТ', 'Эксмо', 'Азбука', null], ['Мастер и Маргарита', 'Преступление и наказание', '1984', 'Три товарища', 'Норвежский лес']],
    ]],
    ['Автотовары', 'auto', [
      ['Шины', 'tires', 3490, 39990, ['Michelin', 'Nokian', 'Pirelli', 'Cordiant'], ['Шина {b} зимняя R16', 'Шина {b} летняя R17', 'Шина {b} всесезонная R15']],
      ['Автоаксессуары', 'car-accessories', 290, 14990, ['70mai', 'Xiaomi', 'Baseus', null], ['Видеорегистратор {b}', 'Держатель телефона {b}', 'Автомобильный компрессор {b}']],
    ]],
  ]

  const insertCategory = db.prepare('INSERT INTO categories (id, parent_id, name, slug, is_active, sort_order, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)')
  // Варианты товара — только там, где они бывают в жизни
  const VARIANTS = {
    electronics: ['', '', '', ' 128 ГБ', ' 256 ГБ', ' черный', ' белый', ' (2024)', ' Pro', ' Lite'],
    appliances: ['', '', ' черный', ' белый', ' серый', ' (2024)'],
    fashion: ['', ' черный', ' белый', ' размер M', ' размер L', ' размер XL'],
    home: ['', '', ' серый', ' бежевый'],
    sport: ['', '', ' черный', ' синий'],
  }
  const subcats = []
  let catId = 1
  TREE.forEach(([name, slug, subs], i) => {
    const parentId = catId++
    insertCategory.run(parentId, null, name, slug, 1, (i + 1) * 10, stamp(T0 + int(0, 30) * 86400000))
    subs.forEach(([subName, subSlug, minP, maxP, brands, templates], j) => {
      const id = catId++
      // Пара подкатегорий скрыта — как бывает в живом каталоге
      const active = subSlug === 'tires' || subSlug === 'perfume' ? 0 : 1
      insertCategory.run(id, parentId, subName, subSlug, active, (j + 1) * 10, stamp(T0 + int(0, 600) * 86400000))
      subcats.push({ id, minP, maxP, brands, templates, variants: VARIANTS[slug] || [''] })
    })
  })

  // ── Товары ──
  const insertProduct = db.prepare(`INSERT INTO products (id, sku, name, brand, category_id, price, old_price, stock, rating, reviews_count, weight_grams, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const products = []
  const usedSku = new Set()
  for (let id = 1; id <= 1200; id++) {
    const cat = subcats[Math.floor(rnd() * subcats.length)]
    // «@Бренд:Название» — модель конкретного бренда, иначе бренд подставляется в {b}
    const template = pick(cat.templates)
    let brand
    let base
    if (template.startsWith('@')) {
      const colon = template.indexOf(':')
      brand = template.slice(1, colon)
      base = template.slice(colon + 1)
    } else {
      brand = pick(cat.brands)
      base = template.replace('{b}', brand || '')
    }
    const name = (base.replace(/\s+/g, ' ').trim() + pick(cat.variants)).trim()
    // Цена: чаще ближе к нижней границе, «красивые» окончания
    const raw = cat.minP + (cat.maxP - cat.minP) * Math.pow(rnd(), 2.2)
    const price = money(Math.max(cat.minP, Math.round(raw / 10) * 10 - pick([0, 0, 10, 1, 0.1])))
    const oldPrice = chance(0.3) ? money(Math.round(price * (1.1 + rnd() * 0.35) / 10) * 10 - 10) : null
    let sku
    do { sku = `KM-${pad(int(100000, 999999), 6)}` } while (usedSku.has(sku))
    usedSku.add(sku)
    const reviews = chance(0.25) ? 0 : Math.floor(Math.pow(rnd(), 3) * 2500)
    const rating = reviews === 0 ? null : money(Math.min(5, 3.2 + rnd() * 1.8))
    const created = T0 + int(0, 1700) * 86400000 + int(0, 86399) * 1000
    products.push({ id, price, active: chance(0.92) ? 1 : 0 })
    insertProduct.run(
      id, sku, name, brand, cat.id, price, oldPrice,
      chance(0.1) ? 0 : int(1, 450), rating, reviews,
      chance(0.15) ? null : int(50, 25000),
      products[products.length - 1].active,
      stamp(created), chance(0.3) ? null : stamp(Math.min(T1, created + int(1, 300) * 86400000)),
    )
  }

  // ── Покупатели ──
  const MALE = ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Иван', 'Михаил', 'Артём', 'Никита', 'Егор', 'Кирилл', 'Илья', 'Роман', 'Тимур', 'Павел', 'Денис', 'Владимир']
  const FEMALE = ['Анна', 'Мария', 'Елена', 'Ольга', 'Наталья', 'Екатерина', 'Анастасия', 'Татьяна', 'Ирина', 'Дарья', 'Полина', 'Алиса', 'Виктория', 'Ксения', 'София', 'Юлия', 'Вероника', 'Алина']
  const SURNAMES = ['Иванов', 'Смирнов', 'Кузнецов', 'Попов', 'Васильев', 'Петров', 'Соколов', 'Михайлов', 'Новиков', 'Фёдоров', 'Морозов', 'Волков', 'Алексеев', 'Лебедев', 'Семёнов', 'Егоров', 'Павлов', 'Козлов', 'Степанов', 'Николаев', 'Орлов', 'Андреев', 'Макаров', 'Захаров', 'Зайцев']
  const TRANSLIT = { а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya' }
  const tr = (s) => s.toLowerCase().split('').map(c => TRANSLIT[c] ?? c).join('')
  const CITIES = [['Москва', 30], ['Санкт-Петербург', 14], ['Новосибирск', 5], ['Екатеринбург', 5], ['Казань', 5], ['Нижний Новгород', 4], ['Краснодар', 4], ['Самара', 3], ['Ростов-на-Дону', 3], ['Уфа', 3], ['Воронеж', 3], ['Пермь', 3], ['Тюмень', 2], ['Владивосток', 2], ['Калининград', 2], ['Сочи', 2], ['Томск', 1], ['Иркутск', 1]]
  const DOMAINS = [['gmail.com', 30], ['yandex.ru', 28], ['mail.ru', 22], ['bk.ru', 5], ['icloud.com', 6], ['outlook.com', 4], ['rambler.ru', 3], ['inbox.ru', 2]]
  const phoneFormats = [
    (d) => `+7${d}`,
    (d) => `+7 (${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6, 8)}-${d.slice(8)}`,
    (d) => `8${d}`,
    (d) => `8 ${d.slice(0, 3)} ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8)}`,
  ]

  const insertCustomer = db.prepare(`INSERT INTO customers (id, email, phone, first_name, last_name, gender, birth_date, city, registered_at, last_login_at, is_verified, loyalty_points, marketing_consent, deleted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const customers = []
  const usedEmail = new Set()
  for (let id = 1; id <= 4000; id++) {
    const female = chance(0.52)
    const first = pick(female ? FEMALE : MALE)
    const surnameBase = pick(SURNAMES)
    const last = chance(0.11) ? null : (female ? `${surnameBase}а` : surnameBase)
    let email
    do {
      const local = pick([
        () => `${tr(first)}.${tr(surnameBase)}`,
        () => `${tr(first)}${int(1, 2005)}`,
        () => `${tr(first)[0]}${tr(surnameBase)}${int(1, 99)}`,
        () => `${tr(surnameBase)}_${tr(first)}`,
      ])()
      email = `${local}@${weighted(DOMAINS)}`
      // Часть адресов пользователи вводили с заглавными буквами
      if (chance(0.04)) email = email[0].toUpperCase() + email.slice(1)
    } while (usedEmail.has(email.toLowerCase()))
    usedEmail.add(email.toLowerCase())
    const digits = `9${pad(int(0, 99), 2)}${pad(int(0, 9999999), 7)}`
    const registered = T0 + Math.floor(Math.pow(rnd(), 0.8) * (T1 - T0))
    const city = chance(0.12) ? null : weighted(CITIES)
    customers.push({ id, city, registered })
    insertCustomer.run(
      id, email,
      chance(0.26) ? null : pick(phoneFormats)(digits),
      first, last,
      chance(0.32) ? null : (female ? 'f' : 'm'),
      chance(0.41) ? null : `${int(1960, 2008)}-${pad(int(1, 12))}-${pad(int(1, 28))}`,
      city,
      stamp(registered),
      chance(0.15) ? null : stamp(Math.min(T1, registered + Math.floor(rnd() * (T1 - registered)))),
      chance(0.7) ? 1 : 0,
      chance(0.35) ? 0 : int(10, 15000),
      chance(0.45) ? 1 : 0,
      chance(0.02) ? stamp(Math.min(T1, registered + int(30, 500) * 86400000)) : null,
    )
  }

  // ── Заказы и позиции ──
  const insertOrder = db.prepare(`INSERT INTO orders (id, customer_id, status, payment_method, promo_code, delivery_type, delivery_city, items_count, subtotal, discount_amount, delivery_price, total_amount, comment, created_at, paid_at, delivered_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
  const insertItem = db.prepare('INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?, ?)')
  const STATUSES = [['delivered', 56], ['cancelled', 10], ['shipped', 8], ['paid', 7], ['processing', 5], ['new', 5], ['returned', 4]]
  const PROMOS = ['WELCOME10', 'AUTUMN26', 'KIRO500', 'BLACKFRIDAY', 'FREESHIP', 'SALE15']
  const COMMENTS = ['Позвоните за час до доставки', 'Домофон не работает, наберите', 'Оставить у двери', 'Подарок, без чека', 'Доставка после 18:00', 'Код подъезда 1234К']
  const activeProducts = products.filter(p => p.active)
  let itemId = 1
  for (let id = 1; id <= 15000; id++) {
    const customer = customers[Math.floor(Math.pow(rnd(), 1.6) * customers.length)]
    const status = weighted(STATUSES)
    const created = customer.registered + Math.floor(rnd() * (T1 - customer.registered))
    const lines = weighted([[1, 45], [2, 28], [3, 14], [4, 8], [5, 5]])
    let subtotal = 0
    let count = 0
    const chosen = new Set()
    for (let k = 0; k < lines; k++) {
      const product = activeProducts[Math.floor(rnd() * activeProducts.length)]
      if (chosen.has(product.id)) continue
      chosen.add(product.id)
      const qty = product.price < 2000 ? weighted([[1, 60], [2, 25], [3, 10], [5, 5]]) : weighted([[1, 92], [2, 8]])
      insertItem.run(itemId++, id, product.id, qty, product.price)
      subtotal += product.price * qty
      count += qty
    }
    subtotal = money(subtotal)
    const promo = chance(0.14) ? pick(PROMOS) : null
    const discount = promo ? money(promo === 'KIRO500' ? Math.min(500, subtotal) : promo === 'FREESHIP' ? 0 : subtotal * (promo === 'SALE15' ? 0.15 : 0.1)) : 0
    const deliveryType = weighted([['pickup_point', 55], ['courier', 35], ['post', 10]])
    const deliveryPrice = promo === 'FREESHIP' || subtotal >= 3000 || deliveryType === 'pickup_point' ? 0 : (deliveryType === 'courier' ? 299 : 249)
    const unpaid = status === 'new' || (status === 'cancelled' && chance(0.6))
    const payment = unpaid ? (chance(0.5) ? null : weighted([['card', 60], ['sbp', 30], ['cash', 10]])) : weighted([['card', 55], ['sbp', 27], ['cash', 9], ['installments', 9]])
    const paidAt = unpaid || payment === 'cash' ? null : stamp(created + int(1, 3600) * 1000)
    const deliveredAt = status === 'delivered' || status === 'returned' ? stamp(Math.min(T1, created + int(1, 9) * 86400000 + int(0, 43200) * 1000)) : null
    insertOrder.run(
      id, customer.id, status, payment, promo, deliveryType,
      chance(0.05) ? null : (customer.city && chance(0.85) ? customer.city : weighted(CITIES)),
      count, subtotal, discount, deliveryPrice, money(subtotal - discount + deliveryPrice),
      chance(0.09) ? pick(COMMENTS) : null,
      stamp(created), paidAt, deliveredAt,
    )
  }

  db.exec(`
    CREATE INDEX idx_products_category ON products(category_id);
    CREATE INDEX idx_orders_customer ON orders(customer_id);
    CREATE INDEX idx_orders_status ON orders(status);
    CREATE INDEX idx_items_order ON order_items(order_id);
    CREATE INDEX idx_items_product ON order_items(product_id);
  `)
  db.prepare('INSERT INTO meta (key, value) VALUES (?, ?)').run('version', String(DATA_VERSION))
  db.exec('COMMIT')
  db.exec('VACUUM')
  db.close()
  fs.renameSync(tmp, file)
}

// Создаёт базу, если её нет или она старой версии
function ensureDatabase(file) {
  if (fs.existsSync(file)) {
    try {
      const db = new Database(file, { readonly: true })
      const row = db.prepare("SELECT value FROM meta WHERE key = 'version'").get()
      db.close()
      if (row && Number(row.value) === DATA_VERSION) return
    } catch { /* повреждена — пересоздаём */ }
    fs.unlinkSync(file)
  }
  generate(file)
}

module.exports = { ensureDatabase }
