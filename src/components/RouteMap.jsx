import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import pubs, { colorGroups, getMapsUrl } from '../data/pubs'

// Haversine distance in km between two lat/lng points
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Calculate total route distance
const totalDistanceKm = pubs.reduce((sum, pub, i) => {
  if (i === 0) return 0
  const prev = pubs[i - 1]
  return sum + haversine(prev.lat, prev.lng, pub.lat, pub.lng)
}, 0)

const totalWalkingMins = pubs.reduce((sum, p) => sum + (p.transportTime || 0), 0)

export default function RouteMap({ onPubSelect, selectedPub }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef({})

  // Highlight active marker when selectedPub changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([id, el]) => {
      if (selectedPub && parseInt(id) === selectedPub.id) {
        el.classList.add('maplibre-marker--active')
      } else {
        el.classList.remove('maplibre-marker--active')
      }
    })
  }, [selectedPub])

  useEffect(() => {
    if (mapInstanceRef.current) return

    const isMobile = window.innerWidth <= 768

    const map = new maplibregl.Map({
      container: mapRef.current,
      style: 'https://tiles.openfreemap.org/styles/liberty',
      center: [-0.115, 51.51],
      zoom: 12,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: true,
      touchPitch: false,
    })

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')

    // Enable two-finger touch gestures on mobile
    if (isMobile) {
      map.scrollZoom.disable()
      map.dragPan.enable()
    }

    // Auto-fit bounds to show all pubs
    const bounds = new maplibregl.LngLatBounds()
    pubs.forEach((p) => bounds.extend([p.lng, p.lat]))
    map.fitBounds(bounds, { padding: 50, maxZoom: 14 })

    map.on('load', () => {
      // Route line
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: pubs.map((p) => [p.lng, p.lat]),
          },
        },
      })

      // Route line — background (wider, for hover hit area)
      map.addLayer({
        id: 'route-line-bg',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#D32F2F',
          'line-width': 5,
          'line-opacity': 0.15,
        },
      })

      // Route line — foreground
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        paint: {
          'line-color': '#D32F2F',
          'line-width': 3,
          'line-opacity': 0.7,
          'line-dasharray': [2, 2],
        },
      })

      // Add markers
      pubs.forEach((pub) => {
        const group = colorGroups[pub.colorGroup]
        const lightBands = ['yellow', 'lightBlue']
        const textColor = lightBands.includes(pub.colorGroup) ? '#1a1a1a' : '#fff'

        const el = document.createElement('div')
        el.className = 'maplibre-marker'
        el.style.background = group.color
        el.style.color = textColor
        el.style.borderColor = group.color
        el.textContent = pub.id
        el.dataset.pubId = pub.id

        // Store ref for highlighting
        markersRef.current[pub.id] = el

        // Hover: scale up
        el.addEventListener('mouseenter', () => {
          el.classList.add('maplibre-marker--hover')
        })
        el.addEventListener('mouseleave', () => {
          el.classList.remove('maplibre-marker--hover')
        })

        // Click: open modal directly
        el.addEventListener('click', () => {
          onPubSelect(pub)
        })

        new maplibregl.Marker({ element: el })
          .setLngLat([pub.lng, pub.lat])
          .addTo(map)
      })
    })

    mapInstanceRef.current = map

    return () => {
      map.remove()
      mapInstanceRef.current = null
      markersRef.current = {}
    }
  }, [onPubSelect])

  return (
    <section className="map-section section" id="route">
      <div className="container">
        <h2 className="section-title animate-on-scroll">The Route</h2>
        <p className="section-subtitle animate-on-scroll">
          Note: Due to geographical constraints, the route can't follow the board order exactly. Instead, it's optimised to minimise travel time while hitting all 26 properties.
        </p>

        <div className="map-wrapper animate-on-scroll">
          <div ref={mapRef} className="map-container" />
        </div>
      </div>
    </section>
  )
}
