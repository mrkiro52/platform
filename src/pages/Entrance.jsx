import { useEffect, useState } from 'react'
import { api } from '../api'
import '../winter.css'
import './entrance.css'

const version = '3'
const initial = { step: 'start', answers: {} }

export default function Entrance({ user }) {
  const key = `kiro_entrance_v3_${user.id}`
  const [draft, setDraft] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(key))
      if (saved) return saved
      const previous = JSON.parse(localStorage.getItem(`kiro_entrance_v1_${user.id}`))
      return previous?.version === '2' ? { ...initial, answers: previous.answers } : initial
    } catch { return initial }
  })
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [storageError, setStorageError] = useState(false)
  const [retry, setRetry] = useState(0)
  useEffect(() => {
    let current = true
    api.entrance(version).then(result => { if (current) setData(result) })
      .catch(e => { if (current) setError(e.message) })
    return () => { current = false }
  }, [retry])
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
  const sections = Object.entries(data.sections)
  const questions = sections.flatMap(([topic, rows]) =>
    rows.map(([id, prompt]) => [id, topic, prompt]))
  const numbers = Object.fromEntries(questions.map(([id], index) => [id, index + 1]))
  const steps = ['start', ...questions.map(([id]) => id), 'review']
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
      const result = await api.submitEntrance({ version, answers })
      if (result?.submitted) setData(result)
    } catch (e) { setError(e.message) } finally { setSaving(false) }
  }
  const jump = id => update({ step: id })
  return <main className="page active wc-page is-winter entrance">
    <header className="wc-top"><div><span className="wc-kicker">Winter Camp · Входное тестирование</span>
      <h1 className="wc-top-title">Тестирование знаний</h1></div></header>
    <div className="wc-learning-layout">
    <section className="wc-section">
    <section key={step} className="wc-card entrance-card">
      {step === 'start' && <><strong className="wc-kicker">Доступно тестирование</strong><h2 className="wc-detail-title">С чего начнём обучение?</h2><p>{questions.length} вопросов по {sections.length} разделам. Отвечай в любом порядке. Любой вопрос можно пропустить.</p><button onClick={() => move(1)}>Начать тестирование</button></>}
      {question && <><strong className="wc-kicker">{question[1]} · Вопрос {questions.indexOf(question) + 1}</strong><h2 className="wc-detail-title"><label htmlFor="entrance-answer">{question[2].split('\n\n')[0]}</label></h2>{question[2].includes('\n\n') && <pre className="entrance-code"><code>{question[2].slice(question[2].indexOf('\n\n') + 2)}</code></pre>}<textarea id="entrance-answer" maxLength={1500} value={draft.answers[step] || ''} placeholder="Опиши решение и объясни, почему выбрал его" onChange={e => update({ answers: { ...draft.answers, [step]: e.target.value } })}/><small>{(draft.answers[step] || '').length} / 1500</small></>}
      {step === 'review' && <>
        <h2 className="wc-detail-title">Проверка перед отправкой</h2>
        <p>Ответов — {answered}. Без ответа — {questions.length - answered}. Можно вернуться к любому вопросу в списке.</p>
      </>}
      {index > 0 && <div className="entrance-actions">
        <button disabled={saving} onClick={() => move(-1)}>Назад</button>
        {step === 'review'
          ? <button disabled={saving} onClick={submit}>{saving ? 'Отправляем…' : 'Отправить ментору'}</button>
          : <button onClick={() => move(1)}>{draft.answers[step]?.trim() ? 'Продолжить' : 'Пропустить вопрос'}</button>}
      </div>}
      {error && <p role="alert">{error}</p>}
    </section><small role="status">{storageError ? 'Браузер не смог сохранить черновик. Оставь страницу открытой до отправки.' : 'Черновик сохраняется в этом браузере. Можно вернуться позже.'}</small></section>
    <aside className="wc-learning-aside"><section className="wc-card wc-section">
      <div className="wc-card-head"><h2 className="wc-card-title">Вопросы</h2><span className="wc-card-value">{answered}/{questions.length}</span></div>
      <progress aria-label="Заполнено ответов" value={answered} max={questions.length}/>
      {sections.map(([topic, rows]) => <div key={topic}>
        <h3 className="wc-kicker">{topic} · {rows.length}</h3>
        <div className="wc-tabs">{rows.map(([id]) => <button key={id} disabled={saving}
          className={id === step ? 'is-active' : ''} aria-current={id === step ? 'step' : undefined}
          aria-label={`Вопрос ${numbers[id]}. ${topic}. ${draft.answers[id]?.trim() ? 'Есть ответ' : 'Без ответа'}`}
          onClick={() => jump(id)}>{numbers[id]}{draft.answers[id]?.trim() && ' ✓'}</button>)}</div>
      </div>)}
      <button className="wc-link" disabled={saving} onClick={() => jump('review')}>К проверке ответов</button>
    </section></aside></div>
  </main>
}
