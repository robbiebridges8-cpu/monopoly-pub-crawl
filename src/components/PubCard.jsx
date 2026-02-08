import { colorGroups, getMapsUrl } from '../data/pubs'

export default function PubCard({ pub, onClick }) {
  const group = colorGroups[pub.colorGroup]
  const lightBands = ['yellow', 'lightBlue']
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff'

  return (
    <div className="property-card" onClick={() => onClick(pub)}>
      {/* Color band with property name */}
      <div className="property-card__band" style={{ background: group.color }}>
        <span className="property-card__band-label" style={{ color: bandTextColor }}>
          {pub.property}
        </span>
      </div>

      {/* Card body */}
      <div className="property-card__body">
        <div className="property-card__pub-name">{pub.pubName.toUpperCase()}</div>
        <div className="property-card__address">{pub.address}, {pub.postcode}</div>

        <div className="property-card__rule" />

        <div className="property-card__image">
          {pub.image ? (
            <img src={pub.image} alt={pub.pubName} />
          ) : (
            <div className="property-card__image-placeholder">
              <span>&#x1F37A;</span>
            </div>
          )}
        </div>

        <div className="property-card__footer">
          <div className="property-card__times">
            {pub.startTime} - {pub.endTime}
          </div>
          <div className="property-card__progress">
            <span className="property-card__progress-num">{pub.id}</span>
            <span className="property-card__progress-total">/26</span>
          </div>
        </div>

        <div className="property-card__links">
          <a href={getMapsUrl(pub)} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
            Open in Maps
          </a>
          {pub.website && (
            <a href={pub.website} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
              Website &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
