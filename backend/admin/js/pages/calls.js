'use strict'
// Созвоны: наборы слотов на месяц и календарь записей.

// Слоты часовые: 08:00–09:00 … 22:00–23:00
const CALL_HOURS = Array.from({ length: 15 }, (_, i) => i + 8)
const CALL_MONTHS = [[9, 'Сентябрь', 30], [10, 'Октябрь', 31], [11, 'Ноябрь', 30]]
const pad2 = (n) => String(n).padStart(2, '0')
const slotLabel = (h) => `${pad2(h)}:00–${pad2(h + 1)}:00`
const callDateKey = (month, day) => `2026-${pad2(month)}-${pad2(day)}`

const CallsPage = {
  sessions: [],
  draft: {},      // id набора → { 'YYYY-MM-DD': Set(часы) } — то, что на экране
  expanded: new Set(),
  month: 9,

  async render(view, ctx) {
    const qm = Number(ctx.query.get('month'))
    const nowMonth = Number(mskDay().slice(5, 7))
    CallsPage.month = [9, 10, 11].includes(qm) ? qm : ([9, 10, 11].includes(nowMonth) ? nowMonth : 9)
    view.innerHTML = CallsPage.head() + skeleton({ rows: 8 })
    const sessions = await api('/api/calls/admin/sessions')
    if (ctx.stale()) return
    CallsPage.load(sessions)
    view.innerHTML = CallsPage.head() + '<div id="calls-summary"></div><div id="calls-list"></div>'
    CallsPage.paint()
    Router.guard = () => {
      const dirty = CallsPage.sessions.filter(s => CallsPage.isDirty(s.id))
      return dirty.length ? `Несохранённые слоты: ${dirty.map(s => s.title).join(', ')}.` : null
    }
  },

  head() {
    return pageHead({
      title: 'Слоты созвонов',
      sub: 'По 4 набора на месяц. Открытый набор видят участники осеннего лагеря и записываются на свободные слоты',
      actions: `
        <span id="calls-months"></span>
        <a class="btn btn-secondary" href="${BASE}/calls/calendar">${icon('calendar-days')}Календарь записей</a>`,
    })
  },

  load(sessions) {
    CallsPage.sessions = sessions
    CallsPage.draft = {}
    for (const s of sessions) CallsPage.draft[s.id] = CallsPage.draftFrom(s)
    // Раскрываем открытые наборы — с ними обычно и работают
    if (!CallsPage.expanded.size) sessions.filter(s => s.isOpen).forEach(s => CallsPage.expanded.add(s.id))
  },

  draftFrom(session) {
    const draft = {}
    for (const day of session.days) draft[day.date] = new Set(day.slots.map(s => s.hour))
    return draft
  },

  // Занятые слоты нельзя снять — иначе бронь студента исчезнет молча
  bookedHours(session, date) {
    const day = session.days.find(d => d.date === date)
    return new Set((day ? day.slots : []).filter(s => s.taken).map(s => s.hour))
  },

  isDirty(id) {
    const session = CallsPage.sessions.find(s => s.id === id)
    const saved = CallsPage.draftFrom(session)
    const draft = CallsPage.draft[id] || {}
    const a = Object.keys(saved).sort()
    const b = Object.keys(draft).sort()
    if (a.join() !== b.join()) return true
    return a.some(d => [...saved[d]].sort().join() !== [...draft[d]].sort().join())
  },

  setMonth(month) {
    CallsPage.month = Number(month)
    Router.setQuery({ month })
    CallsPage.paint()
  },

  paint() {
    const counts = CallsPage.sessions.reduce((acc, s) => { if (s.isOpen) acc[s.month] = (acc[s.month] || 0) + 1; return acc }, {})
    $('#calls-months').innerHTML = seg(CALL_MONTHS.map(([m, name]) =>
      [String(m), `${name}${counts[m] ? ` <span class="count" title="открытых наборов">${counts[m]}</span>` : ''}`]), String(CallsPage.month), 'CallsPage.setMonth')

    const list = CallsPage.sessions.filter(s => s.month === CallsPage.month)
    const slots = list.reduce((sum, s) => sum + s.days.reduce((n, d) => n + d.slots.length, 0), 0)
    const booked = list.reduce((sum, s) => sum + s.days.reduce((n, d) => n + d.slots.filter(x => x.taken).length, 0), 0)
    const open = list.filter(s => s.isOpen).length
    $('#calls-summary').innerHTML = `
      <div class="toolbar">
        <span class="badge ${open ? 'badge-lime' : 'badge-gray'}">${icon(open ? 'circle-check' : 'circle')}${open} ${plural(open, 'набор открыт', 'набора открыто', 'наборов открыто')}</span>
        <span class="badge badge-gray">${fmt(slots)} ${plural(slots, 'слот', 'слота', 'слотов')}</span>
        <span class="badge ${booked ? 'badge-green' : 'badge-gray'}">${fmt(booked)} ${plural(booked, 'запись', 'записи', 'записей')}</span>
      </div>`
    $('#calls-list').innerHTML = list.length ? list.map(CallsPage.card).join('') : `<div class="card">${emptyState('calendar', 'Наборов на этот месяц нет')}</div>`
  },

  repaintCard(id) {
    const session = CallsPage.sessions.find(s => s.id === id)
    const el = $(`#call-${id}`)
    if (el) el.outerHTML = CallsPage.card(session)
  },

  card(session) {
    const draft = CallsPage.draft[session.id] || {}
    const dates = Object.keys(draft).sort()
    const totalSlots = dates.reduce((sum, d) => sum + draft[d].size, 0)
    const booked = session.days.flatMap(d => d.slots).filter(s => s.taken).length
    const expanded = CallsPage.expanded.has(session.id)
    const dirty = CallsPage.isDirty(session.id)
    const [, monthName, monthDays] = CALL_MONTHS.find(([m]) => m === session.month) || [0, '', 30]

    return `
      <section class="call-session${expanded ? ' expanded' : ''}${session.isOpen ? ' is-open-set' : ''}" id="call-${session.id}">
        <div class="call-session-head">
          <button class="call-session-toggle" onclick="CallsPage.toggleExpand(${session.id})" aria-expanded="${expanded}">
            <span class="chev">${icon('chevron-right', 18)}</span>
            <span>
              <span class="call-session-title">${esc(session.title)}</span>
              <span class="call-session-meta">
                ${totalSlots ? `${totalSlots} ${plural(totalSlots, 'слот', 'слота', 'слотов')} в ${dates.length} ${plural(dates.length, 'день', 'дня', 'дней')}` : 'слотов нет'}
                ${booked ? `<span class="badge badge-green">${booked} ${plural(booked, 'запись', 'записи', 'записей')}</span>` : ''}
                ${dirty ? `<span class="badge badge-orange">${icon('pencil')}не сохранено</span>` : ''}
              </span>
            </span>
          </button>
          <label class="switch" title="${session.isOpen ? 'Закрыть запись' : 'Открыть запись для участников'}">
            <input type="checkbox" ${session.isOpen ? 'checked' : ''} onchange="CallsPage.toggleOpen(${session.id}, this)"/>
            <span class="switch-track"><span class="switch-knob"></span></span>
            <span class="switch-label">${session.isOpen ? 'Запись открыта' : 'Закрыт'}</span>
          </label>
        </div>
        ${expanded ? `
          <div class="call-session-body">
            <div class="call-days-label">${monthName}: нажми на день, чтобы добавить или убрать</div>
            <div class="call-day-picker">
              ${Array.from({ length: monthDays }, (_, i) => i + 1).map(day => {
                const key = callDateKey(session.month, day)
                const on = !!draft[key]
                const has = on ? draft[key].size : 0
                return `<button class="call-day${on ? ' on' : ''}" onclick="CallsPage.toggleDay(${session.id}, '${key}')" title="${dayLabel(key, { weekday: true })}">
                  ${day}<small>${WD_SHORT[dayDate(key).getUTCDay()]}</small>${has ? `<i>${has}</i>` : ''}
                </button>`
              }).join('')}
            </div>
            ${dates.length ? dates.map(date => CallsPage.daySlots(session, date)).join('') : `<div class="card-sub" style="margin-top:10px">Дни не выбраны</div>`}
            <div class="call-session-actions">
              ${dirty ? `<span class="dirty-note">${icon('circle-alert', 15)}Есть несохранённые изменения</span>` : ''}
              <button class="btn btn-secondary btn-sm" onclick="CallsPage.reset(${session.id})" ${dirty ? '' : 'disabled'}>${icon('rotate-ccw', 14)}Сбросить</button>
              <button class="btn btn-primary btn-sm" onclick="CallsPage.save(${session.id})" ${dirty ? '' : 'disabled'}>${icon('check', 14)}Сохранить слоты</button>
            </div>
          </div>` : ''}
      </section>`
  },

  daySlots(session, date) {
    const chosen = CallsPage.draft[session.id][date]
    const locked = CallsPage.bookedHours(session, date)
    const dayInfo = session.days.find(d => d.date === date)
    return `
      <div class="call-day-row">
        <div class="call-day-name">
          ${dayLabel(date, { weekday: true })}
          <button class="call-day-all" onclick="CallsPage.toggleAll(${session.id}, '${date}')">${chosen.size === CALL_HOURS.length ? 'снять все' : 'выбрать все'}</button>
        </div>
        <div class="call-slot-grid">
          ${CALL_HOURS.map(h => {
            const on = chosen.has(h)
            const isLocked = locked.has(h)
            const who = isLocked && dayInfo ? (dayInfo.slots.find(s => s.hour === h) || {}).nickname : null
            return `<button class="call-slot${on ? ' on' : ''}${isLocked ? ' locked' : ''}" ${isLocked ? 'disabled' : ''}
                      title="${isLocked ? `Занято: ${esc(who || '—')}` : slotLabel(h)}"
                      onclick="CallsPage.toggleHour(${session.id}, '${date}', ${h})">
              ${slotLabel(h)}${isLocked ? `<i>${esc(who || 'занято')}</i>` : ''}
            </button>`
          }).join('')}
        </div>
      </div>`
  },

  toggleExpand(id) {
    if (CallsPage.expanded.has(id)) CallsPage.expanded.delete(id)
    else CallsPage.expanded.add(id)
    CallsPage.repaintCard(id)
  },

  toggleDay(id, date) {
    const draft = CallsPage.draft[id]
    const session = CallsPage.sessions.find(s => s.id === id)
    if (draft[date]) {
      if (CallsPage.bookedHours(session, date).size) return toast('В этот день есть записи — сначала сними их в календаре', 'err')
      delete draft[date]
    } else {
      draft[date] = new Set()
    }
    CallsPage.repaintCard(id)
  },

  toggleHour(id, date, hour) {
    const set = CallsPage.draft[id][date]
    if (set.has(hour)) set.delete(hour)
    else set.add(hour)
    CallsPage.repaintCard(id)
  },

  toggleAll(id, date) {
    const set = CallsPage.draft[id][date]
    const locked = CallsPage.bookedHours(CallsPage.sessions.find(s => s.id === id), date)
    CallsPage.draft[id][date] = set.size === CALL_HOURS.length ? new Set(locked) : new Set(CALL_HOURS)
    CallsPage.repaintCard(id)
  },

  reset(id) {
    CallsPage.draft[id] = CallsPage.draftFrom(CallsPage.sessions.find(s => s.id === id))
    CallsPage.repaintCard(id)
  },

  async toggleOpen(id, input) {
    const isOpen = input.checked
    input.disabled = true
    try {
      await api(`/api/calls/admin/sessions/${id}`, { method: 'PATCH', body: { isOpen } })
      const session = CallsPage.sessions.find(s => s.id === id)
      session.isOpen = isOpen
      if (isOpen) CallsPage.expanded.add(id)
      CallsPage.paint()
      toast(isOpen ? 'Набор открыт для записи' : 'Набор закрыт')
    } catch (e) {
      input.checked = !isOpen
      input.disabled = false
      toast(`Не удалось переключить: ${e.message}`, 'err')
    }
  },

  async save(id) {
    const draft = CallsPage.draft[id]
    const days = Object.keys(draft).sort().map(date => ({ date, hours: [...draft[date]].sort((a, b) => a - b) }))
    try {
      const res = await api(`/api/calls/admin/sessions/${id}/slots`, { method: 'PUT', body: { days } })
      const session = CallsPage.sessions.find(s => s.id === id)
      session.days = res.days
      CallsPage.draft[id] = CallsPage.draftFrom(session)
      CallsPage.paint()
      if (res.keptBooked && res.keptBooked.length) {
        toast(`Сохранено. ${res.keptBooked.length} ${plural(res.keptBooked.length, 'занятый слот оставлен', 'занятых слота оставлены', 'занятых слотов оставлены')} как есть`, 'err')
      } else {
        toast('Слоты сохранены')
      }
    } catch (e) {
      toast(`Не сохранилось: ${e.message}`, 'err')
    }
  },
}

const CallsCalendarPage = {
  days: [],
  view: 'upcoming',
  bookedOnly: false,

  async render(view, ctx) {
    CallsCalendarPage.view = ['past', 'all'].includes(ctx.query.get('view')) ? ctx.query.get('view') : 'upcoming'
    CallsCalendarPage.bookedOnly = ctx.query.get('booked') === '1'
    view.innerHTML = CallsCalendarPage.head() + skeleton({ rows: 8 })
    const days = await api('/api/calls/admin/calendar')
    if (ctx.stale()) return
    CallsCalendarPage.days = days
    view.innerHTML = CallsCalendarPage.head() + `
      <div class="toolbar">
        <span id="cal-view"></span>
        <span id="cal-booked"></span>
        <span class="spacer"></span>
        <span id="cal-summary" class="updated"></span>
      </div>
      <div id="cal-list"></div>`
    CallsCalendarPage.paint()
  },

  head() {
    return pageHead({
      title: 'Календарь записей',
      sub: 'Все выставленные слоты по дням — с никами тех, кто записался',
      actions: `
        <a class="btn btn-secondary" href="${BASE}/calls">${icon('calendar-plus')}Слоты</a>
        <button class="btn-icon is-bordered" onclick="Router.reload()" title="Обновить" aria-label="Обновить">${icon('refresh-cw', 16)}</button>`,
    })
  },

  setView(v) {
    CallsCalendarPage.view = v
    Router.setQuery({ view: v === 'upcoming' ? null : v })
    CallsCalendarPage.paint()
  },

  setBooked(v) {
    CallsCalendarPage.bookedOnly = v === '1'
    Router.setQuery({ booked: v === '1' ? '1' : null })
    CallsCalendarPage.paint()
  },

  paint() {
    const today = mskDay()
    $('#cal-view').innerHTML = seg([['upcoming', 'Впереди'], ['past', 'Прошедшие'], ['all', 'Все']], CallsCalendarPage.view, 'CallsCalendarPage.setView')
    $('#cal-booked').innerHTML = seg([['0', 'Все слоты'], ['1', 'Только записи']], CallsCalendarPage.bookedOnly ? '1' : '0', 'CallsCalendarPage.setBooked')

    let days = CallsCalendarPage.days.filter(d =>
      CallsCalendarPage.view === 'all' || (CallsCalendarPage.view === 'upcoming' ? d.date >= today : d.date < today))
    if (CallsCalendarPage.view === 'past') days = [...days].reverse()
    days = days
      .map(d => ({ ...d, slots: CallsCalendarPage.bookedOnly ? d.slots.filter(s => s.nickname) : d.slots }))
      .filter(d => d.slots.length)

    const all = days.flatMap(d => d.slots)
    const booked = all.filter(s => s.nickname).length
    $('#cal-summary').textContent = all.length ? `${fmt(booked)} ${plural(booked, 'запись', 'записи', 'записей')} · ${fmt(all.length - booked)} ${plural(all.length - booked, 'свободный слот', 'свободных слота', 'свободных слотов')}` : ''

    if (!days.length) {
      const text = CallsCalendarPage.days.length
        ? (CallsCalendarPage.view === 'upcoming' ? 'Впереди слотов нет — выставь их в разделе «Слоты созвонов»' : 'В этом виде слотов нет')
        : 'Слотов пока нет — выстави их в разделе «Слоты созвонов»'
      $('#cal-list').innerHTML = `<div class="card">${emptyState('calendar-days', 'Пусто', text)}</div>`
      return
    }

    $('#cal-list').innerHTML = days.map(day => {
      const diff = daysBetween(today, day.date)
      const tag = diff === 0 ? '<span class="badge badge-lime">сегодня</span>' : diff === 1 ? '<span class="badge badge-blue">завтра</span>' : ''
      return `
        <div class="call-cal-day${diff === 0 ? ' is-today' : ''}">
          <div class="call-cal-date">${dayLabel(day.date, { weekday: true })} ${tag}</div>
          <div class="call-cal-slots">
            ${day.slots.map(s => `
              <div class="call-cal-slot${s.nickname ? ' booked' : ''}">
                <span class="call-cal-time">${slotLabel(s.hour)}</span>
                <span class="call-cal-who">${s.nickname ? esc(s.nickname) : 'свободен'}</span>
                ${s.nickname && s.name && s.name !== s.nickname ? `<span class="call-cal-sess">${esc(s.name)}</span>` : ''}
                <span class="call-cal-sess">${esc(s.sessionTitle)}</span>
                ${s.nickname ? `<button class="btn btn-danger btn-sm" onclick="CallsCalendarPage.free(${s.id})">${icon('x', 14)}Снять запись</button>` : ''}
              </div>`).join('')}
          </div>
        </div>`
    }).join('')
  },

  async free(slotId) {
    const slot = CallsCalendarPage.days.flatMap(d => d.slots.map(s => ({ ...s, date: d.date }))).find(s => s.id === slotId)
    if (!slot) return
    const ok = await confirmDialog({
      title: 'Снять запись?',
      text: `<b>${esc(slot.nickname)}</b> — ${dayLabel(slot.date, { weekday: true })}, ${slotLabel(slot.hour)}. Слот снова станет свободным.`,
      confirm: 'Снять запись', danger: true,
    })
    if (!ok) return
    try {
      await api(`/api/calls/admin/slots/${slotId}/booking`, { method: 'DELETE' })
      toast('Запись снята')
      Router.reload()
    } catch (e) { toast(`Не удалось: ${e.message}`, 'err') }
  },
}

PAGES.calls = CallsPage
PAGES.callsCalendar = CallsCalendarPage
