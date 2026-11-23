import { isCountable, taskKey } from './index'

export function winterRoute(stages) {
  let number = 0
  return stages.flatMap(stage => stage.needsDirection
    ? [{ stage, needsDirection: true }]
    : stage.modules.flatMap(mod => mod.chapters.map(ch => ({
        stage, mod, ch, number: ++number, key: taskKey(mod, ch),
      }))))
}

export function chapterUrl({ mod, ch }, task = ch.taskOnly) {
  return `/winter-camp/m/${mod.key}/${ch.ref}${task ? '/task' : ''}`
}

export function chapterStep(entry, byKey) {
  const { ch, key } = entry
  const status = byKey[key]?.status
  if (status === 'approved' || status === 'submitted') return null
  if (status === 'rework' || status === 'failed') {
    return { label: status === 'failed' ? 'Пересдать тест' : 'Внести правки', url: chapterUrl(entry, true) }
  }
  if (ch.taskOnly || isCountable(ch)) {
    return { label: ch.task?.kind === 'auto' ? 'Пройти тест' : 'Выполнить задание', url: chapterUrl(entry, true) }
  }
  return null
}
