// Индивидуальные программы осеннего лагеря на октябрь.
// Направление хранится у пользователя в users.autumn_direction (product / system / business / backend / security / ml).
// Главы подгружаются лениво. У каждой главы два экрана: конспект и задание к главе.
// quiz — задание из вопросов, которое сдаётся на платформе (ответы уходят в админку);
// у остальных глав задание лежит в самой главе (assignment). submit: 'file' — аналитики
// оформляют задание в файле и присылают в личные сообщения (PROGRAM_CONTACT);
// у задания главы может быть свой способ сдачи (assignment.submit, например 'trainer').
// tracks — глава с выбором языка: студент выбирает трек, разделы трека идут перед общими (combineTrack).

export const PROGRAM_PERIOD = '1–31 октября'
export const PROGRAM_CONTACT = { handle: '@x_tap', url: 'https://t.me/x_tap', text: 't.me/x_tap' }

export const DIRECTIONS = {
  product: {
    key: 'product',
    name: 'Продуктовая аналитика',
    dative: 'продуктовой аналитике',
    goal: 'Путь к офферу junior продуктового аналитика',
    submit: 'file',
    chapters: [
      { num: 1, title: 'Профессия, продуктовое мышление и метрики', sections: 6, load: () => import('./product-1') },
      { num: 2, title: 'SQL для продуктового аналитика', sections: 8, load: () => import('./product-2'), submit: 'trainer', taskHint: 'все задачи SQL-тренажёра' },
      // Глава 3 — та же, что глава 1 программы ML; ноутбуки и датасеты общие (FILE_ALIASES на бэкенде)
      { num: 3, title: 'Основы NumPy, pandas и Matplotlib', sections: 6, source: 'ml-1', load: () => import('./ml-1').then(m => ({ default: { ...m.default, num: 3 } })) },
      // Глава 4 — общая для трёх направлений аналитиков
      { num: 4, title: 'Разбор вопросов с собеседований на аналитика в бигтех', sections: 10, source: 'analyst-4', load: () => import('./analyst-4'), submit: 'self' },
    ],
  },
  system: {
    key: 'system',
    name: 'Системная аналитика',
    dative: 'системной аналитике',
    goal: 'Путь к офферу junior системного аналитика',
    submit: 'file',
    chapters: [
      { num: 1, title: 'Профессия и процесс разработки', sections: 4, load: () => import('./system-1') },
      { num: 2, title: 'Требования — ядро профессии', sections: 8, load: () => import('./system-2') },
      { num: 3, title: 'Моделирование и нотации', sections: 9, load: () => import('./system-3') },
      { num: 4, title: 'Разбор вопросов с собеседований на аналитика в бигтех', sections: 10, source: 'analyst-4', load: () => import('./analyst-4'), submit: 'self' },
    ],
  },
  business: {
    key: 'business',
    name: 'Бизнес-аналитика',
    dative: 'бизнес-аналитике',
    goal: 'Путь к офферу junior бизнес-аналитика',
    submit: 'file',
    chapters: [
      { num: 1, title: 'Профессия', sections: 4, load: () => import('./business-1') },
      { num: 2, title: 'Бизнес-основы и экономика', sections: 6, load: () => import('./business-2') },
      { num: 3, title: 'Метрики', sections: 8, load: () => import('./business-3') },
      { num: 4, title: 'Разбор вопросов с собеседований на аналитика в бигтех', sections: 10, source: 'analyst-4', load: () => import('./analyst-4'), submit: 'self' },
    ],
  },
  backend: {
    key: 'backend',
    name: 'Backend-разработка',
    dative: 'backend-разработке',
    goal: 'Путь к офферу intern / junior Python backend-разработчика',
    chapters: [
      { num: 1, title: 'Профессия, конкурентность, сети и проектирование API', sections: 9, load: () => import('./backend-1'), quiz: () => import('./backend-1-quiz') },
      { num: 2, title: 'Базы данных', sections: 12, load: () => import('./backend-2'), quiz: () => import('./backend-2-quiz') },
      // Глава 3 — с выбором языка: темы трека (Go или Java) + общие темы из backend-3.js (combineTrack)
      { num: 3, title: 'Go или Java: язык под капотом и общие темы backend', sections: 16, submit: 'soon', load: () => import('./backend-3'), tracks: [
        { key: 'go', name: 'Go', file: 'backend-3-go', load: () => import('./backend-3-go'),
          about: 'Простой компилируемый язык с горутинами и каналами. Его выбирают для высоконагруженных сервисов, инфраструктуры и облачных инструментов: на Go пишут в Яндексе, Авито, Ozon, VK, Т-Банке, на нём написаны Docker и Kubernetes.' },
        { key: 'java', name: 'Java', file: 'backend-3-java', load: () => import('./backend-3-java'),
          about: 'Зрелый язык на JVM с огромной экосистемой и Spring. Стандарт для банков, финтеха, крупных корпоративных систем и маркетплейсов: Сбер, Т-Банк, Альфа-Банк, Ozon, Яндекс, МТС.' },
      ], pickIntro: 'Эта глава — про язык, на котором ты будешь писать бэкенд, и про темы, которые спрашивают на собеседованиях у любого бэкендера. Выбери Go или Java: в треке — устройство языка до уровня «как это работает под капотом», а после него — общие темы, одинаковые для обоих треков. Выбор можно поменять в любой момент.' },
    ],
  },
  ml: {
    key: 'ml',
    name: 'Машинное обучение',
    dative: 'машинному обучению',
    goal: 'Путь к офферу intern / junior ML-инженера',
    chapters: [
      { num: 1, title: 'Основы NumPy, pandas и Matplotlib', sections: 6, load: () => import('./ml-1') },
      { num: 2, title: 'Классическое машинное обучение: базовые понятия', sections: 8, load: () => import('./ml-2') },
      { num: 3, title: 'Линейные модели', sections: 10, load: () => import('./ml-3') },
    ],
  },
  security: {
    key: 'security',
    name: 'Информационная безопасность',
    dative: 'информационной безопасности',
    goal: 'Путь к офферу intern / junior специалиста по информационной безопасности',
    practice: 'практика — лабы PortSwigger',
    // Блок «С чего начать» — показывается в самом начале программы и каждой главы.
    start: {
      title: 'С чего начать',
      blocks: [
        { t: 'reading', label: 'Сайт и программа', items: [
          { title: 'PortSwigger Web Security Academy — заведи аккаунт, на нём делаем лабы', url: 'https://portswigger.net/web-security' },
          { title: 'Burp Suite Community Edition — скачай и установи', url: 'https://portswigger.net/burp/communitydownload' },
        ] },
        { t: 'note', text: '**Первый блок практики — 18 лаб по SQL-инъекциям.** Читай теорию PortSwigger по порядку: она сама подсказывает, в какой момент переходить к какой лабе.' },
        { t: 'reading', label: 'SQL-инъекции', items: [
          { title: 'Теория: SQL injection', url: 'https://portswigger.net/web-security/sql-injection' },
          { title: 'Все 18 лаб по SQL-инъекциям', url: 'https://portswigger.net/web-security/all-labs#sql-injection' },
        ] },
        { t: 'h4', text: 'Как мы работаем' },
        { t: 'ol', items: [
          'Изучаешь теорию из главы ниже — главное не прочитать, а понять.',
          'Параллельно проходишь лабы на PortSwigger.',
          'Через пару дней — общий созвон в формате полусобеседования: задаём вопросы по теории, поправляем и объясняем то, что осталось непонятным.',
          'После созвона — следующий пакет теории и лаб.',
        ] },
        { t: 'small', text: 'Вопросы по Burp Suite и лабам — Глеб, @kom1ssar4ik в Telegram.' },
      ],
    },
    chapters: [
      { num: 1, title: 'Фундамент, стандарты и регуляторика', sections: 5, load: () => import('./security-1'), quiz: () => import('./security-1-quiz') },
    ],
  },
}

// Как сдаётся задание главы: quiz — вопросы на платформе, trainer — задачи
// тренажёра, file — файлом в личные сообщения, self — сдавать не нужно,
// soon — задание к главе ещё не опубликовано
// Глава с выбором трека: сначала разделы трека, затем общие разделы базовой главы.
// Номера общих разделов продолжают нумерацию трека, поэтому в их заголовках h3 номеров нет.
export function combineTrack(base, track) {
  const own = track.sections
  const common = base.sections.map((s, i) => ({
    ...s,
    num: `${base.num}.${own.length + i + 1}`,
    divider: i === 0 ? (base.commonDivider || 'Общие темы') : s.divider,
  }))
  return { ...base, track: track.key, trackName: track.name, intro: track.intro || base.intro, summary: track.summary || base.summary, sections: [...own, ...common] }
}

export function taskKind(dir, meta, chapter) {
  if (meta?.quiz) return 'quiz'
  return chapter?.assignment?.submit || meta?.submit || dir?.submit || 'self'
}

export function directionOf(user) {
  return (user?.isAutumnCamp2026 && DIRECTIONS[user.autumnDirection]) || null
}
