import styles from './Section.module.css'

// Seção da página com título no formato de comando de terminal (ex.: "./sobre").
export default function Section({ id, command, children }) {
  const titleId = `${id}-title`

  return (
    <section id={id} className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>{' '}
        {command}
      </h2>
      {children}
    </section>
  )
}
