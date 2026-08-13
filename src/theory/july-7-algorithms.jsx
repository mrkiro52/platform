import MultiPartVideo, { JULY7_ALGORITHMS_PARTS } from '../components/MultiPartVideo'

export default function July7AlgorithmsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Вспоминаем структуры данных и алгоритмы</h1>
        <p className="theory-subtitle">Все треки</p>
        <p className="theory-date">7 июля 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2 theory-heading-2--centered">Видео-лекция</h2>
        <MultiPartVideo parts={JULY7_ALGORITHMS_PARTS} />
      </section>
    </div>
  )
}
