'use strict'
// Дашборд главного админа: как участники пользуются платформой.

// Разделы платформы — ключи совпадают с src/lib/analytics.js
const PAGE_LABELS = {
  dashboard: 'Дэшборд',
  wall: 'Стена',
  messages: 'Сообщения',
  library: 'Библиотека знаний',
  trainings: 'Тренировки',
  links: 'Полезные ссылки',
  likebezy: 'Полные ликбезы',
  antireels: 'AntiReels',
  profile: 'Профиль',
  'user-profile': 'Профили участников',
  notifications: 'Уведомления',
  announcements: 'Объявления',
  camp: 'Autumn Camp — главная',
  'camp-onboarding': 'Онбординг лагеря',
  'camp-week': 'Материалы недель',
  math: 'Мини-курс математики',
  'math-theory': 'Конспекты математики',
  'math-homework': 'ДЗ по математике',
  'homework-upload': 'Сдача ДЗ',
  'homework-task': 'Страница задачи',
  other: 'Другие страницы',
}

const ACTION_META = {
  login: ['Входы на платформу', 'log-in'],
  material_open: ['Открыли главу материалов', 'book-open'],
  video_play: ['Запустили видеоурок', 'video'],
  quiz_answer: ['Ответили на квиз', 'circle-help'],
  code_run: ['Запустили код', 'terminal'],
  split_open: ['Открыли сплит-скрин', 'columns-2'],
  math_solution_open: ['Открыли решение в математике', 'lightbulb'],
  level_test_finish: ['Завершили тест уровня', 'flag'],
  homework_submit: ['Сдали решение ДЗ', 'send'],
  post_create: ['Опубликовали пост', 'message-square'],
  comment_create: ['Оставили комментарий', 'message-circle'],
  post_react: ['Поставили реакцию', 'heart'],
  message_send: ['Отправили сообщение', 'message-circle'],
  call_book: ['Записались на созвон', 'calendar-check'],
}

const DEVICE_META = {
  desktop: ['Компьютер', 'monitor', 'var(--lime)'],
  mobile: ['Телефон', 'smartphone', 'var(--blue)'],
  tablet: ['Планшет', 'tablet', 'var(--violet)'],
  unknown: ['Не определено', 'circle-help', 'var(--text3)'],
}

const DashboardPage = {
  data: null,
  days: 30,
  week: null,
  showAllInactive: false,

  async render(view, ctx) {
    const days = Number(ctx.query.get('days'))
    DashboardPage.days = [7, 30, 90].includes(days) ? days : 30
    DashboardPage.showAllInactive = false
    view.innerHTML = DashboardPage.head() + skeleton({ kpis: 8, rows: 8 })
    const data = await api(`/api/analytics/admin/overview?days=${DashboardPage.days}`)
    if (ctx.stale()) return
    DashboardPage.data = data
    if (!data.weeks.some(w => w.week === DashboardPage.week)) {
      DashboardPage.week = (data.weeks.find(w => w.chapters.length) || data.weeks[0] || {}).week || null
    }
    DashboardPage.paint(view)
  },

  head(updated = '') {
    return pageHead({
      title: 'Дашборд',
      sub: 'Как участники пользуются платформой: активность, учёба, домашние задания и общение',
      actions: `
        ${updated ? `<span class="updated">обновлено ${updated}</span>` : ''}
        ${seg([['7', '7 дней'], ['30', '30 дней'], ['90', '90 дней']], String(DashboardPage.days), 'DashboardPage.setDays')}
        <button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
  },

  setDays(days) {
    Router.setQuery({ days: days === '30' ? null : days })
    Router.reload()
  },

  paint(view) {
    const d = DashboardPage.data
    const updated = stampLabel(d.generatedAt).split(', ')[1]
    view.innerHTML = `
      ${DashboardPage.head(updated)}
      ${DashboardPage.sinceNote(d)}
      ${DashboardPage.kpis(d)}

      <div class="grid-2-1" style="margin-top:16px">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('activity')}Активность по дням</div><div class="card-sub">Сколько человек заходило на платформу и сколько было визитов</div></div>
            <div class="legend">
              <span class="legend-item"><i class="dot" style="background:var(--lime)"></i>Активные</span>
              <span class="legend-item"><i class="dot" style="background:var(--blue)"></i>Визиты</span>
            </div>
          </div>
          <div id="chart-activity"></div>
        </div>
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('user-plus')}Последние регистрации</div><div class="card-sub">Доступ к лагерю можно выдать прямо отсюда</div></div>
            <a class="card-link" href="${BASE}/users">Все ${icon('arrow-right', 14)}</a>
          </div>
          <div class="people" id="recent-users">${DashboardPage.recentUsers(d.recentUsers.slice(0, 7))}</div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('users')}Новые пользователи</div><div class="card-sub">Регистрации по дням</div></div>
            <span class="badge badge-lime">${fmt(d.kpi.registrations.cur)} за период</span>
          </div>
          <div id="chart-registrations"></div>
        </div>
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('clipboard-check')}Сдача и проверка ДЗ</div><div class="card-sub">Решения по дате последней отправки и проверки по дням</div></div>
            <div class="legend">
              <span class="legend-item"><i class="dot" style="background:var(--lime)"></i>Сдано</span>
              <span class="legend-item"><i class="dot" style="background:var(--green)"></i>Принято</span>
              <span class="legend-item"><i class="dot" style="background:var(--orange)"></i>Правки</span>
            </div>
          </div>
          <div id="chart-homework"></div>
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('clock')}Когда занимаются</div><div class="card-sub">Просмотры страниц по дням недели и часам</div></div>
          </div>
          ${Charts.heatmap(d.heatmap)}
        </div>
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('monitor')}Устройства</div><div class="card-sub">С чего заходят за период — один человек может заходить с разных устройств</div></div>
          </div>
          ${DashboardPage.devices(d.devices)}
        </div>
      </div>

      <div class="grid-2" style="margin-top:16px">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('layout-dashboard')}Популярные разделы</div><div class="card-sub">Просмотры · сколько человек · активное время</div></div>
          </div>
          ${DashboardPage.pages(d.pages)}
        </div>
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('graduation-cap')}Участники лагеря за период</div><div class="card-sub">Какая доля из ${fmt(d.camp.total)} участников что делала</div></div>
          </div>
          ${DashboardPage.camp(d.camp)}
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <div class="card-head">
          <div><div class="card-title">${icon('zap')}Ключевые действия</div><div class="card-sub">Что делали на платформе за период и как это изменилось к предыдущему</div></div>
        </div>
        ${DashboardPage.actions(d.actions)}
      </div>

      <div class="card" style="margin-top:16px" id="weeks-card">${DashboardPage.weeks(d.weeks)}</div>

      <div class="grid-2-1" style="margin-top:16px">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('trending-up')}Самые активные</div><div class="card-sub">По активному времени за период</div></div>
          </div>
          ${DashboardPage.top(d.top)}
        </div>
        <div class="card" id="inactive-card">${DashboardPage.inactive(d.inactive)}</div>
      </div>`

    const xLabel = (day) => dayLabel(day, { short: true })
    const tipTitle = (day) => dayLabel(day, { weekday: true })
    Charts.line($('#chart-activity'), {
      labels: d.days, height: 318, xLabel, tipTitle,
      series: [
        { name: 'Активные', color: 'var(--lime)', values: d.series.activeUsers, area: true },
        { name: 'Визиты', color: 'var(--blue)', values: d.series.sessions },
      ],
    })
    Charts.bars($('#chart-registrations'), {
      labels: d.days, height: 210, xLabel, tipTitle,
      series: [{ name: 'Регистрации', color: 'var(--lime)', values: d.series.registrations }],
    })
    Charts.line($('#chart-homework'), {
      labels: d.days, height: 210, xLabel, tipTitle,
      series: [
        { name: 'Сдано', color: 'var(--lime)', values: d.series.solutions, area: true },
        { name: 'Принято', color: 'var(--green)', values: d.series.approved },
        { name: 'Правки', color: 'var(--orange)', values: d.series.rework, dashed: true },
      ],
    })
  },

  sinceNote(d) {
    if (d.since && daysBetween(d.since, d.from) >= 0) return ''
    const since = d.since ? `с ${dayLabel(d.since)}` : 'с момента обновления платформы'
    return `
      <div class="note" style="margin-bottom:16px">
        ${icon('circle-help', 16)}
        <span>Поведение — визиты, время, разделы, запуски кода, квизы, видео — записывается ${since}, поэтому за ранние дни периода этих данных нет.
        Регистрации, домашние задания, посты, сообщения и записи на созвоны берутся из базы за всё время.</span>
      </div>`
  },

  kpis(d) {
    const k = d.kpi
    const s = d.series
    const card = ({ label, iconName, value, foot = '', spark = null, href = null, accent = false }) => `
      <${href ? `a href="${BASE}${href}"` : 'div'} class="kpi">
        <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon${accent ? ' is-lime' : ''}">${icon(iconName, 15)}</span></div>
        <div class="kpi-value">${value}</div>
        <div class="kpi-foot">${foot}</div>
        ${spark ? `<div class="kpi-spark">${Charts.spark(spark, { width: 220 })}</div>` : ''}
      </${href ? 'a' : 'div'}>`
    const vs = `<span>к прошлым ${d.period} дн.</span>`
    return `<div class="kpi-grid">
      ${card({ label: 'Активны сегодня', iconName: 'activity', value: fmt(k.activeToday), foot: `<span class="nowrap">за 7 дней — <b>${fmt(k.activeWeek)}</b></span><span class="nowrap">за 30 — <b>${fmt(k.activeMonth)}</b></span>`, accent: true })}
      ${card({ label: `Активных за ${d.period} дн.`, iconName: 'users', value: fmt(k.active.cur), foot: deltaHtml(k.active.cur, k.active.prev) + vs, spark: s.activeUsers })}
      ${card({ label: 'Новые пользователи', iconName: 'user-plus', value: fmt(k.registrations.cur), foot: deltaHtml(k.registrations.cur, k.registrations.prev) + vs, spark: s.registrations, href: '/users' })}
      ${card({ label: 'Время на платформе', iconName: 'timer', value: `${String(k.avgMinutes.cur).replace('.', ',')}<small>мин/день</small>`, foot: deltaHtml(k.avgMinutes.cur, k.avgMinutes.prev) + '<span>на одного активного</span>', spark: s.activeMinutes })}
      ${card({ label: 'Сдано решений', iconName: 'send', value: fmt(k.solutions.cur), foot: deltaHtml(k.solutions.cur, k.solutions.prev) + `<span>от ${fmt(k.solutions.students)} ${plural(k.solutions.students, 'студента', 'студентов', 'студентов')}</span>`, spark: s.solutions })}
      ${card({ label: 'Проверено работ', iconName: 'clipboard-check', value: fmt(k.reviews.cur), foot: deltaHtml(k.reviews.cur, k.reviews.prev) + vs, spark: s.approved.map((v, i) => v + s.rework[i]), href: '/homework/stats' })}
      ${card({ label: 'Ждут проверки', iconName: 'inbox', value: fmt(k.pending.count), foot: k.pending.count ? `у ${fmt(k.pending.students)} ${plural(k.pending.students, 'студента', 'студентов', 'студентов')}${k.pending.oldestDays ? ` · старейшая ждёт ${k.pending.oldestDays} ${plural(k.pending.oldestDays, 'день', 'дня', 'дней')}` : ''}` : 'очередь пуста', href: '/homework', accent: k.pending.count > 0 })}
      ${card({ label: 'Участники лагеря', iconName: 'graduation-cap', value: `${fmt(k.campUsers)}<small>из ${fmt(k.users)}</small>`, foot: 'с доступом к Autumn Camp', href: '/users?filter=camp' })}
    </div>`
  },

  recentUsers(list) {
    if (!list.length) return emptyState('users', 'Пока никого', '', true)
    return list.map(u => `
      <div class="person" id="recent-${u.id}">
        <span class="avatar">${esc(initials(u.nickname || u.name))}</span>
        <div class="person-main">
          <div class="person-name">${esc(u.nickname || u.name)}</div>
          <div class="person-sub">${stampLabel(u.createdAt)}</div>
        </div>
        ${u.camp
          ? `<span class="badge badge-orange" title="Есть доступ к осеннему лагерю">${icon('graduation-cap')}лагерь</span>`
          : `<button class="btn btn-tint btn-sm" onclick="DashboardPage.grantCamp(${u.id})" title="Дать доступ к Autumn Camp">${icon('plus', 14)}В лагерь</button>`}
      </div>`).join('')
  },

  async grantCamp(id) {
    const user = DashboardPage.data.recentUsers.find(u => u.id === id)
    if (!user) return
    const ok = await confirmDialog({
      title: 'Дать доступ к лагерю?',
      text: `<b>${esc(user.nickname || user.name)}</b> станет участником Autumn Camp: откроются материалы, сдача ДЗ и созвоны. Доступ появится при следующем открытии платформы.`,
      confirm: 'Дать доступ',
    })
    if (!ok) return
    try {
      await api(`/api/users/${id}/camp`, { method: 'PATCH', body: { autumnCamp: true } })
      user.camp = true
      $('#recent-users').innerHTML = DashboardPage.recentUsers(DashboardPage.data.recentUsers.slice(0, 7))
      toast(`${user.nickname || user.name} — теперь в лагере`)
    } catch (e) { toast(e.message, 'err') }
  },

  devices(list) {
    const total = list.reduce((s, d) => s + d.users, 0)
    if (!total) return emptyState('monitor', 'Нет данных за период', 'Появятся, когда участники зайдут на обновлённую платформу', true)
    const pct = (n) => Math.round((n / total) * 100)
    return `
      <div class="split-bar">${list.map(d => `<div style="width:${(d.users / total) * 100}%;background:${(DEVICE_META[d.device] || DEVICE_META.unknown)[2]}" title="${(DEVICE_META[d.device] || DEVICE_META.unknown)[0]}"></div>`).join('')}</div>
      <div class="device-list">${list.map(d => {
        const [label, ic, color] = DEVICE_META[d.device] || DEVICE_META.unknown
        return `<div class="device-row"><i class="dot" style="background:${color}"></i>${icon(ic, 16)}${label}<b>${fmt(d.users)} ${plural(d.users, 'человек', 'человека', 'человек')}</b><small>${pct(d.users)}%</small></div>`
      }).join('')}</div>
      <div class="card-sub" style="margin-top:14px">Визитов за период: ${fmt(list.reduce((s, d) => s + d.sessions, 0))}</div>`
  },

  pages(list) {
    if (!list.length) return emptyState('layout-dashboard', 'Нет данных за период', 'Появятся, когда участники зайдут на обновлённую платформу', true)
    return Charts.hbars(list.slice(0, 10).map(p => ({
      label: esc(PAGE_LABELS[p.page] || p.page),
      value: p.views,
      sub: `${fmt(p.users)} чел · ${fmt(p.minutes)} мин`,
      title: `${PAGE_LABELS[p.page] || p.page}: ${fmt(p.views)} просмотров, ${fmt(p.users)} человек, ${fmt(p.minutes)} мин активного времени`,
    })))
  },

  camp(c) {
    if (!c.total) return emptyState('graduation-cap', 'В лагере пока нет участников', '', true)
    const pct = (n) => `${Math.round((n / c.total) * 100)}%`
    return Charts.hbars([
      { label: 'Заходили на платформу', value: c.visited, sub: pct(c.visited) },
      { label: 'Открывали материалы', value: c.materials, sub: pct(c.materials) },
      { label: 'Сдавали ДЗ', value: c.submitted, sub: pct(c.submitted), color: 'var(--blue)' },
      { label: 'Получили «принято»', value: c.approved, sub: pct(c.approved), color: 'var(--green)' },
    ], { max: c.total }) + `<div class="card-sub" style="margin-top:14px">Заходы и материалы считаются по новой аналитике, сдача и проверка — по базе.</div>`
  },

  actions(list) {
    const rows = list.map(a => {
      const [label, ic] = ACTION_META[a.key] || [a.key, 'zap']
      let extra = ''
      if (a.key === 'code_run' && a.rate !== null && a.rate !== undefined) extra = `<span class="badge badge-gray">${a.rate}% без ошибок</span>`
      if (a.key === 'quiz_answer' && a.rate !== null && a.rate !== undefined) extra = `<span class="badge badge-gray">${a.rate}% верных</span>`
      return `
        <tr>
          <td><div style="display:flex;align-items:center;gap:10px"><span class="kpi-icon">${icon(ic, 15)}</span><span class="cell-main" style="font-weight:600">${label}</span>${extra}</div></td>
          <td class="r num cell-main">${fmt(a.count)}</td>
          <td class="r num">${fmt(a.users)}</td>
          <td style="width:140px">${Charts.spark(a.series, { width: 130, height: 26 })}</td>
          <td class="r">${deltaHtml(a.count, a.prev)}</td>
        </tr>`
    }).join('')
    return `
      <div class="table-wrap" style="border:none;border-radius:0;margin:0 -20px -20px">
        <table class="tbl">
          <thead><tr><th>Действие</th><th class="r">Раз</th><th class="r">Человек</th><th>По дням</th><th class="r">К прошлому периоду</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`
  },

  weeks(list) {
    const head = `
      <div class="card-head">
        <div><div class="card-title">${icon('book-open')}Материалы и ДЗ по неделям</div><div class="card-sub">За всё время: кто открывал материалы, сколько сдают и как далеко доходят по главам</div></div>
      </div>`
    if (!list.length) return head + emptyState('book-open', 'Пока нет данных', '', true)
    const table = `
      <div class="table-wrap" style="margin-bottom:18px">
        <table class="tbl">
          <thead><tr><th>Неделя</th><th class="r">Открывали материалы</th><th class="r">Сдавали ДЗ</th><th class="r">Решений</th><th class="r">Принято</th><th class="r">Ждут проверки</th></tr></thead>
          <tbody>${list.map(w => `
            <tr class="is-link${w.week === DashboardPage.week ? ' is-active' : ''}" onclick="DashboardPage.pickWeek(${w.week})" title="Показать главы недели">
              <td class="cell-main">Неделя ${w.week}${w.week === DashboardPage.week ? ` <span class="badge badge-lime" style="margin-left:6px">главы ниже</span>` : ''}</td>
              <td class="r num">${w.visitors ? fmt(w.visitors) : '—'}</td>
              <td class="r num">${w.students ? fmt(w.students) : '—'}</td>
              <td class="r num">${w.solutions ? fmt(w.solutions) : '—'}</td>
              <td class="r num">${w.approved ? `<span class="badge badge-green">${fmt(w.approved)}</span>` : '—'}</td>
              <td class="r num">${w.pending ? `<span class="badge badge-lime">${fmt(w.pending)}</span>` : '—'}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
    const week = list.find(w => w.week === DashboardPage.week)
    let chapters = ''
    if (week) {
      const max = Math.max(1, ...week.chapters.map(c => c.users))
      chapters = `
        <div class="card-title" style="font-size:13px;margin-bottom:12px">Неделя ${week.week}: сколько человек открывали каждую главу</div>
        ${week.chapters.length ? `<div class="chapters">${week.chapters.map(c => `
          <div class="chapter-row" title="${esc(c.title)}">
            <span class="chapter-n">${c.n || ''}</span>
            <span class="chapter-title">${esc(c.title)}</span>
            <span class="hbar-track"><span class="hbar-fill" style="width:${((c.users / max) * 100).toFixed(1)}%"></span></span>
            <span class="hbar-value">${fmt(c.users)}</span>
          </div>`).join('')}</div>`
        : `<div class="card-sub">Главы этой недели ещё не открывали после обновления платформы.</div>`}`
    }
    return head + table + chapters
  },

  pickWeek(week) {
    DashboardPage.week = week
    $('#weeks-card').innerHTML = DashboardPage.weeks(DashboardPage.data.weeks)
  },

  top(list) {
    if (!list.length) return emptyState('trending-up', 'Нет данных за период', 'Появятся, когда участники зайдут на обновлённую платформу', true)
    return `
      <div class="table-wrap" style="border:none;border-radius:0;margin:0 -20px -20px">
        <table class="tbl">
          <thead><tr><th>Участник</th><th class="r">Время</th><th class="r">Дней</th><th class="r">Просмотров</th><th class="r">Решений</th></tr></thead>
          <tbody>${list.map((u, i) => `
            <tr>
              <td><div style="display:flex;align-items:center;gap:10px">
                <span class="muted num" style="width:16px">${i + 1}</span>
                <span class="avatar">${esc(initials(u.nickname || u.name))}</span>
                <div style="min-width:0;display:flex;align-items:center;gap:6px">
                  <span class="cell-main">${esc(u.nickname || u.name)}</span>
                  ${u.camp ? `<span style="color:var(--orange)" title="Участник лагеря">${icon('graduation-cap', 14)}</span>` : ''}
                </div>
              </div></td>
              <td class="r num cell-main nowrap">${u.minutes >= 60 ? `${Math.floor(u.minutes / 60)} ч ${u.minutes % 60} мин` : `${u.minutes} мин`}</td>
              <td class="r num">${fmt(u.days)}</td>
              <td class="r num">${fmt(u.views)}</td>
              <td class="r num">${u.solutions ? fmt(u.solutions) : '—'}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
  },

  inactive(list) {
    const shown = DashboardPage.showAllInactive ? list : list.slice(0, 8)
    const head = `
      <div class="card-head">
        <div><div class="card-title">${icon('circle-alert')}Давно не заходили</div><div class="card-sub">Участники лагеря без активности 7+ дней — стоит написать им</div></div>
        ${list.length ? `<span class="badge badge-red">${fmt(list.length)}</span>` : ''}
      </div>`
    if (!list.length) return head + emptyState('circle-check', 'Все участники активны', 'Каждый заходил за последнюю неделю', true)
    return head + `
      <div class="people">${shown.map(u => `
        <div class="person">
          <span class="avatar">${esc(initials(u.nickname || u.name))}</span>
          <div class="person-main">
            <div class="person-name">${esc(u.nickname || u.name)}</div>
            <div class="person-sub">${u.lastDay ? `последняя активность — ${relDay(u.lastDay)}` : 'активности не было ни разу'}</div>
          </div>
          <a class="btn-icon" href="${BASE}/users?q=${encodeURIComponent(u.nickname || '')}" title="Открыть в пользователях">${icon('arrow-right', 16)}</a>
        </div>`).join('')}</div>
      ${list.length > 8 ? `<button class="btn btn-secondary btn-sm" style="margin-top:12px" onclick="DashboardPage.toggleInactive()">${DashboardPage.showAllInactive ? 'Свернуть' : `Показать всех (${fmt(list.length)})`}</button>` : ''}`
  },

  toggleInactive() {
    DashboardPage.showAllInactive = !DashboardPage.showAllInactive
    $('#inactive-card').innerHTML = DashboardPage.inactive(DashboardPage.data.inactive)
  },
}

PAGES.dashboard = DashboardPage
