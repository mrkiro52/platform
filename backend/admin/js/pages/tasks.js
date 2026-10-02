'use strict'
// Задачи админов. Главный ставит задачи и подтверждает выполнение,
// помощники ведут свои задачи по доске: «Не начата» → «В работе» → «Выполнена».

const TASK_STATUSES = [
  { key: 'todo', label: 'Не начата', icon: 'circle', badge: 'badge-gray', hint: 'Задача поставлена, работа ещё не начата' },
  { key: 'in_progress', label: 'В работе', icon: 'circle-play', badge: 'badge-blue', hint: 'Исполнитель занимается задачей' },
  { key: 'done', label: 'Выполнена', icon: 'circle-check', badge: 'badge-lime', hint: 'Готово — ждёт подтверждения главного админа' },
  { key: 'approved', label: 'Подтверждена', icon: 'badge-check', badge: 'badge-green', hint: 'Главный админ проверил и принял работу' },
]
const statusMeta = (key) => TASK_STATUSES.find(s => s.key === key) || TASK_STATUSES[0]

const TasksPage = {
  me: null,
  tasks: [],
  admins: [],
  assignee: 'all',
  showAllApproved: false,
  dragId: null,

  async render(view, ctx) {
    TasksPage.assignee = ctx.query.get('assignee') || 'all'
    TasksPage.showAllApproved = false
    view.innerHTML = pageHead({ title: Session.isMain ? 'Задачи' : 'Мои задачи' }) + skeleton({ rows: 8 })
    const [{ me, tasks }, admins] = await Promise.all([api('/api/admin-tasks'), api('/api/admin-tasks/admins')])
    if (ctx.stale()) return
    TasksPage.me = me
    TasksPage.tasks = tasks
    TasksPage.admins = admins
    if (!admins.some(a => a.username === TasksPage.assignee)) TasksPage.assignee = 'all'
    view.innerHTML = TasksPage.head() + '<div id="tasks-team"></div><div id="tasks-board"></div>'
    TasksPage.paint()
  },

  head() {
    const main = TasksPage.me.isMain
    return pageHead({
      title: main ? 'Задачи' : 'Мои задачи',
      sub: main
        ? 'Ставь задачи помощникам и принимай выполненные. Помощник сам двигает задачу до «Выполнена», подтверждаешь ты'
        : 'Задачи от главного админа. Меняй статус по ходу работы — перетаскивай карточку или открой её. «Подтверждена» ставит главный админ после проверки',
      actions: main ? `<button class="btn btn-primary" onclick="TasksPage.openForm(null)">${icon('plus')}Новая задача</button>` : '',
    })
  },

  // ── Данные ──
  today: () => mskDay(),
  isOverdue(t) { return !!t.deadline && t.deadline < TasksPage.today() && (t.status === 'todo' || t.status === 'in_progress') },
  find(id) { return TasksPage.tasks.find(t => t.id === id) },
  adminLabel(username) {
    const a = TasksPage.admins.find(x => x.username === username)
    return a ? `${a.username}${a.isMe ? ' (ты)' : ''}` : username
  },

  statsFor(username) {
    const list = TasksPage.tasks.filter(t => t.assignee === username)
    const by = (s) => list.filter(t => t.status === s).length
    return { todo: by('todo'), in_progress: by('in_progress'), done: by('done'), approved: by('approved'), overdue: list.filter(TasksPage.isOverdue).length }
  },

  visible() {
    return TasksPage.tasks.filter(t => TasksPage.assignee === 'all' || t.assignee === TasksPage.assignee)
  },

  // В колонке: просроченные, потом по дедлайну, без дедлайна — в конце
  sorted(list, status) {
    if (status === 'approved') return [...list].sort((a, b) => String(b.approvedAt || '').localeCompare(String(a.approvedAt || '')))
    return [...list].sort((a, b) =>
      Number(TasksPage.isOverdue(b)) - Number(TasksPage.isOverdue(a)) ||
      String(a.deadline || '9999').localeCompare(String(b.deadline || '9999')) ||
      b.id - a.id)
  },

  // Может ли текущий админ поставить задаче этот статус
  canMove(task, status) {
    if (TasksPage.me.isMain) return true
    return task.assignee === TasksPage.me.username && task.status !== 'approved' && status !== 'approved'
  },

  syncBadge() {
    Badges.tasks = TasksPage.me.isMain
      ? TasksPage.tasks.filter(t => t.status === 'done').length
      : TasksPage.tasks.filter(t => t.status === 'todo' || t.status === 'in_progress').length
    Shell.paintBadges()
  },

  // ── Отрисовка ──
  paint() {
    TasksPage.syncBadge()
    $('#tasks-team').innerHTML = TasksPage.me.isMain ? TasksPage.team() : TasksPage.mySummary()
    $('#tasks-board').innerHTML = TasksPage.board()
  },

  team() {
    const helpers = TasksPage.admins
    const all = TasksPage.assignee === 'all'
    return `
      <div class="toolbar" style="margin-bottom:12px">
        <span class="card-title" style="font-size:13.5px">${icon('users')}Команда</span>
        <span class="spacer"></span>
        ${all ? '' : `<button class="btn btn-secondary btn-sm" onclick="TasksPage.pickAssignee('all')">${icon('x', 14)}Показать задачи всех</button>`}
      </div>
      <div class="team">${helpers.map((a, i) => {
        const st = TasksPage.statsFor(a.username)
        const active = TasksPage.assignee === a.username
        return `
          <button class="team-card${active ? ' active' : ''}" onclick="TasksPage.pickAdmin(${i})" aria-pressed="${active}" title="${active ? 'Показать задачи всех' : 'Показать только задачи ' + esc(a.username)}">
            <div class="team-head">
              <span class="me-avatar">${esc(initials(a.username))}</span>
              <div style="min-width:0">
                <div class="team-name">${esc(a.username)}${a.isMe ? ' <span class="muted" style="font-weight:500">(ты)</span>' : ''}</div>
                <div class="team-role">${esc(a.role)}</div>
              </div>
              ${a.scope === 'full' ? `<span style="margin-left:auto;color:var(--lime)" title="Главный админ">${icon('crown', 16)}</span>` : ''}
            </div>
            <div class="team-stats">
              <span class="badge badge-gray">не начато ${st.todo}</span>
              <span class="badge badge-blue">в работе ${st.in_progress}</span>
              ${st.done ? `<span class="badge badge-lime">${icon('circle-check')}ждёт подтверждения ${st.done}</span>` : ''}
              ${st.overdue ? `<span class="badge badge-red">${icon('triangle-alert')}просрочено ${st.overdue}</span>` : ''}
            </div>
          </button>`
      }).join('')}</div>`
  },

  mySummary() {
    const st = TasksPage.statsFor(TasksPage.me.username)
    const open = st.todo + st.in_progress
    return `
      <div class="toolbar">
        <span class="badge ${open ? 'badge-blue' : 'badge-gray'}">${icon('list-todo')}${open} ${plural(open, 'задача', 'задачи', 'задач')} в работе и не начато</span>
        ${st.done ? `<span class="badge badge-lime">${icon('circle-check')}${st.done} ждут подтверждения</span>` : ''}
        ${st.overdue ? `<span class="badge badge-red">${icon('triangle-alert')}${st.overdue} просрочено</span>` : ''}
      </div>`
  },

  // Логины берутся из .env — в разметку передаём номер, а не строку
  pickAdmin(i) {
    const admin = TasksPage.admins[i]
    if (admin) TasksPage.pickAssignee(admin.username)
  },

  pickAssignee(username) {
    TasksPage.assignee = TasksPage.assignee === username ? 'all' : username
    Router.setQuery({ assignee: TasksPage.assignee === 'all' ? null : TasksPage.assignee })
    TasksPage.paint()
  },

  board() {
    const list = TasksPage.visible()
    if (!TasksPage.tasks.length) {
      return `<div class="card">${TasksPage.me.isMain
        ? emptyState('square-kanban', 'Задач пока нет', 'Поставь первую задачу помощнику — она появится у него в разделе «Мои задачи»')
        : emptyState('square-kanban', 'Задач пока нет', 'Когда главный админ поставит тебе задачу, она появится здесь')}</div>`
    }
    return `<div class="board">${TASK_STATUSES.map(st => {
      let cards = TasksPage.sorted(list.filter(t => t.status === st.key), st.key)
      const total = cards.length
      const locked = !TasksPage.me.isMain && st.key === 'approved'
      let more = ''
      if (st.key === 'approved' && !TasksPage.showAllApproved && cards.length > 6) {
        more = `<button class="btn btn-secondary btn-sm" style="margin:2px 0" onclick="TasksPage.toggleApproved()">Ещё ${cards.length - 6}</button>`
        cards = cards.slice(0, 6)
      }
      return `
        <section class="board-col${locked ? ' is-locked' : ''}" data-status="${st.key}"
                 ondragover="TasksPage.dragOver(event, '${st.key}')" ondragleave="TasksPage.dragLeave(event)" ondrop="TasksPage.drop(event, '${st.key}')">
          <div class="board-col-head"><span class="badge ${st.badge}">${icon(st.icon)}${st.label}</span><span class="count">${total}</span></div>
          <div class="board-col-hint">${locked ? 'Сюда задачу переносит главный админ после проверки' : st.hint}</div>
          <div class="board-list">
            ${cards.length ? cards.map(TasksPage.card).join('') : `<div class="board-empty">${locked ? 'Пока ничего не подтверждено' : 'Пусто'}</div>`}
            ${more}
          </div>
        </section>`
    }).join('')}</div>`
  },

  toggleApproved() {
    TasksPage.showAllApproved = !TasksPage.showAllApproved
    $('#tasks-board').innerHTML = TasksPage.board()
  },

  deadlineBadge(t) {
    if (!t.deadline) return ''
    const label = dayLabel(t.deadline, { short: true })
    if (TasksPage.isOverdue(t)) return `<span class="badge badge-red">${icon('triangle-alert')}просрочено · ${label}</span>`
    const diff = daysBetween(TasksPage.today(), t.deadline)
    if (t.status === 'todo' || t.status === 'in_progress') {
      if (diff === 0) return `<span class="badge badge-orange">${icon('clock')}сегодня</span>`
      if (diff === 1) return `<span class="badge badge-orange">${icon('clock')}завтра</span>`
    }
    return `<span class="badge badge-gray">${icon('calendar')}до ${label}</span>`
  },

  card(t) {
    const draggable = TasksPage.me.isMain || (t.assignee === TasksPage.me.username && t.status !== 'approved')
    return `
      <button class="task-card${TasksPage.isOverdue(t) ? ' is-overdue' : ''}" ${draggable ? 'draggable="true"' : ''}
              ondragstart="TasksPage.dragStart(event, ${t.id})" ondragend="TasksPage.dragEnd(event)"
              onclick="TasksPage.openDetail(${t.id})">
        <div class="task-title">${esc(t.title)}</div>
        ${t.description ? `<div class="task-desc">${esc(t.description)}</div>` : ''}
        <div class="task-meta">
          ${TasksPage.me.isMain ? `<span class="badge badge-violet">${icon('user')}${esc(t.assignee)}</span>` : ''}
          ${TasksPage.deadlineBadge(t)}
        </div>
      </button>`
  },

  // ── Перетаскивание ──
  dragStart(e, id) {
    TasksPage.dragId = id
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(id))
    e.currentTarget.classList.add('is-dragging')
  },

  dragEnd(e) {
    e.currentTarget.classList.remove('is-dragging')
    document.querySelectorAll('.board-col.is-over').forEach(c => c.classList.remove('is-over'))
    TasksPage.dragId = null
  },

  dragOver(e, status) {
    const task = TasksPage.find(TasksPage.dragId)
    if (!task) return
    e.currentTarget.classList.add('is-over')
    if (TasksPage.canMove(task, status)) {
      e.preventDefault()
      e.dataTransfer.dropEffect = 'move'
    }
  },

  dragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) e.currentTarget.classList.remove('is-over')
  },

  drop(e, status) {
    e.preventDefault()
    e.currentTarget.classList.remove('is-over')
    const id = Number(e.dataTransfer.getData('text/plain')) || TasksPage.dragId
    const task = TasksPage.find(id)
    if (!task || task.status === status) return
    if (!TasksPage.canMove(task, status)) return toast('Подтверждает выполнение только главный админ', 'err')
    TasksPage.setStatus(id, status)
  },

  // ── Действия ──
  async setStatus(id, status, { fromModal = false } = {}) {
    const task = TasksPage.find(id)
    if (!task) return
    const prev = { ...task }
    Object.assign(task, { status })
    TasksPage.paint()
    try {
      const saved = await api(`/api/admin-tasks/${id}/status`, { method: 'PATCH', body: { status } })
      Object.assign(task, saved)
      TasksPage.paint()
      const st = statusMeta(status)
      toast(status === 'approved' ? 'Выполнение подтверждено' : `Статус: ${st.label.toLowerCase()}`)
      if (fromModal) TasksPage.openDetail(id)
    } catch (e) {
      Object.assign(task, prev)
      TasksPage.paint()
      toast(e.message, 'err')
    }
  },

  linkify(text) {
    return esc(text).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener" style="color:var(--lime);text-decoration:underline">$1</a>')
  },

  openDetail(id) {
    const t = TasksPage.find(id)
    if (!t) return
    const main = TasksPage.me.isMain
    const st = statusMeta(t.status)
    const locked = !main && t.status === 'approved'
    const steps = TASK_STATUSES.map(s => {
      const disabled = !TasksPage.canMove(t, s.key)
      return `<button class="status-step${t.status === s.key ? ' active' : ''}" ${disabled ? 'disabled' : ''}
                title="${disabled ? (s.key === 'approved' ? 'Подтверждает главный админ' : 'Задача уже подтверждена') : s.hint}"
                onclick="TasksPage.setStatus(${t.id}, '${s.key}', { fromModal: true })">${icon(s.icon, 18)}${s.label}</button>`
    }).join('')

    Modal.open(`
      ${modalHead(esc(t.title), `Поставил ${esc(t.createdBy)} · ${stampLabel(t.createdAt)}`)}
      <div class="task-detail-meta">
        <div><div class="k">Статус</div><div class="v"><span class="badge ${st.badge}">${icon(st.icon)}${st.label}</span></div></div>
        <div><div class="k">Исполнитель</div><div class="v">${esc(TasksPage.adminLabel(t.assignee))}</div></div>
        <div><div class="k">Дедлайн</div><div class="v">${t.deadline ? TasksPage.deadlineBadge(t) : '<span class="muted">не указан</span>'}</div></div>
      </div>
      ${t.description ? `<div class="task-detail-desc">${TasksPage.linkify(t.description)}</div>` : '<div class="card-sub">Описания нет</div>'}
      ${main && t.status === 'done' ? `
        <div class="next-student" style="margin:18px 0 0">
          <span style="flex:1">Исполнитель отметил задачу выполненной${t.doneAt ? ` ${stampLabel(t.doneAt)}` : ''}. Проверь результат и подтверди.</span>
          <button class="btn btn-secondary btn-sm" onclick="TasksPage.setStatus(${t.id}, 'in_progress', { fromModal: true })">${icon('undo-2', 14)}Вернуть в работу</button>
          <button class="btn btn-success btn-sm" onclick="TasksPage.setStatus(${t.id}, 'approved', { fromModal: true })">${icon('badge-check', 14)}Подтвердить</button>
        </div>` : ''}
      ${locked ? `<div class="note" style="margin-top:18px">${icon('lock', 15)}<span>Задача подтверждена главным админом${t.approvedAt ? ` ${stampLabel(t.approvedAt)}` : ''} — статус больше не меняется.</span></div>` : ''}
      <div class="field-label" style="margin-top:20px">Статус</div>
      <div class="status-steps" style="margin-top:0">${steps}</div>
      <div class="modal-actions">
        ${main ? `
          <button class="btn btn-danger" onclick="TasksPage.remove(${t.id})">${icon('trash-2')}Удалить</button>
          <span class="spacer"></span>
          <button class="btn btn-secondary" onclick="TasksPage.openForm(${t.id})">${icon('pencil')}Изменить</button>` : '<span class="spacer"></span>'}
        <button class="btn btn-primary" onclick="Modal.close()">Готово</button>
      </div>`, { size: 'lg' })
  },

  openForm(id) {
    const t = id ? TasksPage.find(id) : null
    const helpers = TasksPage.admins.filter(a => a.scope !== 'full')
    const defaultAssignee = t ? t.assignee : (TasksPage.assignee !== 'all' ? TasksPage.assignee : (helpers[0] || TasksPage.admins[0] || {}).username)
    Modal.open(`
      ${modalHead(t ? 'Изменить задачу' : 'Новая задача', t ? '' : 'Исполнитель увидит её в разделе «Мои задачи»')}
      <div class="field"><label for="t-title">Название</label><input id="t-title" maxlength="200" value="${esc(t ? t.title : '')}" placeholder="Например: проверить ДЗ недели 3 до пятницы" autofocus/></div>
      <div class="field"><label for="t-desc">Описание</label><textarea id="t-desc" rows="5" maxlength="5000" placeholder="Что нужно сделать и как понять, что готово">${esc(t ? t.description : '')}</textarea></div>
      <div class="form-row">
        <div class="field">
          <label for="t-assignee">Исполнитель</label>
          <select id="t-assignee">${TasksPage.admins.map(a => `<option value="${esc(a.username)}" ${a.username === defaultAssignee ? 'selected' : ''}>${esc(a.username)} — ${esc(a.role)}${a.isMe ? ' (ты)' : ''}</option>`).join('')}</select>
        </div>
        <div class="field">
          <label for="t-deadline">Дедлайн</label>
          <input id="t-deadline" type="date" value="${esc(t && t.deadline ? t.deadline : '')}" min="${t ? '' : mskDay()}"/>
        </div>
      </div>
      <div class="form-error" id="t-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="${t ? `TasksPage.openDetail(${t.id})` : 'Modal.close()'}">Отмена</button>
        <button class="btn btn-primary" id="t-save" onclick="TasksPage.save(${t ? t.id : 'null'})">${icon(t ? 'check' : 'plus')}${t ? 'Сохранить' : 'Поставить задачу'}</button>
      </div>`, { size: 'lg' })
  },

  async save(id) {
    const body = {
      title: $('#t-title').value.trim(),
      description: $('#t-desc').value.trim(),
      assignee: $('#t-assignee').value,
      deadline: $('#t-deadline').value || null,
    }
    const err = $('#t-err')
    if (!body.title) { err.textContent = 'Напиши название задачи'; err.hidden = false; return }
    $('#t-save').disabled = true
    try {
      if (id) {
        const task = TasksPage.find(id)
        const saved = await api(`/api/admin-tasks/${id}`, { method: 'PUT', body: { ...body, status: task.status } })
        Object.assign(task, saved)
        toast('Задача обновлена')
        TasksPage.paint()
        TasksPage.openDetail(id)
      } else {
        const saved = await api('/api/admin-tasks', { method: 'POST', body })
        TasksPage.tasks.unshift(saved)
        Modal.close()
        toast(`Задача поставлена — ${saved.assignee}`)
        TasksPage.paint()
      }
    } catch (e) {
      err.textContent = e.message
      err.hidden = false
      $('#t-save').disabled = false
    }
  },

  async remove(id) {
    const t = TasksPage.find(id)
    if (!t) return
    const ok = await confirmDialog({
      title: 'Удалить задачу?',
      text: `«<b>${esc(t.title)}</b>» пропадёт и у исполнителя. Это действие необратимо.`,
      confirm: 'Удалить', danger: true,
    })
    if (!ok) return TasksPage.openDetail(id)
    try {
      await api(`/api/admin-tasks/${id}`, { method: 'DELETE' })
      TasksPage.tasks = TasksPage.tasks.filter(x => x.id !== id)
      toast('Задача удалена')
      TasksPage.paint()
    } catch (e) { toast(e.message, 'err') }
  },
}

PAGES.tasks = TasksPage
