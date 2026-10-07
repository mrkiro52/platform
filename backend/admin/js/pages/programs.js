'use strict'
// Программы октября: направления, кто из студентов в каком, и сам материал глав —
// ровно то, что студент видит на платформе. Данные программ берутся из
// src/data/programs фронтенда через /api/programs/admin/files/:name.

// Порядок направлений в админке
const PROGRAM_ORDER = ['product', 'system', 'business', 'backend', 'security', 'ml']

const ProgramsData = {
  cache: {},

  // Файлы программ — ES-модули без зависимостей: подгружаем текст по токену и импортируем из blob
  async load(name) {
    if (!ProgramsData.cache[name]) {
      ProgramsData.cache[name] = api(`/api/programs/admin/files/${name}`).then(async ({ source }) => {
        const url = URL.createObjectURL(new Blob([source], { type: 'text/javascript' }))
        try { return await import(url) } finally { URL.revokeObjectURL(url) }
      })
      ProgramsData.cache[name].catch(() => { delete ProgramsData.cache[name] })
    }
    return ProgramsData.cache[name]
  },

  async directions() {
    const mod = await ProgramsData.load('index')
    const all = mod.DIRECTIONS
    const keys = [...PROGRAM_ORDER.filter(k => all[k]), ...Object.keys(all).filter(k => !PROGRAM_ORDER.includes(k))]
    return { list: keys.map(k => all[k]), period: mod.PROGRAM_PERIOD }
  },

  async chapter(dirKey, num) {
    return (await ProgramsData.load(`${dirKey}-${num}`)).default
  },
}

// ═══ Отрисовка блоков главы (повторяет src/components/program/ProgramBlocks.jsx) ═══
const PRG_RICH = /(\*\*[^*]+\*\*|(?<![\p{L}\p{N}_])_[^_\n]+_(?![\p{L}\p{N}_]))/gu
const PRG_LETTERS = 'абвгдежзик'

function prgRich(text) {
  return String(text).split('\n').map(line => line.split(PRG_RICH).map(part => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return `<strong>${esc(part.slice(2, -2))}</strong>`
    if (part.startsWith('_') && part.endsWith('_') && part.length > 2) return `<em>${esc(part.slice(1, -1))}</em>`
    return esc(part)
  }).join('')).join('<br>')
}

function prgBlock(b) {
  switch (b.t) {
    case 'h3': return `<h3 class="prg-h3">${prgRich(b.text)}</h3>`
    case 'h4': return `<h4 class="prg-h4">${prgRich(b.text)}</h4>`
    case 'p': return `<p class="prg-p">${prgRich(b.text)}</p>`
    case 'small': return `<p class="prg-small">${prgRich(b.text)}</p>`
    case 'ul': return `<ul class="prg-ul">${b.items.map(it => `<li>${prgRich(it)}</li>`).join('')}</ul>`
    case 'ol': return `<ol class="prg-ol" start="${b.start || 1}">${b.items.map(it => `<li>${prgRich(it)}</li>`).join('')}</ol>`
    case 'letters': return `<ul class="prg-letters">${b.items.map((it, i) => `<li><span class="prg-letter">${PRG_LETTERS[i]})</span><span>${prgRich(it)}</span></li>`).join('')}</ul>`
    case 'table': return `
      <figure class="prg-table">
        ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ''}
        <div class="table-wrap"><table class="tbl">
          <thead><tr>${b.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${prgRich(c)}</td>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
      </figure>`
    case 'quote': return `<blockquote class="prg-quote">${b.paras.map(p => `<p>${prgRich(p)}</p>`).join('')}</blockquote>`
    case 'formula': return `<div class="prg-formula">${b.lines.map(([op, text]) => `<div><span class="prg-op">${esc(op)}</span>${esc(text)}</div>`).join('')}</div>`
    case 'flow': return `<div class="prg-flow">${b.steps.map(s => `<span class="prg-flow-step">${esc(s)}</span>`).join('<span class="prg-flow-arrow">→</span>')}</div>`
    case 'reading': return `
      <div class="prg-reading">
        <div class="prg-label">${esc(b.label)}</div>
        ${b.items.map(it => `<a href="${esc(it.url)}" target="_blank" rel="noopener noreferrer"><span>${esc(it.title)}</span><span class="muted">${esc(it.url.replace(/^https?:\/\//, ''))} ↗</span></a>`).join('')}
      </div>`
    case 'frac': return `<div class="prg-formula"><div>${esc(b.label)} = ${esc(b.num)} / ${esc(b.den)}</div></div>`
    case 'tree': return `<div class="prg-tree">${b.lines.map(([level, text]) => `<div style="padding-left:${level * 22}px">${prgRich(text)}</div>`).join('')}</div>`
    case 'code': return `<pre class="prg-code"><code>${esc(b.text)}</code></pre>`
    case 'note': return `<div class="prg-note">${prgRich(b.text)}</div>`
    case 'example': return `<div class="prg-example"><div class="prg-label">${esc(b.label || 'Пример задачи')}</div>${prgRich(b.text)}</div>`
    case 'split': return `<div class="prg-split">${b.columns.map(c => `
      <div class="prg-split-col is-${esc(c.tone)}"><div class="prg-label">${esc(c.title)}</div><ul class="prg-ul">${c.items.map(it => `<li>${prgRich(it)}</li>`).join('')}</ul></div>`).join('')}</div>`
    case 'compare': return `<div class="prg-split">${b.items.map(c => `
      <div class="prg-split-col is-${esc(c.tone)}"><div class="prg-label">${esc(c.label)}</div><p class="prg-p">${prgRich(c.text)}</p></div>`).join('')}</div>`
    default: return ''
  }
}

const prgBlocks = (blocks) => (blocks || []).map(prgBlock).join('')

function prgTerms(terms) {
  if (!terms?.length) return ''
  return `<details class="prg-terms"><summary>Термины раздела · ${terms.length}</summary><dl>${terms.map(([a, d]) => `<dt>${esc(a)}</dt><dd>${esc(d)}</dd>`).join('')}</dl></details>`
}

// ═══ Раздел «Программы октября» ═══════════════════════════════════════
const ProgramsPage = {
  async render(view, ctx) {
    view.innerHTML = pageHead({ title: 'Программы октября' }) + skeleton({ kpis: 6, rows: 4 })
    const [{ list, period }, users] = await Promise.all([ProgramsData.directions(), api('/api/users')])
    if (ctx.stale()) return
    const camp = users.filter(u => u.autumnCamp)
    const byDir = (key) => camp.filter(u => u.autumnDirection === key)
    const keys = new Set(list.map(d => d.key))
    const unassigned = camp.filter(u => !keys.has(u.autumnDirection))
    const assigned = camp.length - unassigned.length

    view.innerHTML = pageHead({
      title: 'Программы октября',
      sub: `Индивидуальные программы осеннего лагеря · ${esc(period)} · ${fmt(assigned)} из ${fmt(camp.length)} ${plural(camp.length, 'участника', 'участников', 'участников')} с направлением`,
    }) + `
      <div class="prog-grid">
        ${list.map(d => ProgramsPage.dirCard(d, byDir(d.key))).join('')}
      </div>
      <section class="card" style="margin-top:20px">
        <div class="card-head">
          <div>
            <div class="card-title">${icon('circle-help')}Без направления</div>
            <div class="card-sub">Участники лагеря, которым ещё не назначено направление: на платформе они видят «Твоя индивидуальная программа ещё готовится». Назначить можно в разделе «Пользователи»</div>
          </div>
          <span class="badge ${unassigned.length ? 'badge-orange' : 'badge-gray'}">${fmt(unassigned.length)}</span>
        </div>
        ${unassigned.length ? ProgramsPage.studentsTable(unassigned) : emptyState('circle-check', 'У всех участников есть направление', '', true)}
      </section>`
  },

  dirCard(d, students) {
    const ch = d.chapters.length
    return `
      <a class="prog-card" href="${BASE}/programs/${esc(d.key)}">
        <span class="prog-card-name">${esc(d.name)}</span>
        <span class="prog-card-goal">${esc(d.goal)}</span>
        <span class="prog-card-meta">
          <span class="badge ${students.length ? 'badge-lime' : 'badge-gray'}">${icon('users', 12)}${fmt(students.length)} ${plural(students.length, 'студент', 'студента', 'студентов')}</span>
          <span class="badge ${ch ? 'badge-blue' : 'badge-orange'}">${icon('book-open', 12)}${ch ? `${ch} ${plural(ch, 'глава', 'главы', 'глав')}` : 'материал готовится'}</span>
        </span>
        ${students.length ? `<span class="prog-card-people">${students.slice(0, 6).map(u => `<span class="avatar avatar-sm" title="${esc(u.nickname || u.name)}">${esc(initials(u.nickname || u.name))}</span>`).join('')}${students.length > 6 ? `<span class="muted">+${students.length - 6}</span>` : ''}</span>` : ''}
      </a>`
  },

  studentsTable(students) {
    const rows = [...students].sort((a, b) => String(a.nickname || a.name).localeCompare(String(b.nickname || b.name), 'ru'))
    return `
      <div class="table-wrap">
        <table class="tbl">
          <thead><tr><th>Студент</th><th>Активность</th><th class="r">Очки</th></tr></thead>
          <tbody>${rows.map(u => {
            const login = u.nickname || u.name
            const active = relDay(u.lastActiveDay)
            return `<tr>
              <td><div style="display:flex;align-items:center;gap:11px">
                <span class="avatar">${esc(initials(login))}</span>
                <div style="min-width:0"><div class="cell-main">${esc(login)}</div>${u.name && u.name !== login ? `<div class="cell-sub">${esc(u.name)}</div>` : `<div class="cell-sub">#${u.id}</div>`}</div>
              </div></td>
              <td class="nowrap">${active ? (active === 'сегодня' ? '<span class="badge badge-green">сегодня</span>' : esc(active)) : '<span class="muted">—</span>'}</td>
              <td class="r num cell-main" style="color:var(--lime)">${fmt(u.points)}</td>
            </tr>`
          }).join('')}</tbody>
        </table>
        <div class="tbl-foot"><span>${fmt(rows.length)} ${plural(rows.length, 'студент', 'студента', 'студентов')}</span></div>
      </div>`
  },
}

// Направление: студенты и главы
const ProgramDirectionPage = {
  async render(view, ctx) {
    view.innerHTML = pageHead({ title: 'Программа', crumb: { path: '/programs', label: 'Программы октября' } }) + skeleton({ rows: 6 })
    const [{ list, period }, users] = await Promise.all([ProgramsData.directions(), api('/api/users')])
    if (ctx.stale()) return
    const d = list.find(x => x.key === ctx.params.dir)
    if (!d) {
      view.innerHTML = pageHead({ title: 'Программа', crumb: { path: '/programs', label: 'Программы октября' } }) + `<div class="card">${emptyState('search', 'Такого направления нет')}</div>`
      return
    }
    const students = users.filter(u => u.autumnCamp && u.autumnDirection === d.key)

    view.innerHTML = pageHead({
      title: esc(d.name),
      sub: `${esc(d.goal)} · ${esc(period)}`,
      crumb: { path: '/programs', label: 'Программы октября' },
    }) + `
      <div class="prog-dir">
        <section class="card">
          <div class="card-head">
            <div>
              <div class="card-title">${icon('book-open')}Материал</div>
              <div class="card-sub">Что студенты направления видят в разделе «Индивидуальная программа»</div>
            </div>
          </div>
          ${d.start ? `
            <a class="prog-chapter" href="${BASE}/programs/${esc(d.key)}/start">
              <span class="prog-chapter-num">Старт</span>
              <span class="prog-chapter-title">${esc(d.start.title)}</span>
              <span class="prog-chapter-meta">Блок в начале программы и каждой главы</span>
              ${icon('chevron-right', 16)}
            </a>` : ''}
          ${d.chapters.length ? d.chapters.map(ch => `
            <a class="prog-chapter" href="${BASE}/programs/${esc(d.key)}/${ch.num}">
              <span class="prog-chapter-num">Глава ${ch.num}</span>
              <span class="prog-chapter-title">${esc(ch.title)}</span>
              <span class="prog-chapter-meta">${ch.sections} ${plural(ch.sections, 'раздел', 'раздела', 'разделов')}${d.practice ? ` · ${esc(d.practice)}` : ''}</span>
              ${icon('chevron-right', 16)}
            </a>`).join('') : emptyState('book-open', 'Материал ещё готовится', 'Студенты видят «Первая глава программы скоро появится»', true)}
        </section>
        <section class="card">
          <div class="card-head">
            <div>
              <div class="card-title">${icon('users')}Студенты</div>
              <div class="card-sub">Участники лагеря с этим направлением. Сменить направление — в разделе «Пользователи»</div>
            </div>
            <span class="badge ${students.length ? 'badge-lime' : 'badge-gray'}">${fmt(students.length)}</span>
          </div>
          ${students.length ? ProgramsPage.studentsTable(students) : emptyState('users', 'Студентов пока нет', '', true)}
        </section>
      </div>`
  },
}

// Материал главы целиком — как у студента
const ProgramChapterPage = {
  async render(view, ctx) {
    const { dir, chapter } = ctx.params
    const crumb = { path: `/programs/${dir}`, label: 'Направление' }
    view.innerHTML = pageHead({ title: 'Материал', crumb }) + skeleton({ rows: 8 })
    const { list } = await ProgramsData.directions()
    const d = list.find(x => x.key === dir)
    const meta = d && (chapter === 'start' ? d.start : d.chapters.find(c => String(c.num) === chapter))
    if (!meta) {
      if (ctx.stale()) return
      view.innerHTML = pageHead({ title: 'Материал', crumb }) + `<div class="card">${emptyState('search', 'Такой главы нет')}</div>`
      return
    }
    crumb.label = d.name

    if (chapter === 'start') {
      if (ctx.stale()) return
      view.innerHTML = pageHead({ title: esc(d.start.title), sub: 'Блок в начале программы и каждой главы', crumb }) + `
        <div class="prg-admin"><section class="card prg-sec is-accent">${prgBlocks(d.start.blocks)}</section></div>`
      return
    }

    const ch = await ProgramsData.chapter(dir, chapter)
    if (ctx.stale()) return
    const a = ch.assignment
    view.innerHTML = pageHead({
      title: `Глава ${ch.num}. ${esc(ch.title)}`,
      sub: esc(ch.intro || ch.summary),
      crumb,
    }) + `
      <div class="prg-admin">
        <nav class="prg-toc card">
          ${d.start ? `<a href="#sec-start" class="prg-toc-item"><b>→</b>${esc(d.start.title)}</a>` : ''}
          ${ch.sections.map(s => `
            ${s.divider ? `<div class="prg-toc-div">${esc(s.divider)}</div>` : ''}
            <a href="#sec-${esc(s.id)}" class="prg-toc-item"><b>${esc(s.num)}</b>${esc(s.title)}</a>`).join('')}
          ${a ? `<a href="#sec-assignment" class="prg-toc-item"><b>✓</b>Задание</a>` : ''}
        </nav>
        <div class="prg-body">
          ${d.start ? `<section class="card prg-sec is-accent" id="sec-start"><div class="prg-sec-head"><span class="badge badge-orange">Старт</span><h2>${esc(d.start.title)}</h2></div>${prgBlocks(d.start.blocks)}</section>` : ''}
          ${ch.sections.map(s => `
            ${s.divider ? `<div class="prg-divider">${esc(s.divider)}</div>` : ''}
            <section class="card prg-sec" id="sec-${esc(s.id)}">
              <div class="prg-sec-head"><span class="badge badge-orange">${esc(s.num)}</span><h2>${esc(s.title)}</h2></div>
              ${prgBlocks(s.blocks)}
              ${prgTerms(s.terms)}
            </section>`).join('')}
          ${a ? ProgramChapterPage.assignment(a) : ''}
        </div>
      </div>`
    // Якоря оглавления: прокрутка без смены адреса раздела
    view.querySelectorAll('.prg-toc a').forEach(link => link.addEventListener('click', (e) => {
      e.preventDefault()
      document.querySelector(link.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }))
  },

  assignment(a) {
    return `
      <section class="card prg-sec is-accent" id="sec-assignment">
        <div class="prg-sec-head"><span class="badge badge-orange">Задание</span><h2>Задание для самостоятельной работы</h2></div>
        <div class="prg-p"><b>Время:</b> ${esc(a.time)}${a.format ? ` · <b>Формат:</b> ${esc(a.format)}` : ''}</div>
        ${a.situation?.length ? `<div class="prg-example"><div class="prg-label">Ситуация</div>${a.situation.map(p => `<p class="prg-p">${prgRich(p)}</p>`).join('')}</div>` : ''}
        ${(a.parts || []).map(p => `<h3 class="prg-h3">${esc(p.title)}${p.minutes ? ` <span class="muted">· ${p.minutes} мин</span>` : ''}</h3>${prgBlocks(p.blocks)}`).join('')}
        ${a.selfCheck?.length ? `<h3 class="prg-h3">${esc(a.selfCheckTitle || 'Вопросы для самопроверки')}${a.selfCheckMinutes ? ` <span class="muted">· ${a.selfCheckMinutes} мин</span>` : ''}</h3>${a.selfCheckIntro ? `<p class="prg-p">${prgRich(a.selfCheckIntro)}</p>` : ''}<ol class="prg-ol">${a.selfCheck.map(q => `<li>${prgRich(q)}</li>`).join('')}</ol>` : ''}
        ${a.criteria?.length ? `<h3 class="prg-h3">${esc(a.criteriaTitle || 'Критерии оценки')}</h3><ul class="prg-ul">${a.criteria.map(c => `<li>${prgRich(c)}</li>`).join('')}</ul>` : ''}
      </section>`
  },
}

PAGES.programs = ProgramsPage
PAGES.programDirection = ProgramDirectionPage
PAGES.programChapter = ProgramChapterPage
