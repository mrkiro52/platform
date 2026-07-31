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

async function reqForm(path, formData) {
  const t = token()
  const headers = {}
  if (t) headers.Authorization = `Bearer ${t}`
  const res = await fetch(`${BASE}${path}`, { method: 'POST', headers, body: formData })
  if (res.status === 401) {
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
  uploadAvatar:  (file)      => { const fd = new FormData(); fd.append('avatar', file); return reqForm('/api/users/me/avatar', fd) },
  posts:         (opts = {}) => {
    const qs = new URLSearchParams()
    if (opts.feed)   qs.set('feed', opts.feed)
    if (opts.userId) qs.set('userId', opts.userId)
    const s = qs.toString()
    return req(`/api/posts${s ? `?${s}` : ''}`)
  },
  createPost:    (text, imageUrl = '') => req('/api/posts', { method: 'POST', body: JSON.stringify({ text, imageUrl }) }),
  deletePost:    (id)        => req(`/api/posts/${id}`, { method: 'DELETE' }),
  uploadPostImage: (file)    => { const fd = new FormData(); fd.append('image', file); return reqForm('/api/posts/image', fd) },
  reactToPost:   (id, reaction) => req(`/api/posts/${id}/reaction`, { method: 'PUT', body: JSON.stringify({ reaction }) }),
  addComment:    (id, text)  => req(`/api/posts/${id}/comments`, { method: 'POST', body: JSON.stringify({ text }) }),
  deleteComment: (postId, commentId) => req(`/api/posts/${postId}/comments/${commentId}`, { method: 'DELETE' }),

  // ── Социальная сеть ──────────────────────────────────────────────────────
  findByNickname: (nickname) => req(`/api/social/find?nickname=${encodeURIComponent(nickname)}`),
  userProfile:   (id)        => req(`/api/social/users/${id}`),
  toggleFollow:  (id)        => req(`/api/social/users/${id}/follow`, { method: 'POST' }),
  followers:     (id)        => req(`/api/social/users/${id}/followers`),
  following:     (id)        => req(`/api/social/users/${id}/following`),

  conversations:    ()            => req('/api/messages'),
  thread:           (userId)      => req(`/api/messages/${userId}`),
  sendMessage:      (userId, text) => req(`/api/messages/${userId}`, { method: 'POST', body: JSON.stringify({ text }) }),
  unreadMessages:   ()            => req('/api/messages/unread-count'),

  notifications:      ()  => req('/api/notifications'),
  unreadNotifications:()  => req('/api/notifications/unread-count'),
  readNotifications:  ()  => req('/api/notifications/read', { method: 'POST' }),
}
