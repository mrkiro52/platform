export default function Day1IntroTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">KIRO IT SUMMER CAMP 2026</h1>
        <p className="theory-subtitle">Вводное занятие: старт лагеря</p>
        <p className="theory-date">1 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Расписание занятий</h2>
        <div className="theory-card">
          <div className="theory-card-item">
            <span className="theory-label">Время проведения:</span>
            <p className="theory-text">ежедневно примерно в 21:00 (9 вечера)</p>
          </div>
          <div className="theory-card-item">
            <span className="theory-label">Продолжительность:</span>
            <p className="theory-text">примерно 1-1,5 часа</p>
          </div>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Индивидуальный подход к обучению</h2>
        <p className="theory-intro">Интенсивность обучения регулируется по ходу лагеря в зависимости от ваших возможностей:</p>
        <ul className="theory-list">
          <li className="theory-list-item">Объем домашнего задания подбирается индивидуально</li>
          <li className="theory-list-item">Сколько времени в день вы можете уделять обучению — столько же мы будем давать вам в домашних заданиях</li>
          <li className="theory-list-item">Если вы отстаете, вы можете только прослушать материал и попросить минимизировать или не давать домашнее задание</li>
          <li className="theory-list-item">Все решения принимаются индивидуально с учетом ваших потребностей</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Выбор направления обучения</h2>
        <p className="theory-intro">В конце июня вы сможете выбрать специальность, на которой хотите сосредоточиться в июле-августе:</p>
        <ul className="theory-list">
          <li className="theory-list-item">Если вы не можете выбрать направление — это совершенно нормально</li>
          <li className="theory-list-item">Вы можете изучать все направления подряд</li>
          <li className="theory-list-item">Кроме специализированных тем будут общие лекции</li>
          <li className="theory-list-item">Вы сможете посещать лекции разных направлений по своему выбору</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Где найти материалы и домашние задания</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Записи занятий доступны на платформе лагеря</li>
          <li className="theory-list-item">Домашние задания можно найти на платформе лагеря</li>
          <li className="theory-list-item">Расписание занятий и ссылки на созвоны также находятся на платформе лагеря</li>
          <li className="theory-list-item">Все важную информацию мы дублируем в беседе лагеря в Telegram</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Домашнее задание после первого занятия</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">1. Завести дневник лагеря</h3>
          <p className="theory-intro">Вы можете выбрать любой удобный для вас формат:</p>
          <ul className="theory-list">
            <li className="theory-list-item">На бумаге в тетради</li>
            <li className="theory-list-item">В Google Таблице</li>
            <li className="theory-list-item">В Notion</li>
            <li className="theory-list-item">В любом другом удобном вам формате</li>
          </ul>
          <p className="theory-intro theory-mt">В дневнике вы сможете:</p>
          <ul className="theory-list">
            <li className="theory-list-item">Дублировать ссылки на материалы дня</li>
            <li className="theory-list-item">Добавлять ссылки на домашние задания</li>
            <li className="theory-list-item">Сохранять решения домашних заданий</li>
            <li className="theory-list-item">Писать свои мысли и заметки</li>
          </ul>
          <p className="theory-highlight">Дневник станет вашим личным хранилищем и конспектом на время обучения в лагере и после</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">2. Скачать Visual Studio Code</h3>
          <p className="theory-text">Это текстовый редактор для написания кода, который мы будем использовать на занятиях.</p>
          <p className="theory-text">Если у вас возникнут проблемы со скачиванием или установкой, обратитесь в беседе группы в Telegram — мы поможем!</p>
        </div>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Добро пожаловать в KIRO IT SUMMER CAMP 2026! 🚀</p>
      </section>
    </div>
  )
}
