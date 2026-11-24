import '../winter.css'
import '../pages/entrance.css'

export default function EntranceFrame({ busy = false, children }) {
  return (
    <section className="page active wc-page is-winter entrance" aria-busy={busy || undefined}>
      <header className="wc-top">
        <div className="wc-top-text">
          <span className="wc-kicker">Winter Camp · Входное тестирование</span>
          <h1 className="wc-top-title">Тестирование знаний</h1>
        </div>
      </header>
      {children}
    </section>
  )
}

export function EntranceLoading() {
  return (
    <EntranceFrame busy>
      <section className="wc-card entrance-card entrance-loading">
        <p className="wc-muted" role="status"><span className="py-spinner" aria-hidden="true" />Загружаем тестирование…</p>
        <div aria-hidden="true">
          <div className="skeleton skeleton-title" />
          <div className="skeleton skeleton-text" />
          <div className="skeleton skeleton-text" />
        </div>
      </section>
    </EntranceFrame>
  )
}
