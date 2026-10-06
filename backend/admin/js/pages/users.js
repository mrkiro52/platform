'use strict'
// Пользователи: поиск, фильтр по лагерю, доступ к Autumn Camp, правка и удаление.

const UsersPage = {
  list: [],
  q: '',
  filter: 'all',
  sort: 'created',
  limit: 50,

  async render(view, ctx) {
    UsersPage.q = ctx.query.get('q') || ''
    UsersPage.filter = ['camp', 'nocamp'].includes(ctx.query.get('filter')) ? ctx.query.get('filter') : 'all'
    UsersPage.sort = ['active', 'points'].includes(ctx.query.get('sort')) ? ctx.query.get('sort') : 'created'
    UsersPage.limit = 50
    view.innerHTML = UsersPage.head() + skeleton({ rows: 10 })
    const list = await api('/api/users')
    if (ctx.stale()) return
    UsersPage.list = list
    view.innerHTML = UsersPage.head() + `
      <div class="toolbar">
        ${searchBox('users-q', UsersPage.q, 'Поиск по логину или имени', 'UsersPage.search')}
        <span id="users-filter"></span>
        <span class="spacer"></span>
      </div>
      <div id="users-table"></div>`
    UsersPage.paint()
    if (UsersPage.q) $('#users-q').focus()
  },

  head() {
    const total = UsersPage.list.length
    const camp = UsersPage.list.filter(u => u.autumnCamp).length
    return pageHead({
      title: 'Пользователи',
      sub: total ? `${fmt(total)} ${plural(total, 'аккаунт', 'аккаунта', 'аккаунтов')} · ${fmt(camp)} в осеннем лагере` : 'Участники платформы',
      actions: `<button class="btn btn-primary" onclick="UsersPage.openCreate()">${icon('user-plus')}Добавить</button>`,
    })
  },

  search: debounce((value) => {
    UsersPage.q = value.trim()
    UsersPage.limit = 50
    Router.setQuery({ q: UsersPage.q })
    UsersPage.paint()
  }, 150),

  setFilter(filter) {
    UsersPage.filter = filter
    UsersPage.limit = 50
    Router.setQuery({ filter: filter === 'all' ? null : filter })
    UsersPage.paint()
  },

  setSort(sort) {
    UsersPage.sort = sort
    Router.setQuery({ sort: sort === 'created' ? null : sort })
    UsersPage.paint()
  },

  more() {
    UsersPage.limit += 100
    UsersPage.paint()
  },

  visible() {
    const q = UsersPage.q.toLowerCase()
    let rows = UsersPage.list.filter(u => {
      if (UsersPage.filter === 'camp' && !u.autumnCamp) return false
      if (UsersPage.filter === 'nocamp' && u.autumnCamp) return false
      return !q || String(u.nickname || '').toLowerCase().includes(q) || String(u.name || '').toLowerCase().includes(q)
    })
    const by = {
      created: (a, b) => String(b.created_at).localeCompare(String(a.created_at)) || b.id - a.id,
      active: (a, b) => String(b.lastActiveDay || '').localeCompare(String(a.lastActiveDay || '')) || b.id - a.id,
      points: (a, b) => (b.points || 0) - (a.points || 0) || b.id - a.id,
    }
    return rows.sort(by[UsersPage.sort])
  },

  paintSub() {
    const sub = document.querySelector('.page-sub')
    const total = UsersPage.list.length
    const camp = UsersPage.list.filter(u => u.autumnCamp).length
    if (sub) sub.textContent = `${fmt(total)} ${plural(total, 'аккаунт', 'аккаунта', 'аккаунтов')} · ${fmt(camp)} в осеннем лагере`
  },

  paintFilter() {
    const all = UsersPage.list
    const camp = all.filter(u => u.autumnCamp).length
    $('#users-filter').innerHTML = seg([
      ['all', `Все <span class="count">${fmt(all.length)}</span>`],
      ['camp', `В лагере <span class="count">${fmt(camp)}</span>`],
      ['nocamp', `Без лагеря <span class="count">${fmt(all.length - camp)}</span>`],
    ], UsersPage.filter, 'UsersPage.setFilter')
  },

  paint() {
    UsersPage.paintFilter()

    const rows = UsersPage.visible()
    const el = $('#users-table')
    if (!rows.length) {
      el.innerHTML = `<div class="card">${emptyState('search', UsersPage.q ? 'Никого не нашли' : 'Пользователей нет', UsersPage.q ? `По запросу «${esc(UsersPage.q)}» совпадений нет` : '')}</div>`
      return
    }
    const sortHead = (key, label, cls = '') => `
      <th class="sortable${cls ? ' ' + cls : ''}${UsersPage.sort === key ? ' active' : ''}" onclick="UsersPage.setSort('${key}')" title="Сортировать">
        ${label}${icon('arrow-down', 12)}
      </th>`
    const shown = rows.slice(0, UsersPage.limit)
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr>
            <th>Пользователь</th>
            <th>Осенний лагерь</th>
            ${sortHead('created', 'Регистрация')}
            ${sortHead('active', 'Активность')}
            ${sortHead('points', 'Очки', 'r')}
            <th class="r">Стрик</th>
            <th></th>
          </tr></thead>
          <tbody>${shown.map(UsersPage.row).join('')}</tbody>
        </table>
        ${rows.length > shown.length ? `
          <div class="tbl-foot">
            <span>Показано ${fmt(shown.length)} из ${fmt(rows.length)}</span>
            <button class="btn btn-secondary btn-sm" onclick="UsersPage.more()">Показать ещё</button>
          </div>` : `<div class="tbl-foot"><span>${fmt(rows.length)} ${plural(rows.length, 'пользователь', 'пользователя', 'пользователей')}</span></div>`}
      </div>`
  },

  row(u) {
    const login = u.nickname || u.name
    const created = u.created_at ? dayLabel(mskDay(Date.parse(u.created_at.replace(' ', 'T') + 'Z'))) : '—'
    const active = relDay(u.lastActiveDay)
    return `
      <tr id="user-${u.id}">
        <td>
          <div style="display:flex;align-items:center;gap:11px">
            <span class="avatar">${esc(initials(login))}</span>
            <div style="min-width:0">
              <div class="cell-main">${esc(login)}</div>
              ${u.name && u.name !== login ? `<div class="cell-sub">${esc(u.name)}</div>` : `<div class="cell-sub">#${u.id}</div>`}
            </div>
          </div>
        </td>
        <td>
          <label class="switch" title="${u.autumnCamp ? 'Забрать доступ к Autumn Camp' : 'Дать доступ к Autumn Camp'}">
            <input type="checkbox" ${u.autumnCamp ? 'checked' : ''} onchange="UsersPage.toggleCamp(${u.id}, this)"/>
            <span class="switch-track"><span class="switch-knob"></span></span>
            <span class="switch-label">${u.autumnCamp ? 'участник' : 'нет'}</span>
          </label>
          ${u.autumnCamp ? `<select class="dir-select" aria-label="Направление программы" onchange="UsersPage.setDirection(${u.id}, this)">
            ${UsersPage.DIRECTIONS.map(([v, l]) => `<option value="${v}" ${(u.autumnDirection || '') === v ? 'selected' : ''}>${l}</option>`).join('')}
          </select>` : ''}
        </td>
        <td class="nowrap">${created}</td>
        <td class="nowrap">${active ? (active === 'сегодня' ? `<span class="badge badge-green">сегодня</span>` : esc(active)) : '<span class="muted">—</span>'}</td>
        <td class="r num cell-main" style="color:var(--lime)">${fmt(u.points)}</td>
        <td class="r num">${fmt(u.streak)}</td>
        <td class="actions"><div>
          <button class="btn-icon btn-sm" onclick="UsersPage.openEdit(${u.id})" title="Изменить логин или пароль" aria-label="Изменить">${icon('pencil', 15)}</button>
          <button class="btn-icon btn-sm is-danger" onclick="UsersPage.remove(${u.id})" title="Удалить" aria-label="Удалить">${icon('trash-2', 15)}</button>
        </div></td>
      </tr>`
  },

  // Направление индивидуальной программы на октябрь; пусто — программа ещё готовится
  DIRECTIONS: [['', 'Направление не выбрано'], ['product', 'Продуктовая аналитика'], ['system', 'Системная аналитика'], ['business', 'Бизнес-аналитика']],

  async setDirection(id, select) {
    const user = UsersPage.list.find(u => u.id === id)
    if (!user) return
    const direction = select.value || null
    select.disabled = true
    try {
      await api(`/api/users/${id}/direction`, { method: 'PATCH', body: { direction } })
      user.autumnDirection = direction
      const label = UsersPage.DIRECTIONS.find(([v]) => v === (direction || ''))[1]
      toast(`${user.nickname || user.name}: ${direction ? label : 'направление снято'}`)
    } catch (e) {
      select.value = user.autumnDirection || ''
      toast(e.message, 'err')
    } finally {
      select.disabled = false
    }
  },

  async toggleCamp(id, input) {
    const user = UsersPage.list.find(u => u.id === id)
    if (!user) return
    const next = input.checked
    const login = esc(user.nickname || user.name)
    if (!next) {
      const ok = await confirmDialog({
        title: 'Забрать доступ к лагерю?',
        text: `У <b>${login}</b> пропадут материалы Autumn Camp, сдача ДЗ и запись на созвоны. Сданные решения сохранятся.`,
        confirm: 'Забрать доступ', danger: true,
      })
      if (!ok) { input.checked = true; return }
    }
    input.disabled = true
    try {
      await api(`/api/users/${id}/camp`, { method: 'PATCH', body: { autumnCamp: next } })
      user.autumnCamp = next
      toast(next ? `${user.nickname || user.name} — теперь в лагере` : `${user.nickname || user.name} — доступ к лагерю снят`)
      UsersPage.paintSub()
      // В отфильтрованном списке строка могла перестать подходить под фильтр
      if (UsersPage.filter !== 'all') UsersPage.paint()
      else { $(`#user-${id}`).outerHTML = UsersPage.row(user); UsersPage.paintFilter() }
    } catch (e) {
      input.checked = !next
      input.disabled = false
      toast(e.message, 'err')
    }
  },

  form({ login = '', isEdit = false }) {
    return `
      <div class="field"><label for="u-login">Логин</label><input id="u-login" value="${esc(login)}" placeholder="student123" autocomplete="off"/></div>
      <div class="field">
        <label for="u-pass">${isEdit ? 'Новый пароль' : 'Пароль'}</label>
        <div class="pw-wrap">
          <input id="u-pass" type="password" placeholder="${isEdit ? 'Оставь пустым, чтобы не менять' : 'Пароль для входа'}" autocomplete="new-password"/>
          <button type="button" class="pw-toggle" onclick="UsersPage.togglePw(this)" aria-label="Показать пароль">${icon('eye', 17)}</button>
        </div>
        ${isEdit ? '<div class="field-hint">Логин можно не трогать — если меняешь только пароль, имя и почта пользователя останутся прежними.</div>' : ''}
      </div>
      <div class="form-error" id="u-err" hidden></div>`
  },

  togglePw(btn) {
    const input = btn.previousElementSibling
    const show = input.type === 'password'
    input.type = show ? 'text' : 'password'
    btn.innerHTML = icon(show ? 'eye-off' : 'eye', 17)
  },

  openCreate() {
    Modal.open(`
      ${modalHead('Новый пользователь', 'Человек сможет войти с этим логином и паролем')}
      ${UsersPage.form({})}
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="u-save" onclick="UsersPage.save(null)">${icon('check')}Создать</button>
      </div>`)
  },

  openEdit(id) {
    const user = UsersPage.list.find(u => u.id === id)
    if (!user) return
    Modal.open(`
      ${modalHead('Изменить пользователя', esc(user.nickname || user.name))}
      ${UsersPage.form({ login: user.nickname || user.name, isEdit: true })}
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="u-save" onclick="UsersPage.save(${id})">${icon('check')}Сохранить</button>
      </div>`)
  },

  async save(id) {
    const login = $('#u-login').value.trim()
    const password = $('#u-pass').value
    const err = $('#u-err')
    const fail = (msg) => { err.textContent = msg; err.hidden = false }
    if (!login) return fail('Введи логин')
    if (!id && !password) return fail('Введи пароль')
    $('#u-save').disabled = true
    try {
      if (id) await api(`/api/users/${id}`, { method: 'PUT', body: { login, password } })
      else await api('/api/users', { method: 'POST', body: { login, password } })
      Modal.close()
      toast(id ? 'Пользователь обновлён' : 'Пользователь создан')
      Router.reload()
    } catch (e) {
      fail(e.message)
      $('#u-save').disabled = false
    }
  },

  async remove(id) {
    const user = UsersPage.list.find(u => u.id === id)
    if (!user) return
    const ok = await confirmDialog({
      title: 'Удалить пользователя?',
      text: `Аккаунт <b>${esc(user.nickname || user.name)}</b> будет удалён вместе с решениями ДЗ, постами и сообщениями. Это действие необратимо.`,
      confirm: 'Удалить навсегда', danger: true, word: 'Подтверждаю',
    })
    if (!ok) return
    try {
      await api(`/api/users/${id}`, { method: 'DELETE' })
      UsersPage.list = UsersPage.list.filter(u => u.id !== id)
      toast('Пользователь удалён')
      UsersPage.paintSub()
      UsersPage.paint()
    } catch (e) { toast(e.message, 'err') }
  },
}

PAGES.users = UsersPage
