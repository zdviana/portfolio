import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import profile from '../data/profile.json'
import styles from './Terminal.module.css'

// ~90 caracteres x 18ms = ~1.6s, abaixo do limite de 2s.
const CHAR_DELAY_MS = 18

const LINES = [
  { text: '> whoami', Tag: 'p', className: styles.command },
  { text: profile.name, Tag: 'h1', className: styles.name },
  { text: '> cat cargo.txt', Tag: 'p', className: styles.command },
  { text: profile.role, Tag: 'p', className: styles.output },
]
const TOTAL_CHARS = LINES.reduce((sum, line) => sum + line.text.length, 0)

// Quantos caracteres de cada linha já aparecem, dado o total digitado até agora.
function charsPerLine(total) {
  let left = total
  return LINES.map(({ text }) => {
    const shown = Math.max(0, Math.min(text.length, left))
    left -= text.length
    return shown
  })
}

export default function Terminal() {
  const reduceMotion = useReducedMotion()
  const [typed, setTyped] = useState(0)
  const finished = reduceMotion || typed >= TOTAL_CHARS

  // O timer é limpo no cleanup do effect, inclusive ao desmontar.
  useEffect(() => {
    if (finished) return undefined
    const timer = setTimeout(() => setTyped((n) => n + 1), CHAR_DELAY_MS)
    return () => clearTimeout(timer)
  }, [finished, typed])

  const counts = charsPerLine(reduceMotion ? TOTAL_CHARS : typed)
  const activeIndex = counts.findIndex((count, i) => count < LINES[i].text.length)
  const cursorIndex = activeIndex === -1 ? LINES.length - 1 : activeIndex

  return (
    <div className={styles.window}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
      </div>
      <div className={styles.screen}>
        {LINES.map(({ text, Tag, className }, i) => (
          <Tag key={text} className={className}>
            {/* Visual digitado oculto para leitores de tela; o texto completo fica no trecho visually-hidden. */}
            <span aria-hidden="true">
              {text.slice(0, counts[i])}
              {i === cursorIndex && <span className={styles.cursor}>█</span>}
            </span>
            <span className="visually-hidden">{text}</span>
          </Tag>
        ))}
      </div>
    </div>
  )
}
