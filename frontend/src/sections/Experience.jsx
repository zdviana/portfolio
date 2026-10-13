import Section from '../components/Section'
import Timeline from '../components/Timeline'
import profile from '../data/profile.json'

export default function Experience() {
  return (
    <Section id="experiencia" command="cat experiencia.log">
      <Timeline items={profile.experience} />
    </Section>
  )
}
