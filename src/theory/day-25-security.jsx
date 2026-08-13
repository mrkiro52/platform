import { useState } from 'react'
import { TheoryTable } from './components/TheoryTable'

/* ── мини-UI ── */
const Box = ({ children, color = 'var(--border-color)', bg = 'var(--bg-secondary)', style = {} }) => (
  <div style={{
    border: `1.5px solid ${color}`, borderRadius: 10, padding: '10px 14px',
    background: bg, fontSize: 13, color: 'var(--text-secondary)', ...style,
  }}>{children}</div>
)

const Arrow = ({ label = '', vertical = false }) => (
  <div style={{
    display: 'flex', flexDirection: vertical ? 'column' : 'row',
    alignItems: 'center', justifyContent: 'center',
    gap: 2, color: 'var(--text-tertiary)', fontSize: 11, minWidth: vertical ? 0 : 40,
  }}>
    {label && <span>{label}</span>}
    <span style={{ fontSize: 18, lineHeight: 1 }}>{vertical ? '↓' : '→'}</span>
  </div>
)

const Row = ({ children, gap = 10, wrap = false, center = true }) => (
  <div style={{
    display: 'flex', alignItems: center ? 'center' : 'flex-start',
    gap, flexWrap: wrap ? 'wrap' : 'nowrap', justifyContent: 'center',
  }}>{children}</div>
)

const Tag = ({ children, color = '#3fb950' }) => (
  <span style={{
    display: 'inline-block', padding: '2px 8px', borderRadius: 5,
    background: color + '20', color, fontSize: 11, fontWeight: 700,
    border: `1px solid ${color}40`, marginRight: 4,
  }}>{children}</span>
)

const Good = ({ children }) => (
  <div style={{
    background: 'rgba(63,185,80,0.07)', borderLeft: '3px solid #3fb950',
    borderRadius: '0 8px 8px 0', padding: '9px 14px', margin: '8px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}><strong style={{ color: '#3fb950' }}>✅ </strong>{children}</div>
)

const Bad = ({ children }) => (
  <div style={{
    background: 'rgba(248,81,73,0.07)', borderLeft: '3px solid #f85149',
    borderRadius: '0 8px 8px 0', padding: '9px 14px', margin: '8px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}><strong style={{ color: '#f85149' }}>❌ </strong>{children}</div>
)

const Warn = ({ children }) => (
  <div style={{
    background: 'rgba(210,153,34,0.08)', borderLeft: '3px solid #d29922',
    borderRadius: '0 8px 8px 0', padding: '9px 14px', margin: '8px 0',
    fontSize: 13, color: 'var(--text-secondary)',
  }}><strong style={{ color: '#d29922' }}>⚠️ </strong>{children}</div>
)

const Viz = ({ children }) => (
  <div style={{
    background: 'var(--bg-secondary)', border: '1px solid var(--border-color)',
    borderRadius: 12, padding: '18px 20px', margin: '18px 0',
    overflowX: 'auto',
  }}>{children}</div>
)

const Label = ({ children, style = {} }) => (
  <div style={{ fontSize: 11, color: 'var(--text-tertiary)', textAlign: 'center', marginTop: 4, ...style }}>{children}</div>
)

/* ══════════════════════════════════════════════
   ИЛЛЮСТРАЦИИ
══════════════════════════════════════════════ */

/* 3. SQL Injection */
function SqlInjectionViz() {
  const [mode, setMode] = useState('normal')
  const btnStyle = (active) => ({
    padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
    borderRadius: 7, border: '1px solid',
    borderColor: active ? 'var(--accent-lime)' : 'var(--border-color)',
    background: active ? 'rgba(32,190,255,0.12)' : 'var(--bg-tertiary)',
    color: active ? 'var(--accent-lime)' : 'var(--text-secondary)',
  })
  const normal = {
    input: 'alice',
    query: "SELECT * FROM users WHERE name = 'alice'",
    result: '✅ Возвращает данные Алисы',
    resultColor: '#3fb950',
  }
  const attack = {
    input: "' OR '1'='1",
    query: "SELECT * FROM users WHERE name = '' OR '1'='1'",
    result: '💀 Возвращает ВСЕХ пользователей',
    resultColor: '#f85149',
  }
  const cur = mode === 'normal' ? normal : attack
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 8, marginBottom: 14, justifyContent: 'center' }}>
        <button style={btnStyle(mode === 'normal')} onClick={() => setMode('normal')}>Обычный ввод</button>
        <button style={btnStyle(mode === 'attack')} onClick={() => setMode('attack')}>Атака</button>
      </div>
      <Row gap={8} wrap>
        <div style={{ minWidth: 140 }}>
          <Box color={mode === 'attack' ? '#f85149' : 'var(--border-color)'}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>Пользователь вводит:</div>
            <code style={{ color: mode === 'attack' ? '#f85149' : 'var(--accent-lime)', fontSize: 13 }}>{cur.input}</code>
          </Box>
          <Label>Поле «Имя пользователя»</Label>
        </div>
        <Arrow label="вставляется в" />
        <div style={{ flex: 1, minWidth: 240 }}>
          <Box color={mode === 'attack' ? '#f85149' : 'var(--border-color)'}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>SQL-запрос на сервере:</div>
            <code style={{ fontSize: 12, color: mode === 'attack' ? '#f85149' : 'var(--text-primary)', wordBreak: 'break-all' }}>
              {cur.query}
            </code>
          </Box>
          <Label>Выполняется в базе данных</Label>
        </div>
        <Arrow />
        <div style={{ minWidth: 140 }}>
          <Box color={cur.resultColor} bg={cur.resultColor + '10'}>
            <span style={{ color: cur.resultColor, fontSize: 13, fontWeight: 700 }}>{cur.result}</span>
          </Box>
        </div>
      </Row>
      {mode === 'attack' && (
        <div style={{ marginTop: 12, fontSize: 12, color: '#f85149', textAlign: 'center' }}>
          Условие <code style={{ background: 'rgba(248,81,73,0.15)', padding: '1px 5px', borderRadius: 3 }}>'1'='1'</code> всегда истинно → WHERE игнорируется → все строки таблицы открыты
        </div>
      )}
    </Viz>
  )
}

/* 4. XSS */
function XSSViz() {
  const [step, setStep] = useState(0)
  const steps = [
    {
      label: '1. Атакующий пишет «комментарий»',
      content: (
        <Row gap={10} wrap>
          <Box color='#f85149' style={{ minWidth: 160 }}>
            <div style={{ fontSize: 11, color: '#f85149', marginBottom: 4 }}>Комментарий:</div>
            <code style={{ color: '#f85149', fontSize: 12 }}>{'<script>стащить cookie</script>'}</code>
          </Box>
          <Arrow label="сохраняется в" />
          <Box style={{ minWidth: 120 }}><span>🗄 База данных</span></Box>
        </Row>
      ),
    },
    {
      label: '2. Жертва открывает страницу',
      content: (
        <Row gap={10} wrap>
          <Box style={{ minWidth: 120 }}>🗄 База данных</Box>
          <Arrow label="отдаёт HTML" />
          <Box color='#f85149' style={{ minWidth: 220 }}>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 4 }}>HTML браузера жертвы:</div>
            <code style={{ color: '#f85149', fontSize: 12 }}>
              {'<div>'}{'<script>стащить cookie</script>'}{'</div>'}
            </code>
          </Box>
        </Row>
      ),
    },
    {
      label: '3. Скрипт выполняется — cookie украден',
      content: (
        <Row gap={10} wrap>
          <Box style={{ minWidth: 120 }}>🖥 Браузер жертвы</Box>
          <Arrow label="выполняет скрипт" />
          <Box color='#f85149' bg='rgba(248,81,73,0.07)' style={{ minWidth: 160 }}>
            <div style={{ color: '#f85149', fontWeight: 700 }}>💀 Атакующий получает:</div>
            <code style={{ color: '#f85149', fontSize: 12 }}>session_id=abc123...</code>
          </Box>
          <Arrow label="отправляет на" />
          <Box style={{ minWidth: 120 }}>🌍 evil.com</Box>
        </Row>
      ),
    },
    {
      label: '✅ Защита: экранирование',
      content: (
        <Row gap={10} wrap>
          <Box style={{ minWidth: 160 }}>
            <code style={{ fontSize: 12 }}>{'<script>...</script>'}</code>
          </Box>
          <Arrow label="экранируется в" />
          <Box color='#3fb950' bg='rgba(63,185,80,0.07)' style={{ minWidth: 200 }}>
            <code style={{ color: '#3fb950', fontSize: 12 }}>
              {'&lt;script&gt;...&lt;/script&gt;'}
            </code>
            <div style={{ fontSize: 11, color: '#3fb950', marginTop: 4 }}>Отображается как текст, не выполняется</div>
          </Box>
        </Row>
      ),
    },
  ]
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
        {steps.map((s, i) => (
          <button key={i} onClick={() => setStep(i)} style={{
            padding: '4px 10px', fontSize: 11, cursor: 'pointer', borderRadius: 6,
            border: '1px solid', fontWeight: 600,
            borderColor: step === i ? (i === 3 ? '#3fb950' : '#f85149') : 'var(--border-color)',
            background: step === i ? (i === 3 ? 'rgba(63,185,80,0.12)' : 'rgba(248,81,73,0.12)') : 'var(--bg-tertiary)',
            color: step === i ? (i === 3 ? '#3fb950' : '#f85149') : 'var(--text-tertiary)',
          }}>{i + 1}</button>
        ))}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
        {steps[step].label}
      </div>
      {steps[step].content}
    </Viz>
  )
}

/* 5. CSRF */
function CSRFViz() {
  const [step, setStep] = useState(0)
  const steps = [
    { label: 'Пользователь залогинен в банке', node: 0 },
    { label: 'Открывает evil.ru в другой вкладке', node: 1 },
    { label: 'Страница тихо отправляет POST на bank.ru', node: 2 },
    { label: 'Браузер автоматически добавляет cookies банка', node: 3 },
    { label: 'Банк думает, что запрос от пользователя', node: 4 },
  ]
  return (
    <Viz>
      <Row gap={12} wrap>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <Box color={step >= 0 ? '#58a6ff' : 'var(--border-color)'} style={{ minWidth: 110, textAlign: 'center' }}>
            <div>👤 Пользователь</div>
            {step >= 0 && <div style={{ fontSize: 10, color: '#58a6ff', marginTop: 2 }}>залогинен в банке</div>}
          </Box>
          {step >= 1 && (
            <>
              <Arrow vertical label="открывает" />
              <Box color='#f85149' style={{ minWidth: 110, textAlign: 'center' }}>
                <div>😈 evil.ru</div>
                {step >= 2 && <div style={{ fontSize: 10, color: '#f85149', marginTop: 2 }}>скрытая форма</div>}
              </Box>
            </>
          )}
        </div>
        {step >= 2 && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Arrow label={step >= 3 ? 'POST + 🍪 cookie' : 'POST'} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <Box color={step >= 4 ? '#f85149' : '#d29922'} style={{ minWidth: 130, textAlign: 'center' }}>
                <div>🏦 bank.ru</div>
                {step >= 4 && <div style={{ fontSize: 10, color: '#f85149', marginTop: 2 }}>выполняет перевод!</div>}
                {step === 3 && <div style={{ fontSize: 10, color: '#d29922', marginTop: 2 }}>видит валидные cookies</div>}
              </Box>
            </div>
          </>
        )}
      </Row>
      <div style={{ marginTop: 14, fontSize: 12, color: 'var(--text-secondary)', textAlign: 'center', fontWeight: 600 }}>
        {steps[Math.min(step, steps.length - 1)].label}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 10, justifyContent: 'center' }}>
        <button onClick={() => setStep(0)} style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>↩</button>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>‹</button>
        <button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))} style={{ padding: '4px 10px', fontSize: 11, cursor: 'pointer', borderRadius: 6, border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>›</button>
        <span style={{ fontSize: 11, color: 'var(--text-tertiary)', lineHeight: '28px' }}>{step + 1}/{steps.length}</span>
      </div>
    </Viz>
  )
}

/* 6. JWT */
function JWTViz() {
  const parts = [
    { label: 'Header', value: 'eyJhbGciOiJIUzI1NiJ9', decoded: '{"alg":"HS256","typ":"JWT"}', color: '#f85149', desc: 'Алгоритм подписи' },
    { label: 'Payload', value: 'eyJzdWIiOjQyLCJleHAiOjE3MDAwMDB9', decoded: '{"sub":42,"exp":1700000,"role":"user"}', color: '#d29922', desc: 'Данные пользователя (НЕ зашифрованы!)' },
    { label: 'Signature', value: 'SflKxwRJSMeKKF2QT4fwpMeJf36P', decoded: 'HMAC(header+payload, SECRET_KEY)', color: '#3fb950', desc: 'Подпись — доказывает что токен не подделан' },
  ]
  const [active, setActive] = useState(null)
  return (
    <Viz>
      <div style={{ textAlign: 'center', marginBottom: 12, fontSize: 12, color: 'var(--text-tertiary)' }}>
        Нажми на часть токена, чтобы увидеть что внутри
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0, marginBottom: 14 }}>
        {parts.map((p, i) => (
          <span key={i}>
            <span
              onClick={() => setActive(active === i ? null : i)}
              style={{
                cursor: 'pointer', fontFamily: 'monospace', fontSize: 11,
                color: p.color, borderBottom: `2px solid ${p.color}`,
                padding: '3px 2px', transition: '.15s',
                background: active === i ? p.color + '18' : 'transparent',
                borderRadius: 3,
              }}
            >{p.value}</span>
            {i < 2 && <span style={{ color: 'var(--text-tertiary)', fontWeight: 700 }}>.</span>}
          </span>
        ))}
      </div>
      {active !== null && (
        <Box color={parts[active].color} bg={parts[active].color + '08'} style={{ marginTop: 4 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Tag color={parts[active].color}>{parts[active].label}</Tag>
            <div>
              <code style={{ fontSize: 12, color: parts[active].color }}>{parts[active].decoded}</code>
              <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginTop: 4 }}>{parts[active].desc}</div>
            </div>
          </div>
        </Box>
      )}
      <Warn>Payload JWT читается без ключа — это base64, не шифрование. Никогда не клади в него пароли, секреты или конфиденциальные данные.</Warn>
    </Viz>
  )
}

/* 7. Password hashing */
function PasswordHashViz() {
  const algos = [
    { name: 'Открытый текст', result: 'qwerty123', speed: 100, safe: false, note: 'Любой с доступом к БД видит пароль' },
    { name: 'MD5', result: 'd8578edf8458ce06fbc5bb76a58c5ca4', speed: 95, safe: false, note: '10 млрд вариантов/сек на GPU, радужные таблицы' },
    { name: 'SHA-256', result: '65e84be33532fb784c48129675f9eff3...', speed: 90, safe: false, note: 'Тоже быстрый — не для паролей' },
    { name: 'bcrypt (cost=12)', result: '$2b$12$X4tZ...aBcDeFgH', speed: 8, safe: true, note: '~250ms на хеш — перебор занимает годы' },
    { name: 'Argon2id', result: '$argon2id$v=19$m=65536...', speed: 3, safe: true, note: 'Лучший выбор — memory-hard, сложен для GPU' },
  ]
  return (
    <Viz>
      <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 10, textAlign: 'center' }}>
        Пароль: <code style={{ color: 'var(--accent-lime)' }}>qwerty123</code> — скорость подбора атакующим (меньше = лучше)
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {algos.map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ minWidth: 160, fontSize: 12, color: a.safe ? '#3fb950' : '#f85149', fontWeight: 600 }}>
              {a.safe ? '✅' : '❌'} {a.name}
            </div>
            <div style={{ flex: 1, background: 'var(--bg-primary)', borderRadius: 4, height: 14, minWidth: 100 }}>
              <div style={{
                width: `${a.speed}%`, height: '100%', borderRadius: 4,
                background: a.safe ? '#3fb950' : '#f85149',
                transition: '.5s',
              }} />
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-tertiary)', minWidth: 200 }}>{a.note}</div>
          </div>
        ))}
      </div>
    </Viz>
  )
}

/* 8. HTTPS */
function HTTPSViz() {
  const [mode, setMode] = useState('http')
  const btnStyle = (active, color) => ({
    padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
    borderRadius: 7, border: `1px solid ${active ? color : 'var(--border-color)'}`,
    background: active ? color + '18' : 'var(--bg-tertiary)',
    color: active ? color : 'var(--text-secondary)',
  })
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
        <button style={btnStyle(mode === 'http', '#f85149')} onClick={() => setMode('http')}>HTTP</button>
        <button style={btnStyle(mode === 'https', '#3fb950')} onClick={() => setMode('https')}>HTTPS</button>
      </div>
      <Row gap={8} wrap>
        <Box style={{ minWidth: 110, textAlign: 'center' }}>
          🖥 Браузер
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 4 }}>login=alice&pass=qwerty</div>
        </Box>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{
            padding: '6px 14px', borderRadius: 8, fontSize: 12, fontWeight: 700,
            background: mode === 'http' ? 'rgba(248,81,73,0.12)' : 'rgba(63,185,80,0.12)',
            border: `1px solid ${mode === 'http' ? '#f85149' : '#3fb950'}`,
            color: mode === 'http' ? '#f85149' : '#3fb950',
          }}>
            {mode === 'http' ? '📦 Открытый пакет' : '🔒 Зашифрованный пакет'}
          </div>
          {mode === 'http' ? (
            <div style={{ fontSize: 11, color: '#f85149', fontFamily: 'monospace' }}>login=alice&pass=qwerty</div>
          ) : (
            <div style={{ fontSize: 11, color: '#3fb950', fontFamily: 'monospace' }}>X3kP9#mQ...&#xa0;(нечитаемо)</div>
          )}
        </div>
        {mode === 'http' && (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: 18 }}>↕</span>
              <div style={{ fontSize: 10, color: '#f85149' }}>перехват</div>
            </div>
            <Box color='#f85149' bg='rgba(248,81,73,0.07)' style={{ minWidth: 120, textAlign: 'center' }}>
              😈 MITM
              <div style={{ fontSize: 10, color: '#f85149', marginTop: 2 }}>видит всё</div>
            </Box>
          </>
        )}
        <Arrow />
        <Box color={mode === 'https' ? '#3fb950' : 'var(--border-color)'} style={{ minWidth: 110, textAlign: 'center' }}>
          🌐 Сервер
          {mode === 'https' && <div style={{ fontSize: 10, color: '#3fb950', marginTop: 2 }}>расшифровывает</div>}
        </Box>
      </Row>
    </Viz>
  )
}

/* 10. Secrets */
function SecretsViz() {
  const [leaked, setLeaked] = useState(false)
  return (
    <Viz>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Box color={leaked ? '#f85149' : 'var(--border-color)'}>
          <div style={{ fontSize: 11, color: 'var(--text-tertiary)', marginBottom: 6 }}>📄 config.py — закоммичен в git</div>
          <code style={{ fontSize: 12 }}>
            <span style={{ color: 'var(--text-tertiary)' }}>DB_HOST = "localhost"</span><br />
            <span style={{ color: leaked ? '#f85149' : '#d29922' }}>
              DB_PASSWORD = "{leaked ? '💀 СКОМПРОМЕТИРОВАН' : 'super_secret_pass'}"
            </span><br />
            <span style={{ color: leaked ? '#f85149' : '#d29922' }}>
              OPENAI_KEY = "{leaked ? '💀 СКОМПРОМЕТИРОВАН' : 'sk-proj-abc123...'}"
            </span>
          </code>
        </Box>
        <Row gap={8}>
          <button
            onClick={() => setLeaked(true)}
            disabled={leaked}
            style={{
              padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: leaked ? 'default' : 'pointer',
              borderRadius: 7, border: `1px solid ${leaked ? 'var(--border-color)' : '#f85149'}`,
              background: leaked ? 'var(--bg-primary)' : 'rgba(248,81,73,0.12)',
              color: leaked ? 'var(--text-tertiary)' : '#f85149',
            }}
          >{leaked ? '☠ Репо стало публичным' : '☠ Сделать репо публичным'}</button>
          <button
            onClick={() => setLeaked(false)}
            style={{ padding: '6px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer', borderRadius: 7, border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
          >↩ Сброс</button>
        </Row>
        {leaked && (
          <Box color='#f85149' bg='rgba(248,81,73,0.07)'>
            <div style={{ fontWeight: 700, color: '#f85149', marginBottom: 6 }}>💀 Произошло:</div>
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              <li>Боты сканируют GitHub каждые секунды</li>
              <li>Ключ найден через 3 минуты после публикации</li>
              <li>Даже если удалить файл — он остаётся в истории git</li>
              <li>Необходимо немедленно отозвать все скомпрометированные ключи</li>
            </ul>
          </Box>
        )}
        {!leaked && (
          <Box color='#3fb950' bg='rgba(63,185,80,0.07)'>
            <div style={{ fontWeight: 700, color: '#3fb950', marginBottom: 6 }}>✅ Правильно: через .env</div>
            <code style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              # .env (в .gitignore!)<br />
              DB_PASSWORD=super_secret_pass<br />
              OPENAI_KEY=sk-proj-abc123...<br /><br />
              <span style={{ color: '#3fb950' }}># config.py — безопасно коммитить</span><br />
              DB_PASSWORD = os.getenv("DB_PASSWORD")
            </code>
          </Box>
        )}
      </div>
    </Viz>
  )
}

/* 14. Rate Limiting */
function RateLimitViz() {
  const [step, setStep] = useState(0)
  const requests = [1,2,3,4,5,6,7,8]
  const limit = 5
  return (
    <Viz>
      <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 10, textAlign: 'center' }}>
        Лимит: {limit} запросов в минуту с одного IP. Перемещай ползунок.
      </div>
      <div style={{ ...{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14, flexWrap: 'wrap' } }}>
        {requests.map((_, i) => {
          const blocked = i >= limit
          const active = i <= step
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
                background: !active ? 'var(--bg-primary)' : blocked ? 'rgba(248,81,73,0.15)' : 'rgba(63,185,80,0.15)',
                border: `1.5px solid ${!active ? 'var(--border-color)' : blocked ? '#f85149' : '#3fb950'}`,
                color: !active ? 'var(--text-tertiary)' : blocked ? '#f85149' : '#3fb950',
              }}>
                {i + 1}
              </div>
              <div style={{ fontSize: 9, color: !active ? 'var(--text-tertiary)' : blocked ? '#f85149' : '#3fb950' }}>
                {!active ? '...' : blocked ? '🚫' : '✓'}
              </div>
            </div>
          )
        })}
      </div>
      <input type="range" min={0} max={requests.length - 1} value={step}
        onChange={e => setStep(+e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      {step >= limit ? (
        <Box color='#f85149' bg='rgba(248,81,73,0.07)' style={{ textAlign: 'center' }}>
          <strong style={{ color: '#f85149' }}>429 Too Many Requests</strong>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            Запрос #{step + 1} заблокирован. Попробуй через 60 секунд.
          </div>
        </Box>
      ) : (
        <Box color='#3fb950' bg='rgba(63,185,80,0.07)' style={{ textAlign: 'center' }}>
          <strong style={{ color: '#3fb950' }}>200 OK</strong>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            Запрос #{step + 1} принят. Осталось попыток: {limit - step - 1}
          </div>
        </Box>
      )}
    </Viz>
  )
}

/* 13. ML Attack */
function MLAttackViz() {
  const [mode, setMode] = useState('clean')
  const btnStyle = (active, color) => ({
    padding: '5px 14px', fontSize: 12, fontWeight: 700, cursor: 'pointer',
    borderRadius: 7, border: `1px solid ${active ? color : 'var(--border-color)'}`,
    background: active ? color + '18' : 'var(--bg-tertiary)',
    color: active ? color : 'var(--text-secondary)',
  })
  return (
    <Viz>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 14 }}>
        <button style={btnStyle(mode === 'clean', '#3fb950')} onClick={() => setMode('clean')}>Чистое фото</button>
        <button style={btnStyle(mode === 'attack', '#f85149')} onClick={() => setMode('attack')}>+ Adversarial шум</button>
      </div>
      <Row gap={14} wrap>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 90, height: 90, borderRadius: 10, margin: '0 auto 8px',
            background: mode === 'clean' ? '#8b6914' : '#8b6914',
            border: `2px solid ${mode === 'attack' ? '#f85149' : '#3fb950'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, position: 'relative', overflow: 'hidden',
          }}>
            🐼
            {mode === 'attack' && (
              <div style={{
                position: 'absolute', inset: 0, opacity: 0.4,
                backgroundImage: 'repeating-linear-gradient(45deg, #f8514922 0, #f8514922 1px, transparent 0, transparent 50%)',
                backgroundSize: '4px 4px',
              }} />
            )}
          </div>
          <Label>{mode === 'clean' ? 'Исходное фото' : 'Фото + еле заметный шум'}</Label>
          <div style={{ fontSize: 10, color: 'var(--text-tertiary)', marginTop: 2 }}>
            {mode === 'attack' ? '(человек не замечает разницы)' : ''}
          </div>
        </div>
        <Arrow label="подаём в" />
        <Box style={{ minWidth: 100, textAlign: 'center' }}>🤖 Нейросеть</Box>
        <Arrow label="предсказывает" />
        <Box
          color={mode === 'clean' ? '#3fb950' : '#f85149'}
          bg={mode === 'clean' ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)'}
          style={{ minWidth: 130, textAlign: 'center' }}
        >
          {mode === 'clean' ? (
            <><div style={{ fontSize: 22 }}>🐼</div><div style={{ color: '#3fb950', fontWeight: 700 }}>Панда (99.3%)</div></>
          ) : (
            <><div style={{ fontSize: 22 }}>🦧</div><div style={{ color: '#f85149', fontWeight: 700 }}>Гиббон (99.9%)</div></>
          )}
        </Box>
      </Row>
    </Viz>
  )
}

/* ══════════════════════════════════════════════
   ОСНОВНОЙ КОМПОНЕНТ
══════════════════════════════════════════════ */

export default function Day25SecurityTheory() {
  return (
    <div className="theory-container">

      <section className="theory-section">
        <h1 className="theory-title">Кибербезопасность для разработчика</h1>
      </section>

      <section className="theory-section">
        <p className="theory-intro">
          Безопасность — не отдельная специальность, а навык каждого разработчика.
          SQL-инъекция, утечка токена, незащищённый датасет, атака на ML-модель — всё это дыры,
          которые можно было закрыть ещё при написании кода. Сегодня разберём главные уязвимости:
          как они работают, почему возникают и как от них защищаться.
        </p>
      </section>

      {/* 1. Модель угроз */}
      <section className="theory-section">
        <h2 className="theory-heading-2">1. Модель угроз: кто и зачем атакует</h2>
        <p>
          Прежде чем строить защиту, нужно понять от кого защищаться.
          Разные атакующие имеют разные возможности и мотивы — и против них нужны разные меры.
        </p>
        <TheoryTable
          headers={['Кто', 'Мотив', 'Что делает', 'Опасность']}
          rows={[
            ['Script kiddie', 'Интерес / слава', 'Запускает готовые сканеры и эксплойты', '⭐⭐'],
            ['Хактивист', 'Идеология', 'DDoS, дефейс сайтов, утечки данных', '⭐⭐⭐'],
            ['Киберпреступник', 'Деньги', 'Кража данных, ransomware, фишинг', '⭐⭐⭐⭐'],
            ['Инсайдер', 'Обида / деньги', 'Утечка данных, саботаж изнутри', '⭐⭐⭐⭐'],
            ['APT (государство)', 'Шпионаж / диверсия', 'Целевые атаки, zero-day уязвимости', '⭐⭐⭐⭐⭐'],
          ]}
        />
        <p>
          Фреймворк <strong>STRIDE</strong> — системный способ думать об угрозах для каждого компонента:
        </p>
        <Viz>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
            {[
              { letter: 'S', name: 'Spoofing', desc: 'Подмена личности — кто-то притворяется другим' },
              { letter: 'T', name: 'Tampering', desc: 'Изменение данных — подмена запроса или файла' },
              { letter: 'R', name: 'Repudiation', desc: 'Отказ от действий — «я этого не делал»' },
              { letter: 'I', name: 'Info Disclosure', desc: 'Утечка данных — доступ к чужому' },
              { letter: 'D', name: 'Denial of Service', desc: 'Отказ в обслуживании — сервис лежит' },
              { letter: 'E', name: 'Elevation of Privilege', desc: 'Повышение привилегий — user стал admin' },
            ].map(({ letter, name, desc }) => (
              <div key={letter} style={{
                border: '1.5px solid var(--border-color)', borderRadius: 10, padding: '10px 14px',
                minWidth: 160, flex: '1 1 160px', background: 'var(--bg-secondary)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 7, background: 'rgba(32,190,255,0.15)',
                    border: '1.5px solid var(--accent-lime)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: 14, fontWeight: 900, color: 'var(--accent-lime)',
                    flexShrink: 0,
                  }}>{letter}</span>
                  <strong style={{ fontSize: 13 }}>{name}</strong>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{desc}</div>
              </div>
            ))}
          </div>
        </Viz>
        <Warn>Правило «think like an attacker»: для каждой новой функции спрашивай — «как это можно сломать или обойти?»</Warn>
      </section>

      {/* 2. OWASP */}
      <section className="theory-section">
        <h2 className="theory-heading-2">2. OWASP Top 10 — главные уязвимости веба</h2>
        <p>
          OWASP (Open Web Application Security Project) — некоммерческая организация, публикующая
          рейтинг самых распространённых и опасных уязвимостей веб-приложений.
          Это стандарт де-факто для любого разработчика.
        </p>
        <Viz>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { n: 'A01', name: 'Broken Access Control', color: '#f85149', desc: 'Пользователь делает то, что не должен — читает чужие данные, вызывает admin-функции' },
              { n: 'A02', name: 'Cryptographic Failures', color: '#f85149', desc: 'MD5 для паролей, HTTP вместо HTTPS, незашифрованные персональные данные' },
              { n: 'A03', name: 'Injection', color: '#f85149', desc: 'SQL, NoSQL, OS, LDAP — пользовательский ввод выполняется как команда' },
              { n: 'A04', name: 'Insecure Design', color: '#d29922', desc: 'Архитектурные дыры: нет rate limiting, бизнес-логику можно обойти' },
              { n: 'A05', name: 'Security Misconfiguration', color: '#d29922', desc: 'Дефолтные пароли, открытые S3-бакеты, verbose error messages с трейсбеком' },
              { n: 'A06', name: 'Vulnerable Components', color: '#d29922', desc: 'npm/pip зависимости с известными CVE — атакуют библиотеку, а не твой код' },
              { n: 'A07', name: 'Auth & Session Failures', color: '#d29922', desc: 'Слабые пароли, сессии не протухают, нет 2FA' },
              { n: 'A08', name: 'Software Integrity Failures', color: '#58a6ff', desc: 'Нет проверки подписей зависимостей и CI/CD артефактов' },
              { n: 'A09', name: 'Logging & Monitoring Failures', color: '#58a6ff', desc: 'Атаку не замечают часами и днями — нет алертов' },
              { n: 'A10', name: 'SSRF', color: '#58a6ff', desc: 'Сервер делает запрос к внутренним ресурсам по URL, присланному пользователем' },
            ].map(({ n, name, color, desc }) => (
              <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  minWidth: 40, fontSize: 11, fontWeight: 700, color,
                  fontFamily: 'monospace', paddingTop: 2,
                }}>{n}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color }}>{name}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-tertiary)', marginLeft: 8 }}>— {desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Viz>
      </section>

      {/* 3. SQL */}
      <section className="theory-section">
        <h2 className="theory-heading-2">3. SQL-инъекции</h2>
        <p>
          Классика и до сих пор в топе уязвимостей. Суть проста: если пользовательский ввод
          вставляется прямо в SQL-запрос без обработки — атакующий может изменить сам запрос.
          Он перестаёт быть «данными» и становится «кодом».
        </p>
        <SqlInjectionViz />
        <p>
          Атакующий может не только читать чужие данные — с помощью инъекций можно
          удалить таблицы (<code>DROP TABLE users</code>), получить пароли администраторов,
          обойти авторизацию и получить полный контроль над приложением.
        </p>
        <Good>Единственная правильная защита — параметризованные запросы. Данные передаются отдельно от кода запроса, никакой конкатенации строк.</Good>
        <Good>ORM (SQLAlchemy, Django ORM, Prisma) делают параметризацию автоматически — используй их.</Good>
        <Bad>Никогда не используй f-строки, format() или конкатенацию для подстановки значений в SQL.</Bad>
      </section>

      {/* 4. XSS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">4. XSS — Cross-Site Scripting</h2>
        <p>
          Атакующий внедряет JavaScript в страницу, которую видят другие пользователи.
          Этот скрипт выполняется в их браузере с полными правами: может украсть cookies,
          перехватить форму с паролем, сделать запросы от имени жертвы.
        </p>
        <XSSViz />
        <p>
          <strong>Три вида XSS:</strong> Stored (скрипт хранится в БД — самый опасный),
          Reflected (скрипт в URL, жертве присылают ссылку), DOM-based (манипуляция DOM через JS без участия сервера).
        </p>
        <Good>React, Vue, Angular автоматически экранируют всё что выводится через JSX/шаблоны — это защита по умолчанию.</Good>
        <Bad>dangerouslySetInnerHTML и v-html без санитизации открывают XSS даже в React/Vue.</Bad>
        <Good>Content Security Policy (CSP) — HTTP-заголовок, который запрещает выполнение inline-скриптов и скриптов с чужих доменов. Второй рубеж обороны.</Good>
      </section>

      {/* 5. CSRF */}
      <section className="theory-section">
        <h2 className="theory-heading-2">5. CSRF — Подделка межсайтовых запросов</h2>
        <p>
          Браузер автоматически добавляет cookies к запросам — даже если они инициированы
          с другого сайта. Атакующий использует это: заставляет браузер жертвы отправить
          запрос к легитимному сайту, а тот думает что это действие самого пользователя.
        </p>
        <CSRFViz />
        <Good>CSRF-токен — уникальная строка, встроенная в каждую форму. Злой сайт не знает этот токен, поэтому не может сформировать валидный запрос.</Good>
        <Good>SameSite=Strict или Lax на cookies — браузер не отправит cookie в кросс-сайтовых запросах. Современная и простая защита.</Good>
        <Warn>Django, Rails, Laravel добавляют CSRF-защиту автоматически. Но если ты пишешь чистый API — про это нужно думать самому.</Warn>
      </section>

      {/* 6. JWT */}
      <section className="theory-section">
        <h2 className="theory-heading-2">6. Аутентификация, сессии и JWT</h2>
        <p>
          <strong>Аутентификация</strong> — кто ты? <strong>Авторизация</strong> — что тебе можно?
          Путаница между ними — частая причина уязвимостей: пользователь аутентифицирован,
          но получает доступ к чужим ресурсам.
        </p>
        <p>
          JWT (JSON Web Token) — популярный формат токена. Состоит из трёх частей,
          соединённых точкой. Нажми на любую часть:
        </p>
        <JWTViz />
        <Good>Храни JWT в httpOnly cookie, а не в localStorage. httpOnly означает — JS не может его прочитать, XSS не страшен.</Good>
        <Good>Устанавливай срок жизни токена (exp) — максимум несколько часов. Используй refresh tokens для продления сессии.</Good>
        <Bad>IDOR (Insecure Direct Object Reference): /api/orders/12345 — что мешает поменять 12345 на чужой ID? Всегда проверяй принадлежность ресурса текущему пользователю.</Bad>
      </section>

      {/* 7. Пароли */}
      <section className="theory-section">
        <h2 className="theory-heading-2">7. Хеширование паролей</h2>
        <p>
          Пароли нельзя хранить в открытом виде — это очевидно.
          Но и зашифровать нельзя: если ключ шифрования утечёт, все пароли раскроются сразу.
          Правильный подход — <strong>медленное хеширование с солью</strong>.
        </p>
        <p>
          Соль — случайная строка, добавляемая к паролю перед хешированием.
          Делает невозможными «радужные таблицы» (precomputed hashes).
          Медленность намеренная: легитимному пользователю 250мс не заметны,
          а атакующему перебор 1 млрд вариантов займёт тысячи лет.
        </p>
        <PasswordHashViz />
        <Good>Используй bcrypt (cost=12) или Argon2id — они специально разработаны для хранения паролей.</Good>
        <Bad>MD5 и SHA-256 — криптографически быстрые хеши, созданы не для паролей. GPU перебирает 10 млрд MD5-хешей в секунду.</Bad>
      </section>

      {/* 8. HTTPS */}
      <section className="theory-section">
        <h2 className="theory-heading-2">8. HTTPS, TLS и сертификаты</h2>
        <p>
          HTTP — открытый протокол. Всё что ты отправляешь виднo провайдеру,
          публичному Wi-Fi, и любому «человеку посередине» (MITM-атака).
          TLS шифрует соединение — данные нечитаемы без приватного ключа сервера.
        </p>
        <HTTPSViz />
        <Good>Сертификат бесплатно: Let's Encrypt + certbot. Настраивается за 10 минут, автоматически обновляется.</Good>
        <Good>HSTS (HTTP Strict Transport Security) — браузер всегда использует HTTPS, даже если пользователь ввёл http://. Один заголовок, максимальная защита.</Good>
        <Bad>Mixed content — HTTPS-страница грузит ресурсы по HTTP. Браузер блокирует их или предупреждает.</Bad>
      </section>

      {/* 9. CORS & CSP */}
      <section className="theory-section">
        <h2 className="theory-heading-2">9. CORS и Content Security Policy</h2>
        <p>
          <strong>CORS</strong> — механизм безопасности браузера, контролирующий
          с каких доменов JavaScript может делать fetch-запросы к твоему API.
          Браузер не даёт коду на evil.com читать ответы от bank.com
          — если банк не разрешил явно.
        </p>
        <Viz>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Row gap={10} wrap>
              <Box style={{ minWidth: 130, textAlign: 'center' }}>📄 evil.com<br /><code style={{ fontSize: 11 }}>fetch("bank.com/api")</code></Box>
              <Arrow label="запрос" />
              <Box color='#d29922' style={{ minWidth: 130, textAlign: 'center' }}>🏦 bank.com<br /><code style={{ fontSize: 11, color: '#d29922' }}>Access-Control-Allow-Origin:<br />"https://myapp.com"</code></Box>
              <Arrow label="ответ" />
              <Box color='#f85149' bg='rgba(248,81,73,0.07)' style={{ minWidth: 130, textAlign: 'center' }}>
                🚫 Браузер блокирует<br /><span style={{ fontSize: 11, color: '#f85149' }}>evil.com не в whitelist</span>
              </Box>
            </Row>
            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: 10 }}>
              <Row gap={10} wrap>
                <Box style={{ minWidth: 130, textAlign: 'center' }}>📄 myapp.com<br /><code style={{ fontSize: 11 }}>fetch("bank.com/api")</code></Box>
                <Arrow label="запрос" />
                <Box color='#3fb950' style={{ minWidth: 130, textAlign: 'center' }}>🏦 bank.com<br /><code style={{ fontSize: 11, color: '#3fb950' }}>Access-Control-Allow-Origin:<br />"https://myapp.com"</code></Box>
                <Arrow label="ответ" />
                <Box color='#3fb950' bg='rgba(63,185,80,0.07)' style={{ minWidth: 130, textAlign: 'center' }}>
                  ✅ Браузер пропускает<br /><span style={{ fontSize: 11, color: '#3fb950' }}>myapp.com в whitelist</span>
                </Box>
              </Row>
            </div>
          </div>
        </Viz>
        <Bad>CORS wildcard «*» для API с аутентификацией — любой сайт может читать данные авторизованного пользователя.</Bad>
        <Good>Явный whitelist доменов в CORS + Content Security Policy (CSP) — надёжная защита от XSS и нежелательных запросов.</Good>
      </section>

      {/* 10. Секреты */}
      <section className="theory-section">
        <h2 className="theory-heading-2">10. Управление секретами</h2>
        <p>
          Самая частая ошибка начинающих — закоммитить API-ключ, пароль или токен в git.
          Раз попав в историю, секрет считается скомпрометированным навсегда:
          боты непрерывно сканируют GitHub в поисках ключей.
        </p>
        <SecretsViz />
        <Good>Храни секреты в .env файле (добавь его в .gitignore). В коде читай через os.getenv().</Good>
        <Good>Для продакшена используй специализированные хранилища: HashiCorp Vault, AWS Secrets Manager, Kubernetes Secrets.</Good>
        <Bad>Даже в приватном репо — секрет в git это риск. Репо может стать публичным, сотрудник может уйти, токен нужно ротировать.</Bad>
      </section>

      {/* 11. Validation */}
      <section className="theory-section">
        <h2 className="theory-heading-2">11. Валидация входных данных</h2>
        <p>
          Главный принцип безопасности: <strong>никогда не доверяй клиенту</strong>.
          Всё что пришло снаружи — HTTP-запросы, файлы, URL-параметры, заголовки — потенциально враждебные данные.
          Валидация на фронтенде — это UX, а не безопасность. Её легко обойти через DevTools или curl.
        </p>
        <Viz>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { input: '../../../etc/passwd', type: 'Имя файла', attack: 'Path Traversal — выход за пределы разрешённой директории', fix: 'secure_filename() убирает ../ и / из имени', safe: false },
              { input: 'user@example.com', type: 'Email', attack: '', fix: 'Валидация формата + проверка длины', safe: true },
              { input: 'robert\'); DROP TABLE students; --', type: 'Имя в форме', attack: 'SQL Injection через имя пользователя', fix: 'Параметризованный запрос нейтрализует', safe: false },
              { input: '1'.repeat(10000), type: 'Текстовое поле', attack: 'Buffer overflow / DoS через огромный ввод', fix: 'Лимит maxLength на сервере', safe: false },
            ].map(({ input, type, attack, fix, safe }) => (
              <div key={type} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ minWidth: 100, fontSize: 11, color: 'var(--text-tertiary)', paddingTop: 3 }}>{type}</div>
                <div style={{
                  fontFamily: 'monospace', fontSize: 11, padding: '3px 8px', borderRadius: 5,
                  background: safe ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)',
                  color: safe ? '#3fb950' : '#f85149', border: `1px solid ${safe ? '#3fb950' : '#f85149'}40`,
                  maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>{input.length > 30 ? input.slice(0, 30) + '...' : input}</div>
                <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                  {!safe && <span style={{ color: '#f85149' }}>⚠ {attack}</span>}
                  {safe && <span style={{ color: '#3fb950' }}>✅ Безопасно</span>}
                  <div style={{ color: 'var(--text-tertiary)', marginTop: 2 }}>{fix}</div>
                </div>
              </div>
            ))}
          </div>
        </Viz>
        <Good>Whitelist лучше blacklist: разрешай только то что должно быть допустимо, а не запрещай известное плохое.</Good>
      </section>

      {/* 12. Data for analysts */}
      <section className="theory-section">
        <h2 className="theory-heading-2">12. Безопасность данных для аналитиков</h2>
        <p>
          Аналитики работают с реальными данными пользователей — это накладывает строгие обязательства.
          GDPR (Европа) и ФЗ-152 (Россия) требуют защиты персональных данных.
          Утечка датасета с ПДн — это юридическая ответственность, штрафы и репутационный ущерб.
        </p>
        <Viz>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 6 }}>❌ Исходный датасет (ПДн):</div>
              <TheoryTable
                headers={['Имя', 'Email', 'Телефон', 'Диагноз']}
                rows={[
                  ['Иван Петров', 'ivan@mail.ru', '+79001234567', 'Гипертония'],
                  ['Мария Сидорова', 'maria@mail.ru', '+79007654321', 'Диабет'],
                ]}
              />
            </div>
            <Arrow vertical label="псевдонимизация" />
            <div>
              <div style={{ fontSize: 12, color: '#3fb950', marginBottom: 6 }}>✅ После обработки (безопасно для анализа):</div>
              <TheoryTable
                headers={['ID', 'Email_hash', 'Регион', 'Диагноз']}
                rows={[
                  ['user_a3f9', 'b94f6f125c...', 'Москва', 'Гипертония'],
                  ['user_b72c', 'e2fc714c46...', 'СПб', 'Диабет'],
                ]}
              />
            </div>
          </div>
        </Viz>
        <Bad>Скачивать prod-дамп на личный ноутбук, отправлять датасеты в Telegram, хранить данные в открытом S3-бакете.</Bad>
        <Good>Правило минимальных данных: не собирай и не храни данных больше, чем нужно для конкретной задачи.</Good>
        <Good>Перед работой с данными: псевдонимизация (замена ПДн на хеши/ID), агрегация, дифференциальная приватность.</Good>
      </section>

      {/* 13. ML */}
      <section className="theory-section">
        <h2 className="theory-heading-2">13. Безопасность в Machine Learning</h2>
        <p>
          ML-модели — новый вектор атак. Уязвимы не только системы, но и сами модели.
          Наиболее известный пример — adversarial attacks: специально подобранный
          едва заметный шум полностью меняет предсказание модели.
        </p>
        <MLAttackViz />
        <TheoryTable
          headers={['Атака', 'Суть']}
          rows={[
            ['Adversarial Examples', 'Незаметный шум меняет предсказание — панда становится гиббоном'],
            ['Data Poisoning', 'Атакующий загрязняет обучающий датасет — модель получает «бэкдор»'],
            ['Model Extraction', 'Через множество API-запросов восстанавливают всю модель без доступа к весам'],
            ['Prompt Injection', 'Вредоносный промпт меняет поведение LLM — «игнорируй инструкции и...»'],
          ]}
        />
        <Good>Adversarial training: включай adversarial примеры в обучающий датасет — модель становится устойчивее.</Good>
        <Good>Prompt Injection: разделяй системный промпт и пользовательский ввод структурно, валидируй и ограничивай ввод, мониторь аномальные ответы.</Good>
      </section>

      {/* 14. Rate limiting */}
      <section className="theory-section">
        <h2 className="theory-heading-2">14. Rate Limiting и защита от брутфорса</h2>
        <p>
          Брутфорс — перебор паролей. Без ограничений атакующий пробует тысячи
          вариантов в секунду. Rate limiting ограничивает количество запросов
          с одного IP или для одного пользователя за период времени.
        </p>
        <RateLimitViz />
        <Good>Прогрессивные задержки после неудачных попыток: 1, 2, 4, 8 секунд. Временная блокировка аккаунта после N ошибок.</Good>
        <Good>Двухфакторная аутентификация (2FA) — даже зная пароль, без второго фактора не войти. TOTP через Google Authenticator.</Good>
        <Good>CAPTCHA после нескольких неудачных попыток — отсекает автоматический перебор.</Good>
      </section>

      {/* 15. Dependencies */}
      <section className="theory-section">
        <h2 className="theory-heading-2">15. Безопасность зависимостей</h2>
        <p>
          Современный проект содержит сотни зависимостей.
          Каждая — потенциальная уязвимость, которую ты не писал, но несёшь ответственность.
          Знаменитый случай: log4shell (CVE-2021-44228) — одна уязвимость в популярной
          Java-библиотеке затронула половину интернета и позволяла выполнять произвольный код.
        </p>
        <Viz>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box color='#f85149' style={{ minWidth: 160 }}>
                <div style={{ fontSize: 11, color: '#f85149', marginBottom: 4 }}>😈 Атакующий знает:</div>
                <code style={{ fontSize: 11 }}>requests==2.25.0<br />CVE-2023-XXXX: critical</code>
              </Box>
              <Arrow label="видит в" />
              <Box style={{ minWidth: 120 }}>📄 requirements.txt<br /><code style={{ fontSize: 11 }}>requests==2.25.0</code></Box>
              <Arrow label="атакует через" />
              <Box color='#f85149' bg='rgba(248,81,73,0.07)' style={{ minWidth: 120 }}>
                💀 Твоё приложение
              </Box>
            </div>
            <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: 10, display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <Box color='#3fb950' bg='rgba(63,185,80,0.07)' style={{ minWidth: 160 }}>
                <div style={{ fontSize: 11, color: '#3fb950', marginBottom: 4 }}>✅ Защита:</div>
                <code style={{ fontSize: 11 }}>pip-audit<br />npm audit<br />Dependabot</code>
              </Box>
              <Arrow label="находит" />
              <Box color='#d29922' style={{ minWidth: 130 }}>⚠ CVE найден<br /><code style={{ fontSize: 11 }}>requests==2.25.0</code></Box>
              <Arrow label="обновляй до" />
              <Box color='#3fb950' bg='rgba(63,185,80,0.07)' style={{ minWidth: 130 }}>
                ✅ requests==2.31.0<br /><code style={{ fontSize: 11, color: '#3fb950' }}>уязвимость закрыта</code>
              </Box>
            </div>
          </div>
        </Viz>
        <Good>pip-audit (Python) и npm audit (Node.js) — запускай регулярно, идеально в CI/CD при каждом деплое.</Good>
        <Bad>Typosquatting: «reqeusts» вместо «requests» — мошеннический пакет с похожим именем, содержащий малварь. Проверяй что ставишь.</Bad>
        <Good>Dependabot, Snyk, Renovate автоматически создают PR при появлении CVE в твоих зависимостях. Настрой один раз — получай алерты.</Good>
      </section>

      {/* Чеклист */}
      <section className="theory-section">
        <h2 className="theory-heading-2">Чеклист безопасного разработчика</h2>
        <Viz>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {[
              'Весь пользовательский ввод валидируется на сервере',
              'SQL — только параметризованные запросы',
              'Пароли через bcrypt или Argon2',
              'JWT в httpOnly cookie, с exp',
              'Каждый endpoint проверяет права доступа',
              'Нет секретов в коде и git-истории',
              'HTTPS + HSTS везде',
              'SameSite cookies + CSRF-токены',
              'CSP заголовок настроен',
              'npm audit / pip-audit в CI/CD',
              '2FA для критичных аккаунтов',
              'Rate limiting на login и API',
              'Ошибки логируются, пароли — нет',
              'ПДн псевдонимизированы в датасетах',
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)',
                borderRadius: 8, padding: '6px 10px', fontSize: 12, color: 'var(--text-secondary)',
              }}>
                <span style={{ color: '#3fb950' }}>✓</span> {item}
              </div>
            ))}
          </div>
        </Viz>
      </section>

      <section className="theory-section theory-section--closing">
        <p className="theory-closing-text">Security — это не параноя, это профессионализм. Встраивай защиту в код с первого дня.</p>
      </section>

    </div>
  )
}
