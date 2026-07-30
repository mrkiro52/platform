const BASE = import.meta.env.VITE_API_URL || ''

function token() {
  try { return JSON.parse(localStorage.getItem('kiro_user'))?.token || null } catch { return null }
}

async function req(path, opts = {}) {
  const t = token()
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) }
  if (t) headers.Authorization = `Bearer ${t}`
  const res = await fetch(`${BASE}${path}`, { ...opts, headers })
  if (res.status === 401 && !path.includes('/auth/')) {
    localStorage.removeItem('kiro_user')
    window.location.reload()
    return
  }
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw Object.assign(new Error(body.message || res.statusText), { status: res.status })
  }
  return res.json()
}

export const api = {
  login:         (email, pw) => req('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password: pw }) }),
  schedule:      ()          => req('/api/schedule'),
  library:       ()          => req('/api/library'),
  tasks:         ()          => req('/api/tasks'),
  setTaskStatus: (id, st)    => req(`/api/tasks/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status: st }) }),
  announcements: ()          => req('/api/announcements'),
  links:         ()          => req('/api/links'),
  profile:       ()          => req('/api/users/me'),
  updateProfile: (data)      => req('/api/users/me', { method: 'PUT', body: JSON.stringify(data) }),
}
