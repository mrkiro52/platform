// Reusable skeleton loaders for different content types

export function SkeletonLibraryDay() {
  return (
    <div className="skeleton-schedule-day">
      <div className="skeleton skeleton-block" style={{ width: '80%', height: 18 }} />
      <div className="skeleton skeleton-title" style={{ margin: '8px 0' }} />
      <div className="skeleton skeleton-text" style={{ width: '50%' }} />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-card-icon" />
      <div className="skeleton skeleton-card-title" />
      <div className="skeleton skeleton-card-desc" />
      <div className="skeleton skeleton-card-desc" />
    </div>
  )
}

export function SkeletonNewsCard() {
  return (
    <div className="skeleton-news-card">
      <div className="skeleton skeleton-news-card-title" />
      <div className="skeleton skeleton-news-card-text" />
      <div className="skeleton skeleton-news-card-text" />
    </div>
  )
}

export function SkeletonEventCard() {
  return (
    <div className="skeleton-schedule-day">
      <div className="skeleton skeleton-block" style={{ width: '30%', height: 14 }} />
      <div className="skeleton skeleton-title" style={{ margin: '8px 0' }} />
      <div className="skeleton skeleton-text" style={{ width: '65%' }} />
    </div>
  )
}

export function SkeletonCampProgress() {
  return (
    <div style={{ marginBottom: 24 }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <div className="skeleton skeleton-block" style={{ width: '80px' }} />
            <div className="skeleton skeleton-block" style={{ flex: 1 }} />
          </div>
          <div className="skeleton skeleton-block" style={{ height: 8 }} />
        </div>
      ))}
    </div>
  )
}
