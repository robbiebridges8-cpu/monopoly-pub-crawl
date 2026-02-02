import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Overview from './components/Overview'
import RouteMap from './components/RouteMap'
import Logistics from './components/Logistics'
import Footer from './components/Footer'
import PubModal from './components/PubModal'
import './App.css'

function App() {
  const [selectedPub, setSelectedPub] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const timeout = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.observe(el)
      })
    }, 100)

    return () => {
      clearTimeout(timeout)
      observer.disconnect()
    }
  })

  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Overview />
      <RouteMap onPubSelect={setSelectedPub} selectedPub={selectedPub} />
      <Logistics onPubSelect={setSelectedPub} />
      <Footer />
      {selectedPub && (
        <PubModal pub={selectedPub} onClose={() => setSelectedPub(null)} />
      )}
    </div>
  )
}

export default App
