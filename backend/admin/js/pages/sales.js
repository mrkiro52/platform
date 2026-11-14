'use strict'
// Отдел продаж: CRM с лидами, календарь встреч и статистика по дням. Раздел видят четверо —
// Ханиль (главный админ), Денис, Саша и Эмиль. Кто из них вошёл, говорит сервер (me).

const SALES_STATUS = {
  new: ['Заявка', 'badge-gray'],
  dialog: ['Веду диалог', 'badge-blue'],
  call_scheduled: ['Назначен созвон', 'badge-violet'],
  call_done: ['Провёл созвон', 'badge-orange'],
  closed: ['Закрыт в продажу', 'badge-green'],
  lost: ['Слился', 'badge-red'],
}
// Цвета статусов на графиках
const SALES_COLOR = {
  new: 'var(--text3)', dialog: 'var(--blue)', call_scheduled: 'var(--violet)',
  call_done: 'var(--orange)', closed: 'var(--green)', lost: 'var(--red)',
}
const SALES_FORMAT = { installment: 'Рассрочка', full: 'Оплата разом' }
const SALES_DURATIONS = [15, 30, 45, 60]
const MSK = 3 * 3600 * 1000

const Sales = {
  me: null,
  people: [],
  use(data) { Sales.me = data.me; Sales.people = data.people || [] },
  name(key) { return (Sales.people.find(p => p.key === key) || {}).name || '—' },
  rub(n) { return `${fmt(Math.round(n || 0))} ₽` },
  // Контакт ссылкой: ник в Telegram или номер телефона
  contact(value) {
    const v = String(value || '').trim()
    if (/^@[\w\d_]{3,}$/.test(v)) return `<a href="https://t.me/${esc(v.slice(1))}" target="_blank" rel="noopener noreferrer">${esc(v)}</a>`
    if (/^\+?[\d\s()-]{7,}$/.test(v)) return `<a href="tel:${esc(v.replace(/[^\d+]/g, ''))}">${esc(v)}</a>`
    return esc(v)
  },
  // День и время по Москве ↔ ISO в UTC
  toIso(day, time) { return new Date(`${day}T${time}:00+03:00`).toISOString() },
  parts(iso) {
    const d = new Date(Date.parse(iso) + MSK)
    return { day: d.toISOString().slice(0, 10), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() }
  },
  clock(minutes) { return `${String(Math.floor(minutes / 60) % 24).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}` },
  monday(day) { return addDays(day, -((dayDate(day).getUTCDay() + 6) % 7)) },
  showError(id, message) { const el = $(id); el.textContent = message; el.hidden = false },
}

// ═══ CRM ═══════════════════════════════════════════════════════════════
const SalesCrmPage = {
  data: null,
  filter: 'all',
  q: '',

  async render(view, ctx) {
    view.innerHTML = SalesCrmPage.head() + skeleton({ rows: 6, kpis: 4 })
    const data = await api('/api/sales/leads')
    if (ctx.stale()) return
    Sales.use(data)
    SalesCrmPage.data = data
    view.innerHTML = SalesCrmPage.head() + `
      <div id="crm-rewards"></div>
      <div class="toolbar">
        <div id="crm-seg"></div>
        <div class="spacer"></div>
        ${searchBox('crm-q', SalesCrmPage.q, 'Контакт или заметка', 'SalesCrmPage.search')}
      </div>
      <div id="crm-list"></div>`
    SalesCrmPage.paintRewards()
    SalesCrmPage.paint()
  },

  head() {
    return pageHead({
      title: 'CRM',
      sub: 'Лиды отдела продаж: от заявки до оплаты',
      actions: `<button class="btn btn-primary" onclick="SalesCrmPage.open(null)">${icon('plus')}Новый лид</button>`,
    })
  },

  // Вознаграждения: каждый видит своё, полную раскладку — только Ханиль
  paintRewards() {
    const r = SalesCrmPage.data.rewards
    const card = (label, value, foot, accent = false, iconName = 'zap') => `
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon${accent ? ' is-lime' : ''}">${icon(iconName, 15)}</span></div>
        <div class="kpi-value">${value}</div>
        <div class="kpi-foot">${foot}</div>
      </div>`
    const deals = n => `${fmt(n)} ${plural(n, 'лид закрыт', 'лида закрыто', 'лидов закрыто')} в продажу`
    let cards = []
    if (r.view === 'all') {
      cards = [
        card('Сумма продаж', Sales.rub(r.total), deals(r.closedCount), false, 'trending-up'),
        card('Тебе', Sales.rub(r.khanil), '70% от суммы минус выплаты Саше и Эмилю', true, 'crown'),
        card('Денису', Sales.rub(r.denis), '30% от всей суммы продаж', false, 'user'),
        card('Саше', Sales.rub(r.sasha), '10% с лидов, которые закрыл Саша', false, 'user'),
        card('Эмилю', Sales.rub(r.emil), '10% с лидов, которые закрыл Эмиль', false, 'user'),
      ]
    } else if (r.view === 'denis') {
      cards = [
        card('Твоё вознаграждение', Sales.rub(r.mine), '30% от всей суммы продаж', true, 'crown'),
        card('Сумма продаж', Sales.rub(r.total), deals(r.closedCount), false, 'trending-up'),
      ]
    } else {
      cards = [
        card('Твоё вознаграждение', Sales.rub(r.mine), '10% от суммы лидов, которые закрыл ты', true, 'crown'),
      ]
    }
    $('#crm-rewards').innerHTML = `<div class="sales-kpis${cards.length === 1 ? ' is-single' : ''}">${cards.join('')}</div>`
  },

  search: debounce((value) => { SalesCrmPage.q = value.trim().toLowerCase(); SalesCrmPage.paint() }, 150),
  setFilter(value) { SalesCrmPage.filter = value; SalesCrmPage.paint() },

  paint() {
    const { leads } = SalesCrmPage.data
    const count = key => leads.filter(l => l.status === key).length
    $('#crm-seg').innerHTML = seg([
      ['all', `Все <span class="count">${leads.length}</span>`],
      ...Object.entries(SALES_STATUS).map(([key, [label]]) => [key, `${label} <span class="count">${count(key)}</span>`]),
    ], SalesCrmPage.filter, 'SalesCrmPage.setFilter')

    const q = SalesCrmPage.q
    const list = leads.filter(l => (SalesCrmPage.filter === 'all' || l.status === SalesCrmPage.filter)
      && (!q || l.contact.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)))
    const el = $('#crm-list')
    if (!leads.length) {
      el.innerHTML = `<div class="card">${emptyState('target', 'Лидов пока нет', 'Внеси первого — кнопка «Новый лид» справа сверху')}</div>`
      return
    }
    if (!list.length) {
      el.innerHTML = `<div class="card">${emptyState('search', 'Ничего не нашлось', 'Попробуй другой статус или запрос', true)}</div>`
      return
    }
    // Менеджеру показываем его вознаграждение по каждому лиду, который он закрыл
    const seller = SalesCrmPage.data.rewards.view === 'seller'
    const share = SalesCrmPage.data.sellerShare || 0.1
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl sales-tbl">
          <thead><tr><th>Лид</th><th>Статус</th><th>Внесён</th><th>Продажа</th><th class="num">Сумма</th><th></th></tr></thead>
          <tbody>${list.map(l => {
            const [label, badge] = SALES_STATUS[l.status] || [l.status, 'badge-gray']
            const mine = seller && l.status === 'closed' && l.closedBy === Sales.me
            const sale = [l.closedBy ? esc(Sales.name(l.closedBy)) : '', l.paymentFormat ? SALES_FORMAT[l.paymentFormat].toLowerCase() : ''].filter(Boolean).join(' · ')
            return `
            <tr>
              <td><div class="cell-main sales-contact">${Sales.contact(l.contact)}</div>${l.description ? `<div class="cell-sub sales-note" title="${esc(l.description)}">${esc(l.description)}</div>` : ''}</td>
              <td><span class="badge ${badge}">${label}</span></td>
              <td class="nowrap"><div>${esc(stampLabel(l.createdAt))}</div><div class="cell-sub">${esc(Sales.name(l.createdBy))}</div></td>
              <td class="nowrap">${sale || '<span class="muted">—</span>'}${l.discount ? `<div class="cell-sub">скидка ${fmt(l.discountPercent)}%</div>` : ''}</td>
              <td class="num nowrap">${l.amount ? Sales.rub(l.amount) : '<span class="muted">—</span>'}${mine ? `<div class="cell-sub sales-reward" title="Твоё вознаграждение за этого лида">тебе ${Sales.rub(l.amount * share)}</div>` : ''}</td>
              <td class="actions"><div>
                <button class="btn-icon btn-sm" onclick="SalesCrmPage.schedule(${l.id})" title="Назначить созвон" aria-label="Назначить созвон">${icon('calendar-plus', 15)}</button>
                <button class="btn-icon btn-sm" onclick="SalesCrmPage.open(${l.id})" title="Изменить" aria-label="Изменить">${icon('pencil', 15)}</button>
                <button class="btn-icon btn-sm is-danger" onclick="SalesCrmPage.remove(${l.id})" title="Удалить" aria-label="Удалить">${icon('trash-2', 15)}</button>
              </div></td>
            </tr>`
          }).join('')}</tbody>
        </table>
      </div>`
  },

  open(id) {
    const l = id ? SalesCrmPage.data.leads.find(x => x.id === id) : null
    const options = (list, selected) => list.map(([value, label]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`).join('')
    const people = Sales.people.map(p => [p.key, p.name])
    Modal.open(`
      ${modalHead(l ? 'Карточка лида' : 'Новый лид', l ? `Внесён ${esc(stampLabel(l.createdAt))}` : 'Дата внесения проставится автоматически')}
      <div class="field">
        <label for="l-contact">Контакт</label>
        <input id="l-contact" value="${esc(l ? l.contact : '')}" maxlength="200" placeholder="@telegram или номер телефона" autofocus/>
      </div>
      <div class="form-row">
        <div class="field"><label for="l-status">Статус</label><select id="l-status" onchange="SalesCrmPage.onStatus()">${options(Object.entries(SALES_STATUS).map(([k, [label]]) => [k, label]), l ? l.status : 'new')}</select></div>
        <div class="field"><label for="l-created">Кто внёс</label><select id="l-created">${options(people, l ? l.createdBy : Sales.me)}</select></div>
      </div>
      <div class="field"><label for="l-desc">Описание</label><textarea id="l-desc" rows="4" placeholder="Заметка про лида: откуда пришёл, что хочет, о чём договорились">${esc(l ? l.description : '')}</textarea></div>
      <div class="field-label sales-group">Продажа</div>
      <div class="form-row">
        <div class="field"><label for="l-closed">Кто закрыл в продажу</label><select id="l-closed">${options([['', 'Пока никто'], ...people], l && l.closedBy ? l.closedBy : '')}</select></div>
        <div class="field"><label for="l-format">Формат оплаты</label><select id="l-format">${options([['', 'Не выбран'], ...Object.entries(SALES_FORMAT)], l && l.paymentFormat ? l.paymentFormat : '')}</select></div>
      </div>
      <div class="form-row">
        <div class="field"><label for="l-amount">Сумма продажи, ₽</label><input id="l-amount" type="number" min="0" step="1" inputmode="numeric" value="${l && l.amount ? l.amount : ''}" placeholder="0"/></div>
        <div class="field">
          <label for="l-percent">Скидка</label>
          <div class="sales-discount">
            <label class="switch"><input type="checkbox" id="l-discount"${l && l.discount ? ' checked' : ''} onchange="SalesCrmPage.onDiscount()"/><span class="switch-track"><span class="switch-knob"></span></span><span class="switch-label" id="l-discount-label">${l && l.discount ? 'Да' : 'Нет'}</span></label>
            <input id="l-percent" type="number" min="0" max="100" step="1" inputmode="numeric" value="${l && l.discount ? l.discountPercent : 0}"${l && l.discount ? '' : ' disabled'} aria-label="Процент скидки"/>
            <span class="sales-discount-unit">%</span>
          </div>
        </div>
      </div>
      <div class="form-error" id="l-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="l-save" onclick="SalesCrmPage.save(${l ? l.id : 'null'})">${icon(l ? 'check' : 'plus')}${l ? 'Сохранить' : 'Внести лида'}</button>
      </div>`, { size: 'lg' })
  },

  // Лида закрыли в продажу — по умолчанию его закрыл тот, кто сейчас в карточке
  onStatus() {
    if ($('#l-status').value === 'closed' && !$('#l-closed').value) $('#l-closed').value = Sales.me
  },

  onDiscount() {
    const on = $('#l-discount').checked
    $('#l-discount-label').textContent = on ? 'Да' : 'Нет'
    $('#l-percent').disabled = !on
    if (!on) $('#l-percent').value = 0
    else $('#l-percent').focus()
  },

  async save(id) {
    const body = {
      contact: $('#l-contact').value.trim(),
      status: $('#l-status').value,
      createdBy: $('#l-created').value,
      description: $('#l-desc').value.trim(),
      closedBy: $('#l-closed').value || null,
      paymentFormat: $('#l-format').value || null,
      amount: Number($('#l-amount').value) || 0,
      discount: $('#l-discount').checked,
      discountPercent: Number($('#l-percent').value) || 0,
    }
    if (!body.contact) return Sales.showError('#l-err', 'Укажи контакт лида: ник в Telegram или номер телефона')
    $('#l-save').disabled = true
    try {
      if (id) await api(`/api/sales/leads/${id}`, { method: 'PUT', body })
      else await api('/api/sales/leads', { method: 'POST', body })
      Modal.close()
      toast(id ? 'Лид обновлён' : 'Лид внесён')
      Router.reload()
    } catch (e) {
      Sales.showError('#l-err', e.message)
      $('#l-save').disabled = false
    }
  },

  async remove(id) {
    const l = SalesCrmPage.data.leads.find(x => x.id === id)
    if (!l) return
    const ok = await confirmDialog({
      title: 'Точно удалить лида?',
      text: `Лид <b>${esc(l.contact)}</b> пропадёт из CRM. Вернуть его не получится.`,
      confirm: 'Да, удалить', danger: true,
    })
    if (!ok) return
    try {
      await api(`/api/sales/leads/${id}`, { method: 'DELETE' })
      toast('Лид удалён')
      Router.reload()
    } catch (e) { toast(e.message, 'err') }
  },

  // Назначить созвон: открываем календарь с заготовкой встречи по этому лиду
  schedule(id) { Router.go(`/sales/calendar?lead=${id}`) },
}

// ═══ Календарь ═════════════════════════════════════════════════════════
const SCAL_HOUR = 52   // высота часа в пикселях

const SalesCalendarPage = {
  week: null,      // понедельник показанной недели
  events: [],
  draft: null,     // встреча, открытая в форме

  async render(view, ctx) {
    const asked = ctx.query.get('week') || ''
    SalesCalendarPage.week = Sales.monday(/^\d{4}-\d{2}-\d{2}$/.test(asked) ? asked : mskDay())
    const week = SalesCalendarPage.week
    view.innerHTML = SalesCalendarPage.head() + skeleton({ rows: 8 })
    const from = Sales.toIso(week, '00:00')
    const to = Sales.toIso(addDays(week, 7), '00:00')
    const data = await api(`/api/sales/events?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`)
    if (ctx.stale()) return
    Sales.use(data)
    SalesCalendarPage.events = data.events
    view.innerHTML = SalesCalendarPage.head() + SalesCalendarPage.grid()
    // Открываем на рабочем утре, а не на полуночи
    $('#scal-scroll').scrollTop = SCAL_HOUR * 8 - 8

    // Пришли из CRM по кнопке «Назначить созвон» — сразу открываем заготовку
    const leadId = Number(ctx.query.get('lead'))
    if (leadId) {
      Router.setQuery({ lead: null })
      const { leads } = await api('/api/sales/leads')
      if (ctx.stale()) return
      const lead = leads.find(l => l.id === leadId)
      if (lead) SalesCalendarPage.open(null, { lead })
      else toast('Лид не найден', 'err')
    }
  },

  rangeLabel() {
    const a = dayDate(SalesCalendarPage.week), b = dayDate(addDays(SalesCalendarPage.week, 6))
    const left = a.getUTCMonth() === b.getUTCMonth() ? a.getUTCDate() : `${a.getUTCDate()} ${MONTHS_GEN[a.getUTCMonth()]}`
    return `${left} – ${b.getUTCDate()} ${MONTHS_GEN[b.getUTCMonth()]} ${b.getUTCFullYear()}`
  },

  head() {
    return pageHead({
      title: 'Календарь',
      sub: `Встречи и созвоны отдела продаж · время московское`,
      actions: `
        <div class="scal-nav">
          <button class="btn-icon is-bordered" onclick="SalesCalendarPage.shift(-1)" title="Предыдущая неделя" aria-label="Предыдущая неделя">${icon('chevron-left', 17)}</button>
          <button class="btn btn-secondary" onclick="SalesCalendarPage.shift(0)">Сегодня</button>
          <button class="btn-icon is-bordered" onclick="SalesCalendarPage.shift(1)" title="Следующая неделя" aria-label="Следующая неделя">${icon('chevron-right', 17)}</button>
          <span class="scal-range">${SalesCalendarPage.week ? SalesCalendarPage.rangeLabel() : ''}</span>
        </div>
        <button class="btn btn-primary" onclick="SalesCalendarPage.open(null)">${icon('plus')}Новая встреча</button>`,
    })
  },

  shift(dir) {
    const week = dir ? addDays(SalesCalendarPage.week, dir * 7) : Sales.monday(mskDay())
    Router.go(`/sales/calendar?week=${week}`)
  },

  // Встречи одного дня раскладываются по колонкам, если пересекаются по времени
  layout(events) {
    const list = events.map(e => {
      const start = Sales.parts(e.startsAt).minutes
      return { e, start, end: Math.min(start + Math.max(e.duration, 20), 1440) }
    }).sort((a, b) => a.start - b.start || b.end - a.end)
    const out = []
    let cluster = [], clusterEnd = -1
    const flush = () => {
      const cols = []
      for (const it of cluster) {
        let c = cols.findIndex(end => end <= it.start)
        if (c < 0) { c = cols.length; cols.push(it.end) } else cols[c] = it.end
        it.col = c
      }
      for (const it of cluster) it.cols = cols.length
      out.push(...cluster)
      cluster = []
    }
    for (const it of list) {
      if (cluster.length && it.start >= clusterEnd) flush()
      cluster.push(it)
      clusterEnd = Math.max(clusterEnd, it.end)
    }
    if (cluster.length) flush()
    return out
  },

  grid() {
    const week = SalesCalendarPage.week
    const today = mskDay()
    const nowMin = Sales.parts(new Date().toISOString()).minutes
    const days = Array.from({ length: 7 }, (_, i) => addDays(week, i))
    const byDay = Object.fromEntries(days.map(d => [d, []]))
    for (const e of SalesCalendarPage.events) {
      const { day } = Sales.parts(e.startsAt)
      if (byDay[day]) byDay[day].push(e)
    }
    const who = e => e.participants.map(Sales.name).join(', ')
    const col = (day) => `
      <div class="scal-col${day === today ? ' is-today' : ''}" data-day="${day}" onclick="SalesCalendarPage.clickCol(event, '${day}')">
        ${day === today ? `<div class="scal-now" style="top:${(nowMin / 60 * SCAL_HOUR).toFixed(1)}px"></div>` : ''}
        ${SalesCalendarPage.layout(byDay[day]).map(({ e, start, col: c, cols }) => {
          const top = start / 60 * SCAL_HOUR
          const height = Math.max(Math.min(e.duration, 1440 - start) / 60 * SCAL_HOUR, 22)
          const time = `${Sales.clock(start)}–${Sales.clock(start + e.duration)}`
          return `
          <button type="button" class="scal-ev sp-${esc(e.participants[0] || 'khanil')}${e.duration <= 30 ? ' is-short' : ''}"
            style="top:${top.toFixed(1)}px;height:${(height - 2).toFixed(1)}px;left:calc(${(c / cols * 100).toFixed(2)}% + 2px);width:calc(${(100 / cols).toFixed(2)}% - 4px)"
            onclick="event.stopPropagation();SalesCalendarPage.open(${e.id})" title="${esc(`${time} · ${e.title} · ${who(e)}`)}">
            ${e.duration <= 30
              ? `<span class="scal-ev-time">${Sales.clock(start)}</span><span class="scal-ev-title">${esc(e.title)}</span>`
              : `<span class="scal-ev-title">${esc(e.title)}</span><span class="scal-ev-time">${time}</span><span class="scal-ev-who">${esc(who(e))}</span>`}
          </button>`
        }).join('')}
      </div>`
    return `
      <div class="card scal">
        <div class="scal-scroll" id="scal-scroll">
          <div class="scal-inner">
            <div class="scal-head">
              <div class="scal-corner">МСК</div>
              ${days.map(d => {
                const date = dayDate(d)
                return `<div class="scal-day${d === today ? ' is-today' : ''}"><span class="scal-wd">${WD_SHORT[date.getUTCDay()]}</span><span class="scal-num">${date.getUTCDate()}</span></div>`
              }).join('')}
            </div>
            <div class="scal-body" style="--scal-hour:${SCAL_HOUR}px;height:${24 * SCAL_HOUR}px">
              <div class="scal-times">${Array.from({ length: 24 }, (_, h) => `<div class="scal-time" style="top:${h * SCAL_HOUR}px">${h ? `${String(h).padStart(2, '0')}:00` : ''}</div>`).join('')}</div>
              ${days.map(col).join('')}
            </div>
          </div>
        </div>
        <div class="scal-legend">${Sales.people.map(p => `<span class="scal-legend-item"><i class="sp-${p.key}"></i>${esc(p.name)}</span>`).join('')}<span class="scal-legend-hint">Нажми на свободное время, чтобы завести встречу</span></div>
      </div>`
  },

  // Клик по свободному месту колонки — новая встреча на это время (с шагом 15 минут)
  clickCol(event, day) {
    const rect = event.currentTarget.getBoundingClientRect()
    const minutes = Math.max(0, Math.min(1425, Math.floor((event.clientY - rect.top) / SCAL_HOUR * 60 / 15) * 15))
    SalesCalendarPage.open(null, { day, time: Sales.clock(minutes) })
  },

  // Форма встречи: новая (можно с днём и временем или по лиду) или существующая
  open(id, { day = null, time = null, lead = null } = {}) {
    const e = id ? SalesCalendarPage.events.find(x => x.id === id) : null
    let draft
    if (e) {
      const p = Sales.parts(e.startsAt)
      draft = { id: e.id, title: e.title, description: e.description, participants: e.participants, day: p.day, time: Sales.clock(p.minutes), duration: e.duration, leadId: e.leadId }
    } else {
      // По умолчанию — сегодня, ближайшие полчаса
      const nowP = Sales.parts(new Date().toISOString())
      const next = Math.min(Math.ceil((nowP.minutes + 1) / 30) * 30, 1410)
      draft = {
        id: null,
        title: lead ? `Созвон: ${lead.contact}` : '',
        description: lead ? [`Лид: ${lead.contact}`, `Статус: ${(SALES_STATUS[lead.status] || [lead.status])[0]}`, lead.description ? `Заметка: ${lead.description}` : ''].filter(Boolean).join('\n') : '',
        participants: [Sales.me],
        day: day || nowP.day,
        time: time || Sales.clock(next),
        duration: 30,
        leadId: lead ? lead.id : null,
      }
    }
    SalesCalendarPage.draft = draft
    Modal.open(`
      ${modalHead(e ? 'Встреча' : lead ? 'Назначить созвон' : 'Новая встреча', lead ? `По лиду ${esc(lead.contact)} — осталось выбрать день, время и длительность` : draft.leadId ? 'Созвон по лиду из CRM' : '')}
      <div class="field"><label for="e-title">Название</label><input id="e-title" value="${esc(draft.title)}" maxlength="200" placeholder="Созвон с клиентом"${lead ? '' : ' autofocus'}/></div>
      <div class="field"><label for="e-desc">Описание</label><textarea id="e-desc" rows="4" placeholder="О чём встреча, ссылка на созвон, контакты">${esc(draft.description)}</textarea></div>
      <div class="field">
        <label>Кто идёт на созвон</label>
        <div class="vac-cat-checks" id="e-people">${Sales.people.map(p => `<label class="course-check">
          <input type="checkbox" value="${p.key}"${draft.participants.includes(p.key) ? ' checked' : ''}/>
          <span class="course-box">${icon('check', 12)}</span><span>${esc(p.name)}</span>
        </label>`).join('')}</div>
      </div>
      <div class="form-row">
        <div class="field"><label for="e-day">День</label><input id="e-day" type="date" value="${draft.day}"${lead ? ' autofocus' : ''}/></div>
        <div class="field"><label for="e-time">Начало, МСК</label><input id="e-time" type="time" step="900" value="${draft.time}"/></div>
      </div>
      <div class="field">
        <label>Длительность</label>
        <div class="seg" id="e-duration" role="radiogroup">${SALES_DURATIONS.map(d => `<button type="button" role="radio" aria-checked="${d === draft.duration}" class="${d === draft.duration ? 'active' : ''}" onclick="SalesCalendarPage.setDuration(${d})">${d} мин</button>`).join('')}</div>
      </div>
      <div class="form-error" id="e-err" hidden></div>
      <div class="modal-actions">
        ${e ? `<button class="btn btn-danger sales-left" onclick="SalesCalendarPage.remove(${e.id})">${icon('trash-2')}Удалить</button>` : ''}
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="e-save" onclick="SalesCalendarPage.save()">${icon(e ? 'check' : 'plus')}${e ? 'Сохранить' : lead ? 'Назначить созвон' : 'Добавить'}</button>
      </div>`, { size: 'lg' })
  },

  setDuration(d) {
    SalesCalendarPage.draft.duration = d
    document.querySelectorAll('#e-duration button').forEach(b => {
      const on = b.textContent.trim() === `${d} мин`
      b.classList.toggle('active', on)
      b.setAttribute('aria-checked', on)
    })
  },

  async save() {
    const draft = SalesCalendarPage.draft
    const day = $('#e-day').value, time = $('#e-time').value
    const body = {
      title: $('#e-title').value.trim(),
      description: $('#e-desc').value.trim(),
      participants: [...document.querySelectorAll('#e-people input:checked')].map(i => i.value),
      duration: draft.duration,
      leadId: draft.leadId,
    }
    if (!body.title) return Sales.showError('#e-err', 'Укажи название встречи')
    if (!body.participants.length) return Sales.showError('#e-err', 'Выбери, кто идёт на созвон')
    if (!day || !time) return Sales.showError('#e-err', 'Укажи день и время начала')
    body.startsAt = Sales.toIso(day, time)
    $('#e-save').disabled = true
    try {
      const res = draft.id
        ? await api(`/api/sales/events/${draft.id}`, { method: 'PUT', body })
        : await api('/api/sales/events', { method: 'POST', body })
      Modal.close()
      toast(draft.id ? 'Встреча обновлена' : res.leadMoved ? 'Созвон назначен, лид переведён в «Назначен созвон»' : draft.leadId ? 'Созвон назначен' : 'Встреча добавлена')
      // Показываем неделю, на которую попала встреча
      Router.go(`/sales/calendar?week=${Sales.monday(day)}`, { replace: true })
    } catch (e) {
      Sales.showError('#e-err', e.message)
      $('#e-save').disabled = false
    }
  },

  async remove(id) {
    const e = SalesCalendarPage.events.find(x => x.id === id)
    if (!e) return
    const ok = await confirmDialog({
      title: 'Точно удалить встречу?',
      text: `«<b>${esc(e.title)}</b>» пропадёт из календаря у всех участников.`,
      confirm: 'Да, удалить', danger: true,
    })
    if (!ok) return
    try {
      await api(`/api/sales/events/${id}`, { method: 'DELETE' })
      toast('Встреча удалена')
      Router.reload()
    } catch (err) { toast(err.message, 'err') }
  },
}

// ═══ Статистика ════════════════════════════════════════════════════════
// Только количества лидов и статусов по дням — денег здесь нет.
const SALES_PERIODS = [7, 14, 30, 90]

const SalesStatsPage = {
  async render(view, ctx) {
    const asked = Number(ctx.query.get('days'))
    const period = SALES_PERIODS.includes(asked) ? asked : 30
    view.innerHTML = SalesStatsPage.head() + skeleton({ rows: 8, kpis: 4 })
    const d = await api(`/api/sales/stats?days=${period}`)
    if (ctx.stale()) return
    Sales.use(d)

    const statuses = Object.entries(SALES_STATUS)
    const sum = pick => d.days.reduce((acc, row) => acc + pick(row), 0)
    const today = d.days[d.days.length - 1]
    const span = `${period} ${plural(period, 'день', 'дня', 'дней')}`
    const card = (label, value, todayValue, iconName, accent = false) => `
      <div class="kpi">
        <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon${accent ? ' is-lime' : ''}">${icon(iconName, 15)}</span></div>
        <div class="kpi-value">${fmt(value)}</div>
        <div class="kpi-foot">сегодня — ${fmt(todayValue)}</div>
      </div>`
    const cell = n => (n ? fmt(n) : '<span class="sstat-zero">0</span>')
    const dayRow = row => {
      const empty = !row.added && statuses.every(([key]) => !row.statuses[key])
      return `
        <tr class="${empty ? 'is-empty' : ''}">
          <td class="nowrap">${esc(dayLabel(row.day, { weekday: true }))}${row.day === d.today ? ' <span class="badge badge-lime">сегодня</span>' : ''}</td>
          <td class="r sstat-added">${cell(row.added)}</td>
          ${statuses.map(([key]) => `<td class="r">${cell(row.statuses[key])}</td>`).join('')}
        </tr>`
    }

    view.innerHTML = SalesStatsPage.head() + `
      <div class="toolbar">
        ${seg(SALES_PERIODS.map(p => [String(p), `${p} дней`]), String(period), 'SalesStatsPage.setPeriod')}
        <div class="spacer"></div>
        <span class="sstat-hint">Время московское</span>
      </div>
      <div class="kpi-grid" style="margin-bottom:16px">
        ${card('Внесено лидов', sum(r => r.added), today.added, 'user-plus', true)}
        ${card('Проведено созвонов', sum(r => r.statuses.call_done), today.statuses.call_done, 'video')}
        ${card('Закрыто в продажу', sum(r => r.statuses.closed), today.statuses.closed, 'circle-check')}
        ${card('Слилось', sum(r => r.statuses.lost), today.statuses.lost, 'x')}
      </div>
      <div class="grid-2-1">
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('activity')}Лиды по дням</div><div class="card-sub">Сколько внесли, закрыли в продажу и сколько слилось</div></div>
            <div class="legend">
              <span class="legend-item"><i class="dot" style="background:var(--lime)"></i>Внесено</span>
              <span class="legend-item"><i class="dot" style="background:var(--green)"></i>Закрыто</span>
              <span class="legend-item"><i class="dot" style="background:var(--red)"></i>Слилось</span>
            </div>
          </div>
          <div id="sstat-chart"></div>
        </div>
        <div class="card">
          <div class="card-head">
            <div><div class="card-title">${icon('filter')}Сейчас в CRM</div><div class="card-sub">${fmt(d.total)} ${plural(d.total, 'лид', 'лида', 'лидов')} — в каком статусе каждый</div></div>
          </div>
          ${Charts.hbars(statuses.map(([key, [label]]) => ({ label, value: d.current[key] || 0, color: SALES_COLOR[key] })))}
        </div>
      </div>
      <div class="section-title sstat-title">По дням</div>
      <p class="sstat-note">«Внесено» — новые лиды за день. Остальные столбцы — сколько лидов перешло в этот статус за день.</p>
      <div class="table-wrap sstat-wrap">
        <table class="tbl sstat-tbl">
          <thead><tr><th>День</th><th class="r">Внесено</th>${statuses.map(([, [label]]) => `<th class="r">${label}</th>`).join('')}</tr></thead>
          <tbody>
            <tr class="sstat-total">
              <td>Итого за ${span}</td>
              <td class="r sstat-added">${cell(sum(r => r.added))}</td>
              ${statuses.map(([key]) => `<td class="r">${cell(sum(r => r.statuses[key]))}</td>`).join('')}
            </tr>
            ${[...d.days].reverse().map(dayRow).join('')}
          </tbody>
        </table>
      </div>`

    Charts.line($('#sstat-chart'), {
      labels: d.days.map(r => r.day), height: 250,
      xLabel: day => dayLabel(day, { short: true }),
      tipTitle: day => dayLabel(day, { weekday: true }),
      series: [
        { name: 'Внесено', color: 'var(--lime)', values: d.days.map(r => r.added), area: true },
        { name: 'Закрыто в продажу', color: 'var(--green)', values: d.days.map(r => r.statuses.closed) },
        { name: 'Слилось', color: 'var(--red)', values: d.days.map(r => r.statuses.lost) },
      ],
    })
  },

  head() {
    return pageHead({ title: 'Статистика', sub: 'Сколько лидов внесли и как они двигались по статусам — по дням' })
  },

  setPeriod(value) { Router.go(`/sales/stats?days=${value}`) },
}

PAGES.salesCrm = SalesCrmPage
PAGES.salesStats = SalesStatsPage
PAGES.salesCalendar = SalesCalendarPage
