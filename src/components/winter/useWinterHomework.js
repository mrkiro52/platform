import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../../api'

// Сданные работы студента зимнего лагеря. list === null — ещё грузим.
// byKey — работа по ключу задания «<блок>:<глава>»; upsert подставляет свежую работу после отправки.
export function useWinterHomework(enabled = true) {
  const [list, setList] = useState(null)
  const [error, setError] = useState('')

  const reload = useCallback(() => {
    if (!enabled) return Promise.resolve()
    return api.winterHomework()
      .then(rows => { setList(rows || []); setError('') })
      .catch(e => { setList([]); setError(e.message || 'Не удалось загрузить сданные работы') })
  }, [enabled])

  useEffect(() => { reload() }, [reload])

  const byKey = useMemo(() => {
    const map = {}
    for (const row of list || []) map[row.key] = row
    return map
  }, [list])

  const upsert = useCallback((row) => {
    setList(prev => [...(prev || []).filter(r => r.key !== row.key), row])
  }, [])

  return { list, byKey, error, reload, upsert, loading: list === null }
}

export const HW_LABEL = {
  submitted: 'на проверке',
  approved: 'принято',
  rework: 'нужны правки',
  failed: 'тест не пройден',
}

// Сводка по заданиям: сколько принято, на проверке, с правками и не сдано
export function summarize(tasks, byKey) {
  const out = { total: tasks.length, approved: 0, submitted: 0, rework: 0, todo: 0 }
  for (const t of tasks) {
    const st = byKey[t.key]?.status
    if (st === 'approved') out.approved += 1
    else if (st === 'submitted') out.submitted += 1
    else if (st === 'rework' || st === 'failed') out.rework += 1
    else out.todo += 1
  }
  out.pct = out.total ? Math.round((out.approved / out.total) * 100) : 0
  return out
}
