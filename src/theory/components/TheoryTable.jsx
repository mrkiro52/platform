export function TheoryTable({ headers, rows }) {
  return (
    <div className="theory-table-wrapper">
      <table className="theory-table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function TheoryCode({ code, language = 'js' }) {
  return (
    <div className="theory-code-block">
      <div className="theory-code-label">{language}</div>
      <pre className="theory-code"><code>{code}</code></pre>
    </div>
  )
}

export function TheoryExample({ title, children }) {
  return (
    <div className="theory-example">
      <div className="theory-example-title">💡 {title}</div>
      <div className="theory-example-content">{children}</div>
    </div>
  )
}

// Иллюстрация таблицы базы данных.
// name — имя таблицы, columns — массив заголовков,
// rows — массив строк (массив ячеек),
// highlightRows — индексы выделенных строк (результат запроса),
// highlightCols — индексы выделенных колонок,
// caption — подпись под таблицей.
export function DbTable({ name, columns, rows, highlightRows = [], highlightCols = [], caption }) {
  return (
    <div className="db-table-illustration" style={{ margin: '16px 0' }}>
      {name && (
        <div style={{
          display: 'inline-block', background: 'var(--accent-lime)', color: '#0a0a14',
          fontWeight: 700, fontSize: '12px', padding: '3px 12px',
          borderRadius: '6px 6px 0 0', fontFamily: 'monospace'
        }}>{name}</div>
      )}
      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: name ? '0 8px 8px 8px' : '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', minWidth: 'max-content' }}>
          <thead>
            <tr>
              {columns.map((c, j) => (
                <th key={j} style={{
                  padding: '8px 14px', textAlign: 'left', whiteSpace: 'nowrap',
                  background: highlightCols.includes(j) ? 'rgba(32,190,255,0.18)' : 'var(--bg-secondary)',
                  color: highlightCols.includes(j) ? 'var(--accent-lime)' : 'var(--text-secondary)',
                  borderBottom: '2px solid var(--border-color)', fontFamily: 'monospace', fontWeight: 700
                }}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} style={{
                background: highlightRows.includes(i) ? 'rgba(32,190,255,0.10)' : 'transparent',
              }}>
                {row.map((cell, j) => (
                  <td key={j} style={{
                    padding: '7px 14px', whiteSpace: 'nowrap',
                    borderBottom: '1px solid var(--border-color)',
                    color: (highlightCols.includes(j) || highlightRows.includes(i)) ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: highlightCols.includes(j) ? 600 : 400,
                  }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '6px', fontStyle: 'italic' }}>{caption}</div>
      )}
    </div>
  )
}
