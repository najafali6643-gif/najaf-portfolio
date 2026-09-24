import { useState } from 'react'
import './HeroImage.css'

export default function HeroImage({ normalImage, robotImage }) {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    active: false,
  })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()

    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    })
  }

  const handleMouseLeave = () => {
    setMouse((prev) => ({
      ...prev,
      active: false,
    }))
  }

  return (
    <div
      className="hero-portrait"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${mouse.x}px`,
        '--mouse-y': `${mouse.y}px`,
      }}
    >
      {/* Normal portrait */}
      <img
        src={normalImage}
        alt="Najaf Ali — front-end developer portrait"
        width="1200"
        height="900"
        fetchpriority="high"
        decoding="async"
        className="hero-portrait-image"
      />

      {/* Robotic portrait */}
      <div
        className={`robot-reveal ${mouse.active ? 'active' : ''}`}
      >
        <img
          src={robotImage}
          alt=""
          width="1200"
          height="900"
          loading="lazy"
          decoding="async"
          className="hero-portrait-image"
        />
      </div>
    </div>
  )
}