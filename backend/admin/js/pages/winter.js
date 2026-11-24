'use strict'
// Зимний лагерь: проверка домашних заданий и прогресс студентов.
// Работа — ответы студента на вопросы и задачи одной главы: её можно принять,
// вернуть с правками, скопировать и скачать одним .md-файлом. Тесты с автопроверкой
// сюда не попадают — они засчитываются сами.

const WINTER_DIRS = { ml: 'ML', backend: 'Backend', security: 'ИБ' }

function wLogin(h) { return h.user.nickname || h.user.name || `#${h.user.id}` }

function wMarkdown(h) {
  const lines = [
    `# Зимний лагерь · ${h.moduleName} — ${h.title}`,
    '',
    `Студент: ${wLogin(h)}${h.user.name && h.user.name !== h.user.nickname ? ` (${h.user.name})` : ''}`,
    `Направление: ${h.directionName}`,
  ]
  if (h.submittedAt) lines.push(`Отправлено: ${stampLabel(h.submittedAt)}`)
  lines.push(`Статус: ${(HW_STATUS[h.status] || HW_STATUS.submitted).label}`, '')
  h.answers.forEach((a, i) => {
    const code = a.kind === 'code' || a.kind === 'sql'
    lines.push('---', '', `## ${i + 1}`, '', `**Задание:** ${a.question}`, '',
      a.answer ? (code ? '```' + (a.kind === 'sql' ? 'sql' : 'python') + '\n' + a.answer + '\n```' : `**Ответ:** ${a.answer}`) : '**Ответ:** — (без ответа)', '')
  })
  return lines.join('\n')
}

const WinterHomeworkPage = {
  list: [],
  filter: 'pending',
  dir: 'all',
  mod: 'all',

  async render(view, ctx) {
    view.innerHTML = WinterHomeworkPage.head() + skeleton({ rows: 8 })
    const list = await api('/api/winter/admin/homework')
    if (ctx.stale()) return
    WinterHomeworkPage.list = list
    const pending = list.filter(h => h.status === 'submitted').length
    const qf = ctx.query.get('filter')
    WinterHomeworkPage.filter = qf === 'all' || qf === 'pending' ? qf : (pending ? 'pending' : 'all')
    WinterHomeworkPage.dir = ctx.query.get('dir') || 'all'
    WinterHomeworkPage.mod = ctx.query.get('mod') || 'all'
    Badges.winterHomework = pending
    Shell.paintBadges()
    view.innerHTML = WinterHomeworkPage.head() + `
      <div class="toolbar">
        <span id="whw-filter"></span>
        <span id="whw-dirs"></span>
        <span class="spacer"></span>
        <span id="whw-mods"></span>
      </div>
      <div id="whw-table"></div>`
    WinterHomeworkPage.paint()
  },

  head() {
    const pending = WinterHomeworkPage.list.filter(h => h.status === 'submitted').length
    return pageHead({
      title: 'Проверка ДЗ · зимний лагерь',
      sub: WinterHomeworkPage.list.length
        ? (pending ? `Ждут проверки: ${fmt(pending)} ${plural(pending, 'работа', 'работы', 'работ')}` : 'Все работы проверены')
        : 'Работы студентов зимнего лагеря: задачи и ответы на вопросы по главам. Работу можно принять или вернуть с правками',
      actions: `<button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
  },

  setFilter(filter) {
    WinterHomeworkPage.filter = filter
    Router.setQuery({ filter })
    WinterHomeworkPage.paint()
  },

  setDir(dir) {
    WinterHomeworkPage.dir = dir
    Router.setQuery({ dir: dir === 'all' ? null : dir })
    WinterHomeworkPage.paint()
  },

  setMod(mod) {
    WinterHomeworkPage.mod = mod
    Router.setQuery({ mod: mod === 'all' ? null : mod })
    WinterHomeworkPage.paint()
  },

  paint() {
    const all = WinterHomeworkPage.list
    const pending = all.filter(h => h.status === 'submitted').length
    $('#whw-filter').innerHTML = seg([
      ['pending', `Ждут проверки <span class="count">${fmt(pending)}</span>`],
      ['all', `Все работы <span class="count">${fmt(all.length)}</span>`],
    ], WinterHomeworkPage.filter, 'WinterHomeworkPage.setFilter')
    const dirs = [...new Set(all.map(h => h.direction).filter(Boolean))]
    $('#whw-dirs').innerHTML = dirs.length > 1
      ? seg([['all', 'Все направления'], ...dirs.map(k => [k, esc(WINTER_DIRS[k] || k)])], WinterHomeworkPage.dir, 'WinterHomeworkPage.setDir')
      : ''
    const mods = [...new Map(all.map(h => [h.module, h.moduleName])).entries()]
    $('#whw-mods').innerHTML = mods.length > 1 ? `
      <select class="dir-select whw-mod" aria-label="Блок программы" onchange="WinterHomeworkPage.setMod(this.value)">
        <option value="all">Все блоки</option>
        ${mods.map(([k, n]) => `<option value="${esc(k)}" ${WinterHomeworkPage.mod === k ? 'selected' : ''}>${esc(n)}</option>`).join('')}
      </select>` : ''

    const rows = all.filter(h =>
      (WinterHomeworkPage.filter === 'all' || h.status === 'submitted') &&
      (WinterHomeworkPage.dir === 'all' || h.direction === WinterHomeworkPage.dir) &&
      (WinterHomeworkPage.mod === 'all' || h.module === WinterHomeworkPage.mod))
    const el = $('#whw-table')
    if (!all.length) { el.innerHTML = `<div class="card">${emptyState('inbox', 'Работ пока нет', 'Здесь появятся задачи и ответы студентов зимнего лагеря')}</div>`; return }
    if (!rows.length) { el.innerHTML = `<div class="card">${emptyState('circle-check', 'Всё проверено', 'Новых работ нет')}</div>`; return }
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Студент</th><th>Задание</th><th class="r">Ответов</th><th>Отправлено</th><th>Статус</th><th></th></tr></thead>
          <tbody>${rows.map(h => {
            const st = HW_STATUS[h.status] || HW_STATUS.submitted
            const login = wLogin(h)
            return `
              <tr class="is-link" onclick="Router.go('/winter/homework/${h.id}')">
                <td><div style="display:flex;align-items:center;gap:11px">
                  <span class="avatar is-winter">${esc(initials(login))}</span>
                  <div><div class="cell-main">${esc(login)}</div><div class="cell-sub">${esc(WINTER_DIRS[h.direction] || 'без направления')}</div></div>
                </div></td>
                <td><div class="cell-main">${esc(h.title)}</div><div class="cell-sub">${esc(h.moduleName)}</div></td>
                <td class="r num">${h.answeredCount} из ${fmt(h.answersCount)}</td>
                <td class="nowrap">${h.submittedAt ? stampLabel(h.submittedAt) : '—'}</td>
                <td><span class="badge ${st.badge}">${st.label}</span></td>
                <td class="actions"><div><a class="btn btn-tint btn-sm" href="${BASE}/winter/homework/${h.id}" onclick="event.stopPropagation()">Открыть${icon('arrow-right', 14)}</a></div></td>
              </tr>`
          }).join('')}</tbody>
        </table>
      </div>`
  },
}

const WinterHomeworkItemPage = {
  current: null,

  async render(view, ctx) {
    view.innerHTML = pageHead({ title: 'Работа', crumb: WinterHomeworkItemPage.crumb() }) + skeleton({ rows: 8 })
    const h = await api(`/api/winter/admin/homework/${Number(ctx.params.id)}`)
    if (ctx.stale()) return
    WinterHomeworkItemPage.current = h
    WinterHomeworkItemPage.paint(view)
  },

  // Ментору раздел проверки не виден — возвращаем его к студенту
  crumb(h = null) {
    if (Session.scope === 'mentor') return h ? { path: `/winter/students/${h.user.id}`, label: wLogin(h) } : { path: '/winter/students', label: 'Студенты' }
    return { path: '/winter/homework', label: 'Проверка ДЗ · зимний лагерь' }
  },

  paint(view = $('#view')) {
    const h = WinterHomeworkItemPage.current
    const st = HW_STATUS[h.status] || HW_STATUS.submitted
    const login = wLogin(h)
    view.innerHTML = `
      ${pageHead({
        title: esc(login),
        sub: `${esc(h.moduleName)} · ${esc(h.title)} · ${esc(h.directionName)} · ${fmt(h.answers.length)} ${plural(h.answers.length, 'ответ', 'ответа', 'ответов')}${h.submittedAt ? ` · отправлено ${stampLabel(h.submittedAt)}` : ''}`,
        crumb: WinterHomeworkItemPage.crumb(h),
        actions: `
          <button class="btn btn-secondary" onclick="WinterHomeworkItemPage.copy()">${icon('copy')}Скопировать</button>
          <button class="btn btn-secondary" onclick="WinterHomeworkItemPage.download()">${icon('arrow-down')}Скачать .md</button>`,
      })}
      <div class="card phw-review">
        <div class="phw-review-status">
          <span class="badge ${st.badge}">${st.label}</span>
          ${h.reviewedAt ? `<span class="muted">проверено ${stampLabel(h.reviewedAt)}${h.reviewer ? ` · ${esc(h.reviewer)}` : ''}</span>` : ''}
        </div>
        ${h.comment ? `<div class="hw-sub-comment"><b>Правки:</b> ${esc(h.comment)}</div>` : ''}
        ${h.status === 'approved' ? '' : `
          <div class="hw-sub-actions">
            <button class="btn btn-danger btn-sm" onclick="WinterHomeworkItemPage.openRework()">${icon('undo-2', 14)}Дать правки</button>
            <button class="btn btn-success btn-sm" onclick="WinterHomeworkItemPage.approve()">${icon('check', 14)}Принять</button>
          </div>
          <div class="hw-sub-rework" id="whw-rework" hidden>
            <textarea id="whw-rework-text" placeholder="Что нужно исправить — студент увидит этот текст"></textarea>
            <div class="hw-sub-actions">
              <button class="btn btn-secondary btn-sm" onclick="$('#whw-rework').hidden = true">Отмена</button>
              <button class="btn btn-primary btn-sm" onclick="WinterHomeworkItemPage.sendRework()">${icon('send', 14)}Отправить правки</button>
            </div>
          </div>`}
      </div>
      <ol class="phw-answers is-winter">
        ${h.answers.map((a, i) => `
          <li class="phw-answer">
            <div class="phw-q"><span class="phw-num">${i + 1}</span><span>${esc(a.question)}</span></div>
            ${a.answer
              ? (a.kind === 'code' || a.kind === 'sql' ? `<pre class="hw-sub-code whw-code">${esc(a.answer)}</pre>` : `<div class="phw-a">${esc(a.answer)}</div>`)
              : '<div class="phw-a is-empty">Без ответа</div>'}
          </li>`).join('')}
      </ol>`
  },

  copy() { copyText(wMarkdown(WinterHomeworkItemPage.current)) },

  download() {
    const h = WinterHomeworkItemPage.current
    const blob = new Blob([wMarkdown(h)], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${wLogin(h).replace(/[^\w.-]+/g, '_')}_winter_${h.key.replace(/[^\w.-]+/g, '_')}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  },

  openRework() {
    $('#whw-rework').hidden = false
    $('#whw-rework-text').focus()
  },

  async approve() {
    const h = WinterHomeworkItemPage.current
    const ok = await confirmDialog({
      title: 'Принять работу?',
      text: `${esc(h.moduleName)} · ${esc(h.title)}. Студент получит уведомление, что задание проверено и принято.`,
      confirm: 'Принять',
    })
    if (!ok) return
    await WinterHomeworkItemPage.review({ status: 'approved' }, 'Работа принята')
  },

  async sendRework() {
    const comment = $('#whw-rework-text').value.trim()
    if (!comment) return toast('Напиши, что исправить', 'err')
    await WinterHomeworkItemPage.review({ status: 'rework', comment }, 'Правки отправлены')
  },

  async review(body, message) {
    try {
      WinterHomeworkItemPage.current = await api(`/api/winter/admin/homework/${WinterHomeworkItemPage.current.id}`, { method: 'PATCH', body })
      toast(message)
      WinterHomeworkItemPage.paint()
      Shell.refreshBadges()
    } catch (e) { toast(`Не получилось: ${e.message}`, 'err') }
  },
}

// ═══ Студенты зимнего лагеря ═══════════════════════════════════════════
// Главному админу и проверяющему видны все студенты, ментору — только его направления
// (сервер сам сужает выборку). Здесь же календарь личных созвонов: ментор назначает созвон
// студенту, и тот видит его в календаре лагеря.

const WINTER_DIR_NAMES = { ml: 'Машинное обучение', backend: 'Backend-разработка', security: 'Информационная безопасность' }
const WCAL_WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

function wStudentLogin(s) { return s.nickname || s.name || `#${s.id}` }
const wMonday = (day) => addDays(day, -((dayDate(day).getUTCDay() + 6) % 7))

function wKpi(label, value, iconName, foot = '', lime = false) {
  return `
    <div class="kpi">
      <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon${lime ? ' is-lime' : ''}">${icon(iconName, 16)}</span></div>
      <div class="kpi-value">${value}</div>
      <div class="kpi-foot">${foot}</div>
    </div>`
}

// Календарь созвонов на неделю: семь колонок, в каждой — созвоны дня
const WinterCalls = {
  calls: [],
  week: '',
  onChange: null,

  card(calls, onChange) {
    WinterCalls.calls = calls
    WinterCalls.onChange = onChange
    const today = mskDay()
    const next = calls.find(c => c.date >= today)
    WinterCalls.week = WinterCalls.week || wMonday(next ? next.date : today)
    return `<section class="card wcal" id="wcal">${WinterCalls.inner()}</section>`
  },

  inner() {
    const week = WinterCalls.week
    const today = mskDay()
    const days = Array.from({ length: 7 }, (_, i) => addDays(week, i))
    const upcoming = WinterCalls.calls.filter(c => c.date >= today).length
    const range = `${dayLabel(days[0], { short: true })} — ${dayLabel(days[6], { short: true })}`
    return `
      <div class="wcal-head">
        <div>
          <div class="card-title">Календарь созвонов</div>
          <div class="muted wcal-sub">${upcoming ? `Впереди: ${fmt(upcoming)} ${plural(upcoming, 'созвон', 'созвона', 'созвонов')}` : 'Впереди созвонов нет'}</div>
        </div>
        <div class="wcal-nav">
          <button class="btn-icon is-bordered" onclick="WinterCalls.shift(-1)" aria-label="Предыдущая неделя">${icon('chevron-left', 17)}</button>
          <button class="btn btn-secondary btn-sm" onclick="WinterCalls.shift(0)">Сегодня</button>
          <button class="btn-icon is-bordered" onclick="WinterCalls.shift(1)" aria-label="Следующая неделя">${icon('chevron-right', 17)}</button>
          <span class="wcal-range">${range}</span>
          <button class="btn btn-primary btn-sm" onclick="WinterCalls.open()">${icon('plus', 14)}Назначить созвон</button>
        </div>
      </div>
      <div class="wcal-grid">
        ${days.map((day, i) => {
          const list = WinterCalls.calls.filter(c => c.date === day)
          return `
            <div class="wcal-day${day === today ? ' is-today' : ''}${day < today ? ' is-past' : ''}">
              <div class="wcal-day-head"><span>${WCAL_WD[i]}</span><b>${Number(day.slice(8))}</b></div>
              ${list.map(c => `
                <button class="wcal-call" onclick="WinterCalls.show(${c.id})" title="${esc(c.topic || 'Созвон')}">
                  <span class="wcal-time">${esc(c.time)} · ${fmt(c.duration)} мин</span>
                  <span class="wcal-who">${esc(wStudentLogin(c.user))}</span>
                  ${c.topic ? `<span class="wcal-topic">${esc(c.topic)}</span>` : ''}
                  ${Session.scope !== 'mentor' ? `<span class="wcal-topic">ментор ${esc(c.mentor)}</span>` : ''}
                </button>`).join('')}
            </div>`
        }).join('')}
      </div>`
  },

  shift(dir) {
    WinterCalls.week = dir ? addDays(WinterCalls.week, dir * 7) : wMonday(mskDay())
    const el = $('#wcal')
    if (el) el.innerHTML = WinterCalls.inner()
  },

  show(id) {
    const c = WinterCalls.calls.find(x => x.id === id)
    if (!c) return
    const mine = Session.scope !== 'mentor' || c.mentor === Session.username
    Modal.open(`
      ${modalHead('Созвон с ментором', `${esc(dayLabel(c.date, { weekday: true }))} · ${esc(c.time)} МСК · ${fmt(c.duration)} мин`)}
      <div class="modal-text">
        <p><b>Студент:</b> <a href="${BASE}/winter/students/${c.user.id}" onclick="Modal.close()">${esc(wStudentLogin(c.user))}</a></p>
        <p><b>Ментор:</b> ${esc(c.mentor)}</p>
        ${c.topic ? `<p><b>Тема:</b> ${esc(c.topic)}</p>` : ''}
        ${c.link ? `<p><b>Ссылка:</b> <a href="${esc(c.link)}" target="_blank" rel="noopener noreferrer">${esc(c.link)}</a></p>` : ''}
      </div>
      <div class="modal-actions">
        ${mine ? `<button class="btn btn-danger" onclick="WinterCalls.cancel(${c.id})">${icon('x', 14)}Отменить созвон</button>` : ''}
        <button class="btn btn-secondary" onclick="Modal.close()">Закрыть</button>
      </div>`)
  },

  async cancel(id) {
    Modal.close()
    const ok = await confirmDialog({ title: 'Отменить созвон?', text: 'Студент получит уведомление, созвон пропадёт из его календаря.', confirm: 'Отменить созвон', cancel: 'Не отменять', danger: true })
    if (!ok) return
    try {
      await api(`/api/winter/admin/calls/${id}`, { method: 'DELETE' })
      toast('Созвон отменён')
      WinterCalls.onChange && WinterCalls.onChange()
    } catch (e) { toast(`Не получилось: ${e.message}`, 'err') }
  },

  // students — кого можно выбрать; studentId — выбран заранее (со страницы студента)
  async open(studentId = null, students = null) {
    let list = students || WinterStudentsPage.list
    if (!list || !list.length) {
      try { list = await api('/api/winter/admin/students') } catch (e) { return toast(`Не получилось: ${e.message}`, 'err') }
    }
    if (!list.length) return toast('Студентов пока нет', 'err')
    const today = mskDay()
    Modal.open(`
      ${modalHead('Назначить созвон', 'Созвон появится в твоём календаре и в календаре лагеря у студента')}
      <form id="wcall-form" autocomplete="off">
        <div class="field">
          <label for="wcall-user">Студент</label>
          <select id="wcall-user" required>
            ${studentId ? '' : '<option value="">Выбери студента</option>'}
            ${list.map(s => `<option value="${s.id}" ${s.id === studentId ? 'selected' : ''}>${esc(wStudentLogin(s))}${s.name && s.name !== s.nickname ? ` · ${esc(s.name)}` : ''}</option>`).join('')}
          </select>
        </div>
        <div class="form-row">
          <div class="field"><label for="wcall-date">Дата</label><input id="wcall-date" type="date" min="${today}" value="${addDays(today, 1)}" required/></div>
          <div class="field"><label for="wcall-time">Время, МСК</label><input id="wcall-time" type="time" value="19:00" step="300" required/></div>
        </div>
        <div class="field">
          <label for="wcall-dur">Длительность</label>
          <select id="wcall-dur">${[15, 30, 45, 60, 90].map(m => `<option value="${m}" ${m === 30 ? 'selected' : ''}>${m} минут</option>`).join('')}</select>
        </div>
        <div class="field"><label for="wcall-topic">Тема <span class="muted">— по желанию</span></label><input id="wcall-topic" maxlength="300" placeholder="Например: разбор домашки по ансамблям"/></div>
        <div class="field"><label for="wcall-link">Ссылка на созвон <span class="muted">— по желанию</span></label><input id="wcall-link" type="url" maxlength="500" placeholder="https://telemost.yandex.ru/..."/></div>
        <div class="modal-actions">
          <button type="button" class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
          <button type="submit" class="btn btn-primary" id="wcall-save">${icon('check', 14)}Назначить</button>
        </div>
      </form>`)
    $('#wcall-form').addEventListener('submit', WinterCalls.save)
  },

  async save(e) {
    e.preventDefault()
    const body = {
      userId: Number($('#wcall-user').value),
      date: $('#wcall-date').value,
      time: $('#wcall-time').value,
      duration: Number($('#wcall-dur').value),
      topic: $('#wcall-topic').value.trim(),
      link: $('#wcall-link').value.trim(),
    }
    if (!body.userId) return toast('Выбери студента', 'err')
    const btn = $('#wcall-save')
    btn.disabled = true
    try {
      const call = await api('/api/winter/admin/calls', { method: 'POST', body })
      Modal.close()
      toast('Созвон назначен — студент получил уведомление')
      WinterCalls.week = wMonday(call.date)
      WinterCalls.onChange && WinterCalls.onChange()
    } catch (err) {
      btn.disabled = false
      toast(`Не получилось: ${err.message}`, 'err')
    }
  },
}

const WinterStudentsPage = {
  list: [],

  head(sub) {
    const dir = Session.scope === 'mentor' ? WINTER_DIR_NAMES[Session.direction] : ''
    return pageHead({
      title: dir ? `Студенты · ${esc(dir)}` : 'Студенты · зимний лагерь',
      sub,
      actions: `
        <button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>
        ${Session.isMain ? `<a class="btn btn-secondary" href="${BASE}/users?filter=winter">${icon('users')}Выдать доступ</a>` : ''}`,
    })
  },

  async render(view, ctx) {
    view.innerHTML = WinterStudentsPage.head('') + skeleton({ rows: 8, kpis: 4 })
    const [list, calls] = await Promise.all([api('/api/winter/admin/students'), api('/api/winter/admin/calls')])
    if (ctx.stale()) return
    WinterStudentsPage.list = list
    const sum = k => list.reduce((n, s) => n + (s[k] || 0), 0)
    const today = mskDay()
    const upcoming = calls.filter(c => c.date >= today).length
    const noDir = list.filter(s => !s.direction).length
    const showDir = Session.scope !== 'mentor'
    const pending = sum('pending')
    Badges.winterHomework = pending
    Shell.paintBadges()

    view.innerHTML = WinterStudentsPage.head(list.length
      ? `${fmt(list.length)} ${plural(list.length, 'студент', 'студента', 'студентов')}${noDir && showDir ? ` · без направления: ${noDir}` : ''}`
      : 'Пока никого') + `
      <div class="kpi-grid wst-kpis">
        ${wKpi('Ждут проверки', fmt(pending), 'inbox', pending ? 'открой студента и проверь работы' : 'всё проверено', !!pending)}
        ${wKpi('Сдано работ', fmt(sum('sent')), 'send', 'всего отправлено студентами')}
        ${wKpi('Принято', fmt(sum('approved') + sum('bonus')), 'circle-check', sum('rework') ? `с правками: ${fmt(sum('rework'))}` : 'правок нет')}
        ${wKpi('Созвонов впереди', fmt(upcoming), 'calendar-days', `всего назначено: ${fmt(calls.length)}`)}
      </div>
      ${WinterCalls.card(calls, () => Router.reload())}
      ${list.length ? `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr>
            <th>Студент</th>${showDir ? '<th>Направление</th>' : ''}<th>Прогресс</th>
            <th class="r">Сдано</th><th class="r">На проверке</th><th class="r">Принято</th><th class="r">Правки</th>
            <th>Последняя сдача</th><th></th>
          </tr></thead>
          <tbody>${list.map(s => {
            const login = wStudentLogin(s)
            const pct = s.total ? Math.min(100, Math.round((s.approved / s.total) * 100)) : 0
            return `
              <tr class="is-link" onclick="Router.go('/winter/students/${s.id}')">
                <td><div style="display:flex;align-items:center;gap:11px">
                  <span class="avatar is-winter">${esc(initials(login))}</span>
                  <div><div class="cell-main">${esc(login)}</div>${s.name && s.name !== s.nickname ? `<div class="cell-sub">${esc(s.name)}</div>` : ''}</div>
                </div></td>
                ${showDir ? `<td>${s.directionName ? esc(s.directionName) : '<span class="badge badge-orange">не выбрано</span>'}</td>` : ''}
                <td>
                  <div class="wst-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${s.total}" aria-valuenow="${s.approved}"><span style="width:${pct}%"></span></div>
                  <div class="cell-sub">принято ${fmt(s.approved)}${s.total ? ` из ${fmt(s.total)}` : ''}${s.bonus ? ` · сверх программы ${fmt(s.bonus)}` : ''}</div>
                </td>
                <td class="r num">${s.sent ? fmt(s.sent) : '<span class="muted">—</span>'}</td>
                <td class="r num">${s.pending ? `<span class="badge badge-lime">${fmt(s.pending)}</span>` : '<span class="muted">—</span>'}</td>
                <td class="r num">${s.approved + s.bonus ? fmt(s.approved + s.bonus) : '<span class="muted">—</span>'}</td>
                <td class="r num">${s.rework ? fmt(s.rework) : '<span class="muted">—</span>'}</td>
                <td class="nowrap">${s.lastAt ? stampLabel(s.lastAt) : '<span class="muted">ещё не сдавал</span>'}</td>
                <td class="actions"><div>
                  <button class="btn btn-secondary btn-sm" onclick="event.stopPropagation(); WinterCalls.open(${s.id})">${icon('calendar-plus', 14)}Созвон</button>
                </div></td>
              </tr>`
          }).join('')}</tbody>
        </table>
      </div>` : `<div class="card">${emptyState('users', 'Студентов пока нет', Session.scope === 'mentor' ? 'Здесь появятся студенты твоего направления' : 'Доступ к зимнему лагерю и направление выдаются в разделе «Пользователи»')}</div>`}`
  },
}

// Студент: его работы (проверка — по клику) и личные созвоны
const WinterStudentPage = {
  async render(view, ctx) {
    const crumb = { path: '/winter/students', label: 'Студенты' }
    view.innerHTML = pageHead({ title: 'Студент', crumb }) + skeleton({ rows: 8, kpis: 4 })
    const s = await api(`/api/winter/admin/students/${Number(ctx.params.id)}`)
    if (ctx.stale()) return
    const login = wStudentLogin(s)
    const quiz = s.works.filter(w => w.kind === 'quiz')
    const auto = s.works.filter(w => w.kind === 'auto')
    const count = st => s.works.filter(w => w.status === st).length
    const approved = count('approved')
    const today = mskDay()
    const calls = s.calls.map(c => ({ ...c, user: { id: s.id, nickname: s.nickname, name: s.name } }))
    const upcoming = calls.filter(c => c.date >= today)

    view.innerHTML = `
      ${pageHead({
        title: esc(login),
        sub: `${s.name && s.name !== s.nickname ? `${esc(s.name)} · ` : ''}${esc(s.directionName || 'направление не выбрано')}`,
        crumb,
        actions: `<button class="btn btn-primary" onclick="WinterCalls.open(${s.id}, [WinterStudentPage.student])">${icon('calendar-plus')}Назначить созвон</button>`,
      })}
      <div class="kpi-grid wst-kpis">
        ${wKpi('Сдано', fmt(s.works.length), 'send', `заданий ${fmt(quiz.length)} · тестов ${fmt(auto.length)}`)}
        ${wKpi('Нужно проверить', fmt(count('submitted')), 'inbox', count('submitted') ? 'ждут твоего решения' : 'всё проверено', !!count('submitted'))}
        ${wKpi('Принято', fmt(approved), 'circle-check', s.total ? `в программе направления — ${fmt(s.total)}` : '')}
        ${wKpi('Правки', fmt(count('rework') + count('failed')), 'undo-2', count('failed') ? `тестов не пройдено: ${fmt(count('failed'))}` : 'вернули на доработку')}
      </div>
      <section class="card wst-calls">
        <div class="card-title">Созвоны с ментором</div>
        ${upcoming.length || calls.length ? `
          <div class="wst-call-list">
            ${(upcoming.length ? upcoming : calls.slice(-3)).map(c => `
              <button class="wcal-call is-row${c.date < today ? ' is-past' : ''}" onclick="WinterCalls.show(${c.id})">
                <span class="wcal-time">${esc(dayLabel(c.date, { weekday: true }))} · ${esc(c.time)} МСК · ${fmt(c.duration)} мин</span>
                <span class="wcal-topic">${c.topic ? esc(c.topic) : 'без темы'} · ментор ${esc(c.mentor)}</span>
              </button>`).join('')}
          </div>
          ${!upcoming.length ? '<div class="muted wcal-sub">Впереди созвонов нет — показаны прошедшие</div>' : ''}`
        : `<div class="muted wcal-sub">Созвонов пока не было</div>`}
      </section>
      ${s.works.length ? `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Задание</th><th class="r">Ответов</th><th>Отправлено</th><th>Статус</th><th></th></tr></thead>
          <tbody>${s.works.map(h => {
            const st = h.kind === 'auto'
              ? (h.status === 'approved' ? { badge: 'badge-green', label: 'тест пройден' } : { badge: 'badge-orange', label: 'тест не пройден' })
              : (HW_STATUS[h.status] || HW_STATUS.submitted)
            const open = h.kind === 'quiz'
            return `
              <tr class="${open ? 'is-link' : ''}" ${open ? `onclick="Router.go('/winter/homework/${h.id}')"` : ''}>
                <td><div class="cell-main">${esc(h.title)}</div><div class="cell-sub">${esc(h.moduleName)}</div></td>
                <td class="r num">${h.kind === 'auto' ? `${fmt(h.score)} из ${fmt(h.total)}` : `${h.answeredCount} из ${fmt(h.answersCount)}`}</td>
                <td class="nowrap">${h.submittedAt ? stampLabel(h.submittedAt) : '—'}</td>
                <td><span class="badge ${st.badge}">${st.label}</span></td>
                <td class="actions"><div>${open ? `<a class="btn btn-tint btn-sm" href="${BASE}/winter/homework/${h.id}" onclick="event.stopPropagation()">${h.status === 'submitted' ? 'Проверить' : 'Открыть'}${icon('arrow-right', 14)}</a>` : '<span class="muted">автопроверка</span>'}</div></td>
              </tr>`
          }).join('')}</tbody>
        </table>
      </div>` : `<div class="card">${emptyState('inbox', 'Работ пока нет', 'Здесь появятся задания, которые студент отправит на платформе')}</div>`}`
    WinterStudentPage.student = { id: s.id, nickname: s.nickname, name: s.name }
    WinterCalls.calls = calls
    WinterCalls.onChange = () => Router.reload()
  },
}

PAGES.winterHomework = WinterHomeworkPage
PAGES.winterHomeworkItem = WinterHomeworkItemPage
PAGES.winterStudents = WinterStudentsPage
PAGES.winterStudent = WinterStudentPage

PAGES.entrance = {
  async render(view, ctx) {
    const rows = await api('/api/entrance/results')
    if (ctx.stale()) return
    view.innerHTML = pageHead({ title: 'Входное тестирование' })
    if (!rows.length) view.insertAdjacentHTML('beforeend', '<p>Пока никто не отправил ответы.</p>')
    for (const row of rows) {
      const track = WINTER_DIRS[row.track] || 'Общее тестирование'
      const markdown = [`# Входное тестирование · ${row.nickname}`, track,
        ...row.responses.map((r, i) => `## ${i + 1}. ${r.topic}\n\n${r.question}\n\n${r.answer}`)].join('\n\n')
      const card = document.createElement('section')
      card.className = 'card'
      card.innerHTML = `<h2>${esc(row.nickname)}</h2><p>${esc(track)} · ${esc(stampLabel(row.submitted_at))}</p>
        <button class="btn btn-secondary" type="button">Скопировать</button>
        <button class="btn btn-secondary" type="button">Скачать .md</button>
        <details><summary>Вопросы и ответы</summary><pre style="white-space:pre-wrap"></pre></details>`
      card.querySelector('pre').textContent = markdown
      const [copy, download] = card.querySelectorAll('button')
      copy.onclick = () => copyText(markdown)
      download.onclick = () => {
        const url = URL.createObjectURL(new Blob([markdown], { type: 'text/markdown;charset=utf-8' }))
        const link = document.createElement('a')
        link.href = url
        link.download = `${row.nickname}_entrance.md`
        link.click()
        setTimeout(() => URL.revokeObjectURL(url), 1000)
      }
      view.append(card)
    }
  },
}
