import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

const DESTINATION = 'contato@exemplo.com'

describe('ContactForm', () => {
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
  })

  it('abre o e-mail com a mensagem e mostra o status quando o formulário é válido', async () => {
    const user = userEvent.setup()
    const location = { href: '' }
    vi.stubGlobal('location', location)
    render(<ContactForm email={DESTINATION} />)

    await user.type(screen.getByLabelText('Nome'), 'Ana')
    await user.type(screen.getByLabelText('E-mail'), 'ana@exemplo.com')
    await user.type(screen.getByLabelText('Mensagem'), 'Gostaria de conversar.')
    await user.click(screen.getByRole('button', { name: 'Enviar mensagem' }))

    expect(location.href).toMatch(/^mailto:contato@exemplo\.com\?subject=/)
    expect(location.href).toContain(encodeURIComponent('ana@exemplo.com'))
    expect(screen.getByRole('status')).toHaveTextContent(/aplicativo de e-mail/)
  })
})
