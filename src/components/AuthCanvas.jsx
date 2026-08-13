import { useEffect, useRef } from 'react'

// Фоновая анимация частиц для страниц входа и регистрации.
export default function AuthCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let particles = []
    let raf

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    const mkParticle = () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      o: Math.random() * 0.08 + 0.03,
    })
    const init = () => {
      resize()
      particles = Array.from({ length: 60 }, mkParticle)
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(32,190,255,${p.o})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < -5) p.x = canvas.width + 5
        if (p.x > canvas.width + 5) p.x = -5
        if (p.y < -5) p.y = canvas.height + 5
        if (p.y > canvas.height + 5) p.y = -5
      })
      raf = requestAnimationFrame(draw)
    }
    init()
    draw()
    window.addEventListener('resize', init, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
    }
  }, [])

  return <canvas id="login-canvas" ref={canvasRef} />
}
