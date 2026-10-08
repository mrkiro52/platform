// Индивидуальные программы осеннего лагеря на октябрь.
// Направление хранится у пользователя в users.autumn_direction (product / system / business / backend / security / ml).
// Главы подгружаются лениво. У каждой главы два экрана: конспект и задание к главе.
// quiz — задание из вопросов, которое сдаётся на платформе (ответы уходят в админку);
// у остальных глав задание лежит в самой главе (assignment). submit: 'file' — аналитики
// оформляют задание в файле и присылают в личные сообщения (PROGRAM_CONTACT);
// у задания главы может быть свой способ сдачи (assignment.submit, например 'trainer').

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
    ],
  },
  ml: {
    key: 'ml',
    name: 'Машинное обучение',
    dative: 'машинному обучению',
    goal: 'Путь к офферу intern / junior ML-инженера',
    chapters: [
      { num: 1, title: 'Основы NumPy, pandas и Matplotlib', sections: 6, load: () => import('./ml-1') },
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
// тренажёра, file — файлом в личные сообщения, self — сдавать не нужно
export function taskKind(dir, meta, chapter) {
  if (meta?.quiz) return 'quiz'
  return chapter?.assignment?.submit || meta?.submit || dir?.submit || 'self'
}

export function directionOf(user) {
  return (user?.isAutumnCamp2026 && DIRECTIONS[user.autumnDirection]) || null
}
