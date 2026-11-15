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
    const crumb = { path: '/winter/homework', label: 'Проверка ДЗ · зимний лагерь' }
    view.innerHTML = pageHead({ title: 'Работа', crumb }) + skeleton({ rows: 8 })
    const h = await api(`/api/winter/admin/homework/${Number(ctx.params.id)}`)
    if (ctx.stale()) return
    WinterHomeworkItemPage.current = h
    WinterHomeworkItemPage.paint(view)
  },

  paint(view = $('#view')) {
    const h = WinterHomeworkItemPage.current
    const st = HW_STATUS[h.status] || HW_STATUS.submitted
    const login = wLogin(h)
    view.innerHTML = `
      ${pageHead({
        title: esc(login),
        sub: `${esc(h.moduleName)} · ${esc(h.title)} · ${esc(h.directionName)} · ${fmt(h.answers.length)} ${plural(h.answers.length, 'ответ', 'ответа', 'ответов')}${h.submittedAt ? ` · отправлено ${stampLabel(h.submittedAt)}` : ''}`,
        crumb: { path: '/winter/homework', label: 'Проверка ДЗ · зимний лагерь' },
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

// Студенты зимнего лагеря: направление и прогресс по домашним заданиям
const WinterStudentsPage = {
  async render(view, ctx) {
    const head = (sub) => pageHead({
      title: 'Студенты · зимний лагерь',
      sub,
      actions: Session.isMain ? `<a class="btn btn-secondary" href="${BASE}/users?filter=winter">${icon('users')}Выдать доступ</a>` : '',
    })
    view.innerHTML = head('') + skeleton({ rows: 8 })
    const list = await api('/api/winter/admin/students')
    if (ctx.stale()) return
    if (!list.length) {
      view.innerHTML = head('Пока никого') + `<div class="card">${emptyState('users', 'Студентов пока нет', 'Доступ к зимнему лагерю и направление выдаются в разделе «Пользователи»')}</div>`
      return
    }
    const noDir = list.filter(s => !s.direction).length
    view.innerHTML = head(`${fmt(list.length)} ${plural(list.length, 'студент', 'студента', 'студентов')}${noDir ? ` · без направления: ${noDir}` : ''}`) + `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Студент</th><th>Направление</th><th>Домашние задания</th><th class="r">На проверке</th><th class="r">Правки</th><th>Последняя сдача</th></tr></thead>
          <tbody>${list.map(s => {
            const login = s.nickname || s.name || `#${s.id}`
            const pct = s.total ? Math.min(100, Math.round((s.approved / s.total) * 100)) : 0
            return `
              <tr>
                <td><div style="display:flex;align-items:center;gap:11px">
                  <span class="avatar is-winter">${esc(initials(login))}</span>
                  <div><div class="cell-main">${esc(login)}</div>${s.name && s.name !== s.nickname ? `<div class="cell-sub">${esc(s.name)}</div>` : ''}</div>
                </div></td>
                <td>${s.directionName ? esc(s.directionName) : '<span class="badge badge-orange">не выбрано</span>'}</td>
                <td>
                  <div class="wst-bar" role="progressbar" aria-valuemin="0" aria-valuemax="${s.total}" aria-valuenow="${s.approved}"><span style="width:${pct}%"></span></div>
                  <div class="cell-sub">принято ${fmt(s.approved)}${s.total ? ` из ${fmt(s.total)}` : ''}${s.bonus ? ` · сверх программы ${fmt(s.bonus)}` : ''}</div>
                </td>
                <td class="r num">${s.pending ? `<a class="badge badge-lime" href="${BASE}/winter/homework?filter=pending">${fmt(s.pending)}</a>` : '<span class="muted">—</span>'}</td>
                <td class="r num">${s.rework ? fmt(s.rework) : '<span class="muted">—</span>'}</td>
                <td class="nowrap">${s.lastAt ? stampLabel(s.lastAt) : '<span class="muted">ещё не сдавал</span>'}</td>
              </tr>`
          }).join('')}</tbody>
        </table>
      </div>`
  },
}

PAGES.winterHomework = WinterHomeworkPage
PAGES.winterHomeworkItem = WinterHomeworkItemPage
PAGES.winterStudents = WinterStudentsPage
