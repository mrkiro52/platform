# KIRO IT Summer Camp '26 Platform — Project Context

## 1. Суть проекта
Образовательная платформа для IT-лагеря (3 месяца: июнь–август 2026). 
- **Для кого:** учащиеся лагеря
- **Что:** расписание, материалы, задания, новости, прогресс лагеря
- **Зачем:** единый контроль-центр, доступ к материалам по дням, отслеживание прогресса

## 2. Ключевые требования
- Календарь на 3 месяца (30+31+31 дней)
- День = название + теория + ДЗ (в расписании) или название + материалы (в библиотеке)
- Доступ к материалам/ДЗ только с наступлением даты (date-based locking)
- Админ-панель для управления всем контентом
- JWT auth (24h expiry, admin/admin default)
- Прогресс-бар по месяцам, текущая дата подсвечена

## 3. Принятые решения
- React 18 + Vite (frontend), Express + SQLite (backend)
- Состояние хранится: sessionStorage (JWT), localStorage (preferences/completion)
- State-based routing без React Router (выбрал PAGES object)
- Fixed sidebar + margin-left layout (не overlay)
- Schedule и Library — отдельные страницы, но используют одни дни из расписания
- Дни в расписании expandable, в библиотеке — раскрытие модала с материалами
- Админ-панель — vanilla HTML/JS в отдельной папке backend/admin/

## 4. Текущий статус — ГОТОВО
✅ Dashboard — новости, прогресс, notes, timer, сегодняшние материалы/ДЗ, события
✅ Schedule — 30 дней июня с теорией и ДЗ (фильтры по типам)
✅ Library — 30 дней с материалами (название + ссылки), дата-лок
✅ Tasks — фильтры (Все/Открытые/Выполненные), localStorage-persistence
✅ Admin Schedule — добавление/редактирование дней (теория, ДЗ)
✅ Admin Library — редактирование названий дней, управление ссылками (add/edit/delete)
✅ Announcements/Обьявления — API backend, админ-панель, фронтенд (Dashboard)
✅ Auth — JWT, admin/admin, 24h expiry
✅ Camp Progress bar — 3 месяца со статусом дней (прошлые/текущий/будущие)

## 5. Структура проекта
```
platform/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx      — новости (из API), прогресс, notes, timer
│   │   ├── Schedule.jsx       — дни с фильтрами, CampProgress
│   │   ├── Library.jsx        — дни как карточки (идентичны расписанию)
│   │   ├── Tasks.jsx          — список с фильтрами + localStorage
│   │   └── Links.jsx          — полезные ссылки
│   ├── components/
│   │   ├── AppShell.jsx       — главный контейнер, роутинг
│   │   ├── Sidebar.jsx        — навигация
│   │   ├── TopBar.jsx         — заголовок
│   │   └── DayModal.jsx       — модал с материалами дня
│   ├── data.js                — SCHEDULE, LIBRARY (fallback data)
│   ├── api.js                 — API client (schedule, library, news, announcements)
│   ├── platform.css           — стили (CSS variables, grid, mobile)
│   └── App.jsx
├── backend/
│   ├── server.js              — Express, CORS, auth middleware
│   ├── src/
│   │   ├── db.js              — SQLite schema + seed (schedule, library, users, announcements)
│   │   ├── auth.js            — JWT генерация/проверка
│   │   └── routes/
│   │       ├── schedule.js     — GET /api/schedule (public)
│   │       ├── library.js      — GET /api/library, CRUD /api/library/days & materials (admin)
│   │       └── announcements.js — GET /api/announcements (public), POST/PUT/DELETE (admin)
│   ├── admin/
│   │   └── index.html         — админ-панель (dashboard, schedule, library, announcements)
│   └── data/ (kiro.db)
└── package.json
```

## 6. Технический стек
**Frontend:**
- React 18, Vite 5, ES6+
- Fetch API (в api.js)
- CSS Grid + Flexbox, CSS variables
- localStorage, sessionStorage

**Backend:**
- Node.js + Express
- better-sqlite3 (sync ORM)
- JWT (jsonwebtoken)
- CORS

## 7. Договорённости (Code Style)
- React компоненты PascalCase, функции camelCase
- CSS классы: BEM-light (block-element, не block__element)
- Дни нумеруются 1–30 (июнь), 31–61 (июль, 1–31), 62–92 (август, 1–31)
- localStorage ключи: `kiro_*` (kiro_notes, kiro_hw_status, etc.)
- API routes `/api/{resource}` (schedule, library, announcements)
- Админ-панель: vanillaJS, функции loadXXX, openXXXModal, saveXXX, deleteXXX
- Дата-лок: `new Date(2026, month, day) <= today` = available
- Seed данные в db.js, не в миграциях

## 8. Следующие шаги (TODO)
1. ❌ **Library админ-панель:** показывать дни как карточки (идентичны расписанию), редактировать названия inline
2. ❌ **Удалить Tasks вкладку из админ-панели** (loadTasks, sec-tasks, LOADERS.tasks)
3. ❌ **Обьявления:** создать API /api/announcements, добавить в админ-панель, вывести на Dashboard вместо News
4. ❌ **Удалить News из админ-панели** (было временной заглушкой)
5. ⚠️ **Июль/август:** добавить дни для этих месяцев (пока только май)
6. ⚠️ **Mobile тестирование:** sidebar drawer, modal overflow
7. ⚠️ **Performance:** ленивая загрузка материалов, кэширование API

## 9. Открытые вопросы
- Нужны ли ссылки на видео/документы отдельной таблицей или inline в день?
  → Решено: ссылки вложены в день (materials), админ редактирует через "Ссылки →"
- Что делать с июлем/августом на фронте?
  → Временно заблокированы (locked: true), показывается 🔒 и сообщение
- Может ли один день иметь несколько ДЗ или один?
  → Один (hw: string, link на Google Drive папку)
- Нужны ли draft/publish для дней в расписании или все сразу видны админам?
  → Все видны админам, для юзеров — дата-лок
