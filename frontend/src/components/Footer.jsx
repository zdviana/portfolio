import profile from '../data/profile.json'
import styles from './Footer.module.css'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.footer}>
      © {year} {profile.name} — feito com React + Spring Boot
    </footer>
  )
}
