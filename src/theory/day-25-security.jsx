import { TheoryCode } from './components/TheoryTable'

export default function Day25SecurityTheory() {
  return (
    <div className="theory-container">
      <section className="theory-section">
        <h1 className="theory-title">День 24</h1>
        <p className="theory-subtitle">Кибербезопасность для разработчика</p>
        <p className="theory-date">24 июня 2026</p>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">OWASP Top 10</h2>
        <ol style={{ paddingLeft: '20px', color: 'var(--text-secondary)', fontSize: '13px' }}>
          <li>SQL-инъекции</li>
          <li>Broken Authentication</li>
          <li>Sensitive Data Exposure</li>
          <li>XXE (XML External Entity)</li>
          <li>Broken Access Control</li>
          <li>Security Misconfiguration</li>
          <li>XSS (Cross-Site Scripting)</li>
          <li>Insecure Deserialization</li>
          <li>Using Components with Known Vulnerabilities</li>
          <li>Insufficient Logging & Monitoring</li>
        </ol>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">SQL-инъекции</h2>
        <TheoryCode code={`# ❌ Плохо
username = request.form.get("username")
query = f"SELECT * FROM users WHERE name = '{username}'"

# Если user вводит: ' OR '1'='1
# Запрос: SELECT * FROM users WHERE name = '' OR '1'='1'
# Это вернёт всех пользователей!

# ✅ Хорошо
cursor.execute("SELECT * FROM users WHERE name = ?", (username,))`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">XSS (Cross-Site Scripting)</h2>
        <TheoryCode code={`# ❌ Плохо (в JavaScript/React)
<div>{user_input}</div>

# ❌ Плохо (HTML)
<div>{{ user_input }}</div>

# ✅ Хорошо (React автоматом экранирует)
<div>{user_input}</div>  // React экранирует

# ✅ Хорошо (sanitize вручную)
import DOMPurify from 'dompurify'
<div>{DOMPurify.sanitize(user_input)}</div>`} language="jsx" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Хеширование паролей</h2>
        <TheoryCode code={`# ❌ Плохо
password_hash = hashlib.md5(password).hexdigest()

# ✅ Хорошо
import bcrypt
salt = bcrypt.gensalt()
password_hash = bcrypt.hashpw(password.encode(), salt)`} language="python" />
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">HTTPS и TLS</h2>
        <ul className="theory-list">
          <li className="theory-list-item">ВСЕГДА используй HTTPS (не HTTP)</li>
          <li className="theory-list-item">Шифрует данные между браузером и сервером</li>
          <li className="theory-list-item">TLS 1.2+ обязателен</li>
        </ul>
      </section>

      <section className="theory-section">
        <h2 className="theory-heading-2">Правила безопасности</h2>
        <ul className="theory-list">
          <li className="theory-list-item">✅ Валидируй весь пользовательский ввод</li>
          <li className="theory-list-item">✅ Используй параметризованные запросы</li>
          <li className="theory-list-item">✅ Экранируй output</li>
          <li className="theory-list-item">✅ Не логируй пароли</li>
          <li className="theory-list-item">❌ Не храни секреты в коде</li>
          <li className="theory-list-item">❌ Не доверяй клиентским проверкам</li>
        </ul>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Security — ответственность разработчика! 🔒</p>
      </section>
    </div>
  )
}
