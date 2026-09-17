import { useEffect } from 'react'
import Lenis from 'lenis'

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      smoothWheel: true,
      anchors: true,
    })

    // Make Lenis available globally
    window.lenis = lenis

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)

      if (window.lenis === lenis) {
        delete window.lenis
      }

      lenis.destroy()
    }
  }, [])

  return null
}

export default SmoothScroll