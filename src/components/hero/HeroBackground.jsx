import { useEffect, useRef } from 'react'

function HeroBackground() {
  const backgroundRef = useRef(null)

  useEffect(() => {
    const background = backgroundRef.current

    if (!background) return

    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2
      const y = (event.clientY / window.innerHeight - 0.5) * 2

      background.style.setProperty('--mouse-x', `${x}`)
      background.style.setProperty('--mouse-y', `${y}`)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY

      background.style.setProperty('--scroll-y', `${scrollY}px`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={backgroundRef}
      className="hero-background pointer-events-auto absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-grid" />

      <div className="hero-glow hero-glow-one" />
      {/* <div className="hero-glow hero-glow-two" /> */}

      <div className="hero-cursor-glow" />
    </div>
  )
}

export default HeroBackground