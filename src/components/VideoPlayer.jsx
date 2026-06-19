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

  const SPEEDS = [0.5, 1, 1.5, 2]

  const togglePlay = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPlaying(true) }
    else { v.pause(); setPlaying(false) }
  }, [])

  const skip = useCallback((sec) => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + sec))
  }, [])

  const setPlaybackSpeed = useCallback((s) => {
    const v = videoRef.current
    if (v) v.playbackRate = s
    setSpeed(s)
    setShowSpeedMenu(false)
  }, [])

  const handleProgressClick = useCallback((e) => {
    const v = videoRef.current
    const bar = progressRef.current
    if (!v || !bar || !v.duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    v.currentTime = ratio * v.duration
  }, [])

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

  const fmt = (s) => {
    if (!s || isNaN(s)) return '0:00'
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div style={{
      background: '#0d0d18',
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid var(--border-color)',
      marginBottom: '32px',
    }}>
      {/* Видео */}
      <div style={{ position: 'relative', background: '#000', cursor: 'pointer' }} onClick={togglePlay}>
        <video
          ref={videoRef}
          src={src}
          style={{ width: '100%', display: 'block', maxHeight: '480px', objectFit: 'contain' }}
          preload="metadata"
        />
        {/* Большая кнопка play по центру когда на паузе */}
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
        onClick={handleProgressClick}
        style={{
          height: 4, background: 'var(--bg-tertiary)',
          cursor: 'pointer', position: 'relative',
        }}
      >
        {/* Буфер */}
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${buffered}%`, background: 'rgba(255,255,255,0.1)',
          transition: 'width 0.3s',
        }} />
        {/* Прогресс */}
        <div style={{
          position: 'absolute', left: 0, top: 0, height: '100%',
          width: `${progress}%`, background: 'var(--accent-lime)',
          transition: 'width 0.1s',
        }} />
        {/* Ползунок */}
        <div style={{
          position: 'absolute', top: '50%', left: `${progress}%`,
          transform: 'translate(-50%, -50%)',
          width: 12, height: 12, borderRadius: '50%',
          background: 'var(--accent-lime)',
          boxShadow: '0 0 6px rgba(200,255,0,0.6)',
        }} />
      </div>

      {/* Контролы */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '10px 16px',
        background: 'var(--bg-secondary)',
      }}>
        {/* Перемотка назад */}
        <CtrlBtn title="−10 сек" onClick={() => skip(-10)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="1,4 1,10 7,10" />
            <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
            <text x="8" y="16" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">10</text>
          </svg>
        </CtrlBtn>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--accent-lime)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', flexShrink: 0,
            transition: 'transform 0.15s, opacity 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {playing
            ? <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            : <svg width="14" height="14" viewBox="0 0 24 24" fill="#000"><polygon points="5,3 19,12 5,21"/></svg>
          }
        </button>

        {/* Перемотка вперёд */}
        <CtrlBtn title="+10 сек" onClick={() => skip(10)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="23,4 23,10 17,10" />
            <path d="M20.49 15a9 9 0 1 1-.49-4.5" />
            <text x="8" y="16" fontSize="6" fill="currentColor" stroke="none" fontWeight="bold">10</text>
          </svg>
        </CtrlBtn>

        {/* Время */}
        <span style={{
          color: 'var(--text-secondary)', fontSize: 13,
          fontVariantNumeric: 'tabular-nums', flexShrink: 0, marginLeft: 4,
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
              minWidth: 44,
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
                    textAlign: 'center',
                    transition: 'background 0.15s',
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

function CtrlBtn({ onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: 'transparent', border: '1px solid var(--border-color)',
        borderRadius: 6, padding: '5px 8px',
        color: 'var(--text-secondary)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'border-color 0.15s, color 0.15s',
        fontSize: 12, gap: 4,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-lime)'; e.currentTarget.style.color = 'var(--accent-lime)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
    >
      {children}
      <span style={{ fontSize: 11 }}>{title}</span>
    </button>
  )
}
