# KIRO Platform — дизайн-система

KIRO Platform — закрытая образовательная платформа для тех, кто идёт в IT: лагеря, ликбезы, тренажёры. Весь продукт и все материалы вокруг него (баннеры, плашки для соцсетей, страницы) живут в одном тёмном мире: почти чёрный фон, один жёлтый акцент и плотный широкий гротеск Unbounded в заголовках.

## Главные правила

- Фон всегда тёмный: `bg-primary` для страницы и баннера, `bg-secondary` для карточек, `bg-tertiary` для вложенного внутри карточки. Светлой темы нет.
- Один акцент — `accent-lime` (жёлтый). Им выделяется одно главное на экране: активный пункт, главная кнопка, ключевое слово в заголовке, число. Если жёлтого больше трёх пятен — уберите лишние.
- Текст на жёлтом — только `on-accent` (почти чёрный), никогда не белый.
- Заголовки — `display` (Unbounded), всё остальное — `sans` (Manrope), код и время — `mono` (JetBrains Mono).
- Границы — одна линия 1px `border-color`. Тени только для глубины (`shadow-*`), никакого свечения.

## Голос и тексты

- Обращение на «ты», коротко и по делу: «Сдать дз», «Начать решать», «Продолжить · WHERE», «Записаться на личный созвон».
- Кнопка называет действие глаголом. Ошибка говорит, что не так и что сделать: «Решение пустое — вставь код и попробуй ещё раз».
- Нейтральный род: «Пока нет сданных задач», а не «ты не сдавал».
- Пишем по-русски, технические термины как в индустрии: Junior, Middle, SQL, JOIN.
- Даты и время — московские, с пометкой: «20:00 МСК».
- Эмодзи в интерфейсе почти не используются: допустим только 🍂 у осеннего лагеря и 💡/⚠️ в заметках внутри ликбезов. В баннерах эмодзи нет.

## Цвет

| Роль | Токен |
| --- | --- |
| Фон страницы, баннера | `bg-primary` |
| Карточка, сайдбар | `bg-secondary` |
| Вложенный блок, инпут | `bg-tertiary` |
| Основной текст | `text-primary` |
| Описание | `text-secondary` |
| Подпись, плейсхолдер | `text-tertiary` |
| Акцент, активное | `accent-lime` |
| Подложка акцента | `accent-dim` |
| Текст на жёлтом | `on-accent` |
| Успех / ошибка | `success` / `danger` (+ `-dim` подложки) |

- Активный пункт меню: фон `accent-dim`, текст `accent-lime`, вес 600.
- Статусы всегда с текстом: «принято» (`success`), «на проверке» (`math-blue`), «нужны правки» (`danger`).
- Осенний лагерь — отдельный тёплый оттенок: `autumn` с прозрачностью для подложек и обводок, `autumn-text` для текста. Больше нигде не используется.
- `math-blue` — второй информационный цвет (математика, SQL-прогресс). Не делайте его акцентом.
- Градиенты: только мягкое жёлтое свечение в углу баннера `radial-gradient(… rgba(255,214,10,0.10), transparent 60%)` и градиент пункта Autumn Camp. Других градиентов нет.

## Типографика

- `page-title` — заголовок страницы, `widget-title` — заголовок карточки, оба Unbounded 700.
- Текст интерфейса — `body` (14px), вводные абзацы — `body-lg` (15px).
- Метки над группами — `label`: 11px, 700, заглавными, разрядка 0.08em, цвет `text-tertiary`.
- Цифры в счётчиках и таблицах — `font-variant-numeric: tabular-nums`.
- Шрифты подключаются с Google Fonts: Unbounded 400/600/800/900, Manrope 400–800, JetBrains Mono 400–700.

## Форма и сетка

- Радиусы: `radius-sm` (8) для пунктов меню и строк, `radius-md` (13) для виджетов, инпутов и главной кнопки, `radius-xl` (20) для карточек на баннерах, `radius-pill` для бейджей, вторичных кнопок и сегментов.
- Виджет: `bg-secondary`, обводка `border-color`, `radius-md`, padding `space-widget` (18px), заголовок `widget-title`.
- Сетка страниц: отступы `space-page-y` × `space-page-x` (28 × 32), между виджетами `space-4` (16). На телефоне всё в одну колонку, поля 16px.
- Сайдбар `sidebar-width` (260), сворачивается до `sidebar-collapsed-width`.

## Состояния

- Hover primary-кнопки: фон `accent-soft`, подъём на 1px, `shadow-hover`.
- Hover ghost/outline: обводка и текст становятся `accent-lime`.
- Фокус инпута: обводка `accent-lime` и кольцо 3px `accent-dim`.
- Фокус с клавиатуры: сплошная обводка 2px `accent-lime` с отступом 2px.
- Анимации короткие (0.15–0.3s), с `prefers-reduced-motion` отключаются.

## Иконки

- Иконки — Lucide в виде inline SVG: обводка 2px, скруглённые концы, `currentColor`, размер 16–20px. Внутри жёлтого круга иконка рисуется цветом `on-accent`.
- Логотипа-картинки нет: знак — слово «KIRO PLATFORM» стилем `logo` (Unbounded 800, заглавными, `accent-lime`).

## Баннеры и плашки для соцсетей

Все графические материалы делаются как HTML в этих токенах и экспортируются в PNG с двойной плотностью (headless Chrome, `--force-device-scale-factor=2`).

- Форматы: 1600×800 (2:1) — основной; 1600×400 — короткий призыв.
- Композиция: поля `space-banner` (72px), вверху слева `logo`, внизу слева `kiroplatform.ru` (18px, `text-tertiary`), фон `bg-primary` с жёлтым свечением в правом верхнем углу.
- Заголовок — `banner-title` или `banner-hero`, одно ключевое слово или число выделено `accent-lime`. Переносы строк ставятся вручную, чтобы не оставалось одно слово на строке.
- Карточки с данными: `bg-secondary`, `radius-xl`, значения Unbounded 800 в `accent-lime`; самая важная карточка — сплошная жёлтая с текстом `on-accent`.
- Миф: жёлтый штамп «МИФ №N» с чёрным кругом и крестиком, наклон −2°; утверждение перечёркнуто линией `danger` 6px.
- Призыв к действию: крупная фраза и жёлтый круг 128px со стрелкой.

## Токены

### Цвета

| Токен | Значение | Где используется |
| --- | --- | --- |
| `bg-primary` | `#08080a` | Фон страницы (ink). Основа всех экранов и баннеров. |
| `bg-secondary` | `#101014` | Панели: карточки-виджеты, сайдбар, топбар. |
| `bg-tertiary` | `#17171d` | Вложенные блоки внутри панелей: инпуты, строки списков, неактивные сегменты. |
| `border-color` | `#26262e` | Обводка 1px у панелей, инпутов, разделители. Единственный цвет границ. |
| `text-primary` | `#f6f6f4` | Заголовки и основной текст на bg-primary, bg-secondary, bg-tertiary. |
| `text-secondary` | `#c2c2be` | Подзаголовки, описания, второстепенный текст на любом из трёх фонов. |
| `text-tertiary` | `#8b8b96` | Подписи, метки, плейсхолдеры, неактивные пункты. На bg-tertiary контраст ~5:1 — не мельче 11px. |
| `accent-lime` | `#ffd60a` | Фирменный жёлтый. Активные пункты, ссылки, выделенные слова в заголовках, фокус. Имя историческое — цвет жёлтый. |
| `accent-soft` | `#ffe873` | Hover для жёлтых кнопок. |
| `accent-dim` | `rgba(255,214,10,0.14)` | Полупрозрачная жёлтая подложка: активный пункт меню, бейджи, вторичная кнопка. |
| `accent-ink` | `#ffd60a` | Заливка primary-кнопок. |
| `on-accent` | `#08080a` | Текст и иконки на жёлтой заливке (accent-lime, accent-ink). |
| `success` | `#3fb950` | Успех: принято, решено, правильный ответ. Всегда с текстом — не только цветом. |
| `success-dim` | `rgba(63,185,80,0.12)` | Подложка успешных плашек. |
| `danger` | `#ff5f5f` | Ошибка, «нужны правки», удаление, зачёркивание мифа на баннерах. |
| `danger-dim` | `rgba(255,95,95,0.10)` | Подложка плашек ошибок. |
| `autumn` | `#ff8c42` | Осенний лагерь: обводки и подложки пункта Autumn Camp и табов месяцев (используется с прозрачностью 0.14–0.6). |
| `autumn-text` | `#ffb870` | Текст элементов осеннего лагеря на bg-secondary. |
| `math-blue` | `#8ab4ff` | Мини-курс математики и SQL в календаре и прогрессе; второй информационный цвет. |
| `badge-blue` | `#3d84e0` | Текст синего бейджа. На bg-primary ~5:1. |
| `badge-purple` | `#8358e8` | Текст фиолетового бейджа. Контраст на bg-primary ~4:1 — ниже нормы, оставлено как в коде. |
| `badge-orange` | `#d97a2c` | Текст оранжевого бейджа. |
| `badge-gray` | `#6b6b80` | Текст серого бейджа. Контраст на bg-primary ~3.7:1 — ниже нормы, оставлено как в коде; для нового текста берите text-tertiary. |
| `badge-green` | `#00966b` | Текст зелёного бейджа. Контраст ~4.5:1 на bg-primary. |

### Шрифты

- `display`: "Unbounded", system-ui, sans-serif
- `sans`: "Manrope", system-ui, sans-serif
- `mono`: "JetBrains Mono", ui-monospace, Monaco, Menlo, monospace

Подключение: `https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap`

| Стиль | Семейство | Размер / интерлиньяж | Вес | Разрядка | Где используется |
| --- | --- | --- | --- | --- | --- |
| `banner-hero` | display | 96px / 1.1 | 800 | -0.02em | Главная фраза баннера 1600×800 (60–96px по длине текста). |
| `banner-title` | display | 60px / 1.1 | 800 | -0.01em | Заголовок информационного баннера с карточками. |
| `page-title` | display | 28px / 34px | 700 | -0.3px | Заголовок страницы платформы. |
| `section-title` | display | 17px / 22px | 700 | — | Заголовки внутри страниц и крупных карточек. |
| `widget-title` | display | 14px / 18px | 700 | — | Заголовок виджета/карточки. |
| `logo` | display | 22px / 22px | 800 | 0.04em | Словесный знак: заглавными, accent-lime. |
| `body-lg` | sans | 15px / 24px | 400 | — | Вводные абзацы, текст ликбезов. |
| `body` | sans | 14px / 22px | 400 | — | Основной текст интерфейса. |
| `small` | sans | 13px / 20px | 500 | — | Пункты меню, кнопки вторичные, подписи. |
| `caption` | sans | 12px / 16px | 600 | — | Мета-информация, счётчики. |
| `label` | sans | 11px / 14px | 700 | 0.08em | Надписи-метки заглавными над группами и в бейджах. |
| `button` | sans | 15px / 20px | 700 | — | Текст primary-кнопки. |
| `code` | mono | 13px / 20px | 400 | — | Код, SQL, время в календаре. |

### Отступы

В коде нет шкалы отступов как переменных — это значения, которые реально повторяются в стилях.

| Токен | Значение | Где используется |
| --- | --- | --- |
| `space-1` | `4px` | Минимальный зазор: между пунктами меню (2–4px), иконкой и текстом. |
| `space-2` | `8px` | Зазор между кнопками и чипами. |
| `space-3` | `12px` | Внутренний отступ плотных строк, зазор в карточках. |
| `space-4` | `16px` | Gap сетки виджетов, отступ в баннерных карточках. |
| `space-widget` | `18px` | Padding виджета (.widget). |
| `space-6` | `24px` | Отступ под заголовком страницы. |
| `space-page-y` | `28px` | Вертикальный padding области страниц. |
| `space-page-x` | `32px` | Горизонтальный padding области страниц на десктопе (16px на телефоне). |
| `space-banner` | `72px` | Боковые поля баннеров 1600px. |

### Радиусы

| Токен | Значение | Где используется |
| --- | --- | --- |
| `radius-sm` | `8px` | Пункты меню, мелкие кнопки, строки списков. |
| `radius-md` | `13px` | Виджеты, инпуты, primary-кнопка, блоки кода. |
| `radius-lg` | `16px` | Крупные карточки. |
| `radius-xl` | `20px` | Карточки на баннерах, крупные плашки. |
| `radius-pill` | `999px` | Бейджи, outline/ghost-кнопки, табы-сегменты, метки. |

### Тени

| Токен | Значение | Где используется |
| --- | --- | --- |
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.4)` | Активный сегмент переключателя. |
| `shadow-md` | `0 6px 20px rgba(0,0,0,0.45)` | Всплывающие элементы, hover мелких кнопок. |
| `shadow-hover` | `0 12px 32px rgba(0,0,0,0.55)` | Hover primary-кнопки. На тёмном фоне тень даёт глубину, а не свечение. |

### Размеры

| Токен | Значение | Где используется |
| --- | --- | --- |
| `sidebar-width` | `260px` | Ширина сайдбара. |
| `sidebar-collapsed-width` | `56px` | Свёрнутый сайдбар. |
| `topbar-height` | `60px` | Мобильный топбар. |

### CSS-переменные

```css
:root {
  --bg-primary: #08080a;
  --bg-secondary: #101014;
  --bg-tertiary: #17171d;
  --border-color: #26262e;
  --text-primary: #f6f6f4;
  --text-secondary: #c2c2be;
  --text-tertiary: #8b8b96;
  --accent-lime: #ffd60a;
  --accent-soft: #ffe873;
  --accent-dim: rgba(255,214,10,0.14);
  --accent-ink: #ffd60a;
  --on-accent: #08080a;
  --success: #3fb950;
  --success-dim: rgba(63,185,80,0.12);
  --danger: #ff5f5f;
  --danger-dim: rgba(255,95,95,0.10);
  --autumn: #ff8c42;
  --autumn-text: #ffb870;
  --math-blue: #8ab4ff;
  --badge-blue: #3d84e0;
  --badge-purple: #8358e8;
  --badge-orange: #d97a2c;
  --badge-gray: #6b6b80;
  --badge-green: #00966b;
  --font-display: "Unbounded", system-ui, sans-serif;
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Monaco, Menlo, monospace;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-widget: 18px;
  --space-6: 24px;
  --space-page-y: 28px;
  --space-page-x: 32px;
  --space-banner: 72px;
  --radius-sm: 8px;
  --radius-md: 13px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-pill: 999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.4);
  --shadow-md: 0 6px 20px rgba(0,0,0,0.45);
  --shadow-hover: 0 12px 32px rgba(0,0,0,0.55);
  --sidebar-width: 260px;
  --sidebar-collapsed-width: 56px;
  --topbar-height: 60px;
}
```

## Компоненты

### Button

Кнопки платформы: одна главная жёлтая и две вторичные.

- `btn-primary` — одно главное действие экрана («Начать решать», «Сдать ДЗ»). Фон `accent-ink`, текст `on-accent`, `radius-md`.
- `btn-outline` — заметное вторичное действие, пилюля с жёлтой обводкой.
- `btn-ghost` — нейтральное действие («Отмена», «Следующий вопрос»).
- Текст — глагол действия. Не больше одной primary в блоке.

Пример разметки:

```html
<html><body>
<div class="k-row">
  <button class="btn-primary">Начать решать</button>
  <button class="btn-outline">Записаться на созвон</button>
  <button class="btn-ghost">Следующий вопрос</button>
</div>
```

### Badge

Бейдж — короткий статус или категория заглавными в пилюле.

- `badge--lime` — новое/выделенное, `badge--green` — принято, `badge--blue` — на проверке, `badge--red` — ошибка/правки, `badge--orange` — осенний лагерь.
- Одно-два слова. Цвет дублирует смысл текста, не заменяет его.

Пример разметки:

```html
<html><body>
<div class="k-row">
  <span class="badge badge--lime">Новое</span>
  <span class="badge badge--green">Принято</span>
  <span class="badge badge--blue">На проверке</span>
  <span class="badge badge--red">Нужны правки</span>
  <span class="badge badge--orange">Лагерь</span>
</div>
```

### Widget

Виджет — базовая карточка платформы: панель `bg-secondary` с обводкой `border-color` и `radius-md`.

- Заголовок `widget-title` слева, ссылка-действие `widget-link` справа.
- Внутри вложенные блоки — `bg-tertiary`. Карточки в сетке через gap `space-4`.

Пример разметки:

```html
<html><body>
<div style="padding:18px;max-width:420px">
  <div class="widget">
    <div class="widget-header"><span class="widget-title">SQL-тренажёр</span><span class="widget-link">Открыть →</span></div>
    <div style="display:flex;align-items:baseline;gap:6px;font:700 34px/1 var(--font-display)">4<span style="font-size:18px;color:var(--text-tertiary)">/90</span></div>
    <p style="margin:10px 0 0;font-size:13px;color:var(--text-secondary)">Решено 4% · осталось 86 задач</p>
  </div>
</div>
```

### Input

Текстовое поле с меткой над ним.

- Метка `form-label`: 12px заглавными, `text-secondary`.
- Поле: `bg-tertiary`, обводка `border-color`, `radius-md`. Фокус — обводка `accent-lime` и кольцо `accent-dim`; ошибка — обводка `danger`.
- Плейсхолдер — пример, а не инструкция: «Придумайте логин».

Пример разметки:

```html
<html><body>
<div style="padding:18px;display:grid;gap:14px;max-width:360px">
  <div><label class="form-label" for="i1">Логин</label><input id="i1" class="input" placeholder="Придумайте логин"></div>
  <div><label class="form-label" for="i2">Пароль</label><input id="i2" class="input is-focus" value="kiro-2026"></div>
  <div><label class="form-label" for="i3">Повтор пароля</label><input id="i3" class="input is-error" value="kiro-2025"></div>
</div>
```

### NavItem

Пункт бокового меню.

- Обычный: `text-secondary`, hover `bg-tertiary`. Активный: подложка жёлтая 10%, текст `accent-lime`, 600.
- Счётчик — `nav-badge` (жёлтый, справа).
- `nav-item--autumn` — особый пункт осеннего лагеря в тёплом `autumn`-градиенте, только для него.

Пример разметки:

```html
<html><body>
<div style="padding:10px;width:240px;background:var(--bg-secondary);display:grid;gap:2px">
  <button class="nav-item nav-item--autumn">🍂 Autumn Camp</button>
  <button class="nav-item active">Дэшборд</button>
  <button class="nav-item">Сообщения <span class="nav-badge">3</span></button>
  <button class="nav-item">Тренировки</button>
  <button class="nav-item">Полные ликбезы</button>
</div>
```

### SegmentTabs

Сегментированный переключатель режимов (таймер, вкладки ленты).

- Дорожка `bg-tertiary`, активный сегмент — `bg-secondary`, текст `accent-lime`, `shadow-sm`.
- 2–4 коротких варианта. Для навигации между страницами не используется.

Пример разметки:

```html
<html><body>
<div class="k-row">
  <div class="seg" role="tablist">
    <button class="seg-tab is-active" role="tab" aria-selected="true">Фокус 25</button>
    <button class="seg-tab" role="tab">Перерыв 5</button>
    <button class="seg-tab" role="tab">Фокус 50</button>
    <button class="seg-tab" role="tab">Своё</button>
  </div>
</div>
```

### Banner

Баннер для соцсетей 1600×800 (2:1) — здесь показан в масштабе 40% на примере «Миф №1».

- Фон `bg-primary` с жёлтым свечением справа сверху, поля `space-banner`, вверху `logo`, внизу `kiroplatform.ru`.
- Заголовок `banner-hero`/`banner-title`, ключевое слово или число — `accent-lime`.
- Варианты: информационный (карточки `bg-secondary` `radius-xl`, главная — жёлтая), миф (штамп + зачёркивание `danger`), призыв 1600×400 (фраза + жёлтый круг 128px со стрелкой).
- Экспорт в PNG с плотностью 2× через headless Chrome.

Пример разметки:

```html
<html><body>
<style>
.bn { width: 1600px; height: 800px; padding: 64px 72px; box-sizing: border-box; display: flex; flex-direction: column; justify-content: space-between;
  background: radial-gradient(900px 420px at 100% 0%, rgba(255,214,10,0.10), transparent 60%), var(--bg-primary); transform: scale(.4); transform-origin: 0 0; }
.bn-top { display: flex; justify-content: space-between; align-items: flex-start; }
.bn-logo { font: 800 22px/1 var(--font-display); letter-spacing: .04em; color: var(--accent-lime); padding-top: 8px; }
.bn-stamp { display: flex; align-items: center; gap: 28px; background: var(--accent-lime); color: var(--on-accent); padding: 22px 44px 22px 34px; border-radius: 24px; transform: rotate(-2deg); }
.bn-x { width: 84px; height: 84px; border-radius: 50%; background: var(--on-accent); display: grid; place-items: center; }
.bn-word { font: 900 112px/1 var(--font-display); }
.bn-num { font: 800 56px/1 var(--font-display); opacity: .85; }
.bn-h1 { font: 800 84px/1.12 var(--font-display); letter-spacing: -.02em; margin: 0; }
.bn-h1 mark { background: none; color: var(--accent-lime); }
.bn-s { position: relative; display: table; }
.bn-s::after { content: ""; position: absolute; left: -8px; right: -8px; top: 60%; height: 6px; border-radius: 3px; background: var(--danger); }
.bn-foot { font: 600 18px/1 var(--font-sans); color: var(--text-tertiary); }
</style>
<div class="bn">
  <div class="bn-top">
    <div class="bn-stamp"><div class="bn-x"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ffd60a" stroke-width="3.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></div><div class="bn-word">МИФ</div><div class="bn-num">№1</div></div>
    <div class="bn-logo">KIRO PLATFORM</div>
  </div>
  <h1 class="bn-h1"><span class="bn-s">После <mark>30</mark> идти</span><span class="bn-s">в айти поздно</span></h1>
  <div class="bn-foot">kiroplatform.ru</div>
</div>
```

### Стили компонентов

```css
@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
/* KIRO Platform — стили компонентов, перенесены из src/platform.css */
body { background: var(--bg-primary); color: var(--text-primary); font-family: var(--font-sans); margin: 0; line-height: 1.6; }
.k-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; padding: 18px; }

.btn-primary { display: inline-flex; align-items: center; justify-content: center; background: var(--accent-ink); color: var(--on-accent); font: 700 15px var(--font-sans); padding: 12px 26px; border-radius: var(--radius-md); border: none; cursor: pointer; transition: transform .2s, box-shadow .2s, background .2s; white-space: nowrap; }
.btn-primary:hover { transform: translateY(-1px); background: var(--accent-soft); box-shadow: var(--shadow-hover); }
.btn-outline { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: var(--accent-lime); font: 600 13px var(--font-sans); padding: 8px 18px; border-radius: var(--radius-pill); border: 1px solid rgba(255,214,10,0.4); cursor: pointer; }
.btn-outline:hover { background: rgba(255,214,10,0.08); }
.btn-ghost { display: inline-flex; align-items: center; gap: 6px; background: transparent; color: var(--text-secondary); font: 500 13px var(--font-sans); padding: 7px 16px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); cursor: pointer; }
.btn-ghost:hover { border-color: var(--accent-lime); color: var(--accent-lime); }
.btn-primary:focus-visible, .btn-outline:focus-visible, .btn-ghost:focus-visible, .nav-item:focus-visible, .seg-tab:focus-visible { outline: 2px solid var(--accent-lime); outline-offset: 2px; }

.badge { display: inline-flex; align-items: center; font: 700 11px var(--font-sans); padding: 3px 10px; border-radius: var(--radius-pill); text-transform: uppercase; letter-spacing: .04em; }
.badge--lime { background: rgba(255,214,10,0.12); color: var(--accent-lime); }
.badge--blue { background: rgba(110,181,255,0.15); color: var(--badge-blue); }
.badge--orange { background: rgba(255,159,80,0.18); color: var(--badge-orange); }
.badge--red { background: rgba(255,95,95,0.15); color: var(--danger); }
.badge--green { background: rgba(0,200,140,0.15); color: var(--badge-green); }

.widget { background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; }
.widget-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.widget-title { font: 700 14px var(--font-display); color: var(--text-primary); }
.widget-link { font-size: 12px; color: var(--accent-lime); font-weight: 600; }

.form-label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: .05em; }
.input { width: 100%; box-sizing: border-box; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 16px; color: var(--text-primary); font: 15px var(--font-sans); outline: none; }
.input::placeholder { color: var(--text-tertiary); }
.input:focus, .input.is-focus { border-color: var(--accent-lime); background: var(--bg-secondary); box-shadow: 0 0 0 3px var(--accent-dim); }
.input.is-error { border-color: var(--danger); }

.nav-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 10px 12px; border-radius: var(--radius-sm); background: transparent; border: none; color: var(--text-secondary); font: 500 13px var(--font-sans); text-align: left; cursor: pointer; }
.nav-item:hover { background: var(--bg-tertiary); color: var(--text-primary); }
.nav-item.active { background: rgba(255,214,10,0.10); color: var(--accent-lime); font-weight: 600; }
.nav-badge { margin-left: auto; background: var(--accent-lime); color: var(--on-accent); font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: var(--radius-pill); }
.nav-item--autumn { background: linear-gradient(135deg, rgba(255,140,66,0.22), rgba(255,193,7,0.10)); border: 1px solid rgba(255,140,66,0.4); color: var(--autumn-text); font: 700 12px var(--font-display); letter-spacing: .05em; text-transform: uppercase; }

.seg { display: inline-grid; grid-auto-flow: column; gap: 4px; background: var(--bg-tertiary); border-radius: 10px; padding: 3px; }
.seg-tab { background: transparent; border: none; border-radius: 8px; padding: 7px 12px; font: 600 12px var(--font-sans); color: var(--text-secondary); cursor: pointer; }
.seg-tab.is-active { background: var(--bg-secondary); color: var(--accent-lime); box-shadow: var(--shadow-sm); }
```
