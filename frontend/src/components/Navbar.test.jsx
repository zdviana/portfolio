import { fireEvent, render, screen, within } from '@testing-library/react'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('alterna aria-expanded ao clicar no botão do menu', () => {
    render(<Navbar />)

    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')

    fireEvent.click(toggle)

    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('contém os 6 links de seção na navegação principal', () => {
    render(<Navbar />)

    const nav = screen.getByRole('navigation', { name: 'Principal' })
    const hrefs = within(nav)
      .getAllByRole('link')
      .map((link) => link.getAttribute('href'))

    expect(hrefs).toEqual([
      '#home',
      '#sobre',
      '#stack',
      '#experiencia',
      '#projetos',
      '#contato',
    ])
  })
})
