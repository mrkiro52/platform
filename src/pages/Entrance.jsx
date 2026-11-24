import { useEffect, useState } from 'react'
import { api } from '../api'
import '../winter.css'
import './entrance.css'

const tracks = { ml: 'ML', backend: 'Backend', security: 'Информационная безопасность' }
const groups = [['NumPy', 'pandas'], ['Классическое ML'], ['Основы DL']]
const initial = { step: 'start', track: '', skipped: [], answers: {} }

export default function Entrance({ user }) {
  const key = `kiro_entrance_v1_${user.id}`
  const [draft, setDraft] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key))
      return { ...initial, version: saved && (saved.step !== 'start' || Object.keys(saved.answers || {}).length) ? '1' : '2', ...saved }
    } catch { return { ...initial, version: '2' } }
  })
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [storageError, setStorageError] = useState(false)
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    let current = true
    api.entrance(draft.version).then(result => { if (current) setData(result) })
      .catch(e => { if (current) setError(e.message) })
    return () => { current = false }
  }, [retry, draft.version])
  useEffect(() => {
    if (!data) return
    try {
      if (data.submitted) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(draft))
      setStorageError(false)
    } catch { setStorageError(true) }
  }, [draft, key, data])
  const update = patch => setDraft(previous => ({ ...previous, ...patch }))
  if (!data) return <section className="page active wc-page entrance"><h1>Тестирование знаний</h1>{error || 'Загружаем маршрут…'} {error && <button onClick={() => { setError(''); setRetry(retry + 1) }}>Повторить</button>}</section>
  if (data.submitted) return <section className="page active wc-page entrance"><div className="wc-card entrance-card"><strong className="wc-kicker">Маршрут завершён ✦</strong><h1>Ответы сохранены и переданы ментору</h1><p>Они помогут выстроить индивидуальную программу с учётом твоего уровня подготовки.</p></div></section>
  const bank = data.bank
  const branch = bank[draft.track] || []
  const active = branch.filter(([, topic]) => draft.track !== 'ml' || !draft.skipped.includes(topic))
  const questions = [...bank.base, ...active]
  const steps = ['start', ...bank.base.map(q => q[0]), 'track', ...active.map(q => q[0]), 'review']
  const index = Math.max(0, steps.indexOf(draft.step))
  const step = steps[index]
  const question = questions.find(q => q[0] === step)
  const move = offset => update({ step: steps[index + offset] })
  const answered = questions.filter(([id]) => draft.answers[id]?.trim()).length
  async function submit() {
    setSaving(true)
    setError('')
    try {
      const answers = Object.fromEntries(questions.map(([id]) => [id, draft.answers[id] || '']))
      const result = await api.submitEntrance({ track: draft.track, version: draft.version, answers })
      if (result?.submitted) setData(result)
    } catch (e) { setError(e.message) } finally { setSaving(false) }
  }
  const jump = id => update({ step: id })
  const destinations = [...bank.base, ...active]
  return <main className="page active wc-page is-winter entrance">
    <header className="wc-top"><div><span className="wc-kicker">Winter Camp · Входное тестирование</span>
      <h1 className="wc-top-title">Тестирование знаний</h1></div></header>
    <div className="wc-learning-layout">
    <section className="wc-section">
    <section key={step} className="wc-card entrance-card">
      {step === 'start' && <><strong className="wc-kicker">Доступно тестирование</strong><h2 className="wc-detail-title">С чего начнём обучение?</h2><p>Примерно за час ты разберёшь {bank.base.length} ситуаций по общей базе, затем выберешь направление и ответишь ещё максимум на 5 вопросов. Объясняй ход мысли своими словами. Любой вопрос можно пропустить.</p><button onClick={() => move(1)}>Начать тестирование</button></>}
      {question && <><strong className="wc-kicker">{question[1]} · Вопрос {questions.indexOf(question) + 1}</strong><h2 className="wc-detail-title"><label htmlFor="entrance-answer">{question[2].split('\n\n')[0]}</label></h2>{question[2].includes('\n\n') && <pre className="entrance-code"><code>{question[2].slice(question[2].indexOf('\n\n') + 2)}</code></pre>}<textarea id="entrance-answer" maxLength={1500} value={draft.answers[step] || ''} placeholder="Опиши решение и объясни, почему выбрал его" onChange={e => update({ answers: { ...draft.answers, [step]: e.target.value } })}/><small>{(draft.answers[step] || '').length} / 1500</small></>}
      {step === 'track' && <><h2 className="wc-detail-title">Выбери направление</h2><div className="wc-plan wc-month-picker">{Object.entries(tracks).map(([id, name]) => <button className="wc-plan-month" key={id} aria-pressed={id === draft.track} onClick={() => update({ track: id })}>{name}</button>)}</div>{draft.track === 'ml' && <fieldset><legend>Какие темы включить?</legend>{groups.map(group => <label key={group[0]}><input type="checkbox" checked={!draft.skipped.includes(group[0])} onChange={e => update({ skipped: e.target.checked ? draft.skipped.filter(t => !group.includes(t)) : [...draft.skipped, ...group] })}/>{group.join(' и ')}</label>)}<p>Сними отметку, если пока не изучал тему.</p></fieldset>}</>}
      {step === 'review' && <><strong className="wc-kicker">{tracks[draft.track]}</strong><h2 className="wc-detail-title">Проверка перед отправкой</h2><p>Ответов — {answered}. Пропущено — {bank.base.length + branch.length - answered}. Можно вернуться к любому вопросу.</p><div className="entrance-review">{questions.map(([id, topic], i) => <button key={id} onClick={() => update({ step: id })}>{i + 1}. {topic} · {draft.answers[id]?.trim() ? 'Есть ответ' : 'Пропущен'}</button>)}</div></>}
      {index > 0 && <div className="entrance-actions"><button disabled={saving} onClick={() => move(-1)}>Назад</button>{step === 'review' ? <button disabled={saving} onClick={submit}>{saving ? 'Отправляем…' : 'Отправить ментору'}</button> : <button disabled={step === 'track' && !tracks[draft.track]} onClick={() => move(1)}>{question && !draft.answers[step]?.trim() ? 'Пропустить вопрос' : 'Продолжить'}</button>}</div>}
      {error && <p role="alert">{error}</p>}
    </section><small role="status">{storageError ? 'Браузер не смог сохранить черновик. Оставь страницу открытой до отправки.' : 'Черновик сохраняется в этом браузере. Можно вернуться позже.'}</small></section>
    <aside className="wc-learning-aside"><section className="wc-card wc-section">
      <div className="wc-card-head"><h2 className="wc-card-title">Вопросы</h2><span className="wc-card-value">{answered}/{destinations.length}</span></div>
      <progress aria-label="Заполнено ответов" value={answered} max={destinations.length}/>
      {[bank.base, active].map((part, i) => <div key={i}><h3 className="wc-kicker">{i ? 'Направление' : 'Общая база'}</h3>
        {i === 1 && <button className="wc-more" disabled={saving} onClick={() => jump('track')}>{tracks[draft.track] || 'Выбрать направление'}</button>}
        <div className="wc-tabs">{part.map(([id, topic], n) => <button key={id} disabled={saving}
          className={id === step ? 'is-active' : ''} aria-current={id === step ? 'step' : undefined}
          title={topic} aria-label={`Вопрос ${i ? n + bank.base.length + 1 : n + 1}. ${topic}. ${draft.answers[id]?.trim() ? 'Есть ответ' : 'Без ответа'}`}
          onClick={() => jump(id)}>{i ? n + bank.base.length + 1 : n + 1}{draft.answers[id]?.trim() && ' ✓'}</button>)}</div></div>)}
      <button className="wc-link" disabled={saving} onClick={() => jump(draft.track ? 'review' : 'track')}>{draft.track ? 'К проверке ответов' : 'Перейти к выбору трека'}</button>
    </section></aside></div>
  </main>
}
