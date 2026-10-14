import { sendContact } from '../services/api'

// Nomes de campo usados pela API mapeados para os campos do formulário.
const SERVER_FIELDS = { name: 'nome', email: 'email', message: 'mensagem' }

function toFieldErrors(serverErrors = {}) {
  const found = {}
  for (const [serverField, text] of Object.entries(serverErrors)) {
    const field = SERVER_FIELDS[serverField]
    if (field && text) found[field] = text
  }
  return found
}

// Resolve com { sent: true } ou { errors } quando o servidor recusa campos (400).
// Qualquer outra falha (sem API, rede, timeout, 5xx) é lançada para o chamador tratar.
export async function submitContact({ nome, email, mensagem }) {
  try {
    await sendContact({ name: nome.trim(), email: email.trim(), message: mensagem.trim() })
    return { sent: true }
  } catch (error) {
    const errors = error.response?.status === 400 ? toFieldErrors(error.response.data?.errors) : {}
    if (Object.keys(errors).length === 0) throw error
    return { errors }
  }
}
