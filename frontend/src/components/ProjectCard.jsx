import Button from './Button'
import SkillBadge from './SkillBadge'
import styles from './ProjectCard.module.css'

const LINK_PROPS = { variant: 'ghost', target: '_blank', rel: 'noopener noreferrer' }

export default function ProjectCard({ project }) {
  const { title, description, tags, repoUrl, backendRepoUrl, demoUrl, featured } = project
  const className = featured ? `${styles.card} ${styles.featured}` : styles.card
  // Com front e back em repositórios separados, os botões viram "front" e "back".
  const codeLinks = backendRepoUrl
    ? [
        { label: 'front', href: repoUrl },
        { label: 'back', href: backendRepoUrl },
      ]
    : [{ label: 'código', href: repoUrl }]
  const links = [...codeLinks, { label: 'demo', href: demoUrl }].filter((link) => link.href)

  return (
    <article className={className}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>

      <ul className={styles.tags}>
        {tags.map((tag) => (
          <li key={tag}>
            <SkillBadge>{tag}</SkillBadge>
          </li>
        ))}
      </ul>

      {links.length > 0 && (
        <div className={styles.actions}>
          {links.map(({ label, href }) => (
            <Button key={label} href={href} aria-label={`${label} de ${title}`} {...LINK_PROPS}>
              {label}
            </Button>
          ))}
        </div>
      )}
    </article>
  )
}
