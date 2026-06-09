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
