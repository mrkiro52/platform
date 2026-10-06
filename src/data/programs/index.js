// Индивидуальные программы осеннего лагеря на октябрь.
// Направление хранится у пользователя в users.autumn_direction (product / system / business).
// Главы подгружаются лениво: у каждой — разделы теории и задание в конце.

export const PROGRAM_PERIOD = '1–31 октября'
export const PROGRAM_CONTACT = { handle: '@x_tap', url: 'https://t.me/x_tap', text: 't.me/x_tap' }

export const DIRECTIONS = {
  product: {
    key: 'product',
    name: 'Продуктовая аналитика',
    dative: 'продуктовой аналитике',
    goal: 'Путь к офферу junior продуктового аналитика',
    chapters: [],
  },
  system: {
    key: 'system',
    name: 'Системная аналитика',
    dative: 'системной аналитике',
    goal: 'Путь к офферу junior системного аналитика',
    chapters: [
      { num: 1, title: 'Профессия и процесс разработки', sections: 4, load: () => import('./system-1') },
    ],
  },
  business: {
    key: 'business',
    name: 'Бизнес-аналитика',
    dative: 'бизнес-аналитике',
    goal: 'Путь к офферу junior бизнес-аналитика',
    chapters: [
      { num: 1, title: 'Профессия', sections: 4, load: () => import('./business-1') },
    ],
  },
}

export function directionOf(user) {
  return (user?.isAutumnCamp2026 && DIRECTIONS[user.autumnDirection]) || null
}
