import { useEffect, useId, useRef, useState } from 'react'
import styles from './Navbar.module.css'

const LINKS = [
  { href: '#home', label: '~/home' },
  { href: '#sobre', label: './sobre' },
  { href: '#stack', label: 'skills/' },
  { href: '#experiencia', label: 'experiencia.log' },
  { href: '#projetos', label: 'projetos/' },
  { href: '#contato', label: 'contato' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const menuId = useId()

  // Escape fecha o menu mobile e devolve o foco ao botão que o abriu.
  useEffect(() => {
    if (!open) return undefined

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="#home" className={styles.logo}>
          davi@dev:~$
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.icon} aria-hidden="true" />
          <span className={styles.icon} aria-hidden="true" />
          <span className={styles.icon} aria-hidden="true" />
        </button>

        <nav
          id={menuId}
          aria-label="Principal"
          className={open ? `${styles.menu} ${styles.open}` : styles.menu}
        >
          <ul className={styles.list}>
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.link}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
