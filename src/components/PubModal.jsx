import { useEffect } from 'react'
import { colorGroups, getMapsUrl } from '../data/pubs'

export default function PubModal({ pub, onClose }) {
  const group = colorGroups[pub.colorGroup]
  const lightBands = ['yellow', 'lightBlue']
  const bandTextColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff'

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        {/* Color band with property name */}
        <div className="modal-deed-header" style={{ background: group.color }}>
          <span className="modal-deed-header-label" style={{ color: bandTextColor }}>{pub.property}</span>
        </div>

        <div className="modal-deed-title">
          <h2 className="modal-deed-pub-name-main">{pub.pubName}</h2>
          <div className="modal-deed-address">{pub.address}, {pub.postcode}</div>
        </div>

        {pub.image && (
          <div className="modal-deed-image">
            <img src={pub.image} alt={pub.pubName} />
          </div>
        )}

        <div className="modal-deed-divider" />

        <div className="modal-body">
          {/* Monopoly-style rent table */}
          <div className="modal-deed-table">
            <div className="modal-deed-row">
              <span>Arrive</span>
              <span className="modal-deed-row-dots" />
              <span className="modal-deed-row-value">{pub.startTime}</span>
            </div>
            <div className="modal-deed-row">
              <span>Depart</span>
              <span className="modal-deed-row-dots" />
              <span className="modal-deed-row-value">{pub.endTime}</span>
            </div>
            <div className="modal-deed-row">
              <span>Transport to next</span>
              <span className="modal-deed-row-dots" />
              <span className="modal-deed-row-value">
                {pub.transportToNext}{pub.transportTime ? ` \u00B7 ${pub.transportTime} mins` : ''}
              </span>
            </div>
          </div>

          <div className="modal-deed-divider" />

          <div className="modal-review">
            <h4 className="modal-review-title">The Verdict</h4>
            <p className="modal-review-text">{pub.review}</p>
          </div>

          <div className="modal-deed-footer">
            <a
              href={getMapsUrl(pub)}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-maps-link"
              onClick={(e) => e.stopPropagation()}
            >
              Open in Maps
            </a>
            {pub.website && (
              <a
                href={pub.website}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-website-link"
                onClick={(e) => e.stopPropagation()}
              >
                Visit website &rarr;
              </a>
            )}
            <span className="modal-deed-number" style={{ color: group.color }}>#{pub.id} of 26</span>
          </div>
        </div>
      </div>
    </div>
  )
}
