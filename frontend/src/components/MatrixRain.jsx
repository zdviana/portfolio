import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const CHARS = 'アイウエオカキクケコ0123456789ABCDEF'
const FONT_SIZE = 16

export default function MatrixRain({ className }) {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (reduceMotion || !canvas) return undefined

    // jsdom (e testes) não implementa getContext; nesse caso não desenha nada.
    const ctx = canvas.getContext('2d')
    if (!ctx) return undefined

    let drops = []
    let frameId = 0

    const resize = () => {
      const parent = canvas.parentElement
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
      const columns = Math.ceil(canvas.width / FONT_SIZE)
      drops = Array.from({ length: columns }, () => Math.random() * (canvas.height / FONT_SIZE))
    }

    // Apaga parcialmente o canvas (transparente) para deixar um rastro que desaparece.
    const draw = () => {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalCompositeOperation = 'source-over'

      ctx.fillStyle = '#00ff41'
      ctx.font = `${FONT_SIZE}px monospace`
      drops.forEach((row, i) => {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        ctx.fillText(char, i * FONT_SIZE, row * FONT_SIZE)
        const resetAtTop = row * FONT_SIZE > canvas.height && Math.random() > 0.975
        drops[i] = resetAtTop ? 0 : row + 1
      })

      frameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    frameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  if (reduceMotion) return null

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
