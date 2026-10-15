// Links de envio alternativo usados quando a API não responde; todos já levam a mensagem preenchida.

function compose({ nome, email, mensagem }) {
  return {
    subject: `Contato pelo portfólio — ${nome.trim()}`,
    body: `${mensagem.trim()}\n\n---\nNome: ${nome.trim()}\nE-mail: ${email.trim()}`,
  }
}

export function gmailUrl(destination, values) {
  const { subject, body } = compose(values)
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: destination, su: subject, body })
  return `https://mail.google.com/mail/?${params}`
}

export function mailtoUrl(destination, values) {
  const { subject, body } = compose(values)
  return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function whatsappUrl(number, { nome, email, mensagem }) {
  const text = `Olá, Davi! Sou ${nome.trim()} (${email.trim()}).\n\n${mensagem.trim()}`
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`
}
