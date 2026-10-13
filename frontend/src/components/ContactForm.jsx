import { useRef, useState } from 'react'
import Button from './Button'
import { validateContact } from './validateContact'
import styles from './ContactForm.module.css'

const FIELDS = [
  { name: 'nome', label: 'Nome', autoComplete: 'name' },
  { name: 'email', label: 'E-mail', type: 'email', autoComplete: 'email' },
  { name: 'mensagem', label: 'Mensagem', multiline: true },
]
const FIELD_ORDER = FIELDS.map((field) => field.name)
const EMPTY_VALUES = { nome: '', email: '', mensagem: '' }

// Sem API nesta fase: o envio abre o cliente de e-mail do visitante com a mensagem pronta.
function buildMailto(destination, { nome, email, mensagem }) {
  const subject = `Contato pelo portfólio — ${nome.trim()}`
  const body = `${mensagem.trim()}\n\n---\nNome: ${nome.trim()}\nE-mail: ${email.trim()}`
  return `mailto:${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export default function ContactForm({ email: destination }) {
  const [values, setValues] = useState(EMPTY_VALUES)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const fieldRefs = useRef({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((previous) => ({ ...previous, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateContact(values)
    setErrors(found)

    const firstInvalid = FIELD_ORDER.find((name) => found[name])
    if (firstInvalid) {
      setStatus('')
      fieldRefs.current[firstInvalid]?.focus()
      return
    }

    window.location.href = buildMailto(destination, values)
    setStatus(
      `Seu aplicativo de e-mail foi aberto. Se nada aconteceu, escreva diretamente para ${destination}.`,
    )
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

      <Button type="submit">Enviar mensagem</Button>
      <p role="status" className={styles.status}>
        {status}
      </p>
    </form>
  )
}
