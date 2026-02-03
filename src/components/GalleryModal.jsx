import { useState, useEffect, useCallback } from 'react'

export default function GalleryModal({ images, startIndex = 0, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, goNext, goPrev])

  const image = images[currentIndex]

  return (
    <div className="gallery-modal-overlay" onClick={onClose}>
      <button className="gallery-modal-close" onClick={onClose}>
        &times;
      </button>

      <button
        className="gallery-modal-nav gallery-modal-nav--left"
        onClick={(e) => { e.stopPropagation(); goPrev() }}
      >
        &#8249;
      </button>

      <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
        <img
          className="gallery-modal-image"
          src={image.src}
          alt={image.alt || `Photo ${currentIndex + 1}`}
        />
        {image.caption && (
          <p className="gallery-modal-caption">{image.caption}</p>
        )}
      </div>

      <button
        className="gallery-modal-nav gallery-modal-nav--right"
        onClick={(e) => { e.stopPropagation(); goNext() }}
      >
        &#8250;
      </button>

      <div className="gallery-modal-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  )
}
