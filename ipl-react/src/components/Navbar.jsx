import { useState } from 'react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  function closeMenu() {
    setIsOpen(false)
  }

  return (
    <header className="site-header">
      <a className="brand" href="#home" onClick={closeMenu}>
        <span className="brand-mark" aria-hidden="true">IPL</span>
        <span>IPL 2026 Tickets</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-controls="main-nav"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
      </button>
      <nav className={`site-nav ${isOpen ? 'is-open' : ''}`} id="main-nav" aria-label="Main navigation">
        <a href="#matches" onClick={closeMenu}>Matches</a>
        <a href="#booking" onClick={closeMenu}>Book Ticket</a>
      </nav>
    </header>
  )
}

export default Navbar
