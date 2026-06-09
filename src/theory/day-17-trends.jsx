import { TheoryExample } from './components/TheoryTable'

export default function Day17TrendsTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 17</h1>
        <p className="theory-subtitle">IT-тренды и влияние ИИ на профессии</p>
        <p className="theory-date">17 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Топ-тренды 2026</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🤖 Generative AI</h3>
          <p className="theory-intro">ИИ генерирует текст, код, изображения. Меняет разработку кардинально.</p>
          <ul className="theory-list">
            <li className="theory-list-item">AI-ассистенты (Copilot, Claude) в IDE</li>
            <li className="theory-list-item">Автоматизация рутинных задач</li>
            <li className="theory-list-item">Новые профессии (prompt engineers, AI researchers)</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">☁️ Cloud Native & Kubernetes</h3>
          <p className="theory-intro">Всё переходит в облако. Kubernetes уже стандарт.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🔐 Кибербезопасность</h3>
          <p className="theory-intro">С ростом данных — растёт спрос на security специалистов.</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">⚡ Edge Computing</h3>
          <p className="theory-intro">Обработка данных близко к источнику (IoT, 5G).</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">🌐 Web3 / Blockchain</h3>
          <p className="theory-intro">Децентрализованные приложения. Спорный тренд, но есть спрос.</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как ИИ меняет разработку</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">❌ Что автоматизируется</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Простой boilerplate код</li>
            <li className="theory-list-item">Документация и комментарии</li>
            <li className="theory-list-item">Тесты</li>
            <li className="theory-list-item">Code review (частично)</li>
          </ul>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">✅ Что остаётся людям</h3>
          <ul className="theory-list">
            <li className="theory-list-item">Архитектура и дизайн системы</li>
            <li className="theory-list-item">Критическое мышление</li>
            <li className="theory-list-item">Коммуникация с командой</li>
            <li className="theory-list-item">Понимание бизнес-требований</li>
          </ul>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Перспективы по направлениям</h2>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Frontend</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐ (всегда нужны UI разработчики)</p>
          <p className="theory-text">Изменения: AI для дизайна и вёрстки, но качество — люди</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">Backend</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (расти с облаком)</p>
          <p className="theory-text">Изменения: Serverless, микросервисы, AI-интеграция</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">ML/AI</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (явно растёт)</p>
          <p className="theory-text">Изменения: LLM становятся проще, растёт спрос на инженеров</p>
        </div>

        <div className="theory-subsection">
          <h3 className="theory-heading-3">DevOps</h3>
          <p className="theory-intro">Спрос: ⭐⭐⭐⭐⭐ (облако требует expertise)</p>
          <p className="theory-text">Изменения: Platform Engineering, eBPF, zero-trust security</p>
        </div>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Как не отстать</h2>
        <ul className="theory-list">
          <li className="theory-list-item">Учись основам (алгоритмы, архитектура) — они не меняются</li>
          <li className="theory-list-item">Следи за трендами (HackerNews, Reddit r/programming)</li>
          <li className="theory-list-item">Экспериментируй с новыми технологиями</li>
          <li className="theory-list-item">Сфокусируйся на soft skills (communication, problem-solving)</li>
          <li className="theory-list-item">Используй ИИ как инструмент, а не замену себе</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Будущее IT — за теми, кто постоянно учится! 📈</p>
      </section>
    </div>
  )
}
