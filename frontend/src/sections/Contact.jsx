import ContactForm from '../components/ContactForm'
import Section from '../components/Section'
import WhatsAppLink from '../components/WhatsAppLink'
import profile from '../data/profile.json'
import styles from './Contact.module.css'

// Mostra o link sem protocolo e barra final, ex.: "linkedin.com/in/zdaviviana".
function toReadable(url) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const directLinks = [
  { label: 'linkedin', href: profile.links.linkedin },
  { label: 'github', href: profile.links.github },
]

export default function Contact() {
  return (
    <Section id="contato" command="ssh contato">
      <p className={styles.headline}>{profile.contact.headline}</p>

      <div className={styles.columns}>
        <ContactForm email={profile.links.email} />

        <ul className={styles.links}>
          <li>
            <span className={styles.label}>whatsapp</span>
            <WhatsAppLink {...profile.links.whatsapp} />
          </li>
          <li>
            <span className={styles.label}>e-mail</span>
            <a href={`mailto:${profile.links.email}`}>{profile.links.email}</a>
          </li>
          {directLinks.map(({ label, href }) => (
            <li key={label}>
              <span className={styles.label}>{label}</span>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {toReadable(href)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
