export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-board-pattern" />

      <div className="hero-content">
        <div className="hero-mascot">
          <span className="hero-mascot-hat">&#x1F3A9;</span>
        </div>

        <div className="hero-title-card">
          <div className="hero-title-corner hero-title-corner--tl" />
          <div className="hero-title-corner hero-title-corner--tr" />
          <div className="hero-title-corner hero-title-corner--bl" />
          <div className="hero-title-corner hero-title-corner--br" />

          <div className="hero-monopoly-title">
            <div className="hero-monopoly-top">The London</div>
            <h1 className="hero-monopoly-main">MONOPOLY</h1>
            <div className="hero-monopoly-bottom">Pub Crawl</div>
          </div>
        </div>

        <p className="hero-description">
          Complete the legendary Monopoly board, pint by pint.
        </p>

        <div className="hero-stats">
          <div className="hero-stat-card">
            <div className="hero-stat-number">26</div>
            <div className="hero-stat-label">Pubs</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-number">26</div>
            <div className="hero-stat-label">Drinks</div>
          </div>
          <div className="hero-stat-card">
            <div className="hero-stat-number">12</div>
            <div className="hero-stat-label">Hours</div>
          </div>
        </div>

      </div>
    </section>
  )
}
