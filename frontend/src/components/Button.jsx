import styles from './Button.module.css'

// Botão no formato "[ texto ]". Renderiza <a> quando recebe href.
export default function Button({ href, children, variant = 'primary', ...props }) {
  const className = `${styles.button} ${styles[variant]}`
  const label = (
    <>
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={className} {...props}>
        {label}
      </a>
    )
  }

  return (
    <button className={className} {...props}>
      {label}
    </button>
  )
}
