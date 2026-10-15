import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CopyEmail from './CopyEmail'

it('copia o e-mail ao clicar, sem usar link mailto', async () => {
  const user = userEvent.setup()
  render(<CopyEmail email="contato@exemplo.com" />)

  const button = screen.getByRole('button', { name: /copiar e-mail contato@exemplo\.com/i })
  expect(screen.queryByRole('link')).not.toBeInTheDocument()

  await user.click(button)

  expect(await navigator.clipboard.readText()).toBe('contato@exemplo.com')
  expect(screen.getByRole('status')).toHaveTextContent('✓ copiado')
})
