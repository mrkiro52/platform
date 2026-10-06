import MultiPartVideo, { JULY24_INSIDER_SHOW_3_PARTS } from '../components/MultiPartVideo'

export default function July24InsiderShow3Theory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">Insider Show #3</h1>
        <p>
          Запись разговора Insider Show #3 с Марком о работе в IT изнутри. Видео разбито на 5 частей —
          переключайся между ними кнопками под плеером.
        </p>
      </section>

      <section className="theory-section">
        <MultiPartVideo parts={JULY24_INSIDER_SHOW_3_PARTS} />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как смотреть с пользой</h2>
        <p>
          Смотри запись с конкретными вопросами — так из разговора получится больше практической пользы:
        </p>
        <ul className="theory-list">
          <li className="theory-list-item">Как гость пришёл в профессию и что помогло ему расти быстрее?</li>
          <li className="theory-list-item">Как выглядит обычный рабочий день и какие задачи занимают больше всего времени?</li>
          <li className="theory-list-item">Что гость советует тем, кто только ищет первую работу?</li>
          <li className="theory-list-item">Какие навыки, по его мнению, будут востребованы в ближайшие годы?</li>
        </ul>
        <p>
          После просмотра запиши 3–5 идей и выбери одну, которую применишь уже на этой неделе.
        </p>
      </section>
    </div>
  )
}
