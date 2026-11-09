// Точка входа для пререндера: лендинг рендерится в HTML при сборке (scripts/prerender.mjs),
// чтобы поисковики и боты мессенджеров видели текст без запуска JavaScript.
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Landing from './pages/Landing'

export function render() {
  return renderToString(
    <StaticRouter location="/">
      <Landing />
    </StaticRouter>
  )
}
