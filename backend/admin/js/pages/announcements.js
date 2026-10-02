'use strict'
// Объявления: новости для участников на дэшборде платформы.

const AnnouncementsPage = {
  list: [],

  async render(view, ctx) {
    view.innerHTML = AnnouncementsPage.head() + skeleton({ rows: 6 })
    const list = await api('/api/announcements')
    if (ctx.stale()) return
    AnnouncementsPage.list = list
    view.innerHTML = AnnouncementsPage.head() + '<div id="ann-list"></div>'
    AnnouncementsPage.paint()
  },

  head() {
    return pageHead({
      title: 'Объявления',
      sub: 'Новости для участников — показываются на дэшборде платформы, свежие сверху',
      actions: `<button class="btn btn-primary" onclick="AnnouncementsPage.open(null)">${icon('plus')}Новое объявление</button>`,
    })
  },

  paint() {
    const el = $('#ann-list')
    const list = AnnouncementsPage.list
    if (!list.length) {
      el.innerHTML = `<div class="card">${emptyState('megaphone', 'Объявлений пока нет', 'Создай первое — участники увидят его на дэшборде')}</div>`
      return
    }
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Объявление</th><th>Дата</th><th></th></tr></thead>
          <tbody>${list.map(a => `
            <tr>
              <td>
                <div style="display:flex;align-items:center;gap:12px;min-width:0">
                  <span class="ann-icon" title="Значок на платформе">${esc(a.icon || '')}</span>
                  <div style="min-width:0">
                    <div class="cell-main">${esc(a.title)}</div>
                    <div class="cell-sub ann-text">${esc(a.text)}</div>
                  </div>
                </div>
              </td>
              <td class="nowrap">${a.published_at && /^\d{4}-\d{2}-\d{2}$/.test(a.published_at) ? dayLabel(a.published_at) : esc(a.published_at || '—')}</td>
              <td class="actions"><div>
                <button class="btn-icon btn-sm" onclick="AnnouncementsPage.open(${a.id})" title="Изменить" aria-label="Изменить">${icon('pencil', 15)}</button>
                <button class="btn-icon btn-sm is-danger" onclick="AnnouncementsPage.remove(${a.id})" title="Удалить" aria-label="Удалить">${icon('trash-2', 15)}</button>
              </div></td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
  },

  open(id) {
    const a = id ? AnnouncementsPage.list.find(x => x.id === id) : null
    Modal.open(`
      ${modalHead(a ? 'Изменить объявление' : 'Новое объявление', a ? '' : 'Появится у участников на дэшборде')}
      <div class="form-row">
        <div class="field">
          <label for="a-icon">Значок</label>
          <input id="a-icon" value="${esc(a ? a.icon : '📢')}" maxlength="8"/>
          <div class="field-hint">Эмодзи перед заголовком на платформе</div>
        </div>
        <div class="field">
          <label for="a-date">Дата публикации</label>
          <input id="a-date" type="date" value="${esc(a ? a.published_at : mskDay())}"/>
        </div>
      </div>
      <div class="field"><label for="a-title">Заголовок</label><input id="a-title" value="${esc(a ? a.title : '')}" placeholder="Важное объявление" autofocus/></div>
      <div class="field"><label for="a-text">Текст</label><textarea id="a-text" rows="6" placeholder="Что нужно знать участникам">${esc(a ? a.text : '')}</textarea></div>
      <div class="form-error" id="a-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="a-save" onclick="AnnouncementsPage.save(${a ? a.id : 'null'})">${icon(a ? 'check' : 'send')}${a ? 'Сохранить' : 'Опубликовать'}</button>
      </div>`, { size: 'lg' })
  },

  async save(id) {
    const body = {
      title: $('#a-title').value.trim(),
      text: $('#a-text').value.trim(),
      icon: $('#a-icon').value.trim() || '📢',
      published_at: $('#a-date').value,
    }
    if (!body.title || !body.text) {
      $('#a-err').textContent = 'Заголовок и текст обязательны'
      $('#a-err').hidden = false
      return
    }
    $('#a-save').disabled = true
    try {
      if (id) await api(`/api/announcements/${id}`, { method: 'PUT', body })
      else await api('/api/announcements', { method: 'POST', body })
      Modal.close()
      toast(id ? 'Объявление обновлено' : 'Объявление опубликовано')
      Router.reload()
    } catch (e) {
      $('#a-err').textContent = e.message
      $('#a-err').hidden = false
      $('#a-save').disabled = false
    }
  },

  async remove(id) {
    const a = AnnouncementsPage.list.find(x => x.id === id)
    if (!a) return
    const ok = await confirmDialog({
      title: 'Удалить объявление?',
      text: `«<b>${esc(a.title)}</b>» пропадёт с дэшборда участников.`,
      confirm: 'Удалить', danger: true,
    })
    if (!ok) return
    try {
      await api(`/api/announcements/${id}`, { method: 'DELETE' })
      AnnouncementsPage.list = AnnouncementsPage.list.filter(x => x.id !== id)
      toast('Объявление удалено')
      AnnouncementsPage.paint()
    } catch (e) { toast(e.message, 'err') }
  },
}

PAGES.announcements = AnnouncementsPage
