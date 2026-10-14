import { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import Section from '../components/Section'
import fallbackProjects from '../data/projects.json'
import { API_URL, getProjects } from '../services/api'
import styles from './Projects.module.css'

export default function Projects() {
  // Começa com os projetos locais para renderizar sem espera; a API só substitui se responder com dados.
  const [projects, setProjects] = useState(fallbackProjects)

  useEffect(() => {
    const controller = new AbortController()

    getProjects({ signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {
        // Sem API ou com erro: o fallback local continua na tela.
      })

    return () => controller.abort()
  }, [])

  return (
    <Section id="projetos" command="ls projetos/">
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {API_URL && (
        <p className={styles.swagger}>
          API documentada com Swagger:{' '}
          <a href={`${API_URL}/swagger-ui.html`} target="_blank" rel="noopener noreferrer">
            swagger-ui
          </a>
        </p>
      )}
    </Section>
  )
}
