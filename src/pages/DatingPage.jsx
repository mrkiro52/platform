import { useEffect, useRef, useState } from 'react'
import { api, assetUrl } from '../api'

// Раздел «Знакомства»: анкеты пользователей карточками.
// Анкета есть у каждого, но по умолчанию скрыта. «Показать мой профиль»:
// пустую анкету сначала нужно заполнить, заполненную — подтвердить, что данные
// актуальны (или отредактировать). Показанная анкета идёт первой в сетке.

const LIMITS = { name: 60, about: 600, contact: 300 }
const ABOUT_HINT = 'Например: ищу напарника на хакатон, ментора по SQL, друзей в Москве или просто интересных людей из IT'

const isComplete = p => !!(p && p.name && p.about && p.contact && p.photoUrl)

// Подпись ссылки без протокола: t.me/username
function contactLabel(url) {
  return String(url || '').replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [onClose])
  return (
    <div className="dt-overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className={`dt-modal${wide ? ' is-wide' : ''}`} role="dialog" aria-modal="true" aria-label={title}>
        <div className="dt-modal-head">
          <h2 className="dt-modal-title">{title}</h2>
          <button type="button" className="dt-modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function DatingCard({ p, mine }) {
  return (
    <article className={`dt-card${mine ? ' is-mine' : ''}`}>
      <div className="dt-card-photo">
        <img src={assetUrl(p.photoUrl)} alt={p.name} loading="lazy" />
        {mine && <span className="dt-card-mine">Ваша анкета</span>}
        <div className="dt-card-name">{p.name}</div>
      </div>
      <div className="dt-card-body">
        <div className="dt-card-label">Ищу</div>
        <p className="dt-card-about">{p.about}</p>
        <a className="dt-card-contact" href={p.contact} target="_blank" rel="noopener noreferrer">
          <span className="dt-card-contact-text">{contactLabel(p.contact)}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  )
}

function Editor({ me, defaultName, publish, onClose, onSaved }) {
  const [form, setForm] = useState({ name: me.name || defaultName || '', about: me.about || '', contact: me.contact || '' })
  const [photoUrl, setPhotoUrl] = useState(me.photoUrl || '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef(null)

  const set = key => e => setForm(f => ({ ...f, [key]: e.target.value }))
  const missing = {
    photo: !photoUrl,
    name: !form.name.trim(),
    about: !form.about.trim(),
    contact: !form.contact.trim(),
  }

  const pickPhoto = async e => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    if (file.size > 5 * 1024 * 1024) { setError('Фото должно быть не больше 5 МБ'); return }
    setError('')
    setUploading(true)
    try {
      const p = await api.uploadDatingPhoto(file)
      setPhotoUrl(p.photoUrl)
      onSaved(p, false)
    } catch (err) {
      setError(err.message || 'Не удалось загрузить фото')
    } finally {
      setUploading(false)
    }
  }

  const submit = async e => {
    e.preventDefault()
    setTouched(true)
    if (Object.values(missing).some(Boolean)) { setError('Заполни все поля — они обязательные'); return }
    setSaving(true)
    setError('')
    try {
      const p = await api.saveDating({ ...form, publish })
      onSaved(p, true)
    } catch (err) {
      setError(err.message || 'Не удалось сохранить анкету')
      setSaving(false)
    }
  }

  const bad = key => touched && missing[key]

  return (
    <Modal title={publish ? 'Анкета знакомств' : 'Редактировать анкету'} onClose={onClose} wide>
      <form className="dt-form" onSubmit={submit} noValidate>
        <div className="dt-form-grid">
          <div className="dt-field">
            <span className="dt-label">Фото</span>
            <button
              type="button"
              className={`dt-photo-pick${photoUrl ? ' has-photo' : ''}${bad('photo') ? ' is-error' : ''}`}
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
            >
              {photoUrl
                ? <img src={assetUrl(photoUrl)} alt="Фото анкеты" />
                : (
                  <span className="dt-photo-empty">
                    <span className="dt-photo-plus" aria-hidden="true">+</span>
                    <span>Загрузить фото</span>
                    <small>JPEG, PNG или WebP до 5 МБ</small>
                  </span>
                )}
              {photoUrl && <span className="dt-photo-change">{uploading ? 'Загружаем…' : 'Заменить фото'}</span>}
              {!photoUrl && uploading && <span className="dt-photo-change">Загружаем…</span>}
            </button>
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={pickPhoto} />
          </div>

          <div className="dt-fields">
            <label className="dt-field">
              <span className="dt-label">Имя</span>
              <input
                className={`dt-input${bad('name') ? ' is-error' : ''}`}
                value={form.name}
                onChange={set('name')}
                maxLength={LIMITS.name}
                placeholder="Как к тебе обращаться"
              />
            </label>
            <label className="dt-field">
              <span className="dt-label">
                Кого или что ищу
                <span className="dt-count">{form.about.length}/{LIMITS.about}</span>
              </span>
              <textarea
                className={`dt-input dt-textarea${bad('about') ? ' is-error' : ''}`}
                value={form.about}
                onChange={set('about')}
                maxLength={LIMITS.about}
                rows={5}
                placeholder={ABOUT_HINT}
              />
            </label>
            <label className="dt-field">
              <span className="dt-label">Контакт для связи</span>
              <input
                className={`dt-input${bad('contact') ? ' is-error' : ''}`}
                value={form.contact}
                onChange={set('contact')}
                maxLength={LIMITS.contact}
                placeholder="Вставь ссылку, например https://t.me/username"
                inputMode="url"
              />
            </label>
          </div>
        </div>

        <div className="dt-form-foot">
          <div className="dt-error" role="alert">{error}</div>
          <div className="dt-form-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>Отмена</button>
            <button type="submit" className="btn-primary dt-submit" disabled={saving || uploading}>
              {saving ? 'Сохраняем…' : publish ? 'Опубликовать' : 'Сохранить'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

function ConfirmShow({ me, onClose, onEdit, onPublish, busy, error }) {
  return (
    <Modal title="Данные в анкете актуальны?" onClose={onClose}>
      <div className="dt-confirm">
        <p className="dt-confirm-text">Так твою анкету увидят все пользователи платформы. Если что-то поменялось — отредактируй её перед публикацией.</p>
        <div className="dt-confirm-card"><DatingCard p={me} /></div>
        <div className="dt-error" role="alert">{error}</div>
        <div className="dt-form-actions">
          <button type="button" className="btn-ghost" onClick={onEdit}>Редактировать</button>
          <button type="button" className="btn-primary dt-submit" onClick={onPublish} disabled={busy}>
            {busy ? 'Публикуем…' : 'Да, опубликовать'}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default function DatingPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [modal, setModal] = useState(null) // 'confirm' | 'publish' | 'edit'
  const [busy, setBusy] = useState(false)
  const [actionError, setActionError] = useState('')

  const load = () => api.dating().then(setData).catch(e => setError(e.message || 'Не удалось загрузить анкеты'))
  useEffect(() => { load() }, [])

  const me = data?.me
  const close = () => { setModal(null); setActionError('') }

  const onShow = () => {
    setActionError('')
    setModal(isComplete(me) ? 'confirm' : 'publish')
  }

  const setVisible = async visible => {
    setBusy(true)
    setActionError('')
    try {
      await api.setDatingVisible(visible)
      await load()
      setModal(null)
    } catch (e) {
      setActionError(e.message || 'Не получилось')
    } finally {
      setBusy(false)
    }
  }

  // Фото сохраняется сразу при загрузке, поля — по кнопке
  const onSaved = async (p, done) => {
    setData(d => ({ ...d, me: { ...d.me, ...p } }))
    if (done) { setModal(null); await load() }
  }

  const others = (data?.profiles || []).filter(p => p.userId !== me?.userId)

  return (
    <section className="page active dt-page">
      <div className="dt-hero">
        <div className="dt-hero-text">
          <span className="dt-tag">Сообщество KIRO</span>
          <h1 className="dt-title">Знакомства</h1>
          <p className="dt-lead">Найди напарника на хакатон, друзей по учёбе, ментора или единомышленников. Опубликуй анкету — и тебе смогут написать.</p>
        </div>
        {me && (
          <div className="dt-hero-actions">
            <div className={`dt-status${me.visible ? ' is-on' : ''}`}>
              <span className="dt-status-dot" aria-hidden="true" />
              {me.visible ? 'Твоя анкета видна всем' : isComplete(me) ? 'Твоя анкета скрыта' : 'Анкета ещё не заполнена'}
            </div>
            <div className="dt-hero-buttons">
              {me.visible
                ? <button type="button" className="dt-btn-hide" onClick={() => setVisible(false)} disabled={busy}>{busy ? 'Скрываем…' : 'Скрыть мой профиль'}</button>
                : <button type="button" className="btn-primary" onClick={onShow}>Показать мой профиль</button>}
              {isComplete(me) && <button type="button" className="btn-ghost" onClick={() => setModal('edit')}>Редактировать анкету</button>}
            </div>
            {!modal && actionError && <div className="dt-error" role="alert">{actionError}</div>}
          </div>
        )}
      </div>

      {error && <div className="dt-empty">{error}</div>}
      {!data && !error && <p className="dt-loading">Загружаем анкеты…</p>}

      {data && (
        <>
          <div className="dt-section-head">
            <h2>Анкеты</h2>
            <span>{data.profiles.length}</span>
          </div>
          {data.profiles.length === 0
            ? (
              <div className="dt-empty">
                <div className="dt-empty-icon" aria-hidden="true">👋</div>
                Пока никто не опубликовал анкету. Будь первым!
              </div>
            )
            : (
              <div className="dt-grid">
                {me?.visible && <DatingCard p={me} mine />}
                {others.map(p => <DatingCard key={p.userId} p={p} />)}
              </div>
            )}
        </>
      )}

      {modal === 'confirm' && (
        <ConfirmShow
          me={me}
          onClose={close}
          onEdit={() => setModal('publish')}
          onPublish={() => setVisible(true)}
          busy={busy}
          error={actionError}
        />
      )}
      {(modal === 'publish' || modal === 'edit') && (
        <Editor
          me={me}
          defaultName={data?.defaultName}
          publish={modal === 'publish'}
          onClose={close}
          onSaved={onSaved}
        />
      )}
    </section>
  )
}
