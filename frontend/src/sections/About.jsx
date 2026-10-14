import { Fragment } from 'react'
import profile from '../data/profile.json'
import Section from '../components/Section'
import styles from './About.module.css'

const { text, card } = profile.about
// Parágrafos são separados por linha em branco no profile.json.
const paragraphs = text.split(/\n\s*\n/)

function punct(symbol) {
  return <span className={styles.punct}>{symbol}</span>
}

// Arrays viram ["a", "b"]; demais valores são strings escritas como JSON.
function renderValue(value) {
  if (Array.isArray(value)) {
    return (
      <>
        {punct('[')}
        {value.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && punct(', ')}
            <span className={styles.string}>{JSON.stringify(item)}</span>
          </Fragment>
        ))}
        {punct(']')}
      </>
    )
  }

  return <span className={styles.string}>{JSON.stringify(value)}</span>
}

function CardJson({ data }) {
  const entries = Object.entries(data)

  return (
    <pre className={styles.card}>
      <code>
        {punct('{')}
        {'\n'}
        {entries.map(([key, value], index) => (
          <Fragment key={key}>
            {'  '}
            <span className={styles.key}>{JSON.stringify(key)}</span>
            {punct(': ')}
            {renderValue(value)}
            {index < entries.length - 1 && punct(',')}
            {'\n'}
          </Fragment>
        ))}
        {punct('}')}
      </code>
    </pre>
  )
}

export default function About() {
  return (
    <Section id="sobre" command="./sobre">
      <div className={styles.layout}>
        <div className={styles.text}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <CardJson data={card} />
      </div>
    </Section>
  )
}
