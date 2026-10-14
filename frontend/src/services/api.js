import axios from 'axios'

// Em produção sem VITE_API_URL não há API: as chamadas rejeitam sem fazer requisição.
export const API_URL = import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:8080' : null)

const http = axios.create({ baseURL: API_URL ?? undefined, timeout: 8000 })

function requireApi() {
  if (!API_URL) {
    throw new Error('API não configurada.')
  }
}

export async function getProjects({ signal } = {}) {
  requireApi()
  const { data } = await http.get('/api/projects', { signal })
  return data
}

export async function sendContact({ name, email, message }) {
  requireApi()
  const { data } = await http.post('/api/contact', { name, email, message })
  return data
}
