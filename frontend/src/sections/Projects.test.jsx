import { act, render, screen } from '@testing-library/react'
import fallbackProjects from '../data/projects.json'
import { getProjects } from '../services/api'
import Projects from './Projects'

vi.mock('../services/api', () => ({
  API_URL: 'http://localhost:8080',
  getProjects: vi.fn(),
}))

const FALLBACK_TITLE = fallbackProjects[0].title
const API_TITLE = 'Projeto vindo da API'

describe('Projects', () => {
  beforeEach(() => {
    getProjects.mockReset()
  })

  it('mostra os projetos locais imediatamente, sem esperar a API', () => {
    getProjects.mockReturnValue(new Promise(() => {}))

    render(<Projects />)

    expect(screen.getByRole('heading', { name: FALLBACK_TITLE })).toBeInTheDocument()
  })

  it('substitui os projetos pelos da API quando a resposta traz dados', async () => {
    getProjects.mockResolvedValue([
      { id: 10, title: API_TITLE, description: 'Da API.', tags: ['Java'], repoUrl: null, demoUrl: null, featured: false },
    ])

    render(<Projects />)

    expect(await screen.findByRole('heading', { name: API_TITLE })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: FALLBACK_TITLE })).not.toBeInTheDocument()
  })

  it('mantém o fallback quando a API falha', async () => {
    getProjects.mockRejectedValue(new Error('Network Error'))

    render(<Projects />)
    await act(async () => {})

    expect(getProjects).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('heading', { name: FALLBACK_TITLE })).toBeInTheDocument()
  })
})
