import styles from './Timeline.module.css'

// Linha do tempo vertical: cada item traz cargo, empresa, local/período e destaques.
export default function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => (
        <li key={`${item.company}-${item.period}`} className={styles.item}>
          <h3 className={styles.title}>
            {item.role} — {item.company}
          </h3>
          <p className={styles.meta}>
            {item.location} · {item.period}
          </p>
          <ul className={styles.highlights}>
            {item.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
