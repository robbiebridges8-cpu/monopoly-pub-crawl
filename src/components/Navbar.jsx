import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (e, id) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#" className="navbar-logo">
          <span className="navbar-logo-icon">&#x1F3B2;</span>
          <span className="navbar-logo-text">Monopoly Pub Crawl</span>
        </a>
        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          <li><a href="#home" onClick={(e) => handleClick(e, 'home')}>Home</a></li>
          <li><a href="#route" onClick={(e) => handleClick(e, 'route')}>The Route</a></li>
          <li><a href="#logistics" onClick={(e) => handleClick(e, 'logistics')}>Logistics</a></li>
        </ul>
        <button
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}
