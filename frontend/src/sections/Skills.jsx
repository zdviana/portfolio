import profile from '../data/profile.json'
import Section from '../components/Section'
import SkillBadge from '../components/SkillBadge'
import styles from './Skills.module.css'

const highlighted = new Set(profile.highlightSkills)

export default function Skills() {
  return (
    <Section id="stack" command="ls skills/">
      <div className={styles.grid}>
        {profile.skills.map((group) => (
          <article key={group.group} className={styles.card}>
            <h3 className={styles.title}>{group.group}</h3>
            <ul className={styles.list}>
              {group.items.map((item) => (
                <li key={item}>
                  <SkillBadge highlight={highlighted.has(item)}>{item}</SkillBadge>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
