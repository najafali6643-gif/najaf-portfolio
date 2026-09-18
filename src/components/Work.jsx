import { useEffect, useRef, useState } from 'react'
import Button from './ui/Button.jsx'
import SectionTag from './ui/SectionTag.jsx'
import Reveal from './ui/Reveal.jsx'
import Parallax from './ui/Parallax.jsx'
import { projects } from '../data/projects.js'

function ProjectRow({ project }) {
  const imageRef = useRef(null)
  const projectCursorRef = useRef(null)

  const mouse = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const animationRef = useRef(null)

  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const animate = () => {
      current.current.x +=
        (mouse.current.x - current.current.x) * 0.15

      current.current.y +=
        (mouse.current.y - current.current.y) * 0.15

      if (projectCursorRef.current) {
        projectCursorRef.current.style.left = `${current.current.x}px`
        projectCursorRef.current.style.top = `${current.current.y}px`
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const handleMouseMove = (e) => {
    const rect = imageRef.current.getBoundingClientRect()

    mouse.current.x = e.clientX - rect.left
    mouse.current.y = e.clientY - rect.top
  }

  const content = (
    <div className="flex w-auto flex-col lg:w-[480px]">
      <span className="text-[clamp(11px,2.5vw,12px)] font-light text-[var(--color-muted)]">
        {project.number}
      </span>

      <h3 className="mt-5 font-heading font-light text-[clamp(22px,6.5vw,32px)] transition-all duration-300 leading-10 text-[var(--color-primary)] md:mt-4">
        {project.title}
      </h3>

      <p className="mt-1 text-base leading-[1.55] text-[var(--color-faint)] opacity-65 md:mt-3">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="
              rounded-full
              bg-[var(--color-card)]
              px-3.5
              py-1
              text-xs
              font-medium
              text-[var(--color-faint)]
              opacity-65
            "
          >
            {tag}
          </span>
        ))}
      </div>

      <Button href={project.href} target="_blank" rel="noopener noreferrer" className="mt-8 w-fit" withArrow>
        View Project
      </Button>
    </div>
  )

  const image = (
    <a
      ref={imageRef}
      href={project.href} target="_blank" rel="noopener noreferrer"
      data-project-cursor
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="
        group
        relative
        h-full
        lg:h-[338px]
        w-full
        lg:max-w-[630px]
        cursor-none
        overflow-hidden
        rounded-[12px]
      "
    >
      {/* Project Image */}
      <Parallax className="h-full w-full">
        <img
          src={project.image}
          alt={`${project.title} project screenshot`}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            mt-[20px]
            ease-[cubic-bezier(0.22,1,0.36,1)]
          "
        />
      </Parallax>

      {/* Project Cursor */}
      <div
        ref={projectCursorRef}
        className={`
          pointer-events-none
          absolute
          left-0
          top-0
          z-20
          flex
          h-18
          w-18
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          mix-blend-difference
          bg-white
          text-black
          will-change-[left,top]
          transition-[opacity,transform]
          duration-200
          ease-out
          ${
            isHovering
              ? 'scale-100 opacity-100'
              : 'scale-75 opacity-0'
          }
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="34"
          fill="currentColor"
          viewBox="0 0 256 256"
          aria-hidden="true"
        >
          <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" />
        </svg>
      </div>
    </a>
  )

  return (
    <Reveal className={`flex flex-col items-start justify-center gap-8 md:gap-14 ${
    project.imageRight ? 'lg:flex-row-reverse' : 'lg:flex-row'
  }`}>
      {image}
      {content}
    </Reveal>

     
  )
}

function Work() {
  return (
    <section
      id="work"
      className="
        flex
        flex-col
        items-center
        md:gap-15
        gap-12
        px-5
        md:px-13
        py-16
        md:py-20
      "
    >
      {/* Section Header */}
      <Reveal className="flex flex-col items-center gap-4 text-center">

        <h2
          className="
            font-heading
            text-[clamp(32px,6.5vw,48px)]
            font-light
            leading-[1.3]
            text-[var(--color-primary)]
          "
        >
          Selected Work
        </h2>

        <p
          className="
            md:mt-2
            mt-0
            max-w-[520px]
            text-base
            text-[var(--color-faint)]
            opacity-65
          "
        >
          A selection of projects I&apos;ve designed and developed,
          combining thoughtful UI with responsive, modern web
          experiences.
        </p>
      </Reveal>

      {/* Projects */}
      <div className="flex flex-col gap-14 md:gap-18">
        {projects.map((project) => (
          <ProjectRow
            key={project.number}
            project={project}
          />
        ))}
      </div>
    </section>
  )
}

export default Work