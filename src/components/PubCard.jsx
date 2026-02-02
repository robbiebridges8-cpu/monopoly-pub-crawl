import { colorGroups } from '../data/pubs'

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
        <div className="property-card__pub-name">{pub.pubName}</div>
        <div className="property-card__address">{pub.address}, {pub.postcode}</div>

        <div className="property-card__rule" />

        <div className="property-card__info">
          <div className="property-card__row">
            <span>Arrive</span>
            <span className="property-card__dots" />
            <span>{pub.startTime}</span>
          </div>
          <div className="property-card__row">
            <span>Depart</span>
            <span className="property-card__dots" />
            <span>{pub.endTime}</span>
          </div>
          <div className="property-card__row">
            <span>To next pub</span>
            <span className="property-card__dots" />
            <span>{pub.transportToNext}{pub.transportTime ? ` ${pub.transportTime}m` : ''}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
