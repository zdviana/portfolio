import { useEffect, useState } from 'react'
import styles from './CopyEmail.module.css'

const FEEDBACK_MS = 2000

// Copia o e-mail em vez de usar mailto:, que sem app de e-mail configurado só mostra um aviso do navegador.
export default function CopyEmail({ email, children = email, className = '' }) {
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!feedback) return undefined
    const timer = setTimeout(() => setFeedback(''), FEEDBACK_MS)
    return () => clearTimeout(timer)
  }, [feedback])

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(email)
      setFeedback('✓ copiado')
    } catch {
      setFeedback(`copie: ${email}`)
    }
  }

  return (
    <span className={styles.wrapper}>
      <button
        type="button"
        className={`${styles.button} ${className}`}
        onClick={handleClick}
        title="Clique para copiar o e-mail"
        aria-label={`Copiar e-mail ${email}`}
      >
        {children}
      </button>
      <span role="status" className={styles.feedback}>
        {feedback}
      </span>
    </span>
  )
}
