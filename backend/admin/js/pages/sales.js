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
const SALES_FORMAT = { installment: 'Рассрочка', full: 'Сумма разом' }
const SALES_CHEERS = ['красавчик!', 'отличная работа!', 'поздравляю!', 'супер!']
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
  // Сколько дней лид висит заявкой: до двух дней — зелёная плашка, три — жёлтая, дальше красная
  age(iso) {
    const days = Math.max(0, daysBetween(mskDay(Date.parse(iso)), mskDay()))
    return {
      days,
      label: days ? `${days} ${plural(days, 'день', 'дня', 'дней')}` : 'сегодня',
      tone: days <= 2 ? 'is-ok' : days === 3 ? 'is-warn' : 'is-late',
    }
  },
  showError(id, message) { const el = $(id); el.textContent = message; el.hidden = false },
  // Плавный досчёт суммы от from до to (замедляется к концу)
  countUp(el, from, to, ms = 1400) {
    const start = performance.now()
    const step = (t) => {
      const k = Math.min(1, (t - start) / ms)
      el.textContent = Sales.rub(from + (to - from) * (1 - Math.pow(1 - k, 3)))
      if (k < 1) requestAnimationFrame(step)
      else el.closest('.kpi')?.classList.add('is-grown')
    }
    requestAnimationFrame(step)
  },
  // «70 000 ₽», «70.000», «70 000р» → 70000: срезаем буквы и знаки по краям, убираем пробелы и точки внутри
  parseAmount(text) {
    const v = String(text || '').replace(/^[^\d]+|[^\d]+$/g, '').replace(/[\s.,]/g, '')
    return /^\d+$/.test(v) ? Number(v) : NaN
  },
}

// ═══ CRM ═══════════════════════════════════════════════════════════════
const CRM_PAGE_SIZE = 15

const SalesCrmPage = {
  data: null,
  statuses: null, // какие статусы показывать; null — все
  people: null,   // чьих лидов показывать (ответственный); null — всех
  q: '',
  page: 1,          // страница списка лидов, по CRM_PAGE_SIZE на странице
  saleDraft: null,  // открытое окно «Закрываем в продажу»
  tab: 'leads',    // leads | referrals (выплаты рефералам видит только главный админ)

  async render(view, ctx) {
    view.innerHTML = SalesCrmPage.head() + skeleton({ rows: 6, kpis: 4 })
    const data = await api('/api/sales/leads')
    if (ctx.stale()) return
    Sales.use(data)
    SalesCrmPage.data = data
    SalesCrmPage.tab = data.referrals && ctx.query.get('tab') === 'referrals' ? 'referrals' : 'leads'
    view.innerHTML = SalesCrmPage.head() + `
      <div id="crm-rewards"></div>
      <div id="crm-tabs"></div>
      <div id="crm-body"></div>`
    SalesCrmPage.paintRewards()
    SalesCrmPage.paintBody()
  },

  setTab(value) {
    SalesCrmPage.tab = value
    Router.setQuery({ tab: value === 'referrals' ? 'referrals' : null })
    SalesCrmPage.paintBody()
  },

  // Вкладки «Лиды» и «Выплаты рефералам» — вторая есть только у главного админа
  paintBody() {
    const { leads, referrals } = SalesCrmPage.data
    $('#crm-tabs').innerHTML = referrals ? `<div class="toolbar sales-tabs">${seg([
      ['leads', `${icon('target', 14)}Лиды <span class="count">${leads.length}</span>`],
      ['referrals', `${icon('users', 14)}Выплаты рефералам <span class="count">${referrals.list.length}</span>`],
    ], SalesCrmPage.tab, 'SalesCrmPage.setTab')}</div>` : ''
    if (SalesCrmPage.tab === 'referrals') return SalesCrmPage.paintReferrals()
    $('#crm-body').innerHTML = `
      <div class="toolbar">
        <div id="crm-seg"></div>
        <div class="spacer"></div>
        ${searchBox('crm-q', SalesCrmPage.q, 'Контакт, реферал или заметка', 'SalesCrmPage.search')}
      </div>
      <div id="crm-list"></div>`
    SalesCrmPage.paint()
  },

  // Рефералы: кого привели, сколько положено, сколько уже выплачено
  paintReferrals() {
    const { list, total, paid, pending, share } = SalesCrmPage.data.referrals
    const percent = Math.round(share * 100)
    const el = $('#crm-body')
    if (!list.length) {
      el.innerHTML = `<div class="card">${emptyState('users', 'Рефералов пока нет', 'Укажи в карточке лида, кто его порекомендовал, — реферал появится здесь')}</div>`
      return
    }
    const leadCount = list.reduce((sum, ref) => sum + ref.leads.length, 0)
    el.innerHTML = `
      <p class="sales-ref-note">Реферал получает ${percent}% от суммы каждого своего лида, закрытого в продажу. Выплаты идут из твоей доли.
        Начислено <b>${Sales.rub(total)}</b> · выплачено <b class="is-paid">${Sales.rub(paid)}</b> · осталось выплатить <b>${Sales.rub(pending)}</b>
        · ${fmt(list.length)} ${plural(list.length, 'реферал', 'реферала', 'рефералов')} · ${fmt(leadCount)} ${plural(leadCount, 'лид', 'лида', 'лидов')}</p>
      <div class="table-wrap">
        <table class="tbl sales-tbl sales-ref-tbl">
          <thead><tr><th>Реферал</th><th class="r">Привёл лидов</th><th>Его лиды</th><th class="num">Реферальные</th><th>Выплата</th></tr></thead>
          <tbody>${list.map((ref, i) => `
            <tr>
              <td><div class="cell-main sales-contact">${Sales.contact(ref.contact)}</div></td>
              <td class="r"><b class="sales-ref-count">${fmt(ref.leads.length)}</b>${ref.closedCount ? `<div class="cell-sub nowrap">в продажу — ${fmt(ref.closedCount)}</div><div class="cell-sub nowrap">на ${Sales.rub(ref.closedAmount)}</div>` : ''}</td>
              <td><div class="sales-ref-leads">${ref.leads.map(l => {
                const [label, badge] = SALES_STATUS[l.status] || [l.status, 'badge-gray']
                return `<div class="sales-ref-lead"><span class="sales-contact">${Sales.contact(l.contact)}</span><span class="badge ${badge}">${label}</span>${l.amount ? `<span class="sales-ref-amount">${Sales.rub(l.amount)}</span>` : ''}${l.paid ? '<span class="sales-ref-paid-mark">выплачено</span>' : ''}</div>`
              }).join('')}</div></td>
              <td class="num nowrap">${ref.earned ? `<span class="sales-ref-payout">${Sales.rub(ref.earned)}</span>${ref.paid && ref.pending ? `<div class="cell-sub">выплачено ${Sales.rub(ref.paid)}</div>` : ''}` : '<span class="muted">—</span>'}</td>
              <td class="nowrap">${ref.pending
                ? `<button class="btn btn-primary btn-sm" onclick="SalesCrmPage.payReferral(${i})">${icon('check', 14)}Выплатить ${Sales.rub(ref.pending)}</button>`
                : ref.paid
                  ? `<span class="badge badge-green">${icon('circle-check', 12)}Оплачено</span><div class="cell-sub">${esc(stampLabel(ref.paidAt))}</div>`
                  : '<span class="muted">нечего выплачивать</span>'}</td>
            </tr>`).join('')}</tbody>
        </table>
      </div>`
  },

  // Зафиксировать выплату рефералу: все его закрытые и ещё не оплаченные лиды становятся оплаченными
  async payReferral(index) {
    const ref = SalesCrmPage.data.referrals.list[index]
    if (!ref || !ref.pending) return
    const ok = await confirmDialog({
      title: 'Зафиксировать оплату рефералу?',
      text: `Реферал <b>${esc(ref.contact)}</b> — <b>${Sales.rub(ref.pending)}</b>. Его закрытые лиды будут отмечены как оплаченные.`,
      confirm: 'Да', cancel: 'Нет',
    })
    if (!ok) return
    try {
      await api('/api/sales/referrals/pay', { method: 'POST', body: { referral: ref.contact, expected: ref.pending } })
      toast(`Выплата ${Sales.rub(ref.pending)} зафиксирована`)
      Router.reload()
    } catch (e) { toast(e.message, 'err') }
  },

  // ── Выгрузка: .md с массивом никнеймов всех лидов (без фильтров, без дублей) ──
  exportMd() {
    const leads = SalesCrmPage.data ? SalesCrmPage.data.leads : []
    if (!leads.length) return toast('Лидов пока нет', 'error')
    const nicks = [...new Set(leads.map(l => l.contact.trim()).filter(Boolean))]
    const day = new Date().toISOString().slice(0, 10)
    const md = `# Лиды KIRO — ${day}\n\nВсего: ${nicks.length}\n\n\`\`\`json\n${JSON.stringify(nicks, null, 2)}\n\`\`\`\n`
    const url = URL.createObjectURL(new Blob([md], { type: 'text/markdown;charset=utf-8' }))
    const a = Object.assign(document.createElement('a'), { href: url, download: `leads-${day}.md` })
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
    toast(`Выгружено лидов: ${nicks.length}`)
  },

  // ── Импорт списком ──
  // Контакты — по одному в строке (можно через запятую или пробел, если это ники @...)
  parseContacts(text) {
    const out = []
    for (const part of String(text || '').split(/[\n,;]+/)) {
      const line = part.trim()
      if (!line) continue
      if (/^@\S+(\s+@\S+)+$/.test(line)) out.push(...line.split(/\s+/))
      else out.push(line)
    }
    return out
  },

  openImport() {
    const options = (list, selected) => list.map(([value, label]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`).join('')
    Modal.open(`
      ${modalHead('Импорт списком', 'Внеси сразу много лидов с одинаковым статусом и заметкой')}
      <div class="field">
        <label for="i-list">Контакты</label>
        <textarea id="i-list" rows="9" placeholder="@nick1&#10;@nick2&#10;+7 999 000-00-00" oninput="SalesCrmPage.onImportInput()"></textarea>
        <div class="field-hint" id="i-count">По одному контакту в строке</div>
      </div>
      <div class="form-row">
        <div class="field"><label for="i-status">Статус</label><select id="i-status">${options(Object.entries(SALES_STATUS).filter(([k]) => k !== 'closed').map(([k, [label]]) => [k, label]), 'new')}</select></div>
        <div class="field"><label for="i-created">Ответственный</label><select id="i-created">${options(Sales.people.map(p => [p.key, p.name]), Sales.me)}</select></div>
      </div>
      <div class="field"><label for="i-desc">Описание для всех</label><textarea id="i-desc" rows="2" placeholder="Например: контакт из канала, откуда пришёл"></textarea></div>
      <div class="field"><label for="i-referral">Реферал для всех</label><input id="i-referral" maxlength="200" placeholder="Необязательно"/></div>
      <div class="form-error" id="i-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="i-save" onclick="SalesCrmPage.saveImport()">${icon('plus')}Внести</button>
      </div>`, { size: 'lg' })
  },

  onImportInput() {
    const contacts = SalesCrmPage.parseContacts($('#i-list').value)
    const existing = new Set(SalesCrmPage.data.leads.map(l => l.contact.trim().toLowerCase().replace(/^@/, '')))
    const unique = [...new Set(contacts.map(c => c.toLowerCase().replace(/^@/, '')))]
    const dupes = unique.filter(c => existing.has(c)).length
    $('#i-count').textContent = contacts.length
      ? `Контактов: ${fmt(unique.length)}${dupes ? ` · уже в CRM: ${fmt(dupes)} — их пропустим` : ''}`
      : 'По одному контакту в строке'
  },

  async saveImport() {
    const contacts = SalesCrmPage.parseContacts($('#i-list').value)
    if (!contacts.length) return Sales.showError('#i-err', 'Вставь хотя бы один контакт')
    $('#i-save').disabled = true
    try {
      const res = await api('/api/sales/leads/import', { method: 'POST', body: {
        contacts,
        status: $('#i-status').value,
        createdBy: $('#i-created').value,
        description: $('#i-desc').value.trim(),
        referral: $('#i-referral').value.trim(),
      } })
      Modal.close()
      toast(`Внесено ${fmt(res.added)} ${plural(res.added, 'лид', 'лида', 'лидов')}${res.skipped.length ? `, пропущено ${fmt(res.skipped.length)} — уже есть в CRM` : ''}`)
      Router.reload()
    } catch (e) {
      Sales.showError('#i-err', e.message)
      $('#i-save').disabled = false
    }
  },

  // ── Импорт JSON: { "@ник": "описание", ... } — у каждого лида своё описание ──
  parseJsonLeads(text) {
    const src = String(text || '').trim()
    if (!src) return { items: [] }
    let data
    try { data = JSON.parse(src) } catch (e) { return { error: 'Это не похоже на JSON — проверь кавычки и запятые' } }
    if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'Нужен объект вида { "@ник": "описание" }' }
    const items = []
    for (const [key, value] of Object.entries(data)) {
      const contact = key.trim()
      if (!contact) continue
      if (value !== null && typeof value === 'object') return { error: `У ${contact} описание должно быть строкой` }
      items.push({ contact, description: value == null ? '' : String(value).trim() })
    }
    return { items }
  },

  openJsonImport() {
    const options = (list, selected) => list.map(([value, label]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`).join('')
    Modal.open(`
      ${modalHead('Импорт JSON', 'Каждый лид со своим описанием: ключ — ник, значение — описание')}
      <div class="field">
        <label for="j-json">JSON</label>
        <textarea id="j-json" class="json-input" rows="12" spellcheck="false" placeholder='{&#10;  "@nickname": "описание лида",&#10;  "@nickname2": "описание лида"&#10;}' oninput="SalesCrmPage.onJsonInput()"></textarea>
        <div class="field-hint" id="j-count">Вставь JSON или <label class="link-btn" for="j-file">загрузи файл .json</label></div>
        <input id="j-file" type="file" accept=".json,application/json,text/plain" hidden onchange="SalesCrmPage.loadJsonFile(this)"/>
      </div>
      <div class="form-row">
        <div class="field"><label for="j-status">Статус</label><select id="j-status">${options(Object.entries(SALES_STATUS).filter(([k]) => k !== 'closed').map(([k, [label]]) => [k, label]), 'new')}</select></div>
        <div class="field"><label for="j-created">Ответственный</label><select id="j-created">${options(Sales.people.map(p => [p.key, p.name]), Sales.me)}</select></div>
      </div>
      <div class="form-error" id="j-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="j-save" onclick="SalesCrmPage.saveJsonImport()">${icon('plus')}Внести</button>
      </div>`, { size: 'lg' })
  },

  async loadJsonFile(input) {
    const file = input.files && input.files[0]
    if (!file) return
    $('#j-json').value = await file.text()
    input.value = ''
    SalesCrmPage.onJsonInput()
  },

  onJsonInput() {
    const { items, error } = SalesCrmPage.parseJsonLeads($('#j-json').value)
    const hint = $('#j-count')
    $('#j-err').hidden = true
    hint.classList.toggle('is-error', !!error)
    if (error) { hint.textContent = error; return }
    if (!items.length) { hint.innerHTML = 'Вставь JSON или <label class="link-btn" for="j-file">загрузи файл .json</label>'; return }
    const key = c => c.toLowerCase().replace(/^@/, '')
    const existing = new Set(SalesCrmPage.data.leads.map(l => key(l.contact.trim())))
    const unique = [...new Set(items.map(i => key(i.contact)))]
    const dupes = unique.filter(c => existing.has(c)).length
    hint.textContent = `Лидов: ${fmt(unique.length)}${dupes ? ` · уже в CRM: ${fmt(dupes)} — их пропустим` : ''}`
  },

  async saveJsonImport() {
    const { items, error } = SalesCrmPage.parseJsonLeads($('#j-json').value)
    if (error) return Sales.showError('#j-err', error)
    if (!items.length) return Sales.showError('#j-err', 'Вставь хотя бы одного лида')
    $('#j-save').disabled = true
    try {
      const res = await api('/api/sales/leads/import', { method: 'POST', body: {
        items,
        status: $('#j-status').value,
        createdBy: $('#j-created').value,
      } })
      Modal.close()
      toast(`Внесено ${fmt(res.added)} ${plural(res.added, 'лид', 'лида', 'лидов')}${res.skipped.length ? `, пропущено ${fmt(res.skipped.length)} — уже есть в CRM` : ''}`)
      Router.reload()
    } catch (e) {
      Sales.showError('#j-err', e.message)
      $('#j-save').disabled = false
    }
  },

  // ── Передать лидов (только главный админ): ники столбиком → Денису, Саше или Эмилю ──
  openTransfer() {
    const targets = Sales.people.filter(p => ['denis', 'sasha', 'emil'].includes(p.key))
    Modal.open(`
      ${modalHead('Передать лидов', 'Вставь ники столбиком и выбери, кому их передать — он получит уведомление')}
      <div class="field">
        <label for="t-list">Ники лидов</label>
        <textarea id="t-list" rows="10" spellcheck="false" placeholder="@nickname1&#10;@nickname2&#10;@nickname3" oninput="SalesCrmPage.onTransferInput()" autofocus></textarea>
        <div class="field-hint" id="t-count">По одному нику в строке, с @ в начале</div>
      </div>
      <div class="field">
        <label>Кому передать</label>
        <div class="transfer-to" id="t-to">${targets.map((p, i) => `
          <label class="transfer-opt sp-${p.key}"><input type="radio" name="t-to" value="${p.key}"${i === 0 ? ' checked' : ''} onchange="SalesCrmPage.onTransferInput()"/><i></i><span>${esc(p.name)}</span></label>`).join('')}
        </div>
      </div>
      <div class="form-error" id="t-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="t-save" onclick="SalesCrmPage.saveTransfer()">${icon('arrow-right-left')}Передать</button>
      </div>`)
  },

  transferPlan() {
    const key = c => c.trim().toLowerCase().replace(/^@/, '').replace(/^(https?:\/\/)?t\.me\//, '')
    const contacts = [...new Map(SalesCrmPage.parseContacts($('#t-list').value).map(c => [key(c), c])).values()]
    const to = ($('#t-to input:checked') || {}).value
    const leads = new Map()
    for (const l of SalesCrmPage.data.leads) {
      const k = key(l.contact)
      if (!leads.has(k)) leads.set(k, [])
      leads.get(k).push(l)
    }
    const found = contacts.filter(c => leads.has(key(c)))
    const already = found.filter(c => leads.get(key(c)).every(l => l.createdBy === to))
    return { contacts, to, found, already, notFound: contacts.filter(c => !leads.has(key(c))) }
  },

  onTransferInput() {
    const { contacts, found, already, notFound } = SalesCrmPage.transferPlan()
    const hint = $('#t-count')
    hint.classList.toggle('is-error', !!notFound.length && !found.length)
    if (!contacts.length) { hint.textContent = 'По одному нику в строке, с @ в начале'; return }
    hint.textContent = [
      `Передадим: ${fmt(found.length - already.length)}`,
      already.length ? `уже у него: ${fmt(already.length)}` : '',
      notFound.length ? `нет в CRM: ${fmt(notFound.length)}` : '',
    ].filter(Boolean).join(' · ')
  },

  async saveTransfer() {
    const { contacts, to } = SalesCrmPage.transferPlan()
    if (!contacts.length) return Sales.showError('#t-err', 'Вставь хотя бы один ник')
    if (!to) return Sales.showError('#t-err', 'Выбери, кому передать')
    $('#t-save').disabled = true
    try {
      const res = await api('/api/sales/leads/transfer', { method: 'POST', body: { contacts, to } })
      const name = Sales.name(to)
      const done = `${name}: ${plural(res.moved, 'передан', 'передано', 'передано')} ${fmt(res.moved)} ${plural(res.moved, 'лид', 'лида', 'лидов')}`
      Router.reload()
      if (!res.notFound.length) {
        Modal.close()
        return toast(done + (res.already.length ? `, ещё ${fmt(res.already.length)} уже были у него` : ''))
      }
      // Часть ников не нашлась — показываем, какие именно, чтобы их можно было поправить
      Modal.open(`
        ${modalHead('Передать лидов', done)}
        ${res.already.length ? `<div class="field-hint" style="margin:0 0 12px">Уже были у него: ${fmt(res.already.length)}</div>` : ''}
        <div class="field">
          <label>Нет в CRM — ${fmt(res.notFound.length)}</label>
          <textarea rows="${Math.min(10, res.notFound.length + 1)}" readonly>${esc(res.notFound.join('\n'))}</textarea>
        </div>
        <div class="modal-actions"><button class="btn btn-primary" onclick="Modal.close()">Понятно</button></div>`)
    } catch (e) {
      Sales.showError('#t-err', e.message)
      $('#t-save').disabled = false
    }
  },

  head() {
    return pageHead({
      title: 'CRM',
      sub: 'Лиды отдела продаж: от заявки до оплаты',
      actions: `
        <button class="btn btn-secondary" onclick="SalesCrmPage.exportMd()" title="Скачать .md с массивом никнеймов всех лидов">${icon('download')}Выгрузить</button>
        <button class="btn btn-secondary" onclick="SalesCrmPage.openImport()">${icon('list-todo')}Импорт списком</button>
        ${Session.person === 'khanil' ? `<button class="btn btn-secondary" onclick="SalesCrmPage.openTransfer()" title="Передать лидов списком ников Денису, Саше или Эмилю">${icon('arrow-right-left')}Передать лидов</button>` : ''}
        <button class="btn btn-secondary" onclick="SalesCrmPage.openJsonImport()" title="Внести лидов из JSON: { &quot;@ник&quot;: &quot;описание&quot; }">${icon('braces')}Импорт JSON</button>
        <button class="btn btn-primary" onclick="SalesCrmPage.open(null)">${icon('plus')}Новый лид</button>`,
    })
  },

  // Вознаграждения: каждый видит своё, полную раскладку — только Ханиль
  // prev — вознаграждения до закрытия сделки: изменившиеся числа плавно досчитываются до новых
  paintRewards(prev = null) {
    const r = SalesCrmPage.data.rewards
    const card = (label, value, foot, accent = false, iconName = 'zap', key = '') => {
      const from = prev && key ? Math.round(prev[key] || 0) : null
      const to = Math.round(r[key] || 0)
      const grow = from !== null && from !== to
      return `
      <div class="kpi${grow ? ' is-growing' : ''}">
        <div class="kpi-top"><span class="kpi-label">${label}</span><span class="kpi-icon${accent ? ' is-lime' : ''}">${icon(iconName, 15)}</span></div>
        <div class="kpi-value"${grow ? ` data-from="${from}" data-to="${to}"` : ''}>${grow ? Sales.rub(from) : value}</div>
        <div class="kpi-foot">${foot}</div>
      </div>`
    }
    const deals = n => `${fmt(n)} ${plural(n, 'лид закрыт', 'лида закрыто', 'лидов закрыто')} в продажу`
    let cards = []
    if (r.view === 'all') {
      cards = [
        card('Сумма продаж', Sales.rub(r.total), deals(r.closedCount), false, 'trending-up', 'total'),
        card('Тебе', Sales.rub(r.khanil), '70% от суммы минус выплаты Саше, Эмилю и рефералам', true, 'crown', 'khanil'),
        card('Денису', Sales.rub(r.denis), '30% от всей суммы продаж', false, 'user', 'denis'),
        card('Саше', Sales.rub(r.sasha), '10% с лидов, которые закрыл Саша', false, 'user', 'sasha'),
        card('Эмилю', Sales.rub(r.emil), '10% с лидов, которые закрыл Эмиль', false, 'user', 'emil'),
        card('Рефералам', Sales.rub(r.referrals || 0), '10% с лидов, которых привели рефералы, — из твоей доли', false, 'users', 'referrals'),
      ]
    } else if (r.view === 'denis') {
      cards = [
        card('Твоё вознаграждение', Sales.rub(r.mine), '30% от всей суммы продаж', true, 'crown', 'mine'),
        card('Сумма продаж', Sales.rub(r.total), deals(r.closedCount), false, 'trending-up', 'total'),
      ]
    } else {
      cards = [
        card('Твоё вознаграждение', Sales.rub(r.mine), '10% от суммы лидов, которые закрыл ты', true, 'crown', 'mine'),
      ]
    }
    $('#crm-rewards').innerHTML = `<div class="sales-kpis${cards.length === 1 ? ' is-single' : ''}">${cards.join('')}</div>`
    document.querySelectorAll('#crm-rewards [data-to]').forEach(el => Sales.countUp(el, Number(el.dataset.from), Number(el.dataset.to)))
  },

  search: debounce((value) => { SalesCrmPage.q = value.trim().toLowerCase(); SalesCrmPage.page = 1; SalesCrmPage.paint() }, 150),
  setFilter(value) { SalesCrmPage.statuses = value === 'all' ? null : [value]; SalesCrmPage.page = 1; SalesCrmPage.paint() },
  setPage(n) {
    SalesCrmPage.page = n
    SalesCrmPage.paint()
    const top = $('#crm-list')
    if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ block: 'start', behavior: 'smooth' })
  },
  // Номера страниц: до 7 страниц — все; иначе первая, последняя и соседи текущей, между ними — «…»
  pager(page, pages, total, from, to) {
    if (pages <= 1) return ''
    const nums = []
    for (let n = 1; n <= pages; n++) {
      if (pages <= 7 || n === 1 || n === pages || Math.abs(n - page) <= 1) nums.push(n)
      else if (nums[nums.length - 1] !== '…') nums.push('…')
    }
    const btn = (n, label, disabled, title) => `<button class="pager-btn${n === page && typeof label === 'number' ? ' is-on' : ''}" ${disabled ? 'disabled' : `onclick="SalesCrmPage.setPage(${n})"`}${title ? ` title="${title}" aria-label="${title}"` : ''}>${label}</button>`
    return `
      <nav class="pager" aria-label="Страницы лидов">
        <span class="pager-info">${from}–${to} из ${total}</span>
        <div class="pager-btns">
          ${btn(page - 1, icon('chevron-left', 15), page === 1, 'Предыдущая страница')}
          ${nums.map(n => n === '…' ? '<span class="pager-gap">…</span>' : btn(n, n, false)).join('')}
          ${btn(page + 1, icon('chevron-right', 15), page === pages, 'Следующая страница')}
        </div>
      </nav>`
  },

  // Выпадашки в заголовках таблицы: «Статус» и «Ответственный» — галочками выбираешь, что показывать
  menuOptions(kind) {
    const { leads } = SalesCrmPage.data
    if (kind === 'statuses') return Object.entries(SALES_STATUS).map(([key, [label, badge]]) => ({
      key, html: `<span class="badge ${badge}">${label}</span>`, count: leads.filter(l => l.status === key).length,
    }))
    return Sales.people.map(p => ({
      key: p.key,
      html: `<span>${esc(p.name)}</span>${p.key === Sales.me ? ' <span class="badge badge-lime">ты</span>' : ''}`,
      count: leads.filter(l => l.createdBy === p.key).length,
    }))
  },
  toggleMenu(event, kind) {
    event.stopPropagation()
    const open = $('#crm-filter-menu')
    const same = open && open.dataset.kind === kind
    SalesCrmPage.closeMenu()
    if (same) return
    const chosen = SalesCrmPage[kind]
    const menu = document.createElement('div')
    menu.id = 'crm-filter-menu'
    menu.className = 'status-menu'
    menu.dataset.kind = kind
    menu.innerHTML = `
      <div class="status-menu-head">${kind === 'statuses' ? 'Показывать статусы' : 'Чьих лидов показывать'}</div>
      ${SalesCrmPage.menuOptions(kind).map(o => `
        <label class="status-menu-row">
          <input type="checkbox" value="${o.key}"${!chosen || chosen.includes(o.key) ? ' checked' : ''} onchange="SalesCrmPage.applyMenu()"/>
          ${o.html}
          <span class="status-menu-count">${o.count}</span>
        </label>`).join('')}
      <div class="status-menu-foot">
        <button class="btn btn-sm" onclick="SalesCrmPage.setMenu(true)">Все</button>
        <button class="btn btn-sm" onclick="SalesCrmPage.setMenu(false)">Снять все</button>
      </div>`
    menu.addEventListener('click', e => e.stopPropagation())
    document.body.appendChild(menu)
    const r = event.currentTarget.getBoundingClientRect()
    menu.style.top = `${r.bottom + 6}px`
    menu.style.left = `${Math.max(8, Math.min(r.left, window.innerWidth - menu.offsetWidth - 8))}px`
    setTimeout(() => {
      document.addEventListener('click', SalesCrmPage.closeMenu)
      window.addEventListener('scroll', SalesCrmPage.closeMenu, true)
      document.addEventListener('keydown', SalesCrmPage.onMenuKey)
    })
  },
  closeMenu() {
    const menu = $('#crm-filter-menu')
    if (menu) menu.remove()
    document.removeEventListener('click', SalesCrmPage.closeMenu)
    window.removeEventListener('scroll', SalesCrmPage.closeMenu, true)
    document.removeEventListener('keydown', SalesCrmPage.onMenuKey)
  },
  resetFilters() { SalesCrmPage.statuses = null; SalesCrmPage.people = null; SalesCrmPage.page = 1; SalesCrmPage.closeMenu(); SalesCrmPage.paint() },
  onMenuKey(e) { if (e.key === 'Escape') SalesCrmPage.closeMenu() },
  setMenu(all) {
    document.querySelectorAll('#crm-filter-menu input').forEach(el => { el.checked = all })
    SalesCrmPage.applyMenu()
  },
  applyMenu() {
    const menu = $('#crm-filter-menu')
    if (!menu) return
    const kind = menu.dataset.kind
    const checked = [...menu.querySelectorAll('input:checked')].map(el => el.value)
    SalesCrmPage[kind] = checked.length === menu.querySelectorAll('input').length ? null : checked
    SalesCrmPage.page = 1
    SalesCrmPage.paint()
  },

  paint() {
    const { leads } = SalesCrmPage.data
    const count = key => leads.filter(l => l.status === key).length
    const chosen = SalesCrmPage.statuses
    // Подсвечиваем чип, если выбран ровно один статус (или все); набор из выпадашки — ни один
    const active = !chosen ? 'all' : chosen.length === 1 ? chosen[0] : ''
    $('#crm-seg').innerHTML = seg([
      ['all', `Все <span class="count">${leads.length}</span>`],
      ...Object.entries(SALES_STATUS).map(([key, [label]]) => [key, `${label} <span class="count">${count(key)}</span>`]),
    ], active, 'SalesCrmPage.setFilter')

    const q = SalesCrmPage.q
    // Сначала лиды, где ответственный — ты; внутри групп порядок сервера (новые сверху)
    const owners = SalesCrmPage.people
    const list = leads.filter(l => (!chosen || chosen.includes(l.status)) && (!owners || owners.includes(l.createdBy))
      && (!q || l.contact.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || l.referral.toLowerCase().includes(q)))
      .map((l, i) => [l, i])
      .sort(([a, i], [b, j]) => (b.createdBy === Sales.me) - (a.createdBy === Sales.me) || i - j)
      .map(([l]) => l)
    const el = $('#crm-list')
    if (!leads.length) {
      el.innerHTML = `<div class="card">${emptyState('target', 'Лидов пока нет', 'Внеси первого — кнопка «Новый лид» справа сверху')}</div>`
      return
    }
    if (!list.length) {
      const reset = chosen || owners ? `<div class="crm-reset"><button class="btn btn-sm" onclick="SalesCrmPage.resetFilters()">Сбросить фильтры по статусу и ответственному</button></div>` : ''
      el.innerHTML = `<div class="card">${emptyState('search', 'Ничего не нашлось', 'Попробуй другой статус, ответственного или запрос', true)}${reset}</div>`
      return
    }
    const filterTh = (kind, label, title, picked) => `<th class="sortable${picked ? ' active' : ''}" onclick="SalesCrmPage.toggleMenu(event, '${kind}')" title="${title}">${label}${icon('filter', 12)}${picked ? ` <span class="th-count">${picked.length}</span>` : ''}</th>`
    // Менеджеру показываем его вознаграждение по каждому лиду, который он закрыл
    const seller = SalesCrmPage.data.rewards.view === 'seller'
    const share = SalesCrmPage.data.sellerShare || 0.1
    const pages = Math.ceil(list.length / CRM_PAGE_SIZE)
    const page = SalesCrmPage.page = Math.min(Math.max(1, SalesCrmPage.page), pages)
    const start = (page - 1) * CRM_PAGE_SIZE
    const shown = list.slice(start, start + CRM_PAGE_SIZE)
    el.innerHTML = `
      <div class="table-wrap">
        <table class="tbl sales-tbl">
          <thead><tr><th>Лид</th>${filterTh('statuses', 'Статус', 'Выбрать, какие статусы показывать', chosen)}${filterTh('people', 'Ответственный', 'Выбрать, чьих лидов показывать', owners)}<th>Продажа</th><th class="num">Сумма</th><th></th></tr></thead>
          <tbody>${shown.map(l => {
            const [label, badge] = SALES_STATUS[l.status] || [l.status, 'badge-gray']
            // Плашка «Оставил заявку» — только пока лид в статусе заявки
            const age = l.status === 'new' ? Sales.age(l.createdAt) : null
            const mine = seller && l.status === 'closed' && l.closedBy === Sales.me
            const sale = [l.closedBy ? esc(Sales.name(l.closedBy)) : '', l.paymentFormat ? SALES_FORMAT[l.paymentFormat].toLowerCase() : ''].filter(Boolean).join(' · ')
            return `
            <tr class="is-clickable" onclick="SalesCrmPage.rowClick(event, ${l.id})">
              <td><div class="cell-main sales-contact">${Sales.contact(l.contact)}</div>${l.description ? `<div class="cell-sub sales-note" title="${esc(l.description)}">${esc(l.description)}</div>` : ''}${l.referral ? `<div class="cell-sub sales-note" title="Реферал: ${esc(l.referral)}">от реферала ${esc(l.referral)}</div>` : ''}</td>
              <td><span class="badge ${badge}">${label}</span>${age ? `<div class="lead-age ${age.tone}" title="Лид внесён ${esc(stampLabel(l.createdAt))} и всё ещё в статусе заявки">Оставил заявку: ${age.label}</div>` : ''}</td>
              <td class="nowrap"><div>${esc(Sales.name(l.createdBy))}${l.createdBy === Sales.me ? ' <span class="badge badge-lime">ты</span>' : ''}</div><div class="cell-sub">внесён ${esc(stampLabel(l.createdAt))}</div></td>
              <td class="nowrap">${sale || '<span class="muted">—</span>'}${l.discount ? `<div class="cell-sub">скидка ${fmt(l.discountPercent)}%</div>` : ''}</td>
              <td class="num nowrap">${l.amount ? Sales.rub(l.amount) : '<span class="muted">—</span>'}${mine ? `<div class="cell-sub sales-reward" title="Твоё вознаграждение за этого лида">тебе ${Sales.rub(l.amount * share)}</div>` : ''}</td>
              <td class="actions"><div>
                <button class="btn-icon btn-sm is-money${l.status === 'closed' ? ' is-done' : ''}" onclick="SalesCrmPage.closeSale(${l.id})" title="${l.status === 'closed' ? 'Изменить данные продажи' : 'Закрыть в продажу'}" aria-label="Закрыть в продажу">${icon('dollar-sign', 15)}</button>
                <button class="btn-icon btn-sm" onclick="SalesCrmPage.schedule(${l.id})" title="Назначить созвон" aria-label="Назначить созвон">${icon('calendar-plus', 15)}</button>
                <button class="btn-icon btn-sm" onclick="SalesCrmPage.open(${l.id})" title="Изменить" aria-label="Изменить">${icon('pencil', 15)}</button>
                <button class="btn-icon btn-sm is-danger" onclick="SalesCrmPage.remove(${l.id})" title="Удалить" aria-label="Удалить">${icon('trash-2', 15)}</button>
              </div></td>
            </tr>`
          }).join('')}</tbody>
        </table>
      </div>
      ${SalesCrmPage.pager(page, pages, list.length, start + 1, start + shown.length)}`
  },

  // Клик по ряду открывает карточку; ссылки (ник → Telegram) и кнопки работают сами по себе
  rowClick(event, id) {
    if (event.target.closest('a, button, input, select, textarea, label')) return
    if (String(window.getSelection() || '').trim()) return // выделяли текст — не открываем
    SalesCrmPage.open(id)
  },

  open(id) {
    const l = id ? SalesCrmPage.data.leads.find(x => x.id === id) : null
    const options = (list, selected) => list.map(([value, label]) => `<option value="${value}"${value === selected ? ' selected' : ''}>${esc(label)}</option>`).join('')
    const people = Sales.people.map(p => [p.key, p.name])
    Modal.open(`
      ${modalHead(l ? 'Карточка лида' : 'Новый лид', l ? `Внесён ${esc(stampLabel(l.createdAt))}` : 'Дата внесения проставится автоматически')}
      <div class="form-row">
        <div class="field">
          <label for="l-contact">Контакт</label>
          <input id="l-contact" value="${esc(l ? l.contact : '')}" maxlength="200" placeholder="@telegram или номер телефона" autofocus/>
        </div>
        <div class="field">
          <label for="l-referral">Реферал</label>
          <input id="l-referral" value="${esc(l ? l.referral : '')}" maxlength="200" placeholder="Кто порекомендовал — если есть"/>
        </div>
      </div>
      <div class="form-row">
        <div class="field"><label for="l-status">Статус</label><select id="l-status">${options(Object.entries(SALES_STATUS).map(([k, [label]]) => [k, label]), l ? l.status : 'new')}</select></div>
        <div class="field"><label for="l-created">Ответственный</label><select id="l-created">${options(people, l ? l.createdBy : Sales.me)}</select></div>
      </div>
      <div class="field lead-desc-field"><label for="l-desc">Описание</label><textarea id="l-desc" rows="4" placeholder="Заметка про лида: откуда пришёл, что хочет, о чём договорились">${esc(l ? l.description : '')}</textarea></div>
      <div class="form-error" id="l-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary" id="l-save" onclick="SalesCrmPage.save(${l ? l.id : 'null'})">${icon(l ? 'check' : 'plus')}${l ? 'Сохранить' : 'Внести лида'}</button>
      </div>`, { size: 'lg' })
    $('#modal-box').classList.add('is-lead')
  },

  // Данные продажи в карточке не правятся — они задаются кнопкой «$», здесь просто сохраняем как были
  saleOf(l) {
    return {
      closedBy: l ? l.closedBy : null,
      paymentFormat: l ? l.paymentFormat : null,
      amount: l ? l.amount : 0,
      discount: l ? l.discount : false,
      discountPercent: l ? l.discountPercent : 0,
    }
  },

  async save(id) {
    const l = id ? SalesCrmPage.data.leads.find(x => x.id === id) : null
    const body = {
      contact: $('#l-contact').value.trim(),
      status: $('#l-status').value,
      createdBy: $('#l-created').value,
      referral: $('#l-referral').value.trim(),
      description: $('#l-desc').value.trim(),
      ...SalesCrmPage.saleOf(l),
    }
    if (!body.contact) return Sales.showError('#l-err', 'Укажи контакт лида: ник в Telegram или номер телефона')
    // «Закрыт в продажу» без суммы — сразу открываем окно продажи с уже введёнными данными карточки
    if (body.status === 'closed' && !(body.closedBy && body.amount > 0)) return SalesCrmPage.closeSale(id, body)
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

  // Окно «Закрываем в продажу». draft — карточка лида, если в продажу переводят из неё
  closeSale(id, draft = null) {
    const l = id ? SalesCrmPage.data.leads.find(x => x.id === id) : null
    const base = draft || (l ? { contact: l.contact, status: l.status, createdBy: l.createdBy, referral: l.referral, description: l.description } : null)
    if (!base) return
    SalesCrmPage.saleDraft = { id, base, format: l && l.paymentFormat ? l.paymentFormat : 'full' }
    const again = l && l.status === 'closed' && l.amount > 0
    const options = Sales.people.map(p => `<option value="${p.key}"${p.key === (again && l.closedBy ? l.closedBy : Sales.me) ? ' selected' : ''}>${esc(p.name)}</option>`).join('')
    Modal.open(`
      ${modalHead(`${icon('dollar-sign', 18)}Закрываем в продажу`, `Лид ${esc(base.contact)}`)}
      <div class="field"><label for="s-closer">Кто закрывает</label><select id="s-closer">${options}</select></div>
      <div class="field">
        <label>Формат оплаты</label>
        <div class="seg sale-format" id="s-format" role="radiogroup">${Object.entries(SALES_FORMAT).map(([k, label]) => `<button type="button" role="radio" data-v="${k}" aria-checked="${k === SalesCrmPage.saleDraft.format}" class="${k === SalesCrmPage.saleDraft.format ? 'active' : ''}" onclick="SalesCrmPage.setSaleFormat('${k}')">${label}</button>`).join('')}</div>
      </div>
      <div class="field">
        <label for="s-amount">Сумма продажи, ₽</label>
        <input id="s-amount" inputmode="numeric" autocomplete="off" placeholder="70 000" value="${again ? esc(fmt(l.amount)) : ''}" autofocus onkeydown="if(event.key==='Enter')SalesCrmPage.confirmSale()"/>
      </div>
      <div class="form-error" id="s-err" hidden></div>
      <div class="modal-actions">
        <button class="btn btn-secondary" onclick="Modal.close()">Отмена</button>
        <button class="btn btn-primary btn-money" id="s-save" onclick="SalesCrmPage.confirmSale()">${icon('check')}${again ? 'Сохранить продажу' : 'Закрыть в продажу'}</button>
      </div>`)
  },

  setSaleFormat(value) {
    SalesCrmPage.saleDraft.format = value
    document.querySelectorAll('#s-format button').forEach(b => {
      const on = b.dataset.v === value
      b.classList.toggle('active', on)
      b.setAttribute('aria-checked', on)
    })
  },

  async confirmSale() {
    const { id, base, format } = SalesCrmPage.saleDraft
    const closer = $('#s-closer').value
    const amount = Sales.parseAmount($('#s-amount').value)
    if (!amount) return Sales.showError('#s-err', 'Укажи сумму продажи цифрами, например 70 000')
    const body = { ...base, status: 'closed', closedBy: closer, paymentFormat: format, amount, discount: false, discountPercent: 0 }
    const prev = { ...SalesCrmPage.data.rewards }
    $('#s-save').disabled = true
    try {
      if (id) await api(`/api/sales/leads/${id}`, { method: 'PUT', body })
      else await api('/api/sales/leads', { method: 'POST', body })
      const data = await api('/api/sales/leads')
      SalesCrmPage.cheer(closer, () => {
        if (!$('#crm-rewards')) return Router.reload()
        Sales.use(data)
        SalesCrmPage.data = data
        SalesCrmPage.paintRewards(prev)
        SalesCrmPage.paintBody()
      })
    } catch (e) {
      Sales.showError('#s-err', e.message)
      $('#s-save').disabled = false
    }
  },

  // Зелёное окно с поздравлением; по закрытию — досчёт вознаграждения
  cheer(person, after) {
    const phrase = SALES_CHEERS[Math.floor(Math.random() * SALES_CHEERS.length)]
    Modal.open(`
      <div class="sale-cheer">
        <div class="sale-cheer-icon">${icon('party-popper', 30)}</div>
        <div class="sale-cheer-title">${esc(Sales.name(person))}, ${phrase}</div>
        <div class="sale-cheer-sub">Лид закрыт в продажу — вознаграждение уже пересчитано</div>
        <button class="btn sale-cheer-btn" onclick="Modal.close()" autofocus>Ура!</button>
      </div>`)
    $('#modal-box').classList.add('is-cheer')
    Modal.onClose = after
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
  hidden: new Set(), // чьи созвоны скрыты кликом по имени в легенде; по умолчанию видны все

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
    view.innerHTML = SalesCalendarPage.head() + `<div id="scal-wrap">${SalesCalendarPage.grid()}</div>`
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
    const hidden = SalesCalendarPage.hidden
    // Созвон виден, если в нём участвует хотя бы один из выбранных в легенде
    for (const e of SalesCalendarPage.events.filter(x => x.participants.some(p => !hidden.has(p)))) {
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
          <button type="button" class="scal-ev${e.duration <= 30 ? ' is-short' : ''}"
            style="top:${top.toFixed(1)}px;height:${(height - 2).toFixed(1)}px;left:calc(${(c / cols * 100).toFixed(2)}% + 2px);width:calc(${(100 / cols).toFixed(2)}% - 4px)"
            onclick="event.stopPropagation();SalesCalendarPage.open(${e.id})" title="${esc(`${time} · ${e.title} · ${who(e)}`)}">
            <span class="scal-ev-dots">${e.participants.map(p => `<i class="sp-${esc(p)}"></i>`).join('')}</span>
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
        <div class="scal-legend">${Sales.people.map(p => {
          const on = !SalesCalendarPage.hidden.has(p.key)
          return `<button type="button" class="scal-legend-item sp-${p.key}${on ? ' is-on' : ''}" aria-pressed="${on}" onclick="SalesCalendarPage.togglePerson('${p.key}')" title="${on ? 'Скрыть' : 'Показать'} созвоны, где участвует ${esc(p.name)}"><i></i>${esc(p.name)}</button>`
        }).join('')}<span class="scal-legend-hint">Нажми на имя, чтобы скрыть или показать его созвоны · на свободное время — чтобы завести встречу</span></div>
      </div>`
  },

  // Клик по имени в легенде: прячем или возвращаем созвоны этого человека, не теряя прокрутку
  togglePerson(key) {
    const hidden = SalesCalendarPage.hidden
    if (hidden.has(key)) hidden.delete(key)
    else hidden.add(key)
    const top = $('#scal-scroll') ? $('#scal-scroll').scrollTop : 0
    $('#scal-wrap').innerHTML = SalesCalendarPage.grid()
    $('#scal-scroll').scrollTop = top
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
