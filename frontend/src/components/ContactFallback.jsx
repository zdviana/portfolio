import Button from './Button'
import { gmailUrl, mailtoUrl, whatsappUrl } from './contactLinks'
import styles from './ContactForm.module.css'

const EXTERNAL = { variant: 'ghost', target: '_blank', rel: 'noopener noreferrer' }

// Mostrado quando a API está fora do ar: o visitante escolhe por onde enviar, sem depender de um app de e-mail instalado.
export default function ContactFallback({ destination, whatsapp, values }) {
  return (
    <div className={styles.fallback} role="alert">
      <p className={styles.fallbackText}>
        Não consegui enviar agora. Escolha uma opção abaixo — sua mensagem já vai preenchida:
      </p>
      <div className={styles.fallbackActions}>
        <Button href={gmailUrl(destination, values)} {...EXTERNAL}>
          Enviar pelo Gmail
        </Button>
        {whatsapp && (
          <Button href={whatsappUrl(whatsapp, values)} {...EXTERNAL}>
            Enviar pelo WhatsApp
          </Button>
        )}
        <Button href={mailtoUrl(destination, values)} variant="ghost">
          Outro app de e-mail
        </Button>
      </div>
    </div>
  )
}
