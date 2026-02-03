import { useState } from 'react'
import GalleryModal from './GalleryModal'

// Change the `position` value to reorder photos. Lower numbers appear first.
const galleryImages = [
  { id: 1, position: 1, src: '/gallery/8F725D54-8E6D-4B39-9A2D-8D8F5502D9C3_1_105_c.jpeg', alt: 'Pub crawl photo 1' },
  { id: 2, position: 2, src: '/gallery/78A3634A-2069-48B6-9072-2E99B0C0E2A8_1_105_c.jpeg', alt: 'Pub crawl photo 2' },
  { id: 3, position: 3, src: '/gallery/20A75E76-D036-4A50-803B-3A473A2E127B_1_105_c.jpeg', alt: 'Pub crawl photo 3' },
  { id: 4, position: 4, src: '/gallery/28EF936C-43E5-4901-BFBF-A601157861AC_1_105_c.jpeg', alt: 'Pub crawl photo 4' },
  { id: 5, position: 5, src: '/gallery/F0567A52-D8FA-4A58-828E-E62A643ECE8B_1_105_c.jpeg', alt: 'Pub crawl photo 5' },
  { id: 6, position: 6, src: '/gallery/1342BC09-1AB5-42A5-9B15-4B8DCC6DE2C7_1_102_a.jpeg', alt: 'Pub crawl photo 6' },
  { id: 7, position: 7, src: '/gallery/3EFA10F3-207D-4779-99CE-5B74CC919176_1_105_c.jpeg', alt: 'Pub crawl photo 7' },
  { id: 8, position: 8, src: '/gallery/6C7D77A7-F415-4CFA-BB39-09EC93C37DC2_1_105_c.jpeg', alt: 'Pub crawl photo 8' },
  { id: 9, position: 9, src: '/gallery/32813CA6-D5C7-486D-BD04-E568B1743708_1_105_c.jpeg', alt: 'Pub crawl photo 9' },
  { id: 10, position: 10, src: '/gallery/9E4BE2F7-67B3-464F-A06B-5572CDCAC145_1_105_c.jpeg', alt: 'Pub crawl photo 10' },
  { id: 11, position: 11, src: '/gallery/3B5E9F90-963E-4F47-8838-0DFBD61B4F1A_1_102_a.jpeg', alt: 'Pub crawl photo 11' },
  { id: 12, position: 12, src: '/gallery/BE85F918-8665-485D-B32F-AAA3961B1281_1_105_c.jpeg', alt: 'Pub crawl photo 12' },
  { id: 13, position: 13, src: '/gallery/4716FCDC-5FA7-4E08-921C-9B8EB4921DDC_1_105_c.jpeg', alt: 'Pub crawl photo 13' },
  { id: 14, position: 14, src: '/gallery/5E437763-E6A1-4CFA-A778-B1804F196F38_1_105_c.jpeg', alt: 'Pub crawl photo 14' },
  { id: 15, position: 15, src: '/gallery/2482C665-1E9D-47A9-9A47-8A9303CA560F_1_105_c.jpeg', alt: 'Pub crawl photo 15' },
  { id: 16, position: 16, src: '/gallery/2ABA03D7-20C2-48E6-A6CD-D2F12ADF7DE0_1_105_c.jpeg', alt: 'Pub crawl photo 16' },
  { id: 17, position: 17, src: '/gallery/6BE88D46-3F6A-4368-9FA3-F4DC1FE5DB30_1_105_c.jpeg', alt: 'Pub crawl photo 17' },
  { id: 18, position: 18, src: '/gallery/06E48167-5F0A-48A2-BAAE-62E38424C611_1_105_c.jpeg', alt: 'Pub crawl photo 18' },
].sort((a, b) => a.position - b.position)

const coverImages = galleryImages.slice(0, 4)
const moreCount = galleryImages.length - 4

export default function Overview() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxStart, setLightboxStart] = useState(0)

  const handleExplore = (e) => {
    e.preventDefault()
    document.getElementById('route')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openLightbox = (index) => {
    setLightboxStart(index)
    setLightboxOpen(true)
  }

  return (
    <section className="overview-section section" id="overview">
      <div className="container">
        <div className="overview-content">
          <div className="overview-text">
            <h2 className="overview-heading">Overview</h2>
            <p className="overview-body">
              The Monopoly pub crawl is guaranteed to provide a full day of fun across London. The crawl covers all 22 properties and 4 stations on the board — no utilities, sorry! This page should provide you with all you need to make sure you nail the logistics. All you need to worry about is the drinking.
            </p>
            <p className="overview-body">
              To add to the fun (and help us remember the final stages of the crawl), we bring a set of property cards with us and take a picture at each venue with its card. Take a look at some of our highlights!
            </p>

            <div className="overview-cta-card">
              <a href="#route" className="overview-cta" onClick={handleExplore}>
                Pass GO &amp; Start the Crawl
                <span className="overview-cta-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="overview-gallery">
            {coverImages.map((img, i) => (
              <div
                key={img.id}
                className="overview-gallery-item"
                onClick={() => openLightbox(i)}
              >
                <img src={img.src} alt={img.alt || `Photo ${img.id}`} />
                {i === 3 && moreCount > 0 && (
                  <div className="overview-gallery-more">
                    +{moreCount} more
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <GalleryModal
          images={galleryImages}
          startIndex={lightboxStart}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}
