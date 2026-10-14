import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { sendContact } from '../services/api'
import ContactForm from './ContactForm'

vi.mock('../services/api', () => ({ sendContact: vi.fn() }))

const DESTINATION = 'contato@exemplo.com'

async function fillForm(user, { mensagem = 'Gostaria de conversar.' } = {}) {
  await user.type(screen.getByLabelText('Nome'), 'Ana')
  await user.type(screen.getByLabelText('E-mail'), 'ana@exemplo.com')
  await user.type(screen.getByLabelText('Mensagem'), mensagem)
  await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))
}

function httpError(status, data) {
  return Object.assign(new Error(`HTTP ${status}`), { response: { status, data } })
}

describe('ContactForm', () => {
  beforeEach(() => {
    sendContact.mockReset()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('mostra erros, marca campos inválidos e foca o primeiro ao enviar vazio', async () => {
    const user = userEvent.setup()
    render(<ContactForm email={DESTINATION} />)

    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    const nome = screen.getByLabelText('Nome')
    expect(nome).toHaveAttribute('aria-invalid', 'true')
    expect(nome).toHaveAccessibleDescription('Informe seu nome.')
    expect(nome).toHaveFocus()
    expect(screen.getByLabelText('E-mail')).toHaveAttribute('aria-invalid', 'true')
    expect(sendContact).not.toHaveBeenCalled()
  })

  it('envia os dados aparados à API e limpa o formulário no sucesso', async () => {
    const user = userEvent.setup()
    sendContact.mockResolvedValue({ id: 1, createdAt: '2026-10-14T10:00:00Z' })
    render(<ContactForm email={DESTINATION} />)

    await fillForm(user, { mensagem: '  Gostaria de conversar.  ' })

    expect(sendContact).toHaveBeenCalledWith({
      name: 'Ana',
      email: 'ana@exemplo.com',
      message: 'Gostaria de conversar.',
    })
    expect(await screen.findByRole('status')).toHaveTextContent(
      'Mensagem enviada! Vou responder em breve.',
    )
    expect(screen.getByLabelText('Nome')).toHaveValue('')
  })

  it('mostra o erro do servidor no campo correspondente em uma resposta 400', async () => {
    const user = userEvent.setup()
    sendContact.mockRejectedValue(
      httpError(400, { detail: 'Dados inválidos.', errors: { email: 'E-mail já cadastrado.' } }),
    )
    render(<ContactForm email={DESTINATION} />)

    await fillForm(user)

    const email = await screen.findByLabelText('E-mail')
    expect(email).toHaveAttribute('aria-invalid', 'true')
    expect(email).toHaveAccessibleDescription('E-mail já cadastrado.')
    expect(email).toHaveFocus()
  })

  it('abre o e-mail como fallback quando a API não responde', async () => {
    const user = userEvent.setup()
    const location = { href: '' }
    vi.stubGlobal('location', location)
    sendContact.mockRejectedValue(new Error('Network Error'))
    render(<ContactForm email={DESTINATION} />)

    await fillForm(user)

    await waitFor(() => expect(location.href).toMatch(/^mailto:contato@exemplo\.com\?subject=/))
    expect(location.href).toContain(encodeURIComponent('ana@exemplo.com'))
    expect(screen.getByRole('status')).toHaveTextContent(/aplicativo de e-mail/)
  })
})
