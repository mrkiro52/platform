import { TheoryExample } from './components/TheoryTable'

export default function Day29ResumeTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 29</h1>
        <p className="theory-subtitle">Резюме IT-джуна: пишем первую версию</p>
        <p className="theory-date">29 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Структура резюме</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li><strong>Контакты:</strong> Имя, email, телефон, GitHub, LinkedIn</li>
          <li><strong>Профессиональное резюме (summary):</strong> 2-3 предложения кто ты</li>
          <li><strong>Навыки:</strong> Язык программирования, фреймворки, инструменты</li>
          <li><strong>Опыт:</strong> Стажировки, проекты, волонтёрство</li>
          <li><strong>Образование:</strong> Курсы, сертификаты, лагеря</li>
          <li><strong>Проекты:</strong> GitHub ссылки на твои лучшие работы</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Советы для джуна</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Будь честен (не приукрашивай опыт)</li>
          <li className="theory-list-item">✅ Покажи что ты можешь (GitHub, проекты)</li>
          <li className="theory-list-item">✅ Сфокусируйся на качестве (5 хороших проектов &gt; 20 так себе)</li>
          <li className="theory-list-item">✅ Напиши о том что ты выучил</li>
          <li className="theory-list-item">❌ Не претендуй на senior роль</li>
          <li className="theory-list-item">❌ Не списывай чужое резюме</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как описывать проекты</h2>

        <TheoryExample title="❌ Плохо">
          <p>«Написал сайт на React»</p>
        </TheoryExample>

        <TheoryExample title="✅ Хорошо">
          <p>«Разработал образовательную платформу на React + Node.js для управления расписанием лагеря. Реализовал аутентификацию через JWT, интеграцию с API для расписания, динамическое кэширование данных. Развернул на VPS с Nginx. GitHub: [ссылка]»</p>
        </TheoryExample>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">GitHub как портфолио</h2>
        <ul className="theory-list">
          <li className="theory-list-item"><strong>README для каждого проекта:</strong> Что это, как запустить, примеры</li>
          <li className="theory-list-item"><strong>Хороший коммит история:</strong> Осмысленные сообщения</li>
          <li className="theory-list-item"><strong>Чистый код:</strong> Без мусора, хорошо организован</li>
          <li className="theory-list-item"><strong>Стабильные проекты:</strong> Которые хорошо работают</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Сопроводительное письмо</h2>
        <p className="theory-intro">Не обязательно для джуна, но помогает!</p>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>Привет, я изучаю [технология]</li>
          <li>Сделал [проект], это показывает [скиллы]</li>
          <li>Интересуюсь вашей компанией потому что [причина]</li>
          <li>Хотел бы присоединиться к команде и учиться!</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Поиск первой работы</h2>
        <ul className="theory-list">
          <li className="theory-list-item">🔍 LinkedIn Jobs, Indeed, HeadHunter</li>
          <li className="theory-list-item">🔍 Job boards: dev.by (Беларусь), habr.career (Россия)</li>
          <li className="theory-list-item">🔍 Компании напрямую (их сайты)</li>
          <li className="theory-list-item">🤝 Сетвуринг: встречайся с разработчиками</li>
          <li className="theory-list-item">💌 Отправляй резюме в компании которые тебе нравятся</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Во время интервью</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Приходи вовремя (за 5 минут)</li>
          <li className="theory-list-item">✅ Задавай вопросы о команде и проектах</li>
          <li className="theory-list-item">✅ Будь честен что не знаешь</li>
          <li className="theory-list-item">✅ Покажи как думаешь при решении задач</li>
          <li className="theory-list-item">❌ Не будь самоуверен</li>
          <li className="theory-list-item">❌ Не говори что тебе всё равно</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Первая работа — начало карьеры! Верь в себя! 💪</p>
      </section>
    </div>
  )
}
