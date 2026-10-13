import styles from './SkillBadge.module.css'

export default function SkillBadge({ children, highlight = false }) {
  const className = highlight ? `${styles.badge} ${styles.highlight}` : styles.badge

  return <span className={className}>{children}</span>
}
