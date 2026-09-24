import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Lenis from 'lenis'

function SmoothScroll() {
  const location = useLocation()

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
      if (!document.hidden) {
        lenis.raf(time)
      }
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

  useEffect(() => {
    window.scrollTo(0, 0)
    window.lenis?.scrollTo(0, { immediate: true })
  }, [location.pathname])

  return null
}

export default SmoothScroll