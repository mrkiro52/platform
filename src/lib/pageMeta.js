import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Заголовок вкладки, описание, canonical и robots для каждой страницы.
// Публичны только лендинг, вход и регистрация — остальные адреса закрыты авторизацией
// и помечаются noindex (дополнительно к robots.txt).

const SITE = 'KIRO PLATFORM'
const ORIGIN = 'https://kiroplatform.ru'
const DEFAULT_TITLE = 'KIRO PLATFORM — всё айти в одном месте'
const DEFAULT_DESCRIPTION = 'Айти-платформа комьюнити KIRO TEAM: конспекты и материалы, тренажёры по SQL и Python, подготовка к собеседованиям, вакансии и онлайн IT-лагерь KIRO IT CAMP.'

const PUBLIC = {
  '/': { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  '/login': { title: `Вход — ${SITE}`, description: 'Вход в KIRO PLATFORM: материалы, тренажёры, подготовка к собеседованиям, вакансии и онлайн IT-лагерь комьюнити KIRO TEAM.' },
  '/register': { title: `Регистрация — ${SITE}`, description: 'Регистрация в KIRO PLATFORM — айти-платформе комьюнити KIRO TEAM: материалы, тренажёры, вакансии и онлайн IT-лагерь.' },
}

// Самый длинный подходящий префикс задаёт название раздела
const SECTIONS = [
  ['/autumn-camp/block/algo', 'Алгособес'],
  ['/autumn-camp/block/career', 'Карьера'],
  ['/autumn-camp/program', 'Индивидуальная программа'],
  ['/autumn-camp/vacancies', 'Вакансии'],
  ['/autumn-camp/math', 'Математика'],
  ['/autumn-camp', 'Осенний лагерь'],
  ['/dashboard', 'Дэшборд'],
  ['/library', 'Библиотека знаний'],
  ['/links', 'Полезные ссылки'],
  ['/profile', 'Профиль'],
  ['/trainings', 'Тренировки'],
  ['/wall', 'Стена'],
  ['/u/', 'Профиль участника'],
  ['/messages', 'Сообщения'],
  ['/dating', 'Знакомства'],
  ['/courses', 'Мини-курсы'],
  ['/notifications', 'Уведомления'],
  ['/likebezy', 'Полные ликбезы'],
  ['/antireels', 'AntiReels'],
  ['/announcements', 'Объявления'],
]

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

export function pageMeta(pathname) {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  if (PUBLIC[path]) return { ...PUBLIC[path], index: true, canonical: ORIGIN + path }
  const section = SECTIONS.find(([prefix]) => path === prefix || path.startsWith(prefix.endsWith('/') ? prefix : `${prefix}/`))
  return {
    title: section ? `${section[1]} — ${SITE}` : SITE,
    description: DEFAULT_DESCRIPTION,
    index: false,
    canonical: ORIGIN + path,
  }
}

export function usePageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = pageMeta(pathname)
    document.title = meta.title
    setMeta('meta[name="description"]', 'content', meta.description)
    setMeta('meta[name="robots"]', 'content', meta.index ? 'index, follow' : 'noindex, nofollow')
    setMeta('link[rel="canonical"]', 'href', meta.canonical)
    setMeta('meta[property="og:url"]', 'content', meta.canonical)
  }, [pathname])
}
