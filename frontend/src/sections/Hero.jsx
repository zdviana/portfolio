import profile from '../data/profile.json'
import Button from '../components/Button'
import MatrixRain from '../components/MatrixRain'
import Terminal from '../components/Terminal'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <MatrixRain className={styles.rain} />

      <div className={styles.content}>
        {profile.available && (
          <span className={styles.badge}>Disponível para novas oportunidades</span>
        )}

        <div className={styles.terminal}>
          <Terminal />
        </div>

        <p className={styles.tagline}>{profile.tagline}</p>

        <div className={styles.actions}>
          <Button href={profile.links.cv} download variant="primary">
            Baixar CV
          </Button>
          <Button
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
          >
            Ver GitHub
          </Button>
        </div>

        <nav aria-label="Contatos" className={styles.social}>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.links.email}`} aria-label="Enviar e-mail">
            E-mail
          </a>
        </nav>
      </div>
    </section>
  )
}
