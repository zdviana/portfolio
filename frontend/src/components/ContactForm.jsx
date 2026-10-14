import { useRef, useState } from 'react'
import Button from './Button'
import { submitContact } from './submitContact'
import { validateContact } from './validateContact'
import styles from './ContactForm.module.css'

const FIELDS = [
  { name: 'nome', label: 'Nome', autoComplete: 'name' },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
  { name: 'mensagem', label: 'Mensagem', multiline: true },
]
const FIELD_ORDER = FIELDS.map((field) => field.name)
const EMPTY_VALUES = { nome: '', email: '', mensagem: '' }
const SENDING_STATUS = 'Enviando...'
const SUCCESS_STATUS = 'Mensagem enviada! Vou responder em breve.'

// Usado quando a API não responde: o envio abre o cliente de e-mail do visitante com a mensagem pronta.
function buildMailto(destination, { nome, email, mensagem }) {
  const subject = `Contato pelo portfólio — ${nome.trim()}`
  const body = `${mensagem.trim()}\n\n---\nNome: ${nome.trim()}\nE-mail: ${email.trim()}`
  return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm({ email: destination }) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const fieldRefs = useRef({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  function focusFirstInvalid(found) {
    const firstInvalid = FIELD_ORDER.find((name) => found[name])
    if (firstInvalid) fieldRefs.current[firstInvalid]?.focus()
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const found = validateContact(values)
    setErrors(found)

    if (Object.keys(found).length > 0) {
      setStatus('')
      focusFirstInvalid(found)
      return
    }

    setSending(true)
    setStatus(SENDING_STATUS)
    try {
      const result = await submitContact(values)
      if (result.errors) {
        setErrors(result.errors)
        setStatus('')
        focusFirstInvalid(result.errors)
        return
      }
      setValues(EMPTY_VALUES)
      setStatus(SUCCESS_STATUS)
    } catch {
      window.location.href = buildMailto(destination, values)
      setStatus(
        `Seu aplicativo de e-mail foi aberto. Se nada aconteceu, escreva diretamente para ${destination}.`,
      )
    } finally {
      setSending(false)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {FIELDS.map(({ name, label, type = 'text', autoComplete, multiline }) => {
        const inputId = `contact-${name}`
        const errorId = `${inputId}-error`
        const invalid = Boolean(errors[name])
        const controlProps = {
          id: inputId,
          name,
          value: values[name],
          onChange: handleChange,
          required: true,
          autoComplete,
          className: styles.input,
          ref: (element) => {
            fieldRefs.current[name] = element
          },
          'aria-invalid': invalid || undefined,
          'aria-describedby': invalid ? errorId : undefined,
        }

        return (
          <div key={name} className={styles.field}>
            <label htmlFor={inputId} className={styles.label}>
              {label}
            </label>
            {multiline ? (
              <textarea rows={5} {...controlProps} />
            ) : (
              <input type={type} {...controlProps} />
            )}
            {invalid && (
              <p id={errorId} className={styles.error}>
                {errors[name]}
              </p>
            )}
          </div>
        )
      })}

      <Button type="submit" disabled={sending}>
        Enviar mensagem
      </Button>
      <p role="status" className={styles.status}>
        {status}
      </p>
    </form>
  )
}
