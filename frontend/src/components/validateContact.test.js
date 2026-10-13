import { validateContact } from './validateContact'

const VALID = { nome: 'Ana', email: 'ana@exemplo.com', mensagem: 'Olá, tudo bem por aí?' }

describe('validateContact', () => {
  it.each([
    ['campos vazios', { nome: '', email: '', mensagem: '' }, ['nome', 'email', 'mensagem']],
    ['e-mail inválido', { ...VALID, email: 'ana@' }, ['email']],
    ['mensagem curta', { ...VALID, mensagem: 'oi' }, ['mensagem']],
    ['entrada válida', VALID, []],
  ])('%s', (_, values, invalidFields) => {
    expect(Object.keys(validateContact(values)).sort()).toEqual([...invalidFields].sort())
  })

  it('ignora espaços nas bordas ao validar', () => {
    expect(validateContact({ ...VALID, nome: '   ' })).toHaveProperty('nome')
  })
})
