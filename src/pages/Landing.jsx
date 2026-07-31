import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../landing.css'

const TG = 'https://t.me/kiro_team_manager'

/* ── Появление секций при скролле ───────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('.lp-rev')
    if (!items.length) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    items.forEach(i => io.observe(i))
    return () => io.disconnect()
  }, [])
}

/* ── Счётчик, оживающий в вьюпорте ──────────────────────────────── */
function Num({ to, suffix = '' }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setV(to); return }
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now(), dur = 1300
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur)
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [to])

  return <span ref={ref}>{v}<i>{suffix}</i></span>
}

/* ── Заголовок секции: [индекс] ── линия ── название ────────────── */
function SHead({ n, children }) {
  return (
    <div className="lp-shead lp-rev">
      <span className="lp-idx">[ {n} ]</span>
      <span className="lp-shead-line" />
      <span className="lp-mono">{children}</span>
    </div>
  )
}

const TICKER = [
  'Закрытое сообщество', '90 конспектов', 'AntiReels', 'Онлайн-тесты', 'Тренажёры',
  'Вакансии и стажировки', 'Полные ликбезы', 'Видеозаписи занятий', 'Личные сообщения',
  'Frontend', 'Backend', 'Аналитика', 'Machine Learning', 'Кибербезопасность',
]

const LIKBEZY = [
  { t: 'Python',           s: 'Синтаксис, структуры данных, стандартная библиотека — с нуля до уверенного уровня', tag: 'Язык' },
  { t: 'ООП в Python',     s: 'От классов и наследования до метаклассов, SOLID и паттернов проектирования',        tag: 'Язык' },
  { t: 'Pandas',           s: 'DataFrame, индексация, группировки, слияния, очистка реальных данных',              tag: 'Инструмент' },
  { t: 'SQL',              s: 'Полный курс по базам данных: выборки, JOIN, агрегации, оконные функции',            tag: 'База данных' },
  { t: 'Machine Learning', s: 'Вся теория для собеседования на ML в БигТех — мастхэв для стажёра и джуна',         tag: 'Направление' },
  { t: 'NumPy',            s: 'Массивы, линейная алгебра, векторизация вычислений',                                tag: 'Скоро', soon: true },
  { t: 'Git и GitHub',     s: 'Ветки, merge, rebase, pull request, командная работа и CI/CD',                      tag: 'Скоро', soon: true },
]

const VAULT = [
  { k: 'Вакансии',    h: 'Открытые позиции',      p: 'Джуниор- и стажёрские вакансии, которые участники находят и приносят в сообщество.' },
  { k: 'Стажировки',  h: 'Наборы в BigTech',      p: 'Сроки подачи в программы стажировок, требования и что спрашивают на отборе.' },
  { k: 'Практика',    h: 'Тренировочные площадки', p: 'Kaggle Learn, HackTheBox, TryHackMe, picoCTF, Codeby Games и другие — с описанием, кому что.' },
  { k: 'Разборы',     h: 'Как проходят отбор',     p: 'Личный опыт участников: какие задачи давали, что спрашивали, чем всё закончилось.' },
  { k: 'Компании',    h: 'Куда идти',              p: 'Что за компания, как устроен найм, какой стек и чего ждать от процесса.' },
  { k: 'Ресурсы',     h: 'Проверенное',            p: 'Статьи, гайды и материалы, отобранные сообществом, — без информационного шума.' },
]

const FOMO = [
  { w: 'Сегодня',   t: 'кто-то забрал вакансию, ссылку на которую скинули в закрытый раздел' },
  { w: 'Вчера',     t: 'разобрали задачу с реального собеседования — с объяснением, почему решение именно такое' },
  { w: 'На неделе', t: 'выложили новый конспект и набор тестов к нему' },
  { w: 'Прямо сейчас', t: 'кто-то листает AntiReels и закрывает пробел, о котором ты пока не знаешь' },
]

export default function Landing() {
  const navigate = useNavigate()
  const [stuck, setStuck] = useState(false)
  useReveal()

  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => document.body.classList.remove('landing-page')
  }, [])

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = () => navigate('/login')

  return (
    <div className="lp">

      {/* ══ ШАПКА ══════════════════════════════════════════════ */}
      <header className={`lp-nav${stuck ? ' stuck' : ''}`}>
        <div className="lp-wrap lp-nav-in">
          <div className="lp-brand">
            <span className="lp-brand-k">KIRO</span>
            <span className="lp-brand-t">PLATFORM</span>
          </div>
          <nav className="lp-nav-mid">
            <a href="#inside">Внутри</a>
            <a href="#antireels">AntiReels</a>
            <a href="#likbez">Ликбезы</a>
            <a href="#vault">База</a>
          </nav>
          <div className="lp-nav-right">
            <span className="lp-nav-badge">Доступ по приглашению</span>
            <button className="lp-btn lp-btn--go lp-btn--sm" onClick={go}>
              Войти <span className="lp-arr">→</span>
            </button>
          </div>
        </div>
      </header>

      {/* ══ HERO ═══════════════════════════════════════════════ */}
      <section className="lp-hero">
        <div className="lp-hero-mesh" />
        <div className="lp-hero-glow" />
        <div className="lp-wrap lp-hero-in">

          <div>
            <span className="lp-hero-tag"><span className="lp-dot" /> Закрытая платформа · вход по логину</span>
            <h1 className="lp-display">
              Не ещё один<br />
              <span className="lp-strike">курс</span> в закладках.<br />
              Среда, где <em style={{ fontStyle: 'normal', color: 'var(--cy)' }}>растут</em>.
            </h1>
            <p className="lp-hero-sub">
              Внутри — соцсеть для разработчиков, библиотека из десятков конспектов и видеозаписей,
              тренажёры, онлайн-тесты, AntiReels и закрытая база вакансий, стажировок и ресурсов.
              <b> Снаружи ничего этого не видно.</b>
            </p>
            <div className="lp-hero-cta">
              <button className="lp-btn lp-btn--go" onClick={go}>
                Войти на платформу <span className="lp-arr">→</span>
              </button>
              <a className="lp-btn lp-btn--wire" href={TG} target="_blank" rel="noopener">
                Запросить доступ
              </a>
            </div>
            <p className="lp-hero-fine">
              <s>●</s> Регистрация закрыта — аккаунт выдаёт менеджер
            </p>
          </div>

          {/* Панель «живой» активности */}
          <div className="lp-live lp-rev" data-d="2">
            <div className="lp-live-head">
              <span className="lp-live-dot" />
              <span>Внутри платформы · сейчас</span>
            </div>
            <div className="lp-live-body">
              <div className="lp-live-row">
                <div className="lp-av">АК</div>
                <div className="lp-live-txt"><b>Анна</b> выложила разбор задачи с собеса в Яндекс</div>
                <span className="lp-live-when">2м</span>
              </div>
              <div className="lp-live-row">
                <div className="lp-av">ДМ</div>
                <div className="lp-live-txt"><b>Дмитрий</b> скинул вакансию джуна в закрытый раздел</div>
                <span className="lp-live-when">14м</span>
              </div>
              <div className="lp-live-row">
                <div className="lp-av">СВ</div>
                <div className="lp-live-txt"><b>Света</b> прошла тест по SQL на 18/20</div>
                <span className="lp-live-when">31м</span>
              </div>
              <div className="lp-live-row">
                <div className="lp-av">ИЛ</div>
                <div className="lp-live-txt"><b>Илья</b> открыл ликбез по ООП в Python</div>
                <span className="lp-live-when">48м</span>
              </div>
            </div>
            <div className="lp-live-foot">
              <span>Лента доступна участникам</span>
              <em>[ закрыто ]</em>
            </div>
          </div>

        </div>
      </section>

      {/* ══ ТИКЕР ══════════════════════════════════════════════ */}
      <div className="lp-ticker" aria-hidden="true">
        <div className="lp-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span className="lp-ticker-it" key={i}><i>◆</i> {t}</span>
          ))}
        </div>
      </div>

      {/* ══ ЦИФРЫ ══════════════════════════════════════════════ */}
      <section className="lp-sec lp-sec--sm">
        <div className="lp-wrap">
          <div className="lp-nums lp-rev">
            <div className="lp-num">
              <div className="lp-num-v"><Num to={90} suffix="+" /></div>
              <div className="lp-num-l">конспектов с разборами, схемами и кодом</div>
            </div>
            <div className="lp-num">
              <div className="lp-num-v"><Num to={79} suffix="" /></div>
              <div className="lp-num-l">наборов онлайн-тестов для самопроверки</div>
            </div>
            <div className="lp-num">
              <div className="lp-num-v"><Num to={30} suffix="" /></div>
              <div className="lp-num-l">карточек AntiReels по 5 направлениям</div>
            </div>
            <div className="lp-num">
              <div className="lp-num-v"><Num to={5} suffix="" /></div>
              <div className="lp-num-l">полных ликбезов — от Python до ML</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BENTO: ЧТО ВНУТРИ ══════════════════════════════════ */}
      <section className="lp-sec" id="inside">
        <div className="lp-wrap">
          <SHead n="01">Что за дверью</SHead>
          <h2 className="lp-h2 lp-rev" style={{ maxWidth: 760 }}>
            Это не папка с видео.<br />Это <em>рабочая среда</em>, в которой живёшь каждый день.
          </h2>

          <div className="lp-bento" style={{ marginTop: 44 }}>

            {/* Соцсеть — крупная плитка */}
            <article className="lp-tile lp-tile--wide lp-rev">
              <span className="lp-tile-k">Соцсеть для разработчиков</span>
              <h3>Своя лента, а не чат на 500 непрочитанных</h3>
              <p>
                Делись новостями и мнением, спорь в комментариях, подписывайся на тех,
                кто пишет по делу. Личные сообщения — чтобы дожать вопрос один на один.
              </p>
              <div className="lp-mini-feed">
                <div className="lp-mini-post">
                  <span><b>Кирилл:</b> завалил вопрос про GIL, разбираю по частям →</span>
                  <span className="lp-chips"><span className="lp-chip hot">❤ 24</span><span className="lp-chip">12</span></span>
                </div>
                <div className="lp-mini-post">
                  <span><b>Марина:</b> оффер! спасибо за разбор резюме 🎉</span>
                  <span className="lp-chips"><span className="lp-chip hot">🎉 61</span><span className="lp-chip">30</span></span>
                </div>
              </div>
            </article>

            {/* AntiReels — вертикальная */}
            <article className="lp-tile lp-tile--tall lp-rev" data-d="1">
              <span className="lp-tile-k">AntiReels</span>
              <h3>Скролл, который качает</h3>
              <p>Листаешь как ленту — но вместо мусора факт, который спросят на собесе.</p>
              <div className="lp-stack">
                <div className="lp-stack-c"><b>Big O</b> — почему <code>in</code> по списку это O(n), а по set — O(1)</div>
                <div className="lp-stack-c">Семантические теги и SEO</div>
                <div className="lp-stack-c">Что такое GIL</div>
              </div>
            </article>

            {/* Конспекты */}
            <article className="lp-tile lp-tile--third lp-rev">
              <span className="lp-tile-k">Библиотека</span>
              <h3>Конспекты</h3>
              <p>Десятки разборов со схемами, примерами кода и пояснениями — доступны навсегда, а не «до конца потока».</p>
            </article>

            {/* Видео */}
            <article className="lp-tile lp-tile--third lp-rev" data-d="1">
              <span className="lp-tile-k">Видеозаписи</span>
              <h3>Записи занятий</h3>
              <p>Пропустил или не понял с первого раза — пересматриваешь в своём темпе, с разбивкой по частям.</p>
            </article>

            {/* Тесты */}
            <article className="lp-tile lp-tile--third lp-rev" data-d="2">
              <span className="lp-tile-k">Проверка</span>
              <h3>Онлайн-тесты</h3>
              <p>После каждой темы — тест. Сразу видно, что реально усвоил, а что только казалось понятным.</p>
            </article>

            {/* Тренажёры */}
            <article className="lp-tile lp-tile--half lp-rev">
              <span className="lp-tile-k">Тренажёры</span>
              <h3>Навык, а не конспект в закладках</h3>
              <p>
                «Сложность алгоритмов» — смотришь на код и называешь Big O.
                «Что выведет?» — вписываешь точный вывод неочевидного Python-кода.
                Повторяешь, пока не станет автоматизмом.
              </p>
            </article>

            {/* Ссылки */}
            <article className="lp-tile lp-tile--half lp-rev" data-d="1">
              <span className="lp-tile-k">Закрытая база</span>
              <h3>Вакансии, стажировки, ресурсы</h3>
              <p>
                Внутри сообщества — подборка вакансий, наборов на стажировки, компаний
                и проверенных площадок для практики. Всё в одном месте, без гугления
                и без информационного шума.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* ══ ANTIREELS — отдельная секция ═══════════════════════ */}
      <section className="lp-reels lp-sec" id="antireels">
        <div className="lp-wrap lp-reels-in">
          <div>
            <SHead n="02">AntiReels</SHead>
            <h2 className="lp-h2">
              Тот же жест.<br />Противоположный <em>результат</em>.
            </h2>
            <p className="lp-p lp-p--wide">
              Ты всё равно листаешь ленту — вопрос только в том, что там. AntiReels
              подсовывает короткие карточки с фактом, который спрашивают на собеседовании:
              Big O, семантика HTML, GIL, индексы в БД, метрики модели.
            </p>

            <div className="lp-vs">
              <div className="lp-vs-box bad">
                <div className="lp-vs-k">Обычная лента</div>
                <p>40 минут скролла → ноль в голове, минус время, плюс тревожность.</p>
              </div>
              <div className="lp-vs-mid">VS</div>
              <div className="lp-vs-box good">
                <div className="lp-vs-k">AntiReels</div>
                <p>40 минут скролла → десятки закрытых пробелов, которые всплывут на собесе.</p>
              </div>
            </div>
          </div>

          <div className="lp-rev" data-d="2">
            <div className="lp-phone">
              <div className="lp-phone-scr">
                <div className="lp-phone-k">Backend · карточка 12 / 30</div>
                <div className="lp-phone-t">Почему поиск по set быстрее списка</div>
                <div className="lp-phone-b">
                  <p style={{ margin: '0 0 12px' }}>
                    Проверка <code>x in list</code> перебирает элементы по одному — это <code>O(n)</code>.
                  </p>
                  <p style={{ margin: '0 0 12px' }}>
                    <code>set</code> и <code>dict</code> считают хеш и прыгают сразу в нужную ячейку — <code>O(1)</code> в среднем.
                  </p>
                  <p style={{ margin: 0 }}>
                    На миллионе элементов это разница между миллисекундой и секундами.
                  </p>
                </div>
                <div className="lp-phone-nav">
                  <span>◄ назад</span>
                  <span className="lp-swipe"><span>▲</span>свайп</span>
                  <span>далее ►</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ТРЕНАЖЁРЫ + ТЕСТЫ ══════════════════════════════════ */}
      <section className="lp-sec">
        <div className="lp-wrap">
          <SHead n="03">Практика</SHead>
          <h2 className="lp-h2 lp-rev" style={{ maxWidth: 720 }}>
            Читать про алгоритмы и <em>уметь их разбирать</em> — разные вещи
          </h2>
          <p className="lp-p lp-p--wide lp-rev" style={{ marginBottom: 40 }}>
            Поэтому внутри не только текст. Тренажёры гоняют навык до автоматизма,
            тесты после каждой темы показывают дыры до того, как их найдёт интервьюер.
          </p>

          <div className="lp-two">
            <div className="lp-pane lp-rev">
              <div className="lp-pane-head"><span>Тренажёр · сложность алгоритмов</span><em>O(?)</em></div>
              <pre className="lp-code">
<span className="c">{'# что тут по времени?'}</span>{'\n'}
<span className="k">def</span> <span className="f">has_duplicate</span>(nums):{'\n'}
{'    '}seen = <span className="f">set</span>(){'\n'}
{'    '}<span className="k">for</span> n <span className="k">in</span> nums:{'\n'}
{'        '}<span className="k">if</span> n <span className="k">in</span> seen:{'\n'}
{'            '}<span className="k">return</span> <span className="s">True</span>{'\n'}
{'        '}seen.<span className="f">add</span>(n){'\n'}
{'    '}<span className="k">return</span> <span className="s">False</span><span className="lp-caret" />
              </pre>
              <div className="lp-opts">
                <span className="lp-opt">O(1)</span>
                <span className="lp-opt ok">O(n)</span>
                <span className="lp-opt">O(n²)</span>
              </div>
            </div>

            <div className="lp-pane lp-rev" data-d="1">
              <div className="lp-pane-head"><span>Онлайн-тест · SQL</span><em>18 / 20</em></div>
              <div className="lp-q">
                <div className="lp-q-t">Какой JOIN вернёт строки левой таблицы, даже если в правой совпадений нет?</div>
                <div className="lp-q-a">
                  <div className="lp-q-o"><i>A</i> INNER JOIN</div>
                  <div className="lp-q-o ok"><i>B</i> LEFT JOIN</div>
                  <div className="lp-q-o"><i>C</i> CROSS JOIN</div>
                  <div className="lp-q-o"><i>D</i> Ни один из них</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ЛИКБЕЗЫ — editorial-список ═════════════════════════ */}
      <section className="lp-sec" id="likbez" style={{ background: 'var(--panel)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div className="lp-wrap">
          <SHead n="04">Полные ликбезы</SHead>
          <h2 className="lp-h2 lp-rev" style={{ maxWidth: 720 }}>
            Отдельные мини-курсы по темам, языкам и <em>инструментам</em>
          </h2>
          <p className="lp-p lp-p--wide lp-rev" style={{ marginBottom: 38 }}>
            Не нарезка занятий, а собранный с нуля материал по одной теме — читаешь
            подряд и закрываешь направление целиком.
          </p>

          <div className="lp-list lp-rev">
            {LIKBEZY.map((l, i) => (
              <div className={`lp-li${l.soon ? ' lp-li--soon' : ''}`} key={l.t}>
                <span className="lp-li-n">{String(i + 1).padStart(2, '0')}</span>
                <div className="lp-li-t">{l.t}<span>{l.s}</span></div>
                <span className="lp-li-tag">{l.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ЗАКРЫТАЯ БАЗА — заблокированный блок ═══════════════ */}
      <section className="lp-sec" id="vault">
        <div className="lp-wrap">
          <SHead n="05">Закрытая база</SHead>
          <h2 className="lp-h2 lp-rev" style={{ maxWidth: 780 }}>
            Вакансии и стажировки, о которых <em>не пишут в открытых чатах</em>
          </h2>
          <p className="lp-p lp-p--wide lp-rev" style={{ marginBottom: 38 }}>
            Участники приносят внутрь то, что находят сами: открытые позиции, сроки набора
            в стажировки, разборы отбора, проверенные площадки для практики.
            Доступно только тем, кто внутри.
          </p>

          <div className="lp-vault lp-rev">
            <div className="lp-vault-grid">
              {VAULT.map((v, i) => (
                <div className={`lp-vault-c${i > 1 ? ' blur' : ''}`} key={v.h}>
                  <div className="lp-vault-k">{v.k}</div>
                  <h4>{v.h}</h4>
                  <p>{v.p}</p>
                </div>
              ))}
            </div>
            <div className="lp-vault-lock">
              <p>Содержимое доступно участникам</p>
              <button className="lp-btn lp-btn--go lp-btn--sm" onClick={go}>
                Войти и открыть <span className="lp-arr">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOMO ═══════════════════════════════════════════════ */}
      <section className="lp-sec lp-fomo">
        <div className="lp-wrap">
          <div className="lp-fomo-in lp-rev">
            <div className="lp-fomo-k">Пока тебя нет</div>
            <h2>
              Платформа не ждёт.<br />Она живёт <span style={{ color: 'var(--hot)' }}>без тебя</span>.
            </h2>
            <p className="lp-p lp-p--wide">
              Каждый день внутри что-то происходит. Разница между теми, кто получил оффер,
              и теми, кто «ещё готовится», обычно не в таланте — а в том, что первые были там,
              где это обсуждали.
            </p>

            <div className="lp-fomo-rows">
              {FOMO.map(f => (
                <div className="lp-fomo-row" key={f.w}>
                  <b>{f.w}</b>
                  <span>{f.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ФИНАЛЬНЫЙ CTA ══════════════════════════════════════ */}
      <section className="lp-end">
        <div className="lp-end-glow" />
        <div className="lp-wrap">
          <h2>Дверь открывается<br />только изнутри</h2>
          <p>
            Аккаунты выдаёт менеджер — регистрации с улицы нет.
            Если у тебя уже есть логин, всё это ждёт за одним экраном.
          </p>
          <div className="lp-end-cta">
            <button className="lp-btn lp-btn--go" onClick={go}>
              Войти на платформу <span className="lp-arr">→</span>
            </button>
            <a className="lp-btn lp-btn--wire" href={TG} target="_blank" rel="noopener">
              Запросить доступ
            </a>
          </div>
          <p className="lp-end-fine">
            Нет логина? Напиши <a href={TG} target="_blank" rel="noopener">@kiro_team_manager</a>
          </p>
        </div>
      </section>

      {/* ══ ПОДВАЛ ═════════════════════════════════════════════ */}
      <footer className="lp-foot">
        <div className="lp-wrap lp-foot-in">
          <span>© 2026 KIRO PLATFORM</span>
          <span>
            <a href={TG} target="_blank" rel="noopener">@kiro_team_manager</a>
            {'  ·  '}
            <a href="/login">Вход для участников</a>
          </span>
        </div>
      </footer>

    </div>
  )
}
