// Вставляет предрендеренный лендинг в dist/index.html вместо метки <!--prerender-->.
// Запускается после `vite build` и `vite build --ssr src/prerender.jsx --outDir dist-ssr`.
// React на клиенте полностью заменяет эту разметку; на адресах, кроме «/», и у вошедших
// пользователей она скрыта стилем .no-prerender до запуска React (см. index.html).
import { existsSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const entry = ['dist-ssr/prerender.mjs', 'dist-ssr/prerender.js'].map(f => resolve(f)).find(existsSync)
const ssr = await import(pathToFileURL(entry).href)
const html = ssr.render()
const file = resolve('dist/index.html')
const page = readFileSync(file, 'utf8')
if (!page.includes('<!--prerender-->')) throw new Error('в dist/index.html нет метки <!--prerender-->')
writeFileSync(file, page.replace('<!--prerender-->', html))
rmSync('dist-ssr', { recursive: true, force: true })
console.log(`prerender: лендинг вставлен в dist/index.html (${html.length} символов)`)
