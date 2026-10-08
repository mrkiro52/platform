'use strict'
// ДЗ второго месяца: задания к главам индивидуальных программ октября.
// Работа приходит единым массивом «вопрос + ответ»; её можно принять, вернуть
// с правками и скачать одним .md-файлом.

const PRG_HW_VARIANTS = { base: 'глава без Python', python: 'глава + Python' }

function prgHwLogin(h) { return h.user.nickname || h.user.name || `#${h.user.id}` }

// Единый .md: «Вопрос: … / Ответ: …» по всем вопросам подряд
function prgHwMarkdown(h) {
  const lines = [
    `# ${h.directionName} · глава ${h.chapter} — задание к главе`,
    '',
    `Студент: ${prgHwLogin(h)}${h.user.name && h.user.name !== h.user.nickname ? ` (${h.user.name})` : ''}`,
  ]
  if (h.variant) lines.push(`Вариант: ${PRG_HW_VARIANTS[h.variant] || h.variant}`)
  if (h.submittedAt) lines.push(`Отправлено: ${stampLabel(h.submittedAt)}`)
  lines.push(`Статус: ${(HW_STATUS[h.status] || HW_STATUS.submitted).label}`, '')
  h.answers.forEach((a, i) => {
    lines.push('---', '', `## Вопрос ${i + 1}`, '', `**Вопрос:** ${a.question}`, '', `**Ответ:** ${a.answer || '— (без ответа)'}`, '')
  })
  return lines.join('\n')
}

const ProgramHomeworkPage = {
  list: [],
  filter: 'pending',
  dir: 'all',

  async render(view, ctx) {
    view.innerHTML = ProgramHomeworkPage.head() + skeleton({ rows: 8 })
    const list = await api('/api/programs/admin/homework')
    if (ctx.stale()) return
    ProgramHomeworkPage.list = list
    const pending = list.filter(h => h.status === 'submitted').length
    const qf = ctx.query.get('filter')
    ProgramHomeworkPage.filter = qf === 'all' || qf === 'pending' ? qf : (pending ? 'pending' : 'all')
    ProgramHomeworkPage.dir = ctx.query.get('dir') || 'all'
    Badges.programHomework = pending
    Shell.paintBadges()
    view.innerHTML = ProgramHomeworkPage.head() + `
      <div class="toolbar">
        <span id="phw-filter"></span>
        <span id="phw-dirs"></span>
        <span class="spacer"></span>
      </div>
      <div id="phw-table"></div>`
    ProgramHomeworkPage.paint()
  },

  head() {
    const pending = ProgramHomeworkPage.list.filter(h => h.status === 'submitted').length
    return pageHead({
      title: 'ДЗ второго месяца',
      sub: ProgramHomeworkPage.list.length
        ? (pending ? `Ждут проверки: ${fmt(pending)} ${plural(pending, 'работа', 'работы', 'работ')}` : 'Все работы проверены')
        : 'Задания к главам индивидуальных программ октября: ответы на вопросы по главе. Сейчас сдаются у направлений Backend и Информационная безопасность',
      actions: `<button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
  },

  setFilter(filter) {
    ProgramHomeworkPage.filter = filter
    Router.setQuery({ filter })
    ProgramHomeworkPage.paint()
  },

  setDir(dir) {
    ProgramHomeworkPage.dir = dir
    Router.setQuery({ dir: dir === 'all' ? null : dir })
    ProgramHomeworkPage.paint()
  },

  paint() {
    const all = ProgramHomeworkPage.list
    const pending = all.filter(h => h.status === 'submitted').length
    $('#phw-filter').innerHTML = seg([
      ['pending', `Ждут проверки <span class="count">${fmt(pending)}</span>`],
      ['all', `Все работы <span class="count">${fmt(all.length)}</span>`],
    ], ProgramHomeworkPage.filter, 'ProgramHomeworkPage.setFilter')
    const dirs = [...new Map(all.map(h => [h.direction, h.directionName])).entries()]
    $('#phw-dirs').innerHTML = dirs.length > 1
      ? seg([['all', 'Все направления'], ...dirs.map(([k, n]) => [k, esc(n)])], ProgramHomeworkPage.dir, 'ProgramHomeworkPage.setDir')
      : ''

    const rows = all.filter(h =>
      (ProgramHomeworkPage.filter === 'all' || h.status === 'submitted') &&
      (ProgramHomeworkPage.dir === 'all' || h.direction === ProgramHomeworkPage.dir))
    const el = $('#phw-table')
    if (!all.length) { el.innerHTML = `<div class="card">${emptyState('inbox', 'Работ пока нет', 'Здесь появятся ответы студентов на вопросы по главам')}</div>`; return }
    if (!rows.length) { el.innerHTML = `<div class="card">${emptyState('circle-check', 'Всё проверено', 'Новых работ нет')}</div>`; return }
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Студент</th><th>Задание</th><th class="r">Ответов</th><th>Отправлено</th><th>Статус</th><th></th></tr></thead>
          <tbody>${rows.map(h => {
            const st = HW_STATUS[h.status] || HW_STATUS.submitted
            const login = prgHwLogin(h)
            return `
              <tr class="is-link" onclick="Router.go('/homework/october/${h.id}')">
                <td><div style="display:flex;align-items:center;gap:11px">
                  <span class="avatar">${esc(initials(login))}</span>
                  <div><div class="cell-main">${esc(login)}</div>${h.user.name && h.user.name !== h.user.nickname ? `<div class="cell-sub">${esc(h.user.name)}</div>` : ''}</div>
                </div></td>
                <td><div class="cell-main">${esc(h.directionName)} · глава ${h.chapter}</div>${h.variant ? `<div class="cell-sub">${esc(PRG_HW_VARIANTS[h.variant] || h.variant)}</div>` : ''}</td>
                <td class="r num">${h.answeredCount ?? h.answersCount} из ${fmt(h.answersCount)}</td>
                <td class="nowrap">${h.submittedAt ? stampLabel(h.submittedAt) : '—'}</td>
                <td><span class="badge ${st.badge}">${st.label}</span></td>
                <td class="actions"><div><a class="btn btn-tint btn-sm" href="${BASE}/homework/october/${h.id}" onclick="event.stopPropagation()">Открыть${icon('arrow-right', 14)}</a></div></td>
              </tr>`
          }).join('')}</tbody>
        </table>
      </div>`
  },
}

const ProgramHomeworkItemPage = {
  current: null,

  async render(view, ctx) {
    const crumb = { path: '/homework/october', label: 'ДЗ второго месяца' }
    view.innerHTML = pageHead({ title: 'Работа', crumb }) + skeleton({ rows: 8 })
    const h = await api(`/api/programs/admin/homework/${Number(ctx.params.id)}`)
    if (ctx.stale()) return
    ProgramHomeworkItemPage.current = h
    ProgramHomeworkItemPage.paint(view)
  },

  paint(view = $('#view')) {
    const h = ProgramHomeworkItemPage.current
    const st = HW_STATUS[h.status] || HW_STATUS.submitted
    const login = prgHwLogin(h)
    view.innerHTML = `
      ${pageHead({
        title: esc(login),
        sub: `${esc(h.directionName)} · глава ${h.chapter}${h.variant ? ` · ${esc(PRG_HW_VARIANTS[h.variant] || h.variant)}` : ''} · ${fmt(h.answers.length)} ${plural(h.answers.length, 'ответ', 'ответа', 'ответов')}${h.submittedAt ? ` · отправлено ${stampLabel(h.submittedAt)}` : ''}`,
        crumb: { path: '/homework/october', label: 'ДЗ второго месяца' },
        actions: `
          <button class="btn btn-secondary" onclick="ProgramHomeworkItemPage.copy()">${icon('copy')}Скопировать</button>
          <button class="btn btn-secondary" onclick="ProgramHomeworkItemPage.download()">${icon('arrow-down')}Скачать .md</button>`,
      })}
      <div class="card phw-review">
        <div class="phw-review-status">
          <span class="badge ${st.badge}">${st.label}</span>
          ${h.reviewedAt ? `<span class="muted">проверено ${stampLabel(h.reviewedAt)}${h.reviewer ? ` · ${esc(h.reviewer)}` : ''}</span>` : ''}
        </div>
        ${h.comment ? `<div class="hw-sub-comment"><b>Правки:</b> ${esc(h.comment)}</div>` : ''}
        ${h.status === 'approved' ? '' : `
          <div class="hw-sub-actions">
            <button class="btn btn-danger btn-sm" onclick="ProgramHomeworkItemPage.openRework()">${icon('undo-2', 14)}Дать правки</button>
            <button class="btn btn-success btn-sm" onclick="ProgramHomeworkItemPage.approve()">${icon('check', 14)}Принять</button>
          </div>
          <div class="hw-sub-rework" id="phw-rework" hidden>
            <textarea id="phw-rework-text" placeholder="Что нужно исправить — студент увидит этот текст"></textarea>
            <div class="hw-sub-actions">
              <button class="btn btn-secondary btn-sm" onclick="$('#phw-rework').hidden = true">Отмена</button>
              <button class="btn btn-primary btn-sm" onclick="ProgramHomeworkItemPage.sendRework()">${icon('send', 14)}Отправить правки</button>
            </div>
          </div>`}
      </div>
      <ol class="phw-answers">
        ${h.answers.map((a, i) => `
          <li class="phw-answer">
            <div class="phw-q"><span class="phw-num">${i + 1}</span><span>${esc(a.question)}</span></div>
            ${a.answer ? `<div class="phw-a">${esc(a.answer)}</div>` : '<div class="phw-a is-empty">Без ответа</div>'}
          </li>`).join('')}
      </ol>`
  },

  copy() { copyText(prgHwMarkdown(ProgramHomeworkItemPage.current)) },

  download() {
    const h = ProgramHomeworkItemPage.current
    const blob = new Blob([prgHwMarkdown(h)], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${prgHwLogin(h).replace(/[^\w.-]+/g, '_')}_${h.direction}_glava${h.chapter}.md`
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  },

  openRework() {
    $('#phw-rework').hidden = false
    $('#phw-rework-text').focus()
  },

  async approve() {
    const h = ProgramHomeworkItemPage.current
    const ok = await confirmDialog({
      title: 'Принять работу?',
      text: `${esc(h.directionName)}, глава ${h.chapter}. Студент получит уведомление, что задание проверено и принято.`,
      confirm: 'Принять',
    })
    if (!ok) return
    await ProgramHomeworkItemPage.review({ status: 'approved' }, 'Работа принята')
  },

  async sendRework() {
    const comment = $('#phw-rework-text').value.trim()
    if (!comment) return toast('Напиши, что исправить', 'err')
    await ProgramHomeworkItemPage.review({ status: 'rework', comment }, 'Правки отправлены')
  },

  async review(body, message) {
    try {
      ProgramHomeworkItemPage.current = await api(`/api/programs/admin/homework/${ProgramHomeworkItemPage.current.id}`, { method: 'PATCH', body })
      toast(message)
      ProgramHomeworkItemPage.paint()
      Shell.refreshBadges()
    } catch (e) { toast(`Не получилось: ${e.message}`, 'err') }
  },
}

PAGES.programHomework = ProgramHomeworkPage
PAGES.programHomeworkItem = ProgramHomeworkItemPage
