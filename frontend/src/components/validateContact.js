const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10

// Retorna somente os campos com erro (objeto vazio quando tudo é válido).
export function validateContact({ nome = '', email = '', mensagem = '' }) {
  const name = nome.trim()
  const address = email.trim()
  const text = mensagem.trim()
  const errors = {}

  if (!name) {
    errors.nome = 'Informe seu nome.'
  }

  if (!address) {
    errors.email = 'Informe seu e-mail.'
  } else if (!EMAIL_PATTERN.test(address)) {
    errors.email = 'Use um e-mail válido, ex.: nome@dominio.com.'
  }

  if (!text) {
    errors.mensagem = 'Escreva uma mensagem.'
  } else if (text.length < MIN_MESSAGE_LENGTH) {
    errors.mensagem = `A mensagem precisa ter pelo menos ${MIN_MESSAGE_LENGTH} caracteres.`
  }

  return errors
}
