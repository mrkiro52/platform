import { SQL_DATASET } from '../data/week4/sqlTasks'

// Датасет для задач по SQL. Показывается и в материалах недели, и в форме
// сдачи — чтобы не приходилось держать открытыми две вкладки.
export default function SqlDataset({ compact = false }) {
  const { intro, tables, note } = SQL_DATASET

  return (
    <div className="w4-sql">
      {!compact && <p className="w4-sql-intro">{intro}</p>}

      <div className="w4-tables">
        {tables.map(table => (
          <div key={table.name} className="w4-table">
            <div className="w4-table-head">
              <span className="w4-table-name">{table.name}</span>
              <span className="w4-table-comment">{table.comment}</span>
            </div>

            <div className="w4-table-cols">
              {table.columns.map(([name, type, colNote]) => (
                <div key={name} className="w4-col">
                  <span className="w4-col-name">{name}</span>
                  <span className="w4-col-type">{type}</span>
                  <span className="w4-col-note">{colNote}</span>
                </div>
              ))}
            </div>

            <div className="viz-grid-scroll">
              <table className="viz-grid">
                <thead>
                  <tr>{table.sample.head.map(h => <th key={h}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {table.sample.rows.map((row, i) => (
                    <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="hwup-comment">
        <div className="hwup-comment-label">Важно</div>
        <div className="hwup-comment-text">{note}</div>
      </div>
    </div>
  )
}
