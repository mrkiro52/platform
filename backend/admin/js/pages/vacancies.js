'use strict'
// Вакансии: карточки на странице «Вакансии и контакты» в разделе лагеря.

const VACANCY_CATS = {
  fullstack: 'Fullstack',
  backend: 'Backend',
  analytics: 'Аналитика',
  ml: 'ML / AI',
  security: 'Кибербезопасность',
  other: 'Другое',
}

const VacanciesPage = {
  list: [],

  async render(view, ctx) {
    view.innerHTML = VacanciesPage.head() + skeleton({ rows: 6 })
    const list = await api('/api/vacancies')
    if (ctx.stale()) return
    VacanciesPage.list = list
    view.innerHTML = VacanciesPage.head() + '<div id="vac-list"></div>'
    VacanciesPage.paint()
  },

  head() {
    return pageHead({
      title: 'Вакансии',
      sub: 'Карточки на странице «Вакансии и контакты» в осеннем лагере. Пока страница закрыта кодом доступа на фронтенде',
      actions: `<button class="btn btn-primary" onclick="VacanciesPage.open(null)">${icon('plus')}Новая вакансия</button>`,
    })
  },

  paint() {
    const el = $('#vac-list')
    const list = VacanciesPage.list
    if (!list.length) {
      el.innerHTML = `<div class="card">${emptyState('briefcase', 'Вакансий пока нет', 'Добавь первую — участники увидят её карточкой')}</div>`
      return
    }
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Вакансия</th><th>Категории</th><th>Контакт</th><th>Добавлена</th><th></th></tr></thead>
          <tbody>${list.map(v => `
            <tr>
              <td><div class="cell-main">${esc(v.title)}</div><div class="cell-sub ann-text">${esc(v.description)}</div></td>
              <td><div class="vac-cats">${(v.categories || [v.category]).map(c => `<span class="badge badge-orange">${esc(VACANCY_CATS[c] || c)}</span>`).join('')}</div></td>
              <td>${esc(v.contact)}</td>
              <td class="nowrap">${esc(String(v.created_at || '').slice(0, 10))}</td>
              <td class="actions"><div>
                <button class="btn-icon btn-sm" onclick="VacanciesPage.open(${v.id})" title="Изменить" aria-label="Изменить">${icon('pencil', 15)}</button>
                <button class="btn-icon btn-sm is-danger" onclick="VacanciesPage.remove(${v.id})" title="Удалить" aria-label="Удалить">${icon('trash-2', 15)}</button>
              </div></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
  },

  open(id) {
    const v = id ? VacanciesPage.list.find(x => x.id === id) : null
    Modal.open(`
      ${modalHead(v ? 'Изменить вакансию' : 'Новая вакансия', v ? '' : 'Появится карточкой на странице вакансий')}
      <div class="field"><label for="v-title">Название</label><input id="v-title" value="${esc(v ? v.title : '')}" maxlength="200" placeholder="Стажёр Python-разработчик" autofocus/></div>
      <div class="field">
        <label>Категории</label>
        <div class="vac-cat-checks" id="v-cats">${Object.entries(VACANCY_CATS).map(([key, label]) => `<label class="course-check">
          <input type="checkbox" value="${key}"${(v ? (v.categories || [v.category]) : []).includes(key) ? ' checked' : ''}/>
          <span class="course-box">${icon('check', 12)}</span><span>${esc(label)}</span>
        </label>`).join('')}</div>
        <div class="field-hint">Можно выбрать несколько: вакансия появится под каждой выбранной категорией</div>
      </div>
      <div class="field">
        <label for="v-contact">Контакт для связи</label>
        <input id="v-contact" value="${esc(v ? v.contact : '')}" maxlength="300" placeholder="@telegram, почта или ссылка"/>
        <div class="field-hint">Telegram-ник, почта и ссылка станут кликабельными</div>
      </div>
      <div class="field"><label for="v-desc">Описание</label><textarea id="v-desc" rows="10" placeholder="Задачи, требования, условия. Переносы строк сохраняются">${esc(v ? v.description : '')}</textarea></div>
      <div class="form-error" id="v-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="v-save" onclick="VacanciesPage.save(${v ? v.id : 'null'})">${icon(v ? 'check' : 'plus')}${v ? 'Сохранить' : 'Добавить'}</button>
      </div>`, { size: 'lg' })
  },

  async save(id) {
    const body = {
      title: $('#v-title').value.trim(),
      categories: [...document.querySelectorAll('#v-cats input:checked')].map(i => i.value),
      contact: $('#v-contact').value.trim(),
      description: $('#v-desc').value.trim(),
    }
    if (!body.title || !body.contact || !body.categories.length) {
      $('#v-err').textContent = !body.categories.length ? 'Выбери хотя бы одну категорию' : 'Название и контакт обязательны'
      $('#v-err').hidden = false
      return
    }
    $('#v-save').disabled = true
    try {
      if (id) await api(`/api/vacancies/${id}`, { method: 'PUT', body })
      else await api('/api/vacancies', { method: 'POST', body })
      Modal.close()
      toast(id ? 'Вакансия обновлена' : 'Вакансия добавлена')
      Router.reload()
    } catch (e) {
      $('#v-err').textContent = e.message
      $('#v-err').hidden = false
      $('#v-save').disabled = false
    }
  },

  async remove(id) {
    const v = VacanciesPage.list.find(x => x.id === id)
    if (!v) return
    const ok = await confirmDialog({
      title: 'Удалить вакансию?',
      text: `«<b>${esc(v.title)}</b>» пропадёт со страницы вакансий.`,
      confirm: 'Удалить', danger: true,
    })
    if (!ok) return
    try {
      await api(`/api/vacancies/${id}`, { method: 'DELETE' })
      VacanciesPage.list = VacanciesPage.list.filter(x => x.id !== id)
      toast('Вакансия удалена')
      VacanciesPage.paint()
    } catch (e) { toast(e.message, 'err') }
  },
}

PAGES.vacancies = VacanciesPage
