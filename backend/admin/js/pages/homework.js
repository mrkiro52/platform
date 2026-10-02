'use strict'
// Домашние задания: список студентов, проверка решений одного студента,
// аналитика проверок по дням.

const HW_STATUS = {
  submitted: { label: 'на проверке', badge: 'badge-lime' },
  approved: { label: 'принято', badge: 'badge-green' },
  rework: { label: 'нужны правки', badge: 'badge-orange' },
}

const HomeworkPage = {
  students: [],
  q: '',
  filter: 'pending',
  sort: 'pending',
  listUrl: '/homework',

  async render(view, ctx) {
    HomeworkPage.q = ctx.query.get('q') || ''
    HomeworkPage.sort = ['approved', 'rework', 'total'].includes(ctx.query.get('sort')) ? ctx.query.get('sort') : 'pending'
    view.innerHTML = HomeworkPage.head() + skeleton({ rows: 10 })
    const students = await api('/api/homework/admin/students')
    if (ctx.stale()) return
    HomeworkPage.students = students
    const pendingTotal = students.reduce((s, x) => s + (x.pending || 0), 0)
    const qf = ctx.query.get('filter')
    HomeworkPage.filter = qf === 'all' || qf === 'pending' ? qf : (pendingTotal ? 'pending' : 'all')
    Badges.homework = pendingTotal
    Shell.paintBadges()
    view.innerHTML = HomeworkPage.head() + `
      <div class="toolbar">
        ${searchBox('hw-q', HomeworkPage.q, 'Поиск по логину или имени', 'HomeworkPage.search')}
        <span id="hw-filter"></span>
        <span class="spacer"></span>
      </div>
      <div id="hw-table"></div>`
    HomeworkPage.paint()
  },

  head() {
    const pending = HomeworkPage.students.reduce((s, x) => s + (x.pending || 0), 0)
    const who = HomeworkPage.students.filter(x => x.pending).length
    return pageHead({
      title: 'Проверка ДЗ',
      sub: HomeworkPage.students.length
        ? (pending ? `Ждут проверки: ${fmt(pending)} ${plural(pending, 'решение', 'решения', 'решений')} у ${fmt(who)} ${plural(who, 'студента', 'студентов', 'студентов')}` : 'Все решения проверены')
        : 'Решения участников осеннего лагеря — принять работу или вернуть с правками',
      actions: `
        ${pending ? `<button class="btn btn-primary" onclick="HomeworkPage.openNext()">${icon('arrow-right')}Начать проверку</button>` : ''}
        <button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
  },

  search: debounce((value) => {
    HomeworkPage.q = value.trim()
    Router.setQuery({ q: HomeworkPage.q })
    HomeworkPage.paint()
  }, 150),

  setFilter(filter) {
    HomeworkPage.filter = filter
    Router.setQuery({ filter })
    HomeworkPage.paint()
  },

  setSort(sort) {
    HomeworkPage.sort = sort
    Router.setQuery({ sort: sort === 'pending' ? null : sort })
    HomeworkPage.paint()
  },

  // Сначала больше работ на проверке; при равенстве — по логину
  ordered(list = HomeworkPage.students, field = HomeworkPage.sort) {
    return [...list].sort((a, b) => (b[field] || 0) - (a[field] || 0) || String(a.nickname).localeCompare(String(b.nickname)))
  },

  openNext(afterId = null) {
    const queue = HomeworkPage.ordered(HomeworkPage.students.filter(s => s.pending && s.id !== afterId), 'pending')
    if (!queue.length) return toast('Непроверенных работ больше нет')
    Router.go(`/homework/${queue[0].id}`)
  },

  paint() {
    const all = HomeworkPage.students
    const withPending = all.filter(s => s.pending).length
    $('#hw-filter').innerHTML = seg([
      ['pending', `Ждут проверки <span class="count">${fmt(withPending)}</span>`],
      ['all', `Все студенты <span class="count">${fmt(all.length)}</span>`],
    ], HomeworkPage.filter, 'HomeworkPage.setFilter')
    HomeworkPage.listUrl = location.pathname.slice(BASE.length) + location.search

    const q = HomeworkPage.q.toLowerCase()
    const rows = HomeworkPage.ordered(all.filter(s =>
      (HomeworkPage.filter === 'all' || s.pending) &&
      (!q || String(s.nickname || '').toLowerCase().includes(q) || String(s.name || '').toLowerCase().includes(q))))

    const el = $('#hw-table')
    if (!all.length) { el.innerHTML = `<div class="card">${emptyState('graduation-cap', 'Участников осеннего лагеря пока нет')}</div>`; return }
    if (!rows.length) {
      el.innerHTML = `<div class="card">${q
        ? emptyState('search', 'Никого не нашли', `По запросу «${esc(HomeworkPage.q)}» совпадений нет`)
        : emptyState('circle-check', 'Всё проверено', 'Новых решений нет — можно выдохнуть')}</div>`
      return
    }
    const sortHead = (key, label) => `
      <th class="sortable r${HomeworkPage.sort === key ? ' active' : ''}" onclick="HomeworkPage.setSort('${key}')" title="Сортировать">${label}${icon('arrow-down', 12)}</th>`
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr>
            <th>Студент</th>
            ${sortHead('total', 'Сдано')}
            ${sortHead('pending', 'На проверке')}
            ${sortHead('approved', 'Принято')}
            ${sortHead('rework', 'Правки')}
            <th></th>
          </tr></thead>
          <tbody>${rows.map(s => `
            <tr class="is-link" onclick="Router.go('/homework/${s.id}')">
              <td>
                <div style="display:flex;align-items:center;gap:11px">
                  <span class="avatar">${esc(initials(s.nickname || s.name))}</span>
                  <div><div class="cell-main">${esc(s.nickname || '—')}</div>${s.name && s.name !== s.nickname ? `<div class="cell-sub">${esc(s.name)}</div>` : ''}</div>
                </div>
              </td>
              <td class="r num">${fmt(s.total)}</td>
              <td class="r">${s.pending ? `<span class="badge badge-lime">${fmt(s.pending)}</span>` : '<span class="muted">—</span>'}</td>
              <td class="r">${s.approved ? `<span class="badge badge-green">${fmt(s.approved)}</span>` : '<span class="muted">—</span>'}</td>
              <td class="r">${s.rework ? `<span class="badge badge-orange">${fmt(s.rework)}</span>` : '<span class="muted">—</span>'}</td>
              <td class="actions"><div><a class="btn btn-tint btn-sm" href="${BASE}/homework/${s.id}" onclick="event.stopPropagation()">Открыть${icon('arrow-right', 14)}</a></div></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
  },
}

const HomeworkStudentPage = {
  current: null,    // { user, submissions }
  week: null,
  order: null,      // замороженный порядок — см. freeze()

  async render(view, ctx) {
    const id = Number(ctx.params.id)
    view.innerHTML = pageHead({ title: 'Студент', crumb: { path: HomeworkPage.listUrl, label: 'Ко всем студентам' } }) + skeleton({ rows: 8 })
    const [current, students] = await Promise.all([
      api(`/api/homework/admin/students/${id}`),
      HomeworkPage.students.length ? Promise.resolve(HomeworkPage.students) : api('/api/homework/admin/students'),
    ])
    if (ctx.stale()) return
    HomeworkPage.students = students
    HomeworkStudentPage.current = current
    const qw = Number(ctx.query.get('week'))
    HomeworkStudentPage.week = qw || null
    HomeworkStudentPage.freeze()
    HomeworkStudentPage.paint(view)
  },

  // Порядок считается один раз — при открытии студента — и дальше не меняется.
  // Иначе подтверждённая задача прыгала бы вниз прямо под курсором, и
  // следующая в списке оказывалась не там, куда смотришь.
  freeze() {
    const REVIEW_ORDER = { submitted: 0, rework: 1, approved: 2 }
    const byReview = (a, b) => (REVIEW_ORDER[a.status] ?? 3) - (REVIEW_ORDER[b.status] ?? 3) || a.taskIndex - b.taskIndex
    const groups = {}
    for (const s of HomeworkStudentPage.current.submissions) {
      const key = `${s.week}:${s.hwNumber}`
      ;(groups[key] = groups[key] || []).push(s)
    }
    const groupRank = {}
    const subRank = {}
    const byWeek = {}
    for (const key of Object.keys(groups)) {
      const week = key.split(':')[0]
      ;(byWeek[week] = byWeek[week] || []).push(key)
      // Внутри задания: сначала непроверенное, потом правки, потом принятое
      ;[...groups[key]].sort(byReview).forEach((s, i) => { subRank[s.id] = i })
    }
    // Задания с непроверенными задачами идут первыми — иначе в неделе из
    // девятнадцати заданий одно свежее теряется в середине списка
    for (const week of Object.keys(byWeek)) {
      const pending = (key) => (groups[key].some(s => s.status === 'submitted') ? 0 : 1)
      byWeek[week]
        .sort((a, b) => pending(a) - pending(b) || Number(a.split(':')[1]) - Number(b.split(':')[1]))
        .forEach((key, i) => { groupRank[key] = i })
    }
    HomeworkStudentPage.order = { groupRank, subRank }
  },

  // Новое, чего не было на момент открытия, встаёт в конец
  rankOfGroup(week, num) { return HomeworkStudentPage.order?.groupRank[`${week}:${num}`] ?? Number.MAX_SAFE_INTEGER },
  rankOfSub(s) { return HomeworkStudentPage.order?.subRank[s.id] ?? Number.MAX_SAFE_INTEGER },

  paint(view = $('#view')) {
    const { user, submissions } = HomeworkStudentPage.current
    const pendingAll = submissions.filter(s => s.status === 'submitted').length
    const weeks = {}
    for (const s of submissions) {
      weeks[s.week] = weeks[s.week] || {}
      ;(weeks[s.week][s.hwNumber] = weeks[s.week][s.hwNumber] || []).push(s)
    }
    const weekNums = Object.keys(weeks).map(Number).sort((a, b) => a - b)
    const pendingOf = (week) => Object.values(weeks[week]).flat().filter(s => s.status === 'submitted').length
    // Неделя по умолчанию — первая, где есть что проверять
    if (!weekNums.includes(HomeworkStudentPage.week)) {
      HomeworkStudentPage.week = weekNums.find(w => pendingOf(w)) || weekNums[0]
    }
    const week = HomeworkStudentPage.week
    const others = HomeworkPage.students.filter(s => s.pending && s.id !== user.id).length
    const login = user.nickname || user.name || ''

    view.innerHTML = `
      ${pageHead({
        title: esc(login),
        sub: `${user.name && user.name !== login ? `${esc(user.name)} · ` : ''}${fmt(submissions.length)} ${plural(submissions.length, 'решение', 'решения', 'решений')}${pendingAll ? ` · ждут проверки: ${pendingAll}` : ' · всё проверено'}`,
        crumb: { path: HomeworkPage.listUrl, label: 'Ко всем студентам' },
        actions: others ? `<button class="btn btn-secondary" onclick="HomeworkPage.openNext(${user.id})">Следующий студент${icon('arrow-right')}</button>` : '',
      })}
      ${!pendingAll && submissions.length ? `
        <div class="next-student">
          <span>${icon('circle-check', 18)}</span>
          <span style="flex:1">У <b>${esc(login)}</b> всё проверено.${others ? ` Ещё ${others} ${plural(others, 'студент ждёт', 'студента ждут', 'студентов ждут')} проверки.` : ' Очередь пуста.'}</span>
          ${others ? `<button class="btn btn-success btn-sm" onclick="HomeworkPage.openNext(${user.id})">Следующий${icon('arrow-right', 14)}</button>` : ''}
        </div>` : ''}
      ${weekNums.length === 0 ? `<div class="card">${emptyState('inbox', 'Этот студент ещё ничего не сдавал')}</div>` : `
        <div class="hw-week-tabs" role="tablist">
          ${weekNums.map(w => {
            const pending = pendingOf(w)
            return `<button role="tab" aria-selected="${w === week}" class="hw-week-tab${w === week ? ' is-active' : ''}" onclick="HomeworkStudentPage.pickWeek(${w})">
              Неделя ${w}${pending ? `<i class="hw-tab-badge">${pending}</i>` : ''}
            </button>`
          }).join('')}
        </div>
        ${Object.keys(weeks[week]).map(Number)
          .sort((a, b) => HomeworkStudentPage.rankOfGroup(week, a) - HomeworkStudentPage.rankOfGroup(week, b) || a - b)
          .map(num => `
            <div class="hw-num-block">
              <div class="hw-num-title">${icon('file-text', 15)}Домашнее задание ${num}${weeks[week][num][0].level ? ` · уровень ${weeks[week][num][0].level}` : ''}</div>
              ${[...weeks[week][num]]
                .sort((a, b) => HomeworkStudentPage.rankOfSub(a) - HomeworkStudentPage.rankOfSub(b) || a.taskIndex - b.taskIndex)
                .map(HomeworkStudentPage.submission).join('')}
            </div>`).join('')}`}`
  },

  pickWeek(week) {
    HomeworkStudentPage.week = week
    Router.setQuery({ week })
    HomeworkStudentPage.paint()
  },

  submission(s) {
    const st = HW_STATUS[s.status] || HW_STATUS.submitted
    return `
      <div class="hw-sub${s.status === 'submitted' ? ' is-pending' : ''}" id="hw-sub-${s.id}">
        <div class="hw-sub-head">
          <span class="hw-sub-num">Задача ${s.taskIndex + 1}</span>
          ${s.solutionKind === 'code' ? `<span class="badge badge-orange">${icon('code')}код · Python</span>` : ''}
          <span class="spacer"></span>
          ${s.submittedAt ? `<span class="updated" title="Отправлено">${stampLabel(s.submittedAt)}</span>` : ''}
          <span class="badge ${st.badge}">${st.label}</span>
        </div>
        <div class="hw-sub-task">${esc(s.taskText || 'Условие не сохранено — решение сдано до того, как условия начали сохраняться')}</div>
        <pre class="hw-sub-code">${esc(s.solution)}</pre>
        ${s.comment ? `<div class="hw-sub-comment"><b>Правки:</b> ${esc(s.comment)}</div>` : ''}
        <div class="hw-sub-actions">
          <button class="btn btn-secondary btn-sm" onclick="HomeworkStudentPage.copy(${s.id})">${icon('copy', 14)}Скопировать</button>
          ${s.status === 'approved' ? '' : `
            <button class="btn btn-danger btn-sm" onclick="HomeworkStudentPage.openRework(${s.id})">${icon('undo-2', 14)}Дать правки</button>
            <button class="btn btn-success btn-sm" onclick="HomeworkStudentPage.confirmApprove(${s.id})">${icon('check', 14)}Принять</button>`}
        </div>
        <div class="hw-sub-rework" id="hw-rework-${s.id}" hidden>
          <textarea id="hw-rework-text-${s.id}" placeholder="Что нужно исправить — студент увидит этот текст"></textarea>
          <div class="hw-sub-actions">
            <button class="btn btn-secondary btn-sm" onclick="HomeworkStudentPage.closeRework(${s.id})">Отмена</button>
            <button class="btn btn-primary btn-sm" onclick="HomeworkStudentPage.sendRework(${s.id})">${icon('send', 14)}Отправить правки</button>
          </div>
        </div>
      </div>`
  },

  find(id) { return (HomeworkStudentPage.current?.submissions || []).find(x => x.id === id) },

  // Условие и решение одним куском: условие, пустая строка, решение
  copy(id) {
    const s = HomeworkStudentPage.find(id)
    if (s) copyText(`${s.taskText || '(условие не сохранено)'}\n\n${s.solution}`)
  },

  openRework(id) {
    $(`#hw-rework-${id}`).hidden = false
    $(`#hw-rework-text-${id}`).focus()
  },

  closeRework(id) { $(`#hw-rework-${id}`).hidden = true },

  // Подтверждение необратимо для студента — спрашиваем, не промах ли это
  async confirmApprove(id) {
    const s = HomeworkStudentPage.find(id)
    if (!s) return
    const ok = await confirmDialog({
      title: 'Принять работу?',
      text: `Домашнее задание ${s.hwNumber} недели ${s.week}, задача ${s.taskIndex + 1}. Студент получит уведомление, что работа проверена и принята.`,
      confirm: 'Принять',
    })
    if (!ok) return
    try {
      await api(`/api/homework/admin/submissions/${id}`, { method: 'PATCH', body: { status: 'approved' } })
      toast('Работа принята')
      await HomeworkStudentPage.refresh()
    } catch (e) { toast(`Не получилось: ${e.message}`, 'err') }
  },

  async sendRework(id) {
    const comment = $(`#hw-rework-text-${id}`).value.trim()
    if (!comment) return toast('Напиши, что исправить', 'err')
    try {
      await api(`/api/homework/admin/submissions/${id}`, { method: 'PATCH', body: { status: 'rework', comment } })
      toast('Правки отправлены')
      await HomeworkStudentPage.refresh()
    } catch (e) { toast(`Не получилось: ${e.message}`, 'err') }
  },

  async refresh() {
    const id = HomeworkStudentPage.current.user.id
    const [current, students] = await Promise.all([
      api(`/api/homework/admin/students/${id}`),
      api('/api/homework/admin/students'),
    ])
    HomeworkStudentPage.current = current
    HomeworkPage.students = students
    Badges.homework = students.reduce((sum, s) => sum + (s.pending || 0), 0)
    Shell.paintBadges()
    const y = window.scrollY
    HomeworkStudentPage.paint()
    window.scrollTo(0, y)
  },
}

const HomeworkStatsPage = {
  async render(view, ctx) {
    const head = pageHead({
      title: 'Аналитика проверки',
      sub: 'Сколько работ проверено по дням — принято и отправлено на правки, с разбивкой по студентам',
      actions: `<button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
    view.innerHTML = head + skeleton({ kpis: 4, rows: 6 })
    const days = await api('/api/homework/admin/analytics')
    if (ctx.stale()) return
    if (!days.length) {
      view.innerHTML = head + `<div class="card">${emptyState('chart-column', 'Проверок пока не было', 'Здесь появится статистика по дням')}</div>`
      return
    }
    const total = days.reduce((s, d) => s + d.total, 0)
    const ok = days.reduce((s, d) => s + d.approved, 0)
    const fix = days.reduce((s, d) => s + d.rework, 0)

    // Последние 30 дней подряд, пустые дни — нулями
    const today = mskDay()
    const range = Array.from({ length: 30 }, (_, i) => addDays(today, i - 29))
    const byDay = new Map(days.map(d => [d.date, d]))

    view.innerHTML = head + `
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-top"><span class="kpi-label">Всего проверено</span><span class="kpi-icon is-lime">${icon('clipboard-check', 15)}</span></div><div class="kpi-value">${fmt(total)}</div></div>
        <div class="kpi"><div class="kpi-top"><span class="kpi-label">Принято</span><span class="kpi-icon">${icon('circle-check', 15)}</span></div><div class="kpi-value" style="color:var(--green)">${fmt(ok)}</div><div class="kpi-foot">${total ? Math.round((ok / total) * 100) : 0}% проверок</div></div>
        <div class="kpi"><div class="kpi-top"><span class="kpi-label">Отправлено на правки</span><span class="kpi-icon">${icon('undo-2', 15)}</span></div><div class="kpi-value" style="color:var(--orange)">${fmt(fix)}</div><div class="kpi-foot">${total ? Math.round((fix / total) * 100) : 0}% проверок</div></div>
        <div class="kpi"><div class="kpi-top"><span class="kpi-label">Дней с проверками</span><span class="kpi-icon">${icon('calendar-check', 15)}</span></div><div class="kpi-value">${fmt(days.length)}</div><div class="kpi-foot">в среднем ${fmt(Math.round(total / days.length))} в день</div></div>
      </div>
      <div class="card" style="margin-top:16px">
        <div class="card-head">
          <div><div class="card-title">${icon('chart-column')}Проверки за 30 дней</div></div>
          <div class="legend">
            <span class="legend-item"><i class="dot" style="background:var(--green)"></i>Принято</span>
            <span class="legend-item"><i class="dot" style="background:var(--orange)"></i>Правки</span>
          </div>
        </div>
        <div id="chart-reviews"></div>
      </div>
      <div class="section-title">По дням</div>
      ${days.map(day => `
        <div class="hwstat-day">
          <div class="hwstat-head">
            <div class="hwstat-date">${dayLabel(day.date, { weekday: true })}</div>
            <div class="hwstat-totals">
              <span class="badge badge-gray">проверено ${fmt(day.total)}</span>
              <span class="badge badge-green">принято ${fmt(day.approved)}</span>
              <span class="badge badge-orange">правки ${fmt(day.rework)}</span>
            </div>
          </div>
          <div class="table-wrap">
            <table class="tbl">
              <thead><tr><th>Студент</th><th class="r">Принято</th><th class="r">Правки</th><th class="r">Всего за день</th></tr></thead>
              <tbody>${day.students.map(s => `
                <tr class="is-link" onclick="Router.go('/homework/${s.id}')">
                  <td><span class="cell-main">${esc(s.nickname || '—')}</span>${s.name && s.name !== s.nickname ? ` <span class="muted">${esc(s.name)}</span>` : ''}</td>
                  <td class="r">${s.approved ? `<span class="badge badge-green">${fmt(s.approved)}</span>` : '<span class="muted">—</span>'}</td>
                  <td class="r">${s.rework ? `<span class="badge badge-orange">${fmt(s.rework)}</span>` : '<span class="muted">—</span>'}</td>
                  <td class="r num">${fmt(s.approved + s.rework)}</td>
                </tr>`).join('')}</tbody>
            </table>
          </div>
        </div>`).join('')}`

    Charts.bars($('#chart-reviews'), {
      labels: range, height: 200,
      xLabel: (d) => dayLabel(d, { short: true }),
      tipTitle: (d) => dayLabel(d, { weekday: true }),
      series: [
        { name: 'Принято', color: 'var(--green)', values: range.map(d => (byDay.get(d) || {}).approved || 0) },
        { name: 'Правки', color: 'var(--orange)', values: range.map(d => (byDay.get(d) || {}).rework || 0) },
      ],
    })
  },
}

PAGES.homework = HomeworkPage
PAGES.homeworkStudent = HomeworkStudentPage
PAGES.homeworkStats = HomeworkStatsPage
