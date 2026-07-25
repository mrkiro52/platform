import MultiPartVideo, { JULY24_INSIDER_SHOW_3_PARTS } from '../components/MultiPartVideo'

export default function July24InsiderShow3Theory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Insider Show 3</h1>
        <p className="theory-subtitle">Все треки</p>
        <p className="theory-date">24 июля 2026</p>
        <p>
          Запись встречи Insider Show 3 с Марком — разбита на 5 частей. Переключайтесь между частями кнопками под
          плеером.
        </p>
      </section>

      <section className="theory-section">
        <MultiPartVideo parts={JULY24_INSIDER_SHOW_3_PARTS} />
      </section>
    </div>
  )
}
