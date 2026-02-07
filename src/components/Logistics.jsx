import pubs, { colorGroups, getMapsUrl } from '../data/pubs'
import PubCard from './PubCard'

export default function Logistics({ onPubSelect }) {
  const totalSpent = pubs.reduce((sum, p) => sum + (p.price || 0), 0)
  const totalPints = 13
  const totalTransportMins = pubs.reduce((sum, p) => sum + (p.transportTime || 0), 0)

  return (
    <section className="logistics-section section" id="logistics">
      <div className="container">
        <h2 className="section-title animate-on-scroll">The Crawl</h2>
        <p className="section-subtitle animate-on-scroll">
          Everything you need to know to maximise your chances of success.
        </p>

        <div className="logistics-grid">
          <div className="logistics-card animate-on-scroll delay-1">
            <div
              className="logistics-card-icon"
              style={{ background: '#FFF3E0', color: '#FF6B00' }}
            >
              &#x1F552;
            </div>
            <h3 className="logistics-card-title">Start at 11am</h3>
            <p className="logistics-card-text">
              Completing the crawl is as much of a logistical feat as it is a drinking one. Beginning at 11am leaves enough time to visit all 26 pubs.
            </p>
          </div>
          <div className="logistics-card animate-on-scroll delay-2">
            <div
              className="logistics-card-icon"
              style={{ background: '#FFEBEE', color: '#D32F2F' }}
            >
              &#x1F37A;
            </div>
            <h3 className="logistics-card-title">{totalPints} Pints Total</h3>
            <p className="logistics-card-text">
              A minimum of a half pint in every pub. If you want to spice it up, add some pints into the mix e.g. at every station.
            
            </p>
          </div>
          <div className="logistics-card animate-on-scroll delay-3">
            <div
              className="logistics-card-icon"
              style={{ background: '#E8F5E9', color: '#2E7D32' }}
            >
              &#x1F6B6;
            </div>
            <h3 className="logistics-card-title">{totalTransportMins} Min Travel</h3>
            <p className="logistics-card-text">
              Mostly walking, with one cycle ride and one Tube journey.
              Total travel time between pubs: {Math.floor(totalTransportMins / 60)}h {totalTransportMins % 60}min.
            </p>
          </div>
        </div>

        <div className="logistics-tips animate-on-scroll">
          <h3 className="logistics-tips-title">Survival Tips</h3>
          <div className="logistics-tips-grid">
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x1F4B3;</div>
              <div className="logistics-tip-content">
                <h4>Budget Around &pound;120</h4>
                <p>That should be enough to cover drinks, food, and transport.</p>
              </div>
            </div>
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x1F354;</div>
              <div className="logistics-tip-content">
                <h4>Eat Along the Way</h4>
                <p>Eating on the crawl is for survival, not luxury. Stick to meal deals and fast food to reduce cost and waiting times.</p>
              </div>
            </div>
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x1F37B;</div>
              <div className="logistics-tip-content">
                <h4>Buy Rounds</h4>
                <p>Everyone transfers one person at the start of the day, and their card is used for every round. Keeps things fair and avoids 26 separate bar queues.</p>
              </div>
            </div>
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x26A0;&#xFE0F;</div>
              <div className="logistics-tip-content">
                <h4>Drink Responsibly</h4>
                <p>You don't want your friends to be "just visiting" you in jail on Sunday!</p>
              </div>
            </div>
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x1F45F;</div>
              <div className="logistics-tip-content">
                <h4>Wear Comfy Shoes</h4>
                <p>Most of the route is on foot. Save the fancy footwear for Mayfair and wear trainers.</p>
              </div>
            </div>
            <div className="logistics-tip">
              <div className="logistics-tip-icon">&#x1F4A7;</div>
              <div className="logistics-tip-content">
                <h4>Stay Hydrated</h4>
                <p>Have regular water intervals. Nobody wants to peak at Bow Street and not make the finale.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline with embedded property cards + reviews */}
        <div className="timeline-header animate-on-scroll">
          <h3 className="timeline-heading">Pub by Pub</h3>
          <button className="print-route-btn" onClick={() => window.print()}>
            &#x1F5A8; Print Route
          </button>
        </div>
        <div className="timeline-cards">
          {pubs.map((pub) => {
            const group = colorGroups[pub.colorGroup]
            return (
              <div key={pub.id} className="timeline-card-item animate-on-scroll">
                <div className="timeline-card-connector">
                  <div className="timeline-card-dot" style={{ background: group.color }} />
                </div>
                <div className="timeline-card-content">
                  <div className="timeline-card-layout">
                    <div className="timeline-card-deed">
                      <PubCard pub={pub} onClick={onPubSelect} />
                    </div>
                    <div className="timeline-card-review">
                      <div className="timeline-review-box">
                        <div className="timeline-review-header-print">
                          <span className="timeline-review-property">{pub.property}</span>
                          <span className="timeline-review-pubname">{pub.pubName}</span>
                          <span className="timeline-review-times">{pub.startTime} - {pub.endTime}</span>
                        </div>
                        <h4 className="timeline-review-title">The Verdict</h4>
                        <p className="timeline-review-text">{pub.review}</p>
                        <div className="timeline-review-meta">
                          {pub.pintQuantity === '0' && (
                            <span className="timeline-review-skipped">SKIPPED</span>
                          )}
                          <a href={getMapsUrl(pub)} target="_blank" rel="noopener noreferrer" className="timeline-review-maps">
                            Open in Maps
                          </a>
                          {pub.website && (
                            <a href={pub.website} target="_blank" rel="noopener noreferrer" className="timeline-review-website">
                              Visit website &rarr;
                            </a>
                          )}
                        </div>
                        {pub.alternatives && pub.alternatives.length > 0 && (
                          <div className="timeline-review-alternatives">
                            <span className="timeline-review-alternatives-label">Nearby alternatives:</span>
                            {pub.alternatives.map((alt, i) => (
                              <span key={i} className="timeline-review-alt">{alt}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {pub.transportTime && (
                    <div className="timeline-card-transport">
                      {pub.transportToNext} &middot; {pub.transportTime} min to next
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
