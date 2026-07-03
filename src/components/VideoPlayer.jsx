import { useRef, useState, useEffect, useCallback } from 'react'

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null)
  const progressRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [volume, setVolume] = useState(1)
  const [muted, setMuted] = useState(false)
  const [buffered, setBuffered] = useState(0)
  const [showSpeedMenu, setShowSpeedMenu] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [dragProgress, setDragProgress] = useState(0)
  const containerRef = useRef(null)
  const wasPausedRef = useRef(false)

  const SPEEDS = [0.5, 1, 1.5, 2]

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      el.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }, [])

  const setPlaybackSpeed = useCallback((s) => {
    const v = videoRef.current
    if (v) v.playbackRate = s
    setSpeed(s)
    setShowSpeedMenu(false)
  }, [])

  const getRatio = (clientX) => {
    const bar = progressRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
  }

  const handleProgressMouseDown = useCallback((e) => {
    const v = videoRef.current
    if (!v || !v.duration) return
    wasPausedRef.current = v.paused
    if (!v.paused) v.pause()
    setDragging(true)
    setDragProgress(getRatio(e.clientX) * 100)
  }, [])

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging) return
      setDragProgress(getRatio(e.clientX) * 100)
    }
    const onMouseUp = (e) => {
      if (!dragging) return
      const v = videoRef.current
      if (v && v.duration) {
        v.currentTime = getRatio(e.clientX) * v.duration
      }
      setDragging(false)
      if (!wasPausedRef.current && v) { v.play(); setPlaying(true) }
    }
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [dragging])

  const handleVolumeChange = useCallback((e) => {
    const v = videoRef.current
    const val = parseFloat(e.target.value)
    if (v) { v.volume = val; v.muted = val === 0 }
    setVolume(val)
    setMuted(val === 0)
  }, [])

  const toggleMute = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onTime = () => setCurrentTime(v.currentTime)
    const onMeta = () => setDuration(v.duration)
    const onEnded = () => setPlaying(false)
    const onProgress = () => {
      if (v.buffered.length > 0) {
        setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100)
      }
    }
    v.addEventListener('timeupdate', onTime)
    v.addEventListener('loadedmetadata', onMeta)
    v.addEventListener('ended', onEnded)
    v.addEventListener('progress', onProgress)
    return () => {
      v.removeEventListener('timeupdate', onTime)
      v.removeEventListener('loadedmetadata', onMeta)
      v.removeEventListener('ended', onEnded)
      v.removeEventListener('progress', onProgress)
    }
  }, [])

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest('[data-speed-menu]')) setShowSpeedMenu(false)
    }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [])

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progress = dragging ? dragProgress : (duration ? (currentTime / duration) * 100 : 0)

  return (
    <div ref={containerRef} style={{
      maxWidth: 800,
      margin: '0 auto 32px',
      background: '#0d0d18',
      borderRadius: isFullscreen ? 0 : '12px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      ...(isFullscreen && {
        display: 'flex', flexDirection: 'column',
        width: '100vw', height: '100vh',
        maxWidth: 'none', margin: 0,
      }),
    }}>
      {/* Видео */}
      <div
        style={{
          position: 'relative', background: '#000', cursor: 'pointer',
          ...(isFullscreen && { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
        }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          style={{
            width: '100%', display: 'block',
            ...(isFullscreen
              ? { width: '100%', height: '100%', objectFit: 'contain' }
              : { aspectRatio: '16 / 9', maxHeight: '480px', objectFit: 'contain' }),
          }}
          preload="metadata"
        />
        {!playing && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', pointerEvents: 'none',
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: '50%',
              background: 'rgba(200,255,0,0.15)',
              backdropFilter: 'blur(8px)',
              border: '2px solid var(--accent-lime)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--accent-lime)">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Прогресс-бар */}
      <div
        ref={progressRef}
        onMouseDown={handleProgressMouseDown}
        style={{
          height: dragging ? 6 : 4, background: 'var(--bg-tertiary)',
          cursor: 'pointer', position: 'relative',
          transition: 'height 0.1s',
          userSelect: 'none',
        }}
      >
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${buffered}%`, background: 'rgba(255,255,255,0.1)', transition: 'width 0.3s',
        }} />
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${progress}%`, background: 'var(--accent-lime)',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: `${progress}%`,
          transform: 'translate(-50%, -50%)',
          width: dragging ? 16 : 12, height: dragging ? 16 : 12,
          borderRadius: '50%',
          background: 'var(--accent-lime)',
          boxShadow: dragging ? '0 0 10px rgba(200,255,0,0.8)' : '0 0 6px rgba(200,255,0,0.6)',
          transition: 'width 0.1s, height 0.1s, box-shadow 0.1s',
        }} />
      </div>

      {/* Контролы */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
      }}>
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--accent-lime)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            transition: 'transform 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>

        {/* Время */}
        <span style={{
          color: 'var(--text-secondary)', fontSize: 13,
          fontVariantNumeric: 'tabular-nums', flexShrink: 0,
        }}>
          {fmt(currentTime)} / {fmt(duration)}
        </span>

        <div style={{ flex: 1 }} />

        {/* Громкость */}
        <button onClick={toggleMute} style={iconBtnStyle}>
          {muted || volume === 0
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11,5 6,9 2,9 2,15 6,15 11,19"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          }
        </button>
        <input
          type="range" min="0" max="1" step="0.05" value={muted ? 0 : volume}
          onChange={handleVolumeChange}
          style={{ width: 70, accentColor: 'var(--accent-lime)', cursor: 'pointer' }}
        />

        {/* Скорость */}
        <div style={{ position: 'relative' }} data-speed-menu>
          <button
            onClick={(e) => { e.stopPropagation(); setShowSpeedMenu(v => !v) }}
            style={{
              ...iconBtnStyle,
              padding: '4px 10px', borderRadius: 6,
              background: showSpeedMenu ? 'var(--bg-tertiary)' : 'transparent',
              fontSize: 13, fontWeight: 600, color: 'var(--accent-lime)',
              minWidth: 44, border: '1px solid var(--border-color)',
            }}
          >
            {speed}×
          </button>
          {showSpeedMenu && (
            <div style={{
              position: 'absolute', bottom: '110%', right: 0,
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: 8, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
              zIndex: 10,
            }}>
              {SPEEDS.map(s => (
                <button
                  key={s}
                  onClick={(e) => { e.stopPropagation(); setPlaybackSpeed(s) }}
                  style={{
                    display: 'block', width: '100%', padding: '8px 20px',
                    background: s === speed ? 'rgba(200,255,0,0.1)' : 'transparent',
                    color: s === speed ? 'var(--accent-lime)' : 'var(--text-primary)',
                    border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 500,
                    textAlign: 'center', transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => { if (s !== speed) e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
                  onMouseLeave={e => { if (s !== speed) e.currentTarget.style.background = 'transparent' }}
                >
                  {s}×
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Fullscreen */}
        <button onClick={toggleFullscreen} style={iconBtnStyle} title={isFullscreen ? 'Свернуть' : 'На весь экран'}>
          {isFullscreen
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
          }
        </button>
      </div>
    </div>
  )
}

const iconBtnStyle = {
  background: 'transparent', border: 'none',
  color: 'var(--text-secondary)', cursor: 'pointer',
  padding: '4px', borderRadius: 4, display: 'flex',
  alignItems: 'center', justifyContent: 'center',
  transition: 'color 0.15s',
}
