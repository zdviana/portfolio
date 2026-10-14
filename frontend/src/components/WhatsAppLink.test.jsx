import { render, screen } from '@testing-library/react'
import WhatsAppLink from './WhatsAppLink'

it('abre o WhatsApp com o número e a mensagem pré-definida', () => {
  render(<WhatsAppLink number="5533999990000" display="(33) 99999-0000" message="Olá, Davi! Tudo bem?" />)

  const link = screen.getByRole('link', { name: /whatsapp/i })
  const url = new URL(link.getAttribute('href'))

  expect(url.origin + url.pathname).toBe('https://wa.me/5533999990000')
  expect(url.searchParams.get('text')).toBe('Olá, Davi! Tudo bem?')
  expect(link).toHaveAttribute('target', '_blank')
  expect(link).toHaveTextContent('(33) 99999-0000')
})
