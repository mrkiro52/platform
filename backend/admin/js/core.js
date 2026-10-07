'use strict'
// Ядро админки: сессия, запросы к API, роутер, оболочка, модалки, тосты.
// Разделы лежат в js/pages/*.js и регистрируются в PAGES, запуск — в boot.js.

const API = ''
const BASE = '/admin'
const PAGES = {}
const $ = (sel, root = document) => root.querySelector(sel)

// ═══ Сессия ════════════════════════════════════════════════════════════
// Логин, роль и срок действия берутся прямо из токена — их подписал сервер.
// У токенов, выданных до появления ролей, поля scope нет: это главный админ.
function decodeToken(token) {
  try {
    const part = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(atob(part).split('').map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0')).join(''))
    return JSON.parse(json)
  } catch { return null }
}

const Session = {
  token: '', username: '', scope: 'full', exp: 0,
  load() {
    const token = localStorage.getItem('kiro_admin_token') || ''
    const payload = token ? decodeToken(token) : null
    if (!payload || payload.role !== 'admin') return false
    this.token = token
    this.username = payload.username || 'admin'
    this.scope = payload.scope || 'full'
    this.exp = (payload.exp || 0) * 1000
    return !this.expired
  },
  set(token) {
    localStorage.setItem('kiro_admin_token', token)
    return this.load()
  },
  clear() {
    this.token = ''
    localStorage.removeItem('kiro_admin_token')
    localStorage.removeItem('kiro_admin_scope')
  },
  get expired() { return this.exp && Date.now() > this.exp },
  get isMain() { return this.scope === 'full' },
  get roleLabel() { return { full: 'Главный админ', homework: 'Проверка ДЗ', tasks: 'Помощник', producer: 'Продюсер' }[this.scope] || 'Админ' },
}

// ═══ Утилиты ═══════════════════════════════════════════════════════════
function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function plural(n, one, few, many) {
  const m100 = Math.abs(n) % 100
  if (m100 >= 11 && m100 <= 14) return many
  const m10 = m100 % 10
  if (m10 === 1) return one
  if (m10 >= 2 && m10 <= 4) return few
  return many
}

const fmt = (n) => Number(n || 0).toLocaleString('ru-RU')

const MONTHS_GEN = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
const MONTHS_SHORT = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
const WD_SHORT = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const WD_FULL = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

// Даты админки — по Москве, как и в отчётах бэкенда
const mskDay = (ms = Date.now()) => new Date(ms + 3 * 3600 * 1000).toISOString().slice(0, 10)
const dayDate = (day) => new Date(`${day}T00:00:00Z`)
const addDays = (day, n) => new Date(dayDate(day).getTime() + n * 86400000).toISOString().slice(0, 10)
const daysBetween = (a, b) => Math.round((dayDate(b) - dayDate(a)) / 86400000)

function dayLabel(day, { weekday = false, short = false } = {}) {
  const d = dayDate(day)
  const base = short ? `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}` : `${d.getUTCDate()} ${MONTHS_GEN[d.getUTCMonth()]}`
  return weekday ? `${base}, ${WD_SHORT[d.getUTCDay()]}` : base
}

// «сегодня», «вчера», «5 дн. назад» или дата — для последней активности
function relDay(day) {
  if (!day) return null
  const diff = daysBetween(day, mskDay())
  if (diff <= 0) return 'сегодня'
  if (diff === 1) return 'вчера'
  if (diff < 30) return `${diff} ${plural(diff, 'день', 'дня', 'дней')} назад`
  return dayLabel(day, { short: true })
}

// Время из ISO-строки по Москве: «2 окт, 14:05»
function stampLabel(iso) {
  if (!iso) return ''
  const t = Date.parse(iso.includes('T') || iso.endsWith('Z') ? iso : iso.replace(' ', 'T') + 'Z')
  if (Number.isNaN(t)) return ''
  const d = new Date(t + 3 * 3600 * 1000)
  return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]}, ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`
}

// Две буквы для аватарки: «Иван Петров» → ИП, MrDavidoska → MD, der_viggen → DV
function initials(name) {
  const parts = String(name || '?').trim()
    .replace(/([a-zа-яё])([A-ZА-ЯЁ])/g, '$1 $2')
    .split(/[\s_.-]+/).filter(Boolean)
  const first = parts[0] || '?'
  return (first[0] + (parts[1] ? parts[1][0] : first[1] || '')).toUpperCase()
}

function debounce(fn, ms) {
  let t
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}

// Изменение в процентах к прошлому периоду
function deltaHtml(cur, prev, { invert = false } = {}) {
  if (!prev && !cur) return '<span class="delta flat">—</span>'
  if (!prev) return `<span class="delta up">${icon('trending-up', 13)}новое</span>`
  const pct = Math.round(((cur - prev) / prev) * 100)
  if (pct === 0) return '<span class="delta flat">без изменений</span>'
  const good = invert ? pct < 0 : pct > 0
  return `<span class="delta ${good ? 'up' : 'down'}">${icon(pct > 0 ? 'trending-up' : 'trending-down', 13)}${pct > 0 ? '+' : ''}${pct}%</span>`
}

// ═══ Запросы ═══════════════════════════════════════════════════════════
async function api(path, { method = 'GET', body = null, auth = true } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (auth && Session.token) headers.Authorization = 'Bearer ' + Session.token
  let res
  try {
    res = await fetch(API + path, { method, headers, body: body ? JSON.stringify(body) : undefined })
  } catch {
    throw new Error('Нет связи с сервером')
  }
  const data = await res.json().catch(() => ({}))
  // Токен протух — возвращаем на экран входа, иначе панель сыплет ошибками
  if (res.status === 401 && auth) {
    App.logout('Сессия истекла — войди заново')
    throw new Error('Сессия истекла')
  }
  if (!res.ok) throw new Error(data.message || `Ошибка ${res.status}`)
  return data
}

// ═══ Тосты ═════════════════════════════════════════════════════════════
function toast(msg, type = 'ok') {
  const el = document.createElement('div')
  el.className = `toast-item ${type}`
  el.setAttribute('role', type === 'err' ? 'alert' : 'status')
  el.innerHTML = icon(type === 'ok' ? 'circle-check' : 'circle-alert', 16) + `<span>${esc(msg)}</span>`
  $('#toast').appendChild(el)
  setTimeout(() => el.remove(), type === 'err' ? 4500 : 3000)
}

// ═══ Модалки ═══════════════════════════════════════════════════════════
const Modal = {
  onClose: null,
  open(html, { size = '' } = {}) {
    const box = $('#modal-box')
    box.className = 'modal-box' + (size === 'lg' ? ' is-lg' : '')
    box.innerHTML = html
    $('#modal').hidden = false
    document.body.style.overflow = 'hidden'
    const first = box.querySelector('[autofocus], input:not([type=hidden]), textarea, select')
    if (first) setTimeout(() => first.focus(), 30)
  },
  close() {
    if ($('#modal').hidden) return
    $('#modal').hidden = true
    $('#modal-box').innerHTML = ''
    document.body.style.overflow = ''
    const cb = Modal.onClose
    Modal.onClose = null
    if (cb) cb()
  },
}

function modalHead(title, sub = '') {
  return `
    <div class="modal-head">
      <div><div class="modal-title">${title}</div>${sub ? `<div class="modal-sub">${sub}</div>` : ''}</div>
      <button class="btn-icon" onclick="Modal.close()" aria-label="Закрыть">${icon('x', 18)}</button>
    </div>`
}

// Подтверждение действия. text — уже экранированный HTML.
// word — слово, которое нужно ввести для необратимых действий.
function confirmDialog({ title, text = '', confirm = 'Подтвердить', danger = false, word = '' }) {
  return new Promise(resolve => {
    let done = false
    const finish = (ok) => { if (done) return; done = true; resolve(ok) }
    Modal.open(`
      ${modalHead(esc(title))}
      <div class="modal-text">${text}</div>
      ${word ? `<div class="field" style="margin-top:16px;margin-bottom:0"><label for="confirm-word">Введи слово «${esc(word)}»</label><input id="confirm-word" autocomplete="off" placeholder="${esc(word)}"/></div>` : ''}
      <div class="modal-actions">
        <button class="btn btn-secondary" id="confirm-no">Отмена</button>
        <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="confirm-yes" ${word ? 'disabled' : ''}>${esc(confirm)}</button>
      </div>`)
    Modal.onClose = () => finish(false)
    const yes = $('#confirm-yes')
    if (word) $('#confirm-word').addEventListener('input', e => { yes.disabled = e.target.value.trim() !== word })
    else setTimeout(() => yes.focus(), 30)
    $('#confirm-no').addEventListener('click', () => Modal.close())
    yes.addEventListener('click', () => { Modal.onClose = null; Modal.close(); finish(true) })
  })
}

// ═══ Заготовки разметки ════════════════════════════════════════════════
function pageHead({ title, sub = '', actions = '', crumb = null }) {
  return `
    <header class="page-head">
      <div>
        ${crumb ? `<a class="page-crumb" href="${BASE}${crumb.path}">${icon('arrow-left', 14)}${esc(crumb.label)}</a>` : ''}
        <h1 class="page-title">${title}</h1>
        ${sub ? `<p class="page-sub">${sub}</p>` : ''}
      </div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ''}
    </header>`
}

function emptyState(iconName, title, text = '', compact = false) {
  return `
    <div class="empty${compact ? ' is-compact' : ''}">
      <div class="empty-icon">${icon(iconName, 20)}</div>
      <div class="empty-title">${title}</div>
      ${text ? `<div class="empty-text">${text}</div>` : ''}
    </div>`
}

function errorBox(message) {
  return `
    <div class="error-box">
      ${icon('circle-alert', 18)}
      <span style="flex:1">${esc(message)}</span>
      <button class="btn btn-secondary btn-sm" onclick="Router.reload()">${icon('refresh-cw')}Повторить</button>
    </div>`
}

function skeleton({ rows = 6, kpis = 0 } = {}) {
  const kpi = kpis ? `<div class="kpi-grid" style="margin-bottom:16px">${'<div class="kpi"><div class="skel skel-line" style="width:50%"></div><div class="skel" style="height:28px;width:40%"></div><div class="skel skel-line" style="width:70%;margin:0"></div></div>'.repeat(kpis)}</div>` : ''
  return `${kpi}<div class="card">${Array.from({ length: rows }, (_, i) => `<div class="skel skel-line" style="width:${92 - (i % 3) * 14}%"></div>`).join('')}</div>`
}

function seg(items, active, handler) {
  return `<div class="seg" role="tablist">${items.map(([value, label]) =>
    `<button role="tab" aria-selected="${value === active}" class="${value === active ? 'active' : ''}" onclick="${handler}('${value}')">${label}</button>`).join('')}</div>`
}

function searchBox(id, value, placeholder, handler) {
  return `
    <label class="search">
      ${icon('search', 15)}
      <input id="${id}" type="search" value="${esc(value)}" placeholder="${esc(placeholder)}" oninput="${handler}(this.value)" autocomplete="off"/>
    </label>`
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // Clipboard API недоступен вне https — старый способ
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  toast('Скопировано')
}

// ═══ Маршруты и меню ═══════════════════════════════════════════════════
const BOTH = ['full', 'homework']
const MAIN = ['full']
// Задачи видят все админы, включая помощников с доступом только к ним
const ALL = ['full', 'homework', 'tasks', 'producer']

const NAV = [
  { label: 'Обзор', items: [
    { id: 'dashboard', path: '/dashboard', label: 'Дашборд', icon: 'layout-dashboard', scopes: MAIN },
    { id: 'tasks', path: '/tasks', label: 'Задачи', icon: 'square-kanban', scopes: ALL, badge: 'tasks' },
  ] },
  { label: 'Платформа', items: [
    { id: 'users', path: '/users', label: 'Пользователи', icon: 'users', scopes: MAIN },
    { id: 'announcements', path: '/announcements', label: 'Объявления', icon: 'megaphone', scopes: MAIN },
    { id: 'programs', path: '/programs', label: 'Программы октября', icon: 'graduation-cap', scopes: MAIN },
  ] },
  { label: 'Созвоны', items: [
    { id: 'calls', path: '/calls', label: 'Слоты созвонов', icon: 'calendar-plus', scopes: MAIN },
    { id: 'calls-calendar', path: '/calls/calendar', label: 'Календарь записей', icon: 'calendar-days', scopes: MAIN },
  ] },
  { label: 'Домашние задания', items: [
    { id: 'homework', path: '/homework', label: 'Проверка ДЗ', icon: 'clipboard-check', scopes: BOTH, badge: 'homework' },
    { id: 'homework-stats', path: '/homework/stats', label: 'Аналитика проверки', icon: 'chart-column', scopes: BOTH },
  ] },
]

const ROUTES = [
  { re: /^\/dashboard$/, page: 'dashboard', nav: 'dashboard', title: 'Дашборд', scopes: MAIN },
  { re: /^\/tasks$/, page: 'tasks', nav: 'tasks', title: 'Задачи', scopes: ALL },
  { re: /^\/users$/, page: 'users', nav: 'users', title: 'Пользователи', scopes: MAIN },
  { re: /^\/announcements$/, page: 'announcements', nav: 'announcements', title: 'Объявления', scopes: MAIN },
  { re: /^\/programs$/, page: 'programs', nav: 'programs', title: 'Программы октября', scopes: MAIN },
  { re: /^\/programs\/([a-z]+)$/, page: 'programDirection', nav: 'programs', title: 'Программы октября', scopes: MAIN, keys: ['dir'] },
  { re: /^\/programs\/([a-z]+)\/(\d+|start)$/, page: 'programChapter', nav: 'programs', title: 'Программы октября', scopes: MAIN, keys: ['dir', 'chapter'] },
  { re: /^\/calls$/, page: 'calls', nav: 'calls', title: 'Слоты созвонов', scopes: MAIN },
  { re: /^\/calls\/calendar$/, page: 'callsCalendar', nav: 'calls-calendar', title: 'Календарь записей', scopes: MAIN },
  { re: /^\/homework$/, page: 'homework', nav: 'homework', title: 'Проверка ДЗ', scopes: BOTH },
  { re: /^\/homework\/stats$/, page: 'homeworkStats', nav: 'homework-stats', title: 'Аналитика проверки', scopes: BOTH },
  { re: /^\/homework\/(\d+)$/, page: 'homeworkStudent', nav: 'homework', title: 'Проверка ДЗ', scopes: BOTH, keys: ['id'] },
]

const Router = {
  seq: 0,
  // Раздел может запретить уход, пока есть несохранённое: возвращает текст
  // предупреждения или null
  guard: null,
  current: null,
  lastUrl: '',

  path() {
    const p = location.pathname.startsWith(BASE) ? location.pathname.slice(BASE.length) : '/'
    return p.replace(/\/+$/, '') || '/'
  },

  defaultPath() { return { full: '/dashboard', homework: '/homework' }[Session.scope] || '/tasks' },

  async canLeave() {
    const msg = Router.guard && Router.guard()
    if (!msg) return true
    const ok = await confirmDialog({ title: 'Уйти без сохранения?', text: esc(msg), confirm: 'Уйти', danger: true })
    if (ok) Router.guard = null
    return ok
  },

  async go(path, { replace = false } = {}) {
    if (!(await Router.canLeave())) return
    Router.guard = null
    const url = BASE + path
    if (replace) history.replaceState(null, '', url)
    else if (location.pathname + location.search !== url) history.pushState(null, '', url)
    Router.render()
  },

  reload() { Router.render({ keepScroll: true }) },

  // Обновить параметры адреса без перерисовки раздела
  setQuery(params) {
    const q = new URLSearchParams(location.search)
    for (const [k, v] of Object.entries(params)) {
      if (v === null || v === undefined || v === '' || v === false) q.delete(k)
      else q.set(k, v)
    }
    const qs = q.toString()
    history.replaceState(null, '', location.pathname + (qs ? `?${qs}` : ''))
    Router.lastUrl = location.pathname + location.search
  },

  render({ keepScroll = false } = {}) {
    const seq = ++Router.seq
    const path = Router.path()
    let route = null
    let params = {}
    for (const r of ROUTES) {
      const m = r.re.exec(path)
      if (m) { route = r; (r.keys || []).forEach((k, i) => { params[k] = m[i + 1] }); break }
    }
    if (!route || !route.scopes.includes(Session.scope)) {
      // Раздел по умолчанию тоже недоступен — роль незнакомая, дальше не идём
      if (path === Router.defaultPath()) {
        $('#view').innerHTML = pageHead({ title: 'Нет доступа' }) + errorBox('У этой учётной записи нет доступа к разделам админки')
        return
      }
      history.replaceState(null, '', BASE + Router.defaultPath())
      return Router.render()
    }
    Router.current = route
    Router.lastUrl = location.pathname + location.search
    Shell.highlight(route.nav)
    Shell.toggleSidebar(false)
    document.title = `${route.title} · KIRO Admin`
    $('#top-title').textContent = route.title
    if (!keepScroll) window.scrollTo(0, 0)

    const view = $('#view')
    const page = PAGES[route.page]
    const ctx = {
      params,
      query: new URLSearchParams(location.search),
      stale: () => seq !== Router.seq,
    }
    Promise.resolve()
      .then(() => page.render(view, ctx))
      .catch(err => {
        if (ctx.stale()) return
        console.error(err)
        view.innerHTML = pageHead({ title: esc(route.title) }) + errorBox(err.message || 'Не удалось загрузить раздел')
      })
  },
}

window.addEventListener('popstate', async () => {
  // Адрес уже сменился; если раздел держит несохранённое и человек передумал —
  // возвращаем адрес обратно
  if (Router.guard) {
    const back = location.href
    history.pushState(null, '', Router.lastUrl || BASE)
    if (!(await Router.canLeave())) return
    history.replaceState(null, '', back)
  }
  Router.render()
})

window.addEventListener('beforeunload', e => {
  if (Router.guard && Router.guard()) { e.preventDefault(); e.returnValue = '' }
})

// Ссылки внутри админки открываются без перезагрузки. Клики с Ctrl/Cmd и
// средней кнопкой работают как обычно — раздел откроется в новой вкладке.
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]')
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  const href = a.getAttribute('href')
  if (a.target === '_blank' || !href.startsWith(BASE + '/')) return
  e.preventDefault()
  Router.go(href.slice(BASE.length))
})

// ═══ Оболочка ══════════════════════════════════════════════════════════
const Badges = { homework: 0, tasks: 0 }

const Shell = {
  renderNav() {
    $('#sb-nav').innerHTML = NAV.map(group => {
      const items = group.items.filter(i => i.scopes.includes(Session.scope))
      if (!items.length) return ''
      return `
        <div class="sb-group">
          <div class="sb-group-label">${group.label}</div>
          ${items.map(i => `
            <a href="${BASE}${i.path}" class="nav-item" data-nav="${i.id}">
              ${icon(i.icon, 17)}<span>${i.label}</span>
              ${i.badge ? `<span class="nav-badge" data-badge="${i.badge}" hidden></span>` : ''}
            </a>`).join('')}
        </div>`
    }).join('')
    $('#sb-role').textContent = Session.isMain ? 'Admin Panel' : Session.roleLabel
    $('#sb-foot').innerHTML = `
      <div class="me">
        <div class="me-avatar">${esc(initials(Session.username))}</div>
        <div style="min-width:0">
          <div class="me-name">${esc(Session.username)}</div>
          <div class="me-role">${Session.roleLabel}</div>
        </div>
      </div>
      <button class="nav-item" onclick="App.logout()">${icon('log-out', 17)}<span>Выйти</span></button>`
    Shell.paintBadges()
  },

  highlight(navId) {
    document.querySelectorAll('.nav-item[data-nav]').forEach(a => {
      const on = a.dataset.nav === navId
      a.classList.toggle('active', on)
      if (on) a.setAttribute('aria-current', 'page')
      else a.removeAttribute('aria-current')
    })
  },

  paintBadges() {
    document.querySelectorAll('[data-badge]').forEach(el => {
      const n = Badges[el.dataset.badge] || 0
      el.hidden = !n
      el.textContent = n > 99 ? '99+' : n
    })
  },

  async refreshBadges() {
    if (!Session.token) return
    if (BOTH.includes(Session.scope)) try {
      const students = await api('/api/homework/admin/students')
      Badges.homework = students.reduce((sum, s) => sum + (s.pending || 0), 0)
    } catch { /* раздел сам покажет ошибку */ }
    try {
      const { me, tasks } = await api('/api/admin-tasks')
      Badges.tasks = tasksNeedingAttention(tasks, me)
    } catch { /* бэкенд без задач — бейдж просто не появится */ }
    Shell.paintBadges()
  },

  toggleSidebar(open) {
    $('#sidebar').classList.toggle('open', open)
    $('#sb-overlay').classList.toggle('active', open)
  },
}

// ═══ Приложение ════════════════════════════════════════════════════════
const App = {
  badgeTimer: null,

  start() {
    $('#modal').addEventListener('mousedown', e => { if (e.target.id === 'modal') Modal.close() })
    document.addEventListener('keydown', e => { if (e.key === 'Escape') Modal.close() })
    $('#login-form').addEventListener('submit', App.login)
    $('#pw-toggle').addEventListener('click', () => {
      const input = $('#ap')
      const show = input.type === 'password'
      input.type = show ? 'text' : 'password'
      $('#pw-toggle').innerHTML = icon(show ? 'eye-off' : 'eye', 17)
      $('#pw-toggle').setAttribute('aria-label', show ? 'Скрыть пароль' : 'Показать пароль')
    })
    $('#pw-toggle').innerHTML = icon('eye', 17)
    $('#menu-btn').innerHTML = icon('menu', 22)
    $('#sb-close').innerHTML = icon('x', 18)
    $('#menu-btn').addEventListener('click', () => Shell.toggleSidebar(true))
    $('#sb-close').addEventListener('click', () => Shell.toggleSidebar(false))
    $('#sb-overlay').addEventListener('click', () => Shell.toggleSidebar(false))

    if (Session.load()) App.showApp()
    else App.showLogin(localStorage.getItem('kiro_admin_token') ? 'Сессия истекла — войди заново' : '')
  },

  showLogin(message = '') {
    $('#app').hidden = true
    $('#login-screen').hidden = false
    const err = $('#login-err')
    err.hidden = !message
    err.textContent = message
    setTimeout(() => $('#au').focus(), 30)
  },

  showApp() {
    $('#login-screen').hidden = true
    $('#app').hidden = false
    Shell.renderNav()
    Router.render()
    Shell.refreshBadges()
    clearInterval(App.badgeTimer)
    App.badgeTimer = setInterval(Shell.refreshBadges, 60000)
  },

  async login(e) {
    e.preventDefault()
    const btn = $('#login-btn')
    const err = $('#login-err')
    err.hidden = true
    btn.disabled = true
    btn.textContent = 'Входим…'
    try {
      const data = await api('/api/auth/admin-login', {
        method: 'POST', auth: false,
        body: { username: $('#au').value.trim(), password: $('#ap').value },
      })
      if (!Session.set(data.token)) throw new Error('Сервер вернул неподходящий токен')
      $('#ap').value = ''
      // Пришли по ссылке на раздел — после входа открываем именно его
      if (Router.path() === '/') history.replaceState(null, '', BASE + Router.defaultPath())
      App.showApp()
    } catch (ex) {
      err.textContent = ex.message === 'Неверный логин или пароль' ? ex.message : `Не удалось войти: ${ex.message}`
      err.hidden = false
    } finally {
      btn.disabled = false
      btn.innerHTML = `Войти ${icon('arrow-right', 16)}`
    }
  },

  logout(message = '') {
    Router.guard = null
    Session.clear()
    clearInterval(App.badgeTimer)
    Modal.close()
    App.showLogin(message)
  },
}
