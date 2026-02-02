export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">Monopoly Pub Crawl</div>
          <div className="footer-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }) }}>Home</a>
            <a href="#route" onClick={(e) => { e.preventDefault(); document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' }) }}>Route</a>
            <a href="#logistics" onClick={(e) => { e.preventDefault(); document.getElementById('logistics')?.scrollIntoView({ behavior: 'smooth' }) }}>Logistics</a>
          </div>
        </div>
        <hr className="footer-divider" />
        <p className="footer-contact">
          If you want to be featured in our gallery, or if you have any suggestions for the website, contact me at{' '}
          <a href="mailto:robbiebridges8@gmail.com">robbiebridges8@gmail.com</a>
        </p>
        <hr className="footer-divider" />
        <div className="footer-bottom">
          <div className="footer-disclaimer">
            <span>&copy; {new Date().getFullYear()} London Monopoly Pub Crawl. An independent fan project.</span>
            <span className="footer-disclaimer-legal">
              MONOPOLY is a trademark of Hasbro, Inc. This site is not affiliated with, endorsed by, or sponsored by Hasbro. All trademarks are property of their respective owners.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
